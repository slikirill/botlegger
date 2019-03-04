(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["role-waiter-waiter-module"],{

/***/ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-order-list/waiter-order-list.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-card:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n::ng-deep .mat-card-header-text {\nmargin: 0;\n}\n\n.mcard{\nmargin-left: 5px;\nmargin-top: 5px;\n}\n\n.card {\n  margin-bottom: 1%;\n}"

/***/ }),

/***/ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-order-list/waiter-order-list.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard\" fxLayout=\"row wrap\" fxLayout.sm=\"column\" fxLayoutGap=\"1%\" fxLayoutWrap fxLayoutAlign=\"space-between center\" fxLayoutAlign.sm=\"center\"   >\n    <mat-card *ngFor=\"let order of orders$ | async; let i = index\" class=\"card\" fxFlex=\"49%\" fxFlex.xs=\"100\">\n        <mat-card-header fxLayout=\"row\">\n            <div  fxLayout=\"row\" fxFlex=\"70\">\n                <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+order.item.image+')'}\" style=\"background-size: cover;\"></div>\n                <div fxLayout=\"column\"> \n                    <mat-card-title>{{order.item.name}} <mat-icon *ngIf=\"order.menuItem\" aria-label=\"Menu order\">restaurant_menu</mat-icon></mat-card-title>\n                    <mat-card-subtitle>{{order.quantity}} x {{order.sellingPrice | currency}}</mat-card-subtitle>\n                </div>\n            </div>\n            <div fxLayout=\"column\" fxFlex fxLayoutAlign.sm=\"end center\">\n              <div [ngSwitch]=\"order.state\">\n                <ng-container *ngSwitchCase= \"'new'\">   \n                  <button mat-icon-button  color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">fiber_new</mat-icon>\n                  </button> \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'progress'\">\n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">update</mat-icon>\n                  </button> \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'ready'\">\n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">thumb_up_alt</mat-icon>\n                  </button>                 \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'served'\">                \n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">restaurant_menu</mat-icon>\n                  </button>    \n                </ng-container>\n              </div> \n            </div>\n        </mat-card-header>\n        <mat-card-actions fxLayout=\"row\">\n            <div fxFlex=\"70\">\n  \n            </div>\n            <div [ngSwitch]=\"order.state\">\n                <ng-container *ngSwitchCase= \"'new'\">   \n                    <div fxFlex style=\"height: 36px;\">\n\n                    </div>\n                </ng-container>\n                <ng-container  *ngSwitchCase= \"'progress'\" >\n                    <div fxFlex style=\"height: 36px;\">\n\n                    </div>\n                </ng-container>\n                <ng-container *ngSwitchCase= \"'ready'\">\n                    <div fxFlex>\n                        <button  mat-button (click)=\"changeState(order.id,'served', i);\">SERVE</button>\n                    </div>             \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'served'\">                \n                    <div fxFlex>\n                        <button routerLink=\"/waiter/sale/{{order.salesInvoiceId}}/edit\" mat-button>INVOICE</button>\n                    </div> \n                </ng-container>\n              </div> \n  \n        </mat-card-actions>\n    </mat-card>\n  </div>\n  "

/***/ }),

/***/ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-order-list/waiter-order-list.component.ts ***!
  \******************************************************************************/
/*! exports provided: WaiterOrderListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterOrderListComponent", function() { return WaiterOrderListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../waiter.service */ "./src/app/role/waiter/waiter.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _stat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../stat.service */ "./src/app/role/waiter/stat.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WaiterOrderListComponent = /** @class */ (function () {
    function WaiterOrderListComponent(waiterService, route, statService) {
        this.waiterService = waiterService;
        this.route = route;
        this.statService = statService;
        this._orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"];
        this.orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.orders$ = this.orders.asObservable();
        this.filter = false;
    }
    WaiterOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._routes = this.route.params
            .subscribe(function (params) {
            _this.filter = params.filter;
            _this._orders.unsubscribe();
            _this._orders = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.waiterService.getOrders(_this.filter); })).subscribe(function (result) { return _this.orders.next(result); });
        });
    };
    WaiterOrderListComponent.prototype.changeState = function (id, state, index) {
        var _this = this;
        switch (state) {
            case 'served':
                this.statService.changeCounter('readyOrders', 'decrement');
                this.waiterService.serveOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'served';
                });
                break;
            default:
                break;
        }
        return true;
    };
    WaiterOrderListComponent.prototype.ngOnDestroy = function () {
        this._orders.unsubscribe();
        this._routes.unsubscribe();
    };
    WaiterOrderListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-waiter-order-list',
            template: __webpack_require__(/*! ./waiter-order-list.component.html */ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.html"),
            styles: [__webpack_require__(/*! ./waiter-order-list.component.css */ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.css")]
        }),
        __metadata("design:paramtypes", [_waiter_service__WEBPACK_IMPORTED_MODULE_1__["WaiterService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _stat_service__WEBPACK_IMPORTED_MODULE_3__["WaiterStatService"]])
    ], WaiterOrderListComponent);
    return WaiterOrderListComponent;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/role/waiter/waiter-routing.module.ts ***!
  \******************************************************/
/*! exports provided: WaiterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterRoutingModule", function() { return WaiterRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared/stub/stub.component */ "./src/app/shared/stub/stub.component.ts");
/* harmony import */ var _shared_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.component */ "./src/app/shared/dashboard/dashboard.component.ts");
/* harmony import */ var _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../shared/not-found/not-found.component */ "./src/app/shared/not-found/not-found.component.ts");
/* harmony import */ var _waiter_order_list_waiter_order_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./waiter-order-list/waiter-order-list.component */ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.ts");
/* harmony import */ var _waiter_sale_list_waiter_sale_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./waiter-sale-list/waiter-sale-list.component */ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.ts");
/* harmony import */ var _waiter_sale_edit_waiter_sale_edit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./waiter-sale-edit/waiter-sale-edit.component */ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    {
        path: '',
        component: _shared_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
        children: [
            { path: 'sale', component: _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__["StubComponent"],
                children: [
                    { path: '', component: _waiter_sale_list_waiter_sale_list_component__WEBPACK_IMPORTED_MODULE_6__["WaiterSaleListComponent"] },
                    { path: 'new', component: _waiter_sale_edit_waiter_sale_edit_component__WEBPACK_IMPORTED_MODULE_7__["WaiterSaleEditComponent"] },
                    { path: ':id/edit', component: _waiter_sale_edit_waiter_sale_edit_component__WEBPACK_IMPORTED_MODULE_7__["WaiterSaleEditComponent"] },
                    { path: ':filter/show', component: _waiter_sale_list_waiter_sale_list_component__WEBPACK_IMPORTED_MODULE_6__["WaiterSaleListComponent"] },
                    { path: 'order', component: _waiter_order_list_waiter_order_list_component__WEBPACK_IMPORTED_MODULE_5__["WaiterOrderListComponent"] },
                    { path: 'order/:filter/show', component: _waiter_order_list_waiter_order_list_component__WEBPACK_IMPORTED_MODULE_5__["WaiterOrderListComponent"] },
                ]
            },
            { path: '404', component: _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__["NotFoundComponent"] },
            { path: '**', redirectTo: '/waiter/404' }
        ]
    }
];
var WaiterRoutingModule = /** @class */ (function () {
    function WaiterRoutingModule() {
    }
    WaiterRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], WaiterRoutingModule);
    return WaiterRoutingModule;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-18{\n    margin-top: 6px;\n    cursor: pointer;\n}"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\">\n  <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\">\n    <div fxFlex=\"90\"><p>{{ data.message }}</p></div>\n    <div fxFlex=\"10\">\n      <button mat-icon-button (click)=\"snackBarRef.dismiss()\"><mat-icon>close</mat-icon></button>\n    </div>\n  </div>\n</div>\n\n\n  <!-- <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\">\n    <div fxFlex=\"90\">{{data.item.name}} - {{data.quantity}}</div>\n    <div fxFlex=\"10\">\n      <button mat-icon-button (click)=\"snackBarRef.dismiss()\"><mat-icon>close</mat-icon></button>\n    </div>\n  </div>\n\n  <div fxLayout=\"row\" *ngIf=\"data.newAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n      <div fxFlex=\"10\"><mat-icon matTooltip=\"Order time\" matTooltipPosition=\"above\" class=\"mat-18\">fiber_new</mat-icon></div>\n      <div fxFlex=\"30\"><p>{{ newAt$ | async }}</p></div>\n    </div>\n \n    <mat-divider></mat-divider>\n    <div fxLayout=\"row\" *ngIf=\"data.progressAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n        <div fxFlex=\"10\"><mat-icon matTooltip=\"In progress\" matTooltipPosition=\"above\" class=\"mat-18\">schedule</mat-icon></div>\n        <div fxFlex=\"30\"><p>{{ time$ | async | date:'mediumTime' }}</p></div>\n      </div>\n      <mat-divider></mat-divider>\n      <div fxLayout=\"row\" *ngIf=\"data.readyAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n          <div fxFlex=\"10\"><mat-icon matTooltip=\"Ready\" matTooltipPosition=\"above\" class=\"mat-18\">thumb_up_alt</mat-icon></div>\n          <div fxFlex=\"30\"><p>{{data.readyAt | date:'shortTime' }}</p></div>\n        </div>\n        <mat-divider></mat-divider>\n        <div fxLayout=\"row\" *ngIf=\"data.servedAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n            <div fxFlex=\"10\"><mat-icon matTooltip=\"Served\" matTooltipPosition=\"above\" class=\"mat-18\">restaurant</mat-icon></div>\n            <div fxFlex=\"30\"><p>{{data.servedAt | date:'shortTime' }}</p></div>\n          </div> -->"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.ts ***!
  \***************************************************************************************/
/*! exports provided: WaiterSaleSnackbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterSaleSnackbarComponent", function() { return WaiterSaleSnackbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var WaiterSaleSnackbarComponent = /** @class */ (function () {
    function WaiterSaleSnackbarComponent(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
        this.ticks = 0;
        this.time$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (val) { return new Date(); }));
        this.initTimer(this.data);
    }
    WaiterSaleSnackbarComponent.prototype.initTimer = function (data) {
        this.newAt$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (val) {
            var newAt = new Date(data.newAt);
            var startTime = new Date(data.newAt);
            var endTime = new Date();
            var timeDiff = Number(endTime) - Number(startTime);
            timeDiff /= 1000;
            var seconds = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            var minutes = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            var hours = Math.round(timeDiff % 24);
            timeDiff = Math.floor(timeDiff / 24);
            var days = timeDiff;
            newAt.setSeconds(newAt.getSeconds() + val);
            console.log(hours + ':' + minutes + ':' + seconds);
            return hours + ':' + minutes + ':' + seconds;
        }));
    };
    WaiterSaleSnackbarComponent.prototype.ngOnInit = function () {
    };
    WaiterSaleSnackbarComponent.prototype.ngAfterViewInit = function () {
    };
    WaiterSaleSnackbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sale-snackbar',
            template: __webpack_require__(/*! ./sale-snackbar.component.html */ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.html"),
            styles: [__webpack_require__(/*! ./sale-snackbar.component.css */ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_SNACK_BAR_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarRef"], Object])
    ], WaiterSaleSnackbarComponent);
    return WaiterSaleSnackbarComponent;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-18{\n    margin-top: 6px;\n}\n\n.card {\n    margin-bottom: 1%;\n  }\n\n.mat-card:not([class*=mat-elevation-z]) {\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.mcard_white{\n    background-color: white;\n    padding: 5px;\n    margin-left: 5px;\n    margin-right: 5px;\n    margin-top: 5px;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.mcard{\n    margin-left: 5px;\n    margin-top: 5px;\n    margin-right: 5px;\n}\n\n.mat-fab-div{\n    margin-bottom: 5px; \n}\n\n.buttons-container {\n    position: fixed; bottom: 10px; right: 10px;\n}\n\n.buttons {\n    margin-left: 9px;\n}\n"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard_white\" fxLayout=\"column\">\n  <h3>Sale invoice </h3>\n\n  <div *ngIf=\"SaleInvoice$ | async as SaleInvoice\">\n      <p>Visitor: {{SaleInvoice.visitorId}}</p>\n      <p>State: {{SaleInvoice.state}}</p>\n      <p>Opened: {{SaleInvoice.openedAt | date: 'fullDate'}}</p>\n      <p *ngIf=\"SaleInvoice.closedAt\">Closed: {{SaleInvoice.closedAt | date: 'fullDate'}}</p>\n      <p>Total: {{SaleInvoice.total | currency}}</p>\n  </div>\n\n  <form fxHide fxLayout=\"column\" *ngIf=\"SaleInvoice$ | async\" [formGroup]=\"saleInvoiceForm\" (ngSubmit)=\"onUpdate()\">\n    <ng-template *ngIf=\"!editMode\">\n      <input matInput formControlName=\"id\">\n    </ng-template>\n    <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Visitor\" formControlName=\"visitorId\">\n        <mat-error *ngIf=\"saleInvoiceForm.controls['visitorId'].hasError('required')\">\n          Visitor is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Total\" formControlName=\"total\">\n        <mat-error *ngIf=\"saleInvoiceForm.controls['total'].hasError('required')\">\n          Total is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n    </div>\n    <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"openedAt\"  placeholder=\"Opened at\" formControlName=\"openedAt\">\n        <mat-datepicker-toggle matSuffix [for]=\"openedAt\">\n          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n        </mat-datepicker-toggle>\n        <mat-datepicker #openedAt></mat-datepicker>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"closedAt\"  placeholder=\"Closed at\" formControlName=\"closedAt\">\n        <mat-datepicker-toggle matSuffix [for]=\"closedAt\">\n          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n        </mat-datepicker-toggle>\n        <mat-datepicker #closedAt></mat-datepicker>\n      </mat-form-field>\n    </div>\n  </form>\n\n  <div class=\"buttons-container\" fxLayout=\"column\">\n      <div  class=\"buttons\" *ngIf=\"show\" fxLayout=\"column\" >\n          <div class=\"mat-fab-div\"  (click)=\" show = !show;\" fxFlex=\"32\">\n              <button form=\"ngForm\" color=\"primary\" mat-mini-fab aria-label=\"Save\" (click)=\"saveInvoice()\">\n                <mat-icon>save</mat-icon>\n              </button>\n          </div>\n          <div class=\"mat-fab-div\" (click)=\" show = !show;\" fxFlex=\"32\">\n            <button mat-mini-fab  aria-label=\"Close\" (click)=\"closeInvoice()\">\n              <mat-icon>close</mat-icon>\n            </button>\n          </div>\n        </div>\n      <button mat-fab color=\"primary\" [disabled]=\"closed\" (click)=\" show = !show \"><mat-icon aria-label=\"Options\">more_vert</mat-icon></button>\n    </div>\n</div>\n  <div class=\"mcard\">\n    <form   [formGroup]=\"searchItemsForm\">\n      <div  formArrayName=\"searchItems\"     fxLayout=\"row wrap\" fxLayout.lt-md=\"column\" fxLayoutGap=\".3%\" fxLayoutGap.lt-md=\".9%\" fxLayoutWrap fxLayoutAlign=\"space-between center\">\n        <mat-card    style=\"margin-bottom: 1em;\" fxFill fxFlex=\"49.5%\" fxFlex.lt-md=\"99.5%\" \n        *ngFor=\"let searchItem of searchItems$ | async as searchItems; let i = index\"\n        [formGroupName]=\"i\" class=\"card\">\n            <mat-card-header fxLayout=\"row\">\n                <div  fxLayout=\"row\" fxFlex=\"70\">\n                    <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+searchItem.image+')'}\" style=\"background-size: cover;\"></div>\n                    <div fxLayout=\"column\"> \n                        <mat-card-title>{{searchItem.name}} </mat-card-title>\n                        <mat-card-subtitle>{{searchItem.sellingPrice | currency}}&#x24;</mat-card-subtitle>\n                    </div>\n                </div>\n                <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\n\n                    <input hidden matInput formControlName=\"quantity\">\n                    <input hidden matInput formControlName=\"itemId\">\n                    <input hidden matInput formControlName=\"salesInvoiceId\">\n                    <div  fxLayout=\"row\" fxLayoutAlign=\"space-around center\" [ngSwitch]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\">\n                        <ng-template ngSwitchCase=\"0\">\n                            <button disabled mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i,false)\"><mat-icon aria-label=\"Add one\">chevron_left</mat-icon></button>\n                            <button  mat-mini-fab color=\"accent\"  [matBadge]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\" matBadgePosition=\"after\" matBadgeColor=\"primary\" (click)=\"clearSearch(searchItemsForm.get('searchItems').controls[i].value, i)\">Clear</button>\n                            <button disabled mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i, true)\"><mat-icon aria-label=\"Delete one\">chevron_right</mat-icon></button>\n                        </ng-template>\n                        <ng-template ngSwitchDefault>\n                            <button mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i,false)\"><mat-icon aria-label=\"Add one\">chevron_left</mat-icon></button>\n                            <button mat-mini-fab color=\"primary\"  [matBadge]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\" matBadgePosition=\"after\" matBadgeColor=\"accent\" (click)=\"addItem(searchItemsForm.get('searchItems').controls[i].value, i)\">Add</button>\n                            <button mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i, true)\"><mat-icon aria-label=\"Delete one\">chevron_right</mat-icon></button>                         \n                        </ng-template>\n                    </div>\n\n                </div>\n            </mat-card-header>\n        </mat-card>\n\n      </div>\n  </form>\n    <form *ngIf=\"items$ | async as items\" [formGroup]=\"itemsForm\">\n      <div  formArrayName=\"items\"   fxLayout=\"row wrap\" fxLayout.lt-md=\"column\" fxLayoutGap=\".3%\" fxLayoutGap.lt-md=\".9%\" fxLayoutWrap fxLayoutAlign=\"space-between center\">\n        <mat-card class=\"card\"  style=\"margin-bottom: 1em;\" fxFill fxFlex=\"49.5%\" fxFlex.lt-md=\"99.5%\"  \n        *ngFor=\"let itemCtrl of itemsForm.get('items').controls; let i = index\"\n        [formGroupName]=\"i\">\n            <mat-card-header fxLayout=\"row\">\n                    <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+items[i].item.image+')'}\" style=\"background-size: cover;\"></div>\n                        <mat-card-title>{{items[i].item.name}} </mat-card-title>\n                        <mat-card-subtitle>State: {{items[i].state}} <br> Quantity: {{items[i].quantity}} <br> Total: {{items[i].sellingPrice * items[i].quantity | currency}}</mat-card-subtitle>\n                    \n            </mat-card-header>\n        </mat-card>\n      </div>\n  </form>\n  </div>\n\n\n\n"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.ts ***!
  \****************************************************************************/
/*! exports provided: WaiterSaleEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterSaleEditComponent", function() { return WaiterSaleEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../waiter.service */ "./src/app/role/waiter/waiter.service.ts");
/* harmony import */ var _stat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../stat.service */ "./src/app/role/waiter/stat.service.ts");
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../safe.pipe */ "./src/app/safe.pipe.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sale-snackbar/sale-snackbar.component */ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.ts");
/* harmony import */ var _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../shared/dashboard/search.service */ "./src/app/shared/dashboard/search.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var WaiterSaleEditComponent = /** @class */ (function () {
    function WaiterSaleEditComponent(route, waiterService, router, safePipe, snackBar, searchService, statService) {
        this.route = route;
        this.waiterService = waiterService;
        this.router = router;
        this.safePipe = safePipe;
        this.snackBar = snackBar;
        this.searchService = searchService;
        this.statService = statService;
        this.editMode = false;
        this.searchInput = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.closed = false;
        this.SaleInvoice = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"]({
            id: null,
            visitorId: 'New visitor',
            openedAt: new Date(),
            closedAt: null,
            state: 'opened',
            total: 0
        });
        this.SaleInvoice$ = this.SaleInvoice.asObservable();
        this.items = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"]([]);
        this.items$ = this.items.asObservable();
        this.searchItems = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"]([]);
        this.searchItems$ = this.searchItems.asObservable();
    }
    WaiterSaleEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params.id;
            _this.editMode = params.id != null;
            if (_this.editMode === true) {
                _this.waiterService.getSaleInvoice(_this.id).subscribe(function (saleInvoice) {
                    _this.SaleInvoice.next(saleInvoice);
                    _this.closed = _this.SaleInvoice.value.state === 'closed' ? true : false;
                    if (!_this.closed) {
                        _this.searchService.confirmSearchPossibility(true);
                        _this.searchService.searchRequest$.subscribe(function (fullText) {
                            _this.fullText = fullText;
                            _this.waiterService.searchMenuItems(_this.fullText).subscribe(function (items) {
                                _this.searchItems.next(items);
                            });
                        });
                    }
                });
                _this.waiterService.searchItemsSaleInvoice(_this.id).subscribe(function (items) {
                    _this.items.next(items);
                });
            }
            else {
                _this.waiterService.updateSaleInvoice(_this.SaleInvoice.value).subscribe(function (result) {
                    console.log('', result);
                    _this.router.navigate(['/waiter/sale/' + result.id + '/edit']);
                }, function (error) { return console.log(error); });
            }
        });
        this._items = this.items.subscribe(function (data) {
            _this.initItemsForm();
        });
        this._SaleInvoice = this.SaleInvoice.subscribe(function (data) {
            _this.initForm();
        });
        this._searchItems = this.searchItems.subscribe(function (data) {
            _this.initSearchItemsForm();
        });
    };
    WaiterSaleEditComponent.prototype.saveInvoice = function () {
        // this.invoiceForm.nativeElement.submit();
    };
    WaiterSaleEditComponent.prototype.closeInvoice = function () {
        var _this = this;
        this.waiterService.closeSaleInvoice(this.id).subscribe(function (result) {
            if (result) {
                _this.searchService.clearSearchInput(true);
                _this.searchService.confirmSearchPossibility(false);
                _this.closed = true;
                _this.SaleInvoice.value.state = 'closed';
                _this.statService.changeCounter('openedInvoices', 'decrement');
            }
        });
    };
    WaiterSaleEditComponent.prototype.initForm = function () {
        this.saleInvoiceForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'visitorId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.visitorId, disabled: this.closed }),
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.id, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'openedAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.openedAt, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'closedAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.closedAt, disabled: this.closed }),
            'total': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.total, disabled: true }),
            'state': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.state, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    WaiterSaleEditComponent.prototype.addItem = function (item, index) {
        var _this = this;
        this.waiterService.addItemSaleInvoice(item).subscribe(function (result) {
            if (!result.add) {
                if (result.availablePortions === 0) {
                    _this.showSnackbar({ message: 'Sorry, you are not allowed to order this dish at the moment.' });
                }
                if (_this.searchItemsArray.controls[index].value.quantity !== result.availablePortions) {
                    _this.showSnackbar({ message: 'Sorry, but this dish is currently available in quantities of ' + result.availablePortions + ' servings' });
                }
                _this.searchItemsArray.controls[index].patchValue({ 'quantity': result.availablePortions });
            }
            else {
                _this.waiterService.getSaleInvoice(_this.id).subscribe(function (saleInvoice) {
                    _this.waiterService.searchItemsSaleInvoice(_this.id).subscribe(function (items) {
                        _this.items.next(items);
                        _this.SaleInvoice.next(saleInvoice);
                        _this.saleInvoiceForm.controls['total'].patchValue(result.total);
                        _this.searchItems.value.splice(index, 1);
                        _this.searchItemsArray.removeAt(index);
                        _this.searchItemsArray.updateValueAndValidity();
                        _this.statService.changeCounter('newOrders');
                    });
                });
            }
        }, function (error) { return console.log(error); });
    };
    WaiterSaleEditComponent.prototype.changeQuantity = function (itemCtrl, i, add) {
        if (add === void 0) { add = true; }
        if (add === true) {
            this.searchItemsArray.controls[i].patchValue({ 'quantity': itemCtrl.quantity + 1 });
        }
        else {
            if (itemCtrl.quantity === 1) {
                this.searchItemsArray.controls[i].patchValue({ 'quantity': itemCtrl.quantity });
            }
            else {
                this.searchItemsArray.controls[i].patchValue({ 'quantity': itemCtrl.quantity - 1 });
            }
        }
    };
    WaiterSaleEditComponent.prototype.initSearchItemsForm = function () {
        var _this = this;
        this.searchItemsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.searchItemsArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"]([]);
        this.searchItems.value.forEach(function (item, key) {
            _this.searchItemsArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                'itemId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.id),
                'salesInvoiceId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](_this.id),
                'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](1),
            }));
        });
        this.searchItemsForm.addControl('searchItems', this.searchItemsArray);
    };
    WaiterSaleEditComponent.prototype.initItemsForm = function () {
        var _this = this;
        this.itemsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.itemsArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"]([]);
        this.items.value.forEach(function (item, key) {
            _this.itemsArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                'itemId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.itemId),
                'salesInvoiceId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.salesInvoiceId),
                'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.quantity),
                'sellingPrice': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.sellingPrice),
                'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](item.id),
            }));
        });
        this.itemsForm.addControl('items', this.itemsArray);
    };
    WaiterSaleEditComponent.prototype.onUpdate = function () {
        var _this = this;
        this.waiterService.updateSaleInvoice(this.saleInvoiceForm.getRawValue()).subscribe(function (result) {
            _this.router.navigate(['/waiter/sale/' + result.id + '/edit']);
        }, function (error) { return console.log(error); });
    };
    WaiterSaleEditComponent.prototype.clearSearch = function (item, i) {
        this.searchService.clearSearchInput(true);
        // this.searchItems.value.splice(i, 1);
    };
    WaiterSaleEditComponent.prototype.onUpdateItem = function (item, index) {
        var _this = this;
        this.waiterService.updateSaleInvoiceItem(item).subscribe(function (result) {
            _this.saleInvoiceForm.controls['total'].patchValue(result.total);
        }, function (error) { return console.log(error); });
    };
    WaiterSaleEditComponent.prototype.showSnackbar = function (item) {
        this.openSnackBar(item);
    };
    WaiterSaleEditComponent.prototype.openSnackBar = function (item) {
        this.snackBar.openFromComponent(_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__["WaiterSaleSnackbarComponent"], {
            data: item,
            duration: 5000,
        });
    };
    WaiterSaleEditComponent.prototype.ngOnDestroy = function () {
        this.searchService.clearSearchInput(true);
        this.searchService.confirmSearchPossibility(false);
        this._items.unsubscribe();
        this._searchItems.unsubscribe();
        this._SaleInvoice.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('invoiceForm'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WaiterSaleEditComponent.prototype, "invoiceForm", void 0);
    WaiterSaleEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-waiter-sale-edit',
            template: __webpack_require__(/*! ./waiter-sale-edit.component.html */ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.html"),
            styles: [__webpack_require__(/*! ./waiter-sale-edit.component.css */ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _waiter_service__WEBPACK_IMPORTED_MODULE_3__["WaiterService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _safe_pipe__WEBPACK_IMPORTED_MODULE_5__["SafePipe"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"],
            _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_8__["SearchService"],
            _stat_service__WEBPACK_IMPORTED_MODULE_4__["WaiterStatService"]])
    ], WaiterSaleEditComponent);
    return WaiterSaleEditComponent;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-list/sale.invoice.datasource.ts":
/*!*************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-list/sale.invoice.datasource.ts ***!
  \*************************************************************************/
/*! exports provided: SaleInvoiceDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleInvoiceDatasource", function() { return SaleInvoiceDatasource; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var SaleInvoiceDatasource = /** @class */ (function () {
    function SaleInvoiceDatasource(waiterService) {
        this.waiterService = waiterService;
        this.saleInvoiceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.revenue = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('0');
        this.revenue$ = this.revenue.asObservable();
        this.grossProfit = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('0');
        this.grossProfit$ = this.grossProfit.asObservable();
        this.netProfit = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('0');
        this.netProfit$ = this.netProfit.asObservable();
        this.loading$ = this.loadingSubject.asObservable();
    }
    SaleInvoiceDatasource.prototype.loadSaleInvoices = function (filter, sortDirection, pageIndex, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd) {
        var _this = this;
        if (filter === void 0) { filter = false; }
        if (openedDateBegin === void 0) { openedDateBegin = null; }
        if (openedDateEnd === void 0) { openedDateEnd = null; }
        if (closedDateBegin === void 0) { closedDateBegin = null; }
        if (closedDateEnd === void 0) { closedDateEnd = null; }
        this.loadingSubject.next(true);
        this.waiterService.findSaleInvoices(filter, sortDirection, pageIndex, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (saleInvoices) {
            _this.saleInvoiceSubject.next(saleInvoices.body.result);
            _this.paginator.length = saleInvoices.headers.get('Content-Range').split('/')[1];
        });
    };
    SaleInvoiceDatasource.prototype.connect = function (collectionViewer) {
        return this.saleInvoiceSubject.asObservable();
    };
    SaleInvoiceDatasource.prototype.disconnect = function (collectionViewer) {
        console.log('disconnect');
        this.saleInvoiceSubject.complete();
        this.loadingSubject.complete();
    };
    return SaleInvoiceDatasource;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mcard{\n  background-color: white;\n  padding: 5px;\n  margin-left: 5px;\n  margin-right: 5px;\n  margin-top: 5px;\n  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n\n.no-line {\n  width: 200px;\n}"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"dataSource.loading$ | async\"></mat-progress-bar>\n<div fxLayout=\"column\" class=\"mcard\" >\n  <div fxLayout=\"column\">\n    <table mat-table [dataSource]=\"dataSource\" matSort matSortDisableClear=true>\n\n      <ng-container matColumnDef=\"state\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>State</th>\n\n          <td mat-cell *matCellDef=\"let saleInvoice\"> \n            <span [ngSwitch]=\"saleInvoice.state\">\n              <button matTooltip=\"Opened\" *ngSwitchCase=\"'opened'\" mat-icon-button>\n                <mat-icon routerLink=\"/waiter/sale/{{saleInvoice.id}}/edit\" >update</mat-icon>\n              </button>\n              <button matTooltip=\"Closed\" *ngSwitchCase=\"'closed'\" mat-icon-button>\n                  <mat-icon routerLink=\"/waiter/sale/{{saleInvoice.id}}/edit\" >check_circle_outline</mat-icon>\n              </button>\n            </span>\n            </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"openedAt\">\n        <th mat-header-cell *matHeaderCellDef> \n          <div>\n              <mat-form-field class=\"no-line\">\n                  <input matInput\n                        [formControl]=\"openedDateForm\"\n                         placeholder=\"Opened\"\n                         [satDatepicker]=\"openedDate\"\n                         (dateInput)=\"updateOpenedDate('input', $event)\" \n                         (dateChange)=\"updateOpenedDate('change', $event)\"\n                         >\n                  <sat-datepicker #openedDate [rangeMode]=\"true\" [closeAfterSelection]=\"true\">\n                  </sat-datepicker>\n                  <sat-datepicker-toggle matSuffix [for]=\"openedDate\"></sat-datepicker-toggle>\n                  <button matTooltip=\"Current date\"  mat-button matSuffix mat-icon-button aria-label=\"Current date\" (click)=\"openedCurrent()\">\n                      <mat-icon>access_time</mat-icon>\n                    </button>\n                    <button matTooltip=\"Date time show\"  mat-button matSuffix mat-icon-button aria-label=\"Date time show\" (click)=\"openedDateTimeToggle()\">\n                      <mat-icon>alarm</mat-icon>\n                    </button>\n                    <button matTooltip=\"Reset\" mat-button matSuffix mat-icon-button aria-label=\"Reset\" (click)=\"openedReset()\">\n                        <mat-icon>close</mat-icon>\n                    </button>   \n                </mat-form-field>\n            </div>\n        </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{openedDateFormat === 'shortTime' ? (saleInvoice.openedAt | date: 'shortTime') : (saleInvoice.openedAt | date: 'mediumDate')}} </td>\n        <td mat-footer-cell *matFooterCellDef></td>\n      </ng-container>\n    \n      <ng-container matColumnDef=\"closedAt\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-form-field class=\"no-line\">\n              <input matInput\n              [formControl]=\"closedDateForm\"\n               placeholder=\"Closed\"\n               [satDatepicker]=\"closedDate\"\n               (dateInput)=\"updateClosedDate('input', $event)\" \n               (dateChange)=\"updateClosedDate('change', $event)\"\n               >\n              <sat-datepicker #closedDate [rangeMode]=\"true\" [closeAfterSelection]=\"true\">\n              </sat-datepicker>\n              <sat-datepicker-toggle matSuffix [for]=\"closedDate\"></sat-datepicker-toggle>\n              <button matTooltip=\"Current date\"  mat-button matSuffix mat-icon-button aria-label=\"Current date\" (click)=\"closedCurrent()\">\n                <mat-icon>access_time</mat-icon>\n              </button>\n              <button matTooltip=\"Date time show\"  mat-button matSuffix mat-icon-button aria-label=\"Date time show\" (click)=\"closedDateTimeToggle()\">\n                <mat-icon>alarm</mat-icon>\n              </button>\n              <button matTooltip=\"Reset\" mat-button matSuffix mat-icon-button aria-label=\"Reset\" (click)=\"closedReset()\">\n                  <mat-icon>close</mat-icon>\n              </button>\n            </mat-form-field>\n        </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{closedDateFormat === 'shortTime' ? (saleInvoice.closedAt | date: 'shortTime') : (saleInvoice.closedAt | date: 'mediumDate')}} </td>\n        <td mat-footer-cell *matFooterCellDef></td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"total\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Total </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{saleInvoice.total | currency}} </td>\n      </ng-container>\n\n\n    \n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns;  sticky: true\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n    </table>\n\n    <mat-paginator [length]=\"2000\" [pageSize]=\"50\" [pageSizeOptions]=\"[10, 50, 100]\"></mat-paginator>\n  </div>\n</div>\n<div style=\"position: fixed; bottom: 10px; right: 10px;\">\n  <a  routerLink=\"/waiter/sale/new\" mat-fab color=\"primary\"><mat-icon aria-label=\"Add\">add</mat-icon></a>  \n</div>"

/***/ }),

/***/ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.ts ***!
  \****************************************************************************/
/*! exports provided: WaiterSaleListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterSaleListComponent", function() { return WaiterSaleListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../waiter.service */ "./src/app/role/waiter/waiter.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sale_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sale.invoice.datasource */ "./src/app/role/waiter/waiter-sale-list/sale.invoice.datasource.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WaiterSaleListComponent = /** @class */ (function () {
    function WaiterSaleListComponent(waiterService, route) {
        this.waiterService = waiterService;
        this.route = route;
        this.filter = false;
        this.revenue$ = null;
        this.grossProfit$ = null;
        this.netProfit$ = null;
        this.displayedColumns = [
            // 'id',
            'state',
            'openedAt',
            'closedAt',
            'total'
        ];
        this.openedDateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]();
        this.closedDateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]();
        this.openedDate = null;
        this.closedDate = null;
        this.openedDateBegin = null;
        this.closedDateBegin = null;
        this.openedDateEnd = null;
        this.closedDateEnd = null;
        this.closedDateFormat = 'shortTime';
        this.openedDateFormat = 'shortTime';
    }
    WaiterSaleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.openedDateFormat = localStorage.getItem('startDateFormat') !== null ?
            localStorage.getItem('startDateFormat') : this.openedDateFormat;
        this.closedDateFormat = localStorage.getItem('endDateFormat') !== null ?
            localStorage.getItem('endDateFormat') : this.closedDateFormat;
        if (localStorage.getItem('openedDateBegin') !== null) {
            this.openedDateBegin = new Date(localStorage.getItem('openedDateBegin'));
            this.openedDate = {
                begin: new Date(localStorage.getItem('openedDateBegin')),
                end: new Date(localStorage.getItem('openedDateEnd'))
            };
        }
        if (localStorage.getItem('openedDateEnd') !== null) {
            this.openedDateEnd = new Date(localStorage.getItem('openedDateEnd'));
        }
        if (localStorage.getItem('closedDateBegin') !== null) {
            this.closedDateBegin = new Date(localStorage.getItem('closedDateBegin'));
            this.closedDate = {
                begin: new Date(localStorage.getItem('closedDateBegin')),
                end: new Date(localStorage.getItem('closedDateEnd'))
            };
        }
        if (localStorage.getItem('closedDateEnd') !== null) {
            this.closedDateEnd = new Date(localStorage.getItem('closedDateEnd'));
        }
        this.openedDateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: this.openedDate, disabled: false });
        this.closedDateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: this.closedDate, disabled: false });
        this._routes = this.route.params
            .subscribe(function (params) {
            _this.filter = params.filter;
            _this.dataSource = new _sale_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__["SaleInvoiceDatasource"](_this.waiterService);
            _this.revenue$ = _this.dataSource.revenue$;
            _this.grossProfit$ = _this.dataSource.grossProfit$;
            _this.netProfit$ = _this.dataSource.netProfit$;
            console.log('', _this.filter);
            _this.dataSource.loadSaleInvoices(_this.filter, 'openedAt ASC', 0, 25, _this.openedDateBegin, _this.openedDateEnd, _this.closedDateBegin, _this.closedDateEnd);
        });
    };
    WaiterSaleListComponent.prototype.ngOnDestroy = function () {
        this._routes.unsubscribe();
    };
    WaiterSaleListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataSource.paginator = this.paginator;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(this.sort.sortChange, this.paginator.page)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.loadSaleInvoicesPage(); }))
            .subscribe();
    };
    WaiterSaleListComponent.prototype.updateOpenedDate = function (type, event) {
        localStorage.setItem('openedDateBegin', event.value.begin);
        localStorage.setItem('openedDateEnd', event.value.end);
        this.openedDateBegin = event.value.begin;
        this.openedDateEnd = event.value.end;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.updateClosedDate = function (type, event) {
        localStorage.setItem('closedDateBegin', event.value.begin);
        localStorage.setItem('closedDateEnd', event.value.end);
        this.closedDateBegin = event.value.begin;
        this.closedDateEnd = event.value.end;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.openedCurrent = function () {
        var beginDate = new Date();
        beginDate.setHours(0, 0, 0, 0);
        var endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        this.openedDateForm.setValue({ begin: beginDate, end: endDate });
        localStorage.setItem('openedDateBegin', beginDate.toString());
        localStorage.setItem('openedDateEnd', endDate.toString());
        this.openedDateBegin = beginDate;
        this.openedDateEnd = endDate;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.openedDateTimeToggle = function () {
        this.openedDateFormat = this.openedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
        localStorage.setItem('openedDateFormat', this.openedDateFormat);
    };
    WaiterSaleListComponent.prototype.openedReset = function () {
        this.openedDateForm.setValue('');
        localStorage.removeItem('openedDateBegin');
        localStorage.removeItem('openedDateEnd');
        this.openedDateBegin = null;
        this.openedDateEnd = null;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.closedCurrent = function () {
        var beginDate = new Date();
        beginDate.setHours(0, 0, 0, 0);
        var endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        this.closedDateForm.setValue({ begin: beginDate, end: endDate });
        localStorage.setItem('closedDateBegin', beginDate.toString());
        localStorage.setItem('closedDateEnd', endDate.toString());
        this.closedDateBegin = beginDate;
        this.closedDateEnd = endDate;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.closedDateTimeToggle = function () {
        this.closedDateFormat = this.closedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
        localStorage.setItem('endDateFormat', this.closedDateFormat);
    };
    WaiterSaleListComponent.prototype.closedReset = function () {
        this.closedDateForm.setValue('');
        localStorage.removeItem('closedDateBegin');
        localStorage.removeItem('closedDateEnd');
        this.closedDateBegin = null;
        this.closedDateEnd = null;
        this.loadSaleInvoicesPage();
    };
    WaiterSaleListComponent.prototype.loadSaleInvoicesPage = function () {
        var sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();
        this.dataSource.loadSaleInvoices(this.filter, sort, this.paginator.pageIndex, this.paginator.pageSize, this.openedDateBegin, this.openedDateEnd, this.closedDateBegin, this.closedDateEnd);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], WaiterSaleListComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], WaiterSaleListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('input'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WaiterSaleListComponent.prototype, "input", void 0);
    WaiterSaleListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-waiter-sale-list',
            template: __webpack_require__(/*! ./waiter-sale-list.component.html */ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.html"),
            styles: [__webpack_require__(/*! ./waiter-sale-list.component.css */ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.css")]
        }),
        __metadata("design:paramtypes", [_waiter_service__WEBPACK_IMPORTED_MODULE_1__["WaiterService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], WaiterSaleListComponent);
    return WaiterSaleListComponent;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter.module.ts":
/*!**********************************************!*\
  !*** ./src/app/role/waiter/waiter.module.ts ***!
  \**********************************************/
/*! exports provided: WaiterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterModule", function() { return WaiterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _waiter_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./waiter-routing.module */ "./src/app/role/waiter/waiter-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! saturn-datepicker */ "./node_modules/saturn-datepicker/fesm5/saturn-datepicker.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _waiter_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./waiter-sale-edit/sale-snackbar/sale-snackbar.component */ "./src/app/role/waiter/waiter-sale-edit/sale-snackbar/sale-snackbar.component.ts");
/* harmony import */ var _waiter_order_list_waiter_order_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./waiter-order-list/waiter-order-list.component */ "./src/app/role/waiter/waiter-order-list/waiter-order-list.component.ts");
/* harmony import */ var _waiter_sale_list_waiter_sale_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./waiter-sale-list/waiter-sale-list.component */ "./src/app/role/waiter/waiter-sale-list/waiter-sale-list.component.ts");
/* harmony import */ var _waiter_sale_edit_waiter_sale_edit_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./waiter-sale-edit/waiter-sale-edit.component */ "./src/app/role/waiter/waiter-sale-edit/waiter-sale-edit.component.ts");
/* harmony import */ var _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../shared/stub/stub.shared.module */ "./src/app/shared/stub/stub.shared.module.ts");
/* harmony import */ var _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.shared.module */ "./src/app/shared/dashboard/dashboard.shared.module.ts");
/* harmony import */ var _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../shared/not-found/not-found.shared.module */ "./src/app/shared/not-found/not-found.shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var WaiterModule = /** @class */ (function () {
    function WaiterModule() {
    }
    WaiterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _waiter_routing_module__WEBPACK_IMPORTED_MODULE_3__["WaiterRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatNativeDateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_12__["DashboardSharedModule"],
                _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_11__["StubSharedModule"],
                _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_13__["NotFoundSharedModule"],
                saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__["SatDatepickerModule"],
                saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__["SatNativeDateModule"]
            ],
            declarations: [
                _waiter_order_list_waiter_order_list_component__WEBPACK_IMPORTED_MODULE_8__["WaiterOrderListComponent"],
                _waiter_sale_list_waiter_sale_list_component__WEBPACK_IMPORTED_MODULE_9__["WaiterSaleListComponent"],
                _waiter_sale_edit_waiter_sale_edit_component__WEBPACK_IMPORTED_MODULE_10__["WaiterSaleEditComponent"],
                _waiter_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__["WaiterSaleSnackbarComponent"],
            ],
            entryComponents: [_waiter_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__["WaiterSaleSnackbarComponent"]],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_SNACK_BAR_DEFAULT_OPTIONS"], useValue: { duration: 100000 } }
            ],
        })
    ], WaiterModule);
    return WaiterModule;
}());



/***/ }),

/***/ "./src/app/role/waiter/waiter.service.ts":
/*!***********************************************!*\
  !*** ./src/app/role/waiter/waiter.service.ts ***!
  \***********************************************/
/*! exports provided: WaiterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterService", function() { return WaiterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WaiterService = /** @class */ (function () {
    function WaiterService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
        this.items = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.items$ = this.items.asObservable();
    }
    WaiterService.prototype.getItems = function (filter, fullText) {
        if (filter === void 0) { filter = false; }
        if (fullText === void 0) { fullText = false; }
        if (!filter) {
            this.listItems(fullText);
        }
        else if (filter === 'stoplist') {
            this.listStopList(fullText);
        }
    };
    WaiterService.prototype.listItems = function (fullText) {
        var _this = this;
        if (fullText === void 0) { fullText = false; }
        return this.http.get(this.apiUrl + 'api/Items/listItems', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('fullText', fullText.toString())
        }).subscribe(function (data) { return _this.items.next(data); });
    };
    WaiterService.prototype.listStopList = function (fullText) {
        var _this = this;
        if (fullText === void 0) { fullText = false; }
        return this.http.get(this.apiUrl + 'api/Items/listStopList', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('fullText', fullText.toString())
        }).subscribe(function (data) { return _this.items.next(data); });
    };
    WaiterService.prototype.serveOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/serveOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'served';
        }));
    };
    WaiterService.prototype.getOrders = function (filter) {
        if (filter === void 0) { filter = false; }
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/listOrders', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('filter', filter.toString())
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return (data);
        }));
    };
    WaiterService.prototype.findSaleInvoices = function (filter, order, pageNumber, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd) {
        if (filter === void 0) { filter = false; }
        if (order === void 0) { order = 'openedAt ASC'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 1; }
        if (openedDateBegin === void 0) { openedDateBegin = null; }
        if (openedDateEnd === void 0) { openedDateEnd = null; }
        if (closedDateBegin === void 0) { closedDateBegin = null; }
        if (closedDateEnd === void 0) { closedDateEnd = null; }
        var offset = 0;
        if (pageNumber === 0) {
            offset = 0;
        }
        else {
            offset = pageSize * pageNumber + 1;
        }
        var openedFilter = openedDateBegin === null ? {} : {
            'openedAt': {
                between: [openedDateBegin, openedDateEnd]
            }
        };
        var closedFilter = closedDateBegin === null ? {} : {
            'closedAt': {
                between: [closedDateBegin, closedDateEnd]
            }
        };
        var stateFilter = !filter ? {} : { state: filter };
        var requestFilter = {
            limit: pageSize.toString(),
            order: order,
            skip: offset.toString(),
            where: {
                and: [
                    openedFilter,
                    closedFilter,
                    stateFilter
                ]
            }
        };
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set('filter', JSON.stringify(requestFilter));
        return this.http.get(this.apiUrl + 'api/SalesInvoices', {
            observe: 'response',
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Prefer': 'count=exact'
            }),
            params: params
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.searchMenuItems = function (fullText) {
        return this.http.get(this.apiUrl + 'api/Items/searchMenuItems?fullText=' + fullText.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.getSaleInvoice = function (id) {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.searchItemsSaleInvoice = function (id, fulltext) {
        if (fulltext === void 0) { fulltext = ''; }
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/searchItemsSalesInvoice?salesInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.updateSaleInvoiceItem = function (item) {
        return this.http.post(this.apiUrl + 'api/relSalesInvoiceItems/updateSalesInvoiceItem', { item: item }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            console.log(data);
            return data;
        }));
    };
    WaiterService.prototype.updateSaleInvoice = function (SaleInvoice) {
        console.log(SaleInvoice);
        return this.http.post(this.apiUrl + 'api/SalesInvoices/replaceOrCreate', SaleInvoice).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.addItemSaleInvoice = function (item) {
        return this.http.post(this.apiUrl + 'api/relSalesInvoiceItems/addItemSaleInvoice', { item: item }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService.prototype.closeSaleInvoice = function (id) {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/closeSaleInvoice?salesInvoiceId=' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    WaiterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], WaiterService);
    return WaiterService;
}());



/***/ })

}]);
//# sourceMappingURL=role-waiter-waiter-module.js.map