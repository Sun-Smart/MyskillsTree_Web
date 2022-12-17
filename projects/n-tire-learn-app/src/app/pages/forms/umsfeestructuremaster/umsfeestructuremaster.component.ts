import { umsfeestructuremasterService } from './../../../service/umsfeestructuremaster.service';
import { umsfeestructuremaster } from './../../../model/umsfeestructuremaster.model';
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
import { umsfeestructuredetail } from './../../../model/umsfeestructuredetail.model';
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
    selector: 'app-umsfeestructuremaster',
    templateUrl: './umsfeestructuremaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsfeestructuremasterComponent implements OnInit {
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
    bfilterPopulateumsfeestructuremasters: boolean = false;
    dataumsfeestructuremasterscourseid3: any = [];
    dataumsfeestructuremasterssemesterid3: any = [];
    dataumsfeestructuredetailsfeecategory3: any = [];
    bfilterPopulateumsfeestructuredetails: boolean = false;
    @ViewChild('tblumsfeestructuredetailssource', { static: false }) tblumsfeestructuredetailssource: Ng2SmartTableComponent;
    umsfeestructuremasterForm: FormGroup;
    courseidList: umscourse[];
    semesteridList: umscoursesemester[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedumsfeestructuredetailIDs: string = "";
    umsfeestructuredetailsID: string = "1";
    umsfeestructuredetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsfeestructuremasterservice: umsfeestructuremasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private umscourseservice: umscourseService,
        private umscoursesemesterservice: umscoursesemesterService,
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
        this.umsfeestructuremasterForm = this.fb.group({
            feeid: [null],
            description: [null],
            courseid: [null],
            courseiddesc: [null],
            semesterid: [null],
            semesteriddesc: [null],
            totalfee: [null, ],
            startdate: [null],
            enddate: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsfeestructuremasterForm.controls; }

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
        if (this.umsfeestructuremasterForm.dirty && this.umsfeestructuremasterForm.touched) {
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
        let umsfeestructuremaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.feeid != null) {
            umsfeestructuremaster = this.data.feeid;
        }
        else
            umsfeestructuremaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsfeestructuremaster;
        //this.sharedService.alert(umsfeestructuremaster);
        if (umsfeestructuremaster == null) {
            this.SetumsfeestructuredetailsTableConfig();
            setTimeout(() => {
                this.SetumsfeestructuredetailsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsfeestructuremaster);
        }
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        setTimeout(() => {
            if (this.f.courseid!.value != "" && this.f.courseid!.value != null) this.umscoursesemesterservice.getListBycourseid(this.f.courseid!.value).then((res:any) => this.semesteridList = res as umscoursesemester[]);
        });
        this.umsfeestructuremasterForm.markAsUntouched();
        this.umsfeestructuremasterForm.markAsPristine();
    }



    resetForm() {
        if (this.umsfeestructuremasterForm != null)
            this.umsfeestructuremasterForm.reset();
        setTimeout(() => {
            this.umsfeestructuremasterservice.umsfeestructuredetails = [];
            this.umsfeestructuredetailsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsfeestructuremasterForm.controls[key] != null) {
                    this.umsfeestructuremasterForm.patchValue(json);
                    this.umsfeestructuremasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let feeid = this.umsfeestructuremasterForm.get('feeid')!.value;
        if (feeid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsfeestructuremasterservice.deleteumsfeestructuremaster(feeid).then((res:any) => {
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
        this.umsfeestructuremasterForm.patchValue({
            feeid: null
        });
        this.umsfeestructuremasterservice.formData.feeid = null;
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
        this.umsfeestructuremasterForm.patchValue({ courseiddesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.courseid!.value != "" && this.f.courseid!.value != null) this.umscoursesemesterservice.getListBycourseid(this.f.courseid!.value).then((res:any) => this.semesteridList = res as umscoursesemester[]);
        });
    }
    semesteridonChange(evt:any) {
        let e = evt!.value;
        this.umsfeestructuremasterForm.patchValue({ semesteriddesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(umsfeestructuremaster: any) {
        this.umsfeestructuremasterservice.getumsfeestructuremastersByID(parseInt(umsfeestructuremaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsfeestructuremasterForm.patchValue({
            feeid: res.umsfeestructuremaster.feeid,
            description: res.umsfeestructuremaster.description,
            courseid: res.umsfeestructuremaster.courseid,
            courseiddesc: res.umsfeestructuremaster.courseiddesc,
            semesterid: res.umsfeestructuremaster.semesterid,
            semesteriddesc: res.umsfeestructuremaster.semesteriddesc,
            totalfee: res.umsfeestructuremaster.totalfee,
            startdate: this.ngbDateParserFormatter.parse(res.umsfeestructuremaster.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.umsfeestructuremaster.enddate),
            status: res.umsfeestructuremaster.status,
            statusdesc: res.umsfeestructuremaster.statusdesc,
        });
        setTimeout(() => {
            if (this.f.courseid!.value != "" && this.f.courseid!.value != null) this.umscoursesemesterservice.getListBycourseid(this.f.courseid!.value).then((res:any) => this.semesteridList = res as umscoursesemester[]);
        });
        this.umsfeestructuremasterservice.umsfeestructuredetails = res.umsfeestructuredetail;
        this.SetumsfeestructuredetailsTableConfig();
        this.umsfeestructuredetailsLoadTable();
        setTimeout(() => {
            this.SetumsfeestructuredetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsfeestructuremasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsfeestructuremasterservice.formData = this.umsfeestructuremasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsfeestructuremasterForm.controls[key] != null) {
                    this.umsfeestructuremasterservice.formData[key] = this.umsfeestructuremasterForm.controls[key]!.value;
                }
            }
        }
        this.umsfeestructuremasterservice.formData.startdate = new Date(this.ngbDateParserFormatter.format(this.umsfeestructuremasterForm.get('startdate')!.value) + '  UTC');
        this.umsfeestructuremasterservice.formData.enddate = new Date(this.ngbDateParserFormatter.format(this.umsfeestructuremasterForm.get('enddate')!.value) + '  UTC');
        this.umsfeestructuremasterservice.formData.DeletedumsfeestructuredetailIDs = this.DeletedumsfeestructuredetailIDs;
        console.log(this.umsfeestructuremasterservice.formData);
        this.umsfeestructuremasterservice.saveOrUpdateumsfeestructuremasters().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsfeestructuremasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsfeestructuremaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsfeestructuremasterForm.markAsUntouched();
                this.umsfeestructuremasterForm.markAsPristine();
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

    onDeleteumsfeestructuredetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsfeestructuredetailIDs += childID + ",";
        this.umsfeestructuremasterservice.umsfeestructuredetails.splice(i, 1);
    }
    //start of Grid Codes umsfeestructuredetails
    umsfeestructuredetailssettings: any;
    umsfeestructuredetailssource: any;

    showumsfeestructuredetailsCheckbox() {
        debugger;
        if (this.tblumsfeestructuredetailssource.settings['selectMode'] == 'multi') this.tblumsfeestructuredetailssource.settings['selectMode'] = 'single';
        else
            this.tblumsfeestructuredetailssource.settings['selectMode'] = 'multi';
        this.tblumsfeestructuredetailssource.initGrid();
    }
    deleteumsfeestructuredetailsAll() {
        this.tblumsfeestructuredetailssource.settings['selectMode'] = 'single';
    }
    showumsfeestructuredetailsFilter() {
        setTimeout(() => {
            this.SetumsfeestructuredetailsTableddConfig();
        });
        if (this.tblumsfeestructuredetailssource.settings != null) this.tblumsfeestructuredetailssource.settings['hideSubHeader'] = !this.tblumsfeestructuredetailssource.settings['hideSubHeader'];
        this.tblumsfeestructuredetailssource.initGrid();
    }
    showumsfeestructuredetailsInActive() {
    }
    enableumsfeestructuredetailsInActive() {
    }
    async SetumsfeestructuredetailsTableddConfig() {
        if (!this.bfilterPopulateumsfeestructuredetails) {

            this.configservice.getList("feecategory").then((res:any) => {
                var datafeecategory2 = res as any;
                for (let i = 0; i < datafeecategory2.length; i++) {
                    var obj = { value: datafeecategory2[i].configkey, title: datafeecategory2[i].configtext };
                    this.dataumsfeestructuredetailsfeecategory3.push(obj);
                }
                var clone = this.clone(this.tblumsfeestructuredetailssource.settings);
                clone.columns['feecategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeestructuredetailsfeecategory3)), }, };
                clone.columns['feecategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeestructuredetailsfeecategory3)), }, };
                this.tblumsfeestructuredetailssource.settings = clone;
                this.tblumsfeestructuredetailssource.initGrid();
            });
        }
        this.bfilterPopulateumsfeestructuredetails = true;
    }
    async umsfeestructuredetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsfeestructuredetailsTableConfig() {
        this.umsfeestructuredetailssettings = {
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
                feecategory: {
                    title: 'Category',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsfeestructuredetailsfeecategory3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                fee: {
                    title: 'Fee',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    umsfeestructuredetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsfeestructuredetailsID) >= 0) {
            this.umsfeestructuredetailssource = new LocalDataSource();
            this.umsfeestructuredetailssource.load(this.umsfeestructuremasterservice.umsfeestructuredetails as any as LocalDataSource);
            this.umsfeestructuredetailssource.setPaging(1, 20, true);
        }
    }
    umsfeestructuredetailsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsfeestructuremasterservice.umsfeestructuredetails.length == 0) {
                    this.tblumsfeestructuredetailssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsfeestructuredetail();
                    this.umsfeestructuremasterservice.umsfeestructuredetails.push(obj);
                    this.umsfeestructuredetailssource.refresh();
                    if ((this.umsfeestructuremasterservice.umsfeestructuredetails.length / this.umsfeestructuredetailssource.getPaging().perPage).toFixed(0) + 1 != this.umsfeestructuredetailssource.getPaging().page) {
                        this.umsfeestructuredetailssource.setPage((this.umsfeestructuremasterservice.umsfeestructuredetails.length / this.umsfeestructuredetailssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsfeestructuredetailssource.grid.edit(this.tblumsfeestructuredetailssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsfeestructuredetailssource.data.indexOf(event.data);
                this.onDeleteumsfeestructuredetail(event, event.data.feedetailid, ((this.umsfeestructuredetailssource.getPaging().page - 1) * this.umsfeestructuredetailssource.getPaging().perPage) + index);
                this.umsfeestructuredetailssource.refresh();
                break;
        }
    }
    umsfeestructuredetailsPaging(val) {
        debugger;
        this.umsfeestructuredetailssource.setPaging(1, val, true);
    }
    handleumsfeestructuredetailsGridSelected(event) {
        this.umsfeestructuredetailsselectedindex = this.umsfeestructuremasterservice.umsfeestructuredetails.findIndex(i => i.feedetailid === event.data.feedetailid);
    }
    IsumsfeestructuredetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsfeestructuredetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsfeestructuredetails

}



