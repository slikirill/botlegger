import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaiterService } from './../waiter.service';
import { ActivatedRoute, Params } from '@angular/router';
import { WaiterStatService } from './../stat.service';
import { Order } from './../../../model/Order';

import {
  Subscription,
  BehaviorSubject,
  timer
} from 'rxjs';
import {
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-waiter-order-list',
  templateUrl: './waiter-order-list.component.html',
  styleUrls: ['./waiter-order-list.component.css']
})
export class WaiterOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;
  private _orders: Subscription = new Subscription;

  public orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  public orders$ = this.orders.asObservable();
  private filter: string | Boolean = false;

  constructor(
    private waiterService: WaiterService,
    private route: ActivatedRoute,
    private statService: WaiterStatService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this._orders.unsubscribe();
        this._orders = timer(0, 1000 * 30).pipe(
          switchMap(() => this.waiterService.getOrders(this.filter))
        ).subscribe((result)  => this.orders.next(result));
      }
    );
  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'served':
        this.statService.changeCounter('readyOrders', 'decrement');
        this.waiterService.serveOrder(id, index).subscribe(() => {
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
