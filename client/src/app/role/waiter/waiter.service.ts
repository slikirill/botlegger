import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { Item } from './model/Item';
import { Order } from './model/Order';
import { SaleInvoice } from './model/SaleInvoice';

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
export class WaiterService {

  public items: BehaviorSubject<Item[]>  = new BehaviorSubject<Item[]>(null);
  public items$: Observable<Item[]> = this.items.asObservable();

  constructor(private http: HttpClient) { }

  public getItems(filter: string | Boolean = false, fullText: string | Boolean = false) {
    if (!filter) {
      this.listItems(fullText);
    } else if (filter === 'stoplist') {
      this.listStopList(fullText);
    }
  }

  public listItems(fullText: string | Boolean = false) {
    return this.http.get<Item[]>('http://localhost:3000/api/Items/listItems', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public listStopList(fullText: string | Boolean = false) {
    return this.http.get<Item[]>('http://localhost:3000/api/Items/listStopList', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public serveOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/serveOrder?id=' + id
    ).pipe(
      map(data => 'served')
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrders', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchMenuItems(fullText): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/Items/searchMenuItems?fullText=' + fullText.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public findSaleInvoices(
    filter: string | Boolean = false,
    order = 'id ASC',
    pageNumber = 0,
    pageSize = 1,
    startDate = null,
    endDate = null) {
    let offset = 0;
    if (pageNumber === 0) {
      offset = 0;
    } else {
      offset = pageSize * pageNumber + 1;
    }


    const fil = undefined;
    startDate = startDate === null ? '0000-09-30T21:00:00.000Z' : startDate.toISOString();
    endDate = endDate === null ? '9999-09-30T21:00:00.000Z' : endDate.toISOString();

    let params = new HttpParams()
    .set('filter[limit]', pageSize.toString())
    .set('filter[order]', order)
    .set('filter[limit]',  pageSize.toString() )
    .set('filter[skip]', offset.toString());

    if (filter === 'closed' || filter === 'opened') {
      params = params.set('filter[where][state]', filter);
    }

    return this.http.get('http://localhost:3000/api/SalesInvoices',
    {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }),
      params: params

    }).pipe(
      map(data => {
        // console.log(data);
        return data;
      })
    );
  }

  public getSaleInvoice(id: string): Observable<SaleInvoice[]>  {
    return this.http.get<SaleInvoice[]>('http://localhost:3000/api/SalesInvoices/' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchItemsSaleInvoice(id: string, fulltext = '') {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/searchItemsSalesInvoice?salesInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateSaleInvoiceItem(item) {
    return this.http.post('http://localhost:3000/api/relSalesInvoiceItems/updateSalesInvoiceItem', {item: item}).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  public updateSaleInvoice(SaleInvoice) {
    console.log(SaleInvoice);
    return this.http.post('http://localhost:3000/api/SalesInvoices/replaceOrCreate',  SaleInvoice).pipe(
      map(data => {
        return data;
      })
    );
  }

  public addItemSaleInvoice(item) {
    return this.http.post('http://localhost:3000/api/relSalesInvoiceItems/addItemSaleInvoice', {item: item}).pipe(
      map(data => {
        return data;
      })
    );
  }

  public closeSaleInvoice(id) {
    return this.http.get('http://localhost:3000/api/SalesInvoices/closeSaleInvoice?salesInvoiceId=' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

}
