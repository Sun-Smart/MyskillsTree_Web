import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-resume',
  templateUrl: './mst-resume.component.html',
  styleUrls: ['./mst-resume.component.scss']
})
export class MstResumeComponent implements OnInit{
loginUser:any;
  constructor(private route : Router){
    this.loginUser = localStorage.getItem('username');
   }

  ngOnInit() {
  }

  addlanguagedetails(){
    this.route.navigate(['/home/newlanguage'])
  }

}
