import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  posts: Post[] = [];
  isClicked : Boolean = false;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  fetchPosts(id : number): void {
    this.contentService.getPostsByCategory(id).subscribe((posts) => {
      this.posts = posts;
      this.isClicked = true;
      console.log(this.posts);
    });
  }



}
