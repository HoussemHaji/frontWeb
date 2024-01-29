import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Model/post';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private URL: String = 'http://localhost:5000/api';
  private auth_token = this.authService.getToken();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth_token}`,
  });
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.URL + '/posts', {
      headers: this.headers,
    });
  }
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.URL + `/posts/${id}`, {
      headers: this.headers,
    });
  }
  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL + `/comments/${id}`, {
      headers: this.headers,
    });
  }
}
