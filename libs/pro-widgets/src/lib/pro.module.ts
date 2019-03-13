import { NgModule } from '@angular/core';
import { AnalogStickModule } from './analog-stick/analog-stick.module';
import { GaugeModule } from './gauge/gauge.module';
import { DigitalGaugeModule } from './digital-gauge/digital-gauge.module';

@NgModule({
  imports: [],
  exports: [AnalogStickModule, DigitalGaugeModule, GaugeModule]
})
export class ProModule {}
