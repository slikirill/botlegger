import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaiterService } from '../../waiter.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from '../../search.service';
import { Order } from '../../model/Order';

import { switchMap } from 'rxjs/operators';

import {
  Observable,
  Subscription,
  timer,
  BehaviorSubject
} from 'rxjs';


@Component({
  selector: 'app-waiter-order-list',
  templateUrl: './waiter-order-list.component.html',
  styleUrls: ['./waiter-order-list.component.css']
})
export class WaiterOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;
  private _orders: Subscription;


  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

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
        console.log('', params.filter);
        this.filter = params.filter;
        this._orders = timer(0, 1000 * 30).pipe(
          switchMap(() => this.waiterService.getOrders(this.filter))
        ).subscribe(result => this.orders.next(result));
      }
    );
    console.log('', this.filter);
  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'served':
        this.waiterService.serveOrder(id, index).subscribe(
          data => this.orders.value[index].state = data
        );
        break;
      default:
        break;
    }
    return true;
  }

  ngOnDestroy(): void {
    this._routes.unsubscribe();
    this._orders.unsubscribe();
  }

}
