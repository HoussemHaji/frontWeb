import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  id: string | undefined;
  posts: Post[] = [];

  constructor(
    private contentService : ContentService
  ) {

  }

  ngOnInit(): void {
    this.contentService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts);
    });

  }




}
