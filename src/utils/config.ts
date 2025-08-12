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
const merged = deepMerge(base, env);

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