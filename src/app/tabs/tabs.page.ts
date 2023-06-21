import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    // With Routing in Ionic, The OnInit lifecycle hook
    // may not get called consistently.
    console.log('TabsPage - OnInit');
  }

  ngOnDestroy() {
    // Likewise, this will may not consistently fire when you navigate away
    // from the component
    console.log('TabsPage - OnDestroy');
  }

  // However, Ionic provides lifecycle hooks of its own that
  // will fire consistently during route navigation

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log('TabsPage - ViewWillEnter');
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log('TabsPage - ViewWillLeave');
  }
}
