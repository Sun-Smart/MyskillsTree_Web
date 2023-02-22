import { bodashboarddetailService } from './../../../service/bodashboarddetail.service';
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
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
    selector: 'app-bodashboarddetail',
    templateUrl: './bodashboarddetail.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .mobile_btn_submit{
          padding: 4px 7px !important;
          margin-right: 0px !important;
        }
        .mobile_view{
          margin-left: 30px !important;
        }
      }
    `]
})

export class bodashboarddetailComponent implements OnInit {
    formData: bodashboarddetail;
    list: bodashboarddetail[];
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
    bfilterPopulate_bodashboarddetails: boolean = false;
    bodashboarddetail_menuactions: any = []
    bodashboarddetail_Form: FormGroup;
    dashboardid_List: DropDownValues[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    charttype_List: DropDownValues[];
    parameter1type_List: DropDownValues[];
    parameter1datetype_List: DropDownValues[];
    parameter2type_List: DropDownValues[];
    parameter2datetype_List: DropDownValues[];
    parameter3type_List: DropDownValues[];
    parameter3datetype_List: DropDownValues[];
    menuid_List: DropDownValues[];
    menuid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    reportid_List: DropDownValues[];
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
        private bodashboarddetail_service: bodashboarddetailService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bodashboarddetail_Form = this.fb.group({
            pk: [null],
            dashboarddetailid: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            dashboardname: [null],
            title: [null],
            row: [null],
            col: [null],
            charttype: [null],
            charttypedesc: [null],
            tablename: [null],
            recordname: [null],
            parameter: [null],
            name: [null],
            value: [null],
            parameter1variable: [null],
            parameter1type: [null],
            parameter1typedesc: [null],
            parameter1datetype: [null],
            parameter1datetypedesc: [null],
            parameter2variable: [null],
            parameter2type: [null],
            parameter2typedesc: [null],
            parameter2datetype: [null],
            parameter2datetypedesc: [null],
            parameter3variable: [null],
            parameter3type: [null],
            parameter3typedesc: [null],
            parameter3datetype: [null],
            parameter3datetypedesc: [null],
            backgroundcolor: [null],
            hoverbackgroundcolor: [null],
            bordercolor: [null],
            menuid: [null],
            menuiddesc: [null],
            reportid: [null],
            reportiddesc: [null],
            helptext: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bodashboarddetail_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.bodashboarddetail_Form.dirty && this.bodashboarddetail_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    onSelectedpk(pkDetail: any) {
        if (pkDetail.dashboarddetailid && pkDetail) {
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
        let bodashboarddetailid = null;

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
        this.formid = bodashboarddetailid;
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bodashboarddetail_service.getDefaultData().then(res => {
            this.dashboardid_List = res.list_dashboardid.value;
            this.charttype_List = res.list_charttype.value;
            this.parameter1type_List = res.list_parameter1type.value;
            this.parameter1datetype_List = res.list_parameter1datetype.value;
            this.parameter2type_List = res.list_parameter2type.value;
            this.parameter2datetype_List = res.list_parameter2datetype.value;
            this.parameter3type_List = res.list_parameter3type.value;
            this.parameter3datetype_List = res.list_parameter3datetype.value;
            this.menuid_List = res.list_menuid.value;
            this.reportid_List = res.list_reportid.value;
        }).catch((err) => { this.spinner.hide();});
        this.bodashboarddetail_service.get_bodashboarddetails_List().then(res => {
            this.pkList = res as bodashboarddetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bodashboarddetail_Form.markAsUntouched();
        this.bodashboarddetail_Form.markAsPristine();
    }
    onSelected_dashboardid(dashboardidDetail: any) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.bodashboarddetail_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,
            });
        }
    }
    onSelected_menuid(menuidDetail: any) {
        if (menuidDetail.value && menuidDetail) {
            this.bodashboarddetail_Form.patchValue({
                menuid: menuidDetail.value,
                menuiddesc: menuidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bodashboarddetail_Form != null)
            this.bodashboarddetail_Form.reset();
        this.bodashboarddetail_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let dashboarddetailid = this.bodashboarddetail_Form.get('dashboarddetailid').value;
        if (dashboarddetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bodashboarddetail_service.delete_bodashboarddetail(dashboarddetailid).then(res => {
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
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: null
        });
        if (this.formData.dashboarddetailid != null) this.formData.dashboarddetailid = null;
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
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboarddetail_Form.controls[key] != undefined) {
                                this.bodashboarddetail_Form.controls[key].disable({ onlySelf: true });
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
    dashboardid_onChange(evt: any) {
        let e = evt.value;
    }
    charttype_onChange(evt: any) {
        let e = this.f.charttype.value as any;
        this.bodashboarddetail_Form.patchValue({ charttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter1type_onChange(evt: any) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter1typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter1datetype_onChange(evt: any) {
        let e = this.f.parameter1datetype.value as any;
        this.bodashboarddetail_Form.patchValue({ parameter1datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter2type_onChange(evt: any) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter2typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter2datetype_onChange(evt: any) {
        let e = this.f.parameter2datetype.value as any;
        this.bodashboarddetail_Form.patchValue({ parameter2datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter3type_onChange(evt: any) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter3typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter3datetype_onChange(evt: any) {
        let e = this.f.parameter3datetype.value as any;
        this.bodashboarddetail_Form.patchValue({ parameter3datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    menuid_onChange(evt: any) {
        let e = evt.value;
    }
    reportid_onChange(evt: any) {
        let e = this.f.reportid.value as any;
        this.bodashboarddetail_Form.patchValue({ reportiddesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bodashboarddetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bodashboarddetail_service.get_bodashboarddetails_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bodashboarddetail;
            let formproperty = res.bodashboarddetail.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bodashboarddetail.pkcol;
            this.formid = res.bodashboarddetail.dashboarddetailid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bodashboarddetail;
        this.formid = res.bodashboarddetail.dashboarddetailid;
        this.pkcol = res.bodashboarddetail.pkcol;
        this.bmyrecord = false;
        if ((res.bodashboarddetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: res.bodashboarddetail.dashboarddetailid,
            dashboardid: res.bodashboarddetail.dashboardid,
            dashboardiddesc: res.bodashboarddetail.dashboardiddesc,
            dashboardname: res.bodashboarddetail.dashboardname,
            title: res.bodashboarddetail.title,
            row: res.bodashboarddetail.row,
            col: res.bodashboarddetail.col,
            charttype: res.bodashboarddetail.charttype,
            charttypedesc: res.bodashboarddetail.charttypedesc,
            tablename: res.bodashboarddetail.tablename,
            recordname: res.bodashboarddetail.recordname,
            parameter: res.bodashboarddetail.parameter,
            name: res.bodashboarddetail.name,
            value: res.bodashboarddetail.value,
            parameter1variable: res.bodashboarddetail.parameter1variable,
            parameter1type: res.bodashboarddetail.parameter1type,
            parameter1typedesc: res.bodashboarddetail.parameter1typedesc,
            parameter1datetype: res.bodashboarddetail.parameter1datetype,
            parameter1datetypedesc: res.bodashboarddetail.parameter1datetypedesc,
            parameter2variable: res.bodashboarddetail.parameter2variable,
            parameter2type: res.bodashboarddetail.parameter2type,
            parameter2typedesc: res.bodashboarddetail.parameter2typedesc,
            parameter2datetype: res.bodashboarddetail.parameter2datetype,
            parameter2datetypedesc: res.bodashboarddetail.parameter2datetypedesc,
            parameter3variable: res.bodashboarddetail.parameter3variable,
            parameter3type: res.bodashboarddetail.parameter3type,
            parameter3typedesc: res.bodashboarddetail.parameter3typedesc,
            parameter3datetype: res.bodashboarddetail.parameter3datetype,
            parameter3datetypedesc: res.bodashboarddetail.parameter3datetypedesc,
            backgroundcolor: res.bodashboarddetail.backgroundcolor,
            hoverbackgroundcolor: res.bodashboarddetail.hoverbackgroundcolor,
            bordercolor: res.bodashboarddetail.bordercolor,
            menuid: res.bodashboarddetail.menuid,
            menuiddesc: res.bodashboarddetail.menuiddesc,
            reportid: res.bodashboarddetail.reportid,
            reportiddesc: res.bodashboarddetail.reportiddesc,
            helptext: res.bodashboarddetail.helptext,
            status: res.bodashboarddetail.status,
            statusdesc: res.bodashboarddetail.statusdesc,
        });
        this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bodashboarddetail_Form.controls) {
            let val = this.bodashboarddetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bodashboarddetail_Form.controls[key] != null) {
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
        if (!this.bodashboarddetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bodashboarddetail_Form.getRawValue();
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

        if (!this.bodashboarddetail_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bodashboarddetail_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bodashboarddetail_Form.controls[key] != null) {
                        this.formData[key] = this.bodashboarddetail_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.bodashboarddetail_service.saveOrUpdate_bodashboarddetails(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bodashboarddetail);
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
                        this.objvalues.push((res as any).bodashboarddetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bodashboarddetail_Form.markAsUntouched();
                this.bodashboarddetail_Form.markAsPristine();
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



