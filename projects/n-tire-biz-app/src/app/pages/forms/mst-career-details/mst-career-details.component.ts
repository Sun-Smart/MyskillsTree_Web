import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-career-details',
  templateUrl: './mst-career-details.component.html',
  styleUrls: ['./mst-career-details.component.scss']
})
export class MstCareerDetailsComponent implements OnInit {

  constructor(private route : Router){ }

  ngOnInit() {  }

  addproject(){
    this.route.navigate(['/home/newproject']);
  }
}
