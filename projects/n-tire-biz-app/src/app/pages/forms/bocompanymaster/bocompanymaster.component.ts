import { bocompanymasterService } from './../../../service/bocompanymaster.service';
import { bocompanymaster } from './../../../model/bocompanymaster.model';
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
import { bocompanyholiday } from './../../../model/bocompanyholiday.model';
import { bocompanyholidayComponent } from './../../../pages/forms/bocompanyholiday/bocompanyholiday.component';
import { bocompanyholidayService } from './../../../service/bocompanyholiday.service';
import { bofinancialyear } from './../../../model/bofinancialyear.model';
import { bofinancialyearComponent } from './../../../pages/forms/bofinancialyear/bofinancialyear.component';
import { bofinancialyearService } from './../../../service/bofinancialyear.service';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-biz-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-bocompanymaster',
    templateUrl: './bocompanymaster.component.html',
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



export class bocompanymasterComponent implements OnInit {
    formData: bocompanymaster;
    list: bocompanymaster[];
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
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_bocompanymasters: boolean = false;
    bfilterPopulate_bocompanyholidays: boolean = false;
    bfilterPopulate_bofinancialyears: boolean = false;
    bocompanymaster_menuactions: any = []
    bocompanyholiday_menuactions: any = []
    @ViewChild('tbl_bocompanyholidays', { static: false }) tbl_bocompanyholidays: Ng2SmartTableComponent;
    bofinancialyear_menuactions: any = []
    @ViewChild('tbl_bofinancialyears', { static: false }) tbl_bofinancialyears: Ng2SmartTableComponent;

    bocompanymaster_Form: FormGroup;

    companytype_List: DropDownValues[];
    countryid_List: DropDownValues[];
    countryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    stateid_List: DropDownValues[];
    stateid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    cityid_List: DropDownValues[];
    cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    locationid_List: DropDownValues[];
    locationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    designation_List: DropDownValues[];
    businesssegment_List: DropDownValues[];
    shippingcountryid_List: DropDownValues[];
    shippingcountryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    shippingstateid_List: DropDownValues[];
    shippingstateid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    shippingcityid_List: DropDownValues[];
    shippingcityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    basecurrency_List: DropDownValues[];
    gstregistrationtype_List: DropDownValues[];
    weekoff1_List: DropDownValues[];
    weekoff2_List: DropDownValues[];
    localization_List: DropDownValues[];
    timezone_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    customFieldJson: any;
    customFieldVisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bocompanyholidays_visiblelist: any;
    bocompanyholidays_hidelist: any;
    bofinancialyears_visiblelist: any;
    bofinancialyears_hidelist: any;

    Deleted_bocompanyholiday_IDs: string = "";
    bocompanyholidays_ID: string = "1";
    bocompanyholidays_selectedindex: any;
    Deleted_bofinancialyear_IDs: string = "";
    bofinancialyears_ID: string = "2";
    bofinancialyears_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocompanymaster_service: bocompanymasterService,
        private bocompanyholiday_service: bocompanyholidayService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private sanitizer: DomSanitizer,
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
        this.bocompanymaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            companyid: [null],
            code: [null],
            companyname: [null, Validators.compose([Validators.required])],
            registrationnumber: [null, Validators.compose([Validators.required])],
            companytype: [null],
            companytypedesc: [null],
            companylogo: [null],
            website: [null],
            phone: [null],
            email: [null],
            address1: [null, Validators.compose([Validators.required])],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            locationid: [null],
            locationiddesc: [null],
            pincode: [null],
            contactname: [null],
            designation: [null],
            designationdesc: [null],
            cpphone: [null],
            cpemail: [null],
            incorporationdate: [null],
            businesssegment: [null],
            businesssegmentdesc: [null],
            details: [null],
            services: [null],
            startdate: [null],
            enddate: [null],
            bankid: [null],
            chartofaccounts: [null],
            shippingaddress1: [null],
            shippingaddress2: [null],
            shippingcountryid: [null],
            shippingcountryiddesc: [null],
            shippingstateid: [null],
            shippingstateiddesc: [null],
            shippingcityid: [null],
            shippingcityiddesc: [null],
            shippingpincode: [null],
            basecurrency: [null],
            basecurrencydesc: [null],
            gstregistrationtype: [null],
            gstregistrationtypedesc: [null],
            gstinnumber: [null],
            pannumber: [null],
            trnnumber: [null],
            tan: [null],
            cst: [null],
            salestax: [null],
            servicetax: [null],
            tin: [null],
            localtax: [null],
            accountstartdate: [null],
            numberofusers: [null],
            starttime: [null],
            endtime: [null],
            weekoff1: [null],
            weekoff1desc: [null],
            weekoff2: [null],
            weekoff2desc: [null],
            facebookaccountname: [null],
            facebookaccounturl: [null],
            twitteraccountname: [null],
            twitteraccounturl: [null],
            linkedinaccountname: [null],
            linkedinaccounturl: [null],
            instagramaccountname: [null],
            instagramaccounturl: [null],
            brandname: [null],
            mailingemailaddress: [null],
            mailingsendername: [null],
            localization: [null],
            localizationdesc: [null],
            timezone: [null],
            timezonedesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bocompanymaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bocompanymaster_Form.dirty && this.bocompanymaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    companynameexists(e: any) {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.companyname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].companyid.toString() != this.formid.toString()) {
            if (confirm("This Company Name value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
    registrationnumberexists(e: any) {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.registrationnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].companyid.toString() != this.formid.toString()) {
            if (confirm("This Registration Number value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.companyid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.companyid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.companyid && pkDetail) {
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
        let bocompanymasterid = null;

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
        this.formid = bocompanymasterid;
        //alert(bocompanymasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bocompanyholidays_TableConfig();
            setTimeout(() => {
                //this.Set_bocompanyholidays_TableDropDownConfig();
            });

            this.Set_bofinancialyears_TableConfig();
            setTimeout(() => {
                //this.Set_bofinancialyears_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bocompanymaster_service.getDefaultData().then(res => {
            this.companytype_List = res.list_companytype.value;
            this.countryid_List = res.list_countryid.value;
            this.designation_List = res.list_designation.value;
            this.businesssegment_List = res.list_businesssegment.value;
            this.shippingcountryid_List = res.list_shippingcountryid.value;
            this.shippingstateid_List = res.list_shippingstateid.value;
            this.shippingcityid_List = res.list_shippingcityid.value;
            this.basecurrency_List = res.list_basecurrency.value;
            this.gstregistrationtype_List = res.list_gstregistrationtype.value;
            this.weekoff1_List = res.list_weekoff1.value;
            this.weekoff2_List = res.list_weekoff2.value;
            this.localization_List = res.list_localization.value;
            this.timezone_List = res.list_timezone.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.bocompanymaster_service.get_bocompanymasters_List().then(res => {
            this.pkList = res as bocompanymaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched
        this.bocompanymaster_Form.markAsUntouched();
        this.bocompanymaster_Form.markAsPristine();
    }
    onSelected_countryid(countryidDetail: any) {
        if (countryidDetail.value && countryidDetail) {
            this.bocompanymaster_Form.patchValue({
                countryid: countryidDetail.value,
                countryiddesc: countryidDetail.label,

            });
            this.bocompanymaster_service.getList_stateid(countryidDetail.value).then(res => {
                this.stateid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_stateid(stateidDetail: any) {
        if (stateidDetail.value && stateidDetail) {
            this.bocompanymaster_Form.patchValue({
                stateid: stateidDetail.value,
                stateiddesc: stateidDetail.label,

            });
            this.bocompanymaster_service.getList_cityid(stateidDetail.value).then(res => {
                this.cityid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_cityid(cityidDetail: any) {
        if (cityidDetail.value && cityidDetail) {
            this.bocompanymaster_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,

            });
            this.bocompanymaster_service.getList_locationid(cityidDetail.value).then(res => {
                this.locationid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_locationid(locationidDetail: any) {
        if (locationidDetail.value && locationidDetail) {
            this.bocompanymaster_Form.patchValue({
                locationid: locationidDetail.value,
                locationiddesc: locationidDetail.label,

            });

        }
    }

    onSelected_shippingcountryid(shippingcountryidDetail: any) {
        if (shippingcountryidDetail.value && shippingcountryidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingcountryid: shippingcountryidDetail.value,
                shippingcountryiddesc: shippingcountryidDetail.label,

            });

        }
    }

    onSelected_shippingstateid(shippingstateidDetail: any) {
        if (shippingstateidDetail.value && shippingstateidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingstateid: shippingstateidDetail.value,
                shippingstateiddesc: shippingstateidDetail.label,

            });

        }
    }

    onSelected_shippingcityid(shippingcityidDetail: any) {
        if (shippingcityidDetail.value && shippingcityidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingcityid: shippingcityidDetail.value,
                shippingcityiddesc: shippingcityidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.bocompanymaster_Form != null)
            this.bocompanymaster_Form.reset();
        this.bocompanymaster_Form.patchValue({
        });
        this.bocompanymaster_Form.patchValue({
            companyname: "xxxx",
            countryid: 1,
            stateid: 1,
            incorporationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            accountstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.bocompanyholidays_LoadTable();
            this.bofinancialyears_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let companyid = this.bocompanymaster_Form.get('companyid').value;
        if (companyid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanymaster_service.delete_bocompanymaster(companyid).then(res => {
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
        this.bocompanymaster_Form.patchValue({
            companyid: null
        });
        if (this.formData.companyid != null) this.formData.companyid = null;
        for (let i = 0; i < this.tbl_bocompanyholidays.source.length; i++) {
            this.tbl_bocompanyholidays.source[i].holidayid = null;
        }
        for (let i = 0; i < this.tbl_bofinancialyears.source.length; i++) {
            this.tbl_bofinancialyears.source[i].finyearid = null;
        }
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
                    else if (key == "incorporationdate")
                        this.bocompanymaster_Form.patchValue({ "incorporationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "startdate")
                        this.bocompanymaster_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enddate")
                        this.bocompanymaster_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "accountstartdate")
                        this.bocompanymaster_Form.patchValue({ "accountstartdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "starttime")
                        this.bocompanymaster_Form.patchValue({ "starttime": new Time(mainscreendata[key]) });
                    else if (key == "endtime")
                        this.bocompanymaster_Form.patchValue({ "endtime": new Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bocompanymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanymaster_Form.controls[key] != undefined) {
                                this.bocompanymaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("bocompanymasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }
    goBack(){

        this.router.navigate(['/home/boreportviewer/whwfe']);

    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.companyname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.companyname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    companytype_onChange(evt: any) {
        let e = this.f.companytype.value as any;
        this.bocompanymaster_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    countryid_onChange(evt: any) {
        let e = evt.value;
    }
    stateid_onChange(evt: any) {
        let e = evt.value;
    }
    cityid_onChange(evt: any) {
        let e = evt.value;
    }
    locationid_onChange(evt: any) {
        let e = evt.value;
    }
    designation_onChange(evt: any) {
        let e = evt.value;
        this.bocompanymaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    businesssegment_onChange(evt: any) {
        let e = this.f.businesssegment.value as any;
        this.bocompanymaster_Form.patchValue({ businesssegmentdesc: evt.options[evt.options.selectedIndex].text });
    }
    shippingcountryid_onChange(evt: any) {
        let e = evt.value;
    }
    shippingstateid_onChange(evt: any) {
        let e = evt.value;
    }
    shippingcityid_onChange(evt: any) {
        let e = evt.value;
    }
    basecurrency_onChange(evt: any) {
        let e = this.f.basecurrency.value as any;
        this.bocompanymaster_Form.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
    }
    gstregistrationtype_onChange(evt: any) {
        let e = this.f.gstregistrationtype.value as any;
        this.bocompanymaster_Form.patchValue({ gstregistrationtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff1_onChange(evt: any) {
        let e = this.f.weekoff1.value as any;
        this.bocompanymaster_Form.patchValue({ weekoff1desc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff2_onChange(evt: any) {
        let e = this.f.weekoff2.value as any;
        this.bocompanymaster_Form.patchValue({ weekoff2desc: evt.options[evt.options.selectedIndex].text });
    }
    localization_onChange(evt: any) {
        let e = this.f.localization.value as any;
        this.bocompanymaster_Form.patchValue({ localizationdesc: evt.options[evt.options.selectedIndex].text });
    }
    timezone_onChange(evt: any) {
        let e = this.f.timezone.value as any;
        this.bocompanymaster_Form.patchValue({ timezonedesc: evt.options[evt.options.selectedIndex].text });
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



    edit_bocompanymasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocompanymaster_service.get_bocompanymasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bocompanymaster;
            let formproperty = res.bocompanymaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocompanymaster.pkcol;
            this.formid = res.bocompanymaster.companyid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.bocompanymaster;
        this.formid = res.bocompanymaster.companyid;
        this.pkcol = res.bocompanymaster.pkcol;
        this.bmyrecord = false;
        if ((res.bocompanymaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        var starttimeTime = new Time(res.bocompanymaster.starttime);
        var endtimeTime = new Time(res.bocompanymaster.endtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bocompanymaster_Form.patchValue({
            companyid: res.bocompanymaster.companyid,
            code: res.bocompanymaster.code,
            companyname: res.bocompanymaster.companyname,
            registrationnumber: res.bocompanymaster.registrationnumber,
            companytype: res.bocompanymaster.companytype,
            companytypedesc: res.bocompanymaster.companytypedesc,
            companylogo: res.bocompanymaster.companylogo,
            website: res.bocompanymaster.website,
            phone: res.bocompanymaster.phone,
            email: res.bocompanymaster.email,
            address1: res.bocompanymaster.address1,
            address2: res.bocompanymaster.address2,
            countryid: res.bocompanymaster.countryid,
            countryiddesc: res.bocompanymaster.countryiddesc,
            stateid: res.bocompanymaster.stateid,
            stateiddesc: res.bocompanymaster.stateiddesc,
            cityid: res.bocompanymaster.cityid,
            cityiddesc: res.bocompanymaster.cityiddesc,
            locationid: res.bocompanymaster.locationid,
            locationiddesc: res.bocompanymaster.locationiddesc,
            pincode: res.bocompanymaster.pincode,
            contactname: res.bocompanymaster.contactname,
            designation: res.bocompanymaster.designation,
            designationdesc: res.bocompanymaster.designationdesc,
            cpphone: res.bocompanymaster.cpphone,
            cpemail: res.bocompanymaster.cpemail,
            incorporationdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.incorporationdate),
            businesssegment: res.bocompanymaster.businesssegment,
            businesssegmentdesc: res.bocompanymaster.businesssegmentdesc,
            details: res.bocompanymaster.details,
            services: res.bocompanymaster.services,
            startdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.bocompanymaster.enddate),
            bankid: res.bocompanymaster.bankid,
            chartofaccounts: res.bocompanymaster.chartofaccounts,
            shippingaddress1: res.bocompanymaster.shippingaddress1,
            shippingaddress2: res.bocompanymaster.shippingaddress2,
            shippingcountryid: res.bocompanymaster.shippingcountryid,
            shippingcountryiddesc: res.bocompanymaster.shippingcountryiddesc,
            shippingstateid: res.bocompanymaster.shippingstateid,
            shippingstateiddesc: res.bocompanymaster.shippingstateiddesc,
            shippingcityid: res.bocompanymaster.shippingcityid,
            shippingcityiddesc: res.bocompanymaster.shippingcityiddesc,
            shippingpincode: res.bocompanymaster.shippingpincode,
            basecurrency: res.bocompanymaster.basecurrency,
            basecurrencydesc: res.bocompanymaster.basecurrencydesc,
            gstregistrationtype: res.bocompanymaster.gstregistrationtype,
            gstregistrationtypedesc: res.bocompanymaster.gstregistrationtypedesc,
            gstinnumber: res.bocompanymaster.gstinnumber,
            pannumber: res.bocompanymaster.pannumber,
            trnnumber: res.bocompanymaster.trnnumber,
            tan: res.bocompanymaster.tan,
            cst: res.bocompanymaster.cst,
            salestax: res.bocompanymaster.salestax,
            servicetax: res.bocompanymaster.servicetax,
            tin: res.bocompanymaster.tin,
            localtax: res.bocompanymaster.localtax,
            accountstartdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.accountstartdate),
            numberofusers: res.bocompanymaster.numberofusers,
            starttime: starttimeTime,
            endtime: endtimeTime,
            weekoff1: res.bocompanymaster.weekoff1,
            weekoff1desc: res.bocompanymaster.weekoff1desc,
            weekoff2: res.bocompanymaster.weekoff2,
            weekoff2desc: res.bocompanymaster.weekoff2desc,
            facebookaccountname: res.bocompanymaster.facebookaccountname,
            facebookaccounturl: res.bocompanymaster.facebookaccounturl,
            twitteraccountname: res.bocompanymaster.twitteraccountname,
            twitteraccounturl: res.bocompanymaster.twitteraccounturl,
            linkedinaccountname: res.bocompanymaster.linkedinaccountname,
            linkedinaccounturl: res.bocompanymaster.linkedinaccounturl,
            instagramaccountname: res.bocompanymaster.instagramaccountname,
            instagramaccounturl: res.bocompanymaster.instagramaccounturl,
            brandname: res.bocompanymaster.brandname,
            mailingemailaddress: res.bocompanymaster.mailingemailaddress,
            mailingsendername: res.bocompanymaster.mailingsendername,
            localization: res.bocompanymaster.localization,
            localizationdesc: res.bocompanymaster.localizationdesc,
            timezone: res.bocompanymaster.timezone,
            timezonedesc: res.bocompanymaster.timezonedesc,
            customfield: res.bocompanymaster.customfield,
            attachment: JSON.parse(res.bocompanymaster.attachment),
            status: res.bocompanymaster.status,
            statusdesc: res.bocompanymaster.statusdesc,
        });
        this.bocompanymaster_menuactions = res.bocompanymaster_menuactions;
        this.bocompanyholiday_menuactions = res.bocompanyholiday_menuactions;
        this.bocompanyholidays_visiblelist = res.bocompanyholidays_visiblelist;
        this.bofinancialyear_menuactions = res.bofinancialyear_menuactions;
        this.bofinancialyears_visiblelist = res.bofinancialyears_visiblelist;
        if (this.bocompanymaster_Form.get('customfield').value != null && this.bocompanymaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bocompanymaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.bocompanymaster_Form.get('attachment').value != null && this.bocompanymaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bocompanymaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null) this.bocompanymaster_service.getList_stateid(this.f.countryid.value).then(res => {
                this.stateid_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null) this.bocompanymaster_service.getList_cityid(this.f.stateid.value).then(res => {
                this.cityid_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null) this.bocompanymaster_service.getList_locationid(this.f.cityid.value).then(res => {
                this.locationid_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_bocompanyholidays_TableConfig();
        this.bocompanyholidays_LoadTable(res.bocompanyholidays);
        this.Set_bofinancialyears_TableConfig();
        this.bofinancialyears_LoadTable(res.bofinancialyears);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanymaster_Form.controls) {
            let val = this.bocompanymaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocompanymaster_Form.controls[key] != null) {
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
        if (!this.bocompanymaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.bocompanymaster_Form.getRawValue();
        obj.incorporationdate = new Date(this.bocompanymaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('incorporationdate').value) + '  UTC' : null);
        obj.startdate = new Date(this.bocompanymaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('startdate').value) + '  UTC' : null);
        obj.enddate = new Date(this.bocompanymaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('enddate').value) + '  UTC' : null);
        obj.accountstartdate = new Date(this.bocompanymaster_Form.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('accountstartdate').value) + '  UTC' : null);
        obj.starttime = (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.hour) + ':' + (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.minute + ":00");
        obj.endtime = (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.hour) + ':' + (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.minute + ":00");
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(obj);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
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
        // Object.keys(this.bocompanymaster_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.bocompanymaster_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bocompanymaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocompanymaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocompanymaster_Form.controls[key] != null) {
                        this.formData[key] = this.bocompanymaster_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.incorporationdate = new Date(this.bocompanymaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('incorporationdate').value) + '  UTC' : null);
        this.formData.startdate = new Date(this.bocompanymaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('startdate').value) + '  UTC' : null);
        this.formData.enddate = new Date(this.bocompanymaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('enddate').value) + '  UTC' : null);
        this.formData.accountstartdate = new Date(this.bocompanymaster_Form.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('accountstartdate').value) + '  UTC' : null);
        this.formData.starttime = (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.hour) + ':' + (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.minute + ":00");
        this.formData.endtime = (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.hour) + ':' + (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.minute + ":00");
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_bocompanyholiday_IDs = this.Deleted_bocompanyholiday_IDs;
        this.formData.Deleted_bofinancialyear_IDs = this.Deleted_bofinancialyear_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.bocompanymaster_service.saveOrUpdate_bocompanymasters(this.formData, this.tbl_bocompanyholidays?.source?.data, this.tbl_bofinancialyears?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_bocompanyholidays.source) {
                    for (let i = 0; i < this.tbl_bocompanyholidays.source.data.length; i++) {
                        if (this.tbl_bocompanyholidays.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bocompanyholidays.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_bofinancialyears.source) {
                    for (let i = 0; i < this.tbl_bofinancialyears.source.data.length; i++) {
                        if (this.tbl_bofinancialyears.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bofinancialyears.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bocompanymaster);
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
                        this.objvalues.push((res as any).bocompanymaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanymaster_Form.markAsUntouched();
                this.bocompanymaster_Form.markAsPristine();
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
        this.tbl_bocompanyholidays.source = new LocalDataSource();
        this.tbl_bofinancialyears.source = new LocalDataSource();
    }

    AddOrEdit_bocompanyholiday(event: any, holidayid: any, companyid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bocompanyholidayComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, holidayid, companyid, visiblelist: this.bocompanyholidays_visiblelist, hidelist: this.bocompanyholidays_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bocompanyholidays.source.add(res[i]);
                    }
                    this.tbl_bocompanyholidays.source.refresh();
                }
                else {
                    this.tbl_bocompanyholidays.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bocompanyholiday(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bocompanyholiday_IDs += childID + ",";
        this.tbl_bocompanyholidays.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_bofinancialyear(event: any, finyearid: any, companyid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bofinancialyearComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, finyearid, companyid, visiblelist: this.bofinancialyears_visiblelist, hidelist: this.bofinancialyears_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bofinancialyears.source.add(res[i]);
                    }
                    this.tbl_bofinancialyears.source.refresh();
                }
                else {
                    this.tbl_bofinancialyears.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bofinancialyear(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bofinancialyear_IDs += childID + ",";
        this.tbl_bofinancialyears.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bocompanyholidays
    bocompanyholidays_settings: any;

    show_bocompanyholidays_Checkbox() {
        debugger;
        if (this.tbl_bocompanyholidays.source.settings['selectMode'] == 'multi') this.tbl_bocompanyholidays.source.settings['selectMode'] = 'single';
        else
            this.tbl_bocompanyholidays.source.settings['selectMode'] = 'multi';
        this.tbl_bocompanyholidays.source.initGrid();
    }
    delete_bocompanyholidays_All() {
        this.tbl_bocompanyholidays.source.settings['selectMode'] = 'single';
    }
    show_bocompanyholidays_Filter() {
        setTimeout(() => {
            //  this.Set_bocompanyholidays_TableDropDownConfig();
        });
        if (this.tbl_bocompanyholidays.source.settings != null) this.tbl_bocompanyholidays.source.settings['hideSubHeader'] = !this.tbl_bocompanyholidays.source.settings['hideSubHeader'];
        this.tbl_bocompanyholidays.source.initGrid();
    }
    show_bocompanyholidays_InActive() {
    }
    enable_bocompanyholidays_InActive() {
    }
    async Set_bocompanyholidays_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bocompanyholidays) {

            var clone = this.sharedService.clone(this.tbl_bocompanyholidays.source.settings);
            if (clone.columns['financialyearid'] != undefined) clone.columns['financialyearid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_financialyearid.value)), }, };
            if (clone.columns['financialyearid'] != undefined) clone.columns['financialyearid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_financialyearid.value)), }, };
            this.tbl_bocompanyholidays.source.settings = clone;
            this.tbl_bocompanyholidays.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bocompanyholidays.source.settings);
            if (clone.columns['holidayday'] != undefined) clone.columns['holidayday'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_holidayday.value)), }, };
            if (clone.columns['holidayday'] != undefined) clone.columns['holidayday'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_holidayday.value)), }, };
            this.tbl_bocompanyholidays.source.settings = clone;
            this.tbl_bocompanyholidays.source.initGrid();
        }
        this.bfilterPopulate_bocompanyholidays = true;
    }
    async bocompanyholidays_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bocompanyholidays_TableConfig() {
        this.bocompanyholidays_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.bocompanyholiday_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                financialyeariddesc: {
                    title: 'Financial Year',
                    type: 'html',
                    filter: true,
                },
                holidaydate: {
                    title: 'Holiday Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                holidaydaydesc: {
                    title: 'Holiday Day',
                    type: 'html',
                    filter: true,
                },
                reason: {
                    title: 'Reason',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bocompanyholidays_LoadTable(bocompanyholidays = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocompanyholidays_ID) >= 0) {
            if (this.tbl_bocompanyholidays != undefined) this.tbl_bocompanyholidays.source = new LocalDataSource();
            if (this.tbl_bocompanyholidays != undefined) this.tbl_bocompanyholidays.source.load(bocompanyholidays as any as LocalDataSource);
            if (this.tbl_bocompanyholidays != undefined) this.tbl_bocompanyholidays.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bocompanyholidays_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bocompanymaster_service.bocompanyholidays.length == 0)
    {
        this.tbl_bocompanyholidays.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bocompanyholiday();
        this.bocompanymaster_service.bocompanyholidays.push(obj);
        this.tbl_bocompanyholidays.source.refresh();
        if ((this.bocompanymaster_service.bocompanyholidays.length / this.tbl_bocompanyholidays.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bocompanyholidays.source.getPaging().page)
        {
            this.tbl_bocompanyholidays.source.setPage((this.bocompanymaster_service.bocompanyholidays.length / this.tbl_bocompanyholidays.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bocompanyholidays.source.grid.edit(this.tbl_bocompanyholidays.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bocompanyholidays.source.data.indexOf(event.data);
    this.onDelete_bocompanyholiday(event,event.data.holidayid,((this.tbl_bocompanyholidays.source.getPaging().page-1) *this.tbl_bocompanyholidays.source.getPaging().perPage)+index);
    this.tbl_bocompanyholidays.source.refresh();
    break;
    }
    }

    */
    bocompanyholidays_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bocompanyholiday(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bocompanyholiday(event, event.data.holidayid, this.formid);
                break;
            case 'delete':
                this.onDelete_bocompanyholiday(event, event.data.holidayid, ((this.tbl_bocompanyholidays.source.getPaging().page - 1) * this.tbl_bocompanyholidays.source.getPaging().perPage) + event.index);
                this.tbl_bocompanyholidays.source.refresh();
                break;
        }
    }
    bocompanyholidays_onDelete(obj) {
        let holidayid = obj.data.holidayid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanymaster_service.delete_bocompanymaster(holidayid).then(res =>
                this.bocompanyholidays_LoadTable()
            );
        }
    }
    async onCustom_bocompanyholidays_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bocompanyholidays");
        let formname = (objbomenuaction as any).actionname;




    }
    bocompanyholidays_Paging(val) {
        debugger;
        this.tbl_bocompanyholidays.source.setPaging(1, val, true);
    }

    handle_bocompanyholidays_GridSelected(event: any) {
        this.bocompanyholidays_selectedindex = this.tbl_bocompanyholidays.source.findIndex(i => i.holidayid === event.data.holidayid);
    }
    Is_bocompanyholidays_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocompanyholidays_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bocompanyholidays
    //start of Grid Codes bofinancialyears
    bofinancialyears_settings: any;

    show_bofinancialyears_Checkbox() {
        debugger;
        if (this.tbl_bofinancialyears.source.settings['selectMode'] == 'multi') this.tbl_bofinancialyears.source.settings['selectMode'] = 'single';
        else
            this.tbl_bofinancialyears.source.settings['selectMode'] = 'multi';
        this.tbl_bofinancialyears.source.initGrid();
    }
    delete_bofinancialyears_All() {
        this.tbl_bofinancialyears.source.settings['selectMode'] = 'single';
    }
    show_bofinancialyears_Filter() {
        setTimeout(() => {
            //  this.Set_bofinancialyears_TableDropDownConfig();
        });
        if (this.tbl_bofinancialyears.source.settings != null) this.tbl_bofinancialyears.source.settings['hideSubHeader'] = !this.tbl_bofinancialyears.source.settings['hideSubHeader'];
        this.tbl_bofinancialyears.source.initGrid();
    }
    show_bofinancialyears_InActive() {
    }
    enable_bofinancialyears_InActive() {
    }
    async Set_bofinancialyears_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bofinancialyears) {
        }
        this.bfilterPopulate_bofinancialyears = true;
    }
    async bofinancialyears_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bofinancialyears_TableConfig() {
        this.bofinancialyears_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.bofinancialyear_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                finyearname: {
                    title: 'Fin Year Name',
                    type: '',
                    filter: true,
                },
                startdate: {
                    title: 'Start Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                enddate: {
                    title: 'End Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                currentyear: {
                    title: 'Current Year',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
            },
        };
    }
    bofinancialyears_LoadTable(bofinancialyears = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bofinancialyears_ID) >= 0) {
            if (this.tbl_bofinancialyears != undefined) this.tbl_bofinancialyears.source = new LocalDataSource();
            if (this.tbl_bofinancialyears != undefined) this.tbl_bofinancialyears.source.load(bofinancialyears as any as LocalDataSource);
            if (this.tbl_bofinancialyears != undefined) this.tbl_bofinancialyears.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bofinancialyears_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bocompanymaster_service.bofinancialyears.length == 0)
    {
        this.tbl_bofinancialyears.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bofinancialyear();
        this.bocompanymaster_service.bofinancialyears.push(obj);
        this.tbl_bofinancialyears.source.refresh();
        if ((this.bocompanymaster_service.bofinancialyears.length / this.tbl_bofinancialyears.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bofinancialyears.source.getPaging().page)
        {
            this.tbl_bofinancialyears.source.setPage((this.bocompanymaster_service.bofinancialyears.length / this.tbl_bofinancialyears.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bofinancialyears.source.grid.edit(this.tbl_bofinancialyears.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bofinancialyears.source.data.indexOf(event.data);
    this.onDelete_bofinancialyear(event,event.data.finyearid,((this.tbl_bofinancialyears.source.getPaging().page-1) *this.tbl_bofinancialyears.source.getPaging().perPage)+index);
    this.tbl_bofinancialyears.source.refresh();
    break;
    }
    }

    */
    bofinancialyears_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bofinancialyear(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bofinancialyear(event, event.data.finyearid, this.formid);
                break;
            case 'delete':
                this.onDelete_bofinancialyear(event, event.data.finyearid, ((this.tbl_bofinancialyears.source.getPaging().page - 1) * this.tbl_bofinancialyears.source.getPaging().perPage) + event.index);
                this.tbl_bofinancialyears.source.refresh();
                break;
        }
    }
    bofinancialyears_onDelete(obj) {
        let finyearid = obj.data.finyearid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanymaster_service.delete_bocompanymaster(finyearid).then(res =>
                this.bofinancialyears_LoadTable()
            );
        }
    }
    async onCustom_bofinancialyears_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bofinancialyears");
        let formname = (objbomenuaction as any).actionname;




    }
    bofinancialyears_Paging(val) {
        debugger;
        this.tbl_bofinancialyears.source.setPaging(1, val, true);
    }

    handle_bofinancialyears_GridSelected(event: any) {
        this.bofinancialyears_selectedindex = this.tbl_bofinancialyears.source.findIndex(i => i.finyearid === event.data.finyearid);
    }
    Is_bofinancialyears_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bofinancialyears_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bofinancialyears

    // keyPressNumbers(event) {
    //     var charCode = (event.which) ? event.which : event.keyCode;
    //     // Only Numbers 0-9
    //     if ((charCode < 48 || charCode > 57)) {
    //       event.preventDefault();
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }

}



