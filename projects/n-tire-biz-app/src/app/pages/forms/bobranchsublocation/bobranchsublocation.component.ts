import { bobranchsublocationService } from './../../../service/bobranchsublocation.service';
import { bobranchsublocation } from './../../../model/bobranchsublocation.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
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
    selector: 'app-bobranchsublocation',
    templateUrl: './bobranchsublocation.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class bobranchsublocationComponent implements OnInit {
    formData: bobranchsublocation;
    list: bobranchsublocation[];
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
    bfilterPopulate_bobranchsublocations: boolean = false;
    bobranchsublocation_menuactions: any = []
    bobranchsublocation_Form: FormGroup;
    locationid_List: DropDownValues[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bobranchsublocation_service: bobranchsublocationService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bobranchsublocation_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            sublocationid: [null],
            locationid: [null],
            locationiddesc: [null],
            locationname: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bobranchsublocation_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bobranchsublocation_Form.dirty && this.bobranchsublocation_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    onSelectedpk(pkDetail: any) {
        if (pkDetail.sublocationid && pkDetail) {
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
        let bobranchsublocationid = null;

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
        this.formid = bobranchsublocationid;
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bobranchsublocation_service.getDefaultData().then(res => {
            this.locationid_List = res.list_locationid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bobranchsublocation_service.get_bobranchsublocations_List().then(res => {
            this.pkList = res as bobranchsublocation[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        this.bobranchsublocation_Form.markAsUntouched();
        this.bobranchsublocation_Form.markAsPristine();
    }
    resetForm() {
        if (this.bobranchsublocation_Form != null)
            this.bobranchsublocation_Form.reset();
        this.bobranchsublocation_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let sublocationid = this.bobranchsublocation_Form.get('sublocationid').value;
        if (sublocationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchsublocation_service.delete_bobranchsublocation(sublocationid).then(res => {
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
        this.bobranchsublocation_Form.patchValue({
            sublocationid: null
        });
        if (this.formData.sublocationid != null) this.formData.sublocationid = null;
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
                        this.bobranchsublocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchsublocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchsublocation_Form.controls[key] != undefined) {
                                this.bobranchsublocation_Form.controls[key].disable({ onlySelf: true });
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
    locationid_onChange(evt: any) {
        let e = evt.value;
        this.bobranchsublocation_Form.patchValue({ locationiddesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bobranchsublocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bobranchsublocation_service.get_bobranchsublocations_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bobranchsublocation;
            let formproperty = res.bobranchsublocation.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bobranchsublocation.pkcol;
            this.formid = res.bobranchsublocation.sublocationid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bobranchsublocation;
        this.formid = res.bobranchsublocation.sublocationid;
        this.pkcol = res.bobranchsublocation.pkcol;
        this.bmyrecord = false;
        if ((res.bobranchsublocation as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bobranchsublocation_Form.patchValue({
            branchid: res.bobranchsublocation.branchid,
            sublocationid: res.bobranchsublocation.sublocationid,
            locationid: res.bobranchsublocation.locationid,
            locationiddesc: res.bobranchsublocation.locationiddesc,
            locationname: res.bobranchsublocation.locationname,
            status: res.bobranchsublocation.status,
            statusdesc: res.bobranchsublocation.statusdesc,
        });
        this.bobranchsublocation_menuactions = res.bobranchsublocation_menuactions;
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchsublocation_Form.controls) {
            let val = this.bobranchsublocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bobranchsublocation_Form.controls[key] != null) {
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
        if (!this.bobranchsublocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bobranchsublocation_Form.getRawValue();
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
        if (!this.bobranchsublocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bobranchsublocation_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bobranchsublocation_Form.controls[key] != null) {
                        this.formData[key] = this.bobranchsublocation_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.bobranchsublocation_service.saveOrUpdate_bobranchsublocations(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bobranchsublocation);
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
                        this.objvalues.push((res as any).bobranchsublocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchsublocation_Form.markAsUntouched();
                this.bobranchsublocation_Form.markAsPristine();
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



