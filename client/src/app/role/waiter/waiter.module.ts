import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WaiterRoutingModule } from './waiter-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { WaiterOrderListComponent } from './sale/waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './sale/waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './sale/waiter-bill-edit/waiter-bill-edit.component';
import { WaiterSaleSnackbarComponent } from './sale/waiter-bill-edit/sale-snackbar/sale-snackbar.component';
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
    WaiterRoutingModule,
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
    SaleComponent,
    WaiterOrderListComponent,
    WaiterBillListComponent,
    WaiterBillEditComponent,
    WaiterSaleSnackbarComponent,
  ],
  entryComponents: [WaiterSaleSnackbarComponent],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 100000}}
  ],
})
export class WaiterModule { }
