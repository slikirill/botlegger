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

  Salesinvoice.afterRemote('find', function(ctx, unused, next) {
    Salesinvoice.find({where:
    {openedAt:
    {between: [
      ctx.args.filter.where.openedAt.between[0],
      ctx.args.filter.where.openedAt.between[1],
    ]},
    },
      include: {relation: 'item'}}, function(err, data) {
      if (err) {
        return console.log(err);
      } else {
        let revenue = 0;
        let averageCostSummary = 0;
        data.forEach(invoice => {
          var p = invoice.toJSON();
          p.item.forEach(item => {
            revenue += item.total;
            averageCostSummary += item.averageCost;
          })
          
        });
        var grossProfit = revenue - averageCostSummary;
        var netProfit = grossProfit - ((grossProfit * 13) / 100);
        // ctx.result.push({revenue: revenue});
        // ctx.result.push({grossProfit: grossProfit});
        // ctx.result.push({netProfit: netProfit});
        var saleInvoices = ctx.result;
        ctx.result = {};
        ctx.result.result = saleInvoices;
        ctx.result.revenue = revenue;
        ctx.result.grossProfit = grossProfit;
        ctx.result.netProfit = netProfit;
        console.log('', ctx.res);
      }
      next();
    });

    // if(ctx.req.accessToken) {
    //   next();
    // } else {
    //   next(new Error('must be logged in to update'))
    // }
  });

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
