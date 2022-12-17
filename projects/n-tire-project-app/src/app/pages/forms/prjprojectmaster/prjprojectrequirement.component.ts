import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { prjprojectrequirement } from './../../../model/prjprojectrequirement.model';
import { NgForm } from '@angular/forms';
import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
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
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-prjprojectrequirements',
templateUrl: './prjprojectrequirement.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class prjprojectrequirementComponent implements OnInit {
customfieldservicelist:any;
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 prjprojectrequirementForm: FormGroup;
authoridList: bousermaster[];
authoridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
authorid_bousermastersForm: FormGroup;
authorid_bousermastersoptions:any;
authorid_bousermastersformatter:any;
revieweridList: bousermaster[];
revieweridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
reviewerid_bousermastersForm: FormGroup;
reviewerid_bousermastersoptions:any;
reviewerid_bousermastersformatter:any;

viewhtml:any='';
showview:boolean=false;
theme:string="";
formdata:any;
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
private prjprojectmasterservice: prjprojectmasterService,
public ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
public sessionService: SessionService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.prjprojectrequirementForm  = this.fb.group({pk:[null],
ImageName: [null],
projectid: [null],
requirementid: [null],
requirement: [null],
authorid: [null],
authoriddesc: [null],
reviewerid: [null],
revieweriddesc: [null],
tousers: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectrequirementForm.controls; }


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
this.prjprojectrequirementForm.patchValue({
});
this.FillCustomField();
}
else
{
let obj =  this.prjprojectmasterservice.prjprojectrequirements.filter(x => (x as any).pkcol == ppk)[0];
this.prjprojectrequirementForm.patchValue({
projectid:  obj.projectid,
requirementid:  obj.requirementid,
requirement:  obj.requirement,
authorid:  obj.authorid,
authoriddesc:  obj.authoriddesc,
reviewerid:  obj.reviewerid,
revieweriddesc:  obj.revieweriddesc,
tousers:  obj.tousers,
remarks:  obj.remarks,
customfield:  obj.customfield,
attachment:  obj.attachment,
status:  obj.status,
});


if(this.prjprojectrequirementForm.get('customfield')!.value!="" && this.prjprojectrequirementForm.get('customfield')!.value!=null)this.customfieldjson=JSON.parse(this.prjprojectrequirementForm.get('customfield')!.value);
this.FillCustomField();
if(this.prjprojectrequirementForm.get('attachment')!.value!="" && this.prjprojectrequirementForm.get('attachment')!.value!=null && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.prjprojectrequirementForm.get('attachment')!.value));

}
this.bousermasterservice.getbousermastersList().then((res:any) => 
{
this.authoridList = res as bousermaster[];
if(this.formdata && this.formdata.prjprojectrequirement && this.formdata.prjprojectrequirement.authorid){
this.authoridoptionsEvent.emit(this.authoridList);
this.prjprojectrequirementForm.patchValue({
    authorid: this.formdata.prjprojectrequirement.authorid,
    authoriddesc: this.formdata.prjprojectrequirement.authoriddesc,
});
}
}
);
this.authorid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.authoridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.authorid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then((res:any) => 
{
this.revieweridList = res as bousermaster[];
if(this.formdata && this.formdata.prjprojectrequirement && this.formdata.prjprojectrequirement.reviewerid){
this.revieweridoptionsEvent.emit(this.revieweridList);
this.prjprojectrequirementForm.patchValue({
    reviewerid: this.formdata.prjprojectrequirement.reviewerid,
    revieweriddesc: this.formdata.prjprojectrequirement.revieweriddesc,
});
}
}
);
this.reviewerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.revieweridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reviewerid_bousermastersformatter = (result: any) => result.username;
}

onSelectedauthorid(authoridDetail: any) {
if (authoridDetail.authorid && authoridDetail) {
this.prjprojectrequirementForm.patchValue({
authorid: authoridDetail.authorid,
authoriddesc: authoridDetail.username,

});

}
}

onSelectedreviewerid(revieweridDetail: any) {
if (revieweridDetail.reviewerid && revieweridDetail) {
this.prjprojectrequirementForm.patchValue({
reviewerid: revieweridDetail.reviewerid,
revieweriddesc: revieweridDetail.username,

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
    if (this.prjprojectrequirementForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectrequirementForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectrequirementForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectrequirementForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectrequirementForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectrequirementForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectrequirementForm.controls[key] != null)
    {
        obj[key] = this.prjprojectrequirementForm.controls[key]!.value;
    }
}
}
}
obj.tousers=JSON.stringify(this.prjprojectrequirementForm.get('tousers')!.value);
obj.remarks=JSON.stringify(this.prjprojectrequirementForm.get('remarks')!.value);
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
        else if(key=="tousers")
        json='{"'+key+'": '+mainscreendata[key] +' }';  
        else if(key=="remarks")
        json='{"'+key+'": '+mainscreendata[key] +' }';  
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
        if(this.prjprojectrequirementForm.controls[key]!=null)
{
this.prjprojectrequirementForm.patchValue(json);
         if(bdisable)this.prjprojectrequirementForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectrequirements",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
projectidonChange(evt:any){
let e=evt!.value;
}
requirementidonChange(evt:any){
let e=evt!.value;
}
requirementonChange(evt:any){
let e=evt!.value;
}
authoridonChange(evt:any){
let e=evt!.value;
}
revieweridonChange(evt:any){
let e=evt!.value;
}
tousersonChange(evt:any){
let e=evt!.value;
}
remarksonChange(evt:any){
let e=evt!.value;
}
customfieldonChange(evt:any){
let e=evt!.value;
}
attachmentonChange(evt:any){
let e=evt!.value;
}
statusonChange(evt:any){
let e=evt!.value;
}

AddOrEditauthorid( userid) {
let ScreenType='2';
/*this.dialog.open(bousermasterComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe((res:any) => {
this.bousermasterservice.getbousermastersList().then((res:any) => this.authoridList = res as bousermaster[]);
});*/
}


AddOrEditreviewerid( userid) {
let ScreenType='2';
/*this.dialog.open(bousermasterComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe((res:any) => {
this.bousermasterservice.getbousermastersList().then((res:any) => this.revieweridList = res as bousermaster[]);
});*/
}


}


