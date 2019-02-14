import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './../../admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from './../../search.service';
import { Order } from './../../model/Order';

import {
  Observable,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;

  public orders$: Observable<Order[]> = null;
  private filter: string | Boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.orders$ = this.adminService.orders$;
        this.adminService.getOrders(this.filter);
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'served':
        this.adminService.serveOrder(id, index);
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
