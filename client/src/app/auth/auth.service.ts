import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {

  role = ['admin' , 'barman' , 'chef' , 'waiter'];
  accessToken = null;
  public apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {}

  signupUser(email: string, password: string) {
    console.log(email + ' - ' + password);
  }

  signinUser(email: string, password: string) {
    this.http.post(this.apiUrl  + 'api/CustomerUsers/signin', { email, password}).subscribe(result => {  
    localStorage.setItem('accessToken', JSON.stringify(result));
      if (this.validateRole()) {
        this.router.navigate(['/' + this.getRole() + '/sale/order']);
      } else {
        this.logout();
      }
    },
      error => console.log(error)
    );
  }

  logout() {
    this.http.post(this.apiUrl  + 'api/CustomerUsers/logout?access_token=' + this.getToken(), {}).subscribe(result => {
      localStorage.removeItem('accessToken');
      this.router.navigate(['signin']);
    },
      error => console.log(error)
    );
  }

  deleteToken() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['signin']);
  }

  getToken() {
    this.accessToken = JSON.parse(localStorage.getItem('accessToken'));
    return(this.accessToken.id);
  }


  validateRole() {
    this.accessToken = JSON.parse(localStorage.getItem('accessToken'));
    return(this.role.includes(this.accessToken.role));
  }

  getRole() {
    this.accessToken = JSON.parse(localStorage.getItem('accessToken'));
    return(this.accessToken === null ? this.accessToken : this.accessToken.role);
  }

  isAuthenticated() {
    return localStorage.getItem('accessToken') != null;
  }
}
