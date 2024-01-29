// signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class SignupComponent {
  firstname = '';
  lastname = '';
  email = '';
  password= '';
  profilePic = ''; // You might handle file uploads differently

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      profilePic: this.profilePic
    };

    this.authService.signup(user).subscribe(
      () => {
        // Successful signup, navigate to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle signup error
        console.error('Signup failed', error);
      }
    );
  }
}
