import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  showAlert: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    );
  }
}
