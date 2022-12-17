import { boreportService } from './../../../service/boreport.service';
import { boreport } from './../../../model/boreport.model';
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
import { boreportdetail } from './../../../model/boreportdetail.model';
import { boreportdetailComponent } from './../../../pages/forms/boreportdetail/boreportdetail.component';
import { boreportdetailService } from './../../../service/boreportdetail.service';
import { boreportothertable } from './../../../model/boreportothertable.model';
import { boreportothertableComponent } from './../../../pages/forms/boreportothertable/boreportothertable.component';
import { boreportothertableService } from './../../../service/boreportothertable.service';
import { boreportcolumn } from './../../../model/boreportcolumn.model';
import { boreportcolumnComponent } from './../../../pages/forms/boreportcolumn/boreportcolumn.component';
import { boreportcolumnService } from './../../../service/boreportcolumn.service';
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
    selector: 'app-boreport',
    templateUrl: './boreport.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boreportComponent implements OnInit {
    formData: boreport;
    list: boreport[];
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

    bfilterPopulate_boreports: boolean = false;
    bfilterPopulate_boreportdetails: boolean = false;
    bfilterPopulate_boreportothertables: boolean = false;
    bfilterPopulate_boreportcolumns: boolean = false;
    boreport_menuactions: any = []
    boreportdetail_menuactions: any = []
    @ViewChild('tbl_boreportdetails', { static: false }) tbl_boreportdetails: Ng2SmartTableComponent;
    boreportothertable_menuactions: any = []
    @ViewChild('tbl_boreportothertables', { static: false }) tbl_boreportothertables: Ng2SmartTableComponent;
    boreportcolumn_menuactions: any = []
    @ViewChild('tbl_boreportcolumns', { static: false }) tbl_boreportcolumns: Ng2SmartTableComponent;

    boreport_Form: FormGroup;

    reportmodule_List: DropDownValues[];
    reporttype_List: DropDownValues[];
    datefiltertype_List: DropDownValues[];
    groupbyrelationship_List: DropDownValues[];
    jointype_List: DropDownValues[];
    reportoutputtype_List: DropDownValues[];
    viewhtmltype_List: DropDownValues[];
    workflowhtmltype_List: DropDownValues[];
    recordtype_List: DropDownValues[];
    dashboardid_List: DropDownValues[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    boreportdetails_visiblelist: any;
    boreportdetails_hidelist: any;
    boreportothertables_visiblelist: any;
    boreportothertables_hidelist: any;
    boreportcolumns_visiblelist: any;
    boreportcolumns_hidelist: any;

    Deleted_boreportdetail_IDs: string = "";
    boreportdetails_ID: string = "1";
    boreportdetails_selectedindex: any;
    Deleted_boreportothertable_IDs: string = "";
    boreportothertables_ID: string = "2";
    boreportothertables_selectedindex: any;
    Deleted_boreportcolumn_IDs: string = "";
    boreportcolumns_ID: string = "3";
    boreportcolumns_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boreport_service: boreportService,
        private boreportdetail_service: boreportdetailService,
        private boreportothertable_service: boreportothertableService,
        private boreportcolumn_service: boreportcolumnService,
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
        this.boreport_Form = this.fb.group({
            reportid: [null],
            reportcode: [null],
            actionkey:[null],
            reportname: [null],
            reportmodule: [null],
            reportmoduledesc: [null],
            reporttype: [null],
            reporttypedesc: [null],
            columns: [null],
            sidefilter: [null],
            sidefilters: [null],
            maintablename: [null],
            maintablealias: [null],
            maintableidentityfield: [null],
            pk: [null],
            query: [null],
            wherecondition: [null],
            cardtype: [null],
            html: [null],
            calendar: [null],
            kanbanview: [null],
            kanbankey: [null],
            datefilter: [null],
            datefiltercolumnname: [null],
            datefiltertype: [null],
            datefiltertypedesc: [null],
            groupby: [null],
            groupbytext: [null],
            groupby2: [null],
            groupby2text: [null],
            groupbyrelationship: [null],
            groupbyrelationshipdesc: [null],
            sortby1: [null],
            sortby2: [null],
            sortby3: [null],
            parentid: [null],
            parentdescription: [null],
            detailtablename: [null],
            detailtablealias: [null],
            jointype: [null],
            jointypedesc: [null],
            detailtableidentityfield: [null],
            detailtablefk: [null],
            detailtableconcatenate: [null],
            detailtableheader: [null],
            detailtablefooter: [null],
            detailtablequery: [null],
            masterdetailwhere: [null],
            numrows: [null],
            reportoutputtype: [null],
            reportoutputtypedesc: [null],
            noheader: [null],
            header: [null],
            footer: [null],
            headerquery: [null],
            footerquery: [null],
            headerquery1: [null],
            footerquery1: [null],
            headerquery2: [null],
            footerquery2: [null],
            headerquery3: [null],
            footerquery3: [null],
            headerquery4: [null],
            footerquery4: [null],
            headerquery5: [null],
            footerquery5: [null],
            header1: [null],
            footer1: [null],
            header2: [null],
            footer2: [null],
            header3: [null],
            footer3: [null],
            header4: [null],
            footer4: [null],
            header5: [null],
            footer5: [null],
            status: [null],
            statusdesc: [null],
            css: [null],
            viewhtmltype: [null],
            viewhtmltypedesc: [null],
            viewhtml: [null],
            viewcss: [null],
            reporthtml: [null],
            workflowhtmltype: [null],
            workflowhtmltypedesc: [null],
            workflowhtml: [null],
            component: [null],
            alternateview: [null],
            recordtype: [null],
            recordtypedesc: [null],
            userfield: [null],
            employeefield: [null],
            userfiltertype: [null],
            rolefield: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            tableheader: [null],
            reportjsondata: [null],
            helptext: [null],
            filters: [null],
            filtercolumns: [null],
        });
    }

    get f() { return this.boreport_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boreport_Form.dirty && this.boreport_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.reportid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.reportid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.reportid && pkDetail) {
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
        let boreportid = null;

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
        this.formid = boreportid;
        //alert(boreportid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_boreportdetails_TableConfig();
            setTimeout(() => {
                //this.Set_boreportdetails_TableDropDownConfig();
            });

            this.Set_boreportothertables_TableConfig();
            setTimeout(() => {
                //this.Set_boreportothertables_TableDropDownConfig();
            });

            this.Set_boreportcolumns_TableConfig();
            setTimeout(() => {
                //this.Set_boreportcolumns_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boreport_service.getDefaultData().then(res => {
            this.reportmodule_List = res.list_reportmodule.value;
            this.reporttype_List = res.list_reporttype.value;
            this.datefiltertype_List = res.list_datefiltertype.value;
            this.groupbyrelationship_List = res.list_groupbyrelationship.value;
            this.jointype_List = res.list_jointype.value;
            this.reportoutputtype_List = res.list_reportoutputtype.value;
            this.viewhtmltype_List = res.list_viewhtmltype.value;
            this.workflowhtmltype_List = res.list_workflowhtmltype.value;
            this.recordtype_List = res.list_recordtype.value;
            this.dashboardid_List = res.list_dashboardid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boreport_service.get_boreports_List().then(res => {
            this.pkList = res as boreport[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boreport_Form.markAsUntouched();
        this.boreport_Form.markAsPristine();
    }
    onSelected_dashboardid(dashboardidDetail: any) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.boreport_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.boreport_Form != null)
            this.boreport_Form.reset();
        this.boreport_Form.patchValue({
        });
        setTimeout(() => {
            this.boreportdetails_LoadTable();
            this.boreportothertables_LoadTable();
            this.boreportcolumns_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let reportid = this.boreport_Form.get('reportid').value;
        if (reportid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boreport_service.delete_boreport(reportid).then(res => {
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
        this.boreport_Form.patchValue({
            reportid: null
        });
        if (this.formData.reportid != null) this.formData.reportid = null;
        for (let i = 0; i < this.tbl_boreportdetails.source.length; i++) {
            this.tbl_boreportdetails.source[i].reportdetailid = null;
        }
        for (let i = 0; i < this.tbl_boreportothertables.source.length; i++) {
            this.tbl_boreportothertables.source[i].othertableid = null;
        }
        for (let i = 0; i < this.tbl_boreportcolumns.source.length; i++) {
            this.tbl_boreportcolumns.source[i].reportcolumnid = null;
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
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreport_Form.controls[key] != undefined) {
                                this.boreport_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    reportmodule_onChange(evt: any) {
        let e = this.f.reportmodule.value as any;
        this.boreport_Form.patchValue({ reportmoduledesc: evt.options[evt.options.selectedIndex].text });
    }
    reporttype_onChange(evt: any) {
        let e = this.f.reporttype.value as any;
        this.boreport_Form.patchValue({ reporttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    datefiltertype_onChange(evt: any) {
        let e = this.f.datefiltertype.value as any;
        this.boreport_Form.patchValue({ datefiltertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    groupbyrelationship_onChange(evt: any) {
        let e = this.f.groupbyrelationship.value as any;
        this.boreport_Form.patchValue({ groupbyrelationshipdesc: evt.options[evt.options.selectedIndex].text });
    }
    jointype_onChange(evt: any) {
        let e = this.f.jointype.value as any;
        this.boreport_Form.patchValue({ jointypedesc: evt.options[evt.options.selectedIndex].text });
    }
    reportoutputtype_onChange(evt: any) {
        let e = this.f.reportoutputtype.value as any;
        this.boreport_Form.patchValue({ reportoutputtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    viewhtmltype_onChange(evt: any) {
        let e = this.f.viewhtmltype.value as any;
        this.boreport_Form.patchValue({ viewhtmltypedesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowhtmltype_onChange(evt: any) {
        let e = this.f.workflowhtmltype.value as any;
        this.boreport_Form.patchValue({ workflowhtmltypedesc: evt.options[evt.options.selectedIndex].text });
    }
    recordtype_onChange(evt: any) {
        let e = this.f.recordtype.value as any;
        this.boreport_Form.patchValue({ recordtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    dashboardid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_boreports() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boreport_service.get_boreports_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boreport;
            let formproperty = res.boreport.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boreport.pkcol;
            this.formid = res.boreport.reportid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boreport;
        this.formid = res.boreport.reportid;
        this.pkcol = res.boreport.pkcol;
        this.bmyrecord = false;
        if ((res.boreport as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boreport_Form.patchValue({
            reportid: res.boreport.reportid,
            reportcode: res.boreport.reportcode,
            actionkey: res.boreport.actionkey,
            reportname: res.boreport.reportname,
            reportmodule: res.boreport.reportmodule,
            reportmoduledesc: res.boreport.reportmoduledesc,
            reporttype: res.boreport.reporttype,
            reporttypedesc: res.boreport.reporttypedesc,
            columns: res.boreport.columns,
            sidefilter: res.boreport.sidefilter,
            sidefilters: res.boreport.sidefilters,
            maintablename: res.boreport.maintablename,
            maintablealias: res.boreport.maintablealias,
            maintableidentityfield: res.boreport.maintableidentityfield,
            pk: res.boreport.pk,
            query: res.boreport.query,
            wherecondition: res.boreport.wherecondition,
            cardtype: res.boreport.cardtype,
            html: res.boreport.html,
            calendar: res.boreport.calendar,
            kanbanview: res.boreport.kanbanview,
            kanbankey: res.boreport.kanbankey,
            datefilter: res.boreport.datefilter,
            datefiltercolumnname: res.boreport.datefiltercolumnname,
            datefiltertype: res.boreport.datefiltertype,
            datefiltertypedesc: res.boreport.datefiltertypedesc,
            groupby: res.boreport.groupby,
            groupbytext: res.boreport.groupbytext,
            groupby2: res.boreport.groupby2,
            groupby2text: res.boreport.groupby2text,
            groupbyrelationship: res.boreport.groupbyrelationship,
            groupbyrelationshipdesc: res.boreport.groupbyrelationshipdesc,
            sortby1: res.boreport.sortby1,
            sortby2: res.boreport.sortby2,
            sortby3: res.boreport.sortby3,
            parentid: res.boreport.parentid,
            parentdescription: res.boreport.parentdescription,
            detailtablename: res.boreport.detailtablename,
            detailtablealias: res.boreport.detailtablealias,
            jointype: res.boreport.jointype,
            jointypedesc: res.boreport.jointypedesc,
            detailtableidentityfield: res.boreport.detailtableidentityfield,
            detailtablefk: res.boreport.detailtablefk,
            detailtableconcatenate: res.boreport.detailtableconcatenate,
            detailtableheader: res.boreport.detailtableheader,
            detailtablefooter: res.boreport.detailtablefooter,
            detailtablequery: res.boreport.detailtablequery,
            masterdetailwhere: res.boreport.masterdetailwhere,
            numrows: res.boreport.numrows,
            reportoutputtype: res.boreport.reportoutputtype,
            reportoutputtypedesc: res.boreport.reportoutputtypedesc,
            noheader: res.boreport.noheader,
            header: res.boreport.header,
            footer: res.boreport.footer,
            headerquery: res.boreport.headerquery,
            footerquery: res.boreport.footerquery,
            headerquery1: res.boreport.headerquery1,
            footerquery1: res.boreport.footerquery1,
            headerquery2: res.boreport.headerquery2,
            footerquery2: res.boreport.footerquery2,
            headerquery3: res.boreport.headerquery3,
            footerquery3: res.boreport.footerquery3,
            headerquery4: res.boreport.headerquery4,
            footerquery4: res.boreport.footerquery4,
            headerquery5: res.boreport.headerquery5,
            footerquery5: res.boreport.footerquery5,
            header1: res.boreport.header1,
            footer1: res.boreport.footer1,
            header2: res.boreport.header2,
            footer2: res.boreport.footer2,
            header3: res.boreport.header3,
            footer3: res.boreport.footer3,
            header4: res.boreport.header4,
            footer4: res.boreport.footer4,
            header5: res.boreport.header5,
            footer5: res.boreport.footer5,
            status: res.boreport.status,
            statusdesc: res.boreport.statusdesc,
            css: res.boreport.css,
            viewhtmltype: res.boreport.viewhtmltype,
            viewhtmltypedesc: res.boreport.viewhtmltypedesc,
            viewhtml: res.boreport.viewhtml,
            viewcss: res.boreport.viewcss,
            reporthtml: res.boreport.reporthtml,
            workflowhtmltype: res.boreport.workflowhtmltype,
            workflowhtmltypedesc: res.boreport.workflowhtmltypedesc,
            workflowhtml: res.boreport.workflowhtml,
            component: res.boreport.component,
            alternateview: res.boreport.alternateview,
            recordtype: res.boreport.recordtype,
            recordtypedesc: res.boreport.recordtypedesc,
            userfield: res.boreport.userfield,
            employeefield: res.boreport.employeefield,
            userfiltertype: res.boreport.userfiltertype,
            rolefield: res.boreport.rolefield,
            dashboardid: res.boreport.dashboardid,
            dashboardiddesc: res.boreport.dashboardiddesc,
            tableheader: res.boreport.tableheader,
            reportjsondata: res.boreport.reportjsondata,
            helptext: res.boreport.helptext,
            filters: res.boreport.filters,
            filtercolumns: res.boreport.filtercolumns,
        });
        this.boreport_menuactions = res.boreport_menuactions;
        this.boreportdetail_menuactions = res.boreportdetail_menuactions;
        this.boreportdetails_visiblelist = res.boreportdetails_visiblelist;
        this.boreportothertable_menuactions = res.boreportothertable_menuactions;
        this.boreportothertables_visiblelist = res.boreportothertables_visiblelist;
        this.boreportcolumn_menuactions = res.boreportcolumn_menuactions;
        this.boreportcolumns_visiblelist = res.boreportcolumns_visiblelist;
        //Child Tables if any
        this.Set_boreportdetails_TableConfig();
        this.boreportdetails_LoadTable(res.boreportdetails);
        this.Set_boreportothertables_TableConfig();
        this.boreportothertables_LoadTable(res.boreportothertables);
        this.Set_boreportcolumns_TableConfig();
        this.boreportcolumns_LoadTable(res.boreportcolumns);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boreport_Form.controls) {
            let val = this.boreport_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boreport_Form.controls[key] != null) {
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
        if (!this.boreport_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boreport_Form.getRawValue();
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
        // Object.keys(this.boreport_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boreport_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boreport_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boreport_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boreport_Form.controls[key] != null) {
                        this.formData[key] = this.boreport_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_boreportdetail_IDs = this.Deleted_boreportdetail_IDs;
        this.formData.Deleted_boreportothertable_IDs = this.Deleted_boreportothertable_IDs;
        this.formData.Deleted_boreportcolumn_IDs = this.Deleted_boreportcolumn_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.boreport_service.saveOrUpdate_boreports(this.formData, this.tbl_boreportdetails?.source?.data, this.tbl_boreportothertables?.source?.data, this.tbl_boreportcolumns?.source?.data,).subscribe(
            async res => {
                if (this.tbl_boreportdetails.source) {
                    for (let i = 0; i < this.tbl_boreportdetails.source.data.length; i++) {
                        if (this.tbl_boreportdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boreportdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boreportothertables.source) {
                    for (let i = 0; i < this.tbl_boreportothertables.source.data.length; i++) {
                        if (this.tbl_boreportothertables.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boreportothertables.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boreportcolumns.source) {
                    for (let i = 0; i < this.tbl_boreportcolumns.source.data.length; i++) {
                        if (this.tbl_boreportcolumns.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boreportcolumns.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boreport);
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
                        this.objvalues.push((res as any).boreport);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boreport_Form.markAsUntouched();
                this.boreport_Form.markAsPristine();
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
        this.tbl_boreportdetails.source = new LocalDataSource();
        this.tbl_boreportothertables.source = new LocalDataSource();
        this.tbl_boreportcolumns.source = new LocalDataSource();
    }

    AddOrEdit_boreportdetail(event: any, reportdetailid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boreportdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportdetailid, reportid, visiblelist: this.boreportdetails_visiblelist, hidelist: this.boreportdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportdetails.source.add(res[i]);
                    }
                    this.tbl_boreportdetails.source.refresh();
                }
                else {
                    this.tbl_boreportdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportdetail_IDs += childID + ",";
        this.tbl_boreportdetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boreportothertable(event: any, othertableid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boreportothertableComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, othertableid, reportid, visiblelist: this.boreportothertables_visiblelist, hidelist: this.boreportothertables_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportothertables.source.add(res[i]);
                    }
                    this.tbl_boreportothertables.source.refresh();
                }
                else {
                    this.tbl_boreportothertables.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportothertable(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportothertable_IDs += childID + ",";
        this.tbl_boreportothertables.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boreportcolumn(event: any, reportcolumnid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boreportcolumnComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportcolumnid, reportid, visiblelist: this.boreportcolumns_visiblelist, hidelist: this.boreportcolumns_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportcolumns.source.add(res[i]);
                    }
                    this.tbl_boreportcolumns.source.refresh();
                }
                else {
                    this.tbl_boreportcolumns.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportcolumn(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportcolumn_IDs += childID + ",";
        this.tbl_boreportcolumns.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    MakeAllHide() {
        /*for(let i=0;i<this.boreportservice.boreportcolumns.length;i++)
        {
            this.boreportservice.boreportcolumns[i].hide=true;
        }
        */
        this.onSubmitData(false);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boreportdetails
    boreportdetails_settings: any;

    show_boreportdetails_Checkbox() {
        debugger;
        if (this.tbl_boreportdetails.source.settings['selectMode'] == 'multi') this.tbl_boreportdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportdetails.source.settings['selectMode'] = 'multi';
        this.tbl_boreportdetails.source.initGrid();
    }
    delete_boreportdetails_All() {
        this.tbl_boreportdetails.source.settings['selectMode'] = 'single';
    }
    show_boreportdetails_Filter() {
        setTimeout(() => {
            //  this.Set_boreportdetails_TableDropDownConfig();
        });
        if (this.tbl_boreportdetails.source.settings != null) this.tbl_boreportdetails.source.settings['hideSubHeader'] = !this.tbl_boreportdetails.source.settings['hideSubHeader'];
        this.tbl_boreportdetails.source.initGrid();
    }
    show_boreportdetails_InActive() {
    }
    enable_boreportdetails_InActive() {
    }
    async Set_boreportdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boreportdetails) {

            var clone = this.sharedService.clone(this.tbl_boreportdetails.source.settings);
            if (clone.columns['separator'] != undefined) clone.columns['separator'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportdetails_separator.value)), }, };
            if (clone.columns['separator'] != undefined) clone.columns['separator'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportdetails_separator.value)), }, };
            this.tbl_boreportdetails.source.settings = clone;
            this.tbl_boreportdetails.source.initGrid();
        }
        this.bfilterPopulate_boreportdetails = true;
    }
    async boreportdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boreportdetails_TableConfig() {
        this.boreportdetails_settings = {
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
                custom: this.boreportdetail_menuactions
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
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                formula: {
                    title: 'Formula',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                separatordesc: {
                    title: 'Separator',
                    type: 'html',
                    filter: true,
                },
                header: {
                    title: 'Header',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                footer: {
                    title: 'Footer',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                wherecondition: {
                    title: 'Where Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                alias: {
                    title: 'Alias',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    boreportdetails_LoadTable(boreportdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0) {
            if (this.tbl_boreportdetails != undefined) this.tbl_boreportdetails.source = new LocalDataSource();
            if (this.tbl_boreportdetails != undefined) this.tbl_boreportdetails.source.load(boreportdetails as any as LocalDataSource);
            if (this.tbl_boreportdetails != undefined) this.tbl_boreportdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boreportdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportdetails.length == 0)
    {
        this.tbl_boreportdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportdetail();
        this.boreport_service.boreportdetails.push(obj);
        this.tbl_boreportdetails.source.refresh();
        if ((this.boreport_service.boreportdetails.length / this.tbl_boreportdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportdetails.source.getPaging().page)
        {
            this.tbl_boreportdetails.source.setPage((this.boreport_service.boreportdetails.length / this.tbl_boreportdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportdetails.source.grid.edit(this.tbl_boreportdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportdetails.source.data.indexOf(event.data);
    this.onDelete_boreportdetail(event,event.data.reportdetailid,((this.tbl_boreportdetails.source.getPaging().page-1) *this.tbl_boreportdetails.source.getPaging().perPage)+index);
    this.tbl_boreportdetails.source.refresh();
    break;
    }
    }
    
    */
    boreportdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boreportdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportdetail(event, event.data.reportdetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportdetail(event, event.data.reportdetailid, ((this.tbl_boreportdetails.source.getPaging().page - 1) * this.tbl_boreportdetails.source.getPaging().perPage) + event.index);
                this.tbl_boreportdetails.source.refresh();
                break;
        }
    }
    boreportdetails_onDelete(obj) {
        let reportdetailid = obj.data.reportdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(reportdetailid).then(res =>
                this.boreportdetails_LoadTable()
            );
        }
    }
    async onCustom_boreportdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportdetails");
        let formname = (objbomenuaction as any).actionname;




    }
    boreportdetails_Paging(val) {
        debugger;
        this.tbl_boreportdetails.source.setPaging(1, val, true);
    }

    handle_boreportdetails_GridSelected(event: any) {
        this.boreportdetails_selectedindex = this.tbl_boreportdetails.source.findIndex(i => i.reportdetailid === event.data.reportdetailid);
    }
    Is_boreportdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boreportdetails
    //start of Grid Codes boreportothertables
    boreportothertables_settings: any;

    show_boreportothertables_Checkbox() {
        debugger;
        if (this.tbl_boreportothertables.source.settings['selectMode'] == 'multi') this.tbl_boreportothertables.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportothertables.source.settings['selectMode'] = 'multi';
        this.tbl_boreportothertables.source.initGrid();
    }
    delete_boreportothertables_All() {
        this.tbl_boreportothertables.source.settings['selectMode'] = 'single';
    }
    show_boreportothertables_Filter() {
        setTimeout(() => {
            //  this.Set_boreportothertables_TableDropDownConfig();
        });
        if (this.tbl_boreportothertables.source.settings != null) this.tbl_boreportothertables.source.settings['hideSubHeader'] = !this.tbl_boreportothertables.source.settings['hideSubHeader'];
        this.tbl_boreportothertables.source.initGrid();
    }
    show_boreportothertables_InActive() {
    }
    enable_boreportothertables_InActive() {
    }
    async Set_boreportothertables_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boreportothertables) {

            var clone = this.sharedService.clone(this.tbl_boreportothertables.source.settings);
            if (clone.columns['jointype'] != undefined) clone.columns['jointype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportothertables_jointype.value)), }, };
            if (clone.columns['jointype'] != undefined) clone.columns['jointype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportothertables_jointype.value)), }, };
            this.tbl_boreportothertables.source.settings = clone;
            this.tbl_boreportothertables.source.initGrid();
        }
        this.bfilterPopulate_boreportothertables = true;
    }
    async boreportothertables_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boreportothertables_TableConfig() {
        this.boreportothertables_settings = {
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
                custom: this.boreportothertable_menuactions
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
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                tablealias: {
                    title: 'Table Alias',
                    type: '',
                    filter: true,
                },
                jointypedesc: {
                    title: 'Join Type',
                    type: 'html',
                    filter: true,
                },
                wherecondition: {
                    title: 'Where Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    boreportothertables_LoadTable(boreportothertables = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0) {
            if (this.tbl_boreportothertables != undefined) this.tbl_boreportothertables.source = new LocalDataSource();
            if (this.tbl_boreportothertables != undefined) this.tbl_boreportothertables.source.load(boreportothertables as any as LocalDataSource);
            if (this.tbl_boreportothertables != undefined) this.tbl_boreportothertables.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boreportothertables_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportothertables.length == 0)
    {
        this.tbl_boreportothertables.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportothertable();
        this.boreport_service.boreportothertables.push(obj);
        this.tbl_boreportothertables.source.refresh();
        if ((this.boreport_service.boreportothertables.length / this.tbl_boreportothertables.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportothertables.source.getPaging().page)
        {
            this.tbl_boreportothertables.source.setPage((this.boreport_service.boreportothertables.length / this.tbl_boreportothertables.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportothertables.source.grid.edit(this.tbl_boreportothertables.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportothertables.source.data.indexOf(event.data);
    this.onDelete_boreportothertable(event,event.data.othertableid,((this.tbl_boreportothertables.source.getPaging().page-1) *this.tbl_boreportothertables.source.getPaging().perPage)+index);
    this.tbl_boreportothertables.source.refresh();
    break;
    }
    }
    
    */
    boreportothertables_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boreportothertable(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportothertable(event, event.data.othertableid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportothertable(event, event.data.othertableid, ((this.tbl_boreportothertables.source.getPaging().page - 1) * this.tbl_boreportothertables.source.getPaging().perPage) + event.index);
                this.tbl_boreportothertables.source.refresh();
                break;
        }
    }
    boreportothertables_onDelete(obj) {
        let othertableid = obj.data.othertableid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(othertableid).then(res =>
                this.boreportothertables_LoadTable()
            );
        }
    }
    async onCustom_boreportothertables_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportothertables");
        let formname = (objbomenuaction as any).actionname;




    }
    boreportothertables_Paging(val) {
        debugger;
        this.tbl_boreportothertables.source.setPaging(1, val, true);
    }

    handle_boreportothertables_GridSelected(event: any) {
        this.boreportothertables_selectedindex = this.tbl_boreportothertables.source.findIndex(i => i.othertableid === event.data.othertableid);
    }
    Is_boreportothertables_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boreportothertables
    //start of Grid Codes boreportcolumns
    boreportcolumns_settings: any;

    show_boreportcolumns_Checkbox() {
        debugger;
        if (this.tbl_boreportcolumns.source.settings['selectMode'] == 'multi') this.tbl_boreportcolumns.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportcolumns.source.settings['selectMode'] = 'multi';
        this.tbl_boreportcolumns.source.initGrid();
    }
    delete_boreportcolumns_All() {
        this.tbl_boreportcolumns.source.settings['selectMode'] = 'single';
    }
    show_boreportcolumns_Filter() {
        setTimeout(() => {
            //  this.Set_boreportcolumns_TableDropDownConfig();
        });
        if (this.tbl_boreportcolumns.source.settings != null) this.tbl_boreportcolumns.source.settings['hideSubHeader'] = !this.tbl_boreportcolumns.source.settings['hideSubHeader'];
        this.tbl_boreportcolumns.source.initGrid();
    }
    show_boreportcolumns_InActive() {
    }
    enable_boreportcolumns_InActive() {
    }
    async Set_boreportcolumns_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boreportcolumns) {

            var clone = this.sharedService.clone(this.tbl_boreportcolumns.source.settings);
            if (clone.columns['datatype'] != undefined) clone.columns['datatype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_datatype.value)), }, };
            if (clone.columns['datatype'] != undefined) clone.columns['datatype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_datatype.value)), }, };
            this.tbl_boreportcolumns.source.settings = clone;
            this.tbl_boreportcolumns.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boreportcolumns.source.settings);
            if (clone.columns['filtertype'] != undefined) clone.columns['filtertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_filtertype.value)), }, };
            if (clone.columns['filtertype'] != undefined) clone.columns['filtertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_filtertype.value)), }, };
            this.tbl_boreportcolumns.source.settings = clone;
            this.tbl_boreportcolumns.source.initGrid();
        }
        this.bfilterPopulate_boreportcolumns = true;
    }
    async boreportcolumns_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boreportcolumns_TableConfig() {
        this.boreportcolumns_settings = {
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
                custom: this.boreportcolumn_menuactions
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
                tablealias: {
                    title: 'Table Alias',
                    type: '',
                    filter: true,
                },
                field: {
                    title: 'Field',
                    type: '',
                    filter: true,
                },
                header: {
                    title: 'Header',
                    type: '',
                    filter: true,
                },
                columnalias: {
                    title: 'Column Alias',
                    type: '',
                    filter: true,
                },
                hide: {
                    title: 'Hide',
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
                derived: {
                    title: 'Derived',
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
                datatypedesc: {
                    title: 'Datatype',
                    type: 'html',
                    filter: true,
                },
                fkfilter: {
                    title: 'F K Filter',
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
                filtertypedesc: {
                    title: 'Filter Type',
                    type: 'html',
                    filter: true,
                },
                width: {
                    title: 'Width',
                    type: 'number',
                    filter: true,
                },
                nofilter: {
                    title: 'No Filter',
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
                groupby: {
                    title: 'Group By',
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
                sum: {
                    title: 'Sum',
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
                count: {
                    title: 'Count',
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
                colhtml: {
                    title: 'Col H T M L',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                poptitle: {
                    title: 'Pop Title',
                    type: '',
                    filter: true,
                },
                link: {
                    title: 'Link',
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
                linkurl: {
                    title: 'Link U R L',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                service: {
                    title: 'Service',
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
                servicename: {
                    title: 'Service Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                sp: {
                    title: 'S P',
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
                spname: {
                    title: 'S P Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                alert: {
                    title: 'Alert',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                caps: {
                    title: 'Caps',
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
                bold: {
                    title: 'Bold',
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
                italic: {
                    title: 'Italic',
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
                strikethrough: {
                    title: 'Strikethrough',
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
                bgcolor: {
                    title: 'B G Color',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                forecolor: {
                    title: 'Fore Color',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                conditionstyle: {
                    title: 'Condition Style',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                performancestatusvalues: {
                    title: 'Performance Status Values',
                    type: '',
                    filter: true,
                },
                notsortable: {
                    title: 'Not Sortable',
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
                sequence: {
                    title: 'Sequence',
                    type: 'number',
                    filter: true,
                },
                sumcondition: {
                    title: 'Sum Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                countcondition: {
                    title: 'Count Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                min: {
                    title: 'Min',
                    type: 'number',
                    filter: true,
                },
                max: {
                    title: 'Max',
                    type: 'number',
                    filter: true,
                },
                maxchars: {
                    title: 'Max Chars',
                    type: 'number',
                    filter: true,
                },
                helptext: {
                    title: 'Help Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    boreportcolumns_LoadTable(boreportcolumns = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0) {
            if (this.tbl_boreportcolumns != undefined) this.tbl_boreportcolumns.source = new LocalDataSource();
            if (this.tbl_boreportcolumns != undefined) this.tbl_boreportcolumns.source.load(boreportcolumns as any as LocalDataSource);
            if (this.tbl_boreportcolumns != undefined) this.tbl_boreportcolumns.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boreportcolumns_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportcolumns.length == 0)
    {
        this.tbl_boreportcolumns.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportcolumn();
        this.boreport_service.boreportcolumns.push(obj);
        this.tbl_boreportcolumns.source.refresh();
        if ((this.boreport_service.boreportcolumns.length / this.tbl_boreportcolumns.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportcolumns.source.getPaging().page)
        {
            this.tbl_boreportcolumns.source.setPage((this.boreport_service.boreportcolumns.length / this.tbl_boreportcolumns.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportcolumns.source.grid.edit(this.tbl_boreportcolumns.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportcolumns.source.data.indexOf(event.data);
    this.onDelete_boreportcolumn(event,event.data.reportcolumnid,((this.tbl_boreportcolumns.source.getPaging().page-1) *this.tbl_boreportcolumns.source.getPaging().perPage)+index);
    this.tbl_boreportcolumns.source.refresh();
    break;
    }
    }
    
    */
    boreportcolumns_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boreportcolumn(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportcolumn(event, event.data.reportcolumnid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportcolumn(event, event.data.reportcolumnid, ((this.tbl_boreportcolumns.source.getPaging().page - 1) * this.tbl_boreportcolumns.source.getPaging().perPage) + event.index);
                this.tbl_boreportcolumns.source.refresh();
                break;
        }
    }
    boreportcolumns_onDelete(obj) {
        let reportcolumnid = obj.data.reportcolumnid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(reportcolumnid).then(res =>
                this.boreportcolumns_LoadTable()
            );
        }
    }
    async onCustom_boreportcolumns_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportcolumns");
        let formname = (objbomenuaction as any).actionname;




    }
    boreportcolumns_Paging(val) {
        debugger;
        this.tbl_boreportcolumns.source.setPaging(1, val, true);
    }

    handle_boreportcolumns_GridSelected(event: any) {
        this.boreportcolumns_selectedindex = this.tbl_boreportcolumns.source.findIndex(i => i.reportcolumnid === event.data.reportcolumnid);
    }

    async boreportcolumns_moveUp() {
        this.boreportcolumns_move(-1);
    }

    async boreportcolumns_move(val) {
        let index = ((this.tbl_boreportcolumns.source.getPaging().page - 1) * this.tbl_boreportcolumns.source.getPaging().perPage) + this.boreportcolumns_selectedindex;
        if (index >= 0) {

            var current = this.tbl_boreportcolumns.source.data[index];
            var tmp = this.tbl_boreportcolumns.source.data[index + val];
            this.tbl_boreportcolumns.source.data[index + val] = this.tbl_boreportcolumns.source.data[index];
            this.tbl_boreportcolumns.source.data[index] = tmp;
            this.tbl_boreportcolumns.source.data[index + val].sequence = index + val;
            this.tbl_boreportcolumns.source.data[index].sequence = index;
            this.tbl_boreportcolumns.source.refresh();
            this.boreportcolumns_selectedindex = this.tbl_boreportcolumns.source.data.findIndex(i => i.reportcolumnid === current.reportcolumnid);
            this.tbl_boreportcolumns.source.grid.getRows().forEach((row: any) => {
                if (current.reportcolumnid == row.data.reportcolumnid) {
                    this.tbl_boreportcolumns.source.grid.selectRow(row);

                }
            });
        }
    }

    boreportcolumns_moveDown() {
        return this.boreportcolumns_move(1);
    }
    Is_boreportcolumns_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boreportcolumns

}



