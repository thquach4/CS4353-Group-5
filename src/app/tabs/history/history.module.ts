import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HistoryComponent } from './history.component';
@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }]),
    FormsModule,
    HttpClientModule,
  ],
  
  exports: [HistoryComponent],
})
export class HistoryPageModule {}















