import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
import { crmcustomermaster } from './../../../model/crmcustomermaster.model';
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
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { crmcustomeraccountmaster } from './../../../model/crmcustomeraccountmaster.model';
import { crmcustomeraccountmasterComponent } from './../../../pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.component';
//FK services
import { lmsproductmaster,IlmsproductmasterResponse } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterComponent } from './../../../pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { ltycustomerreward } from '../../../../../../n-tire-loyalty-app/src/app/model/ltycustomerreward.model';
import { ltycustomerrewardComponent } from '../../../../../../n-tire-loyalty-app/src/app/pages/forms/ltycustomerreward/ltycustomerreward.component';
//FK services
import { ecmcustomerbasket } from '../../../../../../n-tire-commerce-app/src/app/model/ecmcustomerbasket.model';
import { ecmcustomerbasketComponent } from '../../../../../../n-tire-commerce-app/src/app/pages/forms/ecmcustomerbasket/ecmcustomerbasket.component';
//FK services
import { erpproduct,IerpproductResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpproduct.model';
import { erpproductComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpproduct/erpproduct.component';
import { erpproductService } from '../../../../../../n-tire-procurement-app/src/app/service/erpproduct.service';
import { boauditevents } from '../../../../../../n-tire-bo-app/src/app/model/boauditevents.model';
import { boauditeventsComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boauditevents/boauditevents.component';
//FK services
import { crmcustomerkycmaster } from './../../../model/crmcustomerkycmaster.model';
import { crmcustomerkycmasterComponent } from './../../../pages/forms/crmcustomerkycmaster/crmcustomerkycmaster.component';
//FK services
import { ecmreview } from '../../../../../../n-tire-commerce-app/src/app/model/ecmreview.model';
import { ecmreviewComponent } from '../../../../../../n-tire-commerce-app/src/app/pages/forms/ecmreview/ecmreview.component';
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
selector: 'app-crmcustomermaster',
templateUrl: './crmcustomermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmcustomermasterComponent implements OnInit {
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
bfilterPopulatecrmcustomermasters:boolean=false;
datacrmcustomermastersbasebranchid3:any=[];
datacrmcustomermasterscustomertype3:any=[];
datacrmcustomermasterscustomergroup3:any=[];
datacrmcustomermasterscategoryid3:any=[];
datacrmcustomermasterssubcategoryid3:any=[];
datacrmcustomermastersterritory3:any=[];
datacrmcustomermasterscompanytype3:any=[];
datacrmcustomermastersbusinesssegment3:any=[];
datacrmcustomermastersgender3:any=[];
datacrmcustomermastersrelationshipmanager3:any=[];
datacrmcustomermastersbillingcurrency3:any=[];
datacrmcustomermastersgstregistrationtype3:any=[];
datacrmcustomermastersallocationmethod3:any=[];
datacrmcustomeraccountmastersproductid3:any=[];
datacrmcustomeraccountmasterscustomerid3:any=[];
datacrmcustomeraccountmasterscustomerholding3:any=[];
datacrmcustomeraccountmastersholdingtype3:any=[];
bfilterPopulatecrmcustomeraccountmasters:boolean=false;
dataltycustomerrewardscustomerid3:any=[];
bfilterPopulateltycustomerrewards:boolean=false;
dataecmcustomerbasketscustomerid3:any=[];
dataecmcustomerbasketsproductid3:any=[];
bfilterPopulateecmcustomerbaskets:boolean=false;
bfilterPopulateboauditevents:boolean=false;
datacrmcustomerkycmastersidentityname3:any=[];
datacrmcustomerkycmasterscustomerid3:any=[];
bfilterPopulatecrmcustomerkycmasters:boolean=false;
dataecmreviewsproductid3:any=[];
dataecmreviewsreviewstatus3:any=[];
dataecmreviewscustomerid3:any=[];
bfilterPopulateecmreviews:boolean=false;
@ViewChild('tblcrmcustomeraccountmasterssource',{static:false}) tblcrmcustomeraccountmasterssource: Ng2SmartTableComponent;
@ViewChild('tblltycustomerrewardssource',{static:false}) tblltycustomerrewardssource: Ng2SmartTableComponent;
@ViewChild('tblecmcustomerbasketssource',{static:false}) tblecmcustomerbasketssource: Ng2SmartTableComponent;
@ViewChild('tblboauditeventssource',{static:false}) tblboauditeventssource: Ng2SmartTableComponent;
@ViewChild('tblcrmcustomerkycmasterssource',{static:false}) tblcrmcustomerkycmasterssource: Ng2SmartTableComponent;
@ViewChild('tblecmreviewssource',{static:false}) tblecmreviewssource: Ng2SmartTableComponent;
 crmcustomermasterForm: FormGroup;
basebranchidList: bobranchmaster[];
basebranchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
basebranchid_bobranchmastersForm: FormGroup;//autocomplete
basebranchid_bobranchmastersoptions:any;//autocomplete
basebranchid_bobranchmastersformatter:any;//autocomplete
customertypeList: boconfigvalue[];
customergroupList: boconfigvalue[];
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
territoryList: bomasterdata[];
companytypeList: boconfigvalue[];
businesssegmentList: boconfigvalue[];
genderList: boconfigvalue[];
relationshipmanagerList: bousermaster[];
relationshipmanageroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
relationshipmanager_bousermastersForm: FormGroup;//autocomplete
relationshipmanager_bousermastersoptions:any;//autocomplete
relationshipmanager_bousermastersformatter:any;//autocomplete
billingcurrencyList: boconfigvalue[];
gstregistrationtypeList: boconfigvalue[];
allocationmethodList: boconfigvalue[];
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
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
@ViewChild('companylogo',{static:false}) companylogo: AttachmentComponent;
SESSIONUSERID:any;//current user
crmcustomermastershowOption:boolean;
crmcustomeraccountmastershowOption:boolean;
ltycustomerrewardshowOption:boolean;
ecmcustomerbasketshowOption:boolean;
boauditeventsshowOption:boolean;
crmcustomerkycmastershowOption:boolean;
ecmreviewshowOption:boolean;
sessiondata:any;
sourcekey:any;



crmcustomeraccountmastersvisiblelist:any;
crmcustomeraccountmastershidelist:any;
ltycustomerrewardsvisiblelist:any;
ltycustomerrewardshidelist:any;
ecmcustomerbasketsvisiblelist:any;
ecmcustomerbasketshidelist:any;
boauditeventsvisiblelist:any;
boauditeventshidelist:any;
crmcustomerkycmastersvisiblelist:any;
crmcustomerkycmastershidelist:any;
ecmreviewsvisiblelist:any;
ecmreviewshidelist:any;

DeletedcrmcustomeraccountmasterIDs: string="";
crmcustomeraccountmastersID: string = "1";
crmcustomeraccountmastersselectedindex:any;
DeletedltycustomerrewardIDs: string="";
ltycustomerrewardsID: string = "2";
ltycustomerrewardsselectedindex:any;
DeletedecmcustomerbasketIDs: string="";
ecmcustomerbasketsID: string = "3";
ecmcustomerbasketsselectedindex:any;
DeletedboauditeventsIDs: string="";
boauditeventsID: string = "4";
boauditeventsselectedindex:any;
DeletedcrmcustomerkycmasterIDs: string="";
crmcustomerkycmastersID: string = "5";
crmcustomerkycmastersselectedindex:any;
DeletedecmreviewIDs: string="";
ecmreviewsID: string = "6";
ecmreviewsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private crmcustomermasterservice: crmcustomermasterService,
private lmsproductmasterservice: lmsproductmasterService,
private erpproductservice: erpproductService,
private bomasterdataservice: bomasterdataService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bosubcategorymasterservice:bosubcategorymasterService,
private bousermasterservice:bousermasterService,
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
this.crmcustomermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
customerid: [null],
basebranchid: [null],
basebranchiddesc: [null],
customertype: [null],
customertypedesc: [null],
customergroup: [null],
customergroupdesc: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
territory: [null],
territorydesc: [null],
customercode: [null],
companyname: [null],
companytype: [null],
companytypedesc: [null],
incorporationdate: [null],
businesssegment: [null],
businesssegmentdesc: [null],
companylogo: [null],
thumbnail: [null],
website: [null],
mobilenumber: [null],
officephone: [null],
email: [null],
metatags: [null],
firstname: [null],
lastname: [null],
gender: [null],
genderdesc: [null],
dob: [null],
emailid: [null],
residencephone: [null],
relationshipmanager: [null],
relationshipmanagerdesc: [null],
address: [null],
shippingaddress: [null],
billingcurrency: [null],
billingcurrencydesc: [null],
openingbalance: [null],
asondate: [null],
creditdays: [null],
creditlimit: [null],
accountstartfrom: [null],
servicelevel: [null],
slastartdate: [null],
slaenddate: [null],
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
itfilings: [null],
lifetimevalue: [null],
averageordervalue: [null],
totalorders: [null],
totalordervalue: [null],
lastorderdate: [null],
lastordervalue: [null],
loyaltynumber: [null],
pointsearned: [null],
activepoints: [null],
usedpoints: [null],
expiredpoints: [null],
lockedpoints: [null],
blockedpoints: [null],
pointsearnedincurrency: [null],
activepointsincurrency: [null],
usedpointsincurrency: [null],
expiredpointsincurrency: [null],
lockedpointsincurrency: [null],
blockedpointsincurrency: [null],
allocationmethod: [null],
allocationmethoddesc: [null],
customfield: [null],
attachment: [null],
cifnumber: [null],
outstandingamt: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmcustomermasterForm.dirty && this.crmcustomermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.customerid && pkDetail) {
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
let crmcustomermasterid = null;

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
this.formid=crmcustomermasterid;
//this.sharedService.alert(crmcustomermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcrmcustomeraccountmastersTableConfig();
  setTimeout(() => {
  this.SetcrmcustomeraccountmastersTableddConfig();
  });

this.SetltycustomerrewardsTableConfig();
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });

this.SetecmcustomerbasketsTableConfig();
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });

this.SetboauditeventsTableConfig();
  setTimeout(() => {
  this.SetboauditeventsTableddConfig();
  });

this.SetcrmcustomerkycmastersTableConfig();
  setTimeout(() => {
  this.SetcrmcustomerkycmastersTableddConfig();
  });

this.SetecmreviewsTableConfig();
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.basebranchidList = res as bobranchmaster[];
if(this.crmcustomermasterservice.formData && this.crmcustomermasterservice.formData.basebranchid){
this.basebranchidoptionsEvent.emit(this.basebranchidList);
this.crmcustomermasterForm.patchValue({
    basebranchid: this.crmcustomermasterservice.formData.basebranchid,
    basebranchiddesc: this.crmcustomermasterservice.formData.basebranchiddesc,
});
}
{
let arrbasebranchid = this.basebranchidList.filter(v => v.branchid == this.crmcustomermasterForm.get('basebranchid').value);
let objbasebranchid;
if (arrbasebranchid.length > 0) objbasebranchid = arrbasebranchid[0];
if (objbasebranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.basebranchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.basebranchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.basebranchid_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("customertype").then(res => this.customertypeList = res as boconfigvalue[]);
this.configservice.getList("customergroup").then(res => this.customergroupList = res as boconfigvalue[]);
this.bomasterdataservice.getList("CG").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.crmcustomermasterservice.formData && this.crmcustomermasterservice.formData.subcategoryid){this.crmcustomermasterForm.patchValue({
    subcategoryid: this.crmcustomermasterservice.formData.subcategoryid,
    subcategoryiddesc: this.crmcustomermasterservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bomasterdataservice.getList("TER").then(res => {
this.territoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("companytype").then(res => this.companytypeList = res as boconfigvalue[]);
this.configservice.getList("businesssegment").then(res => this.businesssegmentList = res as boconfigvalue[]);
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.relationshipmanagerList = res as bousermaster[];
if(this.crmcustomermasterservice.formData && this.crmcustomermasterservice.formData.relationshipmanager){
this.relationshipmanageroptionsEvent.emit(this.relationshipmanagerList);
this.crmcustomermasterForm.patchValue({
    relationshipmanager: this.crmcustomermasterservice.formData.relationshipmanager,
    relationshipmanagerdesc: this.crmcustomermasterservice.formData.relationshipmanagerdesc,
});
}
{
let arrrelationshipmanager = this.relationshipmanagerList.filter(v => v.userid == this.crmcustomermasterForm.get('relationshipmanager').value);
let objrelationshipmanager;
if (arrrelationshipmanager.length > 0) objrelationshipmanager = arrrelationshipmanager[0];
if (objrelationshipmanager)
{
}
}
}
).catch((err) => {console.log(err);});
this.relationshipmanager_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.relationshipmanagerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.relationshipmanager_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("billingcurrency").then(res => this.billingcurrencyList = res as boconfigvalue[]);
this.configservice.getList("gstregistrationtype").then(res => this.gstregistrationtypeList = res as boconfigvalue[]);
this.configservice.getList("allocationmethod").then(res => this.allocationmethodList = res as boconfigvalue[]);

//autocomplete
    this.crmcustomermasterservice.getcrmcustomermastersList().then(res => {
      this.pkList = res as crmcustomermaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.lastname;

//setting the flag that the screen is not touched 
this.crmcustomermasterForm.markAsUntouched();
this.crmcustomermasterForm.markAsPristine();
}
onSelectedbasebranchid(basebranchidDetail: any) {
if (basebranchidDetail.branchid && basebranchidDetail) {
this.crmcustomermasterForm.patchValue({
basebranchid: basebranchidDetail.branchid,
basebranchiddesc: basebranchidDetail.branchname,

});

}
}

onSelectedrelationshipmanager(relationshipmanagerDetail: any) {
if (relationshipmanagerDetail.userid && relationshipmanagerDetail) {
this.crmcustomermasterForm.patchValue({
relationshipmanager: relationshipmanagerDetail.userid,
relationshipmanagerdesc: relationshipmanagerDetail.username,

});

}
}




  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getcompanylogo() {
    debugger;
    if (this.companylogo.getattachmentlist().length > 0) {
      let file = this.companylogo.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.crmcustomermasterForm != null)
this.crmcustomermasterForm.reset();
this.crmcustomermasterForm.patchValue({
basebranchid: this.sessiondata.branchid,
basebranchiddesc: this.sessiondata.branchiddesc,
relationshipmanager: this.sessiondata.userid,
relationshipmanagerdesc: this.sessiondata.username,
});
setTimeout(() => {
this.crmcustomermasterservice.crmcustomeraccountmasters=[];
this.crmcustomeraccountmastersLoadTable();
this.crmcustomermasterservice.ltycustomerrewards=[];
this.ltycustomerrewardsLoadTable();
this.crmcustomermasterservice.ecmcustomerbaskets=[];
this.ecmcustomerbasketsLoadTable();
this.crmcustomermasterservice.boauditevents=[];
this.boauditeventsLoadTable();
this.crmcustomermasterservice.crmcustomerkycmasters=[];
this.crmcustomerkycmastersLoadTable();
this.crmcustomermasterservice.ecmreviews=[];
this.ecmreviewsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let customerid = this.crmcustomermasterForm.get('customerid').value;
        if(customerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomermasterservice.deletecrmcustomermaster(customerid).then(res =>
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
    this.crmcustomermasterForm.patchValue({
        customerid: null
    });
    if(this.crmcustomermasterservice.formData.customerid!=null)this.crmcustomermasterservice.formData.customerid=null;
for (let i=0;i<this.crmcustomermasterservice.crmcustomeraccountmasters.length;i++) {
this.crmcustomermasterservice.crmcustomeraccountmasters[i].accountid=null;
}
for (let i=0;i<this.crmcustomermasterservice.ltycustomerrewards.length;i++) {
this.crmcustomermasterservice.ltycustomerrewards[i].customerrewardid=null;
}
for (let i=0;i<this.crmcustomermasterservice.ecmcustomerbaskets.length;i++) {
this.crmcustomermasterservice.ecmcustomerbaskets[i].customersbasketid=null;
}
for (let i=0;i<this.crmcustomermasterservice.boauditevents.length;i++) {
this.crmcustomermasterservice.boauditevents[i].auditeventid=null;
}
for (let i=0;i<this.crmcustomermasterservice.crmcustomerkycmasters.length;i++) {
this.crmcustomermasterservice.crmcustomerkycmasters[i].kycid=null;
}
for (let i=0;i<this.crmcustomermasterservice.ecmreviews.length;i++) {
this.crmcustomermasterservice.ecmreviews[i].reviewid=null;
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
this.crmcustomermasterForm.patchValue({"incorporationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metatags")
this.crmcustomermasterForm.patchValue({"metatags":  mainscreendata[key] } );
        else if(key=="dob")
this.crmcustomermasterForm.patchValue({"dob":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="address")
this.crmcustomermasterForm.patchValue({"address":  mainscreendata[key] } );
        else if(key=="shippingaddress")
this.crmcustomermasterForm.patchValue({"shippingaddress":  mainscreendata[key] } );
        else if(key=="asondate")
this.crmcustomermasterForm.patchValue({"asondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="accountstartfrom")
this.crmcustomermasterForm.patchValue({"accountstartfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="slastartdate")
this.crmcustomermasterForm.patchValue({"slastartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="slaenddate")
this.crmcustomermasterForm.patchValue({"slaenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastorderdate")
this.crmcustomermasterForm.patchValue({"lastorderdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.crmcustomermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmcustomermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmcustomermasterForm.controls[key]!=undefined)
{
this.crmcustomermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.crmcustomermasterservice.formData.lastname!=null )
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
customeridonChange(evt:any){
let e=evt.value;
}
basebranchidonChange(evt:any){
let e=evt.value;
}
customertypeonChange(evt:any){
let e=this.f.customertype.value as any;
this.crmcustomermasterForm.patchValue({customertypedesc:evt.options[evt.options.selectedIndex].text});
}
customergrouponChange(evt:any){
let e=this.f.customergroup.value as any;
this.crmcustomermasterForm.patchValue({customergroupdesc:evt.options[evt.options.selectedIndex].text});
}
categoryidonChange(evt:any){
let e=evt.value;
this.crmcustomermasterForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.crmcustomermasterForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
territoryonChange(evt:any){
let e=evt.value;
this.crmcustomermasterForm.patchValue({territorydesc:evt.options[evt.options.selectedIndex].text});
}
customercodeonChange(evt:any){
let e=evt.value;
}
companynameonChange(evt:any){
let e=evt.value;
}
companytypeonChange(evt:any){
let e=this.f.companytype.value as any;
this.crmcustomermasterForm.patchValue({companytypedesc:evt.options[evt.options.selectedIndex].text});
}
incorporationdateonChange(evt:any){
let e=evt.value;
}
businesssegmentonChange(evt:any){
let e=this.f.businesssegment.value as any;
this.crmcustomermasterForm.patchValue({businesssegmentdesc:evt.options[evt.options.selectedIndex].text});
}
companylogoonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
mobilenumberonChange(evt:any){
let e=evt.value;
}
officephoneonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
metatagsonChange(evt:any){
let e=evt.value;
}
firstnameonChange(evt:any){
let e=evt.value;
}
lastnameonChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.crmcustomermasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
dobonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
residencephoneonChange(evt:any){
let e=evt.value;
}
relationshipmanageronChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
let e=evt.value;
}
shippingaddressonChange(evt:any){
let e=evt.value;
}
billingcurrencyonChange(evt:any){
let e=this.f.billingcurrency.value as any;
this.crmcustomermasterForm.patchValue({billingcurrencydesc:evt.options[evt.options.selectedIndex].text});
}
openingbalanceonChange(evt:any){
let e=evt.value;
}
asondateonChange(evt:any){
let e=evt.value;
}
creditdaysonChange(evt:any){
let e=evt.value;
}
creditlimitonChange(evt:any){
let e=evt.value;
}
accountstartfromonChange(evt:any){
let e=evt.value;
}
servicelevelonChange(evt:any){
let e=evt.value;
}
slastartdateonChange(evt:any){
let e=evt.value;
}
slaenddateonChange(evt:any){
let e=evt.value;
}
gstregistrationtypeonChange(evt:any){
let e=this.f.gstregistrationtype.value as any;
this.crmcustomermasterForm.patchValue({gstregistrationtypedesc:evt.options[evt.options.selectedIndex].text});
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
itfilingsonChange(evt:any){
let e=evt.value;
}
lifetimevalueonChange(evt:any){
let e=evt.value;
}
averageordervalueonChange(evt:any){
let e=evt.value;
}
totalordersonChange(evt:any){
let e=evt.value;
}
totalordervalueonChange(evt:any){
let e=evt.value;
}
lastorderdateonChange(evt:any){
let e=evt.value;
}
lastordervalueonChange(evt:any){
let e=evt.value;
}
loyaltynumberonChange(evt:any){
let e=evt.value;
}
pointsearnedonChange(evt:any){
let e=evt.value;
}
activepointsonChange(evt:any){
let e=evt.value;
}
usedpointsonChange(evt:any){
let e=evt.value;
}
expiredpointsonChange(evt:any){
let e=evt.value;
}
lockedpointsonChange(evt:any){
let e=evt.value;
}
blockedpointsonChange(evt:any){
let e=evt.value;
}
pointsearnedincurrencyonChange(evt:any){
let e=evt.value;
}
activepointsincurrencyonChange(evt:any){
let e=evt.value;
}
usedpointsincurrencyonChange(evt:any){
let e=evt.value;
}
expiredpointsincurrencyonChange(evt:any){
let e=evt.value;
}
lockedpointsincurrencyonChange(evt:any){
let e=evt.value;
}
blockedpointsincurrencyonChange(evt:any){
let e=evt.value;
}
allocationmethodonChange(evt:any){
let e=this.f.allocationmethod.value as any;
this.crmcustomermasterForm.patchValue({allocationmethoddesc:evt.options[evt.options.selectedIndex].text});
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
cifnumberonChange(evt:any){
let e=evt.value;
}
outstandingamtonChange(evt:any){
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
  


editcrmcustomermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmcustomermasterservice.getcrmcustomermastersByEID(pkcol).then(res => {

this.crmcustomermasterservice.formData=res.crmcustomermaster;
let formproperty=res.crmcustomermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmcustomermaster.pkcol;
this.formid=res.crmcustomermaster.customerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmcustomermaster.customerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmcustomermasterForm.patchValue({
customerid: res.crmcustomermaster.customerid,
basebranchid: res.crmcustomermaster.basebranchid,
basebranchiddesc: res.crmcustomermaster.basebranchiddesc,
customertype: res.crmcustomermaster.customertype,
customertypedesc: res.crmcustomermaster.customertypedesc,
customergroup: res.crmcustomermaster.customergroup,
customergroupdesc: res.crmcustomermaster.customergroupdesc,
categoryid: res.crmcustomermaster.categoryid,
categoryiddesc: res.crmcustomermaster.categoryiddesc,
subcategoryid: res.crmcustomermaster.subcategoryid,
subcategoryiddesc: res.crmcustomermaster.subcategoryiddesc,
territory: res.crmcustomermaster.territory,
territorydesc: res.crmcustomermaster.territorydesc,
customercode: res.crmcustomermaster.customercode,
companyname: res.crmcustomermaster.companyname,
companytype: res.crmcustomermaster.companytype,
companytypedesc: res.crmcustomermaster.companytypedesc,
incorporationdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.incorporationdate),
businesssegment: res.crmcustomermaster.businesssegment,
businesssegmentdesc: res.crmcustomermaster.businesssegmentdesc,
companylogo: JSON.parse(res.crmcustomermaster.companylogo),
thumbnail: JSON.parse(res.crmcustomermaster.thumbnail),
website: res.crmcustomermaster.website,
mobilenumber: res.crmcustomermaster.mobilenumber,
officephone: res.crmcustomermaster.officephone,
email: res.crmcustomermaster.email,
metatags: JSON.parse(res.crmcustomermaster.metatags),
firstname: res.crmcustomermaster.firstname,
lastname: res.crmcustomermaster.lastname,
gender: res.crmcustomermaster.gender,
genderdesc: res.crmcustomermaster.genderdesc,
dob: this.ngbDateParserFormatter.parse(res.crmcustomermaster.dob),
emailid: res.crmcustomermaster.emailid,
residencephone: res.crmcustomermaster.residencephone,
relationshipmanager: res.crmcustomermaster.relationshipmanager,
relationshipmanagerdesc: res.crmcustomermaster.relationshipmanagerdesc,
address: JSON.parse(res.crmcustomermaster.address),
shippingaddress: JSON.parse(res.crmcustomermaster.shippingaddress),
billingcurrency: res.crmcustomermaster.billingcurrency,
billingcurrencydesc: res.crmcustomermaster.billingcurrencydesc,
openingbalance: res.crmcustomermaster.openingbalance,
asondate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.asondate),
creditdays: res.crmcustomermaster.creditdays,
creditlimit: res.crmcustomermaster.creditlimit,
accountstartfrom: this.ngbDateParserFormatter.parse(res.crmcustomermaster.accountstartfrom),
servicelevel: res.crmcustomermaster.servicelevel,
slastartdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slastartdate),
slaenddate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slaenddate),
gstregistrationtype: res.crmcustomermaster.gstregistrationtype,
gstregistrationtypedesc: res.crmcustomermaster.gstregistrationtypedesc,
gstinnumber: res.crmcustomermaster.gstinnumber,
pannumber: res.crmcustomermaster.pannumber,
trnnumber: res.crmcustomermaster.trnnumber,
tan: res.crmcustomermaster.tan,
cst: res.crmcustomermaster.cst,
salestax: res.crmcustomermaster.salestax,
servicetax: res.crmcustomermaster.servicetax,
tin: res.crmcustomermaster.tin,
localtax: res.crmcustomermaster.localtax,
itfilings: res.crmcustomermaster.itfilings,
lifetimevalue: res.crmcustomermaster.lifetimevalue,
averageordervalue: res.crmcustomermaster.averageordervalue,
totalorders: res.crmcustomermaster.totalorders,
totalordervalue: res.crmcustomermaster.totalordervalue,
lastorderdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.lastorderdate),
lastordervalue: res.crmcustomermaster.lastordervalue,
loyaltynumber: res.crmcustomermaster.loyaltynumber,
pointsearned: res.crmcustomermaster.pointsearned,
activepoints: res.crmcustomermaster.activepoints,
usedpoints: res.crmcustomermaster.usedpoints,
expiredpoints: res.crmcustomermaster.expiredpoints,
lockedpoints: res.crmcustomermaster.lockedpoints,
blockedpoints: res.crmcustomermaster.blockedpoints,
pointsearnedincurrency: res.crmcustomermaster.pointsearnedincurrency,
activepointsincurrency: res.crmcustomermaster.activepointsincurrency,
usedpointsincurrency: res.crmcustomermaster.usedpointsincurrency,
expiredpointsincurrency: res.crmcustomermaster.expiredpointsincurrency,
lockedpointsincurrency: res.crmcustomermaster.lockedpointsincurrency,
blockedpointsincurrency: res.crmcustomermaster.blockedpointsincurrency,
allocationmethod: res.crmcustomermaster.allocationmethod,
allocationmethoddesc: res.crmcustomermaster.allocationmethoddesc,
customfield: res.crmcustomermaster.customfield,
attachment: JSON.parse(res.crmcustomermaster.attachment),
cifnumber: res.crmcustomermaster.cifnumber,
outstandingamt: res.crmcustomermaster.outstandingamt,
status: res.crmcustomermaster.status,
statusdesc: res.crmcustomermaster.statusdesc,
});
this.crmcustomeraccountmastersvisiblelist=res.crmcustomeraccountmastersvisiblelist;
this.ltycustomerrewardsvisiblelist=res.ltycustomerrewardsvisiblelist;
this.ecmcustomerbasketsvisiblelist=res.ecmcustomerbasketsvisiblelist;
this.boauditeventsvisiblelist=res.boauditeventsvisiblelist;
this.crmcustomerkycmastersvisiblelist=res.crmcustomerkycmastersvisiblelist;
this.ecmreviewsvisiblelist=res.ecmreviewsvisiblelist;
if(this.crmcustomermasterForm.get('customfield').value!=null && this.crmcustomermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.crmcustomermasterForm.get('customfield').value);
this.FillCustomField();
if(this.crmcustomermasterForm.get('thumbnail').value!=null && this.crmcustomermasterForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.crmcustomermasterForm.get('thumbnail').value);
if(this.crmcustomermasterForm.get('companylogo').value!=null && this.crmcustomermasterForm.get('companylogo').value!="" && this.companylogo!=null && this.companylogo!=undefined)this.companylogo.setattachmentlist(this.crmcustomermasterForm.get('companylogo').value);
if(this.crmcustomermasterForm.get('attachment').value!=null && this.crmcustomermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.crmcustomermasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.crmcustomermasterservice.crmcustomeraccountmasters = res.crmcustomeraccountmasters;
this.SetcrmcustomeraccountmastersTableConfig();
this.crmcustomeraccountmastersLoadTable();
  setTimeout(() => {
  this.SetcrmcustomeraccountmastersTableddConfig();
  });
this.crmcustomermasterservice.ltycustomerrewards = res.ltycustomerrewards;
this.SetltycustomerrewardsTableConfig();
this.ltycustomerrewardsLoadTable();
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });
this.crmcustomermasterservice.ecmcustomerbaskets = res.ecmcustomerbaskets;
this.SetecmcustomerbasketsTableConfig();
this.ecmcustomerbasketsLoadTable();
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });
this.crmcustomermasterservice.boauditevents = res.boauditevents;
this.SetboauditeventsTableConfig();
this.boauditeventsLoadTable();
  setTimeout(() => {
  this.SetboauditeventsTableddConfig();
  });
this.crmcustomermasterservice.crmcustomerkycmasters = res.crmcustomerkycmasters;
this.SetcrmcustomerkycmastersTableConfig();
this.crmcustomerkycmastersLoadTable();
  setTimeout(() => {
  this.SetcrmcustomerkycmastersTableddConfig();
  });
this.crmcustomermasterservice.ecmreviews = res.ecmreviews;
this.SetecmreviewsTableConfig();
this.ecmreviewsLoadTable();
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
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
  for (let key in this.crmcustomermasterForm.controls) {
    if (this.crmcustomermasterForm.controls[key] != null) {
if( key=="thumbnail" ||  key=="companylogo")
{
if(this.crmcustomermasterservice.formData!=null && this.crmcustomermasterservice.formData[key]!=null  && this.crmcustomermasterservice.formData[key]!='[]' && this.crmcustomermasterservice.formData[key]!=undefined && this.crmcustomermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmcustomermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmcustomermasterservice.formData!=null && this.crmcustomermasterservice.formData[key]!=null   && this.crmcustomermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmcustomermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmcustomermasterservice.formData!=null && this.crmcustomermasterservice.formData[key]!=null   && this.crmcustomermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmcustomermasterservice.formData[key]+"'><div class='progress__number'>"+this.crmcustomermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmcustomermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.crmcustomermasterForm.value;
obj.incorporationdate=new Date(this.crmcustomermasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('incorporationdate').value)+'  UTC' :null);
obj.metatags=JSON.stringify(this.crmcustomermasterForm.get('metatags').value);
obj.dob=new Date(this.crmcustomermasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('dob').value)+'  UTC' :null);
obj.address=JSON.stringify(this.crmcustomermasterForm.get('address').value);
obj.shippingaddress=JSON.stringify(this.crmcustomermasterForm.get('shippingaddress').value);
obj.asondate=new Date(this.crmcustomermasterForm.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('asondate').value)+'  UTC' :null);
obj.accountstartfrom=new Date(this.crmcustomermasterForm.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('accountstartfrom').value)+'  UTC' :null);
obj.slastartdate=new Date(this.crmcustomermasterForm.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('slastartdate').value)+'  UTC' :null);
obj.slaenddate=new Date(this.crmcustomermasterForm.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('slaenddate').value)+'  UTC' :null);
obj.lastorderdate=new Date(this.crmcustomermasterForm.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('lastorderdate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
obj.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.companylogo.getAllFiles());
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

private crmcustomermastertoggleOption(){
this.crmcustomermastershowOption = this.crmcustomermastershowOption === true ? false : true;
}

private crmcustomeraccountmastertoggleOption(){
this.crmcustomeraccountmastershowOption = this.crmcustomeraccountmastershowOption === true ? false : true;
}

private ltycustomerrewardtoggleOption(){
this.ltycustomerrewardshowOption = this.ltycustomerrewardshowOption === true ? false : true;
}

private ecmcustomerbaskettoggleOption(){
this.ecmcustomerbasketshowOption = this.ecmcustomerbasketshowOption === true ? false : true;
}

private boauditeventstoggleOption(){
this.boauditeventsshowOption = this.boauditeventsshowOption === true ? false : true;
}

private crmcustomerkycmastertoggleOption(){
this.crmcustomerkycmastershowOption = this.crmcustomerkycmastershowOption === true ? false : true;
}

private ecmreviewtoggleOption(){
this.ecmreviewshowOption = this.ecmreviewshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmcustomermasterservice.formData=this.crmcustomermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomermasterForm.controls[key] != null)
    {
        this.crmcustomermasterservice.formData[key] = this.crmcustomermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.crmcustomermasterservice.formData.incorporationdate=new Date(this.crmcustomermasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('incorporationdate').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.metatags=JSON.stringify(this.crmcustomermasterForm.get('metatags').value);
this.crmcustomermasterservice.formData.dob=new Date(this.crmcustomermasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('dob').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.address=JSON.stringify(this.crmcustomermasterForm.get('address').value);
this.crmcustomermasterservice.formData.shippingaddress=JSON.stringify(this.crmcustomermasterForm.get('shippingaddress').value);
this.crmcustomermasterservice.formData.asondate=new Date(this.crmcustomermasterForm.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('asondate').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.accountstartfrom=new Date(this.crmcustomermasterForm.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('accountstartfrom').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.slastartdate=new Date(this.crmcustomermasterForm.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('slastartdate').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.slaenddate=new Date(this.crmcustomermasterForm.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('slaenddate').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.lastorderdate=new Date(this.crmcustomermasterForm.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermasterForm.get('lastorderdate').value)+'  UTC' :null);
this.crmcustomermasterservice.formData.customfield=JSON.stringify(customfields);
this.crmcustomermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.crmcustomermasterservice.formData.DeletedcrmcustomeraccountmasterIDs = this.DeletedcrmcustomeraccountmasterIDs;
this.crmcustomermasterservice.formData.DeletedltycustomerrewardIDs = this.DeletedltycustomerrewardIDs;
this.crmcustomermasterservice.formData.DeletedecmcustomerbasketIDs = this.DeletedecmcustomerbasketIDs;
this.crmcustomermasterservice.formData.DeletedboauditeventsIDs = this.DeletedboauditeventsIDs;
this.crmcustomermasterservice.formData.DeletedcrmcustomerkycmasterIDs = this.DeletedcrmcustomerkycmasterIDs;
this.crmcustomermasterservice.formData.DeletedecmreviewIDs = this.DeletedecmreviewIDs;
this.crmcustomermasterservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.crmcustomermasterservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.crmcustomermasterservice.formData);
this.crmcustomermasterservice.formData=this.crmcustomermasterForm.value;
this.crmcustomermasterservice.saveOrUpdatecrmcustomermasters().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.companylogo.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.crmcustomeraccountmasterssource.data)
{
    for (let i = 0; i < this.crmcustomeraccountmasterssource.data.length; i++)
    {
        if (this.crmcustomeraccountmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.crmcustomeraccountmasterssource.data[i].fileattachmentlist);
    }
}
if (this.ltycustomerrewardssource.data)
{
    for (let i = 0; i < this.ltycustomerrewardssource.data.length; i++)
    {
        if (this.ltycustomerrewardssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltycustomerrewardssource.data[i].fileattachmentlist);
    }
}
if (this.ecmcustomerbasketssource.data)
{
    for (let i = 0; i < this.ecmcustomerbasketssource.data.length; i++)
    {
        if (this.ecmcustomerbasketssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ecmcustomerbasketssource.data[i].fileattachmentlist);
    }
}
if (this.boauditeventssource.data)
{
    for (let i = 0; i < this.boauditeventssource.data.length; i++)
    {
        if (this.boauditeventssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boauditeventssource.data[i].fileattachmentlist);
    }
}
if (this.crmcustomerkycmasterssource.data)
{
    for (let i = 0; i < this.crmcustomerkycmasterssource.data.length; i++)
    {
        if (this.crmcustomerkycmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.crmcustomerkycmasterssource.data[i].fileattachmentlist);
    }
}
if (this.ecmreviewssource.data)
{
    for (let i = 0; i < this.ecmreviewssource.data.length; i++)
    {
        if (this.ecmreviewssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ecmreviewssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmcustomermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomermaster);
}
else
{
this.FillData(res);
}
}
this.crmcustomermasterForm.markAsUntouched();
this.crmcustomermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbasebranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.crmcustomermasterForm.get('basebranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.crmcustomermasterForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.crmcustomermasterForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditterritory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.crmcustomermasterForm.get('territory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrelationshipmanager( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.crmcustomermasterForm.get('relationshipmanager').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcrmcustomeraccountmaster(event:any,accountid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(crmcustomeraccountmasterComponent, 
{
data:  {  showview:false,save:false,event,accountid, customerid,visiblelist:this.crmcustomeraccountmastersvisiblelist,  hidelist:this.crmcustomeraccountmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.crmcustomeraccountmasterssource.add(res);
this.crmcustomeraccountmasterssource.refresh();
}
else
{
this.crmcustomeraccountmasterssource.update(event.data, res);
}
}
});
}

onDeletecrmcustomeraccountmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcrmcustomeraccountmasterIDs += childID + ",";
this.crmcustomermasterservice.crmcustomeraccountmasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditltycustomerreward(event:any,customerrewardid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ltycustomerrewardComponent, 
{
data:  {  showview:false,save:false,event,customerrewardid, customerid,visiblelist:this.ltycustomerrewardsvisiblelist,  hidelist:this.ltycustomerrewardshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ltycustomerrewardssource.add(res);
this.ltycustomerrewardssource.refresh();
}
else
{
this.ltycustomerrewardssource.update(event.data, res);
}
}
});
}

onDeleteltycustomerreward(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltycustomerrewardIDs += childID + ",";
this.crmcustomermasterservice.ltycustomerrewards.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditecmcustomerbasket(event:any,customersbasketid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ecmcustomerbasketComponent, 
{
data:  {  showview:false,save:false,event,customersbasketid, customerid,visiblelist:this.ecmcustomerbasketsvisiblelist,  hidelist:this.ecmcustomerbasketshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ecmcustomerbasketssource.add(res);
this.ecmcustomerbasketssource.refresh();
}
else
{
this.ecmcustomerbasketssource.update(event.data, res);
}
}
});
}

onDeleteecmcustomerbasket(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedecmcustomerbasketIDs += childID + ",";
this.crmcustomermasterservice.ecmcustomerbaskets.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboauditevents(event:any,auditeventid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boauditeventsComponent, 
{
data:  {  showview:false,save:false,event,auditeventid, customerid,visiblelist:this.boauditeventsvisiblelist,  hidelist:this.boauditeventshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boauditeventssource.add(res);
this.boauditeventssource.refresh();
}
else
{
this.boauditeventssource.update(event.data, res);
}
}
});
}

onDeleteboauditevents(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboauditeventsIDs += childID + ",";
this.crmcustomermasterservice.boauditevents.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcrmcustomerkycmaster(event:any,kycid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(crmcustomerkycmasterComponent, 
{
data:  {  showview:false,save:false,event,kycid, customerid,visiblelist:this.crmcustomerkycmastersvisiblelist,  hidelist:this.crmcustomerkycmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.crmcustomerkycmasterssource.add(res);
this.crmcustomerkycmasterssource.refresh();
}
else
{
this.crmcustomerkycmasterssource.update(event.data, res);
}
}
});
}

onDeletecrmcustomerkycmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcrmcustomerkycmasterIDs += childID + ",";
this.crmcustomermasterservice.crmcustomerkycmasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditecmreview(event:any,reviewid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ecmreviewComponent, 
{
data:  {  showview:false,save:false,event,reviewid, customerid,visiblelist:this.ecmreviewsvisiblelist,  hidelist:this.ecmreviewshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ecmreviewssource.add(res);
this.ecmreviewssource.refresh();
}
else
{
this.ecmreviewssource.update(event.data, res);
}
}
});
}

onDeleteecmreview(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedecmreviewIDs += childID + ",";
this.crmcustomermasterservice.ecmreviews.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes crmcustomeraccountmasters
crmcustomeraccountmasterssettings:any;
crmcustomeraccountmasterssource: any;

showcrmcustomeraccountmastersCheckbox()
{
debugger;
if(this.tblcrmcustomeraccountmasterssource.settings['selectMode']== 'multi')this.tblcrmcustomeraccountmasterssource.settings['selectMode']= 'single';
else
this.tblcrmcustomeraccountmasterssource.settings['selectMode']= 'multi';
this.tblcrmcustomeraccountmasterssource.initGrid();
}
deletecrmcustomeraccountmastersAll()
{
this.tblcrmcustomeraccountmasterssource.settings['selectMode'] = 'single';
}
showcrmcustomeraccountmastersFilter()
{
  setTimeout(() => {
  this.SetcrmcustomeraccountmastersTableddConfig();
  });
      if(this.tblcrmcustomeraccountmasterssource.settings!=null)this.tblcrmcustomeraccountmasterssource.settings['hideSubHeader'] =!this.tblcrmcustomeraccountmasterssource.settings['hideSubHeader'];
this.tblcrmcustomeraccountmasterssource.initGrid();
}
showcrmcustomeraccountmastersInActive()
{
}
enablecrmcustomeraccountmastersInActive()
{
}
async SetcrmcustomeraccountmastersTableddConfig()
{
if(!this.bfilterPopulatecrmcustomeraccountmasters){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccountmasterscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.datacrmcustomeraccountmasterscustomerid3.push(obj);
}
if((this.tblcrmcustomeraccountmasterssource.settings as any).columns['customerid'])
{
(this.tblcrmcustomeraccountmasterssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomeraccountmasterscustomerid3));
this.tblcrmcustomeraccountmasterssource.initGrid();
}
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccountmastersproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.datacrmcustomeraccountmastersproductid3.push(obj);
}
if((this.tblcrmcustomeraccountmasterssource.settings as any).columns['productid'])
{
(this.tblcrmcustomeraccountmasterssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomeraccountmastersproductid3));
this.tblcrmcustomeraccountmasterssource.initGrid();
}
});

this.configservice.getList("holdingtype").then(res=>
{
var dataholdingtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccountmastersholdingtype3.push(defaultobj);
for(let i=0; i<dataholdingtype2.length; i++){
var obj= { value: dataholdingtype2[i].configkey, title: dataholdingtype2[i].configtext};
this.datacrmcustomeraccountmastersholdingtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcrmcustomeraccountmasterssource.settings);
if(clone.columns['holdingtype']!=undefined)clone.columns['holdingtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccountmastersholdingtype3)), }, };
if(clone.columns['holdingtype']!=undefined)clone.columns['holdingtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccountmastersholdingtype3)), }, };
this.tblcrmcustomeraccountmasterssource.settings =  clone;
this.tblcrmcustomeraccountmasterssource.initGrid();
});

this.configservice.getList("customerholding").then(res=>
{
var datacustomerholding2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccountmasterscustomerholding3.push(defaultobj);
for(let i=0; i<datacustomerholding2.length; i++){
var obj= { value: datacustomerholding2[i].configkey, title: datacustomerholding2[i].configtext};
this.datacrmcustomeraccountmasterscustomerholding3.push(obj);
}
var clone = this.sharedService.clone(this.tblcrmcustomeraccountmasterssource.settings);
if(clone.columns['customerholding']!=undefined)clone.columns['customerholding'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccountmasterscustomerholding3)), }, };
if(clone.columns['customerholding']!=undefined)clone.columns['customerholding'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccountmasterscustomerholding3)), }, };
this.tblcrmcustomeraccountmasterssource.settings =  clone;
this.tblcrmcustomeraccountmasterssource.initGrid();
});
}
this.bfilterPopulatecrmcustomeraccountmasters=true;
}
async crmcustomeraccountmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcrmcustomeraccountmastersTableConfig()
{
this.crmcustomeraccountmasterssettings = {
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
cifnumber: {
title: 'C I F Number',
type: '',
filter:true,
},
accountnumber: {
title: 'Account Number',
type: '',
filter:true,
},
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomeraccountmastersproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
accountopendate: {
title: 'Account Open Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
holdingtype: {
title: 'Holding Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomeraccountmastersholdingtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
customerholding: {
title: 'Customer Holding',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomeraccountmasterscustomerholding3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
},
};
}
crmcustomeraccountmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmastersID)>=0)
{
this.crmcustomeraccountmasterssource=new LocalDataSource();
this.crmcustomeraccountmasterssource.load(this.crmcustomermasterservice.crmcustomeraccountmasters as  any as LocalDataSource);
this.crmcustomeraccountmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
crmcustomeraccountmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.crmcustomeraccountmasters.length == 0)
{
    this.tblcrmcustomeraccountmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new crmcustomeraccountmaster();
    this.crmcustomermasterservice.crmcustomeraccountmasters.push(obj);
    this.crmcustomeraccountmasterssource.refresh();
    if ((this.crmcustomermasterservice.crmcustomeraccountmasters.length / this.crmcustomeraccountmasterssource.getPaging().perPage).toFixed(0) + 1 != this.crmcustomeraccountmasterssource.getPaging().page)
    {
        this.crmcustomeraccountmasterssource.setPage((this.crmcustomermasterservice.crmcustomeraccountmasters.length / this.crmcustomeraccountmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcrmcustomeraccountmasterssource.grid.edit(this.tblcrmcustomeraccountmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.crmcustomeraccountmasterssource.data.indexOf(event.data);
this.onDeletecrmcustomeraccountmaster(event,event.data.accountid,((this.crmcustomeraccountmasterssource.getPaging().page-1) *this.crmcustomeraccountmasterssource.getPaging().perPage)+index);
this.crmcustomeraccountmasterssource.refresh();
break;
}
}

*/
crmcustomeraccountmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcrmcustomeraccountmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcrmcustomeraccountmaster(event,event.data.accountid,this.formid);
break;
case 'delete':
this.onDeletecrmcustomeraccountmaster(event,event.data.accountid,((this.crmcustomeraccountmasterssource.getPaging().page-1) *this.crmcustomeraccountmasterssource.getPaging().perPage)+event.index);
this.crmcustomeraccountmasterssource.refresh();
break;
}
}
crmcustomeraccountmastersonDelete(obj) {
let accountid=obj.data.accountid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(accountid).then(res=>
this.crmcustomeraccountmastersLoadTable()
);
}
}
crmcustomeraccountmastersPaging(val)
{
debugger;
this.crmcustomeraccountmasterssource.setPaging(1, val, true);
}

handlecrmcustomeraccountmastersGridSelected(event:any) {
this.crmcustomeraccountmastersselectedindex=this.crmcustomermasterservice.crmcustomeraccountmasters.findIndex(i => i.accountid === event.data.accountid);
}
IscrmcustomeraccountmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes crmcustomeraccountmasters
//start of Grid Codes ltycustomerrewards
ltycustomerrewardssettings:any;
ltycustomerrewardssource: any;

showltycustomerrewardsCheckbox()
{
debugger;
if(this.tblltycustomerrewardssource.settings['selectMode']== 'multi')this.tblltycustomerrewardssource.settings['selectMode']= 'single';
else
this.tblltycustomerrewardssource.settings['selectMode']= 'multi';
this.tblltycustomerrewardssource.initGrid();
}
deleteltycustomerrewardsAll()
{
this.tblltycustomerrewardssource.settings['selectMode'] = 'single';
}
showltycustomerrewardsFilter()
{
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });
      if(this.tblltycustomerrewardssource.settings!=null)this.tblltycustomerrewardssource.settings['hideSubHeader'] =!this.tblltycustomerrewardssource.settings['hideSubHeader'];
this.tblltycustomerrewardssource.initGrid();
}
showltycustomerrewardsInActive()
{
}
enableltycustomerrewardsInActive()
{
}
async SetltycustomerrewardsTableddConfig()
{
if(!this.bfilterPopulateltycustomerrewards){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltycustomerrewardscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataltycustomerrewardscustomerid3.push(obj);
}
if((this.tblltycustomerrewardssource.settings as any).columns['customerid'])
{
(this.tblltycustomerrewardssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltycustomerrewardscustomerid3));
this.tblltycustomerrewardssource.initGrid();
}
});
}
this.bfilterPopulateltycustomerrewards=true;
}
async ltycustomerrewardsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltycustomerrewardsTableConfig()
{
this.ltycustomerrewardssettings = {
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
rewardid: {
title: 'Reward',
type: 'number',
filter:true,
},
rewarddate: {
title: 'Reward Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
rewardtype: {
title: 'Reward Type',
type: 'number',
filter:true,
},
rewardsubtype: {
title: 'Reward Sub Type',
type: 'number',
filter:true,
},
transactionnumber: {
title: 'Transaction Number',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
redeemed: {
title: 'Redeemed',
type: 'number',
filter:true,
},
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
},
};
}
ltycustomerrewardsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerrewardsID)>=0)
{
this.ltycustomerrewardssource=new LocalDataSource();
this.ltycustomerrewardssource.load(this.crmcustomermasterservice.ltycustomerrewards as  any as LocalDataSource);
this.ltycustomerrewardssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ltycustomerrewardsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.ltycustomerrewards.length == 0)
{
    this.tblltycustomerrewardssource.grid.createFormShown = true;
}
else
{
    let obj = new ltycustomerreward();
    this.crmcustomermasterservice.ltycustomerrewards.push(obj);
    this.ltycustomerrewardssource.refresh();
    if ((this.crmcustomermasterservice.ltycustomerrewards.length / this.ltycustomerrewardssource.getPaging().perPage).toFixed(0) + 1 != this.ltycustomerrewardssource.getPaging().page)
    {
        this.ltycustomerrewardssource.setPage((this.crmcustomermasterservice.ltycustomerrewards.length / this.ltycustomerrewardssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltycustomerrewardssource.grid.edit(this.tblltycustomerrewardssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltycustomerrewardssource.data.indexOf(event.data);
this.onDeleteltycustomerreward(event,event.data.customerrewardid,((this.ltycustomerrewardssource.getPaging().page-1) *this.ltycustomerrewardssource.getPaging().perPage)+index);
this.ltycustomerrewardssource.refresh();
break;
}
}

*/
ltycustomerrewardsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditltycustomerreward(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditltycustomerreward(event,event.data.customerrewardid,this.formid);
break;
case 'delete':
this.onDeleteltycustomerreward(event,event.data.customerrewardid,((this.ltycustomerrewardssource.getPaging().page-1) *this.ltycustomerrewardssource.getPaging().perPage)+event.index);
this.ltycustomerrewardssource.refresh();
break;
}
}
ltycustomerrewardsonDelete(obj) {
let customerrewardid=obj.data.customerrewardid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(customerrewardid).then(res=>
this.ltycustomerrewardsLoadTable()
);
}
}
ltycustomerrewardsPaging(val)
{
debugger;
this.ltycustomerrewardssource.setPaging(1, val, true);
}

handleltycustomerrewardsGridSelected(event:any) {
this.ltycustomerrewardsselectedindex=this.crmcustomermasterservice.ltycustomerrewards.findIndex(i => i.customerrewardid === event.data.customerrewardid);
}
IsltycustomerrewardsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerrewardsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltycustomerrewards
//start of Grid Codes ecmcustomerbaskets
ecmcustomerbasketssettings:any;
ecmcustomerbasketssource: any;

showecmcustomerbasketsCheckbox()
{
debugger;
if(this.tblecmcustomerbasketssource.settings['selectMode']== 'multi')this.tblecmcustomerbasketssource.settings['selectMode']= 'single';
else
this.tblecmcustomerbasketssource.settings['selectMode']= 'multi';
this.tblecmcustomerbasketssource.initGrid();
}
deleteecmcustomerbasketsAll()
{
this.tblecmcustomerbasketssource.settings['selectMode'] = 'single';
}
showecmcustomerbasketsFilter()
{
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });
      if(this.tblecmcustomerbasketssource.settings!=null)this.tblecmcustomerbasketssource.settings['hideSubHeader'] =!this.tblecmcustomerbasketssource.settings['hideSubHeader'];
this.tblecmcustomerbasketssource.initGrid();
}
showecmcustomerbasketsInActive()
{
}
enableecmcustomerbasketsInActive()
{
}
async SetecmcustomerbasketsTableddConfig()
{
if(!this.bfilterPopulateecmcustomerbaskets){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmcustomerbasketscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataecmcustomerbasketscustomerid3.push(obj);
}
if((this.tblecmcustomerbasketssource.settings as any).columns['customerid'])
{
(this.tblecmcustomerbasketssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmcustomerbasketscustomerid3));
this.tblecmcustomerbasketssource.initGrid();
}
});

this.erpproductservice.geterpproductsList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmcustomerbasketsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.dataecmcustomerbasketsproductid3.push(obj);
}
if((this.tblecmcustomerbasketssource.settings as any).columns['productid'])
{
(this.tblecmcustomerbasketssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmcustomerbasketsproductid3));
this.tblecmcustomerbasketssource.initGrid();
}
});
}
this.bfilterPopulateecmcustomerbaskets=true;
}
async ecmcustomerbasketsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetecmcustomerbasketsTableConfig()
{
this.ecmcustomerbasketssettings = {
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
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'',reportcode:'',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataecmcustomerbasketsproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
dateadded: {
title: 'Date Added',
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
ecmcustomerbasketsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmcustomerbasketsID)>=0)
{
this.ecmcustomerbasketssource=new LocalDataSource();
this.ecmcustomerbasketssource.load(this.crmcustomermasterservice.ecmcustomerbaskets as  any as LocalDataSource);
this.ecmcustomerbasketssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ecmcustomerbasketsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.ecmcustomerbaskets.length == 0)
{
    this.tblecmcustomerbasketssource.grid.createFormShown = true;
}
else
{
    let obj = new ecmcustomerbasket();
    this.crmcustomermasterservice.ecmcustomerbaskets.push(obj);
    this.ecmcustomerbasketssource.refresh();
    if ((this.crmcustomermasterservice.ecmcustomerbaskets.length / this.ecmcustomerbasketssource.getPaging().perPage).toFixed(0) + 1 != this.ecmcustomerbasketssource.getPaging().page)
    {
        this.ecmcustomerbasketssource.setPage((this.crmcustomermasterservice.ecmcustomerbaskets.length / this.ecmcustomerbasketssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblecmcustomerbasketssource.grid.edit(this.tblecmcustomerbasketssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ecmcustomerbasketssource.data.indexOf(event.data);
this.onDeleteecmcustomerbasket(event,event.data.customersbasketid,((this.ecmcustomerbasketssource.getPaging().page-1) *this.ecmcustomerbasketssource.getPaging().perPage)+index);
this.ecmcustomerbasketssource.refresh();
break;
}
}

*/
ecmcustomerbasketsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditecmcustomerbasket(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditecmcustomerbasket(event,event.data.customersbasketid,this.formid);
break;
case 'delete':
this.onDeleteecmcustomerbasket(event,event.data.customersbasketid,((this.ecmcustomerbasketssource.getPaging().page-1) *this.ecmcustomerbasketssource.getPaging().perPage)+event.index);
this.ecmcustomerbasketssource.refresh();
break;
}
}
ecmcustomerbasketsonDelete(obj) {
let customersbasketid=obj.data.customersbasketid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(customersbasketid).then(res=>
this.ecmcustomerbasketsLoadTable()
);
}
}
ecmcustomerbasketsPaging(val)
{
debugger;
this.ecmcustomerbasketssource.setPaging(1, val, true);
}

handleecmcustomerbasketsGridSelected(event:any) {
this.ecmcustomerbasketsselectedindex=this.crmcustomermasterservice.ecmcustomerbaskets.findIndex(i => i.customersbasketid === event.data.customersbasketid);
}
IsecmcustomerbasketsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmcustomerbasketsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ecmcustomerbaskets
//start of Grid Codes boauditevents
boauditeventssettings:any;
boauditeventssource: any;

showboauditeventsCheckbox()
{
debugger;
if(this.tblboauditeventssource.settings['selectMode']== 'multi')this.tblboauditeventssource.settings['selectMode']= 'single';
else
this.tblboauditeventssource.settings['selectMode']= 'multi';
this.tblboauditeventssource.initGrid();
}
deleteboauditeventsAll()
{
this.tblboauditeventssource.settings['selectMode'] = 'single';
}
showboauditeventsFilter()
{
  setTimeout(() => {
  this.SetboauditeventsTableddConfig();
  });
      if(this.tblboauditeventssource.settings!=null)this.tblboauditeventssource.settings['hideSubHeader'] =!this.tblboauditeventssource.settings['hideSubHeader'];
this.tblboauditeventssource.initGrid();
}
showboauditeventsInActive()
{
}
enableboauditeventsInActive()
{
}
async SetboauditeventsTableddConfig()
{
if(!this.bfilterPopulateboauditevents){
}
this.bfilterPopulateboauditevents=true;
}
async boauditeventsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboauditeventsTableConfig()
{
this.boauditeventssettings = {
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
eventdate: {
title: 'Event Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
boauditeventsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boauditeventsID)>=0)
{
this.boauditeventssource=new LocalDataSource();
this.boauditeventssource.load(this.crmcustomermasterservice.boauditevents as  any as LocalDataSource);
this.boauditeventssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boauditeventsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.boauditevents.length == 0)
{
    this.tblboauditeventssource.grid.createFormShown = true;
}
else
{
    let obj = new boauditevents();
    this.crmcustomermasterservice.boauditevents.push(obj);
    this.boauditeventssource.refresh();
    if ((this.crmcustomermasterservice.boauditevents.length / this.boauditeventssource.getPaging().perPage).toFixed(0) + 1 != this.boauditeventssource.getPaging().page)
    {
        this.boauditeventssource.setPage((this.crmcustomermasterservice.boauditevents.length / this.boauditeventssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboauditeventssource.grid.edit(this.tblboauditeventssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boauditeventssource.data.indexOf(event.data);
this.onDeleteboauditevents(event,event.data.auditeventid,((this.boauditeventssource.getPaging().page-1) *this.boauditeventssource.getPaging().perPage)+index);
this.boauditeventssource.refresh();
break;
}
}

*/
boauditeventsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboauditevents(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboauditevents(event,event.data.auditeventid,this.formid);
break;
case 'delete':
this.onDeleteboauditevents(event,event.data.auditeventid,((this.boauditeventssource.getPaging().page-1) *this.boauditeventssource.getPaging().perPage)+event.index);
this.boauditeventssource.refresh();
break;
}
}
boauditeventsonDelete(obj) {
let auditeventid=obj.data.auditeventid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(auditeventid).then(res=>
this.boauditeventsLoadTable()
);
}
}
boauditeventsPaging(val)
{
debugger;
this.boauditeventssource.setPaging(1, val, true);
}

handleboauditeventsGridSelected(event:any) {
this.boauditeventsselectedindex=this.crmcustomermasterservice.boauditevents.findIndex(i => i.auditeventid === event.data.auditeventid);
}
IsboauditeventsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boauditeventsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boauditevents
//start of Grid Codes crmcustomerkycmasters
crmcustomerkycmasterssettings:any;
crmcustomerkycmasterssource: any;

showcrmcustomerkycmastersCheckbox()
{
debugger;
if(this.tblcrmcustomerkycmasterssource.settings['selectMode']== 'multi')this.tblcrmcustomerkycmasterssource.settings['selectMode']= 'single';
else
this.tblcrmcustomerkycmasterssource.settings['selectMode']= 'multi';
this.tblcrmcustomerkycmasterssource.initGrid();
}
deletecrmcustomerkycmastersAll()
{
this.tblcrmcustomerkycmasterssource.settings['selectMode'] = 'single';
}
showcrmcustomerkycmastersFilter()
{
  setTimeout(() => {
  this.SetcrmcustomerkycmastersTableddConfig();
  });
      if(this.tblcrmcustomerkycmasterssource.settings!=null)this.tblcrmcustomerkycmasterssource.settings['hideSubHeader'] =!this.tblcrmcustomerkycmasterssource.settings['hideSubHeader'];
this.tblcrmcustomerkycmasterssource.initGrid();
}
showcrmcustomerkycmastersInActive()
{
}
enablecrmcustomerkycmastersInActive()
{
}
async SetcrmcustomerkycmastersTableddConfig()
{
if(!this.bfilterPopulatecrmcustomerkycmasters){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomerkycmasterscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.datacrmcustomerkycmasterscustomerid3.push(obj);
}
if((this.tblcrmcustomerkycmasterssource.settings as any).columns['customerid'])
{
(this.tblcrmcustomerkycmasterssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomerkycmasterscustomerid3));
this.tblcrmcustomerkycmasterssource.initGrid();
}
});

this.bomasterdataservice.getList("bg2su").then(res=>
{
var dataidentityname2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomerkycmastersidentityname3.push(defaultobj);
for(let i=0; i<dataidentityname2.length; i++){
var obj= { value: dataidentityname2[i].masterdataid, title:dataidentityname2[i].masterdatadescription};
this.datacrmcustomerkycmastersidentityname3.push(obj);
}
if((this.tblcrmcustomerkycmasterssource.settings as any).columns['identityname'])
{
(this.tblcrmcustomerkycmasterssource.settings as any).columns['identityname'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomerkycmastersidentityname3));
this.tblcrmcustomerkycmasterssource.initGrid();
}
});
}
this.bfilterPopulatecrmcustomerkycmasters=true;
}
async crmcustomerkycmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcrmcustomerkycmastersTableConfig()
{
this.crmcustomerkycmasterssettings = {
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
identityname: {
title: 'Identity Name',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomerkycmastersidentityname3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
identitynumber: {
title: 'Identity Number',
type: '',
filter:true,
},
issuedate: {
title: 'Issue Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expirydate: {
title: 'Expiry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
renewalrequired: {
title: 'Renewal Required',
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
},
};
}
crmcustomerkycmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomerkycmastersID)>=0)
{
this.crmcustomerkycmasterssource=new LocalDataSource();
this.crmcustomerkycmasterssource.load(this.crmcustomermasterservice.crmcustomerkycmasters as  any as LocalDataSource);
this.crmcustomerkycmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
crmcustomerkycmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.crmcustomerkycmasters.length == 0)
{
    this.tblcrmcustomerkycmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new crmcustomerkycmaster();
    this.crmcustomermasterservice.crmcustomerkycmasters.push(obj);
    this.crmcustomerkycmasterssource.refresh();
    if ((this.crmcustomermasterservice.crmcustomerkycmasters.length / this.crmcustomerkycmasterssource.getPaging().perPage).toFixed(0) + 1 != this.crmcustomerkycmasterssource.getPaging().page)
    {
        this.crmcustomerkycmasterssource.setPage((this.crmcustomermasterservice.crmcustomerkycmasters.length / this.crmcustomerkycmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcrmcustomerkycmasterssource.grid.edit(this.tblcrmcustomerkycmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.crmcustomerkycmasterssource.data.indexOf(event.data);
this.onDeletecrmcustomerkycmaster(event,event.data.kycid,((this.crmcustomerkycmasterssource.getPaging().page-1) *this.crmcustomerkycmasterssource.getPaging().perPage)+index);
this.crmcustomerkycmasterssource.refresh();
break;
}
}

*/
crmcustomerkycmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcrmcustomerkycmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcrmcustomerkycmaster(event,event.data.kycid,this.formid);
break;
case 'delete':
this.onDeletecrmcustomerkycmaster(event,event.data.kycid,((this.crmcustomerkycmasterssource.getPaging().page-1) *this.crmcustomerkycmasterssource.getPaging().perPage)+event.index);
this.crmcustomerkycmasterssource.refresh();
break;
}
}
crmcustomerkycmastersonDelete(obj) {
let kycid=obj.data.kycid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(kycid).then(res=>
this.crmcustomerkycmastersLoadTable()
);
}
}
crmcustomerkycmastersPaging(val)
{
debugger;
this.crmcustomerkycmasterssource.setPaging(1, val, true);
}

handlecrmcustomerkycmastersGridSelected(event:any) {
this.crmcustomerkycmastersselectedindex=this.crmcustomermasterservice.crmcustomerkycmasters.findIndex(i => i.kycid === event.data.kycid);
}
IscrmcustomerkycmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomerkycmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes crmcustomerkycmasters
//start of Grid Codes ecmreviews
ecmreviewssettings:any;
ecmreviewssource: any;

showecmreviewsCheckbox()
{
debugger;
if(this.tblecmreviewssource.settings['selectMode']== 'multi')this.tblecmreviewssource.settings['selectMode']= 'single';
else
this.tblecmreviewssource.settings['selectMode']= 'multi';
this.tblecmreviewssource.initGrid();
}
deleteecmreviewsAll()
{
this.tblecmreviewssource.settings['selectMode'] = 'single';
}
showecmreviewsFilter()
{
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
  });
      if(this.tblecmreviewssource.settings!=null)this.tblecmreviewssource.settings['hideSubHeader'] =!this.tblecmreviewssource.settings['hideSubHeader'];
this.tblecmreviewssource.initGrid();
}
showecmreviewsInActive()
{
}
enableecmreviewsInActive()
{
}
async SetecmreviewsTableddConfig()
{
if(!this.bfilterPopulateecmreviews){

this.erpproductservice.geterpproductsList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmreviewsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.dataecmreviewsproductid3.push(obj);
}
if((this.tblecmreviewssource.settings as any).columns['productid'])
{
(this.tblecmreviewssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmreviewsproductid3));
this.tblecmreviewssource.initGrid();
}
});

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmreviewscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataecmreviewscustomerid3.push(obj);
}
if((this.tblecmreviewssource.settings as any).columns['customerid'])
{
(this.tblecmreviewssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmreviewscustomerid3));
this.tblecmreviewssource.initGrid();
}
});

this.configservice.getList("reviewstatus").then(res=>
{
var datareviewstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmreviewsreviewstatus3.push(defaultobj);
for(let i=0; i<datareviewstatus2.length; i++){
var obj= { value: datareviewstatus2[i].configkey, title: datareviewstatus2[i].configtext};
this.dataecmreviewsreviewstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblecmreviewssource.settings);
if(clone.columns['reviewstatus']!=undefined)clone.columns['reviewstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataecmreviewsreviewstatus3)), }, };
if(clone.columns['reviewstatus']!=undefined)clone.columns['reviewstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataecmreviewsreviewstatus3)), }, };
this.tblecmreviewssource.settings =  clone;
this.tblecmreviewssource.initGrid();
});
}
this.bfilterPopulateecmreviews=true;
}
async ecmreviewsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetecmreviewsTableConfig()
{
this.ecmreviewssettings = {
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
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'cdsx8',reportcode:'cdsx8',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataecmreviewsproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reviewdate: {
title: 'Review Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reviewtext: {
title: 'Review Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
reviewstatus: {
title: 'Review Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataecmreviewsreviewstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reads: {
title: 'Reads',
type: 'number',
filter:true,
},
},
};
}
ecmreviewsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmreviewsID)>=0)
{
this.ecmreviewssource=new LocalDataSource();
this.ecmreviewssource.load(this.crmcustomermasterservice.ecmreviews as  any as LocalDataSource);
this.ecmreviewssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ecmreviewsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomermasterservice.ecmreviews.length == 0)
{
    this.tblecmreviewssource.grid.createFormShown = true;
}
else
{
    let obj = new ecmreview();
    this.crmcustomermasterservice.ecmreviews.push(obj);
    this.ecmreviewssource.refresh();
    if ((this.crmcustomermasterservice.ecmreviews.length / this.ecmreviewssource.getPaging().perPage).toFixed(0) + 1 != this.ecmreviewssource.getPaging().page)
    {
        this.ecmreviewssource.setPage((this.crmcustomermasterservice.ecmreviews.length / this.ecmreviewssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblecmreviewssource.grid.edit(this.tblecmreviewssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ecmreviewssource.data.indexOf(event.data);
this.onDeleteecmreview(event,event.data.reviewid,((this.ecmreviewssource.getPaging().page-1) *this.ecmreviewssource.getPaging().perPage)+index);
this.ecmreviewssource.refresh();
break;
}
}

*/
ecmreviewsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditecmreview(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditecmreview(event,event.data.reviewid,this.formid);
break;
case 'delete':
this.onDeleteecmreview(event,event.data.reviewid,((this.ecmreviewssource.getPaging().page-1) *this.ecmreviewssource.getPaging().perPage)+event.index);
this.ecmreviewssource.refresh();
break;
}
}
ecmreviewsonDelete(obj) {
let reviewid=obj.data.reviewid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomermasterservice.deletecrmcustomermaster(reviewid).then(res=>
this.ecmreviewsLoadTable()
);
}
}
ecmreviewsPaging(val)
{
debugger;
this.ecmreviewssource.setPaging(1, val, true);
}

handleecmreviewsGridSelected(event:any) {
this.ecmreviewsselectedindex=this.crmcustomermasterservice.ecmreviews.findIndex(i => i.reviewid === event.data.reviewid);
}
IsecmreviewsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmreviewsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ecmreviews

}



