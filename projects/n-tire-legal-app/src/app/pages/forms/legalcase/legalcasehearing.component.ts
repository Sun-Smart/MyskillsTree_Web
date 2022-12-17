import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { legalcasehearing } from './../../../model/legalcasehearing.model';
import { NgForm } from '@angular/forms';
import { legalcase } from './../../../model/legalcase.model';
import { legalcaseService } from './../../../service/legalcase.service';
import { legalcasehearingService } from './../../../service/legalcasehearing.service';
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

@Component({
selector: 'app-legalcasehearings',
templateUrl: './legalcasehearing.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class legalcasehearingComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 legalcasehearingForm: FormGroup;

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
legalcaseshowOption:boolean;
sourcekey:any;


constructor(
private nav: Location,
private keyboard: KeyboardShortcutsService,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
private legalcasehearingservice: legalcasehearingService,
private legalcaseservice: legalcaseService,
private ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
private configservice:boconfigvalueService,

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
this.legalcasehearingForm  = this.fb.group({
pk:[null],
hearingid: [null],
caseid: [null],
hearingdate: [null],
lawyerid: [null],
additionallawyerid1: [null],
additionallawyerid2: [null],
remarks: [null],
actiontobetaken: [null],
nexthearingdate: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcasehearingForm.controls; }


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
this.legalcasehearingForm.patchValue({
hearingdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
nexthearingdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.legalcaseservice.legalcasehearings.filter(x => (x as any).pkcol == ppk)[0];
this.legalcasehearingservice.formData = obj;
this.legalcasehearingForm.patchValue({
hearingid:  obj.hearingid,
caseid:  obj.caseid,
hearingdate: this.ngbDateParserFormatter.parse(obj.hearingdate as any),
lawyerid:  obj.lawyerid,
additionallawyerid1:  obj.additionallawyerid1,
additionallawyerid2:  obj.additionallawyerid2,
remarks:  obj.remarks,
actiontobetaken:  obj.actiontobetaken,
nexthearingdate: this.ngbDateParserFormatter.parse(obj.nexthearingdate as any),
attachment:  obj.attachment,
status:  obj.status,
});



}
}



getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.legalcasehearingForm.controls[key] != null) {
if(false)
{
if(this.legalcasesservice.formData[key]!=null && this.legalcasesservice.formData[key]!=undefined && this.legalcasesservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcasesservice.formData[key])[0]["name"]);}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcasehearingForm.controls[key].value);
    }
  }
  return ret;
}

private legalcasehearingtoggleOption(){
this.legalcasehearingshowOption = this.legalcaseshowOption === true ? false : true;
}
async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcasehearingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcasehearingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcasehearingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcasehearingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcasehearingForm.controls[key] != null)
    {
        obj[key] = this.legalcasehearingForm.controls[key].value;
    }
}
}
}
obj.hearingdate=new Date(this.legalcaseForm.get('hearingdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('hearingdate').value)+'  UTC' :null);
obj.nexthearingdate=new Date(this.legalcaseForm.get('nexthearingdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('nexthearingdate').value)+'  UTC' :null);
console.log(obj);
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
        else if(key=="hearingdate")
this.legalcasehearingForm.patchValue({"hearingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nexthearingdate")
this.legalcasehearingForm.patchValue({"nexthearingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcasehearingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcasehearingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcasehearingForm.controls[key]!=undefined)
{
this.legalcasehearingForm.controls[key].disable({onlySelf: true});
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

editlegalcases() {
this.showview=false;
return false;
}




}


