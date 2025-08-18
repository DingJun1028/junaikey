import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  console.log("[Client] Connecting to Junaikey Engine...");

  const transport = new StdioClientTransport({
    command: "npm",
    // Note: Using --prefix to ensure the command runs in the correct directory
    args: ["start", "--prefix", "./omni_center"]
  });

  const client = new Client({
    name: "genesis-architect-console",
    version: "1.0.0"
  });

  await client.connect(transport);
  console.log("[Client] Connection established.");

  console.log("\n[Client] 1. Listing initial tools...");
  let tools = await client.listTools();
  console.log("[Client] Initial tools:", tools.map(t => t.name));

  const openapi_url = "https://petstore.swagger.io/v2/swagger.json";
  console.log(`\n[Client] 2. Calling 'forge_rune' with URL: ${openapi_url}`);
  const forgeResult = await client.callTool({
    name: "forge_rune",
    arguments: { openapi_url }
  });
  console.log("[Client] 'forge_rune' result:", forgeResult.content);

  console.log("\n[Client] 3. Listing tools again after forging...");
  tools = await client.listTools();
  console.log("[Client] Available tools now:", tools.map(t => t.name));

  // Note: The dynamically generated name might vary slightly. Let's find it.
  const newToolName = tools.find(t => t.name.includes("getpetbyid"));

  if (newToolName) {
    console.log(`\n[Client] 4. Found new tool '${newToolName.name}'. Calling it...`);
    const petId = 1; // Example Pet ID
    const petResult = await client.callTool({
      name: newToolName.name,
      arguments: { petId }
    });
    console.log(`[Client] Result for getting pet with ID ${petId}:`);
    console.log(petResult.content);
  } else {
    console.error(`[Client] Error: Could not find the newly forged tool containing 'getpetbyid'.`);
  }

  await client.close();
  transport.close();
  console.log("\n[Client] Test complete. Closing connection.");
}

main().catch(error => {
  console.error("[Client] An unexpected error occurred:", error);
  process.exit(1);
});
