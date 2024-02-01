import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  selectedFile: File | null = null;
  categories: any[] = [];
  constructor(
    private contetnService: ContentService
  ) { }

  ngOnInit(): void {
    this.contetnService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!(form.value.Image instanceof File)) {
      console.log(typeof (form.value.Image));
      console.log(form.value.Image);
    }
    this.contetnService.uploadFile(form.value.Image).subscribe((data: any) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    }
    );
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

  uploadFile(fileInput: any) {
    if (this.selectedFile) {
      // You can now upload this.selectedFile to your server or handle it as needed
      console.log('Uploading file:', this.selectedFile);
      if (!(this.selectedFile instanceof File)) {
        console.log(typeof (this.selectedFile));
        console.log("Zab");
      }
    } else {
      console.error('No file selected!');
    }
  }
}
