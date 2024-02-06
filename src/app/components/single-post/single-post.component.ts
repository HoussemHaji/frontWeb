import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { time } from 'console';
import { ToastrService } from 'ngx-toastr';

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
  userId !: string ;
  profileRoute: string = '/profile/';
  comments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  countComments: number = 0;
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private toastr: ToastrService,
    private router: Router
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
          this.fetchComments();
          this.toastr.success('Comment added successfully', '', {
            timeOut: 2000,
          });
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          this.contentService.handleErrors(error);
          this.toastr.error('Error adding comment', '', {
            timeOut: 2000,
          });
        }
      });
    }
  }

  fetchComments(): void {
    this.contentService.getComments(this.id ?? '').subscribe({
      next: (comments) => {

        this.comments.next(comments);
        this.countComments = comments.length;


      },
      error: (error) => {
        this.contentService.handleErrors(error);
      }
    });
  }

  navigateProfile():void{
      this.userId= this.post.userId;
      console.log(this.userId);

      this.router.navigate([`/profile/${this.userId??''}`]);
    }

  reportPost(): void {
    if (this.id) {
      this.contentService.reportPost(this.id).subscribe({
        next: (res) => {
          console.log('Post reported');
          this.toastr.success('Post reported successfully', '', {
            timeOut: 2000,
          });
        },
        error: (error) => {
          console.error('Error reporting post:', error);
          this.contentService.handleErrors(error);
          this.toastr.error('Error reporting post', '', {
            timeOut: 2000,
          });
        }
      });
    }
  }
}
