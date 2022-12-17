import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { erpfacustomerreceiptdetail } from './../../../model/erpfacustomerreceiptdetail.model';
import { NgForm } from '@angular/forms';
import { erpfacustomerreceipt } from './../../../model/erpfacustomerreceipt.model';
import { erpfacustomerreceiptService } from './../../../service/erpfacustomerreceipt.service';
import { erpfacustomerreceiptdetailService } from './../../../service/erpfacustomerreceiptdetail.service';
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
import { erpcustomerinvoice,IerpcustomerinvoiceResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpcustomerinvoice.model';
import { erpcustomerinvoiceService } from '../../../../../../n-tire-procurement-app/src/app/service/erpcustomerinvoice.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import {DynamicDialogConfig} from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
selector: 'app-erpfacustomerreceiptdetails',
templateUrl: './erpfacustomerreceiptdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class erpfacustomerreceiptdetailComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 erpfacustomerreceiptdetailForm: FormGroup;
invoiceidList: erpcustomerinvoice[];

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
private erpfacustomerreceiptdetailservice: erpfacustomerreceiptdetailService,
private erpfacustomerreceiptservice: erpfacustomerreceiptService,
private ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
private configservice:boconfigvalueService,
private erpcustomerinvoiceservice:erpcustomerinvoiceService,

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
this.erpfacustomerreceiptdetailForm  = this.fb.group({pk:[null],
receiptdetailid: [null],
receiptid: [null],
receiptdetails: [null],
invoiceid: [null],
invoiceiddesc: [null],
customerreference: [null],
invoicedate: [null],
totalvalue: [null],
discountamount: [null],
tax1: [null],
tax2: [null],
taxdeduction: [null],
othercharges: [null],
invoiceamount: [null],
paid: [null],
balance: [null],
narration: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfacustomerreceiptdetailForm.controls; }


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
this.erpfacustomerreceiptdetailForm.patchValue({
invoicedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails.filter(x => (x as any).pkcol == ppk)[0];
this.erpfacustomerreceiptdetailservice.formData = obj;
this.erpfacustomerreceiptdetailForm.patchValue({
receiptdetailid:  obj.receiptdetailid,
receiptid:  obj.receiptid,
receiptdetails:  obj.receiptdetails,
invoiceid:  obj.invoiceid,
invoiceiddesc:  obj.invoiceiddesc,
customerreference:  obj.customerreference,
invoicedate: this.ngbDateParserFormatter.parse(obj.invoicedate as any),
totalvalue:  obj.totalvalue,
discountamount:  obj.discountamount,
tax1:  obj.tax1,
tax2:  obj.tax2,
taxdeduction:  obj.taxdeduction,
othercharges:  obj.othercharges,
invoiceamount:  obj.invoiceamount,
paid:  obj.paid,
balance:  obj.balance,
narration:  obj.narration,
status:  obj.status,
});



}
this.erpcustomerinvoiceservice.geterpcustomerinvoicesList().then(res => 
{
this.invoiceidList = res as erpcustomerinvoice[];
}
);
}



getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.erpfacustomerreceiptdetailForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfacustomerreceiptdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.erpfacustomerreceiptdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfacustomerreceiptdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfacustomerreceiptdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfacustomerreceiptdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfacustomerreceiptdetailForm.controls[key] != null)
    {
        obj[key] = this.erpfacustomerreceiptdetailForm.controls[key].value;
    }
}
}
}
obj.invoicedate=this.ngbDateParserFormatter.format(this.erpfacustomerreceiptdetailForm.get('invoicedate').value);
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
        else if(key=="invoicedate")
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
        if(this.erpfacustomerreceiptdetailForm.controls[key]!=null)
{
this.erpfacustomerreceiptdetailForm.patchValue(json);
         if(bdisable)this.erpfacustomerreceiptdetailForm.controls[key].disable({onlySelf: true});
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
receiptdetailidonChange(evt:any){
let e=evt.value;
}
receiptidonChange(evt:any){
let e=evt.value;
}
receiptdetailsonChange(evt:any){
let e=evt.value;
}
invoiceidonChange(evt:any){
let e=evt.value;
this.erpfacustomerreceiptdetailForm.patchValue({invoiceiddesc:evt.options[evt.options.selectedIndex].text});
}
customerreferenceonChange(evt:any){
let e=evt.value;
}
invoicedateonChange(evt:any){
let e=evt.value;
}
totalvalueonChange(evt:any){
let e=evt.value;
}
discountamountonChange(evt:any){
let e=evt.value;
}
tax1onChange(evt:any){
let e=evt.value;
}
tax2onChange(evt:any){
let e=evt.value;
}
taxdeductiononChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
invoiceamountonChange(evt:any){
let e=evt.value;
}
paidonChange(evt:any){
let e=evt.value;
}
balanceonChange(evt:any){
let e=evt.value;
}
narrationonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

AddOrEditinvoiceid( invoiceid) {
let ScreenType='2';
/*this.dialog.open(erpcustomerinvoiceComponent, 
{
data: { ScreenType }
} 
).onClose.subscribe(res => {
this.erpcustomerinvoiceservice.geterpcustomerinvoicesList().then(res => this.invoiceidList = res as erpcustomerinvoice[]);
});*/
}


}


