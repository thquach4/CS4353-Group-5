import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tabs-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilePageComponent {
  constructor(private router: Router) {}
  // this array should from BE server, mocking the data for now
  profileArray = [
    ['Name', 'QWERTY ABCDEF'],
    ['Address 1', '123 XYZ St'],
    ['Address 2'],
    ['City', 'AWSOME'],
    ['State', 'AB'],
    ['Zipcode', '12345'],
  ];

  goToUpdate() {
    // we will have a link to update here
    this.router.navigate(['/login']);
  }
}
