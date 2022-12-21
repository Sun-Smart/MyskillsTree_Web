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
  listView = [
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    }
  ];
  cardView = [
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Muthu",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"
    },
    {
      "name": "Ram Mohan",
      "designation": "Tester",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Dhanasekaran",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    },
    {
      "name": "Suneel",
      "designation": "Developer",
      "city": "Chennai",
      "skills": "Graphic Design, Adobe illustrator, Adobe photoshop, Web Designing, Mobile Interface, Banner design"

    }
  ]
  showData: any;

  constructor(private http: HttpClient) {
    // alert();
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

}
