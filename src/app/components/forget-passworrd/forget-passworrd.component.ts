import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-passworrd',
  templateUrl: './forget-passworrd.component.html',
  styleUrl: './forget-passworrd.component.css'
})
export class ForgetPassworrdComponent implements OnInit{
  

  
  ngOnInit(): void {
  this.autservice.forgetPassword(this.email).
  }

}
