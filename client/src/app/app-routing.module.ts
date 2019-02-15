import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { RoleGuard } from './auth/role-guard.service';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'admin',
    loadChildren: './role/admin/admin.module#AdminModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
      preload: false,
      delay: false
    }
  },
  { path: 'barmen',
    loadChildren: './role/barmen/barmen.module#BarmenModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'barmen',
      preload: false,
      delay: false
    }
  },
  { path: 'chef', loadChildren: './role/chef/chef.module#ChefModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'chef',
      preload: false,
      delay: false
    }
  },
  { path: 'waiter',
    loadChildren: './role/waiter/waiter.module#WaiterModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'waiter',
      preload: false,
      delay: false
    }
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: NoPreloading})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
