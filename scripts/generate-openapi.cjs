#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const inPath = path.resolve(process.cwd(), "openapi.yaml");
const outPath = path.resolve(process.cwd(), "openapi.json");

if (!fs.existsSync(inPath)) {
  console.error("openapi.yaml not found");
  process.exit(1);
}

const doc = yaml.parse(fs.readFileSync(inPath, "utf8"));
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2));
console.log(`Generated ${path.relative(process.cwd(), outPath)}`);