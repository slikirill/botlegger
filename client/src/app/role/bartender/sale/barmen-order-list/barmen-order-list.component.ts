import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarmenService } from './../../barmen.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from './../../search.service';
import { Order } from './../../model/Order';

import { switchMap } from 'rxjs/operators';

import {
  Observable,
  Subscription,
  BehaviorSubject,
  timer
} from 'rxjs';

@Component({
  selector: 'app-barmen-order-list',
  templateUrl: './barmen-order-list.component.html',
  styleUrls: ['./barmen-order-list.component.css']
})
export class BarmenOrderListComponent  implements OnInit, OnDestroy {

  private _routes: Subscription;
  private _orders: Subscription;

  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

  private filter: string | Boolean = false;

  constructor(
    private barmenService: BarmenService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) { }

    ngOnInit() {
      this._routes = this.route.params
      .subscribe(
        (params: Params) => {
          this.filter = params.filter;
          this._orders = timer(0, 1000 * 30).pipe(
            switchMap(() => this.barmenService.getOrders(this.filter))
          ).subscribe(result => this.orders.next(result));
        }
      );
  
    }
  
    changeState(id: string, state: string, index) {
      switch (state) {
        case 'progress':
        this.barmenService.progressOrder(id, index).subscribe(
          data => this.orders.value[index].state = data
        );
          break;
        case 'ready':
        this.barmenService.readyOrder(id, index).subscribe(
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
