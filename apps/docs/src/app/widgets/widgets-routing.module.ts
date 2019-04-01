import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetComponent } from './components/widget/widget.component';

const routes: Routes = [
  { path: ':id',
    component: WidgetComponent,
    data: { subtitle: 'Customizer' }
  },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}