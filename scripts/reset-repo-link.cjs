const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";

// Reset broken API link — user must re-link via Netlify UI (GitHub App)
const result = netlifyApi("updateSite", {
  site_id: siteId,
  body: {
    build_settings: {
      repo: null,
      cmd: "npm run build:netlify",
    },
  },
});

console.log("Repo cleared:", result.build_settings?.repo_url || "none");
console.log("Re-liez le dépôt via: https://app.netlify.com/projects/speed-apero/settings/deploys");
