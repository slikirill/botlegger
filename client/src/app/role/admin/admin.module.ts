import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './../../safe.pipe';


import { DashboardComponent } from './dashboard/dashboard.component';

import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';

import { SaleComponent } from './sale/sale.component';
import { SaleEditComponent } from './sale/sale-edit/sale-edit.component';
import { SaleListComponent } from './sale/sale-list/sale-list.component';
import { SaleSnackbarComponent } from './sale/sale-edit/sale-snackbar/sale-snackbar.component';
import { WaiterSaleSnackbarComponent } from './waiter/waiter-bill-edit/sale-snackbar/sale-snackbar.component';
import { OrderListComponent } from './sale/order-list/order-list.component';

import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { PurchaseDialogComponent } from './purchase/purchase-edit/purchase-dialog/purchase-dialog.component';

import { WaiterComponent } from './waiter/waiter.component';
import { WaiterOrderListComponent } from './waiter/waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './waiter/waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './waiter/waiter-bill-edit/waiter-bill-edit.component';

import { ChefComponent } from './chef/chef.component';
import { ChefOrderListComponent } from './chef/chef-order-list/chef-order-list.component';

import { BarmenComponent } from './barmen/barmen.component';
import { BarmenOrderListComponent } from './barmen/barmen-order-list/barmen-order-list.component';

import {
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatDialogModule,
  MatBadgeModule,
  MatTooltipModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent,
    ItemComponent,
    ItemEditComponent,
    ItemListComponent,
    SaleComponent,
    SaleEditComponent,
    SaleSnackbarComponent,
    SaleListComponent,
    PurchaseComponent,
    PurchaseEditComponent,
    PurchaseListComponent,
    PurchaseDialogComponent,
    SafePipe,
    OrderListComponent,

    WaiterComponent,
    WaiterOrderListComponent,
    WaiterBillListComponent,
    WaiterBillEditComponent,
    WaiterSaleSnackbarComponent,
    ChefComponent,
    ChefOrderListComponent,
    BarmenComponent,
    BarmenOrderListComponent,
  ],
  entryComponents: [PurchaseDialogComponent, SaleSnackbarComponent, WaiterSaleSnackbarComponent],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 100000}}
  ],
})
export class AdminModule { }
