import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { WaiterOrderListComponent } from './sale/waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './sale/waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './sale/waiter-bill-edit/waiter-bill-edit.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'sale', component: SaleComponent ,
         children: [
          { path: 'order', component: WaiterOrderListComponent },
          { path: 'bill/new', component: WaiterBillEditComponent },
          { path: 'bill/:id/edit', component: WaiterBillEditComponent},
          { path: 'order/:filter/show', component: WaiterOrderListComponent },
          { path: 'bill/:filter/invoice', component: WaiterBillListComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }
