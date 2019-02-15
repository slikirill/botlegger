import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenExpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
/*             console.log(event.status); */
          }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate([this.authService.getRole() + '/404']);
              }
              if (err.status === 404) {
                this.router.navigate([this.authService.getRole() + '/404']);
              }
            }
        })
      );
  }
}
