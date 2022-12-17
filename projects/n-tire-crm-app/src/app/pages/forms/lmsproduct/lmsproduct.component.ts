import { lmsproductService } from './../../../service/lmsproduct.service';
import { lmsproduct } from './../../../model/lmsproduct.model';
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
import { lmsmaster } from './../../../model/lmsmaster.model';
import { lmsmasterService } from './../../../service/lmsmaster.service';
import { lmsproductmaster } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmscampaignmaster } from './../../../model/lmscampaignmaster.model';
import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { lmspending } from './../../../model/lmspending.model';
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmssecondarycontact } from './../../../model/lmssecondarycontact.model';
import { lmscorporatesecondarycontact, IlmscorporatesecondarycontactResponse } from './../../../model/lmscorporatesecondarycontact.model';
import { lmscorporatesecondarycontactService } from './../../../service/lmscorporatesecondarycontact.service';
import { bobranchmaster, IbobranchmasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { bobranchlocation, IbobranchlocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
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
    selector: 'app-lmsproduct',
    templateUrl: './lmsproduct.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmsproductComponent implements OnInit {
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
    bfilterPopulatelmsproducts: boolean = false;
    datalmsproductsleadid3: any = [];
    datalmsproductsproductid3: any = [];
    datalmsproductscampaignid3: any = [];
    datalmsproductssource3: any = [];
    datalmsproductsleadby3: any = [];
    bfilterPopulatelmspendings: boolean = false;
    bfilterPopulatelmsreminders: boolean = false;
    datalmssecondarycontactssecondarycontactid3: any = [];
    datalmssecondarycontactscampaignid3: any = [];
    datalmssecondarycontactsbranchid3: any = [];
    datalmssecondarycontactsbranchlocationid3: any = [];
    bfilterPopulatelmssecondarycontacts: boolean = false;
    @ViewChild('tbllmspendingssource', { static: false }) tbllmspendingssource: Ng2SmartTableComponent;
    @ViewChild('tbllmsreminderssource', { static: false }) tbllmsreminderssource: Ng2SmartTableComponent;
    @ViewChild('tbllmssecondarycontactssource', { static: false }) tbllmssecondarycontactssource: Ng2SmartTableComponent;
    lmsproductForm: FormGroup;
    leadidList: lmsmaster[];
    productidList: lmsproductmaster[];
    campaignidList: lmscampaignmaster[];
    sourceList: boconfigvalue[]=[];
    leadbyList: bousermaster[];
    leadby_bousermastersForm: FormGroup;
    leadby_bousermastersoptions: any;
    leadby_bousermastersformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    SESSIONUSERID: any;
    sessiondata: any;
    DeletedlmspendingIDs: string = "";
    lmspendingsID: string = "1";
    lmspendingsselectedindex: any;
    DeletedlmsreminderIDs: string = "";
    lmsremindersID: string = "2";
    lmsremindersselectedindex: any;
    DeletedlmssecondarycontactIDs: string = "";
    lmssecondarycontactsID: string = "3";
    lmssecondarycontactsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmsproductservice: lmsproductService,
        private lmscorporatesecondarycontactservice: lmscorporatesecondarycontactService,
        private lmsproductmasterservice: lmsproductmasterService,
        private bobranchmasterservice: bobranchmasterService,
        private bobranchlocationservice: bobranchlocationService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private lmsmasterservice: lmsmasterService,
        private lmscampaignmasterservice: lmscampaignmasterService,
        private bousermasterservice: bousermasterService,
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
        this.lmsproductForm = this.fb.group({
            branchid: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigniddesc: [null],
            source: [null],
            sourcedesc: [null],
            leadby: [null],
            leadbydesc: [null],
            creationdate: [null],
            genericcustomfield: [null],
            productcustomfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsproductForm.controls; }

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
        if (this.lmsproductForm.dirty && this.lmsproductForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        debugger;
        let lmsproduct = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.opportunityid != null) {
            lmsproduct = this.data.opportunityid;
        }
        else
            lmsproduct = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = lmsproduct;
        //this.sharedService.alert(lmsproduct);
        if (lmsproduct == null) {
            this.SetlmspendingsTableConfig();
            setTimeout(() => {
                this.SetlmspendingsTableddConfig();
            });
            this.SetlmsremindersTableConfig();
            setTimeout(() => {
                this.SetlmsremindersTableddConfig();
            });
            this.SetlmssecondarycontactsTableConfig();
            setTimeout(() => {
                this.SetlmssecondarycontactsTableddConfig();
            });
            this.resetForm();
        }
        else {
            await this.PopulateScreen(lmsproduct);
        }
        this.lmsmasterservice.getlmsmastersList().then((res:any) => {
            this.leadidList = res as lmsmaster[];
        }
        );
        this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
            this.productidList = res as lmsproductmaster[];
        }
        );
        this.lmscampaignmasterservice.getlmscampaignmastersList().then((res:any) => {
            this.campaignidList = res as lmscampaignmaster[];
        }
        );
        this.configservice.getList("leadsource").then((res:any) => this.sourceList = res as boconfigvalue[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => {
            this.leadbyList = res as bousermaster[];
        }
        );
        this.leadby_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.leadbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.leadby_bousermastersformatter = (result: any) => result.username;
        this.lmsproductForm.markAsUntouched();
        this.lmsproductForm.markAsPristine();
    }
    onSelectedleadby(leadbyDetail: any) {
        if (leadbyDetail) {
            this.lmsproductForm.patchValue({ leadby: leadbyDetail.item.userid });
            this.lmsproductForm.patchValue({ leadbydesc: leadbyDetail.item.username });
            leadbyDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.lmsproductForm != null)
            this.lmsproductForm.reset();
        this.lmsproductForm.patchValue({
            leadby: this.sessiondata.userid,
            leadbydesc: this.sessiondata.username,
        });
        setTimeout(() => {
            this.lmsproductservice.lmspendings = [];
            this.lmspendingsLoadTable();
            this.lmsproductservice.lmsreminders = [];
            this.lmsremindersLoadTable();
            this.lmsproductservice.lmssecondarycontacts = [];
            this.lmssecondarycontactsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": ' + this.data[key] + ' }');
                if (this.lmsproductForm.controls[key] != null) {
                    this.lmsproductForm.patchValue(json);
                    this.lmsproductForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let opportunityid = this.lmsproductForm.get('opportunityid').value;
        if (opportunityid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsproductservice.deletelmsproduct(opportunityid).then((res:any) => {
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
        this.lmsproductForm.patchValue({
            opportunityid: null
        });
        if (this.lmsproductservice.formData.opportunityid != null) this.lmsproductservice.formData.opportunityid = null;
        for (let i = 0; i < this.lmsproductservice.lmspendings.length; i++) {
            this.lmsproductservice.lmspendings[i].callid = null;
        }
        for (let i = 0; i < this.lmsproductservice.lmsreminders.length; i++) {
            this.lmsproductservice.lmsreminders[i].reminderid = null;
        }
        for (let i = 0; i < this.lmsproductservice.lmssecondarycontacts.length; i++) {
            this.lmsproductservice.lmssecondarycontacts[i].secondarycontactid = null;
        }
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
    leadidonChange(evt:any) {
        let e = evt.value;
        this.lmsproductForm.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    productidonChange(evt:any) {
        let e = evt.value;
        this.lmsproductForm.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignidonChange(evt:any) {
        let e = evt.value;
        this.lmsproductForm.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    sourceonChange(evt:any) {
        let e = evt.value;
        this.lmsproductForm.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    leadbyonChange(evt:any) {
        let e = evt.value;
    }
    async PopulateScreen(lmsproduct: any) {
        this.lmsproductservice.getlmsproductsByID(parseInt(lmsproduct)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsproductForm.patchValue({
            branchid: res.lmsproduct.branchid,
            leadid: res.lmsproduct.leadid,
            leadiddesc: res.lmsproduct.leadiddesc,
            opportunityid: res.lmsproduct.opportunityid,
            productid: res.lmsproduct.productid,
            productiddesc: res.lmsproduct.productiddesc,
            campaignid: res.lmsproduct.campaignid,
            campaigniddesc: res.lmsproduct.campaigniddesc,
            source: res.lmsproduct.source,
            sourcedesc: res.lmsproduct.sourcedesc,
            leadby: res.lmsproduct.leadby,
            leadbydesc: res.lmsproduct.leadbydesc,
            creationdate: this.ngbDateParserFormatter.parse(res.lmsproduct.creationdate),
            genericcustomfield: res.lmsproduct.genericcustomfield,
            productcustomfield: res.lmsproduct.productcustomfield,
            status: res.lmsproduct.status,
            statusdesc: res.lmsproduct.statusdesc,
        });
        this.lmsproductservice.lmspendings = res.lmspending;
        this.SetlmspendingsTableConfig();
        this.lmspendingsLoadTable();
        setTimeout(() => {
            this.SetlmspendingsTableddConfig();
        });
        this.lmsproductservice.lmsreminders = res.lmsreminder;
        this.SetlmsremindersTableConfig();
        this.lmsremindersLoadTable();
        setTimeout(() => {
            this.SetlmsremindersTableddConfig();
        });
        this.lmsproductservice.lmssecondarycontacts = res.lmssecondarycontact;
        this.SetlmssecondarycontactsTableConfig();
        this.lmssecondarycontactsLoadTable();
        setTimeout(() => {
            this.SetlmssecondarycontactsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.lmsproductForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.lmsproductservice.formData = this.lmsproductForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.lmsproductForm.controls[key] != null) {
                    this.lmsproductservice.formData[key] = this.lmsproductForm.controls[key].value;
                }
            }
        }
        this.lmsproductservice.formData.creationdate = new Date(this.ngbDateParserFormatter.format(this.lmsproductForm.get('creationdate').value) + '  UTC');
        this.lmsproductservice.formData.DeletedlmspendingIDs = this.DeletedlmspendingIDs;
        this.lmsproductservice.formData.DeletedlmsreminderIDs = this.DeletedlmsreminderIDs;
        this.lmsproductservice.formData.DeletedlmssecondarycontactIDs = this.DeletedlmssecondarycontactIDs;
        console.log(this.lmsproductservice.formData);
        this.lmsproductservice.saveOrUpdatelmsproducts().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.lmsproductservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.lmsproduct);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsproductForm.markAsUntouched();
                this.lmsproductForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditleadid(leadid) {
        let ScreenType = '2';
        /*this.dialog.open(lmsmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.lmsmasterservice.getlmsmastersList().then((res:any) => this.leadidList = res as lmsmaster[]);
        });*/
    }

    AddOrEditproductid(productid) {
        let ScreenType = '2';
        /*this.dialog.open(lmsproductmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => this.productidList = res as lmsproductmaster[]);
        });*/
    }

    AddOrEditcampaignid(campaignid) {
        let ScreenType = '2';
        /*this.dialog.open(lmscampaignmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.lmscampaignmasterservice.getlmscampaignmastersList().then((res:any) => this.campaignidList = res as lmscampaignmaster[]);
        });*/
    }

    AddOrEditleadby(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.leadbyList = res as bousermaster[]);
        });*/
    }

    onDeletelmspending(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedlmspendingIDs += childID + ",";
        this.lmsproductservice.lmspendings.splice(i, 1);
    }
    onDeletelmsreminder(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedlmsreminderIDs += childID + ",";
        this.lmsproductservice.lmsreminders.splice(i, 1);
    }
    onDeletelmssecondarycontact(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedlmssecondarycontactIDs += childID + ",";
        this.lmsproductservice.lmssecondarycontacts.splice(i, 1);
    }
    //start of Grid Codes lmspendings
    lmspendingssettings: any;
    lmspendingssource: any;

    showlmspendingsCheckbox() {
        debugger;
        if (this.tbllmspendingssource.settings['selectMode'] == 'multi') this.tbllmspendingssource.settings['selectMode'] = 'single';
        else
            this.tbllmspendingssource.settings['selectMode'] = 'multi';
        this.tbllmspendingssource.initGrid();
    }
    deletelmspendingsAll() {
        this.tbllmspendingssource.settings['selectMode'] = 'single';
    }
    showlmspendingsFilter() {
        setTimeout(() => {
            this.SetlmspendingsTableddConfig();
        });
        if (this.tbllmspendingssource.settings != null) this.tbllmspendingssource.settings['hideSubHeader'] = !this.tbllmspendingssource.settings['hideSubHeader'];
        this.tbllmspendingssource.initGrid();
    }
    showlmspendingsInActive() {
    }
    enablelmspendingsInActive() {
    }
    async SetlmspendingsTableddConfig() {
        if (!this.bfilterPopulatelmspendings) {
        }
        this.bfilterPopulatelmspendings = true;
    }
    async lmspendingsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetlmspendingsTableConfig() {
        this.lmspendingssettings = {
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                branchlocationid: {
                    title: 'Branch Location',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                productid: {
                    title: 'Product',
                    type: 'number',
                    filter: true,
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: true,
                },
                leadby: {
                    title: 'Lead By',
                    type: 'number',
                    filter: true,
                },
                currentowner: {
                    title: 'Current Owner',
                    type: 'number',
                    filter: true,
                },
                leadresponse: {
                    title: 'Leadresponse',
                    type: '',
                    filter: true,
                },
                nextcalldate: {
                    title: 'Next Call Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                nextaction: {
                    title: 'Next Action',
                    type: '',
                    filter: true,
                },
                actiondatetime: {
                    title: 'Action Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                previousremarks: {
                    title: 'Previous Remarks',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                leadscore: {
                    title: 'Lead Score',
                    type: 'number',
                    filter: true,
                },
                source: {
                    title: 'Source',
                    type: '',
                    filter: true,
                },
                stage: {
                    title: 'Stage',
                    type: '',
                    filter: true,
                },
                criticality: {
                    title: 'Criticality',
                    type: '',
                    filter: true,
                },
                expectedcloseby: {
                    title: 'Expected Close By',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                expectedvalue: {
                    title: 'Expected Value',
                    type: '',
                    filter: true,
                },
                attachment: {
                    title: 'Attachment',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        return cell;
                        return cell.substr(14).split('"').join('').split('{').join('').split('}').join('');
                    },
                },
                customfield: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        return cell;
                        return cell.substr(15).split('"').join('').split('{').join('').split('}').join('');
                    },
                },
            },
        };
    }
    lmspendingsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmspendingsID) >= 0) {
            this.lmspendingssource = new LocalDataSource();
            this.lmspendingssource.load(this.lmsproductservice.lmspendings as any as LocalDataSource);
            this.lmspendingssource.setPaging(1, 20, true);
        }
    }
    lmspendingsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.lmsproductservice.lmspendings.length == 0) {
                    this.tbllmspendingssource.grid.createFormShown = true;
                }
                else {
                    let obj = new lmspending();
                    this.lmsproductservice.lmspendings.push(obj);
                    this.lmspendingssource.refresh();
                    if ((this.lmsproductservice.lmspendings.length / this.lmspendingssource.getPaging().perPage).toFixed(0) + 1 != this.lmspendingssource.getPaging().page) {
                        this.lmspendingssource.setPage((this.lmsproductservice.lmspendings.length / this.lmspendingssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbllmspendingssource.grid.edit(this.tbllmspendingssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.lmspendingssource.data.indexOf(event.data);
                this.onDeletelmspending(event, event.data.callid, ((this.lmspendingssource.getPaging().page - 1) * this.lmspendingssource.getPaging().perPage) + index);
                this.lmspendingssource.refresh();
                break;
        }
    }
    lmspendingsPaging(val) {
        debugger;
        this.lmspendingssource.setPaging(1, val, true);
    }
    handlelmspendingsGridSelected(event) {
        this.lmspendingsselectedindex = this.lmsproductservice.lmspendings.findIndex(i => i.callid === event.data.callid);
    }
    IslmspendingsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmspendingsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmspendings
    //start of Grid Codes lmsreminders
    lmsreminderssettings: any;
    lmsreminderssource: any;

    showlmsremindersCheckbox() {
        debugger;
        if (this.tbllmsreminderssource.settings['selectMode'] == 'multi') this.tbllmsreminderssource.settings['selectMode'] = 'single';
        else
            this.tbllmsreminderssource.settings['selectMode'] = 'multi';
        this.tbllmsreminderssource.initGrid();
    }
    deletelmsremindersAll() {
        this.tbllmsreminderssource.settings['selectMode'] = 'single';
    }
    showlmsremindersFilter() {
        setTimeout(() => {
            this.SetlmsremindersTableddConfig();
        });
        if (this.tbllmsreminderssource.settings != null) this.tbllmsreminderssource.settings['hideSubHeader'] = !this.tbllmsreminderssource.settings['hideSubHeader'];
        this.tbllmsreminderssource.initGrid();
    }
    showlmsremindersInActive() {
    }
    enablelmsremindersInActive() {
    }
    async SetlmsremindersTableddConfig() {
        if (!this.bfilterPopulatelmsreminders) {
        }
        this.bfilterPopulatelmsreminders = true;
    }
    async lmsremindersbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetlmsremindersTableConfig() {
        this.lmsreminderssettings = {
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
                productid: {
                    title: 'Product',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                remindertext: {
                    title: 'Reminder Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                reminderstartdatetime: {
                    title: 'Reminder Start Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                frequencyhours: {
                    title: 'Frequency Hours',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmsremindersLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmsremindersID) >= 0) {
            this.lmsreminderssource = new LocalDataSource();
            this.lmsreminderssource.load(this.lmsproductservice.lmsreminders as any as LocalDataSource);
            this.lmsreminderssource.setPaging(1, 20, true);
        }
    }
    lmsremindersroute(event, action) {
        switch (action) {
            case 'create':
                if (this.lmsproductservice.lmsreminders.length == 0) {
                    this.tbllmsreminderssource.grid.createFormShown = true;
                }
                else {
                    let obj = new lmsreminder();
                    this.lmsproductservice.lmsreminders.push(obj);
                    this.lmsreminderssource.refresh();
                    if ((this.lmsproductservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1 != this.lmsreminderssource.getPaging().page) {
                        this.lmsreminderssource.setPage((this.lmsproductservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbllmsreminderssource.grid.edit(this.tbllmsreminderssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.lmsreminderssource.data.indexOf(event.data);
                this.onDeletelmsreminder(event, event.data.reminderid, ((this.lmsreminderssource.getPaging().page - 1) * this.lmsreminderssource.getPaging().perPage) + index);
                this.lmsreminderssource.refresh();
                break;
        }
    }
    lmsremindersPaging(val) {
        debugger;
        this.lmsreminderssource.setPaging(1, val, true);
    }
    handlelmsremindersGridSelected(event) {
        this.lmsremindersselectedindex = this.lmsproductservice.lmsreminders.findIndex(i => i.reminderid === event.data.reminderid);
    }
    IslmsremindersVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmsremindersID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsreminders
    //start of Grid Codes lmssecondarycontacts
    lmssecondarycontactssettings: any;
    lmssecondarycontactssource: any;

    showlmssecondarycontactsCheckbox() {
        debugger;
        if (this.tbllmssecondarycontactssource.settings['selectMode'] == 'multi') this.tbllmssecondarycontactssource.settings['selectMode'] = 'single';
        else
            this.tbllmssecondarycontactssource.settings['selectMode'] = 'multi';
        this.tbllmssecondarycontactssource.initGrid();
    }
    deletelmssecondarycontactsAll() {
        this.tbllmssecondarycontactssource.settings['selectMode'] = 'single';
    }
    showlmssecondarycontactsFilter() {
        setTimeout(() => {
            this.SetlmssecondarycontactsTableddConfig();
        });
        if (this.tbllmssecondarycontactssource.settings != null) this.tbllmssecondarycontactssource.settings['hideSubHeader'] = !this.tbllmssecondarycontactssource.settings['hideSubHeader'];
        this.tbllmssecondarycontactssource.initGrid();
    }
    showlmssecondarycontactsInActive() {
    }
    enablelmssecondarycontactsInActive() {
    }
    async SetlmssecondarycontactsTableddConfig() {
        if (!this.bfilterPopulatelmssecondarycontacts) {

            this.bobranchmasterservice.getbobranchmastersList().then((res:any) => {
                var databranchid2 = res as any;
                for (let i = 0; i < databranchid2.length; i++) {
                    var obj = { value: databranchid2[i].branchid, title: databranchid2[i].branchname };
                    this.datalmssecondarycontactsbranchid3.push(obj);
                }
                var clone = this.clone(this.tbllmssecondarycontactssource.settings);
                clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactsbranchid3)), }, };
                clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactsbranchid3)), }, };
                this.tbllmssecondarycontactssource.settings = clone;
                this.tbllmssecondarycontactssource.initGrid();
            });

            this.bobranchlocationservice.getbobranchlocationsList().then((res:any) => {
                var databranchlocationid2 = res as any;
                for (let i = 0; i < databranchlocationid2.length; i++) {
                    var obj = { value: databranchlocationid2[i].locationid, title: databranchlocationid2[i].locationname };
                    this.datalmssecondarycontactsbranchlocationid3.push(obj);
                }
                var clone = this.clone(this.tbllmssecondarycontactssource.settings);
                clone.columns['branchlocationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactsbranchlocationid3)), }, };
                clone.columns['branchlocationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactsbranchlocationid3)), }, };
                this.tbllmssecondarycontactssource.settings = clone;
                this.tbllmssecondarycontactssource.initGrid();
            });

            this.lmscorporatesecondarycontactservice.getlmscorporatesecondarycontactsList().then((res:any) => {
                var datasecondarycontactid2 = res as any;
                for (let i = 0; i < datasecondarycontactid2.length; i++) {
                    var obj = { value: datasecondarycontactid2[i].secondarycontactid, title: datasecondarycontactid2[i].lastname };
                    this.datalmssecondarycontactssecondarycontactid3.push(obj);
                }
                var clone = this.clone(this.tbllmssecondarycontactssource.settings);
                clone.columns['secondarycontactid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactssecondarycontactid3)), }, };
                clone.columns['secondarycontactid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactssecondarycontactid3)), }, };
                this.tbllmssecondarycontactssource.settings = clone;
                this.tbllmssecondarycontactssource.initGrid();
            });

            this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
                var datacampaignid2 = res as any;
                for (let i = 0; i < datacampaignid2.length; i++) {
                    var obj = { value: datacampaignid2[i].productid, title: datacampaignid2[i].productname };
                    this.datalmssecondarycontactscampaignid3.push(obj);
                }
                var clone = this.clone(this.tbllmssecondarycontactssource.settings);
                clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactscampaignid3)), }, };
                clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmssecondarycontactscampaignid3)), }, };
                this.tbllmssecondarycontactssource.settings = clone;
                this.tbllmssecondarycontactssource.initGrid();
            });
        }
        this.bfilterPopulatelmssecondarycontacts = true;
    }
    async lmssecondarycontactsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetlmssecondarycontactsTableConfig() {
        this.lmssecondarycontactssettings = {
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datalmssecondarycontactsbranchid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                branchlocationid: {
                    title: 'Branch Location',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datalmssecondarycontactsbranchlocationid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                productid: {
                    title: 'Product',
                    type: 'number',
                    filter: true,
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datalmssecondarycontactscampaignid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                secondarycontact: {
                    title: 'Secondary Contact',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmssecondarycontactsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmssecondarycontactsID) >= 0) {
            this.lmssecondarycontactssource = new LocalDataSource();
            this.lmssecondarycontactssource.load(this.lmsproductservice.lmssecondarycontacts as any as LocalDataSource);
            this.lmssecondarycontactssource.setPaging(1, 20, true);
        }
    }
    lmssecondarycontactsroute(event, action) {
        switch (action) {
            case 'create':
                if (this.lmsproductservice.lmssecondarycontacts.length == 0) {
                    this.tbllmssecondarycontactssource.grid.createFormShown = true;
                }
                else {
                    let obj = new lmssecondarycontact();
                    this.lmsproductservice.lmssecondarycontacts.push(obj);
                    this.lmssecondarycontactssource.refresh();
                    if ((this.lmsproductservice.lmssecondarycontacts.length / this.lmssecondarycontactssource.getPaging().perPage).toFixed(0) + 1 != this.lmssecondarycontactssource.getPaging().page) {
                        this.lmssecondarycontactssource.setPage((this.lmsproductservice.lmssecondarycontacts.length / this.lmssecondarycontactssource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbllmssecondarycontactssource.grid.edit(this.tbllmssecondarycontactssource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.lmssecondarycontactssource.data.indexOf(event.data);
                this.onDeletelmssecondarycontact(event, event.data.secondarycontactid, ((this.lmssecondarycontactssource.getPaging().page - 1) * this.lmssecondarycontactssource.getPaging().perPage) + index);
                this.lmssecondarycontactssource.refresh();
                break;
        }
    }
    lmssecondarycontactsPaging(val) {
        debugger;
        this.lmssecondarycontactssource.setPaging(1, val, true);
    }
    handlelmssecondarycontactsGridSelected(event) {
        this.lmssecondarycontactsselectedindex = this.lmsproductservice.lmssecondarycontacts.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
    }
    IslmssecondarycontactsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmssecondarycontactsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmssecondarycontacts

    ShowForm() {
        debugger;
        this.router.navigate(["/home/cobacustomerprocessmasters/cobacustomerprocessmasters/edit/7/productgroupid/146"]);
    }

}



