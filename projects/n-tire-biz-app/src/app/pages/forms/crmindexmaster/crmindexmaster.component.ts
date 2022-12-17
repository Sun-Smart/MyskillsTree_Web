import { crmindexmasterService } from './../../../service/crmindexmaster.service';
import { crmindexmaster } from './../../../model/crmindexmaster.model';
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
import { crmindexdetail } from './../../../model/crmindexdetail.model';
import { crmindexdetailComponent } from './../../../pages/forms/crmindexdetail/crmindexdetail.component';
import { crmindexdetailService } from './../../../service/crmindexdetail.service';
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
    selector: 'app-crmindexmaster',
    templateUrl: './crmindexmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class crmindexmasterComponent implements OnInit {
    formData: crmindexmaster;
    list: crmindexmaster[];
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

    bfilterPopulate_crmindexmasters: boolean = false;
    bfilterPopulate_crmindexdetails: boolean = false;
    crmindexmaster_menuactions: any = []
    crmindexdetail_menuactions: any = []
    @ViewChild('tbl_crmindexdetails', { static: false }) tbl_crmindexdetails: Ng2SmartTableComponent;

    crmindexmaster_Form: FormGroup;

    valuenode_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    crmindexdetails_visiblelist: any;
    crmindexdetails_hidelist: any;

    Deleted_crmindexdetail_IDs: string = "";
    crmindexdetails_ID: string = "1";
    crmindexdetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private crmindexmaster_service: crmindexmasterService,
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
        this.crmindexmaster_Form = this.fb.group({
            pk: [null],
            indexid: [null],
            indexname: [null],
            valuenode: [null],
            valuenodedesc: [null],
            parentindex: [null],
            value: [null],
            mandatory: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.crmindexmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.crmindexmaster_Form.dirty && this.crmindexmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.indexid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.indexid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.indexid && pkDetail) {
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
        let crmindexmasterid = null;

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
        this.formid = crmindexmasterid;
        //alert(crmindexmasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_crmindexdetails_TableConfig();
            setTimeout(() => {
                //this.Set_crmindexdetails_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.crmindexmaster_service.getDefaultData().then(res => {
            this.valuenode_List = res.list_valuenode.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.crmindexmaster_service.get_crmindexmasters_List().then(res => {
            this.pkList = res as crmindexmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.crmindexmaster_Form.markAsUntouched();
        this.crmindexmaster_Form.markAsPristine();
    }



    resetForm() {
        if (this.crmindexmaster_Form != null)
            this.crmindexmaster_Form.reset();
        this.crmindexmaster_Form.patchValue({
        });
        setTimeout(() => {
            this.crmindexdetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let indexid = this.crmindexmaster_Form.get('indexid').value;
        if (indexid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmindexmaster_service.delete_crmindexmaster(indexid).then(res => {
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
        this.crmindexmaster_Form.patchValue({
            indexid: null
        });
        if (this.formData.indexid != null) this.formData.indexid = null;
        for (let i = 0; i < this.tbl_crmindexdetails.source.length; i++) {
            this.tbl_crmindexdetails.source[i].indexdetailid = null;
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
                        this.crmindexmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmindexmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmindexmaster_Form.controls[key] != undefined) {
                                this.crmindexmaster_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.indexname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.indexname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    valuenode_onChange(evt: any) {
        let e = this.f.valuenode.value as any;
        this.crmindexmaster_Form.patchValue({ valuenodedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_crmindexmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.crmindexmaster_service.get_crmindexmasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.crmindexmaster;
            let formproperty = res.crmindexmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.crmindexmaster.pkcol;
            this.formid = res.crmindexmaster.indexid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.crmindexmaster;
        this.formid = res.crmindexmaster.indexid;
        this.pkcol = res.crmindexmaster.pkcol;
        this.bmyrecord = false;
        if ((res.crmindexmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmindexmaster_Form.patchValue({
            indexid: res.crmindexmaster.indexid,
            indexname: res.crmindexmaster.indexname,
            valuenode: res.crmindexmaster.valuenode,
            valuenodedesc: res.crmindexmaster.valuenodedesc,
            parentindex: res.crmindexmaster.parentindex,
            value: res.crmindexmaster.value,
            mandatory: res.crmindexmaster.mandatory,
            status: res.crmindexmaster.status,
            statusdesc: res.crmindexmaster.statusdesc,
        });
        this.crmindexmaster_menuactions = res.crmindexmaster_menuactions;
        this.crmindexdetail_menuactions = res.crmindexdetail_menuactions;
        this.crmindexdetails_visiblelist = res.crmindexdetails_visiblelist;
        //Child Tables if any
        this.Set_crmindexdetails_TableConfig();
        this.crmindexdetails_LoadTable(res.crmindexdetails);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.crmindexmaster_Form.controls) {
            let val = this.crmindexmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.crmindexmaster_Form.controls[key] != null) {
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
        if (!this.crmindexmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.crmindexmaster_Form.getRawValue();
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
        // Object.keys(this.crmindexmaster_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.crmindexmaster_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.crmindexmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.crmindexmaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.crmindexmaster_Form.controls[key] != null) {
                        this.formData[key] = this.crmindexmaster_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_crmindexdetail_IDs = this.Deleted_crmindexdetail_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.crmindexmaster_service.saveOrUpdate_crmindexmasters(this.formData, this.tbl_crmindexdetails?.source?.data,).subscribe(
            async res => {
                if (this.tbl_crmindexdetails.source) {
                    for (let i = 0; i < this.tbl_crmindexdetails.source.data.length; i++) {
                        if (this.tbl_crmindexdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_crmindexdetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).crmindexmaster);
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
                        this.objvalues.push((res as any).crmindexmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmindexmaster_Form.markAsUntouched();
                this.crmindexmaster_Form.markAsPristine();
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
        this.tbl_crmindexdetails.source = new LocalDataSource();
    }

    AddOrEdit_crmindexdetail(event: any, indexdetailid: any, indexid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(crmindexdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, indexdetailid, indexid, visiblelist: this.crmindexdetails_visiblelist, hidelist: this.crmindexdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmindexdetails.source.add(res[i]);
                    }
                    this.tbl_crmindexdetails.source.refresh();
                }
                else {
                    this.tbl_crmindexdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_crmindexdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_crmindexdetail_IDs += childID + ",";
        this.tbl_crmindexdetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes crmindexdetails
    crmindexdetails_settings: any;

    show_crmindexdetails_Checkbox() {
        debugger;
        if (this.tbl_crmindexdetails.source.settings['selectMode'] == 'multi') this.tbl_crmindexdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmindexdetails.source.settings['selectMode'] = 'multi';
        this.tbl_crmindexdetails.source.initGrid();
    }
    delete_crmindexdetails_All() {
        this.tbl_crmindexdetails.source.settings['selectMode'] = 'single';
    }
    show_crmindexdetails_Filter() {
        setTimeout(() => {
            //  this.Set_crmindexdetails_TableDropDownConfig();
        });
        if (this.tbl_crmindexdetails.source.settings != null) this.tbl_crmindexdetails.source.settings['hideSubHeader'] = !this.tbl_crmindexdetails.source.settings['hideSubHeader'];
        this.tbl_crmindexdetails.source.initGrid();
    }
    show_crmindexdetails_InActive() {
    }
    enable_crmindexdetails_InActive() {
    }
    async Set_crmindexdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_crmindexdetails) {
        }
        this.bfilterPopulate_crmindexdetails = true;
    }
    async crmindexdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_crmindexdetails_TableConfig() {
        this.crmindexdetails_settings = {
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
                custom: this.crmindexdetail_menuactions
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
                value: {
                    title: 'Value',
                    type: '',
                    filter: true,
                },
                parentindexdetail: {
                    title: 'Parent Index Detail',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    crmindexdetails_LoadTable(crmindexdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmindexdetails_ID) >= 0) {
            if (this.tbl_crmindexdetails != undefined) this.tbl_crmindexdetails.source = new LocalDataSource();
            if (this.tbl_crmindexdetails != undefined) this.tbl_crmindexdetails.source.load(crmindexdetails as any as LocalDataSource);
            if (this.tbl_crmindexdetails != undefined) this.tbl_crmindexdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    crmindexdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmindexmaster_service.crmindexdetails.length == 0)
    {
        this.tbl_crmindexdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmindexdetail();
        this.crmindexmaster_service.crmindexdetails.push(obj);
        this.tbl_crmindexdetails.source.refresh();
        if ((this.crmindexmaster_service.crmindexdetails.length / this.tbl_crmindexdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmindexdetails.source.getPaging().page)
        {
            this.tbl_crmindexdetails.source.setPage((this.crmindexmaster_service.crmindexdetails.length / this.tbl_crmindexdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmindexdetails.source.grid.edit(this.tbl_crmindexdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmindexdetails.source.data.indexOf(event.data);
    this.onDelete_crmindexdetail(event,event.data.indexdetailid,((this.tbl_crmindexdetails.source.getPaging().page-1) *this.tbl_crmindexdetails.source.getPaging().perPage)+index);
    this.tbl_crmindexdetails.source.refresh();
    break;
    }
    }
    
    */
    crmindexdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_crmindexdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmindexdetail(event, event.data.indexdetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmindexdetail(event, event.data.indexdetailid, ((this.tbl_crmindexdetails.source.getPaging().page - 1) * this.tbl_crmindexdetails.source.getPaging().perPage) + event.index);
                this.tbl_crmindexdetails.source.refresh();
                break;
        }
    }
    crmindexdetails_onDelete(obj) {
        let indexdetailid = obj.data.indexdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmindexmaster_service.delete_crmindexmaster(indexdetailid).then(res =>
                this.crmindexdetails_LoadTable()
            );
        }
    }
    async onCustom_crmindexdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "crmindexdetails");
        let formname = (objbomenuaction as any).actionname;




    }
    crmindexdetails_Paging(val) {
        debugger;
        this.tbl_crmindexdetails.source.setPaging(1, val, true);
    }

    handle_crmindexdetails_GridSelected(event: any) {
        this.crmindexdetails_selectedindex = this.tbl_crmindexdetails.source.findIndex(i => i.indexdetailid === event.data.indexdetailid);
    }
    Is_crmindexdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmindexdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes crmindexdetails

}



