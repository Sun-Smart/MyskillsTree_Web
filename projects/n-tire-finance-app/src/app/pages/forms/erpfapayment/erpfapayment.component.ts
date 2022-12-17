import { erpfapaymentService } from './../../../service/erpfapayment.service';
import { erpfapayment } from './../../../model/erpfapayment.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

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
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { erpfabankaccount} from './../../../model/erpfabankaccount.model';
import { erpfabankaccountComponent } from './../../../pages/forms/erpfabankaccount/erpfabankaccount.component';
import { erpfabankaccountService } from './../../../service/erpfabankaccount.service';
//popups
//detail table services
import { erpfapaymentdetail } from './../../../model/erpfapaymentdetail.model';
import { erpfapaymentdetailComponent } from './../../../pages/forms/erpfapaymentdetail/erpfapaymentdetail.component';
//FK services
import { erpsupplierinvoice,IerpsupplierinvoiceResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsupplierinvoice.model';
import { erpsupplierinvoiceComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierinvoice/erpsupplierinvoice.component';
import { erpsupplierinvoiceService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierinvoice.service';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-erpfapayment',
templateUrl: './erpfapayment.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfapaymentComponent implements OnInit {
hidelist:any=[];
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
bfilterPopulateerpfapayments:boolean=false;
dataerpfapaymentspartytype3:any=[];
dataerpfapaymentsbankaccountid3:any=[];
dataerpfapaymentspaymenttype3:any=[];
dataerpfapaymentsbankstatus3:any=[];
dataerpfapaymentdetailsinvoiceid3:any=[];
bfilterPopulateerpfapaymentdetails:boolean=false;
@ViewChild('tblerpfapaymentdetailssource',{static:false}) tblerpfapaymentdetailssource: Ng2SmartTableComponent;
 erpfapaymentForm: FormGroup;
partytypeList: boconfigvalue[];
bankaccountidList: erpfabankaccount[];
paymenttypeList: boconfigvalue[];
bankstatusList: boconfigvalue[];
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
erpfapaymentshowOption:boolean;
erpfapaymentdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpfapaymentdetailsvisiblelist:any;
erpfapaymentdetailshidelist:any;

DeletederpfapaymentdetailIDs: string="";
erpfapaymentdetailsID: string = "1";
erpfapaymentdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfapaymentservice: erpfapaymentService,
private erpsupplierinvoiceservice: erpsupplierinvoiceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpfabankaccountservice:erpfabankaccountService,
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
this.erpfapaymentForm  = this.fb.group({
pk:[null],
ImageName: [null],
paymentid: [null],
paymentdate: [null],
paymentreference: [null],
partytype: [null],
partytypedesc: [null],
partyid: [null],
totalpayable: [null],
approvedamount: [null],
bankaccountid: [null],
bankaccountiddesc: [null],
paymentmode: [null],
onhold: [null],
remittosupplier: [null],
duedate: [null],
instrumentno: [null],
instrumentdate: [null],
narration: [null],
receiptreference: [null],
transactiondate: [null],
paymenttype: [null],
paymenttypedesc: [null],
transactionreference: [null],
bankstatus: [null],
bankstatusdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfapaymentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfapaymentForm.dirty && this.erpfapaymentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.paymentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.paymentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.paymentid && pkDetail) {
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
this.viewhtml=this.sessionService.getViewHtml();

debugger;
//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let erpfapaymentid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
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
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=erpfapaymentid;
//this.sharedService.alert(erpfapaymentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpfapaymentdetailsTableConfig();
  setTimeout(() => {
  this.SeterpfapaymentdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("partytype").then(res => this.partytypeList = res as boconfigvalue[]);
this.erpfabankaccountservice.geterpfabankaccountsList().then(res => 
{
this.bankaccountidList = res as erpfabankaccount[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("paymenttype").then(res => this.paymenttypeList = res as boconfigvalue[]);
this.configservice.getList("bankstatus").then(res => this.bankstatusList = res as boconfigvalue[]);

//autocomplete
    this.erpfapaymentservice.geterpfapaymentsList().then(res => {
      this.pkList = res as erpfapayment[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.erpfapaymentForm.markAsUntouched();
this.erpfapaymentForm.markAsPristine();
}



resetForm() {
if (this.erpfapaymentForm != null)
this.erpfapaymentForm.reset();
this.erpfapaymentForm.patchValue({
});
setTimeout(() => {
this.erpfapaymentservice.erpfapaymentdetails=[];
this.erpfapaymentdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let paymentid = this.erpfapaymentForm.get('paymentid').value;
        if(paymentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfapaymentservice.deleteerpfapayment(paymentid).then(res =>
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
    this.erpfapaymentForm.patchValue({
        paymentid: null
    });
    if(this.erpfapaymentservice.formData.paymentid!=null)this.erpfapaymentservice.formData.paymentid=null;
for (let i=0;i<this.erpfapaymentservice.erpfapaymentdetails.length;i++) {
this.erpfapaymentservice.erpfapaymentdetails[i].paymentdetailid=null;
}
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
        else if(key=="paymentdate")
this.erpfapaymentForm.patchValue({"paymentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.erpfapaymentForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="instrumentdate")
this.erpfapaymentForm.patchValue({"instrumentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="transactiondate")
this.erpfapaymentForm.patchValue({"transactiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpfapaymentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpfapaymentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpfapaymentForm.controls[key]!=undefined)
{
this.erpfapaymentForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpfapayments",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  )
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
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
paymentidonChange(evt:any){
let e=evt.value;
}
paymentdateonChange(evt:any){
let e=evt.value;
}
paymentreferenceonChange(evt:any){
let e=evt.value;
}
partytypeonChange(evt:any){
let e=this.f.partytype.value as any;
this.erpfapaymentForm.patchValue({partytypedesc:evt.options[evt.options.selectedIndex].text});
}
partyidonChange(evt:any){
let e=evt.value;
}
totalpayableonChange(evt:any){
let e=evt.value;
}
approvedamountonChange(evt:any){
let e=evt.value;
}
bankaccountidonChange(evt:any){
let e=evt.value;
this.erpfapaymentForm.patchValue({bankaccountiddesc:evt.options[evt.options.selectedIndex].text});
}
paymentmodeonChange(evt:any){
let e=evt.value;
}
onholdonChange(evt:any){
let e=evt.value;
}
remittosupplieronChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
instrumentnoonChange(evt:any){
let e=evt.value;
}
instrumentdateonChange(evt:any){
let e=evt.value;
}
narrationonChange(evt:any){
let e=evt.value;
}
receiptreferenceonChange(evt:any){
let e=evt.value;
}
transactiondateonChange(evt:any){
let e=evt.value;
}
paymenttypeonChange(evt:any){
let e=this.f.paymenttype.value as any;
this.erpfapaymentForm.patchValue({paymenttypedesc:evt.options[evt.options.selectedIndex].text});
}
transactionreferenceonChange(evt:any){
let e=evt.value;
}
bankstatusonChange(evt:any){
let e=this.f.bankstatus.value as any;
this.erpfapaymentForm.patchValue({bankstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editerpfapayments() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpfapaymentservice.geterpfapaymentsByEID(pkcol).then(res => {

this.erpfapaymentservice.formData=res.erpfapayment;
let formproperty=res.erpfapayment.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpfapayment.pkcol;
this.formid=res.erpfapayment.paymentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpfapayment.paymentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfapaymentForm.patchValue({
paymentid: res.erpfapayment.paymentid,
paymentdate: this.ngbDateParserFormatter.parse(res.erpfapayment.paymentdate),
paymentreference: res.erpfapayment.paymentreference,
partytype: res.erpfapayment.partytype,
partytypedesc: res.erpfapayment.partytypedesc,
partyid: res.erpfapayment.partyid,
totalpayable: res.erpfapayment.totalpayable,
approvedamount: res.erpfapayment.approvedamount,
bankaccountid: res.erpfapayment.bankaccountid,
bankaccountiddesc: res.erpfapayment.bankaccountiddesc,
paymentmode: res.erpfapayment.paymentmode,
onhold: res.erpfapayment.onhold,
remittosupplier: res.erpfapayment.remittosupplier,
duedate: this.ngbDateParserFormatter.parse(res.erpfapayment.duedate),
instrumentno: res.erpfapayment.instrumentno,
instrumentdate: this.ngbDateParserFormatter.parse(res.erpfapayment.instrumentdate),
narration: res.erpfapayment.narration,
receiptreference: res.erpfapayment.receiptreference,
transactiondate: this.ngbDateParserFormatter.parse(res.erpfapayment.transactiondate),
paymenttype: res.erpfapayment.paymenttype,
paymenttypedesc: res.erpfapayment.paymenttypedesc,
transactionreference: res.erpfapayment.transactionreference,
bankstatus: res.erpfapayment.bankstatus,
bankstatusdesc: res.erpfapayment.bankstatusdesc,
customfield: res.erpfapayment.customfield,
attachment: JSON.parse(res.erpfapayment.attachment),
status: res.erpfapayment.status,
statusdesc: res.erpfapayment.statusdesc,
});
this.erpfapaymentdetailsvisiblelist=res.erpfapaymentdetailsvisiblelist;
if(this.erpfapaymentForm.get('customfield').value!=null && this.erpfapaymentForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpfapaymentForm.get('customfield').value);
this.FillCustomField();
if(this.erpfapaymentForm.get('attachment').value!=null && this.erpfapaymentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpfapaymentForm.get('attachment').value);
//Child Tables if any
this.erpfapaymentservice.erpfapaymentdetails = res.erpfapaymentdetails;
this.SeterpfapaymentdetailsTableConfig();
this.erpfapaymentdetailsLoadTable();
  setTimeout(() => {
  this.SeterpfapaymentdetailsTableddConfig();
  });
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
  for (let key in this.erpfapaymentForm.controls) {
    if (this.erpfapaymentForm.controls[key] != null) {
if(false)
{
if(this.erpfapaymentservice.formData!=null && this.erpfapaymentservice.formData[key]!=null  && this.erpfapaymentservice.formData[key]!='[]' && this.erpfapaymentservice.formData[key]!=undefined && this.erpfapaymentservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpfapaymentservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpfapaymentservice.formData!=null && this.erpfapaymentservice.formData[key]!=null   && this.erpfapaymentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpfapaymentservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpfapaymentservice.formData!=null && this.erpfapaymentservice.formData[key]!=null   && this.erpfapaymentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpfapaymentservice.formData[key]+"'><div class='progress__number'>"+this.erpfapaymentservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfapaymentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfapaymentForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpfapaymentForm.value;
obj.paymentdate=new Date(this.erpfapaymentForm.get('paymentdate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('paymentdate').value)+'  UTC' :null);
obj.duedate=new Date(this.erpfapaymentForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('duedate').value)+'  UTC' :null);
obj.instrumentdate=new Date(this.erpfapaymentForm.get('instrumentdate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('instrumentdate').value)+'  UTC' :null);
obj.transactiondate=new Date(this.erpfapaymentForm.get('transactiondate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('transactiondate').value)+'  UTC' :null);
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

private erpfapaymenttoggleOption(){
this.erpfapaymentshowOption = this.erpfapaymentshowOption === true ? false : true;
}

private erpfapaymentdetailtoggleOption(){
this.erpfapaymentdetailshowOption = this.erpfapaymentdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpfapaymentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfapaymentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfapaymentForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfapaymentservice.formData=this.erpfapaymentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfapaymentForm.controls[key] != null)
    {
        this.erpfapaymentservice.formData[key] = this.erpfapaymentForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpfapaymentservice.formData.paymentdate=new Date(this.erpfapaymentForm.get('paymentdate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('paymentdate').value)+'  UTC' :null);
this.erpfapaymentservice.formData.duedate=new Date(this.erpfapaymentForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('duedate').value)+'  UTC' :null);
this.erpfapaymentservice.formData.instrumentdate=new Date(this.erpfapaymentForm.get('instrumentdate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('instrumentdate').value)+'  UTC' :null);
this.erpfapaymentservice.formData.transactiondate=new Date(this.erpfapaymentForm.get('transactiondate').value ? this.ngbDateParserFormatter.format(this.erpfapaymentForm.get('transactiondate').value)+'  UTC' :null);
if(customfields!=null)this.erpfapaymentservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpfapaymentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpfapaymentservice.formData.DeletederpfapaymentdetailIDs = this.DeletederpfapaymentdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpfapaymentservice.formData);
this.erpfapaymentservice.formData=this.erpfapaymentForm.value;
this.erpfapaymentservice.saveOrUpdateerpfapayments().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpfapaymentdetailssource.data)
{
    for (let i = 0; i < this.erpfapaymentdetailssource.data.length; i++)
    {
        if (this.erpfapaymentdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpfapaymentdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpfapayment);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfapaymentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpfapayment);
}
else
{
this.FillData(res);
}
}
this.erpfapaymentForm.markAsUntouched();
this.erpfapaymentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbankaccountid( bankaccountid) {
/*let ScreenType='2';
this.dialog.open(erpfabankaccountComponent, 
{
data: {bankaccountid:this.erpfapaymentForm.get('bankaccountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpfapaymentdetail(event:any,paymentdetailid:any, paymentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpfapaymentdetailComponent, 
{
data:  {  showview:false,save:false,event,paymentdetailid, paymentid,visiblelist:this.erpfapaymentdetailsvisiblelist,  hidelist:this.erpfapaymentdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpfapaymentdetailssource.add(res);
this.erpfapaymentdetailssource.refresh();
}
else
{
this.erpfapaymentdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpfapaymentdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfapaymentdetailIDs += childID + ",";
this.erpfapaymentservice.erpfapaymentdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpfapaymentdetails
erpfapaymentdetailssettings:any;
erpfapaymentdetailssource: any;

showerpfapaymentdetailsCheckbox()
{
debugger;
if(this.tblerpfapaymentdetailssource.settings['selectMode']== 'multi')this.tblerpfapaymentdetailssource.settings['selectMode']= 'single';
else
this.tblerpfapaymentdetailssource.settings['selectMode']= 'multi';
this.tblerpfapaymentdetailssource.initGrid();
}
deleteerpfapaymentdetailsAll()
{
this.tblerpfapaymentdetailssource.settings['selectMode'] = 'single';
}
showerpfapaymentdetailsFilter()
{
  setTimeout(() => {
  this.SeterpfapaymentdetailsTableddConfig();
  });
      if(this.tblerpfapaymentdetailssource.settings!=null)this.tblerpfapaymentdetailssource.settings['hideSubHeader'] =!this.tblerpfapaymentdetailssource.settings['hideSubHeader'];
this.tblerpfapaymentdetailssource.initGrid();
}
showerpfapaymentdetailsInActive()
{
}
enableerpfapaymentdetailsInActive()
{
}
async SeterpfapaymentdetailsTableddConfig()
{
if(!this.bfilterPopulateerpfapaymentdetails){
}
this.bfilterPopulateerpfapaymentdetails=true;
}
async erpfapaymentdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpfapaymentdetailsTableConfig()
{
this.erpfapaymentdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
paymentdetails: {
title: 'Payment Details',
type: '',
filter:true,
},
voucherid: {
title: 'Voucher',
type: 'number',
filter:true,
},
voucherreference: {
title: 'Voucher Reference',
type: '',
filter:true,
},
voucherdate: {
title: 'Voucher Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
voucheramount: {
title: 'Voucher Amount',
type: 'number',
filter:true,
},
paid: {
title: 'Pa',
type: '',
filter:true,
},
balance: {
title: 'Balance',
type: '',
filter:true,
},
narration: {
title: 'Narration',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
erpfapaymentdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfapaymentdetailsID)>=0)
{
this.erpfapaymentdetailssource=new LocalDataSource();
this.erpfapaymentdetailssource.load(this.erpfapaymentservice.erpfapaymentdetails as  any as LocalDataSource);
this.erpfapaymentdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpfapaymentdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpfapaymentservice.erpfapaymentdetails.length == 0)
{
    this.tblerpfapaymentdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpfapaymentdetail();
    this.erpfapaymentservice.erpfapaymentdetails.push(obj);
    this.erpfapaymentdetailssource.refresh();
    if ((this.erpfapaymentservice.erpfapaymentdetails.length / this.erpfapaymentdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpfapaymentdetailssource.getPaging().page)
    {
        this.erpfapaymentdetailssource.setPage((this.erpfapaymentservice.erpfapaymentdetails.length / this.erpfapaymentdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpfapaymentdetailssource.grid.edit(this.tblerpfapaymentdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpfapaymentdetailssource.data.indexOf(event.data);
this.onDeleteerpfapaymentdetail(event,event.data.paymentdetailid,((this.erpfapaymentdetailssource.getPaging().page-1) *this.erpfapaymentdetailssource.getPaging().perPage)+index);
this.erpfapaymentdetailssource.refresh();
break;
}
}

*/
erpfapaymentdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpfapaymentdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpfapaymentdetail(event,event.data.paymentdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpfapaymentdetail(event,event.data.paymentdetailid,((this.erpfapaymentdetailssource.getPaging().page-1) *this.erpfapaymentdetailssource.getPaging().perPage)+event.index);
this.erpfapaymentdetailssource.refresh();
break;
}
}
erpfapaymentdetailsonDelete(obj) {
let paymentdetailid=obj.data.paymentdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpfapaymentservice.deleteerpfapayment(paymentdetailid).then(res=>
this.erpfapaymentdetailsLoadTable()
);
}
}
erpfapaymentdetailsPaging(val)
{
debugger;
this.erpfapaymentdetailssource.setPaging(1, val, true);
}

handleerpfapaymentdetailsGridSelected(event:any) {
this.erpfapaymentdetailsselectedindex=this.erpfapaymentservice.erpfapaymentdetails.findIndex(i => i.paymentdetailid === event.data.paymentdetailid);
}
IserpfapaymentdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfapaymentdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpfapaymentdetails

}



