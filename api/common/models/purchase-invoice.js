'use strict';
var async = require('async');
var app = require('../../server/server');

module.exports = function(Purchaseinvoice) {
  Purchaseinvoice.profile = function(invoice, cb) {
    Purchaseinvoice.upsertWithWhere(
      {
        id: invoice.id,
      },
      {
        supplierId: invoice.supplierId,
        date: invoice.date,
        profiled: true,
        total: invoice.total,
      }, function() {
        // console.log('', invoice);
        Purchaseinvoice.agregateAverageQuantity(invoice.id, cb);
      });
  };

  Purchaseinvoice.agregateAverageQuantity = function(id, cb) {
    var Relpurchaseinvoiceitem = app.models.relPurchaseInvoiceItem;
    Relpurchaseinvoiceitem.find({purchaseInvoiceId: id,
      include: {relation: 'item'}, scope: {fields: ['quantity', 'averageCost']}},
    function(err, data) {
      if (err) {
        return console.log(err);
      } else {
        var res = [];
        data.forEach((it, key) => {
          var averageCost = ((Number(it.quantity) * Number(it.purchasePrice)) + (Number(it.item().quantity) * Number(it.item().averageCost))) / (Number(it.quantity) + Number(it.item().quantity));
          var quantity = Number(it.quantity) + Number(it.item().quantity);
          res.push({'id': it.itemId, 'averageCost': averageCost, 'quantity': quantity});
        });
        Purchaseinvoice.updateAverageCostQuantity(res, cb);
      }
    });
  };

  Purchaseinvoice.updateAverageCostQuantity = function(data, cb) {
    var Item = app.models.Item;
    async.each(data, function(item, callback) {
      Item.upsertWithWhere(
        {
          id: item.id,
        },
        {
          averageCost: item.averageCost.toFixed(4),
          quantity: item.quantity.toFixed(4),
        }, function() {
          callback();
        });
    }, function(err) {
      if (err) {
        console.log('A record failed to process');
      } else {
        Purchaseinvoice.getRecipesToCountAverage(data, cb);
      }
    });
  };

  Purchaseinvoice.getRecipesToCountAverage = function(data, cb) {
    let Ingredient = app.models.Ingredient;
    let request = Purchaseinvoice.genSearchRequest(data);
    Ingredient.find({fields: {recipeId: true}, request},
      (err, recipes) => {
        if (err) {
          return console.log(err);
        } else {
          var res = [];
          recipes.forEach(recipe => {
            res.push(recipe.recipeId);
          });
          var uniqueItems = Array.from(new Set(res));
          Purchaseinvoice.updateAverageCostRecipes(uniqueItems, cb);
        }
      });
  };

  Purchaseinvoice.updateAverageCostRecipes = function(data, cb) {
    var Ingredient = app.models.Ingredient;
    var Item = app.models.Item;
    // let request = Purchaseinvoice.genSearchRequestForUpdateAvRecipes(data);
    async.each(data, function(recipeId, callback) {
      console.log(recipeId);
      Ingredient.find({
        where: {recipeId: recipeId},
        include: {relation: 'ingredient',
          scope: {fields: ['averageCost']}},
      }, {},
        (err, ingredient) => {
          if (err) {
            return console.log(err);
          } else {
            var averageCostRecipe = 0;
            ingredient.forEach(ing => {
              averageCostRecipe += Number(ing.ingredient().averageCost) * Number(ing.recipeQuantity);
            });
            Item.upsertWithWhere(
              {
                id: recipeId,
              },
              {
                averageCost: averageCostRecipe.toFixed(4),
              }, function() {
                callback();
              });
          }
        }, function() {
          callback();
        });
    }, function(err) {
      if (err) {
        console.log('A record failed to process');
      } else {
        cb(null, true);
      }
    });
  };

  Purchaseinvoice.genSearchRequestForUpdateAvRecipes = function(data) {
    let request = {};
    console.log(data.length);
    request.where = {};
    request.where.or = [];
    data.forEach((item, key) => {
      request.where.or.push({itemId: item});
    });
    return (request);
  };

  Purchaseinvoice.genSearchRequest = function(data) {
    let request = {};
    request.where = {};
    request.where.or = [];
    data.forEach((item) => {
      request.where.or.push({itemId: item.id});
    });
    return (request);
  };

  Purchaseinvoice.remoteMethod('profile', {
    accepts: [
      {arg: 'invoice', type: 'Object'},
    ],
    http: {verb: 'post'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Purchaseinvoice.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Purchaseinvoice.disableRemoteMethodByName('find');                                 // disables GET /Resource
//  Purchaseinvoice.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Purchaseinvoice.disableRemoteMethodByName('create');                               // disables POST /Resource

  Purchaseinvoice.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
//  Purchaseinvoice.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Purchaseinvoice.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Purchaseinvoice.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Purchaseinvoice.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Purchaseinvoice.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Purchaseinvoice.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Purchaseinvoice.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Purchaseinvoice.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Purchaseinvoice.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere

// Has many
  Purchaseinvoice.disableRemoteMethodByName('prototype.__count__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__create__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__delete__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__destroyById__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__findById__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__get__item');
  Purchaseinvoice.disableRemoteMethodByName('prototype.__updateById__item');
};
