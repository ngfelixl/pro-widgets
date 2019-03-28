import { Widget } from '@docs/app/models/widget';
import { GaugeComponent } from '@pro-widgets';

let response = 0;
let lastTime = 0;

export const gauge: Widget = {
  name: 'Gauge',
  component: GaugeComponent,
  module: 'GaugeModule',
  dataFieldName: 'value',
  valueGenerator: () => {
    const time = new Date().getTime() / 1000;
    if (time%20 > 10) {
      return (Math.sin(time) + 1) * 25 + (Math.sin(time / 3 + 30) + 1) * 25;
    } else {
      const roundedTime = (Math.round(time));
      if (roundedTime%1 === 0 && lastTime !== roundedTime) {
        response = Math.random() * 100;
        lastTime = roundedTime;
      }
      return response;
    }
  },
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
    },
    {
      label: 'Timers',
      fields: ['digitalDelay', 'interpolationRate']
    }
  ]
};
