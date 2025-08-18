import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { OpenAPIV3 } from "openapi-types";

/**
 * Creates a Zod schema from an array of OpenAPI parameter objects.
 * @param parameters An array of OpenAPI V3 parameter objects.
 * @returns An object containing the Zod schema and details about the parameters.
 */
function createZodSchema(parameters: any): { zodSchema: any, paramDetails: { name: string, in: string }[] } {
  const shape: { [key: string]: z.ZodType<any, any> } = {};
  const paramDetails: { name: string, in: string }[] = [];

  if (!Array.isArray(parameters)) {
    return { zodSchema: z.object(shape).passthrough(), paramDetails };
  }

  for (const param of parameters) {
    // For now, we are assuming parameters are not references.
    // A more robust implementation would resolve $ref pointers.
    const resolvedParam = param as OpenAPIV3.ParameterObject;

    if (resolvedParam.in !== 'path' && resolvedParam.in !== 'query') {
      continue; // For now, only support path and query parameters
    }

    let schema: z.ZodType<any, any>;
    const paramSchema = resolvedParam.schema as OpenAPIV3.SchemaObject;

    switch (paramSchema?.type) {
      case 'integer':
      case 'number':
        schema = z.number();
        break;
      case 'boolean':
        schema = z.boolean();
        break;
      case 'string':
      default:
        schema = z.string();
        break;
    }

    if (!resolvedParam.required) {
      schema = schema.optional();
    }
    if (resolvedParam.description) {
      schema = schema.describe(resolvedParam.description);
    }

    shape[resolvedParam.name] = schema;
    paramDetails.push({ name: resolvedParam.name, in: resolvedParam.in });
  }

  return { zodSchema: shape, paramDetails };
}


async function main() {
  // 「創世引擎」的核心：JunAiKey MCP 伺服器
  const server = new McpServer({
    name: "junaikey-engine",
    version: "1.0.0"
  });

  console.log("Jules is booting up the Junaikey Engine...");

  // 註冊「萬能符文編譯器」核心工具
  server.registerTool(
    "forge_rune",
    {
      title: "萬能符文編譯器",
      description: "根據 OpenAPI 規範，探測並動態註冊新的工具。",
      inputSchema: {
        openapi_url: z.string().url().describe("要探測的 OpenAPI (Swagger) JSON 文件的 URL"),
      }
    },
    async ({ openapi_url }) => {
      console.log(`[ForgeRune] Received forge_rune command for URL: ${openapi_url}`);

      try {
        console.log("[ForgeRune] Probing API protocol...");
        const response = await fetch(openapi_url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[ForgeRune] Failed to fetch OpenAPI spec. Status: ${response.status}. Body: ${errorText}`);
          return {
            content: [{
              type: "text",
              text: `協議探測失敗：無法獲取 OpenAPI 規格文件。伺服器回應 ${response.status}`
            }],
            isError: true
          };
        }

        const spec = await response.json() as OpenAPIV3.Document;
        const specTitle = spec.info.title.replace(/\s/g, '_'); // Sanitize title
        console.log(`[ForgeRune] Successfully parsed spec for "${spec.info.title}" v${spec.info.version}`);

        let toolsForged = 0;

        for (const path in spec.paths) {
          const pathItem = spec.paths[path];
          if (!pathItem) continue;

          for (const method in pathItem) {
            const operation = pathItem[method as OpenAPIV3.HttpMethods];
            if (!operation) continue;

            const toolName = `${specTitle}_${operation.operationId || path.replace(/[\/{}]/g, '_') + '_' + method}`.toLowerCase();

            const { zodSchema, paramDetails } = createZodSchema(operation.parameters);

            server.registerTool(
              toolName,
              {
                title: operation.summary || toolName,
                description: operation.description || `Dynamically forged tool for ${method.toUpperCase()} ${path}`,
                inputSchema: zodSchema,
              },
              async (args) => {
                try {
                  let finalPath = path;
                  const queryParams = new URLSearchParams();

                  for (const param of paramDetails) {
                    if (args[param.name] === undefined) continue;

                    if (param.in === 'path') {
                      finalPath = finalPath.replace(`{${param.name}}`, String(args[param.name]));
                    } else if (param.in === 'query') {
                      queryParams.append(param.name, String(args[param.name]));
                    }
                  }

                  const baseUrl = spec.servers?.[0]?.url || openapi_url.substring(0, openapi_url.lastIndexOf('/'));
                  const url = new URL(finalPath, baseUrl);
                  url.search = queryParams.toString();

                  const apiResponse = await fetch(url.href, { method: method.toUpperCase() });

                  if (!apiResponse.ok) {
                    return { content: [{ type: 'text', text: `API Error: ${apiResponse.statusText}` }], isError: true };
                  }

                  const responseData = await apiResponse.json();
                  return { content: [{ type: 'text', text: JSON.stringify(responseData, null, 2) }] };

                } catch(e: any) {
                  return { content: [{ type: 'text', text: `Tool execution error: ${e.message}` }], isError: true };
                }
              }
            );
            toolsForged++;
            console.log(`[ForgeRune] Successfully forged tool: ${toolName}`);
          }
        }

        return {
          content: [{
            type: "text",
            text: `符文轉譯完成！成功為「${spec.info.title}」鑄造了 ${toolsForged} 個新工具。`
          }]
        };

      } catch (error: any) {
        console.error("[ForgeRune] An unexpected error occurred:", error);
        return {
          content: [{
            type: "text",
            text: `處理 OpenAPI 規格文件時發生未預期的錯誤: ${error.message}`
          }],
          isError: true
        };
      }
    }
  );

  console.log("Awaiting connection from the Genesis Architect...");

  // 使用 Stdio 進行本機通訊
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log("Junaikey Engine is online and connected. Standing by for commands.");
}

main().catch((error) => {
  console.error("Junaikey Engine encountered a critical failure:", error);
  process.exit(1);
});
