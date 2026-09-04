const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "foodbooking-menu.json");
const d = JSON.parse(fs.readFileSync(file, "utf8"));

console.log("keys", Object.keys(d));
for (const k of Object.keys(d)) {
  const v = d[k];
  const t = Array.isArray(v) ? `array[${v.length}]` : typeof v;
  console.log("-", k, t);
}

const menuKeys = ["menu", "menus", "categories", "items", "products", "sections", "catalog"];
for (const k of menuKeys) {
  if (d[k]) console.log("FOUND", k, Array.isArray(d[k]) ? d[k].length : typeof d[k]);
}

// Deep find arrays of objects with name+price-ish
function walk(obj, p = "", depth = 0) {
  if (!obj || depth > 4) return;
  if (Array.isArray(obj)) {
    if (obj.length && typeof obj[0] === "object" && obj[0]) {
      const keys = Object.keys(obj[0]);
      if (keys.some((k) => /name|title|label/i.test(k)) && keys.some((k) => /price|cost|amount/i.test(k))) {
        console.log(`CANDIDATE ${p} len=${obj.length} sampleKeys=${keys.slice(0, 12).join(",")}`);
      }
      if (keys.some((k) => /categor|section|group|items|products|dishes/i.test(k))) {
        console.log(`STRUCT ${p} len=${obj.length} sampleKeys=${keys.slice(0, 15).join(",")}`);
      }
    }
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === "object") walk(v, p ? `${p}.${k}` : k, depth + 1);
    }
  }
}
walk(d);

if (d.terms) console.log("terms", JSON.stringify(d.terms).slice(0, 500));
if (d.address || d.name) console.log("meta", d.name, d.address);
