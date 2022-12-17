import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { hrmsemployeenominee } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeenominee.model';
import { NgForm } from '@angular/forms';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
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
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import {DynamicDialogConfig} from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
selector: 'app-hrmsemployeenominees',
templateUrl: './hrmsemployeenominee.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class hrmsemployeenomineeComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 hrmsemployeenomineeForm: FormGroup;
benefittypeList: boconfigvalue[]=[];
nominationendreasonList: boconfigvalue[]=[];

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


constructor(
private keyboard: KeyboardShortcutsService,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
private hrmsemployeeservice: hrmsemployeeService,
public ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.hrmsemployeenomineeForm  = this.fb.group({pk:[null],
nomineeid: [null],
employeeid: [null],
relationship: [null],
firstname: [null],
lastname: [null],
fromdate: [null],
todate: [null],
phone: [null],
email: [null],
details: [null],
benefittype: [null],
benefittypedesc: [null],
percentshare: [null],
nominationendreason: [null],
nominationendreasondesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeenomineeForm.controls; }


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
this.hrmsemployeenomineeForm.patchValue({
fromdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
todate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.hrmsemployeeservice.hrmsemployeenominees.filter(x => (x as any).pkcol == ppk)[0];
this.hrmsemployeenomineeForm.patchValue({
nomineeid:  obj.nomineeid,
employeeid:  obj.employeeid,
relationship:  obj.relationship,
firstname:  obj.firstname,
lastname:  obj.lastname,
fromdate: this.ngbDateParserFormatter.parse(obj.fromdate as any),
todate: this.ngbDateParserFormatter.parse(obj.todate as any),
phone:  obj.phone,
email:  obj.email,
details:  obj.details,
benefittype:  obj.benefittype,
benefittypedesc:  obj.benefittypedesc,
percentshare:  obj.percentshare,
nominationendreason:  obj.nominationendreason,
nominationendreasondesc:  obj.nominationendreasondesc,
status:  obj.status,
});



}
this.configservice.getList("benefittype").then((res:any) => this.benefittypeList = res as boconfigvalue[]);
this.configservice.getList("nominationendreason").then((res:any) => this.nominationendreasonList = res as boconfigvalue[]);
}



getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.hrmsemployeenomineeForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeenomineeForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeenomineeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeenomineeForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeenomineeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeenomineeForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeenomineeForm.controls[key] != null)
    {
        obj[key] = this.hrmsemployeenomineeForm.controls[key]!.value;
    }
}
}
}
obj.fromdate=this.ngbDateParserFormatter.format(this.hrmsemployeenomineeForm.get('fromdate')!.value);
obj.todate=this.ngbDateParserFormatter.format(this.hrmsemployeenomineeForm.get('todate')!.value);
console.log(obj);
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
        else if(key=="fromdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="todate")
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
        if(this.hrmsemployeenomineeForm.controls[key]!=null)
{
this.hrmsemployeenomineeForm.patchValue(json);
         if(bdisable)this.hrmsemployeenomineeForm.controls[key].disable({onlySelf: true});
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
benefittypeonChange(evt:any){
let e=this.f.benefittype!.value as any;
this.hrmsemployeenomineeForm.patchValue({benefittypedesc:evt.options[evt.options.selectedIndex].text});
}
nominationendreasononChange(evt:any){
let e=this.f.nominationendreason!.value as any;
this.hrmsemployeenomineeForm.patchValue({nominationendreasondesc:evt.options[evt.options.selectedIndex].text});
}

}


