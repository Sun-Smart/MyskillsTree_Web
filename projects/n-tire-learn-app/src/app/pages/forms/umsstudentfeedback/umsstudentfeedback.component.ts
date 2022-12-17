import { umsstudentfeedbackService } from './../../../service/umsstudentfeedback.service';
import { umsstudentfeedback } from './../../../model/umsstudentfeedback.model';
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
import { umsfeedbackrating } from './../../../model/umsfeedbackrating.model';
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
    selector: 'app-umsstudentfeedback',
    templateUrl: './umsstudentfeedback.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsstudentfeedbackComponent implements OnInit {
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
    bfilterPopulateumsstudentfeedbacks: boolean = false;
    dataumsstudentfeedbackstotalrating3: any = [];
    dataumsfeedbackratingsratingtype3: any = [];
    dataumsfeedbackratingsrating3: any = [];
    bfilterPopulateumsfeedbackratings: boolean = false;
    @ViewChild('tblumsfeedbackratingssource', { static: false }) tblumsfeedbackratingssource: Ng2SmartTableComponent;
    umsstudentfeedbackForm: FormGroup;
    totalratingList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedumsfeedbackratingIDs: string = "";
    umsfeedbackratingsID: string = "1";
    umsfeedbackratingsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsstudentfeedbackservice: umsstudentfeedbackService,
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
        this.umsstudentfeedbackForm = this.fb.group({
            feedbackid: [null],
            studentid: [null],
            courseid: [null],
            feedback: [null],
            totalrating: [null],
            totalratingdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsstudentfeedbackForm.controls; }

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
        if (this.umsstudentfeedbackForm.dirty && this.umsstudentfeedbackForm.touched) {
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
        let umsstudentfeedback = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.feedbackid != null) {
            umsstudentfeedback = this.data.feedbackid;
        }
        else
            umsstudentfeedback = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsstudentfeedback;
        //this.sharedService.alert(umsstudentfeedback);
        if (umsstudentfeedback == null) {
            this.SetumsfeedbackratingsTableConfig();
            setTimeout(() => {
                this.SetumsfeedbackratingsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsstudentfeedback);
        }
        this.configservice.getList("rating").then((res:any) => this.totalratingList = res as boconfigvalue[]);
        this.umsstudentfeedbackForm.markAsUntouched();
        this.umsstudentfeedbackForm.markAsPristine();
    }



    resetForm() {
        if (this.umsstudentfeedbackForm != null)
            this.umsstudentfeedbackForm.reset();
        setTimeout(() => {
            this.umsstudentfeedbackservice.umsfeedbackratings = [];
            this.umsfeedbackratingsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsstudentfeedbackForm.controls[key] != null) {
                    this.umsstudentfeedbackForm.patchValue(json);
                    this.umsstudentfeedbackForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let feedbackid = this.umsstudentfeedbackForm.get('feedbackid')!.value;
        if (feedbackid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsstudentfeedbackservice.deleteumsstudentfeedback(feedbackid).then((res:any) => {
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
        this.umsstudentfeedbackForm.patchValue({
            feedbackid: null
        });
        this.umsstudentfeedbackservice.formData.feedbackid = null;
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
    totalratingonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeedbackForm.patchValue({ totalratingdesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(umsstudentfeedback: any) {
        this.umsstudentfeedbackservice.getumsstudentfeedbacksByID(parseInt(umsstudentfeedback)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsstudentfeedbackForm.patchValue({
            feedbackid: res.umsstudentfeedback.feedbackid,
            studentid: res.umsstudentfeedback.studentid,
            courseid: res.umsstudentfeedback.courseid,
            feedback: res.umsstudentfeedback.feedback,
            totalrating: res.umsstudentfeedback.totalrating,
            totalratingdesc: res.umsstudentfeedback.totalratingdesc,
            status: res.umsstudentfeedback.status,
            statusdesc: res.umsstudentfeedback.statusdesc,
        });
        this.umsstudentfeedbackservice.umsfeedbackratings = res.umsfeedbackrating;
        this.SetumsfeedbackratingsTableConfig();
        this.umsfeedbackratingsLoadTable();
        setTimeout(() => {
            this.SetumsfeedbackratingsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsstudentfeedbackForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsstudentfeedbackservice.formData = this.umsstudentfeedbackForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsstudentfeedbackForm.controls[key] != null) {
                    this.umsstudentfeedbackservice.formData[key] = this.umsstudentfeedbackForm.controls[key]!.value;
                }
            }
        }
        this.umsstudentfeedbackservice.formData.DeletedumsfeedbackratingIDs = this.DeletedumsfeedbackratingIDs;
        console.log(this.umsstudentfeedbackservice.formData);
        this.umsstudentfeedbackservice.saveOrUpdateumsstudentfeedbacks().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsstudentfeedbackservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsstudentfeedback);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsstudentfeedbackForm.markAsUntouched();
                this.umsstudentfeedbackForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    onDeleteumsfeedbackrating(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsfeedbackratingIDs += childID + ",";
        this.umsstudentfeedbackservice.umsfeedbackratings.splice(i, 1);
    }
    //start of Grid Codes umsfeedbackratings
    umsfeedbackratingssettings: any;
    umsfeedbackratingssource: any;

    showumsfeedbackratingsCheckbox() {
        debugger;
        if (this.tblumsfeedbackratingssource.settings['selectMode'] == 'multi') this.tblumsfeedbackratingssource.settings['selectMode'] = 'single';
        else
            this.tblumsfeedbackratingssource.settings['selectMode'] = 'multi';
        this.tblumsfeedbackratingssource.initGrid();
    }
    deleteumsfeedbackratingsAll() {
        this.tblumsfeedbackratingssource.settings['selectMode'] = 'single';
    }
    showumsfeedbackratingsFilter() {
        setTimeout(() => {
            this.SetumsfeedbackratingsTableddConfig();
        });
        if (this.tblumsfeedbackratingssource.settings != null) this.tblumsfeedbackratingssource.settings['hideSubHeader'] = !this.tblumsfeedbackratingssource.settings['hideSubHeader'];
        this.tblumsfeedbackratingssource.initGrid();
    }
    showumsfeedbackratingsInActive() {
    }
    enableumsfeedbackratingsInActive() {
    }
    async SetumsfeedbackratingsTableddConfig() {
        if (!this.bfilterPopulateumsfeedbackratings) {

            this.configservice.getList("ratingtype").then((res:any) => {
                var dataratingtype2 = res as any;
                for (let i = 0; i < dataratingtype2.length; i++) {
                    var obj = { value: dataratingtype2[i].configkey, title: dataratingtype2[i].configtext };
                    this.dataumsfeedbackratingsratingtype3.push(obj);
                }
                var clone = this.clone(this.tblumsfeedbackratingssource.settings);
                clone.columns['ratingtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeedbackratingsratingtype3)), }, };
                clone.columns['ratingtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeedbackratingsratingtype3)), }, };
                this.tblumsfeedbackratingssource.settings = clone;
                this.tblumsfeedbackratingssource.initGrid();
            });

            this.configservice.getList("rating").then((res:any) => {
                var datarating2 = res as any;
                for (let i = 0; i < datarating2.length; i++) {
                    var obj = { value: datarating2[i].configkey, title: datarating2[i].configtext };
                    this.dataumsfeedbackratingsrating3.push(obj);
                }
                var clone = this.clone(this.tblumsfeedbackratingssource.settings);
                clone.columns['rating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeedbackratingsrating3)), }, };
                clone.columns['rating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataumsfeedbackratingsrating3)), }, };
                this.tblumsfeedbackratingssource.settings = clone;
                this.tblumsfeedbackratingssource.initGrid();
            });
        }
        this.bfilterPopulateumsfeedbackratings = true;
    }
    async umsfeedbackratingsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsfeedbackratingsTableConfig() {
        this.umsfeedbackratingssettings = {
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
                ratingtype: {
                    title: 'Rating Type',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataumsfeedbackratingsratingtype3.find(c => c!.value == cell);
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
                        var element = this.dataumsfeedbackratingsrating3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    umsfeedbackratingsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsfeedbackratingsID) >= 0) {
            this.umsfeedbackratingssource = new LocalDataSource();
            this.umsfeedbackratingssource.load(this.umsstudentfeedbackservice.umsfeedbackratings as any as LocalDataSource);
            this.umsfeedbackratingssource.setPaging(1, 20, true);
        }
    }
    umsfeedbackratingsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsstudentfeedbackservice.umsfeedbackratings.length == 0) {
                    this.tblumsfeedbackratingssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsfeedbackrating();
                    this.umsstudentfeedbackservice.umsfeedbackratings.push(obj);
                    this.umsfeedbackratingssource.refresh();
                    if ((this.umsstudentfeedbackservice.umsfeedbackratings.length / this.umsfeedbackratingssource.getPaging().perPage).toFixed(0) + 1 != this.umsfeedbackratingssource.getPaging().page) {
                        this.umsfeedbackratingssource.setPage((this.umsstudentfeedbackservice.umsfeedbackratings.length / this.umsfeedbackratingssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsfeedbackratingssource.grid.edit(this.tblumsfeedbackratingssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsfeedbackratingssource.data.indexOf(event.data);
                this.onDeleteumsfeedbackrating(event, event.data.feebackratingid, ((this.umsfeedbackratingssource.getPaging().page - 1) * this.umsfeedbackratingssource.getPaging().perPage) + index);
                this.umsfeedbackratingssource.refresh();
                break;
        }
    }
    umsfeedbackratingsPaging(val) {
        debugger;
        this.umsfeedbackratingssource.setPaging(1, val, true);
    }
    handleumsfeedbackratingsGridSelected(event) {
        this.umsfeedbackratingsselectedindex = this.umsstudentfeedbackservice.umsfeedbackratings.findIndex(i => i.feebackratingid === event.data.feebackratingid);
    }
    IsumsfeedbackratingsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsfeedbackratingsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsfeedbackratings

}



