import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-corporate',
    template: `


    <ng-container *ngIf="isadmin">
   <div  id='contentAreanoscroll' style="overflow-y:">
    <div class="second row" 
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Job Requirements</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobq" custommenuid="544"></ngx-reportviewer>
    </div>
    <p></p>
    <hr>
    <p></p>
    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="arrA" custommenuid="544"></ngx-reportviewer>
    </div>
    </div>
    </ng-container>
    <ng-container *ngIf="!isadmin">
    <div  id='contentAreanoscroll'>
    <div class="second row" 
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Job Requirements</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobqc" custommenuid="544"></ngx-reportviewer>
    </div>
    <p></p>
    <hr>
    <p></p>
    <div class="second row"
    [ngClass]="{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}">
    <h1>Reference Requests</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="arrA" custommenuid="544"></ngx-reportviewer>
    </div>
      </div>
    </ng-container>
    `
})
export class CorporateDashboardComponent implements OnInit {
    username: any;
    isadmin = false;
    userrole:any;
    showApplicantmenu: boolean = false;
    showAdminMenuaccess: boolean = false;
    showCorporateMenuaccess: boolean = false;
    menuvisible: boolean = true;

    constructor(private sessionService: SessionService) {

    }

    ngOnInit() {

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
    }
    
}
