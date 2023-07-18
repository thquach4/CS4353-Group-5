import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }]),
  ],
  declarations: [HistoryComponent],
  exports: [HistoryComponent],
})
export class HistoryPageModule {}
