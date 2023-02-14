import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-career-details',
  templateUrl: './mst-career-details.component.html',
  styleUrls: ['./mst-career-details.component.scss']
})
export class MstCareerDetailsComponent implements OnInit {
  loginUser: any;

  constructor(private route : Router){
    this.loginUser = localStorage.getItem('username');
   }

  ngOnInit() {  }

  addproject(){
    this.route.navigate(['/home/newproject']);
  }
}
