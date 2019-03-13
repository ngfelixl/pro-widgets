import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListComponent } from './nav-list.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'mat-nav-list', template: '<ng-content></ng-content>' })
class NavList {}

@Component({ selector: 'mat-list-item', template: '<ng-content></ng-content>' })
class ListItem {}

@Component({ selector: 'mat-divider', template: '' })
class Divider {}

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavListComponent, NavList, ListItem, Divider],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
