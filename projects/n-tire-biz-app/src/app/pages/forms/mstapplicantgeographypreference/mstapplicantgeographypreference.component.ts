import { mstapplicantgeographypreferenceService } from './../../../service/mstapplicantgeographypreference.service';
import { mstapplicantgeographypreference } from './../../../model/mstapplicantgeographypreference.model';
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
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
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
      }
    `],
    providers: [KeyboardShortcutsService]
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





    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private sanitizer: DomSanitizer,
        private bocityservice: bocityService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.p_currenturl]),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd f',
                command: () => this.resetForm(),
                preventDefault: true
            }
        ]);
        this.mstapplicantgeographypreference_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            // applicantid: [null],
            applicantid: this.sessionService.getItem('applicantid'),
            applicantiddesc: [null],
            geographypreferenceid: [null],
            country: ['', Validators.required],
            countrydesc: [null],
            city: ['', Validators.required],
            // city: [''],
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
        debugger;
        if (this.mstapplicantgeographypreference_Form.dirty && this.mstapplicantgeographypreference_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.geographypreferenceid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.geographypreferenceid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
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
        debugger
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');
        //this.viewHtml=this.sessionService.getViewHtml();

        debugger;
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
            debugger
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
            debugger
            this.applicantid_List = res.list_applicantid.value;
            this.country_List = res.list_country.value;
            console.log('this.applicantid_List ', this.applicantid_List);
            console.log('this.country_List ', this.country_List);


        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_List().then(res => {
            this.pkList = res as mstapplicantgeographypreference[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
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
        debugger
        if (countryDetail.value && countryDetail) {
            this.mstapplicantgeographypreference_Form.patchValue({
                country: countryDetail.value,
                countrydesc: countryDetail.label,

            });
            this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then(res => {

                // this.country_List = res as DropDownValues[]
                this.city_List = res as DropDownValues[]

            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }
    onSelected_city(cityDetail: any) {

        if (cityDetail.cityid && cityDetail) {
            this.mstapplicantgeographypreference_Form.patchValue({
                city: cityDetail.cityid,
                citydesc: cityDetail.name,

            });

            this.mstapplicantgeographypreference_service.getList(cityDetail.cityid).then(res => {
                console.log(res)

                this.city_List = res as DropDownValues[]
            }).catch((err) => {
                this.spinner.hide(); console.log(err);
                //console.log(err);
            });
        }
    }
    // onSelected_city(cityDetail: any) {
    //   alert("123")
    //     if (cityDetail.value && cityDetail) {
    //         this.mstapplicantgeographypreference_Form.patchValue({
    //             city: cityDetail.value,
    //             citydesc: cityDetail.label,

    //         });
    //         this.mstapplicantgeographypreference_service.getList_city(cityDetail.value).then(res => {
    //             this.city_List = res as DropDownValues[]
    //         }).catch((err) => { this.spinner.hide(); console.log(err); });
    //     }
    // }




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
                ).catch((err) => { this.spinner.hide(); console.log(err); });
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
            // this.onSubmitDataDlg(false);
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
            // this.onSubmitData(true);
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
        setTimeout(() => {
        });
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
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.mstapplicantgeographypreference;
        this.formid = res.mstapplicantgeographypreference.geographypreferenceid;
        this.pkcol = res.mstapplicantgeographypreference.pkcol;
        this.bmyrecord = false;
        if ((res.mstapplicantgeographypreference as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
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

                // if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantgeographypreference_service.getList_city().then(res => {
                this.city_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
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
        console.log(obj);
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
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
        debugger;
        this.isSubmitted = true;
        let strError = "";
        if (!this.mstapplicantgeographypreference_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        // Object.keys(this.mstapplicantgeographypreference_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.mstapplicantgeographypreference_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
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
        console.log(this.formData);
        this.spinner.show();
        this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                debugger;
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
                this.clearList();
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
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



