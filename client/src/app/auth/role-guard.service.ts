import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    public isAuthenticated: boolean;
    public roleValid: boolean;

    constructor(public authService: AuthService, public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {

    this.isAuthenticated = this.authService.isAuthenticated();
    this.roleValid = route.data.expectedRole === this.authService.getRole() ? true : false;
    if (this.isAuthenticated && this.roleValid) {
        return true;
    } else {
        this.authService.logout();
        return false;
    }
  }
}
