import { umssectionmasterService } from './../../../service/umssectionmaster.service';
import { umssectionmaster } from './../../../model/umssectionmaster.model';
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
import { umssectionstudent } from './../../../model/umssectionstudent.model';
import { umsstudentmasterService } from './../../../service/umsstudentmaster.service';
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
    selector: 'app-umssectionmaster',
    templateUrl: './umssectionmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umssectionmasterComponent implements OnInit {
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
    bfilterPopulateumssectionmasters: boolean = false;
    bfilterPopulateumssectionstudents: boolean = false;
    @ViewChild('tblumssectionstudentssource', { static: false }) tblumssectionstudentssource: Ng2SmartTableComponent;
    umssectionmasterForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedumssectionstudentIDs: string = "";
    umssectionstudentsID: string = "1";
    umssectionstudentsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umssectionmasterservice: umssectionmasterService,
        private umsstudentmasterservice: umsstudentmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
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
        this.umssectionmasterForm = this.fb.group({
            sectionid: [null],
            sectionname: [null],
            maxstrength: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umssectionmasterForm.controls; }

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
        if (this.umssectionmasterForm.dirty && this.umssectionmasterForm.touched) {
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
        let umssectionmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.sectionid != null) {
            umssectionmaster = this.data.sectionid;
        }
        else
            umssectionmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umssectionmaster;
        //this.sharedService.alert(umssectionmaster);
        if (umssectionmaster == null) {
            this.SetumssectionstudentsTableConfig();
            setTimeout(() => {
                this.SetumssectionstudentsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(umssectionmaster);
        }
        this.umssectionmasterForm.markAsUntouched();
        this.umssectionmasterForm.markAsPristine();
    }



    resetForm() {
        if (this.umssectionmasterForm != null)
            this.umssectionmasterForm.reset();
        //var sessionuser = JSON.parse(this.sessionService.getSession());
        setTimeout(() => {
            this.umssectionmasterservice.umssectionstudents = [];
            this.umssectionmasterservice.Insertumssectionstudents = [];
            this.umssectionstudentsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umssectionmasterForm.controls[key] != null) {
                    this.umssectionmasterForm.patchValue(json);
                    this.umssectionmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let sectionid = this.umssectionmasterForm.get('sectionid')!.value;
        if (sectionid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umssectionmasterservice.deleteumssectionmaster(sectionid).then((res:any) => {
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
        this.umssectionmasterForm.patchValue({
            sectionid: null
        });
        this.umssectionmasterservice.formData.sectionid = null;
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
    PopulateScreen(umssectionmaster: any) {
        this.umssectionmasterservice.getumssectionmastersByID(parseInt(umssectionmaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umssectionmasterForm.patchValue({
            sectionid: res.umssectionmaster.sectionid,
            sectionname: res.umssectionmaster.sectionname,
            maxstrength: res.umssectionmaster.maxstrength,
            status: res.umssectionmaster.status,
            statusdesc: res.umssectionmaster.statusdesc,
        });
        this.umssectionmasterservice.umssectionstudents = res.umssectionstudent;
        this.SetumssectionstudentsTableConfig();
        this.umssectionstudentsLoadTable();
        setTimeout(() => {
            this.SetumssectionstudentsTableddConfig();
        });
        this.umssectionmasterservice.Insertumssectionstudents = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umssectionmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umssectionmasterservice.formData = this.umssectionmasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umssectionmasterForm.controls[key] != null) {
                    this.umssectionmasterservice.formData[key] = this.umssectionmasterForm.controls[key]!.value;
                }
            }
        }
        this.umssectionmasterservice.formData.DeletedumssectionstudentIDs = this.DeletedumssectionstudentIDs;
        console.log(this.umssectionmasterservice.formData);
        this.umssectionmasterservice.saveOrUpdateumssectionmasters().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umssectionmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umssectionmaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umssectionmasterForm.markAsUntouched();
                this.umssectionmasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    //start of Grid Codes umssectionstudents
    umssectionstudentssettings: any;
    umssectionstudentssource: any;

    showumssectionstudentsCheckbox() {
        debugger;
        if (this.tblumssectionstudentssource.settings['selectMode'] == 'multi') this.tblumssectionstudentssource.settings['selectMode'] = 'single';
        else
            this.tblumssectionstudentssource.settings['selectMode'] = 'multi';
        this.tblumssectionstudentssource.initGrid();
    }
    deleteumssectionstudentsAll() {
        this.tblumssectionstudentssource.settings['selectMode'] = 'single';
    }
    showumssectionstudentsFilter() {
        setTimeout(() => {
            this.SetumssectionstudentsTableddConfig();
        });
        if (this.tblumssectionstudentssource.settings != null) this.tblumssectionstudentssource.settings['hideSubHeader'] = !this.tblumssectionstudentssource.settings['hideSubHeader'];
        this.tblumssectionstudentssource.initGrid();
    }
    showumssectionstudentsInActive() {
    }
    enableumssectionstudentsInActive() {
    }
    async SetumssectionstudentsTableddConfig() {
        if (!this.bfilterPopulateumssectionstudents) {
        }
        this.bfilterPopulateumssectionstudents = true;
    }
    async umssectionstudentsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumssectionstudentsTableConfig() {
        this.umssectionstudentssettings = {
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
                studentsectionid: {
                    title: 'Student Section',
                    type: '',
                },
                studentid: {
                    title: 'Student',
                    type: '',
                },
                code: {
                    title: 'Code',
                    type: '',
                },
                lastname: {
                    title: 'Lastname',
                    type: '',
                },
            },
        };
    }
    umssectionstudentsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umssectionstudentsID) >= 0) {
            this.umssectionstudentssource = new LocalDataSource();
            this.umssectionstudentssource.load(this.umssectionmasterservice.umssectionstudents as any as LocalDataSource);
            setTimeout(() => {
                if (this.tblumssectionstudentssource != null) {
                    this.tblumssectionstudentssource.grid.getRows().forEach((row: any) => {
                        if (row.data.studentsectionid != null && row.data.studentsectionid != "") {
                            this.umssectionmasterservice.Insertumssectionstudents.push(row.data);
                            this.tblumssectionstudentssource.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    umssectionstudentsPaging(val) {
        debugger;
        this.umssectionstudentssource.setPaging(1, val, true);
    }
    handleumssectionstudentsGridSelected(event) {
        debugger;

        if (event.isSelected) {
            if (event.data.studentsectionid == null || event.data.studentsectionid == "") {
                var obj = { sectionid: this.formid, studentid: event.data.studentid }
                this.umssectionmasterservice.Insertumssectionstudents.push(obj as any);
            }
            else {
                var deletedids = this.DeletedumssectionstudentIDs.split(',');

                let i: number = 0;
                deletedids.forEach(id => {
                    if (id == event.data.studentsectionid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.studentsectionid != null && event.data.studentsectionid != "") this.DeletedumssectionstudentIDs += event.data.studentsectionid + ",";
        }
    }
    IsumssectionstudentsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umssectionstudentsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umssectionstudents

}



