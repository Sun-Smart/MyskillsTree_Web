import { boexpenseService } from './../../../service/boexpense.service';
import { boexpense } from './../../../model/boexpense.model';
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
import { boexpensedetail } from './../../../model/boexpensedetail.model';
import { boexpensedetailComponent } from './../../../pages/forms/boexpensedetail/boexpensedetail.component';
import { boexpensedetailService } from './../../../service/boexpensedetail.service';
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
    selector: 'app-boexpense',
    templateUrl: './boexpense.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boexpenseComponent implements OnInit {
    formData: boexpense;
    list: boexpense[];
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

    bfilterPopulate_boexpenses: boolean = false;
    bfilterPopulate_boexpensedetails: boolean = false;
    boexpense_menuactions: any = []
    boexpensedetail_menuactions: any = []
    @ViewChild('tbl_boexpensedetails', { static: false }) tbl_boexpensedetails: Ng2SmartTableComponent;

    boexpense_Form: FormGroup;

    requesteduserid_List: DropDownValues[];
    requesteduserid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    expensetype_List: DropDownValues[];
    expensecategory_List: DropDownValues[];
    currency_List: DropDownValues[];
    basecurrency_List: DropDownValues[];
    costcenterid_List: DropDownValues[];

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



    boexpensedetails_visiblelist: any;
    boexpensedetails_hidelist: any;

    Deleted_boexpensedetail_IDs: string = "";
    boexpensedetails_ID: string = "1";
    boexpensedetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boexpense_service: boexpenseService,
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
        this.boexpense_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            expenseid: [null],
            sourcefield: [null],
            sourcereference: [null],
            expensedate: [null, Validators.compose([Validators.required])],
            requesteduserid: [null, Validators.compose([Validators.required])],
            requesteduseriddesc: [null],
            expensetype: [null],
            expensetypedesc: [null],
            expensecategory: [null],
            expensecategorydesc: [null],
            expensedescription: [null, Validators.compose([Validators.required])],
            currency: [null],
            currencydesc: [null],
            amount: [null, Validators.compose([Validators.required])],
            tax: [null],
            othercharges: [null],
            totalamount: [null],
            merchant: [null],
            reference: [null],
            receiptattached: [null],
            billable: [null],
            reimbursedamount: [null],
            reimburseddate: [null],
            referencenumber: [null],
            basecurrency: [null],
            basecurrencydesc: [null],
            baseamount: [null],
            notes: [null],
            costcenterid: [null],
            costcenteriddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boexpense_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boexpense_Form.dirty && this.boexpense_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.expenseid && pkDetail) {
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
        let boexpenseid = null;

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
        this.formid = boexpenseid;
        //alert(boexpenseid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_boexpensedetails_TableConfig();
            setTimeout(() => {
                //this.Set_boexpensedetails_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boexpense_service.getDefaultData().then(res => {
            this.requesteduserid_List = res.list_requesteduserid.value;
            this.expensetype_List = res.list_expensetype.value;
            this.expensecategory_List = res.list_expensecategory.value;
            this.currency_List = res.list_currency.value;
            this.basecurrency_List = res.list_basecurrency.value;
            this.costcenterid_List = res.list_costcenterid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boexpense_service.get_boexpenses_List().then(res => {
            this.pkList = res as boexpense[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boexpense_Form.markAsUntouched();
        this.boexpense_Form.markAsPristine();
    }
    onSelected_requesteduserid(requesteduseridDetail: any) {
        if (requesteduseridDetail.value && requesteduseridDetail) {
            this.boexpense_Form.patchValue({
                requesteduserid: requesteduseridDetail.value,
                requesteduseriddesc: requesteduseridDetail.label,

            });

        }
    }




    resetForm() {
        if (this.boexpense_Form != null)
            this.boexpense_Form.reset();
        this.boexpense_Form.patchValue({
            requesteduserid: this.sessionData.userid,
            requesteduseriddesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.boexpensedetails_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.boexpense_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }

    onDelete() {
        let expenseid = this.boexpense_Form.get('expenseid').value;
        if (expenseid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boexpense_service.delete_boexpense(expenseid).then(res => {
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
        this.boexpense_Form.patchValue({
            expenseid: null
        });
        if (this.formData.expenseid != null) this.formData.expenseid = null;
        for (let i = 0; i < this.tbl_boexpensedetails.source.length; i++) {
            this.tbl_boexpensedetails.source[i].expensedetailid = null;
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
                    else if (key == "expensedate")
                        this.boexpense_Form.patchValue({ "expensedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "reimburseddate")
                        this.boexpense_Form.patchValue({ "reimburseddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "notes")
                        this.boexpense_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boexpense_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boexpense_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boexpense_Form.controls[key] != undefined) {
                                this.boexpense_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("boexpenses", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


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
    requesteduserid_onChange(evt: any) {
        let e = evt.value;
    }
    expensetype_onChange(evt: any) {
        let e = this.f.expensetype.value as any;
        this.boexpense_Form.patchValue({ expensetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    expensecategory_onChange(evt: any) {
        let e = this.f.expensecategory.value as any;
        this.boexpense_Form.patchValue({ expensecategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    currency_onChange(evt: any) {
        let e = this.f.currency.value as any;
        this.boexpense_Form.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }
    basecurrency_onChange(evt: any) {
        let e = this.f.basecurrency.value as any;
        this.boexpense_Form.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
    }
    costcenterid_onChange(evt: any) {
        let e = evt.value;
        this.boexpense_Form.patchValue({ costcenteriddesc: evt.options[evt.options.selectedIndex].text });
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



    edit_boexpenses() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boexpense_service.get_boexpenses_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boexpense;
            let formproperty = res.boexpense.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boexpense.pkcol;
            this.formid = res.boexpense.expenseid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boexpense;
        this.formid = res.boexpense.expenseid;
        this.pkcol = res.boexpense.pkcol;
        this.bmyrecord = false;
        if ((res.boexpense as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boexpense_Form.patchValue({
            expenseid: res.boexpense.expenseid,
            sourcefield: res.boexpense.sourcefield,
            sourcereference: res.boexpense.sourcereference,
            expensedate: this.ngbDateParserFormatter.parse(res.boexpense.expensedate),
            requesteduserid: res.boexpense.requesteduserid,
            requesteduseriddesc: res.boexpense.requesteduseriddesc,
            expensetype: res.boexpense.expensetype,
            expensetypedesc: res.boexpense.expensetypedesc,
            expensecategory: res.boexpense.expensecategory,
            expensecategorydesc: res.boexpense.expensecategorydesc,
            expensedescription: res.boexpense.expensedescription,
            currency: res.boexpense.currency,
            currencydesc: res.boexpense.currencydesc,
            amount: res.boexpense.amount,
            tax: res.boexpense.tax,
            othercharges: res.boexpense.othercharges,
            totalamount: res.boexpense.totalamount,
            merchant: res.boexpense.merchant,
            reference: res.boexpense.reference,
            receiptattached: res.boexpense.receiptattached,
            billable: res.boexpense.billable,
            reimbursedamount: res.boexpense.reimbursedamount,
            reimburseddate: this.ngbDateParserFormatter.parse(res.boexpense.reimburseddate),
            referencenumber: res.boexpense.referencenumber,
            basecurrency: res.boexpense.basecurrency,
            basecurrencydesc: res.boexpense.basecurrencydesc,
            baseamount: res.boexpense.baseamount,
            notes: JSON.parse(res.boexpense.notes),
            costcenterid: res.boexpense.costcenterid,
            costcenteriddesc: res.boexpense.costcenteriddesc,
            customfield: res.boexpense.customfield,
            attachment: JSON.parse(res.boexpense.attachment),
            status: res.boexpense.status,
            statusdesc: res.boexpense.statusdesc,
        });
        this.boexpense_menuactions = res.boexpense_menuactions;
        this.boexpensedetail_menuactions = res.boexpensedetail_menuactions;
        this.boexpensedetails_visiblelist = res.boexpensedetails_visiblelist;
        if (this.boexpense_Form.get('customfield').value != null && this.boexpense_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.boexpense_Form.get('customfield').value);
        this.FillCustomField();
        if (this.boexpense_Form.get('attachment').value != null && this.boexpense_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.boexpense_Form.get('attachment').value);
        //Child Tables if any
        this.Set_boexpensedetails_TableConfig();
        this.boexpensedetails_LoadTable(res.boexpensedetails);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;

        for (let key in this.boexpense_Form.controls) {
            let val = this.boexpense_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boexpense_Form.controls[key] != null) {
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
        if (!this.boexpense_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.boexpense_Form.getRawValue();
        obj.expensedate = new Date(this.boexpense_Form.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('expensedate').value) + '  UTC' : null);
        obj.reimburseddate = new Date(this.boexpense_Form.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('reimburseddate').value) + '  UTC' : null);
        if (this.boexpense_Form.get('notes').value != null) obj.notes = JSON.stringify(this.boexpense_Form.get('notes').value);
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
        // Object.keys(this.boexpense_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boexpense_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boexpense_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boexpense_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boexpense_Form.controls[key] != null) {
                        this.formData[key] = this.boexpense_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.expensedate = new Date(this.boexpense_Form.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('expensedate').value) + '  UTC' : null);
        this.formData.reimburseddate = new Date(this.boexpense_Form.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('reimburseddate').value) + '  UTC' : null);
        if (this.boexpense_Form.get('notes').value != null) this.formData.notes = JSON.stringify(this.boexpense_Form.get('notes').value);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_boexpensedetail_IDs = this.Deleted_boexpensedetail_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.boexpense_service.saveOrUpdate_boexpenses(this.formData, this.tbl_boexpensedetails?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_boexpensedetails.source) {
                    for (let i = 0; i < this.tbl_boexpensedetails.source.data.length; i++) {
                        if (this.tbl_boexpensedetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boexpensedetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boexpense);
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
                        this.objvalues.push((res as any).boexpense);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boexpense_Form.markAsUntouched();
                this.boexpense_Form.markAsPristine();
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
        this.tbl_boexpensedetails.source = new LocalDataSource();
    }

    AddOrEdit_boexpensedetail(event: any, expensedetailid: any, expenseid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boexpensedetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, expensedetailid, expenseid, visiblelist: this.boexpensedetails_visiblelist, hidelist: this.boexpensedetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boexpensedetails.source.add(res[i]);
                    }
                    this.tbl_boexpensedetails.source.refresh();
                }
                else {
                    this.tbl_boexpensedetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boexpensedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boexpensedetail_IDs += childID + ",";
        this.tbl_boexpensedetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boexpensedetails
    boexpensedetails_settings: any;

    show_boexpensedetails_Checkbox() {
        debugger;
        if (this.tbl_boexpensedetails.source.settings['selectMode'] == 'multi') this.tbl_boexpensedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_boexpensedetails.source.settings['selectMode'] = 'multi';
        this.tbl_boexpensedetails.source.initGrid();
    }
    delete_boexpensedetails_All() {
        this.tbl_boexpensedetails.source.settings['selectMode'] = 'single';
    }
    show_boexpensedetails_Filter() {
        setTimeout(() => {
            //  this.Set_boexpensedetails_TableDropDownConfig();
        });
        if (this.tbl_boexpensedetails.source.settings != null) this.tbl_boexpensedetails.source.settings['hideSubHeader'] = !this.tbl_boexpensedetails.source.settings['hideSubHeader'];
        this.tbl_boexpensedetails.source.initGrid();
    }
    show_boexpensedetails_InActive() {
    }
    enable_boexpensedetails_InActive() {
    }
    async Set_boexpensedetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boexpensedetails) {
        }
        this.bfilterPopulate_boexpensedetails = true;
    }
    async boexpensedetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boexpensedetails_TableConfig() {
        this.boexpensedetails_settings = {
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
                custom: this.boexpensedetail_menuactions
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
                expenseid: {
                    title: 'Expense',
                    type: 'number',
                    filter: true,
                },
                sourcereference: {
                    title: 'Source Reference',
                    type: 'number',
                    filter: true,
                },
                item: {
                    title: 'Item',
                    type: 'number',
                    filter: true,
                },
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                amount: {
                    title: 'Amount',
                    type: 'number',
                    filter: true,
                },
                costcenterid: {
                    title: 'Cost Center',
                    type: 'number',
                    filter: true,
                },
                notes: {
                    title: 'Notes',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                attachment: {
                    title: 'Attachment',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getAttachmentValue(cell);
                        return ret;
                    },
                },
            },
        };
    }
    boexpensedetails_LoadTable(boexpensedetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpensedetails_ID) >= 0) {
            if (this.tbl_boexpensedetails != undefined) this.tbl_boexpensedetails.source = new LocalDataSource();
            if (this.tbl_boexpensedetails != undefined) this.tbl_boexpensedetails.source.load(boexpensedetails as any as LocalDataSource);
            if (this.tbl_boexpensedetails != undefined) this.tbl_boexpensedetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boexpensedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boexpense_service.boexpensedetails.length == 0)
    {
        this.tbl_boexpensedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boexpensedetail();
        this.boexpense_service.boexpensedetails.push(obj);
        this.tbl_boexpensedetails.source.refresh();
        if ((this.boexpense_service.boexpensedetails.length / this.tbl_boexpensedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boexpensedetails.source.getPaging().page)
        {
            this.tbl_boexpensedetails.source.setPage((this.boexpense_service.boexpensedetails.length / this.tbl_boexpensedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boexpensedetails.source.grid.edit(this.tbl_boexpensedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boexpensedetails.source.data.indexOf(event.data);
    this.onDelete_boexpensedetail(event,event.data.expensedetailid,((this.tbl_boexpensedetails.source.getPaging().page-1) *this.tbl_boexpensedetails.source.getPaging().perPage)+index);
    this.tbl_boexpensedetails.source.refresh();
    break;
    }
    }
    
    */
    boexpensedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boexpensedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boexpensedetail(event, event.data.expensedetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_boexpensedetail(event, event.data.expensedetailid, ((this.tbl_boexpensedetails.source.getPaging().page - 1) * this.tbl_boexpensedetails.source.getPaging().perPage) + event.index);
                this.tbl_boexpensedetails.source.refresh();
                break;
        }
    }
    boexpensedetails_onDelete(obj) {
        let expensedetailid = obj.data.expensedetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boexpense_service.delete_boexpense(expensedetailid).then(res =>
                this.boexpensedetails_LoadTable()
            );
        }
    }
    async onCustom_boexpensedetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boexpensedetails");
        let formname = (objbomenuaction as any).actionname;




    }
    boexpensedetails_Paging(val) {
        debugger;
        this.tbl_boexpensedetails.source.setPaging(1, val, true);
    }

    handle_boexpensedetails_GridSelected(event: any) {
        this.boexpensedetails_selectedindex = this.tbl_boexpensedetails.source.findIndex(i => i.expensedetailid === event.data.expensedetailid);
    }
    Is_boexpensedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpensedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boexpensedetails

}



