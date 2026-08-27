const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";
const deploys = netlifyApi("listSiteDeploys", { site_id: siteId, per_page: 1 });
const deploy = deploys[0];
console.log("Deploy ID:", deploy.id);
console.log("State:", deploy.state);
console.log("Error:", deploy.error_message);
console.log("Summary:", deploy.summary);

try {
  const log = netlifyApi("getSiteDeploy", { site_id: siteId, deploy_id: deploy.id });
  console.log("Deploy meta:", JSON.stringify({ state: log.state, error_message: log.error_message, commit_ref: log.commit_ref, commit_url: log.commit_url }, null, 2));
} catch (e) {
  console.error(e.message);
}
