import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarmanRoutingModule } from './barman-routing.module';
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

import { StubSharedModule } from '../../shared/stub/stub.shared.module';
import { DashboardSharedModule } from '../../shared/dashboard/dashboard.shared.module';
import { NotFoundSharedModule } from '../../shared/not-found/not-found.shared.module';
import { BarmanOrderListComponent } from './barman-order-list/barman-order-list.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BarmanRoutingModule,
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
    BarmanOrderListComponent,
  ],
  entryComponents: [  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 100000}}
  ],
})
export class BarmanModule { }
