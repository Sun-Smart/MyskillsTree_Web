import { bocompanymasterService } from './../../../service/bocompanymaster.service';
import { bocompanymaster } from './../../../model/bocompanymaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bocountry} from './../../../model/bocountry.model';
import { bocountryComponent } from './../../../pages/forms/bocountry/bocountry.component';
import { bocountryService } from './../../../service/bocountry.service';
//popups
import { bostate} from './../../../model/bostate.model';
import { bostateComponent } from './../../../pages/forms/bostate/bostate.component';
import { bostateService } from './../../../service/bostate.service';
//popups
import { bocity} from './../../../model/bocity.model';
import { bocityComponent } from './../../../pages/forms/bocity/bocity.component';
import { bocityService } from './../../../service/bocity.service';
//popups
import { bolocation} from './../../../model/bolocation.model';
import { bolocationComponent } from './../../../pages/forms/bolocation/bolocation.component';
import { bolocationService } from './../../../service/bolocation.service';
//popups
import { bouserrolemaster} from './../../../model/bouserrolemaster.model';
import { bouserrolemasterComponent } from './../../../pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
//popups
//detail table services
import { bocompanyholiday } from './../../../model/bocompanyholiday.model';
import { bocompanyholidayComponent } from './../../../pages/forms/bocompanyholiday/bocompanyholiday.component';
//FK services
import { bofinancialyear,IbofinancialyearResponse } from './../../../model/bofinancialyear.model';
import { bofinancialyearComponent } from './../../../pages/forms/bofinancialyear/bofinancialyear.component';
import { bofinancialyearService } from './../../../service/bofinancialyear.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-bocompanymaster',
templateUrl: './bocompanymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bocompanymasterComponent implements OnInit {
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
bfilterPopulatebocompanymasters:boolean=false;
databocompanymasterscompanytype3:any=[];
databocompanymastersbusinesssegment3:any=[];
databocompanymasterslocalization3:any=[];
databocompanymasterstimezone3:any=[];
databocompanymasterscountryid3:any=[];
databocompanymastersstateid3:any=[];
databocompanymasterscityid3:any=[];
databocompanymasterslocationid3:any=[];
databocompanymastersshippingcountryid3:any=[];
databocompanymastersshippingstateid3:any=[];
databocompanymastersshippingcityid3:any=[];
databocompanymastersdesignation3:any=[];
databocompanymastersbasecurrency3:any=[];
databocompanymastersgstregistrationtype3:any=[];
databocompanymastersweekoff13:any=[];
databocompanymastersweekoff23:any=[];
databocompanyholidaysholidayday3:any=[];
databocompanyholidaysfinancialyearid3:any=[];
bfilterPopulatebocompanyholidays:boolean=false;
bfilterPopulatebofinancialyears:boolean=false;
@ViewChild('tblbocompanyholidayssource',{static:false}) tblbocompanyholidayssource: Ng2SmartTableComponent;
@ViewChild('tblbofinancialyearssource',{static:false}) tblbofinancialyearssource: Ng2SmartTableComponent;
 bocompanymasterForm: FormGroup;
companytypeList: boconfigvalue[];
businesssegmentList: boconfigvalue[];
localizationList: boconfigvalue[];
timezoneList: boconfigvalue[];
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
locationidList: bolocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bolocationsForm: FormGroup;//autocomplete
locationid_bolocationsoptions:any;//autocomplete
locationid_bolocationsformatter:any;//autocomplete
shippingcountryidList: bocountry[];
shippingcountryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
shippingcountryid_bocountriesForm: FormGroup;//autocomplete
shippingcountryid_bocountriesoptions:any;//autocomplete
shippingcountryid_bocountriesformatter:any;//autocomplete
shippingstateidList: bostate[];
shippingstateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
shippingstateid_bostatesForm: FormGroup;//autocomplete
shippingstateid_bostatesoptions:any;//autocomplete
shippingstateid_bostatesformatter:any;//autocomplete
shippingcityidList: bocity[];
shippingcityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
shippingcityid_bocitiesForm: FormGroup;//autocomplete
shippingcityid_bocitiesoptions:any;//autocomplete
shippingcityid_bocitiesformatter:any;//autocomplete
designationList: bouserrolemaster[];
basecurrencyList: boconfigvalue[];
gstregistrationtypeList: boconfigvalue[];
weekoff1List: boconfigvalue[];
weekoff2List: boconfigvalue[];
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
bocompanymastershowOption:boolean;
bocompanyholidayshowOption:boolean;
bofinancialyearshowOption:boolean;
sessiondata:any;
sourcekey:any;



bocompanyholidaysvisiblelist:any;
bocompanyholidayshidelist:any;
bofinancialyearsvisiblelist:any;
bofinancialyearshidelist:any;

DeletedbocompanyholidayIDs: string="";
bocompanyholidaysID: string = "1";
bocompanyholidaysselectedindex:any;
DeletedbofinancialyearIDs: string="";
bofinancialyearsID: string = "2";
bofinancialyearsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bocompanymasterservice: bocompanymasterService,
private bofinancialyearservice: bofinancialyearService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
private bolocationservice:bolocationService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.bocompanymasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
companyid: [null],
code: [null],
companyname: [null, Validators.required],
registrationnumber: [null, Validators.required],
companytype: [null],
companytypedesc: [null],
companylogo: [null],
letterhead: [null],
incorporationdate: [null],
businesssegment: [null],
businesssegmentdesc: [null],
details: [null],
services: [null],
brandname: [null],
mailingemailaddress: [null],
mailingsendername: [null],
localization: [null],
localizationdesc: [null],
timezone: [null],
timezonedesc: [null],
pointvalue: [null],
financialstrength: [null],
reputation: [null],
socialresponsibility: [null],
environmentalpolicy: [null],
website: [null],
phone: [null],
email: [null],
address1: [null, Validators.required],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
locationid: [null],
locationiddesc: [null],
pincode: [null],
startdate: [null],
enddate: [null],
bankid: [null],
chartofaccounts: [null],
shippingaddress1: [null],
shippingaddress2: [null],
shippingcountryid: [null],
shippingcountryiddesc: [null],
shippingstateid: [null],
shippingstateiddesc: [null],
shippingcityid: [null],
shippingcityiddesc: [null],
shippingpincode: [null],
contactname: [null],
designation: [null],
designationdesc: [null],
cpphone: [null],
cpemail: [null],
basecurrency: [null],
basecurrencydesc: [null],
gstregistrationtype: [null],
gstregistrationtypedesc: [null],
gstinnumber: [null],
pannumber: [null],
trnnumber: [null],
tan: [null],
cst: [null],
salestax: [null],
servicetax: [null],
tin: [null],
localtax: [null],
accountstartdate: [null],
numberofusers: [null],
starttime: [null],
endtime: [null],
weekoff1: [null],
weekoff1desc: [null],
weekoff2: [null],
weekoff2desc: [null],
facebookaccountname: [null],
facebookaccounturl: [null],
twitteraccountname: [null],
twitteraccounturl: [null],
linkedinaccountname: [null],
linkedinaccounturl: [null],
instagramaccountname: [null],
instagramaccounturl: [null],
customfield: [null],
attachment: [null],
erp: [null],
cams: [null],
crm: [null],
procurement: [null],
legal: [null],
hrms: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bocompanymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bocompanymasterForm.dirty && this.bocompanymasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
companynameexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.companyname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].companyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Company Name value exists in the database.Do you want to display the record ? "))
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
registrationnumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.registrationnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].companyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Registration Number value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.companyid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.companyid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.companyid && pkDetail) {
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
let bocompanymasterid = null;

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
this.formid=bocompanymasterid;
//this.sharedService.alert(bocompanymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbocompanyholidaysTableConfig();
  setTimeout(() => {
  this.SetbocompanyholidaysTableddConfig();
  });

this.SetbofinancialyearsTableConfig();
  setTimeout(() => {
  this.SetbofinancialyearsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("companytype").then(res => this.companytypeList = res as boconfigvalue[]);
this.configservice.getList("businesssegment").then(res => this.businesssegmentList = res as boconfigvalue[]);
this.configservice.getList("localization").then(res => this.localizationList = res as boconfigvalue[]);
this.configservice.getList("timezone").then(res => this.timezoneList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.bocompanymasterForm.patchValue({
    countryid: this.bocompanymasterservice.formData.countryid,
    countryiddesc: this.bocompanymasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.bocompanymasterForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.stateid){this.bocompanymasterForm.patchValue({
    stateid: this.bocompanymasterservice.formData.stateid,
    stateiddesc: this.bocompanymasterservice.formData.stateiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.cityid){this.bocompanymasterForm.patchValue({
    cityid: this.bocompanymasterservice.formData.cityid,
    cityiddesc: this.bocompanymasterservice.formData.cityiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.cityid.value && this.f.cityid.value!="" && this.f.cityid.value!=null)this.bolocationservice.getListBycityid(this.f.cityid.value).then(res =>{
this.locationidList = res as bolocation[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.locationid){this.bocompanymasterForm.patchValue({
    locationid: this.bocompanymasterservice.formData.locationid,
    locationiddesc: this.bocompanymasterservice.formData.locationiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.locationid_bolocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bolocationsformatter = (result: any) => result.name;
this.bocountryservice.getbocountriesList().then(res => 
{
this.shippingcountryidList = res as bocountry[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.shippingcountryid){
this.shippingcountryidoptionsEvent.emit(this.shippingcountryidList);
this.bocompanymasterForm.patchValue({
    shippingcountryid: this.bocompanymasterservice.formData.shippingcountryid,
    shippingcountryiddesc: this.bocompanymasterservice.formData.shippingcountryiddesc,
});
}
{
let arrshippingcountryid = this.shippingcountryidList.filter(v => v.countryid == this.bocompanymasterForm.get('shippingcountryid').value);
let objshippingcountryid;
if (arrshippingcountryid.length > 0) objshippingcountryid = arrshippingcountryid[0];
if (objshippingcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.shippingcountryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.shippingcountryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.shippingcountryid_bocountriesformatter = (result: any) => result.name;
this.bostateservice.getbostatesList().then(res => 
{
this.shippingstateidList = res as bostate[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.shippingstateid){
this.shippingstateidoptionsEvent.emit(this.shippingstateidList);
this.bocompanymasterForm.patchValue({
    shippingstateid: this.bocompanymasterservice.formData.shippingstateid,
    shippingstateiddesc: this.bocompanymasterservice.formData.shippingstateiddesc,
});
}
{
let arrshippingstateid = this.shippingstateidList.filter(v => v.stateid == this.bocompanymasterForm.get('shippingstateid').value);
let objshippingstateid;
if (arrshippingstateid.length > 0) objshippingstateid = arrshippingstateid[0];
if (objshippingstateid)
{
}
}
}
).catch((err) => {console.log(err);});
this.shippingstateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.shippingstateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.shippingstateid_bostatesformatter = (result: any) => result.name;
this.bocityservice.getbocitiesList().then(res => 
{
this.shippingcityidList = res as bocity[];
if(this.bocompanymasterservice.formData && this.bocompanymasterservice.formData.shippingcityid){
this.shippingcityidoptionsEvent.emit(this.shippingcityidList);
this.bocompanymasterForm.patchValue({
    shippingcityid: this.bocompanymasterservice.formData.shippingcityid,
    shippingcityiddesc: this.bocompanymasterservice.formData.shippingcityiddesc,
});
}
{
let arrshippingcityid = this.shippingcityidList.filter(v => v.cityid == this.bocompanymasterForm.get('shippingcityid').value);
let objshippingcityid;
if (arrshippingcityid.length > 0) objshippingcityid = arrshippingcityid[0];
if (objshippingcityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.shippingcityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.shippingcityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.shippingcityid_bocitiesformatter = (result: any) => result.name;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.designationList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("basecurrency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.configservice.getList("gstregistrationtype").then(res => this.gstregistrationtypeList = res as boconfigvalue[]);
this.configservice.getList("weekday").then(res => this.weekoff1List = res as boconfigvalue[]);
this.configservice.getList("weekday").then(res => this.weekoff2List = res as boconfigvalue[]);

//autocomplete
    this.bocompanymasterservice.getbocompanymastersList().then(res => {
      this.pkList = res as bocompanymaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.companyname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.companyname;

//setting the flag that the screen is not touched 
this.bocompanymasterForm.markAsUntouched();
this.bocompanymasterForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.bocompanymasterForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});
this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
 this.stateidList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.bocompanymasterForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});
this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
 this.cityidList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.bocompanymasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});
this.bolocationservice.getListBycityid(cityidDetail.cityid).then(res => {
 this.locationidList = res as bolocation[]
}).catch((err) => {console.log(err);});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.bocompanymasterForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.name,

});

}
}

onSelectedshippingcountryid(shippingcountryidDetail: any) {
if (shippingcountryidDetail.countryid && shippingcountryidDetail) {
this.bocompanymasterForm.patchValue({
shippingcountryid: shippingcountryidDetail.countryid,
shippingcountryiddesc: shippingcountryidDetail.name,

});

}
}

onSelectedshippingstateid(shippingstateidDetail: any) {
if (shippingstateidDetail.stateid && shippingstateidDetail) {
this.bocompanymasterForm.patchValue({
shippingstateid: shippingstateidDetail.stateid,
shippingstateiddesc: shippingstateidDetail.name,

});

}
}

onSelectedshippingcityid(shippingcityidDetail: any) {
if (shippingcityidDetail.cityid && shippingcityidDetail) {
this.bocompanymasterForm.patchValue({
shippingcityid: shippingcityidDetail.cityid,
shippingcityiddesc: shippingcityidDetail.name,

});

}
}




resetForm() {
if (this.bocompanymasterForm != null)
this.bocompanymasterForm.reset();
this.bocompanymasterForm.patchValue({
});
this.bocompanymasterForm.patchValue({
companyname: "xxxx",
incorporationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
countryid: 1,
stateid: 1,
startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
accountstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.bocompanymasterservice.bocompanyholidays=[];
this.bocompanyholidaysLoadTable();
this.bocompanymasterservice.bofinancialyears=[];
this.bofinancialyearsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let companyid = this.bocompanymasterForm.get('companyid').value;
        if(companyid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanymasterservice.deletebocompanymaster(companyid).then(res =>
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
    this.bocompanymasterForm.patchValue({
        companyid: null
    });
    if(this.bocompanymasterservice.formData.companyid!=null)this.bocompanymasterservice.formData.companyid=null;
for (let i=0;i<this.bocompanymasterservice.bocompanyholidays.length;i++) {
this.bocompanymasterservice.bocompanyholidays[i].holidayid=null;
}
for (let i=0;i<this.bocompanymasterservice.bofinancialyears.length;i++) {
this.bocompanymasterservice.bofinancialyears[i].finyearid=null;
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
        else if(key=="incorporationdate")
this.bocompanymasterForm.patchValue({"incorporationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.bocompanymasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.bocompanymasterForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="accountstartdate")
this.bocompanymasterForm.patchValue({"accountstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="starttime")
this.bocompanymasterForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="endtime")
this.bocompanymasterForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.bocompanymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bocompanymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bocompanymasterForm.controls[key]!=undefined)
{
this.bocompanymasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("bocompanymasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.bocompanymasterservice.formData.companyname!=null )
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
companyidonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
companynameonChange(evt:any){
let e=evt.value;
}
registrationnumberonChange(evt:any){
let e=evt.value;
}
companytypeonChange(evt:any){
let e=this.f.companytype.value as any;
this.bocompanymasterForm.patchValue({companytypedesc:evt.options[evt.options.selectedIndex].text});
}
companylogoonChange(evt:any){
let e=evt.value;
}
letterheadonChange(evt:any){
let e=evt.value;
}
incorporationdateonChange(evt:any){
let e=evt.value;
}
businesssegmentonChange(evt:any){
let e=this.f.businesssegment.value as any;
this.bocompanymasterForm.patchValue({businesssegmentdesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
servicesonChange(evt:any){
let e=evt.value;
}
brandnameonChange(evt:any){
let e=evt.value;
}
mailingemailaddressonChange(evt:any){
let e=evt.value;
}
mailingsendernameonChange(evt:any){
let e=evt.value;
}
localizationonChange(evt:any){
let e=this.f.localization.value as any;
this.bocompanymasterForm.patchValue({localizationdesc:evt.options[evt.options.selectedIndex].text});
}
timezoneonChange(evt:any){
let e=this.f.timezone.value as any;
this.bocompanymasterForm.patchValue({timezonedesc:evt.options[evt.options.selectedIndex].text});
}
pointvalueonChange(evt:any){
let e=evt.value;
}
financialstrengthonChange(evt:any){
let e=evt.value;
}
reputationonChange(evt:any){
let e=evt.value;
}
socialresponsibilityonChange(evt:any){
let e=evt.value;
}
environmentalpolicyonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
phoneonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
pincodeonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
bankidonChange(evt:any){
let e=evt.value;
}
chartofaccountsonChange(evt:any){
let e=evt.value;
}
shippingaddress1onChange(evt:any){
let e=evt.value;
}
shippingaddress2onChange(evt:any){
let e=evt.value;
}
shippingcountryidonChange(evt:any){
let e=evt.value;
}
shippingstateidonChange(evt:any){
let e=evt.value;
}
shippingcityidonChange(evt:any){
let e=evt.value;
}
shippingpincodeonChange(evt:any){
let e=evt.value;
}
contactnameonChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
this.bocompanymasterForm.patchValue({designationdesc:evt.options[evt.options.selectedIndex].text});
}
cpphoneonChange(evt:any){
let e=evt.value;
}
cpemailonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.bocompanymasterForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
gstregistrationtypeonChange(evt:any){
let e=this.f.gstregistrationtype.value as any;
this.bocompanymasterForm.patchValue({gstregistrationtypedesc:evt.options[evt.options.selectedIndex].text});
}
gstinnumberonChange(evt:any){
let e=evt.value;
}
pannumberonChange(evt:any){
let e=evt.value;
}
trnnumberonChange(evt:any){
let e=evt.value;
}
tanonChange(evt:any){
let e=evt.value;
}
cstonChange(evt:any){
let e=evt.value;
}
salestaxonChange(evt:any){
let e=evt.value;
}
servicetaxonChange(evt:any){
let e=evt.value;
}
tinonChange(evt:any){
let e=evt.value;
}
localtaxonChange(evt:any){
let e=evt.value;
}
accountstartdateonChange(evt:any){
let e=evt.value;
}
numberofusersonChange(evt:any){
let e=evt.value;
}
starttimeonChange(evt:any){
let e=evt.value;
}
endtimeonChange(evt:any){
let e=evt.value;
}
weekoff1onChange(evt:any){
let e=this.f.weekoff1.value as any;
this.bocompanymasterForm.patchValue({weekoff1desc:evt.options[evt.options.selectedIndex].text});
}
weekoff2onChange(evt:any){
let e=this.f.weekoff2.value as any;
this.bocompanymasterForm.patchValue({weekoff2desc:evt.options[evt.options.selectedIndex].text});
}
facebookaccountnameonChange(evt:any){
let e=evt.value;
}
facebookaccounturlonChange(evt:any){
let e=evt.value;
}
twitteraccountnameonChange(evt:any){
let e=evt.value;
}
twitteraccounturlonChange(evt:any){
let e=evt.value;
}
linkedinaccountnameonChange(evt:any){
let e=evt.value;
}
linkedinaccounturlonChange(evt:any){
let e=evt.value;
}
instagramaccountnameonChange(evt:any){
let e=evt.value;
}
instagramaccounturlonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
erponChange(evt:any){
let e=evt.value;
}
camsonChange(evt:any){
let e=evt.value;
}
crmonChange(evt:any){
let e=evt.value;
}
procurementonChange(evt:any){
let e=evt.value;
}
legalonChange(evt:any){
let e=evt.value;
}
hrmsonChange(evt:any){
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
  


editbocompanymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.bocompanymasterservice.getbocompanymastersByEID(pkcol).then(res => {

this.bocompanymasterservice.formData=res.bocompanymaster;
let formproperty=res.bocompanymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.bocompanymaster.pkcol;
this.formid=res.bocompanymaster.companyid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bocompanymaster.companyid;
var starttimeTime=new Time( res.bocompanymaster.starttime);
var endtimeTime=new Time( res.bocompanymaster.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bocompanymasterForm.patchValue({
companyid: res.bocompanymaster.companyid,
code: res.bocompanymaster.code,
companyname: res.bocompanymaster.companyname,
registrationnumber: res.bocompanymaster.registrationnumber,
companytype: res.bocompanymaster.companytype,
companytypedesc: res.bocompanymaster.companytypedesc,
companylogo: res.bocompanymaster.companylogo,
letterhead: res.bocompanymaster.letterhead,
incorporationdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.incorporationdate),
businesssegment: res.bocompanymaster.businesssegment,
businesssegmentdesc: res.bocompanymaster.businesssegmentdesc,
details: res.bocompanymaster.details,
services: res.bocompanymaster.services,
brandname: res.bocompanymaster.brandname,
mailingemailaddress: res.bocompanymaster.mailingemailaddress,
mailingsendername: res.bocompanymaster.mailingsendername,
localization: res.bocompanymaster.localization,
localizationdesc: res.bocompanymaster.localizationdesc,
timezone: res.bocompanymaster.timezone,
timezonedesc: res.bocompanymaster.timezonedesc,
pointvalue: res.bocompanymaster.pointvalue,
financialstrength: res.bocompanymaster.financialstrength,
reputation: res.bocompanymaster.reputation,
socialresponsibility: res.bocompanymaster.socialresponsibility,
environmentalpolicy: res.bocompanymaster.environmentalpolicy,
website: res.bocompanymaster.website,
phone: res.bocompanymaster.phone,
email: res.bocompanymaster.email,
address1: res.bocompanymaster.address1,
address2: res.bocompanymaster.address2,
countryid: res.bocompanymaster.countryid,
countryiddesc: res.bocompanymaster.countryiddesc,
stateid: res.bocompanymaster.stateid,
stateiddesc: res.bocompanymaster.stateiddesc,
cityid: res.bocompanymaster.cityid,
cityiddesc: res.bocompanymaster.cityiddesc,
locationid: res.bocompanymaster.locationid,
locationiddesc: res.bocompanymaster.locationiddesc,
pincode: res.bocompanymaster.pincode,
startdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.startdate),
enddate: this.ngbDateParserFormatter.parse(res.bocompanymaster.enddate),
bankid: res.bocompanymaster.bankid,
chartofaccounts: res.bocompanymaster.chartofaccounts,
shippingaddress1: res.bocompanymaster.shippingaddress1,
shippingaddress2: res.bocompanymaster.shippingaddress2,
shippingcountryid: res.bocompanymaster.shippingcountryid,
shippingcountryiddesc: res.bocompanymaster.shippingcountryiddesc,
shippingstateid: res.bocompanymaster.shippingstateid,
shippingstateiddesc: res.bocompanymaster.shippingstateiddesc,
shippingcityid: res.bocompanymaster.shippingcityid,
shippingcityiddesc: res.bocompanymaster.shippingcityiddesc,
shippingpincode: res.bocompanymaster.shippingpincode,
contactname: res.bocompanymaster.contactname,
designation: res.bocompanymaster.designation,
designationdesc: res.bocompanymaster.designationdesc,
cpphone: res.bocompanymaster.cpphone,
cpemail: res.bocompanymaster.cpemail,
basecurrency: res.bocompanymaster.basecurrency,
basecurrencydesc: res.bocompanymaster.basecurrencydesc,
gstregistrationtype: res.bocompanymaster.gstregistrationtype,
gstregistrationtypedesc: res.bocompanymaster.gstregistrationtypedesc,
gstinnumber: res.bocompanymaster.gstinnumber,
pannumber: res.bocompanymaster.pannumber,
trnnumber: res.bocompanymaster.trnnumber,
tan: res.bocompanymaster.tan,
cst: res.bocompanymaster.cst,
salestax: res.bocompanymaster.salestax,
servicetax: res.bocompanymaster.servicetax,
tin: res.bocompanymaster.tin,
localtax: res.bocompanymaster.localtax,
accountstartdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.accountstartdate),
numberofusers: res.bocompanymaster.numberofusers,
starttime: starttimeTime,
endtime: endtimeTime,
weekoff1: res.bocompanymaster.weekoff1,
weekoff1desc: res.bocompanymaster.weekoff1desc,
weekoff2: res.bocompanymaster.weekoff2,
weekoff2desc: res.bocompanymaster.weekoff2desc,
facebookaccountname: res.bocompanymaster.facebookaccountname,
facebookaccounturl: res.bocompanymaster.facebookaccounturl,
twitteraccountname: res.bocompanymaster.twitteraccountname,
twitteraccounturl: res.bocompanymaster.twitteraccounturl,
linkedinaccountname: res.bocompanymaster.linkedinaccountname,
linkedinaccounturl: res.bocompanymaster.linkedinaccounturl,
instagramaccountname: res.bocompanymaster.instagramaccountname,
instagramaccounturl: res.bocompanymaster.instagramaccounturl,
customfield: res.bocompanymaster.customfield,
attachment: JSON.parse(res.bocompanymaster.attachment),
erp: res.bocompanymaster.erp,
cams: res.bocompanymaster.cams,
crm: res.bocompanymaster.crm,
procurement: res.bocompanymaster.procurement,
legal: res.bocompanymaster.legal,
hrms: res.bocompanymaster.hrms,
status: res.bocompanymaster.status,
statusdesc: res.bocompanymaster.statusdesc,
});
this.bocompanyholidaysvisiblelist=res.bocompanyholidaysvisiblelist;
this.bofinancialyearsvisiblelist=res.bofinancialyearsvisiblelist;
if(this.bocompanymasterForm.get('customfield').value!=null && this.bocompanymasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bocompanymasterForm.get('customfield').value);
this.FillCustomField();
if(this.bocompanymasterForm.get('attachment').value!=null && this.bocompanymasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.bocompanymasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.cityid.value && this.f.cityid.value!="" && this.f.cityid.value!=null)this.bolocationservice.getListBycityid(this.f.cityid.value).then(res =>{
this.locationidList = res as bolocation[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.bocompanymasterservice.bocompanyholidays = res.bocompanyholidays;
this.SetbocompanyholidaysTableConfig();
this.bocompanyholidaysLoadTable();
  setTimeout(() => {
  this.SetbocompanyholidaysTableddConfig();
  });
this.bocompanymasterservice.bofinancialyears = res.bofinancialyears;
this.SetbofinancialyearsTableConfig();
this.bofinancialyearsLoadTable();
  setTimeout(() => {
  this.SetbofinancialyearsTableddConfig();
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
  for (let key in this.bocompanymasterForm.controls) {
    if (this.bocompanymasterForm.controls[key] != null) {
if(false)
{
if(this.bocompanymasterservice.formData!=null && this.bocompanymasterservice.formData[key]!=null  && this.bocompanymasterservice.formData[key]!='[]' && this.bocompanymasterservice.formData[key]!=undefined && this.bocompanymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.bocompanymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.bocompanymasterservice.formData!=null && this.bocompanymasterservice.formData[key]!=null   && this.bocompanymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.bocompanymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.bocompanymasterservice.formData!=null && this.bocompanymasterservice.formData[key]!=null   && this.bocompanymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.bocompanymasterservice.formData[key]+"'><div class='progress__number'>"+this.bocompanymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bocompanymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bocompanymasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bocompanymasterForm.value;
obj.incorporationdate=new Date(this.bocompanymasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('incorporationdate').value)+'  UTC' :null);
obj.startdate=new Date(this.bocompanymasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.bocompanymasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('enddate').value)+'  UTC' :null);
obj.accountstartdate=new Date(this.bocompanymasterForm.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('accountstartdate').value)+'  UTC' :null);
obj.starttime=(this.bocompanymasterForm.get('starttime').value==null?0:this.bocompanymasterForm.get('starttime').value.hour)+':'+(this.bocompanymasterForm.get('starttime').value==null?0:this.bocompanymasterForm.get('starttime').value.minute+":00");
obj.endtime=(this.bocompanymasterForm.get('endtime').value==null?0:this.bocompanymasterForm.get('endtime').value.hour)+':'+(this.bocompanymasterForm.get('endtime').value==null?0:this.bocompanymasterForm.get('endtime').value.minute+":00");
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

private bocompanymastertoggleOption(){
this.bocompanymastershowOption = this.bocompanymastershowOption === true ? false : true;
}

private bocompanyholidaytoggleOption(){
this.bocompanyholidayshowOption = this.bocompanyholidayshowOption === true ? false : true;
}

private bofinancialyeartoggleOption(){
this.bofinancialyearshowOption = this.bofinancialyearshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bocompanymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bocompanymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bocompanymasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bocompanymasterservice.formData=this.bocompanymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bocompanymasterForm.controls[key] != null)
    {
        this.bocompanymasterservice.formData[key] = this.bocompanymasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bocompanymasterservice.formData.incorporationdate=new Date(this.bocompanymasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('incorporationdate').value)+'  UTC' :null);
this.bocompanymasterservice.formData.startdate=new Date(this.bocompanymasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('startdate').value)+'  UTC' :null);
this.bocompanymasterservice.formData.enddate=new Date(this.bocompanymasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('enddate').value)+'  UTC' :null);
this.bocompanymasterservice.formData.accountstartdate=new Date(this.bocompanymasterForm.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymasterForm.get('accountstartdate').value)+'  UTC' :null);
this.bocompanymasterservice.formData.starttime=(this.bocompanymasterForm.get('starttime').value==null?0:this.bocompanymasterForm.get('starttime').value.hour)+':'+(this.bocompanymasterForm.get('starttime').value==null?0:this.bocompanymasterForm.get('starttime').value.minute+":00");
this.bocompanymasterservice.formData.endtime=(this.bocompanymasterForm.get('endtime').value==null?0:this.bocompanymasterForm.get('endtime').value.hour)+':'+(this.bocompanymasterForm.get('endtime').value==null?0:this.bocompanymasterForm.get('endtime').value.minute+":00");
if(customfields!=null)this.bocompanymasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.bocompanymasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.bocompanymasterservice.formData.DeletedbocompanyholidayIDs = this.DeletedbocompanyholidayIDs;
this.bocompanymasterservice.formData.DeletedbofinancialyearIDs = this.DeletedbofinancialyearIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bocompanymasterservice.formData);
this.bocompanymasterservice.formData=this.bocompanymasterForm.value;
this.bocompanymasterservice.saveOrUpdatebocompanymasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bocompanyholidayssource.data)
{
    for (let i = 0; i < this.bocompanyholidayssource.data.length; i++)
    {
        if (this.bocompanyholidayssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bocompanyholidayssource.data[i].fileattachmentlist);
    }
}
if (this.bofinancialyearssource.data)
{
    for (let i = 0; i < this.bofinancialyearssource.data.length; i++)
    {
        if (this.bofinancialyearssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bofinancialyearssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bocompanymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bocompanymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bocompanymaster);
}
else
{
this.FillData(res);
}
}
this.bocompanymasterForm.markAsUntouched();
this.bocompanymasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.bocompanymasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.bocompanymasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.bocompanymasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bolocationComponent, 
{
data: {locationid:this.bocompanymasterForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshippingcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.bocompanymasterForm.get('shippingcountryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshippingstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.bocompanymasterForm.get('shippingstateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshippingcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.bocompanymasterForm.get('shippingcityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdesignation( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.bocompanymasterForm.get('designation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbocompanyholiday(event:any,holidayid:any, companyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bocompanyholidayComponent, 
{
data:  {  showview:false,save:false,event,holidayid, companyid,visiblelist:this.bocompanyholidaysvisiblelist,  hidelist:this.bocompanyholidayshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bocompanyholidayssource.add(res);
this.bocompanyholidayssource.refresh();
}
else
{
this.bocompanyholidayssource.update(event.data, res);
}
}
});
}

onDeletebocompanyholiday(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbocompanyholidayIDs += childID + ",";
this.bocompanymasterservice.bocompanyholidays.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditbofinancialyear(event:any,finyearid:any, companyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bofinancialyearComponent, 
{
data:  {  showview:false,save:false,event,finyearid, companyid,visiblelist:this.bofinancialyearsvisiblelist,  hidelist:this.bofinancialyearshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bofinancialyearssource.add(res);
this.bofinancialyearssource.refresh();
}
else
{
this.bofinancialyearssource.update(event.data, res);
}
}
});
}

onDeletebofinancialyear(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbofinancialyearIDs += childID + ",";
this.bocompanymasterservice.bofinancialyears.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bocompanyholidays
bocompanyholidayssettings:any;
bocompanyholidayssource: any;

showbocompanyholidaysCheckbox()
{
debugger;
if(this.tblbocompanyholidayssource.settings['selectMode']== 'multi')this.tblbocompanyholidayssource.settings['selectMode']= 'single';
else
this.tblbocompanyholidayssource.settings['selectMode']= 'multi';
this.tblbocompanyholidayssource.initGrid();
}
deletebocompanyholidaysAll()
{
this.tblbocompanyholidayssource.settings['selectMode'] = 'single';
}
showbocompanyholidaysFilter()
{
  setTimeout(() => {
  this.SetbocompanyholidaysTableddConfig();
  });
      if(this.tblbocompanyholidayssource.settings!=null)this.tblbocompanyholidayssource.settings['hideSubHeader'] =!this.tblbocompanyholidayssource.settings['hideSubHeader'];
this.tblbocompanyholidayssource.initGrid();
}
showbocompanyholidaysInActive()
{
}
enablebocompanyholidaysInActive()
{
}
async SetbocompanyholidaysTableddConfig()
{
if(!this.bfilterPopulatebocompanyholidays){
}
this.bfilterPopulatebocompanyholidays=true;
}
async bocompanyholidaysbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbocompanyholidaysTableConfig()
{
this.bocompanyholidayssettings = {
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
financialyearid: {
title: 'Financial Year',
type: 'number',
filter:true,
},
holidaydate: {
title: 'Holiday Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
holidayday: {
title: 'Holiday Day',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
var d = new Date(row["holidaydate"]);
              cell = +d.getDay() + 1;
              row["holidayday"]=cell;

}, 
},
reason: {
title: 'Reason',
type: '',
filter:true,
},
},
};
}
bocompanyholidaysLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocompanyholidaysID)>=0)
{
this.bocompanyholidayssource=new LocalDataSource();
this.bocompanyholidayssource.load(this.bocompanymasterservice.bocompanyholidays as  any as LocalDataSource);
this.bocompanyholidayssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bocompanyholidaysroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocompanymasterservice.bocompanyholidays.length == 0)
{
    this.tblbocompanyholidayssource.grid.createFormShown = true;
}
else
{
    let obj = new bocompanyholiday();
    this.bocompanymasterservice.bocompanyholidays.push(obj);
    this.bocompanyholidayssource.refresh();
    if ((this.bocompanymasterservice.bocompanyholidays.length / this.bocompanyholidayssource.getPaging().perPage).toFixed(0) + 1 != this.bocompanyholidayssource.getPaging().page)
    {
        this.bocompanyholidayssource.setPage((this.bocompanymasterservice.bocompanyholidays.length / this.bocompanyholidayssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbocompanyholidayssource.grid.edit(this.tblbocompanyholidayssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bocompanyholidayssource.data.indexOf(event.data);
this.onDeletebocompanyholiday(event,event.data.holidayid,((this.bocompanyholidayssource.getPaging().page-1) *this.bocompanyholidayssource.getPaging().perPage)+index);
this.bocompanyholidayssource.refresh();
break;
}
}

*/
bocompanyholidaysroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbocompanyholiday(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbocompanyholiday(event,event.data.holidayid,this.formid);
break;
case 'delete':
this.onDeletebocompanyholiday(event,event.data.holidayid,((this.bocompanyholidayssource.getPaging().page-1) *this.bocompanyholidayssource.getPaging().perPage)+event.index);
this.bocompanyholidayssource.refresh();
break;
}
}
bocompanyholidaysonDelete(obj) {
let holidayid=obj.data.holidayid;
if (confirm('Are you sure to delete this record ?')) {
this.bocompanymasterservice.deletebocompanymaster(holidayid).then(res=>
this.bocompanyholidaysLoadTable()
);
}
}
bocompanyholidaysPaging(val)
{
debugger;
this.bocompanyholidayssource.setPaging(1, val, true);
}

handlebocompanyholidaysGridSelected(event:any) {
this.bocompanyholidaysselectedindex=this.bocompanymasterservice.bocompanyholidays.findIndex(i => i.holidayid === event.data.holidayid);
}
IsbocompanyholidaysVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocompanyholidaysID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bocompanyholidays
//start of Grid Codes bofinancialyears
bofinancialyearssettings:any;
bofinancialyearssource: any;

showbofinancialyearsCheckbox()
{
debugger;
if(this.tblbofinancialyearssource.settings['selectMode']== 'multi')this.tblbofinancialyearssource.settings['selectMode']= 'single';
else
this.tblbofinancialyearssource.settings['selectMode']= 'multi';
this.tblbofinancialyearssource.initGrid();
}
deletebofinancialyearsAll()
{
this.tblbofinancialyearssource.settings['selectMode'] = 'single';
}
showbofinancialyearsFilter()
{
  setTimeout(() => {
  this.SetbofinancialyearsTableddConfig();
  });
      if(this.tblbofinancialyearssource.settings!=null)this.tblbofinancialyearssource.settings['hideSubHeader'] =!this.tblbofinancialyearssource.settings['hideSubHeader'];
this.tblbofinancialyearssource.initGrid();
}
showbofinancialyearsInActive()
{
}
enablebofinancialyearsInActive()
{
}
async SetbofinancialyearsTableddConfig()
{
if(!this.bfilterPopulatebofinancialyears){
}
this.bfilterPopulatebofinancialyears=true;
}
async bofinancialyearsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbofinancialyearsTableConfig()
{
this.bofinancialyearssettings = {
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
finyearname: {
title: 'Fin Year Name',
type: '',
filter:true,
},
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
currentyear: {
title: 'Current Year',
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
bofinancialyearsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofinancialyearsID)>=0)
{
this.bofinancialyearssource=new LocalDataSource();
this.bofinancialyearssource.load(this.bocompanymasterservice.bofinancialyears as  any as LocalDataSource);
this.bofinancialyearssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bofinancialyearsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocompanymasterservice.bofinancialyears.length == 0)
{
    this.tblbofinancialyearssource.grid.createFormShown = true;
}
else
{
    let obj = new bofinancialyear();
    this.bocompanymasterservice.bofinancialyears.push(obj);
    this.bofinancialyearssource.refresh();
    if ((this.bocompanymasterservice.bofinancialyears.length / this.bofinancialyearssource.getPaging().perPage).toFixed(0) + 1 != this.bofinancialyearssource.getPaging().page)
    {
        this.bofinancialyearssource.setPage((this.bocompanymasterservice.bofinancialyears.length / this.bofinancialyearssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbofinancialyearssource.grid.edit(this.tblbofinancialyearssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bofinancialyearssource.data.indexOf(event.data);
this.onDeletebofinancialyear(event,event.data.finyearid,((this.bofinancialyearssource.getPaging().page-1) *this.bofinancialyearssource.getPaging().perPage)+index);
this.bofinancialyearssource.refresh();
break;
}
}

*/
bofinancialyearsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbofinancialyear(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbofinancialyear(event,event.data.finyearid,this.formid);
break;
case 'delete':
this.onDeletebofinancialyear(event,event.data.finyearid,((this.bofinancialyearssource.getPaging().page-1) *this.bofinancialyearssource.getPaging().perPage)+event.index);
this.bofinancialyearssource.refresh();
break;
}
}
bofinancialyearsonDelete(obj) {
let finyearid=obj.data.finyearid;
if (confirm('Are you sure to delete this record ?')) {
this.bocompanymasterservice.deletebocompanymaster(finyearid).then(res=>
this.bofinancialyearsLoadTable()
);
}
}
bofinancialyearsPaging(val)
{
debugger;
this.bofinancialyearssource.setPaging(1, val, true);
}

handlebofinancialyearsGridSelected(event:any) {
this.bofinancialyearsselectedindex=this.bocompanymasterservice.bofinancialyears.findIndex(i => i.finyearid === event.data.finyearid);
}
IsbofinancialyearsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofinancialyearsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bofinancialyears

}



