import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnChanges,
  ViewChild,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'pro-linear-gauge',
  templateUrl: `./linear-gauge.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinearGaugeComponent implements OnChanges, OnInit {
  @ViewChild('ticks') ticksContainer;
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 30;
  @Input() unit = '';
  @Input() title = 'TEMPERATURE';
  @Input() strokeColor = '#3C3C3B';
  @Input() ticks = 3;
  @Input() gradientStartColor = '#00FF00';
  @Input() gradientMidColor = '#FFFF00';
  @Input() gradientEndColor = '#FF0000';
  @Input() gradientMidPosition = 50;
  @Input() fontColor = '#706F6F';
  @Input() outOfRangeColor = 'red';
  @Input() marginTop = 0;
  @Input() marginBottom = 0;
  @Input() indicatorWidth = 17;
  @Input() indicatorBottomColor = '#000000';
  @Input() indicatorTopColor = '#575756';
  @Input() backgroundMin = this.min;
  @Input() backgroundMax = this.max;

  private storedValue = this.value;
  private storedTicks = this.ticks;
  private boundary = [8.5, 274.959];
  private range = this.boundary[1] - this.boundary[0];

  gradientStartSanitized: SafeStyle;
  gradientMidSanitized: SafeStyle;
  gradientEndSanitized: SafeStyle;
  indicatorTopSanitized: SafeStyle;
  indicatorBottomSanitized: SafeStyle;
  safeTicks: SafeHtml;
  backgroundWidth: number;
  backgroundPosX1: number;
  backgroundPosX2: number;
  height = 56.69 + this.marginTop + this.marginBottom;

  constructor(
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.calculateTicks();
    this.backgroundMin = this.min;
    this.backgroundMax = this.max;
    this.height = 56.69 + +this.marginTop + +this.marginBottom;
  }

  ngOnChanges() {
    if (this.value !== this.storedValue) {
      this.storedValue = this.value;
      return;
    }

    this.height = 56.69 + +this.marginTop + +this.marginBottom;
    this.calculateTicks();
    this.applyStyleChanges();
  }

  applyStyleChanges() {
    this.gradientStartSanitized = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.gradientStartColor}`
    );
    this.gradientMidSanitized = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.gradientMidColor}`
    );
    this.gradientEndSanitized = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.gradientEndColor}`
    );
    this.indicatorTopSanitized = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.indicatorTopColor}`
    );
    this.indicatorBottomSanitized = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.indicatorBottomColor}`
    );

    const backgroundPosition = [this.backgroundMinPx, this.backgroundMaxPx];
    this.backgroundWidth = backgroundPosition[1] - backgroundPosition[0];
    this.backgroundPosX1 = backgroundPosition[0];
    this.backgroundPosX2 = backgroundPosition[1];
  }

  calculateTicks() {
    const nativeElement = this.ticksContainer.nativeElement as HTMLElement;
    nativeElement.innerHTML = '';
    let htmlTicks = '';
    this.ticks = Math.min(this.ticks, 500);
    const intersectionRange = this.range / (+this.ticks + 1);
    for (let i = 0; i < this.ticks; i++) {
      const position = this.boundary[0] + intersectionRange * (i + 1);
      htmlTicks += `<line stroke=${
        this.strokeColor
      } stroke-miterlimit="10" fill="none" x1="${position}" y1="${36.613 +
        +this.marginTop}" x2="${position}" y2="${25.274 + +this.marginTop}"/>`;
    }
    this.safeTicks = this.domSanitizer.bypassSecurityTrustHtml(htmlTicks);
    this.storedTicks = this.ticks;
  }

  get inRange() {
    switch (this.max - this.min >= 0) {
      case true:
        return this.value > this.min && this.value < this.max;
      case false:
        return this.value < this.min && this.value > this.max;
    }
  }

  get pxValue(): number {
    return this.displayCoordinate(this.value);
  }

  get backgroundMinPx() {
    const xMinCoordinate = this.displayCoordinate(this.backgroundMin);
    const xMaxCoordinate = this.displayCoordinate(this.backgroundMax);

    return Math.min(xMinCoordinate, xMaxCoordinate);
  }

  get backgroundMaxPx() {
    const xMinCoordinate = this.displayCoordinate(this.backgroundMin);
    const xMaxCoordinate = this.displayCoordinate(this.backgroundMax);

    return Math.max(xMinCoordinate, xMaxCoordinate);
  }

  displayCoordinate(inputValue: number) {
    if (isNaN(inputValue)) {
      inputValue = 0;
    }

    const inputRange = this.max - this.min;
    const inputPercentage = (inputValue - this.min) / inputRange;

    const value = inputPercentage * this.range + this.boundary[0];

    return Math.min(Math.max(this.boundary[0], value), this.boundary[1]);
  }

  get displayValue() {
    const top = +this.marginTop;
    return `${this.pxValue},${36.612 + top} ${this.pxValue +
      this.indicatorWidth / 2},${22.439 + top} ${this.pxValue -
      this.indicatorWidth / 2},${22.439 + top}`;
  }
}
