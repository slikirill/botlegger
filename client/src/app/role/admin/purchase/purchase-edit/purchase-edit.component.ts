import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AdminService } from './../../admin.service';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import { SearchService } from './../../search.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit, OnDestroy {

  public id: string;
  public editMode = false;
  public PurchaseInvoice;
  public purchaseInvoiceForm: FormGroup;
  public itemsForm:  FormGroup;
  public itemsArray: FormArray;
  public items = null;
  public searchInputSubscription;
  public searchInput = new Subject<string>();
  public searchItems = '';
  public profiled: Boolean = false;
  public fullText;

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
            this.adminService.searchItemsPurchaseInvoice(this.id).subscribe(items => {
              this.items = items;
              this.PurchaseInvoice = purchaseInvoice;
              this.profiled = this.PurchaseInvoice.profiled;
              if (!this.profiled) {
                this.searchService.confirmSearchPossibility(true);
                this.searchService.searchRequest$.subscribe(
                 fullText => {
                   this.fullText = fullText;
                   this.adminService.searchItemsPurchaseInvoice(this.id, this.fullText).subscribe(items => {
                    this.items = items;
                    this.initItemsForm();
                   });
                 });
              }
              this.initForm();
            });
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

    this.searchInputSubscription = this.searchInput.pipe(
      map((event: any) => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(1000)))
  ).subscribe((fullText) => {

    this.adminService.searchItemsPurchaseInvoice(this.id, fullText).subscribe(items => {
      this.items = items;
      this.initItemsForm();
    });
  });
  }

  private initForm() {
    this.purchaseInvoiceForm = new FormGroup({
      'supplierId': new FormControl({ value: this.editMode ? this.PurchaseInvoice.supplierId : '', disabled: this.profiled}, Validators.required),
      'id': new FormControl({ value: this.editMode ? this.PurchaseInvoice.id : null, disabled: this.profiled}),
      'date': new FormControl({ value: this.editMode ? this.PurchaseInvoice.date : '', disabled: this.profiled}, Validators.required),
      'total': new FormControl({value: this.editMode ? this.PurchaseInvoice.total : 0, disabled: true}),
    });

    this.initItemsForm();

  }

  initItemsForm() {
    this.itemsForm = new FormGroup({});
    this.itemsArray = new FormArray([]);
    this.items.forEach(item => {
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

      if (this.purchaseInvoiceForm.invalid) {
        this.purchaseInvoiceForm.get('supplierId').markAsTouched();
        this.purchaseInvoiceForm.get('date').markAsTouched();
        return;
      } else {
        this.adminService.updatePurchaseInvoice(this.purchaseInvoiceForm.getRawValue()).subscribe(
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

  onProfile() {
    this.adminService.profilePurchaseInvoice(this.purchaseInvoiceForm.getRawValue()).subscribe(
      (result: any) => {
        this.adminService.searchItemsPurchaseInvoice(this.id, '').subscribe(items => {
          console.log(result);
          this.profiled = true;
          if (!this.editMode) {
            this.router.navigate(['/admin/purchase/' + result.id + '/edit']);
          }
          this.items = items;
          this.initItemsForm();
        });

      },
      error => console.log(error)
    );
  }

  onUpdateItem(item, index: number) {
    this.adminService.updatePurchaseInvoiceItem(item).subscribe(
      result => {
        this.purchaseInvoiceForm.controls['total'].patchValue(result);
        //console.log(result);
      },
      error => console.log(error)
    );
  }

  onCountTotal(item, index: number) {
    const total = item.purchasePrice * item.quantity;
    this.itemsArray.controls[index].patchValue({'total': total});
  }

  ngOnDestroy() {
    this.searchService.clearSearchInput(true);
    this.searchService.confirmSearchPossibility(false);
  }

}
