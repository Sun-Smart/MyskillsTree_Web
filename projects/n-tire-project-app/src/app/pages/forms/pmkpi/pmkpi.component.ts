import { pmkpiService } from './../../../service/pmkpi.service';
import { pmkpi } from './../../../model/pmkpi.model';
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
    selector: 'app-pmkpi',
    templateUrl: './pmkpi.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class pmkpiComponent implements OnInit {
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
    bfilterPopulatepmkpis: boolean = false;
    datapmkpiscategory3: any = [];
    datapmkpistype3: any = [];
    datapmkpisdepartmentid3: any = [];
    datapmkpisdesignationid3: any = [];
    datapmkpisfrequency3: any = [];
    datapmkpisformat3: any = [];
    pmkpiForm: FormGroup;
    categoryList: boconfigvalue[]=[];
    typeList: boconfigvalue[]=[];
    departmentidList: bomasterdata[];
    designationidList: boconfigvalue[]=[];
    frequencyList: boconfigvalue[]=[];
    formatList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    SESSIONUSERID: any;
    sessiondata: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private pmkpiservice: pmkpiService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bomasterdataservice: bomasterdataService,
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
        this.pmkpiForm = this.fb.group({
            kpiid: [null],
            code: [null],
            name: [null],
            description: [null],
            category: [null],
            categorydesc: [null],
            type: [null],
            typedesc: [null],
            departmentid: [null],
            departmentiddesc: [null],
            designationid: [null],
            designationiddesc: [null],
            frequency: [null],
            frequencydesc: [null],
            target: [null],
            format: [null],
            formatdesc: [null],
            weight: [null],
            measures: [null],
            reviewquestions: [null],
            redmaxscore: [null],
            ambermaxscore: [null],
            greenmaxscore: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.pmkpiForm.controls; }

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
        if (this.pmkpiForm.dirty && this.pmkpiForm.touched) {
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
        let pmkpi = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.kpiid != null) {
            pmkpi = this.data.kpiid;
        }
        else {
            pmkpi = this.currentRoute.snapshot.paramMap.get('id');
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
                    if (this.pmkpiForm.controls[key] != null) {
                        this.pmkpiForm.patchValue(json);
                        this.pmkpiForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = pmkpi;
        //this.sharedService.alert(pmkpi);
        if (pmkpi == null) {
            this.resetForm();
        }
        else {
            await this.PopulateScreen(pmkpi);
        }
        this.configservice.getList("kpicategory").then((res:any) => this.categoryList = res as boconfigvalue[]);
        this.configservice.getList("kpitype").then((res:any) => this.typeList = res as boconfigvalue[]);
        this.bomasterdataservice.getList("1").then((res:any) => {
            this.departmentidList = res as bomasterdata[];
        });
        this.configservice.getList("designation").then((res:any) => {
            debugger;
            this.designationidList = res as boconfigvalue[];
        }
        );
        this.configservice.getList("frequency").then((res:any) => this.frequencyList = res as boconfigvalue[]);
        this.configservice.getList("kpivalueformat").then((res:any) => this.formatList = res as boconfigvalue[]);
        this.pmkpiForm.markAsUntouched();
        this.pmkpiForm.markAsPristine();
    }



    resetForm() {
        if (this.pmkpiForm != null)
            this.pmkpiForm.reset();
        this.pmkpiForm.patchValue({
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
                    if (this.pmkpiForm.controls[key] != null) {
                        this.pmkpiForm.patchValue(json);
                        this.pmkpiForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
    }

    onDelete() {
        let kpiid = this.pmkpiForm.get('kpiid')!.value;
        if (kpiid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.pmkpiservice.deletepmkpi(kpiid).then((res:any) => {
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
        this.pmkpiForm.patchValue({
            kpiid: null
        });
        if (this.pmkpiservice.formData.kpiid != null) this.pmkpiservice.formData.kpiid = null;
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
    categoryonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
    }
    typeonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ typedesc: evt.options[evt.options.selectedIndex].text });
    }
    departmentidonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    designationidonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ designationiddesc: evt.options[evt.options.selectedIndex].text });
    }
    frequencyonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ frequencydesc: evt.options[evt.options.selectedIndex].text });
    }
    formatonChange(evt:any) {
        let e = evt!.value;
        this.pmkpiForm.patchValue({ formatdesc: evt.options[evt.options.selectedIndex].text });
    }
    async PopulateScreen(pmkpi: any) {
        this.pmkpiservice.getpmkpisByID(parseInt(pmkpi)).then((res:any) => {

            this.formdata = res;
            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.pmkpiForm.patchValue({
            kpiid: res.pmkpi.kpiid,
            code: res.pmkpi.code,
            name: res.pmkpi.name,
            description: res.pmkpi.description,
            category: res.pmkpi.category,
            categorydesc: res.pmkpi.categorydesc,
            type: res.pmkpi.type,
            typedesc: res.pmkpi.typedesc,
            departmentid: res.pmkpi.departmentid,
            departmentiddesc: res.pmkpi.departmentiddesc,
            designationid: res.pmkpi.designationid,
            designationiddesc: res.pmkpi.designationiddesc,
            frequency: res.pmkpi.frequency,
            frequencydesc: res.pmkpi.frequencydesc,
            target: res.pmkpi.target,
            format: res.pmkpi.format,
            formatdesc: res.pmkpi.formatdesc,
            weight: res.pmkpi.weight,
            measures: res.pmkpi.measures,
            reviewquestions: res.pmkpi.reviewquestions,
            redmaxscore: res.pmkpi.redmaxscore,
            ambermaxscore: res.pmkpi.ambermaxscore,
            greenmaxscore: res.pmkpi.greenmaxscore,
            status: res.pmkpi.status,
            statusdesc: res.pmkpi.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.pmkpiForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.pmkpiservice.formData = this.pmkpiForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.pmkpiForm.controls[key] != null) {
                        this.pmkpiservice.formData[key] = this.pmkpiForm.controls[key]!.value;
                    }
                }
            }
        }
        console.log(this.pmkpiservice.formData);
        this.pmkpiservice.saveOrUpdatepmkpis().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.pmkpiservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.pmkpi);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.pmkpiForm.markAsUntouched();
                this.pmkpiForm.markAsPristine();
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

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



