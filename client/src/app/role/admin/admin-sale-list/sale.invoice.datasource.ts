import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SaleInvoice } from './../../../model/SaleInvoice';
import { AdminService } from './../admin.service';
import { catchError, finalize } from 'rxjs/operators';



export class SaleInvoiceDatasource implements DataSource<SaleInvoice> {


  private saleInvoiceSubject = new BehaviorSubject<SaleInvoice[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public revenue: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  public revenue$ = this.revenue.asObservable();
  public grossProfit: BehaviorSubject<string>  = new BehaviorSubject<string>('0');
  public grossProfit$ = this.grossProfit.asObservable();
  public netProfit: BehaviorSubject<string>  = new BehaviorSubject<string>('0');
  public netProfit$ = this.netProfit.asObservable();

  public loading$ = this.loadingSubject.asObservable();

  public paginator;

  constructor(private adminService: AdminService) {

  }

  loadSaleInvoices(
    filter: string | Boolean = false,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    openedDateBegin = null,
    openedDateEnd = null,
    closedDateBegin = null,
    closedDateEnd = null) {

    this.loadingSubject.next(true);

    this.adminService.findSaleInvoices(filter, sortDirection,
      pageIndex, pageSize, openedDateBegin, openedDateEnd, closedDateBegin, closedDateEnd).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((saleInvoices: any) => {
        this.saleInvoiceSubject.next(saleInvoices.body.result);
        this.revenue.next(saleInvoices.body.revenue);
        this.grossProfit.next(saleInvoices.body.grossProfit);
        this.netProfit.next(saleInvoices.body.netProfit);
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
