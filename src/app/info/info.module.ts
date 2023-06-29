import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoPageComponent } from './info.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: InfoPageComponent }]),
  ],
  declarations: [InfoPageComponent],
  exports: [InfoPageComponent],
})
export class InfoPageModule {}
