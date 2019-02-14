import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Order } from './model/Order';

import {
  map,
  switchMap,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarmenService {

  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

  constructor(private http: HttpClient) { }

  public progressOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/progressOrder?id=' + id).subscribe(
      () => this.orders.value[index].state = 'progress'
    );
  }

  public readyOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/readyOrder?id=' + id
    ).subscribe(
      () => this.orders.value[index].state = 'ready'
    );
  }

  public getOrders(filter: string | Boolean = false) {
    timer(0, 1000 * 30).pipe(
      switchMap(() => this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrdersBarmen', {
          params: new HttpParams()
            .set('filter', filter.toString())
        }))
    ).subscribe((data: Order[]) => this.orders.next(data));
  }
}
