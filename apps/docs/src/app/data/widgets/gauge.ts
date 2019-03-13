import { Widget } from '@docs/app/models/widget';
import { GaugeComponent } from '@pro-widgets';

export const gauge: Widget = {
  name: 'Gauge',
  component: GaugeComponent,
  module: 'GaugeModule',
  dataFieldName: 'value',
  valueGenerator: () => Math.sin(new Date().getTime() / 1000) * 50 + 50,
  tabs: [
    {
      label: 'Colors',
      fields: ['color', 'backgroundColor', 'stripeColor']
    },
    {
      label: 'Pointer and Font',
      fields: ['pointerColor', 'pointerLength', 'fontColor']
    },
    {
      label: 'Labels and Units',
      fields: ['min', 'max', 'unit']
    }
  ]
};
