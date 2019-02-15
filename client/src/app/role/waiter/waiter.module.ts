import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WaiterRoutingModule } from './waiter-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




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

import { WaiterSaleSnackbarComponent } from './waiter-bill-edit/sale-snackbar/sale-snackbar.component';
import { WaiterOrderListComponent } from './waiter-order-list/waiter-order-list.component';
import { WaiterBillListComponent } from './waiter-bill-list/waiter-bill-list.component';
import { WaiterBillEditComponent } from './waiter-bill-edit/waiter-bill-edit.component';
import { StubSharedModule } from './../../shared/stub/stub.shared.module';
import { DashboardSharedModule } from './../../shared/dashboard/dashboard.shared.module';
import { NotFoundSharedModule } from './../../shared/not-found/not-found.shared.module';


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
    MatTooltipModule,
    DashboardSharedModule,
    StubSharedModule,
    NotFoundSharedModule
  ],
  declarations: [
    WaiterOrderListComponent,
    WaiterBillListComponent,
    WaiterBillEditComponent,
    WaiterSaleSnackbarComponent,

  ],
  entryComponents: [ WaiterSaleSnackbarComponent ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 100000}}
  ],
})
export class WaiterModule { }
