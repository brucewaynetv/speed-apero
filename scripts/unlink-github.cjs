const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

// Unlink broken Git integration — GitHub Actions handles deploys
const siteId = "23e59956-24ac-402f-a558-5123adbd3360";
try {
  const result = netlifyApi("updateSite", {
    site_id: siteId,
    body: { repo: null },
  });
  console.log("Unlinked repo:", result.build_settings?.repo_url || "none");
} catch (e) {
  console.error(e.message);
}
