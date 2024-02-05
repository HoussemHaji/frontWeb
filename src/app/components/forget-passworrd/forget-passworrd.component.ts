import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-passworrd',
  templateUrl: './forget-passworrd.component.html',
  styleUrl: './forget-passworrd.component.css'
})
export class ForgetPassworrdComponent implements OnInit {

  email!: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
    // private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      (res) => {
        this.toastr.success('Password reset link sent to your email', 'Success');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

}
