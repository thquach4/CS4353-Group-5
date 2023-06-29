import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info/info.component';

/**
 * In this file we set up the main routes within our application
 * We have multiple options available to us for routing
 *
 * Route to a specific component
 * Route to a lazy-loaded module
 * Redirect to a predefined route
 *
 * We can see an example of each below
 */

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent }, // line for the homepage
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to the homepage
  {
    path: 'homepage', // Add this route for the Homepage tab,
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
