import { umsstudentmasterService } from './../../../service/umsstudentmaster.service';
import { umsstudentmaster } from './../../../model/umsstudentmaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { umssectionmaster } from './../../../model/umssectionmaster.model';
import { umssectionmasterService } from './../../../service/umssectionmaster.service';
import { umscourse } from './../../../model/umscourse.model';
import { umscourseService } from './../../../service/umscourse.service';
import { umscoursesemester } from './../../../model/umscoursesemester.model';
import { umscoursesemesterService } from './../../../service/umscoursesemester.service';
import { umsstudentmark } from './../../../model/umsstudentmark.model';
import { umsexam, IumsexamResponse } from './../../../model/umsexam.model';
import { umsexamService } from './../../../service/umsexam.service';
import { umsstudentfeemaster } from './../../../model/umsstudentfeemaster.model';
import { bofinancialyear, IbofinancialyearResponse } from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
import { umsfeestructuremaster, IumsfeestructuremasterResponse } from './../../../model/umsfeestructuremaster.model';
import { umsfeestructuremasterService } from './../../../service/umsfeestructuremaster.service';
import { umsstudentfeemasterComponent } from './umsstudentfeemaster.component';
import { umsstudentcourse } from './../../../model/umsstudentcourse.model';
import { umstopicmaster, IumstopicmasterResponse } from './../../../model/umstopicmaster.model';
import { umstopicmasterService } from './../../../service/umstopicmaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-umsstudentmaster',
    templateUrl: './umsstudentmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsstudentmasterComponent implements OnInit {
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulateumsstudentmasters: boolean = false;
    dataumsstudentmasterssectionid3: any = [];
    dataumsstudentmasterscourseid3: any = [];
    dataumsstudentmasterscurrentsemesterid3: any = [];
    dataumsstudentmarkscourseid3: any = [];
    dataumsstudentmarkssemesterid3: any = [];
    dataumsstudentmarksexamid3: any = [];
    dataumsstudentmarksresult3: any = [];
    bfilterPopulateumsstudentmarks: boolean = false;
    dataumsstudentfeemastersfinancialyearid3: any = [];
    dataumsstudentfeemasterscourseid3: any = [];
    dataumsstudentfeemasterspaidtype3: any = [];
    dataumsstudentfeemasterssemesterid3: any = [];
    dataumsstudentfeemastersfeestructureid3: any = [];
    bfilterPopulateumsstudentfeemasters: boolean = false;
    dataumsstudentcoursescourseid3: any = [];
    dataumsstudentcoursescurrenttopicid3: any = [];
    bfilterPopulateumsstudentcourses: boolean = false;
    @ViewChild('tblumsstudentmarkssource', { static: false }) tblumsstudentmarkssource: Ng2SmartTableComponent;
    @ViewChild('tblumsstudentfeemasterssource', { static: false }) tblumsstudentfeemasterssource: Ng2SmartTableComponent;
    @ViewChild('tblumsstudentcoursessource', { static: false }) tblumsstudentcoursessource: Ng2SmartTableComponent;
    umsstudentmasterForm: FormGroup;
    sectionidList: umssectionmaster[];
    courseidList: umscourse[];
    currentsemesteridList: umscoursesemester[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedumsstudentmarkIDs: string = "";
    umsstudentmarksID: string = "1";
    umsstudentmarksselectedindex: any;
    DeletedumsstudentfeemasterIDs: string = "";
    umsstudentfeemastersID: string = "2";
    umsstudentfeemastersselectedindex: any;
    DeletedumsstudentcourseIDs: string = "";
    umsstudentcoursesID: string = "3";
    umsstudentcoursesselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsstudentmasterservice: umsstudentmasterService,
        private umscourseservice: umscourseService,
        private umscoursesemesterservice: umscoursesemesterService,
        private umsexamservice: umsexamService,
        private bofinancialyearservice: bofinancialyearService,
        private umsfeestructuremasterservice: umsfeestructuremasterService,
        private umstopicmasterservice: umstopicmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private umssectionmasterservice: umssectionmasterService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd f',
                command: () => this.resetForm(),
                preventDefault: true
            }
        ]);
        this.umsstudentmasterForm = this.fb.group({
            studentid: [null],
            code: [null],
            firstname: [null],
            middlename: [null],
            lastname: [null],
            dob: [null],
            contactno: [null],
            email: [null],
            fathername: [null],
            mothername: [null],
            fathercontactno: [null],
            admissiondate: [null],
            validitystartdate: [null],
            validityenddate: [null],
            sectionid: [null],
            sectioniddesc: [null],
            courseid: [null],
            courseiddesc: [null],
            currentsemesterid: [null],
            currentsemesteriddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsstudentmasterForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.umsstudentmasterForm.dirty && this.umsstudentmasterForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        debugger;
        let umsstudentmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.studentid != null) {
            umsstudentmaster = this.data.studentid;
        }
        else
            umsstudentmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsstudentmaster;
        //this.sharedService.alert(umsstudentmaster);
        if (umsstudentmaster == null) {
            this.SetumsstudentmarksTableConfig();
            setTimeout(() => {
                this.SetumsstudentmarksTableddConfig();
            });
            this.SetumsstudentfeemastersTableConfig();
            setTimeout(() => {
                this.SetumsstudentfeemastersTableddConfig();
            });
            this.SetumsstudentcoursesTableConfig();
            setTimeout(() => {
                this.SetumsstudentcoursesTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsstudentmaster);
        }
        this.umssectionmasterservice.getumssectionmastersList().then((res:any) => this.sectionidList = res as umssectionmaster[]);
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.currentsemesteridList = res as umscoursesemester[]);
        this.umsstudentmasterForm.markAsUntouched();
        this.umsstudentmasterForm.markAsPristine();
    }



    resetForm() {
        if (this.umsstudentmasterForm != null)
            this.umsstudentmasterForm.reset();
        setTimeout(() => {
            this.umsstudentmasterservice.umsstudentmarks = [];
            this.umsstudentmarksLoadTable();
            this.umsstudentmasterservice.umsstudentfeemasters = [];
            this.umsstudentfeemastersLoadTable();
            this.umsstudentmasterservice.umsstudentcourses = [];
            this.umsstudentcoursesLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": ' + this.data[key] + ' }');
                if (this.umsstudentmasterForm.controls[key] != null) {
                    this.umsstudentmasterForm.patchValue(json);
                    this.umsstudentmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let studentid = this.umsstudentmasterForm.get('studentid')!.value;
        if (studentid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsstudentmasterservice.deleteumsstudentmaster(studentid).then((res:any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.umsstudentmasterForm.patchValue({
            studentid: null
        });
        this.umsstudentmasterservice.formData.studentid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umsstudentmasters", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
            this.customfieldservicelist = res;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    sectionidonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentmasterForm.patchValue({ sectioniddesc: evt.options[evt.options.selectedIndex].text });
    }
    courseidonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentmasterForm.patchValue({ courseiddesc: evt.options[evt.options.selectedIndex].text });
    }
    currentsemesteridonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentmasterForm.patchValue({ currentsemesteriddesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    PopulateScreen(umsstudentmaster: any) {
        this.umsstudentmasterservice.getumsstudentmastersByID(parseInt(umsstudentmaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsstudentmasterForm.patchValue({
            studentid: res.umsstudentmaster.studentid,
            code: res.umsstudentmaster.code,
            firstname: res.umsstudentmaster.firstname,
            middlename: res.umsstudentmaster.middlename,
            lastname: res.umsstudentmaster.lastname,
            dob: this.ngbDateParserFormatter.parse(res.umsstudentmaster.dob),
            contactno: res.umsstudentmaster.contactno,
            email: res.umsstudentmaster.email,
            fathername: res.umsstudentmaster.fathername,
            mothername: res.umsstudentmaster.mothername,
            fathercontactno: res.umsstudentmaster.fathercontactno,
            admissiondate: this.ngbDateParserFormatter.parse(res.umsstudentmaster.admissiondate),
            validitystartdate: this.ngbDateParserFormatter.parse(res.umsstudentmaster.validitystartdate),
            validityenddate: this.ngbDateParserFormatter.parse(res.umsstudentmaster.validityenddate),
            sectionid: res.umsstudentmaster.sectionid,
            sectioniddesc: res.umsstudentmaster.sectioniddesc,
            courseid: res.umsstudentmaster.courseid,
            courseiddesc: res.umsstudentmaster.courseiddesc,
            currentsemesterid: res.umsstudentmaster.currentsemesterid,
            currentsemesteriddesc: res.umsstudentmaster.currentsemesteriddesc,
            customfield: res.umsstudentmaster.customfield,
            attachment: res.umsstudentmaster.attachment,
            status: res.umsstudentmaster.status,
            statusdesc: res.umsstudentmaster.statusdesc,
        });
        if (this.umsstudentmasterForm.get('customfield')!.value != null && this.umsstudentmasterForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.umsstudentmasterForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.umsstudentmasterForm.get('attachment')!.value != null && this.umsstudentmasterForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.umsstudentmasterForm.get('attachment')!.value);
        this.umsstudentmasterservice.umsstudentmarks = res.umsstudentmark;
        this.SetumsstudentmarksTableConfig();
        this.umsstudentmarksLoadTable();
        setTimeout(() => {
            this.SetumsstudentmarksTableddConfig();
        });
        this.umsstudentmasterservice.umsstudentfeemasters = res.umsstudentfeemaster;
        this.SetumsstudentfeemastersTableConfig();
        this.umsstudentfeemastersLoadTable();
        setTimeout(() => {
            this.SetumsstudentfeemastersTableddConfig();
        });
        this.umsstudentmasterservice.umsstudentcourses = res.umsstudentcourse;
        this.SetumsstudentcoursesTableConfig();
        this.umsstudentcoursesLoadTable();
        setTimeout(() => {
            this.SetumsstudentcoursesTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsstudentmasterForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsstudentmasterservice.formData = this.umsstudentmasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsstudentmasterForm.controls[key] != null) {
                    this.umsstudentmasterservice.formData[key] = this.umsstudentmasterForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.umsstudentmasterservice.formData.dob = new Date(this.ngbDateParserFormatter.format(this.umsstudentmasterForm.get('dob')!.value));
        this.umsstudentmasterservice.formData.contactno = this.umsstudentmasterForm.get('contactno')!.value == null ? null : this.umsstudentmasterForm.get('contactno')!.value;
        this.umsstudentmasterservice.formData.fathercontactno = this.umsstudentmasterForm.get('fathercontactno')!.value == null ? null : this.umsstudentmasterForm.get('fathercontactno')!.value;
        this.umsstudentmasterservice.formData.admissiondate = new Date(this.ngbDateParserFormatter.format(this.umsstudentmasterForm.get('admissiondate')!.value) + '  UTC');
        this.umsstudentmasterservice.formData.validitystartdate = new Date(this.ngbDateParserFormatter.format(this.umsstudentmasterForm.get('validitystartdate')!.value) + '  UTC');
        this.umsstudentmasterservice.formData.validityenddate = new Date(this.ngbDateParserFormatter.format(this.umsstudentmasterForm.get('validityenddate')!.value) + '  UTC');
        this.umsstudentmasterservice.formData.customfield = JSON.stringify(customfields);
        this.umsstudentmasterservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.umsstudentmasterservice.formData.DeletedumsstudentmarkIDs = this.DeletedumsstudentmarkIDs;
        this.umsstudentmasterservice.formData.DeletedumsstudentfeemasterIDs = this.DeletedumsstudentfeemasterIDs;
        this.umsstudentmasterservice.formData.DeletedumsstudentcourseIDs = this.DeletedumsstudentcourseIDs;
        console.log(this.umsstudentmasterservice.formData);
        this.umsstudentmasterservice.saveOrUpdateumsstudentmasters().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsstudentmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsstudentmaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsstudentmasterForm.markAsUntouched();
                this.umsstudentmasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditsectionid(sectionid) {
        let ScreenType = '2';
        /*this.dialog.open(umssectionmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umssectionmasterservice.getumssectionmastersList().then((res:any) => this.sectionidList = res as umssectionmaster[]);
        });*/
    }

    AddOrEditcourseid(courseid) {
        let ScreenType = '2';
        /*this.dialog.open(umscourseComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        });*/
    }

    AddOrEditcurrentsemesterid(semesterid) {
        let ScreenType = '2';
        /*this.dialog.open(umscoursesemesterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.currentsemesteridList = res as umscoursesemester[]);
        });*/
    }

    onDeleteumsstudentmark(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsstudentmarkIDs += childID + ",";
        this.umsstudentmasterservice.umsstudentmarks.splice(i, 1);
    }
    AddOrEditumsstudentfeemaster(event, studentfeeid, studentid) {
        this.dialog.open(umsstudentfeemasterComponent,
            {
                data: { studentfeeid, studentid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (studentfeeid == null) {
                this.umsstudentfeemasterssource.add(res);
                this.umsstudentfeemasterssource.refresh();
            }
            else {
                this.umsstudentfeemasterssource.update(event.data, res);
            }
        });
    }
    onDeleteumsstudentfeemaster(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsstudentfeemasterIDs += childID + ",";
        this.umsstudentmasterservice.umsstudentfeemasters.splice(i, 1);
        //this.updateGrandTotal();
    }
    onDeleteumsstudentcourse(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsstudentcourseIDs += childID + ",";
        this.umsstudentmasterservice.umsstudentcourses.splice(i, 1);
    }
    //start of Grid Codes umsstudentmarks
    umsstudentmarkssettings: any;
    umsstudentmarkssource: any;

    showumsstudentmarksCheckbox() {
        debugger;
        if (this.tblumsstudentmarkssource.settings['selectMode'] == 'multi') this.tblumsstudentmarkssource.settings['selectMode'] = 'single';
        else
            this.tblumsstudentmarkssource.settings['selectMode'] = 'multi';
        this.tblumsstudentmarkssource.initGrid();
    }
    deleteumsstudentmarksAll() {
        this.tblumsstudentmarkssource.settings['selectMode'] = 'single';
    }
    showumsstudentmarksFilter() {
        setTimeout(() => {
            this.SetumsstudentmarksTableddConfig();
        });
        if (this.tblumsstudentmarkssource.settings != null) this.tblumsstudentmarkssource.settings['hideSubHeader'] = !this.tblumsstudentmarkssource.settings['hideSubHeader'];
        this.tblumsstudentmarkssource.initGrid();
    }
    showumsstudentmarksInActive() {
    }
    enableumsstudentmarksInActive() {
    }
    async SetumsstudentmarksTableddConfig() {
        if (!this.bfilterPopulateumsstudentmarks) {

            this.umscourseservice.getumscoursesList().then((res:any) => {
                var datacourseid2 = res as any;
                for (let i = 0; i < datacourseid2.length; i++) {
                    var obj = { value: datacourseid2[i].courseid, title: datacourseid2[i].coursename };
                    this.dataumsstudentmarkscourseid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentmarkssource.settings);
                clone.columns['courseid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarkscourseid3)), }, };
                clone.columns['courseid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarkscourseid3)), }, };
                this.tblumsstudentmarkssource.settings = clone;
                this.tblumsstudentmarkssource.initGrid();
            });

            this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => {
                var datasemesterid2 = res as any;
                for (let i = 0; i < datasemesterid2.length; i++) {
                    var obj = { value: datasemesterid2[i].semesterid, title: datasemesterid2[i].description };
                    this.dataumsstudentmarkssemesterid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentmarkssource.settings);
                clone.columns['semesterid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarkssemesterid3)), }, };
                clone.columns['semesterid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarkssemesterid3)), }, };
                this.tblumsstudentmarkssource.settings = clone;
                this.tblumsstudentmarkssource.initGrid();
            });

            this.umsexamservice.getumsexamsList().then((res:any) => {
                var dataexamid2 = res as any;
                for (let i = 0; i < dataexamid2.length; i++) {
                    var obj = { value: dataexamid2[i].examid, title: dataexamid2[i].examtitle };
                    this.dataumsstudentmarksexamid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentmarkssource.settings);
                clone.columns['examid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksexamid3)), }, };
                clone.columns['examid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksexamid3)), }, };
                this.tblumsstudentmarkssource.settings = clone;
                this.tblumsstudentmarkssource.initGrid();
            });

            this.configservice.getList("examresult").then((res:any) => {
                var dataresult2 = res as any;
                for (let i = 0; i < dataresult2.length; i++) {
                    var obj = { value: dataresult2[i].configkey, title: dataresult2[i].configtext };
                    this.dataumsstudentmarksresult3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentmarkssource.settings);
                clone.columns['result'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksresult3)), }, };
                clone.columns['result'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksresult3)), }, };
                this.tblumsstudentmarkssource.settings = clone;
                this.tblumsstudentmarkssource.initGrid();
            });
        }
        this.bfilterPopulateumsstudentmarks = true;
    }
    async umsstudentmarksbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsstudentmarksTableConfig() {
        this.umsstudentmarkssettings = {
            hideSubHeader: true,
            mode: 'inline',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: true,
                edit: true, // true,
                delete: true,
                custom: [
                    // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
                    // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
                ]
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
                courseid: {
                    title: 'Course',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentmarkscourseid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                semesterid: {
                    title: 'Semester',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentmarkssemesterid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                examid: {
                    title: 'Exam',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentmarksexamid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                mark: {
                    title: 'mark',
                    type: 'number',
                    filter: true,
                },
                result: {
                    title: 'Result',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentmarksresult3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                recheck: {
                    title: 'recheck',
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
        };
    }
    umsstudentmarksLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentmarksID) >= 0) {
            this.umsstudentmarkssource = new LocalDataSource();
            this.umsstudentmarkssource.load(this.umsstudentmasterservice.umsstudentmarks as any as LocalDataSource);
            this.umsstudentmarkssource.setPaging(1, 20, true);
        }
    }
    umsstudentmarksroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsstudentmasterservice.umsstudentmarks.length == 0) {
                    this.tblumsstudentmarkssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsstudentmark();
                    this.umsstudentmasterservice.umsstudentmarks.push(obj);
                    this.umsstudentmarkssource.refresh();
                    if ((this.umsstudentmasterservice.umsstudentmarks.length / this.umsstudentmarkssource.getPaging().perPage).toFixed(0) + 1 != this.umsstudentmarkssource.getPaging().page) {
                        this.umsstudentmarkssource.setPage((this.umsstudentmasterservice.umsstudentmarks.length / this.umsstudentmarkssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsstudentmarkssource.grid.edit(this.tblumsstudentmarkssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsstudentmarkssource.data.indexOf(event.data);
                this.onDeleteumsstudentmark(event, event.data.markid, ((this.umsstudentmarkssource.getPaging().page - 1) * this.umsstudentmarkssource.getPaging().perPage) + index);
                this.umsstudentmarkssource.refresh();
                break;
        }
    }
    umsstudentmarksPaging(val) {
        debugger;
        this.umsstudentmarkssource.setPaging(1, val, true);
    }
    handleumsstudentmarksGridSelected(event) {
        this.umsstudentmarksselectedindex = this.umsstudentmasterservice.umsstudentmarks.findIndex(i => i.markid === event.data.markid);
    }
    IsumsstudentmarksVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentmarksID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsstudentmarks
    //start of Grid Codes umsstudentfeemasters
    umsstudentfeemasterssettings: any;
    umsstudentfeemasterssource: any;

    showumsstudentfeemastersCheckbox() {
        debugger;
        if (this.tblumsstudentfeemasterssource.settings['selectMode'] == 'multi') this.tblumsstudentfeemasterssource.settings['selectMode'] = 'single';
        else
            this.tblumsstudentfeemasterssource.settings['selectMode'] = 'multi';
        this.tblumsstudentfeemasterssource.initGrid();
    }
    deleteumsstudentfeemastersAll() {
        this.tblumsstudentfeemasterssource.settings['selectMode'] = 'single';
    }
    showumsstudentfeemastersFilter() {
        setTimeout(() => {
            this.SetumsstudentfeemastersTableddConfig();
        });
        if (this.tblumsstudentfeemasterssource.settings != null) this.tblumsstudentfeemasterssource.settings['hideSubHeader'] = !this.tblumsstudentfeemasterssource.settings['hideSubHeader'];
        this.tblumsstudentfeemasterssource.initGrid();
    }
    showumsstudentfeemastersInActive() {
    }
    enableumsstudentfeemastersInActive() {
    }
    async SetumsstudentfeemastersTableddConfig() {
        if (!this.bfilterPopulateumsstudentfeemasters) {

            this.bofinancialyearservice.getbofinancialyearsList().then((res:any) => {
                var datafinancialyearid2 = res as any;
                for (let i = 0; i < datafinancialyearid2.length; i++) {
                    var obj = { value: datafinancialyearid2[i].finyearid, title: datafinancialyearid2[i].finyearname };
                    this.dataumsstudentfeemastersfinancialyearid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentfeemasterssource.settings);
                clone.columns['financialyearid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemastersfinancialyearid3)), }, };
                clone.columns['financialyearid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemastersfinancialyearid3)), }, };
                this.tblumsstudentfeemasterssource.settings = clone;
                this.tblumsstudentfeemasterssource.initGrid();
            });

            this.umscourseservice.getumscoursesList().then((res:any) => {
                var datacourseid2 = res as any;
                for (let i = 0; i < datacourseid2.length; i++) {
                    var obj = { value: datacourseid2[i].courseid, title: datacourseid2[i].coursename };
                    this.dataumsstudentfeemasterscourseid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentfeemasterssource.settings);
                clone.columns['courseid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterscourseid3)), }, };
                clone.columns['courseid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterscourseid3)), }, };
                this.tblumsstudentfeemasterssource.settings = clone;
                this.tblumsstudentfeemasterssource.initGrid();
            });

            this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => {
                var datasemesterid2 = res as any;
                for (let i = 0; i < datasemesterid2.length; i++) {
                    var obj = { value: datasemesterid2[i].semesterid, title: datasemesterid2[i].description };
                    this.dataumsstudentfeemasterssemesterid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentfeemasterssource.settings);
                clone.columns['semesterid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterssemesterid3)), }, };
                clone.columns['semesterid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterssemesterid3)), }, };
                this.tblumsstudentfeemasterssource.settings = clone;
                this.tblumsstudentfeemasterssource.initGrid();
            });

            this.umsfeestructuremasterservice.getumsfeestructuremastersList().then((res:any) => {
                var datafeestructureid2 = res as any;
                for (let i = 0; i < datafeestructureid2.length; i++) {
                    var obj = { value: datafeestructureid2[i].feeid, title: datafeestructureid2[i].Description };
                    this.dataumsstudentfeemastersfeestructureid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentfeemasterssource.settings);
                clone.columns['feestructureid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemastersfeestructureid3)), }, };
                clone.columns['feestructureid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemastersfeestructureid3)), }, };
                this.tblumsstudentfeemasterssource.settings = clone;
                this.tblumsstudentfeemasterssource.initGrid();
            });

            this.configservice.getList("feepaidtype").then((res:any) => {
                var datapaidtype2 = res as any;
                for (let i = 0; i < datapaidtype2.length; i++) {
                    var obj = { value: datapaidtype2[i].configkey, title: datapaidtype2[i].configtext };
                    this.dataumsstudentfeemasterspaidtype3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentfeemasterssource.settings);
                clone.columns['paidtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterspaidtype3)), }, };
                clone.columns['paidtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentfeemasterspaidtype3)), }, };
                this.tblumsstudentfeemasterssource.settings = clone;
                this.tblumsstudentfeemasterssource.initGrid();
            });
        }
        this.bfilterPopulateumsstudentfeemasters = true;
    }
    async umsstudentfeemastersbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsstudentfeemastersTableConfig() {
        this.umsstudentfeemasterssettings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: true,
                edit: true, // true,
                delete: true,
                custom: [
                    // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
                    // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
                ]
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
                financialyearid: {
                    title: 'Year',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentfeemastersfinancialyearid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                courseid: {
                    title: 'Course',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentfeemasterscourseid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                semesterid: {
                    title: 'Semester',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentfeemasterssemesterid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                feestructureid: {
                    title: 'Fee Structure',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentfeemastersfeestructureid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                totalfee: {
                    title: 'Total Fee',
                    type: 'number',
                    filter: true,
                },
                startdate: {
                    title: 'Start Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                enddate: {
                    title: 'End Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                paid: {
                    title: 'Paid',
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
                paiddate: {
                    title: 'Paid Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                paidtype: {
                    title: 'Paid Type',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentfeemasterspaidtype3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                chequeno: {
                    title: 'chequeno',
                    type: '',
                    filter: true,
                },
                chequedate: {
                    title: 'Cheque Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                bankname: {
                    title: 'bankname',
                    type: '',
                    filter: true,
                },
                transactionid: {
                    title: 'transactionid',
                    type: '',
                    filter: true,
                },
                customfield: {
                    title: 'customfield',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        return cell;
                        return cell.substr(15).split('"').join('').split('{').join('').split('}').join('');
                    },
                },
                attachment: {
                    title: 'attachment',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        return cell;
                        return cell.substr(14).split('"').join('').split('{').join('').split('}').join('');
                    },
                },
            },
        };
    }
    umsstudentfeemastersLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentfeemastersID) >= 0) {
            this.umsstudentfeemasterssource = new LocalDataSource();
            this.umsstudentfeemasterssource.load(this.umsstudentmasterservice.umsstudentfeemasters as any as LocalDataSource);
            this.umsstudentfeemasterssource.setPaging(1, 20, true);
        }
    }
    umsstudentfeemastersroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditumsstudentfeemaster(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditumsstudentfeemaster(event, event.data.studentfeeid, this.formid);
                break;
            case 'delete':
                this.onDeleteumsstudentfeemaster(event, event.data.studentfeeid, ((this.umsstudentfeemasterssource.getPaging().page - 1) * this.umsstudentfeemasterssource.getPaging().perPage) + event.index);
                this.umsstudentfeemasterssource.refresh();
                break;
        }
    }
    umsstudentfeemastersonDelete(obj) {
        let studentfeeid = obj.data.studentfeeid;
        if (confirm('Are you sure to delete this record ?')) {
            this.umsstudentmasterservice.deleteumsstudentmaster(studentfeeid).then((res:any) =>
                this.umsstudentfeemastersLoadTable()
            );
        }
    }
    umsstudentfeemastersPaging(val) {
        debugger;
        this.umsstudentfeemasterssource.setPaging(1, val, true);
    }
    handleumsstudentfeemastersGridSelected(event) {
        this.umsstudentfeemastersselectedindex = this.umsstudentmasterservice.umsstudentfeemasters.findIndex(i => i.studentfeeid === event.data.studentfeeid);
    }
    IsumsstudentfeemastersVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentfeemastersID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsstudentfeemasters
    //start of Grid Codes umsstudentcourses
    umsstudentcoursessettings: any;
    umsstudentcoursessource: any;

    showumsstudentcoursesCheckbox() {
        debugger;
        if (this.tblumsstudentcoursessource.settings['selectMode'] == 'multi') this.tblumsstudentcoursessource.settings['selectMode'] = 'single';
        else
            this.tblumsstudentcoursessource.settings['selectMode'] = 'multi';
        this.tblumsstudentcoursessource.initGrid();
    }
    deleteumsstudentcoursesAll() {
        this.tblumsstudentcoursessource.settings['selectMode'] = 'single';
    }
    showumsstudentcoursesFilter() {
        setTimeout(() => {
            this.SetumsstudentcoursesTableddConfig();
        });
        if (this.tblumsstudentcoursessource.settings != null) this.tblumsstudentcoursessource.settings['hideSubHeader'] = !this.tblumsstudentcoursessource.settings['hideSubHeader'];
        this.tblumsstudentcoursessource.initGrid();
    }
    showumsstudentcoursesInActive() {
    }
    enableumsstudentcoursesInActive() {
    }
    async SetumsstudentcoursesTableddConfig() {
        if (!this.bfilterPopulateumsstudentcourses) {

            this.umscourseservice.getumscoursesList().then((res:any) => {
                var datacourseid2 = res as any;
                for (let i = 0; i < datacourseid2.length; i++) {
                    var obj = { value: datacourseid2[i].courseid, title: datacourseid2[i].coursename };
                    this.dataumsstudentcoursescourseid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentcoursessource.settings);
                clone.columns['courseid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentcoursescourseid3)), }, };
                clone.columns['courseid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentcoursescourseid3)), }, };
                this.tblumsstudentcoursessource.settings = clone;
                this.tblumsstudentcoursessource.initGrid();
            });

            this.umstopicmasterservice.getumstopicmastersList().then((res:any) => {
                var datacurrenttopicid2 = res as any;
                for (let i = 0; i < datacurrenttopicid2.length; i++) {
                    var obj = { value: datacurrenttopicid2[i].topicid, title: datacurrenttopicid2[i].description };
                    this.dataumsstudentcoursescurrenttopicid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentcoursessource.settings);
                clone.columns['currenttopicid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentcoursescurrenttopicid3)), }, };
                clone.columns['currenttopicid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentcoursescurrenttopicid3)), }, };
                this.tblumsstudentcoursessource.settings = clone;
                this.tblumsstudentcoursessource.initGrid();
            });
        }
        this.bfilterPopulateumsstudentcourses = true;
    }
    async umsstudentcoursesbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsstudentcoursesTableConfig() {
        this.umsstudentcoursessettings = {
            hideSubHeader: true,
            mode: 'inline',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: true,
                edit: true, // true,
                delete: true,
                custom: [
                    // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
                    // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
                ]
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
                courseid: {
                    title: 'Course',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentcoursescourseid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                currenttopicid: {
                    title: 'Current Topic',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentcoursescurrenttopicid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                progress: {
                    title: 'progress',
                    type: 'number',
                    filter: true,
                },
                completed: {
                    title: 'completed',
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
        };
    }
    umsstudentcoursesLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentcoursesID) >= 0) {
            this.umsstudentcoursessource = new LocalDataSource();
            this.umsstudentcoursessource.load(this.umsstudentmasterservice.umsstudentcourses as any as LocalDataSource);
            this.umsstudentcoursessource.setPaging(1, 20, true);
        }
    }
    umsstudentcoursesroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsstudentmasterservice.umsstudentcourses.length == 0) {
                    this.tblumsstudentcoursessource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsstudentcourse();
                    this.umsstudentmasterservice.umsstudentcourses.push(obj);
                    this.umsstudentcoursessource.refresh();
                    if ((this.umsstudentmasterservice.umsstudentcourses.length / this.umsstudentcoursessource.getPaging().perPage).toFixed(0) + 1 != this.umsstudentcoursessource.getPaging().page) {
                        this.umsstudentcoursessource.setPage((this.umsstudentmasterservice.umsstudentcourses.length / this.umsstudentcoursessource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsstudentcoursessource.grid.edit(this.tblumsstudentcoursessource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsstudentcoursessource.data.indexOf(event.data);
                this.onDeleteumsstudentcourse(event, event.data.studentcourseid, ((this.umsstudentcoursessource.getPaging().page - 1) * this.umsstudentcoursessource.getPaging().perPage) + index);
                this.umsstudentcoursessource.refresh();
                break;
        }
    }
    umsstudentcoursesPaging(val) {
        debugger;
        this.umsstudentcoursessource.setPaging(1, val, true);
    }
    handleumsstudentcoursesGridSelected(event) {
        this.umsstudentcoursesselectedindex = this.umsstudentmasterservice.umsstudentcourses.findIndex(i => i.studentcourseid === event.data.studentcourseid);
    }
    IsumsstudentcoursesVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsstudentcoursesID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsstudentcourses

}



