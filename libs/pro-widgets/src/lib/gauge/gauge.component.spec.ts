import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeComponent } from './gauge.component';
import { By } from '@angular/platform-browser';

describe('GaugeComponent', () => {
  let component: GaugeComponent;
  let fixture: ComponentFixture<GaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an svg element', () => {
    const svg = fixture.debugElement.query(By.css('svg'));

    expect(svg).toBeTruthy();
  });

  it('should have the pointer at 0 (of 225) deg when value is min', () => {
    component.min = 50;
    component.value = 50;
    fixture.detectChanges();
  });

  it('should calculate the correct range', () => {
    component.min = 50;
    component.max = 75;
    fixture.detectChanges();

    expect(component.range).toBe(25);
  });
});
