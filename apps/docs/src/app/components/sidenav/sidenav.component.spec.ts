import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent as Sidenav } from './sidenav.component';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-sidenav-container',
  template: '<ng-content></ng-content>'
})
class SidenavContainerComponent {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-sidenav-content',
  template: '<ng-content></ng-content>'
})
class SidenavContentComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-sidenav', template: '<ng-content></ng-content>' })
class SidenavComponent {
  @Input() opened: any;
  @Input() mode: any;
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletComponent {}

@Component({ selector: 'app-nav-list', template: '<ng-content></ng-content>' })
class NavListComponent {}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent,
        SidenavContainerComponent,
        SidenavContentComponent,
        Sidenav,
        RouterOutletComponent,
        NavListComponent
      ],
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
