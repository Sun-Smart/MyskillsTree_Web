import { mstprofileaccessdetailService } from './../../../service/mstprofileaccessdetail.service';
import { mstprofileaccessdetail } from './../../../model/mstprofileaccessdetail.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
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
    selector: 'app-mstprofileaccessdetail',
    templateUrl: './mstprofileaccessdetail.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
      .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
    }
    `],
    providers: []
})



export class mstprofileaccessdetailComponent implements OnInit {
    formData: mstprofileaccessdetail;
    list: mstprofileaccessdetail[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    //formdata: any;//current form data
    shortcuts: ShortcutInput[] = [];//keyboard keys
    showSubmit: boolean = true;//button to show
    showGoWorkFlow: boolean = false;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
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

    bfilterPopulate_mstprofileaccessdetails: boolean = false;
    mstprofileaccessdetail_menuactions: any = []

    mstprofileaccessdetail_Form: FormGroup;

    userid_List: DropDownValues[];
    userid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    viewuserid_List: DropDownValues[];
    viewuserid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstprofileaccessdetail_service: mstprofileaccessdetailService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstprofileaccessdetail_Form = this.fb.group({
            pk: [null],
            viewid: [null],
            userid: [null],
            useriddesc: [null],
            viewuserid: [null],
            viewuseriddesc: [null],
            viewdate: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstprofileaccessdetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstprofileaccessdetail_Form.dirty && this.mstprofileaccessdetail_Form.touched) {
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
        let mstprofileaccessdetailid = null;

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
        this.formid = mstprofileaccessdetailid;
        //alert(mstprofileaccessdetailid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstprofileaccessdetail_service.getDefaultData().then(res => {
            this.userid_List = res.list_userid.value;
            this.viewuserid_List = res.list_viewuserid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstprofileaccessdetail_service.get_mstprofileaccessdetails_List().then(res => {
            this.pkList = res as mstprofileaccessdetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.mstprofileaccessdetail_Form.markAsUntouched();
        this.mstprofileaccessdetail_Form.markAsPristine();
    }
    onSelected_userid(useridDetail: any) {
        if (useridDetail.value && useridDetail) {
            this.mstprofileaccessdetail_Form.patchValue({
                userid: useridDetail.value,
                useriddesc: useridDetail.label,

            });

        }
    }

    onSelected_viewuserid(viewuseridDetail: any) {
        if (viewuseridDetail.value && viewuseridDetail) {
            this.mstprofileaccessdetail_Form.patchValue({
                viewuserid: viewuseridDetail.value,
                viewuseriddesc: viewuseridDetail.label,

            });

        }
    }




    resetForm() {
        if (this.mstprofileaccessdetail_Form != null)
            this.mstprofileaccessdetail_Form.reset();
        this.mstprofileaccessdetail_Form.patchValue({
            userid: this.sessionData.userid,
            useriddesc: this.sessionData.username,
            viewuserid: this.sessionData.userid,
            viewuseriddesc: this.sessionData.username,
        });
        this.mstprofileaccessdetail_Form.patchValue({
            viewdate: this.ngbDateParserFormatter.parse(new Date().toString()),
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let viewid = this.mstprofileaccessdetail_Form.get('viewid').value;
        if (viewid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstprofileaccessdetail_service.delete_mstprofileaccessdetail(viewid).then(res => {
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
        this.mstprofileaccessdetail_Form.patchValue({
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
                    else if (key == "viewdate")
                        this.mstprofileaccessdetail_Form.patchValue({ "viewdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstprofileaccessdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstprofileaccessdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstprofileaccessdetail_Form.controls[key] != undefined) {
                                this.mstprofileaccessdetail_Form.controls[key].disable({ onlySelf: true });
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
    goBack(){

        this.router.navigate(['/home/boreportviewer/psd']);

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
    userid_onChange(evt: any) {
        let e = evt.value;
    }
    viewuserid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_mstprofileaccessdetails() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstprofileaccessdetail_service.get_mstprofileaccessdetails_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstprofileaccessdetail;
            let formproperty = res.mstprofileaccessdetail.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstprofileaccessdetail.pkcol;
            this.formid = res.mstprofileaccessdetail.viewid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstprofileaccessdetail;
        this.formid = res.mstprofileaccessdetail.viewid;
        this.pkcol = res.mstprofileaccessdetail.pkcol;
        this.bmyrecord = false;
        if ((res.mstprofileaccessdetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstprofileaccessdetail_Form.patchValue({
            viewid: res.mstprofileaccessdetail.viewid,
            userid: res.mstprofileaccessdetail.userid,
            useriddesc: res.mstprofileaccessdetail.useriddesc,
            viewuserid: res.mstprofileaccessdetail.viewuserid,
            viewuseriddesc: res.mstprofileaccessdetail.viewuseriddesc,
            viewdate: this.ngbDateParserFormatter.parse(res.mstprofileaccessdetail.viewdate),
            status: res.mstprofileaccessdetail.status,
            statusdesc: res.mstprofileaccessdetail.statusdesc,
        });
        this.mstprofileaccessdetail_menuactions = res.mstprofileaccessdetail_menuactions;
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstprofileaccessdetail_Form.controls) {
            let val = this.mstprofileaccessdetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstprofileaccessdetail_Form.controls[key] != null) {
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
        if (!this.mstprofileaccessdetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstprofileaccessdetail_Form.getRawValue();
        obj.viewdate = new Date(this.mstprofileaccessdetail_Form.get('viewdate').value ? this.ngbDateParserFormatter.format(this.mstprofileaccessdetail_Form.get('viewdate').value) + '  UTC' : null);
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


        if (!this.mstprofileaccessdetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.mstprofileaccessdetail_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstprofileaccessdetail_Form.controls[key] != null) {
                        this.formData[key] = this.mstprofileaccessdetail_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.viewdate = new Date(this.mstprofileaccessdetail_Form.get('viewdate').value ? this.ngbDateParserFormatter.format(this.mstprofileaccessdetail_Form.get('viewdate').value) + '  UTC' : null);
        this.spinner.show();
        this.mstprofileaccessdetail_service.saveOrUpdate_mstprofileaccessdetails(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).mstprofileaccessdetail);
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
                        this.objvalues.push((res as any).mstprofileaccessdetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstprofileaccessdetail_Form.markAsUntouched();
                this.mstprofileaccessdetail_Form.markAsPristine();
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



