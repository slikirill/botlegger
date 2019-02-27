import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from './../admin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PurchaseInvoice } from './../../../model/PurchaseInvoice';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { PurchaseInvoiceDatasource } from './purchase.invoice.datasource';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-purchase-list',
  templateUrl: './admin-purchase-list.component.html',
  styleUrls: ['./admin-purchase-list.component.css']
})
export class AdminPurchaseListComponent implements OnInit, AfterViewInit  {

  purchaseInvoice: PurchaseInvoice;
  dateFormat = 'shortTime';
  dataSource: PurchaseInvoiceDatasource;
  date = null;
  dateBegin = null;
  dateEnd = null;
  dateForm = new FormControl();
  displayedColumns = [
    'id',
    'supplierId',
    'date',
    'total'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.dataSource = new PurchaseInvoiceDatasource(this.adminService);
    this.dataSource.loadPurchaseInvoices('id ASC', 0, 25);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPurchaseInvoicesPage())
      )
      .subscribe();

  }

  updateDate(type: string, event: MatDatepickerInputEvent<any>) {
    localStorage.setItem('dateBegin', event.value.begin);
    localStorage.setItem('dateEnd', event.value.end);
    this.dateBegin = event.value.begin;
    this.dateEnd = event.value.end;
    this.loadPurchaseInvoicesPage();
  }

  currentDate() {
    const beginDate = new Date();
    beginDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    this.dateForm.setValue({begin: beginDate, end: endDate});
    localStorage.setItem('dateBegin', beginDate.toString());
    localStorage.setItem('dateEnd', endDate.toString());
    this.dateBegin = beginDate;
    this.dateEnd = endDate;
    this.loadPurchaseInvoicesPage();
  }

  dateTimeToggle() {
    this.dateFormat = this.dateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
    localStorage.setItem('dateFormat' , this.dateFormat);
  }

  resetDate() {
    this.dateForm.setValue('');
    localStorage.removeItem('dateBegin');
    localStorage.removeItem('dateEnd');
    this.dateBegin = null;
    this.dateEnd = null;
    this.loadPurchaseInvoicesPage();
  }

  loadPurchaseInvoicesPage() {

    const sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();

    this.dataSource.loadPurchaseInvoices(
      sort,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.dateBegin,
      this.dateEnd);
  }
}
