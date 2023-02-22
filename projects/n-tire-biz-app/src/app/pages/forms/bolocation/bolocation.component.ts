import { bolocationService } from './../../../service/bolocation.service';
import { bolocation } from './../../../model/bolocation.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput} from "ng-keyboard-shortcuts";
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
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-bolocation',
    templateUrl: './bolocation.component.html',
    styles: []
})

export class bolocationComponent implements OnInit {
    formData: bolocation;
    list: bolocation[];
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
    bfilterPopulate_bolocations: boolean = false;
    bolocation_menuactions: any = []
    bolocation_Form: FormGroup;
    locationid_List: DropDownValues[];
    locationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    branchid_List: any[];
    branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    customFieldJson: any;
    customFieldVisible: boolean = true;
    SESSIONUSERID: any;//current user
    sessionData: any;
    sourceKey: any;
    constructor(private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bolocation_service: bolocationService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bolocation_Form = this.fb.group({
            pk: [null],
            locationid: [null],
            locationiddesc: [null],
            branchid: [null],
            branchiddesc: [null],
            code: [null],
            name: [null],
            postalcode: [null],
            state: [null],
            stateid: [null],
            city: [null],
            cityid: [null],
            latitude: [null],
            longitude: [null],
            areadetails: [null],
            population: [null],
            remarks: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bolocation_Form.controls; }

    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bolocation_Form.dirty && this.bolocation_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.locationid && pkDetail) {
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
        let bolocationid = null;

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
        this.formid = bolocationid;
        if (this.pkcol == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bolocation_service.getDefaultData().then(res => {
            this.locationid_List = res.list_locationid.value;
            this.branchid_List = res.list_branchid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bolocation_service.get_bolocations_List().then(res => {
            this.pkList = res as bolocation[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bolocation_Form.markAsUntouched();
        this.bolocation_Form.markAsPristine();
    }
    onSelected_locationid(locationidDetail: any) {
        if (locationidDetail.value && locationidDetail) {
            this.bolocation_Form.patchValue({
                locationid: locationidDetail.value,
                locationiddesc: locationidDetail.label,
            });
        }
    }

    onSelected_branchid(branchidDetail: any) {
        if (branchidDetail.value && branchidDetail) {
            this.bolocation_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
        }
    }

    resetForm() {
        if (this.bolocation_Form != null)
            this.bolocation_Form.reset();
        this.bolocation_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let locationid = this.bolocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bolocation_service.delete_bolocation(locationid).then(res => {
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
        this.bolocation_Form.patchValue({
            locationid: null
        });
        if (this.formData.locationid != null) this.formData.locationid = null;
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
                        this.bolocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bolocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bolocation_Form.controls[key] != undefined) {
                                this.bolocation_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("bolocations", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });
    }
    onClose() {
        this.dialogRef.close(this.objvalues);
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
    locationid_onChange(evt: any) {
        let e = evt.value;
    }
    branchid_onChange(evt: any) {
        let e = evt.value;
    }
    edit_bolocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bolocation_service.get_bolocations_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bolocation;
            let formproperty = res.bolocation.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bolocation.pkcol;
            this.formid = res.bolocation.locationid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bolocation;
        this.formid = res.bolocation.locationid;
        this.pkcol = res.bolocation.pkcol;
        this.bmyrecord = false;
        if ((res.bolocation as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bolocation_Form.patchValue({
            locationid: res.bolocation.locationid,
            locationiddesc: res.bolocation.locationiddesc,
            branchid: res.bolocation.branchid,
            branchiddesc: res.bolocation.branchiddesc,
            code: res.bolocation.code,
            name: res.bolocation.name,
            postalcode: res.bolocation.postalcode,
            state: res.bolocation.state,
            stateid: res.bolocation.stateid,
            city: res.bolocation.city,
            cityid: res.bolocation.cityid,
            latitude: res.bolocation.latitude,
            longitude: res.bolocation.longitude,
            areadetails: res.bolocation.areadetails,
            population: res.bolocation.population,
            remarks: res.bolocation.remarks,
            customfield: res.bolocation.customfield,
            status: res.bolocation.status,
            statusdesc: res.bolocation.statusdesc,
        });
        this.bolocation_menuactions = res.bolocation_menuactions;
        if (this.bolocation_Form.get('customfield').value != null && this.bolocation_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bolocation_Form.get('customfield').value);
        this.FillCustomField();
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bolocation_Form.controls) {
            let val = this.bolocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bolocation_Form.controls[key] != null) {
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
        if (!this.bolocation_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.bolocation_Form.getRawValue();
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
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

        if (!this.bolocation_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bolocation_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bolocation_Form.controls[key] != null) {
                        this.formData[key] = this.bolocation_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        this.spinner.show();
        this.bolocation_service.saveOrUpdate_bolocations(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bolocation);
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
                        this.objvalues.push((res as any).bolocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bolocation_Form.markAsUntouched();
                this.bolocation_Form.markAsPristine();
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



