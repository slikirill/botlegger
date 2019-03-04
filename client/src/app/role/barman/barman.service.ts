import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public progressOrder(id, index) {
    return this.http.get<Order>(this.apiUrl  + 'api/relSalesInvoiceItems/progressOrder?id=' + id).pipe(
      map(() => {
        return 'progress';
      })
    );
  }

  public readyOrder(id, index) {
    return this.http.get(this.apiUrl  + 'api/relSalesInvoiceItems/readyOrder?id=' + id
    ).pipe(
      map(() => {
        return 'ready';
      })
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>(this.apiUrl  + 'api/relSalesInvoiceItems/listOrdersBarman', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return(data);
      })
    );
  }
}
