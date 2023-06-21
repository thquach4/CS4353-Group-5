import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfilePageComponent }]),
    CommonModule,
  ],
  declarations: [ProfilePageComponent],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule {}
