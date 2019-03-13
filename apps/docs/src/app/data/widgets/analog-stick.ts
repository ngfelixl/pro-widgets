import { Widget } from '@docs/app/models/widget';
import { AnalogStickComponent } from '@pro-widgets';

export const analogStick: Widget = {
  name: 'Analog Stick',
  component: AnalogStickComponent,
  dataFieldName: 'value',
  valueGenerator: () => {
    const angle = new Date().getTime() / 800;
    return [Math.round((Math.sin(angle) * 30 + 50) * 100) / 100, Math.round((Math.cos(angle) * 40 + 50) * 100) / 100];
  },
  module: 'AnalogStickModule',
  tabs: [
    {
      label: 'Colors',
      fields: ['color', 'gradientBaseColor', 'sideColor']
    },
    {
      label: 'Gradient Color',
      fields: ['gradientStartColor', 'gradientEndColor']
    },
    {
      label: 'Labels',
      fields: ['xLabel', 'yLabel']
    }
  ]
};
