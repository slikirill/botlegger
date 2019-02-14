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
//           categoryId: results.createCategories[0].id,
//           tare: 'pack',
//           quantity: 8000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.055,
//           sellingPrice: 0.10,

//         }, {
//           name: 'Butter',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'Butter.jpg',
//           categoryId: results.createCategories[1].id,
//           tare: 'pack',
//           quantity: 5000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.056,
//           sellingPrice: 0.10,

//         }, {
//           name: 'Garlic',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '2c0307d2aa7bb587a279bea603f68164.jpg',
//           categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 1000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.001,
//           sellingPrice: 0.002,

//         }, {
//           name: 'Red onion',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'red-onions.jpg',
//           categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 1000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.025,
//           sellingPrice: 0.050,

//         }, {
//           name: 'Bacon',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '805075711.jpg',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 100,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 1,
//           sellingPrice: 2,

//         }, {
//           name: 'Cream 20%',
//           executor: null,
//           type: 'ingredient',
//           image: '2580039.jpg',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 600,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.045,
//           sellingPrice: 0.090,

//         }, {
//           name: 'Cheese Parmezan',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'Parmesan+above-9-Edit+copy.jpg',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 600,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.30,
//           sellingPrice: 0.60,

//         }, {
//           name: 'Chicken Egg',
//           executor: null,
//           type: 'ingredient',
//           image: '543c71eab12d3.image.jpg',
//           categoryId: results.createCategories[1].id,
//           tare: null,
//           quantity: 50,
//           unit: 'pieces',
//           menuItem: false,
//           averageCost: 0.10,
//           sellingPrice: 0.20,

//         }, {
//           name: 'Salt',
//           executor: null,
//           type: 'ingredient',
//           image: 'himalayan_salt-1.jpg',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 250,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.0001,
//           sellingPrice: 0.0002,

//         }, {
//           name: 'Black Pepper',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'black-pepper-400x300.jpg',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 250,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.0001,
//           sellingPrice: 0.0001,

//         }, {
//           name: 'Pasta Carbonara',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'l176068210.jpg',
//           categoryId: results.createCategories[5].id,
//           tare: null,
//           quantity: 400,
//           unit: 'g',
//           menuItem: true,
//           averageCost: 600.20,
//           sellingPrice: 1150.50,

//         }, {
//           name: 'Wheat flour',
//           executor: 'chef',
//           type: 'ingredient',
//           image: '1-14091QF046222.jpg',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 20000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.02,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Olive oil',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'blog-featured-LeftoverOliveOil-400x300.jpg',
//           categoryId: results.createCategories[7].id,
//           tare: null,
//           quantity: 5000,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.02,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Dry yeast',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'active-dry-yeast-175381565-599c8d6903f4020011860f94.jpg',
//           categoryId: results.createCategories[7].id,
//           tare: null,
//           quantity: 600,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.02,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Water',
//           executor: null,
//           type: 'ingredient',
//           image: '400x300xshutterstock_257387209.jpg.pagespeed.ic.pJc2_iUVZV.jpg',
//           categoryId: results.createCategories[8].id,
//           tare: null,
//           quantity: 60000,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.0001,
//           sellingPrice: 0.0001,

//         }, {
//           name: 'Pizza dough',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'tossing-a-pizza-1.jpg',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 2000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.01,
//           sellingPrice: 0.02,

//         }, {
//           name: 'Mozarella Cheese',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'small_109601.jpg',
//           categoryId: results.createCategories[6].id,
//           tare: null,
//           quantity: 2000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.30,
//           sellingPrice: 0.40,

//         }, {
//           name: 'Basilic',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'aabc1d3c15bd08551088bcc20b94cc59.jpg',
//           categoryId: results.createCategories[9].id,
//           tare: null,
//           quantity: 500,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.01,
//           sellingPrice: 0.02,

//         }, {
//           name: 'Sugar',
//           executor: null,
//           type: 'ingredient',
//           image: 'Blog111Sucrose101.jpg',
//           categoryId: results.createCategories[4].id,
//           tare: null,
//           quantity: 5000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.007,
//           sellingPrice: 0.014,

//         }, {
//           name: 'Tomatoes',
//           executor: 'chef',
//           type: 'ingredient',
//           image: 'tomato.jpg',
//           categoryId: results.createCategories[3].id,
//           tare: null,
//           quantity: 5000,
//           unit: 'g',
//           menuItem: false,
//           averageCost: 0.10,
//           sellingPrice: 0.20,

//         }, {
//           name: 'Pizza Margarita',
//           executor: 'chef',
//           type: 'recipe',
//           image: 'gre_gar.jpg',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 5000,
//           unit: 'g',
//           menuItem: true,
//           averageCost: 8.00,
//           sellingPrice: 16.00,

//         }, {
//           name: 'Green Apple',
//           executor: null,
//           type: 'ingredient',
//           image: 'recipe-15540_Large400_ID-1511012.jpg',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 50,
//           unit: 'pieces',
//           menuItem: false,
//           averageCost: 0.02,
//           sellingPrice: 0.04,

//         }, {
//           name: 'Fresh Green Apple Juice',
//           executor: 'bartender',
//           type: 'recipe',
//           image: 'Fresh_green_apple_ju-min.jpg',
//           categoryId: results.createCategories[10].id,
//           tare: null,
//           quantity: 0,
//           unit: 'ml',
//           menuItem: false,
//           averageCost: 0.04,
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
//             visitorId: null,
//             openedAt: new Date(),
//             closedAt: null,
//             state: 'opened',
//             total: 5044.00,
//           },
//           {
//             visitorId: null,
//             openedAt: new Date(),
//             closedAt: null,
//             state: 'opened',
//             total: 2000.00,
//           },
//           {
//             visitorId: null,
//             openedAt: new Date(),
//             closedAt: null,
//             state: 'opened',
//             total: 2000.00,
//           },

//           {
//             visitorId: null,
//             openedAt: new Date(),
//             closedAt: new Date(),
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
//             quantity: results.createItems[0].quantity,
//             purchasePrice: results.createItems[0].averageCost,
//             total: results.createItems[0].quantity * results.createItems[0].averageCost,
//           },
//           {
//             itemId: results.createItems[1].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[1].quantity,
//             purchasePrice: results.createItems[1].averageCost,
//             total: results.createItems[1].quantity * results.createItems[1].averageCost,
//           },
//           {
//             itemId: results.createItems[2].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[2].quantity,
//             purchasePrice: results.createItems[2].averageCost,
//             total: results.createItems[2].quantity * results.createItems[2].averageCost,
//           },
//           {
//             itemId: results.createItems[3].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[3].quantity,
//             purchasePrice: results.createItems[3].averageCost,
//             total: results.createItems[3].quantity * results.createItems[3].averageCost,
//           },
//           {
//             itemId: results.createItems[4].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[4].quantity,
//             purchasePrice: results.createItems[4].averageCost,
//             total: results.createItems[4].quantity * results.createItems[4].averageCost,
//           },
//           {
//             itemId: results.createItems[5].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[5].quantity,
//             purchasePrice: results.createItems[5].averageCost,
//             total: results.createItems[5].quantity * results.createItems[5].averageCost,
//           },
//           {
//             itemId: results.createItems[6].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[6].quantity,
//             purchasePrice: results.createItems[6].averageCost,
//             total: results.createItems[6].quantity * results.createItems[6].averageCost,
//           },
//           {
//             itemId: results.createItems[7].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[7].quantity,
//             purchasePrice: results.createItems[7].averageCost,
//             total: results.createItems[7].quantity * results.createItems[7].averageCost,
//           },
//           {
//             itemId: results.createItems[8].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[8].quantity,
//             purchasePrice: results.createItems[8].averageCost,
//             total: results.createItems[8].quantity * results.createItems[8].averageCost,
//           },
//           {
//             itemId: results.createItems[9].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[0].id,
//             quantity: results.createItems[9].quantity,
//             purchasePrice: results.createItems[9].averageCost,
//             total: results.createItems[9].quantity * results.createItems[9].averageCost,
//           },
//           {
//             itemId: results.createItems[11].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[11].quantity,
//             purchasePrice: results.createItems[11].averageCost,
//             total: results.createItems[11].quantity * results.createItems[11].averageCost,
//           },
//           {
//             itemId: results.createItems[12].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[12].quantity,
//             purchasePrice: results.createItems[12].averageCost,
//             total: results.createItems[12].quantity * results.createItems[12].averageCost,
//           },
//           {
//             itemId: results.createItems[13].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[13].quantity,
//             purchasePrice: results.createItems[13].averageCost,
//             total: results.createItems[13].quantity * results.createItems[13].averageCost,
//           },
//           {
//             itemId: results.createItems[14].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[14].quantity,
//             purchasePrice: results.createItems[14].averageCost,
//             total: results.createItems[14].quantity * results.createItems[14].averageCost,
//           },
//           {
//             itemId: results.createItems[16].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[16].quantity,
//             purchasePrice: results.createItems[16].averageCost,
//             total: results.createItems[16].quantity * results.createItems[16].averageCost,
//           },
//           {
//             itemId: results.createItems[17].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[17].quantity,
//             purchasePrice: results.createItems[17].averageCost,
//             total: results.createItems[17].quantity * results.createItems[17].averageCost,
//           },
//           {
//             itemId: results.createItems[18].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[18].quantity,
//             purchasePrice: results.createItems[18].averageCost,
//             total: results.createItems[18].quantity * results.createItems[18].averageCost,
//           },
//           {
//             itemId: results.createItems[19].id,
//             purchaseInvoiceId: results.createPurchaseInvoice[1].id,
//             quantity: results.createItems[19].quantity,
//             purchasePrice: results.createItems[19].averageCost,
//             total: results.createItems[19].quantity * results.createItems[19].averageCost,
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
//             quantity: 1,
//             state: 'new',
//             newAt: new Date(),
//             progressAt: null,
//             readyAt: null,
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[19].id,
//             sellingPrice: results.createItems[19].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[0].id,
//             quantity: 2,
//             state: 'progress',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: null,
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[19].id,
//             sellingPrice: results.createItems[19].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[1].id,
//             quantity: 2,
//             state: 'ready',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: new Date(),
//             servedAt: null,
//           },
//           {
//             itemId: results.createItems[19].id,
//             sellingPrice: results.createItems[19].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[1].id,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: new Date(),
//             servedAt: new Date(),
//           },
//           {
//             itemId: results.createItems[10].id,
//             sellingPrice: results.createItems[10].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[2].id,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: new Date(),
//             servedAt: new Date(),
//           },
//           {
//             itemId: results.createItems[19].id,
//             sellingPrice: results.createItems[19].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[2].id,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: new Date(),
//             servedAt: new Date(),
//           },
//           {
//             itemId: results.createItems[19].id,
//             sellingPrice: results.createItems[19].sellingPrice,
//             salesInvoiceId: results.createSalesInvoice[3].id,
//             quantity: 1,
//             state: 'served',
//             newAt: new Date(),
//             progressAt: new Date(),
//             readyAt: new Date(),
//             servedAt: new Date(),
//           },
//         ], cb);
//       });
//     }],
//   }, function(err, results) {
//     console.log('err = ', err);  
//     // console.log(results);
//   });
// };
