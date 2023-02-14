import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-social-media',
  templateUrl: './mst-social-media.component.html',
  styleUrls: ['./mst-social-media.component.scss']
})
export class MstSocialMediaComponent implements OnInit{

  constructor(private route : Router){ }

  ngOnInit() { }

  dashboard(){
    let pkcol = localStorage.getItem('pkcol');
    this.route.navigate(['/home/bodashboardviewer/' + pkcol]);
  }

}
