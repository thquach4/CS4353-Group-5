import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotePageComponent } from './quote.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: QuotePageComponent }]),
  ],
  declarations: [QuotePageComponent],
  exports: [QuotePageComponent],
})
export class QuotePageModule {}
