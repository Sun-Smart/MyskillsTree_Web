import { prjtestrunService } from './../../../service/prjtestrun.service';
import { prjtestrun } from './../../../model/prjtestrun.model';
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
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//import { bousermasterComponent } from '../bousermaster/bousermaster.component';
//popups
//detail table services
import { prjtestrundetail } from './../../../model/prjtestrundetail.model';
//FK services
import { prjtestrundetailComponent } from './prjtestrundetail.component';
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
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-prjtestrun',
  templateUrl: './prjtestrun.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class prjtestrunComponent implements OnInit {
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
  bfilterPopulateprjtestruns: boolean = false;
  dataprjtestrunsuserid3: any = [];
  bfilterPopulateprjtestrundetails: boolean = false;
  @ViewChild('tblprjtestrundetailssource', { static: false }) tblprjtestrundetailssource: Ng2SmartTableComponent;
  prjtestrunForm: FormGroup;
  useridList: bousermaster[];//dropdown
  useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  userid_bousermastersForm: FormGroup;//autocomplete
  userid_bousermastersoptions: any;//autocomplete
  userid_bousermastersformatter: any;//autocomplete
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentfieldjson: any[] = [];
  attachmentvisible: boolean = true;
  SESSIONUSERID: any;//current user
  sessiondata: any;



  prjtestrundetailsvisiblelist: any;
  prjtestrundetailshidelist: any;

  DeletedprjtestrundetailIDs: string = "";
  prjtestrundetailsID: string = "1";
  prjtestrundetailsselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private prjtestrunservice: prjtestrunService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
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
    this.prjtestrunForm = this.fb.group({
      pk: [null], ImageName: [null],
      projectid: [null],
      testrunid: [null],
      rundate: [null],
      userid: [null],
      useriddesc: [null],
      details: [null],
      notes: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjtestrunForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.prjtestrunForm.dirty && this.prjtestrunForm.touched) {
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
    let pos = this.pkList.map(function (e:any) { return e.testrunid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.testrunid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.testrunid && pkDetail) {
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
    let prjtestrunid = null;

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
    this.formid = prjtestrunid;
    //this.sharedService.alert(prjtestrunid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.SetprjtestrundetailsTableConfig();
      setTimeout(() => {
        this.SetprjtestrundetailsTableddConfig();
      });

      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.bousermasterservice.getbousermastersList().then((res:any) => {
      this.useridList = res as bousermaster[];
      if (this.formdata && this.formdata.prjtestrun && this.formdata.prjtestrun.userid) {
        this.useridoptionsEvent.emit(this.useridList);
        this.prjtestrunForm.patchValue({
          userid: this.formdata.prjtestrun.userid,
          useriddesc: this.formdata.prjtestrun.useriddesc,
        });
      }
    }
    );
    this.userid_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.userid_bousermastersformatter = (result: any) => result.username;

    //autocomplete
    this.prjtestrunservice.getprjtestrunsList().then((res:any) => {
      this.pkList = res as prjtestrun[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

    //setting the flag that the screen is not touched 
    this.prjtestrunForm.markAsUntouched();
    this.prjtestrunForm.markAsPristine();
  }
  onSelecteduserid(useridDetail: any) {
    if (useridDetail.userid && useridDetail) {
      this.prjtestrunForm.patchValue({
        userid: useridDetail.userid,
        useriddesc: useridDetail.username,

      });

    }
  }




  resetForm() {
    if (this.prjtestrunForm != null)
      this.prjtestrunForm.reset();
    this.prjtestrunForm.patchValue({
      userid: this.sessiondata.userid,
      useriddesc: this.sessiondata.username,
    });
    setTimeout(() => {
      this.prjtestrunservice.prjtestrundetails = [];
      this.prjtestrundetailsLoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let testrunid = this.prjtestrunForm.get('testrunid')!.value;
    if (testrunid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.prjtestrunservice.deleteprjtestrun(testrunid).then((res:any) => {
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
    this.prjtestrunForm.patchValue({
      testrunid: null
    });
    if (this.prjtestrunservice.formData.testrunid != null) this.prjtestrunservice.formData.testrunid = null;
    for (let i = 0; i < this.prjtestrunservice.prjtestrundetails.length; i++) {
      this.prjtestrunservice.prjtestrundetails[i].testrundetailid = null;
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
          else if (key == "rundate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "notes")
            json = '{"' + key + '": ' + mainscreendata[key] + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.prjtestrunForm.controls[key] != null) {
              this.prjtestrunForm.patchValue(json);
              if (bdisable) this.prjtestrunForm.controls[key].disable({ onlySelf: true });
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
  useridonChange(evt:any) {
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



  async PopulateScreen(pkcol: any) {
    this.prjtestrunservice.getprjtestrunsByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.prjtestrun.testrunid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formid = res.prjtestrun.testrunid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.prjtestrunForm.patchValue({
      projectid: res.prjtestrun.projectid,
      testrunid: res.prjtestrun.testrunid,
      rundate: this.ngbDateParserFormatter.parse(res.prjtestrun.rundate),
      userid: res.prjtestrun.userid,
      useriddesc: res.prjtestrun.useriddesc,
      details: res.prjtestrun.details,
      notes: JSON.parse(res.prjtestrun.notes),
      attachment: res.prjtestrun.attachment,
      status: res.prjtestrun.status,
      statusdesc: res.prjtestrun.statusdesc,
    });
    this.prjtestrundetailsvisiblelist = res.prjtestrundetailsvisiblelist;
    if (this.prjtestrunForm.get('attachment')!.value != null && this.prjtestrunForm.get('attachment')!.value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.prjtestrunForm.get('attachment')!.value));
    //Child Tables if any
    this.prjtestrunservice.prjtestrundetails = res.prjtestrundetail;
    this.SetprjtestrundetailsTableConfig();
    this.prjtestrundetailsLoadTable();
    setTimeout(() => {
      this.SetprjtestrundetailsTableddConfig();
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.prjtestrunForm.controls) {
      if (this.prjtestrunForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjtestrunForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.prjtestrunForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.prjtestrunForm!.value;
    obj.rundate = this.ngbDateParserFormatter.format(this.prjtestrunForm.get('rundate')!.value);
    obj.notes = JSON.stringify(this.prjtestrunForm.get('notes')!.value);
    obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    obj.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileattachmentlist);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
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
    Object.keys(this.prjtestrunForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjtestrunForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjtestrunForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.prjtestrunservice.formData = this.prjtestrunForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjtestrunForm.controls[key] != null) {
            this.prjtestrunservice.formData[key] = this.prjtestrunForm.controls[key]!.value;
          }
        }
      }
    }
    this.prjtestrunservice.formData.rundate = new Date(this.ngbDateParserFormatter.format(this.prjtestrunForm.get('rundate')!.value) + '  UTC');
    this.prjtestrunservice.formData.notes = JSON.stringify(this.prjtestrunForm.get('notes')!.value);
    this.prjtestrunservice.formData.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    this.prjtestrunservice.formData.DeletedprjtestrundetailIDs = this.DeletedprjtestrundetailIDs;
    this.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(this.prjtestrunservice.formData);
    this.prjtestrunservice.saveOrUpdateprjtestruns().subscribe(
      async (res:any) => {
        await this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.prjtestrundetailssource.data) {
          for (let i = 0; i < this.prjtestrundetailssource.data.length; i++) {
            if (this.prjtestrundetailssource.data[i].fileattachmentlist) await this.sharedService.upload(this.prjtestrundetailssource.data[i].fileattachmentlist);
          }
        }
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result!.value.prjtestrun);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.prjtestrunservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.prjtestrun);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.prjtestrunForm.markAsUntouched();
        this.prjtestrunForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  AddOrEdituserid(userid) {
    /*let ScreenType='2';
    this.dialog.open(bousermasterComponent, 
    {
    data: {userid:this.prjtestrunForm.get('userid')!.value, ScreenType:2 }
    } 
    ).onClose.subscribe((res:any) => {
    });*/
  }


  AddOrEditprjtestrundetail(event, testrundetailid, testrunid) {
    let add = false;
    if (event == null) add = true;
    this.dialog.open(prjtestrundetailComponent,
      {
        data: { showview: this.showview, save: false, event, testrundetailid, testrunid, visiblelist: this.prjtestrundetailsvisiblelist, hidelist: this.prjtestrundetailshidelist, ScreenType: 2, notes: this.prjtestrunForm.get('notes')!.value },
        header: 'Test Run Details'
      }
    ).onClose.subscribe((res:any) => {
      if (add) {
        this.prjtestrundetailssource.add(res);
        this.prjtestrundetailssource.refresh();
      }
      else {
        this.prjtestrundetailssource.update(event.data, res);
      }
    });
  }

  onDeleteprjtestrundetail(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedprjtestrundetailIDs += childID + ",";
    this.prjtestrunservice.prjtestrundetails.splice(i, 1);
    //this.updateGrandTotal();
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes prjtestrundetails
  prjtestrundetailssettings: any;
  prjtestrundetailssource: any;

  showprjtestrundetailsCheckbox() {
    debugger;
    if (this.tblprjtestrundetailssource.settings['selectMode'] == 'multi') this.tblprjtestrundetailssource.settings['selectMode'] = 'single';
    else
      this.tblprjtestrundetailssource.settings['selectMode'] = 'multi';
    this.tblprjtestrundetailssource.initGrid();
  }
  deleteprjtestrundetailsAll() {
    this.tblprjtestrundetailssource.settings['selectMode'] = 'single';
  }
  showprjtestrundetailsFilter() {
    setTimeout(() => {
      this.SetprjtestrundetailsTableddConfig();
    });
    if (this.tblprjtestrundetailssource.settings != null) this.tblprjtestrundetailssource.settings['hideSubHeader'] = !this.tblprjtestrundetailssource.settings['hideSubHeader'];
    this.tblprjtestrundetailssource.initGrid();
  }
  showprjtestrundetailsInActive() {
  }
  enableprjtestrundetailsInActive() {
  }
  async SetprjtestrundetailsTableddConfig() {
    if (!this.bfilterPopulateprjtestrundetails) {
    }
    this.bfilterPopulateprjtestrundetails = true;
  }
  async prjtestrundetailsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetprjtestrundetailsTableConfig() {
    this.prjtestrundetailssettings = {
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
        projectid: {
          title: 'Project',
          type: 'number',
          filter: true,
        },
        testcaseid: {
          title: 'Test Case',
          type: 'number',
          filter: true,
        },
        parentid: {
          title: 'Parent',
          type: 'number',
          filter: true,
        },
        planid: {
          title: 'Plan',
          type: 'number',
          filter: true,
        },
        result: {
          title: 'Result',
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
        details: {
          title: 'Details',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
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
  prjtestrundetailsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjtestrundetailsID) >= 0) {
      this.prjtestrundetailssource = new LocalDataSource();
      this.prjtestrundetailssource.load(this.prjtestrunservice.prjtestrundetails as any as LocalDataSource);
      this.prjtestrundetailssource.setPaging(1, 20, true);
    }
  }
  prjtestrundetailsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditprjtestrundetail(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditprjtestrundetail(event, event.data.testrundetailid, this.formid);
        break;
      case 'delete':
        this.onDeleteprjtestrundetail(event, event.data.testrundetailid, ((this.prjtestrundetailssource.getPaging().page - 1) * this.prjtestrundetailssource.getPaging().perPage) + event.index);
        this.prjtestrundetailssource.refresh();
        break;
    }
  }
  prjtestrundetailsonDelete(obj) {
    let testrundetailid = obj.data.testrundetailid;
    if (confirm('Are you sure to delete this record ?')) {
      this.prjtestrunservice.deleteprjtestrun(testrundetailid).then((res:any) =>
        this.prjtestrundetailsLoadTable()
      );
    }
  }
  prjtestrundetailsPaging(val) {
    debugger;
    this.prjtestrundetailssource.setPaging(1, val, true);
  }

  handleprjtestrundetailsGridSelected(event) {
    this.prjtestrundetailsselectedindex = this.prjtestrunservice.prjtestrundetails.findIndex(i => i.testrundetailid === event.data.testrundetailid);
  }
  IsprjtestrundetailsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjtestrundetailsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes prjtestrundetails

}



