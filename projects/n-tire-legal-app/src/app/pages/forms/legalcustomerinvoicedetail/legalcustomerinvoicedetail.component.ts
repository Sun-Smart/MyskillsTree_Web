import { legalcustomerinvoicedetailService } from './../../../service/legalcustomerinvoicedetail.service';
import { legalcustomerinvoicedetail } from './../../../model/legalcustomerinvoicedetail.model';
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
import { legalcustomerinvoice} from './../../../model/legalcustomerinvoice.model';
import { legalcustomerinvoiceComponent } from './../../../pages/forms/legalcustomerinvoice/legalcustomerinvoice.component';
import { legalcustomerinvoiceService } from './../../../service/legalcustomerinvoice.service';
//popups
import { erpitemmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
//popups
import { legalcase} from './../../../model/legalcase.model';
import { legalcaseComponent } from './../../../pages/forms/legalcase/legalcase.component';
import { legalcaseService } from './../../../service/legalcase.service';
//popups
import { erptaxmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
//popups
import { erpsalesorderdetail} from '../../../../../../n-tire-procurement-app/src/app/model/erpsalesorderdetail.model';
import { erpsalesorderdetailComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderdetail/erpsalesorderdetail.component';
import { erpsalesorderdetailService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsalesorderdetail.service';
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
selector: 'app-legalcustomerinvoicedetail',
templateUrl: './legalcustomerinvoicedetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcustomerinvoicedetailComponent implements OnInit {
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
bfilterPopulatelegalcustomerinvoicedetails:boolean=false;
datalegalcustomerinvoicedetailsinvoiceid3:any=[];
datalegalcustomerinvoicedetailsitemtype3:any=[];
datalegalcustomerinvoicedetailsitemid3:any=[];
datalegalcustomerinvoicedetailscaseid3:any=[];
datalegalcustomerinvoicedetailsuom3:any=[];
datalegalcustomerinvoicedetailscurrency3:any=[];
datalegalcustomerinvoicedetailstax1name3:any=[];
datalegalcustomerinvoicedetailstax2name3:any=[];
datalegalcustomerinvoicedetailsbasecurrency3:any=[];
datalegalcustomerinvoicedetailssodetailid3:any=[];
datalegalcustomerinvoicedetailspaymenttermtype3:any=[];
 legalcustomerinvoicedetailForm: FormGroup;
invoiceidList: legalcustomerinvoice[];
invoiceidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
invoiceid_legalcustomerinvoicesForm: FormGroup;//autocomplete
invoiceid_legalcustomerinvoicesoptions:any;//autocomplete
invoiceid_legalcustomerinvoicesformatter:any;//autocomplete
itemtypeList: boconfigvalue[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
caseidList: legalcase[];
caseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
caseid_legalcasesForm: FormGroup;//autocomplete
caseid_legalcasesoptions:any;//autocomplete
caseid_legalcasesformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
tax1nameList: erptaxmaster[];
tax2nameList: erptaxmaster[];
basecurrencyList: boconfigvalue[];
sodetailidList: erpsalesorderdetail[];
sodetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
sodetailid_erpsalesorderdetailsForm: FormGroup;//autocomplete
sodetailid_erpsalesorderdetailsoptions:any;//autocomplete
sodetailid_erpsalesorderdetailsformatter:any;//autocomplete
paymenttermtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
legalcustomerinvoicedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;


itemidvisible:boolean = false;




constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcustomerinvoicedetailservice: legalcustomerinvoicedetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legalcustomerinvoiceservice:legalcustomerinvoiceService,
private erpitemmasterservice:erpitemmasterService,
private legalcaseservice:legalcaseService,
private erptaxmasterservice:erptaxmasterService,
private erpsalesorderdetailservice:erpsalesorderdetailService,
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
this.legalcustomerinvoicedetailForm  = this.fb.group({
pk:[null],
customerid: [null],
invoiceid: [null],
invoiceiddesc: [null],
invoicedetailid: [null],
itemtype: [null],
itemtypedesc: [null],
itemid: [null],
itemiddesc: [null],
itemdescription: [null],
caseid: [null],
caseiddesc: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
unitprice: [null],
discountpercent: [null],
discountvalue: [null],
tax1name: [null],
tax1namedesc: [null],
tax1value: [null],
tax2name: [null],
tax2namedesc: [null],
tax2value: [null],
othercharges: [null],
totalvalue: [null],
basecurrency: [null],
basecurrencydesc: [null],
basevalue: [null],
soid: [null],
sodetailid: [null],
sodetailiddesc: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
customerporeference: [null],
productserialno: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcustomerinvoicedetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcustomerinvoicedetailForm.dirty && this.legalcustomerinvoicedetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.invoicedetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.invoicedetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.invoicedetailid && pkDetail) {
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
let legalcustomerinvoicedetailid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=legalcustomerinvoicedetailid;
//this.sharedService.alert(legalcustomerinvoicedetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legalcustomerinvoiceservice.getlegalcustomerinvoicesList().then(res => 
{
this.invoiceidList = res as legalcustomerinvoice[];
if(this.legalcustomerinvoicedetailservice.formData && this.legalcustomerinvoicedetailservice.formData.invoiceid){
this.invoiceidoptionsEvent.emit(this.invoiceidList);
this.legalcustomerinvoicedetailForm.patchValue({
    invoiceid: this.legalcustomerinvoicedetailservice.formData.invoiceid,
    invoiceiddesc: this.legalcustomerinvoicedetailservice.formData.invoiceiddesc,
});
}
{
let arrinvoiceid = this.invoiceidList.filter(v => v.invoiceid == this.legalcustomerinvoicedetailForm.get('invoiceid').value);
let objinvoiceid;
if (arrinvoiceid.length > 0) objinvoiceid = arrinvoiceid[0];
if (objinvoiceid)
{
}
}
}
).catch((err) => {console.log(err);});
this.invoiceid_legalcustomerinvoicesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.invoiceidList.filter(v => v.invoicenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.invoiceid_legalcustomerinvoicesformatter = (result: any) => result.invoicenumber;
this.configservice.getList("legalitemtype").then(res => this.itemtypeList = res as boconfigvalue[]);
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.legalcustomerinvoicedetailservice.formData && this.legalcustomerinvoicedetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.legalcustomerinvoicedetailForm.patchValue({
    itemid: this.legalcustomerinvoicedetailservice.formData.itemid,
    itemiddesc: this.legalcustomerinvoicedetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.legalcustomerinvoicedetailForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
    this.legalcustomerinvoicedetailForm.patchValue({ itemdescription: objitemid.itemshortname });
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.legalcaseservice.getlegalcasesList().then(res => 
{
this.caseidList = res as legalcase[];
if(this.legalcustomerinvoicedetailservice.formData && this.legalcustomerinvoicedetailservice.formData.caseid){
this.caseidoptionsEvent.emit(this.caseidList);
this.legalcustomerinvoicedetailForm.patchValue({
    caseid: this.legalcustomerinvoicedetailservice.formData.caseid,
    caseiddesc: this.legalcustomerinvoicedetailservice.formData.caseiddesc,
});
}
{
let arrcaseid = this.caseidList.filter(v => v.caseid == this.legalcustomerinvoicedetailForm.get('caseid').value);
let objcaseid;
if (arrcaseid.length > 0) objcaseid = arrcaseid[0];
if (objcaseid)
{
    this.legalcustomerinvoicedetailForm.patchValue({ itemdescription: objcaseid.casenumber });
}
}
}
).catch((err) => {console.log(err);});
this.caseid_legalcasesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.caseidList.filter(v => v.casenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.caseid_legalcasesformatter = (result: any) => result.casenumber;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax1nameList = res as erptaxmaster[];
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erpsalesorderdetailservice.geterpsalesorderdetailsList().then(res => 
{
this.sodetailidList = res as erpsalesorderdetail[];
if(this.legalcustomerinvoicedetailservice.formData && this.legalcustomerinvoicedetailservice.formData.sodetailid){
this.sodetailidoptionsEvent.emit(this.sodetailidList);
this.legalcustomerinvoicedetailForm.patchValue({
    sodetailid: this.legalcustomerinvoicedetailservice.formData.sodetailid,
    sodetailiddesc: this.legalcustomerinvoicedetailservice.formData.sodetailiddesc,
});
}
{
let arrsodetailid = this.sodetailidList.filter(v => v.sodetailid == this.legalcustomerinvoicedetailForm.get('sodetailid').value);
let objsodetailid;
if (arrsodetailid.length > 0) objsodetailid = arrsodetailid[0];
if (objsodetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.sodetailid_erpsalesorderdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.sodetailidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.sodetailid_erpsalesorderdetailsformatter = (result: any) => result.description;
this.configservice.getList("paymentterm").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.legalcustomerinvoicedetailservice.getlegalcustomerinvoicedetailsList().then(res => {
      this.pkList = res as legalcustomerinvoicedetail[];
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
this.legalcustomerinvoicedetailForm.markAsUntouched();
this.legalcustomerinvoicedetailForm.markAsPristine();
}
onSelectedinvoiceid(invoiceidDetail: any) {
if (invoiceidDetail.invoiceid && invoiceidDetail) {
this.legalcustomerinvoicedetailForm.patchValue({
invoiceid: invoiceidDetail.invoiceid,
invoiceiddesc: invoiceidDetail.invoicenumber,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.legalcustomerinvoicedetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});
this.legalcustomerinvoicedetailForm.patchValue({itemdescription:itemidDetail.itemshortname});

}
}

onSelectedcaseid(caseidDetail: any) {
if (caseidDetail.caseid && caseidDetail) {
this.legalcustomerinvoicedetailForm.patchValue({
caseid: caseidDetail.caseid,
caseiddesc: caseidDetail.casenumber,

});
this.legalcustomerinvoicedetailForm.patchValue({itemdescription:caseidDetail.casenumber});

}
}

onSelectedsodetailid(sodetailidDetail: any) {
if (sodetailidDetail.sodetailid && sodetailidDetail) {
this.legalcustomerinvoicedetailForm.patchValue({
sodetailid: sodetailidDetail.sodetailid,
sodetailiddesc: sodetailidDetail.description,

});

}
}




resetForm() {
if (this.legalcustomerinvoicedetailForm != null)
this.legalcustomerinvoicedetailForm.reset();
this.legalcustomerinvoicedetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.itemidvisible = false;
}

    onDelete() {
        let invoicedetailid = this.legalcustomerinvoicedetailForm.get('invoicedetailid').value;
        if(invoicedetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcustomerinvoicedetailservice.deletelegalcustomerinvoicedetail(invoicedetailid).then(res =>
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
    this.legalcustomerinvoicedetailForm.patchValue({
        invoicedetailid: null
    });
    if(this.legalcustomerinvoicedetailservice.formData.invoicedetailid!=null)this.legalcustomerinvoicedetailservice.formData.invoicedetailid=null;
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
        else if(ctrltype=="string")
{
this.legalcustomerinvoicedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcustomerinvoicedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcustomerinvoicedetailForm.controls[key]!=undefined)
{
this.legalcustomerinvoicedetailForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
customeridonChange(evt:any){
let e=evt.value;
}
invoiceidonChange(evt:any){
let e=evt.value;
}
invoicedetailidonChange(evt:any){
let e=evt.value;
}
itemtypeonChange(evt:any){
let e=this.f.itemtype.value as any;
this.itemidvisible=false;
if(this.f.itemtype.value == 'I')this.itemidvisible=true;
this.legalcustomerinvoicedetailForm.patchValue({itemtypedesc:evt.options[evt.options.selectedIndex].text});
}
itemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
caseidonChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.legalcustomerinvoicedetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.legalcustomerinvoicedetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
discountvalueonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.legalcustomerinvoicedetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.legalcustomerinvoicedetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
}
tax2valueonChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
totalvalueonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.legalcustomerinvoicedetailForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
basevalueonChange(evt:any){
let e=evt.value;
}
soidonChange(evt:any){
let e=evt.value;
}
sodetailidonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.legalcustomerinvoicedetailForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
customerporeferenceonChange(evt:any){
let e=evt.value;
}
productserialnoonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlegalcustomerinvoicedetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcustomerinvoicedetailservice.getlegalcustomerinvoicedetailsByEID(pkcol).then(res => {

this.legalcustomerinvoicedetailservice.formData=res.legalcustomerinvoicedetail;
let formproperty=res.legalcustomerinvoicedetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcustomerinvoicedetail.pkcol;
this.formid=res.legalcustomerinvoicedetail.invoicedetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcustomerinvoicedetailservice.formData=res.legalcustomerinvoicedetail;
this.formid=res.legalcustomerinvoicedetail.invoicedetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcustomerinvoicedetailForm.patchValue({
customerid: res.legalcustomerinvoicedetail.customerid,
invoiceid: res.legalcustomerinvoicedetail.invoiceid,
invoiceiddesc: res.legalcustomerinvoicedetail.invoiceiddesc,
invoicedetailid: res.legalcustomerinvoicedetail.invoicedetailid,
itemtype: res.legalcustomerinvoicedetail.itemtype,
itemtypedesc: res.legalcustomerinvoicedetail.itemtypedesc,
itemid: res.legalcustomerinvoicedetail.itemid,
itemiddesc: res.legalcustomerinvoicedetail.itemiddesc,
itemdescription: res.legalcustomerinvoicedetail.itemdescription,
caseid: res.legalcustomerinvoicedetail.caseid,
caseiddesc: res.legalcustomerinvoicedetail.caseiddesc,
quantity: res.legalcustomerinvoicedetail.quantity,
uom: res.legalcustomerinvoicedetail.uom,
uomdesc: res.legalcustomerinvoicedetail.uomdesc,
currency: res.legalcustomerinvoicedetail.currency,
currencydesc: res.legalcustomerinvoicedetail.currencydesc,
unitprice: res.legalcustomerinvoicedetail.unitprice,
discountpercent: res.legalcustomerinvoicedetail.discountpercent,
discountvalue: res.legalcustomerinvoicedetail.discountvalue,
tax1name: res.legalcustomerinvoicedetail.tax1name,
tax1namedesc: res.legalcustomerinvoicedetail.tax1namedesc,
tax1value: res.legalcustomerinvoicedetail.tax1value,
tax2name: res.legalcustomerinvoicedetail.tax2name,
tax2namedesc: res.legalcustomerinvoicedetail.tax2namedesc,
tax2value: res.legalcustomerinvoicedetail.tax2value,
othercharges: res.legalcustomerinvoicedetail.othercharges,
totalvalue: res.legalcustomerinvoicedetail.totalvalue,
basecurrency: res.legalcustomerinvoicedetail.basecurrency,
basecurrencydesc: res.legalcustomerinvoicedetail.basecurrencydesc,
basevalue: res.legalcustomerinvoicedetail.basevalue,
soid: res.legalcustomerinvoicedetail.soid,
sodetailid: res.legalcustomerinvoicedetail.sodetailid,
sodetailiddesc: res.legalcustomerinvoicedetail.sodetailiddesc,
paymenttermtype: res.legalcustomerinvoicedetail.paymenttermtype,
paymenttermtypedesc: res.legalcustomerinvoicedetail.paymenttermtypedesc,
customerporeference: res.legalcustomerinvoicedetail.customerporeference,
productserialno: res.legalcustomerinvoicedetail.productserialno,
remarks: res.legalcustomerinvoicedetail.remarks,
status: res.legalcustomerinvoicedetail.status,
statusdesc: res.legalcustomerinvoicedetail.statusdesc,
});
//visible list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("itemid")>=0)this.itemidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("itemid")>=0)this.itemidvisible = false;
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
  for (let key in this.legalcustomerinvoicedetailForm.controls) {
    if (this.legalcustomerinvoicedetailForm.controls[key] != null) {
if(false)
{
if(this.legalcustomerinvoicedetailservice.formData!=null && this.legalcustomerinvoicedetailservice.formData[key]!=null  && this.legalcustomerinvoicedetailservice.formData[key]!='[]' && this.legalcustomerinvoicedetailservice.formData[key]!=undefined && this.legalcustomerinvoicedetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcustomerinvoicedetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcustomerinvoicedetailservice.formData!=null && this.legalcustomerinvoicedetailservice.formData[key]!=null   && this.legalcustomerinvoicedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcustomerinvoicedetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcustomerinvoicedetailservice.formData!=null && this.legalcustomerinvoicedetailservice.formData[key]!=null   && this.legalcustomerinvoicedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcustomerinvoicedetailservice.formData[key]+"'><div class='progress__number'>"+this.legalcustomerinvoicedetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcustomerinvoicedetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcustomerinvoicedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcustomerinvoicedetailForm.value;
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

private legalcustomerinvoicedetailtoggleOption(){
this.legalcustomerinvoicedetailshowOption = this.legalcustomerinvoicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcustomerinvoicedetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcustomerinvoicedetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcustomerinvoicedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcustomerinvoicedetailservice.formData=this.legalcustomerinvoicedetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcustomerinvoicedetailForm.controls[key] != null)
    {
        this.legalcustomerinvoicedetailservice.formData[key] = this.legalcustomerinvoicedetailForm.controls[key].value;
    }
}
}
}
console.log(this.legalcustomerinvoicedetailservice.formData);
this.legalcustomerinvoicedetailservice.formData=this.legalcustomerinvoicedetailForm.value;
this.legalcustomerinvoicedetailservice.saveOrUpdatelegalcustomerinvoicedetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomerinvoicedetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcustomerinvoicedetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomerinvoicedetail);
}
else
{
this.FillData(res);
}
}
this.legalcustomerinvoicedetailForm.markAsUntouched();
this.legalcustomerinvoicedetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditinvoiceid( invoiceid) {
/*let ScreenType='2';
this.dialog.open(legalcustomerinvoiceComponent, 
{
data: {invoiceid:this.legalcustomerinvoicedetailForm.get('invoiceid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.legalcustomerinvoicedetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcaseid( caseid) {
/*let ScreenType='2';
this.dialog.open(legalcaseComponent, 
{
data: {caseid:this.legalcustomerinvoicedetailForm.get('caseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.legalcustomerinvoicedetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.legalcustomerinvoicedetailForm.get('tax2name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsodetailid( sodetailid) {
/*let ScreenType='2';
this.dialog.open(erpsalesorderdetailComponent, 
{
data: {sodetailid:this.legalcustomerinvoicedetailForm.get('sodetailid').value, ScreenType:2 }
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



