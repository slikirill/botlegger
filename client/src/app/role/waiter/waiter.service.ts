import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { Item } from './../../model/Item';
import { Order } from './../../model/Order';
import { SaleInvoice } from './../../model/SaleInvoice';

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
      map(() => {
        return 'served';
      })
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrders', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return(data);
      })
    );
  }

  public findSaleInvoices(
    filter: string | Boolean = false,
    order = 'openedAt ASC',
    pageNumber = 0,
    pageSize = 1,
    openedDateBegin = null,
    openedDateEnd = null,
    closedDateBegin = null,
    closedDateEnd = null,
    ) {
    let offset = 0;
    if (pageNumber === 0) {
      offset = 0;
    } else {
      offset = pageSize * pageNumber + 1;
    }

    const openedFilter = openedDateBegin === null ? {} : {
      'openedAt': {
        between: [openedDateBegin, openedDateEnd]
      }
    };

    const closedFilter = closedDateBegin === null ? {} : {
      'closedAt': {
        between: [closedDateBegin, closedDateEnd]
      }
    };

    const stateFilter = !filter ? {} : {state: filter};

    const requestFilter = {
      limit: pageSize.toString(),
      order: order,
      skip: offset.toString(),
      where: {
        and: [
          openedFilter,
          closedFilter,
          stateFilter
        ]
      }
    };

    const params = new HttpParams()
    .set('filter', JSON.stringify(requestFilter));

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

  public getSaleInvoice(id: string): Observable<SaleInvoice>  {
    return this.http.get<SaleInvoice>('http://localhost:3000/api/SalesInvoices/' + id.toString()).pipe(
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
