const fs = require("fs");
const path = require("path");

const d = JSON.parse(fs.readFileSync(path.join(__dirname, "foodbooking-menu.json"), "utf8"));

function dumpGroups(item) {
  console.log("ITEM", item.name, "price", item.price, "oos", item.is_out_of_stock);
  console.log(" sizes", (item.sizes || []).length, JSON.stringify(item.sizes?.[0] || null).slice(0, 200));
  const groups = item.groups || [];
  console.log(" groups", groups.length);
  for (const g of groups.slice(0, 6)) {
    console.log("  GROUP", g.name || g.title, "keys", Object.keys(g).join(","));
    const opts = g.items || g.options || g.extras || g.condiments || [];
    console.log("   optsKey items?", !!g.items, "n=", opts.length);
    if (opts[0]) console.log("   opt0", JSON.stringify(opts[0]).slice(0, 250));
    // deeper
    for (const [k, v] of Object.entries(g)) {
      if (Array.isArray(v) && v[0] && typeof v[0] === "object") {
        console.log(`   ARR ${k}[${v.length}] keys=${Object.keys(v[0]).join(",")}`);
        console.log(`     sample ${JSON.stringify(v[0]).slice(0, 220)}`);
      }
    }
  }
}

const summer = d.menu.categories.find((c) => c.name.includes("ÉTÉ"));
dumpGroups(summer.items[0]);
console.log("\n====\n");
const burgers = d.menu.categories.find((c) => c.name.includes("BURGERS"));
dumpGroups(burgers.items[0]);
console.log("\n====\n");
const box = d.menu.categories.find((c) => c.name.includes("BOXS"));
dumpGroups(box.items[0]);
