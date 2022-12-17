import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
import { erpsupplierquotationmaster } from './../../../model/erpsupplierquotationmaster.model';
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
//hyperlinks services
import { erprfqmaster} from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
//FK field services
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
//detail table services
import { erpquotationpaymentterm } from './../../../model/erpquotationpaymentterm.model';
import { erpquotationpaymenttermComponent } from './../../../pages/forms/erpquotationpaymentterm/erpquotationpaymentterm.component';
//FK services
import { erpsupplierquotationdetail } from './../../../model/erpsupplierquotationdetail.model';
import { erpsupplierquotationdetailComponent } from './../../../pages/forms/erpsupplierquotationdetail/erpsupplierquotationdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
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
selector: 'app-erpsupplierquotationmaster',
templateUrl: './erpsupplierquotationmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierquotationmasterComponent implements OnInit {
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
bfilterPopulateerpsupplierquotationmasters:boolean=false;
dataerpsupplierquotationmastersrfqid3:any=[];
dataerpsupplierquotationmastersquotationid3:any=[];
dataerpsupplierquotationmasterssupplierid3:any=[];
dataerpsupplierquotationmasterscurrency3:any=[];
dataerpsupplierquotationmastersshipto3:any=[];
dataerpsupplierquotationmastersbillto3:any=[];
dataerpsupplierquotationmastersfreightterms3:any=[];
dataerpsupplierquotationmasterspaymentterms3:any=[];
dataerpquotationpaymenttermssupplierid3:any=[];
dataerpquotationpaymenttermsquoteid3:any=[];
dataerpquotationpaymenttermspaymenttermtype3:any=[];
dataerpquotationpaymenttermsrfqid3:any=[];
bfilterPopulateerpquotationpaymentterms:boolean=false;
dataerpsupplierquotationdetailsitemid3:any=[];
dataerpsupplierquotationdetailspaymenttermtype3:any=[];
dataerpsupplierquotationdetailstax2name3:any=[];
dataerpsupplierquotationdetailstax1name3:any=[];
dataerpsupplierquotationdetailsuom3:any=[];
dataerpsupplierquotationdetailsquotationid3:any=[];
dataerpsupplierquotationdetailssupplierid3:any=[];
dataerpsupplierquotationdetailsrfqid3:any=[];
dataerpsupplierquotationdetailscurrency3:any=[];
bfilterPopulateerpsupplierquotationdetails:boolean=false;
@ViewChild('tblerpquotationpaymenttermssource',{static:false}) tblerpquotationpaymenttermssource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplierquotationdetailssource',{static:false}) tblerpsupplierquotationdetailssource: Ng2SmartTableComponent;
 erpsupplierquotationmasterForm: FormGroup;
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
quotationidList: erpsupplierquotationmaster[];
quotationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
quotationid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
quotationid_erpsupplierquotationmastersoptions:any;//autocomplete
quotationid_erpsupplierquotationmastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
currencyList: boconfigvalue[];
shiptoList: bobranchlocation[];
shiptooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
shipto_bobranchlocationsForm: FormGroup;//autocomplete
shipto_bobranchlocationsoptions:any;//autocomplete
shipto_bobranchlocationsformatter:any;//autocomplete
billtoList: bobranchmaster[];
billtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
billto_bobranchmastersForm: FormGroup;//autocomplete
billto_bobranchmastersoptions:any;//autocomplete
billto_bobranchmastersformatter:any;//autocomplete
freighttermsList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierquotationmastershowOption:boolean;
erpquotationpaymenttermshowOption:boolean;
erpsupplierquotationdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpquotationpaymenttermsvisiblelist:any;
erpquotationpaymenttermshidelist:any;
erpsupplierquotationdetailsvisiblelist:any;
erpsupplierquotationdetailshidelist:any;

DeletederpquotationpaymenttermIDs: string="";
erpquotationpaymenttermsID: string = "1";
erpquotationpaymenttermsselectedindex:any;
DeletederpsupplierquotationdetailIDs: string="";
erpsupplierquotationdetailsID: string = "2";
erpsupplierquotationdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erprfqmasterservice: erprfqmasterService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchlocationservice:bobranchlocationService,
private bobranchmasterservice:bobranchmasterService,
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
this.erpsupplierquotationmasterForm  = this.fb.group({
pk:[null],
rfqid: [null],
rfqiddesc: [null],
rfqreference: [null],
quotationid: [null],
quotationiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
quotationreference: [null],
versionnumber: [null],
quotationdate: [null],
rfqreleaseddate: [null],
expirationdate: [null],
currency: [null],
currencydesc: [null],
quotationamount: [null],
discountpercent: [null],
shipto: [null],
shiptodesc: [null],
billto: [null],
billtodesc: [null],
freightterms: [null],
freighttermsdesc: [null],
paymentterms: [null],
paymenttermsdesc: [null],
quotationremarks: [null],
batchid: [null],
status: [null],
statusdesc: [null],
statusremarks: [null],
});
}

get f() { return this.erpsupplierquotationmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierquotationmasterForm.dirty && this.erpsupplierquotationmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.quotationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.quotationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.quotationid && pkDetail) {
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
let erpsupplierquotationmasterid = null;

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
this.formid=erpsupplierquotationmasterid;
//this.sharedService.alert(erpsupplierquotationmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpquotationpaymenttermsTableConfig();
  setTimeout(() => {
  this.SeterpquotationpaymenttermsTableddConfig();
  });

this.SeterpsupplierquotationdetailsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierquotationdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erpsupplierquotationmasterservice.formData && this.erpsupplierquotationmasterservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erpsupplierquotationmasterForm.patchValue({
    rfqid: this.erpsupplierquotationmasterservice.formData.rfqid,
    rfqiddesc: this.erpsupplierquotationmasterservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erpsupplierquotationmasterForm.get('rfqid').value);
let objrfqid;
if (arrrfqid.length > 0) objrfqid = arrrfqid[0];
if (objrfqid)
{
}
}
}
).catch((err) => {console.log(err);});
this.rfqid_erprfqmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.rfqidList.filter(v => v.rfqcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.rfqid_erprfqmastersformatter = (result: any) => result.rfqcode;
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quotationidList = res as erpsupplierquotationmaster[];
if(this.erpsupplierquotationmasterservice.formData && this.erpsupplierquotationmasterservice.formData.quotationid){
this.quotationidoptionsEvent.emit(this.quotationidList);
this.erpsupplierquotationmasterForm.patchValue({
    quotationid: this.erpsupplierquotationmasterservice.formData.quotationid,
    quotationiddesc: this.erpsupplierquotationmasterservice.formData.quotationiddesc,
});
}
{
let arrquotationid = this.quotationidList.filter(v => v.quotationid == this.erpsupplierquotationmasterForm.get('quotationid').value);
let objquotationid;
if (arrquotationid.length > 0) objquotationid = arrquotationid[0];
if (objquotationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.quotationid_erpsupplierquotationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.quotationidList.filter(v => v.quotationreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.quotationid_erpsupplierquotationmastersformatter = (result: any) => result.quotationreference;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplierquotationmasterservice.formData && this.erpsupplierquotationmasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplierquotationmasterForm.patchValue({
    supplierid: this.erpsupplierquotationmasterservice.formData.supplierid,
    supplieriddesc: this.erpsupplierquotationmasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplierquotationmasterForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.shiptoList = res as bobranchlocation[];
if(this.erpsupplierquotationmasterservice.formData && this.erpsupplierquotationmasterservice.formData.shipto){
this.shiptooptionsEvent.emit(this.shiptoList);
this.erpsupplierquotationmasterForm.patchValue({
    shipto: this.erpsupplierquotationmasterservice.formData.shipto,
    shiptodesc: this.erpsupplierquotationmasterservice.formData.shiptodesc,
});
}
{
let arrshipto = this.shiptoList.filter(v => v.locationid == this.erpsupplierquotationmasterForm.get('shipto').value);
let objshipto;
if (arrshipto.length > 0) objshipto = arrshipto[0];
if (objshipto)
{
}
}
}
).catch((err) => {console.log(err);});
this.shipto_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.shiptoList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.shipto_bobranchlocationsformatter = (result: any) => result.locationname;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.billtoList = res as bobranchmaster[];
if(this.erpsupplierquotationmasterservice.formData && this.erpsupplierquotationmasterservice.formData.billto){
this.billtooptionsEvent.emit(this.billtoList);
this.erpsupplierquotationmasterForm.patchValue({
    billto: this.erpsupplierquotationmasterservice.formData.billto,
    billtodesc: this.erpsupplierquotationmasterservice.formData.billtodesc,
});
}
{
let arrbillto = this.billtoList.filter(v => v.branchid == this.erpsupplierquotationmasterForm.get('billto').value);
let objbillto;
if (arrbillto.length > 0) objbillto = arrbillto[0];
if (objbillto)
{
}
}
}
).catch((err) => {console.log(err);});
this.billto_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.billtoList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.billto_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("freightterms").then(res => this.freighttermsList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => {
      this.pkList = res as erpsupplierquotationmaster[];
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
this.erpsupplierquotationmasterForm.markAsUntouched();
this.erpsupplierquotationmasterForm.markAsPristine();
}
onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erpsupplierquotationmasterForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelectedquotationid(quotationidDetail: any) {
if (quotationidDetail.quotationid && quotationidDetail) {
this.erpsupplierquotationmasterForm.patchValue({
quotationid: quotationidDetail.quotationid,
quotationiddesc: quotationidDetail.quotationreference,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplierquotationmasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedshipto(shiptoDetail: any) {
if (shiptoDetail.locationid && shiptoDetail) {
this.erpsupplierquotationmasterForm.patchValue({
shipto: shiptoDetail.locationid,
shiptodesc: shiptoDetail.locationname,

});

}
}

onSelectedbillto(billtoDetail: any) {
if (billtoDetail.branchid && billtoDetail) {
this.erpsupplierquotationmasterForm.patchValue({
billto: billtoDetail.branchid,
billtodesc: billtoDetail.branchname,

});

}
}




resetForm() {
if (this.erpsupplierquotationmasterForm != null)
this.erpsupplierquotationmasterForm.reset();
this.erpsupplierquotationmasterForm.patchValue({
billto: this.sessiondata.branchid,
billtodesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erpsupplierquotationmasterservice.erpquotationpaymentterms=[];
this.erpquotationpaymenttermsLoadTable();
this.erpsupplierquotationmasterservice.erpsupplierquotationdetails=[];
this.erpsupplierquotationdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let quotationid = this.erpsupplierquotationmasterForm.get('quotationid').value;
        if(quotationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierquotationmasterservice.deleteerpsupplierquotationmaster(quotationid).then(res =>
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
    this.erpsupplierquotationmasterForm.patchValue({
        quotationid: null
    });
    if(this.erpsupplierquotationmasterservice.formData.quotationid!=null)this.erpsupplierquotationmasterservice.formData.quotationid=null;
for (let i=0;i<this.erpsupplierquotationmasterservice.erpquotationpaymentterms.length;i++) {
this.erpsupplierquotationmasterservice.erpquotationpaymentterms[i].paytermid=null;
}
for (let i=0;i<this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.length;i++) {
this.erpsupplierquotationmasterservice.erpsupplierquotationdetails[i].quotationdetailid=null;
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
        else if(key=="quotationdate")
this.erpsupplierquotationmasterForm.patchValue({"quotationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="rfqreleaseddate")
this.erpsupplierquotationmasterForm.patchValue({"rfqreleaseddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirationdate")
this.erpsupplierquotationmasterForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsupplierquotationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierquotationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierquotationmasterForm.controls[key]!=undefined)
{
this.erpsupplierquotationmasterForm.controls[key].disable({onlySelf: true});
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
rfqidonChange(evt:any){
let e=evt.value;
}
rfqreferenceonChange(evt:any){
let e=evt.value;
}
quotationidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
quotationreferenceonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
quotationdateonChange(evt:any){
let e=evt.value;
}
rfqreleaseddateonChange(evt:any){
let e=evt.value;
}
expirationdateonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpsupplierquotationmasterForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
quotationamountonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
shiptoonChange(evt:any){
let e=evt.value;
}
billtoonChange(evt:any){
let e=evt.value;
}
freighttermsonChange(evt:any){
let e=this.f.freightterms.value as any;
this.erpsupplierquotationmasterForm.patchValue({freighttermsdesc:evt.options[evt.options.selectedIndex].text});
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erpsupplierquotationmasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
quotationremarksonChange(evt:any){
let e=evt.value;
}
batchidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
statusremarksonChange(evt:any){
let e=evt.value;
}

editerpsupplierquotationmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersByEID(pkcol).then(res => {

this.erpsupplierquotationmasterservice.formData=res.erpsupplierquotationmaster;
let formproperty=res.erpsupplierquotationmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierquotationmaster.pkcol;
this.formid=res.erpsupplierquotationmaster.quotationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierquotationmaster.quotationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierquotationmasterForm.patchValue({
rfqid: res.erpsupplierquotationmaster.rfqid,
rfqiddesc: res.erpsupplierquotationmaster.rfqiddesc,
rfqreference: res.erpsupplierquotationmaster.rfqreference,
quotationid: res.erpsupplierquotationmaster.quotationid,
quotationiddesc: res.erpsupplierquotationmaster.quotationiddesc,
supplierid: res.erpsupplierquotationmaster.supplierid,
supplieriddesc: res.erpsupplierquotationmaster.supplieriddesc,
quotationreference: res.erpsupplierquotationmaster.quotationreference,
versionnumber: res.erpsupplierquotationmaster.versionnumber,
quotationdate: this.ngbDateParserFormatter.parse(res.erpsupplierquotationmaster.quotationdate),
rfqreleaseddate: this.ngbDateParserFormatter.parse(res.erpsupplierquotationmaster.rfqreleaseddate),
expirationdate: this.ngbDateParserFormatter.parse(res.erpsupplierquotationmaster.expirationdate),
currency: res.erpsupplierquotationmaster.currency,
currencydesc: res.erpsupplierquotationmaster.currencydesc,
quotationamount: res.erpsupplierquotationmaster.quotationamount,
discountpercent: res.erpsupplierquotationmaster.discountpercent,
shipto: res.erpsupplierquotationmaster.shipto,
shiptodesc: res.erpsupplierquotationmaster.shiptodesc,
billto: res.erpsupplierquotationmaster.billto,
billtodesc: res.erpsupplierquotationmaster.billtodesc,
freightterms: res.erpsupplierquotationmaster.freightterms,
freighttermsdesc: res.erpsupplierquotationmaster.freighttermsdesc,
paymentterms: res.erpsupplierquotationmaster.paymentterms,
paymenttermsdesc: res.erpsupplierquotationmaster.paymenttermsdesc,
quotationremarks: res.erpsupplierquotationmaster.quotationremarks,
batchid: res.erpsupplierquotationmaster.batchid,
status: res.erpsupplierquotationmaster.status,
statusdesc: res.erpsupplierquotationmaster.statusdesc,
statusremarks: res.erpsupplierquotationmaster.statusremarks,
});
this.erpquotationpaymenttermsvisiblelist=res.erpquotationpaymenttermsvisiblelist;
this.erpsupplierquotationdetailsvisiblelist=res.erpsupplierquotationdetailsvisiblelist;
//Child Tables if any
this.erpsupplierquotationmasterservice.erpquotationpaymentterms = res.erpquotationpaymentterms;
this.SeterpquotationpaymenttermsTableConfig();
this.erpquotationpaymenttermsLoadTable();
  setTimeout(() => {
  this.SeterpquotationpaymenttermsTableddConfig();
  });
this.erpsupplierquotationmasterservice.erpsupplierquotationdetails = res.erpsupplierquotationdetails;
this.SeterpsupplierquotationdetailsTableConfig();
this.erpsupplierquotationdetailsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierquotationdetailsTableddConfig();
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
  for (let key in this.erpsupplierquotationmasterForm.controls) {
    if (this.erpsupplierquotationmasterForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierquotationmasterservice.formData!=null && this.erpsupplierquotationmasterservice.formData[key]!=null  && this.erpsupplierquotationmasterservice.formData[key]!='[]' && this.erpsupplierquotationmasterservice.formData[key]!=undefined && this.erpsupplierquotationmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierquotationmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierquotationmasterservice.formData!=null && this.erpsupplierquotationmasterservice.formData[key]!=null   && this.erpsupplierquotationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierquotationmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierquotationmasterservice.formData!=null && this.erpsupplierquotationmasterservice.formData[key]!=null   && this.erpsupplierquotationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierquotationmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierquotationmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierquotationmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierquotationmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierquotationmasterForm.value;
obj.quotationdate=new Date(this.erpsupplierquotationmasterForm.get('quotationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('quotationdate').value)+'  UTC' :null);
obj.rfqreleaseddate=new Date(this.erpsupplierquotationmasterForm.get('rfqreleaseddate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('rfqreleaseddate').value)+'  UTC' :null);
obj.expirationdate=new Date(this.erpsupplierquotationmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('expirationdate').value)+'  UTC' :null);
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private erpsupplierquotationmastertoggleOption(){
this.erpsupplierquotationmastershowOption = this.erpsupplierquotationmastershowOption === true ? false : true;
}

private erpquotationpaymenttermtoggleOption(){
this.erpquotationpaymenttermshowOption = this.erpquotationpaymenttermshowOption === true ? false : true;
}

private erpsupplierquotationdetailtoggleOption(){
this.erpsupplierquotationdetailshowOption = this.erpsupplierquotationdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierquotationmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierquotationmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierquotationmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierquotationmasterservice.formData=this.erpsupplierquotationmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierquotationmasterForm.controls[key] != null)
    {
        this.erpsupplierquotationmasterservice.formData[key] = this.erpsupplierquotationmasterForm.controls[key].value;
    }
}
}
}
this.erpsupplierquotationmasterservice.formData.quotationdate=new Date(this.erpsupplierquotationmasterForm.get('quotationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('quotationdate').value)+'  UTC' :null);
this.erpsupplierquotationmasterservice.formData.rfqreleaseddate=new Date(this.erpsupplierquotationmasterForm.get('rfqreleaseddate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('rfqreleaseddate').value)+'  UTC' :null);
this.erpsupplierquotationmasterservice.formData.expirationdate=new Date(this.erpsupplierquotationmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationmasterForm.get('expirationdate').value)+'  UTC' :null);
this.erpsupplierquotationmasterservice.formData.DeletederpquotationpaymenttermIDs = this.DeletederpquotationpaymenttermIDs;
this.erpsupplierquotationmasterservice.formData.DeletederpsupplierquotationdetailIDs = this.DeletederpsupplierquotationdetailIDs;
console.log(this.erpsupplierquotationmasterservice.formData);
this.erpsupplierquotationmasterservice.formData=this.erpsupplierquotationmasterForm.value;
this.erpsupplierquotationmasterservice.saveOrUpdateerpsupplierquotationmasters().subscribe(
async res => {
if (this.erpquotationpaymenttermssource.data)
{
    for (let i = 0; i < this.erpquotationpaymenttermssource.data.length; i++)
    {
        if (this.erpquotationpaymenttermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpquotationpaymenttermssource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplierquotationdetailssource.data)
{
    for (let i = 0; i < this.erpsupplierquotationdetailssource.data.length; i++)
    {
        if (this.erpsupplierquotationdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierquotationdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierquotationmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierquotationmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierquotationmaster);
}
else
{
this.FillData(res);
}
}
this.erpsupplierquotationmasterForm.markAsUntouched();
this.erpsupplierquotationmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




  viewrfqid() {
    this.dialog.open(erprfqmasterComponent,
      {
        data: { showview: false, rfqid:this.erpsupplierquotationmasterForm.get('rfqid').value, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erpsupplierquotationmasterForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditquotationid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erpsupplierquotationmasterForm.get('quotationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplierquotationmasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshipto( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.erpsupplierquotationmasterForm.get('shipto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbillto( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpsupplierquotationmasterForm.get('billto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpquotationpaymentterm(event:any,paytermid:any, quotationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpquotationpaymenttermComponent, 
{
data:  {  showview:false,save:false,event,paytermid, quotationid,visiblelist:this.erpquotationpaymenttermsvisiblelist,  hidelist:this.erpquotationpaymenttermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpquotationpaymenttermssource.add(res);
this.erpquotationpaymenttermssource.refresh();
}
else
{
this.erpquotationpaymenttermssource.update(event.data, res);
}
}
});
}

onDeleteerpquotationpaymentterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpquotationpaymenttermIDs += childID + ",";
this.erpsupplierquotationmasterservice.erpquotationpaymentterms.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplierquotationdetail(event:any,quotationdetailid:any, quotationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierquotationdetailComponent, 
{
data:  {  showview:false,save:false,event,quotationdetailid, quotationid,visiblelist:this.erpsupplierquotationdetailsvisiblelist,  hidelist:this.erpsupplierquotationdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierquotationdetailssource.add(res);
this.erpsupplierquotationdetailssource.refresh();
}
else
{
this.erpsupplierquotationdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierquotationdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierquotationdetailIDs += childID + ",";
this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpquotationpaymentterms
erpquotationpaymenttermssettings:any;
erpquotationpaymenttermssource: any;

showerpquotationpaymenttermsCheckbox()
{
debugger;
if(this.tblerpquotationpaymenttermssource.settings['selectMode']== 'multi')this.tblerpquotationpaymenttermssource.settings['selectMode']= 'single';
else
this.tblerpquotationpaymenttermssource.settings['selectMode']= 'multi';
this.tblerpquotationpaymenttermssource.initGrid();
}
deleteerpquotationpaymenttermsAll()
{
this.tblerpquotationpaymenttermssource.settings['selectMode'] = 'single';
}
showerpquotationpaymenttermsFilter()
{
  setTimeout(() => {
  this.SeterpquotationpaymenttermsTableddConfig();
  });
      if(this.tblerpquotationpaymenttermssource.settings!=null)this.tblerpquotationpaymenttermssource.settings['hideSubHeader'] =!this.tblerpquotationpaymenttermssource.settings['hideSubHeader'];
this.tblerpquotationpaymenttermssource.initGrid();
}
showerpquotationpaymenttermsInActive()
{
}
enableerpquotationpaymenttermsInActive()
{
}
async SeterpquotationpaymenttermsTableddConfig()
{
if(!this.bfilterPopulateerpquotationpaymentterms){
}
this.bfilterPopulateerpquotationpaymentterms=true;
}
async erpquotationpaymenttermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpquotationpaymenttermsTableConfig()
{
this.erpquotationpaymenttermssettings = {
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
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
rfqid: {
title: 'R F Q',
type: 'number',
filter:true,
},
paymenttermtype: {
title: 'Paymentterm Type',
type: '',
filter:true,
},
percentage: {
title: 'Percentage',
type: '',
filter:true,
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
},
};
}
erpquotationpaymenttermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpquotationpaymenttermsID)>=0)
{
this.erpquotationpaymenttermssource=new LocalDataSource();
this.erpquotationpaymenttermssource.load(this.erpsupplierquotationmasterservice.erpquotationpaymentterms as  any as LocalDataSource);
this.erpquotationpaymenttermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpquotationpaymenttermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierquotationmasterservice.erpquotationpaymentterms.length == 0)
{
    this.tblerpquotationpaymenttermssource.grid.createFormShown = true;
}
else
{
    let obj = new erpquotationpaymentterm();
    this.erpsupplierquotationmasterservice.erpquotationpaymentterms.push(obj);
    this.erpquotationpaymenttermssource.refresh();
    if ((this.erpsupplierquotationmasterservice.erpquotationpaymentterms.length / this.erpquotationpaymenttermssource.getPaging().perPage).toFixed(0) + 1 != this.erpquotationpaymenttermssource.getPaging().page)
    {
        this.erpquotationpaymenttermssource.setPage((this.erpsupplierquotationmasterservice.erpquotationpaymentterms.length / this.erpquotationpaymenttermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpquotationpaymenttermssource.grid.edit(this.tblerpquotationpaymenttermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpquotationpaymenttermssource.data.indexOf(event.data);
this.onDeleteerpquotationpaymentterm(event,event.data.paytermid,((this.erpquotationpaymenttermssource.getPaging().page-1) *this.erpquotationpaymenttermssource.getPaging().perPage)+index);
this.erpquotationpaymenttermssource.refresh();
break;
}
}

*/
erpquotationpaymenttermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpquotationpaymentterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpquotationpaymentterm(event,event.data.paytermid,this.formid);
break;
case 'delete':
this.onDeleteerpquotationpaymentterm(event,event.data.paytermid,((this.erpquotationpaymenttermssource.getPaging().page-1) *this.erpquotationpaymenttermssource.getPaging().perPage)+event.index);
this.erpquotationpaymenttermssource.refresh();
break;
}
}
erpquotationpaymenttermsonDelete(obj) {
let paytermid=obj.data.paytermid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierquotationmasterservice.deleteerpsupplierquotationmaster(paytermid).then(res=>
this.erpquotationpaymenttermsLoadTable()
);
}
}
erpquotationpaymenttermsPaging(val)
{
debugger;
this.erpquotationpaymenttermssource.setPaging(1, val, true);
}

handleerpquotationpaymenttermsGridSelected(event:any) {
this.erpquotationpaymenttermsselectedindex=this.erpsupplierquotationmasterservice.erpquotationpaymentterms.findIndex(i => i.paytermid === event.data.paytermid);
}
IserpquotationpaymenttermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpquotationpaymenttermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpquotationpaymentterms
//start of Grid Codes erpsupplierquotationdetails
erpsupplierquotationdetailssettings:any;
erpsupplierquotationdetailssource: any;

showerpsupplierquotationdetailsCheckbox()
{
debugger;
if(this.tblerpsupplierquotationdetailssource.settings['selectMode']== 'multi')this.tblerpsupplierquotationdetailssource.settings['selectMode']= 'single';
else
this.tblerpsupplierquotationdetailssource.settings['selectMode']= 'multi';
this.tblerpsupplierquotationdetailssource.initGrid();
}
deleteerpsupplierquotationdetailsAll()
{
this.tblerpsupplierquotationdetailssource.settings['selectMode'] = 'single';
}
showerpsupplierquotationdetailsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierquotationdetailsTableddConfig();
  });
      if(this.tblerpsupplierquotationdetailssource.settings!=null)this.tblerpsupplierquotationdetailssource.settings['hideSubHeader'] =!this.tblerpsupplierquotationdetailssource.settings['hideSubHeader'];
this.tblerpsupplierquotationdetailssource.initGrid();
}
showerpsupplierquotationdetailsInActive()
{
}
enableerpsupplierquotationdetailsInActive()
{
}
async SeterpsupplierquotationdetailsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierquotationdetails){

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsupplierquotationdetailscurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.dataerpsupplierquotationdetailscurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpsupplierquotationdetailssource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpsupplierquotationdetailscurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpsupplierquotationdetailscurrency3)), }, };
this.tblerpsupplierquotationdetailssource.settings =  clone;
this.tblerpsupplierquotationdetailssource.initGrid();
});
}
this.bfilterPopulateerpsupplierquotationdetails=true;
}
async erpsupplierquotationdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierquotationdetailsTableConfig()
{
this.erpsupplierquotationdetailssettings = {
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
rfqid: {
title: 'R F Q',
type: 'number',
filter:true,
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpsupplierquotationdetailscurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
unitprice: {
title: 'Unit Price',
type: '',
filter:true,
},
discountpercent: {
title: 'Discount Percent',
type: '',
filter:true,
},
tax1name: {
title: 'Tax1 Name',
type: 'number',
filter:true,
},
tax1value: {
title: 'Tax1 Value',
type: '',
filter:true,
},
tax2name: {
title: 'Tax2 Name',
type: 'number',
filter:true,
},
tax2value: {
title: 'Tax2 Value',
type: '',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: '',
filter:true,
},
totalquotevalue: {
title: 'Total Quote Value',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: 'number',
filter:true,
},
basevalue: {
title: 'Base Value',
type: '',
filter:true,
},
expecteddelivery: {
title: 'Expected Delivery',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paymenttermtype: {
title: 'Payment Term Type',
type: '',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
offerquantity1: {
title: 'Offer Quantity1',
type: 'number',
filter:true,
},
unitprice1: {
title: 'Unit Price1',
type: 'number',
filter:true,
},
totalcost1: {
title: 'Total Cost1',
type: 'number',
filter:true,
},
offerquantity2: {
title: 'Offer Quantity2',
type: 'number',
filter:true,
},
unitprice2: {
title: 'Unit Price2',
type: 'number',
filter:true,
},
totalcost2: {
title: 'Total Cost2',
type: 'number',
filter:true,
},
offerquantity3: {
title: 'Offer Quantity3',
type: 'number',
filter:true,
},
unitprice3: {
title: 'Unit Price3',
type: 'number',
filter:true,
},
totalcost3: {
title: 'Total Cost3',
type: 'number',
filter:true,
},
},
};
}
erpsupplierquotationdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierquotationdetailsID)>=0)
{
this.erpsupplierquotationdetailssource=new LocalDataSource();
this.erpsupplierquotationdetailssource.load(this.erpsupplierquotationmasterservice.erpsupplierquotationdetails as  any as LocalDataSource);
this.erpsupplierquotationdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierquotationdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.length == 0)
{
    this.tblerpsupplierquotationdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierquotationdetail();
    this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.push(obj);
    this.erpsupplierquotationdetailssource.refresh();
    if ((this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.length / this.erpsupplierquotationdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierquotationdetailssource.getPaging().page)
    {
        this.erpsupplierquotationdetailssource.setPage((this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.length / this.erpsupplierquotationdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierquotationdetailssource.grid.edit(this.tblerpsupplierquotationdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierquotationdetailssource.data.indexOf(event.data);
this.onDeleteerpsupplierquotationdetail(event,event.data.quotationdetailid,((this.erpsupplierquotationdetailssource.getPaging().page-1) *this.erpsupplierquotationdetailssource.getPaging().perPage)+index);
this.erpsupplierquotationdetailssource.refresh();
break;
}
}

*/
erpsupplierquotationdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierquotationdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierquotationdetail(event,event.data.quotationdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierquotationdetail(event,event.data.quotationdetailid,((this.erpsupplierquotationdetailssource.getPaging().page-1) *this.erpsupplierquotationdetailssource.getPaging().perPage)+event.index);
this.erpsupplierquotationdetailssource.refresh();
break;
}
}
erpsupplierquotationdetailsonDelete(obj) {
let quotationdetailid=obj.data.quotationdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierquotationmasterservice.deleteerpsupplierquotationmaster(quotationdetailid).then(res=>
this.erpsupplierquotationdetailsLoadTable()
);
}
}
erpsupplierquotationdetailsPaging(val)
{
debugger;
this.erpsupplierquotationdetailssource.setPaging(1, val, true);
}

handleerpsupplierquotationdetailsGridSelected(event:any) {
this.erpsupplierquotationdetailsselectedindex=this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.findIndex(i => i.quotationdetailid === event.data.quotationdetailid);
}
IserpsupplierquotationdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierquotationdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierquotationdetails

}



