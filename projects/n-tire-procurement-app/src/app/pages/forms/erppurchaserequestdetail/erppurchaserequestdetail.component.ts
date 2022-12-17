import { erppurchaserequestdetailService } from './../../../service/erppurchaserequestdetail.service';
import { erppurchaserequestdetail } from './../../../model/erppurchaserequestdetail.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
import { erprfqmaster} from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//FK field services
import { erppurchaserequest} from './../../../model/erppurchaserequest.model';
import { erppurchaserequestComponent } from './../../../pages/forms/erppurchaserequest/erppurchaserequest.component';
import { erppurchaserequestService } from './../../../service/erppurchaserequest.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-erppurchaserequestdetail',
templateUrl: './erppurchaserequestdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchaserequestdetailComponent implements OnInit {
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
bfilterPopulateerppurchaserequestdetails:boolean=false;
dataerppurchaserequestdetailsprsid3:any=[];
dataerppurchaserequestdetailsitemcategory3:any=[];
dataerppurchaserequestdetailsitemsubcategory3:any=[];
dataerppurchaserequestdetailsitemid3:any=[];
dataerppurchaserequestdetailsuom3:any=[];
dataerppurchaserequestdetailscurrencyid3:any=[];
dataerppurchaserequestdetailsrfqid3:any=[];
dataerppurchaserequestdetailspoid3:any=[];
dataerppurchaserequestdetailssupplierid3:any=[];
dataerppurchaserequestdetailsaccountid3:any=[];
dataerppurchaserequestdetailsapprovalstatus3:any=[];
dataerppurchaserequestdetailsapprovedby3:any=[];
 erppurchaserequestdetailForm: FormGroup;
prsidList: erppurchaserequest[];
prsidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
prsid_erppurchaserequestsForm: FormGroup;//autocomplete
prsid_erppurchaserequestsoptions:any;//autocomplete
prsid_erppurchaserequestsformatter:any;//autocomplete
itemcategoryList: bomasterdata[];
itemsubcategoryList: bosubcategorymaster[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyidList: boconfigvalue[];
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
approvalstatusList: boconfigvalue[];
approvedbyList: bousermaster[];
approvedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvedby_bousermastersForm: FormGroup;//autocomplete
approvedby_bousermastersoptions:any;//autocomplete
approvedby_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erppurchaserequestdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;

budgetdetailsvisible:boolean = false;
costdetailsvisible:boolean = false;
deliverydetailsvisible:boolean = false;





constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erppurchaserequestdetailservice: erppurchaserequestdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erppurchaserequestservice:erppurchaserequestService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private erpitemmasterservice:erpitemmasterService,
private erprfqmasterservice:erprfqmasterService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
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
this.erppurchaserequestdetailForm  = this.fb.group({
pk:[null],
prsid: [null],
prsiddesc: [null],
prsdetailid: [null],
itemcategory: [null],
itemcategorydesc: [null],
itemsubcategory: [null],
itemsubcategorydesc: [null],
itemid: [null, Validators.required],
itemiddesc: [null],
itemdescription: [null],
details: [null],
uom: [null],
uomdesc: [null],
quantity: [null, Validators.required],
requiredbefore: [null, Validators.required],
prsremarks: [null],
currencyid: [null],
currencyiddesc: [null],
cost: [null],
totalcost: [null],
tax1: [null],
tax2: [null],
othercharges: [null],
netamount: [null],
budget: [null],
used: [null],
available: [null],
rfqid: [null],
rfqiddesc: [null],
poid: [null],
poiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
accountid: [null],
accountiddesc: [null],
approvalstatus: [null],
approvalstatusdesc: [null],
approvedby: [null],
approvedbydesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erppurchaserequestdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchaserequestdetailForm.dirty && this.erppurchaserequestdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.prsdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.prsdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.prsdetailid && pkDetail) {
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
let erppurchaserequestdetailid = null;

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
this.formid=erppurchaserequestdetailid;
//this.sharedService.alert(erppurchaserequestdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erppurchaserequestservice.geterppurchaserequestsList().then(res => 
{
this.prsidList = res as erppurchaserequest[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.prsid){
this.prsidoptionsEvent.emit(this.prsidList);
this.erppurchaserequestdetailForm.patchValue({
    prsid: this.erppurchaserequestdetailservice.formData.prsid,
    prsiddesc: this.erppurchaserequestdetailservice.formData.prsiddesc,
});
}
{
let arrprsid = this.prsidList.filter(v => v.prsid == this.erppurchaserequestdetailForm.get('prsid').value);
let objprsid;
if (arrprsid.length > 0) objprsid = arrprsid[0];
if (objprsid)
{
}
}
}
).catch((err) => {console.log(err);});
this.prsid_erppurchaserequestsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.prsidList.filter(v => v.prscode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.prsid_erppurchaserequestsformatter = (result: any) => result.prscode;
this.bomasterdataservice.getList("rs8fd").then(res => {
this.itemcategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res =>{
this.itemsubcategoryList = res as bosubcategorymaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.itemsubcategory){this.erppurchaserequestdetailForm.patchValue({
    itemsubcategory: this.erppurchaserequestdetailservice.formData.itemsubcategory,
    itemsubcategorydesc: this.erppurchaserequestdetailservice.formData.itemsubcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res =>{
this.itemidList = res as erpitemmaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.itemid){this.erppurchaserequestdetailForm.patchValue({
    itemid: this.erppurchaserequestdetailservice.formData.itemid,
    itemiddesc: this.erppurchaserequestdetailservice.formData.itemiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currencyid").then(res => this.currencyidList = res as boconfigvalue[]);
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erppurchaserequestdetailForm.patchValue({
    rfqid: this.erppurchaserequestdetailservice.formData.rfqid,
    rfqiddesc: this.erppurchaserequestdetailservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erppurchaserequestdetailForm.get('rfqid').value);
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
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchaserequestdetailForm.patchValue({
    poid: this.erppurchaserequestdetailservice.formData.poid,
    poiddesc: this.erppurchaserequestdetailservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchaserequestdetailForm.get('poid').value);
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
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erppurchaserequestdetailForm.patchValue({
    supplierid: this.erppurchaserequestdetailservice.formData.supplierid,
    supplieriddesc: this.erppurchaserequestdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erppurchaserequestdetailForm.get('supplierid').value);
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
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erppurchaserequestdetailForm.patchValue({
    accountid: this.erppurchaserequestdetailservice.formData.accountid,
    accountiddesc: this.erppurchaserequestdetailservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erppurchaserequestdetailForm.get('accountid').value);
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
this.configservice.getList("approvalstatus").then(res => this.approvalstatusList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvedbyList = res as bousermaster[];
if(this.erppurchaserequestdetailservice.formData && this.erppurchaserequestdetailservice.formData.approvedby){
this.approvedbyoptionsEvent.emit(this.approvedbyList);
this.erppurchaserequestdetailForm.patchValue({
    approvedby: this.erppurchaserequestdetailservice.formData.approvedby,
    approvedbydesc: this.erppurchaserequestdetailservice.formData.approvedbydesc,
});
}
{
let arrapprovedby = this.approvedbyList.filter(v => v.userid == this.erppurchaserequestdetailForm.get('approvedby').value);
let objapprovedby;
if (arrapprovedby.length > 0) objapprovedby = arrapprovedby[0];
if (objapprovedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvedby_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.erppurchaserequestdetailservice.geterppurchaserequestdetailsList().then(res => {
      this.pkList = res as erppurchaserequestdetail[];
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
this.erppurchaserequestdetailForm.markAsUntouched();
this.erppurchaserequestdetailForm.markAsPristine();
}
onSelectedprsid(prsidDetail: any) {
if (prsidDetail.prsid && prsidDetail) {
this.erppurchaserequestdetailForm.patchValue({
prsid: prsidDetail.prsid,
prsiddesc: prsidDetail.prscode,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erppurchaserequestdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});
this.erppurchaserequestdetailForm.patchValue({itemdescription:itemidDetail.itemdescription});
this.erppurchaserequestdetailForm.patchValue({uom:itemidDetail.purchaseuom});

}
}

onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erppurchaserequestdetailForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchaserequestdetailForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erppurchaserequestdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erppurchaserequestdetailForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}

onSelectedapprovedby(approvedbyDetail: any) {
if (approvedbyDetail.userid && approvedbyDetail) {
this.erppurchaserequestdetailForm.patchValue({
approvedby: approvedbyDetail.userid,
approvedbydesc: approvedbyDetail.username,

});

}
}




resetForm() {
if (this.erppurchaserequestdetailForm != null)
this.erppurchaserequestdetailForm.reset();
this.erppurchaserequestdetailForm.patchValue({
approvedby: this.sessiondata.userid,
approvedbydesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.budgetdetailsvisible = false;
this.costdetailsvisible = false;
this.deliverydetailsvisible = false;
}

    onDelete() {
        let prsdetailid = this.erppurchaserequestdetailForm.get('prsdetailid').value;
        if(prsdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchaserequestdetailservice.deleteerppurchaserequestdetail(prsdetailid).then(res =>
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
    this.erppurchaserequestdetailForm.patchValue({
        prsdetailid: null
    });
    if(this.erppurchaserequestdetailservice.formData.prsdetailid!=null)this.erppurchaserequestdetailservice.formData.prsdetailid=null;
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
        else if(key=="requiredbefore")
this.erppurchaserequestdetailForm.patchValue({"requiredbefore":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erppurchaserequestdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchaserequestdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchaserequestdetailForm.controls[key]!=undefined)
{
this.erppurchaserequestdetailForm.controls[key].disable({onlySelf: true});
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
prsidonChange(evt:any){
let e=evt.value;
}
prsdetailidonChange(evt:any){
let e=evt.value;
}
itemcategoryonChange(evt:any){
let e=evt.value;
this.erppurchaserequestdetailForm.patchValue({itemcategorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res => this.itemsubcategoryList = res as bosubcategorymaster[]);
});
}
itemsubcategoryonChange(evt:any){
let e=evt.value;
this.erppurchaserequestdetailForm.patchValue({itemsubcategorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res => this.itemidList = res as erpitemmaster[]);
});
}
itemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erppurchaserequestdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
requiredbeforeonChange(evt:any){
let e=evt.value;
}
prsremarksonChange(evt:any){
let e=evt.value;
}
currencyidonChange(evt:any){
let e=this.f.currencyid.value as any;
this.erppurchaserequestdetailForm.patchValue({currencyiddesc:evt.options[evt.options.selectedIndex].text});
}
costonChange(evt:any){
let e=evt.value;
}
totalcostonChange(evt:any){
let e=evt.value;
}
tax1onChange(evt:any){
let e=evt.value;
}
tax2onChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
netamountonChange(evt:any){
let e=evt.value;
}
budgetonChange(evt:any){
let e=evt.value;
}
usedonChange(evt:any){
let e=evt.value;
}
availableonChange(evt:any){
let e=evt.value;
}
rfqidonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
let e=evt.value;
}
approvalstatusonChange(evt:any){
let e=this.f.approvalstatus.value as any;
this.erppurchaserequestdetailForm.patchValue({approvalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
approvedbyonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerppurchaserequestdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchaserequestdetailservice.geterppurchaserequestdetailsByEID(pkcol).then(res => {

this.erppurchaserequestdetailservice.formData=res.erppurchaserequestdetail;
let formproperty=res.erppurchaserequestdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchaserequestdetail.pkcol;
this.formid=res.erppurchaserequestdetail.prsdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchaserequestdetail.prsdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchaserequestdetailForm.patchValue({
prsid: res.erppurchaserequestdetail.prsid,
prsiddesc: res.erppurchaserequestdetail.prsiddesc,
prsdetailid: res.erppurchaserequestdetail.prsdetailid,
itemcategory: res.erppurchaserequestdetail.itemcategory,
itemcategorydesc: res.erppurchaserequestdetail.itemcategorydesc,
itemsubcategory: res.erppurchaserequestdetail.itemsubcategory,
itemsubcategorydesc: res.erppurchaserequestdetail.itemsubcategorydesc,
itemid: res.erppurchaserequestdetail.itemid,
itemiddesc: res.erppurchaserequestdetail.itemiddesc,
itemdescription: res.erppurchaserequestdetail.itemdescription,
details: res.erppurchaserequestdetail.details,
uom: res.erppurchaserequestdetail.uom,
uomdesc: res.erppurchaserequestdetail.uomdesc,
quantity: res.erppurchaserequestdetail.quantity,
requiredbefore: this.ngbDateParserFormatter.parse(res.erppurchaserequestdetail.requiredbefore),
prsremarks: res.erppurchaserequestdetail.prsremarks,
currencyid: res.erppurchaserequestdetail.currencyid,
currencyiddesc: res.erppurchaserequestdetail.currencyiddesc,
cost: res.erppurchaserequestdetail.cost,
totalcost: res.erppurchaserequestdetail.totalcost,
tax1: res.erppurchaserequestdetail.tax1,
tax2: res.erppurchaserequestdetail.tax2,
othercharges: res.erppurchaserequestdetail.othercharges,
netamount: res.erppurchaserequestdetail.netamount,
budget: res.erppurchaserequestdetail.budget,
used: res.erppurchaserequestdetail.used,
available: res.erppurchaserequestdetail.available,
rfqid: res.erppurchaserequestdetail.rfqid,
rfqiddesc: res.erppurchaserequestdetail.rfqiddesc,
poid: res.erppurchaserequestdetail.poid,
poiddesc: res.erppurchaserequestdetail.poiddesc,
supplierid: res.erppurchaserequestdetail.supplierid,
supplieriddesc: res.erppurchaserequestdetail.supplieriddesc,
accountid: res.erppurchaserequestdetail.accountid,
accountiddesc: res.erppurchaserequestdetail.accountiddesc,
approvalstatus: res.erppurchaserequestdetail.approvalstatus,
approvalstatusdesc: res.erppurchaserequestdetail.approvalstatusdesc,
approvedby: res.erppurchaserequestdetail.approvedby,
approvedbydesc: res.erppurchaserequestdetail.approvedbydesc,
status: res.erppurchaserequestdetail.status,
statusdesc: res.erppurchaserequestdetail.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("budgetdetails")>=0)this.budgetdetailsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("budgetdetails")>=0)this.budgetdetailsvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("costdetails")>=0)this.costdetailsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("costdetails")>=0)this.costdetailsvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("deliverydetails")>=0)this.deliverydetailsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("deliverydetails")>=0)this.deliverydetailsvisible = false;
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res =>{
this.itemsubcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res =>{
this.itemidList = res as erpitemmaster[];
}).catch((err) => {console.log(err);});
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
  for (let key in this.erppurchaserequestdetailForm.controls) {
    if (this.erppurchaserequestdetailForm.controls[key] != null) {
if(false)
{
if(this.erppurchaserequestdetailservice.formData!=null && this.erppurchaserequestdetailservice.formData[key]!=null  && this.erppurchaserequestdetailservice.formData[key]!='[]' && this.erppurchaserequestdetailservice.formData[key]!=undefined && this.erppurchaserequestdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchaserequestdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchaserequestdetailservice.formData!=null && this.erppurchaserequestdetailservice.formData[key]!=null   && this.erppurchaserequestdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchaserequestdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchaserequestdetailservice.formData!=null && this.erppurchaserequestdetailservice.formData[key]!=null   && this.erppurchaserequestdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchaserequestdetailservice.formData[key]+"'><div class='progress__number'>"+this.erppurchaserequestdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchaserequestdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchaserequestdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erppurchaserequestdetailForm.value;
obj.requiredbefore=new Date(this.erppurchaserequestdetailForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestdetailForm.get('requiredbefore').value)+'  UTC' :null);
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

private erppurchaserequestdetailtoggleOption(){
this.erppurchaserequestdetailshowOption = this.erppurchaserequestdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchaserequestdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchaserequestdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchaserequestdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchaserequestdetailservice.formData=this.erppurchaserequestdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchaserequestdetailForm.controls[key] != null)
    {
        this.erppurchaserequestdetailservice.formData[key] = this.erppurchaserequestdetailForm.controls[key].value;
    }
}
}
}
this.erppurchaserequestdetailservice.formData.requiredbefore=new Date(this.erppurchaserequestdetailForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestdetailForm.get('requiredbefore').value)+'  UTC' :null);
console.log(this.erppurchaserequestdetailservice.formData);
this.erppurchaserequestdetailservice.formData=this.erppurchaserequestdetailForm.value;
this.erppurchaserequestdetailservice.saveOrUpdateerppurchaserequestdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaserequestdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchaserequestdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaserequestdetail);
}
else
{
this.FillData(res);
}
}
this.erppurchaserequestdetailForm.markAsUntouched();
this.erppurchaserequestdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




  viewsupplierid() {
    this.dialog.open(erpsuppliermasterComponent,
      {
        data: { showview: false, supplierid:this.erppurchaserequestdetailForm.get('supplierid').value, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
  viewrfqid() {
    this.dialog.open(erprfqmasterComponent,
      {
        data: { showview: false, rfqid:this.erppurchaserequestdetailForm.get('rfqid').value, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
  viewpoid() {
    this.dialog.open(erppurchaseordermasterComponent,
      {
        data: { showview: false, poid:this.erppurchaserequestdetailForm.get('poid').value, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprsid( prsid) {
/*let ScreenType='2';
this.dialog.open(erppurchaserequestComponent, 
{
data: {prsid:this.erppurchaserequestdetailForm.get('prsid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erppurchaserequestdetailForm.get('itemcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erppurchaserequestdetailForm.get('itemsubcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erppurchaserequestdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erppurchaserequestdetailForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erppurchaserequestdetailForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erppurchaserequestdetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erppurchaserequestdetailForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erppurchaserequestdetailForm.get('approvedby').value, ScreenType:2 }
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



