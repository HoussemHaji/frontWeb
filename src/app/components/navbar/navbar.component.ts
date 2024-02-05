import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

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
