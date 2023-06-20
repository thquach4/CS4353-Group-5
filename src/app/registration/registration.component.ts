import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    // With Routing in Ionic, The OnInit lifecycle hook 
    // may not get called consistently.
    console.log("RegistrationPage - OnInit")
  }

  ngOnDestroy() {
    // Likewise, this will may not consistently fire when you navigate away
    // from the component
    console.log("RegistrationPage - OnDestroy")
  }
    
  // However, Ionic provides lifecycle hooks of its own that
  // will fire consistently during route navigation

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("RegistrationPage - ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log("RegistrationPage - ViewWillLeave")
  }

}