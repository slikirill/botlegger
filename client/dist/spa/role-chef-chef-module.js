(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["role-chef-chef-module"],{

/***/ "./src/app/role/chef/chef-order-list/chef-order-list.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/role/chef/chef-order-list/chef-order-list.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-card:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n::ng-deep .mat-card-header-text {\nmargin: 0;\n}\n\n.mcard{\nmargin-left: 5px;\nmargin-top: 5px;\n}\n\n.card {\n  margin-bottom: 1%;\n}"

/***/ }),

/***/ "./src/app/role/chef/chef-order-list/chef-order-list.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/role/chef/chef-order-list/chef-order-list.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard\" fxLayout=\"row wrap\" fxLayout.sm=\"column\" fxLayoutGap=\"1%\" fxLayoutWrap fxLayoutAlign=\"space-between center\" fxLayoutAlign.sm=\"center\"   >\n    <mat-card *ngFor=\"let order of orders$ | async; let i = index\" class=\"card\" fxFlex=\"49%\" fxFlex.xs=\"100\">\n        <mat-card-header fxLayout=\"row\">\n            <div  fxLayout=\"row\" fxFlex=\"70\">\n                <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+order.item.image+')'}\" style=\"background-size: cover;\"></div>\n                <div fxLayout=\"column\"> \n                    <mat-card-title>{{order.item.name}} <mat-icon *ngIf=\"order.menuItem\" aria-label=\"Menu order\">restaurant_menu</mat-icon></mat-card-title>\n                    <mat-card-subtitle>{{order.quantity}} x {{order.sellingPrice | currency}}</mat-card-subtitle>\n                </div>\n            </div>\n            <div fxLayout=\"column\" fxFlex fxLayoutAlign.sm=\"end center\">\n              <div [ngSwitch]=\"order.state\">\n                <ng-container *ngSwitchCase= \"'new'\">   \n                  <button mat-icon-button  color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">fiber_new</mat-icon>\n                  </button> \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'progress'\">\n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">update</mat-icon>\n                  </button> \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'ready'\">\n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">thumb_up_alt</mat-icon>\n                  </button>                 \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'served'\">                \n                  <button mat-icon-button color=\"primary\">\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">restaurant_menu</mat-icon>\n                  </button>    \n                </ng-container>\n              </div> \n            </div>\n        </mat-card-header>\n        <mat-card-actions fxLayout=\"row\">\n            <div fxFlex=\"70\">\n  \n            </div>\n            <div [ngSwitch]=\"order.state\">\n                <ng-container *ngSwitchCase= \"'new'\">   \n                    <div fxFlex>\n                        <button  mat-button (click)=\"changeState(order.id,'progress', i);\">PROGRESS</button>\n                    </div>\n                </ng-container>\n                <ng-container  *ngSwitchCase= \"'progress'\" >\n                    <div fxFlex>\n                        <button  mat-button (click)=\"changeState(order.id,'ready', i);\">READY</button>\n                    </div>\n                </ng-container>\n                <ng-container  *ngSwitchCase= \"'ready'\">\n                    <div fxFlex  style=\"height: 36px;\">\n\n                    </div>             \n                </ng-container>\n                <ng-container *ngSwitchCase= \"'served'\">                \n                    <div fxFlex  style=\"height: 36px;\">\n\n                    </div> \n                </ng-container>\n              </div> \n  \n        </mat-card-actions>\n    </mat-card>\n  </div>\n  "

/***/ }),

/***/ "./src/app/role/chef/chef-order-list/chef-order-list.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/role/chef/chef-order-list/chef-order-list.component.ts ***!
  \************************************************************************/
/*! exports provided: ChefOrderListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChefOrderListComponent", function() { return ChefOrderListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chef_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../chef.service */ "./src/app/role/chef/chef.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _stat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../stat.service */ "./src/app/role/chef/stat.service.ts");
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






var ChefOrderListComponent = /** @class */ (function () {
    function ChefOrderListComponent(chefService, route, statService) {
        this.chefService = chefService;
        this.route = route;
        this.statService = statService;
        this._orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"];
        this.orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.orders$ = this.orders.asObservable();
        this.filter = false;
    }
    ChefOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._routes = this.route.params
            .subscribe(function (params) {
            _this.filter = params.filter;
            _this._orders.unsubscribe();
            _this._orders = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.chefService.getOrders(_this.filter); })).subscribe(function (result) { return _this.orders.next(result); });
        });
    };
    ChefOrderListComponent.prototype.changeState = function (id, state, index) {
        var _this = this;
        switch (state) {
            case 'progress':
                this.statService.changeCounter('newOrders', 'decrement');
                this.statService.changeCounter('progressOrders');
                this.chefService.progressOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'progress';
                });
                break;
            case 'ready':
                this.statService.changeCounter('progressOrders', 'decrement');
                this.statService.changeCounter('readyOrders');
                this.chefService.readyOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'ready';
                });
                break;
            default:
                break;
        }
        return true;
    };
    ChefOrderListComponent.prototype.ngOnDestroy = function () {
        this._orders.unsubscribe();
        this._routes.unsubscribe();
    };
    ChefOrderListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chef-order-list',
            template: __webpack_require__(/*! ./chef-order-list.component.html */ "./src/app/role/chef/chef-order-list/chef-order-list.component.html"),
            styles: [__webpack_require__(/*! ./chef-order-list.component.css */ "./src/app/role/chef/chef-order-list/chef-order-list.component.css")]
        }),
        __metadata("design:paramtypes", [_chef_service__WEBPACK_IMPORTED_MODULE_1__["ChefService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _stat_service__WEBPACK_IMPORTED_MODULE_3__["ChefStatService"]])
    ], ChefOrderListComponent);
    return ChefOrderListComponent;
}());



/***/ }),

/***/ "./src/app/role/chef/chef-routing.module.ts":
/*!**************************************************!*\
  !*** ./src/app/role/chef/chef-routing.module.ts ***!
  \**************************************************/
/*! exports provided: ChefRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChefRoutingModule", function() { return ChefRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared/stub/stub.component */ "./src/app/shared/stub/stub.component.ts");
/* harmony import */ var _shared_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.component */ "./src/app/shared/dashboard/dashboard.component.ts");
/* harmony import */ var _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../shared/not-found/not-found.component */ "./src/app/shared/not-found/not-found.component.ts");
/* harmony import */ var _chef_order_list_chef_order_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chef-order-list/chef-order-list.component */ "./src/app/role/chef/chef-order-list/chef-order-list.component.ts");
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
                    { path: 'order', component: _chef_order_list_chef_order_list_component__WEBPACK_IMPORTED_MODULE_5__["ChefOrderListComponent"] },
                    { path: 'order/:filter/show', component: _chef_order_list_chef_order_list_component__WEBPACK_IMPORTED_MODULE_5__["ChefOrderListComponent"] },
                ]
            },
            { path: '404', component: _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__["NotFoundComponent"] },
            { path: '**', redirectTo: '/chef/404' }
        ]
    }
];
var ChefRoutingModule = /** @class */ (function () {
    function ChefRoutingModule() {
    }
    ChefRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ChefRoutingModule);
    return ChefRoutingModule;
}());



/***/ }),

/***/ "./src/app/role/chef/chef.module.ts":
/*!******************************************!*\
  !*** ./src/app/role/chef/chef.module.ts ***!
  \******************************************/
/*! exports provided: ChefModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChefModule", function() { return ChefModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _chef_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chef-routing.module */ "./src/app/role/chef/chef-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../shared/stub/stub.shared.module */ "./src/app/shared/stub/stub.shared.module.ts");
/* harmony import */ var _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.shared.module */ "./src/app/shared/dashboard/dashboard.shared.module.ts");
/* harmony import */ var _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../shared/not-found/not-found.shared.module */ "./src/app/shared/not-found/not-found.shared.module.ts");
/* harmony import */ var _chef_order_list_chef_order_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chef-order-list/chef-order-list.component */ "./src/app/role/chef/chef-order-list/chef-order-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var ChefModule = /** @class */ (function () {
    function ChefModule() {
    }
    ChefModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _chef_routing_module__WEBPACK_IMPORTED_MODULE_3__["ChefRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_7__["DashboardSharedModule"],
                _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_6__["StubSharedModule"],
                _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_8__["NotFoundSharedModule"]
            ],
            declarations: [
                _chef_order_list_chef_order_list_component__WEBPACK_IMPORTED_MODULE_9__["ChefOrderListComponent"],
            ],
            entryComponents: [],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_SNACK_BAR_DEFAULT_OPTIONS"], useValue: { duration: 100000 } }
            ],
        })
    ], ChefModule);
    return ChefModule;
}());



/***/ }),

/***/ "./src/app/role/chef/chef.service.ts":
/*!*******************************************!*\
  !*** ./src/app/role/chef/chef.service.ts ***!
  \*******************************************/
/*! exports provided: ChefService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChefService", function() { return ChefService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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




var ChefService = /** @class */ (function () {
    function ChefService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
    }
    ChefService.prototype.progressOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/progressOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'progress';
        }));
    };
    ChefService.prototype.readyOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/readyOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'ready';
        }));
    };
    ChefService.prototype.getOrders = function (filter) {
        if (filter === void 0) { filter = false; }
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/listOrdersChef', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('filter', filter.toString())
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return (data);
        }));
    };
    ChefService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ChefService);
    return ChefService;
}());



/***/ })

}]);
//# sourceMappingURL=role-chef-chef-module.js.map