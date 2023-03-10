import { mstjobstatusService } from './../../../service/mstjobstatus.service';
import { mstjobstatus } from './../../../model/mstjobstatus.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-mstjobstatus',
    templateUrl: './mstjobstatus.component.html',
    styles: [`

    :host /deep/ ng2-smart-table tbody > tr:nth-child(even) {
        background-color : #f4f4f4 !important;
        }
        .table thead tr {
            background-color: #a89888 !important;
            color: #fff !important;
            border: #6b431d !important;
        }

    .mobileshowview{
      display: none;
    }
    @media only screen and (max-width: 600px) {
      .applicantfield{
        min-width: 100% !important;
      }
      .applicant_view{
        margin-top: 0px !important;
      }
      .mobileshowview{
        display: none !important;
      }
    }
    `]
})



export class mstjobstatusComponent implements OnInit {
    formData: mstjobstatus;
    list: mstjobstatus[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';
    showview: boolean = false;
    theme: string = "";
    shortcuts: ShortcutInput[] = [];
    showSubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    pkList: any;
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    toolbarVisible: boolean = true;
    customFieldServiceList: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_mstjobstatuses: boolean = false;
    mstjobstatus_menuactions: any = []

    mstjobstatus_Form: FormGroup;

    applicantid_List: DropDownValues[];
    applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();
    corporateid_List: DropDownValues[];
    jobid_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;

    sessionData: any;
    sourceKey: any;
    applicant_name: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstjobstatus_service: mstjobstatusService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstjobstatus_Form = this.fb.group({
            pk: [null],
            viewid: [null],
            applicantid: [null],
            applicantiddesc: [null],
            applicantiddesc1:[null],
            corporateid: [null],
            corporateiddesc: [null],
            viewdatetime: [null],
            intereststatus: [null],
            comments: [null],
            allcomments: [null],
            jobid: [null],
            jobiddesc: [null],
            hiringstatus: [null],
            ctcoffered: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstjobstatus_Form.controls; }

    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstjobstatus_Form.dirty && this.mstjobstatus_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.viewid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');

        //getting data - from list page, from other screen through dialog
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
            this.maindata = this.data;
        }
        if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
        if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
            this.viewHtml = '';
        }
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
            this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
        }
        let mstjobstatusid = null;

        //if view button(eye) is clicked
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
            //this.viewHtml=this.sessionService.getViewHtml();
        }
        else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
            this.pkcol = this.sessionService.getItem('usersource');
        }
        else if (this.data != null && this.data.pkcol != null) {
            this.pkcol = this.data.pkcol;
        }
        else {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
            this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
        }
        //copy the data from previous dialog
        this.viewHtml = ``;
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = mstjobstatusid;

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
               //setting the flag that the screen is not touched
        this.mstjobstatus_Form.markAsUntouched();
        this.mstjobstatus_Form.markAsPristine();


        this.mstjobstatus_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.corporateid_List = res.list_corporateid.value;
            this.jobid_List = res.list_jobid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstjobstatus_service.get_mstjobstatuses_List().then(res => {
            this.pkList = res as mstjobstatus[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });

    };



    onSelected_applicantid(applicantidDetail: any) {
        if (applicantidDetail.value && applicantidDetail) {
            this.mstjobstatus_Form.patchValue({
                applicantid: applicantidDetail.value,
                applicantiddesc: applicantidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.mstjobstatus_Form != null)
            this.mstjobstatus_Form.reset();
        this.mstjobstatus_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let viewid = this.mstjobstatus_Form.get('viewid').value;
        if (viewid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstjobstatus_service.delete_mstjobstatus(viewid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide(); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstjobstatus_Form.patchValue({
            viewid: null
        });
        if (this.formData.viewid != null) this.formData.viewid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "viewdatetime")
                        this.mstjobstatus_Form.patchValue({ "viewdatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstjobstatus_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstjobstatus_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstjobstatus_Form.controls[key] != undefined) {
                                this.mstjobstatus_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(false);
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
        }
        else {
            this.onSubmitData(false);
        }
    }
    onSubmit() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    applicantid_onChange(evt: any) {
        let e = evt.value;
    }
    corporateid_onChange(evt: any) {
        let e = evt.value;
        this.mstjobstatus_Form.patchValue({ corporateiddesc: evt.options[evt.options.selectedIndex].text });
    }
    jobid_onChange(evt: any) {
        let e = evt.value;
        this.mstjobstatus_Form.patchValue({ jobiddesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_mstjobstatuses() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstjobstatus_service.get_mstjobstatuses_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstjobstatus;
            let formproperty = res.mstjobstatus.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstjobstatus.pkcol;
            this.formid = res.mstjobstatus.viewid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstjobstatus;
        this.formid = res.mstjobstatus.viewid;
        this.pkcol = res.mstjobstatus.pkcol;
        this.bmyrecord = false;
        if ((res.mstjobstatus as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstjobstatus_Form.patchValue({
            viewid: res.mstjobstatus.viewid,
            applicantid: res.mstjobstatus.applicantid,
            applicantiddesc: res.mstjobstatus.applicantiddesc,
            corporateid: res.mstjobstatus.corporateid,
            corporateiddesc: res.mstjobstatus.corporateiddesc,
            viewdatetime: this.ngbDateParserFormatter.parse(res.mstjobstatus.viewdatetime),
            intereststatus: res.mstjobstatus.intereststatus,
            comments: res.mstjobstatus.comments,
            allcomments: res.mstjobstatus.allcomments.replace(/<[^>]*>/g, ''),
            jobid: res.mstjobstatus.jobid,
            jobiddesc: res.mstjobstatus.jobiddesc,
            hiringstatus: res.mstjobstatus.hiringstatus,
            ctcoffered: res.mstjobstatus.ctcoffered,
            status: res.mstjobstatus.status,
            statusdesc: res.mstjobstatus.statusdesc,
        });
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        //Child Tables if any;

        this.applicant_name = res.mstjobstatus.applicantiddesc;


    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstjobstatus_Form.controls) {
            let val = this.mstjobstatus_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstjobstatus_Form.controls[key] != null) {
                if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }

    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.mstjobstatus_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstjobstatus_Form.getRawValue();
        obj.viewdatetime = new Date(this.mstjobstatus_Form.get('viewdatetime').value ? this.ngbDateParserFormatter.format(this.mstjobstatus_Form.get('viewdatetime').value) + '  UTC' : null);
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
    }

    //This has to come from bomenuactions & procedures
    afterAction(mode: any) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }



    async onSubmitData(bclear: any) {
        this.isSubmitted = true;
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.mstjobstatus_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.mstjobstatus_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstjobstatus_Form.controls[key] != null) {
                        this.formData[key] = this.mstjobstatus_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.viewdatetime = new Date(this.mstjobstatus_Form.get('viewdatetime').value ? this.ngbDateParserFormatter.format(this.mstjobstatus_Form.get('viewdatetime').value) + '  UTC' : null);
        this.spinner.show();
        this.mstjobstatus_service.saveOrUpdate_mstjobstatuses(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).mstjobstatus);
                if (!bclear) this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                }
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push((res as any).mstjobstatus);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstjobstatus_Form.markAsUntouched();
                this.mstjobstatus_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



