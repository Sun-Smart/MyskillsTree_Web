import { lmspendingService } from './../../../service/lmspending.service';
import { lmspending } from './../../../model/lmspending.model';
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
import { bobranchmaster } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { bobranchlocation } from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
import { lmsmaster } from './../../../model/lmsmaster.model';
import { lmsmasterService } from './../../../service/lmsmaster.service';
import { lmsproductmaster } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { lmstask } from './../../../model/lmstask.model';
import { lmstaskComponent } from './lmstask.component';
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmshistory } from './../../../model/lmshistory.model';
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
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-lmspending',
  templateUrl: './lmspending.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class lmspendingComponent implements OnInit {
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
  bfilterPopulatelmspendings: boolean = false;
  datalmspendingsbranchid3: any = [];
  datalmspendingsbranchlocationid3: any = [];
  datalmspendingsleadid3: any = [];
  datalmspendingsproductid3: any = [];
  datalmspendingscampaignid3: any = [];
  datalmspendingsleadby3: any = [];
  datalmspendingscurrentowner3: any = [];
  datalmspendingsleadresponse3: any = [];
  datalmspendingsnextaction3: any = [];
  datalmspendingssource3: any = [];
  datalmspendingsstage3: any = [];
  datalmspendingscriticality3: any = [];
  datalmstasksassignto3: any = [];
  bfilterPopulatelmstasks: boolean = false;
  bfilterPopulatelmsreminders: boolean = false;
  datalmshistoriescampaignid3: any = [];
  datalmshistoriescriticality3: any = [];
  datalmshistoriesleadid3: any = [];
  datalmshistoriesnextaction3: any = [];
  datalmshistoriesproductid3: any = [];
  datalmshistoriessource3: any = [];
  datalmshistoriesstage3: any = [];
  datalmshistoriesbranchid3: any = [];
  datalmshistoriesbranchlocationid3: any = [];
  datalmshistoriescurrentowner3: any = [];
  datalmshistoriesleadby3: any = [];
  datalmshistoriesleadresponse3: any = [];
  bfilterPopulatelmshistories: boolean = false;
  @ViewChild('tbllmstaskssource', { static: false }) tbllmstaskssource: Ng2SmartTableComponent;
  @ViewChild('tbllmsreminderssource', { static: false }) tbllmsreminderssource: Ng2SmartTableComponent;
  @ViewChild('tbllmshistoriessource', { static: false }) tbllmshistoriessource: Ng2SmartTableComponent;
  lmspendingForm: FormGroup;
  branchidList: bobranchmaster[];
  branchid_bobranchmastersForm: FormGroup;
  branchid_bobranchmastersoptions: any;
  branchid_bobranchmastersformatter: any;
  branchlocationidList: bobranchlocation[];
  branchlocationid_bobranchlocationsForm: FormGroup;
  branchlocationid_bobranchlocationsoptions: any;
  branchlocationid_bobranchlocationsformatter: any;
  leadidList: lmsmaster[];
  productidList: lmsproductmaster[];
  campaignidList: lmsproductmaster[];
  leadbyList: bousermaster[];
  leadby_bousermastersForm: FormGroup;
  leadby_bousermastersoptions: any;
  leadby_bousermastersformatter: any;
  currentownerList: bousermaster[];
  currentowner_bousermastersForm: FormGroup;
  currentowner_bousermastersoptions: any;
  currentowner_bousermastersformatter: any;
  leadresponseList: boconfigvalue[]=[];
  nextactionList: boconfigvalue[]=[];
  sourceList: boconfigvalue[]=[];
  stageList: boconfigvalue[]=[];
  criticalityList: boconfigvalue[]=[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  customfieldjson: any;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  SESSIONUSERID: any;
  sessiondata: any;
  DeletedlmstaskIDs: string = "";
  lmstasksID: string = "1";
  lmstasksselectedindex: any;
  DeletedlmsreminderIDs: string = "";
  lmsremindersID: string = "2";
  lmsremindersselectedindex: any;
  DeletedlmshistoryIDs: string = "";
  lmshistoriesID: string = "3";
  lmshistoriesselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private lmspendingservice: lmspendingService,
    private bousermasterservice: bousermasterService,
    private lmsproductmasterservice: lmsproductmasterService,
    private lmsmasterservice: lmsmasterService,
    private bobranchmasterservice: bobranchmasterService,
    private bobranchlocationservice: bobranchlocationService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
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
    this.lmspendingForm = this.fb.group({
      ImageName: [null],
      branchid: [null],
      branchiddesc: [null],
      branchlocationid: [null],
      branchlocationiddesc: [null],
      leadid: [null],
      leadiddesc: [null],
      opportunityid: [null],
      callid: [null],
      productid: [null],
      productiddesc: [null],
      campaignid: [null],
      campaigniddesc: [null],
      leadby: [null],
      leadbydesc: [null],
      currentowner: [null],
      currentownerdesc: [null],
      leadresponse: [null],
      leadresponsedesc: [null],
      nextcalldate: [null],
      nextaction: [null],
      nextactiondesc: [null],
      actiondatetime: [null],
      previousremarks: [null],
      leadscore: [null],
      source: [null],
      sourcedesc: [null],
      stage: [null],
      stagedesc: [null],
      criticality: [null],
      criticalitydesc: [null],
      expectedcloseby: [null],
      expectedvalue: [null],
      attachment: [null],
      customfield: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.lmspendingForm.controls; }

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
    if (this.lmspendingForm.dirty && this.lmspendingForm.touched) {
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
    let lmspending = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.callid != null) {
      lmspending = this.data.callid;
    }
    else
      lmspending = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = lmspending;
    //this.sharedService.alert(lmspending);
    if (lmspending == null) {
      this.SetlmstasksTableConfig();
      setTimeout(() => {
        this.SetlmstasksTableddConfig();
      });
      this.SetlmsremindersTableConfig();
      setTimeout(() => {
        this.SetlmsremindersTableddConfig();
      });
      this.SetlmshistoriesTableConfig();
      setTimeout(() => {
        this.SetlmshistoriesTableddConfig();
      });
      this.FillCustomField();
      this.resetForm();
    }
    else {
      await this.PopulateScreen(lmspending);
    }
    this.bobranchmasterservice.getbobranchmastersList().then((res:any) => {
      this.branchidList = res as bobranchmaster[];
    }
    );
    this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
    setTimeout(() => {
      if (this.f.branchid.value != "" && this.f.branchid.value != null) this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then((res:any) => this.branchlocationidList = res as bobranchlocation[]);
    });
    this.branchlocationid_bobranchlocationsoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.branchlocationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.branchlocationid_bobranchlocationsformatter = (result: any) => result.locationname;
    this.lmsmasterservice.getlmsmastersList().then((res:any) => {
      this.leadidList = res as lmsmaster[];
    }
    );
    this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
      this.productidList = res as lmsproductmaster[];
    }
    );
    this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
      this.campaignidList = res as lmsproductmaster[];
    }
    );
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
    this.bousermasterservice.getbousermastersList().then((res:any) => {
      this.currentownerList = res as bousermaster[];
    }
    );
    this.currentowner_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.currentownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.currentowner_bousermastersformatter = (result: any) => result.username;
    this.configservice.getList("leadresponse").then((res:any) => this.leadresponseList = res as boconfigvalue[]);
    this.configservice.getList("leadaction").then((res:any) => this.nextactionList = res as boconfigvalue[]);
    this.configservice.getList("leadsource").then((res:any) => this.sourceList = res as boconfigvalue[]);
    this.configservice.getList("leadstage").then((res:any) => this.stageList = res as boconfigvalue[]);
    this.configservice.getList("leadnature").then((res:any) => this.criticalityList = res as boconfigvalue[]);
    this.lmspendingForm.markAsUntouched();
    this.lmspendingForm.markAsPristine();
  }
  onSelectedbranchid(branchidDetail: any) {
    if (branchidDetail) {
      this.lmspendingForm.patchValue({ branchid: branchidDetail.item.branchid });
      this.lmspendingForm.patchValue({ branchiddesc: branchidDetail.item.branchname });
      branchidDetail.preventDefault();
      this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then((res:any) => this.branchlocationidList = res as bobranchlocation[]);

    }
  }

  onSelectedbranchlocationid(branchlocationidDetail: any) {
    if (branchlocationidDetail) {
      this.lmspendingForm.patchValue({ branchlocationid: branchlocationidDetail.item.locationid });
      this.lmspendingForm.patchValue({ branchlocationiddesc: branchlocationidDetail.item.locationname });
      branchlocationidDetail.preventDefault();

    }
  }

  onSelectedleadby(leadbyDetail: any) {
    if (leadbyDetail) {
      this.lmspendingForm.patchValue({ leadby: leadbyDetail.item.userid });
      this.lmspendingForm.patchValue({ leadbydesc: leadbyDetail.item.username });
      leadbyDetail.preventDefault();

    }
  }

  onSelectedcurrentowner(currentownerDetail: any) {
    if (currentownerDetail) {
      this.lmspendingForm.patchValue({ currentowner: currentownerDetail.item.userid });
      this.lmspendingForm.patchValue({ currentownerdesc: currentownerDetail.item.username });
      currentownerDetail.preventDefault();

    }
  }




  resetForm() {
    if (this.lmspendingForm != null)
      this.lmspendingForm.reset();
    this.lmspendingForm.patchValue({
      branchid: this.sessiondata.branchid,
      branchiddesc: this.sessiondata.branchiddesc,
      leadby: this.sessiondata.userid,
      leadbydesc: this.sessiondata.username,
      currentowner: this.sessiondata.userid,
      currentownerdesc: this.sessiondata.username,
    });
    setTimeout(() => {
      this.lmspendingservice.lmstasks = [];
      this.lmstasksLoadTable();
      this.lmspendingservice.lmsreminders = [];
      this.lmsremindersLoadTable();
      this.lmspendingservice.lmshistories = [];
      this.lmshistoriesLoadTable();
    });
    this.customfieldservice.reset(document);
    if (this.data != null) {
      for (let key in this.data) {

        let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
        if (this.lmspendingForm.controls[key] != null) {
          this.lmspendingForm.patchValue(json);
          this.lmspendingForm.controls[key].disable({ onlySelf: true });
        }
      }
    }
  }

  onDelete() {
    let callid = this.lmspendingForm.get('callid').value;
    if (callid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.lmspendingservice.deletelmspending(callid).then((res:any) => {
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
    this.lmspendingForm.patchValue({
      callid: null
    });
    if (this.lmspendingservice.formData.callid != null) this.lmspendingservice.formData.callid = null;
    for (let i = 0; i < this.lmspendingservice.lmstasks.length; i++) {
      this.lmspendingservice.lmstasks[i].taskid = null;
    }
    for (let i = 0; i < this.lmspendingservice.lmsreminders.length; i++) {
      this.lmspendingservice.lmsreminders[i].reminderid = null;
    }
    for (let i = 0; i < this.lmspendingservice.lmshistories.length; i++) {
      this.lmspendingservice.lmshistories[i].callid = null;
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("lmspendings", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
  branchidonChange(evt:any) {
    let e = evt.value;
  }
  branchlocationidonChange(evt:any) {
    let e = evt.value;
  }
  leadidonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
  }
  productidonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
  }
  campaignidonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
  }
  leadbyonChange(evt:any) {
    let e = evt.value;
  }
  currentowneronChange(evt:any) {
    let e = evt.value;
  }
  leadresponseonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ leadresponsedesc: evt.options[evt.options.selectedIndex].text });
  }
  nextactiononChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ nextactiondesc: evt.options[evt.options.selectedIndex].text });
  }
  sourceonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
  }
  stageonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ stagedesc: evt.options[evt.options.selectedIndex].text });
  }
  criticalityonChange(evt:any) {
    let e = evt.value;
    this.lmspendingForm.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
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
  public triggerSnapshot(): void {
    debugger;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    debugger;
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    debugger;
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    debugger;
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    debugger;
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    debugger;
    return this.nextWebcam.asObservable();
  }
  async OCR() {

    const worker = createWorker({
      //logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng+ara');
    await worker.initialize('eng+ara');
    const rectangles = [];
    let rectangle: any;
    rectangle = { left: 294, top: 616, width: 335 - 294, height: 635 - 616 };
    rectangles.push(rectangle);
    rectangle = { left: 440, top: 618, width: 499 - 440, height: 635 - 618 };
    rectangles.push(rectangle);
    rectangle = { left: 568, top: 616, width: 739 - 568, height: 647 - 616 };
    rectangles.push(rectangle);
    rectangle = { left: 278, top: 655, width: 337 - 278, height: 674 - 655 };
    rectangles.push(rectangle);
    rectangle = { left: 276, top: 702, width: 740 - 276, height: 721 - 702 };
    rectangles.push(rectangle);
    rectangle = { left: 280, top: 744, width: 429 - 280, height: 769 - 744 };
    rectangles.push(rectangle);
    /*
      const values = [];
      for (let i = 0; i < rectangles.length; i++) {
        const { data: { text } } = await worker.recognize("/assets/"+this.lmspendingForm.get('ImageName').value, { rectangle: rectangles[i] });
        values.push(text);
      }
      console.log(values);
    */
    //, { rectangle }
    debugger;
    const { data: { text } } = await worker.recognize("/assets/" + this.lmspendingForm.get('ImageName').value);
    this.sharedService.alert(text);
    console.log(text);

    const { data } = await worker.detect("/assets/" + this.lmspendingForm.get('ImageName').value);
    console.log(data);
    await worker.terminate();
    if (this.customfieldservice.list != null) {
      for (let i = 0; i < this.customfieldservice.list.length; i++) {
        let value = this.customfieldservice.list[i];
        if (value.controltype == 'ocr' && (value.configurations != undefined && value.configurations != null)) {
          var obj = (document.all[value.name]) as any;
          var re = new RegExp(value.configurations, "gm");
          let match = re.exec(text);
          console.log(match);
          if (match != null && match[0] != null) obj.value = match[0];//result.text.replace(re,"$1");
        }
      }
    }

  }


  pushtoUpload() {
    var imageBlob = this.sharedService.dataURItoBlob(this.webcamImage.imageAsDataUrl);
    const imageFile = new File([imageBlob], this.lmspendingForm.get('ImageName').value + ".jpeg", { type: 'image/jpeg' });
    var files: any[] = [];
    files.push(imageFile);
    let e = { files: files };
    this.attachmentuploader(e:any);


  }
  async PopulateScreen(lmspending: any) {
    this.lmspendingservice.getlmspendingsByID(parseInt(lmspending)).then((res:any) => {

      this.FillData(res);
    });
  }
  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.lmspendingForm.patchValue({
      branchid: res.lmspending.branchid,
      branchiddesc: res.lmspending.branchiddesc,
      branchlocationid: res.lmspending.branchlocationid,
      branchlocationiddesc: res.lmspending.branchlocationiddesc,
      leadid: res.lmspending.leadid,
      leadiddesc: res.lmspending.leadiddesc,
      opportunityid: res.lmspending.opportunityid,
      callid: res.lmspending.callid,
      productid: res.lmspending.productid,
      productiddesc: res.lmspending.productiddesc,
      campaignid: res.lmspending.campaignid,
      campaigniddesc: res.lmspending.campaigniddesc,
      leadby: res.lmspending.leadby,
      leadbydesc: res.lmspending.leadbydesc,
      currentowner: res.lmspending.currentowner,
      currentownerdesc: res.lmspending.currentownerdesc,
      leadresponse: res.lmspending.leadresponse,
      leadresponsedesc: res.lmspending.leadresponsedesc,
      nextcalldate: this.ngbDateParserFormatter.parse(res.lmspending.nextcalldate),
      nextaction: res.lmspending.nextaction,
      nextactiondesc: res.lmspending.nextactiondesc,
      actiondatetime: this.ngbDateParserFormatter.parse(res.lmspending.actiondatetime),
      previousremarks: res.lmspending.previousremarks,
      leadscore: res.lmspending.leadscore,
      source: res.lmspending.source,
      sourcedesc: res.lmspending.sourcedesc,
      stage: res.lmspending.stage,
      stagedesc: res.lmspending.stagedesc,
      criticality: res.lmspending.criticality,
      criticalitydesc: res.lmspending.criticalitydesc,
      expectedcloseby: this.ngbDateParserFormatter.parse(res.lmspending.expectedcloseby),
      expectedvalue: res.lmspending.expectedvalue,
      attachment: res.lmspending.attachment,
      customfield: res.lmspending.customfield,
      status: res.lmspending.status,
      statusdesc: res.lmspending.statusdesc,
    });
    if (this.lmspendingForm.get('customfield').value != null && this.lmspendingForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.lmspendingForm.get('customfield').value);
    this.FillCustomField();
    if (this.lmspendingForm.get('attachment').value != null && this.lmspendingForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.lmspendingForm.get('attachment').value);
    setTimeout(() => {
      if (this.f.branchid.value != "" && this.f.branchid.value != null) this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then((res:any) => this.branchlocationidList = res as bobranchlocation[]);
    });
    this.lmspendingservice.lmstasks = res.lmstask;
    this.SetlmstasksTableConfig();
    this.lmstasksLoadTable();
    setTimeout(() => {
      this.SetlmstasksTableddConfig();
    });
    this.lmspendingservice.lmsreminders = res.lmsreminder;
    this.SetlmsremindersTableConfig();
    this.lmsremindersLoadTable();
    setTimeout(() => {
      this.SetlmsremindersTableddConfig();
    });
    this.lmspendingservice.lmshistories = res.lmshistory;
    this.SetlmshistoriesTableConfig();
    this.lmshistoriesLoadTable();
    setTimeout(() => {
      this.SetlmshistoriesTableddConfig();
    });
  }
  validate() {
    let ret = true;
    return ret;
  }
  onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    if (!this.lmspendingForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.lmspendingservice.formData = this.lmspendingForm.value;
    if (this.data != null) {
      for (let key in this.data) {
        if (this.lmspendingForm.controls[key] != null) {
          this.lmspendingservice.formData[key] = this.lmspendingForm.controls[key].value;
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.lmspendingservice.formData.nextcalldate = new Date(this.ngbDateParserFormatter.format(this.lmspendingForm.get('nextcalldate').value) + '  UTC');
    this.lmspendingservice.formData.actiondatetime = new Date(this.ngbDateParserFormatter.format(this.lmspendingForm.get('actiondatetime').value));
    this.lmspendingservice.formData.expectedcloseby = new Date(this.ngbDateParserFormatter.format(this.lmspendingForm.get('expectedcloseby').value));
    this.lmspendingservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
    this.lmspendingservice.formData.customfield = JSON.stringify(customfields);
    this.lmspendingservice.formData.DeletedlmstaskIDs = this.DeletedlmstaskIDs;
    this.lmspendingservice.formData.DeletedlmsreminderIDs = this.DeletedlmsreminderIDs;
    this.lmspendingservice.formData.DeletedlmshistoryIDs = this.DeletedlmshistoryIDs;
    console.log(this.lmspendingservice.formData);
    this.lmspendingservice.saveOrUpdatelmspendings().subscribe(
      (res:any) => {
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.lmspendingservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result.value.lmspending);
          }
          else {
            this.FillData(res);
          }
        }
        this.lmspendingForm.markAsUntouched();
        this.lmspendingForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }



  AddOrEditbranchid(branchid) {
    let ScreenType = '2';
    /*this.dialog.open(bobranchmasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bobranchmasterservice.getbobranchmastersList().then((res:any) => this.branchidList = res as bobranchmaster[]);
    });*/
  }

  AddOrEditbranchlocationid(locationid) {
    let ScreenType = '2';
    /*this.dialog.open(bobranchlocationComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bobranchlocationservice.getbobranchlocationsList().then((res:any) => this.branchlocationidList = res as bobranchlocation[]);
    });*/
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

  AddOrEditcampaignid(productid) {
    let ScreenType = '2';
    /*this.dialog.open(lmsproductmasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => this.campaignidList = res as lmsproductmaster[]);
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

  AddOrEditcurrentowner(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bousermasterservice.getbousermastersList().then((res:any) => this.currentownerList = res as bousermaster[]);
    });*/
  }

  AddOrEditlmstask(event, taskid, callid) {
    this.dialog.open(lmstaskComponent,
      {
        data: { taskid, callid, ScreenType: 2, leadid: this.lmspendingForm.get('leadid').value, opportunityid: this.lmspendingForm.get('opportunityid').value, productid: this.lmspendingForm.get('productid').value }
      }
    ).onClose.subscribe((res:any) => {
      if (taskid != res.taskid || res.taskid == null) {
        this.lmstaskssource.add(res);
        this.lmstaskssource.refresh();
      }
      else {
        this.lmstaskssource.update(event.data, res);
      }
    });
  }
  onDeletelmstask(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedlmstaskIDs += childID + ",";
    this.lmspendingservice.lmstasks.splice(i, 1);
    //this.updateGrandTotal();
  }
  onDeletelmsreminder(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedlmsreminderIDs += childID + ",";
    this.lmspendingservice.lmsreminders.splice(i, 1);
  }
  onDeletelmshistory(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedlmshistoryIDs += childID + ",";
    this.lmspendingservice.lmshistories.splice(i, 1);
  }
  //start of Grid Codes lmstasks
  lmstaskssettings: any;
  lmstaskssource: any;

  showlmstasksCheckbox() {
    debugger;
    if (this.tbllmstaskssource.settings['selectMode'] == 'multi') this.tbllmstaskssource.settings['selectMode'] = 'single';
    else
      this.tbllmstaskssource.settings['selectMode'] = 'multi';
    this.tbllmstaskssource.initGrid();
  }
  deletelmstasksAll() {
    this.tbllmstaskssource.settings['selectMode'] = 'single';
  }
  showlmstasksFilter() {
    setTimeout(() => {
      this.SetlmstasksTableddConfig();
    });
    if (this.tbllmstaskssource.settings != null) this.tbllmstaskssource.settings['hideSubHeader'] = !this.tbllmstaskssource.settings['hideSubHeader'];
    this.tbllmstaskssource.initGrid();
  }
  showlmstasksInActive() {
  }
  enablelmstasksInActive() {
  }
  async SetlmstasksTableddConfig() {
    if (!this.bfilterPopulatelmstasks) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataassignto2 = res as any;
        for (let i = 0; i < dataassignto2.length; i++) {
          var obj = { value: dataassignto2[i].userid, title: dataassignto2[i].username };
          this.datalmstasksassignto3.push(obj);
        }
        var clone = this.clone(this.tbllmstaskssource.settings);
        clone.columns['assignto'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmstasksassignto3)), }, };
        clone.columns['assignto'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmstasksassignto3)), }, };
        this.tbllmstaskssource.settings = clone;
        this.tbllmstaskssource.initGrid();
      });
    }
    this.bfilterPopulatelmstasks = true;
  }
  async lmstasksbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetlmstasksTableConfig() {
    this.lmstaskssettings = {
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
        subject: {
          title: 'Subject',
          type: '',
          filter: true,
        },
        description: {
          title: 'Description',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        assignto: {
          title: 'Assign To',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmstasksassignto3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        targetdate: {
          title: 'Target Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        assigneddate: {
          title: 'Assigned Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
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
            return cell;
            return cell.substr(14).split('"').join('').split('{').join('').split('}').join('');
          },
        },
      },
    };
  }
  lmstasksLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmstasksID) >= 0) {
      this.lmstaskssource = new LocalDataSource();
      this.lmstaskssource.load(this.lmspendingservice.lmstasks as any as LocalDataSource);
      this.lmstaskssource.setPaging(1, 20, true);
    }
  }
  lmstasksroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditlmstask(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditlmstask(event, event.data.taskid, this.formid);
        break;
      case 'delete':
        this.onDeletelmstask(event, event.data.taskid, ((this.lmstaskssource.getPaging().page - 1) * this.lmstaskssource.getPaging().perPage) + event.index);
        this.lmstaskssource.refresh();
        break;
    }
  }
  lmstasksonDelete(obj) {
    let taskid = obj.data.taskid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmspendingservice.deletelmspending(taskid).then((res:any) =>
        this.lmstasksLoadTable()
      );
    }
  }
  lmstasksPaging(val) {
    debugger;
    this.lmstaskssource.setPaging(1, val, true);
  }
  handlelmstasksGridSelected(event) {
    this.lmstasksselectedindex = this.lmspendingservice.lmstasks.findIndex(i => i.taskid === event.data.taskid);
  }
  IslmstasksVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmstasksID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmstasks
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
        opportunityid: {
          title: 'Opportunity',
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
      this.lmsreminderssource.load(this.lmspendingservice.lmsreminders as any as LocalDataSource);
      this.lmsreminderssource.setPaging(1, 20, true);
    }
  }
  lmsremindersroute(event, action) {
    switch (action) {
      case 'create':
        if (this.lmspendingservice.lmsreminders.length == 0) {
          this.tbllmsreminderssource.grid.createFormShown = true;
        }
        else {
          let obj = new lmsreminder();
          this.lmspendingservice.lmsreminders.push(obj);
          this.lmsreminderssource.refresh();
          if ((this.lmspendingservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1 != this.lmsreminderssource.getPaging().page) {
            this.lmsreminderssource.setPage((this.lmspendingservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1);
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
    this.lmsremindersselectedindex = this.lmspendingservice.lmsreminders.findIndex(i => i.reminderid === event.data.reminderid);
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
  //start of Grid Codes lmshistories
  lmshistoriessettings: any;
  lmshistoriessource: any;

  showlmshistoriesCheckbox() {
    debugger;
    if (this.tbllmshistoriessource.settings['selectMode'] == 'multi') this.tbllmshistoriessource.settings['selectMode'] = 'single';
    else
      this.tbllmshistoriessource.settings['selectMode'] = 'multi';
    this.tbllmshistoriessource.initGrid();
  }
  deletelmshistoriesAll() {
    this.tbllmshistoriessource.settings['selectMode'] = 'single';
  }
  showlmshistoriesFilter() {
    setTimeout(() => {
      this.SetlmshistoriesTableddConfig();
    });
    if (this.tbllmshistoriessource.settings != null) this.tbllmshistoriessource.settings['hideSubHeader'] = !this.tbllmshistoriessource.settings['hideSubHeader'];
    this.tbllmshistoriessource.initGrid();
  }
  showlmshistoriesInActive() {
  }
  enablelmshistoriesInActive() {
  }
  async SetlmshistoriesTableddConfig() {
    if (!this.bfilterPopulatelmshistories) {

      this.bobranchmasterservice.getbobranchmastersList().then((res:any) => {
        var databranchid2 = res as any;
        for (let i = 0; i < databranchid2.length; i++) {
          var obj = { value: databranchid2[i].branchid, title: databranchid2[i].branchname };
          this.datalmshistoriesbranchid3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesbranchid3)), }, };
        clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesbranchid3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.bobranchlocationservice.getbobranchlocationsList().then((res:any) => {
        var databranchlocationid2 = res as any;
        for (let i = 0; i < databranchlocationid2.length; i++) {
          var obj = { value: databranchlocationid2[i].locationid, title: databranchlocationid2[i].locationname };
          this.datalmshistoriesbranchlocationid3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['branchlocationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesbranchlocationid3)), }, };
        clone.columns['branchlocationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesbranchlocationid3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.lmsmasterservice.getlmsmastersList().then((res:any) => {
        var dataleadid2 = res as any;
        for (let i = 0; i < dataleadid2.length; i++) {
          var obj = { value: dataleadid2[i].leadid, title: dataleadid2[i].lastname };
          this.datalmshistoriesleadid3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadid3)), }, };
        clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadid3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
        var dataproductid2 = res as any;
        for (let i = 0; i < dataproductid2.length; i++) {
          var obj = { value: dataproductid2[i].productid, title: dataproductid2[i].productname };
          this.datalmshistoriesproductid3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesproductid3)), }, };
        clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesproductid3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.lmsproductmasterservice.getlmsproductmastersList().then((res:any) => {
        var datacampaignid2 = res as any;
        for (let i = 0; i < datacampaignid2.length; i++) {
          var obj = { value: datacampaignid2[i].productid, title: datacampaignid2[i].productname };
          this.datalmshistoriescampaignid3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescampaignid3)), }, };
        clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescampaignid3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataleadby2 = res as any;
        for (let i = 0; i < dataleadby2.length; i++) {
          var obj = { value: dataleadby2[i].userid, title: dataleadby2[i].username };
          this.datalmshistoriesleadby3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadby3)), }, };
        clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadby3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datacurrentowner2 = res as any;
        for (let i = 0; i < datacurrentowner2.length; i++) {
          var obj = { value: datacurrentowner2[i].userid, title: datacurrentowner2[i].username };
          this.datalmshistoriescurrentowner3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['currentowner'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescurrentowner3)), }, };
        clone.columns['currentowner'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescurrentowner3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.configservice.getList("leadresponse").then((res:any) => {
        var dataleadresponse2 = res as any;
        for (let i = 0; i < dataleadresponse2.length; i++) {
          var obj = { value: dataleadresponse2[i].configkey, title: dataleadresponse2[i].configtext };
          this.datalmshistoriesleadresponse3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['leadresponse'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadresponse3)), }, };
        clone.columns['leadresponse'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesleadresponse3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.configservice.getList("leadaction").then((res:any) => {
        var datanextaction2 = res as any;
        for (let i = 0; i < datanextaction2.length; i++) {
          var obj = { value: datanextaction2[i].configkey, title: datanextaction2[i].configtext };
          this.datalmshistoriesnextaction3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesnextaction3)), }, };
        clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesnextaction3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.configservice.getList("leadsource").then((res:any) => {
        var datasource2 = res as any;
        for (let i = 0; i < datasource2.length; i++) {
          var obj = { value: datasource2[i].configkey, title: datasource2[i].configtext };
          this.datalmshistoriessource3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['source'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriessource3)), }, };
        clone.columns['source'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriessource3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.configservice.getList("leadstage").then((res:any) => {
        var datastage2 = res as any;
        for (let i = 0; i < datastage2.length; i++) {
          var obj = { value: datastage2[i].configkey, title: datastage2[i].configtext };
          this.datalmshistoriesstage3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['stage'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesstage3)), }, };
        clone.columns['stage'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriesstage3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });

      this.configservice.getList("leadnature").then((res:any) => {
        var datacriticality2 = res as any;
        for (let i = 0; i < datacriticality2.length; i++) {
          var obj = { value: datacriticality2[i].configkey, title: datacriticality2[i].configtext };
          this.datalmshistoriescriticality3.push(obj);
        }
        var clone = this.clone(this.tbllmshistoriessource.settings);
        clone.columns['criticality'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescriticality3)), }, };
        clone.columns['criticality'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datalmshistoriescriticality3)), }, };
        this.tbllmshistoriessource.settings = clone;
        this.tbllmshistoriessource.initGrid();
      });
    }
    this.bfilterPopulatelmshistories = true;
  }
  async lmshistoriesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetlmshistoriesTableConfig() {
    this.lmshistoriessettings = {
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
            var element = this.datalmshistoriesbranchid3.find(c => c.value == cell);
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
            var element = this.datalmshistoriesbranchlocationid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        leadid: {
          title: 'Lead',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesleadid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        opportunityid: {
          title: 'Opportunity',
          type: 'number',
          filter: true,
        },
        productid: {
          title: 'Product',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesproductid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        campaignid: {
          title: 'Campaign',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriescampaignid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        leadby: {
          title: 'Lead By',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesleadby3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentowner: {
          title: 'Current Owner',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriescurrentowner3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        leadresponse: {
          title: 'Lead Response',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesleadresponse3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
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
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesnextaction3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        datetime: {
          title: 'Date Time',
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
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriessource3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        stage: {
          title: 'Stage',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriesstage3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        criticality: {
          title: 'Criticality',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datalmshistoriescriticality3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
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
  lmshistoriesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmshistoriesID) >= 0) {
      this.lmshistoriessource = new LocalDataSource();
      this.lmshistoriessource.load(this.lmspendingservice.lmshistories as any as LocalDataSource);
      this.lmshistoriessource.setPaging(1, 20, true);
    }
  }
  lmshistoriesroute(event, action) {
    switch (action) {
      case 'create':
        if (this.lmspendingservice.lmshistories.length == 0) {
          this.tbllmshistoriessource.grid.createFormShown = true;
        }
        else {
          let obj = new lmshistory();
          this.lmspendingservice.lmshistories.push(obj);
          this.lmshistoriessource.refresh();
          if ((this.lmspendingservice.lmshistories.length / this.lmshistoriessource.getPaging().perPage).toFixed(0) + 1 != this.lmshistoriessource.getPaging().page) {
            this.lmshistoriessource.setPage((this.lmspendingservice.lmshistories.length / this.lmshistoriessource.getPaging().perPage).toFixed(0) + 1);
          }
          setTimeout(() => {
            this.tbllmshistoriessource.grid.edit(this.tbllmshistoriessource.grid.getLastRow());
          });
        }
        break;
      case 'delete':
        let index = this.lmshistoriessource.data.indexOf(event.data);
        this.onDeletelmshistory(event, event.data.historyid, ((this.lmshistoriessource.getPaging().page - 1) * this.lmshistoriessource.getPaging().perPage) + index);
        this.lmshistoriessource.refresh();
        break;
    }
  }
  lmshistoriesPaging(val) {
    debugger;
    this.lmshistoriessource.setPaging(1, val, true);
  }
  handlelmshistoriesGridSelected(event) {
    this.lmshistoriesselectedindex = this.lmspendingservice.lmshistories.findIndex(i => i.historyid === event.data.historyid);
  }
  IslmshistoriesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.lmshistoriesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmshistories

}



