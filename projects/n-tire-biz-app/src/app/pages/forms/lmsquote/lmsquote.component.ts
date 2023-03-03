import { lmsquoteService } from './../../../service/lmsquote.service';
import { lmsquote } from './../../../model/lmsquote.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { lmsquotedetailComponent } from './../../../pages/forms/lmsquotedetail/lmsquotedetail.component';
import { lmsquotedetailService } from './../../../service/lmsquotedetail.service';
import { lmsquotepaymenttermComponent } from './../../../pages/forms/lmsquotepaymentterm/lmsquotepaymentterm.component';
import { lmsquotepaymenttermService } from './../../../service/lmsquotepaymentterm.service';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-lmsquote',
    templateUrl: './lmsquote.component.html',
    styles: [],
    providers: []
})

export class lmsquoteComponent implements OnInit {
    formData: lmsquote;
    list: lmsquote[];
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

    bfilterPopulate_lmsquotes: boolean = false;
    bfilterPopulate_lmsquotedetails: boolean = false;
    bfilterPopulate_lmsquotepaymentterms: boolean = false;
    lmsquote_menuactions: any = []
    lmsquotedetail_menuactions: any = []
    @ViewChild('tbl_lmsquotedetails', { static: false }) tbl_lmsquotedetails: Ng2SmartTableComponent;
    lmsquotepaymentterm_menuactions: any = []
    @ViewChild('tbl_lmsquotepaymentterms', { static: false }) tbl_lmsquotepaymentterms: Ng2SmartTableComponent;

    lmsquote_Form: FormGroup;

    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    currency_List: DropDownValues[];
    taxid_List: DropDownValues[];
    taxid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    paymenttermid_List: DropDownValues[];
    termid_List: DropDownValues[];
    leadsource_List: DropDownValues[];
    quotestatus_List: DropDownValues[];

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

    lmsquotedetails_visiblelist: any;
    lmsquotedetails_hidelist: any;
    lmsquotepaymentterms_visiblelist: any;
    lmsquotepaymentterms_hidelist: any;

    Deleted_lmsquotedetail_IDs: string = "";
    lmsquotedetails_ID: string = "1";
    lmsquotedetails_selectedindex: any;
    Deleted_lmsquotepaymentterm_IDs: string = "";
    lmsquotepaymentterms_ID: string = "2";
    lmsquotepaymentterms_selectedindex: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmsquote_service: lmsquoteService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.lmsquote_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            leadid: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            quoteid: [null],
            reference: [null],
            quotedate: [null],
            details: [null, Validators.compose([Validators.required])],
            assignedto: [null, Validators.compose([Validators.required])],
            quoteamount: [null],
            currency: [null],
            currencydesc: [null],
            expirationdate: [null],
            taxid: [null],
            taxiddesc: [null],
            shippingruleid: [null],
            totalamount: [null],
            taxamount: [null],
            charges: [null],
            paymenttermid: [null],
            paymenttermiddesc: [null],
            termid: [null],
            termiddesc: [null],
            terms: [null],
            comments: [null],
            campaignid: [null, Validators.compose([Validators.required])],
            leadsource: [null],
            leadsourcedesc: [null],
            supplierquotationid: [null],
            customfield: [null],
            attachment: [null],
            quotestatus: [null],
            quotestatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmsquote_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.lmsquote_Form.dirty && this.lmsquote_Form.touched) {
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
        if (pkDetail.quoteid && pkDetail) {
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
        let lmsquoteid = null;

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
        this.formid = lmsquoteid;
        //alert(lmsquoteid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmsquotedetails_TableConfig();

            this.Set_lmsquotepaymentterms_TableConfig();

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.lmsquote_service.getDefaultData().then(res => {
            this.opportunityid_List = res.list_opportunityid.value;
            this.currency_List = res.list_currency.value;
            this.taxid_List = res.list_taxid.value;
            this.paymenttermid_List = res.list_paymenttermid.value;
            this.termid_List = res.list_termid.value;
            this.leadsource_List = res.list_leadsource.value;
            this.quotestatus_List = res.list_quotestatus.value;
        }).catch((err) => { this.spinner.hide();  });

        //autocomplete
        this.lmsquote_service.get_lmsquotes_List().then(res => {
            this.pkList = res as lmsquote[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.lmsquote_Form.markAsUntouched();
        this.lmsquote_Form.markAsPristine();
    }
    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsquote_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }

    onSelected_taxid(taxidDetail: any) {
        if (taxidDetail.value && taxidDetail) {
            this.lmsquote_Form.patchValue({
                taxid: taxidDetail.value,
                taxiddesc: taxidDetail.label,
            });
        }
    }


    resetForm() {
        if (this.lmsquote_Form != null)
            this.lmsquote_Form.reset();
        this.lmsquote_Form.patchValue({
        });
        this.lmsquote_Form.patchValue({
            quotedate: this.ngbDateParserFormatter.parse(new Date().toString()),
            expirationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmsquotedetails_LoadTable();
            this.lmsquotepaymentterms_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let quoteid = this.lmsquote_Form.get('quoteid').value;
        if (quoteid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsquote_service.delete_lmsquote(quoteid).then(res => {
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
        this.lmsquote_Form.patchValue({
            quoteid: null
        });
        if (this.formData.quoteid != null) this.formData.quoteid = null;
        for (let i = 0; i < this.tbl_lmsquotedetails.source.length; i++) {
            this.tbl_lmsquotedetails.source[i].quotedetailid = null;
        }
        for (let i = 0; i < this.tbl_lmsquotepaymentterms.source.length; i++) {
            this.tbl_lmsquotepaymentterms.source[i].paymenttermid = null;
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
                    else if (key == "quotedate")
                        this.lmsquote_Form.patchValue({ "quotedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "assignedto")
                        this.lmsquote_Form.patchValue({ "assignedto": mainscreendata[key] });
                    else if (key == "expirationdate")
                        this.lmsquote_Form.patchValue({ "expirationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmsquote_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsquote_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsquote_Form.controls[key] != undefined) {
                                this.lmsquote_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsquotes", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.details != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.details != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    currency_onChange(evt: any) {
        let e = this.f.currency.value as any;
        this.lmsquote_Form.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }
    taxid_onChange(evt: any) {
        let e = evt.value;
    }
    paymenttermid_onChange(evt: any) {
        let e = evt.value;
        this.lmsquote_Form.patchValue({ paymenttermiddesc: evt.options[evt.options.selectedIndex].text });
    }
    termid_onChange(evt: any) {
        let e = evt.value;
        this.lmsquote_Form.patchValue({ termiddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt: any) {
        let e = this.f.leadsource.value as any;
        this.lmsquote_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    quotestatus_onChange(evt: any) {
        let e = this.f.quotestatus.value as any;
        this.lmsquote_Form.patchValue({ quotestatusdesc: evt.options[evt.options.selectedIndex].text });
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

    edit_lmsquotes() {
        this.showview = false;
        return false;
    }


    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmsquote_service.get_lmsquotes_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.lmsquote;
            let formproperty = res.lmsquote.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmsquote.pkcol;
            this.formid = res.lmsquote.quoteid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.lmsquote;
        this.formid = res.lmsquote.quoteid;
        this.pkcol = res.lmsquote.pkcol;
        this.bmyrecord = false;
        if ((res.lmsquote as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.lmsquote_Form.patchValue({
            branchid: res.lmsquote.branchid,
            leadid: res.lmsquote.leadid,
            opportunityid: res.lmsquote.opportunityid,
            opportunityiddesc: res.lmsquote.opportunityiddesc,
            quoteid: res.lmsquote.quoteid,
            reference: res.lmsquote.reference,
            quotedate: this.ngbDateParserFormatter.parse(res.lmsquote.quotedate),
            details: res.lmsquote.details,
            assignedto: JSON.parse(res.lmsquote.assignedto),
            quoteamount: res.lmsquote.quoteamount,
            currency: res.lmsquote.currency,
            currencydesc: res.lmsquote.currencydesc,
            expirationdate: this.ngbDateParserFormatter.parse(res.lmsquote.expirationdate),
            taxid: res.lmsquote.taxid,
            taxiddesc: res.lmsquote.taxiddesc,
            shippingruleid: res.lmsquote.shippingruleid,
            totalamount: res.lmsquote.totalamount,
            taxamount: res.lmsquote.taxamount,
            charges: res.lmsquote.charges,
            paymenttermid: res.lmsquote.paymenttermid,
            paymenttermiddesc: res.lmsquote.paymenttermiddesc,
            termid: res.lmsquote.termid,
            termiddesc: res.lmsquote.termiddesc,
            terms: res.lmsquote.terms,
            comments: res.lmsquote.comments,
            campaignid: res.lmsquote.campaignid,
            leadsource: res.lmsquote.leadsource,
            leadsourcedesc: res.lmsquote.leadsourcedesc,
            supplierquotationid: res.lmsquote.supplierquotationid,
            customfield: res.lmsquote.customfield,
            attachment: JSON.parse(res.lmsquote.attachment),
            quotestatus: res.lmsquote.quotestatus,
            quotestatusdesc: res.lmsquote.quotestatusdesc,
            status: res.lmsquote.status,
            statusdesc: res.lmsquote.statusdesc,
        });
        this.lmsquote_menuactions = res.lmsquote_menuactions;
        this.lmsquotedetail_menuactions = res.lmsquotedetail_menuactions;
        this.lmsquotedetails_visiblelist = res.lmsquotedetails_visiblelist;
        this.lmsquotepaymentterm_menuactions = res.lmsquotepaymentterm_menuactions;
        this.lmsquotepaymentterms_visiblelist = res.lmsquotepaymentterms_visiblelist;
        if (this.lmsquote_Form.get('customfield').value != null && this.lmsquote_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmsquote_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmsquote_Form.get('attachment').value != null && this.lmsquote_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmsquote_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmsquotedetails_TableConfig();
        this.lmsquotedetails_LoadTable(res.lmsquotedetails);
        this.Set_lmsquotepaymentterms_TableConfig();
        this.lmsquotepaymentterms_LoadTable(res.lmsquotepaymentterms);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmsquote_Form.controls) {
            let val = this.lmsquote_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmsquote_Form.controls[key] != null) {
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
        if (!this.lmsquote_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.lmsquote_Form.getRawValue();
        obj.quotedate = new Date(this.lmsquote_Form.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('quotedate').value) + '  UTC' : null);
        if (this.lmsquote_Form.get('assignedto').value != null) obj.assignedto = JSON.stringify(this.lmsquote_Form.get('assignedto').value);
        obj.expirationdate = new Date(this.lmsquote_Form.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('expirationdate').value) + '  UTC' : null);
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
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
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmsquote_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmsquote_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmsquote_Form.controls[key] != null) {
                        this.formData[key] = this.lmsquote_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.quotedate = new Date(this.lmsquote_Form.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('quotedate').value) + '  UTC' : null);
        if (this.lmsquote_Form.get('assignedto').value != null) this.formData.assignedto = JSON.stringify(this.lmsquote_Form.get('assignedto').value);
        this.formData.expirationdate = new Date(this.lmsquote_Form.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('expirationdate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_lmsquotedetail_IDs = this.Deleted_lmsquotedetail_IDs;
        this.formData.Deleted_lmsquotepaymentterm_IDs = this.Deleted_lmsquotepaymentterm_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        this.spinner.show();
        this.lmsquote_service.saveOrUpdate_lmsquotes(this.formData, this.tbl_lmsquotedetails?.source?.data, this.tbl_lmsquotepaymentterms?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_lmsquotedetails.source) {
                    for (let i = 0; i < this.tbl_lmsquotedetails.source.data.length; i++) {
                        if (this.tbl_lmsquotedetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsquotedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsquotepaymentterms.source) {
                    for (let i = 0; i < this.tbl_lmsquotepaymentterms.source.data.length; i++) {
                        if (this.tbl_lmsquotepaymentterms.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsquotepaymentterms.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmsquote);
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
                        this.objvalues.push((res as any).lmsquote);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsquote_Form.markAsUntouched();
                this.lmsquote_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_lmsquotedetails.source = new LocalDataSource();
        this.tbl_lmsquotepaymentterms.source = new LocalDataSource();
    }

    AddOrEdit_lmsquotedetail(event: any, quotedetailid: any, quoteid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsquotedetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, quotedetailid, quoteid, visiblelist: this.lmsquotedetails_visiblelist, hidelist: this.lmsquotedetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsquotedetails.source.add(res[i]);
                    }
                    this.tbl_lmsquotedetails.source.refresh();
                }
                else {
                    this.tbl_lmsquotedetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmsquotedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsquotedetail_IDs += childID + ",";
        this.tbl_lmsquotedetails.source.splice(i, 1);
    }

    AddOrEdit_lmsquotepaymentterm(event: any, paymenttermid: any, quoteid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsquotepaymenttermComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, paymenttermid, quoteid, visiblelist: this.lmsquotepaymentterms_visiblelist, hidelist: this.lmsquotepaymentterms_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsquotepaymentterms.source.add(res[i]);
                    }
                    this.tbl_lmsquotepaymentterms.source.refresh();
                }
                else {
                    this.tbl_lmsquotepaymentterms.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmsquotepaymentterm(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsquotepaymentterm_IDs += childID + ",";
        this.tbl_lmsquotepaymentterms.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmsquotedetails
    lmsquotedetails_settings: any;

    show_lmsquotedetails_Checkbox() {
        if (this.tbl_lmsquotedetails.source.settings['selectMode'] == 'multi') this.tbl_lmsquotedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsquotedetails.source.settings['selectMode'] = 'multi';
        this.tbl_lmsquotedetails.source.initGrid();
    }
    delete_lmsquotedetails_All() {
        this.tbl_lmsquotedetails.source.settings['selectMode'] = 'single';
    }
    show_lmsquotedetails_Filter() {
        if (this.tbl_lmsquotedetails.source.settings != null) this.tbl_lmsquotedetails.source.settings['hideSubHeader'] = !this.tbl_lmsquotedetails.source.settings['hideSubHeader'];
        this.tbl_lmsquotedetails.source.initGrid();
    }
    async Set_lmsquotedetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsquotedetails) {

            var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_opportunityid.value)), }, };
            this.tbl_lmsquotedetails.source.settings = clone;
            this.tbl_lmsquotedetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
            if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_productid.value)), }, };
            if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_productid.value)), }, };
            this.tbl_lmsquotedetails.source.settings = clone;
            this.tbl_lmsquotedetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
            if (clone.columns['uom'] != undefined) clone.columns['uom'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_uom.value)), }, };
            if (clone.columns['uom'] != undefined) clone.columns['uom'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_uom.value)), }, };
            this.tbl_lmsquotedetails.source.settings = clone;
            this.tbl_lmsquotedetails.source.initGrid();
        }
        this.bfilterPopulate_lmsquotedetails = true;
    }
    async lmsquotedetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_lmsquotedetails_TableConfig() {
        this.lmsquotedetails_settings = {
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
                custom: this.lmsquotedetail_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                opportunityiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                productiddesc: {
                    title: 'Product',
                    type: 'html',
                    filter: true,
                },
                quantity: {
                    title: 'Quantity',
                    type: 'number',
                    filter: true,
                },
                uomdesc: {
                    title: 'U O M',
                    type: 'html',
                    filter: true,
                },
                price: {
                    title: 'Price',
                    type: 'number',
                    filter: true,
                },
                totalprice: {
                    title: 'Total Price',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsquotedetails_LoadTable(lmsquotedetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotedetails_ID) >= 0) {
            if (this.tbl_lmsquotedetails != undefined) this.tbl_lmsquotedetails.source = new LocalDataSource();
            if (this.tbl_lmsquotedetails != undefined) this.tbl_lmsquotedetails.source.load(lmsquotedetails as any as LocalDataSource);
            if (this.tbl_lmsquotedetails != undefined) this.tbl_lmsquotedetails.source.setPaging(1, 20, true);
        }
    }


    lmsquotedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmsquotedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsquotedetail(event, event.data.quotedetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsquotedetail(event, event.data.quotedetailid, ((this.tbl_lmsquotedetails.source.getPaging().page - 1) * this.tbl_lmsquotedetails.source.getPaging().perPage) + event.index);
                this.tbl_lmsquotedetails.source.refresh();
                break;
        }
    }
    lmsquotedetails_onDelete(obj) {
        let quotedetailid = obj.data.quotedetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquote_service.delete_lmsquote(quotedetailid).then(res =>
                this.lmsquotedetails_LoadTable()
            );
        }
    }
    async onCustom_lmsquotedetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsquotedetails");
        let formname = (objbomenuaction as any).actionname;
    }
    lmsquotedetails_Paging(val) {
        this.tbl_lmsquotedetails.source.setPaging(1, val, true);
    }

    handle_lmsquotedetails_GridSelected(event: any) {
        this.lmsquotedetails_selectedindex = this.tbl_lmsquotedetails.source.findIndex(i => i.quotedetailid === event.data.quotedetailid);
    }
    Is_lmsquotedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsquotedetails
    //start of Grid Codes lmsquotepaymentterms
    lmsquotepaymentterms_settings: any;

    show_lmsquotepaymentterms_Checkbox() {
        if (this.tbl_lmsquotepaymentterms.source.settings['selectMode'] == 'multi') this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'multi';
        this.tbl_lmsquotepaymentterms.source.initGrid();
    }
    delete_lmsquotepaymentterms_All() {
        this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'single';
    }
    show_lmsquotepaymentterms_Filter() {
        if (this.tbl_lmsquotepaymentterms.source.settings != null) this.tbl_lmsquotepaymentterms.source.settings['hideSubHeader'] = !this.tbl_lmsquotepaymentterms.source.settings['hideSubHeader'];
        this.tbl_lmsquotepaymentterms.source.initGrid();
    }
    async Set_lmsquotepaymentterms_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsquotepaymentterms) {

            var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_opportunityid.value)), }, };
            this.tbl_lmsquotepaymentterms.source.settings = clone;
            this.tbl_lmsquotepaymentterms.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
            if (clone.columns['quoteid'] != undefined) clone.columns['quoteid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_quoteid.value)), }, };
            if (clone.columns['quoteid'] != undefined) clone.columns['quoteid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_quoteid.value)), }, };
            this.tbl_lmsquotepaymentterms.source.settings = clone;
            this.tbl_lmsquotepaymentterms.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
            if (clone.columns['duedate'] != undefined) clone.columns['duedate'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_duedate.value)), }, };
            if (clone.columns['duedate'] != undefined) clone.columns['duedate'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_duedate.value)), }, };
            this.tbl_lmsquotepaymentterms.source.settings = clone;
            this.tbl_lmsquotepaymentterms.source.initGrid();
        }
        this.bfilterPopulate_lmsquotepaymentterms = true;
    }
    async lmsquotepaymentterms_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_lmsquotepaymentterms_TableConfig() {
        this.lmsquotepaymentterms_settings = {
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
                custom: this.lmsquotepaymentterm_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                opportunityiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                duedatedesc: {
                    title: 'Due Date',
                    type: 'html',
                    filter: true,
                },
                invoicepercentage: {
                    title: 'Invoice Percentage',
                    type: 'number',
                    filter: true,
                },
                paymentamount: {
                    title: 'Payment Amount',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsquotepaymentterms_LoadTable(lmsquotepaymentterms = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotepaymentterms_ID) >= 0) {
            if (this.tbl_lmsquotepaymentterms != undefined) this.tbl_lmsquotepaymentterms.source = new LocalDataSource();
            if (this.tbl_lmsquotepaymentterms != undefined) this.tbl_lmsquotepaymentterms.source.load(lmsquotepaymentterms as any as LocalDataSource);
            if (this.tbl_lmsquotepaymentterms != undefined) this.tbl_lmsquotepaymentterms.source.setPaging(1, 20, true);
        }
    }

    lmsquotepaymentterms_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmsquotepaymentterm(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsquotepaymentterm(event, event.data.paymenttermid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsquotepaymentterm(event, event.data.paymenttermid, ((this.tbl_lmsquotepaymentterms.source.getPaging().page - 1) * this.tbl_lmsquotepaymentterms.source.getPaging().perPage) + event.index);
                this.tbl_lmsquotepaymentterms.source.refresh();
                break;
        }
    }
    lmsquotepaymentterms_onDelete(obj) {
        let paymenttermid = obj.data.paymenttermid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquote_service.delete_lmsquote(paymenttermid).then(res =>
                this.lmsquotepaymentterms_LoadTable()
            );
        }
    }
    async onCustom_lmsquotepaymentterms_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsquotepaymentterms");
        let formname = (objbomenuaction as any).actionname;
    }
    lmsquotepaymentterms_Paging(val) {
        this.tbl_lmsquotepaymentterms.source.setPaging(1, val, true);
    }

    handle_lmsquotepaymentterms_GridSelected(event: any) {
        this.lmsquotepaymentterms_selectedindex = this.tbl_lmsquotepaymentterms.source.findIndex(i => i.paymenttermid === event.data.paymenttermid);
    }
    Is_lmsquotepaymentterms_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotepaymentterms_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsquotepaymentterms

}



