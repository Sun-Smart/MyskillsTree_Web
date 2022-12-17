import { boactivityService } from './../../../service/boactivity.service';
import { boactivity } from './../../../model/boactivity.model';
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
selector: 'app-boactivity',
templateUrl: './boactivity.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boactivityComponent implements OnInit {
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
bfilterPopulateboactivities:boolean=false;
databoactivitiesactivitytype3:any=[];
databoactivitiespriority3:any=[];
databoactivitiesassignedby3:any=[];
databoactivitiescontactpersonid3:any=[];
databoactivitiesactivitystatus3:any=[];
 boactivityForm: FormGroup;
activitytypeList: boconfigvalue[];
priorityList: boconfigvalue[];
assignedbyList: bousermaster[];
assignedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignedby_bousermastersForm: FormGroup;//autocomplete
assignedby_bousermastersoptions:any;//autocomplete
assignedby_bousermastersformatter:any;//autocomplete
contactpersonidList: bousermaster[];
contactpersonidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contactpersonid_bousermastersForm: FormGroup;//autocomplete
contactpersonid_bousermastersoptions:any;//autocomplete
contactpersonid_bousermastersformatter:any;//autocomplete
activitystatusList: boconfigvalue[];
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
private boactivityservice: boactivityService,
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
this.boactivityForm  = this.fb.group({pk:[null],ImageName: [null],
activityid: [null],
activitytype: [null],
activitytypedesc: [null],
referenceid: [null],
description: [null],
startdate: [null],
enddate: [null],
duedate: [null],
estimatedtime: [null],
actualtimetaken: [null],
priority: [null],
prioritydesc: [null],
assignedto: [null],
assignedby: [null],
assignedbydesc: [null],
assigneddate: [null],
contactpersonid: [null],
contactpersoniddesc: [null],
details: [null],
activitystatus: [null],
activitystatusdesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
sourcefield: [null],
sourcereference: [null],
});
}

get f() { return this.boactivityForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boactivityForm.dirty && this.boactivityForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.activityid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.activityid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.activityid && pkDetail) {
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
let boactivityid = null;

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
this.formid=boactivityid;
//this.sharedService.alert(boactivityid);

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
this.configservice.getList("activitytype").then(res => this.activitytypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assignedbyList = res as bousermaster[];
if(this.boactivityservice.formData && this.boactivityservice.formData.assignedby){
this.assignedbyoptionsEvent.emit(this.assignedbyList);
this.boactivityForm.patchValue({
    assignedby: this.boactivityservice.formData.assignedby,
    assignedbydesc: this.boactivityservice.formData.assignedbydesc,
});
}
{
let arrassignedby = this.assignedbyList.filter(v => v.userid == this.boactivityForm.get('assignedby').value);
let objassignedby;
if (arrassignedby.length > 0) objassignedby = arrassignedby[0];
if (objassignedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignedby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.contactpersonidList = res as bousermaster[];
if(this.boactivityservice.formData && this.boactivityservice.formData.contactpersonid){
this.contactpersonidoptionsEvent.emit(this.contactpersonidList);
this.boactivityForm.patchValue({
    contactpersonid: this.boactivityservice.formData.contactpersonid,
    contactpersoniddesc: this.boactivityservice.formData.contactpersoniddesc,
});
}
{
let arrcontactpersonid = this.contactpersonidList.filter(v => v.userid == this.boactivityForm.get('contactpersonid').value);
let objcontactpersonid;
if (arrcontactpersonid.length > 0) objcontactpersonid = arrcontactpersonid[0];
if (objcontactpersonid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contactpersonid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contactpersonidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contactpersonid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("activitystatus").then(res => this.activitystatusList = res as boconfigvalue[]);

//autocomplete
    this.boactivityservice.getboactivitiesList().then(res => {
      this.pkList = res as boactivity[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.boactivityForm.markAsUntouched();
this.boactivityForm.markAsPristine();
}
onSelectedassignedby(assignedbyDetail: any) {
if (assignedbyDetail.assignedby && assignedbyDetail) {
this.boactivityForm.patchValue({
assignedby: assignedbyDetail.assignedby,
assignedbydesc: assignedbyDetail.username,

});

}
}

onSelectedcontactpersonid(contactpersonidDetail: any) {
if (contactpersonidDetail.contactpersonid && contactpersonidDetail) {
this.boactivityForm.patchValue({
contactpersonid: contactpersonidDetail.contactpersonid,
contactpersoniddesc: contactpersonidDetail.username,

});

}
}




resetForm() {
if (this.boactivityForm != null)
this.boactivityForm.reset();
this.boactivityForm.patchValue({
assignedby: this.sessiondata.userid,
assignedbydesc: this.sessiondata.username,
contactpersonid: this.sessiondata.userid,
contactpersoniddesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.boactivityForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let activityid = this.boactivityForm.get('activityid').value;
        if(activityid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boactivityservice.deleteboactivity(activityid).then(res =>
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
    this.boactivityForm.patchValue({
        activityid: null
    });
    if(this.boactivityservice.formData.activityid!=null)this.boactivityservice.formData.activityid=null;
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
        else if(key=="startdate")
this.boactivityForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.boactivityForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.boactivityForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.boactivityForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="assigneddate")
this.boactivityForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boactivityForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boactivityForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boactivityForm.controls[key]!=undefined)this.boactivityForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("boactivities",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
activityidonChange(evt:any){
let e=evt.value;
}
activitytypeonChange(evt:any){
let e=this.f.activitytype.value as any;
this.boactivityForm.patchValue({activitytypedesc:evt.options[evt.options.selectedIndex].text});
}
referenceidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
estimatedtimeonChange(evt:any){
let e=evt.value;
}
actualtimetakenonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.boactivityForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
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
assignedbyonChange(evt:any){
let e=evt.value;
}
assigneddateonChange(evt:any){
let e=evt.value;
}
contactpersonidonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
activitystatusonChange(evt:any){
let e=this.f.activitystatus.value as any;
this.boactivityForm.patchValue({activitystatusdesc:evt.options[evt.options.selectedIndex].text});
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
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
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
this.boactivityservice.getboactivitiesByEID(pkcol).then(res => {

this.boactivityservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boactivity.activityid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boactivity.activityid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boactivityForm.patchValue({
activityid: res.boactivity.activityid,
activitytype: res.boactivity.activitytype,
activitytypedesc: res.boactivity.activitytypedesc,
referenceid: res.boactivity.referenceid,
description: res.boactivity.description,
startdate: this.ngbDateParserFormatter.parse(res.boactivity.startdate),
enddate: this.ngbDateParserFormatter.parse(res.boactivity.enddate),
duedate: this.ngbDateParserFormatter.parse(res.boactivity.duedate),
estimatedtime: res.boactivity.estimatedtime,
actualtimetaken: res.boactivity.actualtimetaken,
priority: res.boactivity.priority,
prioritydesc: res.boactivity.prioritydesc,
assignedto: JSON.parse(res.boactivity.assignedto),
assignedby: res.boactivity.assignedby,
assignedbydesc: res.boactivity.assignedbydesc,
assigneddate: this.ngbDateParserFormatter.parse(res.boactivity.assigneddate),
contactpersonid: res.boactivity.contactpersonid,
contactpersoniddesc: res.boactivity.contactpersoniddesc,
details: res.boactivity.details,
activitystatus: res.boactivity.activitystatus,
activitystatusdesc: res.boactivity.activitystatusdesc,
remarks: res.boactivity.remarks,
customfield: res.boactivity.customfield,
attachment: res.boactivity.attachment,
status: res.boactivity.status,
statusdesc: res.boactivity.statusdesc,
sourcefield: res.boactivity.sourcefield,
sourcereference: res.boactivity.sourcereference,
});
if(this.boactivityForm.get('customfield').value!=null && this.boactivityForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.boactivityForm.get('customfield').value);
this.FillCustomField();
if(this.boactivityForm.get('attachment').value!=null && this.boactivityForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.boactivityForm.get('attachment').value));
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
  for (let key in this.boactivityForm.controls) {
    if (this.boactivityForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boactivityForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boactivityForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.boactivityForm.value;
obj.startdate=new Date(this.boactivityForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.boactivityForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('enddate').value)+'  UTC' :null);
obj.duedate=new Date(this.boactivityForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('duedate').value)+'  UTC' :null);
obj.assignedto=JSON.stringify(this.boactivityForm.get('assignedto').value);
obj.assigneddate=new Date(this.boactivityForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('assigneddate').value)+'  UTC' :null);
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
Object.keys(this.boactivityForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boactivityForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boactivityForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boactivityservice.formData=this.boactivityForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boactivityForm.controls[key] != null)
    {
        this.boactivityservice.formData[key] = this.boactivityForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.boactivityservice.formData.startdate=new Date(this.boactivityForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('startdate').value)+'  UTC' :null);
this.boactivityservice.formData.enddate=new Date(this.boactivityForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('enddate').value)+'  UTC' :null);
this.boactivityservice.formData.duedate=new Date(this.boactivityForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('duedate').value)+'  UTC' :null);
this.boactivityservice.formData.assignedto=JSON.stringify(this.boactivityForm.get('assignedto').value);
this.boactivityservice.formData.assigneddate=new Date(this.boactivityForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.boactivityForm.get('assigneddate').value)+'  UTC' :null);
this.boactivityservice.formData.customfield=JSON.stringify(customfields);
this.boactivityservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.boactivityservice.formData);
this.boactivityservice.formData=this.boactivityForm.value;
this.boactivityservice.saveOrUpdateboactivities().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boactivity);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boactivityservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boactivity);
}
else
{
this.FillData(res);
}
}
this.boactivityForm.markAsUntouched();
this.boactivityForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassignedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boactivityForm.get('assignedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontactpersonid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boactivityForm.get('contactpersonid').value, ScreenType:2 }
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



