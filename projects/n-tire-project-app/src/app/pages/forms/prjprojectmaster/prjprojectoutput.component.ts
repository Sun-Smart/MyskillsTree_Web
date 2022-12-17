import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { prjprojectoutput } from './../../../model/prjprojectoutput.model';
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
selector: 'app-prjprojectoutputs',
templateUrl: './prjprojectoutput.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class prjprojectoutputComponent implements OnInit {
customfieldservicelist:any;
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 prjprojectoutputForm: FormGroup;
outputbyList: bousermaster[];
outputbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
outputby_bousermastersForm: FormGroup;
outputby_bousermastersoptions:any;
outputby_bousermastersformatter:any;
verifiedbyList: bousermaster[];
verifiedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
verifiedby_bousermastersForm: FormGroup;
verifiedby_bousermastersoptions:any;
verifiedby_bousermastersformatter:any;

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
this.prjprojectoutputForm  = this.fb.group({pk:[null],
ImageName: [null],
projectid: [null],
outputid: [null],
output: [null],
outputby: [null],
outputbydesc: [null],
verifiedby: [null],
verifiedbydesc: [null],
verifieddate: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectoutputForm.controls; }


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
this.prjprojectoutputForm.patchValue({
verifieddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.FillCustomField();
}
else
{
let obj =  this.prjprojectmasterservice.prjprojectoutputs.filter(x => (x as any).pkcol == ppk)[0];
this.prjprojectoutputForm.patchValue({
projectid:  obj.projectid,
outputid:  obj.outputid,
output:  obj.output,
outputby:  obj.outputby,
outputbydesc:  obj.outputbydesc,
verifiedby:  obj.verifiedby,
verifiedbydesc:  obj.verifiedbydesc,
verifieddate: this.ngbDateParserFormatter.parse(obj.verifieddate as any),
remarks:  obj.remarks,
customfield:  obj.customfield,
attachment:  obj.attachment,
status:  obj.status,
});


if(this.prjprojectoutputForm.get('customfield')!.value!="" && this.prjprojectoutputForm.get('customfield')!.value!=null)this.customfieldjson=JSON.parse(this.prjprojectoutputForm.get('customfield')!.value);
this.FillCustomField();
if(this.prjprojectoutputForm.get('attachment')!.value!="" && this.prjprojectoutputForm.get('attachment')!.value!=null && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.prjprojectoutputForm.get('attachment')!.value));

}
this.bousermasterservice.getbousermastersList().then((res:any) => 
{
this.outputbyList = res as bousermaster[];
if(this.formdata && this.formdata.prjprojectoutput && this.formdata.prjprojectoutput.outputby){
this.outputbyoptionsEvent.emit(this.outputbyList);
this.prjprojectoutputForm.patchValue({
    outputby: this.formdata.prjprojectoutput.outputby,
    outputbydesc: this.formdata.prjprojectoutput.outputbydesc,
});
}
}
);
this.outputby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.outputbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.outputby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then((res:any) => 
{
this.verifiedbyList = res as bousermaster[];
if(this.formdata && this.formdata.prjprojectoutput && this.formdata.prjprojectoutput.verifiedby){
this.verifiedbyoptionsEvent.emit(this.verifiedbyList);
this.prjprojectoutputForm.patchValue({
    verifiedby: this.formdata.prjprojectoutput.verifiedby,
    verifiedbydesc: this.formdata.prjprojectoutput.verifiedbydesc,
});
}
}
);
this.verifiedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.verifiedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.verifiedby_bousermastersformatter = (result: any) => result.username;
}

onSelectedoutputby(outputbyDetail: any) {
if (outputbyDetail.outputby && outputbyDetail) {
this.prjprojectoutputForm.patchValue({
outputby: outputbyDetail.outputby,
outputbydesc: outputbyDetail.username,

});

}
}

onSelectedverifiedby(verifiedbyDetail: any) {
if (verifiedbyDetail.verifiedby && verifiedbyDetail) {
this.prjprojectoutputForm.patchValue({
verifiedby: verifiedbyDetail.verifiedby,
verifiedbydesc: verifiedbyDetail.username,

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
    if (this.prjprojectoutputForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectoutputForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectoutputForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectoutputForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectoutputForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectoutputForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectoutputForm.controls[key] != null)
    {
        obj[key] = this.prjprojectoutputForm.controls[key]!.value;
    }
}
}
}
obj.verifieddate=this.ngbDateParserFormatter.format(this.prjprojectoutputForm.get('verifieddate')!.value);
obj.remarks=JSON.stringify(this.prjprojectoutputForm.get('remarks')!.value);
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
        else if(key=="verifieddate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
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
        if(this.prjprojectoutputForm.controls[key]!=null)
{
this.prjprojectoutputForm.patchValue(json);
         if(bdisable)this.prjprojectoutputForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectoutputs",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
outputidonChange(evt:any){
let e=evt!.value;
}
outputonChange(evt:any){
let e=evt!.value;
}
outputbyonChange(evt:any){
let e=evt!.value;
}
verifiedbyonChange(evt:any){
let e=evt!.value;
}
verifieddateonChange(evt:any){
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

AddOrEditoutputby( userid) {
let ScreenType='2';
/*this.dialog.open(bousermasterComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe((res:any) => {
this.bousermasterservice.getbousermastersList().then((res:any) => this.outputbyList = res as bousermaster[]);
});*/
}


AddOrEditverifiedby( userid) {
let ScreenType='2';
/*this.dialog.open(bousermasterComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe((res:any) => {
this.bousermasterservice.getbousermastersList().then((res:any) => this.verifiedbyList = res as bousermaster[]);
});*/
}


}


