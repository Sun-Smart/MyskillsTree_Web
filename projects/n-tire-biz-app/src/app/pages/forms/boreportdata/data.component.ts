
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import { bomenumasterService } from '../../../../../../n-tire-biz-app/src/app/service/bomenumaster.service';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class dataComponent implements OnInit {


  url: any;
  menuactions: any;
  menuid: any;
  data: any;
  userrole: any;

  constructor(
    private sanitizer: DomSanitizer, public sessionService: SessionService,
    public dynamicconfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef) {
    this.data = dynamicconfig;
    console.log("this.data",this.data);
  }
  async ngOnInit() {

    if (this.sessionService.getItem('role') == '1') {
      this.userrole = 'Admin';
    } else if (this.sessionService.getItem('role') == '2') {
      this.userrole = 'Applicant';
    } else if (this.sessionService.getItem('role') == '3') {
      this.userrole = 'Corporate';
    }

    if (this.data != null && this.data.data != null) this.data = this.data.data;

    let url = this.data.url;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onClose() {
    this.dialogRef.close();
  }

}
