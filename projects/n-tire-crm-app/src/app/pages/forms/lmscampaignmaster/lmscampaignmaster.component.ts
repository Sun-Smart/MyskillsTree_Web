import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
import { lmscampaignmaster } from './../../../model/lmscampaignmaster.model';
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
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { lmscampaigntask } from './../../../model/lmscampaigntask.model';
import { lmscampaigntaskComponent } from './../../../pages/forms/lmscampaigntask/lmscampaigntask.component';
//FK services
import { lmscampaignlocation } from './../../../model/lmscampaignlocation.model';
import { lmscampaignlocationComponent } from './../../../pages/forms/lmscampaignlocation/lmscampaignlocation.component';
//FK services
import { bobranchlocation,IbobranchlocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
import { lmscampaignnoaccess } from './../../../model/lmscampaignnoaccess.model';
import { lmscampaignnoaccessComponent } from './../../../pages/forms/lmscampaignnoaccess/lmscampaignnoaccess.component';
//FK services
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { lmspost } from './../../../model/lmspost.model';
import { lmspostComponent } from './../../../pages/forms/lmspost/lmspost.component';
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
selector: 'app-lmscampaignmaster',
templateUrl: './lmscampaignmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmscampaignmasterComponent implements OnInit {
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
bfilterPopulatelmscampaignmasters:boolean=false;
datalmscampaignmastersproductid3:any=[];
datalmscampaignmasterscampaigntype3:any=[];
datalmscampaignmastersterritory3:any=[];
datalmscampaignmasterspriority3:any=[];
datalmscampaignmastersbusinessgoal3:any=[];
datalmscampaignmasterstargetmarket3:any=[];
datalmscampaignmasterstargetaudience3:any=[];
datalmscampaignmasterstargetindustry3:any=[];
datalmscampaignmastersstrategy3:any=[];
datalmscampaignmasterstargettype3:any=[];
datalmscampaignmastersexpectedofferaction3:any=[];
datalmscampaignmastersperformancestatus3:any=[];
datalmscampaignmasterscampaignstatus3:any=[];
datalmscampaigntasksproductid3:any=[];
datalmscampaigntaskscampaignid3:any=[];
datalmscampaigntaskspriority3:any=[];
datalmscampaigntasksperformancestatus3:any=[];
datalmscampaigntaskscampaigntype3:any=[];
datalmscampaigntaskstargettype3:any=[];
bfilterPopulatelmscampaigntasks:boolean=false;
datalmscampaignlocationslocationid3:any=[];
datalmscampaignlocationsresponsibilityid3:any=[];
bfilterPopulatelmscampaignlocations:boolean=false;
bfilterPopulatelmscampaignnoaccesses:boolean=false;
datalmspostsuserid3:any=[];
datalmspostscampaigntype3:any=[];
datalmspostscampaignstatus3:any=[];
bfilterPopulatelmsposts:boolean=false;
@ViewChild('tbllmscampaigntaskssource',{static:false}) tbllmscampaigntaskssource: Ng2SmartTableComponent;
@ViewChild('tbllmscampaignlocationssource',{static:false}) tbllmscampaignlocationssource: Ng2SmartTableComponent;
@ViewChild('tbllmscampaignnoaccessessource',{static:false}) tbllmscampaignnoaccessessource: Ng2SmartTableComponent;
@ViewChild('tbllmspostssource',{static:false}) tbllmspostssource: Ng2SmartTableComponent;
 lmscampaignmasterForm: FormGroup;
productidList: lmsproductmaster[];
campaigntypeList: boconfigvalue[];
territoryList: boconfigvalue[];
priorityList: boconfigvalue[];
businessgoalList: boconfigvalue[];
targetmarketList: boconfigvalue[];
targetaudienceList: boconfigvalue[];
targetindustryList: boconfigvalue[];
strategyList: boconfigvalue[];
targettypeList: boconfigvalue[];
expectedofferactionList: boconfigvalue[];
performancestatusList: boconfigvalue[];
campaignstatusList: boconfigvalue[];
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
lmscampaignmastershowOption:boolean;
lmscampaigntaskshowOption:boolean;
lmscampaignlocationshowOption:boolean;
lmscampaignnoaccessshowOption:boolean;
lmspostshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmscampaigntasksvisiblelist:any;
lmscampaigntaskshidelist:any;
lmscampaignlocationsvisiblelist:any;
lmscampaignlocationshidelist:any;
lmscampaignnoaccessesvisiblelist:any;
lmscampaignnoaccesseshidelist:any;
lmspostsvisiblelist:any;
lmspostshidelist:any;

DeletedlmscampaigntaskIDs: string="";
lmscampaigntasksID: string = "1";
lmscampaigntasksselectedindex:any;
DeletedlmscampaignlocationIDs: string="";
lmscampaignlocationsID: string = "2";
lmscampaignlocationsselectedindex:any;
DeletedlmscampaignnoaccessIDs: string="";
lmscampaignnoaccessesID: string = "3";
lmscampaignnoaccessesselectedindex:any;
DeletedlmspostIDs: string="";
lmspostsID: string = "4";
lmspostsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmscampaignmasterservice: lmscampaignmasterService,
private bousermasterservice: bousermasterService,
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
this.lmscampaignmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
productid: [null],
productiddesc: [null],
campaignid: [null],
campaigncode: [null, Validators.required],
campaignname: [null, Validators.required],
campaigntype: [null],
campaigntypedesc: [null],
campaignowner: [null, Validators.required],
validfrom: [null, Validators.required],
validto: [null],
startdate: [null],
enddate: [null],
details: [null],
campaignscript: [null],
territory: [null],
territorydesc: [null],
priority: [null],
prioritydesc: [null],
businessgoal: [null],
businessgoaldesc: [null],
targetmarket: [null],
targetmarketdesc: [null],
targetaudience: [null],
targetaudiencedesc: [null],
targetindustry: [null],
targetindustrydesc: [null],
strategy: [null],
strategydesc: [null],
targettype: [null],
targettypedesc: [null],
expectedofferaction: [null],
expectedofferactiondesc: [null],
expectedsales: [null],
expectedrevenue: [null],
expectedprofit: [null],
expectedroi: [null],
dailytarget: [null],
actualachieved: [null],
performancestatus: [null],
performancestatusdesc: [null],
budgetcost: [null],
actualcost: [null],
mediabudget: [null],
actualmediacost: [null],
phonenumber: [null],
uniquephonenumber: [null],
landingpage: [null],
uniquelandingpage: [null],
websitelinksavailable: [null],
numberofpages: [null],
enquiryresponsibility: [null],
emailresponsibility: [null],
campaignemail: [null],
trackinboundcalls: [null],
trackvisitors: [null],
trackingdetails: [null],
handlingvolumes: [null],
trainingrequirement: [null],
afterenquiry: [null],
emailresponsetat: [null],
afteremail: [null],
customfield: [null],
attachment: [null],
campaignstatus: [null],
campaignstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmscampaignmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmscampaignmasterForm.dirty && this.lmscampaignmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
campaigncodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.campaigncode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].campaignid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Campaign Code value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.campaignid && pkDetail) {
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
let lmscampaignmasterid = null;

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
this.formid=lmscampaignmasterid;
//this.sharedService.alert(lmscampaignmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmscampaigntasksTableConfig();
  setTimeout(() => {
  this.SetlmscampaigntasksTableddConfig();
  });

this.SetlmscampaignlocationsTableConfig();
  setTimeout(() => {
  this.SetlmscampaignlocationsTableddConfig();
  });

this.SetlmscampaignnoaccessesTableConfig();
  setTimeout(() => {
  this.SetlmscampaignnoaccessesTableddConfig();
  });

this.SetlmspostsTableConfig();
  setTimeout(() => {
  this.SetlmspostsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("campaigntype").then(res => this.campaigntypeList = res as boconfigvalue[]);
this.configservice.getList("territory").then(res => this.territoryList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("businessgoal").then(res => this.businessgoalList = res as boconfigvalue[]);
this.configservice.getList("targetmarket").then(res => this.targetmarketList = res as boconfigvalue[]);
this.configservice.getList("targetaudience").then(res => this.targetaudienceList = res as boconfigvalue[]);
this.configservice.getList("targetindustry").then(res => this.targetindustryList = res as boconfigvalue[]);
this.configservice.getList("strategy").then(res => this.strategyList = res as boconfigvalue[]);
this.configservice.getList("targettype").then(res => this.targettypeList = res as boconfigvalue[]);
this.configservice.getList("offeraction").then(res => this.expectedofferactionList = res as boconfigvalue[]);
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);
this.configservice.getList("campaignstatus").then(res => this.campaignstatusList = res as boconfigvalue[]);

//autocomplete
    this.lmscampaignmasterservice.getlmscampaignmastersList().then(res => {
      this.pkList = res as lmscampaignmaster[];
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
this.lmscampaignmasterForm.markAsUntouched();
this.lmscampaignmasterForm.markAsPristine();
}



resetForm() {
if (this.lmscampaignmasterForm != null)
this.lmscampaignmasterForm.reset();
this.lmscampaignmasterForm.patchValue({
});
setTimeout(() => {
this.lmscampaignmasterservice.lmscampaigntasks=[];
this.lmscampaigntasksLoadTable();
this.lmscampaignmasterservice.lmscampaignlocations=[];
this.lmscampaignlocationsLoadTable();
this.lmscampaignmasterservice.lmscampaignnoaccesses=[];
this.lmscampaignmasterservice.Insertlmscampaignnoaccesses=[];
this.lmscampaignnoaccessesLoadTable();
this.lmscampaignmasterservice.lmsposts=[];
this.lmspostsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let campaignid = this.lmscampaignmasterForm.get('campaignid').value;
        if(campaignid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaignmasterservice.deletelmscampaignmaster(campaignid).then(res =>
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
    this.lmscampaignmasterForm.patchValue({
        campaignid: null
    });
    if(this.lmscampaignmasterservice.formData.campaignid!=null)this.lmscampaignmasterservice.formData.campaignid=null;
for (let i=0;i<this.lmscampaignmasterservice.lmscampaigntasks.length;i++) {
this.lmscampaignmasterservice.lmscampaigntasks[i].taskid=null;
}
for (let i=0;i<this.lmscampaignmasterservice.lmscampaignlocations.length;i++) {
this.lmscampaignmasterservice.lmscampaignlocations[i].locationid=null;
}
for (let i=0;i<this.lmscampaignmasterservice.lmscampaignnoaccesses.length;i++) {
this.lmscampaignmasterservice.lmscampaignnoaccesses[i].accessid=null;
}
for (let i=0;i<this.lmscampaignmasterservice.lmsposts.length;i++) {
this.lmscampaignmasterservice.lmsposts[i].postid=null;
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
        else if(key=="campaignowner")
this.lmscampaignmasterForm.patchValue({"campaignowner":  mainscreendata[key] } );
        else if(key=="validfrom")
this.lmscampaignmasterForm.patchValue({"validfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validto")
this.lmscampaignmasterForm.patchValue({"validto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.lmscampaignmasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.lmscampaignmasterForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enquiryresponsibility")
this.lmscampaignmasterForm.patchValue({"enquiryresponsibility":  mainscreendata[key] } );
        else if(key=="emailresponsibility")
this.lmscampaignmasterForm.patchValue({"emailresponsibility":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.lmscampaignmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmscampaignmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmscampaignmasterForm.controls[key]!=undefined)
{
this.lmscampaignmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaignmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
productidonChange(evt:any){
let e=evt.value;
this.lmscampaignmasterForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
campaignidonChange(evt:any){
let e=evt.value;
}
campaigncodeonChange(evt:any){
let e=evt.value;
}
campaignnameonChange(evt:any){
let e=evt.value;
}
campaigntypeonChange(evt:any){
let e=this.f.campaigntype.value as any;
this.lmscampaignmasterForm.patchValue({campaigntypedesc:evt.options[evt.options.selectedIndex].text});
}
campaignowneronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrcampaignowner=res;
let objcampaignowner;
if (arrcampaignowner.length > 0) objcampaignowner = arrcampaignowner[0];
if (objcampaignowner)
{
}
}).catch((err) => {console.log(err);});
}
validfromonChange(evt:any){
let e=evt.value;
}
validtoonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
campaignscriptonChange(evt:any){
let e=evt.value;
}
territoryonChange(evt:any){
let e=this.f.territory.value as any;
this.lmscampaignmasterForm.patchValue({territorydesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.lmscampaignmasterForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
businessgoalonChange(evt:any){
let e=this.f.businessgoal.value as any;
this.lmscampaignmasterForm.patchValue({businessgoaldesc:evt.options[evt.options.selectedIndex].text});
}
targetmarketonChange(evt:any){
let e=this.f.targetmarket.value as any;
this.lmscampaignmasterForm.patchValue({targetmarketdesc:evt.options[evt.options.selectedIndex].text});
}
targetaudienceonChange(evt:any){
let e=this.f.targetaudience.value as any;
this.lmscampaignmasterForm.patchValue({targetaudiencedesc:evt.options[evt.options.selectedIndex].text});
}
targetindustryonChange(evt:any){
let e=this.f.targetindustry.value as any;
this.lmscampaignmasterForm.patchValue({targetindustrydesc:evt.options[evt.options.selectedIndex].text});
}
strategyonChange(evt:any){
let e=this.f.strategy.value as any;
this.lmscampaignmasterForm.patchValue({strategydesc:evt.options[evt.options.selectedIndex].text});
}
targettypeonChange(evt:any){
let e=this.f.targettype.value as any;
this.lmscampaignmasterForm.patchValue({targettypedesc:evt.options[evt.options.selectedIndex].text});
}
expectedofferactiononChange(evt:any){
let e=this.f.expectedofferaction.value as any;
this.lmscampaignmasterForm.patchValue({expectedofferactiondesc:evt.options[evt.options.selectedIndex].text});
}
expectedsalesonChange(evt:any){
let e=evt.value;
}
expectedrevenueonChange(evt:any){
let e=evt.value;
}
expectedprofitonChange(evt:any){
let e=evt.value;
}
expectedroionChange(evt:any){
let e=evt.value;
}
dailytargetonChange(evt:any){
let e=evt.value;
}
actualachievedonChange(evt:any){
let e=evt.value;
}
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.lmscampaignmasterForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
}
budgetcostonChange(evt:any){
let e=evt.value;
}
actualcostonChange(evt:any){
let e=evt.value;
}
mediabudgetonChange(evt:any){
let e=evt.value;
}
actualmediacostonChange(evt:any){
let e=evt.value;
}
phonenumberonChange(evt:any){
let e=evt.value;
}
uniquephonenumberonChange(evt:any){
let e=evt.value;
}
landingpageonChange(evt:any){
let e=evt.value;
}
uniquelandingpageonChange(evt:any){
let e=evt.value;
}
websitelinksavailableonChange(evt:any){
let e=evt.value;
}
numberofpagesonChange(evt:any){
let e=evt.value;
}
enquiryresponsibilityonChange(evt:any){
let e=evt.value;
}
emailresponsibilityonChange(evt:any){
let e=evt.value;
}
campaignemailonChange(evt:any){
let e=evt.value;
}
trackinboundcallsonChange(evt:any){
let e=evt.value;
}
trackvisitorsonChange(evt:any){
let e=evt.value;
}
trackingdetailsonChange(evt:any){
let e=evt.value;
}
handlingvolumesonChange(evt:any){
let e=evt.value;
}
trainingrequirementonChange(evt:any){
let e=evt.value;
}
afterenquiryonChange(evt:any){
let e=evt.value;
}
emailresponsetatonChange(evt:any){
let e=evt.value;
}
afteremailonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
campaignstatusonChange(evt:any){
let e=this.f.campaignstatus.value as any;
this.lmscampaignmasterForm.patchValue({campaignstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlmscampaignmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmscampaignmasterservice.getlmscampaignmastersByEID(pkcol).then(res => {

this.lmscampaignmasterservice.formData=res.lmscampaignmaster;
let formproperty=res.lmscampaignmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmscampaignmaster.pkcol;
this.formid=res.lmscampaignmaster.campaignid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmscampaignmaster.campaignid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmscampaignmasterForm.patchValue({
productid: res.lmscampaignmaster.productid,
productiddesc: res.lmscampaignmaster.productiddesc,
campaignid: res.lmscampaignmaster.campaignid,
campaigncode: res.lmscampaignmaster.campaigncode,
campaignname: res.lmscampaignmaster.campaignname,
campaigntype: res.lmscampaignmaster.campaigntype,
campaigntypedesc: res.lmscampaignmaster.campaigntypedesc,
campaignowner: JSON.parse(res.lmscampaignmaster.campaignowner),
validfrom: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validfrom),
validto: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validto),
startdate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.startdate),
enddate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.enddate),
details: res.lmscampaignmaster.details,
campaignscript: res.lmscampaignmaster.campaignscript,
territory: res.lmscampaignmaster.territory,
territorydesc: res.lmscampaignmaster.territorydesc,
priority: res.lmscampaignmaster.priority,
prioritydesc: res.lmscampaignmaster.prioritydesc,
businessgoal: res.lmscampaignmaster.businessgoal,
businessgoaldesc: res.lmscampaignmaster.businessgoaldesc,
targetmarket: res.lmscampaignmaster.targetmarket,
targetmarketdesc: res.lmscampaignmaster.targetmarketdesc,
targetaudience: res.lmscampaignmaster.targetaudience,
targetaudiencedesc: res.lmscampaignmaster.targetaudiencedesc,
targetindustry: res.lmscampaignmaster.targetindustry,
targetindustrydesc: res.lmscampaignmaster.targetindustrydesc,
strategy: res.lmscampaignmaster.strategy,
strategydesc: res.lmscampaignmaster.strategydesc,
targettype: res.lmscampaignmaster.targettype,
targettypedesc: res.lmscampaignmaster.targettypedesc,
expectedofferaction: res.lmscampaignmaster.expectedofferaction,
expectedofferactiondesc: res.lmscampaignmaster.expectedofferactiondesc,
expectedsales: res.lmscampaignmaster.expectedsales,
expectedrevenue: res.lmscampaignmaster.expectedrevenue,
expectedprofit: res.lmscampaignmaster.expectedprofit,
expectedroi: res.lmscampaignmaster.expectedroi,
dailytarget: res.lmscampaignmaster.dailytarget,
actualachieved: res.lmscampaignmaster.actualachieved,
performancestatus: res.lmscampaignmaster.performancestatus,
performancestatusdesc: res.lmscampaignmaster.performancestatusdesc,
budgetcost: res.lmscampaignmaster.budgetcost,
actualcost: res.lmscampaignmaster.actualcost,
mediabudget: res.lmscampaignmaster.mediabudget,
actualmediacost: res.lmscampaignmaster.actualmediacost,
phonenumber: res.lmscampaignmaster.phonenumber,
uniquephonenumber: res.lmscampaignmaster.uniquephonenumber,
landingpage: res.lmscampaignmaster.landingpage,
uniquelandingpage: res.lmscampaignmaster.uniquelandingpage,
websitelinksavailable: res.lmscampaignmaster.websitelinksavailable,
numberofpages: res.lmscampaignmaster.numberofpages,
enquiryresponsibility: JSON.parse(res.lmscampaignmaster.enquiryresponsibility),
emailresponsibility: JSON.parse(res.lmscampaignmaster.emailresponsibility),
campaignemail: res.lmscampaignmaster.campaignemail,
trackinboundcalls: res.lmscampaignmaster.trackinboundcalls,
trackvisitors: res.lmscampaignmaster.trackvisitors,
trackingdetails: res.lmscampaignmaster.trackingdetails,
handlingvolumes: res.lmscampaignmaster.handlingvolumes,
trainingrequirement: res.lmscampaignmaster.trainingrequirement,
afterenquiry: res.lmscampaignmaster.afterenquiry,
emailresponsetat: res.lmscampaignmaster.emailresponsetat,
afteremail: res.lmscampaignmaster.afteremail,
customfield: res.lmscampaignmaster.customfield,
attachment: JSON.parse(res.lmscampaignmaster.attachment),
campaignstatus: res.lmscampaignmaster.campaignstatus,
campaignstatusdesc: res.lmscampaignmaster.campaignstatusdesc,
status: res.lmscampaignmaster.status,
statusdesc: res.lmscampaignmaster.statusdesc,
});
this.lmscampaigntasksvisiblelist=res.lmscampaigntasksvisiblelist;
this.lmscampaignlocationsvisiblelist=res.lmscampaignlocationsvisiblelist;
this.lmscampaignnoaccessesvisiblelist=res.lmscampaignnoaccessesvisiblelist;
this.lmspostsvisiblelist=res.lmspostsvisiblelist;
if(this.lmscampaignmasterForm.get('customfield').value!=null && this.lmscampaignmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmscampaignmasterForm.get('customfield').value);
this.FillCustomField();
if(this.lmscampaignmasterForm.get('attachment').value!=null && this.lmscampaignmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmscampaignmasterForm.get('attachment').value);
//Child Tables if any
this.lmscampaignmasterservice.lmscampaigntasks = res.lmscampaigntasks;
this.SetlmscampaigntasksTableConfig();
this.lmscampaigntasksLoadTable();
  setTimeout(() => {
  this.SetlmscampaigntasksTableddConfig();
  });
this.lmscampaignmasterservice.lmscampaignlocations = res.lmscampaignlocations;
this.SetlmscampaignlocationsTableConfig();
this.lmscampaignlocationsLoadTable();
  setTimeout(() => {
  this.SetlmscampaignlocationsTableddConfig();
  });
this.lmscampaignmasterservice.lmscampaignnoaccesses = res.lmscampaignnoaccesses;
this.SetlmscampaignnoaccessesTableConfig();
this.lmscampaignnoaccessesLoadTable();
  setTimeout(() => {
  this.SetlmscampaignnoaccessesTableddConfig();
  });
this.lmscampaignmasterservice.Insertlmscampaignnoaccesses=[];
this.lmscampaignmasterservice.lmsposts = res.lmsposts;
this.SetlmspostsTableConfig();
this.lmspostsLoadTable();
  setTimeout(() => {
  this.SetlmspostsTableddConfig();
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
  for (let key in this.lmscampaignmasterForm.controls) {
    if (this.lmscampaignmasterForm.controls[key] != null) {
if(false)
{
if(this.lmscampaignmasterservice.formData!=null && this.lmscampaignmasterservice.formData[key]!=null  && this.lmscampaignmasterservice.formData[key]!='[]' && this.lmscampaignmasterservice.formData[key]!=undefined && this.lmscampaignmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmscampaignmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmscampaignmasterservice.formData!=null && this.lmscampaignmasterservice.formData[key]!=null   && this.lmscampaignmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmscampaignmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmscampaignmasterservice.formData!=null && this.lmscampaignmasterservice.formData[key]!=null   && this.lmscampaignmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmscampaignmasterservice.formData[key]+"'><div class='progress__number'>"+this.lmscampaignmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmscampaignmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmscampaignmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmscampaignmasterForm.value;
obj.campaignowner=JSON.stringify(this.lmscampaignmasterForm.get('campaignowner').value);
obj.validfrom=new Date(this.lmscampaignmasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('validfrom').value)+'  UTC' :null);
obj.validto=new Date(this.lmscampaignmasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('validto').value)+'  UTC' :null);
obj.startdate=new Date(this.lmscampaignmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.lmscampaignmasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('enddate').value)+'  UTC' :null);
obj.enquiryresponsibility=JSON.stringify(this.lmscampaignmasterForm.get('enquiryresponsibility').value);
obj.emailresponsibility=JSON.stringify(this.lmscampaignmasterForm.get('emailresponsibility').value);
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

private lmscampaignmastertoggleOption(){
this.lmscampaignmastershowOption = this.lmscampaignmastershowOption === true ? false : true;
}

private lmscampaigntasktoggleOption(){
this.lmscampaigntaskshowOption = this.lmscampaigntaskshowOption === true ? false : true;
}

private lmscampaignlocationtoggleOption(){
this.lmscampaignlocationshowOption = this.lmscampaignlocationshowOption === true ? false : true;
}

private lmscampaignnoaccesstoggleOption(){
this.lmscampaignnoaccessshowOption = this.lmscampaignnoaccessshowOption === true ? false : true;
}

private lmsposttoggleOption(){
this.lmspostshowOption = this.lmspostshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmscampaignmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmscampaignmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmscampaignmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmscampaignmasterservice.formData=this.lmscampaignmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmscampaignmasterForm.controls[key] != null)
    {
        this.lmscampaignmasterservice.formData[key] = this.lmscampaignmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmscampaignmasterservice.formData.campaignowner=JSON.stringify(this.lmscampaignmasterForm.get('campaignowner').value);
this.lmscampaignmasterservice.formData.validfrom=new Date(this.lmscampaignmasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('validfrom').value)+'  UTC' :null);
this.lmscampaignmasterservice.formData.validto=new Date(this.lmscampaignmasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('validto').value)+'  UTC' :null);
this.lmscampaignmasterservice.formData.startdate=new Date(this.lmscampaignmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('startdate').value)+'  UTC' :null);
this.lmscampaignmasterservice.formData.enddate=new Date(this.lmscampaignmasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmasterForm.get('enddate').value)+'  UTC' :null);
this.lmscampaignmasterservice.formData.enquiryresponsibility=JSON.stringify(this.lmscampaignmasterForm.get('enquiryresponsibility').value);
this.lmscampaignmasterservice.formData.emailresponsibility=JSON.stringify(this.lmscampaignmasterForm.get('emailresponsibility').value);
this.lmscampaignmasterservice.formData.customfield=JSON.stringify(customfields);
this.lmscampaignmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmscampaignmasterservice.formData.DeletedlmscampaigntaskIDs = this.DeletedlmscampaigntaskIDs;
this.lmscampaignmasterservice.formData.DeletedlmscampaignlocationIDs = this.DeletedlmscampaignlocationIDs;
this.lmscampaignmasterservice.formData.DeletedlmscampaignnoaccessIDs = this.DeletedlmscampaignnoaccessIDs;
this.lmscampaignmasterservice.formData.DeletedlmspostIDs = this.DeletedlmspostIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmscampaignmasterservice.formData);
this.lmscampaignmasterservice.formData=this.lmscampaignmasterForm.value;
this.lmscampaignmasterservice.saveOrUpdatelmscampaignmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmscampaigntaskssource.data)
{
    for (let i = 0; i < this.lmscampaigntaskssource.data.length; i++)
    {
        if (this.lmscampaigntaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscampaigntaskssource.data[i].fileattachmentlist);
    }
}
if (this.lmscampaignlocationssource.data)
{
    for (let i = 0; i < this.lmscampaignlocationssource.data.length; i++)
    {
        if (this.lmscampaignlocationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscampaignlocationssource.data[i].fileattachmentlist);
    }
}
if (this.lmscampaignnoaccessessource.data)
{
    for (let i = 0; i < this.lmscampaignnoaccessessource.data.length; i++)
    {
        if (this.lmscampaignnoaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscampaignnoaccessessource.data[i].fileattachmentlist);
    }
}
if (this.lmspostssource.data)
{
    for (let i = 0; i < this.lmspostssource.data.length; i++)
    {
        if (this.lmspostssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmspostssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscampaignmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmscampaignmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscampaignmaster);
}
else
{
this.FillData(res);
}
}
this.lmscampaignmasterForm.markAsUntouched();
this.lmscampaignmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmscampaignmasterForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmscampaigntask(event:any,taskid:any, campaignid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscampaigntaskComponent, 
{
data:  {  showview:false,save:false,event,taskid, campaignid,visiblelist:this.lmscampaigntasksvisiblelist,  hidelist:this.lmscampaigntaskshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmscampaigntaskssource.add(res);
this.lmscampaigntaskssource.refresh();
}
else
{
this.lmscampaigntaskssource.update(event.data, res);
}
}
});
}

onDeletelmscampaigntask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmscampaigntaskIDs += childID + ",";
this.lmscampaignmasterservice.lmscampaigntasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmscampaignlocation(event:any,locationid:any, campaignid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscampaignlocationComponent, 
{
data:  {  showview:false,save:false,event,locationid, campaignid,visiblelist:this.lmscampaignlocationsvisiblelist,  hidelist:this.lmscampaignlocationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmscampaignlocationssource.add(res);
this.lmscampaignlocationssource.refresh();
}
else
{
this.lmscampaignlocationssource.update(event.data, res);
}
}
});
}

onDeletelmscampaignlocation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmscampaignlocationIDs += childID + ",";
this.lmscampaignmasterservice.lmscampaignlocations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmspost(event:any,postid:any, campaignid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmspostComponent, 
{
data:  {  showview:false,save:false,event,postid, campaignid,visiblelist:this.lmspostsvisiblelist,  hidelist:this.lmspostshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmspostssource.add(res);
this.lmspostssource.refresh();
}
else
{
this.lmspostssource.update(event.data, res);
}
}
});
}

onDeletelmspost(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmspostIDs += childID + ",";
this.lmscampaignmasterservice.lmsposts.splice(i, 1);
//this.updateGrandTotal();
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmscampaigntasks
lmscampaigntaskssettings:any;
lmscampaigntaskssource: any;

showlmscampaigntasksCheckbox()
{
debugger;
if(this.tbllmscampaigntaskssource.settings['selectMode']== 'multi')this.tbllmscampaigntaskssource.settings['selectMode']= 'single';
else
this.tbllmscampaigntaskssource.settings['selectMode']= 'multi';
this.tbllmscampaigntaskssource.initGrid();
}
deletelmscampaigntasksAll()
{
this.tbllmscampaigntaskssource.settings['selectMode'] = 'single';
}
showlmscampaigntasksFilter()
{
  setTimeout(() => {
  this.SetlmscampaigntasksTableddConfig();
  });
      if(this.tbllmscampaigntaskssource.settings!=null)this.tbllmscampaigntaskssource.settings['hideSubHeader'] =!this.tbllmscampaigntaskssource.settings['hideSubHeader'];
this.tbllmscampaigntaskssource.initGrid();
}
showlmscampaigntasksInActive()
{
}
enablelmscampaigntasksInActive()
{
}
async SetlmscampaigntasksTableddConfig()
{
if(!this.bfilterPopulatelmscampaigntasks){

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntasksproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.datalmscampaigntasksproductid3.push(obj);
}
if((this.tbllmscampaigntaskssource.settings as any).columns['productid'])
{
(this.tbllmscampaigntaskssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscampaigntasksproductid3));
this.tbllmscampaigntaskssource.initGrid();
}
});

this.lmscampaignmasterservice.getlmscampaignmastersList().then(res=>
{
var datacampaignid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntaskscampaignid3.push(defaultobj);
for(let i=0; i<datacampaignid2.length; i++){
var obj= { value: datacampaignid2[i].campaignid, title:datacampaignid2[i].campaignname};
this.datalmscampaigntaskscampaignid3.push(obj);
}
if((this.tbllmscampaigntaskssource.settings as any).columns['campaignid'])
{
(this.tbllmscampaigntaskssource.settings as any).columns['campaignid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscampaigntaskscampaignid3));
this.tbllmscampaigntaskssource.initGrid();
}
});

this.configservice.getList("campaigntype").then(res=>
{
var datacampaigntype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntaskscampaigntype3.push(defaultobj);
for(let i=0; i<datacampaigntype2.length; i++){
var obj= { value: datacampaigntype2[i].configkey, title: datacampaigntype2[i].configtext};
this.datalmscampaigntaskscampaigntype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscampaigntaskssource.settings);
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskscampaigntype3)), }, };
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskscampaigntype3)), }, };
this.tbllmscampaigntaskssource.settings =  clone;
this.tbllmscampaigntaskssource.initGrid();
});

this.configservice.getList("targettype").then(res=>
{
var datatargettype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntaskstargettype3.push(defaultobj);
for(let i=0; i<datatargettype2.length; i++){
var obj= { value: datatargettype2[i].configkey, title: datatargettype2[i].configtext};
this.datalmscampaigntaskstargettype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscampaigntaskssource.settings);
if(clone.columns['targettype']!=undefined)clone.columns['targettype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskstargettype3)), }, };
if(clone.columns['targettype']!=undefined)clone.columns['targettype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskstargettype3)), }, };
this.tbllmscampaigntaskssource.settings =  clone;
this.tbllmscampaigntaskssource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntaskspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.datalmscampaigntaskspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscampaigntaskssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskspriority3)), }, };
this.tbllmscampaigntaskssource.settings =  clone;
this.tbllmscampaigntaskssource.initGrid();
});

this.configservice.getList("performancestatus").then(res=>
{
var dataperformancestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntasksperformancestatus3.push(defaultobj);
for(let i=0; i<dataperformancestatus2.length; i++){
var obj= { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext};
this.datalmscampaigntasksperformancestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscampaigntaskssource.settings);
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntasksperformancestatus3)), }, };
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntasksperformancestatus3)), }, };
this.tbllmscampaigntaskssource.settings =  clone;
this.tbllmscampaigntaskssource.initGrid();
});
}
this.bfilterPopulatelmscampaigntasks=true;
}
async lmscampaigntasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscampaigntasksTableConfig()
{
this.lmscampaigntaskssettings = {
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
var element= this.datalmscampaigntasksproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
campaigncode: {
title: 'Campaign Code',
type: '',
filter:true,
},
campaigntype: {
title: 'Campaign Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscampaigntaskscampaigntype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
targettype: {
title: 'Target Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscampaigntaskstargettype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
subject: {
title: 'Subject',
type: '',
filter:true,
},
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advantages: {
title: 'Advantages',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
disadvantages: {
title: 'Disadvantages',
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
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
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
targetdate: {
title: 'Target Date',
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscampaigntaskspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
dailytarget: {
title: 'Daily Target',
type: 'number',
filter:true,
},
actualachieved: {
title: 'Actual Achieved',
type: 'number',
filter:true,
},
estimatedcost: {
title: 'Estimated Cost',
type: 'number',
filter:true,
},
actualcost: {
title: 'Actual Cost',
type: 'number',
filter:true,
},
successpercentage: {
title: 'Success Percentage',
type: 'number',
filter:true,
},
performancestatus: {
title: 'Performance Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmscampaigntasksperformancestatus3.find(c=>c.value==cell);
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
lmscampaigntasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaigntasksID)>=0)
{
this.lmscampaigntaskssource=new LocalDataSource();
this.lmscampaigntaskssource.load(this.lmscampaignmasterservice.lmscampaigntasks as  any as LocalDataSource);
this.lmscampaigntaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscampaigntasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscampaignmasterservice.lmscampaigntasks.length == 0)
{
    this.tbllmscampaigntaskssource.grid.createFormShown = true;
}
else
{
    let obj = new lmscampaigntask();
    this.lmscampaignmasterservice.lmscampaigntasks.push(obj);
    this.lmscampaigntaskssource.refresh();
    if ((this.lmscampaignmasterservice.lmscampaigntasks.length / this.lmscampaigntaskssource.getPaging().perPage).toFixed(0) + 1 != this.lmscampaigntaskssource.getPaging().page)
    {
        this.lmscampaigntaskssource.setPage((this.lmscampaignmasterservice.lmscampaigntasks.length / this.lmscampaigntaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscampaigntaskssource.grid.edit(this.tbllmscampaigntaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmscampaigntaskssource.data.indexOf(event.data);
this.onDeletelmscampaigntask(event,event.data.taskid,((this.lmscampaigntaskssource.getPaging().page-1) *this.lmscampaigntaskssource.getPaging().perPage)+index);
this.lmscampaigntaskssource.refresh();
break;
}
}

*/
lmscampaigntasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmscampaigntask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmscampaigntask(event,event.data.taskid,this.formid);
break;
case 'delete':
this.onDeletelmscampaigntask(event,event.data.taskid,((this.lmscampaigntaskssource.getPaging().page-1) *this.lmscampaigntaskssource.getPaging().perPage)+event.index);
this.lmscampaigntaskssource.refresh();
break;
}
}
lmscampaigntasksonDelete(obj) {
let taskid=obj.data.taskid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscampaignmasterservice.deletelmscampaignmaster(taskid).then(res=>
this.lmscampaigntasksLoadTable()
);
}
}
lmscampaigntasksPaging(val)
{
debugger;
this.lmscampaigntaskssource.setPaging(1, val, true);
}

handlelmscampaigntasksGridSelected(event:any) {
this.lmscampaigntasksselectedindex=this.lmscampaignmasterservice.lmscampaigntasks.findIndex(i => i.taskid === event.data.taskid);
}
IslmscampaigntasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaigntasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscampaigntasks
//start of Grid Codes lmscampaignlocations
lmscampaignlocationssettings:any;
lmscampaignlocationssource: any;

showlmscampaignlocationsCheckbox()
{
debugger;
if(this.tbllmscampaignlocationssource.settings['selectMode']== 'multi')this.tbllmscampaignlocationssource.settings['selectMode']= 'single';
else
this.tbllmscampaignlocationssource.settings['selectMode']= 'multi';
this.tbllmscampaignlocationssource.initGrid();
}
deletelmscampaignlocationsAll()
{
this.tbllmscampaignlocationssource.settings['selectMode'] = 'single';
}
showlmscampaignlocationsFilter()
{
  setTimeout(() => {
  this.SetlmscampaignlocationsTableddConfig();
  });
      if(this.tbllmscampaignlocationssource.settings!=null)this.tbllmscampaignlocationssource.settings['hideSubHeader'] =!this.tbllmscampaignlocationssource.settings['hideSubHeader'];
this.tbllmscampaignlocationssource.initGrid();
}
showlmscampaignlocationsInActive()
{
}
enablelmscampaignlocationsInActive()
{
}
async SetlmscampaignlocationsTableddConfig()
{
if(!this.bfilterPopulatelmscampaignlocations){

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var datalocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaignlocationslocationid3.push(defaultobj);
for(let i=0; i<datalocationid2.length; i++){
var obj= { value: datalocationid2[i].locationid, title:datalocationid2[i].locationname};
this.datalmscampaignlocationslocationid3.push(obj);
}
if((this.tbllmscampaignlocationssource.settings as any).columns['locationid'])
{
(this.tbllmscampaignlocationssource.settings as any).columns['locationid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscampaignlocationslocationid3));
this.tbllmscampaignlocationssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataresponsibilityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaignlocationsresponsibilityid3.push(defaultobj);
for(let i=0; i<dataresponsibilityid2.length; i++){
var obj= { value: dataresponsibilityid2[i].userid, title:dataresponsibilityid2[i].username};
this.datalmscampaignlocationsresponsibilityid3.push(obj);
}
if((this.tbllmscampaignlocationssource.settings as any).columns['responsibilityid'])
{
(this.tbllmscampaignlocationssource.settings as any).columns['responsibilityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmscampaignlocationsresponsibilityid3));
this.tbllmscampaignlocationssource.initGrid();
}
});
}
this.bfilterPopulatelmscampaignlocations=true;
}
async lmscampaignlocationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscampaignlocationsTableConfig()
{
this.lmscampaignlocationssettings = {
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
locationname: {
title: 'Location Name',
type: '',
filter:true,
},
responsibilityid: {
title: 'Responsibility',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmscampaignlocationsresponsibilityid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
validfrom: {
title: 'Valid From',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
validto: {
title: 'Valid To',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
lmscampaignlocationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaignlocationsID)>=0)
{
this.lmscampaignlocationssource=new LocalDataSource();
this.lmscampaignlocationssource.load(this.lmscampaignmasterservice.lmscampaignlocations as  any as LocalDataSource);
this.lmscampaignlocationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscampaignlocationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscampaignmasterservice.lmscampaignlocations.length == 0)
{
    this.tbllmscampaignlocationssource.grid.createFormShown = true;
}
else
{
    let obj = new lmscampaignlocation();
    this.lmscampaignmasterservice.lmscampaignlocations.push(obj);
    this.lmscampaignlocationssource.refresh();
    if ((this.lmscampaignmasterservice.lmscampaignlocations.length / this.lmscampaignlocationssource.getPaging().perPage).toFixed(0) + 1 != this.lmscampaignlocationssource.getPaging().page)
    {
        this.lmscampaignlocationssource.setPage((this.lmscampaignmasterservice.lmscampaignlocations.length / this.lmscampaignlocationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscampaignlocationssource.grid.edit(this.tbllmscampaignlocationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmscampaignlocationssource.data.indexOf(event.data);
this.onDeletelmscampaignlocation(event,event.data.locationid,((this.lmscampaignlocationssource.getPaging().page-1) *this.lmscampaignlocationssource.getPaging().perPage)+index);
this.lmscampaignlocationssource.refresh();
break;
}
}

*/
lmscampaignlocationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmscampaignlocation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmscampaignlocation(event,event.data.locationid,this.formid);
break;
case 'delete':
this.onDeletelmscampaignlocation(event,event.data.locationid,((this.lmscampaignlocationssource.getPaging().page-1) *this.lmscampaignlocationssource.getPaging().perPage)+event.index);
this.lmscampaignlocationssource.refresh();
break;
}
}
lmscampaignlocationsonDelete(obj) {
let locationid=obj.data.locationid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscampaignmasterservice.deletelmscampaignmaster(locationid).then(res=>
this.lmscampaignlocationsLoadTable()
);
}
}
lmscampaignlocationsPaging(val)
{
debugger;
this.lmscampaignlocationssource.setPaging(1, val, true);
}

handlelmscampaignlocationsGridSelected(event:any) {
this.lmscampaignlocationsselectedindex=this.lmscampaignmasterservice.lmscampaignlocations.findIndex(i => i.locationid === event.data.locationid);
}
IslmscampaignlocationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaignlocationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscampaignlocations
//start of Grid Codes lmscampaignnoaccesses
onCustomlmscampaignnoaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bobranchmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
lmscampaignnoaccessessettings:any;
lmscampaignnoaccessessource: any;

showlmscampaignnoaccessesCheckbox()
{
debugger;
if(this.tbllmscampaignnoaccessessource.settings['selectMode']== 'multi')this.tbllmscampaignnoaccessessource.settings['selectMode']= 'single';
else
this.tbllmscampaignnoaccessessource.settings['selectMode']= 'multi';
this.tbllmscampaignnoaccessessource.initGrid();
}
deletelmscampaignnoaccessesAll()
{
this.tbllmscampaignnoaccessessource.settings['selectMode'] = 'single';
}
showlmscampaignnoaccessesFilter()
{
  setTimeout(() => {
  this.SetlmscampaignnoaccessesTableddConfig();
  });
      if(this.tbllmscampaignnoaccessessource.settings!=null)this.tbllmscampaignnoaccessessource.settings['hideSubHeader'] =!this.tbllmscampaignnoaccessessource.settings['hideSubHeader'];
this.tbllmscampaignnoaccessessource.initGrid();
}
showlmscampaignnoaccessesInActive()
{
}
enablelmscampaignnoaccessesInActive()
{
}
async SetlmscampaignnoaccessesTableddConfig()
{
if(!this.bfilterPopulatelmscampaignnoaccesses){
}
this.bfilterPopulatelmscampaignnoaccesses=true;
}
async lmscampaignnoaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscampaignnoaccessesTableConfig()
{
this.lmscampaignnoaccessessettings = {
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
accessid: {
title: 'Access',
type: '',
},
branchid: {
title: 'Branch',
type: '',
},
},
};
}
lmscampaignnoaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccessesID)>=0)
{
this.lmscampaignnoaccessessource=new LocalDataSource();
this.lmscampaignnoaccessessource.load(this.lmscampaignmasterservice.lmscampaignnoaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllmscampaignnoaccessessource!=null)
{this.tbllmscampaignnoaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.lmscampaignmasterservice.Insertlmscampaignnoaccesses.push(row.data);
this.tbllmscampaignnoaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
lmscampaignnoaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscampaignmasterservice.lmscampaignnoaccesses.length == 0)
{
    this.tbllmscampaignnoaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new lmscampaignnoaccess();
    this.lmscampaignmasterservice.lmscampaignnoaccesses.push(obj);
    this.lmscampaignnoaccessessource.refresh();
    if ((this.lmscampaignmasterservice.lmscampaignnoaccesses.length / this.lmscampaignnoaccessessource.getPaging().perPage).toFixed(0) + 1 != this.lmscampaignnoaccessessource.getPaging().page)
    {
        this.lmscampaignnoaccessessource.setPage((this.lmscampaignmasterservice.lmscampaignnoaccesses.length / this.lmscampaignnoaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscampaignnoaccessessource.grid.edit(this.tbllmscampaignnoaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmscampaignnoaccessessource.data.indexOf(event.data);
this.onDeletelmscampaignnoaccess(event,event.data.accessid,((this.lmscampaignnoaccessessource.getPaging().page-1) *this.lmscampaignnoaccessessource.getPaging().perPage)+index);
this.lmscampaignnoaccessessource.refresh();
break;
}
}

*/
lmscampaignnoaccessesPaging(val)
{
debugger;
this.lmscampaignnoaccessessource.setPaging(1, val, true);
}

handlelmscampaignnoaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={campaignid:this.formid,branchid:event.data.branchid}
this.lmscampaignmasterservice.Insertlmscampaignnoaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedlmscampaignnoaccessIDs.split(',');

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
if(event.data.accessid!=null && event.data.accessid!="")this.DeletedlmscampaignnoaccessIDs += event.data.accessid + ","; 
}
}
IslmscampaignnoaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscampaignnoaccesses
//start of Grid Codes lmsposts
lmspostssettings:any;
lmspostssource: any;

showlmspostsCheckbox()
{
debugger;
if(this.tbllmspostssource.settings['selectMode']== 'multi')this.tbllmspostssource.settings['selectMode']= 'single';
else
this.tbllmspostssource.settings['selectMode']= 'multi';
this.tbllmspostssource.initGrid();
}
deletelmspostsAll()
{
this.tbllmspostssource.settings['selectMode'] = 'single';
}
showlmspostsFilter()
{
  setTimeout(() => {
  this.SetlmspostsTableddConfig();
  });
      if(this.tbllmspostssource.settings!=null)this.tbllmspostssource.settings['hideSubHeader'] =!this.tbllmspostssource.settings['hideSubHeader'];
this.tbllmspostssource.initGrid();
}
showlmspostsInActive()
{
}
enablelmspostsInActive()
{
}
async SetlmspostsTableddConfig()
{
if(!this.bfilterPopulatelmsposts){

this.bousermasterservice.getbousermastersList().then(res=>
{
var datauserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmspostsuserid3.push(defaultobj);
for(let i=0; i<datauserid2.length; i++){
var obj= { value: datauserid2[i].userid, title:datauserid2[i].username};
this.datalmspostsuserid3.push(obj);
}
if((this.tbllmspostssource.settings as any).columns['userid'])
{
(this.tbllmspostssource.settings as any).columns['userid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmspostsuserid3));
this.tbllmspostssource.initGrid();
}
});

this.configservice.getList("campaigntype").then(res=>
{
var datacampaigntype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmspostscampaigntype3.push(defaultobj);
for(let i=0; i<datacampaigntype2.length; i++){
var obj= { value: datacampaigntype2[i].configkey, title: datacampaigntype2[i].configtext};
this.datalmspostscampaigntype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmspostssource.settings);
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmspostscampaigntype3)), }, };
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmspostscampaigntype3)), }, };
this.tbllmspostssource.settings =  clone;
this.tbllmspostssource.initGrid();
});

this.configservice.getList("campaignstatus").then(res=>
{
var datacampaignstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmspostscampaignstatus3.push(defaultobj);
for(let i=0; i<datacampaignstatus2.length; i++){
var obj= { value: datacampaignstatus2[i].configkey, title: datacampaignstatus2[i].configtext};
this.datalmspostscampaignstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmspostssource.settings);
if(clone.columns['campaignstatus']!=undefined)clone.columns['campaignstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmspostscampaignstatus3)), }, };
if(clone.columns['campaignstatus']!=undefined)clone.columns['campaignstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmspostscampaignstatus3)), }, };
this.tbllmspostssource.settings =  clone;
this.tbllmspostssource.initGrid();
});
}
this.bfilterPopulatelmsposts=true;
}
async lmspostsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmspostsTableConfig()
{
this.lmspostssettings = {
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
userid: {
title: 'User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmspostsuserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
senderemail: {
title: 'Sender Email',
type: '',
filter:true,
},
scheduledate: {
title: 'Schedule Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
scheduletime: {
title: 'Schedule Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
contenttext: {
title: 'Content Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
recipientgroup: {
title: 'Recipient Group',
type: '',
filter:true,
},
testgroup: {
title: 'Test Group',
type: '',
filter:true,
},
sendunsubscribelink: {
title: 'Send Unsubscribe Link',
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
lmspostsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmspostsID)>=0)
{
this.lmspostssource=new LocalDataSource();
this.lmspostssource.load(this.lmscampaignmasterservice.lmsposts as  any as LocalDataSource);
this.lmspostssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmspostsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscampaignmasterservice.lmsposts.length == 0)
{
    this.tbllmspostssource.grid.createFormShown = true;
}
else
{
    let obj = new lmspost();
    this.lmscampaignmasterservice.lmsposts.push(obj);
    this.lmspostssource.refresh();
    if ((this.lmscampaignmasterservice.lmsposts.length / this.lmspostssource.getPaging().perPage).toFixed(0) + 1 != this.lmspostssource.getPaging().page)
    {
        this.lmspostssource.setPage((this.lmscampaignmasterservice.lmsposts.length / this.lmspostssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmspostssource.grid.edit(this.tbllmspostssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmspostssource.data.indexOf(event.data);
this.onDeletelmspost(event,event.data.postid,((this.lmspostssource.getPaging().page-1) *this.lmspostssource.getPaging().perPage)+index);
this.lmspostssource.refresh();
break;
}
}

*/
lmspostsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmspost(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmspost(event,event.data.postid,this.formid);
break;
case 'delete':
this.onDeletelmspost(event,event.data.postid,((this.lmspostssource.getPaging().page-1) *this.lmspostssource.getPaging().perPage)+event.index);
this.lmspostssource.refresh();
break;
}
}
lmspostsonDelete(obj) {
let postid=obj.data.postid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscampaignmasterservice.deletelmscampaignmaster(postid).then(res=>
this.lmspostsLoadTable()
);
}
}
lmspostsPaging(val)
{
debugger;
this.lmspostssource.setPaging(1, val, true);
}

handlelmspostsGridSelected(event:any) {
this.lmspostsselectedindex=this.lmscampaignmasterservice.lmsposts.findIndex(i => i.postid === event.data.postid);
}
IslmspostsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmspostsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsposts

}



