import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChefService } from './../../chef.service';
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
  selector: 'app-chef-order-list',
  templateUrl: './chef-order-list.component.html',
  styleUrls: ['./chef-order-list.component.css']
})
export class ChefOrderListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;
  private _orders: Subscription;

  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

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
        this._orders = timer(0, 1000 * 30).pipe(
          switchMap(() => this.chefService.getOrders(this.filter))
        ).subscribe(result => this.orders.next(result));
      }
    );

  }

  changeState(id: string, state: string, index) {
    switch (state) {
      case 'progress':
      this.chefService.progressOrder(id, index).subscribe(
        data => this.orders.value[index].state = data
      );
        break;
      case 'ready':
      this.chefService.readyOrder(id, index).subscribe(
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
