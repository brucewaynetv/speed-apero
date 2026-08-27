const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const workflowPath = path.join(__dirname, "..", ".github", "workflows", "deploy-netlify.yml");
const content = fs.readFileSync(workflowPath, "utf8");
const encoded = Buffer.from(content).toString("base64");

const body = JSON.stringify({
  message: "ci: deploiement automatique Netlify sur push main",
  content: encoded,
});

const result = execSync(
  "gh api --method PUT repos/brucewaynetv/speed-apero/contents/.github/workflows/deploy-netlify.yml --input -",
  { input: body, encoding: "utf8" }
);

console.log(result);
