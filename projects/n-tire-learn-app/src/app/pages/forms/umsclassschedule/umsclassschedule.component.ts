import { umsclassscheduleService } from './../../../service/umsclassschedule.service';
import { umsclassschedule } from './../../../model/umsclassschedule.model';
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
import { umscourse } from './../../../model/umscourse.model';
import { umscourseService } from './../../../service/umscourse.service';
import { umscoursesemester } from './../../../model/umscoursesemester.model';
import { umscoursesemesterService } from './../../../service/umscoursesemester.service';
import { umstopicmaster } from './../../../model/umstopicmaster.model';
import { umstopicmasterService } from './../../../service/umstopicmaster.service';
import { umssectionmaster } from './../../../model/umssectionmaster.model';
import { umssectionmasterService } from './../../../service/umssectionmaster.service';
import { umsinstructormaster } from './../../../model/umsinstructormaster.model';
import { umsinstructormasterService } from './../../../service/umsinstructormaster.service';
import { umsroom } from './../../../model/umsroom.model';
import { umsroomService } from './../../../service/umsroom.service';
import { umsattendance } from './../../../model/umsattendance.model';
import { umssectionstudentService } from './../../../service/umssectionstudent.service';
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
    selector: 'app-umsclassschedule',
    templateUrl: './umsclassschedule.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsclassscheduleComponent implements OnInit {
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
    bfilterPopulateumsclassschedules: boolean = false;
    dataumsclassschedulescourseid3: any = [];
    dataumsclassschedulessemesterid3: any = [];
    dataumsclassschedulestopicid3: any = [];
    dataumsclassschedulessectionid3: any = [];
    dataumsclassschedulesinstructorid3: any = [];
    dataumsclassschedulesalternateinstructorid3: any = [];
    dataumsclassschedulesroomid3: any = [];
    bfilterPopulateumsattendances: boolean = false;
    @ViewChild('tblumsattendancessource', { static: false }) tblumsattendancessource: Ng2SmartTableComponent;
    umsclassscheduleForm: FormGroup;
    courseidList: umscourse[];
    semesteridList: umscoursesemester[];
    topicidList: umstopicmaster[];
    sectionidList: umssectionmaster[];
    instructoridList: umsinstructormaster[];
    alternateinstructoridList: umsinstructormaster[];
    roomidList: umsroom[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedumsattendanceIDs: string = "";
    umsattendancesID: string = "1";
    umsattendancesselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsclassscheduleservice: umsclassscheduleService,
        private umssectionstudentservice: umssectionstudentService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private umscourseservice: umscourseService,
        private umscoursesemesterservice: umscoursesemesterService,
        private umstopicmasterservice: umstopicmasterService,
        private umssectionmasterservice: umssectionmasterService,
        private umsinstructormasterservice: umsinstructormasterService,
        private umsroomservice: umsroomService,
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
        this.umsclassscheduleForm = this.fb.group({
            scheduleid: [null],
            courseid: [null],
            courseiddesc: [null],
            semesterid: [null],
            semesteriddesc: [null],
            topicid: [null],
            topiciddesc: [null],
            sectionid: [null],
            sectioniddesc: [null],
            startdate: [null],
            starttime: [null],
            enddate: [null],
            endtime: [null],
            instructorid: [null],
            instructoriddesc: [null],
            alternateinstructorid: [null],
            alternateinstructoriddesc: [null],
            roomid: [null],
            roomiddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsclassscheduleForm.controls; }

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
        if (this.umsclassscheduleForm.dirty && this.umsclassscheduleForm.touched) {
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
        let umsclassschedule = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.scheduleid != null) {
            umsclassschedule = this.data.scheduleid;
        }
        else
            umsclassschedule = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsclassschedule;
        //this.sharedService.alert(umsclassschedule);
        if (umsclassschedule == null) {
            this.SetumsattendancesTableConfig();
            setTimeout(() => {
                this.SetumsattendancesTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsclassschedule);
        }
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.semesteridList = res as umscoursesemester[]);
        this.umstopicmasterservice.getumstopicmastersList().then((res:any) => this.topicidList = res as umstopicmaster[]);
        this.umssectionmasterservice.getumssectionmastersList().then((res:any) => this.sectionidList = res as umssectionmaster[]);
        this.umsinstructormasterservice.getumsinstructormastersList().then((res:any) => this.instructoridList = res as umsinstructormaster[]);
        this.umsinstructormasterservice.getumsinstructormastersList().then((res:any) => this.alternateinstructoridList = res as umsinstructormaster[]);
        this.umsroomservice.getumsroomsList().then((res:any) => this.roomidList = res as umsroom[]);
        this.umsclassscheduleForm.markAsUntouched();
        this.umsclassscheduleForm.markAsPristine();
    }



    resetForm() {
        if (this.umsclassscheduleForm != null)
            this.umsclassscheduleForm.reset();
        setTimeout(() => {
            this.umsclassscheduleservice.umsattendances = [];
            this.umsclassscheduleservice.Insertumsattendances = [];
            this.umsattendancesLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsclassscheduleForm.controls[key] != null) {
                    this.umsclassscheduleForm.patchValue(json);
                    this.umsclassscheduleForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let scheduleid = this.umsclassscheduleForm.get('scheduleid')!.value;
        if (scheduleid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsclassscheduleservice.deleteumsclassschedule(scheduleid).then((res:any) => {
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
        this.umsclassscheduleForm.patchValue({
            scheduleid: null
        });
        this.umsclassscheduleservice.formData.scheduleid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umsclassschedules", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    courseidonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ courseiddesc: evt.options[evt.options.selectedIndex].text });
    }
    semesteridonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ semesteriddesc: evt.options[evt.options.selectedIndex].text });
    }
    topicidonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ topiciddesc: evt.options[evt.options.selectedIndex].text });
    }
    sectionidonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ sectioniddesc: evt.options[evt.options.selectedIndex].text });
    }
    instructoridonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ instructoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    alternateinstructoridonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ alternateinstructoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    roomidonChange(evt:any) {
        let e = evt!.value;
        this.umsclassscheduleForm.patchValue({ roomiddesc: evt.options[evt.options.selectedIndex].text });
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
    PopulateScreen(umsclassschedule: any) {
        this.umsclassscheduleservice.getumsclassschedulesByID(parseInt(umsclassschedule)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        var starttimeTime = new Time(res.umsclassschedule.starttime);
        var endtimeTime = new Time(res.umsclassschedule.endtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsclassscheduleForm.patchValue({
            scheduleid: res.umsclassschedule.scheduleid,
            courseid: res.umsclassschedule.courseid,
            courseiddesc: res.umsclassschedule.courseiddesc,
            semesterid: res.umsclassschedule.semesterid,
            semesteriddesc: res.umsclassschedule.semesteriddesc,
            topicid: res.umsclassschedule.topicid,
            topiciddesc: res.umsclassschedule.topiciddesc,
            sectionid: res.umsclassschedule.sectionid,
            sectioniddesc: res.umsclassschedule.sectioniddesc,
            startdate: this.ngbDateParserFormatter.parse(res.umsclassschedule.startdate),
            starttime: starttimeTime,
            enddate: this.ngbDateParserFormatter.parse(res.umsclassschedule.enddate),
            endtime: endtimeTime,
            instructorid: res.umsclassschedule.instructorid,
            instructoriddesc: res.umsclassschedule.instructoriddesc,
            alternateinstructorid: res.umsclassschedule.alternateinstructorid,
            alternateinstructoriddesc: res.umsclassschedule.alternateinstructoriddesc,
            roomid: res.umsclassschedule.roomid,
            roomiddesc: res.umsclassschedule.roomiddesc,
            customfield: res.umsclassschedule.customfield,
            attachment: res.umsclassschedule.attachment,
            status: res.umsclassschedule.status,
            statusdesc: res.umsclassschedule.statusdesc,
        });
        if (this.umsclassscheduleForm.get('customfield')!.value != null && this.umsclassscheduleForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.umsclassscheduleForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.umsclassscheduleForm.get('attachment')!.value != null && this.umsclassscheduleForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.umsclassscheduleForm.get('attachment')!.value);
        this.umsclassscheduleservice.umsattendances = res.umsattendance;
        this.SetumsattendancesTableConfig();
        this.umsattendancesLoadTable();
        setTimeout(() => {
            this.SetumsattendancesTableddConfig();
        });
        this.umsclassscheduleservice.Insertumsattendances = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsclassscheduleForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsclassscheduleservice.formData = this.umsclassscheduleForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsclassscheduleForm.controls[key] != null) {
                    this.umsclassscheduleservice.formData[key] = this.umsclassscheduleForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.umsclassscheduleservice.formData.startdate = new Date(this.ngbDateParserFormatter.format(this.umsclassscheduleForm.get('startdate')!.value) + '  UTC');
        this.umsclassscheduleservice.formData.starttime = (this.umsclassscheduleForm.get('starttime')!.value == null ? 0 : this.umsclassscheduleForm.get('starttime')!.value.hour) + ':' + (this.umsclassscheduleForm.get('starttime')!.value == null ? 0 : this.umsclassscheduleForm.get('starttime')!.value.minute);
        this.umsclassscheduleservice.formData.enddate = new Date(this.ngbDateParserFormatter.format(this.umsclassscheduleForm.get('enddate')!.value) + '  UTC');
        this.umsclassscheduleservice.formData.endtime = (this.umsclassscheduleForm.get('endtime')!.value == null ? 0 : this.umsclassscheduleForm.get('endtime')!.value.hour) + ':' + (this.umsclassscheduleForm.get('endtime')!.value == null ? 0 : this.umsclassscheduleForm.get('endtime')!.value.minute);
        this.umsclassscheduleservice.formData.customfield = JSON.stringify(customfields);
        this.umsclassscheduleservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.umsclassscheduleservice.formData.DeletedumsattendanceIDs = this.DeletedumsattendanceIDs;
        console.log(this.umsclassscheduleservice.formData);
        this.umsclassscheduleservice.saveOrUpdateumsclassschedules().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsclassscheduleservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsclassschedule);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsclassscheduleForm.markAsUntouched();
                this.umsclassscheduleForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
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

    AddOrEditsemesterid(semesterid) {
        let ScreenType = '2';
        /*this.dialog.open(umscoursesemesterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.semesteridList = res as umscoursesemester[]);
        });*/
    }

    AddOrEdittopicid(topicid) {
        let ScreenType = '2';
        /*this.dialog.open(umstopicmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umstopicmasterservice.getumstopicmastersList().then((res:any) => this.topicidList = res as umstopicmaster[]);
        });*/
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

    AddOrEditinstructorid(instructorid) {
        let ScreenType = '2';
        /*this.dialog.open(umsinstructormasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umsinstructormasterservice.getumsinstructormastersList().then((res:any) => this.instructoridList = res as umsinstructormaster[]);
        });*/
    }

    AddOrEditalternateinstructorid(instructorid) {
        let ScreenType = '2';
        /*this.dialog.open(umsinstructormasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umsinstructormasterservice.getumsinstructormastersList().then((res:any) => this.alternateinstructoridList = res as umsinstructormaster[]);
        });*/
    }

    AddOrEditroomid(roomid) {
        let ScreenType = '2';
        /*this.dialog.open(umsroomComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umsroomservice.getumsroomsList().then((res:any) => this.roomidList = res as umsroom[]);
        });*/
    }

    //start of Grid Codes umsattendances
    umsattendancessettings: any;
    umsattendancessource: any;

    showumsattendancesCheckbox() {
        debugger;
        if (this.tblumsattendancessource.settings['selectMode'] == 'multi') this.tblumsattendancessource.settings['selectMode'] = 'single';
        else
            this.tblumsattendancessource.settings['selectMode'] = 'multi';
        this.tblumsattendancessource.initGrid();
    }
    deleteumsattendancesAll() {
        this.tblumsattendancessource.settings['selectMode'] = 'single';
    }
    showumsattendancesFilter() {
        setTimeout(() => {
            this.SetumsattendancesTableddConfig();
        });
        if (this.tblumsattendancessource.settings != null) this.tblumsattendancessource.settings['hideSubHeader'] = !this.tblumsattendancessource.settings['hideSubHeader'];
        this.tblumsattendancessource.initGrid();
    }
    showumsattendancesInActive() {
    }
    enableumsattendancesInActive() {
    }
    async SetumsattendancesTableddConfig() {
        if (!this.bfilterPopulateumsattendances) {
        }
        this.bfilterPopulateumsattendances = true;
    }
    async umsattendancesbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsattendancesTableConfig() {
        this.umsattendancessettings = {
            hideSubHeader: true,
            mode: 'inline',
            selectMode: 'multi',
            actions: {
                width: '300px',
                add: false,
                edit: false,
                delete: false,
            },
            columns: {
                attendanceid: {
                    title: 'Attendance',
                    type: '',
                },
                studentid: {
                    title: 'Student',
                    type: '',
                },
                lastname: {
                    title: 'Lastname',
                    type: '',
                },
            },
        };
    }
    umsattendancesLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsattendancesID) >= 0) {
            this.umsattendancessource = new LocalDataSource();
            this.umsattendancessource.load(this.umsclassscheduleservice.umsattendances as any as LocalDataSource);
            setTimeout(() => {
                if (this.tblumsattendancessource != null) {
                    this.tblumsattendancessource.grid.getRows().forEach((row: any) => {
                        if (row.data.attendanceid != null && row.data.attendanceid != "") {
                            this.umsclassscheduleservice.Insertumsattendances.push(row.data);
                            this.tblumsattendancessource.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    umsattendancesPaging(val) {
        debugger;
        this.umsattendancessource.setPaging(1, val, true);
    }
    handleumsattendancesGridSelected(event) {
        debugger;

        if (event.isSelected) {
            if (event.data.attendanceid == null || event.data.attendanceid == "") {
                var obj = { scheduleid: this.formid, sectionid: event.data.sectionid }
                this.umsclassscheduleservice.Insertumsattendances.push(obj as any);
            }
            else {
                var deletedids = this.DeletedumsattendanceIDs.split(',');

                let i: number = 0;
                deletedids.forEach(id => {
                    if (id == event.data.attendanceid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.attendanceid != null && event.data.attendanceid != "") this.DeletedumsattendanceIDs += event.data.attendanceid + ",";
        }
    }
    IsumsattendancesVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsattendancesID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsattendances

}



