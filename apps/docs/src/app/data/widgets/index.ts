import { gauge } from './gauge';
import { digitalGauge } from './digital-gauge';
import { analogStick } from './analog-stick';
import { Widgets } from '@docs/app/models/widget';

/**
 * Widgets with snake-case IDs
 */
export const widgets: Widgets = {
  gauge,
  'digital-gauge': digitalGauge,
  'analog-stick': analogStick
};
