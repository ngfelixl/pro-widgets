export interface DigitalGauge {
  min: number;
  max: number;
  unit: string;
  defaultColor: string;
  fontColor: string;
  unitColor: string;
  backgroundColor: string;
  outerBackgroundColor: string;
  underlineColor: string;
  normalColor: string;
  warnColor: string;
  dangerColor: string;
  warnThreshold: number;
  dangerThreshold: number;
  strokeWidth: number;
}
