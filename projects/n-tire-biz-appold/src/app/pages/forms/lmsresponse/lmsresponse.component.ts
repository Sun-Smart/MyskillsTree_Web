import { lmsresponseService } from './../../../service/lmsresponse.service';
import { lmsresponse } from './../../../model/lmsresponse.model';
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
import { lmssubresponse } from './../../../model/lmssubresponse.model';
import { lmssubresponseComponent } from './../../../pages/forms/lmssubresponse/lmssubresponse.component';
import { lmssubresponseService } from './../../../service/lmssubresponse.service';
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
    selector: 'app-lmsresponse',
    templateUrl: './lmsresponse.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmsresponseComponent implements OnInit {
    formData: lmsresponse;
    list: lmsresponse[];
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

    bfilterPopulate_lmsresponses: boolean = false;
    bfilterPopulate_lmssubresponses: boolean = false;
    lmsresponse_menuactions: any = []
    lmssubresponse_menuactions: any = []
    @ViewChild('tbl_lmssubresponses', { static: false }) tbl_lmssubresponses: Ng2SmartTableComponent;

    lmsresponse_Form: FormGroup;

    productgroupid_List: DropDownValues[];
    baseresponse_List: DropDownValues[];
    workflowrole_List: DropDownValues[];
    colorcode_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    lmssubresponses_visiblelist: any;
    lmssubresponses_hidelist: any;

    Deleted_lmssubresponse_IDs: string = "";
    lmssubresponses_ID: string = "1";
    lmssubresponses_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmsresponse_service: lmsresponseService,
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
        this.lmsresponse_Form = this.fb.group({
            pk: [null],
            responseid: [null],
            productgroupid: [null],
            productgroupiddesc: [null],
            baseresponse: [null],
            baseresponsedesc: [null],
            customresponse: [null],
            counter: [null],
            movetotrash: [null],
            workflowrole: [null],
            workflowroledesc: [null],
            colorcode: [null],
            colorcodedesc: [null],
            tathours: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmsresponse_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmsresponse_Form.dirty && this.lmsresponse_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.responseid && pkDetail) {
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
        let lmsresponseid = null;

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
        this.formid = lmsresponseid;
        //alert(lmsresponseid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmssubresponses_TableConfig();
            setTimeout(() => {
                //this.Set_lmssubresponses_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.lmsresponse_service.getDefaultData().then(res => {
            this.productgroupid_List = res.list_productgroupid.value;
            this.baseresponse_List = res.list_baseresponse.value;
            this.workflowrole_List = res.list_workflowrole.value;
            this.colorcode_List = res.list_colorcode.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmsresponse_service.get_lmsresponses_List().then(res => {
            this.pkList = res as lmsresponse[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmsresponse_Form.markAsUntouched();
        this.lmsresponse_Form.markAsPristine();
    }



    resetForm() {
        if (this.lmsresponse_Form != null)
            this.lmsresponse_Form.reset();
        this.lmsresponse_Form.patchValue({
        });
        setTimeout(() => {
            this.lmssubresponses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let responseid = this.lmsresponse_Form.get('responseid').value;
        if (responseid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsresponse_service.delete_lmsresponse(responseid).then(res => {
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
        this.lmsresponse_Form.patchValue({
            responseid: null
        });
        if (this.formData.responseid != null) this.formData.responseid = null;
        for (let i = 0; i < this.tbl_lmssubresponses.source.length; i++) {
            this.tbl_lmssubresponses.source[i].subresponseid = null;
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
                    else if (key == "tathours")
                        this.lmsresponse_Form.patchValue({ "tathours": new Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmsresponse_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsresponse_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsresponse_Form.controls[key] != undefined) {
                                this.lmsresponse_Form.controls[key].disable({ onlySelf: true });
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
    productgroupid_onChange(evt: any) {
        let e = evt.value;
        this.lmsresponse_Form.patchValue({ productgroupiddesc: evt.options[evt.options.selectedIndex].text });
    }
    baseresponse_onChange(evt: any) {
        let e = this.f.baseresponse.value as any;
        this.lmsresponse_Form.patchValue({ baseresponsedesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowrole_onChange(evt: any) {
        let e = evt.value;
        this.lmsresponse_Form.patchValue({ workflowroledesc: evt.options[evt.options.selectedIndex].text });
    }
    colorcode_onChange(evt: any) {
        let e = this.f.colorcode.value as any;
        this.lmsresponse_Form.patchValue({ colorcodedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_lmsresponses() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmsresponse_service.get_lmsresponses_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmsresponse;
            let formproperty = res.lmsresponse.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmsresponse.pkcol;
            this.formid = res.lmsresponse.responseid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmsresponse;
        this.formid = res.lmsresponse.responseid;
        this.pkcol = res.lmsresponse.pkcol;
        this.bmyrecord = false;
        if ((res.lmsresponse as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        var tathoursTime = new Time(res.lmsresponse.tathours);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsresponse_Form.patchValue({
            responseid: res.lmsresponse.responseid,
            productgroupid: res.lmsresponse.productgroupid,
            productgroupiddesc: res.lmsresponse.productgroupiddesc,
            baseresponse: res.lmsresponse.baseresponse,
            baseresponsedesc: res.lmsresponse.baseresponsedesc,
            customresponse: res.lmsresponse.customresponse,
            counter: res.lmsresponse.counter,
            movetotrash: res.lmsresponse.movetotrash,
            workflowrole: res.lmsresponse.workflowrole,
            workflowroledesc: res.lmsresponse.workflowroledesc,
            colorcode: res.lmsresponse.colorcode,
            colorcodedesc: res.lmsresponse.colorcodedesc,
            tathours: tathoursTime,
            status: res.lmsresponse.status,
            statusdesc: res.lmsresponse.statusdesc,
        });
        this.lmsresponse_menuactions = res.lmsresponse_menuactions;
        this.lmssubresponse_menuactions = res.lmssubresponse_menuactions;
        this.lmssubresponses_visiblelist = res.lmssubresponses_visiblelist;
        //Child Tables if any
        this.Set_lmssubresponses_TableConfig();
        this.lmssubresponses_LoadTable(res.lmssubresponses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmsresponse_Form.controls) {
            let val = this.lmsresponse_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmsresponse_Form.controls[key] != null) {
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
        if (!this.lmsresponse_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.lmsresponse_Form.getRawValue();
        obj.tathours = (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.hour) + ':' + (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.minute + ":00");
        console.log(obj);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
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
        // Object.keys(this.lmsresponse_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmsresponse_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmsresponse_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmsresponse_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmsresponse_Form.controls[key] != null) {
                        this.formData[key] = this.lmsresponse_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.tathours = (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.hour) + ':' + (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.minute + ":00");
        this.formData.Deleted_lmssubresponse_IDs = this.Deleted_lmssubresponse_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.lmsresponse_service.saveOrUpdate_lmsresponses(this.formData, this.tbl_lmssubresponses?.source?.data,).subscribe(
            async res => {
                if (this.tbl_lmssubresponses.source) {
                    for (let i = 0; i < this.tbl_lmssubresponses.source.data.length; i++) {
                        if (this.tbl_lmssubresponses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmssubresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmsresponse);
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
                        this.objvalues.push((res as any).lmsresponse);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsresponse_Form.markAsUntouched();
                this.lmsresponse_Form.markAsPristine();
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
        this.tbl_lmssubresponses.source = new LocalDataSource();
    }

    AddOrEdit_lmssubresponse(event: any, subresponseid: any, responseid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmssubresponseComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subresponseid, responseid, visiblelist: this.lmssubresponses_visiblelist, hidelist: this.lmssubresponses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmssubresponses.source.add(res[i]);
                    }
                    this.tbl_lmssubresponses.source.refresh();
                }
                else {
                    this.tbl_lmssubresponses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmssubresponse(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmssubresponse_IDs += childID + ",";
        this.tbl_lmssubresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmssubresponses
    lmssubresponses_settings: any;

    show_lmssubresponses_Checkbox() {
        debugger;
        if (this.tbl_lmssubresponses.source.settings['selectMode'] == 'multi') this.tbl_lmssubresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmssubresponses.source.settings['selectMode'] = 'multi';
        this.tbl_lmssubresponses.source.initGrid();
    }
    delete_lmssubresponses_All() {
        this.tbl_lmssubresponses.source.settings['selectMode'] = 'single';
    }
    show_lmssubresponses_Filter() {
        setTimeout(() => {
            //  this.Set_lmssubresponses_TableDropDownConfig();
        });
        if (this.tbl_lmssubresponses.source.settings != null) this.tbl_lmssubresponses.source.settings['hideSubHeader'] = !this.tbl_lmssubresponses.source.settings['hideSubHeader'];
        this.tbl_lmssubresponses.source.initGrid();
    }
    show_lmssubresponses_InActive() {
    }
    enable_lmssubresponses_InActive() {
    }
    async Set_lmssubresponses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmssubresponses) {
        }
        this.bfilterPopulate_lmssubresponses = true;
    }
    async lmssubresponses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmssubresponses_TableConfig() {
        this.lmssubresponses_settings = {
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
                custom: this.lmssubresponse_menuactions
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
                productgroupid: {
                    title: 'Product Group',
                    type: 'number',
                    filter: true,
                },
                baseresponse: {
                    title: 'Base Response',
                    type: '',
                    filter: true,
                },
                subresponse: {
                    title: 'Sub Response',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmssubresponses_LoadTable(lmssubresponses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssubresponses_ID) >= 0) {
            if (this.tbl_lmssubresponses != undefined) this.tbl_lmssubresponses.source = new LocalDataSource();
            if (this.tbl_lmssubresponses != undefined) this.tbl_lmssubresponses.source.load(lmssubresponses as any as LocalDataSource);
            if (this.tbl_lmssubresponses != undefined) this.tbl_lmssubresponses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmssubresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsresponse_service.lmssubresponses.length == 0)
    {
        this.tbl_lmssubresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmssubresponse();
        this.lmsresponse_service.lmssubresponses.push(obj);
        this.tbl_lmssubresponses.source.refresh();
        if ((this.lmsresponse_service.lmssubresponses.length / this.tbl_lmssubresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmssubresponses.source.getPaging().page)
        {
            this.tbl_lmssubresponses.source.setPage((this.lmsresponse_service.lmssubresponses.length / this.tbl_lmssubresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmssubresponses.source.grid.edit(this.tbl_lmssubresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmssubresponses.source.data.indexOf(event.data);
    this.onDelete_lmssubresponse(event,event.data.subresponseid,((this.tbl_lmssubresponses.source.getPaging().page-1) *this.tbl_lmssubresponses.source.getPaging().perPage)+index);
    this.tbl_lmssubresponses.source.refresh();
    break;
    }
    }
    
    */
    lmssubresponses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmssubresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmssubresponse(event, event.data.subresponseid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmssubresponse(event, event.data.subresponseid, ((this.tbl_lmssubresponses.source.getPaging().page - 1) * this.tbl_lmssubresponses.source.getPaging().perPage) + event.index);
                this.tbl_lmssubresponses.source.refresh();
                break;
        }
    }
    lmssubresponses_onDelete(obj) {
        let subresponseid = obj.data.subresponseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsresponse_service.delete_lmsresponse(subresponseid).then(res =>
                this.lmssubresponses_LoadTable()
            );
        }
    }
    async onCustom_lmssubresponses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmssubresponses");
        let formname = (objbomenuaction as any).actionname;




    }
    lmssubresponses_Paging(val) {
        debugger;
        this.tbl_lmssubresponses.source.setPaging(1, val, true);
    }

    handle_lmssubresponses_GridSelected(event: any) {
        this.lmssubresponses_selectedindex = this.tbl_lmssubresponses.source.findIndex(i => i.subresponseid === event.data.subresponseid);
    }
    Is_lmssubresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssubresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmssubresponses

}



