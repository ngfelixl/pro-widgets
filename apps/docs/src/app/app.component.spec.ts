import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Directive, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LayoutService } from './services/layout.service';
import { RouteDataService } from './services/route-data.service';

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-toolbar', template: '' })
class MatToolbarComponent {}

@Component({ selector: 'app-titlebar', template: '' })
class AppTitlebarComponent {}

@Component({ selector: 'app-sidenav', template: '' })
class AppSidenavComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconComponent {}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'mat-icon-button' })
class MatIconButtonDirective {}

@Injectable()
class RouteDataMockService {
  title$ = of();
}

@Injectable()
class LayoutMockService {
  sidenavMode$ = of();
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MatToolbarComponent, AppTitlebarComponent, AppSidenavComponent, MatIconButtonDirective, MatIconComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LayoutService, useClass: LayoutMockService },
        { provide: RouteDataService, useClass: RouteDataMockService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /*it(`should have as title 'widgets'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('widgets');
  });*/

  /* it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to widgets!');
  }); */
});
