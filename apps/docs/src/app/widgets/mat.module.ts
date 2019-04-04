import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class MatModule {}
