import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserIdService } from '../../shared/user-id.service';
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
  providers: [UserIdService], // Add the UserIdService to the providers array
})
export class HistoryPageModule {}
