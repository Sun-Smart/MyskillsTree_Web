import { erpsupplierinvoiceService } from './../../../service/erpsupplierinvoice.service';
import { erpsupplierinvoice } from './../../../model/erpsupplierinvoice.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { erpsupplierinvoicedetail } from './../../../model/erpsupplierinvoicedetail.model';
import { erpsupplierinvoicedetailComponent } from './../../../pages/forms/erpsupplierinvoicedetail/erpsupplierinvoicedetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erpgoodsreceiptmaster,IerpgoodsreceiptmasterResponse } from './../../../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from './../../../pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
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
selector: 'app-erpsupplierinvoice',
templateUrl: './erpsupplierinvoice.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierinvoiceComponent implements OnInit {
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
bfilterPopulateerpsupplierinvoices:boolean=false;
dataerpsupplierinvoicesbranchid3:any=[];
dataerpsupplierinvoicessupplierid3:any=[];
dataerpsupplierinvoicespoid3:any=[];
dataerpsupplierinvoicesinvoicecurrency3:any=[];
dataerpsupplierinvoicespaymentterms3:any=[];
dataerpsupplierinvoicesbasecurrency3:any=[];
dataerpsupplierinvoicesaccountid3:any=[];
dataerpsupplierinvoicescostcenter3:any=[];
dataerpsupplierinvoicesassigntofinanceuserid3:any=[];
dataerpsupplierinvoicedetailsitemid3:any=[];
dataerpsupplierinvoicedetailsuom3:any=[];
dataerpsupplierinvoicedetailscurrency3:any=[];
dataerpsupplierinvoicedetailsbasecurrency3:any=[];
dataerpsupplierinvoicedetailstax2name3:any=[];
dataerpsupplierinvoicedetailstax1name3:any=[];
dataerpsupplierinvoicedetailspoid3:any=[];
dataerpsupplierinvoicedetailsgrnno3:any=[];
dataerpsupplierinvoicedetailsinvoiceid3:any=[];
dataerpsupplierinvoicedetailssupplierid3:any=[];
bfilterPopulateerpsupplierinvoicedetails:boolean=false;
@ViewChild('tblerpsupplierinvoicedetailssource',{static:false}) tblerpsupplierinvoicedetailssource: Ng2SmartTableComponent;
 erpsupplierinvoiceForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
invoicecurrencyList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
basecurrencyList: boconfigvalue[];
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
costcenterList: erpfacostcenter[];
assigntofinanceuseridList: bousermaster[];
assigntofinanceuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assigntofinanceuserid_bousermastersForm: FormGroup;//autocomplete
assigntofinanceuserid_bousermastersoptions:any;//autocomplete
assigntofinanceuserid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierinvoiceshowOption:boolean;
erpsupplierinvoicedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsupplierinvoicedetailsvisiblelist:any;
erpsupplierinvoicedetailshidelist:any;

DeletederpsupplierinvoicedetailIDs: string="";
erpsupplierinvoicedetailsID: string = "1";
erpsupplierinvoicedetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplierinvoiceservice: erpsupplierinvoiceService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erpgoodsreceiptmasterservice: erpgoodsreceiptmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
private erpfacostcenterservice:erpfacostcenterService,
private bousermasterservice:bousermasterService,
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
this.erpsupplierinvoiceForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
invoiceid: [null],
supplierid: [null],
supplieriddesc: [null],
poid: [null],
poiddesc: [null],
salesorderreference: [null],
challanno: [null],
challandate: [null],
grnno: [null],
grndate: [null],
invoicenumber: [null],
invoicedate: [null],
postingdate: [null],
postingtime: [null],
totalvalue: [null],
taxamount: [null],
charges: [null],
deductedtaxamount: [null],
nettaxamount: [null],
additionaldiscountpercentage: [null],
additionaldiscountamount: [null],
invoiceamount: [null],
invoicecurrency: [null],
invoicecurrencydesc: [null],
duedate: [null],
ispaid: [null],
isreturned: [null],
paymentterms: [null],
paymenttermsdesc: [null],
creditdays: [null],
paiddate: [null],
paidreference: [null],
paidamount: [null],
paidcurrency: [null],
basecurrency: [null],
basecurrencydesc: [null],
baseamount: [null],
outstandingamount: [null],
terms: [null],
remarks: [null],
accountid: [null],
accountiddesc: [null],
costcenter: [null],
costcenterdesc: [null],
projectid: [null],
assigntofinanceuserid: [null],
assigntofinanceuseriddesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierinvoiceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierinvoiceForm.dirty && this.erpsupplierinvoiceForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.invoiceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.invoiceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.invoiceid && pkDetail) {
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
let erpsupplierinvoiceid = null;

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
this.formid=erpsupplierinvoiceid;
//this.sharedService.alert(erpsupplierinvoiceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsupplierinvoicedetailsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierinvoicedetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpsupplierinvoiceservice.formData && this.erpsupplierinvoiceservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpsupplierinvoiceForm.patchValue({
    branchid: this.erpsupplierinvoiceservice.formData.branchid,
    branchiddesc: this.erpsupplierinvoiceservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpsupplierinvoiceForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplierinvoiceservice.formData && this.erpsupplierinvoiceservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplierinvoiceForm.patchValue({
    supplierid: this.erpsupplierinvoiceservice.formData.supplierid,
    supplieriddesc: this.erpsupplierinvoiceservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplierinvoiceForm.get('supplierid').value);
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
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erpsupplierinvoiceservice.formData && this.erpsupplierinvoiceservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erpsupplierinvoiceForm.patchValue({
    poid: this.erpsupplierinvoiceservice.formData.poid,
    poiddesc: this.erpsupplierinvoiceservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erpsupplierinvoiceForm.get('poid').value);
let objpoid;
if (arrpoid.length > 0) objpoid = arrpoid[0];
if (objpoid)
{
}
}
}
).catch((err) => {console.log(err);});
this.poid_erppurchaseordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.poidList.filter(v => v.ponumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.poid_erppurchaseordermastersformatter = (result: any) => result.ponumber;
this.configservice.getList("currency").then(res => this.invoicecurrencyList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpsupplierinvoiceservice.formData && this.erpsupplierinvoiceservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpsupplierinvoiceForm.patchValue({
    accountid: this.erpsupplierinvoiceservice.formData.accountid,
    accountiddesc: this.erpsupplierinvoiceservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpsupplierinvoiceForm.get('accountid').value);
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
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenterList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assigntofinanceuseridList = res as bousermaster[];
if(this.erpsupplierinvoiceservice.formData && this.erpsupplierinvoiceservice.formData.assigntofinanceuserid){
this.assigntofinanceuseridoptionsEvent.emit(this.assigntofinanceuseridList);
this.erpsupplierinvoiceForm.patchValue({
    assigntofinanceuserid: this.erpsupplierinvoiceservice.formData.assigntofinanceuserid,
    assigntofinanceuseriddesc: this.erpsupplierinvoiceservice.formData.assigntofinanceuseriddesc,
});
}
{
let arrassigntofinanceuserid = this.assigntofinanceuseridList.filter(v => v.userid == this.erpsupplierinvoiceForm.get('assigntofinanceuserid').value);
let objassigntofinanceuserid;
if (arrassigntofinanceuserid.length > 0) objassigntofinanceuserid = arrassigntofinanceuserid[0];
if (objassigntofinanceuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assigntofinanceuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assigntofinanceuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assigntofinanceuserid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.erpsupplierinvoiceservice.geterpsupplierinvoicesList().then(res => {
      this.pkList = res as erpsupplierinvoice[];
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
this.erpsupplierinvoiceForm.markAsUntouched();
this.erpsupplierinvoiceForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpsupplierinvoiceForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplierinvoiceForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erpsupplierinvoiceForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpsupplierinvoiceForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}

onSelectedassigntofinanceuserid(assigntofinanceuseridDetail: any) {
if (assigntofinanceuseridDetail.userid && assigntofinanceuseridDetail) {
this.erpsupplierinvoiceForm.patchValue({
assigntofinanceuserid: assigntofinanceuseridDetail.userid,
assigntofinanceuseriddesc: assigntofinanceuseridDetail.username,

});

}
}




resetForm() {
if (this.erpsupplierinvoiceForm != null)
this.erpsupplierinvoiceForm.reset();
this.erpsupplierinvoiceForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
assigntofinanceuserid: this.sessiondata.userid,
assigntofinanceuseriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpsupplierinvoiceservice.erpsupplierinvoicedetails=[];
this.erpsupplierinvoicedetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let invoiceid = this.erpsupplierinvoiceForm.get('invoiceid').value;
        if(invoiceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierinvoiceservice.deleteerpsupplierinvoice(invoiceid).then(res =>
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
    this.erpsupplierinvoiceForm.patchValue({
        invoiceid: null
    });
    if(this.erpsupplierinvoiceservice.formData.invoiceid!=null)this.erpsupplierinvoiceservice.formData.invoiceid=null;
for (let i=0;i<this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.length;i++) {
this.erpsupplierinvoiceservice.erpsupplierinvoicedetails[i].invoicedetailid=null;
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
        else if(key=="challandate")
this.erpsupplierinvoiceForm.patchValue({"challandate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="grndate")
this.erpsupplierinvoiceForm.patchValue({"grndate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="invoicedate")
this.erpsupplierinvoiceForm.patchValue({"invoicedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="postingdate")
this.erpsupplierinvoiceForm.patchValue({"postingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="postingtime")
this.erpsupplierinvoiceForm.patchValue({"postingtime":new Time(mainscreendata[key]) });
        else if(key=="duedate")
this.erpsupplierinvoiceForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="paiddate")
this.erpsupplierinvoiceForm.patchValue({"paiddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsupplierinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierinvoiceForm.controls[key]!=undefined)
{
this.erpsupplierinvoiceForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
invoiceidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
let e=evt.value;
}
salesorderreferenceonChange(evt:any){
let e=evt.value;
}
challannoonChange(evt:any){
let e=evt.value;
}
challandateonChange(evt:any){
let e=evt.value;
}
grnnoonChange(evt:any){
let e=evt.value;
}
grndateonChange(evt:any){
let e=evt.value;
}
invoicenumberonChange(evt:any){
let e=evt.value;
}
invoicedateonChange(evt:any){
let e=evt.value;
}
postingdateonChange(evt:any){
let e=evt.value;
}
postingtimeonChange(evt:any){
let e=evt.value;
}
totalvalueonChange(evt:any){
let e=evt.value;
}
taxamountonChange(evt:any){
let e=evt.value;
}
chargesonChange(evt:any){
let e=evt.value;
}
deductedtaxamountonChange(evt:any){
let e=evt.value;
}
nettaxamountonChange(evt:any){
let e=evt.value;
}
additionaldiscountpercentageonChange(evt:any){
let e=evt.value;
}
additionaldiscountamountonChange(evt:any){
let e=evt.value;
}
invoiceamountonChange(evt:any){
let e=evt.value;
}
invoicecurrencyonChange(evt:any){
let e=this.f.invoicecurrency.value as any;
this.erpsupplierinvoiceForm.patchValue({invoicecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
duedateonChange(evt:any){
let e=evt.value;
}
ispaidonChange(evt:any){
let e=evt.value;
}
isreturnedonChange(evt:any){
let e=evt.value;
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erpsupplierinvoiceForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
creditdaysonChange(evt:any){
let e=evt.value;
}
paiddateonChange(evt:any){
let e=evt.value;
}
paidreferenceonChange(evt:any){
let e=evt.value;
}
paidamountonChange(evt:any){
let e=evt.value;
}
paidcurrencyonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.erpsupplierinvoiceForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
baseamountonChange(evt:any){
let e=evt.value;
}
outstandingamountonChange(evt:any){
let e=evt.value;
}
termsonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
let e=evt.value;
}
costcenteronChange(evt:any){
let e=evt.value;
this.erpsupplierinvoiceForm.patchValue({costcenterdesc:evt.options[evt.options.selectedIndex].text});
}
projectidonChange(evt:any){
let e=evt.value;
}
assigntofinanceuseridonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierinvoices() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierinvoiceservice.geterpsupplierinvoicesByEID(pkcol).then(res => {

this.erpsupplierinvoiceservice.formData=res.erpsupplierinvoice;
let formproperty=res.erpsupplierinvoice.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierinvoice.pkcol;
this.formid=res.erpsupplierinvoice.invoiceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierinvoice.invoiceid;
var postingtimeTime=new Time( res.erpsupplierinvoice.postingtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierinvoiceForm.patchValue({
branchid: res.erpsupplierinvoice.branchid,
branchiddesc: res.erpsupplierinvoice.branchiddesc,
invoiceid: res.erpsupplierinvoice.invoiceid,
supplierid: res.erpsupplierinvoice.supplierid,
supplieriddesc: res.erpsupplierinvoice.supplieriddesc,
poid: res.erpsupplierinvoice.poid,
poiddesc: res.erpsupplierinvoice.poiddesc,
salesorderreference: res.erpsupplierinvoice.salesorderreference,
challanno: res.erpsupplierinvoice.challanno,
challandate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.challandate),
grnno: res.erpsupplierinvoice.grnno,
grndate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.grndate),
invoicenumber: res.erpsupplierinvoice.invoicenumber,
invoicedate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.invoicedate),
postingdate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.postingdate),
postingtime: postingtimeTime,
totalvalue: res.erpsupplierinvoice.totalvalue,
taxamount: res.erpsupplierinvoice.taxamount,
charges: res.erpsupplierinvoice.charges,
deductedtaxamount: res.erpsupplierinvoice.deductedtaxamount,
nettaxamount: res.erpsupplierinvoice.nettaxamount,
additionaldiscountpercentage: res.erpsupplierinvoice.additionaldiscountpercentage,
additionaldiscountamount: res.erpsupplierinvoice.additionaldiscountamount,
invoiceamount: res.erpsupplierinvoice.invoiceamount,
invoicecurrency: res.erpsupplierinvoice.invoicecurrency,
invoicecurrencydesc: res.erpsupplierinvoice.invoicecurrencydesc,
duedate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.duedate),
ispaid: res.erpsupplierinvoice.ispaid,
isreturned: res.erpsupplierinvoice.isreturned,
paymentterms: res.erpsupplierinvoice.paymentterms,
paymenttermsdesc: res.erpsupplierinvoice.paymenttermsdesc,
creditdays: res.erpsupplierinvoice.creditdays,
paiddate: this.ngbDateParserFormatter.parse(res.erpsupplierinvoice.paiddate),
paidreference: res.erpsupplierinvoice.paidreference,
paidamount: res.erpsupplierinvoice.paidamount,
paidcurrency: res.erpsupplierinvoice.paidcurrency,
basecurrency: res.erpsupplierinvoice.basecurrency,
basecurrencydesc: res.erpsupplierinvoice.basecurrencydesc,
baseamount: res.erpsupplierinvoice.baseamount,
outstandingamount: res.erpsupplierinvoice.outstandingamount,
terms: res.erpsupplierinvoice.terms,
remarks: res.erpsupplierinvoice.remarks,
accountid: res.erpsupplierinvoice.accountid,
accountiddesc: res.erpsupplierinvoice.accountiddesc,
costcenter: res.erpsupplierinvoice.costcenter,
costcenterdesc: res.erpsupplierinvoice.costcenterdesc,
projectid: res.erpsupplierinvoice.projectid,
assigntofinanceuserid: res.erpsupplierinvoice.assigntofinanceuserid,
assigntofinanceuseriddesc: res.erpsupplierinvoice.assigntofinanceuseriddesc,
status: res.erpsupplierinvoice.status,
statusdesc: res.erpsupplierinvoice.statusdesc,
});
this.erpsupplierinvoicedetailsvisiblelist=res.erpsupplierinvoicedetailsvisiblelist;
//Child Tables if any
this.erpsupplierinvoiceservice.erpsupplierinvoicedetails = res.erpsupplierinvoicedetails;
this.SeterpsupplierinvoicedetailsTableConfig();
this.erpsupplierinvoicedetailsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierinvoicedetailsTableddConfig();
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
  for (let key in this.erpsupplierinvoiceForm.controls) {
    if (this.erpsupplierinvoiceForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierinvoiceservice.formData!=null && this.erpsupplierinvoiceservice.formData[key]!=null  && this.erpsupplierinvoiceservice.formData[key]!='[]' && this.erpsupplierinvoiceservice.formData[key]!=undefined && this.erpsupplierinvoiceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierinvoiceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierinvoiceservice.formData!=null && this.erpsupplierinvoiceservice.formData[key]!=null   && this.erpsupplierinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierinvoiceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierinvoiceservice.formData!=null && this.erpsupplierinvoiceservice.formData[key]!=null   && this.erpsupplierinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierinvoiceservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierinvoiceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierinvoiceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierinvoiceForm.value;
obj.challandate=new Date(this.erpsupplierinvoiceForm.get('challandate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('challandate').value)+'  UTC' :null);
obj.grndate=new Date(this.erpsupplierinvoiceForm.get('grndate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('grndate').value)+'  UTC' :null);
obj.invoicedate=new Date(this.erpsupplierinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('invoicedate').value)+'  UTC' :null);
obj.postingdate=new Date(this.erpsupplierinvoiceForm.get('postingdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('postingdate').value)+'  UTC' :null);
obj.postingtime=(this.erpsupplierinvoiceForm.get('postingtime').value==null?0:this.erpsupplierinvoiceForm.get('postingtime').value.hour)+':'+(this.erpsupplierinvoiceForm.get('postingtime').value==null?0:this.erpsupplierinvoiceForm.get('postingtime').value.minute+":00");
obj.duedate=new Date(this.erpsupplierinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('duedate').value)+'  UTC' :null);
obj.paiddate=new Date(this.erpsupplierinvoiceForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('paiddate').value)+'  UTC' :null);
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

private erpsupplierinvoicetoggleOption(){
this.erpsupplierinvoiceshowOption = this.erpsupplierinvoiceshowOption === true ? false : true;
}

private erpsupplierinvoicedetailtoggleOption(){
this.erpsupplierinvoicedetailshowOption = this.erpsupplierinvoicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierinvoiceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierinvoiceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierinvoiceservice.formData=this.erpsupplierinvoiceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierinvoiceForm.controls[key] != null)
    {
        this.erpsupplierinvoiceservice.formData[key] = this.erpsupplierinvoiceForm.controls[key].value;
    }
}
}
}
this.erpsupplierinvoiceservice.formData.challandate=new Date(this.erpsupplierinvoiceForm.get('challandate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('challandate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.grndate=new Date(this.erpsupplierinvoiceForm.get('grndate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('grndate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.invoicedate=new Date(this.erpsupplierinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('invoicedate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.postingdate=new Date(this.erpsupplierinvoiceForm.get('postingdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('postingdate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.postingtime=(this.erpsupplierinvoiceForm.get('postingtime').value==null?0:this.erpsupplierinvoiceForm.get('postingtime').value.hour)+':'+(this.erpsupplierinvoiceForm.get('postingtime').value==null?0:this.erpsupplierinvoiceForm.get('postingtime').value.minute+":00");
this.erpsupplierinvoiceservice.formData.duedate=new Date(this.erpsupplierinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('duedate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.paiddate=new Date(this.erpsupplierinvoiceForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.erpsupplierinvoiceForm.get('paiddate').value)+'  UTC' :null);
this.erpsupplierinvoiceservice.formData.DeletederpsupplierinvoicedetailIDs = this.DeletederpsupplierinvoicedetailIDs;
console.log(this.erpsupplierinvoiceservice.formData);
this.erpsupplierinvoiceservice.formData=this.erpsupplierinvoiceForm.value;
this.erpsupplierinvoiceservice.saveOrUpdateerpsupplierinvoices().subscribe(
async res => {
if (this.erpsupplierinvoicedetailssource.data)
{
    for (let i = 0; i < this.erpsupplierinvoicedetailssource.data.length; i++)
    {
        if (this.erpsupplierinvoicedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierinvoicedetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierinvoice);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierinvoiceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierinvoice);
}
else
{
this.FillData(res);
}
}
this.erpsupplierinvoiceForm.markAsUntouched();
this.erpsupplierinvoiceForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpsupplierinvoiceForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplierinvoiceForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erpsupplierinvoiceForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpsupplierinvoiceForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenter( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erpsupplierinvoiceForm.get('costcenter').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassigntofinanceuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpsupplierinvoiceForm.get('assigntofinanceuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsupplierinvoicedetail(event:any,invoicedetailid:any, invoiceid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierinvoicedetailComponent, 
{
data:  {  showview:false,save:false,event,invoicedetailid, invoiceid,visiblelist:this.erpsupplierinvoicedetailsvisiblelist,  hidelist:this.erpsupplierinvoicedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierinvoicedetailssource.add(res);
this.erpsupplierinvoicedetailssource.refresh();
}
else
{
this.erpsupplierinvoicedetailssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierinvoicedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierinvoicedetailIDs += childID + ",";
this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsupplierinvoicedetails
erpsupplierinvoicedetailssettings:any;
erpsupplierinvoicedetailssource: any;

showerpsupplierinvoicedetailsCheckbox()
{
debugger;
if(this.tblerpsupplierinvoicedetailssource.settings['selectMode']== 'multi')this.tblerpsupplierinvoicedetailssource.settings['selectMode']= 'single';
else
this.tblerpsupplierinvoicedetailssource.settings['selectMode']= 'multi';
this.tblerpsupplierinvoicedetailssource.initGrid();
}
deleteerpsupplierinvoicedetailsAll()
{
this.tblerpsupplierinvoicedetailssource.settings['selectMode'] = 'single';
}
showerpsupplierinvoicedetailsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierinvoicedetailsTableddConfig();
  });
      if(this.tblerpsupplierinvoicedetailssource.settings!=null)this.tblerpsupplierinvoicedetailssource.settings['hideSubHeader'] =!this.tblerpsupplierinvoicedetailssource.settings['hideSubHeader'];
this.tblerpsupplierinvoicedetailssource.initGrid();
}
showerpsupplierinvoicedetailsInActive()
{
}
enableerpsupplierinvoicedetailsInActive()
{
}
async SeterpsupplierinvoicedetailsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierinvoicedetails){
}
this.bfilterPopulateerpsupplierinvoicedetails=true;
}
async erpsupplierinvoicedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierinvoicedetailsTableConfig()
{
this.erpsupplierinvoicedetailssettings = {
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
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
itemdescription: {
title: 'Item Description',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:true,
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
totalvalue: {
title: 'Total Value',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: '',
filter:true,
},
basevalue: {
title: 'Base Value',
type: '',
filter:true,
},
poid: {
title: 'P O',
type: 'number',
filter:true,
},
suppliersoreference: {
title: 'Supplier S O Reference',
type: '',
filter:true,
},
grnno: {
title: 'G R N No',
type: 'number',
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
},
};
}
erpsupplierinvoicedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierinvoicedetailsID)>=0)
{
this.erpsupplierinvoicedetailssource=new LocalDataSource();
this.erpsupplierinvoicedetailssource.load(this.erpsupplierinvoiceservice.erpsupplierinvoicedetails as  any as LocalDataSource);
this.erpsupplierinvoicedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierinvoicedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.length == 0)
{
    this.tblerpsupplierinvoicedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierinvoicedetail();
    this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.push(obj);
    this.erpsupplierinvoicedetailssource.refresh();
    if ((this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.length / this.erpsupplierinvoicedetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierinvoicedetailssource.getPaging().page)
    {
        this.erpsupplierinvoicedetailssource.setPage((this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.length / this.erpsupplierinvoicedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierinvoicedetailssource.grid.edit(this.tblerpsupplierinvoicedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierinvoicedetailssource.data.indexOf(event.data);
this.onDeleteerpsupplierinvoicedetail(event,event.data.invoicedetailid,((this.erpsupplierinvoicedetailssource.getPaging().page-1) *this.erpsupplierinvoicedetailssource.getPaging().perPage)+index);
this.erpsupplierinvoicedetailssource.refresh();
break;
}
}

*/
erpsupplierinvoicedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierinvoicedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierinvoicedetail(event,event.data.invoicedetailid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierinvoicedetail(event,event.data.invoicedetailid,((this.erpsupplierinvoicedetailssource.getPaging().page-1) *this.erpsupplierinvoicedetailssource.getPaging().perPage)+event.index);
this.erpsupplierinvoicedetailssource.refresh();
break;
}
}
erpsupplierinvoicedetailsonDelete(obj) {
let invoicedetailid=obj.data.invoicedetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierinvoiceservice.deleteerpsupplierinvoice(invoicedetailid).then(res=>
this.erpsupplierinvoicedetailsLoadTable()
);
}
}
erpsupplierinvoicedetailsPaging(val)
{
debugger;
this.erpsupplierinvoicedetailssource.setPaging(1, val, true);
}

handleerpsupplierinvoicedetailsGridSelected(event:any) {
this.erpsupplierinvoicedetailsselectedindex=this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.findIndex(i => i.invoicedetailid === event.data.invoicedetailid);
}
IserpsupplierinvoicedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierinvoicedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierinvoicedetails

}



