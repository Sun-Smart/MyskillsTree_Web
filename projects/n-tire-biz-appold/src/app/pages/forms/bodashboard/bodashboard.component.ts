import { bodashboardService } from './../../../service/bodashboard.service';
import { bodashboard } from './../../../model/bodashboard.model';
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
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
import { bodashboarddetailComponent } from './../../../pages/forms/bodashboarddetail/bodashboarddetail.component';
import { bodashboarddetailService } from './../../../service/bodashboarddetail.service';
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
    selector: 'app-bodashboard',
    templateUrl: './bodashboard.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bodashboardComponent implements OnInit {
    formData: bodashboard;
    list: bodashboard[];
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

    bfilterPopulate_bodashboards: boolean = false;
    bfilterPopulate_bodashboarddetails: boolean = false;
    bodashboard_menuactions: any = []
    bodashboarddetail_menuactions: any = []
    @ViewChild('tbl_bodashboarddetails', { static: false }) tbl_bodashboarddetails: Ng2SmartTableComponent;

    bodashboard_Form: FormGroup;

    dashboardid_List: DropDownValues[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bodashboarddetails_visiblelist: any;
    bodashboarddetails_hidelist: any;

    Deleted_bodashboarddetail_IDs: string = "";
    bodashboarddetails_ID: string = "1";
    bodashboarddetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bodashboard_service: bodashboardService,
        private bodashboarddetail_service: bodashboarddetailService,
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
        this.bodashboard_Form = this.fb.group({
            pk: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            dashboardname: [null],
            rows: [null],
            cols: [null],
            design: [null],
            remarks: [null],
            userid: [null],
            module: [null],
            helptext: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bodashboard_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bodashboard_Form.dirty && this.bodashboard_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.dashboardid && pkDetail) {
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
        let bodashboardid = null;

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
        this.formid = bodashboardid;
        //alert(bodashboardid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bodashboarddetails_TableConfig();
            setTimeout(() => {
                //this.Set_bodashboarddetails_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.bodashboard_service.getDefaultData().then(res => {
            this.dashboardid_List = res.list_dashboardid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.bodashboard_service.get_bodashboards_List().then(res => {
            this.pkList = res as bodashboard[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.bodashboard_Form.markAsUntouched();
        this.bodashboard_Form.markAsPristine();
    }
    onSelected_dashboardid(dashboardidDetail: any) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.bodashboard_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.bodashboard_Form != null)
            this.bodashboard_Form.reset();
        this.bodashboard_Form.patchValue({
        });
        setTimeout(() => {
            this.bodashboarddetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let dashboardid = this.bodashboard_Form.get('dashboardid').value;
        if (dashboardid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bodashboard_service.delete_bodashboard(dashboardid).then(res => {
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
        this.bodashboard_Form.patchValue({
            dashboardid: null
        });
        if (this.formData.dashboardid != null) this.formData.dashboardid = null;
        for (let i = 0; i < this.tbl_bodashboarddetails.source.length; i++) {
            this.tbl_bodashboarddetails.source[i].dashboarddetailid = null;
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
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboard_Form.controls[key] != undefined) {
                                this.bodashboard_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    dashboardid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_bodashboards() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bodashboard_service.get_bodashboards_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bodashboard;
            let formproperty = res.bodashboard.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bodashboard.pkcol;
            this.formid = res.bodashboard.dashboardid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.bodashboard;
        this.formid = res.bodashboard.dashboardid;
        this.pkcol = res.bodashboard.pkcol;
        this.bmyrecord = false;
        if ((res.bodashboard as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bodashboard_Form.patchValue({
            dashboardid: res.bodashboard.dashboardid,
            dashboardiddesc: res.bodashboard.dashboardiddesc,
            dashboardname: res.bodashboard.dashboardname,
            rows: res.bodashboard.rows,
            cols: res.bodashboard.cols,
            design: res.bodashboard.design,
            remarks: res.bodashboard.remarks,
            userid: res.bodashboard.userid,
            module: res.bodashboard.module,
            helptext: res.bodashboard.helptext,
            status: res.bodashboard.status,
            statusdesc: res.bodashboard.statusdesc,
        });
        this.bodashboard_menuactions = res.bodashboard_menuactions;
        this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
        this.bodashboarddetails_visiblelist = res.bodashboarddetails_visiblelist;
        //Child Tables if any
        this.Set_bodashboarddetails_TableConfig();
        this.bodashboarddetails_LoadTable(res.bodashboarddetails);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bodashboard_Form.controls) {
            let val = this.bodashboard_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bodashboard_Form.controls[key] != null) {
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
        if (!this.bodashboard_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bodashboard_Form.getRawValue();
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
        // Object.keys(this.bodashboard_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.bodashboard_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bodashboard_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bodashboard_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bodashboard_Form.controls[key] != null) {
                        this.formData[key] = this.bodashboard_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bodashboarddetail_IDs = this.Deleted_bodashboarddetail_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.bodashboard_service.saveOrUpdate_bodashboards(this.formData, this.tbl_bodashboarddetails?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bodashboarddetails.source) {
                    for (let i = 0; i < this.tbl_bodashboarddetails.source.data.length; i++) {
                        if (this.tbl_bodashboarddetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bodashboarddetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bodashboard);
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
                        this.objvalues.push((res as any).bodashboard);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bodashboard_Form.markAsUntouched();
                this.bodashboard_Form.markAsPristine();
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
        this.tbl_bodashboarddetails.source = new LocalDataSource();
    }

    AddOrEdit_bodashboarddetail(event: any, dashboarddetailid: any, dashboardid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bodashboarddetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, dashboarddetailid, dashboardid, visiblelist: this.bodashboarddetails_visiblelist, hidelist: this.bodashboarddetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bodashboarddetails.source.add(res[i]);
                    }
                    this.tbl_bodashboarddetails.source.refresh();
                }
                else {
                    this.tbl_bodashboarddetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bodashboarddetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bodashboarddetail_IDs += childID + ",";
        this.tbl_bodashboarddetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bodashboarddetails
    bodashboarddetails_settings: any;

    show_bodashboarddetails_Checkbox() {
        debugger;
        if (this.tbl_bodashboarddetails.source.settings['selectMode'] == 'multi') this.tbl_bodashboarddetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_bodashboarddetails.source.settings['selectMode'] = 'multi';
        this.tbl_bodashboarddetails.source.initGrid();
    }
    delete_bodashboarddetails_All() {
        this.tbl_bodashboarddetails.source.settings['selectMode'] = 'single';
    }
    show_bodashboarddetails_Filter() {
        setTimeout(() => {
            //  this.Set_bodashboarddetails_TableDropDownConfig();
        });
        if (this.tbl_bodashboarddetails.source.settings != null) this.tbl_bodashboarddetails.source.settings['hideSubHeader'] = !this.tbl_bodashboarddetails.source.settings['hideSubHeader'];
        this.tbl_bodashboarddetails.source.initGrid();
    }
    show_bodashboarddetails_InActive() {
    }
    enable_bodashboarddetails_InActive() {
    }
    async Set_bodashboarddetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bodashboarddetails) {

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['dashboardid'] != undefined) clone.columns['dashboardid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_dashboardid.value)), }, };
            if (clone.columns['dashboardid'] != undefined) clone.columns['dashboardid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_dashboardid.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['charttype'] != undefined) clone.columns['charttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_charttype.value)), }, };
            if (clone.columns['charttype'] != undefined) clone.columns['charttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_charttype.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter1type'] != undefined) clone.columns['parameter1type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1type.value)), }, };
            if (clone.columns['parameter1type'] != undefined) clone.columns['parameter1type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1type.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter1datetype'] != undefined) clone.columns['parameter1datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1datetype.value)), }, };
            if (clone.columns['parameter1datetype'] != undefined) clone.columns['parameter1datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1datetype.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter2type'] != undefined) clone.columns['parameter2type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2type.value)), }, };
            if (clone.columns['parameter2type'] != undefined) clone.columns['parameter2type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2type.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter2datetype'] != undefined) clone.columns['parameter2datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2datetype.value)), }, };
            if (clone.columns['parameter2datetype'] != undefined) clone.columns['parameter2datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2datetype.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter3type'] != undefined) clone.columns['parameter3type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3type.value)), }, };
            if (clone.columns['parameter3type'] != undefined) clone.columns['parameter3type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3type.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['parameter3datetype'] != undefined) clone.columns['parameter3datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3datetype.value)), }, };
            if (clone.columns['parameter3datetype'] != undefined) clone.columns['parameter3datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3datetype.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['menuid'] != undefined) clone.columns['menuid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_menuid.value)), }, };
            if (clone.columns['menuid'] != undefined) clone.columns['menuid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_menuid.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
            if (clone.columns['reportid'] != undefined) clone.columns['reportid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_reportid.value)), }, };
            if (clone.columns['reportid'] != undefined) clone.columns['reportid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_reportid.value)), }, };
            this.tbl_bodashboarddetails.source.settings = clone;
            this.tbl_bodashboarddetails.source.initGrid();
        }
        this.bfilterPopulate_bodashboarddetails = true;
    }
    async bodashboarddetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bodashboarddetails_TableConfig() {
        this.bodashboarddetails_settings = {
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
                custom: this.bodashboarddetail_menuactions
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
                dashboardname: {
                    title: 'Dashboard Name',
                    type: '',
                    filter: true,
                },
                title: {
                    title: 'Title',
                    type: '',
                    filter: true,
                },
                row: {
                    title: 'Row',
                    type: 'number',
                    filter: true,
                },
                col: {
                    title: 'Col',
                    type: 'number',
                    filter: true,
                },
                charttypedesc: {
                    title: 'Chart Type',
                    type: 'html',
                    filter: true,
                },
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                recordname: {
                    title: 'Record Name',
                    type: '',
                    filter: true,
                },
                parameter: {
                    title: 'Parameter',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                name: {
                    title: 'Name',
                    type: '',
                    filter: true,
                },
                value: {
                    title: 'Value',
                    type: '',
                    filter: true,
                },
                parameter1variable: {
                    title: 'Parameter1 Variable',
                    type: '',
                    filter: true,
                },
                parameter1typedesc: {
                    title: 'Parameter1 Type',
                    type: 'html',
                    filter: true,
                },
                parameter1datetypedesc: {
                    title: 'Parameter1 Date Type',
                    type: 'html',
                    filter: true,
                },
                parameter2variable: {
                    title: 'Parameter2 Variable',
                    type: '',
                    filter: true,
                },
                parameter2typedesc: {
                    title: 'Parameter2 Type',
                    type: 'html',
                    filter: true,
                },
                parameter2datetypedesc: {
                    title: 'Parameter2 Date Type',
                    type: 'html',
                    filter: true,
                },
                parameter3variable: {
                    title: 'Parameter3 Variable',
                    type: '',
                    filter: true,
                },
                parameter3typedesc: {
                    title: 'Parameter3 Type',
                    type: 'html',
                    filter: true,
                },
                parameter3datetypedesc: {
                    title: 'Parameter3 Date Type',
                    type: 'html',
                    filter: true,
                },
                backgroundcolor: {
                    title: 'Background Color',
                    type: '',
                    filter: true,
                },
                hoverbackgroundcolor: {
                    title: 'Hover Background Color',
                    type: '',
                    filter: true,
                },
                bordercolor: {
                    title: 'Border Color',
                    type: '',
                    filter: true,
                },
                menuiddesc: {
                    title: 'Menu',
                    type: 'html',
                    filter: true,
                },
                reportiddesc: {
                    title: 'Report',
                    type: 'html',
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
    bodashboarddetails_LoadTable(bodashboarddetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0) {
            if (this.tbl_bodashboarddetails != undefined) this.tbl_bodashboarddetails.source = new LocalDataSource();
            if (this.tbl_bodashboarddetails != undefined) this.tbl_bodashboarddetails.source.load(bodashboarddetails as any as LocalDataSource);
            if (this.tbl_bodashboarddetails != undefined) this.tbl_bodashboarddetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bodashboarddetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bodashboard_service.bodashboarddetails.length == 0)
    {
        this.tbl_bodashboarddetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bodashboarddetail();
        this.bodashboard_service.bodashboarddetails.push(obj);
        this.tbl_bodashboarddetails.source.refresh();
        if ((this.bodashboard_service.bodashboarddetails.length / this.tbl_bodashboarddetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bodashboarddetails.source.getPaging().page)
        {
            this.tbl_bodashboarddetails.source.setPage((this.bodashboard_service.bodashboarddetails.length / this.tbl_bodashboarddetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bodashboarddetails.source.grid.edit(this.tbl_bodashboarddetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bodashboarddetails.source.data.indexOf(event.data);
    this.onDelete_bodashboarddetail(event,event.data.dashboarddetailid,((this.tbl_bodashboarddetails.source.getPaging().page-1) *this.tbl_bodashboarddetails.source.getPaging().perPage)+index);
    this.tbl_bodashboarddetails.source.refresh();
    break;
    }
    }
    
    */
    bodashboarddetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bodashboarddetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bodashboarddetail(event, event.data.dashboarddetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_bodashboarddetail(event, event.data.dashboarddetailid, ((this.tbl_bodashboarddetails.source.getPaging().page - 1) * this.tbl_bodashboarddetails.source.getPaging().perPage) + event.index);
                this.tbl_bodashboarddetails.source.refresh();
                break;
        }
    }
    bodashboarddetails_onDelete(obj) {
        let dashboarddetailid = obj.data.dashboarddetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bodashboard_service.delete_bodashboard(dashboarddetailid).then(res =>
                this.bodashboarddetails_LoadTable()
            );
        }
    }
    async onCustom_bodashboarddetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bodashboarddetails");
        let formname = (objbomenuaction as any).actionname;




    }
    bodashboarddetails_Paging(val) {
        debugger;
        this.tbl_bodashboarddetails.source.setPaging(1, val, true);
    }

    handle_bodashboarddetails_GridSelected(event: any) {
        this.bodashboarddetails_selectedindex = this.tbl_bodashboarddetails.source.findIndex(i => i.dashboarddetailid === event.data.dashboarddetailid);
    }
    Is_bodashboarddetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bodashboarddetails

}



