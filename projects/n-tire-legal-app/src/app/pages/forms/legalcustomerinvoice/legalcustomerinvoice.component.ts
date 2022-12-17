import { legalcustomerinvoiceService } from './../../../service/legalcustomerinvoice.service';
import { legalcustomerinvoice } from './../../../model/legalcustomerinvoice.model';
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
import { legalcustomermaster} from './../../../model/legalcustomermaster.model';
import { legalcustomermasterComponent } from './../../../pages/forms/legalcustomermaster/legalcustomermaster.component';
import { legalcustomermasterService } from './../../../service/legalcustomermaster.service';
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
import { legalcustomerinvoicedetail } from './../../../model/legalcustomerinvoicedetail.model';
import { legalcustomerinvoicedetailComponent } from './../../../pages/forms/legalcustomerinvoicedetail/legalcustomerinvoicedetail.component';
//FK services
import { legalcase,IlegalcaseResponse } from './../../../model/legalcase.model';
import { legalcaseComponent } from './../../../pages/forms/legalcase/legalcase.component';
import { legalcaseService } from './../../../service/legalcase.service';
import { erptaxmaster,IerptaxmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
import { erpsalesorderdetail,IerpsalesorderdetailResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsalesorderdetail.model';
import { erpsalesorderdetailComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderdetail/erpsalesorderdetail.component';
import { erpsalesorderdetailService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsalesorderdetail.service';
import { erpitemmaster,IerpitemmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
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
selector: 'app-legalcustomerinvoice',
templateUrl: './legalcustomerinvoice.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcustomerinvoiceComponent implements OnInit {
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
bfilterPopulatelegalcustomerinvoices:boolean=false;
datalegalcustomerinvoicesbranchid3:any=[];
datalegalcustomerinvoicescustomerid3:any=[];
datalegalcustomerinvoicespaymentterms3:any=[];
datalegalcustomerinvoicescreditdays3:any=[];
datalegalcustomerinvoicesbasecurrency3:any=[];
datalegalcustomerinvoicesaccountid3:any=[];
datalegalcustomerinvoicescostcenter3:any=[];
datalegalcustomerinvoicesassigntofinanceuserid3:any=[];
datalegalcustomerinvoicedetailscaseid3:any=[];
datalegalcustomerinvoicedetailsitemtype3:any=[];
datalegalcustomerinvoicedetailstax1name3:any=[];
datalegalcustomerinvoicedetailsuom3:any=[];
datalegalcustomerinvoicedetailscurrency3:any=[];
datalegalcustomerinvoicedetailsbasecurrency3:any=[];
datalegalcustomerinvoicedetailstax2name3:any=[];
datalegalcustomerinvoicedetailspaymenttermtype3:any=[];
datalegalcustomerinvoicedetailssodetailid3:any=[];
datalegalcustomerinvoicedetailsinvoiceid3:any=[];
datalegalcustomerinvoicedetailsitemid3:any=[];
bfilterPopulatelegalcustomerinvoicedetails:boolean=false;
@ViewChild('tbllegalcustomerinvoicedetailssource',{static:false}) tbllegalcustomerinvoicedetailssource: Ng2SmartTableComponent;
 legalcustomerinvoiceForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
customeridList: legalcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_legalcustomermastersForm: FormGroup;//autocomplete
customerid_legalcustomermastersoptions:any;//autocomplete
customerid_legalcustomermastersformatter:any;//autocomplete
paymenttermsList: boconfigvalue[];
creditdaysList: boconfigvalue[];
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
legalcustomerinvoiceshowOption:boolean;
legalcustomerinvoicedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



legalcustomerinvoicedetailsvisiblelist:any;
legalcustomerinvoicedetailshidelist:any;

DeletedlegalcustomerinvoicedetailIDs: string="";
legalcustomerinvoicedetailsID: string = "1";
legalcustomerinvoicedetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcustomerinvoiceservice: legalcustomerinvoiceService,
private legalcaseservice: legalcaseService,
private erptaxmasterservice: erptaxmasterService,
private erpsalesorderdetailservice: erpsalesorderdetailService,
private erpitemmasterservice: erpitemmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private legalcustomermasterservice:legalcustomermasterService,
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
this.legalcustomerinvoiceForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
invoiceid: [null],
customerid: [null],
customeriddesc: [null],
invoicenumber: [null],
invoicedate: [null],
invoicedetails: [null],
customerreference: [null],
challanno: [null],
itemtype: [null],
invoicecurrency: [null],
totalitemvalue: [null],
discount: [null],
tax1: [null],
tax2: [null],
totalcharges: [null],
tds: [null],
invoiceamount: [null],
duedate: [null],
paymentterms: [null],
paymenttermsdesc: [null],
creditdays: [null],
creditdaysdesc: [null],
receiveddate: [null],
receiptreference: [null],
receivedamount: [null],
receivedcurrency: [null],
balancetobereceived: [null],
basecurrency: [null],
basecurrencydesc: [null],
baseamount: [null],
accountid: [null],
accountiddesc: [null],
costcenter: [null],
costcenterdesc: [null],
assigntofinanceuserid: [null],
assigntofinanceuseriddesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcustomerinvoiceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcustomerinvoiceForm.dirty && this.legalcustomerinvoiceForm.touched ) {
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
let legalcustomerinvoiceid = null;

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
this.formid=legalcustomerinvoiceid;
//this.sharedService.alert(legalcustomerinvoiceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegalcustomerinvoicedetailsTableConfig();
  setTimeout(() => {
  this.SetlegalcustomerinvoicedetailsTableddConfig();
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
if(this.legalcustomerinvoiceservice.formData && this.legalcustomerinvoiceservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.legalcustomerinvoiceForm.patchValue({
    branchid: this.legalcustomerinvoiceservice.formData.branchid,
    branchiddesc: this.legalcustomerinvoiceservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.legalcustomerinvoiceForm.get('branchid').value);
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
this.legalcustomermasterservice.getlegalcustomermastersList().then(res => 
{
this.customeridList = res as legalcustomermaster[];
if(this.legalcustomerinvoiceservice.formData && this.legalcustomerinvoiceservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.legalcustomerinvoiceForm.patchValue({
    customerid: this.legalcustomerinvoiceservice.formData.customerid,
    customeriddesc: this.legalcustomerinvoiceservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.legalcustomerinvoiceForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_legalcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.customername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_legalcustomermastersformatter = (result: any) => result.customername;
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.configservice.getList("creditdays").then(res => this.creditdaysList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.legalcustomerinvoiceservice.formData && this.legalcustomerinvoiceservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.legalcustomerinvoiceForm.patchValue({
    accountid: this.legalcustomerinvoiceservice.formData.accountid,
    accountiddesc: this.legalcustomerinvoiceservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.legalcustomerinvoiceForm.get('accountid').value);
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
if(this.legalcustomerinvoiceservice.formData && this.legalcustomerinvoiceservice.formData.assigntofinanceuserid){
this.assigntofinanceuseridoptionsEvent.emit(this.assigntofinanceuseridList);
this.legalcustomerinvoiceForm.patchValue({
    assigntofinanceuserid: this.legalcustomerinvoiceservice.formData.assigntofinanceuserid,
    assigntofinanceuseriddesc: this.legalcustomerinvoiceservice.formData.assigntofinanceuseriddesc,
});
}
{
let arrassigntofinanceuserid = this.assigntofinanceuseridList.filter(v => v.userid == this.legalcustomerinvoiceForm.get('assigntofinanceuserid').value);
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
    this.legalcustomerinvoiceservice.getlegalcustomerinvoicesList().then(res => {
      this.pkList = res as legalcustomerinvoice[];
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
this.legalcustomerinvoiceForm.markAsUntouched();
this.legalcustomerinvoiceForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.legalcustomerinvoiceForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.legalcustomerinvoiceForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.customername,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.legalcustomerinvoiceForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}

onSelectedassigntofinanceuserid(assigntofinanceuseridDetail: any) {
if (assigntofinanceuseridDetail.userid && assigntofinanceuseridDetail) {
this.legalcustomerinvoiceForm.patchValue({
assigntofinanceuserid: assigntofinanceuseridDetail.userid,
assigntofinanceuseriddesc: assigntofinanceuseridDetail.username,

});

}
}




resetForm() {
if (this.legalcustomerinvoiceForm != null)
this.legalcustomerinvoiceForm.reset();
this.legalcustomerinvoiceForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
assigntofinanceuserid: this.sessiondata.userid,
assigntofinanceuseriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.legalcustomerinvoiceservice.legalcustomerinvoicedetails=[];
this.legalcustomerinvoicedetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let invoiceid = this.legalcustomerinvoiceForm.get('invoiceid').value;
        if(invoiceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcustomerinvoiceservice.deletelegalcustomerinvoice(invoiceid).then(res =>
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
    this.legalcustomerinvoiceForm.patchValue({
        invoiceid: null
    });
    if(this.legalcustomerinvoiceservice.formData.invoiceid!=null)this.legalcustomerinvoiceservice.formData.invoiceid=null;
for (let i=0;i<this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.length;i++) {
this.legalcustomerinvoiceservice.legalcustomerinvoicedetails[i].invoicedetailid=null;
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
        else if(key=="invoicedate")
this.legalcustomerinvoiceForm.patchValue({"invoicedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.legalcustomerinvoiceForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="receiveddate")
this.legalcustomerinvoiceForm.patchValue({"receiveddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcustomerinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcustomerinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcustomerinvoiceForm.controls[key]!=undefined)
{
this.legalcustomerinvoiceForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
invoiceidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
invoicenumberonChange(evt:any){
let e=evt.value;
}
invoicedateonChange(evt:any){
let e=evt.value;
}
invoicedetailsonChange(evt:any){
let e=evt.value;
}
customerreferenceonChange(evt:any){
let e=evt.value;
}
challannoonChange(evt:any){
let e=evt.value;
}
itemtypeonChange(evt:any){
let e=evt.value;
}
invoicecurrencyonChange(evt:any){
let e=evt.value;
}
totalitemvalueonChange(evt:any){
let e=evt.value;
}
discountonChange(evt:any){
let e=evt.value;
}
tax1onChange(evt:any){
let e=evt.value;
}
tax2onChange(evt:any){
let e=evt.value;
}
totalchargesonChange(evt:any){
let e=evt.value;
}
tdsonChange(evt:any){
let e=evt.value;
}
invoiceamountonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.legalcustomerinvoiceForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
creditdaysonChange(evt:any){
let e=this.f.creditdays.value as any;
this.legalcustomerinvoiceForm.patchValue({creditdaysdesc:evt.options[evt.options.selectedIndex].text});
}
receiveddateonChange(evt:any){
let e=evt.value;
}
receiptreferenceonChange(evt:any){
let e=evt.value;
}
receivedamountonChange(evt:any){
let e=evt.value;
}
receivedcurrencyonChange(evt:any){
let e=evt.value;
}
balancetobereceivedonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.legalcustomerinvoiceForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
baseamountonChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
let e=evt.value;
}
costcenteronChange(evt:any){
let e=evt.value;
this.legalcustomerinvoiceForm.patchValue({costcenterdesc:evt.options[evt.options.selectedIndex].text});
}
assigntofinanceuseridonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlegalcustomerinvoices() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcustomerinvoiceservice.getlegalcustomerinvoicesByEID(pkcol).then(res => {

this.legalcustomerinvoiceservice.formData=res.legalcustomerinvoice;
let formproperty=res.legalcustomerinvoice.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcustomerinvoice.pkcol;
this.formid=res.legalcustomerinvoice.invoiceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcustomerinvoiceservice.formData=res.legalcustomerinvoice;
this.formid=res.legalcustomerinvoice.invoiceid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcustomerinvoiceForm.patchValue({
branchid: res.legalcustomerinvoice.branchid,
branchiddesc: res.legalcustomerinvoice.branchiddesc,
invoiceid: res.legalcustomerinvoice.invoiceid,
customerid: res.legalcustomerinvoice.customerid,
customeriddesc: res.legalcustomerinvoice.customeriddesc,
invoicenumber: res.legalcustomerinvoice.invoicenumber,
invoicedate: this.ngbDateParserFormatter.parse(res.legalcustomerinvoice.invoicedate),
invoicedetails: res.legalcustomerinvoice.invoicedetails,
customerreference: res.legalcustomerinvoice.customerreference,
challanno: res.legalcustomerinvoice.challanno,
itemtype: res.legalcustomerinvoice.itemtype,
invoicecurrency: res.legalcustomerinvoice.invoicecurrency,
totalitemvalue: res.legalcustomerinvoice.totalitemvalue,
discount: res.legalcustomerinvoice.discount,
tax1: res.legalcustomerinvoice.tax1,
tax2: res.legalcustomerinvoice.tax2,
totalcharges: res.legalcustomerinvoice.totalcharges,
tds: res.legalcustomerinvoice.tds,
invoiceamount: res.legalcustomerinvoice.invoiceamount,
duedate: this.ngbDateParserFormatter.parse(res.legalcustomerinvoice.duedate),
paymentterms: res.legalcustomerinvoice.paymentterms,
paymenttermsdesc: res.legalcustomerinvoice.paymenttermsdesc,
creditdays: res.legalcustomerinvoice.creditdays,
creditdaysdesc: res.legalcustomerinvoice.creditdaysdesc,
receiveddate: this.ngbDateParserFormatter.parse(res.legalcustomerinvoice.receiveddate),
receiptreference: res.legalcustomerinvoice.receiptreference,
receivedamount: res.legalcustomerinvoice.receivedamount,
receivedcurrency: res.legalcustomerinvoice.receivedcurrency,
balancetobereceived: res.legalcustomerinvoice.balancetobereceived,
basecurrency: res.legalcustomerinvoice.basecurrency,
basecurrencydesc: res.legalcustomerinvoice.basecurrencydesc,
baseamount: res.legalcustomerinvoice.baseamount,
accountid: res.legalcustomerinvoice.accountid,
accountiddesc: res.legalcustomerinvoice.accountiddesc,
costcenter: res.legalcustomerinvoice.costcenter,
costcenterdesc: res.legalcustomerinvoice.costcenterdesc,
assigntofinanceuserid: res.legalcustomerinvoice.assigntofinanceuserid,
assigntofinanceuseriddesc: res.legalcustomerinvoice.assigntofinanceuseriddesc,
remarks: res.legalcustomerinvoice.remarks,
status: res.legalcustomerinvoice.status,
statusdesc: res.legalcustomerinvoice.statusdesc,
});
this.legalcustomerinvoicedetailsvisiblelist=res.legalcustomerinvoicedetailsvisiblelist;
//Child Tables if any
this.legalcustomerinvoiceservice.legalcustomerinvoicedetails = res.legalcustomerinvoicedetails;
this.SetlegalcustomerinvoicedetailsTableConfig();
this.legalcustomerinvoicedetailsLoadTable();
  setTimeout(() => {
  this.SetlegalcustomerinvoicedetailsTableddConfig();
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
  for (let key in this.legalcustomerinvoiceForm.controls) {
    if (this.legalcustomerinvoiceForm.controls[key] != null) {
if(false)
{
if(this.legalcustomerinvoiceservice.formData!=null && this.legalcustomerinvoiceservice.formData[key]!=null  && this.legalcustomerinvoiceservice.formData[key]!='[]' && this.legalcustomerinvoiceservice.formData[key]!=undefined && this.legalcustomerinvoiceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcustomerinvoiceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcustomerinvoiceservice.formData!=null && this.legalcustomerinvoiceservice.formData[key]!=null   && this.legalcustomerinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcustomerinvoiceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcustomerinvoiceservice.formData!=null && this.legalcustomerinvoiceservice.formData[key]!=null   && this.legalcustomerinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcustomerinvoiceservice.formData[key]+"'><div class='progress__number'>"+this.legalcustomerinvoiceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcustomerinvoiceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcustomerinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcustomerinvoiceForm.value;
obj.invoicedate=new Date(this.legalcustomerinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('invoicedate').value)+'  UTC' :null);
obj.duedate=new Date(this.legalcustomerinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('duedate').value)+'  UTC' :null);
obj.receiveddate=new Date(this.legalcustomerinvoiceForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('receiveddate').value)+'  UTC' :null);
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

private legalcustomerinvoicetoggleOption(){
this.legalcustomerinvoiceshowOption = this.legalcustomerinvoiceshowOption === true ? false : true;
}

private legalcustomerinvoicedetailtoggleOption(){
this.legalcustomerinvoicedetailshowOption = this.legalcustomerinvoicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcustomerinvoiceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcustomerinvoiceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcustomerinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcustomerinvoiceservice.formData=this.legalcustomerinvoiceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcustomerinvoiceForm.controls[key] != null)
    {
        this.legalcustomerinvoiceservice.formData[key] = this.legalcustomerinvoiceForm.controls[key].value;
    }
}
}
}
this.legalcustomerinvoiceservice.formData.invoicedate=new Date(this.legalcustomerinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('invoicedate').value)+'  UTC' :null);
this.legalcustomerinvoiceservice.formData.duedate=new Date(this.legalcustomerinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('duedate').value)+'  UTC' :null);
this.legalcustomerinvoiceservice.formData.receiveddate=new Date(this.legalcustomerinvoiceForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.legalcustomerinvoiceForm.get('receiveddate').value)+'  UTC' :null);
this.legalcustomerinvoiceservice.formData.DeletedlegalcustomerinvoicedetailIDs = this.DeletedlegalcustomerinvoicedetailIDs;
console.log(this.legalcustomerinvoiceservice.formData);
this.legalcustomerinvoiceservice.formData=this.legalcustomerinvoiceForm.value;
this.legalcustomerinvoiceservice.saveOrUpdatelegalcustomerinvoices().subscribe(
async res => {
if (this.legalcustomerinvoicedetailssource.data)
{
    for (let i = 0; i < this.legalcustomerinvoicedetailssource.data.length; i++)
    {
        if (this.legalcustomerinvoicedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcustomerinvoicedetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomerinvoice);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcustomerinvoiceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomerinvoice);
}
else
{
this.FillData(res);
}
}
this.legalcustomerinvoiceForm.markAsUntouched();
this.legalcustomerinvoiceForm.markAsPristine();
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
data: {branchid:this.legalcustomerinvoiceForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(legalcustomermasterComponent, 
{
data: {customerid:this.legalcustomerinvoiceForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.legalcustomerinvoiceForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenter( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.legalcustomerinvoiceForm.get('costcenter').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassigntofinanceuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.legalcustomerinvoiceForm.get('assigntofinanceuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlegalcustomerinvoicedetail(event:any,invoicedetailid:any, invoiceid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcustomerinvoicedetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,invoicedetailid, invoiceid,visiblelist:this.legalcustomerinvoicedetailsvisiblelist,  hidelist:this.legalcustomerinvoicedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcustomerinvoicedetailssource.add(res);
this.legalcustomerinvoicedetailssource.refresh();
}
else
{
this.legalcustomerinvoicedetailssource.update(event.data, res);
}
}
});
}

onDeletelegalcustomerinvoicedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcustomerinvoicedetailIDs += childID + ",";
this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legalcustomerinvoicedetails
legalcustomerinvoicedetailssettings:any;
legalcustomerinvoicedetailssource: any;

showlegalcustomerinvoicedetailsCheckbox()
{
debugger;
if(this.tbllegalcustomerinvoicedetailssource.settings['selectMode']== 'multi')this.tbllegalcustomerinvoicedetailssource.settings['selectMode']= 'single';
else
this.tbllegalcustomerinvoicedetailssource.settings['selectMode']= 'multi';
this.tbllegalcustomerinvoicedetailssource.initGrid();
}
deletelegalcustomerinvoicedetailsAll()
{
this.tbllegalcustomerinvoicedetailssource.settings['selectMode'] = 'single';
}
showlegalcustomerinvoicedetailsFilter()
{
  setTimeout(() => {
  this.SetlegalcustomerinvoicedetailsTableddConfig();
  });
      if(this.tbllegalcustomerinvoicedetailssource.settings!=null)this.tbllegalcustomerinvoicedetailssource.settings['hideSubHeader'] =!this.tbllegalcustomerinvoicedetailssource.settings['hideSubHeader'];
this.tbllegalcustomerinvoicedetailssource.initGrid();
}
showlegalcustomerinvoicedetailsInActive()
{
}
enablelegalcustomerinvoicedetailsInActive()
{
}
async SetlegalcustomerinvoicedetailsTableddConfig()
{
if(!this.bfilterPopulatelegalcustomerinvoicedetails){
}
this.bfilterPopulatelegalcustomerinvoicedetails=true;
}
async legalcustomerinvoicedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcustomerinvoicedetailsTableConfig()
{
this.legalcustomerinvoicedetailssettings = {
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
filter:true,
},
itemtype: {
title: 'Item Type',
type: '',
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
caseid: {
title: 'Case',
type: 'number',
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
discountvalue: {
title: 'Discount Value',
type: 'number',
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
soid: {
title: 'S O',
type: 'number',
filter:true,
},
sodetailid: {
title: 'S O Detail',
type: 'number',
filter:true,
},
paymenttermtype: {
title: 'Payment Term Type',
type: '',
filter:true,
},
customerporeference: {
title: 'Customer P O Reference',
type: '',
filter:true,
},
productserialno: {
title: 'Product Serial No',
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
},
};
}
legalcustomerinvoicedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcustomerinvoicedetailsID)>=0)
{
this.legalcustomerinvoicedetailssource=new LocalDataSource();
this.legalcustomerinvoicedetailssource.load(this.legalcustomerinvoiceservice.legalcustomerinvoicedetails as  any as LocalDataSource);
this.legalcustomerinvoicedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcustomerinvoicedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.length == 0)
{
    this.tbllegalcustomerinvoicedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcustomerinvoicedetail();
    this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.push(obj);
    this.legalcustomerinvoicedetailssource.refresh();
    if ((this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.length / this.legalcustomerinvoicedetailssource.getPaging().perPage).toFixed(0) + 1 != this.legalcustomerinvoicedetailssource.getPaging().page)
    {
        this.legalcustomerinvoicedetailssource.setPage((this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.length / this.legalcustomerinvoicedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcustomerinvoicedetailssource.grid.edit(this.tbllegalcustomerinvoicedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcustomerinvoicedetailssource.data.indexOf(event.data);
this.onDeletelegalcustomerinvoicedetail(event,event.data.invoicedetailid,((this.legalcustomerinvoicedetailssource.getPaging().page-1) *this.legalcustomerinvoicedetailssource.getPaging().perPage)+index);
this.legalcustomerinvoicedetailssource.refresh();
break;
}
}

*/
legalcustomerinvoicedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcustomerinvoicedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcustomerinvoicedetail(event,event.data.invoicedetailid,this.formid);
break;
case 'delete':
this.onDeletelegalcustomerinvoicedetail(event,event.data.invoicedetailid,((this.legalcustomerinvoicedetailssource.getPaging().page-1) *this.legalcustomerinvoicedetailssource.getPaging().perPage)+event.index);
this.legalcustomerinvoicedetailssource.refresh();
break;
}
}
legalcustomerinvoicedetailsonDelete(obj) {
let invoicedetailid=obj.data.invoicedetailid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcustomerinvoiceservice.deletelegalcustomerinvoice(invoicedetailid).then(res=>
this.legalcustomerinvoicedetailsLoadTable()
);
}
}
legalcustomerinvoicedetailsPaging(val)
{
debugger;
this.legalcustomerinvoicedetailssource.setPaging(1, val, true);
}

handlelegalcustomerinvoicedetailsGridSelected(event:any) {
this.legalcustomerinvoicedetailsselectedindex=this.legalcustomerinvoiceservice.legalcustomerinvoicedetails.findIndex(i => i.invoicedetailid === event.data.invoicedetailid);
}
IslegalcustomerinvoicedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcustomerinvoicedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcustomerinvoicedetails

}



