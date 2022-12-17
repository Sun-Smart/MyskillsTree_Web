import { umsquestionService } from './../../../service/umsquestion.service';
import { umsquestion } from './../../../model/umsquestion.model';
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
import { umsquestioncategory } from './../../../model/umsquestioncategory.model';
import { umsquestioncategoryService } from './../../../service/umsquestioncategory.service';
import { umsanswer } from './../../../model/umsanswer.model';
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
    selector: 'app-umsquestion',
    templateUrl: './umsquestion.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsquestionComponent implements OnInit {
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
    bfilterPopulateumsquestions: boolean = false;
    dataumsquestionscategoryid3: any = [];
    dataumsquestionsquestiontype3: any = [];
    dataumsquestionsanswertype3: any = [];
    bfilterPopulateumsanswers: boolean = false;
    @ViewChild('tblumsanswerssource', { static: false }) tblumsanswerssource: Ng2SmartTableComponent;
    umsquestionForm: FormGroup;
    categoryidList: umsquestioncategory[];
    questiontypeList: boconfigvalue[]=[];
    answertypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedumsanswerIDs: string = "";
    umsanswersID: string = "1";
    umsanswersselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsquestionservice: umsquestionService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private umsquestioncategoryservice: umsquestioncategoryService,
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
        this.umsquestionForm = this.fb.group({
            topicid: [null],
            questionid: [null],
            categoryid: [null],
            categoryiddesc: [null],
            question: [null],
            questiontype: [null],
            questiontypedesc: [null],
            answertype: [null],
            answertypedesc: [null],
            correctanswer: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsquestionForm.controls; }

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
        if (this.umsquestionForm.dirty && this.umsquestionForm.touched) {
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
        let umsquestion = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.questionid != null) {
            umsquestion = this.data.questionid;
        }
        else
            umsquestion = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsquestion;
        //this.sharedService.alert(umsquestion);
        if (umsquestion == null) {
            this.SetumsanswersTableConfig();
            setTimeout(() => {
                this.SetumsanswersTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsquestion);
        }
        this.umsquestioncategoryservice.getumsquestioncategoriesList().then((res:any) => this.categoryidList = res as umsquestioncategory[]);
        this.configservice.getList("questiontype").then((res:any) => this.questiontypeList = res as boconfigvalue[]);
        this.configservice.getList("answertype").then((res:any) => this.answertypeList = res as boconfigvalue[]);
        this.umsquestionForm.markAsUntouched();
        this.umsquestionForm.markAsPristine();
    }



    resetForm() {
        if (this.umsquestionForm != null)
            this.umsquestionForm.reset();
        setTimeout(() => {
            this.umsquestionservice.umsanswers = [];
            this.umsanswersLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsquestionForm.controls[key] != null) {
                    this.umsquestionForm.patchValue(json);
                    this.umsquestionForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let questionid = this.umsquestionForm.get('questionid')!.value;
        if (questionid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsquestionservice.deleteumsquestion(questionid).then((res:any) => {
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
        this.umsquestionForm.patchValue({
            questionid: null
        });
        this.umsquestionservice.formData.questionid = null;
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
    categoryidonChange(evt:any) {
        let e = evt!.value;
        this.umsquestionForm.patchValue({ categoryiddesc: evt.options[evt.options.selectedIndex].text });
    }
    questiontypeonChange(evt:any) {
        let e = evt!.value;
        this.umsquestionForm.patchValue({ questiontypedesc: evt.options[evt.options.selectedIndex].text });
    }
    answertypeonChange(evt:any) {
        let e = evt!.value;
        this.umsquestionForm.patchValue({ answertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(umsquestion: any) {
        this.umsquestionservice.getumsquestionsByID(parseInt(umsquestion)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsquestionForm.patchValue({
            topicid: res.umsquestion.topicid,
            questionid: res.umsquestion.questionid,
            categoryid: res.umsquestion.categoryid,
            categoryiddesc: res.umsquestion.categoryiddesc,
            question: res.umsquestion.question,
            questiontype: res.umsquestion.questiontype,
            questiontypedesc: res.umsquestion.questiontypedesc,
            answertype: res.umsquestion.answertype,
            answertypedesc: res.umsquestion.answertypedesc,
            correctanswer: res.umsquestion.correctanswer,
            status: res.umsquestion.status,
            statusdesc: res.umsquestion.statusdesc,
        });
        this.umsquestionservice.umsanswers = res.umsanswer;
        this.SetumsanswersTableConfig();
        this.umsanswersLoadTable();
        setTimeout(() => {
            this.SetumsanswersTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsquestionForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsquestionservice.formData = this.umsquestionForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsquestionForm.controls[key] != null) {
                    this.umsquestionservice.formData[key] = this.umsquestionForm.controls[key]!.value;
                }
            }
        }
        this.umsquestionservice.formData.DeletedumsanswerIDs = this.DeletedumsanswerIDs;
        console.log(this.umsquestionservice.formData);
        this.umsquestionservice.saveOrUpdateumsquestions().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsquestionservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsquestion);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsquestionForm.markAsUntouched();
                this.umsquestionForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditcategoryid(categoryid) {
        let ScreenType = '2';
        /*this.dialog.open(umsquestioncategoryComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umsquestioncategoryservice.getumsquestioncategoriesList().then((res:any) => this.categoryidList = res as umsquestioncategory[]);
        });*/
    }

    onDeleteumsanswer(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsanswerIDs += childID + ",";
        this.umsquestionservice.umsanswers.splice(i, 1);
    }
    //start of Grid Codes umsanswers
    umsanswerssettings: any;
    umsanswerssource: any;

    showumsanswersCheckbox() {
        debugger;
        if (this.tblumsanswerssource.settings['selectMode'] == 'multi') this.tblumsanswerssource.settings['selectMode'] = 'single';
        else
            this.tblumsanswerssource.settings['selectMode'] = 'multi';
        this.tblumsanswerssource.initGrid();
    }
    deleteumsanswersAll() {
        this.tblumsanswerssource.settings['selectMode'] = 'single';
    }
    showumsanswersFilter() {
        setTimeout(() => {
            this.SetumsanswersTableddConfig();
        });
        if (this.tblumsanswerssource.settings != null) this.tblumsanswerssource.settings['hideSubHeader'] = !this.tblumsanswerssource.settings['hideSubHeader'];
        this.tblumsanswerssource.initGrid();
    }
    showumsanswersInActive() {
    }
    enableumsanswersInActive() {
    }
    async SetumsanswersTableddConfig() {
        if (!this.bfilterPopulateumsanswers) {
        }
        this.bfilterPopulateumsanswers = true;
    }
    async umsanswersbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsanswersTableConfig() {
        this.umsanswerssettings = {
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
                answer: {
                    title: 'Answer',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                sequence: {
                    title: 'sequence',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    umsanswersLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsanswersID) >= 0) {
            this.umsanswerssource = new LocalDataSource();
            this.umsanswerssource.load(this.umsquestionservice.umsanswers as any as LocalDataSource);
            this.umsanswerssource.setPaging(1, 20, true);
        }
    }
    umsanswersroute(event, action) {
        switch (action) {
            case 'create':
                if (this.umsquestionservice.umsanswers.length == 0) {
                    this.tblumsanswerssource.grid.createFormShown = true;
                }
                else {
                    let obj = new umsanswer();
                    this.umsquestionservice.umsanswers.push(obj);
                    this.umsanswerssource.refresh();
                    if ((this.umsquestionservice.umsanswers.length / this.umsanswerssource.getPaging().perPage).toFixed(0) + 1 != this.umsanswerssource.getPaging().page) {
                        this.umsanswerssource.setPage((this.umsquestionservice.umsanswers.length / this.umsanswerssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblumsanswerssource.grid.edit(this.tblumsanswerssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.umsanswerssource.data.indexOf(event.data);
                this.onDeleteumsanswer(event, event.data.answerid, ((this.umsanswerssource.getPaging().page - 1) * this.umsanswerssource.getPaging().perPage) + index);
                this.umsanswerssource.refresh();
                break;
        }
    }
    umsanswersPaging(val) {
        debugger;
        this.umsanswerssource.setPaging(1, val, true);
    }
    handleumsanswersGridSelected(event) {
        this.umsanswersselectedindex = this.umsquestionservice.umsanswers.findIndex(i => i.answerid === event.data.answerid);
    }
    IsumsanswersVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsanswersID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsanswers

}



