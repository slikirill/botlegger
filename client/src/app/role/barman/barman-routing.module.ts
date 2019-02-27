import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StubComponent } from './../../shared/stub/stub.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';

import { BarmanOrderListComponent } from './barman-order-list/barman-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'sale', component: StubComponent ,
        children: [
          { path: 'order', component: BarmanOrderListComponent },
          { path: 'order/:filter/show', component: BarmanOrderListComponent },
        ]
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/barman/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarmanRoutingModule { }


