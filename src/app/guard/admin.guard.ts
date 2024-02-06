
import { Injectable } from '@angular/core';
import {

  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') && JSON.parse(this.authService.getUser()).roles === 'Admin') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return false;
  }
}
