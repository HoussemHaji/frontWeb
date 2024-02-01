import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  selectedFile: File | null = null;
  categories: any[] = [];
  showAlert: boolean = false;
  constructor(
    private contetnService: ContentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.contetnService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.selectedFile) {
      this.contetnService.uploadFile(this.selectedFile).subscribe((data: any) => {
        form.value.mainImageUrl = data.filePath
        this.createPostfunction(form.value);
        this.toastr.success('Personnes chargées avec succès', '', {
          timeOut: 2000,
        });

      }, (error) => {
        console.log(error);
      }
      );
    } else {
      this.toastr.error('changer l\'image', '', {
        timeOut: 2000,
      });
      console.log("No file selected");
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.contetnService.uploadFile(this.selectedFile).subscribe((data: any) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      }
      );
    } else {
      console.log("No file selected");
    }
  }

  createPostfunction(form: any) {
    this.contetnService.createPost(form).subscribe((data: any) => {
      console.log(data);
    }
    );
  }

  getCategoryIdByTitle(title: string): number | null {
    const category = this.categories.find(cat => cat.title === title);
    return category ? category.id : null;
  }

  uploadFile(fileInput: any) {
    // if (this.selectedFile) {
    //   // You can now upload this.selectedFile to your server or handle it as needed
    //   console.log('Uploading file:', this.selectedFile);
    //   if (!(this.selectedFile instanceof File)) {
    //     console.log(typeof (this.selectedFile));
    //     console.log("Zab");
    //   }
    // } else {
    //   console.error('No file selected!');
    // }
  }
}
