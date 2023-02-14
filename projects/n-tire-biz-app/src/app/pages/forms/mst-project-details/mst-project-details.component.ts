import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-project-details',
  templateUrl: './mst-project-details.component.html',
  styleUrls: ['./mst-project-details.component.scss']
})
export class MstProjectDetailsComponent implements OnInit {
loginUser:any;
  constructor(private route : Router){
    this.loginUser = localStorage.getItem('username');
   }

  ngOnInit() { }


  addcertification(){
    this.route.navigate(['/home/newcertification']);
  }
}
