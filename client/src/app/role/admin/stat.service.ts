import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminStatService {
  public apiUrl = environment.apiUrl;
  public counterChange = new Subject<Object>();
  public counterChange$ = this.counterChange.asObservable();
  changeCounter(counterName: string, operation: string = 'increment') {
    this.counterChange.next({name: counterName, operation: operation});
  }

  public fetchNewOrders(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/relSalesInvoiceItems/countNew').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchProgressOrders(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/relSalesInvoiceItems/countProgress').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchReadyOrders(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/relSalesInvoiceItems/countReady').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchStopList(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/Items/countStopList').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchOpenedBills(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/SalesInvoices/countOpenedInvoices').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchShoppingList(): Observable<number> {
    return this.http.get<number>(this.apiUrl  + 'api/Items/countShoppingList').pipe(
      map(data => {
        return data;
      })
    );
  }

  constructor(private http: HttpClient) { }

}
