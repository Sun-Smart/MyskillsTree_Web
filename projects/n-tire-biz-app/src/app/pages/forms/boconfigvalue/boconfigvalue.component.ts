import { boconfigvalueService } from './../../../service/boconfigvalue.service';
import { boconfigvalue } from './../../../model/boconfigvalue.model';
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
import { bosubconfigvalue } from './../../../model/bosubconfigvalue.model';
import { bosubconfigvalueComponent } from './../../../pages/forms/bosubconfigvalue/bosubconfigvalue.component';
import { bosubconfigvalueService } from './../../../service/bosubconfigvalue.service';
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
    selector: 'app-boconfigvalue',
    templateUrl: './boconfigvalue.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boconfigvalueComponent implements OnInit {
    formData: boconfigvalue;
    list: boconfigvalue[];
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

    bfilterPopulate_boconfigvalues: boolean = false;
    bfilterPopulate_bosubconfigvalues: boolean = false;
    boconfigvalue_menuactions: any = []
    bosubconfigvalue_menuactions: any = []
    @ViewChild('tbl_bosubconfigvalues', { static: false }) tbl_bosubconfigvalues: Ng2SmartTableComponent;

    boconfigvalue_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bosubconfigvalues_visiblelist: any;
    bosubconfigvalues_hidelist: any;

    Deleted_bosubconfigvalue_IDs: string = "";
    bosubconfigvalues_ID: string = "1";
    bosubconfigvalues_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boconfigvalue_service: boconfigvalueService,
        private bosubconfigvalue_service: bosubconfigvalueService,
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
        this.boconfigvalue_Form = this.fb.group({
            pk: [null],
            configid: [null],
            param: [null],
            configkey: [null],
            configtext: [null],
            orderno: [null],
            htmlcode: [null],
            param1: [null],
            param2: [null],
            helptext: [null],
            flag: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boconfigvalue_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boconfigvalue_Form.dirty && this.boconfigvalue_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.configid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.configid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.configid && pkDetail) {
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
        let boconfigvalueid = null;

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
        this.formid = boconfigvalueid;
        //alert(boconfigvalueid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bosubconfigvalues_TableConfig();
            setTimeout(() => {
                //this.Set_bosubconfigvalues_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boconfigvalue_service.getDefaultData().then(res => {
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boconfigvalue_service.get_boconfigvalues_List().then(res => {
            this.pkList = res as boconfigvalue[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boconfigvalue_Form.markAsUntouched();
        this.boconfigvalue_Form.markAsPristine();
    }



    resetForm() {
        if (this.boconfigvalue_Form != null)
            this.boconfigvalue_Form.reset();
        this.boconfigvalue_Form.patchValue({
        });
        setTimeout(() => {
            this.bosubconfigvalues_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let configid = this.boconfigvalue_Form.get('configid').value;
        if (configid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boconfigvalue_service.delete_boconfigvalue(configid).then(res => {
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
        this.boconfigvalue_Form.patchValue({
            configid: null
        });
        if (this.formData.configid != null) this.formData.configid = null;
        for (let i = 0; i < this.tbl_bosubconfigvalues.source.length; i++) {
            this.tbl_bosubconfigvalues.source[i].subcategoryid = null;
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
                    else if (ctrltype == "string") {
                        this.boconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boconfigvalue_Form.controls[key] != undefined) {
                                this.boconfigvalue_Form.controls[key].disable({ onlySelf: true });
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

    edit_boconfigvalues() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boconfigvalue_service.get_boconfigvalues_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boconfigvalue;
            let formproperty = res.boconfigvalue.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boconfigvalue.pkcol;
            this.formid = res.boconfigvalue.configid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boconfigvalue;
        this.formid = res.boconfigvalue.configid;
        this.pkcol = res.boconfigvalue.pkcol;
        this.bmyrecord = false;
        if ((res.boconfigvalue as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boconfigvalue_Form.patchValue({
            configid: res.boconfigvalue.configid,
            param: res.boconfigvalue.param,
            configkey: res.boconfigvalue.configkey,
            configtext: res.boconfigvalue.configtext,
            orderno: res.boconfigvalue.orderno,
            htmlcode: res.boconfigvalue.htmlcode,
            param1: res.boconfigvalue.param1,
            param2: res.boconfigvalue.param2,
            helptext: res.boconfigvalue.helptext,
            flag: res.boconfigvalue.flag,
            status: res.boconfigvalue.status,
            statusdesc: res.boconfigvalue.statusdesc,
        });
        this.boconfigvalue_menuactions = res.boconfigvalue_menuactions;
        this.bosubconfigvalue_menuactions = res.bosubconfigvalue_menuactions;
        this.bosubconfigvalues_visiblelist = res.bosubconfigvalues_visiblelist;
        //Child Tables if any
        this.Set_bosubconfigvalues_TableConfig();
        this.bosubconfigvalues_LoadTable(res.bosubconfigvalues);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boconfigvalue_Form.controls) {
            let val = this.boconfigvalue_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boconfigvalue_Form.controls[key] != null) {
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
        if (!this.boconfigvalue_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boconfigvalue_Form.getRawValue();
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
        // Object.keys(this.boconfigvalue_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boconfigvalue_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boconfigvalue_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boconfigvalue_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boconfigvalue_Form.controls[key] != null) {
                        this.formData[key] = this.boconfigvalue_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bosubconfigvalue_IDs = this.Deleted_bosubconfigvalue_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.boconfigvalue_service.saveOrUpdate_boconfigvalues(this.formData, this.tbl_bosubconfigvalues?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bosubconfigvalues.source) {
                    for (let i = 0; i < this.tbl_bosubconfigvalues.source.data.length; i++) {
                        if (this.tbl_bosubconfigvalues.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bosubconfigvalues.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boconfigvalue);
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
                        this.objvalues.push((res as any).boconfigvalue);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boconfigvalue_Form.markAsUntouched();
                this.boconfigvalue_Form.markAsPristine();
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
        this.tbl_bosubconfigvalues.source = new LocalDataSource();
    }

    AddOrEdit_bosubconfigvalue(event: any, subcategoryid: any, configid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bosubconfigvalueComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, configid, visiblelist: this.bosubconfigvalues_visiblelist, hidelist: this.bosubconfigvalues_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bosubconfigvalues.source.add(res[i]);
                    }
                    this.tbl_bosubconfigvalues.source.refresh();
                }
                else {
                    this.tbl_bosubconfigvalues.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bosubconfigvalue(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bosubconfigvalue_IDs += childID + ",";
        this.tbl_bosubconfigvalues.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bosubconfigvalues
    bosubconfigvalues_settings: any;

    show_bosubconfigvalues_Checkbox() {
        debugger;
        if (this.tbl_bosubconfigvalues.source.settings['selectMode'] == 'multi') this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'single';
        else
            this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'multi';
        this.tbl_bosubconfigvalues.source.initGrid();
    }
    delete_bosubconfigvalues_All() {
        this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'single';
    }
    show_bosubconfigvalues_Filter() {
        setTimeout(() => {
            //  this.Set_bosubconfigvalues_TableDropDownConfig();
        });
        if (this.tbl_bosubconfigvalues.source.settings != null) this.tbl_bosubconfigvalues.source.settings['hideSubHeader'] = !this.tbl_bosubconfigvalues.source.settings['hideSubHeader'];
        this.tbl_bosubconfigvalues.source.initGrid();
    }
    show_bosubconfigvalues_InActive() {
    }
    enable_bosubconfigvalues_InActive() {
    }
    async Set_bosubconfigvalues_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bosubconfigvalues) {

            var clone = this.sharedService.clone(this.tbl_bosubconfigvalues.source.settings);
            if (clone.columns['configkey'] != undefined) clone.columns['configkey'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_configkey.value)), }, };
            if (clone.columns['configkey'] != undefined) clone.columns['configkey'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_configkey.value)), }, };
            this.tbl_bosubconfigvalues.source.settings = clone;
            this.tbl_bosubconfigvalues.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bosubconfigvalues.source.settings);
            if (clone.columns['subconfigcode'] != undefined) clone.columns['subconfigcode'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_subconfigcode.value)), }, };
            if (clone.columns['subconfigcode'] != undefined) clone.columns['subconfigcode'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_subconfigcode.value)), }, };
            this.tbl_bosubconfigvalues.source.settings = clone;
            this.tbl_bosubconfigvalues.source.initGrid();
        }
        this.bfilterPopulate_bosubconfigvalues = true;
    }
    async bosubconfigvalues_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bosubconfigvalues_TableConfig() {
        this.bosubconfigvalues_settings = {
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
                custom: this.bosubconfigvalue_menuactions
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
                subconfigcodedesc: {
                    title: 'Sub Config Code',
                    type: 'html',
                    filter: true,
                },
                subcategoryname: {
                    title: 'Sub Category Name',
                    type: '',
                    filter: true,
                },
                orderno: {
                    title: 'Order No',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    bosubconfigvalues_LoadTable(bosubconfigvalues = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubconfigvalues_ID) >= 0) {
            if (this.tbl_bosubconfigvalues != undefined) this.tbl_bosubconfigvalues.source = new LocalDataSource();
            if (this.tbl_bosubconfigvalues != undefined) this.tbl_bosubconfigvalues.source.load(bosubconfigvalues as any as LocalDataSource);
            if (this.tbl_bosubconfigvalues != undefined) this.tbl_bosubconfigvalues.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bosubconfigvalues_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boconfigvalue_service.bosubconfigvalues.length == 0)
    {
        this.tbl_bosubconfigvalues.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bosubconfigvalue();
        this.boconfigvalue_service.bosubconfigvalues.push(obj);
        this.tbl_bosubconfigvalues.source.refresh();
        if ((this.boconfigvalue_service.bosubconfigvalues.length / this.tbl_bosubconfigvalues.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bosubconfigvalues.source.getPaging().page)
        {
            this.tbl_bosubconfigvalues.source.setPage((this.boconfigvalue_service.bosubconfigvalues.length / this.tbl_bosubconfigvalues.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bosubconfigvalues.source.grid.edit(this.tbl_bosubconfigvalues.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bosubconfigvalues.source.data.indexOf(event.data);
    this.onDelete_bosubconfigvalue(event,event.data.subcategoryid,((this.tbl_bosubconfigvalues.source.getPaging().page-1) *this.tbl_bosubconfigvalues.source.getPaging().perPage)+index);
    this.tbl_bosubconfigvalues.source.refresh();
    break;
    }
    }
    
    */
    bosubconfigvalues_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bosubconfigvalue(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bosubconfigvalue(event, event.data.subcategoryid, this.formid);
                break;
            case 'delete':
                this.onDelete_bosubconfigvalue(event, event.data.subcategoryid, ((this.tbl_bosubconfigvalues.source.getPaging().page - 1) * this.tbl_bosubconfigvalues.source.getPaging().perPage) + event.index);
                this.tbl_bosubconfigvalues.source.refresh();
                break;
        }
    }
    bosubconfigvalues_onDelete(obj) {
        let subcategoryid = obj.data.subcategoryid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boconfigvalue_service.delete_boconfigvalue(subcategoryid).then(res =>
                this.bosubconfigvalues_LoadTable()
            );
        }
    }
    async onCustom_bosubconfigvalues_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bosubconfigvalues");
        let formname = (objbomenuaction as any).actionname;




    }
    bosubconfigvalues_Paging(val) {
        debugger;
        this.tbl_bosubconfigvalues.source.setPaging(1, val, true);
    }

    handle_bosubconfigvalues_GridSelected(event: any) {
        this.bosubconfigvalues_selectedindex = this.tbl_bosubconfigvalues.source.findIndex(i => i.subcategoryid === event.data.subcategoryid);
    }
    Is_bosubconfigvalues_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubconfigvalues_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bosubconfigvalues

}



