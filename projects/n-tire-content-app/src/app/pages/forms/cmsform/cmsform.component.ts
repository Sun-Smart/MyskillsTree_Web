import { cmsformService } from './../../../service/cmsform.service';
import { cmsform } from './../../../model/cmsform.model';
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
import { cmsformpage } from './../../../model/cmsformpage.model';
import { cmsformpageComponent } from '../cmsformpage/cmsformpage.component';
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
    selector: 'app-cmsform',
    templateUrl: './cmsform.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class cmsformComponent implements OnInit {
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
    bfilterPopulatecmsforms: boolean = false;
    bfilterPopulatecmsformpages: boolean = false;
    @ViewChild('tblcmsformpagessource', { static: false }) tblcmsformpagessource: Ng2SmartTableComponent;
    cmsformForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedcmsformpageIDs: string = "";
    cmsformpagesID: string = "1";
    cmsformpagesselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private cmsformservice: cmsformService,
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
        this.cmsformForm = this.fb.group({
            formid: [null],
            formname: [null],
            introduction: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.cmsformForm.controls; }

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
        if (this.cmsformForm.dirty && this.cmsformForm.touched) {
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
        let cmsform = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.formid != null) {
            cmsform = this.data.formid;
        }
        else
            cmsform = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = cmsform;
        //this.sharedService.alert(cmsform);
        if (cmsform == null) {
            this.SetcmsformpagesTableConfig();
            setTimeout(() => {
                this.SetcmsformpagesTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(cmsform);
        }
        this.cmsformForm.markAsUntouched();
        this.cmsformForm.markAsPristine();
    }



    resetForm() {
        if (this.cmsformForm != null)
            this.cmsformForm.reset();
        setTimeout(() => {
            this.cmsformservice.cmsformpages = [];
            this.cmsformpagesLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.cmsformForm.controls[key] != null) {
                    this.cmsformForm.patchValue(json);
                    this.cmsformForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let formid = this.cmsformForm.get('formid').value;
        if (formid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.cmsformservice.deletecmsform(formid).then((res:any) => {
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
        this.cmsformForm.patchValue({
            formid: null
        });
        this.cmsformservice.formData.formid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("cmsforms", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    PopulateScreen(cmsform: any) {
        this.cmsformservice.getcmsformsByID(parseInt(cmsform)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.cmsformForm.patchValue({
            formid: res.cmsform.formid,
            formname: res.cmsform.formname,
            introduction: res.cmsform.introduction,
            customfield: res.cmsform.customfield,
            attachment: res.cmsform.attachment,
            status: res.cmsform.status,
            statusdesc: res.cmsform.statusdesc,
        });
        if (this.cmsformForm.get('customfield').value != null && this.cmsformForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.cmsformForm.get('customfield').value);
        this.FillCustomField();
        if (this.cmsformForm.get('attachment').value != null && this.cmsformForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.cmsformForm.get('attachment').value);
        this.cmsformservice.cmsformpages = res.cmsformpage;
        this.SetcmsformpagesTableConfig();
        this.cmsformpagesLoadTable();
        setTimeout(() => {
            this.SetcmsformpagesTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.cmsformForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.cmsformservice.formData = this.cmsformForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.cmsformForm.controls[key] != null) {
                    this.cmsformservice.formData[key] = this.cmsformForm.controls[key].value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.cmsformservice.formData.customfield = JSON.stringify(customfields);
        this.cmsformservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.cmsformservice.formData.DeletedcmsformpageIDs = this.DeletedcmsformpageIDs;
        console.log(this.cmsformservice.formData);
        this.cmsformservice.saveOrUpdatecmsforms().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.cmsformservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.cmsform);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.cmsformForm.markAsUntouched();
                this.cmsformForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditcmsformpage(event, pageid, formid) {
        this.dialog.open(cmsformpageComponent,
            {
                data: { pageid, formid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (pageid == null) {
                this.cmsformpagessource.add(res);
                this.cmsformpagessource.refresh();
            }
            else {
                this.cmsformpagessource.update(event.data, res);
            }
        });
    }
    onDeletecmsformpage(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedcmsformpageIDs += childID + ",";
        this.cmsformservice.cmsformpages.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes cmsformpages
    cmsformpagessettings: any;
    cmsformpagessource: any;

    showcmsformpagesCheckbox() {
        debugger;
        if (this.tblcmsformpagessource.settings['selectMode'] == 'multi') this.tblcmsformpagessource.settings['selectMode'] = 'single';
        else
            this.tblcmsformpagessource.settings['selectMode'] = 'multi';
        this.tblcmsformpagessource.initGrid();
    }
    deletecmsformpagesAll() {
        this.tblcmsformpagessource.settings['selectMode'] = 'single';
    }
    showcmsformpagesFilter() {
        setTimeout(() => {
            this.SetcmsformpagesTableddConfig();
        });
        if (this.tblcmsformpagessource.settings != null) this.tblcmsformpagessource.settings['hideSubHeader'] = !this.tblcmsformpagessource.settings['hideSubHeader'];
        this.tblcmsformpagessource.initGrid();
    }
    showcmsformpagesInActive() {
    }
    enablecmsformpagesInActive() {
    }
    async SetcmsformpagesTableddConfig() {
        if (!this.bfilterPopulatecmsformpages) {
        }
        this.bfilterPopulatecmsformpages = true;
    }
    async cmsformpagesbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetcmsformpagesTableConfig() {
        this.cmsformpagessettings = {
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
                pagename: {
                    title: 'pagename',
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
    cmsformpagesLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmsformpagesID) >= 0) {
            this.cmsformpagessource = new LocalDataSource();
            this.cmsformpagessource.load(this.cmsformservice.cmsformpages as any as LocalDataSource);
            this.cmsformpagessource.setPaging(1, 20, true);
        }
    }
    cmsformpagesroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditcmsformpage(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditcmsformpage(event, event.data.pageid, this.formid);
                break;
            case 'delete':
                this.onDeletecmsformpage(event, event.data.pageid, ((this.cmsformpagessource.getPaging().page - 1) * this.cmsformpagessource.getPaging().perPage) + event.index);
                this.cmsformpagessource.refresh();
                break;
        }
    }
    cmsformpagesonDelete(obj) {
        let pageid = obj.data.pageid;
        if (confirm('Are you sure to delete this record ?')) {
            this.cmsformservice.deletecmsform(pageid).then((res:any) =>
                this.cmsformpagesLoadTable()
            );
        }
    }
    cmsformpagesPaging(val) {
        debugger;
        this.cmsformpagessource.setPaging(1, val, true);
    }
    handlecmsformpagesGridSelected(event) {
        this.cmsformpagesselectedindex = this.cmsformservice.cmsformpages.findIndex(i => i.pageid === event.data.pageid);
    }
    IscmsformpagesVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.cmsformpagesID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes cmsformpages

}



