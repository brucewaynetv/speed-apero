const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";

try {
  const result = netlifyApi("updateSite", {
    site_id: siteId,
    body: {
      repo: {
        provider: "github",
        repo: "brucewaynetv/speed-apero",
        branch: "main",
        cmd: "npm run build:netlify",
        dir: "",
        allowed_branches: ["main"],
      },
    },
  });
  console.log("Linked:", result.name, result.build_settings?.repo_url || result.repo_url);
} catch (e) {
  console.error("Link failed:", e.message);
  if (e.stdout) console.error(e.stdout.toString());
  if (e.stderr) console.error(e.stderr.toString());
}
