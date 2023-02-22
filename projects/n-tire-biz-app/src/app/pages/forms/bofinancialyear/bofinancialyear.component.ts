import { bofinancialyearService } from './../../../service/bofinancialyear.service';
import { bofinancialyear } from './../../../model/bofinancialyear.model';
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
import { AppConstants } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-bofinancialyear',
    templateUrl: './bofinancialyear.component.html',
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
          /* margin-left: 65px !important; */
        }
        .custom_mobile_view{
          padding: 4px 4px !important;
          margin-left: -12px !important;
          display: block !important;
        }
      }
    `]
})

export class bofinancialyearComponent implements OnInit {
    formData: bofinancialyear;
    list: bofinancialyear[];
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
    bfilterPopulate_bofinancialyears: boolean = false;
    bofinancialyear_menuactions: any = []
    bofinancialyear_Form: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    sessionData: any;
    sourceKey: any;
    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bofinancialyear_service: bofinancialyearService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bofinancialyear_Form = this.fb.group({
            pk: [null],
            finyearid: [null],
            finyearname: [null],
            startdate: [null],
            enddate: [null],
            currentyear: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bofinancialyear_Form.controls; }

    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.bofinancialyear_Form.dirty && this.bofinancialyear_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    enddateexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.enddate.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].finyearid.toString() != this.formid.toString()) {
            if (confirm("This End Date value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
    finyearnameexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.finyearname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].finyearid.toString() != this.formid.toString()) {
            if (confirm("This Fin Year Name value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
    startdateexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.startdate.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].finyearid.toString() != this.formid.toString()) {
            if (confirm("This Start Date value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
    onSelectedpk(pkDetail: any) {
        if (pkDetail.finyearid && pkDetail) {
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
        let bofinancialyearid = null;

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
        //copy the data from previous dialog
        this.viewHtml = ``;
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = bofinancialyearid;
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bofinancialyear_service.getDefaultData().then(res => {
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bofinancialyear_service.get_bofinancialyears_List().then(res => {
            this.pkList = res as bofinancialyear[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bofinancialyear_Form.markAsUntouched();
        this.bofinancialyear_Form.markAsPristine();
    }
    resetForm() {
        if (this.bofinancialyear_Form != null)
            this.bofinancialyear_Form.reset();
        this.bofinancialyear_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let finyearid = this.bofinancialyear_Form.get('finyearid').value;
        if (finyearid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bofinancialyear_service.delete_bofinancialyear(finyearid).then(res => {
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
        this.bofinancialyear_Form.patchValue({
            finyearid: null
        });
        if (this.formData.finyearid != null) this.formData.finyearid = null;
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
                    else if (key == "startdate")
                        this.bofinancialyear_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enddate")
                        this.bofinancialyear_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bofinancialyear_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bofinancialyear_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bofinancialyear_Form.controls[key] != undefined) {
                                this.bofinancialyear_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.finyearname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.finyearname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }

    edit_bofinancialyears() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bofinancialyear_service.get_bofinancialyears_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bofinancialyear;
            let formproperty = res.bofinancialyear.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bofinancialyear.pkcol;
            this.formid = res.bofinancialyear.finyearid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bofinancialyear;
        this.formid = res.bofinancialyear.finyearid;
        this.pkcol = res.bofinancialyear.pkcol;
        this.bmyrecord = false;
        if ((res.bofinancialyear as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bofinancialyear_Form.patchValue({
            finyearid: res.bofinancialyear.finyearid,
            finyearname: res.bofinancialyear.finyearname,
            startdate: this.ngbDateParserFormatter.parse(res.bofinancialyear.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.bofinancialyear.enddate),
            currentyear: res.bofinancialyear.currentyear,
            status: res.bofinancialyear.status,
            statusdesc: res.bofinancialyear.statusdesc,
        });
        this.bofinancialyear_menuactions = res.bofinancialyear_menuactions;
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bofinancialyear_Form.controls) {
            let val = this.bofinancialyear_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bofinancialyear_Form.controls[key] != null) {
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
        if (!this.bofinancialyear_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bofinancialyear_Form.getRawValue();
        obj.startdate = new Date(this.bofinancialyear_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bofinancialyear_Form.get('startdate').value) + '  UTC' : null);
        obj.enddate = new Date(this.bofinancialyear_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bofinancialyear_Form.get('enddate').value) + '  UTC' : null);
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

        if (!this.bofinancialyear_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bofinancialyear_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bofinancialyear_Form.controls[key] != null) {
                        this.formData[key] = this.bofinancialyear_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.startdate = new Date(this.bofinancialyear_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bofinancialyear_Form.get('startdate').value) + '  UTC' : null);
        this.formData.enddate = new Date(this.bofinancialyear_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bofinancialyear_Form.get('enddate').value) + '  UTC' : null);
        this.spinner.show();
        this.bofinancialyear_service.saveOrUpdate_bofinancialyears(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bofinancialyear);
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
                        this.objvalues.push((res as any).bofinancialyear);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bofinancialyear_Form.markAsUntouched();
                this.bofinancialyear_Form.markAsPristine();
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



