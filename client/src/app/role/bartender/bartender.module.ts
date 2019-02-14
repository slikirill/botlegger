import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BartenderRoutingModule } from './bartender-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarmenOrderListComponent } from './sale/barmen-order-list/barmen-order-list.component';
import { SaleComponent } from './sale/sale.component';

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
    BartenderRoutingModule,
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
  declarations: [DashboardComponent, SaleComponent, BarmenOrderListComponent]
})
export class BartenderModule { }
