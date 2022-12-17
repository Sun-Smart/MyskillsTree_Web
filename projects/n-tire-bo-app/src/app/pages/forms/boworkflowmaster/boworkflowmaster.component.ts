import { boworkflowmasterService } from './../../../service/boworkflowmaster.service';
import { boworkflowmaster } from './../../../model/boworkflowmaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bomenumaster } from './../../../model/bomenumaster.model';
import { bomenumasterService } from './../../../service/bomenumaster.service';
//popups
import { systemtable } from './../../../model/systemtable.model';
import { systemtableService } from './../../../service/systemtable.service';
//popups
//detail table services
import { boworkflow } from './../../../model/boworkflow.model';
import { boworkflowComponent } from './../../../pages/forms/boworkflow/boworkflow.component';
//FK services
import { bousermaster, IbousermasterResponse } from './../../../model/bousermaster.model';
import { bousermasterComponent } from './../../../pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from './../../../service/bousermaster.service';
import { boworkflowstep } from './../../../model/boworkflowstep.model';
import { boworkflowstepComponent } from './../../../pages/forms/boworkflowstep/boworkflowstep.component';
//FK services
import { bodynamicform, IbodynamicformResponse } from './../../../model/bodynamicform.model';
import { bodynamicformComponent } from './../../../pages/forms/bodynamicform/bodynamicform.component';
import { bodynamicformService } from './../../../service/bodynamicform.service';
import { boworkflowstepService } from './../../../service/boworkflowstep.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
    selector: 'app-boworkflowmaster',
    templateUrl: './boworkflowmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowmasterComponent implements OnInit {
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
    bfilterPopulateboworkflowmasters: boolean = false;
    databoworkflowmastersmenucode3: any = [];
    databoworkflowmasterstablecode3: any = [];
    databoworkflowscurrentapproved3: any = [];
    databoworkflowsperformancestatus3: any = [];
    databoworkflowsworkflowstatus3: any = [];
    databoworkflowsperformancerating3: any = [];
    databoworkflowsstandardrating3: any = [];
    bfilterPopulateboworkflows: boolean = false;
    databoworkflowstepscustomfieldid3: any = [];
    databoworkflowstepstask3: any = [];
    databoworkflowstepsyesstep3: any = [];
    databoworkflowstepsnostep3: any = [];
    databoworkflowstepsparentid3: any = [];
    databoworkflowstepsworkflowuserfieldtype3: any = [];
    bfilterPopulateboworkflowsteps: boolean = false;
    @ViewChild('tblboworkflowssource', { static: false }) tblboworkflowssource: Ng2SmartTableComponent;
    @ViewChild('tblboworkflowstepssource', { static: false }) tblboworkflowstepssource: Ng2SmartTableComponent;
    boworkflowmasterForm: FormGroup;
    menucodeList: bomenumaster[];
    menucodeoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    menucode_bomenumastersForm: FormGroup;//autocomplete
    menucode_bomenumastersoptions: any;//autocomplete
    menucode_bomenumastersformatter: any;//autocomplete
    tablecodeList: systemtable[];
    tablecodeoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    tablecode_systemtablesForm: FormGroup;//autocomplete
    tablecode_systemtablesoptions: any;//autocomplete
    tablecode_systemtablesformatter: any;//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    sessiondata: any;



    boworkflowsvisiblelist: any;
    boworkflowshidelist: any;
    boworkflowstepsvisiblelist: any;
    boworkflowstepshidelist: any;

    DeletedboworkflowIDs: string = "";
    boworkflowsID: string = "1";
    boworkflowsselectedindex: any;
    DeletedboworkflowstepIDs: string = "";
    boworkflowstepsID: string = "2";
    boworkflowstepsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflowmasterservice: boworkflowmasterService,
        private bousermasterservice: bousermasterService,
        private bodynamicformservice: bodynamicformService,
        private boworkflowstepservice: boworkflowstepService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bomenumasterservice: bomenumasterService,
        private systemtableservice: systemtableService,
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
        this.boworkflowmasterForm = this.fb.group({
            pk: [null],
            workflowmasterid: [null],
            description: [null],
            menucode: [null],
            menucodedesc: [null],
            tablecode: [null],
            tablecodedesc: [null],
            workflowhtml: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boworkflowmasterForm.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarvisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boworkflowmasterForm.dirty && this.boworkflowmasterForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowmasterid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');

        debugger;
        let boworkflowmasterid = null;

        //getting data - from list page, from other screen through dialog
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
            this.maindata = this.data;
        }
        if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        //if view button(eye) is clicked
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
            this.viewhtml = this.sessionService.getViewHtml();
        }
        else if (this.data != null && this.data.pkcol != null) {
            this.pkcol = this.data.pkcol;
        }
        else {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        //copy the data from previous dialog 
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = boworkflowmasterid;
        //this.sharedService.alert(boworkflowmasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.SetboworkflowsTableConfig();
            setTimeout(() => {
                this.SetboworkflowsTableddConfig();
            });

            this.SetboworkflowstepsTableConfig();
            setTimeout(() => {
                this.SetboworkflowstepsTableddConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.bomenumasterservice.getbomenumastersList().then(res => {
            this.menucodeList = res as bomenumaster[];
            if (this.boworkflowmasterservice.formData && this.boworkflowmasterservice.formData.menucode) {
                this.menucodeoptionsEvent.emit(this.menucodeList);
                this.boworkflowmasterForm.patchValue({
                    menucode: this.boworkflowmasterservice.formData.menucode,
                    menucodedesc: this.boworkflowmasterservice.formData.menucodedesc,
                });
            }
            {
                let arrmenucode = this.menucodeList.filter(v => v.menucode == this.boworkflowmasterForm.get('menucode').value);
                let objmenucode;
                if (arrmenucode.length > 0) objmenucode = arrmenucode[0];
                if (objmenucode) {
                }
            }
        }
        ).catch((err) => { console.log(err); });
        this.menucode_bomenumastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.menucodeList.filter(v => v.menudescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.menucode_bomenumastersformatter = (result: any) => result.menudescription;
        this.systemtableservice.getsystemtablesList().then(res => {
            this.tablecodeList = res as systemtable[];
            if (this.boworkflowmasterservice.formData && this.boworkflowmasterservice.formData.tablecode) {
                this.tablecodeoptionsEvent.emit(this.tablecodeList);
                this.boworkflowmasterForm.patchValue({
                    tablecode: this.boworkflowmasterservice.formData.tablecode,
                    tablecodedesc: this.boworkflowmasterservice.formData.tablecodedesc,
                });
            }
            {
                let arrtablecode = this.tablecodeList.filter(v => v.tablecode == this.boworkflowmasterForm.get('tablecode').value);
                let objtablecode;
                if (arrtablecode.length > 0) objtablecode = arrtablecode[0];
                if (objtablecode) {
                }
            }
        }
        ).catch((err) => { console.log(err); });
        this.tablecode_systemtablesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.tablecodeList.filter(v => v.tablename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.tablecode_systemtablesformatter = (result: any) => result.tablename;

        //autocomplete
        this.boworkflowmasterservice.getboworkflowmastersList().then(res => {
            this.pkList = res as boworkflowmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { console.log(err); });
        this.pk_tbloptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.pk_tblformatter = (result: any) => result.pkcol;

        //setting the flag that the screen is not touched 
        this.boworkflowmasterForm.markAsUntouched();
        this.boworkflowmasterForm.markAsPristine();
    }
    onSelectedmenucode(menucodeDetail: any) {
        if (menucodeDetail.menucode && menucodeDetail) {
            this.boworkflowmasterForm.patchValue({
                menucode: menucodeDetail.menucode,
                menucodedesc: menucodeDetail.menudescription,

            });

        }
    }

    onSelectedtablecode(tablecodeDetail: any) {
        if (tablecodeDetail.tablecode && tablecodeDetail) {
            this.boworkflowmasterForm.patchValue({
                tablecode: tablecodeDetail.tablecode,
                tablecodedesc: tablecodeDetail.tablename,

            });

        }
    }




    resetForm() {
        if (this.boworkflowmasterForm != null)
            this.boworkflowmasterForm.reset();
        this.boworkflowmasterForm.patchValue({
        });
        setTimeout(() => {
            this.boworkflowmasterservice.boworkflows = [];
            this.boworkflowsLoadTable();
            this.boworkflowmasterservice.boworkflowsteps = [];
            this.boworkflowstepsLoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let workflowmasterid = this.boworkflowmasterForm.get('workflowmasterid').value;
        if (workflowmasterid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowmasterservice.deleteboworkflowmaster(workflowmasterid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflowmasterForm.patchValue({
            workflowmasterid: null
        });
        if (this.boworkflowmasterservice.formData.workflowmasterid != null) this.boworkflowmasterservice.formData.workflowmasterid = null;
        for (let i = 0; i < this.boworkflowmasterservice.boworkflows.length; i++) {
            this.boworkflowmasterservice.boworkflows[i].workflowid = null;
        }
        for (let i = 0; i < this.boworkflowmasterservice.boworkflowsteps.length; i++) {
            this.boworkflowmasterservice.boworkflowsteps[i].workflowstepid = null;
        }
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
                    else if (ctrltype == "string") {
                        this.boworkflowmasterForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowmasterForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowmasterForm.controls[key] != undefined) this.boworkflowmasterForm.controls[key].disable({ onlySelf: true });
                        }
                    }
                }
            }
        }
    }
    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || this.maindata.save == true) {
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
        if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    workflowmasteridonChange(evt: any) {
        let e = evt.value;
    }
    descriptiononChange(evt: any) {
        let e = evt.value;
    }
    menucodeonChange(evt: any) {
        let e = evt.value;
    }
    tablecodeonChange(evt: any) {
        let e = evt.value;
    }
    workflowhtmlonChange(evt: any) {
        let e = evt.value;
    }
    statusonChange(evt: any) {
        let e = evt.value;
    }

    async PopulateScreen(pkcol: any) {
        this.boworkflowmasterservice.getboworkflowmastersByEID(pkcol).then(res => {

            this.boworkflowmasterservice.formData = res.boworkflowmaster;
            let formproperty = res.boworkflowmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boworkflowmaster.pkcol;
            this.formid = res.boworkflowmaster.workflowmasterid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formid = res.boworkflowmaster.workflowmasterid;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowmasterForm.patchValue({
            workflowmasterid: res.boworkflowmaster.workflowmasterid,
            description: res.boworkflowmaster.description,
            menucode: res.boworkflowmaster.menucode,
            menucodedesc: res.boworkflowmaster.menucodedesc,
            tablecode: res.boworkflowmaster.tablecode,
            tablecodedesc: res.boworkflowmaster.tablecodedesc,
            workflowhtml: res.boworkflowmaster.workflowhtml,
            status: res.boworkflowmaster.status,
            statusdesc: res.boworkflowmaster.statusdesc,
        });
        this.boworkflowsvisiblelist = res.boworkflowsvisiblelist;
        this.boworkflowstepsvisiblelist = res.boworkflowstepsvisiblelist;
        //Child Tables if any
        this.boworkflowmasterservice.boworkflows = res.boworkflows;
        this.SetboworkflowsTableConfig();
        this.boworkflowsLoadTable();
        setTimeout(() => {
            this.SetboworkflowsTableddConfig();
        });
        this.boworkflowmasterservice.boworkflowsteps = res.boworkflowsteps;
        this.SetboworkflowstepsTableConfig();
        this.boworkflowstepsLoadTable();
        setTimeout(() => {
            this.SetboworkflowstepsTableddConfig();
        });
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflowmasterForm.controls) {
            if (this.boworkflowmasterForm.controls[key] != null) {
                ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boworkflowmasterForm.controls[key].value);
            }
        }
        return ret;
    }

    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boworkflowmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.boworkflowmasterForm.value;
        console.log(obj);
        this.dialogRef.close(obj);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
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

    async onSubmitData(bclear: any) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        Object.keys(this.boworkflowmasterForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.boworkflowmasterForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
                });
            }
        });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boworkflowmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.boworkflowmasterservice.formData = this.boworkflowmasterForm.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boworkflowmasterForm.controls[key] != null) {
                        this.boworkflowmasterservice.formData[key] = this.boworkflowmasterForm.controls[key].value;
                    }
                }
            }
        }
        this.boworkflowmasterservice.formData.DeletedboworkflowIDs = this.DeletedboworkflowIDs;
        this.boworkflowmasterservice.formData.DeletedboworkflowstepIDs = this.DeletedboworkflowstepIDs;
        console.log(this.boworkflowmasterservice.formData);
        this.boworkflowmasterservice.formData = this.boworkflowmasterForm.value;
        this.boworkflowmasterservice.saveOrUpdateboworkflowmasters().subscribe(
            async res => {
                if (this.boworkflowssource.data) {
                    for (let i = 0; i < this.boworkflowssource.data.length; i++) {
                        if (this.boworkflowssource.data[i].fileattachmentlist) await this.sharedService.upload(this.boworkflowssource.data[i].fileattachmentlist);
                    }
                }
                if (this.boworkflowstepssource.data) {
                    for (let i = 0; i < this.boworkflowstepssource.data.length; i++) {
                        if (this.boworkflowstepssource.data[i].fileattachmentlist) await this.sharedService.upload(this.boworkflowstepssource.data[i].fileattachmentlist);
                    }
                }
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                document.getElementById("contentArea1").scrollTop = 0;
                if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
                    this.dialogRef.close((res as any).result.value.boworkflowmaster);
                    return;
                }
                else {
                    document.getElementById("contentArea1").scrollTop = 0;
                }
                this.boworkflowmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.boworkflowmaster);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflowmasterForm.markAsUntouched();
                this.boworkflowmasterForm.markAsPristine();
            },
            err => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer

    AddOrEditmenucode(menucode) {
        /*let ScreenType='2';
        this.dialog.open(bomenumasterComponent, 
        {
        data: {menucode:this.boworkflowmasterForm.get('menucode').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }


    AddOrEdittablecode(tablecode) {
        /*let ScreenType='2';
        this.dialog.open(systemtableComponent, 
        {
        data: {tablecode:this.boworkflowmasterForm.get('tablecode').value, ScreenType:2 }
        } 
        ).onClose.subscribe(res => {
        });*/
    }


    AddOrEditboworkflow(event: any, workflowid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        this.dialog.open(boworkflowComponent,
            {
                data: { showview: this.showview, save: false, event, workflowid, workflowmasterid, visiblelist: this.boworkflowsvisiblelist, hidelist: this.boworkflowshidelist, ScreenType: 2 },
                header: 'Workflow'
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    this.boworkflowssource.add(res);
                    this.boworkflowssource.refresh();
                }
                else {
                    this.boworkflowssource.update(event.data, res);
                }
            }
        });
    }

    onDeleteboworkflow(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedboworkflowIDs += childID + ",";
        this.boworkflowmasterservice.boworkflows.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEditboworkflowstep(event: any, workflowstepid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        this.dialog.open(boworkflowstepComponent,
            {
                data: { showview: this.showview, save: false, event, workflowstepid, workflowmasterid, visiblelist: this.boworkflowstepsvisiblelist, hidelist: this.boworkflowstepshidelist, ScreenType: 2 },
                header: 'Workflow Steps'
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    this.boworkflowstepssource.add(res);
                    this.boworkflowstepssource.refresh();
                }
                else {
                    this.boworkflowstepssource.update(event.data, res);
                }
            }
        });
    }

    onDeleteboworkflowstep(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedboworkflowstepIDs += childID + ",";
        this.boworkflowmasterservice.boworkflowsteps.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boworkflows
    boworkflowssettings: any;
    boworkflowssource: any;

    showboworkflowsCheckbox() {
        debugger;
        if (this.tblboworkflowssource.settings['selectMode'] == 'multi') this.tblboworkflowssource.settings['selectMode'] = 'single';
        else
            this.tblboworkflowssource.settings['selectMode'] = 'multi';
        this.tblboworkflowssource.initGrid();
    }
    deleteboworkflowsAll() {
        this.tblboworkflowssource.settings['selectMode'] = 'single';
    }
    showboworkflowsFilter() {
        setTimeout(() => {
            this.SetboworkflowsTableddConfig();
        });
        if (this.tblboworkflowssource.settings != null) this.tblboworkflowssource.settings['hideSubHeader'] = !this.tblboworkflowssource.settings['hideSubHeader'];
        this.tblboworkflowssource.initGrid();
    }
    showboworkflowsInActive() {
    }
    enableboworkflowsInActive() {
    }
    async SetboworkflowsTableddConfig() {
        if (!this.bfilterPopulateboworkflows) {

            this.bousermasterservice.getbousermastersList().then(res => {
                var datacurrentapproved2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowscurrentapproved3.push(defaultobj);
                for (let i = 0; i < datacurrentapproved2.length; i++) {
                    var obj = { value: datacurrentapproved2[i].userid, title: datacurrentapproved2[i].username };
                    this.databoworkflowscurrentapproved3.push(obj);
                }
                if ((this.tblboworkflowssource.settings as any).columns['currentapproved']) {
                    (this.tblboworkflowssource.settings as any).columns['currentapproved'].editor.config.list = JSON.parse(JSON.stringify(this.databoworkflowscurrentapproved3));
                    this.tblboworkflowssource.initGrid();
                }
            });

            this.configservice.getList("standardrating").then(res => {
                var datastandardrating2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowsstandardrating3.push(defaultobj);
                for (let i = 0; i < datastandardrating2.length; i++) {
                    var obj = { value: datastandardrating2[i].configkey, title: datastandardrating2[i].configtext };
                    this.databoworkflowsstandardrating3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowssource.settings);
                if (clone.columns['standardrating'] != undefined) clone.columns['standardrating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsstandardrating3)), }, };
                if (clone.columns['standardrating'] != undefined) clone.columns['standardrating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsstandardrating3)), }, };
                this.tblboworkflowssource.settings = clone;
                this.tblboworkflowssource.initGrid();
            });

            this.configservice.getList("performancerating").then(res => {
                var dataperformancerating2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowsperformancerating3.push(defaultobj);
                for (let i = 0; i < dataperformancerating2.length; i++) {
                    var obj = { value: dataperformancerating2[i].configkey, title: dataperformancerating2[i].configtext };
                    this.databoworkflowsperformancerating3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowssource.settings);
                if (clone.columns['performancerating'] != undefined) clone.columns['performancerating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsperformancerating3)), }, };
                if (clone.columns['performancerating'] != undefined) clone.columns['performancerating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsperformancerating3)), }, };
                this.tblboworkflowssource.settings = clone;
                this.tblboworkflowssource.initGrid();
            });

            this.configservice.getList("performancestatus").then(res => {
                var dataperformancestatus2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowsperformancestatus3.push(defaultobj);
                for (let i = 0; i < dataperformancestatus2.length; i++) {
                    var obj = { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext };
                    this.databoworkflowsperformancestatus3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowssource.settings);
                if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsperformancestatus3)), }, };
                if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsperformancestatus3)), }, };
                this.tblboworkflowssource.settings = clone;
                this.tblboworkflowssource.initGrid();
            });

            this.configservice.getList("workflowstatus").then(res => {
                var dataworkflowstatus2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowsworkflowstatus3.push(defaultobj);
                for (let i = 0; i < dataworkflowstatus2.length; i++) {
                    var obj = { value: dataworkflowstatus2[i].configkey, title: dataworkflowstatus2[i].configtext };
                    this.databoworkflowsworkflowstatus3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowssource.settings);
                if (clone.columns['workflowstatus'] != undefined) clone.columns['workflowstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsworkflowstatus3)), }, };
                if (clone.columns['workflowstatus'] != undefined) clone.columns['workflowstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowsworkflowstatus3)), }, };
                this.tblboworkflowssource.settings = clone;
                this.tblboworkflowssource.initGrid();
            });
        }
        this.bfilterPopulateboworkflows = true;
    }
    async boworkflowsbeforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    SetboworkflowsTableConfig() {
        this.boworkflowssettings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
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
                currentstepno: {
                    title: 'Current Step No',
                    type: 'number',
                    filter: true,
                },
                modulename: {
                    title: 'Module Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                pkvalue: {
                    title: 'P K Value',
                    type: 'number',
                    filter: true,
                },
                currentapproved: {
                    title: 'Current Approved',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: '', reportcode: '', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowscurrentapproved3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                currentapprovers: {
                    title: 'Current Approvers',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                nextapprovers: {
                    title: 'Next Approvers',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                assigneddatetime: {
                    title: 'Assigned Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                closeddatetime: {
                    title: 'Closed Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                standardrating: {
                    title: 'Standard Rating',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowsstandardrating3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                performancerating: {
                    title: 'Performance Rating',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowsperformancerating3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                performancestatus: {
                    title: 'Performance Status',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowsperformancestatus3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                exception: {
                    title: 'Exception',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                approvedusers: {
                    title: 'Approved Users',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                approvedcondition: {
                    title: 'Approved Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                tathours: {
                    title: 'T A T Hours',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
                totalactualtime: {
                    title: 'Total Actual Time',
                    type: '',
                    filter: true,
                    renderComponent: durationComponent,
                    editor: {
                        type: 'custom',
                        component: durationComponent,
                    },
                },
                processid: {
                    title: 'Process',
                    type: 'number',
                    filter: true,
                },
                workflowdetails: {
                    title: 'Work Flow Details',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseComment(cell);
                        return ret;
                    },
                },
                history: {
                    title: 'History',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                lastapprover: {
                    title: 'Last Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
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
                        let ret = this.sharedService.getCustomValue(cell);
                        return ret;
                    },
                },
                attachment: {
                    title: 'Attachment',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getAttachmentValue(cell);
                        return ret;
                    },
                },
                workflowstatus: {
                    title: 'Work Flow Status',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowsworkflowstatus3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    boworkflowsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsID) >= 0) {
            this.boworkflowssource = new LocalDataSource();
            this.boworkflowssource.load(this.boworkflowmasterservice.boworkflows as any as LocalDataSource);
            this.boworkflowssource.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boworkflowsroute(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmasterservice.boworkflows.length == 0)
    {
        this.tblboworkflowssource.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflow();
        this.boworkflowmasterservice.boworkflows.push(obj);
        this.boworkflowssource.refresh();
        if ((this.boworkflowmasterservice.boworkflows.length / this.boworkflowssource.getPaging().perPage).toFixed(0) + 1 != this.boworkflowssource.getPaging().page)
        {
            this.boworkflowssource.setPage((this.boworkflowmasterservice.boworkflows.length / this.boworkflowssource.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tblboworkflowssource.grid.edit(this.tblboworkflowssource.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.boworkflowssource.data.indexOf(event.data);
    this.onDeleteboworkflow(event,event.data.workflowid,((this.boworkflowssource.getPaging().page-1) *this.boworkflowssource.getPaging().perPage)+index);
    this.boworkflowssource.refresh();
    break;
    }
    }
    
    */
    boworkflowsroute(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditboworkflow(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditboworkflow(event, event.data.workflowid, this.formid);
                break;
            case 'delete':
                this.onDeleteboworkflow(event, event.data.workflowid, ((this.boworkflowssource.getPaging().page - 1) * this.boworkflowssource.getPaging().perPage) + event.index);
                this.boworkflowssource.refresh();
                break;
        }
    }
    boworkflowsonDelete(obj) {
        let workflowid = obj.data.workflowid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmasterservice.deleteboworkflowmaster(workflowid).then(res =>
                this.boworkflowsLoadTable()
            );
        }
    }
    boworkflowsPaging(val) {
        debugger;
        this.boworkflowssource.setPaging(1, val, true);
    }

    handleboworkflowsGridSelected(event: any) {
        this.boworkflowsselectedindex = this.boworkflowmasterservice.boworkflows.findIndex(i => i.workflowid === event.data.workflowid);
    }
    IsboworkflowsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boworkflows
    //start of Grid Codes boworkflowsteps
    boworkflowstepssettings: any;
    boworkflowstepssource: any;

    showboworkflowstepsCheckbox() {
        debugger;
        if (this.tblboworkflowstepssource.settings['selectMode'] == 'multi') this.tblboworkflowstepssource.settings['selectMode'] = 'single';
        else
            this.tblboworkflowstepssource.settings['selectMode'] = 'multi';
        this.tblboworkflowstepssource.initGrid();
    }
    deleteboworkflowstepsAll() {
        this.tblboworkflowstepssource.settings['selectMode'] = 'single';
    }
    showboworkflowstepsFilter() {
        setTimeout(() => {
            this.SetboworkflowstepsTableddConfig();
        });
        if (this.tblboworkflowstepssource.settings != null) this.tblboworkflowstepssource.settings['hideSubHeader'] = !this.tblboworkflowstepssource.settings['hideSubHeader'];
        this.tblboworkflowstepssource.initGrid();
    }
    showboworkflowstepsInActive() {
    }
    enableboworkflowstepsInActive() {
    }
    async SetboworkflowstepsTableddConfig() {
        if (!this.bfilterPopulateboworkflowsteps) {

            this.configservice.getList("workflowtask").then(res => {
                var datatask2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepstask3.push(defaultobj);
                for (let i = 0; i < datatask2.length; i++) {
                    var obj = { value: datatask2[i].configkey, title: datatask2[i].configtext };
                    this.databoworkflowstepstask3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowstepssource.settings);
                if (clone.columns['task'] != undefined) clone.columns['task'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowstepstask3)), }, };
                if (clone.columns['task'] != undefined) clone.columns['task'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowstepstask3)), }, };
                this.tblboworkflowstepssource.settings = clone;
                this.tblboworkflowstepssource.initGrid();
            });

            this.boworkflowstepservice.getboworkflowstepsList().then(res => {
                var datayesstep2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepsyesstep3.push(defaultobj);
                for (let i = 0; i < datayesstep2.length; i++) {
                    var obj = { value: datayesstep2[i].workflowstepid, title: datayesstep2[i].stepname };
                    this.databoworkflowstepsyesstep3.push(obj);
                }
                if ((this.tblboworkflowstepssource.settings as any).columns['yesstep']) {
                    (this.tblboworkflowstepssource.settings as any).columns['yesstep'].editor.config.list = JSON.parse(JSON.stringify(this.databoworkflowstepsyesstep3));
                    this.tblboworkflowstepssource.initGrid();
                }
            });

            this.boworkflowstepservice.getboworkflowstepsList().then(res => {
                var datanostep2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepsnostep3.push(defaultobj);
                for (let i = 0; i < datanostep2.length; i++) {
                    var obj = { value: datanostep2[i].workflowstepid, title: datanostep2[i].stepname };
                    this.databoworkflowstepsnostep3.push(obj);
                }
                if ((this.tblboworkflowstepssource.settings as any).columns['nostep']) {
                    (this.tblboworkflowstepssource.settings as any).columns['nostep'].editor.config.list = JSON.parse(JSON.stringify(this.databoworkflowstepsnostep3));
                    this.tblboworkflowstepssource.initGrid();
                }
            });

            this.configservice.getList("workflowuserfieldtype").then(res => {
                var dataworkflowuserfieldtype2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepsworkflowuserfieldtype3.push(defaultobj);
                for (let i = 0; i < dataworkflowuserfieldtype2.length; i++) {
                    var obj = { value: dataworkflowuserfieldtype2[i].configkey, title: dataworkflowuserfieldtype2[i].configtext };
                    this.databoworkflowstepsworkflowuserfieldtype3.push(obj);
                }
                var clone = this.sharedService.clone(this.tblboworkflowstepssource.settings);
                if (clone.columns['workflowuserfieldtype'] != undefined) clone.columns['workflowuserfieldtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowstepsworkflowuserfieldtype3)), }, };
                if (clone.columns['workflowuserfieldtype'] != undefined) clone.columns['workflowuserfieldtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databoworkflowstepsworkflowuserfieldtype3)), }, };
                this.tblboworkflowstepssource.settings = clone;
                this.tblboworkflowstepssource.initGrid();
            });

            this.boworkflowstepservice.getboworkflowstepsList().then(res => {
                var dataparentid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepsparentid3.push(defaultobj);
                for (let i = 0; i < dataparentid2.length; i++) {
                    var obj = { value: dataparentid2[i].workflowstepid, title: dataparentid2[i].stepname };
                    this.databoworkflowstepsparentid3.push(obj);
                }
                if ((this.tblboworkflowstepssource.settings as any).columns['parentid']) {
                    (this.tblboworkflowstepssource.settings as any).columns['parentid'].editor.config.list = JSON.parse(JSON.stringify(this.databoworkflowstepsparentid3));
                    this.tblboworkflowstepssource.initGrid();
                }
            });

            this.bodynamicformservice.getbodynamicformsList().then(res => {
                var datacustomfieldid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.databoworkflowstepscustomfieldid3.push(defaultobj);
                for (let i = 0; i < datacustomfieldid2.length; i++) {
                    var obj = { value: datacustomfieldid2[i].formid, title: datacustomfieldid2[i].tableiddesc };
                    this.databoworkflowstepscustomfieldid3.push(obj);
                }
                if ((this.tblboworkflowstepssource.settings as any).columns['customfieldid']) {
                    (this.tblboworkflowstepssource.settings as any).columns['customfieldid'].editor.config.list = JSON.parse(JSON.stringify(this.databoworkflowstepscustomfieldid3));
                    this.tblboworkflowstepssource.initGrid();
                }
            });
        }
        this.bfilterPopulateboworkflowsteps = true;
    }
    async boworkflowstepsbeforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    SetboworkflowstepsTableConfig() {
        this.boworkflowstepssettings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
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
                stepno: {
                    title: 'Step No',
                    type: 'number',
                    filter: true,
                },
                stepname: {
                    title: 'Step Name',
                    type: '',
                    filter: true,
                },
                tat: {
                    title: 'T A T',
                    type: '',
                    filter: true,
                },
                task: {
                    title: 'Task',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepstask3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                condition: {
                    title: 'Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                yesstep: {
                    title: 'Yes Step',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: '', reportcode: '', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepsyesstep3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                nostep: {
                    title: 'No Step',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: '', reportcode: '', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepsnostep3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                approver: {
                    title: 'Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                workflowuserfieldtype: {
                    title: 'Work Flow User Field Type',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepsworkflowuserfieldtype3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                workflowuserfieldname: {
                    title: 'Work Flow User Field Name',
                    type: '',
                    filter: true,
                },
                parentid: {
                    title: 'Parent',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: '', reportcode: '', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepsparentid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                noedittransaction: {
                    title: 'No Edit Transaction',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                autoapproval: {
                    title: 'Auto Approval',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                autodenial: {
                    title: 'Auto Denial',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                waitduration: {
                    title: 'Wait Duration',
                    type: '',
                    filter: true,
                },
                remainderduration: {
                    title: 'Remainder Duration',
                    type: '',
                    filter: true,
                },
                escalationuser: {
                    title: 'Escalation User',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                customfieldid: {
                    title: 'Custom Field',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.databoworkflowstepscustomfieldid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    boworkflowstepsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowstepsID) >= 0) {
            this.boworkflowstepssource = new LocalDataSource();
            this.boworkflowstepssource.load(this.boworkflowmasterservice.boworkflowsteps as any as LocalDataSource);
            this.boworkflowstepssource.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boworkflowstepsroute(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmasterservice.boworkflowsteps.length == 0)
    {
        this.tblboworkflowstepssource.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflowstep();
        this.boworkflowmasterservice.boworkflowsteps.push(obj);
        this.boworkflowstepssource.refresh();
        if ((this.boworkflowmasterservice.boworkflowsteps.length / this.boworkflowstepssource.getPaging().perPage).toFixed(0) + 1 != this.boworkflowstepssource.getPaging().page)
        {
            this.boworkflowstepssource.setPage((this.boworkflowmasterservice.boworkflowsteps.length / this.boworkflowstepssource.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tblboworkflowstepssource.grid.edit(this.tblboworkflowstepssource.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.boworkflowstepssource.data.indexOf(event.data);
    this.onDeleteboworkflowstep(event,event.data.workflowstepid,((this.boworkflowstepssource.getPaging().page-1) *this.boworkflowstepssource.getPaging().perPage)+index);
    this.boworkflowstepssource.refresh();
    break;
    }
    }
    
    */
    boworkflowstepsroute(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditboworkflowstep(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditboworkflowstep(event, event.data.workflowstepid, this.formid);
                break;
            case 'delete':
                this.onDeleteboworkflowstep(event, event.data.workflowstepid, ((this.boworkflowstepssource.getPaging().page - 1) * this.boworkflowstepssource.getPaging().perPage) + event.index);
                this.boworkflowstepssource.refresh();
                break;
        }
    }
    boworkflowstepsonDelete(obj) {
        let workflowstepid = obj.data.workflowstepid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmasterservice.deleteboworkflowmaster(workflowstepid).then(res =>
                this.boworkflowstepsLoadTable()
            );
        }
    }
    boworkflowstepsPaging(val) {
        debugger;
        this.boworkflowstepssource.setPaging(1, val, true);
    }

    handleboworkflowstepsGridSelected(event: any) {
        this.boworkflowstepsselectedindex = this.boworkflowmasterservice.boworkflowsteps.findIndex(i => i.workflowstepid === event.data.workflowstepid);
    }
    IsboworkflowstepsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowstepsID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boworkflowsteps

}



