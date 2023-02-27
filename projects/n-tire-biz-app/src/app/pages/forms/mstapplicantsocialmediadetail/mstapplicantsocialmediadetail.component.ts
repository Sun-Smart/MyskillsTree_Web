import { mstapplicantsocialmediadetailService } from './../../../service/mstapplicantsocialmediadetail.service';
import { mstapplicantsocialmediadetail } from './../../../model/mstapplicantsocialmediadetail.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';

@Component({
    selector: 'app-mstapplicantsocialmediadetail',
    templateUrl: './mstapplicantsocialmediadetail.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .close_common_icon2{
          position: relative !important;
          bottom: 6px !important;
        }
        h1.columns.mainheader.left.common_titles_new {
          margin-top: 5px !important;
        }
      }
    `]
})



export class mstapplicantsocialmediadetailComponent implements OnInit {
    formData: mstapplicantsocialmediadetail;
    list: mstapplicantsocialmediadetail[];
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
    showAttachment: boolean = true;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_mstapplicantsocialmediadetails: boolean = false;
    mstapplicantsocialmediadetail_menuactions: any = []

    mstapplicantsocialmediadetail_Form: FormGroup;

    applicantid_List: DropDownValues[];
    applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    socialmedianame_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstapplicantsocialmediadetail_service: mstapplicantsocialmediadetailService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        let app_id = localStorage.getItem('applicantid');
        this.mstapplicantsocialmediadetail_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: app_id,
            applicantiddesc: [null],
            socialrefid: [null],
            socialmedianame: [null, Validators.compose([Validators.required])],
            socialmedianamedesc: [null],
            handlename: [null],
            url: [null, Validators.compose([Validators.required])],
            remarks: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstapplicantsocialmediadetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstapplicantsocialmediadetail_Form.dirty && this.mstapplicantsocialmediadetail_Form.touched) {
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
        if (pkDetail.socialrefid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {

        if((localStorage.getItem('role') == '1')  || (localStorage.getItem('role') == '3')){
            this.showAttachment = true;
          }else {
            this.showAttachment = false;
          }

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
        let mstapplicantsocialmediadetailid = null;

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
        this.formid = mstapplicantsocialmediadetailid;
        //alert(mstapplicantsocialmediadetailid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstapplicantsocialmediadetail_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.socialmedianame_List = res.list_socialmedianame.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_List().then(res => {
            this.pkList = res as mstapplicantsocialmediadetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.mstapplicantsocialmediadetail_Form.markAsUntouched();
        this.mstapplicantsocialmediadetail_Form.markAsPristine();
    }
    onSelected_applicantid(applicantidDetail: any) {
        if (applicantidDetail.value && applicantidDetail) {
            this.mstapplicantsocialmediadetail_Form.patchValue({
                applicantid: applicantidDetail.value,
                applicantiddesc: applicantidDetail.label,

            });
        }
    }

    resetForm() {
        if (this.mstapplicantsocialmediadetail_Form != null)
            this.mstapplicantsocialmediadetail_Form.reset();
        this.mstapplicantsocialmediadetail_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let socialrefid = this.mstapplicantsocialmediadetail_Form.get('socialrefid').value;
        if (socialrefid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantsocialmediadetail_service.delete_mstapplicantsocialmediadetail(socialrefid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstapplicantsocialmediadetail_Form.patchValue({
            socialrefid: null
        });
        if (this.formData.socialrefid != null) this.formData.socialrefid = null;
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
                    else if (ctrltype == "string") {
                        this.mstapplicantsocialmediadetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantsocialmediadetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantsocialmediadetail_Form.controls[key] != undefined) {
                                this.mstapplicantsocialmediadetail_Form.controls[key].disable({ onlySelf: true });
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

        this.router.navigate(['/home/boreportviewer/ASMD']);

    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(false);
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitData(false);
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
    socialmedianame_onChange(evt: any) {
        let e = evt.value;
        this.mstapplicantsocialmediadetail_Form.patchValue({ socialmedianamedesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e: any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }



    edit_mstapplicantsocialmediadetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstapplicantsocialmediadetail;
            let formproperty = res.mstapplicantsocialmediadetail.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstapplicantsocialmediadetail.pkcol;
            this.formid = res.mstapplicantsocialmediadetail.socialrefid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstapplicantsocialmediadetail;
        this.formid = res.mstapplicantsocialmediadetail.socialrefid;
        this.pkcol = res.mstapplicantsocialmediadetail.pkcol;
        this.bmyrecord = false;
        if ((res.mstapplicantsocialmediadetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstapplicantsocialmediadetail_Form.patchValue({
            applicantid: res.mstapplicantsocialmediadetail.applicantid,
            applicantiddesc: res.mstapplicantsocialmediadetail.applicantiddesc,
            socialrefid: res.mstapplicantsocialmediadetail.socialrefid,
            socialmedianame: res.mstapplicantsocialmediadetail.socialmedianame,
            socialmedianamedesc: res.mstapplicantsocialmediadetail.socialmedianamedesc,
            handlename: res.mstapplicantsocialmediadetail.handlename,
            url: res.mstapplicantsocialmediadetail.url,
            remarks: res.mstapplicantsocialmediadetail.remarks,
            attachment: JSON.parse(res.mstapplicantsocialmediadetail.attachment),
            status: res.mstapplicantsocialmediadetail.status,
            statusdesc: res.mstapplicantsocialmediadetail.statusdesc,
        });
        this.mstapplicantsocialmediadetail_menuactions = res.mstapplicantsocialmediadetail_menuactions;
        if (this.mstapplicantsocialmediadetail_Form.get('attachment').value != null && this.mstapplicantsocialmediadetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantsocialmediadetail_Form.get('attachment').value);
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstapplicantsocialmediadetail_Form.controls) {
            let val = this.mstapplicantsocialmediadetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstapplicantsocialmediadetail_Form.controls[key] != null) {
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
        if (!this.mstapplicantsocialmediadetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstapplicantsocialmediadetail_Form.getRawValue();
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
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

        if (!this.mstapplicantsocialmediadetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (strError != "") return this.sharedService.alert(strError);

        if (!this.validate()) {
            return;
        }
        this.formData = this.mstapplicantsocialmediadetail_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstapplicantsocialmediadetail_Form.controls[key] != null) {
                        this.formData[key] = this.mstapplicantsocialmediadetail_Form.controls[key].value;
                    }
                }
            }
        }
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        this.spinner.show();
        this.mstapplicantsocialmediadetail_service.saveOrUpdate_mstapplicantsocialmediadetails(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.sessionService.setItem("attachedsaved", "true")
                this.objvalues.push((res as any).mstapplicantsocialmediadetail);
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
                        this.objvalues.push((res as any).mstapplicantsocialmediadetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantsocialmediadetail_Form.markAsUntouched();
                this.mstapplicantsocialmediadetail_Form.markAsPristine();
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



