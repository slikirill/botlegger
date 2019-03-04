import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Item } from './../../model/Item';
import { Order } from './../../model/Order';
import { Category } from './../../model/Category';
import { Ingredient } from './../../model/Ingredient';
import { PurchaseInvoice } from './../../model/PurchaseInvoice';
import { SaleInvoice } from './../../model/SaleInvoice';

import {
  map,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public apiUrl = environment.apiUrl;
  public items: BehaviorSubject<Item[]>  = new BehaviorSubject<Item[]>(null);
  public items$: Observable<Item[]> = this.items.asObservable();


  constructor(private http: HttpClient) { }

  public getItems(filter: string | Boolean = false, fullText: string | Boolean = false) {
    if (!filter) {
      this.listItems(fullText);
    } else if (filter === 'shoppinglist') {
      this.listShoppingList(fullText);
    } else if (filter === 'stoplist') {
      this.listStopList(fullText);
    }
  }

  public listItems(fullText: string | Boolean = false){
    return this.http.get<Item[]>(this.apiUrl  + 'api/Items/listItems', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public listShoppingList(fullText: string | Boolean = false){
    return this.http.get<Item[]>(this.apiUrl  + 'api/Items/listShoppingList', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public listStopList(fullText: string | Boolean = false){
    return this.http.get<Item[]>(this.apiUrl  + 'api/Items/listStopList', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

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

  public serveOrder(id, index) {
    return this.http.get(this.apiUrl  + 'api/relSalesInvoiceItems/serveOrder?id=' + id
    ).pipe(
      map(() => {
        return 'served';
      })
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>(this.apiUrl  + 'api/relSalesInvoiceItems/listOrders', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).pipe(
      map(data => {
        return(data);
      })
    );
  }


  public getItem(id): Observable<Item> {
    return this.http.get<Item>(this.apiUrl  + 'api/Items/' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchMenuItems(fullText): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl  + 'api/Items/searchMenuItems?fullText=' + fullText.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public getRecipe(id): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl  + 'api/Items/' + id + '/recipe').pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateItem(item) {
    return this.http.post(this.apiUrl  + 'api/Items/replaceOrCreate',  item).pipe(
      map(data => {
        return data;
      })
    );
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl  + 'api/Categories').pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateIngredient(ingredient) {

    return this.http.post(this.apiUrl  + 'api/Ingredients/updateIngredient', {ingredient: ingredient}).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  public search(recipeId, fulltext = ''): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl  + 'api/Ingredients/search?recipeId=' + recipeId + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public findPurchaseInvoices(order = 'id ASC', pageNumber = 0, pageSize = 1, startDate = null, endDate = null) {
    let offset = 0;
    if (pageNumber === 0) {
      offset = 0;
    } else {
      offset = pageSize * pageNumber + 1;
    }

    startDate = startDate === null ? '0000-09-30T21:00:00.000Z' : startDate.toISOString();
    endDate = endDate === null ? '9999-09-30T21:00:00.000Z' : endDate.toISOString();

    return this.http.get(this.apiUrl  + 'api/PurchaseInvoices',
    {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }),
      params: new HttpParams()
        .set('filter[limit]', pageSize.toString())
        .set('filter[order]', order)
        .set('filter[limit]',  pageSize.toString() )
        .set('filter[skip]', offset.toString())
        .set('filter[where][date][between][0]', startDate)
        .set('filter[where][date][between][1]', endDate)
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

  public getPurchaseInvoice(id: string): Observable<PurchaseInvoice>  {
    return this.http.get<PurchaseInvoice>(this.apiUrl  + 'api/PurchaseInvoices/' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchItemsPurchaseInvoice(id: string, fulltext = '') {
    return this.http.get(this.apiUrl  + 'api/relPurchaseInvoiceItems/searchItemsPurchaseInvoice?purchaseInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updatePurchaseInvoiceItem(item) {
    return this.http.post(this.apiUrl  + 'api/relPurchaseInvoiceItems/updatePurchaseInvoiceItem', {item: item}).pipe(
      map(data => {
        return data;
      })
    );
  }

  public profilePurchaseInvoice(PurchaseInvoice) {
    return this.http.post(this.apiUrl  + 'api/PurchaseInvoices/profile',  {invoice: PurchaseInvoice}).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updatePurchaseInvoice(PurchaseInvoice) {
    return this.http.post(this.apiUrl  + 'api/PurchaseInvoices/replaceOrCreate',  PurchaseInvoice).pipe(
      map(data => {
        return data;
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

    return this.http.get(this.apiUrl  + 'api/SalesInvoices',
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

  public getSaleInvoice(id: string): Observable<SaleInvoice>  {
    return this.http.get<SaleInvoice>(this.apiUrl  + 'api/SalesInvoices/' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchItemsSaleInvoice(id: string, fulltext = ''): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl  + 'api/relSalesInvoiceItems/searchItemsSalesInvoice?salesInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateSaleInvoiceItem(item) {
    return this.http.post(this.apiUrl  + 'api/relSalesInvoiceItems/updateSalesInvoiceItem', {item: item}).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  public updateSaleInvoice(SaleInvoice) {
    console.log(SaleInvoice);
    return this.http.post(this.apiUrl  + 'api/SalesInvoices/replaceOrCreate',  SaleInvoice).pipe(
      map(data => {
        return data;
      })
    );
  }

  public addItemSaleInvoice(item) {
    return this.http.post(this.apiUrl  + 'api/relSalesInvoiceItems/addItemSaleInvoice', {item: item}).pipe(
      map(data => {
        return data;
      })
    );
  }

  public closeSaleInvoice(id) {
    return this.http.get(this.apiUrl  + 'api/SalesInvoices/closeSaleInvoice?salesInvoiceId=' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  uploadFile(fileToUpload: any) {
return this.http.post(this.apiUrl  + 'api/storages/images/upload', fileToUpload).pipe(
  map(data => {
    return data;
  })
);
  }
}
