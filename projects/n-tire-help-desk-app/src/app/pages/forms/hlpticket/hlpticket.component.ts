import { hlpticketService } from './../../../service/hlpticket.service';
import { hlpticket } from './../../../model/hlpticket.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { hlpservicelevel} from './../../../model/hlpservicelevel.model';
import { hlpservicelevelComponent } from './../../../pages/forms/hlpservicelevel/hlpservicelevel.component';
import { hlpservicelevelService } from './../../../service/hlpservicelevel.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
//detail table services
import { hlpplannedaction } from './../../../model/hlpplannedaction.model';
import { hlpplannedactionComponent } from './../../../pages/forms/hlpplannedaction/hlpplannedaction.component';
//FK services
import { hlpticketdetail } from './../../../model/hlpticketdetail.model';
import { hlpticketdetailComponent } from './../../../pages/forms/hlpticketdetail/hlpticketdetail.component';
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
selector: 'app-hlpticket',
templateUrl: './hlpticket.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hlpticketComponent implements OnInit {
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
bfilterPopulatehlptickets:boolean=false;
datahlpticketssourcefield3:any=[];
datahlpticketsbranchid3:any=[];
datahlpticketsdepartmentid3:any=[];
datahlpticketsrequestortype3:any=[];
datahlpticketsrequestor3:any=[];
datahlpticketstickettype3:any=[];
datahlpticketspriority3:any=[];
datahlpticketscriticality3:any=[];
datahlpticketsimpact3:any=[];
datahlpticketsrisk3:any=[];
datahlpticketssla3:any=[];
datahlpticketssource3:any=[];
datahlpticketscategory3:any=[];
datahlpticketssubcategory3:any=[];
datahlpticketsstage3:any=[];
datahlpticketscompletedby3:any=[];
datahlpticketsrca3:any=[];
datahlpticketssolution3:any=[];
datahlpplannedactionsticketid3:any=[];
bfilterPopulatehlpplannedactions:boolean=false;
datahlpticketdetailsactionuser3:any=[];
datahlpticketdetailsticketid3:any=[];
bfilterPopulatehlpticketdetails:boolean=false;
@ViewChild('tblhlpplannedactionssource',{static:false}) tblhlpplannedactionssource: Ng2SmartTableComponent;
@ViewChild('tblhlpticketdetailssource',{static:false}) tblhlpticketdetailssource: Ng2SmartTableComponent;
 hlpticketForm: FormGroup;
sourcefieldList: boconfigvalue[];
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
requestortypeList: boconfigvalue[];
requestorList: bousermaster[];
requestoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestor_bousermastersForm: FormGroup;//autocomplete
requestor_bousermastersoptions:any;//autocomplete
requestor_bousermastersformatter:any;//autocomplete
tickettypeList: boconfigvalue[];
priorityList: boconfigvalue[];
criticalityList: boconfigvalue[];
impactList: boconfigvalue[];
riskList: boconfigvalue[];
slaList: hlpservicelevel[];
slaoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
sla_hlpservicelevelsForm: FormGroup;//autocomplete
sla_hlpservicelevelsoptions:any;//autocomplete
sla_hlpservicelevelsformatter:any;//autocomplete
sourceList: boconfigvalue[];
categoryList: bomasterdata[];
subcategoryList: bosubcategorymaster[];
stageList: boconfigvalue[];
completedbyList: bousermaster[];
completedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
completedby_bousermastersForm: FormGroup;//autocomplete
completedby_bousermastersoptions:any;//autocomplete
completedby_bousermastersformatter:any;//autocomplete
rcaList: bomasterdata[];
solutionList: bomasterdata[];
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
hlpticketshowOption:boolean;
hlpplannedactionshowOption:boolean;
hlpticketdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hlpplannedactionsvisiblelist:any;
hlpplannedactionshidelist:any;
hlpticketdetailsvisiblelist:any;
hlpticketdetailshidelist:any;
hlpticketdetailshtml:any;

DeletedhlpplannedactionIDs: string="";
hlpplannedactionsID: string = "1";
hlpplannedactionsselectedindex:any;
DeletedhlpticketdetailIDs: string="";
hlpticketdetailsID: string = "2";
hlpticketdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hlpticketservice: hlpticketService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bomasterdataservice:bomasterdataService,
private hlpservicelevelservice:hlpservicelevelService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.hlpticketForm  = this.fb.group({
pk:[null],
ImageName: [null],
ticketid: [null],
sourcefield: [null],
sourcefielddesc: [null],
sourcereference: [null],
branchid: [null],
branchiddesc: [null],
departmentid: [null],
departmentiddesc: [null],
requestortype: [null],
requestortypedesc: [null],
requestor: [null],
requestordesc: [null],
item: [null],
ticketdate: [null],
incidentdate: [null],
incidenttime: [null],
incidentduration: [null],
duedate: [null],
assignedto: [null],
tickettype: [null],
tickettypedesc: [null],
priority: [null],
prioritydesc: [null],
criticality: [null],
criticalitydesc: [null],
impact: [null],
impactdesc: [null],
risk: [null],
riskdesc: [null],
sla: [null],
sladesc: [null],
slabreached: [null],
source: [null],
sourcedesc: [null],
ticketreference: [null],
category: [null],
categorydesc: [null],
subcategory: [null],
subcategorydesc: [null],
tags: [null],
subject: [null],
ticketdetails: [null],
impacteditems: [null],
impactedservices: [null],
impactedproducts: [null],
impactdetails: [null],
remarks: [null],
stage: [null],
stagedesc: [null],
completedby: [null],
completedbydesc: [null],
linkedtickets: [null],
rca: [null],
rcadesc: [null],
rcadetails: [null],
solution: [null],
solutiondesc: [null],
solutiondetails: [null],
solutiongivenon: [null],
startdate: [null],
completeddate: [null],
lessonslearned: [null],
history: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hlpticketForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hlpticketForm.dirty && this.hlpticketForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.ticketid && pkDetail) {
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
let hlpticketid = null;

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
this.formid=hlpticketid;
//this.sharedService.alert(hlpticketid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethlpplannedactionsTableConfig();
  setTimeout(() => {
  this.SethlpplannedactionsTableddConfig();
  });

this.SethlpticketdetailsTableConfig();
  setTimeout(() => {
  this.SethlpticketdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("leadsource").then(res => this.sourcefieldList = res as boconfigvalue[]);
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.hlpticketservice.formData && this.hlpticketservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hlpticketForm.patchValue({
    branchid: this.hlpticketservice.formData.branchid,
    branchiddesc: this.hlpticketservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hlpticketForm.get('branchid').value);
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
this.configservice.getList("usertype").then(res => this.requestortypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestorList = res as bousermaster[];
if(this.hlpticketservice.formData && this.hlpticketservice.formData.requestor){
this.requestoroptionsEvent.emit(this.requestorList);
this.hlpticketForm.patchValue({
    requestor: this.hlpticketservice.formData.requestor,
    requestordesc: this.hlpticketservice.formData.requestordesc,
});
}
{
let arrrequestor = this.requestorList.filter(v => v.userid == this.hlpticketForm.get('requestor').value);
let objrequestor;
if (arrrequestor.length > 0) objrequestor = arrrequestor[0];
if (objrequestor)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestor_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestor_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("tickettype").then(res => this.tickettypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("impact").then(res => this.impactList = res as boconfigvalue[]);
this.configservice.getList("risk").then(res => this.riskList = res as boconfigvalue[]);
this.hlpservicelevelservice.gethlpservicelevelsList().then(res => 
{
this.slaList = res as hlpservicelevel[];
if(this.hlpticketservice.formData && this.hlpticketservice.formData.sla){
this.slaoptionsEvent.emit(this.slaList);
this.hlpticketForm.patchValue({
    sla: this.hlpticketservice.formData.sla,
    sladesc: this.hlpticketservice.formData.sladesc,
});
}
{
let arrsla = this.slaList.filter(v => v.servicelevelid == this.hlpticketForm.get('sla').value);
let objsla;
if (arrsla.length > 0) objsla = arrsla[0];
if (objsla)
{
}
}
}
).catch((err) => {console.log(err);});
this.sla_hlpservicelevelsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.slaList.filter(v => v.details.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.sla_hlpservicelevelsformatter = (result: any) => result.details;
this.configservice.getList("ticketsource").then(res => this.sourceList = res as boconfigvalue[]);
this.bomasterdataservice.getList("HPCAT").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
if(this.hlpticketservice.formData && this.hlpticketservice.formData.subcategory){this.hlpticketForm.patchValue({
    subcategory: this.hlpticketservice.formData.subcategory,
    subcategorydesc: this.hlpticketservice.formData.subcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("ticketstage").then(res => this.stageList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.completedbyList = res as bousermaster[];
if(this.hlpticketservice.formData && this.hlpticketservice.formData.completedby){
this.completedbyoptionsEvent.emit(this.completedbyList);
this.hlpticketForm.patchValue({
    completedby: this.hlpticketservice.formData.completedby,
    completedbydesc: this.hlpticketservice.formData.completedbydesc,
});
}
{
let arrcompletedby = this.completedbyList.filter(v => v.userid == this.hlpticketForm.get('completedby').value);
let objcompletedby;
if (arrcompletedby.length > 0) objcompletedby = arrcompletedby[0];
if (objcompletedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.completedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.completedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.completedby_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("k5oxy").then(res => {
this.rcaList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("hbzew").then(res => {
this.solutionList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hlpticketservice.gethlpticketsList().then(res => {
      this.pkList = res as hlpticket[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.subject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.subject;

//setting the flag that the screen is not touched 
this.hlpticketForm.markAsUntouched();
this.hlpticketForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hlpticketForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedrequestor(requestorDetail: any) {
if (requestorDetail.userid && requestorDetail) {
this.hlpticketForm.patchValue({
requestor: requestorDetail.userid,
requestordesc: requestorDetail.username,

});

}
}

onSelectedsla(slaDetail: any) {
if (slaDetail.servicelevelid && slaDetail) {
this.hlpticketForm.patchValue({
sla: slaDetail.servicelevelid,
sladesc: slaDetail.details,

});

}
}

onSelectedcompletedby(completedbyDetail: any) {
if (completedbyDetail.userid && completedbyDetail) {
this.hlpticketForm.patchValue({
completedby: completedbyDetail.userid,
completedbydesc: completedbyDetail.username,

});

}
}




resetForm() {
if (this.hlpticketForm != null)
this.hlpticketForm.reset();
this.hlpticketForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
requestor: this.sessiondata.userid,
requestordesc: this.sessiondata.username,
completedby: this.sessiondata.userid,
completedbydesc: this.sessiondata.username,
});
this.hlpticketForm.patchValue({
requestor: this.sessiondata.userid,
ticketdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
incidentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
duedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
solutiongivenon: this.ngbDateParserFormatter.parse(new Date().toISOString()),
startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
completeddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.hlpticketdetailshtml = "";this.hlpticketdetailshtml+="<div class='panel panel-default paper-shadow' data-z='0.5' data-hover-z='1' data-animated=''>";
this.hlpticketdetailshtml+="              <div class='panel-body'>";
this.hlpticketdetailshtml+="                <div class='media v-middle'>";
this.hlpticketdetailshtml+="                  <div class='media-left'>";
this.hlpticketdetailshtml+="                    <img src='http://localhost:5002/Resources/images1/##thumbnail##' class='media-object img-circle width-50'>";
this.hlpticketdetailshtml+="                  </div>";
this.hlpticketdetailshtml+="                  <div class='media-body message'>";
this.hlpticketdetailshtml+="                    <h4 class='text-subhead margin-none'><a href='#'>##actionuserdesc##</a></h4>";
this.hlpticketdetailshtml+="                    <p class='text-caption text-light'><i class='fa fa-clock-o'></i>##actiondate##</p>";
this.hlpticketdetailshtml+="                  </div>";
this.hlpticketdetailshtml+="                </div>";
this.hlpticketdetailshtml+="                <p>##actionremarks##</p>";
this.hlpticketdetailshtml+="              </div>";
this.hlpticketdetailshtml+="            </div>";
setTimeout(() => {
this.hlpticketservice.hlpplannedactions=[];
this.hlpplannedactionsLoadTable();
this.hlpticketservice.hlpticketdetails=[];
this.hlpticketdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.hlpticketForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let ticketid = this.hlpticketForm.get('ticketid').value;
        if(ticketid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpticketservice.deletehlpticket(ticketid).then(res =>
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
    this.hlpticketForm.patchValue({
        ticketid: null
    });
    if(this.hlpticketservice.formData.ticketid!=null)this.hlpticketservice.formData.ticketid=null;
for (let i=0;i<this.hlpticketservice.hlpplannedactions.length;i++) {
this.hlpticketservice.hlpplannedactions[i].planid=null;
}
for (let i=0;i<this.hlpticketservice.hlpticketdetails.length;i++) {
this.hlpticketservice.hlpticketdetails[i].ticketdetailid=null;
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
        else if(key=="ticketdate")
this.hlpticketForm.patchValue({"ticketdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="incidentdate")
this.hlpticketForm.patchValue({"incidentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="incidenttime")
this.hlpticketForm.patchValue({"incidenttime":new Time(mainscreendata[key]) });
        else if(key=="duedate")
this.hlpticketForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.hlpticketForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="tags")
this.hlpticketForm.patchValue({"tags":  mainscreendata[key] } );
        else if(key=="remarks")
this.hlpticketForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(key=="solutiongivenon")
this.hlpticketForm.patchValue({"solutiongivenon":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.hlpticketForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completeddate")
this.hlpticketForm.patchValue({"completeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hlpticketForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hlpticketForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hlpticketForm.controls[key]!=undefined)
{
this.hlpticketForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hlptickets",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.hlpticketservice.formData.subject!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.hlpticketservice.formData.subject!=null )
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
ticketidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=this.f.sourcefield.value as any;
this.hlpticketForm.patchValue({sourcefielddesc:evt.options[evt.options.selectedIndex].text});
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.hlpticketForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
requestortypeonChange(evt:any){
let e=this.f.requestortype.value as any;
this.hlpticketForm.patchValue({requestortypedesc:evt.options[evt.options.selectedIndex].text});
}
requestoronChange(evt:any){
let e=evt.value;
}
itemonChange(evt:any){
let e=evt.value;
}
ticketdateonChange(evt:any){
let e=evt.value;
}
incidentdateonChange(evt:any){
let e=evt.value;
}
incidenttimeonChange(evt:any){
let e=evt.value;
}
incidentdurationonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignedto=res;
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}).catch((err) => {console.log(err);});
}
tickettypeonChange(evt:any){
let e=this.f.tickettype.value as any;
this.hlpticketForm.patchValue({tickettypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.hlpticketForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.hlpticketForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
impactonChange(evt:any){
let e=this.f.impact.value as any;
this.hlpticketForm.patchValue({impactdesc:evt.options[evt.options.selectedIndex].text});
}
riskonChange(evt:any){
let e=this.f.risk.value as any;
this.hlpticketForm.patchValue({riskdesc:evt.options[evt.options.selectedIndex].text});
}
slaonChange(evt:any){
let e=evt.value;
}
slabreachedonChange(evt:any){
let e=evt.value;
}
sourceonChange(evt:any){
let e=this.f.source.value as any;
this.hlpticketForm.patchValue({sourcedesc:evt.options[evt.options.selectedIndex].text});
}
ticketreferenceonChange(evt:any){
let e=evt.value;
}
categoryonChange(evt:any){
let e=evt.value;
this.hlpticketForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res => this.subcategoryList = res as bosubcategorymaster[]);
});
}
subcategoryonChange(evt:any){
let e=evt.value;
this.hlpticketForm.patchValue({subcategorydesc:evt.options[evt.options.selectedIndex].text});
}
tagsonChange(evt:any){
let e=evt.value;
}
subjectonChange(evt:any){
let e=evt.value;
}
ticketdetailsonChange(evt:any){
let e=evt.value;
}
impacteditemsonChange(evt:any){
let e=evt.value;
}
impactedservicesonChange(evt:any){
let e=evt.value;
}
impactedproductsonChange(evt:any){
let e=evt.value;
}
impactdetailsonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
stageonChange(evt:any){
let e=this.f.stage.value as any;
this.hlpticketForm.patchValue({stagedesc:evt.options[evt.options.selectedIndex].text});
}
completedbyonChange(evt:any){
let e=evt.value;
}
linkedticketsonChange(evt:any){
let e=evt.value;
}
rcaonChange(evt:any){
let e=evt.value;
this.hlpticketForm.patchValue({rcadesc:evt.options[evt.options.selectedIndex].text});
}
rcadetailsonChange(evt:any){
let e=evt.value;
}
solutiononChange(evt:any){
let e=evt.value;
this.hlpticketForm.patchValue({solutiondesc:evt.options[evt.options.selectedIndex].text});
}
solutiondetailsonChange(evt:any){
let e=evt.value;
}
solutiongivenononChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
completeddateonChange(evt:any){
let e=evt.value;
}
lessonslearnedonChange(evt:any){
let e=evt.value;
}
historyonChange(evt:any){
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
  


edithlptickets() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hlpticketservice.gethlpticketsByEID(pkcol).then(res => {

this.hlpticketservice.formData=res.hlpticket;
let formproperty=res.hlpticket.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hlpticket.pkcol;
this.formid=res.hlpticket.ticketid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.hlpticketservice.formData=res.hlpticket;
this.formid=res.hlpticket.ticketid;
var incidenttimeTime=new Time( res.hlpticket.incidenttime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hlpticketForm.patchValue({
ticketid: res.hlpticket.ticketid,
sourcefield: res.hlpticket.sourcefield,
sourcefielddesc: res.hlpticket.sourcefielddesc,
sourcereference: res.hlpticket.sourcereference,
branchid: res.hlpticket.branchid,
branchiddesc: res.hlpticket.branchiddesc,
departmentid: res.hlpticket.departmentid,
departmentiddesc: res.hlpticket.departmentiddesc,
requestortype: res.hlpticket.requestortype,
requestortypedesc: res.hlpticket.requestortypedesc,
requestor: res.hlpticket.requestor,
requestordesc: res.hlpticket.requestordesc,
item: res.hlpticket.item,
ticketdate: this.ngbDateParserFormatter.parse(res.hlpticket.ticketdate),
incidentdate: this.ngbDateParserFormatter.parse(res.hlpticket.incidentdate),
incidenttime: incidenttimeTime,
incidentduration: res.hlpticket.incidentduration,
duedate: this.ngbDateParserFormatter.parse(res.hlpticket.duedate),
assignedto: JSON.parse(res.hlpticket.assignedto),
tickettype: res.hlpticket.tickettype,
tickettypedesc: res.hlpticket.tickettypedesc,
priority: res.hlpticket.priority,
prioritydesc: res.hlpticket.prioritydesc,
criticality: res.hlpticket.criticality,
criticalitydesc: res.hlpticket.criticalitydesc,
impact: res.hlpticket.impact,
impactdesc: res.hlpticket.impactdesc,
risk: res.hlpticket.risk,
riskdesc: res.hlpticket.riskdesc,
sla: res.hlpticket.sla,
sladesc: res.hlpticket.sladesc,
slabreached: res.hlpticket.slabreached,
source: res.hlpticket.source,
sourcedesc: res.hlpticket.sourcedesc,
ticketreference: res.hlpticket.ticketreference,
category: res.hlpticket.category,
categorydesc: res.hlpticket.categorydesc,
subcategory: res.hlpticket.subcategory,
subcategorydesc: res.hlpticket.subcategorydesc,
tags: JSON.parse(res.hlpticket.tags),
subject: res.hlpticket.subject,
ticketdetails: res.hlpticket.ticketdetails,
impacteditems: res.hlpticket.impacteditems,
impactedservices: res.hlpticket.impactedservices,
impactedproducts: res.hlpticket.impactedproducts,
impactdetails: res.hlpticket.impactdetails,
remarks: JSON.parse(res.hlpticket.remarks),
stage: res.hlpticket.stage,
stagedesc: res.hlpticket.stagedesc,
completedby: res.hlpticket.completedby,
completedbydesc: res.hlpticket.completedbydesc,
linkedtickets: res.hlpticket.linkedtickets,
rca: res.hlpticket.rca,
rcadesc: res.hlpticket.rcadesc,
rcadetails: res.hlpticket.rcadetails,
solution: res.hlpticket.solution,
solutiondesc: res.hlpticket.solutiondesc,
solutiondetails: res.hlpticket.solutiondetails,
solutiongivenon: this.ngbDateParserFormatter.parse(res.hlpticket.solutiongivenon),
startdate: this.ngbDateParserFormatter.parse(res.hlpticket.startdate),
completeddate: this.ngbDateParserFormatter.parse(res.hlpticket.completeddate),
lessonslearned: res.hlpticket.lessonslearned,
history: res.hlpticket.history,
customfield: res.hlpticket.customfield,
attachment: JSON.parse(res.hlpticket.attachment),
status: res.hlpticket.status,
statusdesc: res.hlpticket.statusdesc,
});
this.hlpplannedactionsvisiblelist=res.hlpplannedactionsvisiblelist;
this.hlpticketdetailsvisiblelist=res.hlpticketdetailsvisiblelist;
this.hlpticketdetailshtml=res.hlpticketdetailshtml;
if(this.hlpticketForm.get('customfield').value!=null && this.hlpticketForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hlpticketForm.get('customfield').value);
this.FillCustomField();
if(this.hlpticketForm.get('attachment').value!=null && this.hlpticketForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hlpticketForm.get('attachment').value);
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.hlpticketservice.hlpplannedactions = res.hlpplannedactions;
this.SethlpplannedactionsTableConfig();
this.hlpplannedactionsLoadTable();
  setTimeout(() => {
  this.SethlpplannedactionsTableddConfig();
  });
this.hlpticketservice.hlpticketdetails = res.hlpticketdetails;
this.SethlpticketdetailsTableConfig();
this.hlpticketdetailsLoadTable();
  setTimeout(() => {
  this.SethlpticketdetailsTableddConfig();
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
  for (let key in this.hlpticketForm.controls) {
    if (this.hlpticketForm.controls[key] != null) {
if(false)
{
if(this.hlpticketservice.formData!=null && this.hlpticketservice.formData[key]!=null  && this.hlpticketservice.formData[key]!='[]' && this.hlpticketservice.formData[key]!=undefined && this.hlpticketservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hlpticketservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hlpticketservice.formData!=null && this.hlpticketservice.formData[key]!=null   && this.hlpticketservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hlpticketservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hlpticketservice.formData!=null && this.hlpticketservice.formData[key]!=null   && this.hlpticketservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hlpticketservice.formData[key]+"'><div class='progress__number'>"+this.hlpticketservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpticketForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hlpticketForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hlpticketForm.value;
obj.ticketdate=new Date(this.hlpticketForm.get('ticketdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('ticketdate').value)+'  UTC' :null);
obj.incidentdate=new Date(this.hlpticketForm.get('incidentdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('incidentdate').value)+'  UTC' :null);
obj.incidenttime=(this.hlpticketForm.get('incidenttime').value==null?0:this.hlpticketForm.get('incidenttime').value.hour)+':'+(this.hlpticketForm.get('incidenttime').value==null?0:this.hlpticketForm.get('incidenttime').value.minute+":00");
obj.duedate=new Date(this.hlpticketForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('duedate').value)+'  UTC' :null);
if(this.hlpticketForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.hlpticketForm.get('assignedto').value);
if(this.hlpticketForm.get('tags').value!=null)obj.tags=JSON.stringify(this.hlpticketForm.get('tags').value);
if(this.hlpticketForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.hlpticketForm.get('remarks').value);
obj.solutiongivenon=new Date(this.hlpticketForm.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('solutiongivenon').value)+'  UTC' :null);
obj.startdate=new Date(this.hlpticketForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('startdate').value)+'  UTC' :null);
obj.completeddate=new Date(this.hlpticketForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('completeddate').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
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

private hlptickettoggleOption(){
this.hlpticketshowOption = this.hlpticketshowOption === true ? false : true;
}

private hlpplannedactiontoggleOption(){
this.hlpplannedactionshowOption = this.hlpplannedactionshowOption === true ? false : true;
}

private hlpticketdetailtoggleOption(){
this.hlpticketdetailshowOption = this.hlpticketdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hlpticketForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hlpticketForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hlpticketForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hlpticketservice.formData=this.hlpticketForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hlpticketForm.controls[key] != null)
    {
        this.hlpticketservice.formData[key] = this.hlpticketForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hlpticketservice.formData.ticketdate=new Date(this.hlpticketForm.get('ticketdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('ticketdate').value)+'  UTC' :null);
this.hlpticketservice.formData.incidentdate=new Date(this.hlpticketForm.get('incidentdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('incidentdate').value)+'  UTC' :null);
this.hlpticketservice.formData.incidenttime=(this.hlpticketForm.get('incidenttime').value==null?0:this.hlpticketForm.get('incidenttime').value.hour)+':'+(this.hlpticketForm.get('incidenttime').value==null?0:this.hlpticketForm.get('incidenttime').value.minute+":00");
this.hlpticketservice.formData.duedate=new Date(this.hlpticketForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('duedate').value)+'  UTC' :null);
if(this.hlpticketForm.get('assignedto').value!=null)this.hlpticketservice.formData.assignedto=JSON.stringify(this.hlpticketForm.get('assignedto').value);
if(this.hlpticketForm.get('tags').value!=null)this.hlpticketservice.formData.tags=JSON.stringify(this.hlpticketForm.get('tags').value);
if(this.hlpticketForm.get('remarks').value!=null)this.hlpticketservice.formData.remarks=JSON.stringify(this.hlpticketForm.get('remarks').value);
this.hlpticketservice.formData.solutiongivenon=new Date(this.hlpticketForm.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('solutiongivenon').value)+'  UTC' :null);
this.hlpticketservice.formData.startdate=new Date(this.hlpticketForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('startdate').value)+'  UTC' :null);
this.hlpticketservice.formData.completeddate=new Date(this.hlpticketForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticketForm.get('completeddate').value)+'  UTC' :null);
if(customfields!=null)this.hlpticketservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.hlpticketservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hlpticketservice.formData.DeletedhlpplannedactionIDs = this.DeletedhlpplannedactionIDs;
this.hlpticketservice.formData.DeletedhlpticketdetailIDs = this.DeletedhlpticketdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hlpticketservice.formData);
this.hlpticketservice.formData=this.hlpticketForm.value;
this.hlpticketservice.saveOrUpdatehlptickets().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hlpplannedactionssource.data)
{
    for (let i = 0; i < this.hlpplannedactionssource.data.length; i++)
    {
        if (this.hlpplannedactionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpplannedactionssource.data[i].fileattachmentlist);
    }
}
if (this.hlpticketdetailssource.data)
{
    for (let i = 0; i < this.hlpticketdetailssource.data.length; i++)
    {
        if (this.hlpticketdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpticketdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpticket);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hlpticketservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpticket);
}
else
{
this.FillData(res);
}
}
this.hlpticketForm.markAsUntouched();
this.hlpticketForm.markAsPristine();
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
data: {branchid:this.hlpticketForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hlpticketForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestor( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hlpticketForm.get('requestor').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsla( servicelevelid) {
/*let ScreenType='2';
this.dialog.open(hlpservicelevelComponent, 
{
data: {servicelevelid:this.hlpticketForm.get('sla').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hlpticketForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.hlpticketForm.get('subcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcompletedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hlpticketForm.get('completedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrca( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hlpticketForm.get('rca').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsolution( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hlpticketForm.get('solution').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithlpplannedaction(event:any,planid:any, ticketid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hlpplannedactionComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,planid, ticketid,visiblelist:this.hlpplannedactionsvisiblelist,  hidelist:this.hlpplannedactionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hlpplannedactionssource.add(res);
this.hlpplannedactionssource.refresh();
}
else
{
this.hlpplannedactionssource.update(event.data, res);
}
}
});
}

onDeletehlpplannedaction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpplannedactionIDs += childID + ",";
this.hlpticketservice.hlpplannedactions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithlpticketdetail(event:any,ticketdetailid:any, ticketid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hlpticketdetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,ticketdetailid, ticketid,visiblelist:this.hlpticketdetailsvisiblelist,  hidelist:this.hlpticketdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hlpticketdetailssource.add(res);
this.hlpticketdetailssource.refresh();
}
else
{
this.hlpticketdetailssource.update(event.data, res);
}
}
});
}

onDeletehlpticketdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpticketdetailIDs += childID + ",";
this.hlpticketservice.hlpticketdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hlpplannedactions
hlpplannedactionssettings:any;
hlpplannedactionssource: any;

showhlpplannedactionsCheckbox()
{
debugger;
if(this.tblhlpplannedactionssource.settings['selectMode']== 'multi')this.tblhlpplannedactionssource.settings['selectMode']= 'single';
else
this.tblhlpplannedactionssource.settings['selectMode']= 'multi';
this.tblhlpplannedactionssource.initGrid();
}
deletehlpplannedactionsAll()
{
this.tblhlpplannedactionssource.settings['selectMode'] = 'single';
}
showhlpplannedactionsFilter()
{
  setTimeout(() => {
  this.SethlpplannedactionsTableddConfig();
  });
      if(this.tblhlpplannedactionssource.settings!=null)this.tblhlpplannedactionssource.settings['hideSubHeader'] =!this.tblhlpplannedactionssource.settings['hideSubHeader'];
this.tblhlpplannedactionssource.initGrid();
}
showhlpplannedactionsInActive()
{
}
enablehlpplannedactionsInActive()
{
}
async SethlpplannedactionsTableddConfig()
{
if(!this.bfilterPopulatehlpplannedactions){
}
this.bfilterPopulatehlpplannedactions=true;
}
async hlpplannedactionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethlpplannedactionsTableConfig()
{
this.hlpplannedactionssettings = {
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
actionid: {
title: 'Action',
type: 'number',
filter:true,
},
plannedaction: {
title: 'Planned Action',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
},
};
}
hlpplannedactionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpplannedactionsID)>=0)
{
this.hlpplannedactionssource=new LocalDataSource();
this.hlpplannedactionssource.load(this.hlpticketservice.hlpplannedactions as  any as LocalDataSource);
this.hlpplannedactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hlpplannedactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hlpticketservice.hlpplannedactions.length == 0)
{
    this.tblhlpplannedactionssource.grid.createFormShown = true;
}
else
{
    let obj = new hlpplannedaction();
    this.hlpticketservice.hlpplannedactions.push(obj);
    this.hlpplannedactionssource.refresh();
    if ((this.hlpticketservice.hlpplannedactions.length / this.hlpplannedactionssource.getPaging().perPage).toFixed(0) + 1 != this.hlpplannedactionssource.getPaging().page)
    {
        this.hlpplannedactionssource.setPage((this.hlpticketservice.hlpplannedactions.length / this.hlpplannedactionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpplannedactionssource.grid.edit(this.tblhlpplannedactionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpplannedactionssource.data.indexOf(event.data);
this.onDeletehlpplannedaction(event,event.data.planid,((this.hlpplannedactionssource.getPaging().page-1) *this.hlpplannedactionssource.getPaging().perPage)+index);
this.hlpplannedactionssource.refresh();
break;
}
}

*/
hlpplannedactionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithlpplannedaction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithlpplannedaction(event,event.data.planid,this.formid);
break;
case 'delete':
this.onDeletehlpplannedaction(event,event.data.planid,((this.hlpplannedactionssource.getPaging().page-1) *this.hlpplannedactionssource.getPaging().perPage)+event.index);
this.hlpplannedactionssource.refresh();
break;
}
}
hlpplannedactionsonDelete(obj) {
let planid=obj.data.planid;
if (confirm('Are you sure to delete this record ?')) {
this.hlpticketservice.deletehlpticket(planid).then(res=>
this.hlpplannedactionsLoadTable()
);
}
}
hlpplannedactionsPaging(val)
{
debugger;
this.hlpplannedactionssource.setPaging(1, val, true);
}

handlehlpplannedactionsGridSelected(event:any) {
this.hlpplannedactionsselectedindex=this.hlpticketservice.hlpplannedactions.findIndex(i => i.planid === event.data.planid);
}
IshlpplannedactionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpplannedactionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpplannedactions
//start of Grid Codes hlpticketdetails
hlpticketdetailssettings:any;
hlpticketdetailssource: any;

showhlpticketdetailsCheckbox()
{
debugger;
if(this.tblhlpticketdetailssource.settings['selectMode']== 'multi')this.tblhlpticketdetailssource.settings['selectMode']= 'single';
else
this.tblhlpticketdetailssource.settings['selectMode']= 'multi';
this.tblhlpticketdetailssource.initGrid();
}
deletehlpticketdetailsAll()
{
this.tblhlpticketdetailssource.settings['selectMode'] = 'single';
}
showhlpticketdetailsFilter()
{
  setTimeout(() => {
  this.SethlpticketdetailsTableddConfig();
  });
      if(this.tblhlpticketdetailssource.settings!=null)this.tblhlpticketdetailssource.settings['hideSubHeader'] =!this.tblhlpticketdetailssource.settings['hideSubHeader'];
this.tblhlpticketdetailssource.initGrid();
}
showhlpticketdetailsInActive()
{
}
enablehlpticketdetailsInActive()
{
}
async SethlpticketdetailsTableddConfig()
{
if(!this.bfilterPopulatehlpticketdetails){
}
this.bfilterPopulatehlpticketdetails=true;
}
async hlpticketdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethlpticketdetailsTableConfig()
{
this.hlpticketdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
colhtml:
{
    title: '',
    type: 'html',
    filter: true,
    editor:
    {
        type: 'textarea',
    },
    valuePrepareFunction: (cell, row) => {
        debugger;
        cell = this.hlpticketdetailshtml;
var divrow=JSON.parse(JSON.stringify(row));


divrow["assigneddate"]=this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["assigneddate"]));
divrow["actiondate"]=this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["actiondate"]));
divrow["tatends"]=this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["tatends"]));
return this.sharedService.HtmlValue(divrow, cell);
    },
},
},
};
}
hlpticketdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpticketdetailsID)>=0)
{
this.hlpticketdetailssource=new LocalDataSource();
this.hlpticketdetailssource.load(this.hlpticketservice.hlpticketdetails as  any as LocalDataSource);
this.hlpticketdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hlpticketdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hlpticketservice.hlpticketdetails.length == 0)
{
    this.tblhlpticketdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hlpticketdetail();
    this.hlpticketservice.hlpticketdetails.push(obj);
    this.hlpticketdetailssource.refresh();
    if ((this.hlpticketservice.hlpticketdetails.length / this.hlpticketdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hlpticketdetailssource.getPaging().page)
    {
        this.hlpticketdetailssource.setPage((this.hlpticketservice.hlpticketdetails.length / this.hlpticketdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpticketdetailssource.grid.edit(this.tblhlpticketdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpticketdetailssource.data.indexOf(event.data);
this.onDeletehlpticketdetail(event,event.data.ticketdetailid,((this.hlpticketdetailssource.getPaging().page-1) *this.hlpticketdetailssource.getPaging().perPage)+index);
this.hlpticketdetailssource.refresh();
break;
}
}

*/
hlpticketdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithlpticketdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithlpticketdetail(event,event.data.ticketdetailid,this.formid);
break;
case 'delete':
this.onDeletehlpticketdetail(event,event.data.ticketdetailid,((this.hlpticketdetailssource.getPaging().page-1) *this.hlpticketdetailssource.getPaging().perPage)+event.index);
this.hlpticketdetailssource.refresh();
break;
}
}
hlpticketdetailsonDelete(obj) {
let ticketdetailid=obj.data.ticketdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.hlpticketservice.deletehlpticket(ticketdetailid).then(res=>
this.hlpticketdetailsLoadTable()
);
}
}
hlpticketdetailsPaging(val)
{
debugger;
this.hlpticketdetailssource.setPaging(1, val, true);
}

handlehlpticketdetailsGridSelected(event:any) {
this.hlpticketdetailsselectedindex=this.hlpticketservice.hlpticketdetails.findIndex(i => i.ticketdetailid === event.data.ticketdetailid);
}
IshlpticketdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpticketdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpticketdetails

}



