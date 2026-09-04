const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";
const site = netlifyApi("getSite", { site_id: siteId });

console.log("Repo:", site.build_settings?.repo_url);
console.log("Branch:", site.build_settings?.repo_branch);
console.log("Provider:", site.build_settings?.repo_provider);
console.log("Installation:", site.build_settings?.installation_id || site.build_settings?.repo?.installation_id);

const build = netlifyApi("createSiteBuild", { site_id: siteId });
console.log("\nBuild déclenché:", build.id, build.state, build.deploy_url);
