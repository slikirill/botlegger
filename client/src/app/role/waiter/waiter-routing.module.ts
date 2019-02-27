import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StubComponent } from './../../shared/stub/stub.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';
import { WaiterOrderListComponent } from './waiter-order-list/waiter-order-list.component';
import { WaiterSaleListComponent } from './waiter-sale-list/waiter-sale-list.component';
import { WaiterSaleEditComponent } from './waiter-sale-edit/waiter-sale-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'sale', component: StubComponent ,
        children: [
          { path: '', component: WaiterSaleListComponent },
          { path: 'new', component: WaiterSaleEditComponent },
          { path: ':id/edit', component: WaiterSaleEditComponent},
          { path: ':filter/show', component: WaiterSaleListComponent },
          { path: 'order', component: WaiterOrderListComponent},
          { path: 'order/:filter/show', component: WaiterOrderListComponent },
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


