import { bocompanysettingService } from './../../../service/bocompanysetting.service';
import { bocompanysetting } from './../../../model/bocompanysetting.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-bocompanysetting',
    templateUrl: './bocompanysetting.component.html',
    styles: []
})
export class bocompanysettingComponent implements OnInit {
    formData: bocompanysetting;
    list: bocompanysetting[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';
    showview: boolean = false;
    theme: string = "";
    shortcuts: ShortcutInput[] = [];
    showSubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    pkList: any;
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
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
    bfilterPopulate_bocompanysettings: boolean = false;
    bocompanysetting_menuactions: any = []
    bocompanysetting_Form: FormGroup;
    adminroleid_List: DropDownValues[];
    adminroleid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    customFieldJson: any;
    customFieldVisible: boolean = true;
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocompanysetting_service: bocompanysettingService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bocompanysetting_Form = this.fb.group({
            pk: [null],
            settingsid: [null],
            adminroleid: [null],
            adminroleiddesc: [null],
            purchaseterms: [null],
            annualdays: [null],
            leavecarryforward: [null],
            maxleavescarryforward: [null],
            earnedleave: [null],
            sickdaysallowed: [null],
            sickdays: [null],
            medicaldays: [null],
            maternityleaveallowed: [null],
            maternitydays: [null],
            lop: [null],
            lopcarryforward: [null],
            lopmaxdayscarryforward: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bocompanysetting_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bocompanysetting_Form.dirty && this.bocompanysetting_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.settingsid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    async ngOnInit() {
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
        let bocompanysettingid = null;

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
        this.viewHtml = ``;
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = bocompanysettingid;
        if (this.pkcol == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bocompanysetting_service.getDefaultData().then(res => {
            this.adminroleid_List = res.list_adminroleid.value;
        }).catch((err) => { this.spinner.hide();});

        this.bocompanysetting_service.get_bocompanysettings_List().then(res => {
            this.pkList = res as bocompanysetting[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        this.bocompanysetting_Form.markAsUntouched();
        this.bocompanysetting_Form.markAsPristine();
    }
    onSelected_adminroleid(adminroleidDetail: any) {
        if (adminroleidDetail.value && adminroleidDetail) {
            this.bocompanysetting_Form.patchValue({
                adminroleid: adminroleidDetail.value,
                adminroleiddesc: adminroleidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bocompanysetting_Form != null)
            this.bocompanysetting_Form.reset();
        this.bocompanysetting_Form.patchValue({
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let settingsid = this.bocompanysetting_Form.get('settingsid').value;
        if (settingsid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanysetting_service.delete_bocompanysetting(settingsid).then(res => {
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
        this.bocompanysetting_Form.patchValue({
            settingsid: null
        });
        if (this.formData.settingsid != null) this.formData.settingsid = null;
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
                        this.bocompanysetting_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanysetting_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanysetting_Form.controls[key] != undefined) {
                                this.bocompanysetting_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("bocompanysettings", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    adminroleid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_bocompanysettings() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocompanysetting_service.get_bocompanysettings_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bocompanysetting;
            let formproperty = res.bocompanysetting.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocompanysetting.pkcol;
            this.formid = res.bocompanysetting.settingsid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bocompanysetting;
        this.formid = res.bocompanysetting.settingsid;
        this.pkcol = res.bocompanysetting.pkcol;
        this.bmyrecord = false;
        if ((res.bocompanysetting as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bocompanysetting_Form.patchValue({
            settingsid: res.bocompanysetting.settingsid,
            adminroleid: res.bocompanysetting.adminroleid,
            adminroleiddesc: res.bocompanysetting.adminroleiddesc,
            purchaseterms: res.bocompanysetting.purchaseterms,
            annualdays: res.bocompanysetting.annualdays,
            leavecarryforward: res.bocompanysetting.leavecarryforward,
            maxleavescarryforward: res.bocompanysetting.maxleavescarryforward,
            earnedleave: res.bocompanysetting.earnedleave,
            sickdaysallowed: res.bocompanysetting.sickdaysallowed,
            sickdays: res.bocompanysetting.sickdays,
            medicaldays: res.bocompanysetting.medicaldays,
            maternityleaveallowed: res.bocompanysetting.maternityleaveallowed,
            maternitydays: res.bocompanysetting.maternitydays,
            lop: res.bocompanysetting.lop,
            lopcarryforward: res.bocompanysetting.lopcarryforward,
            lopmaxdayscarryforward: res.bocompanysetting.lopmaxdayscarryforward,
            customfield: res.bocompanysetting.customfield,
            status: res.bocompanysetting.status,
            statusdesc: res.bocompanysetting.statusdesc,
        });
        this.bocompanysetting_menuactions = res.bocompanysetting_menuactions;
        if (this.bocompanysetting_Form.get('customfield').value != null && this.bocompanysetting_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bocompanysetting_Form.get('customfield').value);
        this.FillCustomField();
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanysetting_Form.controls) {
            let val = this.bocompanysetting_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocompanysetting_Form.controls[key] != null) {
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
        if (!this.bocompanysetting_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.bocompanysetting_Form.getRawValue();
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
    }
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
        if (!this.bocompanysetting_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocompanysetting_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocompanysetting_Form.controls[key] != null) {
                        this.formData[key] = this.bocompanysetting_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        this.spinner.show();
        this.bocompanysetting_service.saveOrUpdate_bocompanysettings(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bocompanysetting);
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
                        this.objvalues.push((res as any).bocompanysetting);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanysetting_Form.markAsUntouched();
                this.bocompanysetting_Form.markAsPristine();
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



