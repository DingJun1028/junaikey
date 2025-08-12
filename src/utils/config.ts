import fs from "fs";
import path from "path";
import yaml from "yaml";

function loadYaml(file: string) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) return {};
  return yaml.parse(fs.readFileSync(p, "utf8"));
}

const base = loadYaml("config/default.yaml");
const env = process.env.NODE_ENV === "production" ? loadYaml("config/production.yaml") : {};
let merged = deepMerge(base, env);

// Apply environment variable overrides
merged = {
  ...merged,
  server: {
    ...merged.server,
    port: parseInt(process.env.PORT || merged.server?.port || '8080'),
    requestIdHeader: process.env.REQUEST_ID_HEADER || merged.server?.requestIdHeader || 'X-Request-Id'
  },
  observability: {
    ...merged.observability,
    logLevel: process.env.LOG_LEVEL || merged.observability?.logLevel || 'info',
    otel: {
      ...merged.observability?.otel,
      endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || merged.observability?.otel?.endpoint || 'http://localhost:4317',
      serviceName: process.env.OTEL_SERVICE_NAME || merged.observability?.otel?.serviceName || 'JunAiKey_Omnikey_萬能系統_終焉奇點'
    }
  },
  persistence: {
    ...merged.persistence,
    supabase: {
      ...merged.persistence?.supabase,
      url: process.env.SUPABASE_URL || merged.persistence?.supabase?.url || '',
      anonKey: process.env.SUPABASE_ANON_KEY || merged.persistence?.supabase?.anonKey || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || merged.persistence?.supabase?.serviceRoleKey || ''
    }
  }
};

function deepMerge(a: any, b: any): any {
  if (Array.isArray(a) && Array.isArray(b)) return b;
  if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
    const out: any = { ...a };
    for (const k of Object.keys(b)) out[k] = deepMerge(a[k], b[k]);
    return out;
  }
  return b ?? a;
}

export const config = merged as any;