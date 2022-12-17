import { umsinstructormasterService } from './../../../service/umsinstructormaster.service';
import { umsinstructormaster } from './../../../model/umsinstructormaster.model';
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
import { hrmsemployee } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { umsinstructorskill } from './../../../model/umsinstructorskill.model';
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
    selector: 'app-umsinstructormaster',
    templateUrl: './umsinstructormaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsinstructormasterComponent implements OnInit {
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
    bfilterPopulateumsinstructormasters: boolean = false;
    dataumsinstructormastersinstructortype3: any = [];
    dataumsinstructormastersemployeeid3: any = [];
    dataumsinstructormastersdepartment3: any = [];
    dataumsinstructorskillsrating3: any = [];
    dataumsinstructorskillstopicid3: any = [];
    bfilterPopulateumsinstructorskills: boolean = false;
    @ViewChild('tblumsinstructorskillssource', { static: false }) tblumsinstructorskillssource: Ng2SmartTableComponent;
    umsinstructormasterForm: FormGroup;
    instructortypeList: boconfigvalue[]=[];
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    departmentList: bomasterdata[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedumsinstructorskillIDs: string = "";
    umsinstructorskillsID: string = "1";
    umsinstructorskillsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsinstructormasterservice: umsinstructormasterService,
        private umstopicmasterservice: umstopicmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private bomasterdataservice: bomasterdataService,
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
        this.umsinstructormasterForm = this.fb.group({
            instructorid: [null],
            name: [null],
            contactno: [null],
            email: [null],
            instructortype: [null],
            instructortypedesc: [null],
            employeeid: [null],
            employeeiddesc: [null],
            department: [null],
            departmentdesc: [null],
            remarks: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsinstructormasterForm.controls; }

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
        if (this.umsinstructormasterForm.dirty && this.umsinstructormasterForm.touched) {
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
        let umsinstructormaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.instructorid != null) {
            umsinstructormaster = this.data.instructorid;
        }
        else
            umsinstructormaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsinstructormaster;
        //this.sharedService.alert(umsinstructormaster);
        if (umsinstructormaster == null) {
            this.SetumsinstructorskillsTableConfig();
            setTimeout(() => {
                this.SetumsinstructorskillsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsinstructormaster);
        }
        this.configservice.getList("instructortype").then((res:any) => this.instructortypeList = res as boconfigvalue[]);
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
        this.bomasterdataservice.getList("1").then((res:any) => this.departmentList = res as bomasterdata[]);
        this.umsinstructormasterForm.markAsUntouched();
        this.umsinstructormasterForm.markAsPristine();
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.umsinstructormasterForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.umsinstructormasterForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.umsinstructormasterForm != null)
            this.umsinstructormasterForm.reset();
        setTimeout(() => {
            this.umsinstructormasterservice.umsinstructorskills = [];
            this.umsinstructorskillsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsinstructormasterForm.controls[key] != null) {
                    this.umsinstructormasterForm.patchValue(json);
                    this.umsinstructormasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let instructorid = this.umsinstructormasterForm.get('instructorid')!.value;
        if (instructorid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsinstructormasterservice.deleteumsinstructormaster(instructorid).then((res:any) => {
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
        this.umsinstructormasterForm.patchValue({
            instructorid: null
        });
        this.umsinstructormasterservice.formData.instructorid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umsinstructormasters", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    instructortypeonChange(evt:any) {
        let e = evt!.value;
        this.umsinstructormasterForm.patchValue({ instructortypedesc: evt.options[evt.options.selectedIndex].text });
    }
    employeeidonChange(evt:any) {
        let e = evt!.value;
    }
    departmentonChange(evt:any) {
        let e = evt!.value;
        this.umsinstructormasterForm.patchValue({ departmentdesc: evt.options[evt.options.selectedIndex].text });
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
    PopulateScreen(umsinstructormaster: any) {
        this.umsinstructormasterservice.getumsinstructormastersByID(parseInt(umsinstructormaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsinstructormasterForm.patchValue({
            instructorid: res.umsinstructormaster.instructorid,
            name: res.umsinstructormaster.name,
            contactno: res.umsinstructormaster.contactno,
            email: res.umsinstructormaster.email,
            instructortype: res.umsinstructormaster.instructortype,
            instructortypedesc: res.umsinstructormaster.instructortypedesc,
            employeeid: res.umsinstructormaster.employeeid,
            employeeiddesc: res.umsinstructormaster.employeeiddesc,
            department: res.umsinstructormaster.department,
            departmentdesc: res.umsinstructormaster.departmentdesc,
            remarks: res.umsinstructormaster.remarks,
            customfield: res.umsinstructormaster.customfield,
            attachment: res.umsinstructormaster.attachment,
            status: res.umsinstructormaster.status,
            statusdesc: res.umsinstructormaster.statusdesc,
        });
        if (this.umsinstructormasterForm.get('customfield')!.value != null && this.umsinstructormasterForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.umsinstructormasterForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.umsinstructormasterForm.get('attachment')!.value != null && this.umsinstructormasterForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.umsinstructormasterForm.get('attachment')!.value);
        this.umsinstructormasterservice.umsinstructorskills = res.umsinstructorskill;
        this.SetumsinstructorskillsTableConfig();
        this.umsinstructorskillsLoadTable();
        setTimeout(() => {
            this.SetumsinstructorskillsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsinstructormasterForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsinstructormasterservice.formData = this.umsinstructormasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsinstructormasterForm.controls[key] != null) {
                    this.umsinstructormasterservice.formData[key] = this.umsinstructormasterForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.umsinstructormasterservice.formData.contactno = this.umsinstructormasterForm.get('contactno')!.value == null ? null : this.umsinstructormasterForm.get('contactno')!.value;
        this.umsinstructormasterservice.formData.customfield = JSON.stringify(customfields);
        this.umsinstructormasterservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.umsinstructormasterservice.formData.DeletedumsinstructorskillIDs = this.DeletedumsinstructorskillIDs;
        console.log(this.umsinstructormasterservice.formData);
        this.umsinstructormasterservice.saveOrUpdateumsinstructormasters().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsinstructormasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsinstructormaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsinstructormasterForm.markAsUntouched();
                this.umsinstructormasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditemployeeid(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        });*/
    }

    AddOrEditdepartment(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.departmentList = res as bomasterdata[]);
        });*/
    }

    onDeleteumsinstructorskill(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsinstructorskillIDs += childID + ",";
        this.umsinstructormasterservice.umsinstructorskills.splice(i, 1);
    }
    //start of Grid Codes umsinstructorskills
    umsinstructorskillssettings: any;
    umsinstructorskillssource: any;

    showumsinstructorskillsCheckbox() {
        debugger;
        if (this.tblumsinstructorskillssource.settings['selectMode'] == 'multi') this.tblumsinstructorskillssource.settings['selectMode'] = 'single';
        else
            this.tblumsinstructorskillssource.settings['selectMode'] = 'multi';
        this.tblumsinstructorskillssource.initGrid();
    }
    deleteumsinstructorskillsAll() {
        this.tblumsinstructorskillssource.settings['selectMode'] = 'single';
    }
    showumsinstructorskillsFilter() {
        setTimeout(() => {
            this.SetumsinstructorskillsTableddConfig();
        });
        if (this.tblumsinstructorskillssource.settings != null) this.tblumsinstructorskillssource.settings['hideSubHeader'] = !this.tblumsinstructorskillssource.settings['hideSubHeader'];
        this.tblumsinstructorskillssource.initGrid();
    }
    showumsinstructorskillsInActive() {
    }
    enableumsinstructorskillsInActive() {
    }
    async SetumsinstructorskillsTableddConfig() {
        if (!this.bfilterPopulateumsinstructorskills) {

            this.umstopicmasterservice.getumstopicmastersList().then((res:any) => {
                var datatopicid2 = res as any;
                for (let i = 0; i < datatopicid2.length; i++) {
                    var obj = { value: datatopicid2[i].topicid, title: datatopicid2[i].description };
                    this.dataumsinstructorskillstopicid3.push(obj);
                }
                var clone = this.clone(this.tblumsinstructorskillssource.settings);
                clone.columns['topicid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsinstructorskillstopicid3)), }, };
                clone.columns['topicid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsinstructorskillstopicid3)), }, };
                this.tblumsinstructorskillssource.settings = clone;
                this.tblumsinstructorskillssource.initGrid();
            });

            this.configservice.getList("rating").then((res:any) => {
                var datarating2 = res as any;
                for (let i = 0; i < datarating2.length; i++) {
                    var obj = { value: datarating2[i].configkey, title: datarating2[i].configtext };
                    this.dataumsinstructorskillsrating3.push(obj);
                }
                var clone = this.clone(this.tblumsinstructorskillssource.settings);
                clone.columns['rating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsinstructorskillsrating3)), }, };
                clone.columns['rating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsinstructorskillsrating3)), }, };
                this.tblumsinstructorskillssource.settings = clone;
                this.tblumsinstructorskillssource.initGrid();
            });
        }
        this.bfilterPopulateumsinstructorskills = true;
    }
    async umsinstructorskillsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsinstructorskillsTableConfig() {
        this.umsinstructorskillssettings = {
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
                topicid: {
                    title: 'Topic',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsinstructorskillstopicid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                rating: {
                    title: 'Rating',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsinstructorskillsrating3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    umsinstructorskillsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsinstructorskillsID) >= 0) {
            this.umsinstructorskillssource = new LocalDataSource();
            this.umsinstructorskillssource.load(this.umsinstructormasterservice.umsinstructorskills as any as LocalDataSource);
            this.umsinstructorskillssource.setPaging(1, 20, true);
        }
    }
    umsinstructorskillsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsinstructormasterservice.umsinstructorskills.length == 0) {
                    this.tblumsinstructorskillssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsinstructorskill();
                    this.umsinstructormasterservice.umsinstructorskills.push(obj);
                    this.umsinstructorskillssource.refresh();
                    if ((this.umsinstructormasterservice.umsinstructorskills.length / this.umsinstructorskillssource.getPaging().perPage).toFixed(0) + 1 != this.umsinstructorskillssource.getPaging().page) {
                        this.umsinstructorskillssource.setPage((this.umsinstructormasterservice.umsinstructorskills.length / this.umsinstructorskillssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsinstructorskillssource.grid.edit(this.tblumsinstructorskillssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsinstructorskillssource.data.indexOf(event.data);
                this.onDeleteumsinstructorskill(event, event.data.skillid, ((this.umsinstructorskillssource.getPaging().page - 1) * this.umsinstructorskillssource.getPaging().perPage) + index);
                this.umsinstructorskillssource.refresh();
                break;
        }
    }
    umsinstructorskillsPaging(val) {
        debugger;
        this.umsinstructorskillssource.setPaging(1, val, true);
    }
    handleumsinstructorskillsGridSelected(event) {
        this.umsinstructorskillsselectedindex = this.umsinstructormasterservice.umsinstructorskills.findIndex(i => i.skillid === event.data.skillid);
    }
    IsumsinstructorskillsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsinstructorskillsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsinstructorskills

}



