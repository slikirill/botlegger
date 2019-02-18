import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
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

import { StubSharedModule } from './../../shared/stub/stub.shared.module';
import { DashboardSharedModule } from './../../shared/dashboard/dashboard.shared.module';
import { NotFoundSharedModule } from './../../shared/not-found/not-found.shared.module';

import { AdminItemListComponent } from './admin-item-list/admin-item-list.component';
import { AdminItemEditComponent } from './admin-item-edit/admin-item-edit.component';

import { AdminSaleListComponent } from './admin-sale-list/admin-sale-list.component';
import { AdminSaleEditComponent } from './admin-sale-edit/admin-sale-edit.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';

import { AdminPurchaseListComponent } from './admin-purchase-list/admin-purchase-list.component';
import { AdminPurchaseEditComponent } from './admin-purchase-edit/admin-purchase-edit.component';
import { SaleSnackbarComponent } from './admin-sale-edit/sale-snackbar/sale-snackbar.component';


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
    MatTooltipModule,
    DashboardSharedModule,
    StubSharedModule,
    NotFoundSharedModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  declarations: [
    AdminItemEditComponent,
    AdminItemListComponent,
    AdminSaleEditComponent,
    SaleSnackbarComponent,
    AdminSaleListComponent,
    AdminPurchaseEditComponent,
    AdminPurchaseListComponent,
    AdminOrderListComponent,
  ],
  entryComponents: [ SaleSnackbarComponent ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 100000}}
  ],
})
export class AdminModule { }
