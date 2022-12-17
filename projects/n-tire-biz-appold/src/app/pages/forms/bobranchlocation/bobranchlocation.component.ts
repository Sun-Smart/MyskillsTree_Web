import { bobranchlocationService } from './../../../service/bobranchlocation.service';
import { bobranchlocation } from './../../../model/bobranchlocation.model';
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
import { bobranchsublocation } from './../../../model/bobranchsublocation.model';
import { bobranchsublocationComponent } from './../../../pages/forms/bobranchsublocation/bobranchsublocation.component';
import { bobranchsublocationService } from './../../../service/bobranchsublocation.service';
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
    selector: 'app-bobranchlocation',
    templateUrl: './bobranchlocation.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bobranchlocationComponent implements OnInit {
    formData: bobranchlocation;
    list: bobranchlocation[];
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

    bfilterPopulate_bobranchlocations: boolean = false;
    bfilterPopulate_bobranchsublocations: boolean = false;
    bobranchlocation_menuactions: any = []
    bobranchsublocation_menuactions: any = []
    @ViewChild('tbl_bobranchsublocations', { static: false }) tbl_bobranchsublocations: Ng2SmartTableComponent;

    bobranchlocation_Form: FormGroup;

    locationcode_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bobranchsublocations_visiblelist: any;
    bobranchsublocations_hidelist: any;

    Deleted_bobranchsublocation_IDs: string = "";
    bobranchsublocations_ID: string = "1";
    bobranchsublocations_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bobranchlocation_service: bobranchlocationService,
        private bobranchsublocation_service: bobranchsublocationService,
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
        this.bobranchlocation_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            locationid: [null],
            locationcode: [null],
            locationcodedesc: [null],
            locationname: [null],
            tag: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bobranchlocation_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bobranchlocation_Form.dirty && this.bobranchlocation_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.locationid && pkDetail) {
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
        let bobranchlocationid = null;

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
        this.formid = bobranchlocationid;
        //alert(bobranchlocationid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bobranchsublocations_TableConfig();
            setTimeout(() => {
                //this.Set_bobranchsublocations_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.bobranchlocation_service.getDefaultData().then(res => {
            this.locationcode_List = res.list_locationcode.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.bobranchlocation_service.get_bobranchlocations_List().then(res => {
            this.pkList = res as bobranchlocation[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.bobranchlocation_Form.markAsUntouched();
        this.bobranchlocation_Form.markAsPristine();
    }



    resetForm() {
        if (this.bobranchlocation_Form != null)
            this.bobranchlocation_Form.reset();
        this.bobranchlocation_Form.patchValue({
        });
        setTimeout(() => {
            this.bobranchsublocations_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let locationid = this.bobranchlocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchlocation_service.delete_bobranchlocation(locationid).then(res => {
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
        this.bobranchlocation_Form.patchValue({
            locationid: null
        });
        if (this.formData.locationid != null) this.formData.locationid = null;
        for (let i = 0; i < this.tbl_bobranchsublocations.source.length; i++) {
            this.tbl_bobranchsublocations.source[i].sublocationid = null;
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
                    else if (key == "tag")
                        this.bobranchlocation_Form.patchValue({ "tag": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.bobranchlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchlocation_Form.controls[key] != undefined) {
                                this.bobranchlocation_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    locationcode_onChange(evt: any) {
        let e = this.f.locationcode.value as any;
        this.bobranchlocation_Form.patchValue({ locationcodedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bobranchlocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bobranchlocation_service.get_bobranchlocations_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bobranchlocation;
            let formproperty = res.bobranchlocation.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bobranchlocation.pkcol;
            this.formid = res.bobranchlocation.locationid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.bobranchlocation;
        this.formid = res.bobranchlocation.locationid;
        this.pkcol = res.bobranchlocation.pkcol;
        this.bmyrecord = false;
        if ((res.bobranchlocation as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bobranchlocation_Form.patchValue({
            branchid: res.bobranchlocation.branchid,
            locationid: res.bobranchlocation.locationid,
            locationcode: res.bobranchlocation.locationcode,
            locationcodedesc: res.bobranchlocation.locationcodedesc,
            locationname: res.bobranchlocation.locationname,
            tag: JSON.parse(res.bobranchlocation.tag),
            status: res.bobranchlocation.status,
            statusdesc: res.bobranchlocation.statusdesc,
        });
        this.bobranchlocation_menuactions = res.bobranchlocation_menuactions;
        this.bobranchsublocation_menuactions = res.bobranchsublocation_menuactions;
        this.bobranchsublocations_visiblelist = res.bobranchsublocations_visiblelist;
        //Child Tables if any
        this.Set_bobranchsublocations_TableConfig();
        this.bobranchsublocations_LoadTable(res.bobranchsublocations);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchlocation_Form.controls) {
            let val = this.bobranchlocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bobranchlocation_Form.controls[key] != null) {
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
        if (!this.bobranchlocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bobranchlocation_Form.getRawValue();
        if (this.bobranchlocation_Form.get('tag').value != null) obj.tag = JSON.stringify(this.bobranchlocation_Form.get('tag').value);
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
        // Object.keys(this.bobranchlocation_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.bobranchlocation_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bobranchlocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bobranchlocation_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bobranchlocation_Form.controls[key] != null) {
                        this.formData[key] = this.bobranchlocation_Form.controls[key].value;
                    }
                }
            }
        }
        if (this.bobranchlocation_Form.get('tag').value != null) this.formData.tag = JSON.stringify(this.bobranchlocation_Form.get('tag').value);
        this.formData.Deleted_bobranchsublocation_IDs = this.Deleted_bobranchsublocation_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.bobranchlocation_service.saveOrUpdate_bobranchlocations(this.formData, this.tbl_bobranchsublocations?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bobranchsublocations.source) {
                    for (let i = 0; i < this.tbl_bobranchsublocations.source.data.length; i++) {
                        if (this.tbl_bobranchsublocations.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bobranchsublocations.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bobranchlocation);
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
                        this.objvalues.push((res as any).bobranchlocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchlocation_Form.markAsUntouched();
                this.bobranchlocation_Form.markAsPristine();
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
        this.tbl_bobranchsublocations.source = new LocalDataSource();
    }

    AddOrEdit_bobranchsublocation(event: any, sublocationid: any, locationid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bobranchsublocationComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, sublocationid, locationid, visiblelist: this.bobranchsublocations_visiblelist, hidelist: this.bobranchsublocations_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bobranchsublocations.source.add(res[i]);
                    }
                    this.tbl_bobranchsublocations.source.refresh();
                }
                else {
                    this.tbl_bobranchsublocations.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bobranchsublocation(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bobranchsublocation_IDs += childID + ",";
        this.tbl_bobranchsublocations.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bobranchsublocations
    bobranchsublocations_settings: any;

    show_bobranchsublocations_Checkbox() {
        debugger;
        if (this.tbl_bobranchsublocations.source.settings['selectMode'] == 'multi') this.tbl_bobranchsublocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_bobranchsublocations.source.settings['selectMode'] = 'multi';
        this.tbl_bobranchsublocations.source.initGrid();
    }
    delete_bobranchsublocations_All() {
        this.tbl_bobranchsublocations.source.settings['selectMode'] = 'single';
    }
    show_bobranchsublocations_Filter() {
        setTimeout(() => {
            //  this.Set_bobranchsublocations_TableDropDownConfig();
        });
        if (this.tbl_bobranchsublocations.source.settings != null) this.tbl_bobranchsublocations.source.settings['hideSubHeader'] = !this.tbl_bobranchsublocations.source.settings['hideSubHeader'];
        this.tbl_bobranchsublocations.source.initGrid();
    }
    show_bobranchsublocations_InActive() {
    }
    enable_bobranchsublocations_InActive() {
    }
    async Set_bobranchsublocations_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bobranchsublocations) {

            var clone = this.sharedService.clone(this.tbl_bobranchsublocations.source.settings);
            if (clone.columns['locationid'] != undefined) clone.columns['locationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchsublocations_locationid.value)), }, };
            if (clone.columns['locationid'] != undefined) clone.columns['locationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchsublocations_locationid.value)), }, };
            this.tbl_bobranchsublocations.source.settings = clone;
            this.tbl_bobranchsublocations.source.initGrid();
        }
        this.bfilterPopulate_bobranchsublocations = true;
    }
    async bobranchsublocations_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bobranchsublocations_TableConfig() {
        this.bobranchsublocations_settings = {
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
                custom: this.bobranchsublocation_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                locationname: {
                    title: 'Location Name',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bobranchsublocations_LoadTable(bobranchsublocations = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchsublocations_ID) >= 0) {
            if (this.tbl_bobranchsublocations != undefined) this.tbl_bobranchsublocations.source = new LocalDataSource();
            if (this.tbl_bobranchsublocations != undefined) this.tbl_bobranchsublocations.source.load(bobranchsublocations as any as LocalDataSource);
            if (this.tbl_bobranchsublocations != undefined) this.tbl_bobranchsublocations.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    bobranchsublocations_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bobranchlocation_service.bobranchsublocations.length == 0)
    {
        this.tbl_bobranchsublocations.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bobranchsublocation();
        this.bobranchlocation_service.bobranchsublocations.push(obj);
        this.tbl_bobranchsublocations.source.refresh();
        if ((this.bobranchlocation_service.bobranchsublocations.length / this.tbl_bobranchsublocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchsublocations.source.getPaging().page)
        {
            this.tbl_bobranchsublocations.source.setPage((this.bobranchlocation_service.bobranchsublocations.length / this.tbl_bobranchsublocations.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bobranchsublocations.source.grid.edit(this.tbl_bobranchsublocations.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bobranchsublocations.source.data.indexOf(event.data);
    this.onDelete_bobranchsublocation(event,event.data.sublocationid,((this.tbl_bobranchsublocations.source.getPaging().page-1) *this.tbl_bobranchsublocations.source.getPaging().perPage)+index);
    this.tbl_bobranchsublocations.source.refresh();
    break;
    }
    }
    
    */
    bobranchsublocations_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bobranchsublocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bobranchsublocation(event, event.data.sublocationid, this.formid);
                break;
            case 'delete':
                this.onDelete_bobranchsublocation(event, event.data.sublocationid, ((this.tbl_bobranchsublocations.source.getPaging().page - 1) * this.tbl_bobranchsublocations.source.getPaging().perPage) + event.index);
                this.tbl_bobranchsublocations.source.refresh();
                break;
        }
    }
    bobranchsublocations_onDelete(obj) {
        let sublocationid = obj.data.sublocationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bobranchlocation_service.delete_bobranchlocation(sublocationid).then(res =>
                this.bobranchsublocations_LoadTable()
            );
        }
    }
    async onCustom_bobranchsublocations_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bobranchsublocations");
        let formname = (objbomenuaction as any).actionname;




    }
    bobranchsublocations_Paging(val) {
        debugger;
        this.tbl_bobranchsublocations.source.setPaging(1, val, true);
    }

    handle_bobranchsublocations_GridSelected(event: any) {
        this.bobranchsublocations_selectedindex = this.tbl_bobranchsublocations.source.findIndex(i => i.sublocationid === event.data.sublocationid);
    }
    Is_bobranchsublocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchsublocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bobranchsublocations

}



