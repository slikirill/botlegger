import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarmenService } from './../../barmen.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from './../../search.service';
import { Order } from './../../model/Order';

import {
  Observable,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-barmen-order-list',
  templateUrl: './barmen-order-list.component.html',
  styleUrls: ['./barmen-order-list.component.css']
})
export class BarmenOrderListComponent  implements OnInit, OnDestroy {

  private _routes: Subscription;

  public orders$: Observable<Order[]> = null;
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
        this.orders$ = this.barmenService.orders$;
        this.barmenService.getOrders(this.filter);
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'progress':
        this.barmenService.progressOrder(id, index);
        break;
      case 'ready':
        this.barmenService.readyOrder(id, index);
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
