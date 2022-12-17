import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
import { hrmsapplicantmaster } from './../../../model/hrmsapplicantmaster.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
//detail table services
import { hrmsinterviewschedule } from './../../../model/hrmsinterviewschedule.model';
import { hrmsinterviewscheduleComponent } from './../../../pages/forms/hrmsinterviewschedule/hrmsinterviewschedule.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { hrmsmanpowerrequest,IhrmsmanpowerrequestResponse } from './../../../model/hrmsmanpowerrequest.model';
import { hrmsmanpowerrequestComponent } from './../../../pages/forms/hrmsmanpowerrequest/hrmsmanpowerrequest.component';
import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
import { hrmsapplicantoffer } from './../../../model/hrmsapplicantoffer.model';
import { hrmsapplicantofferComponent } from './../../../pages/forms/hrmsapplicantoffer/hrmsapplicantoffer.component';
//FK services
import { hrmsinterviewscheduleService } from './../../../service/hrmsinterviewschedule.service';
import { hrmsapplicantcareer } from './../../../model/hrmsapplicantcareer.model';
import { hrmsapplicantcareerComponent } from './../../../pages/forms/hrmsapplicantcareer/hrmsapplicantcareer.component';
//FK services
import { hrmsapplicanteducation } from './../../../model/hrmsapplicanteducation.model';
import { hrmsapplicanteducationComponent } from './../../../pages/forms/hrmsapplicanteducation/hrmsapplicanteducation.component';
//FK services
import { hrmsapplicantskill } from './../../../model/hrmsapplicantskill.model';
import { hrmsapplicantskillComponent } from './../../../pages/forms/hrmsapplicantskill/hrmsapplicantskill.component';
//FK services
import { hrmsmprapplicant } from './../../../model/hrmsmprapplicant.model';
import { hrmsmprapplicantComponent } from './../../../pages/forms/hrmsmprapplicant/hrmsmprapplicant.component';
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
selector: 'app-hrmsapplicantmaster',
templateUrl: './hrmsapplicantmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsapplicantmasterComponent implements OnInit {
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
bfilterPopulatehrmsapplicantmasters:boolean=false;
datahrmsapplicantmastersapplicantid3:any=[];
datahrmsapplicantmastersjobrole3:any=[];
datahrmsapplicantmastersdepartment3:any=[];
datahrmsapplicantmastersgender3:any=[];
datahrmsapplicantmastersmaritalstatus3:any=[];
datahrmsapplicantmasterssource3:any=[];
datahrmsapplicantmastershighestqualification3:any=[];
datahrmsapplicantmasterssuitableposition3:any=[];
datahrmsapplicantmasterscurrentsalarycurrency3:any=[];
datahrmsapplicantmastersexpectedsalarycurrency3:any=[];
datahrmsapplicantmastersissuecountry3:any=[];
datahrmsapplicantmastersnationality3:any=[];
datahrmsapplicantmasterslocationpreference3:any=[];
datahrmsapplicantmasterscountryid3:any=[];
datahrmsapplicantmastersstateid3:any=[];
datahrmsapplicantmasterscityid3:any=[];
datahrmsinterviewschedulesinterviewer3:any=[];
datahrmsinterviewschedulescontactperson3:any=[];
datahrmsinterviewschedulesmprid3:any=[];
datahrmsinterviewschedulesvenue3:any=[];
datahrmsinterviewschedulesinterviewstatus3:any=[];
datahrmsinterviewschedulesinterviewround3:any=[];
datahrmsinterviewschedulesjobrole3:any=[];
datahrmsinterviewschedulesapplicantid3:any=[];
bfilterPopulatehrmsinterviewschedules:boolean=false;
datahrmsapplicantoffersdepartment3:any=[];
datahrmsapplicantoffersmprid3:any=[];
datahrmsapplicantoffersemployeeid3:any=[];
datahrmsapplicantoffersinterviewid3:any=[];
datahrmsapplicantoffersapplicantid3:any=[];
bfilterPopulatehrmsapplicantoffers:boolean=false;
datahrmsapplicantcareersmappedtoourrole3:any=[];
datahrmsapplicantcareerscurrency3:any=[];
datahrmsapplicantcareersapplicantid3:any=[];
bfilterPopulatehrmsapplicantcareers:boolean=false;
datahrmsapplicanteducationsapplicantid3:any=[];
datahrmsapplicanteducationseducation3:any=[];
datahrmsapplicanteducationsgrade3:any=[];
datahrmsapplicanteducationscompletionstatus3:any=[];
bfilterPopulatehrmsapplicanteducations:boolean=false;
datahrmsapplicantskillsskillcategory3:any=[];
datahrmsapplicantskillsapplicantid3:any=[];
bfilterPopulatehrmsapplicantskills:boolean=false;
datahrmsmprapplicantsapplicantid3:any=[];
bfilterPopulatehrmsmprapplicants:boolean=false;
@ViewChild('tblhrmsinterviewschedulessource',{static:false}) tblhrmsinterviewschedulessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsapplicantofferssource',{static:false}) tblhrmsapplicantofferssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsapplicantcareerssource',{static:false}) tblhrmsapplicantcareerssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsapplicanteducationssource',{static:false}) tblhrmsapplicanteducationssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsapplicantskillssource',{static:false}) tblhrmsapplicantskillssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsmprapplicantssource',{static:false}) tblhrmsmprapplicantssource: Ng2SmartTableComponent;
 hrmsapplicantmasterForm: FormGroup;
applicantidList: hrmsapplicantmaster[];
applicantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
applicantid_hrmsapplicantmastersForm: FormGroup;//autocomplete
applicantid_hrmsapplicantmastersoptions:any;//autocomplete
applicantid_hrmsapplicantmastersformatter:any;//autocomplete
jobroleList: bouserrolemaster[];
departmentList: bomasterdata[];
genderList: boconfigvalue[];
maritalstatusList: boconfigvalue[];
sourceList: boconfigvalue[];
highestqualificationList: boconfigvalue[];
suitablepositionList: bomasterdata[];
currentsalarycurrencyList: boconfigvalue[];
expectedsalarycurrencyList: boconfigvalue[];
issuecountryList: bocountry[];
issuecountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
issuecountry_bocountriesForm: FormGroup;//autocomplete
issuecountry_bocountriesoptions:any;//autocomplete
issuecountry_bocountriesformatter:any;//autocomplete
nationalityList: boconfigvalue[];
locationpreferenceList: bobranchmaster[];
locationpreferenceoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationpreference_bobranchmastersForm: FormGroup;//autocomplete
locationpreference_bobranchmastersoptions:any;//autocomplete
locationpreference_bobranchmastersformatter:any;//autocomplete
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
hrmsapplicantmastershowOption:boolean;
hrmsinterviewscheduleshowOption:boolean;
hrmsapplicantoffershowOption:boolean;
hrmsapplicantcareershowOption:boolean;
hrmsapplicanteducationshowOption:boolean;
hrmsapplicantskillshowOption:boolean;
hrmsmprapplicantshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsinterviewschedulesvisiblelist:any;
hrmsinterviewscheduleshidelist:any;
hrmsapplicantoffersvisiblelist:any;
hrmsapplicantoffershidelist:any;
hrmsapplicantcareersvisiblelist:any;
hrmsapplicantcareershidelist:any;
hrmsapplicanteducationsvisiblelist:any;
hrmsapplicanteducationshidelist:any;
hrmsapplicantskillsvisiblelist:any;
hrmsapplicantskillshidelist:any;
hrmsmprapplicantsvisiblelist:any;
hrmsmprapplicantshidelist:any;

DeletedhrmsinterviewscheduleIDs: string="";
hrmsinterviewschedulesID: string = "1";
hrmsinterviewschedulesselectedindex:any;
DeletedhrmsapplicantofferIDs: string="";
hrmsapplicantoffersID: string = "2";
hrmsapplicantoffersselectedindex:any;
DeletedhrmsapplicantcareerIDs: string="";
hrmsapplicantcareersID: string = "3";
hrmsapplicantcareersselectedindex:any;
DeletedhrmsapplicanteducationIDs: string="";
hrmsapplicanteducationsID: string = "4";
hrmsapplicanteducationsselectedindex:any;
DeletedhrmsapplicantskillIDs: string="";
hrmsapplicantskillsID: string = "5";
hrmsapplicantskillsselectedindex:any;
DeletedhrmsmprapplicantIDs: string="";
hrmsmprapplicantsID: string = "6";
hrmsmprapplicantsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsapplicantmasterservice: hrmsapplicantmasterService,
private bousermasterservice: bousermasterService,
private hrmsmanpowerrequestservice: hrmsmanpowerrequestService,
private bouserrolemasterservice: bouserrolemasterService,
private bomasterdataservice: bomasterdataService,
private hrmsinterviewscheduleservice: hrmsinterviewscheduleService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bobranchmasterservice:bobranchmasterService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.hrmsapplicantmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
applicantid: [null],
applicantiddesc: [null],
applicationdate: [null],
applicantcode: [null],
applicantname: [null],
title: [null],
jobrole: [null],
jobroledesc: [null],
department: [null],
departmentdesc: [null],
mobile: [null],
email: [null],
otherphone: [null],
dob: [null],
gender: [null],
genderdesc: [null],
maritalstatus: [null],
maritalstatusdesc: [null],
source: [null],
sourcedesc: [null],
sourcereferences: [null],
highestqualification: [null],
highestqualificationdesc: [null],
suitableposition: [null],
suitablepositiondesc: [null],
relatedexperience: [null],
totalexperience: [null],
internationalexperience: [null],
currentsalarycurrency: [null],
currentsalarycurrencydesc: [null],
currentsalary: [null],
expectedsalarycurrency: [null],
expectedsalarycurrencydesc: [null],
expectedfromsalary: [null],
expectedtosalary: [null],
noticeperiod: [null],
passportnumber: [null],
issuecountry: [null],
issuecountrydesc: [null],
issuedate: [null],
expirydate: [null],
nationality: [null],
nationalitydesc: [null],
locationpreference: [null],
locationpreferencedesc: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pincode: [null],
reference1: [null],
reference1mobile: [null],
reference1email: [null],
reference2: [null],
reference2mobile: [null],
reference2email: [null],
attachment: [null],
customfield: [null],
remarks: [null],
rejectiontill: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsapplicantmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsapplicantmasterForm.dirty && this.hrmsapplicantmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
passportnumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.passportnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].applicantid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Passport Number value exists in the database.Do you want to display the record ? "))
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
mobileexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.mobile.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].applicantid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Mobile value exists in the database.Do you want to display the record ? "))
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
emailexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.email.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].applicantid.toString()!=this.formid.toString()) 
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
  let pos = this.pkList.map(function(e:any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.applicantid && pkDetail) {
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
let hrmsapplicantmasterid = null;

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
this.formid=hrmsapplicantmasterid;
//this.sharedService.alert(hrmsapplicantmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsinterviewschedulesTableConfig();
  setTimeout(() => {
  this.SethrmsinterviewschedulesTableddConfig();
  });

this.SethrmsapplicantoffersTableConfig();
  setTimeout(() => {
  this.SethrmsapplicantoffersTableddConfig();
  });

this.SethrmsapplicantcareersTableConfig();
  setTimeout(() => {
  this.SethrmsapplicantcareersTableddConfig();
  });

this.SethrmsapplicanteducationsTableConfig();
  setTimeout(() => {
  this.SethrmsapplicanteducationsTableddConfig();
  });

this.SethrmsapplicantskillsTableConfig();
  setTimeout(() => {
  this.SethrmsapplicantskillsTableddConfig();
  });

this.SethrmsmprapplicantsTableConfig();
  setTimeout(() => {
  this.SethrmsmprapplicantsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => 
{
this.applicantidList = res as hrmsapplicantmaster[];
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.applicantid){
this.applicantidoptionsEvent.emit(this.applicantidList);
this.hrmsapplicantmasterForm.patchValue({
    applicantid: this.hrmsapplicantmasterservice.formData.applicantid,
    applicantiddesc: this.hrmsapplicantmasterservice.formData.applicantiddesc,
});
}
{
let arrapplicantid = this.applicantidList.filter(v => v.applicantid == this.hrmsapplicantmasterForm.get('applicantid').value);
let objapplicantid;
if (arrapplicantid.length > 0) objapplicantid = arrapplicantid[0];
if (objapplicantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.applicantid_hrmsapplicantmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.applicantidList.filter(v => v.applicantname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.applicantid_hrmsapplicantmastersformatter = (result: any) => result.applicantname;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.jobroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.configservice.getList("marital").then(res => this.maritalstatusList = res as boconfigvalue[]);
this.configservice.getList("appplicantsource").then(res => this.sourceList = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.highestqualificationList = res as boconfigvalue[]);
this.bomasterdataservice.getList("wm5x9").then(res => {
this.suitablepositionList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.currentsalarycurrencyList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.expectedsalarycurrencyList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.issuecountryList = res as bocountry[];
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.issuecountry){
this.issuecountryoptionsEvent.emit(this.issuecountryList);
this.hrmsapplicantmasterForm.patchValue({
    issuecountry: this.hrmsapplicantmasterservice.formData.issuecountry,
    issuecountrydesc: this.hrmsapplicantmasterservice.formData.issuecountrydesc,
});
}
{
let arrissuecountry = this.issuecountryList.filter(v => v.countryid == this.hrmsapplicantmasterForm.get('issuecountry').value);
let objissuecountry;
if (arrissuecountry.length > 0) objissuecountry = arrissuecountry[0];
if (objissuecountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.issuecountry_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.issuecountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.issuecountry_bocountriesformatter = (result: any) => result.name;
this.configservice.getList("nationality").then(res => this.nationalityList = res as boconfigvalue[]);
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.locationpreferenceList = res as bobranchmaster[];
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.locationpreference){
this.locationpreferenceoptionsEvent.emit(this.locationpreferenceList);
this.hrmsapplicantmasterForm.patchValue({
    locationpreference: this.hrmsapplicantmasterservice.formData.locationpreference,
    locationpreferencedesc: this.hrmsapplicantmasterservice.formData.locationpreferencedesc,
});
}
{
let arrlocationpreference = this.locationpreferenceList.filter(v => v.branchid == this.hrmsapplicantmasterForm.get('locationpreference').value);
let objlocationpreference;
if (arrlocationpreference.length > 0) objlocationpreference = arrlocationpreference[0];
if (objlocationpreference)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationpreference_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationpreferenceList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationpreference_bobranchmastersformatter = (result: any) => result.branchname;
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.hrmsapplicantmasterForm.patchValue({
    countryid: this.hrmsapplicantmasterservice.formData.countryid,
    countryiddesc: this.hrmsapplicantmasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.hrmsapplicantmasterForm.get('countryid').value);
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
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.stateid){this.hrmsapplicantmasterForm.patchValue({
    stateid: this.hrmsapplicantmasterservice.formData.stateid,
    stateiddesc: this.hrmsapplicantmasterservice.formData.stateiddesc,
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
if(this.hrmsapplicantmasterservice.formData && this.hrmsapplicantmasterservice.formData.cityid){this.hrmsapplicantmasterForm.patchValue({
    cityid: this.hrmsapplicantmasterservice.formData.cityid,
    cityiddesc: this.hrmsapplicantmasterservice.formData.cityiddesc,
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

//autocomplete
    this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => {
      this.pkList = res as hrmsapplicantmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.applicantname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.applicantname;

//setting the flag that the screen is not touched 
this.hrmsapplicantmasterForm.markAsUntouched();
this.hrmsapplicantmasterForm.markAsPristine();
}
onSelectedapplicantid(applicantidDetail: any) {
if (applicantidDetail.applicantid && applicantidDetail) {
this.hrmsapplicantmasterForm.patchValue({
applicantid: applicantidDetail.applicantid,
applicantiddesc: applicantidDetail.applicantname,

});

}
}

onSelectedissuecountry(issuecountryDetail: any) {
if (issuecountryDetail.countryid && issuecountryDetail) {
this.hrmsapplicantmasterForm.patchValue({
issuecountry: issuecountryDetail.countryid,
issuecountrydesc: issuecountryDetail.name,

});

}
}

onSelectedlocationpreference(locationpreferenceDetail: any) {
if (locationpreferenceDetail.branchid && locationpreferenceDetail) {
this.hrmsapplicantmasterForm.patchValue({
locationpreference: locationpreferenceDetail.branchid,
locationpreferencedesc: locationpreferenceDetail.branchname,

});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.hrmsapplicantmasterForm.patchValue({
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
this.hrmsapplicantmasterForm.patchValue({
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
this.hrmsapplicantmasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




resetForm() {
if (this.hrmsapplicantmasterForm != null)
this.hrmsapplicantmasterForm.reset();
this.hrmsapplicantmasterForm.patchValue({
locationpreference: this.sessiondata.branchid,
locationpreferencedesc: this.sessiondata.branchiddesc,
});
this.hrmsapplicantmasterForm.patchValue({
applicationdate: this.ngbDateParserFormatter.parse(new Date().toString()),
dob: this.ngbDateParserFormatter.parse(new Date().toISOString()),
issuedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
expirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
rejectiontill: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.hrmsapplicantmasterservice.hrmsinterviewschedules=[];
this.hrmsinterviewschedulesLoadTable();
this.hrmsapplicantmasterservice.hrmsapplicantoffers=[];
this.hrmsapplicantoffersLoadTable();
this.hrmsapplicantmasterservice.hrmsapplicantcareers=[];
this.hrmsapplicantcareersLoadTable();
this.hrmsapplicantmasterservice.hrmsapplicanteducations=[];
this.hrmsapplicanteducationsLoadTable();
this.hrmsapplicantmasterservice.hrmsapplicantskills=[];
this.hrmsapplicantskillsLoadTable();
this.hrmsapplicantmasterservice.hrmsmprapplicants=[];
this.hrmsmprapplicantsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let applicantid = this.hrmsapplicantmasterForm.get('applicantid').value;
        if(applicantid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(applicantid).then(res =>
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
    this.hrmsapplicantmasterForm.patchValue({
        applicantid: null
    });
    if(this.hrmsapplicantmasterservice.formData.applicantid!=null)this.hrmsapplicantmasterservice.formData.applicantid=null;
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsinterviewschedules.length;i++) {
this.hrmsapplicantmasterservice.hrmsinterviewschedules[i].interviewid=null;
}
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsapplicantoffers.length;i++) {
this.hrmsapplicantmasterservice.hrmsapplicantoffers[i].offerid=null;
}
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsapplicantcareers.length;i++) {
this.hrmsapplicantmasterservice.hrmsapplicantcareers[i].hacid=null;
}
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsapplicanteducations.length;i++) {
this.hrmsapplicantmasterservice.hrmsapplicanteducations[i].haeid=null;
}
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsapplicantskills.length;i++) {
this.hrmsapplicantmasterservice.hrmsapplicantskills[i].skillid=null;
}
for (let i=0;i<this.hrmsapplicantmasterservice.hrmsmprapplicants.length;i++) {
this.hrmsapplicantmasterservice.hrmsmprapplicants[i].mprapplicantid=null;
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
        else if(key=="applicationdate")
this.hrmsapplicantmasterForm.patchValue({"applicationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dob")
this.hrmsapplicantmasterForm.patchValue({"dob":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="issuedate")
this.hrmsapplicantmasterForm.patchValue({"issuedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.hrmsapplicantmasterForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="rejectiontill")
this.hrmsapplicantmasterForm.patchValue({"rejectiontill":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsapplicantmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsapplicantmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsapplicantmasterForm.controls[key]!=undefined)
{
this.hrmsapplicantmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hrmsapplicantmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.hrmsapplicantmasterservice.formData.applicantname!=null )
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
applicantidonChange(evt:any){
let e=evt.value;
}
applicationdateonChange(evt:any){
let e=evt.value;
}
applicantcodeonChange(evt:any){
let e=evt.value;
}
applicantnameonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
jobroleonChange(evt:any){
let e=evt.value;
this.hrmsapplicantmasterForm.patchValue({jobroledesc:evt.options[evt.options.selectedIndex].text});
}
departmentonChange(evt:any){
let e=evt.value;
this.hrmsapplicantmasterForm.patchValue({departmentdesc:evt.options[evt.options.selectedIndex].text});
}
mobileonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
otherphoneonChange(evt:any){
let e=evt.value;
}
dobonChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.hrmsapplicantmasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
maritalstatusonChange(evt:any){
let e=this.f.maritalstatus.value as any;
this.hrmsapplicantmasterForm.patchValue({maritalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
sourceonChange(evt:any){
let e=this.f.source.value as any;
this.hrmsapplicantmasterForm.patchValue({sourcedesc:evt.options[evt.options.selectedIndex].text});
}
sourcereferencesonChange(evt:any){
let e=evt.value;
}
highestqualificationonChange(evt:any){
let e=this.f.highestqualification.value as any;
this.hrmsapplicantmasterForm.patchValue({highestqualificationdesc:evt.options[evt.options.selectedIndex].text});
}
suitablepositiononChange(evt:any){
let e=evt.value;
this.hrmsapplicantmasterForm.patchValue({suitablepositiondesc:evt.options[evt.options.selectedIndex].text});
}
relatedexperienceonChange(evt:any){
let e=evt.value;
}
totalexperienceonChange(evt:any){
let e=evt.value;
}
internationalexperienceonChange(evt:any){
let e=evt.value;
}
currentsalarycurrencyonChange(evt:any){
let e=this.f.currentsalarycurrency.value as any;
this.hrmsapplicantmasterForm.patchValue({currentsalarycurrencydesc:evt.options[evt.options.selectedIndex].text});
}
currentsalaryonChange(evt:any){
let e=evt.value;
}
expectedsalarycurrencyonChange(evt:any){
let e=this.f.expectedsalarycurrency.value as any;
this.hrmsapplicantmasterForm.patchValue({expectedsalarycurrencydesc:evt.options[evt.options.selectedIndex].text});
}
expectedfromsalaryonChange(evt:any){
let e=evt.value;
}
expectedtosalaryonChange(evt:any){
let e=evt.value;
}
noticeperiodonChange(evt:any){
let e=evt.value;
}
passportnumberonChange(evt:any){
let e=evt.value;
}
issuecountryonChange(evt:any){
let e=evt.value;
}
issuedateonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
nationalityonChange(evt:any){
let e=this.f.nationality.value as any;
this.hrmsapplicantmasterForm.patchValue({nationalitydesc:evt.options[evt.options.selectedIndex].text});
}
locationpreferenceonChange(evt:any){
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
pincodeonChange(evt:any){
let e=evt.value;
}
reference1onChange(evt:any){
let e=evt.value;
}
reference1mobileonChange(evt:any){
let e=evt.value;
}
reference1emailonChange(evt:any){
let e=evt.value;
}
reference2onChange(evt:any){
let e=evt.value;
}
reference2mobileonChange(evt:any){
let e=evt.value;
}
reference2emailonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
rejectiontillonChange(evt:any){
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
  


edithrmsapplicantmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsapplicantmasterservice.gethrmsapplicantmastersByEID(pkcol).then(res => {

this.hrmsapplicantmasterservice.formData=res.hrmsapplicantmaster;
let formproperty=res.hrmsapplicantmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsapplicantmaster.pkcol;
this.formid=res.hrmsapplicantmaster.applicantid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsapplicantmaster.applicantid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsapplicantmasterForm.patchValue({
applicantid: res.hrmsapplicantmaster.applicantid,
applicantiddesc: res.hrmsapplicantmaster.applicantiddesc,
applicationdate: this.ngbDateParserFormatter.parse(res.hrmsapplicantmaster.applicationdate),
applicantcode: res.hrmsapplicantmaster.applicantcode,
applicantname: res.hrmsapplicantmaster.applicantname,
title: res.hrmsapplicantmaster.title,
jobrole: res.hrmsapplicantmaster.jobrole,
jobroledesc: res.hrmsapplicantmaster.jobroledesc,
department: res.hrmsapplicantmaster.department,
departmentdesc: res.hrmsapplicantmaster.departmentdesc,
mobile: res.hrmsapplicantmaster.mobile,
email: res.hrmsapplicantmaster.email,
otherphone: res.hrmsapplicantmaster.otherphone,
dob: this.ngbDateParserFormatter.parse(res.hrmsapplicantmaster.dob),
gender: res.hrmsapplicantmaster.gender,
genderdesc: res.hrmsapplicantmaster.genderdesc,
maritalstatus: res.hrmsapplicantmaster.maritalstatus,
maritalstatusdesc: res.hrmsapplicantmaster.maritalstatusdesc,
source: res.hrmsapplicantmaster.source,
sourcedesc: res.hrmsapplicantmaster.sourcedesc,
sourcereferences: res.hrmsapplicantmaster.sourcereferences,
highestqualification: res.hrmsapplicantmaster.highestqualification,
highestqualificationdesc: res.hrmsapplicantmaster.highestqualificationdesc,
suitableposition: res.hrmsapplicantmaster.suitableposition,
suitablepositiondesc: res.hrmsapplicantmaster.suitablepositiondesc,
relatedexperience: res.hrmsapplicantmaster.relatedexperience,
totalexperience: res.hrmsapplicantmaster.totalexperience,
internationalexperience: res.hrmsapplicantmaster.internationalexperience,
currentsalarycurrency: res.hrmsapplicantmaster.currentsalarycurrency,
currentsalarycurrencydesc: res.hrmsapplicantmaster.currentsalarycurrencydesc,
currentsalary: res.hrmsapplicantmaster.currentsalary,
expectedsalarycurrency: res.hrmsapplicantmaster.expectedsalarycurrency,
expectedsalarycurrencydesc: res.hrmsapplicantmaster.expectedsalarycurrencydesc,
expectedfromsalary: res.hrmsapplicantmaster.expectedfromsalary,
expectedtosalary: res.hrmsapplicantmaster.expectedtosalary,
noticeperiod: res.hrmsapplicantmaster.noticeperiod,
passportnumber: res.hrmsapplicantmaster.passportnumber,
issuecountry: res.hrmsapplicantmaster.issuecountry,
issuecountrydesc: res.hrmsapplicantmaster.issuecountrydesc,
issuedate: this.ngbDateParserFormatter.parse(res.hrmsapplicantmaster.issuedate),
expirydate: this.ngbDateParserFormatter.parse(res.hrmsapplicantmaster.expirydate),
nationality: res.hrmsapplicantmaster.nationality,
nationalitydesc: res.hrmsapplicantmaster.nationalitydesc,
locationpreference: res.hrmsapplicantmaster.locationpreference,
locationpreferencedesc: res.hrmsapplicantmaster.locationpreferencedesc,
address1: res.hrmsapplicantmaster.address1,
address2: res.hrmsapplicantmaster.address2,
countryid: res.hrmsapplicantmaster.countryid,
countryiddesc: res.hrmsapplicantmaster.countryiddesc,
stateid: res.hrmsapplicantmaster.stateid,
stateiddesc: res.hrmsapplicantmaster.stateiddesc,
cityid: res.hrmsapplicantmaster.cityid,
cityiddesc: res.hrmsapplicantmaster.cityiddesc,
pincode: res.hrmsapplicantmaster.pincode,
reference1: res.hrmsapplicantmaster.reference1,
reference1mobile: res.hrmsapplicantmaster.reference1mobile,
reference1email: res.hrmsapplicantmaster.reference1email,
reference2: res.hrmsapplicantmaster.reference2,
reference2mobile: res.hrmsapplicantmaster.reference2mobile,
reference2email: res.hrmsapplicantmaster.reference2email,
attachment: JSON.parse(res.hrmsapplicantmaster.attachment),
customfield: res.hrmsapplicantmaster.customfield,
remarks: res.hrmsapplicantmaster.remarks,
rejectiontill: this.ngbDateParserFormatter.parse(res.hrmsapplicantmaster.rejectiontill),
status: res.hrmsapplicantmaster.status,
statusdesc: res.hrmsapplicantmaster.statusdesc,
});
this.hrmsinterviewschedulesvisiblelist=res.hrmsinterviewschedulesvisiblelist;
this.hrmsapplicantoffersvisiblelist=res.hrmsapplicantoffersvisiblelist;
this.hrmsapplicantcareersvisiblelist=res.hrmsapplicantcareersvisiblelist;
this.hrmsapplicanteducationsvisiblelist=res.hrmsapplicanteducationsvisiblelist;
this.hrmsapplicantskillsvisiblelist=res.hrmsapplicantskillsvisiblelist;
this.hrmsmprapplicantsvisiblelist=res.hrmsmprapplicantsvisiblelist;
if(this.hrmsapplicantmasterForm.get('customfield').value!=null && this.hrmsapplicantmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hrmsapplicantmasterForm.get('customfield').value);
this.FillCustomField();
if(this.hrmsapplicantmasterForm.get('attachment').value!=null && this.hrmsapplicantmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsapplicantmasterForm.get('attachment').value);
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
//Child Tables if any
this.hrmsapplicantmasterservice.hrmsinterviewschedules = res.hrmsinterviewschedules;
this.SethrmsinterviewschedulesTableConfig();
this.hrmsinterviewschedulesLoadTable();
  setTimeout(() => {
  this.SethrmsinterviewschedulesTableddConfig();
  });
this.hrmsapplicantmasterservice.hrmsapplicantoffers = res.hrmsapplicantoffers;
this.SethrmsapplicantoffersTableConfig();
this.hrmsapplicantoffersLoadTable();
  setTimeout(() => {
  this.SethrmsapplicantoffersTableddConfig();
  });
this.hrmsapplicantmasterservice.hrmsapplicantcareers = res.hrmsapplicantcareers;
this.SethrmsapplicantcareersTableConfig();
this.hrmsapplicantcareersLoadTable();
  setTimeout(() => {
  this.SethrmsapplicantcareersTableddConfig();
  });
this.hrmsapplicantmasterservice.hrmsapplicanteducations = res.hrmsapplicanteducations;
this.SethrmsapplicanteducationsTableConfig();
this.hrmsapplicanteducationsLoadTable();
  setTimeout(() => {
  this.SethrmsapplicanteducationsTableddConfig();
  });
this.hrmsapplicantmasterservice.hrmsapplicantskills = res.hrmsapplicantskills;
this.SethrmsapplicantskillsTableConfig();
this.hrmsapplicantskillsLoadTable();
  setTimeout(() => {
  this.SethrmsapplicantskillsTableddConfig();
  });
this.hrmsapplicantmasterservice.hrmsmprapplicants = res.hrmsmprapplicants;
this.SethrmsmprapplicantsTableConfig();
this.hrmsmprapplicantsLoadTable();
  setTimeout(() => {
  this.SethrmsmprapplicantsTableddConfig();
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
  for (let key in this.hrmsapplicantmasterForm.controls) {
    if (this.hrmsapplicantmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsapplicantmasterservice.formData!=null && this.hrmsapplicantmasterservice.formData[key]!=null  && this.hrmsapplicantmasterservice.formData[key]!='[]' && this.hrmsapplicantmasterservice.formData[key]!=undefined && this.hrmsapplicantmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsapplicantmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsapplicantmasterservice.formData!=null && this.hrmsapplicantmasterservice.formData[key]!=null   && this.hrmsapplicantmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsapplicantmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsapplicantmasterservice.formData!=null && this.hrmsapplicantmasterservice.formData[key]!=null   && this.hrmsapplicantmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsapplicantmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsapplicantmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsapplicantmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsapplicantmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hrmsapplicantmasterForm.value;
obj.applicationdate=new Date(this.hrmsapplicantmasterForm.get('applicationdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('applicationdate').value)+'  UTC' :null);
obj.dob=new Date(this.hrmsapplicantmasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('dob').value)+'  UTC' :null);
obj.issuedate=new Date(this.hrmsapplicantmasterForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('issuedate').value)+'  UTC' :null);
obj.expirydate=new Date(this.hrmsapplicantmasterForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('expirydate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.rejectiontill=new Date(this.hrmsapplicantmasterForm.get('rejectiontill').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('rejectiontill').value)+'  UTC' :null);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private hrmsapplicantmastertoggleOption(){
this.hrmsapplicantmastershowOption = this.hrmsapplicantmastershowOption === true ? false : true;
}

private hrmsinterviewscheduletoggleOption(){
this.hrmsinterviewscheduleshowOption = this.hrmsinterviewscheduleshowOption === true ? false : true;
}

private hrmsapplicantoffertoggleOption(){
this.hrmsapplicantoffershowOption = this.hrmsapplicantoffershowOption === true ? false : true;
}

private hrmsapplicantcareertoggleOption(){
this.hrmsapplicantcareershowOption = this.hrmsapplicantcareershowOption === true ? false : true;
}

private hrmsapplicanteducationtoggleOption(){
this.hrmsapplicanteducationshowOption = this.hrmsapplicanteducationshowOption === true ? false : true;
}

private hrmsapplicantskilltoggleOption(){
this.hrmsapplicantskillshowOption = this.hrmsapplicantskillshowOption === true ? false : true;
}

private hrmsmprapplicanttoggleOption(){
this.hrmsmprapplicantshowOption = this.hrmsmprapplicantshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsapplicantmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsapplicantmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsapplicantmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsapplicantmasterservice.formData=this.hrmsapplicantmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsapplicantmasterForm.controls[key] != null)
    {
        this.hrmsapplicantmasterservice.formData[key] = this.hrmsapplicantmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hrmsapplicantmasterservice.formData.applicationdate=new Date(this.hrmsapplicantmasterForm.get('applicationdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('applicationdate').value)+'  UTC' :null);
this.hrmsapplicantmasterservice.formData.dob=new Date(this.hrmsapplicantmasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('dob').value)+'  UTC' :null);
this.hrmsapplicantmasterservice.formData.issuedate=new Date(this.hrmsapplicantmasterForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('issuedate').value)+'  UTC' :null);
this.hrmsapplicantmasterservice.formData.expirydate=new Date(this.hrmsapplicantmasterForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('expirydate').value)+'  UTC' :null);
this.hrmsapplicantmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmsapplicantmasterservice.formData.customfield=JSON.stringify(customfields);
this.hrmsapplicantmasterservice.formData.rejectiontill=new Date(this.hrmsapplicantmasterForm.get('rejectiontill').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantmasterForm.get('rejectiontill').value)+'  UTC' :null);
this.hrmsapplicantmasterservice.formData.DeletedhrmsinterviewscheduleIDs = this.DeletedhrmsinterviewscheduleIDs;
this.hrmsapplicantmasterservice.formData.DeletedhrmsapplicantofferIDs = this.DeletedhrmsapplicantofferIDs;
this.hrmsapplicantmasterservice.formData.DeletedhrmsapplicantcareerIDs = this.DeletedhrmsapplicantcareerIDs;
this.hrmsapplicantmasterservice.formData.DeletedhrmsapplicanteducationIDs = this.DeletedhrmsapplicanteducationIDs;
this.hrmsapplicantmasterservice.formData.DeletedhrmsapplicantskillIDs = this.DeletedhrmsapplicantskillIDs;
this.hrmsapplicantmasterservice.formData.DeletedhrmsmprapplicantIDs = this.DeletedhrmsmprapplicantIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsapplicantmasterservice.formData);
this.hrmsapplicantmasterservice.formData=this.hrmsapplicantmasterForm.value;
this.hrmsapplicantmasterservice.saveOrUpdatehrmsapplicantmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmsinterviewschedulessource.data)
{
    for (let i = 0; i < this.hrmsinterviewschedulessource.data.length; i++)
    {
        if (this.hrmsinterviewschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinterviewschedulessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsapplicantofferssource.data)
{
    for (let i = 0; i < this.hrmsapplicantofferssource.data.length; i++)
    {
        if (this.hrmsapplicantofferssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsapplicantofferssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsapplicantcareerssource.data)
{
    for (let i = 0; i < this.hrmsapplicantcareerssource.data.length; i++)
    {
        if (this.hrmsapplicantcareerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsapplicantcareerssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsapplicanteducationssource.data)
{
    for (let i = 0; i < this.hrmsapplicanteducationssource.data.length; i++)
    {
        if (this.hrmsapplicanteducationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsapplicanteducationssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsapplicantskillssource.data)
{
    for (let i = 0; i < this.hrmsapplicantskillssource.data.length; i++)
    {
        if (this.hrmsapplicantskillssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsapplicantskillssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsmprapplicantssource.data)
{
    for (let i = 0; i < this.hrmsmprapplicantssource.data.length; i++)
    {
        if (this.hrmsmprapplicantssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsmprapplicantssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsapplicantmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsapplicantmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsapplicantmaster);
}
else
{
this.FillData(res);
}
}
this.hrmsapplicantmasterForm.markAsUntouched();
this.hrmsapplicantmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditapplicantid( applicantid) {
/*let ScreenType='2';
this.dialog.open(hrmsapplicantmasterComponent, 
{
data: {applicantid:this.hrmsapplicantmasterForm.get('applicantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditjobrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsapplicantmasterForm.get('jobrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsapplicantmasterForm.get('department').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsuitableposition( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsapplicantmasterForm.get('suitableposition').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditissuecountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.hrmsapplicantmasterForm.get('issuecountry').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationpreference( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.hrmsapplicantmasterForm.get('locationpreference').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.hrmsapplicantmasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.hrmsapplicantmasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.hrmsapplicantmasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsinterviewschedule(event:any,interviewid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsinterviewscheduleComponent, 
{
data:  {  showview:false,save:false,event,interviewid, applicantid,visiblelist:this.hrmsinterviewschedulesvisiblelist,  hidelist:this.hrmsinterviewscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsinterviewschedulessource.add(res);
this.hrmsinterviewschedulessource.refresh();
}
else
{
this.hrmsinterviewschedulessource.update(event.data, res);
}
}
});
}

onDeletehrmsinterviewschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsinterviewscheduleIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsinterviewschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsapplicantoffer(event:any,offerid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsapplicantofferComponent, 
{
data:  {  showview:false,save:false,event,offerid, applicantid,visiblelist:this.hrmsapplicantoffersvisiblelist,  hidelist:this.hrmsapplicantoffershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsapplicantofferssource.add(res);
this.hrmsapplicantofferssource.refresh();
}
else
{
this.hrmsapplicantofferssource.update(event.data, res);
}
}
});
}

onDeletehrmsapplicantoffer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsapplicantofferIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsapplicantoffers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsapplicantcareer(event:any,hacid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsapplicantcareerComponent, 
{
data:  {  showview:false,save:false,event,hacid, applicantid,visiblelist:this.hrmsapplicantcareersvisiblelist,  hidelist:this.hrmsapplicantcareershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsapplicantcareerssource.add(res);
this.hrmsapplicantcareerssource.refresh();
}
else
{
this.hrmsapplicantcareerssource.update(event.data, res);
}
}
});
}

onDeletehrmsapplicantcareer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsapplicantcareerIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsapplicantcareers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsapplicanteducation(event:any,haeid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsapplicanteducationComponent, 
{
data:  {  showview:false,save:false,event,haeid, applicantid,visiblelist:this.hrmsapplicanteducationsvisiblelist,  hidelist:this.hrmsapplicanteducationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsapplicanteducationssource.add(res);
this.hrmsapplicanteducationssource.refresh();
}
else
{
this.hrmsapplicanteducationssource.update(event.data, res);
}
}
});
}

onDeletehrmsapplicanteducation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsapplicanteducationIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsapplicanteducations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsapplicantskill(event:any,skillid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsapplicantskillComponent, 
{
data:  {  showview:false,save:false,event,skillid, applicantid,visiblelist:this.hrmsapplicantskillsvisiblelist,  hidelist:this.hrmsapplicantskillshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsapplicantskillssource.add(res);
this.hrmsapplicantskillssource.refresh();
}
else
{
this.hrmsapplicantskillssource.update(event.data, res);
}
}
});
}

onDeletehrmsapplicantskill(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsapplicantskillIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsapplicantskills.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsmprapplicant(event:any,mprapplicantid:any, applicantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsmprapplicantComponent, 
{
data:  {  showview:false,save:false,event,mprapplicantid, applicantid,visiblelist:this.hrmsmprapplicantsvisiblelist,  hidelist:this.hrmsmprapplicantshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsmprapplicantssource.add(res);
this.hrmsmprapplicantssource.refresh();
}
else
{
this.hrmsmprapplicantssource.update(event.data, res);
}
}
});
}

onDeletehrmsmprapplicant(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsmprapplicantIDs += childID + ",";
this.hrmsapplicantmasterservice.hrmsmprapplicants.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsinterviewschedules
hrmsinterviewschedulessettings:any;
hrmsinterviewschedulessource: any;

showhrmsinterviewschedulesCheckbox()
{
debugger;
if(this.tblhrmsinterviewschedulessource.settings['selectMode']== 'multi')this.tblhrmsinterviewschedulessource.settings['selectMode']= 'single';
else
this.tblhrmsinterviewschedulessource.settings['selectMode']= 'multi';
this.tblhrmsinterviewschedulessource.initGrid();
}
deletehrmsinterviewschedulesAll()
{
this.tblhrmsinterviewschedulessource.settings['selectMode'] = 'single';
}
showhrmsinterviewschedulesFilter()
{
  setTimeout(() => {
  this.SethrmsinterviewschedulesTableddConfig();
  });
      if(this.tblhrmsinterviewschedulessource.settings!=null)this.tblhrmsinterviewschedulessource.settings['hideSubHeader'] =!this.tblhrmsinterviewschedulessource.settings['hideSubHeader'];
this.tblhrmsinterviewschedulessource.initGrid();
}
showhrmsinterviewschedulesInActive()
{
}
enablehrmsinterviewschedulesInActive()
{
}
async SethrmsinterviewschedulesTableddConfig()
{
if(!this.bfilterPopulatehrmsinterviewschedules){
}
this.bfilterPopulatehrmsinterviewschedules=true;
}
async hrmsinterviewschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsinterviewschedulesTableConfig()
{
this.hrmsinterviewschedulessettings = {
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
interviewreference: {
title: 'Interview Reference',
type: '',
filter:true,
},
},
};
}
hrmsinterviewschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewschedulesID)>=0)
{
this.hrmsinterviewschedulessource=new LocalDataSource();
this.hrmsinterviewschedulessource.load(this.hrmsapplicantmasterservice.hrmsinterviewschedules as  any as LocalDataSource);
this.hrmsinterviewschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsinterviewschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsinterviewschedules.length == 0)
{
    this.tblhrmsinterviewschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinterviewschedule();
    this.hrmsapplicantmasterservice.hrmsinterviewschedules.push(obj);
    this.hrmsinterviewschedulessource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsinterviewschedules.length / this.hrmsinterviewschedulessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinterviewschedulessource.getPaging().page)
    {
        this.hrmsinterviewschedulessource.setPage((this.hrmsapplicantmasterservice.hrmsinterviewschedules.length / this.hrmsinterviewschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsinterviewschedulessource.grid.edit(this.tblhrmsinterviewschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsinterviewschedulessource.data.indexOf(event.data);
this.onDeletehrmsinterviewschedule(event,event.data.interviewid,((this.hrmsinterviewschedulessource.getPaging().page-1) *this.hrmsinterviewschedulessource.getPaging().perPage)+index);
this.hrmsinterviewschedulessource.refresh();
break;
}
}

*/
hrmsinterviewschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsinterviewschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsinterviewschedule(event,event.data.interviewid,this.formid);
break;
case 'delete':
this.onDeletehrmsinterviewschedule(event,event.data.interviewid,((this.hrmsinterviewschedulessource.getPaging().page-1) *this.hrmsinterviewschedulessource.getPaging().perPage)+event.index);
this.hrmsinterviewschedulessource.refresh();
break;
}
}
hrmsinterviewschedulesonDelete(obj) {
let interviewid=obj.data.interviewid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(interviewid).then(res=>
this.hrmsinterviewschedulesLoadTable()
);
}
}
hrmsinterviewschedulesPaging(val)
{
debugger;
this.hrmsinterviewschedulessource.setPaging(1, val, true);
}

handlehrmsinterviewschedulesGridSelected(event:any) {
this.hrmsinterviewschedulesselectedindex=this.hrmsapplicantmasterservice.hrmsinterviewschedules.findIndex(i => i.interviewid === event.data.interviewid);
}
IshrmsinterviewschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsinterviewschedules
//start of Grid Codes hrmsapplicantoffers
hrmsapplicantofferssettings:any;
hrmsapplicantofferssource: any;

showhrmsapplicantoffersCheckbox()
{
debugger;
if(this.tblhrmsapplicantofferssource.settings['selectMode']== 'multi')this.tblhrmsapplicantofferssource.settings['selectMode']= 'single';
else
this.tblhrmsapplicantofferssource.settings['selectMode']= 'multi';
this.tblhrmsapplicantofferssource.initGrid();
}
deletehrmsapplicantoffersAll()
{
this.tblhrmsapplicantofferssource.settings['selectMode'] = 'single';
}
showhrmsapplicantoffersFilter()
{
  setTimeout(() => {
  this.SethrmsapplicantoffersTableddConfig();
  });
      if(this.tblhrmsapplicantofferssource.settings!=null)this.tblhrmsapplicantofferssource.settings['hideSubHeader'] =!this.tblhrmsapplicantofferssource.settings['hideSubHeader'];
this.tblhrmsapplicantofferssource.initGrid();
}
showhrmsapplicantoffersInActive()
{
}
enablehrmsapplicantoffersInActive()
{
}
async SethrmsapplicantoffersTableddConfig()
{
if(!this.bfilterPopulatehrmsapplicantoffers){

this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsList().then(res=>
{
var datamprid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantoffersmprid3.push(defaultobj);
for(let i=0; i<datamprid2.length; i++){
var obj= { value: datamprid2[i].mprid, title:datamprid2[i].mprreference};
this.datahrmsapplicantoffersmprid3.push(obj);
}
if((this.tblhrmsapplicantofferssource.settings as any).columns['mprid'])
{
(this.tblhrmsapplicantofferssource.settings as any).columns['mprid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantoffersmprid3));
this.tblhrmsapplicantofferssource.initGrid();
}
});

this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesList().then(res=>
{
var datainterviewid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantoffersinterviewid3.push(defaultobj);
for(let i=0; i<datainterviewid2.length; i++){
var obj= { value: datainterviewid2[i].interviewid, title:datainterviewid2[i].interviewreference};
this.datahrmsapplicantoffersinterviewid3.push(obj);
}
if((this.tblhrmsapplicantofferssource.settings as any).columns['interviewid'])
{
(this.tblhrmsapplicantofferssource.settings as any).columns['interviewid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantoffersinterviewid3));
this.tblhrmsapplicantofferssource.initGrid();
}
});

this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res=>
{
var dataapplicantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantoffersapplicantid3.push(defaultobj);
for(let i=0; i<dataapplicantid2.length; i++){
var obj= { value: dataapplicantid2[i].applicantid, title:dataapplicantid2[i].applicantname};
this.datahrmsapplicantoffersapplicantid3.push(obj);
}
if((this.tblhrmsapplicantofferssource.settings as any).columns['applicantid'])
{
(this.tblhrmsapplicantofferssource.settings as any).columns['applicantid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantoffersapplicantid3));
this.tblhrmsapplicantofferssource.initGrid();
}
});

this.bomasterdataservice.getList("qghhe").then(res=>
{
var datadepartment2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantoffersdepartment3.push(defaultobj);
for(let i=0; i<datadepartment2.length; i++){
var obj= { value: datadepartment2[i].masterdataid, title:datadepartment2[i].masterdatadescription};
this.datahrmsapplicantoffersdepartment3.push(obj);
}
if((this.tblhrmsapplicantofferssource.settings as any).columns['department'])
{
(this.tblhrmsapplicantofferssource.settings as any).columns['department'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantoffersdepartment3));
this.tblhrmsapplicantofferssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantoffersemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].userid, title:dataemployeeid2[i].username};
this.datahrmsapplicantoffersemployeeid3.push(obj);
}
if((this.tblhrmsapplicantofferssource.settings as any).columns['employeeid'])
{
(this.tblhrmsapplicantofferssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantoffersemployeeid3));
this.tblhrmsapplicantofferssource.initGrid();
}
});
}
this.bfilterPopulatehrmsapplicantoffers=true;
}
async hrmsapplicantoffersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsapplicantoffersTableConfig()
{
this.hrmsapplicantofferssettings = {
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
mprid: {
title: 'M P R',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'gjoeq',reportcode:'gjoeq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantoffersmprid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
interviewid: {
title: 'Interview',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'p2cyp',reportcode:'p2cyp',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantoffersinterviewid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
offerdate: {
title: 'Offer Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
joiningdate: {
title: 'Joining Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
referenceno: {
title: 'Reference No',
type: '',
filter:true,
},
applicantcode: {
title: 'Applicant Code',
type: '',
filter:true,
},
applicantname: {
title: 'Applicant Name',
type: '',
filter:true,
},
title: {
title: 'Title',
type: '',
filter:true,
},
department: {
title: 'Department',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantoffersdepartment3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
location: {
title: 'Location',
type: 'number',
filter:true,
},
salarytype: {
title: 'Salary Type',
type: '',
filter:true,
},
basic: {
title: 'Basic',
type: 'number',
filter:true,
},
allowances: {
title: 'Allowances',
type: 'number',
filter:true,
},
grosssalary: {
title: 'Gross Salary',
type: 'number',
filter:true,
},
deductions: {
title: 'Deductions',
type: 'number',
filter:true,
},
taxallowed: {
title: 'Tax Allowed',
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
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
netsalary: {
title: 'Net Salary',
type: 'number',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
approvaldate: {
title: 'Approval Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offersentdate: {
title: 'Offer Sent Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
acknowledged: {
title: 'Acknowledged',
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
acknowledgedate: {
title: 'Acknowledge Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
joineddate: {
title: 'Joined Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offerstatus: {
title: 'Offer Status',
type: '',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantoffersemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsapplicantoffersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantoffersID)>=0)
{
this.hrmsapplicantofferssource=new LocalDataSource();
this.hrmsapplicantofferssource.load(this.hrmsapplicantmasterservice.hrmsapplicantoffers as  any as LocalDataSource);
this.hrmsapplicantofferssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsapplicantoffersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsapplicantoffers.length == 0)
{
    this.tblhrmsapplicantofferssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsapplicantoffer();
    this.hrmsapplicantmasterservice.hrmsapplicantoffers.push(obj);
    this.hrmsapplicantofferssource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsapplicantoffers.length / this.hrmsapplicantofferssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsapplicantofferssource.getPaging().page)
    {
        this.hrmsapplicantofferssource.setPage((this.hrmsapplicantmasterservice.hrmsapplicantoffers.length / this.hrmsapplicantofferssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsapplicantofferssource.grid.edit(this.tblhrmsapplicantofferssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsapplicantofferssource.data.indexOf(event.data);
this.onDeletehrmsapplicantoffer(event,event.data.offerid,((this.hrmsapplicantofferssource.getPaging().page-1) *this.hrmsapplicantofferssource.getPaging().perPage)+index);
this.hrmsapplicantofferssource.refresh();
break;
}
}

*/
hrmsapplicantoffersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsapplicantoffer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsapplicantoffer(event,event.data.offerid,this.formid);
break;
case 'delete':
this.onDeletehrmsapplicantoffer(event,event.data.offerid,((this.hrmsapplicantofferssource.getPaging().page-1) *this.hrmsapplicantofferssource.getPaging().perPage)+event.index);
this.hrmsapplicantofferssource.refresh();
break;
}
}
hrmsapplicantoffersonDelete(obj) {
let offerid=obj.data.offerid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(offerid).then(res=>
this.hrmsapplicantoffersLoadTable()
);
}
}
hrmsapplicantoffersPaging(val)
{
debugger;
this.hrmsapplicantofferssource.setPaging(1, val, true);
}

handlehrmsapplicantoffersGridSelected(event:any) {
this.hrmsapplicantoffersselectedindex=this.hrmsapplicantmasterservice.hrmsapplicantoffers.findIndex(i => i.offerid === event.data.offerid);
}
IshrmsapplicantoffersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantoffersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsapplicantoffers
//start of Grid Codes hrmsapplicantcareers
hrmsapplicantcareerssettings:any;
hrmsapplicantcareerssource: any;

showhrmsapplicantcareersCheckbox()
{
debugger;
if(this.tblhrmsapplicantcareerssource.settings['selectMode']== 'multi')this.tblhrmsapplicantcareerssource.settings['selectMode']= 'single';
else
this.tblhrmsapplicantcareerssource.settings['selectMode']= 'multi';
this.tblhrmsapplicantcareerssource.initGrid();
}
deletehrmsapplicantcareersAll()
{
this.tblhrmsapplicantcareerssource.settings['selectMode'] = 'single';
}
showhrmsapplicantcareersFilter()
{
  setTimeout(() => {
  this.SethrmsapplicantcareersTableddConfig();
  });
      if(this.tblhrmsapplicantcareerssource.settings!=null)this.tblhrmsapplicantcareerssource.settings['hideSubHeader'] =!this.tblhrmsapplicantcareerssource.settings['hideSubHeader'];
this.tblhrmsapplicantcareerssource.initGrid();
}
showhrmsapplicantcareersInActive()
{
}
enablehrmsapplicantcareersInActive()
{
}
async SethrmsapplicantcareersTableddConfig()
{
if(!this.bfilterPopulatehrmsapplicantcareers){

this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res=>
{
var dataapplicantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantcareersapplicantid3.push(defaultobj);
for(let i=0; i<dataapplicantid2.length; i++){
var obj= { value: dataapplicantid2[i].applicantid, title:dataapplicantid2[i].applicantname};
this.datahrmsapplicantcareersapplicantid3.push(obj);
}
if((this.tblhrmsapplicantcareerssource.settings as any).columns['applicantid'])
{
(this.tblhrmsapplicantcareerssource.settings as any).columns['applicantid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantcareersapplicantid3));
this.tblhrmsapplicantcareerssource.initGrid();
}
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var datamappedtoourrole2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantcareersmappedtoourrole3.push(defaultobj);
for(let i=0; i<datamappedtoourrole2.length; i++){
var obj= { value: datamappedtoourrole2[i].userroleid, title:datamappedtoourrole2[i].userrole};
this.datahrmsapplicantcareersmappedtoourrole3.push(obj);
}
if((this.tblhrmsapplicantcareerssource.settings as any).columns['mappedtoourrole'])
{
(this.tblhrmsapplicantcareerssource.settings as any).columns['mappedtoourrole'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantcareersmappedtoourrole3));
this.tblhrmsapplicantcareerssource.initGrid();
}
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantcareerscurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.datahrmsapplicantcareerscurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsapplicantcareerssource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicantcareerscurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicantcareerscurrency3)), }, };
this.tblhrmsapplicantcareerssource.settings =  clone;
this.tblhrmsapplicantcareerssource.initGrid();
});
}
this.bfilterPopulatehrmsapplicantcareers=true;
}
async hrmsapplicantcareersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsapplicantcareersTableConfig()
{
this.hrmsapplicantcareerssettings = {
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
employer: {
title: 'Employer',
type: '',
filter:true,
},
fromdate: {
title: 'From Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
todate: {
title: 'To Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
totalmonths: {
title: 'Total Months',
type: 'number',
filter:true,
},
designation: {
title: 'Designation',
type: '',
filter:true,
},
mappedtoourrole: {
title: 'Mapped To Our Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantcareersmappedtoourrole3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
responsibilities: {
title: 'Responsibilities',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantcareerscurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
salary: {
title: 'Salary',
type: 'number',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsapplicantcareersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantcareersID)>=0)
{
this.hrmsapplicantcareerssource=new LocalDataSource();
this.hrmsapplicantcareerssource.load(this.hrmsapplicantmasterservice.hrmsapplicantcareers as  any as LocalDataSource);
this.hrmsapplicantcareerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsapplicantcareersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsapplicantcareers.length == 0)
{
    this.tblhrmsapplicantcareerssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsapplicantcareer();
    this.hrmsapplicantmasterservice.hrmsapplicantcareers.push(obj);
    this.hrmsapplicantcareerssource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsapplicantcareers.length / this.hrmsapplicantcareerssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsapplicantcareerssource.getPaging().page)
    {
        this.hrmsapplicantcareerssource.setPage((this.hrmsapplicantmasterservice.hrmsapplicantcareers.length / this.hrmsapplicantcareerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsapplicantcareerssource.grid.edit(this.tblhrmsapplicantcareerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsapplicantcareerssource.data.indexOf(event.data);
this.onDeletehrmsapplicantcareer(event,event.data.hacid,((this.hrmsapplicantcareerssource.getPaging().page-1) *this.hrmsapplicantcareerssource.getPaging().perPage)+index);
this.hrmsapplicantcareerssource.refresh();
break;
}
}

*/
hrmsapplicantcareersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsapplicantcareer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsapplicantcareer(event,event.data.hacid,this.formid);
break;
case 'delete':
this.onDeletehrmsapplicantcareer(event,event.data.hacid,((this.hrmsapplicantcareerssource.getPaging().page-1) *this.hrmsapplicantcareerssource.getPaging().perPage)+event.index);
this.hrmsapplicantcareerssource.refresh();
break;
}
}
hrmsapplicantcareersonDelete(obj) {
let hacid=obj.data.hacid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(hacid).then(res=>
this.hrmsapplicantcareersLoadTable()
);
}
}
hrmsapplicantcareersPaging(val)
{
debugger;
this.hrmsapplicantcareerssource.setPaging(1, val, true);
}

handlehrmsapplicantcareersGridSelected(event:any) {
this.hrmsapplicantcareersselectedindex=this.hrmsapplicantmasterservice.hrmsapplicantcareers.findIndex(i => i.hacid === event.data.hacid);
}
IshrmsapplicantcareersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantcareersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsapplicantcareers
//start of Grid Codes hrmsapplicanteducations
hrmsapplicanteducationssettings:any;
hrmsapplicanteducationssource: any;

showhrmsapplicanteducationsCheckbox()
{
debugger;
if(this.tblhrmsapplicanteducationssource.settings['selectMode']== 'multi')this.tblhrmsapplicanteducationssource.settings['selectMode']= 'single';
else
this.tblhrmsapplicanteducationssource.settings['selectMode']= 'multi';
this.tblhrmsapplicanteducationssource.initGrid();
}
deletehrmsapplicanteducationsAll()
{
this.tblhrmsapplicanteducationssource.settings['selectMode'] = 'single';
}
showhrmsapplicanteducationsFilter()
{
  setTimeout(() => {
  this.SethrmsapplicanteducationsTableddConfig();
  });
      if(this.tblhrmsapplicanteducationssource.settings!=null)this.tblhrmsapplicanteducationssource.settings['hideSubHeader'] =!this.tblhrmsapplicanteducationssource.settings['hideSubHeader'];
this.tblhrmsapplicanteducationssource.initGrid();
}
showhrmsapplicanteducationsInActive()
{
}
enablehrmsapplicanteducationsInActive()
{
}
async SethrmsapplicanteducationsTableddConfig()
{
if(!this.bfilterPopulatehrmsapplicanteducations){

this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res=>
{
var dataapplicantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicanteducationsapplicantid3.push(defaultobj);
for(let i=0; i<dataapplicantid2.length; i++){
var obj= { value: dataapplicantid2[i].applicantid, title:dataapplicantid2[i].applicantname};
this.datahrmsapplicanteducationsapplicantid3.push(obj);
}
if((this.tblhrmsapplicanteducationssource.settings as any).columns['applicantid'])
{
(this.tblhrmsapplicanteducationssource.settings as any).columns['applicantid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicanteducationsapplicantid3));
this.tblhrmsapplicanteducationssource.initGrid();
}
});

this.configservice.getList("qualification").then(res=>
{
var dataeducation2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicanteducationseducation3.push(defaultobj);
for(let i=0; i<dataeducation2.length; i++){
var obj= { value: dataeducation2[i].configkey, title: dataeducation2[i].configtext};
this.datahrmsapplicanteducationseducation3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsapplicanteducationssource.settings);
if(clone.columns['education']!=undefined)clone.columns['education'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationseducation3)), }, };
if(clone.columns['education']!=undefined)clone.columns['education'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationseducation3)), }, };
this.tblhrmsapplicanteducationssource.settings =  clone;
this.tblhrmsapplicanteducationssource.initGrid();
});

this.configservice.getList("grade").then(res=>
{
var datagrade2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicanteducationsgrade3.push(defaultobj);
for(let i=0; i<datagrade2.length; i++){
var obj= { value: datagrade2[i].configkey, title: datagrade2[i].configtext};
this.datahrmsapplicanteducationsgrade3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsapplicanteducationssource.settings);
if(clone.columns['grade']!=undefined)clone.columns['grade'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationsgrade3)), }, };
if(clone.columns['grade']!=undefined)clone.columns['grade'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationsgrade3)), }, };
this.tblhrmsapplicanteducationssource.settings =  clone;
this.tblhrmsapplicanteducationssource.initGrid();
});

this.configservice.getList("completionstatus").then(res=>
{
var datacompletionstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicanteducationscompletionstatus3.push(defaultobj);
for(let i=0; i<datacompletionstatus2.length; i++){
var obj= { value: datacompletionstatus2[i].configkey, title: datacompletionstatus2[i].configtext};
this.datahrmsapplicanteducationscompletionstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsapplicanteducationssource.settings);
if(clone.columns['completionstatus']!=undefined)clone.columns['completionstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationscompletionstatus3)), }, };
if(clone.columns['completionstatus']!=undefined)clone.columns['completionstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicanteducationscompletionstatus3)), }, };
this.tblhrmsapplicanteducationssource.settings =  clone;
this.tblhrmsapplicanteducationssource.initGrid();
});
}
this.bfilterPopulatehrmsapplicanteducations=true;
}
async hrmsapplicanteducationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsapplicanteducationsTableConfig()
{
this.hrmsapplicanteducationssettings = {
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
education: {
title: 'Education',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicanteducationseducation3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
specialization: {
title: 'Specialization',
type: '',
filter:true,
},
fromyear: {
title: 'From Year',
type: 'number',
filter:true,
},
toyear: {
title: 'To Year',
type: 'number',
filter:true,
},
institution: {
title: 'Institution',
type: '',
filter:true,
},
percentage: {
title: 'Percentage',
type: 'number',
filter:true,
},
grade: {
title: 'Grade',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicanteducationsgrade3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
completionstatus: {
title: 'Completion Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicanteducationscompletionstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsapplicanteducationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicanteducationsID)>=0)
{
this.hrmsapplicanteducationssource=new LocalDataSource();
this.hrmsapplicanteducationssource.load(this.hrmsapplicantmasterservice.hrmsapplicanteducations as  any as LocalDataSource);
this.hrmsapplicanteducationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsapplicanteducationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsapplicanteducations.length == 0)
{
    this.tblhrmsapplicanteducationssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsapplicanteducation();
    this.hrmsapplicantmasterservice.hrmsapplicanteducations.push(obj);
    this.hrmsapplicanteducationssource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsapplicanteducations.length / this.hrmsapplicanteducationssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsapplicanteducationssource.getPaging().page)
    {
        this.hrmsapplicanteducationssource.setPage((this.hrmsapplicantmasterservice.hrmsapplicanteducations.length / this.hrmsapplicanteducationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsapplicanteducationssource.grid.edit(this.tblhrmsapplicanteducationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsapplicanteducationssource.data.indexOf(event.data);
this.onDeletehrmsapplicanteducation(event,event.data.haeid,((this.hrmsapplicanteducationssource.getPaging().page-1) *this.hrmsapplicanteducationssource.getPaging().perPage)+index);
this.hrmsapplicanteducationssource.refresh();
break;
}
}

*/
hrmsapplicanteducationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsapplicanteducation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsapplicanteducation(event,event.data.haeid,this.formid);
break;
case 'delete':
this.onDeletehrmsapplicanteducation(event,event.data.haeid,((this.hrmsapplicanteducationssource.getPaging().page-1) *this.hrmsapplicanteducationssource.getPaging().perPage)+event.index);
this.hrmsapplicanteducationssource.refresh();
break;
}
}
hrmsapplicanteducationsonDelete(obj) {
let haeid=obj.data.haeid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(haeid).then(res=>
this.hrmsapplicanteducationsLoadTable()
);
}
}
hrmsapplicanteducationsPaging(val)
{
debugger;
this.hrmsapplicanteducationssource.setPaging(1, val, true);
}

handlehrmsapplicanteducationsGridSelected(event:any) {
this.hrmsapplicanteducationsselectedindex=this.hrmsapplicantmasterservice.hrmsapplicanteducations.findIndex(i => i.haeid === event.data.haeid);
}
IshrmsapplicanteducationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicanteducationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsapplicanteducations
//start of Grid Codes hrmsapplicantskills
hrmsapplicantskillssettings:any;
hrmsapplicantskillssource: any;

showhrmsapplicantskillsCheckbox()
{
debugger;
if(this.tblhrmsapplicantskillssource.settings['selectMode']== 'multi')this.tblhrmsapplicantskillssource.settings['selectMode']= 'single';
else
this.tblhrmsapplicantskillssource.settings['selectMode']= 'multi';
this.tblhrmsapplicantskillssource.initGrid();
}
deletehrmsapplicantskillsAll()
{
this.tblhrmsapplicantskillssource.settings['selectMode'] = 'single';
}
showhrmsapplicantskillsFilter()
{
  setTimeout(() => {
  this.SethrmsapplicantskillsTableddConfig();
  });
      if(this.tblhrmsapplicantskillssource.settings!=null)this.tblhrmsapplicantskillssource.settings['hideSubHeader'] =!this.tblhrmsapplicantskillssource.settings['hideSubHeader'];
this.tblhrmsapplicantskillssource.initGrid();
}
showhrmsapplicantskillsInActive()
{
}
enablehrmsapplicantskillsInActive()
{
}
async SethrmsapplicantskillsTableddConfig()
{
if(!this.bfilterPopulatehrmsapplicantskills){

this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res=>
{
var dataapplicantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantskillsapplicantid3.push(defaultobj);
for(let i=0; i<dataapplicantid2.length; i++){
var obj= { value: dataapplicantid2[i].applicantid, title:dataapplicantid2[i].applicantname};
this.datahrmsapplicantskillsapplicantid3.push(obj);
}
if((this.tblhrmsapplicantskillssource.settings as any).columns['applicantid'])
{
(this.tblhrmsapplicantskillssource.settings as any).columns['applicantid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsapplicantskillsapplicantid3));
this.tblhrmsapplicantskillssource.initGrid();
}
});

this.configservice.getList("m").then(res=>
{
var dataskillcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsapplicantskillsskillcategory3.push(defaultobj);
for(let i=0; i<dataskillcategory2.length; i++){
var obj= { value: dataskillcategory2[i].configkey, title: dataskillcategory2[i].configtext};
this.datahrmsapplicantskillsskillcategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsapplicantskillssource.settings);
if(clone.columns['skillcategory']!=undefined)clone.columns['skillcategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicantskillsskillcategory3)), }, };
if(clone.columns['skillcategory']!=undefined)clone.columns['skillcategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsapplicantskillsskillcategory3)), }, };
this.tblhrmsapplicantskillssource.settings =  clone;
this.tblhrmsapplicantskillssource.initGrid();
});
}
this.bfilterPopulatehrmsapplicantskills=true;
}
async hrmsapplicantskillsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsapplicantskillsTableConfig()
{
this.hrmsapplicantskillssettings = {
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
skillcategory: {
title: 'Skill Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsapplicantskillsskillcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
skilldescription: {
title: 'Skill Description',
type: '',
filter:true,
},
noofyearsused: {
title: 'No Of Years Used',
type: 'number',
filter:true,
},
lastusedyear: {
title: 'Last Used Year',
type: 'number',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsapplicantskillsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantskillsID)>=0)
{
this.hrmsapplicantskillssource=new LocalDataSource();
this.hrmsapplicantskillssource.load(this.hrmsapplicantmasterservice.hrmsapplicantskills as  any as LocalDataSource);
this.hrmsapplicantskillssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsapplicantskillsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsapplicantskills.length == 0)
{
    this.tblhrmsapplicantskillssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsapplicantskill();
    this.hrmsapplicantmasterservice.hrmsapplicantskills.push(obj);
    this.hrmsapplicantskillssource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsapplicantskills.length / this.hrmsapplicantskillssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsapplicantskillssource.getPaging().page)
    {
        this.hrmsapplicantskillssource.setPage((this.hrmsapplicantmasterservice.hrmsapplicantskills.length / this.hrmsapplicantskillssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsapplicantskillssource.grid.edit(this.tblhrmsapplicantskillssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsapplicantskillssource.data.indexOf(event.data);
this.onDeletehrmsapplicantskill(event,event.data.skillid,((this.hrmsapplicantskillssource.getPaging().page-1) *this.hrmsapplicantskillssource.getPaging().perPage)+index);
this.hrmsapplicantskillssource.refresh();
break;
}
}

*/
hrmsapplicantskillsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsapplicantskill(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsapplicantskill(event,event.data.skillid,this.formid);
break;
case 'delete':
this.onDeletehrmsapplicantskill(event,event.data.skillid,((this.hrmsapplicantskillssource.getPaging().page-1) *this.hrmsapplicantskillssource.getPaging().perPage)+event.index);
this.hrmsapplicantskillssource.refresh();
break;
}
}
hrmsapplicantskillsonDelete(obj) {
let skillid=obj.data.skillid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(skillid).then(res=>
this.hrmsapplicantskillsLoadTable()
);
}
}
hrmsapplicantskillsPaging(val)
{
debugger;
this.hrmsapplicantskillssource.setPaging(1, val, true);
}

handlehrmsapplicantskillsGridSelected(event:any) {
this.hrmsapplicantskillsselectedindex=this.hrmsapplicantmasterservice.hrmsapplicantskills.findIndex(i => i.skillid === event.data.skillid);
}
IshrmsapplicantskillsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsapplicantskillsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsapplicantskills
//start of Grid Codes hrmsmprapplicants
hrmsmprapplicantssettings:any;
hrmsmprapplicantssource: any;

showhrmsmprapplicantsCheckbox()
{
debugger;
if(this.tblhrmsmprapplicantssource.settings['selectMode']== 'multi')this.tblhrmsmprapplicantssource.settings['selectMode']= 'single';
else
this.tblhrmsmprapplicantssource.settings['selectMode']= 'multi';
this.tblhrmsmprapplicantssource.initGrid();
}
deletehrmsmprapplicantsAll()
{
this.tblhrmsmprapplicantssource.settings['selectMode'] = 'single';
}
showhrmsmprapplicantsFilter()
{
  setTimeout(() => {
  this.SethrmsmprapplicantsTableddConfig();
  });
      if(this.tblhrmsmprapplicantssource.settings!=null)this.tblhrmsmprapplicantssource.settings['hideSubHeader'] =!this.tblhrmsmprapplicantssource.settings['hideSubHeader'];
this.tblhrmsmprapplicantssource.initGrid();
}
showhrmsmprapplicantsInActive()
{
}
enablehrmsmprapplicantsInActive()
{
}
async SethrmsmprapplicantsTableddConfig()
{
if(!this.bfilterPopulatehrmsmprapplicants){

this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res=>
{
var dataapplicantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsmprapplicantsapplicantid3.push(defaultobj);
for(let i=0; i<dataapplicantid2.length; i++){
var obj= { value: dataapplicantid2[i].applicantid, title:dataapplicantid2[i].applicantname};
this.datahrmsmprapplicantsapplicantid3.push(obj);
}
if((this.tblhrmsmprapplicantssource.settings as any).columns['applicantid'])
{
(this.tblhrmsmprapplicantssource.settings as any).columns['applicantid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsmprapplicantsapplicantid3));
this.tblhrmsmprapplicantssource.initGrid();
}
});
}
this.bfilterPopulatehrmsmprapplicants=true;
}
async hrmsmprapplicantsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsmprapplicantsTableConfig()
{
this.hrmsmprapplicantssettings = {
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
offerdate: {
title: 'Offer Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
planneddoj: {
title: 'Planned D O J',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
joineddate: {
title: 'Joined Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsmprapplicantsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmprapplicantsID)>=0)
{
this.hrmsmprapplicantssource=new LocalDataSource();
this.hrmsmprapplicantssource.load(this.hrmsapplicantmasterservice.hrmsmprapplicants as  any as LocalDataSource);
this.hrmsmprapplicantssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsmprapplicantsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsapplicantmasterservice.hrmsmprapplicants.length == 0)
{
    this.tblhrmsmprapplicantssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsmprapplicant();
    this.hrmsapplicantmasterservice.hrmsmprapplicants.push(obj);
    this.hrmsmprapplicantssource.refresh();
    if ((this.hrmsapplicantmasterservice.hrmsmprapplicants.length / this.hrmsmprapplicantssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsmprapplicantssource.getPaging().page)
    {
        this.hrmsmprapplicantssource.setPage((this.hrmsapplicantmasterservice.hrmsmprapplicants.length / this.hrmsmprapplicantssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsmprapplicantssource.grid.edit(this.tblhrmsmprapplicantssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsmprapplicantssource.data.indexOf(event.data);
this.onDeletehrmsmprapplicant(event,event.data.mprid,((this.hrmsmprapplicantssource.getPaging().page-1) *this.hrmsmprapplicantssource.getPaging().perPage)+index);
this.hrmsmprapplicantssource.refresh();
break;
}
}

*/
hrmsmprapplicantsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsmprapplicant(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsmprapplicant(event,event.data.mprid,this.formid);
break;
case 'delete':
this.onDeletehrmsmprapplicant(event,event.data.mprid,((this.hrmsmprapplicantssource.getPaging().page-1) *this.hrmsmprapplicantssource.getPaging().perPage)+event.index);
this.hrmsmprapplicantssource.refresh();
break;
}
}
hrmsmprapplicantsonDelete(obj) {
let mprid=obj.data.mprid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsapplicantmasterservice.deletehrmsapplicantmaster(mprid).then(res=>
this.hrmsmprapplicantsLoadTable()
);
}
}
hrmsmprapplicantsPaging(val)
{
debugger;
this.hrmsmprapplicantssource.setPaging(1, val, true);
}

handlehrmsmprapplicantsGridSelected(event:any) {
this.hrmsmprapplicantsselectedindex=this.hrmsapplicantmasterservice.hrmsmprapplicants.findIndex(i => i.mprapplicantid === event.data.mprapplicantid);
}
IshrmsmprapplicantsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmprapplicantsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsmprapplicants

}



