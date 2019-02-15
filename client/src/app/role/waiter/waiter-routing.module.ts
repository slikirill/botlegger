import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StubComponent } from './../../shared/stub/stub.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';
import { WaiterOrderListComponent } from './waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './waiter-bill-edit/waiter-bill-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'order', component: StubComponent ,
        children: [
          { path: '', component: WaiterOrderListComponent },
          { path: ':filter/show', component: WaiterOrderListComponent },
        ]
      },
      { path: 'bill', component: StubComponent ,
        children: [
          { path: '', component: WaiterBillListComponent },
          { path: ':id/edit', component: WaiterBillEditComponent },
        ]
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/waiter/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }


