import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { WaiterService } from './../../waiter.service';
import { MatPaginator, MatSort } from '@angular/material';
import { SaleInvoice } from './../../model/SaleInvoice';
import { SaleInvoiceDatasource } from './../sale.invoice.datasource';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  Observable,
  Subscription,
  merge,
} from 'rxjs';

import {
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-waiter-bill-list',
  templateUrl: './waiter-bill-list.component.html',
  styleUrls: ['./waiter-bill-list.component.css']
})
export class WaiterBillListComponent implements  OnInit, AfterViewInit, OnDestroy {

  private _routes: Subscription;
  private _sort: Subscription;
  private saleInvoice: SaleInvoice;
  private filter: string | Boolean = false;
  private dataSource: SaleInvoiceDatasource;

  displayedColumns = [
    'id',
    'openedAt',
    'closedAt',
    'state',
    'total'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  startDate: Date;
  endDate: Date;


  constructor(private waiterService: WaiterService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.dataSource = new SaleInvoiceDatasource(this.waiterService);
        this.dataSource.loadSaleInvoices(this.filter, 'id ASC', 0, 25);
      }
    );
  }

  ngOnDestroy() {
    this._routes.unsubscribe();
    this._sort.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._sort = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSaleInvoicesPage())
      )
      .subscribe();

  }

  updateStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.loadSaleInvoicesPage();
  }

  updateEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    this.loadSaleInvoicesPage();
  }

  loadSaleInvoicesPage() {

    const sort = this.sort.active === undefined ? 'id ASC' : this.sort.active + ' ' + this.sort.direction.toUpperCase();

    this.dataSource.loadSaleInvoices(
      this.filter,
      sort,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.startDate,
      this.endDate);
  }

}
