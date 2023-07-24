import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabs-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private navController: NavController, private http: HttpClient, private route: ActivatedRoute) {}
  
  profileArray: any;
  userId = "1000";

  ngOnInit(): void {
    // Retrieve the user ID from the query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['uid'];
      console.log('User ID:', this.userId);
      // Use the user ID as needed in your page logic
    });

    this.http.get("http://127.0.0.1:1234/get/profile/" + this.userId)
      .subscribe(
        data => {
          console.log("Successfully received data.");
          console.log(data);
          if (typeof data === 'object') {
            this.profileArray = data;
          }
        },
        error => {
          console.log("Error handling API request.");
        }
      );
    console.log("ProfilePageComponent - ngOnInit")
  }
  
  ionViewDidEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("ProfilePageComponent - ViewDidEnter")
  }

  goToUpdate() {
    this.navController.navigateRoot(['/info'], { queryParams: { "uid": this.userId } });
  }
}