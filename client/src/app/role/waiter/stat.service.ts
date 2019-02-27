import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WaiterStatService {

  public counterChange = new Subject<Object>();
  public counterChange$ = this.counterChange.asObservable();
  changeCounter(counterName: string, operation: string = 'increment') {
    this.counterChange.next({name: counterName, operation: operation});
  }

  public fetchOpenedBills(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/SalesInvoices/countOpenedInvoices').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchNewOrders(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/relSalesInvoiceItems/countNew').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchProgressOrders(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/relSalesInvoiceItems/countProgress').pipe(
      map(data => {
        return data;
      })
    );
  }

  public fetchReadyOrders(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/relSalesInvoiceItems/countReady').pipe(
      map(data => {
        return data;
      })
    );
  }


  constructor(private http: HttpClient) { }

}
