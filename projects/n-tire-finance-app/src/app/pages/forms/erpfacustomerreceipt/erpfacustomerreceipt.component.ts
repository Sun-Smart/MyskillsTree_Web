import { erpfacustomerreceiptService } from './../../../service/erpfacustomerreceipt.service';
import { erpfacustomerreceipt } from './../../../model/erpfacustomerreceipt.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

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
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
//popups
import { erpfabankaccount} from './../../../model/erpfabankaccount.model';
import { erpfabankaccountService } from './../../../service/erpfabankaccount.service';
//popups
//detail table services
import { erpfacustomerreceiptdetail } from './../../../model/erpfacustomerreceiptdetail.model';
//FK services
import { erpcustomerinvoice,IerpcustomerinvoiceResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpcustomerinvoice.model';
import { erpcustomerinvoiceService } from '../../../../../../n-tire-procurement-app/src/app/service/erpcustomerinvoice.service';
import { erpfacustomerreceiptdetailComponent } from './erpfacustomerreceiptdetail.component';
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

@Component({
selector: 'app-erpfacustomerreceipt',
templateUrl: './erpfacustomerreceipt.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfacustomerreceiptComponent implements OnInit {
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
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
data3:any=[];
bfilterPopulateerpfacustomerreceipts:boolean=false;
dataerpfacustomerreceiptscustomerid3:any=[];
dataerpfacustomerreceiptsbankaccountid3:any=[];
dataerpfacustomerreceiptdetailsinvoiceid3:any=[];
bfilterPopulateerpfacustomerreceiptdetails:boolean=false;
@ViewChild('tblerpfacustomerreceiptdetailssource',{static:false}) tblerpfacustomerreceiptdetailssource: Ng2SmartTableComponent;
 erpfacustomerreceiptForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
bankaccountidList: erpfabankaccount[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



erpfacustomerreceiptdetailsvisiblelist:any;
erpfacustomerreceiptdetailshidelist:any;

DeletederpfacustomerreceiptdetailIDs: string="";
erpfacustomerreceiptdetailsID: string = "1";
erpfacustomerreceiptdetailsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfacustomerreceiptservice: erpfacustomerreceiptService,
private erpcustomerinvoiceservice: erpcustomerinvoiceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
private erpfabankaccountservice:erpfabankaccountService,
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
this.erpfacustomerreceiptForm  = this.fb.group({pk:[null],receiptid: [null],
receiptdate: [null],
receiptreference: [null],
customerid: [null],
customeriddesc: [null],
receivedamount: [null],
bankaccountid: [null],
bankaccountiddesc: [null],
receiptmode: [null],
chequeno: [null],
chequedate: [null],
narration: [null],
status: [null],
statusdesc: [null],
customerpaymentreference: [null],
});
}

get f() { return this.erpfacustomerreceiptForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfacustomerreceiptForm.dirty && this.erpfacustomerreceiptForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.receiptid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.receiptid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.receiptid && pkDetail) {
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

debugger;
let erpfacustomerreceiptid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
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
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=erpfacustomerreceiptid;
//this.sharedService.alert(erpfacustomerreceiptid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpfacustomerreceiptdetailsTableConfig();
  setTimeout(() => {
  this.SeterpfacustomerreceiptdetailsTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.erpfacustomerreceiptservice.formData && this.erpfacustomerreceiptservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.erpfacustomerreceiptForm.patchValue({
    customerid: this.erpfacustomerreceiptservice.formData.customerid,
    customeriddesc: this.erpfacustomerreceiptservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.erpfacustomerreceiptForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
);
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.erpfabankaccountservice.geterpfabankaccountsList().then(res => 
{
this.bankaccountidList = res as erpfabankaccount[];
}
);

//autocomplete
    this.erpfacustomerreceiptservice.geterpfacustomerreceiptsList().then(res => {
      this.pkList = res as erpfacustomerreceipt[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.erpfacustomerreceiptForm.markAsUntouched();
this.erpfacustomerreceiptForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.erpfacustomerreceiptForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.erpfacustomerreceiptForm != null)
this.erpfacustomerreceiptForm.reset();
this.erpfacustomerreceiptForm.patchValue({
});
setTimeout(() => {
this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails=[];
this.erpfacustomerreceiptdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let receiptid = this.erpfacustomerreceiptForm.get('receiptid').value;
        if(receiptid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfacustomerreceiptservice.deleteerpfacustomerreceipt(receiptid).then(res =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.erpfacustomerreceiptForm.patchValue({
        receiptid: null
    });
    if(this.erpfacustomerreceiptservice.formData.receiptid!=null)this.erpfacustomerreceiptservice.formData.receiptid=null;
for (let i=0;i<this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails.length;i++) {
this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails[i].receiptdetailid=null;
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
        else if(key=="receiptdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="chequedate")
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
        if(this.erpfacustomerreceiptForm.controls[key]!=null)
{
this.erpfacustomerreceiptForm.patchValue(json);
         if(bdisable)this.erpfacustomerreceiptForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
receiptidonChange(evt:any){
let e=evt.value;
}
receiptdateonChange(evt:any){
let e=evt.value;
}
receiptreferenceonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
receivedamountonChange(evt:any){
let e=evt.value;
}
bankaccountidonChange(evt:any){
let e=evt.value;
this.erpfacustomerreceiptForm.patchValue({bankaccountiddesc:evt.options[evt.options.selectedIndex].text});
}
receiptmodeonChange(evt:any){
let e=evt.value;
}
chequenoonChange(evt:any){
let e=evt.value;
}
chequedateonChange(evt:any){
let e=evt.value;
}
narrationonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
customerpaymentreferenceonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){this.erpfacustomerreceiptservice.geterpfacustomerreceiptsByEID(pkcol).then(res => {

this.erpfacustomerreceiptservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfacustomerreceipt.receiptid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfacustomerreceipt.receiptid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfacustomerreceiptForm.patchValue({
receiptid: res.erpfacustomerreceipt.receiptid,
receiptdate: this.ngbDateParserFormatter.parse(res.erpfacustomerreceipt.receiptdate),
receiptreference: res.erpfacustomerreceipt.receiptreference,
customerid: res.erpfacustomerreceipt.customerid,
customeriddesc: res.erpfacustomerreceipt.customeriddesc,
receivedamount: res.erpfacustomerreceipt.receivedamount,
bankaccountid: res.erpfacustomerreceipt.bankaccountid,
bankaccountiddesc: res.erpfacustomerreceipt.bankaccountiddesc,
receiptmode: res.erpfacustomerreceipt.receiptmode,
chequeno: res.erpfacustomerreceipt.chequeno,
chequedate: this.ngbDateParserFormatter.parse(res.erpfacustomerreceipt.chequedate),
narration: res.erpfacustomerreceipt.narration,
status: res.erpfacustomerreceipt.status,
statusdesc: res.erpfacustomerreceipt.statusdesc,
customerpaymentreference: res.erpfacustomerreceipt.customerpaymentreference,
});
this.erpfacustomerreceiptdetailsvisiblelist=res.erpfacustomerreceiptdetailsvisiblelist;
//Child Tables if any
this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails = res.erpfacustomerreceiptdetail;
this.SeterpfacustomerreceiptdetailsTableConfig();
this.erpfacustomerreceiptdetailsLoadTable();
  setTimeout(() => {
  this.SeterpfacustomerreceiptdetailsTableddConfig();
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
  for (let key in this.erpfacustomerreceiptForm.controls) {
    if (this.erpfacustomerreceiptForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfacustomerreceiptForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfacustomerreceiptForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfacustomerreceiptForm.value;
obj.receiptdate=this.ngbDateParserFormatter.format(this.erpfacustomerreceiptForm.get('receiptdate').value);
obj.chequedate=this.ngbDateParserFormatter.format(this.erpfacustomerreceiptForm.get('chequedate').value);
console.log(obj);
this.dialogRef.close(obj);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpfacustomerreceiptForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfacustomerreceiptForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfacustomerreceiptForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfacustomerreceiptservice.formData=this.erpfacustomerreceiptForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfacustomerreceiptForm.controls[key] != null)
    {
        this.erpfacustomerreceiptservice.formData[key] = this.erpfacustomerreceiptForm.controls[key].value;
    }
}
}
}
this.erpfacustomerreceiptservice.formData.receiptdate=new Date(this.ngbDateParserFormatter.format(this.erpfacustomerreceiptForm.get('receiptdate').value)+'  UTC');
this.erpfacustomerreceiptservice.formData.chequedate=new Date(this.ngbDateParserFormatter.format(this.erpfacustomerreceiptForm.get('chequedate').value)+'  UTC');
this.erpfacustomerreceiptservice.formData.DeletederpfacustomerreceiptdetailIDs = this.DeletederpfacustomerreceiptdetailIDs;
console.log(this.erpfacustomerreceiptservice.formData);
this.erpfacustomerreceiptservice.formData=this.erpfacustomerreceiptForm.value;
this.erpfacustomerreceiptservice.saveOrUpdateerpfacustomerreceipts().subscribe(
async res => {
if (this.erpfacustomerreceiptdetailssource.data)
{
    for (let i = 0; i < this.erpfacustomerreceiptdetailssource.data.length; i++)
    {
        if (this.erpfacustomerreceiptdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpfacustomerreceiptdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfacustomerreceipt);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfacustomerreceiptservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfacustomerreceipt);
}
else
{
this.FillData(res);
}
}
this.erpfacustomerreceiptForm.markAsUntouched();
this.erpfacustomerreceiptForm.markAsPristine();
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
data: {customerid:this.erpfacustomerreceiptForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbankaccountid( bankaccountid) {
/*let ScreenType='2';
this.dialog.open(erpfabankaccountComponent, 
{
data: {bankaccountid:this.erpfacustomerreceiptForm.get('bankaccountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpfacustomerreceiptdetail(event:any,receiptdetailid:any, receiptid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpfacustomerreceiptdetailComponent, 
{
data:  {  showview:this.showview,save:false,event,receiptdetailid, receiptid,visiblelist:this.erpfacustomerreceiptdetailsvisiblelist,  hidelist:this.erpfacustomerreceiptdetailshidelist,ScreenType:2  },
header: 'Receipt Details'
} 
).onClose.subscribe(res => {
if(add)
{
this.erpfacustomerreceiptdetailssource.add(res);
this.erpfacustomerreceiptdetailssource.refresh();
}
else
{
this.erpfacustomerreceiptdetailssource.update(event.data, res);
}
});
}

onDeleteerpfacustomerreceiptdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfacustomerreceiptdetailIDs += childID + ",";
this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpfacustomerreceiptdetails
erpfacustomerreceiptdetailssettings:any;
erpfacustomerreceiptdetailssource: any;

showerpfacustomerreceiptdetailsCheckbox()
{
debugger;
if(this.tblerpfacustomerreceiptdetailssource.settings['selectMode']== 'multi')this.tblerpfacustomerreceiptdetailssource.settings['selectMode']= 'single';
else
this.tblerpfacustomerreceiptdetailssource.settings['selectMode']= 'multi';
this.tblerpfacustomerreceiptdetailssource.initGrid();
}
deleteerpfacustomerreceiptdetailsAll()
{
this.tblerpfacustomerreceiptdetailssource.settings['selectMode'] = 'single';
}
showerpfacustomerreceiptdetailsFilter()
{
  setTimeout(() => {
  this.SeterpfacustomerreceiptdetailsTableddConfig();
  });
      if(this.tblerpfacustomerreceiptdetailssource.settings!=null)this.tblerpfacustomerreceiptdetailssource.settings['hideSubHeader'] =!this.tblerpfacustomerreceiptdetailssource.settings['hideSubHeader'];
this.tblerpfacustomerreceiptdetailssource.initGrid();
}
showerpfacustomerreceiptdetailsInActive()
{
}
enableerpfacustomerreceiptdetailsInActive()
{
}
async SeterpfacustomerreceiptdetailsTableddConfig()
{
if(!this.bfilterPopulateerpfacustomerreceiptdetails){

this.erpcustomerinvoiceservice.geterpcustomerinvoicesList().then(res=>
{
var datainvoiceid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfacustomerreceiptdetailsinvoiceid3.push(defaultobj);
for(let i=0; i<datainvoiceid2.length; i++){
var obj= { value: datainvoiceid2[i].invoiceid, title:datainvoiceid2[i].invoicenumber};
this.dataerpfacustomerreceiptdetailsinvoiceid3.push(obj);
}
if((this.tblerpfacustomerreceiptdetailssource.settings as any).columns['invoiceid'])
{
(this.tblerpfacustomerreceiptdetailssource.settings as any).columns['invoiceid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpfacustomerreceiptdetailsinvoiceid3));
this.tblerpfacustomerreceiptdetailssource.initGrid();
}
});
}
this.bfilterPopulateerpfacustomerreceiptdetails=true;
}
async erpfacustomerreceiptdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpfacustomerreceiptdetailsTableConfig()
{
this.erpfacustomerreceiptdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
receiptdetails: {
title: 'Receipt Details',
type: '',
filter:true,
},
invoiceid: {
title: 'Invoice',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfacustomerreceiptdetailsinvoiceid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
customerreference: {
title: 'Customer Reference',
type: '',
filter:true,
},
invoicedate: {
title: 'Invoice Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
totalvalue: {
title: 'Total Value',
type: 'number',
filter:true,
},
discountamount: {
title: 'Discount Amount',
type: 'number',
filter:true,
},
tax1: {
title: 'Tax1',
type: 'number',
filter:true,
},
tax2: {
title: 'Tax2',
type: 'number',
filter:true,
},
taxdeduction: {
title: 'Tax Deduction',
type: 'number',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: 'number',
filter:true,
},
invoiceamount: {
title: 'Invoice Amount',
type: 'number',
filter:true,
},
paid: {
title: 'Pa',
type: 'number',
filter:true,
},
balance: {
title: 'Balance',
type: 'number',
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
erpfacustomerreceiptdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfacustomerreceiptdetailsID)>=0)
{
this.erpfacustomerreceiptdetailssource=new LocalDataSource();
this.erpfacustomerreceiptdetailssource.load(this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails as  any as LocalDataSource);
this.erpfacustomerreceiptdetailssource.setPaging(1, 20, true);
}
}
erpfacustomerreceiptdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpfacustomerreceiptdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpfacustomerreceiptdetail(event,event.data.receiptdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpfacustomerreceiptdetail(event,event.data.receiptdetailid,((this.erpfacustomerreceiptdetailssource.getPaging().page-1) *this.erpfacustomerreceiptdetailssource.getPaging().perPage)+event.index);
this.erpfacustomerreceiptdetailssource.refresh();
break;
}
}
erpfacustomerreceiptdetailsonDelete(obj) {
let receiptdetailid=obj.data.receiptdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpfacustomerreceiptservice.deleteerpfacustomerreceipt(receiptdetailid).then(res=>
this.erpfacustomerreceiptdetailsLoadTable()
);
}
}
erpfacustomerreceiptdetailsPaging(val)
{
debugger;
this.erpfacustomerreceiptdetailssource.setPaging(1, val, true);
}

handleerpfacustomerreceiptdetailsGridSelected(event:any) {
this.erpfacustomerreceiptdetailsselectedindex=this.erpfacustomerreceiptservice.erpfacustomerreceiptdetails.findIndex(i => i.receiptdetailid === event.data.receiptdetailid);
}
IserpfacustomerreceiptdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfacustomerreceiptdetailsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes erpfacustomerreceiptdetails

}



