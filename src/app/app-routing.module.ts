import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info/info.component';
import { QuotePageComponent } from './tabs/quote/quote.component'; // Import the QuoteComponent
import { HistoryComponent } from './tabs/history/history.component'; // Import the QuoteComponent

const routes: Routes = [
  { path: 'info', component: InfoPageComponent },
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
  // Add the route for the Quote page with a dynamic user ID parameter
  {
    path: 'quote/:userId',
    component: QuotePageComponent,
  },
  {
    path: 'tabs/history/:userId', // Update the route to accept the user ID as a parameter
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
