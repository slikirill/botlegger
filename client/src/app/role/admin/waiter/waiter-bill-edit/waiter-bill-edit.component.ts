import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AdminService } from './../../admin.service';
import {Subject} from 'rxjs';
import { SafePipe } from './../../../../safe.pipe';
import {MatSnackBar} from '@angular/material';
import {WaiterSaleSnackbarComponent} from './sale-snackbar/sale-snackbar.component';
import { SearchService } from './../../search.service';


@Component({
  selector: 'app-waiter-bill-edit',
  templateUrl: './waiter-bill-edit.component.html',
  styleUrls: ['./waiter-bill-edit.component.css']
})
export class WaiterBillEditComponent implements  OnInit, OnDestroy {

  @ViewChild('invoiceForm') invoiceForm: ElementRef;
  public id: string;
  public editMode = false;
  public SaleInvoice;
  public saleInvoiceForm: FormGroup;
  public itemsForm:  FormGroup;
  public itemsArray: FormArray;
  public items = null;
  public searchItemsForm:  FormGroup;
  public searchItemsArray: FormArray;
  public searchItems = null;
  public searchInputSubscription;
  public searchInput = new Subject<string>();
  public stateIcon: string;
  public timeLogs: any;
  public fullText;
  public closed = false;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private safePipe: SafePipe,
    public snackBar: MatSnackBar,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        if (this.editMode === true) {
          this.adminService.getSaleInvoice(this.id).subscribe(saleInvoice => {
            this.adminService.searchItemsSaleInvoice(this.id).subscribe(items => {
              this.items = items;
              this.SaleInvoice = saleInvoice;
              this.closed = this.SaleInvoice.state === 'closed' ? true : false;
              if (!this.closed) {
                this.searchService.confirmSearchPossibility(true);
                this.searchService.searchRequest$.subscribe(
                 fullText => {
                   this.fullText = fullText;
                   this.adminService.searchMenuItems(this.fullText).subscribe(items => {
                    this.searchItems = items;
                    this.initSearchItemsForm();
                   });
                 });
              }
              console.log('', this.SaleInvoice);
              this.initForm();
            });
          });
        } else {
          this.adminService.updateSaleInvoice(
            {visitorId: 'New visitor', openedAt: new Date(), closedAt: null, total: 0, state: 'opened'}).subscribe(
            (result: any) => {
              console.log('', result);
              this.router.navigate(['/admin/waiter/bill/' + result.id + '/edit']);
            },
            error => console.log(error)
          );
        }
      }
    );
  }

  private saveInvoice() {
    this.invoiceForm.nativeElement.submit();
    console.log('', 'ok');
  }

  private closeInvoice() {
    this.adminService.closeSaleInvoice(this.id).subscribe(result => {
      console.log('', 'closed');
      this.initForm();
    });
  }

  private initForm() {

    this.saleInvoiceForm = new FormGroup({
      'visitorId': new FormControl({value: this.editMode ? this.SaleInvoice.visitorId : 'New visitor', disabled: this.closed}),
      'id': new FormControl({value: this.editMode ? this.SaleInvoice.id : null,  disabled: this.closed}, Validators.required),
      'openedAt': new FormControl({value: this.editMode ? this.SaleInvoice.openedAt : '',  disabled: this.closed}, Validators.required),
      'closedAt': new FormControl({value: this.editMode ? this.SaleInvoice.closedAt : '',  disabled: this.closed}),
      'total': new FormControl({value: this.editMode ? this.SaleInvoice.total : 0, disabled: true}),
      'state': new FormControl({value: this.editMode ? this.SaleInvoice.state : '',  disabled: this.closed}, Validators.required),
    });

    this.initItemsForm();

  }


  addItem(item, index) {
    this.adminService.addItemSaleInvoice(item).subscribe(
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
          this.adminService.getSaleInvoice(this.id).subscribe(saleInvoice => {
            this.adminService.searchItemsSaleInvoice(this.id).subscribe(items => {
              this.items = items;
              this.SaleInvoice = saleInvoice;
              this.searchItems = false;
              this.initForm();
            });
          });
        }
        console.log('', result);
      },
      error => console.log(error)
    );
    console.log('', item);
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
    this.searchItems.forEach((item, key) => {

      console.log('', item);
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
    this.items.forEach((item, key) => {

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
    this.adminService.updateSaleInvoice(this.saleInvoiceForm.getRawValue()).subscribe(
      (result: any) => {
        this.router.navigate(['/admin/waiter/bill/' + result.id + '/edit']);
      },
      error => console.log(error)
    );
  }

  clearSearch(item, i) {
    this.searchService.clearSearchInput(true);
    this.searchItems = false;
    console.log('', item);
  }

  onUpdateItem(item, index: number) {
    this.adminService.updateSaleInvoiceItem(item).subscribe(
      (result: any) => {
        this.saleInvoiceForm.controls['total'].patchValue(result);
        console.log(result);
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
  }

}
