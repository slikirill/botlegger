import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PurchaseInvoice } from './../../../model/PurchaseInvoice';
import { AdminService } from './../admin.service';
import { catchError, finalize } from 'rxjs/operators';



export class PurchaseInvoiceDatasource implements DataSource<PurchaseInvoice> {


  private purchaseInvoiceSubject = new BehaviorSubject<PurchaseInvoice[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public paginator;

  constructor(private adminService: AdminService) {

  }

  loadPurchaseInvoices(
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    startDate: Date = null,
    endDate: Date = null) {

    this.loadingSubject.next(true);

    this.adminService.findPurchaseInvoices(sortDirection,
      pageIndex, pageSize, startDate, endDate).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((purchaseInvoices: any) => {
        this.purchaseInvoiceSubject.next(purchaseInvoices.body);
        this.paginator.length = purchaseInvoices.headers.get('Content-Range').split('/')[1];
      });

  }

  connect(collectionViewer: CollectionViewer): Observable<PurchaseInvoice[]> {
    return this.purchaseInvoiceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('disconnect');
    this.purchaseInvoiceSubject.complete();
    this.loadingSubject.complete();
  }

}
