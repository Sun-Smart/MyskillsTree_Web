import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-skill-detsils',
  templateUrl: './mst-skill-detsils.component.html',
  styleUrls: ['./mst-skill-detsils.component.scss']
})
export class MstSkillDetsilsComponent implements OnInit {

  constructor(private route:Router){}

  ngOnInit() { }


  addEducation(){
    this.route.navigate(['/home/neweducation'])
  }

}
