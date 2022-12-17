import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { pmspropertyinsurance } from './../../../model/pmspropertyinsurance.model';
import { NgForm } from '@angular/forms';
import { pmsproperty } from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
import { pmspropertyinsuranceService } from './../../../service/pmspropertyinsurance.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";

import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { pmstenant,IpmstenantResponse } from './../../../model/pmstenant.model';
import { pmstenantService } from './../../../service/pmstenant.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import {DynamicDialogConfig} from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-pmspropertyinsurances',
templateUrl: './pmspropertyinsurance.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class pmspropertyinsuranceComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 pmspropertyinsuranceForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
propertyid_pmspropertiesForm: FormGroup;
propertyid_pmspropertiesoptions:any;
propertyid_pmspropertiesformatter:any;
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
tenantid_pmstenantsForm: FormGroup;
tenantid_pmstenantsoptions:any;
tenantid_pmstenantsformatter:any;

hidelist:any=[];
viewhtml:any='';
showview:boolean=false;
theme:string="";
//formData:any;
shortcuts: ShortcutInput[] = [];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };

showformtype:any;
data:any;
maindata:any;
SESSIONUSERID:any;
sessiondata:any;
pmspropertyshowOption:boolean;
sourcekey:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;


constructor(
private nav: Location,
private keyboard: KeyboardShortcutsService,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
private pmspropertyinsuranceservice: pmspropertyinsuranceService,
private pmspropertyservice: pmspropertyService,
private ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
private configservice:boconfigvalueService,
private pmstenantservice:pmstenantService,

private currentRoute: ActivatedRoute) { 
this.data = dynamicconfig;
this.keyboard.add([
{
        key: 'cmd l',
    command: () => this.dialogRef.close(),
    preventDefault: true
},
{
        key: 'cmd s',
    command: () => this.onSubmitDataDlg(false),
    preventDefault: true
},
{
        key: 'cmd c',
    command: () => this.dialogRef.close(null),
    preventDefault: true
}
]);
this.pmspropertyinsuranceForm  = this.fb.group({
pk:[null],
ImageName: [null],
insuranceid: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
tenantid: [null],
tenantiddesc: [null],
insurancecompany: [null],
policyid: [null],
referenceno: [null],
startdate: [null],
expireddate: [null],
coverageamount: [null],
remarks: [null],
paymentreference: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyinsuranceForm.controls; }


async ngOnInit() {
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');
this.viewhtml=this.sessionService.getViewHtml();
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if ( this.data!= null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if(this.data.CustomFormName!=null && this.data.CustomFormName!="")this.CustomFormName=this.data.CustomFormName;
if(this.data.CustomFormField!=null && this.data.CustomFormField!="")this.CustomFormField=this.data.CustomFormField;
if(this.data.CustomFormFieldValue!=null && this.data.CustomFormFieldValue!="")this.CustomFormFieldValue=this.data.CustomFormFieldValue;
let ppk=null;
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
ppk=this.currentRoute.snapshot.paramMap.get('viewid');
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
if(this.data.pkcol!=null && this.data.pkcol!=undefined)ppk=this.data.pkcol;
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.formid=ppk;

if (this.pkcol== null)
{
this.pmspropertyinsuranceForm.patchValue({
startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
expireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.pmspropertyservice.pmspropertyinsurances.filter(x => (x as any).pkcol == ppk)[0];
this.pmspropertyinsuranceservice.formData = obj;
this.pmspropertyinsuranceForm.patchValue({
insuranceid:  obj.insuranceid,
propertyid:  obj.propertyid,
propertyiddesc:  obj.propertyiddesc,
unitid:  obj.unitid,
tenantid:  obj.tenantid,
tenantiddesc:  obj.tenantiddesc,
insurancecompany:  obj.insurancecompany,
policyid:  obj.policyid,
referenceno:  obj.referenceno,
startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
expireddate: this.ngbDateParserFormatter.parse(obj.expireddate as any),
coverageamount:  obj.coverageamount,
remarks:  obj.remarks,
paymentreference:  obj.paymentreference,
attachment:  obj.attachment,
status:  obj.status,
});


if(this.pmspropertyinsuranceForm.get('attachment').value!="" && this.pmspropertyinsuranceForm.get('attachment').value!=null && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmspropertyinsuranceForm.get('attachment').value);

}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmspropertyinsuranceservice.formData && this.pmspropertyinsuranceservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmspropertyinsuranceForm.patchValue({
    propertyid: this.pmspropertyinsuranceservice.formData.propertyid,
    propertyiddesc: this.pmspropertyinsuranceservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmspropertyinsuranceForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmspropertyinsuranceservice.formData && this.pmspropertyinsuranceservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmspropertyinsuranceForm.patchValue({
    tenantid: this.pmspropertyinsuranceservice.formData.tenantid,
    tenantiddesc: this.pmspropertyinsuranceservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmspropertyinsuranceForm.get('tenantid').value);
let objtenantid;
if (arrtenantid.length > 0) objtenantid = arrtenantid[0];
if (objtenantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenantid_pmstenantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenantidList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenantid_pmstenantsformatter = (result: any) => result.lastname;
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmspropertyinsuranceForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});

}
}

onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmspropertyinsuranceForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
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
  


getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.pmspropertyinsuranceForm.controls[key] != null) {
if(false)
{
if(this.pmspropertiesservice.formData[key]!=null && this.pmspropertiesservice.formData[key]!=undefined && this.pmspropertiesservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertiesservice.formData[key])[0]["name"]);}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyinsuranceForm.controls[key].value);
    }
  }
  return ret;
}

private pmspropertyinsurancetoggleOption(){
this.pmspropertyinsuranceshowOption = this.pmspropertyshowOption === true ? false : true;
}
async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyinsuranceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyinsuranceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyinsuranceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertyinsuranceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyinsuranceForm.controls[key] != null)
    {
        obj[key] = this.pmspropertyinsuranceForm.controls[key].value;
    }
}
}
}
obj.startdate=new Date(this.pmspropertyForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.pmspropertyForm.get('startdate').value)+'  UTC' :null);
obj.expireddate=new Date(this.pmspropertyForm.get('expireddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyForm.get('expireddate').value)+'  UTC' :null);
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
this.pmspropertyinsuranceForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expireddate")
this.pmspropertyinsuranceForm.patchValue({"expireddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmspropertyinsuranceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyinsuranceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyinsuranceForm.controls[key]!=undefined)
{
this.pmspropertyinsuranceForm.controls[key].disable({onlySelf: true});
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
this.onSubmitDataDlg(false);
}
onSubmit() {
this.onSubmitDataDlg(true);
}
insuranceidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
}
tenantidonChange(evt:any){
let e=evt.value;
}
insurancecompanyonChange(evt:any){
let e=evt.value;
}
policyidonChange(evt:any){
let e=evt.value;
}
referencenoonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
expireddateonChange(evt:any){
let e=evt.value;
}
coverageamountonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
paymentreferenceonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmsproperties() {
this.showview=false;
return false;
}




AddOrEditpropertyid( propertyid) {
let ScreenType='2';
/*this.dialog.open(pmspropertyComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe(res => {
if(res)
{
this.pmspropertyservice.getpmspropertiesList().then(res => this.propertyidList = res as pmsproperty[]);
}
});*/
}


AddOrEdittenantid( tenantid) {
let ScreenType='2';
/*this.dialog.open(pmstenantComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe(res => {
if(res)
{
this.pmstenantservice.getpmstenantsList().then(res => this.tenantidList = res as pmstenant[]);
}
});*/
}


}


