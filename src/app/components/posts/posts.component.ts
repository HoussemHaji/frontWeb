import { Component, OnInit } from '@angular/core';
import { Post } from '../../Model/post';
import { ContentService } from '../../services/content.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private contentService: ContentService,
    private router:Router) {}

  ngOnInit(): void {
    this.contentService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
