import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ChangeDetectorRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, animationFrameScheduler, interval, of } from 'rxjs';
import { withLatestFrom, scan, map, share, distinctUntilChanged, audit, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'pro-gauge',
  templateUrl: `./gauge.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value: number;
  @Input() unit = '';
  @Input() color = '#474747';
  @Input() backgroundColor = '#0A0B14';
  @Input() fontColor = 'rgb(178,178,177)';
  @Input() pointerLength = 130;
  @Input() pointerColor = '#E52420';
  @Input() stripeColor = 'white';
  @Input() digitalDelay = 100;
  @Input() interpolationRate = 0.05;

  private rangeOfCircle = (225 / 360) * Math.PI * 2;
  private offset = (157.5 / 360) * Math.PI * 2;
  private center = [141.732, 141.732];
  smoothX$: Observable<number>;
  smoothY$: Observable<number>;
  roundedValue$: Observable<number>;

  gradientBackgroundColor: SafeStyle;
  gradientStripeColor: SafeStyle;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}

  get range() {
    return this.max - this.min;
  }

  ngOnInit() {
    this.applyStyles();
    const animationFrame$ = interval(0, animationFrameScheduler).pipe(
      map(() => this.value),
      share()
    );
    this.roundedValue$ = animationFrame$.pipe(
      map(value => Math.round(value * 10) / 10),
      audit(() => interval(this.digitalDelay)),
      startWith(0)
    );
    const smoothCoordinates$ = animationFrame$.pipe(
      scan(this.linearInterpolation.bind(this)),
      map<number, number[]>(this.coordinates.bind(this))
    );
    this.smoothX$ = smoothCoordinates$.pipe(
      map(coordinates => coordinates[0])
    );
    this.smoothY$ = smoothCoordinates$.pipe(
      map(coordinates => coordinates[1])
    );
  }

  ngOnChanges() {
    this.applyStyles();

    if (isNaN(this.interpolationRate) || this.interpolationRate > 1) {
      this.interpolationRate = 0;
    }
  }

  applyStyles() {
    this.gradientBackgroundColor = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.backgroundColor}`
    );
    this.gradientStripeColor = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color:${this.stripeColor}`
    );
  }

  coordinates(value: number) {
    const minOffset = (this.min / this.range) * this.rangeOfCircle;
    const alpha = (value / this.range) * this.rangeOfCircle;

    const x =
      Math.cos(this.offset + alpha - minOffset) * this.pointerLength +
      this.center[0];
    const y =
      Math.sin(this.offset + alpha - minOffset) * this.pointerLength +
      this.center[1];

    return [x, y];
  }

  linearInterpolation(startValue: number, endValue: number) {
    const dValue = endValue - startValue;
    return startValue + dValue * this.interpolationRate;
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }
}
