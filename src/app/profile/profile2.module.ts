import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilePage2Component } from './profile2.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfilePage2Component }]),
    CommonModule,
  ],
  declarations: [ProfilePage2Component],
  exports: [ProfilePage2Component],
})
export class ProfilePageModule {}
