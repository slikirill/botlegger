import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StubComponent } from './stub.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    StubComponent
  ],
  exports: [
    StubComponent
  ]
})

export class StubSharedModule { }
