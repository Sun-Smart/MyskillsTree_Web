import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { erpfapaymentdetail } from './../../../model/erpfapaymentdetail.model';
import { NgForm } from '@angular/forms';
import { erpfapayment } from './../../../model/erpfapayment.model';
import { erpfapaymentService } from './../../../service/erpfapayment.service';
import { erpfapaymentdetailService } from './../../../service/erpfapaymentdetail.service';
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
selector: 'app-erpfapaymentdetails',
templateUrl: './erpfapaymentdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class erpfapaymentdetailComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 erpfapaymentdetailForm: FormGroup;

viewhtml:any='';
showview:boolean=false;
theme:string="";
//formData:any;
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
private erpfapaymentdetailservice: erpfapaymentdetailService,
private erpfapaymentservice: erpfapaymentService,
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
this.erpfapaymentdetailForm  = this.fb.group({pk:[null],
paymentdetailid: [null],
paymentid: [null],
paymentdetails: [null],
sourcefield: [null],
voucherid: [null],
voucherreference: [null],
voucherdate: [null],
voucheramount: [null],
paid: [null],
balance: [null],
narration: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfapaymentdetailForm.controls; }


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
this.erpfapaymentdetailForm.patchValue({
voucherdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.erpfapaymentservice.erpfapaymentdetails.filter(x => (x as any).pkcol == ppk)[0];
this.erpfapaymentdetailservice.formData = obj;
this.erpfapaymentdetailForm.patchValue({
paymentdetailid:  obj.paymentdetailid,
paymentid:  obj.paymentid,
paymentdetails:  obj.paymentdetails,
sourcefield:  obj.sourcefield,
voucherid:  obj.voucherid,
voucherreference:  obj.voucherreference,
voucherdate: this.ngbDateParserFormatter.parse(obj.voucherdate as any),
voucheramount:  obj.voucheramount,
paid:  obj.paid,
balance:  obj.balance,
narration:  obj.narration,
status:  obj.status,
});



}
}



getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.erpfapaymentdetailForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfapaymentdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.erpfapaymentdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfapaymentdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfapaymentdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfapaymentdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfapaymentdetailForm.controls[key] != null)
    {
        obj[key] = this.erpfapaymentdetailForm.controls[key].value;
    }
}
}
}
obj.voucherdate=this.ngbDateParserFormatter.format(this.erpfapaymentdetailForm.get('voucherdate').value);
console.log(obj);
this.dialogRef.close(obj);
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
        else if(key=="voucherdate")
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
        if(this.erpfapaymentdetailForm.controls[key]!=null)
{
this.erpfapaymentdetailForm.patchValue(json);
         if(bdisable)this.erpfapaymentdetailForm.controls[key].disable({onlySelf: true});
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

}


