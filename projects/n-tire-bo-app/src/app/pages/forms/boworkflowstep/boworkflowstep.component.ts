import { boworkflowstepService } from './../../../service/boworkflowstep.service';
import { boworkflowstep } from './../../../model/boworkflowstep.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bousermaster } from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
//popups
import { bodynamicform } from './../../../model/bodynamicform.model';
import { bodynamicformService } from './../../../service/bodynamicform.service';
//popups
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
    selector: 'app-boworkflowstep',
    templateUrl: './boworkflowstep.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowstepComponent implements OnInit {
    viewhtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    //formdata: any;//current form data
    shortcuts: ShortcutInput[] = [];//keyboard keys
    showsubmit: boolean = true;//button to show
    showGoWorkFlow: boolean = false;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    pk_tblForm: FormGroup;//pk - autocomplete
    pk_tbloptions: any;//pk - autocomplete
    pk_tblformatter: any;//pk - autocomplete
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;
    data3: any = [];
    bfilterPopulateboworkflowsteps: boolean = false;
    databoworkflowstepstask3: any = [];
    databoworkflowstepsyesstep3: any = [];
    databoworkflowstepsnostep3: any = [];
    databoworkflowstepsworkflowuserfieldtype3: any = [];
    databoworkflowstepsparentid3: any = [];
    databoworkflowstepscustomfieldid3: any = [];
    boworkflowstepForm: FormGroup;
    taskList: boconfigvalue[];
    yesstepList: boworkflowstep[];
    yesstepoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    yesstep_boworkflowstepsForm: FormGroup;//autocomplete
    yesstep_boworkflowstepsoptions: any;//autocomplete
    yesstep_boworkflowstepsformatter: any;//autocomplete
    nostepList: boworkflowstep[];
    nostepoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    nostep_boworkflowstepsForm: FormGroup;//autocomplete
    nostep_boworkflowstepsoptions: any;//autocomplete
    nostep_boworkflowstepsformatter: any;//autocomplete
    workflowuserfieldtypeList: boconfigvalue[];
    parentidList: boworkflowstep[];
    parentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parentid_boworkflowstepsForm: FormGroup;//autocomplete
    parentid_boworkflowstepsoptions: any;//autocomplete
    parentid_boworkflowstepsformatter: any;//autocomplete
    customfieldidList: bodynamicform[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    sessiondata: any;






    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflowstepservice: boworkflowstepService,
        private bousermasterservice: bousermasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bodynamicformservice: bodynamicformService,
        private currentRoute: ActivatedRoute) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
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
        this.boworkflowstepForm = this.fb.group({
            pk: [null],
            workflowstepid: [null],
            workflowmasterid: [null],
            stepno: [null],
            stepname: [null],
            tat: [null],
            task: [null],
            taskdesc: [null],
            condition: [null],
            yesstep: [null],
            yesstepdesc: [null],
            nostep: [null],
            nostepdesc: [null],
            approver: [null],
            workflowuserfieldtype: [null],
            workflowuserfieldtypedesc: [null],
            workflowuserfieldname: [null],
            parentid: [null],
            parentiddesc: [null],
            noedittransaction: [null],
            autoapproval: [null],
            autodenial: [null],
            waitduration: [null],
            remainderduration: [null],
            escalationuser: [null],
            cc: [null],
            customfieldid: [null],
            customfieldiddesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boworkflowstepForm.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarvisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boworkflowstepForm.dirty && this.boworkflowstepForm.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.workflowstepid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowstepid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowstepid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');

        debugger;
        let boworkflowstepid = null;

        //getting data - from list page, from other screen through dialog
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
            this.maindata = this.data;
        }
        if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        //if view button(eye) is clicked
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
            this.viewhtml = this.sessionService.getViewHtml();
        }
        else if (this.data != null && this.data.pkcol != null) {
            this.pkcol = this.data.pkcol;
        }
        else {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        //copy the data from previous dialog 
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = boworkflowstepid;
        //this.sharedService.alert(boworkflowstepid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.configservice.getList("workflowtask").then(res => this.taskList = res as boconfigvalue[]);
        this.boworkflowstepservice.getboworkflowstepsList().then(res => {
            this.yesstepList = res as boworkflowstep[];
            if (this.boworkflowstepservice.formData && this.boworkflowstepservice.formData.yesstep) {
                this.yesstepoptionsEvent.emit(this.yesstepList);
                this.boworkflowstepForm.patchValue({
                    yesstep: this.boworkflowstepservice.formData.yesstep,
                    yesstepdesc: this.boworkflowstepservice.formData.yesstepdesc,
                });
            }
            {
                let arryesstep = this.yesstepList.filter(v => v.workflowstepid == this.boworkflowstepForm.get('yesstep').value);
                let objyesstep;
                if (arryesstep.length > 0) objyesstep = arryesstep[0];
                if (objyesstep) {
                }
            }
        }
        ).catch((err) => { console.log(err); });
        this.yesstep_boworkflowstepsoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.yesstepList.filter(v => v.stepname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.yesstep_boworkflowstepsformatter = (result: any) => result.stepname;
        this.boworkflowstepservice.getboworkflowstepsList().then(res => {
            this.nostepList = res as boworkflowstep[];
            if (this.boworkflowstepservice.formData && this.boworkflowstepservice.formData.nostep) {
                this.nostepoptionsEvent.emit(this.nostepList);
                this.boworkflowstepForm.patchValue({
                    nostep: this.boworkflowstepservice.formData.nostep,
                    nostepdesc: this.boworkflowstepservice.formData.nostepdesc,
                });
            }
            {
                let arrnostep = this.nostepList.filter(v => v.workflowstepid == this.boworkflowstepForm.get('nostep').value);
                let objnostep;
                if (arrnostep.length > 0) objnostep = arrnostep[0];
                if (objnostep) {
                }
            }
        }
        ).catch((err) => { console.log(err); });
        this.nostep_boworkflowstepsoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.nostepList.filter(v => v.stepname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.nostep_boworkflowstepsformatter = (result: any) => result.stepname;
        this.configservice.getList("workflowuserfieldtype").then(res => this.workflowuserfieldtypeList = res as boconfigvalue[]);
        this.boworkflowstepservice.getboworkflowstepsList().then(res => {
            this.parentidList = res as boworkflowstep[];
            if (this.boworkflowstepservice.formData && this.boworkflowstepservice.formData.parentid) {
                this.parentidoptionsEvent.emit(this.parentidList);
                this.boworkflowstepForm.patchValue({
                    parentid: this.boworkflowstepservice.formData.parentid,
                    parentiddesc: this.boworkflowstepservice.formData.parentiddesc,
                });
            }
            {
                let arrparentid = this.parentidList.filter(v => v.workflowstepid == this.boworkflowstepForm.get('parentid').value);
                let objparentid;
                if (arrparentid.length > 0) objparentid = arrparentid[0];
                if (objparentid) {
                }
            }
        }
        ).catch((err) => { console.log(err); });
        this.parentid_boworkflowstepsoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.parentidList.filter(v => v.stepname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.parentid_boworkflowstepsformatter = (result: any) => result.stepname;
        this.bodynamicformservice.getbodynamicformsList().then(res => {
            this.customfieldidList = res as bodynamicform[];
        }
        ).catch((err) => { console.log(err); });

        //autocomplete
        this.boworkflowstepservice.getboworkflowstepsList().then(res => {
            this.pkList = res as boworkflowstep[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { console.log(err); });
        this.pk_tbloptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.pk_tblformatter = (result: any) => result.pkcol;

        //setting the flag that the screen is not touched 
        this.boworkflowstepForm.markAsUntouched();
        this.boworkflowstepForm.markAsPristine();
    }
    onSelectedyesstep(yesstepDetail: any) {
        if (yesstepDetail.yesstep && yesstepDetail) {
            this.boworkflowstepForm.patchValue({
                yesstep: yesstepDetail.yesstep,
                yesstepdesc: yesstepDetail.stepname,

            });

        }
    }

    onSelectednostep(nostepDetail: any) {
        if (nostepDetail.nostep && nostepDetail) {
            this.boworkflowstepForm.patchValue({
                nostep: nostepDetail.nostep,
                nostepdesc: nostepDetail.stepname,

            });

        }
    }

    onSelectedparentid(parentidDetail: any) {
        if (parentidDetail.parentid && parentidDetail) {
            this.boworkflowstepForm.patchValue({
                parentid: parentidDetail.parentid,
                parentiddesc: parentidDetail.stepname,

            });

        }
    }




    resetForm() {
        if (this.boworkflowstepForm != null)
            this.boworkflowstepForm.reset();
        this.boworkflowstepForm.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let workflowstepid = this.boworkflowstepForm.get('workflowstepid').value;
        if (workflowstepid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowstepservice.deleteboworkflowstep(workflowstepid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflowstepForm.patchValue({
            workflowstepid: null
        });
        if (this.boworkflowstepservice.formData.workflowstepid != null) this.boworkflowstepservice.formData.workflowstepid = null;
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
                    else if (key == "approver")
                        this.boworkflowstepForm.patchValue({ "approver": mainscreendata[key] });
                    else if (key == "escalationuser")
                        this.boworkflowstepForm.patchValue({ "escalationuser": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflowstepForm.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflowstepForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowstepForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowstepForm.controls[key] != undefined) this.boworkflowstepForm.controls[key].disable({ onlySelf: true });
                        }
                    }
                }
            }
        }
    }
    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || this.maindata.save == true) {
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
        if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    workflowstepidonChange(evt: any) {
        let e = evt.value;
    }
    workflowmasteridonChange(evt: any) {
        let e = evt.value;
    }
    stepnoonChange(evt: any) {
        let e = evt.value;
    }
    stepnameonChange(evt: any) {
        let e = evt.value;
    }
    tatonChange(evt: any) {
        let e = evt.value;
    }
    taskonChange(evt: any) {
        let e = this.f.task.value as any;
        this.boworkflowstepForm.patchValue({ taskdesc: evt.options[evt.options.selectedIndex].text });
    }
    conditiononChange(evt: any) {
        let e = evt.value;
    }
    yessteponChange(evt: any) {
        let e = evt.value;
    }
    nosteponChange(evt: any) {
        let e = evt.value;
    }
    approveronChange(evt: any) {
        let e = evt.value;
    }
    workflowuserfieldtypeonChange(evt: any) {
        let e = this.f.workflowuserfieldtype.value as any;
        this.boworkflowstepForm.patchValue({ workflowuserfieldtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowuserfieldnameonChange(evt: any) {
        let e = evt.value;
    }
    parentidonChange(evt: any) {
        let e = evt.value;
    }
    noedittransactiononChange(evt: any) {
        let e = evt.value;
    }
    autoapprovalonChange(evt: any) {
        let e = evt.value;
    }
    autodenialonChange(evt: any) {
        let e = evt.value;
    }
    waitdurationonChange(evt: any) {
        let e = evt.value;
    }
    remainderdurationonChange(evt: any) {
        let e = evt.value;
    }
    escalationuseronChange(evt: any) {
        let e = evt.value;
        this.bousermasterservice.getListByuserid(e).then(res => {
            let arrescalationuser = res;
            let objescalationuser;
            if (arrescalationuser.length > 0) objescalationuser = arrescalationuser[0];
            if (objescalationuser) {
            }
        }).catch((err) => { console.log(err); });
    }
    cconChange(evt: any) {
        let e = evt.value;
        this.bousermasterservice.getListByuserid(e).then(res => {
            let arrcc = res;
            let objcc;
            if (arrcc.length > 0) objcc = arrcc[0];
            if (objcc) {
            }
        }).catch((err) => { console.log(err); });
    }
    customfieldidonChange(evt: any) {
        let e = evt.value;
        this.boworkflowstepForm.patchValue({ customfieldiddesc: evt.options[evt.options.selectedIndex].text });
    }
    statusonChange(evt: any) {
        let e = evt.value;
    }

    async PopulateScreen(pkcol: any) {
        this.boworkflowstepservice.getboworkflowstepsByEID(pkcol).then(res => {

            this.boworkflowstepservice.formData = res;
            let formproperty = res.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.pkcol;
            this.formid = res.boworkflowstep.workflowstepid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formid = res.boworkflowstep.workflowstepid;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowstepForm.patchValue({
            workflowstepid: res.boworkflowstep.workflowstepid,
            workflowmasterid: res.boworkflowstep.workflowmasterid,
            stepno: res.boworkflowstep.stepno,
            stepname: res.boworkflowstep.stepname,
            tat: res.boworkflowstep.tat,
            task: res.boworkflowstep.task,
            taskdesc: res.boworkflowstep.taskdesc,
            condition: res.boworkflowstep.condition,
            yesstep: res.boworkflowstep.yesstep,
            yesstepdesc: res.boworkflowstep.yesstepdesc,
            nostep: res.boworkflowstep.nostep,
            nostepdesc: res.boworkflowstep.nostepdesc,
            approver: JSON.parse(res.boworkflowstep.approver),
            workflowuserfieldtype: res.boworkflowstep.workflowuserfieldtype,
            workflowuserfieldtypedesc: res.boworkflowstep.workflowuserfieldtypedesc,
            workflowuserfieldname: res.boworkflowstep.workflowuserfieldname,
            parentid: res.boworkflowstep.parentid,
            parentiddesc: res.boworkflowstep.parentiddesc,
            noedittransaction: res.boworkflowstep.noedittransaction,
            autoapproval: res.boworkflowstep.autoapproval,
            autodenial: res.boworkflowstep.autodenial,
            waitduration: res.boworkflowstep.waitduration,
            remainderduration: res.boworkflowstep.remainderduration,
            escalationuser: JSON.parse(res.boworkflowstep.escalationuser),
            cc: JSON.parse(res.boworkflowstep.cc),
            customfieldid: res.boworkflowstep.customfieldid,
            customfieldiddesc: res.boworkflowstep.customfieldiddesc,
            status: res.boworkflowstep.status,
            statusdesc: res.boworkflowstep.statusdesc,
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
        for (let key in this.boworkflowstepForm.controls) {
            if (this.boworkflowstepForm.controls[key] != null) {
                ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boworkflowstepForm.controls[key].value);
            }
        }
        return ret;
    }

    async onSubmitDataDlg(bclear: any) {
        debugger;
        this.isSubmitted = true;
        if (!this.boworkflowstepForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boworkflowstepForm.value;
        obj.approver = JSON.stringify(this.boworkflowstepForm.get('approver').value);
        obj.escalationuser = JSON.stringify(this.boworkflowstepForm.get('escalationuser').value);
        obj.cc = JSON.stringify(this.boworkflowstepForm.get('cc').value);
        console.log(obj);
        this.dialogRef.close(obj);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
    }

    //This has to come from bomenuactions & procedures
    afteraction(mode: any) {
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
        Object.keys(this.boworkflowstepForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.boworkflowstepForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
                });
            }
        });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boworkflowstepForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.boworkflowstepservice.formData = this.boworkflowstepForm.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boworkflowstepForm.controls[key] != null) {
                        this.boworkflowstepservice.formData[key] = this.boworkflowstepForm.controls[key].value;
                    }
                }
            }
        }
        this.boworkflowstepservice.formData.approver = JSON.stringify(this.boworkflowstepForm.get('approver').value);
        this.boworkflowstepservice.formData.escalationuser = JSON.stringify(this.boworkflowstepForm.get('escalationuser').value);
        this.boworkflowstepservice.formData.cc = JSON.stringify(this.boworkflowstepForm.get('cc').value);
        console.log(this.boworkflowstepservice.formData);
        this.boworkflowstepservice.formData = this.boworkflowstepForm.value;
        this.boworkflowstepservice.saveOrUpdateboworkflowsteps().subscribe(
            async res => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                document.getElementById("contentArea1").scrollTop = 0;
                if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
                    this.dialogRef.close((res as any).result.value.boworkflowstep);
                    return;
                }
                else {
                    document.getElementById("contentArea1").scrollTop = 0;
                }
                this.boworkflowstepservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.boworkflowstep);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflowstepForm.markAsUntouched();
                this.boworkflowstepForm.markAsPristine();
            },
            err => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer

    AddOrEdityesstep(workflowstepid) {
        /*let ScreenType='2';
        this.dialog.open(boworkflowstepComponent, 
        {
        data: {workflowstepid:this.boworkflowstepForm.get('yesstep').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }


    AddOrEditnostep(workflowstepid) {
        /*let ScreenType='2';
        this.dialog.open(boworkflowstepComponent, 
        {
        data: {workflowstepid:this.boworkflowstepForm.get('nostep').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }


    AddOrEditparentid(workflowstepid) {
        /*let ScreenType='2';
        this.dialog.open(boworkflowstepComponent, 
        {
        data: {workflowstepid:this.boworkflowstepForm.get('parentid').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }


    AddOrEditcustomfieldid(formid) {
        /*let ScreenType='2';
        this.dialog.open(bodynamicformComponent, 
        {
        data: {formid:this.boworkflowstepForm.get('customfieldid').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }



    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



