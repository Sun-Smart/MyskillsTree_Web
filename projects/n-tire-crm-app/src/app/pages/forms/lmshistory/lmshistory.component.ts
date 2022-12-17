import { lmshistoryService } from './../../../service/lmshistory.service';
import { lmshistory } from './../../../model/lmshistory.model';
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
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { lmsmaster} from './../../../model/lmsmaster.model';
import { lmsmasterService } from './../../../service/lmsmaster.service';
//popups
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { lmscall} from './../../../model/lmscall.model';
import { lmscallService } from './../../../service/lmscall.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
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
selector: 'app-lmshistory',
templateUrl: './lmshistory.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmshistoryComponent implements OnInit {
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
bfilterPopulatelmshistories:boolean=false;
datalmshistoriesbranchid3:any=[];
datalmshistoriesbranchlocationid3:any=[];
datalmshistoriesleadid3:any=[];
datalmshistoriesopportunityid3:any=[];
datalmshistoriescallid3:any=[];
datalmshistoriesproductid3:any=[];
datalmshistoriescampaignid3:any=[];
datalmshistoriesleadby3:any=[];
datalmshistoriesleadresponse3:any=[];
datalmshistoriesnextaction3:any=[];
datalmshistoriesleadsource3:any=[];
datalmshistoriesleadstage3:any=[];
datalmshistoriescriticality3:any=[];
 lmshistoryForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
branchlocationidList: bobranchlocation[];
branchlocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchlocationid_bobranchlocationsForm: FormGroup;//autocomplete
branchlocationid_bobranchlocationsoptions:any;//autocomplete
branchlocationid_bobranchlocationsformatter:any;//autocomplete
leadidList: lmsmaster[];
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
callidList: lmscall[];
callidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
callid_lmscallsForm: FormGroup;//autocomplete
callid_lmscallsoptions:any;//autocomplete
callid_lmscallsformatter:any;//autocomplete
productidList: lmsproductmaster[];
campaignidList: lmsproductmaster[];
leadbyList: bousermaster[];
leadbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leadby_bousermastersForm: FormGroup;//autocomplete
leadby_bousermastersoptions:any;//autocomplete
leadby_bousermastersformatter:any;//autocomplete
leadresponseList: boconfigvalue[];
nextactionList: boconfigvalue[];
leadsourceList: boconfigvalue[];
leadstageList: boconfigvalue[];
criticalityList: boconfigvalue[];
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
lmshistoryshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmshistoryservice: lmshistoryService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bobranchlocationservice:bobranchlocationService,
private lmsmasterservice:lmsmasterService,
private lmsopportunityservice:lmsopportunityService,
private lmscallservice:lmscallService,
private lmsproductmasterservice:lmsproductmasterService,
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
this.lmshistoryForm  = this.fb.group({
pk:[null],
ImageName: [null],
historyid: [null],
branchid: [null],
branchiddesc: [null],
branchlocationid: [null],
branchlocationiddesc: [null],
leadid: [null],
leadiddesc: [null],
opportunityid: [null],
opportunityiddesc: [null],
callid: [null],
calliddesc: [null],
productid: [null],
productiddesc: [null],
campaignid: [null],
campaigniddesc: [null],
leadby: [null],
leadbydesc: [null],
currentowner: [null],
leadresponse: [null],
leadresponsedesc: [null],
nextcalldate: [null],
nextaction: [null],
nextactiondesc: [null],
actiondatetime: [null],
previousremarks: [null],
leadscore: [null],
leadsource: [null],
leadsourcedesc: [null],
leadstage: [null],
leadstagedesc: [null],
criticality: [null],
criticalitydesc: [null],
expectedvalue: [null],
attachment: [null],
customfield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmshistoryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmshistoryForm.dirty && this.lmshistoryForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.historyid && pkDetail) {
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
let lmshistoryid = null;

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
this.formid=lmshistoryid;
//this.sharedService.alert(lmshistoryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
this.branchidList = res as bobranchmaster[];
if(this.lmshistoryservice.formData && this.lmshistoryservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.lmshistoryForm.patchValue({
    branchid: this.lmshistoryservice.formData.branchid,
    branchiddesc: this.lmshistoryservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.lmshistoryForm.get('branchid').value);
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
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
if(this.lmshistoryservice.formData && this.lmshistoryservice.formData.branchlocationid){this.lmshistoryForm.patchValue({
    branchlocationid: this.lmshistoryservice.formData.branchlocationid,
    branchlocationiddesc: this.lmshistoryservice.formData.branchlocationiddesc,
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
this.lmsmasterservice.getlmsmastersList().then(res => 
{
this.leadidList = res as lmsmaster[];
}
).catch((err) => {console.log(err);});
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmshistoryservice.formData && this.lmshistoryservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmshistoryForm.patchValue({
    opportunityid: this.lmshistoryservice.formData.opportunityid,
    opportunityiddesc: this.lmshistoryservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmshistoryForm.get('opportunityid').value);
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
this.lmscallservice.getlmscallsList().then(res => 
{
this.callidList = res as lmscall[];
if(this.lmshistoryservice.formData && this.lmshistoryservice.formData.callid){
this.callidoptionsEvent.emit(this.callidList);
this.lmshistoryForm.patchValue({
    callid: this.lmshistoryservice.formData.callid,
    calliddesc: this.lmshistoryservice.formData.calliddesc,
});
}
{
let arrcallid = this.callidList.filter(v => v.callid == this.lmshistoryForm.get('callid').value);
let objcallid;
if (arrcallid.length > 0) objcallid = arrcallid[0];
if (objcallid)
{
}
}
}
).catch((err) => {console.log(err);});
this.callid_lmscallsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.callidList.filter(v => v.agenda.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.callid_lmscallsformatter = (result: any) => result.agenda;
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.campaignidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.leadbyList = res as bousermaster[];
if(this.lmshistoryservice.formData && this.lmshistoryservice.formData.leadby){
this.leadbyoptionsEvent.emit(this.leadbyList);
this.lmshistoryForm.patchValue({
    leadby: this.lmshistoryservice.formData.leadby,
    leadbydesc: this.lmshistoryservice.formData.leadbydesc,
});
}
{
let arrleadby = this.leadbyList.filter(v => v.userid == this.lmshistoryForm.get('leadby').value);
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
this.configservice.getList("leadresponse").then(res => this.leadresponseList = res as boconfigvalue[]);
this.configservice.getList("leadaction").then(res => this.nextactionList = res as boconfigvalue[]);
this.configservice.getList("leadsource").then(res => this.leadsourceList = res as boconfigvalue[]);
this.configservice.getList("leadstage").then(res => this.leadstageList = res as boconfigvalue[]);
this.configservice.getList("leadnature").then(res => this.criticalityList = res as boconfigvalue[]);

//autocomplete
    this.lmshistoryservice.getlmshistoriesList().then(res => {
      this.pkList = res as lmshistory[];
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
this.lmshistoryForm.markAsUntouched();
this.lmshistoryForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.lmshistoryForm.patchValue({
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
this.lmshistoryForm.patchValue({
branchlocationid: branchlocationidDetail.locationid,
branchlocationiddesc: branchlocationidDetail.locationname,

});

}
}

onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmshistoryForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedcallid(callidDetail: any) {
if (callidDetail.callid && callidDetail) {
this.lmshistoryForm.patchValue({
callid: callidDetail.callid,
calliddesc: callidDetail.agenda,

});

}
}

onSelectedleadby(leadbyDetail: any) {
if (leadbyDetail.userid && leadbyDetail) {
this.lmshistoryForm.patchValue({
leadby: leadbyDetail.userid,
leadbydesc: leadbyDetail.username,

});

}
}




resetForm() {
if (this.lmshistoryForm != null)
this.lmshistoryForm.reset();
this.lmshistoryForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
leadby: this.sessiondata.userid,
leadbydesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let historyid = this.lmshistoryForm.get('historyid').value;
        if(historyid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmshistoryservice.deletelmshistory(historyid).then(res =>
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
    this.lmshistoryForm.patchValue({
        historyid: null
    });
    if(this.lmshistoryservice.formData.historyid!=null)this.lmshistoryservice.formData.historyid=null;
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
        else if(key=="currentowner")
this.lmshistoryForm.patchValue({"currentowner":  mainscreendata[key] } );
        else if(key=="nextcalldate")
this.lmshistoryForm.patchValue({"nextcalldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actiondatetime")
this.lmshistoryForm.patchValue({"actiondatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmshistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmshistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmshistoryForm.controls[key]!=undefined)
{
this.lmshistoryForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmshistories",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
historyidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
branchlocationidonChange(evt:any){
let e=evt.value;
}
leadidonChange(evt:any){
let e=evt.value;
this.lmshistoryForm.patchValue({leadiddesc:evt.options[evt.options.selectedIndex].text});
}
opportunityidonChange(evt:any){
let e=evt.value;
}
callidonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
this.lmshistoryForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
campaignidonChange(evt:any){
let e=evt.value;
this.lmshistoryForm.patchValue({campaigniddesc:evt.options[evt.options.selectedIndex].text});
}
leadbyonChange(evt:any){
let e=evt.value;
}
currentowneronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrcurrentowner=res;
let objcurrentowner;
if (arrcurrentowner.length > 0) objcurrentowner = arrcurrentowner[0];
if (objcurrentowner)
{
}
}).catch((err) => {console.log(err);});
}
leadresponseonChange(evt:any){
let e=this.f.leadresponse.value as any;
this.lmshistoryForm.patchValue({leadresponsedesc:evt.options[evt.options.selectedIndex].text});
}
nextcalldateonChange(evt:any){
let e=evt.value;
}
nextactiononChange(evt:any){
let e=this.f.nextaction.value as any;
this.lmshistoryForm.patchValue({nextactiondesc:evt.options[evt.options.selectedIndex].text});
}
actiondatetimeonChange(evt:any){
let e=evt.value;
}
previousremarksonChange(evt:any){
let e=evt.value;
}
leadscoreonChange(evt:any){
let e=evt.value;
}
leadsourceonChange(evt:any){
let e=this.f.leadsource.value as any;
this.lmshistoryForm.patchValue({leadsourcedesc:evt.options[evt.options.selectedIndex].text});
}
leadstageonChange(evt:any){
let e=this.f.leadstage.value as any;
this.lmshistoryForm.patchValue({leadstagedesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.lmshistoryForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
expectedvalueonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
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
  


editlmshistories() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmshistoryservice.getlmshistoriesByEID(pkcol).then(res => {

this.lmshistoryservice.formData=res.lmshistory;
let formproperty=res.lmshistory.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmshistory.pkcol;
this.formid=res.lmshistory.historyid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmshistory.historyid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmshistoryForm.patchValue({
historyid: res.lmshistory.historyid,
branchid: res.lmshistory.branchid,
branchiddesc: res.lmshistory.branchiddesc,
branchlocationid: res.lmshistory.branchlocationid,
branchlocationiddesc: res.lmshistory.branchlocationiddesc,
leadid: res.lmshistory.leadid,
leadiddesc: res.lmshistory.leadiddesc,
opportunityid: res.lmshistory.opportunityid,
opportunityiddesc: res.lmshistory.opportunityiddesc,
callid: res.lmshistory.callid,
calliddesc: res.lmshistory.calliddesc,
productid: res.lmshistory.productid,
productiddesc: res.lmshistory.productiddesc,
campaignid: res.lmshistory.campaignid,
campaigniddesc: res.lmshistory.campaigniddesc,
leadby: res.lmshistory.leadby,
leadbydesc: res.lmshistory.leadbydesc,
currentowner: JSON.parse(res.lmshistory.currentowner),
leadresponse: res.lmshistory.leadresponse,
leadresponsedesc: res.lmshistory.leadresponsedesc,
nextcalldate: this.ngbDateParserFormatter.parse(res.lmshistory.nextcalldate),
nextaction: res.lmshistory.nextaction,
nextactiondesc: res.lmshistory.nextactiondesc,
actiondatetime: this.ngbDateParserFormatter.parse(res.lmshistory.actiondatetime),
previousremarks: res.lmshistory.previousremarks,
leadscore: res.lmshistory.leadscore,
leadsource: res.lmshistory.leadsource,
leadsourcedesc: res.lmshistory.leadsourcedesc,
leadstage: res.lmshistory.leadstage,
leadstagedesc: res.lmshistory.leadstagedesc,
criticality: res.lmshistory.criticality,
criticalitydesc: res.lmshistory.criticalitydesc,
expectedvalue: res.lmshistory.expectedvalue,
attachment: JSON.parse(res.lmshistory.attachment),
customfield: res.lmshistory.customfield,
status: res.lmshistory.status,
statusdesc: res.lmshistory.statusdesc,
});
if(this.lmshistoryForm.get('customfield').value!=null && this.lmshistoryForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmshistoryForm.get('customfield').value);
this.FillCustomField();
if(this.lmshistoryForm.get('attachment').value!=null && this.lmshistoryForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmshistoryForm.get('attachment').value);
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.branchlocationidList = res as bobranchlocation[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
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
  for (let key in this.lmshistoryForm.controls) {
    if (this.lmshistoryForm.controls[key] != null) {
if(false)
{
if(this.lmshistoryservice.formData!=null && this.lmshistoryservice.formData[key]!=null  && this.lmshistoryservice.formData[key]!='[]' && this.lmshistoryservice.formData[key]!=undefined && this.lmshistoryservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmshistoryservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmshistoryservice.formData!=null && this.lmshistoryservice.formData[key]!=null   && this.lmshistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmshistoryservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmshistoryservice.formData!=null && this.lmshistoryservice.formData[key]!=null   && this.lmshistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmshistoryservice.formData[key]+"'><div class='progress__number'>"+this.lmshistoryservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmshistoryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmshistoryForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmshistoryForm.value;
obj.currentowner=JSON.stringify(this.lmshistoryForm.get('currentowner').value);
obj.nextcalldate=new Date(this.lmshistoryForm.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistoryForm.get('nextcalldate').value)+'  UTC' :null);
obj.actiondatetime=new Date(this.lmshistoryForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistoryForm.get('actiondatetime').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private lmshistorytoggleOption(){
this.lmshistoryshowOption = this.lmshistoryshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmshistoryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmshistoryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmshistoryForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmshistoryservice.formData=this.lmshistoryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmshistoryForm.controls[key] != null)
    {
        this.lmshistoryservice.formData[key] = this.lmshistoryForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmshistoryservice.formData.currentowner=JSON.stringify(this.lmshistoryForm.get('currentowner').value);
this.lmshistoryservice.formData.nextcalldate=new Date(this.lmshistoryForm.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistoryForm.get('nextcalldate').value)+'  UTC' :null);
this.lmshistoryservice.formData.actiondatetime=new Date(this.lmshistoryForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistoryForm.get('actiondatetime').value)+'  UTC' :null);
this.lmshistoryservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmshistoryservice.formData.customfield=JSON.stringify(customfields);
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmshistoryservice.formData);
this.lmshistoryservice.formData=this.lmshistoryForm.value;
this.lmshistoryservice.saveOrUpdatelmshistories().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmshistory);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmshistoryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmshistory);
}
else
{
this.FillData(res);
}
}
this.lmshistoryForm.markAsUntouched();
this.lmshistoryForm.markAsPristine();
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
data: {branchid:this.lmshistoryForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.lmshistoryForm.get('branchlocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadid( leadid) {
/*let ScreenType='2';
this.dialog.open(lmsmasterComponent, 
{
data: {leadid:this.lmshistoryForm.get('leadid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmshistoryForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcallid( callid) {
/*let ScreenType='2';
this.dialog.open(lmscallComponent, 
{
data: {callid:this.lmshistoryForm.get('callid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmshistoryForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmshistoryForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleadby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmshistoryForm.get('leadby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



