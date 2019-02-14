'use strict';

module.exports = function(Category) {
  Category.disableRemoteMethodByName('upsert');                               // disables PATCH /Resource
  //Category.disableRemoteMethodByName('find');                                 // disables GET /Resource
  Category.disableRemoteMethodByName('replaceOrCreate');                      // disables PUT /Resource
  Category.disableRemoteMethodByName('create');                               // disables POST /Resource

  Category.disableRemoteMethodByName('prototype.updateAttributes');           // disables PATCH /Resource/{id}
  Category.disableRemoteMethodByName('findById');                             // disables GET /Resource/{id}
  Category.disableRemoteMethodByName('exists');                               // disables HEAD /Resource/{id}
  Category.disableRemoteMethodByName('replaceById');                          // disables PUT /Resource/{id}
  Category.disableRemoteMethodByName('deleteById');                           // disables DELETE /Resource/{id}

  Category.disableRemoteMethodByName('createChangeStream');                   // disable GET and POST /Resource/change-stream

  Category.disableRemoteMethodByName('count');                                // disables GET /Resource/count
  Category.disableRemoteMethodByName('findOne');                              // disables GET /Resource/findOne

  Category.disableRemoteMethodByName('update');                               // disables POST /Resource/update
  Category.disableRemoteMethodByName('upsertWithWhere');                      // disables POST /Resource/upsertWithWhere

  // Has many
  Category.disableRemoteMethodByName('prototype.__count__item');
  Category.disableRemoteMethodByName('prototype.__create__item');
  Category.disableRemoteMethodByName('prototype.__delete__item');
  Category.disableRemoteMethodByName('prototype.__destroyById__item');
  Category.disableRemoteMethodByName('prototype.__findById__item');
  Category.disableRemoteMethodByName('prototype.__get__item');
  Category.disableRemoteMethodByName('prototype.__updateById__item');
};
