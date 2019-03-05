'use strict';
var app = require('../../server/server');

module.exports = function(Relsalesinvoiceitem) {
  Relsalesinvoiceitem.searchItemsSalesInvoice = function(salesInvoiceId, fullText, cb) {
    console.log(salesInvoiceId);
    var Item = app.models.Item;
    if (fullText === undefined) {
      Relsalesinvoiceitem.find({where: {salesInvoiceId: salesInvoiceId},
        include: {relation: 'item',
          scope: {fields: ['name', 'unit', 'image']}}},
        (err, data) => {
          if (err) {
            return console.log(err);
          } else {
            cb(null, data);
          }
        });
    } else {
      Item.find({fields: {id: true, name: true, unit: true, image: true, sellingPrice: true, averageCost: true, executor: true},
        where: {name: {like: fullText, options: 'i'}}}, (err, items) => {
        if (err) {
          return err;
        } else {

          console.log('', items)
          let request = this.genSearchRequest(items, salesInvoiceId);
          Relsalesinvoiceitem.find(request, (err, invoices) => {

            console.log('', invoices)
            var res = [];
            invoices.forEach((invoice) => {
              res[invoice.itemId] = invoice;
            });
            var resItems = [];
            items.forEach((item) => {
              resItems.push({
                'itemId': item.id,
                'salesInvoiceId': salesInvoiceId,
                'sellingPrice': item.sellingPrice,
                'averageCost': item.averageCost,
                'executor': item.executor,
                'quantity': 0,
                'state': 'new',
                'total': 0,
                'readyAt': null,
                'newAt': null,
                'progressAt': null,
                'servedAt': null,
                'item': {
                  'name': item.name,
                  'unit': item.unit,
                  'image': item.image,
                  'id': item.id,
                },
              });
            });
            cb(null, resItems);
          });
        }
      });
    }
  };

  Relsalesinvoiceitem.genSearchRequest = function(items, salesInvoiceId) {
    let request = {};
    request.where = {};
    request.where.or = [];
    items.forEach((item) => {
      request.where.or.push({and: [{itemId: item.id}, {salesInvoiceId: salesInvoiceId}]});
    });
    return (request);
  };

  Relsalesinvoiceitem.updateSalesInvoiceItem = function(item, cb) {
    var quantity = Number(item.quantity);
    var purchasePrice = Number(item.purchasePrice);
    if (quantity === 0 || purchasePrice === 0) {
      Relsalesinvoiceitem.destroyById(item.id, function() {
        Relsalesinvoiceitem.updateTotal(item, cb);
      });
    } else {
      Relsalesinvoiceitem.upsert({
        id: item.id,
        itemId: item.itemId,
        purchaseInvoiceId: item.purchaseInvoiceId,
        quantity: item.quantity,
        purchasePrice: item.purchasePrice,
        total: item.total,
      }, function() {
        Relsalesinvoiceitem.updateTotal(item, cb);
      });
    }
  };

  Relsalesinvoiceitem.progressOrder = function(id, cb) {
    Relsalesinvoiceitem.upsertWithWhere(
      {_id: id},
      {
        state: 'progress',
        progressAt: new Date(),
      }, function(err) {
        if (err)
          return console.log(err);
        cb(null, true);
      });
  };

  Relsalesinvoiceitem.readyOrder = function(id, cb) {
    Relsalesinvoiceitem.upsertWithWhere(
      {_id: id},
      {
        state: 'ready',
        readyAt: new Date(),
      }, function(err) {
        if (err)
          return console.log(err);
        cb(null, true);
      });
  };

  Relsalesinvoiceitem.serveOrder = function(id, cb) {
    Relsalesinvoiceitem.upsertWithWhere(
      {_id: id},
      {
        state: 'served',
        servedAt: new Date(),
      }, function(err) {
        if (err)
          return console.log(err);
        cb(null, true);
      });
  };

  Relsalesinvoiceitem.countNew = function(cb) {
    Relsalesinvoiceitem.count({state: 'new'}, (err, count) => {
      if (err)
        return console.log(err);
      cb(null, count);
    });
  };

  Relsalesinvoiceitem.countProgress = function(cb) {
    Relsalesinvoiceitem.count({state: 'progress'}, (err, count) => {
      if (err)
        return console.log(err);
      cb(null, count);
    });
  };

  Relsalesinvoiceitem.countReady = function(cb) {
    Relsalesinvoiceitem.count({state: 'ready'}, (err, count) => {
      if (err)
        return console.log(err);
      cb(null, count);
    });
  };

  Relsalesinvoiceitem.listOrders = function(filter = false, callback) {
    if (filter === 'false') {
      var where = undefined;
    } else {

      console.log('', filter)
      where = {state: filter};
    }
    Relsalesinvoiceitem.find({
      where,
      include: {relation: 'item',
        scope: {fields: ['name', 'unit', 'image']}}},
      (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          callback(null, data);
        }
      });
  };

  Relsalesinvoiceitem.listOrdersChef = function(filter = false, callback) {
    if (filter === 'false') {
      var where = {executor: 'chef'};
    } else {
      where = {and: [{executor: 'chef'}, {state: filter}]};
    }
    Relsalesinvoiceitem.find({
      where,
      include: {
        relation: 'item',
        scope: {
          fields: ['name', 'unit', 'image'],
        },
      },
    },
      (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          callback(null, data);
        }
      });
  };

  Relsalesinvoiceitem.listOrdersBarman = function(filter = false, callback) {
    if (filter === 'false') {
      var where = {executor: 'barman'};
    } else {
      where = {and: [{executor: 'barman'}, {state: filter}]};
    }
    Relsalesinvoiceitem.find({
      where,
      include: {
        relation: 'item',
        scope: {
          fields: ['name', 'unit', 'image'],
        },
      },
    },
      (err, data) => { 
        if (err) {
          return console.log(err);
        } else {
          callback(null, data);  
        }
      }); 
  };

  Relsalesinvoiceitem.updateTotal = function(item, cb) {
    var SalesInvoice = app.models.SalesInvoice;
    Relsalesinvoiceitem.find({salesInvoiceId: item.salesInvoiceId},
      (err, items) => {
        let total = 0;
        if (err) {
          return console.log(err);
        } else {
          items.forEach((item, key) => {
            var res = item.toJSON();
            total += res.total;
          });
          SalesInvoice.upsert({
            id: item.salesInvoiceId,
            total: total,
          }, function() {
            console.log(total);
            cb(null, total);
          });
        }
      });
  };

  Relsalesinvoiceitem.addItemSaleInvoice = function(item, cb) {
    var SalesInvoice = app.models.SalesInvoice;
    var Item = app.models.Item;
    var Ingredient = app.models.Ingredient;
    Ingredient.find({recipeId: item.itemId,
      include: {relation: 'ingredient',
        scope: {fields: ['name', 'quantity']}}},
      (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          var res = [];
          var availablePortions = [];
          data.forEach((it, key) => {
            // requestedPortions.push(parseInt((it.ingredient().quantity) / (it.recipeQuantity * item.quantity)));
            availablePortions.push(parseInt(it.ingredient().quantity / it.recipeQuantity));
          });
          availablePortions = Math.min.apply(Math, availablePortions);
          if (item.quantity > availablePortions) {
            let result = {add: false, availablePortions: availablePortions};
            cb(null, result);
          } else {
            Item.updateQuantity(data);
            Item.find({where: {id: item.itemId},
              fields: {sellingPrice: true, averageCost: true, executor: true}},
              function(err, data) {
                Relsalesinvoiceitem.upsert({
                  itemId: item.itemId,
                  salesInvoiceId: item.salesInvoiceId,
                  sellingPrice: data[0].sellingPrice,
                  quantity: item.quantity,
                  state: 'new',
                  newAt: new Date(),
                  progressAt: null,
                  readyAt: null,
                  servedAt: null,
                  averageCost: data[0].averageCost,
                  executor: data[0].executor,
                  total: data[0].sellingPrice * item.quantity,
                }, (err, data) => {
                  Relsalesinvoiceitem.find({where: {salesInvoiceId: item.salesInvoiceId}},
                    (err, items) => {
                      if (err) {
                        return console.log(err);
                      }
                      let total = 0;
                      if (err) {
                        return console.log(err);
                      } else {
                        items.forEach((item, key) => {
                          var res = item.toJSON();
                          total += res.total;
                        });
                        SalesInvoice.upsert({
                          id: item.salesInvoiceId,
                          total: total,
                        }, function() {
                          let result = {add: true};
                          cb(null, result);
                        });
                      }
                    });
                });
              });
          }
        }
      });
  };

  Relsalesinvoiceitem.remoteMethod('progressOrder', {
    accepts: [
      {arg: 'id', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relsalesinvoiceitem.remoteMethod('readyOrder', {
    accepts: [
      {arg: 'id', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relsalesinvoiceitem.remoteMethod('serveOrder', {
    accepts: [
      {arg: 'id', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relsalesinvoiceitem.remoteMethod('addItemSaleInvoice', {
    accepts: [
      {arg: 'item', type: 'Object'},
    ],
    http: {verb: 'post'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relsalesinvoiceitem.remoteMethod('updateSalesInvoiceItem', {
    accepts: [
      {arg: 'item', type: 'Object'},
    ],
    http: {verb: 'post'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relsalesinvoiceitem.remoteMethod('listOrders', {
    accepts: [
      {arg: 'filter', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'orders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('listOrdersChef', {
    accepts: [
      {arg: 'filter', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'orders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('listOrdersBarman', {
    accepts: [
      {arg: 'filter', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'orders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('countNew', {
    http: {verb: 'get'},
    returns: {arg: 'newOrders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('countProgress', {
    http: {verb: 'get'},
    returns: {arg: 'progressOrders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('countReady', {
    http: {verb: 'get'},
    returns: {arg: 'readyOrders', type: 'Object', 'root': true},
  });

  Relsalesinvoiceitem.remoteMethod('searchItemsSalesInvoice', {
    accepts: [
      {arg: 'salesInvoiceId', type: 'string'},
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'items', type: 'Object', 'root': true},
  });

//  Relsalesinvoiceitem.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Relsalesinvoiceitem.disableRemoteMethodByName('find');                                 // disables GET /Resource
  Relsalesinvoiceitem.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Relsalesinvoiceitem.disableRemoteMethodByName('create');                               // disables POST /Resource

  Relsalesinvoiceitem.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
  Relsalesinvoiceitem.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Relsalesinvoiceitem.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Relsalesinvoiceitem.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Relsalesinvoiceitem.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Relsalesinvoiceitem.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

//  Relsalesinvoiceitem.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Relsalesinvoiceitem.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Relsalesinvoiceitem.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Relsalesinvoiceitem.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere
  Relsalesinvoiceitem.disableRemoteMethodByName('prototype.__get__salesInvoice');
};
