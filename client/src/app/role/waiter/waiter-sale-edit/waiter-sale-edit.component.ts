import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { WaiterService } from './../waiter.service';
import { WaiterStatService } from './../stat.service';
import { SafePipe } from './../../../safe.pipe';
import {MatSnackBar} from '@angular/material';
import {WaiterSaleSnackbarComponent} from './sale-snackbar/sale-snackbar.component';
import { SearchService } from './../../../shared/dashboard/search.service';
import { SaleInvoice } from './../../../model/SaleInvoice';


import {
  Subject,
  BehaviorSubject,
  Subscription
} from 'rxjs';
@Component({
  selector: 'app-waiter-sale-edit',
  templateUrl: './waiter-sale-edit.component.html',
  styleUrls: ['./waiter-sale-edit.component.css']
})
export class WaiterSaleEditComponent implements OnInit, OnDestroy {

  @ViewChild('invoiceForm') invoiceForm: ElementRef;
  public id: string;
  public editMode = false;
  public saleInvoiceForm: FormGroup;
  public itemsForm:  FormGroup;
  public itemsArray: FormArray;
  public searchItemsForm:  FormGroup;
  public searchItemsArray: FormArray;
  public searchInputSubscription;
  public searchInput = new Subject<string>();
  public fullText;
  public closed = false;
  private _SaleInvoice: Subscription;
  public SaleInvoice: BehaviorSubject<SaleInvoice> = new BehaviorSubject<SaleInvoice>(
    {
      id: null,
      visitorId: 'New visitor',
      openedAt: new Date(),
      closedAt: null,
      state: 'opened',
      total: 0
    }
  );
  public SaleInvoice$ = this.SaleInvoice.asObservable();

  private _items: Subscription;
  public items: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public items$ = this.items.asObservable();

  private _searchItems: Subscription;
  public searchItems: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchItems$ = this.searchItems.asObservable();

  constructor(
    private route: ActivatedRoute,
    private waiterService: WaiterService,
    private router: Router,
    private safePipe: SafePipe,
    public snackBar: MatSnackBar,
    private searchService: SearchService,
    private statService: WaiterStatService
    ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        if (this.editMode === true) {
          this.waiterService.getSaleInvoice(this.id).subscribe(saleInvoice => {
            this.SaleInvoice.next(saleInvoice);
            this.closed = this.SaleInvoice.value.state === 'closed' ? true : false;
            if (!this.closed) {
              this.searchService.confirmSearchPossibility(true);
              this.searchService.searchRequest$.subscribe(
               fullText => {
                 this.fullText = fullText;
                 this.waiterService.searchMenuItems(this.fullText).subscribe(items => {
                  this.searchItems.next(items);
                 });
               });
            }
          });
          this.waiterService.searchItemsSaleInvoice(this.id).subscribe(items => {
            this.items.next(items);
          });
        } else {
          this.waiterService.updateSaleInvoice(
            this.SaleInvoice.value).subscribe(
            (result: any) => {
              console.log('', result);
              this.router.navigate(['/waiter/sale/' + result.id + '/edit']);
            },
            error => console.log(error)
          );
        }
      }
    );
    this._items = this.items.subscribe(data => {


      this.initItemsForm();
    });
    this._SaleInvoice = this.SaleInvoice.subscribe(data => {
        this.initForm();
      }
    );
    this._searchItems = this.searchItems.subscribe(data => {
      this.initSearchItemsForm();
    });
  }

  private saveInvoice() {
    // this.invoiceForm.nativeElement.submit();
  }

  private closeInvoice() {
    this.waiterService.closeSaleInvoice(this.id).subscribe(result => {
      if (result) {
        this.searchService.clearSearchInput(true);
        this.searchService.confirmSearchPossibility(false);
        this.closed = true;
        this.SaleInvoice.value.state = 'closed';
        this.statService.changeCounter('openedInvoices', 'decrement');
      }
    });
  }

  private initForm() {
    this.saleInvoiceForm = new FormGroup({
      'visitorId': new FormControl({value: this.SaleInvoice.value.visitorId, disabled: this.closed}),
      'id': new FormControl({value: this.SaleInvoice.value.id,  disabled: this.closed}, Validators.required),
      'openedAt': new FormControl({value: this.SaleInvoice.value.openedAt,  disabled: this.closed}, Validators.required),
      'closedAt': new FormControl({value: this.SaleInvoice.value.closedAt,  disabled: this.closed}),
      'total': new FormControl({value: this.SaleInvoice.value.total, disabled: true}),
      'state': new FormControl({value: this.SaleInvoice.value.state,  disabled: this.closed}, Validators.required),
    });
  }
  


  addItem(item, index) {
    this.waiterService.addItemSaleInvoice(item).subscribe(
      (result: any) => {
        if (!result.add) {
          if (result.availablePortions === 0) {
            this.showSnackbar({message: 'Sorry, you are not allowed to order this dish at the moment.'});
          }
          if (this.searchItemsArray.controls[index].value.quantity !== result.availablePortions) {
            this.showSnackbar({message: 'Sorry, but this dish is currently available in quantities of ' + result.availablePortions + ' servings'});
          }

          this.searchItemsArray.controls[index].patchValue({'quantity': result.availablePortions});
        } else {
          this.waiterService.getSaleInvoice(this.id).subscribe(saleInvoice => {
            this.waiterService.searchItemsSaleInvoice(this.id).subscribe(items => {
              this.items.next(items);
              this.SaleInvoice.next(saleInvoice);
              this.saleInvoiceForm.controls['total'].patchValue(result.total);
              this.searchItems.value.splice(index, 1);
              this.searchItemsArray.removeAt(index);
              this.searchItemsArray.updateValueAndValidity();
              this.statService.changeCounter('newOrders');
            });
          });
        }
      },
      error => console.log(error)
    );
  }

  changeQuantity(itemCtrl, i, add = true) {
    if (add === true) {
      this.searchItemsArray.controls[i].patchValue({'quantity': itemCtrl.quantity + 1});
    } else {
      if (itemCtrl.quantity === 1) {
        this.searchItemsArray.controls[i].patchValue({'quantity': itemCtrl.quantity});
      } else {
        this.searchItemsArray.controls[i].patchValue({'quantity': itemCtrl.quantity - 1});
      }
    }
  }

  initSearchItemsForm() {
    this.searchItemsForm = new FormGroup({});
    this.searchItemsArray = new FormArray([]);
    this.searchItems.value.forEach((item, key) => {
      this.searchItemsArray.push(
        new FormGroup({
          'itemId': new FormControl(item.id),
          'salesInvoiceId': new FormControl(this.id),
          'quantity': new FormControl(1),
        })
      );
    });

    this.searchItemsForm.addControl('searchItems', this.searchItemsArray);
  }


  initItemsForm() {
    this.itemsForm = new FormGroup({});
    this.itemsArray = new FormArray([]);
    this.items.value.forEach((item, key) => {
      this.itemsArray.push(
        new FormGroup({
          'itemId': new FormControl(item.itemId),
          'salesInvoiceId': new FormControl(item.salesInvoiceId),
          'quantity': new FormControl(item.quantity),
          'sellingPrice': new FormControl(item.sellingPrice),
          'id': new FormControl(item.id),
        })
      );
    });

    this.itemsForm.addControl('items', this.itemsArray);
  }

  onUpdate() {
    this.waiterService.updateSaleInvoice(this.saleInvoiceForm.getRawValue()).subscribe(
      (result: any) => {
        this.router.navigate(['/waiter/sale/' + result.id + '/edit']);
      },
      error => console.log(error)
    );
  }

  clearSearch(item, i) {
    this.searchService.clearSearchInput(true);
    // this.searchItems.value.splice(i, 1);
  }

  onUpdateItem(item, index: number) {
    this.waiterService.updateSaleInvoiceItem(item).subscribe(
      (result: any) => {
        this.saleInvoiceForm.controls['total'].patchValue(result.total);
      },
      error => console.log(error)
    );
  }

  showSnackbar(item: object) {
    this.openSnackBar(item);
  }

  openSnackBar(item: object) {
    this.snackBar.openFromComponent(WaiterSaleSnackbarComponent, {
      data: item,
      duration: 5000,
    });

  }

  ngOnDestroy() {
    this.searchService.clearSearchInput(true);
    this.searchService.confirmSearchPossibility(false);
    this._items.unsubscribe();
    this._searchItems.unsubscribe();
    this._SaleInvoice.unsubscribe();
  }
}
