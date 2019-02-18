import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


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
  private purchaseInvoice: PurchaseInvoice[];
  private category: Category[];

  public items: BehaviorSubject<Item[]>  = new BehaviorSubject<Item[]>(null);
  public items$: Observable<Item[]> = this.items.asObservable();

  public orders: BehaviorSubject<Order[]>  = new BehaviorSubject<Order[]>(null);
  public orders$: Observable<Order[]> = this.orders.asObservable();

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
    return this.http.get<Item[]>('http://localhost:3000/api/Items/listItems', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public listShoppingList(fullText: string | Boolean = false){
    return this.http.get<Item[]>('http://localhost:3000/api/Items/listShoppingList', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

  public listStopList(fullText: string | Boolean = false){
    return this.http.get<Item[]>('http://localhost:3000/api/Items/listStopList', {
      params: new HttpParams()
        .set('fullText', fullText.toString())
    }).subscribe(
      data => this.items.next(data)
    );
  }

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

  public serveOrder(id, index) {
    return this.http.get('http://localhost:3000/api/relSalesInvoiceItems/serveOrder?id=' + id
    ).subscribe(
      () => this.orders.value[index].state = 'served'
    );
  }

  public getOrders(filter: string | Boolean = false) {
    return this.http.get<Order[]>('http://localhost:3000/api/relSalesInvoiceItems/listOrders', {
      params: new HttpParams()
        .set('filter', filter.toString())
    }).subscribe(
      (data: Order[]) => this.orders.next(data)
    );
  }


  public getItem(id): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/Items/' + id.toString()).pipe(
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

  public getRecipe(id): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('http://localhost:3000/api/Items/' + id + '/recipe').pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateItem(item) {
    return this.http.post('http://localhost:3000/api/Items/replaceOrCreate',  item).pipe(
      map(data => {
        return data;
      })
    );
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/Categories').pipe(
      map(data => {
        return data;
      })
    );
  }

  public updateIngredient(ingredient) {

    return this.http.post('http://localhost:3000/api/Ingredients/updateIngredient', {ingredient: ingredient}).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  public search(recipeId, fulltext = '') {
    return this.http.get('http://localhost:3000/api/Ingredients/search?recipeId=' + recipeId + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public findPurchaseInvoices(filter = '', order = 'id ASC', pageNumber = 0, pageSize = 1, startDate = null, endDate = null) {
    let offset = 0;
    if (pageNumber === 0) {
      offset = 0;
    } else {
      offset = pageSize * pageNumber + 1;
    }

    startDate = startDate === null ? '0000-09-30T21:00:00.000Z' : startDate.toISOString();
    endDate = endDate === null ? '9999-09-30T21:00:00.000Z' : endDate.toISOString();

    return this.http.get('http://localhost:3000/api/PurchaseInvoices',
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

  public getPurchaseInvoice(id: string): Observable<PurchaseInvoice[]>  {
    return this.http.get<PurchaseInvoice[]>('http://localhost:3000/api/PurchaseInvoices/' + id.toString()).pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchItemsPurchaseInvoice(id: string, fulltext = '') {
    return this.http.get('http://localhost:3000/api/relPurchaseInvoiceItems/searchItemsPurchaseInvoice?purchaseInvoiceId=' + id.toString() + '&fullText=' + fulltext).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updatePurchaseInvoiceItem(item) {
    return this.http.post('http://localhost:3000/api/relPurchaseInvoiceItems/updatePurchaseInvoiceItem', {item: item}).pipe(
      map(data => {

        return data;
      })
    );
  }

  public profilePurchaseInvoice(PurchaseInvoice) {
    return this.http.post('http://localhost:3000/api/PurchaseInvoices/profile',  {invoice: PurchaseInvoice}).pipe(
      map(data => {
        return data;
      })
    );
  }

  public updatePurchaseInvoice(PurchaseInvoice) {
    return this.http.post('http://localhost:3000/api/PurchaseInvoices/replaceOrCreate',  PurchaseInvoice).pipe(
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

    openedDateBegin = openedDateBegin === null ? '0000-09-30T21:00:00.000Z' : openedDateBegin.toISOString();
    openedDateEnd = openedDateEnd === null ? '9999-09-30T21:00:00.000Z' : openedDateEnd.toISOString();

    closedDateBegin = closedDateBegin === null ? '0000-09-30T21:00:00.000Z' : closedDateBegin.toISOString();
    closedDateEnd = closedDateEnd === null ? '9999-09-30T21:00:00.000Z' : closedDateEnd.toISOString();


    console.log('', openedDateBegin)

    console.log('', openedDateEnd)
    let params = new HttpParams()
    .set('filter[limit]', pageSize.toString())
    .set('filter[order]', order)
    .set('filter[limit]',  pageSize.toString() )
    .set('filter[skip]', offset.toString())
    .set('filter[where][openedAt][between][0]', openedDateBegin)
    .set('filter[where][openedAt][between][1]', openedDateEnd)
    .set('filter[where][closedAt][between][0]', closedDateBegin)
    .set('filter[where][closedAt][between][1]', closedDateEnd);
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

  uploadFile(fileToUpload: any) {
return this.http.post('http://localhost:3000/api/storages/images/upload', fileToUpload).pipe(
  map(data => {
    return data;
  })
);
  }
}
