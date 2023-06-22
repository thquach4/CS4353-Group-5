import { Component } from '@angular/core';

@Component({
  selector: 'tabs-quote-page',
  templateUrl: './quote.component.html',
})
export class QuotePageComponent {
  clientAddress: string;

  onAddressChange(event: any) {
    this.clientAddress = event.target.value;
  }
}
