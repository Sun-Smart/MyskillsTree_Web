import { umscourseService } from './../../../service/umscourse.service';
import { umscourse } from './../../../model/umscourse.model';
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
import { umscoursesemester } from './../../../model/umscoursesemester.model';
import { umsinstructormaster, IumsinstructormasterResponse } from './../../../model/umsinstructormaster.model';
import { umsinstructormasterService } from './../../../service/umsinstructormaster.service';
import { umssemestertopic } from './../../../model/umssemestertopic.model';
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
    selector: 'app-umscourse',
    templateUrl: './umscourse.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umscourseComponent implements OnInit {
    showworkflow: boolean = false;
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
    bfilterPopulateumscourses: boolean = false;
    dataumscourseslanguage3: any = [];
    dataumscoursesemestersresponsiblepersonid3: any = [];
    bfilterPopulateumscoursesemesters: boolean = false;
    bfilterPopulateumssemestertopics: boolean = false;
    @ViewChild('tblumscoursesemesterssource', { static: false }) tblumscoursesemesterssource: Ng2SmartTableComponent;
    @ViewChild('tblumssemestertopicssource', { static: false }) tblumssemestertopicssource: Ng2SmartTableComponent;
    umscourseForm: FormGroup;
    languageList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    @ViewChild('imageurluploader', { static: false }) imageurluploader: FileUpload;
    DeletedumscoursesemesterIDs: string = "";
    umscoursesemestersID: string = "1";
    umscoursesemestersselectedindex: any;
    DeletedumssemestertopicIDs: string = "";
    umssemestertopicsID: string = "2";
    umssemestertopicsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umscourseservice: umscourseService,
        private umsinstructormasterservice: umsinstructormasterService,
        private umstopicmasterservice: umstopicmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
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
        this.umscourseForm = this.fb.group({
            courseid: [null],
            code: [null],
            coursename: [null],
            description: [null],
            language: [null],
            languagedesc: [null],
            imageurl: [null],
            totalhours: [null],
            totalfee: [null, ],
            generatecertificate: [null],
            mailcertificate: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umscourseForm.controls; }

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
        if (this.umscourseForm.dirty && this.umscourseForm.touched) {
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
        let umscourse = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.courseid != null) {
            umscourse = this.data.courseid;
        }
        else
            umscourse = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umscourse;
        //this.sharedService.alert(umscourse);
        if (umscourse == null) {
            this.SetumscoursesemestersTableConfig();
            setTimeout(() => {
                this.SetumscoursesemestersTableddConfig();
            });
            this.SetumssemestertopicsTableConfig();
            setTimeout(() => {
                this.SetumssemestertopicsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(umscourse);
        }
        this.configservice.getList("language").then((res:any) => this.languageList = res as boconfigvalue[]);
        this.umscourseForm.markAsUntouched();
        this.umscourseForm.markAsPristine();
    }



    imageurlFileSelected(e:any) {
        //console.log(this.imageurluploader[0].file);
        this.umscourseForm.patchValue({ imageurl: e.files[0].name });
    }
    resetForm() {
        if (this.umscourseForm != null)
            this.umscourseForm.reset();
        setTimeout(() => {
            this.umscourseservice.umscoursesemesters = [];
            this.umscoursesemestersLoadTable();
            this.umscourseservice.umssemestertopics = [];
            this.umscourseservice.Insertumssemestertopics = [];
            this.umssemestertopicsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umscourseForm.controls[key] != null) {
                    this.umscourseForm.patchValue(json);
                    this.umscourseForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let courseid = this.umscourseForm.get('courseid')!.value;
        if (courseid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umscourseservice.deleteumscourse(courseid).then((res:any) => {
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
        this.umscourseForm.patchValue({
            courseid: null
        });
        this.umscourseservice.formData.courseid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umscourses", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    languageonChange(evt:any) {
        let e = evt!.value;
        this.umscourseForm.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
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
    PopulateScreen(umscourse: any) {
        this.umscourseservice.getumscoursesByID(parseInt(umscourse)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umscourseForm.patchValue({
            courseid: res.umscourse.courseid,
            code: res.umscourse.code,
            coursename: res.umscourse.coursename,
            description: res.umscourse.description,
            language: res.umscourse.language,
            languagedesc: res.umscourse.languagedesc,
            imageurl: res.umscourse.imageurl,
            totalhours: res.umscourse.totalhours,
            totalfee: res.umscourse.totalfee,
            generatecertificate: res.umscourse.generatecertificate,
            mailcertificate: res.umscourse.mailcertificate,
            customfield: res.umscourse.customfield,
            attachment: res.umscourse.attachment,
            status: res.umscourse.status,
            statusdesc: res.umscourse.statusdesc,
        });
        if (this.router.url.startsWith("/workflow/")) {
            this.showworkflow = true;
        }
        else if (this.data != null && this.data != undefined && this.data.workflowid != undefined) {
            this.showworkflow = true;
        }
        else if (res.umscourse.status == "A" || res.umscourse.status == "D") {
            this.showworkflow = true;
        }
        this.showsubmit = false;
        if (res.umscourse.status == "N" || res.umscourse.status == "P") this.showsubmit = true;
        if (res.umscourse.status == "N") this.showGoWorkFlow = true;
        if (this.umscourseForm.get('customfield')!.value != null && this.umscourseForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.umscourseForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.umscourseForm.get('attachment')!.value != null && this.umscourseForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.umscourseForm.get('attachment')!.value);
        this.umscourseservice.umscoursesemesters = res.umscoursesemester;
        this.SetumscoursesemestersTableConfig();
        this.umscoursesemestersLoadTable();
        setTimeout(() => {
            this.SetumscoursesemestersTableddConfig();
        });
        this.umscourseservice.umssemestertopics = res.umssemestertopic;
        this.SetumssemestertopicsTableConfig();
        this.umssemestertopicsLoadTable();
        setTimeout(() => {
            this.SetumssemestertopicsTableddConfig();
        });
        this.umscourseservice.Insertumssemestertopics = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umscourseForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umscourseservice.formData = this.umscourseForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umscourseForm.controls[key] != null) {
                    this.umscourseservice.formData[key] = this.umscourseForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.umscourseservice.formData.customfield = JSON.stringify(customfields);
        this.umscourseservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.umscourseservice.formData.DeletedumscoursesemesterIDs = this.DeletedumscoursesemesterIDs;
        this.umscourseservice.formData.DeletedumssemestertopicIDs = this.DeletedumssemestertopicIDs;
        console.log(this.umscourseservice.formData);
        this.umscourseservice.saveOrUpdateumscourses().subscribe(
            (res:any) => {
                this.imageurluploader.upload();
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umscourseservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umscourse);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umscourseForm.markAsUntouched();
                this.umscourseForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    onDeleteumscoursesemester(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumscoursesemesterIDs += childID + ",";
        this.umscourseservice.umscoursesemesters.splice(i, 1);
    }
    //start of Grid Codes umscoursesemesters
    umscoursesemesterssettings: any;
    umscoursesemesterssource: any;

    showumscoursesemestersCheckbox() {
        debugger;
        if (this.tblumscoursesemesterssource.settings['selectMode'] == 'multi') this.tblumscoursesemesterssource.settings['selectMode'] = 'single';
        else
            this.tblumscoursesemesterssource.settings['selectMode'] = 'multi';
        this.tblumscoursesemesterssource.initGrid();
    }
    deleteumscoursesemestersAll() {
        this.tblumscoursesemesterssource.settings['selectMode'] = 'single';
    }
    showumscoursesemestersFilter() {
        setTimeout(() => {
            this.SetumscoursesemestersTableddConfig();
        });
        if (this.tblumscoursesemesterssource.settings != null) this.tblumscoursesemesterssource.settings['hideSubHeader'] = !this.tblumscoursesemesterssource.settings['hideSubHeader'];
        this.tblumscoursesemesterssource.initGrid();
    }
    showumscoursesemestersInActive() {
    }
    enableumscoursesemestersInActive() {
    }
    async SetumscoursesemestersTableddConfig() {
        if (!this.bfilterPopulateumscoursesemesters) {

            this.umsinstructormasterservice.getumsinstructormastersList().then((res:any) => {
                var dataresponsiblepersonid2 = res as any;
                for (let i = 0; i < dataresponsiblepersonid2.length; i++) {
                    var obj = { value: dataresponsiblepersonid2[i].instructorid, title: dataresponsiblepersonid2[i].name };
                    this.dataumscoursesemestersresponsiblepersonid3.push(obj);
                }
                var clone = this.clone(this.tblumscoursesemesterssource.settings);
                clone.columns['responsiblepersonid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumscoursesemestersresponsiblepersonid3)), }, };
                clone.columns['responsiblepersonid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumscoursesemestersresponsiblepersonid3)), }, };
                this.tblumscoursesemesterssource.settings = clone;
                this.tblumscoursesemesterssource.initGrid();
            });
        }
        this.bfilterPopulateumscoursesemesters = true;
    }
    async umscoursesemestersbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumscoursesemestersTableConfig() {
        this.umscoursesemesterssettings = {
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
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                imageurl: {
                    title: 'Image U R L',
                    type: '',
                    filter: true,
                },
                semesterorder: {
                    title: 'Semesterorder',
                    type: 'number',
                    filter: true,
                },
                responsiblepersonid: {
                    title: 'Responsible Person',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumscoursesemestersresponsiblepersonid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                maxstrength: {
                    title: 'Max Strength',
                    type: 'number',
                    filter: true,
                },
                totalhours: {
                    title: 'Total Hours',
                    type: 'number',
                    filter: true,
                },
                customfield: {
                    title: 'Customfield',
                    type: 'html',
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
                    title: 'Attachment',
                    type: 'html',
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
    umscoursesemestersLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umscoursesemestersID) >= 0) {
            this.umscoursesemesterssource = new LocalDataSource();
            this.umscoursesemesterssource.load(this.umscourseservice.umscoursesemesters as any as LocalDataSource);
            this.umscoursesemesterssource.setPaging(1, 20, true);
        }
    }
    umscoursesemestersroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umscourseservice.umscoursesemesters.length == 0) {
                    this.tblumscoursesemesterssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umscoursesemester();
                    this.umscourseservice.umscoursesemesters.push(obj);
                    this.umscoursesemesterssource.refresh();
                    if ((this.umscourseservice.umscoursesemesters.length / this.umscoursesemesterssource.getPaging().perPage).toFixed(0) + 1 != this.umscoursesemesterssource.getPaging().page) {
                        this.umscoursesemesterssource.setPage((this.umscourseservice.umscoursesemesters.length / this.umscoursesemesterssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumscoursesemesterssource.grid.edit(this.tblumscoursesemesterssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umscoursesemesterssource.data.indexOf(event.data);
                this.onDeleteumscoursesemester(event, event.data.semesterid, ((this.umscoursesemesterssource.getPaging().page - 1) * this.umscoursesemesterssource.getPaging().perPage) + index);
                this.umscoursesemesterssource.refresh();
                break;
        }
    }
    umscoursesemestersPaging(val) {
        debugger;
        this.umscoursesemesterssource.setPaging(1, val, true);
    }
    handleumscoursesemestersGridSelected(event) {
        this.umscoursesemestersselectedindex = this.umscourseservice.umscoursesemesters.findIndex(i => i.semesterid === event.data.semesterid);
    }
    IsumscoursesemestersVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umscoursesemestersID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umscoursesemesters
    //start of Grid Codes umssemestertopics
    umssemestertopicssettings: any;
    umssemestertopicssource: any;

    showumssemestertopicsCheckbox() {
        debugger;
        if (this.tblumssemestertopicssource.settings['selectMode'] == 'multi') this.tblumssemestertopicssource.settings['selectMode'] = 'single';
        else
            this.tblumssemestertopicssource.settings['selectMode'] = 'multi';
        this.tblumssemestertopicssource.initGrid();
    }
    deleteumssemestertopicsAll() {
        this.tblumssemestertopicssource.settings['selectMode'] = 'single';
    }
    showumssemestertopicsFilter() {
        setTimeout(() => {
            this.SetumssemestertopicsTableddConfig();
        });
        if (this.tblumssemestertopicssource.settings != null) this.tblumssemestertopicssource.settings['hideSubHeader'] = !this.tblumssemestertopicssource.settings['hideSubHeader'];
        this.tblumssemestertopicssource.initGrid();
    }
    showumssemestertopicsInActive() {
    }
    enableumssemestertopicsInActive() {
    }
    async SetumssemestertopicsTableddConfig() {
        if (!this.bfilterPopulateumssemestertopics) {
        }
        this.bfilterPopulateumssemestertopics = true;
    }
    async umssemestertopicsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumssemestertopicsTableConfig() {
        this.umssemestertopicssettings = {
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
                semestertopicid: {
                    title: 'Semester Topic',
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
    umssemestertopicsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umssemestertopicsID) >= 0) {
            this.umssemestertopicssource = new LocalDataSource();
            this.umssemestertopicssource.load(this.umscourseservice.umssemestertopics as any as LocalDataSource);
            setTimeout(() => {
                if (this.tblumssemestertopicssource != null) {
                    this.tblumssemestertopicssource.grid.getRows().forEach((row: any) => {
                        if (row.data.semestertopicid != null && row.data.semestertopicid != "") {
                            this.umscourseservice.Insertumssemestertopics.push(row.data);
                            this.tblumssemestertopicssource.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    umssemestertopicsPaging(val) {
        debugger;
        this.umssemestertopicssource.setPaging(1, val, true);
    }
    handleumssemestertopicsGridSelected(event) {
        debugger;

        if (event.isSelected) {
            if (event.data.semestertopicid == null || event.data.semestertopicid == "") {
                var obj = { courseid: this.formid, topicid: event.data.topicid }
                this.umscourseservice.Insertumssemestertopics.push(obj as any);
            }
            else {
                var deletedids = this.DeletedumssemestertopicIDs.split(',');

                let i: number = 0;
                deletedids.forEach(id => {
                    if (id == event.data.semestertopicid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.semestertopicid != null && event.data.semestertopicid != "") this.DeletedumssemestertopicIDs += event.data.semestertopicid + ",";
        }
    }
    IsumssemestertopicsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umssemestertopicsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umssemestertopics

}



