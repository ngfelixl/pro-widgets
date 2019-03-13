import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';

@Component({ selector: 'pro-gauge', template: '' })
class ProGauge {
  @Input() value: any;
}

@Component({ selector: 'pro-analog-stick', template: '' })
class ProAnalogStick {
  @Input() value: any;
}

@Component({ selector: 'app-footer', template: '' })
class Footer {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ProGauge, ProAnalogStick, Footer]
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
