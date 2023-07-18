import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private navController: NavController, private http: HttpClient, private alertController:AlertController) {}

  onLogin() {
    var un = (<HTMLInputElement>document.getElementById('username')).value;
    var pw = (<HTMLInputElement>document.getElementById('pw')).value;

    console.log('username', un, 'password', pw);

    const data = {
      username: un,
      password: pw
    };

    this.http.post("http://127.0.0.1:1234/login/user", data).subscribe(
      (response) => {
        // Handle the response from the Flask server
        console.log(response);
        if (response['state'] === 'pass') {
          this.navController.navigateRoot(['/tabs/profile'], { queryParams: { "uid": response['uid'] } });
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
            this.navController.navigateRoot(['/homepage']);
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

  ngOnInit() {
    // With Routing in Ionic, The OnInit lifecycle hook 
    // may not get called consistently.
    console.log("LoginPage - OnInit")
  }

  ngOnDestroy() {
    // Likewise, this will may not consistently fire when you navigate away
    // from the component
    console.log("LoginPage - OnDestroy")
  }
    
  // However, Ionic provides lifecycle hooks of its own that
  // will fire consistently during route navigation

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("LoginPage - ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log("LoginPage - ViewWillLeave")
  }

}