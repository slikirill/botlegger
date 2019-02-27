import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './../admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminStatService } from './../stat.service';
import { Order } from './../../../model/Order';

import {
  Observable,
  Subscription,
  BehaviorSubject,
  timer
} from 'rxjs';
import {
  switchMap
} from 'rxjs/operators';
@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;
  private _orders: Subscription = new Subscription;

  public orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  public orders$ = this.orders.asObservable();
  private filter: string | Boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private statService: AdminStatService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this._orders.unsubscribe();
        this._orders = timer(0, 1000 * 30).pipe(
          switchMap(() => this.adminService.getOrders(this.filter))
        ).subscribe((result)  => this.orders.next(result));
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'progress':
        this.statService.changeCounter('newOrders', 'decrement');
        this.statService.changeCounter('progressOrders');
        this.adminService.progressOrder(id, index).subscribe(() => {
          this.orders.value[index].state = 'progress';
        });
        break;
      case 'ready':
        this.statService.changeCounter('progressOrders', 'decrement');
        this.statService.changeCounter('readyOrders');
        this.adminService.readyOrder(id, index).subscribe(() => {
          this.orders.value[index].state = 'ready';
        });
        break;
      case 'served':
        this.statService.changeCounter('readyOrders', 'decrement');
        this.adminService.serveOrder(id, index).subscribe(() => {
          this.orders.value[index].state = 'served';
        });
        break;
      default:
        break;
    }
    return true;
  }

  ngOnDestroy(): void {
    this._orders.unsubscribe();
    this._routes.unsubscribe();
  }

}
