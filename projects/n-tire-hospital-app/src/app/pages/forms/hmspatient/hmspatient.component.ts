import { hmspatientService } from './../../../service/hmspatient.service';
import { hmspatient } from './../../../model/hmspatient.model';
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
import { hmsinsurance } from './../../../model/hmsinsurance.model';
import { hmsinsuranceComponent } from './hmsinsurance.component';
import { hmsoperation } from './../../../model/hmsoperation.model';
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hmsoperationComponent } from './hmsoperation.component';
import { hmslabresult } from './../../../model/hmslabresult.model';
import { hmslabresultComponent } from './hmslabresult.component';
import { hmspatientdischarge } from './../../../model/hmspatientdischarge.model';
import { hmspatientdischargeComponent } from './hmspatientdischarge.component';
import { hmspatientfollowup } from './../../../model/hmspatientfollowup.model';
import { hmspatientfollowupComponent } from './hmspatientfollowup.component';
import { hmspatientpaymentmaster } from './../../../model/hmspatientpaymentmaster.model';
import { hmspatientpaymentmasterComponent } from './hmspatientpaymentmaster.component';
import { hmsreceipt } from './../../../model/hmsreceipt.model';
import { hmsdoctor, IhmsdoctorResponse } from './../../../model/hmsdoctor.model';
import { hmsdoctorService } from './../../../service/hmsdoctor.service';
import { hmsreceiptComponent } from './hmsreceipt.component';
import { hmstreatment } from './../../../model/hmstreatment.model';
import { hmswardround, IhmswardroundResponse } from './../../../model/hmswardround.model';
import { hmswardroundService } from './../../../service/hmswardround.service';
import { hmstreatmentComponent } from './hmstreatment.component';
import { hmspatientvisit } from './../../../model/hmspatientvisit.model';
import { hmspatientvisitComponent } from './hmspatientvisit.component';
import { hmsadmission } from './../../../model/hmsadmission.model';
import { bosubcategorymaster, IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { hmsward, IhmswardResponse } from './../../../model/hmsward.model';
import { hmswardService } from './../../../service/hmsward.service';
import { hmsbed, IhmsbedResponse } from './../../../model/hmsbed.model';
import { hmsbedService } from './../../../service/hmsbed.service';
import { hmsadmissionComponent } from './hmsadmission.component';
import { hmspatientvaccination } from './../../../model/hmspatientvaccination.model';
import { hmsvaccinationmaster, IhmsvaccinationmasterResponse } from './../../../model/hmsvaccinationmaster.model';
import { hmsvaccinationmasterService } from './../../../service/hmsvaccinationmaster.service';
import { hmspatientvaccinationComponent } from './hmspatientvaccination.component';
import { hmsappointment } from './../../../model/hmsappointment.model';
import { hmsappointmentComponent } from './hmsappointment.component';
import { hmsconsent } from './../../../model/hmsconsent.model';
import { hmsconsentComponent } from './hmsconsent.component';
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
  selector: 'app-hmspatient',
  templateUrl: './hmspatient.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class hmspatientComponent implements OnInit {
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
  bfilterPopulatehmspatients: boolean = false;
  datahmspatientsgender3: any = [];
  datahmspatientscountryid3: any = [];
  datahmspatientsstateid3: any = [];
  datahmspatientscityid3: any = [];
  datahmspatientsbloodgroup3: any = [];
  datahmspatientsoccupation3: any = [];
  datahmspatientsmaritialstatus3: any = [];
  datahmspatientscpcountryid3: any = [];
  datahmspatientscpstateid3: any = [];
  datahmspatientscpcityid3: any = [];
  datahmsinsurancesrelationship3: any = [];
  bfilterPopulatehmsinsurances: boolean = false;
  datahmsoperationsanesthesian3: any = [];
  datahmsoperationsoperatedplace3: any = [];
  datahmsoperationssurgeon3: any = [];
  datahmsoperationscomplexity3: any = [];
  datahmsoperationsriskfactor3: any = [];
  datahmsoperationsanesthesiatechnique3: any = [];
  datahmsoperationsphysician3: any = [];
  datahmsoperationsoperationtype3: any = [];
  datahmsoperationsassistant3: any = [];
  bfilterPopulatehmsoperations: boolean = false;
  bfilterPopulatehmslabresults: boolean = false;
  datahmspatientdischargesdoctorid3: any = [];
  datahmspatientdischargesfollowupunit3: any = [];
  bfilterPopulatehmspatientdischarges: boolean = false;
  datahmspatientfollowupsremindertype3: any = [];
  bfilterPopulatehmspatientfollowups: boolean = false;
  bfilterPopulatehmspatientpaymentmasters: boolean = false;
  datahmsreceiptsdoctorid3: any = [];
  datahmsreceiptspaymentcategory3: any = [];
  datahmsreceiptspaymentmode3: any = [];
  bfilterPopulatehmsreceipts: boolean = false;
  datahmstreatmentsvisittype3: any = [];
  datahmstreatmentswardroundid3: any = [];
  datahmstreatmentstreatmentcategory3: any = [];
  datahmstreatmentstreatmenttype3: any = [];
  bfilterPopulatehmstreatments: boolean = false;
  datahmspatientvisitspreviousdoctorid3: any = [];
  datahmspatientvisitsfollowupunit3: any = [];
  bfilterPopulatehmspatientvisits: boolean = false;
  datahmsadmissionsresponsibilityid3: any = [];
  datahmsadmissionsdoctorid3: any = [];
  datahmsadmissionscategory3: any = [];
  datahmsadmissionssubcategory3: any = [];
  datahmsadmissionsward3: any = [];
  datahmsadmissionsbed3: any = [];
  bfilterPopulatehmsadmissions: boolean = false;
  datahmspatientvaccinationsvaccinationid3: any = [];
  bfilterPopulatehmspatientvaccinations: boolean = false;
  datahmsappointmentsappointmenttype3: any = [];
  datahmsappointmentsdoctorid3: any = [];
  bfilterPopulatehmsappointments: boolean = false;
  datahmsconsentsrelation3: any = [];
  bfilterPopulatehmsconsents: boolean = false;
  @ViewChild('tblhmsinsurancessource', { static: false }) tblhmsinsurancessource: Ng2SmartTableComponent;
  @ViewChild('tblhmsoperationssource', { static: false }) tblhmsoperationssource: Ng2SmartTableComponent;
  @ViewChild('tblhmslabresultssource', { static: false }) tblhmslabresultssource: Ng2SmartTableComponent;
  @ViewChild('tblhmspatientdischargessource', { static: false }) tblhmspatientdischargessource: Ng2SmartTableComponent;
  @ViewChild('tblhmspatientfollowupssource', { static: false }) tblhmspatientfollowupssource: Ng2SmartTableComponent;
  @ViewChild('tblhmspatientpaymentmasterssource', { static: false }) tblhmspatientpaymentmasterssource: Ng2SmartTableComponent;
  @ViewChild('tblhmsreceiptssource', { static: false }) tblhmsreceiptssource: Ng2SmartTableComponent;
  @ViewChild('tblhmstreatmentssource', { static: false }) tblhmstreatmentssource: Ng2SmartTableComponent;
  @ViewChild('tblhmspatientvisitssource', { static: false }) tblhmspatientvisitssource: Ng2SmartTableComponent;
  @ViewChild('tblhmsadmissionssource', { static: false }) tblhmsadmissionssource: Ng2SmartTableComponent;
  @ViewChild('tblhmspatientvaccinationssource', { static: false }) tblhmspatientvaccinationssource: Ng2SmartTableComponent;
  @ViewChild('tblhmsappointmentssource', { static: false }) tblhmsappointmentssource: Ng2SmartTableComponent;
  @ViewChild('tblhmsconsentssource', { static: false }) tblhmsconsentssource: Ng2SmartTableComponent;
  hmspatientForm: FormGroup;
  genderList: boconfigvalue[]=[];
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
  bloodgroupList: boconfigvalue[]=[];
  occupationList: boconfigvalue[]=[];
  maritialstatusList: boconfigvalue[]=[];
  cpcountryidList: bocountry[];
  cpcountryid_bocountriesForm: FormGroup;
  cpcountryid_bocountriesoptions: any;
  cpcountryid_bocountriesformatter: any;
  cpstateidList: bostate[];
  cpstateid_bostatesForm: FormGroup;
  cpstateid_bostatesoptions: any;
  cpstateid_bostatesformatter: any;
  cpcityidList: bocity[];
  cpcityid_bocitiesForm: FormGroup;
  cpcityid_bocitiesoptions: any;
  cpcityid_bocitiesformatter: any;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  customfieldjson: any;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
  @ViewChild('imageurluploader', { static: false }) imageurluploader: FileUpload;
  DeletedhmsinsuranceIDs: string = "";
  hmsinsurancesID: string = "1";
  hmsinsurancesselectedindex: any;
  DeletedhmsoperationIDs: string = "";
  hmsoperationsID: string = "2";
  hmsoperationsselectedindex: any;
  DeletedhmslabresultIDs: string = "";
  hmslabresultsID: string = "3";
  hmslabresultsselectedindex: any;
  DeletedhmspatientdischargeIDs: string = "";
  hmspatientdischargesID: string = "4";
  hmspatientdischargesselectedindex: any;
  DeletedhmspatientfollowupIDs: string = "";
  hmspatientfollowupsID: string = "5";
  hmspatientfollowupsselectedindex: any;
  DeletedhmspatientpaymentmasterIDs: string = "";
  hmspatientpaymentmastersID: string = "6";
  hmspatientpaymentmastersselectedindex: any;
  DeletedhmsreceiptIDs: string = "";
  hmsreceiptsID: string = "7";
  hmsreceiptsselectedindex: any;
  DeletedhmstreatmentIDs: string = "";
  hmstreatmentsID: string = "8";
  hmstreatmentsselectedindex: any;
  DeletedhmspatientvisitIDs: string = "";
  hmspatientvisitsID: string = "9";
  hmspatientvisitsselectedindex: any;
  DeletedhmsadmissionIDs: string = "";
  hmsadmissionsID: string = "10";
  hmsadmissionsselectedindex: any;
  DeletedhmspatientvaccinationIDs: string = "";
  hmspatientvaccinationsID: string = "11";
  hmspatientvaccinationsselectedindex: any;
  DeletedhmsappointmentIDs: string = "";
  hmsappointmentsID: string = "12";
  hmsappointmentsselectedindex: any;
  DeletedhmsconsentIDs: string = "";
  hmsconsentsID: string = "13";
  hmsconsentsselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private hmspatientservice: hmspatientService,
    private bousermasterservice: bousermasterService,
    private bomasterdataservice: bomasterdataService,
    private hmsdoctorservice: hmsdoctorService,
    private hmswardroundservice: hmswardroundService,
    private bosubcategorymasterservice: bosubcategorymasterService,
    private hmswardservice: hmswardService,
    private hmsbedservice: hmsbedService,
    private hmsvaccinationmasterservice: hmsvaccinationmasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private bocountryservice: bocountryService,
    private bostateservice: bostateService,
    private bocityservice: bocityService,
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
    this.hmspatientForm = this.fb.group({
      patientid: [null],
      patientcode: [null],
      aadhaarno: [null],
      firstname: [null],
      middlename: [null],
      lastname: [null],
      imageurl: [null],
      gender: [null],
      genderdesc: [null],
      dateofbirth: [null],
      referredby: [null],
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
      mobile: [null],
      contactnoh: [null],
      contactnoo: [null],
      email: [null],
      height: [null],
      weight: [null],
      bloodgroup: [null],
      bloodgroupdesc: [null],
      occupation: [null],
      occupationdesc: [null],
      maritialstatus: [null],
      maritialstatusdesc: [null],
      allergydetails: [null],
      notes: [null],
      contactperson: [null],
      cpaddress1: [null],
      cpaddress2: [null],
      cpcountryid: [null],
      cpcountryiddesc: [null],
      cpstateid: [null],
      cpstateiddesc: [null],
      cpcityid: [null],
      cpcityiddesc: [null],
      cplocation: [null],
      cppincode: [null],
      cpmobile: [null],
      cpcontactnoh: [null],
      cpcontactnoo: [null],
      cpemail: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.hmspatientForm.controls; }

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
    if (this.hmspatientForm.dirty && this.hmspatientForm.touched) {
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
    let hmspatient = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.patientid != null) {
      hmspatient = this.data.patientid;
    }
    else
      hmspatient = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = hmspatient;
    //this.sharedService.alert(hmspatient);
    if (hmspatient == null) {
      this.SethmsinsurancesTableConfig();
      setTimeout(() => {
        this.SethmsinsurancesTableddConfig();
      });
      this.SethmsoperationsTableConfig();
      setTimeout(() => {
        this.SethmsoperationsTableddConfig();
      });
      this.SethmslabresultsTableConfig();
      setTimeout(() => {
        this.SethmslabresultsTableddConfig();
      });
      this.SethmspatientdischargesTableConfig();
      setTimeout(() => {
        this.SethmspatientdischargesTableddConfig();
      });
      this.SethmspatientfollowupsTableConfig();
      setTimeout(() => {
        this.SethmspatientfollowupsTableddConfig();
      });
      this.SethmspatientpaymentmastersTableConfig();
      setTimeout(() => {
        this.SethmspatientpaymentmastersTableddConfig();
      });
      this.SethmsreceiptsTableConfig();
      setTimeout(() => {
        this.SethmsreceiptsTableddConfig();
      });
      this.SethmstreatmentsTableConfig();
      setTimeout(() => {
        this.SethmstreatmentsTableddConfig();
      });
      this.SethmspatientvisitsTableConfig();
      setTimeout(() => {
        this.SethmspatientvisitsTableddConfig();
      });
      this.SethmsadmissionsTableConfig();
      setTimeout(() => {
        this.SethmsadmissionsTableddConfig();
      });
      this.SethmspatientvaccinationsTableConfig();
      setTimeout(() => {
        this.SethmspatientvaccinationsTableddConfig();
      });
      this.SethmsappointmentsTableConfig();
      setTimeout(() => {
        this.SethmsappointmentsTableddConfig();
      });
      this.SethmsconsentsTableConfig();
      setTimeout(() => {
        this.SethmsconsentsTableddConfig();
      });
      this.FillCustomField();
      this.resetForm();
    }
    else {
      this.PopulateScreen(hmspatient);
    }
    this.configservice.getList("gender").then((res:any) => this.genderList = res as boconfigvalue[]);
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
    this.configservice.getList("bloodgroup").then((res:any) => this.bloodgroupList = res as boconfigvalue[]);
    this.configservice.getList("occupation").then((res:any) => this.occupationList = res as boconfigvalue[]);
    this.configservice.getList("maritialstatus").then((res:any) => this.maritialstatusList = res as boconfigvalue[]);
    this.bocountryservice.getbocountriesList().then((res:any) => this.cpcountryidList = res as bocountry[]);
    this.cpcountryid_bocountriesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.cpcountryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.cpcountryid_bocountriesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.f.cpcountryid!.value != "" && this.f.cpcountryid!.value != null) this.bostateservice.getListBycountryid(this.f.cpcountryid!.value).then((res:any) => this.cpstateidList = res as bostate[]);
    });
    this.cpstateid_bostatesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.cpstateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.cpstateid_bostatesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.f.cpstateid!.value != "" && this.f.cpstateid!.value != null) this.bocityservice.getListBystateid(this.f.cpstateid!.value).then((res:any) => this.cpcityidList = res as bocity[]);
    });
    this.cpcityid_bocitiesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.cpcityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.cpcityid_bocitiesformatter = (result: any) => result.name;
    this.hmspatientForm.markAsUntouched();
    this.hmspatientForm.markAsPristine();
  }
  onSelectedcountryid(countryidDetail: any) {
    if (countryidDetail) {
      this.hmspatientForm.patchValue({ countryid: countryidDetail.item.countryid });
      this.hmspatientForm.patchValue({ countryiddesc: countryidDetail.item.name });
      countryidDetail.preventDefault();
      this.bostateservice.getListBycountryid(this.f.countryid!.value).then((res:any) => this.stateidList = res as bostate[]);

    }
  }

  onSelectedstateid(stateidDetail: any) {
    if (stateidDetail) {
      this.hmspatientForm.patchValue({ stateid: stateidDetail.item.stateid });
      this.hmspatientForm.patchValue({ stateiddesc: stateidDetail.item.name });
      stateidDetail.preventDefault();
      this.bocityservice.getListBystateid(this.f.stateid!.value).then((res:any) => this.cityidList = res as bocity[]);

    }
  }

  onSelectedcityid(cityidDetail: any) {
    if (cityidDetail) {
      this.hmspatientForm.patchValue({ cityid: cityidDetail.item.cityid });
      this.hmspatientForm.patchValue({ cityiddesc: cityidDetail.item.name });
      cityidDetail.preventDefault();

    }
  }

  onSelectedcpcountryid(cpcountryidDetail: any) {
    if (cpcountryidDetail) {
      this.hmspatientForm.patchValue({ cpcountryid: cpcountryidDetail.item.countryid });
      this.hmspatientForm.patchValue({ cpcountryiddesc: cpcountryidDetail.item.name });
      cpcountryidDetail.preventDefault();
      this.bostateservice.getListBycountryid(this.f.cpcountryid!.value).then((res:any) => this.cpstateidList = res as bostate[]);

    }
  }

  onSelectedcpstateid(cpstateidDetail: any) {
    if (cpstateidDetail) {
      this.hmspatientForm.patchValue({ cpstateid: cpstateidDetail.item.stateid });
      this.hmspatientForm.patchValue({ cpstateiddesc: cpstateidDetail.item.name });
      cpstateidDetail.preventDefault();
      this.bocityservice.getListBystateid(this.f.cpstateid!.value).then((res:any) => this.cpcityidList = res as bocity[]);

    }
  }

  onSelectedcpcityid(cpcityidDetail: any) {
    if (cpcityidDetail) {
      this.hmspatientForm.patchValue({ cpcityid: cpcityidDetail.item.cityid });
      this.hmspatientForm.patchValue({ cpcityiddesc: cpcityidDetail.item.name });
      cpcityidDetail.preventDefault();

    }
  }




  imageurlFileSelected(e:any) {
    //console.log(this.imageurluploader[0].file);
    this.hmspatientForm.patchValue({ imageurl: e.files[0].name });
  }
  resetForm() {
    if (this.hmspatientForm != null)
      this.hmspatientForm.reset();
    setTimeout(() => {
      this.hmspatientservice.hmsinsurances = [];
      this.hmsinsurancesLoadTable();
      this.hmspatientservice.hmsoperations = [];
      this.hmsoperationsLoadTable();
      this.hmspatientservice.hmslabresults = [];
      this.hmslabresultsLoadTable();
      this.hmspatientservice.hmspatientdischarges = [];
      this.hmspatientdischargesLoadTable();
      this.hmspatientservice.hmspatientfollowups = [];
      this.hmspatientfollowupsLoadTable();
      this.hmspatientservice.hmspatientpaymentmasters = [];
      this.hmspatientpaymentmastersLoadTable();
      this.hmspatientservice.hmsreceipts = [];
      this.hmsreceiptsLoadTable();
      this.hmspatientservice.hmstreatments = [];
      this.hmstreatmentsLoadTable();
      this.hmspatientservice.hmspatientvisits = [];
      this.hmspatientvisitsLoadTable();
      this.hmspatientservice.hmsadmissions = [];
      this.hmsadmissionsLoadTable();
      this.hmspatientservice.hmspatientvaccinations = [];
      this.hmspatientvaccinationsLoadTable();
      this.hmspatientservice.hmsappointments = [];
      this.hmsappointmentsLoadTable();
      this.hmspatientservice.hmsconsents = [];
      this.hmsconsentsLoadTable();
    });
    this.customfieldservice.reset(document);
    if (this.data != null) {
      for (let key in this.data) {

        let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
        if (this.hmspatientForm.controls[key] != null) {
          this.hmspatientForm.patchValue(json);
          this.hmspatientForm.controls[key].disable({ onlySelf: true });
        }
      }
    }
  }

  onDelete() {
    let patientid = this.hmspatientForm.get('patientid')!.value;
    if (patientid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.hmspatientservice.deletehmspatient(patientid).then((res:any) => {
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
    this.hmspatientForm.patchValue({
      patientid: null
    });
    this.hmspatientservice.formData.patientid = null;
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("hmspatients", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
  genderonChange(evt:any) {
    let e = evt!.value;
    this.hmspatientForm.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
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
  bloodgrouponChange(evt:any) {
    let e = evt!.value;
    this.hmspatientForm.patchValue({ bloodgroupdesc: evt.options[evt.options.selectedIndex].text });
  }
  occupationonChange(evt:any) {
    let e = evt!.value;
    this.hmspatientForm.patchValue({ occupationdesc: evt.options[evt.options.selectedIndex].text });
  }
  maritialstatusonChange(evt:any) {
    let e = evt!.value;
    this.hmspatientForm.patchValue({ maritialstatusdesc: evt.options[evt.options.selectedIndex].text });
  }
  cpcountryidonChange(evt:any) {
    let e = evt!.value;
  }
  cpstateidonChange(evt:any) {
    let e = evt!.value;
  }
  cpcityidonChange(evt:any) {
    let e = evt!.value;
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
  PopulateScreen(hmspatient: any) {
    this.hmspatientservice.gethmspatientsByID(parseInt(hmspatient)).then((res:any) => {

      this.FillData(res);
    });
  }
  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.hmspatientForm.patchValue({
      patientid: res.hmspatient.patientid,
      patientcode: res.hmspatient.patientcode,
      aadhaarno: res.hmspatient.aadhaarno,
      firstname: res.hmspatient.firstname,
      middlename: res.hmspatient.middlename,
      lastname: res.hmspatient.lastname,
      imageurl: res.hmspatient.imageurl,
      gender: res.hmspatient.gender,
      genderdesc: res.hmspatient.genderdesc,
      dateofbirth: this.ngbDateParserFormatter.parse(res.hmspatient.dateofbirth),
      referredby: res.hmspatient.referredby,
      address1: res.hmspatient.address1,
      address2: res.hmspatient.address2,
      countryid: res.hmspatient.countryid,
      countryiddesc: res.hmspatient.countryiddesc,
      stateid: res.hmspatient.stateid,
      stateiddesc: res.hmspatient.stateiddesc,
      cityid: res.hmspatient.cityid,
      cityiddesc: res.hmspatient.cityiddesc,
      location: res.hmspatient.location,
      pincode: res.hmspatient.pincode,
      mobile: res.hmspatient.mobile,
      contactnoh: res.hmspatient.contactnoh,
      contactnoo: res.hmspatient.contactnoo,
      email: res.hmspatient.email,
      height: res.hmspatient.height,
      weight: res.hmspatient.weight,
      bloodgroup: res.hmspatient.bloodgroup,
      bloodgroupdesc: res.hmspatient.bloodgroupdesc,
      occupation: res.hmspatient.occupation,
      occupationdesc: res.hmspatient.occupationdesc,
      maritialstatus: res.hmspatient.maritialstatus,
      maritialstatusdesc: res.hmspatient.maritialstatusdesc,
      allergydetails: res.hmspatient.allergydetails,
      notes: res.hmspatient.notes,
      contactperson: res.hmspatient.contactperson,
      cpaddress1: res.hmspatient.cpaddress1,
      cpaddress2: res.hmspatient.cpaddress2,
      cpcountryid: res.hmspatient.cpcountryid,
      cpcountryiddesc: res.hmspatient.cpcountryiddesc,
      cpstateid: res.hmspatient.cpstateid,
      cpstateiddesc: res.hmspatient.cpstateiddesc,
      cpcityid: res.hmspatient.cpcityid,
      cpcityiddesc: res.hmspatient.cpcityiddesc,
      cplocation: res.hmspatient.cplocation,
      cppincode: res.hmspatient.cppincode,
      cpmobile: res.hmspatient.cpmobile,
      cpcontactnoh: res.hmspatient.cpcontactnoh,
      cpcontactnoo: res.hmspatient.cpcontactnoo,
      cpemail: res.hmspatient.cpemail,
      customfield: res.hmspatient.customfield,
      attachment: res.hmspatient.attachment,
      status: res.hmspatient.status,
      statusdesc: res.hmspatient.statusdesc,
    });
    if (this.hmspatientForm.get('customfield')!.value != null && this.hmspatientForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.hmspatientForm.get('customfield')!.value);
    this.FillCustomField();
    if (this.hmspatientForm.get('attachment')!.value != null && this.hmspatientForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hmspatientForm.get('attachment')!.value);
    setTimeout(() => {
      if (this.f.countryid!.value != "" && this.f.countryid!.value != null) this.bostateservice.getListBycountryid(this.f.countryid!.value).then((res:any) => this.stateidList = res as bostate[]);
    });
    setTimeout(() => {
      if (this.f.stateid!.value != "" && this.f.stateid!.value != null) this.bocityservice.getListBystateid(this.f.stateid!.value).then((res:any) => this.cityidList = res as bocity[]);
    });
    setTimeout(() => {
      if (this.f.cpcountryid!.value != "" && this.f.cpcountryid!.value != null) this.bostateservice.getListBycountryid(this.f.cpcountryid!.value).then((res:any) => this.cpstateidList = res as bostate[]);
    });
    setTimeout(() => {
      if (this.f.cpstateid!.value != "" && this.f.cpstateid!.value != null) this.bocityservice.getListBystateid(this.f.cpstateid!.value).then((res:any) => this.cpcityidList = res as bocity[]);
    });
    this.hmspatientservice.hmsinsurances = res.hmsinsurance;
    this.SethmsinsurancesTableConfig();
    this.hmsinsurancesLoadTable();
    setTimeout(() => {
      this.SethmsinsurancesTableddConfig();
    });
    this.hmspatientservice.hmsoperations = res.hmsoperation;
    this.SethmsoperationsTableConfig();
    this.hmsoperationsLoadTable();
    setTimeout(() => {
      this.SethmsoperationsTableddConfig();
    });
    this.hmspatientservice.hmslabresults = res.hmslabresult;
    this.SethmslabresultsTableConfig();
    this.hmslabresultsLoadTable();
    setTimeout(() => {
      this.SethmslabresultsTableddConfig();
    });
    this.hmspatientservice.hmspatientdischarges = res.hmspatientdischarge;
    this.SethmspatientdischargesTableConfig();
    this.hmspatientdischargesLoadTable();
    setTimeout(() => {
      this.SethmspatientdischargesTableddConfig();
    });
    this.hmspatientservice.hmspatientfollowups = res.hmspatientfollowup;
    this.SethmspatientfollowupsTableConfig();
    this.hmspatientfollowupsLoadTable();
    setTimeout(() => {
      this.SethmspatientfollowupsTableddConfig();
    });
    this.hmspatientservice.hmspatientpaymentmasters = res.hmspatientpaymentmaster;
    this.SethmspatientpaymentmastersTableConfig();
    this.hmspatientpaymentmastersLoadTable();
    setTimeout(() => {
      this.SethmspatientpaymentmastersTableddConfig();
    });
    this.hmspatientservice.hmsreceipts = res.hmsreceipt;
    this.SethmsreceiptsTableConfig();
    this.hmsreceiptsLoadTable();
    setTimeout(() => {
      this.SethmsreceiptsTableddConfig();
    });
    this.hmspatientservice.hmstreatments = res.hmstreatment;
    this.SethmstreatmentsTableConfig();
    this.hmstreatmentsLoadTable();
    setTimeout(() => {
      this.SethmstreatmentsTableddConfig();
    });
    this.hmspatientservice.hmspatientvisits = res.hmspatientvisit;
    this.SethmspatientvisitsTableConfig();
    this.hmspatientvisitsLoadTable();
    setTimeout(() => {
      this.SethmspatientvisitsTableddConfig();
    });
    this.hmspatientservice.hmsadmissions = res.hmsadmission;
    this.SethmsadmissionsTableConfig();
    this.hmsadmissionsLoadTable();
    setTimeout(() => {
      this.SethmsadmissionsTableddConfig();
    });
    this.hmspatientservice.hmspatientvaccinations = res.hmspatientvaccination;
    this.SethmspatientvaccinationsTableConfig();
    this.hmspatientvaccinationsLoadTable();
    setTimeout(() => {
      this.SethmspatientvaccinationsTableddConfig();
    });
    this.hmspatientservice.hmsappointments = res.hmsappointment;
    this.SethmsappointmentsTableConfig();
    this.hmsappointmentsLoadTable();
    setTimeout(() => {
      this.SethmsappointmentsTableddConfig();
    });
    this.hmspatientservice.hmsconsents = res.hmsconsent;
    this.SethmsconsentsTableConfig();
    this.hmsconsentsLoadTable();
    setTimeout(() => {
      this.SethmsconsentsTableddConfig();
    });
  }
  validate() {
    let ret = true;
    return ret;
  }
  onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    if (!this.hmspatientForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.hmspatientservice.formData = this.hmspatientForm!.value;
    if (this.data != null) {
      for (let key in this.data) {
        if (this.hmspatientForm.controls[key] != null) {
          this.hmspatientservice.formData[key] = this.hmspatientForm.controls[key]!.value;
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.hmspatientservice.formData.dateofbirth = new Date(this.ngbDateParserFormatter.format(this.hmspatientForm.get('dateofbirth')!.value));
    this.hmspatientservice.formData.mobile = this.hmspatientForm.get('mobile')!.value == null ? null : this.hmspatientForm.get('mobile')!.value;
    this.hmspatientservice.formData.contactnoh = this.hmspatientForm.get('contactnoh')!.value == null ? null : this.hmspatientForm.get('contactnoh')!.value;
    this.hmspatientservice.formData.contactnoo = this.hmspatientForm.get('contactnoo')!.value == null ? null : this.hmspatientForm.get('contactnoo')!.value;
    this.hmspatientservice.formData.cpmobile = this.hmspatientForm.get('cpmobile')!.value == null ? null : this.hmspatientForm.get('cpmobile')!.value;
    this.hmspatientservice.formData.cpcontactnoh = this.hmspatientForm.get('cpcontactnoh')!.value == null ? null : this.hmspatientForm.get('cpcontactnoh')!.value;
    this.hmspatientservice.formData.cpcontactnoo = this.hmspatientForm.get('cpcontactnoo')!.value == null ? null : this.hmspatientForm.get('cpcontactnoo')!.value;
    this.hmspatientservice.formData.customfield = JSON.stringify(customfields);
    this.hmspatientservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
    this.hmspatientservice.formData.DeletedhmsinsuranceIDs = this.DeletedhmsinsuranceIDs;
    this.hmspatientservice.formData.DeletedhmsoperationIDs = this.DeletedhmsoperationIDs;
    this.hmspatientservice.formData.DeletedhmslabresultIDs = this.DeletedhmslabresultIDs;
    this.hmspatientservice.formData.DeletedhmspatientdischargeIDs = this.DeletedhmspatientdischargeIDs;
    this.hmspatientservice.formData.DeletedhmspatientfollowupIDs = this.DeletedhmspatientfollowupIDs;
    this.hmspatientservice.formData.DeletedhmspatientpaymentmasterIDs = this.DeletedhmspatientpaymentmasterIDs;
    this.hmspatientservice.formData.DeletedhmsreceiptIDs = this.DeletedhmsreceiptIDs;
    this.hmspatientservice.formData.DeletedhmstreatmentIDs = this.DeletedhmstreatmentIDs;
    this.hmspatientservice.formData.DeletedhmspatientvisitIDs = this.DeletedhmspatientvisitIDs;
    this.hmspatientservice.formData.DeletedhmsadmissionIDs = this.DeletedhmsadmissionIDs;
    this.hmspatientservice.formData.DeletedhmspatientvaccinationIDs = this.DeletedhmspatientvaccinationIDs;
    this.hmspatientservice.formData.DeletedhmsappointmentIDs = this.DeletedhmsappointmentIDs;
    this.hmspatientservice.formData.DeletedhmsconsentIDs = this.DeletedhmsconsentIDs;
    console.log(this.hmspatientservice.formData);
    this.hmspatientservice.saveOrUpdatehmspatients().subscribe(
      (res:any) => {
        this.imageurluploader.upload();
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.hmspatientservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.hmspatient);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.hmspatientForm.markAsUntouched();
        this.hmspatientForm.markAsPristine();
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

  AddOrEditcpcountryid(countryid) {
    let ScreenType = '2';
    /*this.dialog.open(bocountryComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bocountryservice.getbocountriesList().then((res:any) => this.cpcountryidList = res as bocountry[]);
    });*/
  }

  AddOrEditcpstateid(stateid) {
    let ScreenType = '2';
    /*this.dialog.open(bostateComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bostateservice.getbostatesList().then((res:any) => this.cpstateidList = res as bostate[]);
    });*/
  }

  AddOrEditcpcityid(cityid) {
    let ScreenType = '2';
    /*this.dialog.open(bocityComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bocityservice.getbocitiesList().then((res:any) => this.cpcityidList = res as bocity[]);
    });*/
  }

  AddOrEdithmsinsurance(event, insuranceid, patientid) {
    this.dialog.open(hmsinsuranceComponent,
      {
        data: { insuranceid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (insuranceid == null) {
        this.hmsinsurancessource.add(res);
        this.hmsinsurancessource.refresh();
      }
      else {
        this.hmsinsurancessource.update(event.data, res);
      }
    });
  }
  onDeletehmsinsurance(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsinsuranceIDs += childID + ",";
    this.hmspatientservice.hmsinsurances.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsoperation(event, operationid, patientid) {
    this.dialog.open(hmsoperationComponent,
      {
        data: { operationid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (operationid == null) {
        this.hmsoperationssource.add(res);
        this.hmsoperationssource.refresh();
      }
      else {
        this.hmsoperationssource.update(event.data, res);
      }
    });
  }
  onDeletehmsoperation(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsoperationIDs += childID + ",";
    this.hmspatientservice.hmsoperations.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmslabresult(event, labtestid, patientid) {
    this.dialog.open(hmslabresultComponent,
      {
        data: { labtestid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (labtestid == null) {
        this.hmslabresultssource.add(res);
        this.hmslabresultssource.refresh();
      }
      else {
        this.hmslabresultssource.update(event.data, res);
      }
    });
  }
  onDeletehmslabresult(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmslabresultIDs += childID + ",";
    this.hmspatientservice.hmslabresults.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmspatientdischarge(event, dischargeid, patientid) {
    this.dialog.open(hmspatientdischargeComponent,
      {
        data: { dischargeid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (dischargeid == null) {
        this.hmspatientdischargessource.add(res);
        this.hmspatientdischargessource.refresh();
      }
      else {
        this.hmspatientdischargessource.update(event.data, res);
      }
    });
  }
  onDeletehmspatientdischarge(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmspatientdischargeIDs += childID + ",";
    this.hmspatientservice.hmspatientdischarges.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmspatientfollowup(event, followupid, patientid) {
    this.dialog.open(hmspatientfollowupComponent,
      {
        data: { followupid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (followupid == null) {
        this.hmspatientfollowupssource.add(res);
        this.hmspatientfollowupssource.refresh();
      }
      else {
        this.hmspatientfollowupssource.update(event.data, res);
      }
    });
  }
  onDeletehmspatientfollowup(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmspatientfollowupIDs += childID + ",";
    this.hmspatientservice.hmspatientfollowups.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmspatientpaymentmaster(event, paymentid, patientid) {
    this.dialog.open(hmspatientpaymentmasterComponent,
      {
        data: { paymentid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (paymentid == null) {
        this.hmspatientpaymentmasterssource.add(res);
        this.hmspatientpaymentmasterssource.refresh();
      }
      else {
        this.hmspatientpaymentmasterssource.update(event.data, res);
      }
    });
  }
  onDeletehmspatientpaymentmaster(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmspatientpaymentmasterIDs += childID + ",";
    this.hmspatientservice.hmspatientpaymentmasters.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsreceipt(event, receiptid, patientid) {
    this.dialog.open(hmsreceiptComponent,
      {
        data: { receiptid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (receiptid == null) {
        this.hmsreceiptssource.add(res);
        this.hmsreceiptssource.refresh();
      }
      else {
        this.hmsreceiptssource.update(event.data, res);
      }
    });
  }
  onDeletehmsreceipt(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsreceiptIDs += childID + ",";
    this.hmspatientservice.hmsreceipts.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmstreatment(event, treatmentid, patientid) {
    this.dialog.open(hmstreatmentComponent,
      {
        data: { treatmentid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (treatmentid == null) {
        this.hmstreatmentssource.add(res);
        this.hmstreatmentssource.refresh();
      }
      else {
        this.hmstreatmentssource.update(event.data, res);
      }
    });
  }
  onDeletehmstreatment(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmstreatmentIDs += childID + ",";
    this.hmspatientservice.hmstreatments.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmspatientvisit(event, visitid, patientid) {
    this.dialog.open(hmspatientvisitComponent,
      {
        data: { visitid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (visitid == null) {
        this.hmspatientvisitssource.add(res);
        this.hmspatientvisitssource.refresh();
      }
      else {
        this.hmspatientvisitssource.update(event.data, res);
      }
    });
  }
  onDeletehmspatientvisit(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmspatientvisitIDs += childID + ",";
    this.hmspatientservice.hmspatientvisits.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsadmission(event, admissionid, patientid) {
    this.dialog.open(hmsadmissionComponent,
      {
        data: { admissionid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (admissionid == null) {
        this.hmsadmissionssource.add(res);
        this.hmsadmissionssource.refresh();
      }
      else {
        this.hmsadmissionssource.update(event.data, res);
      }
    });
  }
  onDeletehmsadmission(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsadmissionIDs += childID + ",";
    this.hmspatientservice.hmsadmissions.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmspatientvaccination(event, patientvaccinationid, patientid) {
    this.dialog.open(hmspatientvaccinationComponent,
      {
        data: { patientvaccinationid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (patientvaccinationid == null) {
        this.hmspatientvaccinationssource.add(res);
        this.hmspatientvaccinationssource.refresh();
      }
      else {
        this.hmspatientvaccinationssource.update(event.data, res);
      }
    });
  }
  onDeletehmspatientvaccination(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmspatientvaccinationIDs += childID + ",";
    this.hmspatientservice.hmspatientvaccinations.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsappointment(event, appointmentid, patientid) {
    this.dialog.open(hmsappointmentComponent,
      {
        data: { appointmentid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (appointmentid == null) {
        this.hmsappointmentssource.add(res);
        this.hmsappointmentssource.refresh();
      }
      else {
        this.hmsappointmentssource.update(event.data, res);
      }
    });
  }
  onDeletehmsappointment(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsappointmentIDs += childID + ",";
    this.hmspatientservice.hmsappointments.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsconsent(event, consentid, patientid) {
    this.dialog.open(hmsconsentComponent,
      {
        data: { consentid, patientid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (consentid == null) {
        this.hmsconsentssource.add(res);
        this.hmsconsentssource.refresh();
      }
      else {
        this.hmsconsentssource.update(event.data, res);
      }
    });
  }
  onDeletehmsconsent(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsconsentIDs += childID + ",";
    this.hmspatientservice.hmsconsents.splice(i, 1);
    //this.updateGrandTotal();
  }
  //start of Grid Codes hmsinsurances
  hmsinsurancessettings: any;
  hmsinsurancessource: any;

  showhmsinsurancesCheckbox() {
    debugger;
    if (this.tblhmsinsurancessource.settings['selectMode'] == 'multi') this.tblhmsinsurancessource.settings['selectMode'] = 'single';
    else
      this.tblhmsinsurancessource.settings['selectMode'] = 'multi';
    this.tblhmsinsurancessource.initGrid();
  }
  deletehmsinsurancesAll() {
    this.tblhmsinsurancessource.settings['selectMode'] = 'single';
  }
  showhmsinsurancesFilter() {
    setTimeout(() => {
      this.SethmsinsurancesTableddConfig();
    });
    if (this.tblhmsinsurancessource.settings != null) this.tblhmsinsurancessource.settings['hideSubHeader'] = !this.tblhmsinsurancessource.settings['hideSubHeader'];
    this.tblhmsinsurancessource.initGrid();
  }
  showhmsinsurancesInActive() {
  }
  enablehmsinsurancesInActive() {
  }
  async SethmsinsurancesTableddConfig() {
    if (!this.bfilterPopulatehmsinsurances) {

      this.configservice.getList("relationship").then((res:any) => {
        var datarelationship2 = res as any;
        for (let i = 0; i < datarelationship2.length; i++) {
          var obj = { value: datarelationship2[i].configkey, title: datarelationship2[i].configtext };
          this.datahmsinsurancesrelationship3.push(obj);
        }
        var clone = this.clone(this.tblhmsinsurancessource.settings);
        clone.columns['relationship'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsinsurancesrelationship3)), }, };
        clone.columns['relationship'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsinsurancesrelationship3)), }, };
        this.tblhmsinsurancessource.settings = clone;
        this.tblhmsinsurancessource.initGrid();
      });
    }
    this.bfilterPopulatehmsinsurances = true;
  }
  async hmsinsurancesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsinsurancesTableConfig() {
    this.hmsinsurancessettings = {
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
        insurancedperson: {
          title: 'insurancedperson',
          type: '',
          filter: true,
        },
        relationship: {
          title: 'Relationship',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsinsurancesrelationship3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        insuranceno: {
          title: 'insuranceno',
          type: '',
          filter: true,
        },
        coverageamount: {
          title: 'Coverage Amount',
          type: 'number',
          filter: true,
        },
        notes: {
          title: 'Notes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  hmsinsurancesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsinsurancesID) >= 0) {
      this.hmsinsurancessource = new LocalDataSource();
      this.hmsinsurancessource.load(this.hmspatientservice.hmsinsurances as any as LocalDataSource);
      this.hmsinsurancessource.setPaging(1, 20, true);
    }
  }
  hmsinsurancesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsinsurance(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsinsurance(event, event.data.insuranceid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsinsurance(event, event.data.insuranceid, ((this.hmsinsurancessource.getPaging().page - 1) * this.hmsinsurancessource.getPaging().perPage) + event.index);
        this.hmsinsurancessource.refresh();
        break;
    }
  }
  hmsinsurancesonDelete(obj) {
    let insuranceid = obj.data.insuranceid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(insuranceid).then((res:any) =>
        this.hmsinsurancesLoadTable()
      );
    }
  }
  hmsinsurancesPaging(val) {
    debugger;
    this.hmsinsurancessource.setPaging(1, val, true);
  }
  handlehmsinsurancesGridSelected(event) {
    this.hmsinsurancesselectedindex = this.hmspatientservice.hmsinsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
  }
  IshmsinsurancesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsinsurancesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsinsurances
  //start of Grid Codes hmsoperations
  hmsoperationssettings: any;
  hmsoperationssource: any;

  showhmsoperationsCheckbox() {
    debugger;
    if (this.tblhmsoperationssource.settings['selectMode'] == 'multi') this.tblhmsoperationssource.settings['selectMode'] = 'single';
    else
      this.tblhmsoperationssource.settings['selectMode'] = 'multi';
    this.tblhmsoperationssource.initGrid();
  }
  deletehmsoperationsAll() {
    this.tblhmsoperationssource.settings['selectMode'] = 'single';
  }
  showhmsoperationsFilter() {
    setTimeout(() => {
      this.SethmsoperationsTableddConfig();
    });
    if (this.tblhmsoperationssource.settings != null) this.tblhmsoperationssource.settings['hideSubHeader'] = !this.tblhmsoperationssource.settings['hideSubHeader'];
    this.tblhmsoperationssource.initGrid();
  }
  showhmsoperationsInActive() {
  }
  enablehmsoperationsInActive() {
  }
  async SethmsoperationsTableddConfig() {
    if (!this.bfilterPopulatehmsoperations) {

      this.bomasterdataservice.getList("53").then((res:any) => {
        var dataoperatedplace2 = res as any;
        for (let i = 0; i < dataoperatedplace2.length; i++) {
          var obj = { value: dataoperatedplace2[i].masterdataid, title: dataoperatedplace2[i].masterdatadescription };
          this.datahmsoperationsoperatedplace3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['operatedplace'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsoperatedplace3)), }, };
        clone.columns['operatedplace'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsoperatedplace3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datasurgeon2 = res as any;
        for (let i = 0; i < datasurgeon2.length; i++) {
          var obj = { value: datasurgeon2[i].userid, title: datasurgeon2[i].username };
          this.datahmsoperationssurgeon3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['surgeon'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationssurgeon3)), }, };
        clone.columns['surgeon'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationssurgeon3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataassistant2 = res as any;
        for (let i = 0; i < dataassistant2.length; i++) {
          var obj = { value: dataassistant2[i].userid, title: dataassistant2[i].username };
          this.datahmsoperationsassistant3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['assistant'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsassistant3)), }, };
        clone.columns['assistant'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsassistant3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataphysician2 = res as any;
        for (let i = 0; i < dataphysician2.length; i++) {
          var obj = { value: dataphysician2[i].userid, title: dataphysician2[i].username };
          this.datahmsoperationsphysician3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['physician'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsphysician3)), }, };
        clone.columns['physician'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsphysician3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataanesthesian2 = res as any;
        for (let i = 0; i < dataanesthesian2.length; i++) {
          var obj = { value: dataanesthesian2[i].userid, title: dataanesthesian2[i].username };
          this.datahmsoperationsanesthesian3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['anesthesian'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsanesthesian3)), }, };
        clone.columns['anesthesian'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsanesthesian3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.configservice.getList("anesthesiatechnique").then((res:any) => {
        var dataanesthesiatechnique2 = res as any;
        for (let i = 0; i < dataanesthesiatechnique2.length; i++) {
          var obj = { value: dataanesthesiatechnique2[i].configkey, title: dataanesthesiatechnique2[i].configtext };
          this.datahmsoperationsanesthesiatechnique3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['anesthesiatechnique'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsanesthesiatechnique3)), }, };
        clone.columns['anesthesiatechnique'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsanesthesiatechnique3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.bomasterdataservice.getList("54").then((res:any) => {
        var dataoperationtype2 = res as any;
        for (let i = 0; i < dataoperationtype2.length; i++) {
          var obj = { value: dataoperationtype2[i].masterdataid, title: dataoperationtype2[i].masterdatadescription };
          this.datahmsoperationsoperationtype3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['operationtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsoperationtype3)), }, };
        clone.columns['operationtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsoperationtype3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.configservice.getList("complexity").then((res:any) => {
        var datacomplexity2 = res as any;
        for (let i = 0; i < datacomplexity2.length; i++) {
          var obj = { value: datacomplexity2[i].configkey, title: datacomplexity2[i].configtext };
          this.datahmsoperationscomplexity3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['complexity'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationscomplexity3)), }, };
        clone.columns['complexity'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationscomplexity3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });

      this.configservice.getList("riskfactor").then((res:any) => {
        var datariskfactor2 = res as any;
        for (let i = 0; i < datariskfactor2.length; i++) {
          var obj = { value: datariskfactor2[i].configkey, title: datariskfactor2[i].configtext };
          this.datahmsoperationsriskfactor3.push(obj);
        }
        var clone = this.clone(this.tblhmsoperationssource.settings);
        clone.columns['riskfactor'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsriskfactor3)), }, };
        clone.columns['riskfactor'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsoperationsriskfactor3)), }, };
        this.tblhmsoperationssource.settings = clone;
        this.tblhmsoperationssource.initGrid();
      });
    }
    this.bfilterPopulatehmsoperations = true;
  }
  async hmsoperationsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsoperationsTableConfig() {
    this.hmsoperationssettings = {
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
        operationdate: {
          title: 'operationdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        operationstarttime: {
          title: 'operationstarttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        operationenddate: {
          title: 'operationenddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        operationendtime: {
          title: 'operationendtime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        operatedplace: {
          title: 'Operation Place',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsoperatedplace3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        surgeon: {
          title: 'Surgeon',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationssurgeon3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        assistant: {
          title: 'Assistant',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsassistant3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        physician: {
          title: 'Physician',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsphysician3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        anesthesian: {
          title: 'Anesthesian',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsanesthesian3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        anesthesiatechnique: {
          title: 'Anesthesia Technique',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsanesthesiatechnique3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        pressure: {
          title: 'pressure',
          type: 'number',
          filter: true,
        },
        pulse: {
          title: 'pulse',
          type: 'number',
          filter: true,
        },
        weight: {
          title: 'weight',
          type: 'number',
          filter: true,
        },
        operationtype: {
          title: 'Operation Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsoperationtype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        complexity: {
          title: 'Complexity',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationscomplexity3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        riskfactor: {
          title: 'Risk Factor',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsoperationsriskfactor3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        notes: {
          title: 'notes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        operationsteps: {
          title: 'operationsteps',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        preproceduremedication: {
          title: 'preproceduremedication',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        preoperativediagnosis: {
          title: 'preoperativediagnosis',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        preoperativefindings: {
          title: 'preoperativefindings',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        postoperativefindings: {
          title: 'postoperativefindings',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        postoperationcourse: {
          title: 'postoperationcourse',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        remarks: {
          title: 'remarks',
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
  hmsoperationsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsoperationsID) >= 0) {
      this.hmsoperationssource = new LocalDataSource();
      this.hmsoperationssource.load(this.hmspatientservice.hmsoperations as any as LocalDataSource);
      this.hmsoperationssource.setPaging(1, 20, true);
    }
  }
  hmsoperationsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsoperation(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsoperation(event, event.data.operationid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsoperation(event, event.data.operationid, ((this.hmsoperationssource.getPaging().page - 1) * this.hmsoperationssource.getPaging().perPage) + event.index);
        this.hmsoperationssource.refresh();
        break;
    }
  }
  hmsoperationsonDelete(obj) {
    let operationid = obj.data.operationid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(operationid).then((res:any) =>
        this.hmsoperationsLoadTable()
      );
    }
  }
  hmsoperationsPaging(val) {
    debugger;
    this.hmsoperationssource.setPaging(1, val, true);
  }
  handlehmsoperationsGridSelected(event) {
    this.hmsoperationsselectedindex = this.hmspatientservice.hmsoperations.findIndex(i => i.operationid === event.data.operationid);
  }
  IshmsoperationsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsoperationsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsoperations
  //start of Grid Codes hmslabresults
  hmslabresultssettings: any;
  hmslabresultssource: any;

  showhmslabresultsCheckbox() {
    debugger;
    if (this.tblhmslabresultssource.settings['selectMode'] == 'multi') this.tblhmslabresultssource.settings['selectMode'] = 'single';
    else
      this.tblhmslabresultssource.settings['selectMode'] = 'multi';
    this.tblhmslabresultssource.initGrid();
  }
  deletehmslabresultsAll() {
    this.tblhmslabresultssource.settings['selectMode'] = 'single';
  }
  showhmslabresultsFilter() {
    setTimeout(() => {
      this.SethmslabresultsTableddConfig();
    });
    if (this.tblhmslabresultssource.settings != null) this.tblhmslabresultssource.settings['hideSubHeader'] = !this.tblhmslabresultssource.settings['hideSubHeader'];
    this.tblhmslabresultssource.initGrid();
  }
  showhmslabresultsInActive() {
  }
  enablehmslabresultsInActive() {
  }
  async SethmslabresultsTableddConfig() {
    if (!this.bfilterPopulatehmslabresults) {
    }
    this.bfilterPopulatehmslabresults = true;
  }
  async hmslabresultsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmslabresultsTableConfig() {
    this.hmslabresultssettings = {
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
        testdate: {
          title: 'testdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        testid: {
          title: 'testid',
          type: 'number',
          filter: true,
        },
        testname: {
          title: 'testname',
          type: '',
          filter: true,
        },
        testby: {
          title: 'testby',
          type: 'number',
          filter: true,
        },
        normalrange: {
          title: 'normalrange',
          type: '',
          filter: true,
        },
        result: {
          title: 'result',
          type: '',
          filter: true,
        },
        notes: {
          title: 'notes',
          type: '',
          filter: true,
        },
        observations: {
          title: 'observations',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        conclusion: {
          title: 'conclusion',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        remarks: {
          title: 'remarks',
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
  hmslabresultsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmslabresultsID) >= 0) {
      this.hmslabresultssource = new LocalDataSource();
      this.hmslabresultssource.load(this.hmspatientservice.hmslabresults as any as LocalDataSource);
      this.hmslabresultssource.setPaging(1, 20, true);
    }
  }
  hmslabresultsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmslabresult(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmslabresult(event, event.data.labtestid, this.formid);
        break;
      case 'delete':
        this.onDeletehmslabresult(event, event.data.labtestid, ((this.hmslabresultssource.getPaging().page - 1) * this.hmslabresultssource.getPaging().perPage) + event.index);
        this.hmslabresultssource.refresh();
        break;
    }
  }
  hmslabresultsonDelete(obj) {
    let labtestid = obj.data.labtestid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(labtestid).then((res:any) =>
        this.hmslabresultsLoadTable()
      );
    }
  }
  hmslabresultsPaging(val) {
    debugger;
    this.hmslabresultssource.setPaging(1, val, true);
  }
  handlehmslabresultsGridSelected(event) {
    this.hmslabresultsselectedindex = this.hmspatientservice.hmslabresults.findIndex(i => i.labtestid === event.data.labtestid);
  }
  IshmslabresultsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmslabresultsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmslabresults
  //start of Grid Codes hmspatientdischarges
  hmspatientdischargessettings: any;
  hmspatientdischargessource: any;

  showhmspatientdischargesCheckbox() {
    debugger;
    if (this.tblhmspatientdischargessource.settings['selectMode'] == 'multi') this.tblhmspatientdischargessource.settings['selectMode'] = 'single';
    else
      this.tblhmspatientdischargessource.settings['selectMode'] = 'multi';
    this.tblhmspatientdischargessource.initGrid();
  }
  deletehmspatientdischargesAll() {
    this.tblhmspatientdischargessource.settings['selectMode'] = 'single';
  }
  showhmspatientdischargesFilter() {
    setTimeout(() => {
      this.SethmspatientdischargesTableddConfig();
    });
    if (this.tblhmspatientdischargessource.settings != null) this.tblhmspatientdischargessource.settings['hideSubHeader'] = !this.tblhmspatientdischargessource.settings['hideSubHeader'];
    this.tblhmspatientdischargessource.initGrid();
  }
  showhmspatientdischargesInActive() {
  }
  enablehmspatientdischargesInActive() {
  }
  async SethmspatientdischargesTableddConfig() {
    if (!this.bfilterPopulatehmspatientdischarges) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datadoctorid2 = res as any;
        for (let i = 0; i < datadoctorid2.length; i++) {
          var obj = { value: datadoctorid2[i].userid, title: datadoctorid2[i].username };
          this.datahmspatientdischargesdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientdischargessource.settings);
        clone.columns['doctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientdischargesdoctorid3)), }, };
        clone.columns['doctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientdischargesdoctorid3)), }, };
        this.tblhmspatientdischargessource.settings = clone;
        this.tblhmspatientdischargessource.initGrid();
      });

      this.configservice.getList("frequency").then((res:any) => {
        var datafollowupunit2 = res as any;
        for (let i = 0; i < datafollowupunit2.length; i++) {
          var obj = { value: datafollowupunit2[i].configkey, title: datafollowupunit2[i].configtext };
          this.datahmspatientdischargesfollowupunit3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientdischargessource.settings);
        clone.columns['followupunit'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientdischargesfollowupunit3)), }, };
        clone.columns['followupunit'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientdischargesfollowupunit3)), }, };
        this.tblhmspatientdischargessource.settings = clone;
        this.tblhmspatientdischargessource.initGrid();
      });
    }
    this.bfilterPopulatehmspatientdischarges = true;
  }
  async hmspatientdischargesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmspatientdischargesTableConfig() {
    this.hmspatientdischargessettings = {
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
        dischargedate: {
          title: 'dischargedate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        dischargetime: {
          title: 'dischargetime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        admitteddate: {
          title: 'admitteddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        staydays: {
          title: 'staydays',
          type: 'number',
          filter: true,
        },
        doctorid: {
          title: 'Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientdischargesdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        finaldiagnosis: {
          title: 'finaldiagnosis',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        patientcondition: {
          title: 'patientcondition',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        hospitalcourse: {
          title: 'hospitalcourse',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        notes: {
          title: 'notes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        admissiondetails: {
          title: 'admissiondetails',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        treatment: {
          title: 'treatment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        labnotes: {
          title: 'labnotes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        instructions: {
          title: 'instructions',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        issuetoaddress: {
          title: 'issuetoaddress',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        followup: {
          title: 'followup',
          type: 'number',
          filter: true,
        },
        followupunit: {
          title: 'Unit',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientdischargesfollowupunit3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        followupstartdate: {
          title: 'followupstartdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
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
  hmspatientdischargesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientdischargesID) >= 0) {
      this.hmspatientdischargessource = new LocalDataSource();
      this.hmspatientdischargessource.load(this.hmspatientservice.hmspatientdischarges as any as LocalDataSource);
      this.hmspatientdischargessource.setPaging(1, 20, true);
    }
  }
  hmspatientdischargesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmspatientdischarge(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmspatientdischarge(event, event.data.dischargeid, this.formid);
        break;
      case 'delete':
        this.onDeletehmspatientdischarge(event, event.data.dischargeid, ((this.hmspatientdischargessource.getPaging().page - 1) * this.hmspatientdischargessource.getPaging().perPage) + event.index);
        this.hmspatientdischargessource.refresh();
        break;
    }
  }
  hmspatientdischargesonDelete(obj) {
    let dischargeid = obj.data.dischargeid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(dischargeid).then((res:any) =>
        this.hmspatientdischargesLoadTable()
      );
    }
  }
  hmspatientdischargesPaging(val) {
    debugger;
    this.hmspatientdischargessource.setPaging(1, val, true);
  }
  handlehmspatientdischargesGridSelected(event) {
    this.hmspatientdischargesselectedindex = this.hmspatientservice.hmspatientdischarges.findIndex(i => i.dischargeid === event.data.dischargeid);
  }
  IshmspatientdischargesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientdischargesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmspatientdischarges
  //start of Grid Codes hmspatientfollowups
  hmspatientfollowupssettings: any;
  hmspatientfollowupssource: any;

  showhmspatientfollowupsCheckbox() {
    debugger;
    if (this.tblhmspatientfollowupssource.settings['selectMode'] == 'multi') this.tblhmspatientfollowupssource.settings['selectMode'] = 'single';
    else
      this.tblhmspatientfollowupssource.settings['selectMode'] = 'multi';
    this.tblhmspatientfollowupssource.initGrid();
  }
  deletehmspatientfollowupsAll() {
    this.tblhmspatientfollowupssource.settings['selectMode'] = 'single';
  }
  showhmspatientfollowupsFilter() {
    setTimeout(() => {
      this.SethmspatientfollowupsTableddConfig();
    });
    if (this.tblhmspatientfollowupssource.settings != null) this.tblhmspatientfollowupssource.settings['hideSubHeader'] = !this.tblhmspatientfollowupssource.settings['hideSubHeader'];
    this.tblhmspatientfollowupssource.initGrid();
  }
  showhmspatientfollowupsInActive() {
  }
  enablehmspatientfollowupsInActive() {
  }
  async SethmspatientfollowupsTableddConfig() {
    if (!this.bfilterPopulatehmspatientfollowups) {

      this.configservice.getList("remindertype").then((res:any) => {
        var dataremindertype2 = res as any;
        for (let i = 0; i < dataremindertype2.length; i++) {
          var obj = { value: dataremindertype2[i].configkey, title: dataremindertype2[i].configtext };
          this.datahmspatientfollowupsremindertype3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientfollowupssource.settings);
        clone.columns['remindertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientfollowupsremindertype3)), }, };
        clone.columns['remindertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientfollowupsremindertype3)), }, };
        this.tblhmspatientfollowupssource.settings = clone;
        this.tblhmspatientfollowupssource.initGrid();
      });
    }
    this.bfilterPopulatehmspatientfollowups = true;
  }
  async hmspatientfollowupsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmspatientfollowupsTableConfig() {
    this.hmspatientfollowupssettings = {
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
        remindertype: {
          title: 'Reminder Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientfollowupsremindertype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        remindertext: {
          title: 'remindertext',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        reminderdate: {
          title: 'reminderdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        remindersent: {
          title: 'remindersent',
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
        secondremindersent: {
          title: 'secondremindersent',
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
  hmspatientfollowupsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientfollowupsID) >= 0) {
      this.hmspatientfollowupssource = new LocalDataSource();
      this.hmspatientfollowupssource.load(this.hmspatientservice.hmspatientfollowups as any as LocalDataSource);
      this.hmspatientfollowupssource.setPaging(1, 20, true);
    }
  }
  hmspatientfollowupsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmspatientfollowup(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmspatientfollowup(event, event.data.followupid, this.formid);
        break;
      case 'delete':
        this.onDeletehmspatientfollowup(event, event.data.followupid, ((this.hmspatientfollowupssource.getPaging().page - 1) * this.hmspatientfollowupssource.getPaging().perPage) + event.index);
        this.hmspatientfollowupssource.refresh();
        break;
    }
  }
  hmspatientfollowupsonDelete(obj) {
    let followupid = obj.data.followupid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(followupid).then((res:any) =>
        this.hmspatientfollowupsLoadTable()
      );
    }
  }
  hmspatientfollowupsPaging(val) {
    debugger;
    this.hmspatientfollowupssource.setPaging(1, val, true);
  }
  handlehmspatientfollowupsGridSelected(event) {
    this.hmspatientfollowupsselectedindex = this.hmspatientservice.hmspatientfollowups.findIndex(i => i.followupid === event.data.followupid);
  }
  IshmspatientfollowupsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientfollowupsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmspatientfollowups
  //start of Grid Codes hmspatientpaymentmasters
  hmspatientpaymentmasterssettings: any;
  hmspatientpaymentmasterssource: any;

  showhmspatientpaymentmastersCheckbox() {
    debugger;
    if (this.tblhmspatientpaymentmasterssource.settings['selectMode'] == 'multi') this.tblhmspatientpaymentmasterssource.settings['selectMode'] = 'single';
    else
      this.tblhmspatientpaymentmasterssource.settings['selectMode'] = 'multi';
    this.tblhmspatientpaymentmasterssource.initGrid();
  }
  deletehmspatientpaymentmastersAll() {
    this.tblhmspatientpaymentmasterssource.settings['selectMode'] = 'single';
  }
  showhmspatientpaymentmastersFilter() {
    setTimeout(() => {
      this.SethmspatientpaymentmastersTableddConfig();
    });
    if (this.tblhmspatientpaymentmasterssource.settings != null) this.tblhmspatientpaymentmasterssource.settings['hideSubHeader'] = !this.tblhmspatientpaymentmasterssource.settings['hideSubHeader'];
    this.tblhmspatientpaymentmasterssource.initGrid();
  }
  showhmspatientpaymentmastersInActive() {
  }
  enablehmspatientpaymentmastersInActive() {
  }
  async SethmspatientpaymentmastersTableddConfig() {
    if (!this.bfilterPopulatehmspatientpaymentmasters) {
    }
    this.bfilterPopulatehmspatientpaymentmasters = true;
  }
  async hmspatientpaymentmastersbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmspatientpaymentmastersTableConfig() {
    this.hmspatientpaymentmasterssettings = {
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
        visitid: {
          title: 'visitid',
          type: 'number',
          filter: true,
        },
        doctorid: {
          title: 'doctorid',
          type: 'number',
          filter: true,
        },
        paymentcode: {
          title: 'paymentcode',
          type: '',
          filter: true,
        },
        paymentdate: {
          title: 'paymentdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        totalamount: {
          title: 'totalamount',
          type: 'number',
          filter: true,
        },
        discountpercentage: {
          title: 'discountpercentage',
          type: 'number',
          filter: true,
        },
        discountamount: {
          title: 'discountamount',
          type: 'number',
          filter: true,
        },
        taxpercentage: {
          title: 'taxpercentage',
          type: 'number',
          filter: true,
        },
        taxamount: {
          title: 'taxamount',
          type: 'number',
          filter: true,
        },
        netamount: {
          title: 'netamount',
          type: 'number',
          filter: true,
        },
        paid: {
          title: 'paid',
          type: '',
          filter: true,
        },
        amountpaid: {
          title: 'amountpaid',
          type: 'number',
          filter: true,
        },
        paymentdoneby: {
          title: 'paymentdoneby',
          type: '',
          filter: true,
        },
      },
    };
  }
  hmspatientpaymentmastersLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientpaymentmastersID) >= 0) {
      this.hmspatientpaymentmasterssource = new LocalDataSource();
      this.hmspatientpaymentmasterssource.load(this.hmspatientservice.hmspatientpaymentmasters as any as LocalDataSource);
      this.hmspatientpaymentmasterssource.setPaging(1, 20, true);
    }
  }
  hmspatientpaymentmastersroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmspatientpaymentmaster(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmspatientpaymentmaster(event, event.data.paymentid, this.formid);
        break;
      case 'delete':
        this.onDeletehmspatientpaymentmaster(event, event.data.paymentid, ((this.hmspatientpaymentmasterssource.getPaging().page - 1) * this.hmspatientpaymentmasterssource.getPaging().perPage) + event.index);
        this.hmspatientpaymentmasterssource.refresh();
        break;
    }
  }
  hmspatientpaymentmastersonDelete(obj) {
    let paymentid = obj.data.paymentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(paymentid).then((res:any) =>
        this.hmspatientpaymentmastersLoadTable()
      );
    }
  }
  hmspatientpaymentmastersPaging(val) {
    debugger;
    this.hmspatientpaymentmasterssource.setPaging(1, val, true);
  }
  handlehmspatientpaymentmastersGridSelected(event) {
    this.hmspatientpaymentmastersselectedindex = this.hmspatientservice.hmspatientpaymentmasters.findIndex(i => i.paymentid === event.data.paymentid);
  }
  IshmspatientpaymentmastersVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientpaymentmastersID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmspatientpaymentmasters
  //start of Grid Codes hmsreceipts
  hmsreceiptssettings: any;
  hmsreceiptssource: any;

  showhmsreceiptsCheckbox() {
    debugger;
    if (this.tblhmsreceiptssource.settings['selectMode'] == 'multi') this.tblhmsreceiptssource.settings['selectMode'] = 'single';
    else
      this.tblhmsreceiptssource.settings['selectMode'] = 'multi';
    this.tblhmsreceiptssource.initGrid();
  }
  deletehmsreceiptsAll() {
    this.tblhmsreceiptssource.settings['selectMode'] = 'single';
  }
  showhmsreceiptsFilter() {
    setTimeout(() => {
      this.SethmsreceiptsTableddConfig();
    });
    if (this.tblhmsreceiptssource.settings != null) this.tblhmsreceiptssource.settings['hideSubHeader'] = !this.tblhmsreceiptssource.settings['hideSubHeader'];
    this.tblhmsreceiptssource.initGrid();
  }
  showhmsreceiptsInActive() {
  }
  enablehmsreceiptsInActive() {
  }
  async SethmsreceiptsTableddConfig() {
    if (!this.bfilterPopulatehmsreceipts) {

      this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => {
        var datadoctorid2 = res as any;
        for (let i = 0; i < datadoctorid2.length; i++) {
          var obj = { value: datadoctorid2[i].doctorid, title: datadoctorid2[i].doctorname };
          this.datahmsreceiptsdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmsreceiptssource.settings);
        clone.columns['doctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptsdoctorid3)), }, };
        clone.columns['doctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptsdoctorid3)), }, };
        this.tblhmsreceiptssource.settings = clone;
        this.tblhmsreceiptssource.initGrid();
      });

      this.configservice.getList("paymentcategory").then((res:any) => {
        var datapaymentcategory2 = res as any;
        for (let i = 0; i < datapaymentcategory2.length; i++) {
          var obj = { value: datapaymentcategory2[i].configkey, title: datapaymentcategory2[i].configtext };
          this.datahmsreceiptspaymentcategory3.push(obj);
        }
        var clone = this.clone(this.tblhmsreceiptssource.settings);
        clone.columns['paymentcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptspaymentcategory3)), }, };
        clone.columns['paymentcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptspaymentcategory3)), }, };
        this.tblhmsreceiptssource.settings = clone;
        this.tblhmsreceiptssource.initGrid();
      });

      this.configservice.getList("paymentmode").then((res:any) => {
        var datapaymentmode2 = res as any;
        for (let i = 0; i < datapaymentmode2.length; i++) {
          var obj = { value: datapaymentmode2[i].configkey, title: datapaymentmode2[i].configtext };
          this.datahmsreceiptspaymentmode3.push(obj);
        }
        var clone = this.clone(this.tblhmsreceiptssource.settings);
        clone.columns['paymentmode'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptspaymentmode3)), }, };
        clone.columns['paymentmode'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsreceiptspaymentmode3)), }, };
        this.tblhmsreceiptssource.settings = clone;
        this.tblhmsreceiptssource.initGrid();
      });
    }
    this.bfilterPopulatehmsreceipts = true;
  }
  async hmsreceiptsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsreceiptsTableConfig() {
    this.hmsreceiptssettings = {
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
        doctorid: {
          title: 'Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsreceiptsdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        receiptcode: {
          title: 'receiptcode',
          type: '',
          filter: true,
        },
        receiptdate: {
          title: 'receiptdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        receipttime: {
          title: 'receipttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        paymentcategory: {
          title: 'Payment Category',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsreceiptspaymentcategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        outstandingamount: {
          title: 'outstandingamount',
          type: 'number',
          filter: true,
        },
        paymentmode: {
          title: 'Payment Mode',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsreceiptspaymentmode3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        paidamount: {
          title: 'paidamount',
          type: 'number',
          filter: true,
        },
        reference: {
          title: 'reference',
          type: '',
          filter: true,
        },
      },
    };
  }
  hmsreceiptsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsreceiptsID) >= 0) {
      this.hmsreceiptssource = new LocalDataSource();
      this.hmsreceiptssource.load(this.hmspatientservice.hmsreceipts as any as LocalDataSource);
      this.hmsreceiptssource.setPaging(1, 20, true);
    }
  }
  hmsreceiptsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsreceipt(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsreceipt(event, event.data.receiptid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsreceipt(event, event.data.receiptid, ((this.hmsreceiptssource.getPaging().page - 1) * this.hmsreceiptssource.getPaging().perPage) + event.index);
        this.hmsreceiptssource.refresh();
        break;
    }
  }
  hmsreceiptsonDelete(obj) {
    let receiptid = obj.data.receiptid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(receiptid).then((res:any) =>
        this.hmsreceiptsLoadTable()
      );
    }
  }
  hmsreceiptsPaging(val) {
    debugger;
    this.hmsreceiptssource.setPaging(1, val, true);
  }
  handlehmsreceiptsGridSelected(event) {
    this.hmsreceiptsselectedindex = this.hmspatientservice.hmsreceipts.findIndex(i => i.receiptid === event.data.receiptid);
  }
  IshmsreceiptsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsreceiptsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsreceipts
  //start of Grid Codes hmstreatments
  hmstreatmentssettings: any;
  hmstreatmentssource: any;

  showhmstreatmentsCheckbox() {
    debugger;
    if (this.tblhmstreatmentssource.settings['selectMode'] == 'multi') this.tblhmstreatmentssource.settings['selectMode'] = 'single';
    else
      this.tblhmstreatmentssource.settings['selectMode'] = 'multi';
    this.tblhmstreatmentssource.initGrid();
  }
  deletehmstreatmentsAll() {
    this.tblhmstreatmentssource.settings['selectMode'] = 'single';
  }
  showhmstreatmentsFilter() {
    setTimeout(() => {
      this.SethmstreatmentsTableddConfig();
    });
    if (this.tblhmstreatmentssource.settings != null) this.tblhmstreatmentssource.settings['hideSubHeader'] = !this.tblhmstreatmentssource.settings['hideSubHeader'];
    this.tblhmstreatmentssource.initGrid();
  }
  showhmstreatmentsInActive() {
  }
  enablehmstreatmentsInActive() {
  }
  async SethmstreatmentsTableddConfig() {
    if (!this.bfilterPopulatehmstreatments) {

      this.bomasterdataservice.getList("55").then((res:any) => {
        var datavisittype2 = res as any;
        for (let i = 0; i < datavisittype2.length; i++) {
          var obj = { value: datavisittype2[i].masterdataid, title: datavisittype2[i].masterdatadescription };
          this.datahmstreatmentsvisittype3.push(obj);
        }
        var clone = this.clone(this.tblhmstreatmentssource.settings);
        clone.columns['visittype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentsvisittype3)), }, };
        clone.columns['visittype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentsvisittype3)), }, };
        this.tblhmstreatmentssource.settings = clone;
        this.tblhmstreatmentssource.initGrid();
      });

      this.hmswardroundservice.gethmswardroundsList().then((res:any) => {
        var datawardroundid2 = res as any;
        for (let i = 0; i < datawardroundid2.length; i++) {
          var obj = { value: datawardroundid2[i].doctorid, title: datawardroundid2[i].doctorname };
          this.datahmstreatmentswardroundid3.push(obj);
        }
        var clone = this.clone(this.tblhmstreatmentssource.settings);
        clone.columns['wardroundid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentswardroundid3)), }, };
        clone.columns['wardroundid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentswardroundid3)), }, };
        this.tblhmstreatmentssource.settings = clone;
        this.tblhmstreatmentssource.initGrid();
      });

      this.configservice.getList("treatmentcategory").then((res:any) => {
        var datatreatmentcategory2 = res as any;
        for (let i = 0; i < datatreatmentcategory2.length; i++) {
          var obj = { value: datatreatmentcategory2[i].configkey, title: datatreatmentcategory2[i].configtext };
          this.datahmstreatmentstreatmentcategory3.push(obj);
        }
        var clone = this.clone(this.tblhmstreatmentssource.settings);
        clone.columns['treatmentcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentstreatmentcategory3)), }, };
        clone.columns['treatmentcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentstreatmentcategory3)), }, };
        this.tblhmstreatmentssource.settings = clone;
        this.tblhmstreatmentssource.initGrid();
      });

      this.configservice.getList("treatmenttype").then((res:any) => {
        var datatreatmenttype2 = res as any;
        for (let i = 0; i < datatreatmenttype2.length; i++) {
          var obj = { value: datatreatmenttype2[i].configkey, title: datatreatmenttype2[i].configtext };
          this.datahmstreatmentstreatmenttype3.push(obj);
        }
        var clone = this.clone(this.tblhmstreatmentssource.settings);
        clone.columns['treatmenttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentstreatmenttype3)), }, };
        clone.columns['treatmenttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmstreatmentstreatmenttype3)), }, };
        this.tblhmstreatmentssource.settings = clone;
        this.tblhmstreatmentssource.initGrid();
      });
    }
    this.bfilterPopulatehmstreatments = true;
  }
  async hmstreatmentsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmstreatmentsTableConfig() {
    this.hmstreatmentssettings = {
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
        treatmentname: {
          title: 'treatmentname',
          type: '',
          filter: true,
        },
        visittype: {
          title: 'Visit Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmstreatmentsvisittype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        wardroundid: {
          title: 'Ward',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmstreatmentswardroundid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        visitid: {
          title: 'visitid',
          type: 'number',
          filter: true,
        },
        treatmentcategory: {
          title: 'Category',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmstreatmentstreatmentcategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        treatmenttype: {
          title: 'Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmstreatmentstreatmenttype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        medicine: {
          title: 'medicine',
          type: '',
          filter: true,
        },
        externalmedicine: {
          title: 'externalmedicine',
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
        dosage: {
          title: 'dosage',
          type: '',
          filter: true,
        },
        numberofdays: {
          title: 'numberofdays',
          type: 'number',
          filter: true,
        },
        morning: {
          title: 'morning',
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
        afternoon: {
          title: 'afternoon',
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
        night: {
          title: 'night',
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
      },
    };
  }
  hmstreatmentsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmstreatmentsID) >= 0) {
      this.hmstreatmentssource = new LocalDataSource();
      this.hmstreatmentssource.load(this.hmspatientservice.hmstreatments as any as LocalDataSource);
      this.hmstreatmentssource.setPaging(1, 20, true);
    }
  }
  hmstreatmentsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmstreatment(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmstreatment(event, event.data.treatmentid, this.formid);
        break;
      case 'delete':
        this.onDeletehmstreatment(event, event.data.treatmentid, ((this.hmstreatmentssource.getPaging().page - 1) * this.hmstreatmentssource.getPaging().perPage) + event.index);
        this.hmstreatmentssource.refresh();
        break;
    }
  }
  hmstreatmentsonDelete(obj) {
    let treatmentid = obj.data.treatmentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(treatmentid).then((res:any) =>
        this.hmstreatmentsLoadTable()
      );
    }
  }
  hmstreatmentsPaging(val) {
    debugger;
    this.hmstreatmentssource.setPaging(1, val, true);
  }
  handlehmstreatmentsGridSelected(event) {
    this.hmstreatmentsselectedindex = this.hmspatientservice.hmstreatments.findIndex(i => i.treatmentid === event.data.treatmentid);
  }
  IshmstreatmentsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmstreatmentsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmstreatments
  //start of Grid Codes hmspatientvisits
  hmspatientvisitssettings: any;
  hmspatientvisitssource: any;

  showhmspatientvisitsCheckbox() {
    debugger;
    if (this.tblhmspatientvisitssource.settings['selectMode'] == 'multi') this.tblhmspatientvisitssource.settings['selectMode'] = 'single';
    else
      this.tblhmspatientvisitssource.settings['selectMode'] = 'multi';
    this.tblhmspatientvisitssource.initGrid();
  }
  deletehmspatientvisitsAll() {
    this.tblhmspatientvisitssource.settings['selectMode'] = 'single';
  }
  showhmspatientvisitsFilter() {
    setTimeout(() => {
      this.SethmspatientvisitsTableddConfig();
    });
    if (this.tblhmspatientvisitssource.settings != null) this.tblhmspatientvisitssource.settings['hideSubHeader'] = !this.tblhmspatientvisitssource.settings['hideSubHeader'];
    this.tblhmspatientvisitssource.initGrid();
  }
  showhmspatientvisitsInActive() {
  }
  enablehmspatientvisitsInActive() {
  }
  async SethmspatientvisitsTableddConfig() {
    if (!this.bfilterPopulatehmspatientvisits) {

      this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => {
        var datapreviousdoctorid2 = res as any;
        for (let i = 0; i < datapreviousdoctorid2.length; i++) {
          var obj = { value: datapreviousdoctorid2[i].doctorid, title: datapreviousdoctorid2[i].doctorname };
          this.datahmspatientvisitspreviousdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientvisitssource.settings);
        clone.columns['previousdoctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvisitspreviousdoctorid3)), }, };
        clone.columns['previousdoctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvisitspreviousdoctorid3)), }, };
        this.tblhmspatientvisitssource.settings = clone;
        this.tblhmspatientvisitssource.initGrid();
      });

      this.configservice.getList("frequency").then((res:any) => {
        var datafollowupunit2 = res as any;
        for (let i = 0; i < datafollowupunit2.length; i++) {
          var obj = { value: datafollowupunit2[i].configkey, title: datafollowupunit2[i].configtext };
          this.datahmspatientvisitsfollowupunit3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientvisitssource.settings);
        clone.columns['followupunit'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvisitsfollowupunit3)), }, };
        clone.columns['followupunit'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvisitsfollowupunit3)), }, };
        this.tblhmspatientvisitssource.settings = clone;
        this.tblhmspatientvisitssource.initGrid();
      });
    }
    this.bfilterPopulatehmspatientvisits = true;
  }
  async hmspatientvisitsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmspatientvisitsTableConfig() {
    this.hmspatientvisitssettings = {
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
        referredbydoctor: {
          title: 'referredbydoctor',
          type: '',
          filter: true,
        },
        lastvisited: {
          title: 'lastvisited',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        previousdoctorid: {
          title: 'Previous Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientvisitspreviousdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        lastvisitcomplaint: {
          title: 'lastvisitcomplaint',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        complaint: {
          title: 'complaint',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        symptoms: {
          title: 'symptoms',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        examinationnotes: {
          title: 'examinationnotes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        medicalhistory: {
          title: 'medicalhistory',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        treatmentadvised: {
          title: 'treatmentadvised',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        testadvised: {
          title: 'testadvised',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        testresult: {
          title: 'testresult',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        diagnosis: {
          title: 'diagnosis',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        pressure: {
          title: 'pressure',
          type: 'number',
          filter: true,
        },
        pressureremarks: {
          title: 'pressureremarks',
          type: '',
          filter: true,
        },
        pulse: {
          title: 'pulse',
          type: 'number',
          filter: true,
        },
        pulseremarks: {
          title: 'pulseremarks',
          type: '',
          filter: true,
        },
        temperature: {
          title: 'temperature',
          type: 'number',
          filter: true,
        },
        temperatureremarks: {
          title: 'temperatureremarks',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        weight: {
          title: 'weight',
          type: 'number',
          filter: true,
        },
        height: {
          title: 'height',
          type: 'number',
          filter: true,
        },
        doctorid: {
          title: 'doctorid',
          type: 'number',
          filter: true,
        },
        complaintcause: {
          title: 'complaintcause',
          type: '',
          filter: true,
        },
        treatment: {
          title: 'treatment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        instructions: {
          title: 'instructions',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        followupdays: {
          title: 'followupdays',
          type: 'number',
          filter: true,
        },
        followupunit: {
          title: 'Followup Unit',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientvisitsfollowupunit3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        remarks: {
          title: 'remarks',
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
  hmspatientvisitsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientvisitsID) >= 0) {
      this.hmspatientvisitssource = new LocalDataSource();
      this.hmspatientvisitssource.load(this.hmspatientservice.hmspatientvisits as any as LocalDataSource);
      this.hmspatientvisitssource.setPaging(1, 20, true);
    }
  }
  hmspatientvisitsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmspatientvisit(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmspatientvisit(event, event.data.visitid, this.formid);
        break;
      case 'delete':
        this.onDeletehmspatientvisit(event, event.data.visitid, ((this.hmspatientvisitssource.getPaging().page - 1) * this.hmspatientvisitssource.getPaging().perPage) + event.index);
        this.hmspatientvisitssource.refresh();
        break;
    }
  }
  hmspatientvisitsonDelete(obj) {
    let visitid = obj.data.visitid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(visitid).then((res:any) =>
        this.hmspatientvisitsLoadTable()
      );
    }
  }
  hmspatientvisitsPaging(val) {
    debugger;
    this.hmspatientvisitssource.setPaging(1, val, true);
  }
  handlehmspatientvisitsGridSelected(event) {
    this.hmspatientvisitsselectedindex = this.hmspatientservice.hmspatientvisits.findIndex(i => i.visitid === event.data.visitid);
  }
  IshmspatientvisitsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientvisitsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmspatientvisits
  //start of Grid Codes hmsadmissions
  hmsadmissionssettings: any;
  hmsadmissionssource: any;

  showhmsadmissionsCheckbox() {
    debugger;
    if (this.tblhmsadmissionssource.settings['selectMode'] == 'multi') this.tblhmsadmissionssource.settings['selectMode'] = 'single';
    else
      this.tblhmsadmissionssource.settings['selectMode'] = 'multi';
    this.tblhmsadmissionssource.initGrid();
  }
  deletehmsadmissionsAll() {
    this.tblhmsadmissionssource.settings['selectMode'] = 'single';
  }
  showhmsadmissionsFilter() {
    setTimeout(() => {
      this.SethmsadmissionsTableddConfig();
    });
    if (this.tblhmsadmissionssource.settings != null) this.tblhmsadmissionssource.settings['hideSubHeader'] = !this.tblhmsadmissionssource.settings['hideSubHeader'];
    this.tblhmsadmissionssource.initGrid();
  }
  showhmsadmissionsInActive() {
  }
  enablehmsadmissionsInActive() {
  }
  async SethmsadmissionsTableddConfig() {
    if (!this.bfilterPopulatehmsadmissions) {

      this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => {
        var datadoctorid2 = res as any;
        for (let i = 0; i < datadoctorid2.length; i++) {
          var obj = { value: datadoctorid2[i].doctorid, title: datadoctorid2[i].doctorname };
          this.datahmsadmissionsdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['doctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsdoctorid3)), }, };
        clone.columns['doctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsdoctorid3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });

      this.bomasterdataservice.getList("51").then((res:any) => {
        var datacategory2 = res as any;
        for (let i = 0; i < datacategory2.length; i++) {
          var obj = { value: datacategory2[i].masterdataid, title: datacategory2[i].masterdatadescription };
          this.datahmsadmissionscategory3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['category'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionscategory3)), }, };
        clone.columns['category'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionscategory3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });

      this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => {
        var datasubcategory2 = res as any;
        for (let i = 0; i < datasubcategory2.length; i++) {
          var obj = { value: datasubcategory2[i].subcategoryid, title: datasubcategory2[i].subcategoryname };
          this.datahmsadmissionssubcategory3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['subcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionssubcategory3)), }, };
        clone.columns['subcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionssubcategory3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });

      this.hmswardservice.gethmswardsList().then((res:any) => {
        var dataward2 = res as any;
        for (let i = 0; i < dataward2.length; i++) {
          var obj = { value: dataward2[i].wardid, title: dataward2[i].wardname };
          this.datahmsadmissionsward3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['ward'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsward3)), }, };
        clone.columns['ward'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsward3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });

      this.hmsbedservice.gethmsbedsList().then((res:any) => {
        var databed2 = res as any;
        for (let i = 0; i < databed2.length; i++) {
          var obj = { value: databed2[i].bedid, title: databed2[i].bedname };
          this.datahmsadmissionsbed3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['bed'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsbed3)), }, };
        clone.columns['bed'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsbed3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataresponsibilityid2 = res as any;
        for (let i = 0; i < dataresponsibilityid2.length; i++) {
          var obj = { value: dataresponsibilityid2[i].userid, title: dataresponsibilityid2[i].username };
          this.datahmsadmissionsresponsibilityid3.push(obj);
        }
        var clone = this.clone(this.tblhmsadmissionssource.settings);
        clone.columns['responsibilityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsresponsibilityid3)), }, };
        clone.columns['responsibilityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsadmissionsresponsibilityid3)), }, };
        this.tblhmsadmissionssource.settings = clone;
        this.tblhmsadmissionssource.initGrid();
      });
    }
    this.bfilterPopulatehmsadmissions = true;
  }
  async hmsadmissionsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsadmissionsTableConfig() {
    this.hmsadmissionssettings = {
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
        code: {
          title: 'code',
          type: '',
          filter: true,
        },
        admissiondate: {
          title: 'admissiondate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        admissiontime: {
          title: 'admissiontime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        doctorid: {
          title: 'Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionsdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        category: {
          title: 'Category',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionscategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        subcategory: {
          title: 'Sub Category',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionssubcategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        ward: {
          title: 'Ward',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionsward3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        bed: {
          title: 'Bed',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionsbed3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        diagnosis: {
          title: 'diagnosis',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        admissiondetails: {
          title: 'admissiondetails',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        treatment: {
          title: 'treatment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        responsibilityid: {
          title: 'Responsibility',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsadmissionsresponsibilityid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        notes: {
          title: 'notes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  hmsadmissionsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsadmissionsID) >= 0) {
      this.hmsadmissionssource = new LocalDataSource();
      this.hmsadmissionssource.load(this.hmspatientservice.hmsadmissions as any as LocalDataSource);
      this.hmsadmissionssource.setPaging(1, 20, true);
    }
  }
  hmsadmissionsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsadmission(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsadmission(event, event.data.admissionid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsadmission(event, event.data.admissionid, ((this.hmsadmissionssource.getPaging().page - 1) * this.hmsadmissionssource.getPaging().perPage) + event.index);
        this.hmsadmissionssource.refresh();
        break;
    }
  }
  hmsadmissionsonDelete(obj) {
    let admissionid = obj.data.admissionid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(admissionid).then((res:any) =>
        this.hmsadmissionsLoadTable()
      );
    }
  }
  hmsadmissionsPaging(val) {
    debugger;
    this.hmsadmissionssource.setPaging(1, val, true);
  }
  handlehmsadmissionsGridSelected(event) {
    this.hmsadmissionsselectedindex = this.hmspatientservice.hmsadmissions.findIndex(i => i.admissionid === event.data.admissionid);
  }
  IshmsadmissionsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsadmissionsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsadmissions
  //start of Grid Codes hmspatientvaccinations
  hmspatientvaccinationssettings: any;
  hmspatientvaccinationssource: any;

  showhmspatientvaccinationsCheckbox() {
    debugger;
    if (this.tblhmspatientvaccinationssource.settings['selectMode'] == 'multi') this.tblhmspatientvaccinationssource.settings['selectMode'] = 'single';
    else
      this.tblhmspatientvaccinationssource.settings['selectMode'] = 'multi';
    this.tblhmspatientvaccinationssource.initGrid();
  }
  deletehmspatientvaccinationsAll() {
    this.tblhmspatientvaccinationssource.settings['selectMode'] = 'single';
  }
  showhmspatientvaccinationsFilter() {
    setTimeout(() => {
      this.SethmspatientvaccinationsTableddConfig();
    });
    if (this.tblhmspatientvaccinationssource.settings != null) this.tblhmspatientvaccinationssource.settings['hideSubHeader'] = !this.tblhmspatientvaccinationssource.settings['hideSubHeader'];
    this.tblhmspatientvaccinationssource.initGrid();
  }
  showhmspatientvaccinationsInActive() {
  }
  enablehmspatientvaccinationsInActive() {
  }
  async SethmspatientvaccinationsTableddConfig() {
    if (!this.bfilterPopulatehmspatientvaccinations) {

      this.hmsvaccinationmasterservice.gethmsvaccinationmastersList().then((res:any) => {
        var datavaccinationid2 = res as any;
        for (let i = 0; i < datavaccinationid2.length; i++) {
          var obj = { value: datavaccinationid2[i].vaccinationid, title: datavaccinationid2[i].vaccinationname };
          this.datahmspatientvaccinationsvaccinationid3.push(obj);
        }
        var clone = this.clone(this.tblhmspatientvaccinationssource.settings);
        clone.columns['vaccinationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvaccinationsvaccinationid3)), }, };
        clone.columns['vaccinationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientvaccinationsvaccinationid3)), }, };
        this.tblhmspatientvaccinationssource.settings = clone;
        this.tblhmspatientvaccinationssource.initGrid();
      });
    }
    this.bfilterPopulatehmspatientvaccinations = true;
  }
  async hmspatientvaccinationsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmspatientvaccinationsTableConfig() {
    this.hmspatientvaccinationssettings = {
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
        doctorid: {
          title: 'doctorid',
          type: 'number',
          filter: true,
        },
        vaccinationid: {
          title: 'Vaccination',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmspatientvaccinationsvaccinationid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        startdate: {
          title: 'startdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        vaccinated: {
          title: 'vaccinated',
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
        vaccinateddate: {
          title: 'vaccinateddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
      },
    };
  }
  hmspatientvaccinationsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientvaccinationsID) >= 0) {
      this.hmspatientvaccinationssource = new LocalDataSource();
      this.hmspatientvaccinationssource.load(this.hmspatientservice.hmspatientvaccinations as any as LocalDataSource);
      this.hmspatientvaccinationssource.setPaging(1, 20, true);
    }
  }
  hmspatientvaccinationsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmspatientvaccination(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmspatientvaccination(event, event.data.patientvaccinationid, this.formid);
        break;
      case 'delete':
        this.onDeletehmspatientvaccination(event, event.data.patientvaccinationid, ((this.hmspatientvaccinationssource.getPaging().page - 1) * this.hmspatientvaccinationssource.getPaging().perPage) + event.index);
        this.hmspatientvaccinationssource.refresh();
        break;
    }
  }
  hmspatientvaccinationsonDelete(obj) {
    let patientvaccinationid = obj.data.patientvaccinationid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(patientvaccinationid).then((res:any) =>
        this.hmspatientvaccinationsLoadTable()
      );
    }
  }
  hmspatientvaccinationsPaging(val) {
    debugger;
    this.hmspatientvaccinationssource.setPaging(1, val, true);
  }
  handlehmspatientvaccinationsGridSelected(event) {
    this.hmspatientvaccinationsselectedindex = this.hmspatientservice.hmspatientvaccinations.findIndex(i => i.patientvaccinationid === event.data.patientvaccinationid);
  }
  IshmspatientvaccinationsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientvaccinationsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmspatientvaccinations
  //start of Grid Codes hmsappointments
  hmsappointmentssettings: any;
  hmsappointmentssource: any;

  showhmsappointmentsCheckbox() {
    debugger;
    if (this.tblhmsappointmentssource.settings['selectMode'] == 'multi') this.tblhmsappointmentssource.settings['selectMode'] = 'single';
    else
      this.tblhmsappointmentssource.settings['selectMode'] = 'multi';
    this.tblhmsappointmentssource.initGrid();
  }
  deletehmsappointmentsAll() {
    this.tblhmsappointmentssource.settings['selectMode'] = 'single';
  }
  showhmsappointmentsFilter() {
    setTimeout(() => {
      this.SethmsappointmentsTableddConfig();
    });
    if (this.tblhmsappointmentssource.settings != null) this.tblhmsappointmentssource.settings['hideSubHeader'] = !this.tblhmsappointmentssource.settings['hideSubHeader'];
    this.tblhmsappointmentssource.initGrid();
  }
  showhmsappointmentsInActive() {
  }
  enablehmsappointmentsInActive() {
  }
  async SethmsappointmentsTableddConfig() {
    if (!this.bfilterPopulatehmsappointments) {

      this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => {
        var datadoctorid2 = res as any;
        for (let i = 0; i < datadoctorid2.length; i++) {
          var obj = { value: datadoctorid2[i].doctorid, title: datadoctorid2[i].doctorname };
          this.datahmsappointmentsdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmsappointmentssource.settings);
        clone.columns['doctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsappointmentsdoctorid3)), }, };
        clone.columns['doctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsappointmentsdoctorid3)), }, };
        this.tblhmsappointmentssource.settings = clone;
        this.tblhmsappointmentssource.initGrid();
      });

      this.configservice.getList("appointmenttype").then((res:any) => {
        var dataappointmenttype2 = res as any;
        for (let i = 0; i < dataappointmenttype2.length; i++) {
          var obj = { value: dataappointmenttype2[i].configkey, title: dataappointmenttype2[i].configtext };
          this.datahmsappointmentsappointmenttype3.push(obj);
        }
        var clone = this.clone(this.tblhmsappointmentssource.settings);
        clone.columns['appointmenttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsappointmentsappointmenttype3)), }, };
        clone.columns['appointmenttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsappointmentsappointmenttype3)), }, };
        this.tblhmsappointmentssource.settings = clone;
        this.tblhmsappointmentssource.initGrid();
      });
    }
    this.bfilterPopulatehmsappointments = true;
  }
  async hmsappointmentsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsappointmentsTableConfig() {
    this.hmsappointmentssettings = {
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
        doctorid: {
          title: 'Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsappointmentsdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        appointmentdate: {
          title: 'appointmentdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        appointmenttime: {
          title: 'appointmenttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        appointmenttype: {
          title: 'Appointment Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsappointmentsappointmenttype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        reason: {
          title: 'reason',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        tokenno: {
          title: 'tokenno',
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
  hmsappointmentsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsappointmentsID) >= 0) {
      this.hmsappointmentssource = new LocalDataSource();
      this.hmsappointmentssource.load(this.hmspatientservice.hmsappointments as any as LocalDataSource);
      this.hmsappointmentssource.setPaging(1, 20, true);
    }
  }
  hmsappointmentsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsappointment(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsappointment(event, event.data.appointmentid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsappointment(event, event.data.appointmentid, ((this.hmsappointmentssource.getPaging().page - 1) * this.hmsappointmentssource.getPaging().perPage) + event.index);
        this.hmsappointmentssource.refresh();
        break;
    }
  }
  hmsappointmentsonDelete(obj) {
    let appointmentid = obj.data.appointmentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(appointmentid).then((res:any) =>
        this.hmsappointmentsLoadTable()
      );
    }
  }
  hmsappointmentsPaging(val) {
    debugger;
    this.hmsappointmentssource.setPaging(1, val, true);
  }
  handlehmsappointmentsGridSelected(event) {
    this.hmsappointmentsselectedindex = this.hmspatientservice.hmsappointments.findIndex(i => i.appointmentid === event.data.appointmentid);
  }
  IshmsappointmentsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsappointmentsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsappointments
  //start of Grid Codes hmsconsents
  hmsconsentssettings: any;
  hmsconsentssource: any;

  showhmsconsentsCheckbox() {
    debugger;
    if (this.tblhmsconsentssource.settings['selectMode'] == 'multi') this.tblhmsconsentssource.settings['selectMode'] = 'single';
    else
      this.tblhmsconsentssource.settings['selectMode'] = 'multi';
    this.tblhmsconsentssource.initGrid();
  }
  deletehmsconsentsAll() {
    this.tblhmsconsentssource.settings['selectMode'] = 'single';
  }
  showhmsconsentsFilter() {
    setTimeout(() => {
      this.SethmsconsentsTableddConfig();
    });
    if (this.tblhmsconsentssource.settings != null) this.tblhmsconsentssource.settings['hideSubHeader'] = !this.tblhmsconsentssource.settings['hideSubHeader'];
    this.tblhmsconsentssource.initGrid();
  }
  showhmsconsentsInActive() {
  }
  enablehmsconsentsInActive() {
  }
  async SethmsconsentsTableddConfig() {
    if (!this.bfilterPopulatehmsconsents) {

      this.configservice.getList("relation").then((res:any) => {
        var datarelation2 = res as any;
        for (let i = 0; i < datarelation2.length; i++) {
          var obj = { value: datarelation2[i].configkey, title: datarelation2[i].configtext };
          this.datahmsconsentsrelation3.push(obj);
        }
        var clone = this.clone(this.tblhmsconsentssource.settings);
        clone.columns['relation'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsconsentsrelation3)), }, };
        clone.columns['relation'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsconsentsrelation3)), }, };
        this.tblhmsconsentssource.settings = clone;
        this.tblhmsconsentssource.initGrid();
      });
    }
    this.bfilterPopulatehmsconsents = true;
  }
  async hmsconsentsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsconsentsTableConfig() {
    this.hmsconsentssettings = {
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
        consentname: {
          title: 'consentname',
          type: '',
          filter: true,
        },
        relation: {
          title: 'Relation',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsconsentsrelation3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        consentdate: {
          title: 'consentdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        signature: {
          title: 'Signature',
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
  hmsconsentsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsconsentsID) >= 0) {
      this.hmsconsentssource = new LocalDataSource();
      this.hmsconsentssource.load(this.hmspatientservice.hmsconsents as any as LocalDataSource);
      this.hmsconsentssource.setPaging(1, 20, true);
    }
  }
  hmsconsentsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsconsent(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsconsent(event, event.data.consentid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsconsent(event, event.data.consentid, ((this.hmsconsentssource.getPaging().page - 1) * this.hmsconsentssource.getPaging().perPage) + event.index);
        this.hmsconsentssource.refresh();
        break;
    }
  }
  hmsconsentsonDelete(obj) {
    let consentid = obj.data.consentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmspatientservice.deletehmspatient(consentid).then((res:any) =>
        this.hmsconsentsLoadTable()
      );
    }
  }
  hmsconsentsPaging(val) {
    debugger;
    this.hmsconsentssource.setPaging(1, val, true);
  }
  handlehmsconsentsGridSelected(event) {
    this.hmsconsentsselectedindex = this.hmspatientservice.hmsconsents.findIndex(i => i.consentid === event.data.consentid);
  }
  IshmsconsentsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsconsentsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsconsents

}



