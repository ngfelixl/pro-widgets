import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InstallationComponent } from './components/installation/installation.component';
import { ContributingComponent } from './components/contributing/contributing.component';
import { WidgetComponent } from './components/widget/widget.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { hideSidenav: true } },
  {
    path: 'installation',
    component: InstallationComponent,
    data: { subtitle: 'Installation' }
  },
  {
    path: 'contributing',
    component: ContributingComponent,
    data: { subtitle: 'Contributing' }
  },
  {
    path: 'widgets/:id',
    component: WidgetComponent,
    data: { subtitle: 'Customizer' }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
