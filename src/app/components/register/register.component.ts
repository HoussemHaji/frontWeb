// signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class SignupComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  profilePic = '';
  place = '';
  bio = '';
  selectedFile: File | null = null;
  constructor(
    private authService: AuthService, 
    private router: Router,
    private contentService: ContentService) { }

  onSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      profilePicUrl: this.profilePic,
      place: this.place,
      bio: this.bio

    };

    this.authService.signup(user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.contentService.uploadFile(this.selectedFile).subscribe((data: any) => {
        console.log(data);
        this.profilePic = data.filePath;
      }, (error) => {
        console.log(error);
      }
      );
    } else {
      console.log("No file selected");
    }
  }
}
