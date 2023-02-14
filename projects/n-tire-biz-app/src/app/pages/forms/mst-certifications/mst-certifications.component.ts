import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-certifications',
  templateUrl: './mst-certifications.component.html',
  styleUrls: ['./mst-certifications.component.scss']
})
export class MstCertificationsComponent implements OnInit{
  loginUser: any;
  constructor(private route : Router){
    this.loginUser = localStorage.getItem('username');
   }

  ngOnInit() { }

  addresume(){
    this.route.navigate(['/home/newresume'])
  }
}
