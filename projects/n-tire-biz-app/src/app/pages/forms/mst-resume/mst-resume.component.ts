import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-resume',
  templateUrl: './mst-resume.component.html',
  styleUrls: ['./mst-resume.component.scss']
})
export class MstResumeComponent implements OnInit{

  constructor(private route : Router){ }

  ngOnInit() {
  }

  addlanguagedetails(){
    this.route.navigate(['/home/newlanguage'])
  }

}
