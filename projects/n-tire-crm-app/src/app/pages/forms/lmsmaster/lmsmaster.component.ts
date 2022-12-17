import { lmsmasterService } from './../../../service/lmsmaster.service';
import { lmsmaster } from './../../../model/lmsmaster.model';
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
import { bouserbranchaccess} from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { lmscampaignmaster} from './../../../model/lmscampaignmaster.model';
import { lmscampaignmasterComponent } from './../../../pages/forms/lmscampaignmaster/lmscampaignmaster.component';
import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
//popups
//detail table services
import { lmsopportunity } from './../../../model/lmsopportunity.model';
import { lmsopportunityComponent } from './../../../pages/forms/lmsopportunity/lmsopportunity.component';
//FK services
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
import { lmscall } from './../../../model/lmscall.model';
import { lmscallComponent } from './../../../pages/forms/lmscall/lmscall.component';
//FK services
import { bobranchmaster,IbobranchmasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { lmscallService } from './../../../service/lmscall.service';
import { lmsproductmaster,IlmsproductmasterResponse } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterComponent } from './../../../pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmscorporatesecondarycontact } from './../../../model/lmscorporatesecondarycontact.model';
import { lmscorporatesecondarycontactComponent } from './../../../pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component';
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
selector: 'app-lmsmaster',
templateUrl: './lmsmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsmasterComponent implements OnInit {
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
bfilterPopulatelmsmasters:boolean=false;
datalmsmastersbranchid3:any=[];
datalmsmastersbranchlocationid3:any=[];
datalmsmastersiscorporate3:any=[];
datalmsmastersleadowner3:any=[];
datalmsmasterscompanytypeid3:any=[];
datalmsmasterscategoryid3:any=[];
datalmsmasterssubcategoryid3:any=[];
datalmsmastersgroupname3:any=[];
datalmsmasterssalutation3:any=[];
datalmsmastersdesignation3:any=[];
datalmsmastersleadtype3:any=[];
datalmsmastersleadsource3:any=[];
datalmsmasterscampaignid3:any=[];
datalmsmasterssegment3:any=[];
datalmsmastersbusinessvertical3:any=[];
datalmsmastersrevenue3:any=[];
datalmsmastersemployees3:any=[];
datalmsmasterslanguage3:any=[];
datalmsmasterspaymentterms3:any=[];
datalmsmastersleadstatus3:any=[];
datalmsopportunitiesnextstep3:any=[];
datalmsopportunitiesleadby3:any=[];
datalmsopportunitiescampaignid3:any=[];
datalmsopportunitiesopportunitystage3:any=[];
datalmsopportunitiesterritory3:any=[];
datalmsopportunitiespriority3:any=[];
datalmsopportunitiesstagesubcategory3:any=[];
datalmsopportunitiesreasonforloss3:any=[];
datalmsopportunitiesopportunitytype3:any=[];
datalmsopportunitiespossibilityofclosure3:any=[];
datalmsopportunitiesbudget3:any=[];
datalmsopportunitiesleadid3:any=[];
datalmsopportunitiesopportunityid3:any=[];
datalmsopportunitiesopportunitysize3:any=[];
datalmsopportunitiescriticality3:any=[];
datalmsopportunitiesleadsource3:any=[];
bfilterPopulatelmsopportunities:boolean=false;
datalmscallscurrentowner3:any=[];
datalmscallsbranchid3:any=[];
datalmscallsleadid3:any=[];
datalmscallsactivitytype3:any=[];
datalmscallsopportunityid3:any=[];
datalmscallscallid3:any=[];
datalmscallscampaignid3:any=[];
datalmscallsbranchlocationid3:any=[];
datalmscallsleadby3:any=[];
datalmscallsnextaction3:any=[];
datalmscallsactivityresponse3:any=[];
bfilterPopulatelmscalls:boolean=false;
datalmscorporatesecondarycontactsbranchid3:any=[];
datalmscorporatesecondarycontactscategory3:any=[];
datalmscorporatesecondarycontactsgroupname3:any=[];
datalmscorporatesecondarycontactsdesignation3:any=[];
bfilterPopulatelmscorporatesecondarycontacts:boolean=false;
@ViewChild('tbllmsopportunitiessource',{static:false}) tbllmsopportunitiessource: Ng2SmartTableComponent;
@ViewChild('tbllmscallssource',{static:false}) tbllmscallssource: Ng2SmartTableComponent;
@ViewChild('tbllmscorporatesecondarycontactssource',{static:false}) tbllmscorporatesecondarycontactssource: Ng2SmartTableComponent;
 lmsmasterForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
branchlocationidList: bobranchlocation[];
branchlocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchlocationid_bobranchlocationsForm: FormGroup;//autocomplete
branchlocationid_bobranchlocationsoptions:any;//autocomplete
branchlocationid_bobranchlocationsformatter:any;//autocomplete
iscorporateList: boconfigvalue[];
leadownerList: bousermaster[];
leadowneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leadowner_bousermastersForm: FormGroup;//autocomplete
leadowner_bousermastersoptions:any;//autocomplete
leadowner_bousermastersformatter:any;//autocomplete
companytypeidList: bomasterdata[];
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
groupnameList: boconfigvalue[];
salutationList: boconfigvalue[];
designationList: bouserrolemaster[];
leadtypeList: boconfigvalue[];
leadsourceList: boconfigvalue[];
campaignidList: lmscampaignmaster[];
segmentList: boconfigvalue[];
businessverticalList: boconfigvalue[];
revenueList: boconfigvalue[];
employeesList: boconfigvalue[];
languageList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
leadstatusList: boconfigvalue[];
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
@ViewChild('photo',{static:false}) photo: AttachmentComponent;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
lmsmastershowOption:boolean;
lmsopportunityshowOption:boolean;
lmscallshowOption:boolean;
lmscorporatesecondarycontactshowOption:boolean;
sessiondata:any;
sourcekey:any;

companynamevisible:boolean = false;
websitevisible:boolean = false;
secondarycontactsvisible:boolean = false;


lmsopportunitiesvisiblelist:any;
lmsopportunitieshidelist:any;
lmscallsvisiblelist:any;
lmscallshidelist:any;
lmscorporatesecondarycontactsvisiblelist:any;
lmscorporatesecondarycontactshidelist:any;

DeletedlmsopportunityIDs: string="";
lmsopportunitiesID: string = "1";
lmsopportunitiesselectedindex:any;
DeletedlmscallIDs: string="";
lmscallsID: string = "2";
lmscallsselectedindex:any;
DeletedlmscorporatesecondarycontactIDs: string="";
lmscorporatesecondarycontactsID: string = "3";
lmscorporatesecondarycontactsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmsmasterservice: lmsmasterService,
private bousermasterservice: bousermasterService,
private lmscampaignmasterservice: lmscampaignmasterService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private lmsopportunityservice: lmsopportunityService,
private bobranchmasterservice: bobranchmasterService,
private lmscallservice: lmscallService,
private lmsproductmasterservice: lmsproductmasterService,
private bobranchlocationservice: bobranchlocationService,
private bouserbranchaccessservice: bouserbranchaccessService,
private bouserrolemasterservice: bouserrolemasterService,
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
this.lmsmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
branchlocationid: [null],
branchlocationiddesc: [null],
leadid: [null],
iscorporate: [null],
iscorporatedesc: [null],
companyname: [null],
leadowner: [null],
leadownerdesc: [null],
firstname: [null, Validators.required],
lastname: [null, Validators.required],
emailid: [null, Validators.required],
companytypeid: [null],
companytypeiddesc: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
groupname: [null],
groupnamedesc: [null],
salutation: [null],
salutationdesc: [null],
designation: [null],
designationdesc: [null],
contactno: [null],
address: [null],
website: [null],
datecreated: [null],
leadtype: [null],
leadtypedesc: [null],
leadsource: [null],
leadsourcedesc: [null],
leaddate: [null],
nextcontactduedate: [null],
campaignid: [null],
campaigniddesc: [null],
rating: [null],
segment: [null],
segmentdesc: [null],
businessvertical: [null],
businessverticaldesc: [null],
revenue: [null],
revenuedesc: [null],
employees: [null],
employeesdesc: [null],
language: [null],
languagedesc: [null],
crosssellopportunity: [null],
successrate: [null],
businessvalue: [null],
subscribedemail: [null],
shippingaddress: [null],
billingaddress: [null],
photo: [null],
thumbnail: [null],
paymentterms: [null],
paymenttermsdesc: [null],
socialmedia: [null],
leadstatus: [null],
leadstatusdesc: [null],
notes: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsmasterForm.dirty && this.lmsmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
emailidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].leadid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Email value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.leadid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.leadid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.leadid && pkDetail) {
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
let lmsmasterid = null;

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
this.formid=lmsmasterid;
//this.sharedService.alert(lmsmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmsopportunitiesTableConfig();
  setTimeout(() => {
  this.SetlmsopportunitiesTableddConfig();
  });

this.SetlmscallsTableConfig();
  setTimeout(() => {
  this.SetlmscallsTableddConfig();
  });

this.SetlmscorporatesecondarycontactsTableConfig();
  setTimeout(() => {
  this.SetlmscorporatesecondarycontactsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.lmsmasterservice.formData && this.lmsmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.lmsmasterForm.patchValue({
    branchid: this.lmsmasterservice.formData.branchid,
    branchiddesc: this.lmsmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.lmsmasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bouserbranchaccessesformatter = (result: any) => result.branchname;
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
if(this.lmsmasterservice.formData && this.lmsmasterservice.formData.branchlocationid){this.lmsmasterForm.patchValue({
    branchlocationid: this.lmsmasterservice.formData.branchlocationid,
    branchlocationiddesc: this.lmsmasterservice.formData.branchlocationiddesc,
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
this.configservice.getList("bool").then(res => this.iscorporateList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.leadownerList = res as bousermaster[];
if(this.lmsmasterservice.formData && this.lmsmasterservice.formData.leadowner){
this.leadowneroptionsEvent.emit(this.leadownerList);
this.lmsmasterForm.patchValue({
    leadowner: this.lmsmasterservice.formData.leadowner,
    leadownerdesc: this.lmsmasterservice.formData.leadownerdesc,
});
}
{
let arrleadowner = this.leadownerList.filter(v => v.userid == this.lmsmasterForm.get('leadowner').value);
let objleadowner;
if (arrleadowner.length > 0) objleadowner = arrleadowner[0];
if (objleadowner)
{
}
}
}
).catch((err) => {console.log(err);});
this.leadowner_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.leadownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.leadowner_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("m7j9j").then(res => {
this.companytypeidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("enra5").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.lmsmasterservice.formData && this.lmsmasterservice.formData.subcategoryid){this.lmsmasterForm.patchValue({
    subcategoryid: this.lmsmasterservice.formData.subcategoryid,
    subcategoryiddesc: this.lmsmasterservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("companygroup").then(res => this.groupnameList = res as boconfigvalue[]);
this.configservice.getList("salutation").then(res => this.salutationList = res as boconfigvalue[]);
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.designationList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("leadtype").then(res => this.leadtypeList = res as boconfigvalue[]);
this.configservice.getList("leadsource").then(res => this.leadsourceList = res as boconfigvalue[]);
this.lmscampaignmasterservice.getlmscampaignmastersList().then(res => 
{
this.campaignidList = res as lmscampaignmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("segment").then(res => this.segmentList = res as boconfigvalue[]);
this.configservice.getList("businessvertical").then(res => this.businessverticalList = res as boconfigvalue[]);
this.configservice.getList("revenue").then(res => this.revenueList = res as boconfigvalue[]);
this.configservice.getList("employeesrange").then(res => this.employeesList = res as boconfigvalue[]);
this.configservice.getList("language").then(res => this.languageList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.configservice.getList("leadstatus").then(res => this.leadstatusList = res as boconfigvalue[]);

//autocomplete
    this.lmsmasterservice.getlmsmastersList().then(res => {
      this.pkList = res as lmsmaster[];
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
this.lmsmasterForm.markAsUntouched();
this.lmsmasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.lmsmasterForm.patchValue({
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
this.lmsmasterForm.patchValue({
branchlocationid: branchlocationidDetail.locationid,
branchlocationiddesc: branchlocationidDetail.locationname,

});

}
}

onSelectedleadowner(leadownerDetail: any) {
if (leadownerDetail.userid && leadownerDetail) {
this.lmsmasterForm.patchValue({
leadowner: leadownerDetail.userid,
leadownerdesc: leadownerDetail.username,

});

}
}




  getphoto() {
    debugger;
    if (this.photo.getattachmentlist().length > 0) {
      let file = this.photo.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.lmsmasterForm != null)
this.lmsmasterForm.reset();
this.lmsmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
leadowner: this.sessiondata.userid,
leadownerdesc: this.sessiondata.username,
});
this.lmsmasterForm.patchValue({
leadowner: this.sessiondata.userid,
datecreated: this.ngbDateParserFormatter.parse(new Date().toString()),
leaddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
nextcontactduedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.lmsmasterservice.lmsopportunities=[];
this.lmsopportunitiesLoadTable();
this.lmsmasterservice.lmscalls=[];
this.lmscallsLoadTable();
this.lmsmasterservice.lmscorporatesecondarycontacts=[];
this.lmscorporatesecondarycontactsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.companynamevisible = false;
this.websitevisible = false;
this.secondarycontactsvisible = false;
}

    onDelete() {
        let leadid = this.lmsmasterForm.get('leadid').value;
        if(leadid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsmasterservice.deletelmsmaster(leadid).then(res =>
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
    this.lmsmasterForm.patchValue({
        leadid: null
    });
    if(this.lmsmasterservice.formData.leadid!=null)this.lmsmasterservice.formData.leadid=null;
for (let i=0;i<this.lmsmasterservice.lmsopportunities.length;i++) {
this.lmsmasterservice.lmsopportunities[i].opportunityid=null;
}
for (let i=0;i<this.lmsmasterservice.lmscalls.length;i++) {
this.lmsmasterservice.lmscalls[i].callid=null;
}
for (let i=0;i<this.lmsmasterservice.lmscorporatesecondarycontacts.length;i++) {
this.lmsmasterservice.lmscorporatesecondarycontacts[i].secondarycontactid=null;
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
        else if(key=="datecreated")
this.lmsmasterForm.patchValue({"datecreated":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="leaddate")
this.lmsmasterForm.patchValue({"leaddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextcontactduedate")
this.lmsmasterForm.patchValue({"nextcontactduedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="shippingaddress")
this.lmsmasterForm.patchValue({"shippingaddress":  mainscreendata[key] } );
        else if(key=="billingaddress")
this.lmsmasterForm.patchValue({"billingaddress":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.lmsmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsmasterForm.controls[key]!=undefined)
{
this.lmsmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
leadidonChange(evt:any){
let e=evt.value;
}
iscorporateonChange(evt:any){
let e=this.f.iscorporate.value as any;
this.secondarycontactsvisible=false;
if(this.f.iscorporate.value == 'Y')this.secondarycontactsvisible=true;
this.lmsmasterForm.patchValue({iscorporatedesc:evt.options[evt.options.selectedIndex].text});
}
companynameonChange(evt:any){
let e=evt.value;
}
leadowneronChange(evt:any){
let e=evt.value;
}
firstnameonChange(evt:any){
let e=evt.value;
}
lastnameonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
companytypeidonChange(evt:any){
let e=evt.value;
this.lmsmasterForm.patchValue({companytypeiddesc:evt.options[evt.options.selectedIndex].text});
}
categoryidonChange(evt:any){
let e=evt.value;
this.lmsmasterForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.lmsmasterForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
groupnameonChange(evt:any){
let e=this.f.groupname.value as any;
this.lmsmasterForm.patchValue({groupnamedesc:evt.options[evt.options.selectedIndex].text});
}
salutationonChange(evt:any){
let e=this.f.salutation.value as any;
this.lmsmasterForm.patchValue({salutationdesc:evt.options[evt.options.selectedIndex].text});
}
designationonChange(evt:any){
let e=evt.value;
this.lmsmasterForm.patchValue({designationdesc:evt.options[evt.options.selectedIndex].text});
}
contactnoonChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
datecreatedonChange(evt:any){
let e=evt.value;
}
leadtypeonChange(evt:any){
let e=this.f.leadtype.value as any;
this.lmsmasterForm.patchValue({leadtypedesc:evt.options[evt.options.selectedIndex].text});
}
leadsourceonChange(evt:any){
let e=this.f.leadsource.value as any;
this.lmsmasterForm.patchValue({leadsourcedesc:evt.options[evt.options.selectedIndex].text});
}
leaddateonChange(evt:any){
let e=evt.value;
}
nextcontactduedateonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
this.lmsmasterForm.patchValue({campaigniddesc:evt.options[evt.options.selectedIndex].text});
}
ratingonChange(evt:any){
let e=evt.value;
}
segmentonChange(evt:any){
let e=this.f.segment.value as any;
this.lmsmasterForm.patchValue({segmentdesc:evt.options[evt.options.selectedIndex].text});
}
businessverticalonChange(evt:any){
let e=this.f.businessvertical.value as any;
this.lmsmasterForm.patchValue({businessverticaldesc:evt.options[evt.options.selectedIndex].text});
}
revenueonChange(evt:any){
let e=this.f.revenue.value as any;
this.lmsmasterForm.patchValue({revenuedesc:evt.options[evt.options.selectedIndex].text});
}
employeesonChange(evt:any){
let e=this.f.employees.value as any;
this.lmsmasterForm.patchValue({employeesdesc:evt.options[evt.options.selectedIndex].text});
}
languageonChange(evt:any){
let e=this.f.language.value as any;
this.lmsmasterForm.patchValue({languagedesc:evt.options[evt.options.selectedIndex].text});
}
crosssellopportunityonChange(evt:any){
let e=evt.value;
}
successrateonChange(evt:any){
let e=evt.value;
}
businessvalueonChange(evt:any){
let e=evt.value;
}
subscribedemailonChange(evt:any){
let e=evt.value;
}
shippingaddressonChange(evt:any){
let e=evt.value;
}
billingaddressonChange(evt:any){
let e=evt.value;
}
photoonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.lmsmasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
socialmediaonChange(evt:any){
let e=evt.value;
}
leadstatusonChange(evt:any){
let e=this.f.leadstatus.value as any;
this.lmsmasterForm.patchValue({leadstatusdesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
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
  


editlmsmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsmasterservice.getlmsmastersByEID(pkcol).then(res => {

this.lmsmasterservice.formData=res.lmsmaster;
let formproperty=res.lmsmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsmaster.pkcol;
this.formid=res.lmsmaster.leadid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsmaster.leadid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsmasterForm.patchValue({
branchid: res.lmsmaster.branchid,
branchiddesc: res.lmsmaster.branchiddesc,
branchlocationid: res.lmsmaster.branchlocationid,
branchlocationiddesc: res.lmsmaster.branchlocationiddesc,
leadid: res.lmsmaster.leadid,
iscorporate: res.lmsmaster.iscorporate,
iscorporatedesc: res.lmsmaster.iscorporatedesc,
companyname: res.lmsmaster.companyname,
leadowner: res.lmsmaster.leadowner,
leadownerdesc: res.lmsmaster.leadownerdesc,
firstname: res.lmsmaster.firstname,
lastname: res.lmsmaster.lastname,
emailid: res.lmsmaster.emailid,
companytypeid: res.lmsmaster.companytypeid,
companytypeiddesc: res.lmsmaster.companytypeiddesc,
categoryid: res.lmsmaster.categoryid,
categoryiddesc: res.lmsmaster.categoryiddesc,
subcategoryid: res.lmsmaster.subcategoryid,
subcategoryiddesc: res.lmsmaster.subcategoryiddesc,
groupname: res.lmsmaster.groupname,
groupnamedesc: res.lmsmaster.groupnamedesc,
salutation: res.lmsmaster.salutation,
salutationdesc: res.lmsmaster.salutationdesc,
designation: res.lmsmaster.designation,
designationdesc: res.lmsmaster.designationdesc,
contactno: res.lmsmaster.contactno,
address: res.lmsmaster.address,
website: res.lmsmaster.website,
datecreated: this.ngbDateParserFormatter.parse(res.lmsmaster.datecreated),
leadtype: res.lmsmaster.leadtype,
leadtypedesc: res.lmsmaster.leadtypedesc,
leadsource: res.lmsmaster.leadsource,
leadsourcedesc: res.lmsmaster.leadsourcedesc,
leaddate: this.ngbDateParserFormatter.parse(res.lmsmaster.leaddate),
nextcontactduedate: this.ngbDateParserFormatter.parse(res.lmsmaster.nextcontactduedate),
campaignid: res.lmsmaster.campaignid,
campaigniddesc: res.lmsmaster.campaigniddesc,
rating: res.lmsmaster.rating,
segment: res.lmsmaster.segment,
segmentdesc: res.lmsmaster.segmentdesc,
businessvertical: res.lmsmaster.businessvertical,
businessverticaldesc: res.lmsmaster.businessverticaldesc,
revenue: res.lmsmaster.revenue,
revenuedesc: res.lmsmaster.revenuedesc,
employees: res.lmsmaster.employees,
employeesdesc: res.lmsmaster.employeesdesc,
language: res.lmsmaster.language,
languagedesc: res.lmsmaster.languagedesc,
crosssellopportunity: res.lmsmaster.crosssellopportunity,
successrate: res.lmsmaster.successrate,
businessvalue: res.lmsmaster.businessvalue,
subscribedemail: res.lmsmaster.subscribedemail,
shippingaddress: JSON.parse(res.lmsmaster.shippingaddress),
billingaddress: JSON.parse(res.lmsmaster.billingaddress),
photo: JSON.parse(res.lmsmaster.photo),
thumbnail: JSON.parse(res.lmsmaster.thumbnail),
paymentterms: res.lmsmaster.paymentterms,
paymenttermsdesc: res.lmsmaster.paymenttermsdesc,
socialmedia: res.lmsmaster.socialmedia,
leadstatus: res.lmsmaster.leadstatus,
leadstatusdesc: res.lmsmaster.leadstatusdesc,
notes: res.lmsmaster.notes,
customfield: res.lmsmaster.customfield,
attachment: JSON.parse(res.lmsmaster.attachment),
status: res.lmsmaster.status,
statusdesc: res.lmsmaster.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("companyname")>=0)this.companynamevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("companyname")>=0)this.companynamevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("website")>=0)this.websitevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("website")>=0)this.websitevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("secondarycontacts")>=0)this.secondarycontactsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("secondarycontacts")>=0)this.secondarycontactsvisible = false;
this.lmsopportunitiesvisiblelist=res.lmsopportunitiesvisiblelist;
this.lmscallsvisiblelist=res.lmscallsvisiblelist;
this.lmscorporatesecondarycontactsvisiblelist=res.lmscorporatesecondarycontactsvisiblelist;
if(this.lmsmasterForm.get('customfield').value!=null && this.lmsmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmsmasterForm.get('customfield').value);
this.FillCustomField();
if(this.lmsmasterForm.get('photo').value!=null && this.lmsmasterForm.get('photo').value!="" && this.photo!=null && this.photo!=undefined)this.photo.setattachmentlist(this.lmsmasterForm.get('photo').value);
if(this.lmsmasterForm.get('thumbnail').value!=null && this.lmsmasterForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.lmsmasterForm.get('thumbnail').value);
if(this.lmsmasterForm.get('attachment').value!=null && this.lmsmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmsmasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.lmsmasterservice.lmsopportunities = res.lmsopportunities;
this.SetlmsopportunitiesTableConfig();
this.lmsopportunitiesLoadTable();
  setTimeout(() => {
  this.SetlmsopportunitiesTableddConfig();
  });
this.lmsmasterservice.lmscalls = res.lmscalls;
this.SetlmscallsTableConfig();
this.lmscallsLoadTable();
  setTimeout(() => {
  this.SetlmscallsTableddConfig();
  });
this.lmsmasterservice.lmscorporatesecondarycontacts = res.lmscorporatesecondarycontacts;
this.SetlmscorporatesecondarycontactsTableConfig();
this.lmscorporatesecondarycontactsLoadTable();
  setTimeout(() => {
  this.SetlmscorporatesecondarycontactsTableddConfig();
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
  for (let key in this.lmsmasterForm.controls) {
    if (this.lmsmasterForm.controls[key] != null) {
if( key=="photo" ||  key=="thumbnail")
{
if(this.lmsmasterservice.formData!=null && this.lmsmasterservice.formData[key]!=null  && this.lmsmasterservice.formData[key]!='[]' && this.lmsmasterservice.formData[key]!=undefined && this.lmsmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsmasterservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.lmsmasterservice.formData!=null && this.lmsmasterservice.formData[key]!=null   && this.lmsmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsmasterservice.formData!=null && this.lmsmasterservice.formData[key]!=null   && this.lmsmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsmasterservice.formData[key]+"'><div class='progress__number'>"+this.lmsmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmsmasterForm.value;
obj.datecreated=new Date(this.lmsmasterForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('datecreated').value)+'  UTC' :null);
obj.leaddate=new Date(this.lmsmasterForm.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('leaddate').value)+'  UTC' :null);
obj.nextcontactduedate=new Date(this.lmsmasterForm.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('nextcontactduedate').value)+'  UTC' :null);
if(this.lmsmasterForm.get('shippingaddress').value!=null)obj.shippingaddress=JSON.stringify(this.lmsmasterForm.get('shippingaddress').value);
if(this.lmsmasterForm.get('billingaddress').value!=null)obj.billingaddress=JSON.stringify(this.lmsmasterForm.get('billingaddress').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.photo.getattachmentlist()!=null)obj.photo=JSON.stringify(this.photo.getattachmentlist());
if(this.photo.getattachmentlist()!=null)obj.photo=JSON.stringify(this.photo.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.photo.getAllFiles());
await this.sharedService.upload(this.thumbnail.getAllFiles());
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

private lmsmastertoggleOption(){
this.lmsmastershowOption = this.lmsmastershowOption === true ? false : true;
}

private lmsopportunitytoggleOption(){
this.lmsopportunityshowOption = this.lmsopportunityshowOption === true ? false : true;
}

private lmscalltoggleOption(){
this.lmscallshowOption = this.lmscallshowOption === true ? false : true;
}

private lmscorporatesecondarycontacttoggleOption(){
this.lmscorporatesecondarycontactshowOption = this.lmscorporatesecondarycontactshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsmasterservice.formData=this.lmsmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsmasterForm.controls[key] != null)
    {
        this.lmsmasterservice.formData[key] = this.lmsmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmsmasterservice.formData.datecreated=new Date(this.lmsmasterForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('datecreated').value)+'  UTC' :null);
this.lmsmasterservice.formData.leaddate=new Date(this.lmsmasterForm.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('leaddate').value)+'  UTC' :null);
this.lmsmasterservice.formData.nextcontactduedate=new Date(this.lmsmasterForm.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmasterForm.get('nextcontactduedate').value)+'  UTC' :null);
if(this.lmsmasterForm.get('shippingaddress').value!=null)this.lmsmasterservice.formData.shippingaddress=JSON.stringify(this.lmsmasterForm.get('shippingaddress').value);
if(this.lmsmasterForm.get('billingaddress').value!=null)this.lmsmasterservice.formData.billingaddress=JSON.stringify(this.lmsmasterForm.get('billingaddress').value);
this.lmsmasterservice.formData.photo=this.lmsmasterForm.get('photo').value;
this.lmsmasterservice.formData.thumbnail=this.lmsmasterForm.get('thumbnail').value;
if(customfields!=null)this.lmsmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.lmsmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmsmasterservice.formData.DeletedlmsopportunityIDs = this.DeletedlmsopportunityIDs;
this.lmsmasterservice.formData.DeletedlmscallIDs = this.DeletedlmscallIDs;
this.lmsmasterservice.formData.DeletedlmscorporatesecondarycontactIDs = this.DeletedlmscorporatesecondarycontactIDs;
if(this.photo.getattachmentlist()!=null)this.lmsmasterservice.formData.photo=JSON.stringify(this.photo.getattachmentlist());
if(this.photo.getattachmentlist()!=null)this.lmsmasterservice.formData.photo=JSON.stringify(this.photo.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmsmasterservice.formData);
this.lmsmasterservice.formData=this.lmsmasterForm.value;
this.lmsmasterservice.saveOrUpdatelmsmasters().subscribe(
async res => {
await this.sharedService.upload(this.photo.getAllFiles());
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmsopportunitiessource.data)
{
    for (let i = 0; i < this.lmsopportunitiessource.data.length; i++)
    {
        if (this.lmsopportunitiessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsopportunitiessource.data[i].fileattachmentlist);
    }
}
if (this.lmscallssource.data)
{
    for (let i = 0; i < this.lmscallssource.data.length; i++)
    {
        if (this.lmscallssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscallssource.data[i].fileattachmentlist);
    }
}
if (this.lmscorporatesecondarycontactssource.data)
{
    for (let i = 0; i < this.lmscorporatesecondarycontactssource.data.length; i++)
    {
        if (this.lmscorporatesecondarycontactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscorporatesecondarycontactssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsmaster);
}
else
{
this.FillData(res);
}
}
this.lmsmasterForm.markAsUntouched();
this.lmsmasterForm.markAsPristine();
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
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.lmsmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.lmsmasterForm.get('branchlocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadowner( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmsmasterForm.get('leadowner').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcompanytypeid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.lmsmasterForm.get('companytypeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.lmsmasterForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.lmsmasterForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdesignation( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.lmsmasterForm.get('designation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( campaignid) {
/*let ScreenType='2';
this.dialog.open(lmscampaignmasterComponent, 
{
data: {campaignid:this.lmsmasterForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmsopportunity(event:any,opportunityid:any, leadid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsopportunityComponent, 
{
data:  {  showview:false,save:true,event,opportunityid, leadid,visiblelist:this.lmsopportunitiesvisiblelist,  hidelist:this.lmsopportunitieshidelist,ScreenType:2,branchid:this.lmsmasterForm.get('branchid').value,branchiddesc:this.lmsmasterForm.get('branchiddesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsopportunitiessource.add(res);
this.lmsopportunitiessource.refresh();
}
else
{
this.lmsopportunitiessource.update(event.data, res);
}
}
});
}

onDeletelmsopportunity(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsopportunityIDs += childID + ",";
this.lmsmasterservice.lmsopportunities.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmscall(event:any,callid:any, leadid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscallComponent, 
{
data:  {  showview:false,save:true,event,callid, leadid,visiblelist:this.lmscallsvisiblelist,  hidelist:this.lmscallshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmscallssource.add(res);
this.lmscallssource.refresh();
}
else
{
this.lmscallssource.update(event.data, res);
}
}
});
}

onDeletelmscall(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmscallIDs += childID + ",";
this.lmsmasterservice.lmscalls.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmscorporatesecondarycontact(event:any,secondarycontactid:any, leadid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscorporatesecondarycontactComponent, 
{
data:  {  showview:false,save:false,event,secondarycontactid, leadid,visiblelist:this.lmscorporatesecondarycontactsvisiblelist,  hidelist:this.lmscorporatesecondarycontactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmscorporatesecondarycontactssource.add(res);
this.lmscorporatesecondarycontactssource.refresh();
}
else
{
this.lmscorporatesecondarycontactssource.update(event.data, res);
}
}
});
}

onDeletelmscorporatesecondarycontact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmscorporatesecondarycontactIDs += childID + ",";
this.lmsmasterservice.lmscorporatesecondarycontacts.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmsopportunities
lmsopportunitiessettings:any;
lmsopportunitiessource: any;

showlmsopportunitiesCheckbox()
{
debugger;
if(this.tbllmsopportunitiessource.settings['selectMode']== 'multi')this.tbllmsopportunitiessource.settings['selectMode']= 'single';
else
this.tbllmsopportunitiessource.settings['selectMode']= 'multi';
this.tbllmsopportunitiessource.initGrid();
}
deletelmsopportunitiesAll()
{
this.tbllmsopportunitiessource.settings['selectMode'] = 'single';
}
showlmsopportunitiesFilter()
{
  setTimeout(() => {
  this.SetlmsopportunitiesTableddConfig();
  });
      if(this.tbllmsopportunitiessource.settings!=null)this.tbllmsopportunitiessource.settings['hideSubHeader'] =!this.tbllmsopportunitiessource.settings['hideSubHeader'];
this.tbllmsopportunitiessource.initGrid();
}
showlmsopportunitiesInActive()
{
}
enablelmsopportunitiesInActive()
{
}
async SetlmsopportunitiesTableddConfig()
{
if(!this.bfilterPopulatelmsopportunities){

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataleadby2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsopportunitiesleadby3.push(defaultobj);
for(let i=0; i<dataleadby2.length; i++){
var obj= { value: dataleadby2[i].userid, title:dataleadby2[i].username};
this.datalmsopportunitiesleadby3.push(obj);
}
if((this.tbllmsopportunitiessource.settings as any).columns['leadby'])
{
(this.tbllmsopportunitiessource.settings as any).columns['leadby'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsopportunitiesleadby3));
this.tbllmsopportunitiessource.initGrid();
}
});

this.configservice.getList("closurepossibility").then(res=>
{
var datapossibilityofclosure2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsopportunitiespossibilityofclosure3.push(defaultobj);
for(let i=0; i<datapossibilityofclosure2.length; i++){
var obj= { value: datapossibilityofclosure2[i].configkey, title: datapossibilityofclosure2[i].configtext};
this.datalmsopportunitiespossibilityofclosure3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsopportunitiessource.settings);
if(clone.columns['possibilityofclosure']!=undefined)clone.columns['possibilityofclosure'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsopportunitiespossibilityofclosure3)), }, };
if(clone.columns['possibilityofclosure']!=undefined)clone.columns['possibilityofclosure'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsopportunitiespossibilityofclosure3)), }, };
this.tbllmsopportunitiessource.settings =  clone;
this.tbllmsopportunitiessource.initGrid();
});
}
this.bfilterPopulatelmsopportunities=true;
}
async lmsopportunitiesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsopportunitiesTableConfig()
{
this.lmsopportunitiessettings = {
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
opportunitydetail: {
title: 'Opportunity Detail',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
possibilityofclosure: {
title: 'Possibility Of Closure',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsopportunitiespossibilityofclosure3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
lmsopportunitiesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsopportunitiesID)>=0)
{
this.lmsopportunitiessource=new LocalDataSource();
this.lmsopportunitiessource.load(this.lmsmasterservice.lmsopportunities as  any as LocalDataSource);
this.lmsopportunitiessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsopportunitiesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsmasterservice.lmsopportunities.length == 0)
{
    this.tbllmsopportunitiessource.grid.createFormShown = true;
}
else
{
    let obj = new lmsopportunity();
    this.lmsmasterservice.lmsopportunities.push(obj);
    this.lmsopportunitiessource.refresh();
    if ((this.lmsmasterservice.lmsopportunities.length / this.lmsopportunitiessource.getPaging().perPage).toFixed(0) + 1 != this.lmsopportunitiessource.getPaging().page)
    {
        this.lmsopportunitiessource.setPage((this.lmsmasterservice.lmsopportunities.length / this.lmsopportunitiessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsopportunitiessource.grid.edit(this.tbllmsopportunitiessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsopportunitiessource.data.indexOf(event.data);
this.onDeletelmsopportunity(event,event.data.opportunityid,((this.lmsopportunitiessource.getPaging().page-1) *this.lmsopportunitiessource.getPaging().perPage)+index);
this.lmsopportunitiessource.refresh();
break;
}
}

*/
lmsopportunitiesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsopportunity(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsopportunity(event,event.data.opportunityid,this.formid);
break;
case 'delete':
this.onDeletelmsopportunity(event,event.data.opportunityid,((this.lmsopportunitiessource.getPaging().page-1) *this.lmsopportunitiessource.getPaging().perPage)+event.index);
this.lmsopportunitiessource.refresh();
break;
}
}
lmsopportunitiesonDelete(obj) {
let opportunityid=obj.data.opportunityid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsmasterservice.deletelmsmaster(opportunityid).then(res=>
this.lmsopportunitiesLoadTable()
);
}
}
lmsopportunitiesPaging(val)
{
debugger;
this.lmsopportunitiessource.setPaging(1, val, true);
}

handlelmsopportunitiesGridSelected(event:any) {
this.lmsopportunitiesselectedindex=this.lmsmasterservice.lmsopportunities.findIndex(i => i.opportunityid === event.data.opportunityid);
}
IslmsopportunitiesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsopportunitiesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsopportunities
//start of Grid Codes lmscalls
lmscallssettings:any;
lmscallssource: any;

showlmscallsCheckbox()
{
debugger;
if(this.tbllmscallssource.settings['selectMode']== 'multi')this.tbllmscallssource.settings['selectMode']= 'single';
else
this.tbllmscallssource.settings['selectMode']= 'multi';
this.tbllmscallssource.initGrid();
}
deletelmscallsAll()
{
this.tbllmscallssource.settings['selectMode'] = 'single';
}
showlmscallsFilter()
{
  setTimeout(() => {
  this.SetlmscallsTableddConfig();
  });
      if(this.tbllmscallssource.settings!=null)this.tbllmscallssource.settings['hideSubHeader'] =!this.tbllmscallssource.settings['hideSubHeader'];
this.tbllmscallssource.initGrid();
}
showlmscallsInActive()
{
}
enablelmscallsInActive()
{
}
async SetlmscallsTableddConfig()
{
if(!this.bfilterPopulatelmscalls){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datalmscallsbranchid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['branchid'])
{
(this.tbllmscallssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallsbranchid3));
this.tbllmscallssource.initGrid();
}
});

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var databranchlocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsbranchlocationid3.push(defaultobj);
for(let i=0; i<databranchlocationid2.length; i++){
var obj= { value: databranchlocationid2[i].locationid, title:databranchlocationid2[i].locationname};
this.datalmscallsbranchlocationid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['branchlocationid'])
{
(this.tbllmscallssource.settings as any).columns['branchlocationid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallsbranchlocationid3));
this.tbllmscallssource.initGrid();
}
});

this.lmsmasterservice.getlmsmastersList().then(res=>
{
var dataleadid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsleadid3.push(defaultobj);
for(let i=0; i<dataleadid2.length; i++){
var obj= { value: dataleadid2[i].leadid, title:dataleadid2[i].lastname};
this.datalmscallsleadid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['leadid'])
{
(this.tbllmscallssource.settings as any).columns['leadid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallsleadid3));
this.tbllmscallssource.initGrid();
}
});

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmscallsopportunityid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['opportunityid'])
{
(this.tbllmscallssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallsopportunityid3));
this.tbllmscallssource.initGrid();
}
});

this.lmscallservice.getlmscallsList().then(res=>
{
var datacallid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallscallid3.push(defaultobj);
for(let i=0; i<datacallid2.length; i++){
var obj= { value: datacallid2[i].callid, title:datacallid2[i].agenda};
this.datalmscallscallid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['callid'])
{
(this.tbllmscallssource.settings as any).columns['callid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallscallid3));
this.tbllmscallssource.initGrid();
}
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var datacampaignid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallscampaignid3.push(defaultobj);
for(let i=0; i<datacampaignid2.length; i++){
var obj= { value: datacampaignid2[i].productid, title:datacampaignid2[i].productname};
this.datalmscallscampaignid3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['campaignid'])
{
(this.tbllmscallssource.settings as any).columns['campaignid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallscampaignid3));
this.tbllmscallssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataleadby2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsleadby3.push(defaultobj);
for(let i=0; i<dataleadby2.length; i++){
var obj= { value: dataleadby2[i].userid, title:dataleadby2[i].username};
this.datalmscallsleadby3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['leadby'])
{
(this.tbllmscallssource.settings as any).columns['leadby'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallsleadby3));
this.tbllmscallssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datacurrentowner2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallscurrentowner3.push(defaultobj);
for(let i=0; i<datacurrentowner2.length; i++){
var obj= { value: datacurrentowner2[i].userid, title:datacurrentowner2[i].username};
this.datalmscallscurrentowner3.push(obj);
}
if((this.tbllmscallssource.settings as any).columns['currentowner'])
{
(this.tbllmscallssource.settings as any).columns['currentowner'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscallscurrentowner3));
this.tbllmscallssource.initGrid();
}
});

this.configservice.getList("activitytype").then(res=>
{
var datanextaction2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsnextaction3.push(defaultobj);
for(let i=0; i<datanextaction2.length; i++){
var obj= { value: datanextaction2[i].configkey, title: datanextaction2[i].configtext};
this.datalmscallsnextaction3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscallssource.settings);
if(clone.columns['nextaction']!=undefined)clone.columns['nextaction'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscallsnextaction3)), }, };
if(clone.columns['nextaction']!=undefined)clone.columns['nextaction'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscallsnextaction3)), }, };
this.tbllmscallssource.settings =  clone;
this.tbllmscallssource.initGrid();
});
}
this.bfilterPopulatelmscalls=true;
}
async lmscallsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscallsTableConfig()
{
this.lmscallssettings = {
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
activitytype: {
title: 'Activity Type',
type: '',
filter:true,
},
attendedusers: {
title: 'Attended Users',
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscallsnextaction3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
score: {
title: 'Score',
type: 'number',
filter:true,
},
},
};
}
lmscallsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscallsID)>=0)
{
this.lmscallssource=new LocalDataSource();
this.lmscallssource.load(this.lmsmasterservice.lmscalls as  any as LocalDataSource);
this.lmscallssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscallsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsmasterservice.lmscalls.length == 0)
{
    this.tbllmscallssource.grid.createFormShown = true;
}
else
{
    let obj = new lmscall();
    this.lmsmasterservice.lmscalls.push(obj);
    this.lmscallssource.refresh();
    if ((this.lmsmasterservice.lmscalls.length / this.lmscallssource.getPaging().perPage).toFixed(0) + 1 != this.lmscallssource.getPaging().page)
    {
        this.lmscallssource.setPage((this.lmsmasterservice.lmscalls.length / this.lmscallssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscallssource.grid.edit(this.tbllmscallssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmscallssource.data.indexOf(event.data);
this.onDeletelmscall(event,event.data.callid,((this.lmscallssource.getPaging().page-1) *this.lmscallssource.getPaging().perPage)+index);
this.lmscallssource.refresh();
break;
}
}

*/
lmscallsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmscall(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmscall(event,event.data.callid,this.formid);
break;
case 'delete':
this.onDeletelmscall(event,event.data.callid,((this.lmscallssource.getPaging().page-1) *this.lmscallssource.getPaging().perPage)+event.index);
this.lmscallssource.refresh();
break;
}
}
lmscallsonDelete(obj) {
let callid=obj.data.callid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsmasterservice.deletelmsmaster(callid).then(res=>
this.lmscallsLoadTable()
);
}
}
lmscallsPaging(val)
{
debugger;
this.lmscallssource.setPaging(1, val, true);
}

handlelmscallsGridSelected(event:any) {
this.lmscallsselectedindex=this.lmsmasterservice.lmscalls.findIndex(i => i.callid === event.data.callid);
}
IslmscallsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscallsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscalls
//start of Grid Codes lmscorporatesecondarycontacts
lmscorporatesecondarycontactssettings:any;
lmscorporatesecondarycontactssource: any;

showlmscorporatesecondarycontactsCheckbox()
{
debugger;
if(this.tbllmscorporatesecondarycontactssource.settings['selectMode']== 'multi')this.tbllmscorporatesecondarycontactssource.settings['selectMode']= 'single';
else
this.tbllmscorporatesecondarycontactssource.settings['selectMode']= 'multi';
this.tbllmscorporatesecondarycontactssource.initGrid();
}
deletelmscorporatesecondarycontactsAll()
{
this.tbllmscorporatesecondarycontactssource.settings['selectMode'] = 'single';
}
showlmscorporatesecondarycontactsFilter()
{
  setTimeout(() => {
  this.SetlmscorporatesecondarycontactsTableddConfig();
  });
      if(this.tbllmscorporatesecondarycontactssource.settings!=null)this.tbllmscorporatesecondarycontactssource.settings['hideSubHeader'] =!this.tbllmscorporatesecondarycontactssource.settings['hideSubHeader'];
this.tbllmscorporatesecondarycontactssource.initGrid();
}
showlmscorporatesecondarycontactsInActive()
{
}
enablelmscorporatesecondarycontactsInActive()
{
}
async SetlmscorporatesecondarycontactsTableddConfig()
{
if(!this.bfilterPopulatelmscorporatesecondarycontacts){
}
this.bfilterPopulatelmscorporatesecondarycontacts=true;
}
async lmscorporatesecondarycontactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscorporatesecondarycontactsTableConfig()
{
this.lmscorporatesecondarycontactssettings = {
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
firstname: {
title: 'First Name',
type: '',
filter:true,
},
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
companyname: {
title: 'Company Name',
type: '',
filter:true,
},
designation: {
title: 'Designation',
type: 'number',
filter:true,
},
category: {
title: 'Category',
type: '',
filter:true,
},
groupname: {
title: 'Group Name',
type: '',
filter:true,
},
mobile: {
title: 'Mobile',
type: '',
filter:true,
},
officephone: {
title: 'Office Phone',
type: '',
filter:true,
},
extension: {
title: 'Extension',
type: '',
filter:true,
},
residencephone: {
title: 'Residence Phone',
type: '',
filter:true,
},
emailid: {
title: 'Email',
type: '',
filter:true,
},
},
};
}
lmscorporatesecondarycontactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontactsID)>=0)
{
this.lmscorporatesecondarycontactssource=new LocalDataSource();
this.lmscorporatesecondarycontactssource.load(this.lmsmasterservice.lmscorporatesecondarycontacts as  any as LocalDataSource);
this.lmscorporatesecondarycontactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscorporatesecondarycontactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsmasterservice.lmscorporatesecondarycontacts.length == 0)
{
    this.tbllmscorporatesecondarycontactssource.grid.createFormShown = true;
}
else
{
    let obj = new lmscorporatesecondarycontact();
    this.lmsmasterservice.lmscorporatesecondarycontacts.push(obj);
    this.lmscorporatesecondarycontactssource.refresh();
    if ((this.lmsmasterservice.lmscorporatesecondarycontacts.length / this.lmscorporatesecondarycontactssource.getPaging().perPage).toFixed(0) + 1 != this.lmscorporatesecondarycontactssource.getPaging().page)
    {
        this.lmscorporatesecondarycontactssource.setPage((this.lmsmasterservice.lmscorporatesecondarycontacts.length / this.lmscorporatesecondarycontactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscorporatesecondarycontactssource.grid.edit(this.tbllmscorporatesecondarycontactssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmscorporatesecondarycontactssource.data.indexOf(event.data);
this.onDeletelmscorporatesecondarycontact(event,event.data.secondarycontactid,((this.lmscorporatesecondarycontactssource.getPaging().page-1) *this.lmscorporatesecondarycontactssource.getPaging().perPage)+index);
this.lmscorporatesecondarycontactssource.refresh();
}
break;
}
}

*/
lmscorporatesecondarycontactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmscorporatesecondarycontact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmscorporatesecondarycontact(event,event.data.secondarycontactid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletelmscorporatesecondarycontact(event,event.data.secondarycontactid,((this.lmscorporatesecondarycontactssource.getPaging().page-1) *this.lmscorporatesecondarycontactssource.getPaging().perPage)+event.index);
this.lmscorporatesecondarycontactssource.refresh();
}
break;
}
}
lmscorporatesecondarycontactsonDelete(obj) {
let secondarycontactid=obj.data.secondarycontactid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsmasterservice.deletelmsmaster(secondarycontactid).then(res=>
this.lmscorporatesecondarycontactsLoadTable()
);
}
}
lmscorporatesecondarycontactsPaging(val)
{
debugger;
this.lmscorporatesecondarycontactssource.setPaging(1, val, true);
}

handlelmscorporatesecondarycontactsGridSelected(event:any) {
this.lmscorporatesecondarycontactsselectedindex=this.lmsmasterservice.lmscorporatesecondarycontacts.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
}
IslmscorporatesecondarycontactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscorporatesecondarycontacts

}



