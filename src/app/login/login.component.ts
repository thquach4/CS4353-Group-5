import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
    // With Routing in Ionic, The OnInit lifecycle hook 
    // may not get called consistently.
    console.log("LoginPage - OnInit");
  }

  ngOnDestroy() {
    // Likewise, this will may not consistently fire when you navigate away
    // from the component
    console.log("LoginPage - OnDestroy");
  }
    
  // However, Ionic provides lifecycle hooks of its own that
  // will fire consistently during route navigation

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called
    console.log("LoginPage - ViewWillEnter");
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables
    console.log("LoginPage - ViewWillLeave");
  }

  login() {
    // Perform login functionality
    if (this.username && this.password) {
      // Here you can call an authentication service or perform login logic
      console.log("Logging in...");
      console.log("Username: ", this.username);
      console.log("Password: ", this.password);

      // Additional login logic such as calling an authentication service, handling responses, etc.
    } else {
      console.log("Please provide username and password.");
    }
  }

}
