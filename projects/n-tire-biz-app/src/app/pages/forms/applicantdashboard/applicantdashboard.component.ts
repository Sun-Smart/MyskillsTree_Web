import { Component, OnInit,Input } from '@angular/core';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { mstapplicantskilldetailgridComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';
import { DialogService } from 'primeng/dynamicDialog';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-applicantdashboard',
    templateUrl: './applicantdashboard.component.html',
})
export class applicantdashboardComponent implements OnInit {
    applicantid:any;
    isadmin = false;
    constructor(public dialog: DialogService,private currentRoute: ActivatedRoute, private sessionService: SessionService) {
        this.applicantid=this.sessionService.getItem("applicantid");
    }

    ngOnInit() {
        this.applicantid = this.currentRoute.snapshot.paramMap.get('id');
        if (this.sessionService.getItem("role") == '1') {
            this.isadmin = true;
        }
    }
    showSkills()
    {
        this.dialog.open(mstapplicantskilldetailgridComponent,
            {
              data: { ScreenType:2, applicantid: this.applicantid,save:true}
            }
          )
    }
}
