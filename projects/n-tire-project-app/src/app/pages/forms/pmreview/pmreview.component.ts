import { pmreviewService } from './../../../service/pmreview.service';
import { pmreview } from './../../../model/pmreview.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
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
import { hrmsemployee } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { pmreviewdetail } from './../../../model/pmreviewdetail.model';
import { pmkpi, IpmkpiResponse } from './../../../model/pmkpi.model';
import { pmkpiService } from './../../../service/pmkpi.service';
import { pmreviewdetailComponent } from './pmreviewdetail.component';
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
    selector: 'app-pmreview',
    templateUrl: './pmreview.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class pmreviewComponent implements OnInit {
    formdata: any;
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
    bfilterPopulatepmreviews: boolean = false;
    datapmreviewsdepartmentid3: any = [];
    datapmreviewsemployeeid3: any = [];
    datapmreviewsreviewedby3: any = [];
    datapmreviewssupervisedby3: any = [];
    datapmreviewsdecision3: any = [];
    datapmreviewdetailsdepartmentid3: any = [];
    datapmreviewdetailskpiid3: any = [];
    datapmreviewdetailsemployeeid3: any = [];
    datapmreviewdetailsformat3: any = [];
    datapmreviewdetailsdesignationid3: any = [];
    bfilterPopulatepmreviewdetails: boolean = false;
    @ViewChild('tblpmreviewdetailssource', { static: false }) tblpmreviewdetailssource: Ng2SmartTableComponent;
    pmreviewForm: FormGroup;
    departmentidList: bomasterdata[];
    employeeidList: hrmsemployee[];
    employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    reviewedbyList: hrmsemployee[];
    reviewedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    reviewedby_hrmsemployeesForm: FormGroup;
    reviewedby_hrmsemployeesoptions: any;
    reviewedby_hrmsemployeesformatter: any;
    supervisedbyList: hrmsemployee[];
    supervisedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    supervisedby_hrmsemployeesForm: FormGroup;
    supervisedby_hrmsemployeesoptions: any;
    supervisedby_hrmsemployeesformatter: any;
    decisionList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    SESSIONUSERID: any;
    sessiondata: any;
    pmreviewdetailsvisiblelist: any;
    pmreviewdetailshidelist: any;
    DeletedpmreviewdetailIDs: string = "";
    pmreviewdetailsID: string = "1";
    pmreviewdetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private pmreviewservice: pmreviewService,
        private bomasterdataservice: bomasterdataService,
        private pmkpiservice: pmkpiService,
        private hrmsemployeeservice: hrmsemployeeService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
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
        this.pmreviewForm = this.fb.group({
            reviewid: [null],
            departmentid: [null],
            departmentiddesc: [null],
            designationid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            fromdate: [null],
            todate: [null],
            reviewdate: [null],
            reviewedby: [null],
            reviewedbydesc: [null],
            supervisedby: [null],
            supervisedbydesc: [null],
            reviewerremarks: [null],
            employeeremarks: [null],
            decision: [null],
            decisiondesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.pmreviewForm.controls; }

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
        if (this.pmreviewForm.dirty && this.pmreviewForm.touched) {
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
        let pmreviewid = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.reviewid != null) {
            pmreviewid = this.data.reviewid;
        }
        else {
            pmreviewid = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.pmreviewForm.controls[key] != null) {
                        this.pmreviewForm.patchValue(json);
                        this.pmreviewForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = pmreviewid;
        //this.sharedService.alert(pmreviewid);
        if (pmreviewid == null) {
            this.SetpmreviewdetailsTableConfig();
            setTimeout(() => {
                this.SetpmreviewdetailsTableddConfig();
            });
            this.resetForm();
        }
        else {
            await this.PopulateScreen(pmreviewid);
        }
        this.bomasterdataservice.getList("1").then((res:any) => {
            this.departmentidList = res as bomasterdata[];
        });
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
            this.employeeidList = res as hrmsemployee[];
            if (this.formdata && this.formdata.pmreview && this.formdata.pmreview.employeeid) {
                this.employeeidoptionsEvent.emit(this.employeeidList);
                this.pmreviewForm.patchValue({
                    employeeid: this.formdata.pmreview.employeeid,
                    employeeiddesc: this.formdata.pmreview.employeeiddesc,
                });
            }
        }
        );
        this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
            this.reviewedbyList = res as hrmsemployee[];
            if (this.formdata && this.formdata.pmreview && this.formdata.pmreview.reviewedby) {
                this.reviewedbyoptionsEvent.emit(this.reviewedbyList);
                this.pmreviewForm.patchValue({
                    reviewedby: this.formdata.pmreview.reviewedby,
                    reviewedbydesc: this.formdata.pmreview.reviewedbydesc,
                });
            }
        }
        );
        this.reviewedby_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.reviewedbyList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.reviewedby_hrmsemployeesformatter = (result: any) => result.employeename;
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
            this.supervisedbyList = res as hrmsemployee[];
            if (this.formdata && this.formdata.pmreview && this.formdata.pmreview.supervisedby) {
                this.supervisedbyoptionsEvent.emit(this.supervisedbyList);
                this.pmreviewForm.patchValue({
                    supervisedby: this.formdata.pmreview.supervisedby,
                    supervisedbydesc: this.formdata.pmreview.supervisedbydesc,
                });
            }
        }
        );
        this.supervisedby_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.supervisedbyList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.supervisedby_hrmsemployeesformatter = (result: any) => result.employeename;
        this.configservice.getList("kpidecision").then((res:any) => this.decisionList = res as boconfigvalue[]);
        this.pmreviewForm.markAsUntouched();
        this.pmreviewForm.markAsPristine();
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail.employeeid && employeeidDetail) {

        }
    }

    onSelectedreviewedby(reviewedbyDetail: any) {
        if (reviewedbyDetail.reviewedby && reviewedbyDetail) {

        }
    }

    onSelectedsupervisedby(supervisedbyDetail: any) {
        if (supervisedbyDetail.supervisedby && supervisedbyDetail) {

        }
    }




    resetForm() {
        if (this.pmreviewForm != null)
            this.pmreviewForm.reset();
        this.pmreviewForm.patchValue({
        });
        setTimeout(() => {
            this.pmreviewservice.pmreviewdetails = [];
            this.pmreviewdetailsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.pmreviewForm.controls[key] != null) {
                        this.pmreviewForm.patchValue(json);
                        this.pmreviewForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
    }

    onDelete() {
        let reviewid = this.pmreviewForm.get('reviewid')!.value;
        if (reviewid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.pmreviewservice.deletepmreview(reviewid).then((res:any) => {
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
        this.pmreviewForm.patchValue({
            reviewid: null
        });
        if (this.pmreviewservice.formData.reviewid != null) this.pmreviewservice.formData.reviewid = null;
        for (let i = 0; i < this.pmreviewservice.pmreviewdetails.length; i++) {
            this.pmreviewservice.pmreviewdetails[i].reviewdetailid = null;
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
    departmentidonChange(evt:any) {
        let e = evt!.value;
        this.pmreviewForm.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    employeeidonChange(evt:any) {
        let e = evt!.value;
    }
    reviewedbyonChange(evt:any) {
        let e = evt!.value;
    }
    supervisedbyonChange(evt:any) {
        let e = evt!.value;
    }
    decisiononChange(evt:any) {
        let e = evt!.value;
        this.pmreviewForm.patchValue({ decisiondesc: evt.options[evt.options.selectedIndex].text });
    }
    async PopulateScreen(pmreviewid: any) {
        this.pmreviewservice.getpmreviewsByID(parseInt(pmreviewid)).then((res:any) => {

            this.formdata = res;
            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.pmreviewForm.patchValue({
            reviewid: res.pmreview.reviewid,
            departmentid: res.pmreview.departmentid,
            departmentiddesc: res.pmreview.departmentiddesc,
            designationid: res.pmreview.designationid,
            employeeid: res.pmreview.employeeid,
            employeeiddesc: res.pmreview.employeeiddesc,
            fromdate: this.ngbDateParserFormatter.parse(res.pmreview.fromdate),
            todate: this.ngbDateParserFormatter.parse(res.pmreview.todate),
            reviewdate: this.ngbDateParserFormatter.parse(res.pmreview.reviewdate),
            reviewedby: res.pmreview.reviewedby,
            reviewedbydesc: res.pmreview.reviewedbydesc,
            supervisedby: res.pmreview.supervisedby,
            supervisedbydesc: res.pmreview.supervisedbydesc,
            reviewerremarks: res.pmreview.reviewerremarks,
            employeeremarks: res.pmreview.employeeremarks,
            decision: res.pmreview.decision,
            decisiondesc: res.pmreview.decisiondesc,
            status: res.pmreview.status,
            statusdesc: res.pmreview.statusdesc,
        });
        this.pmreviewdetailsvisiblelist = res.pmreviewdetailsvisiblelist;
        this.pmreviewservice.pmreviewdetails = res.pmreviewdetail;
        this.SetpmreviewdetailsTableConfig();
        this.pmreviewdetailsLoadTable();
        setTimeout(() => {
            this.SetpmreviewdetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.pmreviewForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.pmreviewservice.formData = this.pmreviewForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.pmreviewForm.controls[key] != null) {
                        this.pmreviewservice.formData[key] = this.pmreviewForm.controls[key]!.value;
                    }
                }
            }
        }
        this.pmreviewservice.formData.fromdate = new Date(this.ngbDateParserFormatter.format(this.pmreviewForm.get('fromdate')!.value) + '  UTC');
        this.pmreviewservice.formData.todate = new Date(this.ngbDateParserFormatter.format(this.pmreviewForm.get('todate')!.value) + '  UTC');
        this.pmreviewservice.formData.reviewdate = new Date(this.ngbDateParserFormatter.format(this.pmreviewForm.get('reviewdate')!.value) + '  UTC');
        this.pmreviewservice.formData.DeletedpmreviewdetailIDs = this.DeletedpmreviewdetailIDs;
        console.log(this.pmreviewservice.formData);
        this.pmreviewservice.saveOrUpdatepmreviews().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.pmreviewservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.pmreview);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.pmreviewForm.markAsUntouched();
                this.pmreviewForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditdepartmentid(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.departmentidList = res as bomasterdata[]);
        });*/
    }

    AddOrEditemployeeid(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        });*/
    }

    AddOrEditreviewedby(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.reviewedbyList = res as hrmsemployee[]);
        });*/
    }

    AddOrEditsupervisedby(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.supervisedbyList = res as hrmsemployee[]);
        });*/
    }

    AddOrEditpmreviewdetail(event, reviewdetailid, reviewid) {
        this.dialog.open(pmreviewdetailComponent,
            {
                data: { reviewdetailid, reviewid, visiblelist: this.pmreviewdetailsvisiblelist, hidelist: this.pmreviewdetailshidelist, ScreenType: 2 },
                header: 'Details'
            }
        ).onClose.subscribe((res:any) => {
            if (reviewdetailid != res.reviewdetailid || res.reviewdetailid == null) {
                this.pmreviewdetailssource.add(res);
                this.pmreviewdetailssource.refresh();
            }
            else {
                this.pmreviewdetailssource.update(event.data, res);
            }
        });
    }
    onDeletepmreviewdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedpmreviewdetailIDs += childID + ",";
        this.pmreviewservice.pmreviewdetails.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes pmreviewdetails
    pmreviewdetailssettings: any;
    pmreviewdetailssource: any;

    showpmreviewdetailsCheckbox() {
        debugger;
        if (this.tblpmreviewdetailssource.settings['selectMode'] == 'multi') this.tblpmreviewdetailssource.settings['selectMode'] = 'single';
        else
            this.tblpmreviewdetailssource.settings['selectMode'] = 'multi';
        this.tblpmreviewdetailssource.initGrid();
    }
    deletepmreviewdetailsAll() {
        this.tblpmreviewdetailssource.settings['selectMode'] = 'single';
    }
    showpmreviewdetailsFilter() {
        setTimeout(() => {
            this.SetpmreviewdetailsTableddConfig();
        });
        if (this.tblpmreviewdetailssource.settings != null) this.tblpmreviewdetailssource.settings['hideSubHeader'] = !this.tblpmreviewdetailssource.settings['hideSubHeader'];
        this.tblpmreviewdetailssource.initGrid();
    }
    showpmreviewdetailsInActive() {
    }
    enablepmreviewdetailsInActive() {
    }
    async SetpmreviewdetailsTableddConfig() {
        if (!this.bfilterPopulatepmreviewdetails) {

            this.bomasterdataservice.getList("1").then((res:any) => {
                var datadepartmentid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmreviewdetailsdepartmentid3.push(defaultobj);
                for (let i = 0; i < datadepartmentid2.length; i++) {
                    var obj = { value: datadepartmentid2[i].masterdataid, title: datadepartmentid2[i].masterdatadescription };
                    this.datapmreviewdetailsdepartmentid3.push(obj);
                }
                var clone = this.clone(this.tblpmreviewdetailssource.settings);
                clone.columns['departmentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsdepartmentid3)), }, };
                clone.columns['departmentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsdepartmentid3)), }, };
                this.tblpmreviewdetailssource.settings = clone;
                this.tblpmreviewdetailssource.initGrid();
            });

            this.configservice.getList("designation").then((res:any) => {
                var datadesignationid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmreviewdetailsdesignationid3.push(defaultobj);
                for (let i = 0; i < datadesignationid2.length; i++) {
                    var obj = { value: datadesignationid2[i].configkey, title: datadesignationid2[i].configtext };
                    this.datapmreviewdetailsdesignationid3.push(obj);
                }
                var clone = this.clone(this.tblpmreviewdetailssource.settings);
                if (clone.columns['designationid'] != undefined) clone.columns['designationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsdesignationid3)), }, };
                if (clone.columns['designationid'] != undefined) clone.columns['designationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsdesignationid3)), }, };
                this.tblpmreviewdetailssource.settings = clone;
                this.tblpmreviewdetailssource.initGrid();
            });

            this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
                var dataemployeeid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmreviewdetailsemployeeid3.push(defaultobj);
                for (let i = 0; i < dataemployeeid2.length; i++) {
                    var obj = { value: dataemployeeid2[i].employeeid, title: dataemployeeid2[i].employeename };
                    this.datapmreviewdetailsemployeeid3.push(obj);
                }
                var clone = this.clone(this.tblpmreviewdetailssource.settings);
                clone.columns['employeeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsemployeeid3)), }, };
                clone.columns['employeeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsemployeeid3)), }, };
                this.tblpmreviewdetailssource.settings = clone;
                this.tblpmreviewdetailssource.initGrid();
            });

            this.pmkpiservice.getpmkpisList().then((res:any) => {
                var datakpiid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmreviewdetailskpiid3.push(defaultobj);
                for (let i = 0; i < datakpiid2.length; i++) {
                    var obj = { value: datakpiid2[i].kpiid, title: datakpiid2[i].name };
                    this.datapmreviewdetailskpiid3.push(obj);
                }
                var clone = this.clone(this.tblpmreviewdetailssource.settings);
                clone.columns['kpiid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailskpiid3)), }, };
                clone.columns['kpiid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailskpiid3)), }, };
                this.tblpmreviewdetailssource.settings = clone;
                this.tblpmreviewdetailssource.initGrid();
            });

            this.configservice.getList("kpiformat").then((res:any) => {
                var dataformat2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmreviewdetailsformat3.push(defaultobj);
                for (let i = 0; i < dataformat2.length; i++) {
                    var obj = { value: dataformat2[i].configkey, title: dataformat2[i].configtext };
                    this.datapmreviewdetailsformat3.push(obj);
                }
                var clone = this.clone(this.tblpmreviewdetailssource.settings);
                if (clone.columns['format'] != undefined) clone.columns['format'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsformat3)), }, };
                if (clone.columns['format'] != undefined) clone.columns['format'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmreviewdetailsformat3)), }, };
                this.tblpmreviewdetailssource.settings = clone;
                this.tblpmreviewdetailssource.initGrid();
            });
        }
        this.bfilterPopulatepmreviewdetails = true;
    }
    async pmreviewdetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetpmreviewdetailsTableConfig() {
        this.pmreviewdetailssettings = {
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
                departmentid: {
                    title: 'Department',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmreviewdetailsdepartmentid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                designationid: {
                    title: 'Designation',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmreviewdetailsdesignationid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                employeeid: {
                    title: 'Employee',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmreviewdetailsemployeeid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                kpiid: {
                    title: 'K P I',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmreviewdetailskpiid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                name: {
                    title: 'Name',
                    type: '',
                    filter: true,
                },
                target: {
                    title: 'Target',
                    type: '',
                    filter: true,
                },
                actual: {
                    title: 'Actual',
                    type: '',
                    filter: true,
                },
                format: {
                    title: 'Format',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmreviewdetailsformat3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                employeescore: {
                    title: 'Employee Score',
                    type: 'number',
                    filter: true,
                },
                reviewerscore: {
                    title: 'Reviewer Score',
                    type: 'number',
                    filter: true,
                },
                reviewquestions: {
                    title: 'Review Questions',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                reviewanswers: {
                    title: 'Review Answers',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                recommendations: {
                    title: 'Recommendations',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    pmreviewdetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.pmreviewdetailsID) >= 0) {
            this.pmreviewdetailssource = new LocalDataSource();
            this.pmreviewdetailssource.load(this.pmreviewservice.pmreviewdetails as any as LocalDataSource);
            this.pmreviewdetailssource.setPaging(1, 20, true);
        }
    }
    pmreviewdetailsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditpmreviewdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditpmreviewdetail(event, event.data.reviewdetailid, this.formid);
                break;
            case 'delete':
                this.onDeletepmreviewdetail(event, event.data.reviewdetailid, ((this.pmreviewdetailssource.getPaging().page - 1) * this.pmreviewdetailssource.getPaging().perPage) + event.index);
                this.pmreviewdetailssource.refresh();
                break;
        }
    }
    pmreviewdetailsonDelete(obj) {
        let reviewdetailid = obj.data.reviewdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.pmreviewservice.deletepmreview(reviewdetailid).then((res:any) =>
                this.pmreviewdetailsLoadTable()
            );
        }
    }
    pmreviewdetailsPaging(val) {
        debugger;
        this.pmreviewdetailssource.setPaging(1, val, true);
    }
    handlepmreviewdetailsGridSelected(event) {
        this.pmreviewdetailsselectedindex = this.pmreviewservice.pmreviewdetails.findIndex(i => i.reviewdetailid === event.data.reviewdetailid);
    }
    IspmreviewdetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.pmreviewdetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes pmreviewdetails

}



