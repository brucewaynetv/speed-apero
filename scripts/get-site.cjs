const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const site = netlifyApi("getSite", { site_id: "23e59956-24ac-402f-a558-5123adbd3360" });
console.log(JSON.stringify({
  repo_url: site.build_settings?.repo_url,
  repo_branch: site.build_settings?.repo_branch,
  repo_provider: site.build_settings?.repo_provider,
  repo_path: site.build_settings?.repo_path,
  cmd: site.build_settings?.cmd,
  dir: site.build_settings?.dir,
  installation_id: site.build_settings?.installation_id,
  provider: site.build_settings?.provider,
  public_repo: site.build_settings?.public_repo,
  private_logs: site.build_settings?.private_logs,
  allowed_branches: site.build_settings?.allowed_branches,
}, null, 2));
