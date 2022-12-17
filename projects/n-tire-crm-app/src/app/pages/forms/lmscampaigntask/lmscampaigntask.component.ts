import { lmscampaigntaskService } from './../../../service/lmscampaigntask.service';
import { lmscampaigntask } from './../../../model/lmscampaigntask.model';
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
import { lmscampaignmaster} from './../../../model/lmscampaignmaster.model';
import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { lmscampaigntaskresponse } from './../../../model/lmscampaigntaskresponse.model';
import { lmscampaigntaskresponseComponent } from './../../../pages/forms/lmscampaigntaskresponse/lmscampaigntaskresponse.component';
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
selector: 'app-lmscampaigntask',
templateUrl: './lmscampaigntask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmscampaigntaskComponent implements OnInit {
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
bfilterPopulatelmscampaigntasks:boolean=false;
datalmscampaigntasksproductid3:any=[];
datalmscampaigntaskscampaignid3:any=[];
datalmscampaigntaskscampaigntype3:any=[];
datalmscampaigntaskstargettype3:any=[];
datalmscampaigntaskspriority3:any=[];
datalmscampaigntasksperformancestatus3:any=[];
datalmscampaigntaskresponsescampaigntype3:any=[];
bfilterPopulatelmscampaigntaskresponses:boolean=false;
@ViewChild('tbllmscampaigntaskresponsessource',{static:false}) tbllmscampaigntaskresponsessource: Ng2SmartTableComponent;
 lmscampaigntaskForm: FormGroup;
productidList: lmsproductmaster[];
campaignidList: lmscampaignmaster[];
campaignidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
campaignid_lmscampaignmastersForm: FormGroup;//autocomplete
campaignid_lmscampaignmastersoptions:any;//autocomplete
campaignid_lmscampaignmastersformatter:any;//autocomplete
campaigntypeList: boconfigvalue[];
targettypeList: boconfigvalue[];
priorityList: boconfigvalue[];
performancestatusList: boconfigvalue[];
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
lmscampaigntaskshowOption:boolean;
lmscampaigntaskresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmscampaigntaskresponsesvisiblelist:any;
lmscampaigntaskresponseshidelist:any;

DeletedlmscampaigntaskresponseIDs: string="";
lmscampaigntaskresponsesID: string = "1";
lmscampaigntaskresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmscampaigntaskservice: lmscampaigntaskService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmsproductmasterservice:lmsproductmasterService,
private lmscampaignmasterservice:lmscampaignmasterService,
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
this.lmscampaigntaskForm  = this.fb.group({
pk:[null],
ImageName: [null],
productid: [null],
productiddesc: [null],
campaignid: [null],
campaigniddesc: [null],
campaigncode: [null],
campaigntype: [null],
campaigntypedesc: [null],
targettype: [null],
targettypedesc: [null],
taskid: [null],
subject: [null, Validators.required],
description: [null],
advantages: [null],
disadvantages: [null],
assignto: [null, Validators.required],
assigneddate: [null],
targetdate: [null],
priority: [null],
prioritydesc: [null],
dailytarget: [null],
actualachieved: [null],
estimatedcost: [null],
actualcost: [null],
successpercentage: [null],
performancestatus: [null],
performancestatusdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmscampaigntaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmscampaigntaskForm.dirty && this.lmscampaigntaskForm.touched ) {
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
let lmscampaigntaskid = null;

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
this.formid=lmscampaigntaskid;
//this.sharedService.alert(lmscampaigntaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmscampaigntaskresponsesTableConfig();
  setTimeout(() => {
  this.SetlmscampaigntaskresponsesTableddConfig();
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
this.lmscampaignmasterservice.getlmscampaignmastersList().then(res => 
{
this.campaignidList = res as lmscampaignmaster[];
if(this.lmscampaigntaskservice.formData && this.lmscampaigntaskservice.formData.campaignid){
this.campaignidoptionsEvent.emit(this.campaignidList);
this.lmscampaigntaskForm.patchValue({
    campaignid: this.lmscampaigntaskservice.formData.campaignid,
    campaigniddesc: this.lmscampaigntaskservice.formData.campaigniddesc,
});
}
{
let arrcampaignid = this.campaignidList.filter(v => v.campaignid == this.lmscampaigntaskForm.get('campaignid').value);
let objcampaignid;
if (arrcampaignid.length > 0) objcampaignid = arrcampaignid[0];
if (objcampaignid)
{
    this.lmscampaigntaskForm.patchValue({ campaigncode: objcampaignid.campaigncode });
    this.lmscampaigntaskForm.patchValue({ campaigntype: objcampaignid.campaigntype });
    this.lmscampaigntaskForm.patchValue({ targettype: objcampaignid.targettype });
}
}
}
).catch((err) => {console.log(err);});
this.campaignid_lmscampaignmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.campaignidList.filter(v => v.campaignname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.campaignid_lmscampaignmastersformatter = (result: any) => result.campaignname;
this.configservice.getList("campaigntype").then(res => this.campaigntypeList = res as boconfigvalue[]);
this.configservice.getList("targettype").then(res => this.targettypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);

//autocomplete
    this.lmscampaigntaskservice.getlmscampaigntasksList().then(res => {
      this.pkList = res as lmscampaigntask[];
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
this.lmscampaigntaskForm.markAsUntouched();
this.lmscampaigntaskForm.markAsPristine();
}
onSelectedcampaignid(campaignidDetail: any) {
if (campaignidDetail.campaignid && campaignidDetail) {
this.lmscampaigntaskForm.patchValue({
campaignid: campaignidDetail.campaignid,
campaigniddesc: campaignidDetail.campaignname,

});
this.lmscampaigntaskForm.patchValue({campaigncode:campaignidDetail.campaigncode});
this.lmscampaigntaskForm.patchValue({campaigntype:campaignidDetail.campaigntype});
this.lmscampaigntaskForm.patchValue({targettype:campaignidDetail.targettype});

}
}




resetForm() {
if (this.lmscampaigntaskForm != null)
this.lmscampaigntaskForm.reset();
this.lmscampaigntaskForm.patchValue({
});
setTimeout(() => {
this.lmscampaigntaskservice.lmscampaigntaskresponses=[];
this.lmscampaigntaskresponsesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taskid = this.lmscampaigntaskForm.get('taskid').value;
        if(taskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaigntaskservice.deletelmscampaigntask(taskid).then(res =>
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
    this.lmscampaigntaskForm.patchValue({
        taskid: null
    });
    if(this.lmscampaigntaskservice.formData.taskid!=null)this.lmscampaigntaskservice.formData.taskid=null;
for (let i=0;i<this.lmscampaigntaskservice.lmscampaigntaskresponses.length;i++) {
this.lmscampaigntaskservice.lmscampaigntaskresponses[i].responseid=null;
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
        else if(key=="assignto")
this.lmscampaigntaskForm.patchValue({"assignto":  mainscreendata[key] } );
        else if(key=="assigneddate")
this.lmscampaigntaskForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="targetdate")
this.lmscampaigntaskForm.patchValue({"targetdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmscampaigntaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmscampaigntaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmscampaigntaskForm.controls[key]!=undefined)
{
this.lmscampaigntaskForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaigntasks",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
this.lmscampaigntaskForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
campaignidonChange(evt:any){
let e=evt.value;
}
campaigncodeonChange(evt:any){
let e=evt.value;
}
campaigntypeonChange(evt:any){
let e=this.f.campaigntype.value as any;
this.lmscampaigntaskForm.patchValue({campaigntypedesc:evt.options[evt.options.selectedIndex].text});
}
targettypeonChange(evt:any){
let e=this.f.targettype.value as any;
this.lmscampaigntaskForm.patchValue({targettypedesc:evt.options[evt.options.selectedIndex].text});
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
advantagesonChange(evt:any){
let e=evt.value;
}
disadvantagesonChange(evt:any){
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
assigneddateonChange(evt:any){
let e=evt.value;
}
targetdateonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.lmscampaigntaskForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
dailytargetonChange(evt:any){
let e=evt.value;
}
actualachievedonChange(evt:any){
let e=evt.value;
}
estimatedcostonChange(evt:any){
let e=evt.value;
}
actualcostonChange(evt:any){
let e=evt.value;
}
successpercentageonChange(evt:any){
let e=evt.value;
}
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.lmscampaigntaskForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlmscampaigntasks() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmscampaigntaskservice.getlmscampaigntasksByEID(pkcol).then(res => {

this.lmscampaigntaskservice.formData=res.lmscampaigntask;
let formproperty=res.lmscampaigntask.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmscampaigntask.pkcol;
this.formid=res.lmscampaigntask.taskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmscampaigntask.taskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmscampaigntaskForm.patchValue({
productid: res.lmscampaigntask.productid,
productiddesc: res.lmscampaigntask.productiddesc,
campaignid: res.lmscampaigntask.campaignid,
campaigniddesc: res.lmscampaigntask.campaigniddesc,
campaigncode: res.lmscampaigntask.campaigncode,
campaigntype: res.lmscampaigntask.campaigntype,
campaigntypedesc: res.lmscampaigntask.campaigntypedesc,
targettype: res.lmscampaigntask.targettype,
targettypedesc: res.lmscampaigntask.targettypedesc,
taskid: res.lmscampaigntask.taskid,
subject: res.lmscampaigntask.subject,
description: res.lmscampaigntask.description,
advantages: res.lmscampaigntask.advantages,
disadvantages: res.lmscampaigntask.disadvantages,
assignto: JSON.parse(res.lmscampaigntask.assignto),
assigneddate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.assigneddate),
targetdate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.targetdate),
priority: res.lmscampaigntask.priority,
prioritydesc: res.lmscampaigntask.prioritydesc,
dailytarget: res.lmscampaigntask.dailytarget,
actualachieved: res.lmscampaigntask.actualachieved,
estimatedcost: res.lmscampaigntask.estimatedcost,
actualcost: res.lmscampaigntask.actualcost,
successpercentage: res.lmscampaigntask.successpercentage,
performancestatus: res.lmscampaigntask.performancestatus,
performancestatusdesc: res.lmscampaigntask.performancestatusdesc,
customfield: res.lmscampaigntask.customfield,
attachment: JSON.parse(res.lmscampaigntask.attachment),
status: res.lmscampaigntask.status,
statusdesc: res.lmscampaigntask.statusdesc,
});
this.lmscampaigntaskresponsesvisiblelist=res.lmscampaigntaskresponsesvisiblelist;
if(this.lmscampaigntaskForm.get('customfield').value!=null && this.lmscampaigntaskForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmscampaigntaskForm.get('customfield').value);
this.FillCustomField();
if(this.lmscampaigntaskForm.get('attachment').value!=null && this.lmscampaigntaskForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmscampaigntaskForm.get('attachment').value);
//Child Tables if any
this.lmscampaigntaskservice.lmscampaigntaskresponses = res.lmscampaigntaskresponses;
this.SetlmscampaigntaskresponsesTableConfig();
this.lmscampaigntaskresponsesLoadTable();
  setTimeout(() => {
  this.SetlmscampaigntaskresponsesTableddConfig();
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
  for (let key in this.lmscampaigntaskForm.controls) {
    if (this.lmscampaigntaskForm.controls[key] != null) {
if(false)
{
if(this.lmscampaigntaskservice.formData!=null && this.lmscampaigntaskservice.formData[key]!=null  && this.lmscampaigntaskservice.formData[key]!='[]' && this.lmscampaigntaskservice.formData[key]!=undefined && this.lmscampaigntaskservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmscampaigntaskservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmscampaigntaskservice.formData!=null && this.lmscampaigntaskservice.formData[key]!=null   && this.lmscampaigntaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmscampaigntaskservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmscampaigntaskservice.formData!=null && this.lmscampaigntaskservice.formData[key]!=null   && this.lmscampaigntaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmscampaigntaskservice.formData[key]+"'><div class='progress__number'>"+this.lmscampaigntaskservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmscampaigntaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmscampaigntaskForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmscampaigntaskForm.value;
obj.assignto=JSON.stringify(this.lmscampaigntaskForm.get('assignto').value);
obj.assigneddate=new Date(this.lmscampaigntaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntaskForm.get('assigneddate').value)+'  UTC' :null);
obj.targetdate=new Date(this.lmscampaigntaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntaskForm.get('targetdate').value)+'  UTC' :null);
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

private lmscampaigntasktoggleOption(){
this.lmscampaigntaskshowOption = this.lmscampaigntaskshowOption === true ? false : true;
}

private lmscampaigntaskresponsetoggleOption(){
this.lmscampaigntaskresponseshowOption = this.lmscampaigntaskresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmscampaigntaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmscampaigntaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmscampaigntaskForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmscampaigntaskservice.formData=this.lmscampaigntaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmscampaigntaskForm.controls[key] != null)
    {
        this.lmscampaigntaskservice.formData[key] = this.lmscampaigntaskForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmscampaigntaskservice.formData.assignto=JSON.stringify(this.lmscampaigntaskForm.get('assignto').value);
this.lmscampaigntaskservice.formData.assigneddate=new Date(this.lmscampaigntaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntaskForm.get('assigneddate').value)+'  UTC' :null);
this.lmscampaigntaskservice.formData.targetdate=new Date(this.lmscampaigntaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntaskForm.get('targetdate').value)+'  UTC' :null);
this.lmscampaigntaskservice.formData.customfield=JSON.stringify(customfields);
this.lmscampaigntaskservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmscampaigntaskservice.formData.DeletedlmscampaigntaskresponseIDs = this.DeletedlmscampaigntaskresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmscampaigntaskservice.formData);
this.lmscampaigntaskservice.formData=this.lmscampaigntaskForm.value;
this.lmscampaigntaskservice.saveOrUpdatelmscampaigntasks().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmscampaigntaskresponsessource.data)
{
    for (let i = 0; i < this.lmscampaigntaskresponsessource.data.length; i++)
    {
        if (this.lmscampaigntaskresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmscampaigntaskresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscampaigntask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmscampaigntaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscampaigntask);
}
else
{
this.FillData(res);
}
}
this.lmscampaigntaskForm.markAsUntouched();
this.lmscampaigntaskForm.markAsPristine();
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
data: {productid:this.lmscampaigntaskForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( campaignid) {
/*let ScreenType='2';
this.dialog.open(lmscampaignmasterComponent, 
{
data: {campaignid:this.lmscampaigntaskForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmscampaigntaskresponse(event:any,responseid:any, taskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmscampaigntaskresponseComponent, 
{
data:  {  showview:false,save:false,event,responseid, taskid,visiblelist:this.lmscampaigntaskresponsesvisiblelist,  hidelist:this.lmscampaigntaskresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmscampaigntaskresponsessource.add(res);
this.lmscampaigntaskresponsessource.refresh();
}
else
{
this.lmscampaigntaskresponsessource.update(event.data, res);
}
}
});
}

onDeletelmscampaigntaskresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmscampaigntaskresponseIDs += childID + ",";
this.lmscampaigntaskservice.lmscampaigntaskresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmscampaigntaskresponses
lmscampaigntaskresponsessettings:any;
lmscampaigntaskresponsessource: any;

showlmscampaigntaskresponsesCheckbox()
{
debugger;
if(this.tbllmscampaigntaskresponsessource.settings['selectMode']== 'multi')this.tbllmscampaigntaskresponsessource.settings['selectMode']= 'single';
else
this.tbllmscampaigntaskresponsessource.settings['selectMode']= 'multi';
this.tbllmscampaigntaskresponsessource.initGrid();
}
deletelmscampaigntaskresponsesAll()
{
this.tbllmscampaigntaskresponsessource.settings['selectMode'] = 'single';
}
showlmscampaigntaskresponsesFilter()
{
  setTimeout(() => {
  this.SetlmscampaigntaskresponsesTableddConfig();
  });
      if(this.tbllmscampaigntaskresponsessource.settings!=null)this.tbllmscampaigntaskresponsessource.settings['hideSubHeader'] =!this.tbllmscampaigntaskresponsessource.settings['hideSubHeader'];
this.tbllmscampaigntaskresponsessource.initGrid();
}
showlmscampaigntaskresponsesInActive()
{
}
enablelmscampaigntaskresponsesInActive()
{
}
async SetlmscampaigntaskresponsesTableddConfig()
{
if(!this.bfilterPopulatelmscampaigntaskresponses){

this.configservice.getList("campaigntype").then(res=>
{
var datacampaigntype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmscampaigntaskresponsescampaigntype3.push(defaultobj);
for(let i=0; i<datacampaigntype2.length; i++){
var obj= { value: datacampaigntype2[i].configkey, title: datacampaigntype2[i].configtext};
this.datalmscampaigntaskresponsescampaigntype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmscampaigntaskresponsessource.settings);
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskresponsescampaigntype3)), }, };
if(clone.columns['campaigntype']!=undefined)clone.columns['campaigntype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmscampaigntaskresponsescampaigntype3)), }, };
this.tbllmscampaigntaskresponsessource.settings =  clone;
this.tbllmscampaigntaskresponsessource.initGrid();
});
}
this.bfilterPopulatelmscampaigntaskresponses=true;
}
async lmscampaigntaskresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmscampaigntaskresponsesTableConfig()
{
this.lmscampaigntaskresponsessettings = {
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
filter:true,
},
campaignid: {
title: 'Campaign',
type: 'number',
filter:true,
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
var element= this.datalmscampaigntaskresponsescampaigntype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
responsedetail: {
title: 'Response Detail',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
lmscampaigntaskresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponsesID)>=0)
{
this.lmscampaigntaskresponsessource=new LocalDataSource();
this.lmscampaigntaskresponsessource.load(this.lmscampaigntaskservice.lmscampaigntaskresponses as  any as LocalDataSource);
this.lmscampaigntaskresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmscampaigntaskresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmscampaigntaskservice.lmscampaigntaskresponses.length == 0)
{
    this.tbllmscampaigntaskresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new lmscampaigntaskresponse();
    this.lmscampaigntaskservice.lmscampaigntaskresponses.push(obj);
    this.lmscampaigntaskresponsessource.refresh();
    if ((this.lmscampaigntaskservice.lmscampaigntaskresponses.length / this.lmscampaigntaskresponsessource.getPaging().perPage).toFixed(0) + 1 != this.lmscampaigntaskresponsessource.getPaging().page)
    {
        this.lmscampaigntaskresponsessource.setPage((this.lmscampaigntaskservice.lmscampaigntaskresponses.length / this.lmscampaigntaskresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmscampaigntaskresponsessource.grid.edit(this.tbllmscampaigntaskresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmscampaigntaskresponsessource.data.indexOf(event.data);
this.onDeletelmscampaigntaskresponse(event,event.data.responseid,((this.lmscampaigntaskresponsessource.getPaging().page-1) *this.lmscampaigntaskresponsessource.getPaging().perPage)+index);
this.lmscampaigntaskresponsessource.refresh();
break;
}
}

*/
lmscampaigntaskresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmscampaigntaskresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmscampaigntaskresponse(event,event.data.responseid,this.formid);
break;
case 'delete':
this.onDeletelmscampaigntaskresponse(event,event.data.responseid,((this.lmscampaigntaskresponsessource.getPaging().page-1) *this.lmscampaigntaskresponsessource.getPaging().perPage)+event.index);
this.lmscampaigntaskresponsessource.refresh();
break;
}
}
lmscampaigntaskresponsesonDelete(obj) {
let responseid=obj.data.responseid;
if (confirm('Are you sure to delete this record ?')) {
this.lmscampaigntaskservice.deletelmscampaigntask(responseid).then(res=>
this.lmscampaigntaskresponsesLoadTable()
);
}
}
lmscampaigntaskresponsesPaging(val)
{
debugger;
this.lmscampaigntaskresponsessource.setPaging(1, val, true);
}

handlelmscampaigntaskresponsesGridSelected(event:any) {
this.lmscampaigntaskresponsesselectedindex=this.lmscampaigntaskservice.lmscampaigntaskresponses.findIndex(i => i.responseid === event.data.responseid);
}
IslmscampaigntaskresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmscampaigntaskresponses

}



