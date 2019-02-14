import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElementRef , Renderer2} from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AdminService } from './../../admin.service';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import { SearchService } from './../../search.service';
import { Subscription } from 'rxjs';


import { Item } from './../../model/Item';
import { Ingredient } from './../../model/Ingredient';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode = false;
  // public item: Item[];
  public item;
  public categories;
  public itemForm: FormGroup;
  public ingredientsForm: FormGroup;
  public ingredientsArray: FormArray;
  public selected;
  public isRecipe: boolean;
  public ingredients = null;
  public searchInput = new Subject<string>();
  public searchInputSubscription;
  public fullText;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private searchService: SearchService) { }

    ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = params.id;
            this.editMode = params.id != null;
            if (this.editMode === true) {
              this.adminService.getItem(this.id).subscribe(item => {
                this.item = item;

                console.log('', item);
                this.isRecipe = this.item.type === 'recipe';
                this.adminService.getCategories().subscribe(categories => {
                  this.categories = categories;
                  if (this.item.type === 'recipe') {
                    this.searchService.confirmSearchPossibility(true);
                    this.searchService.searchRequest$.subscribe(
                      fullText => {
                        console.log('', fullText);
                        this.fullText = fullText;
                        this.adminService.search(this.id, this.fullText).subscribe(ingredients => {
                          this.ingredients = ingredients;
                          this.initIngredientsForm();
                        });
                      });
                    this.adminService.search(this.id).subscribe(ingredients => {
                      this.ingredients = ingredients;
                      this.initForm();
                    });
                  } else {
                    this.searchService.confirmSearchPossibility(false);
                    this.initForm();
                  }

                });
              });
            } else {
              this.adminService.getCategories().subscribe(categories => {
                this.categories = categories;
                this.item = true;
                this.initForm();
              });
            }
          }
        );
    }


  private initForm() {
    this.itemForm = new FormGroup({
      'name': new FormControl(this.editMode ? this.item.name : '', Validators.required),
      'executor': new FormControl(this.editMode ? this.item.executor : '', Validators.required),
      'type': new FormControl({value: this.editMode ? this.item.type : '', disabled: this.editMode}, Validators.required),
      'categoryId': new FormControl(this.editMode ? this.item.categoryId : '', Validators.required),
      'tare': new FormControl(this.editMode ? this.item.tare : ''),
//      'quantity': new FormControl({value: this.editMode ? this.item.quantity : 0, disabled: true}),
      'unit': new FormControl(this.editMode ? this.item.unit : '', Validators.required),
      'menuItem': new FormControl(this.editMode ? this.item.menuItem.toString() : 'false', Validators.required),
      'averageCost': new FormControl({value: this.editMode ? this.item.averageCost : 0, disabled: true}),
      'sellingPrice': new FormControl(this.editMode ? this.item.sellingPrice : 0),
      'id': new FormControl(this.editMode ? this.item.id : null, Validators.required),
      'image': new FormControl(this.editMode ? this.item.image : '', Validators.required),
    });

    if (this.isRecipe) {
      this.itemForm.addControl('weight', new FormControl({value: this.editMode ? this.item.weight : 0, disabled: true}));
      this.initIngredientsForm();
    } else {
      this.itemForm.addControl('quantity', new FormControl({value: this.editMode ? this.item.quantity : 0, disabled: true}));
    }
  }



  initIngredientsForm() {
    this.ingredientsForm = new FormGroup({});
    this.ingredientsArray = new FormArray([]);
    this.ingredients.forEach(ingredient => {
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
    this.adminService.updateItem(this.itemForm.getRawValue()).subscribe(
      (result: any) => {
        this.router.navigate(['/admin/item/' + result.id + '/edit']);
      },
      error => console.log(error)
    );
  }

  typeChanged(e) {
    if (this.itemForm.value.type === 'recipe') {
      this.isRecipe = true;
    } else {
      this.isRecipe = false;
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

  mouseEnterIngredient(el, change) {
    // const icon = this.renderer.createElement('mat-icon');
    // const text = this.renderer.createText('close');
    // this.renderer.appendChild(icon, text);
    // //this.renderer.appendChild(el, icon);
    // //this.renderer.setStyle(el, 'color', 'blue');
    // //this.renderer.removeChild(el.nativeElement, el.textContent);
    // //el.nativeElement.appendChild = '<mat-icon>close</mat-icon>';
    // console.log('', el.nativeElement.style.color = 'red');
  }

  mouseLeaveIngredient(el, change) {
    el.textContent = change;
    console.log('', el);
  }

  ngOnDestroy() {
    this.searchService.confirmSearchPossibility(false);
  }

}
