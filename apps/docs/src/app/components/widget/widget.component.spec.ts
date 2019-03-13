import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { WidgetComponent } from './widget.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WidgetHostDirective } from '@docs/app/directive/widget-host.directive';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { widgets } from '../../data/widgets/index';
import { Component, Directive, Input, ChangeDetectorRef } from "@angular/core";


// tslint:disable-next-line:component-selector
@Component({ selector: 'pro-gauge', template: '' })
export class GaugeComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
}


// tslint:disable-next-line:directive-selector
@Directive({ selector: 'matInput' })
export class MatInputDirective {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-form-field', template: '<ng-content></ng-content>' })
export class MatFormFieldComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-select', template: '<ng-content></ng-content>' })
export class MatSelectComponent {
  @Input() value: any;
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-option', template: '<ng-content></ng-content>' })
export class MatOptionComponent {
  @Input() value: any;
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-tab-group', template: '<ng-content></ng-content>' })
export class MatTabGroupComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-tab', template: '<ng-content></ng-content>' })
export class MatTabComponent {
  @Input() label: string;
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'page-not-found', template: '<span id="page-not-found"></span>' })
export class PageNotFoundComponent {}



widgets.gauge.component = GaugeComponent;

const routes = [
  { path: 'widgets/:id', component: WidgetComponent },
  { path: 'page-not-found', component: PageNotFoundComponent }
];

const mockChangeDetectorRef = {
  detectChanges: jest.fn()
}

class MockActivatedRoute {
  state = new BehaviorSubject<any>({ id: null });

  get params() {
    return this.state.asObservable().pipe(skip(1));
  }

  setParams(state: any) {
    this.state.next(state);
  }
}

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let activatedRoute: MockActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WidgetComponent,
        MatFormFieldComponent,
        MatSelectComponent,
        MatOptionComponent,
        MatTabGroupComponent,
        MatTabComponent,
        PageNotFoundComponent,
        GaugeComponent,
        WidgetHostDirective,
        MatInputDirective
      ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [widgets['gauge'].component]
      }
    });

    TestBed.compileComponents();

    activatedRoute = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract the widget ID from the route', fakeAsync(() => {
    activatedRoute.setParams({ id: 'gauge' });
    tick(1);
    expect(component.id).toBe('gauge');
    component.ngOnDestroy();
  }));

  xit('should redirect to the page-not-found route when no widget was found', async () => {
    // const spy = spyOn(router, 'navigate');
    // await router.navigate(['widgets/i-do-not-exist']);
    //expect(spy).toHaveBeenCalledWith(['/page-not-found']);
    // let navigateSpy = spyOn(router.routerState.snapshot.url, 'navigate');
    // router.navigate(['page-not-found']);
    // fixture.detectChanges();
    // expect(router.routerState.snapshot.toString()).toContain('page-not-found');
  });
});
