import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../Model/post';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../Model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: string | undefined;
  posts$!: Observable<Post[]>;
  sub!: Subscription;
  user!: User;

  constructor(
    private contentService: ContentService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

    this.user = JSON.parse(this.authService.getUser());
    this.contentService.getPosts().subscribe(
      (data) => {
        this.contentService.posts$.next(data);
      }, (error) => {
        console.error('Error fetching posts', error);
      }
    );

    
  }
}
