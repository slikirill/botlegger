import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helper/HttpInterceptor';
import { TokenExpInterceptor } from './helper/TokenExpInterceptor';


import { MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { RoleGuard } from './auth/role-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { NotFoundSharedModule } from './shared/not-found/not-found.shared.module';


@NgModule({
   declarations: [
      AppComponent,
      SigninComponent,
      SignoutComponent,
      SignupComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      HttpClientModule,
      MatCardModule,
      MatToolbarModule,
      MatInputModule,
      MatButtonModule,
      NotFoundSharedModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenExpInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      AuthService,
      RoleGuard],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
