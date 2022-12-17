import { hlpservicelevelService } from './../../../service/hlpservicelevel.service';
import { hlpservicelevel } from './../../../model/hlpservicelevel.model';
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
import { hlpslapriority } from './../../../model/hlpslapriority.model';
import { hlpslapriorityComponent } from './../../../pages/forms/hlpslapriority/hlpslapriority.component';
import { hlpslapriorityService } from './../../../service/hlpslapriority.service';
import { hlpslasupporthour } from './../../../model/hlpslasupporthour.model';
import { hlpslasupporthourComponent } from './../../../pages/forms/hlpslasupporthour/hlpslasupporthour.component';
import { hlpslasupporthourService } from './../../../service/hlpslasupporthour.service';
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
    selector: 'app-hlpservicelevel',
    templateUrl: './hlpservicelevel.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hlpservicelevelComponent implements OnInit {
    formData: hlpservicelevel;
    list: hlpservicelevel[];
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

    bfilterPopulate_hlpservicelevels: boolean = false;
    bfilterPopulate_hlpslapriorities: boolean = false;
    bfilterPopulate_hlpslasupporthours: boolean = false;
    hlpservicelevel_menuactions: any = []
    hlpslapriority_menuactions: any = []
    @ViewChild('tbl_hlpslapriorities', { static: false }) tbl_hlpslapriorities: Ng2SmartTableComponent;
    hlpslasupporthour_menuactions: any = []
    @ViewChild('tbl_hlpslasupporthours', { static: false }) tbl_hlpslasupporthours: Ng2SmartTableComponent;

    hlpservicelevel_Form: FormGroup;

    type_List: DropDownValues[];
    category_List: DropDownValues[];
    holidaylistid_List: DropDownValues[];

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

    serviceidvisible: boolean = false;


    hlpslapriorities_visiblelist: any;
    hlpslapriorities_hidelist: any;
    hlpslasupporthours_visiblelist: any;
    hlpslasupporthours_hidelist: any;

    Deleted_hlpslapriority_IDs: string = "";
    hlpslapriorities_ID: string = "1";
    hlpslapriorities_selectedindex: any;
    Deleted_hlpslasupporthour_IDs: string = "";
    hlpslasupporthours_ID: string = "2";
    hlpslasupporthours_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hlpservicelevel_service: hlpservicelevelService,
        private hlpslapriority_service: hlpslapriorityService,
        private hlpslasupporthour_service: hlpslasupporthourService,
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
        this.hlpservicelevel_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            servicelevelid: [null],
            servicelevelcode: [null, Validators.compose([Validators.required])],
            details: [null],
            type: [null],
            typedesc: [null],
            category: [null],
            categorydesc: [null],
            serviceid: [null],
            purpose: [null],
            scope: [null],
            responsibilities: [null],
            criticality: [null],
            objectives: [null],
            communications: [null],
            measurements: [null],
            escalationrule: [null],
            isdefault: [null],
            holidaylistid: [null],
            holidaylistiddesc: [null],
            startdate: [null],
            enddate: [null],
            supportcontacts: [null],
            maxissues: [null],
            knowledgebaseid: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
            customfield: [null],
            attachment: [null],
        });
    }

    get f() { return this.hlpservicelevel_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.hlpservicelevel_Form.dirty && this.hlpservicelevel_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    servicelevelcodeexists(e: any) {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.servicelevelcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].servicelevelid.toString() != this.formid.toString()) {
            if (confirm("This Service Level Code value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.servicelevelid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.servicelevelid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.servicelevelid && pkDetail) {
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
        let hlpservicelevelid = null;

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
        this.formid = hlpservicelevelid;
        //alert(hlpservicelevelid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_hlpslapriorities_TableConfig();
            setTimeout(() => {
                //this.Set_hlpslapriorities_TableDropDownConfig();
            });

            this.Set_hlpslasupporthours_TableConfig();
            setTimeout(() => {
                //this.Set_hlpslasupporthours_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.hlpservicelevel_service.getDefaultData().then(res => {
            this.type_List = res.list_type.value;
            this.category_List = res.list_category.value;
            this.holidaylistid_List = res.list_holidaylistid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.hlpservicelevel_service.get_hlpservicelevels_List().then(res => {
            this.pkList = res as hlpservicelevel[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.hlpservicelevel_Form.markAsUntouched();
        this.hlpservicelevel_Form.markAsPristine();
    }



    resetForm() {
        if (this.hlpservicelevel_Form != null)
            this.hlpservicelevel_Form.reset();
        this.hlpservicelevel_Form.patchValue({
        });
        setTimeout(() => {
            this.hlpslapriorities_LoadTable();
            this.hlpslasupporthours_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.serviceidvisible = false;
    }

    onDelete() {
        let servicelevelid = this.hlpservicelevel_Form.get('servicelevelid').value;
        if (servicelevelid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hlpservicelevel_service.delete_hlpservicelevel(servicelevelid).then(res => {
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
        this.hlpservicelevel_Form.patchValue({
            servicelevelid: null
        });
        if (this.formData.servicelevelid != null) this.formData.servicelevelid = null;
        for (let i = 0; i < this.tbl_hlpslapriorities.source.length; i++) {
            this.tbl_hlpslapriorities.source[i].servicelevelpriorityid = null;
        }
        for (let i = 0; i < this.tbl_hlpslasupporthours.source.length; i++) {
            this.tbl_hlpslasupporthours.source[i].supportid = null;
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
                    else if (key == "startdate")
                        this.hlpservicelevel_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enddate")
                        this.hlpservicelevel_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "notes")
                        this.hlpservicelevel_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.hlpservicelevel_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.hlpservicelevel_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.hlpservicelevel_Form.controls[key] != undefined) {
                                this.hlpservicelevel_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hlpservicelevels", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    type_onChange(evt: any) {
        let e = this.f.type.value as any;
        this.hlpservicelevel_Form.patchValue({ typedesc: evt.options[evt.options.selectedIndex].text });
    }
    category_onChange(evt: any) {
        let e = this.f.category.value as any;
        this.hlpservicelevel_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
    }
    holidaylistid_onChange(evt: any) {
        let e = evt.value;
        this.hlpservicelevel_Form.patchValue({ holidaylistiddesc: evt.options[evt.options.selectedIndex].text });
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



    edit_hlpservicelevels() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.hlpservicelevel_service.get_hlpservicelevels_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.hlpservicelevel;
            let formproperty = res.hlpservicelevel.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.hlpservicelevel.pkcol;
            this.formid = res.hlpservicelevel.servicelevelid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.hlpservicelevel;
        this.formid = res.hlpservicelevel.servicelevelid;
        this.pkcol = res.hlpservicelevel.pkcol;
        this.bmyrecord = false;
        if ((res.hlpservicelevel as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hlpservicelevel_Form.patchValue({
            servicelevelid: res.hlpservicelevel.servicelevelid,
            servicelevelcode: res.hlpservicelevel.servicelevelcode,
            details: res.hlpservicelevel.details,
            type: res.hlpservicelevel.type,
            typedesc: res.hlpservicelevel.typedesc,
            category: res.hlpservicelevel.category,
            categorydesc: res.hlpservicelevel.categorydesc,
            serviceid: res.hlpservicelevel.serviceid,
            purpose: res.hlpservicelevel.purpose,
            scope: res.hlpservicelevel.scope,
            responsibilities: res.hlpservicelevel.responsibilities,
            criticality: res.hlpservicelevel.criticality,
            objectives: res.hlpservicelevel.objectives,
            communications: res.hlpservicelevel.communications,
            measurements: res.hlpservicelevel.measurements,
            escalationrule: res.hlpservicelevel.escalationrule,
            isdefault: res.hlpservicelevel.isdefault,
            holidaylistid: res.hlpservicelevel.holidaylistid,
            holidaylistiddesc: res.hlpservicelevel.holidaylistiddesc,
            startdate: this.ngbDateParserFormatter.parse(res.hlpservicelevel.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.hlpservicelevel.enddate),
            supportcontacts: res.hlpservicelevel.supportcontacts,
            maxissues: res.hlpservicelevel.maxissues,
            knowledgebaseid: res.hlpservicelevel.knowledgebaseid,
            notes: JSON.parse(res.hlpservicelevel.notes),
            status: res.hlpservicelevel.status,
            statusdesc: res.hlpservicelevel.statusdesc,
            customfield: res.hlpservicelevel.customfield,
            attachment: JSON.parse(res.hlpservicelevel.attachment),
        });
        this.serviceidvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("serviceid") >= 0) this.serviceidvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("serviceid") >= 0) this.serviceidvisible = false;
        this.hlpservicelevel_menuactions = res.hlpservicelevel_menuactions;
        this.hlpslapriority_menuactions = res.hlpslapriority_menuactions;
        this.hlpslapriorities_visiblelist = res.hlpslapriorities_visiblelist;
        this.hlpslasupporthour_menuactions = res.hlpslasupporthour_menuactions;
        this.hlpslasupporthours_visiblelist = res.hlpslasupporthours_visiblelist;
        if (this.hlpservicelevel_Form.get('customfield').value != null && this.hlpservicelevel_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.hlpservicelevel_Form.get('customfield').value);
        this.FillCustomField();
        if (this.hlpservicelevel_Form.get('attachment').value != null && this.hlpservicelevel_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.hlpservicelevel_Form.get('attachment').value);
        //Child Tables if any
        this.Set_hlpslapriorities_TableConfig();
        this.hlpslapriorities_LoadTable(res.hlpslapriorities);
        this.Set_hlpslasupporthours_TableConfig();
        this.hlpslasupporthours_LoadTable(res.hlpslasupporthours);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.hlpservicelevel_Form.controls) {
            let val = this.hlpservicelevel_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.hlpservicelevel_Form.controls[key] != null) {
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
        if (!this.hlpservicelevel_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hlpservicelevel_Form.getRawValue();
        obj.startdate = new Date(this.hlpservicelevel_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevel_Form.get('startdate').value) + '  UTC' : null);
        obj.enddate = new Date(this.hlpservicelevel_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevel_Form.get('enddate').value) + '  UTC' : null);
        if (this.hlpservicelevel_Form.get('notes').value != null) obj.notes = JSON.stringify(this.hlpservicelevel_Form.get('notes').value);
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
        // Object.keys(this.hlpservicelevel_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.hlpservicelevel_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.hlpservicelevel_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.hlpservicelevel_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.hlpservicelevel_Form.controls[key] != null) {
                        this.formData[key] = this.hlpservicelevel_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.startdate = new Date(this.hlpservicelevel_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevel_Form.get('startdate').value) + '  UTC' : null);
        this.formData.enddate = new Date(this.hlpservicelevel_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevel_Form.get('enddate').value) + '  UTC' : null);
        if (this.hlpservicelevel_Form.get('notes').value != null) this.formData.notes = JSON.stringify(this.hlpservicelevel_Form.get('notes').value);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_hlpslapriority_IDs = this.Deleted_hlpslapriority_IDs;
        this.formData.Deleted_hlpslasupporthour_IDs = this.Deleted_hlpslasupporthour_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.hlpservicelevel_service.saveOrUpdate_hlpservicelevels(this.formData, this.tbl_hlpslapriorities?.source?.data, this.tbl_hlpslasupporthours?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_hlpslapriorities.source) {
                    for (let i = 0; i < this.tbl_hlpslapriorities.source.data.length; i++) {
                        if (this.tbl_hlpslapriorities.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_hlpslapriorities.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_hlpslasupporthours.source) {
                    for (let i = 0; i < this.tbl_hlpslasupporthours.source.data.length; i++) {
                        if (this.tbl_hlpslasupporthours.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_hlpslasupporthours.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).hlpservicelevel);
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
                        this.objvalues.push((res as any).hlpservicelevel);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.hlpservicelevel_Form.markAsUntouched();
                this.hlpservicelevel_Form.markAsPristine();
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
        this.tbl_hlpslapriorities.source = new LocalDataSource();
        this.tbl_hlpslasupporthours.source = new LocalDataSource();
    }

    AddOrEdit_hlpslapriority(event: any, servicelevelpriorityid: any, servicelevelid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(hlpslapriorityComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, servicelevelpriorityid, servicelevelid, visiblelist: this.hlpslapriorities_visiblelist, hidelist: this.hlpslapriorities_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_hlpslapriorities.source.add(res[i]);
                    }
                    this.tbl_hlpslapriorities.source.refresh();
                }
                else {
                    this.tbl_hlpslapriorities.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_hlpslapriority(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_hlpslapriority_IDs += childID + ",";
        this.tbl_hlpslapriorities.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_hlpslasupporthour(event: any, supportid: any, servicelevelid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(hlpslasupporthourComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, supportid, servicelevelid, visiblelist: this.hlpslasupporthours_visiblelist, hidelist: this.hlpslasupporthours_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_hlpslasupporthours.source.add(res[i]);
                    }
                    this.tbl_hlpslasupporthours.source.refresh();
                }
                else {
                    this.tbl_hlpslasupporthours.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_hlpslasupporthour(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_hlpslasupporthour_IDs += childID + ",";
        this.tbl_hlpslasupporthours.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes hlpslapriorities
    hlpslapriorities_settings: any;

    show_hlpslapriorities_Checkbox() {
        debugger;
        if (this.tbl_hlpslapriorities.source.settings['selectMode'] == 'multi') this.tbl_hlpslapriorities.source.settings['selectMode'] = 'single';
        else
            this.tbl_hlpslapriorities.source.settings['selectMode'] = 'multi';
        this.tbl_hlpslapriorities.source.initGrid();
    }
    delete_hlpslapriorities_All() {
        this.tbl_hlpslapriorities.source.settings['selectMode'] = 'single';
    }
    show_hlpslapriorities_Filter() {
        setTimeout(() => {
            //  this.Set_hlpslapriorities_TableDropDownConfig();
        });
        if (this.tbl_hlpslapriorities.source.settings != null) this.tbl_hlpslapriorities.source.settings['hideSubHeader'] = !this.tbl_hlpslapriorities.source.settings['hideSubHeader'];
        this.tbl_hlpslapriorities.source.initGrid();
    }
    show_hlpslapriorities_InActive() {
    }
    enable_hlpslapriorities_InActive() {
    }
    async Set_hlpslapriorities_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_hlpslapriorities) {

            var clone = this.sharedService.clone(this.tbl_hlpslapriorities.source.settings);
            if (clone.columns['priorityid'] != undefined) clone.columns['priorityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpslapriorities_priorityid.value)), }, };
            if (clone.columns['priorityid'] != undefined) clone.columns['priorityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpslapriorities_priorityid.value)), }, };
            this.tbl_hlpslapriorities.source.settings = clone;
            this.tbl_hlpslapriorities.source.initGrid();
        }
        this.bfilterPopulate_hlpslapriorities = true;
    }
    async hlpslapriorities_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_hlpslapriorities_TableConfig() {
        this.hlpslapriorities_settings = {
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
                custom: this.hlpslapriority_menuactions
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
                priorityiddesc: {
                    title: 'Priority',
                    type: 'html',
                    filter: true,
                },
                responseduration: {
                    title: 'Response Duration',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
                resolutionduration: {
                    title: 'Resolution Duration',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
            },
        };
    }
    hlpslapriorities_LoadTable(hlpslapriorities = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpslapriorities_ID) >= 0) {
            if (this.tbl_hlpslapriorities != undefined) this.tbl_hlpslapriorities.source = new LocalDataSource();
            if (this.tbl_hlpslapriorities != undefined) this.tbl_hlpslapriorities.source.load(hlpslapriorities as any as LocalDataSource);
            if (this.tbl_hlpslapriorities != undefined) this.tbl_hlpslapriorities.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    hlpslapriorities_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.hlpservicelevel_service.hlpslapriorities.length == 0)
    {
        this.tbl_hlpslapriorities.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new hlpslapriority();
        this.hlpservicelevel_service.hlpslapriorities.push(obj);
        this.tbl_hlpslapriorities.source.refresh();
        if ((this.hlpservicelevel_service.hlpslapriorities.length / this.tbl_hlpslapriorities.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_hlpslapriorities.source.getPaging().page)
        {
            this.tbl_hlpslapriorities.source.setPage((this.hlpservicelevel_service.hlpslapriorities.length / this.tbl_hlpslapriorities.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_hlpslapriorities.source.grid.edit(this.tbl_hlpslapriorities.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_hlpslapriorities.source.data.indexOf(event.data);
    this.onDelete_hlpslapriority(event,event.data.servicelevelpriorityid,((this.tbl_hlpslapriorities.source.getPaging().page-1) *this.tbl_hlpslapriorities.source.getPaging().perPage)+index);
    this.tbl_hlpslapriorities.source.refresh();
    break;
    }
    }
    
    */
    hlpslapriorities_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_hlpslapriority(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_hlpslapriority(event, event.data.servicelevelpriorityid, this.formid);
                break;
            case 'delete':
                this.onDelete_hlpslapriority(event, event.data.servicelevelpriorityid, ((this.tbl_hlpslapriorities.source.getPaging().page - 1) * this.tbl_hlpslapriorities.source.getPaging().perPage) + event.index);
                this.tbl_hlpslapriorities.source.refresh();
                break;
        }
    }
    hlpslapriorities_onDelete(obj) {
        let servicelevelpriorityid = obj.data.servicelevelpriorityid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpservicelevel_service.delete_hlpservicelevel(servicelevelpriorityid).then(res =>
                this.hlpslapriorities_LoadTable()
            );
        }
    }
    async onCustom_hlpslapriorities_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "hlpslapriorities");
        let formname = (objbomenuaction as any).actionname;




    }
    hlpslapriorities_Paging(val) {
        debugger;
        this.tbl_hlpslapriorities.source.setPaging(1, val, true);
    }

    handle_hlpslapriorities_GridSelected(event: any) {
        this.hlpslapriorities_selectedindex = this.tbl_hlpslapriorities.source.findIndex(i => i.servicelevelpriorityid === event.data.servicelevelpriorityid);
    }
    Is_hlpslapriorities_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpslapriorities_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hlpslapriorities
    //start of Grid Codes hlpslasupporthours
    hlpslasupporthours_settings: any;

    show_hlpslasupporthours_Checkbox() {
        debugger;
        if (this.tbl_hlpslasupporthours.source.settings['selectMode'] == 'multi') this.tbl_hlpslasupporthours.source.settings['selectMode'] = 'single';
        else
            this.tbl_hlpslasupporthours.source.settings['selectMode'] = 'multi';
        this.tbl_hlpslasupporthours.source.initGrid();
    }
    delete_hlpslasupporthours_All() {
        this.tbl_hlpslasupporthours.source.settings['selectMode'] = 'single';
    }
    show_hlpslasupporthours_Filter() {
        setTimeout(() => {
            //  this.Set_hlpslasupporthours_TableDropDownConfig();
        });
        if (this.tbl_hlpslasupporthours.source.settings != null) this.tbl_hlpslasupporthours.source.settings['hideSubHeader'] = !this.tbl_hlpslasupporthours.source.settings['hideSubHeader'];
        this.tbl_hlpslasupporthours.source.initGrid();
    }
    show_hlpslasupporthours_InActive() {
    }
    enable_hlpslasupporthours_InActive() {
    }
    async Set_hlpslasupporthours_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_hlpslasupporthours) {

            var clone = this.sharedService.clone(this.tbl_hlpslasupporthours.source.settings);
            if (clone.columns['weekday'] != undefined) clone.columns['weekday'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpslasupporthours_weekday.value)), }, };
            if (clone.columns['weekday'] != undefined) clone.columns['weekday'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpslasupporthours_weekday.value)), }, };
            this.tbl_hlpslasupporthours.source.settings = clone;
            this.tbl_hlpslasupporthours.source.initGrid();
        }
        this.bfilterPopulate_hlpslasupporthours = true;
    }
    async hlpslasupporthours_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_hlpslasupporthours_TableConfig() {
        this.hlpslasupporthours_settings = {
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
                custom: this.hlpslasupporthour_menuactions
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
                weekdaydesc: {
                    title: 'Week Day',
                    type: 'html',
                    filter: true,
                },
                starttime: {
                    title: 'Start Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                endtime: {
                    title: 'End Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
            },
        };
    }
    hlpslasupporthours_LoadTable(hlpslasupporthours = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpslasupporthours_ID) >= 0) {
            if (this.tbl_hlpslasupporthours != undefined) this.tbl_hlpslasupporthours.source = new LocalDataSource();
            if (this.tbl_hlpslasupporthours != undefined) this.tbl_hlpslasupporthours.source.load(hlpslasupporthours as any as LocalDataSource);
            if (this.tbl_hlpslasupporthours != undefined) this.tbl_hlpslasupporthours.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    hlpslasupporthours_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.hlpservicelevel_service.hlpslasupporthours.length == 0)
    {
        this.tbl_hlpslasupporthours.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new hlpslasupporthour();
        this.hlpservicelevel_service.hlpslasupporthours.push(obj);
        this.tbl_hlpslasupporthours.source.refresh();
        if ((this.hlpservicelevel_service.hlpslasupporthours.length / this.tbl_hlpslasupporthours.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_hlpslasupporthours.source.getPaging().page)
        {
            this.tbl_hlpslasupporthours.source.setPage((this.hlpservicelevel_service.hlpslasupporthours.length / this.tbl_hlpslasupporthours.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_hlpslasupporthours.source.grid.edit(this.tbl_hlpslasupporthours.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_hlpslasupporthours.source.data.indexOf(event.data);
    this.onDelete_hlpslasupporthour(event,event.data.supportid,((this.tbl_hlpslasupporthours.source.getPaging().page-1) *this.tbl_hlpslasupporthours.source.getPaging().perPage)+index);
    this.tbl_hlpslasupporthours.source.refresh();
    break;
    }
    }
    
    */
    hlpslasupporthours_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_hlpslasupporthour(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_hlpslasupporthour(event, event.data.supportid, this.formid);
                break;
            case 'delete':
                this.onDelete_hlpslasupporthour(event, event.data.supportid, ((this.tbl_hlpslasupporthours.source.getPaging().page - 1) * this.tbl_hlpslasupporthours.source.getPaging().perPage) + event.index);
                this.tbl_hlpslasupporthours.source.refresh();
                break;
        }
    }
    hlpslasupporthours_onDelete(obj) {
        let supportid = obj.data.supportid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpservicelevel_service.delete_hlpservicelevel(supportid).then(res =>
                this.hlpslasupporthours_LoadTable()
            );
        }
    }
    async onCustom_hlpslasupporthours_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "hlpslasupporthours");
        let formname = (objbomenuaction as any).actionname;




    }
    hlpslasupporthours_Paging(val) {
        debugger;
        this.tbl_hlpslasupporthours.source.setPaging(1, val, true);
    }

    handle_hlpslasupporthours_GridSelected(event: any) {
        this.hlpslasupporthours_selectedindex = this.tbl_hlpslasupporthours.source.findIndex(i => i.supportid === event.data.supportid);
    }
    Is_hlpslasupporthours_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpslasupporthours_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hlpslasupporthours

}



