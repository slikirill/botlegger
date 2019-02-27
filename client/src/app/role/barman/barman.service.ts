import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { Order } from './../../model/Order';

import {
  map,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarmanService {

  constructor(private http: HttpClient) { }

  public progressOrder(id, index) {
    return this.http.get<Order>('http://localhost:3000/api/relSalesInvoiceItems/progressOrder?id=' + id).pipe(
      map(() => {
        return 'progress';
      })
    );
  }

  public readyOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/readyOrder?id=' + id
    ).pipe(
      map(() => {
        return 'ready';
      })
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrdersBarman', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return(data);
      })
    );
  }
}
