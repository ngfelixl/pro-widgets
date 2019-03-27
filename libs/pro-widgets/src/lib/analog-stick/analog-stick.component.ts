import {
  Component,
  Input,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { interval, animationFrameScheduler, Observable, Subscription } from 'rxjs';
import { map, share, startWith, scan } from 'rxjs/operators';

interface ValuePair {
  x: number,
  y: number
}

@Component({
  selector: 'pro-analog-stick',
  templateUrl: './analog-stick.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalogStickComponent implements OnInit, OnChanges, OnDestroy {
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() color = '#ff0000';
  @Input() gradientStartColor = '#e0e0e0';
  @Input() gradientEndColor = '#B2B2B2';
  @Input() gradientBaseColor = '#202020';
  @Input() sideColor = '#575756';
  @Input() value: number[] = [50, 50];
  @Input() min: number[] = [0, 0];
  @Input() max: number[] = [100, 100];
  @Input() interpolationRate = 0.05;
  private xOffset = 0.1 * 283.46;
  private size = [283.46 - 0.1 * 283.46, 283.46 - 0.1 * 283.46];
  private storedValue = this.value;

  gradientColor: SafeStyle;
  backgroundGradientStartColor: SafeStyle;
  backgroundGradientEndColor: SafeStyle;
  gradientBase: SafeStyle;
  subscription = new Subscription();

  xPercentage = 0.5;
  yPercentage = 0.5;
  xPosition = 50;
  yPosition = 50;
  xRoundedPercentage = 50;
  yRoundedPercentage = 50;

  position$: Observable<ValuePair>;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.applyStyles();

    const animationFrame$ = interval(0, animationFrameScheduler).pipe(
      map(() => this.value),
      startWith([50, 50]),
      share()
    );

    const percentage$ = animationFrame$.pipe(
      map(values => ({
        x: (values[0] - this.min[0]) / this.max[0],
        y: (values[1] - this.min[1]) / this.max[1]
      })),
      scan(this.linearInterpolation.bind(this)),
      share()
    );

    this.position$ = percentage$.pipe(
      map(percentageValues => {
        return {
          x: this.xOffset + this.size[0] * percentageValues.x,
          y: this.size[1] - this.size[1] * percentageValues.y
        }
      })
    );

    const roundedValues$ = percentage$.pipe(
      map(percentageValues => ({
        x: Math.round(percentageValues.x * 100),
        y: Math.round(percentageValues.y * 100)
      }))
    );

    this.subscription.add(this.position$.subscribe(position => {
      this.xPosition = position.x;
      this.yPosition = position.y;
    }));

    this.subscription.add(percentage$.subscribe(percentage => {
      this.xPercentage = percentage.x;
      this.yPercentage = percentage.y;
    }));

    this.subscription.add(roundedValues$.subscribe(values => {
      this.xRoundedPercentage = values.x;
      this.yRoundedPercentage = values.y;
    }));
  }

  ngOnChanges() {
    if (isNaN(this.interpolationRate) || this.interpolationRate > 1) {
      this.interpolationRate = 0;
    }

    if (this.storedValue !== this.value) {
      this.storedValue = this.value;
      return;
    }

    this.applyStyles();
  }

  linearInterpolation(startValue: ValuePair, endValue: ValuePair) {
    const dx = endValue.x - startValue.x;
    const dy = endValue.y - startValue.y;
    return {
      x: startValue.x + dx * this.interpolationRate,
      y: startValue.y + dy * this.interpolationRate
    };
  }

  applyStyles() {
    this.gradientColor = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color: ${this.color}`
    );
    this.backgroundGradientStartColor = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color: ${this.gradientStartColor}`
    );
    this.backgroundGradientEndColor = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color: ${this.gradientEndColor}`
    );
    this.gradientBase = this.domSanitizer.bypassSecurityTrustStyle(
      `stop-color: ${this.gradientBaseColor}`
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
