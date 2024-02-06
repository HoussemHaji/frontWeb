import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, of, switchMap } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  @Output() posts$Emitter: EventEmitter<Observable<Post[]>> = new EventEmitter<Observable<Post[]>>();

  @ViewChild('postSearchInput', { static: true })
  postSearchInput!: ElementRef;

  searchResults: Post[] = [];
  showResults: boolean = false;

  constructor(
    private contetnService: ContentService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {

    fromEvent(this.postSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((res: string) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTerm: string) =>
          this.contetnService.searchPosts(searchTerm)
        )
      )
      .subscribe({
        next: (data: Post[]) => {
          console.log(data);
          this.searchResults = data;
          this.posts$Emitter.emit(of(data));
        },
        error: (err) => {
          console.log(err);
          this.toaster.warning(
            'An error occurred while fetching posts data.',
            'Error',
            {
              timeOut: 1000,
            }
          );
        },
      });
  }
}
