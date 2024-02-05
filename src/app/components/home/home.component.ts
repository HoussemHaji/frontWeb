import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
