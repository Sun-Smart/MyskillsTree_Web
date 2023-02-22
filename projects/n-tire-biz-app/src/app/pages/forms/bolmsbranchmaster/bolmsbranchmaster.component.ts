import { bolmsbranchmasterService } from './../../../service/bolmsbranchmaster.service';
import { bolmsbranchmaster } from './../../../model/bolmsbranchmaster.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { boconfigvalue } from '../../../../../../n-tire-biz-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-biz-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { bocountry } from './../../../model/bocountry.model';
import { bocountryService } from './../../../service/bocountry.service';
import { bostate } from './../../../model/bostate.model';
import { bostateService } from './../../../service/bostate.service';
import { bocity } from './../../../model/bocity.model';
import { bocityService } from './../../../service/bocity.service';
import { bolocation } from './../../../model/bolocation.model';
import { bolocationService } from './../../../service/bolocation.service';
import { bousermaster } from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
import { map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-bolmsbranchmaster',
    templateUrl: './bolmsbranchmaster.component.html',
    styles: []
})

export class bolmsbranchmasterComponent implements OnInit {
    hidelist: any = [];
    objvalues: any = [];
    viewhtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    //formdata: any;//current form data
    shortcuts: ShortcutInput[] = [];//keyboard keys
    showsubmit: boolean = true;//button to show
    showGoWorkFlow: boolean = false;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    pk_tblForm: FormGroup;//pk - autocomplete
    pk_tbloptions: any;//pk - autocomplete
    pk_tblformatter: any;//pk - autocomplete
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
    maindata: any;
    data3: any = [];
    bfilterPopulatebobranchmasters: boolean = false;
    databobranchmasterscountryid3: any = [];
    databobranchmastersstateid3: any = [];
    databobranchmasterscityid3: any = [];
    databobranchmasterslocationid3: any = [];
    databobranchmastersweekoff13: any = [];
    databobranchmastersweekoff23: any = [];
    databobranchmastersresourceallocation3: any = [];
    databobranchmastersgrowthopportunity3: any = [];
    databobranchmasterssalesdirector3: any = [];
    databobranchmasterscustomersuccessdirector3: any = [];
    bobranchmastermenuactions: any = []
    bobranchmasterForm: FormGroup;
    countryidList: bocountry[];
    countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    countryid_bocountriesForm: FormGroup;//autocomplete
    countryid_bocountriesoptions: any;//autocomplete
    countryid_bocountriesformatter: any;//autocomplete
    stateidList: bostate[];
    stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    stateid_bostatesForm: FormGroup;//autocomplete
    stateid_bostatesoptions: any;//autocomplete
    stateid_bostatesformatter: any;//autocomplete
    cityidList: bocity[];
    cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    cityid_bocitiesForm: FormGroup;//autocomplete
    cityid_bocitiesoptions: any;//autocomplete
    cityid_bocitiesformatter: any;//autocomplete
    locationidList: bolocation[];
    locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    locationid_bolocationsForm: FormGroup;//autocomplete
    locationid_bolocationsoptions: any;//autocomplete
    locationid_bolocationsformatter: any;//autocomplete
    weekoff1List: boconfigvalue[];
    weekoff2List: boconfigvalue[];
    resourceallocationList: boconfigvalue[];
    growthopportunityList: boconfigvalue[];
    salesdirectorList: bousermaster[];
    salesdirectoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    salesdirector_bousermastersForm: FormGroup;//autocomplete
    salesdirector_bousermastersoptions: any;//autocomplete
    salesdirector_bousermastersformatter: any;//autocomplete
    customersuccessdirectorList: bousermaster[];
    customersuccessdirectoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    customersuccessdirector_bousermastersForm: FormGroup;//autocomplete
    customersuccessdirector_bousermastersoptions: any;//autocomplete
    customersuccessdirector_bousermastersformatter: any;//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    pkcol: any;
    customfieldjson: any;
    customfieldvisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentfieldjson: any[] = [];
    attachmentvisible: boolean = true;
    SESSIONUSERID: any;//current user
    bobranchmastershowOption: boolean;
    sessiondata: any;
    sourcekey: any;

    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bobranchmasterservice: bolmsbranchmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private configservice: boconfigvalueService,
        private bocountryservice: bocountryService,
        private bostateservice: bostateService,
        private bocityservice: bocityService,
        private bolocationservice: bolocationService,
        private bousermasterservice: bousermasterService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute) {
        this.bobranchmasterservice.formData = null;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.bobranchmasterForm = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            branchcode: [null, Validators.compose([Validators.required])],
            branchname: [null, Validators.compose([Validators.required])],
            thumbnail: [null],
            address1: [null, Validators.compose([Validators.required])],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            locationid: [null],
            locationiddesc: [null],
            pin: [null],
            latlong: [null],
            starttime: [null, Validators.compose([Validators.required])],
            endtime: [null, Validators.compose([Validators.required])],
            weekoff1: [null],
            weekoff1desc: [null],
            weekoff2: [null],
            weekoff2desc: [null],
            remarks: [null],
            totalregions: [null],
            accounts: [null],
            salespeople: [null],
            resourceallocation: [null],
            resourceallocationdesc: [null],
            growthopportunity: [null],
            growthopportunitydesc: [null],
            salesdirector: [null],
            salesdirectordesc: [null],
            customersuccessdirector: [null],
            customersuccessdirectordesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bobranchmasterForm.controls; }
    ToolBar(prop) {
        this.toolbarvisible = prop;
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.bobranchmasterForm.dirty && this.bobranchmasterForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    branchcodeexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.branchcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
            if (confirm("This Branch Code value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
    branchnameexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.branchname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
            if (confirm("This Branch Name value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.branchid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');
        this.themeService.theme.subscribe((val: string) => {
            debugger;
            this.theme = val;
        });

        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
            this.maindata = this.data;
        }
        if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
        if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
            this.viewhtml = '';
        }
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
            this.sourcekey = this.currentRoute.snapshot.paramMap.get('sourcekey');
        }
        let bobranchmasterid = null;

        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
        }
        else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
            this.pkcol = this.sessionService.getItem('usersource');
        }
        else if (this.data != null && this.data.pkcol != null) {
            this.pkcol = this.data.pkcol;
        }
        else {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = bobranchmasterid;
        if (this.pkcol == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bocountryservice.get_bocountries_List().then(res => {
            this.countryidList = res as bocountry[];
            if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.countryid) {
                this.countryidoptionsEvent.emit(this.countryidList);
                this.bobranchmasterForm.patchValue({
                    countryid: this.bobranchmasterservice.formData.countryid,
                    countryiddesc: this.bobranchmasterservice.formData.countryiddesc,
                });
            }
            {
                let arrcountryid = this.countryidList.filter(v => v.countryid == this.bobranchmasterForm.get('countryid').value);
                let objcountryid;
                if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
                if (objcountryid) {
                }
            }
        }
        ).catch((err) => {
        });
        this.countryid_bocountriesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.countryid_bocountriesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null) this.bostateservice.getListBycountryid(this.f.countryid.value).then(res => {
                this.stateidList = res as bostate[];
                if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.stateid) {
                    this.bobranchmasterForm.patchValue({
                        stateid: this.bobranchmasterservice.formData.stateid,
                        stateiddesc: this.bobranchmasterservice.formData.stateiddesc,
                    });
                }
            }).catch((err) => {
            });
        });
        this.stateid_bostatesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.stateid_bostatesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null) this.bocityservice.getListBystateid(this.f.stateid.value).then(res => {
                this.cityidList = res as bocity[];
                if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.cityid) {
                    this.bobranchmasterForm.patchValue({
                        cityid: this.bobranchmasterservice.formData.cityid,
                        cityiddesc: this.bobranchmasterservice.formData.cityiddesc,
                    });
                }
            }).catch((err) => {
            });
        });
        this.cityid_bocitiesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.cityid_bocitiesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null) this.bolocationservice.getListBycityid(this.f.cityid.value).then(res => {
                this.locationidList = res as bolocation[];
                if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.locationid) {
                    this.bobranchmasterForm.patchValue({
                        locationid: this.bobranchmasterservice.formData.locationid,
                        locationiddesc: this.bobranchmasterservice.formData.locationiddesc,
                    });
                }
            }).catch((err) => {
                //console.log(err);
            });
        });
        this.locationid_bolocationsoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.locationidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.locationid_bolocationsformatter = (result: any) => result.name;
        this.configservice.getList("weekday").then(res => this.weekoff1List = res as boconfigvalue[]);
        this.configservice.getList("weekday").then(res => this.weekoff2List = res as boconfigvalue[]);
        this.configservice.getList("resourceallocation").then(res => this.resourceallocationList = res as boconfigvalue[]);
        this.configservice.getList("growthopportunity").then(res => this.growthopportunityList = res as boconfigvalue[]);
        this.bousermasterservice.get_bousermasters_List().then(res => {
            this.salesdirectorList = res as bousermaster[];
            if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.salesdirector) {
                this.salesdirectoroptionsEvent.emit(this.salesdirectorList);
                this.bobranchmasterForm.patchValue({
                    salesdirector: this.bobranchmasterservice.formData.salesdirector,
                    salesdirectordesc: this.bobranchmasterservice.formData.salesdirectordesc,
                });
            }
            {
                let arrsalesdirector = this.salesdirectorList.filter(v => v.userid == this.bobranchmasterForm.get('salesdirector').value);
                let objsalesdirector;
                if (arrsalesdirector.length > 0) objsalesdirector = arrsalesdirector[0];
                if (objsalesdirector) {
                }
            }
        }
        ).catch((err) => {
        });
        this.salesdirector_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.salesdirectorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.salesdirector_bousermastersformatter = (result: any) => result.username;
        this.bousermasterservice.get_bousermasters_List().then(res => {
            this.customersuccessdirectorList = res as bousermaster[];
            if (this.bobranchmasterservice.formData && this.bobranchmasterservice.formData.customersuccessdirector) {
                this.customersuccessdirectoroptionsEvent.emit(this.customersuccessdirectorList);
                this.bobranchmasterForm.patchValue({
                    customersuccessdirector: this.bobranchmasterservice.formData.customersuccessdirector,
                    customersuccessdirectordesc: this.bobranchmasterservice.formData.customersuccessdirectordesc,
                });
            }
            {
                let arrcustomersuccessdirector = this.customersuccessdirectorList.filter(v => v.userid == this.bobranchmasterForm.get('customersuccessdirector').value);
                let objcustomersuccessdirector;
                if (arrcustomersuccessdirector.length > 0) objcustomersuccessdirector = arrcustomersuccessdirector[0];
                if (objcustomersuccessdirector) {
                }
            }
        }
        ).catch((err) => {
        });
        this.customersuccessdirector_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.customersuccessdirectorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.customersuccessdirector_bousermastersformatter = (result: any) => result.username;

        //autocomplete
        this.bobranchmasterservice.getbobranchmastersList().then(res => {
            this.pkList = res as bolmsbranchmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => {
        });
        this.pk_tbloptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.pkList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.pk_tblformatter = (result: any) => result.branchname;

        //setting the flag that the screen is not touched
        this.bobranchmasterForm.markAsUntouched();
        this.bobranchmasterForm.markAsPristine();
    }
    onSelectedcountryid(countryidDetail: any) {
        if (countryidDetail.countryid && countryidDetail) {
            this.bobranchmasterForm.patchValue({
                countryid: countryidDetail.countryid,
                countryiddesc: countryidDetail.name,

            });
            this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
                this.stateidList = res as bostate[]
            }).catch((err) => {
            });

        }
    }

    onSelectedstateid(stateidDetail: any) {
        if (stateidDetail.stateid && stateidDetail) {
            this.bobranchmasterForm.patchValue({
                stateid: stateidDetail.stateid,
                stateiddesc: stateidDetail.name,

            });
            this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
                this.cityidList = res as bocity[]
            }).catch((err) => {
            });

        }
    }

    onSelectedcityid(cityidDetail: any) {
        if (cityidDetail.cityid && cityidDetail) {
            this.bobranchmasterForm.patchValue({
                cityid: cityidDetail.cityid,
                cityiddesc: cityidDetail.name,

            });
            this.bolocationservice.getListBycityid(cityidDetail.cityid).then(res => {
                this.locationidList = res as bolocation[]
            }).catch((err) => {
            });

        }
    }

    onSelectedlocationid(locationidDetail: any) {
        if (locationidDetail.locationid && locationidDetail) {
            this.bobranchmasterForm.patchValue({
                locationid: locationidDetail.locationid,
                locationiddesc: locationidDetail.name,

            });

        }
    }

    onSelectedsalesdirector(salesdirectorDetail: any) {
        if (salesdirectorDetail.userid && salesdirectorDetail) {
            this.bobranchmasterForm.patchValue({
                salesdirector: salesdirectorDetail.userid,
                salesdirectordesc: salesdirectorDetail.username,

            });

        }
    }

    onSelectedcustomersuccessdirector(customersuccessdirectorDetail: any) {
        if (customersuccessdirectorDetail.userid && customersuccessdirectorDetail) {
            this.bobranchmasterForm.patchValue({
                customersuccessdirector: customersuccessdirectorDetail.userid,
                customersuccessdirectordesc: customersuccessdirectorDetail.username,

            });

        }
    }




    resetForm() {
        if (this.bobranchmasterForm != null)
            this.bobranchmasterForm.reset();
        this.bobranchmasterForm.patchValue({
            salesdirector: this.sessiondata.userid,
            salesdirectordesc: this.sessiondata.username,
            customersuccessdirector: this.sessiondata.userid,
            customersuccessdirectordesc: this.sessiondata.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let branchid = this.bobranchmasterForm.get('branchid').value;
        if (branchid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchmasterservice.deletebobranchmaster(branchid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => {
                });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bobranchmasterForm.patchValue({
            branchid: null
        });
        if (this.bobranchmasterservice.formData.branchid != null) this.bobranchmasterservice.formData.branchid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "starttime")
                        this.bobranchmasterForm.patchValue({ "starttime": new Time(mainscreendata[key]) });
                    else if (key == "endtime")
                        this.bobranchmasterForm.patchValue({ "endtime": new Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bobranchmasterForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchmasterForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchmasterForm.controls[key] != undefined) {
                                this.bobranchmasterForm.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("bobranchmasters", this.CustomFormName, "", "", this.customfieldjson).then(res => {
            this.customfieldservicelist = res;
            if (this.customfieldservicelist != undefined) this.customfieldvisible = (this.customfieldservicelist.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.bobranchmasterservice.formData.branchname != null) {
            this.onSubmitData(false);
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
        }
        else {
            this.onSubmitData(false);
        }
    }
    onSubmit() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.bobranchmasterservice.formData.branchname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    branchidonChange(evt: any) {
        let e = evt.value;
    }
    branchcodeonChange(evt: any) {
        let e = evt.value;
    }
    branchnameonChange(evt: any) {
        let e = evt.value;
    }
    thumbnailonChange(evt: any) {
        let e = evt.value;
    }
    address1onChange(evt: any) {
        let e = evt.value;
    }
    address2onChange(evt: any) {
        let e = evt.value;
    }
    countryidonChange(evt: any) {
        let e = evt.value;
    }
    stateidonChange(evt: any) {
        let e = evt.value;
    }
    cityidonChange(evt: any) {
        let e = evt.value;
    }
    locationidonChange(evt: any) {
        let e = evt.value;
    }
    pinonChange(evt: any) {
        let e = evt.value;
    }
    latlongonChange(evt: any) {
        let e = evt.value;
    }
    starttimeonChange(evt: any) {
        let e = evt.value;
    }
    endtimeonChange(evt: any) {
        let e = evt.value;
    }
    weekoff1onChange(evt: any) {
        let e = this.f.weekoff1.value as any;
        this.bobranchmasterForm.patchValue({ weekoff1desc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff2onChange(evt: any) {
        let e = this.f.weekoff2.value as any;
        this.bobranchmasterForm.patchValue({ weekoff2desc: evt.options[evt.options.selectedIndex].text });
    }
    remarksonChange(evt: any) {
        let e = evt.value;
    }
    totalregionsonChange(evt: any) {
        let e = evt.value;
    }
    accountsonChange(evt: any) {
        let e = evt.value;
    }
    salespeopleonChange(evt: any) {
        let e = evt.value;
    }
    resourceallocationonChange(evt: any) {
        let e = this.f.resourceallocation.value as any;
        this.bobranchmasterForm.patchValue({ resourceallocationdesc: evt.options[evt.options.selectedIndex].text });
    }
    growthopportunityonChange(evt: any) {
        let e = this.f.growthopportunity.value as any;
        this.bobranchmasterForm.patchValue({ growthopportunitydesc: evt.options[evt.options.selectedIndex].text });
    }
    salesdirectoronChange(evt: any) {
        let e = evt.value;
    }
    customersuccessdirectoronChange(evt: any) {
        let e = evt.value;
    }
    customfieldonChange(evt: any) {
        let e = evt.value;
    }
    attachmentonChange(evt: any) {
        let e = evt.value;
    }
    statusonChange(evt: any) {
        let e = evt.value;
    }
    attachmentuploader(e: any) {
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



    editbobranchmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.bobranchmasterservice.getbobranchmastersByEID(pkcol).then(res => {
            this.bobranchmasterservice.formData = res.bobranchmaster;
            let formproperty = res.bobranchmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bobranchmaster.pkcol;
            this.formid = res.bobranchmaster.branchid;
            this.FillData(res);
        }).catch((err) => {
        });
    }

    FillData(res: any) {
        this.bobranchmasterservice.formData = res.bobranchmaster;
        this.formid = res.bobranchmaster.branchid;
        this.pkcol = res.bobranchmaster.pkcol;
        var starttimeTime = new Time(res.bobranchmaster.starttime);
        var endtimeTime = new Time(res.bobranchmaster.endtime);
        this.bobranchmasterForm.patchValue({
            branchid: res.bobranchmaster.branchid,
            branchcode: res.bobranchmaster.branchcode,
            branchname: res.bobranchmaster.branchname,
            thumbnail: res.bobranchmaster.thumbnail,
            address1: res.bobranchmaster.address1,
            address2: res.bobranchmaster.address2,
            countryid: res.bobranchmaster.countryid,
            countryiddesc: res.bobranchmaster.countryiddesc,
            stateid: res.bobranchmaster.stateid,
            stateiddesc: res.bobranchmaster.stateiddesc,
            cityid: res.bobranchmaster.cityid,
            cityiddesc: res.bobranchmaster.cityiddesc,
            locationid: res.bobranchmaster.locationid,
            locationiddesc: res.bobranchmaster.locationiddesc,
            pin: res.bobranchmaster.pin,
            latlong: res.bobranchmaster.latlong,
            starttime: starttimeTime,
            endtime: endtimeTime,
            weekoff1: res.bobranchmaster.weekoff1,
            weekoff1desc: res.bobranchmaster.weekoff1desc,
            weekoff2: res.bobranchmaster.weekoff2,
            weekoff2desc: res.bobranchmaster.weekoff2desc,
            remarks: res.bobranchmaster.remarks,
            totalregions: res.bobranchmaster.totalregions,
            accounts: res.bobranchmaster.accounts,
            salespeople: res.bobranchmaster.salespeople,
            resourceallocation: res.bobranchmaster.resourceallocation,
            resourceallocationdesc: res.bobranchmaster.resourceallocationdesc,
            growthopportunity: res.bobranchmaster.growthopportunity,
            growthopportunitydesc: res.bobranchmaster.growthopportunitydesc,
            salesdirector: res.bobranchmaster.salesdirector,
            salesdirectordesc: res.bobranchmaster.salesdirectordesc,
            customersuccessdirector: res.bobranchmaster.customersuccessdirector,
            customersuccessdirectordesc: res.bobranchmaster.customersuccessdirectordesc,
            customfield: res.bobranchmaster.customfield,
            attachment: JSON.parse(res.bobranchmaster.attachment),
            status: res.bobranchmaster.status,
            statusdesc: res.bobranchmaster.statusdesc,
        });
        this.bobranchmastermenuactions = res.bobranchmastermenuactions;
        if (this.bobranchmasterForm.get('customfield').value != null && this.bobranchmasterForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.bobranchmasterForm.get('customfield').value);
        this.FillCustomField();
        if (this.bobranchmasterForm.get('attachment').value != null && this.bobranchmasterForm.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bobranchmasterForm.get('attachment').value);
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null) this.bostateservice.getListBycountryid(this.f.countryid.value).then(res => {
                this.stateidList = res as bostate[];
            }).catch((err) => {
            });
        });
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null) this.bocityservice.getListBystateid(this.f.stateid.value).then(res => {
                this.cityidList = res as bocity[];
            }).catch((err) => {
            });
        });
        setTimeout(() => {
            if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null) this.bolocationservice.getListBycityid(this.f.cityid.value).then(res => {
                this.locationidList = res as bolocation[];
            }).catch((err) => {
            });
        });
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchmasterForm.controls) {
            let val = this.bobranchmasterForm.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bobranchmasterForm.controls[key] != null) {
                if (false) {
                    if (this.bobranchmasterservice.formData != null && this.bobranchmasterservice.formData[key] != null && this.bobranchmasterservice.formData[key] != '[]' && this.bobranchmasterservice.formData[key] != undefined && this.bobranchmasterservice.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.bobranchmasterservice.formData[key])[0]["name"]);
                }
                else if (false) {
                    if (this.bobranchmasterservice.formData != null && this.bobranchmasterservice.formData[key] != null && this.bobranchmasterservice.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.bobranchmasterservice.formData[key] + "></div>");
                }
                else if (false) {
                    if (this.bobranchmasterservice.formData != null && this.bobranchmasterservice.formData[key] != null && this.bobranchmasterservice.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.bobranchmasterservice.formData[key] + "'><div class='progress__number'>" + this.bobranchmasterservice.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }

    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.bobranchmasterForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.bobranchmasterForm.value;
        obj.starttime = (this.bobranchmasterForm.get('starttime').value == null ? 0 : this.bobranchmasterForm.get('starttime').value.hour) + ':' + (this.bobranchmasterForm.get('starttime').value == null ? 0 : this.bobranchmasterForm.get('starttime').value.minute + ":00");
        obj.endtime = (this.bobranchmasterForm.get('endtime').value == null ? 0 : this.bobranchmasterForm.get('endtime').value.hour) + ':' + (this.bobranchmasterForm.get('endtime').value == null ? 0 : this.bobranchmasterForm.get('endtime').value.minute + ":00");
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getattachmentlist() != null) obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
        obj.fileattachmentlist = this.fileattachment.getAllFiles();
        if (!confirm('Do you want to want to save?')) {
            return;
        }
        await this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
    }

    //This has to come from bomenuactions & procedures
    afteraction(mode: any) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }

    private bobranchmastertoggleOption() {
        this.bobranchmastershowOption = this.bobranchmastershowOption === true ? false : true;
    }



    async onSubmitData(bclear: any) {
        this.isSubmitted = true;
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.bobranchmasterForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.bobranchmasterservice.formData = this.bobranchmasterForm.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bobranchmasterForm.controls[key] != null) {
                        this.bobranchmasterservice.formData[key] = this.bobranchmasterForm.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.bobranchmasterservice.formData.starttime = (this.bobranchmasterForm.get('starttime').value == null ? 0 : this.bobranchmasterForm.get('starttime').value.hour) + ':' + (this.bobranchmasterForm.get('starttime').value == null ? 0 : this.bobranchmasterForm.get('starttime').value.minute + ":00");
        this.bobranchmasterservice.formData.endtime = (this.bobranchmasterForm.get('endtime').value == null ? 0 : this.bobranchmasterForm.get('endtime').value.hour) + ':' + (this.bobranchmasterForm.get('endtime').value == null ? 0 : this.bobranchmasterForm.get('endtime').value.minute + ":00");
        if (customfields != null) this.bobranchmasterservice.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getattachmentlist() != null) this.bobranchmasterservice.formData.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
        this.fileattachmentlist = this.fileattachment.getAllFiles();
        this.bobranchmasterservice.formData = this.bobranchmasterForm.value;
        this.bobranchmasterservice.saveOrUpdatebobranchmasters().subscribe(
            async res => {
                await this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bobranchmaster);
                if (!bclear) this.showview = true;
                document.getElementById("contentArea1").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    document.getElementById("contentArea1").scrollTop = 0;
                }
                this.bobranchmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push((res as any).bobranchmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchmasterForm.markAsUntouched();
                this.bobranchmasterForm.markAsPristine();
            },
            err => {
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }

    AddOrEditcountryid(countryid) {
    }


    AddOrEditstateid(stateid) {
    }


    AddOrEditcityid(cityid) {
    }


    AddOrEditlocationid(locationid) {
    }


    AddOrEditsalesdirector(userid) {
    }


    AddOrEditcustomersuccessdirector(userid) {
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



