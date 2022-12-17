import { cmsformpageService } from './../../../service/cmsformpage.service';
import { cmsformpage } from './../../../model/cmsformpage.model';
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
import { cmspagequestion } from './../../../model/cmspagequestion.model';
import { cmspagequestionComponent } from './cmspagequestion.component';
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
    selector: 'app-cmsformpage',
    templateUrl: './cmsformpage.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class cmsformpageComponent implements OnInit {
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
    bfilterPopulatecmsformpages: boolean = false;
    datacmspagequestionsanswertype3: any = [];
    bfilterPopulatecmspagequestions: boolean = false;
    @ViewChild('tblcmspagequestionssource', { static: false }) tblcmspagequestionssource: Ng2SmartTableComponent;
    cmsformpageForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedcmspagequestionIDs: string = "";
    cmspagequestionsID: string = "1";
    cmspagequestionsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private cmsformpageservice: cmsformpageService,
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
        this.cmsformpageForm = this.fb.group({
            formid: [null],
            pageid: [null],
            pagename: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.cmsformpageForm.controls; }

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
        if (this.cmsformpageForm.dirty && this.cmsformpageForm.touched) {
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
        let cmsformpage = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.pageid != null) {
            cmsformpage = this.data.pageid;
        }
        else
            cmsformpage = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = cmsformpage;
        //this.sharedService.alert(cmsformpage);
        if (cmsformpage == null) {
            this.SetcmspagequestionsTableConfig();
            setTimeout(() => {
                this.SetcmspagequestionsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(cmsformpage);
        }
        this.cmsformpageForm.markAsUntouched();
        this.cmsformpageForm.markAsPristine();
    }



    resetForm() {
        if (this.cmsformpageForm != null)
            this.cmsformpageForm.reset();
        setTimeout(() => {
            this.cmsformpageservice.cmspagequestions = [];
            this.cmspagequestionsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.cmsformpageForm.controls[key] != null) {
                    this.cmsformpageForm.patchValue(json);
                    this.cmsformpageForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let pageid = this.cmsformpageForm.get('pageid').value;
        if (pageid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.cmsformpageservice.deletecmsformpage(pageid).then((res:any) => {
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
        this.cmsformpageForm.patchValue({
            pageid: null
        });
        this.cmsformpageservice.formData.pageid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("cmsformpages", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    PopulateScreen(cmsformpage: any) {
        this.cmsformpageservice.getcmsformpagesByID(parseInt(cmsformpage)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.cmsformpageForm.patchValue({
            formid: res.cmsformpage.formid,
            pageid: res.cmsformpage.pageid,
            pagename: res.cmsformpage.pagename,
            customfield: res.cmsformpage.customfield,
            attachment: res.cmsformpage.attachment,
            status: res.cmsformpage.status,
            statusdesc: res.cmsformpage.statusdesc,
        });
        if (this.cmsformpageForm.get('customfield').value != null && this.cmsformpageForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.cmsformpageForm.get('customfield').value);
        this.FillCustomField();
        if (this.cmsformpageForm.get('attachment').value != null && this.cmsformpageForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.cmsformpageForm.get('attachment').value);
        this.cmsformpageservice.cmspagequestions = res.cmspagequestion;
        this.SetcmspagequestionsTableConfig();
        this.cmspagequestionsLoadTable();
        setTimeout(() => {
            this.SetcmspagequestionsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.cmsformpageForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.cmsformpageservice.formData = this.cmsformpageForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.cmsformpageForm.controls[key] != null) {
                    this.cmsformpageservice.formData[key] = this.cmsformpageForm.controls[key].value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.cmsformpageservice.formData.customfield = JSON.stringify(customfields);
        this.cmsformpageservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.cmsformpageservice.formData.DeletedcmspagequestionIDs = this.DeletedcmspagequestionIDs;
        console.log(this.cmsformpageservice.formData);
        this.cmsformpageservice.saveOrUpdatecmsformpages().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.cmsformpageservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.cmsformpage);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.cmsformpageForm.markAsUntouched();
                this.cmsformpageForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditcmspagequestion(event, questionid, pageid) {
        this.dialog.open(cmspagequestionComponent,
            {
                data: { questionid, pageid, ScreenType: 2, formid: this.cmsformpageForm.get('formid').value }
            }
        ).onClose.subscribe((res:any) => {
            if (questionid == null) {
                this.cmspagequestionssource.add(res);
                this.cmspagequestionssource.refresh();
            }
            else {
                this.cmspagequestionssource.update(event.data, res);
            }
        });
    }
    onDeletecmspagequestion(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedcmspagequestionIDs += childID + ",";
        this.cmsformpageservice.cmspagequestions.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes cmspagequestions
    cmspagequestionssettings: any;
    cmspagequestionssource: any;

    showcmspagequestionsCheckbox() {
        debugger;
        if (this.tblcmspagequestionssource.settings['selectMode'] == 'multi') this.tblcmspagequestionssource.settings['selectMode'] = 'single';
        else
            this.tblcmspagequestionssource.settings['selectMode'] = 'multi';
        this.tblcmspagequestionssource.initGrid();
    }
    deletecmspagequestionsAll() {
        this.tblcmspagequestionssource.settings['selectMode'] = 'single';
    }
    showcmspagequestionsFilter() {
        setTimeout(() => {
            this.SetcmspagequestionsTableddConfig();
        });
        if (this.tblcmspagequestionssource.settings != null) this.tblcmspagequestionssource.settings['hideSubHeader'] = !this.tblcmspagequestionssource.settings['hideSubHeader'];
        this.tblcmspagequestionssource.initGrid();
    }
    showcmspagequestionsInActive() {
    }
    enablecmspagequestionsInActive() {
    }
    async SetcmspagequestionsTableddConfig() {
        if (!this.bfilterPopulatecmspagequestions) {

            this.configservice.getList("answertype").then((res:any) => {
                var dataanswertype2 = res as any;
                for (let i = 0; i < dataanswertype2.length; i++) {
                    var obj = { value: dataanswertype2[i].configkey, title: dataanswertype2[i].configtext };
                    this.datacmspagequestionsanswertype3.push(obj);
                }
                var clone = this.clone(this.tblcmspagequestionssource.settings);
                clone.columns['answertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacmspagequestionsanswertype3)), }, };
                clone.columns['answertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacmspagequestionsanswertype3)), }, };
                this.tblcmspagequestionssource.settings = clone;
                this.tblcmspagequestionssource.initGrid();
            });
        }
        this.bfilterPopulatecmspagequestions = true;
    }
    async cmspagequestionsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetcmspagequestionsTableConfig() {
        this.cmspagequestionssettings = {
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
                question: {
                    title: 'question',
                    type: '',
                    filter: true,
                },
                answertype: {
                    title: 'Answer Type',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datacmspagequestionsanswertype3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
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
    cmspagequestionsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmspagequestionsID) >= 0) {
            this.cmspagequestionssource = new LocalDataSource();
            this.cmspagequestionssource.load(this.cmsformpageservice.cmspagequestions as any as LocalDataSource);
            this.cmspagequestionssource.setPaging(1, 20, true);
        }
    }
    cmspagequestionsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditcmspagequestion(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditcmspagequestion(event, event.data.questionid, this.formid);
                break;
            case 'delete':
                this.onDeletecmspagequestion(event, event.data.questionid, ((this.cmspagequestionssource.getPaging().page - 1) * this.cmspagequestionssource.getPaging().perPage) + event.index);
                this.cmspagequestionssource.refresh();
                break;
        }
    }
    cmspagequestionsonDelete(obj) {
        let questionid = obj.data.questionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.cmsformpageservice.deletecmsformpage(questionid).then((res:any) =>
                this.cmspagequestionsLoadTable()
            );
        }
    }
    cmspagequestionsPaging(val) {
        debugger;
        this.cmspagequestionssource.setPaging(1, val, true);
    }
    handlecmspagequestionsGridSelected(event) {
        this.cmspagequestionsselectedindex = this.cmsformpageservice.cmspagequestions.findIndex(i => i.questionid === event.data.questionid);
    }
    IscmspagequestionsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmspagequestionsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes cmspagequestions

}



