import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StubComponent } from './../../shared/stub/stub.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';

import { AdminItemListComponent } from './admin-item-list/admin-item-list.component';
import { AdminItemEditComponent } from './admin-item-edit/admin-item-edit.component';

import { AdminSaleListComponent } from './admin-sale-list/admin-sale-list.component';
import { AdminSaleEditComponent } from './admin-sale-edit/admin-sale-edit.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';

import { AdminPurchaseListComponent } from './admin-purchase-list/admin-purchase-list.component';
import { AdminPurchaseEditComponent } from './admin-purchase-edit/admin-purchase-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'item', component: StubComponent ,
        children: [
          { path: '', component: AdminItemListComponent },
          { path: ':filter/show', component: AdminItemListComponent },
          { path: 'new', component: AdminItemEditComponent },
          { path: ':id/edit', component: AdminItemEditComponent},
        ]
      },
      { path: 'sale', component: StubComponent ,
        children: [
          { path: '', component: AdminSaleListComponent },
          { path: 'new', component: AdminSaleEditComponent },
          { path: ':id/edit', component: AdminSaleEditComponent},
          { path: ':filter/show', component: AdminSaleListComponent },
          { path: 'order', component: AdminOrderListComponent},
          { path: 'order/:filter/show', component: AdminOrderListComponent },
        ]
      },
      { path: 'purchase', component: StubComponent ,
        children: [
          { path: '', component: AdminPurchaseListComponent },
          { path: 'new', component: AdminPurchaseEditComponent },
          { path: ':id/edit', component: AdminPurchaseEditComponent},
        ]
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/admin/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


