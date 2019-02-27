import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AdminService } from './../admin.service';
import { Item } from './../../../model/Item';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from './../../../shared/dashboard/search.service';


import {
  Observable,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-admin-item-list',
  templateUrl: './admin-item-list.component.html',
  styleUrls: ['./admin-item-list.component.css']
})
export class AdminItemListComponent implements OnInit, OnDestroy {

  private _routes: Subscription;

  public items$: Observable<Item[]> = null;
  private filter: string | Boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this._routes = this.route.params
    .subscribe(
      (params: Params) => {
        this.filter = params.filter;
        this.searchService.confirmSearchPossibility(true);
        this.searchService.searchRequest$.subscribe(
         fullText => {
           this.adminService.getItems(this.filter, fullText);
         });
        this.items$ = this.adminService.items$;
        this.adminService.getItems(this.filter);
      }
    );
  }

  ngOnDestroy(): void {
    this._routes.unsubscribe();
    this.searchService.confirmSearchPossibility(false);
  }
}
