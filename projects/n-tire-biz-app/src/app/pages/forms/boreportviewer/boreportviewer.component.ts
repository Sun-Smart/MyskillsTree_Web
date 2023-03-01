import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
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
    public dynamicconfig: DynamicDialogConfig, private boreportservice: boreportService) {
    this.dialogdata = this.dynamicconfig;
  }
  ngAfterViewInit() {

    if (this.currentRoute.snapshot.paramMap.get('id') && this.currentRoute.snapshot.paramMap.get('id')) this.reportcode = this.currentRoute.snapshot.paramMap.get('id');
    this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
      if (res.dashboardid && res.dashboardid != null) this.dashboardid = res.dashboardid;
    });
    this.menuid = this.sharedService.menuid;
  }
  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      this.dashboardid = 0;
      this.reportid = 0;
      if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
      if (params.id) {
        this.reportcode = params.id;
      }
      else if (this.dialogdata.reportcode && this.dialogdata.reportcode != null) this.reportcode = this.dialogdata.reportcode;

      this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
        this.reportid = res[0].reportid;
        if (res[0].dashboardid && res[0].dashboardid != null) this.dashboardid = res[0].dashboardid;
        this.ParamsChangeEvent.emit(this.reportcode);

      });
      this.menuid = this.sharedService.menuid;
    });
  }
}
