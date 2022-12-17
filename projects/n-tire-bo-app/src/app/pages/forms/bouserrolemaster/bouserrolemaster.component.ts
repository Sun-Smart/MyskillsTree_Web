import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { bouserrolemaster } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { hrmsinterviewrolescoring } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsinterviewrolescoring.model';
//FK services
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bousertypemenuaccess } from '../../../../../../n-tire-bo-app/src/app/model/bousertypemenuaccess.model';
//FK services
import { bomenumasterComponent } from '../bomenumaster/bomenumaster.component';
import { bomenumasterService } from '../../../../../../n-tire-bo-app/src/app/service/bomenumaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
  selector: 'app-bouserrolemaster',
  templateUrl: './bouserrolemaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class bouserrolemasterComponent implements OnInit {
  viewhtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  formdata: any;//current form data
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
  data3: any = [];
  bfilterPopulatebouserrolemasters: boolean = false;
  datahrmsinterviewrolescoringscriteria3: any = [];
  datahrmsinterviewrolescoringsinterviewround3: any = [];
  bfilterPopulatehrmsinterviewrolescorings: boolean = false;
  bfilterPopulatebousertypemenuaccesses: boolean = false;
  @ViewChild('tblhrmsinterviewrolescoringssource', { static: false }) tblhrmsinterviewrolescoringssource: Ng2SmartTableComponent;
  @ViewChild('tblbousertypemenuaccessessource', { static: false }) tblbousertypemenuaccessessource: Ng2SmartTableComponent;
  bouserrolemasterForm: FormGroup;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  sessiondata: any;



  hrmsinterviewrolescoringsvisiblelist: any;
  hrmsinterviewrolescoringshidelist: any;
  bousertypemenuaccessesvisiblelist: any;
  bousertypemenuaccesseshidelist: any;

  DeletedhrmsinterviewrolescoringIDs: string = "";
  hrmsinterviewrolescoringsID: string = "1";
  hrmsinterviewrolescoringsselectedindex: any;
  DeletedbousertypemenuaccessIDs: string = "";
  bousertypemenuaccessesID: string = "2";
  bousertypemenuaccessesselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bouserrolemasterservice: bouserrolemasterService,
    private bomasterdataservice: bomasterdataService,
    private bomenumasterservice: bomenumasterService,
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
    this.bouserrolemasterForm = this.fb.group({
      pk: [null], userroleid: [null],
      userrole: [null],
      thumbnail: [null],
      musthaveskills: [null],
      preferredskills: [null],
      keywords: [null],
      dealbreakers: [null],
      softskills: [null],
      additionalnotes: [null],
      salary: [null],
      screeningprocess: [null],
      phoneinterviewers: [null],
      onsiteinterviewprocess: [null],
      points: [null],
      advertisementtitle1: [null],
      advertisementdetails1: [null],
      advertisementtitle2: [null],
      advertisementdetails2: [null],
      advertisementtitle3: [null],
      advertisementdetails3: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bouserrolemasterForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bouserrolemasterForm.dirty && this.bouserrolemasterForm.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields
  userroleexists(e:any) {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.userrole.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].userroleid.toString() != this.formid.toString()) {
      if (confirm("This User Role value exists in the database.Do you want to display the record ? ")) {
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

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userroleid && pkDetail) {
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
    let bouserrolemasterid = null;

    //getting data - from list page, from other screen through dialog
    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
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
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = bouserrolemasterid;
    //this.sharedService.alert(bouserrolemasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.SethrmsinterviewrolescoringsTableConfig();
      setTimeout(() => {
        this.SethrmsinterviewrolescoringsTableddConfig();
      });

      this.SetbousertypemenuaccessesTableConfig();
      setTimeout(() => {
        this.SetbousertypemenuaccessesTableddConfig();
      });

      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }

    //autocomplete
    this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => {
      this.pkList = res as bouserrolemaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.userrole;

    //setting the flag that the screen is not touched 
    this.bouserrolemasterForm.markAsUntouched();
    this.bouserrolemasterForm.markAsPristine();
  }



  resetForm() {
    if (this.bouserrolemasterForm != null)
      this.bouserrolemasterForm.reset();
    this.bouserrolemasterForm.patchValue({
    });
    setTimeout(() => {
      this.bouserrolemasterservice.hrmsinterviewrolescorings = [];
      this.hrmsinterviewrolescoringsLoadTable();
      this.bouserrolemasterservice.bousertypemenuaccesses = [];
      this.bouserrolemasterservice.Insertbousertypemenuaccesses = [];
      this.bousertypemenuaccessesLoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let userroleid = this.bouserrolemasterForm.get('userroleid').value;
    if (userroleid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bouserrolemasterservice.deletebouserrolemaster(userroleid).then((res:any) => {
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
    this.bouserrolemasterForm.patchValue({
      userroleid: null
    });
    if (this.bouserrolemasterservice.formData.userroleid != null) this.bouserrolemasterservice.formData.userroleid = null;
    for (let i = 0; i < this.bouserrolemasterservice.hrmsinterviewrolescorings.length; i++) {
      this.bouserrolemasterservice.hrmsinterviewrolescorings[i].userrolescoringid = null;
    }
    for (let i = 0; i < this.bouserrolemasterservice.bousertypemenuaccesses.length; i++) {
      this.bouserrolemasterservice.bousertypemenuaccesses[i].rolemenuaccessid = null;
    }
  }
  PopulateFromMainScreen(mainscreendata:any, bdisable:any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.bouserrolemasterForm.controls[key] != null) {
              this.bouserrolemasterForm.patchValue(json);
              if (bdisable) this.bouserrolemasterForm.controls[key].disable({ onlySelf: true });
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
    if (this.data.save == true) {
      this.onSubmitData(false);
    }
    else if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  async PopulateScreen(pkcol: any) {
    this.bouserrolemasterservice.getbouserrolemastersByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.bouserrolemaster.userroleid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bouserrolemasterForm.patchValue({
      userroleid: res.bouserrolemaster.userroleid,
      userrole: res.bouserrolemaster.userrole,
      thumbnail: res.bouserrolemaster.thumbnail,
      musthaveskills: res.bouserrolemaster.musthaveskills,
      preferredskills: res.bouserrolemaster.preferredskills,
      keywords: res.bouserrolemaster.keywords,
      dealbreakers: res.bouserrolemaster.dealbreakers,
      softskills: res.bouserrolemaster.softskills,
      additionalnotes: res.bouserrolemaster.additionalnotes,
      salary: res.bouserrolemaster.salary,
      screeningprocess: res.bouserrolemaster.screeningprocess,
      phoneinterviewers: res.bouserrolemaster.phoneinterviewers,
      onsiteinterviewprocess: res.bouserrolemaster.onsiteinterviewprocess,
      points: res.bouserrolemaster.points,
      advertisementtitle1: res.bouserrolemaster.advertisementtitle1,
      advertisementdetails1: res.bouserrolemaster.advertisementdetails1,
      advertisementtitle2: res.bouserrolemaster.advertisementtitle2,
      advertisementdetails2: res.bouserrolemaster.advertisementdetails2,
      advertisementtitle3: res.bouserrolemaster.advertisementtitle3,
      advertisementdetails3: res.bouserrolemaster.advertisementdetails3,
      status: res.bouserrolemaster.status,
      statusdesc: res.bouserrolemaster.statusdesc,
    });
    this.hrmsinterviewrolescoringsvisiblelist = res.hrmsinterviewrolescoringsvisiblelist;
    this.bousertypemenuaccessesvisiblelist = res.bousertypemenuaccessesvisiblelist;
    //Child Tables if any
    this.bouserrolemasterservice.hrmsinterviewrolescorings = res.hrmsinterviewrolescoring;
    this.SethrmsinterviewrolescoringsTableConfig();
    this.hrmsinterviewrolescoringsLoadTable();
    setTimeout(() => {
      this.SethrmsinterviewrolescoringsTableddConfig();
    });
    this.bouserrolemasterservice.bousertypemenuaccesses = res.bousertypemenuaccess;
    this.SetbousertypemenuaccessesTableConfig();
    this.bousertypemenuaccessesLoadTable();
    setTimeout(() => {
      this.SetbousertypemenuaccessesTableddConfig();
    });
    this.bouserrolemasterservice.Insertbousertypemenuaccesses = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.bouserrolemasterForm.controls) {
      if (this.bouserrolemasterForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bouserrolemasterForm.controls[key].value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.bouserrolemasterForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.bouserrolemasterForm.value;
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    this.dialogRef.close(obj);
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

  async onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    // Object.keys(this.bouserrolemasterForm.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bouserrolemasterForm.get(key)!.errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bouserrolemasterForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.bouserrolemasterservice.formData = this.bouserrolemasterForm.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bouserrolemasterForm.controls[key] != null) {
            this.bouserrolemasterservice.formData[key] = this.bouserrolemasterForm.controls[key].value;
          }
        }
      }
    }
    this.bouserrolemasterservice.formData.DeletedhrmsinterviewrolescoringIDs = this.DeletedhrmsinterviewrolescoringIDs;
    this.bouserrolemasterservice.formData.DeletedbousertypemenuaccessIDs = this.DeletedbousertypemenuaccessIDs;
    console.log(this.bouserrolemasterservice.formData);
    this.bouserrolemasterservice.saveOrUpdatebouserrolemasters().subscribe(
      async (res:any) => {
        if (this.hrmsinterviewrolescoringssource.data) {
          for (let i = 0; i < this.hrmsinterviewrolescoringssource.data.length; i++) {
            if (this.hrmsinterviewrolescoringssource.data[i].fileattachmentlist) await this.sharedService.upload(this.hrmsinterviewrolescoringssource.data[i].fileattachmentlist);
          }
        }
        if (this.bousertypemenuaccessessource.data) {
          for (let i = 0; i < this.bousertypemenuaccessessource.data.length; i++) {
            if (this.bousertypemenuaccessessource.data[i].fileattachmentlist) await this.sharedService.upload(this.bousertypemenuaccessessource.data[i].fileattachmentlist);
          }
        }
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result.value.bouserrolemaster);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.bouserrolemasterservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result.value.bouserrolemaster);
          }
          else {
            this.FillData(res);
          }
        }
        this.bouserrolemasterForm.markAsUntouched();
        this.bouserrolemasterForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  onDeletehrmsinterviewrolescoring(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhrmsinterviewrolescoringIDs += childID + ",";
    this.bouserrolemasterservice.hrmsinterviewrolescorings.splice(i, 1);
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes hrmsinterviewrolescorings
  hrmsinterviewrolescoringssettings: any;
  hrmsinterviewrolescoringssource: any;

  showhrmsinterviewrolescoringsCheckbox() {
    debugger;
    if (this.tblhrmsinterviewrolescoringssource.settings['selectMode'] == 'multi') this.tblhrmsinterviewrolescoringssource.settings['selectMode'] = 'single';
    else
      this.tblhrmsinterviewrolescoringssource.settings['selectMode'] = 'multi';
    this.tblhrmsinterviewrolescoringssource.initGrid();
  }
  deletehrmsinterviewrolescoringsAll() {
    this.tblhrmsinterviewrolescoringssource.settings['selectMode'] = 'single';
  }
  showhrmsinterviewrolescoringsFilter() {
    setTimeout(() => {
      this.SethrmsinterviewrolescoringsTableddConfig();
    });
    if (this.tblhrmsinterviewrolescoringssource.settings != null) this.tblhrmsinterviewrolescoringssource.settings['hideSubHeader'] = !this.tblhrmsinterviewrolescoringssource.settings['hideSubHeader'];
    this.tblhrmsinterviewrolescoringssource.initGrid();
  }
  showhrmsinterviewrolescoringsInActive() {
  }
  enablehrmsinterviewrolescoringsInActive() {
  }
  async SethrmsinterviewrolescoringsTableddConfig() {
    if (!this.bfilterPopulatehrmsinterviewrolescorings) {

      this.configservice.getList("interviewround").then((res:any) => {
        var datainterviewround2 = res as any;
        var defaultobj = { value: "", title: "Select..." };
        this.datahrmsinterviewrolescoringsinterviewround3.push(defaultobj);
        for (let i = 0; i < datainterviewround2.length; i++) {
          var obj = { value: datainterviewround2[i].configkey, title: datainterviewround2[i].configtext };
          this.datahrmsinterviewrolescoringsinterviewround3.push(obj);
        }
        var clone = this.sharedService.clone(this.tblhrmsinterviewrolescoringssource.settings);
        if (clone.columns['interviewround'] != undefined) clone.columns['interviewround'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahrmsinterviewrolescoringsinterviewround3)), }, };
        if (clone.columns['interviewround'] != undefined) clone.columns['interviewround'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahrmsinterviewrolescoringsinterviewround3)), }, };
        this.tblhrmsinterviewrolescoringssource.settings = clone;
        this.tblhrmsinterviewrolescoringssource.initGrid();
      });

      this.bomasterdataservice.getList("mj5qo").then((res:any) => {
        var datacriteria2 = res as any;
        var defaultobj = { value: "", title: "Select..." };
        this.datahrmsinterviewrolescoringscriteria3.push(defaultobj);
        for (let i = 0; i < datacriteria2.length; i++) {
          var obj = { value: datacriteria2[i].masterdataid, title: datacriteria2[i].masterdatadescription };
          this.datahrmsinterviewrolescoringscriteria3.push(obj);
        }
        if ((this.tblhrmsinterviewrolescoringssource.settings as any).columns['criteria']) {
          (this.tblhrmsinterviewrolescoringssource.settings as any).columns['criteria'].editor.config.list = JSON.parse(JSON.stringify(this.datahrmsinterviewrolescoringscriteria3));
          this.tblhrmsinterviewrolescoringssource.initGrid();
        }
      });
    }
    this.bfilterPopulatehrmsinterviewrolescorings = true;
  }
  async hrmsinterviewrolescoringsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethrmsinterviewrolescoringsTableConfig() {
    this.hrmsinterviewrolescoringssettings = {
      hideSubHeader: true,
      mode: 'inline',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: !this.showview,
        edit: !this.showview, // true,
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
        interviewround: {
          title: 'Interview Round',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahrmsinterviewrolescoringsinterviewround3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        criteria: {
          title: 'Criteria',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahrmsinterviewrolescoringscriteria3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        weightage: {
          title: 'Weightage',
          type: 'number',
          filter: true,
        },
      },
    };
  }
  hrmsinterviewrolescoringsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hrmsinterviewrolescoringsID) >= 0) {
      this.hrmsinterviewrolescoringssource = new LocalDataSource();
      this.hrmsinterviewrolescoringssource.load(this.bouserrolemasterservice.hrmsinterviewrolescorings as any as LocalDataSource);
      this.hrmsinterviewrolescoringssource.setPaging(1, 20, true);
    }
  }
  hrmsinterviewrolescoringsroute(event, action) {
    switch (action) {
      case 'create':
        if (this.bouserrolemasterservice.hrmsinterviewrolescorings.length == 0) {
          this.tblhrmsinterviewrolescoringssource.grid.createFormShown = true;
        }
        else {
          let obj = new hrmsinterviewrolescoring();
          this.bouserrolemasterservice.hrmsinterviewrolescorings.push(obj);
          this.hrmsinterviewrolescoringssource.refresh();
          if ((this.bouserrolemasterservice.hrmsinterviewrolescorings.length / this.hrmsinterviewrolescoringssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinterviewrolescoringssource.getPaging().page) {
            this.hrmsinterviewrolescoringssource.setPage((this.bouserrolemasterservice.hrmsinterviewrolescorings.length / this.hrmsinterviewrolescoringssource.getPaging().perPage).toFixed(0) + 1);
          }
          setTimeout(() => {
            this.tblhrmsinterviewrolescoringssource.grid.edit(this.tblhrmsinterviewrolescoringssource.grid.getLastRow());
          });
        }
        break;
      case 'delete':
        let index = this.hrmsinterviewrolescoringssource.data.indexOf(event.data);
        this.onDeletehrmsinterviewrolescoring(event, event.data.userrolescoringid, ((this.hrmsinterviewrolescoringssource.getPaging().page - 1) * this.hrmsinterviewrolescoringssource.getPaging().perPage) + index);
        this.hrmsinterviewrolescoringssource.refresh();
        break;
    }
  }
  hrmsinterviewrolescoringsPaging(val) {
    debugger;
    this.hrmsinterviewrolescoringssource.setPaging(1, val, true);
  }

  handlehrmsinterviewrolescoringsGridSelected(event) {
    this.hrmsinterviewrolescoringsselectedindex = this.bouserrolemasterservice.hrmsinterviewrolescorings.findIndex(i => i.userrolescoringid === event.data.userrolescoringid);
  }
  IshrmsinterviewrolescoringsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hrmsinterviewrolescoringsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hrmsinterviewrolescorings
  //start of Grid Codes bousertypemenuaccesses
  onCustombousertypemenuaccessesAction(event) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.menuid;
        this.dialog.open(bomenumasterComponent,
          {
            data: { showview: false, menuid: val, ScreenType: 2 },
            header: 'bomenumaster details'
          }
        ).onClose.subscribe((res:any) => {
        });
        break;
    }
  }
  bousertypemenuaccessessettings: any;
  bousertypemenuaccessessource: any;

  showbousertypemenuaccessesCheckbox() {
    debugger;
    if (this.tblbousertypemenuaccessessource.settings['selectMode'] == 'multi') this.tblbousertypemenuaccessessource.settings['selectMode'] = 'single';
    else
      this.tblbousertypemenuaccessessource.settings['selectMode'] = 'multi';
    this.tblbousertypemenuaccessessource.initGrid();
  }
  deletebousertypemenuaccessesAll() {
    this.tblbousertypemenuaccessessource.settings['selectMode'] = 'single';
  }
  showbousertypemenuaccessesFilter() {
    setTimeout(() => {
      this.SetbousertypemenuaccessesTableddConfig();
    });
    if (this.tblbousertypemenuaccessessource.settings != null) this.tblbousertypemenuaccessessource.settings['hideSubHeader'] = !this.tblbousertypemenuaccessessource.settings['hideSubHeader'];
    this.tblbousertypemenuaccessessource.initGrid();
  }
  showbousertypemenuaccessesInActive() {
  }
  enablebousertypemenuaccessesInActive() {
  }
  async SetbousertypemenuaccessesTableddConfig() {
    if (!this.bfilterPopulatebousertypemenuaccesses) {
    }
    this.bfilterPopulatebousertypemenuaccesses = true;
  }
  async bousertypemenuaccessesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetbousertypemenuaccessesTableConfig() {
    this.bousertypemenuaccessessettings = {
      hideSubHeader: true,
      mode: 'inline',
      selectMode: 'multi',
      actions: {
        width: '300px',
        add: false,
        edit: false,
        delete: false,
        custom: [
          { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>' }
        ],
      },
      columns: {
        rolemenuaccessid: {
          title: 'Role Menu Access',
          type: '',
        },
        menuid: {
          title: 'Menu',
          type: '',
        },
        menudescription: {
          title: 'Menudescription',
          type: '',
        },
        menuurl: {
          title: 'Menuurl',
          type: '',
        },
        parentid: {
          title: 'Parent',
          type: '',
        },
      },
    };
  }
  bousertypemenuaccessesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.bousertypemenuaccessesID) >= 0) {
      this.bousertypemenuaccessessource = new LocalDataSource();
      this.bousertypemenuaccessessource.load(this.bouserrolemasterservice.bousertypemenuaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tblbousertypemenuaccessessource != null) {
          this.tblbousertypemenuaccessessource.grid.getRows().forEach((row: any) => {
            if (row.data.rolemenuaccessid != null && row.data.rolemenuaccessid != "") {
              this.bouserrolemasterservice.Insertbousertypemenuaccesses.push(row.data);
              this.tblbousertypemenuaccessessource.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }
  bousertypemenuaccessesPaging(val) {
    debugger;
    this.bousertypemenuaccessessource.setPaging(1, val, true);
  }

  handlebousertypemenuaccessesGridSelected(event) {
    debugger;

    if (event.isSelected) {
      if (event.data.rolemenuaccessid == null || event.data.rolemenuaccessid == "") {
        var obj = { roleid: this.formid, menuid: event.data.menuid }
        this.bouserrolemasterservice.Insertbousertypemenuaccesses.push(obj as any);
      }
      else {
        var deletedids = this.DeletedbousertypemenuaccessIDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.rolemenuaccessid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.rolemenuaccessid != null && event.data.rolemenuaccessid != "") this.DeletedbousertypemenuaccessIDs += event.data.rolemenuaccessid + ",";
    }
  }
  IsbousertypemenuaccessesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.bousertypemenuaccessesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bousertypemenuaccesses

}



