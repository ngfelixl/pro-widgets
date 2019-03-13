import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGaugeComponent } from './digital-gauge.component';
import { By } from '@angular/platform-browser';

describe('DigitalGaugeComponent', () => {
  let component: DigitalGaugeComponent;
  let fixture: ComponentFixture<DigitalGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalGaugeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalGaugeComponent);
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

  it('should calculate the correct range', () => {
    component.min = 40;
    component.max = 60;

    expect(component.range).toBe(20);
  });

  describe('labels and values', () => {
    it('should display the value', () => {
      component.value = 40;
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('#value'));
      expect(text.nativeElement.innerHTML).toBe(' 40 ');
    });

    it('should display the unit', () => {
      component.unit = 'test string';
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('#unit'));
      expect(text.nativeElement.innerHTML).toBe(' test string ');
    });

    it('should round the value', () => {
      component.value = 24.4343248;
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('#value'));
      expect(text.nativeElement.innerHTML).toBe(' 24 ');
    });
  });
});
