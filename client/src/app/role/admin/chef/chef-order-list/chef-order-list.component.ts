import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChefService } from './../../chef.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from './../../search.service';
import { Order } from './../../model/Order';

import {
  Observable,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-chef-order-list',
  templateUrl: './chef-order-list.component.html',
  styleUrls: ['./chef-order-list.component.css']
})
export class ChefOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;

  public orders$: Observable<Order[]> = null;
  private filter: string | Boolean = false;

  constructor(
    private chefService: ChefService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.orders$ = this.chefService.orders$;
        this.chefService.getOrders(this.filter);
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'progress':
        this.chefService.progressOrder(id, index);
        break;
      case 'ready':
        this.chefService.readyOrder(id, index);
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
