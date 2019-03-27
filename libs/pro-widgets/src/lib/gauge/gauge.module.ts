import { NgModule } from '@angular/core';
import { GaugeComponent } from './gauge.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [GaugeComponent],
  exports: [GaugeComponent]
})
export class GaugeModule {}
