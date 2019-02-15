// 'use strict';

// var async = require('async');
// module.exports = function(app) {
//   var mongoDB = app.dataSources.MongoDB;

//   async.auto({
//     createUsers: function(cb) {
//       console.log('createUsers');
//       mongoDB.autoupdate('CustomerUser', function(err) {
//         if (err) return cb(err);
//         var User = app.models.CustomerUser;
//         User.create([
//           {username: 'Administrator', email: 'admin@gmail.com', password: 'opensesame', 'role': 'admin'},
//           {username: 'Waiter', email: 'waiter@gmail.com', password: 'opensesame', 'role': 'waiter'},
//           {username: 'Chef', email: 'chef@gmail.com', password: 'opensesame', 'role': 'chef'},
//           {username: 'Barman', email: 'barman@gmail.com', password: 'opensesame', 'role': 'barman'},
//         ], cb);
//       });
//     }, 
//     createRoles: ['createUsers', function(results, cb) {
//       console.log('createRoles');
//       mongoDB.autoupdate('Role', function(err) {
//         if (err) return cb(err);
//         var Role = app.models.Role;
//         var RoleMapping = app.models.RoleMapping;
//         // create admin role
//         Role.create({
//           name: 'admin',
//         }, function(err, role) {
//           if (err) throw err;

//           // console.log('Created role:', role);

//           role.principals.create({
//             principalType: RoleMapping.USER,
//             principalId: results.createUsers[0].id,
//           }, function(err, principal) {
//             if (err) throw err;

//             // console.log('Created principal:', principal);
//           });
//         });
//         // create waiter role
//         Role.create({
//           name: 'waiter',
//         }, function(err, role) {
//           if (err) throw err;

//           // console.log('Created role:', role);

//           role.principals.create({
//             principalType: RoleMapping.USER,
//             principalId: results.createUsers[1].id,
//           }, function(err, principal) {
//             if (err) throw err;

//             // console.log('Created principal:', principal);
//           });
//         });
//         // create cook role
//         Role.create({
//           name: 'chef',
//         }, function(err, role) {
//           if (err) throw err;

//           // console.log('Created role:', role);

//           role.principals.create({
//             principalType: RoleMapping.USER,
//             principalId: results.createUsers[2].id,
//           }, function(err, principal) {
//             if (err) throw err;

//             // console.log('Created principal:', principal);
//           });
//         });
//         // create barman role
//         Role.create({
//           name: 'barman',
//         }, function(err, role) {
//           if (err) throw err;

//           // console.log('Created role:', role);

//           role.principals.create({
//             principalType: RoleMapping.USER,
//             principalId: results.createUsers[3].id,
//           }, function(err, principal) {
//             if (err) throw err;

//             // console.log('Created principal:', principal);
//           });
//         });
//       });
//     }],
//   }, function(err, results) {
//     console.log('err = ', err);
//     // console.log(results);
//   });

//   // create Sales Invoice
//   // state opened --- closed

//   // create Sales Invoice ---> Items relation
//   // state new --- progress --- ready --- served
// };
