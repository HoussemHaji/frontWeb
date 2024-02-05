import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../Model/post';
import { ContentService } from '../../services/content.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  @Input()
  posts$!: Observable<Post[]>;

  constructor(private contentService: ContentService,
    private router: Router) { }


  ngOnInit(): void {}
}
