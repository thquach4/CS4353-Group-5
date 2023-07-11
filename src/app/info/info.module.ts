import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InfoPageComponent } from './info.component';

@NgModule({
  declarations: [InfoPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: InfoPageComponent }]),
    FormsModule,
    HttpClientModule,
  ], // Add RouterModule here
  exports: [InfoPageComponent],
})
export class InfoPageModule {}
