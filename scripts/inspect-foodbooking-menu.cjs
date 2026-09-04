const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "foodbooking-menu.json");
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const menu = d.menu;

console.log("menu keys", Object.keys(menu));
console.log("categories", menu.categories.length);

for (const cat of menu.categories) {
  const items = cat.items || cat.menu_items || cat.products || [];
  const itemKey = cat.items
    ? "items"
    : cat.menu_items
      ? "menu_items"
      : cat.products
        ? "products"
        : Object.keys(cat).find((k) => Array.isArray(cat[k]));
  const arr = itemKey ? cat[itemKey] : [];
  console.log(
    `\n## ${cat.name} (active=${cat.active} sort=${cat.sort} ${itemKey}=${arr?.length ?? 0})`
  );
  console.log("cat keys", Object.keys(cat).join(","));
  if (arr?.length) {
    const sample = arr[0];
    console.log("item keys", Object.keys(sample).join(","));
    for (const it of arr.slice(0, 3)) {
      console.log(
        " -",
        it.name,
        "price=",
        it.price ?? it.prices ?? it.base_price,
        "desc=",
        (it.description || "").slice(0, 60)
      );
    }
    if (arr.length > 3) console.log(` ... +${arr.length - 3} more`);
  }
}

// Find where items live
function findItems(obj, p = "", depth = 0) {
  if (!obj || depth > 5) return;
  if (Array.isArray(obj) && obj[0]?.name && (obj[0].price != null || obj[0].prices)) {
    console.log(`ITEMS_AT ${p} n=${obj.length} first=${obj[0].name}`);
  }
  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === "object") findItems(v, `${p}.${k}`, depth + 1);
    }
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < Math.min(obj.length, 2); i++) {
      if (obj[i] && typeof obj[i] === "object") findItems(obj[i], `${p}[${i}]`, depth + 1);
    }
  }
}
console.log("\n=== find items ===");
findItems(menu, "menu");
