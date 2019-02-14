import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaiterService } from './../../waiter.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from './../../search.service';
import { Order } from './../../model/Order';

import {
  Observable,
  Subscription,
} from 'rxjs';


@Component({
  selector: 'app-waiter-order-list',
  templateUrl: './waiter-order-list.component.html',
  styleUrls: ['./waiter-order-list.component.css']
})
export class WaiterOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;

  public orders$: Observable<Order[]> = null;
  private filter: string | Boolean = false;

  constructor(
    private waiterService: WaiterService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.orders$ = this.waiterService.orders$;
        this.waiterService.getOrders(this.filter);
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'served':
        this.waiterService.serveOrder(id, index);
        break;
      default:
        break;
    }
    return true;
  }

  ngOnDestroy(): void {
    this._routes.unsubscribe();
  }

}
