import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { ChefOrderListComponent } from './sale/chef-order-list/chef-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'sale', component: SaleComponent ,
         children: [
          { path: 'order', component: ChefOrderListComponent },
          { path: 'order/:filter/show', component: ChefOrderListComponent },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
