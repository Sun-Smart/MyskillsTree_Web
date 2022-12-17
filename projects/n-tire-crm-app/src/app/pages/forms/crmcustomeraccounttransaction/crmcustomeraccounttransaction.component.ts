import { crmcustomeraccounttransactionService } from './../../../service/crmcustomeraccounttransaction.service';
import { crmcustomeraccounttransaction } from './../../../model/crmcustomeraccounttransaction.model';
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
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
import { crmcustomermaster} from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
//popups
//detail table services
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-crmcustomeraccounttransaction',
templateUrl: './crmcustomeraccounttransaction.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmcustomeraccounttransactionComponent implements OnInit {
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
bfilterPopulatecrmcustomeraccounttransactions:boolean=false;
datacrmcustomeraccounttransactionsaccountid3:any=[];
datacrmcustomeraccounttransactionscustomerid3:any=[];
datacrmcustomeraccounttransactionstransactiontype3:any=[];
 crmcustomeraccounttransactionForm: FormGroup;
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
transactiontypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
SESSIONUSERID:any;//current user
crmcustomeraccounttransactionshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private crmcustomeraccounttransactionservice: crmcustomeraccounttransactionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.crmcustomeraccounttransactionForm  = this.fb.group({
pk:[null],
transactionid: [null],
accountid: [null],
accountiddesc: [null],
customerid: [null],
customeriddesc: [null],
cifnumber: [null],
accountnumber: [null],
date: [null],
description: [null],
amount: [null],
transactiontype: [null],
transactiontypedesc: [null],
closingbalance: [null],
customfield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomeraccounttransactionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmcustomeraccounttransactionForm.dirty && this.crmcustomeraccounttransactionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.transactionid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.transactionid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.transactionid && pkDetail) {
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
let crmcustomeraccounttransactionid = null;

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
this.formid=crmcustomeraccounttransactionid;
//this.sharedService.alert(crmcustomeraccounttransactionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.crmcustomeraccounttransactionservice.formData && this.crmcustomeraccounttransactionservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.crmcustomeraccounttransactionForm.patchValue({
    accountid: this.crmcustomeraccounttransactionservice.formData.accountid,
    accountiddesc: this.crmcustomeraccounttransactionservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.crmcustomeraccounttransactionForm.get('accountid').value);
let objaccountid;
if (arraccountid.length > 0) objaccountid = arraccountid[0];
if (objaccountid)
{
}
}
}
).catch((err) => {console.log(err);});
this.accountid_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.accountidList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.accountid_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.crmcustomeraccounttransactionservice.formData && this.crmcustomeraccounttransactionservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.crmcustomeraccounttransactionForm.patchValue({
    customerid: this.crmcustomeraccounttransactionservice.formData.customerid,
    customeriddesc: this.crmcustomeraccounttransactionservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.crmcustomeraccounttransactionForm.get('customerid').value);
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
this.configservice.getList("fatxntype").then(res => this.transactiontypeList = res as boconfigvalue[]);

//autocomplete
    this.crmcustomeraccounttransactionservice.getcrmcustomeraccounttransactionsList().then(res => {
      this.pkList = res as crmcustomeraccounttransaction[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.crmcustomeraccounttransactionForm.markAsUntouched();
this.crmcustomeraccounttransactionForm.markAsPristine();
}
onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.crmcustomeraccounttransactionForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}

onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.crmcustomeraccounttransactionForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.crmcustomeraccounttransactionForm != null)
this.crmcustomeraccounttransactionForm.reset();
this.crmcustomeraccounttransactionForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let transactionid = this.crmcustomeraccounttransactionForm.get('transactionid').value;
        if(transactionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomeraccounttransactionservice.deletecrmcustomeraccounttransaction(transactionid).then(res =>
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
    this.crmcustomeraccounttransactionForm.patchValue({
        transactionid: null
    });
    if(this.crmcustomeraccounttransactionservice.formData.transactionid!=null)this.crmcustomeraccounttransactionservice.formData.transactionid=null;
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
        else if(key=="date")
this.crmcustomeraccounttransactionForm.patchValue({"date":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.crmcustomeraccounttransactionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmcustomeraccounttransactionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmcustomeraccounttransactionForm.controls[key]!=undefined)
{
this.crmcustomeraccounttransactionForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomeraccounttransactions",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.crmcustomeraccounttransactionservice.formData.description!=null )
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
transactionidonChange(evt:any){
let e=evt.value;
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
dateonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
amountonChange(evt:any){
let e=evt.value;
}
transactiontypeonChange(evt:any){
let e=this.f.transactiontype.value as any;
this.crmcustomeraccounttransactionForm.patchValue({transactiontypedesc:evt.options[evt.options.selectedIndex].text});
}
closingbalanceonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcrmcustomeraccounttransactions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmcustomeraccounttransactionservice.getcrmcustomeraccounttransactionsByEID(pkcol).then(res => {

this.crmcustomeraccounttransactionservice.formData=res.crmcustomeraccounttransaction;
let formproperty=res.crmcustomeraccounttransaction.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmcustomeraccounttransaction.pkcol;
this.formid=res.crmcustomeraccounttransaction.transactionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmcustomeraccounttransaction.transactionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmcustomeraccounttransactionForm.patchValue({
transactionid: res.crmcustomeraccounttransaction.transactionid,
accountid: res.crmcustomeraccounttransaction.accountid,
accountiddesc: res.crmcustomeraccounttransaction.accountiddesc,
customerid: res.crmcustomeraccounttransaction.customerid,
customeriddesc: res.crmcustomeraccounttransaction.customeriddesc,
cifnumber: res.crmcustomeraccounttransaction.cifnumber,
accountnumber: res.crmcustomeraccounttransaction.accountnumber,
date: this.ngbDateParserFormatter.parse(res.crmcustomeraccounttransaction.date),
description: res.crmcustomeraccounttransaction.description,
amount: res.crmcustomeraccounttransaction.amount,
transactiontype: res.crmcustomeraccounttransaction.transactiontype,
transactiontypedesc: res.crmcustomeraccounttransaction.transactiontypedesc,
closingbalance: res.crmcustomeraccounttransaction.closingbalance,
customfield: res.crmcustomeraccounttransaction.customfield,
status: res.crmcustomeraccounttransaction.status,
statusdesc: res.crmcustomeraccounttransaction.statusdesc,
});
if(this.crmcustomeraccounttransactionForm.get('customfield').value!=null && this.crmcustomeraccounttransactionForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.crmcustomeraccounttransactionForm.get('customfield').value);
this.FillCustomField();
//Child Tables if any
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
  for (let key in this.crmcustomeraccounttransactionForm.controls) {
    if (this.crmcustomeraccounttransactionForm.controls[key] != null) {
if(false)
{
if(this.crmcustomeraccounttransactionservice.formData!=null && this.crmcustomeraccounttransactionservice.formData[key]!=null  && this.crmcustomeraccounttransactionservice.formData[key]!='[]' && this.crmcustomeraccounttransactionservice.formData[key]!=undefined && this.crmcustomeraccounttransactionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmcustomeraccounttransactionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmcustomeraccounttransactionservice.formData!=null && this.crmcustomeraccounttransactionservice.formData[key]!=null   && this.crmcustomeraccounttransactionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmcustomeraccounttransactionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmcustomeraccounttransactionservice.formData!=null && this.crmcustomeraccounttransactionservice.formData[key]!=null   && this.crmcustomeraccounttransactionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmcustomeraccounttransactionservice.formData[key]+"'><div class='progress__number'>"+this.crmcustomeraccounttransactionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomeraccounttransactionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmcustomeraccounttransactionForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.crmcustomeraccounttransactionForm.value;
obj.date=new Date(this.crmcustomeraccounttransactionForm.get('date').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccounttransactionForm.get('date').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
console.log(obj);
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

private crmcustomeraccounttransactiontoggleOption(){
this.crmcustomeraccounttransactionshowOption = this.crmcustomeraccounttransactionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomeraccounttransactionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomeraccounttransactionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomeraccounttransactionForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmcustomeraccounttransactionservice.formData=this.crmcustomeraccounttransactionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomeraccounttransactionForm.controls[key] != null)
    {
        this.crmcustomeraccounttransactionservice.formData[key] = this.crmcustomeraccounttransactionForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.crmcustomeraccounttransactionservice.formData.date=new Date(this.crmcustomeraccounttransactionForm.get('date').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccounttransactionForm.get('date').value)+'  UTC' :null);
this.crmcustomeraccounttransactionservice.formData.customfield=JSON.stringify(customfields);
console.log(this.crmcustomeraccounttransactionservice.formData);
this.crmcustomeraccounttransactionservice.formData=this.crmcustomeraccounttransactionForm.value;
this.crmcustomeraccounttransactionservice.saveOrUpdatecrmcustomeraccounttransactions().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomeraccounttransaction);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmcustomeraccounttransactionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomeraccounttransaction);
}
else
{
this.FillData(res);
}
}
this.crmcustomeraccounttransactionForm.markAsUntouched();
this.crmcustomeraccounttransactionForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.crmcustomeraccounttransactionForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.crmcustomeraccounttransactionForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



