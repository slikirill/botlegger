import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatBadgeModule
} from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    RouterModule,
    MatBadgeModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [],
  exports: [
    DashboardComponent
  ]
})

export class DashboardSharedModule { }
