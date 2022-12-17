import { lmscallService } from './../../../service/lmscall.service';
import { lmscall } from './../../../model/lmscall.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { lmsmaster} from './../../../model/lmsmaster.model';
import { lmsmasterComponent } from './../../../pages/forms/lmsmaster/lmsmaster.component';
import { lmsmasterService } from './../../../service/lmsmaster.service';
//popups
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityComponent } from './../../../pages/forms/lmsopportunity/lmsopportunity.component';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterComponent } from './../../../pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { lmstask } from './../../../model/lmstask.model';
import { lmstaskComponent } from './../../../pages/forms/lmstask/lmstask.component';
//FK services
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmsreminderComponent } from './../../../pages/forms/lmsreminder/lmsreminder.component';
//FK services
import { lmshistory } from './../../../model/lmshistory.model';
import { lmshistoryComponent } from './../../../pages/forms/lmshistory/lmshistory.component';
//FK services
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
selector: 'app-lmscall',
templateUrl: './lmscall.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmscallComponent implements OnInit {
hidelist:any=[];
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
maindata:any;
data3:any=[];
bfilterPopulatelmscalls:boolean=false;
datalmscallsbranchid3:any=[];
datalmscallsbranchlocationid3:any=[];
datalmscallsleadid3:any=[];
datalmscallsopportunityid3:any=[];
datalmscallscallid3:any=[];
datalmscallscampaignid3:any=[];
datalmscallsleadby3:any=[];
datalmscallscurrentowner3:any=[];
datalmscallsactivitytype3:any=[];
datalmscallsnextaction3:any=[];
datalmstasksassignto3:any=[];
datalmstaskstaskstatus3:any=[];
datalmstasksleadid3:any=[];
datalmstasksperformancestatus3:any=[];
datalmstaskspriority3:any=[];
datalmstasksopportunityid3:any=[];
datalmstasksproductid3:any=[];
datalmstaskscolor3:any=[];
bfilterPopulatelmstasks:boolean=false;
datalmsremindersproductid3:any=[];
datalmsremindersopportunityid3:any=[];
bfilterPopulatelmsreminders:boolean=false;
datalmshistoriesbranchlocationid3:any=[];
datalmshistoriesbranchid3:any=[];
datalmshistoriesleadby3:any=[];
datalmshistoriesleadid3:any=[];
datalmshistoriesnextaction3:any=[];
datalmshistoriesproductid3:any=[];
datalmshistoriesleadstage3:any=[];
datalmshistoriesleadsource3:any=[];
datalmshistoriesleadresponse3:any=[];
datalmshistoriesopportunityid3:any=[];
datalmshistoriescallid3:any=[];
datalmshistoriescampaignid3:any=[];
datalmshistoriescriticality3:any=[];
bfilterPopulatelmshistories:boolean=false;
@ViewChild('tbllmstaskssource',{static:false}) tbllmstaskssource: Ng2SmartTableComponent;
@ViewChild('tbllmsreminderssource',{static:false}) tbllmsreminderssource: Ng2SmartTableComponent;
@ViewChild('tbllmshistoriessource',{static:false}) tbllmshistoriessource: Ng2SmartTableComponent;
 lmscallForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
branchlocationidList: bobranchlocation[];
branchlocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchlocationid_bobranchlocationsForm: FormGroup;//autocomplete
branchlocationid_bobranchlocationsoptions:any;//autocomplete
branchlocationid_bobranchlocationsformatter:any;//autocomplete
leadidList: lmsmaster[];
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
callidList: lmscall[];
callidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
callid_lmscallsForm: FormGroup;//autocomplete
callid_lmscallsoptions:any;//autocomplete
callid_lmscallsformatter:any;//autocomplete
campaignidList: lmsproductmaster[];
leadbyList: bousermaster[];
leadbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leadby_bousermastersForm: FormGroup;//autocomplete
leadby_bousermastersoptions:any;//autocomplete
leadby_bousermastersformatter:any;//autocomplete
currentownerList: bousermaster[];
currentowneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
currentowner_bousermastersForm: FormGroup;//autocomplete
currentowner_bousermastersoptions:any;//autocomplete
currentowner_bousermastersformatter:any;//autocomplete
activitytypeList: boconfigvalue[];
nextactionList: boconfigvalue[];
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
lmscallshowOption:boolean;
lmstaskshowOption:boolean;
lmsremindershowOption:boolean;
lmshistoryshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmstasksvisiblelist:any;
lmstaskshidelist:any;
lmsremindersvisiblelist:any;
lmsremindershidelist:any;
lmshistoriesvisiblelist:any;
lmshistorieshidelist:any;

DeletedlmstaskIDs: string="";
lmstasksID: string = "1";
lmstasksselectedindex:any;
DeletedlmsreminderIDs: string="";
lmsremindersID: string = "2";
lmsremindersselectedindex:any;
DeletedlmshistoryIDs: string="";
lmshistoriesID: string = "3";
lmshistoriesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmscallservice: lmscallService,
private bousermasterservice: bousermasterService,
private lmsmasterservice: lmsmasterService,
private lmsopportunityservice: lmsopportunityService,
private lmsproductmasterservice: lmsproductmasterService,
private bobranchlocationservice: bobranchlocationService,
private bobranchmasterservice: bobranchmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.lmscallForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
branchlocationid: [null],
branchlocationiddesc: [null],
eventdate: [null, Validators.required],
eventtime: [null, Validators.required],
eventenddate: [null],
eventendtime: [null],
leadid: [null],
leadiddesc: [null],
opportunityid: [null],
opportunityiddesc: [null],
callid: [null],
calliddesc: [null],
agenda: [null],
campaignid: [null],
campaigniddesc: [null],
leadby: [null],
leadbydesc: [null],
currentowner: [null, Validators.required],
currentownerdesc: [null],
activitytype: [null, Validators.required],
activitytypedesc: [null],
attendedusers: [null],
clientusers: [null],
nextcalldate: [null],
nextaction: [null],
nextactiondesc: [null],
actiondatetime: [null],
score: [null],
remarks: [null],
attachment: [null],
customfield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmscallForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmscallForm.dirty && this.lmscallForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.callid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.callid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.callid && pkDetail) {
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
this.viewhtml=this.sessionService.getViewHtml();

debugger;
//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let lmscallid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=lmscallid;
//this.sharedService.alert(lmscallid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.lmscallservice.formData && this.lmscallservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.lmscallForm.patchValue({
    branchid: this.lmscallservice.formData.branchid,
    branchiddesc: this.lmscallservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.lmscallForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
if(this.lmscallservice.formData && this.lmscallservice.formData.branchlocationid){this.lmscallForm.patchValue({
    branchlocationid: this.lmscallservice.formData.branchlocationid,
    branchlocationiddesc: this.lmscallservice.formData.branchlocationiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.branchlocationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchlocationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchlocationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.lmsmasterservice.getlmsmastersList().then(res => 
{
this.leadidList = res as lmsmaster[];
}
).catch((err) => {console.log(err);});
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmscallservice.formData && this.lmscallservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmscallForm.patchValue({
    opportunityid: this.lmscallservice.formData.opportunityid,
    opportunityiddesc: this.lmscallservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmscallForm.get('opportunityid').value);
let objopportunityid;
if (arropportunityid.length > 0) objopportunityid = arropportunityid[0];
if (objopportunityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.opportunityid_lmsopportunitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.opportunityidList.filter(v => v.requirementdetails.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.opportunityid_lmsopportunitiesformatter = (result: any) => result.requirementdetails;
this.lmscallservice.getlmscallsList().then(res => 
{
this.callidList = res as lmscall[];
if(this.lmscallservice.formData && this.lmscallservice.formData.callid){
this.callidoptionsEvent.emit(this.callidList);
this.lmscallForm.patchValue({
    callid: this.lmscallservice.formData.callid,
    calliddesc: this.lmscallservice.formData.calliddesc,
});
}
{
let arrcallid = this.callidList.filter(v => v.callid == this.lmscallForm.get('callid').value);
let objcallid;
if (arrcallid.length > 0) objcallid = arrcallid[0];
if (objcallid)
{
}
}
}
).catch((err) => {console.log(err);});
this.callid_lmscallsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.callidList.filter(v => v.agenda.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.callid_lmscallsformatter = (result: any) => result.agenda;
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.campaignidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.leadbyList = res as bousermaster[];
if(this.lmscallservice.formData && this.lmscallservice.formData.leadby){
this.leadbyoptionsEvent.emit(this.leadbyList);
this.lmscallForm.patchValue({
    leadby: this.lmscallservice.formData.leadby,
    leadbydesc: this.lmscallservice.formData.leadbydesc,
});
}
{
let arrleadby = this.leadbyList.filter(v => v.userid == this.lmscallForm.get('leadby').value);
let objleadby;
if (arrleadby.length > 0) objleadby = arrleadby[0];
if (objleadby)
{
}
}
}
).catch((err) => {console.log(err);});
this.leadby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.leadbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.leadby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.currentownerList = res as bousermaster[];
if(this.lmscallservice.formData && this.lmscallservice.formData.currentowner){
this.currentowneroptionsEvent.emit(this.currentownerList);
this.lmscallForm.patchValue({
    currentowner: this.lmscallservice.formData.currentowner,
    currentownerdesc: this.lmscallservice.formData.currentownerdesc,
});
}
{
let arrcurrentowner = this.currentownerList.filter(v => v.userid == this.lmscallForm.get('currentowner').value);
let objcurrentowner;
if (arrcurrentowner.length > 0) objcurrentowner = arrcurrentowner[0];
if (objcurrentowner)
{
}
}
}
).catch((err) => {console.log(err);});
this.currentowner_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.currentownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.currentowner_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("activitytype").then(res => this.activitytypeList = res as boconfigvalue[]);
this.configservice.getList("activitytype").then(res => this.nextactionList = res as boconfigvalue[]);

//autocomplete
    this.lmscallservice.getlmscallsList().then(res => {
      this.pkList = res as lmscall[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.lmscallForm.markAsUntouched();
this.lmscallForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.lmscallForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});
this.bobranchlocationservice.getListBybranchid(branchidDetail.branchid).then(res => {
 this.branchlocationidList = res as bobranchlocation[]
}).catch((err) => {console.log(err);});

}
}

onSelectedbranchlocationid(branchlocationidDetail: any) {
if (branchlocationidDetail.locationid && branchlocationidDetail) {
this.lmscallForm.patchValue({
branchlocationid: branchlocationidDetail.locationid,
branchlocationiddesc: branchlocationidDetail.locationname,

});

}
}

onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmscallForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedcallid(callidDetail: any) {
if (callidDetail.callid && callidDetail) {
this.lmscallForm.patchValue({
callid: callidDetail.callid,
calliddesc: callidDetail.agenda,

});

}
}

onSelectedleadby(leadbyDetail: any) {
if (leadbyDetail.userid && leadbyDetail) {
this.lmscallForm.patchValue({
leadby: leadbyDetail.userid,
leadbydesc: leadbyDetail.username,

});

}
}

onSelectedcurrentowner(currentownerDetail: any) {
if (currentownerDetail.userid && currentownerDetail) {
this.lmscallForm.patchValue({
currentowner: currentownerDetail.userid,
currentownerdesc: currentownerDetail.username,

});

}
}




resetForm() {
if (this.lmscallForm != null)
this.lmscallForm.reset();
this.lmscallForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
leadby: this.sessiondata.userid,
leadbydesc: this.sessiondata.username,
currentowner: this.sessiondata.userid,
currentownerdesc: this.sessiondata.username,
});
this.lmscallForm.patchValue({
eventdate: this.ngbDateParserFormatter.parse(new Date().toString()),
eventtime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
eventenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
currentowner: this.sessiondata.userid,
nextcalldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
actiondatetime: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.lmscallservice.lmstasks=[];
this.lmstasksLoadTable();
this.lmscallservice.lmsreminders=[];
this.lmsremindersLoadTable();
this.lmscallservice.lmshistories=[];
this.lmshistoriesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let callid = this.lmscallForm.get('callid').value;
        if(callid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscallservice.deletelmscall(callid).then(res =>
                {
                this.resetForm();
                }
            ).catch((err) => {console.log(err);});
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.lmscallForm.patchValue({
        callid: null
    });
    if(this.lmscallservice.formData.callid!=null)this.lmscallservice.formData.callid=null;
for (let i=0;i<this.lmscallservice.lmstasks.length;i++) {
this.lmscallservice.lmstasks[i].taskid=null;
}
for (let i=0;i<this.lmscallservice.lmsreminders.length;i++) {
this.lmscallservice.lmsreminders[i].reminderid=null;
}
for (let i=0;i<this.lmscallservice.lmshistories.length;i++) {
this.lmscallservice.lmshistories[i].historyid=null;
}
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
        else if(key=="eventdate")
this.lmscallForm.patchValue({"eventdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="eventtime")
this.lmscallForm.patchValue({"eventtime":new Time(mainscreendata[key]) });
        else if(key=="eventenddate")
this.lmscallForm.patchValue({"eventenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="eventendtime")
this.lmscallForm.patchValue({"eventendtime":new Time(mainscreendata[key]) });
        else if(key=="attendedusers")
this.lmscallForm.patchValue({"attendedusers":  mainscreendata[key] } );
        else if(key=="nextcalldate")
this.lmscallForm.patchValue({"nextcalldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actiondatetime")
this.lmscallForm.patchValue({"actiondatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.lmscallForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.lmscallForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmscallForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmscallForm.controls[key]!=undefined)
{
this.lmscallForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscalls",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  )
{
    this.onSubmitData(false);
}
else if(this.maindata!=null  && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
branchidonChange(evt:any){
let e=evt.value;
}
branchlocationidonChange(evt:any){
let e=evt.value;
}
eventdateonChange(evt:any){
let e=evt.value;
}
eventtimeonChange(evt:any){
let e=evt.value;
}
eventenddateonChange(evt:any){
let e=evt.value;
}
eventendtimeonChange(evt:any){
let e=evt.value;
}
leadidonChange(evt:any){
let e=evt.value;
this.lmscallForm.patchValue({leadiddesc:evt.options[evt.options.selectedIndex].text});
}
opportunityidonChange(evt:any){
let e=evt.value;
}
callidonChange(evt:any){
let e=evt.value;
}
agendaonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
this.lmscallForm.patchValue({campaigniddesc:evt.options[evt.options.selectedIndex].text});
}
leadbyonChange(evt:any){
let e=evt.value;
}
currentowneronChange(evt:any){
let e=evt.value;
}
activitytypeonChange(evt:any){
let e=this.f.activitytype.value as any;
this.lmscallForm.patchValue({activitytypedesc:evt.options[evt.options.selectedIndex].text});
}
attendedusersonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrattendedusers=res;
let objattendedusers;
if (arrattendedusers.length > 0) objattendedusers = arrattendedusers[0];
if (objattendedusers)
{
}
}).catch((err) => {console.log(err);});
}
clientusersonChange(evt:any){
let e=evt.value;
}
nextcalldateonChange(evt:any){
let e=evt.value;
}
nextactiononChange(evt:any){
let e=this.f.nextaction.value as any;
this.lmscallForm.patchValue({nextactiondesc:evt.options[evt.options.selectedIndex].text});
}
actiondatetimeonChange(evt:any){
let e=evt.value;
}
scoreonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
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
  


editlmscalls() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmscallservice.getlmscallsByEID(pkcol).then(res => {

this.lmscallservice.formData=res.lmscall;
let formproperty=res.lmscall.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmscall.pkcol;
this.formid=res.lmscall.callid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmscall.callid;
var eventtimeTime=new Time( res.lmscall.eventtime);
var eventendtimeTime=new Time( res.lmscall.eventendtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmscallForm.patchValue({
branchid: res.lmscall.branchid,
branchiddesc: res.lmscall.branchiddesc,
branchlocationid: res.lmscall.branchlocationid,
branchlocationiddesc: res.lmscall.branchlocationiddesc,
eventdate: this.ngbDateParserFormatter.parse(res.lmscall.eventdate),
eventtime: eventtimeTime,
eventenddate: this.ngbDateParserFormatter.parse(res.lmscall.eventenddate),
eventendtime: eventendtimeTime,
leadid: res.lmscall.leadid,
leadiddesc: res.lmscall.leadiddesc,
opportunityid: res.lmscall.opportunityid,
opportunityiddesc: res.lmscall.opportunityiddesc,
callid: res.lmscall.callid,
calliddesc: res.lmscall.calliddesc,
agenda: res.lmscall.agenda,
campaignid: res.lmscall.campaignid,
campaigniddesc: res.lmscall.campaigniddesc,
leadby: res.lmscall.leadby,
leadbydesc: res.lmscall.leadbydesc,
currentowner: res.lmscall.currentowner,
currentownerdesc: res.lmscall.currentownerdesc,
activitytype: res.lmscall.activitytype,
activitytypedesc: res.lmscall.activitytypedesc,
attendedusers: JSON.parse(res.lmscall.attendedusers),
clientusers: res.lmscall.clientusers,
nextcalldate: this.ngbDateParserFormatter.parse(res.lmscall.nextcalldate),
nextaction: res.lmscall.nextaction,
nextactiondesc: res.lmscall.nextactiondesc,
actiondatetime: this.ngbDateParserFormatter.parse(res.lmscall.actiondatetime),
score: res.lmscall.score,
remarks: JSON.parse(res.lmscall.remarks),
attachment: JSON.parse(res.lmscall.attachment),
customfield: res.lmscall.customfield,
status: res.lmscall.status,
statusdesc: res.lmscall.statusdesc,
});
this.lmstasksvisiblelist=res.lmstasksvisiblelist;
this.lmsremindersvisiblelist=res.lmsremindersvisiblelist;
this.lmshistoriesvisiblelist=res.lmshistoriesvisiblelist;
if(this.lmscallForm.get('customfield').value!=null && this.lmscallForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmscallForm.get('customfield').value);
this.FillCustomField();
if(this.lmscallForm.get('attachment').value!=null && this.lmscallForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmscallForm.get('attachment').value);
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.lmscallservice.lmstasks = res.lmstasks;
this.SetlmstasksTableConfig();
this.lmstasksLoadTable();
  setTimeout(() => {
  this.SetlmstasksTableddConfig();
  });
this.lmscallservice.lmsreminders = res.lmsreminders;
this.SetlmsremindersTableConfig();
this.lmsremindersLoadTable();
  setTimeout(() => {
  this.SetlmsremindersTableddConfig();
  });
this.lmscallservice.lmshistories = res.lmshistories;
this.SetlmshistoriesTableConfig();
this.lmshistoriesLoadTable();
  setTimeout(() => {
  this.SetlmshistoriesTableddConfig();
  });
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
  for (let key in this.lmscallForm.controls) {
    if (this.lmscallForm.controls[key] != null) {
if(false)
{
if(this.lmscallservice.formData!=null && this.lmscallservice.formData[key]!=null  && this.lmscallservice.formData[key]!='[]' && this.lmscallservice.formData[key]!=undefined && this.lmscallservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmscallservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmscallservice.formData!=null && this.lmscallservice.formData[key]!=null   && this.lmscallservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmscallservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmscallservice.formData!=null && this.lmscallservice.formData[key]!=null   && this.lmscallservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmscallservice.formData[key]+"'><div class='progress__number'>"+this.lmscallservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmscallForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmscallForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmscallForm.value;
obj.eventdate=new Date(this.lmscallForm.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('eventdate').value)+'  UTC' :null);
obj.eventtime=(this.lmscallForm.get('eventtime').value==null?0:this.lmscallForm.get('eventtime').value.hour)+':'+(this.lmscallForm.get('eventtime').value==null?0:this.lmscallForm.get('eventtime').value.minute+":00");
obj.eventenddate=new Date(this.lmscallForm.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('eventenddate').value)+'  UTC' :null);
obj.eventendtime=(this.lmscallForm.get('eventendtime').value==null?0:this.lmscallForm.get('eventendtime').value.hour)+':'+(this.lmscallForm.get('eventendtime').value==null?0:this.lmscallForm.get('eventendtime').value.minute+":00");
if(this.lmscallForm.get('attendedusers').value!=null)obj.attendedusers=JSON.stringify(this.lmscallForm.get('attendedusers').value);
obj.nextcalldate=new Date(this.lmscallForm.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('nextcalldate').value)+'  UTC' :null);
obj.actiondatetime=new Date(this.lmscallForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('actiondatetime').value)+'  UTC' :null);
if(this.lmscallForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.lmscallForm.get('remarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
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

private lmscalltoggleOption(){
this.lmscallshowOption = this.lmscallshowOption === true ? false : true;
}

private lmstasktoggleOption(){
this.lmstaskshowOption = this.lmstaskshowOption === true ? false : true;
}

private lmsremindertoggleOption(){
this.lmsremindershowOption = this.lmsremindershowOption === true ? false : true;
}

private lmshistorytoggleOption(){
this.lmshistoryshowOption = this.lmshistoryshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmscallForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmscallForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmscallForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmscallservice.formData=this.lmscallForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmscallForm.controls[key] != null)
    {
        this.lmscallservice.formData[key] = this.lmscallForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmscallservice.formData.eventdate=new Date(this.lmscallForm.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('eventdate').value)+'  UTC' :null);
this.lmscallservice.formData.eventtime=(this.lmscallForm.get('eventtime').value==null?0:this.lmscallForm.get('eventtime').value.hour)+':'+(this.lmscallForm.get('eventtime').value==null?0:this.lmscallForm.get('eventtime').value.minute+":00");
this.lmscallservice.formData.eventenddate=new Date(this.lmscallForm.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('eventenddate').value)+'  UTC' :null);
this.lmscallservice.formData.eventendtime=(this.lmscallForm.get('eventendtime').value==null?0:this.lmscallForm.get('eventendtime').value.hour)+':'+(this.lmscallForm.get('eventendtime').value==null?0:this.lmscallForm.get('eventendtime').value.minute+":00");
if(this.lmscallForm.get('attendedusers').value!=null)this.lmscallservice.formData.attendedusers=JSON.stringify(this.lmscallForm.get('attendedusers').value);
this.lmscallservice.formData.nextcalldate=new Date(this.lmscallForm.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('nextcalldate').value)+'  UTC' :null);
this.lmscallservice.formData.actiondatetime=new Date(this.lmscallForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscallForm.get('actiondatetime').value)+'  UTC' :null);
if(this.lmscallForm.get('remarks').value!=null)this.lmscallservice.formData.remarks=JSON.stringify(this.lmscallForm.get('remarks').value);
if(this.fileattachment.getattachmentlist()!=null)this.lmscallservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
if(customfields!=null)this.lmscallservice.formData.customfield=JSON.stringify(customfields);
this.lmscallservice.formData.DeletedlmstaskIDs = this.DeletedlmstaskIDs;
this.lmscallservice.formData.DeletedlmsreminderIDs = this.DeletedlmsreminderIDs;
this.lmscallservice.formData.DeletedlmshistoryIDs = this.DeletedlmshistoryIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmscallservice.formData);
this.lmscallservice.formData=this.lmscallForm.value;
this.lmscallservice.saveOrUpdatelmscalls().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmstaskssource.data)
{
    for (let i = 0; i < this.lmstaskssource.data.length; i++)
    {
        if (this.lmstaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmstaskssource.data[i].fileattachmentlist);
    }
}
if (this.lmsreminderssource.data)
{
    for (let i = 0; i < this.lmsreminderssource.data.length; i++)
    {
        if (this.lmsreminderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsreminderssource.data[i].fileattachmentlist);
    }
}
if (this.lmshistoriessource.data)
{
    for (let i = 0; i < this.lmshistoriessource.data.length; i++)
    {
        if (this.lmshistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmshistoriessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscall);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmscallservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscall);
}
else
{
this.FillData(res);
}
}
this.lmscallForm.markAsUntouched();
this.lmscallForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.lmscallForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.lmscallForm.get('branchlocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadid( leadid) {
/*let ScreenType='2';
this.dialog.open(lmsmasterComponent, 
{
data: {leadid:this.lmscallForm.get('leadid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmscallForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcallid( callid) {
/*let ScreenType='2';
this.dialog.open(lmscallComponent, 
{
data: {callid:this.lmscallForm.get('callid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmscallForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmscallForm.get('leadby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcurrentowner( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmscallForm.get('currentowner').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmstask(event:any,taskid:any, callid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmstaskComponent, 
{
data:  {  showview:false,save:true,event,taskid, callid,visiblelist:this.lmstasksvisiblelist,  hidelist:this.lmstaskshidelist,ScreenType:2,opportunityid:this.lmscallForm.get('opportunityid').value,opportunityiddesc:this.lmscallForm.get('opportunityiddesc').value,leadid:this.lmscallForm.get('leadid').value,leadiddesc:this.lmscallForm.get('leadiddesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmstaskssource.add(res);
this.lmstaskssource.refresh();
}
else
{
this.lmstaskssource.update(event.data, res);
}
}
});
}

onDeletelmstask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmstaskIDs += childID + ",";
this.lmscallservice.lmstasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmsreminder(event:any,reminderid:any, callid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsreminderComponent, 
{
data:  {  showview:false,save:false,event,reminderid, callid,visiblelist:this.lmsremindersvisiblelist,  hidelist:this.lmsremindershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsreminderssource.add(res);
this.lmsreminderssource.refresh();
}
else
{
this.lmsreminderssource.update(event.data, res);
}
}
});
}

onDeletelmsreminder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsreminderIDs += childID + ",";
this.lmscallservice.lmsreminders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmshistory(event:any,historyid:any, callid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmshistoryComponent, 
{
data:  {  showview:false,save:true,event,historyid, callid,visiblelist:this.lmshistoriesvisiblelist,  hidelist:this.lmshistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmshistoriessource.add(res);
this.lmshistoriessource.refresh();
}
else
{
this.lmshistoriessource.update(event.data, res);
}
}
});
}

onDeletelmshistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmshistoryIDs += childID + ",";
this.lmscallservice.lmshistories.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmstasks
lmstaskssettings:any;
lmstaskssource: any;

showlmstasksCheckbox()
{
debugger;
if(this.tbllmstaskssource.settings['selectMode']== 'multi')this.tbllmstaskssource.settings['selectMode']= 'single';
else
this.tbllmstaskssource.settings['selectMode']= 'multi';
this.tbllmstaskssource.initGrid();
}
deletelmstasksAll()
{
this.tbllmstaskssource.settings['selectMode'] = 'single';
}
showlmstasksFilter()
{
  setTimeout(() => {
  this.SetlmstasksTableddConfig();
  });
      if(this.tbllmstaskssource.settings!=null)this.tbllmstaskssource.settings['hideSubHeader'] =!this.tbllmstaskssource.settings['hideSubHeader'];
this.tbllmstaskssource.initGrid();
}
showlmstasksInActive()
{
}
enablelmstasksInActive()
{
}
async SetlmstasksTableddConfig()
{
if(!this.bfilterPopulatelmstasks){

this.lmsmasterservice.getlmsmastersList().then(res=>
{
var dataleadid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstasksleadid3.push(defaultobj);
for(let i=0; i<dataleadid2.length; i++){
var obj= { value: dataleadid2[i].leadid, title:dataleadid2[i].lastname};
this.datalmstasksleadid3.push(obj);
}
if((this.tbllmstaskssource.settings as any).columns['leadid'])
{
(this.tbllmstaskssource.settings as any).columns['leadid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstasksleadid3));
this.tbllmstaskssource.initGrid();
}
});

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstasksopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmstasksopportunityid3.push(obj);
}
if((this.tbllmstaskssource.settings as any).columns['opportunityid'])
{
(this.tbllmstaskssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstasksopportunityid3));
this.tbllmstaskssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataassignto2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstasksassignto3.push(defaultobj);
for(let i=0; i<dataassignto2.length; i++){
var obj= { value: dataassignto2[i].userid, title:dataassignto2[i].username};
this.datalmstasksassignto3.push(obj);
}
if((this.tbllmstaskssource.settings as any).columns['assignto'])
{
(this.tbllmstaskssource.settings as any).columns['assignto'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstasksassignto3));
this.tbllmstaskssource.initGrid();
}
});

this.configservice.getList("performancestatus").then(res=>
{
var dataperformancestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstasksperformancestatus3.push(defaultobj);
for(let i=0; i<dataperformancestatus2.length; i++){
var obj= { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext};
this.datalmstasksperformancestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstaskssource.settings);
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstasksperformancestatus3)), }, };
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstasksperformancestatus3)), }, };
this.tbllmstaskssource.settings =  clone;
this.tbllmstaskssource.initGrid();
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstasksproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.datalmstasksproductid3.push(obj);
}
if((this.tbllmstaskssource.settings as any).columns['productid'])
{
(this.tbllmstaskssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstasksproductid3));
this.tbllmstaskssource.initGrid();
}
});
}
this.bfilterPopulatelmstasks=true;
}
async lmstasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmstasksTableConfig()
{
this.lmstaskssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
subject: {
title: 'Subject',
type: '',
filter:true,
},
assignto: {
title: 'Assign To',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmstasksassignto3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
priority: {
title: 'Priority',
type: '',
filter:true,
},
actualcloseddate: {
title: 'Actual Closed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
taskstatus: {
title: 'Task Status',
type: '',
filter:true,
},
},
};
}
lmstasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmstasksID)>=0)
{
this.lmstaskssource=new LocalDataSource();
this.lmstaskssource.load(this.lmscallservice.lmstasks as  any as LocalDataSource);
this.lmstaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmstasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscallservice.lmstasks.length == 0)
{
    this.tbllmstaskssource.grid.createFormShown = true;
}
else
{
    let obj = new lmstask();
    this.lmscallservice.lmstasks.push(obj);
    this.lmstaskssource.refresh();
    if ((this.lmscallservice.lmstasks.length / this.lmstaskssource.getPaging().perPage).toFixed(0) + 1 != this.lmstaskssource.getPaging().page)
    {
        this.lmstaskssource.setPage((this.lmscallservice.lmstasks.length / this.lmstaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmstaskssource.grid.edit(this.tbllmstaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmstaskssource.data.indexOf(event.data);
this.onDeletelmstask(event,event.data.taskid,((this.lmstaskssource.getPaging().page-1) *this.lmstaskssource.getPaging().perPage)+index);
this.lmstaskssource.refresh();
break;
}
}

*/
lmstasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmstask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmstask(event,event.data.taskid,this.formid);
break;
case 'delete':
this.onDeletelmstask(event,event.data.taskid,((this.lmstaskssource.getPaging().page-1) *this.lmstaskssource.getPaging().perPage)+event.index);
this.lmstaskssource.refresh();
break;
}
}
lmstasksonDelete(obj) {
let taskid=obj.data.taskid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscallservice.deletelmscall(taskid).then(res=>
this.lmstasksLoadTable()
);
}
}
lmstasksPaging(val)
{
debugger;
this.lmstaskssource.setPaging(1, val, true);
}

handlelmstasksGridSelected(event:any) {
this.lmstasksselectedindex=this.lmscallservice.lmstasks.findIndex(i => i.taskid === event.data.taskid);
}
IslmstasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmstasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmstasks
//start of Grid Codes lmsreminders
lmsreminderssettings:any;
lmsreminderssource: any;

showlmsremindersCheckbox()
{
debugger;
if(this.tbllmsreminderssource.settings['selectMode']== 'multi')this.tbllmsreminderssource.settings['selectMode']= 'single';
else
this.tbllmsreminderssource.settings['selectMode']= 'multi';
this.tbllmsreminderssource.initGrid();
}
deletelmsremindersAll()
{
this.tbllmsreminderssource.settings['selectMode'] = 'single';
}
showlmsremindersFilter()
{
  setTimeout(() => {
  this.SetlmsremindersTableddConfig();
  });
      if(this.tbllmsreminderssource.settings!=null)this.tbllmsreminderssource.settings['hideSubHeader'] =!this.tbllmsreminderssource.settings['hideSubHeader'];
this.tbllmsreminderssource.initGrid();
}
showlmsremindersInActive()
{
}
enablelmsremindersInActive()
{
}
async SetlmsremindersTableddConfig()
{
if(!this.bfilterPopulatelmsreminders){
}
this.bfilterPopulatelmsreminders=true;
}
async lmsremindersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsremindersTableConfig()
{
this.lmsreminderssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
leadid: {
title: 'Lead',
type: 'number',
filter:true,
},
opportunityid: {
title: 'Opportunity',
type: 'number',
filter:true,
},
remindertext: {
title: 'Reminder Text',
type: 'html',
filter:true,
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
filter:true,
},
},
};
}
lmsremindersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsremindersID)>=0)
{
this.lmsreminderssource=new LocalDataSource();
this.lmsreminderssource.load(this.lmscallservice.lmsreminders as  any as LocalDataSource);
this.lmsreminderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsremindersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscallservice.lmsreminders.length == 0)
{
    this.tbllmsreminderssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsreminder();
    this.lmscallservice.lmsreminders.push(obj);
    this.lmsreminderssource.refresh();
    if ((this.lmscallservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1 != this.lmsreminderssource.getPaging().page)
    {
        this.lmsreminderssource.setPage((this.lmscallservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsreminderssource.grid.edit(this.tbllmsreminderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsreminderssource.data.indexOf(event.data);
this.onDeletelmsreminder(event,event.data.reminderid,((this.lmsreminderssource.getPaging().page-1) *this.lmsreminderssource.getPaging().perPage)+index);
this.lmsreminderssource.refresh();
break;
}
}

*/
lmsremindersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsreminder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsreminder(event,event.data.reminderid,this.formid);
break;
case 'delete':
this.onDeletelmsreminder(event,event.data.reminderid,((this.lmsreminderssource.getPaging().page-1) *this.lmsreminderssource.getPaging().perPage)+event.index);
this.lmsreminderssource.refresh();
break;
}
}
lmsremindersonDelete(obj) {
let reminderid=obj.data.reminderid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscallservice.deletelmscall(reminderid).then(res=>
this.lmsremindersLoadTable()
);
}
}
lmsremindersPaging(val)
{
debugger;
this.lmsreminderssource.setPaging(1, val, true);
}

handlelmsremindersGridSelected(event:any) {
this.lmsremindersselectedindex=this.lmscallservice.lmsreminders.findIndex(i => i.reminderid === event.data.reminderid);
}
IslmsremindersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsremindersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsreminders
//start of Grid Codes lmshistories
lmshistoriessettings:any;
lmshistoriessource: any;

showlmshistoriesCheckbox()
{
debugger;
if(this.tbllmshistoriessource.settings['selectMode']== 'multi')this.tbllmshistoriessource.settings['selectMode']= 'single';
else
this.tbllmshistoriessource.settings['selectMode']= 'multi';
this.tbllmshistoriessource.initGrid();
}
deletelmshistoriesAll()
{
this.tbllmshistoriessource.settings['selectMode'] = 'single';
}
showlmshistoriesFilter()
{
  setTimeout(() => {
  this.SetlmshistoriesTableddConfig();
  });
      if(this.tbllmshistoriessource.settings!=null)this.tbllmshistoriessource.settings['hideSubHeader'] =!this.tbllmshistoriessource.settings['hideSubHeader'];
this.tbllmshistoriessource.initGrid();
}
showlmshistoriesInActive()
{
}
enablelmshistoriesInActive()
{
}
async SetlmshistoriesTableddConfig()
{
if(!this.bfilterPopulatelmshistories){
}
this.bfilterPopulatelmshistories=true;
}
async lmshistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmshistoriesTableConfig()
{
this.lmshistoriessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
branchid: {
title: 'Branch',
type: 'number',
filter:true,
},
branchlocationid: {
title: 'Branch Location',
type: 'number',
filter:true,
},
leadid: {
title: 'Lead',
type: 'number',
filter:true,
},
opportunityid: {
title: 'Opportunity',
type: 'number',
filter:true,
},
productid: {
title: 'Product',
type: 'number',
filter:true,
},
campaignid: {
title: 'Campaign',
type: 'number',
filter:true,
},
leadby: {
title: 'Lead By',
type: 'number',
filter:true,
},
currentowner: {
title: 'Current Owner',
type: '',
filter:true,
},
leadresponse: {
title: 'Lead Response',
type: '',
filter:true,
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
filter:true,
},
actiondatetime: {
title: 'Action Date Time',
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
filter:true,
editor: {
type: 'textarea',
},
},
leadscore: {
title: 'Lead Score',
type: 'number',
filter:true,
},
leadsource: {
title: 'Lead Source',
type: '',
filter:true,
},
leadstage: {
title: 'Lead Stage',
type: '',
filter:true,
},
criticality: {
title: 'Criticality',
type: '',
filter:true,
},
expectedvalue: {
title: 'Expected Value',
type: '',
filter:true,
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
},
};
}
lmshistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmshistoriesID)>=0)
{
this.lmshistoriessource=new LocalDataSource();
this.lmshistoriessource.load(this.lmscallservice.lmshistories as  any as LocalDataSource);
this.lmshistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmshistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscallservice.lmshistories.length == 0)
{
    this.tbllmshistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new lmshistory();
    this.lmscallservice.lmshistories.push(obj);
    this.lmshistoriessource.refresh();
    if ((this.lmscallservice.lmshistories.length / this.lmshistoriessource.getPaging().perPage).toFixed(0) + 1 != this.lmshistoriessource.getPaging().page)
    {
        this.lmshistoriessource.setPage((this.lmscallservice.lmshistories.length / this.lmshistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmshistoriessource.grid.edit(this.tbllmshistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmshistoriessource.data.indexOf(event.data);
this.onDeletelmshistory(event,event.data.historyid,((this.lmshistoriessource.getPaging().page-1) *this.lmshistoriessource.getPaging().perPage)+index);
this.lmshistoriessource.refresh();
break;
}
}

*/
lmshistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmshistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmshistory(event,event.data.historyid,this.formid);
break;
case 'delete':
this.onDeletelmshistory(event,event.data.historyid,((this.lmshistoriessource.getPaging().page-1) *this.lmshistoriessource.getPaging().perPage)+event.index);
this.lmshistoriessource.refresh();
break;
}
}
lmshistoriesonDelete(obj) {
let historyid=obj.data.historyid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscallservice.deletelmscall(historyid).then(res=>
this.lmshistoriesLoadTable()
);
}
}
lmshistoriesPaging(val)
{
debugger;
this.lmshistoriessource.setPaging(1, val, true);
}

handlelmshistoriesGridSelected(event:any) {
this.lmshistoriesselectedindex=this.lmscallservice.lmshistories.findIndex(i => i.historyid === event.data.historyid);
}
IslmshistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmshistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmshistories

}



