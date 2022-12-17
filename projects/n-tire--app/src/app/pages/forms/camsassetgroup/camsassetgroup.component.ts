import { camsassetgroupService } from './../../../service/camsassetgroup.service';
import { camsassetgroup } from './../../../model/camsassetgroup.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
//detail table services
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-camsassetgroup',
templateUrl: './camsassetgroup.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetgroupComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
//formdata: any;//current form data
shortcuts: ShortcutInput[] = [];//keyboard keys
showsubmit: boolean = true;//button to show
showGoWorkFlow: boolean = false;
pkList:any;//stores values - used in search, prev, next
pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
pk_tblForm: FormGroup;//pk - autocomplete
pk_tbloptions: any;//pk - autocomplete
pk_tblformatter: any;//pk - autocomplete
toolbarvisible:boolean=true;
customfieldservicelist:any;
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
data3:any=[];
bfilterPopulatecamsassetgroups:boolean=false;
datacamsassetgroupsdepreciationtype3:any=[];
datacamsassetgroupsassetaccount3:any=[];
datacamsassetgroupsmaintenanceaccount3:any=[];
datacamsassetgroupsleasecostaccount3:any=[];
datacamsassetgroupsdisposallossaccount3:any=[];
datacamsassetgroupsdisposalgainaccount3:any=[];
datacamsassetgroupsdepreciationaccount3:any=[];
datacamsassetgroupsaccumdepreciationaccount3:any=[];
 camsassetgroupForm: FormGroup;
depreciationtypeList: boconfigvalue[];
assetaccountList: erpfaaccountmaster[];
assetaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
assetaccount_erpfaaccountmastersoptions:any;//autocomplete
assetaccount_erpfaaccountmastersformatter:any;//autocomplete
maintenanceaccountList: erpfaaccountmaster[];
maintenanceaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
maintenanceaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
maintenanceaccount_erpfaaccountmastersoptions:any;//autocomplete
maintenanceaccount_erpfaaccountmastersformatter:any;//autocomplete
leasecostaccountList: erpfaaccountmaster[];
leasecostaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leasecostaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
leasecostaccount_erpfaaccountmastersoptions:any;//autocomplete
leasecostaccount_erpfaaccountmastersformatter:any;//autocomplete
disposallossaccountList: erpfaaccountmaster[];
disposallossaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
disposallossaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
disposallossaccount_erpfaaccountmastersoptions:any;//autocomplete
disposallossaccount_erpfaaccountmastersformatter:any;//autocomplete
disposalgainaccountList: erpfaaccountmaster[];
disposalgainaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
disposalgainaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
disposalgainaccount_erpfaaccountmastersoptions:any;//autocomplete
disposalgainaccount_erpfaaccountmastersformatter:any;//autocomplete
depreciationaccountList: erpfaaccountmaster[];
depreciationaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
depreciationaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
depreciationaccount_erpfaaccountmastersoptions:any;//autocomplete
depreciationaccount_erpfaaccountmastersformatter:any;//autocomplete
accumdepreciationaccountList: erpfaaccountmaster[];
accumdepreciationaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accumdepreciationaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
accumdepreciationaccount_erpfaaccountmastersoptions:any;//autocomplete
accumdepreciationaccount_erpfaaccountmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsassetgroupservice: camsassetgroupService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
private customfieldservice: customfieldconfigurationService,
private currentRoute: ActivatedRoute) { 
this.translate=this.sharedService.translate;
this.data = dynamicconfig;
this.pmenuid=sharedService.menuid;
this.pcurrenturl=sharedService.currenturl;
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
this.camsassetgroupForm  = this.fb.group({pk:[null],ImageName: [null],
assetgroupid: [null],
code: [null, Validators.required],
description: [null, Validators.required],
owned: [null],
depreciate: [null],
depreciationtype: [null, Validators.required],
depreciationtypedesc: [null],
frequencyofdepreciation: [null],
maxdepreciations: [null],
depreciationpercentage: [null],
postingdate: [null],
isfixedasset: [null],
oneassetperuom: [null],
usablelifeyears: [null],
usablelifemonths: [null],
uselifeyears: [null],
uselifemonths: [null],
assetaccount: [null],
assetaccountdesc: [null],
maintenanceaccount: [null],
maintenanceaccountdesc: [null],
leasecostaccount: [null],
leasecostaccountdesc: [null],
disposallossaccount: [null],
disposallossaccountdesc: [null],
disposalgainaccount: [null],
disposalgainaccountdesc: [null],
depreciationaccount: [null],
depreciationaccountdesc: [null],
accumdepreciationaccount: [null],
accumdepreciationaccountdesc: [null],
capitalwipaccount: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassetgroupForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetgroupForm.dirty && this.camsassetgroupForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
codeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.code.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].assetgroupid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Code value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
descriptionexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.description.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].assetgroupid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Description value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

//navigation buttons
first()
{
  if(this.pkList.length>0) this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
 if(this.pkList.length>0) this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.assetgroupid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.assetgroupid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.assetgroupid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');

debugger;
let camsassetgroupid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
}
else if(this.data!=null && this.data.pkcol!=null)
{
this.pkcol=this.data.pkcol;
}
else
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('id');
this.showformtype  = this.currentRoute.snapshot.paramMap.get('showformtype');
}
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=camsassetgroupid;
//this.sharedService.alert(camsassetgroupid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("depreciationtype").then(res => this.depreciationtypeList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.assetaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.assetaccount){
this.assetaccountoptionsEvent.emit(this.assetaccountList);
this.camsassetgroupForm.patchValue({
    assetaccount: this.camsassetgroupservice.formData.assetaccount,
    assetaccountdesc: this.camsassetgroupservice.formData.assetaccountdesc,
});
}
{
let arrassetaccount = this.assetaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('assetaccount').value);
let objassetaccount;
if (arrassetaccount.length > 0) objassetaccount = arrassetaccount[0];
if (objassetaccount)
{
}
}
}
);
this.assetaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.maintenanceaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.maintenanceaccount){
this.maintenanceaccountoptionsEvent.emit(this.maintenanceaccountList);
this.camsassetgroupForm.patchValue({
    maintenanceaccount: this.camsassetgroupservice.formData.maintenanceaccount,
    maintenanceaccountdesc: this.camsassetgroupservice.formData.maintenanceaccountdesc,
});
}
{
let arrmaintenanceaccount = this.maintenanceaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('maintenanceaccount').value);
let objmaintenanceaccount;
if (arrmaintenanceaccount.length > 0) objmaintenanceaccount = arrmaintenanceaccount[0];
if (objmaintenanceaccount)
{
}
}
}
);
this.maintenanceaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.maintenanceaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.maintenanceaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.leasecostaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.leasecostaccount){
this.leasecostaccountoptionsEvent.emit(this.leasecostaccountList);
this.camsassetgroupForm.patchValue({
    leasecostaccount: this.camsassetgroupservice.formData.leasecostaccount,
    leasecostaccountdesc: this.camsassetgroupservice.formData.leasecostaccountdesc,
});
}
{
let arrleasecostaccount = this.leasecostaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('leasecostaccount').value);
let objleasecostaccount;
if (arrleasecostaccount.length > 0) objleasecostaccount = arrleasecostaccount[0];
if (objleasecostaccount)
{
}
}
}
);
this.leasecostaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.leasecostaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.leasecostaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.disposallossaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.disposallossaccount){
this.disposallossaccountoptionsEvent.emit(this.disposallossaccountList);
this.camsassetgroupForm.patchValue({
    disposallossaccount: this.camsassetgroupservice.formData.disposallossaccount,
    disposallossaccountdesc: this.camsassetgroupservice.formData.disposallossaccountdesc,
});
}
{
let arrdisposallossaccount = this.disposallossaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('disposallossaccount').value);
let objdisposallossaccount;
if (arrdisposallossaccount.length > 0) objdisposallossaccount = arrdisposallossaccount[0];
if (objdisposallossaccount)
{
}
}
}
);
this.disposallossaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.disposallossaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.disposallossaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.disposalgainaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.disposalgainaccount){
this.disposalgainaccountoptionsEvent.emit(this.disposalgainaccountList);
this.camsassetgroupForm.patchValue({
    disposalgainaccount: this.camsassetgroupservice.formData.disposalgainaccount,
    disposalgainaccountdesc: this.camsassetgroupservice.formData.disposalgainaccountdesc,
});
}
{
let arrdisposalgainaccount = this.disposalgainaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('disposalgainaccount').value);
let objdisposalgainaccount;
if (arrdisposalgainaccount.length > 0) objdisposalgainaccount = arrdisposalgainaccount[0];
if (objdisposalgainaccount)
{
}
}
}
);
this.disposalgainaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.disposalgainaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.disposalgainaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.depreciationaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.depreciationaccount){
this.depreciationaccountoptionsEvent.emit(this.depreciationaccountList);
this.camsassetgroupForm.patchValue({
    depreciationaccount: this.camsassetgroupservice.formData.depreciationaccount,
    depreciationaccountdesc: this.camsassetgroupservice.formData.depreciationaccountdesc,
});
}
{
let arrdepreciationaccount = this.depreciationaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('depreciationaccount').value);
let objdepreciationaccount;
if (arrdepreciationaccount.length > 0) objdepreciationaccount = arrdepreciationaccount[0];
if (objdepreciationaccount)
{
}
}
}
);
this.depreciationaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.depreciationaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.depreciationaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accumdepreciationaccountList = res as erpfaaccountmaster[];
if(this.camsassetgroupservice.formData && this.camsassetgroupservice.formData.accumdepreciationaccount){
this.accumdepreciationaccountoptionsEvent.emit(this.accumdepreciationaccountList);
this.camsassetgroupForm.patchValue({
    accumdepreciationaccount: this.camsassetgroupservice.formData.accumdepreciationaccount,
    accumdepreciationaccountdesc: this.camsassetgroupservice.formData.accumdepreciationaccountdesc,
});
}
{
let arraccumdepreciationaccount = this.accumdepreciationaccountList.filter(v => v.accountid == this.camsassetgroupForm.get('accumdepreciationaccount').value);
let objaccumdepreciationaccount;
if (arraccumdepreciationaccount.length > 0) objaccumdepreciationaccount = arraccumdepreciationaccount[0];
if (objaccumdepreciationaccount)
{
}
}
}
);
this.accumdepreciationaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.accumdepreciationaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.accumdepreciationaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;

//autocomplete
    this.camsassetgroupservice.getcamsassetgroupsList().then(res => {
      this.pkList = res as camsassetgroup[];
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
this.camsassetgroupForm.markAsUntouched();
this.camsassetgroupForm.markAsPristine();
}
onSelectedassetaccount(assetaccountDetail: any) {
if (assetaccountDetail.assetaccount && assetaccountDetail) {
this.camsassetgroupForm.patchValue({
assetaccount: assetaccountDetail.assetaccount,
assetaccountdesc: assetaccountDetail.accountname,

});

}
}

onSelectedmaintenanceaccount(maintenanceaccountDetail: any) {
if (maintenanceaccountDetail.maintenanceaccount && maintenanceaccountDetail) {
this.camsassetgroupForm.patchValue({
maintenanceaccount: maintenanceaccountDetail.maintenanceaccount,
maintenanceaccountdesc: maintenanceaccountDetail.accountname,

});

}
}

onSelectedleasecostaccount(leasecostaccountDetail: any) {
if (leasecostaccountDetail.leasecostaccount && leasecostaccountDetail) {
this.camsassetgroupForm.patchValue({
leasecostaccount: leasecostaccountDetail.leasecostaccount,
leasecostaccountdesc: leasecostaccountDetail.accountname,

});

}
}

onSelecteddisposallossaccount(disposallossaccountDetail: any) {
if (disposallossaccountDetail.disposallossaccount && disposallossaccountDetail) {
this.camsassetgroupForm.patchValue({
disposallossaccount: disposallossaccountDetail.disposallossaccount,
disposallossaccountdesc: disposallossaccountDetail.accountname,

});

}
}

onSelecteddisposalgainaccount(disposalgainaccountDetail: any) {
if (disposalgainaccountDetail.disposalgainaccount && disposalgainaccountDetail) {
this.camsassetgroupForm.patchValue({
disposalgainaccount: disposalgainaccountDetail.disposalgainaccount,
disposalgainaccountdesc: disposalgainaccountDetail.accountname,

});

}
}

onSelecteddepreciationaccount(depreciationaccountDetail: any) {
if (depreciationaccountDetail.depreciationaccount && depreciationaccountDetail) {
this.camsassetgroupForm.patchValue({
depreciationaccount: depreciationaccountDetail.depreciationaccount,
depreciationaccountdesc: depreciationaccountDetail.accountname,

});

}
}

onSelectedaccumdepreciationaccount(accumdepreciationaccountDetail: any) {
if (accumdepreciationaccountDetail.accumdepreciationaccount && accumdepreciationaccountDetail) {
this.camsassetgroupForm.patchValue({
accumdepreciationaccount: accumdepreciationaccountDetail.accumdepreciationaccount,
accumdepreciationaccountdesc: accumdepreciationaccountDetail.accountname,

});

}
}




resetForm() {
if (this.camsassetgroupForm != null)
this.camsassetgroupForm.reset();
this.camsassetgroupForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let assetgroupid = this.camsassetgroupForm.get('assetgroupid').value;
        if(assetgroupid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetgroupservice.deletecamsassetgroup(assetgroupid).then(res =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.camsassetgroupForm.patchValue({
        assetgroupid: null
    });
    if(this.camsassetgroupservice.formData.assetgroupid!=null)this.camsassetgroupservice.formData.assetgroupid=null;
    }
    PopulateFromMainScreen(mainscreendata:any,bdisable:any)
    {
    if(mainscreendata!=null)
    {
      for (let key in mainscreendata) {
if(key!='visiblelist' && key!='hidelist' && key!='event'){
        
        let jsonstring="";
        let json=null;
let ctrltype=typeof (mainscreendata[key]);
if(false)
json="";
        else if(key=="postingdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="remarks")
        json='{"'+key+'": '+mainscreendata[key] +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.camsassetgroupForm.controls[key]!=null)
{
this.camsassetgroupForm.patchValue(json);
         if(bdisable)this.camsassetgroupForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetgroups",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
assetgroupidonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
ownedonChange(evt:any){
let e=evt.value;
}
depreciateonChange(evt:any){
let e=evt.value;
}
depreciationtypeonChange(evt:any){
let e=this.f.depreciationtype.value as any;
this.camsassetgroupForm.patchValue({depreciationtypedesc:evt.options[evt.options.selectedIndex].text});
}
frequencyofdepreciationonChange(evt:any){
let e=evt.value;
}
maxdepreciationsonChange(evt:any){
let e=evt.value;
}
depreciationpercentageonChange(evt:any){
let e=evt.value;
}
postingdateonChange(evt:any){
let e=evt.value;
}
isfixedassetonChange(evt:any){
let e=evt.value;
}
oneassetperuomonChange(evt:any){
let e=evt.value;
}
usablelifeyearsonChange(evt:any){
let e=evt.value;
}
usablelifemonthsonChange(evt:any){
let e=evt.value;
}
uselifeyearsonChange(evt:any){
let e=evt.value;
}
uselifemonthsonChange(evt:any){
let e=evt.value;
}
assetaccountonChange(evt:any){
let e=evt.value;
}
maintenanceaccountonChange(evt:any){
let e=evt.value;
}
leasecostaccountonChange(evt:any){
let e=evt.value;
}
disposallossaccountonChange(evt:any){
let e=evt.value;
}
disposalgainaccountonChange(evt:any){
let e=evt.value;
}
depreciationaccountonChange(evt:any){
let e=evt.value;
}
accumdepreciationaccountonChange(evt:any){
let e=evt.value;
}
capitalwipaccountonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
attachmentuploader(e:any) { 
for (let i = 0; i < e.files.length; i++) {
this.fileattachmentlist.push(e.files[i]);
let max=0;
let attachmentobj =null;
if(this.attachmentfieldjson==null)this.attachmentfieldjson=[];
max=Array.of(this.attachmentfieldjson).length;attachmentobj =new KeyValuePair((this.attachmentfieldjson.length + 1+ max).toString(),e.files[i].name);
this.attachmentfieldjson.push(attachmentobj);
max=0;
if(this.attachmentlist!=null)max=Array.of(this.attachmentlist).length;  attachmentobj =new KeyValuePair((this.attachmentlist.length + 1+ max).toString(),e.files[i].name);
this.attachmentlist.push(attachmentobj);
}}
  


async PopulateScreen(pkcol:any){this.camsassetgroupservice.getcamsassetgroupsByEID(pkcol).then(res => {

this.camsassetgroupservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.camsassetgroup.assetgroupid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.camsassetgroup.assetgroupid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetgroupForm.patchValue({
assetgroupid: res.camsassetgroup.assetgroupid,
code: res.camsassetgroup.code,
description: res.camsassetgroup.description,
owned: res.camsassetgroup.owned,
depreciate: res.camsassetgroup.depreciate,
depreciationtype: res.camsassetgroup.depreciationtype,
depreciationtypedesc: res.camsassetgroup.depreciationtypedesc,
frequencyofdepreciation: res.camsassetgroup.frequencyofdepreciation,
maxdepreciations: res.camsassetgroup.maxdepreciations,
depreciationpercentage: res.camsassetgroup.depreciationpercentage,
postingdate: this.ngbDateParserFormatter.parse(res.camsassetgroup.postingdate),
isfixedasset: res.camsassetgroup.isfixedasset,
oneassetperuom: res.camsassetgroup.oneassetperuom,
usablelifeyears: res.camsassetgroup.usablelifeyears,
usablelifemonths: res.camsassetgroup.usablelifemonths,
uselifeyears: res.camsassetgroup.uselifeyears,
uselifemonths: res.camsassetgroup.uselifemonths,
assetaccount: res.camsassetgroup.assetaccount,
assetaccountdesc: res.camsassetgroup.assetaccountdesc,
maintenanceaccount: res.camsassetgroup.maintenanceaccount,
maintenanceaccountdesc: res.camsassetgroup.maintenanceaccountdesc,
leasecostaccount: res.camsassetgroup.leasecostaccount,
leasecostaccountdesc: res.camsassetgroup.leasecostaccountdesc,
disposallossaccount: res.camsassetgroup.disposallossaccount,
disposallossaccountdesc: res.camsassetgroup.disposallossaccountdesc,
disposalgainaccount: res.camsassetgroup.disposalgainaccount,
disposalgainaccountdesc: res.camsassetgroup.disposalgainaccountdesc,
depreciationaccount: res.camsassetgroup.depreciationaccount,
depreciationaccountdesc: res.camsassetgroup.depreciationaccountdesc,
accumdepreciationaccount: res.camsassetgroup.accumdepreciationaccount,
accumdepreciationaccountdesc: res.camsassetgroup.accumdepreciationaccountdesc,
capitalwipaccount: res.camsassetgroup.capitalwipaccount,
remarks: JSON.parse(res.camsassetgroup.remarks),
customfield: res.camsassetgroup.customfield,
attachment: res.camsassetgroup.attachment,
status: res.camsassetgroup.status,
statusdesc: res.camsassetgroup.statusdesc,
});
if(this.camsassetgroupForm.get('customfield').value!=null && this.camsassetgroupForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetgroupForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetgroupForm.get('attachment').value!=null && this.camsassetgroupForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.camsassetgroupForm.get('attachment').value));
//Child Tables if any
}

validate()
{
let ret=true;
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.camsassetgroupForm.controls) {
    if (this.camsassetgroupForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetgroupForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetgroupForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetgroupForm.value;
obj.postingdate=this.ngbDateParserFormatter.format(this.camsassetgroupForm.get('postingdate').value);
obj.remarks=JSON.stringify(this.camsassetgroupForm.get('remarks').value);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
this.dialogRef.close(obj);
}

//This has to come from bomenuactions & procedures
afteraction(mode:any)
{
    let formname="";
    let query="";
    if(mode=="new")
        this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if(mode=="refresh")
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
}

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetgroupForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetgroupForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetgroupForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetgroupservice.formData=this.camsassetgroupForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetgroupForm.controls[key] != null)
    {
        this.camsassetgroupservice.formData[key] = this.camsassetgroupForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetgroupservice.formData.postingdate=new Date(this.ngbDateParserFormatter.format(this.camsassetgroupForm.get('postingdate').value)+'  UTC');
this.camsassetgroupservice.formData.remarks=JSON.stringify(this.camsassetgroupForm.get('remarks').value);
this.camsassetgroupservice.formData.customfield=JSON.stringify(customfields);
this.camsassetgroupservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetgroupservice.formData);
this.camsassetgroupservice.formData=this.camsassetgroupForm.value;
this.camsassetgroupservice.saveOrUpdatecamsassetgroups().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.camsassetgroup);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetgroupservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.camsassetgroup);
}
else
{
this.FillData(res);
}
}
this.camsassetgroupForm.markAsUntouched();
this.camsassetgroupForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassetaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('assetaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmaintenanceaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('maintenanceaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleasecostaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('leasecostaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdisposallossaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('disposallossaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdisposalgainaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('disposalgainaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepreciationaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('depreciationaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccumdepreciationaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.camsassetgroupForm.get('accumdepreciationaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



