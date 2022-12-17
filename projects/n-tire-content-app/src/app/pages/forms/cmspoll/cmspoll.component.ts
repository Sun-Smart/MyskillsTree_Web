import { cmspollService } from './../../../service/cmspoll.service';
import { cmspoll } from './../../../model/cmspoll.model';
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
import { cmspolloption } from './../../../model/cmspolloption.model';
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
    selector: 'app-cmspoll',
    templateUrl: './cmspoll.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class cmspollComponent implements OnInit {
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
    bfilterPopulatecmspolls: boolean = false;
    bfilterPopulatecmspolloptions: boolean = false;
    @ViewChild('tblcmspolloptionssource', { static: false }) tblcmspolloptionssource: Ng2SmartTableComponent;
    cmspollForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedcmspolloptionIDs: string = "";
    cmspolloptionsID: string = "1";
    cmspolloptionsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private cmspollservice: cmspollService,
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
        this.cmspollForm = this.fb.group({
            pollid: [null],
            pollname: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.cmspollForm.controls; }

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
        if (this.cmspollForm.dirty && this.cmspollForm.touched) {
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
        let cmspoll = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.pollid != null) {
            cmspoll = this.data.pollid;
        }
        else
            cmspoll = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = cmspoll;
        //this.sharedService.alert(cmspoll);
        if (cmspoll == null) {
            this.SetcmspolloptionsTableConfig();
            setTimeout(() => {
                this.SetcmspolloptionsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(cmspoll);
        }
        this.cmspollForm.markAsUntouched();
        this.cmspollForm.markAsPristine();
    }



    resetForm() {
        if (this.cmspollForm != null)
            this.cmspollForm.reset();
        setTimeout(() => {
            this.cmspollservice.cmspolloptions = [];
            this.cmspolloptionsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.cmspollForm.controls[key] != null) {
                    this.cmspollForm.patchValue(json);
                    this.cmspollForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let pollid = this.cmspollForm.get('pollid').value;
        if (pollid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.cmspollservice.deletecmspoll(pollid).then((res:any) => {
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
        this.cmspollForm.patchValue({
            pollid: null
        });
        this.cmspollservice.formData.pollid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("cmspolls", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    PopulateScreen(cmspoll: any) {
        this.cmspollservice.getcmspollsByID(parseInt(cmspoll)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.cmspollForm.patchValue({
            pollid: res.cmspoll.pollid,
            pollname: res.cmspoll.pollname,
            customfield: res.cmspoll.customfield,
            attachment: res.cmspoll.attachment,
            status: res.cmspoll.status,
            statusdesc: res.cmspoll.statusdesc,
        });
        if (this.cmspollForm.get('customfield').value != null && this.cmspollForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.cmspollForm.get('customfield').value);
        this.FillCustomField();
        if (this.cmspollForm.get('attachment').value != null && this.cmspollForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.cmspollForm.get('attachment').value);
        this.cmspollservice.cmspolloptions = res.cmspolloption;
        this.SetcmspolloptionsTableConfig();
        this.cmspolloptionsLoadTable();
        setTimeout(() => {
            this.SetcmspolloptionsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.cmspollForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.cmspollservice.formData = this.cmspollForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.cmspollForm.controls[key] != null) {
                    this.cmspollservice.formData[key] = this.cmspollForm.controls[key].value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.cmspollservice.formData.customfield = JSON.stringify(customfields);
        this.cmspollservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.cmspollservice.formData.DeletedcmspolloptionIDs = this.DeletedcmspolloptionIDs;
        console.log(this.cmspollservice.formData);
        this.cmspollservice.saveOrUpdatecmspolls().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.cmspollservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.cmspoll);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.cmspollForm.markAsUntouched();
                this.cmspollForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    onDeletecmspolloption(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedcmspolloptionIDs += childID + ",";
        this.cmspollservice.cmspolloptions.splice(i, 1);
    }
    //start of Grid Codes cmspolloptions
    cmspolloptionssettings: any;
    cmspolloptionssource: any;

    showcmspolloptionsCheckbox() {
        debugger;
        if (this.tblcmspolloptionssource.settings['selectMode'] == 'multi') this.tblcmspolloptionssource.settings['selectMode'] = 'single';
        else
            this.tblcmspolloptionssource.settings['selectMode'] = 'multi';
        this.tblcmspolloptionssource.initGrid();
    }
    deletecmspolloptionsAll() {
        this.tblcmspolloptionssource.settings['selectMode'] = 'single';
    }
    showcmspolloptionsFilter() {
        setTimeout(() => {
            this.SetcmspolloptionsTableddConfig();
        });
        if (this.tblcmspolloptionssource.settings != null) this.tblcmspolloptionssource.settings['hideSubHeader'] = !this.tblcmspolloptionssource.settings['hideSubHeader'];
        this.tblcmspolloptionssource.initGrid();
    }
    showcmspolloptionsInActive() {
    }
    enablecmspolloptionsInActive() {
    }
    async SetcmspolloptionsTableddConfig() {
        if (!this.bfilterPopulatecmspolloptions) {
        }
        this.bfilterPopulatecmspolloptions = true;
    }
    async cmspolloptionsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetcmspolloptionsTableConfig() {
        this.cmspolloptionssettings = {
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
                polloption: {
                    title: 'polloption',
                    type: '',
                    filter: true,
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
    cmspolloptionsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmspolloptionsID) >= 0) {
            this.cmspolloptionssource = new LocalDataSource();
            this.cmspolloptionssource.load(this.cmspollservice.cmspolloptions as any as LocalDataSource);
            this.cmspolloptionssource.setPaging(1, 20, true);
        }
    }
    cmspolloptionsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.cmspollservice.cmspolloptions.length == 0) {
                    this.tblcmspolloptionssource.grid.createFormShown = true;
                }
                else {
                    let obj = new cmspolloption();
                    this.cmspollservice.cmspolloptions.push(obj);
                    this.cmspolloptionssource.refresh();
                    if ((this.cmspollservice.cmspolloptions.length / this.cmspolloptionssource.getPaging().perPage).toFixed(0) + 1 != this.cmspolloptionssource.getPaging().page) {
                        this.cmspolloptionssource.setPage((this.cmspollservice.cmspolloptions.length / this.cmspolloptionssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblcmspolloptionssource.grid.edit(this.tblcmspolloptionssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.cmspolloptionssource.data.indexOf(event.data);
                this.onDeletecmspolloption(event, event.data.polloptionid, ((this.cmspolloptionssource.getPaging().page - 1) * this.cmspolloptionssource.getPaging().perPage) + index);
                this.cmspolloptionssource.refresh();
                break;
        }
    }
    cmspolloptionsPaging(val) {
        debugger;
        this.cmspolloptionssource.setPaging(1, val, true);
    }
    handlecmspolloptionsGridSelected(event) {
        this.cmspolloptionsselectedindex = this.cmspollservice.cmspolloptions.findIndex(i => i.polloptionid === event.data.polloptionid);
    }
    IscmspolloptionsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmspolloptionsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes cmspolloptions

}



