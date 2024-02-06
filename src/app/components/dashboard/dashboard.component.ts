import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Post } from '../../Model/post';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  reportedPosts$!: Observable<Post[]>;
  totalUsers$!: Observable<number>;
  totalPosts$!: Observable<number>;
  totalReportedPosts$!: Observable<number>;

  constructor(
    private adminService: AdminService,
  
  ) { }
  ngOnInit(): void {

    this.reportedPosts$ = this.adminService.getreportedPosts();
    console.log(this.reportedPosts$);
    this.adminService.getreportedPosts().subscribe((posts) => {
      console.log(posts);
    });

    this.totalUsers$ = this.adminService.getTotalUsers();
    this.totalPosts$ = this.adminService.getTotalPosts();
    this.totalReportedPosts$ = this.adminService.getTotalReportedPosts();
    this.totalReportedPosts$.subscribe((posts) => {
      console.log(posts);
    });
  }

  DeletePost(id: number): void {
    console.log('Deleting post with id:', id);
    this.adminService.deletePost(id).subscribe({
      next: (res: any) => {
        this.ngOnInit();
      },
      error: (error: Error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  deleteReport(id: number): void {
    console.log('Deleting report with id:', id);
    this.adminService.deleteReport(id).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('Report deleted');
        this.ngOnInit();
      },
      error: (error: Error) => {
        console.error('Error deleting report:', error);
      }
    });
  }

}
