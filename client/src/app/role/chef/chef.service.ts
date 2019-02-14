import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Order } from './model/Order';

import {
  map,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

  constructor(private http: HttpClient) { }

  public progressOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/progressOrder?id=' + id
    ).pipe(
      map(data => 'progress')
    );
  }

  public readyOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/readyOrder?id=' + id
    ).pipe(
      map(data => 'ready')
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrdersChef', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

}
