import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabs-quote-page',
  templateUrl: './quote.component.html',
})
export class QuotePageComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {}

  delivery_address: string;
  gallons_requested:number;
  delivery_date:string;
  suggested_price:number;
  total_amount:number;

  

  onAddressChange(event: any) {
    this.delivery_address = event.target.value;
  }

  submitQuote() {
    const quoteData = {
      gallons_requested: this.gallons_requested,
      delivery_address: this.delivery_address,
      delivery_date: this.delivery_date,
      
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
      console.log("QuotePageComponent - ionViewWillEnter")
  }
  onSave() {
    console.log('delivery_address:', this.delivery_address);
    console.log('gallons_requested:', this.gallons_requested);
    console.log('delivery_date:', this.delivery_date);
    
    
    
    const data = {
      delivery_address:this.delivery_address,
      gallons_requested:this.gallons_requested,
      delivery_date:this.delivery_date,
      
    }
};

}