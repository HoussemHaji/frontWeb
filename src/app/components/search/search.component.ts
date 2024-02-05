import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Post } from '../../Model/post';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

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
        next: (data: any) => {
          console.log(data);
          this.searchResults = data;
          this.contetnService.posts$.next(data);
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
