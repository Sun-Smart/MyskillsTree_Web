import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions,
  ApexYAxis, ApexLegend, ApexStroke, ApexXAxis, ApexFill, ApexTooltip
} from "ng-apexcharts";
import { mstapplicantmasterService } from '../../service/mstapplicantmaster.service';

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
    </div>

    <hr>

    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    </div>

    </div>
</ng-container>

    <ng-container *ngIf="!isadmin">

    <div class="row" style="margin-top: 1rem !important;overflow-y: scroll;height: 570px;">
    <div class="col-12 col-sm-12 col-xs-12 mobile_view">
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

    <div class="col-6 col-sm-12 col-xs-12 mobile_view">
<div style="display:none;">
    <ngx-datatable tableClass="table table-striped table-bordered table-hover" [tableId]="'basic'" [data]="data" [options]="options"
    [columns]="columns">
  </ngx-datatable>
  </div>
    <table class="table table-bordered" >
    <thead>
    <tr>
    <th>S.No</th>
    <th>Job Name</th>
    <th>No Of Position</th>
    <th>No Of Intrested</th>
    <th>No Of Rejected</th>
    <th>No Of Pending</th>
    </tr>
    </thead>
    <tbody *ngFor="let item of job_detailsData; let i = index">
    <tr>
    <td>{{i+1}}</td>
    <td>{{item.jobdesc_label}}</td>
    <td>{{item.no_of_position}}</td>
    <td>{{item.no_of_intrested}}</td>
    <td>{{item.no_of_notIntrested}}</td>
    <td>{{item.no_of_intrestPending}}</td>
    </tr>
    </tbody>
    </table>
    </div>


    </div>


    <div  id='contentAreanoscroll' style="display:none;">

    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Job Requirements</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    </div>

    <hr>

    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>

    <div class="row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    </div>

    </div>
    </ng-container>
    `,
  styles: [`
    @media only screen and (max-width: 600px) {
    div#apexchartsql0rl9sui{
      width: 100% !important;
    }
    table.table.table-bordered{
      display: block!important;
      height: 300px!important;
      overflow: scroll!important;
      margin-top: 10px !important;
      max-width: fit-content !important;
      width: 320px !important;
    }
    .mobile_view{
      height: 350px !important;
    }
    }
    `]
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

  options = {}
  data = [];
  columns: any = [];

  chartOptions: any
  pkcorporateid: any;
  jobData: any = [];
  index = 1;
  job_detailsData: any = [];
  jobdesc_label: any = [];

  no_of_selected: any = [];
  no_of_rejected: any = [];
  no_of_pending: any = [];

  no_of_intrested: any = [];
  no_of_notIntrested: any = [];
  no_of_intrestPending: any = [];

  tabledata: any = []
  coporate_id: string;
  employeeid: string;

  constructor(private sessionService: SessionService,
    private mstapplicantmaster_service: mstapplicantmasterService) {
        this.coporate_id = localStorage.getItem("coporateid");
  }

  ngOnInit() {
    this.username = this.sessionService.getItem('username');
    if (this.sessionService.getItem('role') == '1') {
      this.userrole = 'Admin';
      this.showAdminMenuaccess = true;
      this.showApplicantmenu = false;
      this.showCorporateMenuaccess = false;
      this.corporate_dashboard();
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
      this.corporate_dashboard();
    }
    if (this.sessionService.getItem('role') == '2') this.menuvisible = false;
  };

  corporate_dashboard() {
    if(this.sessionService.getItem('role') == '3'){
      this.coporate_id = localStorage.getItem("coporateid");
    }else if(this.sessionService.getItem('role') == '1'){
      this.employeeid = localStorage.getItem("employeeid");
    }
    this.mstapplicantmaster_service.get_corporateDashboardAll_details(this.coporate_id ? this.coporate_id : this.employeeid).then((res: any) => {

      this.jobData = res.list_dashboardalljobs.value;
      for (var i = 0; i < this.jobData.length; i++) {

        this.job_detailsData.push({
          jobdesc_label: this.jobData[i].jobdescription,
          no_of_position: this.jobData[i].numberofpositions,
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

      this.chartOptions = {
        series: [
          {
            name: "Total Required",
            data: this.no_of_intrested
          },
          {
            name: "Selected",
            data: this.no_of_selected
          },
          {
            name: "Rejected",
            data: this.no_of_notIntrested
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        colors: ['#00BFFF', '#a2c568', '#e95845'],
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
          categories: this.jobdesc_label
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

    this.columns = [
      { prop: 'jobdesc_label', name: 'Job Name' },
      { prop: 'no_of_position', name: 'No Of Position' },
      { prop: 'no_of_intrested', name: 'No Of Interested' },
      { prop: 'no_of_notIntrested', name: 'No Of Not Interested' },
      { prop: 'no_of_intrestPending', name: 'No Of Interested Pending' }
    ];
    this.tabledata = this.job_detailsData;
  }
}
