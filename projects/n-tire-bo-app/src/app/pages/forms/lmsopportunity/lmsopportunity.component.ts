import { lmsopportunityService } from './../../../service/lmsopportunity.service';
import { lmsopportunity } from './../../../model/lmsopportunity.model';
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
import { lmsmaster} from './../../../model/lmsmaster.model';
import { lmsmasterService } from './../../../service/lmsmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { lmscampaignmaster} from './../../../model/lmscampaignmaster.model';
import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
//popups
//detail table services
import { lmsopportunityproduct } from './../../../model/lmsopportunityproduct.model';
import { lmsopportunityproductComponent } from './../../../pages/forms/lmsopportunityproduct/lmsopportunityproduct.component';
//FK services
import { lmsproductmaster,IlmsproductmasterResponse } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterComponent } from './../../../pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmscall } from './../../../model/lmscall.model';
import { lmscallComponent } from './../../../pages/forms/lmscall/lmscall.component';
//FK services
import { bobranchmaster,IbobranchmasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { lmscallService } from './../../../service/lmscall.service';
import { bobranchlocation,IbobranchlocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
import { lmssecondarycontact } from './../../../model/lmssecondarycontact.model';
import { lmssecondarycontactComponent } from './../../../pages/forms/lmssecondarycontact/lmssecondarycontact.component';
//FK services
import { lmscorporatesecondarycontact,IlmscorporatesecondarycontactResponse } from './../../../model/lmscorporatesecondarycontact.model';
import { lmscorporatesecondarycontactComponent } from './../../../pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component';
import { lmscorporatesecondarycontactService } from './../../../service/lmscorporatesecondarycontact.service';
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmsreminderComponent } from './../../../pages/forms/lmsreminder/lmsreminder.component';
//FK services
import { lmsquote } from './../../../model/lmsquote.model';
import { lmsquoteComponent } from './../../../pages/forms/lmsquote/lmsquote.component';
//FK services
import { erptaxmaster,IerptaxmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
import { boterm,IbotermResponse } from '../../../../../../n-tire-bo-app/src/app/model/boterm.model';
import { botermComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boterm/boterm.component';
import { botermService } from '../../../../../../n-tire-bo-app/src/app/service/boterm.service';
import { boexpense } from '../../../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
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

@Component({
selector: 'app-lmsopportunity',
templateUrl: './lmsopportunity.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsopportunityComponent implements OnInit {
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
bfilterPopulatelmsopportunities:boolean=false;
datalmsopportunitiesleadid3:any=[];
datalmsopportunitiesopportunityid3:any=[];
datalmsopportunitiesleadby3:any=[];
datalmsopportunitiesopportunitytype3:any=[];
datalmsopportunitiesopportunitystage3:any=[];
datalmsopportunitiesstagesubcategory3:any=[];
datalmsopportunitiesopportunitysize3:any=[];
datalmsopportunitiesnextstep3:any=[];
datalmsopportunitiespossibilityofclosure3:any=[];
datalmsopportunitiesleadsource3:any=[];
datalmsopportunitiesbudget3:any=[];
datalmsopportunitiescriticality3:any=[];
datalmsopportunitiespriority3:any=[];
datalmsopportunitiescampaignid3:any=[];
datalmsopportunitiesterritory3:any=[];
datalmsopportunitiesreasonforloss3:any=[];
datalmsopportunityproductsopportunityid3:any=[];
datalmsopportunityproductsproductid3:any=[];
datalmsopportunityproductsuom3:any=[];
bfilterPopulatelmsopportunityproducts:boolean=false;
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
datalmssecondarycontactsbranchid3:any=[];
datalmssecondarycontactsproductid3:any=[];
datalmssecondarycontactssecondarycontactid3:any=[];
datalmssecondarycontactscampaignid3:any=[];
datalmssecondarycontactsopportunityid3:any=[];
bfilterPopulatelmssecondarycontacts:boolean=false;
datalmsremindersproductid3:any=[];
datalmsremindersopportunityid3:any=[];
bfilterPopulatelmsreminders:boolean=false;
datalmsquotestaxid3:any=[];
datalmsquotesopportunityid3:any=[];
datalmsquotespaymenttermid3:any=[];
datalmsquotescurrency3:any=[];
datalmsquotesquotestatus3:any=[];
datalmsquotestermid3:any=[];
datalmsquotesleadsource3:any=[];
bfilterPopulatelmsquotes:boolean=false;
databoexpensescostcenterid3:any=[];
databoexpensesrequesteduserid3:any=[];
databoexpensesexpensetype3:any=[];
databoexpensesexpensecategory3:any=[];
databoexpensescurrency3:any=[];
databoexpensesbasecurrency3:any=[];
bfilterPopulateboexpenses:boolean=false;
@ViewChild('tbllmsopportunityproductssource',{static:false}) tbllmsopportunityproductssource: Ng2SmartTableComponent;
@ViewChild('tbllmscallssource',{static:false}) tbllmscallssource: Ng2SmartTableComponent;
@ViewChild('tbllmssecondarycontactssource',{static:false}) tbllmssecondarycontactssource: Ng2SmartTableComponent;
@ViewChild('tbllmsreminderssource',{static:false}) tbllmsreminderssource: Ng2SmartTableComponent;
@ViewChild('tbllmsquotessource',{static:false}) tbllmsquotessource: Ng2SmartTableComponent;
@ViewChild('tblboexpensessource',{static:false}) tblboexpensessource: Ng2SmartTableComponent;
 lmsopportunityForm: FormGroup;
leadidList: lmsmaster[];
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
leadbyList: bousermaster[];
leadbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leadby_bousermastersForm: FormGroup;//autocomplete
leadby_bousermastersoptions:any;//autocomplete
leadby_bousermastersformatter:any;//autocomplete
opportunitytypeList: boconfigvalue[];
opportunitystageList: bomasterdata[];
stagesubcategoryList: bosubcategorymaster[];
opportunitysizeList: boconfigvalue[];
nextstepList: boconfigvalue[];
possibilityofclosureList: boconfigvalue[];
leadsourceList: boconfigvalue[];
budgetList: boconfigvalue[];
criticalityList: boconfigvalue[];
priorityList: boconfigvalue[];
campaignidList: lmscampaignmaster[];
territoryList: boconfigvalue[];
reasonforlossList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
lmsopportunityshowOption:boolean;
lmsopportunityproductshowOption:boolean;
lmscallshowOption:boolean;
lmssecondarycontactshowOption:boolean;
lmsremindershowOption:boolean;
lmsquoteshowOption:boolean;
boexpenseshowOption:boolean;
sessiondata:any;
sourcekey:any;

campaignidvisible:boolean = false;
dealvaluevisible:boolean = false;
resourcesvisible:boolean = false;
prebiddatevisible:boolean = false;
technologyvisible:boolean = false;
finalopeningdatevisible:boolean = false;
openingdatevisible:boolean = false;
tenderpublishdatevisible:boolean = false;
submissiondatevisible:boolean = false;
monthlybillingvisible:boolean = false;


lmsopportunityproductsvisiblelist:any;
lmsopportunityproductshidelist:any;
lmscallsvisiblelist:any;
lmscallshidelist:any;
lmssecondarycontactsvisiblelist:any;
lmssecondarycontactshidelist:any;
lmsremindersvisiblelist:any;
lmsremindershidelist:any;
lmsquotesvisiblelist:any;
lmsquoteshidelist:any;
boexpensesvisiblelist:any;
boexpenseshidelist:any;

DeletedlmsopportunityproductIDs: string="";
lmsopportunityproductsID: string = "1";
lmsopportunityproductsselectedindex:any;
DeletedlmscallIDs: string="";
lmscallsID: string = "2";
lmscallsselectedindex:any;
DeletedlmssecondarycontactIDs: string="";
lmssecondarycontactsID: string = "3";
lmssecondarycontactsselectedindex:any;
DeletedlmsreminderIDs: string="";
lmsremindersID: string = "4";
lmsremindersselectedindex:any;
DeletedlmsquoteIDs: string="";
lmsquotesID: string = "5";
lmsquotesselectedindex:any;
DeletedboexpenseIDs: string="";
boexpensesID: string = "6";
boexpensesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmsopportunityservice: lmsopportunityService,
private lmsproductmasterservice: lmsproductmasterService,
private bousermasterservice: bousermasterService,
private bobranchmasterservice: bobranchmasterService,
private lmsmasterservice: lmsmasterService,
private lmscallservice: lmscallService,
private bobranchlocationservice: bobranchlocationService,
private lmscorporatesecondarycontactservice: lmscorporatesecondarycontactService,
private erptaxmasterservice: erptaxmasterService,
private botermservice: botermService,
private erpfacostcenterservice: erpfacostcenterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private lmscampaignmasterservice:lmscampaignmasterService,
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
this.lmsopportunityForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
leadid: [null],
leadiddesc: [null],
opportunityid: [null],
opportunityiddesc: [null],
opportunitydetail: [null, Validators.required],
leadby: [null, Validators.required],
leadbydesc: [null],
opportunitytype: [null],
opportunitytypedesc: [null],
opportunitystage: [null, Validators.required],
opportunitystagedesc: [null],
stagesubcategory: [null],
stagesubcategorydesc: [null],
opportunitysize: [null, Validators.required],
opportunitysizedesc: [null],
nextstep: [null, Validators.required],
nextstepdesc: [null],
nextstepdetail: [null],
possibilityofclosure: [null, Validators.required],
possibilityofclosuredesc: [null],
dealvalue: [null],
tenderpublishdate: [null],
prebiddate: [null],
submissiondate: [null],
openingdate: [null],
finalopeningdate: [null],
otherdate1: [null],
otherdatenotes1: [null],
otherdate2: [null],
otherdatenotes2: [null],
otherdate3: [null],
otherdatenotes3: [null],
technology: [null],
resources: [null],
monthlybilling: [null],
requirementdetails: [null],
leadsource: [null],
leadsourcedesc: [null],
creationdate: [null],
budget: [null],
budgetdesc: [null],
tat: [null],
actualtat: [null],
assignedto: [null],
criticality: [null],
criticalitydesc: [null],
priority: [null],
prioritydesc: [null],
expectedclosuredate: [null],
expectedvalue: [null],
successrate: [null],
campaignid: [null],
campaigniddesc: [null],
notes: [null],
attachment: [null],
decisionmaker: [null],
territory: [null],
territorydesc: [null],
competitors: [null],
winner: [null],
reasonforloss: [null],
reasonforlossdesc: [null],
closeddate: [null],
contactid: [null],
lastcontactdate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsopportunityForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsopportunityForm.dirty && this.lmsopportunityForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.opportunityid && pkDetail) {
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
let lmsopportunityid = null;

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
this.formid=lmsopportunityid;
//this.sharedService.alert(lmsopportunityid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmsopportunityproductsTableConfig();
  setTimeout(() => {
  this.SetlmsopportunityproductsTableddConfig();
  });

this.SetlmscallsTableConfig();
  setTimeout(() => {
  this.SetlmscallsTableddConfig();
  });

this.SetlmssecondarycontactsTableConfig();
  setTimeout(() => {
  this.SetlmssecondarycontactsTableddConfig();
  });

this.SetlmsremindersTableConfig();
  setTimeout(() => {
  this.SetlmsremindersTableddConfig();
  });

this.SetlmsquotesTableConfig();
  setTimeout(() => {
  this.SetlmsquotesTableddConfig();
  });

this.SetboexpensesTableConfig();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.lmsmasterservice.getlmsmastersList().then(res => 
{
this.leadidList = res as lmsmaster[];
}
).catch((err) => {console.log(err);});
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmsopportunityservice.formData && this.lmsopportunityservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmsopportunityForm.patchValue({
    opportunityid: this.lmsopportunityservice.formData.opportunityid,
    opportunityiddesc: this.lmsopportunityservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmsopportunityForm.get('opportunityid').value);
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
this.bousermasterservice.getbousermastersList().then(res => 
{
this.leadbyList = res as bousermaster[];
if(this.lmsopportunityservice.formData && this.lmsopportunityservice.formData.leadby){
this.leadbyoptionsEvent.emit(this.leadbyList);
this.lmsopportunityForm.patchValue({
    leadby: this.lmsopportunityservice.formData.leadby,
    leadbydesc: this.lmsopportunityservice.formData.leadbydesc,
});
}
{
let arrleadby = this.leadbyList.filter(v => v.userid == this.lmsopportunityForm.get('leadby').value);
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
this.configservice.getList("opportunitytype").then(res => this.opportunitytypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("bwhvm").then(res => {
this.opportunitystageList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.opportunitystage.value && this.f.opportunitystage.value!="" && this.f.opportunitystage.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.opportunitystage.value).then(res =>{
this.stagesubcategoryList = res as bosubcategorymaster[];
if(this.lmsopportunityservice.formData && this.lmsopportunityservice.formData.stagesubcategory){this.lmsopportunityForm.patchValue({
    stagesubcategory: this.lmsopportunityservice.formData.stagesubcategory,
    stagesubcategorydesc: this.lmsopportunityservice.formData.stagesubcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("opportunitysize").then(res => this.opportunitysizeList = res as boconfigvalue[]);
this.configservice.getList("leadnextstep").then(res => this.nextstepList = res as boconfigvalue[]);
this.configservice.getList("closurepossibility").then(res => this.possibilityofclosureList = res as boconfigvalue[]);
this.configservice.getList("leadsource").then(res => this.leadsourceList = res as boconfigvalue[]);
this.configservice.getList("leadbudget").then(res => this.budgetList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.lmscampaignmasterservice.getlmscampaignmastersList().then(res => 
{
this.campaignidList = res as lmscampaignmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("territory").then(res => this.territoryList = res as boconfigvalue[]);
this.configservice.getList("opportunityloss").then(res => this.reasonforlossList = res as boconfigvalue[]);

//autocomplete
    this.lmsopportunityservice.getlmsopportunitiesList().then(res => {
      this.pkList = res as lmsopportunity[];
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
this.lmsopportunityForm.markAsUntouched();
this.lmsopportunityForm.markAsPristine();
}
onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmsopportunityForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedleadby(leadbyDetail: any) {
if (leadbyDetail.userid && leadbyDetail) {
this.lmsopportunityForm.patchValue({
leadby: leadbyDetail.userid,
leadbydesc: leadbyDetail.username,

});

}
}




resetForm() {
if (this.lmsopportunityForm != null)
this.lmsopportunityForm.reset();
this.lmsopportunityForm.patchValue({
leadby: this.sessiondata.userid,
leadbydesc: this.sessiondata.username,
});
this.lmsopportunityForm.patchValue({
leadby: this.sessiondata.userid,
tenderpublishdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
prebiddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
submissiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
openingdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
finalopeningdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
otherdate1: this.ngbDateParserFormatter.parse(new Date().toISOString()),
otherdate2: this.ngbDateParserFormatter.parse(new Date().toISOString()),
otherdate3: this.ngbDateParserFormatter.parse(new Date().toISOString()),
creationdate: this.ngbDateParserFormatter.parse(new Date().toString()),
expectedclosuredate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
closeddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
lastcontactdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.lmsopportunityservice.lmsopportunityproducts=[];
this.lmsopportunityproductsLoadTable();
this.lmsopportunityservice.lmscalls=[];
this.lmscallsLoadTable();
this.lmsopportunityservice.lmssecondarycontacts=[];
this.lmssecondarycontactsLoadTable();
this.lmsopportunityservice.lmsreminders=[];
this.lmsremindersLoadTable();
this.lmsopportunityservice.lmsquotes=[];
this.lmsquotesLoadTable();
this.lmsopportunityservice.boexpenses=[];
this.boexpensesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.campaignidvisible = false;
this.dealvaluevisible = false;
this.resourcesvisible = false;
this.prebiddatevisible = false;
this.technologyvisible = false;
this.finalopeningdatevisible = false;
this.openingdatevisible = false;
this.tenderpublishdatevisible = false;
this.submissiondatevisible = false;
this.monthlybillingvisible = false;
}

    onDelete() {
        let opportunityid = this.lmsopportunityForm.get('opportunityid').value;
        if(opportunityid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunityservice.deletelmsopportunity(opportunityid).then(res =>
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
    this.lmsopportunityForm.patchValue({
        opportunityid: null
    });
    if(this.lmsopportunityservice.formData.opportunityid!=null)this.lmsopportunityservice.formData.opportunityid=null;
for (let i=0;i<this.lmsopportunityservice.lmsopportunityproducts.length;i++) {
this.lmsopportunityservice.lmsopportunityproducts[i].opportunityproductid=null;
}
for (let i=0;i<this.lmsopportunityservice.lmscalls.length;i++) {
this.lmsopportunityservice.lmscalls[i].callid=null;
}
for (let i=0;i<this.lmsopportunityservice.lmssecondarycontacts.length;i++) {
this.lmsopportunityservice.lmssecondarycontacts[i].secondarycontactid=null;
}
for (let i=0;i<this.lmsopportunityservice.lmsreminders.length;i++) {
this.lmsopportunityservice.lmsreminders[i].reminderid=null;
}
for (let i=0;i<this.lmsopportunityservice.lmsquotes.length;i++) {
this.lmsopportunityservice.lmsquotes[i].quoteid=null;
}
for (let i=0;i<this.lmsopportunityservice.boexpenses.length;i++) {
this.lmsopportunityservice.boexpenses[i].expenseid=null;
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
        else if(key=="tenderpublishdate")
this.lmsopportunityForm.patchValue({"tenderpublishdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="prebiddate")
this.lmsopportunityForm.patchValue({"prebiddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="submissiondate")
this.lmsopportunityForm.patchValue({"submissiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="openingdate")
this.lmsopportunityForm.patchValue({"openingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="finalopeningdate")
this.lmsopportunityForm.patchValue({"finalopeningdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="otherdate1")
this.lmsopportunityForm.patchValue({"otherdate1":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="otherdate2")
this.lmsopportunityForm.patchValue({"otherdate2":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="otherdate3")
this.lmsopportunityForm.patchValue({"otherdate3":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="creationdate")
this.lmsopportunityForm.patchValue({"creationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.lmsopportunityForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="expectedclosuredate")
this.lmsopportunityForm.patchValue({"expectedclosuredate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.lmsopportunityForm.patchValue({"notes":  mainscreendata[key] } );
        else if(key=="closeddate")
this.lmsopportunityForm.patchValue({"closeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastcontactdate")
this.lmsopportunityForm.patchValue({"lastcontactdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmsopportunityForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsopportunityForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsopportunityForm.controls[key]!=undefined)
{
this.lmsopportunityForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
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
leadidonChange(evt:any){
let e=evt.value;
this.lmsopportunityForm.patchValue({leadiddesc:evt.options[evt.options.selectedIndex].text});
}
opportunityidonChange(evt:any){
let e=evt.value;
}
opportunitydetailonChange(evt:any){
let e=evt.value;
}
leadbyonChange(evt:any){
let e=evt.value;
}
opportunitytypeonChange(evt:any){
let e=this.f.opportunitytype.value as any;
this.monthlybillingvisible=false;
if(this.f.opportunitytype.value == 'O')this.monthlybillingvisible=true;
this.lmsopportunityForm.patchValue({opportunitytypedesc:evt.options[evt.options.selectedIndex].text});
}
opportunitystageonChange(evt:any){
let e=evt.value;
this.dealvaluevisible=false;
if(this.f.opportunitystage.value == 'W')this.dealvaluevisible=true;
this.lmsopportunityForm.patchValue({opportunitystagedesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.opportunitystage.value && this.f.opportunitystage.value!="" && this.f.opportunitystage.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.opportunitystage.value).then(res => this.stagesubcategoryList = res as bosubcategorymaster[]);
});
}
stagesubcategoryonChange(evt:any){
let e=evt.value;
this.lmsopportunityForm.patchValue({stagesubcategorydesc:evt.options[evt.options.selectedIndex].text});
}
opportunitysizeonChange(evt:any){
let e=this.f.opportunitysize.value as any;
this.lmsopportunityForm.patchValue({opportunitysizedesc:evt.options[evt.options.selectedIndex].text});
}
nextsteponChange(evt:any){
let e=this.f.nextstep.value as any;
this.lmsopportunityForm.patchValue({nextstepdesc:evt.options[evt.options.selectedIndex].text});
}
nextstepdetailonChange(evt:any){
let e=evt.value;
}
possibilityofclosureonChange(evt:any){
let e=this.f.possibilityofclosure.value as any;
this.lmsopportunityForm.patchValue({possibilityofclosuredesc:evt.options[evt.options.selectedIndex].text});
}
dealvalueonChange(evt:any){
let e=evt.value;
}
tenderpublishdateonChange(evt:any){
let e=evt.value;
}
prebiddateonChange(evt:any){
let e=evt.value;
}
submissiondateonChange(evt:any){
let e=evt.value;
}
openingdateonChange(evt:any){
let e=evt.value;
}
finalopeningdateonChange(evt:any){
let e=evt.value;
}
otherdate1onChange(evt:any){
let e=evt.value;
}
otherdatenotes1onChange(evt:any){
let e=evt.value;
}
otherdate2onChange(evt:any){
let e=evt.value;
}
otherdatenotes2onChange(evt:any){
let e=evt.value;
}
otherdate3onChange(evt:any){
let e=evt.value;
}
otherdatenotes3onChange(evt:any){
let e=evt.value;
}
technologyonChange(evt:any){
let e=evt.value;
}
resourcesonChange(evt:any){
let e=evt.value;
}
monthlybillingonChange(evt:any){
let e=evt.value;
}
requirementdetailsonChange(evt:any){
let e=evt.value;
}
leadsourceonChange(evt:any){
let e=this.f.leadsource.value as any;
this.lmsopportunityForm.patchValue({leadsourcedesc:evt.options[evt.options.selectedIndex].text});
}
creationdateonChange(evt:any){
let e=evt.value;
}
budgetonChange(evt:any){
let e=this.f.budget.value as any;
this.lmsopportunityForm.patchValue({budgetdesc:evt.options[evt.options.selectedIndex].text});
}
tatonChange(evt:any){
let e=evt.value;
}
actualtatonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.lmsopportunityForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.lmsopportunityForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
expectedclosuredateonChange(evt:any){
let e=evt.value;
}
expectedvalueonChange(evt:any){
let e=evt.value;
}
successrateonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
this.lmsopportunityForm.patchValue({campaigniddesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
decisionmakeronChange(evt:any){
let e=evt.value;
}
territoryonChange(evt:any){
let e=this.f.territory.value as any;
this.lmsopportunityForm.patchValue({territorydesc:evt.options[evt.options.selectedIndex].text});
}
competitorsonChange(evt:any){
let e=evt.value;
}
winneronChange(evt:any){
let e=evt.value;
}
reasonforlossonChange(evt:any){
let e=this.f.reasonforloss.value as any;
this.lmsopportunityForm.patchValue({reasonforlossdesc:evt.options[evt.options.selectedIndex].text});
}
closeddateonChange(evt:any){
let e=evt.value;
}
contactidonChange(evt:any){
let e=evt.value;
}
lastcontactdateonChange(evt:any){
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
  


editlmsopportunities() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsopportunityservice.getlmsopportunitiesByEID(pkcol).then(res => {

this.lmsopportunityservice.formData=res.lmsopportunity;
let formproperty=res.lmsopportunity.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsopportunity.pkcol;
this.formid=res.lmsopportunity.opportunityid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsopportunity.opportunityid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsopportunityForm.patchValue({
branchid: res.lmsopportunity.branchid,
leadid: res.lmsopportunity.leadid,
leadiddesc: res.lmsopportunity.leadiddesc,
opportunityid: res.lmsopportunity.opportunityid,
opportunityiddesc: res.lmsopportunity.opportunityiddesc,
opportunitydetail: res.lmsopportunity.opportunitydetail,
leadby: res.lmsopportunity.leadby,
leadbydesc: res.lmsopportunity.leadbydesc,
opportunitytype: res.lmsopportunity.opportunitytype,
opportunitytypedesc: res.lmsopportunity.opportunitytypedesc,
opportunitystage: res.lmsopportunity.opportunitystage,
opportunitystagedesc: res.lmsopportunity.opportunitystagedesc,
stagesubcategory: res.lmsopportunity.stagesubcategory,
stagesubcategorydesc: res.lmsopportunity.stagesubcategorydesc,
opportunitysize: res.lmsopportunity.opportunitysize,
opportunitysizedesc: res.lmsopportunity.opportunitysizedesc,
nextstep: res.lmsopportunity.nextstep,
nextstepdesc: res.lmsopportunity.nextstepdesc,
nextstepdetail: res.lmsopportunity.nextstepdetail,
possibilityofclosure: res.lmsopportunity.possibilityofclosure,
possibilityofclosuredesc: res.lmsopportunity.possibilityofclosuredesc,
dealvalue: res.lmsopportunity.dealvalue,
tenderpublishdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.tenderpublishdate),
prebiddate: this.ngbDateParserFormatter.parse(res.lmsopportunity.prebiddate),
submissiondate: this.ngbDateParserFormatter.parse(res.lmsopportunity.submissiondate),
openingdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.openingdate),
finalopeningdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.finalopeningdate),
otherdate1: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate1),
otherdatenotes1: res.lmsopportunity.otherdatenotes1,
otherdate2: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate2),
otherdatenotes2: res.lmsopportunity.otherdatenotes2,
otherdate3: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate3),
otherdatenotes3: res.lmsopportunity.otherdatenotes3,
technology: res.lmsopportunity.technology,
resources: res.lmsopportunity.resources,
monthlybilling: res.lmsopportunity.monthlybilling,
requirementdetails: res.lmsopportunity.requirementdetails,
leadsource: res.lmsopportunity.leadsource,
leadsourcedesc: res.lmsopportunity.leadsourcedesc,
creationdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.creationdate),
budget: res.lmsopportunity.budget,
budgetdesc: res.lmsopportunity.budgetdesc,
tat: res.lmsopportunity.tat,
actualtat: res.lmsopportunity.actualtat,
assignedto: JSON.parse(res.lmsopportunity.assignedto),
criticality: res.lmsopportunity.criticality,
criticalitydesc: res.lmsopportunity.criticalitydesc,
priority: res.lmsopportunity.priority,
prioritydesc: res.lmsopportunity.prioritydesc,
expectedclosuredate: this.ngbDateParserFormatter.parse(res.lmsopportunity.expectedclosuredate),
expectedvalue: res.lmsopportunity.expectedvalue,
successrate: res.lmsopportunity.successrate,
campaignid: res.lmsopportunity.campaignid,
campaigniddesc: res.lmsopportunity.campaigniddesc,
notes: JSON.parse(res.lmsopportunity.notes),
attachment: JSON.parse(res.lmsopportunity.attachment),
decisionmaker: res.lmsopportunity.decisionmaker,
territory: res.lmsopportunity.territory,
territorydesc: res.lmsopportunity.territorydesc,
competitors: res.lmsopportunity.competitors,
winner: res.lmsopportunity.winner,
reasonforloss: res.lmsopportunity.reasonforloss,
reasonforlossdesc: res.lmsopportunity.reasonforlossdesc,
closeddate: this.ngbDateParserFormatter.parse(res.lmsopportunity.closeddate),
contactid: res.lmsopportunity.contactid,
lastcontactdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.lastcontactdate),
status: res.lmsopportunity.status,
statusdesc: res.lmsopportunity.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("campaignid")>=0)this.campaignidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("campaignid")>=0)this.campaignidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("dealvalue")>=0)this.dealvaluevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("dealvalue")>=0)this.dealvaluevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("resources")>=0)this.resourcesvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("resources")>=0)this.resourcesvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("prebiddate")>=0)this.prebiddatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("prebiddate")>=0)this.prebiddatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("technology")>=0)this.technologyvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("technology")>=0)this.technologyvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("finalopeningdate")>=0)this.finalopeningdatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("finalopeningdate")>=0)this.finalopeningdatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("openingdate")>=0)this.openingdatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("openingdate")>=0)this.openingdatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("tenderpublishdate")>=0)this.tenderpublishdatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("tenderpublishdate")>=0)this.tenderpublishdatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("submissiondate")>=0)this.submissiondatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("submissiondate")>=0)this.submissiondatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("monthlybilling")>=0)this.monthlybillingvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("monthlybilling")>=0)this.monthlybillingvisible = false;
this.lmsopportunityproductsvisiblelist=res.lmsopportunityproductsvisiblelist;
this.lmscallsvisiblelist=res.lmscallsvisiblelist;
this.lmssecondarycontactsvisiblelist=res.lmssecondarycontactsvisiblelist;
this.lmsremindersvisiblelist=res.lmsremindersvisiblelist;
this.lmsquotesvisiblelist=res.lmsquotesvisiblelist;
this.boexpensesvisiblelist=res.boexpensesvisiblelist;
if(this.lmsopportunityForm.get('attachment').value!=null && this.lmsopportunityForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmsopportunityForm.get('attachment').value);
setTimeout(() => {
if(this.f.opportunitystage.value && this.f.opportunitystage.value!="" && this.f.opportunitystage.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.opportunitystage.value).then(res =>{
this.stagesubcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.lmsopportunityservice.lmsopportunityproducts = res.lmsopportunityproducts;
this.SetlmsopportunityproductsTableConfig();
this.lmsopportunityproductsLoadTable();
  setTimeout(() => {
  this.SetlmsopportunityproductsTableddConfig();
  });
this.lmsopportunityservice.lmscalls = res.lmscalls;
this.SetlmscallsTableConfig();
this.lmscallsLoadTable();
  setTimeout(() => {
  this.SetlmscallsTableddConfig();
  });
this.lmsopportunityservice.lmssecondarycontacts = res.lmssecondarycontacts;
this.SetlmssecondarycontactsTableConfig();
this.lmssecondarycontactsLoadTable();
  setTimeout(() => {
  this.SetlmssecondarycontactsTableddConfig();
  });
this.lmsopportunityservice.lmsreminders = res.lmsreminders;
this.SetlmsremindersTableConfig();
this.lmsremindersLoadTable();
  setTimeout(() => {
  this.SetlmsremindersTableddConfig();
  });
this.lmsopportunityservice.lmsquotes = res.lmsquotes;
this.SetlmsquotesTableConfig();
this.lmsquotesLoadTable();
  setTimeout(() => {
  this.SetlmsquotesTableddConfig();
  });
this.lmsopportunityservice.boexpenses = res.boexpenses;
this.SetboexpensesTableConfig();
this.boexpensesLoadTable();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
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
  for (let key in this.lmsopportunityForm.controls) {
    if (this.lmsopportunityForm.controls[key] != null) {
if(false)
{
if(this.lmsopportunityservice.formData!=null && this.lmsopportunityservice.formData[key]!=null  && this.lmsopportunityservice.formData[key]!='[]' && this.lmsopportunityservice.formData[key]!=undefined && this.lmsopportunityservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsopportunityservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsopportunityservice.formData!=null && this.lmsopportunityservice.formData[key]!=null   && this.lmsopportunityservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsopportunityservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsopportunityservice.formData!=null && this.lmsopportunityservice.formData[key]!=null   && this.lmsopportunityservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsopportunityservice.formData[key]+"'><div class='progress__number'>"+this.lmsopportunityservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsopportunityForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsopportunityForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmsopportunityForm.value;
obj.tenderpublishdate=new Date(this.lmsopportunityForm.get('tenderpublishdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('tenderpublishdate').value)+'  UTC' :null);
obj.prebiddate=new Date(this.lmsopportunityForm.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('prebiddate').value)+'  UTC' :null);
obj.submissiondate=new Date(this.lmsopportunityForm.get('submissiondate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('submissiondate').value)+'  UTC' :null);
obj.openingdate=new Date(this.lmsopportunityForm.get('openingdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('openingdate').value)+'  UTC' :null);
obj.finalopeningdate=new Date(this.lmsopportunityForm.get('finalopeningdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('finalopeningdate').value)+'  UTC' :null);
obj.otherdate1=new Date(this.lmsopportunityForm.get('otherdate1').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate1').value)+'  UTC' :null);
obj.otherdate2=new Date(this.lmsopportunityForm.get('otherdate2').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate2').value)+'  UTC' :null);
obj.otherdate3=new Date(this.lmsopportunityForm.get('otherdate3').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate3').value)+'  UTC' :null);
obj.creationdate=new Date(this.lmsopportunityForm.get('creationdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('creationdate').value)+'  UTC' :null);
if(this.lmsopportunityForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.lmsopportunityForm.get('assignedto').value);
obj.expectedclosuredate=new Date(this.lmsopportunityForm.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('expectedclosuredate').value)+'  UTC' :null);
if(this.lmsopportunityForm.get('notes').value!=null)obj.notes=JSON.stringify(this.lmsopportunityForm.get('notes').value);
obj.closeddate=new Date(this.lmsopportunityForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('closeddate').value)+'  UTC' :null);
obj.lastcontactdate=new Date(this.lmsopportunityForm.get('lastcontactdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('lastcontactdate').value)+'  UTC' :null);
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

private lmsopportunitytoggleOption(){
this.lmsopportunityshowOption = this.lmsopportunityshowOption === true ? false : true;
}

private lmsopportunityproducttoggleOption(){
this.lmsopportunityproductshowOption = this.lmsopportunityproductshowOption === true ? false : true;
}

private lmscalltoggleOption(){
this.lmscallshowOption = this.lmscallshowOption === true ? false : true;
}

private lmssecondarycontacttoggleOption(){
this.lmssecondarycontactshowOption = this.lmssecondarycontactshowOption === true ? false : true;
}

private lmsremindertoggleOption(){
this.lmsremindershowOption = this.lmsremindershowOption === true ? false : true;
}

private lmsquotetoggleOption(){
this.lmsquoteshowOption = this.lmsquoteshowOption === true ? false : true;
}

private boexpensetoggleOption(){
this.boexpenseshowOption = this.boexpenseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsopportunityForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsopportunityForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsopportunityForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsopportunityservice.formData=this.lmsopportunityForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsopportunityForm.controls[key] != null)
    {
        this.lmsopportunityservice.formData[key] = this.lmsopportunityForm.controls[key].value;
    }
}
}
}
this.lmsopportunityservice.formData.tenderpublishdate=new Date(this.lmsopportunityForm.get('tenderpublishdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('tenderpublishdate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.prebiddate=new Date(this.lmsopportunityForm.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('prebiddate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.submissiondate=new Date(this.lmsopportunityForm.get('submissiondate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('submissiondate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.openingdate=new Date(this.lmsopportunityForm.get('openingdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('openingdate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.finalopeningdate=new Date(this.lmsopportunityForm.get('finalopeningdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('finalopeningdate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.otherdate1=new Date(this.lmsopportunityForm.get('otherdate1').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate1').value)+'  UTC' :null);
this.lmsopportunityservice.formData.otherdate2=new Date(this.lmsopportunityForm.get('otherdate2').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate2').value)+'  UTC' :null);
this.lmsopportunityservice.formData.otherdate3=new Date(this.lmsopportunityForm.get('otherdate3').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('otherdate3').value)+'  UTC' :null);
this.lmsopportunityservice.formData.creationdate=new Date(this.lmsopportunityForm.get('creationdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('creationdate').value)+'  UTC' :null);
if(this.lmsopportunityForm.get('assignedto').value!=null)this.lmsopportunityservice.formData.assignedto=JSON.stringify(this.lmsopportunityForm.get('assignedto').value);
this.lmsopportunityservice.formData.expectedclosuredate=new Date(this.lmsopportunityForm.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('expectedclosuredate').value)+'  UTC' :null);
if(this.lmsopportunityForm.get('notes').value!=null)this.lmsopportunityservice.formData.notes=JSON.stringify(this.lmsopportunityForm.get('notes').value);
if(this.fileattachment.getattachmentlist()!=null)this.lmsopportunityservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmsopportunityservice.formData.closeddate=new Date(this.lmsopportunityForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('closeddate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.lastcontactdate=new Date(this.lmsopportunityForm.get('lastcontactdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunityForm.get('lastcontactdate').value)+'  UTC' :null);
this.lmsopportunityservice.formData.DeletedlmsopportunityproductIDs = this.DeletedlmsopportunityproductIDs;
this.lmsopportunityservice.formData.DeletedlmscallIDs = this.DeletedlmscallIDs;
this.lmsopportunityservice.formData.DeletedlmssecondarycontactIDs = this.DeletedlmssecondarycontactIDs;
this.lmsopportunityservice.formData.DeletedlmsreminderIDs = this.DeletedlmsreminderIDs;
this.lmsopportunityservice.formData.DeletedlmsquoteIDs = this.DeletedlmsquoteIDs;
this.lmsopportunityservice.formData.DeletedboexpenseIDs = this.DeletedboexpenseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmsopportunityservice.formData);
this.lmsopportunityservice.formData=this.lmsopportunityForm.value;
this.lmsopportunityservice.saveOrUpdatelmsopportunities().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmsopportunityproductssource.data)
{
    for (let i = 0; i < this.lmsopportunityproductssource.data.length; i++)
    {
        if (this.lmsopportunityproductssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsopportunityproductssource.data[i].fileattachmentlist);
    }
}
if (this.lmscallssource.data)
{
    for (let i = 0; i < this.lmscallssource.data.length; i++)
    {
        if (this.lmscallssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscallssource.data[i].fileattachmentlist);
    }
}
if (this.lmssecondarycontactssource.data)
{
    for (let i = 0; i < this.lmssecondarycontactssource.data.length; i++)
    {
        if (this.lmssecondarycontactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmssecondarycontactssource.data[i].fileattachmentlist);
    }
}
if (this.lmsreminderssource.data)
{
    for (let i = 0; i < this.lmsreminderssource.data.length; i++)
    {
        if (this.lmsreminderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsreminderssource.data[i].fileattachmentlist);
    }
}
if (this.lmsquotessource.data)
{
    for (let i = 0; i < this.lmsquotessource.data.length; i++)
    {
        if (this.lmsquotessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsquotessource.data[i].fileattachmentlist);
    }
}
if (this.boexpensessource.data)
{
    for (let i = 0; i < this.boexpensessource.data.length; i++)
    {
        if (this.boexpensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boexpensessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsopportunity);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsopportunityservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsopportunity);
}
else
{
this.FillData(res);
}
}
this.lmsopportunityForm.markAsUntouched();
this.lmsopportunityForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditleadid( leadid) {
/*let ScreenType='2';
this.dialog.open(lmsmasterComponent, 
{
data: {leadid:this.lmsopportunityForm.get('leadid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmsopportunityForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmsopportunityForm.get('leadby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunitystage( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.lmsopportunityForm.get('opportunitystage').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstagesubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.lmsopportunityForm.get('stagesubcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( campaignid) {
/*let ScreenType='2';
this.dialog.open(lmscampaignmasterComponent, 
{
data: {campaignid:this.lmsopportunityForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmsopportunityproduct(event:any,opportunityproductid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsopportunityproductComponent, 
{
data:  {  showview:false,save:false,event,opportunityproductid, opportunityid,visiblelist:this.lmsopportunityproductsvisiblelist,  hidelist:this.lmsopportunityproductshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsopportunityproductssource.add(res);
this.lmsopportunityproductssource.refresh();
}
else
{
this.lmsopportunityproductssource.update(event.data, res);
}
}
});
}

onDeletelmsopportunityproduct(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsopportunityproductIDs += childID + ",";
this.lmsopportunityservice.lmsopportunityproducts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmscall(event:any,callid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscallComponent, 
{
data:  {  showview:false,save:true,event,callid, opportunityid,visiblelist:this.lmscallsvisiblelist,  hidelist:this.lmscallshidelist,ScreenType:2  },
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
this.lmsopportunityservice.lmscalls.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmssecondarycontact(event:any,secondarycontactid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmssecondarycontactComponent, 
{
data:  {  showview:false,save:false,event,secondarycontactid, opportunityid,visiblelist:this.lmssecondarycontactsvisiblelist,  hidelist:this.lmssecondarycontactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmssecondarycontactssource.add(res);
this.lmssecondarycontactssource.refresh();
}
else
{
this.lmssecondarycontactssource.update(event.data, res);
}
}
});
}

onDeletelmssecondarycontact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmssecondarycontactIDs += childID + ",";
this.lmsopportunityservice.lmssecondarycontacts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmsreminder(event:any,reminderid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsreminderComponent, 
{
data:  {  showview:false,save:false,event,reminderid, opportunityid,visiblelist:this.lmsremindersvisiblelist,  hidelist:this.lmsremindershidelist,ScreenType:2  },
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
this.lmsopportunityservice.lmsreminders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmsquote(event:any,quoteid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsquoteComponent, 
{
data:  {  showview:false,save:false,event,quoteid, opportunityid,visiblelist:this.lmsquotesvisiblelist,  hidelist:this.lmsquoteshidelist,ScreenType:2,branchid:this.lmsopportunityForm.get('branchid').value,leadid:this.lmsopportunityForm.get('leadid').value,leadiddesc:this.lmsopportunityForm.get('leadiddesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsquotessource.add(res);
this.lmsquotessource.refresh();
}
else
{
this.lmsquotessource.update(event.data, res);
}
}
});
}

onDeletelmsquote(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsquoteIDs += childID + ",";
this.lmsopportunityservice.lmsquotes.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboexpense(event:any,expenseid:any, opportunityid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boexpenseComponent, 
{
data:  {  showview:false,save:false,event,expenseid, opportunityid,visiblelist:this.boexpensesvisiblelist,  hidelist:this.boexpenseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boexpensessource.add(res);
this.boexpensessource.refresh();
}
else
{
this.boexpensessource.update(event.data, res);
}
}
});
}

onDeleteboexpense(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboexpenseIDs += childID + ",";
this.lmsopportunityservice.boexpenses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmsopportunityproducts
lmsopportunityproductssettings:any;
lmsopportunityproductssource: any;

showlmsopportunityproductsCheckbox()
{
debugger;
if(this.tbllmsopportunityproductssource.settings['selectMode']== 'multi')this.tbllmsopportunityproductssource.settings['selectMode']= 'single';
else
this.tbllmsopportunityproductssource.settings['selectMode']= 'multi';
this.tbllmsopportunityproductssource.initGrid();
}
deletelmsopportunityproductsAll()
{
this.tbllmsopportunityproductssource.settings['selectMode'] = 'single';
}
showlmsopportunityproductsFilter()
{
  setTimeout(() => {
  this.SetlmsopportunityproductsTableddConfig();
  });
      if(this.tbllmsopportunityproductssource.settings!=null)this.tbllmsopportunityproductssource.settings['hideSubHeader'] =!this.tbllmsopportunityproductssource.settings['hideSubHeader'];
this.tbllmsopportunityproductssource.initGrid();
}
showlmsopportunityproductsInActive()
{
}
enablelmsopportunityproductsInActive()
{
}
async SetlmsopportunityproductsTableddConfig()
{
if(!this.bfilterPopulatelmsopportunityproducts){

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsopportunityproductsopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmsopportunityproductsopportunityid3.push(obj);
}
if((this.tbllmsopportunityproductssource.settings as any).columns['opportunityid'])
{
(this.tbllmsopportunityproductssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsopportunityproductsopportunityid3));
this.tbllmsopportunityproductssource.initGrid();
}
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsopportunityproductsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.datalmsopportunityproductsproductid3.push(obj);
}
if((this.tbllmsopportunityproductssource.settings as any).columns['productid'])
{
(this.tbllmsopportunityproductssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsopportunityproductsproductid3));
this.tbllmsopportunityproductssource.initGrid();
}
});

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsopportunityproductsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.datalmsopportunityproductsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsopportunityproductssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsopportunityproductsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsopportunityproductsuom3)), }, };
this.tbllmsopportunityproductssource.settings =  clone;
this.tbllmsopportunityproductssource.initGrid();
});
}
this.bfilterPopulatelmsopportunityproducts=true;
}
async lmsopportunityproductsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsopportunityproductsTableConfig()
{
this.lmsopportunityproductssettings = {
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
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsopportunityproductsproductid3.find(c=>c.value==cell);
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
uom: {
title: 'U O M',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsopportunityproductsuom3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
totalprice: {
title: 'Total Price',
type: 'number',
filter:true,
},
},
};
}
lmsopportunityproductsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsopportunityproductsID)>=0)
{
this.lmsopportunityproductssource=new LocalDataSource();
this.lmsopportunityproductssource.load(this.lmsopportunityservice.lmsopportunityproducts as  any as LocalDataSource);
this.lmsopportunityproductssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsopportunityproductsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.lmsopportunityproducts.length == 0)
{
    this.tbllmsopportunityproductssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsopportunityproduct();
    this.lmsopportunityservice.lmsopportunityproducts.push(obj);
    this.lmsopportunityproductssource.refresh();
    if ((this.lmsopportunityservice.lmsopportunityproducts.length / this.lmsopportunityproductssource.getPaging().perPage).toFixed(0) + 1 != this.lmsopportunityproductssource.getPaging().page)
    {
        this.lmsopportunityproductssource.setPage((this.lmsopportunityservice.lmsopportunityproducts.length / this.lmsopportunityproductssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsopportunityproductssource.grid.edit(this.tbllmsopportunityproductssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsopportunityproductssource.data.indexOf(event.data);
this.onDeletelmsopportunityproduct(event,event.data.opportunityproductid,((this.lmsopportunityproductssource.getPaging().page-1) *this.lmsopportunityproductssource.getPaging().perPage)+index);
this.lmsopportunityproductssource.refresh();
break;
}
}

*/
lmsopportunityproductsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsopportunityproduct(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsopportunityproduct(event,event.data.opportunityproductid,this.formid);
break;
case 'delete':
this.onDeletelmsopportunityproduct(event,event.data.opportunityproductid,((this.lmsopportunityproductssource.getPaging().page-1) *this.lmsopportunityproductssource.getPaging().perPage)+event.index);
this.lmsopportunityproductssource.refresh();
break;
}
}
lmsopportunityproductsonDelete(obj) {
let opportunityproductid=obj.data.opportunityproductid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsopportunityservice.deletelmsopportunity(opportunityproductid).then(res=>
this.lmsopportunityproductsLoadTable()
);
}
}
lmsopportunityproductsPaging(val)
{
debugger;
this.lmsopportunityproductssource.setPaging(1, val, true);
}

handlelmsopportunityproductsGridSelected(event:any) {
this.lmsopportunityproductsselectedindex=this.lmsopportunityservice.lmsopportunityproducts.findIndex(i => i.opportunityproductid === event.data.opportunityproductid);
}
IslmsopportunityproductsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsopportunityproductsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsopportunityproducts
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
var dataactivitytype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscallsactivitytype3.push(defaultobj);
for(let i=0; i<dataactivitytype2.length; i++){
var obj= { value: dataactivitytype2[i].configkey, title: dataactivitytype2[i].configtext};
this.datalmscallsactivitytype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscallssource.settings);
if(clone.columns['activitytype']!=undefined)clone.columns['activitytype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscallsactivitytype3)), }, };
if(clone.columns['activitytype']!=undefined)clone.columns['activitytype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscallsactivitytype3)), }, };
this.tbllmscallssource.settings =  clone;
this.tbllmscallssource.initGrid();
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
eventtime: {
title: 'Event Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
eventenddate: {
title: 'Event End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
eventendtime: {
title: 'Event End Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
agenda: {
title: 'Agenda',
type: '',
filter:true,
},
currentowner: {
title: 'Current Owner',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmscallscurrentowner3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
activitytype: {
title: 'Activity Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscallsactivitytype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
attendedusers: {
title: 'Attended Users',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
clientusers: {
title: 'Client Users',
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
actiondatetime: {
title: 'Action Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
score: {
title: 'Score',
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
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
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
lmscallsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscallsID)>=0)
{
this.lmscallssource=new LocalDataSource();
this.lmscallssource.load(this.lmsopportunityservice.lmscalls as  any as LocalDataSource);
this.lmscallssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscallsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.lmscalls.length == 0)
{
    this.tbllmscallssource.grid.createFormShown = true;
}
else
{
    let obj = new lmscall();
    this.lmsopportunityservice.lmscalls.push(obj);
    this.lmscallssource.refresh();
    if ((this.lmsopportunityservice.lmscalls.length / this.lmscallssource.getPaging().perPage).toFixed(0) + 1 != this.lmscallssource.getPaging().page)
    {
        this.lmscallssource.setPage((this.lmsopportunityservice.lmscalls.length / this.lmscallssource.getPaging().perPage).toFixed(0) + 1);
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
this.lmsopportunityservice.deletelmsopportunity(callid).then(res=>
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
this.lmscallsselectedindex=this.lmsopportunityservice.lmscalls.findIndex(i => i.callid === event.data.callid);
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
//start of Grid Codes lmssecondarycontacts
lmssecondarycontactssettings:any;
lmssecondarycontactssource: any;

showlmssecondarycontactsCheckbox()
{
debugger;
if(this.tbllmssecondarycontactssource.settings['selectMode']== 'multi')this.tbllmssecondarycontactssource.settings['selectMode']= 'single';
else
this.tbllmssecondarycontactssource.settings['selectMode']= 'multi';
this.tbllmssecondarycontactssource.initGrid();
}
deletelmssecondarycontactsAll()
{
this.tbllmssecondarycontactssource.settings['selectMode'] = 'single';
}
showlmssecondarycontactsFilter()
{
  setTimeout(() => {
  this.SetlmssecondarycontactsTableddConfig();
  });
      if(this.tbllmssecondarycontactssource.settings!=null)this.tbllmssecondarycontactssource.settings['hideSubHeader'] =!this.tbllmssecondarycontactssource.settings['hideSubHeader'];
this.tbllmssecondarycontactssource.initGrid();
}
showlmssecondarycontactsInActive()
{
}
enablelmssecondarycontactsInActive()
{
}
async SetlmssecondarycontactsTableddConfig()
{
if(!this.bfilterPopulatelmssecondarycontacts){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmssecondarycontactsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datalmssecondarycontactsbranchid3.push(obj);
}
if((this.tbllmssecondarycontactssource.settings as any).columns['branchid'])
{
(this.tbllmssecondarycontactssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmssecondarycontactsbranchid3));
this.tbllmssecondarycontactssource.initGrid();
}
});

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmssecondarycontactsopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmssecondarycontactsopportunityid3.push(obj);
}
if((this.tbllmssecondarycontactssource.settings as any).columns['opportunityid'])
{
(this.tbllmssecondarycontactssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmssecondarycontactsopportunityid3));
this.tbllmssecondarycontactssource.initGrid();
}
});

this.lmscorporatesecondarycontactservice.getlmscorporatesecondarycontactsList().then(res=>
{
var datasecondarycontactid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmssecondarycontactssecondarycontactid3.push(defaultobj);
for(let i=0; i<datasecondarycontactid2.length; i++){
var obj= { value: datasecondarycontactid2[i].secondarycontactid, title:datasecondarycontactid2[i].lastname};
this.datalmssecondarycontactssecondarycontactid3.push(obj);
}
if((this.tbllmssecondarycontactssource.settings as any).columns['secondarycontactid'])
{
(this.tbllmssecondarycontactssource.settings as any).columns['secondarycontactid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmssecondarycontactssecondarycontactid3));
this.tbllmssecondarycontactssource.initGrid();
}
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var datacampaignid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmssecondarycontactscampaignid3.push(defaultobj);
for(let i=0; i<datacampaignid2.length; i++){
var obj= { value: datacampaignid2[i].productid, title:datacampaignid2[i].productname};
this.datalmssecondarycontactscampaignid3.push(obj);
}
if((this.tbllmssecondarycontactssource.settings as any).columns['campaignid'])
{
(this.tbllmssecondarycontactssource.settings as any).columns['campaignid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmssecondarycontactscampaignid3));
this.tbllmssecondarycontactssource.initGrid();
}
});
}
this.bfilterPopulatelmssecondarycontacts=true;
}
async lmssecondarycontactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmssecondarycontactsTableConfig()
{
this.lmssecondarycontactssettings = {
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
secondarycontact: {
title: 'Secondary Contact',
type: 'number',
filter:true,
},
},
};
}
lmssecondarycontactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmssecondarycontactsID)>=0)
{
this.lmssecondarycontactssource=new LocalDataSource();
this.lmssecondarycontactssource.load(this.lmsopportunityservice.lmssecondarycontacts as  any as LocalDataSource);
this.lmssecondarycontactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmssecondarycontactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.lmssecondarycontacts.length == 0)
{
    this.tbllmssecondarycontactssource.grid.createFormShown = true;
}
else
{
    let obj = new lmssecondarycontact();
    this.lmsopportunityservice.lmssecondarycontacts.push(obj);
    this.lmssecondarycontactssource.refresh();
    if ((this.lmsopportunityservice.lmssecondarycontacts.length / this.lmssecondarycontactssource.getPaging().perPage).toFixed(0) + 1 != this.lmssecondarycontactssource.getPaging().page)
    {
        this.lmssecondarycontactssource.setPage((this.lmsopportunityservice.lmssecondarycontacts.length / this.lmssecondarycontactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmssecondarycontactssource.grid.edit(this.tbllmssecondarycontactssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmssecondarycontactssource.data.indexOf(event.data);
this.onDeletelmssecondarycontact(event,event.data.secondarycontactid,((this.lmssecondarycontactssource.getPaging().page-1) *this.lmssecondarycontactssource.getPaging().perPage)+index);
this.lmssecondarycontactssource.refresh();
break;
}
}

*/
lmssecondarycontactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmssecondarycontact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmssecondarycontact(event,event.data.secondarycontactid,this.formid);
break;
case 'delete':
this.onDeletelmssecondarycontact(event,event.data.secondarycontactid,((this.lmssecondarycontactssource.getPaging().page-1) *this.lmssecondarycontactssource.getPaging().perPage)+event.index);
this.lmssecondarycontactssource.refresh();
break;
}
}
lmssecondarycontactsonDelete(obj) {
let secondarycontactid=obj.data.secondarycontactid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsopportunityservice.deletelmsopportunity(secondarycontactid).then(res=>
this.lmssecondarycontactsLoadTable()
);
}
}
lmssecondarycontactsPaging(val)
{
debugger;
this.lmssecondarycontactssource.setPaging(1, val, true);
}

handlelmssecondarycontactsGridSelected(event:any) {
this.lmssecondarycontactsselectedindex=this.lmsopportunityservice.lmssecondarycontacts.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
}
IslmssecondarycontactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmssecondarycontactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmssecondarycontacts
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

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsremindersopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmsremindersopportunityid3.push(obj);
}
if((this.tbllmsreminderssource.settings as any).columns['opportunityid'])
{
(this.tbllmsreminderssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsremindersopportunityid3));
this.tbllmsreminderssource.initGrid();
}
});
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
this.lmsreminderssource.load(this.lmsopportunityservice.lmsreminders as  any as LocalDataSource);
this.lmsreminderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsremindersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.lmsreminders.length == 0)
{
    this.tbllmsreminderssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsreminder();
    this.lmsopportunityservice.lmsreminders.push(obj);
    this.lmsreminderssource.refresh();
    if ((this.lmsopportunityservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1 != this.lmsreminderssource.getPaging().page)
    {
        this.lmsreminderssource.setPage((this.lmsopportunityservice.lmsreminders.length / this.lmsreminderssource.getPaging().perPage).toFixed(0) + 1);
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
this.lmsopportunityservice.deletelmsopportunity(reminderid).then(res=>
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
this.lmsremindersselectedindex=this.lmsopportunityservice.lmsreminders.findIndex(i => i.reminderid === event.data.reminderid);
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
//start of Grid Codes lmsquotes
lmsquotessettings:any;
lmsquotessource: any;

showlmsquotesCheckbox()
{
debugger;
if(this.tbllmsquotessource.settings['selectMode']== 'multi')this.tbllmsquotessource.settings['selectMode']= 'single';
else
this.tbllmsquotessource.settings['selectMode']= 'multi';
this.tbllmsquotessource.initGrid();
}
deletelmsquotesAll()
{
this.tbllmsquotessource.settings['selectMode'] = 'single';
}
showlmsquotesFilter()
{
  setTimeout(() => {
  this.SetlmsquotesTableddConfig();
  });
      if(this.tbllmsquotessource.settings!=null)this.tbllmsquotessource.settings['hideSubHeader'] =!this.tbllmsquotessource.settings['hideSubHeader'];
this.tbllmsquotessource.initGrid();
}
showlmsquotesInActive()
{
}
enablelmsquotesInActive()
{
}
async SetlmsquotesTableddConfig()
{
if(!this.bfilterPopulatelmsquotes){

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotesopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmsquotesopportunityid3.push(obj);
}
if((this.tbllmsquotessource.settings as any).columns['opportunityid'])
{
(this.tbllmsquotessource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotesopportunityid3));
this.tbllmsquotessource.initGrid();
}
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.datalmsquotescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsquotessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotescurrency3)), }, };
this.tbllmsquotessource.settings =  clone;
this.tbllmsquotessource.initGrid();
});

this.erptaxmasterservice.geterptaxmastersList().then(res=>
{
var datataxid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotestaxid3.push(defaultobj);
for(let i=0; i<datataxid2.length; i++){
var obj= { value: datataxid2[i].taxid, title:datataxid2[i].taxname};
this.datalmsquotestaxid3.push(obj);
}
if((this.tbllmsquotessource.settings as any).columns['taxid'])
{
(this.tbllmsquotessource.settings as any).columns['taxid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotestaxid3));
this.tbllmsquotessource.initGrid();
}
});

this.botermservice.getbotermsList().then(res=>
{
var datapaymenttermid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotespaymenttermid3.push(defaultobj);
for(let i=0; i<datapaymenttermid2.length; i++){
var obj= { value: datapaymenttermid2[i].termid, title:datapaymenttermid2[i].description};
this.datalmsquotespaymenttermid3.push(obj);
}
if((this.tbllmsquotessource.settings as any).columns['paymenttermid'])
{
(this.tbllmsquotessource.settings as any).columns['paymenttermid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotespaymenttermid3));
this.tbllmsquotessource.initGrid();
}
});

this.botermservice.getbotermsList().then(res=>
{
var datatermid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotestermid3.push(defaultobj);
for(let i=0; i<datatermid2.length; i++){
var obj= { value: datatermid2[i].termid, title:datatermid2[i].description};
this.datalmsquotestermid3.push(obj);
}
if((this.tbllmsquotessource.settings as any).columns['termid'])
{
(this.tbllmsquotessource.settings as any).columns['termid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotestermid3));
this.tbllmsquotessource.initGrid();
}
});

this.configservice.getList("leadsource").then(res=>
{
var dataleadsource2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotesleadsource3.push(defaultobj);
for(let i=0; i<dataleadsource2.length; i++){
var obj= { value: dataleadsource2[i].configkey, title: dataleadsource2[i].configtext};
this.datalmsquotesleadsource3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsquotessource.settings);
if(clone.columns['leadsource']!=undefined)clone.columns['leadsource'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotesleadsource3)), }, };
if(clone.columns['leadsource']!=undefined)clone.columns['leadsource'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotesleadsource3)), }, };
this.tbllmsquotessource.settings =  clone;
this.tbllmsquotessource.initGrid();
});

this.configservice.getList("quotestatus").then(res=>
{
var dataquotestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotesquotestatus3.push(defaultobj);
for(let i=0; i<dataquotestatus2.length; i++){
var obj= { value: dataquotestatus2[i].configkey, title: dataquotestatus2[i].configtext};
this.datalmsquotesquotestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsquotessource.settings);
if(clone.columns['quotestatus']!=undefined)clone.columns['quotestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotesquotestatus3)), }, };
if(clone.columns['quotestatus']!=undefined)clone.columns['quotestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotesquotestatus3)), }, };
this.tbllmsquotessource.settings =  clone;
this.tbllmsquotessource.initGrid();
});
}
this.bfilterPopulatelmsquotes=true;
}
async lmsquotesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsquotesTableConfig()
{
this.lmsquotessettings = {
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
reference: {
title: 'Reference',
type: '',
filter:true,
},
quotedate: {
title: 'Quote Date',
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
assignedto: {
title: 'Assigned To',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
quoteamount: {
title: 'Quote Amount',
type: 'number',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotescurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expirationdate: {
title: 'Expiration Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
taxid: {
title: 'Tax',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'wjjyy',reportcode:'wjjyy',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotestaxid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
shippingruleid: {
title: 'Shipping Rule',
type: 'number',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
taxamount: {
title: 'Tax Amount',
type: 'number',
filter:true,
},
charges: {
title: 'Charges',
type: 'number',
filter:true,
},
paymenttermid: {
title: 'Payment Term',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotespaymenttermid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
termid: {
title: 'Term',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotestermid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
terms: {
title: 'Terms',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
campaignid: {
title: 'Campaign',
type: 'number',
filter:true,
},
leadsource: {
title: 'Lead Source',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotesleadsource3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
supplierquotationid: {
title: 'Supplier Quotation',
type: 'number',
filter:true,
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
quotestatus: {
title: 'Quote Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotesquotestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
lmsquotesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotesID)>=0)
{
this.lmsquotessource=new LocalDataSource();
this.lmsquotessource.load(this.lmsopportunityservice.lmsquotes as  any as LocalDataSource);
this.lmsquotessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsquotesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.lmsquotes.length == 0)
{
    this.tbllmsquotessource.grid.createFormShown = true;
}
else
{
    let obj = new lmsquote();
    this.lmsopportunityservice.lmsquotes.push(obj);
    this.lmsquotessource.refresh();
    if ((this.lmsopportunityservice.lmsquotes.length / this.lmsquotessource.getPaging().perPage).toFixed(0) + 1 != this.lmsquotessource.getPaging().page)
    {
        this.lmsquotessource.setPage((this.lmsopportunityservice.lmsquotes.length / this.lmsquotessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsquotessource.grid.edit(this.tbllmsquotessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsquotessource.data.indexOf(event.data);
this.onDeletelmsquote(event,event.data.quoteid,((this.lmsquotessource.getPaging().page-1) *this.lmsquotessource.getPaging().perPage)+index);
this.lmsquotessource.refresh();
break;
}
}

*/
lmsquotesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsquote(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsquote(event,event.data.quoteid,this.formid);
break;
case 'delete':
this.onDeletelmsquote(event,event.data.quoteid,((this.lmsquotessource.getPaging().page-1) *this.lmsquotessource.getPaging().perPage)+event.index);
this.lmsquotessource.refresh();
break;
}
}
lmsquotesonDelete(obj) {
let quoteid=obj.data.quoteid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsopportunityservice.deletelmsopportunity(quoteid).then(res=>
this.lmsquotesLoadTable()
);
}
}
lmsquotesPaging(val)
{
debugger;
this.lmsquotessource.setPaging(1, val, true);
}

handlelmsquotesGridSelected(event:any) {
this.lmsquotesselectedindex=this.lmsopportunityservice.lmsquotes.findIndex(i => i.quoteid === event.data.quoteid);
}
IslmsquotesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsquotes
//start of Grid Codes boexpenses
boexpensessettings:any;
boexpensessource: any;

showboexpensesCheckbox()
{
debugger;
if(this.tblboexpensessource.settings['selectMode']== 'multi')this.tblboexpensessource.settings['selectMode']= 'single';
else
this.tblboexpensessource.settings['selectMode']= 'multi';
this.tblboexpensessource.initGrid();
}
deleteboexpensesAll()
{
this.tblboexpensessource.settings['selectMode'] = 'single';
}
showboexpensesFilter()
{
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });
      if(this.tblboexpensessource.settings!=null)this.tblboexpensessource.settings['hideSubHeader'] =!this.tblboexpensessource.settings['hideSubHeader'];
this.tblboexpensessource.initGrid();
}
showboexpensesInActive()
{
}
enableboexpensesInActive()
{
}
async SetboexpensesTableddConfig()
{
if(!this.bfilterPopulateboexpenses){

this.bousermasterservice.getbousermastersList().then(res=>
{
var datarequesteduserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesrequesteduserid3.push(defaultobj);
for(let i=0; i<datarequesteduserid2.length; i++){
var obj= { value: datarequesteduserid2[i].userid, title:datarequesteduserid2[i].username};
this.databoexpensesrequesteduserid3.push(obj);
}
if((this.tblboexpensessource.settings as any).columns['requesteduserid'])
{
(this.tblboexpensessource.settings as any).columns['requesteduserid'].editor.config.list=JSON.parse(JSON.stringify(this.databoexpensesrequesteduserid3));
this.tblboexpensessource.initGrid();
}
});

this.configservice.getList("expensetype").then(res=>
{
var dataexpensetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesexpensetype3.push(defaultobj);
for(let i=0; i<dataexpensetype2.length; i++){
var obj= { value: dataexpensetype2[i].configkey, title: dataexpensetype2[i].configtext};
this.databoexpensesexpensetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['expensetype']!=undefined)clone.columns['expensetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesexpensetype3)), }, };
if(clone.columns['expensetype']!=undefined)clone.columns['expensetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesexpensetype3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.configservice.getList("expensecategory").then(res=>
{
var dataexpensecategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesexpensecategory3.push(defaultobj);
for(let i=0; i<dataexpensecategory2.length; i++){
var obj= { value: dataexpensecategory2[i].configkey, title: dataexpensecategory2[i].configtext};
this.databoexpensesexpensecategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['expensecategory']!=undefined)clone.columns['expensecategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesexpensecategory3)), }, };
if(clone.columns['expensecategory']!=undefined)clone.columns['expensecategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesexpensecategory3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.databoexpensescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var databasecurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesbasecurrency3.push(defaultobj);
for(let i=0; i<databasecurrency2.length; i++){
var obj= { value: databasecurrency2[i].configkey, title: databasecurrency2[i].configtext};
this.databoexpensesbasecurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.erpfacostcenterservice.geterpfacostcentersList().then(res=>
{
var datacostcenterid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensescostcenterid3.push(defaultobj);
for(let i=0; i<datacostcenterid2.length; i++){
var obj= { value: datacostcenterid2[i].costcenterid, title:datacostcenterid2[i].costcentername};
this.databoexpensescostcenterid3.push(obj);
}
if((this.tblboexpensessource.settings as any).columns['costcenterid'])
{
(this.tblboexpensessource.settings as any).columns['costcenterid'].editor.config.list=JSON.parse(JSON.stringify(this.databoexpensescostcenterid3));
this.tblboexpensessource.initGrid();
}
});
}
this.bfilterPopulateboexpenses=true;
}
async boexpensesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboexpensesTableConfig()
{
this.boexpensessettings = {
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
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
expensedate: {
title: 'Expense Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requesteduserid: {
title: 'Requested User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesrequesteduserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expensetype: {
title: 'Expense Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesexpensetype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expensecategory: {
title: 'Expense Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesexpensecategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expensedescription: {
title: 'Expense Description',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensescurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: 'number',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
merchant: {
title: 'Merchant',
type: '',
filter:true,
},
receiptattached: {
title: 'Receipt Attached',
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
billable: {
title: 'Billable',
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
reimbursedamount: {
title: 'Reimbursed Amount',
type: 'number',
filter:true,
},
reimburseddate: {
title: 'Reimbursed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
referencenumber: {
title: 'Reference Number',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesbasecurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
baseamount: {
title: 'Base Amount',
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
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
return ret;
},
},
costcenterid: {
title: 'Cost Center',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensescostcenterid3.find(c=>c.value==cell);
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
boexpensesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
this.boexpensessource=new LocalDataSource();
this.boexpensessource.load(this.lmsopportunityservice.boexpenses as  any as LocalDataSource);
this.boexpensessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boexpensesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsopportunityservice.boexpenses.length == 0)
{
    this.tblboexpensessource.grid.createFormShown = true;
}
else
{
    let obj = new boexpense();
    this.lmsopportunityservice.boexpenses.push(obj);
    this.boexpensessource.refresh();
    if ((this.lmsopportunityservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1 != this.boexpensessource.getPaging().page)
    {
        this.boexpensessource.setPage((this.lmsopportunityservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboexpensessource.grid.edit(this.tblboexpensessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boexpensessource.data.indexOf(event.data);
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+index);
this.boexpensessource.refresh();
break;
}
}

*/
boexpensesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboexpense(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboexpense(event,event.data.expenseid,this.formid);
break;
case 'delete':
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+event.index);
this.boexpensessource.refresh();
break;
}
}
boexpensesonDelete(obj) {
let expenseid=obj.data.expenseid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsopportunityservice.deletelmsopportunity(expenseid).then(res=>
this.boexpensesLoadTable()
);
}
}
boexpensesPaging(val)
{
debugger;
this.boexpensessource.setPaging(1, val, true);
}

handleboexpensesGridSelected(event:any) {
this.boexpensesselectedindex=this.lmsopportunityservice.boexpenses.findIndex(i => i.expenseid === event.data.expenseid);
}
IsboexpensesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boexpenses

}



