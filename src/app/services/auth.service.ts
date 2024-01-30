// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../Model/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private user: User = new User();
  private UserSubject = new BehaviorSubject<User>(this.user);
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
  getUser(): Observable<User> {
    return this.UserSubject.asObservable();
  }

  setUser(user: User): void {
    this.UserSubject.next(user);
  }

  getToken(): string {
    //return this.cookieService.get('token');
    return localStorage.getItem('token') ?? '';
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http
      .post(`${this.apiUrl}/auth/login`, body, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          // Extract and log cookies from the response headers
          localStorage.setItem('token', response.body.token);
          if (response.status === 200) {
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticatedValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
