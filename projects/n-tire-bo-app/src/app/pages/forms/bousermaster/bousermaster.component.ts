import { bousermasterService } from './../../../service/bousermaster.service';
import { bousermaster } from './../../../model/bousermaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import { bouserrolemaster} from './../../../model/bouserrolemaster.model';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
//popups
import { bobranchmaster} from './../../../model/bobranchmaster.model';
import { bobranchmasterService } from './../../../service/bobranchmaster.service';
//popups
import { bomasterdata} from './../../../model/bomasterdata.model';
import { bomasterdataService } from './../../../service/bomasterdata.service';
//popups
import { bocountry} from './../../../model/bocountry.model';
import { bocountryService } from './../../../service/bocountry.service';
//popups
import { bostate} from './../../../model/bostate.model';
import { bostateService } from './../../../service/bostate.service';
//popups
import { bocity} from './../../../model/bocity.model';
import { bocityService } from './../../../service/bocity.service';
//popups
//detail table services
import { bouserbranchaccess } from './../../../model/bouserbranchaccess.model';
//FK services
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bousermenuaccess } from './../../../model/bousermenuaccess.model';
//FK services
import { bomenumasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomenumaster/bomenumaster.component';
import { bomenumasterService } from './../../../service/bomenumaster.service';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
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
selector: 'app-bousermaster',
templateUrl: './bousermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bousermasterComponent implements OnInit {
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
bfilterPopulatebousermasters:boolean=false;
databousermastersuserroleid3:any=[];
databousermastersbranchid3:any=[];
databousermastersdepartmentid3:any=[];
databousermastersdesignation3:any=[];
databousermastersreportingto3:any=[];
databousermastersrole3:any=[];
databousermasterseducationid3:any=[];
databousermastersdefaultlanguage3:any=[];
databousermastersgender3:any=[];
databousermastersnationality3:any=[];
databousermastersbloodgroup3:any=[];
databousermastersreligion3:any=[];
databousermastersmaritalstatus3:any=[];
databousermasterscountryid3:any=[];
databousermastersstateid3:any=[];
databousermasterscityid3:any=[];
databousermastersapprovallevel3:any=[];
databousermastersapprovallevel13:any=[];
databousermastersapprovallevel23:any=[];
databousermastersapprovallevel33:any=[];
databousermastersapprovallevel43:any=[];
databousermastersapprovallevel53:any=[];
databousermastersapprovalleveltype13:any=[];
databousermastersapprovalleveltype23:any=[];
databousermastersapprovalleveltype33:any=[];
databousermastersapprovalleveltype43:any=[];
databousermastersapprovalleveltype53:any=[];
bfilterPopulatebouserbranchaccesses:boolean=false;
bfilterPopulatebousermenuaccesses:boolean=false;
@ViewChild('tblbouserbranchaccessessource',{static:false}) tblbouserbranchaccessessource: Ng2SmartTableComponent;
@ViewChild('tblbousermenuaccessessource',{static:false}) tblbousermenuaccessessource: Ng2SmartTableComponent;
 bousermasterForm: FormGroup;
userroleidList: bouserrolemaster[];
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
designationList: bomasterdata[];
reportingtoList: bousermaster[];
reportingtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
reportingto_bousermastersForm: FormGroup;//autocomplete
reportingto_bousermastersoptions:any;//autocomplete
reportingto_bousermastersformatter:any;//autocomplete
roleList: bouserrolemaster[];
roleoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
role_bouserrolemastersForm: FormGroup;//autocomplete
role_bouserrolemastersoptions:any;//autocomplete
role_bouserrolemastersformatter:any;//autocomplete
educationidList: bomasterdata[];
defaultlanguageList: bomasterdata[];
genderList: boconfigvalue[];
nationalityList: boconfigvalue[];
bloodgroupList: boconfigvalue[];
religionList: boconfigvalue[];
maritalstatusList: boconfigvalue[];
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
approvallevelList: bousermaster[];
approvalleveloptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel_bousermastersForm: FormGroup;//autocomplete
approvallevel_bousermastersoptions:any;//autocomplete
approvallevel_bousermastersformatter:any;//autocomplete
approvallevel1List: bousermaster[];
approvallevel1optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel1_bousermastersForm: FormGroup;//autocomplete
approvallevel1_bousermastersoptions:any;//autocomplete
approvallevel1_bousermastersformatter:any;//autocomplete
approvallevel2List: bousermaster[];
approvallevel2optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel2_bousermastersForm: FormGroup;//autocomplete
approvallevel2_bousermastersoptions:any;//autocomplete
approvallevel2_bousermastersformatter:any;//autocomplete
approvallevel3List: bousermaster[];
approvallevel3optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel3_bousermastersForm: FormGroup;//autocomplete
approvallevel3_bousermastersoptions:any;//autocomplete
approvallevel3_bousermastersformatter:any;//autocomplete
approvallevel4List: bousermaster[];
approvallevel4optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel4_bousermastersForm: FormGroup;//autocomplete
approvallevel4_bousermastersoptions:any;//autocomplete
approvallevel4_bousermastersformatter:any;//autocomplete
approvallevel5List: bousermaster[];
approvallevel5optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvallevel5_bousermastersForm: FormGroup;//autocomplete
approvallevel5_bousermastersoptions:any;//autocomplete
approvallevel5_bousermastersformatter:any;//autocomplete
approvalleveltype1List: boconfigvalue[];
approvalleveltype2List: boconfigvalue[];
approvalleveltype3List: boconfigvalue[];
approvalleveltype4List: boconfigvalue[];
approvalleveltype5List: boconfigvalue[];
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
@ViewChild('userphoto',{static:false}) userphoto: AttachmentComponent;
@ViewChild('usersignature',{static:false}) usersignature: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;



bouserbranchaccessesvisiblelist:any;
bouserbranchaccesseshidelist:any;
bousermenuaccessesvisiblelist:any;
bousermenuaccesseshidelist:any;

DeletedbouserbranchaccessIDs: string="";
bouserbranchaccessesID: string = "1";
bouserbranchaccessesselectedindex:any;
DeletedbousermenuaccessIDs: string="";
bousermenuaccessesID: string = "2";
bousermenuaccessesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bousermasterservice: bousermasterService,
private bobranchmasterservice: bobranchmasterService,
private bomenumasterservice: bomenumasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
private bomasterdataservice:bomasterdataService,
private bocountryservice:bocountryService,
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
this.bousermasterForm  = this.fb.group({pk:[null],ImageName: [null],
userid: [null],
sourcefield: [null],
sourcereference: [null],
userroleid: [null],
userroleiddesc: [null],
branchid: [null],
branchiddesc: [null],
departmentid: [null],
departmentiddesc: [null],
usercode: [null],
username: [null],
shortname: [null],
bio: [null],
avatar: [null],
designation: [null],
designationdesc: [null],
reportingto: [null],
reportingtodesc: [null],
role: [null],
roledesc: [null],
emailid: [null],
mobilenumber: [null],
password: [null],
nextloginchangepassword: [null],
validityfrom: [null],
validityto: [null],
educationid: [null],
educationiddesc: [null],
usersignature: [null],
userphoto: [null],
thumbnail: [null],
emailpassword: [null],
emailsignature: [null],
dateofbirth: [null],
defaultpage: [null],
defaultlanguage: [null],
defaultlanguagedesc: [null],
layoutpage: [null],
theme: [null],
gender: [null],
genderdesc: [null],
nationality: [null],
nationalitydesc: [null],
bloodgroup: [null],
bloodgroupdesc: [null],
religion: [null],
religiondesc: [null],
maritalstatus: [null],
maritalstatusdesc: [null],
referencenumber: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
zipcode: [null],
emergencycontactperson: [null],
relationship: [null],
cpphonenumber: [null],
emailnotifications: [null],
whatsappnotifications: [null],
employeespecificapproval: [null],
autoapproval: [null],
approvallevel: [null],
approvalleveldesc: [null],
approvallevel1: [null],
approvallevel1desc: [null],
approvallevel2: [null],
approvallevel2desc: [null],
approvallevel3: [null],
approvallevel3desc: [null],
approvallevel4: [null],
approvallevel4desc: [null],
approvallevel5: [null],
approvallevel5desc: [null],
approvalleveltype1: [null],
approvalleveltype1desc: [null],
approvalleveltype2: [null],
approvalleveltype2desc: [null],
approvalleveltype3: [null],
approvalleveltype3desc: [null],
approvalleveltype4: [null],
approvalleveltype4desc: [null],
approvalleveltype5: [null],
approvalleveltype5desc: [null],
twitter: [null],
facebook: [null],
linkedin: [null],
skype: [null],
googleplus: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
employeeid: [null],
});
}

get f() { return this.bousermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bousermasterForm.dirty && this.bousermasterForm.touched ) {
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
  
  if(pos>=0 && this.pkList[pos].userid.toString()!=this.formid.toString()) 
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
mobilenumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].userid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Mobile Number value exists in the database.Do you want to display the record ? "))
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
usercodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.usercode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].userid.toString()!=this.formid.toString()) 
  {
    if(confirm("This User Code value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.userid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.userid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userid && pkDetail) {
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
let bousermasterid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
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
this.formid=bousermasterid;
//this.sharedService.alert(bousermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbouserbranchaccessesTableConfig();
  setTimeout(() => {
  this.SetbouserbranchaccessesTableddConfig();
  });

this.SetbousermenuaccessesTableConfig();
  setTimeout(() => {
  this.SetbousermenuaccessesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.userroleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.bousermasterForm.patchValue({
    branchid: this.bousermasterservice.formData.branchid,
    branchiddesc: this.bousermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.bousermasterForm.get('branchid').value);
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
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("qbteo").then(res => {
this.designationList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.reportingtoList = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.reportingto){
this.reportingtooptionsEvent.emit(this.reportingtoList);
this.bousermasterForm.patchValue({
    reportingto: this.bousermasterservice.formData.reportingto,
    reportingtodesc: this.bousermasterservice.formData.reportingtodesc,
});
}
{
let arrreportingto = this.reportingtoList.filter(v => v.userid == this.bousermasterForm.get('reportingto').value);
let objreportingto;
if (arrreportingto.length > 0) objreportingto = arrreportingto[0];
if (objreportingto)
{
}
}
}
).catch((err) => {console.log(err);});
this.reportingto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.reportingtoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reportingto_bousermastersformatter = (result: any) => result.username;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleList = res as bouserrolemaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.role){
this.roleoptionsEvent.emit(this.roleList);
this.bousermasterForm.patchValue({
    role: this.bousermasterservice.formData.role,
    roledesc: this.bousermasterservice.formData.roledesc,
});
}
{
let arrrole = this.roleList.filter(v => v.userroleid == this.bousermasterForm.get('role').value);
let objrole;
if (arrrole.length > 0) objrole = arrrole[0];
if (objrole)
{
}
}
}
).catch((err) => {console.log(err);});
this.role_bouserrolemastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.roleList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.role_bouserrolemastersformatter = (result: any) => result.userrole;
this.bomasterdataservice.getList("uugg5").then(res => {
this.educationidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("jc2s3").then(res => {
this.defaultlanguageList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.configservice.getList("nationality").then(res => this.nationalityList = res as boconfigvalue[]);
this.configservice.getList("bloodgroup").then(res => this.bloodgroupList = res as boconfigvalue[]);
this.configservice.getList("religion").then(res => this.religionList = res as boconfigvalue[]);
this.configservice.getList("maritalstatus").then(res => this.maritalstatusList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.bousermasterForm.patchValue({
    countryid: this.bousermasterservice.formData.countryid,
    countryiddesc: this.bousermasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.bousermasterForm.get('countryid').value);
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
this.bostateservice.getbostatesList().then(res => 
{
this.stateidList = res as bostate[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.stateid){
this.stateidoptionsEvent.emit(this.stateidList);
this.bousermasterForm.patchValue({
    stateid: this.bousermasterservice.formData.stateid,
    stateiddesc: this.bousermasterservice.formData.stateiddesc,
});
}
{
let arrstateid = this.stateidList.filter(v => v.stateid == this.bousermasterForm.get('stateid').value);
let objstateid;
if (arrstateid.length > 0) objstateid = arrstateid[0];
if (objstateid)
{
}
}
}
).catch((err) => {console.log(err);});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
this.bocityservice.getbocitiesList().then(res => 
{
this.cityidList = res as bocity[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.cityid){
this.cityidoptionsEvent.emit(this.cityidList);
this.bousermasterForm.patchValue({
    cityid: this.bousermasterservice.formData.cityid,
    cityiddesc: this.bousermasterservice.formData.cityiddesc,
});
}
{
let arrcityid = this.cityidList.filter(v => v.cityid == this.bousermasterForm.get('cityid').value);
let objcityid;
if (arrcityid.length > 0) objcityid = arrcityid[0];
if (objcityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevelList = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel){
this.approvalleveloptionsEvent.emit(this.approvallevelList);
this.bousermasterForm.patchValue({
    approvallevel: this.bousermasterservice.formData.approvallevel,
    approvalleveldesc: this.bousermasterservice.formData.approvalleveldesc,
});
}
{
let arrapprovallevel = this.approvallevelList.filter(v => v.userid == this.bousermasterForm.get('approvallevel').value);
let objapprovallevel;
if (arrapprovallevel.length > 0) objapprovallevel = arrapprovallevel[0];
if (objapprovallevel)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevelList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevel1List = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel1){
this.approvallevel1optionsEvent.emit(this.approvallevel1List);
this.bousermasterForm.patchValue({
    approvallevel1: this.bousermasterservice.formData.approvallevel1,
    approvallevel1desc: this.bousermasterservice.formData.approvallevel1desc,
});
}
{
let arrapprovallevel1 = this.approvallevel1List.filter(v => v.userid == this.bousermasterForm.get('approvallevel1').value);
let objapprovallevel1;
if (arrapprovallevel1.length > 0) objapprovallevel1 = arrapprovallevel1[0];
if (objapprovallevel1)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel1_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevel1List.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel1_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevel2List = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel2){
this.approvallevel2optionsEvent.emit(this.approvallevel2List);
this.bousermasterForm.patchValue({
    approvallevel2: this.bousermasterservice.formData.approvallevel2,
    approvallevel2desc: this.bousermasterservice.formData.approvallevel2desc,
});
}
{
let arrapprovallevel2 = this.approvallevel2List.filter(v => v.userid == this.bousermasterForm.get('approvallevel2').value);
let objapprovallevel2;
if (arrapprovallevel2.length > 0) objapprovallevel2 = arrapprovallevel2[0];
if (objapprovallevel2)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel2_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevel2List.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel2_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevel3List = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel3){
this.approvallevel3optionsEvent.emit(this.approvallevel3List);
this.bousermasterForm.patchValue({
    approvallevel3: this.bousermasterservice.formData.approvallevel3,
    approvallevel3desc: this.bousermasterservice.formData.approvallevel3desc,
});
}
{
let arrapprovallevel3 = this.approvallevel3List.filter(v => v.userid == this.bousermasterForm.get('approvallevel3').value);
let objapprovallevel3;
if (arrapprovallevel3.length > 0) objapprovallevel3 = arrapprovallevel3[0];
if (objapprovallevel3)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel3_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevel3List.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel3_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevel4List = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel4){
this.approvallevel4optionsEvent.emit(this.approvallevel4List);
this.bousermasterForm.patchValue({
    approvallevel4: this.bousermasterservice.formData.approvallevel4,
    approvallevel4desc: this.bousermasterservice.formData.approvallevel4desc,
});
}
{
let arrapprovallevel4 = this.approvallevel4List.filter(v => v.userid == this.bousermasterForm.get('approvallevel4').value);
let objapprovallevel4;
if (arrapprovallevel4.length > 0) objapprovallevel4 = arrapprovallevel4[0];
if (objapprovallevel4)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel4_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevel4List.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel4_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvallevel5List = res as bousermaster[];
if(this.bousermasterservice.formData && this.bousermasterservice.formData.approvallevel5){
this.approvallevel5optionsEvent.emit(this.approvallevel5List);
this.bousermasterForm.patchValue({
    approvallevel5: this.bousermasterservice.formData.approvallevel5,
    approvallevel5desc: this.bousermasterservice.formData.approvallevel5desc,
});
}
{
let arrapprovallevel5 = this.approvallevel5List.filter(v => v.userid == this.bousermasterForm.get('approvallevel5').value);
let objapprovallevel5;
if (arrapprovallevel5.length > 0) objapprovallevel5 = arrapprovallevel5[0];
if (objapprovallevel5)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvallevel5_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvallevel5List.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvallevel5_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("approvalleveltype1").then(res => this.approvalleveltype1List = res as boconfigvalue[]);
this.configservice.getList("approvalleveltype2").then(res => this.approvalleveltype2List = res as boconfigvalue[]);
this.configservice.getList("approvalleveltype3").then(res => this.approvalleveltype3List = res as boconfigvalue[]);
this.configservice.getList("approvalleveltype4").then(res => this.approvalleveltype4List = res as boconfigvalue[]);
this.configservice.getList("approvalleveltype5").then(res => this.approvalleveltype5List = res as boconfigvalue[]);

//autocomplete
    this.bousermasterservice.getbousermastersList().then(res => {
      this.pkList = res as bousermaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.username;

//setting the flag that the screen is not touched 
this.bousermasterForm.markAsUntouched();
this.bousermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.bousermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedreportingto(reportingtoDetail: any) {
if (reportingtoDetail.reportingto && reportingtoDetail) {
this.bousermasterForm.patchValue({
reportingto: reportingtoDetail.reportingto,
reportingtodesc: reportingtoDetail.username,

});

}
}

onSelectedrole(roleDetail: any) {
if (roleDetail.role && roleDetail) {
this.bousermasterForm.patchValue({
role: roleDetail.role,
roledesc: roleDetail.userrole,

});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.bousermasterForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.bousermasterForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.bousermasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}

onSelectedapprovallevel(approvallevelDetail: any) {
if (approvallevelDetail.approvallevel && approvallevelDetail) {
this.bousermasterForm.patchValue({
approvallevel: approvallevelDetail.approvallevel,
approvalleveldesc: approvallevelDetail.username,

});

}
}

onSelectedapprovallevel1(approvallevel1Detail: any) {
if (approvallevel1Detail.approvallevel1 && approvallevel1Detail) {
this.bousermasterForm.patchValue({
approvallevel1: approvallevel1Detail.approvallevel1,
approvallevel1desc: approvallevel1Detail.username,

});

}
}

onSelectedapprovallevel2(approvallevel2Detail: any) {
if (approvallevel2Detail.approvallevel2 && approvallevel2Detail) {
this.bousermasterForm.patchValue({
approvallevel2: approvallevel2Detail.approvallevel2,
approvallevel2desc: approvallevel2Detail.username,

});

}
}

onSelectedapprovallevel3(approvallevel3Detail: any) {
if (approvallevel3Detail.approvallevel3 && approvallevel3Detail) {
this.bousermasterForm.patchValue({
approvallevel3: approvallevel3Detail.approvallevel3,
approvallevel3desc: approvallevel3Detail.username,

});

}
}

onSelectedapprovallevel4(approvallevel4Detail: any) {
if (approvallevel4Detail.approvallevel4 && approvallevel4Detail) {
this.bousermasterForm.patchValue({
approvallevel4: approvallevel4Detail.approvallevel4,
approvallevel4desc: approvallevel4Detail.username,

});

}
}

onSelectedapprovallevel5(approvallevel5Detail: any) {
if (approvallevel5Detail.approvallevel5 && approvallevel5Detail) {
this.bousermasterForm.patchValue({
approvallevel5: approvallevel5Detail.approvallevel5,
approvallevel5desc: approvallevel5Detail.username,

});

}
}




  getuserphoto() {
    debugger;
    if (this.userphoto.getattachmentlist().length > 0) {
      let file = this.userphoto.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getusersignature() {
    debugger;
    if (this.usersignature.getattachmentlist().length > 0) {
      let file = this.usersignature.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.bousermasterForm != null)
this.bousermasterForm.reset();
this.bousermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
reportingto: this.sessiondata.userid,
reportingtodesc: this.sessiondata.username,
approvallevel: this.sessiondata.userid,
approvalleveldesc: this.sessiondata.username,
approvallevel1: this.sessiondata.userid,
approvallevel1desc: this.sessiondata.username,
approvallevel2: this.sessiondata.userid,
approvallevel2desc: this.sessiondata.username,
approvallevel3: this.sessiondata.userid,
approvallevel3desc: this.sessiondata.username,
approvallevel4: this.sessiondata.userid,
approvallevel4desc: this.sessiondata.username,
approvallevel5: this.sessiondata.userid,
approvallevel5desc: this.sessiondata.username,
});
this.bousermasterForm.patchValue({
validityfrom: this.ngbDateParserFormatter.parse(new Date().toString()),
validityto: this.ngbDateParserFormatter.parse(this.sharedService.addMonths(new Date(),6).toString()),
educationid: 6,
dateofbirth: this.ngbDateParserFormatter.parse(new Date().toISOString()),
defaultlanguage: 11,
});
setTimeout(() => {
this.bousermasterservice.bouserbranchaccesses=[];
this.bousermasterservice.Insertbouserbranchaccesses=[];
this.bouserbranchaccessesLoadTable();
this.bousermasterservice.bousermenuaccesses=[];
this.bousermasterservice.Insertbousermenuaccesses=[];
this.bousermenuaccessesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.bousermasterForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let userid = this.bousermasterForm.get('userid').value;
        if(userid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bousermasterservice.deletebousermaster(userid).then(res =>
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
    this.bousermasterForm.patchValue({
        userid: null
    });
    if(this.bousermasterservice.formData.userid!=null)this.bousermasterservice.formData.userid=null;
for (let i=0;i<this.bousermasterservice.bouserbranchaccesses.length;i++) {
this.bousermasterservice.bouserbranchaccesses[i].accessid=null;
}
for (let i=0;i<this.bousermasterservice.bousermenuaccesses.length;i++) {
this.bousermasterservice.bousermenuaccesses[i].usermenuaccessid=null;
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
        else if(key=="validityfrom")
this.bousermasterForm.patchValue({"validityfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validityto")
this.bousermasterForm.patchValue({"validityto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dateofbirth")
this.bousermasterForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.bousermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bousermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bousermasterForm.controls[key]!=undefined)this.bousermasterForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bousermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
useridonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
userroleidonChange(evt:any){
let e=evt.value;
this.bousermasterForm.patchValue({userroleiddesc:evt.options[evt.options.selectedIndex].text});
}
branchidonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.bousermasterForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
usercodeonChange(evt:any){
let e=evt.value;
}
usernameonChange(evt:any){
let e=evt.value;
}
shortnameonChange(evt:any){
let e=evt.value;
}
bioonChange(evt:any){
let e=evt.value;
}
avataronChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
this.bousermasterForm.patchValue({designationdesc:evt.options[evt.options.selectedIndex].text});
}
reportingtoonChange(evt:any){
let e=evt.value;
}
roleonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
mobilenumberonChange(evt:any){
let e=evt.value;
}
passwordonChange(evt:any){
let e=evt.value;
}
nextloginchangepasswordonChange(evt:any){
let e=evt.value;
}
validityfromonChange(evt:any){
let e=evt.value;
}
validitytoonChange(evt:any){
let e=evt.value;
}
educationidonChange(evt:any){
let e=evt.value;
this.bousermasterForm.patchValue({educationiddesc:evt.options[evt.options.selectedIndex].text});
}
usersignatureonChange(evt:any){
let e=evt.value;
}
userphotoonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
emailpasswordonChange(evt:any){
let e=evt.value;
}
emailsignatureonChange(evt:any){
let e=evt.value;
}
dateofbirthonChange(evt:any){
let e=evt.value;
}
defaultpageonChange(evt:any){
let e=evt.value;
}
defaultlanguageonChange(evt:any){
let e=evt.value;
this.bousermasterForm.patchValue({defaultlanguagedesc:evt.options[evt.options.selectedIndex].text});
}
layoutpageonChange(evt:any){
let e=evt.value;
}
themeonChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.bousermasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
nationalityonChange(evt:any){
let e=this.f.nationality.value as any;
this.bousermasterForm.patchValue({nationalitydesc:evt.options[evt.options.selectedIndex].text});
}
bloodgrouponChange(evt:any){
let e=this.f.bloodgroup.value as any;
this.bousermasterForm.patchValue({bloodgroupdesc:evt.options[evt.options.selectedIndex].text});
}
religiononChange(evt:any){
let e=this.f.religion.value as any;
this.bousermasterForm.patchValue({religiondesc:evt.options[evt.options.selectedIndex].text});
}
maritalstatusonChange(evt:any){
let e=this.f.maritalstatus.value as any;
this.bousermasterForm.patchValue({maritalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
referencenumberonChange(evt:any){
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
zipcodeonChange(evt:any){
let e=evt.value;
}
emergencycontactpersononChange(evt:any){
let e=evt.value;
}
relationshiponChange(evt:any){
let e=evt.value;
}
cpphonenumberonChange(evt:any){
let e=evt.value;
}
emailnotificationsonChange(evt:any){
let e=evt.value;
}
whatsappnotificationsonChange(evt:any){
let e=evt.value;
}
employeespecificapprovalonChange(evt:any){
let e=evt.value;
}
autoapprovalonChange(evt:any){
let e=evt.value;
}
approvallevelonChange(evt:any){
let e=evt.value;
}
approvallevel1onChange(evt:any){
let e=evt.value;
}
approvallevel2onChange(evt:any){
let e=evt.value;
}
approvallevel3onChange(evt:any){
let e=evt.value;
}
approvallevel4onChange(evt:any){
let e=evt.value;
}
approvallevel5onChange(evt:any){
let e=evt.value;
}
approvalleveltype1onChange(evt:any){
let e=this.f.approvalleveltype1.value as any;
this.bousermasterForm.patchValue({approvalleveltype1desc:evt.options[evt.options.selectedIndex].text});
}
approvalleveltype2onChange(evt:any){
let e=this.f.approvalleveltype2.value as any;
this.bousermasterForm.patchValue({approvalleveltype2desc:evt.options[evt.options.selectedIndex].text});
}
approvalleveltype3onChange(evt:any){
let e=this.f.approvalleveltype3.value as any;
this.bousermasterForm.patchValue({approvalleveltype3desc:evt.options[evt.options.selectedIndex].text});
}
approvalleveltype4onChange(evt:any){
let e=this.f.approvalleveltype4.value as any;
this.bousermasterForm.patchValue({approvalleveltype4desc:evt.options[evt.options.selectedIndex].text});
}
approvalleveltype5onChange(evt:any){
let e=this.f.approvalleveltype5.value as any;
this.bousermasterForm.patchValue({approvalleveltype5desc:evt.options[evt.options.selectedIndex].text});
}
twitteronChange(evt:any){
let e=evt.value;
}
facebookonChange(evt:any){
let e=evt.value;
}
linkedinonChange(evt:any){
let e=evt.value;
}
skypeonChange(evt:any){
let e=evt.value;
}
googleplusonChange(evt:any){
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
employeeidonChange(evt:any){
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
  


async PopulateScreen(pkcol:any){
this.bousermasterservice.getbousermastersByEID(pkcol).then(res => {

this.bousermasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bousermaster.userid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bousermaster.userid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bousermasterForm.patchValue({
userid: res.bousermaster.userid,
sourcefield: res.bousermaster.sourcefield,
sourcereference: res.bousermaster.sourcereference,
userroleid: res.bousermaster.userroleid,
userroleiddesc: res.bousermaster.userroleiddesc,
branchid: res.bousermaster.branchid,
branchiddesc: res.bousermaster.branchiddesc,
departmentid: res.bousermaster.departmentid,
departmentiddesc: res.bousermaster.departmentiddesc,
usercode: res.bousermaster.usercode,
username: res.bousermaster.username,
shortname: res.bousermaster.shortname,
bio: res.bousermaster.bio,
avatar: res.bousermaster.avatar,
designation: res.bousermaster.designation,
designationdesc: res.bousermaster.designationdesc,
reportingto: res.bousermaster.reportingto,
reportingtodesc: res.bousermaster.reportingtodesc,
role: res.bousermaster.role,
roledesc: res.bousermaster.roledesc,
emailid: res.bousermaster.emailid,
mobilenumber: res.bousermaster.mobilenumber,
password: res.bousermaster.password,
nextloginchangepassword: res.bousermaster.nextloginchangepassword,
validityfrom: this.ngbDateParserFormatter.parse(res.bousermaster.validityfrom),
validityto: this.ngbDateParserFormatter.parse(res.bousermaster.validityto),
educationid: res.bousermaster.educationid,
educationiddesc: res.bousermaster.educationiddesc,
usersignature: res.bousermaster.usersignature,
userphoto: res.bousermaster.userphoto,
thumbnail: res.bousermaster.thumbnail,
emailpassword: res.bousermaster.emailpassword,
emailsignature: res.bousermaster.emailsignature,
dateofbirth: this.ngbDateParserFormatter.parse(res.bousermaster.dateofbirth),
defaultpage: res.bousermaster.defaultpage,
defaultlanguage: res.bousermaster.defaultlanguage,
defaultlanguagedesc: res.bousermaster.defaultlanguagedesc,
layoutpage: res.bousermaster.layoutpage,
theme: res.bousermaster.theme,
gender: res.bousermaster.gender,
genderdesc: res.bousermaster.genderdesc,
nationality: res.bousermaster.nationality,
nationalitydesc: res.bousermaster.nationalitydesc,
bloodgroup: res.bousermaster.bloodgroup,
bloodgroupdesc: res.bousermaster.bloodgroupdesc,
religion: res.bousermaster.religion,
religiondesc: res.bousermaster.religiondesc,
maritalstatus: res.bousermaster.maritalstatus,
maritalstatusdesc: res.bousermaster.maritalstatusdesc,
referencenumber: res.bousermaster.referencenumber,
address1: res.bousermaster.address1,
address2: res.bousermaster.address2,
countryid: res.bousermaster.countryid,
countryiddesc: res.bousermaster.countryiddesc,
stateid: res.bousermaster.stateid,
stateiddesc: res.bousermaster.stateiddesc,
cityid: res.bousermaster.cityid,
cityiddesc: res.bousermaster.cityiddesc,
zipcode: res.bousermaster.zipcode,
emergencycontactperson: res.bousermaster.emergencycontactperson,
relationship: res.bousermaster.relationship,
cpphonenumber: res.bousermaster.cpphonenumber,
emailnotifications: res.bousermaster.emailnotifications,
whatsappnotifications: res.bousermaster.whatsappnotifications,
employeespecificapproval: res.bousermaster.employeespecificapproval,
autoapproval: res.bousermaster.autoapproval,
approvallevel: res.bousermaster.approvallevel,
approvalleveldesc: res.bousermaster.approvalleveldesc,
approvallevel1: res.bousermaster.approvallevel1,
approvallevel1desc: res.bousermaster.approvallevel1desc,
approvallevel2: res.bousermaster.approvallevel2,
approvallevel2desc: res.bousermaster.approvallevel2desc,
approvallevel3: res.bousermaster.approvallevel3,
approvallevel3desc: res.bousermaster.approvallevel3desc,
approvallevel4: res.bousermaster.approvallevel4,
approvallevel4desc: res.bousermaster.approvallevel4desc,
approvallevel5: res.bousermaster.approvallevel5,
approvallevel5desc: res.bousermaster.approvallevel5desc,
approvalleveltype1: res.bousermaster.approvalleveltype1,
approvalleveltype1desc: res.bousermaster.approvalleveltype1desc,
approvalleveltype2: res.bousermaster.approvalleveltype2,
approvalleveltype2desc: res.bousermaster.approvalleveltype2desc,
approvalleveltype3: res.bousermaster.approvalleveltype3,
approvalleveltype3desc: res.bousermaster.approvalleveltype3desc,
approvalleveltype4: res.bousermaster.approvalleveltype4,
approvalleveltype4desc: res.bousermaster.approvalleveltype4desc,
approvalleveltype5: res.bousermaster.approvalleveltype5,
approvalleveltype5desc: res.bousermaster.approvalleveltype5desc,
twitter: res.bousermaster.twitter,
facebook: res.bousermaster.facebook,
linkedin: res.bousermaster.linkedin,
skype: res.bousermaster.skype,
googleplus: res.bousermaster.googleplus,
customfield: res.bousermaster.customfield,
attachment: res.bousermaster.attachment,
status: res.bousermaster.status,
statusdesc: res.bousermaster.statusdesc,
employeeid: res.bousermaster.employeeid,
});
this.bouserbranchaccessesvisiblelist=res.bouserbranchaccessesvisiblelist;
this.bousermenuaccessesvisiblelist=res.bousermenuaccessesvisiblelist;
if(this.bousermasterForm.get('customfield').value!=null && this.bousermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bousermasterForm.get('customfield').value);
this.FillCustomField();
if(this.bousermasterForm.get('userphoto').value!=null && this.bousermasterForm.get('userphoto').value!="" && this.userphoto!=null && this.userphoto!=undefined)this.userphoto.setattachmentlist(JSON.parse(this.bousermasterForm.get('userphoto').value));
if(this.bousermasterForm.get('usersignature').value!=null && this.bousermasterForm.get('usersignature').value!="" && this.usersignature!=null && this.usersignature!=undefined)this.usersignature.setattachmentlist(JSON.parse(this.bousermasterForm.get('usersignature').value));
if(this.bousermasterForm.get('attachment').value!=null && this.bousermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.bousermasterForm.get('attachment').value));
//Child Tables if any
this.bousermasterservice.bouserbranchaccesses = res.bouserbranchaccesses;
this.SetbouserbranchaccessesTableConfig();
this.bouserbranchaccessesLoadTable();
  setTimeout(() => {
  this.SetbouserbranchaccessesTableddConfig();
  });
this.bousermasterservice.Insertbouserbranchaccesses=[];
this.bousermasterservice.bousermenuaccesses = res.bousermenuaccesses;
this.SetbousermenuaccessesTableConfig();
this.bousermenuaccessesLoadTable();
  setTimeout(() => {
  this.SetbousermenuaccessesTableddConfig();
  });
this.bousermasterservice.Insertbousermenuaccesses=[];
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
  for (let key in this.bousermasterForm.controls) {
    if (this.bousermasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bousermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bousermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bousermasterForm.value;
obj.validityfrom=new Date(this.bousermasterForm.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('validityfrom').value)+'  UTC' :null);
obj.validityto=new Date(this.bousermasterForm.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('validityto').value)+'  UTC' :null);
obj.dateofbirth=new Date(this.bousermasterForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('dateofbirth').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.userphoto.getAllFiles());
await this.sharedService.upload(this.usersignature.getAllFiles());
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bousermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bousermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bousermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bousermasterservice.formData=this.bousermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bousermasterForm.controls[key] != null)
    {
        this.bousermasterservice.formData[key] = this.bousermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bousermasterservice.formData.validityfrom=new Date(this.bousermasterForm.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('validityfrom').value)+'  UTC' :null);
this.bousermasterservice.formData.validityto=new Date(this.bousermasterForm.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('validityto').value)+'  UTC' :null);
this.bousermasterservice.formData.usersignature=this.bousermasterForm.get('usersignature').value;
this.bousermasterservice.formData.userphoto=this.bousermasterForm.get('userphoto').value;
this.bousermasterservice.formData.dateofbirth=new Date(this.bousermasterForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermasterForm.get('dateofbirth').value)+'  UTC' :null);
this.bousermasterservice.formData.customfield=JSON.stringify(customfields);
this.bousermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.bousermasterservice.formData.DeletedbouserbranchaccessIDs = this.DeletedbouserbranchaccessIDs;
this.bousermasterservice.formData.DeletedbousermenuaccessIDs = this.DeletedbousermenuaccessIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bousermasterservice.formData);
this.bousermasterservice.formData=this.bousermasterForm.value;
this.bousermasterservice.saveOrUpdatebousermasters().subscribe(
async res => {
await this.sharedService.upload(this.userphoto.getAllFiles());
await this.sharedService.upload(this.usersignature.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bouserbranchaccessessource.data)
{
    for (let i = 0; i < this.bouserbranchaccessessource.data.length; i++)
    {
        if (this.bouserbranchaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bouserbranchaccessessource.data[i].fileattachmentlist);
    }
}
if (this.bousermenuaccessessource.data)
{
    for (let i = 0; i < this.bousermenuaccessessource.data.length; i++)
    {
        if (this.bousermenuaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bousermenuaccessessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bousermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bousermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bousermaster);
}
else
{
this.FillData(res);
}
}
this.bousermasterForm.markAsUntouched();
this.bousermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




  viewemployeeid() {
    this.dialog.open(hrmsemployeeComponent,
      {
        data: { showview: false, employeeid:this.bousermasterForm.get('employeeid').value, ScreenType: 2 },
        header: 'employeeid details'
      }
    ).onClose.subscribe(res => {
    });
  }
//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdituserroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.bousermasterForm.get('userroleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.bousermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bousermasterForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdesignation( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bousermasterForm.get('designation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreportingto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('reportingto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.bousermasterForm.get('role').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditeducationid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bousermasterForm.get('educationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdefaultlanguage( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bousermasterForm.get('defaultlanguage').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.bousermasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.bousermasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.bousermasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel1( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel1').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel2( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel2').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel3( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel3').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel4( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel4').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovallevel5( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bousermasterForm.get('approvallevel5').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bouserbranchaccesses
onCustombouserbranchaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bobranchmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bobranchmaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bouserbranchaccessessettings:any;
bouserbranchaccessessource: any;

showbouserbranchaccessesCheckbox()
{
debugger;
if(this.tblbouserbranchaccessessource.settings['selectMode']== 'multi')this.tblbouserbranchaccessessource.settings['selectMode']= 'single';
else
this.tblbouserbranchaccessessource.settings['selectMode']= 'multi';
this.tblbouserbranchaccessessource.initGrid();
}
deletebouserbranchaccessesAll()
{
this.tblbouserbranchaccessessource.settings['selectMode'] = 'single';
}
showbouserbranchaccessesFilter()
{
  setTimeout(() => {
  this.SetbouserbranchaccessesTableddConfig();
  });
      if(this.tblbouserbranchaccessessource.settings!=null)this.tblbouserbranchaccessessource.settings['hideSubHeader'] =!this.tblbouserbranchaccessessource.settings['hideSubHeader'];
this.tblbouserbranchaccessessource.initGrid();
}
showbouserbranchaccessesInActive()
{
}
enablebouserbranchaccessesInActive()
{
}
async SetbouserbranchaccessesTableddConfig()
{
if(!this.bfilterPopulatebouserbranchaccesses){
}
this.bfilterPopulatebouserbranchaccesses=true;
}
async bouserbranchaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbouserbranchaccessesTableConfig()
{
this.bouserbranchaccessessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
accessid: {
title: 'Access',
type: '',
},
branchid: {
title: 'Branch',
type: '',
},
branchcode: {
title: 'Branchcode',
type: '',
},
branchname: {
title: 'Branchname',
type: '',
},
},
};
}
bouserbranchaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bouserbranchaccessesID)>=0)
{
this.bouserbranchaccessessource=new LocalDataSource();
this.bouserbranchaccessessource.load(this.bousermasterservice.bouserbranchaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbouserbranchaccessessource!=null)
{this.tblbouserbranchaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.bousermasterservice.Insertbouserbranchaccesses.push(row.data);
this.tblbouserbranchaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bouserbranchaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bousermasterservice.bouserbranchaccesses.length == 0)
{
    this.tblbouserbranchaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new bouserbranchaccess();
    this.bousermasterservice.bouserbranchaccesses.push(obj);
    this.bouserbranchaccessessource.refresh();
    if ((this.bousermasterservice.bouserbranchaccesses.length / this.bouserbranchaccessessource.getPaging().perPage).toFixed(0) + 1 != this.bouserbranchaccessessource.getPaging().page)
    {
        this.bouserbranchaccessessource.setPage((this.bousermasterservice.bouserbranchaccesses.length / this.bouserbranchaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbouserbranchaccessessource.grid.edit(this.tblbouserbranchaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bouserbranchaccessessource.data.indexOf(event.data);
this.onDeletebouserbranchaccess(event,event.data.accessid,((this.bouserbranchaccessessource.getPaging().page-1) *this.bouserbranchaccessessource.getPaging().perPage)+index);
this.bouserbranchaccessessource.refresh();
break;
}
}

*/
bouserbranchaccessesPaging(val)
{
debugger;
this.bouserbranchaccessessource.setPaging(1, val, true);
}

handlebouserbranchaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={userid:this.formid,branchid:event.data.branchid}
this.bousermasterservice.Insertbouserbranchaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedbouserbranchaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.accessid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.accessid!=null && event.data.accessid!="")this.DeletedbouserbranchaccessIDs += event.data.accessid + ","; 
}
}
IsbouserbranchaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bouserbranchaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bouserbranchaccesses
//start of Grid Codes bousermenuaccesses
onCustombousermenuaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bomenumasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bomenumaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bousermenuaccessessettings:any;
bousermenuaccessessource: any;

showbousermenuaccessesCheckbox()
{
debugger;
if(this.tblbousermenuaccessessource.settings['selectMode']== 'multi')this.tblbousermenuaccessessource.settings['selectMode']= 'single';
else
this.tblbousermenuaccessessource.settings['selectMode']= 'multi';
this.tblbousermenuaccessessource.initGrid();
}
deletebousermenuaccessesAll()
{
this.tblbousermenuaccessessource.settings['selectMode'] = 'single';
}
showbousermenuaccessesFilter()
{
  setTimeout(() => {
  this.SetbousermenuaccessesTableddConfig();
  });
      if(this.tblbousermenuaccessessource.settings!=null)this.tblbousermenuaccessessource.settings['hideSubHeader'] =!this.tblbousermenuaccessessource.settings['hideSubHeader'];
this.tblbousermenuaccessessource.initGrid();
}
showbousermenuaccessesInActive()
{
}
enablebousermenuaccessesInActive()
{
}
async SetbousermenuaccessesTableddConfig()
{
if(!this.bfilterPopulatebousermenuaccesses){
}
this.bfilterPopulatebousermenuaccesses=true;
}
async bousermenuaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbousermenuaccessesTableConfig()
{
this.bousermenuaccessessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
usermenuaccessid: {
title: 'User Menu Access',
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
bousermenuaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousermenuaccessesID)>=0)
{
this.bousermenuaccessessource=new LocalDataSource();
this.bousermenuaccessessource.load(this.bousermasterservice.bousermenuaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbousermenuaccessessource!=null)
{this.tblbousermenuaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.usermenuaccessid!=null && row.data.usermenuaccessid!="")
{
this.bousermasterservice.Insertbousermenuaccesses.push(row.data);
this.tblbousermenuaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bousermenuaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bousermasterservice.bousermenuaccesses.length == 0)
{
    this.tblbousermenuaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new bousermenuaccess();
    this.bousermasterservice.bousermenuaccesses.push(obj);
    this.bousermenuaccessessource.refresh();
    if ((this.bousermasterservice.bousermenuaccesses.length / this.bousermenuaccessessource.getPaging().perPage).toFixed(0) + 1 != this.bousermenuaccessessource.getPaging().page)
    {
        this.bousermenuaccessessource.setPage((this.bousermasterservice.bousermenuaccesses.length / this.bousermenuaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbousermenuaccessessource.grid.edit(this.tblbousermenuaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bousermenuaccessessource.data.indexOf(event.data);
this.onDeletebousermenuaccess(event,event.data.usermenuaccessid,((this.bousermenuaccessessource.getPaging().page-1) *this.bousermenuaccessessource.getPaging().perPage)+index);
this.bousermenuaccessessource.refresh();
break;
}
}

*/
bousermenuaccessesPaging(val)
{
debugger;
this.bousermenuaccessessource.setPaging(1, val, true);
}

handlebousermenuaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.usermenuaccessid==null || event.data.usermenuaccessid=="")
{
var obj={userid:this.formid,menuid:event.data.menuid}
this.bousermasterservice.Insertbousermenuaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedbousermenuaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.usermenuaccessid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.usermenuaccessid!=null && event.data.usermenuaccessid!="")this.DeletedbousermenuaccessIDs += event.data.usermenuaccessid + ","; 
}
}
IsbousermenuaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousermenuaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bousermenuaccesses

}



