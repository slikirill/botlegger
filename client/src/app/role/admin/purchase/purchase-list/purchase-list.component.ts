import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from './../../admin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PurchaseInvoice } from './../../model/PurchaseInvoice';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { PurchaseInvoiceDatasource } from './../purchase.invoice.datasource';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit, AfterViewInit  {

  purchaseInvoice: PurchaseInvoice;

  dataSource: PurchaseInvoiceDatasource;

  displayedColumns = [
    'id',
    'supplierId',
    'date',
    'total'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  startDate: Date;
  endDate: Date;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.dataSource = new PurchaseInvoiceDatasource(this.adminService);
    this.dataSource.loadPurchaseInvoices('', 'id ASC', 0, 25);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadPurchaseInvoicesPage();
    //     })
    //   )
    //   .subscribe();


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPurchaseInvoicesPage())
      )
      .subscribe();

  }

  updateStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.loadPurchaseInvoicesPage();
  }

  updateEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    this.loadPurchaseInvoicesPage();
  }

  loadPurchaseInvoicesPage() {

    const sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();

    this.dataSource.loadPurchaseInvoices(
      this.input.nativeElement.value,
      sort,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.startDate,
      this.endDate);
  }
}
