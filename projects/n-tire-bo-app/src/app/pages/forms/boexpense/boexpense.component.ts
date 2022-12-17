import { boexpenseService } from './../../../service/boexpense.service';
import { boexpense } from './../../../model/boexpense.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-boexpense',
templateUrl: './boexpense.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boexpenseComponent implements OnInit {
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
bfilterPopulateboexpenses:boolean=false;
databoexpensesrequesteduserid3:any=[];
databoexpensesexpensetype3:any=[];
databoexpensesexpensecategory3:any=[];
databoexpensescurrency3:any=[];
databoexpensesbasecurrency3:any=[];
databoexpensescostcenterid3:any=[];
 boexpenseForm: FormGroup;
requesteduseridList: bousermaster[];
requesteduseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requesteduserid_bousermastersForm: FormGroup;//autocomplete
requesteduserid_bousermastersoptions:any;//autocomplete
requesteduserid_bousermastersformatter:any;//autocomplete
expensetypeList: boconfigvalue[];
expensecategoryList: boconfigvalue[];
currencyList: boconfigvalue[];
basecurrencyList: boconfigvalue[];
costcenteridList: erpfacostcenter[];
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
boexpenseshowOption:boolean;
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
private boexpenseservice: boexpenseService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private erpfacostcenterservice:erpfacostcenterService,
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
this.boexpenseForm  = this.fb.group({
pk:[null],
ImageName: [null],
expenseid: [null],
sourcefield: [null],
sourcereference: [null],
expensedate: [null, Validators.required],
requesteduserid: [null, Validators.required],
requesteduseriddesc: [null],
expensetype: [null],
expensetypedesc: [null],
expensecategory: [null],
expensecategorydesc: [null],
expensedescription: [null, Validators.required],
currency: [null],
currencydesc: [null],
amount: [null, Validators.required],
tax: [null],
othercharges: [null],
totalamount: [null],
merchant: [null],
receiptattached: [null],
billable: [null],
reimbursedamount: [null],
reimburseddate: [null],
referencenumber: [null],
basecurrency: [null],
basecurrencydesc: [null],
baseamount: [null],
notes: [null],
costcenterid: [null],
costcenteriddesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boexpenseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boexpenseForm.dirty && this.boexpenseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.expenseid && pkDetail) {
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
let boexpenseid = null;

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
this.formid=boexpenseid;
//this.sharedService.alert(boexpenseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requesteduseridList = res as bousermaster[];
if(this.boexpenseservice.formData && this.boexpenseservice.formData.requesteduserid){
this.requesteduseridoptionsEvent.emit(this.requesteduseridList);
this.boexpenseForm.patchValue({
    requesteduserid: this.boexpenseservice.formData.requesteduserid,
    requesteduseriddesc: this.boexpenseservice.formData.requesteduseriddesc,
});
}
{
let arrrequesteduserid = this.requesteduseridList.filter(v => v.userid == this.boexpenseForm.get('requesteduserid').value);
let objrequesteduserid;
if (arrrequesteduserid.length > 0) objrequesteduserid = arrrequesteduserid[0];
if (objrequesteduserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.requesteduserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requesteduseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requesteduserid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("expensetype").then(res => this.expensetypeList = res as boconfigvalue[]);
this.configservice.getList("expensecategory").then(res => this.expensecategoryList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenteridList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.boexpenseservice.getboexpensesList().then(res => {
      this.pkList = res as boexpense[];
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
this.boexpenseForm.markAsUntouched();
this.boexpenseForm.markAsPristine();
}
onSelectedrequesteduserid(requesteduseridDetail: any) {
if (requesteduseridDetail.userid && requesteduseridDetail) {
this.boexpenseForm.patchValue({
requesteduserid: requesteduseridDetail.userid,
requesteduseriddesc: requesteduseridDetail.username,

});

}
}




resetForm() {
if (this.boexpenseForm != null)
this.boexpenseForm.reset();
this.boexpenseForm.patchValue({
requesteduserid: this.sessiondata.userid,
requesteduseriddesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.boexpenseForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let expenseid = this.boexpenseForm.get('expenseid').value;
        if(expenseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boexpenseservice.deleteboexpense(expenseid).then(res =>
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
    this.boexpenseForm.patchValue({
        expenseid: null
    });
    if(this.boexpenseservice.formData.expenseid!=null)this.boexpenseservice.formData.expenseid=null;
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
        else if(key=="expensedate")
this.boexpenseForm.patchValue({"expensedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="reimburseddate")
this.boexpenseForm.patchValue({"reimburseddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.boexpenseForm.patchValue({"notes":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.boexpenseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boexpenseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boexpenseForm.controls[key]!=undefined)
{
this.boexpenseForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("boexpenses",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
expenseidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
expensedateonChange(evt:any){
let e=evt.value;
}
requesteduseridonChange(evt:any){
let e=evt.value;
}
expensetypeonChange(evt:any){
let e=this.f.expensetype.value as any;
this.boexpenseForm.patchValue({expensetypedesc:evt.options[evt.options.selectedIndex].text});
}
expensecategoryonChange(evt:any){
let e=this.f.expensecategory.value as any;
this.boexpenseForm.patchValue({expensecategorydesc:evt.options[evt.options.selectedIndex].text});
}
expensedescriptiononChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.boexpenseForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
amountonChange(evt:any){
let e=evt.value;
}
taxonChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
totalamountonChange(evt:any){
let e=evt.value;
}
merchantonChange(evt:any){
let e=evt.value;
}
receiptattachedonChange(evt:any){
let e=evt.value;
}
billableonChange(evt:any){
let e=evt.value;
}
reimbursedamountonChange(evt:any){
let e=evt.value;
}
reimburseddateonChange(evt:any){
let e=evt.value;
}
referencenumberonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.boexpenseForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
baseamountonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
costcenteridonChange(evt:any){
let e=evt.value;
this.boexpenseForm.patchValue({costcenteriddesc:evt.options[evt.options.selectedIndex].text});
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
  


editboexpenses() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.boexpenseservice.getboexpensesByEID(pkcol).then(res => {

this.boexpenseservice.formData=res.boexpense;
let formproperty=res.boexpense.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.boexpense.pkcol;
this.formid=res.boexpense.expenseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boexpense.expenseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boexpenseForm.patchValue({
expenseid: res.boexpense.expenseid,
sourcefield: res.boexpense.sourcefield,
sourcereference: res.boexpense.sourcereference,
expensedate: this.ngbDateParserFormatter.parse(res.boexpense.expensedate),
requesteduserid: res.boexpense.requesteduserid,
requesteduseriddesc: res.boexpense.requesteduseriddesc,
expensetype: res.boexpense.expensetype,
expensetypedesc: res.boexpense.expensetypedesc,
expensecategory: res.boexpense.expensecategory,
expensecategorydesc: res.boexpense.expensecategorydesc,
expensedescription: res.boexpense.expensedescription,
currency: res.boexpense.currency,
currencydesc: res.boexpense.currencydesc,
amount: res.boexpense.amount,
tax: res.boexpense.tax,
othercharges: res.boexpense.othercharges,
totalamount: res.boexpense.totalamount,
merchant: res.boexpense.merchant,
receiptattached: res.boexpense.receiptattached,
billable: res.boexpense.billable,
reimbursedamount: res.boexpense.reimbursedamount,
reimburseddate: this.ngbDateParserFormatter.parse(res.boexpense.reimburseddate),
referencenumber: res.boexpense.referencenumber,
basecurrency: res.boexpense.basecurrency,
basecurrencydesc: res.boexpense.basecurrencydesc,
baseamount: res.boexpense.baseamount,
notes: JSON.parse(res.boexpense.notes),
costcenterid: res.boexpense.costcenterid,
costcenteriddesc: res.boexpense.costcenteriddesc,
customfield: res.boexpense.customfield,
attachment: JSON.parse(res.boexpense.attachment),
status: res.boexpense.status,
statusdesc: res.boexpense.statusdesc,
});
if(this.boexpenseForm.get('customfield').value!=null && this.boexpenseForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.boexpenseForm.get('customfield').value);
this.FillCustomField();
if(this.boexpenseForm.get('attachment').value!=null && this.boexpenseForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.boexpenseForm.get('attachment').value);
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
  for (let key in this.boexpenseForm.controls) {
    if (this.boexpenseForm.controls[key] != null) {
if(false)
{
if(this.boexpenseservice.formData!=null && this.boexpenseservice.formData[key]!=null  && this.boexpenseservice.formData[key]!='[]' && this.boexpenseservice.formData[key]!=undefined && this.boexpenseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.boexpenseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.boexpenseservice.formData!=null && this.boexpenseservice.formData[key]!=null   && this.boexpenseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.boexpenseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.boexpenseservice.formData!=null && this.boexpenseservice.formData[key]!=null   && this.boexpenseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.boexpenseservice.formData[key]+"'><div class='progress__number'>"+this.boexpenseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boexpenseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boexpenseForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.boexpenseForm.value;
obj.expensedate=new Date(this.boexpenseForm.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpenseForm.get('expensedate').value)+'  UTC' :null);
obj.reimburseddate=new Date(this.boexpenseForm.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpenseForm.get('reimburseddate').value)+'  UTC' :null);
if(this.boexpenseForm.get('notes').value!=null)obj.notes=JSON.stringify(this.boexpenseForm.get('notes').value);
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

private boexpensetoggleOption(){
this.boexpenseshowOption = this.boexpenseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.boexpenseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boexpenseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boexpenseForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boexpenseservice.formData=this.boexpenseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boexpenseForm.controls[key] != null)
    {
        this.boexpenseservice.formData[key] = this.boexpenseForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.boexpenseservice.formData.expensedate=new Date(this.boexpenseForm.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpenseForm.get('expensedate').value)+'  UTC' :null);
this.boexpenseservice.formData.reimburseddate=new Date(this.boexpenseForm.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpenseForm.get('reimburseddate').value)+'  UTC' :null);
if(this.boexpenseForm.get('notes').value!=null)this.boexpenseservice.formData.notes=JSON.stringify(this.boexpenseForm.get('notes').value);
if(customfields!=null)this.boexpenseservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.boexpenseservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.boexpenseservice.formData);
this.boexpenseservice.formData=this.boexpenseForm.value;
this.boexpenseservice.saveOrUpdateboexpenses().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).boexpense);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boexpenseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).boexpense);
}
else
{
this.FillData(res);
}
}
this.boexpenseForm.markAsUntouched();
this.boexpenseForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrequesteduserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boexpenseForm.get('requesteduserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenterid( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.boexpenseForm.get('costcenterid').value, ScreenType:2 }
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



