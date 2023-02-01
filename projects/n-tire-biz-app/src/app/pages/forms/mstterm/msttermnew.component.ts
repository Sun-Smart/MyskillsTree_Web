import { msttermService } from './../../../service/mstterm.service';
import { mstterm } from './../../../model/mstterm.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-biz-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { bousermasterService } from '../../../service/bousermaster.service';
import { RouteStateService } from '../../core/services/route-state.service';
import { UserContextService } from '../../core/services/user-context.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-msttermnew',
    templateUrl: './msttermnew.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
      button#checkbutton{
        width: 100% !important;
        margin: 0px !important;
      }
      #mstaccept{
        position: relative;
        right: 26px !important;
        font-size: 10px !important;
      }
      button#cancelBtn{
        width: 100% !important;
      }
    }


    `],
    providers: [KeyboardShortcutsService]
})



export class msttermnewComponent implements OnInit {
    mstterm_Form: FormGroup;
    private readonly minlengthemail = 5;
    private readonly minlengthPassword = 10;
    locale: string;
    theme: string;
    email: any;
    password: any;
    loggedIn: boolean = false;
    sessiondata: any;
    fieldTextType: boolean;
    rememberMe: boolean = false;
    password2: string;
    email2: string;
    remem: any;
    applicantid: any;
    terms: any;
    termsid: any;
    showSubmit: boolean = false;
    Authorization_token: string;
    termsContent: string;
    constructor(private sharedService: SharedService, private translate: TranslateService,
        private fb: FormBuilder,
        private userService: bousermasterService,
        private toastService: ToastService, private http: HttpClient,
        private routeStateService: RouteStateService,
        public sessionService: SessionService,
        public dialogRef: DynamicDialogRef,
        //public translate: TranslateService,
        // private themeService: ThemeService,
        private userContextService: UserContextService,
        private router: Router,
        private msttermService: msttermService,
        public dialog: DialogService, private spinner: NgxSpinnerService
    ) {
        this.Authorization_token=localStorage.getItem('token');

        this.mstterm_Form = fb.group({
            terms: [""],
            currentterm: [""],
            termsaccept: [""]
        })
    }
    ngOnInit() {
        document.getElementById('checkbutton').style.display = 'none';
        this.termsContent =localStorage.getItem('terms');
    }
    onSubmit() {
        debugger
        this.spinner.show();
        // this.http.get('https://demo.herbie.ai/MySkillTree/api/mstuseracceptedterm/acceptedterms').subscribe(res => {
        //     alert(res);
        // })
        this.msttermService.saveOrUpdate_termmstterms().subscribe((res) => {
            debugger
            console.log(res);
        })
        this.spinner.hide();
        this.dialogRef.close(true);
        return;
    }
    changeEvent(event) {
        if (event.target.checked) {
            console.log(event.target.checked);
            this.showSubmit = true;
            document.getElementById('checkbutton').style.display = 'block';
        } else {
            console.log(event.target.checked);
            this.showSubmit = false;
            document.getElementById('checkbutton').style.display = 'none';
        }
    }
    onClose() {
        this.dialogRef.close();
    }
}
