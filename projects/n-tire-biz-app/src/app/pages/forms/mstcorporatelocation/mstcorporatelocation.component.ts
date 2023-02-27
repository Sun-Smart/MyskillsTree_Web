import { mstcorporatelocationService } from './../../../service/mstcorporatelocation.service';
import { mstcorporatelocation } from './../../../model/mstcorporatelocation.model';
import {  Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
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
    selector: 'app-mstcorporatelocation',
    templateUrl: './mstcorporatelocation.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
      .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mst_cor_btn{
          padding: 4px 6px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .mobile_viewsubmit{
          margin-top: 4px !important;
        }
        .custom_mobile_view{
          margin-right: 0px !important;
          padding: 4px 5px !important;
          display: block !important;
        }
    }
    `]
})



export class mstcorporatelocationComponent implements OnInit {
    formData: mstcorporatelocation;
    list: mstcorporatelocation[];
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

    bfilterPopulate_mstcorporatelocations: boolean = false;
    mstcorporatelocation_menuactions: any = []

    mstcorporatelocation_Form: FormGroup;

    countryid_List: DropDownValues[];
    countryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    stateid_List: DropDownValues[];
    stateid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    cityid_List: DropDownValues[];
    cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private mstcorporatelocation_service: mstcorporatelocationService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstcorporatelocation_Form = this.fb.group({
            pk: [null],
            locationid: [null],
            corporateid: [null],
            branchid: [null],
            branchdesc:[null],
            countryid: [null, Validators.compose([Validators.required])],
            countryiddesc: [null],
            stateid: [null, Validators.compose([Validators.required])],
            stateiddesc: [null],
            cityid: [null, Validators.compose([Validators.required])],
            cityiddesc: [null],
            address1: [null],
            address2: [null],
            pincode: [null],
            contactperson: [null],
            designation: [null],
            emailid: [null, Validators.compose([Validators.required])],
            mobile: [null, Validators.compose([Validators.required])],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstcorporatelocation_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstcorporatelocation_Form.dirty && this.mstcorporatelocation_Form.touched) {
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
        let mstcorporatelocationid = null;

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
        this.formid = mstcorporatelocationid;
        //alert(mstcorporatelocationid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstcorporatelocation_service.getDefaultData().then(res => {
            this.countryid_List = res.list_countryid.value;
            this.stateid_List = res.list_stateid.value;
            this.cityid_List = res.list_cityid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstcorporatelocation_service.get_mstcorporatelocations_List().then(res => {
            this.pkList = res as mstcorporatelocation[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.mstcorporatelocation_Form.markAsUntouched();
        this.mstcorporatelocation_Form.markAsPristine();
    }
    onSelected_countryid(countryidDetail: any) {

        if (countryidDetail.value && countryidDetail) {
            this.mstcorporatelocation_Form.patchValue({
              country: countryidDetail.value,
              countrydesc: countryidDetail.label,

            });
            this.mstcorporatelocation_service.getList_stateid(countryidDetail.value).then(res => {
              this.stateid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); });

          }
    }

    onSelected_stateid(stateidDetail: any) {
        if (stateidDetail.value && stateidDetail) {
            this.mstcorporatelocation_Form.patchValue({
              state: stateidDetail.value,
              statedesc: stateidDetail.label,

            });
            this.mstcorporatelocation_service.getList_cityid(stateidDetail.value).then(res => {
              this.cityid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide();});

          }
    }

    onSelected_cityid(cityidDetail: any) {
        if (cityidDetail.value && cityidDetail) {
            this.mstcorporatelocation_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,

            });

        }
    }




    resetForm() {
        if (this.mstcorporatelocation_Form != null)
            this.mstcorporatelocation_Form.reset();
        this.mstcorporatelocation_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let locationid = this.mstcorporatelocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstcorporatelocation_service.delete_mstcorporatelocation(locationid).then(res => {
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
        this.mstcorporatelocation_Form.patchValue({
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
                        this.mstcorporatelocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstcorporatelocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstcorporatelocation_Form.controls[key] != undefined) {
                                this.mstcorporatelocation_Form.controls[key].disable({ onlySelf: true });
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
    countryid_onChange(evt: any) {
        let e = evt.value;
    }
    stateid_onChange(evt: any) {
        let e = evt.value;
    }
    cityid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_mstcorporatelocations() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstcorporatelocation_service.get_mstcorporatelocations_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstcorporatelocation;
            let formproperty = res.mstcorporatelocation.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstcorporatelocation.pkcol;
            this.formid = res.mstcorporatelocation.locationid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstcorporatelocation;
        this.formid = res.mstcorporatelocation.locationid;
        this.pkcol = res.mstcorporatelocation.pkcol;
        this.bmyrecord = false;
        if ((res.mstcorporatelocation as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstcorporatelocation_Form.patchValue({
            locationid: res.mstcorporatelocation.locationid,
            corporateid: res.mstcorporatelocation.corporateid,
            branchid: res.mstcorporatelocation.branchid,
            branchdesc: res.mstcorporatelocation.branchdesc,
            countryid: res.mstcorporatelocation.countryid,
            countryiddesc: res.mstcorporatelocation.countryiddesc,
            stateid: res.mstcorporatelocation.stateid,
            stateiddesc: res.mstcorporatelocation.stateiddesc,
            cityid: res.mstcorporatelocation.cityid,
            cityiddesc: res.mstcorporatelocation.cityiddesc,
            address1: res.mstcorporatelocation.address1,
            address2: res.mstcorporatelocation.address2,
            pincode: res.mstcorporatelocation.pincode,
            contactperson: res.mstcorporatelocation.contactperson,
            designation: res.mstcorporatelocation.designation,
            emailid: res.mstcorporatelocation.emailid,
            mobile: res.mstcorporatelocation.mobile,
            status: res.mstcorporatelocation.status,
            statusdesc: res.mstcorporatelocation.statusdesc,
        });
        this.mstcorporatelocation_menuactions = res.mstcorporatelocation_menuactions;
        //Child Tables if any

        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null) this.mstcorporatelocation_service.getList_stateid(this.f.countryid.value).then(res => {
              this.stateid_List = res as DropDownValues[];
              this.mstcorporatelocation_Form.patchValue({
                stateid: this.formData.stateid,
                stateiddesc: this.formData.stateiddesc,
              })
            }).catch((err) => { });
          });
          setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null) this.mstcorporatelocation_service.getList_cityid(this.f.stateid.value).then(res => {
              this.cityid_List = res as DropDownValues[];
              this.mstcorporatelocation_Form.patchValue({
                cityid: this.formData.cityid,
                cityiddesc: this.formData.cityiddesc,
              })
            }).catch((err) => { });
          });
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstcorporatelocation_Form.controls) {
            let val = this.mstcorporatelocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstcorporatelocation_Form.controls[key] != null) {
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
        if (!this.mstcorporatelocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstcorporatelocation_Form.getRawValue();
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

        if (!this.mstcorporatelocation_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.mstcorporatelocation_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstcorporatelocation_Form.controls[key] != null) {
                        this.formData[key] = this.mstcorporatelocation_Form.controls[key].value;
                    }
                }
            }
        }
        this.spinner.show();
        this.mstcorporatelocation_service.saveOrUpdate_mstcorporatelocations(this.formData).subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).mstcorporatelocation);
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
                        this.objvalues.push((res as any).mstcorporatelocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstcorporatelocation_Form.markAsUntouched();
                this.mstcorporatelocation_Form.markAsPristine();
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



