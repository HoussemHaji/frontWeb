import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service'; // Import your authentication service
import { Post } from '../../Model/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Correct typo in styleUrls
})
export class HomeComponent implements OnInit {
  id: string | undefined;
  posts: Post[] = [];
  userData: any = [];

  constructor(
    private contentService: ContentService,
    private authService: AuthService // Inject your authentication service
  ) {}

  ngOnInit(): void {
    // Fetch user data
    this.authService.getCurrentUser().subscribe((user) => {
      this.userData = user;
      console.log(this.userData);
    });

    // Fetch posts
    this.contentService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
