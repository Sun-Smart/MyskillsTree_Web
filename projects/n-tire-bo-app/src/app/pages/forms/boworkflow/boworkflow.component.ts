import { boworkflowService } from './../../../service/boworkflow.service';
import { boworkflow } from './../../../model/boworkflow.model';
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
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
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
selector: 'app-boworkflow',
templateUrl: './boworkflow.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boworkflowComponent implements OnInit {
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
bfilterPopulateboworkflows:boolean=false;
databoworkflowscurrentapproved3:any=[];
databoworkflowsstandardrating3:any=[];
databoworkflowsperformancerating3:any=[];
databoworkflowsperformancestatus3:any=[];
databoworkflowsworkflowstatus3:any=[];
 boworkflowForm: FormGroup;
currentapprovedList: bousermaster[];
currentapprovedoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
currentapproved_bousermastersForm: FormGroup;//autocomplete
currentapproved_bousermastersoptions:any;//autocomplete
currentapproved_bousermastersformatter:any;//autocomplete
standardratingList: boconfigvalue[];
performanceratingList: boconfigvalue[];
performancestatusList: boconfigvalue[];
workflowstatusList: boconfigvalue[];
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
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boworkflowservice: boworkflowService,
private bousermasterservice: bousermasterService,
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
this.boworkflowForm  = this.fb.group({
pk:[null],
ImageName: [null],
workflowid: [null],
workflowmasterid: [null],
currentstepno: [null],
modulename: [null],
pkvalue: [null],
currentapproved: [null],
currentapproveddesc: [null],
currentapprovers: [null],
nextapprovers: [null],
assigneddatetime: [null],
closeddatetime: [null],
standardrating: [null],
standardratingdesc: [null],
performancerating: [null],
performanceratingdesc: [null],
performancestatus: [null],
performancestatusdesc: [null],
exception: [null],
approvedusers: [null],
approvedcondition: [null],
tathours: [null],
totalactualtime: [null],
processid: [null],
workflowdetails: [null],
comments: [null],
history: [null],
lastapprover: [null],
cc: [null],
customfield: [null],
attachment: [null],
workflowstatus: [null],
workflowstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boworkflowForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boworkflowForm.dirty && this.boworkflowForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workflowid && pkDetail) {
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
let boworkflowid = null;

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
this.formid=boworkflowid;
//this.sharedService.alert(boworkflowid);

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
this.bousermasterservice.getbousermastersList().then(res => 
{
this.currentapprovedList = res as bousermaster[];
if(this.boworkflowservice.formData && this.boworkflowservice.formData.currentapproved){
this.currentapprovedoptionsEvent.emit(this.currentapprovedList);
this.boworkflowForm.patchValue({
    currentapproved: this.boworkflowservice.formData.currentapproved,
    currentapproveddesc: this.boworkflowservice.formData.currentapproveddesc,
});
}
{
let arrcurrentapproved = this.currentapprovedList.filter(v => v.userid == this.boworkflowForm.get('currentapproved').value);
let objcurrentapproved;
if (arrcurrentapproved.length > 0) objcurrentapproved = arrcurrentapproved[0];
if (objcurrentapproved)
{
}
}
}
).catch((err) => {console.log(err);});
this.currentapproved_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.currentapprovedList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.currentapproved_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("standardrating").then(res => this.standardratingList = res as boconfigvalue[]);
this.configservice.getList("performancerating").then(res => this.performanceratingList = res as boconfigvalue[]);
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);
this.configservice.getList("workflowstatus").then(res => this.workflowstatusList = res as boconfigvalue[]);

//autocomplete
    this.boworkflowservice.getboworkflowsList().then(res => {
      this.pkList = res as boworkflow[];
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
this.boworkflowForm.markAsUntouched();
this.boworkflowForm.markAsPristine();
}
onSelectedcurrentapproved(currentapprovedDetail: any) {
if (currentapprovedDetail.currentapproved && currentapprovedDetail) {
this.boworkflowForm.patchValue({
currentapproved: currentapprovedDetail.currentapproved,
currentapproveddesc: currentapprovedDetail.username,

});

}
}




resetForm() {
if (this.boworkflowForm != null)
this.boworkflowForm.reset();
this.boworkflowForm.patchValue({
currentapproved: this.sessiondata.userid,
currentapproveddesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let workflowid = this.boworkflowForm.get('workflowid').value;
        if(workflowid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowservice.deleteboworkflow(workflowid).then(res =>
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
    this.boworkflowForm.patchValue({
        workflowid: null
    });
    if(this.boworkflowservice.formData.workflowid!=null)this.boworkflowservice.formData.workflowid=null;
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
        else if(key=="currentapprovers")
this.boworkflowForm.patchValue({"currentapprovers":  mainscreendata[key] } );
        else if(key=="nextapprovers")
this.boworkflowForm.patchValue({"nextapprovers":  mainscreendata[key] } );
        else if(key=="assigneddatetime")
this.boworkflowForm.patchValue({"assigneddatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="closeddatetime")
this.boworkflowForm.patchValue({"closeddatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="approvedusers")
this.boworkflowForm.patchValue({"approvedusers":  mainscreendata[key] } );
        else if(key=="comments")
this.boworkflowForm.patchValue({"comments":  mainscreendata[key] } );
        else if(key=="lastapprover")
this.boworkflowForm.patchValue({"lastapprover":  mainscreendata[key] } );
        else if(key=="cc")
this.boworkflowForm.patchValue({"cc":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.boworkflowForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boworkflowForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boworkflowForm.controls[key]!=undefined)this.boworkflowForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("boworkflows",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
workflowidonChange(evt:any){
let e=evt.value;
}
workflowmasteridonChange(evt:any){
let e=evt.value;
}
currentstepnoonChange(evt:any){
let e=evt.value;
}
modulenameonChange(evt:any){
let e=evt.value;
}
pkvalueonChange(evt:any){
let e=evt.value;
}
currentapprovedonChange(evt:any){
let e=evt.value;
}
currentapproversonChange(evt:any){
let e=evt.value;
}
nextapproversonChange(evt:any){
let e=evt.value;
}
assigneddatetimeonChange(evt:any){
let e=evt.value;
}
closeddatetimeonChange(evt:any){
let e=evt.value;
}
standardratingonChange(evt:any){
let e=this.f.standardrating.value as any;
this.boworkflowForm.patchValue({standardratingdesc:evt.options[evt.options.selectedIndex].text});
}
performanceratingonChange(evt:any){
let e=this.f.performancerating.value as any;
this.boworkflowForm.patchValue({performanceratingdesc:evt.options[evt.options.selectedIndex].text});
}
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.boworkflowForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
}
exceptiononChange(evt:any){
let e=evt.value;
}
approvedusersonChange(evt:any){
let e=evt.value;
}
approvedconditiononChange(evt:any){
let e=evt.value;
}
tathoursonChange(evt:any){
let e=evt.value;
}
totalactualtimeonChange(evt:any){
let e=evt.value;
}
processidonChange(evt:any){
let e=evt.value;
}
workflowdetailsonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
let e=evt.value;
}
historyonChange(evt:any){
let e=evt.value;
}
lastapproveronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrlastapprover=res;
let objlastapprover;
if (arrlastapprover.length > 0) objlastapprover = arrlastapprover[0];
if (objlastapprover)
{
}
}).catch((err) => {console.log(err);});
}
cconChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrcc=res;
let objcc;
if (arrcc.length > 0) objcc = arrcc[0];
if (objcc)
{
}
}).catch((err) => {console.log(err);});
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
workflowstatusonChange(evt:any){
let e=this.f.workflowstatus.value as any;
this.boworkflowForm.patchValue({workflowstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


async PopulateScreen(pkcol:any){
this.boworkflowservice.getboworkflowsByEID(pkcol).then(res => {

this.boworkflowservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boworkflow.workflowid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boworkflow.workflowid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boworkflowForm.patchValue({
workflowid: res.boworkflow.workflowid,
workflowmasterid: res.boworkflow.workflowmasterid,
currentstepno: res.boworkflow.currentstepno,
modulename: res.boworkflow.modulename,
pkvalue: res.boworkflow.pkvalue,
currentapproved: res.boworkflow.currentapproved,
currentapproveddesc: res.boworkflow.currentapproveddesc,
currentapprovers: JSON.parse(res.boworkflow.currentapprovers),
nextapprovers: JSON.parse(res.boworkflow.nextapprovers),
assigneddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.assigneddatetime),
closeddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.closeddatetime),
standardrating: res.boworkflow.standardrating,
standardratingdesc: res.boworkflow.standardratingdesc,
performancerating: res.boworkflow.performancerating,
performanceratingdesc: res.boworkflow.performanceratingdesc,
performancestatus: res.boworkflow.performancestatus,
performancestatusdesc: res.boworkflow.performancestatusdesc,
exception: res.boworkflow.exception,
approvedusers: JSON.parse(res.boworkflow.approvedusers),
approvedcondition: res.boworkflow.approvedcondition,
tathours: res.boworkflow.tathours,
totalactualtime: res.boworkflow.totalactualtime,
processid: res.boworkflow.processid,
workflowdetails: res.boworkflow.workflowdetails,
comments: JSON.parse(res.boworkflow.comments),
history: res.boworkflow.history,
lastapprover: JSON.parse(res.boworkflow.lastapprover),
cc: JSON.parse(res.boworkflow.cc),
customfield: res.boworkflow.customfield,
attachment: res.boworkflow.attachment,
workflowstatus: res.boworkflow.workflowstatus,
workflowstatusdesc: res.boworkflow.workflowstatusdesc,
status: res.boworkflow.status,
statusdesc: res.boworkflow.statusdesc,
});
if(this.boworkflowForm.get('customfield').value!=null && this.boworkflowForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.boworkflowForm.get('customfield').value);
this.FillCustomField();
if(this.boworkflowForm.get('attachment').value!=null && this.boworkflowForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.boworkflowForm.get('attachment').value));
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
  for (let key in this.boworkflowForm.controls) {
    if (this.boworkflowForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boworkflowForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boworkflowForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.boworkflowForm.value;
obj.currentapprovers=JSON.stringify(this.boworkflowForm.get('currentapprovers').value);
obj.nextapprovers=JSON.stringify(this.boworkflowForm.get('nextapprovers').value);
obj.assigneddatetime=new Date(this.boworkflowForm.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflowForm.get('assigneddatetime').value)+'  UTC' :null);
obj.closeddatetime=new Date(this.boworkflowForm.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflowForm.get('closeddatetime').value)+'  UTC' :null);
obj.approvedusers=JSON.stringify(this.boworkflowForm.get('approvedusers').value);
obj.comments=JSON.stringify(this.boworkflowForm.get('comments').value);
obj.lastapprover=JSON.stringify(this.boworkflowForm.get('lastapprover').value);
obj.cc=JSON.stringify(this.boworkflowForm.get('cc').value);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.boworkflowForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boworkflowForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boworkflowForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boworkflowservice.formData=this.boworkflowForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boworkflowForm.controls[key] != null)
    {
        this.boworkflowservice.formData[key] = this.boworkflowForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.boworkflowservice.formData.currentapprovers=JSON.stringify(this.boworkflowForm.get('currentapprovers').value);
this.boworkflowservice.formData.nextapprovers=JSON.stringify(this.boworkflowForm.get('nextapprovers').value);
this.boworkflowservice.formData.assigneddatetime=new Date(this.boworkflowForm.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflowForm.get('assigneddatetime').value)+'  UTC' :null);
this.boworkflowservice.formData.closeddatetime=new Date(this.boworkflowForm.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflowForm.get('closeddatetime').value)+'  UTC' :null);
this.boworkflowservice.formData.approvedusers=JSON.stringify(this.boworkflowForm.get('approvedusers').value);
this.boworkflowservice.formData.comments=JSON.stringify(this.boworkflowForm.get('comments').value);
this.boworkflowservice.formData.lastapprover=JSON.stringify(this.boworkflowForm.get('lastapprover').value);
this.boworkflowservice.formData.cc=JSON.stringify(this.boworkflowForm.get('cc').value);
this.boworkflowservice.formData.customfield=JSON.stringify(customfields);
this.boworkflowservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.boworkflowservice.formData);
this.boworkflowservice.formData=this.boworkflowForm.value;
this.boworkflowservice.saveOrUpdateboworkflows().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boworkflow);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boworkflowservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boworkflow);
}
else
{
this.FillData(res);
}
}
this.boworkflowForm.markAsUntouched();
this.boworkflowForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcurrentapproved( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boworkflowForm.get('currentapproved').value, ScreenType:2 }
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



