import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import {Observable, of, Subject, interval, } from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-sale-snackbar',
  templateUrl: './sale-snackbar.component.html',
  styleUrls: ['./sale-snackbar.component.css']
})
export class WaiterSaleSnackbarComponent implements OnInit, AfterViewInit {

  constructor(    public snackBarRef: MatSnackBarRef<WaiterSaleSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data) {
      this.time$ = interval(1000).pipe(
        map(val => new Date())
      );
      this.initTimer(this.data);
    }
    message$: Observable<string>;
    newAt$: Observable<string>;
    newTime;
    time$;

    ticks = 0;

    initTimer(data) {
      this.newAt$ = interval(1000).pipe(
          map((val) => {
            const newAt = new Date(data.newAt);
            const startTime = new Date(data.newAt);
            const endTime = new Date();
            let timeDiff = Number(endTime) - Number(startTime);
            timeDiff /= 1000;
            const seconds = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            const minutes = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            const hours = Math.round(timeDiff % 24);
            timeDiff = Math.floor(timeDiff / 24);
            const days = timeDiff;
            newAt.setSeconds(newAt.getSeconds() + val);
            console.log(hours + ':' + minutes + ':' + seconds);
            return hours + ':' + minutes + ':' + seconds;
          })
        );
    }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

}
