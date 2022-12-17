import { flmvehicleService } from './../../../service/flmvehicle.service';
import { flmvehicle } from './../../../model/flmvehicle.model';
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
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { flmrelatedvehicle } from './../../../model/flmrelatedvehicle.model';
import { flmassignment } from './../../../model/flmassignment.model';
import { flmassignmentComponent } from './flmassignment.component';
import { flmvehicleissue } from './../../../model/flmvehicleissue.model';
import { flmvehicleissueComponent } from './flmvehicleissue.component';
import { flmvehicleusage } from './../../../model/flmvehicleusage.model';
import { flmusageService } from './../../../service/flmusage.service';
import { flmaccident } from './../../../model/flmaccident.model';
import { flmaccidentComponent } from './flmaccident.component';
import { flmvehiclepermit } from './../../../model/flmvehiclepermit.model';
import { flmexpense } from './../../../model/flmexpense.model';
import { erpsuppliermaster, IerpsuppliermasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
import { flmexpenseComponent } from './flmexpense.component';
import { flminsurance } from './../../../model/flminsurance.model';
import { flminsuranceComponent } from './flminsurance.component';
import { flmservicerequest } from './../../../model/flmservicerequest.model';
import { flmservicerequestComponent } from '../flmservicerequest/flmservicerequest.component';
import { flminspection } from './../../../model/flminspection.model';
import { flminspectionComponent } from './flminspection.component';
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

@Component({
  selector: 'app-flmvehicle',
  templateUrl: './flmvehicle.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class flmvehicleComponent implements OnInit {
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
  bfilterPopulateflmvehicles: boolean = false;
  dataflmvehiclesgroupid3: any = [];
  dataflmvehiclesvehicletype3: any = [];
  dataflmvehiclesmake3: any = [];
  dataflmvehiclesmodel3: any = [];
  dataflmvehiclesresponsibilityid3: any = [];
  dataflmvehiclesownership3: any = [];
  dataflmvehiclescamtype3: any = [];
  dataflmvehiclesfuelinduction3: any = [];
  dataflmvehiclestransmissionbrand3: any = [];
  dataflmvehiclestransmissiontype3: any = [];
  dataflmvehiclesdrivetype3: any = [];
  dataflmvehiclesbrakesystem3: any = [];
  dataflmvehiclesfueltype3: any = [];
  dataflmvehiclesprimarymetermeasurementtype3: any = [];
  dataflmvehiclesfuelunit3: any = [];
  bfilterPopulateflmrelatedvehicles: boolean = false;
  dataflmassignmentsuserid3: any = [];
  bfilterPopulateflmassignments: boolean = false;
  dataflmvehicleissuesissuecategory3: any = [];
  dataflmvehicleissuespriority3: any = [];
  dataflmvehicleissuesseverity3: any = [];
  dataflmvehicleissuesreportedby3: any = [];
  dataflmvehicleissuesassignedto3: any = [];
  bfilterPopulateflmvehicleissues: boolean = false;
  bfilterPopulateflmvehicleusages: boolean = false;
  dataflmaccidentsdriverid3: any = [];
  bfilterPopulateflmaccidents: boolean = false;
  bfilterPopulateflmvehiclepermits: boolean = false;
  dataflmexpensesvendorid3: any = [];
  bfilterPopulateflmexpenses: boolean = false;
  dataflminsurancescoveragetype3: any = [];
  bfilterPopulateflminsurances: boolean = false;
  dataflmservicerequestsservicecategory3: any = [];
  dataflmservicerequestsvendorid3: any = [];
  bfilterPopulateflmservicerequests: boolean = false;
  dataflminspectionsengine3: any = [];
  dataflminspectionsoillife3: any = [];
  dataflminspectionsfuellevel3: any = [];
  dataflminspectionstransmission3: any = [];
  dataflminspectionsclutch3: any = [];
  dataflminspectionssteeringmechanism3: any = [];
  dataflminspectionshorn3: any = [];
  dataflminspectionswindshield3: any = [];
  dataflminspectionswipers3: any = [];
  dataflminspectionswashers3: any = [];
  dataflminspectionsrearvisionmirrors3: any = [];
  dataflminspectionslighting3: any = [];
  dataflminspectionsreflector3: any = [];
  dataflminspectionsparkingbrake3: any = [];
  dataflminspectionsservicebrake3: any = [];
  dataflminspectionsairlines3: any = [];
  dataflminspectionscouplingdevice3: any = [];
  dataflminspectionstyres3: any = [];
  dataflminspectionswheels3: any = [];
  dataflminspectionsrims3: any = [];
  dataflminspectionsemergencyequipment3: any = [];
  dataflminspectionsvehiclecondition3: any = [];
  dataflminspectionsinteriorcleanliness3: any = [];
  bfilterPopulateflminspections: boolean = false;
  @ViewChild('tblflmrelatedvehiclessource', { static: false }) tblflmrelatedvehiclessource: Ng2SmartTableComponent;
  @ViewChild('tblflmassignmentssource', { static: false }) tblflmassignmentssource: Ng2SmartTableComponent;
  @ViewChild('tblflmvehicleissuessource', { static: false }) tblflmvehicleissuessource: Ng2SmartTableComponent;
  @ViewChild('tblflmvehicleusagessource', { static: false }) tblflmvehicleusagessource: Ng2SmartTableComponent;
  @ViewChild('tblflmaccidentssource', { static: false }) tblflmaccidentssource: Ng2SmartTableComponent;
  @ViewChild('tblflmvehiclepermitssource', { static: false }) tblflmvehiclepermitssource: Ng2SmartTableComponent;
  @ViewChild('tblflmexpensessource', { static: false }) tblflmexpensessource: Ng2SmartTableComponent;
  @ViewChild('tblflminsurancessource', { static: false }) tblflminsurancessource: Ng2SmartTableComponent;
  @ViewChild('tblflmservicerequestssource', { static: false }) tblflmservicerequestssource: Ng2SmartTableComponent;
  @ViewChild('tblflminspectionssource', { static: false }) tblflminspectionssource: Ng2SmartTableComponent;
  flmvehicleForm: FormGroup;
  groupidList: bomasterdata[];
  vehicletypeList: bomasterdata[];
  makeList: bomasterdata[];
  modelList: bosubcategorymaster[];
  responsibilityidList: bousermaster[];
  responsibilityid_bousermastersForm: FormGroup;
  responsibilityid_bousermastersoptions: any;
  responsibilityid_bousermastersformatter: any;
  ownershipList: boconfigvalue[]=[];
  camtypeList: boconfigvalue[]=[];
  fuelinductionList: boconfigvalue[]=[];
  transmissionbrandList: boconfigvalue[]=[];
  transmissiontypeList: boconfigvalue[]=[];
  drivetypeList: boconfigvalue[]=[];
  brakesystemList: boconfigvalue[]=[];
  fueltypeList: boconfigvalue[]=[];
  primarymetermeasurementtypeList: boconfigvalue[]=[];
  fuelunitList: boconfigvalue[]=[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  @ViewChild('imageurluploader', { static: false }) imageurluploader: FileUpload;
  DeletedflmrelatedvehicleIDs: string = "";
  flmrelatedvehiclesID: string = "1";
  flmrelatedvehiclesselectedindex: any;
  DeletedflmassignmentIDs: string = "";
  flmassignmentsID: string = "2";
  flmassignmentsselectedindex: any;
  DeletedflmvehicleissueIDs: string = "";
  flmvehicleissuesID: string = "3";
  flmvehicleissuesselectedindex: any;
  DeletedflmvehicleusageIDs: string = "";
  flmvehicleusagesID: string = "4";
  flmvehicleusagesselectedindex: any;
  DeletedflmaccidentIDs: string = "";
  flmaccidentsID: string = "5";
  flmaccidentsselectedindex: any;
  DeletedflmvehiclepermitIDs: string = "";
  flmvehiclepermitsID: string = "6";
  flmvehiclepermitsselectedindex: any;
  DeletedflmexpenseIDs: string = "";
  flmexpensesID: string = "7";
  flmexpensesselectedindex: any;
  DeletedflminsuranceIDs: string = "";
  flminsurancesID: string = "8";
  flminsurancesselectedindex: any;
  DeletedflmservicerequestIDs: string = "";
  flmservicerequestsID: string = "9";
  flmservicerequestsselectedindex: any;
  DeletedflminspectionIDs: string = "";
  flminspectionsID: string = "10";
  flminspectionsselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private flmvehicleservice: flmvehicleService,
    private bousermasterservice: bousermasterService,
    private flmusageservice: flmusageService,
    private erpsuppliermasterservice: erpsuppliermasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private bomasterdataservice: bomasterdataService,
    private bosubcategorymasterservice: bosubcategorymasterService,
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
    this.flmvehicleForm = this.fb.group({
      vehicleid: [null],
      description: [null],
      groupid: [null],
      groupiddesc: [null],
      imageurl: [null],
      vehicletype: [null],
      vehicletypedesc: [null],
      make: [null],
      makedesc: [null],
      model: [null],
      modeldesc: [null],
      licenseplateno: [null],
      engineno: [null],
      chassisno: [null],
      color: [null],
      cost: [null],
      year: [null],
      specification: [null],
      maxpersons: [null],
      registrationdetails: [null],
      responsibilityid: [null],
      responsibilityiddesc: [null],
      ownership: [null],
      ownershipdesc: [null],
      width: [null],
      height: [null],
      length: [null],
      volume: [null],
      passengervolume: [null],
      cargovolume: [null],
      groundclearance: [null],
      bedlength: [null],
      curbweight: [null],
      vehicleweight: [null],
      towingcapacity: [null],
      maxpayload: [null],
      fuelnormal: [null],
      fuelcity: [null],
      fuelhighway: [null],
      enginesummary: [null],
      enginebrand: [null],
      aspiration: [null],
      blocktype: [null],
      bore: [null],
      camtype: [null],
      camtypedesc: [null],
      compression: [null],
      cylinders: [null],
      displacement: [null],
      fuelinduction: [null],
      fuelinductiondesc: [null],
      fuelquality: [null],
      maxhp: [null],
      maxtorque: [null],
      redlinerpm: [null],
      stroke: [null],
      valves: [null],
      transmission: [null],
      transmissionbrand: [null],
      transmissionbranddesc: [null],
      transmissiontype: [null],
      transmissiontypedesc: [null],
      transmissiongears: [null],
      drivetype: [null],
      drivetypedesc: [null],
      brakesystem: [null],
      brakesystemdesc: [null],
      fronttrackwidth: [null],
      reartrackwidth: [null],
      wheelbase: [null],
      frontwheeldiameter: [null],
      rearwheeldiameter: [null],
      rearaxle: [null],
      fronttyretype: [null],
      fronttirepsi: [null],
      reartyretype: [null],
      reartyrepsi: [null],
      fueltype: [null],
      fueltypedesc: [null],
      tank1capacity: [null],
      tank2capacity: [null],
      oilcapacity: [null],
      primarymetermeasurementtype: [null],
      primarymetermeasurementtypedesc: [null],
      pmcurrentreading: [null],
      pmaverageusageperday: [null],
      pmcalculateautomatically: [null],
      secondarymeter: [null],
      secondarymetermeasurementtype: [null],
      smcurrentreading: [null],
      smaverageusageperday: [null],
      smcalculateautomatically: [null],
      fuelunit: [null],
      fuelunitdesc: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.flmvehicleForm.controls; }

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
    if (this.flmvehicleForm.dirty && this.flmvehicleForm.touched) {
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
    let flmvehicle = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.vehicleid != null) {
      flmvehicle = this.data.vehicleid;
    }
    else
      flmvehicle = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = flmvehicle;
    //this.sharedService.alert(flmvehicle);
    if (flmvehicle == null) {
      this.SetflmrelatedvehiclesTableConfig();
      setTimeout(() => {
        this.SetflmrelatedvehiclesTableddConfig();
      });
      this.SetflmassignmentsTableConfig();
      setTimeout(() => {
        this.SetflmassignmentsTableddConfig();
      });
      this.SetflmvehicleissuesTableConfig();
      setTimeout(() => {
        this.SetflmvehicleissuesTableddConfig();
      });
      this.SetflmvehicleusagesTableConfig();
      setTimeout(() => {
        this.SetflmvehicleusagesTableddConfig();
      });
      this.SetflmaccidentsTableConfig();
      setTimeout(() => {
        this.SetflmaccidentsTableddConfig();
      });
      this.SetflmvehiclepermitsTableConfig();
      setTimeout(() => {
        this.SetflmvehiclepermitsTableddConfig();
      });
      this.SetflmexpensesTableConfig();
      setTimeout(() => {
        this.SetflmexpensesTableddConfig();
      });
      this.SetflminsurancesTableConfig();
      setTimeout(() => {
        this.SetflminsurancesTableddConfig();
      });
      this.SetflmservicerequestsTableConfig();
      setTimeout(() => {
        this.SetflmservicerequestsTableddConfig();
      });
      this.SetflminspectionsTableConfig();
      setTimeout(() => {
        this.SetflminspectionsTableddConfig();
      });
      this.resetForm();
    }
    else {
      this.PopulateScreen(flmvehicle);
    }
    this.bomasterdataservice.getList("46").then((res:any) => this.groupidList = res as bomasterdata[]);
    this.bomasterdataservice.getList("48").then((res:any) => this.vehicletypeList = res as bomasterdata[]);
    this.bomasterdataservice.getList("47").then((res:any) => this.makeList = res as bomasterdata[]);
    setTimeout(() => {
      if (this.f.vehicletype!.value != "" && this.f.vehicletype!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.vehicletype!.value).then((res:any) => this.modelList = res as bosubcategorymaster[]);
    });
    this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
    this.responsibilityid_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.responsibilityidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.responsibilityid_bousermastersformatter = (result: any) => result.username;
    this.configservice.getList("vehicleownership").then((res:any) => this.ownershipList = res as boconfigvalue[]);
    this.configservice.getList("camtype").then((res:any) => this.camtypeList = res as boconfigvalue[]);
    this.configservice.getList("fuelinduction").then((res:any) => this.fuelinductionList = res as boconfigvalue[]);
    this.configservice.getList("transmissionbrand").then((res:any) => this.transmissionbrandList = res as boconfigvalue[]);
    this.configservice.getList("transmissiontype").then((res:any) => this.transmissiontypeList = res as boconfigvalue[]);
    this.configservice.getList("drivetype").then((res:any) => this.drivetypeList = res as boconfigvalue[]);
    this.configservice.getList("brakesystem").then((res:any) => this.brakesystemList = res as boconfigvalue[]);
    this.configservice.getList("fueltype").then((res:any) => this.fueltypeList = res as boconfigvalue[]);
    this.configservice.getList("measurementtype").then((res:any) => this.primarymetermeasurementtypeList = res as boconfigvalue[]);
    this.configservice.getList("fuelunit").then((res:any) => this.fuelunitList = res as boconfigvalue[]);
    this.flmvehicleForm.markAsUntouched();
    this.flmvehicleForm.markAsPristine();
  }
  onSelectedresponsibilityid(responsibilityidDetail: any) {
    if (responsibilityidDetail) {
      this.flmvehicleForm.patchValue({ responsibilityid: responsibilityidDetail.item.userid });
      this.flmvehicleForm.patchValue({ responsibilityiddesc: responsibilityidDetail.item.username });
      responsibilityidDetail.preventDefault();

    }
  }




  imageurlFileSelected(e:any) {
    //console.log(this.imageurluploader[0].file);
    this.flmvehicleForm.patchValue({ imageurl: e.files[0].name });
  }
  resetForm() {
    if (this.flmvehicleForm != null)
      this.flmvehicleForm.reset();
    setTimeout(() => {
      this.flmvehicleservice.flmrelatedvehicles = [];
      this.flmvehicleservice.Insertflmrelatedvehicles = [];
      this.flmrelatedvehiclesLoadTable();
      this.flmvehicleservice.flmassignments = [];
      this.flmassignmentsLoadTable();
      this.flmvehicleservice.flmvehicleissues = [];
      this.flmvehicleissuesLoadTable();
      this.flmvehicleservice.flmvehicleusages = [];
      this.flmvehicleservice.Insertflmvehicleusages = [];
      this.flmvehicleusagesLoadTable();
      this.flmvehicleservice.flmaccidents = [];
      this.flmaccidentsLoadTable();
      this.flmvehicleservice.flmvehiclepermits = [];
      this.flmvehiclepermitsLoadTable();
      this.flmvehicleservice.flmexpenses = [];
      this.flmexpensesLoadTable();
      this.flmvehicleservice.flminsurances = [];
      this.flminsurancesLoadTable();
      this.flmvehicleservice.flmservicerequests = [];
      this.flmservicerequestsLoadTable();
      this.flmvehicleservice.flminspections = [];
      this.flminspectionsLoadTable();
    });
    if (this.data != null) {
      for (let key in this.data) {

        let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
        if (this.flmvehicleForm.controls[key] != null) {
          this.flmvehicleForm.patchValue(json);
          this.flmvehicleForm.controls[key].disable({ onlySelf: true });
        }
      }
    }
  }

  onDelete() {
    let vehicleid = this.flmvehicleForm.get('vehicleid')!.value;
    if (vehicleid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.flmvehicleservice.deleteflmvehicle(vehicleid).then((res:any) => {
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
    this.flmvehicleForm.patchValue({
      vehicleid: null
    });
    this.flmvehicleservice.formData.vehicleid = null;
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
  groupidonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ groupiddesc: evt.options[evt.options.selectedIndex].text });
  }
  vehicletypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ vehicletypedesc: evt.options[evt.options.selectedIndex].text });
    setTimeout(() => {
      if (this.f.vehicletype!.value != "" && this.f.vehicletype!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.vehicletype!.value).then((res:any) => this.modelList = res as bosubcategorymaster[]);
    });
  }
  makeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ makedesc: evt.options[evt.options.selectedIndex].text });
  }
  modelonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ modeldesc: evt.options[evt.options.selectedIndex].text });
  }
  responsibilityidonChange(evt:any) {
    let e = evt!.value;
  }
  ownershiponChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ ownershipdesc: evt.options[evt.options.selectedIndex].text });
  }
  camtypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ camtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  fuelinductiononChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ fuelinductiondesc: evt.options[evt.options.selectedIndex].text });
  }
  transmissionbrandonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ transmissionbranddesc: evt.options[evt.options.selectedIndex].text });
  }
  transmissiontypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ transmissiontypedesc: evt.options[evt.options.selectedIndex].text });
  }
  drivetypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ drivetypedesc: evt.options[evt.options.selectedIndex].text });
  }
  brakesystemonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ brakesystemdesc: evt.options[evt.options.selectedIndex].text });
  }
  fueltypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ fueltypedesc: evt.options[evt.options.selectedIndex].text });
  }
  primarymetermeasurementtypeonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ primarymetermeasurementtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  fuelunitonChange(evt:any) {
    let e = evt!.value;
    this.flmvehicleForm.patchValue({ fuelunitdesc: evt.options[evt.options.selectedIndex].text });
  }
  PopulateScreen(flmvehicle: any) {
    this.flmvehicleservice.getflmvehiclesByID(parseInt(flmvehicle)).then((res:any) => {

      this.FillData(res);
    });
  }
  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.flmvehicleForm.patchValue({
      vehicleid: res.flmvehicle.vehicleid,
      description: res.flmvehicle.description,
      groupid: res.flmvehicle.groupid,
      groupiddesc: res.flmvehicle.groupiddesc,
      imageurl: res.flmvehicle.imageurl,
      vehicletype: res.flmvehicle.vehicletype,
      vehicletypedesc: res.flmvehicle.vehicletypedesc,
      make: res.flmvehicle.make,
      makedesc: res.flmvehicle.makedesc,
      model: res.flmvehicle.model,
      modeldesc: res.flmvehicle.modeldesc,
      licenseplateno: res.flmvehicle.licenseplateno,
      engineno: res.flmvehicle.engineno,
      chassisno: res.flmvehicle.chassisno,
      color: res.flmvehicle.color,
      cost: res.flmvehicle.cost,
      year: res.flmvehicle.year,
      specification: res.flmvehicle.specification,
      maxpersons: res.flmvehicle.maxpersons,
      registrationdetails: res.flmvehicle.registrationdetails,
      responsibilityid: res.flmvehicle.responsibilityid,
      responsibilityiddesc: res.flmvehicle.responsibilityiddesc,
      ownership: res.flmvehicle.ownership,
      ownershipdesc: res.flmvehicle.ownershipdesc,
      width: res.flmvehicle.width,
      height: res.flmvehicle.height,
      length: res.flmvehicle.length,
      volume: res.flmvehicle.volume,
      passengervolume: res.flmvehicle.passengervolume,
      cargovolume: res.flmvehicle.cargovolume,
      groundclearance: res.flmvehicle.groundclearance,
      bedlength: res.flmvehicle.bedlength,
      curbweight: res.flmvehicle.curbweight,
      vehicleweight: res.flmvehicle.vehicleweight,
      towingcapacity: res.flmvehicle.towingcapacity,
      maxpayload: res.flmvehicle.maxpayload,
      fuelnormal: res.flmvehicle.fuelnormal,
      fuelcity: res.flmvehicle.fuelcity,
      fuelhighway: res.flmvehicle.fuelhighway,
      enginesummary: res.flmvehicle.enginesummary,
      enginebrand: res.flmvehicle.enginebrand,
      aspiration: res.flmvehicle.aspiration,
      blocktype: res.flmvehicle.blocktype,
      bore: res.flmvehicle.bore,
      camtype: res.flmvehicle.camtype,
      camtypedesc: res.flmvehicle.camtypedesc,
      compression: res.flmvehicle.compression,
      cylinders: res.flmvehicle.cylinders,
      displacement: res.flmvehicle.displacement,
      fuelinduction: res.flmvehicle.fuelinduction,
      fuelinductiondesc: res.flmvehicle.fuelinductiondesc,
      fuelquality: res.flmvehicle.fuelquality,
      maxhp: res.flmvehicle.maxhp,
      maxtorque: res.flmvehicle.maxtorque,
      redlinerpm: res.flmvehicle.redlinerpm,
      stroke: res.flmvehicle.stroke,
      valves: res.flmvehicle.valves,
      transmission: res.flmvehicle.transmission,
      transmissionbrand: res.flmvehicle.transmissionbrand,
      transmissionbranddesc: res.flmvehicle.transmissionbranddesc,
      transmissiontype: res.flmvehicle.transmissiontype,
      transmissiontypedesc: res.flmvehicle.transmissiontypedesc,
      transmissiongears: res.flmvehicle.transmissiongears,
      drivetype: res.flmvehicle.drivetype,
      drivetypedesc: res.flmvehicle.drivetypedesc,
      brakesystem: res.flmvehicle.brakesystem,
      brakesystemdesc: res.flmvehicle.brakesystemdesc,
      fronttrackwidth: res.flmvehicle.fronttrackwidth,
      reartrackwidth: res.flmvehicle.reartrackwidth,
      wheelbase: res.flmvehicle.wheelbase,
      frontwheeldiameter: res.flmvehicle.frontwheeldiameter,
      rearwheeldiameter: res.flmvehicle.rearwheeldiameter,
      rearaxle: res.flmvehicle.rearaxle,
      fronttyretype: res.flmvehicle.fronttyretype,
      fronttirepsi: res.flmvehicle.fronttirepsi,
      reartyretype: res.flmvehicle.reartyretype,
      reartyrepsi: res.flmvehicle.reartyrepsi,
      fueltype: res.flmvehicle.fueltype,
      fueltypedesc: res.flmvehicle.fueltypedesc,
      tank1capacity: res.flmvehicle.tank1capacity,
      tank2capacity: res.flmvehicle.tank2capacity,
      oilcapacity: res.flmvehicle.oilcapacity,
      primarymetermeasurementtype: res.flmvehicle.primarymetermeasurementtype,
      primarymetermeasurementtypedesc: res.flmvehicle.primarymetermeasurementtypedesc,
      pmcurrentreading: res.flmvehicle.pmcurrentreading,
      pmaverageusageperday: res.flmvehicle.pmaverageusageperday,
      pmcalculateautomatically: res.flmvehicle.pmcalculateautomatically,
      secondarymeter: res.flmvehicle.secondarymeter,
      secondarymetermeasurementtype: res.flmvehicle.secondarymetermeasurementtype,
      smcurrentreading: res.flmvehicle.smcurrentreading,
      smaverageusageperday: res.flmvehicle.smaverageusageperday,
      smcalculateautomatically: res.flmvehicle.smcalculateautomatically,
      fuelunit: res.flmvehicle.fuelunit,
      fuelunitdesc: res.flmvehicle.fuelunitdesc,
      status: res.flmvehicle.status,
      statusdesc: res.flmvehicle.statusdesc,
    });
    setTimeout(() => {
      if (this.f.vehicletype!.value != "" && this.f.vehicletype!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.vehicletype!.value).then((res:any) => this.modelList = res as bosubcategorymaster[]);
    });
    this.flmvehicleservice.flmrelatedvehicles = res.flmrelatedvehicle;
    this.SetflmrelatedvehiclesTableConfig();
    this.flmrelatedvehiclesLoadTable();
    setTimeout(() => {
      this.SetflmrelatedvehiclesTableddConfig();
    });
    this.flmvehicleservice.Insertflmrelatedvehicles = [];
    this.flmvehicleservice.flmassignments = res.flmassignment;
    this.SetflmassignmentsTableConfig();
    this.flmassignmentsLoadTable();
    setTimeout(() => {
      this.SetflmassignmentsTableddConfig();
    });
    this.flmvehicleservice.flmvehicleissues = res.flmvehicleissue;
    this.SetflmvehicleissuesTableConfig();
    this.flmvehicleissuesLoadTable();
    setTimeout(() => {
      this.SetflmvehicleissuesTableddConfig();
    });
    this.flmvehicleservice.flmvehicleusages = res.flmvehicleusage;
    this.SetflmvehicleusagesTableConfig();
    this.flmvehicleusagesLoadTable();
    setTimeout(() => {
      this.SetflmvehicleusagesTableddConfig();
    });
    this.flmvehicleservice.Insertflmvehicleusages = [];
    this.flmvehicleservice.flmaccidents = res.flmaccident;
    this.SetflmaccidentsTableConfig();
    this.flmaccidentsLoadTable();
    setTimeout(() => {
      this.SetflmaccidentsTableddConfig();
    });
    this.flmvehicleservice.flmvehiclepermits = res.flmvehiclepermit;
    this.SetflmvehiclepermitsTableConfig();
    this.flmvehiclepermitsLoadTable();
    setTimeout(() => {
      this.SetflmvehiclepermitsTableddConfig();
    });
    this.flmvehicleservice.flmexpenses = res.flmexpense;
    this.SetflmexpensesTableConfig();
    this.flmexpensesLoadTable();
    setTimeout(() => {
      this.SetflmexpensesTableddConfig();
    });
    this.flmvehicleservice.flminsurances = res.flminsurance;
    this.SetflminsurancesTableConfig();
    this.flminsurancesLoadTable();
    setTimeout(() => {
      this.SetflminsurancesTableddConfig();
    });
    this.flmvehicleservice.flmservicerequests = res.flmservicerequest;
    this.SetflmservicerequestsTableConfig();
    this.flmservicerequestsLoadTable();
    setTimeout(() => {
      this.SetflmservicerequestsTableddConfig();
    });
    this.flmvehicleservice.flminspections = res.flminspection;
    this.SetflminspectionsTableConfig();
    this.flminspectionsLoadTable();
    setTimeout(() => {
      this.SetflminspectionsTableddConfig();
    });
  }
  validate() {
    let ret = true;
    return ret;
  }
  onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    if (!this.flmvehicleForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.flmvehicleservice.formData = this.flmvehicleForm!.value;
    if (this.data != null) {
      for (let key in this.data) {
        if (this.flmvehicleForm.controls[key] != null) {
          this.flmvehicleservice.formData[key] = this.flmvehicleForm.controls[key]!.value;
        }
      }
    }
    this.flmvehicleservice.formData.DeletedflmrelatedvehicleIDs = this.DeletedflmrelatedvehicleIDs;
    this.flmvehicleservice.formData.DeletedflmassignmentIDs = this.DeletedflmassignmentIDs;
    this.flmvehicleservice.formData.DeletedflmvehicleissueIDs = this.DeletedflmvehicleissueIDs;
    this.flmvehicleservice.formData.DeletedflmvehicleusageIDs = this.DeletedflmvehicleusageIDs;
    this.flmvehicleservice.formData.DeletedflmaccidentIDs = this.DeletedflmaccidentIDs;
    this.flmvehicleservice.formData.DeletedflmvehiclepermitIDs = this.DeletedflmvehiclepermitIDs;
    this.flmvehicleservice.formData.DeletedflmexpenseIDs = this.DeletedflmexpenseIDs;
    this.flmvehicleservice.formData.DeletedflminsuranceIDs = this.DeletedflminsuranceIDs;
    this.flmvehicleservice.formData.DeletedflmservicerequestIDs = this.DeletedflmservicerequestIDs;
    this.flmvehicleservice.formData.DeletedflminspectionIDs = this.DeletedflminspectionIDs;
    console.log(this.flmvehicleservice.formData);
    this.flmvehicleservice.saveOrUpdateflmvehicles().subscribe(
      (res:any) => {
        this.imageurluploader.upload();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.flmvehicleservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.flmvehicle);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.flmvehicleForm.markAsUntouched();
        this.flmvehicleForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }



  AddOrEditgroupid(masterdataid) {
    let ScreenType = '2';
    /*this.dialog.open(bomasterdataComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.groupidList = res as bomasterdata[]);
    });*/
  }

  AddOrEditvehicletype(masterdataid) {
    let ScreenType = '2';
    /*this.dialog.open(bomasterdataComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.vehicletypeList = res as bomasterdata[]);
    });*/
  }

  AddOrEditmake(masterdataid) {
    let ScreenType = '2';
    /*this.dialog.open(bomasterdataComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.makeList = res as bomasterdata[]);
    });*/
  }

  AddOrEditmodel(subcategoryid) {
    let ScreenType = '2';
    /*this.dialog.open(bosubcategorymasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.modelList = res as bosubcategorymaster[]);
    });*/
  }

  AddOrEditresponsibilityid(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
    });*/
  }

  AddOrEditflmassignment(event, assignmentid, vehicleid) {
    this.dialog.open(flmassignmentComponent,
      {
        data: { assignmentid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (assignmentid == null) {
        this.flmassignmentssource.add(res);
        this.flmassignmentssource.refresh();
      }
      else {
        this.flmassignmentssource.update(event.data, res);
      }
    });
  }
  onDeleteflmassignment(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmassignmentIDs += childID + ",";
    this.flmvehicleservice.flmassignments.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEditflmvehicleissue(event, issueid, vehicleid) {
    this.dialog.open(flmvehicleissueComponent,
      {
        data: { issueid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (issueid == null) {
        this.flmvehicleissuessource.add(res);
        this.flmvehicleissuessource.refresh();
      }
      else {
        this.flmvehicleissuessource.update(event.data, res);
      }
    });
  }
  onDeleteflmvehicleissue(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmvehicleissueIDs += childID + ",";
    this.flmvehicleservice.flmvehicleissues.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEditflmaccident(event, accidentid, vehicleid) {
    this.dialog.open(flmaccidentComponent,
      {
        data: { accidentid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (accidentid == null) {
        this.flmaccidentssource.add(res);
        this.flmaccidentssource.refresh();
      }
      else {
        this.flmaccidentssource.update(event.data, res);
      }
    });
  }
  onDeleteflmaccident(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmaccidentIDs += childID + ",";
    this.flmvehicleservice.flmaccidents.splice(i, 1);
    //this.updateGrandTotal();
  }
  onDeleteflmvehiclepermit(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmvehiclepermitIDs += childID + ",";
    this.flmvehicleservice.flmvehiclepermits.splice(i, 1);
  }
  AddOrEditflmexpense(event, expenseid, vehicleid) {
    this.dialog.open(flmexpenseComponent,
      {
        data: { expenseid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (expenseid == null) {
        this.flmexpensessource.add(res);
        this.flmexpensessource.refresh();
      }
      else {
        this.flmexpensessource.update(event.data, res);
      }
    });
  }
  onDeleteflmexpense(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmexpenseIDs += childID + ",";
    this.flmvehicleservice.flmexpenses.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEditflminsurance(event, insuranceid, vehicleid) {
    this.dialog.open(flminsuranceComponent,
      {
        data: { insuranceid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (insuranceid == null) {
        this.flminsurancessource.add(res);
        this.flminsurancessource.refresh();
      }
      else {
        this.flminsurancessource.update(event.data, res);
      }
    });
  }
  onDeleteflminsurance(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflminsuranceIDs += childID + ",";
    this.flmvehicleservice.flminsurances.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEditflmservicerequest(event, servicerequestid, vehicleid) {
    this.dialog.open(flmservicerequestComponent,
      {
        data: { servicerequestid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (servicerequestid == null) {
        this.flmservicerequestssource.add(res);
        this.flmservicerequestssource.refresh();
      }
      else {
        this.flmservicerequestssource.update(event.data, res);
      }
    });
  }
  onDeleteflmservicerequest(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflmservicerequestIDs += childID + ",";
    this.flmvehicleservice.flmservicerequests.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEditflminspection(event, inspectionid, vehicleid) {
    this.dialog.open(flminspectionComponent,
      {
        data: { inspectionid, vehicleid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (inspectionid == null) {
        this.flminspectionssource.add(res);
        this.flminspectionssource.refresh();
      }
      else {
        this.flminspectionssource.update(event.data, res);
      }
    });
  }
  onDeleteflminspection(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedflminspectionIDs += childID + ",";
    this.flmvehicleservice.flminspections.splice(i, 1);
    //this.updateGrandTotal();
  }
  //start of Grid Codes flmrelatedvehicles
  flmrelatedvehiclessettings: any;
  flmrelatedvehiclessource: any;

  showflmrelatedvehiclesCheckbox() {
    debugger;
    if (this.tblflmrelatedvehiclessource.settings['selectMode'] == 'multi') this.tblflmrelatedvehiclessource.settings['selectMode'] = 'single';
    else
      this.tblflmrelatedvehiclessource.settings['selectMode'] = 'multi';
    this.tblflmrelatedvehiclessource.initGrid();
  }
  deleteflmrelatedvehiclesAll() {
    this.tblflmrelatedvehiclessource.settings['selectMode'] = 'single';
  }
  showflmrelatedvehiclesFilter() {
    setTimeout(() => {
      this.SetflmrelatedvehiclesTableddConfig();
    });
    if (this.tblflmrelatedvehiclessource.settings != null) this.tblflmrelatedvehiclessource.settings['hideSubHeader'] = !this.tblflmrelatedvehiclessource.settings['hideSubHeader'];
    this.tblflmrelatedvehiclessource.initGrid();
  }
  showflmrelatedvehiclesInActive() {
  }
  enableflmrelatedvehiclesInActive() {
  }
  async SetflmrelatedvehiclesTableddConfig() {
    if (!this.bfilterPopulateflmrelatedvehicles) {
    }
    this.bfilterPopulateflmrelatedvehicles = true;
  }
  async flmrelatedvehiclesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmrelatedvehiclesTableConfig() {
    this.flmrelatedvehiclessettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'multi',
      actions: {
        width: '300px',
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        relatedid: {
          title: 'Related',
          type: '',
        },
        vehicleid: {
          title: 'Vehicle',
          type: '',
        },
        description: {
          title: 'Description',
          type: '',
        },
      },
    };
  }
  flmrelatedvehiclesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmrelatedvehiclesID) >= 0) {
      this.flmrelatedvehiclessource = new LocalDataSource();
      this.flmrelatedvehiclessource.load(this.flmvehicleservice.flmrelatedvehicles as any as LocalDataSource);
      setTimeout(() => {
        if (this.tblflmrelatedvehiclessource != null) {
          this.tblflmrelatedvehiclessource.grid.getRows().forEach((row: any) => {
            if (row.data.relatedid != null && row.data.relatedid != "") {
              this.flmvehicleservice.Insertflmrelatedvehicles.push(row.data);
              this.tblflmrelatedvehiclessource.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }
  flmrelatedvehiclesPaging(val) {
    debugger;
    this.flmrelatedvehiclessource.setPaging(1, val, true);
  }
  handleflmrelatedvehiclesGridSelected(event) {
    debugger;

    if (event.isSelected) {
      if (event.data.relatedid == null || event.data.relatedid == "") {
        var obj = { vehicleid: this.formid }
        this.flmvehicleservice.Insertflmrelatedvehicles.push(obj as any);
      }
      else {
        var deletedids = this.DeletedflmrelatedvehicleIDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.relatedid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.relatedid != null && event.data.relatedid != "") this.DeletedflmrelatedvehicleIDs += event.data.relatedid + ",";
    }
  }
  IsflmrelatedvehiclesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmrelatedvehiclesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmrelatedvehicles
  //start of Grid Codes flmassignments
  flmassignmentssettings: any;
  flmassignmentssource: any;

  showflmassignmentsCheckbox() {
    debugger;
    if (this.tblflmassignmentssource.settings['selectMode'] == 'multi') this.tblflmassignmentssource.settings['selectMode'] = 'single';
    else
      this.tblflmassignmentssource.settings['selectMode'] = 'multi';
    this.tblflmassignmentssource.initGrid();
  }
  deleteflmassignmentsAll() {
    this.tblflmassignmentssource.settings['selectMode'] = 'single';
  }
  showflmassignmentsFilter() {
    setTimeout(() => {
      this.SetflmassignmentsTableddConfig();
    });
    if (this.tblflmassignmentssource.settings != null) this.tblflmassignmentssource.settings['hideSubHeader'] = !this.tblflmassignmentssource.settings['hideSubHeader'];
    this.tblflmassignmentssource.initGrid();
  }
  showflmassignmentsInActive() {
  }
  enableflmassignmentsInActive() {
  }
  async SetflmassignmentsTableddConfig() {
    if (!this.bfilterPopulateflmassignments) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datauserid2 = res as any;
        for (let i = 0; i < datauserid2.length; i++) {
          var obj = { value: datauserid2[i].userid, title: datauserid2[i].username };
          this.dataflmassignmentsuserid3.push(obj);
        }
        var clone = this.clone(this.tblflmassignmentssource.settings);
        clone.columns['userid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmassignmentsuserid3)), }, };
        clone.columns['userid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmassignmentsuserid3)), }, };
        this.tblflmassignmentssource.settings = clone;
        this.tblflmassignmentssource.initGrid();
      });
    }
    this.bfilterPopulateflmassignments = true;
  }
  async flmassignmentsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmassignmentsTableConfig() {
    this.flmassignmentssettings = {
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
        description: {
          title: 'description',
          type: '',
          filter: true,
        },
        userid: {
          title: 'User',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmassignmentsuserid3.find(c => c!.value == cell);
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
        starttime: {
          title: 'starttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        odometerstart: {
          title: 'odometerstart',
          type: 'number',
          filter: true,
        },
        enddate: {
          title: 'enddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        endtime: {
          title: 'endtime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        odometerend: {
          title: 'odometerend',
          type: 'number',
          filter: true,
        },
        userremarks: {
          title: 'userremarks',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        comments: {
          title: 'comments',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
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
  flmassignmentsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmassignmentsID) >= 0) {
      this.flmassignmentssource = new LocalDataSource();
      this.flmassignmentssource.load(this.flmvehicleservice.flmassignments as any as LocalDataSource);
      this.flmassignmentssource.setPaging(1, 20, true);
    }
  }
  flmassignmentsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflmassignment(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflmassignment(event, event.data.assignmentid, this.formid);
        break;
      case 'delete':
        this.onDeleteflmassignment(event, event.data.assignmentid, ((this.flmassignmentssource.getPaging().page - 1) * this.flmassignmentssource.getPaging().perPage) + event.index);
        this.flmassignmentssource.refresh();
        break;
    }
  }
  flmassignmentsonDelete(obj) {
    let assignmentid = obj.data.assignmentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(assignmentid).then((res:any) =>
        this.flmassignmentsLoadTable()
      );
    }
  }
  flmassignmentsPaging(val) {
    debugger;
    this.flmassignmentssource.setPaging(1, val, true);
  }
  handleflmassignmentsGridSelected(event) {
    this.flmassignmentsselectedindex = this.flmvehicleservice.flmassignments.findIndex(i => i.assignmentid === event.data.assignmentid);
  }
  IsflmassignmentsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmassignmentsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmassignments
  //start of Grid Codes flmvehicleissues
  flmvehicleissuessettings: any;
  flmvehicleissuessource: any;

  showflmvehicleissuesCheckbox() {
    debugger;
    if (this.tblflmvehicleissuessource.settings['selectMode'] == 'multi') this.tblflmvehicleissuessource.settings['selectMode'] = 'single';
    else
      this.tblflmvehicleissuessource.settings['selectMode'] = 'multi';
    this.tblflmvehicleissuessource.initGrid();
  }
  deleteflmvehicleissuesAll() {
    this.tblflmvehicleissuessource.settings['selectMode'] = 'single';
  }
  showflmvehicleissuesFilter() {
    setTimeout(() => {
      this.SetflmvehicleissuesTableddConfig();
    });
    if (this.tblflmvehicleissuessource.settings != null) this.tblflmvehicleissuessource.settings['hideSubHeader'] = !this.tblflmvehicleissuessource.settings['hideSubHeader'];
    this.tblflmvehicleissuessource.initGrid();
  }
  showflmvehicleissuesInActive() {
  }
  enableflmvehicleissuesInActive() {
  }
  async SetflmvehicleissuesTableddConfig() {
    if (!this.bfilterPopulateflmvehicleissues) {

      this.configservice.getList("issuecategory").then((res:any) => {
        var dataissuecategory2 = res as any;
        for (let i = 0; i < dataissuecategory2.length; i++) {
          var obj = { value: dataissuecategory2[i].configkey, title: dataissuecategory2[i].configtext };
          this.dataflmvehicleissuesissuecategory3.push(obj);
        }
        var clone = this.clone(this.tblflmvehicleissuessource.settings);
        clone.columns['issuecategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesissuecategory3)), }, };
        clone.columns['issuecategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesissuecategory3)), }, };
        this.tblflmvehicleissuessource.settings = clone;
        this.tblflmvehicleissuessource.initGrid();
      });

      this.configservice.getList("severity").then((res:any) => {
        var dataseverity2 = res as any;
        for (let i = 0; i < dataseverity2.length; i++) {
          var obj = { value: dataseverity2[i].configkey, title: dataseverity2[i].configtext };
          this.dataflmvehicleissuesseverity3.push(obj);
        }
        var clone = this.clone(this.tblflmvehicleissuessource.settings);
        clone.columns['severity'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesseverity3)), }, };
        clone.columns['severity'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesseverity3)), }, };
        this.tblflmvehicleissuessource.settings = clone;
        this.tblflmvehicleissuessource.initGrid();
      });

      this.configservice.getList("priority").then((res:any) => {
        var datapriority2 = res as any;
        for (let i = 0; i < datapriority2.length; i++) {
          var obj = { value: datapriority2[i].configkey, title: datapriority2[i].configtext };
          this.dataflmvehicleissuespriority3.push(obj);
        }
        var clone = this.clone(this.tblflmvehicleissuessource.settings);
        clone.columns['priority'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuespriority3)), }, };
        clone.columns['priority'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuespriority3)), }, };
        this.tblflmvehicleissuessource.settings = clone;
        this.tblflmvehicleissuessource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datareportedby2 = res as any;
        for (let i = 0; i < datareportedby2.length; i++) {
          var obj = { value: datareportedby2[i].userid, title: datareportedby2[i].username };
          this.dataflmvehicleissuesreportedby3.push(obj);
        }
        var clone = this.clone(this.tblflmvehicleissuessource.settings);
        clone.columns['reportedby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesreportedby3)), }, };
        clone.columns['reportedby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesreportedby3)), }, };
        this.tblflmvehicleissuessource.settings = clone;
        this.tblflmvehicleissuessource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataassignedto2 = res as any;
        for (let i = 0; i < dataassignedto2.length; i++) {
          var obj = { value: dataassignedto2[i].userid, title: dataassignedto2[i].username };
          this.dataflmvehicleissuesassignedto3.push(obj);
        }
        var clone = this.clone(this.tblflmvehicleissuessource.settings);
        clone.columns['assignedto'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesassignedto3)), }, };
        clone.columns['assignedto'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmvehicleissuesassignedto3)), }, };
        this.tblflmvehicleissuessource.settings = clone;
        this.tblflmvehicleissuessource.initGrid();
      });
    }
    this.bfilterPopulateflmvehicleissues = true;
  }
  async flmvehicleissuesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmvehicleissuesTableConfig() {
    this.flmvehicleissuessettings = {
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
        description: {
          title: 'description',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        issuedate: {
          title: 'issuedate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        detaildescription: {
          title: 'detaildescription',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        odometer: {
          title: 'odometer',
          type: 'number',
          filter: true,
        },
        issuecategory: {
          title: 'Category',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmvehicleissuesissuecategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        severity: {
          title: 'Severity',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmvehicleissuesseverity3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        priority: {
          title: 'Priority',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmvehicleissuespriority3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        reportedby: {
          title: 'Reported By',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmvehicleissuesreportedby3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        assignedto: {
          title: 'AssignedTo',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmvehicleissuesassignedto3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
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
  flmvehicleissuesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehicleissuesID) >= 0) {
      this.flmvehicleissuessource = new LocalDataSource();
      this.flmvehicleissuessource.load(this.flmvehicleservice.flmvehicleissues as any as LocalDataSource);
      this.flmvehicleissuessource.setPaging(1, 20, true);
    }
  }
  flmvehicleissuesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflmvehicleissue(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflmvehicleissue(event, event.data.issueid, this.formid);
        break;
      case 'delete':
        this.onDeleteflmvehicleissue(event, event.data.issueid, ((this.flmvehicleissuessource.getPaging().page - 1) * this.flmvehicleissuessource.getPaging().perPage) + event.index);
        this.flmvehicleissuessource.refresh();
        break;
    }
  }
  flmvehicleissuesonDelete(obj) {
    let issueid = obj.data.issueid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(issueid).then((res:any) =>
        this.flmvehicleissuesLoadTable()
      );
    }
  }
  flmvehicleissuesPaging(val) {
    debugger;
    this.flmvehicleissuessource.setPaging(1, val, true);
  }
  handleflmvehicleissuesGridSelected(event) {
    this.flmvehicleissuesselectedindex = this.flmvehicleservice.flmvehicleissues.findIndex(i => i.issueid === event.data.issueid);
  }
  IsflmvehicleissuesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehicleissuesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmvehicleissues
  //start of Grid Codes flmvehicleusages
  flmvehicleusagessettings: any;
  flmvehicleusagessource: any;

  showflmvehicleusagesCheckbox() {
    debugger;
    if (this.tblflmvehicleusagessource.settings['selectMode'] == 'multi') this.tblflmvehicleusagessource.settings['selectMode'] = 'single';
    else
      this.tblflmvehicleusagessource.settings['selectMode'] = 'multi';
    this.tblflmvehicleusagessource.initGrid();
  }
  deleteflmvehicleusagesAll() {
    this.tblflmvehicleusagessource.settings['selectMode'] = 'single';
  }
  showflmvehicleusagesFilter() {
    setTimeout(() => {
      this.SetflmvehicleusagesTableddConfig();
    });
    if (this.tblflmvehicleusagessource.settings != null) this.tblflmvehicleusagessource.settings['hideSubHeader'] = !this.tblflmvehicleusagessource.settings['hideSubHeader'];
    this.tblflmvehicleusagessource.initGrid();
  }
  showflmvehicleusagesInActive() {
  }
  enableflmvehicleusagesInActive() {
  }
  async SetflmvehicleusagesTableddConfig() {
    if (!this.bfilterPopulateflmvehicleusages) {
    }
    this.bfilterPopulateflmvehicleusages = true;
  }
  async flmvehicleusagesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmvehicleusagesTableConfig() {
    this.flmvehicleusagessettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'multi',
      actions: {
        width: '300px',
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        vehicleusageid: {
          title: 'Vehicle Usage',
          type: '',
        },
        usageid: {
          title: 'Usage',
          type: '',
        },
        description: {
          title: 'Description',
          type: '',
        },
      },
    };
  }
  flmvehicleusagesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehicleusagesID) >= 0) {
      this.flmvehicleusagessource = new LocalDataSource();
      this.flmvehicleusagessource.load(this.flmvehicleservice.flmvehicleusages as any as LocalDataSource);
      setTimeout(() => {
        if (this.tblflmvehicleusagessource != null) {
          this.tblflmvehicleusagessource.grid.getRows().forEach((row: any) => {
            if (row.data.vehicleusageid != null && row.data.vehicleusageid != "") {
              this.flmvehicleservice.Insertflmvehicleusages.push(row.data);
              this.tblflmvehicleusagessource.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }
  flmvehicleusagesPaging(val) {
    debugger;
    this.flmvehicleusagessource.setPaging(1, val, true);
  }
  handleflmvehicleusagesGridSelected(event) {
    debugger;

    if (event.isSelected) {
      if (event.data.vehicleusageid == null || event.data.vehicleusageid == "") {
        var obj = { vehicleid: this.formid, usageid: event.data.usageid }
        this.flmvehicleservice.Insertflmvehicleusages.push(obj as any);
      }
      else {
        var deletedids = this.DeletedflmvehicleusageIDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.vehicleusageid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.vehicleusageid != null && event.data.vehicleusageid != "") this.DeletedflmvehicleusageIDs += event.data.vehicleusageid + ",";
    }
  }
  IsflmvehicleusagesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehicleusagesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmvehicleusages
  //start of Grid Codes flmaccidents
  flmaccidentssettings: any;
  flmaccidentssource: any;

  showflmaccidentsCheckbox() {
    debugger;
    if (this.tblflmaccidentssource.settings['selectMode'] == 'multi') this.tblflmaccidentssource.settings['selectMode'] = 'single';
    else
      this.tblflmaccidentssource.settings['selectMode'] = 'multi';
    this.tblflmaccidentssource.initGrid();
  }
  deleteflmaccidentsAll() {
    this.tblflmaccidentssource.settings['selectMode'] = 'single';
  }
  showflmaccidentsFilter() {
    setTimeout(() => {
      this.SetflmaccidentsTableddConfig();
    });
    if (this.tblflmaccidentssource.settings != null) this.tblflmaccidentssource.settings['hideSubHeader'] = !this.tblflmaccidentssource.settings['hideSubHeader'];
    this.tblflmaccidentssource.initGrid();
  }
  showflmaccidentsInActive() {
  }
  enableflmaccidentsInActive() {
  }
  async SetflmaccidentsTableddConfig() {
    if (!this.bfilterPopulateflmaccidents) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datadriverid2 = res as any;
        for (let i = 0; i < datadriverid2.length; i++) {
          var obj = { value: datadriverid2[i].userid, title: datadriverid2[i].username };
          this.dataflmaccidentsdriverid3.push(obj);
        }
        var clone = this.clone(this.tblflmaccidentssource.settings);
        clone.columns['driverid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmaccidentsdriverid3)), }, };
        clone.columns['driverid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmaccidentsdriverid3)), }, };
        this.tblflmaccidentssource.settings = clone;
        this.tblflmaccidentssource.initGrid();
      });
    }
    this.bfilterPopulateflmaccidents = true;
  }
  async flmaccidentsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmaccidentsTableConfig() {
    this.flmaccidentssettings = {
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
        description: {
          title: 'description',
          type: '',
          filter: true,
        },
        accidentdetails: {
          title: 'accidentdetails',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        driverid: {
          title: 'Driver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmaccidentsdriverid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        learnerlicense: {
          title: 'learnerlicense',
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
        licenseno: {
          title: 'licenseno',
          type: '',
          filter: true,
        },
        rto: {
          title: 'rto',
          type: '',
          filter: true,
        },
        copassengerdetails: {
          title: 'copassengerdetails',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        goodscarried: {
          title: 'goodscarried',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        accidenttype: {
          title: 'accidenttype',
          type: '',
          filter: true,
        },
        accidentplace: {
          title: 'accidentplace',
          type: '',
          filter: true,
        },
        accidentdate: {
          title: 'accidentdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        accidenttime: {
          title: 'accidenttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        policereportlodged: {
          title: 'policereportlodged',
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
        policestationname: {
          title: 'policestationname',
          type: '',
          filter: true,
        },
        firno: {
          title: 'firno',
          type: '',
          filter: true,
        },
        insuranceid: {
          title: 'insuranceid',
          type: 'number',
          filter: true,
        },
        claimdate: {
          title: 'claimdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        claimamount: {
          title: 'claimamount',
          type: 'number',
          filter: true,
        },
        amountreceived: {
          title: 'amountreceived',
          type: 'number',
          filter: true,
        },
        comments: {
          title: 'comments',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
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
  flmaccidentsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmaccidentsID) >= 0) {
      this.flmaccidentssource = new LocalDataSource();
      this.flmaccidentssource.load(this.flmvehicleservice.flmaccidents as any as LocalDataSource);
      this.flmaccidentssource.setPaging(1, 20, true);
    }
  }
  flmaccidentsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflmaccident(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflmaccident(event, event.data.accidentid, this.formid);
        break;
      case 'delete':
        this.onDeleteflmaccident(event, event.data.accidentid, ((this.flmaccidentssource.getPaging().page - 1) * this.flmaccidentssource.getPaging().perPage) + event.index);
        this.flmaccidentssource.refresh();
        break;
    }
  }
  flmaccidentsonDelete(obj) {
    let accidentid = obj.data.accidentid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(accidentid).then((res:any) =>
        this.flmaccidentsLoadTable()
      );
    }
  }
  flmaccidentsPaging(val) {
    debugger;
    this.flmaccidentssource.setPaging(1, val, true);
  }
  handleflmaccidentsGridSelected(event) {
    this.flmaccidentsselectedindex = this.flmvehicleservice.flmaccidents.findIndex(i => i.accidentid === event.data.accidentid);
  }
  IsflmaccidentsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmaccidentsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmaccidents
  //start of Grid Codes flmvehiclepermits
  flmvehiclepermitssettings: any;
  flmvehiclepermitssource: any;

  showflmvehiclepermitsCheckbox() {
    debugger;
    if (this.tblflmvehiclepermitssource.settings['selectMode'] == 'multi') this.tblflmvehiclepermitssource.settings['selectMode'] = 'single';
    else
      this.tblflmvehiclepermitssource.settings['selectMode'] = 'multi';
    this.tblflmvehiclepermitssource.initGrid();
  }
  deleteflmvehiclepermitsAll() {
    this.tblflmvehiclepermitssource.settings['selectMode'] = 'single';
  }
  showflmvehiclepermitsFilter() {
    setTimeout(() => {
      this.SetflmvehiclepermitsTableddConfig();
    });
    if (this.tblflmvehiclepermitssource.settings != null) this.tblflmvehiclepermitssource.settings['hideSubHeader'] = !this.tblflmvehiclepermitssource.settings['hideSubHeader'];
    this.tblflmvehiclepermitssource.initGrid();
  }
  showflmvehiclepermitsInActive() {
  }
  enableflmvehiclepermitsInActive() {
  }
  async SetflmvehiclepermitsTableddConfig() {
    if (!this.bfilterPopulateflmvehiclepermits) {
    }
    this.bfilterPopulateflmvehiclepermits = true;
  }
  async flmvehiclepermitsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmvehiclepermitsTableConfig() {
    this.flmvehiclepermitssettings = {
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
        validenddate: {
          title: 'validenddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        issuingauthority: {
          title: 'issuingauthority',
          type: '',
          filter: true,
        },
        fitnesscertificateenddate: {
          title: 'fitnesscertificateenddate',
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
  flmvehiclepermitsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehiclepermitsID) >= 0) {
      this.flmvehiclepermitssource = new LocalDataSource();
      this.flmvehiclepermitssource.load(this.flmvehicleservice.flmvehiclepermits as any as LocalDataSource);
      this.flmvehiclepermitssource.setPaging(1, 20, true);
    }
  }
  flmvehiclepermitsroute(event, action) {
    switch (action) {
      case 'create':
        if (this.flmvehicleservice.flmvehiclepermits.length == 0) {
          this.tblflmvehiclepermitssource.grid.createFormShown = true;
        }
        else {
          let obj = new flmvehiclepermit();
          this.flmvehicleservice.flmvehiclepermits.push(obj);
          this.flmvehiclepermitssource.refresh();
          if ((this.flmvehicleservice.flmvehiclepermits.length / this.flmvehiclepermitssource.getPaging().perPage).toFixed(0) + 1 != this.flmvehiclepermitssource.getPaging().page) {
            this.flmvehiclepermitssource.setPage((this.flmvehicleservice.flmvehiclepermits.length / this.flmvehiclepermitssource.getPaging().perPage).toFixed(0) + 1);
          }
          setTimeout(() => {
            this.tblflmvehiclepermitssource.grid.edit(this.tblflmvehiclepermitssource.grid.getLastRow());
          });
        }
        break;
      case 'delete':
        let index = this.flmvehiclepermitssource.data.indexOf(event.data);
        this.onDeleteflmvehiclepermit(event, event.data.permitid, ((this.flmvehiclepermitssource.getPaging().page - 1) * this.flmvehiclepermitssource.getPaging().perPage) + index);
        this.flmvehiclepermitssource.refresh();
        break;
    }
  }
  flmvehiclepermitsPaging(val) {
    debugger;
    this.flmvehiclepermitssource.setPaging(1, val, true);
  }
  handleflmvehiclepermitsGridSelected(event) {
    this.flmvehiclepermitsselectedindex = this.flmvehicleservice.flmvehiclepermits.findIndex(i => i.permitid === event.data.permitid);
  }
  IsflmvehiclepermitsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmvehiclepermitsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmvehiclepermits
  //start of Grid Codes flmexpenses
  flmexpensessettings: any;
  flmexpensessource: any;

  showflmexpensesCheckbox() {
    debugger;
    if (this.tblflmexpensessource.settings['selectMode'] == 'multi') this.tblflmexpensessource.settings['selectMode'] = 'single';
    else
      this.tblflmexpensessource.settings['selectMode'] = 'multi';
    this.tblflmexpensessource.initGrid();
  }
  deleteflmexpensesAll() {
    this.tblflmexpensessource.settings['selectMode'] = 'single';
  }
  showflmexpensesFilter() {
    setTimeout(() => {
      this.SetflmexpensesTableddConfig();
    });
    if (this.tblflmexpensessource.settings != null) this.tblflmexpensessource.settings['hideSubHeader'] = !this.tblflmexpensessource.settings['hideSubHeader'];
    this.tblflmexpensessource.initGrid();
  }
  showflmexpensesInActive() {
  }
  enableflmexpensesInActive() {
  }
  async SetflmexpensesTableddConfig() {
    if (!this.bfilterPopulateflmexpenses) {

      this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => {
        var datavendorid2 = res as any;
        for (let i = 0; i < datavendorid2.length; i++) {
          var obj = { value: datavendorid2[i].supplierid, title: datavendorid2[i].suppliercode };
          this.dataflmexpensesvendorid3.push(obj);
        }
        var clone = this.clone(this.tblflmexpensessource.settings);
        clone.columns['vendorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmexpensesvendorid3)), }, };
        clone.columns['vendorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmexpensesvendorid3)), }, };
        this.tblflmexpensessource.settings = clone;
        this.tblflmexpensessource.initGrid();
      });
    }
    this.bfilterPopulateflmexpenses = true;
  }
  async flmexpensesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmexpensesTableConfig() {
    this.flmexpensessettings = {
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
        description: {
          title: 'description',
          type: '',
          filter: true,
        },
        expensetype: {
          title: 'expensetype',
          type: '',
          filter: true,
        },
        expensedate: {
          title: 'expensedate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        amount: {
          title: 'amount',
          type: 'number',
          filter: true,
        },
        vendorid: {
          title: 'Vendor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmexpensesvendorid3.find(c => c!.value == cell);
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
  flmexpensesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmexpensesID) >= 0) {
      this.flmexpensessource = new LocalDataSource();
      this.flmexpensessource.load(this.flmvehicleservice.flmexpenses as any as LocalDataSource);
      this.flmexpensessource.setPaging(1, 20, true);
    }
  }
  flmexpensesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflmexpense(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflmexpense(event, event.data.expenseid, this.formid);
        break;
      case 'delete':
        this.onDeleteflmexpense(event, event.data.expenseid, ((this.flmexpensessource.getPaging().page - 1) * this.flmexpensessource.getPaging().perPage) + event.index);
        this.flmexpensessource.refresh();
        break;
    }
  }
  flmexpensesonDelete(obj) {
    let expenseid = obj.data.expenseid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(expenseid).then((res:any) =>
        this.flmexpensesLoadTable()
      );
    }
  }
  flmexpensesPaging(val) {
    debugger;
    this.flmexpensessource.setPaging(1, val, true);
  }
  handleflmexpensesGridSelected(event) {
    this.flmexpensesselectedindex = this.flmvehicleservice.flmexpenses.findIndex(i => i.expenseid === event.data.expenseid);
  }
  IsflmexpensesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmexpensesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmexpenses
  //start of Grid Codes flminsurances
  flminsurancessettings: any;
  flminsurancessource: any;

  showflminsurancesCheckbox() {
    debugger;
    if (this.tblflminsurancessource.settings['selectMode'] == 'multi') this.tblflminsurancessource.settings['selectMode'] = 'single';
    else
      this.tblflminsurancessource.settings['selectMode'] = 'multi';
    this.tblflminsurancessource.initGrid();
  }
  deleteflminsurancesAll() {
    this.tblflminsurancessource.settings['selectMode'] = 'single';
  }
  showflminsurancesFilter() {
    setTimeout(() => {
      this.SetflminsurancesTableddConfig();
    });
    if (this.tblflminsurancessource.settings != null) this.tblflminsurancessource.settings['hideSubHeader'] = !this.tblflminsurancessource.settings['hideSubHeader'];
    this.tblflminsurancessource.initGrid();
  }
  showflminsurancesInActive() {
  }
  enableflminsurancesInActive() {
  }
  async SetflminsurancesTableddConfig() {
    if (!this.bfilterPopulateflminsurances) {

      this.configservice.getList("coveragetype").then((res:any) => {
        var datacoveragetype2 = res as any;
        for (let i = 0; i < datacoveragetype2.length; i++) {
          var obj = { value: datacoveragetype2[i].configkey, title: datacoveragetype2[i].configtext };
          this.dataflminsurancescoveragetype3.push(obj);
        }
        var clone = this.clone(this.tblflminsurancessource.settings);
        clone.columns['coveragetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminsurancescoveragetype3)), }, };
        clone.columns['coveragetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminsurancescoveragetype3)), }, };
        this.tblflminsurancessource.settings = clone;
        this.tblflminsurancessource.initGrid();
      });
    }
    this.bfilterPopulateflminsurances = true;
  }
  async flminsurancesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflminsurancesTableConfig() {
    this.flminsurancessettings = {
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
        insurancecompany: {
          title: 'insurancecompany',
          type: '',
          filter: true,
        },
        policyid: {
          title: 'policyid',
          type: '',
          filter: true,
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
        expireddate: {
          title: 'expireddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        coveragetype: {
          title: 'Coverage Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminsurancescoveragetype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        coverageamount: {
          title: 'coverageamount',
          type: 'number',
          filter: true,
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
        remarks: {
          title: 'remarks',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  flminsurancesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flminsurancesID) >= 0) {
      this.flminsurancessource = new LocalDataSource();
      this.flminsurancessource.load(this.flmvehicleservice.flminsurances as any as LocalDataSource);
      this.flminsurancessource.setPaging(1, 20, true);
    }
  }
  flminsurancesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflminsurance(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflminsurance(event, event.data.insuranceid, this.formid);
        break;
      case 'delete':
        this.onDeleteflminsurance(event, event.data.insuranceid, ((this.flminsurancessource.getPaging().page - 1) * this.flminsurancessource.getPaging().perPage) + event.index);
        this.flminsurancessource.refresh();
        break;
    }
  }
  flminsurancesonDelete(obj) {
    let insuranceid = obj.data.insuranceid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(insuranceid).then((res:any) =>
        this.flminsurancesLoadTable()
      );
    }
  }
  flminsurancesPaging(val) {
    debugger;
    this.flminsurancessource.setPaging(1, val, true);
  }
  handleflminsurancesGridSelected(event) {
    this.flminsurancesselectedindex = this.flmvehicleservice.flminsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
  }
  IsflminsurancesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flminsurancesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flminsurances
  //start of Grid Codes flmservicerequests
  flmservicerequestssettings: any;
  flmservicerequestssource: any;

  showflmservicerequestsCheckbox() {
    debugger;
    if (this.tblflmservicerequestssource.settings['selectMode'] == 'multi') this.tblflmservicerequestssource.settings['selectMode'] = 'single';
    else
      this.tblflmservicerequestssource.settings['selectMode'] = 'multi';
    this.tblflmservicerequestssource.initGrid();
  }
  deleteflmservicerequestsAll() {
    this.tblflmservicerequestssource.settings['selectMode'] = 'single';
  }
  showflmservicerequestsFilter() {
    setTimeout(() => {
      this.SetflmservicerequestsTableddConfig();
    });
    if (this.tblflmservicerequestssource.settings != null) this.tblflmservicerequestssource.settings['hideSubHeader'] = !this.tblflmservicerequestssource.settings['hideSubHeader'];
    this.tblflmservicerequestssource.initGrid();
  }
  showflmservicerequestsInActive() {
  }
  enableflmservicerequestsInActive() {
  }
  async SetflmservicerequestsTableddConfig() {
    if (!this.bfilterPopulateflmservicerequests) {

      this.configservice.getList("servicecategory").then((res:any) => {
        var dataservicecategory2 = res as any;
        for (let i = 0; i < dataservicecategory2.length; i++) {
          var obj = { value: dataservicecategory2[i].configkey, title: dataservicecategory2[i].configtext };
          this.dataflmservicerequestsservicecategory3.push(obj);
        }
        var clone = this.clone(this.tblflmservicerequestssource.settings);
        clone.columns['servicecategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestsservicecategory3)), }, };
        clone.columns['servicecategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestsservicecategory3)), }, };
        this.tblflmservicerequestssource.settings = clone;
        this.tblflmservicerequestssource.initGrid();
      });

      this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => {
        var datavendorid2 = res as any;
        for (let i = 0; i < datavendorid2.length; i++) {
          var obj = { value: datavendorid2[i].supplierid, title: datavendorid2[i].suppliercode };
          this.dataflmservicerequestsvendorid3.push(obj);
        }
        var clone = this.clone(this.tblflmservicerequestssource.settings);
        clone.columns['vendorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestsvendorid3)), }, };
        clone.columns['vendorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestsvendorid3)), }, };
        this.tblflmservicerequestssource.settings = clone;
        this.tblflmservicerequestssource.initGrid();
      });
    }
    this.bfilterPopulateflmservicerequests = true;
  }
  async flmservicerequestsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflmservicerequestsTableConfig() {
    this.flmservicerequestssettings = {
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
        servicecategory: {
          title: 'Service Category',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmservicerequestsservicecategory3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        description: {
          title: 'description',
          type: '',
          filter: true,
        },
        odometerreading: {
          title: 'odometerreading',
          type: 'number',
          filter: true,
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
        starttime: {
          title: 'starttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        enddate: {
          title: 'enddate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        endtime: {
          title: 'endtime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        vendorid: {
          title: 'Vendor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflmservicerequestsvendorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        reference: {
          title: 'reference',
          type: '',
          filter: true,
        },
        details: {
          title: 'details',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        labourcost: {
          title: 'labourcost',
          type: 'number',
          filter: true,
        },
        partscost: {
          title: 'partscost',
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
        tax: {
          title: 'tax',
          type: 'number',
          filter: true,
        },
        taxamount: {
          title: 'taxamount',
          type: 'number',
          filter: true,
        },
        totalcost: {
          title: 'totalcost',
          type: 'number',
          filter: true,
        },
        comments: {
          title: 'comments',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
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
  flmservicerequestsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmservicerequestsID) >= 0) {
      this.flmservicerequestssource = new LocalDataSource();
      this.flmservicerequestssource.load(this.flmvehicleservice.flmservicerequests as any as LocalDataSource);
      this.flmservicerequestssource.setPaging(1, 20, true);
    }
  }
  flmservicerequestsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflmservicerequest(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflmservicerequest(event, event.data.servicerequestid, this.formid);
        break;
      case 'delete':
        this.onDeleteflmservicerequest(event, event.data.servicerequestid, ((this.flmservicerequestssource.getPaging().page - 1) * this.flmservicerequestssource.getPaging().perPage) + event.index);
        this.flmservicerequestssource.refresh();
        break;
    }
  }
  flmservicerequestsonDelete(obj) {
    let servicerequestid = obj.data.servicerequestid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(servicerequestid).then((res:any) =>
        this.flmservicerequestsLoadTable()
      );
    }
  }
  flmservicerequestsPaging(val) {
    debugger;
    this.flmservicerequestssource.setPaging(1, val, true);
  }
  handleflmservicerequestsGridSelected(event) {
    this.flmservicerequestsselectedindex = this.flmvehicleservice.flmservicerequests.findIndex(i => i.servicerequestid === event.data.servicerequestid);
  }
  IsflmservicerequestsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmservicerequestsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flmservicerequests
  //start of Grid Codes flminspections
  flminspectionssettings: any;
  flminspectionssource: any;

  showflminspectionsCheckbox() {
    debugger;
    if (this.tblflminspectionssource.settings['selectMode'] == 'multi') this.tblflminspectionssource.settings['selectMode'] = 'single';
    else
      this.tblflminspectionssource.settings['selectMode'] = 'multi';
    this.tblflminspectionssource.initGrid();
  }
  deleteflminspectionsAll() {
    this.tblflminspectionssource.settings['selectMode'] = 'single';
  }
  showflminspectionsFilter() {
    setTimeout(() => {
      this.SetflminspectionsTableddConfig();
    });
    if (this.tblflminspectionssource.settings != null) this.tblflminspectionssource.settings['hideSubHeader'] = !this.tblflminspectionssource.settings['hideSubHeader'];
    this.tblflminspectionssource.initGrid();
  }
  showflminspectionsInActive() {
  }
  enableflminspectionsInActive() {
  }
  async SetflminspectionsTableddConfig() {
    if (!this.bfilterPopulateflminspections) {

      this.configservice.getList("rating").then((res:any) => {
        var datainteriorcleanliness2 = res as any;
        for (let i = 0; i < datainteriorcleanliness2.length; i++) {
          var obj = { value: datainteriorcleanliness2[i].configkey, title: datainteriorcleanliness2[i].configtext };
          this.dataflminspectionsinteriorcleanliness3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['interiorcleanliness'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsinteriorcleanliness3)), }, };
        clone.columns['interiorcleanliness'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsinteriorcleanliness3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataengine2 = res as any;
        for (let i = 0; i < dataengine2.length; i++) {
          var obj = { value: dataengine2[i].configkey, title: dataengine2[i].configtext };
          this.dataflminspectionsengine3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['engine'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsengine3)), }, };
        clone.columns['engine'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsengine3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataoillife2 = res as any;
        for (let i = 0; i < dataoillife2.length; i++) {
          var obj = { value: dataoillife2[i].configkey, title: dataoillife2[i].configtext };
          this.dataflminspectionsoillife3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['oillife'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsoillife3)), }, };
        clone.columns['oillife'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsoillife3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datafuellevel2 = res as any;
        for (let i = 0; i < datafuellevel2.length; i++) {
          var obj = { value: datafuellevel2[i].configkey, title: datafuellevel2[i].configtext };
          this.dataflminspectionsfuellevel3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['fuellevel'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsfuellevel3)), }, };
        clone.columns['fuellevel'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsfuellevel3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datatransmission2 = res as any;
        for (let i = 0; i < datatransmission2.length; i++) {
          var obj = { value: datatransmission2[i].configkey, title: datatransmission2[i].configtext };
          this.dataflminspectionstransmission3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['transmission'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionstransmission3)), }, };
        clone.columns['transmission'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionstransmission3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataclutch2 = res as any;
        for (let i = 0; i < dataclutch2.length; i++) {
          var obj = { value: dataclutch2[i].configkey, title: dataclutch2[i].configtext };
          this.dataflminspectionsclutch3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['clutch'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsclutch3)), }, };
        clone.columns['clutch'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsclutch3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datasteeringmechanism2 = res as any;
        for (let i = 0; i < datasteeringmechanism2.length; i++) {
          var obj = { value: datasteeringmechanism2[i].configkey, title: datasteeringmechanism2[i].configtext };
          this.dataflminspectionssteeringmechanism3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['steeringmechanism'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionssteeringmechanism3)), }, };
        clone.columns['steeringmechanism'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionssteeringmechanism3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datahorn2 = res as any;
        for (let i = 0; i < datahorn2.length; i++) {
          var obj = { value: datahorn2[i].configkey, title: datahorn2[i].configtext };
          this.dataflminspectionshorn3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['horn'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionshorn3)), }, };
        clone.columns['horn'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionshorn3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datawindshield2 = res as any;
        for (let i = 0; i < datawindshield2.length; i++) {
          var obj = { value: datawindshield2[i].configkey, title: datawindshield2[i].configtext };
          this.dataflminspectionswindshield3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['windshield'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswindshield3)), }, };
        clone.columns['windshield'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswindshield3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datawipers2 = res as any;
        for (let i = 0; i < datawipers2.length; i++) {
          var obj = { value: datawipers2[i].configkey, title: datawipers2[i].configtext };
          this.dataflminspectionswipers3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['wipers'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswipers3)), }, };
        clone.columns['wipers'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswipers3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datawashers2 = res as any;
        for (let i = 0; i < datawashers2.length; i++) {
          var obj = { value: datawashers2[i].configkey, title: datawashers2[i].configtext };
          this.dataflminspectionswashers3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['washers'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswashers3)), }, };
        clone.columns['washers'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswashers3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datarearvisionmirrors2 = res as any;
        for (let i = 0; i < datarearvisionmirrors2.length; i++) {
          var obj = { value: datarearvisionmirrors2[i].configkey, title: datarearvisionmirrors2[i].configtext };
          this.dataflminspectionsrearvisionmirrors3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['rearvisionmirrors'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsrearvisionmirrors3)), }, };
        clone.columns['rearvisionmirrors'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsrearvisionmirrors3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datalighting2 = res as any;
        for (let i = 0; i < datalighting2.length; i++) {
          var obj = { value: datalighting2[i].configkey, title: datalighting2[i].configtext };
          this.dataflminspectionslighting3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['lighting'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionslighting3)), }, };
        clone.columns['lighting'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionslighting3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datareflector2 = res as any;
        for (let i = 0; i < datareflector2.length; i++) {
          var obj = { value: datareflector2[i].configkey, title: datareflector2[i].configtext };
          this.dataflminspectionsreflector3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['reflector'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsreflector3)), }, };
        clone.columns['reflector'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsreflector3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataparkingbrake2 = res as any;
        for (let i = 0; i < dataparkingbrake2.length; i++) {
          var obj = { value: dataparkingbrake2[i].configkey, title: dataparkingbrake2[i].configtext };
          this.dataflminspectionsparkingbrake3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['parkingbrake'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsparkingbrake3)), }, };
        clone.columns['parkingbrake'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsparkingbrake3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataservicebrake2 = res as any;
        for (let i = 0; i < dataservicebrake2.length; i++) {
          var obj = { value: dataservicebrake2[i].configkey, title: dataservicebrake2[i].configtext };
          this.dataflminspectionsservicebrake3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['servicebrake'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsservicebrake3)), }, };
        clone.columns['servicebrake'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsservicebrake3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataairlines2 = res as any;
        for (let i = 0; i < dataairlines2.length; i++) {
          var obj = { value: dataairlines2[i].configkey, title: dataairlines2[i].configtext };
          this.dataflminspectionsairlines3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['airlines'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsairlines3)), }, };
        clone.columns['airlines'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsairlines3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datacouplingdevice2 = res as any;
        for (let i = 0; i < datacouplingdevice2.length; i++) {
          var obj = { value: datacouplingdevice2[i].configkey, title: datacouplingdevice2[i].configtext };
          this.dataflminspectionscouplingdevice3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['couplingdevice'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionscouplingdevice3)), }, };
        clone.columns['couplingdevice'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionscouplingdevice3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datatyres2 = res as any;
        for (let i = 0; i < datatyres2.length; i++) {
          var obj = { value: datatyres2[i].configkey, title: datatyres2[i].configtext };
          this.dataflminspectionstyres3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['tyres'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionstyres3)), }, };
        clone.columns['tyres'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionstyres3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datawheels2 = res as any;
        for (let i = 0; i < datawheels2.length; i++) {
          var obj = { value: datawheels2[i].configkey, title: datawheels2[i].configtext };
          this.dataflminspectionswheels3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['wheels'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswheels3)), }, };
        clone.columns['wheels'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionswheels3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datarims2 = res as any;
        for (let i = 0; i < datarims2.length; i++) {
          var obj = { value: datarims2[i].configkey, title: datarims2[i].configtext };
          this.dataflminspectionsrims3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['rims'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsrims3)), }, };
        clone.columns['rims'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsrims3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var dataemergencyequipment2 = res as any;
        for (let i = 0; i < dataemergencyequipment2.length; i++) {
          var obj = { value: dataemergencyequipment2[i].configkey, title: dataemergencyequipment2[i].configtext };
          this.dataflminspectionsemergencyequipment3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['emergencyequipment'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsemergencyequipment3)), }, };
        clone.columns['emergencyequipment'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsemergencyequipment3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datavehiclecondition2 = res as any;
        for (let i = 0; i < datavehiclecondition2.length; i++) {
          var obj = { value: datavehiclecondition2[i].configkey, title: datavehiclecondition2[i].configtext };
          this.dataflminspectionsvehiclecondition3.push(obj);
        }
        var clone = this.clone(this.tblflminspectionssource.settings);
        clone.columns['vehiclecondition'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsvehiclecondition3)), }, };
        clone.columns['vehiclecondition'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflminspectionsvehiclecondition3)), }, };
        this.tblflminspectionssource.settings = clone;
        this.tblflminspectionssource.initGrid();
      });
    }
    this.bfilterPopulateflminspections = true;
  }
  async flminspectionsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetflminspectionsTableConfig() {
    this.flminspectionssettings = {
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
        description: {
          title: 'description',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        odometerreading: {
          title: 'odometerreading',
          type: 'number',
          filter: true,
        },
        odometerreadingremarks: {
          title: 'odometerreadingremarks',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        interiorcleanliness: {
          title: 'InteriorCleanliness',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsinteriorcleanliness3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        interiorcleanlinessremarks: {
          title: 'interiorcleanlinessremarks',
          type: '',
          filter: true,
        },
        engine: {
          title: 'Engine',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsengine3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        engineremarks: {
          title: 'engineremarks',
          type: '',
          filter: true,
        },
        oillife: {
          title: 'Oillife',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsoillife3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        oilliferemarks: {
          title: 'oilliferemarks',
          type: '',
          filter: true,
        },
        fuellevel: {
          title: 'Fuellevel',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsfuellevel3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        fuellevelremarks: {
          title: 'fuellevelremarks',
          type: '',
          filter: true,
        },
        transmission: {
          title: 'Transmission',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionstransmission3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        transmissionremarks: {
          title: 'transmissionremarks',
          type: '',
          filter: true,
        },
        clutch: {
          title: 'Clutch',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsclutch3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        clutchremarks: {
          title: 'clutchremarks',
          type: '',
          filter: true,
        },
        steeringmechanism: {
          title: 'SteeringMechanism',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionssteeringmechanism3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        steeringmechanismremarks: {
          title: 'steeringmechanismremarks',
          type: '',
          filter: true,
        },
        horn: {
          title: 'Horn',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionshorn3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        hornremarks: {
          title: 'hornremarks',
          type: '',
          filter: true,
        },
        windshield: {
          title: 'Windshield',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionswindshield3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        windshieldremarks: {
          title: 'windshieldremarks',
          type: '',
          filter: true,
        },
        wipers: {
          title: 'Wipers',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionswipers3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        wipersremarks: {
          title: 'wipersremarks',
          type: '',
          filter: true,
        },
        washers: {
          title: 'Washers',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionswashers3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        washersremarks: {
          title: 'washersremarks',
          type: '',
          filter: true,
        },
        rearvisionmirrors: {
          title: 'RearVisionMirrors',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsrearvisionmirrors3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        rearvisionmirrorsremarks: {
          title: 'rearvisionmirrorsremarks',
          type: '',
          filter: true,
        },
        lighting: {
          title: 'Lighting',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionslighting3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        lightingremarks: {
          title: 'lightingremarks',
          type: '',
          filter: true,
        },
        reflector: {
          title: 'Reflector',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsreflector3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        reflectorremarks: {
          title: 'reflectorremarks',
          type: '',
          filter: true,
        },
        parkingbrake: {
          title: 'ParkingBrake',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsparkingbrake3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        parkingbrakeremarks: {
          title: 'parkingbrakeremarks',
          type: '',
          filter: true,
        },
        servicebrake: {
          title: 'ServiceBrake',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsservicebrake3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        servicebrakeremarks: {
          title: 'servicebrakeremarks',
          type: '',
          filter: true,
        },
        airlines: {
          title: 'AirLines',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsairlines3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        airlinesremarks: {
          title: 'airlinesremarks',
          type: '',
          filter: true,
        },
        couplingdevice: {
          title: 'CouplingDevice',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionscouplingdevice3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        couplingdeviceremarks: {
          title: 'couplingdeviceremarks',
          type: '',
          filter: true,
        },
        tyres: {
          title: 'Tyres',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionstyres3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        tyresremarks: {
          title: 'tyresremarks',
          type: '',
          filter: true,
        },
        wheels: {
          title: 'Wheels',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionswheels3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        wheelsremarks: {
          title: 'wheelsremarks',
          type: '',
          filter: true,
        },
        rims: {
          title: 'Rims',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsrims3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        rimsremarks: {
          title: 'rimsremarks',
          type: '',
          filter: true,
        },
        emergencyequipment: {
          title: 'EmergencyEquipment',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsemergencyequipment3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        emergencyequipmentremarks: {
          title: 'emergencyequipmentremarks',
          type: '',
          filter: true,
        },
        vehiclecondition: {
          title: 'VehicleCondition',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataflminspectionsvehiclecondition3.find(c => c!.value == cell);
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
        drivernotes: {
          title: 'drivernotes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        driversignature: {
          title: 'driversignature',
          type: '',
          filter: true,
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
  flminspectionsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flminspectionsID) >= 0) {
      this.flminspectionssource = new LocalDataSource();
      this.flminspectionssource.load(this.flmvehicleservice.flminspections as any as LocalDataSource);
      this.flminspectionssource.setPaging(1, 20, true);
    }
  }
  flminspectionsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditflminspection(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditflminspection(event, event.data.inspectionid, this.formid);
        break;
      case 'delete':
        this.onDeleteflminspection(event, event.data.inspectionid, ((this.flminspectionssource.getPaging().page - 1) * this.flminspectionssource.getPaging().perPage) + event.index);
        this.flminspectionssource.refresh();
        break;
    }
  }
  flminspectionsonDelete(obj) {
    let inspectionid = obj.data.inspectionid;
    if (confirm('Are you sure to delete this record ?')) {
      this.flmvehicleservice.deleteflmvehicle(inspectionid).then((res:any) =>
        this.flminspectionsLoadTable()
      );
    }
  }
  flminspectionsPaging(val) {
    debugger;
    this.flminspectionssource.setPaging(1, val, true);
  }
  handleflminspectionsGridSelected(event) {
    this.flminspectionsselectedindex = this.flmvehicleservice.flminspections.findIndex(i => i.inspectionid === event.data.inspectionid);
  }
  IsflminspectionsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flminspectionsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes flminspections

}



