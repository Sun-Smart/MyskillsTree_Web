import { botaskService } from './../../../service/botask.service';
import { botask } from './../../../model/botask.model';
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
//detail table services
import { botaskresponse } from './../../../model/botaskresponse.model';
//FK services
import { botaskresponseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/botaskresponse/botaskresponse.component';
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
selector: 'app-botask',
templateUrl: './botask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class botaskComponent implements OnInit {
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
bfilterPopulatebotasks:boolean=false;
databotaskstasktype3:any=[];
databotaskspriority3:any=[];
databotaskstaskstatus3:any=[];
databotasksperformancestatus3:any=[];
bfilterPopulatebotaskresponses:boolean=false;
@ViewChild('tblbotaskresponsessource',{static:false}) tblbotaskresponsessource: Ng2SmartTableComponent;
 botaskForm: FormGroup;
tasktypeList: boconfigvalue[];
priorityList: boconfigvalue[];
taskstatusList: boconfigvalue[];
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
sessiondata:any;



botaskresponsesvisiblelist:any;
botaskresponseshidelist:any;

DeletedbotaskresponseIDs: string="";
botaskresponsesID: string = "1";
botaskresponsesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private botaskservice: botaskService,
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
this.botaskForm  = this.fb.group({pk:[null],ImageName: [null],
taskid: [null],
sourcefield: [null],
sourcereference: [null],
subject: [null],
description: [null],
tasktype: [null],
tasktypedesc: [null],
assignto: [null],
assigneddate: [null],
startdate: [null],
targetdate: [null],
priority: [null],
prioritydesc: [null],
actualstartdate: [null],
actualcloseddate: [null],
taskstatus: [null],
taskstatusdesc: [null],
estimatedeffort: [null],
actualeffort: [null],
cost: [null],
additionalcost: [null],
completionpercentage: [null],
alarm: [null],
performancestatus: [null],
performancestatusdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.botaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.botaskForm.dirty && this.botaskForm.touched ) {
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

debugger;
let botaskid = null;

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
this.formid=botaskid;
//this.sharedService.alert(botaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbotaskresponsesTableConfig();
  setTimeout(() => {
  this.SetbotaskresponsesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("tasktype").then(res => this.tasktypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("taskstatus").then(res => this.taskstatusList = res as boconfigvalue[]);
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);

//autocomplete
    this.botaskservice.getbotasksList().then(res => {
      this.pkList = res as botask[];
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
this.botaskForm.markAsUntouched();
this.botaskForm.markAsPristine();
}



resetForm() {
if (this.botaskForm != null)
this.botaskForm.reset();
this.botaskForm.patchValue({
});
setTimeout(() => {
this.botaskservice.botaskresponses=[];
this.botaskresponsesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.botaskForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let taskid = this.botaskForm.get('taskid').value;
        if(taskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.botaskservice.deletebotask(taskid).then(res =>
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
    this.botaskForm.patchValue({
        taskid: null
    });
    if(this.botaskservice.formData.taskid!=null)this.botaskservice.formData.taskid=null;
for (let i=0;i<this.botaskservice.botaskresponses.length;i++) {
this.botaskservice.botaskresponses[i].responseid=null;
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
this.botaskForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.botaskForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="targetdate")
this.botaskForm.patchValue({"targetdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualstartdate")
this.botaskForm.patchValue({"actualstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualcloseddate")
this.botaskForm.patchValue({"actualcloseddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.botaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.botaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.botaskForm.controls[key]!=undefined)this.botaskForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("botasks",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
tasktypeonChange(evt:any){
let e=this.f.tasktype.value as any;
this.botaskForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.botaskForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
taskstatusonChange(evt:any){
let e=this.f.taskstatus.value as any;
this.botaskForm.patchValue({taskstatusdesc:evt.options[evt.options.selectedIndex].text});
}
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.botaskForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
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
this.botaskservice.getbotasksByEID(pkcol).then(res => {

this.botaskservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.botask.taskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.botask.taskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.botaskForm.patchValue({
taskid: res.botask.taskid,
sourcefield: res.botask.sourcefield,
sourcereference: res.botask.sourcereference,
subject: res.botask.subject,
description: res.botask.description,
tasktype: res.botask.tasktype,
tasktypedesc: res.botask.tasktypedesc,
assignto: res.botask.assignto,
assigneddate: this.ngbDateParserFormatter.parse(res.botask.assigneddate),
startdate: this.ngbDateParserFormatter.parse(res.botask.startdate),
targetdate: this.ngbDateParserFormatter.parse(res.botask.targetdate),
priority: res.botask.priority,
prioritydesc: res.botask.prioritydesc,
actualstartdate: this.ngbDateParserFormatter.parse(res.botask.actualstartdate),
actualcloseddate: this.ngbDateParserFormatter.parse(res.botask.actualcloseddate),
taskstatus: res.botask.taskstatus,
taskstatusdesc: res.botask.taskstatusdesc,
estimatedeffort: res.botask.estimatedeffort,
actualeffort: res.botask.actualeffort,
cost: res.botask.cost,
additionalcost: res.botask.additionalcost,
completionpercentage: res.botask.completionpercentage,
alarm: res.botask.alarm,
performancestatus: res.botask.performancestatus,
performancestatusdesc: res.botask.performancestatusdesc,
customfield: res.botask.customfield,
attachment: res.botask.attachment,
status: res.botask.status,
statusdesc: res.botask.statusdesc,
});
this.botaskresponsesvisiblelist=res.botaskresponsesvisiblelist;
if(this.botaskForm.get('customfield').value!=null && this.botaskForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.botaskForm.get('customfield').value);
this.FillCustomField();
if(this.botaskForm.get('attachment').value!=null && this.botaskForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.botaskForm.get('attachment').value));
//Child Tables if any
this.botaskservice.botaskresponses = res.botaskresponses;
this.SetbotaskresponsesTableConfig();
this.botaskresponsesLoadTable();
  setTimeout(() => {
  this.SetbotaskresponsesTableddConfig();
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
  for (let key in this.botaskForm.controls) {
    if (this.botaskForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.botaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.botaskForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.botaskForm.value;
obj.assigneddate=new Date(this.botaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('assigneddate').value)+'  UTC' :null);
obj.startdate=new Date(this.botaskForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('startdate').value)+'  UTC' :null);
obj.targetdate=new Date(this.botaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('targetdate').value)+'  UTC' :null);
obj.actualstartdate=new Date(this.botaskForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('actualstartdate').value)+'  UTC' :null);
obj.actualcloseddate=new Date(this.botaskForm.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('actualcloseddate').value)+'  UTC' :null);
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
Object.keys(this.botaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.botaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.botaskForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.botaskservice.formData=this.botaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.botaskForm.controls[key] != null)
    {
        this.botaskservice.formData[key] = this.botaskForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.botaskservice.formData.assigneddate=new Date(this.botaskForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('assigneddate').value)+'  UTC' :null);
this.botaskservice.formData.startdate=new Date(this.botaskForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('startdate').value)+'  UTC' :null);
this.botaskservice.formData.targetdate=new Date(this.botaskForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('targetdate').value)+'  UTC' :null);
this.botaskservice.formData.actualstartdate=new Date(this.botaskForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('actualstartdate').value)+'  UTC' :null);
this.botaskservice.formData.actualcloseddate=new Date(this.botaskForm.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.botaskForm.get('actualcloseddate').value)+'  UTC' :null);
this.botaskservice.formData.customfield=JSON.stringify(customfields);
this.botaskservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.botaskservice.formData.DeletedbotaskresponseIDs = this.DeletedbotaskresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.botaskservice.formData);
this.botaskservice.formData=this.botaskForm.value;
this.botaskservice.saveOrUpdatebotasks().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.botaskresponsessource.data)
{
    for (let i = 0; i < this.botaskresponsessource.data.length; i++)
    {
        if (this.botaskresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.botaskresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.botask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.botaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.botask);
}
else
{
this.FillData(res);
}
}
this.botaskForm.markAsUntouched();
this.botaskForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbotaskresponse(event:any,responseid:any, taskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(botaskresponseComponent, 
{
data:  {  showview:this.showview,save:false,event,responseid, taskid,visiblelist:this.botaskresponsesvisiblelist,  hidelist:this.botaskresponseshidelist,ScreenType:2  },
header: 'Task Responses'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.botaskresponsessource.add(res);
this.botaskresponsessource.refresh();
}
else
{
this.botaskresponsessource.update(event.data, res);
}
}
});
}

onDeletebotaskresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbotaskresponseIDs += childID + ",";
this.botaskservice.botaskresponses.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes botaskresponses
botaskresponsessettings:any;
botaskresponsessource: any;

showbotaskresponsesCheckbox()
{
debugger;
if(this.tblbotaskresponsessource.settings['selectMode']== 'multi')this.tblbotaskresponsessource.settings['selectMode']= 'single';
else
this.tblbotaskresponsessource.settings['selectMode']= 'multi';
this.tblbotaskresponsessource.initGrid();
}
deletebotaskresponsesAll()
{
this.tblbotaskresponsessource.settings['selectMode'] = 'single';
}
showbotaskresponsesFilter()
{
  setTimeout(() => {
  this.SetbotaskresponsesTableddConfig();
  });
      if(this.tblbotaskresponsessource.settings!=null)this.tblbotaskresponsessource.settings['hideSubHeader'] =!this.tblbotaskresponsessource.settings['hideSubHeader'];
this.tblbotaskresponsessource.initGrid();
}
showbotaskresponsesInActive()
{
}
enablebotaskresponsesInActive()
{
}
async SetbotaskresponsesTableddConfig()
{
if(!this.bfilterPopulatebotaskresponses){
}
this.bfilterPopulatebotaskresponses=true;
}
async botaskresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbotaskresponsesTableConfig()
{
this.botaskresponsessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
return this.sharedService.getCustomValue(cell);
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
return this.sharedService.getAttachmentValue(cell);
},
},
},
};
}
botaskresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.botaskresponsesID)>=0)
{
this.botaskresponsessource=new LocalDataSource();
this.botaskresponsessource.load(this.botaskservice.botaskresponses as  any as LocalDataSource);
this.botaskresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
botaskresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.botaskservice.botaskresponses.length == 0)
{
    this.tblbotaskresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new botaskresponse();
    this.botaskservice.botaskresponses.push(obj);
    this.botaskresponsessource.refresh();
    if ((this.botaskservice.botaskresponses.length / this.botaskresponsessource.getPaging().perPage).toFixed(0) + 1 != this.botaskresponsessource.getPaging().page)
    {
        this.botaskresponsessource.setPage((this.botaskservice.botaskresponses.length / this.botaskresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbotaskresponsessource.grid.edit(this.tblbotaskresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.botaskresponsessource.data.indexOf(event.data);
this.onDeletebotaskresponse(event,event.data.responseid,((this.botaskresponsessource.getPaging().page-1) *this.botaskresponsessource.getPaging().perPage)+index);
this.botaskresponsessource.refresh();
break;
}
}

*/
botaskresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbotaskresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbotaskresponse(event,event.data.responseid,this.formid);
break;
case 'delete':
this.onDeletebotaskresponse(event,event.data.responseid,((this.botaskresponsessource.getPaging().page-1) *this.botaskresponsessource.getPaging().perPage)+event.index);
this.botaskresponsessource.refresh();
break;
}
}
botaskresponsesonDelete(obj) {
let responseid=obj.data.responseid;
if (confirm('Are you sure to delete this record ?')) {
this.botaskservice.deletebotask(responseid).then(res=>
this.botaskresponsesLoadTable()
);
}
}
botaskresponsesPaging(val)
{
debugger;
this.botaskresponsessource.setPaging(1, val, true);
}

handlebotaskresponsesGridSelected(event:any) {
this.botaskresponsesselectedindex=this.botaskservice.botaskresponses.findIndex(i => i.responseid === event.data.responseid);
}
IsbotaskresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.botaskresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes botaskresponses

}



