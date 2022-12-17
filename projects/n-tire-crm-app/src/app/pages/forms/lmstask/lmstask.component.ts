import { lmstaskService } from './../../../service/lmstask.service';
import { lmstask } from './../../../model/lmstask.model';
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
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
//detail table services
import { lmstaskresponse } from './../../../model/lmstaskresponse.model';
import { lmstaskresponseComponent } from './../../../pages/forms/lmstaskresponse/lmstaskresponse.component';
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
selector: 'app-lmstask',
templateUrl: './lmstask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmstaskComponent implements OnInit {
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
bfilterPopulatelmstasks:boolean=false;
datalmstasksleadid3:any=[];
datalmstasksopportunityid3:any=[];
datalmstasksassignto3:any=[];
datalmstaskspriority3:any=[];
datalmstaskstaskstatus3:any=[];
datalmstasksperformancestatus3:any=[];
datalmstasksproductid3:any=[];
datalmstaskresponsesopportunityid3:any=[];
bfilterPopulatelmstaskresponses:boolean=false;
@ViewChild('tbllmstaskresponsessource',{static:false}) tbllmstaskresponsessource: Ng2SmartTableComponent;
 lmstaskForm: FormGroup;
leadidList: lmsmaster[];
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
assigntoList: bousermaster[];
assigntooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignto_bousermastersForm: FormGroup;//autocomplete
assignto_bousermastersoptions:any;//autocomplete
assignto_bousermastersformatter:any;//autocomplete
priorityList: boconfigvalue[];
taskstatusList: boconfigvalue[];
performancestatusList: boconfigvalue[];
productidList: lmsproductmaster[];
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
lmstaskshowOption:boolean;
lmstaskresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmstaskresponsesvisiblelist:any;
lmstaskresponseshidelist:any;

DeletedlmstaskresponseIDs: string="";
lmstaskresponsesID: string = "1";
lmstaskresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmstaskservice: lmstaskService,
private lmsopportunityservice: lmsopportunityService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmsmasterservice:lmsmasterService,
private bousermasterservice:bousermasterService,
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
this.lmstaskForm  = this.fb.group({
pk:[null],
ImageName: [null],
leadid: [null],
leadiddesc: [null],
opportunityid: [null],
opportunityiddesc: [null],
taskid: [null],
subject: [null, Validators.required],
description: [null, Validators.required],
assignto: [null],
assigntodesc: [null],
assigneddate: [null, Validators.required],
targetdate: [null, Validators.required],
priority: [null, Validators.required],
prioritydesc: [null],
actualcloseddate: [null],
taskstatus: [null, Validators.required],
taskstatusdesc: [null],
performancestatus: [null],
performancestatusdesc: [null],
productid: [null],
productiddesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmstaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmstaskForm.dirty && this.lmstaskForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.taskid && pkDetail) {
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
let lmstaskid = null;

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
this.formid=lmstaskid;
//this.sharedService.alert(lmstaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmstaskresponsesTableConfig();
  setTimeout(() => {
  this.SetlmstaskresponsesTableddConfig();
  });

this.FillCustomField();
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
if(this.lmstaskservice.formData && this.lmstaskservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmstaskForm.patchValue({
    opportunityid: this.lmstaskservice.formData.opportunityid,
    opportunityiddesc: this.lmstaskservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmstaskForm.get('opportunityid').value);
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
this.assigntoList = res as bousermaster[];
if(this.lmstaskservice.formData && this.lmstaskservice.formData.assignto){
this.assigntooptionsEvent.emit(this.assigntoList);
this.lmstaskForm.patchValue({
    assignto: this.lmstaskservice.formData.assignto,
    assigntodesc: this.lmstaskservice.formData.assigntodesc,
});
}
{
let arrassignto = this.assigntoList.filter(v => v.userid == this.lmstaskForm.get('assignto').value);
let objassignto;
if (arrassignto.length > 0) objassignto = arrassignto[0];
if (objassignto)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assigntoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignto_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("taskstatus").then(res => this.taskstatusList = res as boconfigvalue[]);
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.lmstaskservice.getlmstasksList().then(res => {
      this.pkList = res as lmstask[];
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
this.lmstaskForm.markAsUntouched();
this.lmstaskForm.markAsPristine();
}
onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmstaskForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedassignto(assigntoDetail: any) {
if (assigntoDetail.userid && assigntoDetail) {
this.lmstaskForm.patchValue({
assignto: assigntoDetail.userid,
assigntodesc: assigntoDetail.username,

});

}
}




resetForm() {
if (this.lmstaskForm != null)
this.lmstaskForm.reset();
this.lmstaskForm.patchValue({
assignto: this.sessiondata.userid,
assigntodesc: this.sessiondata.username,
});
this.lmstaskForm.patchValue({
assigneddate: this.ngbDateParserFormatter.parse(new Date().toString()),
targetdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
actualcloseddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.lmstaskservice.lmstaskresponses=[];
this.lmstaskresponsesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taskid = this.lmstaskForm.get('taskid').value;
        if(taskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmstaskservice.deletelmstask(taskid).then(res =>
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
    this.lmstaskForm.patchValue({
        taskid: null
    });
    if(this.lmstaskservice.formData.taskid!=null)this.lmstaskservice.formData.taskid=null;
for (let i=0;i<this.lmstaskservice.lmstaskresponses.length;i++) {
this.lmstaskservice.lmstaskresponses[i].responseid=null;
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
        else if(key=="assigneddate")
this.lmstaskForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="targetdate")
this.lmstaskForm.patchValue({"targetdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualcloseddate")
this.lmstaskForm.patchValue({"actualcloseddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmstaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmstaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmstaskForm.controls[key]!=undefined)
{
this.lmstaskForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmstasks",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
leadidonChange(evt:any){
let e=evt.value;
this.lmstaskForm.patchValue({leadiddesc:evt.options[evt.options.selectedIndex].text});
}
opportunityidonChange(evt:any){
let e=evt.value;
}
taskidonChange(evt:any){
let e=evt.value;
}
subjectonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
assigntoonChange(evt:any){
let e=evt.value;
}
assigneddateonChange(evt:any){
let e=evt.value;
}
targetdateonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.lmstaskForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
actualcloseddateonChange(evt:any){
let e=evt.value;
}
taskstatusonChange(evt:any){
let e=this.f.taskstatus.value as any;
this.lmstaskForm.patchValue({taskstatusdesc:evt.options[evt.options.selectedIndex].text});
}
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.lmstaskForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
}
productidonChange(evt:any){
let e=evt.value;
this.lmstaskForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
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
  


editlmstasks() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmstaskservice.getlmstasksByEID(pkcol).then(res => {

this.lmstaskservice.formData=res.lmstask;
let formproperty=res.lmstask.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmstask.pkcol;
this.formid=res.lmstask.taskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmstask.taskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmstaskForm.patchValue({
leadid: res.lmstask.leadid,
leadiddesc: res.lmstask.leadiddesc,
opportunityid: res.lmstask.opportunityid,
opportunityiddesc: res.lmstask.opportunityiddesc,
taskid: res.lmstask.taskid,
subject: res.lmstask.subject,
description: res.lmstask.description,
assignto: res.lmstask.assignto,
assigntodesc: res.lmstask.assigntodesc,
assigneddate: this.ngbDateParserFormatter.parse(res.lmstask.assigneddate),
targetdate: this.ngbDateParserFormatter.parse(res.lmstask.targetdate),
priority: res.lmstask.priority,
prioritydesc: res.lmstask.prioritydesc,
actualcloseddate: this.ngbDateParserFormatter.parse(res.lmstask.actualcloseddate),
taskstatus: res.lmstask.taskstatus,
taskstatusdesc: res.lmstask.taskstatusdesc,
performancestatus: res.lmstask.performancestatus,
performancestatusdesc: res.lmstask.performancestatusdesc,
productid: res.lmstask.productid,
productiddesc: res.lmstask.productiddesc,
customfield: res.lmstask.customfield,
attachment: JSON.parse(res.lmstask.attachment),
status: res.lmstask.status,
statusdesc: res.lmstask.statusdesc,
});
this.lmstaskresponsesvisiblelist=res.lmstaskresponsesvisiblelist;
if(this.lmstaskForm.get('customfield').value!=null && this.lmstaskForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmstaskForm.get('customfield').value);
this.FillCustomField();
if(this.lmstaskForm.get('attachment').value!=null && this.lmstaskForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmstaskForm.get('attachment').value);
//Child Tables if any
this.lmstaskservice.lmstaskresponses = res.lmstaskresponses;
this.SetlmstaskresponsesTableConfig();
this.lmstaskresponsesLoadTable();
  setTimeout(() => {
  this.SetlmstaskresponsesTableddConfig();
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
  for (let key in this.lmstaskForm.controls) {
    if (this.lmstaskForm.controls[key] != null) {
if(false)
{
if(this.lmstaskservice.formData!=null && this.lmstaskservice.formData[key]!=null  && this.lmstaskservice.formData[key]!='[]' && this.lmstaskservice.formData[key]!=undefined && this.lmstaskservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmstaskservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmstaskservice.formData!=null && this.lmstaskservice.formData[key]!=null   && this.lmstaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmstaskservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmstaskservice.formData!=null && this.lmstaskservice.formData[key]!=null   && this.lmstaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmstaskservice.formData[key]+"'><div class='progress__number'>"+this.lmstaskservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmstaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmstaskForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmstaskForm.value;
obj.assigneddate=new Date(this.lmstaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('assigneddate').value)+'  UTC' :null);
obj.targetdate=new Date(this.lmstaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('targetdate').value)+'  UTC' :null);
obj.actualcloseddate=new Date(this.lmstaskForm.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('actualcloseddate').value)+'  UTC' :null);
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

private lmstasktoggleOption(){
this.lmstaskshowOption = this.lmstaskshowOption === true ? false : true;
}

private lmstaskresponsetoggleOption(){
this.lmstaskresponseshowOption = this.lmstaskresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmstaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmstaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmstaskForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmstaskservice.formData=this.lmstaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmstaskForm.controls[key] != null)
    {
        this.lmstaskservice.formData[key] = this.lmstaskForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmstaskservice.formData.assigneddate=new Date(this.lmstaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('assigneddate').value)+'  UTC' :null);
this.lmstaskservice.formData.targetdate=new Date(this.lmstaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('targetdate').value)+'  UTC' :null);
this.lmstaskservice.formData.actualcloseddate=new Date(this.lmstaskForm.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.lmstaskForm.get('actualcloseddate').value)+'  UTC' :null);
if(customfields!=null)this.lmstaskservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.lmstaskservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmstaskservice.formData.DeletedlmstaskresponseIDs = this.DeletedlmstaskresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmstaskservice.formData);
this.lmstaskservice.formData=this.lmstaskForm.value;
this.lmstaskservice.saveOrUpdatelmstasks().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmstaskresponsessource.data)
{
    for (let i = 0; i < this.lmstaskresponsessource.data.length; i++)
    {
        if (this.lmstaskresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmstaskresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmstask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmstaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmstask);
}
else
{
this.FillData(res);
}
}
this.lmstaskForm.markAsUntouched();
this.lmstaskForm.markAsPristine();
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
data: {leadid:this.lmstaskForm.get('leadid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmstaskForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmstaskForm.get('assignto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmstaskForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmstaskresponse(event:any,responseid:any, taskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmstaskresponseComponent, 
{
data:  {  showview:false,save:false,event,responseid, taskid,visiblelist:this.lmstaskresponsesvisiblelist,  hidelist:this.lmstaskresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmstaskresponsessource.add(res);
this.lmstaskresponsessource.refresh();
}
else
{
this.lmstaskresponsessource.update(event.data, res);
}
}
});
}

onDeletelmstaskresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmstaskresponseIDs += childID + ",";
this.lmstaskservice.lmstaskresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmstaskresponses
lmstaskresponsessettings:any;
lmstaskresponsessource: any;

showlmstaskresponsesCheckbox()
{
debugger;
if(this.tbllmstaskresponsessource.settings['selectMode']== 'multi')this.tbllmstaskresponsessource.settings['selectMode']= 'single';
else
this.tbllmstaskresponsessource.settings['selectMode']= 'multi';
this.tbllmstaskresponsessource.initGrid();
}
deletelmstaskresponsesAll()
{
this.tbllmstaskresponsessource.settings['selectMode'] = 'single';
}
showlmstaskresponsesFilter()
{
  setTimeout(() => {
  this.SetlmstaskresponsesTableddConfig();
  });
      if(this.tbllmstaskresponsessource.settings!=null)this.tbllmstaskresponsessource.settings['hideSubHeader'] =!this.tbllmstaskresponsessource.settings['hideSubHeader'];
this.tbllmstaskresponsessource.initGrid();
}
showlmstaskresponsesInActive()
{
}
enablelmstaskresponsesInActive()
{
}
async SetlmstaskresponsesTableddConfig()
{
if(!this.bfilterPopulatelmstaskresponses){

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstaskresponsesopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmstaskresponsesopportunityid3.push(obj);
}
if((this.tbllmstaskresponsessource.settings as any).columns['opportunityid'])
{
(this.tbllmstaskresponsessource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstaskresponsesopportunityid3));
this.tbllmstaskresponsessource.initGrid();
}
});
}
this.bfilterPopulatelmstaskresponses=true;
}
async lmstaskresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmstaskresponsesTableConfig()
{
this.lmstaskresponsessettings = {
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
responsedetail: {
title: 'Response Detail',
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
},
};
}
lmstaskresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmstaskresponsesID)>=0)
{
this.lmstaskresponsessource=new LocalDataSource();
this.lmstaskresponsessource.load(this.lmstaskservice.lmstaskresponses as  any as LocalDataSource);
this.lmstaskresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmstaskresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmstaskservice.lmstaskresponses.length == 0)
{
    this.tbllmstaskresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new lmstaskresponse();
    this.lmstaskservice.lmstaskresponses.push(obj);
    this.lmstaskresponsessource.refresh();
    if ((this.lmstaskservice.lmstaskresponses.length / this.lmstaskresponsessource.getPaging().perPage).toFixed(0) + 1 != this.lmstaskresponsessource.getPaging().page)
    {
        this.lmstaskresponsessource.setPage((this.lmstaskservice.lmstaskresponses.length / this.lmstaskresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmstaskresponsessource.grid.edit(this.tbllmstaskresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmstaskresponsessource.data.indexOf(event.data);
this.onDeletelmstaskresponse(event,event.data.responseid,((this.lmstaskresponsessource.getPaging().page-1) *this.lmstaskresponsessource.getPaging().perPage)+index);
this.lmstaskresponsessource.refresh();
break;
}
}

*/
lmstaskresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmstaskresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmstaskresponse(event,event.data.responseid,this.formid);
break;
case 'delete':
this.onDeletelmstaskresponse(event,event.data.responseid,((this.lmstaskresponsessource.getPaging().page-1) *this.lmstaskresponsessource.getPaging().perPage)+event.index);
this.lmstaskresponsessource.refresh();
break;
}
}
lmstaskresponsesonDelete(obj) {
let responseid=obj.data.responseid;
if (confirm('Are you sure to delete this record ?')) {
this.lmstaskservice.deletelmstask(responseid).then(res=>
this.lmstaskresponsesLoadTable()
);
}
}
lmstaskresponsesPaging(val)
{
debugger;
this.lmstaskresponsessource.setPaging(1, val, true);
}

handlelmstaskresponsesGridSelected(event:any) {
this.lmstaskresponsesselectedindex=this.lmstaskservice.lmstaskresponses.findIndex(i => i.responseid === event.data.responseid);
}
IslmstaskresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmstaskresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmstaskresponses

}



