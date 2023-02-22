import { bocompanyregistrationService } from './../../../service/bocompanyregistration.service';
import { bocompanyregistration } from './../../../model/bocompanyregistration.model';
import {  Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer,  } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-bocompanyregistration',
    templateUrl: './bocompanyregistration.component.html',
    styles: []
})
export class bocompanyregistrationComponent implements OnInit {
    formData: bocompanyregistration;
    list: bocompanyregistration[];
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
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;
    bfilterPopulate_bocompanyregistrations: boolean = false;
    bocompanyregistration_menuactions: any = []
    bocompanyregistration_Form: FormGroup;
    companytype_List: DropDownValues[];
    designation_List: DropDownValues[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    sessionData: any;
    sourceKey: any;
    constructor(private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocompanyregistration_service: bocompanyregistrationService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bocompanyregistration_Form = this.fb.group({
            pk: [null],
            registrationid: [null],
            companyname: ['',Validators.required],
            companytype: ['',Validators.required],
            companytypedesc: ['',Validators.required],
            firstname: ['',Validators.required],
            lastname: ['',Validators.required],
            designation: [null],
            designationdesc: [null],
            emailid: ['',Validators.required],
            mobilenumber: ['',Validators.required],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bocompanyregistration_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bocompanyregistration_Form.dirty && this.bocompanyregistration_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.registrationid && pkDetail) {
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
        let bocompanyregistrationid = null;

        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
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
        this.formid = bocompanyregistrationid;
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bocompanyregistration_service.getDefaultData().then(res => {
            this.companytype_List = res.list_companytype.value;
            this.designation_List = res.list_designation.value;
        }).catch((err) => { this.spinner.hide();});

        this.bocompanyregistration_service.get_bocompanyregistrations_List().then(res => {
            this.pkList = res as bocompanyregistration[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide();});
        this.bocompanyregistration_Form.markAsUntouched();
        this.bocompanyregistration_Form.markAsPristine();
    }
    resetForm() {
        if (this.bocompanyregistration_Form != null)
            this.bocompanyregistration_Form.reset();
        this.bocompanyregistration_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let registrationid = this.bocompanyregistration_Form.get('registrationid').value;
        if (registrationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanyregistration_service.delete_bocompanyregistration(registrationid).then(res => {
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
        this.bocompanyregistration_Form.patchValue({
            registrationid: null
        });
        if (this.formData.registrationid != null) this.formData.registrationid = null;
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
                        this.bocompanyregistration_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanyregistration_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanyregistration_Form.controls[key] != undefined) {
                                this.bocompanyregistration_Form.controls[key].disable({ onlySelf: true });
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
    companytype_onChange(evt: any) {
        let e = this.f.companytype.value as any;
        this.bocompanyregistration_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    designation_onChange(evt: any) {
        let e = evt.value;
        this.bocompanyregistration_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bocompanyregistrations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocompanyregistration_service.get_bocompanyregistrations_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bocompanyregistration;
            let formproperty = res.bocompanyregistration.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocompanyregistration.pkcol;
            this.formid = res.bocompanyregistration.registrationid;
            this.FillData(res);
        }).catch((err) => {});
    }

    FillData(res: any) {
        this.formData = res.bocompanyregistration;
        this.formid = res.bocompanyregistration.registrationid;
        this.pkcol = res.bocompanyregistration.pkcol;
        this.bmyrecord = false;
        if ((res.bocompanyregistration as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bocompanyregistration_Form.patchValue({
            registrationid: res.bocompanyregistration.registrationid,
            companyname: res.bocompanyregistration.companyname,
            companytype: res.bocompanyregistration.companytype,
            companytypedesc: res.bocompanyregistration.companytypedesc,
            firstname: res.bocompanyregistration.firstname,
            lastname: res.bocompanyregistration.lastname,
            designation: res.bocompanyregistration.designation,
            designationdesc: res.bocompanyregistration.designationdesc,
            emailid: res.bocompanyregistration.emailid,
            mobilenumber: res.bocompanyregistration.mobilenumber,
            status: res.bocompanyregistration.status,
            statusdesc: res.bocompanyregistration.statusdesc,
        });
        this.bocompanyregistration_menuactions = res.bocompanyregistration_menuactions;
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanyregistration_Form.controls) {
            let val = this.bocompanyregistration_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocompanyregistration_Form.controls[key] != null) {
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
        if (!this.bocompanyregistration_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bocompanyregistration_Form.getRawValue();
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
        if (!this.bocompanyregistration_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocompanyregistration_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocompanyregistration_Form.controls[key] != null) {
                        this.formData[key] = this.bocompanyregistration_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.bocompanyregistration_service.saveOrUpdate_bocompanyregistrations(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                if (res == 'Email already exist') {
                  this.toastr.addSingle("error", "", "Email already exist");
              }
              else{
                this.toastr.addSingle("success", "", "Successfully Registered.Check your mail for the login credentials");
                alert("Successfully Registered.Check your mail for the login credentials");
                this.objvalues.push((res as any).bocompanyregistration);
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
                        this.objvalues.push((res as any).bocompanyregistration);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanyregistration_Form.markAsUntouched();
                this.bocompanyregistration_Form.markAsPristine();
              }

            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", "Email already exist");
            }
        )
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



