'use strict';
var app = require('../../server/server');

module.exports = function(Relpurchaseinvoiceitem) {
  Relpurchaseinvoiceitem.searchItemsPurchaseInvoice = function(purchaseInvoiceId, fullText, cb) {
    var Item = app.models.Item;
    if (fullText === undefined) {
      Relpurchaseinvoiceitem.find({where: {purchaseInvoiceId: {like: purchaseInvoiceId}},
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
      Item.find({fields: {id: true, name: true, unit: true, image: true},
        where: {name: {like: fullText, options: 'i'}}}, (err, items) => {
        if (err) {
          return err;
        } else {
          let request = this.genSearchRequest(items, purchaseInvoiceId);
          Relpurchaseinvoiceitem.find(request, (err, invoices) => {
            var res = [];
            invoices.forEach((invoice) => {
              res[invoice.itemId] = invoice;
            });
            var resItems = [];
            items.forEach((item) => {
              if (res[item.id]) {
                resItems.push({
                  'itemId': res[item.id].itemId,
                  'purchaseInvoiceId': purchaseInvoiceId,
                  'quantity': res[item.id].quantity,
                  'purchasePrice': res[item.id].purchasePrice,
                  'total': res[item.id].total,
                  'id': res[item.id].id,
                  'item': {
                    'name': item.name,
                    'unit': item.unit,
                    'id': item.id,
                    'image': item.image,
                  },
                });
              } else {
                resItems.push({
                  'itemId': item.id,
                  'purchaseInvoiceId': purchaseInvoiceId,
                  'quantity': 0,
                  'purchasePrice': 0,
                  'total': 0,
                  'item': {
                    'name': item.name,
                    'unit': item.unit,
                    'id': item.id,
                    'image': item.image,
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

  Relpurchaseinvoiceitem.genSearchRequest = function(items, purchaseInvoiceId) {
    let request = {};
    request.where = {};
    request.where.or = [];
    items.forEach((item) => {
      request.where.or.push({and: [{itemId: {like: item.id.toString()}}, {purchaseInvoiceId: {like: purchaseInvoiceId.toString()}}]});
    });
    return (request);
  };

  Relpurchaseinvoiceitem.updatePurchaseInvoiceItem = function(item, cb) {
    var quantity = Number(item.quantity);
    var purchasePrice = Number(item.purchasePrice);
    if (quantity === 0 || purchasePrice === 0) {
      Relpurchaseinvoiceitem.destroyById(item.id, function() {
        Relpurchaseinvoiceitem.updateTotal(item, cb);
      });
    } else {
      Relpurchaseinvoiceitem.upsert({
        id: item.id,
        itemId: item.itemId,
        purchaseInvoiceId: item.purchaseInvoiceId,
        quantity: item.quantity,
        purchasePrice: item.purchasePrice,
        total: item.total,
      }, function() {
        Relpurchaseinvoiceitem.updateTotal(item, cb);
      });
    }
  };

  Relpurchaseinvoiceitem.updateAverageCost = function(item, cb) {
    var Item = app.models.Item;
  };

  Relpurchaseinvoiceitem.updateTotal = function(item, cb) {
    var PurchaseInvoice = app.models.PurchaseInvoice;
    Relpurchaseinvoiceitem.find({where: {purchaseInvoiceId: {like: item.purchaseInvoiceId}}},
      (err, items) => {
        let total = 0;
        if (err) {
          return console.log(err);
        } else {
          items.forEach((item, key) => {
            var res = item.toJSON();
            total += res.total;
          });
          PurchaseInvoice.upsert({
            id: item.purchaseInvoiceId,
            total: total,
          }, function() {
            console.log(total);
            cb(null, total);
          });
        }
      });
  };

  Relpurchaseinvoiceitem.remoteMethod('updatePurchaseInvoiceItem', {
    accepts: [
      {arg: 'item', type: 'Object'},
    ],
    http: {verb: 'post'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Relpurchaseinvoiceitem.remoteMethod('searchItemsPurchaseInvoice', {
    accepts: [
      {arg: 'purchaseInvoiceId', type: 'string'},
      {arg: 'fullText', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: {arg: 'items', type: 'Object', 'root': true},
  });

  Relpurchaseinvoiceitem.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Relpurchaseinvoiceitem.disableRemoteMethodByName('find');                                 // disables GET /Resource
  Relpurchaseinvoiceitem.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Relpurchaseinvoiceitem.disableRemoteMethodByName('create');                               // disables POST /Resource

  Relpurchaseinvoiceitem.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
  Relpurchaseinvoiceitem.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Relpurchaseinvoiceitem.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Relpurchaseinvoiceitem.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Relpurchaseinvoiceitem.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Relpurchaseinvoiceitem.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Relpurchaseinvoiceitem.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Relpurchaseinvoiceitem.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Relpurchaseinvoiceitem.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Relpurchaseinvoiceitem.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere
  Relpurchaseinvoiceitem.disableRemoteMethodByName('prototype.__get__purchaseInvoice');

  Relpurchaseinvoiceitem.disableRemoteMethodByName('prototype.__get__item');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__get__item');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__destroy__item');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__create__item');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__update__item');

  Relpurchaseinvoiceitem.disableRemoteMethodByName('__get__purchaseInvoice');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__destroy__purchaseInvoice');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__create__purchaseInvoice');
  Relpurchaseinvoiceitem.disableRemoteMethodByName('__update__purchaseInvoice');
};
