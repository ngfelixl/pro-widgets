import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ]
})
export class MatModule {}
