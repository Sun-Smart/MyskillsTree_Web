import { erpcustomerinvoiceService } from './../../../service/erpcustomerinvoice.service';
import { erpcustomerinvoice } from './../../../model/erpcustomerinvoice.model';
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
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
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
import { erpcustomerinvoicedetail } from './../../../model/erpcustomerinvoicedetail.model';
import { erpcustomerinvoicedetailComponent } from './../../../pages/forms/erpcustomerinvoicedetail/erpcustomerinvoicedetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erpsalesorderdetail,IerpsalesorderdetailResponse } from './../../../model/erpsalesorderdetail.model';
import { erpsalesorderdetailComponent } from './../../../pages/forms/erpsalesorderdetail/erpsalesorderdetail.component';
import { erpsalesorderdetailService } from './../../../service/erpsalesorderdetail.service';
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
selector: 'app-erpcustomerinvoice',
templateUrl: './erpcustomerinvoice.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpcustomerinvoiceComponent implements OnInit {
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
bfilterPopulateerpcustomerinvoices:boolean=false;
dataerpcustomerinvoicesbranchid3:any=[];
dataerpcustomerinvoicescustomerid3:any=[];
dataerpcustomerinvoicespaymentterms3:any=[];
dataerpcustomerinvoicescreditdays3:any=[];
dataerpcustomerinvoicesbasecurrency3:any=[];
dataerpcustomerinvoicesaccountid3:any=[];
dataerpcustomerinvoicescostcenter3:any=[];
dataerpcustomerinvoicesassigntofinanceuserid3:any=[];
dataerpcustomerinvoicedetailsitemid3:any=[];
dataerpcustomerinvoicedetailsuom3:any=[];
dataerpcustomerinvoicedetailscurrency3:any=[];
dataerpcustomerinvoicedetailsbasecurrency3:any=[];
dataerpcustomerinvoicedetailstax2name3:any=[];
dataerpcustomerinvoicedetailstax1name3:any=[];
dataerpcustomerinvoicedetailssodetailid3:any=[];
dataerpcustomerinvoicedetailsinvoiceid3:any=[];
dataerpcustomerinvoicedetailspaymenttermtype3:any=[];
bfilterPopulateerpcustomerinvoicedetails:boolean=false;
@ViewChild('tblerpcustomerinvoicedetailssource',{static:false}) tblerpcustomerinvoicedetailssource: Ng2SmartTableComponent;
 erpcustomerinvoiceForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
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
erpcustomerinvoiceshowOption:boolean;
erpcustomerinvoicedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpcustomerinvoicedetailsvisiblelist:any;
erpcustomerinvoicedetailshidelist:any;

DeletederpcustomerinvoicedetailIDs: string="";
erpcustomerinvoicedetailsID: string = "1";
erpcustomerinvoicedetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpcustomerinvoiceservice: erpcustomerinvoiceService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private erpsalesorderdetailservice: erpsalesorderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.erpcustomerinvoiceForm  = this.fb.group({
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
outstandingamount: [null],
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
soid: [null],
});
}

get f() { return this.erpcustomerinvoiceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpcustomerinvoiceForm.dirty && this.erpcustomerinvoiceForm.touched ) {
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
let erpcustomerinvoiceid = null;

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
this.formid=erpcustomerinvoiceid;
//this.sharedService.alert(erpcustomerinvoiceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpcustomerinvoicedetailsTableConfig();
  setTimeout(() => {
  this.SeterpcustomerinvoicedetailsTableddConfig();
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
if(this.erpcustomerinvoiceservice.formData && this.erpcustomerinvoiceservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpcustomerinvoiceForm.patchValue({
    branchid: this.erpcustomerinvoiceservice.formData.branchid,
    branchiddesc: this.erpcustomerinvoiceservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpcustomerinvoiceForm.get('branchid').value);
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
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.erpcustomerinvoiceservice.formData && this.erpcustomerinvoiceservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.erpcustomerinvoiceForm.patchValue({
    customerid: this.erpcustomerinvoiceservice.formData.customerid,
    customeriddesc: this.erpcustomerinvoiceservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.erpcustomerinvoiceForm.get('customerid').value);
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
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.configservice.getList("creditdays").then(res => this.creditdaysList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpcustomerinvoiceservice.formData && this.erpcustomerinvoiceservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpcustomerinvoiceForm.patchValue({
    accountid: this.erpcustomerinvoiceservice.formData.accountid,
    accountiddesc: this.erpcustomerinvoiceservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpcustomerinvoiceForm.get('accountid').value);
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
if(this.erpcustomerinvoiceservice.formData && this.erpcustomerinvoiceservice.formData.assigntofinanceuserid){
this.assigntofinanceuseridoptionsEvent.emit(this.assigntofinanceuseridList);
this.erpcustomerinvoiceForm.patchValue({
    assigntofinanceuserid: this.erpcustomerinvoiceservice.formData.assigntofinanceuserid,
    assigntofinanceuseriddesc: this.erpcustomerinvoiceservice.formData.assigntofinanceuseriddesc,
});
}
{
let arrassigntofinanceuserid = this.assigntofinanceuseridList.filter(v => v.userid == this.erpcustomerinvoiceForm.get('assigntofinanceuserid').value);
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
    this.erpcustomerinvoiceservice.geterpcustomerinvoicesList().then(res => {
      this.pkList = res as erpcustomerinvoice[];
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
this.erpcustomerinvoiceForm.markAsUntouched();
this.erpcustomerinvoiceForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpcustomerinvoiceForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.erpcustomerinvoiceForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpcustomerinvoiceForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}

onSelectedassigntofinanceuserid(assigntofinanceuseridDetail: any) {
if (assigntofinanceuseridDetail.userid && assigntofinanceuseridDetail) {
this.erpcustomerinvoiceForm.patchValue({
assigntofinanceuserid: assigntofinanceuseridDetail.userid,
assigntofinanceuseriddesc: assigntofinanceuseridDetail.username,

});

}
}




resetForm() {
if (this.erpcustomerinvoiceForm != null)
this.erpcustomerinvoiceForm.reset();
this.erpcustomerinvoiceForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
assigntofinanceuserid: this.sessiondata.userid,
assigntofinanceuseriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpcustomerinvoiceservice.erpcustomerinvoicedetails=[];
this.erpcustomerinvoicedetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let invoiceid = this.erpcustomerinvoiceForm.get('invoiceid').value;
        if(invoiceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpcustomerinvoiceservice.deleteerpcustomerinvoice(invoiceid).then(res =>
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
    this.erpcustomerinvoiceForm.patchValue({
        invoiceid: null
    });
    if(this.erpcustomerinvoiceservice.formData.invoiceid!=null)this.erpcustomerinvoiceservice.formData.invoiceid=null;
for (let i=0;i<this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.length;i++) {
this.erpcustomerinvoiceservice.erpcustomerinvoicedetails[i].invoicedetailid=null;
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
this.erpcustomerinvoiceForm.patchValue({"invoicedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.erpcustomerinvoiceForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="receiveddate")
this.erpcustomerinvoiceForm.patchValue({"receiveddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpcustomerinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpcustomerinvoiceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpcustomerinvoiceForm.controls[key]!=undefined)
{
this.erpcustomerinvoiceForm.controls[key].disable({onlySelf: true});
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
this.erpcustomerinvoiceForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
creditdaysonChange(evt:any){
let e=this.f.creditdays.value as any;
this.erpcustomerinvoiceForm.patchValue({creditdaysdesc:evt.options[evt.options.selectedIndex].text});
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
outstandingamountonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.erpcustomerinvoiceForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
baseamountonChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
let e=evt.value;
}
costcenteronChange(evt:any){
let e=evt.value;
this.erpcustomerinvoiceForm.patchValue({costcenterdesc:evt.options[evt.options.selectedIndex].text});
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
soidonChange(evt:any){
let e=evt.value;
}

editerpcustomerinvoices() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpcustomerinvoiceservice.geterpcustomerinvoicesByEID(pkcol).then(res => {

this.erpcustomerinvoiceservice.formData=res.erpcustomerinvoice;
let formproperty=res.erpcustomerinvoice.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpcustomerinvoice.pkcol;
this.formid=res.erpcustomerinvoice.invoiceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpcustomerinvoice.invoiceid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpcustomerinvoiceForm.patchValue({
branchid: res.erpcustomerinvoice.branchid,
branchiddesc: res.erpcustomerinvoice.branchiddesc,
invoiceid: res.erpcustomerinvoice.invoiceid,
customerid: res.erpcustomerinvoice.customerid,
customeriddesc: res.erpcustomerinvoice.customeriddesc,
invoicenumber: res.erpcustomerinvoice.invoicenumber,
invoicedate: this.ngbDateParserFormatter.parse(res.erpcustomerinvoice.invoicedate),
invoicedetails: res.erpcustomerinvoice.invoicedetails,
customerreference: res.erpcustomerinvoice.customerreference,
challanno: res.erpcustomerinvoice.challanno,
invoicecurrency: res.erpcustomerinvoice.invoicecurrency,
totalitemvalue: res.erpcustomerinvoice.totalitemvalue,
discount: res.erpcustomerinvoice.discount,
tax1: res.erpcustomerinvoice.tax1,
tax2: res.erpcustomerinvoice.tax2,
totalcharges: res.erpcustomerinvoice.totalcharges,
tds: res.erpcustomerinvoice.tds,
invoiceamount: res.erpcustomerinvoice.invoiceamount,
duedate: this.ngbDateParserFormatter.parse(res.erpcustomerinvoice.duedate),
paymentterms: res.erpcustomerinvoice.paymentterms,
paymenttermsdesc: res.erpcustomerinvoice.paymenttermsdesc,
creditdays: res.erpcustomerinvoice.creditdays,
creditdaysdesc: res.erpcustomerinvoice.creditdaysdesc,
receiveddate: this.ngbDateParserFormatter.parse(res.erpcustomerinvoice.receiveddate),
receiptreference: res.erpcustomerinvoice.receiptreference,
receivedamount: res.erpcustomerinvoice.receivedamount,
receivedcurrency: res.erpcustomerinvoice.receivedcurrency,
outstandingamount: res.erpcustomerinvoice.outstandingamount,
basecurrency: res.erpcustomerinvoice.basecurrency,
basecurrencydesc: res.erpcustomerinvoice.basecurrencydesc,
baseamount: res.erpcustomerinvoice.baseamount,
accountid: res.erpcustomerinvoice.accountid,
accountiddesc: res.erpcustomerinvoice.accountiddesc,
costcenter: res.erpcustomerinvoice.costcenter,
costcenterdesc: res.erpcustomerinvoice.costcenterdesc,
assigntofinanceuserid: res.erpcustomerinvoice.assigntofinanceuserid,
assigntofinanceuseriddesc: res.erpcustomerinvoice.assigntofinanceuseriddesc,
remarks: res.erpcustomerinvoice.remarks,
status: res.erpcustomerinvoice.status,
statusdesc: res.erpcustomerinvoice.statusdesc,
soid: res.erpcustomerinvoice.soid,
});
this.erpcustomerinvoicedetailsvisiblelist=res.erpcustomerinvoicedetailsvisiblelist;
//Child Tables if any
this.erpcustomerinvoiceservice.erpcustomerinvoicedetails = res.erpcustomerinvoicedetails;
this.SeterpcustomerinvoicedetailsTableConfig();
this.erpcustomerinvoicedetailsLoadTable();
  setTimeout(() => {
  this.SeterpcustomerinvoicedetailsTableddConfig();
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
  for (let key in this.erpcustomerinvoiceForm.controls) {
    if (this.erpcustomerinvoiceForm.controls[key] != null) {
if(false)
{
if(this.erpcustomerinvoiceservice.formData!=null && this.erpcustomerinvoiceservice.formData[key]!=null  && this.erpcustomerinvoiceservice.formData[key]!='[]' && this.erpcustomerinvoiceservice.formData[key]!=undefined && this.erpcustomerinvoiceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpcustomerinvoiceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpcustomerinvoiceservice.formData!=null && this.erpcustomerinvoiceservice.formData[key]!=null   && this.erpcustomerinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpcustomerinvoiceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpcustomerinvoiceservice.formData!=null && this.erpcustomerinvoiceservice.formData[key]!=null   && this.erpcustomerinvoiceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpcustomerinvoiceservice.formData[key]+"'><div class='progress__number'>"+this.erpcustomerinvoiceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpcustomerinvoiceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpcustomerinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpcustomerinvoiceForm.value;
obj.invoicedate=new Date(this.erpcustomerinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('invoicedate').value)+'  UTC' :null);
obj.duedate=new Date(this.erpcustomerinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('duedate').value)+'  UTC' :null);
obj.receiveddate=new Date(this.erpcustomerinvoiceForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('receiveddate').value)+'  UTC' :null);
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

private erpcustomerinvoicetoggleOption(){
this.erpcustomerinvoiceshowOption = this.erpcustomerinvoiceshowOption === true ? false : true;
}

private erpcustomerinvoicedetailtoggleOption(){
this.erpcustomerinvoicedetailshowOption = this.erpcustomerinvoicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpcustomerinvoiceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpcustomerinvoiceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpcustomerinvoiceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpcustomerinvoiceservice.formData=this.erpcustomerinvoiceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpcustomerinvoiceForm.controls[key] != null)
    {
        this.erpcustomerinvoiceservice.formData[key] = this.erpcustomerinvoiceForm.controls[key].value;
    }
}
}
}
this.erpcustomerinvoiceservice.formData.invoicedate=new Date(this.erpcustomerinvoiceForm.get('invoicedate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('invoicedate').value)+'  UTC' :null);
this.erpcustomerinvoiceservice.formData.duedate=new Date(this.erpcustomerinvoiceForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('duedate').value)+'  UTC' :null);
this.erpcustomerinvoiceservice.formData.receiveddate=new Date(this.erpcustomerinvoiceForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.erpcustomerinvoiceForm.get('receiveddate').value)+'  UTC' :null);
this.erpcustomerinvoiceservice.formData.DeletederpcustomerinvoicedetailIDs = this.DeletederpcustomerinvoicedetailIDs;
console.log(this.erpcustomerinvoiceservice.formData);
this.erpcustomerinvoiceservice.formData=this.erpcustomerinvoiceForm.value;
this.erpcustomerinvoiceservice.saveOrUpdateerpcustomerinvoices().subscribe(
async res => {
if (this.erpcustomerinvoicedetailssource.data)
{
    for (let i = 0; i < this.erpcustomerinvoicedetailssource.data.length; i++)
    {
        if (this.erpcustomerinvoicedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpcustomerinvoicedetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcustomerinvoice);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpcustomerinvoiceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcustomerinvoice);
}
else
{
this.FillData(res);
}
}
this.erpcustomerinvoiceForm.markAsUntouched();
this.erpcustomerinvoiceForm.markAsPristine();
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
data: {branchid:this.erpcustomerinvoiceForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.erpcustomerinvoiceForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpcustomerinvoiceForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenter( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erpcustomerinvoiceForm.get('costcenter').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassigntofinanceuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpcustomerinvoiceForm.get('assigntofinanceuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpcustomerinvoicedetail(event:any,invoicedetailid:any, invoiceid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpcustomerinvoicedetailComponent, 
{
data:  {  showview:false,save:false,event,invoicedetailid, invoiceid,visiblelist:this.erpcustomerinvoicedetailsvisiblelist,  hidelist:this.erpcustomerinvoicedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpcustomerinvoicedetailssource.add(res);
this.erpcustomerinvoicedetailssource.refresh();
}
else
{
this.erpcustomerinvoicedetailssource.update(event.data, res);
}
}
});
}

onDeleteerpcustomerinvoicedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpcustomerinvoicedetailIDs += childID + ",";
this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpcustomerinvoicedetails
erpcustomerinvoicedetailssettings:any;
erpcustomerinvoicedetailssource: any;

showerpcustomerinvoicedetailsCheckbox()
{
debugger;
if(this.tblerpcustomerinvoicedetailssource.settings['selectMode']== 'multi')this.tblerpcustomerinvoicedetailssource.settings['selectMode']= 'single';
else
this.tblerpcustomerinvoicedetailssource.settings['selectMode']= 'multi';
this.tblerpcustomerinvoicedetailssource.initGrid();
}
deleteerpcustomerinvoicedetailsAll()
{
this.tblerpcustomerinvoicedetailssource.settings['selectMode'] = 'single';
}
showerpcustomerinvoicedetailsFilter()
{
  setTimeout(() => {
  this.SeterpcustomerinvoicedetailsTableddConfig();
  });
      if(this.tblerpcustomerinvoicedetailssource.settings!=null)this.tblerpcustomerinvoicedetailssource.settings['hideSubHeader'] =!this.tblerpcustomerinvoicedetailssource.settings['hideSubHeader'];
this.tblerpcustomerinvoicedetailssource.initGrid();
}
showerpcustomerinvoicedetailsInActive()
{
}
enableerpcustomerinvoicedetailsInActive()
{
}
async SeterpcustomerinvoicedetailsTableddConfig()
{
if(!this.bfilterPopulateerpcustomerinvoicedetails){

this.configservice.getList("paymenttermtype").then(res=>
{
var datapaymenttermtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpcustomerinvoicedetailspaymenttermtype3.push(defaultobj);
for(let i=0; i<datapaymenttermtype2.length; i++){
var obj= { value: datapaymenttermtype2[i].configkey, title: datapaymenttermtype2[i].configtext};
this.dataerpcustomerinvoicedetailspaymenttermtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpcustomerinvoicedetailssource.settings);
if(clone.columns['paymenttermtype']!=undefined)clone.columns['paymenttermtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcustomerinvoicedetailspaymenttermtype3)), }, };
if(clone.columns['paymenttermtype']!=undefined)clone.columns['paymenttermtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcustomerinvoicedetailspaymenttermtype3)), }, };
this.tblerpcustomerinvoicedetailssource.settings =  clone;
this.tblerpcustomerinvoicedetailssource.initGrid();
});
}
this.bfilterPopulateerpcustomerinvoicedetails=true;
}
async erpcustomerinvoicedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpcustomerinvoicedetailsTableConfig()
{
this.erpcustomerinvoicedetailssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpcustomerinvoicedetailspaymenttermtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
erpcustomerinvoicedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcustomerinvoicedetailsID)>=0)
{
this.erpcustomerinvoicedetailssource=new LocalDataSource();
this.erpcustomerinvoicedetailssource.load(this.erpcustomerinvoiceservice.erpcustomerinvoicedetails as  any as LocalDataSource);
this.erpcustomerinvoicedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpcustomerinvoicedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.length == 0)
{
    this.tblerpcustomerinvoicedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpcustomerinvoicedetail();
    this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.push(obj);
    this.erpcustomerinvoicedetailssource.refresh();
    if ((this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.length / this.erpcustomerinvoicedetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpcustomerinvoicedetailssource.getPaging().page)
    {
        this.erpcustomerinvoicedetailssource.setPage((this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.length / this.erpcustomerinvoicedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpcustomerinvoicedetailssource.grid.edit(this.tblerpcustomerinvoicedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpcustomerinvoicedetailssource.data.indexOf(event.data);
this.onDeleteerpcustomerinvoicedetail(event,event.data.invoicedetailid,((this.erpcustomerinvoicedetailssource.getPaging().page-1) *this.erpcustomerinvoicedetailssource.getPaging().perPage)+index);
this.erpcustomerinvoicedetailssource.refresh();
break;
}
}

*/
erpcustomerinvoicedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpcustomerinvoicedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpcustomerinvoicedetail(event,event.data.invoicedetailid,this.formid);
break;
case 'delete':
this.onDeleteerpcustomerinvoicedetail(event,event.data.invoicedetailid,((this.erpcustomerinvoicedetailssource.getPaging().page-1) *this.erpcustomerinvoicedetailssource.getPaging().perPage)+event.index);
this.erpcustomerinvoicedetailssource.refresh();
break;
}
}
erpcustomerinvoicedetailsonDelete(obj) {
let invoicedetailid=obj.data.invoicedetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpcustomerinvoiceservice.deleteerpcustomerinvoice(invoicedetailid).then(res=>
this.erpcustomerinvoicedetailsLoadTable()
);
}
}
erpcustomerinvoicedetailsPaging(val)
{
debugger;
this.erpcustomerinvoicedetailssource.setPaging(1, val, true);
}

handleerpcustomerinvoicedetailsGridSelected(event:any) {
this.erpcustomerinvoicedetailsselectedindex=this.erpcustomerinvoiceservice.erpcustomerinvoicedetails.findIndex(i => i.invoicedetailid === event.data.invoicedetailid);
}
IserpcustomerinvoicedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcustomerinvoicedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpcustomerinvoicedetails

}



