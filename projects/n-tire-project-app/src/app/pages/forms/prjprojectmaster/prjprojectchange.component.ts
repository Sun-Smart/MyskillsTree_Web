import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { prjprojectchange } from './../../../model/prjprojectchange.model';
import { NgForm } from '@angular/forms';
import { prjprojectmaster } from './../../../model/prjprojectmaster.model';
import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
import { prjprojectchangeService } from './../../../service/prjprojectchange.service';
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
selector: 'app-prjprojectchanges',
templateUrl: './prjprojectchange.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class prjprojectchangeComponent implements OnInit {
customfieldservicelist:any;
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 prjprojectchangeForm: FormGroup;
changestatusList: boconfigvalue[];

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
prjprojectmastershowOption:boolean;
sourcekey:any;
customfieldjson: any;
customfieldvisible:boolean=true;
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
private prjprojectchangeservice: prjprojectchangeService,
private prjprojectmasterservice: prjprojectmasterService,
private ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
private configservice:boconfigvalueService,
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
this.prjprojectchangeForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
changeid: [null],
changerequestid: [null],
changedetails: [null],
changedate: [null],
requestedby: [null],
assignto: [null],
verifiedby: [null],
changestatus: [null],
changestatusdesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectchangeForm.controls; }


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
this.prjprojectchangeForm.patchValue({
changedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.FillCustomField();
}
else
{
let obj =  this.prjprojectmasterservice.prjprojectchanges.filter(x => (x as any).pkcol == ppk)[0];
this.prjprojectchangeservice.formData = obj;
this.prjprojectchangeForm.patchValue({
projectid:  obj.projectid,
changeid:  obj.changeid,
changerequestid:  obj.changerequestid,
changedetails:  obj.changedetails,
changedate: this.ngbDateParserFormatter.parse(obj.changedate as any),
requestedby:  obj.requestedby,
assignto:  obj.assignto,
verifiedby:  obj.verifiedby,
changestatus:  obj.changestatus,
changestatusdesc:  obj.changestatusdesc,
remarks:  obj.remarks,
customfield:  obj.customfield,
attachment:  obj.attachment,
status:  obj.status,
});


if(this.prjprojectchangeForm.get('customfield').value!="" && this.prjprojectchangeForm.get('customfield').value!=null)this.customfieldjson=JSON.parse(this.prjprojectchangeForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectchangeForm.get('attachment').value!="" && this.prjprojectchangeForm.get('attachment').value!=null && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectchangeForm.get('attachment').value);

}
this.configservice.getList("changestatus").then(res => this.changestatusList = res as boconfigvalue[]);
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
    if (this.prjprojectchangeForm.controls[key] != null) {
if(false)
{
if(this.prjprojectmastersservice.formData[key]!=null && this.prjprojectmastersservice.formData[key]!=undefined && this.prjprojectmastersservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectmastersservice.formData[key])[0]["name"]);}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectchangeForm.controls[key].value);
    }
  }
  return ret;
}

private prjprojectchangetoggleOption(){
this.prjprojectchangeshowOption = this.prjprojectmastershowOption === true ? false : true;
}
async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectchangeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectchangeForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectchangeForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectchangeForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectchangeForm.controls[key] != null)
    {
        obj[key] = this.prjprojectchangeForm.controls[key].value;
    }
}
}
}
obj.changedate=new Date(this.prjprojectmasterForm.get('changedate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('changedate').value)+'  UTC' :null);
if(this.prjprojectchangeForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.prjprojectchangeForm.get('remarks').value);
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
        else if(key=="changedate")
this.prjprojectchangeForm.patchValue({"changedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.prjprojectchangeForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.prjprojectchangeForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectchangeForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectchangeForm.controls[key]!=undefined)
{
this.prjprojectchangeForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectchanges",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
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
changestatusonChange(evt:any){
let e=this.f.changestatus.value as any;
this.prjprojectchangeForm.patchValue({changestatusdesc:evt.options[evt.options.selectedIndex].text});
}

editprjprojectmasters() {
this.showview=false;
return false;
}




}


