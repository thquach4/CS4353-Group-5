import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfilePageComponent }]),
  ],
  declarations: [ProfilePageComponent],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule {}
