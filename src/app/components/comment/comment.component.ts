import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() PostId: string | undefined;
  @Output() commentCount: EventEmitter<number> = new EventEmitter<number>();

  comments: any[] | undefined;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getComments(this.PostId ?? '').subscribe((comments) => {
      this.comments = comments;
      this.commentCount.emit(this.comments.length); // Emit the length of comments
    });
  }
}
