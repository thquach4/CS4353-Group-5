import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { QuotePageModule } from './quote/quote.module'; // Import the QuotePageModule
import { HistoryPageModule } from './history/history.module'; // Import the HistoryPageModule
import { QuoteHistoryService } from './quote/quote-history.service'; // Import the service here

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPageRoutingModule],
  declarations: [TabsPage],
  providers: [QuoteHistoryService], // Add the QuoteHistoryService to providers here
})
export class TabsPageModule {}
