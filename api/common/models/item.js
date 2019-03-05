'use strict';
var async = require('async');
var app = require('../../server/server');

module.exports = function(Item) {
  Item.getMenuItems = function(callback) {
    return Item.find({where: {menuItem: true},
      fields: {name: true, category: true, sellingPrice: true}},
      function(err, data) {
        if (err)
          return err;
        return callback(null, data);
      });
  };

  Item.searchMenuItems = function(fullText, callback) {
    return Item.find({where: {and: [{menuItem: true}, {name: {like: fullText, options: 'i'}}]},
      fields: {name: true, category: true, sellingPrice: true, image: true, id: true}},
      function(err, data) {
        if (err)
          return err;
        return callback(null, data);
      });
  };


  Item.listItems = function(fullText = false, callback) {
    let request = {};
    if (fullText === 'false') {
      request = undefined;
    } else {
      request.where = {name: {like: fullText, options: 'i'}};
    }
    return Item.find(request,
      function(err, data) {
        if (err)
          return err;
        return callback(null, data);
      });
  };

  Item.listShoppingList = function(fullText = false, callback) {
    let request = {};
    request.where = {};
    request.where.and = [];
    if (fullText === 'false') {
      request.where.and.push({and: [{quantity: {lte: 50}}, {menuItem: {neq: true}}]});
    } else {
      request.where.and.push({and: [{quantity: {lte: 50}}, {menuItem: {neq: true}}, {name: {like: fullText, options: 'i'}}]});
    }
    return Item.find(request,
      function(err, data) {
        if (err)
          return err;
        return callback(null, data);
      });
  };

  Item.listStopList = function(fullText = false, cb) {
    var Ingredient = app.models.Ingredient;
    return Item.find(
      {
        where: {
          menuItem: true,
        },
        fields: {id: true},
      },
      function(err, data) {
        if (err) {
          console.log('', err);
          return err;
        } else {
          let request = Item.genSearchRequest(data);
          Ingredient.find(request, (err, ingredients) => {
            var res = [];
            ingredients.forEach((ingredient) => {
              if ((parseInt(ingredient.ingredient().quantity / ingredient.recipeQuantity) < 1)) {
                res.push(ingredient.recipeId);
              }
            });
            var result = Array.from(new Set(res));
            let request = Item.genSearchRequestForStoplist(result, fullText);
            return Item.find(
              request,
            function(err, data) {
              return cb(null, data);
            });
          });
        }
      });
  };

  Item.genSearchRequestForStoplist = function(items, fullText = false) {
    let request = {};
    request.where = {};
    request.where.or = [];
    items.forEach((item) => {
      if (fullText === 'false') {
        request.where.or.push({id: item});
      } else {
        request.where.or.push({id: item});
      }
    });

    console.log('', request.where.or);
    return (request);
  };

  Item.search = function(recipeId, fullText, callback) {
    return Item.find({where: {name: {like: fullText, options: 'i'}},
      fields: {name: true},
      include: {relation: 'ingredient', scope: {where: [{recipeId: recipeId}]}}},
      function(err, data) {
        if (err)
          return err;
        return callback(null, data);
      });
  };

  Item.updateQuantity = function(data) {
    //console.log('', data);
    async.each(data, function(item, callback) {
      Item.upsertWithWhere(
        {
          id: item.ingredientId,
        },
        {
          quantity: item.ingredient().quantity - item.recipeQuantity,
        }, function() {
          callback();
        });
    });
    //console.log('', data);
  };



  Item.countStopList = function(cb) {
    var Ingredient = app.models.Ingredient;
    return Item.find(
      {
        where: {
          menuItem: true,
        },
        fields: {id: true},
      },
      function(err, data) {
        if (err) {
          console.log('', err);
          return err;
        } else {
          let request = Item.genSearchRequest(data);
          Ingredient.find(request, (err, ingredients) => {
            var res = [];
            ingredients.forEach((ingredient) => {
              if ((parseInt(ingredient.ingredient().quantity / ingredient.recipeQuantity) < 1)) {
                res[ingredient.recipeId] = 0;
              }
            });
            return cb(null, Object.keys(res).length);
          });
        }
      });
  };

  Item.genSearchRequest = function(items) {
    let request = {};
    request.where = {};
    request.include = {relation: 'ingredient', scope: {fields: ['quantity']}};
    request.where.or = [];
    items.forEach((item) => {
      request.where.or.push({and: [{recipeId: {like: item.id.toString()}}]});
    });

    return (request);
  };

  Item.countShoppingList = function(cb) {
    Item.count({quantity: {lte: 50}}, (err, count) => {
      if (err)
        return console.log(err);
      cb(null, count);
    });
  };

  Item.remoteMethod('listItems', {
    accepts: [
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'listItems', type: 'Object', 'root': true},
  });

  Item.remoteMethod('listShoppingList', {
    accepts: [
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'listItems', type: 'Object', 'root': true},
  });

  Item.remoteMethod('listStopList', {
    accepts: [
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'listItems', type: 'Object', 'root': true},
  });

  Item.remoteMethod('countStopList', {
    http: {verb: 'get'},
    returns: {arg: 'stopList', type: 'Object', 'root': true},
  });

  Item.remoteMethod('getStopList', {
    http: {verb: 'get'},
    returns: {arg: 'stopList', type: 'Object', 'root': true},
  });

  Item.remoteMethod('search', {
    accepts: [
      {arg: 'recipeId', type: 'string'},
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'post'},
    returns: {arg: 'items', type: 'Object', 'root': true},
  });

  Item.saveOrUpdate = function(item, callback) {
    console.log(item);
  };

  Item.remoteMethod('saveOrUpdate', {
    accepts: [
      {arg: 'item', type: 'Object'},
    ],
    http: {
      'verb': 'post',
    },
    returns: {arg: 'result', type: 'Object', 'root': true},
  });

  Item.remoteMethod('searchMenuItems', {
    accepts: [
      {arg: 'fullText', type: 'string'},
    ],
    http: {
      'verb': 'get',
    },
    returns: {arg: 'result', type: 'Object', 'root': true},
  });

  Item.remoteMethod('getMenuItems', {
    http: {
      'path': '/menu_items',
      'verb': 'post',
    },
    returns: {arg: 'menuItems', type: 'object', 'root': true},
  });

  Item.remoteMethod('countShoppingList', {
    http: {verb: 'get'},
    returns: {arg: 'countShoppingList', type: 'Object', 'root': true},
  });

  Item.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Item.disableRemoteMethodByName('find');                                 // disables GET /Resource
//  Item.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Item.disableRemoteMethodByName('create');                               // disables POST /Resource

  Item.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
//  Item.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Item.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Item.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
//  Item.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Item.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Item.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Item.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Item.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Item.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere
// Has many through
  Item.disableRemoteMethodByName('prototype.__count__ingredient');
  Item.disableRemoteMethodByName('prototype.__create__ingredient');
  Item.disableRemoteMethodByName('prototype.__delete__ingredient');
  Item.disableRemoteMethodByName('prototype.__destroyById__ingredient');
  Item.disableRemoteMethodByName('prototype.__findById__ingredient');
  Item.disableRemoteMethodByName('prototype.__get__ingredient');
  Item.disableRemoteMethodByName('prototype.__updateById__ingredient');
  Item.disableRemoteMethodByName('prototype.__exists__ingredient');
  Item.disableRemoteMethodByName('prototype.__link__ingredient');
  Item.disableRemoteMethodByName('prototype.__unlink__ingredient');
// Has many
  Item.disableRemoteMethodByName('prototype.__count__recipe');
  Item.disableRemoteMethodByName('prototype.__create__recipe');
  Item.disableRemoteMethodByName('prototype.__delete__recipe');
  Item.disableRemoteMethodByName('prototype.__destroyById__recipe');
  Item.disableRemoteMethodByName('prototype.__findById__recipe');
//  Item.disableRemoteMethodByName('prototype.__get__recipe');
  Item.disableRemoteMethodByName('prototype.__updateById__recipe');
};
