import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-education-details',
  templateUrl: './mst-education-details.component.html',
  styleUrls: ['./mst-education-details.component.scss']
})
export class MstEducationDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() { };

  addCareer() {
    this.route.navigate(['/home/newcareerdetails']);
  }

}
