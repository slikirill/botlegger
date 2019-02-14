/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarmenComponent } from './barmen.component';

describe('BarmenComponent', () => {
  let component: BarmenComponent;
  let fixture: ComponentFixture<BarmenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarmenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
