import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
  import {
    distinctUntilChanged,
    debounceTime,
    filter,
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

import { SearchService } from './../search.service';
import { StatService } from './../stat.service';


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

  public searchValue = '';
  public searchPossible = false;

  public newOrders: BehaviorSubject<Object> = new BehaviorSubject<Object>(0);
  public newOrders$ = this.newOrders.asObservable();
  public progressOrders: BehaviorSubject<Object>  = new BehaviorSubject<Object>(0);
  public progressOrders$ = this.progressOrders.asObservable();
  public readyOrders: BehaviorSubject<Object>  = new BehaviorSubject<Object>(0);
  public readyOrders$ = this.readyOrders.asObservable();
  public stopList: BehaviorSubject<Object>  = new BehaviorSubject<Object>(0);
  public stopList$ = this.stopList.asObservable();
  public openedInvoices: BehaviorSubject<Object>  = new BehaviorSubject<Object>(0);
  public openedInvoices$ = this.openedInvoices.asObservable();
  public shoppingList: BehaviorSubject<Object>  = new BehaviorSubject<Object>(0);
  public shoppingList$ = this.shoppingList.asObservable();


  constructor(
    public $media: ObservableMedia,
    public router: Router,
    public searchService: SearchService,
    public statService: StatService
  ) {}

  ngOnInit() {
    this._subscription = this.$media.subscribe((change: MediaChange) => {
      this.isOpen = (change.mqAlias !== 'xs');
      this.mediaChange = change;
      this.mode = this.isOpen === true ? 'side' : 'over';
    });

    this._newOrders = timer(0, 1000 * 30).pipe(
      switchMap(() => this.statService.fetchNewOrders())
    ).subscribe(result => this.newOrders.next(result));

    this._progressOrders = timer(0, 1000 * 30).pipe(
      switchMap(() => this.statService.fetchProgressOrders())
    ).subscribe(result => this.progressOrders.next(result));

    this._readyOrders = timer(0, 1000 * 30).pipe(
      switchMap(() => this.statService.fetchReadyOrders())
    ).subscribe(result => this.readyOrders.next(result));


    this._openedInvoices = timer(0, 1000 * 30).pipe(
      switchMap(() => this.statService.fetchOpenedBills())
    ).subscribe(result => this.openedInvoices.next(result));


    this.searchService.searchPossible$.subscribe(
      searchPossibility => {
        this.searchPossible = searchPossibility;
      });
      this.searchService.clear$.subscribe(
        clear => {
          this.searchValue = null;
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
    this._newOrders.unsubscribe();
    this._progressOrders.unsubscribe();
    this._readyOrders.unsubscribe();
    this._openedInvoices.unsubscribe();
  }
}
