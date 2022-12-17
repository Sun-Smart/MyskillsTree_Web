import { camsworkorderService } from './../../../service/camsworkorder.service';
import { camsworkorder } from './../../../model/camsworkorder.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bobranchsublocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchsublocation.model';
import { bobranchsublocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component';
import { bobranchsublocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchsublocation.service';
//popups
import { erpsuppliermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { camspmschedule} from './../../../model/camspmschedule.model';
import { camspmscheduleComponent } from './../../../pages/forms/camspmschedule/camspmschedule.component';
import { camspmscheduleService } from './../../../service/camspmschedule.service';
//popups
import { camspmscheduletask} from './../../../model/camspmscheduletask.model';
import { camspmscheduletaskComponent } from './../../../pages/forms/camspmscheduletask/camspmscheduletask.component';
import { camspmscheduletaskService } from './../../../service/camspmscheduletask.service';
//popups
//detail table services
import { camsworkdetail } from './../../../model/camsworkdetail.model';
import { camsworkdetailComponent } from './../../../pages/forms/camsworkdetail/camsworkdetail.component';
//FK services
import { camspmtask,IcamspmtaskResponse } from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
import { camspmmaster,IcamspmmasterResponse } from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
import { camsmisccost } from './../../../model/camsmisccost.model';
import { camsmisccostComponent } from './../../../pages/forms/camsmisccost/camsmisccost.component';
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
selector: 'app-camsworkorder',
templateUrl: './camsworkorder.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkorderComponent implements OnInit {
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
bfilterPopulatecamsworkorders:boolean=false;
datacamsworkordersrequesttype3:any=[];
datacamsworkordersworktype3:any=[];
datacamsworkordersrequestorid3:any=[];
datacamsworkordersassetid3:any=[];
datacamsworkordersassetstatus3:any=[];
datacamsworkorderslocationid3:any=[];
datacamsworkorderssublocationid3:any=[];
datacamsworkordersreportedby3:any=[];
datacamsworkorderspriority3:any=[];
datacamsworkorderscriticality3:any=[];
datacamsworkordersworkpersontype3:any=[];
datacamsworkorderssupplierid3:any=[];
datacamsworkordersorderstatus3:any=[];
datacamsworkordersproblem3:any=[];
datacamsworkordersrootcause3:any=[];
datacamsworkorderssolution3:any=[];
datacamsworkordersexpenseid3:any=[];
datacamsworkordersscheduleid3:any=[];
datacamsworkordersscheduletaskid3:any=[];
datacamsworkdetailspmtaskid3:any=[];
datacamsworkdetailstasktype3:any=[];
datacamsworkdetailsworkstatus3:any=[];
datacamsworkdetailsuserid3:any=[];
datacamsworkdetailsworkorderid3:any=[];
datacamsworkdetailspmid3:any=[];
datacamsworkdetailslostrate3:any=[];
bfilterPopulatecamsworkdetails:boolean=false;
datacamsmisccostscosttype3:any=[];
datacamsmisccostsapprovalstatus3:any=[];
datacamsmisccostsworkorderid3:any=[];
bfilterPopulatecamsmisccosts:boolean=false;
@ViewChild('tblcamsworkdetailssource',{static:false}) tblcamsworkdetailssource: Ng2SmartTableComponent;
@ViewChild('tblcamsmisccostssource',{static:false}) tblcamsmisccostssource: Ng2SmartTableComponent;
 camsworkorderForm: FormGroup;
requesttypeList: boconfigvalue[];
worktypeList: boconfigvalue[];
requestoridList: bousermaster[];
requestoridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestorid_bousermastersForm: FormGroup;//autocomplete
requestorid_bousermastersoptions:any;//autocomplete
requestorid_bousermastersformatter:any;//autocomplete
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
assetstatusList: boconfigvalue[];
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
sublocationidList: bobranchsublocation[];
reportedbyList: bousermaster[];
reportedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
reportedby_bousermastersForm: FormGroup;//autocomplete
reportedby_bousermastersoptions:any;//autocomplete
reportedby_bousermastersformatter:any;//autocomplete
priorityList: boconfigvalue[];
criticalityList: boconfigvalue[];
workpersontypeList: boconfigvalue[];
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
orderstatusList: boconfigvalue[];
problemList: boconfigvalue[];
rootcauseList: boconfigvalue[];
solutionList: boconfigvalue[];
expenseidList: bomasterdata[];
scheduleidList: camspmschedule[];
scheduleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
scheduleid_camspmschedulesForm: FormGroup;//autocomplete
scheduleid_camspmschedulesoptions:any;//autocomplete
scheduleid_camspmschedulesformatter:any;//autocomplete
scheduletaskidList: camspmscheduletask[];
scheduletaskidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
scheduletaskid_camspmscheduletasksForm: FormGroup;//autocomplete
scheduletaskid_camspmscheduletasksoptions:any;//autocomplete
scheduletaskid_camspmscheduletasksformatter:any;//autocomplete
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
camsworkordershowOption:boolean;
camsworkdetailshowOption:boolean;
camsmisccostshowOption:boolean;
sessiondata:any;
sourcekey:any;

reportedbyvisible:boolean = false;
requestidvisible:boolean = false;
breakdownreportedvisible:boolean = false;
repairstartedvisible:boolean = false;
breakdowndatevisible:boolean = false;
repaircompletedvisible:boolean = false;


camsworkdetailsvisiblelist:any;
camsworkdetailshidelist:any;
camsmisccostsvisiblelist:any;
camsmisccostshidelist:any;

DeletedcamsworkdetailIDs: string="";
camsworkdetailsID: string = "1";
camsworkdetailsselectedindex:any;
DeletedcamsmisccostIDs: string="";
camsmisccostsID: string = "2";
camsmisccostsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsworkorderservice: camsworkorderService,
private bousermasterservice: bousermasterService,
private camspmtaskservice: camspmtaskService,
private camspmmasterservice: camspmmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsassetmasterservice:camsassetmasterService,
private bobranchlocationservice:bobranchlocationService,
private bobranchsublocationservice:bobranchsublocationService,
private erpsuppliermasterservice:erpsuppliermasterService,
private bomasterdataservice:bomasterdataService,
private camspmscheduleservice:camspmscheduleService,
private camspmscheduletaskservice:camspmscheduletaskService,
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
this.camsworkorderForm  = this.fb.group({
pk:[null],
ImageName: [null],
workorderid: [null],
requesttype: [null, Validators.required],
requesttypedesc: [null],
requestid: [null],
requestreference: [null],
requestdate: [null, Validators.required],
worktype: [null, Validators.required],
worktypedesc: [null],
requestorid: [null],
requestoriddesc: [null],
assetid: [null, Validators.required],
assetiddesc: [null],
assetstatus: [null],
assetstatusdesc: [null],
locationid: [null],
locationiddesc: [null],
sublocationid: [null],
sublocationiddesc: [null],
details: [null, Validators.required],
breakdowndate: [null],
breakdownreported: [null],
reportedby: [null],
reportedbydesc: [null],
repairstarted: [null],
repaircompleted: [null],
online: [null],
priority: [null],
prioritydesc: [null],
criticality: [null],
criticalitydesc: [null],
requireddate: [null],
requestremarks: [null],
assetnotes: [null],
workpersontype: [null],
workpersontypedesc: [null],
estimatedworkhrs: [null],
actualworkhrs: [null],
supplierid: [null],
supplieriddesc: [null],
suppliername: [null],
expirydate: [null],
assignto: [null],
username: [null],
telephone: [null],
mobile: [null],
email: [null],
startdate: [null],
enddate: [null],
worknotes: [null],
query: [null],
orderstatus: [null],
orderstatusdesc: [null],
completionnotes: [null],
problem: [null],
problemdesc: [null],
rootcause: [null],
rootcausedesc: [null],
solution: [null],
solutiondesc: [null],
problemdetail: [null],
rootcausedetail: [null],
solutiondetail: [null],
expenseid: [null],
expenseiddesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
scheduleid: [null],
scheduleiddesc: [null],
scheduletaskid: [null],
scheduletaskiddesc: [null],
});
}

get f() { return this.camsworkorderForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkorderForm.dirty && this.camsworkorderForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workorderid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workorderid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workorderid && pkDetail) {
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
let camsworkorderid = null;

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
this.formid=camsworkorderid;
//this.sharedService.alert(camsworkorderid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamsworkdetailsTableConfig();
  setTimeout(() => {
  this.SetcamsworkdetailsTableddConfig();
  });

this.SetcamsmisccostsTableConfig();
  setTimeout(() => {
  this.SetcamsmisccostsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("requesttype").then(res => this.requesttypeList = res as boconfigvalue[]);
this.configservice.getList("pmworktype").then(res => this.worktypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestoridList = res as bousermaster[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.requestorid){
this.requestoridoptionsEvent.emit(this.requestoridList);
this.camsworkorderForm.patchValue({
    requestorid: this.camsworkorderservice.formData.requestorid,
    requestoriddesc: this.camsworkorderservice.formData.requestoriddesc,
});
}
{
let arrrequestorid = this.requestoridList.filter(v => v.userid == this.camsworkorderForm.get('requestorid').value);
let objrequestorid;
if (arrrequestorid.length > 0) objrequestorid = arrrequestorid[0];
if (objrequestorid)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestorid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestoridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestorid_bousermastersformatter = (result: any) => result.username;
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsworkorderForm.patchValue({
    assetid: this.camsworkorderservice.formData.assetid,
    assetiddesc: this.camsworkorderservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsworkorderForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assetid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetid_camsassetmastersformatter = (result: any) => result.description;
this.configservice.getList("assetstatus").then(res => this.assetstatusList = res as boconfigvalue[]);
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.camsworkorderForm.patchValue({
    locationid: this.camsworkorderservice.formData.locationid,
    locationiddesc: this.camsworkorderservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.camsworkorderForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
setTimeout(() => {
if(this.f.locationid.value && this.f.locationid.value!="" && this.f.locationid.value!=null)this.bobranchsublocationservice.getListBylocationid(this.f.locationid.value).then(res =>{
this.sublocationidList = res as bobranchsublocation[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.sublocationid){this.camsworkorderForm.patchValue({
    sublocationid: this.camsworkorderservice.formData.sublocationid,
    sublocationiddesc: this.camsworkorderservice.formData.sublocationiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.reportedbyList = res as bousermaster[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.reportedby){
this.reportedbyoptionsEvent.emit(this.reportedbyList);
this.camsworkorderForm.patchValue({
    reportedby: this.camsworkorderservice.formData.reportedby,
    reportedbydesc: this.camsworkorderservice.formData.reportedbydesc,
});
}
{
let arrreportedby = this.reportedbyList.filter(v => v.userid == this.camsworkorderForm.get('reportedby').value);
let objreportedby;
if (arrreportedby.length > 0) objreportedby = arrreportedby[0];
if (objreportedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.reportedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.reportedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reportedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("workpersontype").then(res => this.workpersontypeList = res as boconfigvalue[]);
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.camsworkorderForm.patchValue({
    supplierid: this.camsworkorderservice.formData.supplierid,
    supplieriddesc: this.camsworkorderservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.camsworkorderForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.configservice.getList("camsorderstatus").then(res => this.orderstatusList = res as boconfigvalue[]);
this.configservice.getList("camsproblem").then(res => this.problemList = res as boconfigvalue[]);
this.configservice.getList("rootcause").then(res => this.rootcauseList = res as boconfigvalue[]);
this.configservice.getList("solution").then(res => this.solutionList = res as boconfigvalue[]);
this.bomasterdataservice.getList("khsgr").then(res => {
this.expenseidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.camspmscheduleservice.getcamspmschedulesList().then(res => 
{
this.scheduleidList = res as camspmschedule[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.scheduleid){
this.scheduleidoptionsEvent.emit(this.scheduleidList);
this.camsworkorderForm.patchValue({
    scheduleid: this.camsworkorderservice.formData.scheduleid,
    scheduleiddesc: this.camsworkorderservice.formData.scheduleiddesc,
});
}
{
let arrscheduleid = this.scheduleidList.filter(v => v.scheduleid == this.camsworkorderForm.get('scheduleid').value);
let objscheduleid;
if (arrscheduleid.length > 0) objscheduleid = arrscheduleid[0];
if (objscheduleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.scheduleid_camspmschedulesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.scheduleidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.scheduleid_camspmschedulesformatter = (result: any) => result.description;
this.camspmscheduletaskservice.getcamspmscheduletasksList().then(res => 
{
this.scheduletaskidList = res as camspmscheduletask[];
if(this.camsworkorderservice.formData && this.camsworkorderservice.formData.scheduletaskid){
this.scheduletaskidoptionsEvent.emit(this.scheduletaskidList);
this.camsworkorderForm.patchValue({
    scheduletaskid: this.camsworkorderservice.formData.scheduletaskid,
    scheduletaskiddesc: this.camsworkorderservice.formData.scheduletaskiddesc,
});
}
{
let arrscheduletaskid = this.scheduletaskidList.filter(v => v.scheduletaskid == this.camsworkorderForm.get('scheduletaskid').value);
let objscheduletaskid;
if (arrscheduletaskid.length > 0) objscheduletaskid = arrscheduletaskid[0];
if (objscheduletaskid)
{
}
}
}
).catch((err) => {console.log(err);});
this.scheduletaskid_camspmscheduletasksoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.scheduletaskidList.filter(v => v.taskdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.scheduletaskid_camspmscheduletasksformatter = (result: any) => result.taskdescription;

//autocomplete
    this.camsworkorderservice.getcamsworkordersList().then(res => {
      this.pkList = res as camsworkorder[];
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
this.camsworkorderForm.markAsUntouched();
this.camsworkorderForm.markAsPristine();
}
onSelectedrequestorid(requestoridDetail: any) {
if (requestoridDetail.userid && requestoridDetail) {
this.camsworkorderForm.patchValue({
requestorid: requestoridDetail.userid,
requestoriddesc: requestoridDetail.username,

});

}
}

onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsworkorderForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.camsworkorderForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});
this.bobranchsublocationservice.getListBylocationid(locationidDetail.locationid).then(res => {
 this.sublocationidList = res as bobranchsublocation[]
}).catch((err) => {console.log(err);});

}
}

onSelectedreportedby(reportedbyDetail: any) {
if (reportedbyDetail.userid && reportedbyDetail) {
this.camsworkorderForm.patchValue({
reportedby: reportedbyDetail.userid,
reportedbydesc: reportedbyDetail.username,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.camsworkorderForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedscheduleid(scheduleidDetail: any) {
if (scheduleidDetail.scheduleid && scheduleidDetail) {
this.camsworkorderForm.patchValue({
scheduleid: scheduleidDetail.scheduleid,
scheduleiddesc: scheduleidDetail.description,

});

}
}

onSelectedscheduletaskid(scheduletaskidDetail: any) {
if (scheduletaskidDetail.scheduletaskid && scheduletaskidDetail) {
this.camsworkorderForm.patchValue({
scheduletaskid: scheduletaskidDetail.scheduletaskid,
scheduletaskiddesc: scheduletaskidDetail.taskdescription,

});

}
}




resetForm() {
if (this.camsworkorderForm != null)
this.camsworkorderForm.reset();
this.camsworkorderForm.patchValue({
requestorid: this.sessiondata.userid,
requestoriddesc: this.sessiondata.username,
reportedby: this.sessiondata.userid,
reportedbydesc: this.sessiondata.username,
});
this.camsworkorderForm.patchValue({
requestdate: this.ngbDateParserFormatter.parse(new Date().toString()),
breakdowndate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
breakdownreported: this.ngbDateParserFormatter.parse(new Date().toISOString()),
repairstarted: this.ngbDateParserFormatter.parse(new Date().toISOString()),
repaircompleted: this.ngbDateParserFormatter.parse(new Date().toISOString()),
online: this.ngbDateParserFormatter.parse(new Date().toISOString()),
requireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
expirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.camsworkorderservice.camsworkdetails=[];
this.camsworkdetailsLoadTable();
this.camsworkorderservice.camsmisccosts=[];
this.camsmisccostsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.reportedbyvisible = false;
this.requestidvisible = false;
this.breakdownreportedvisible = false;
this.repairstartedvisible = false;
this.breakdowndatevisible = false;
this.repaircompletedvisible = false;
}

    onDelete() {
        let workorderid = this.camsworkorderForm.get('workorderid').value;
        if(workorderid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkorderservice.deletecamsworkorder(workorderid).then(res =>
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
    this.camsworkorderForm.patchValue({
        workorderid: null
    });
    if(this.camsworkorderservice.formData.workorderid!=null)this.camsworkorderservice.formData.workorderid=null;
for (let i=0;i<this.camsworkorderservice.camsworkdetails.length;i++) {
this.camsworkorderservice.camsworkdetails[i].workorderdetailid=null;
}
for (let i=0;i<this.camsworkorderservice.camsmisccosts.length;i++) {
this.camsworkorderservice.camsmisccosts[i].costid=null;
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
        else if(key=="requestdate")
this.camsworkorderForm.patchValue({"requestdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="breakdowndate")
this.camsworkorderForm.patchValue({"breakdowndate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="breakdownreported")
this.camsworkorderForm.patchValue({"breakdownreported":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="repairstarted")
this.camsworkorderForm.patchValue({"repairstarted":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="repaircompleted")
this.camsworkorderForm.patchValue({"repaircompleted":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="online")
this.camsworkorderForm.patchValue({"online":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requireddate")
this.camsworkorderForm.patchValue({"requireddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requestremarks")
this.camsworkorderForm.patchValue({"requestremarks":  mainscreendata[key] } );
        else if(key=="assetnotes")
this.camsworkorderForm.patchValue({"assetnotes":  mainscreendata[key] } );
        else if(key=="expirydate")
this.camsworkorderForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignto")
this.camsworkorderForm.patchValue({"assignto":  mainscreendata[key] } );
        else if(key=="startdate")
this.camsworkorderForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.camsworkorderForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="query")
this.camsworkorderForm.patchValue({"query":  mainscreendata[key] } );
        else if(key=="remarks")
this.camsworkorderForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsworkorderForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkorderForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkorderForm.controls[key]!=undefined)
{
this.camsworkorderForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsworkorders",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
workorderidonChange(evt:any){
let e=evt.value;
}
requesttypeonChange(evt:any){
let e=this.f.requesttype.value as any;
this.camsworkorderForm.patchValue({requesttypedesc:evt.options[evt.options.selectedIndex].text});
}
requestidonChange(evt:any){
let e=evt.value;
}
requestreferenceonChange(evt:any){
let e=evt.value;
}
requestdateonChange(evt:any){
let e=evt.value;
}
worktypeonChange(evt:any){
let e=this.f.worktype.value as any;
this.repaircompletedvisible=false;
if(this.f.worktype.value == 'B')this.repaircompletedvisible=true;
this.camsworkorderForm.patchValue({worktypedesc:evt.options[evt.options.selectedIndex].text});
}
requestoridonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
assetstatusonChange(evt:any){
let e=this.f.assetstatus.value as any;
this.camsworkorderForm.patchValue({assetstatusdesc:evt.options[evt.options.selectedIndex].text});
}
locationidonChange(evt:any){
let e=evt.value;
}
sublocationidonChange(evt:any){
let e=evt.value;
this.camsworkorderForm.patchValue({sublocationiddesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
breakdowndateonChange(evt:any){
let e=evt.value;
}
breakdownreportedonChange(evt:any){
let e=evt.value;
}
reportedbyonChange(evt:any){
let e=evt.value;
}
repairstartedonChange(evt:any){
let e=evt.value;
}
repaircompletedonChange(evt:any){
let e=evt.value;
}
onlineonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.camsworkorderForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.camsworkorderForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
requireddateonChange(evt:any){
let e=evt.value;
}
requestremarksonChange(evt:any){
let e=evt.value;
}
assetnotesonChange(evt:any){
let e=evt.value;
}
workpersontypeonChange(evt:any){
let e=this.f.workpersontype.value as any;
this.camsworkorderForm.patchValue({workpersontypedesc:evt.options[evt.options.selectedIndex].text});
}
estimatedworkhrsonChange(evt:any){
let e=evt.value;
}
actualworkhrsonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
suppliernameonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
assigntoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignto=res;
let objassignto;
if (arrassignto.length > 0) objassignto = arrassignto[0];
if (objassignto)
{
}
}).catch((err) => {console.log(err);});
}
usernameonChange(evt:any){
let e=evt.value;
}
telephoneonChange(evt:any){
let e=evt.value;
}
mobileonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
worknotesonChange(evt:any){
let e=evt.value;
}
queryonChange(evt:any){
let e=evt.value;
}
orderstatusonChange(evt:any){
let e=this.f.orderstatus.value as any;
this.camsworkorderForm.patchValue({orderstatusdesc:evt.options[evt.options.selectedIndex].text});
}
completionnotesonChange(evt:any){
let e=evt.value;
}
problemonChange(evt:any){
let e=this.f.problem.value as any;
this.camsworkorderForm.patchValue({problemdesc:evt.options[evt.options.selectedIndex].text});
}
rootcauseonChange(evt:any){
let e=this.f.rootcause.value as any;
this.camsworkorderForm.patchValue({rootcausedesc:evt.options[evt.options.selectedIndex].text});
}
solutiononChange(evt:any){
let e=this.f.solution.value as any;
this.camsworkorderForm.patchValue({solutiondesc:evt.options[evt.options.selectedIndex].text});
}
problemdetailonChange(evt:any){
let e=evt.value;
}
rootcausedetailonChange(evt:any){
let e=evt.value;
}
solutiondetailonChange(evt:any){
let e=evt.value;
}
expenseidonChange(evt:any){
let e=evt.value;
this.camsworkorderForm.patchValue({expenseiddesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
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
scheduleidonChange(evt:any){
let e=evt.value;
}
scheduletaskidonChange(evt:any){
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
  


editcamsworkorders() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkorderservice.getcamsworkordersByEID(pkcol).then(res => {

this.camsworkorderservice.formData=res.camsworkorder;
let formproperty=res.camsworkorder.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkorder.pkcol;
this.formid=res.camsworkorder.workorderid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkorder.workorderid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkorderForm.patchValue({
workorderid: res.camsworkorder.workorderid,
requesttype: res.camsworkorder.requesttype,
requesttypedesc: res.camsworkorder.requesttypedesc,
requestid: res.camsworkorder.requestid,
requestreference: res.camsworkorder.requestreference,
requestdate: this.ngbDateParserFormatter.parse(res.camsworkorder.requestdate),
worktype: res.camsworkorder.worktype,
worktypedesc: res.camsworkorder.worktypedesc,
requestorid: res.camsworkorder.requestorid,
requestoriddesc: res.camsworkorder.requestoriddesc,
assetid: res.camsworkorder.assetid,
assetiddesc: res.camsworkorder.assetiddesc,
assetstatus: res.camsworkorder.assetstatus,
assetstatusdesc: res.camsworkorder.assetstatusdesc,
locationid: res.camsworkorder.locationid,
locationiddesc: res.camsworkorder.locationiddesc,
sublocationid: res.camsworkorder.sublocationid,
sublocationiddesc: res.camsworkorder.sublocationiddesc,
details: res.camsworkorder.details,
breakdowndate: this.ngbDateParserFormatter.parse(res.camsworkorder.breakdowndate),
breakdownreported: this.ngbDateParserFormatter.parse(res.camsworkorder.breakdownreported),
reportedby: res.camsworkorder.reportedby,
reportedbydesc: res.camsworkorder.reportedbydesc,
repairstarted: this.ngbDateParserFormatter.parse(res.camsworkorder.repairstarted),
repaircompleted: this.ngbDateParserFormatter.parse(res.camsworkorder.repaircompleted),
online: this.ngbDateParserFormatter.parse(res.camsworkorder.online),
priority: res.camsworkorder.priority,
prioritydesc: res.camsworkorder.prioritydesc,
criticality: res.camsworkorder.criticality,
criticalitydesc: res.camsworkorder.criticalitydesc,
requireddate: this.ngbDateParserFormatter.parse(res.camsworkorder.requireddate),
requestremarks: JSON.parse(res.camsworkorder.requestremarks),
assetnotes: JSON.parse(res.camsworkorder.assetnotes),
workpersontype: res.camsworkorder.workpersontype,
workpersontypedesc: res.camsworkorder.workpersontypedesc,
estimatedworkhrs: res.camsworkorder.estimatedworkhrs,
actualworkhrs: res.camsworkorder.actualworkhrs,
supplierid: res.camsworkorder.supplierid,
supplieriddesc: res.camsworkorder.supplieriddesc,
suppliername: res.camsworkorder.suppliername,
expirydate: this.ngbDateParserFormatter.parse(res.camsworkorder.expirydate),
assignto: JSON.parse(res.camsworkorder.assignto),
username: res.camsworkorder.username,
telephone: res.camsworkorder.telephone,
mobile: res.camsworkorder.mobile,
email: res.camsworkorder.email,
startdate: this.ngbDateParserFormatter.parse(res.camsworkorder.startdate),
enddate: this.ngbDateParserFormatter.parse(res.camsworkorder.enddate),
worknotes: res.camsworkorder.worknotes,
query: JSON.parse(res.camsworkorder.query),
orderstatus: res.camsworkorder.orderstatus,
orderstatusdesc: res.camsworkorder.orderstatusdesc,
completionnotes: res.camsworkorder.completionnotes,
problem: res.camsworkorder.problem,
problemdesc: res.camsworkorder.problemdesc,
rootcause: res.camsworkorder.rootcause,
rootcausedesc: res.camsworkorder.rootcausedesc,
solution: res.camsworkorder.solution,
solutiondesc: res.camsworkorder.solutiondesc,
problemdetail: res.camsworkorder.problemdetail,
rootcausedetail: res.camsworkorder.rootcausedetail,
solutiondetail: res.camsworkorder.solutiondetail,
expenseid: res.camsworkorder.expenseid,
expenseiddesc: res.camsworkorder.expenseiddesc,
remarks: JSON.parse(res.camsworkorder.remarks),
customfield: res.camsworkorder.customfield,
attachment: JSON.parse(res.camsworkorder.attachment),
status: res.camsworkorder.status,
statusdesc: res.camsworkorder.statusdesc,
scheduleid: res.camsworkorder.scheduleid,
scheduleiddesc: res.camsworkorder.scheduleiddesc,
scheduletaskid: res.camsworkorder.scheduletaskid,
scheduletaskiddesc: res.camsworkorder.scheduletaskiddesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("reportedby")>=0)this.reportedbyvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("reportedby")>=0)this.reportedbyvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("requestid")>=0)this.requestidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("requestid")>=0)this.requestidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("breakdownreported")>=0)this.breakdownreportedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("breakdownreported")>=0)this.breakdownreportedvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("repairstarted")>=0)this.repairstartedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("repairstarted")>=0)this.repairstartedvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("breakdowndate")>=0)this.breakdowndatevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("breakdowndate")>=0)this.breakdowndatevisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("repaircompleted")>=0)this.repaircompletedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("repaircompleted")>=0)this.repaircompletedvisible = false;
this.camsworkdetailsvisiblelist=res.camsworkdetailsvisiblelist;
this.camsmisccostsvisiblelist=res.camsmisccostsvisiblelist;
if(this.camsworkorderForm.get('customfield').value!=null && this.camsworkorderForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsworkorderForm.get('customfield').value);
this.FillCustomField();
if(this.camsworkorderForm.get('attachment').value!=null && this.camsworkorderForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsworkorderForm.get('attachment').value);
setTimeout(() => {
if(this.f.locationid.value && this.f.locationid.value!="" && this.f.locationid.value!=null)this.bobranchsublocationservice.getListBylocationid(this.f.locationid.value).then(res =>{
this.sublocationidList = res as bobranchsublocation[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.camsworkorderservice.camsworkdetails = res.camsworkdetails;
this.SetcamsworkdetailsTableConfig();
this.camsworkdetailsLoadTable();
  setTimeout(() => {
  this.SetcamsworkdetailsTableddConfig();
  });
this.camsworkorderservice.camsmisccosts = res.camsmisccosts;
this.SetcamsmisccostsTableConfig();
this.camsmisccostsLoadTable();
  setTimeout(() => {
  this.SetcamsmisccostsTableddConfig();
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
  for (let key in this.camsworkorderForm.controls) {
    if (this.camsworkorderForm.controls[key] != null) {
if(false)
{
if(this.camsworkorderservice.formData!=null && this.camsworkorderservice.formData[key]!=null  && this.camsworkorderservice.formData[key]!='[]' && this.camsworkorderservice.formData[key]!=undefined && this.camsworkorderservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkorderservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkorderservice.formData!=null && this.camsworkorderservice.formData[key]!=null   && this.camsworkorderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkorderservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkorderservice.formData!=null && this.camsworkorderservice.formData[key]!=null   && this.camsworkorderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkorderservice.formData[key]+"'><div class='progress__number'>"+this.camsworkorderservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkorderForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkorderForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsworkorderForm.value;
obj.requestdate=new Date(this.camsworkorderForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('requestdate').value)+'  UTC' :null);
obj.breakdowndate=new Date(this.camsworkorderForm.get('breakdowndate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('breakdowndate').value)+'  UTC' :null);
obj.breakdownreported=new Date(this.camsworkorderForm.get('breakdownreported').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('breakdownreported').value)+'  UTC' :null);
obj.repairstarted=new Date(this.camsworkorderForm.get('repairstarted').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('repairstarted').value)+'  UTC' :null);
obj.repaircompleted=new Date(this.camsworkorderForm.get('repaircompleted').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('repaircompleted').value)+'  UTC' :null);
obj.online=new Date(this.camsworkorderForm.get('online').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('online').value)+'  UTC' :null);
obj.requireddate=new Date(this.camsworkorderForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('requireddate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('requestremarks').value!=null)obj.requestremarks=JSON.stringify(this.camsworkorderForm.get('requestremarks').value);
if(this.camsworkorderForm.get('assetnotes').value!=null)obj.assetnotes=JSON.stringify(this.camsworkorderForm.get('assetnotes').value);
obj.expirydate=new Date(this.camsworkorderForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('expirydate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('assignto').value!=null)obj.assignto=JSON.stringify(this.camsworkorderForm.get('assignto').value);
obj.startdate=new Date(this.camsworkorderForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.camsworkorderForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('enddate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('query').value!=null)obj.query=JSON.stringify(this.camsworkorderForm.get('query').value);
if(this.camsworkorderForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsworkorderForm.get('remarks').value);
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

private camsworkordertoggleOption(){
this.camsworkordershowOption = this.camsworkordershowOption === true ? false : true;
}

private camsworkdetailtoggleOption(){
this.camsworkdetailshowOption = this.camsworkdetailshowOption === true ? false : true;
}

private camsmisccosttoggleOption(){
this.camsmisccostshowOption = this.camsmisccostshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkorderForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkorderForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkorderForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkorderservice.formData=this.camsworkorderForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkorderForm.controls[key] != null)
    {
        this.camsworkorderservice.formData[key] = this.camsworkorderForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsworkorderservice.formData.requestdate=new Date(this.camsworkorderForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('requestdate').value)+'  UTC' :null);
this.camsworkorderservice.formData.breakdowndate=new Date(this.camsworkorderForm.get('breakdowndate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('breakdowndate').value)+'  UTC' :null);
this.camsworkorderservice.formData.breakdownreported=new Date(this.camsworkorderForm.get('breakdownreported').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('breakdownreported').value)+'  UTC' :null);
this.camsworkorderservice.formData.repairstarted=new Date(this.camsworkorderForm.get('repairstarted').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('repairstarted').value)+'  UTC' :null);
this.camsworkorderservice.formData.repaircompleted=new Date(this.camsworkorderForm.get('repaircompleted').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('repaircompleted').value)+'  UTC' :null);
this.camsworkorderservice.formData.online=new Date(this.camsworkorderForm.get('online').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('online').value)+'  UTC' :null);
this.camsworkorderservice.formData.requireddate=new Date(this.camsworkorderForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('requireddate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('requestremarks').value!=null)this.camsworkorderservice.formData.requestremarks=JSON.stringify(this.camsworkorderForm.get('requestremarks').value);
if(this.camsworkorderForm.get('assetnotes').value!=null)this.camsworkorderservice.formData.assetnotes=JSON.stringify(this.camsworkorderForm.get('assetnotes').value);
this.camsworkorderservice.formData.expirydate=new Date(this.camsworkorderForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('expirydate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('assignto').value!=null)this.camsworkorderservice.formData.assignto=JSON.stringify(this.camsworkorderForm.get('assignto').value);
this.camsworkorderservice.formData.startdate=new Date(this.camsworkorderForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('startdate').value)+'  UTC' :null);
this.camsworkorderservice.formData.enddate=new Date(this.camsworkorderForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.camsworkorderForm.get('enddate').value)+'  UTC' :null);
if(this.camsworkorderForm.get('query').value!=null)this.camsworkorderservice.formData.query=JSON.stringify(this.camsworkorderForm.get('query').value);
if(this.camsworkorderForm.get('remarks').value!=null)this.camsworkorderservice.formData.remarks=JSON.stringify(this.camsworkorderForm.get('remarks').value);
if(customfields!=null)this.camsworkorderservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsworkorderservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.camsworkorderservice.formData.DeletedcamsworkdetailIDs = this.DeletedcamsworkdetailIDs;
this.camsworkorderservice.formData.DeletedcamsmisccostIDs = this.DeletedcamsmisccostIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsworkorderservice.formData);
this.camsworkorderservice.formData=this.camsworkorderForm.value;
this.camsworkorderservice.saveOrUpdatecamsworkorders().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.camsworkdetailssource.data)
{
    for (let i = 0; i < this.camsworkdetailssource.data.length; i++)
    {
        if (this.camsworkdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworkdetailssource.data[i].fileattachmentlist);
    }
}
if (this.camsmisccostssource.data)
{
    for (let i = 0; i < this.camsmisccostssource.data.length; i++)
    {
        if (this.camsmisccostssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsmisccostssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkorder);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkorderservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkorder);
}
else
{
this.FillData(res);
}
}
this.camsworkorderForm.markAsUntouched();
this.camsworkorderForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrequestorid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsworkorderForm.get('requestorid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsworkorderForm.get('assetid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camsworkorderForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsublocationid( sublocationid) {
/*let ScreenType='2';
this.dialog.open(bobranchsublocationComponent, 
{
data: {sublocationid:this.camsworkorderForm.get('sublocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreportedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsworkorderForm.get('reportedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.camsworkorderForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditexpenseid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.camsworkorderForm.get('expenseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditscheduleid( scheduleid) {
/*let ScreenType='2';
this.dialog.open(camspmscheduleComponent, 
{
data: {scheduleid:this.camsworkorderForm.get('scheduleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditscheduletaskid( scheduletaskid) {
/*let ScreenType='2';
this.dialog.open(camspmscheduletaskComponent, 
{
data: {scheduletaskid:this.camsworkorderForm.get('scheduletaskid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamsworkdetail(event:any,workorderdetailid:any, workorderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworkdetailComponent, 
{
data:  {  showview:false,save:false,event,workorderdetailid, workorderid,visiblelist:this.camsworkdetailsvisiblelist,  hidelist:this.camsworkdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworkdetailssource.add(res);
this.camsworkdetailssource.refresh();
}
else
{
this.camsworkdetailssource.update(event.data, res);
}
}
});
}

onDeletecamsworkdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworkdetailIDs += childID + ",";
this.camsworkorderservice.camsworkdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsmisccost(event:any,costid:any, workorderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsmisccostComponent, 
{
data:  {  showview:false,save:false,event,costid, workorderid,visiblelist:this.camsmisccostsvisiblelist,  hidelist:this.camsmisccostshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsmisccostssource.add(res);
this.camsmisccostssource.refresh();
}
else
{
this.camsmisccostssource.update(event.data, res);
}
}
});
}

onDeletecamsmisccost(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsmisccostIDs += childID + ",";
this.camsworkorderservice.camsmisccosts.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camsworkdetails
camsworkdetailssettings:any;
camsworkdetailssource: any;

showcamsworkdetailsCheckbox()
{
debugger;
if(this.tblcamsworkdetailssource.settings['selectMode']== 'multi')this.tblcamsworkdetailssource.settings['selectMode']= 'single';
else
this.tblcamsworkdetailssource.settings['selectMode']= 'multi';
this.tblcamsworkdetailssource.initGrid();
}
deletecamsworkdetailsAll()
{
this.tblcamsworkdetailssource.settings['selectMode'] = 'single';
}
showcamsworkdetailsFilter()
{
  setTimeout(() => {
  this.SetcamsworkdetailsTableddConfig();
  });
      if(this.tblcamsworkdetailssource.settings!=null)this.tblcamsworkdetailssource.settings['hideSubHeader'] =!this.tblcamsworkdetailssource.settings['hideSubHeader'];
this.tblcamsworkdetailssource.initGrid();
}
showcamsworkdetailsInActive()
{
}
enablecamsworkdetailsInActive()
{
}
async SetcamsworkdetailsTableddConfig()
{
if(!this.bfilterPopulatecamsworkdetails){

this.camspmmasterservice.getcamspmmastersList().then(res=>
{
var datapmid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkdetailspmid3.push(defaultobj);
for(let i=0; i<datapmid2.length; i++){
var obj= { value: datapmid2[i].pmid, title:datapmid2[i].reference};
this.datacamsworkdetailspmid3.push(obj);
}
if((this.tblcamsworkdetailssource.settings as any).columns['pmid'])
{
(this.tblcamsworkdetailssource.settings as any).columns['pmid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkdetailspmid3));
this.tblcamsworkdetailssource.initGrid();
}
});

this.camspmtaskservice.getcamspmtasksList().then(res=>
{
var datapmtaskid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkdetailspmtaskid3.push(defaultobj);
for(let i=0; i<datapmtaskid2.length; i++){
var obj= { value: datapmtaskid2[i].pmtaskid, title:datapmtaskid2[i].description};
this.datacamsworkdetailspmtaskid3.push(obj);
}
if((this.tblcamsworkdetailssource.settings as any).columns['pmtaskid'])
{
(this.tblcamsworkdetailssource.settings as any).columns['pmtaskid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkdetailspmtaskid3));
this.tblcamsworkdetailssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datauserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkdetailsuserid3.push(defaultobj);
for(let i=0; i<datauserid2.length; i++){
var obj= { value: datauserid2[i].userid, title:datauserid2[i].username};
this.datacamsworkdetailsuserid3.push(obj);
}
if((this.tblcamsworkdetailssource.settings as any).columns['userid'])
{
(this.tblcamsworkdetailssource.settings as any).columns['userid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkdetailsuserid3));
this.tblcamsworkdetailssource.initGrid();
}
});

this.configservice.getList("lostrate").then(res=>
{
var datalostrate2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkdetailslostrate3.push(defaultobj);
for(let i=0; i<datalostrate2.length; i++){
var obj= { value: datalostrate2[i].configkey, title: datalostrate2[i].configtext};
this.datacamsworkdetailslostrate3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkdetailssource.settings);
if(clone.columns['lostrate']!=undefined)clone.columns['lostrate'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkdetailslostrate3)), }, };
if(clone.columns['lostrate']!=undefined)clone.columns['lostrate'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkdetailslostrate3)), }, };
this.tblcamsworkdetailssource.settings =  clone;
this.tblcamsworkdetailssource.initGrid();
});
}
this.bfilterPopulatecamsworkdetails=true;
}
async camsworkdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworkdetailsTableConfig()
{
this.camsworkdetailssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'yy5km',reportcode:'yy5km',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkdetailspmid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
pmtaskid: {
title: 'P M Task',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'d7t8m',reportcode:'d7t8m',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkdetailspmtaskid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
taskdescription: {
title: 'Task Description',
type: '',
filter:true,
},
tasktype: {
title: 'Task Type',
type: '',
filter:true,
},
meterreading: {
title: 'Meter Reading',
type: '',
filter:true,
},
workhrs: {
title: 'Work Hrs',
type: '',
filter:true,
},
workperioddays: {
title: 'Work Period Days',
type: 'number',
filter:true,
},
orderno: {
title: 'Order No',
type: 'number',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkdetailsuserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
plannedstartdate: {
title: 'Planned Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
plannedenddate: {
title: 'Planned End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualstartdate: {
title: 'Actual Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualenddate: {
title: 'Actual End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
delayedstart: {
title: 'Delayed Start',
type: '',
filter:true,
},
actualworkhrs: {
title: 'Actual Work Hrs',
type: '',
filter:true,
},
workstatus: {
title: 'Work Status',
type: '',
filter:true,
},
},
};
}
camsworkdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkdetailsID)>=0)
{
this.camsworkdetailssource=new LocalDataSource();
this.camsworkdetailssource.load(this.camsworkorderservice.camsworkdetails as  any as LocalDataSource);
this.camsworkdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworkdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworkorderservice.camsworkdetails.length == 0)
{
    this.tblcamsworkdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworkdetail();
    this.camsworkorderservice.camsworkdetails.push(obj);
    this.camsworkdetailssource.refresh();
    if ((this.camsworkorderservice.camsworkdetails.length / this.camsworkdetailssource.getPaging().perPage).toFixed(0) + 1 != this.camsworkdetailssource.getPaging().page)
    {
        this.camsworkdetailssource.setPage((this.camsworkorderservice.camsworkdetails.length / this.camsworkdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworkdetailssource.grid.edit(this.tblcamsworkdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworkdetailssource.data.indexOf(event.data);
this.onDeletecamsworkdetail(event,event.data.workorderdetailid,((this.camsworkdetailssource.getPaging().page-1) *this.camsworkdetailssource.getPaging().perPage)+index);
this.camsworkdetailssource.refresh();
break;
}
}

*/
camsworkdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworkdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworkdetail(event,event.data.workorderdetailid,this.formid);
break;
case 'delete':
this.onDeletecamsworkdetail(event,event.data.workorderdetailid,((this.camsworkdetailssource.getPaging().page-1) *this.camsworkdetailssource.getPaging().perPage)+event.index);
this.camsworkdetailssource.refresh();
break;
}
}
camsworkdetailsonDelete(obj) {
let workorderdetailid=obj.data.workorderdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworkorderservice.deletecamsworkorder(workorderdetailid).then(res=>
this.camsworkdetailsLoadTable()
);
}
}
camsworkdetailsPaging(val)
{
debugger;
this.camsworkdetailssource.setPaging(1, val, true);
}

handlecamsworkdetailsGridSelected(event:any) {
this.camsworkdetailsselectedindex=this.camsworkorderservice.camsworkdetails.findIndex(i => i.workorderdetailid === event.data.workorderdetailid);
}
IscamsworkdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworkdetails
//start of Grid Codes camsmisccosts
camsmisccostssettings:any;
camsmisccostssource: any;

showcamsmisccostsCheckbox()
{
debugger;
if(this.tblcamsmisccostssource.settings['selectMode']== 'multi')this.tblcamsmisccostssource.settings['selectMode']= 'single';
else
this.tblcamsmisccostssource.settings['selectMode']= 'multi';
this.tblcamsmisccostssource.initGrid();
}
deletecamsmisccostsAll()
{
this.tblcamsmisccostssource.settings['selectMode'] = 'single';
}
showcamsmisccostsFilter()
{
  setTimeout(() => {
  this.SetcamsmisccostsTableddConfig();
  });
      if(this.tblcamsmisccostssource.settings!=null)this.tblcamsmisccostssource.settings['hideSubHeader'] =!this.tblcamsmisccostssource.settings['hideSubHeader'];
this.tblcamsmisccostssource.initGrid();
}
showcamsmisccostsInActive()
{
}
enablecamsmisccostsInActive()
{
}
async SetcamsmisccostsTableddConfig()
{
if(!this.bfilterPopulatecamsmisccosts){
}
this.bfilterPopulatecamsmisccosts=true;
}
async camsmisccostsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsmisccostsTableConfig()
{
this.camsmisccostssettings = {
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
costtype: {
title: 'Cost Type',
type: '',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
estimatedunitcost: {
title: 'Estimated Unit Cost',
type: 'number',
filter:true,
},
estimatedquantity: {
title: 'Estimated Quantity',
type: 'number',
filter:true,
},
estimatedcost: {
title: 'Estimated Cost',
type: 'number',
filter:true,
},
actualquantity: {
title: 'Actual Quantity',
type: 'number',
filter:true,
},
actualunitcost: {
title: 'Actual Unit Cost',
type: 'number',
filter:true,
},
totalcost: {
title: 'Total Cost',
type: 'number',
filter:true,
},
approvalstatus: {
title: 'Approval Status',
type: '',
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
},
};
}
camsmisccostsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsmisccostsID)>=0)
{
this.camsmisccostssource=new LocalDataSource();
this.camsmisccostssource.load(this.camsworkorderservice.camsmisccosts as  any as LocalDataSource);
this.camsmisccostssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsmisccostsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworkorderservice.camsmisccosts.length == 0)
{
    this.tblcamsmisccostssource.grid.createFormShown = true;
}
else
{
    let obj = new camsmisccost();
    this.camsworkorderservice.camsmisccosts.push(obj);
    this.camsmisccostssource.refresh();
    if ((this.camsworkorderservice.camsmisccosts.length / this.camsmisccostssource.getPaging().perPage).toFixed(0) + 1 != this.camsmisccostssource.getPaging().page)
    {
        this.camsmisccostssource.setPage((this.camsworkorderservice.camsmisccosts.length / this.camsmisccostssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsmisccostssource.grid.edit(this.tblcamsmisccostssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsmisccostssource.data.indexOf(event.data);
this.onDeletecamsmisccost(event,event.data.costid,((this.camsmisccostssource.getPaging().page-1) *this.camsmisccostssource.getPaging().perPage)+index);
this.camsmisccostssource.refresh();
break;
}
}

*/
camsmisccostsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsmisccost(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsmisccost(event,event.data.costid,this.formid);
break;
case 'delete':
this.onDeletecamsmisccost(event,event.data.costid,((this.camsmisccostssource.getPaging().page-1) *this.camsmisccostssource.getPaging().perPage)+event.index);
this.camsmisccostssource.refresh();
break;
}
}
camsmisccostsonDelete(obj) {
let costid=obj.data.costid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworkorderservice.deletecamsworkorder(costid).then(res=>
this.camsmisccostsLoadTable()
);
}
}
camsmisccostsPaging(val)
{
debugger;
this.camsmisccostssource.setPaging(1, val, true);
}

handlecamsmisccostsGridSelected(event:any) {
this.camsmisccostsselectedindex=this.camsworkorderservice.camsmisccosts.findIndex(i => i.costid === event.data.costid);
}
IscamsmisccostsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsmisccostsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsmisccosts

}



