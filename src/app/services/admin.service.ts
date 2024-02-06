import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Post } from '../Model/post';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  private URL: String = 'http://localhost:5000/api';
  private auth_token = this.authService.getToken();
  private headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth_token}`,
  };
  getreportedPosts(): Observable<Post[]> {
    return this.http.get<any[]>(this.URL + `/posts/reported`, {
      headers: this.headers,
    });
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(this.URL + `/posts/${id}`, {
      headers: this.headers,
    });
  }

  deleteReport(id: number): Observable<any> {
    return this.http.get(this.URL + `/posts/delete-repot/${id}`, {
      headers: this.headers,
    });
  }
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(this.URL + `/auth/users-number`, {
      headers: this.headers,
    });
  }
  getTotalPosts(): Observable<number> {
    return this.http.get<number>(this.URL + `/posts/number`, {
      headers: this.headers,
    });
  }
  getTotalReportedPosts(): Observable<number> {
    return this.http.get<number>(this.URL + `/posts/reported-number`, {
      headers: this.headers,
    });
  }
}
