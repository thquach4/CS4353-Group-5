import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoPageComponent } from './info.component';

@NgModule({
  declarations: [InfoPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: InfoPageComponent }]),
  ], // Add RouterModule here
  exports: [InfoPageComponent],
})
export class InfoPageModule {}
