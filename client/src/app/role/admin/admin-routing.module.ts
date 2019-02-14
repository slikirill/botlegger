import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';

import { SaleComponent } from './sale/sale.component';
import { SaleListComponent } from './sale/sale-list/sale-list.component';
import { SaleEditComponent } from './sale/sale-edit/sale-edit.component';
import { OrderListComponent } from './sale/order-list/order-list.component';

import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';

import { WaiterComponent } from './waiter/waiter.component';
import { WaiterOrderListComponent } from './waiter/waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './waiter/waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './waiter/waiter-bill-edit/waiter-bill-edit.component';

import { ChefComponent } from './chef/chef.component';
import { ChefOrderListComponent } from './chef/chef-order-list/chef-order-list.component';

import { BarmenComponent } from './barmen/barmen.component';
import { BarmenOrderListComponent } from './barmen/barmen-order-list/barmen-order-list.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'item', component: ItemComponent ,
        children: [
          { path: '', component: ItemListComponent },
          { path: ':filter/show', component: ItemListComponent },
          { path: 'new', component: ItemEditComponent },
          { path: ':id/edit', component: ItemEditComponent},
        ]
      },
      { path: 'sale', component: SaleComponent ,
        children: [
          { path: '', component: SaleListComponent },
          { path: 'new', component: SaleEditComponent },
          { path: ':id/edit', component: SaleEditComponent},
          { path: 'order', component: OrderListComponent},
          { path: ':filter/order', component: OrderListComponent },
          { path: ':filter/invoice', component: SaleListComponent },
        ]
      },
      { path: 'purchase', component: PurchaseComponent ,
        children: [
          { path: '', component: PurchaseListComponent },
          { path: 'new', component: PurchaseEditComponent },
          { path: ':id/edit', component: PurchaseEditComponent},
        ]
      },
      { path: 'waiter', component: WaiterComponent ,
        children: [
          { path: '', component: WaiterOrderListComponent },
          { path: ':filter/list', component: WaiterOrderListComponent },
          { path: ':filter/bill', component: WaiterBillListComponent },
          { path: 'bill', component: WaiterBillListComponent },
          { path: 'bill/new', component: WaiterBillEditComponent },
          { path: 'bill/:id/edit', component: WaiterBillEditComponent},
        ]
      },
      { path: 'chef', component: ChefComponent ,
        children: [
          { path: '', component: ChefOrderListComponent },
        ]
      },
      { path: 'barmen', component: BarmenComponent ,
        children: [
          { path: '', component: BarmenOrderListComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


