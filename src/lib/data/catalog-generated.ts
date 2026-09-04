/* eslint-disable */
/** Généré depuis FoodBooking — ne pas éditer à la main.
 *  Source: scripts/foodbooking-menu.json
 *  Régénérer: node scripts/generate-catalog-from-foodbooking.cjs
 */
import type { CatalogCategory, CatalogProduct } from "./catalog-types";

export const GENERATED_CATEGORIES: CatalogCategory[] = [
  {
    "slug": "populaires",
    "name": "Populaires",
    "emoji": "🔥",
    "sortOrder": 0
  },
  {
    "slug": "infos",
    "name": "INFORMATIONS LIVRAISON",
    "emoji": "📍",
    "sortOrder": 1
  },
  {
    "slug": "menus",
    "name": "MENUS D’ÉTÉ 🌞",
    "emoji": "🌞",
    "sortOrder": 2
  },
  {
    "slug": "boxs",
    "name": "NOS BOXS🔥",
    "emoji": "🔥",
    "sortOrder": 3
  },
  {
    "slug": "burgers",
    "name": "NOS BURGERS, TACOS & KEBABS DU CHEF🍔🥙🔥",
    "emoji": "🍔",
    "sortOrder": 4
  },
  {
    "slug": "snacks",
    "name": "Nos Snacks d'Excellence 🍟🍗",
    "emoji": "🍗",
    "sortOrder": 5
  },
  {
    "slug": "wraps",
    "name": "Nos Wraps🌯",
    "emoji": "🌯",
    "sortOrder": 6
  },
  {
    "slug": "salades",
    "name": "Nos Salades 🥗",
    "emoji": "🥗",
    "sortOrder": 7
  },
  {
    "slug": "americains",
    "name": "Nos Américains gratinés🔥",
    "emoji": "🥖",
    "sortOrder": 8
  },
  {
    "slug": "plats",
    "name": "Plats de la semaine 🍽️",
    "emoji": "🍽️",
    "sortOrder": 9
  },
  {
    "slug": "frites",
    "name": "Nos frites gourmandes🔥",
    "emoji": "🍟",
    "sortOrder": 10
  },
  {
    "slug": "desserts",
    "name": "Dessert du chef 🍰",
    "emoji": "🍰",
    "sortOrder": 11
  },
  {
    "slug": "boissons",
    "name": "Nos boissons🥤 Punch🍹et Vins🥂🍷",
    "emoji": "🥤",
    "sortOrder": 12
  }
];

export const GENERATED_PRODUCTS: CatalogProduct[] = [
  {
    "slug": "lire-avant-de-commander",
    "name": "📍LIRE AVANT DE COMMANDER",
    "description": "📍 Terrain, camping ou lieu difficile à localiser ? Indiquez l'adresse la plus proche et précisez votre emplacement dans les commentaires de commande.",
    "priceCents": 0,
    "categorySlug": "infos",
    "image": "/images/food/delivery.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "menu-d-ete-leger",
    "name": "🌞 Menu d'été léger",
    "description": "Salade de la mer aux gambas et cocktail de fruits de mer, accompagnée de toasts à l'aïoli, salade, 2 rouleaux de printemps au filet de colins persillé , ½ baguette, sauces et 1L de S.PELLEGRINO ou Cristaline.",
    "priceCents": 1500,
    "categorySlug": "menus",
    "image": "/images/food/food-spread.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix de l'eau",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "S.PELLEGRINO",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Cristaline",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "box-wraps-duo-aux-boeufs",
    "name": "🌯Box Wraps Duo aux Bœufs",
    "description": "Deux wraps généreusement garnis de brochettes de bœuf :\n🥩 Wrap 1 : salade, sauce aïoli et brochettes de bœuf.\n🧀 Wrap 2 : brochettes de bœuf, fromage, sauce cheddar et oignons caramélisés.\n🍟 Le tout accompagné d’une portion de frites au cheddar.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "box-americaine-x2",
    "name": "Box Américaine x2",
    "description": "2 pains briochés garnis:                                                                                                 Américains 1 : mayonnaise, 2 steaks, 2 oeufs, salade et tomate  -Américain 2 : sauce fromagère, lardons, chorizo et fromage gratiné.  Servie avec une portion de frites au cheddar.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "box-fish-chips",
    "name": "Box Fish & Chips",
    "description": "2 Burgers au poisson pané (salade, tomates, oignons, sauce tartare), frites , 2 calamars frits, gambas poêlées à l'ail et au persil, sauce tartare.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "french-box-rouge",
    "name": "FRENCH BOX ROUGE🍅",
    "description": "Composée d'une pizza chorizo (base tomate) + 2 Smash Burgers 1 steak, cheddar, salade, tomates, oignons caramélisés, sauce burger.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "french-box-blanche",
    "name": "FRENCH BOX BLANCHE",
    "description": "Composée d'une pizza lardons oignons persillade (base crème) + 2 Smash Burgers 1 steak,cheddar, salade, tomates, oignons caramélisés, sauce burger.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "la-box-classique",
    "name": "LA BOX CLASSIQUE🔥",
    "description": "Le combo parfait : 1 kebab, 1 tacos tenders chorizo cheddar, des frites cheddar gourmandes.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix sauce kebab",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Blanche",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "la-box-berliner",
    "name": "LA BOX BERLINER🔥",
    "description": "Kebab poulet légumes et Wrap tenders accompagné de frites cheddar .",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix sauce kebab",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Blanche",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "la-box-wraps-duo",
    "name": "LA BOX WRAPS DUO🔥",
    "description": "Une box composée de 2 wraps savoureux :\n🌯 Wrap JB avec champignons poêlés à la persillade et sauce fromagère fondante, salades.\n🌯 Wrap Tenders Chorizo avec tenders croustillants, chorizo grillé, sauce fromagère et persillade. Frites cheddar.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "box-wrappizz-poulet-curry",
    "name": "Box Wrappizz poulet curry",
    "description": "Wrap poulet curry accompagné de frites gratinés au cheddar, poivrons frais et herbes aromatiques, frites cheddar.",
    "priceCents": 1500,
    "categorySlug": "boxs",
    "image": "/images/food/feast.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "hamburger-brioche",
    "name": "Hamburger brioché",
    "description": "Pain brioché, viande au choix (bœuf ou tenders), salade , tomates, cheddar...",
    "priceCents": 350,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix de la viande",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Bœuf",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Tenders",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "hamburger-smashe",
    "name": "Hamburger smashé",
    "description": "Hamburger 2 steaks smashés salade, tomates, oignons caramélisés, cheddar, sauce burger.",
    "priceCents": 450,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "menu-smash-burger-wrap",
    "name": "Menu Smash Burger, wrap",
    "description": "2 Smash Burgers 2 steak, cheddar, salade, tomates, oignons caramélisés, sauce burger & 1 wrap poulet crudités  avec frites.",
    "priceCents": 1500,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": true,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "kebab",
    "name": "Kebab",
    "description": "Kebab, salade, tomates, oignon, poulet légumes.",
    "priceCents": 800,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix sauce kebab",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Blanche",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "kebab-avec-frites",
    "name": "Kebab avec Frites",
    "description": "Kebab, salade, tomates, oignons, poulet légumes avec frites.",
    "priceCents": 1150,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix sauce kebab",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Blanche",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "tacos-gratine-tenders-chorizo",
    "name": "Tacos gratiné tenders chorizo",
    "description": "Tacos gratiné, tenders, chorizo, emmental, sauce fromagère cheddar.",
    "priceCents": 1200,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Frites sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Frites",
            "priceCents": 300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "tacos-gratine-chevre-miel",
    "name": "Tacos gratiné chèvre miel",
    "description": "Tacos gratiné chèvre miel, viande de porc caramélisé, sauce fromagère persillade, oignons frits.",
    "priceCents": 1200,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Frites sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Frites",
            "priceCents": 300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "tacos-gratine-jambon-cru",
    "name": "Tacos gratiné Jambon cru",
    "description": "Tacos gratiné jambon cru, fromage (bleu), saucisse fumée, persillade.",
    "priceCents": 1200,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Frites sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Frites",
            "priceCents": 300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "maxi-tacos-kebab",
    "name": "Maxi Tacos Kebab",
    "description": "Tacos Kebab fromage emmental, oignons caramélisé, sauce fromagère,sauce algérienne.",
    "priceCents": 1200,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Frites sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Frites",
            "priceCents": 300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "maxi-tacos-cordon-bleu",
    "name": "Maxi Tacos Cordon Bleu",
    "description": "Tacos Cordon Bleu, salade, tomates, oignons, sauce fromagère.",
    "priceCents": 1200,
    "categorySlug": "burgers",
    "image": "/images/food/smash.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Frites sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Frites",
            "priceCents": 300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "corndog-x2",
    "name": "CornDog X2",
    "description": "CornDog croustillant, saucisse gourmande et cheddar fondant. X2",
    "priceCents": 500,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "pilons-de-poulet-rotis-au-jambon-cru-pane-x4",
    "name": "Pilons de poulet rôtis au Jambon Cru  pané X4",
    "description": "Pilons de poulet rôtis enrobé de Jambon cru pané au piment d'Espelette. X4",
    "priceCents": 550,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "samoussas-panes-mozzarella-jambon-cru-x2",
    "name": "Samoussas panés mozzarella, jambon cru X2",
    "description": "Samoussas panés mozzarella, jambon cru, pommes de terre, pesto. X2",
    "priceCents": 500,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "samoussas-panes-au-boeuf-x2",
    "name": "Samoussas panés au boeuf  X2",
    "description": "Samoussas panés au bœuf, pommes de terre et fromage fondant, accompagnés de sauce fromagère. Croustillants à l’extérieur et ultra gourmands à l’intérieur. X2",
    "priceCents": 500,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "tenders-x5",
    "name": "Tenders x5",
    "description": "Tenders x5",
    "priceCents": 650,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Sauces maison",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "poulet-pane-x8",
    "name": "Poulet pané x8",
    "description": "Poulet pané x8",
    "priceCents": 750,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Sauces maison",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "riz-cantonais-xl",
    "name": "Riz Cantonais XL",
    "description": "Riz Cantonais XL",
    "priceCents": 1000,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Sauce Riz cantonais",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Sauce chien",
            "priceCents": 70,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix Salade festive riz cantonais",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Salade festive",
            "priceCents": 450,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "croquette-de-poulet-persille-200g-x2",
    "name": "Croquette de poulet persillé (200g) X2",
    "description": "Poulet tendre, persil frais, panure croustillante, fait maison. X2",
    "priceCents": 400,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "coquillettes-cheddar-saucisses-xl",
    "name": "Coquillettes Cheddar Saucisses XL",
    "description": "Coquillettes sauce cheddar avec saucisses portion XL.",
    "priceCents": 1000,
    "categorySlug": "snacks",
    "image": "/images/food/tenders.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "menu-wrap-brochette-poulet-sucre-sale",
    "name": "Menu Wrap brochette poulet sucré salé",
    "description": "Brochette de poulet marinée miel thym sauce soja anisette..., crudités, sauce aïoli vinaigré, frites, salade.",
    "priceCents": 1300,
    "categorySlug": "wraps",
    "image": "/images/food/wrap.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "wrappizz-poulet-curry",
    "name": "Wrappizz Poulet Curry",
    "description": "Wrap poulet curry accompagné de frites gratinés au cheddar, poivrons frais et herbes aromatiques.",
    "priceCents": 1500,
    "categorySlug": "wraps",
    "image": "/images/food/wrap.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "salade-mediterraneenne",
    "name": "Salade méditerranéenne🥗",
    "description": "Salade Méditerranéenne\nLaitue, concombre, tomates, olives et citron, accompagnés de filet de colin poêlé persillé et d’une délicieuse friture de petits poissons. 🌿🐟",
    "priceCents": 750,
    "categorySlug": "salades",
    "image": "/images/food/ingredients.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "salade-de-la-mer",
    "name": "Salade de la mer🥗",
    "description": "Salade de la mer aux gambas et cocktail de fruits de mer",
    "priceCents": 750,
    "categorySlug": "salades",
    "image": "/images/food/ingredients.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "salade-plat-chevre",
    "name": "Salade plat chèvre🥗",
    "description": "Une salade fraîche et gourmande mêlant crudités croquantes, bacon grillé et toasts de chèvre chaud fondant, le tout relevé d’une vinaigrette savoureuse.",
    "priceCents": 750,
    "categorySlug": "salades",
    "image": "/images/food/ingredients.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "salade-crousti-chicken",
    "name": "Salade crousti chicken🥗",
    "description": "Une salade fraîche et généreuse avec du poulet croustillant, des œufs fondants et des crudités croquantes, le tout accompagné d’une vinaigrette savoureuse.",
    "priceCents": 750,
    "categorySlug": "salades",
    "image": "/images/food/ingredients.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "l-americain-brochette-de-boeuf",
    "name": "L'Américain brochette de boeuf",
    "description": "Pain gratiné, brochette de bœuf 450gr, frites, sauce cheddar.",
    "priceCents": 1300,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "l-andouillette",
    "name": "L'andouillette",
    "description": "L'Américain Andouillette, jambon cru,fromage (bleu), persillade.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "l-americain-tenders-spicy-chorizo-a-duree-limitee",
    "name": "L' americain tenders spicy chorizo à durée limitée🌶🔥",
    "description": "Pain croustillant garni de tenders croustillants, chorizo épicé, frites, sauce cheddar pour un mélange gourmand et relevé.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "le-tenders-cheddar",
    "name": "Le Tenders Cheddar",
    "description": "Pain gratiné croustillant, tenders, fromage fondant, nappé de sauce cheddar, accompagné de frites. Ultra Gourmand.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "le-steak",
    "name": "Le Steak",
    "description": "Pain gratiné, steak haché savoureux, double sauce cheddar & fromagère, persillade et frites. Fondant et puissant en goût.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "le-chevre-miel",
    "name": "Le Chèvre miel",
    "description": "Pain gratiné, lardons grillés, chèvre fondant et touche sucrée de miel, avec frites nappées de sauce cheddar et fromagère.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "le-paysan",
    "name": "Le Paysan",
    "description": "Pain gratiné, saucisse fumée, frites, sauce cheddar et fromagère. Rustique, généreux et bien gourmand.",
    "priceCents": 1150,
    "categorySlug": "americains",
    "image": "/images/food/bacon-burger.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "plat-le-carry-de-camarons-accompagne-de-riz",
    "name": "Plat le carry de camarons accompagné de riz",
    "description": "Plat le carry de camarons accompagné de riz",
    "priceCents": 1150,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "plat-massale-maison-epice-mais-non-pimente",
    "name": "Plat Massalé maison(épicé mais non pimenté)🌶",
    "description": "Morceaux de poulet mijotés dans un mélange d'épices massalé, savoureux et parfumé, cuisinés maison. (épicé mais non pimenté)",
    "priceCents": 1150,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Choix accompagnement sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Riz cantonnais",
            "priceCents": 700,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coquillettes",
            "priceCents": 600,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Sauces maison sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Aïoli",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mayonnaise",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce pik-pik",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce nems",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Persillade",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fromagère",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sauce algérienne",
            "priceCents": 50,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "rougail-saucisses",
    "name": "Rougail saucisses",
    "description": "Rougail saucisses",
    "priceCents": 1150,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Accompagnement",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Riz",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coquillettes",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "menu-rougail-saucisses",
    "name": "Menu Rougail saucisses",
    "description": "Rougail saucisses savoureux accompagné de riz ou coquillettes, servi avec une petite salade, une boisson et un dessert. Un menu complet et généreux.",
    "priceCents": 1700,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Boissons",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Accompagnement",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Riz",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coquillettes",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": true
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "porc-au-caramel-legumes",
    "name": "Porc au caramel / légumes",
    "description": "Porc au caramel / légumes",
    "priceCents": 1150,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Accompagnement",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Riz",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coquillettes",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "menu-porc-au-caramel-legumes",
    "name": "Menu Porc au caramel / légumes",
    "description": "Porc au caramel fondant et parfumé, accompagné de riz ou coquillettes, avec une petite salade, une boisson et un dessert. Un menu gourmand aux notes sucrées-salées.",
    "priceCents": 1700,
    "categorySlug": "plats",
    "image": "/images/food/grill.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "optionGroups": [
      {
        "name": "Boissons",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Accompagnement",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Riz",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coquillettes",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Choix dessert",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 0,
            "isDefault": false,
            "unavailable": true
          }
        ]
      }
    ],
    "unavailable": true
  },
  {
    "slug": "frites-tenders",
    "name": "Frites tenders",
    "description": "Frites croustillantes, tenders, généreuse couche de fromage fondant et sauce cheddar. Ultra gourmand.",
    "priceCents": 750,
    "categorySlug": "frites",
    "image": "/images/food/fries.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "frites-boeuf-sucre-sale",
    "name": "Frites bœuf sucré salé",
    "description": "Frites croustillantes, bœuf sucré salé, fromage fondant persille sauce fromagère. Riche en goût et bien servi.",
    "priceCents": 750,
    "categorySlug": "frites",
    "image": "/images/food/fries.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "frites-chorizo-paprika",
    "name": "Frites chorizo paprika",
    "description": "Frites, chorizo grillé, sauce fromagère. Gourmand et relevé.",
    "priceCents": 750,
    "categorySlug": "frites",
    "image": "/images/food/fries.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "frites-tenders-chorizo",
    "name": "Frites tenders chorizo",
    "description": "Frites, chorizo grillé, tenders, sauce fromagère accompagné de cheddar.",
    "priceCents": 750,
    "categorySlug": "frites",
    "image": "/images/food/fries.jpg",
    "isPopular": false,
    "optionGroups": [
      {
        "name": "Choix dessert sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Entremet à la cerise🍒",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Entremet à l'abricot🍰🥥",
            "priceCents": 350,
            "isDefault": false,
            "unavailable": true
          },
          {
            "name": "Snickers glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Bounty glacé",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Coupe glacée vanille, citron & mangue",
            "priceCents": 500,
            "isDefault": false,
            "unavailable": false
          }
        ]
      },
      {
        "name": "Boissons sup",
        "required": true,
        "minSelect": 1,
        "maxSelect": 1,
        "options": [
          {
            "name": "Coca",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Fanta",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Ice-Tea",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Perrier",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Sprite",
            "priceCents": 150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "S.PELLEGRINO",
            "priceCents": 250,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Eau Cristaline 1L",
            "priceCents": 200,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin blanc VMV",
            "priceCents": 1150,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Rosé Côtes du Roussillon",
            "priceCents": 1000,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
            "priceCents": 4500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Exotique maison 1L",
            "priceCents": 1500,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Punch Pina colada maison 1L",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          },
          {
            "name": "Mojito menth 1L🍹",
            "priceCents": 1300,
            "isDefault": false,
            "unavailable": false
          }
        ]
      }
    ],
    "unavailable": false
  },
  {
    "slug": "coupe-glacee-vanille-citron-et-mangue",
    "name": "Coupe glacée vanille citron et mangue",
    "description": "Coupe glacée vanille, citron & mangue, décorée de fruits du moment et accompagnée d’un biscuit",
    "priceCents": 500,
    "categorySlug": "desserts",
    "image": "/images/food/dessert.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "snickers-glace",
    "name": "Snickers glacé",
    "description": "Friandise givré",
    "priceCents": 200,
    "categorySlug": "desserts",
    "image": "/images/food/dessert.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "bounty-glace",
    "name": "Bounty glacé",
    "description": "Friandise givré",
    "priceCents": 200,
    "categorySlug": "desserts",
    "image": "/images/food/dessert.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "entremet-a-la-cerise",
    "name": "Entremet à la cerise🍒",
    "description": "Délicieuse part d' entremet à la cerise fait maison.",
    "priceCents": 350,
    "categorySlug": "desserts",
    "image": "/images/food/dessert.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "unavailable": true
  },
  {
    "slug": "entremet-a-l-abricot",
    "name": "Entremet à l'abricot🍰🥥",
    "description": "Délicieuse part d'entremet à l'abricot et noix de coco fait maison.",
    "priceCents": 350,
    "categorySlug": "desserts",
    "image": "/images/food/dessert.jpg",
    "isPopular": false,
    "badge": "Indisponible",
    "unavailable": true
  },
  {
    "slug": "ice-tea",
    "name": "Ice tea",
    "description": "Ice tea",
    "priceCents": 150,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "coca-cola",
    "name": "Coca-Cola",
    "description": "Coca-Cola",
    "priceCents": 150,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "perrier",
    "name": "Perrier",
    "description": "Perrier",
    "priceCents": 150,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "fanta",
    "name": "Fanta",
    "description": "Fanta",
    "priceCents": 150,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "cristaline-1l",
    "name": "Cristaline 1L",
    "description": "Cristaline 1L",
    "priceCents": 200,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "eau-s-pellegrino-1l",
    "name": "EAU S.PELLEGRINO 1L",
    "description": "EAU S.PELLEGRINO 1L",
    "priceCents": 250,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "vmv-excellence-blanc-mont-ventoux",
    "name": "VMV Excellence Blanc - Mont Ventoux",
    "description": "Un vin blanc élégant et fruité du Mont Ventoux, aux notes d'abricot, de pêche blanche et d'agrumes. Frais il accompagne parfaitement les salades, poissons, fruits de mer, grillades et fromages.\n\nL'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    "priceCents": 1150,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "rose-cotes-du-roussillon",
    "name": "Rosé Côtes du Roussillon",
    "description": "Rosé Côtes du Roussillon",
    "priceCents": 1000,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "vin-d-exception-chateau-sanctus-saint-emilion-grand-cru-2017",
    "name": "Vin d’exception Château SANCTUS Saint émilion grand cru 2017",
    "description": "Château SANCTUS Saint émilion grand cru 2017",
    "priceCents": 4500,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "mojito-maison-1l",
    "name": "🍹Mojito maison 1L",
    "description": "🍹 Mojito\nMenthe fraîche, citron vert et rhum. Servi bien frais.",
    "priceCents": 1300,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "punch-exotique-maison-1l",
    "name": "🍹Punch Exotique Maison(1L)",
    "description": "🔞 Vente réservée aux majeurs. Livraison uniquement à domicile ou sur lieu privé. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    "priceCents": 1500,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  },
  {
    "slug": "punch-pina-colada-maison-1l",
    "name": "🍹Punch Pina Colada Maison (1L)",
    "description": "🔞 Vente réservée aux majeurs. Livraison uniquement à domicile ou sur lieu privé. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    "priceCents": 1300,
    "categorySlug": "boissons",
    "image": "/images/food/drink.jpg",
    "isPopular": false,
    "unavailable": false
  }
];
