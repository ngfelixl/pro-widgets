import { Widget } from '@docs/app/models/widget';
import { LinearGaugeComponent } from '@pro-widgets';

export const linearGauge: Widget = {
  name: 'Linear Gauge',
  component: LinearGaugeComponent,
  module: 'LinearGaugeModule',
  dataFieldName: 'value',
  valueGenerator: () => Math.sin(new Date().getTime() / 5000) * 50 + 40,
  tabs: [
    {
      label: 'Background',
      fields: ['gradientStartColor', 'gradientMidColor', 'gradientEndColor']
    },
    {
      label: 'Background Position',
      fields: ['backgroundMin', 'backgroundMax', 'gradientMidPosition']
    },
    {
      label: 'Lines  and Fonts',
      fields: ['strokeColor', 'ticks', 'outOfRangeColor']
    },
    {
      label: 'Indicator',
      fields: ['indicatorWidth', 'indicatorTopColor', 'indicatorBottomColor']
    },
    {
      label: 'Labels and Units',
      fields: ['min', 'max', 'unit', 'marginBottom']
    },
    {
      label: 'Title',
      fields: ['title', 'marginTop', 'fontColor']
    }
  ]
};
