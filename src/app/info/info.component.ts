import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoPageComponent {
  constructor(private router: Router, private http: HttpClient, private alertController:AlertController) {}  
  userId = "1000";
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: number;

  ionViewWillEnter(): void {
    this.http.get("http://127.0.0.1:1234/user/" + this.userId)
      .subscribe(
        data => {
          console.log("Successfully received data.");
          console.log(data);
          if (typeof data === 'object') {
            this.name = data[0][1];
            this.address1 = data[1][1];
            this.address2 = data[2][1];
            this.city = data[3][1];
            this.state = data[4][1];
            this.zipcode = data[5][1];
          }
        },
        error => {
          console.log("Error handling API request.");
        }
      );
    console.log("InfoPageComponent - ionViewWillEnter")
  }

  onSave() {
    console.log('Name:', this.name);
    console.log('Address 1:', this.address1);
    console.log('Address 2:', this.address2);
    console.log('City:', this.city);
    console.log('State:', this.state);
    console.log('Zipcode:', this.zipcode);
    
    const data = {
      name: this.name,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
    };

    this.http.post("http://127.0.0.1:1234/update/profile/" + this.userId, data).subscribe(
      (response) => {
        // Handle the response from the Flask server
        console.log(response);
        if (response['state'] === 'pass') {
          this.router.navigate(['/tabs/profile']);
        } else {
          this.warn(response['message']);
        }
      },
      (error) => {
        // Handle any errors
        console.error(error);
      }
    );
  }

  async warn(message: string) {
    const confirm = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/profile']);
          },
        },
        {
          text: 'OK',
          handler: () => { },
        },
      ],
    });
    await confirm.present();
  }

  clientAddress: string;

  onAddressChange(event: any) {
    this.clientAddress = event.target.value;
  }
}
