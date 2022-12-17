import { ltyloyaltyaudittrailService } from './../../../service/ltyloyaltyaudittrail.service';
import { ltyloyaltyaudittrail } from './../../../model/ltyloyaltyaudittrail.model';
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
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
//popups
import { ltymerchant} from './../../../model/ltymerchant.model';
import { ltymerchantService } from './../../../service/ltymerchant.service';
//popups
import { ltystore} from './../../../model/ltystore.model';
import { ltystoreService } from './../../../service/ltystore.service';
//popups
import { erpproduct} from '../../../../../../n-tire-procurement-app/src/app/model/erpproduct.model';
import { erpproductService } from '../../../../../../n-tire-procurement-app/src/app/service/erpproduct.service';
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

@Component({
selector: 'app-ltyloyaltyaudittrail',
templateUrl: './ltyloyaltyaudittrail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltyloyaltyaudittrailComponent implements OnInit {
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
maindata:any;
data3:any=[];
bfilterPopulateltyloyaltyaudittrails:boolean=false;
dataltyloyaltyaudittrailstransactiontype3:any=[];
dataltyloyaltyaudittrailscustomerid3:any=[];
dataltyloyaltyaudittrailsmerchantid3:any=[];
dataltyloyaltyaudittrailsstoreid3:any=[];
dataltyloyaltyaudittrailsproductid3:any=[];
dataltyloyaltyaudittrailsdiscountproductid3:any=[];
 ltyloyaltyaudittrailForm: FormGroup;
transactiontypeList: boconfigvalue[];
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
merchantidList: ltymerchant[];
merchantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
merchantid_ltymerchantsForm: FormGroup;//autocomplete
merchantid_ltymerchantsoptions:any;//autocomplete
merchantid_ltymerchantsformatter:any;//autocomplete
storeidList: ltystore[];
productidList: erpproduct[];
productidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
productid_erpproductsForm: FormGroup;//autocomplete
productid_erpproductsoptions:any;//autocomplete
productid_erpproductsformatter:any;//autocomplete
discountproductidList: erpproduct[];
discountproductidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
discountproductid_erpproductsForm: FormGroup;//autocomplete
discountproductid_erpproductsoptions:any;//autocomplete
discountproductid_erpproductsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
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
private ltyloyaltyaudittrailservice: ltyloyaltyaudittrailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
private ltymerchantservice:ltymerchantService,
private ltystoreservice:ltystoreService,
private erpproductservice:erpproductService,
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
this.ltyloyaltyaudittrailForm  = this.fb.group({
pk:[null],
transactionid: [null],
reference: [null],
transactiondate: [null],
transactiontype: [null],
transactiontypedesc: [null],
customerid: [null],
customeriddesc: [null],
merchantid: [null],
merchantiddesc: [null],
storeid: [null],
storeiddesc: [null],
description: [null],
sourcefield: [null],
sourcereference: [null],
oldlevel: [null],
loyaltylevel: [null],
pointearned: [null],
amountearned: [null],
pointtransferred: [null],
redeempoint: [null],
redeemamount: [null],
expiredpoints: [null],
lockedpoints: [null],
blockedpoints: [null],
productid: [null],
productiddesc: [null],
discountproductid: [null],
discountproductiddesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltyloyaltyaudittrailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltyloyaltyaudittrailForm.dirty && this.ltyloyaltyaudittrailForm.touched ) {
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

debugger;
let ltyloyaltyaudittrailid = null;

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
this.formid=ltyloyaltyaudittrailid;
//this.sharedService.alert(ltyloyaltyaudittrailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("loyaltyaudittransactiontype").then(res => this.transactiontypeList = res as boconfigvalue[]);
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.ltyloyaltyaudittrailservice.formData && this.ltyloyaltyaudittrailservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.ltyloyaltyaudittrailForm.patchValue({
    customerid: this.ltyloyaltyaudittrailservice.formData.customerid,
    customeriddesc: this.ltyloyaltyaudittrailservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.ltyloyaltyaudittrailForm.get('customerid').value);
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
this.ltymerchantservice.getltymerchantsList().then(res => 
{
this.merchantidList = res as ltymerchant[];
if(this.ltyloyaltyaudittrailservice.formData && this.ltyloyaltyaudittrailservice.formData.merchantid){
this.merchantidoptionsEvent.emit(this.merchantidList);
this.ltyloyaltyaudittrailForm.patchValue({
    merchantid: this.ltyloyaltyaudittrailservice.formData.merchantid,
    merchantiddesc: this.ltyloyaltyaudittrailservice.formData.merchantiddesc,
});
}
{
let arrmerchantid = this.merchantidList.filter(v => v.merchantid == this.ltyloyaltyaudittrailForm.get('merchantid').value);
let objmerchantid;
if (arrmerchantid.length > 0) objmerchantid = arrmerchantid[0];
if (objmerchantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.merchantid_ltymerchantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.merchantidList.filter(v => v.establishmentname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.merchantid_ltymerchantsformatter = (result: any) => result.establishmentname;
this.ltystoreservice.getltystoresList().then(res => 
{
this.storeidList = res as ltystore[];
}
).catch((err) => {console.log(err);});
this.erpproductservice.geterpproductsList().then(res => 
{
this.productidList = res as erpproduct[];
if(this.ltyloyaltyaudittrailservice.formData && this.ltyloyaltyaudittrailservice.formData.productid){
this.productidoptionsEvent.emit(this.productidList);
this.ltyloyaltyaudittrailForm.patchValue({
    productid: this.ltyloyaltyaudittrailservice.formData.productid,
    productiddesc: this.ltyloyaltyaudittrailservice.formData.productiddesc,
});
}
{
let arrproductid = this.productidList.filter(v => v.productid == this.ltyloyaltyaudittrailForm.get('productid').value);
let objproductid;
if (arrproductid.length > 0) objproductid = arrproductid[0];
if (objproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.productid_erpproductsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.productidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.productid_erpproductsformatter = (result: any) => result.productname;
this.erpproductservice.geterpproductsList().then(res => 
{
this.discountproductidList = res as erpproduct[];
if(this.ltyloyaltyaudittrailservice.formData && this.ltyloyaltyaudittrailservice.formData.discountproductid){
this.discountproductidoptionsEvent.emit(this.discountproductidList);
this.ltyloyaltyaudittrailForm.patchValue({
    discountproductid: this.ltyloyaltyaudittrailservice.formData.discountproductid,
    discountproductiddesc: this.ltyloyaltyaudittrailservice.formData.discountproductiddesc,
});
}
{
let arrdiscountproductid = this.discountproductidList.filter(v => v.productid == this.ltyloyaltyaudittrailForm.get('discountproductid').value);
let objdiscountproductid;
if (arrdiscountproductid.length > 0) objdiscountproductid = arrdiscountproductid[0];
if (objdiscountproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.discountproductid_erpproductsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.discountproductidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.discountproductid_erpproductsformatter = (result: any) => result.productname;

//autocomplete
    this.ltyloyaltyaudittrailservice.getltyloyaltyaudittrailsList().then(res => {
      this.pkList = res as ltyloyaltyaudittrail[];
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
this.ltyloyaltyaudittrailForm.markAsUntouched();
this.ltyloyaltyaudittrailForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.ltyloyaltyaudittrailForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}

onSelectedmerchantid(merchantidDetail: any) {
if (merchantidDetail.merchantid && merchantidDetail) {
this.ltyloyaltyaudittrailForm.patchValue({
merchantid: merchantidDetail.merchantid,
merchantiddesc: merchantidDetail.establishmentname,

});

}
}

onSelectedproductid(productidDetail: any) {
if (productidDetail.productid && productidDetail) {
this.ltyloyaltyaudittrailForm.patchValue({
productid: productidDetail.productid,
productiddesc: productidDetail.productname,

});

}
}

onSelecteddiscountproductid(discountproductidDetail: any) {
if (discountproductidDetail.discountproductid && discountproductidDetail) {
this.ltyloyaltyaudittrailForm.patchValue({
discountproductid: discountproductidDetail.discountproductid,
discountproductiddesc: discountproductidDetail.productname,

});

}
}




resetForm() {
if (this.ltyloyaltyaudittrailForm != null)
this.ltyloyaltyaudittrailForm.reset();
this.ltyloyaltyaudittrailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.ltyloyaltyaudittrailForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let transactionid = this.ltyloyaltyaudittrailForm.get('transactionid').value;
        if(transactionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltyloyaltyaudittrailservice.deleteltyloyaltyaudittrail(transactionid).then(res =>
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
    this.ltyloyaltyaudittrailForm.patchValue({
        transactionid: null
    });
    if(this.ltyloyaltyaudittrailservice.formData.transactionid!=null)this.ltyloyaltyaudittrailservice.formData.transactionid=null;
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
        else if(key=="transactiondate")
this.ltyloyaltyaudittrailForm.patchValue({"transactiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltyloyaltyaudittrailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltyloyaltyaudittrailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltyloyaltyaudittrailForm.controls[key]!=undefined)this.ltyloyaltyaudittrailForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
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
referenceonChange(evt:any){
let e=evt.value;
}
transactiondateonChange(evt:any){
let e=evt.value;
}
transactiontypeonChange(evt:any){
let e=this.f.transactiontype.value as any;
this.ltyloyaltyaudittrailForm.patchValue({transactiontypedesc:evt.options[evt.options.selectedIndex].text});
}
customeridonChange(evt:any){
let e=evt.value;
}
merchantidonChange(evt:any){
let e=evt.value;
}
storeidonChange(evt:any){
let e=evt.value;
this.ltyloyaltyaudittrailForm.patchValue({storeiddesc:evt.options[evt.options.selectedIndex].text});
}
descriptiononChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
oldlevelonChange(evt:any){
let e=evt.value;
}
loyaltylevelonChange(evt:any){
let e=evt.value;
}
pointearnedonChange(evt:any){
let e=evt.value;
}
amountearnedonChange(evt:any){
let e=evt.value;
}
pointtransferredonChange(evt:any){
let e=evt.value;
}
redeempointonChange(evt:any){
let e=evt.value;
}
redeemamountonChange(evt:any){
let e=evt.value;
}
expiredpointsonChange(evt:any){
let e=evt.value;
}
lockedpointsonChange(evt:any){
let e=evt.value;
}
blockedpointsonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
}
discountproductidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltyloyaltyaudittrailservice.getltyloyaltyaudittrailsByEID(pkcol).then(res => {

this.ltyloyaltyaudittrailservice.formData=res.ltyloyaltyaudittrail;
let formproperty=res.ltyloyaltyaudittrail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltyloyaltyaudittrail.pkcol;
this.formid=res.ltyloyaltyaudittrail.transactionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltyloyaltyaudittrail.transactionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltyloyaltyaudittrailForm.patchValue({
transactionid: res.ltyloyaltyaudittrail.transactionid,
reference: res.ltyloyaltyaudittrail.reference,
transactiondate: this.ngbDateParserFormatter.parse(res.ltyloyaltyaudittrail.transactiondate),
transactiontype: res.ltyloyaltyaudittrail.transactiontype,
transactiontypedesc: res.ltyloyaltyaudittrail.transactiontypedesc,
customerid: res.ltyloyaltyaudittrail.customerid,
customeriddesc: res.ltyloyaltyaudittrail.customeriddesc,
merchantid: res.ltyloyaltyaudittrail.merchantid,
merchantiddesc: res.ltyloyaltyaudittrail.merchantiddesc,
storeid: res.ltyloyaltyaudittrail.storeid,
storeiddesc: res.ltyloyaltyaudittrail.storeiddesc,
description: res.ltyloyaltyaudittrail.description,
sourcefield: res.ltyloyaltyaudittrail.sourcefield,
sourcereference: res.ltyloyaltyaudittrail.sourcereference,
oldlevel: res.ltyloyaltyaudittrail.oldlevel,
loyaltylevel: res.ltyloyaltyaudittrail.loyaltylevel,
pointearned: res.ltyloyaltyaudittrail.pointearned,
amountearned: res.ltyloyaltyaudittrail.amountearned,
pointtransferred: res.ltyloyaltyaudittrail.pointtransferred,
redeempoint: res.ltyloyaltyaudittrail.redeempoint,
redeemamount: res.ltyloyaltyaudittrail.redeemamount,
expiredpoints: res.ltyloyaltyaudittrail.expiredpoints,
lockedpoints: res.ltyloyaltyaudittrail.lockedpoints,
blockedpoints: res.ltyloyaltyaudittrail.blockedpoints,
productid: res.ltyloyaltyaudittrail.productid,
productiddesc: res.ltyloyaltyaudittrail.productiddesc,
discountproductid: res.ltyloyaltyaudittrail.discountproductid,
discountproductiddesc: res.ltyloyaltyaudittrail.discountproductiddesc,
status: res.ltyloyaltyaudittrail.status,
statusdesc: res.ltyloyaltyaudittrail.statusdesc,
});
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
  for (let key in this.ltyloyaltyaudittrailForm.controls) {
    if (this.ltyloyaltyaudittrailForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltyloyaltyaudittrailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltyloyaltyaudittrailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltyloyaltyaudittrailForm.value;
obj.transactiondate=new Date(this.ltyloyaltyaudittrailForm.get('transactiondate').value ? this.ngbDateParserFormatter.format(this.ltyloyaltyaudittrailForm.get('transactiondate').value)+'  UTC' :null);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.ltyloyaltyaudittrailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltyloyaltyaudittrailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltyloyaltyaudittrailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltyloyaltyaudittrailservice.formData=this.ltyloyaltyaudittrailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltyloyaltyaudittrailForm.controls[key] != null)
    {
        this.ltyloyaltyaudittrailservice.formData[key] = this.ltyloyaltyaudittrailForm.controls[key].value;
    }
}
}
}
this.ltyloyaltyaudittrailservice.formData.transactiondate=new Date(this.ltyloyaltyaudittrailForm.get('transactiondate').value ? this.ngbDateParserFormatter.format(this.ltyloyaltyaudittrailForm.get('transactiondate').value)+'  UTC' :null);
console.log(this.ltyloyaltyaudittrailservice.formData);
this.ltyloyaltyaudittrailservice.formData=this.ltyloyaltyaudittrailForm.value;
this.ltyloyaltyaudittrailservice.saveOrUpdateltyloyaltyaudittrails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltyloyaltyaudittrail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltyloyaltyaudittrailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltyloyaltyaudittrail);
}
else
{
this.FillData(res);
}
}
this.ltyloyaltyaudittrailForm.markAsUntouched();
this.ltyloyaltyaudittrailForm.markAsPristine();
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
data: {customerid:this.ltyloyaltyaudittrailForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmerchantid( merchantid) {
/*let ScreenType='2';
this.dialog.open(ltymerchantComponent, 
{
data: {merchantid:this.ltyloyaltyaudittrailForm.get('merchantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstoreid( storeid) {
/*let ScreenType='2';
this.dialog.open(ltystoreComponent, 
{
data: {storeid:this.ltyloyaltyaudittrailForm.get('storeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(erpproductComponent, 
{
data: {productid:this.ltyloyaltyaudittrailForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdiscountproductid( productid) {
/*let ScreenType='2';
this.dialog.open(erpproductComponent, 
{
data: {productid:this.ltyloyaltyaudittrailForm.get('discountproductid').value, ScreenType:2 }
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



