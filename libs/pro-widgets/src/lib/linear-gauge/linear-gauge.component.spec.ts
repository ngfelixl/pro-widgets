import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGaugeComponent } from './linear-gauge.component';
import { By } from '@angular/platform-browser';

describe('LinearGaugeComponent', () => {
  let component: LinearGaugeComponent;
  let fixture: ComponentFixture<LinearGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinearGaugeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearGaugeComponent);
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
});
