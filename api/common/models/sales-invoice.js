'use strict';

module.exports = function(Salesinvoice) {
  Salesinvoice.closeSaleInvoice = function(salesInvoiceId, cb) {
    Salesinvoice.upsert({
      id: salesInvoiceId,
      state: 'closed',
      closedAt: new Date(),
    }, function() {
      let result = {add: true};
      cb(null, result);
    });
  };

  Salesinvoice.listSalesInvoices = function(cb) {
    Salesinvoice.find({}, function() {
      let result = {add: true};
      cb(null, result);
    });
  };

  Salesinvoice.remoteMethod('closeSaleInvoice', {
    accepts: [
      {arg: 'salesInvoiceId', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Salesinvoice.remoteMethod('listSalesInvoices', {
    accepts: [
      {arg: 'salesInvoiceId', type: 'string'},
    ],
    http: {verb: 'get'},
    returns: [
      {arg: 'result', type: 'Object', 'root': true},
    ],
  });

  Salesinvoice.countOpenedInvoices = function(cb) {
    Salesinvoice.count({state: 'opened'}, (err, count) => {
      if (err)
        return console.log(err);
      cb(null, count);
    });
  };
  
  Salesinvoice.remoteMethod('countOpenedInvoices', {
    http: {verb: 'get'},
    returns: {arg: 'openedInvoices', type: 'Object', 'root': true},
  });

  Salesinvoice.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
//  Salesinvoice.disableRemoteMethodByName('find');                                 // disables GET /Resource
//  Salesinvoice.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Salesinvoice.disableRemoteMethodByName('create');                               // disables POST /Resource

  Salesinvoice.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
//  Salesinvoice.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Salesinvoice.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Salesinvoice.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Salesinvoice.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Salesinvoice.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Salesinvoice.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Salesinvoice.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Salesinvoice.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Salesinvoice.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere

  // Has many
  Salesinvoice.disableRemoteMethodByName('prototype.__count__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__create__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__delete__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__destroyById__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__findById__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__get__item');
  Salesinvoice.disableRemoteMethodByName('prototype.__updateById__item');
};
