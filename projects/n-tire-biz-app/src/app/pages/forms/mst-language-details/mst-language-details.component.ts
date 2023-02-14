import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-language-details',
  templateUrl: './mst-language-details.component.html',
  styleUrls: ['./mst-language-details.component.scss']
})
export class MstLanguageDetailsComponent implements OnInit {

  constructor(private route : Router){ }

  ngOnInit() { }

  addsocialmedia(){
    this.route.navigate(['/home/newsocial'])
  }

}
