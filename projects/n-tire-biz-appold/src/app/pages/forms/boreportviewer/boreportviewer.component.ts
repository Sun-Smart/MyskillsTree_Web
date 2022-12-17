import { Component, OnDestroy, Input, AfterViewInit, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { ReportViewerCtrlComponent } from './reportviewerctrl.component';
import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import { boreport } from '../../../../../../n-tire-biz-app/src/app/model/boreport.model';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { boreportService } from '../../../../../../n-tire-biz-app/src/app/service/boreport.service';

@Component({
  selector: 'app-boreportviewer',
  template: `
  <ngx-dashboardviewer *ngIf="dashboardid>0" [customdashboardid]="dashboardid"></ngx-dashboardviewer>
<ngx-reportviewer  *ngIf="reportcode!=''" class="form-group row"  [reportparameterid]="reportcode" [ParamsChange]="ParamsChangeEvent" ></ngx-reportviewer>
  `
})
export class BOReportViewerComponent implements AfterViewInit {
  reportid: any;
  reportcode: any;
  dashboardid: any;
  dialogdata: any;
  ParamsChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  menuid: any;
  constructor(private currentRoute: ActivatedRoute, private sharedService: SharedService,
    public dynamicconfig: DynamicDialogConfig,
    private boreportviewerservice: BOReportViewerService, private boreportservice: boreportService) {
    debugger;
    this.dialogdata = this.dynamicconfig;
  }
  ngAfterViewInit() {
    debugger;
    //this.reportid =0;

    if (this.currentRoute.snapshot.paramMap.get('id') && this.currentRoute.snapshot.paramMap.get('id')) this.reportcode = this.currentRoute.snapshot.paramMap.get('id');
    //this.boreportviewerservice.getBOReportResultsByID(parseInt(this.reportid), null, null, null, null, null, null).then((res:any) => {
    this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
      ////debugger;
      if (res.dashboardid && res.dashboardid != null) this.dashboardid = res.dashboardid;
    });
    this.menuid = this.sharedService.menuid;
  }
  ngOnInit() {
    debugger;
    this.currentRoute.params.subscribe(params => {

      debugger;
      //this.value=null;
      this.dashboardid = 0;
      this.reportid = 0;
      if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
      if (params.id) {
        this.reportcode = params.id;
      }
      else if (this.dialogdata.reportcode && this.dialogdata.reportcode != null) this.reportcode = this.dialogdata.reportcode;


      ////debugger;

      //this.boreportviewerservice.getBOReportResultsByID(parseInt(this.reportid), null, null, null, null, null, null).then((res:any) => {
      //////debugger;
      this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
        this.reportid = res[0].reportid;
        if (res[0].dashboardid && res[0].dashboardid != null) this.dashboardid = res[0].dashboardid;
        this.ParamsChangeEvent.emit(this.reportcode);

      });
      this.menuid = this.sharedService.menuid;
    });
  }
}