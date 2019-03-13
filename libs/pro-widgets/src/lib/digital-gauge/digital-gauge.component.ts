import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pro-digital-gauge',
  templateUrl: './digital-gauge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalGaugeComponent implements OnChanges, AfterViewInit {
  @Input() value = 0;
  @Input() backgroundColor = '#424242';
  @Input() outerBackgroundColor = this.backgroundColor;
  @Input() defaultColor = 'white';
  @Input() normalColor = 'red';
  @Input() warnColor = 'red';
  @Input() dangerColor = 'red';
  @Input() fontColor = '#d0d0d0';
  @Input() unitColor = '#a0a0a0';
  @Input() underlineColor = this.fontColor;
  @Input() strokeWidth = 2;
  @Input() min = 0;
  @Input() max = 100;
  @Input() dangerThreshold = 100;
  @Input() warnThreshold = 100;
  @Input() unit = '°C';
  @ViewChild('stripeContainer') stripeContainer;
  private stripes: HTMLElement[];
  private lastInputValue: number = this.value;
  private lastValue: number;
  private thresholds: {
    warn: number;
    danger: number;
  };
  private viewInit = false;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnChanges() {
    this.checkStyleChange();
    this.setStateChange();
  }

  ngAfterViewInit() {
    this.stripes = this.stripeContainer.nativeElement.getElementsByTagName(
      'line'
    );
    let value = Math.round(this.stripes.length * this.percentageValue);
    value = Math.max(0, value);
    value = Math.min(this.stripes.length - 1, value);
    this.lastValue = value;

    this.setThresholds();
    this.setInitialState();
    this.viewInit = true;
  }

  get range() {
    return this.max - this.min;
  }

  get gradientUnderlineColor() {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.underlineColor}`
    );
  }

  get gradientOuterColor() {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.outerBackgroundColor}`
    );
  }

  get gradientInnerColor() {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.backgroundColor}`
    );
  }

  get percentageValue() {
    return (this.value - this.min) / this.range;
  }

  setThresholds() {
    const warnPercentage = (this.warnThreshold - this.min) / this.range;
    const dangerPercentage = (this.dangerThreshold - this.min) / this.range;
    if (this.stripes) {
      this.thresholds = {
        warn: Math.round(this.stripes.length * warnPercentage),
        danger: Math.round(this.stripes.length * dangerPercentage)
      };
    }
  }

  /**
   * If the value property hasn't changed, one of the
   * style attributes must have changed.
   */
  private checkStyleChange() {
    if (this.lastInputValue === this.value) {
      this.setThresholds();
      this.setInitialState();
    }
    this.lastInputValue = this.value;
  }

  private setStateChange() {
    if (this.viewInit) {
      let value = Math.round(this.stripes.length * this.percentageValue);
      value = Math.max(0, value);
      value = Math.min(this.stripes.length - 1, value);

      const difference = value - this.lastValue;

      if (difference !== 0) {
        const delta = difference > 0 ? 1 : -1;
        for (
          let i = this.lastValue;
          i * delta <= value * delta;
          i = i + delta
        ) {
          const index = this.stripes.length - 1 - i;
          if (delta > 0) {
            this.setActiveStrokeColor(i);
          } else {
            this.stripes[index].setAttribute('stroke', this.defaultColor);
          }
        }
      }
      this.lastValue = value;
    }
  }

  private setActiveStrokeColor(index: number) {
    const invertedIndex = this.stripes.length - 1 - index;
    if (index > this.thresholds.danger) {
      this.stripes[invertedIndex].setAttribute('stroke', this.dangerColor);
    } else if (index > this.thresholds.warn) {
      this.stripes[invertedIndex].setAttribute('stroke', this.warnColor);
    } else {
      this.stripes[invertedIndex].setAttribute('stroke', this.normalColor);
    }
  }

  private setInitialState() {
    if (this.stripes) {
      const percentage = (this.value - this.min) / this.range;
      let value = Math.ceil(this.stripes.length * percentage);
      value = Math.max(0, value);
      value = Math.min(this.stripes.length - 1, value);

      for (let i = 0; i < this.stripes.length; i++) {
        const index = this.stripes.length - 1 - i;
        if (i < value) {
          this.setActiveStrokeColor(i);
        } else {
          this.stripes[index].setAttribute('stroke', this.defaultColor);
        }
      }
    }
  }

  get roundedValue() {
    return Math.round(this.value);
  }
}
