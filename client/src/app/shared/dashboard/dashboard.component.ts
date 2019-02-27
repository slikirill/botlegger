import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router} from '@angular/router';

  import {
    distinctUntilChanged,
    debounceTime,
    map,
    switchMap
  } from 'rxjs/operators';
  import {
    timer,
    Subscription,
    BehaviorSubject,
    Subject
  } from 'rxjs';
  import {
    MediaChange,
    ObservableMedia
  } from '@angular/flex-layout';

import { AuthService } from './../../auth/auth.service';
import { SearchService } from './search.service';
import { AdminStatService } from './../../role/admin/stat.service';
import { BarmanStatService } from './../../role/barman/stat.service';
import { ChefStatService } from './../../role/chef/stat.service';
import { WaiterStatService } from './../../role/waiter/stat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private  _searchInputSubscription: Subscription;
  private _newOrders: Subscription;
  private _progressOrders: Subscription;
  private _readyOrders: Subscription;
  private _stopList: Subscription;
  private _openedInvoices: Subscription;
  private _shoppingList: Subscription;

  public isOpen = true;
  public mode = 'over';
  public mediaChange;
  public url;
  public searchReq = '';
  public searchInput = new Subject<string>();
  public role = null;

  public searchValue = '';
  public searchPossible: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public searchPossible$ = this.searchPossible.asObservable();
  public statService;
  public newOrders: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public newOrders$ = this.newOrders.asObservable();
  public progressOrders: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  public progressOrders$ = this.progressOrders.asObservable();
  public readyOrders: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  public readyOrders$ = this.readyOrders.asObservable();
  public stopList: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  public stopList$ = this.stopList.asObservable();
  public openedInvoices: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  public openedInvoices$ = this.openedInvoices.asObservable();
  public shoppingList: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  public shoppingList$ = this.shoppingList.asObservable();


  constructor(
    public $media: ObservableMedia,
    public router: Router,
    public searchService: SearchService,
    private injector: Injector,
    private authService: AuthService
  ) {
    this.role = this.authService.getRole();
    switch (this.role) {
      case 'admin':
        this.statService = <AdminStatService>this.injector.get(AdminStatService);
        break;
      case 'barman':
        this.statService = <BarmanStatService>this.injector.get(BarmanStatService);
        break;
      case 'chef':
        this.statService = <ChefStatService>this.injector.get(ChefStatService);
        break;
      case 'waiter':
        this.statService = <WaiterStatService>this.injector.get(WaiterStatService);
        break;
      default:
        break;
    }
  }

  ngOnInit() {

    this._subscription = this.$media.subscribe((change: MediaChange) => {
      this.isOpen = (change.mqAlias !== 'xs');
      this.mediaChange = change;
      this.mode = this.isOpen === true ? 'side' : 'over';
    });

    if (typeof this.statService.fetchNewOrders === 'function') {
      this._newOrders = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchNewOrders())
      ).subscribe((result: number)  => this.newOrders.next(result));
    }

    if (typeof this.statService.fetchProgressOrders === 'function') {
      this._progressOrders = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchProgressOrders())
      ).subscribe((result: number) => this.progressOrders.next(result));
    }

    if (typeof this.statService.fetchReadyOrders === 'function') {
      this._readyOrders = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchReadyOrders())
      ).subscribe((result: number)  => this.readyOrders.next(result));
    }

    if (typeof this.statService.fetchStopList === 'function') {
      this._stopList = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchStopList())
      ).subscribe((result: number)  => this.stopList.next(result));
    }

    if (typeof this.statService.fetchOpenedBills === 'function') {
      this._openedInvoices = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchOpenedBills())
      ).subscribe((result: number)  => this.openedInvoices.next(result));
    }

    if (typeof this.statService.fetchShoppingList === 'function') {
      this._shoppingList = timer(0, 1000 * 30).pipe(
        switchMap(() => this.statService.fetchShoppingList())
      ).subscribe((result: number)  => this.shoppingList.next(result));
    }

    this.searchService.searchPossible$.subscribe(
      searchPossibility => {
        setTimeout(() => this.searchPossible.next(searchPossibility), 0 );
      });
      this.searchService.clear$.subscribe(
        clear => {
          this.searchValue = null;
        });
        this.statService.counterChange$.subscribe(
          counterData => {
            counterData.operation === 'increment' ?
            this[counterData.name].next(this[counterData.name].value + 1) :
            this[counterData.name].next(this[counterData.name].value - 1);
          });

    this._searchInputSubscription = this.searchInput.pipe(
      map((evt: any) => evt.target.value),
      // filter(res => res.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((fullText) => {
      this.searchService.sendRequest(fullText);
    });
  }



  sendRequest(event) {
    this.searchService.sendRequest(event.target.value);
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._searchInputSubscription.unsubscribe();
    if (typeof this.statService.fetchNewOrders === 'function') {
      this._newOrders.unsubscribe();
    }
    if (typeof this.statService.fetchProgressOrders === 'function') {
      this._progressOrders.unsubscribe();
    }
    if (typeof this.statService.fetchReadyOrders === 'function') {
      this._readyOrders.unsubscribe();
    }
    if (typeof this.statService.fetchStopList === 'function') {
      this._stopList.unsubscribe();
    }
    if (typeof this.statService.fetchOpenedBills === 'function') {
      this._openedInvoices.unsubscribe();
    }
    if (typeof this.statService.fetchShoppingList === 'function') {
      this._shoppingList.unsubscribe();
    }
  }
}
