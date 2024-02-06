import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../Model/post';
import { ContentService } from '../../services/content.service';
import { User } from '../../Model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id: string | undefined;
  posts: Post[] = [];
  user!: User;
  posts$!: Observable<Post[]>;
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.contentService.getUser(this.id ?? '').subscribe((user) => {
      this.user = user;

      console.log(this.user);
      this.fetchPosts(this.user.id);
    });
  }

  fetchPosts(IDD: string): void {
    this.posts$ = this.contentService.getPostsForUser(IDD);
  }

}
