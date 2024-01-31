import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { time } from 'console';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  id: string | undefined;
  numberOfComments: number = 0; // Initialize number of comments
  content: string = '';
  showSuccessToast: boolean = false;
  post: any = {};
  comments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  countComments: number = 0;
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.id) {
      this.contentService.getPost(this.id).subscribe((post) => {
        this.post = post;
      });
    }

    this.fetchComments();



  }



  onSubmit(): void {
    if (this.id) {
      this.contentService.addComment(this.id, this.content).subscribe({
        next: (res) => {
          console.log(res);
          console.log('Comment added');
          this.content = '';
          this.showSuccessToast = true;
          setTimeout(() => {
            this.showSuccessToast = false;
          }, 5000);
          this.fetchComments();
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          // Handle the error here, you can display an error message or perform other actions
        }
      });
    }
  }

  fetchComments(): void {
    this.contentService.getComments(this.id ?? '').subscribe({
      next: (comments) => {
        console.log(comments);
        this.comments.next(comments);
        this.countComments = comments.length;


      },
      error: (error) => {
        this.contentService.handleErrors(error);
      }
    });
  }
}
