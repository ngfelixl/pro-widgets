import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';

// tslint:disable-next-line:component-selector
@Component({ selector: 'pro-gauge', template: '' })
class ProGaugeComponent {
  @Input() value: any;
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'pro-analog-stick', template: '' })
class ProAnalogStickComponent {
  @Input() value: any;
}

@Component({ selector: 'app-footer', template: '' })
class FooterComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ProGaugeComponent,
        ProAnalogStickComponent,
        FooterComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
