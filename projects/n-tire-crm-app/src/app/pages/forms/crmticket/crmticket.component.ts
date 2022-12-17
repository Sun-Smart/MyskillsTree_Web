import { crmticketService } from './../../../service/crmticket.service';
import { crmticket } from './../../../model/crmticket.model';
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
import { crmcustomermaster } from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { crmticketdetail } from './../../../model/crmticketdetail.model';
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { crmticketdetailComponent } from './crmticketdetail.component';
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
    selector: 'app-crmticket',
    templateUrl: './crmticket.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class crmticketComponent implements OnInit {
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
    bfilterPopulatecrmtickets: boolean = false;
    datacrmticketscustomerid3: any = [];
    datacrmticketstickettype3: any = [];
    datacrmticketscriticality3: any = [];
    datacrmticketssource3: any = [];
    datacrmticketsrca3: any = [];
    datacrmticketdetailsassignedtype3: any = [];
    datacrmticketdetailsassigneduser3: any = [];
    datacrmticketdetailsassignedrole3: any = [];
    datacrmticketdetailsactionuser3: any = [];
    bfilterPopulatecrmticketdetails: boolean = false;
    @ViewChild('tblcrmticketdetailssource', { static: false }) tblcrmticketdetailssource: Ng2SmartTableComponent;
    crmticketForm: FormGroup;
    customeridList: crmcustomermaster[];
    customerid_crmcustomermastersForm: FormGroup;
    customerid_crmcustomermastersoptions: any;
    customerid_crmcustomermastersformatter: any;
    tickettypeList: boconfigvalue[]=[];
    criticalityList: boconfigvalue[]=[];
    sourceList: boconfigvalue[]=[];
    rcaList: bomasterdata[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedcrmticketdetailIDs: string = "";
    crmticketdetailsID: string = "1";
    crmticketdetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private crmticketservice: crmticketService,
        private bousermasterservice: bousermasterService,
        private bouserrolemasterservice: bouserrolemasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private crmcustomermasterservice: crmcustomermasterService,
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
        this.crmticketForm = this.fb.group({
            ticketid: [null],
            ticketreference: [null],
            customerid: [null],
            customeriddesc: [null],
            accountnumber: [null],
            tickettype: [null],
            tickettypedesc: [null],
            criticality: [null],
            criticalitydesc: [null],
            source: [null],
            sourcedesc: [null],
            category: [null],
            subject: [null],
            ticketdetails: [null],
            rca: [null],
            rcadesc: [null],
            observation: [null],
            rcacompletedon: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmticketForm.controls; }

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
        if (this.crmticketForm.dirty && this.crmticketForm.touched) {
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
        let crmticket = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.ticketid != null) {
            crmticket = this.data.ticketid;
        }
        else
            crmticket = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = crmticket;
        //this.sharedService.alert(crmticket);
        if (crmticket == null) {
            this.SetcrmticketdetailsTableConfig();
            setTimeout(() => {
                this.SetcrmticketdetailsTableddConfig();
            });
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(crmticket);
        }
        this.crmcustomermasterservice.getcrmcustomermastersList().then((res:any) => this.customeridList = res as crmcustomermaster[]);
        this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
        this.configservice.getList("tickettype").then((res:any) => this.tickettypeList = res as boconfigvalue[]);
        this.configservice.getList("criticality").then((res:any) => this.criticalityList = res as boconfigvalue[]);
        this.configservice.getList("leadsource").then((res:any) => this.sourceList = res as boconfigvalue[]);
        this.bomasterdataservice.getList("42").then((res:any) => this.rcaList = res as bomasterdata[]);
        this.crmticketForm.markAsUntouched();
        this.crmticketForm.markAsPristine();
    }
    onSelectedcustomerid(customeridDetail: any) {
        if (customeridDetail) {
            this.crmticketForm.patchValue({ customerid: customeridDetail.item.customerid });
            this.crmticketForm.patchValue({ customeriddesc: customeridDetail.item.lastname });
            customeridDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.crmticketForm != null)
            this.crmticketForm.reset();
        setTimeout(() => {
            this.crmticketservice.crmticketdetails = [];
            this.crmticketdetailsLoadTable();
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.crmticketForm.controls[key] != null) {
                    this.crmticketForm.patchValue(json);
                    this.crmticketForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let ticketid = this.crmticketForm.get('ticketid').value;
        if (ticketid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmticketservice.deletecrmticket(ticketid).then((res:any) => {
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
        this.crmticketForm.patchValue({
            ticketid: null
        });
        this.crmticketservice.formData.ticketid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("crmtickets", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    customeridonChange(evt:any) {
        let e = evt.value;
    }
    tickettypeonChange(evt:any) {
        let e = evt.value;
        this.crmticketForm.patchValue({ tickettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    criticalityonChange(evt:any) {
        let e = evt.value;
        this.crmticketForm.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    sourceonChange(evt:any) {
        let e = evt.value;
        this.crmticketForm.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    rcaonChange(evt:any) {
        let e = evt.value;
        this.crmticketForm.patchValue({ rcadesc: evt.options[evt.options.selectedIndex].text });
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
    PopulateScreen(crmticket: any) {
        this.crmticketservice.getcrmticketsByID(parseInt(crmticket)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmticketForm.patchValue({
            ticketid: res.crmticket.ticketid,
            ticketreference: res.crmticket.ticketreference,
            customerid: res.crmticket.customerid,
            customeriddesc: res.crmticket.customeriddesc,
            accountnumber: res.crmticket.accountnumber,
            tickettype: res.crmticket.tickettype,
            tickettypedesc: res.crmticket.tickettypedesc,
            criticality: res.crmticket.criticality,
            criticalitydesc: res.crmticket.criticalitydesc,
            source: res.crmticket.source,
            sourcedesc: res.crmticket.sourcedesc,
            category: res.crmticket.category,
            subject: res.crmticket.subject,
            ticketdetails: res.crmticket.ticketdetails,
            rca: res.crmticket.rca,
            rcadesc: res.crmticket.rcadesc,
            observation: res.crmticket.observation,
            rcacompletedon: this.ngbDateParserFormatter.parse(res.crmticket.rcacompletedon),
            customfield: res.crmticket.customfield,
            attachment: res.crmticket.attachment,
            status: res.crmticket.status,
            statusdesc: res.crmticket.statusdesc,
        });
        if (this.crmticketForm.get('customfield').value != null && this.crmticketForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.crmticketForm.get('customfield').value);
        this.FillCustomField();
        if (this.crmticketForm.get('attachment').value != null && this.crmticketForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.crmticketForm.get('attachment').value);
        this.crmticketservice.crmticketdetails = res.crmticketdetail;
        this.SetcrmticketdetailsTableConfig();
        this.crmticketdetailsLoadTable();
        setTimeout(() => {
            this.SetcrmticketdetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.crmticketForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.crmticketservice.formData = this.crmticketForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.crmticketForm.controls[key] != null) {
                    this.crmticketservice.formData[key] = this.crmticketForm.controls[key].value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.crmticketservice.formData.rcacompletedon = new Date(this.ngbDateParserFormatter.format(this.crmticketForm.get('rcacompletedon').value));
        this.crmticketservice.formData.customfield = JSON.stringify(customfields);
        this.crmticketservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.crmticketservice.formData.DeletedcrmticketdetailIDs = this.DeletedcrmticketdetailIDs;
        console.log(this.crmticketservice.formData);
        this.crmticketservice.saveOrUpdatecrmtickets().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.crmticketservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.crmticket);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmticketForm.markAsUntouched();
                this.crmticketForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditcustomerid(customerid) {
        let ScreenType = '2';
        /*this.dialog.open(crmcustomermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.crmcustomermasterservice.getcrmcustomermastersList().then((res:any) => this.customeridList = res as crmcustomermaster[]);
        });*/
    }

    AddOrEditrca(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.rcaList = res as bomasterdata[]);
        });*/
    }

    AddOrEditcrmticketdetail(event, ticketdetailid, ticketid) {
        this.dialog.open(crmticketdetailComponent,
            {
                data: { ticketdetailid, ticketid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (ticketdetailid == null) {
                this.crmticketdetailssource.add(res);
                this.crmticketdetailssource.refresh();
            }
            else {
                this.crmticketdetailssource.update(event.data, res);
            }
        });
    }
    onDeletecrmticketdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedcrmticketdetailIDs += childID + ",";
        this.crmticketservice.crmticketdetails.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes crmticketdetails
    crmticketdetailssettings: any;
    crmticketdetailssource: any;

    showcrmticketdetailsCheckbox() {
        debugger;
        if (this.tblcrmticketdetailssource.settings['selectMode'] == 'multi') this.tblcrmticketdetailssource.settings['selectMode'] = 'single';
        else
            this.tblcrmticketdetailssource.settings['selectMode'] = 'multi';
        this.tblcrmticketdetailssource.initGrid();
    }
    deletecrmticketdetailsAll() {
        this.tblcrmticketdetailssource.settings['selectMode'] = 'single';
    }
    showcrmticketdetailsFilter() {
        setTimeout(() => {
            this.SetcrmticketdetailsTableddConfig();
        });
        if (this.tblcrmticketdetailssource.settings != null) this.tblcrmticketdetailssource.settings['hideSubHeader'] = !this.tblcrmticketdetailssource.settings['hideSubHeader'];
        this.tblcrmticketdetailssource.initGrid();
    }
    showcrmticketdetailsInActive() {
    }
    enablecrmticketdetailsInActive() {
    }
    async SetcrmticketdetailsTableddConfig() {
        if (!this.bfilterPopulatecrmticketdetails) {

            this.configservice.getList("assignedtype").then((res:any) => {
                var dataassignedtype2 = res as any;
                for (let i = 0; i < dataassignedtype2.length; i++) {
                    var obj = { value: dataassignedtype2[i].configkey, title: dataassignedtype2[i].configtext };
                    this.datacrmticketdetailsassignedtype3.push(obj);
                }
                var clone = this.clone(this.tblcrmticketdetailssource.settings);
                clone.columns['assignedtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassignedtype3)), }, };
                clone.columns['assignedtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassignedtype3)), }, };
                this.tblcrmticketdetailssource.settings = clone;
                this.tblcrmticketdetailssource.initGrid();
            });

            this.bousermasterservice.getbousermastersList().then((res:any) => {
                var dataassigneduser2 = res as any;
                for (let i = 0; i < dataassigneduser2.length; i++) {
                    var obj = { value: dataassigneduser2[i].userid, title: dataassigneduser2[i].username };
                    this.datacrmticketdetailsassigneduser3.push(obj);
                }
                var clone = this.clone(this.tblcrmticketdetailssource.settings);
                clone.columns['assigneduser'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassigneduser3)), }, };
                clone.columns['assigneduser'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassigneduser3)), }, };
                this.tblcrmticketdetailssource.settings = clone;
                this.tblcrmticketdetailssource.initGrid();
            });

            this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => {
                var dataassignedrole2 = res as any;
                for (let i = 0; i < dataassignedrole2.length; i++) {
                    var obj = { value: dataassignedrole2[i].userroleid, title: dataassignedrole2[i].userrole };
                    this.datacrmticketdetailsassignedrole3.push(obj);
                }
                var clone = this.clone(this.tblcrmticketdetailssource.settings);
                clone.columns['assignedrole'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassignedrole3)), }, };
                clone.columns['assignedrole'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsassignedrole3)), }, };
                this.tblcrmticketdetailssource.settings = clone;
                this.tblcrmticketdetailssource.initGrid();
            });

            this.bousermasterservice.getbousermastersList().then((res:any) => {
                var dataactionuser2 = res as any;
                for (let i = 0; i < dataactionuser2.length; i++) {
                    var obj = { value: dataactionuser2[i].userid, title: dataactionuser2[i].username };
                    this.datacrmticketdetailsactionuser3.push(obj);
                }
                var clone = this.clone(this.tblcrmticketdetailssource.settings);
                clone.columns['actionuser'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsactionuser3)), }, };
                clone.columns['actionuser'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datacrmticketdetailsactionuser3)), }, };
                this.tblcrmticketdetailssource.settings = clone;
                this.tblcrmticketdetailssource.initGrid();
            });
        }
        this.bfilterPopulatecrmticketdetails = true;
    }
    async crmticketdetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetcrmticketdetailsTableConfig() {
        this.crmticketdetailssettings = {
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
                orderno: {
                    title: 'orderno',
                    type: 'number',
                    filter: true,
                },
                assignedtype: {
                    title: 'Assigned Type',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datacrmticketdetailsassignedtype3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                assigneduser: {
                    title: 'Assigned User',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datacrmticketdetailsassigneduser3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                assignedrole: {
                    title: 'Assigned Role',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datacrmticketdetailsassignedrole3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                actionuser: {
                    title: 'Action User',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datacrmticketdetailsactionuser3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                assigneddate: {
                    title: 'assigneddate',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                actiondate: {
                    title: 'actiondate',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                tatends: {
                    title: 'tatends',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                actionremarks: {
                    title: 'actionremarks',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
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
    crmticketdetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.crmticketdetailsID) >= 0) {
            this.crmticketdetailssource = new LocalDataSource();
            this.crmticketdetailssource.load(this.crmticketservice.crmticketdetails as any as LocalDataSource);
            this.crmticketdetailssource.setPaging(1, 20, true);
        }
    }
    crmticketdetailsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditcrmticketdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditcrmticketdetail(event, event.data.ticketdetailid, this.formid);
                break;
            case 'delete':
                this.onDeletecrmticketdetail(event, event.data.ticketdetailid, ((this.crmticketdetailssource.getPaging().page - 1) * this.crmticketdetailssource.getPaging().perPage) + event.index);
                this.crmticketdetailssource.refresh();
                break;
        }
    }
    crmticketdetailsonDelete(obj) {
        let ticketdetailid = obj.data.ticketdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmticketservice.deletecrmticket(ticketdetailid).then((res:any) =>
                this.crmticketdetailsLoadTable()
            );
        }
    }
    crmticketdetailsPaging(val) {
        debugger;
        this.crmticketdetailssource.setPaging(1, val, true);
    }
    handlecrmticketdetailsGridSelected(event) {
        this.crmticketdetailsselectedindex = this.crmticketservice.crmticketdetails.findIndex(i => i.ticketdetailid === event.data.ticketdetailid);
    }
    IscrmticketdetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.crmticketdetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes crmticketdetails

}



