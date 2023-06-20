import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistoryPageComponent } from './history.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: HistoryPageComponent }]),
  ],
  declarations: [HistoryPageComponent],
  exports: [HistoryPageComponent],
})
export class HistoryPageModule {}
