import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-corporate',
    template: `


    <ng-container *ngIf="isadmin">
   <div  id='contentAreanoscroll' style="overflow-y:">
    <div class="second row seconds">
    <h1>Job Requirements</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobq" custommenuid="544"></ngx-reportviewer>
    </div>
    <p></p>
    <hr>
    <p></p>
    <div class="second row seconds">
    <h1>Reference Requests</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="arrA" custommenuid="544"></ngx-reportviewer>
    </div>
    </div>
    </ng-container>
    <ng-container *ngIf="!isadmin">
    <div  id='contentAreanoscroll'>
    <div class="second row seconds" >
    <h1>Job Requirements</h1>
    </div>
    <div class="row">
    <ngx-reportviewer style="width: 200px!important;height:200px !important;" class="" viewtype="'1'" customreportid="jobqc" custommenuid="544"></ngx-reportviewer>
    </div>
    <p></p>
    <hr>
    <p></p>
    <div class="second row" seconds>
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
    isadmin = false;
    constructor(private sessionService: SessionService) {

    }

    ngOnInit() {
        if (this.sessionService.getItem("role") == '1') {
            this.isadmin = true;
        }
    }

}
