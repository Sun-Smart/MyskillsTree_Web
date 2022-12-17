import { umstopicmasterService } from './../../../service/umstopicmaster.service';
import { umstopicmaster } from './../../../model/umstopicmaster.model';
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
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bokbmaster } from '../../../../../../n-tire-bo-app/src/app/model/bokbmaster.model';
import { bokbmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bokbmaster.service';
import { umsquestion } from './../../../model/umsquestion.model';
import { umsquestionComponent } from '../umsquestion/umsquestion.component';
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
    selector: 'app-umstopicmaster',
    templateUrl: './umstopicmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umstopicmasterComponent implements OnInit {
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
    bfilterPopulateumstopicmasters: boolean = false;
    dataumstopicmasterskbcategory3: any = [];
    dataumstopicmasterskbsubcategory3: any = [];
    dataumstopicmasterskbid3: any = [];
    bfilterPopulateumsquestions: boolean = false;
    @ViewChild('tblumsquestionssource', { static: false }) tblumsquestionssource: Ng2SmartTableComponent;
    umstopicmasterForm: FormGroup;
    kbcategoryList: bomasterdata[];
    kbsubcategoryList: bosubcategorymaster[];
    kbidList: bokbmaster[];
    kbid_bokbmastersForm: FormGroup;
    kbid_bokbmastersoptions: any;
    kbid_bokbmastersformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedumsquestionIDs: string = "";
    umsquestionsID: string = "1";
    umsquestionsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umstopicmasterservice: umstopicmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bomasterdataservice: bomasterdataService,
        private bosubcategorymasterservice: bosubcategorymasterService,
        private bokbmasterservice: bokbmasterService,
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
        this.umstopicmasterForm = this.fb.group({
            topicid: [null],
            topiccode: [null],
            description: [null],
            hours: [null],
            kbcategory: [null],
            kbcategorydesc: [null],
            kbsubcategory: [null],
            kbsubcategorydesc: [null],
            kbid: [null],
            kbiddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umstopicmasterForm.controls; }

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
        if (this.umstopicmasterForm.dirty && this.umstopicmasterForm.touched) {
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
        let umstopicmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.topicid != null) {
            umstopicmaster = this.data.topicid;
        }
        else
            umstopicmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umstopicmaster;
        //this.sharedService.alert(umstopicmaster);
        if (umstopicmaster == null) {
            this.SetumsquestionsTableConfig();
            setTimeout(() => {
                this.SetumsquestionsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(umstopicmaster);
        }
        this.bomasterdataservice.getList("5").then((res:any) => this.kbcategoryList = res as bomasterdata[]);
        this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.kbsubcategoryList = res as bosubcategorymaster[]);
        setTimeout(() => {
            if (this.f.kbsubcategory!.value != "" && this.f.kbsubcategory!.value != null) this.bokbmasterservice.getListBykbsubcategory(this.f.kbsubcategory!.value).then((res:any) => this.kbidList = res as bokbmaster[]);
        });
        this.kbid_bokbmastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.kbidList.filter(v => v.kbsubject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.kbid_bokbmastersformatter = (result: any) => result.kbsubject;
        this.umstopicmasterForm.markAsUntouched();
        this.umstopicmasterForm.markAsPristine();
    }
    onSelectedkbid(kbidDetail: any) {
        if (kbidDetail) {
            this.umstopicmasterForm.patchValue({ kbid: kbidDetail.item.kbid });
            this.umstopicmasterForm.patchValue({ kbiddesc: kbidDetail.item.kbsubject });
            kbidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.umstopicmasterForm != null)
            this.umstopicmasterForm.reset();
        setTimeout(() => {
            this.umstopicmasterservice.umsquestions = [];
            this.umsquestionsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umstopicmasterForm.controls[key] != null) {
                    this.umstopicmasterForm.patchValue(json);
                    this.umstopicmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let topicid = this.umstopicmasterForm.get('topicid')!.value;
        if (topicid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umstopicmasterservice.deleteumstopicmaster(topicid).then((res:any) => {
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
        this.umstopicmasterForm.patchValue({
            topicid: null
        });
        this.umstopicmasterservice.formData.topicid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umstopicmasters", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    kbcategoryonChange(evt:any) {
        let e = evt!.value;
        this.umstopicmasterForm.patchValue({ kbcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    kbsubcategoryonChange(evt:any) {
        let e = evt!.value;
        this.umstopicmasterForm.patchValue({ kbsubcategorydesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.kbsubcategory!.value != "" && this.f.kbsubcategory!.value != null) this.bokbmasterservice.getListBykbsubcategory(this.f.kbsubcategory!.value).then((res:any) => this.kbidList = res as bokbmaster[]);
        });
    }
    kbidonChange(evt:any) {
        let e = evt!.value;
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
    PopulateScreen(umstopicmaster: any) {
        this.umstopicmasterservice.getumstopicmastersByID(parseInt(umstopicmaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umstopicmasterForm.patchValue({
            topicid: res.umstopicmaster.topicid,
            topiccode: res.umstopicmaster.topiccode,
            description: res.umstopicmaster.description,
            hours: res.umstopicmaster.hours,
            kbcategory: res.umstopicmaster.kbcategory,
            kbcategorydesc: res.umstopicmaster.kbcategorydesc,
            kbsubcategory: res.umstopicmaster.kbsubcategory,
            kbsubcategorydesc: res.umstopicmaster.kbsubcategorydesc,
            kbid: res.umstopicmaster.kbid,
            kbiddesc: res.umstopicmaster.kbiddesc,
            customfield: res.umstopicmaster.customfield,
            attachment: res.umstopicmaster.attachment,
            status: res.umstopicmaster.status,
            statusdesc: res.umstopicmaster.statusdesc,
        });
        if (this.umstopicmasterForm.get('customfield')!.value != null && this.umstopicmasterForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.umstopicmasterForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.umstopicmasterForm.get('attachment')!.value != null && this.umstopicmasterForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.umstopicmasterForm.get('attachment')!.value);
        setTimeout(() => {
            if (this.f.kbsubcategory!.value != "" && this.f.kbsubcategory!.value != null) this.bokbmasterservice.getListBykbsubcategory(this.f.kbsubcategory!.value).then((res:any) => this.kbidList = res as bokbmaster[]);
        });
        this.umstopicmasterservice.umsquestions = res.umsquestion;
        this.SetumsquestionsTableConfig();
        this.umsquestionsLoadTable();
        setTimeout(() => {
            this.SetumsquestionsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umstopicmasterForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umstopicmasterservice.formData = this.umstopicmasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umstopicmasterForm.controls[key] != null) {
                    this.umstopicmasterservice.formData[key] = this.umstopicmasterForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.umstopicmasterservice.formData.customfield = JSON.stringify(customfields);
        this.umstopicmasterservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.umstopicmasterservice.formData.DeletedumsquestionIDs = this.DeletedumsquestionIDs;
        console.log(this.umstopicmasterservice.formData);
        this.umstopicmasterservice.saveOrUpdateumstopicmasters().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umstopicmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umstopicmaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umstopicmasterForm.markAsUntouched();
                this.umstopicmasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditkbcategory(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.kbcategoryList = res as bomasterdata[]);
        });*/
    }

    AddOrEditkbsubcategory(subcategoryid) {
        let ScreenType = '2';
        /*this.dialog.open(bosubcategorymasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.kbsubcategoryList = res as bosubcategorymaster[]);
        });*/
    }

    AddOrEditkbid(kbid) {
        let ScreenType = '2';
        /*this.dialog.open(bokbmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bokbmasterservice.getbokbmastersList().then((res:any) => this.kbidList = res as bokbmaster[]);
        });*/
    }

    AddOrEditumsquestion(event, questionid, topicid) {
        this.dialog.open(umsquestionComponent,
            {
                data: { questionid, topicid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (questionid == null) {
                this.umsquestionssource.add(res);
                this.umsquestionssource.refresh();
            }
            else {
                this.umsquestionssource.update(event.data, res);
            }
        });
    }
    onDeleteumsquestion(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedumsquestionIDs += childID + ",";
        this.umstopicmasterservice.umsquestions.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes umsquestions
    umsquestionssettings: any;
    umsquestionssource: any;

    showumsquestionsCheckbox() {
        debugger;
        if (this.tblumsquestionssource.settings['selectMode'] == 'multi') this.tblumsquestionssource.settings['selectMode'] = 'single';
        else
            this.tblumsquestionssource.settings['selectMode'] = 'multi';
        this.tblumsquestionssource.initGrid();
    }
    deleteumsquestionsAll() {
        this.tblumsquestionssource.settings['selectMode'] = 'single';
    }
    showumsquestionsFilter() {
        setTimeout(() => {
            this.SetumsquestionsTableddConfig();
        });
        if (this.tblumsquestionssource.settings != null) this.tblumsquestionssource.settings['hideSubHeader'] = !this.tblumsquestionssource.settings['hideSubHeader'];
        this.tblumsquestionssource.initGrid();
    }
    showumsquestionsInActive() {
    }
    enableumsquestionsInActive() {
    }
    async SetumsquestionsTableddConfig() {
        if (!this.bfilterPopulateumsquestions) {
        }
        this.bfilterPopulateumsquestions = true;
    }
    async umsquestionsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetumsquestionsTableConfig() {
        this.umsquestionssettings = {
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
                categoryid: {
                    title: 'categoryid',
                    type: 'number',
                    filter: true,
                },
                question: {
                    title: 'Question',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                questiontype: {
                    title: 'Question Type',
                    type: '',
                    filter: true,
                },
                answertype: {
                    title: 'Answer Type',
                    type: '',
                    filter: true,
                },
                correctanswer: {
                    title: 'Correct Answer',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    umsquestionsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsquestionsID) >= 0) {
            this.umsquestionssource = new LocalDataSource();
            this.umsquestionssource.load(this.umstopicmasterservice.umsquestions as any as LocalDataSource);
            this.umsquestionssource.setPaging(1, 20, true);
        }
    }
    umsquestionsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditumsquestion(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditumsquestion(event, event.data.questionid, this.formid);
                break;
            case 'delete':
                this.onDeleteumsquestion(event, event.data.questionid, ((this.umsquestionssource.getPaging().page - 1) * this.umsquestionssource.getPaging().perPage) + event.index);
                this.umsquestionssource.refresh();
                break;
        }
    }
    umsquestionsonDelete(obj) {
        let questionid = obj.data.questionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.umstopicmasterservice.deleteumstopicmaster(questionid).then((res:any) =>
                this.umsquestionsLoadTable()
            );
        }
    }
    umsquestionsPaging(val) {
        debugger;
        this.umsquestionssource.setPaging(1, val, true);
    }
    handleumsquestionsGridSelected(event) {
        this.umsquestionsselectedindex = this.umstopicmasterservice.umsquestions.findIndex(i => i.questionid === event.data.questionid);
    }
    IsumsquestionsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.umsquestionsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes umsquestions

}



