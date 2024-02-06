import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../Model/post';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../Model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id: string | undefined;
  posts$!: Observable<Post[]>;
  user!: User;

  constructor(
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.authService.getUser());
    this.posts$ = this.contentService.getPosts();
    this.posts$.forEach((post) => console.log(post));
  }

  onPostsEmitted(posts$: Observable<Post[]>): void {
    this.posts$ = posts$;
  }
}
