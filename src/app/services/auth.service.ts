// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../Model/user';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private user: User = new User();
  private UserSubject = new BehaviorSubject<User>(this.user);
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
  getUser(): any {
    return localStorage.getItem('user');
  }

  setUser(user: User): void {
    this.UserSubject.next(user);
  }

  getToken(): any {
    //return this.cookieService.get('token');
    return (
      (typeof window !== 'undefined' && localStorage.getItem('token')) ?? ''
    );
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http
      .post(`${this.apiUrl}/auth/login`, body, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.body.token);
            localStorage.setItem('user', JSON.stringify(response.body.user));
          }
          if (response.status === 200) {
            this.toastr.success('Login successful', '', {
              timeOut: 2000,
            });
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

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  getCurrentUser(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}
