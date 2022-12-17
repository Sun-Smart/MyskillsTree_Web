import { boteamService } from './../../../service/boteam.service';
import { boteam } from './../../../model/boteam.model';
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
import { boteammember } from './../../../model/boteammember.model';
import { boteammemberComponent } from './../../../pages/forms/boteammember/boteammember.component';
import { boteammemberService } from './../../../service/boteammember.service';
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
    selector: 'app-boteam',
    templateUrl: './boteam.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boteamComponent implements OnInit {
    formData: boteam;
    list: boteam[];
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

    bfilterPopulate_boteams: boolean = false;
    bfilterPopulate_boteammembers: boolean = false;
    boteam_menuactions: any = []
    boteammember_menuactions: any = []
    @ViewChild('tbl_boteammembers', { static: false }) tbl_boteammembers: Ng2SmartTableComponent;

    boteam_Form: FormGroup;

    managerid_List: DropDownValues[];
    managerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    boteammembers_visiblelist: any;
    boteammembers_hidelist: any;

    Deleted_boteammember_IDs: string = "";
    boteammembers_ID: string = "1";
    boteammembers_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boteam_service: boteamService,
        private boteammember_service: boteammemberService,
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
        this.boteam_Form = this.fb.group({
            pk: [null],
            teamid: [null],
            managerid: [null],
            manageriddesc: [null],
            description: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boteam_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boteam_Form.dirty && this.boteam_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.teamid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.teamid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.teamid && pkDetail) {
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
        let boteamid = null;

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
        this.formid = boteamid;
        //alert(boteamid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_boteammembers_TableConfig();
            setTimeout(() => {
                //this.Set_boteammembers_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boteam_service.getDefaultData().then(res => {
            this.managerid_List = res.list_managerid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boteam_service.get_boteams_List().then(res => {
            this.pkList = res as boteam[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boteam_Form.markAsUntouched();
        this.boteam_Form.markAsPristine();
    }
    onSelected_managerid(manageridDetail: any) {
        if (manageridDetail.value && manageridDetail) {
            this.boteam_Form.patchValue({
                managerid: manageridDetail.value,
                manageriddesc: manageridDetail.label,

            });

        }
    }




    resetForm() {
        if (this.boteam_Form != null)
            this.boteam_Form.reset();
        this.boteam_Form.patchValue({
            managerid: this.sessionData.userid,
            manageriddesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.boteammembers_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let teamid = this.boteam_Form.get('teamid').value;
        if (teamid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boteam_service.delete_boteam(teamid).then(res => {
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
        this.boteam_Form.patchValue({
            teamid: null
        });
        if (this.formData.teamid != null) this.formData.teamid = null;
        for (let i = 0; i < this.tbl_boteammembers.source.length; i++) {
            this.tbl_boteammembers.source[i].teammemberid = null;
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
                    else if (key == "remarks")
                        this.boteam_Form.patchValue({ "remarks": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boteam_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boteam_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boteam_Form.controls[key] != undefined) {
                                this.boteam_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.description != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.description != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    managerid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_boteams() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boteam_service.get_boteams_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boteam;
            let formproperty = res.boteam.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boteam.pkcol;
            this.formid = res.boteam.teamid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boteam;
        this.formid = res.boteam.teamid;
        this.pkcol = res.boteam.pkcol;
        this.bmyrecord = false;
        if ((res.boteam as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boteam_Form.patchValue({
            teamid: res.boteam.teamid,
            managerid: res.boteam.managerid,
            manageriddesc: res.boteam.manageriddesc,
            description: res.boteam.description,
            remarks: JSON.parse(res.boteam.remarks),
            status: res.boteam.status,
            statusdesc: res.boteam.statusdesc,
        });
        this.boteam_menuactions = res.boteam_menuactions;
        this.boteammember_menuactions = res.boteammember_menuactions;
        this.boteammembers_visiblelist = res.boteammembers_visiblelist;
        //Child Tables if any
        this.Set_boteammembers_TableConfig();
        this.boteammembers_LoadTable(res.boteammembers);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boteam_Form.controls) {
            let val = this.boteam_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boteam_Form.controls[key] != null) {
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
        if (!this.boteam_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boteam_Form.getRawValue();
        if (this.boteam_Form.get('remarks').value != null) obj.remarks = JSON.stringify(this.boteam_Form.get('remarks').value);
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
        // Object.keys(this.boteam_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boteam_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boteam_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boteam_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boteam_Form.controls[key] != null) {
                        this.formData[key] = this.boteam_Form.controls[key].value;
                    }
                }
            }
        }
        if (this.boteam_Form.get('remarks').value != null) this.formData.remarks = JSON.stringify(this.boteam_Form.get('remarks').value);
        this.formData.Deleted_boteammember_IDs = this.Deleted_boteammember_IDs;
        console.log(this.formData);
        this.spinner.show();
        this.boteam_service.saveOrUpdate_boteams(this.formData, this.tbl_boteammembers?.source?.data,).subscribe(
            async res => {
                if (this.tbl_boteammembers.source) {
                    for (let i = 0; i < this.tbl_boteammembers.source.data.length; i++) {
                        if (this.tbl_boteammembers.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boteammembers.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boteam);
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
                        this.objvalues.push((res as any).boteam);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boteam_Form.markAsUntouched();
                this.boteam_Form.markAsPristine();
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
        this.tbl_boteammembers.source = new LocalDataSource();
    }

    AddOrEdit_boteammember(event: any, teammemberid: any, teamid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boteammemberComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, teammemberid, teamid, visiblelist: this.boteammembers_visiblelist, hidelist: this.boteammembers_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boteammembers.source.add(res[i]);
                    }
                    this.tbl_boteammembers.source.refresh();
                }
                else {
                    this.tbl_boteammembers.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boteammember(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boteammember_IDs += childID + ",";
        this.tbl_boteammembers.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boteammembers
    boteammembers_settings: any;

    show_boteammembers_Checkbox() {
        debugger;
        if (this.tbl_boteammembers.source.settings['selectMode'] == 'multi') this.tbl_boteammembers.source.settings['selectMode'] = 'single';
        else
            this.tbl_boteammembers.source.settings['selectMode'] = 'multi';
        this.tbl_boteammembers.source.initGrid();
    }
    delete_boteammembers_All() {
        this.tbl_boteammembers.source.settings['selectMode'] = 'single';
    }
    show_boteammembers_Filter() {
        setTimeout(() => {
            //  this.Set_boteammembers_TableDropDownConfig();
        });
        if (this.tbl_boteammembers.source.settings != null) this.tbl_boteammembers.source.settings['hideSubHeader'] = !this.tbl_boteammembers.source.settings['hideSubHeader'];
        this.tbl_boteammembers.source.initGrid();
    }
    show_boteammembers_InActive() {
    }
    enable_boteammembers_InActive() {
    }
    async Set_boteammembers_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boteammembers) {

            var clone = this.sharedService.clone(this.tbl_boteammembers.source.settings);
            if (clone.columns['teamid'] != undefined) clone.columns['teamid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_teamid.value)), }, };
            if (clone.columns['teamid'] != undefined) clone.columns['teamid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_teamid.value)), }, };
            this.tbl_boteammembers.source.settings = clone;
            this.tbl_boteammembers.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boteammembers.source.settings);
            if (clone.columns['userid'] != undefined) clone.columns['userid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_userid.value)), }, };
            if (clone.columns['userid'] != undefined) clone.columns['userid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_userid.value)), }, };
            this.tbl_boteammembers.source.settings = clone;
            this.tbl_boteammembers.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boteammembers.source.settings);
            if (clone.columns['memberstatus'] != undefined) clone.columns['memberstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_memberstatus.value)), }, };
            if (clone.columns['memberstatus'] != undefined) clone.columns['memberstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boteammembers_memberstatus.value)), }, };
            this.tbl_boteammembers.source.settings = clone;
            this.tbl_boteammembers.source.initGrid();
        }
        this.bfilterPopulate_boteammembers = true;
    }
    async boteammembers_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boteammembers_TableConfig() {
        this.boteammembers_settings = {
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
                custom: this.boteammember_menuactions
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
                useriddesc: {
                    title: 'User',
                    type: 'html',
                    filter: true,
                },
                startdate: {
                    title: 'Start Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                enddate: {
                    title: 'End Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                rateperhour: {
                    title: 'Rate Per Hour',
                    type: 'number',
                    filter: true,
                },
                memberstatusdesc: {
                    title: 'Member Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    boteammembers_LoadTable(boteammembers = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boteammembers_ID) >= 0) {
            if (this.tbl_boteammembers != undefined) this.tbl_boteammembers.source = new LocalDataSource();
            if (this.tbl_boteammembers != undefined) this.tbl_boteammembers.source.load(boteammembers as any as LocalDataSource);
            if (this.tbl_boteammembers != undefined) this.tbl_boteammembers.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boteammembers_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boteam_service.boteammembers.length == 0)
    {
        this.tbl_boteammembers.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boteammember();
        this.boteam_service.boteammembers.push(obj);
        this.tbl_boteammembers.source.refresh();
        if ((this.boteam_service.boteammembers.length / this.tbl_boteammembers.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boteammembers.source.getPaging().page)
        {
            this.tbl_boteammembers.source.setPage((this.boteam_service.boteammembers.length / this.tbl_boteammembers.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boteammembers.source.grid.edit(this.tbl_boteammembers.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boteammembers.source.data.indexOf(event.data);
    this.onDelete_boteammember(event,event.data.teammemberid,((this.tbl_boteammembers.source.getPaging().page-1) *this.tbl_boteammembers.source.getPaging().perPage)+index);
    this.tbl_boteammembers.source.refresh();
    break;
    }
    }
    
    */
    boteammembers_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boteammember(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boteammember(event, event.data.teammemberid, this.formid);
                break;
            case 'delete':
                this.onDelete_boteammember(event, event.data.teammemberid, ((this.tbl_boteammembers.source.getPaging().page - 1) * this.tbl_boteammembers.source.getPaging().perPage) + event.index);
                this.tbl_boteammembers.source.refresh();
                break;
        }
    }
    boteammembers_onDelete(obj) {
        let teammemberid = obj.data.teammemberid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boteam_service.delete_boteam(teammemberid).then(res =>
                this.boteammembers_LoadTable()
            );
        }
    }
    async onCustom_boteammembers_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boteammembers");
        let formname = (objbomenuaction as any).actionname;




    }
    boteammembers_Paging(val) {
        debugger;
        this.tbl_boteammembers.source.setPaging(1, val, true);
    }

    handle_boteammembers_GridSelected(event: any) {
        this.boteammembers_selectedindex = this.tbl_boteammembers.source.findIndex(i => i.teammemberid === event.data.teammemberid);
    }
    Is_boteammembers_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boteammembers_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boteammembers

}



