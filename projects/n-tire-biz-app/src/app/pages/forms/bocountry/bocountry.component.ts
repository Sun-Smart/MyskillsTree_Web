import { bocountryService } from './../../../service/bocountry.service';
import { bocountry } from './../../../model/bocountry.model';
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
import { bostate } from './../../../model/bostate.model';
import { bostateComponent } from './../../../pages/forms/bostate/bostate.component';
import { bostateService } from './../../../service/bostate.service';
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
    selector: 'app-bocountry',
    templateUrl: './bocountry.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bocountryComponent implements OnInit {
    formData: bocountry;
    list: bocountry[];
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
    applicantid:any;
    bfilterPopulate_bocountries: boolean = false;
    bfilterPopulate_bostates: boolean = false;
    bocountry_menuactions: any = []
    bostate_menuactions: any = []
    @ViewChild('tbl_bostates', { static: false }) tbl_bostates: Ng2SmartTableComponent;

    bocountry_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bostates_visiblelist: any;
    bostates_hidelist: any;

    Deleted_bostate_IDs: string = "";
    bostates_ID: string = "1";
    bostates_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocountry_service: bocountryService,
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
        this.bocountry_Form = this.fb.group({
            pk: [null],
            countryid: [null],
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bocountry_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bocountry_Form.dirty && this.bocountry_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.countryid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.countryid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.countryid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme

        this.applicantid == this.sessionService.getItem('applicantid')
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
        let bocountryid = null;

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
        this.formid = bocountryid;
        //alert(bocountryid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bostates_TableConfig();
            setTimeout(() => {
                //this.Set_bostates_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bocountry_service.getDefaultData().then(res => {
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.bocountry_service.get_bocountries_List().then(res => {
            this.pkList = res as bocountry[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched
        this.bocountry_Form.markAsUntouched();
        this.bocountry_Form.markAsPristine();
    }



    resetForm() {
        if (this.bocountry_Form != null)
            this.bocountry_Form.reset();
        this.bocountry_Form.patchValue({
        });
        setTimeout(() => {
            this.bostates_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let countryid = this.bocountry_Form.get('countryid').value;
        if (countryid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocountry_service.delete_bocountry(countryid).then(res => {
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
        this.bocountry_Form.patchValue({
            countryid: null
        });
        if (this.formData.countryid != null) this.formData.countryid = null;
        for (let i = 0; i < this.tbl_bostates.source.length; i++) {
            this.tbl_bostates.source[i].stateid = null;
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
                        this.bocountry_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocountry_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocountry_Form.controls[key] != undefined) {
                                this.bocountry_Form.controls[key].disable({ onlySelf: true });
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
    goBack(){
        
        this.router.navigate(['/home/boreportviewer/wc9rn']);
        
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.name != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.name != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }

    edit_bocountries() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocountry_service.get_bocountries_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bocountry;
            let formproperty = res.bocountry.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocountry.pkcol;
            this.formid = res.bocountry.countryid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.bocountry;
        this.formid = res.bocountry.countryid;
        this.pkcol = res.bocountry.pkcol;
        this.bmyrecord = false;
        if ((res.bocountry as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bocountry_Form.patchValue({
            countryid: res.bocountry.countryid,
            code: res.bocountry.code,
            name: res.bocountry.name,
            status: res.bocountry.status,
            statusdesc: res.bocountry.statusdesc,
        });
        this.bocountry_menuactions = res.bocountry_menuactions;
        this.bostate_menuactions = res.bostate_menuactions;
        this.bostates_visiblelist = res.bostates_visiblelist;
        //Child Tables if any
        this.Set_bostates_TableConfig();
        this.bostates_LoadTable(res.bostates);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocountry_Form.controls) {
            let val = this.bocountry_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocountry_Form.controls[key] != null) {
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
        if (!this.bocountry_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bocountry_Form.getRawValue();
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
        // Object.keys(this.bocountry_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.bocountry_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bocountry_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocountry_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocountry_Form.controls[key] != null) {
                        this.formData[key] = this.bocountry_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bostate_IDs = this.Deleted_bostate_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.bocountry_service.saveOrUpdate_bocountries(this.formData, this.tbl_bostates?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bostates.source) {
                    for (let i = 0; i < this.tbl_bostates.source.data.length; i++) {
                        if (this.tbl_bostates.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bostates.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bocountry);
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
                        this.objvalues.push((res as any).bocountry);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocountry_Form.markAsUntouched();
                this.bocountry_Form.markAsPristine();
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
        this.tbl_bostates.source = new LocalDataSource();
    }

    // AddOrEdit_bostate(event: any, stateid: any, countryid: any) {
    //     let add = false;
    //     if (event == null) add = true;
    //     let childsave = false;
    //     if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    //     this.dialog.open(bostateComponent,
    //         {
    //             data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, stateid, countryid, visiblelist: this.bostates_visiblelist, hidelist: this.bostates_hidelist, ScreenType: 2 },
    //         }

    AddOrEdit_bostate(event:any,stateid:any,countryid:any) {
      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(bostateComponent,
        {
           width: "90% !important",

          data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, stateid, countryid, visiblelist: this.bostates_visiblelist, hidelist: this.bostates_hidelist, ScreenType: 2 },
        }


        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bostates.source.add(res[i]);
                    }
                    this.tbl_bostates.source.refresh();
                }
                else {
                    this.tbl_bostates.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bostate(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bostate_IDs += childID + ",";
        this.tbl_bostates.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bostates
    bostates_settings: any;

    show_bostates_Checkbox() {
        debugger;
        if (this.tbl_bostates.source.settings['selectMode'] == 'multi') this.tbl_bostates.source.settings['selectMode'] = 'single';
        else
            this.tbl_bostates.source.settings['selectMode'] = 'multi';
        this.tbl_bostates.source.initGrid();
    }
    delete_bostates_All() {
        this.tbl_bostates.source.settings['selectMode'] = 'single';
    }
    show_bostates_Filter() {
        setTimeout(() => {
            //  this.Set_bostates_TableDropDownConfig();
        });
        if (this.tbl_bostates.source.settings != null) this.tbl_bostates.source.settings['hideSubHeader'] = !this.tbl_bostates.source.settings['hideSubHeader'];
        this.tbl_bostates.source.initGrid();
    }
    show_bostates_InActive() {
    }
    enable_bostates_InActive() {
    }
    async Set_bostates_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bostates) {
        }
        this.bfilterPopulate_bostates = true;
    }
    async bostates_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bostates_TableConfig() {
        this.bostates_settings = {
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
                custom: this.bostate_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class=""></i>',
                confirmDelete: false,
            },
            columns: {
                code: {
                    title: 'Code',
                    type: '',
                    filter: true,
                },
                name: {
                    title: 'Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    bostates_LoadTable(bostates = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bostates_ID) >= 0) {
            if (this.tbl_bostates != undefined) this.tbl_bostates.source = new LocalDataSource();
            if (this.tbl_bostates != undefined) this.tbl_bostates.source.load(bostates as any as LocalDataSource);
            if (this.tbl_bostates != undefined) this.tbl_bostates.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bostates_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bocountry_service.bostates.length == 0)
    {
        this.tbl_bostates.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bostate();
        this.bocountry_service.bostates.push(obj);
        this.tbl_bostates.source.refresh();
        if ((this.bocountry_service.bostates.length / this.tbl_bostates.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bostates.source.getPaging().page)
        {
            this.tbl_bostates.source.setPage((this.bocountry_service.bostates.length / this.tbl_bostates.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bostates.source.grid.edit(this.tbl_bostates.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    if (confirm('Do you want to want to delete?')) {
    let index = this.tbl_bostates.source.data.indexOf(event.data);
    this.onDelete_bostate(event,event.data.stateid,((this.tbl_bostates.source.getPaging().page-1) *this.tbl_bostates.source.getPaging().perPage)+index);
    this.tbl_bostates.source.refresh();
    }
    break;
    }
    }

    */
    bostates_route(event: any, action: any) {
      debugger
        // var addparam = "";
        // if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
        //     addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        // }

        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
          addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bostate(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bostate(event, event.data.stateid, this.formid);
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    this.onDelete_bostate(event, event.data.stateid, ((this.tbl_bostates.source.getPaging().page - 1) * this.tbl_bostates.source.getPaging().perPage) + event.index);
                    this.tbl_bostates.source.refresh();
                }
                break;
        }
    }
    bostates_onDelete(obj) {
        let stateid = obj.data.stateid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocountry_service.delete_bocountry(stateid).then(res =>
                this.bostates_LoadTable()
            );
        }
    }
    async onCustom_bostates_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bostates");
        let formname = (objbomenuaction as any).actionname;




    }
    bostates_Paging(val) {
        debugger;
        this.tbl_bostates.source.setPaging(1, val, true);
    }

    handle_bostates_GridSelected(event: any) {
        this.bostates_selectedindex = this.tbl_bostates.source.findIndex(i => i.stateid === event.data.stateid);
    }
    Is_bostates_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bostates_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bostates

}



