import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'mat-sidenav-container', template: '<ng-content></ng-content>' })
class SidenavContainer {}

@Component({ selector: 'mat-sidenav-content', template: '<ng-content></ng-content>' })
class SidenavContent {}

@Component({ selector: 'mat-sidenav', template: '<ng-content></ng-content>' })
class Sidenav {
  @Input() opened: any;
  @Input() mode: any;
}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutlet {}

@Component({ selector: 'app-nav-list', template: '<ng-content></ng-content>' })
class NavList {}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent, SidenavContainer, SidenavContent, Sidenav, RouterOutlet, NavList],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
