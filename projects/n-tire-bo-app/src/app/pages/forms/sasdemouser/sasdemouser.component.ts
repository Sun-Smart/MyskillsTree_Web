import { sasdemouserService } from './../../../service/sasdemouser.service';
import { sasdemouser } from './../../../model/sasdemouser.model';
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
import { bocountry } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
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
    selector: 'app-sasdemouser',
    templateUrl: './sasdemouser.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class sasdemouserComponent implements OnInit {
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
    bfilterPopulatesasdemousers: boolean = false;
    datasasdemouserscountryid3: any = [];
    sasdemouserForm: FormGroup;
    countryidList: bocountry[];
    countryid_bocountriesForm: FormGroup;
    countryid_bocountriesoptions: any;
    countryid_bocountriesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sasdemouserservice: sasdemouserService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bocountryservice: bocountryService,
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
        this.sasdemouserForm = this.fb.group({
            registrationid: [null],
            companyname: [null],
            url: [null],
            username: [null],
            password: [null],
            firstname: [null],
            lastname: [null],
            emailaddress: [null],
            countryid: [null],
            countryiddesc: [null],
            phonenumber: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.sasdemouserForm.controls; }

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
        if (this.sasdemouserForm.dirty && this.sasdemouserForm.touched) {
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
        let sasdemouser = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.registrationid != null) {
            sasdemouser = this.data.registrationid;
        }
        else
            sasdemouser = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = sasdemouser;
        //this.sharedService.alert(sasdemouser);
        if (sasdemouser == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(sasdemouser);
        }
        this.bocountryservice.getbocountriesList().then((res:any) => this.countryidList = res as bocountry[]);
        this.countryid_bocountriesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.countryid_bocountriesformatter = (result: any) => result.name;
        this.sasdemouserForm.markAsUntouched();
        this.sasdemouserForm.markAsPristine();
    }
    onSelectedcountryid(countryidDetail: any) {
        if (countryidDetail) {
            this.sasdemouserForm.patchValue({ countryid: countryidDetail.item.countryid });
            this.sasdemouserForm.patchValue({ countryiddesc: countryidDetail.item.name });
            countryidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.sasdemouserForm != null)
            this.sasdemouserForm.reset();
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.sasdemouserForm.controls[key] != null) {
                    this.sasdemouserForm.patchValue(json);
                    this.sasdemouserForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let registrationid = this.sasdemouserForm.get('registrationid').value;
        if (registrationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.sasdemouserservice.deletesasdemouser(registrationid).then((res:any) => {
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
        this.sasdemouserForm.patchValue({
            registrationid: null
        });
        this.sasdemouserservice.formData.registrationid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("sasdemousers", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    countryidonChange(evt:any) {
        let e = evt.value;
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
    PopulateScreen(sasdemouser: any) {
        this.sasdemouserservice.getsasdemousersByID(parseInt(sasdemouser)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.sasdemouserForm.patchValue({
            registrationid: res.sasdemouser.registrationid,
            companyname: res.sasdemouser.companyname,
            url: res.sasdemouser.url,
            username: res.sasdemouser.username,
            password: res.sasdemouser.password,
            firstname: res.sasdemouser.firstname,
            lastname: res.sasdemouser.lastname,
            emailaddress: res.sasdemouser.emailaddress,
            countryid: res.sasdemouser.countryid,
            countryiddesc: res.sasdemouser.countryiddesc,
            phonenumber: res.sasdemouser.phonenumber,
            customfield: res.sasdemouser.customfield,
            attachment: res.sasdemouser.attachment,
            status: res.sasdemouser.status,
            statusdesc: res.sasdemouser.statusdesc,
        });
        if (this.sasdemouserForm.get('customfield').value != null && this.sasdemouserForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.sasdemouserForm.get('customfield').value);
        this.FillCustomField();
        if (this.sasdemouserForm.get('attachment').value != null && this.sasdemouserForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.sasdemouserForm.get('attachment').value);
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.sasdemouserForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.sasdemouserservice.formData = this.sasdemouserForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.sasdemouserForm.controls[key] != null) {
                    this.sasdemouserservice.formData[key] = this.sasdemouserForm.controls[key].value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.sasdemouserservice.formData.customfield = JSON.stringify(customfields);
        this.sasdemouserservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.sasdemouserservice.formData);
        this.sasdemouserservice.saveOrUpdatesasdemousers().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.sasdemouserservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.sasdemouser);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.sasdemouserForm.markAsUntouched();
                this.sasdemouserForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditcountryid(countryid) {
        let ScreenType = '2';
        /*this.dialog.open(bocountryComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bocountryservice.getbocountriesList().then((res:any) => this.countryidList = res as bocountry[]);
        });*/
    }


}



