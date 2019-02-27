import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElementRef , Renderer2} from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AdminService } from './../admin.service';
import {
  BehaviorSubject,
  Subscription,
  Observable,
  of,
  Subject} from 'rxjs';

import {
  debounceTime,
  delay,
  distinctUntilChanged,
  flatMap,
  map,
  tap} from 'rxjs/operators';

import { SearchService } from './../../../shared/dashboard/search.service';



import { Item } from './../../../model/Item';
import { Category } from './../../../model/Category';
import { Ingredient } from './../../../model/Ingredient';

@Component({
  selector: 'app-admin-item-edit',
  templateUrl: './admin-item-edit.component.html',
  styleUrls: ['./admin-item-edit.component.css']
})
export class AdminItemEditComponent implements OnInit, OnDestroy {
  public id: string;
  public editMode = false;

  private _item: Subscription;
  public item: BehaviorSubject<Item> = new BehaviorSubject<Item>(
    {
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
    }
  );
  public item$ = this.item.asObservable();

  private _ingredients: Subscription;
  public ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  public ingredients$ = this.ingredients.asObservable();

  private _categories: Subscription;
  public categories: Subject<Category[]> = new Subject<Category[]>();
  public categories$ = this.categories.asObservable();

  public itemForm: FormGroup;
  public ingredientsForm: FormGroup;
  public ingredientsArray: FormArray;
  public isRecipe: boolean;
  public fullText;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private searchService: SearchService) { }

    ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = params.id;
            this.editMode = params.id != null;
            this._categories = this.adminService.getCategories().subscribe(categories => {
              this.categories.next(categories);
            });
            if (this.editMode === true) {
                this.adminService.getItem(this.id).subscribe(item => {
                  this.item.next(item);
                });
            }
          }
        );
        this._item = this.item.subscribe(data => {
          this.isRecipe = this.item.value.type === 'recipe';
            if ( this.isRecipe ) {
              this.searchService.confirmSearchPossibility(true);
              this.adminService.search(this.id).subscribe(ingredients => {
                this.ingredients.next(ingredients);
              });
              this.searchService.searchRequest$.subscribe(
                fullText => {
                  this.fullText = fullText;
                  this.adminService.search(this.id, this.fullText).subscribe(ingredients => {
                    this.ingredients.next(ingredients);
                  });
                });
            } else {
              this.searchService.confirmSearchPossibility(false);
            }
          this.initForm();
        });
        this._ingredients = this.ingredients.subscribe(data => {
          this.initIngredientsForm();
        });
    }


  private initForm() {
    this.itemForm = new FormGroup({
      'name': new FormControl(this.item.value.name, Validators.required),
      'executor': new FormControl(this.item.value.executor, Validators.required),
      'type': new FormControl({value: this.item.value.type, disabled: this.editMode}, Validators.required),
      'categoryId': new FormControl(this.item.value.categoryId, Validators.required),
      'tare': new FormControl(this.item.value.tare),
      'unit': new FormControl(this.item.value.unit, Validators.required),
      'menuItem': new FormControl(this.item.value.menuItem, Validators.required),
      'averageCost': new FormControl({value: this.item.value.averageCost, disabled: true}),
      'sellingPrice': new FormControl(this.item.value.sellingPrice),
      'image': new FormControl(this.item.value.image, Validators.required),
    });
    if (this.editMode) {
      this.itemForm.addControl('id', new FormControl({value: this.item.value.id, disabled: true}));
    }
    if (this.isRecipe) {
      this.itemForm.addControl('weight', new FormControl({value: this.item.value.weight, disabled: true}));
    } else {
      this.itemForm.addControl('quantity', new FormControl({value: this.item.value.quantity, disabled: true}));
    }
  }



  initIngredientsForm() {
    this.ingredientsForm = new FormGroup({});
    this.ingredientsArray = new FormArray([]);
    this.ingredients.value.forEach(ingredient => {
      this.ingredientsArray.push(
        new FormGroup({
          'id': new FormControl(ingredient.id),
          'ingredientId': new FormControl(ingredient.ingredientId),
          'recipeId': new FormControl(ingredient.recipeId),
          'recipeQuantity': new FormControl(ingredient.recipeQuantity),
        })
      );
    });
    this.ingredientsForm.addControl('ingredients', this.ingredientsArray);
  }

  onUpdate() {
    if (this.itemForm.valid) {
      this.adminService.updateItem(this.itemForm.getRawValue()).subscribe(
        (result: any) => {
          this.router.navigate(['/admin/item/' + result.id + '/edit']);
        },
        error => console.log(error)
      );
    }
  }

  typeChanged(e) {
    if (this.itemForm.value.type === 'recipe') {
      this.item.value.type = 'recipe';
      // this.isRecipe = true;
    } else {
      this.item.value.type = 'ingredient';
      // this.isRecipe = false;
    }
  }

  onUpdateIngredient(ingredient, index: number) {
    this.adminService.updateIngredient(ingredient).subscribe(
      (result: any) => {
        this.itemForm.controls['weight'].patchValue(result.quantitySummary);
        this.itemForm.controls['averageCost'].patchValue(result.averageCost);
        this.itemForm.controls['sellingPrice'].patchValue(result.sellingSummary);
        console.log(result.quantitySummary);
      },
      error => console.log(error)
    );
  }

  uploadImage(event) {
    const formData: FormData = new FormData();
    formData.append('degree_attachment', event.target.files[0], event.target.files[0].name);
    this.adminService.uploadFile(formData).subscribe(
      (result: any) => {
        this.itemForm.controls['image'].patchValue(event.target.files[0].name);
        this.item.value.image = event.target.files[0].name;
      },
      error => console.log(error)
    );
}

  ngOnDestroy() {
    this.searchService.confirmSearchPossibility(false);
    if (this.editMode === true) {
      this._item.unsubscribe();
    }
    if ( this.isRecipe ) {
      this._ingredients.unsubscribe();
    }
    this._categories.unsubscribe();
  }

}
