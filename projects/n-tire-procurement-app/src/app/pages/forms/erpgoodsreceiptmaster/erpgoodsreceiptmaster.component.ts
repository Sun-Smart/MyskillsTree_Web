import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
import { erpgoodsreceiptmaster } from './../../../model/erpgoodsreceiptmaster.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erplocationmaster} from './../../../model/erplocationmaster.model';
import { erplocationmasterComponent } from './../../../pages/forms/erplocationmaster/erplocationmaster.component';
import { erplocationmasterService } from './../../../service/erplocationmaster.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
//detail table services
import { erpgoodsreceiptdetail } from './../../../model/erpgoodsreceiptdetail.model';
import { erpgoodsreceiptdetailComponent } from './../../../pages/forms/erpgoodsreceiptdetail/erpgoodsreceiptdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { bolocation,IbolocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bolocation.model';
import { bolocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bolocation/bolocation.component';
import { bolocationService } from '../../../../../../n-tire-bo-app/src/app/service/bolocation.service';
import { erpsupplierinvoice,IerpsupplierinvoiceResponse } from './../../../model/erpsupplierinvoice.model';
import { erpsupplierinvoiceComponent } from './../../../pages/forms/erpsupplierinvoice/erpsupplierinvoice.component';
import { erpsupplierinvoiceService } from './../../../service/erpsupplierinvoice.service';
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
selector: 'app-erpgoodsreceiptmaster',
templateUrl: './erpgoodsreceiptmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpgoodsreceiptmasterComponent implements OnInit {
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
bfilterPopulateerpgoodsreceiptmasters:boolean=false;
dataerpgoodsreceiptmastersbranchid3:any=[];
dataerpgoodsreceiptmasterssupplierid3:any=[];
dataerpgoodsreceiptmastersgrnid3:any=[];
dataerpgoodsreceiptmastersgrntype3:any=[];
dataerpgoodsreceiptmastersponumber3:any=[];
dataerpgoodsreceiptmastersreceivedby3:any=[];
dataerpgoodsreceiptmasterswarehouseid3:any=[];
dataerpgoodsreceiptmastersaccountid3:any=[];
dataerpgoodsreceiptdetailsitemid3:any=[];
dataerpgoodsreceiptdetailsgrnid3:any=[];
dataerpgoodsreceiptdetailsuom3:any=[];
dataerpgoodsreceiptdetailsstoragelocationid3:any=[];
dataerpgoodsreceiptdetailssupplierinvoiceid3:any=[];
bfilterPopulateerpgoodsreceiptdetails:boolean=false;
@ViewChild('tblerpgoodsreceiptdetailssource',{static:false}) tblerpgoodsreceiptdetailssource: Ng2SmartTableComponent;
 erpgoodsreceiptmasterForm: FormGroup;
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
grnidList: erpgoodsreceiptmaster[];
grnidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnid_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnid_erpgoodsreceiptmastersoptions:any;//autocomplete
grnid_erpgoodsreceiptmastersformatter:any;//autocomplete
grntypeList: boconfigvalue[];
ponumberList: erppurchaseordermaster[];
ponumberoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
ponumber_erppurchaseordermastersForm: FormGroup;//autocomplete
ponumber_erppurchaseordermastersoptions:any;//autocomplete
ponumber_erppurchaseordermastersformatter:any;//autocomplete
receivedbyList: bousermaster[];
receivedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
receivedby_bousermastersForm: FormGroup;//autocomplete
receivedby_bousermastersoptions:any;//autocomplete
receivedby_bousermastersformatter:any;//autocomplete
warehouseidList: erplocationmaster[];
warehouseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
warehouseid_erplocationmastersForm: FormGroup;//autocomplete
warehouseid_erplocationmastersoptions:any;//autocomplete
warehouseid_erplocationmastersformatter:any;//autocomplete
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
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
erpgoodsreceiptmastershowOption:boolean;
erpgoodsreceiptdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpgoodsreceiptdetailsvisiblelist:any;
erpgoodsreceiptdetailshidelist:any;

DeletederpgoodsreceiptdetailIDs: string="";
erpgoodsreceiptdetailsID: string = "1";
erpgoodsreceiptdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpgoodsreceiptmasterservice: erpgoodsreceiptmasterService,
private bousermasterservice: bousermasterService,
private erpitemmasterservice: erpitemmasterService,
private bolocationservice: bolocationService,
private erpsupplierinvoiceservice: erpsupplierinvoiceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erplocationmasterservice:erplocationmasterService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
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
this.erpgoodsreceiptmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
grnid: [null],
grniddesc: [null],
grnnumber: [null],
grndate: [null],
grntype: [null],
grntypedesc: [null],
grntypereference: [null],
dcnumber: [null],
dcdate: [null],
ponumber: [null],
ponumberdesc: [null],
poversionno: [null],
supplieraddress: [null],
suppliercontactperson: [null],
supplierbillingaddress: [null],
receivedby: [null],
receivedbydesc: [null],
assignedto: [null],
transportername: [null],
vehicledetails: [null],
shipmentdetails: [null],
packinglistno: [null],
freightcontainer: [null],
containers: [null],
airbill: [null],
billoflading: [null],
warehouseid: [null],
warehouseiddesc: [null],
accountid: [null],
accountiddesc: [null],
totalvalue: [null],
taxamount: [null],
charges: [null],
deductedtaxamount: [null],
nettaxamount: [null],
additionaldiscountpercentage: [null],
additionaldiscountamount: [null],
netamount: [null],
currency: [null],
customfield: [null],
attachment: [null],
grnremarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpgoodsreceiptmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpgoodsreceiptmasterForm.dirty && this.erpgoodsreceiptmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.grnid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.grnid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.grnid && pkDetail) {
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
let erpgoodsreceiptmasterid = null;

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
this.formid=erpgoodsreceiptmasterid;
//this.sharedService.alert(erpgoodsreceiptmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpgoodsreceiptdetailsTableConfig();
  setTimeout(() => {
  this.SeterpgoodsreceiptdetailsTableddConfig();
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
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpgoodsreceiptmasterForm.patchValue({
    branchid: this.erpgoodsreceiptmasterservice.formData.branchid,
    branchiddesc: this.erpgoodsreceiptmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpgoodsreceiptmasterForm.get('branchid').value);
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
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpgoodsreceiptmasterForm.patchValue({
    supplierid: this.erpgoodsreceiptmasterservice.formData.supplierid,
    supplieriddesc: this.erpgoodsreceiptmasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpgoodsreceiptmasterForm.get('supplierid').value);
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
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => 
{
this.grnidList = res as erpgoodsreceiptmaster[];
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.grnid){
this.grnidoptionsEvent.emit(this.grnidList);
this.erpgoodsreceiptmasterForm.patchValue({
    grnid: this.erpgoodsreceiptmasterservice.formData.grnid,
    grniddesc: this.erpgoodsreceiptmasterservice.formData.grniddesc,
});
}
{
let arrgrnid = this.grnidList.filter(v => v.grnid == this.erpgoodsreceiptmasterForm.get('grnid').value);
let objgrnid;
if (arrgrnid.length > 0) objgrnid = arrgrnid[0];
if (objgrnid)
{
}
}
}
).catch((err) => {console.log(err);});
this.grnid_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnidList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnid_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;
this.configservice.getList("grntype").then(res => this.grntypeList = res as boconfigvalue[]);
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.ponumberList = res as erppurchaseordermaster[];
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.ponumber){
this.ponumberoptionsEvent.emit(this.ponumberList);
this.erpgoodsreceiptmasterForm.patchValue({
    ponumber: this.erpgoodsreceiptmasterservice.formData.ponumber,
    ponumberdesc: this.erpgoodsreceiptmasterservice.formData.ponumberdesc,
});
}
{
let arrponumber = this.ponumberList.filter(v => v.poid == this.erpgoodsreceiptmasterForm.get('ponumber').value);
let objponumber;
if (arrponumber.length > 0) objponumber = arrponumber[0];
if (objponumber)
{
}
}
}
).catch((err) => {console.log(err);});
this.ponumber_erppurchaseordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ponumberList.filter(v => v.ponumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.ponumber_erppurchaseordermastersformatter = (result: any) => result.ponumber;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.receivedbyList = res as bousermaster[];
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.receivedby){
this.receivedbyoptionsEvent.emit(this.receivedbyList);
this.erpgoodsreceiptmasterForm.patchValue({
    receivedby: this.erpgoodsreceiptmasterservice.formData.receivedby,
    receivedbydesc: this.erpgoodsreceiptmasterservice.formData.receivedbydesc,
});
}
{
let arrreceivedby = this.receivedbyList.filter(v => v.userid == this.erpgoodsreceiptmasterForm.get('receivedby').value);
let objreceivedby;
if (arrreceivedby.length > 0) objreceivedby = arrreceivedby[0];
if (objreceivedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.receivedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.receivedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.receivedby_bousermastersformatter = (result: any) => result.username;
this.erplocationmasterservice.geterplocationmastersList().then(res => 
{
this.warehouseidList = res as erplocationmaster[];
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.warehouseid){
this.warehouseidoptionsEvent.emit(this.warehouseidList);
this.erpgoodsreceiptmasterForm.patchValue({
    warehouseid: this.erpgoodsreceiptmasterservice.formData.warehouseid,
    warehouseiddesc: this.erpgoodsreceiptmasterservice.formData.warehouseiddesc,
});
}
{
let arrwarehouseid = this.warehouseidList.filter(v => v.locationid == this.erpgoodsreceiptmasterForm.get('warehouseid').value);
let objwarehouseid;
if (arrwarehouseid.length > 0) objwarehouseid = arrwarehouseid[0];
if (objwarehouseid)
{
}
}
}
).catch((err) => {console.log(err);});
this.warehouseid_erplocationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.warehouseidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.warehouseid_erplocationmastersformatter = (result: any) => result.locationname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpgoodsreceiptmasterservice.formData && this.erpgoodsreceiptmasterservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpgoodsreceiptmasterForm.patchValue({
    accountid: this.erpgoodsreceiptmasterservice.formData.accountid,
    accountiddesc: this.erpgoodsreceiptmasterservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpgoodsreceiptmasterForm.get('accountid').value);
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

//autocomplete
    this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => {
      this.pkList = res as erpgoodsreceiptmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.grnnumber;

//setting the flag that the screen is not touched 
this.erpgoodsreceiptmasterForm.markAsUntouched();
this.erpgoodsreceiptmasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedgrnid(grnidDetail: any) {
if (grnidDetail.grnid && grnidDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
grnid: grnidDetail.grnid,
grniddesc: grnidDetail.grnnumber,

});

}
}

onSelectedponumber(ponumberDetail: any) {
if (ponumberDetail.poid && ponumberDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
ponumber: ponumberDetail.poid,
ponumberdesc: ponumberDetail.ponumber,

});

}
}

onSelectedreceivedby(receivedbyDetail: any) {
if (receivedbyDetail.userid && receivedbyDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
receivedby: receivedbyDetail.userid,
receivedbydesc: receivedbyDetail.username,

});

}
}

onSelectedwarehouseid(warehouseidDetail: any) {
if (warehouseidDetail.locationid && warehouseidDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
warehouseid: warehouseidDetail.locationid,
warehouseiddesc: warehouseidDetail.locationname,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpgoodsreceiptmasterForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}




resetForm() {
if (this.erpgoodsreceiptmasterForm != null)
this.erpgoodsreceiptmasterForm.reset();
this.erpgoodsreceiptmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
receivedby: this.sessiondata.userid,
receivedbydesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails=[];
this.erpgoodsreceiptdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let grnid = this.erpgoodsreceiptmasterForm.get('grnid').value;
        if(grnid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpgoodsreceiptmasterservice.deleteerpgoodsreceiptmaster(grnid).then(res =>
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
    this.erpgoodsreceiptmasterForm.patchValue({
        grnid: null
    });
    if(this.erpgoodsreceiptmasterservice.formData.grnid!=null)this.erpgoodsreceiptmasterservice.formData.grnid=null;
for (let i=0;i<this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.length;i++) {
this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails[i].grndetailsid=null;
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
        else if(key=="grndate")
this.erpgoodsreceiptmasterForm.patchValue({"grndate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dcdate")
this.erpgoodsreceiptmasterForm.patchValue({"dcdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.erpgoodsreceiptmasterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.erpgoodsreceiptmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpgoodsreceiptmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpgoodsreceiptmasterForm.controls[key]!=undefined)
{
this.erpgoodsreceiptmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpgoodsreceiptmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erpgoodsreceiptmasterservice.formData.grnnumber!=null )
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
supplieridonChange(evt:any){
let e=evt.value;
}
grnidonChange(evt:any){
let e=evt.value;
}
grnnumberonChange(evt:any){
let e=evt.value;
}
grndateonChange(evt:any){
let e=evt.value;
}
grntypeonChange(evt:any){
let e=this.f.grntype.value as any;
this.erpgoodsreceiptmasterForm.patchValue({grntypedesc:evt.options[evt.options.selectedIndex].text});
}
grntypereferenceonChange(evt:any){
let e=evt.value;
}
dcnumberonChange(evt:any){
let e=evt.value;
}
dcdateonChange(evt:any){
let e=evt.value;
}
ponumberonChange(evt:any){
let e=evt.value;
}
poversionnoonChange(evt:any){
let e=evt.value;
}
supplieraddressonChange(evt:any){
let e=evt.value;
}
suppliercontactpersononChange(evt:any){
let e=evt.value;
}
supplierbillingaddressonChange(evt:any){
let e=evt.value;
}
receivedbyonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignedto=res;
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}).catch((err) => {console.log(err);});
}
transporternameonChange(evt:any){
let e=evt.value;
}
vehicledetailsonChange(evt:any){
let e=evt.value;
}
shipmentdetailsonChange(evt:any){
let e=evt.value;
}
packinglistnoonChange(evt:any){
let e=evt.value;
}
freightcontaineronChange(evt:any){
let e=evt.value;
}
containersonChange(evt:any){
let e=evt.value;
}
airbillonChange(evt:any){
let e=evt.value;
}
billofladingonChange(evt:any){
let e=evt.value;
}
warehouseidonChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
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
netamountonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
grnremarksonChange(evt:any){
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
  


editerpgoodsreceiptmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersByEID(pkcol).then(res => {

this.erpgoodsreceiptmasterservice.formData=res.erpgoodsreceiptmaster;
let formproperty=res.erpgoodsreceiptmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpgoodsreceiptmaster.pkcol;
this.formid=res.erpgoodsreceiptmaster.grnid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpgoodsreceiptmaster.grnid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpgoodsreceiptmasterForm.patchValue({
branchid: res.erpgoodsreceiptmaster.branchid,
branchiddesc: res.erpgoodsreceiptmaster.branchiddesc,
supplierid: res.erpgoodsreceiptmaster.supplierid,
supplieriddesc: res.erpgoodsreceiptmaster.supplieriddesc,
grnid: res.erpgoodsreceiptmaster.grnid,
grniddesc: res.erpgoodsreceiptmaster.grniddesc,
grnnumber: res.erpgoodsreceiptmaster.grnnumber,
grndate: this.ngbDateParserFormatter.parse(res.erpgoodsreceiptmaster.grndate),
grntype: res.erpgoodsreceiptmaster.grntype,
grntypedesc: res.erpgoodsreceiptmaster.grntypedesc,
grntypereference: res.erpgoodsreceiptmaster.grntypereference,
dcnumber: res.erpgoodsreceiptmaster.dcnumber,
dcdate: this.ngbDateParserFormatter.parse(res.erpgoodsreceiptmaster.dcdate),
ponumber: res.erpgoodsreceiptmaster.ponumber,
ponumberdesc: res.erpgoodsreceiptmaster.ponumberdesc,
poversionno: res.erpgoodsreceiptmaster.poversionno,
supplieraddress: res.erpgoodsreceiptmaster.supplieraddress,
suppliercontactperson: res.erpgoodsreceiptmaster.suppliercontactperson,
supplierbillingaddress: res.erpgoodsreceiptmaster.supplierbillingaddress,
receivedby: res.erpgoodsreceiptmaster.receivedby,
receivedbydesc: res.erpgoodsreceiptmaster.receivedbydesc,
assignedto: JSON.parse(res.erpgoodsreceiptmaster.assignedto),
transportername: res.erpgoodsreceiptmaster.transportername,
vehicledetails: res.erpgoodsreceiptmaster.vehicledetails,
shipmentdetails: res.erpgoodsreceiptmaster.shipmentdetails,
packinglistno: res.erpgoodsreceiptmaster.packinglistno,
freightcontainer: res.erpgoodsreceiptmaster.freightcontainer,
containers: res.erpgoodsreceiptmaster.containers,
airbill: res.erpgoodsreceiptmaster.airbill,
billoflading: res.erpgoodsreceiptmaster.billoflading,
warehouseid: res.erpgoodsreceiptmaster.warehouseid,
warehouseiddesc: res.erpgoodsreceiptmaster.warehouseiddesc,
accountid: res.erpgoodsreceiptmaster.accountid,
accountiddesc: res.erpgoodsreceiptmaster.accountiddesc,
totalvalue: res.erpgoodsreceiptmaster.totalvalue,
taxamount: res.erpgoodsreceiptmaster.taxamount,
charges: res.erpgoodsreceiptmaster.charges,
deductedtaxamount: res.erpgoodsreceiptmaster.deductedtaxamount,
nettaxamount: res.erpgoodsreceiptmaster.nettaxamount,
additionaldiscountpercentage: res.erpgoodsreceiptmaster.additionaldiscountpercentage,
additionaldiscountamount: res.erpgoodsreceiptmaster.additionaldiscountamount,
netamount: res.erpgoodsreceiptmaster.netamount,
currency: res.erpgoodsreceiptmaster.currency,
customfield: res.erpgoodsreceiptmaster.customfield,
attachment: JSON.parse(res.erpgoodsreceiptmaster.attachment),
grnremarks: res.erpgoodsreceiptmaster.grnremarks,
status: res.erpgoodsreceiptmaster.status,
statusdesc: res.erpgoodsreceiptmaster.statusdesc,
});
this.erpgoodsreceiptdetailsvisiblelist=res.erpgoodsreceiptdetailsvisiblelist;
if(this.erpgoodsreceiptmasterForm.get('customfield').value!=null && this.erpgoodsreceiptmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpgoodsreceiptmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpgoodsreceiptmasterForm.get('attachment').value!=null && this.erpgoodsreceiptmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpgoodsreceiptmasterForm.get('attachment').value);
//Child Tables if any
this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails = res.erpgoodsreceiptdetails;
this.SeterpgoodsreceiptdetailsTableConfig();
this.erpgoodsreceiptdetailsLoadTable();
  setTimeout(() => {
  this.SeterpgoodsreceiptdetailsTableddConfig();
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
  for (let key in this.erpgoodsreceiptmasterForm.controls) {
    if (this.erpgoodsreceiptmasterForm.controls[key] != null) {
if(false)
{
if(this.erpgoodsreceiptmasterservice.formData!=null && this.erpgoodsreceiptmasterservice.formData[key]!=null  && this.erpgoodsreceiptmasterservice.formData[key]!='[]' && this.erpgoodsreceiptmasterservice.formData[key]!=undefined && this.erpgoodsreceiptmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpgoodsreceiptmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpgoodsreceiptmasterservice.formData!=null && this.erpgoodsreceiptmasterservice.formData[key]!=null   && this.erpgoodsreceiptmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpgoodsreceiptmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpgoodsreceiptmasterservice.formData!=null && this.erpgoodsreceiptmasterservice.formData[key]!=null   && this.erpgoodsreceiptmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpgoodsreceiptmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpgoodsreceiptmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpgoodsreceiptmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpgoodsreceiptmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpgoodsreceiptmasterForm.value;
obj.grndate=new Date(this.erpgoodsreceiptmasterForm.get('grndate').value ? this.ngbDateParserFormatter.format(this.erpgoodsreceiptmasterForm.get('grndate').value)+'  UTC' :null);
obj.dcdate=new Date(this.erpgoodsreceiptmasterForm.get('dcdate').value ? this.ngbDateParserFormatter.format(this.erpgoodsreceiptmasterForm.get('dcdate').value)+'  UTC' :null);
if(this.erpgoodsreceiptmasterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.erpgoodsreceiptmasterForm.get('assignedto').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private erpgoodsreceiptmastertoggleOption(){
this.erpgoodsreceiptmastershowOption = this.erpgoodsreceiptmastershowOption === true ? false : true;
}

private erpgoodsreceiptdetailtoggleOption(){
this.erpgoodsreceiptdetailshowOption = this.erpgoodsreceiptdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpgoodsreceiptmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpgoodsreceiptmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpgoodsreceiptmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpgoodsreceiptmasterservice.formData=this.erpgoodsreceiptmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpgoodsreceiptmasterForm.controls[key] != null)
    {
        this.erpgoodsreceiptmasterservice.formData[key] = this.erpgoodsreceiptmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpgoodsreceiptmasterservice.formData.grndate=new Date(this.erpgoodsreceiptmasterForm.get('grndate').value ? this.ngbDateParserFormatter.format(this.erpgoodsreceiptmasterForm.get('grndate').value)+'  UTC' :null);
this.erpgoodsreceiptmasterservice.formData.dcdate=new Date(this.erpgoodsreceiptmasterForm.get('dcdate').value ? this.ngbDateParserFormatter.format(this.erpgoodsreceiptmasterForm.get('dcdate').value)+'  UTC' :null);
if(this.erpgoodsreceiptmasterForm.get('assignedto').value!=null)this.erpgoodsreceiptmasterservice.formData.assignedto=JSON.stringify(this.erpgoodsreceiptmasterForm.get('assignedto').value);
if(customfields!=null)this.erpgoodsreceiptmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpgoodsreceiptmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpgoodsreceiptmasterservice.formData.DeletederpgoodsreceiptdetailIDs = this.DeletederpgoodsreceiptdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpgoodsreceiptmasterservice.formData);
this.erpgoodsreceiptmasterservice.formData=this.erpgoodsreceiptmasterForm.value;
this.erpgoodsreceiptmasterservice.saveOrUpdateerpgoodsreceiptmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpgoodsreceiptdetailssource.data)
{
    for (let i = 0; i < this.erpgoodsreceiptdetailssource.data.length; i++)
    {
        if (this.erpgoodsreceiptdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpgoodsreceiptdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpgoodsreceiptmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpgoodsreceiptmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpgoodsreceiptmaster);
}
else
{
this.FillData(res);
}
}
this.erpgoodsreceiptmasterForm.markAsUntouched();
this.erpgoodsreceiptmasterForm.markAsPristine();
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
data: {branchid:this.erpgoodsreceiptmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpgoodsreceiptmasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditgrnid( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.erpgoodsreceiptmasterForm.get('grnid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditponumber( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erpgoodsreceiptmasterForm.get('ponumber').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreceivedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpgoodsreceiptmasterForm.get('receivedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditwarehouseid( locationid) {
/*let ScreenType='2';
this.dialog.open(erplocationmasterComponent, 
{
data: {locationid:this.erpgoodsreceiptmasterForm.get('warehouseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpgoodsreceiptmasterForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpgoodsreceiptdetail(event:any,grndetailsid:any, grnid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpgoodsreceiptdetailComponent, 
{
data:  {  showview:false,save:false,event,grndetailsid, grnid,visiblelist:this.erpgoodsreceiptdetailsvisiblelist,  hidelist:this.erpgoodsreceiptdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpgoodsreceiptdetailssource.add(res);
this.erpgoodsreceiptdetailssource.refresh();
}
else
{
this.erpgoodsreceiptdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpgoodsreceiptdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpgoodsreceiptdetailIDs += childID + ",";
this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpgoodsreceiptdetails
erpgoodsreceiptdetailssettings:any;
erpgoodsreceiptdetailssource: any;

showerpgoodsreceiptdetailsCheckbox()
{
debugger;
if(this.tblerpgoodsreceiptdetailssource.settings['selectMode']== 'multi')this.tblerpgoodsreceiptdetailssource.settings['selectMode']= 'single';
else
this.tblerpgoodsreceiptdetailssource.settings['selectMode']= 'multi';
this.tblerpgoodsreceiptdetailssource.initGrid();
}
deleteerpgoodsreceiptdetailsAll()
{
this.tblerpgoodsreceiptdetailssource.settings['selectMode'] = 'single';
}
showerpgoodsreceiptdetailsFilter()
{
  setTimeout(() => {
  this.SeterpgoodsreceiptdetailsTableddConfig();
  });
      if(this.tblerpgoodsreceiptdetailssource.settings!=null)this.tblerpgoodsreceiptdetailssource.settings['hideSubHeader'] =!this.tblerpgoodsreceiptdetailssource.settings['hideSubHeader'];
this.tblerpgoodsreceiptdetailssource.initGrid();
}
showerpgoodsreceiptdetailsInActive()
{
}
enableerpgoodsreceiptdetailsInActive()
{
}
async SeterpgoodsreceiptdetailsTableddConfig()
{
if(!this.bfilterPopulateerpgoodsreceiptdetails){
}
this.bfilterPopulateerpgoodsreceiptdetails=true;
}
async erpgoodsreceiptdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpgoodsreceiptdetailsTableConfig()
{
this.erpgoodsreceiptdetailssettings = {
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
branchid: {
title: 'Branch',
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
popendingqty: {
title: 'P O Pending Qty',
type: '',
filter:true,
},
deliveredqty: {
title: 'Delivered Qty',
type: '',
filter:true,
},
storagelocationid: {
title: 'Storage Location',
type: 'number',
filter:true,
},
storagedetails: {
title: 'Storage Details',
type: '',
filter:true,
},
rejectedqty: {
title: 'Rejected Qty',
type: '',
filter:true,
},
acceptedqty: {
title: 'Accepted Qty',
type: 'number',
filter:true,
},
invoicedqty: {
title: 'Invoiced Qty',
type: 'number',
filter:true,
},
invoicedamount: {
title: 'Invoiced Amount',
type: 'number',
filter:true,
},
supplierinvoiceid: {
title: 'Supplier Invoice',
type: 'number',
filter:true,
},
supplierinvoiceqty: {
title: 'Supplier Invoice Qty',
type: 'number',
filter:true,
},
supplierinvoiceamount: {
title: 'Supplier Invoice Amount',
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
erpgoodsreceiptdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpgoodsreceiptdetailsID)>=0)
{
this.erpgoodsreceiptdetailssource=new LocalDataSource();
this.erpgoodsreceiptdetailssource.load(this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails as  any as LocalDataSource);
this.erpgoodsreceiptdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpgoodsreceiptdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.length == 0)
{
    this.tblerpgoodsreceiptdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpgoodsreceiptdetail();
    this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.push(obj);
    this.erpgoodsreceiptdetailssource.refresh();
    if ((this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.length / this.erpgoodsreceiptdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpgoodsreceiptdetailssource.getPaging().page)
    {
        this.erpgoodsreceiptdetailssource.setPage((this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.length / this.erpgoodsreceiptdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpgoodsreceiptdetailssource.grid.edit(this.tblerpgoodsreceiptdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpgoodsreceiptdetailssource.data.indexOf(event.data);
this.onDeleteerpgoodsreceiptdetail(event,event.data.grndetailsid,((this.erpgoodsreceiptdetailssource.getPaging().page-1) *this.erpgoodsreceiptdetailssource.getPaging().perPage)+index);
this.erpgoodsreceiptdetailssource.refresh();
break;
}
}

*/
erpgoodsreceiptdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpgoodsreceiptdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpgoodsreceiptdetail(event,event.data.grndetailsid,this.formid);
break;
case 'delete':
this.onDeleteerpgoodsreceiptdetail(event,event.data.grndetailsid,((this.erpgoodsreceiptdetailssource.getPaging().page-1) *this.erpgoodsreceiptdetailssource.getPaging().perPage)+event.index);
this.erpgoodsreceiptdetailssource.refresh();
break;
}
}
erpgoodsreceiptdetailsonDelete(obj) {
let grndetailsid=obj.data.grndetailsid;
if (confirm('Are you sure to delete this record ?')) {
this.erpgoodsreceiptmasterservice.deleteerpgoodsreceiptmaster(grndetailsid).then(res=>
this.erpgoodsreceiptdetailsLoadTable()
);
}
}
erpgoodsreceiptdetailsPaging(val)
{
debugger;
this.erpgoodsreceiptdetailssource.setPaging(1, val, true);
}

handleerpgoodsreceiptdetailsGridSelected(event:any) {
this.erpgoodsreceiptdetailsselectedindex=this.erpgoodsreceiptmasterservice.erpgoodsreceiptdetails.findIndex(i => i.grndetailsid === event.data.grndetailsid);
}
IserpgoodsreceiptdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpgoodsreceiptdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpgoodsreceiptdetails

}



