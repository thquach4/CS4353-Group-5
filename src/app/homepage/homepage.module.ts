import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, IonicModule, RouterModule], // Add RouterModule here
  exports: [HomepageComponent],
})
export class HomepageModule {}
