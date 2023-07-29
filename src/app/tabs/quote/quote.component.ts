import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { UserIdService } from '../../shared/user-id.service'; // Import the UserIdService

@Component({
  selector: 'tabs-quote-page',
  templateUrl: './quote.component.html',
})
export class QuotePageComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private userIdService: UserIdService // Inject the UserIdService
    ) {}
  
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  gallons_requested: number;
  delivery_date: string;
  suggested_price: number;
  total_amount: number;

  // Array of state options with name and abbreviation
  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];  

  onStateChange(event: any) {
    this.state = event.detail.value;
  }  

  getQuote() {
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
      user_id: this.userIdService.getUserId(),
    };
  
    // Make a call to the Pricing Module API to get the suggested price and total amount
    this.http.post('http://127.0.0.1:1234/register/user/quote', quoteData).subscribe(
      (data: any) => {
        console.log('Quote fetched successfully.');
        console.log(data);
  
        // Set the suggested price and total amount to display on the page
        this.suggested_price = data.suggested_price;
        this.total_amount = data.total_amount;
      },
      (error: any) => {
        console.log('Error fetching quote.');
        console.error(error);
        // Handle the error if needed
      }
    );
  }

  isFormEmpty(): boolean {
    return !this.street_address || !this.city || !this.state || !this.zip_code || !this.gallons_requested || !this.delivery_date;
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
