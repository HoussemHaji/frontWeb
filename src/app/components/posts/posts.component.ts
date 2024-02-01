import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../Model/post';
import { ContentService } from '../../services/content.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  @Input()
  posts: Post[] = [];

  constructor(private contentService: ContentService,
    private router:Router) {}

  ngOnInit(): void {

  }
}
