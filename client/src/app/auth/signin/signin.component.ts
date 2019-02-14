import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getRole()]);
    }
    this.initForm();
  }

  initForm() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSignin() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signinUser(email, password);
  }

}
