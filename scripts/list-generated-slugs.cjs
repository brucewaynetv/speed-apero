const fs = require("fs");
const path = require("path");
const t = fs.readFileSync(
  path.join(__dirname, "../src/lib/data/catalog-generated.ts"),
  "utf8"
);
const products = [];
const re = /"slug": "([^"]+)",\s*"name": "([^"]+)",\s*"description"/g;
let m;
while ((m = re.exec(t))) products.push({ slug: m[1], name: m[2] });
console.log("count", products.length);
for (const p of products) {
  if (/coca|snickers|frites|menu|box/i.test(p.slug + p.name)) {
    console.log(p.slug, "→", p.name);
  }
}
const cre = /"slug": "([^"]+)",\s*"name": "([^"]+)",\s*"emoji"/g;
console.log("---cats---");
while ((m = cre.exec(t))) console.log(m[1], "→", m[2]);
