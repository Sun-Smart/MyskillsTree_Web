
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, Input, forwardRef } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import { bomenumasterService } from '../../../../../../n-tire-biz-app/src/app/service/bomenumaster.service';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
//import { mstapplicantmasterComponent } from '../mstapplicantmaster/mstapplicantmaster.component';

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
    private sanitizer: DomSanitizer,
    private router: Router, public sessionService: SessionService,
    public dynamicconfig: DynamicDialogConfig,
    private boreportviewerservice: BOReportViewerService,
    private bomenumasterservice: bomenumasterService, public dialogRef: DynamicDialogRef) {
    this.data = dynamicconfig;
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
    debugger;


    console.log(this.data.url);
    //let url = "/#/workflow/" + this.data.modulename + "/" + this.data.modulename + "/edit/" + encodeURIComponent(this.data.pkvalue);
    let url = this.data.url;
    console.log((url));
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    console.log((this.url));
    //debugger;

    /*
    this.menuid=82;
    this.bomenumasterservice.getbomenumastersByID(parseInt(this.menuid)).then((res:any) => {
        //this.menumasterdata=res.bomenumaster;
        this.menuactions = res.bomenuaction;
        
    });    
    */
  }
  onClose() {
    this.dialogRef.close();
  }

}