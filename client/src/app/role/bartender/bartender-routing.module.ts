import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { BarmenOrderListComponent } from './sale/barmen-order-list/barmen-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'sale', component: SaleComponent ,
         children: [
          { path: 'order', component: BarmenOrderListComponent },
          { path: 'order/:filter/show', component: BarmenOrderListComponent },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BartenderRoutingModule { }
