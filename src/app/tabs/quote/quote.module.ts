import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { QuotePageComponent } from './quote.component';

@NgModule({

  declarations: [QuotePageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: QuotePageComponent }]),
    FormsModule,
    HttpClientModule,
  ],
  
  exports: [QuotePageComponent],
})
export class QuotePageModule {}
