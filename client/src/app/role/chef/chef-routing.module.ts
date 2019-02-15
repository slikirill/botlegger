import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StubComponent } from './../../shared/stub/stub.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';

import { ChefOrderListComponent } from './chef-order-list/chef-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'order', component: StubComponent ,
        children: [
          { path: '', component: ChefOrderListComponent },
          { path: ':filter/show', component: ChefOrderListComponent },
        ]
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/chef/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }


