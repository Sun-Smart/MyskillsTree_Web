import { mstcorporatemasterService } from './../../../service/mstcorporatemaster.service';
import { mstcorporatemaster } from './../../../model/mstcorporatemaster.model';
import {  Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CorporateDashboardComponent } from '../corporate.component';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { mstcorporatelocationComponent } from './../../../pages/forms/mstcorporatelocation/mstcorporatelocation.component';
import { mstjobrequirementComponent } from './../../../pages/forms/mstjobrequirement/mstjobrequirement.component';
import { mstjobstatusComponent } from './../../../pages/forms/mstjobstatus/mstjobstatus.component';
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
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';

@Component({
    selector: 'app-mstcorporatemaster',
    templateUrl: './mstcorporatemaster.component.html',
    styles: [`
    ::ng-deep ng2-smart-table-title a{
        font-size:13px;
        color:#fff !important;
    }
    .table{
        margin: auto !important;
    }

    ::ng-deep  .ng2-smart-row td {
        vertical-align: middle;
    }
    :host /deep/ ng2-smart-table tbody > tr:nth-child(even) {
        background-color : #f4f4f4 !important;
        }
        .table thead tr {
            background-color: #a89888 !important;
            color: #fff !important;
            border: #6b431d !important;
        }

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
    }
    `],
    providers: [CorporateDashboardComponent]
})



export class mstcorporatemasterComponent implements OnInit {
    formData: mstcorporatemaster;
    list: mstcorporatemaster[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';
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

    bfilterPopulate_mstcorporatemasters: boolean = false;
    bfilterPopulate_mstcorporatelocations: boolean = false;
    bfilterPopulate_mstjobrequirements: boolean = false;
    bfilterPopulate_mstjobstatuses: boolean = false;
    mstcorporatemaster_menuactions: any = []
    mstcorporatelocation_menuactions: any = []
    @ViewChild('tbl_mstcorporatelocations', { static: false }) tbl_mstcorporatelocations: Ng2SmartTableComponent;
    mstjobrequirement_menuactions: any = []
    @ViewChild('tbl_mstjobrequirements', { static: false }) tbl_mstjobrequirements: Ng2SmartTableComponent;
    mstjobstatus_menuactions: any = []
    @ViewChild('tbl_mstjobstatuses', { static: false }) tbl_mstjobstatuses: Ng2SmartTableComponent;

    mstcorporatemaster_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    @ViewChild('kycupload', { static: false }) kycupload: AttachmentComponent;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    useridvisible: boolean = false;

    userrole: any;
    showApplicantmenu: boolean = false;
    showAdminMenuaccess: boolean = false;
    showCorporateMenuaccess: boolean = false;


    mstcorporatelocations_visiblelist: any;
    mstcorporatelocations_hidelist: any;
    mstjobrequirements_visiblelist: any;
    mstjobrequirements_hidelist: any;
    mstjobstatuses_visiblelist: any;
    mstjobstatuses_hidelist: any;

    Deleted_mstcorporatelocation_IDs: string = "";
    mstcorporatelocations_ID: string = "1";
    mstcorporatelocations_selectedindex: any;
    Deleted_mstjobrequirement_IDs: string = "";
    mstjobrequirements_ID: string = "2";
    mstjobrequirements_selectedindex: any;
    Deleted_mstjobstatus_IDs: string = "";
    mstjobstatuses_ID: string = "3";
    mstjobstatuses_selectedindex: any;
    applicantid: number;


    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstcorporatemaster_service: mstcorporatemasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstcorporatemaster_Form = this.fb.group({
            pk: [null],
            corporateid: [null],
            companyname: [null],
            tlnumber: [null],
            taxregistrationnumber: [null],
            licensevalidto: [null],
            kycupload: [null],
            userid: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstcorporatemaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstcorporatemaster_Form.dirty && this.mstcorporatemaster_Form.touched) {
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
        if (pkDetail.corporateid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {

        if (this.sessionService.getItem('role') == '1') {
            this.userrole = 'Admin';
            this.showAdminMenuaccess = true;
            this.showApplicantmenu = false;
            this.showCorporateMenuaccess = false;
        } else if (this.sessionService.getItem('role') == '2') {
            this.userrole = 'Applicant';
            this.showApplicantmenu = true;
            this.showAdminMenuaccess = false;
            this.showCorporateMenuaccess = false;
        } else if (this.sessionService.getItem('role') == '3') {
            this.userrole = 'Corporate';
            this.showCorporateMenuaccess = true;
            this.showApplicantmenu = false;
            this.showAdminMenuaccess = false;
        }

        this.sessionService.setItem("choosefileforprofile", "ok");
        //session & theme
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
        let mstcorporatemasterid = null;

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
        this.formid = mstcorporatemasterid;
        //alert(mstcorporatemasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_mstcorporatelocations_TableConfig();

            this.Set_mstjobrequirements_TableConfig();

            this.Set_mstjobstatuses_TableConfig();

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstcorporatemaster_service.getDefaultData().then(res => {
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstcorporatemaster_service.get_mstcorporatemasters_List().then(res => {
            this.pkList = res as mstcorporatemaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.mstcorporatemaster_Form.markAsUntouched();
        this.mstcorporatemaster_Form.markAsPristine();
    }



    getkycupload() {
        if (this.kycupload.getAttachmentList().length > 0) {
            let file = this.kycupload.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        if (this.mstcorporatemaster_Form != null)
            this.mstcorporatemaster_Form.reset();
        this.mstcorporatemaster_Form.patchValue({
        });
        setTimeout(() => {
            this.mstcorporatelocations_LoadTable();
            this.mstjobrequirements_LoadTable();
            this.mstjobstatuses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.useridvisible = false;
    }

    onDelete() {
        let corporateid = this.mstcorporatemaster_Form.get('corporateid').value;
        if (corporateid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstcorporatemaster_service.delete_mstcorporatemaster(corporateid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide();});
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstcorporatemaster_Form.patchValue({
            corporateid: null
        });
        if (this.formData.corporateid != null) this.formData.corporateid = null;
        for (let i = 0; i < this.tbl_mstcorporatelocations.source.length; i++) {
            this.tbl_mstcorporatelocations.source[i].locationid = null;
        }
        for (let i = 0; i < this.tbl_mstjobrequirements.source.length; i++) {
            this.tbl_mstjobrequirements.source[i].jobid = null;
        }
        for (let i = 0; i < this.tbl_mstjobstatuses.source.length; i++) {
            this.tbl_mstjobstatuses.source[i].viewid = null;
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
                    else if (key == "licensevalidto")
                        this.mstcorporatemaster_Form.patchValue({ "licensevalidto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstcorporatemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstcorporatemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstcorporatemaster_Form.controls[key] != undefined) {
                                this.mstcorporatemaster_Form.controls[key].disable({ onlySelf: true });
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
    goBack() {
        this.router.navigate(['/home/corporatedashboard']);

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

    edit_mstcorporatemasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.kycupload != null && this.kycupload != undefined) this.kycupload.setattachmentlist(this.mstcorporatemaster_Form.get('kycupload').value);
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstcorporatemaster_service.get_mstcorporatemasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstcorporatemaster;
            let formproperty = res.mstcorporatemaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstcorporatemaster.pkcol;
            this.formid = res.mstcorporatemaster.corporateid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstcorporatemaster;
        this.formid = res.mstcorporatemaster.corporateid;
        this.pkcol = res.mstcorporatemaster.pkcol;
        this.bmyrecord = false;
        if ((res.mstcorporatemaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstcorporatemaster_Form.patchValue({
            corporateid: res.mstcorporatemaster.corporateid,
            companyname: res.mstcorporatemaster.companyname,
            tlnumber: res.mstcorporatemaster.tlnumber,
            taxregistrationnumber: res.mstcorporatemaster.taxregistrationnumber,
            licensevalidto: this.ngbDateParserFormatter.parse(res.mstcorporatemaster.licensevalidto),
            kycupload: JSON.parse(res.mstcorporatemaster.kycupload),
            userid: res.mstcorporatemaster.userid,
            status: res.mstcorporatemaster.status,
            statusdesc: res.mstcorporatemaster.statusdesc,
        });
        this.useridvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("userid") >= 0) this.useridvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("userid") >= 0) this.useridvisible = false;
        this.mstcorporatemaster_menuactions = res.mstcorporatemaster_menuactions;
        this.mstcorporatelocation_menuactions = res.mstcorporatelocation_menuactions;
        this.mstcorporatelocations_visiblelist = res.mstcorporatelocations_visiblelist;
        this.mstjobrequirement_menuactions = res.mstjobrequirement_menuactions;
        this.mstjobrequirements_visiblelist = res.mstjobrequirements_visiblelist;
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        this.mstjobstatuses_visiblelist = res.mstjobstatuses_visiblelist;
        if (this.mstcorporatemaster_Form.get('kycupload').value != null && this.mstcorporatemaster_Form.get('kycupload').value != "" && this.kycupload != null && this.kycupload != undefined) this.kycupload.setattachmentlist(this.mstcorporatemaster_Form.get('kycupload').value);
        //Child Tables if any
        this.Set_mstcorporatelocations_TableConfig();
        this.mstcorporatelocations_LoadTable(res.mstcorporatelocations);
        this.Set_mstjobrequirements_TableConfig();
        this.mstjobrequirements_LoadTable(res.mstjobrequirements);
        this.Set_mstjobstatuses_TableConfig();
        this.mstjobstatuses_LoadTable(res.mstjobstatuses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstcorporatemaster_Form.controls) {
            let val = this.mstcorporatemaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstcorporatemaster_Form.controls[key] != null) {
                if (key == "kycupload") {
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
        if (!this.mstcorporatemaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstcorporatemaster_Form.getRawValue();
        obj.licensevalidto = new Date(this.mstcorporatemaster_Form.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemaster_Form.get('licensevalidto').value) + '  UTC' : null);
        if (this.kycupload.getAttachmentList() != null) obj.kycupload = JSON.stringify(this.kycupload.getAttachmentList());
        await this.sharedService.upload(this.kycupload.getAllFiles());
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

        if (!this.mstcorporatemaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.mstcorporatemaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstcorporatemaster_Form.controls[key] != null) {
                        this.formData[key] = this.mstcorporatemaster_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.licensevalidto = new Date(this.mstcorporatemaster_Form.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemaster_Form.get('licensevalidto').value) + '  UTC' : null);
        this.formData.kycupload = this.mstcorporatemaster_Form.get('kycupload').value;
        this.formData.Deleted_mstcorporatelocation_IDs = this.Deleted_mstcorporatelocation_IDs;
        this.formData.Deleted_mstjobrequirement_IDs = this.Deleted_mstjobrequirement_IDs;
        this.formData.Deleted_mstjobstatus_IDs = this.Deleted_mstjobstatus_IDs;
        if (this.kycupload.getAttachmentList() != null) this.formData.kycupload = JSON.stringify(this.kycupload.getAttachmentList());
        this.spinner.show();
        this.mstcorporatemaster_service.saveOrUpdate_mstcorporatemasters(this.formData, this.tbl_mstcorporatelocations?.source?.data, this.tbl_mstjobrequirements?.source?.data, this.tbl_mstjobstatuses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.kycupload.getAllFiles());
                if (this.tbl_mstcorporatelocations.source) {
                    for (let i = 0; i < this.tbl_mstcorporatelocations.source.data.length; i++) {
                        if (this.tbl_mstcorporatelocations.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstcorporatelocations.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobrequirements.source) {
                    for (let i = 0; i < this.tbl_mstjobrequirements.source.data.length; i++) {
                        if (this.tbl_mstjobrequirements.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstjobrequirements.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.mstcorporatemaster_Form.reset()
                this.objvalues.push((res as any).mstcorporatemaster);
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
                        this.objvalues.push((res as any).mstcorporatemaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstcorporatemaster_Form.markAsUntouched();
                this.mstcorporatemaster_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_mstcorporatelocations.source = new LocalDataSource();
        this.tbl_mstjobrequirements.source = new LocalDataSource();
        this.tbl_mstjobstatuses.source = new LocalDataSource();
    }

    AddOrEdit_mstcorporatelocation(event: any, locationid: any, corporateid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstcorporatelocationComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, corporateid, visiblelist: this.mstcorporatelocations_visiblelist, hidelist: this.mstcorporatelocations_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstcorporatelocations.source.add(res[i]);
                    }
                    this.tbl_mstcorporatelocations.source.refresh();
                }
                else {
                    this.tbl_mstcorporatelocations.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstcorporatelocation(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstcorporatelocation_IDs += childID + ",";
        this.tbl_mstcorporatelocations.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstjobrequirement(event: any, jobid: any, corporateid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstjobrequirementComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, jobid, corporateid, visiblelist: this.mstjobrequirements_visiblelist, hidelist: this.mstjobrequirements_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstjobrequirements.source.add(res[i]);
                    }
                    this.tbl_mstjobrequirements.source.refresh();
                }
                else {
                    this.tbl_mstjobrequirements.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstjobrequirement(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstjobrequirement_IDs += childID + ",";
        this.tbl_mstjobrequirements.source.data.splice(i, 1);
    }

    AddOrEdit_mstjobstatus(event: any, viewid: any, corporateid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstjobstatusComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, corporateid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstjobstatuses.source.add(res[i]);
                    }
                    this.tbl_mstjobstatuses.source.refresh();
                }
                else {
                    this.tbl_mstjobstatuses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstjobstatus(event: any, childID: number, i: number) {
        let viewid = event.data.viewid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(viewid).then(res =>
                this.mstjobstatuses_LoadTable(res)
            );
        }
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes mstcorporatelocations
    mstcorporatelocations_settings: any;

    show_mstcorporatelocations_Checkbox() {
        if (this.tbl_mstcorporatelocations.source.settings['selectMode'] == 'multi') this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'multi';
        this.tbl_mstcorporatelocations.source.initGrid();
    }
    delete_mstcorporatelocations_All() {
        this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'single';
    }
    show_mstcorporatelocations_Filter() {
        if (this.tbl_mstcorporatelocations.source.settings != null) this.tbl_mstcorporatelocations.source.settings['hideSubHeader'] = !this.tbl_mstcorporatelocations.source.settings['hideSubHeader'];
        this.tbl_mstcorporatelocations.source.initGrid();
    }
    async Set_mstcorporatelocations_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstcorporatelocations) {

            var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
            if (clone.columns['countryid'] != undefined) clone.columns['countryid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_countryid.value)), }, };
            if (clone.columns['countryid'] != undefined) clone.columns['countryid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_countryid.value)), }, };
            this.tbl_mstcorporatelocations.source.settings = clone;
            this.tbl_mstcorporatelocations.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
            if (clone.columns['stateid'] != undefined) clone.columns['stateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_stateid.value)), }, };
            if (clone.columns['stateid'] != undefined) clone.columns['stateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_stateid.value)), }, };
            this.tbl_mstcorporatelocations.source.settings = clone;
            this.tbl_mstcorporatelocations.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
            if (clone.columns['cityid'] != undefined) clone.columns['cityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_cityid.value)), }, };
            if (clone.columns['cityid'] != undefined) clone.columns['cityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_cityid.value)), }, };
            this.tbl_mstcorporatelocations.source.settings = clone;
            this.tbl_mstcorporatelocations.source.initGrid();
        }
        this.bfilterPopulate_mstcorporatelocations = true;
    }
    async mstcorporatelocations_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstcorporatelocations_TableConfig() {
        this.mstcorporatelocations_settings = {
            hideSubHeader: true,
            mode: 'External',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.mstcorporatelocation_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="fa fa-check-square"></i>',
                cancelButtonContent: '<i class="fa fa-window-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,

                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                // branchid: {
                //     title: '',

                //     filter: false,
                // },
                countryiddesc: {
                    title: 'Country',
                    type: 'html',
                    filter: true,
                },
                stateiddesc: {
                    title: 'State',
                    type: 'html',
                    filter: true,
                },
                cityiddesc: {
                    title: 'City',
                    type: 'html',
                    filter: true,
                },
                address1: {
                    title: 'Address1',
                    type: '',
                    filter: true,
                },
                address2: {
                    title: 'Address2',
                    type: '',
                    filter: true,
                },
                pincode: {
                    title: 'Pin Code',
                    type: '',
                    filter: true,
                },
                contactperson: {
                    title: 'Contact Person',
                    type: '',
                    filter: true,
                },
                designation: {
                    title: 'Designation',
                    type: '',
                    filter: true,
                },
                emailid: {
                    title: 'Email',
                    type: '',
                    filter: true,
                },
                mobile: {
                    title: 'Mobile',
                    type: '',
                    filter: true,
                },
            },
            attr: {
                class: 'table table-bordered table-header'
            },
        };
    }
    mstcorporatelocations_LoadTable(mstcorporatelocations = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcorporatelocations_ID) >= 0) {
            if (this.tbl_mstcorporatelocations != undefined) this.tbl_mstcorporatelocations.source = new LocalDataSource();
            if (this.tbl_mstcorporatelocations != undefined) this.tbl_mstcorporatelocations.source.load(mstcorporatelocations as any as LocalDataSource);
            if (this.tbl_mstcorporatelocations != undefined) this.tbl_mstcorporatelocations.source.setPaging(1, 20, true);
        }
    }

    mstcorporatelocations_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstcorporatelocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstcorporatelocation(event, event.data.locationid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstcorporatelocation(event, event.data.locationid, ((this.tbl_mstcorporatelocations.source.getPaging().page - 1) * this.tbl_mstcorporatelocations.source.getPaging().perPage) + event.index);
                this.tbl_mstcorporatelocations.source.refresh();
                break;
        }
    }
    mstcorporatelocations_onDelete(obj) {
        let locationid = obj.data.locationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(locationid).then(res =>
                this.mstcorporatelocations_LoadTable()
            );
        }
    }
    async onCustom_mstcorporatelocations_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstcorporatelocations");
        let formname = (objbomenuaction as any).actionname;




    }
    mstcorporatelocations_Paging(val) {
        this.tbl_mstcorporatelocations.source.setPaging(1, val, true);
    }

    handle_mstcorporatelocations_GridSelected(event: any) {
        this.mstcorporatelocations_selectedindex = this.tbl_mstcorporatelocations.source.findIndex(i => i.locationid === event.data.locationid);
    }
    Is_mstcorporatelocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcorporatelocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstcorporatelocations
    //start of Grid Codes mstjobrequirements
    mstjobrequirements_settings: any;

    show_mstjobrequirements_Checkbox() {
        if (this.tbl_mstjobrequirements.source.settings['selectMode'] == 'multi') this.tbl_mstjobrequirements.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstjobrequirements.source.settings['selectMode'] = 'multi';
        this.tbl_mstjobrequirements.source.initGrid();
    }
    delete_mstjobrequirements_All() {
        this.tbl_mstjobrequirements.source.settings['selectMode'] = 'single';
    }
    show_mstjobrequirements_Filter() {
        if (this.tbl_mstjobrequirements.source.settings != null) this.tbl_mstjobrequirements.source.settings['hideSubHeader'] = !this.tbl_mstjobrequirements.source.settings['hideSubHeader'];
        this.tbl_mstjobrequirements.source.initGrid();
    }
    async Set_mstjobrequirements_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstjobrequirements) {

            var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
            if (clone.columns['locations'] != undefined) clone.columns['locations'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_locations.value)), }, };
            if (clone.columns['locations'] != undefined) clone.columns['locations'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_locations.value)), }, };
            this.tbl_mstjobrequirements.source.settings = clone;
            this.tbl_mstjobrequirements.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
            if (clone.columns['skills'] != undefined) clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_skills.value)), }, };
            if (clone.columns['skills'] != undefined) clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_skills.value)), }, };
            this.tbl_mstjobrequirements.source.settings = clone;
            this.tbl_mstjobrequirements.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
            if (clone.columns['education'] != undefined) clone.columns['education'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_education.value)), }, };
            if (clone.columns['education'] != undefined) clone.columns['education'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_education.value)), }, };
            this.tbl_mstjobrequirements.source.settings = clone;
            this.tbl_mstjobrequirements.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
            if (clone.columns['language'] != undefined) clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_language.value)), }, };
            if (clone.columns['language'] != undefined) clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_language.value)), }, };
            this.tbl_mstjobrequirements.source.settings = clone;
            this.tbl_mstjobrequirements.source.initGrid();
        }
        this.bfilterPopulate_mstjobrequirements = true;
    }
    async mstjobrequirements_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstjobrequirements_TableConfig() {
        this.mstjobrequirements_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                // delete: !this.showview,
                position: 'left',
                // custom: this.mstjobrequirement_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,
                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                jobdescription: {
                    title: 'Opportunity Description',
                    type: '',
                    filter: true,
                },
                jobrequirement: {
                    title: 'Opportunity Requirement',
                    type: '',
                    filter: true,
                },
                numberofpositions: {
                    title: 'Number Of Positions',
                    type: 'number',
                    filter: true,
                },
                tobefilledbefore: {
                    title: 'To Be Filled Before',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                experiencefrom: {
                    title: 'Experience From',
                    type: 'number',
                    filter: true,
                },
                experienceto: {
                    title: 'Experience To',
                    type: 'number',
                    filter: true,
                },
                referenceavailability: {
                    title: 'Reference Availability',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                referencevalidation: {
                    title: 'Reference Validation',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
            },
            attr: {
                class: 'table table-bordered table-header'
            },
        };
    }
    mstjobrequirements_LoadTable(mstjobrequirements = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobrequirements_ID) >= 0) {
            if (this.tbl_mstjobrequirements != undefined) this.tbl_mstjobrequirements.source = new LocalDataSource();
            if (this.tbl_mstjobrequirements != undefined) this.tbl_mstjobrequirements.source.load(mstjobrequirements as any as LocalDataSource);
            if (this.tbl_mstjobrequirements != undefined) this.tbl_mstjobrequirements.source.setPaging(1, 20, true);
        }
    }


    mstjobrequirements_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstjobrequirement(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstjobrequirement(event, event.data.jobid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstjobrequirement(event, event.data.jobid, ((this.tbl_mstjobrequirements.source.getPaging().page - 1) * this.tbl_mstjobrequirements.source.getPaging().perPage) + event.index);
                this.tbl_mstjobrequirements.source.refresh();
                break;
        }
    }
    mstjobrequirements_onDelete(obj) {
        let jobid = obj.data.jobid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(jobid).then(res =>
                this.mstjobrequirements_LoadTable()
            );
        }
    }
    async onCustom_mstjobrequirements_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstjobrequirements");
        let formname = (objbomenuaction as any).actionname;




    }
    mstjobrequirements_Paging(val) {
        this.tbl_mstjobrequirements.source.setPaging(1, val, true);
    }

    handle_mstjobrequirements_GridSelected(event: any) {
        this.mstjobrequirements_selectedindex = this.tbl_mstjobrequirements.source.findIndex(i => i.jobid === event.data.jobid);
    }
    Is_mstjobrequirements_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobrequirements_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstjobrequirements
    //start of Grid Codes mstjobstatuses
    mstjobstatuses_settings: any;

    show_mstjobstatuses_Checkbox() {
        if (this.tbl_mstjobstatuses.source.settings['selectMode'] == 'multi') this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'multi';
        this.tbl_mstjobstatuses.source.initGrid();
    }
    delete_mstjobstatuses_All() {
        this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
    }
    show_mstjobstatuses_Filter() {
        if (this.tbl_mstjobstatuses.source.settings != null) this.tbl_mstjobstatuses.source.settings['hideSubHeader'] = !this.tbl_mstjobstatuses.source.settings['hideSubHeader'];
        this.tbl_mstjobstatuses.source.initGrid();
    }
    async Set_mstjobstatuses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstjobstatuses) {

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['corporateid'] != undefined) clone.columns['corporateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
            if (clone.columns['corporateid'] != undefined) clone.columns['corporateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['jobid'] != undefined) clone.columns['jobid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
            if (clone.columns['jobid'] != undefined) clone.columns['jobid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();
        }
        this.bfilterPopulate_mstjobstatuses = true;
    }
    async mstjobstatuses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstjobstatuses_TableConfig() {
        this.mstjobstatuses_settings = {
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
                custom: this.mstjobstatus_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,
                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                applicantiddesc: {
                    title: 'Applicant',
                    type: 'html',
                    filter: true,
                },
                viewdatetime: {
                    title: 'View Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                intereststatus: {
                    title: 'Interest Status',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                allcomments: {
                    title: 'All Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                jobiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                hiringstatus: {
                    title: 'Hiring Status',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                ctcoffered: {
                    title: 'C T C Offered',
                    type: '',
                    filter: true,
                },
            },
            attr: {
                class: 'table table-bordered table-header'
            },
        };
    }
    mstjobstatuses_LoadTable(mstjobstatuses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source = new LocalDataSource();
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source.load(mstjobstatuses as any as LocalDataSource);
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source.setPaging(1, 20, true);
        }
    }

    mstjobstatuses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstjobstatus(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstjobstatus(event, event.data.viewid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstjobstatus(event, event.data.viewid, ((this.tbl_mstjobstatuses.source.getPaging().page - 1) * this.tbl_mstjobstatuses.source.getPaging().perPage) + event.index);
                this.tbl_mstjobstatuses.source.refresh();
                break;
        }
    }
    mstjobstatuses_onDelete(obj) {
        let viewid = obj.data.viewid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(viewid).then(res =>
                this.mstjobstatuses_LoadTable()
            );
        }
    }
    async onCustom_mstjobstatuses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstjobstatuses");
        let formname = (objbomenuaction as any).actionname;




    }
    mstjobstatuses_Paging(val) {
        this.tbl_mstjobstatuses.source.setPaging(1, val, true);
    }

    handle_mstjobstatuses_GridSelected(event: any) {
        this.mstjobstatuses_selectedindex = this.tbl_mstjobstatuses.source.findIndex(i => i.viewid === event.data.viewid);
    }
    Is_mstjobstatuses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstjobstatuses

}



