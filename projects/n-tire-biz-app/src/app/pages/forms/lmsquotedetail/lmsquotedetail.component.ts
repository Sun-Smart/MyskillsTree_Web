import { lmsquotedetailService } from './../../../service/lmsquotedetail.service';
import { lmsquotedetail } from './../../../model/lmsquotedetail.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
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

@Component({
    selector: 'app-lmsquotedetail',
    templateUrl: './lmsquotedetail.component.html',
    styles: [],
    providers: []
})

export class lmsquotedetailComponent implements OnInit {
    formData: lmsquotedetail;
    list: lmsquotedetail[];
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

    bfilterPopulate_lmsquotedetails: boolean = false;
    lmsquotedetail_menuactions: any = []

    lmsquotedetail_Form: FormGroup;

    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    productid_List: DropDownValues[];
    uom_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    constructor(private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmsquotedetail_service: lmsquotedetailService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.lmsquotedetail_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            leadid: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            quoteid: [null],
            quotedetailid: [null],
            productid: [null],
            productiddesc: [null],
            quantity: [null, Validators.compose([Validators.pattern('[0-9]+')])],
            uom: [null],
            uomdesc: [null],
            price: [null],
            totalprice: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmsquotedetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.lmsquotedetail_Form.dirty && this.lmsquotedetail_Form.touched) {
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
        if (pkDetail.quotedetailid && pkDetail) {
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
        let lmsquotedetailid = null;

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
        this.formid = lmsquotedetailid;
        //alert(lmsquotedetailid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.lmsquotedetail_service.getDefaultData().then(res => {
            this.opportunityid_List = res.list_opportunityid.value;
            this.productid_List = res.list_productid.value;
            this.uom_List = res.list_uom.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.lmsquotedetail_service.get_lmsquotedetails_List().then(res => {
            this.pkList = res as lmsquotedetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.lmsquotedetail_Form.markAsUntouched();
        this.lmsquotedetail_Form.markAsPristine();
    }
    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsquotedetail_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.lmsquotedetail_Form != null)
            this.lmsquotedetail_Form.reset();
        this.lmsquotedetail_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let quotedetailid = this.lmsquotedetail_Form.get('quotedetailid').value;
        if (quotedetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsquotedetail_service.delete_lmsquotedetail(quotedetailid).then(res => {
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
        this.lmsquotedetail_Form.patchValue({
            quotedetailid: null
        });
        if (this.formData.quotedetailid != null) this.formData.quotedetailid = null;
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
                        this.lmsquotedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsquotedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsquotedetail_Form.controls[key] != undefined) {
                                this.lmsquotedetail_Form.controls[key].disable({ onlySelf: true });
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
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    productid_onChange(evt: any) {
        let e = evt.value;
        this.lmsquotedetail_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    uom_onChange(evt: any) {
        let e = this.f.uom.value as any;
        this.lmsquotedetail_Form.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_lmsquotedetails() {
        this.showview = false;
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmsquotedetail_service.get_lmsquotedetails_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmsquotedetail;
            let formproperty = res.lmsquotedetail.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmsquotedetail.pkcol;
            this.formid = res.lmsquotedetail.quotedetailid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.lmsquotedetail;
        this.formid = res.lmsquotedetail.quotedetailid;
        this.pkcol = res.lmsquotedetail.pkcol;
        this.bmyrecord = false;
        if ((res.lmsquotedetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.lmsquotedetail_Form.patchValue({
            branchid: res.lmsquotedetail.branchid,
            leadid: res.lmsquotedetail.leadid,
            opportunityid: res.lmsquotedetail.opportunityid,
            opportunityiddesc: res.lmsquotedetail.opportunityiddesc,
            quoteid: res.lmsquotedetail.quoteid,
            quotedetailid: res.lmsquotedetail.quotedetailid,
            productid: res.lmsquotedetail.productid,
            productiddesc: res.lmsquotedetail.productiddesc,
            quantity: res.lmsquotedetail.quantity,
            uom: res.lmsquotedetail.uom,
            uomdesc: res.lmsquotedetail.uomdesc,
            price: res.lmsquotedetail.price,
            totalprice: res.lmsquotedetail.totalprice,
            status: res.lmsquotedetail.status,
            statusdesc: res.lmsquotedetail.statusdesc,
        });
        this.lmsquotedetail_menuactions = res.lmsquotedetail_menuactions;
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmsquotedetail_Form.controls) {
            let val = this.lmsquotedetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmsquotedetail_Form.controls[key] != null) {
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
        if (!this.lmsquotedetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.lmsquotedetail_Form.getRawValue();
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

        if (!this.lmsquotedetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmsquotedetail_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmsquotedetail_Form.controls[key] != null) {
                        this.formData[key] = this.lmsquotedetail_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.lmsquotedetail_service.saveOrUpdate_lmsquotedetails(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmsquotedetail);
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
                        this.objvalues.push((res as any).lmsquotedetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsquotedetail_Form.markAsUntouched();
                this.lmsquotedetail_Form.markAsPristine();
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



