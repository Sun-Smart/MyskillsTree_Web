import { crmcustomeraccountmasterService } from './../../../service/crmcustomeraccountmaster.service';
import { crmcustomeraccountmaster } from './../../../model/crmcustomeraccountmaster.model';
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
import { crmcustomermaster} from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
//detail table services
import { crmcustomeraccounttransaction } from './../../../model/crmcustomeraccounttransaction.model';
import { crmcustomeraccounttransactionComponent } from './../../../pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.component';
//FK services
import { erpfaaccountmaster,IerpfaaccountmasterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
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
selector: 'app-crmcustomeraccountmaster',
templateUrl: './crmcustomeraccountmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmcustomeraccountmasterComponent implements OnInit {
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
bfilterPopulatecrmcustomeraccountmasters:boolean=false;
datacrmcustomeraccountmasterscustomerid3:any=[];
datacrmcustomeraccountmastersproductid3:any=[];
datacrmcustomeraccountmastersholdingtype3:any=[];
datacrmcustomeraccountmasterscustomerholding3:any=[];
datacrmcustomeraccounttransactionscustomerid3:any=[];
datacrmcustomeraccounttransactionsaccountid3:any=[];
datacrmcustomeraccounttransactionstransactiontype3:any=[];
bfilterPopulatecrmcustomeraccounttransactions:boolean=false;
@ViewChild('tblcrmcustomeraccounttransactionssource',{static:false}) tblcrmcustomeraccounttransactionssource: Ng2SmartTableComponent;
 crmcustomeraccountmasterForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
productidList: lmsproductmaster[];
holdingtypeList: boconfigvalue[];
customerholdingList: boconfigvalue[];
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
crmcustomeraccountmastershowOption:boolean;
crmcustomeraccounttransactionshowOption:boolean;
sessiondata:any;
sourcekey:any;



crmcustomeraccounttransactionsvisiblelist:any;
crmcustomeraccounttransactionshidelist:any;

DeletedcrmcustomeraccounttransactionIDs: string="";
crmcustomeraccounttransactionsID: string = "1";
crmcustomeraccounttransactionsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private crmcustomeraccountmasterservice: crmcustomeraccountmasterService,
private crmcustomermasterservice: crmcustomermasterService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmsproductmasterservice:lmsproductmasterService,
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
this.crmcustomeraccountmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
accountid: [null],
customerid: [null],
customeriddesc: [null],
cifnumber: [null],
accountnumber: [null],
productid: [null],
productiddesc: [null],
accountopendate: [null],
holdingtype: [null],
holdingtypedesc: [null],
customerholding: [null],
customerholdingdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomeraccountmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmcustomeraccountmasterForm.dirty && this.crmcustomeraccountmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.accountid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.accountid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.accountid && pkDetail) {
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
let crmcustomeraccountmasterid = null;

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
this.formid=crmcustomeraccountmasterid;
//this.sharedService.alert(crmcustomeraccountmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcrmcustomeraccounttransactionsTableConfig();
  setTimeout(() => {
  this.SetcrmcustomeraccounttransactionsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.crmcustomeraccountmasterservice.formData && this.crmcustomeraccountmasterservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.crmcustomeraccountmasterForm.patchValue({
    customerid: this.crmcustomeraccountmasterservice.formData.customerid,
    customeriddesc: this.crmcustomeraccountmasterservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.crmcustomeraccountmasterForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("holdingtype").then(res => this.holdingtypeList = res as boconfigvalue[]);
this.configservice.getList("customerholding").then(res => this.customerholdingList = res as boconfigvalue[]);

//autocomplete
    this.crmcustomeraccountmasterservice.getcrmcustomeraccountmastersList().then(res => {
      this.pkList = res as crmcustomeraccountmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.accountnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.accountnumber;

//setting the flag that the screen is not touched 
this.crmcustomeraccountmasterForm.markAsUntouched();
this.crmcustomeraccountmasterForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.crmcustomeraccountmasterForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.crmcustomeraccountmasterForm != null)
this.crmcustomeraccountmasterForm.reset();
this.crmcustomeraccountmasterForm.patchValue({
});
setTimeout(() => {
this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions=[];
this.crmcustomeraccounttransactionsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let accountid = this.crmcustomeraccountmasterForm.get('accountid').value;
        if(accountid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomeraccountmasterservice.deletecrmcustomeraccountmaster(accountid).then(res =>
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
    this.crmcustomeraccountmasterForm.patchValue({
        accountid: null
    });
    if(this.crmcustomeraccountmasterservice.formData.accountid!=null)this.crmcustomeraccountmasterservice.formData.accountid=null;
for (let i=0;i<this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.length;i++) {
this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions[i].transactionid=null;
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
        else if(key=="accountopendate")
this.crmcustomeraccountmasterForm.patchValue({"accountopendate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.crmcustomeraccountmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmcustomeraccountmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmcustomeraccountmasterForm.controls[key]!=undefined)
{
this.crmcustomeraccountmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomeraccountmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.crmcustomeraccountmasterservice.formData.accountnumber!=null )
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
accountidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
cifnumberonChange(evt:any){
let e=evt.value;
}
accountnumberonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
this.crmcustomeraccountmasterForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
accountopendateonChange(evt:any){
let e=evt.value;
}
holdingtypeonChange(evt:any){
let e=this.f.holdingtype.value as any;
this.crmcustomeraccountmasterForm.patchValue({holdingtypedesc:evt.options[evt.options.selectedIndex].text});
}
customerholdingonChange(evt:any){
let e=this.f.customerholding.value as any;
this.crmcustomeraccountmasterForm.patchValue({customerholdingdesc:evt.options[evt.options.selectedIndex].text});
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
  


editcrmcustomeraccountmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmcustomeraccountmasterservice.getcrmcustomeraccountmastersByEID(pkcol).then(res => {

this.crmcustomeraccountmasterservice.formData=res.crmcustomeraccountmaster;
let formproperty=res.crmcustomeraccountmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmcustomeraccountmaster.pkcol;
this.formid=res.crmcustomeraccountmaster.accountid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmcustomeraccountmaster.accountid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmcustomeraccountmasterForm.patchValue({
accountid: res.crmcustomeraccountmaster.accountid,
customerid: res.crmcustomeraccountmaster.customerid,
customeriddesc: res.crmcustomeraccountmaster.customeriddesc,
cifnumber: res.crmcustomeraccountmaster.cifnumber,
accountnumber: res.crmcustomeraccountmaster.accountnumber,
productid: res.crmcustomeraccountmaster.productid,
productiddesc: res.crmcustomeraccountmaster.productiddesc,
accountopendate: this.ngbDateParserFormatter.parse(res.crmcustomeraccountmaster.accountopendate),
holdingtype: res.crmcustomeraccountmaster.holdingtype,
holdingtypedesc: res.crmcustomeraccountmaster.holdingtypedesc,
customerholding: res.crmcustomeraccountmaster.customerholding,
customerholdingdesc: res.crmcustomeraccountmaster.customerholdingdesc,
customfield: res.crmcustomeraccountmaster.customfield,
attachment: JSON.parse(res.crmcustomeraccountmaster.attachment),
status: res.crmcustomeraccountmaster.status,
statusdesc: res.crmcustomeraccountmaster.statusdesc,
});
this.crmcustomeraccounttransactionsvisiblelist=res.crmcustomeraccounttransactionsvisiblelist;
if(this.crmcustomeraccountmasterForm.get('customfield').value!=null && this.crmcustomeraccountmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.crmcustomeraccountmasterForm.get('customfield').value);
this.FillCustomField();
if(this.crmcustomeraccountmasterForm.get('attachment').value!=null && this.crmcustomeraccountmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.crmcustomeraccountmasterForm.get('attachment').value);
//Child Tables if any
this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions = res.crmcustomeraccounttransactions;
this.SetcrmcustomeraccounttransactionsTableConfig();
this.crmcustomeraccounttransactionsLoadTable();
  setTimeout(() => {
  this.SetcrmcustomeraccounttransactionsTableddConfig();
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
  for (let key in this.crmcustomeraccountmasterForm.controls) {
    if (this.crmcustomeraccountmasterForm.controls[key] != null) {
if(false)
{
if(this.crmcustomeraccountmasterservice.formData!=null && this.crmcustomeraccountmasterservice.formData[key]!=null  && this.crmcustomeraccountmasterservice.formData[key]!='[]' && this.crmcustomeraccountmasterservice.formData[key]!=undefined && this.crmcustomeraccountmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmcustomeraccountmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmcustomeraccountmasterservice.formData!=null && this.crmcustomeraccountmasterservice.formData[key]!=null   && this.crmcustomeraccountmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmcustomeraccountmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmcustomeraccountmasterservice.formData!=null && this.crmcustomeraccountmasterservice.formData[key]!=null   && this.crmcustomeraccountmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmcustomeraccountmasterservice.formData[key]+"'><div class='progress__number'>"+this.crmcustomeraccountmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomeraccountmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmcustomeraccountmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.crmcustomeraccountmasterForm.value;
obj.accountopendate=new Date(this.crmcustomeraccountmasterForm.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmasterForm.get('accountopendate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private crmcustomeraccountmastertoggleOption(){
this.crmcustomeraccountmastershowOption = this.crmcustomeraccountmastershowOption === true ? false : true;
}

private crmcustomeraccounttransactiontoggleOption(){
this.crmcustomeraccounttransactionshowOption = this.crmcustomeraccounttransactionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomeraccountmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomeraccountmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomeraccountmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmcustomeraccountmasterservice.formData=this.crmcustomeraccountmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomeraccountmasterForm.controls[key] != null)
    {
        this.crmcustomeraccountmasterservice.formData[key] = this.crmcustomeraccountmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.crmcustomeraccountmasterservice.formData.accountopendate=new Date(this.crmcustomeraccountmasterForm.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmasterForm.get('accountopendate').value)+'  UTC' :null);
this.crmcustomeraccountmasterservice.formData.customfield=JSON.stringify(customfields);
this.crmcustomeraccountmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.crmcustomeraccountmasterservice.formData.DeletedcrmcustomeraccounttransactionIDs = this.DeletedcrmcustomeraccounttransactionIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.crmcustomeraccountmasterservice.formData);
this.crmcustomeraccountmasterservice.formData=this.crmcustomeraccountmasterForm.value;
this.crmcustomeraccountmasterservice.saveOrUpdatecrmcustomeraccountmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.crmcustomeraccounttransactionssource.data)
{
    for (let i = 0; i < this.crmcustomeraccounttransactionssource.data.length; i++)
    {
        if (this.crmcustomeraccounttransactionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.crmcustomeraccounttransactionssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomeraccountmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmcustomeraccountmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomeraccountmaster);
}
else
{
this.FillData(res);
}
}
this.crmcustomeraccountmasterForm.markAsUntouched();
this.crmcustomeraccountmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.crmcustomeraccountmasterForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.crmcustomeraccountmasterForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcrmcustomeraccounttransaction(event:any,transactionid:any, accountid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(crmcustomeraccounttransactionComponent, 
{
data:  {  showview:false,save:false,event,transactionid, accountid,visiblelist:this.crmcustomeraccounttransactionsvisiblelist,  hidelist:this.crmcustomeraccounttransactionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.crmcustomeraccounttransactionssource.add(res);
this.crmcustomeraccounttransactionssource.refresh();
}
else
{
this.crmcustomeraccounttransactionssource.update(event.data, res);
}
}
});
}

onDeletecrmcustomeraccounttransaction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcrmcustomeraccounttransactionIDs += childID + ",";
this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes crmcustomeraccounttransactions
crmcustomeraccounttransactionssettings:any;
crmcustomeraccounttransactionssource: any;

showcrmcustomeraccounttransactionsCheckbox()
{
debugger;
if(this.tblcrmcustomeraccounttransactionssource.settings['selectMode']== 'multi')this.tblcrmcustomeraccounttransactionssource.settings['selectMode']= 'single';
else
this.tblcrmcustomeraccounttransactionssource.settings['selectMode']= 'multi';
this.tblcrmcustomeraccounttransactionssource.initGrid();
}
deletecrmcustomeraccounttransactionsAll()
{
this.tblcrmcustomeraccounttransactionssource.settings['selectMode'] = 'single';
}
showcrmcustomeraccounttransactionsFilter()
{
  setTimeout(() => {
  this.SetcrmcustomeraccounttransactionsTableddConfig();
  });
      if(this.tblcrmcustomeraccounttransactionssource.settings!=null)this.tblcrmcustomeraccounttransactionssource.settings['hideSubHeader'] =!this.tblcrmcustomeraccounttransactionssource.settings['hideSubHeader'];
this.tblcrmcustomeraccounttransactionssource.initGrid();
}
showcrmcustomeraccounttransactionsInActive()
{
}
enablecrmcustomeraccounttransactionsInActive()
{
}
async SetcrmcustomeraccounttransactionsTableddConfig()
{
if(!this.bfilterPopulatecrmcustomeraccounttransactions){

this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res=>
{
var dataaccountid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccounttransactionsaccountid3.push(defaultobj);
for(let i=0; i<dataaccountid2.length; i++){
var obj= { value: dataaccountid2[i].accountid, title:dataaccountid2[i].accountname};
this.datacrmcustomeraccounttransactionsaccountid3.push(obj);
}
if((this.tblcrmcustomeraccounttransactionssource.settings as any).columns['accountid'])
{
(this.tblcrmcustomeraccounttransactionssource.settings as any).columns['accountid'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomeraccounttransactionsaccountid3));
this.tblcrmcustomeraccounttransactionssource.initGrid();
}
});

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccounttransactionscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.datacrmcustomeraccounttransactionscustomerid3.push(obj);
}
if((this.tblcrmcustomeraccounttransactionssource.settings as any).columns['customerid'])
{
(this.tblcrmcustomeraccounttransactionssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.datacrmcustomeraccounttransactionscustomerid3));
this.tblcrmcustomeraccounttransactionssource.initGrid();
}
});

this.configservice.getList("fatxntype").then(res=>
{
var datatransactiontype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacrmcustomeraccounttransactionstransactiontype3.push(defaultobj);
for(let i=0; i<datatransactiontype2.length; i++){
var obj= { value: datatransactiontype2[i].configkey, title: datatransactiontype2[i].configtext};
this.datacrmcustomeraccounttransactionstransactiontype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcrmcustomeraccounttransactionssource.settings);
if(clone.columns['transactiontype']!=undefined)clone.columns['transactiontype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccounttransactionstransactiontype3)), }, };
if(clone.columns['transactiontype']!=undefined)clone.columns['transactiontype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacrmcustomeraccounttransactionstransactiontype3)), }, };
this.tblcrmcustomeraccounttransactionssource.settings =  clone;
this.tblcrmcustomeraccounttransactionssource.initGrid();
});
}
this.bfilterPopulatecrmcustomeraccounttransactions=true;
}
async crmcustomeraccounttransactionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcrmcustomeraccounttransactionsTableConfig()
{
this.crmcustomeraccounttransactionssettings = {
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
customerid: {
title: 'Customer',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'pofgf',reportcode:'pofgf',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomeraccounttransactionscustomerid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
cifnumber: {
title: 'C I F Number',
type: '',
filter:true,
},
accountnumber: {
title: 'Account Number',
type: '',
filter:true,
},
date: {
title: 'Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
amount: {
title: 'Amount',
type: '',
filter:true,
},
transactiontype: {
title: 'Transaction Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacrmcustomeraccounttransactionstransactiontype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
closingbalance: {
title: 'Closing Balance',
type: '',
filter:true,
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
},
};
}
crmcustomeraccounttransactionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactionsID)>=0)
{
this.crmcustomeraccounttransactionssource=new LocalDataSource();
this.crmcustomeraccounttransactionssource.load(this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions as  any as LocalDataSource);
this.crmcustomeraccounttransactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
crmcustomeraccounttransactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.length == 0)
{
    this.tblcrmcustomeraccounttransactionssource.grid.createFormShown = true;
}
else
{
    let obj = new crmcustomeraccounttransaction();
    this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.push(obj);
    this.crmcustomeraccounttransactionssource.refresh();
    if ((this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.length / this.crmcustomeraccounttransactionssource.getPaging().perPage).toFixed(0) + 1 != this.crmcustomeraccounttransactionssource.getPaging().page)
    {
        this.crmcustomeraccounttransactionssource.setPage((this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.length / this.crmcustomeraccounttransactionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcrmcustomeraccounttransactionssource.grid.edit(this.tblcrmcustomeraccounttransactionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.crmcustomeraccounttransactionssource.data.indexOf(event.data);
this.onDeletecrmcustomeraccounttransaction(event,event.data.transactionid,((this.crmcustomeraccounttransactionssource.getPaging().page-1) *this.crmcustomeraccounttransactionssource.getPaging().perPage)+index);
this.crmcustomeraccounttransactionssource.refresh();
break;
}
}

*/
crmcustomeraccounttransactionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcrmcustomeraccounttransaction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcrmcustomeraccounttransaction(event,event.data.transactionid,this.formid);
break;
case 'delete':
this.onDeletecrmcustomeraccounttransaction(event,event.data.transactionid,((this.crmcustomeraccounttransactionssource.getPaging().page-1) *this.crmcustomeraccounttransactionssource.getPaging().perPage)+event.index);
this.crmcustomeraccounttransactionssource.refresh();
break;
}
}
crmcustomeraccounttransactionsonDelete(obj) {
let transactionid=obj.data.transactionid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomeraccountmasterservice.deletecrmcustomeraccountmaster(transactionid).then(res=>
this.crmcustomeraccounttransactionsLoadTable()
);
}
}
crmcustomeraccounttransactionsPaging(val)
{
debugger;
this.crmcustomeraccounttransactionssource.setPaging(1, val, true);
}

handlecrmcustomeraccounttransactionsGridSelected(event:any) {
this.crmcustomeraccounttransactionsselectedindex=this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.findIndex(i => i.transactionid === event.data.transactionid);
}
IscrmcustomeraccounttransactionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes crmcustomeraccounttransactions

}



