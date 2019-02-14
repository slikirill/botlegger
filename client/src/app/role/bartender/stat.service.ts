import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  // public newOrders = new Subject<Object>();
  // public newOrders$ = this.newOrders.asObservable();

  // public fetchNewOrders(newOrders: Object) {
  //   this.newOrders.next(newOrders);
  // }

  public fetchNewOrders(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countNew').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchProgressOrders(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countProgress').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchReadyOrders(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/countReady').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchStopList(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/Items/countStopList').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchOpenedBills(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/SalesInvoices/countOpenedInvoices').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchShoppingList(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/Items/countShoppingList').pipe(
      map(data => {
        return data;
      })
    );
  } 

  constructor(private http: HttpClient) { }

}
