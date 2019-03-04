(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["role-admin-admin-module"],{

/***/ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-edit/admin-item-edit.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mcard{\n    min-height: 87vh;\n    background-color: white;\n    margin-left: 5px;\n    margin-right: 5px;\n    margin-top: 5px;\n}\n\n.card {\n    margin-bottom: 1%;\n  }"

/***/ }),

/***/ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-edit/admin-item-edit.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"mcard\">\n    <mat-card-header *ngIf=\"item$ | async as item\">\n    <div mat-card-avatar [ngStyle]=\"{'background-image': 'url(/backend/api/storages/images/download/' + item.image + ')'}\" style=\"background-size: cover;\"></div>\n    <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\">\n      <div fxFlex=\"75\">\n          <mat-card-title *ngIf=\"itemForm && item\">{{item.name}}</mat-card-title>\n          <mat-card-subtitle  *ngIf=\"itemForm && item\">{{item.type}}</mat-card-subtitle>\n      </div>\n      <div fxFlex>\n          <button mat-button (click)=\"imgFileInput.click()\">Add a photo</button>\n          <input hidden #imgFileInput type=\"file\" (change)=\"uploadImage($event)\">\n      </div>\n    </div>\n    </mat-card-header>\n    \n    <form fxLayout=\"column\" *ngIf=\"item$ | async as item\" [formGroup]=\"itemForm\" (ngSubmit)=\"onUpdate()\">\n      <ng-template *ngIf=\"!editMode\">\n        <input matInput formControlName=\"id\" [(value)]=\"item.id\">\n      </ng-template>\n      <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n        <input hidden formControlName=\"image\" [(value)]=\"item.image\">\n        \n        <mat-form-field fxFlex=\"32\">\n          <input matInput placeholder=\"Name\" [(value)]=\"item.name\" formControlName=\"name\">\n          <mat-error *ngIf=\"itemForm.controls['name'].hasError('required')\">\n            Name is\n            <strong>required</strong>\n          </mat-error>\n        </mat-form-field>\n        <mat-form-field fxFlex=\"32\">\n            <mat-select placeholder=\"Menu Item\" name=\"menuItem\" value=\"{{item.menuItem}}\" formControlName=\"menuItem\">\n              <mat-option value=\"true\">Yes</mat-option>\n              <mat-option value=\"false\">No</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field  fxFlex=\"32\">\n          <mat-select placeholder=\"Executor\" name=\"executor\" [(value)]=\"item.executor\" formControlName=\"executor\">\n            <mat-option value=\"chef\">Chef</mat-option>\n            <mat-option value=\"barman\">Barman</mat-option>\n          </mat-select>\n      </mat-form-field>\n      </div>\n      <div  fxLayout=\"row\"  fxFill  fxLayoutAlign=\"space-between center\">\n        <mat-form-field fxFlex=\"32\">\n            <mat-select placeholder=\"Category\" name=\"categoryId\" [(value)]=\"item.categoryId\" formControlName=\"categoryId\">\n              <mat-option *ngFor=\"let category of categories$ | async as categories\"  [value]=\"category.id\">\n                {{category.name}}\n              </mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field fxFlex=\"32\">\n            <mat-select placeholder=\"Type\" name=\"type\" [(value)]=\"item.type\" formControlName=\"type\" (selectionChange)=\"typeChanged(e)\">\n              <mat-option value=\"ingredient\">Ingredient</mat-option>\n              <mat-option value=\"recipe\">Recipe</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field fxFlex=\"32\">\n            <mat-select placeholder=\"Tare\" name=\"tare\" [(value)]=\"item.tare\" formControlName=\"tare\">\n              <mat-option>None</mat-option>\n              <mat-option value=\"pack\">Pack</mat-option>\n              <mat-option value=\"bottle\">Bottle</mat-option>\n            </mat-select>\n        </mat-form-field>\n      </div>\n      <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\"  >\n        <mat-form-field  *ngIf=\"isRecipe\" fxFlex=\"24\">\n            <input matInput placeholder=\"Weight\" [(value)]=\"item.weight\" formControlName=\"weight\">\n            <mat-error *ngIf=\"itemForm.controls['weight'].hasError('required')\">\n                Weight is\n              <strong>required</strong>\n            </mat-error>\n        </mat-form-field>\n        <mat-form-field  *ngIf=\"!isRecipe\" fxFlex=\"24\">\n          <input matInput placeholder=\"Quantity\" [(value)]=\"item.quantity\" formControlName=\"quantity\">\n          <mat-error *ngIf=\"itemForm.controls['quantity'].hasError('required')\">\n              Quantity is\n            <strong>required</strong>\n          </mat-error>\n      </mat-form-field>\n      <mat-form-field fxFlex=\"8\">\n          <mat-select placeholder=\"Unit\" name=\"unit\" [(value)]=\"item.unit\" formControlName=\"unit\">\n            <mat-option value=\"g\">g</mat-option>\n            <mat-option value=\"ml\">ml</mat-option>\n            <mat-option value=\"pieces\">pieces</mat-option>\n          </mat-select>\n      </mat-form-field>\n        <mat-form-field fxFlex=\"24\">\n          <input matInput placeholder=\"Average cost\" [(value)]=\"item.averageCost\" formControlName=\"averageCost\">\n          <span matSuffix>&#x24;</span>\n          <mat-error *ngIf=\"itemForm.controls['averageCost'].hasError('required')\">\n              Average cost is\n            <strong>required</strong>\n          </mat-error>\n        </mat-form-field>\n        <mat-form-field  fxFlex=\"24\">\n            <input matInput placeholder=\"Selling price\" [(value)]=\"item.sellingPrice\" formControlName=\"sellingPrice\">\n            <span matSuffix>&#x24;</span> \n            <mat-error *ngIf=\"itemForm.controls['sellingPrice'].hasError('required')\">\n                Selling price is\n              <strong>required</strong>\n            </mat-error>\n        </mat-form-field>\n      </div>\n      <div style=\"position: fixed; bottom: 10px; right: 10px;\">\n        <button  mat-fab color=\"primary\" type=\"submit\"><mat-icon aria-label=\"Save\">save</mat-icon></button>\n      </div>\n    </form>\n\n    <div *ngIf=\"isRecipe && editMode\">\n      <div  fxLayout=\"row\" fxFill >\n        <div fxFlex=\"98\"><h5>Ingredients</h5></div>\n      </div>\n      <form [formGroup]=\"ingredientsForm\">\n          <div  formArrayName=\"ingredients\" fxLayout=\"row wrap\" fxLayout.sm=\"column\" fxLayoutGap=\"1%\" fxLayoutWrap fxLayoutAlign=\"start center\" fxLayoutAlign.sm=\"center\"   >\n              <mat-card class=\"card\" fxFlex=\"49%\" fxFlex.xs=\"100\"  \n              *ngFor=\"let ingredient of ingredients$ | async as ingredients; let i = index\"\n              [formGroupName]=\"i\">\n                  <mat-card-header fxLayout=\"row\">\n                      <div  fxLayout=\"row\" fxFlex=\"70\">\n                          <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+ingredient.ingredient.image+')'}\" style=\"background-size: cover;\"></div>\n                          <div fxLayout=\"column\"> \n                              <mat-card-title>{{ingredient.ingredient.name}} </mat-card-title>\n                              <mat-card-subtitle>{{ingredient.ingredient.type}}</mat-card-subtitle>\n                          </div>\n                      </div>\n                  </mat-card-header>\n                  <mat-card-actions fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                      <div fxFlex=\"70\">\n          \n                      </div>\n\n                          <mat-form-field fxFlex>\n                              <input matInput [(value)]=\"ingredient.recipeQuantity\" formControlName=\"recipeQuantity\" (focusout)=\"onUpdateIngredient(ingredientsForm.get('ingredients').controls[i].value, i)\">\n                              <span matSuffix>{{ingredient.ingredient.unit}}</span>\n                            </mat-form-field>\n\n                  </mat-card-actions>\n              </mat-card>\n          </div>\n    </form>\n    </div>\n  </mat-card>\n\n"

/***/ }),

/***/ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-edit/admin-item-edit.component.ts ***!
  \*************************************************************************/
/*! exports provided: AdminItemEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminItemEditComponent", function() { return AdminItemEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../shared/dashboard/search.service */ "./src/app/shared/dashboard/search.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AdminItemEditComponent = /** @class */ (function () {
    function AdminItemEditComponent(route, adminService, router, searchService) {
        this.route = route;
        this.adminService = adminService;
        this.router = router;
        this.searchService = searchService;
        this.editMode = false;
        this.item = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({
            name: '',
            type: '',
            categoryId: null,
            tare: '',
            quantity: 0,
            weight: 0,
            unit: '',
            image: 'no-image.png',
            menuItem: '',
            averageCost: 0,
            sellingPrice: 0,
            creatorId: '',
            id: '',
            executor: null,
            autoSellingPrice: false,
            description: '',
        });
        this.item$ = this.item.asObservable();
        this.ingredients = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]([]);
        this.ingredients$ = this.ingredients.asObservable();
        this.categories = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.categories$ = this.categories.asObservable();
    }
    AdminItemEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params.id;
            _this.editMode = params.id != null;
            _this._categories = _this.adminService.getCategories().subscribe(function (categories) {
                _this.categories.next(categories);
            });
            if (_this.editMode === true) {
                _this.adminService.getItem(_this.id).subscribe(function (item) {
                    _this.item.next(item);
                });
            }
        });
        this._item = this.item.subscribe(function (data) {
            _this.isRecipe = _this.item.value.type === 'recipe';
            if (_this.isRecipe) {
                _this.searchService.confirmSearchPossibility(true);
                _this.adminService.search(_this.id).subscribe(function (ingredients) {
                    _this.ingredients.next(ingredients);
                });
                _this.searchService.searchRequest$.subscribe(function (fullText) {
                    _this.fullText = fullText;
                    _this.adminService.search(_this.id, _this.fullText).subscribe(function (ingredients) {
                        _this.ingredients.next(ingredients);
                    });
                });
            }
            else {
                _this.searchService.confirmSearchPossibility(false);
            }
            _this.initForm();
        });
        this._ingredients = this.ingredients.subscribe(function (data) {
            _this.initIngredientsForm();
        });
    };
    AdminItemEditComponent.prototype.initForm = function () {
        this.itemForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.name, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'executor': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.executor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'type': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.item.value.type, disabled: this.editMode }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'categoryId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.categoryId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'tare': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.tare),
            'unit': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.unit, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'menuItem': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.menuItem, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'averageCost': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.item.value.averageCost, disabled: true }),
            'sellingPrice': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.sellingPrice),
            'image': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.item.value.image, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
        if (this.editMode) {
            this.itemForm.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.item.value.id, disabled: true }));
        }
        if (this.isRecipe) {
            this.itemForm.addControl('weight', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.item.value.weight, disabled: true }));
        }
        else {
            this.itemForm.addControl('quantity', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.item.value.quantity, disabled: true }));
        }
    };
    AdminItemEditComponent.prototype.initIngredientsForm = function () {
        var _this = this;
        this.ingredientsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.ingredientsArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"]([]);
        this.ingredients.value.forEach(function (ingredient) {
            _this.ingredientsArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](ingredient.id),
                'ingredientId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](ingredient.ingredientId),
                'recipeId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](ingredient.recipeId),
                'recipeQuantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](ingredient.recipeQuantity),
            }));
        });
        this.ingredientsForm.addControl('ingredients', this.ingredientsArray);
    };
    AdminItemEditComponent.prototype.onUpdate = function () {
        var _this = this;
        if (this.itemForm.valid) {
            this.adminService.updateItem(this.itemForm.getRawValue()).subscribe(function (result) {
                _this.router.navigate(['/admin/item/' + result.id + '/edit']);
            }, function (error) { return console.log(error); });
        }
    };
    AdminItemEditComponent.prototype.typeChanged = function (e) {
        if (this.itemForm.value.type === 'recipe') {
            this.item.value.type = 'recipe';
            // this.isRecipe = true;
        }
        else {
            this.item.value.type = 'ingredient';
            // this.isRecipe = false;
        }
    };
    AdminItemEditComponent.prototype.onUpdateIngredient = function (ingredient, index) {
        var _this = this;
        this.adminService.updateIngredient(ingredient).subscribe(function (result) {
            _this.itemForm.controls['weight'].patchValue(result.quantitySummary);
            _this.itemForm.controls['averageCost'].patchValue(result.averageCost);
            _this.itemForm.controls['sellingPrice'].patchValue(result.sellingSummary);
            console.log(result.quantitySummary);
        }, function (error) { return console.log(error); });
    };
    AdminItemEditComponent.prototype.uploadImage = function (event) {
        var _this = this;
        var formData = new FormData();
        formData.append('degree_attachment', event.target.files[0], event.target.files[0].name);
        this.adminService.uploadFile(formData).subscribe(function (result) {
            _this.itemForm.controls['image'].patchValue(event.target.files[0].name);
            _this.item.value.image = event.target.files[0].name;
        }, function (error) { return console.log(error); });
    };
    AdminItemEditComponent.prototype.ngOnDestroy = function () {
        this.searchService.confirmSearchPossibility(false);
        if (this.editMode === true) {
            this._item.unsubscribe();
        }
        if (this.isRecipe) {
            this._ingredients.unsubscribe();
        }
        this._categories.unsubscribe();
    };
    AdminItemEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-item-edit',
            template: __webpack_require__(/*! ./admin-item-edit.component.html */ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.html"),
            styles: [__webpack_require__(/*! ./admin-item-edit.component.css */ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_5__["SearchService"]])
    ], AdminItemEditComponent);
    return AdminItemEditComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-item-list/admin-item-list.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-list/admin-item-list.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n    margin-bottom: 1%;\n  }\n  \n  .card-image {\n    max-width: 400px;\n    max-height: 300px;\n  }\n  \n  .mat-card:not([class*=mat-elevation-z]) {\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n  \n  ::ng-deep .mat-card-header-text {\n  margin: 0;\n}\n  \n  .mcard{\n  min-height: 87vh;\n  margin-left: 5px;\n  margin-top: 5px;\n}"

/***/ }),

/***/ "./src/app/role/admin/admin-item-list/admin-item-list.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-list/admin-item-list.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard\"  fxLayout=\"row wrap\" fxLayout.sm=\"column\" fxLayoutGap=\"1%\" fxLayoutWrap fxLayoutAlign=\"space-between center\" fxLayoutAlign.sm=\"center\"   >\n    <mat-card *ngFor=\"let item of items$ | async\" class=\"card\" fxFlex=\"49\" fxFlex.xs=\"100\">\n        <mat-card-header fxLayout=\"row\">\n            <div  fxLayout=\"row\" fxFlex=\"70\">\n                <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+item.image+')'}\" style=\"background-size: cover;\"></div>\n                <div fxLayout=\"column\"> \n                    <mat-card-title>{{item.name}} </mat-card-title>\n                    <mat-card-subtitle>{{item.type}}</mat-card-subtitle>\n                </div>\n            </div>\n            <div fxLayout=\"column\" fxFlex fxLayoutAlign.sm=\"end center\">\n                <mat-card-subtitle>{{item.quantity}} {{item.unit}}</mat-card-subtitle>\n            </div>\n        </mat-card-header>\n        <mat-card-actions fxLayout=\"row\">\n            <div fxFlex=\"70\">\n                <mat-icon style=\"margin-left: 10px;\" *ngIf=\"item.menuItem\" aria-label=\"Menu item\">restaurant_menu</mat-icon>\n            </div>\n            <div fxFlex>\n                <button routerLink=\"/admin/item/{{item.id}}/edit\" mat-button>EDIT</button>\n            </div>\n        </mat-card-actions>\n    </mat-card>\n</div>\n\n<div style=\"position: fixed; bottom: 10px; right: 10px;\">\n    <a  routerLink=\"/admin/item/new\" mat-fab color=\"primary\"><mat-icon aria-label=\"Add\">add</mat-icon></a>  \n</div>"

/***/ }),

/***/ "./src/app/role/admin/admin-item-list/admin-item-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/role/admin/admin-item-list/admin-item-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: AdminItemListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminItemListComponent", function() { return AdminItemListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../shared/dashboard/search.service */ "./src/app/shared/dashboard/search.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminItemListComponent = /** @class */ (function () {
    function AdminItemListComponent(adminService, route, searchService) {
        this.adminService = adminService;
        this.route = route;
        this.searchService = searchService;
        this.items$ = null;
        this.filter = false;
    }
    AdminItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._routes = this.route.params
            .subscribe(function (params) {
            _this.filter = params.filter;
            _this.searchService.confirmSearchPossibility(true);
            _this.searchService.searchRequest$.subscribe(function (fullText) {
                _this.adminService.getItems(_this.filter, fullText);
            });
            _this.items$ = _this.adminService.items$;
            _this.adminService.getItems(_this.filter);
        });
    };
    AdminItemListComponent.prototype.ngOnDestroy = function () {
        this._routes.unsubscribe();
        this.searchService.confirmSearchPossibility(false);
    };
    AdminItemListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-item-list',
            template: __webpack_require__(/*! ./admin-item-list.component.html */ "./src/app/role/admin/admin-item-list/admin-item-list.component.html"),
            styles: [__webpack_require__(/*! ./admin-item-list.component.css */ "./src/app/role/admin/admin-item-list/admin-item-list.component.css")]
        }),
        __metadata("design:paramtypes", [_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_3__["SearchService"]])
    ], AdminItemListComponent);
    return AdminItemListComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-order-list/admin-order-list.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/role/admin/admin-order-list/admin-order-list.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-card:not([class*=mat-elevation-z]) {\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n::ng-deep .mat-card-header-text {\n  margin: 0;\n}\n\n.mcard{\n  margin-left: 5px;\n  margin-top: 5px;\n}\n\n.card {\n    margin-bottom: 1%;\n  }"

/***/ }),

/***/ "./src/app/role/admin/admin-order-list/admin-order-list.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/role/admin/admin-order-list/admin-order-list.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard\" fxLayout=\"row wrap\" fxLayout.sm=\"column\" fxLayoutGap=\"1%\" fxLayoutWrap fxLayoutAlign=\"space-between center\" fxLayoutAlign.sm=\"center\"   >\n  <mat-card *ngFor=\"let order of orders$ | async; let i = index\" class=\"card\" fxFlex=\"49%\" fxFlex.xs=\"100\">\n      <mat-card-header fxLayout=\"row\">\n          <div  fxLayout=\"row\" fxFlex=\"70\">\n              <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+order.item.image+')'}\" style=\"background-size: cover;\"></div>\n              <div fxLayout=\"column\"> \n                  <mat-card-title>{{order.item.name}} <mat-icon *ngIf=\"order.menuItem\" aria-label=\"Menu order\">restaurant_menu</mat-icon></mat-card-title>\n                  <mat-card-subtitle>{{order.quantity}} x {{order.sellingPrice | currency}}</mat-card-subtitle>\n              </div>\n          </div>\n          <div fxLayout=\"column\" fxFlex fxLayoutAlign.sm=\"end center\">\n            <div [ngSwitch]=\"order.state\">\n              <ng-container *ngSwitchCase= \"'new'\">   \n                <button mat-icon-button  color=\"primary\">\n                  <mat-icon aria-label=\"Example icon-button with a heart icon\">fiber_new</mat-icon>\n                </button> \n              </ng-container>\n              <ng-container *ngSwitchCase= \"'progress'\">\n                <button mat-icon-button color=\"primary\">\n                  <mat-icon aria-label=\"Example icon-button with a heart icon\">update</mat-icon>\n                </button> \n              </ng-container>\n              <ng-container *ngSwitchCase= \"'ready'\">\n                <button mat-icon-button color=\"primary\">\n                  <mat-icon aria-label=\"Example icon-button with a heart icon\">thumb_up_alt</mat-icon>\n                </button>                 \n              </ng-container>\n              <ng-container *ngSwitchCase= \"'served'\">                \n                <button mat-icon-button color=\"primary\">\n                  <mat-icon aria-label=\"Example icon-button with a heart icon\">restaurant_menu</mat-icon>\n                </button>    \n              </ng-container>\n            </div> \n          </div>\n      </mat-card-header>\n      <mat-card-actions fxLayout=\"row\">\n          <div fxFlex=\"70\">\n\n          </div>\n          <div [ngSwitch]=\"order.state\">\n              <ng-container *ngSwitchCase= \"'new'\">   \n                  <div fxFlex>\n                      <button  mat-button (click)=\"changeState(order.id,'progress', i);\">PROGRESS</button>\n                  </div>\n              </ng-container>\n              <ng-container *ngSwitchCase= \"'progress'\" >\n                  <div fxFlex>\n                      <button  mat-button (click)=\"changeState(order.id,'ready', i);\">READY</button>\n                  </div>\n              </ng-container>\n              <ng-container *ngSwitchCase= \"'ready'\">\n                  <div fxFlex>\n                      <button mat-button (click)=\"changeState(order.id,'served', i);\">SERVE</button>\n                  </div>             \n              </ng-container>\n              <ng-container *ngSwitchCase= \"'served'\">                \n                  <div fxFlex>\n                      <button routerLink=\"/admin/sale/{{order.salesInvoiceId}}/edit\" mat-button>INVOICE</button>\n                  </div> \n              </ng-container>\n            </div> \n\n      </mat-card-actions>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/role/admin/admin-order-list/admin-order-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/role/admin/admin-order-list/admin-order-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: AdminOrderListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminOrderListComponent", function() { return AdminOrderListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _stat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../stat.service */ "./src/app/role/admin/stat.service.ts");
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






var AdminOrderListComponent = /** @class */ (function () {
    function AdminOrderListComponent(adminService, route, statService) {
        this.adminService = adminService;
        this.route = route;
        this.statService = statService;
        this._orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"];
        this.orders = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.orders$ = this.orders.asObservable();
        this.filter = false;
    }
    AdminOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._routes = this.route.params
            .subscribe(function (params) {
            _this.filter = params.filter;
            _this._orders.unsubscribe();
            _this._orders = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(0, 1000 * 30).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.adminService.getOrders(_this.filter); })).subscribe(function (result) { return _this.orders.next(result); });
        });
    };
    AdminOrderListComponent.prototype.changeState = function (id, state, index) {
        var _this = this;
        switch (state) {
            case 'progress':
                this.statService.changeCounter('newOrders', 'decrement');
                this.statService.changeCounter('progressOrders');
                this.adminService.progressOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'progress';
                });
                break;
            case 'ready':
                this.statService.changeCounter('progressOrders', 'decrement');
                this.statService.changeCounter('readyOrders');
                this.adminService.readyOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'ready';
                });
                break;
            case 'served':
                this.statService.changeCounter('readyOrders', 'decrement');
                this.adminService.serveOrder(id, index).subscribe(function () {
                    _this.orders.value[index].state = 'served';
                });
                break;
            default:
                break;
        }
        return true;
    };
    AdminOrderListComponent.prototype.ngOnDestroy = function () {
        this._orders.unsubscribe();
        this._routes.unsubscribe();
    };
    AdminOrderListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-order-list',
            template: __webpack_require__(/*! ./admin-order-list.component.html */ "./src/app/role/admin/admin-order-list/admin-order-list.component.html"),
            styles: [__webpack_require__(/*! ./admin-order-list.component.css */ "./src/app/role/admin/admin-order-list/admin-order-list.component.css")]
        }),
        __metadata("design:paramtypes", [_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _stat_service__WEBPACK_IMPORTED_MODULE_3__["AdminStatService"]])
    ], AdminOrderListComponent);
    return AdminOrderListComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mcard_white{\n    background-color: white;\n    padding: 5px;\n    margin-left: 5px;\n    margin-right: 6px;\n    margin-top: 5px;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.mcard{\n    margin-left: 5px;\n    margin-top: 5px;\n    margin-right: 5px;\n}\n\n.mat-card:not([class*=mat-elevation-z]) {\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.card {\n    margin-bottom: 1%;\n  }\n\n.mat-fab-div{\n    margin-bottom: 5px; \n}\n\n.buttons-container {\n    position: fixed; bottom: 10px; right: 10px;\n}\n\n.buttons {\n    margin-left: 9px;\n}"

/***/ }),

/***/ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard_white\" fxLayout=\"column\" >\n  <h3 *ngIf=\"purchaseInvoiceForm && PurchaseInvoice\">Purchase invoice </h3>\n\n    <div *ngIf=\"PurchaseInvoice$ | async as PurchaseInvoice\">\n      <p>Supplier: {{PurchaseInvoice.supplierId}}</p>\n      <p>Date: {{PurchaseInvoice.date | date: 'fullDate'}}</p>\n      <p>Profiled: {{PurchaseInvoice.profiled}}</p>\n      <p>Total: {{total| currency}}</p>\n  </div>\n\n\n  <form fxLayout=\"column\" fxHide *ngIf=\"SaleInvoice$ | async\" [formGroup]=\"purchaseInvoiceForm\" (ngSubmit)=\"onUpdate()\">\n    <ng-template *ngIf=\"!editMode\">\n      <input matInput formControlName=\"id\">\n    </ng-template>\n    <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Supplier\" formControlName=\"supplierId\">\n        <mat-error *ngIf=\"purchaseInvoiceForm.controls['supplierId'].hasError('required')\">\n          Supplier is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Total\" formControlName=\"total\">\n        <mat-error *ngIf=\"purchaseInvoiceForm.controls['total'].hasError('required')\">\n          Total is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"date\"  placeholder=\"Date\" formControlName=\"date\">\n        <mat-datepicker-toggle matSuffix [for]=\"date\">\n          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n        </mat-datepicker-toggle>\n        <mat-datepicker #date></mat-datepicker>\n        <mat-error *ngIf=\"purchaseInvoiceForm.controls['date'].hasError('required')\">\n          Date is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n\n    </div>\n  </form>\n\n\n  <div class=\"buttons-container\" fxLayout=\"column\">\n      <div  class=\"buttons\" *ngIf=\"show\" fxLayout=\"column\" >\n          <div class=\"mat-fab-div\"  (click)=\" show = !show; onUpdate() \" fxFlex=\"32\">\n              <button form=\"ngForm\" color=\"primary\" mat-mini-fab aria-label=\"Save\">\n                <mat-icon>save</mat-icon>\n              </button>\n          </div>\n          <div class=\"mat-fab-div\" (click)=\" show = !show; onProfile() \" fxFlex=\"32\">\n              <button mat-mini-fab  aria-label=\"Profile\">\n                <mat-icon>archive</mat-icon>\n              </button>\n            </div>\n        </div>\n      <button mat-fab color=\"primary\" [disabled]=\"profiled\" (click)=\" show = !show \"><mat-icon aria-label=\"Options\">more_vert</mat-icon></button>\n    </div>\n</div>\n<div *ngIf=\"editMode\">\n  <div class=\"mcard\">\n    <form *ngIf=\"items$ | async as items\" [formGroup]=\"itemsForm\">\n        <div  formArrayName=\"items\"   fxLayout=\"row wrap\" fxLayout.lt-md=\"column\" fxLayoutGap=\".1%\" fxLayoutGap.lt-md=\".9%\" fxLayoutWrap fxLayoutAlign=\"space-around center\"   >\n          <mat-card class=\"card\" style=\"margin-bottom: 1em;\" fxFill fxFlex=\"49%\" fxFlex.lt-md=\"99.5%\" \n          *ngFor=\"let itemCtrl of itemsForm.get('items').controls; let i = index\"\n          [formGroupName]=\"i\">\n              <mat-card-header fxLayout=\"row\">\n                  <div  fxLayout=\"row\" fxFlex=\"70\">\n                      <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+items[i].item.image+')'}\" style=\"background-size: cover;\"></div>\n                      <div fxLayout=\"column\"> \n                          <mat-card-title>{{items[i].item.name}} </mat-card-title>\n                      </div>\n                      \n                  </div>\n                  \n              </mat-card-header>\n              <mat-card-footer>\n                  <div  style=\"padding: 5px;\" fxLayout=\"column\" fxFlex=\"98\"  fxLayoutAlign=\"space-between center\" >\n                  <input hidden matInput formControlName=\"total\">\n                  <input hidden matInput formControlName=\"id\">\n                  <input hidden matInput formControlName=\"itemId\">\n                  <input hidden matInput formControlName=\"purchaseInvoiceId\">\n                  <mat-form-field fxFlex=\"98\">\n                    <input matInput placeholder=\"Quantity\" formControlName=\"quantity\" (focusout)=\"onUpdateItem(itemCtrl.getRawValue(), i)\" (keyup)=\"onCountTotal(itemCtrl.getRawValue(), i)\">\n                    <span matSuffix>{{items[i].item.unit}}</span>\n                  </mat-form-field >\n                  <mat-form-field fxFlex=\"98\">\n                    <input matInput placeholder=\"Price\" formControlName=\"purchasePrice\" (focusout)=\"onUpdateItem(itemCtrl.getRawValue(), i)\" (keyup)=\"onCountTotal(itemCtrl.getRawValue(), i)\">\n                    <span matSuffix>&#x24;</span>\n                  </mat-form-field>\n                  <mat-form-field fxFlex=\"98\">\n                      <input matInput placeholder=\"Total\" formControlName=\"total\">\n                      <span matSuffix>&#x24;</span>\n                    </mat-form-field>\n                  </div>\n              </mat-card-footer>\n          </mat-card>\n        </div>\n    </form>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AdminPurchaseEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPurchaseEditComponent", function() { return AdminPurchaseEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../shared/dashboard/search.service */ "./src/app/shared/dashboard/search.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AdminPurchaseEditComponent = /** @class */ (function () {
    function AdminPurchaseEditComponent(route, adminService, router, dialog, searchService) {
        this.route = route;
        this.adminService = adminService;
        this.router = router;
        this.dialog = dialog;
        this.searchService = searchService;
        this.editMode = false;
        this.PurchaseInvoice = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({
            id: null,
            supplierId: 'Tube',
            date: new Date(),
            profiled: false,
            total: 0
        });
        this.PurchaseInvoice$ = this.PurchaseInvoice.asObservable();
        this.items = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]([]);
        this.items$ = this.items.asObservable();
        this.profiled = false;
    }
    AdminPurchaseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params.id;
            _this.editMode = params.id != null;
            if (_this.editMode === true) {
                _this.adminService.getPurchaseInvoice(_this.id).subscribe(function (purchaseInvoice) {
                    _this.PurchaseInvoice.next(purchaseInvoice);
                });
                _this.adminService.searchItemsPurchaseInvoice(_this.id).subscribe(function (items) {
                    _this.items.next(items);
                });
            }
            else {
                _this.adminService.updatePurchaseInvoice({ supplierId: 'Tube', date: new Date(), total: 0 }).subscribe(function (result) {
                    console.log(result);
                    if (!_this.editMode) {
                        _this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
                    }
                }, function (error) { return console.log(error); });
            }
        });
        this._items = this.items.subscribe(function () {
            _this.initItemsForm();
        });
        this._PurchaseInvoice = this.PurchaseInvoice.subscribe(function (data) {
            _this.total = _this.PurchaseInvoice.value.total;
            _this.profiled = _this.PurchaseInvoice.value.profiled;
            if (!_this.profiled) {
                _this.searchService.confirmSearchPossibility(true);
                _this.searchService.searchRequest$.subscribe(function (fullText) {
                    _this.fullText = fullText;
                    _this.adminService.searchItemsPurchaseInvoice(_this.id, _this.fullText).subscribe(function (items) {
                        _this.items.next(items);
                    });
                });
            }
            _this.initForm();
        });
    };
    AdminPurchaseEditComponent.prototype.initForm = function () {
        this.purchaseInvoiceForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'supplierId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.PurchaseInvoice.value.supplierId, disabled: this.profiled }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.PurchaseInvoice.value.id, disabled: this.profiled }),
            'date': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.PurchaseInvoice.value.date, disabled: this.profiled }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'total': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.PurchaseInvoice.value.total, disabled: true }),
        });
        this.initItemsForm();
    };
    AdminPurchaseEditComponent.prototype.initItemsForm = function () {
        var _this = this;
        this.itemsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.itemsArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"]([]);
        this.items.value.forEach(function (item) {
            _this.itemsArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                'itemId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.itemId, disabled: _this.profiled }),
                'purchaseInvoiceId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.purchaseInvoiceId, disabled: _this.profiled }),
                'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.quantity, disabled: _this.profiled }),
                'purchasePrice': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.purchasePrice, disabled: _this.profiled }),
                'total': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.total, disabled: true }),
                'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: item.id, disabled: _this.profiled }),
            }));
        });
        this.itemsForm.addControl('items', this.itemsArray);
    };
    AdminPurchaseEditComponent.prototype.onUpdate = function () {
        // if (this.purchaseInvoiceForm.invalid) {
        //   this.purchaseInvoiceForm.get('supplierId').markAsTouched();
        //   this.purchaseInvoiceForm.get('date').markAsTouched();
        //   return;
        // } else {
        //   this.adminService.updatePurchaseInvoice(this.purchaseInvoiceForm.getRawValue()).subscribe(
        //     (result: any) => {
        //       console.log(result);
        //       if (!this.editMode) {
        //         this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
        //       }
        //     },
        //     error => console.log(error)
        //   );
        // }
    };
    AdminPurchaseEditComponent.prototype.onProfile = function () {
        var _this = this;
        this.adminService.profilePurchaseInvoice(this.purchaseInvoiceForm.getRawValue()).subscribe(function (result) {
            _this.adminService.searchItemsPurchaseInvoice(_this.id, '').subscribe(function (items) {
                if (!_this.editMode) {
                    _this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
                }
                _this.PurchaseInvoice.value.profiled = true;
                _this.items.next(items);
            });
        }, function (error) { return console.log(error); });
    };
    AdminPurchaseEditComponent.prototype.onUpdateItem = function (item, index) {
        var _this = this;
        this.adminService.updatePurchaseInvoiceItem(item).subscribe(function (result) {
            _this.total = Number(result);
            _this.PurchaseInvoice.value.total = Number(result);
        }, function (error) { return console.log(error); });
    };
    AdminPurchaseEditComponent.prototype.onCountTotal = function (item, index) {
        var total = item.purchasePrice * item.quantity;
        this.items.value[index].total = total;
        this.itemsArray.controls[index].patchValue({ 'total': total });
    };
    AdminPurchaseEditComponent.prototype.ngOnDestroy = function () {
        this.searchService.clearSearchInput(true);
        this.searchService.confirmSearchPossibility(false);
    };
    AdminPurchaseEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-purchase-edit',
            template: __webpack_require__(/*! ./admin-purchase-edit.component.html */ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.html"),
            styles: [__webpack_require__(/*! ./admin-purchase-edit.component.css */ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_6__["SearchService"]])
    ], AdminPurchaseEditComponent);
    return AdminPurchaseEditComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mcard{\n    background-color: white;\n    padding: 5px;\n    margin-left: 5px;\n    margin-right: 5px;\n    margin-top: 5px;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.no-line {\n    width: 200px;\n  }"

/***/ }),

/***/ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"dataSource.loading$ | async\"></mat-progress-bar>\n<div fxLayout=\"column\" class=\"mcard\">\n  <div fxLayout=\"column\">\n    <table mat-table [dataSource]=\"dataSource\" matSort matSortDisableClear=true>\n\n      <ng-container matColumnDef=\"supplierId\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Supplier </th>\n        <td mat-cell *matCellDef=\"let purchaseInvoice\"> {{purchaseInvoice.supplierId}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"id\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> State </th>\n        <td mat-cell *matCellDef=\"let purchaseInvoice\"> \n          <span [ngSwitch]=\"purchaseInvoice.profiled\">\n              <button matTooltip=\"New\" *ngSwitchCase=\"false\" mat-icon-button>\n                <mat-icon routerLink=\"/admin/purchase/{{purchaseInvoice.id}}/edit\" >update</mat-icon>\n              </button>\n              <button matTooltip=\"Profiled\" *ngSwitchCase=\"true\" mat-icon-button>\n                  <mat-icon routerLink=\"/admin/purchase/{{purchaseInvoice.id}}/edit\" >check_circle_outline</mat-icon>\n              </button>\n            </span>\n        </td>\n      </ng-container>\n    \n      <ng-container matColumnDef=\"date\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\n            <div>\n                <mat-form-field class=\"no-line\">\n                    <input matInput\n                          [formControl]=\"dateForm\"\n                           placeholder=\"Date\"\n                           [satDatepicker]=\"date\"\n                           (dateInput)=\"updateDate('input', $event)\" \n                           (dateChange)=\"updateDate('change', $event)\"\n                           >\n                    <sat-datepicker #date [rangeMode]=\"true\" [closeAfterSelection]=\"true\">\n                    </sat-datepicker>\n                    <sat-datepicker-toggle matSuffix [for]=\"date\"></sat-datepicker-toggle>\n                    <button matTooltip=\"Current date\"  mat-button matSuffix mat-icon-button aria-label=\"Current date\" (click)=\"currentDate()\">\n                        <mat-icon>access_time</mat-icon>\n                      </button>\n                      <button matTooltip=\"Date time show\"  mat-button matSuffix mat-icon-button aria-label=\"Date time show\" (click)=\"dateTimeToggle()\">\n                        <mat-icon>alarm</mat-icon>\n                      </button>\n                      <button matTooltip=\"Reset\" mat-button matSuffix mat-icon-button aria-label=\"Reset\" (click)=\"resetDate()\">\n                          <mat-icon>close</mat-icon>\n                      </button>   \n                  </mat-form-field>\n              </div>\n        </th>\n        <td mat-cell *matCellDef=\"let purchaseInvoice\">  {{dateFormat === 'shortTime' ? (purchaseInvoice.date | date: 'shortTime') : (purchaseInvoice.date | date: 'mediumDate')}}  </td>\n      </ng-container>\n    \n      <ng-container matColumnDef=\"total\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Total </th>\n        <td mat-cell *matCellDef=\"let purchaseInvoice\"> {{purchaseInvoice.total | currency}} </td>\n      </ng-container>\n    \n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n\n    <mat-paginator [length]=\"2000\" [pageSize]=\"25\" [pageSizeOptions]=\"[25, 50, 100]\"></mat-paginator>\n  </div>\n</div>\n<div style=\"position: fixed; bottom: 10px; right: 10px;\">\n  <a  routerLink=\"/admin/purchase/new\" mat-fab color=\"primary\"><mat-icon aria-label=\"Add\">add</mat-icon></a>  \n</div>\n"

/***/ }),

/***/ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AdminPurchaseListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPurchaseListComponent", function() { return AdminPurchaseListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _purchase_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./purchase.invoice.datasource */ "./src/app/role/admin/admin-purchase-list/purchase.invoice.datasource.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AdminPurchaseListComponent = /** @class */ (function () {
    function AdminPurchaseListComponent(adminService) {
        this.adminService = adminService;
        this.dateFormat = 'shortTime';
        this.date = null;
        this.dateBegin = null;
        this.dateEnd = null;
        this.dateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.displayedColumns = [
            'id',
            'supplierId',
            'date',
            'total'
        ];
    }
    AdminPurchaseListComponent.prototype.ngOnInit = function () {
        this.dataSource = new _purchase_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__["PurchaseInvoiceDatasource"](this.adminService);
        this.dataSource.loadPurchaseInvoices('id ASC', 0, 25);
    };
    AdminPurchaseListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataSource.paginator = this.paginator;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(this.sort.sortChange, this.paginator.page)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.loadPurchaseInvoicesPage(); }))
            .subscribe();
    };
    AdminPurchaseListComponent.prototype.updateDate = function (type, event) {
        localStorage.setItem('dateBegin', event.value.begin);
        localStorage.setItem('dateEnd', event.value.end);
        this.dateBegin = event.value.begin;
        this.dateEnd = event.value.end;
        this.loadPurchaseInvoicesPage();
    };
    AdminPurchaseListComponent.prototype.currentDate = function () {
        var beginDate = new Date();
        beginDate.setHours(0, 0, 0, 0);
        var endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        this.dateForm.setValue({ begin: beginDate, end: endDate });
        localStorage.setItem('dateBegin', beginDate.toString());
        localStorage.setItem('dateEnd', endDate.toString());
        this.dateBegin = beginDate;
        this.dateEnd = endDate;
        this.loadPurchaseInvoicesPage();
    };
    AdminPurchaseListComponent.prototype.dateTimeToggle = function () {
        this.dateFormat = this.dateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
        localStorage.setItem('dateFormat', this.dateFormat);
    };
    AdminPurchaseListComponent.prototype.resetDate = function () {
        this.dateForm.setValue('');
        localStorage.removeItem('dateBegin');
        localStorage.removeItem('dateEnd');
        this.dateBegin = null;
        this.dateEnd = null;
        this.loadPurchaseInvoicesPage();
    };
    AdminPurchaseListComponent.prototype.loadPurchaseInvoicesPage = function () {
        var sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();
        this.dataSource.loadPurchaseInvoices(sort, this.paginator.pageIndex, this.paginator.pageSize, this.dateBegin, this.dateEnd);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], AdminPurchaseListComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], AdminPurchaseListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('input'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AdminPurchaseListComponent.prototype, "input", void 0);
    AdminPurchaseListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-purchase-list',
            template: __webpack_require__(/*! ./admin-purchase-list.component.html */ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.html"),
            styles: [__webpack_require__(/*! ./admin-purchase-list.component.css */ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.css")]
        }),
        __metadata("design:paramtypes", [_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], AdminPurchaseListComponent);
    return AdminPurchaseListComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-purchase-list/purchase.invoice.datasource.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/role/admin/admin-purchase-list/purchase.invoice.datasource.ts ***!
  \*******************************************************************************/
/*! exports provided: PurchaseInvoiceDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseInvoiceDatasource", function() { return PurchaseInvoiceDatasource; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var PurchaseInvoiceDatasource = /** @class */ (function () {
    function PurchaseInvoiceDatasource(adminService) {
        this.adminService = adminService;
        this.purchaseInvoiceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    PurchaseInvoiceDatasource.prototype.loadPurchaseInvoices = function (sortDirection, pageIndex, pageSize, startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = null; }
        if (endDate === void 0) { endDate = null; }
        this.loadingSubject.next(true);
        this.adminService.findPurchaseInvoices(sortDirection, pageIndex, pageSize, startDate, endDate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (purchaseInvoices) {
            _this.purchaseInvoiceSubject.next(purchaseInvoices.body);
            _this.paginator.length = purchaseInvoices.headers.get('Content-Range').split('/')[1];
        });
    };
    PurchaseInvoiceDatasource.prototype.connect = function (collectionViewer) {
        return this.purchaseInvoiceSubject.asObservable();
    };
    PurchaseInvoiceDatasource.prototype.disconnect = function (collectionViewer) {
        console.log('disconnect');
        this.purchaseInvoiceSubject.complete();
        this.loadingSubject.complete();
    };
    return PurchaseInvoiceDatasource;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-routing.module.ts":
/*!****************************************************!*\
  !*** ./src/app/role/admin/admin-routing.module.ts ***!
  \****************************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared/stub/stub.component */ "./src/app/shared/stub/stub.component.ts");
/* harmony import */ var _shared_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.component */ "./src/app/shared/dashboard/dashboard.component.ts");
/* harmony import */ var _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../shared/not-found/not-found.component */ "./src/app/shared/not-found/not-found.component.ts");
/* harmony import */ var _admin_item_list_admin_item_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin-item-list/admin-item-list.component */ "./src/app/role/admin/admin-item-list/admin-item-list.component.ts");
/* harmony import */ var _admin_item_edit_admin_item_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-item-edit/admin-item-edit.component */ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.ts");
/* harmony import */ var _admin_sale_list_admin_sale_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-sale-list/admin-sale-list.component */ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.ts");
/* harmony import */ var _admin_sale_edit_admin_sale_edit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin-sale-edit/admin-sale-edit.component */ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.ts");
/* harmony import */ var _admin_order_list_admin_order_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin-order-list/admin-order-list.component */ "./src/app/role/admin/admin-order-list/admin-order-list.component.ts");
/* harmony import */ var _admin_purchase_list_admin_purchase_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin-purchase-list/admin-purchase-list.component */ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.ts");
/* harmony import */ var _admin_purchase_edit_admin_purchase_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin-purchase-edit/admin-purchase-edit.component */ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.ts");
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
            { path: 'item', component: _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__["StubComponent"],
                children: [
                    { path: '', component: _admin_item_list_admin_item_list_component__WEBPACK_IMPORTED_MODULE_5__["AdminItemListComponent"] },
                    { path: ':filter/show', component: _admin_item_list_admin_item_list_component__WEBPACK_IMPORTED_MODULE_5__["AdminItemListComponent"] },
                    { path: 'new', component: _admin_item_edit_admin_item_edit_component__WEBPACK_IMPORTED_MODULE_6__["AdminItemEditComponent"] },
                    { path: ':id/edit', component: _admin_item_edit_admin_item_edit_component__WEBPACK_IMPORTED_MODULE_6__["AdminItemEditComponent"] },
                ]
            },
            { path: 'sale', component: _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__["StubComponent"],
                children: [
                    { path: '', component: _admin_sale_list_admin_sale_list_component__WEBPACK_IMPORTED_MODULE_7__["AdminSaleListComponent"] },
                    { path: 'new', component: _admin_sale_edit_admin_sale_edit_component__WEBPACK_IMPORTED_MODULE_8__["AdminSaleEditComponent"] },
                    { path: ':id/edit', component: _admin_sale_edit_admin_sale_edit_component__WEBPACK_IMPORTED_MODULE_8__["AdminSaleEditComponent"] },
                    { path: ':filter/show', component: _admin_sale_list_admin_sale_list_component__WEBPACK_IMPORTED_MODULE_7__["AdminSaleListComponent"] },
                    { path: 'order', component: _admin_order_list_admin_order_list_component__WEBPACK_IMPORTED_MODULE_9__["AdminOrderListComponent"] },
                    { path: 'order/:filter/show', component: _admin_order_list_admin_order_list_component__WEBPACK_IMPORTED_MODULE_9__["AdminOrderListComponent"] },
                ]
            },
            { path: 'purchase', component: _shared_stub_stub_component__WEBPACK_IMPORTED_MODULE_2__["StubComponent"],
                children: [
                    { path: '', component: _admin_purchase_list_admin_purchase_list_component__WEBPACK_IMPORTED_MODULE_10__["AdminPurchaseListComponent"] },
                    { path: 'new', component: _admin_purchase_edit_admin_purchase_edit_component__WEBPACK_IMPORTED_MODULE_11__["AdminPurchaseEditComponent"] },
                    { path: ':id/edit', component: _admin_purchase_edit_admin_purchase_edit_component__WEBPACK_IMPORTED_MODULE_11__["AdminPurchaseEditComponent"] },
                ]
            },
            { path: '404', component: _shared_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_4__["NotFoundComponent"] },
            { path: '**', redirectTo: '/admin/404' }
        ]
    }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-18{\n    margin-top: 6px;\n}\n\n.card {\n    margin-bottom: 1%;\n  }\n\n.mat-card:not([class*=mat-elevation-z]) {\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.mcard_white{\n    background-color: white;\n    padding: 5px;\n    margin-left: 5px;\n    margin-right: 5px;\n    margin-top: 5px;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n.mcard{\n    margin-left: 5px;\n    margin-top: 5px;\n    margin-right: 5px;\n}\n\n.mat-fab-div{\n    margin-bottom: 5px; \n}\n\n.buttons-container {\n    position: fixed; bottom: 10px; right: 10px;\n}\n\n.buttons {\n    margin-left: 9px;\n}\n"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mcard_white\" fxLayout=\"column\">\n  <h3>Sale invoice </h3>\n\n  <div *ngIf=\"SaleInvoice$ | async as SaleInvoice\">\n      <p>Visitor: {{SaleInvoice.visitorId}}</p>\n      <p>State: {{SaleInvoice.state}}</p>\n      <p>Opened: {{SaleInvoice.openedAt | date: 'fullDate'}}</p>\n      <p *ngIf=\"SaleInvoice.closedAt\">Closed: {{SaleInvoice.closedAt | date: 'fullDate'}}</p>\n      <p>Total: {{SaleInvoice.total | currency}}</p>\n  </div>\n\n  <form fxHide fxLayout=\"column\" *ngIf=\"SaleInvoice$ | async\" [formGroup]=\"saleInvoiceForm\" (ngSubmit)=\"onUpdate()\">\n    <ng-template *ngIf=\"!editMode\">\n      <input matInput formControlName=\"id\">\n    </ng-template>\n    <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Visitor\" formControlName=\"visitorId\">\n        <mat-error *ngIf=\"saleInvoiceForm.controls['visitorId'].hasError('required')\">\n          Visitor is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <mat-form-field fxFlex=\"32\">\n        <input matInput placeholder=\"Total\" formControlName=\"total\">\n        <mat-error *ngIf=\"saleInvoiceForm.controls['total'].hasError('required')\">\n          Total is\n          <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n    </div>\n    <div  fxLayout=\"row\"  fxFill fxLayoutAlign=\"space-between center\">\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"openedAt\"  placeholder=\"Opened at\" formControlName=\"openedAt\">\n        <mat-datepicker-toggle matSuffix [for]=\"openedAt\">\n          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n        </mat-datepicker-toggle>\n        <mat-datepicker #openedAt></mat-datepicker>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"closedAt\"  placeholder=\"Closed at\" formControlName=\"closedAt\">\n        <mat-datepicker-toggle matSuffix [for]=\"closedAt\">\n          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n        </mat-datepicker-toggle>\n        <mat-datepicker #closedAt></mat-datepicker>\n      </mat-form-field>\n    </div>\n  </form>\n\n  <div class=\"buttons-container\" fxLayout=\"column\">\n      <div  class=\"buttons\" *ngIf=\"show\" fxLayout=\"column\" >\n          <div class=\"mat-fab-div\"  (click)=\" show = !show;\" fxFlex=\"32\">\n              <button form=\"ngForm\" color=\"primary\" mat-mini-fab aria-label=\"Save\" (click)=\"saveInvoice()\">\n                <mat-icon>save</mat-icon>\n              </button>\n          </div>\n          <div class=\"mat-fab-div\" (click)=\" show = !show;\" fxFlex=\"32\">\n            <button mat-mini-fab  aria-label=\"Close\" (click)=\"closeInvoice()\">\n              <mat-icon>close</mat-icon>\n            </button>\n          </div>\n        </div>\n      <button mat-fab color=\"primary\" [disabled]=\"closed\" (click)=\" show = !show \"><mat-icon aria-label=\"Options\">more_vert</mat-icon></button>\n    </div>\n</div>\n  <div class=\"mcard\">\n    <form   [formGroup]=\"searchItemsForm\">\n      <div  formArrayName=\"searchItems\"     fxLayout=\"row wrap\" fxLayout.lt-md=\"column\" fxLayoutGap=\".3%\" fxLayoutGap.lt-md=\".9%\" fxLayoutWrap fxLayoutAlign=\"space-between center\">\n        <mat-card    style=\"margin-bottom: 1em;\" fxFill fxFlex=\"49.5%\" fxFlex.lt-md=\"99.5%\" \n        *ngFor=\"let searchItem of searchItems$ | async as searchItems; let i = index\"\n        [formGroupName]=\"i\" class=\"card\">\n            <mat-card-header fxLayout=\"row\">\n                <div  fxLayout=\"row\" fxFlex=\"70\">\n                    <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+searchItem.image+')'}\" style=\"background-size: cover;\"></div>\n                    <div fxLayout=\"column\"> \n                        <mat-card-title>{{searchItem.name}} </mat-card-title>\n                        <mat-card-subtitle>{{searchItem.sellingPrice | currency}}&#x24;</mat-card-subtitle>\n                    </div>\n                </div>\n                <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\n\n                    <input hidden matInput formControlName=\"quantity\">\n                    <input hidden matInput formControlName=\"itemId\">\n                    <input hidden matInput formControlName=\"salesInvoiceId\">\n                    <div  fxLayout=\"row\" fxLayoutAlign=\"space-around center\" [ngSwitch]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\">\n                        <ng-template ngSwitchCase=\"0\">\n                            <button disabled mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i,false)\"><mat-icon aria-label=\"Add one\">chevron_left</mat-icon></button>\n                            <button  mat-mini-fab color=\"accent\"  [matBadge]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\" matBadgePosition=\"after\" matBadgeColor=\"primary\" (click)=\"clearSearch(searchItemsForm.get('searchItems').controls[i].value, i)\">Clear</button>\n                            <button disabled mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i, true)\"><mat-icon aria-label=\"Delete one\">chevron_right</mat-icon></button>\n                        </ng-template>\n                        <ng-template ngSwitchDefault>\n                            <button mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i,false)\"><mat-icon aria-label=\"Add one\">chevron_left</mat-icon></button>\n                            <button mat-mini-fab color=\"primary\"  [matBadge]=\"searchItemsForm.get('searchItems').controls[i].value.quantity\" matBadgePosition=\"after\" matBadgeColor=\"accent\" (click)=\"addItem(searchItemsForm.get('searchItems').controls[i].value, i)\">Add</button>\n                            <button mat-icon-button (click)=\"changeQuantity(searchItemsForm.get('searchItems').controls[i].value, i, true)\"><mat-icon aria-label=\"Delete one\">chevron_right</mat-icon></button>                         \n                        </ng-template>\n                    </div>\n\n                </div>\n            </mat-card-header>\n        </mat-card>\n\n      </div>\n  </form>\n    <form *ngIf=\"items$ | async as items\" [formGroup]=\"itemsForm\">\n      <div  formArrayName=\"items\"   fxLayout=\"row wrap\" fxLayout.lt-md=\"column\" fxLayoutGap=\".3%\" fxLayoutGap.lt-md=\".9%\" fxLayoutWrap fxLayoutAlign=\"space-between center\">\n        <mat-card class=\"card\"  style=\"margin-bottom: 1em;\" fxFill fxFlex=\"49.5%\" fxFlex.lt-md=\"99.5%\"  \n        *ngFor=\"let itemCtrl of itemsForm.get('items').controls; let i = index\"\n        [formGroupName]=\"i\">\n            <mat-card-header fxLayout=\"row\">\n                    <div mat-card-avatar [ngStyle]=\"{'background-image':'url(/backend/api/storages/images/download/'+items[i].item.image+')'}\" style=\"background-size: cover;\"></div>\n                        <mat-card-title>{{items[i].item.name}} </mat-card-title>\n                        <mat-card-subtitle>State: {{items[i].state}} <br> Quantity: {{items[i].quantity}} <br> Total: {{items[i].sellingPrice * items[i].quantity | currency}}</mat-card-subtitle>\n                    \n            </mat-card-header>\n        </mat-card>\n      </div>\n  </form>\n  </div>\n\n\n\n"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.ts ***!
  \*************************************************************************/
/*! exports provided: AdminSaleEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSaleEditComponent", function() { return AdminSaleEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var _stat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../stat.service */ "./src/app/role/admin/stat.service.ts");
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../safe.pipe */ "./src/app/safe.pipe.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sale-snackbar/sale-snackbar.component */ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.ts");
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










var AdminSaleEditComponent = /** @class */ (function () {
    function AdminSaleEditComponent(route, adminService, router, safePipe, snackBar, searchService, statService) {
        this.route = route;
        this.adminService = adminService;
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
    AdminSaleEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params.id;
            _this.editMode = params.id != null;
            if (_this.editMode === true) {
                _this.adminService.getSaleInvoice(_this.id).subscribe(function (saleInvoice) {
                    _this.SaleInvoice.next(saleInvoice);
                    _this.closed = _this.SaleInvoice.value.state === 'closed' ? true : false;
                    if (!_this.closed) {
                        _this.searchService.confirmSearchPossibility(true);
                        _this.searchService.searchRequest$.subscribe(function (fullText) {
                            _this.fullText = fullText;
                            _this.adminService.searchMenuItems(_this.fullText).subscribe(function (items) {
                                _this.searchItems.next(items);
                            });
                        });
                    }
                });
                _this.adminService.searchItemsSaleInvoice(_this.id).subscribe(function (items) {
                    _this.items.next(items);
                });
            }
            else {
                _this.adminService.updateSaleInvoice(_this.SaleInvoice.value).subscribe(function (result) {
                    console.log('', result);
                    _this.router.navigate(['/admin/sale/' + result.id + '/edit']);
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
    AdminSaleEditComponent.prototype.saveInvoice = function () {
        this.invoiceForm.nativeElement.submit();
    };
    AdminSaleEditComponent.prototype.closeInvoice = function () {
        var _this = this;
        this.adminService.closeSaleInvoice(this.id).subscribe(function (result) {
            if (result) {
                _this.searchService.clearSearchInput(true);
                _this.searchService.confirmSearchPossibility(false);
                _this.closed = true;
                _this.SaleInvoice.value.state = 'closed';
                _this.statService.changeCounter('openedInvoices', 'decrement');
            }
        });
    };
    AdminSaleEditComponent.prototype.initForm = function () {
        this.saleInvoiceForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'visitorId': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.visitorId, disabled: this.closed }),
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.id, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'openedAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.openedAt, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'closedAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.closedAt, disabled: this.closed }),
            'total': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.total, disabled: true }),
            'state': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: this.SaleInvoice.value.state, disabled: this.closed }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    AdminSaleEditComponent.prototype.addItem = function (item, index) {
        var _this = this;
        this.adminService.addItemSaleInvoice(item).subscribe(function (result) {
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
                _this.adminService.getSaleInvoice(_this.id).subscribe(function (saleInvoice) {
                    _this.adminService.searchItemsSaleInvoice(_this.id).subscribe(function (items) {
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
    AdminSaleEditComponent.prototype.changeQuantity = function (itemCtrl, i, add) {
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
    AdminSaleEditComponent.prototype.initSearchItemsForm = function () {
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
    AdminSaleEditComponent.prototype.initItemsForm = function () {
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
    AdminSaleEditComponent.prototype.onUpdate = function () {
        var _this = this;
        this.adminService.updateSaleInvoice(this.saleInvoiceForm.getRawValue()).subscribe(function (result) {
            _this.router.navigate(['/admin/sale/' + result.id + '/edit']);
        }, function (error) { return console.log(error); });
    };
    AdminSaleEditComponent.prototype.clearSearch = function (item, i) {
        this.searchService.clearSearchInput(true);
        // this.searchItems.value.splice(i, 1);
        console.log('', this.searchItemsForm);
    };
    AdminSaleEditComponent.prototype.onUpdateItem = function (item, index) {
        var _this = this;
        this.adminService.updateSaleInvoiceItem(item).subscribe(function (result) {
            _this.saleInvoiceForm.controls['total'].patchValue(result.total);
        }, function (error) { return console.log(error); });
    };
    AdminSaleEditComponent.prototype.showSnackbar = function (item) {
        this.openSnackBar(item);
    };
    AdminSaleEditComponent.prototype.openSnackBar = function (item) {
        this.snackBar.openFromComponent(_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_7__["SaleSnackbarComponent"], {
            data: item,
            duration: 5000,
        });
    };
    AdminSaleEditComponent.prototype.ngOnDestroy = function () {
        this.searchService.clearSearchInput(true);
        this.searchService.confirmSearchPossibility(false);
        this._items.unsubscribe();
        this._searchItems.unsubscribe();
        this._SaleInvoice.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('invoiceForm'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AdminSaleEditComponent.prototype, "invoiceForm", void 0);
    AdminSaleEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-sale-edit',
            template: __webpack_require__(/*! ./admin-sale-edit.component.html */ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.html"),
            styles: [__webpack_require__(/*! ./admin-sale-edit.component.css */ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _safe_pipe__WEBPACK_IMPORTED_MODULE_5__["SafePipe"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"],
            _shared_dashboard_search_service__WEBPACK_IMPORTED_MODULE_8__["SearchService"],
            _stat_service__WEBPACK_IMPORTED_MODULE_4__["AdminStatService"]])
    ], AdminSaleEditComponent);
    return AdminSaleEditComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-18{\n    margin-top: 6px;\n    cursor: pointer;\n}"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\">\n  <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\">\n    <div fxFlex=\"90\"><p>{{ data.message }}</p></div>\n    <div fxFlex=\"10\">\n      <button mat-icon-button (click)=\"snackBarRef.dismiss()\"><mat-icon>close</mat-icon></button>\n    </div>\n  </div>\n</div>\n\n\n  <!-- <div fxLayout=\"row\" fxFill fxLayoutAlign=\"space-between center\">\n    <div fxFlex=\"90\">{{data.item.name}} - {{data.quantity}}</div>\n    <div fxFlex=\"10\">\n      <button mat-icon-button (click)=\"snackBarRef.dismiss()\"><mat-icon>close</mat-icon></button>\n    </div>\n  </div>\n\n  <div fxLayout=\"row\" *ngIf=\"data.newAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n      <div fxFlex=\"10\"><mat-icon matTooltip=\"Order time\" matTooltipPosition=\"above\" class=\"mat-18\">fiber_new</mat-icon></div>\n      <div fxFlex=\"30\"><p>{{ newAt$ | async }}</p></div>\n    </div>\n \n    <mat-divider></mat-divider>\n    <div fxLayout=\"row\" *ngIf=\"data.progressAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n        <div fxFlex=\"10\"><mat-icon matTooltip=\"In progress\" matTooltipPosition=\"above\" class=\"mat-18\">schedule</mat-icon></div>\n        <div fxFlex=\"30\"><p>{{ time$ | async | date:'mediumTime' }}</p></div>\n      </div>\n      <mat-divider></mat-divider>\n      <div fxLayout=\"row\" *ngIf=\"data.readyAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n          <div fxFlex=\"10\"><mat-icon matTooltip=\"Ready\" matTooltipPosition=\"above\" class=\"mat-18\">thumb_up_alt</mat-icon></div>\n          <div fxFlex=\"30\"><p>{{data.readyAt | date:'shortTime' }}</p></div>\n        </div>\n        <mat-divider></mat-divider>\n        <div fxLayout=\"row\" *ngIf=\"data.servedAt\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"space-between end\">\n            <div fxFlex=\"10\"><mat-icon matTooltip=\"Served\" matTooltipPosition=\"above\" class=\"mat-18\">restaurant</mat-icon></div>\n            <div fxFlex=\"30\"><p>{{data.servedAt | date:'shortTime' }}</p></div>\n          </div> -->"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SaleSnackbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleSnackbarComponent", function() { return SaleSnackbarComponent; });
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




var SaleSnackbarComponent = /** @class */ (function () {
    function SaleSnackbarComponent(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
        this.ticks = 0;
        this.time$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (val) { return new Date(); }));
        this.initTimer(this.data);
    }
    SaleSnackbarComponent.prototype.initTimer = function (data) {
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
    SaleSnackbarComponent.prototype.ngOnInit = function () {
    };
    SaleSnackbarComponent.prototype.ngAfterViewInit = function () {
    };
    SaleSnackbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sale-snackbar',
            template: __webpack_require__(/*! ./sale-snackbar.component.html */ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.html"),
            styles: [__webpack_require__(/*! ./sale-snackbar.component.css */ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_SNACK_BAR_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarRef"], Object])
    ], SaleSnackbarComponent);
    return SaleSnackbarComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-list/admin-sale-list.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mcard{\n    background-color: white;\n    padding: 5px;\n    margin-left: 5px;\n    margin-right: 5px;\n    margin-top: 5px;\n    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);\n}\n\n\n.no-line {\n    width: 200px;\n  }"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-list/admin-sale-list.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"dataSource.loading$ | async\"></mat-progress-bar>\n<div fxLayout=\"column\" class=\"mcard\" >\n  <div fxLayout=\"column\">\n    <table mat-table [dataSource]=\"dataSource\" matSort matSortDisableClear=true>\n\n      <ng-container matColumnDef=\"state\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>State</th>\n\n          <td mat-cell *matCellDef=\"let saleInvoice\"> \n            <span [ngSwitch]=\"saleInvoice.state\">\n              <button matTooltip=\"Opened\" *ngSwitchCase=\"'opened'\" mat-icon-button>\n                <mat-icon routerLink=\"/admin/sale/{{saleInvoice.id}}/edit\" >update</mat-icon>\n              </button>\n              <button matTooltip=\"Closed\" *ngSwitchCase=\"'closed'\" mat-icon-button>\n                  <mat-icon routerLink=\"/admin/sale/{{saleInvoice.id}}/edit\" >check_circle_outline</mat-icon>\n              </button>\n            </span>\n            </td>\n          <td mat-footer-cell  *matFooterCellDef> \n              <p>Revenue</p>  \n              <p>Gross profit</p>\n              <p>Net profit</p>\n          </td>  \n        </ng-container>\n\n      <ng-container matColumnDef=\"openedAt\">\n        <th mat-header-cell *matHeaderCellDef> \n          <div>\n              <mat-form-field class=\"no-line\">\n                  <input matInput\n                        [formControl]=\"openedDateForm\"\n                         placeholder=\"Opened\"\n                         [satDatepicker]=\"openedDate\"\n                         (dateInput)=\"updateOpenedDate('input', $event)\" \n                         (dateChange)=\"updateOpenedDate('change', $event)\"\n                         >\n                  <sat-datepicker #openedDate [rangeMode]=\"true\" [closeAfterSelection]=\"true\">\n                  </sat-datepicker>\n                  <sat-datepicker-toggle matSuffix [for]=\"openedDate\"></sat-datepicker-toggle>\n                  <button matTooltip=\"Current date\"  mat-button matSuffix mat-icon-button aria-label=\"Current date\" (click)=\"openedCurrent()\">\n                      <mat-icon>access_time</mat-icon>\n                    </button>\n                    <button matTooltip=\"Date time show\"  mat-button matSuffix mat-icon-button aria-label=\"Date time show\" (click)=\"openedDateTimeToggle()\">\n                      <mat-icon>alarm</mat-icon>\n                    </button>\n                    <button matTooltip=\"Reset\" mat-button matSuffix mat-icon-button aria-label=\"Reset\" (click)=\"openedReset()\">\n                        <mat-icon>close</mat-icon>\n                    </button>   \n                </mat-form-field>\n            </div>\n        </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{openedDateFormat === 'shortTime' ? (saleInvoice.openedAt | date: 'shortTime') : (saleInvoice.openedAt | date: 'mediumDate')}} </td>\n        <td mat-footer-cell *matFooterCellDef></td>\n      </ng-container>\n    \n      <ng-container matColumnDef=\"closedAt\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-form-field class=\"no-line\">\n              <input matInput\n              [formControl]=\"closedDateForm\"\n               placeholder=\"Closed\"\n               [satDatepicker]=\"closedDate\"\n               (dateInput)=\"updateClosedDate('input', $event)\" \n               (dateChange)=\"updateClosedDate('change', $event)\"\n               >\n              <sat-datepicker #closedDate [rangeMode]=\"true\" [closeAfterSelection]=\"true\">\n              </sat-datepicker>\n              <sat-datepicker-toggle matSuffix [for]=\"closedDate\"></sat-datepicker-toggle>\n              <button matTooltip=\"Current date\"  mat-button matSuffix mat-icon-button aria-label=\"Current date\" (click)=\"closedCurrent()\">\n                <mat-icon>access_time</mat-icon>\n              </button>\n              <button matTooltip=\"Date time show\"  mat-button matSuffix mat-icon-button aria-label=\"Date time show\" (click)=\"closedDateTimeToggle()\">\n                <mat-icon>alarm</mat-icon>\n              </button>\n              <button matTooltip=\"Reset\" mat-button matSuffix mat-icon-button aria-label=\"Reset\" (click)=\"closedReset()\">\n                  <mat-icon>close</mat-icon>\n              </button>\n            </mat-form-field>\n        </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{closedDateFormat === 'shortTime' ? (saleInvoice.closedAt | date: 'shortTime') : (saleInvoice.closedAt | date: 'mediumDate')}} </td>\n        <td mat-footer-cell *matFooterCellDef></td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"total\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Total </th>\n        <td mat-cell *matCellDef=\"let saleInvoice\"> {{saleInvoice.total | currency}} </td>\n        <td mat-footer-cell *matFooterCellDef>\n          <p>{{revenue$ | async | currency}}</p>\n          <p>{{grossProfit$ | async | currency}}</p>\n          <p>{{netProfit$ | async | currency}}</p>\n        </td>\n      </ng-container>\n\n\n    \n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns;  sticky: true\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns; sticky: true\"></tr>\n\n    </table>\n\n    <mat-paginator [length]=\"2000\" [pageSize]=\"50\" [pageSizeOptions]=\"[10, 50, 100]\"></mat-paginator>\n  </div>\n</div>\n<div style=\"position: fixed; bottom: 10px; right: 10px;\">\n  <a  routerLink=\"/admin/sale/new\" mat-fab color=\"primary\"><mat-icon aria-label=\"Add\">add</mat-icon></a>  \n</div>"

/***/ }),

/***/ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-list/admin-sale-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: AdminSaleListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSaleListComponent", function() { return AdminSaleListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../admin.service */ "./src/app/role/admin/admin.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sale_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sale.invoice.datasource */ "./src/app/role/admin/admin-sale-list/sale.invoice.datasource.ts");
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








var AdminSaleListComponent = /** @class */ (function () {
    function AdminSaleListComponent(adminService, route) {
        this.adminService = adminService;
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
    AdminSaleListComponent.prototype.ngOnInit = function () {
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
            _this.dataSource = new _sale_invoice_datasource__WEBPACK_IMPORTED_MODULE_5__["SaleInvoiceDatasource"](_this.adminService);
            _this.revenue$ = _this.dataSource.revenue$;
            _this.grossProfit$ = _this.dataSource.grossProfit$;
            _this.netProfit$ = _this.dataSource.netProfit$;
            console.log('', _this.filter);
            _this.dataSource.loadSaleInvoices(_this.filter, 'openedAt ASC', 0, 25, _this.openedDateBegin, _this.openedDateEnd, _this.closedDateBegin, _this.closedDateEnd);
        });
    };
    AdminSaleListComponent.prototype.ngOnDestroy = function () {
        this._routes.unsubscribe();
    };
    AdminSaleListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataSource.paginator = this.paginator;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(this.sort.sortChange, this.paginator.page)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.loadSaleInvoicesPage(); }))
            .subscribe();
    };
    AdminSaleListComponent.prototype.updateOpenedDate = function (type, event) {
        localStorage.setItem('openedDateBegin', event.value.begin);
        localStorage.setItem('openedDateEnd', event.value.end);
        this.openedDateBegin = event.value.begin;
        this.openedDateEnd = event.value.end;
        this.loadSaleInvoicesPage();
    };
    AdminSaleListComponent.prototype.updateClosedDate = function (type, event) {
        localStorage.setItem('closedDateBegin', event.value.begin);
        localStorage.setItem('closedDateEnd', event.value.end);
        this.closedDateBegin = event.value.begin;
        this.closedDateEnd = event.value.end;
        this.loadSaleInvoicesPage();
    };
    AdminSaleListComponent.prototype.openedCurrent = function () {
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
    AdminSaleListComponent.prototype.openedDateTimeToggle = function () {
        this.openedDateFormat = this.openedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
        localStorage.setItem('openedDateFormat', this.openedDateFormat);
    };
    AdminSaleListComponent.prototype.openedReset = function () {
        this.openedDateForm.setValue('');
        localStorage.removeItem('openedDateBegin');
        localStorage.removeItem('openedDateEnd');
        this.openedDateBegin = null;
        this.openedDateEnd = null;
        this.loadSaleInvoicesPage();
    };
    AdminSaleListComponent.prototype.closedCurrent = function () {
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
    AdminSaleListComponent.prototype.closedDateTimeToggle = function () {
        this.closedDateFormat = this.closedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
        localStorage.setItem('endDateFormat', this.closedDateFormat);
    };
    AdminSaleListComponent.prototype.closedReset = function () {
        this.closedDateForm.setValue('');
        localStorage.removeItem('closedDateBegin');
        localStorage.removeItem('closedDateEnd');
        this.closedDateBegin = null;
        this.closedDateEnd = null;
        this.loadSaleInvoicesPage();
    };
    AdminSaleListComponent.prototype.loadSaleInvoicesPage = function () {
        var sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();
        this.dataSource.loadSaleInvoices(this.filter, sort, this.paginator.pageIndex, this.paginator.pageSize, this.openedDateBegin, this.openedDateEnd, this.closedDateBegin, this.closedDateEnd);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], AdminSaleListComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], AdminSaleListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('input'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AdminSaleListComponent.prototype, "input", void 0);
    AdminSaleListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-sale-list',
            template: __webpack_require__(/*! ./admin-sale-list.component.html */ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.html"),
            styles: [__webpack_require__(/*! ./admin-sale-list.component.css */ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.css")]
        }),
        __metadata("design:paramtypes", [_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], AdminSaleListComponent);
    return AdminSaleListComponent;
}());



/***/ }),

/***/ "./src/app/role/admin/admin-sale-list/sale.invoice.datasource.ts":
/*!***********************************************************************!*\
  !*** ./src/app/role/admin/admin-sale-list/sale.invoice.datasource.ts ***!
  \***********************************************************************/
/*! exports provided: SaleInvoiceDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleInvoiceDatasource", function() { return SaleInvoiceDatasource; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var SaleInvoiceDatasource = /** @class */ (function () {
    function SaleInvoiceDatasource(adminService) {
        this.adminService = adminService;
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
        this.adminService.findSaleInvoices(filter, sortDirection, pageIndex, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (saleInvoices) {
            _this.saleInvoiceSubject.next(saleInvoices.body.result);
            _this.revenue.next(saleInvoices.body.revenue);
            _this.grossProfit.next(saleInvoices.body.grossProfit);
            _this.netProfit.next(saleInvoices.body.netProfit);
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

/***/ "./src/app/role/admin/admin.module.ts":
/*!********************************************!*\
  !*** ./src/app/role/admin/admin.module.ts ***!
  \********************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/role/admin/admin-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! saturn-datepicker */ "./node_modules/saturn-datepicker/fesm5/saturn-datepicker.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../shared/stub/stub.shared.module */ "./src/app/shared/stub/stub.shared.module.ts");
/* harmony import */ var _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../shared/dashboard/dashboard.shared.module */ "./src/app/shared/dashboard/dashboard.shared.module.ts");
/* harmony import */ var _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../shared/not-found/not-found.shared.module */ "./src/app/shared/not-found/not-found.shared.module.ts");
/* harmony import */ var _admin_item_list_admin_item_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin-item-list/admin-item-list.component */ "./src/app/role/admin/admin-item-list/admin-item-list.component.ts");
/* harmony import */ var _admin_item_edit_admin_item_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin-item-edit/admin-item-edit.component */ "./src/app/role/admin/admin-item-edit/admin-item-edit.component.ts");
/* harmony import */ var _admin_sale_list_admin_sale_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin-sale-list/admin-sale-list.component */ "./src/app/role/admin/admin-sale-list/admin-sale-list.component.ts");
/* harmony import */ var _admin_sale_edit_admin_sale_edit_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./admin-sale-edit/admin-sale-edit.component */ "./src/app/role/admin/admin-sale-edit/admin-sale-edit.component.ts");
/* harmony import */ var _admin_order_list_admin_order_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./admin-order-list/admin-order-list.component */ "./src/app/role/admin/admin-order-list/admin-order-list.component.ts");
/* harmony import */ var _admin_purchase_list_admin_purchase_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./admin-purchase-list/admin-purchase-list.component */ "./src/app/role/admin/admin-purchase-list/admin-purchase-list.component.ts");
/* harmony import */ var _admin_purchase_edit_admin_purchase_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./admin-purchase-edit/admin-purchase-edit.component */ "./src/app/role/admin/admin-purchase-edit/admin-purchase-edit.component.ts");
/* harmony import */ var _admin_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./admin-sale-edit/sale-snackbar/sale-snackbar.component */ "./src/app/role/admin/admin-sale-edit/sale-snackbar/sale-snackbar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__["AdminRoutingModule"],
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
                _shared_dashboard_dashboard_shared_module__WEBPACK_IMPORTED_MODULE_8__["DashboardSharedModule"],
                _shared_stub_stub_shared_module__WEBPACK_IMPORTED_MODULE_7__["StubSharedModule"],
                _shared_not_found_not_found_shared_module__WEBPACK_IMPORTED_MODULE_9__["NotFoundSharedModule"],
                saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__["SatDatepickerModule"],
                saturn_datepicker__WEBPACK_IMPORTED_MODULE_5__["SatNativeDateModule"]
            ],
            declarations: [
                _admin_item_edit_admin_item_edit_component__WEBPACK_IMPORTED_MODULE_11__["AdminItemEditComponent"],
                _admin_item_list_admin_item_list_component__WEBPACK_IMPORTED_MODULE_10__["AdminItemListComponent"],
                _admin_sale_edit_admin_sale_edit_component__WEBPACK_IMPORTED_MODULE_13__["AdminSaleEditComponent"],
                _admin_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_17__["SaleSnackbarComponent"],
                _admin_sale_list_admin_sale_list_component__WEBPACK_IMPORTED_MODULE_12__["AdminSaleListComponent"],
                _admin_purchase_edit_admin_purchase_edit_component__WEBPACK_IMPORTED_MODULE_16__["AdminPurchaseEditComponent"],
                _admin_purchase_list_admin_purchase_list_component__WEBPACK_IMPORTED_MODULE_15__["AdminPurchaseListComponent"],
                _admin_order_list_admin_order_list_component__WEBPACK_IMPORTED_MODULE_14__["AdminOrderListComponent"],
            ],
            entryComponents: [_admin_sale_edit_sale_snackbar_sale_snackbar_component__WEBPACK_IMPORTED_MODULE_17__["SaleSnackbarComponent"]],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_SNACK_BAR_DEFAULT_OPTIONS"], useValue: { duration: 100000 } }
            ],
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/role/admin/admin.service.ts":
/*!*********************************************!*\
  !*** ./src/app/role/admin/admin.service.ts ***!
  \*********************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
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





var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
        this.items = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.items$ = this.items.asObservable();
    }
    AdminService.prototype.getItems = function (filter, fullText) {
        if (filter === void 0) { filter = false; }
        if (fullText === void 0) { fullText = false; }
        if (!filter) {
            this.listItems(fullText);
        }
        else if (filter === 'shoppinglist') {
            this.listShoppingList(fullText);
        }
        else if (filter === 'stoplist') {
            this.listStopList(fullText);
        }
    };
    AdminService.prototype.listItems = function (fullText) {
        var _this = this;
        if (fullText === void 0) { fullText = false; }
        return this.http.get(this.apiUrl + 'api/Items/listItems', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('fullText', fullText.toString())
        }).subscribe(function (data) { return _this.items.next(data); });
    };
    AdminService.prototype.listShoppingList = function (fullText) {
        var _this = this;
        if (fullText === void 0) { fullText = false; }
        return this.http.get(this.apiUrl + 'api/Items/listShoppingList', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('fullText', fullText.toString())
        }).subscribe(function (data) { return _this.items.next(data); });
    };
    AdminService.prototype.listStopList = function (fullText) {
        var _this = this;
        if (fullText === void 0) { fullText = false; }
        return this.http.get(this.apiUrl + 'api/Items/listStopList', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('fullText', fullText.toString())
        }).subscribe(function (data) { return _this.items.next(data); });
    };
    AdminService.prototype.progressOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/progressOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'progress';
        }));
    };
    AdminService.prototype.readyOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/readyOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'ready';
        }));
    };
    AdminService.prototype.serveOrder = function (id, index) {
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/serveOrder?id=' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
            return 'served';
        }));
    };
    AdminService.prototype.getOrders = function (filter) {
        if (filter === void 0) { filter = false; }
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/listOrders', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('filter', filter.toString())
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return (data);
        }));
    };
    AdminService.prototype.getItem = function (id) {
        return this.http.get(this.apiUrl + 'api/Items/' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.searchMenuItems = function (fullText) {
        return this.http.get(this.apiUrl + 'api/Items/searchMenuItems?fullText=' + fullText.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.getRecipe = function (id) {
        return this.http.get(this.apiUrl + 'api/Items/' + id + '/recipe').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.updateItem = function (item) {
        return this.http.post(this.apiUrl + 'api/Items/replaceOrCreate', item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.getCategories = function () {
        return this.http.get(this.apiUrl + 'api/Categories').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.updateIngredient = function (ingredient) {
        return this.http.post(this.apiUrl + 'api/Ingredients/updateIngredient', { ingredient: ingredient }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            console.log(data);
            return data;
        }));
    };
    AdminService.prototype.search = function (recipeId, fulltext) {
        if (fulltext === void 0) { fulltext = ''; }
        return this.http.get(this.apiUrl + 'api/Ingredients/search?recipeId=' + recipeId + '&fullText=' + fulltext).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.findPurchaseInvoices = function (order, pageNumber, pageSize, startDate, endDate) {
        if (order === void 0) { order = 'id ASC'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 1; }
        if (startDate === void 0) { startDate = null; }
        if (endDate === void 0) { endDate = null; }
        var offset = 0;
        if (pageNumber === 0) {
            offset = 0;
        }
        else {
            offset = pageSize * pageNumber + 1;
        }
        startDate = startDate === null ? '0000-09-30T21:00:00.000Z' : startDate.toISOString();
        endDate = endDate === null ? '9999-09-30T21:00:00.000Z' : endDate.toISOString();
        return this.http.get(this.apiUrl + 'api/PurchaseInvoices', {
            observe: 'response',
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Prefer': 'count=exact'
            }),
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('filter[limit]', pageSize.toString())
                .set('filter[order]', order)
                .set('filter[limit]', pageSize.toString())
                .set('filter[skip]', offset.toString())
                .set('filter[where][date][between][0]', startDate)
                .set('filter[where][date][between][1]', endDate)
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.getPurchaseInvoice = function (id) {
        return this.http.get(this.apiUrl + 'api/PurchaseInvoices/' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.searchItemsPurchaseInvoice = function (id, fulltext) {
        if (fulltext === void 0) { fulltext = ''; }
        return this.http.get(this.apiUrl + 'api/relPurchaseInvoiceItems/searchItemsPurchaseInvoice?purchaseInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.updatePurchaseInvoiceItem = function (item) {
        return this.http.post(this.apiUrl + 'api/relPurchaseInvoiceItems/updatePurchaseInvoiceItem', { item: item }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.profilePurchaseInvoice = function (PurchaseInvoice) {
        return this.http.post(this.apiUrl + 'api/PurchaseInvoices/profile', { invoice: PurchaseInvoice }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.updatePurchaseInvoice = function (PurchaseInvoice) {
        return this.http.post(this.apiUrl + 'api/PurchaseInvoices/replaceOrCreate', PurchaseInvoice).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.findSaleInvoices = function (filter, order, pageNumber, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd) {
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
    AdminService.prototype.getSaleInvoice = function (id) {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.searchItemsSaleInvoice = function (id, fulltext) {
        if (fulltext === void 0) { fulltext = ''; }
        return this.http.get(this.apiUrl + 'api/relSalesInvoiceItems/searchItemsSalesInvoice?salesInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.updateSaleInvoiceItem = function (item) {
        return this.http.post(this.apiUrl + 'api/relSalesInvoiceItems/updateSalesInvoiceItem', { item: item }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            console.log(data);
            return data;
        }));
    };
    AdminService.prototype.updateSaleInvoice = function (SaleInvoice) {
        console.log(SaleInvoice);
        return this.http.post(this.apiUrl + 'api/SalesInvoices/replaceOrCreate', SaleInvoice).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.addItemSaleInvoice = function (item) {
        return this.http.post(this.apiUrl + 'api/relSalesInvoiceItems/addItemSaleInvoice', { item: item }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.closeSaleInvoice = function (id) {
        return this.http.get(this.apiUrl + 'api/SalesInvoices/closeSaleInvoice?salesInvoiceId=' + id.toString()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService.prototype.uploadFile = function (fileToUpload) {
        return this.http.post(this.apiUrl + 'api/storages/images/upload', fileToUpload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
    };
    AdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AdminService);
    return AdminService;
}());



/***/ })

}]);
//# sourceMappingURL=role-admin-admin-module.js.map