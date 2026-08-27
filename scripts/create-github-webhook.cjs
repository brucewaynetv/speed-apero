const { execSync } = require("child_process");

const body = JSON.stringify({
  name: "web",
  active: true,
  events: ["push"],
  config: {
    url: "https://api.netlify.com/build_hooks/6a902bc39f683925399a391e",
    content_type: "json",
    insecure_ssl: "0",
  },
});

const result = execSync(
  "gh api --method POST repos/brucewaynetv/speed-apero/hooks --input -",
  { input: body, encoding: "utf8" }
);

console.log(result);
