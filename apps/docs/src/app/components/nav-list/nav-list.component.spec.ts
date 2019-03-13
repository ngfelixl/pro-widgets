import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListComponent as NavList } from './nav-list.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-nav-list', template: '<ng-content></ng-content>' })
class NavListComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-list-item', template: '<ng-content></ng-content>' })
class ListItemComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-divider', template: '' })
class DividerComponent {}

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavListComponent,
        NavList,
        ListItemComponent,
        DividerComponent
      ],
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
