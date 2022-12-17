import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
import { hrmsmanpowerrequest } from './../../../model/hrmsmanpowerrequest.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { hrmsmprassign } from './../../../model/hrmsmprassign.model';
import { hrmsmprassignComponent } from './../../../pages/forms/hrmsmprassign/hrmsmprassign.component';
//FK services
import { hrmsmprapplicant } from './../../../model/hrmsmprapplicant.model';
import { hrmsmprapplicantComponent } from './../../../pages/forms/hrmsmprapplicant/hrmsmprapplicant.component';
//FK services
import { hrmsapplicantmaster,IhrmsapplicantmasterResponse } from './../../../model/hrmsapplicantmaster.model';
import { hrmsapplicantmasterComponent } from './../../../pages/forms/hrmsapplicantmaster/hrmsapplicantmaster.component';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
import { hrmsinterviewschedule } from './../../../model/hrmsinterviewschedule.model';
import { hrmsinterviewscheduleComponent } from './../../../pages/forms/hrmsinterviewschedule/hrmsinterviewschedule.component';
//FK services
import { hrmsmpragency } from './../../../model/hrmsmpragency.model';
import { hrmsmpragencyComponent } from './../../../pages/forms/hrmsmpragency/hrmsmpragency.component';
//FK services
import { hrmsrecruitmentagency,IhrmsrecruitmentagencyResponse } from './../../../model/hrmsrecruitmentagency.model';
import { hrmsrecruitmentagencyComponent } from './../../../pages/forms/hrmsrecruitmentagency/hrmsrecruitmentagency.component';
import { hrmsrecruitmentagencyService } from './../../../service/hrmsrecruitmentagency.service';
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
selector: 'app-hrmsmanpowerrequest',
templateUrl: './hrmsmanpowerrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsmanpowerrequestComponent implements OnInit {
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
bfilterPopulatehrmsmanpowerrequests:boolean=false;
datahrmsmanpowerrequestsbranch3:any=[];
datahrmsmanpowerrequestsdepartment3:any=[];
datahrmsmanpowerrequestsjobrole3:any=[];
datahrmsmanpowerrequestsrequestedby3:any=[];
datahrmsmanpowerrequestshiringreason3:any=[];
datahrmsmanpowerrequestsvacancyreason3:any=[];
datahrmsmanpowerrequestspositionlastheldby3:any=[];
datahrmsmanpowerrequestsjobtype3:any=[];
datahrmsmanpowerrequestspriority3:any=[];
datahrmsmanpowerrequestsbudgetedstatus3:any=[];
datahrmsmanpowerrequestsctccurrency3:any=[];
datahrmsmanpowerrequestsminimumeducation3:any=[];
datahrmsmanpowerrequestslastposition3:any=[];
datahrmsmanpowerrequestslastdrawnsalarycurrency3:any=[];
datahrmsmanpowerrequestsskillrequired13:any=[];
datahrmsmanpowerrequestsskillrequired23:any=[];
datahrmsmanpowerrequestsgender3:any=[];
datahrmsmanpowerrequestsdesignationid3:any=[];
datahrmsmanpowerrequestsgradeid3:any=[];
datahrmsmanpowerrequestsclassid3:any=[];
datahrmsmanpowerrequestsreservationposition3:any=[];
datahrmsmanpowerrequestscurrentstatus3:any=[];
datahrmsmprassignsassignedowner3:any=[];
bfilterPopulatehrmsmprassigns:boolean=false;
datahrmsmprapplicantsapplicantid3:any=[];
bfilterPopulatehrmsmprapplicants:boolean=false;
datahrmsinterviewschedulesinterviewer3:any=[];
datahrmsinterviewschedulescontactperson3:any=[];
datahrmsinterviewschedulesmprid3:any=[];
datahrmsinterviewschedulesvenue3:any=[];
datahrmsinterviewschedulesinterviewstatus3:any=[];
datahrmsinterviewschedulesinterviewround3:any=[];
datahrmsinterviewschedulesjobrole3:any=[];
datahrmsinterviewschedulesapplicantid3:any=[];
bfilterPopulatehrmsinterviewschedules:boolean=false;
datahrmsmpragenciesagencyid3:any=[];
bfilterPopulatehrmsmpragencies:boolean=false;
@ViewChild('tblhrmsmprassignssource',{static:false}) tblhrmsmprassignssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsmprapplicantssource',{static:false}) tblhrmsmprapplicantssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsinterviewschedulessource',{static:false}) tblhrmsinterviewschedulessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsmpragenciessource',{static:false}) tblhrmsmpragenciessource: Ng2SmartTableComponent;
 hrmsmanpowerrequestForm: FormGroup;
branchList: bobranchmaster[];
branchoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branch_bobranchmastersForm: FormGroup;//autocomplete
branch_bobranchmastersoptions:any;//autocomplete
branch_bobranchmastersformatter:any;//autocomplete
departmentList: bomasterdata[];
jobroleList: bouserrolemaster[];
requestedbyList: bousermaster[];
requestedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestedby_bousermastersForm: FormGroup;//autocomplete
requestedby_bousermastersoptions:any;//autocomplete
requestedby_bousermastersformatter:any;//autocomplete
hiringreasonList: boconfigvalue[];
vacancyreasonList: boconfigvalue[];
positionlastheldbyList: bousermaster[];
positionlastheldbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
positionlastheldby_bousermastersForm: FormGroup;//autocomplete
positionlastheldby_bousermastersoptions:any;//autocomplete
positionlastheldby_bousermastersformatter:any;//autocomplete
jobtypeList: boconfigvalue[];
priorityList: boconfigvalue[];
budgetedstatusList: boconfigvalue[];
ctccurrencyList: boconfigvalue[];
minimumeducationList: boconfigvalue[];
lastpositionList: boconfigvalue[];
lastdrawnsalarycurrencyList: boconfigvalue[];
skillrequired1List: bomasterdata[];
skillrequired2List: bomasterdata[];
genderList: boconfigvalue[];
designationidList: bouserrolemaster[];
gradeidList: boconfigvalue[];
classidList: boconfigvalue[];
reservationpositionList: boconfigvalue[];
currentstatusList: boconfigvalue[];
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
hrmsmanpowerrequestshowOption:boolean;
hrmsmprassignshowOption:boolean;
hrmsmprapplicantshowOption:boolean;
hrmsinterviewscheduleshowOption:boolean;
hrmsmpragencyshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsmprassignsvisiblelist:any;
hrmsmprassignshidelist:any;
hrmsmprapplicantsvisiblelist:any;
hrmsmprapplicantshidelist:any;
hrmsinterviewschedulesvisiblelist:any;
hrmsinterviewscheduleshidelist:any;
hrmsmpragenciesvisiblelist:any;
hrmsmpragencieshidelist:any;

DeletedhrmsmprassignIDs: string="";
hrmsmprassignsID: string = "1";
hrmsmprassignsselectedindex:any;
DeletedhrmsmprapplicantIDs: string="";
hrmsmprapplicantsID: string = "2";
hrmsmprapplicantsselectedindex:any;
DeletedhrmsinterviewscheduleIDs: string="";
hrmsinterviewschedulesID: string = "3";
hrmsinterviewschedulesselectedindex:any;
DeletedhrmsmpragencyIDs: string="";
hrmsmpragenciesID: string = "4";
hrmsmpragenciesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsmanpowerrequestservice: hrmsmanpowerrequestService,
private bousermasterservice: bousermasterService,
private hrmsapplicantmasterservice: hrmsapplicantmasterService,
private bouserrolemasterservice: bouserrolemasterService,
private hrmsrecruitmentagencyservice: hrmsrecruitmentagencyService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bomasterdataservice:bomasterdataService,
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
this.hrmsmanpowerrequestForm  = this.fb.group({
pk:[null],
ImageName: [null],
mprid: [null],
mprreference: [null],
mprdate: [null],
branch: [null],
branchdesc: [null],
department: [null],
departmentdesc: [null],
jobrole: [null],
jobroledesc: [null],
title: [null],
jobdescription: [null],
vacancycount: [null],
requestedby: [null],
requestedbydesc: [null],
hiringreason: [null],
hiringreasondesc: [null],
vacancyreason: [null],
vacancyreasondesc: [null],
positionlastheldby: [null],
positionlastheldbydesc: [null],
jobtype: [null],
jobtypedesc: [null],
priority: [null],
prioritydesc: [null],
probationperiod: [null],
pensionable: [null],
pfapplicable: [null],
requiredfrom: [null],
requiredbefore: [null],
budgetedstatus: [null],
budgetedstatusdesc: [null],
minimumexperience: [null],
ctccurrency: [null],
ctccurrencydesc: [null],
ctcamount: [null],
minimumeducation: [null],
minimumeducationdesc: [null],
lastposition: [null],
lastpositiondesc: [null],
lastdrawnsalarycurrency: [null],
lastdrawnsalarycurrencydesc: [null],
lastdrawnsalary: [null],
skillrequired1: [null],
skillrequired1desc: [null],
skillrequired2: [null],
skillrequired2desc: [null],
gender: [null],
genderdesc: [null],
designationid: [null],
designationiddesc: [null],
gradeid: [null],
gradeiddesc: [null],
classid: [null],
classiddesc: [null],
permanentvacancies: [null],
temporaryvacancies: [null],
reservationapplicable: [null],
reservationposition: [null],
reservationpositiondesc: [null],
agelimit: [null],
applicableruledetails: [null],
boardreferenceno: [null],
boardreferencedate: [null],
notes: [null],
remarks: [null],
currentstatus: [null],
currentstatusdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsmanpowerrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsmanpowerrequestForm.dirty && this.hrmsmanpowerrequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.mprid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.mprid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.mprid && pkDetail) {
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
let hrmsmanpowerrequestid = null;

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
this.formid=hrmsmanpowerrequestid;
//this.sharedService.alert(hrmsmanpowerrequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsmprassignsTableConfig();
  setTimeout(() => {
  this.SethrmsmprassignsTableddConfig();
  });

this.SethrmsmprapplicantsTableConfig();
  setTimeout(() => {
  this.SethrmsmprapplicantsTableddConfig();
  });

this.SethrmsinterviewschedulesTableConfig();
  setTimeout(() => {
  this.SethrmsinterviewschedulesTableddConfig();
  });

this.SethrmsmpragenciesTableConfig();
  setTimeout(() => {
  this.SethrmsmpragenciesTableddConfig();
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
this.branchList = res as bobranchmaster[];
if(this.hrmsmanpowerrequestservice.formData && this.hrmsmanpowerrequestservice.formData.branch){
this.branchoptionsEvent.emit(this.branchList);
this.hrmsmanpowerrequestForm.patchValue({
    branch: this.hrmsmanpowerrequestservice.formData.branch,
    branchdesc: this.hrmsmanpowerrequestservice.formData.branchdesc,
});
}
{
let arrbranch = this.branchList.filter(v => v.branchid == this.hrmsmanpowerrequestForm.get('branch').value);
let objbranch;
if (arrbranch.length > 0) objbranch = arrbranch[0];
if (objbranch)
{
}
}
}
).catch((err) => {console.log(err);});
this.branch_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branch_bobranchmastersformatter = (result: any) => result.branchname;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.jobroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestedbyList = res as bousermaster[];
if(this.hrmsmanpowerrequestservice.formData && this.hrmsmanpowerrequestservice.formData.requestedby){
this.requestedbyoptionsEvent.emit(this.requestedbyList);
this.hrmsmanpowerrequestForm.patchValue({
    requestedby: this.hrmsmanpowerrequestservice.formData.requestedby,
    requestedbydesc: this.hrmsmanpowerrequestservice.formData.requestedbydesc,
});
}
{
let arrrequestedby = this.requestedbyList.filter(v => v.userid == this.hrmsmanpowerrequestForm.get('requestedby').value);
let objrequestedby;
if (arrrequestedby.length > 0) objrequestedby = arrrequestedby[0];
if (objrequestedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("hiringreason").then(res => this.hiringreasonList = res as boconfigvalue[]);
this.configservice.getList("vacancyreason").then(res => this.vacancyreasonList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.positionlastheldbyList = res as bousermaster[];
if(this.hrmsmanpowerrequestservice.formData && this.hrmsmanpowerrequestservice.formData.positionlastheldby){
this.positionlastheldbyoptionsEvent.emit(this.positionlastheldbyList);
this.hrmsmanpowerrequestForm.patchValue({
    positionlastheldby: this.hrmsmanpowerrequestservice.formData.positionlastheldby,
    positionlastheldbydesc: this.hrmsmanpowerrequestservice.formData.positionlastheldbydesc,
});
}
{
let arrpositionlastheldby = this.positionlastheldbyList.filter(v => v.userid == this.hrmsmanpowerrequestForm.get('positionlastheldby').value);
let objpositionlastheldby;
if (arrpositionlastheldby.length > 0) objpositionlastheldby = arrpositionlastheldby[0];
if (objpositionlastheldby)
{
}
}
}
).catch((err) => {console.log(err);});
this.positionlastheldby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.positionlastheldbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.positionlastheldby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("jobtype").then(res => this.jobtypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("mprbudgetedstatus").then(res => this.budgetedstatusList = res as boconfigvalue[]);
this.configservice.getList("ctccurrency").then(res => this.ctccurrencyList = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.minimumeducationList = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.lastpositionList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.lastdrawnsalarycurrencyList = res as boconfigvalue[]);
this.bomasterdataservice.getList("cn8zm").then(res => {
this.skillrequired1List = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("cn8zm").then(res => {
this.skillrequired2List = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.designationidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("grade").then(res => this.gradeidList = res as boconfigvalue[]);
this.configservice.getList("employeeclass").then(res => this.classidList = res as boconfigvalue[]);
this.configservice.getList("reservationposition").then(res => this.reservationpositionList = res as boconfigvalue[]);
this.configservice.getList("mprstatus").then(res => this.currentstatusList = res as boconfigvalue[]);

//autocomplete
    this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsList().then(res => {
      this.pkList = res as hrmsmanpowerrequest[];
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
this.hrmsmanpowerrequestForm.markAsUntouched();
this.hrmsmanpowerrequestForm.markAsPristine();
}
onSelectedbranch(branchDetail: any) {
if (branchDetail.branchid && branchDetail) {
this.hrmsmanpowerrequestForm.patchValue({
branch: branchDetail.branchid,
branchdesc: branchDetail.branchname,

});

}
}

onSelectedrequestedby(requestedbyDetail: any) {
if (requestedbyDetail.userid && requestedbyDetail) {
this.hrmsmanpowerrequestForm.patchValue({
requestedby: requestedbyDetail.userid,
requestedbydesc: requestedbyDetail.username,

});

}
}

onSelectedpositionlastheldby(positionlastheldbyDetail: any) {
if (positionlastheldbyDetail.userid && positionlastheldbyDetail) {
this.hrmsmanpowerrequestForm.patchValue({
positionlastheldby: positionlastheldbyDetail.userid,
positionlastheldbydesc: positionlastheldbyDetail.username,

});

}
}




resetForm() {
if (this.hrmsmanpowerrequestForm != null)
this.hrmsmanpowerrequestForm.reset();
this.hrmsmanpowerrequestForm.patchValue({
branch: this.sessiondata.branchid,
branchdesc: this.sessiondata.branchiddesc,
requestedby: this.sessiondata.userid,
requestedbydesc: this.sessiondata.username,
positionlastheldby: this.sessiondata.userid,
positionlastheldbydesc: this.sessiondata.username,
});
this.hrmsmanpowerrequestForm.patchValue({
mprdate: this.ngbDateParserFormatter.parse(new Date().toString()),
requiredfrom: this.ngbDateParserFormatter.parse(new Date().toISOString()),
requiredbefore: this.ngbDateParserFormatter.parse(new Date().toISOString()),
boardreferencedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.hrmsmanpowerrequestservice.hrmsmprassigns=[];
this.hrmsmprassignsLoadTable();
this.hrmsmanpowerrequestservice.hrmsmprapplicants=[];
this.hrmsmprapplicantsLoadTable();
this.hrmsmanpowerrequestservice.hrmsinterviewschedules=[];
this.hrmsinterviewschedulesLoadTable();
this.hrmsmanpowerrequestservice.hrmsmpragencies=[];
this.hrmsmpragenciesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let mprid = this.hrmsmanpowerrequestForm.get('mprid').value;
        if(mprid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsmanpowerrequestservice.deletehrmsmanpowerrequest(mprid).then(res =>
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
    this.hrmsmanpowerrequestForm.patchValue({
        mprid: null
    });
    if(this.hrmsmanpowerrequestservice.formData.mprid!=null)this.hrmsmanpowerrequestservice.formData.mprid=null;
for (let i=0;i<this.hrmsmanpowerrequestservice.hrmsmprassigns.length;i++) {
this.hrmsmanpowerrequestservice.hrmsmprassigns[i].assignid=null;
}
for (let i=0;i<this.hrmsmanpowerrequestservice.hrmsmprapplicants.length;i++) {
this.hrmsmanpowerrequestservice.hrmsmprapplicants[i].mprapplicantid=null;
}
for (let i=0;i<this.hrmsmanpowerrequestservice.hrmsinterviewschedules.length;i++) {
this.hrmsmanpowerrequestservice.hrmsinterviewschedules[i].interviewid=null;
}
for (let i=0;i<this.hrmsmanpowerrequestservice.hrmsmpragencies.length;i++) {
this.hrmsmanpowerrequestservice.hrmsmpragencies[i].raassignid=null;
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
        else if(key=="mprdate")
this.hrmsmanpowerrequestForm.patchValue({"mprdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requiredfrom")
this.hrmsmanpowerrequestForm.patchValue({"requiredfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requiredbefore")
this.hrmsmanpowerrequestForm.patchValue({"requiredbefore":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="boardreferencedate")
this.hrmsmanpowerrequestForm.patchValue({"boardreferencedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsmanpowerrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsmanpowerrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsmanpowerrequestForm.controls[key]!=undefined)
{
this.hrmsmanpowerrequestForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hrmsmanpowerrequests",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
mpridonChange(evt:any){
let e=evt.value;
}
mprreferenceonChange(evt:any){
let e=evt.value;
}
mprdateonChange(evt:any){
let e=evt.value;
}
branchonChange(evt:any){
let e=evt.value;
}
departmentonChange(evt:any){
let e=evt.value;
this.hrmsmanpowerrequestForm.patchValue({departmentdesc:evt.options[evt.options.selectedIndex].text});
}
jobroleonChange(evt:any){
let e=evt.value;
this.hrmsmanpowerrequestForm.patchValue({jobroledesc:evt.options[evt.options.selectedIndex].text});
}
titleonChange(evt:any){
let e=evt.value;
}
jobdescriptiononChange(evt:any){
let e=evt.value;
}
vacancycountonChange(evt:any){
let e=evt.value;
}
requestedbyonChange(evt:any){
let e=evt.value;
}
hiringreasononChange(evt:any){
let e=this.f.hiringreason.value as any;
this.hrmsmanpowerrequestForm.patchValue({hiringreasondesc:evt.options[evt.options.selectedIndex].text});
}
vacancyreasononChange(evt:any){
let e=this.f.vacancyreason.value as any;
this.hrmsmanpowerrequestForm.patchValue({vacancyreasondesc:evt.options[evt.options.selectedIndex].text});
}
positionlastheldbyonChange(evt:any){
let e=evt.value;
}
jobtypeonChange(evt:any){
let e=this.f.jobtype.value as any;
this.hrmsmanpowerrequestForm.patchValue({jobtypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.hrmsmanpowerrequestForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
probationperiodonChange(evt:any){
let e=evt.value;
}
pensionableonChange(evt:any){
let e=evt.value;
}
pfapplicableonChange(evt:any){
let e=evt.value;
}
requiredfromonChange(evt:any){
let e=evt.value;
}
requiredbeforeonChange(evt:any){
let e=evt.value;
}
budgetedstatusonChange(evt:any){
let e=this.f.budgetedstatus.value as any;
this.hrmsmanpowerrequestForm.patchValue({budgetedstatusdesc:evt.options[evt.options.selectedIndex].text});
}
minimumexperienceonChange(evt:any){
let e=evt.value;
}
ctccurrencyonChange(evt:any){
let e=this.f.ctccurrency.value as any;
this.hrmsmanpowerrequestForm.patchValue({ctccurrencydesc:evt.options[evt.options.selectedIndex].text});
}
ctcamountonChange(evt:any){
let e=evt.value;
}
minimumeducationonChange(evt:any){
let e=this.f.minimumeducation.value as any;
this.hrmsmanpowerrequestForm.patchValue({minimumeducationdesc:evt.options[evt.options.selectedIndex].text});
}
lastpositiononChange(evt:any){
let e=this.f.lastposition.value as any;
this.hrmsmanpowerrequestForm.patchValue({lastpositiondesc:evt.options[evt.options.selectedIndex].text});
}
lastdrawnsalarycurrencyonChange(evt:any){
let e=this.f.lastdrawnsalarycurrency.value as any;
this.hrmsmanpowerrequestForm.patchValue({lastdrawnsalarycurrencydesc:evt.options[evt.options.selectedIndex].text});
}
lastdrawnsalaryonChange(evt:any){
let e=evt.value;
}
skillrequired1onChange(evt:any){
let e=evt.value;
this.hrmsmanpowerrequestForm.patchValue({skillrequired1desc:evt.options[evt.options.selectedIndex].text});
}
skillrequired2onChange(evt:any){
let e=evt.value;
this.hrmsmanpowerrequestForm.patchValue({skillrequired2desc:evt.options[evt.options.selectedIndex].text});
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.hrmsmanpowerrequestForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=evt.value;
this.hrmsmanpowerrequestForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
gradeidonChange(evt:any){
let e=this.f.gradeid.value as any;
this.hrmsmanpowerrequestForm.patchValue({gradeiddesc:evt.options[evt.options.selectedIndex].text});
}
classidonChange(evt:any){
let e=this.f.classid.value as any;
this.hrmsmanpowerrequestForm.patchValue({classiddesc:evt.options[evt.options.selectedIndex].text});
}
permanentvacanciesonChange(evt:any){
let e=evt.value;
}
temporaryvacanciesonChange(evt:any){
let e=evt.value;
}
reservationapplicableonChange(evt:any){
let e=evt.value;
}
reservationpositiononChange(evt:any){
let e=this.f.reservationposition.value as any;
this.hrmsmanpowerrequestForm.patchValue({reservationpositiondesc:evt.options[evt.options.selectedIndex].text});
}
agelimitonChange(evt:any){
let e=evt.value;
}
applicableruledetailsonChange(evt:any){
let e=evt.value;
}
boardreferencenoonChange(evt:any){
let e=evt.value;
}
boardreferencedateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
currentstatusonChange(evt:any){
let e=this.f.currentstatus.value as any;
this.hrmsmanpowerrequestForm.patchValue({currentstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


edithrmsmanpowerrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsByEID(pkcol).then(res => {

this.hrmsmanpowerrequestservice.formData=res.hrmsmanpowerrequest;
let formproperty=res.hrmsmanpowerrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsmanpowerrequest.pkcol;
this.formid=res.hrmsmanpowerrequest.mprid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsmanpowerrequest.mprid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsmanpowerrequestForm.patchValue({
mprid: res.hrmsmanpowerrequest.mprid,
mprreference: res.hrmsmanpowerrequest.mprreference,
mprdate: this.ngbDateParserFormatter.parse(res.hrmsmanpowerrequest.mprdate),
branch: res.hrmsmanpowerrequest.branch,
branchdesc: res.hrmsmanpowerrequest.branchdesc,
department: res.hrmsmanpowerrequest.department,
departmentdesc: res.hrmsmanpowerrequest.departmentdesc,
jobrole: res.hrmsmanpowerrequest.jobrole,
jobroledesc: res.hrmsmanpowerrequest.jobroledesc,
title: res.hrmsmanpowerrequest.title,
jobdescription: res.hrmsmanpowerrequest.jobdescription,
vacancycount: res.hrmsmanpowerrequest.vacancycount,
requestedby: res.hrmsmanpowerrequest.requestedby,
requestedbydesc: res.hrmsmanpowerrequest.requestedbydesc,
hiringreason: res.hrmsmanpowerrequest.hiringreason,
hiringreasondesc: res.hrmsmanpowerrequest.hiringreasondesc,
vacancyreason: res.hrmsmanpowerrequest.vacancyreason,
vacancyreasondesc: res.hrmsmanpowerrequest.vacancyreasondesc,
positionlastheldby: res.hrmsmanpowerrequest.positionlastheldby,
positionlastheldbydesc: res.hrmsmanpowerrequest.positionlastheldbydesc,
jobtype: res.hrmsmanpowerrequest.jobtype,
jobtypedesc: res.hrmsmanpowerrequest.jobtypedesc,
priority: res.hrmsmanpowerrequest.priority,
prioritydesc: res.hrmsmanpowerrequest.prioritydesc,
probationperiod: res.hrmsmanpowerrequest.probationperiod,
pensionable: res.hrmsmanpowerrequest.pensionable,
pfapplicable: res.hrmsmanpowerrequest.pfapplicable,
requiredfrom: this.ngbDateParserFormatter.parse(res.hrmsmanpowerrequest.requiredfrom),
requiredbefore: this.ngbDateParserFormatter.parse(res.hrmsmanpowerrequest.requiredbefore),
budgetedstatus: res.hrmsmanpowerrequest.budgetedstatus,
budgetedstatusdesc: res.hrmsmanpowerrequest.budgetedstatusdesc,
minimumexperience: res.hrmsmanpowerrequest.minimumexperience,
ctccurrency: res.hrmsmanpowerrequest.ctccurrency,
ctccurrencydesc: res.hrmsmanpowerrequest.ctccurrencydesc,
ctcamount: res.hrmsmanpowerrequest.ctcamount,
minimumeducation: res.hrmsmanpowerrequest.minimumeducation,
minimumeducationdesc: res.hrmsmanpowerrequest.minimumeducationdesc,
lastposition: res.hrmsmanpowerrequest.lastposition,
lastpositiondesc: res.hrmsmanpowerrequest.lastpositiondesc,
lastdrawnsalarycurrency: res.hrmsmanpowerrequest.lastdrawnsalarycurrency,
lastdrawnsalarycurrencydesc: res.hrmsmanpowerrequest.lastdrawnsalarycurrencydesc,
lastdrawnsalary: res.hrmsmanpowerrequest.lastdrawnsalary,
skillrequired1: res.hrmsmanpowerrequest.skillrequired1,
skillrequired1desc: res.hrmsmanpowerrequest.skillrequired1desc,
skillrequired2: res.hrmsmanpowerrequest.skillrequired2,
skillrequired2desc: res.hrmsmanpowerrequest.skillrequired2desc,
gender: res.hrmsmanpowerrequest.gender,
genderdesc: res.hrmsmanpowerrequest.genderdesc,
designationid: res.hrmsmanpowerrequest.designationid,
designationiddesc: res.hrmsmanpowerrequest.designationiddesc,
gradeid: res.hrmsmanpowerrequest.gradeid,
gradeiddesc: res.hrmsmanpowerrequest.gradeiddesc,
classid: res.hrmsmanpowerrequest.classid,
classiddesc: res.hrmsmanpowerrequest.classiddesc,
permanentvacancies: res.hrmsmanpowerrequest.permanentvacancies,
temporaryvacancies: res.hrmsmanpowerrequest.temporaryvacancies,
reservationapplicable: res.hrmsmanpowerrequest.reservationapplicable,
reservationposition: res.hrmsmanpowerrequest.reservationposition,
reservationpositiondesc: res.hrmsmanpowerrequest.reservationpositiondesc,
agelimit: res.hrmsmanpowerrequest.agelimit,
applicableruledetails: res.hrmsmanpowerrequest.applicableruledetails,
boardreferenceno: res.hrmsmanpowerrequest.boardreferenceno,
boardreferencedate: this.ngbDateParserFormatter.parse(res.hrmsmanpowerrequest.boardreferencedate),
notes: res.hrmsmanpowerrequest.notes,
remarks: res.hrmsmanpowerrequest.remarks,
currentstatus: res.hrmsmanpowerrequest.currentstatus,
currentstatusdesc: res.hrmsmanpowerrequest.currentstatusdesc,
customfield: res.hrmsmanpowerrequest.customfield,
attachment: JSON.parse(res.hrmsmanpowerrequest.attachment),
status: res.hrmsmanpowerrequest.status,
statusdesc: res.hrmsmanpowerrequest.statusdesc,
});
this.hrmsmprassignsvisiblelist=res.hrmsmprassignsvisiblelist;
this.hrmsmprapplicantsvisiblelist=res.hrmsmprapplicantsvisiblelist;
this.hrmsinterviewschedulesvisiblelist=res.hrmsinterviewschedulesvisiblelist;
this.hrmsmpragenciesvisiblelist=res.hrmsmpragenciesvisiblelist;
if(this.hrmsmanpowerrequestForm.get('customfield').value!=null && this.hrmsmanpowerrequestForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hrmsmanpowerrequestForm.get('customfield').value);
this.FillCustomField();
if(this.hrmsmanpowerrequestForm.get('attachment').value!=null && this.hrmsmanpowerrequestForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsmanpowerrequestForm.get('attachment').value);
//Child Tables if any
this.hrmsmanpowerrequestservice.hrmsmprassigns = res.hrmsmprassigns;
this.SethrmsmprassignsTableConfig();
this.hrmsmprassignsLoadTable();
  setTimeout(() => {
  this.SethrmsmprassignsTableddConfig();
  });
this.hrmsmanpowerrequestservice.hrmsmprapplicants = res.hrmsmprapplicants;
this.SethrmsmprapplicantsTableConfig();
this.hrmsmprapplicantsLoadTable();
  setTimeout(() => {
  this.SethrmsmprapplicantsTableddConfig();
  });
this.hrmsmanpowerrequestservice.hrmsinterviewschedules = res.hrmsinterviewschedules;
this.SethrmsinterviewschedulesTableConfig();
this.hrmsinterviewschedulesLoadTable();
  setTimeout(() => {
  this.SethrmsinterviewschedulesTableddConfig();
  });
this.hrmsmanpowerrequestservice.hrmsmpragencies = res.hrmsmpragencies;
this.SethrmsmpragenciesTableConfig();
this.hrmsmpragenciesLoadTable();
  setTimeout(() => {
  this.SethrmsmpragenciesTableddConfig();
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
  for (let key in this.hrmsmanpowerrequestForm.controls) {
    if (this.hrmsmanpowerrequestForm.controls[key] != null) {
if(false)
{
if(this.hrmsmanpowerrequestservice.formData!=null && this.hrmsmanpowerrequestservice.formData[key]!=null  && this.hrmsmanpowerrequestservice.formData[key]!='[]' && this.hrmsmanpowerrequestservice.formData[key]!=undefined && this.hrmsmanpowerrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsmanpowerrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsmanpowerrequestservice.formData!=null && this.hrmsmanpowerrequestservice.formData[key]!=null   && this.hrmsmanpowerrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsmanpowerrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsmanpowerrequestservice.formData!=null && this.hrmsmanpowerrequestservice.formData[key]!=null   && this.hrmsmanpowerrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsmanpowerrequestservice.formData[key]+"'><div class='progress__number'>"+this.hrmsmanpowerrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsmanpowerrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsmanpowerrequestForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hrmsmanpowerrequestForm.value;
obj.mprdate=new Date(this.hrmsmanpowerrequestForm.get('mprdate').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('mprdate').value)+'  UTC' :null);
obj.requiredfrom=new Date(this.hrmsmanpowerrequestForm.get('requiredfrom').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('requiredfrom').value)+'  UTC' :null);
obj.requiredbefore=new Date(this.hrmsmanpowerrequestForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('requiredbefore').value)+'  UTC' :null);
obj.boardreferencedate=new Date(this.hrmsmanpowerrequestForm.get('boardreferencedate').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('boardreferencedate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
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

private hrmsmanpowerrequesttoggleOption(){
this.hrmsmanpowerrequestshowOption = this.hrmsmanpowerrequestshowOption === true ? false : true;
}

private hrmsmprassigntoggleOption(){
this.hrmsmprassignshowOption = this.hrmsmprassignshowOption === true ? false : true;
}

private hrmsmprapplicanttoggleOption(){
this.hrmsmprapplicantshowOption = this.hrmsmprapplicantshowOption === true ? false : true;
}

private hrmsinterviewscheduletoggleOption(){
this.hrmsinterviewscheduleshowOption = this.hrmsinterviewscheduleshowOption === true ? false : true;
}

private hrmsmpragencytoggleOption(){
this.hrmsmpragencyshowOption = this.hrmsmpragencyshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsmanpowerrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsmanpowerrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsmanpowerrequestForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsmanpowerrequestservice.formData=this.hrmsmanpowerrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsmanpowerrequestForm.controls[key] != null)
    {
        this.hrmsmanpowerrequestservice.formData[key] = this.hrmsmanpowerrequestForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hrmsmanpowerrequestservice.formData.mprdate=new Date(this.hrmsmanpowerrequestForm.get('mprdate').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('mprdate').value)+'  UTC' :null);
this.hrmsmanpowerrequestservice.formData.requiredfrom=new Date(this.hrmsmanpowerrequestForm.get('requiredfrom').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('requiredfrom').value)+'  UTC' :null);
this.hrmsmanpowerrequestservice.formData.requiredbefore=new Date(this.hrmsmanpowerrequestForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('requiredbefore').value)+'  UTC' :null);
this.hrmsmanpowerrequestservice.formData.boardreferencedate=new Date(this.hrmsmanpowerrequestForm.get('boardreferencedate').value ? this.ngbDateParserFormatter.format(this.hrmsmanpowerrequestForm.get('boardreferencedate').value)+'  UTC' :null);
this.hrmsmanpowerrequestservice.formData.customfield=JSON.stringify(customfields);
this.hrmsmanpowerrequestservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmsmanpowerrequestservice.formData.DeletedhrmsmprassignIDs = this.DeletedhrmsmprassignIDs;
this.hrmsmanpowerrequestservice.formData.DeletedhrmsmprapplicantIDs = this.DeletedhrmsmprapplicantIDs;
this.hrmsmanpowerrequestservice.formData.DeletedhrmsinterviewscheduleIDs = this.DeletedhrmsinterviewscheduleIDs;
this.hrmsmanpowerrequestservice.formData.DeletedhrmsmpragencyIDs = this.DeletedhrmsmpragencyIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsmanpowerrequestservice.formData);
this.hrmsmanpowerrequestservice.formData=this.hrmsmanpowerrequestForm.value;
this.hrmsmanpowerrequestservice.saveOrUpdatehrmsmanpowerrequests().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmsmprassignssource.data)
{
    for (let i = 0; i < this.hrmsmprassignssource.data.length; i++)
    {
        if (this.hrmsmprassignssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsmprassignssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsmprapplicantssource.data)
{
    for (let i = 0; i < this.hrmsmprapplicantssource.data.length; i++)
    {
        if (this.hrmsmprapplicantssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsmprapplicantssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsinterviewschedulessource.data)
{
    for (let i = 0; i < this.hrmsinterviewschedulessource.data.length; i++)
    {
        if (this.hrmsinterviewschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinterviewschedulessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsmpragenciessource.data)
{
    for (let i = 0; i < this.hrmsmpragenciessource.data.length; i++)
    {
        if (this.hrmsmpragenciessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsmpragenciessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsmanpowerrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsmanpowerrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsmanpowerrequest);
}
else
{
this.FillData(res);
}
}
this.hrmsmanpowerrequestForm.markAsUntouched();
this.hrmsmanpowerrequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranch( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.hrmsmanpowerrequestForm.get('branch').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsmanpowerrequestForm.get('department').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditjobrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsmanpowerrequestForm.get('jobrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsmanpowerrequestForm.get('requestedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpositionlastheldby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsmanpowerrequestForm.get('positionlastheldby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditskillrequired1( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsmanpowerrequestForm.get('skillrequired1').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditskillrequired2( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsmanpowerrequestForm.get('skillrequired2').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdesignationid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsmanpowerrequestForm.get('designationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsmprassign(event:any,assignid:any, mprid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsmprassignComponent, 
{
data:  {  showview:false,save:false,event,assignid, mprid,visiblelist:this.hrmsmprassignsvisiblelist,  hidelist:this.hrmsmprassignshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsmprassignssource.add(res);
this.hrmsmprassignssource.refresh();
}
else
{
this.hrmsmprassignssource.update(event.data, res);
}
}
});
}

onDeletehrmsmprassign(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsmprassignIDs += childID + ",";
this.hrmsmanpowerrequestservice.hrmsmprassigns.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsmprapplicant(event:any,mprapplicantid:any, mprid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsmprapplicantComponent, 
{
data:  {  showview:false,save:false,event,mprapplicantid, mprid,visiblelist:this.hrmsmprapplicantsvisiblelist,  hidelist:this.hrmsmprapplicantshidelist,ScreenType:2  },
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
this.hrmsmanpowerrequestservice.hrmsmprapplicants.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsinterviewschedule(event:any,interviewid:any, mprid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsinterviewscheduleComponent, 
{
data:  {  showview:false,save:false,event,interviewid, mprid,visiblelist:this.hrmsinterviewschedulesvisiblelist,  hidelist:this.hrmsinterviewscheduleshidelist,ScreenType:2  },
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
this.hrmsmanpowerrequestservice.hrmsinterviewschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsmpragency(event:any,raassignid:any, mprid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsmpragencyComponent, 
{
data:  {  showview:false,save:false,event,raassignid, mprid,visiblelist:this.hrmsmpragenciesvisiblelist,  hidelist:this.hrmsmpragencieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsmpragenciessource.add(res);
this.hrmsmpragenciessource.refresh();
}
else
{
this.hrmsmpragenciessource.update(event.data, res);
}
}
});
}

onDeletehrmsmpragency(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsmpragencyIDs += childID + ",";
this.hrmsmanpowerrequestservice.hrmsmpragencies.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsmprassigns
hrmsmprassignssettings:any;
hrmsmprassignssource: any;

showhrmsmprassignsCheckbox()
{
debugger;
if(this.tblhrmsmprassignssource.settings['selectMode']== 'multi')this.tblhrmsmprassignssource.settings['selectMode']= 'single';
else
this.tblhrmsmprassignssource.settings['selectMode']= 'multi';
this.tblhrmsmprassignssource.initGrid();
}
deletehrmsmprassignsAll()
{
this.tblhrmsmprassignssource.settings['selectMode'] = 'single';
}
showhrmsmprassignsFilter()
{
  setTimeout(() => {
  this.SethrmsmprassignsTableddConfig();
  });
      if(this.tblhrmsmprassignssource.settings!=null)this.tblhrmsmprassignssource.settings['hideSubHeader'] =!this.tblhrmsmprassignssource.settings['hideSubHeader'];
this.tblhrmsmprassignssource.initGrid();
}
showhrmsmprassignsInActive()
{
}
enablehrmsmprassignsInActive()
{
}
async SethrmsmprassignsTableddConfig()
{
if(!this.bfilterPopulatehrmsmprassigns){

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataassignedowner2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsmprassignsassignedowner3.push(defaultobj);
for(let i=0; i<dataassignedowner2.length; i++){
var obj= { value: dataassignedowner2[i].userid, title:dataassignedowner2[i].username};
this.datahrmsmprassignsassignedowner3.push(obj);
}
if((this.tblhrmsmprassignssource.settings as any).columns['assignedowner'])
{
(this.tblhrmsmprassignssource.settings as any).columns['assignedowner'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsmprassignsassignedowner3));
this.tblhrmsmprassignssource.initGrid();
}
});
}
this.bfilterPopulatehrmsmprassigns=true;
}
async hrmsmprassignsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsmprassignsTableConfig()
{
this.hrmsmprassignssettings = {
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
assignedowner: {
title: 'Assigned Owner',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsmprassignsassignedowner3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assignedquantity: {
title: 'Assigned Quantity',
type: 'number',
filter:true,
},
offered1: {
title: 'Offered1',
type: 'number',
filter:true,
},
joined1: {
title: 'Joined1',
type: 'number',
filter:true,
},
startdate1: {
title: 'Start Date1',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completiondate1: {
title: 'Completion Date1',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offered2: {
title: 'Offered2',
type: 'number',
filter:true,
},
joined2: {
title: 'Joined2',
type: 'number',
filter:true,
},
startdate2: {
title: 'Start Date2',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completiondate2: {
title: 'Completion Date2',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offered3: {
title: 'Offered3',
type: 'number',
filter:true,
},
joined3: {
title: 'Joined3',
type: 'number',
filter:true,
},
startdate3: {
title: 'Start Date3',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completiondate3: {
title: 'Completion Date3',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offered4: {
title: 'Offered4',
type: 'number',
filter:true,
},
joined4: {
title: 'Joined4',
type: 'number',
filter:true,
},
startdate4: {
title: 'Start Date4',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completiondate4: {
title: 'Completion Date4',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
offered5: {
title: 'Offered5',
type: 'number',
filter:true,
},
joined5: {
title: 'Joined5',
type: 'number',
filter:true,
},
startdate5: {
title: 'Start Date5',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completiondate5: {
title: 'Completion Date5',
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
hrmsmprassignsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmprassignsID)>=0)
{
this.hrmsmprassignssource=new LocalDataSource();
this.hrmsmprassignssource.load(this.hrmsmanpowerrequestservice.hrmsmprassigns as  any as LocalDataSource);
this.hrmsmprassignssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsmprassignsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsmanpowerrequestservice.hrmsmprassigns.length == 0)
{
    this.tblhrmsmprassignssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsmprassign();
    this.hrmsmanpowerrequestservice.hrmsmprassigns.push(obj);
    this.hrmsmprassignssource.refresh();
    if ((this.hrmsmanpowerrequestservice.hrmsmprassigns.length / this.hrmsmprassignssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsmprassignssource.getPaging().page)
    {
        this.hrmsmprassignssource.setPage((this.hrmsmanpowerrequestservice.hrmsmprassigns.length / this.hrmsmprassignssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsmprassignssource.grid.edit(this.tblhrmsmprassignssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsmprassignssource.data.indexOf(event.data);
this.onDeletehrmsmprassign(event,event.data.assignid,((this.hrmsmprassignssource.getPaging().page-1) *this.hrmsmprassignssource.getPaging().perPage)+index);
this.hrmsmprassignssource.refresh();
break;
}
}

*/
hrmsmprassignsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsmprassign(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsmprassign(event,event.data.assignid,this.formid);
break;
case 'delete':
this.onDeletehrmsmprassign(event,event.data.assignid,((this.hrmsmprassignssource.getPaging().page-1) *this.hrmsmprassignssource.getPaging().perPage)+event.index);
this.hrmsmprassignssource.refresh();
break;
}
}
hrmsmprassignsonDelete(obj) {
let assignid=obj.data.assignid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsmanpowerrequestservice.deletehrmsmanpowerrequest(assignid).then(res=>
this.hrmsmprassignsLoadTable()
);
}
}
hrmsmprassignsPaging(val)
{
debugger;
this.hrmsmprassignssource.setPaging(1, val, true);
}

handlehrmsmprassignsGridSelected(event:any) {
this.hrmsmprassignsselectedindex=this.hrmsmanpowerrequestservice.hrmsmprassigns.findIndex(i => i.assignid === event.data.assignid);
}
IshrmsmprassignsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmprassignsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsmprassigns
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
applicantid: {
title: 'Applicant',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'sb4n4',reportcode:'sb4n4',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsmprapplicantsapplicantid3.find(c=>c.value==cell);
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
this.hrmsmprapplicantssource.load(this.hrmsmanpowerrequestservice.hrmsmprapplicants as  any as LocalDataSource);
this.hrmsmprapplicantssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsmprapplicantsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsmanpowerrequestservice.hrmsmprapplicants.length == 0)
{
    this.tblhrmsmprapplicantssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsmprapplicant();
    this.hrmsmanpowerrequestservice.hrmsmprapplicants.push(obj);
    this.hrmsmprapplicantssource.refresh();
    if ((this.hrmsmanpowerrequestservice.hrmsmprapplicants.length / this.hrmsmprapplicantssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsmprapplicantssource.getPaging().page)
    {
        this.hrmsmprapplicantssource.setPage((this.hrmsmanpowerrequestservice.hrmsmprapplicants.length / this.hrmsmprapplicantssource.getPaging().perPage).toFixed(0) + 1);
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
this.hrmsmanpowerrequestservice.deletehrmsmanpowerrequest(mprid).then(res=>
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
this.hrmsmprapplicantsselectedindex=this.hrmsmanpowerrequestservice.hrmsmprapplicants.findIndex(i => i.mprapplicantid === event.data.mprapplicantid);
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
this.hrmsinterviewschedulessource.load(this.hrmsmanpowerrequestservice.hrmsinterviewschedules as  any as LocalDataSource);
this.hrmsinterviewschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsinterviewschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsmanpowerrequestservice.hrmsinterviewschedules.length == 0)
{
    this.tblhrmsinterviewschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinterviewschedule();
    this.hrmsmanpowerrequestservice.hrmsinterviewschedules.push(obj);
    this.hrmsinterviewschedulessource.refresh();
    if ((this.hrmsmanpowerrequestservice.hrmsinterviewschedules.length / this.hrmsinterviewschedulessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinterviewschedulessource.getPaging().page)
    {
        this.hrmsinterviewschedulessource.setPage((this.hrmsmanpowerrequestservice.hrmsinterviewschedules.length / this.hrmsinterviewschedulessource.getPaging().perPage).toFixed(0) + 1);
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
this.hrmsmanpowerrequestservice.deletehrmsmanpowerrequest(interviewid).then(res=>
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
this.hrmsinterviewschedulesselectedindex=this.hrmsmanpowerrequestservice.hrmsinterviewschedules.findIndex(i => i.interviewid === event.data.interviewid);
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
//start of Grid Codes hrmsmpragencies
hrmsmpragenciessettings:any;
hrmsmpragenciessource: any;

showhrmsmpragenciesCheckbox()
{
debugger;
if(this.tblhrmsmpragenciessource.settings['selectMode']== 'multi')this.tblhrmsmpragenciessource.settings['selectMode']= 'single';
else
this.tblhrmsmpragenciessource.settings['selectMode']= 'multi';
this.tblhrmsmpragenciessource.initGrid();
}
deletehrmsmpragenciesAll()
{
this.tblhrmsmpragenciessource.settings['selectMode'] = 'single';
}
showhrmsmpragenciesFilter()
{
  setTimeout(() => {
  this.SethrmsmpragenciesTableddConfig();
  });
      if(this.tblhrmsmpragenciessource.settings!=null)this.tblhrmsmpragenciessource.settings['hideSubHeader'] =!this.tblhrmsmpragenciessource.settings['hideSubHeader'];
this.tblhrmsmpragenciessource.initGrid();
}
showhrmsmpragenciesInActive()
{
}
enablehrmsmpragenciesInActive()
{
}
async SethrmsmpragenciesTableddConfig()
{
if(!this.bfilterPopulatehrmsmpragencies){

this.hrmsrecruitmentagencyservice.gethrmsrecruitmentagenciesList().then(res=>
{
var dataagencyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsmpragenciesagencyid3.push(defaultobj);
for(let i=0; i<dataagencyid2.length; i++){
var obj= { value: dataagencyid2[i].raid, title:dataagencyid2[i].agencyname};
this.datahrmsmpragenciesagencyid3.push(obj);
}
if((this.tblhrmsmpragenciessource.settings as any).columns['agencyid'])
{
(this.tblhrmsmpragenciessource.settings as any).columns['agencyid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsmpragenciesagencyid3));
this.tblhrmsmpragenciessource.initGrid();
}
});
}
this.bfilterPopulatehrmsmpragencies=true;
}
async hrmsmpragenciesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsmpragenciesTableConfig()
{
this.hrmsmpragenciessettings = {
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
agencyid: {
title: 'Agency',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'k3fyz',reportcode:'k3fyz',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsmpragenciesagencyid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assignedquantity: {
title: 'Assigned Quantity',
type: 'number',
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
completiondate: {
title: 'Completion Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
chargesperresource: {
title: 'Charges Per Resource',
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
hrmsmpragenciesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmpragenciesID)>=0)
{
this.hrmsmpragenciessource=new LocalDataSource();
this.hrmsmpragenciessource.load(this.hrmsmanpowerrequestservice.hrmsmpragencies as  any as LocalDataSource);
this.hrmsmpragenciessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsmpragenciesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsmanpowerrequestservice.hrmsmpragencies.length == 0)
{
    this.tblhrmsmpragenciessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsmpragency();
    this.hrmsmanpowerrequestservice.hrmsmpragencies.push(obj);
    this.hrmsmpragenciessource.refresh();
    if ((this.hrmsmanpowerrequestservice.hrmsmpragencies.length / this.hrmsmpragenciessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsmpragenciessource.getPaging().page)
    {
        this.hrmsmpragenciessource.setPage((this.hrmsmanpowerrequestservice.hrmsmpragencies.length / this.hrmsmpragenciessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsmpragenciessource.grid.edit(this.tblhrmsmpragenciessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsmpragenciessource.data.indexOf(event.data);
this.onDeletehrmsmpragency(event,event.data.raassignid,((this.hrmsmpragenciessource.getPaging().page-1) *this.hrmsmpragenciessource.getPaging().perPage)+index);
this.hrmsmpragenciessource.refresh();
break;
}
}

*/
hrmsmpragenciesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsmpragency(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsmpragency(event,event.data.raassignid,this.formid);
break;
case 'delete':
this.onDeletehrmsmpragency(event,event.data.raassignid,((this.hrmsmpragenciessource.getPaging().page-1) *this.hrmsmpragenciessource.getPaging().perPage)+event.index);
this.hrmsmpragenciessource.refresh();
break;
}
}
hrmsmpragenciesonDelete(obj) {
let raassignid=obj.data.raassignid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsmanpowerrequestservice.deletehrmsmanpowerrequest(raassignid).then(res=>
this.hrmsmpragenciesLoadTable()
);
}
}
hrmsmpragenciesPaging(val)
{
debugger;
this.hrmsmpragenciessource.setPaging(1, val, true);
}

handlehrmsmpragenciesGridSelected(event:any) {
this.hrmsmpragenciesselectedindex=this.hrmsmanpowerrequestservice.hrmsmpragencies.findIndex(i => i.raassignid === event.data.raassignid);
}
IshrmsmpragenciesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsmpragenciesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsmpragencies

}



