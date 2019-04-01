import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetHostDirective } from './directive/widget-host.directive';

import {
  ProModule,
  GaugeComponent,
  DigitalGaugeComponent,
  AnalogStickComponent,
  LinearGaugeComponent,
  SpaceTrackerComponent,
  DigitalGaugeModule,
  SpaceTrackerModule,
  LinearGaugeModule
} from '@pro-widgets';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetComponent } from './components/widget/widget.component';
import { MatModule } from './mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsService } from './services/dynamic-forms.service';

@NgModule({
  declarations: [
    WidgetHostDirective,
    WidgetComponent
  ],
  providers: [
    DynamicFormsService
  ],
  imports: [
    // ProModule,
    DigitalGaugeModule,
    SpaceTrackerModule,
    LinearGaugeModule,
    CommonModule,
    WidgetsRoutingModule,
    MatModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    GaugeComponent,
    DigitalGaugeComponent,
    AnalogStickComponent,
    LinearGaugeComponent,
    SpaceTrackerComponent
  ]
})
export class WidgetsModule { }
