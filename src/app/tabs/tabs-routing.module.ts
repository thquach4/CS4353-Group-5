import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tabs',
      },
      {
        path: 'quote',
        loadChildren: () =>
          import('./quote/quote.module').then((m) => m.QuotePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryPageModule),
      },
      {
       path: 'homepage', // Add this route for the Homepage tab
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../homepage/homepage.module').then(m => m.HomepageModule) 
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
