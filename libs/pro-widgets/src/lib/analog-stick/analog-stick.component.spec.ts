import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogStickComponent } from './analog-stick.component';
import { By } from '@angular/platform-browser';

describe('AnalogStickComponent', () => {
  let component: AnalogStickComponent;
  let fixture: ComponentFixture<AnalogStickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalogStickComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogStickComponent);
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

  it('should be centered when input is [50,50]', () => {
    component.value = [50, 50];
    component.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const pointer = fixture.debugElement.query(By.css('#circle-pointer'));
    expect(Math.abs(+(pointer.attributes['cx'] as string) - 155.906)).toBeLessThan(0.01);
    expect(Math.abs(+(pointer.attributes['cy'] as string) - 127.559)).toBeLessThan(0.01);
  });

  describe('labels', () => {
    it('should display the old value when new value enters', () => {
      component.value = [20, 70];
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const texts = fixture.debugElement.query(By.css('#labels'));
      expect(texts.children[2].nativeElement.innerHTML).toBe(' 50% ');
      expect(texts.children[3].nativeElement.innerHTML).toBe(' 50% ');
    });

    it('should display the labels', () => {
      component.xLabel = 'test 1';
      component.yLabel = 'test 2';
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const texts = fixture.debugElement.query(By.css('#labels'));
      expect(texts.children[0].nativeElement.innerHTML).toBe(' test 2 ');
      expect(texts.children[1].nativeElement.innerHTML).toBe(' test 1 ');
    });
  });
});
