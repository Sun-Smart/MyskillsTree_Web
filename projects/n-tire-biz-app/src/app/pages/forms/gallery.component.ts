import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { mstapplicantmasterService } from './../../service/mstapplicantmaster.service';
import { mstapplicantmaster } from './../../model/mstapplicantmaster.model';

import { AppConstants } from '../../shared/helper';
import { DomSanitizer } from '@angular/platform-browser';

import { DialogService } from 'primeng/dynamicDialog';
import { openfileComponent } from '../../custom/openfile.component';
import { opencommentComponent } from '../../custom/opencomment.component';

@Component({
    selector: 'app-gallery',
    template: `
    <div class="row">
    <ng-container  *ngFor="let uploadedfile of attachments">
    <div class="" style="width:305px;height:305px;margin-left: 10px;margin-top: 10px;">
    <iframe [src]="(uploadedfile.safeurl)" width='300px!important' height='300px!important;' style='border: 1px solid #000 !important;
    border-radius: 10px !important;border-width: thin;border-style: solid;'></iframe><br/>
    <a [routerLink]='' (click) = "geturl(uploadedfile,uploadedfile.filekey,uploadedfile.type)" >{{uploadedfile.name}}</a>&nbsp;&nbsp;{{uploadedfile.size}} bytes&nbsp;&nbsp;<i class='fa fa-thumbs-up backcolor' (click)='updateRatings(uploadedfile)'>&nbsp;{{uploadedfile.ratings}}</i>&nbsp;&nbsp;<i class='fa fa-eye backcolor'>&nbsp;{{uploadedfile.views}}</i>&nbsp;&nbsp;<i class='fa fa-comment backcolor'  (click)='(uploadedfile)'>&nbsp;{{getCount(uploadedfile.comments)}}</i>
    </div>
    </ng-container>
    </div>
    `
})
export class galleryComponent implements OnInit {
    isadmin = false;
    attachments: any;
    AttachmentURL = AppConstants.AttachmentURL;
    // showcorporatelogo: boolean  = true;
    // showapplicantlogo: boolean = true;
    constructor(private mstapplicantmasterservice: mstapplicantmasterService, private sessionService: SessionService, private sanitizer: DomSanitizer, public dialog: DialogService) {
        // if (localStorage.getItem('role') == '2') {
        //     this.showapplicantlogo = true;
        //     this.showcorporatelogo = false;
        // } else if (localStorage.getItem('role') == '3') {
        //     this.showapplicantlogo = false;
        //     this.showcorporatelogo = true;
        // }
    }

    getCount(e) {
        if (e != undefined && e != null && e != "") {
            //debugger;
            // console.log(e);
            // console.log(JSON.parse(e))
            return JSON.parse(e).length;
        }

    }
    geturl(e, filename: string, filetype: string) {
        //debugger;
        this.attachments[this.attachments.findIndex(x => x.Key === e.Key)].views += 1;
        this.dialog.open(openfileComponent,
            {
                data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
                header: filename
            }
        );
        //window.open(AppConstants.AttachmentURL + filename);
        return;
    }
    getURL(filename) {
        let url;
        url = this.sanitizer.bypassSecurityTrustResourceUrl(AppConstants.AttachmentURL + filename);
        return url;
    }
    ngOnInit() {
        let applicantid = this.sessionService.getItem("applicantid");
        this.mstapplicantmasterservice.get_mstapplicantmasters_ByID(applicantid).then(res => {

            this.attachments = JSON.parse(res.mstapplicantmaster.attachment);
            for (var i = 0; i < this.attachments.length; i++) {
                this.attachments[i].safeurl = this.sanitizer.bypassSecurityTrustResourceUrl(AppConstants.AttachmentURL + this.attachments[i].name);
            }
            debugger;




        }).catch((err) => {
            //console.log(err);
        });
       
    }

}