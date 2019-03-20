import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnChanges,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'pro-analog-stick',
  templateUrl: './analog-stick.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalogStickComponent implements OnInit, OnChanges {
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() color = '#ff0000';
  @Input() gradientStartColor = '#e0e0e0';
  @Input() gradientEndColor = '#B2B2B2';
  @Input() gradientBaseColor = '#202020';
  @Input() sideColor = '#575756';
  @Input() value: [number, number] = [50, 50];
  @Input() min: [number, number] = [0, 0];
  @Input() max: [number, number] = [100, 100];
  private xOffset = 0.1 * 283.46;
  private size = [283.46 - 0.1 * 283.46, 283.46 - 0.1 * 283.46];
  private storedValue = this.value;

  gradientColor: SafeStyle;
  backgroundGradientStartColor: SafeStyle;
  backgroundGradientEndColor: SafeStyle;
  gradientBase: SafeStyle;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.applyStyles();
  }

  ngOnChanges() {
    if (this.storedValue !== this.value) {
      this.storedValue = this.value;
      return;
    }

    this.applyStyles();
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

  get xPercentage() {
    return (this.value[0] - this.min[0]) / this.max[0];
  }

  get yPercentage() {
    return (this.value[1] - this.min[0]) / this.max[1];
  }

  get xRoundedPercentage() {
    return Math.round(this.xPercentage * 100);
  }

  get yRoundedPercentage() {
    return Math.round(this.yPercentage * 100);
  }

  get xPosition() {
    return this.xOffset + this.size[0] * this.xPercentage;
  }

  get yPosition() {
    return this.size[1] - this.size[1] * this.yPercentage;
  }
}
