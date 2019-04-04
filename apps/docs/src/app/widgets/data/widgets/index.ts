import { gauge } from './gauge';
import { digitalGauge } from './digital-gauge';
import { analogStick } from './analog-stick';
import { Widgets } from '@docs/app/models/widget';
import { linearGauge } from './linear-gauge';
import { spaceTracker } from './space-tracker';

/**
 * Widgets with snake-case IDs
 */
export const widgets: Widgets = {
  gauge,
  'digital-gauge': digitalGauge,
  'linear-gauge': linearGauge,
  'analog-stick': analogStick,
  'space-tracker': spaceTracker
};
