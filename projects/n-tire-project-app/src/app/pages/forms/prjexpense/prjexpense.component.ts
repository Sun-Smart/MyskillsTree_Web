import { prjexpenseService } from './../../../service/prjexpense.service';
import { prjexpense } from './../../../model/prjexpense.model';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-prjexpense',
  templateUrl: './prjexpense.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class prjexpenseComponent implements OnInit {
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
  bfilterPopulateprjexpenses: boolean = false;
  dataprjexpensesrequesteduserid3: any = [];
  dataprjexpensesexpensecategory3: any = [];
  dataprjexpensescurrency3: any = [];
  dataprjexpensesbasecurrency3: any = [];
  prjexpenseForm: FormGroup;
  requesteduseridList: bousermaster[];//dropdown
  requesteduseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  requesteduserid_bousermastersForm: FormGroup;//autocomplete
  requesteduserid_bousermastersoptions: any;//autocomplete
  requesteduserid_bousermastersformatter: any;//autocomplete
  expensecategoryList: boconfigvalue[]=[];//dropdown
  currencyList: boconfigvalue[]=[];//dropdown
  basecurrencyList: boconfigvalue[]=[];//dropdown
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
  sessiondata: any;






  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private prjexpenseservice: prjexpenseService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private bousermasterservice: bousermasterService,
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
    this.prjexpenseForm = this.fb.group({
      pk: [null], ImageName: [null],
      expenseid: [null],
      expensedate: [null],
      projectid: [null],
      requesteduserid: [null],
      requesteduseriddesc: [null],
      expensecategory: [null],
      expensecategorydesc: [null],
      expensedescription: [null],
      currency: [null],
      currencydesc: [null],
      amount: [null],
      tax: [null],
      othercharges: [null],
      totalamount: [null],
      reimbursedamount: [null],
      reimburseddate: [null],
      basecurrency: [null],
      basecurrencydesc: [null],
      baseamount: [null],
      notes: [null],
      costcenterid: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjexpenseForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.prjexpenseForm.dirty && this.prjexpenseForm.touched) {
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
    let pos = this.pkList.map(function (e:any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.expenseid && pkDetail) {
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
    let prjexpenseid = null;

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
    this.formid = prjexpenseid;
    //this.sharedService.alert(prjexpenseid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.FillCustomField();
      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.bousermasterservice.getbousermastersList().then((res:any) => {
      this.requesteduseridList = res as bousermaster[];
      if (this.formdata && this.formdata.prjexpense && this.formdata.prjexpense.requesteduserid) {
        this.requesteduseridoptionsEvent.emit(this.requesteduseridList);
        this.prjexpenseForm.patchValue({
          requesteduserid: this.formdata.prjexpense.requesteduserid,
          requesteduseriddesc: this.formdata.prjexpense.requesteduseriddesc,
        });
      }
    }
    );
    this.requesteduserid_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.requesteduseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.requesteduserid_bousermastersformatter = (result: any) => result.username;
    this.configservice.getList("expensecategory").then((res:any) => this.expensecategoryList = res as boconfigvalue[]);
    this.configservice.getList("currency").then((res:any) => this.currencyList = res as boconfigvalue[]);
    this.configservice.getList("currency").then((res:any) => this.basecurrencyList = res as boconfigvalue[]);

    //autocomplete
    this.prjexpenseservice.getprjexpensesList().then((res:any) => {
      this.pkList = res as prjexpense[];
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
    this.prjexpenseForm.markAsUntouched();
    this.prjexpenseForm.markAsPristine();
  }
  onSelectedrequesteduserid(requesteduseridDetail: any) {
    if (requesteduseridDetail.requesteduserid && requesteduseridDetail) {
      this.prjexpenseForm.patchValue({
        requesteduserid: requesteduseridDetail.requesteduserid,
        requesteduseriddesc: requesteduseridDetail.username,

      });

    }
  }




  resetForm() {
    if (this.prjexpenseForm != null)
      this.prjexpenseForm.reset();
    this.prjexpenseForm.patchValue({
      requesteduserid: this.sessiondata.userid,
      requesteduseriddesc: this.sessiondata.username,
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let expenseid = this.prjexpenseForm.get('expenseid')!.value;
    if (expenseid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.prjexpenseservice.deleteprjexpense(expenseid).then((res:any) => {
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
    this.prjexpenseForm.patchValue({
      expenseid: null
    });
    if (this.prjexpenseservice.formData.expenseid != null) this.prjexpenseservice.formData.expenseid = null;
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
          else if (key == "expensedate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "reimburseddate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.prjexpenseForm.controls[key] != null) {
              this.prjexpenseForm.patchValue(json);
              if (bdisable) this.prjexpenseForm.controls[key].disable({ onlySelf: true });
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("prjexpenses", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
      this.customfieldservicelist = res;
      return res;
    });


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
  requesteduseridonChange(evt:any) {
    let e = evt!.value;
  }
  expensecategoryonChange(evt:any) {
    let e = evt!.value;
    this.prjexpenseForm.patchValue({ expensecategorydesc: evt.options[evt.options.selectedIndex].text });
  }
  currencyonChange(evt:any) {
    let e = evt!.value;
    this.prjexpenseForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
  }
  basecurrencyonChange(evt:any) {
    let e = evt!.value;
    this.prjexpenseForm.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
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
    this.prjexpenseservice.getprjexpensesByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.prjexpense.expenseid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formid = res.prjexpense.expenseid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.prjexpenseForm.patchValue({
      expenseid: res.prjexpense.expenseid,
      expensedate: this.ngbDateParserFormatter.parse(res.prjexpense.expensedate),
      projectid: res.prjexpense.projectid,
      requesteduserid: res.prjexpense.requesteduserid,
      requesteduseriddesc: res.prjexpense.requesteduseriddesc,
      expensecategory: res.prjexpense.expensecategory,
      expensecategorydesc: res.prjexpense.expensecategorydesc,
      expensedescription: res.prjexpense.expensedescription,
      currency: res.prjexpense.currency,
      currencydesc: res.prjexpense.currencydesc,
      amount: res.prjexpense.amount,
      tax: res.prjexpense.tax,
      othercharges: res.prjexpense.othercharges,
      totalamount: res.prjexpense.totalamount,
      reimbursedamount: res.prjexpense.reimbursedamount,
      reimburseddate: this.ngbDateParserFormatter.parse(res.prjexpense.reimburseddate),
      basecurrency: res.prjexpense.basecurrency,
      basecurrencydesc: res.prjexpense.basecurrencydesc,
      baseamount: res.prjexpense.baseamount,
      notes: res.prjexpense.notes,
      costcenterid: res.prjexpense.costcenterid,
      customfield: res.prjexpense.customfield,
      attachment: res.prjexpense.attachment,
      status: res.prjexpense.status,
      statusdesc: res.prjexpense.statusdesc,
    });
    if (this.prjexpenseForm.get('customfield')!.value != null && this.prjexpenseForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.prjexpenseForm.get('customfield')!.value);
    this.FillCustomField();
    if (this.prjexpenseForm.get('attachment')!.value != null && this.prjexpenseForm.get('attachment')!.value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.prjexpenseForm.get('attachment')!.value));
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.prjexpenseForm.controls) {
      if (this.prjexpenseForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjexpenseForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.prjexpenseForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.prjexpenseForm!.value;
    obj.expensedate = this.ngbDateParserFormatter.format(this.prjexpenseForm.get('expensedate')!.value);
    obj.reimburseddate = this.ngbDateParserFormatter.format(this.prjexpenseForm.get('reimburseddate')!.value);
    obj.customfield = JSON.stringify(customfields);
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
    Object.keys(this.prjexpenseForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjexpenseForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjexpenseForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.prjexpenseservice.formData = this.prjexpenseForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjexpenseForm.controls[key] != null) {
            this.prjexpenseservice.formData[key] = this.prjexpenseForm.controls[key]!.value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.prjexpenseservice.formData.expensedate = new Date(this.ngbDateParserFormatter.format(this.prjexpenseForm.get('expensedate')!.value) + '  UTC');
    this.prjexpenseservice.formData.reimburseddate = new Date(this.ngbDateParserFormatter.format(this.prjexpenseForm.get('reimburseddate')!.value) + '  UTC');
    this.prjexpenseservice.formData.customfield = JSON.stringify(customfields);
    this.prjexpenseservice.formData.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    this.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(this.prjexpenseservice.formData);
    this.prjexpenseservice.saveOrUpdateprjexpenses().subscribe(
      async (res:any) => {
        await this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result!.value.prjexpense);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.prjexpenseservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.prjexpense);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.prjexpenseForm.markAsUntouched();
        this.prjexpenseForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  AddOrEditrequesteduserid(userid) {
    /*let ScreenType='2';
    this.dialog.open(bousermasterComponent, 
    {
    data: {userid:this.prjexpenseForm.get('requesteduserid')!.value, ScreenType:2 }
    } 
    ).onClose.subscribe((res:any) => {
    });*/
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



