import { mstjobrequirementService } from './../../../service/mstjobrequirement.service';
import { mstjobrequirement } from './../../../model/mstjobrequirement.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { mstjobstatusComponent } from './../../../pages/forms/mstjobstatus/mstjobstatus.component';
import { mstjobstatusService } from './../../../service/mstjobstatus.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';

@Component({
    selector: 'app-mstjobrequirement',
    templateUrl: './mstjobrequirement.component.html',
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

    @media only screen and (max-width: 600px) {
      .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .job_re_btn{
          padding: 4px 6px !important;
          white-space: nowrap !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
    }
    `]
})



export class mstjobrequirementComponent implements OnInit {
    formData: mstjobrequirement;
    list: mstjobrequirement[];
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

    bfilterPopulate_mstjobrequirements: boolean = false;
    bfilterPopulate_mstjobstatuses: boolean = false;
    mstjobrequirement_menuactions: any = []
    mstjobstatus_menuactions: any = []
    @ViewChild('tbl_mstjobstatuses', { static: false }) tbl_mstjobstatuses: Ng2SmartTableComponent;

    mstjobrequirement_Form: FormGroup;

    locations_List: any[];
    skills_List: any[];
    education_List: any[];
    language_List: any[];

    skills_results: DropDownValues[];
    locations_results: DropDownValues[];
    education_results: DropDownValues[];
    language_results: DropDownValues[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    userrole: any;
    showApplicantmenu: boolean = false;
    showAdminMenuaccess: boolean = false;
    showCorporateMenuaccess: boolean = false;


    mstjobstatuses_visiblelist: any;
    mstjobstatuses_hidelist: any;

    Deleted_mstjobstatus_IDs: string = "";
    mstjobstatuses_ID: string = "1";
    mstjobstatuses_selectedindex: any;
    minDate = undefined;

    showloc: boolean = true;
    showskill: boolean = true;
    showedu: boolean = true;
    showlan: boolean = true;
    mstjobrequirement: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstjobrequirement_service: mstjobrequirementService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        const current = new Date();
        this.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.mstjobrequirement_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            jobid: [null],
            corporateid: [null],
            jobdescription: [null, Validators.compose([Validators.required])],
            jobrequirement: [null, Validators.compose([Validators.required])],
            numberofpositions: [null, Validators.compose([Validators.required])],
            tobefilledbefore: [null],
            experiencefrom: [null],
            experienceto: [null],
            locations: [null],
            skills: [null],
            education: [null],
            language: [null],
            referenceavailability: [null],
            referencevalidation: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.mstjobrequirement_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.mstjobrequirement_Form.dirty && this.mstjobrequirement_Form.touched) {
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
        if (pkDetail.jobid && pkDetail) {
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
        let mstjobrequirementid = null;

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
        this.formid = mstjobrequirementid;

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_mstjobstatuses_TableConfig();
            setTimeout(() => {
                //this.Set_mstjobstatuses_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstjobrequirement_service.getDefaultData().then(res => {
            this.locations_List = res.list_locations.value;
            this.skills_List = res.list_skills.value;
            this.education_List = res.list_education.value;
            this.language_List = res.list_language.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.mstjobrequirement_service.get_mstjobrequirements_List().then(res => {
            this.pkList = res as mstjobrequirement[];
            this.pkoptionsEvent.emit(this.pkList);

            this.showedu = res.mstjobrequirement.educationdesc,
                this.showlan = res.mstjobrequirement.languagedesc,
                this.showloc = res.mstjobrequirement.locationdesc,
                this.showskill = res.mstjobrequirement.skilldesc
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched
        this.mstjobrequirement_Form.markAsUntouched();
        this.mstjobrequirement_Form.markAsPristine();
    }



    resetForm() {
        if (this.mstjobrequirement_Form != null)
            this.mstjobrequirement_Form.reset();
        this.mstjobrequirement_Form.patchValue({
        });
        setTimeout(() => {
            this.mstjobstatuses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let jobid = this.mstjobrequirement_Form.get('jobid').value;
        if (jobid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstjobrequirement_service.delete_mstjobrequirement(jobid).then(res => {
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
        this.mstjobrequirement_Form.patchValue({
            jobid: null
        });
        if (this.formData.jobid != null) this.formData.jobid = null;
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
                    else if (key == "tobefilledbefore")
                        this.mstjobrequirement_Form.patchValue({ "tobefilledbefore": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstjobrequirement_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstjobrequirement_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstjobrequirement_Form.controls[key] != undefined) {
                                this.mstjobrequirement_Form.controls[key].disable({ onlySelf: true });
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

        this.router.navigate(['/home/boreportviewer/jobq']);

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
    locations_onChange(event) {
        this.locations_results = this.locations_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
    }
    skills_onChange(event) {
        this.skills_results = this.skills_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
    }
    education_onChange(event) {
        this.education_results = this.education_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
    }
    language_onChange(event) {
        this.language_results = this.language_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
    }
    attachmentuploader(e: any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }

    edit_mstjobrequirements() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.mstjobrequirement_service.get_mstjobrequirements_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.mstjobrequirement;
            let formproperty = res.mstjobrequirement.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstjobrequirement.pkcol;
            this.formid = res.mstjobrequirement.jobid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.mstjobrequirement;
        this.formid = res.mstjobrequirement.jobid;
        this.pkcol = res.mstjobrequirement.pkcol;
        this.bmyrecord = false;
        if ((res.mstjobrequirement as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mstjobrequirement_Form.patchValue({
            jobid: res.mstjobrequirement.jobid,
            corporateid: res.mstjobrequirement.corporateid,
            jobdescription: res.mstjobrequirement.jobdescription,
            jobrequirement: res.mstjobrequirement.jobrequirement,
            numberofpositions: res.mstjobrequirement.numberofpositions,
            tobefilledbefore: this.ngbDateParserFormatter.parse(res.mstjobrequirement.tobefilledbefore),
            experiencefrom: res.mstjobrequirement.experiencefrom,
            experienceto: res.mstjobrequirement.experienceto,
            locations: res.mstjobrequirement.locations,
            skills: res.mstjobrequirement.skills,
            education: res.mstjobrequirement.education,
            language: res.mstjobrequirement.language,
            referenceavailability: res.mstjobrequirement.referenceavailability,
            referencevalidation: res.mstjobrequirement.referencevalidation,
            attachment: JSON.parse(res.mstjobrequirement.attachment),
            status: res.mstjobrequirement.status,
            statusdesc: res.mstjobrequirement.statusdesc,
            educationdesc: res.mstjobrequirement.educationdesc,
            languagedesc: res.mstjobrequirement.languagedesc,
            locationdesc: res.mstjobrequirement.locationdesc,
            skilldesc: res.mstjobrequirement.skilldesc
        });
        setTimeout(() => {
            this.getSkillsDescription();
            this.getLanguageDescription();
            this.getlocationDescription();
            this.geteducationDescription();
        }, 400);
        this.mstjobrequirement = res.mstjobrequirement;
        this.mstjobrequirement_menuactions = res.mstjobrequirement_menuactions;
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        this.mstjobstatuses_visiblelist = res.mstjobstatuses_visiblelist;
        if (this.mstjobrequirement_Form.get('attachment').value != null && this.mstjobrequirement_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstjobrequirement_Form.get('attachment').value);
        //Child Tables if any
        this.Set_mstjobstatuses_TableConfig();
        this.mstjobstatuses_LoadTable(res.mstjobstatuses);
    }


    validate() {
        let ret = true;
        return ret;
    }

    getSkillsDescription() {
        let skillsdescription: any[] = [];
        for (let i = 0; i < this.skills_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('skills').value.length; j++) {
                if ((this.skills_List[i] as any).value.toString() == this.mstjobrequirement_Form.get('skills').value[j].toString()) {

                    skillsdescription.push((this.skills_List[i] as any));
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ skills: skillsdescription });
    }
    getLanguageDescription() {
        let languagedescription: any[] = [];
        for (let i = 0; i < this.language_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('language').value.length; j++) {
                if ((this.language_List[i] as any).value.toString() == this.mstjobrequirement_Form.get('language').value[j].toString()) {

                    languagedescription.push((this.language_List[i] as any));
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ language: languagedescription });
    }
    geteducationDescription() {
        let educationdescription: any[] = [];
        for (let i = 0; i < this.education_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('education').value.length; j++) {
                if ((this.education_List[i] as any).value.toString() == this.mstjobrequirement_Form.get('education').value[j].toString()) {

                    educationdescription.push((this.education_List[i] as any));
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ education: educationdescription });
    }
    getlocationDescription() {
        let locationdescription: any[] = [];
        for (let i = 0; i < this.locations_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('locations').value.length; j++) {
                if ((this.locations_List[i] as any).value.toString() == this.mstjobrequirement_Form.get('locations').value[j].toString()) {

                    locationdescription.push((this.locations_List[i] as any));
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ locations: locationdescription });
    }
    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.mstjobrequirement_Form.controls) {
            let val = this.mstjobrequirement_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstjobrequirement_Form.controls[key] != null) {
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
        if (!this.mstjobrequirement_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }

        var obj = this.mstjobrequirement_Form.getRawValue();
        obj.tobefilledbefore = new Date(this.mstjobrequirement_Form.get('tobefilledbefore').value ? this.ngbDateParserFormatter.format(this.mstjobrequirement_Form.get('tobefilledbefore').value) + '  UTC' : null);
        obj.locations = null;
        if (this.mstjobrequirement_Form.get('locations').value != null) obj.locationsstring = JSON.stringify(this.mstjobrequirement_Form.get('locations').value);
        obj.skills = null;
        if (this.mstjobrequirement_Form.get('skills').value != null) obj.skillsstring = JSON.stringify(this.mstjobrequirement_Form.get('skills').value);
        obj.education = null;
        if (this.mstjobrequirement_Form.get('education').value != null) obj.educationstring = JSON.stringify(this.mstjobrequirement_Form.get('education').value);
        obj.language = null;
        if (this.mstjobrequirement_Form.get('language').value != null) obj.languagestring = JSON.stringify(this.mstjobrequirement_Form.get('language').value);
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
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
    getSkills(skills_List) {
        let skills: any[] = [];

        for (let i = 0; i < skills_List.length; i++) {
            skills.push((skills_List[i] as any).value.toString());
        }
        return skills;
    }
    getLocation(locations_List) {
        let locations: any[] = [];

        for (let i = 0; i < locations_List.length; i++) {
            locations.push((locations_List[i] as any).value.toString());
        }
        return locations;
    }
    getEducation(education_List) {
        let education: any[] = [];

        for (let i = 0; i < education_List.length; i++) {
            education.push((education_List[i] as any).value.toString());
        }
        return education;
    }
    getLanguage(language_List) {
        let language: any[] = [];

        for (let i = 0; i < language_List.length; i++) {
            language.push((language_List[i] as any).value.toString());
        }
        return language;
    }


    async onSubmitData(bclear: any) {
        this.isSubmitted = true;
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);

        if (!this.validate()) {
            return;
        }
        this.formData = this.mstjobrequirement_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstjobrequirement_Form.controls[key] != null) {
                        this.formData[key] = this.mstjobrequirement_Form.controls[key].value;
                    }
                }
            }
        }
        var obj = this.mstjobrequirement_Form.getRawValue();
        this.formData.tobefilledbefore = new Date(this.mstjobrequirement_Form.get('tobefilledbefore').value ? this.ngbDateParserFormatter.format(this.mstjobrequirement_Form.get('tobefilledbefore').value) + '  UTC' : null);
        this.formData.locations = null;
        if (this.mstjobrequirement_Form.get('locations').value != null) this.formData.locationsstring = JSON.stringify(this.getLocation(this.mstjobrequirement_Form.get('locations').value));
        this.formData.skills = null;
        if (this.mstjobrequirement_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstjobrequirement_Form.get('skills').value));
        this.formData.education = null;
        if (this.mstjobrequirement_Form.get('education').value != null) this.formData.educationstring = JSON.stringify(this.getEducation(this.mstjobrequirement_Form.get('education').value));
        this.formData.language = null;
        if (this.mstjobrequirement_Form.get('language').value != null) this.formData.languagestring = JSON.stringify(this.getLanguage(this.mstjobrequirement_Form.get('language').value));
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_mstjobstatus_IDs = this.Deleted_mstjobstatus_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        this.spinner.show();
        this.mstjobrequirement_service.saveOrUpdate_mstjobrequirements(this.formData, this.tbl_mstjobstatuses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).mstjobrequirement);
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
                        this.objvalues.push((res as any).mstjobrequirement);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstjobrequirement_Form.markAsUntouched();
                this.mstjobrequirement_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_mstjobstatuses.source = new LocalDataSource();
    }

    AddOrEdit_mstjobstatus(event: any, viewid: any, jobid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstjobstatusComponent,

            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, jobid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
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
        if (childID != null)
            this.Deleted_mstjobstatus_IDs += childID + ",";
        this.tbl_mstjobstatuses.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
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
                columnTitle: 'Action',
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
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                applicantiddesc: {
                    title: 'Applicant',
                    type: 'html',
                    filter: false,
                },
                corporateiddesc: {
                    title: 'Corporate',
                    type: 'html',
                    filter: false,
                },
                viewdatetime: {
                    title: 'View Date',
                    type: 'custom',
                    filter: false,
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
                    filter: false,
                    editor: {
                        type: 'textarea',
                    },
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
                    filter: false,
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
            this.mstjobrequirement_service.delete_mstjobrequirement(viewid).then(res =>
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



