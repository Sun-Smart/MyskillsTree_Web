import { legallawyermasterService } from './../../../service/legallawyermaster.service';
import { legallawyermaster } from './../../../model/legallawyermaster.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
//detail table services
import { legallawyercourt } from './../../../model/legallawyercourt.model';
import { legallawyercourtComponent } from './../../../pages/forms/legallawyercourt/legallawyercourt.component';
//FK services
import { legalcourtmasterComponent } from './../legalcourtmaster/legalcourtmaster.component';
import { legalcourtmasterService } from './../../../service/legalcourtmaster.service';
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
selector: 'app-legallawyermaster',
templateUrl: './legallawyermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legallawyermasterComponent implements OnInit {
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
bfilterPopulatelegallawyermasters:boolean=false;
datalegallawyermasterslawyertype3:any=[];
datalegallawyermastersbranchid3:any=[];
datalegallawyermastersroleid3:any=[];
datalegallawyermastersgender3:any=[];
datalegallawyermasterscountryid3:any=[];
datalegallawyermastersstateid3:any=[];
datalegallawyermasterscityid3:any=[];
bfilterPopulatelegallawyercourts:boolean=false;
@ViewChild('tbllegallawyercourtssource',{static:false}) tbllegallawyercourtssource: Ng2SmartTableComponent;
 legallawyermasterForm: FormGroup;
lawyertypeList: boconfigvalue[];
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
roleidList: bouserrolemaster[];
genderList: boconfigvalue[];
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
legallawyermastershowOption:boolean;
legallawyercourtshowOption:boolean;
sessiondata:any;
sourcekey:any;



legallawyercourtsvisiblelist:any;
legallawyercourtshidelist:any;

DeletedlegallawyercourtIDs: string="";
legallawyercourtsID: string = "1";
legallawyercourtsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legallawyermasterservice: legallawyermasterService,
private legalcourtmasterservice: legalcourtmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.legallawyermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
lawyerid: [null],
lawyercode: [null, Validators.required],
lawyername: [null, Validators.required],
lawyertype: [null],
lawyertypedesc: [null],
lawyercompany: [null],
branchid: [null],
branchiddesc: [null],
roleid: [null],
roleiddesc: [null],
gender: [null],
genderdesc: [null],
dob: [null],
mobilenumber: [null, Validators.required],
emailid: [null, Validators.required],
alternatenumber: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pin: [null],
validfromdate: [null],
validtodate: [null],
bankname: [null],
iban: [null],
accountnumber: [null],
accountname: [null],
bankotherdetails: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legallawyermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legallawyermasterForm.dirty && this.legallawyermasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
accountnameexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.accountname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Account Name value exists in the database.Do you want to display the record ? "))
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
accountnumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.accountnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Account Number value exists in the database.Do you want to display the record ? "))
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
emailidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
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
ibanexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.iban.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This I B A N value exists in the database.Do you want to display the record ? "))
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
lawyercodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.lawyercode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Lawyer Code value exists in the database.Do you want to display the record ? "))
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
  
  if(pos>=0 && this.pkList[pos].lawyerid.toString()!=this.formid.toString()) 
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
  let pos = this.pkList.map(function(e:any) { return e.lawyerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.lawyerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.lawyerid && pkDetail) {
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
let legallawyermasterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=legallawyermasterid;
//this.sharedService.alert(legallawyermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegallawyercourtsTableConfig();
  setTimeout(() => {
  this.SetlegallawyercourtsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("lawyertype").then(res => this.lawyertypeList = res as boconfigvalue[]);
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.legallawyermasterservice.formData && this.legallawyermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.legallawyermasterForm.patchValue({
    branchid: this.legallawyermasterservice.formData.branchid,
    branchiddesc: this.legallawyermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.legallawyermasterForm.get('branchid').value);
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
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.legallawyermasterservice.formData && this.legallawyermasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.legallawyermasterForm.patchValue({
    countryid: this.legallawyermasterservice.formData.countryid,
    countryiddesc: this.legallawyermasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.legallawyermasterForm.get('countryid').value);
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
if(this.legallawyermasterservice.formData && this.legallawyermasterservice.formData.stateid){this.legallawyermasterForm.patchValue({
    stateid: this.legallawyermasterservice.formData.stateid,
    stateiddesc: this.legallawyermasterservice.formData.stateiddesc,
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
if(this.legallawyermasterservice.formData && this.legallawyermasterservice.formData.cityid){this.legallawyermasterForm.patchValue({
    cityid: this.legallawyermasterservice.formData.cityid,
    cityiddesc: this.legallawyermasterservice.formData.cityiddesc,
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
    this.legallawyermasterservice.getlegallawyermastersList().then(res => {
      this.pkList = res as legallawyermaster[];
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
this.legallawyermasterForm.markAsUntouched();
this.legallawyermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.legallawyermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.legallawyermasterForm.patchValue({
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
this.legallawyermasterForm.patchValue({
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
this.legallawyermasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




resetForm() {
if (this.legallawyermasterForm != null)
this.legallawyermasterForm.reset();
this.legallawyermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.legallawyermasterservice.legallawyercourts=[];
this.legallawyermasterservice.Insertlegallawyercourts=[];
this.legallawyercourtsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let lawyerid = this.legallawyermasterForm.get('lawyerid').value;
        if(lawyerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legallawyermasterservice.deletelegallawyermaster(lawyerid).then(res =>
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
    this.legallawyermasterForm.patchValue({
        lawyerid: null
    });
    if(this.legallawyermasterservice.formData.lawyerid!=null)this.legallawyermasterservice.formData.lawyerid=null;
for (let i=0;i<this.legallawyermasterservice.legallawyercourts.length;i++) {
this.legallawyermasterservice.legallawyercourts[i].lawyercourtid=null;
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
        else if(key=="dob")
this.legallawyermasterForm.patchValue({"dob":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validfromdate")
this.legallawyermasterForm.patchValue({"validfromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validtodate")
this.legallawyermasterForm.patchValue({"validtodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legallawyermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legallawyermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legallawyermasterForm.controls[key]!=undefined)
{
this.legallawyermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("legallawyermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
lawyeridonChange(evt:any){
let e=evt.value;
}
lawyercodeonChange(evt:any){
let e=evt.value;
}
lawyernameonChange(evt:any){
let e=evt.value;
}
lawyertypeonChange(evt:any){
let e=this.f.lawyertype.value as any;
this.legallawyermasterForm.patchValue({lawyertypedesc:evt.options[evt.options.selectedIndex].text});
}
lawyercompanyonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
roleidonChange(evt:any){
let e=evt.value;
this.legallawyermasterForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.legallawyermasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
dobonChange(evt:any){
let e=evt.value;
}
mobilenumberonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
alternatenumberonChange(evt:any){
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
pinonChange(evt:any){
let e=evt.value;
}
validfromdateonChange(evt:any){
let e=evt.value;
}
validtodateonChange(evt:any){
let e=evt.value;
}
banknameonChange(evt:any){
let e=evt.value;
}
ibanonChange(evt:any){
let e=evt.value;
}
accountnumberonChange(evt:any){
let e=evt.value;
}
accountnameonChange(evt:any){
let e=evt.value;
}
bankotherdetailsonChange(evt:any){
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
  


editlegallawyermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legallawyermasterservice.getlegallawyermastersByEID(pkcol).then(res => {

this.legallawyermasterservice.formData=res.legallawyermaster;
let formproperty=res.legallawyermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legallawyermaster.pkcol;
this.formid=res.legallawyermaster.lawyerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legallawyermasterservice.formData=res.legallawyermaster;
this.formid=res.legallawyermaster.lawyerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legallawyermasterForm.patchValue({
lawyerid: res.legallawyermaster.lawyerid,
lawyercode: res.legallawyermaster.lawyercode,
lawyername: res.legallawyermaster.lawyername,
lawyertype: res.legallawyermaster.lawyertype,
lawyertypedesc: res.legallawyermaster.lawyertypedesc,
lawyercompany: res.legallawyermaster.lawyercompany,
branchid: res.legallawyermaster.branchid,
branchiddesc: res.legallawyermaster.branchiddesc,
roleid: res.legallawyermaster.roleid,
roleiddesc: res.legallawyermaster.roleiddesc,
gender: res.legallawyermaster.gender,
genderdesc: res.legallawyermaster.genderdesc,
dob: this.ngbDateParserFormatter.parse(res.legallawyermaster.dob),
mobilenumber: res.legallawyermaster.mobilenumber,
emailid: res.legallawyermaster.emailid,
alternatenumber: res.legallawyermaster.alternatenumber,
address1: res.legallawyermaster.address1,
address2: res.legallawyermaster.address2,
countryid: res.legallawyermaster.countryid,
countryiddesc: res.legallawyermaster.countryiddesc,
stateid: res.legallawyermaster.stateid,
stateiddesc: res.legallawyermaster.stateiddesc,
cityid: res.legallawyermaster.cityid,
cityiddesc: res.legallawyermaster.cityiddesc,
pin: res.legallawyermaster.pin,
validfromdate: this.ngbDateParserFormatter.parse(res.legallawyermaster.validfromdate),
validtodate: this.ngbDateParserFormatter.parse(res.legallawyermaster.validtodate),
bankname: res.legallawyermaster.bankname,
iban: res.legallawyermaster.iban,
accountnumber: res.legallawyermaster.accountnumber,
accountname: res.legallawyermaster.accountname,
bankotherdetails: res.legallawyermaster.bankotherdetails,
customfield: res.legallawyermaster.customfield,
attachment: JSON.parse(res.legallawyermaster.attachment),
status: res.legallawyermaster.status,
statusdesc: res.legallawyermaster.statusdesc,
});
this.legallawyercourtsvisiblelist=res.legallawyercourtsvisiblelist;
if(this.legallawyermasterForm.get('customfield').value!=null && this.legallawyermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.legallawyermasterForm.get('customfield').value);
this.FillCustomField();
if(this.legallawyermasterForm.get('attachment').value!=null && this.legallawyermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legallawyermasterForm.get('attachment').value);
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
this.legallawyermasterservice.legallawyercourts = res.legallawyercourts;
this.SetlegallawyercourtsTableConfig();
this.legallawyercourtsLoadTable();
  setTimeout(() => {
  this.SetlegallawyercourtsTableddConfig();
  });
this.legallawyermasterservice.Insertlegallawyercourts=[];
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
  for (let key in this.legallawyermasterForm.controls) {
    if (this.legallawyermasterForm.controls[key] != null) {
if(false)
{
if(this.legallawyermasterservice.formData!=null && this.legallawyermasterservice.formData[key]!=null  && this.legallawyermasterservice.formData[key]!='[]' && this.legallawyermasterservice.formData[key]!=undefined && this.legallawyermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legallawyermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legallawyermasterservice.formData!=null && this.legallawyermasterservice.formData[key]!=null   && this.legallawyermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legallawyermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legallawyermasterservice.formData!=null && this.legallawyermasterservice.formData[key]!=null   && this.legallawyermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legallawyermasterservice.formData[key]+"'><div class='progress__number'>"+this.legallawyermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legallawyermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legallawyermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.legallawyermasterForm.value;
obj.dob=new Date(this.legallawyermasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('dob').value)+'  UTC' :null);
obj.validfromdate=new Date(this.legallawyermasterForm.get('validfromdate').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('validfromdate').value)+'  UTC' :null);
obj.validtodate=new Date(this.legallawyermasterForm.get('validtodate').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('validtodate').value)+'  UTC' :null);
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

private legallawyermastertoggleOption(){
this.legallawyermastershowOption = this.legallawyermastershowOption === true ? false : true;
}

private legallawyercourttoggleOption(){
this.legallawyercourtshowOption = this.legallawyercourtshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legallawyermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legallawyermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legallawyermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legallawyermasterservice.formData=this.legallawyermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legallawyermasterForm.controls[key] != null)
    {
        this.legallawyermasterservice.formData[key] = this.legallawyermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.legallawyermasterservice.formData.dob=new Date(this.legallawyermasterForm.get('dob').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('dob').value)+'  UTC' :null);
this.legallawyermasterservice.formData.validfromdate=new Date(this.legallawyermasterForm.get('validfromdate').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('validfromdate').value)+'  UTC' :null);
this.legallawyermasterservice.formData.validtodate=new Date(this.legallawyermasterForm.get('validtodate').value ? this.ngbDateParserFormatter.format(this.legallawyermasterForm.get('validtodate').value)+'  UTC' :null);
if(customfields!=null)this.legallawyermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.legallawyermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legallawyermasterservice.formData.DeletedlegallawyercourtIDs = this.DeletedlegallawyercourtIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legallawyermasterservice.formData);
this.legallawyermasterservice.formData=this.legallawyermasterForm.value;
this.legallawyermasterservice.saveOrUpdatelegallawyermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.legallawyercourtssource.data)
{
    for (let i = 0; i < this.legallawyercourtssource.data.length; i++)
    {
        if (this.legallawyercourtssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legallawyercourtssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legallawyermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legallawyermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legallawyermaster);
}
else
{
this.FillData(res);
}
}
this.legallawyermasterForm.markAsUntouched();
this.legallawyermasterForm.markAsPristine();
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
data: {branchid:this.legallawyermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.legallawyermasterForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.legallawyermasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.legallawyermasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.legallawyermasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legallawyercourts
onCustomlegallawyercourtsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(legalcourtmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
legallawyercourtssettings:any;
legallawyercourtssource: any;

showlegallawyercourtsCheckbox()
{
debugger;
if(this.tbllegallawyercourtssource.settings['selectMode']== 'multi')this.tbllegallawyercourtssource.settings['selectMode']= 'single';
else
this.tbllegallawyercourtssource.settings['selectMode']= 'multi';
this.tbllegallawyercourtssource.initGrid();
}
deletelegallawyercourtsAll()
{
this.tbllegallawyercourtssource.settings['selectMode'] = 'single';
}
showlegallawyercourtsFilter()
{
  setTimeout(() => {
  this.SetlegallawyercourtsTableddConfig();
  });
      if(this.tbllegallawyercourtssource.settings!=null)this.tbllegallawyercourtssource.settings['hideSubHeader'] =!this.tbllegallawyercourtssource.settings['hideSubHeader'];
this.tbllegallawyercourtssource.initGrid();
}
showlegallawyercourtsInActive()
{
}
enablelegallawyercourtsInActive()
{
}
async SetlegallawyercourtsTableddConfig()
{
if(!this.bfilterPopulatelegallawyercourts){
}
this.bfilterPopulatelegallawyercourts=true;
}
async legallawyercourtsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegallawyercourtsTableConfig()
{
this.legallawyercourtssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
lawyercourtid: {
title: 'Lawyer Court',
type: '',
},
courtid: {
title: 'Court',
type: '',
},
courtname: {
title: 'Courtname',
type: '',
},
},
};
}
legallawyercourtsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legallawyercourtsID)>=0)
{
this.legallawyercourtssource=new LocalDataSource();
this.legallawyercourtssource.load(this.legallawyermasterservice.legallawyercourts as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllegallawyercourtssource!=null)
{this.tbllegallawyercourtssource.grid.getRows().forEach((row:any) => {
if(row.data.lawyercourtid!=null && row.data.lawyercourtid!="")
{
this.legallawyermasterservice.Insertlegallawyercourts.push(row.data);
this.tbllegallawyercourtssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
legallawyercourtsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legallawyermasterservice.legallawyercourts.length == 0)
{
    this.tbllegallawyercourtssource.grid.createFormShown = true;
}
else
{
    let obj = new legallawyercourt();
    this.legallawyermasterservice.legallawyercourts.push(obj);
    this.legallawyercourtssource.refresh();
    if ((this.legallawyermasterservice.legallawyercourts.length / this.legallawyercourtssource.getPaging().perPage).toFixed(0) + 1 != this.legallawyercourtssource.getPaging().page)
    {
        this.legallawyercourtssource.setPage((this.legallawyermasterservice.legallawyercourts.length / this.legallawyercourtssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegallawyercourtssource.grid.edit(this.tbllegallawyercourtssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legallawyercourtssource.data.indexOf(event.data);
this.onDeletelegallawyercourt(event,event.data.lawyercourtid,((this.legallawyercourtssource.getPaging().page-1) *this.legallawyercourtssource.getPaging().perPage)+index);
this.legallawyercourtssource.refresh();
break;
}
}

*/
legallawyercourtsPaging(val)
{
debugger;
this.legallawyercourtssource.setPaging(1, val, true);
}

handlelegallawyercourtsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.lawyercourtid==null || event.data.lawyercourtid=="")
{
var obj={lawyerid:this.formid,courtid:event.data.courtid}
this.legallawyermasterservice.Insertlegallawyercourts.push(obj as any);
}
else
{
var deletedids=this.DeletedlegallawyercourtIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.lawyercourtid)
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
if(event.data.lawyercourtid!=null && event.data.lawyercourtid!="")this.DeletedlegallawyercourtIDs += event.data.lawyercourtid + ","; 
}
}
IslegallawyercourtsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legallawyercourtsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legallawyercourts

}



