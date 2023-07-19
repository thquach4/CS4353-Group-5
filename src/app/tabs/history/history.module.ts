import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }]),
    CommonModule,
    HttpClientModule,
  ],
  declarations: [HistoryComponent],
  exports: [HistoryComponent],
})
export class HistoryPageModule {}









