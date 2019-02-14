// 'use strict';

// var async = require('async');
// module.exports = function(app) {
//   var mongoDB = app.dataSources.MongoDB;

//   async.auto({
//     createCategories: function(cb) {
//       console.log('createCategories');
//       mongoDB.automigrate('Category', function(err) {
//         if (err) return cb(err);
//         var Category = app.models.Category;
//         Category.create([
//           {name: 'Alcohol', menuItem: true},
//           {name: 'Drinks', menuItem: true},
//           {name: 'Cocktail', menuItem: true},
//           {name: 'Pasta', menuItem: true},
//           {name: 'Meat and Dairy Products', menuItem: false},
//           {name: 'Fruits', menuItem: false},
//           {name: 'Vegetables', menuItem: false},
//           {name: 'Spice', menuItem: false},
//           {name: 'Second Dishes', menuItem: true},
//           {name: 'Grain Products', menuItem: false},
//           {name: 'Grocery', menuItem: false},
//           {name: 'Other', menuItem: false},
//           {name: 'Greens', menuItem: false},
//           {name: 'Second Dishes', menuItem: true},
//         ], cb);
//       });
//     },
//     createItems: ['createCategories', function(results, cb) {
//       console.log('createItems');
//       mongoDB.automigrate('Item', function(err) {
//         if (err) return cb(err);
//         var Item = app.models.Item;
//         Item.create([{
//           name: 'Spaghetti',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'recipe-3646_Large400_ID-1446878.jpg',
//           description: 'Spaghetti (Italian pronunciation:[spaˈɡetti]; sing. spaghetto) is a long, thin, solid, cylindrical pasta.[1] Spaghettoni is a thicker form of spaghetti, while capellini is a very thin spaghetti. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat and water and sometimes enriched with vitamins and minerals. Authentic Italian spaghetti is made from durum wheat semolina, but elsewhere it may be made with other kinds of flour.[2] Typically the pasta is white because refined flour is used, but whole wheat flour may be added.',
//           categoryId: results.createCategories[0].id,
//           tare: 'pack',
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.055,
//           autoSellingPrice: true,
//           sellingPrice: 0.10,

//         }, {
//           name: 'Butter',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'Butter.jpg',
//           description: 'Butter is a dairy product with high butterfat content which is solid when chilled and at room temperature in some regions, and liquid when warmed. It is made by churning fresh or fermented cream or milk to separate the butterfat from the buttermilk. It is generally used as a spread on plain or toasted bread products and a condiment on cooked vegetables, as well as in cooking, such as baking, sauce making, and pan frying. Butter consists of butterfat, milk proteins and water, and often added salt.',
//           categoryId: results.createCategories[1].id,
//           tare: 'pack',
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.056,
//           autoSellingPrice: true,
//           sellingPrice: 0.10,

//         }, {
//           name: 'Garlic',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '2c0307d2aa7bb587a279bea603f68164.jpg',
//           description: 'Garlic is native to Central Asia and northeastern Iran, and has long been a common seasoning worldwide, with a history of several thousand years of human consumption and use.[4][5] It was known to ancient Egyptians, and has been used both as a food flavoring and as a traditional medicine.[6][7] China produces some 80% of the world supply of garlic.',          categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.001,
//           autoSellingPrice: true,
//           sellingPrice: 0.002,

//         }, {
//           name: 'Red onion',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'red-onions.jpg',
//           description: 'Red onions are cultivars of the onion (Allium cepa) with purplish-red skin and white flesh tinged with red.These onions tend to be medium to large in size and have a mild[1][2] to sweet flavor.[citation needed] They are often consumed raw, grilled or lightly cooked with other foods, or added as a decoration to salads.[2] They tend to lose their colour when cooked.',
//           categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.025,
//           autoSellingPrice: true,
//           sellingPrice: 0.050,

//         }, {
//           name: 'Bacon',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '805075711.jpg',
//           description: 'Bacon is a type of salt-cured pork.[1] Bacon is prepared from several different cuts of meat, typically from the pork belly or from back cuts, which have less fat than the belly. It is eaten on its own, as a side dish (particularly in breakfasts), or used as a minor ingredient to flavour dishes (e.g., the club sandwich). Bacon is also used for barding and larding roasts, especially game, including venison and pheasant. The word is derived from the Old High German bacho, meaning "buttock", "ham" or "side of bacon", and is cognate with the Old French bacon.[2][3]',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 1,
//           autoSellingPrice: true,
//           sellingPrice: 2,

//         }, {
//           name: 'Cream 20%',
//           executor: null,
//           type: 'ingredient',
//           image: '2580039.jpg',
//           description: 'Cream is a dairy product composed of the higher-butterfat layer skimmed from the top of milk before homogenization. In un-homogenized milk, the fat, which is less dense, will eventually rise to the top. In the industrial production of cream, this process is accelerated by using centrifuges called "separators". In many countries, it is sold in several grades depending on the total butterfat content. It can be dried to a powder for shipment to distant markets, and is known to contain high levels of saturated fat.[1][2]',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 0,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.045,
//           autoSellingPrice: true,
//           sellingPrice: 0.090,

//         }, {
//           name: 'Cheese Parmezan',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'Parmesan+above-9-Edit+copy.jpg',
//           description: 'Parmigiano-Reggiano (/ˌpɑːrmɪˌdʒɑːnoʊ rɛˈdʒɑːnoʊ/; Italian pronunciation:[ˌparmiˈdʒaːno redˈdʒaːno]) is an Italian hard, granular cheese. The name "Parmesan" is often used generically for the same cheese made outside the traditional areas of production in Italy, although this is prohibited in trading in the European Economic Area under European law.[1]',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.30,
//           autoSellingPrice: true,
//           sellingPrice: 0.60,

//         }, {
//           name: 'Chicken Egg',
//           executor: null,
//           type: 'ingredient',
//           image: '543c71eab12d3.image.jpg',
//           description: 'Some eggs are laid by female animals of many different species, including birds, reptiles, amphibians, mammals, and fish, and have been eaten by humans for thousands of years.[1] Bird and reptile eggs consist of a protective eggshell, albumen (egg white), and vitellus (egg yolk), contained within various thin membranes. The most commonly consumed eggs are chicken eggs. Other poultry eggs including those of duck and quail also are eaten. Fish eggs are called roe and caviar.',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 0,
//           unit: 'pieces',
//           menuItem: false,
//           averageCost: 0.10,
//           autoSellingPrice: true,
//           sellingPrice: 0.20,

//         }, {
//           name: 'Salt',
//           executor: null,
//           type: 'ingredient',
//           image: 'himalayan_salt-1.jpg',
//           description: 'Sodium chloride /ˌsoʊdiəm ˈklɔːraɪd/,[7] also known as salt (though sea salt also contains other chemical salts), is an ionic compound with the chemical formula NaCl, representing a 1:1 ratio of sodium and chloride ions. With molar masses of 22.99 and 35.45 g/mol respectively, 100 g of NaCl contains 39.34 g Na and 60.66 g Cl. Sodium chloride is the salt most responsible for the salinity of seawater and of the extracellular fluid of many multicellular organisms. In its edible form of table salt, it is commonly used as a condiment and food preservative. Large quantities of sodium chloride are used in many industrial processes, and it is a major source of sodium and chlorine compounds used as feedstocks for further chemical syntheses. A second major application of sodium chloride is de-icing of roadways in sub-freezing weather.',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.0001,
//           autoSellingPrice: true,
//           sellingPrice: 0.0002,

//         }, {
//           name: 'Black Pepper',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'black-pepper-400x300.jpg',
//           description: 'Piper nigrum (Piper nigrum) is a flowering vine in the family Piperaceae, cultivated for its fruit, which is usually dried and used as a spice and seasoning, known as a peppercorn. When fresh and fully mature, it is about 5mm (0.20in) in diameter and dark red, and contains a single seed, like all drupes. Peppercorns and the ground pepper derived from them may be described simply as pepper, or more precisely as black pepper (cooked and dried unripe fruit), green pepper (dried unripe fruit), and white pepper (ripe fruit seeds).',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.0001,
//           autoSellingPrice: true,
//           sellingPrice: 0.0001,

//         }, {
//           name: 'Pasta Carbonara',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'l176068210.jpg',
//           description: 'The recipe is not fixed by a specific type of hard cheese or pasta. The cheese is usually Pecorino Romano.[1] Spaghetti is the usual pasta, but fettuccine, rigatoni, linguine, or bucatini is also used. Either guanciale or pancetta can be used. Another common substitute outside Italy is lardons of smoked bacon.',
//           categoryId: results.createCategories[5].id,
//           tare: null,
//           quantity: 0,
//           weight: 610,
//           unit: 'g',
//           menuItem: true, 
//           averageCost: 89.9015,
//           autoSellingPrice: true,
//           sellingPrice: 177.0628,

//         }, {
//           name: 'Wheat flour',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '1-14091QF046222.jpg',
//           description: 'Wheat flour is a powder made from the grinding of wheat used for human consumption. Wheat varieties are called "soft" or "weak" if gluten content is low, and are called "hard" or "strong" if they have high gluten content. Hard flour, or bread flour, is high in gluten, with 12% to 14% gluten content, and its dough has elastic toughness that holds its shape well once baked. Soft flour is comparatively low in gluten and thus results in a loaf with a finer, crumbly texture.[1] Soft flour is usually divided into cake flour, which is the lowest in gluten, and pastry flour, which has slightly more gluten than cake flour.',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.02,
//           autoSellingPrice: true,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Olive oil',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'blog-featured-LeftoverOliveOil-400x300.jpg',
//           description: 'Olive oil is a liquid fat obtained from olives (the fruit of Olea europaea; family Oleaceae), a traditional tree crop of the Mediterranean Basin. The oil is produced by pressing whole olives. It is commonly used in cooking, whether for frying or as a salad dressing. It is also used in cosmetics, pharmaceuticals, and soaps, and as a fuel for traditional oil lamps, and has additional uses in some religions. There is limited evidence of its possible health benefits. The olive is one of three core food plants in Mediterranean cuisine; the other two are wheat and grapes.',
//           categoryId: results.createCategories[7].id,
//           tare: null,
//           quantity: 0,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.02,
//           autoSellingPrice: true,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Dry yeast',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'active-dry-yeast-175381565-599c8d6903f4020011860f94.jpg',
//           description: 'Yeasts are eukaryotic, single-celled microorganisms classified as members of the fungus kingdom. The first yeast originated hundreds of millions of years ago, and 1,500 species are currently identified.[1][2][3] They are estimated to constitute 1% of all described fungal species.[4] Yeasts are unicellular organisms which evolved from multicellular ancestors,[5] with some species having the ability to develop multicellular characteristics by forming strings of connected budding cells known as pseudohyphae or false hyphae.[6] Yeast sizes vary greatly, depending on species and environment, typically measuring 3–4µm in diameter, although some yeasts can grow to 40µm in size.[7] Most yeasts reproduce asexually by mitosis, and many do so by the asymmetric division process known as budding.',
//           categoryId: results.createCategories[7].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.02,
//           autoSellingPrice: true,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Water',
//           executor: null,
//           type: 'ingredient',
//           image: '400x300xshutterstock_257387209.jpg.pagespeed.ic.pJc2_iUVZV.jpg',
//           description: 'Water plays an important role in the world economy. Approximately 70% of the freshwater used by humans goes to agriculture.[4] Fishing in salt and fresh water bodies is a major source of food for many parts of the world. Much of long-distance trade of commodities (such as oil and natural gas) and manufactured products is transported by boats through seas, rivers, lakes, and canals. Large quantities of water, ice, and steam are used for cooling and heating, in industry and homes. Water is an excellent solvent for a wide variety of chemical substances; as such it is widely used in industrial processes, and in cooking and washing. Water is also central to many sports and other forms of entertainment, such as swimming, pleasure boating, boat racing, surfing, sport fishing, and diving.',
//           categoryId: results.createCategories[8].id,
//           tare: null,
//           quantity: 0,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.0001,
//           autoSellingPrice: true,
//           sellingPrice: 0.0001,

//         }, {
//           name: 'Pizza dough',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'tossing-a-pizza-1.jpg',
//           description: 'Dough (/doʊ/(help·info)) is a thick, malleable, sometimes elastic, paste made out of any grains, leguminous or chestnut crops. Dough is typically made by mixing flour with a small amount of water and/or other liquid, and sometimes includes flour yeast or other leavening agents as well as other ingredients such as various fats or flavorings.',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 0,
//           weight: 198,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 3.9003,
//           autoSellingPrice: true,
//           sellingPrice: 7.8006,

//         }, {
//           name: 'Mozarella Cheese',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'small_109601.jpg',
//           description: 'Fresh mozzarella is generally white, but may vary seasonally to slightly yellow depending on the animal"s diet.[4] Due to its high moisture content, it is traditionally served the day after it is made,[5] but can be kept in brine for up to a week[6] or longer when sold in vacuum-sealed packages. Low-moisture mozzarella can be kept refrigerated for up to a month,[7] though some shredded low-moisture mozzarella is sold with a shelf life of up to six months.[8] Mozzarella of several kinds is also used for most types of pizza and several pasta dishes, or served with sliced tomatoes and basil in Caprese salad.',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.30,
//           autoSellingPrice: true,
//           sellingPrice: 0.40,

//         }, {
//           name: 'Basilic',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'aabc1d3c15bd08551088bcc20b94cc59.jpg',
//           description: 'Basil is native to tropical regions from central Africa to Southeast Asia.[3] It is a tender plant, and is used in cuisines worldwide. Depending on the species and cultivar, the leaves may taste somewhat like anise, with a strong, pungent, often sweet smell.',
//           categoryId: results.createCategories[9].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.01,
//           autoSellingPrice: true,
//           sellingPrice: 0.02,

//         }, {
//           name: 'Sugar',
//           executor: null,
//           type: 'ingredient',
//           image: 'Blog111Sucrose101.jpg',
//           description: 'Sugar is the generic name for sweet-tasting, soluble carbohydrates, many of which are used in food. The various types of sugar are derived from different sources. Simple sugars are called monosaccharides and include glucose (also known as dextrose), fructose, and galactose. "Table sugar" or "granulated sugar" refers to sucrose, a disaccharide of glucose and fructose. In the body, sucrose is hydrolysed into fructose and glucose.',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.007,
//           autoSellingPrice: true,
//           sellingPrice: 0.014,

//         }, {
//           name: 'Tomatoes',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'tomato.jpg',
//           description: 'The tomato (see pronunciation) is the edible, often red, berry of the nightshade Solanum lycopersicum,[2][1] commonly known as a tomato plant. The species originated in western South America.[2][3] The Nahuatl (Aztec language) word tomatl gave rise to the Spanish word tomate, from which the English word tomato derived.[3][4] Its use as a cultivated food may have originated with the indigenous peoples of Mexico.[2][5] The Spanish encountered the tomato from their contact with the Aztec during the Spanish colonization of the Americas and brought it to Europe. From there, the tomato was introduced to other parts of the European-colonized world during the 16th century.[2]',
//           categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 0,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.10,
//           autoSellingPrice: true,
//           sellingPrice: 0.20,

//         }, {
//           name: 'Pizza Margarita',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'gre_gar.jpg',
//           description: 'Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella fior di latte,[1] fresh basil, salt and extra-virgin olive oil.',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 0,
//           weight: 703,
//           unit: 'g',
//           menuItem: true,
//           averageCost: 841.8228,
//           autoSellingPrice: true,
//           sellingPrice: 107.5131,

//         }, {
//           name: 'Green Apple',
//           executor: null,
//           type: 'ingredient',
//           image: 'recipe-15540_Large400_ID-1511012.jpg',
//           description: 'An apple is a sweet, edible fruit produced by an apple tree (Malus pumila). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek and European Christian traditions.',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 0,
//           unit: 'pieces',
//           menuItem: false,
//           averageCost: 0.02,
//           autoSellingPrice: true,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Fresh Green Apple Juice',
//           executor: 'bartender',
//           type: 'recipe',
//           image: 'Fresh_green_apple_ju-min.jpg',
//           description: 'Apple juice is a fruit juice made by the maceration and pressing of an apple. The resulting expelled juice may be further treated by enzymatic and centrifugal clarification to remove the starch and pectin, which holds fine particulate in suspension, and then pasteurized for packaging in glass, metal or aseptic processing system containers, or further treated by dehydration processes to a concentrate. ',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 0,
//           weight: 0,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.04,
//           autoSellingPrice: true, 
//           sellingPrice: 0.08,

//         }], cb);
//       });
//     }],
//     createIngredients: ['createItems',   function(results, cb) {
//       console.log('createIngredients');
//       mongoDB.automigrate('Ingredient', function(err) {
//         if (err) return cb(err);
//         var Ingredient = app.models.Ingredient;
//         Ingredient.create([{
//           ingredientId: results.createItems[0].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 250,
//         }, {
//           ingredientId: results.createItems[1].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 20,
//         }, {
//           ingredientId: results.createItems[2].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 6,
//         }, {
//           ingredientId: results.createItems[3].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 25,
//         }, {
//           ingredientId: results.createItems[4].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 50,
//         }, {
//           ingredientId: results.createItems[5].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 200,
//         }, {
//           ingredientId: results.createItems[6].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 50,
//         }, {
//           ingredientId: results.createItems[7].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 4,
//         }, {
//           ingredientId: results.createItems[8].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 3,
//         }, {
//           ingredientId: results.createItems[9].id,
//           recipeId: results.createItems[10].id,
//           recipeQuantity: 2,
//         }, {
//           ingredientId: results.createItems[11].id,
//           recipeId: results.createItems[15].id,
//           recipeQuantity: 175,
//         }, {
//           ingredientId: results.createItems[8].id,
//           recipeId: results.createItems[15].id,
//           recipeQuantity: 3,
//         }, {
//           ingredientId: results.createItems[12].id,
//           recipeId: results.createItems[15].id,
//           recipeQuantity: 15,
//         }, {
//           ingredientId: results.createItems[13].id,
//           recipeId: results.createItems[15].id,
//           recipeQuantity: 5,
//         }, {
//           ingredientId: results.createItems[14].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 125,
//         }, {
//           ingredientId: results.createItems[15].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 200,
//         }, {
//           ingredientId: results.createItems[16].id,
//           recipeId: results.createItems[20].id, 
//           recipeQuantity: 100,
//         }, {
//           ingredientId: results.createItems[6].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 70,
//         }, {
//           ingredientId: results.createItems[8].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 3,
//         }, {
//           ingredientId: results.createItems[17].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 5,
//         }, {
//           ingredientId: results.createItems[18].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 100,
//         }, {
//           ingredientId: results.createItems[19].id,
//           recipeId: results.createItems[20].id,
//           recipeQuantity: 100,
//         }], cb);
//       });
//     }],
//     createPurchaseInvoice: ['createIngredients', function(results, cb) {
//       console.log('PurchaseInvoice');
//       mongoDB.automigrate('PurchaseInvoice', function(err) {
//         if (err) return cb(err);
//         var PurchaseInvoice = app.models.PurchaseInvoice;
//         PurchaseInvoice.create([
//           {
//             supplierId: 'Tube',
//             date: new Date(2019, 0, 10),
//             profiled: false,
//             total: 1058.05,

//           },
//           {
//             supplierId: 'Tube',
//             date: new Date(2019, 0, 15),
//             profiled: false,
//             total: 1658,

//           },
//         ], cb);
//       });
//     }],
//     createSalesInvoice: ['createIngredients',   function(results, cb) {
//       console.log('SalesInvoice: ');
//       mongoDB.automigrate('SalesInvoice', function(err) {
//         if (err) return cb(err);
//         var SalesInvoice = app.models.SalesInvoice;
//         SalesInvoice.create([
//           {
//             visitorId: 'Guest', 
//             openedAt: new Date().toISOString(),
//             closedAt: null, 
//             state: 'opened',
//             total: 5044.00,
//           },
//           {
//             visitorId: 'Guest',
//             openedAt: new Date().toISOString(),
//             closedAt: null,
//             state: 'opened',
//             total: 2000.00,
//           },
//           {
//             visitorId: 'Guest',
//             openedAt: new Date().toISOString(),
//             closedAt: null,
//             state: 'opened',
//             total: 2000.00,
//           },

//           {
//             visitorId: 'Guest',
//             openedAt: new Date().toISOString(),
//             closedAt: new Date(new Date() + (30 * 60000)).toISOString(),
//             state: 'closed',
//             total: 2000.00,
//           },
//         ], cb);
//       });
//     }],
//     createRelPurchaseInvoiceItem: ['createPurchaseInvoice', function(results, cb) {
//       console.log('relPurchaseInvoiceItem');
//       mongoDB.automigrate('relPurchaseInvoiceItem', function(err) {
//         if (err) return cb(err);
//         var relPurchaseInvoiceItem = app.models.relPurchaseInvoiceItem;
//         relPurchaseInvoiceItem.create([
//           {
//             itemId: results.createItems[0].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 8000,
//             purchasePrice: results.createItems[0].averageCost,
//             total: 8000 * results.createItems[0].averageCost,
//           },
//           {
//             itemId: results.createItems[1].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 5000,
//             purchasePrice: results.createItems[1].averageCost,
//             total: 5000 * results.createItems[1].averageCost,
//           },
//           {
//             itemId: results.createItems[2].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 1000,
//             purchasePrice: results.createItems[2].averageCost,
//             total: 1000 * results.createItems[2].averageCost,
//           },
//           {
//             itemId: results.createItems[3].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 1000,
//             purchasePrice: results.createItems[3].averageCost,
//             total: 1000 * results.createItems[3].averageCost,
//           },
//           {
//             itemId: results.createItems[4].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 100,
//             purchasePrice: results.createItems[4].averageCost,
//             total: 100 * results.createItems[4].averageCost,
//           },
//           {
//             itemId: results.createItems[5].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 600,
//             purchasePrice: results.createItems[5].averageCost,
//             total: 600 * results.createItems[5].averageCost,
//           },
//           {
//             itemId: results.createItems[6].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 600,
//             purchasePrice: results.createItems[6].averageCost,
//             total: 600 * results.createItems[6].averageCost,
//           },
//           {
//             itemId: results.createItems[7].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 50,
//             purchasePrice: results.createItems[7].averageCost,
//             total: 50 * results.createItems[7].averageCost,
//           },
//           {
//             itemId: results.createItems[8].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 250,
//             purchasePrice: results.createItems[8].averageCost,
//             total: 250 * results.createItems[8].averageCost,
//           },
//           {
//             itemId: results.createItems[9].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: 250,
//             purchasePrice: results.createItems[9].averageCost,
//             total: 250 * results.createItems[9].averageCost,
//           },
//           {
//             itemId: results.createItems[11].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 20000,
//             purchasePrice: results.createItems[11].averageCost,
//             total: 20000 * results.createItems[11].averageCost,
//           },
//           {
//             itemId: results.createItems[12].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 5000,
//             purchasePrice: results.createItems[12].averageCost,
//             total: 5000 * results.createItems[12].averageCost,
//           },
//           {
//             itemId: results.createItems[13].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 600,
//             purchasePrice: results.createItems[13].averageCost,
//             total: 600 * results.createItems[13].averageCost,
//           },
//           {
//             itemId: results.createItems[14].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 60000,
//             purchasePrice: results.createItems[14].averageCost,
//             total: 60000 * results.createItems[14].averageCost,
//           },
//           {
//             itemId: results.createItems[16].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 2000,
//             purchasePrice: results.createItems[16].averageCost,
//             total: 2000 * results.createItems[16].averageCost,
//           },
//           {
//             itemId: results.createItems[17].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 500,
//             purchasePrice: results.createItems[17].averageCost,
//             total: 500 * results.createItems[17].averageCost,
//           },
//           {
//             itemId: results.createItems[18].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 5000,
//             purchasePrice: results.createItems[18].averageCost,
//             total: 5000 * results.createItems[18].averageCost,
//           },
//           {
//             itemId: results.createItems[19].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: 5000,
//             purchasePrice: results.createItems[19].averageCost,
//             total: 5000 * results.createItems[19].averageCost,
//           },
//         ], cb);
//       });
//     }],
//     createRelSalesInvoiceItem: ['createSalesInvoice',   function(results, cb) {
//       console.log('relSalesInvoiceItem');
//       mongoDB.automigrate('relSalesInvoiceItem', function(err) {
//         if (err) return cb(err);
//         var relSalesInvoiceItem = app.models.relSalesInvoiceItem;
//         relSalesInvoiceItem.create([
//           {
//             itemId: results.createItems[10].id,
//             sellingPrice: results.createItems[10].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[0].id,
//             averageCost: results.createItems[10].averageCost,
//             executor: results.createItems[10].executor,
//             total: results.createItems[10].sellingPrice * 1,
//             quantity: 1,
//             state: 'new',
//             newAt: new Date().toISOString(),
//             progressAt: null,
//             readyAt: null,
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[20].id,
//             sellingPrice: results.createItems[20].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[0].id,
//             averageCost: results.createItems[20].averageCost,
//             executor: results.createItems[20].executor,
//             total: results.createItems[20].sellingPrice * 2,
//             quantity: 2,
//             state: 'progress',
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (10 * 60000)).toISOString(),
//             readyAt: null,
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[20].id,
//             sellingPrice: results.createItems[20].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[1].id,
//             averageCost: results.createItems[20].averageCost,
//             executor: results.createItems[20].executor,
//             total: results.createItems[20].sellingPrice * 2,
//             quantity: 2,
//             state: 'ready',
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (25 * 60000)).toISOString(),
//             readyAt: new Date(new Date() + (34 * 60000)).toISOString(),
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[20].id,
//             sellingPrice: results.createItems[20].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[1].id,
//             averageCost: results.createItems[20].averageCost,
//             executor: results.createItems[20].executor,
//             total: results.createItems[20].sellingPrice * 1,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (10 * 60000)).toISOString(),
//             readyAt: new Date(new Date() + (25 * 60000)).toISOString(),
//             servedAt: new Date(new Date() + (35 * 60000)).toISOString(),
//           },
//           {
//             itemId: results.createItems[10].id,
//             sellingPrice: results.createItems[10].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[2].id,
//             averageCost: results.createItems[10].averageCost,
//             executor: results.createItems[10].executor,
//             total: results.createItems[10].sellingPrice * 1,
//             quantity: 1,
//             state: 'served',    
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (2 * 60000)).toISOString(),
//             readyAt: new Date(new Date() + (13 * 60000)).toISOString(),
//             servedAt: new Date(new Date() + (20 * 60000)).toISOString(),
//           },
//           { 
//             itemId: results.createItems[20].id,
//             sellingPrice: results.createItems[20].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[2].id,
//             averageCost: results.createItems[20].averageCost,
//             executor: results.createItems[20].executor,
//             total: results.createItems[20].sellingPrice * 1,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (6 * 60000)).toISOString(),
//             readyAt: new Date(new Date() + (13 * 60000)).toISOString(),
//             servedAt: new Date(new Date() + (20 * 60000)).toISOString(),
//           },
//           { 
//             itemId: results.createItems[20].id,
//             sellingPrice: results.createItems[20].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[3].id,
//             averageCost: results.createItems[20].averageCost,
//             executor: results.createItems[20].executor,
//             total: results.createItems[20].sellingPrice * 1,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date().toISOString(),
//             progressAt: new Date(new Date() + (5 * 60000)).toISOString(),
//             readyAt: new Date(new Date() + (12 * 60000)).toISOString(),
//             servedAt: new Date(new Date() + (20 * 60000)).toISOString(),
//           },
//         ], cb);
//       });
//     }],
//   }, function(err, results) {
//     console.log('err = ', err);  
//     // console.log(results);
//   });
// };
