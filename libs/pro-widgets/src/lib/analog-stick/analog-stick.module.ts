import { NgModule } from '@angular/core';
import { AnalogStickComponent } from './analog-stick.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [AnalogStickComponent],
  exports: [AnalogStickComponent]
})
export class AnalogStickModule {}
