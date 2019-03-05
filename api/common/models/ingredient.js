'use strict';
var app = require('../../server/server');
module.exports = function(Ingredient) {
  Ingredient.search = function(recipeId, fullText, cb) {
    var Item = app.models.Item;
    if (fullText === undefined) {
      Ingredient.find({recipeId: recipeId,
        include: {relation: 'ingredient',
          scope: {fields: ['name', 'unit', 'image']}}},
        (err, data) => {
          if (err) {
            return console.log(err);
          } else {
            cb(null, data);
          }
        });
    } else {
      Item.find({fields: {id: true, name: true, unit: true, image: true, averageCost: true},
        where: {name: {like: fullText, options: 'i'}}}, (err, items) => {
        if (err) {
          return err;
        } else {
          let request = this.genSearchRequest(items, recipeId);
          Ingredient.find(request, (err, ingredients) => {
            var res = [];
            ingredients.forEach((ingredient) => {
              res[ingredient.ingredientId] = ingredient;
            });
            var resItems = [];
            items.forEach((item) => {
              if (res[item.id]) {
                resItems.push({
                  'ingredientId': res[item.id].ingredientId,
                  'recipeId': res[item.id].recipeId,
                  'recipeQuantity': res[item.id].recipeQuantity,
                  'id': res[item.id].id,
                  'ingredient': {
                    'name': item.name,
                    'image': item.image,
                    'unit': item.unit,
                    'id': item.id,
                  },
                });
              } else {
                resItems.push({
                  'ingredientId': item.id,
                  'recipeId': recipeId,
                  'recipeQuantity': 0,
                  'ingredient': {
                    'name': item.name,
                    'image': item.image,
                    'unit': item.unit,
                    'id': item.id,
                  },
                });
              }
            });
            cb(null, resItems);
          });
        }
      });
    }
  };

  Ingredient.findAllByRecipe = function(recipeId, cb) {
    Ingredient.find({where: {recipeId: recipeId},
      include: {relation: 'ingredient',
        scope: {fields: ['name', 'unit']}}},
      (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          cb(null, data);
        }
      });
  };

  Ingredient.genSearchRequest = function(items, recipeId) {
    let request = {};
    request.where = {};
    request.where.or = [];
    items.forEach((item) => {
      request.where.or.push({and: [{ingredientId: item.include}, {recipeId: recipeId}]});
    });
    return (request);
  };

  Ingredient.updateIngredient = function(data, cb) {
    if (Number(data.recipeQuantity) === 0) {
      Ingredient.destroyById(data.id, function() {
        Ingredient.updateSummary(data.recipeId, cb);
      });
    } else {
      Ingredient.upsertWithWhere(
        {
          id: data.id,
        },
        {
          ingredientId: data.ingredientId,
          recipeId: data.recipeId,
          recipeQuantity: data.recipeQuantity,
        }, function() {
          Ingredient.updateSummary(data.recipeId, cb);
        });
    }
  };

  Ingredient.updateSummary = function(recipeId, cb) {
    var Item = app.models.Item;
    Ingredient.find({recipeId: recipeId,
      include: {relation: 'ingredient',
        scope: {fields: ['sellingPrice', 'averageCost']}}},
      (err, ingredients) => {
        let quantitySummary = 0;
        let sellingSummary = 0;
        let averageCostSummary = 0;
        if (err) {
          return console.log(err);
        } else {
          ingredients.forEach((ingredient, key) => {
            console.log(ingredient.item.quantity);
            let res = ingredient.toJSON();
            quantitySummary += res.recipeQuantity;
            sellingSummary += res.recipeQuantity * res.ingredient.sellingPrice;
            averageCostSummary += res.recipeQuantity * res.ingredient.averageCost;
          });
        }
 
        Item.upsertWithWhere(
          {
            id: recipeId,
          },
          {
            quantity: quantitySummary,
            averageCost: averageCostSummary.toFixed(4),
            sellingPrice: sellingSummary.toFixed(4),
          }, function() {
            let summary = {'quantitySummary': quantitySummary, 'sellingSummary': sellingSummary.toFixed(4), 'averageCost': averageCostSummary.toFixed(4)};
          // console.log(ingredients);
            cb(null, summary);
          });
      });
  };

  Ingredient.remoteMethod('search', {
    accepts: [
      {arg: 'recipeId', type: 'string'},
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'ingredients', type: 'Object', 'root': true},
  });

  Ingredient.remoteMethod('updateIngredient', {
    accepts: [
      {arg: 'ingredient', type: 'Object'},
    ],
    http: {verb: 'post'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Ingredient.remoteMethod('findAllByRecipe', {
    accepts: [
      {arg: 'recipeId', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'ingredients', type: 'Object', 'root': true},
  });

  Ingredient.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Ingredient.disableRemoteMethodByName('find');                                 // disables GET /Resource
  Ingredient.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Ingredient.disableRemoteMethodByName('create');                               // disables POST /Resource

  Ingredient.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
  Ingredient.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Ingredient.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Ingredient.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Ingredient.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Ingredient.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Ingredient.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Ingredient.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Ingredient.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Ingredient.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere

  Ingredient.disableRemoteMethodByName('prototype.__get__item');
  Ingredient.disableRemoteMethodByName('__get__ingredient');
  Ingredient.disableRemoteMethodByName('__destroy__ingredient');
  Ingredient.disableRemoteMethodByName('__create__ingredient');
  Ingredient.disableRemoteMethodByName('__update__ingredient');

  Ingredient.disableRemoteMethodByName('__get__recipe');
  Ingredient.disableRemoteMethodByName('__destroy__recipe');
  Ingredient.disableRemoteMethodByName('__create__recipe');
  Ingredient.disableRemoteMethodByName('__update__recipe');
};
