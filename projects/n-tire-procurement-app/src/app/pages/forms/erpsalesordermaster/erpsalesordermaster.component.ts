import { erpsalesordermasterService } from './../../../service/erpsalesordermaster.service';
import { erpsalesordermaster } from './../../../model/erpsalesordermaster.model';
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
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
import { bocontact} from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
import { bocontactService } from '../../../../../../n-tire-bo-app/src/app/service/bocontact.service';
//popups
import { erpsupplierquotationmaster} from './../../../model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from './../../../pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
//detail table services
import { erpsalesorderdetail } from './../../../model/erpsalesorderdetail.model';
import { erpsalesorderdetailComponent } from './../../../pages/forms/erpsalesorderdetail/erpsalesorderdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erpsalesorderpaymentterm } from './../../../model/erpsalesorderpaymentterm.model';
import { erpsalesorderpaymenttermComponent } from './../../../pages/forms/erpsalesorderpaymentterm/erpsalesorderpaymentterm.component';
//FK services
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-erpsalesordermaster',
templateUrl: './erpsalesordermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsalesordermasterComponent implements OnInit {
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
bfilterPopulateerpsalesordermasters:boolean=false;
dataerpsalesordermastersbranchid3:any=[];
dataerpsalesordermasterscustomerid3:any=[];
dataerpsalesordermasterssotype3:any=[];
dataerpsalesordermastersorderpriority3:any=[];
dataerpsalesordermasterssocurrency3:any=[];
dataerpsalesordermastersourcontactpersonid3:any=[];
dataerpsalesordermasterscustomercontactid3:any=[];
dataerpsalesordermastersbillbranchid3:any=[];
dataerpsalesordermastersdeliverybranchid3:any=[];
dataerpsalesordermasterscreditdays3:any=[];
dataerpsalesordermasterspaymentterms3:any=[];
dataerpsalesordermastersquotationid3:any=[];
dataerpsalesordermasterscostcenterid3:any=[];
dataerpsalesordermastersincoterms3:any=[];
dataerpsalesordermastersprojectid3:any=[];
dataerpsalesordermastersorderstatus3:any=[];
dataerpsalesordermastersleadsource3:any=[];
dataerpsalesorderdetailsitemid3:any=[];
dataerpsalesorderdetailsdiscounttype3:any=[];
dataerpsalesorderdetailsbasecurrency3:any=[];
dataerpsalesorderdetailsdetailtype3:any=[];
dataerpsalesorderdetailsuom3:any=[];
dataerpsalesorderdetailscurrency3:any=[];
dataerpsalesorderdetailstax1name3:any=[];
dataerpsalesorderdetailstax2name3:any=[];
dataerpsalesorderdetailssoid3:any=[];
bfilterPopulateerpsalesorderdetails:boolean=false;
dataerpsalesorderpaymenttermscurrency3:any=[];
dataerpsalesorderpaymenttermspaymenttermtype3:any=[];
dataerpsalesorderpaymenttermssoid3:any=[];
bfilterPopulateerpsalesorderpaymentterms:boolean=false;
@ViewChild('tblerpsalesorderdetailssource',{static:false}) tblerpsalesorderdetailssource: Ng2SmartTableComponent;
@ViewChild('tblerpsalesorderpaymenttermssource',{static:false}) tblerpsalesorderpaymenttermssource: Ng2SmartTableComponent;
 erpsalesordermasterForm: FormGroup;
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
sotypeList: boconfigvalue[];
orderpriorityList: boconfigvalue[];
socurrencyList: boconfigvalue[];
ourcontactpersonidList: hrmsemployee[];
ourcontactpersonidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
ourcontactpersonid_hrmsemployeesForm: FormGroup;//autocomplete
ourcontactpersonid_hrmsemployeesoptions:any;//autocomplete
ourcontactpersonid_hrmsemployeesformatter:any;//autocomplete
customercontactidList: bocontact[];
billbranchidList: bobranchmaster[];
billbranchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
billbranchid_bobranchmastersForm: FormGroup;//autocomplete
billbranchid_bobranchmastersoptions:any;//autocomplete
billbranchid_bobranchmastersformatter:any;//autocomplete
deliverybranchidList: bobranchmaster[];
deliverybranchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverybranchid_bobranchmastersForm: FormGroup;//autocomplete
deliverybranchid_bobranchmastersoptions:any;//autocomplete
deliverybranchid_bobranchmastersformatter:any;//autocomplete
creditdaysList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
quotationidList: erpsupplierquotationmaster[];
quotationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
quotationid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
quotationid_erpsupplierquotationmastersoptions:any;//autocomplete
quotationid_erpsupplierquotationmastersformatter:any;//autocomplete
costcenteridList: erpfacostcenter[];
incotermsList: boconfigvalue[];
projectidList: prjprojectmaster[];
orderstatusList: boconfigvalue[];
leadsourceList: boconfigvalue[];
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
erpsalesordermastershowOption:boolean;
erpsalesorderdetailshowOption:boolean;
erpsalesorderpaymenttermshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsalesorderdetailsvisiblelist:any;
erpsalesorderdetailshidelist:any;
erpsalesorderpaymenttermsvisiblelist:any;
erpsalesorderpaymenttermshidelist:any;

DeletederpsalesorderdetailIDs: string="";
erpsalesorderdetailsID: string = "1";
erpsalesorderdetailsselectedindex:any;
DeletederpsalesorderpaymenttermIDs: string="";
erpsalesorderpaymenttermsID: string = "2";
erpsalesorderpaymenttermsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsalesordermasterservice: erpsalesordermasterService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private crmcustomermasterservice:crmcustomermasterService,
private hrmsemployeeservice:hrmsemployeeService,
private bocontactservice:bocontactService,
private erpsupplierquotationmasterservice:erpsupplierquotationmasterService,
private erpfacostcenterservice:erpfacostcenterService,
private prjprojectmasterservice:prjprojectmasterService,
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
this.erpsalesordermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
soid: [null],
sonumber: [null],
versionnumber: [null],
sodate: [null],
sodetails: [null],
customerid: [null],
customeriddesc: [null],
sotype: [null],
sotypedesc: [null],
orderpriority: [null],
orderprioritydesc: [null],
multicompany: [null],
socurrency: [null],
socurrencydesc: [null],
ourcontactpersonid: [null],
ourcontactpersoniddesc: [null],
customercontactid: [null],
customercontactiddesc: [null],
customerpo: [null],
customerpodate: [null],
customerreference: [null],
billbranchid: [null],
billbranchiddesc: [null],
deliverybranchid: [null],
deliverybranchiddesc: [null],
creditdays: [null],
creditdaysdesc: [null],
paymentterms: [null],
paymenttermsdesc: [null],
termsandconditions: [null],
tcattachment: [null],
shippingdetails: [null],
suppliernotes: [null],
quotationid: [null],
quotationiddesc: [null],
quotationver: [null],
totallistprice: [null],
discount: [null],
totalvalue: [null],
shippingcharges: [null],
shippingtax: [null],
shippingtaxamount: [null],
tax: [null],
soamount: [null],
costcenterid: [null],
costcenteriddesc: [null],
incoterms: [null],
incotermsdesc: [null],
reference: [null],
expecteddeliverydate: [null],
validenddate: [null],
internalnotes: [null],
projectid: [null],
projectiddesc: [null],
customeracceptance: [null],
customeracceptancedate: [null],
changerequested: [null],
customerchangerequest: [null],
remarks: [null],
orderstatus: [null],
orderstatusdesc: [null],
leadsource: [null],
leadsourcedesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsalesordermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsalesordermasterForm.dirty && this.erpsalesordermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.soid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.soid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.soid && pkDetail) {
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
let erpsalesordermasterid = null;

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
this.formid=erpsalesordermasterid;
//this.sharedService.alert(erpsalesordermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsalesorderdetailsTableConfig();
  setTimeout(() => {
  this.SeterpsalesorderdetailsTableddConfig();
  });

this.SeterpsalesorderpaymenttermsTableConfig();
  setTimeout(() => {
  this.SeterpsalesorderpaymenttermsTableddConfig();
  });

this.FillCustomField();
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
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpsalesordermasterForm.patchValue({
    branchid: this.erpsalesordermasterservice.formData.branchid,
    branchiddesc: this.erpsalesordermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpsalesordermasterForm.get('branchid').value);
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
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.erpsalesordermasterForm.patchValue({
    customerid: this.erpsalesordermasterservice.formData.customerid,
    customeriddesc: this.erpsalesordermasterservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.erpsalesordermasterForm.get('customerid').value);
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
: this.customeridList.filter(v => v.companyname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.companyname;
this.configservice.getList("sotype").then(res => this.sotypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.orderpriorityList = res as boconfigvalue[]);
this.configservice.getList("socurrency").then(res => this.socurrencyList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.ourcontactpersonidList = res as hrmsemployee[];
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.ourcontactpersonid){
this.ourcontactpersonidoptionsEvent.emit(this.ourcontactpersonidList);
this.erpsalesordermasterForm.patchValue({
    ourcontactpersonid: this.erpsalesordermasterservice.formData.ourcontactpersonid,
    ourcontactpersoniddesc: this.erpsalesordermasterservice.formData.ourcontactpersoniddesc,
});
}
{
let arrourcontactpersonid = this.ourcontactpersonidList.filter(v => v.employeeid == this.erpsalesordermasterForm.get('ourcontactpersonid').value);
let objourcontactpersonid;
if (arrourcontactpersonid.length > 0) objourcontactpersonid = arrourcontactpersonid[0];
if (objourcontactpersonid)
{
}
}
}
).catch((err) => {console.log(err);});
this.ourcontactpersonid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ourcontactpersonidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.ourcontactpersonid_hrmsemployeesformatter = (result: any) => result.employeename;
this.bocontactservice.getbocontactsList().then(res => 
{
this.customercontactidList = res as bocontact[];
}
).catch((err) => {console.log(err);});
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.billbranchidList = res as bobranchmaster[];
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.billbranchid){
this.billbranchidoptionsEvent.emit(this.billbranchidList);
this.erpsalesordermasterForm.patchValue({
    billbranchid: this.erpsalesordermasterservice.formData.billbranchid,
    billbranchiddesc: this.erpsalesordermasterservice.formData.billbranchiddesc,
});
}
{
let arrbillbranchid = this.billbranchidList.filter(v => v.branchid == this.erpsalesordermasterForm.get('billbranchid').value);
let objbillbranchid;
if (arrbillbranchid.length > 0) objbillbranchid = arrbillbranchid[0];
if (objbillbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.billbranchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.billbranchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.billbranchid_bobranchmastersformatter = (result: any) => result.branchname;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.deliverybranchidList = res as bobranchmaster[];
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.deliverybranchid){
this.deliverybranchidoptionsEvent.emit(this.deliverybranchidList);
this.erpsalesordermasterForm.patchValue({
    deliverybranchid: this.erpsalesordermasterservice.formData.deliverybranchid,
    deliverybranchiddesc: this.erpsalesordermasterservice.formData.deliverybranchiddesc,
});
}
{
let arrdeliverybranchid = this.deliverybranchidList.filter(v => v.branchid == this.erpsalesordermasterForm.get('deliverybranchid').value);
let objdeliverybranchid;
if (arrdeliverybranchid.length > 0) objdeliverybranchid = arrdeliverybranchid[0];
if (objdeliverybranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.deliverybranchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.deliverybranchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.deliverybranchid_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("creditdays").then(res => this.creditdaysList = res as boconfigvalue[]);
this.configservice.getList("paymentterms").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quotationidList = res as erpsupplierquotationmaster[];
if(this.erpsalesordermasterservice.formData && this.erpsalesordermasterservice.formData.quotationid){
this.quotationidoptionsEvent.emit(this.quotationidList);
this.erpsalesordermasterForm.patchValue({
    quotationid: this.erpsalesordermasterservice.formData.quotationid,
    quotationiddesc: this.erpsalesordermasterservice.formData.quotationiddesc,
});
}
{
let arrquotationid = this.quotationidList.filter(v => v.quotationid == this.erpsalesordermasterForm.get('quotationid').value);
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
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenteridList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("incoterms").then(res => this.incotermsList = res as boconfigvalue[]);
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("orderstatus").then(res => this.orderstatusList = res as boconfigvalue[]);
this.configservice.getList("leadsource").then(res => this.leadsourceList = res as boconfigvalue[]);

//autocomplete
    this.erpsalesordermasterservice.geterpsalesordermastersList().then(res => {
      this.pkList = res as erpsalesordermaster[];
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
this.erpsalesordermasterForm.markAsUntouched();
this.erpsalesordermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpsalesordermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.erpsalesordermasterForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.companyname,

});

}
}

onSelectedourcontactpersonid(ourcontactpersonidDetail: any) {
if (ourcontactpersonidDetail.employeeid && ourcontactpersonidDetail) {
this.erpsalesordermasterForm.patchValue({
ourcontactpersonid: ourcontactpersonidDetail.employeeid,
ourcontactpersoniddesc: ourcontactpersonidDetail.employeename,

});

}
}

onSelectedbillbranchid(billbranchidDetail: any) {
if (billbranchidDetail.branchid && billbranchidDetail) {
this.erpsalesordermasterForm.patchValue({
billbranchid: billbranchidDetail.branchid,
billbranchiddesc: billbranchidDetail.branchname,

});

}
}

onSelecteddeliverybranchid(deliverybranchidDetail: any) {
if (deliverybranchidDetail.branchid && deliverybranchidDetail) {
this.erpsalesordermasterForm.patchValue({
deliverybranchid: deliverybranchidDetail.branchid,
deliverybranchiddesc: deliverybranchidDetail.branchname,

});

}
}

onSelectedquotationid(quotationidDetail: any) {
if (quotationidDetail.quotationid && quotationidDetail) {
this.erpsalesordermasterForm.patchValue({
quotationid: quotationidDetail.quotationid,
quotationiddesc: quotationidDetail.quotationreference,

});

}
}




resetForm() {
if (this.erpsalesordermasterForm != null)
this.erpsalesordermasterForm.reset();
this.erpsalesordermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
billbranchid: this.sessiondata.branchid,
billbranchiddesc: this.sessiondata.branchiddesc,
deliverybranchid: this.sessiondata.branchid,
deliverybranchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erpsalesordermasterservice.erpsalesorderdetails=[];
this.erpsalesorderdetailsLoadTable();
this.erpsalesordermasterservice.erpsalesorderpaymentterms=[];
this.erpsalesorderpaymenttermsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let soid = this.erpsalesordermasterForm.get('soid').value;
        if(soid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsalesordermasterservice.deleteerpsalesordermaster(soid).then(res =>
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
    this.erpsalesordermasterForm.patchValue({
        soid: null
    });
    if(this.erpsalesordermasterservice.formData.soid!=null)this.erpsalesordermasterservice.formData.soid=null;
for (let i=0;i<this.erpsalesordermasterservice.erpsalesorderdetails.length;i++) {
this.erpsalesordermasterservice.erpsalesorderdetails[i].sodetailid=null;
}
for (let i=0;i<this.erpsalesordermasterservice.erpsalesorderpaymentterms.length;i++) {
this.erpsalesordermasterservice.erpsalesorderpaymentterms[i].paytermid=null;
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
        else if(key=="sodate")
this.erpsalesordermasterForm.patchValue({"sodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="customerpodate")
this.erpsalesordermasterForm.patchValue({"customerpodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expecteddeliverydate")
this.erpsalesordermasterForm.patchValue({"expecteddeliverydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validenddate")
this.erpsalesordermasterForm.patchValue({"validenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="customeracceptancedate")
this.erpsalesordermasterForm.patchValue({"customeracceptancedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsalesordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsalesordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsalesordermasterForm.controls[key]!=undefined)
{
this.erpsalesordermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpsalesordermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
branchidonChange(evt:any){
let e=evt.value;
}
soidonChange(evt:any){
let e=evt.value;
}
sonumberonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
sodateonChange(evt:any){
let e=evt.value;
}
sodetailsonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
sotypeonChange(evt:any){
let e=this.f.sotype.value as any;
this.erpsalesordermasterForm.patchValue({sotypedesc:evt.options[evt.options.selectedIndex].text});
}
orderpriorityonChange(evt:any){
let e=this.f.orderpriority.value as any;
this.erpsalesordermasterForm.patchValue({orderprioritydesc:evt.options[evt.options.selectedIndex].text});
}
multicompanyonChange(evt:any){
let e=evt.value;
}
socurrencyonChange(evt:any){
let e=this.f.socurrency.value as any;
this.erpsalesordermasterForm.patchValue({socurrencydesc:evt.options[evt.options.selectedIndex].text});
}
ourcontactpersonidonChange(evt:any){
let e=evt.value;
}
customercontactidonChange(evt:any){
let e=evt.value;
this.erpsalesordermasterForm.patchValue({customercontactiddesc:evt.options[evt.options.selectedIndex].text});
}
customerpoonChange(evt:any){
let e=evt.value;
}
customerpodateonChange(evt:any){
let e=evt.value;
}
customerreferenceonChange(evt:any){
let e=evt.value;
}
billbranchidonChange(evt:any){
let e=evt.value;
}
deliverybranchidonChange(evt:any){
let e=evt.value;
}
creditdaysonChange(evt:any){
let e=this.f.creditdays.value as any;
this.erpsalesordermasterForm.patchValue({creditdaysdesc:evt.options[evt.options.selectedIndex].text});
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erpsalesordermasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
termsandconditionsonChange(evt:any){
let e=evt.value;
}
tcattachmentonChange(evt:any){
let e=evt.value;
}
shippingdetailsonChange(evt:any){
let e=evt.value;
}
suppliernotesonChange(evt:any){
let e=evt.value;
}
quotationidonChange(evt:any){
let e=evt.value;
}
quotationveronChange(evt:any){
let e=evt.value;
}
totallistpriceonChange(evt:any){
let e=evt.value;
}
discountonChange(evt:any){
let e=evt.value;
}
totalvalueonChange(evt:any){
let e=evt.value;
}
shippingchargesonChange(evt:any){
let e=evt.value;
}
shippingtaxonChange(evt:any){
let e=evt.value;
}
shippingtaxamountonChange(evt:any){
let e=evt.value;
}
taxonChange(evt:any){
let e=evt.value;
}
soamountonChange(evt:any){
let e=evt.value;
}
costcenteridonChange(evt:any){
let e=evt.value;
this.erpsalesordermasterForm.patchValue({costcenteriddesc:evt.options[evt.options.selectedIndex].text});
}
incotermsonChange(evt:any){
let e=this.f.incoterms.value as any;
this.erpsalesordermasterForm.patchValue({incotermsdesc:evt.options[evt.options.selectedIndex].text});
}
referenceonChange(evt:any){
let e=evt.value;
}
expecteddeliverydateonChange(evt:any){
let e=evt.value;
}
validenddateonChange(evt:any){
let e=evt.value;
}
internalnotesonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
this.erpsalesordermasterForm.patchValue({projectiddesc:evt.options[evt.options.selectedIndex].text});
}
customeracceptanceonChange(evt:any){
let e=evt.value;
}
customeracceptancedateonChange(evt:any){
let e=evt.value;
}
changerequestedonChange(evt:any){
let e=evt.value;
}
customerchangerequestonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
orderstatusonChange(evt:any){
let e=this.f.orderstatus.value as any;
this.erpsalesordermasterForm.patchValue({orderstatusdesc:evt.options[evt.options.selectedIndex].text});
}
leadsourceonChange(evt:any){
let e=this.f.leadsource.value as any;
this.erpsalesordermasterForm.patchValue({leadsourcedesc:evt.options[evt.options.selectedIndex].text});
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
  


editerpsalesordermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsalesordermasterservice.geterpsalesordermastersByEID(pkcol).then(res => {

this.erpsalesordermasterservice.formData=res.erpsalesordermaster;
let formproperty=res.erpsalesordermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsalesordermaster.pkcol;
this.formid=res.erpsalesordermaster.soid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsalesordermaster.soid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsalesordermasterForm.patchValue({
branchid: res.erpsalesordermaster.branchid,
branchiddesc: res.erpsalesordermaster.branchiddesc,
soid: res.erpsalesordermaster.soid,
sonumber: res.erpsalesordermaster.sonumber,
versionnumber: res.erpsalesordermaster.versionnumber,
sodate: this.ngbDateParserFormatter.parse(res.erpsalesordermaster.sodate),
sodetails: res.erpsalesordermaster.sodetails,
customerid: res.erpsalesordermaster.customerid,
customeriddesc: res.erpsalesordermaster.customeriddesc,
sotype: res.erpsalesordermaster.sotype,
sotypedesc: res.erpsalesordermaster.sotypedesc,
orderpriority: res.erpsalesordermaster.orderpriority,
orderprioritydesc: res.erpsalesordermaster.orderprioritydesc,
multicompany: res.erpsalesordermaster.multicompany,
socurrency: res.erpsalesordermaster.socurrency,
socurrencydesc: res.erpsalesordermaster.socurrencydesc,
ourcontactpersonid: res.erpsalesordermaster.ourcontactpersonid,
ourcontactpersoniddesc: res.erpsalesordermaster.ourcontactpersoniddesc,
customercontactid: res.erpsalesordermaster.customercontactid,
customercontactiddesc: res.erpsalesordermaster.customercontactiddesc,
customerpo: res.erpsalesordermaster.customerpo,
customerpodate: this.ngbDateParserFormatter.parse(res.erpsalesordermaster.customerpodate),
customerreference: res.erpsalesordermaster.customerreference,
billbranchid: res.erpsalesordermaster.billbranchid,
billbranchiddesc: res.erpsalesordermaster.billbranchiddesc,
deliverybranchid: res.erpsalesordermaster.deliverybranchid,
deliverybranchiddesc: res.erpsalesordermaster.deliverybranchiddesc,
creditdays: res.erpsalesordermaster.creditdays,
creditdaysdesc: res.erpsalesordermaster.creditdaysdesc,
paymentterms: res.erpsalesordermaster.paymentterms,
paymenttermsdesc: res.erpsalesordermaster.paymenttermsdesc,
termsandconditions: res.erpsalesordermaster.termsandconditions,
tcattachment: res.erpsalesordermaster.tcattachment,
shippingdetails: res.erpsalesordermaster.shippingdetails,
suppliernotes: res.erpsalesordermaster.suppliernotes,
quotationid: res.erpsalesordermaster.quotationid,
quotationiddesc: res.erpsalesordermaster.quotationiddesc,
quotationver: res.erpsalesordermaster.quotationver,
totallistprice: res.erpsalesordermaster.totallistprice,
discount: res.erpsalesordermaster.discount,
totalvalue: res.erpsalesordermaster.totalvalue,
shippingcharges: res.erpsalesordermaster.shippingcharges,
shippingtax: res.erpsalesordermaster.shippingtax,
shippingtaxamount: res.erpsalesordermaster.shippingtaxamount,
tax: res.erpsalesordermaster.tax,
soamount: res.erpsalesordermaster.soamount,
costcenterid: res.erpsalesordermaster.costcenterid,
costcenteriddesc: res.erpsalesordermaster.costcenteriddesc,
incoterms: res.erpsalesordermaster.incoterms,
incotermsdesc: res.erpsalesordermaster.incotermsdesc,
reference: res.erpsalesordermaster.reference,
expecteddeliverydate: this.ngbDateParserFormatter.parse(res.erpsalesordermaster.expecteddeliverydate),
validenddate: this.ngbDateParserFormatter.parse(res.erpsalesordermaster.validenddate),
internalnotes: res.erpsalesordermaster.internalnotes,
projectid: res.erpsalesordermaster.projectid,
projectiddesc: res.erpsalesordermaster.projectiddesc,
customeracceptance: res.erpsalesordermaster.customeracceptance,
customeracceptancedate: this.ngbDateParserFormatter.parse(res.erpsalesordermaster.customeracceptancedate),
changerequested: res.erpsalesordermaster.changerequested,
customerchangerequest: res.erpsalesordermaster.customerchangerequest,
remarks: res.erpsalesordermaster.remarks,
orderstatus: res.erpsalesordermaster.orderstatus,
orderstatusdesc: res.erpsalesordermaster.orderstatusdesc,
leadsource: res.erpsalesordermaster.leadsource,
leadsourcedesc: res.erpsalesordermaster.leadsourcedesc,
customfield: res.erpsalesordermaster.customfield,
attachment: JSON.parse(res.erpsalesordermaster.attachment),
status: res.erpsalesordermaster.status,
statusdesc: res.erpsalesordermaster.statusdesc,
});
this.erpsalesorderdetailsvisiblelist=res.erpsalesorderdetailsvisiblelist;
this.erpsalesorderpaymenttermsvisiblelist=res.erpsalesorderpaymenttermsvisiblelist;
if(this.erpsalesordermasterForm.get('customfield').value!=null && this.erpsalesordermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpsalesordermasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpsalesordermasterForm.get('attachment').value!=null && this.erpsalesordermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpsalesordermasterForm.get('attachment').value);
//Child Tables if any
this.erpsalesordermasterservice.erpsalesorderdetails = res.erpsalesorderdetails;
this.SeterpsalesorderdetailsTableConfig();
this.erpsalesorderdetailsLoadTable();
  setTimeout(() => {
  this.SeterpsalesorderdetailsTableddConfig();
  });
this.erpsalesordermasterservice.erpsalesorderpaymentterms = res.erpsalesorderpaymentterms;
this.SeterpsalesorderpaymenttermsTableConfig();
this.erpsalesorderpaymenttermsLoadTable();
  setTimeout(() => {
  this.SeterpsalesorderpaymenttermsTableddConfig();
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
  for (let key in this.erpsalesordermasterForm.controls) {
    if (this.erpsalesordermasterForm.controls[key] != null) {
if(false)
{
if(this.erpsalesordermasterservice.formData!=null && this.erpsalesordermasterservice.formData[key]!=null  && this.erpsalesordermasterservice.formData[key]!='[]' && this.erpsalesordermasterservice.formData[key]!=undefined && this.erpsalesordermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsalesordermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsalesordermasterservice.formData!=null && this.erpsalesordermasterservice.formData[key]!=null   && this.erpsalesordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsalesordermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsalesordermasterservice.formData!=null && this.erpsalesordermasterservice.formData[key]!=null   && this.erpsalesordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsalesordermasterservice.formData[key]+"'><div class='progress__number'>"+this.erpsalesordermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsalesordermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsalesordermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpsalesordermasterForm.value;
obj.sodate=new Date(this.erpsalesordermasterForm.get('sodate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('sodate').value)+'  UTC' :null);
obj.customerpodate=new Date(this.erpsalesordermasterForm.get('customerpodate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('customerpodate').value)+'  UTC' :null);
obj.expecteddeliverydate=new Date(this.erpsalesordermasterForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('expecteddeliverydate').value)+'  UTC' :null);
obj.validenddate=new Date(this.erpsalesordermasterForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('validenddate').value)+'  UTC' :null);
obj.customeracceptancedate=new Date(this.erpsalesordermasterForm.get('customeracceptancedate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('customeracceptancedate').value)+'  UTC' :null);
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

private erpsalesordermastertoggleOption(){
this.erpsalesordermastershowOption = this.erpsalesordermastershowOption === true ? false : true;
}

private erpsalesorderdetailtoggleOption(){
this.erpsalesorderdetailshowOption = this.erpsalesorderdetailshowOption === true ? false : true;
}

private erpsalesorderpaymenttermtoggleOption(){
this.erpsalesorderpaymenttermshowOption = this.erpsalesorderpaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsalesordermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsalesordermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsalesordermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsalesordermasterservice.formData=this.erpsalesordermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsalesordermasterForm.controls[key] != null)
    {
        this.erpsalesordermasterservice.formData[key] = this.erpsalesordermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpsalesordermasterservice.formData.sodate=new Date(this.erpsalesordermasterForm.get('sodate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('sodate').value)+'  UTC' :null);
this.erpsalesordermasterservice.formData.customerpodate=new Date(this.erpsalesordermasterForm.get('customerpodate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('customerpodate').value)+'  UTC' :null);
this.erpsalesordermasterservice.formData.expecteddeliverydate=new Date(this.erpsalesordermasterForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('expecteddeliverydate').value)+'  UTC' :null);
this.erpsalesordermasterservice.formData.validenddate=new Date(this.erpsalesordermasterForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('validenddate').value)+'  UTC' :null);
this.erpsalesordermasterservice.formData.customeracceptancedate=new Date(this.erpsalesordermasterForm.get('customeracceptancedate').value ? this.ngbDateParserFormatter.format(this.erpsalesordermasterForm.get('customeracceptancedate').value)+'  UTC' :null);
if(customfields!=null)this.erpsalesordermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpsalesordermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpsalesordermasterservice.formData.DeletederpsalesorderdetailIDs = this.DeletederpsalesorderdetailIDs;
this.erpsalesordermasterservice.formData.DeletederpsalesorderpaymenttermIDs = this.DeletederpsalesorderpaymenttermIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpsalesordermasterservice.formData);
this.erpsalesordermasterservice.formData=this.erpsalesordermasterForm.value;
this.erpsalesordermasterservice.saveOrUpdateerpsalesordermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpsalesorderdetailssource.data)
{
    for (let i = 0; i < this.erpsalesorderdetailssource.data.length; i++)
    {
        if (this.erpsalesorderdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsalesorderdetailssource.data[i].fileattachmentlist);
    }
}
if (this.erpsalesorderpaymenttermssource.data)
{
    for (let i = 0; i < this.erpsalesorderpaymenttermssource.data.length; i++)
    {
        if (this.erpsalesorderpaymenttermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsalesorderpaymenttermssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsalesordermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsalesordermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsalesordermaster);
}
else
{
this.FillData(res);
}
}
this.erpsalesordermasterForm.markAsUntouched();
this.erpsalesordermasterForm.markAsPristine();
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
data: {branchid:this.erpsalesordermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.erpsalesordermasterForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditourcontactpersonid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.erpsalesordermasterForm.get('ourcontactpersonid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomercontactid( contactid) {
/*let ScreenType='2';
this.dialog.open(bocontactComponent, 
{
data: {contactid:this.erpsalesordermasterForm.get('customercontactid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbillbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpsalesordermasterForm.get('billbranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverybranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpsalesordermasterForm.get('deliverybranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditquotationid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erpsalesordermasterForm.get('quotationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenterid( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erpsalesordermasterForm.get('costcenterid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erpsalesordermasterForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsalesorderdetail(event:any,sodetailid:any, soid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsalesorderdetailComponent, 
{
data:  {  showview:false,save:false,event,sodetailid, soid,visiblelist:this.erpsalesorderdetailsvisiblelist,  hidelist:this.erpsalesorderdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsalesorderdetailssource.add(res);
this.erpsalesorderdetailssource.refresh();
}
else
{
this.erpsalesorderdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpsalesorderdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsalesorderdetailIDs += childID + ",";
this.erpsalesordermasterservice.erpsalesorderdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsalesorderpaymentterm(event:any,paytermid:any, soid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsalesorderpaymenttermComponent, 
{
data:  {  showview:false,save:false,event,paytermid, soid,visiblelist:this.erpsalesorderpaymenttermsvisiblelist,  hidelist:this.erpsalesorderpaymenttermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsalesorderpaymenttermssource.add(res);
this.erpsalesorderpaymenttermssource.refresh();
}
else
{
this.erpsalesorderpaymenttermssource.update(event.data, res);
}
}
});
}

onDeleteerpsalesorderpaymentterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsalesorderpaymenttermIDs += childID + ",";
this.erpsalesordermasterservice.erpsalesorderpaymentterms.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsalesorderdetails
erpsalesorderdetailssettings:any;
erpsalesorderdetailssource: any;

showerpsalesorderdetailsCheckbox()
{
debugger;
if(this.tblerpsalesorderdetailssource.settings['selectMode']== 'multi')this.tblerpsalesorderdetailssource.settings['selectMode']= 'single';
else
this.tblerpsalesorderdetailssource.settings['selectMode']= 'multi';
this.tblerpsalesorderdetailssource.initGrid();
}
deleteerpsalesorderdetailsAll()
{
this.tblerpsalesorderdetailssource.settings['selectMode'] = 'single';
}
showerpsalesorderdetailsFilter()
{
  setTimeout(() => {
  this.SeterpsalesorderdetailsTableddConfig();
  });
      if(this.tblerpsalesorderdetailssource.settings!=null)this.tblerpsalesorderdetailssource.settings['hideSubHeader'] =!this.tblerpsalesorderdetailssource.settings['hideSubHeader'];
this.tblerpsalesorderdetailssource.initGrid();
}
showerpsalesorderdetailsInActive()
{
}
enableerpsalesorderdetailsInActive()
{
}
async SeterpsalesorderdetailsTableddConfig()
{
if(!this.bfilterPopulateerpsalesorderdetails){

this.erpsalesordermasterservice.geterpsalesordermastersList().then(res=>
{
var datasoid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsalesorderdetailssoid3.push(defaultobj);
for(let i=0; i<datasoid2.length; i++){
var obj= { value: datasoid2[i].soid, title:datasoid2[i].sonumber};
this.dataerpsalesorderdetailssoid3.push(obj);
}
if((this.tblerpsalesorderdetailssource.settings as any).columns['soid'])
{
(this.tblerpsalesorderdetailssource.settings as any).columns['soid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsalesorderdetailssoid3));
this.tblerpsalesorderdetailssource.initGrid();
}
});
}
this.bfilterPopulateerpsalesorderdetails=true;
}
async erpsalesorderdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsalesorderdetailsTableConfig()
{
this.erpsalesorderdetailssettings = {
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
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
customerid: {
title: 'Customer',
type: 'number',
filter:true,
},
detailtype: {
title: 'Detail Type',
type: '',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
details: {
title: 'Details',
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
type: 'number',
filter:true,
},
discounttype: {
title: 'Discount Type',
type: '',
filter:true,
},
discountvalue: {
title: 'Discount Value',
type: 'number',
filter:true,
},
saleprice: {
title: 'Sale Price',
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
expecteddelivery: {
title: 'Expected Delivery',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
size: {
title: 'Size',
type: '',
filter:true,
},
color: {
title: 'Color',
type: '',
filter:true,
},
weight: {
title: 'Weight',
type: '',
filter:true,
},
notes: {
title: 'Notes',
type: '',
filter:true,
},
paymenttermtype: {
title: 'Payment Term Type',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
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
erpsalesorderdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsalesorderdetailsID)>=0)
{
this.erpsalesorderdetailssource=new LocalDataSource();
this.erpsalesorderdetailssource.load(this.erpsalesordermasterservice.erpsalesorderdetails as  any as LocalDataSource);
this.erpsalesorderdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsalesorderdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsalesordermasterservice.erpsalesorderdetails.length == 0)
{
    this.tblerpsalesorderdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsalesorderdetail();
    this.erpsalesordermasterservice.erpsalesorderdetails.push(obj);
    this.erpsalesorderdetailssource.refresh();
    if ((this.erpsalesordermasterservice.erpsalesorderdetails.length / this.erpsalesorderdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpsalesorderdetailssource.getPaging().page)
    {
        this.erpsalesorderdetailssource.setPage((this.erpsalesordermasterservice.erpsalesorderdetails.length / this.erpsalesorderdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsalesorderdetailssource.grid.edit(this.tblerpsalesorderdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsalesorderdetailssource.data.indexOf(event.data);
this.onDeleteerpsalesorderdetail(event,event.data.sodetailid,((this.erpsalesorderdetailssource.getPaging().page-1) *this.erpsalesorderdetailssource.getPaging().perPage)+index);
this.erpsalesorderdetailssource.refresh();
break;
}
}

*/
erpsalesorderdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsalesorderdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsalesorderdetail(event,event.data.sodetailid,this.formid);
break;
case 'delete':
this.onDeleteerpsalesorderdetail(event,event.data.sodetailid,((this.erpsalesorderdetailssource.getPaging().page-1) *this.erpsalesorderdetailssource.getPaging().perPage)+event.index);
this.erpsalesorderdetailssource.refresh();
break;
}
}
erpsalesorderdetailsonDelete(obj) {
let sodetailid=obj.data.sodetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsalesordermasterservice.deleteerpsalesordermaster(sodetailid).then(res=>
this.erpsalesorderdetailsLoadTable()
);
}
}
erpsalesorderdetailsPaging(val)
{
debugger;
this.erpsalesorderdetailssource.setPaging(1, val, true);
}

handleerpsalesorderdetailsGridSelected(event:any) {
this.erpsalesorderdetailsselectedindex=this.erpsalesordermasterservice.erpsalesorderdetails.findIndex(i => i.sodetailid === event.data.sodetailid);
}
IserpsalesorderdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsalesorderdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsalesorderdetails
//start of Grid Codes erpsalesorderpaymentterms
erpsalesorderpaymenttermssettings:any;
erpsalesorderpaymenttermssource: any;

showerpsalesorderpaymenttermsCheckbox()
{
debugger;
if(this.tblerpsalesorderpaymenttermssource.settings['selectMode']== 'multi')this.tblerpsalesorderpaymenttermssource.settings['selectMode']= 'single';
else
this.tblerpsalesorderpaymenttermssource.settings['selectMode']= 'multi';
this.tblerpsalesorderpaymenttermssource.initGrid();
}
deleteerpsalesorderpaymenttermsAll()
{
this.tblerpsalesorderpaymenttermssource.settings['selectMode'] = 'single';
}
showerpsalesorderpaymenttermsFilter()
{
  setTimeout(() => {
  this.SeterpsalesorderpaymenttermsTableddConfig();
  });
      if(this.tblerpsalesorderpaymenttermssource.settings!=null)this.tblerpsalesorderpaymenttermssource.settings['hideSubHeader'] =!this.tblerpsalesorderpaymenttermssource.settings['hideSubHeader'];
this.tblerpsalesorderpaymenttermssource.initGrid();
}
showerpsalesorderpaymenttermsInActive()
{
}
enableerpsalesorderpaymenttermsInActive()
{
}
async SeterpsalesorderpaymenttermsTableddConfig()
{
if(!this.bfilterPopulateerpsalesorderpaymentterms){

this.erpsalesordermasterservice.geterpsalesordermastersList().then(res=>
{
var datasoid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsalesorderpaymenttermssoid3.push(defaultobj);
for(let i=0; i<datasoid2.length; i++){
var obj= { value: datasoid2[i].soid, title:datasoid2[i].sonumber};
this.dataerpsalesorderpaymenttermssoid3.push(obj);
}
if((this.tblerpsalesorderpaymenttermssource.settings as any).columns['soid'])
{
(this.tblerpsalesorderpaymenttermssource.settings as any).columns['soid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsalesorderpaymenttermssoid3));
this.tblerpsalesorderpaymenttermssource.initGrid();
}
});
}
this.bfilterPopulateerpsalesorderpaymentterms=true;
}
async erpsalesorderpaymenttermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsalesorderpaymenttermsTableConfig()
{
this.erpsalesorderpaymenttermssettings = {
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
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
customerid: {
title: 'Customer',
type: 'number',
filter:true,
},
paymenttermtype: {
title: 'Payment Term Type',
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
currency: {
title: 'Currency',
type: '',
filter:true,
},
amount: {
title: 'Amount',
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
arid: {
title: 'A R',
type: 'number',
filter:true,
},
},
};
}
erpsalesorderpaymenttermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsalesorderpaymenttermsID)>=0)
{
this.erpsalesorderpaymenttermssource=new LocalDataSource();
this.erpsalesorderpaymenttermssource.load(this.erpsalesordermasterservice.erpsalesorderpaymentterms as  any as LocalDataSource);
this.erpsalesorderpaymenttermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsalesorderpaymenttermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsalesordermasterservice.erpsalesorderpaymentterms.length == 0)
{
    this.tblerpsalesorderpaymenttermssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsalesorderpaymentterm();
    this.erpsalesordermasterservice.erpsalesorderpaymentterms.push(obj);
    this.erpsalesorderpaymenttermssource.refresh();
    if ((this.erpsalesordermasterservice.erpsalesorderpaymentterms.length / this.erpsalesorderpaymenttermssource.getPaging().perPage).toFixed(0) + 1 != this.erpsalesorderpaymenttermssource.getPaging().page)
    {
        this.erpsalesorderpaymenttermssource.setPage((this.erpsalesordermasterservice.erpsalesorderpaymentterms.length / this.erpsalesorderpaymenttermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsalesorderpaymenttermssource.grid.edit(this.tblerpsalesorderpaymenttermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsalesorderpaymenttermssource.data.indexOf(event.data);
this.onDeleteerpsalesorderpaymentterm(event,event.data.paytermid,((this.erpsalesorderpaymenttermssource.getPaging().page-1) *this.erpsalesorderpaymenttermssource.getPaging().perPage)+index);
this.erpsalesorderpaymenttermssource.refresh();
break;
}
}

*/
erpsalesorderpaymenttermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsalesorderpaymentterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsalesorderpaymentterm(event,event.data.paytermid,this.formid);
break;
case 'delete':
this.onDeleteerpsalesorderpaymentterm(event,event.data.paytermid,((this.erpsalesorderpaymenttermssource.getPaging().page-1) *this.erpsalesorderpaymenttermssource.getPaging().perPage)+event.index);
this.erpsalesorderpaymenttermssource.refresh();
break;
}
}
erpsalesorderpaymenttermsonDelete(obj) {
let paytermid=obj.data.paytermid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsalesordermasterservice.deleteerpsalesordermaster(paytermid).then(res=>
this.erpsalesorderpaymenttermsLoadTable()
);
}
}
erpsalesorderpaymenttermsPaging(val)
{
debugger;
this.erpsalesorderpaymenttermssource.setPaging(1, val, true);
}

handleerpsalesorderpaymenttermsGridSelected(event:any) {
this.erpsalesorderpaymenttermsselectedindex=this.erpsalesordermasterservice.erpsalesorderpaymentterms.findIndex(i => i.paytermid === event.data.paytermid);
}
IserpsalesorderpaymenttermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsalesorderpaymenttermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsalesorderpaymentterms

}



