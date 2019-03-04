(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~role-admin-admin-module~role-barman-barman-module~role-chef-chef-module~role-waiter-waiter-m~e733cf7f"],{

/***/ "./src/app/role/admin/stat.service.ts":
/*!********************************************!*\
  !*** ./src/app/role/admin/stat.service.ts ***!
  \********************************************/
/*! exports provided: AdminStatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminStatService", function() { return AdminStatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminStatService = /** @class */ (function () {
    function AdminStatService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        this.counterChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.counterChange$ = this.counterChange.asObservable();
    }
    AdminStatService.prototype.changeCounter = function (counterName, operation) {
        if (operation === void 0) { operation = 'increment'; }
        this.counterChange.next({ name: counterName, operation: operation });
    };
    AdminStatService.prototype.fetchNewOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countNew').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService.prototype.fetchProgressOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countProgress').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService.prototype.fetchReadyOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService.prototype.fetchStopList = function () {
        return this.http.get(this.apiUrl + 'api/Items/countStopList').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService.prototype.fetchOpenedBills = function () {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/countOpenedInvoices').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService.prototype.fetchShoppingList = function () {
        return this.http.get(this.apiUrl + 'api/Items/countShoppingList').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminStatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AdminStatService);
    return AdminStatService;
}());



/***/ }),

/***/ "./src/app/role/barman/stat.service.ts":
/*!*********************************************!*\
  !*** ./src/app/role/barman/stat.service.ts ***!
  \*********************************************/
/*! exports provided: BarmanStatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarmanStatService", function() { return BarmanStatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BarmanStatService = /** @class */ (function () {
    function BarmanStatService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        this.counterChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.counterChange$ = this.counterChange.asObservable();
    }
    BarmanStatService.prototype.changeCounter = function (counterName, operation) {
        if (operation === void 0) { operation = 'increment'; }
        this.counterChange.next({ name: counterName, operation: operation });
    };
    BarmanStatService.prototype.fetchNewOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countNew').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    BarmanStatService.prototype.fetchProgressOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countProgress').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    BarmanStatService.prototype.fetchReadyOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    BarmanStatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BarmanStatService);
    return BarmanStatService;
}());



/***/ }),

/***/ "./src/app/role/chef/stat.service.ts":
/*!*******************************************!*\
  !*** ./src/app/role/chef/stat.service.ts ***!
  \*******************************************/
/*! exports provided: ChefStatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChefStatService", function() { return ChefStatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChefStatService = /** @class */ (function () {
    function ChefStatService(http) {
        this.http = http;
        this.counterChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.counterChange$ = this.counterChange.asObservable();
    }
    ChefStatService.prototype.changeCounter = function (counterName, operation) {
        if (operation === void 0) { operation = 'increment'; }
        this.counterChange.next({ name: counterName, operation: operation });
    };
    ChefStatService.prototype.fetchNewOrders = function () {
        return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countNew').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    ChefStatService.prototype.fetchProgressOrders = function () {
        return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countProgress').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    ChefStatService.prototype.fetchReadyOrders = function () {
        return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    ChefStatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ChefStatService);
    return ChefStatService;
}());



/***/ }),

/***/ "./src/app/role/waiter/stat.service.ts":
/*!*********************************************!*\
  !*** ./src/app/role/waiter/stat.service.ts ***!
  \*********************************************/
/*! exports provided: WaiterStatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterStatService", function() { return WaiterStatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WaiterStatService = /** @class */ (function () {
    function WaiterStatService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        this.counterChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.counterChange$ = this.counterChange.asObservable();
    }
    WaiterStatService.prototype.changeCounter = function (counterName, operation) {
        if (operation === void 0) { operation = 'increment'; }
        this.counterChange.next({ name: counterName, operation: operation });
    };
    WaiterStatService.prototype.fetchOpenedBills = function () {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/countOpenedInvoices').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterStatService.prototype.fetchNewOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countNew').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterStatService.prototype.fetchProgressOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countProgress').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterStatService.prototype.fetchReadyOrders = function () {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/countReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterStatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], WaiterStatService);
    return WaiterStatService;
}());



/***/ }),

/***/ "./src/app/shared/dashboard/dashboard.component.css":
/*!**********************************************************!*\
  !*** ./src/app/shared/dashboard/dashboard.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-card {\n    max-width: 200px;\n  }\n  \n  .example-header-image {\n    background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');\n    background-size: cover;\n  }\n  \n  .mat-toolbar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    z-index: 2;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n  \n  .mat-expansion-panel:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n  \n  .mat-card:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n  \n  .mat-toolbar.mat-primary {\n  background: #ffffff;\n  color: rgba(0,0,0,.54);\n}\n  \n  .activities {\n  position: fixed;\n}\n  \n  .mat-form-field-infix {\n  width: 400px;\n}\n  \n  .suffix {\n  display: block;\n  position: relative;\n  top: 10px;\n}\n  \n  .mat-menu-panel {\n  min-width: 50px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  max-height: calc(100vh - 48px);\n  /* border-radius: 2px; */\n  outline: 0;\n  background: rgba(255, 255, 255, 0);\n  position: relative;\n  bottom: 1px;\n  left: 7px;\n  box-shadow: none;\n}"

/***/ }),

/***/ "./src/app/shared/dashboard/dashboard.component.html":
/*!***********************************************************!*\
  !*** ./src/app/shared/dashboard/dashboard.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" style=\"min-width: 100%; min-height: 100vh\">\n  <mat-toolbar fxLayout=\"row\" color=\"primary\" class=\"mat-toolbar\">\n    <button fxFlex=\"5\" mat-icon-button (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <div fxFlex=\"13\" >\n      <h1>Bot.legger : {{role}}</h1>\n    </div>\n    <div fxFlex=\"78\" >            \n      <mat-form-field *ngIf=\"searchPossible$ | async\" style=\"width: 400px; margin-left: 122px;\">\n        <input matInput type=\"text\" style=\"width: 400px;\" [(ngModel)]=\"searchValue\" autocomplete=\"off\"  (keyup)=\"searchInput.next($event);\">\n        <mat-icon matSuffix class=\"suffix\">search</mat-icon>\n      </mat-form-field>\n    </div>\n    <div fxFlex>\n    <mat-menu #appMenu=\"matMenu\">\n      <button mat-menu-item routerLink=\"/signout\">Sign out</button>\n    </mat-menu>\n    <button mat-icon-button [matMenuTriggerFor]=\"appMenu\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    </div>\n  </mat-toolbar>\n  <mat-sidenav-container  style=\"min-width: 100%; margin-top: 64px;\" >\n    <mat-sidenav   #snav [opened]=\"isOpen\" [mode]=\"mode\" style=\"min-height:100vh; min-width: 200px;\" [fixedInViewport]=\"true\" [fixedTopGap]=\"64\"\n    [fixedBottomGap]=\"10\">\n    <mat-accordion [ngSwitch]=\"role\">\n      <ng-container *ngSwitchCase= \"'admin'\">\n        <mat-expansion-panel  [expanded]=\"true\">\n          <mat-expansion-panel-header>\n            <mat-panel-title >\n              Items\n            </mat-panel-title>\n          </mat-expansion-panel-header>\n            <mat-nav-list>\n              <a mat-list-item routerLink=\"/admin/item\">Item</a>\n            </mat-nav-list>\n        </mat-expansion-panel>\n        <mat-expansion-panel [expanded]=\"true\">\n          <mat-expansion-panel-header>\n            <mat-panel-title>\n              Sales\n            </mat-panel-title>\n          </mat-expansion-panel-header>\n          <mat-nav-list>\n            <a mat-list-item routerLink=\"/admin/purchase\">Purchase Invoice</a>\n            <a mat-list-item routerLink=\"/admin/sale\">Sales Invoice</a>\n            <a mat-list-item routerLink=\"/admin/sale/order\">Orders List</a>\n          </mat-nav-list>\n        </mat-expansion-panel>\n      </ng-container>\n      <ng-container *ngSwitchCase= \"'waiter'\">\n      <mat-expansion-panel [expanded]=\"true\">\n          <mat-expansion-panel-header>\n            <mat-panel-title >\n              Sales\n            </mat-panel-title>\n          </mat-expansion-panel-header>\n          <mat-nav-list>\n            <a mat-list-item routerLink=\"/waiter/sale\">Sales</a>\n            <a mat-list-item routerLink=\"/waiter/sale/order\">Orders</a>\n          </mat-nav-list>\n        </mat-expansion-panel>\n      </ng-container>\n      <ng-container *ngSwitchCase= \"'chef'\">\n        <mat-expansion-panel>\n            <mat-expansion-panel-header>\n              <mat-panel-title>\n                Chef\n              </mat-panel-title>\n            </mat-expansion-panel-header>\n            <mat-nav-list>\n              <a mat-list-item routerLink=\"/chef/sale/order\">Orders</a>\n            </mat-nav-list>\n          </mat-expansion-panel>\n      </ng-container>\n      <ng-container *ngSwitchCase= \"'barman'\">\n          <mat-expansion-panel >\n              <mat-expansion-panel-header>\n                <mat-panel-title>\n                  Barman\n                </mat-panel-title>\n              </mat-expansion-panel-header>\n              <mat-nav-list>\n                <a mat-list-item routerLink=\"/barman/sale/order\">Orders</a>\n              </mat-nav-list>\n            </mat-expansion-panel>\n        </ng-container>\n    </mat-accordion>\n    </mat-sidenav>\n    <mat-sidenav-content fxLayout=\"row\">\n      <div fxFlex=\"75\" fxFlex.lt-md=\"100\" fxFill style=\"min-height: 100vh;\">\n        <router-outlet></router-outlet>\n      </div>\n      <div fxFlex fxShow.lt-md=\"false\" fxFill style=\"min-height: 100vh; background-color: white;\">\n        <div [ngSwitch]=\"role\" class=\"activities\">\n            <ng-container *ngSwitchCase= \"'admin'\">\n              <mat-nav-list>\n                  <a mat-list-item routerLink=\"/admin/sale/order/new/show\" > <span [matBadge]=\"newOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" matBadgeSize=\"medium\" >New orders</span>  </a>\n                  <a mat-list-item routerLink=\"/admin/sale/order/progress/show\" > <span [matBadge]=\"progressOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" >Orders in progress</span>  </a>\n                  <a mat-list-item routerLink=\"/admin/sale/order/ready/show\" > <span [matBadge]=\"readyOrders$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Ready orders</span>  </a>\n              </mat-nav-list>\n              <mat-nav-list>\n                  <a mat-list-item routerLink=\"/admin/item/stoplist/show\" > <span [matBadge]=\"stopList$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Stop list</span>  </a>\n                  <a mat-list-item routerLink=\"/admin/sale/opened/show\" > <span [matBadge]=\"openedInvoices$ | async\" matBadgeColor=\"accent\"  matBadgeOverlap=\"false\" >Opened invoices</span>  </a>\n                  <a mat-list-item routerLink=\"/admin/item/shoppinglist/show\" > <span [matBadge]=\"shoppingList$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Shopping list</span>  </a>              \n                </mat-nav-list>\n              </ng-container>\n              <ng-container *ngSwitchCase= \"'waiter'\">\n                  <mat-nav-list>\n                      <a mat-list-item routerLink=\"/waiter/sale/order/new/show\" > <span [matBadge]=\"newOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" matBadgeSize=\"medium\" >New orders</span>  </a>\n                      <a mat-list-item routerLink=\"/waiter/sale/order/progress/show\" > <span [matBadge]=\"progressOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" >Orders in progress</span>  </a>\n                      <a mat-list-item routerLink=\"/waiter/sale/order/ready/show\" > <span [matBadge]=\"readyOrders$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Ready orders</span>  </a>\n                  </mat-nav-list>\n                  <mat-nav-list>\n                      <a mat-list-item routerLink=\"/waiter/sale/opened/show\" > <span [matBadge]=\"openedInvoices$ | async\" matBadgeColor=\"accent\"  matBadgeOverlap=\"false\" >Opened invoices</span>  </a>\n                    </mat-nav-list>\n                </ng-container>\n                <ng-container *ngSwitchCase= \"'chef'\">\n                    <mat-nav-list>\n                        <a mat-list-item routerLink=\"/chef/sale/order/new/show\" > <span [matBadge]=\"newOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" matBadgeSize=\"medium\" >New orders</span>  </a>\n                        <a mat-list-item routerLink=\"/chef/sale/order/progress/show\" > <span [matBadge]=\"progressOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" >Orders in progress</span>  </a>\n                        <a mat-list-item routerLink=\"/chef/sale/order/ready/show\" > <span [matBadge]=\"readyOrders$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Ready orders</span>  </a>\n                    </mat-nav-list>\n                </ng-container>\n                <ng-container *ngSwitchCase= \"'barman'\">\n                    <mat-nav-list>\n                        <a mat-list-item routerLink=\"/barman/sale/order/new/show\" > <span [matBadge]=\"newOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" matBadgeSize=\"medium\" >New orders</span>  </a>\n                        <a mat-list-item routerLink=\"/barman/sale/order/progress/show\" > <span [matBadge]=\"progressOrders$ | async\" matBadgeColor=\"primary\"  matBadgeOverlap=\"false\" >Orders in progress</span>  </a>\n                        <a mat-list-item routerLink=\"/barman/sale/order/ready/show\" > <span [matBadge]=\"readyOrders$ | async\" matBadgeColor=\"warn\"  matBadgeOverlap=\"false\" >Ready orders</span>  </a>\n                    </mat-nav-list>\n                </ng-container>\n          </div>\n      </div>\n    </mat-sidenav-content>\n  </mat-sidenav-container >\n</div>"

/***/ }),

/***/ "./src/app/shared/dashboard/dashboard.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/dashboard/dashboard.component.ts ***!
  \*********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _search_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search.service */ "./src/app/shared/dashboard/search.service.ts");
/* harmony import */ var _role_admin_stat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../role/admin/stat.service */ "./src/app/role/admin/stat.service.ts");
/* harmony import */ var _role_barman_stat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../role/barman/stat.service */ "./src/app/role/barman/stat.service.ts");
/* harmony import */ var _role_chef_stat_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../role/chef/stat.service */ "./src/app/role/chef/stat.service.ts");
/* harmony import */ var _role_waiter_stat_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../role/waiter/stat.service */ "./src/app/role/waiter/stat.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DashboardComponent = /** @class */ (function () {
    function DashboardComponent($media, router, searchService, injector, authService) {
        this.$media = $media;
        this.router = router;
        this.searchService = searchService;
        this.injector = injector;
        this.authService = authService;
        this.isOpen = true;
        this.mode = 'over';
        this.searchReq = '';
        this.searchInput = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.role = null;
        this.searchValue = '';
        this.searchPossible = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.searchPossible$ = this.searchPossible.asObservable();
        this.newOrders = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.newOrders$ = this.newOrders.asObservable();
        this.progressOrders = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.progressOrders$ = this.progressOrders.asObservable();
        this.readyOrders = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.readyOrders$ = this.readyOrders.asObservable();
        this.stopList = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.stopList$ = this.stopList.asObservable();
        this.openedInvoices = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.openedInvoices$ = this.openedInvoices.asObservable();
        this.shoppingList = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.shoppingList$ = this.shoppingList.asObservable();
        this.role = this.authService.getRole();
        switch (this.role) {
            case 'admin':
                this.statService = this.injector.get(_role_admin_stat_service__WEBPACK_IMPORTED_MODULE_7__["AdminStatService"]);
                break;
            case 'barman':
                this.statService = this.injector.get(_role_barman_stat_service__WEBPACK_IMPORTED_MODULE_8__["BarmanStatService"]);
                break;
            case 'chef':
                this.statService = this.injector.get(_role_chef_stat_service__WEBPACK_IMPORTED_MODULE_9__["ChefStatService"]);
                break;
            case 'waiter':
                this.statService = this.injector.get(_role_waiter_stat_service__WEBPACK_IMPORTED_MODULE_10__["WaiterStatService"]);
                break;
            default:
                break;
        }
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscription = this.$media.subscribe(function (change) {
            _this.isOpen = (change.mqAlias !== 'xs');
            _this.mediaChange = change;
            _this.mode = _this.isOpen === true ? 'side' : 'over';
        });
        if (typeof this.statService.fetchNewOrders === 'function') {
            this._newOrders = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchNewOrders(); })).subscribe(function (result) { return _this.newOrders.next(result); });
        }
        if (typeof this.statService.fetchProgressOrders === 'function') {
            this._progressOrders = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchProgressOrders(); })).subscribe(function (result) { return _this.progressOrders.next(result); });
        }
        if (typeof this.statService.fetchReadyOrders === 'function') {
            this._readyOrders = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchReadyOrders(); })).subscribe(function (result) { return _this.readyOrders.next(result); });
        }
        if (typeof this.statService.fetchStopList === 'function') {
            this._stopList = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchStopList(); })).subscribe(function (result) { return _this.stopList.next(result); });
        }
        if (typeof this.statService.fetchOpenedBills === 'function') {
            this._openedInvoices = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchOpenedBills(); })).subscribe(function (result) { return _this.openedInvoices.next(result); });
        }
        if (typeof this.statService.fetchShoppingList === 'function') {
            this._shoppingList = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this.statService.fetchShoppingList(); })).subscribe(function (result) { return _this.shoppingList.next(result); });
        }
        this.searchService.searchPossible$.subscribe(function (searchPossibility) {
            setTimeout(function () { return _this.searchPossible.next(searchPossibility); }, 0);
        });
        this.searchService.clear$.subscribe(function (clear) {
            _this.searchValue = null;
        });
        this.statService.counterChange$.subscribe(function (counterData) {
            counterData.operation === 'increment' ?
                _this[counterData.name].next(_this[counterData.name].value + 1) :
                _this[counterData.name].next(_this[counterData.name].value - 1);
        });
        this._searchInputSubscription = this.searchInput.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (evt) { return evt.target.value; }), 
        // filter(res => res.length > 2),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])()).subscribe(function (fullText) {
            _this.searchService.sendRequest(fullText);
        });
    };
    DashboardComponent.prototype.sendRequest = function (event) {
        this.searchService.sendRequest(event.target.value);
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this._searchInputSubscription.unsubscribe();
        if (typeof this.statService.fetchNewOrders === 'function') {
            this._newOrders.unsubscribe();
        }
        if (typeof this.statService.fetchProgressOrders === 'function') {
            this._progressOrders.unsubscribe();
        }
        if (typeof this.statService.fetchReadyOrders === 'function') {
            this._readyOrders.unsubscribe();
        }
        if (typeof this.statService.fetchStopList === 'function') {
            this._stopList.unsubscribe();
        }
        if (typeof this.statService.fetchOpenedBills === 'function') {
            this._openedInvoices.unsubscribe();
        }
        if (typeof this.statService.fetchShoppingList === 'function') {
            this._shoppingList.unsubscribe();
        }
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/shared/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/shared/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["ObservableMedia"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _search_service__WEBPACK_IMPORTED_MODULE_6__["SearchService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/shared/dashboard/dashboard.shared.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/dashboard/dashboard.shared.module.ts ***!
  \*************************************************************/
/*! exports provided: DashboardSharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardSharedModule", function() { return DashboardSharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/shared/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DashboardSharedModule = /** @class */ (function () {
    function DashboardSharedModule() {
    }
    DashboardSharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"]
            ],
            declarations: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"]
            ],
            providers: [],
            exports: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"]
            ]
        })
    ], DashboardSharedModule);
    return DashboardSharedModule;
}());



/***/ }),

/***/ "./src/app/shared/dashboard/search.service.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/dashboard/search.service.ts ***!
  \****************************************************/
/*! exports provided: SearchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchService", function() { return SearchService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SearchService = /** @class */ (function () {
    function SearchService() {
        // Observable string sources
        this.searchPossible = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.searchRequest = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.clear = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        // Observable string streams
        this.searchPossible$ = this.searchPossible.asObservable();
        this.searchRequest$ = this.searchRequest.asObservable();
        this.clear$ = this.clear.asObservable();
    }
    // Service message commands
    SearchService.prototype.sendRequest = function (searchRequest) {
        this.searchRequest.next(searchRequest);
    };
    SearchService.prototype.clearSearchInput = function (clear) {
        if (clear === void 0) { clear = true; }
        this.clear.next(true);
    };
    SearchService.prototype.confirmSearchPossibility = function (searchPossible) {
        this.searchPossible.next(searchPossible);
    };
    SearchService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], SearchService);
    return SearchService;
}());



/***/ }),

/***/ "./src/app/shared/stub/stub.component.css":
/*!************************************************!*\
  !*** ./src/app/shared/stub/stub.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/stub/stub.component.html":
/*!*************************************************!*\
  !*** ./src/app/shared/stub/stub.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/shared/stub/stub.component.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/stub/stub.component.ts ***!
  \***********************************************/
/*! exports provided: StubComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StubComponent", function() { return StubComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StubComponent = /** @class */ (function () {
    function StubComponent() {
    }
    StubComponent.prototype.ngOnInit = function () {
    };
    StubComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stub',
            template: __webpack_require__(/*! ./stub.component.html */ "./src/app/shared/stub/stub.component.html"),
            styles: [__webpack_require__(/*! ./stub.component.css */ "./src/app/shared/stub/stub.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StubComponent);
    return StubComponent;
}());



/***/ }),

/***/ "./src/app/shared/stub/stub.shared.module.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/stub/stub.shared.module.ts ***!
  \***************************************************/
/*! exports provided: StubSharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StubSharedModule", function() { return StubSharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _stub_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stub.component */ "./src/app/shared/stub/stub.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StubSharedModule = /** @class */ (function () {
    function StubSharedModule() {
    }
    StubSharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ],
            declarations: [
                _stub_component__WEBPACK_IMPORTED_MODULE_3__["StubComponent"]
            ],
            exports: [
                _stub_component__WEBPACK_IMPORTED_MODULE_3__["StubComponent"]
            ]
        })
    ], StubSharedModule);
    return StubSharedModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~role-admin-admin-module~role-barman-barman-module~role-chef-chef-module~role-waiter-waiter-m~e733cf7f.js.map