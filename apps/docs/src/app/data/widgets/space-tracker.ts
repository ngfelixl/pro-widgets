import { Widget } from '@docs/app/models/widget';
import { SpaceTrackerComponent } from '@pro-widgets';

let response = {};
let lastTime = 0;

export const spaceTracker: Widget = {
  name: 'Space Tracker',
  component: SpaceTrackerComponent,
  module: 'SpaceTrackerModule',
  dataFieldName: 'value',
  valueGenerator: () => {
    const time = new Date().getTime() / 1000;
    if (time % 30 > 20) {
      const result = {};
      for (let i = 0; i < 10; i++) {
        result[i] = [
          Math.round(Math.sin((time / 2) * ((i + 1) / 10)) * 50 * 100) / 100,
          Math.round(Math.sin((time / 5) * ((i + 1) / 10)) * 60 * 100) / 100,
          Math.round(Math.sin((time / 1.3) * ((i + 1) / 10)) * 60 * 100) / 100
        ];
      }
      return result;
    } else if (time % 30 > 10) {
      return {
        '0': [0, 0, 0],
        '1': [
          Math.round(Math.sin(time + 2) * 50 * 100) / 100,
          Math.round(Math.cos(time + 2) * 60 * 100) / 100,
          0
        ],
        '2': [
          Math.round(Math.sin(time / 2) * 80 * 100) / 100,
          Math.round(Math.cos(time / 2) * 90 * 100) / 100,
          0
        ],
        '3': [
          Math.round(Math.sin(time / 0.4) * 20 * 100) / 100,
          Math.round(Math.cos(time / 0.4) * 20 * 100) / 100,
          0
        ]
      };
    } else {
      const roundedTime = Math.round(time);
      if (roundedTime % 1 === 0 && lastTime !== roundedTime) {
        response = {
          '0': [
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100
          ],
          '1': [
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100
          ],
          '2': [
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100,
            Math.round((Math.random() * 80 - 40) * 100) / 100
          ]
        };
        lastTime = roundedTime;
      }
      return response;
    }
  },
  tabs: [
    {
      label: 'Tracker',
      fields: ['trackerColor', 'trackerRadius']
    },
    {
      label: 'Lights',
      fields: [
        'pointLightColor',
        'pointLightIntensity',
        'ambientLightColor',
        'ambientLightIntensity'
      ]
    },
    {
      label: 'Ticks',
      fields: ['numberOfTicks', 'tickColor', 'tickPoints', 'tickRadius']
    },
    {
      label: 'Floor',
      fields: ['floorColor', 'floorOpacity', 'floorPositionZ']
    },
    {
      label: 'Crosshair',
      fields: ['crosshairRadius', 'xCrosshairColor', 'yCrosshairColor']
    },
    {
      label: 'Sphere',
      fields: ['sphereOpacity', 'sphereColor']
    },
    {
      label: 'Camera',
      fields: ['cameraX', 'cameraY', 'cameraZ']
    },
    {
      label: 'Timer and Scene',
      fields: ['interpolationRate', 'backgroundColor']
    }
  ]
};
