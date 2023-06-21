import { Component } from '@angular/core';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registeredUsers: User[] = [];
  username: string = '';
  password: string = '';

  register(): void {
    // Check if username and password are not empty and do not contain spaces
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Please enter both username and password.');
    } else if (this.username.includes(' ') || this.password.includes(' ')) {
      alert('Username and password cannot contain spaces.');
    } else {
      // Check if username is already registered
      if (this.isUsernameRegistered(this.username)) {
        alert('Username already exists. Please choose a different username.');
      } else {
        this.registeredUsers.push({ username: this.username, password: this.password });
        alert('Registration successful! Username: ' + this.username + ', Password: ' + this.password);
      }
    }
  }

  login(): void {
    // Check if username and password are not empty and do not contain spaces
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Please enter both username and password.');
    } else if (this.username.includes(' ') || this.password.includes(' ')) {
      alert('Invalid username or password. Please try again.');
    } else {
      // Check if username and password match a registered user
      const user = this.registeredUsers.find(user => user.username === this.username && user.password === this.password);

      // Check if the user is found
      if (user) {
        alert('Login successful! Welcome, ' + this.username + '!');
      } else {
        alert('Invalid username or password. Please try again.');
      }
    }
  }

  isUsernameRegistered(username: string): boolean {
    return this.registeredUsers.some(user => user.username === username);
  }
}
