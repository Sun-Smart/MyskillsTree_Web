import { crmcustomeraccountmasterService } from './../../../service/crmcustomeraccountmaster.service';
import { crmcustomeraccountmaster } from './../../../model/crmcustomeraccountmaster.model';
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
import { crmcustomeraccounttransaction } from './../../../model/crmcustomeraccounttransaction.model';
import { crmcustomeraccounttransactionComponent } from './../../../pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.component';
import { crmcustomeraccounttransactionService } from './../../../service/crmcustomeraccounttransaction.service';
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
    selector: 'app-crmcustomeraccountmaster',
    templateUrl: './crmcustomeraccountmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class crmcustomeraccountmasterComponent implements OnInit {
    formData: crmcustomeraccountmaster;
    list: crmcustomeraccountmaster[];
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

    bfilterPopulate_crmcustomeraccountmasters: boolean = false;
    bfilterPopulate_crmcustomeraccounttransactions: boolean = false;
    crmcustomeraccountmaster_menuactions: any = []
    crmcustomeraccounttransaction_menuactions: any = []
    @ViewChild('tbl_crmcustomeraccounttransactions', { static: false }) tbl_crmcustomeraccounttransactions: Ng2SmartTableComponent;

    crmcustomeraccountmaster_Form: FormGroup;

    customerid_List: DropDownValues[];
    customerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    productid_List: DropDownValues[];
    holdingtype_List: DropDownValues[];
    customerholding_List: DropDownValues[];

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



    crmcustomeraccounttransactions_visiblelist: any;
    crmcustomeraccounttransactions_hidelist: any;

    Deleted_crmcustomeraccounttransaction_IDs: string = "";
    crmcustomeraccounttransactions_ID: string = "1";
    crmcustomeraccounttransactions_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private crmcustomeraccountmaster_service: crmcustomeraccountmasterService,
        private crmcustomeraccounttransaction_service: crmcustomeraccounttransactionService,
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
        this.crmcustomeraccountmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            accountid: [null],
            customerid: [null],
            customeriddesc: [null],
            cifnumber: [null],
            accountnumber: [null],
            productid: [null],
            productiddesc: [null],
            accountopendate: [null],
            holdingtype: [null],
            holdingtypedesc: [null],
            customerholding: [null],
            customerholdingdesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.crmcustomeraccountmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.crmcustomeraccountmaster_Form.dirty && this.crmcustomeraccountmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.accountid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.accountid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.accountid && pkDetail) {
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
        let crmcustomeraccountmasterid = null;

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
        this.formid = crmcustomeraccountmasterid;
        //alert(crmcustomeraccountmasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_crmcustomeraccounttransactions_TableConfig();
            setTimeout(() => {
                //this.Set_crmcustomeraccounttransactions_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.crmcustomeraccountmaster_service.getDefaultData().then(res => {
            this.customerid_List = res.list_customerid.value;
            this.productid_List = res.list_productid.value;
            this.holdingtype_List = res.list_holdingtype.value;
            this.customerholding_List = res.list_customerholding.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.crmcustomeraccountmaster_service.get_crmcustomeraccountmasters_List().then(res => {
            this.pkList = res as crmcustomeraccountmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.crmcustomeraccountmaster_Form.markAsUntouched();
        this.crmcustomeraccountmaster_Form.markAsPristine();
    }
    onSelected_customerid(customeridDetail: any) {
        if (customeridDetail.value && customeridDetail) {
            this.crmcustomeraccountmaster_Form.patchValue({
                customerid: customeridDetail.value,
                customeriddesc: customeridDetail.label,

            });

        }
    }




    resetForm() {
        if (this.crmcustomeraccountmaster_Form != null)
            this.crmcustomeraccountmaster_Form.reset();
        this.crmcustomeraccountmaster_Form.patchValue({
        });
        setTimeout(() => {
            this.crmcustomeraccounttransactions_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let accountid = this.crmcustomeraccountmaster_Form.get('accountid').value;
        if (accountid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomeraccountmaster_service.delete_crmcustomeraccountmaster(accountid).then(res => {
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
        this.crmcustomeraccountmaster_Form.patchValue({
            accountid: null
        });
        if (this.formData.accountid != null) this.formData.accountid = null;
        for (let i = 0; i < this.tbl_crmcustomeraccounttransactions.source.length; i++) {
            this.tbl_crmcustomeraccounttransactions.source[i].transactionid = null;
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
                    else if (key == "accountopendate")
                        this.crmcustomeraccountmaster_Form.patchValue({ "accountopendate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.crmcustomeraccountmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomeraccountmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomeraccountmaster_Form.controls[key] != undefined) {
                                this.crmcustomeraccountmaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomeraccountmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.accountnumber != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.accountnumber != null) {
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
    productid_onChange(evt: any) {
        let e = evt.value;
        this.crmcustomeraccountmaster_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    holdingtype_onChange(evt: any) {
        let e = this.f.holdingtype.value as any;
        this.crmcustomeraccountmaster_Form.patchValue({ holdingtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    customerholding_onChange(evt: any) {
        let e = this.f.customerholding.value as any;
        this.crmcustomeraccountmaster_Form.patchValue({ customerholdingdesc: evt.options[evt.options.selectedIndex].text });
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



    edit_crmcustomeraccountmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.crmcustomeraccountmaster_service.get_crmcustomeraccountmasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.crmcustomeraccountmaster;
            let formproperty = res.crmcustomeraccountmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.crmcustomeraccountmaster.pkcol;
            this.formid = res.crmcustomeraccountmaster.accountid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.crmcustomeraccountmaster;
        this.formid = res.crmcustomeraccountmaster.accountid;
        this.pkcol = res.crmcustomeraccountmaster.pkcol;
        this.bmyrecord = false;
        if ((res.crmcustomeraccountmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomeraccountmaster_Form.patchValue({
            accountid: res.crmcustomeraccountmaster.accountid,
            customerid: res.crmcustomeraccountmaster.customerid,
            customeriddesc: res.crmcustomeraccountmaster.customeriddesc,
            cifnumber: res.crmcustomeraccountmaster.cifnumber,
            accountnumber: res.crmcustomeraccountmaster.accountnumber,
            productid: res.crmcustomeraccountmaster.productid,
            productiddesc: res.crmcustomeraccountmaster.productiddesc,
            accountopendate: this.ngbDateParserFormatter.parse(res.crmcustomeraccountmaster.accountopendate),
            holdingtype: res.crmcustomeraccountmaster.holdingtype,
            holdingtypedesc: res.crmcustomeraccountmaster.holdingtypedesc,
            customerholding: res.crmcustomeraccountmaster.customerholding,
            customerholdingdesc: res.crmcustomeraccountmaster.customerholdingdesc,
            customfield: res.crmcustomeraccountmaster.customfield,
            attachment: JSON.parse(res.crmcustomeraccountmaster.attachment),
            status: res.crmcustomeraccountmaster.status,
            statusdesc: res.crmcustomeraccountmaster.statusdesc,
        });
        this.crmcustomeraccountmaster_menuactions = res.crmcustomeraccountmaster_menuactions;
        this.crmcustomeraccounttransaction_menuactions = res.crmcustomeraccounttransaction_menuactions;
        this.crmcustomeraccounttransactions_visiblelist = res.crmcustomeraccounttransactions_visiblelist;
        if (this.crmcustomeraccountmaster_Form.get('customfield').value != null && this.crmcustomeraccountmaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.crmcustomeraccountmaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.crmcustomeraccountmaster_Form.get('attachment').value != null && this.crmcustomeraccountmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.crmcustomeraccountmaster_Form.get('attachment').value);
        //Child Tables if any
        this.Set_crmcustomeraccounttransactions_TableConfig();
        this.crmcustomeraccounttransactions_LoadTable(res.crmcustomeraccounttransactions);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomeraccountmaster_Form.controls) {
            let val = this.crmcustomeraccountmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.crmcustomeraccountmaster_Form.controls[key] != null) {
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
        if (!this.crmcustomeraccountmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.crmcustomeraccountmaster_Form.getRawValue();
        obj.accountopendate = new Date(this.crmcustomeraccountmaster_Form.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmaster_Form.get('accountopendate').value) + '  UTC' : null);
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
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
        // Object.keys(this.crmcustomeraccountmaster_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.crmcustomeraccountmaster_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.crmcustomeraccountmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.crmcustomeraccountmaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.crmcustomeraccountmaster_Form.controls[key] != null) {
                        this.formData[key] = this.crmcustomeraccountmaster_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.accountopendate = new Date(this.crmcustomeraccountmaster_Form.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmaster_Form.get('accountopendate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_crmcustomeraccounttransaction_IDs = this.Deleted_crmcustomeraccounttransaction_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.crmcustomeraccountmaster_service.saveOrUpdate_crmcustomeraccountmasters(this.formData, this.tbl_crmcustomeraccounttransactions?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_crmcustomeraccounttransactions.source) {
                    for (let i = 0; i < this.tbl_crmcustomeraccounttransactions.source.data.length; i++) {
                        if (this.tbl_crmcustomeraccounttransactions.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_crmcustomeraccounttransactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).crmcustomeraccountmaster);
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
                        this.objvalues.push((res as any).crmcustomeraccountmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomeraccountmaster_Form.markAsUntouched();
                this.crmcustomeraccountmaster_Form.markAsPristine();
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
        this.tbl_crmcustomeraccounttransactions.source = new LocalDataSource();
    }

    AddOrEdit_crmcustomeraccounttransaction(event: any, transactionid: any, accountid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(crmcustomeraccounttransactionComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, transactionid, accountid, visiblelist: this.crmcustomeraccounttransactions_visiblelist, hidelist: this.crmcustomeraccounttransactions_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomeraccounttransactions.source.add(res[i]);
                    }
                    this.tbl_crmcustomeraccounttransactions.source.refresh();
                }
                else {
                    this.tbl_crmcustomeraccounttransactions.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_crmcustomeraccounttransaction(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_crmcustomeraccounttransaction_IDs += childID + ",";
        this.tbl_crmcustomeraccounttransactions.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes crmcustomeraccounttransactions
    crmcustomeraccounttransactions_settings: any;

    show_crmcustomeraccounttransactions_Checkbox() {
        debugger;
        if (this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] == 'multi') this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomeraccounttransactions.source.initGrid();
    }
    delete_crmcustomeraccounttransactions_All() {
        this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'single';
    }
    show_crmcustomeraccounttransactions_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomeraccounttransactions_TableDropDownConfig();
        });
        if (this.tbl_crmcustomeraccounttransactions.source.settings != null) this.tbl_crmcustomeraccounttransactions.source.settings['hideSubHeader'] = !this.tbl_crmcustomeraccounttransactions.source.settings['hideSubHeader'];
        this.tbl_crmcustomeraccounttransactions.source.initGrid();
    }
    show_crmcustomeraccounttransactions_InActive() {
    }
    enable_crmcustomeraccounttransactions_InActive() {
    }
    async Set_crmcustomeraccounttransactions_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_crmcustomeraccounttransactions) {

            var clone = this.sharedService.clone(this.tbl_crmcustomeraccounttransactions.source.settings);
            if (clone.columns['customerid'] != undefined) clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_customerid.value)), }, };
            if (clone.columns['customerid'] != undefined) clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_customerid.value)), }, };
            this.tbl_crmcustomeraccounttransactions.source.settings = clone;
            this.tbl_crmcustomeraccounttransactions.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_crmcustomeraccounttransactions.source.settings);
            if (clone.columns['transactiontype'] != undefined) clone.columns['transactiontype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_transactiontype.value)), }, };
            if (clone.columns['transactiontype'] != undefined) clone.columns['transactiontype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_transactiontype.value)), }, };
            this.tbl_crmcustomeraccounttransactions.source.settings = clone;
            this.tbl_crmcustomeraccounttransactions.source.initGrid();
        }
        this.bfilterPopulate_crmcustomeraccounttransactions = true;
    }
    async crmcustomeraccounttransactions_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_crmcustomeraccounttransactions_TableConfig() {
        this.crmcustomeraccounttransactions_settings = {
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
                custom: this.crmcustomeraccounttransaction_menuactions
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
                customeriddesc: {
                    title: 'Customer',
                    type: 'html',
                    filter: true,
                },
                cifnumber: {
                    title: 'C I F Number',
                    type: '',
                    filter: true,
                },
                accountnumber: {
                    title: 'Account Number',
                    type: '',
                    filter: true,
                },
                date: {
                    title: 'Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                description: {
                    title: 'Description',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                amount: {
                    title: 'Amount',
                    type: '',
                    filter: true,
                },
                transactiontypedesc: {
                    title: 'Transaction Type',
                    type: 'html',
                    filter: true,
                },
                closingbalance: {
                    title: 'Closing Balance',
                    type: '',
                    filter: true,
                },
                customfield: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getCustomValue(cell);
                        return ret;
                    },
                },
            },
        };
    }
    crmcustomeraccounttransactions_LoadTable(crmcustomeraccounttransactions = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactions_ID) >= 0) {
            if (this.tbl_crmcustomeraccounttransactions != undefined) this.tbl_crmcustomeraccounttransactions.source = new LocalDataSource();
            if (this.tbl_crmcustomeraccounttransactions != undefined) this.tbl_crmcustomeraccounttransactions.source.load(crmcustomeraccounttransactions as any as LocalDataSource);
            if (this.tbl_crmcustomeraccounttransactions != undefined) this.tbl_crmcustomeraccounttransactions.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    crmcustomeraccounttransactions_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length == 0)
    {
        this.tbl_crmcustomeraccounttransactions.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomeraccounttransaction();
        this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.push(obj);
        this.tbl_crmcustomeraccounttransactions.source.refresh();
        if ((this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length / this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomeraccounttransactions.source.getPaging().page)
        {
            this.tbl_crmcustomeraccounttransactions.source.setPage((this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length / this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomeraccounttransactions.source.grid.edit(this.tbl_crmcustomeraccounttransactions.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomeraccounttransactions.source.data.indexOf(event.data);
    this.onDelete_crmcustomeraccounttransaction(event,event.data.transactionid,((this.tbl_crmcustomeraccounttransactions.source.getPaging().page-1) *this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage)+index);
    this.tbl_crmcustomeraccounttransactions.source.refresh();
    break;
    }
    }
    
    */
    crmcustomeraccounttransactions_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomeraccounttransaction(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomeraccounttransaction(event, event.data.transactionid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomeraccounttransaction(event, event.data.transactionid, ((this.tbl_crmcustomeraccounttransactions.source.getPaging().page - 1) * this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomeraccounttransactions.source.refresh();
                break;
        }
    }
    crmcustomeraccounttransactions_onDelete(obj) {
        let transactionid = obj.data.transactionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomeraccountmaster_service.delete_crmcustomeraccountmaster(transactionid).then(res =>
                this.crmcustomeraccounttransactions_LoadTable()
            );
        }
    }
    async onCustom_crmcustomeraccounttransactions_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "crmcustomeraccounttransactions");
        let formname = (objbomenuaction as any).actionname;




    }
    crmcustomeraccounttransactions_Paging(val) {
        debugger;
        this.tbl_crmcustomeraccounttransactions.source.setPaging(1, val, true);
    }

    handle_crmcustomeraccounttransactions_GridSelected(event: any) {
        this.crmcustomeraccounttransactions_selectedindex = this.tbl_crmcustomeraccounttransactions.source.findIndex(i => i.transactionid === event.data.transactionid);
    }
    Is_crmcustomeraccounttransactions_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactions_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes crmcustomeraccounttransactions

}



