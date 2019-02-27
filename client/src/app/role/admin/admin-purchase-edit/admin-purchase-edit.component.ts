import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AdminService } from './../admin.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import { SearchService } from './../../../shared/dashboard/search.service';
import { PurchaseInvoice } from './../../../model/PurchaseInvoice';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin-purchase-edit',
  templateUrl: './admin-purchase-edit.component.html',
  styleUrls: ['./admin-purchase-edit.component.css'],
})
export class AdminPurchaseEditComponent implements OnInit, OnDestroy {

  public id: string;
  public editMode = false;
  public _PurchaseInvoice: Subscription;
  public PurchaseInvoice: BehaviorSubject<PurchaseInvoice> = new BehaviorSubject<PurchaseInvoice>(
    {
      id: null,
      supplierId: 'Tube',
      date: new Date(),
      profiled: false,
      total: 0
    }
  );
  public PurchaseInvoice$ = this.PurchaseInvoice.asObservable();

  private _items: Subscription;
  public items: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public items$ = this.items.asObservable();

  public purchaseInvoiceForm: FormGroup;
  public itemsForm:  FormGroup;
  public itemsArray: FormArray;

  public profiled: Boolean = false;
  public fullText;
  public total;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        if (this.editMode === true) {
          this.adminService.getPurchaseInvoice(this.id).subscribe(purchaseInvoice => {
            this.PurchaseInvoice.next(purchaseInvoice);
          });
          this.adminService.searchItemsPurchaseInvoice(this.id).subscribe(items => {
            this.items.next(items);
          });
        } else {
          this.adminService.updatePurchaseInvoice({supplierId: 'Tube', date: new Date(), total: 0}).subscribe(
            (result: any) => {
              console.log(result);
              if (!this.editMode) {
                this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
              }
            },
            error => console.log(error)
          );
        }
      }
    );
    this._items = this.items.subscribe(() => {
      this.initItemsForm();
    });
    this._PurchaseInvoice = this.PurchaseInvoice.subscribe(data => {
      this.total = this.PurchaseInvoice.value.total;
      this.profiled = this.PurchaseInvoice.value.profiled;
        if (!this.profiled) {
          this.searchService.confirmSearchPossibility(true);
          this.searchService.searchRequest$.subscribe(
          fullText => {
            this.fullText = fullText;
            this.adminService.searchItemsPurchaseInvoice(this.id, this.fullText).subscribe(items => {
              this.items.next(items);
            });
          });
        }
        this.initForm();
      }
    );
  }

  private initForm() {
    this.purchaseInvoiceForm = new FormGroup({
      'supplierId': new FormControl({ value: this.PurchaseInvoice.value.supplierId, disabled: this.profiled}, Validators.required),
      'id': new FormControl({ value: this.PurchaseInvoice.value.id, disabled: this.profiled}),
      'date': new FormControl({ value: this.PurchaseInvoice.value.date, disabled: this.profiled}, Validators.required),
      'total': new FormControl({value: this.PurchaseInvoice.value.total, disabled: true}),
    });

    this.initItemsForm();

  }

  initItemsForm() {
    this.itemsForm = new FormGroup({});
    this.itemsArray = new FormArray([]);
    this.items.value.forEach(item => {
      this.itemsArray.push(
        new FormGroup({
          'itemId': new FormControl({ value: item.itemId, disabled: this.profiled}),
          'purchaseInvoiceId': new FormControl({ value: item.purchaseInvoiceId, disabled: this.profiled}),
          'quantity': new FormControl({ value: item.quantity, disabled: this.profiled}),
          'purchasePrice': new FormControl({ value: item.purchasePrice, disabled: this.profiled}),
          'total': new FormControl({value: item.total, disabled: true}),
          'id': new FormControl({ value: item.id, disabled: this.profiled}),
        })
      );
    });
    this.itemsForm.addControl('items', this.itemsArray);
  }

  onUpdate() {
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
  }

  onProfile() {
    this.adminService.profilePurchaseInvoice(this.purchaseInvoiceForm.getRawValue()).subscribe(
      (result: any) => {
        this.adminService.searchItemsPurchaseInvoice(this.id, '').subscribe(items => {
          if (!this.editMode) {
            this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
          }
          this.PurchaseInvoice.value.profiled = true;
          this.items.next(items);
        });
      },
      error => console.log(error)
    );
  }

  onUpdateItem(item, index: number) {
    this.adminService.updatePurchaseInvoiceItem(item).subscribe(
      result => {
        this.total = Number(result);
        this.PurchaseInvoice.value.total = Number(result);
      },
      error => console.log(error)
    );
  }

  onCountTotal(item, index: number) {
    const total = item.purchasePrice * item.quantity;
    this.items.value[index].total = total;
    this.itemsArray.controls[index].patchValue({'total': total});
  }

  ngOnDestroy() {
    this.searchService.clearSearchInput(true);
    this.searchService.confirmSearchPossibility(false);
  }

}
