import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../Model/post';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  private URL: String = 'http://localhost:5000/api';
  private auth_token = this.authService.getToken();
  posts$ = new BehaviorSubject<Post[]>([]);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth_token}`,
  });
  getPostsForUser(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.URL + `/posts/user/${userId}?sort=updatedAt`, {
      headers: this.headers,
    });
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.URL + `/posts?sort=updatedAt`, {
      headers: this.headers,
    });
  }
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.URL + `/posts/${id}`, {
      headers: this.headers,
    });
  }
  getComments(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.URL + `/comments/${id}`, {
      headers: this.headers,
    });
  }
  addComment(id: string, content: string): Observable<any> {
    return this.http.post(
      this.URL + `/comments`,
      { content: content, postId: id },
      { headers: this.headers }
    );
  }
  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.URL + `/auth/profile/${id}`, {
      headers: this.headers,
    });
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + `/category`, {
      headers: this.headers,
    });
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.post(this.URL + `/posts/upload-photo`, formData);
  }

  handleErrors(error: any): void {
    if (error.status === 401) {
      if(typeof window !== 'undefined')
      {localStorage.removeItem('token');}
      console.log('Unauthorized');
    }
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(this.URL + `/posts`, post, {
      headers: this.headers,
    });
  }

    getPostsByCategory(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/category/filter/posts?categoryIds=${categoryId}`, {
      headers: this.headers,
    });
  }

  searchPosts(title: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/posts/search?title=${title}`, {
      headers: this.headers,
    });
  }

}
