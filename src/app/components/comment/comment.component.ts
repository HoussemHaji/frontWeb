import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() PostId: string | undefined;
  @Output() commentCount: EventEmitter<number> = new EventEmitter<number>();

  comments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.contentService.getComments(this.PostId ?? '').subscribe({
      next: (comments) => {
        this.comments.next(comments);
        console.log(comments);
        this.commentCount.emit(comments.length);
      },
      error: (error) => {
        this.contentService.handleErrors(error);
      }
    });
  }
}
