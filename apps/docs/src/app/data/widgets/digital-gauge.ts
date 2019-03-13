import { Widget } from '@docs/app/models/widget';
import { DigitalGaugeComponent } from '@pro-widgets';

export const digitalGauge: Widget = {
  name: 'Digital Gauge',
  component: DigitalGaugeComponent,
  module: 'DigitalGaugeModule',
  valueGenerator: () => Math.sin(new Date().getTime() / 5000) * 50 + 50,
  dataFieldName: 'value',
  tabs: [
    {
      label: 'Colors',
      fields: ['defaultColor', 'normalColor', 'backgroundColor', 'outerBackgroundColor']
    },
    {
      label: 'Thresholds',
      fields: ['warnThreshold', 'warnColor', 'dangerThreshold', 'dangerColor']
    },
    {
      label: 'Fontcolors and Underline',
      fields: ['fontColor', 'unitColor', 'underlineColor']
    },
    {
      label: 'Ranges and Units',
      fields: ['min', 'max', 'unit', 'strokeWidth']
    }
  ]
};
