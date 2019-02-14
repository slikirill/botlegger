import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Observable string sources

  public searchPossible = new Subject<boolean>();
  private searchRequest = new Subject<string>();
  private clear = new Subject<Boolean>();

  // Observable string streams
  searchPossible$ = this.searchPossible.asObservable();
  searchRequest$ = this.searchRequest.asObservable();
  clear$ = this.clear.asObservable();

  // Service message commands
  sendRequest(searchRequest: string) {
    this.searchRequest.next(searchRequest);
  }

  clearSearchInput(clear: Boolean = true) {
    this.clear.next(true);
  }

  confirmSearchPossibility(searchPossible: boolean) {
    this.searchPossible.next(searchPossible);
  }
}
