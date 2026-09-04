const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";
const result = netlifyApi("unlinkSiteRepo", { site_id: siteId });
console.log("Unlinked:", result.build_settings?.repo_url || "none");
console.log("Installation:", result.build_settings?.installation_id ?? "none");
