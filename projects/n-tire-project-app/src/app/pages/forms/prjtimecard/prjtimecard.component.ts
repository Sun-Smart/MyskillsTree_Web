import { prjtimecardService } from './../../../service/prjtimecard.service';
import { prjtimecard } from './../../../model/prjtimecard.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { prjprojectmaster } from './../../../model/prjprojectmaster.model';
import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
//import { prjprojectmasterComponent } from '../prjprojectmaster/prjprojectmaster.component';
//popups
import { prjprojectdeliverable } from './../../../model/prjprojectdeliverable.model';
import { prjprojectdeliverableService } from './../../../service/prjprojectdeliverable.service';
//import { prjprojectdeliverableComponent } from '../prjprojectdeliverable/prjprojectdeliverable.component';
//popups
import { prjprojecttask } from './../../../model/prjprojecttask.model';
import { prjprojecttaskService } from './../../../service/prjprojecttask.service';
//import { prjprojecttaskComponent } from '../prjprojecttask/prjprojecttask.component';
//popups
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//import { bousermasterComponent } from '../bousermaster/bousermaster.component';
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
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-prjtimecard',
    templateUrl: './prjtimecard.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class prjtimecardComponent implements OnInit {
    viewhtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    formdata: any;//current form data
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
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulateprjtimecards: boolean = false;
    dataprjtimecardsprojectid3: any = [];
    dataprjtimecardsdeliverableid3: any = [];
    dataprjtimecardstaskid3: any = [];
    dataprjtimecardsuserid3: any = [];
    prjtimecardForm: FormGroup;
    projectidList: prjprojectmaster[];//dropdown
    projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    projectid_prjprojectmastersForm: FormGroup;//autocomplete
    projectid_prjprojectmastersoptions: any;//autocomplete
    projectid_prjprojectmastersformatter: any;//autocomplete
    deliverableidList: prjprojectdeliverable[];//dropdown
    taskidList: prjprojecttask[];//dropdown
    taskidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    taskid_prjprojecttasksForm: FormGroup;//autocomplete
    taskid_prjprojecttasksoptions: any;//autocomplete
    taskid_prjprojecttasksformatter: any;//autocomplete
    useridList: bousermaster[];//dropdown
    useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    userid_bousermastersForm: FormGroup;//autocomplete
    userid_bousermastersoptions: any;//autocomplete
    userid_bousermastersformatter: any;//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    pkcol: any;
    customfieldjson: any;
    customfieldvisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentfieldjson: any[] = [];
    attachmentvisible: boolean = true;
    SESSIONUSERID: any;//current user
    sessiondata: any;






    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private prjtimecardservice: prjtimecardService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private prjprojectmasterservice: prjprojectmasterService,
        private prjprojectdeliverableservice: prjprojectdeliverableService,
        private prjprojecttaskservice: prjprojecttaskService,
        private bousermasterservice: bousermasterService,
        private customfieldservice: customfieldconfigurationService,
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
        this.prjtimecardForm = this.fb.group({
            pk: [null], ImageName: [null],
            timecardid: [null],
            projectid: [null],
            projectiddesc: [null],
            deliverableid: [null],
            deliverableiddesc: [null],
            taskid: [null],
            taskiddesc: [null],
            userid: [null],
            useriddesc: [null],
            carddate: [null],
            fromtime: [null],
            totime: [null],
            hoursspent: [null],
            notes: [null],
            isbillable: [null],
            billablehrs: [null],
            billableamount: [null],
            billid: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.prjtimecardForm.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.prjtimecardForm.dirty && this.prjtimecardForm.touched) {
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
        let pos = this.pkList.map(function (e:any) { return e.timecardid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e:any) { return e.timecardid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.timecardid && pkDetail) {
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
        let prjtimecardid = null;

        //getting data - from list page, from other screen through dialog
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
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
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = prjtimecardid;
        //this.sharedService.alert(prjtimecardid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.prjprojectmasterservice.getprjprojectmastersList().then((res:any) => {
            this.projectidList = res as prjprojectmaster[];
            if (this.formdata && this.formdata.prjtimecard && this.formdata.prjtimecard.projectid) {
                this.projectidoptionsEvent.emit(this.projectidList);
                this.prjtimecardForm.patchValue({
                    projectid: this.formdata.prjtimecard.projectid,
                    projectiddesc: this.formdata.prjtimecard.projectiddesc,
                });
            }
        }
        );
        this.projectid_prjprojectmastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.projectidList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.projectid_prjprojectmastersformatter = (result: any) => result.projectname;
        setTimeout(() => {
            if (this.f.projectid!.value && this.f.projectid!.value != "" && this.f.projectid!.value != null) this.prjprojectdeliverableservice.getListByprojectid(this.f.projectid!.value).then((res:any) => {
                this.deliverableidList = res as prjprojectdeliverable[];
                if (this.formdata && this.formdata.prjtimecard && this.formdata.prjtimecard.deliverableid) {
                    this.prjtimecardForm.patchValue({
                        deliverableid: this.formdata.prjtimecard.deliverableid,
                        deliverableiddesc: this.formdata.prjtimecard.deliverableiddesc,
                    });
                }
            });
        });
        setTimeout(() => {
            if (this.f.deliverableid!.value && this.f.deliverableid!.value != "" && this.f.deliverableid!.value != null) this.prjprojecttaskservice.getListBydeliverableid(this.f.deliverableid!.value).then((res:any) => {
                this.taskidList = res as prjprojecttask[];
                if (this.formdata && this.formdata.prjtimecard && this.formdata.prjtimecard.taskid) {
                    this.prjtimecardForm.patchValue({
                        taskid: this.formdata.prjtimecard.taskid,
                        taskiddesc: this.formdata.prjtimecard.taskiddesc,
                    });
                }
            });
        });
        this.taskid_prjprojecttasksoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.taskidList.filter(v => v.taskname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.taskid_prjprojecttasksformatter = (result: any) => result.taskname;
        this.bousermasterservice.getbousermastersList().then((res:any) => {
            this.useridList = res as bousermaster[];
            if (this.formdata && this.formdata.prjtimecard && this.formdata.prjtimecard.userid) {
                this.useridoptionsEvent.emit(this.useridList);
                this.prjtimecardForm.patchValue({
                    userid: this.formdata.prjtimecard.userid,
                    useriddesc: this.formdata.prjtimecard.useriddesc,
                });
            }
        }
        );
        this.userid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.userid_bousermastersformatter = (result: any) => result.username;

        //autocomplete
        this.prjtimecardservice.getprjtimecardsList().then((res:any) => {
            this.pkList = res as prjtimecard[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        );
        this.pk_tbloptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.pk_tblformatter = (result: any) => result.pkcol;

        //setting the flag that the screen is not touched 
        this.prjtimecardForm.markAsUntouched();
        this.prjtimecardForm.markAsPristine();
    }
    onSelectedprojectid(projectidDetail: any) {
        if (projectidDetail.projectid && projectidDetail) {
            this.prjtimecardForm.patchValue({
                projectid: projectidDetail.projectid,
                projectiddesc: projectidDetail.projectname,

            });
            this.prjprojectdeliverableservice.getListByprojectid(projectidDetail.projectid).then((res:any) => {
                this.deliverableidList = res as prjprojectdeliverable[]
            });

        }
    }

    onSelectedtaskid(taskidDetail: any) {
        if (taskidDetail.taskid && taskidDetail) {
            this.prjtimecardForm.patchValue({
                taskid: taskidDetail.taskid,
                taskiddesc: taskidDetail.taskname,

            });

        }
    }

    onSelecteduserid(useridDetail: any) {
        if (useridDetail.userid && useridDetail) {
            this.prjtimecardForm.patchValue({
                userid: useridDetail.userid,
                useriddesc: useridDetail.username,

            });

        }
    }




    resetForm() {
        if (this.prjtimecardForm != null)
            this.prjtimecardForm.reset();
        this.prjtimecardForm.patchValue({
            userid: this.sessiondata.userid,
            useriddesc: this.sessiondata.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let timecardid = this.prjtimecardForm.get('timecardid')!.value;
        if (timecardid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.prjtimecardservice.deleteprjtimecard(timecardid).then((res:any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.prjtimecardForm.patchValue({
            timecardid: null
        });
        if (this.prjtimecardservice.formData.timecardid != null) this.prjtimecardservice.formData.timecardid = null;
    }
    PopulateFromMainScreen(mainscreendata:any, bdisable:any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "carddate")
                        json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
                    else if (key == "fromtime")
                        json = '{"' + key + '": ' + new Time(mainscreendata[key]) + ' }';
                    else if (key == "totime")
                        json = '{"' + key + '": ' + new Time(mainscreendata[key]) + ' }';
                    else if (key == "hoursspent")
                        json = '{"' + key + '": ' + new Time(mainscreendata[key]) + ' }';
                    else if (key == "billablehrs")
                        json = '{"' + key + '": ' + new Time(mainscreendata[key]) + ' }';
                    else if (ctrltype == "string") {
                        jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
                        json = JSON.parse(jsonstring);
                    }
                    else {
                        jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
                        json = JSON.parse(jsonstring);
                    }
                    {
                        if (this.prjtimecardForm.controls[key] != null) {
                            this.prjtimecardForm.patchValue(json);
                            if (bdisable) this.prjtimecardForm.controls[key].disable({ onlySelf: true });
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("prjtimecards", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
            this.customfieldservicelist = res;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        if (this.data.save == true) {
            this.onSubmitData(false);
        }
        else if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
        }
        else {
            this.onSubmitData(false);
        }
    }
    onSubmit() {
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    projectidonChange(evt:any) {
        let e = evt!.value;
    }
    deliverableidonChange(evt:any) {
        let e = evt!.value;
        this.prjtimecardForm.patchValue({ deliverableiddesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.deliverableid!.value && this.f.deliverableid!.value != "" && this.f.deliverableid!.value != null) this.prjprojecttaskservice.getListBydeliverableid(this.f.deliverableid!.value).then((res:any) => this.taskidList = res as prjprojecttask[]);
        });
    }
    taskidonChange(evt:any) {
        let e = evt!.value;
    }
    useridonChange(evt:any) {
        let e = evt!.value;
    }
    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }



    async PopulateScreen(pkcol: any) {
        this.prjtimecardservice.getprjtimecardsByEID(pkcol).then((res:any) => {

            this.formdata = res;
            let formproperty = res.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.pkcol;
            this.formid = res.prjtimecard.timecardid;
            this.FillData(res);
        });
    }

    FillData(res: any) {
        this.formid = res.prjtimecard.timecardid;
        var fromtimeTime = new Time(res.prjtimecard.fromtime);
        var totimeTime = new Time(res.prjtimecard.totime);
        var hoursspentTime = new Time(res.prjtimecard.hoursspent);
        var billablehrsTime = new Time(res.prjtimecard.billablehrs);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.prjtimecardForm.patchValue({
            timecardid: res.prjtimecard.timecardid,
            projectid: res.prjtimecard.projectid,
            projectiddesc: res.prjtimecard.projectiddesc,
            deliverableid: res.prjtimecard.deliverableid,
            deliverableiddesc: res.prjtimecard.deliverableiddesc,
            taskid: res.prjtimecard.taskid,
            taskiddesc: res.prjtimecard.taskiddesc,
            userid: res.prjtimecard.userid,
            useriddesc: res.prjtimecard.useriddesc,
            carddate: this.ngbDateParserFormatter.parse(res.prjtimecard.carddate),
            fromtime: fromtimeTime,
            totime: totimeTime,
            hoursspent: hoursspentTime,
            notes: res.prjtimecard.notes,
            isbillable: res.prjtimecard.isbillable,
            billablehrs: billablehrsTime,
            billableamount: res.prjtimecard.billableamount,
            billid: res.prjtimecard.billid,
            customfield: res.prjtimecard.customfield,
            attachment: res.prjtimecard.attachment,
            status: res.prjtimecard.status,
            statusdesc: res.prjtimecard.statusdesc,
        });
        if (this.prjtimecardForm.get('customfield')!.value != null && this.prjtimecardForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.prjtimecardForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.prjtimecardForm.get('attachment')!.value != null && this.prjtimecardForm.get('attachment')!.value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.prjtimecardForm.get('attachment')!.value));
        setTimeout(() => {
            if (this.f.projectid!.value && this.f.projectid!.value != "" && this.f.projectid!.value != null) this.prjprojectdeliverableservice.getListByprojectid(this.f.projectid!.value).then((res:any) => {
                this.deliverableidList = res as prjprojectdeliverable[];
            });
        });
        setTimeout(() => {
            if (this.f.deliverableid!.value && this.f.deliverableid!.value != "" && this.f.deliverableid!.value != null) this.prjprojecttaskservice.getListBydeliverableid(this.f.deliverableid!.value).then((res:any) => {
                this.taskidList = res as prjprojecttask[];
            });
        });
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html:any) {
        let ret = "";
        ret = html;
        for (let key in this.prjtimecardForm.controls) {
            if (this.prjtimecardForm.controls[key] != null) {
                ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjtimecardForm.controls[key]!.value);
            }
        }
        return ret;
    }

    async onSubmitDataDlg(bclear:any) {
        this.isSubmitted = true;
        if (!this.prjtimecardForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.prjtimecardForm!.value;
        obj.carddate = this.ngbDateParserFormatter.format(this.prjtimecardForm.get('carddate')!.value);
        obj.fromtime = (this.prjtimecardForm.get('fromtime')!.value == null ? 0 : this.prjtimecardForm.get('fromtime')!.value.hour) + ':' + (this.prjtimecardForm.get('fromtime')!.value == null ? 0 : this.prjtimecardForm.get('fromtime')!.value.minute);
        obj.totime = (this.prjtimecardForm.get('totime')!.value == null ? 0 : this.prjtimecardForm.get('totime')!.value.hour) + ':' + (this.prjtimecardForm.get('totime')!.value == null ? 0 : this.prjtimecardForm.get('totime')!.value.minute);
        obj.hoursspent = (this.prjtimecardForm.get('hoursspent')!.value == null ? 0 : this.prjtimecardForm.get('hoursspent')!.value.hour) + ':' + (this.prjtimecardForm.get('hoursspent')!.value == null ? 0 : this.prjtimecardForm.get('hoursspent')!.value.minute);
        obj.billablehrs = (this.prjtimecardForm.get('billablehrs')!.value == null ? 0 : this.prjtimecardForm.get('billablehrs')!.value.hour) + ':' + (this.prjtimecardForm.get('billablehrs')!.value == null ? 0 : this.prjtimecardForm.get('billablehrs')!.value.minute);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
        obj.fileattachmentlist = this.fileattachment.getAllFiles();
        console.log(obj);
        await this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.dialogRef.close(obj);
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

    async onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        Object.keys(this.prjtimecardForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.prjtimecardForm.get(key)!.errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
                });
            }
        });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.prjtimecardForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.prjtimecardservice.formData = this.prjtimecardForm!.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.prjtimecardForm.controls[key] != null) {
                        this.prjtimecardservice.formData[key] = this.prjtimecardForm.controls[key]!.value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.prjtimecardservice.formData.carddate = new Date(this.ngbDateParserFormatter.format(this.prjtimecardForm.get('carddate')!.value) + '  UTC');
        this.prjtimecardservice.formData.fromtime = (this.prjtimecardForm.get('fromtime')!.value == null ? 0 : this.prjtimecardForm.get('fromtime')!.value.hour) + ':' + (this.prjtimecardForm.get('fromtime')!.value == null ? 0 : this.prjtimecardForm.get('fromtime')!.value.minute);
        this.prjtimecardservice.formData.totime = (this.prjtimecardForm.get('totime')!.value == null ? 0 : this.prjtimecardForm.get('totime')!.value.hour) + ':' + (this.prjtimecardForm.get('totime')!.value == null ? 0 : this.prjtimecardForm.get('totime')!.value.minute);
        this.prjtimecardservice.formData.hoursspent = (this.prjtimecardForm.get('hoursspent')!.value == null ? 0 : this.prjtimecardForm.get('hoursspent')!.value.hour) + ':' + (this.prjtimecardForm.get('hoursspent')!.value == null ? 0 : this.prjtimecardForm.get('hoursspent')!.value.minute);
        this.prjtimecardservice.formData.billablehrs = (this.prjtimecardForm.get('billablehrs')!.value == null ? 0 : this.prjtimecardForm.get('billablehrs')!.value.hour) + ':' + (this.prjtimecardForm.get('billablehrs')!.value == null ? 0 : this.prjtimecardForm.get('billablehrs')!.value.minute);
        this.prjtimecardservice.formData.customfield = JSON.stringify(customfields);
        this.prjtimecardservice.formData.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
        this.fileattachmentlist = this.fileattachment.getAllFiles();
        console.log(this.prjtimecardservice.formData);
        this.prjtimecardservice.saveOrUpdateprjtimecards().subscribe(
            async (res:any) => {
                await this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                document.getElementById("contentArea1").scrollTop = 0;
                if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
                    this.dialogRef.close((res as any).result!.value.prjtimecard);
                    return;
                }
                else {
                    document.getElementById("contentArea1").scrollTop = 0;
                }
                this.prjtimecardservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.prjtimecard);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.prjtimecardForm.markAsUntouched();
                this.prjtimecardForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer

    AddOrEditprojectid(projectid) {
        /*let ScreenType='2';
        this.dialog.open(prjprojectmasterComponent, 
        {
        data: {projectid:this.prjtimecardForm.get('projectid')!.value, ScreenType:2 }
        } 
        ).onClose.subscribe((res:any) => {
        });*/
    }


    AddOrEditdeliverableid(deliverableid) {
        /*let ScreenType='2';
        this.dialog.open(prjprojectdeliverableComponent, 
        {
        data: {deliverableid:this.prjtimecardForm.get('deliverableid')!.value, ScreenType:2 }
        } 
        ).onClose.subscribe((res:any) => {
        });*/
    }


    AddOrEdittaskid(taskid) {
        /*let ScreenType='2';
        this.dialog.open(prjprojecttaskComponent, 
        {
        data: {taskid:this.prjtimecardForm.get('taskid')!.value, ScreenType:2 }
        } 
        ).onClose.subscribe((res:any) => {
        });*/
    }


    AddOrEdituserid(userid) {
        /*let ScreenType='2';
        this.dialog.open(bousermasterComponent, 
        {
        data: {userid:this.prjtimecardForm.get('userid')!.value, ScreenType:2 }
        } 
        ).onClose.subscribe((res:any) => {
        });*/
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



