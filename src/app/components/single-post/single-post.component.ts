import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {
  id: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    console.log(this.id);
  }

}
