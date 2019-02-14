import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SaleInvoice } from '../model/SaleInvoice';
import { AdminService } from './../admin.service';
import { catchError, finalize } from 'rxjs/operators';



export class SaleInvoiceDatasource implements DataSource<SaleInvoice> {


  private saleInvoiceSubject = new BehaviorSubject<SaleInvoice[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public paginator;

  constructor(private adminService: AdminService) {

  }

  loadSaleInvoices(
    filter: string | Boolean = false,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    startDate: Date = null,
    endDate: Date = null) {

    this.loadingSubject.next(true);

    this.adminService.findSaleInvoices(filter, sortDirection,
      pageIndex, pageSize, startDate, endDate).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((saleInvoices: any) => {
        this.saleInvoiceSubject.next(saleInvoices.body);
        this.paginator.length = saleInvoices.headers.get('Content-Range').split('/')[1];
      });

  } 

  connect(collectionViewer: CollectionViewer): Observable<SaleInvoice[]> {
    return this.saleInvoiceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('disconnect');
    this.saleInvoiceSubject.complete();
    this.loadingSubject.complete();
  }

}
