import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {
  AnalogStickModule,
  GaugeModule
} from '@pro-widgets';
import { AppRoutingModule } from './app-routing.module';
import { components } from './components';
import { MatModule } from './mat.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GaugeModule,
    AnalogStickModule,
    AppRoutingModule,
    MatModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
