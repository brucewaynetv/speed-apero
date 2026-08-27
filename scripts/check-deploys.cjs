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
const deploys = netlifyApi("listSiteDeploys", { site_id: siteId, per_page: 3 });

console.log("Repo:", site.build_settings?.repo_url);
console.log("Branch:", site.build_settings?.repo_branch);
console.log("Provider:", site.build_settings?.repo_provider);
console.log("\nRecent deploys:");
deploys.forEach((d) => {
  console.log(`- ${d.state} | ${d.context} | ${d.created_at} | ${d.title || d.deploy_url}`);
});
