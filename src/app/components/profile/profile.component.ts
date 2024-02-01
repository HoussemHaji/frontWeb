import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../Model/post';
import { ContentService } from '../../services/content.service';
import { User } from '../../Model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  id: string | undefined;
  posts: Post[] = [];
  user!: User;
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
    this.contentService.getPostsForUser(IDD).subscribe((posts) => {
      this.posts = posts;
    });
  }

}
