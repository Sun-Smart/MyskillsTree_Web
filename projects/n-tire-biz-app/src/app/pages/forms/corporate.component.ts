import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import {
  ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels, ApexPlotOptions,
  ApexYAxis, ApexLegend, ApexStroke, ApexXAxis, ApexFill, ApexTooltip
} from "ng-apexcharts";
import { mstapplicantmasterService } from '../../service/mstapplicantmaster.service';
import { mstcorporatemasterService } from '../../service/mstcorporatemaster.service';

export type ChartOptions = {
  series: ApexAxisChartSeries; chart: ApexChart; dataLabels: ApexDataLabels; plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis; xaxis: ApexXAxis; fill: ApexFill; tooltip: ApexTooltip; stroke: ApexStroke; legend: ApexLegend;
};


@Component({
  selector: 'app-corporate',
  template: `


    <ng-container *ngIf="isadmin">
   <div  id='contentAreanoscroll' style="overflow-y:">
    <div class="second row" 
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Job Requirements</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobq" custommenuid="544"></ngx-reportviewer>
    </div>

    <hr>

    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="arrA" custommenuid="544"></ngx-reportviewer>
    </div>
    
    </div>
    </ng-container>

    <ng-container *ngIf="!isadmin">

    <div class="row">
    <div class="col-12" style="">
    <div id="chart" style="width: 100%;border: 1px solid #e7dcdc;box-shadow: 0px 0px 1px 0px #b7b7b7;">
    <apx-chart
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [dataLabels]="chartOptions.dataLabels"
      [plotOptions]="chartOptions.plotOptions"
      [colors]="chartOptions.colors"
      [yaxis]="chartOptions.yaxis"
      [legend]="chartOptions.legend"
      [fill]="chartOptions.fill"
      [stroke]="chartOptions.stroke"
      [tooltip]="chartOptions.tooltip"
      [xaxis]="chartOptions.xaxis"
    ></apx-chart>
  </div>
    </div>
    <div class="col-12"></div>
    </div>


    <div  id='contentAreanoscroll' style="display:none;">

    <div class="second row" 
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Job Requirements</h1>
    </div>

    <div class="row" 
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobqc" custommenuid="544"></ngx-reportviewer>
    </div>
 
    <hr>
 
    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="arrA" custommenuid="544"></ngx-reportviewer>
    </div>

    </div>
    </ng-container>
    `
})
export class CorporateDashboardComponent implements OnInit {
  username: any;
  isadmin = false;
  userrole: any;
  showApplicantmenu: boolean = false;
  showAdminMenuaccess: boolean = false;
  showCorporateMenuaccess: boolean = false;
  menuvisible: boolean = true;

  @ViewChild("chart") chart: any;
  chartOptions: any
  pkcorporateid: any;
  coporate_id: any;
  jobData: any = [];
  job_detailsData: any = [];
  jobdesc_label: any = [];

  no_of_selected: any = [];
  no_of_rejected: any = [];
  no_of_pending: any = [];

  no_of_intrested: any = [];
  no_of_notIntrested: any = [];
  no_of_intrestPending: any = [];

  constructor(private sessionService: SessionService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private mstcorporatemasterservice: mstcorporatemasterService) {

  }

  ngOnInit() {
    debugger
    this.username = this.sessionService.getItem('username');
    if (this.sessionService.getItem('role') == '1') {
      this.userrole = 'Admin';
      this.showAdminMenuaccess = true;
      this.showApplicantmenu = false;
      this.showCorporateMenuaccess = false;
    } else if (this.sessionService.getItem('role') == '2') {
      this.userrole = 'Applicant';
      this.showApplicantmenu = true;
      this.showAdminMenuaccess = false;
      this.showCorporateMenuaccess = false;
    } else if (this.sessionService.getItem('role') == '3') {
      this.userrole = 'Corporate';
      this.showCorporateMenuaccess = true;
      this.showApplicantmenu = false;
      this.showAdminMenuaccess = false;
    }
    if (this.sessionService.getItem('role') == '2') this.menuvisible = false;

    this.get_coporateid();
    this.corporate_dashboard();
  };

  get_coporateid() {
    debugger
    this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
      this.pkcorporateid = res[0].corporateid;
      localStorage.setItem("coporateid", this.pkcorporateid);
    });
  }

  corporate_dashboard() {
    debugger
    this.coporate_id = this.sessionService.getItem("coporateid");

    this.mstapplicantmaster_service.get_corporateDashboardAll_details(this.coporate_id).then((res: any) => {
      debugger
      this.jobData = res.list_dashboardalljobs.value;


      console.log("this.jobData", this.jobData);

      // i got 72 data from => console.log("this.jobData", this.jobData);

      for (var i = 0; i < this.jobData.length; i++) {

        this.job_detailsData.push({
          jobdesc_label: this.jobData[i].jobdescription,
          no_of_intrested: this.jobData[i].numofintrested,
          no_of_notIntrested: this.jobData[i].numofnotintrested,
          no_of_intrestPending: this.jobData[i].numofintrestpending,
          no_of_selected: this.jobData[i].numberofselected,
          no_of_rejected: this.jobData[i].numberofrejected,
          no_of_pending: this.jobData[i].numberofpending,
        });

        this.jobdesc_label.push(this.jobData[i].jobdescription);

        this.no_of_intrested.push(this.jobData[i].numofintrested);
        this.no_of_notIntrested.push(this.jobData[i].numofnotintrested);
        this.no_of_intrestPending.push(this.jobData[i].numofintrestpending);

        this.no_of_selected.push(this.jobData[i].numberofselected);
        this.no_of_rejected.push(this.jobData[i].numberofrejected);
        this.no_of_pending.push(this.jobData[i].numberofpending);
      };

      // i Push the data what i need to bind to charts

      this.jobdesc_label.splice(6);
      this.no_of_selected.splice(6);
      this.no_of_rejected.splice(6);
      this.no_of_pending.splice(6);

      console.log("job_detailsData", this.job_detailsData);

      console.log("jobdesc_label", this.jobdesc_label);
      console.log("no_of_selected", this.no_of_selected);
      console.log("no_of_rejected", this.no_of_rejected);
      console.log("no_of_pending", this.no_of_pending);


      // but i couldn't get any data from that

      this.chartOptions = {
        series: [
          {
            name: "Selected",
            // data: [this.no_of_selected]
            data: [44, 55, 57, 56, 61, 58]
          },
          {
            name: "Rejected",
            // data: [this.no_of_rejected]
            data: [76, 85, 101, 98, 87, 105]
          },
          {
            name: "Pending",
            // data: [this.no_of_pending]
            data: [35, 41, 36, 26, 45, 48]
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        colors: ['#a2c568', '#e95845', '#f5f3e4'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [this.jobdesc_label]
          // categories: ['testing new', 'DevelpmentFirst', 'Angular1', 'C###', 'Admining', 'finance']
        },
        yaxis: {
          title: {
            text: "Job Vaccancy"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val;
            }
          }
        }
      };
    })
  }
}
