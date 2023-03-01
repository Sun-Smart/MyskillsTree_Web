import { mstapplicantgeographypreferenceService } from './../../../service/mstapplicantgeographypreference.service';
import { mstapplicantgeographypreference } from './../../../model/mstapplicantgeographypreference.model';
import {  Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair} from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { bocityService } from './../../../service/bocity.service';
import { bocity } from '../../../model/bocity.model';
@Component({
    selector: 'app-mstapplicantgeographypreference',
    templateUrl: './mstapplicantgeographypreference.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .mobileView{
          bottom: 6px !important;
        }
      }
    `],
    providers: []
})



export class mstapplicantgeographypreferenceComponent implements OnInit {
    formData: mstapplicantgeographypreference;
    list: mstapplicantgeographypreference[];
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

    bfilterPopulate_mstapplicantgeographypreferences: boolean = false;
    mstapplicantgeographypreference_menuactions: any = []

    mstapplicantgeographypreference_Form: FormGroup;

    applicantid_List: DropDownValues[];
    applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    country_List: DropDownValues[];
    country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    city_List: DropDownValues[];
    city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
    cityList: bocity[];
    showAttachment: boolean = false;
    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstapplicantgeographypreference_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: this.sessionService.getItem('applicantid'),
            applicantiddesc: [null],
            geographypreferenceid: [null],
            country: ['', Validators.required],
            countrydesc: [null],
            city: ['', Validators.required],
            citydesc: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
            attachment: [null],
        });
    }

    get f() { return this.mstapplicantgeographypreference_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstapplicantgeographypreference_Form.dirty && this.mstapplicantgeographypreference_Form.touched) {
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
        if (pkDetail.geographypreferenceid && pkDetail) {
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
        let mstapplicantgeographypreferenceid = null;

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
        this.formid = mstapplicantgeographypreferenceid;
        //alert(mstapplicantgeographypreferenceid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.country_List = res.list_country.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_List().then(res => {
            this.pkList = res as mstapplicantgeographypreference[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.mstapplicantgeographypreference_Form.markAsUntouched();
        this.mstapplicantgeographypreference_Form.markAsPristine();
    }
    onSelected_applicantid(applicantidDetail: any) {
        if (applicantidDetail.value && applicantidDetail) {
            this.mstapplicantgeographypreference_Form.patchValue({
                applicantid: applicantidDetail.value,
                applicantiddesc: applicantidDetail.label,

            });

        }
    }

    onSelected_country(countryDetail: any) {
        if (countryDetail.value && countryDetail) {
            this.mstapplicantgeographypreference_Form.patchValue({
                country: countryDetail.value,
                countrydesc: countryDetail.label,
            });
            this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then(res => {
                this.city_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); });
        }
    }
    onSelected_city(cityDetail: any) {

        if (cityDetail.cityid && cityDetail) {
            this.mstapplicantgeographypreference_Form.patchValue({
                city: cityDetail.cityid,
                citydesc: cityDetail.name,
            });

            this.mstapplicantgeographypreference_service.getList(cityDetail.cityid).then(res => {
                this.city_List = res as DropDownValues[]
            }).catch((err) => {
                this.spinner.hide();
            });
        }
    }
    resetForm() {
        if (this.mstapplicantgeographypreference_Form != null)
            this.mstapplicantgeographypreference_Form.reset();
        this.mstapplicantgeographypreference_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let geographypreferenceid = this.mstapplicantgeographypreference_Form.get('geographypreferenceid').value;
        if (geographypreferenceid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantgeographypreference_service.delete_mstapplicantgeographypreference(geographypreferenceid).then(res => {
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
        this.mstapplicantgeographypreference_Form.patchValue({
            geographypreferenceid: null
        });
        if (this.formData.geographypreferenceid != null) this.formData.geographypreferenceid = null;
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
                        this.mstapplicantgeographypreference_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantgeographypreference_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantgeographypreference_Form.controls[key] != undefined) {
                                this.mstapplicantgeographypreference_Form.controls[key].disable({ onlySelf: true });
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

        this.router.navigate(['/home/boreportviewer/agp']);

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
    country_onChange(evt: any) {
        let e = evt.value;
    }
    city_onChange(evt: any) {
        let e = evt.value;
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


    edit_mstapplicantgeographypreferences() {
        this.showview = false;
        return false;
    }


    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.mstapplicantgeographypreference;
            let formproperty = res.mstapplicantgeographypreference.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstapplicantgeographypreference.pkcol;
            this.formid = res.mstapplicantgeographypreference.geographypreferenceid;
            this.FillData(res);
        }).catch((err) => {});
    }

    FillData(res: any) {
        this.formData = res.mstapplicantgeographypreference;
        this.formid = res.mstapplicantgeographypreference.geographypreferenceid;
        this.pkcol = res.mstapplicantgeographypreference.pkcol;
        this.bmyrecord = false;
        if ((res.mstapplicantgeographypreference as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstapplicantgeographypreference_Form.patchValue({
            applicantid: res.mstapplicantgeographypreference.applicantid,
            applicantiddesc: res.mstapplicantgeographypreference.applicantiddesc,
            geographypreferenceid: res.mstapplicantgeographypreference.geographypreferenceid,
            country: res.mstapplicantgeographypreference.country,
            countrydesc: res.mstapplicantgeographypreference.countrydesc,
            city: res.mstapplicantgeographypreference.city,
            citydesc: res.mstapplicantgeographypreference.citydesc,
            remarks: res.mstapplicantgeographypreference.remarks,
            status: res.mstapplicantgeographypreference.status,
            statusdesc: res.mstapplicantgeographypreference.statusdesc,
            attachment: JSON.parse(res.mstapplicantgeographypreference.attachment),
        });
        this.mstapplicantgeographypreference_menuactions = res.mstapplicantgeographypreference_menuactions;
        if (this.mstapplicantgeographypreference_Form.get('attachment').value != null && this.mstapplicantgeographypreference_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantgeographypreference_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantgeographypreference_service.getList_city(this.f.country.value).then(res => {
                this.city_List = res as DropDownValues[];
            }).catch((err) => {});
        });
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;

        for (let key in this.mstapplicantgeographypreference_Form.controls) {
            let val = this.mstapplicantgeographypreference_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstapplicantgeographypreference_Form.controls[key] != null) {
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
        if (!this.mstapplicantgeographypreference_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstapplicantgeographypreference_Form.getRawValue();
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
        if (!this.mstapplicantgeographypreference_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (strError != "") return this.sharedService.alert(strError);

        if (!this.validate()) {
            return;
        }
        this.formData = this.mstapplicantgeographypreference_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstapplicantgeographypreference_Form.controls[key] != null) {
                        this.formData[key] = this.mstapplicantgeographypreference_Form.controls[key].value;
                    }
                }
            }
        }
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        this.spinner.show();
        this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.sessionService.setItem("attachedsaved", "true")
                this.objvalues.push((res as any).mstapplicantgeographypreference);
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
                        this.objvalues.push((res as any).mstapplicantgeographypreference);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantgeographypreference_Form.markAsUntouched();
                this.mstapplicantgeographypreference_Form.markAsPristine();
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



