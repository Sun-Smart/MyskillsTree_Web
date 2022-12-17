import { hmshospitalnetworkService } from './../../../service/hmshospitalnetwork.service';
import { hmshospitalnetwork } from './../../../model/hmshospitalnetwork.model';
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
import { bostate } from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
import { bocity } from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
import { hmsdoctornetwork } from './../../../model/hmsdoctornetwork.model';
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hmsdoctornetworkComponent } from './hmsdoctornetwork.component';
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
    selector: 'app-hmshospitalnetwork',
    templateUrl: './hmshospitalnetwork.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmshospitalnetworkComponent implements OnInit {
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
    bfilterPopulatehmshospitalnetworks: boolean = false;
    datahmshospitalnetworkscountryid3: any = [];
    datahmshospitalnetworksstateid3: any = [];
    datahmshospitalnetworkscityid3: any = [];
    datahmsdoctornetworksdesignation3: any = [];
    datahmsdoctornetworksspecialization3: any = [];
    bfilterPopulatehmsdoctornetworks: boolean = false;
    @ViewChild('tblhmsdoctornetworkssource', { static: false }) tblhmsdoctornetworkssource: Ng2SmartTableComponent;
    hmshospitalnetworkForm: FormGroup;
    countryidList: bocountry[];
    countryid_bocountriesForm: FormGroup;
    countryid_bocountriesoptions: any;
    countryid_bocountriesformatter: any;
    stateidList: bostate[];
    stateid_bostatesForm: FormGroup;
    stateid_bostatesoptions: any;
    stateid_bostatesformatter: any;
    cityidList: bocity[];
    cityid_bocitiesForm: FormGroup;
    cityid_bocitiesoptions: any;
    cityid_bocitiesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedhmsdoctornetworkIDs: string = "";
    hmsdoctornetworksID: string = "1";
    hmsdoctornetworksselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmshospitalnetworkservice: hmshospitalnetworkService,
        private bouserrolemasterservice: bouserrolemasterService,
        private bomasterdataservice: bomasterdataService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bocountryservice: bocountryService,
        private bostateservice: bostateService,
        private bocityservice: bocityService,
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
        this.hmshospitalnetworkForm = this.fb.group({
            hospitalid: [null],
            hospitalname: [null],
            specialization: [null],
            address1: [null],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            location: [null],
            pincode: [null],
            contactno1: [null],
            contactno2: [null],
            email: [null],
            contactperson: [null],
            cpmobile: [null],
            cpemail: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmshospitalnetworkForm.controls; }

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
        if (this.hmshospitalnetworkForm.dirty && this.hmshospitalnetworkForm.touched) {
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
        let hmshospitalnetwork = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.hospitalid != null) {
            hmshospitalnetwork = this.data.hospitalid;
        }
        else
            hmshospitalnetwork = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmshospitalnetwork;
        //this.sharedService.alert(hmshospitalnetwork);
        if (hmshospitalnetwork == null) {
            this.SethmsdoctornetworksTableConfig();
            setTimeout(() => {
                this.SethmsdoctornetworksTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmshospitalnetwork);
        }
        this.bocountryservice.getbocountriesList().then((res:any) => this.countryidList = res as bocountry[]);
        this.countryid_bocountriesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.countryid_bocountriesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.countryid!.value != "" && this.f.countryid!.value != null) this.bostateservice.getListBycountryid(this.f.countryid!.value).then((res:any) => this.stateidList = res as bostate[]);
        });
        this.stateid_bostatesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.stateid_bostatesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.stateid!.value != "" && this.f.stateid!.value != null) this.bocityservice.getListBystateid(this.f.stateid!.value).then((res:any) => this.cityidList = res as bocity[]);
        });
        this.cityid_bocitiesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.cityid_bocitiesformatter = (result: any) => result.name;
        this.hmshospitalnetworkForm.markAsUntouched();
        this.hmshospitalnetworkForm.markAsPristine();
    }
    onSelectedcountryid(countryidDetail: any) {
        if (countryidDetail) {
            this.hmshospitalnetworkForm.patchValue({ countryid: countryidDetail.item.countryid });
            this.hmshospitalnetworkForm.patchValue({ countryiddesc: countryidDetail.item.name });
            countryidDetail.preventDefault();
            this.bostateservice.getListBycountryid(this.f.countryid!.value).then((res:any) => this.stateidList = res as bostate[]);

        }
    }

    onSelectedstateid(stateidDetail: any) {
        if (stateidDetail) {
            this.hmshospitalnetworkForm.patchValue({ stateid: stateidDetail.item.stateid });
            this.hmshospitalnetworkForm.patchValue({ stateiddesc: stateidDetail.item.name });
            stateidDetail.preventDefault();
            this.bocityservice.getListBystateid(this.f.stateid!.value).then((res:any) => this.cityidList = res as bocity[]);

        }
    }

    onSelectedcityid(cityidDetail: any) {
        if (cityidDetail) {
            this.hmshospitalnetworkForm.patchValue({ cityid: cityidDetail.item.cityid });
            this.hmshospitalnetworkForm.patchValue({ cityiddesc: cityidDetail.item.name });
            cityidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hmshospitalnetworkForm != null)
            this.hmshospitalnetworkForm.reset();
        setTimeout(() => {
            this.hmshospitalnetworkservice.hmsdoctornetworks = [];
            this.hmsdoctornetworksLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmshospitalnetworkForm.controls[key] != null) {
                    this.hmshospitalnetworkForm.patchValue(json);
                    this.hmshospitalnetworkForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let hospitalid = this.hmshospitalnetworkForm.get('hospitalid')!.value;
        if (hospitalid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmshospitalnetworkservice.deletehmshospitalnetwork(hospitalid).then((res:any) => {
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
        this.hmshospitalnetworkForm.patchValue({
            hospitalid: null
        });
        this.hmshospitalnetworkservice.formData.hospitalid = null;
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
        let e = evt!.value;
    }
    stateidonChange(evt:any) {
        let e = evt!.value;
    }
    cityidonChange(evt:any) {
        let e = evt!.value;
    }
    PopulateScreen(hmshospitalnetwork: any) {
        this.hmshospitalnetworkservice.gethmshospitalnetworksByID(parseInt(hmshospitalnetwork)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmshospitalnetworkForm.patchValue({
            hospitalid: res.hmshospitalnetwork.hospitalid,
            hospitalname: res.hmshospitalnetwork.hospitalname,
            specialization: res.hmshospitalnetwork.specialization,
            address1: res.hmshospitalnetwork.address1,
            address2: res.hmshospitalnetwork.address2,
            countryid: res.hmshospitalnetwork.countryid,
            countryiddesc: res.hmshospitalnetwork.countryiddesc,
            stateid: res.hmshospitalnetwork.stateid,
            stateiddesc: res.hmshospitalnetwork.stateiddesc,
            cityid: res.hmshospitalnetwork.cityid,
            cityiddesc: res.hmshospitalnetwork.cityiddesc,
            location: res.hmshospitalnetwork.location,
            pincode: res.hmshospitalnetwork.pincode,
            contactno1: res.hmshospitalnetwork.contactno1,
            contactno2: res.hmshospitalnetwork.contactno2,
            email: res.hmshospitalnetwork.email,
            contactperson: res.hmshospitalnetwork.contactperson,
            cpmobile: res.hmshospitalnetwork.cpmobile,
            cpemail: res.hmshospitalnetwork.cpemail,
            status: res.hmshospitalnetwork.status,
            statusdesc: res.hmshospitalnetwork.statusdesc,
        });
        setTimeout(() => {
            if (this.f.countryid!.value != "" && this.f.countryid!.value != null) this.bostateservice.getListBycountryid(this.f.countryid!.value).then((res:any) => this.stateidList = res as bostate[]);
        });
        setTimeout(() => {
            if (this.f.stateid!.value != "" && this.f.stateid!.value != null) this.bocityservice.getListBystateid(this.f.stateid!.value).then((res:any) => this.cityidList = res as bocity[]);
        });
        this.hmshospitalnetworkservice.hmsdoctornetworks = res.hmsdoctornetwork;
        this.SethmsdoctornetworksTableConfig();
        this.hmsdoctornetworksLoadTable();
        setTimeout(() => {
            this.SethmsdoctornetworksTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmshospitalnetworkForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmshospitalnetworkservice.formData = this.hmshospitalnetworkForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmshospitalnetworkForm.controls[key] != null) {
                    this.hmshospitalnetworkservice.formData[key] = this.hmshospitalnetworkForm.controls[key]!.value;
                }
            }
        }
        this.hmshospitalnetworkservice.formData.cpmobile = this.hmshospitalnetworkForm.get('cpmobile')!.value == null ? null : this.hmshospitalnetworkForm.get('cpmobile')!.value;
        this.hmshospitalnetworkservice.formData.DeletedhmsdoctornetworkIDs = this.DeletedhmsdoctornetworkIDs;
        console.log(this.hmshospitalnetworkservice.formData);
        this.hmshospitalnetworkservice.saveOrUpdatehmshospitalnetworks().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmshospitalnetworkservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmshospitalnetwork);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmshospitalnetworkForm.markAsUntouched();
                this.hmshospitalnetworkForm.markAsPristine();
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

    AddOrEditstateid(stateid) {
        let ScreenType = '2';
        /*this.dialog.open(bostateComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bostateservice.getbostatesList().then((res:any) => this.stateidList = res as bostate[]);
        });*/
    }

    AddOrEditcityid(cityid) {
        let ScreenType = '2';
        /*this.dialog.open(bocityComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bocityservice.getbocitiesList().then((res:any) => this.cityidList = res as bocity[]);
        });*/
    }

    AddOrEdithmsdoctornetwork(event, doctorid, hospitalid) {
        this.dialog.open(hmsdoctornetworkComponent,
            {
                data: { doctorid, hospitalid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (doctorid == null) {
                this.hmsdoctornetworkssource.add(res);
                this.hmsdoctornetworkssource.refresh();
            }
            else {
                this.hmsdoctornetworkssource.update(event.data, res);
            }
        });
    }
    onDeletehmsdoctornetwork(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedhmsdoctornetworkIDs += childID + ",";
        this.hmshospitalnetworkservice.hmsdoctornetworks.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes hmsdoctornetworks
    hmsdoctornetworkssettings: any;
    hmsdoctornetworkssource: any;

    showhmsdoctornetworksCheckbox() {
        debugger;
        if (this.tblhmsdoctornetworkssource.settings['selectMode'] == 'multi') this.tblhmsdoctornetworkssource.settings['selectMode'] = 'single';
        else
            this.tblhmsdoctornetworkssource.settings['selectMode'] = 'multi';
        this.tblhmsdoctornetworkssource.initGrid();
    }
    deletehmsdoctornetworksAll() {
        this.tblhmsdoctornetworkssource.settings['selectMode'] = 'single';
    }
    showhmsdoctornetworksFilter() {
        setTimeout(() => {
            this.SethmsdoctornetworksTableddConfig();
        });
        if (this.tblhmsdoctornetworkssource.settings != null) this.tblhmsdoctornetworkssource.settings['hideSubHeader'] = !this.tblhmsdoctornetworkssource.settings['hideSubHeader'];
        this.tblhmsdoctornetworkssource.initGrid();
    }
    showhmsdoctornetworksInActive() {
    }
    enablehmsdoctornetworksInActive() {
    }
    async SethmsdoctornetworksTableddConfig() {
        if (!this.bfilterPopulatehmsdoctornetworks) {

            this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => {
                var datadesignation2 = res as any;
                for (let i = 0; i < datadesignation2.length; i++) {
                    var obj = { value: datadesignation2[i].userroleid, title: datadesignation2[i].userrole };
                    this.datahmsdoctornetworksdesignation3.push(obj);
                }
                var clone = this.clone(this.tblhmsdoctornetworkssource.settings);
                clone.columns['designation'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsdoctornetworksdesignation3)), }, };
                clone.columns['designation'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsdoctornetworksdesignation3)), }, };
                this.tblhmsdoctornetworkssource.settings = clone;
                this.tblhmsdoctornetworkssource.initGrid();
            });

            this.bomasterdataservice.getList("50").then((res:any) => {
                var dataspecialization2 = res as any;
                for (let i = 0; i < dataspecialization2.length; i++) {
                    var obj = { value: dataspecialization2[i].masterdataid, title: dataspecialization2[i].masterdatadescription };
                    this.datahmsdoctornetworksspecialization3.push(obj);
                }
                var clone = this.clone(this.tblhmsdoctornetworkssource.settings);
                clone.columns['specialization'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsdoctornetworksspecialization3)), }, };
                clone.columns['specialization'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsdoctornetworksspecialization3)), }, };
                this.tblhmsdoctornetworkssource.settings = clone;
                this.tblhmsdoctornetworkssource.initGrid();
            });
        }
        this.bfilterPopulatehmsdoctornetworks = true;
    }
    async hmsdoctornetworksbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SethmsdoctornetworksTableConfig() {
        this.hmsdoctornetworkssettings = {
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
                doctorname: {
                    title: 'doctorname',
                    type: '',
                    filter: true,
                },
                designation: {
                    title: 'Designation',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datahmsdoctornetworksdesignation3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                specialization: {
                    title: 'Specialization',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datahmsdoctornetworksspecialization3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                contactno: {
                    title: 'Contact No',
                    type: '',
                    filter: true,
                },
                email: {
                    title: 'Email',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    hmsdoctornetworksLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsdoctornetworksID) >= 0) {
            this.hmsdoctornetworkssource = new LocalDataSource();
            this.hmsdoctornetworkssource.load(this.hmshospitalnetworkservice.hmsdoctornetworks as any as LocalDataSource);
            this.hmsdoctornetworkssource.setPaging(1, 20, true);
        }
    }
    hmsdoctornetworksroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdithmsdoctornetwork(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdithmsdoctornetwork(event, event.data.doctorid, this.formid);
                break;
            case 'delete':
                this.onDeletehmsdoctornetwork(event, event.data.doctorid, ((this.hmsdoctornetworkssource.getPaging().page - 1) * this.hmsdoctornetworkssource.getPaging().perPage) + event.index);
                this.hmsdoctornetworkssource.refresh();
                break;
        }
    }
    hmsdoctornetworksonDelete(obj) {
        let doctorid = obj.data.doctorid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hmshospitalnetworkservice.deletehmshospitalnetwork(doctorid).then((res:any) =>
                this.hmsdoctornetworksLoadTable()
            );
        }
    }
    hmsdoctornetworksPaging(val) {
        debugger;
        this.hmsdoctornetworkssource.setPaging(1, val, true);
    }
    handlehmsdoctornetworksGridSelected(event) {
        this.hmsdoctornetworksselectedindex = this.hmshospitalnetworkservice.hmsdoctornetworks.findIndex(i => i.doctorid === event.data.doctorid);
    }
    IshmsdoctornetworksVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsdoctornetworksID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hmsdoctornetworks

}



