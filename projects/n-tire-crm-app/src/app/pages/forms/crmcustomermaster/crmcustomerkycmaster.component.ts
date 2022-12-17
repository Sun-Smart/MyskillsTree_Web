import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { crmcustomerkycmaster } from './../../../model/crmcustomerkycmaster.model';
import { NgForm } from '@angular/forms';
import { crmcustomermaster } from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";

import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import {DynamicDialogConfig} from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-crmcustomerkycmasters',
templateUrl: './crmcustomerkycmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class crmcustomerkycmasterComponent implements OnInit {
customfieldservicelist:any;
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 crmcustomerkycmasterForm: FormGroup;
identitynameList: bomasterdata[];

viewhtml:any='';
showview:boolean=false;
theme:string="";
//formdata:any;
shortcuts: ShortcutInput[] = [];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };

showformtype:any;
data:any;
SESSIONUSERID:any;
sessiondata:any;
customfieldjson: any;
customfieldvisible:boolean=true;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;


constructor(
private keyboard: KeyboardShortcutsService,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
private crmcustomermasterservice: crmcustomermasterService,
public ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
public sessionService: SessionService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private customfieldservice: customfieldconfigurationService,

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
this.crmcustomerkycmasterForm  = this.fb.group({pk:[null],
ImageName: [null],
kycid: [null],
customerid: [null],
identityname: [null],
identitynamedesc: [null],
identitynumber: [null],
issuedate: [null],
expirydate: [null],
renewalrequired: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomerkycmasterForm.controls; }


async ngOnInit() {
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
if ( this.data!= null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if(this.data.CustomFormName!=null && this.data.CustomFormName!="")this.CustomFormName=this.data.CustomFormName;
if(this.data.CustomFormField!=null && this.data.CustomFormField!="")this.CustomFormField=this.data.CustomFormField;
if(this.data.CustomFormFieldValue!=null && this.data.CustomFormFieldValue!="")this.CustomFormFieldValue=this.data.CustomFormFieldValue;
let ppk=null;
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
ppk=this.currentRoute.snapshot.paramMap.get('viewid');
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
if(this.data.pkcol!=null && this.data.pkcol!=undefined)ppk=this.data.pkcol;
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.formid=ppk;

if (this.pkcol== null)
{
this.crmcustomerkycmasterForm.patchValue({
issuedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
expirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.FillCustomField();
}
else
{
let obj =  this.crmcustomermasterservice.crmcustomerkycmasters.filter(x => (x as any).pkcol == ppk)[0];
this.crmcustomerkycmasterForm.patchValue({
kycid:  obj.kycid,
customerid:  obj.customerid,
identityname:  obj.identityname,
identitynamedesc:  obj.identitynamedesc,
identitynumber:  obj.identitynumber,
issuedate: this.ngbDateParserFormatter.parse(obj.issuedate as any),
expirydate: this.ngbDateParserFormatter.parse(obj.expirydate as any),
renewalrequired:  obj.renewalrequired,
customfield:  obj.customfield,
attachment:  obj.attachment,
status:  obj.status,
});


if(this.crmcustomerkycmasterForm.get('customfield').value!="" && this.crmcustomerkycmasterForm.get('customfield').value!=null)this.customfieldjson=JSON.parse(this.crmcustomerkycmasterForm.get('customfield').value);
this.FillCustomField();
if(this.crmcustomerkycmasterForm.get('attachment').value!="" && this.crmcustomerkycmasterForm.get('attachment').value!=null && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.crmcustomerkycmasterForm.get('attachment').value));

}
this.bomasterdataservice.getList("bg2su").then((res:any) => {
this.identitynameList = res as bomasterdata[];
});
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
    if (this.crmcustomerkycmasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomerkycmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomerkycmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomerkycmasterForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomerkycmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.crmcustomerkycmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomerkycmasterForm.controls[key] != null)
    {
        obj[key] = this.crmcustomerkycmasterForm.controls[key].value;
    }
}
}
}
obj.issuedate=this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('issuedate').value);
obj.expirydate=this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('expirydate').value);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
this.dialogRef.close(obj);
}

    PopulateFromMainScreen(mainscreendata,bdisable)
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
        else if(key=="issuedate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="expirydate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.crmcustomerkycmasterForm.controls[key]!=null)
{
this.crmcustomerkycmasterForm.patchValue(json);
         if(bdisable)this.crmcustomerkycmasterForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomerkycmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
      return res;
});


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
identitynameonChange(evt:any){
let e=evt.value;
this.crmcustomerkycmasterForm.patchValue({identitynamedesc:evt.options[evt.options.selectedIndex].text});
}

AddOrEditidentityname( masterdataid) {
let ScreenType='2';
/*this.dialog.open(bomasterdataComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe((res:any) => {
this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.identitynameList = res as bomasterdata[]);
});*/
}


}


