import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { WaiterService } from './../waiter.service';
import { MatPaginator, MatSort } from '@angular/material';
import { SaleInvoice } from './../../../model/SaleInvoice';
import { tap } from 'rxjs/operators';
import { merge, Subscription, Observable } from 'rxjs';
import { SaleInvoiceDatasource } from './sale.invoice.datasource';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-waiter-sale-list',
  templateUrl: './waiter-sale-list.component.html',
  styleUrls: ['./waiter-sale-list.component.css']
})
export class WaiterSaleListComponent implements OnInit, AfterViewInit, OnDestroy {

  private _routes: Subscription;
  private saleInvoice: SaleInvoice;
  private filter: string | Boolean = false;
  private dataSource: SaleInvoiceDatasource;

  public revenue$: Observable<string> = null;
  public grossProfit$: Observable<string> = null;
  public netProfit$: Observable<string> = null;

  displayedColumns = [
    // 'id',
    'state',
    'openedAt',
    'closedAt',
    'total'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;
  openedDateForm = new FormControl();
  closedDateForm = new FormControl();
  openedDate = null;
  closedDate = null;
  openedDateBegin = null;
  closedDateBegin = null;
  openedDateEnd = null;
  closedDateEnd = null;
  closedDateFormat = 'shortTime';
  openedDateFormat = 'shortTime';
  constructor(private waiterService: WaiterService, private route: ActivatedRoute) { }

  ngOnInit() {
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

    this.openedDateForm = new FormControl({value: this.openedDate, disabled: false});
    this.closedDateForm = new FormControl({value: this.closedDate, disabled: false});

    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.dataSource = new SaleInvoiceDatasource(this.waiterService);
        this.revenue$ = this.dataSource.revenue$;
        this.grossProfit$ = this.dataSource.grossProfit$;
        this.netProfit$ = this.dataSource.netProfit$;

        console.log('', this.filter);
        this.dataSource.loadSaleInvoices(
          this.filter,
          'openedAt ASC',
          0,
          25,
          this.openedDateBegin,
          this.openedDateEnd,
          this.closedDateBegin,
          this.closedDateEnd);
      }
    );
  }


  ngOnDestroy() {
    this._routes.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSaleInvoicesPage())
      )
      .subscribe();

  }

  updateOpenedDate(type: string, event: MatDatepickerInputEvent<any>) {
    localStorage.setItem('openedDateBegin', event.value.begin);
    localStorage.setItem('openedDateEnd', event.value.end);
    this.openedDateBegin = event.value.begin;
    this.openedDateEnd = event.value.end;


    this.loadSaleInvoicesPage();
  }

  updateClosedDate(type: string, event: MatDatepickerInputEvent<any>) {
    localStorage.setItem('closedDateBegin', event.value.begin);
    localStorage.setItem('closedDateEnd', event.value.end);
    this.closedDateBegin = event.value.begin;
    this.closedDateEnd = event.value.end;
    this.loadSaleInvoicesPage();
  }

  openedCurrent() {
    const beginDate = new Date();
    beginDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    this.openedDateForm.setValue({begin: beginDate, end: endDate});
    localStorage.setItem('openedDateBegin', beginDate.toString());
    localStorage.setItem('openedDateEnd', endDate.toString());
    this.openedDateBegin = beginDate;
    this.openedDateEnd = endDate;
    this.loadSaleInvoicesPage();
  }

  openedDateTimeToggle() {
    this.openedDateFormat = this.openedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
    localStorage.setItem('openedDateFormat' , this.openedDateFormat);
  }

  openedReset() {
    this.openedDateForm.setValue('');
    localStorage.removeItem('openedDateBegin');
    localStorage.removeItem('openedDateEnd');
    this.openedDateBegin = null;
    this.openedDateEnd = null;
    this.loadSaleInvoicesPage();
  }

  closedCurrent() {
    const beginDate = new Date();
    beginDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    this.closedDateForm.setValue({begin: beginDate, end: endDate});
    localStorage.setItem('closedDateBegin', beginDate.toString());
    localStorage.setItem('closedDateEnd', endDate.toString());
    this.closedDateBegin = beginDate;
    this.closedDateEnd = endDate;
    this.loadSaleInvoicesPage();
  }

  closedDateTimeToggle() {
    this.closedDateFormat = this.closedDateFormat === 'shortTime' ? 'mediumDate' : 'shortTime';
    localStorage.setItem('endDateFormat' , this.closedDateFormat);
  }

  closedReset() {
    this.closedDateForm.setValue('');
    localStorage.removeItem('closedDateBegin');
    localStorage.removeItem('closedDateEnd');
    this.closedDateBegin = null;
    this.closedDateEnd = null;
    this.loadSaleInvoicesPage();
  }

  loadSaleInvoicesPage() {

    const sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();

    this.dataSource.loadSaleInvoices(
        this.filter,
        sort,
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.openedDateBegin,
        this.openedDateEnd,
        this.closedDateBegin,
        this.closedDateEnd,
      );
  }

}
