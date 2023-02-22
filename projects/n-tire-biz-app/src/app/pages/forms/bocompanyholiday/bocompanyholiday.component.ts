import { bocompanyholidayService } from './../../../service/bocompanyholiday.service';
import { bocompanyholiday } from './../../../model/bocompanyholiday.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
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
@Component({
    selector: 'app-bocompanyholiday',
    templateUrl: './bocompanyholiday.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
      .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        h1.col-4.columns.mainheader.left{
          margin-left: 65px !important;
        }
        .custom_mobile_view{
          padding: 4px 4px !important;
          margin-left: -12px !important;
          display: block !important;
        }
      }
    `]
})



export class bocompanyholidayComponent implements OnInit {
    formData: bocompanyholiday;
    list: bocompanyholiday[];
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
    bfilterPopulate_bocompanyholidays: boolean = false;
    bocompanyholiday_menuactions: any = []
    bocompanyholiday_Form: FormGroup;
    financialyearid_List: DropDownValues[];
    holidayday_List: DropDownValues[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    constructor(private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocompanyholiday_service: bocompanyholidayService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bocompanyholiday_Form = this.fb.group({
            pk: [null],
            holidayid: [null],
            financialyearid: [null],
            financialyeariddesc: [null],
            holidaydate: [null],
            holidayday: [null],
            holidaydaydesc: [null],
            reason: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bocompanyholiday_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bocompanyholiday_Form.dirty && this.bocompanyholiday_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    onSelectedpk(pkDetail: any) {
        if (pkDetail.holidayid && pkDetail) {
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
        let bocompanyholidayid = null;
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
        this.formid = bocompanyholidayid;
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bocompanyholiday_service.getDefaultData().then(res => {
            this.financialyearid_List = res.list_financialyearid.value;
            this.holidayday_List = res.list_holidayday.value;
        }).catch((err) => { this.spinner.hide();});

        this.bocompanyholiday_service.get_bocompanyholidays_List().then(res => {
            this.pkList = res as bocompanyholiday[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bocompanyholiday_Form.markAsUntouched();
        this.bocompanyholiday_Form.markAsPristine();
    }
    resetForm() {
        if (this.bocompanyholiday_Form != null)
            this.bocompanyholiday_Form.reset();
        this.bocompanyholiday_Form.patchValue({
            financialyearid: this.sessionData.finyearid,
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let holidayid = this.bocompanyholiday_Form.get('holidayid').value;
        if (holidayid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanyholiday_service.delete_bocompanyholiday(holidayid).then(res => {
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
        this.bocompanyholiday_Form.patchValue({
            holidayid: null
        });
        if (this.formData.holidayid != null) this.formData.holidayid = null;
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
                    else if (key == "holidaydate")
                        this.bocompanyholiday_Form.patchValue({ "holidaydate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bocompanyholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanyholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanyholiday_Form.controls[key] != undefined) {
                                this.bocompanyholiday_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.holidaydate != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.holidaydate != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    financialyearid_onChange(evt: any) {
        let e = evt.value;
        this.bocompanyholiday_Form.patchValue({ financialyeariddesc: evt.options[evt.options.selectedIndex].text });
    }
    holidayday_onChange(evt: any) {
        let e = this.f.holidayday.value as any;
        this.bocompanyholiday_Form.patchValue({ holidaydaydesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bocompanyholidays() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocompanyholiday_service.get_bocompanyholidays_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bocompanyholiday;
            let formproperty = res.bocompanyholiday.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocompanyholiday.pkcol;
            this.formid = res.bocompanyholiday.holidayid;
            this.FillData(res);
        }).catch((err) => {});
    }

    FillData(res: any) {
        this.formData = res.bocompanyholiday;
        this.formid = res.bocompanyholiday.holidayid;
        this.pkcol = res.bocompanyholiday.pkcol;
        this.bmyrecord = false;
        if ((res.bocompanyholiday as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bocompanyholiday_Form.patchValue({
            holidayid: res.bocompanyholiday.holidayid,
            financialyearid: res.bocompanyholiday.financialyearid,
            financialyeariddesc: res.bocompanyholiday.financialyeariddesc,
            holidaydate: this.ngbDateParserFormatter.parse(res.bocompanyholiday.holidaydate),
            holidayday: res.bocompanyholiday.holidayday,
            holidaydaydesc: res.bocompanyholiday.holidaydaydesc,
            reason: res.bocompanyholiday.reason,
            status: res.bocompanyholiday.status,
            statusdesc: res.bocompanyholiday.statusdesc,
        });
        this.bocompanyholiday_menuactions = res.bocompanyholiday_menuactions;
    }

    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanyholiday_Form.controls) {
            let val = this.bocompanyholiday_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocompanyholiday_Form.controls[key] != null) {
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
        if (!this.bocompanyholiday_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bocompanyholiday_Form.getRawValue();
        obj.holidaydate = new Date(this.bocompanyholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bocompanyholiday_Form.get('holidaydate').value) + '  UTC' : null);
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
        if (!this.bocompanyholiday_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocompanyholiday_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocompanyholiday_Form.controls[key] != null) {
                        this.formData[key] = this.bocompanyholiday_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.holidaydate = new Date(this.bocompanyholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bocompanyholiday_Form.get('holidaydate').value) + '  UTC' : null);
        this.spinner.show();
        this.bocompanyholiday_service.saveOrUpdate_bocompanyholidays(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bocompanyholiday);
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
                        this.objvalues.push((res as any).bocompanyholiday);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanyholiday_Form.markAsUntouched();
                this.bocompanyholiday_Form.markAsPristine();
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



