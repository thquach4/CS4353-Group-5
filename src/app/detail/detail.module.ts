import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailPage } from './detail.page';
import { HttpClientModule } from '@angular/common/http';

import { DetailPageRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule, 
    DetailPageRoutingModule, 
    HttpClientModule,
  ],
  declarations: [DetailPage],
})
export class DetailPageModule {}
