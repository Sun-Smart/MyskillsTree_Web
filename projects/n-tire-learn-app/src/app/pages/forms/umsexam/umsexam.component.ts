import { umsexamService } from './../../../service/umsexam.service';
import { umsexam } from './../../../model/umsexam.model';
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
import { umssectionmaster } from './../../../model/umssectionmaster.model';
import { umssectionmasterService } from './../../../service/umssectionmaster.service';
import { umsstudentmark } from './../../../model/umsstudentmark.model';
import { umsstudentmaster, IumsstudentmasterResponse } from './../../../model/umsstudentmaster.model';
import { umsstudentmasterService } from './../../../service/umsstudentmaster.service';
import { umsexamtopic } from './../../../model/umsexamtopic.model';
import { umssemestertopicService } from './../../../service/umssemestertopic.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-umsexam',
    templateUrl: './umsexam.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsexamComponent implements OnInit {
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulateumsexams: boolean = false;
    dataumsexamscourseid3: any = [];
    dataumsexamssemesterid3: any = [];
    dataumsexamsexamtype3: any = [];
    dataumsexamssectionid3: any = [];
    dataumsstudentmarksstudentid3: any = [];
    dataumsstudentmarksresult3: any = [];
    dataumsstudentmarksexamid3: any = [];
    bfilterPopulateumsstudentmarks: boolean = false;
    bfilterPopulateumsexamtopics: boolean = false;
    @ViewChild('tblumsstudentmarkssource', { static: false }) tblumsstudentmarkssource: Ng2SmartTableComponent;
    @ViewChild('tblumsexamtopicssource', { static: false }) tblumsexamtopicssource: Ng2SmartTableComponent;
    umsexamForm: FormGroup;
    courseidList: umscourse[];
    semesteridList: umscoursesemester[];
    examtypeList: boconfigvalue[]=[];
    sectionidList: umssectionmaster[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedumsstudentmarkIDs: string = "";
    umsstudentmarksID: string = "1";
    umsstudentmarksselectedindex: any;
    DeletedumsexamtopicIDs: string = "";
    umsexamtopicsID: string = "2";
    umsexamtopicsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsexamservice: umsexamService,
        private umsstudentmasterservice: umsstudentmasterService,
        private umssemestertopicservice: umssemestertopicService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private umscourseservice: umscourseService,
        private umscoursesemesterservice: umscoursesemesterService,
        private umssectionmasterservice: umssectionmasterService,
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
        this.umsexamForm = this.fb.group({
            examid: [null],
            courseid: [null],
            courseiddesc: [null],
            semesterid: [null],
            semesteriddesc: [null],
            examtype: [null],
            examtypedesc: [null],
            examtitle: [null],
            questions: [null],
            instructions: [null],
            totalmarks: [null, ],
            examdate: [null],
            fromtime: [null],
            totime: [null],
            sectionid: [null],
            sectioniddesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsexamForm.controls; }

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
        if (this.umsexamForm.dirty && this.umsexamForm.touched) {
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
        let umsexam = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.examid != null) {
            umsexam = this.data.examid;
        }
        else
            umsexam = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsexam;
        //this.sharedService.alert(umsexam);
        if (umsexam == null) {
            this.SetumsstudentmarksTableConfig();
            setTimeout(() => {
                this.SetumsstudentmarksTableddConfig();
            });
            this.SetumsexamtopicsTableConfig();
            setTimeout(() => {
                this.SetumsexamtopicsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsexam);
        }
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.semesteridList = res as umscoursesemester[]);
        this.configservice.getList("examtype").then((res:any) => this.examtypeList = res as boconfigvalue[]);
        this.umssectionmasterservice.getumssectionmastersList().then((res:any) => this.sectionidList = res as umssectionmaster[]);
        this.umsexamForm.markAsUntouched();
        this.umsexamForm.markAsPristine();
    }



    resetForm() {
        if (this.umsexamForm != null)
            this.umsexamForm.reset();
        setTimeout(() => {
            this.umsexamservice.umsstudentmarks = [];
            this.umsstudentmarksLoadTable();
            this.umsexamservice.umsexamtopics = [];
            this.umsexamservice.Insertumsexamtopics = [];
            this.umsexamtopicsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsexamForm.controls[key] != null) {
                    this.umsexamForm.patchValue(json);
                    this.umsexamForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let examid = this.umsexamForm.get('examid')!.value;
        if (examid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsexamservice.deleteumsexam(examid).then((res:any) => {
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
        this.umsexamForm.patchValue({
            examid: null
        });
        this.umsexamservice.formData.examid = null;
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
        this.umsexamForm.patchValue({ courseiddesc: evt.options[evt.options.selectedIndex].text });
    }
    semesteridonChange(evt:any) {
        let e = evt!.value;
        this.umsexamForm.patchValue({ semesteriddesc: evt.options[evt.options.selectedIndex].text });
    }
    examtypeonChange(evt:any) {
        let e = evt!.value;
        this.umsexamForm.patchValue({ examtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    sectionidonChange(evt:any) {
        let e = evt!.value;
        this.umsexamForm.patchValue({ sectioniddesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(umsexam: any) {
        this.umsexamservice.getumsexamsByID(parseInt(umsexam)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        var fromtimeTime = new Time(res.umsexam.fromtime);
        var totimeTime = new Time(res.umsexam.totime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsexamForm.patchValue({
            examid: res.umsexam.examid,
            courseid: res.umsexam.courseid,
            courseiddesc: res.umsexam.courseiddesc,
            semesterid: res.umsexam.semesterid,
            semesteriddesc: res.umsexam.semesteriddesc,
            examtype: res.umsexam.examtype,
            examtypedesc: res.umsexam.examtypedesc,
            examtitle: res.umsexam.examtitle,
            questions: res.umsexam.questions,
            instructions: res.umsexam.instructions,
            totalmarks: res.umsexam.totalmarks,
            examdate: this.ngbDateParserFormatter.parse(res.umsexam.examdate),
            fromtime: fromtimeTime,
            totime: totimeTime,
            sectionid: res.umsexam.sectionid,
            sectioniddesc: res.umsexam.sectioniddesc,
            status: res.umsexam.status,
            statusdesc: res.umsexam.statusdesc,
        });
        this.umsexamservice.umsstudentmarks = res.umsstudentmark;
        this.SetumsstudentmarksTableConfig();
        this.umsstudentmarksLoadTable();
        setTimeout(() => {
            this.SetumsstudentmarksTableddConfig();
        });
        this.umsexamservice.umsexamtopics = res.umsexamtopic;
        this.SetumsexamtopicsTableConfig();
        this.umsexamtopicsLoadTable();
        setTimeout(() => {
            this.SetumsexamtopicsTableddConfig();
        });
        this.umsexamservice.Insertumsexamtopics = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsexamForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsexamservice.formData = this.umsexamForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsexamForm.controls[key] != null) {
                    this.umsexamservice.formData[key] = this.umsexamForm.controls[key]!.value;
                }
            }
        }
        this.umsexamservice.formData.examdate = new Date(this.ngbDateParserFormatter.format(this.umsexamForm.get('examdate')!.value) + '  UTC');
        this.umsexamservice.formData.fromtime = (this.umsexamForm.get('fromtime')!.value == null ? 0 : this.umsexamForm.get('fromtime')!.value.hour) + ':' + (this.umsexamForm.get('fromtime')!.value == null ? 0 : this.umsexamForm.get('fromtime')!.value.minute);
        this.umsexamservice.formData.totime = (this.umsexamForm.get('totime')!.value == null ? 0 : this.umsexamForm.get('totime')!.value.hour) + ':' + (this.umsexamForm.get('totime')!.value == null ? 0 : this.umsexamForm.get('totime')!.value.minute);
        this.umsexamservice.formData.DeletedumsstudentmarkIDs = this.DeletedumsstudentmarkIDs;
        this.umsexamservice.formData.DeletedumsexamtopicIDs = this.DeletedumsexamtopicIDs;
        console.log(this.umsexamservice.formData);
        this.umsexamservice.saveOrUpdateumsexams().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsexamservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsexam);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsexamForm.markAsUntouched();
                this.umsexamForm.markAsPristine();
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

    onDeleteumsstudentmark(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsstudentmarkIDs += childID + ",";
        this.umsexamservice.umsstudentmarks.splice(i, 1);
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

            this.umsstudentmasterservice.getumsstudentmastersList().then((res:any) => {
                var datastudentid2 = res as any;
                for (let i = 0; i < datastudentid2.length; i++) {
                    var obj = { value: datastudentid2[i].studentid, title: datastudentid2[i].lastname };
                    this.dataumsstudentmarksstudentid3.push(obj);
                }
                var clone = this.clone(this.tblumsstudentmarkssource.settings);
                clone.columns['studentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksstudentid3)), }, };
                clone.columns['studentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsstudentmarksstudentid3)), }, };
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
                studentid: {
                    title: 'Student',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsstudentmarksstudentid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                mark: {
                    title: 'Mark',
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
            this.umsstudentmarkssource.load(this.umsexamservice.umsstudentmarks as any as LocalDataSource);
            this.umsstudentmarkssource.setPaging(1, 20, true);
        }
    }
    umsstudentmarksroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsexamservice.umsstudentmarks.length == 0) {
                    this.tblumsstudentmarkssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsstudentmark();
                    this.umsexamservice.umsstudentmarks.push(obj);
                    this.umsstudentmarkssource.refresh();
                    if ((this.umsexamservice.umsstudentmarks.length / this.umsstudentmarkssource.getPaging().perPage).toFixed(0) + 1 != this.umsstudentmarkssource.getPaging().page) {
                        this.umsstudentmarkssource.setPage((this.umsexamservice.umsstudentmarks.length / this.umsstudentmarkssource.getPaging().perPage).toFixed(0) + 1);
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
        this.umsstudentmarksselectedindex = this.umsexamservice.umsstudentmarks.findIndex(i => i.markid === event.data.markid);
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
    //start of Grid Codes umsexamtopics
    umsexamtopicssettings: any;
    umsexamtopicssource: any;

    showumsexamtopicsCheckbox() {
        debugger;
        if (this.tblumsexamtopicssource.settings['selectMode'] == 'multi') this.tblumsexamtopicssource.settings['selectMode'] = 'single';
        else
            this.tblumsexamtopicssource.settings['selectMode'] = 'multi';
        this.tblumsexamtopicssource.initGrid();
    }
    deleteumsexamtopicsAll() {
        this.tblumsexamtopicssource.settings['selectMode'] = 'single';
    }
    showumsexamtopicsFilter() {
        setTimeout(() => {
            this.SetumsexamtopicsTableddConfig();
        });
        if (this.tblumsexamtopicssource.settings != null) this.tblumsexamtopicssource.settings['hideSubHeader'] = !this.tblumsexamtopicssource.settings['hideSubHeader'];
        this.tblumsexamtopicssource.initGrid();
    }
    showumsexamtopicsInActive() {
    }
    enableumsexamtopicsInActive() {
    }
    async SetumsexamtopicsTableddConfig() {
        if (!this.bfilterPopulateumsexamtopics) {
        }
        this.bfilterPopulateumsexamtopics = true;
    }
    async umsexamtopicsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsexamtopicsTableConfig() {
        this.umsexamtopicssettings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'multi',
            actions: {
                width: '300px',
                add: false,
                edit: false,
                delete: false,
            },
            columns: {
                examtopicid: {
                    title: 'Exam Topic',
                    type: '',
                },
                topicid: {
                    title: 'Topic',
                    type: '',
                },
                description: {
                    title: 'Description',
                    type: '',
                },
            },
        };
    }
    umsexamtopicsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsexamtopicsID) >= 0) {
            this.umsexamtopicssource = new LocalDataSource();
            this.umsexamtopicssource.load(this.umsexamservice.umsexamtopics as any as LocalDataSource);
            setTimeout(() => {
                if (this.tblumsexamtopicssource != null) {
                    this.tblumsexamtopicssource.grid.getRows().forEach((row: any) => {
                        if (row.data.examtopicid != null && row.data.examtopicid != "") {
                            this.umsexamservice.Insertumsexamtopics.push(row.data);
                            this.tblumsexamtopicssource.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    umsexamtopicsPaging(val) {
        debugger;
        this.umsexamtopicssource.setPaging(1, val, true);
    }
    handleumsexamtopicsGridSelected(event) {
        debugger;

        if (event.isSelected) {
            if (event.data.examtopicid == null || event.data.examtopicid == "") {
                var obj = { examid: this.formid, topicid: event.data.topicid }
                this.umsexamservice.Insertumsexamtopics.push(obj as any);
            }
            else {
                var deletedids = this.DeletedumsexamtopicIDs.split(',');

                let i: number = 0;
                deletedids.forEach(id => {
                    if (id == event.data.examtopicid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.examtopicid != null && event.data.examtopicid != "") this.DeletedumsexamtopicIDs += event.data.examtopicid + ",";
        }
    }
    IsumsexamtopicsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsexamtopicsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsexamtopics

}



