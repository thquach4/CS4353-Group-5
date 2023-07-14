import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tabs-quote-page',
  templateUrl: './quote.component.html',
})
export class QuotePageComponent {
  clientAddress: string;

  constructor(private http: HttpClient) {}

  onAddressChange(event: any) {
    this.clientAddress = event.target.value;
  }

  submitQuote() {
    const quoteData = {
      gallons_requested: 100, // Replace with the actual value
      delivery_address: this.clientAddress,
      delivery_date: '2023-07-14', // Replace with the actual value
      suggested_price: 10.0, // Replace with the actual value
      total_amount: 1000.0, // Replace with the actual value
    };

    this.http.post('http://127.0.0.1:1234/submit/quote', quoteData)
      .subscribe(
        data => {
          console.log('Quote submitted successfully.');
          console.log(data);
          // Handle the response from the backend if needed
        },
        error => {
          console.log('Error submitting quote.');
          console.error(error);
          // Handle the error if needed
        }
      );
  }
}
