import { erpsupplieritemService } from './../../../service/erpsupplieritem.service';
import { erpsupplieritem } from './../../../model/erpsupplieritem.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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
import { erptaxmaster} from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
//popups
import { erpcontractordermaster} from './../../../model/erpcontractordermaster.model';
import { erpcontractordermasterComponent } from './../../../pages/forms/erpcontractordermaster/erpcontractordermaster.component';
import { erpcontractordermasterService } from './../../../service/erpcontractordermaster.service';
//popups
import { bocontact} from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
import { bocontactService } from '../../../../../../n-tire-bo-app/src/app/service/bocontact.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
//detail table services
import { erpsupplieritemfeature } from './../../../model/erpsupplieritemfeature.model';
import { erpsupplieritemfeatureComponent } from './../../../pages/forms/erpsupplieritemfeature/erpsupplieritemfeature.component';
//FK services
import { erpsupplierpaymentterm } from './../../../model/erpsupplierpaymentterm.model';
import { erpsupplierpaymenttermComponent } from './../../../pages/forms/erpsupplierpaymentterm/erpsupplierpaymentterm.component';
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
selector: 'app-erpsupplieritem',
templateUrl: './erpsupplieritem.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplieritemComponent implements OnInit {
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
bfilterPopulateerpsupplieritems:boolean=false;
dataerpsupplieritemssupplierid3:any=[];
dataerpsupplieritemssupplieritemid3:any=[];
dataerpsupplieritemsitemcategoryid3:any=[];
dataerpsupplieritemsitemsubcategoryid3:any=[];
dataerpsupplieritemsourcompanyitemid3:any=[];
dataerpsupplieritemsuom3:any=[];
dataerpsupplieritemscurrency3:any=[];
dataerpsupplieritemsproducttype3:any=[];
dataerpsupplieritemsriskclassification3:any=[];
dataerpsupplieritemstax1name3:any=[];
dataerpsupplieritemstax2name3:any=[];
dataerpsupplieritemssalesunitsize3:any=[];
dataerpsupplieritemscontractid3:any=[];
dataerpsupplieritemssuppliercontactid3:any=[];
dataerpsupplieritemsaccountid3:any=[];
dataerpsupplieritemfeaturessupplierid3:any=[];
dataerpsupplieritemfeaturessupplieritemid3:any=[];
bfilterPopulateerpsupplieritemfeatures:boolean=false;
dataerpsupplierpaymenttermspaymenttermtype3:any=[];
dataerpsupplierpaymenttermssupplierid3:any=[];
dataerpsupplierpaymenttermssupplieritemid3:any=[];
bfilterPopulateerpsupplierpaymentterms:boolean=false;
@ViewChild('tblerpsupplieritemfeaturessource',{static:false}) tblerpsupplieritemfeaturessource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplierpaymenttermssource',{static:false}) tblerpsupplierpaymenttermssource: Ng2SmartTableComponent;
 erpsupplieritemForm: FormGroup;
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
supplieritemidList: erpsupplieritem[];
supplieritemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplieritemid_erpsupplieritemsForm: FormGroup;//autocomplete
supplieritemid_erpsupplieritemsoptions:any;//autocomplete
supplieritemid_erpsupplieritemsformatter:any;//autocomplete
itemcategoryidList: bomasterdata[];
itemsubcategoryidList: bosubcategorymaster[];
ourcompanyitemidList: erpitemmaster[];
ourcompanyitemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
ourcompanyitemid_erpitemmastersForm: FormGroup;//autocomplete
ourcompanyitemid_erpitemmastersoptions:any;//autocomplete
ourcompanyitemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
producttypeList: boconfigvalue[];
riskclassificationList: boconfigvalue[];
tax1nameList: erptaxmaster[];
tax2nameList: erptaxmaster[];
salesunitsizeList: boconfigvalue[];
contractidList: erpcontractordermaster[];
contractidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractid_erpcontractordermastersForm: FormGroup;//autocomplete
contractid_erpcontractordermastersoptions:any;//autocomplete
contractid_erpcontractordermastersformatter:any;//autocomplete
suppliercontactidList: bocontact[];
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
@ViewChild('productimage',{static:false}) productimage: AttachmentComponent;
SESSIONUSERID:any;//current user
erpsupplieritemshowOption:boolean;
erpsupplieritemfeatureshowOption:boolean;
erpsupplierpaymenttermshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsupplieritemfeaturesvisiblelist:any;
erpsupplieritemfeatureshidelist:any;
erpsupplierpaymenttermsvisiblelist:any;
erpsupplierpaymenttermshidelist:any;

DeletederpsupplieritemfeatureIDs: string="";
erpsupplieritemfeaturesID: string = "1";
erpsupplieritemfeaturesselectedindex:any;
DeletederpsupplierpaymenttermIDs: string="";
erpsupplierpaymenttermsID: string = "2";
erpsupplierpaymenttermsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplieritemservice: erpsupplieritemService,
private erpsuppliermasterservice: erpsuppliermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private erpitemmasterservice:erpitemmasterService,
private erptaxmasterservice:erptaxmasterService,
private erpcontractordermasterservice:erpcontractordermasterService,
private bocontactservice:bocontactService,
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
this.erpsupplieritemForm  = this.fb.group({
pk:[null],
ImageName: [null],
supplierid: [null],
supplieriddesc: [null],
supplieritemid: [null],
supplieritemiddesc: [null],
itemcategoryid: [null],
itemcategoryiddesc: [null],
itemsubcategoryid: [null],
itemsubcategoryiddesc: [null],
supplieritemcode: [null],
supplierpartname: [null],
ourcompanyitemid: [null],
ourcompanyitemiddesc: [null],
itemdescription: [null],
brand: [null],
model: [null],
make: [null],
ispreferred: [null],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
dimensions: [null],
producttype: [null],
producttypedesc: [null],
productimage: [null],
description: [null],
minorderqty: [null],
reorderlevel: [null],
leadtimedays: [null],
riskclassification: [null],
riskclassificationdesc: [null],
unitprice: [null],
discountpercent: [null],
tax1name: [null],
tax1namedesc: [null],
tax1: [null],
tax2name: [null],
tax2namedesc: [null],
tax2: [null],
othercharges: [null],
totalcost: [null],
pricevalidenddate: [null],
offerquantity1: [null],
unitprice1: [null],
totalcost1: [null],
offerquantity2: [null],
unitprice2: [null],
totalcost2: [null],
offerquantity3: [null],
unitprice3: [null],
totalcost3: [null],
availablestock: [null],
salesunitsize: [null],
salesunitsizedesc: [null],
contractid: [null],
contractiddesc: [null],
suppliercontactid: [null],
suppliercontactiddesc: [null],
accountid: [null],
accountiddesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
totalqtyordered: [null],
});
}

get f() { return this.erpsupplieritemForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplieritemForm.dirty && this.erpsupplieritemForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplieritemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplieritemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplieritemid && pkDetail) {
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
let erpsupplieritemid = null;

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
this.formid=erpsupplieritemid;
//this.sharedService.alert(erpsupplieritemid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsupplieritemfeaturesTableConfig();
  setTimeout(() => {
  this.SeterpsupplieritemfeaturesTableddConfig();
  });

this.SeterpsupplierpaymenttermsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierpaymenttermsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplieritemForm.patchValue({
    supplierid: this.erpsupplieritemservice.formData.supplierid,
    supplieriddesc: this.erpsupplieritemservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplieritemForm.get('supplierid').value);
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
this.erpsupplieritemservice.geterpsupplieritemsList().then(res => 
{
this.supplieritemidList = res as erpsupplieritem[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.supplieritemid){
this.supplieritemidoptionsEvent.emit(this.supplieritemidList);
this.erpsupplieritemForm.patchValue({
    supplieritemid: this.erpsupplieritemservice.formData.supplieritemid,
    supplieritemiddesc: this.erpsupplieritemservice.formData.supplieritemiddesc,
});
}
{
let arrsupplieritemid = this.supplieritemidList.filter(v => v.supplierid == this.erpsupplieritemForm.get('supplieritemid').value);
let objsupplieritemid;
if (arrsupplieritemid.length > 0) objsupplieritemid = arrsupplieritemid[0];
if (objsupplieritemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplieritemid_erpsupplieritemsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieritemidList.filter(v => v.supplieritemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplieritemid_erpsupplieritemsformatter = (result: any) => result.supplieritemcode;
this.bomasterdataservice.getList("rs8fd").then(res => {
this.itemcategoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.itemcategoryid.value && this.f.itemcategoryid.value!="" && this.f.itemcategoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategoryid.value).then(res =>{
this.itemsubcategoryidList = res as bosubcategorymaster[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.itemsubcategoryid){this.erpsupplieritemForm.patchValue({
    itemsubcategoryid: this.erpsupplieritemservice.formData.itemsubcategoryid,
    itemsubcategoryiddesc: this.erpsupplieritemservice.formData.itemsubcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategoryid.value && this.f.itemsubcategoryid.value!="" && this.f.itemsubcategoryid.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategoryid.value).then(res =>{
this.ourcompanyitemidList = res as erpitemmaster[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.ourcompanyitemid){this.erpsupplieritemForm.patchValue({
    ourcompanyitemid: this.erpsupplieritemservice.formData.ourcompanyitemid,
    ourcompanyitemiddesc: this.erpsupplieritemservice.formData.ourcompanyitemiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.ourcompanyitemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ourcompanyitemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.ourcompanyitemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.configservice.getList("producttype").then(res => this.producttypeList = res as boconfigvalue[]);
this.configservice.getList("riskclassification").then(res => this.riskclassificationList = res as boconfigvalue[]);
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
this.configservice.getList("salesunitsize").then(res => this.salesunitsizeList = res as boconfigvalue[]);
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.contractidList = res as erpcontractordermaster[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.contractid){
this.contractidoptionsEvent.emit(this.contractidList);
this.erpsupplieritemForm.patchValue({
    contractid: this.erpsupplieritemservice.formData.contractid,
    contractiddesc: this.erpsupplieritemservice.formData.contractiddesc,
});
}
{
let arrcontractid = this.contractidList.filter(v => v.contractid == this.erpsupplieritemForm.get('contractid').value);
let objcontractid;
if (arrcontractid.length > 0) objcontractid = arrcontractid[0];
if (objcontractid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contractid_erpcontractordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contractidList.filter(v => v.contractname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contractid_erpcontractordermastersformatter = (result: any) => result.contractname;
this.bocontactservice.getbocontactsList().then(res => 
{
this.suppliercontactidList = res as bocontact[];
}
).catch((err) => {console.log(err);});
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpsupplieritemservice.formData && this.erpsupplieritemservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpsupplieritemForm.patchValue({
    accountid: this.erpsupplieritemservice.formData.accountid,
    accountiddesc: this.erpsupplieritemservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpsupplieritemForm.get('accountid').value);
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
    this.erpsupplieritemservice.geterpsupplieritemsList().then(res => {
      this.pkList = res as erpsupplieritem[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.itemdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.itemdescription;

//setting the flag that the screen is not touched 
this.erpsupplieritemForm.markAsUntouched();
this.erpsupplieritemForm.markAsPristine();
}
onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplieritemForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedsupplieritemid(supplieritemidDetail: any) {
if (supplieritemidDetail.supplierid && supplieritemidDetail) {
this.erpsupplieritemForm.patchValue({
supplieritemid: supplieritemidDetail.supplierid,
supplieritemiddesc: supplieritemidDetail.supplieritemcode,

});

}
}

onSelectedourcompanyitemid(ourcompanyitemidDetail: any) {
if (ourcompanyitemidDetail.itemid && ourcompanyitemidDetail) {
this.erpsupplieritemForm.patchValue({
ourcompanyitemid: ourcompanyitemidDetail.itemid,
ourcompanyitemiddesc: ourcompanyitemidDetail.itemcode,

});

}
}

onSelectedcontractid(contractidDetail: any) {
if (contractidDetail.contractid && contractidDetail) {
this.erpsupplieritemForm.patchValue({
contractid: contractidDetail.contractid,
contractiddesc: contractidDetail.contractname,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpsupplieritemForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}




  getproductimage() {
    debugger;
    if (this.productimage.getattachmentlist().length > 0) {
      let file = this.productimage.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.erpsupplieritemForm != null)
this.erpsupplieritemForm.reset();
this.erpsupplieritemForm.patchValue({
});
setTimeout(() => {
this.erpsupplieritemservice.erpsupplieritemfeatures=[];
this.erpsupplieritemfeaturesLoadTable();
this.erpsupplieritemservice.erpsupplierpaymentterms=[];
this.erpsupplierpaymenttermsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplieritemid = this.erpsupplieritemForm.get('supplieritemid').value;
        if(supplieritemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplieritemservice.deleteerpsupplieritem(supplieritemid).then(res =>
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
    this.erpsupplieritemForm.patchValue({
        supplieritemid: null
    });
    if(this.erpsupplieritemservice.formData.supplieritemid!=null)this.erpsupplieritemservice.formData.supplieritemid=null;
for (let i=0;i<this.erpsupplieritemservice.erpsupplieritemfeatures.length;i++) {
this.erpsupplieritemservice.erpsupplieritemfeatures[i].featureid=null;
}
for (let i=0;i<this.erpsupplieritemservice.erpsupplierpaymentterms.length;i++) {
this.erpsupplieritemservice.erpsupplierpaymentterms[i].supplierpaytermid=null;
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
        else if(key=="pricevalidenddate")
this.erpsupplieritemForm.patchValue({"pricevalidenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsupplieritemForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplieritemForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplieritemForm.controls[key]!=undefined)
{
this.erpsupplieritemForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpsupplieritems",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erpsupplieritemservice.formData.itemdescription!=null )
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
supplieridonChange(evt:any){
let e=evt.value;
}
supplieritemidonChange(evt:any){
let e=evt.value;
}
itemcategoryidonChange(evt:any){
let e=evt.value;
this.erpsupplieritemForm.patchValue({itemcategoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemcategoryid.value && this.f.itemcategoryid.value!="" && this.f.itemcategoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategoryid.value).then(res => this.itemsubcategoryidList = res as bosubcategorymaster[]);
});
        this.erptaxmasterservice.getListByitemcategoryid(+this.erpsupplieritemForm.get('itemcategoryid').value).then(res=>{
            console.log(res);

            this.erpsupplieritemForm.patchValue({
                tax1name: (res[0] as any).taxid,
                tax1namedesc: (res[0] as any).taxname,
                tax1: (res[0] as any).taxpercentage,
            });
        });
}
itemsubcategoryidonChange(evt:any){
let e=evt.value;
this.erpsupplieritemForm.patchValue({itemsubcategoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemsubcategoryid.value && this.f.itemsubcategoryid.value!="" && this.f.itemsubcategoryid.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategoryid.value).then(res => this.ourcompanyitemidList = res as erpitemmaster[]);
});
}
supplieritemcodeonChange(evt:any){
let e=evt.value;
}
supplierpartnameonChange(evt:any){
let e=evt.value;
}
ourcompanyitemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
brandonChange(evt:any){
let e=evt.value;
}
modelonChange(evt:any){
let e=evt.value;
}
makeonChange(evt:any){
let e=evt.value;
}
ispreferredonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpsupplieritemForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpsupplieritemForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
dimensionsonChange(evt:any){
let e=evt.value;
}
producttypeonChange(evt:any){
let e=this.f.producttype.value as any;
this.erpsupplieritemForm.patchValue({producttypedesc:evt.options[evt.options.selectedIndex].text});
}
productimageonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
minorderqtyonChange(evt:any){
let e=evt.value;
}
reorderlevelonChange(evt:any){
let e=evt.value;
}
leadtimedaysonChange(evt:any){
let e=evt.value;
}
riskclassificationonChange(evt:any){
let e=this.f.riskclassification.value as any;
this.erpsupplieritemForm.patchValue({riskclassificationdesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erpsupplieritemForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
}
tax1onChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erpsupplieritemForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
}
tax2onChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
totalcostonChange(evt:any){
let e=evt.value;
}
pricevalidenddateonChange(evt:any){
let e=evt.value;
}
offerquantity1onChange(evt:any){
let e=evt.value;
}
unitprice1onChange(evt:any){
let e=evt.value;
}
totalcost1onChange(evt:any){
let e=evt.value;
}
offerquantity2onChange(evt:any){
let e=evt.value;
}
unitprice2onChange(evt:any){
let e=evt.value;
}
totalcost2onChange(evt:any){
let e=evt.value;
}
offerquantity3onChange(evt:any){
let e=evt.value;
}
unitprice3onChange(evt:any){
let e=evt.value;
}
totalcost3onChange(evt:any){
let e=evt.value;
}
availablestockonChange(evt:any){
let e=evt.value;
}
salesunitsizeonChange(evt:any){
let e=this.f.salesunitsize.value as any;
this.erpsupplieritemForm.patchValue({salesunitsizedesc:evt.options[evt.options.selectedIndex].text});
}
contractidonChange(evt:any){
let e=evt.value;
}
suppliercontactidonChange(evt:any){
let e=evt.value;
this.erpsupplieritemForm.patchValue({suppliercontactiddesc:evt.options[evt.options.selectedIndex].text});
}
accountidonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
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
totalqtyorderedonChange(evt:any){
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
  


editerpsupplieritems() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplieritemservice.geterpsupplieritemsByEID(pkcol).then(res => {

this.erpsupplieritemservice.formData=res.erpsupplieritem;
let formproperty=res.erpsupplieritem.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplieritem.pkcol;
this.formid=res.erpsupplieritem.supplieritemid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplieritem.supplieritemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplieritemForm.patchValue({
supplierid: res.erpsupplieritem.supplierid,
supplieriddesc: res.erpsupplieritem.supplieriddesc,
supplieritemid: res.erpsupplieritem.supplieritemid,
supplieritemiddesc: res.erpsupplieritem.supplieritemiddesc,
itemcategoryid: res.erpsupplieritem.itemcategoryid,
itemcategoryiddesc: res.erpsupplieritem.itemcategoryiddesc,
itemsubcategoryid: res.erpsupplieritem.itemsubcategoryid,
itemsubcategoryiddesc: res.erpsupplieritem.itemsubcategoryiddesc,
supplieritemcode: res.erpsupplieritem.supplieritemcode,
supplierpartname: res.erpsupplieritem.supplierpartname,
ourcompanyitemid: res.erpsupplieritem.ourcompanyitemid,
ourcompanyitemiddesc: res.erpsupplieritem.ourcompanyitemiddesc,
itemdescription: res.erpsupplieritem.itemdescription,
brand: res.erpsupplieritem.brand,
model: res.erpsupplieritem.model,
make: res.erpsupplieritem.make,
ispreferred: res.erpsupplieritem.ispreferred,
uom: res.erpsupplieritem.uom,
uomdesc: res.erpsupplieritem.uomdesc,
currency: res.erpsupplieritem.currency,
currencydesc: res.erpsupplieritem.currencydesc,
dimensions: res.erpsupplieritem.dimensions,
producttype: res.erpsupplieritem.producttype,
producttypedesc: res.erpsupplieritem.producttypedesc,
productimage: JSON.parse(res.erpsupplieritem.productimage),
description: res.erpsupplieritem.description,
minorderqty: res.erpsupplieritem.minorderqty,
reorderlevel: res.erpsupplieritem.reorderlevel,
leadtimedays: res.erpsupplieritem.leadtimedays,
riskclassification: res.erpsupplieritem.riskclassification,
riskclassificationdesc: res.erpsupplieritem.riskclassificationdesc,
unitprice: res.erpsupplieritem.unitprice,
discountpercent: res.erpsupplieritem.discountpercent,
tax1name: res.erpsupplieritem.tax1name,
tax1namedesc: res.erpsupplieritem.tax1namedesc,
tax1: res.erpsupplieritem.tax1,
tax2name: res.erpsupplieritem.tax2name,
tax2namedesc: res.erpsupplieritem.tax2namedesc,
tax2: res.erpsupplieritem.tax2,
othercharges: res.erpsupplieritem.othercharges,
totalcost: res.erpsupplieritem.totalcost,
pricevalidenddate: this.ngbDateParserFormatter.parse(res.erpsupplieritem.pricevalidenddate),
offerquantity1: res.erpsupplieritem.offerquantity1,
unitprice1: res.erpsupplieritem.unitprice1,
totalcost1: res.erpsupplieritem.totalcost1,
offerquantity2: res.erpsupplieritem.offerquantity2,
unitprice2: res.erpsupplieritem.unitprice2,
totalcost2: res.erpsupplieritem.totalcost2,
offerquantity3: res.erpsupplieritem.offerquantity3,
unitprice3: res.erpsupplieritem.unitprice3,
totalcost3: res.erpsupplieritem.totalcost3,
availablestock: res.erpsupplieritem.availablestock,
salesunitsize: res.erpsupplieritem.salesunitsize,
salesunitsizedesc: res.erpsupplieritem.salesunitsizedesc,
contractid: res.erpsupplieritem.contractid,
contractiddesc: res.erpsupplieritem.contractiddesc,
suppliercontactid: res.erpsupplieritem.suppliercontactid,
suppliercontactiddesc: res.erpsupplieritem.suppliercontactiddesc,
accountid: res.erpsupplieritem.accountid,
accountiddesc: res.erpsupplieritem.accountiddesc,
remarks: res.erpsupplieritem.remarks,
customfield: res.erpsupplieritem.customfield,
attachment: JSON.parse(res.erpsupplieritem.attachment),
status: res.erpsupplieritem.status,
statusdesc: res.erpsupplieritem.statusdesc,
totalqtyordered: res.erpsupplieritem.totalqtyordered,
});
this.erpsupplieritemfeaturesvisiblelist=res.erpsupplieritemfeaturesvisiblelist;
this.erpsupplierpaymenttermsvisiblelist=res.erpsupplierpaymenttermsvisiblelist;
if(this.erpsupplieritemForm.get('customfield').value!=null && this.erpsupplieritemForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpsupplieritemForm.get('customfield').value);
this.FillCustomField();
if(this.erpsupplieritemForm.get('productimage').value!=null && this.erpsupplieritemForm.get('productimage').value!="" && this.productimage!=null && this.productimage!=undefined)this.productimage.setattachmentlist(this.erpsupplieritemForm.get('productimage').value);
if(this.erpsupplieritemForm.get('attachment').value!=null && this.erpsupplieritemForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpsupplieritemForm.get('attachment').value);
setTimeout(() => {
if(this.f.itemcategoryid.value && this.f.itemcategoryid.value!="" && this.f.itemcategoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategoryid.value).then(res =>{
this.itemsubcategoryidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategoryid.value && this.f.itemsubcategoryid.value!="" && this.f.itemsubcategoryid.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategoryid.value).then(res =>{
this.ourcompanyitemidList = res as erpitemmaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erpsupplieritemservice.erpsupplieritemfeatures = res.erpsupplieritemfeatures;
this.SeterpsupplieritemfeaturesTableConfig();
this.erpsupplieritemfeaturesLoadTable();
  setTimeout(() => {
  this.SeterpsupplieritemfeaturesTableddConfig();
  });
this.erpsupplieritemservice.erpsupplierpaymentterms = res.erpsupplierpaymentterms;
this.SeterpsupplierpaymenttermsTableConfig();
this.erpsupplierpaymenttermsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierpaymenttermsTableddConfig();
  });
}

validate()
{
let ret=true;
let tot=0;
for(let i=0;i<this.erpsupplieritemservice.erpsupplierpaymentterms.length;i++)
{
tot+=+this.erpsupplieritemservice.erpsupplierpaymentterms[i].percentage;
}
if(tot!=100)
{
this.toastr.addSingle("error", "", "Total Payment Percentage should be equal to 100");
ret=false;
}
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.erpsupplieritemForm.controls) {
    if (this.erpsupplieritemForm.controls[key] != null) {
if( key=="productimage")
{
if(this.erpsupplieritemservice.formData!=null && this.erpsupplieritemservice.formData[key]!=null  && this.erpsupplieritemservice.formData[key]!='[]' && this.erpsupplieritemservice.formData[key]!=undefined && this.erpsupplieritemservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplieritemservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplieritemservice.formData!=null && this.erpsupplieritemservice.formData[key]!=null   && this.erpsupplieritemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplieritemservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplieritemservice.formData!=null && this.erpsupplieritemservice.formData[key]!=null   && this.erpsupplieritemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplieritemservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplieritemservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplieritemForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplieritemForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpsupplieritemForm.value;
obj.pricevalidenddate=new Date(this.erpsupplieritemForm.get('pricevalidenddate').value ? this.ngbDateParserFormatter.format(this.erpsupplieritemForm.get('pricevalidenddate').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.productimage.getattachmentlist()!=null)obj.productimage=JSON.stringify(this.productimage.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.productimage.getAllFiles());
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

private erpsupplieritemtoggleOption(){
this.erpsupplieritemshowOption = this.erpsupplieritemshowOption === true ? false : true;
}

private erpsupplieritemfeaturetoggleOption(){
this.erpsupplieritemfeatureshowOption = this.erpsupplieritemfeatureshowOption === true ? false : true;
}

private erpsupplierpaymenttermtoggleOption(){
this.erpsupplierpaymenttermshowOption = this.erpsupplierpaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplieritemForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplieritemForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplieritemForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplieritemservice.formData=this.erpsupplieritemForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplieritemForm.controls[key] != null)
    {
        this.erpsupplieritemservice.formData[key] = this.erpsupplieritemForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpsupplieritemservice.formData.productimage=this.erpsupplieritemForm.get('productimage').value;
this.erpsupplieritemservice.formData.pricevalidenddate=new Date(this.erpsupplieritemForm.get('pricevalidenddate').value ? this.ngbDateParserFormatter.format(this.erpsupplieritemForm.get('pricevalidenddate').value)+'  UTC' :null);
if(customfields!=null)this.erpsupplieritemservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpsupplieritemservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpsupplieritemservice.formData.DeletederpsupplieritemfeatureIDs = this.DeletederpsupplieritemfeatureIDs;
this.erpsupplieritemservice.formData.DeletederpsupplierpaymenttermIDs = this.DeletederpsupplierpaymenttermIDs;
if(this.productimage.getattachmentlist()!=null)this.erpsupplieritemservice.formData.productimage=JSON.stringify(this.productimage.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpsupplieritemservice.formData);
this.erpsupplieritemservice.formData=this.erpsupplieritemForm.value;
this.erpsupplieritemservice.saveOrUpdateerpsupplieritems().subscribe(
async res => {
await this.sharedService.upload(this.productimage.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpsupplieritemfeaturessource.data)
{
    for (let i = 0; i < this.erpsupplieritemfeaturessource.data.length; i++)
    {
        if (this.erpsupplieritemfeaturessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplieritemfeaturessource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplierpaymenttermssource.data)
{
    for (let i = 0; i < this.erpsupplierpaymenttermssource.data.length; i++)
    {
        if (this.erpsupplierpaymenttermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierpaymenttermssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplieritem);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplieritemservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplieritem);
}
else
{
this.FillData(res);
}
}
this.erpsupplieritemForm.markAsUntouched();
this.erpsupplieritemForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplieritemForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplieritemid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsupplieritemComponent, 
{
data: {supplierid:this.erpsupplieritemForm.get('supplieritemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpsupplieritemForm.get('itemcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpsupplieritemForm.get('itemsubcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditourcompanyitemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpsupplieritemForm.get('ourcompanyitemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplieritemForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplieritemForm.get('tax2name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontractid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.erpsupplieritemForm.get('contractid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsuppliercontactid( contactid) {
/*let ScreenType='2';
this.dialog.open(bocontactComponent, 
{
data: {contactid:this.erpsupplieritemForm.get('suppliercontactid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpsupplieritemForm.get('accountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsupplieritemfeature(event:any,featureid:any, supplieritemid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplieritemfeatureComponent, 
{
data:  {  showview:false,save:false,event,featureid, supplieritemid,visiblelist:this.erpsupplieritemfeaturesvisiblelist,  hidelist:this.erpsupplieritemfeatureshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplieritemfeaturessource.add(res);
this.erpsupplieritemfeaturessource.refresh();
}
else
{
this.erpsupplieritemfeaturessource.update(event.data, res);
}
}
});
}

onDeleteerpsupplieritemfeature(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplieritemfeatureIDs += childID + ",";
this.erpsupplieritemservice.erpsupplieritemfeatures.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplierpaymentterm(event:any,supplierpaytermid:any, supplieritemid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierpaymenttermComponent, 
{
data:  {  showview:false,save:false,event,supplierpaytermid, supplieritemid,visiblelist:this.erpsupplierpaymenttermsvisiblelist,  hidelist:this.erpsupplierpaymenttermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierpaymenttermssource.add(res);
this.erpsupplierpaymenttermssource.refresh();
}
else
{
this.erpsupplierpaymenttermssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierpaymentterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierpaymenttermIDs += childID + ",";
this.erpsupplieritemservice.erpsupplierpaymentterms.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsupplieritemfeatures
erpsupplieritemfeaturessettings:any;
erpsupplieritemfeaturessource: any;

showerpsupplieritemfeaturesCheckbox()
{
debugger;
if(this.tblerpsupplieritemfeaturessource.settings['selectMode']== 'multi')this.tblerpsupplieritemfeaturessource.settings['selectMode']= 'single';
else
this.tblerpsupplieritemfeaturessource.settings['selectMode']= 'multi';
this.tblerpsupplieritemfeaturessource.initGrid();
}
deleteerpsupplieritemfeaturesAll()
{
this.tblerpsupplieritemfeaturessource.settings['selectMode'] = 'single';
}
showerpsupplieritemfeaturesFilter()
{
  setTimeout(() => {
  this.SeterpsupplieritemfeaturesTableddConfig();
  });
      if(this.tblerpsupplieritemfeaturessource.settings!=null)this.tblerpsupplieritemfeaturessource.settings['hideSubHeader'] =!this.tblerpsupplieritemfeaturessource.settings['hideSubHeader'];
this.tblerpsupplieritemfeaturessource.initGrid();
}
showerpsupplieritemfeaturesInActive()
{
}
enableerpsupplieritemfeaturesInActive()
{
}
async SeterpsupplieritemfeaturesTableddConfig()
{
if(!this.bfilterPopulateerpsupplieritemfeatures){
}
this.bfilterPopulateerpsupplieritemfeatures=true;
}
async erpsupplieritemfeaturesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplieritemfeaturesTableConfig()
{
this.erpsupplieritemfeaturessettings = {
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
featurename: {
title: 'Feature Name',
type: '',
filter:true,
},
value: {
title: 'Value',
type: '',
filter:true,
},
},
};
}
erpsupplieritemfeaturesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplieritemfeaturesID)>=0)
{
this.erpsupplieritemfeaturessource=new LocalDataSource();
this.erpsupplieritemfeaturessource.load(this.erpsupplieritemservice.erpsupplieritemfeatures as  any as LocalDataSource);
this.erpsupplieritemfeaturessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplieritemfeaturesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplieritemservice.erpsupplieritemfeatures.length == 0)
{
    this.tblerpsupplieritemfeaturessource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplieritemfeature();
    this.erpsupplieritemservice.erpsupplieritemfeatures.push(obj);
    this.erpsupplieritemfeaturessource.refresh();
    if ((this.erpsupplieritemservice.erpsupplieritemfeatures.length / this.erpsupplieritemfeaturessource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplieritemfeaturessource.getPaging().page)
    {
        this.erpsupplieritemfeaturessource.setPage((this.erpsupplieritemservice.erpsupplieritemfeatures.length / this.erpsupplieritemfeaturessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplieritemfeaturessource.grid.edit(this.tblerpsupplieritemfeaturessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplieritemfeaturessource.data.indexOf(event.data);
this.onDeleteerpsupplieritemfeature(event,event.data.featureid,((this.erpsupplieritemfeaturessource.getPaging().page-1) *this.erpsupplieritemfeaturessource.getPaging().perPage)+index);
this.erpsupplieritemfeaturessource.refresh();
break;
}
}

*/
erpsupplieritemfeaturesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplieritemfeature(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplieritemfeature(event,event.data.featureid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplieritemfeature(event,event.data.featureid,((this.erpsupplieritemfeaturessource.getPaging().page-1) *this.erpsupplieritemfeaturessource.getPaging().perPage)+event.index);
this.erpsupplieritemfeaturessource.refresh();
break;
}
}
erpsupplieritemfeaturesonDelete(obj) {
let featureid=obj.data.featureid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplieritemservice.deleteerpsupplieritem(featureid).then(res=>
this.erpsupplieritemfeaturesLoadTable()
);
}
}
erpsupplieritemfeaturesPaging(val)
{
debugger;
this.erpsupplieritemfeaturessource.setPaging(1, val, true);
}

handleerpsupplieritemfeaturesGridSelected(event:any) {
this.erpsupplieritemfeaturesselectedindex=this.erpsupplieritemservice.erpsupplieritemfeatures.findIndex(i => i.featureid === event.data.featureid);
}
IserpsupplieritemfeaturesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplieritemfeaturesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplieritemfeatures
//start of Grid Codes erpsupplierpaymentterms
erpsupplierpaymenttermssettings:any;
erpsupplierpaymenttermssource: any;

showerpsupplierpaymenttermsCheckbox()
{
debugger;
if(this.tblerpsupplierpaymenttermssource.settings['selectMode']== 'multi')this.tblerpsupplierpaymenttermssource.settings['selectMode']= 'single';
else
this.tblerpsupplierpaymenttermssource.settings['selectMode']= 'multi';
this.tblerpsupplierpaymenttermssource.initGrid();
}
deleteerpsupplierpaymenttermsAll()
{
this.tblerpsupplierpaymenttermssource.settings['selectMode'] = 'single';
}
showerpsupplierpaymenttermsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierpaymenttermsTableddConfig();
  });
      if(this.tblerpsupplierpaymenttermssource.settings!=null)this.tblerpsupplierpaymenttermssource.settings['hideSubHeader'] =!this.tblerpsupplierpaymenttermssource.settings['hideSubHeader'];
this.tblerpsupplierpaymenttermssource.initGrid();
}
showerpsupplierpaymenttermsInActive()
{
}
enableerpsupplierpaymenttermsInActive()
{
}
async SeterpsupplierpaymenttermsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierpaymentterms){
}
this.bfilterPopulateerpsupplierpaymentterms=true;
}
async erpsupplierpaymenttermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierpaymenttermsTableConfig()
{
this.erpsupplierpaymenttermssettings = {
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
},
};
}
erpsupplierpaymenttermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpaymenttermsID)>=0)
{
this.erpsupplierpaymenttermssource=new LocalDataSource();
this.erpsupplierpaymenttermssource.load(this.erpsupplieritemservice.erpsupplierpaymentterms as  any as LocalDataSource);
this.erpsupplierpaymenttermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierpaymenttermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplieritemservice.erpsupplierpaymentterms.length == 0)
{
    this.tblerpsupplierpaymenttermssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierpaymentterm();
    this.erpsupplieritemservice.erpsupplierpaymentterms.push(obj);
    this.erpsupplierpaymenttermssource.refresh();
    if ((this.erpsupplieritemservice.erpsupplierpaymentterms.length / this.erpsupplierpaymenttermssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierpaymenttermssource.getPaging().page)
    {
        this.erpsupplierpaymenttermssource.setPage((this.erpsupplieritemservice.erpsupplierpaymentterms.length / this.erpsupplierpaymenttermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierpaymenttermssource.grid.edit(this.tblerpsupplierpaymenttermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierpaymenttermssource.data.indexOf(event.data);
this.onDeleteerpsupplierpaymentterm(event,event.data.supplierpaytermid,((this.erpsupplierpaymenttermssource.getPaging().page-1) *this.erpsupplierpaymenttermssource.getPaging().perPage)+index);
this.erpsupplierpaymenttermssource.refresh();
break;
}
}

*/
erpsupplierpaymenttermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierpaymentterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierpaymentterm(event,event.data.supplierpaytermid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierpaymentterm(event,event.data.supplierpaytermid,((this.erpsupplierpaymenttermssource.getPaging().page-1) *this.erpsupplierpaymenttermssource.getPaging().perPage)+event.index);
this.erpsupplierpaymenttermssource.refresh();
break;
}
}
erpsupplierpaymenttermsonDelete(obj) {
let supplierpaytermid=obj.data.supplierpaytermid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplieritemservice.deleteerpsupplieritem(supplierpaytermid).then(res=>
this.erpsupplierpaymenttermsLoadTable()
);
}
}
erpsupplierpaymenttermsPaging(val)
{
debugger;
this.erpsupplierpaymenttermssource.setPaging(1, val, true);
}

handleerpsupplierpaymenttermsGridSelected(event:any) {
this.erpsupplierpaymenttermsselectedindex=this.erpsupplieritemservice.erpsupplierpaymentterms.findIndex(i => i.supplierpaytermid === event.data.supplierpaytermid);
}
IserpsupplierpaymenttermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpaymenttermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierpaymentterms

}



