import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {


  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        // Successful login, navigate to "home" page
        this.router.navigate(['/home']);

      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }

}
