import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChefService } from './../chef.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ChefStatService } from './../stat.service';
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
  selector: 'app-chef-order-list',
  templateUrl: './chef-order-list.component.html',
  styleUrls: ['./chef-order-list.component.css']
})
export class ChefOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;

  private _orders: Subscription = new Subscription;
  public orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  public orders$ = this.orders.asObservable();

  private filter: string | Boolean = false;

  constructor(
    private chefService: ChefService,
    private route: ActivatedRoute,
    private statService: ChefStatService
    ) { }


  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this._orders.unsubscribe();
        this._orders = timer(0, 1000 * 30).pipe(
          switchMap(() => this.chefService.getOrders(this.filter))
        ).subscribe((result)  => this.orders.next(result));
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'progress':
        this.statService.changeCounter('newOrders', 'decrement');
        this.statService.changeCounter('progressOrders');
        this.chefService.progressOrder(id, index).subscribe(() => {
          this.orders.value[index].state = 'progress';
        });
        break;
      case 'ready':
        this.statService.changeCounter('progressOrders', 'decrement');
        this.statService.changeCounter('readyOrders');
        this.chefService.readyOrder(id, index).subscribe(() => {
          this.orders.value[index].state = 'ready';
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
