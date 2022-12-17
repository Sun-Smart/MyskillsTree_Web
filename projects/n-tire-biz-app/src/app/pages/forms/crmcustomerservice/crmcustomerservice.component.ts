import { crmcustomerserviceService } from './../../../service/crmcustomerservice.service';
import { crmcustomerservice } from './../../../model/crmcustomerservice.model';
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
import { crmcustomerservicedetail } from './../../../model/crmcustomerservicedetail.model';
import { crmcustomerservicedetailComponent } from './../../../pages/forms/crmcustomerservicedetail/crmcustomerservicedetail.component';
import { crmcustomerservicedetailService } from './../../../service/crmcustomerservicedetail.service';
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

@Component({
    selector: 'app-crmcustomerservice',
    templateUrl: './crmcustomerservice.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class crmcustomerserviceComponent implements OnInit {
    formData: crmcustomerservice;
    list: crmcustomerservice[];
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

    bfilterPopulate_crmcustomerservices: boolean = false;
    bfilterPopulate_crmcustomerservicedetails: boolean = false;
    crmcustomerservice_menuactions: any = []
    crmcustomerservicedetail_menuactions: any = []
    @ViewChild('tbl_crmcustomerservicedetails', { static: false }) tbl_crmcustomerservicedetails: Ng2SmartTableComponent;

    crmcustomerservice_Form: FormGroup;

    customerid_List: DropDownValues[];
    customerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    servicetype_List: DropDownValues[];
    userid_List: DropDownValues[];
    userid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    crmcustomerservicedetails_visiblelist: any;
    crmcustomerservicedetails_hidelist: any;

    Deleted_crmcustomerservicedetail_IDs: string = "";
    crmcustomerservicedetails_ID: string = "1";
    crmcustomerservicedetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private crmcustomerservice_service: crmcustomerserviceService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
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
        this.crmcustomerservice_Form = this.fb.group({
            pk: [null],
            serviceid: [null],
            currentdate: [null],
            currenttime: [null],
            customerid: [null],
            customeriddesc: [null],
            servicetype: [null],
            servicetypedesc: [null],
            userid: [null],
            useriddesc: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.crmcustomerservice_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.crmcustomerservice_Form.dirty && this.crmcustomerservice_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.serviceid && pkDetail) {
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
        let crmcustomerserviceid = null;

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
        this.formid = crmcustomerserviceid;
        //alert(crmcustomerserviceid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_crmcustomerservicedetails_TableConfig();
            setTimeout(() => {
                //this.Set_crmcustomerservicedetails_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.crmcustomerservice_service.getDefaultData().then(res => {
            this.customerid_List = res.list_customerid.value;
            this.servicetype_List = res.list_servicetype.value;
            this.userid_List = res.list_userid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.crmcustomerservice_service.get_crmcustomerservices_List().then(res => {
            this.pkList = res as crmcustomerservice[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.crmcustomerservice_Form.markAsUntouched();
        this.crmcustomerservice_Form.markAsPristine();
    }
    onSelected_customerid(customeridDetail: any) {
        if (customeridDetail.value && customeridDetail) {
            this.crmcustomerservice_Form.patchValue({
                customerid: customeridDetail.value,
                customeriddesc: customeridDetail.label,

            });

        }
    }

    onSelected_userid(useridDetail: any) {
        if (useridDetail.value && useridDetail) {
            this.crmcustomerservice_Form.patchValue({
                userid: useridDetail.value,
                useriddesc: useridDetail.label,

            });

        }
    }




    resetForm() {
        if (this.crmcustomerservice_Form != null)
            this.crmcustomerservice_Form.reset();
        this.crmcustomerservice_Form.patchValue({
            userid: this.sessionData.userid,
            useriddesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.crmcustomerservicedetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let serviceid = this.crmcustomerservice_Form.get('serviceid').value;
        if (serviceid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomerservice_service.delete_crmcustomerservice(serviceid).then(res => {
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
        this.crmcustomerservice_Form.patchValue({
            serviceid: null
        });
        if (this.formData.serviceid != null) this.formData.serviceid = null;
        for (let i = 0; i < this.tbl_crmcustomerservicedetails.source.length; i++) {
            this.tbl_crmcustomerservicedetails.source[i].detailid = null;
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
                    else if (key == "currentdate")
                        this.crmcustomerservice_Form.patchValue({ "currentdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "currenttime")
                        this.crmcustomerservice_Form.patchValue({ "currenttime": new Time(mainscreendata[key]) });
                    else if (key == "notes")
                        this.crmcustomerservice_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.crmcustomerservice_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomerservice_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomerservice_Form.controls[key] != undefined) {
                                this.crmcustomerservice_Form.controls[key].disable({ onlySelf: true });
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
    customerid_onChange(evt: any) {
        let e = evt.value;
    }
    servicetype_onChange(evt: any) {
        let e = this.f.servicetype.value as any;
        this.crmcustomerservice_Form.patchValue({ servicetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    userid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_crmcustomerservices() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.crmcustomerservice_service.get_crmcustomerservices_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.crmcustomerservice;
            let formproperty = res.crmcustomerservice.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.crmcustomerservice.pkcol;
            this.formid = res.crmcustomerservice.serviceid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.crmcustomerservice;
        this.formid = res.crmcustomerservice.serviceid;
        this.pkcol = res.crmcustomerservice.pkcol;
        this.bmyrecord = false;
        if ((res.crmcustomerservice as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        var currenttimeTime = new Time(res.crmcustomerservice.currenttime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomerservice_Form.patchValue({
            serviceid: res.crmcustomerservice.serviceid,
            currentdate: this.ngbDateParserFormatter.parse(res.crmcustomerservice.currentdate),
            currenttime: currenttimeTime,
            customerid: res.crmcustomerservice.customerid,
            customeriddesc: res.crmcustomerservice.customeriddesc,
            servicetype: res.crmcustomerservice.servicetype,
            servicetypedesc: res.crmcustomerservice.servicetypedesc,
            userid: res.crmcustomerservice.userid,
            useriddesc: res.crmcustomerservice.useriddesc,
            notes: JSON.parse(res.crmcustomerservice.notes),
            status: res.crmcustomerservice.status,
            statusdesc: res.crmcustomerservice.statusdesc,
        });
        this.crmcustomerservice_menuactions = res.crmcustomerservice_menuactions;
        this.crmcustomerservicedetail_menuactions = res.crmcustomerservicedetail_menuactions;
        this.crmcustomerservicedetails_visiblelist = res.crmcustomerservicedetails_visiblelist;
        //Child Tables if any
        this.Set_crmcustomerservicedetails_TableConfig();
        this.crmcustomerservicedetails_LoadTable(res.crmcustomerservicedetails);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomerservice_Form.controls) {
            let val = this.crmcustomerservice_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.crmcustomerservice_Form.controls[key] != null) {
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
        if (!this.crmcustomerservice_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.crmcustomerservice_Form.getRawValue();
        obj.currentdate = new Date(this.crmcustomerservice_Form.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerservice_Form.get('currentdate').value) + '  UTC' : null);
        obj.currenttime = (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.hour) + ':' + (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.minute + ":00");
        if (this.crmcustomerservice_Form.get('notes').value != null) obj.notes = JSON.stringify(this.crmcustomerservice_Form.get('notes').value);
        console.log(obj);
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
        // Object.keys(this.crmcustomerservice_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.crmcustomerservice_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.crmcustomerservice_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.crmcustomerservice_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.crmcustomerservice_Form.controls[key] != null) {
                        this.formData[key] = this.crmcustomerservice_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.currentdate = new Date(this.crmcustomerservice_Form.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerservice_Form.get('currentdate').value) + '  UTC' : null);
        this.formData.currenttime = (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.hour) + ':' + (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.minute + ":00");
        if (this.crmcustomerservice_Form.get('notes').value != null) this.formData.notes = JSON.stringify(this.crmcustomerservice_Form.get('notes').value);
        this.formData.Deleted_crmcustomerservicedetail_IDs = this.Deleted_crmcustomerservicedetail_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.crmcustomerservice_service.saveOrUpdate_crmcustomerservices(this.formData, this.tbl_crmcustomerservicedetails?.source?.data,).subscribe(
            async res => {
                if (this.tbl_crmcustomerservicedetails.source) {
                    for (let i = 0; i < this.tbl_crmcustomerservicedetails.source.data.length; i++) {
                        if (this.tbl_crmcustomerservicedetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_crmcustomerservicedetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).crmcustomerservice);
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
                        this.objvalues.push((res as any).crmcustomerservice);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomerservice_Form.markAsUntouched();
                this.crmcustomerservice_Form.markAsPristine();
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
        this.tbl_crmcustomerservicedetails.source = new LocalDataSource();
    }

    AddOrEdit_crmcustomerservicedetail(event: any, detailid: any, serviceid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(crmcustomerservicedetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, detailid, serviceid, visiblelist: this.crmcustomerservicedetails_visiblelist, hidelist: this.crmcustomerservicedetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomerservicedetails.source.add(res[i]);
                    }
                    this.tbl_crmcustomerservicedetails.source.refresh();
                }
                else {
                    this.tbl_crmcustomerservicedetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_crmcustomerservicedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_crmcustomerservicedetail_IDs += childID + ",";
        this.tbl_crmcustomerservicedetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes crmcustomerservicedetails
    crmcustomerservicedetails_settings: any;

    show_crmcustomerservicedetails_Checkbox() {
        debugger;
        if (this.tbl_crmcustomerservicedetails.source.settings['selectMode'] == 'multi') this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomerservicedetails.source.initGrid();
    }
    delete_crmcustomerservicedetails_All() {
        this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'single';
    }
    show_crmcustomerservicedetails_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomerservicedetails_TableDropDownConfig();
        });
        if (this.tbl_crmcustomerservicedetails.source.settings != null) this.tbl_crmcustomerservicedetails.source.settings['hideSubHeader'] = !this.tbl_crmcustomerservicedetails.source.settings['hideSubHeader'];
        this.tbl_crmcustomerservicedetails.source.initGrid();
    }
    show_crmcustomerservicedetails_InActive() {
    }
    enable_crmcustomerservicedetails_InActive() {
    }
    async Set_crmcustomerservicedetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_crmcustomerservicedetails) {
        }
        this.bfilterPopulate_crmcustomerservicedetails = true;
    }
    async crmcustomerservicedetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_crmcustomerservicedetails_TableConfig() {
        this.crmcustomerservicedetails_settings = {
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
                custom: this.crmcustomerservicedetail_menuactions
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
                itemid: {
                    title: 'Item',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    crmcustomerservicedetails_LoadTable(crmcustomerservicedetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetails_ID) >= 0) {
            if (this.tbl_crmcustomerservicedetails != undefined) this.tbl_crmcustomerservicedetails.source = new LocalDataSource();
            if (this.tbl_crmcustomerservicedetails != undefined) this.tbl_crmcustomerservicedetails.source.load(crmcustomerservicedetails as any as LocalDataSource);
            if (this.tbl_crmcustomerservicedetails != undefined) this.tbl_crmcustomerservicedetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    crmcustomerservicedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomerservice_service.crmcustomerservicedetails.length == 0)
    {
        this.tbl_crmcustomerservicedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomerservicedetail();
        this.crmcustomerservice_service.crmcustomerservicedetails.push(obj);
        this.tbl_crmcustomerservicedetails.source.refresh();
        if ((this.crmcustomerservice_service.crmcustomerservicedetails.length / this.tbl_crmcustomerservicedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomerservicedetails.source.getPaging().page)
        {
            this.tbl_crmcustomerservicedetails.source.setPage((this.crmcustomerservice_service.crmcustomerservicedetails.length / this.tbl_crmcustomerservicedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomerservicedetails.source.grid.edit(this.tbl_crmcustomerservicedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomerservicedetails.source.data.indexOf(event.data);
    this.onDelete_crmcustomerservicedetail(event,event.data.detailid,((this.tbl_crmcustomerservicedetails.source.getPaging().page-1) *this.tbl_crmcustomerservicedetails.source.getPaging().perPage)+index);
    this.tbl_crmcustomerservicedetails.source.refresh();
    break;
    }
    }
    
    */
    crmcustomerservicedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomerservicedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomerservicedetail(event, event.data.detailid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomerservicedetail(event, event.data.detailid, ((this.tbl_crmcustomerservicedetails.source.getPaging().page - 1) * this.tbl_crmcustomerservicedetails.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomerservicedetails.source.refresh();
                break;
        }
    }
    crmcustomerservicedetails_onDelete(obj) {
        let detailid = obj.data.detailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomerservice_service.delete_crmcustomerservice(detailid).then(res =>
                this.crmcustomerservicedetails_LoadTable()
            );
        }
    }
    async onCustom_crmcustomerservicedetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "crmcustomerservicedetails");
        let formname = (objbomenuaction as any).actionname;




    }
    crmcustomerservicedetails_Paging(val) {
        debugger;
        this.tbl_crmcustomerservicedetails.source.setPaging(1, val, true);
    }

    handle_crmcustomerservicedetails_GridSelected(event: any) {
        this.crmcustomerservicedetails_selectedindex = this.tbl_crmcustomerservicedetails.source.findIndex(i => i.detailid === event.data.detailid);
    }
    Is_crmcustomerservicedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes crmcustomerservicedetails

}



