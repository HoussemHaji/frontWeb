import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {}
  ngOnInit(): void { }

  // isAdmin(): boolean {
  //   return  
  // }
  isAdmin() {
    if (typeof window !== 'undefined') {
      if (JSON.parse(this.authService.getUser()).roles === 'Admin') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  

  isLoggedIn(): boolean {
    return (typeof window !== 'undefined' && (localStorage.getItem('token') !== null));
  }

  logout(): void {

    
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.success('See you soon', '', {
      timeOut: 2000,
    });
  }
}
