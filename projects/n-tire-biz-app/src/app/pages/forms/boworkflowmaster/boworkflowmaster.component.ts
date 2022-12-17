import { boworkflowmasterService } from './../../../service/boworkflowmaster.service';
import { boworkflowmaster } from './../../../model/boworkflowmaster.model';
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
import { boworkflow } from './../../../model/boworkflow.model';
import { boworkflowComponent } from './../../../pages/forms/boworkflow/boworkflow.component';
import { boworkflowService } from './../../../service/boworkflow.service';
import { boworkflowstep } from './../../../model/boworkflowstep.model';
import { boworkflowstepComponent } from './../../../pages/forms/boworkflowstep/boworkflowstep.component';
import { boworkflowstepService } from './../../../service/boworkflowstep.service';
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
    selector: 'app-boworkflowmaster',
    templateUrl: './boworkflowmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowmasterComponent implements OnInit {
    formData: boworkflowmaster;
    list: boworkflowmaster[];
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

    bfilterPopulate_boworkflowmasters: boolean = false;
    bfilterPopulate_boworkflows: boolean = false;
    bfilterPopulate_boworkflowsteps: boolean = false;
    boworkflowmaster_menuactions: any = []
    boworkflow_menuactions: any = []
    @ViewChild('tbl_boworkflows', { static: false }) tbl_boworkflows: Ng2SmartTableComponent;
    boworkflowstep_menuactions: any = []
    @ViewChild('tbl_boworkflowsteps', { static: false }) tbl_boworkflowsteps: Ng2SmartTableComponent;

    boworkflowmaster_Form: FormGroup;

    menucode_List: DropDownValues[];
    menucode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    tablecode_List: DropDownValues[];
    tablecode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    boworkflows_visiblelist: any;
    boworkflows_hidelist: any;
    boworkflowsteps_visiblelist: any;
    boworkflowsteps_hidelist: any;

    Deleted_boworkflow_IDs: string = "";
    boworkflows_ID: string = "1";
    boworkflows_selectedindex: any;
    Deleted_boworkflowstep_IDs: string = "";
    boworkflowsteps_ID: string = "2";
    boworkflowsteps_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflowmaster_service: boworkflowmasterService,
        private boworkflow_service: boworkflowService,
        private boworkflowstep_service: boworkflowstepService,
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
        this.boworkflowmaster_Form = this.fb.group({
            pk: [null],
            workflowmasterid: [null],
            description: [null],
            menucode: [null],
            menucodedesc: [null],
            tablecode: [null],
            tablecodedesc: [null],
            workflowhtml: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boworkflowmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boworkflowmaster_Form.dirty && this.boworkflowmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowmasterid && pkDetail) {
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
        let boworkflowmasterid = null;

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
        this.formid = boworkflowmasterid;
        //alert(boworkflowmasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_boworkflows_TableConfig();
            setTimeout(() => {
                //this.Set_boworkflows_TableDropDownConfig();
            });

            this.Set_boworkflowsteps_TableConfig();
            setTimeout(() => {
                //this.Set_boworkflowsteps_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boworkflowmaster_service.getDefaultData().then(res => {
            this.menucode_List = res.list_menucode.value;
            this.tablecode_List = res.list_tablecode.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boworkflowmaster_service.get_boworkflowmasters_List().then(res => {
            this.pkList = res as boworkflowmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boworkflowmaster_Form.markAsUntouched();
        this.boworkflowmaster_Form.markAsPristine();
    }
    onSelected_menucode(menucodeDetail: any) {
        if (menucodeDetail.value && menucodeDetail) {
            this.boworkflowmaster_Form.patchValue({
                menucode: menucodeDetail.value,
                menucodedesc: menucodeDetail.label,

            });

        }
    }

    onSelected_tablecode(tablecodeDetail: any) {
        if (tablecodeDetail.value && tablecodeDetail) {
            this.boworkflowmaster_Form.patchValue({
                tablecode: tablecodeDetail.value,
                tablecodedesc: tablecodeDetail.label,

            });

        }
    }




    resetForm() {
        if (this.boworkflowmaster_Form != null)
            this.boworkflowmaster_Form.reset();
        this.boworkflowmaster_Form.patchValue({
        });
        setTimeout(() => {
            this.boworkflows_LoadTable();
            this.boworkflowsteps_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let workflowmasterid = this.boworkflowmaster_Form.get('workflowmasterid').value;
        if (workflowmasterid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowmaster_service.delete_boworkflowmaster(workflowmasterid).then(res => {
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
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: null
        });
        if (this.formData.workflowmasterid != null) this.formData.workflowmasterid = null;
        for (let i = 0; i < this.tbl_boworkflows.source.length; i++) {
            this.tbl_boworkflows.source[i].workflowid = null;
        }
        for (let i = 0; i < this.tbl_boworkflowsteps.source.length; i++) {
            this.tbl_boworkflowsteps.source[i].workflowstepid = null;
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
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowmaster_Form.controls[key] != undefined) {
                                this.boworkflowmaster_Form.controls[key].disable({ onlySelf: true });
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
    menucode_onChange(evt: any) {
        let e = evt.value;
    }
    tablecode_onChange(evt: any) {
        let e = evt.value;
    }

    edit_boworkflowmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boworkflowmaster_service.get_boworkflowmasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boworkflowmaster;
            let formproperty = res.boworkflowmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boworkflowmaster.pkcol;
            this.formid = res.boworkflowmaster.workflowmasterid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boworkflowmaster;
        this.formid = res.boworkflowmaster.workflowmasterid;
        this.pkcol = res.boworkflowmaster.pkcol;
        this.bmyrecord = false;
        if ((res.boworkflowmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: res.boworkflowmaster.workflowmasterid,
            description: res.boworkflowmaster.description,
            menucode: res.boworkflowmaster.menucode,
            menucodedesc: res.boworkflowmaster.menucodedesc,
            tablecode: res.boworkflowmaster.tablecode,
            tablecodedesc: res.boworkflowmaster.tablecodedesc,
            workflowhtml: res.boworkflowmaster.workflowhtml,
            status: res.boworkflowmaster.status,
            statusdesc: res.boworkflowmaster.statusdesc,
        });
        this.boworkflowmaster_menuactions = res.boworkflowmaster_menuactions;
        this.boworkflow_menuactions = res.boworkflow_menuactions;
        this.boworkflows_visiblelist = res.boworkflows_visiblelist;
        this.boworkflowstep_menuactions = res.boworkflowstep_menuactions;
        this.boworkflowsteps_visiblelist = res.boworkflowsteps_visiblelist;
        //Child Tables if any
        this.Set_boworkflows_TableConfig();
        this.boworkflows_LoadTable(res.boworkflows);
        this.Set_boworkflowsteps_TableConfig();
        this.boworkflowsteps_LoadTable(res.boworkflowsteps);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflowmaster_Form.controls) {
            let val = this.boworkflowmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boworkflowmaster_Form.controls[key] != null) {
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
        if (!this.boworkflowmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boworkflowmaster_Form.getRawValue();
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
        // Object.keys(this.boworkflowmaster_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boworkflowmaster_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boworkflowmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boworkflowmaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boworkflowmaster_Form.controls[key] != null) {
                        this.formData[key] = this.boworkflowmaster_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_boworkflow_IDs = this.Deleted_boworkflow_IDs;
        this.formData.Deleted_boworkflowstep_IDs = this.Deleted_boworkflowstep_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.boworkflowmaster_service.saveOrUpdate_boworkflowmasters(this.formData, this.tbl_boworkflows?.source?.data, this.tbl_boworkflowsteps?.source?.data,).subscribe(
            async res => {
                if (this.tbl_boworkflows.source) {
                    for (let i = 0; i < this.tbl_boworkflows.source.data.length; i++) {
                        if (this.tbl_boworkflows.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boworkflows.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boworkflowsteps.source) {
                    for (let i = 0; i < this.tbl_boworkflowsteps.source.data.length; i++) {
                        if (this.tbl_boworkflowsteps.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boworkflowsteps.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boworkflowmaster);
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
                        this.objvalues.push((res as any).boworkflowmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflowmaster_Form.markAsUntouched();
                this.boworkflowmaster_Form.markAsPristine();
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
        this.tbl_boworkflows.source = new LocalDataSource();
        this.tbl_boworkflowsteps.source = new LocalDataSource();
    }

    AddOrEdit_boworkflow(event: any, workflowid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boworkflowComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowid, workflowmasterid, visiblelist: this.boworkflows_visiblelist, hidelist: this.boworkflows_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflows.source.add(res[i]);
                    }
                    this.tbl_boworkflows.source.refresh();
                }
                else {
                    this.tbl_boworkflows.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boworkflow(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boworkflow_IDs += childID + ",";
        this.tbl_boworkflows.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boworkflowstep(event: any, workflowstepid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boworkflowstepComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowstepid, workflowmasterid, visiblelist: this.boworkflowsteps_visiblelist, hidelist: this.boworkflowsteps_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflowsteps.source.add(res[i]);
                    }
                    this.tbl_boworkflowsteps.source.refresh();
                }
                else {
                    this.tbl_boworkflowsteps.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boworkflowstep(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boworkflowstep_IDs += childID + ",";
        this.tbl_boworkflowsteps.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boworkflows
    boworkflows_settings: any;

    show_boworkflows_Checkbox() {
        debugger;
        if (this.tbl_boworkflows.source.settings['selectMode'] == 'multi') this.tbl_boworkflows.source.settings['selectMode'] = 'single';
        else
            this.tbl_boworkflows.source.settings['selectMode'] = 'multi';
        this.tbl_boworkflows.source.initGrid();
    }
    delete_boworkflows_All() {
        this.tbl_boworkflows.source.settings['selectMode'] = 'single';
    }
    show_boworkflows_Filter() {
        setTimeout(() => {
            //  this.Set_boworkflows_TableDropDownConfig();
        });
        if (this.tbl_boworkflows.source.settings != null) this.tbl_boworkflows.source.settings['hideSubHeader'] = !this.tbl_boworkflows.source.settings['hideSubHeader'];
        this.tbl_boworkflows.source.initGrid();
    }
    show_boworkflows_InActive() {
    }
    enable_boworkflows_InActive() {
    }
    async Set_boworkflows_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boworkflows) {

            var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
            if (clone.columns['currentapproved'] != undefined) clone.columns['currentapproved'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_currentapproved.value)), }, };
            if (clone.columns['currentapproved'] != undefined) clone.columns['currentapproved'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_currentapproved.value)), }, };
            this.tbl_boworkflows.source.settings = clone;
            this.tbl_boworkflows.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
            if (clone.columns['standardrating'] != undefined) clone.columns['standardrating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_standardrating.value)), }, };
            if (clone.columns['standardrating'] != undefined) clone.columns['standardrating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_standardrating.value)), }, };
            this.tbl_boworkflows.source.settings = clone;
            this.tbl_boworkflows.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
            if (clone.columns['performancerating'] != undefined) clone.columns['performancerating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancerating.value)), }, };
            if (clone.columns['performancerating'] != undefined) clone.columns['performancerating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancerating.value)), }, };
            this.tbl_boworkflows.source.settings = clone;
            this.tbl_boworkflows.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancestatus.value)), }, };
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancestatus.value)), }, };
            this.tbl_boworkflows.source.settings = clone;
            this.tbl_boworkflows.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
            if (clone.columns['workflowstatus'] != undefined) clone.columns['workflowstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_workflowstatus.value)), }, };
            if (clone.columns['workflowstatus'] != undefined) clone.columns['workflowstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_workflowstatus.value)), }, };
            this.tbl_boworkflows.source.settings = clone;
            this.tbl_boworkflows.source.initGrid();
        }
        this.bfilterPopulate_boworkflows = true;
    }
    async boworkflows_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boworkflows_TableConfig() {
        this.boworkflows_settings = {
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
                custom: this.boworkflow_menuactions
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
                currentstepno: {
                    title: 'Current Step No',
                    type: 'number',
                    filter: true,
                },
                modulename: {
                    title: 'Module Name',
                    type: '',
                    filter: true,
                },
                pkvalue: {
                    title: 'P K Value',
                    type: 'number',
                    filter: true,
                },
                currentapproveddesc: {
                    title: 'Current Approved',
                    type: 'html',
                    filter: true,
                },
                currentapprovers: {
                    title: 'Current Approvers',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                nextapprovers: {
                    title: 'Next Approvers',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                assigneddatetime: {
                    title: 'Assigned Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                closeddatetime: {
                    title: 'Closed Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                standardratingdesc: {
                    title: 'Standard Rating',
                    type: 'html',
                    filter: true,
                },
                performanceratingdesc: {
                    title: 'Performance Rating',
                    type: 'html',
                    filter: true,
                },
                performancestatusdesc: {
                    title: 'Performance Status',
                    type: 'html',
                    filter: true,
                },
                exception: {
                    title: 'Exception',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                approvedusers: {
                    title: 'Approved Users',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                approvedcondition: {
                    title: 'Approved Condition',
                    type: '',
                    filter: true,
                },
                tathours: {
                    title: 'T A T Hours',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
                totalactualtime: {
                    title: 'Total Actual Time',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
                processid: {
                    title: 'Process',
                    type: 'number',
                    filter: true,
                },
                workflowdetails: {
                    title: 'Work Flow Details',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseComment(cell);
                        return ret;
                    },
                },
                history: {
                    title: 'History',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                lastapprover: {
                    title: 'Last Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
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
                workflowstatusdesc: {
                    title: 'Work Flow Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    boworkflows_LoadTable(boworkflows = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0) {
            if (this.tbl_boworkflows != undefined) this.tbl_boworkflows.source = new LocalDataSource();
            if (this.tbl_boworkflows != undefined) this.tbl_boworkflows.source.load(boworkflows as any as LocalDataSource);
            if (this.tbl_boworkflows != undefined) this.tbl_boworkflows.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boworkflows_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmaster_service.boworkflows.length == 0)
    {
        this.tbl_boworkflows.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflow();
        this.boworkflowmaster_service.boworkflows.push(obj);
        this.tbl_boworkflows.source.refresh();
        if ((this.boworkflowmaster_service.boworkflows.length / this.tbl_boworkflows.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boworkflows.source.getPaging().page)
        {
            this.tbl_boworkflows.source.setPage((this.boworkflowmaster_service.boworkflows.length / this.tbl_boworkflows.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boworkflows.source.grid.edit(this.tbl_boworkflows.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boworkflows.source.data.indexOf(event.data);
    this.onDelete_boworkflow(event,event.data.workflowid,((this.tbl_boworkflows.source.getPaging().page-1) *this.tbl_boworkflows.source.getPaging().perPage)+index);
    this.tbl_boworkflows.source.refresh();
    break;
    }
    }
    
    */
    boworkflows_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boworkflow(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boworkflow(event, event.data.workflowid, this.formid);
                break;
            case 'delete':
                this.onDelete_boworkflow(event, event.data.workflowid, ((this.tbl_boworkflows.source.getPaging().page - 1) * this.tbl_boworkflows.source.getPaging().perPage) + event.index);
                this.tbl_boworkflows.source.refresh();
                break;
        }
    }
    boworkflows_onDelete(obj) {
        let workflowid = obj.data.workflowid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmaster_service.delete_boworkflowmaster(workflowid).then(res =>
                this.boworkflows_LoadTable()
            );
        }
    }
    async onCustom_boworkflows_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boworkflows");
        let formname = (objbomenuaction as any).actionname;




    }
    boworkflows_Paging(val) {
        debugger;
        this.tbl_boworkflows.source.setPaging(1, val, true);
    }

    handle_boworkflows_GridSelected(event: any) {
        this.boworkflows_selectedindex = this.tbl_boworkflows.source.findIndex(i => i.workflowid === event.data.workflowid);
    }
    Is_boworkflows_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boworkflows
    //start of Grid Codes boworkflowsteps
    boworkflowsteps_settings: any;

    show_boworkflowsteps_Checkbox() {
        debugger;
        if (this.tbl_boworkflowsteps.source.settings['selectMode'] == 'multi') this.tbl_boworkflowsteps.source.settings['selectMode'] = 'single';
        else
            this.tbl_boworkflowsteps.source.settings['selectMode'] = 'multi';
        this.tbl_boworkflowsteps.source.initGrid();
    }
    delete_boworkflowsteps_All() {
        this.tbl_boworkflowsteps.source.settings['selectMode'] = 'single';
    }
    show_boworkflowsteps_Filter() {
        setTimeout(() => {
            //  this.Set_boworkflowsteps_TableDropDownConfig();
        });
        if (this.tbl_boworkflowsteps.source.settings != null) this.tbl_boworkflowsteps.source.settings['hideSubHeader'] = !this.tbl_boworkflowsteps.source.settings['hideSubHeader'];
        this.tbl_boworkflowsteps.source.initGrid();
    }
    show_boworkflowsteps_InActive() {
    }
    enable_boworkflowsteps_InActive() {
    }
    async Set_boworkflowsteps_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boworkflowsteps) {

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['task'] != undefined) clone.columns['task'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_task.value)), }, };
            if (clone.columns['task'] != undefined) clone.columns['task'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_task.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['yesstep'] != undefined) clone.columns['yesstep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_yesstep.value)), }, };
            if (clone.columns['yesstep'] != undefined) clone.columns['yesstep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_yesstep.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['nostep'] != undefined) clone.columns['nostep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_nostep.value)), }, };
            if (clone.columns['nostep'] != undefined) clone.columns['nostep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_nostep.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['workflowuserfieldtype'] != undefined) clone.columns['workflowuserfieldtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_workflowuserfieldtype.value)), }, };
            if (clone.columns['workflowuserfieldtype'] != undefined) clone.columns['workflowuserfieldtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_workflowuserfieldtype.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['parentid'] != undefined) clone.columns['parentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_parentid.value)), }, };
            if (clone.columns['parentid'] != undefined) clone.columns['parentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_parentid.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
            if (clone.columns['customfieldid'] != undefined) clone.columns['customfieldid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_customfieldid.value)), }, };
            if (clone.columns['customfieldid'] != undefined) clone.columns['customfieldid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_customfieldid.value)), }, };
            this.tbl_boworkflowsteps.source.settings = clone;
            this.tbl_boworkflowsteps.source.initGrid();
        }
        this.bfilterPopulate_boworkflowsteps = true;
    }
    async boworkflowsteps_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boworkflowsteps_TableConfig() {
        this.boworkflowsteps_settings = {
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
                custom: this.boworkflowstep_menuactions
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
                stepno: {
                    title: 'Step No',
                    type: 'number',
                    filter: true,
                },
                stepname: {
                    title: 'Step Name',
                    type: '',
                    filter: true,
                },
                tat: {
                    title: 'T A T',
                    type: '',
                    filter: true,
                },
                taskdesc: {
                    title: 'Task',
                    type: 'html',
                    filter: true,
                },
                condition: {
                    title: 'Condition',
                    type: '',
                    filter: true,
                },
                yesstepdesc: {
                    title: 'Yes Step',
                    type: 'html',
                    filter: true,
                },
                nostepdesc: {
                    title: 'No Step',
                    type: 'html',
                    filter: true,
                },
                approver: {
                    title: 'Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                workflowuserfieldtypedesc: {
                    title: 'Work Flow User Field Type',
                    type: 'html',
                    filter: true,
                },
                workflowuserfieldname: {
                    title: 'Work Flow User Field Name',
                    type: '',
                    filter: true,
                },
                parentiddesc: {
                    title: 'Parent',
                    type: 'html',
                    filter: true,
                },
                noedittransaction: {
                    title: 'No Edit Transaction',
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
                autoapproval: {
                    title: 'Auto Approval',
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
                autodenial: {
                    title: 'Auto Denial',
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
                waitduration: {
                    title: 'Wait Duration',
                    type: '',
                    filter: true,
                },
                remainderduration: {
                    title: 'Remainder Duration',
                    type: '',
                    filter: true,
                },
                escalationuser: {
                    title: 'Escalation User',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                customfieldiddesc: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    boworkflowsteps_LoadTable(boworkflowsteps = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0) {
            if (this.tbl_boworkflowsteps != undefined) this.tbl_boworkflowsteps.source = new LocalDataSource();
            if (this.tbl_boworkflowsteps != undefined) this.tbl_boworkflowsteps.source.load(boworkflowsteps as any as LocalDataSource);
            if (this.tbl_boworkflowsteps != undefined) this.tbl_boworkflowsteps.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boworkflowsteps_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmaster_service.boworkflowsteps.length == 0)
    {
        this.tbl_boworkflowsteps.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflowstep();
        this.boworkflowmaster_service.boworkflowsteps.push(obj);
        this.tbl_boworkflowsteps.source.refresh();
        if ((this.boworkflowmaster_service.boworkflowsteps.length / this.tbl_boworkflowsteps.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boworkflowsteps.source.getPaging().page)
        {
            this.tbl_boworkflowsteps.source.setPage((this.boworkflowmaster_service.boworkflowsteps.length / this.tbl_boworkflowsteps.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boworkflowsteps.source.grid.edit(this.tbl_boworkflowsteps.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boworkflowsteps.source.data.indexOf(event.data);
    this.onDelete_boworkflowstep(event,event.data.workflowstepid,((this.tbl_boworkflowsteps.source.getPaging().page-1) *this.tbl_boworkflowsteps.source.getPaging().perPage)+index);
    this.tbl_boworkflowsteps.source.refresh();
    break;
    }
    }
    
    */
    boworkflowsteps_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boworkflowstep(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boworkflowstep(event, event.data.workflowstepid, this.formid);
                break;
            case 'delete':
                this.onDelete_boworkflowstep(event, event.data.workflowstepid, ((this.tbl_boworkflowsteps.source.getPaging().page - 1) * this.tbl_boworkflowsteps.source.getPaging().perPage) + event.index);
                this.tbl_boworkflowsteps.source.refresh();
                break;
        }
    }
    boworkflowsteps_onDelete(obj) {
        let workflowstepid = obj.data.workflowstepid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmaster_service.delete_boworkflowmaster(workflowstepid).then(res =>
                this.boworkflowsteps_LoadTable()
            );
        }
    }
    async onCustom_boworkflowsteps_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boworkflowsteps");
        let formname = (objbomenuaction as any).actionname;




    }
    boworkflowsteps_Paging(val) {
        debugger;
        this.tbl_boworkflowsteps.source.setPaging(1, val, true);
    }

    handle_boworkflowsteps_GridSelected(event: any) {
        this.boworkflowsteps_selectedindex = this.tbl_boworkflowsteps.source.findIndex(i => i.workflowstepid === event.data.workflowstepid);
    }
    Is_boworkflowsteps_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boworkflowsteps

}



