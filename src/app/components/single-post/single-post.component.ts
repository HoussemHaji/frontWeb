import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  id: string | undefined;
  numberOfComments: number = 0; // Initialize number of comments
  content: string = '';

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private AuthService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
  }

  updateNumberOfComments(count: number): void {
    this.numberOfComments = count; // Update the number of comments
  }

  onSubmit(): void {
    if (this.id) {
      this.contentService.addComment(this.id, this.content).subscribe((res) => {
        this.content = '';
      });
    }
  }
}
