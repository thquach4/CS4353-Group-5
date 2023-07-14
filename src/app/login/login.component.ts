import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("LoginPage - OnInit");
  }

  ngOnDestroy() {
    console.log("LoginPage - OnDestroy");
  }

  ionViewWillEnter() {
    console.log("LoginPage - ViewWillEnter");
  }

  ionViewWillLeave() {
    console.log("LoginPage - ViewWillLeave");
  }

  login() {
    if (this.username && this.password) {
      const loginData = {
        username: this.username,
        password: this.password
      };

      this.http.post('http://127.0.0.1:1234/login', loginData)
        .subscribe(
          data => {
            console.log('Login successful.');
            console.log(data);
            // Handle the response from the backend if needed
          },
          error => {
            console.log('Error during login.');
            console.error(error);
            // Handle the error if needed
          }
        );
    } else {
      console.log("Please provide username and password.");
    }
  }

}
