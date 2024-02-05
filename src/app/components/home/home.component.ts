import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service'; // Import your authentication service
import { Post } from '../../Model/post';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Correct typo in styleUrls
})
export class HomeComponent implements OnInit {
  id: string | undefined;
  posts$!: Observable<Post[]>;
  sub!: Subscription;
  // posts: Post[] = [];

  constructor(
    private contentService: ContentService
  ) {

  }

  ngOnInit(): void {

    this.posts$ = this.contentService.getPosts();

    // this.contentService.getPosts().subscribe((posts) => {
    //   this.posts = posts;

    // });


  }
}
