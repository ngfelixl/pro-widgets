import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'pro-gauge',
  templateUrl: `./gauge.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeComponent implements OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 30;
  @Input() unit = '';
  @Input() color = '#474747';
  @Input() backgroundColor = '#0A0B14';
  @Input() fontColor = 'rgb(178,178,177)';
  @Input() pointerLength = 130;
  @Input() pointerColor = '#E52420';
  @Input() stripeColor = 'white';

  private actualValue = this.min;
  private interval: number;
  private storedValue = this.value;

  gradientBackgroundColor: SafeStyle;
  gradientStripeColor: SafeStyle;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}
  private rangeOfCircle = (225 / 360) * Math.PI * 2;
  private offset = (157.5 / 360) * Math.PI * 2;
  private center = [141.732, 141.732];

  get range() {
    return this.max - this.min;
  }

  ngOnChanges() {
    if (this.storedValue === this.value) {
      this.gradientBackgroundColor = this.domSanitizer.bypassSecurityTrustStyle(
        `stop-color:${this.backgroundColor}`
      );
      this.gradientStripeColor = this.domSanitizer.bypassSecurityTrustStyle(
        `stop-color:${this.stripeColor}`
      );
    } else {
      if (this.interval) {
        clearInterval(this.interval);
      }

      const time = 20;
      const steps = 15;
      const stepSize = (this.value - this.actualValue) / steps;
      this.actualValue += stepSize;
      let index = 1;

      this.interval = window.setInterval(() => {
        this.actualValue += stepSize;
        this.changeDetectorRef.detectChanges();
        index++;
        if (index >= steps) {
          clearInterval(this.interval);
        }
      }, time);
      this.storedValue = this.value;
    }
  }

  get roundedValue() {
    return Math.round(this.value * 10) / 10;
  }

  get coordinates() {
    const minOffset = (this.min / this.range) * this.rangeOfCircle;
    const alpha = (this.actualValue / this.range) * this.rangeOfCircle;

    const x =
      Math.cos(this.offset + alpha - minOffset) * this.pointerLength +
      this.center[0];
    const y =
      Math.sin(this.offset + alpha - minOffset) * this.pointerLength +
      this.center[1];

    return [x, y];
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.changeDetectorRef.detach();
  }
}
