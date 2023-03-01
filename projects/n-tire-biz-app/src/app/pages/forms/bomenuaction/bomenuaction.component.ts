import { bomenuactionService } from './../../../service/bomenuaction.service';
import { bomenuaction } from './../../../model/bomenuaction.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-bomenuaction',
    templateUrl: './bomenuaction.component.html',
    styles: [],
    providers: []
})



export class bomenuactionComponent implements OnInit {
    formData: bomenuaction;
    list: bomenuaction[];
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

    bfilterPopulate_bomenuactions: boolean = false;
    bomenuaction_menuactions: any = []

    bomenuaction_Form: FormGroup;

    rowselecttype_List: DropDownValues[];
    actiontype_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bomenuaction_service: bomenuactionService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bomenuaction_Form = this.fb.group({
            pk: [null],
            actionid: [null],
            menuid: [null],
            description: [null],
            rowselecttype: [null],
            rowselecttypedesc: [null],
            actionicon: [null],
            actiontype: [null],
            actiontypedesc: [null],
            servicename: [null],
            actionname: [null],
            actioncondition: [null],
            actionbutton: [null],
            actionbuttonlocation: [null],
            actionhelp: [null],
            actionrequestorfield: [null],
            actionassigneduserfield: [null],
            notificationtext: [null],
            actionrequestoremailfield: [null],
            actionassigneduseremailfield: [null],
            actionstatus: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bomenuaction_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bomenuaction_Form.dirty && this.bomenuaction_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.actionid && pkDetail) {
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
        let bomenuactionid = null;

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
        this.formid = bomenuactionid;
        //alert(bomenuactionid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bomenuaction_service.getDefaultData().then(res => {
            this.rowselecttype_List = res.list_rowselecttype.value;
            this.actiontype_List = res.list_actiontype.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bomenuaction_service.get_bomenuactions_List().then(res => {
            this.pkList = res as bomenuaction[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.bomenuaction_Form.markAsUntouched();
        this.bomenuaction_Form.markAsPristine();
    }



    resetForm() {
        if (this.bomenuaction_Form != null)
            this.bomenuaction_Form.reset();
        this.bomenuaction_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let actionid = this.bomenuaction_Form.get('actionid').value;
        if (actionid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomenuaction_service.delete_bomenuaction(actionid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide(); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bomenuaction_Form.patchValue({
            actionid: null
        });
        if (this.formData.actionid != null) this.formData.actionid = null;
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
                        this.bomenuaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomenuaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomenuaction_Form.controls[key] != undefined) {
                                this.bomenuaction_Form.controls[key].disable({ onlySelf: true });
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
    rowselecttype_onChange(evt: any) {
        let e = this.f.rowselecttype.value as any;
        this.bomenuaction_Form.patchValue({ rowselecttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    actiontype_onChange(evt: any) {
        let e = this.f.actiontype.value as any;
        this.bomenuaction_Form.patchValue({ actiontypedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bomenuactions() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bomenuaction_service.get_bomenuactions_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bomenuaction;
            let formproperty = res.bomenuaction.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bomenuaction.pkcol;
            this.formid = res.bomenuaction.actionid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bomenuaction;
        this.formid = res.bomenuaction.actionid;
        this.pkcol = res.bomenuaction.pkcol;
        this.bmyrecord = false;
        if ((res.bomenuaction as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bomenuaction_Form.patchValue({
            actionid: res.bomenuaction.actionid,
            menuid: res.bomenuaction.menuid,
            description: res.bomenuaction.description,
            rowselecttype: res.bomenuaction.rowselecttype,
            rowselecttypedesc: res.bomenuaction.rowselecttypedesc,
            actionicon: res.bomenuaction.actionicon,
            actiontype: res.bomenuaction.actiontype,
            actiontypedesc: res.bomenuaction.actiontypedesc,
            servicename: res.bomenuaction.servicename,
            actionname: res.bomenuaction.actionname,
            actioncondition: res.bomenuaction.actioncondition,
            actionbutton: res.bomenuaction.actionbutton,
            actionbuttonlocation: res.bomenuaction.actionbuttonlocation,
            actionhelp: res.bomenuaction.actionhelp,
            actionrequestorfield: res.bomenuaction.actionrequestorfield,
            actionassigneduserfield: res.bomenuaction.actionassigneduserfield,
            notificationtext: res.bomenuaction.notificationtext,
            actionrequestoremailfield: res.bomenuaction.actionrequestoremailfield,
            actionassigneduseremailfield: res.bomenuaction.actionassigneduseremailfield,
            actionstatus: res.bomenuaction.actionstatus,
            status: res.bomenuaction.status,
            statusdesc: res.bomenuaction.statusdesc,
        });
        this.bomenuaction_menuactions = res.bomenuaction_menuactions;
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bomenuaction_Form.controls) {
            let val = this.bomenuaction_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bomenuaction_Form.controls[key] != null) {
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
        if (!this.bomenuaction_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bomenuaction_Form.getRawValue();
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
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
        this.isSubmitted = true;
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bomenuaction_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bomenuaction_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bomenuaction_Form.controls[key] != null) {
                        this.formData[key] = this.bomenuaction_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.bomenuaction_service.saveOrUpdate_bomenuactions(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bomenuaction);
                if (!bclear) this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                }
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push((res as any).bomenuaction);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomenuaction_Form.markAsUntouched();
                this.bomenuaction_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



