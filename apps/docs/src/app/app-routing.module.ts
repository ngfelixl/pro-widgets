import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InstallationComponent } from './components/installation/installation.component';
import { ContributingComponent } from './components/contributing/contributing.component';

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
    path: 'widgets',
    loadChildren: './widgets/widgets.module#WidgetsModule',
    data: { subtitle: 'Customizer' }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
