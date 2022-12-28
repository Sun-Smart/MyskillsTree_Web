import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newskillsearch',
  templateUrl: './newskillsearch.component.html',
  styleUrls: ['./newskillsearch.component.scss']
})
export class NewskillsearchComponent implements OnInit {
  showList: boolean = true;
  showGrid: boolean = false;
  showCard: boolean = false;
  showData: any;
  emailid = "";
  raio: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let data = {
      id: "mstsr",
      SessionUser: "ss",
      parameters: null,
      addparams: null,
      status: "all",
      fkname: "",
      fk: "",
      fkname1: "",
      fk1: "",
      modulename: "",
      modulepkcol: "",
      key: "",
      pkvalue: 0
    }
    this.http.post('https://demo.herbie.ai/MySkillTreeapi/api/ReportViewer', data).subscribe((res: any) => {
      this.showData = res.results.Rows;
      console.log(this.showData);
    })
  }
  onList() {
    this.showList = true;
    this.showGrid = false;
    this.showCard = false;
  }
  onGrid() {
    this.showGrid = true;
    this.showCard = false;
    this.showList = false;
  };
  onCard() {
    this.showCard = true;
    this.showList = false;
    this.showGrid = false;
  }
  
  rangeChange(event) {
    this.raio = event.target.value;
 }

 
}
