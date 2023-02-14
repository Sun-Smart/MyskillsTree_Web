import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-language-details',
  templateUrl: './mst-language-details.component.html',
  styleUrls: ['./mst-language-details.component.scss']
})
export class MstLanguageDetailsComponent implements OnInit {
loginUser:any;
  constructor(private route : Router){
    this.loginUser = localStorage.getItem('username');
   }

  ngOnInit() { }

  addsocialmedia(){
    this.route.navigate(['/home/newsocial'])
  }

}
