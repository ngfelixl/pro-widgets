import { Widget } from '@docs/app/models/widget';
import { AnalogStickComponent } from '@pro-widgets';

let response = [0, 0];
let lastTime = 0;

export const analogStick: Widget = {
  name: 'Analog Stick',
  component: AnalogStickComponent,
  dataFieldName: 'value',
  valueGenerator: () => {
    const time = new Date().getTime() / 1000;
    if (time % 20 > 10) {
      const angle = new Date().getTime() / 800;
      return [
        Math.round((Math.sin(angle / 3) * 30 + 50) * 100) / 100,
        Math.round((Math.cos(angle) * 40 + 50) * 100) / 100
      ];
    } else {
      const roundedTime = Math.round(time);
      if (roundedTime % 1 === 0 && lastTime !== roundedTime) {
        response = [
          Math.round(Math.random() * 10000) / 100,
          Math.round(Math.random() * 10000) / 100
        ];
        lastTime = roundedTime;
      }
      return response;
    }
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
    },
    {
      label: 'Timer',
      fields: ['interpolationRate']
    }
  ]
};
