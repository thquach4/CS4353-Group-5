import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'tabs-quote-page',
  templateUrl: './quote.component.html',
})
export class QuotePageComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  gallons_requested: number;
  delivery_date: string;
  suggested_price: number;
  total_amount: number;

  onSubmitQuote() {
    // Check if any required field is empty
    if (!this.street_address || !this.city || !this.state || !this.zip_code || !this.gallons_requested || !this.delivery_date) {
      this.presentAlert('Error', 'Please fill in all required fields.');
      return;
    }

    // Format the date to YYYY-MM-DD format
    const [year, month, day] = this.delivery_date.split('-');
    this.delivery_date = `${year}-${month}-${day}`;

    const quoteData = {
      delivery_address: `${this.street_address}, ${this.city}, ${this.state} ${this.zip_code}`,
      gallons_requested: this.gallons_requested,
      delivery_date: this.delivery_date,
    };

    this.http.post('http://127.0.0.1:1234/register/user/quote', quoteData).subscribe(
      (data: any) => {
        console.log('Quote submitted successfully.');
        console.log(data);
        // Handle the response from the backend if needed

      // Navigate to the history page with the user ID as a query parameter
    this.router.navigate(['/tabs/history'], { queryParams: { userId: data.quote_id } });
      },
      (error: any) => {
        console.log('Error submitting quote.');
        console.error(error);
        // Handle the error if needed
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
