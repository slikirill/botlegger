import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RoleGuard } from './auth/role-guard.service';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';


const appRoutes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'admin',
    loadChildren: './role/admin/admin.module#AdminModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: 'bartender',
    loadChildren: './role/bartender/bartender.module#BartenderModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'bartender'
    }
  },
  { path: 'chef', loadChildren: './role/chef/chef.module#ChefModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'chef'
    }
  },
  { path: 'waiter',
    loadChildren: './role/waiter/waiter.module#WaiterModule',
    // canActivate: [RoleGuard],
    data: {
      expectedRole: 'waiter'
    }
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
