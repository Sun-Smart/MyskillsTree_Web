import { ltytransactionService } from './../../../service/ltytransaction.service';
import { ltytransaction } from './../../../model/ltytransaction.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { ltymerchant} from './../../../model/ltymerchant.model';
import { ltymerchantService } from './../../../service/ltymerchant.service';
//popups
import { ltystore} from './../../../model/ltystore.model';
import { ltystoreService } from './../../../service/ltystore.service';
//popups
//detail table services
import { ltytransactiondetail } from './../../../model/ltytransactiondetail.model';
import { ltytransactiondetailComponent } from './../../../pages/forms/ltytransactiondetail/ltytransactiondetail.component';
//FK services
import { lmsproductmaster,IlmsproductmasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/lmsproductmaster.model';
import { lmsproductmasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from '../../../../../../n-tire-crm-app/src/app/service/lmsproductmaster.service';
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
selector: 'app-ltytransaction',
templateUrl: './ltytransaction.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltytransactionComponent implements OnInit {
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
bfilterPopulateltytransactions:boolean=false;
dataltytransactionscustomerid3:any=[];
dataltytransactionscategoryid3:any=[];
dataltytransactionsmerchantid3:any=[];
dataltytransactionsstoreid3:any=[];
dataltytransactionstransactiontype3:any=[];
dataltytransactionscurrency3:any=[];
dataltytransactiondetailscategoryid3:any=[];
dataltytransactiondetailspromotionid3:any=[];
dataltytransactiondetailsproductid3:any=[];
bfilterPopulateltytransactiondetails:boolean=false;
@ViewChild('tblltytransactiondetailssource',{static:false}) tblltytransactiondetailssource: Ng2SmartTableComponent;
 ltytransactionForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
categoryidList: bomasterdata[];
merchantidList: ltymerchant[];
storeidList: ltystore[];
transactiontypeList: boconfigvalue[];
currencyList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;



ltytransactiondetailsvisiblelist:any;
ltytransactiondetailshidelist:any;

DeletedltytransactiondetailIDs: string="";
ltytransactiondetailsID: string = "1";
ltytransactiondetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltytransactionservice: ltytransactionService,
private bomasterdataservice: bomasterdataService,
private lmsproductmasterservice: lmsproductmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
private ltymerchantservice:ltymerchantService,
private ltystoreservice:ltystoreService,
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
this.ltytransactionForm  = this.fb.group({
pk:[null],
transactionid: [null],
sourcefield: [null],
sourcereference: [null],
reference: [null],
customerid: [null],
customeriddesc: [null],
customername: [null],
categoryid: [null],
categoryiddesc: [null],
email: [null],
phone: [null],
address: [null],
loyaltycardnumber: [null],
purchasedate: [null],
merchantid: [null],
merchantiddesc: [null],
storeid: [null],
storeiddesc: [null],
transactiontype: [null],
transactiontypedesc: [null],
currency: [null],
currencydesc: [null],
amount: [null],
pointsearned: [null],
details: [null],
metatag: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltytransactionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltytransactionForm.dirty && this.ltytransactionForm.touched ) {
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
let ltytransactionid = null;

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
this.formid=ltytransactionid;
//this.sharedService.alert(ltytransactionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetltytransactiondetailsTableConfig();
  setTimeout(() => {
  this.SetltytransactiondetailsTableddConfig();
  });

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
if(this.ltytransactionservice.formData && this.ltytransactionservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.ltytransactionForm.patchValue({
    customerid: this.ltytransactionservice.formData.customerid,
    customeriddesc: this.ltytransactionservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.ltytransactionForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
    this.ltytransactionForm.patchValue({ lastname: objcustomerid.customername });
    this.ltytransactionForm.patchValue({ loyaltycardnumber: objcustomerid.loyaltycardnumber });
    this.ltytransactionForm.patchValue({ email: objcustomerid.categoryid });
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
this.bomasterdataservice.getList("dnkj6").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.ltymerchantservice.getltymerchantsList().then(res => 
{
this.merchantidList = res as ltymerchant[];
}
).catch((err) => {console.log(err);});
this.ltystoreservice.getltystoresList().then(res => 
{
this.storeidList = res as ltystore[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("documenttype").then(res => this.transactiontypeList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);

//autocomplete
    this.ltytransactionservice.getltytransactionsList().then(res => {
      this.pkList = res as ltytransaction[];
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
this.ltytransactionForm.markAsUntouched();
this.ltytransactionForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.ltytransactionForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});
this.ltytransactionForm.patchValue({lastname:customeridDetail.customername});
this.ltytransactionForm.patchValue({loyaltycardnumber:customeridDetail.loyaltycardnumber});
this.ltytransactionForm.patchValue({email:customeridDetail.categoryid});

}
}




resetForm() {
if (this.ltytransactionForm != null)
this.ltytransactionForm.reset();
this.ltytransactionForm.patchValue({
});
setTimeout(() => {
this.ltytransactionservice.ltytransactiondetails=[];
this.ltytransactiondetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.ltytransactionForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let transactionid = this.ltytransactionForm.get('transactionid').value;
        if(transactionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltytransactionservice.deleteltytransaction(transactionid).then(res =>
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
    this.ltytransactionForm.patchValue({
        transactionid: null
    });
    if(this.ltytransactionservice.formData.transactionid!=null)this.ltytransactionservice.formData.transactionid=null;
for (let i=0;i<this.ltytransactionservice.ltytransactiondetails.length;i++) {
this.ltytransactionservice.ltytransactiondetails[i].transactiondetailid=null;
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
        else if(key=="purchasedate")
this.ltytransactionForm.patchValue({"purchasedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metatag")
this.ltytransactionForm.patchValue({"metatag":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.ltytransactionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltytransactionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltytransactionForm.controls[key]!=undefined)this.ltytransactionForm.controls[key].disable({onlySelf: true});
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
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
customernameonChange(evt:any){
let e=evt.value;
}
categoryidonChange(evt:any){
let e=evt.value;
this.ltytransactionForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
}
emailonChange(evt:any){
let e=evt.value;
}
phoneonChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
let e=evt.value;
}
loyaltycardnumberonChange(evt:any){
let e=evt.value;
}
purchasedateonChange(evt:any){
let e=evt.value;
}
merchantidonChange(evt:any){
let e=evt.value;
this.ltytransactionForm.patchValue({merchantiddesc:evt.options[evt.options.selectedIndex].text});
}
storeidonChange(evt:any){
let e=evt.value;
this.ltytransactionForm.patchValue({storeiddesc:evt.options[evt.options.selectedIndex].text});
}
transactiontypeonChange(evt:any){
let e=this.f.transactiontype.value as any;
this.ltytransactionForm.patchValue({transactiontypedesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.ltytransactionForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
amountonChange(evt:any){
let e=evt.value;
}
pointsearnedonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
metatagonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltytransactionservice.getltytransactionsByEID(pkcol).then(res => {

this.ltytransactionservice.formData=res.ltytransaction;
let formproperty=res.ltytransaction.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltytransaction.pkcol;
this.formid=res.ltytransaction.transactionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltytransaction.transactionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltytransactionForm.patchValue({
transactionid: res.ltytransaction.transactionid,
sourcefield: res.ltytransaction.sourcefield,
sourcereference: res.ltytransaction.sourcereference,
reference: res.ltytransaction.reference,
customerid: res.ltytransaction.customerid,
customeriddesc: res.ltytransaction.customeriddesc,
customername: res.ltytransaction.customername,
categoryid: res.ltytransaction.categoryid,
categoryiddesc: res.ltytransaction.categoryiddesc,
email: res.ltytransaction.email,
phone: res.ltytransaction.phone,
address: res.ltytransaction.address,
loyaltycardnumber: res.ltytransaction.loyaltycardnumber,
purchasedate: this.ngbDateParserFormatter.parse(res.ltytransaction.purchasedate),
merchantid: res.ltytransaction.merchantid,
merchantiddesc: res.ltytransaction.merchantiddesc,
storeid: res.ltytransaction.storeid,
storeiddesc: res.ltytransaction.storeiddesc,
transactiontype: res.ltytransaction.transactiontype,
transactiontypedesc: res.ltytransaction.transactiontypedesc,
currency: res.ltytransaction.currency,
currencydesc: res.ltytransaction.currencydesc,
amount: res.ltytransaction.amount,
pointsearned: res.ltytransaction.pointsearned,
details: res.ltytransaction.details,
metatag: JSON.parse(res.ltytransaction.metatag),
status: res.ltytransaction.status,
statusdesc: res.ltytransaction.statusdesc,
});
this.ltytransactiondetailsvisiblelist=res.ltytransactiondetailsvisiblelist;
//Child Tables if any
this.ltytransactionservice.ltytransactiondetails = res.ltytransactiondetails;
this.SetltytransactiondetailsTableConfig();
this.ltytransactiondetailsLoadTable();
  setTimeout(() => {
  this.SetltytransactiondetailsTableddConfig();
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
  for (let key in this.ltytransactionForm.controls) {
    if (this.ltytransactionForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltytransactionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltytransactionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltytransactionForm.value;
obj.purchasedate=new Date(this.ltytransactionForm.get('purchasedate').value ? this.ngbDateParserFormatter.format(this.ltytransactionForm.get('purchasedate').value)+'  UTC' :null);
obj.metatag=JSON.stringify(this.ltytransactionForm.get('metatag').value);
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
Object.keys(this.ltytransactionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltytransactionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltytransactionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltytransactionservice.formData=this.ltytransactionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltytransactionForm.controls[key] != null)
    {
        this.ltytransactionservice.formData[key] = this.ltytransactionForm.controls[key].value;
    }
}
}
}
this.ltytransactionservice.formData.purchasedate=new Date(this.ltytransactionForm.get('purchasedate').value ? this.ngbDateParserFormatter.format(this.ltytransactionForm.get('purchasedate').value)+'  UTC' :null);
this.ltytransactionservice.formData.metatag=JSON.stringify(this.ltytransactionForm.get('metatag').value);
this.ltytransactionservice.formData.DeletedltytransactiondetailIDs = this.DeletedltytransactiondetailIDs;
console.log(this.ltytransactionservice.formData);
this.ltytransactionservice.formData=this.ltytransactionForm.value;
this.ltytransactionservice.saveOrUpdateltytransactions().subscribe(
async res => {
if (this.ltytransactiondetailssource.data)
{
    for (let i = 0; i < this.ltytransactiondetailssource.data.length; i++)
    {
        if (this.ltytransactiondetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltytransactiondetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltytransaction);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltytransactionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltytransaction);
}
else
{
this.FillData(res);
}
}
this.ltytransactionForm.markAsUntouched();
this.ltytransactionForm.markAsPristine();
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
data: {customerid:this.ltytransactionForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.ltytransactionForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmerchantid( merchantid) {
/*let ScreenType='2';
this.dialog.open(ltymerchantComponent, 
{
data: {merchantid:this.ltytransactionForm.get('merchantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstoreid( storeid) {
/*let ScreenType='2';
this.dialog.open(ltystoreComponent, 
{
data: {storeid:this.ltytransactionForm.get('storeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditltytransactiondetail(event:any,transactiondetailid:any, transactionid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ltytransactiondetailComponent, 
{
data:  {  showview:this.showview,save:false,event,transactiondetailid, transactionid,visiblelist:this.ltytransactiondetailsvisiblelist,  hidelist:this.ltytransactiondetailshidelist,ScreenType:2  },
header: 'Transaction Details'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ltytransactiondetailssource.add(res);
this.ltytransactiondetailssource.refresh();
}
else
{
this.ltytransactiondetailssource.update(event.data, res);
}
}
});
}

onDeleteltytransactiondetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltytransactiondetailIDs += childID + ",";
this.ltytransactionservice.ltytransactiondetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes ltytransactiondetails
ltytransactiondetailssettings:any;
ltytransactiondetailssource: any;

showltytransactiondetailsCheckbox()
{
debugger;
if(this.tblltytransactiondetailssource.settings['selectMode']== 'multi')this.tblltytransactiondetailssource.settings['selectMode']= 'single';
else
this.tblltytransactiondetailssource.settings['selectMode']= 'multi';
this.tblltytransactiondetailssource.initGrid();
}
deleteltytransactiondetailsAll()
{
this.tblltytransactiondetailssource.settings['selectMode'] = 'single';
}
showltytransactiondetailsFilter()
{
  setTimeout(() => {
  this.SetltytransactiondetailsTableddConfig();
  });
      if(this.tblltytransactiondetailssource.settings!=null)this.tblltytransactiondetailssource.settings['hideSubHeader'] =!this.tblltytransactiondetailssource.settings['hideSubHeader'];
this.tblltytransactiondetailssource.initGrid();
}
showltytransactiondetailsInActive()
{
}
enableltytransactiondetailsInActive()
{
}
async SetltytransactiondetailsTableddConfig()
{
if(!this.bfilterPopulateltytransactiondetails){

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltytransactiondetailsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.dataltytransactiondetailsproductid3.push(obj);
}
if((this.tblltytransactiondetailssource.settings as any).columns['productid'])
{
(this.tblltytransactiondetailssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltytransactiondetailsproductid3));
this.tblltytransactiondetailssource.initGrid();
}
});

this.bomasterdataservice.getList("iudjf").then(res=>
{
var datacategoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltytransactiondetailscategoryid3.push(defaultobj);
for(let i=0; i<datacategoryid2.length; i++){
var obj= { value: datacategoryid2[i].masterdataid, title:datacategoryid2[i].masterdatadescription};
this.dataltytransactiondetailscategoryid3.push(obj);
}
if((this.tblltytransactiondetailssource.settings as any).columns['categoryid'])
{
(this.tblltytransactiondetailssource.settings as any).columns['categoryid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltytransactiondetailscategoryid3));
this.tblltytransactiondetailssource.initGrid();
}
});

this.bomasterdataservice.getList("k2sbc").then(res=>
{
var datapromotionid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltytransactiondetailspromotionid3.push(defaultobj);
for(let i=0; i<datapromotionid2.length; i++){
var obj= { value: datapromotionid2[i].masterdataid, title:datapromotionid2[i].masterdatadescription};
this.dataltytransactiondetailspromotionid3.push(obj);
}
if((this.tblltytransactiondetailssource.settings as any).columns['promotionid'])
{
(this.tblltytransactiondetailssource.settings as any).columns['promotionid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltytransactiondetailspromotionid3));
this.tblltytransactiondetailssource.initGrid();
}
});
}
this.bfilterPopulateltytransactiondetails=true;
}
async ltytransactiondetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltytransactiondetailsTableConfig()
{
this.ltytransactiondetailssettings = {
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
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataltytransactiondetailsproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
sku: {
title: 'S K U',
type: '',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataltytransactiondetailscategoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
grossvalue: {
title: 'Gross Value',
type: 'number',
filter:true,
},
promotionid: {
title: 'Promotion',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataltytransactiondetailspromotionid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
ltytransactiondetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltytransactiondetailsID)>=0)
{
this.ltytransactiondetailssource=new LocalDataSource();
this.ltytransactiondetailssource.load(this.ltytransactionservice.ltytransactiondetails as  any as LocalDataSource);
this.ltytransactiondetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ltytransactiondetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltytransactionservice.ltytransactiondetails.length == 0)
{
    this.tblltytransactiondetailssource.grid.createFormShown = true;
}
else
{
    let obj = new ltytransactiondetail();
    this.ltytransactionservice.ltytransactiondetails.push(obj);
    this.ltytransactiondetailssource.refresh();
    if ((this.ltytransactionservice.ltytransactiondetails.length / this.ltytransactiondetailssource.getPaging().perPage).toFixed(0) + 1 != this.ltytransactiondetailssource.getPaging().page)
    {
        this.ltytransactiondetailssource.setPage((this.ltytransactionservice.ltytransactiondetails.length / this.ltytransactiondetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltytransactiondetailssource.grid.edit(this.tblltytransactiondetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltytransactiondetailssource.data.indexOf(event.data);
this.onDeleteltytransactiondetail(event,event.data.transactiondetailid,((this.ltytransactiondetailssource.getPaging().page-1) *this.ltytransactiondetailssource.getPaging().perPage)+index);
this.ltytransactiondetailssource.refresh();
break;
}
}

*/
ltytransactiondetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditltytransactiondetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditltytransactiondetail(event,event.data.transactiondetailid,this.formid);
break;
case 'delete':
this.onDeleteltytransactiondetail(event,event.data.transactiondetailid,((this.ltytransactiondetailssource.getPaging().page-1) *this.ltytransactiondetailssource.getPaging().perPage)+event.index);
this.ltytransactiondetailssource.refresh();
break;
}
}
ltytransactiondetailsonDelete(obj) {
let transactiondetailid=obj.data.transactiondetailid;
if (confirm('Are you sure to delete this record ?')) {
this.ltytransactionservice.deleteltytransaction(transactiondetailid).then(res=>
this.ltytransactiondetailsLoadTable()
);
}
}
ltytransactiondetailsPaging(val)
{
debugger;
this.ltytransactiondetailssource.setPaging(1, val, true);
}

handleltytransactiondetailsGridSelected(event:any) {
this.ltytransactiondetailsselectedindex=this.ltytransactionservice.ltytransactiondetails.findIndex(i => i.transactiondetailid === event.data.transactiondetailid);
}
IsltytransactiondetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltytransactiondetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltytransactiondetails

}



