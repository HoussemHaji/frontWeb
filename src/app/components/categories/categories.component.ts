import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  posts$!: Observable<Post[]>;
  isClicked: Boolean = false;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  fetchPosts(id: number): void {

    this.posts$ = this.contentService.getPostsByCategory(id);
    this.isClicked = true;
  }



}
