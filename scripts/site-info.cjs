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
  name: site.name,
  admin_url: site.admin_url,
  account_id: site.account_id,
  account_slug: site.account_slug,
  url: site.url,
  repo_url: site.build_settings?.repo_url || null,
}, null, 2));
