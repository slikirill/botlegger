/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChefComponent } from './chef.component';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
