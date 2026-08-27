const { execSync } = require("child_process");

function netlifyApi(method, data = {}) {
  const payload = JSON.stringify(data).replace(/"/g, '\\"');
  const out = execSync(`npx netlify api ${method} --data "${payload}"`, {
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const siteId = "23e59956-24ac-402f-a558-5123adbd3360";

const hook = netlifyApi("createSiteBuildHook", {
  site_id: siteId,
  body: {
    title: "GitHub push main",
    branch: "main",
  },
});

console.log("Build hook URL:", hook.url);
