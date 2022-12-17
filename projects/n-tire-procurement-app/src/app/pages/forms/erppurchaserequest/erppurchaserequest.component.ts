import { erppurchaserequestService } from './../../../service/erppurchaserequest.service';
import { erppurchaserequest } from './../../../model/erppurchaserequest.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
//popups
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//popups
//detail table services
import { erppurchaserequestdetail } from './../../../model/erppurchaserequestdetail.model';
import { erppurchaserequestdetailComponent } from './../../../pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.component';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { erpfaaccountmaster,IerpfaaccountmasterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
import { erprfqmaster,IerprfqmasterResponse } from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erppurchaserequest',
templateUrl: './erppurchaserequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchaserequestComponent implements OnInit {
showworkflow: boolean = false;
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
bfilterPopulateerppurchaserequests:boolean=false;
dataerppurchaserequestsbranchid3:any=[];
dataerppurchaserequestsdepartmentid3:any=[];
dataerppurchaserequestsprsid3:any=[];
dataerppurchaserequestsrequestedby3:any=[];
dataerppurchaserequestsprojectid3:any=[];
dataerppurchaserequestsdeliverylocationid3:any=[];
dataerppurchaserequestspurchasereason3:any=[];
dataerppurchaserequestscriticality3:any=[];
dataerppurchaserequestsprstype3:any=[];
dataerppurchaserequestsprscategory3:any=[];
dataerppurchaserequestssupplierid3:any=[];
dataerppurchaserequestscostcenterid3:any=[];
dataerppurchaserequestspoid3:any=[];
dataerppurchaserequestsdeliverystatus3:any=[];
dataerppurchaserequestsapprovalstatus3:any=[];
dataerppurchaserequestsprsstatus3:any=[];
dataerppurchaserequestdetailsitemcategory3:any=[];
dataerppurchaserequestdetailsitemsubcategory3:any=[];
dataerppurchaserequestdetailssupplierid3:any=[];
dataerppurchaserequestdetailsapprovedby3:any=[];
dataerppurchaserequestdetailsaccountid3:any=[];
dataerppurchaserequestdetailsprsid3:any=[];
dataerppurchaserequestdetailsrfqid3:any=[];
dataerppurchaserequestdetailsuom3:any=[];
dataerppurchaserequestdetailspoid3:any=[];
dataerppurchaserequestdetailsitemid3:any=[];
dataerppurchaserequestdetailsapprovalstatus3:any=[];
dataerppurchaserequestdetailscurrencyid3:any=[];
bfilterPopulateerppurchaserequestdetails:boolean=false;
@ViewChild('tblerppurchaserequestdetailssource',{static:false}) tblerppurchaserequestdetailssource: Ng2SmartTableComponent;
 erppurchaserequestForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
prsidList: erppurchaserequest[];
prsidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
prsid_erppurchaserequestsForm: FormGroup;//autocomplete
prsid_erppurchaserequestsoptions:any;//autocomplete
prsid_erppurchaserequestsformatter:any;//autocomplete
requestedbyList: bousermaster[];
requestedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestedby_bousermastersForm: FormGroup;//autocomplete
requestedby_bousermastersoptions:any;//autocomplete
requestedby_bousermastersformatter:any;//autocomplete
projectidList: prjprojectmaster[];
deliverylocationidList: bobranchlocation[];
deliverylocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverylocationid_bobranchlocationsForm: FormGroup;//autocomplete
deliverylocationid_bobranchlocationsoptions:any;//autocomplete
deliverylocationid_bobranchlocationsformatter:any;//autocomplete
purchasereasonList: boconfigvalue[];
criticalityList: boconfigvalue[];
prstypeList: boconfigvalue[];
prscategoryList: boconfigvalue[];
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
costcenteridList: erpfacostcenter[];
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
deliverystatusList: boconfigvalue[];
approvalstatusList: boconfigvalue[];
prsstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erppurchaserequestshowOption:boolean;
erppurchaserequestdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erppurchaserequestdetailsvisiblelist:any;
erppurchaserequestdetailshidelist:any;

DeletederppurchaserequestdetailIDs: string="";
erppurchaserequestdetailsID: string = "1";
erppurchaserequestdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erppurchaserequestservice: erppurchaserequestService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private bousermasterservice: bousermasterService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private erprfqmasterservice: erprfqmasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erpitemmasterservice: erpitemmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private prjprojectmasterservice:prjprojectmasterService,
private bobranchlocationservice:bobranchlocationService,
private erpfacostcenterservice:erpfacostcenterService,
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
this.erppurchaserequestForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
departmentid: [null],
departmentiddesc: [null],
prsid: [null],
prsiddesc: [null],
prscode: [null],
reference: [null],
prsdate: [null],
description: [null],
requireddate: [null],
requestedby: [null],
requestedbydesc: [null],
projectid: [null],
projectiddesc: [null],
deliverylocationid: [null],
deliverylocationiddesc: [null],
purchasereason: [null],
purchasereasondesc: [null],
criticality: [null],
criticalitydesc: [null],
notes: [null],
prstype: [null],
prstypedesc: [null],
prscategory: [null],
prscategorydesc: [null],
supplierid: [null],
supplieriddesc: [null],
costcenterid: [null],
costcenteriddesc: [null],
requestedtotalcost: [null],
prsremarks: [null],
status: [null],
statusdesc: [null],
poid: [null],
poiddesc: [null],
deliverystatus: [null],
deliverystatusdesc: [null],
expecteddeliverydate: [null],
delivered: [null],
packinglistno: [null],
approvalstatus: [null],
approvalstatusdesc: [null],
approvedby: [null],
prsstatus: [null],
prsstatusdesc: [null],
});
}

get f() { return this.erppurchaserequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchaserequestForm.dirty && this.erppurchaserequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.prsid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.prsid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.prsid && pkDetail) {
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
let erppurchaserequestid = null;

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
this.formid=erppurchaserequestid;
//this.sharedService.alert(erppurchaserequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterppurchaserequestdetailsTableConfig();
  setTimeout(() => {
  this.SeterppurchaserequestdetailsTableddConfig();
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
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erppurchaserequestForm.patchValue({
    branchid: this.erppurchaserequestservice.formData.branchid,
    branchiddesc: this.erppurchaserequestservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erppurchaserequestForm.get('branchid').value);
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
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.erppurchaserequestservice.geterppurchaserequestsList().then(res => 
{
this.prsidList = res as erppurchaserequest[];
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.prsid){
this.prsidoptionsEvent.emit(this.prsidList);
this.erppurchaserequestForm.patchValue({
    prsid: this.erppurchaserequestservice.formData.prsid,
    prsiddesc: this.erppurchaserequestservice.formData.prsiddesc,
});
}
{
let arrprsid = this.prsidList.filter(v => v.prsid == this.erppurchaserequestForm.get('prsid').value);
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
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestedbyList = res as bousermaster[];
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.requestedby){
this.requestedbyoptionsEvent.emit(this.requestedbyList);
this.erppurchaserequestForm.patchValue({
    requestedby: this.erppurchaserequestservice.formData.requestedby,
    requestedbydesc: this.erppurchaserequestservice.formData.requestedbydesc,
});
}
{
let arrrequestedby = this.requestedbyList.filter(v => v.userid == this.erppurchaserequestForm.get('requestedby').value);
let objrequestedby;
if (arrrequestedby.length > 0) objrequestedby = arrrequestedby[0];
if (objrequestedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestedby_bousermastersformatter = (result: any) => result.username;
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
}
).catch((err) => {console.log(err);});
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.deliverylocationidList = res as bobranchlocation[];
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.deliverylocationid){
this.deliverylocationidoptionsEvent.emit(this.deliverylocationidList);
this.erppurchaserequestForm.patchValue({
    deliverylocationid: this.erppurchaserequestservice.formData.deliverylocationid,
    deliverylocationiddesc: this.erppurchaserequestservice.formData.deliverylocationiddesc,
});
}
{
let arrdeliverylocationid = this.deliverylocationidList.filter(v => v.locationid == this.erppurchaserequestForm.get('deliverylocationid').value);
let objdeliverylocationid;
if (arrdeliverylocationid.length > 0) objdeliverylocationid = arrdeliverylocationid[0];
if (objdeliverylocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.deliverylocationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.deliverylocationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.deliverylocationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.configservice.getList("requestcategory").then(res => this.purchasereasonList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("prsmode").then(res => this.prstypeList = res as boconfigvalue[]);
this.configservice.getList("prscategory").then(res => this.prscategoryList = res as boconfigvalue[]);
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erppurchaserequestForm.patchValue({
    supplierid: this.erppurchaserequestservice.formData.supplierid,
    supplieriddesc: this.erppurchaserequestservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erppurchaserequestForm.get('supplierid').value);
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
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenteridList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erppurchaserequestservice.formData && this.erppurchaserequestservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchaserequestForm.patchValue({
    poid: this.erppurchaserequestservice.formData.poid,
    poiddesc: this.erppurchaserequestservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchaserequestForm.get('poid').value);
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
this.configservice.getList("deliverystatus").then(res => this.deliverystatusList = res as boconfigvalue[]);
this.configservice.getList("approvalstatus").then(res => this.approvalstatusList = res as boconfigvalue[]);
this.configservice.getList("prsstatus").then(res => this.prsstatusList = res as boconfigvalue[]);

//autocomplete
    this.erppurchaserequestservice.geterppurchaserequestsList().then(res => {
      this.pkList = res as erppurchaserequest[];
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
this.erppurchaserequestForm.markAsUntouched();
this.erppurchaserequestForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erppurchaserequestForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedprsid(prsidDetail: any) {
if (prsidDetail.prsid && prsidDetail) {
this.erppurchaserequestForm.patchValue({
prsid: prsidDetail.prsid,
prsiddesc: prsidDetail.prscode,

});

}
}

onSelectedrequestedby(requestedbyDetail: any) {
if (requestedbyDetail.userid && requestedbyDetail) {
this.erppurchaserequestForm.patchValue({
requestedby: requestedbyDetail.userid,
requestedbydesc: requestedbyDetail.username,

});

}
}

onSelecteddeliverylocationid(deliverylocationidDetail: any) {
if (deliverylocationidDetail.locationid && deliverylocationidDetail) {
this.erppurchaserequestForm.patchValue({
deliverylocationid: deliverylocationidDetail.locationid,
deliverylocationiddesc: deliverylocationidDetail.locationname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erppurchaserequestForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchaserequestForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}




resetForm() {
if (this.erppurchaserequestForm != null)
this.erppurchaserequestForm.reset();
this.erppurchaserequestForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
requestedby: this.sessiondata.userid,
requestedbydesc: this.sessiondata.username,
});
this.erppurchaserequestForm.patchValue({
prsdate: this.ngbDateParserFormatter.parse(new Date().toString()),
requireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
expecteddeliverydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.erppurchaserequestservice.erppurchaserequestdetails=[];
this.erppurchaserequestdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let prsid = this.erppurchaserequestForm.get('prsid').value;
        if(prsid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchaserequestservice.deleteerppurchaserequest(prsid).then(res =>
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
    this.erppurchaserequestForm.patchValue({
        prsid: null
    });
    if(this.erppurchaserequestservice.formData.prsid!=null)this.erppurchaserequestservice.formData.prsid=null;
for (let i=0;i<this.erppurchaserequestservice.erppurchaserequestdetails.length;i++) {
this.erppurchaserequestservice.erppurchaserequestdetails[i].prsdetailid=null;
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
        else if(key=="prsdate")
this.erppurchaserequestForm.patchValue({"prsdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requireddate")
this.erppurchaserequestForm.patchValue({"requireddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expecteddeliverydate")
this.erppurchaserequestForm.patchValue({"expecteddeliverydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erppurchaserequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchaserequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchaserequestForm.controls[key]!=undefined)
{
this.erppurchaserequestForm.controls[key].disable({onlySelf: true});
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
departmentidonChange(evt:any){
let e=evt.value;
this.erppurchaserequestForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
prsidonChange(evt:any){
let e=evt.value;
}
prscodeonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
prsdateonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
requireddateonChange(evt:any){
let e=evt.value;
}
requestedbyonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
this.erppurchaserequestForm.patchValue({projectiddesc:evt.options[evt.options.selectedIndex].text});
}
deliverylocationidonChange(evt:any){
let e=evt.value;
}
purchasereasononChange(evt:any){
let e=this.f.purchasereason.value as any;
this.erppurchaserequestForm.patchValue({purchasereasondesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.erppurchaserequestForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
prstypeonChange(evt:any){
let e=this.f.prstype.value as any;
this.erppurchaserequestForm.patchValue({prstypedesc:evt.options[evt.options.selectedIndex].text});
}
prscategoryonChange(evt:any){
let e=this.f.prscategory.value as any;
this.erppurchaserequestForm.patchValue({prscategorydesc:evt.options[evt.options.selectedIndex].text});
}
supplieridonChange(evt:any){
let e=evt.value;
}
costcenteridonChange(evt:any){
let e=evt.value;
this.erppurchaserequestForm.patchValue({costcenteriddesc:evt.options[evt.options.selectedIndex].text});
}
requestedtotalcostonChange(evt:any){
let e=evt.value;
}
prsremarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
let e=evt.value;
}
deliverystatusonChange(evt:any){
let e=this.f.deliverystatus.value as any;
this.erppurchaserequestForm.patchValue({deliverystatusdesc:evt.options[evt.options.selectedIndex].text});
}
expecteddeliverydateonChange(evt:any){
let e=evt.value;
}
deliveredonChange(evt:any){
let e=evt.value;
}
packinglistnoonChange(evt:any){
let e=evt.value;
}
approvalstatusonChange(evt:any){
let e=this.f.approvalstatus.value as any;
this.erppurchaserequestForm.patchValue({approvalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
approvedbyonChange(evt:any){
let e=evt.value;
}
prsstatusonChange(evt:any){
let e=this.f.prsstatus.value as any;
this.erppurchaserequestForm.patchValue({prsstatusdesc:evt.options[evt.options.selectedIndex].text});
}

editerppurchaserequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchaserequestservice.geterppurchaserequestsByEID(pkcol).then(res => {

this.erppurchaserequestservice.formData=res.erppurchaserequest;
let formproperty=res.erppurchaserequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchaserequest.pkcol;
this.formid=res.erppurchaserequest.prsid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchaserequest.prsid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchaserequestForm.patchValue({
branchid: res.erppurchaserequest.branchid,
branchiddesc: res.erppurchaserequest.branchiddesc,
departmentid: res.erppurchaserequest.departmentid,
departmentiddesc: res.erppurchaserequest.departmentiddesc,
prsid: res.erppurchaserequest.prsid,
prsiddesc: res.erppurchaserequest.prsiddesc,
prscode: res.erppurchaserequest.prscode,
reference: res.erppurchaserequest.reference,
prsdate: this.ngbDateParserFormatter.parse(res.erppurchaserequest.prsdate),
description: res.erppurchaserequest.description,
requireddate: this.ngbDateParserFormatter.parse(res.erppurchaserequest.requireddate),
requestedby: res.erppurchaserequest.requestedby,
requestedbydesc: res.erppurchaserequest.requestedbydesc,
projectid: res.erppurchaserequest.projectid,
projectiddesc: res.erppurchaserequest.projectiddesc,
deliverylocationid: res.erppurchaserequest.deliverylocationid,
deliverylocationiddesc: res.erppurchaserequest.deliverylocationiddesc,
purchasereason: res.erppurchaserequest.purchasereason,
purchasereasondesc: res.erppurchaserequest.purchasereasondesc,
criticality: res.erppurchaserequest.criticality,
criticalitydesc: res.erppurchaserequest.criticalitydesc,
notes: res.erppurchaserequest.notes,
prstype: res.erppurchaserequest.prstype,
prstypedesc: res.erppurchaserequest.prstypedesc,
prscategory: res.erppurchaserequest.prscategory,
prscategorydesc: res.erppurchaserequest.prscategorydesc,
supplierid: res.erppurchaserequest.supplierid,
supplieriddesc: res.erppurchaserequest.supplieriddesc,
costcenterid: res.erppurchaserequest.costcenterid,
costcenteriddesc: res.erppurchaserequest.costcenteriddesc,
requestedtotalcost: res.erppurchaserequest.requestedtotalcost,
prsremarks: res.erppurchaserequest.prsremarks,
status: res.erppurchaserequest.status,
statusdesc: res.erppurchaserequest.statusdesc,
poid: res.erppurchaserequest.poid,
poiddesc: res.erppurchaserequest.poiddesc,
deliverystatus: res.erppurchaserequest.deliverystatus,
deliverystatusdesc: res.erppurchaserequest.deliverystatusdesc,
expecteddeliverydate: this.ngbDateParserFormatter.parse(res.erppurchaserequest.expecteddeliverydate),
delivered: res.erppurchaserequest.delivered,
packinglistno: res.erppurchaserequest.packinglistno,
approvalstatus: res.erppurchaserequest.approvalstatus,
approvalstatusdesc: res.erppurchaserequest.approvalstatusdesc,
approvedby: res.erppurchaserequest.approvedby,
prsstatus: res.erppurchaserequest.prsstatus,
prsstatusdesc: res.erppurchaserequest.prsstatusdesc,
});
this.erppurchaserequestdetailsvisiblelist=res.erppurchaserequestdetailsvisiblelist;
                    this.showworkflow=true;
                this.showsubmit = false;
if(res.erppurchaserequest.status=="N" || res.erppurchaserequest.status=="P")this.showsubmit=true;
if(res.erppurchaserequest.status=="N")this.showGoWorkFlow = true;
//Child Tables if any
this.erppurchaserequestservice.erppurchaserequestdetails = res.erppurchaserequestdetails;
this.SeterppurchaserequestdetailsTableConfig();
this.erppurchaserequestdetailsLoadTable();
  setTimeout(() => {
  this.SeterppurchaserequestdetailsTableddConfig();
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
  for (let key in this.erppurchaserequestForm.controls) {
    if (this.erppurchaserequestForm.controls[key] != null) {
if(false)
{
if(this.erppurchaserequestservice.formData!=null && this.erppurchaserequestservice.formData[key]!=null  && this.erppurchaserequestservice.formData[key]!='[]' && this.erppurchaserequestservice.formData[key]!=undefined && this.erppurchaserequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchaserequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchaserequestservice.formData!=null && this.erppurchaserequestservice.formData[key]!=null   && this.erppurchaserequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchaserequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchaserequestservice.formData!=null && this.erppurchaserequestservice.formData[key]!=null   && this.erppurchaserequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchaserequestservice.formData[key]+"'><div class='progress__number'>"+this.erppurchaserequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchaserequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchaserequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erppurchaserequestForm.value;
obj.prsdate=new Date(this.erppurchaserequestForm.get('prsdate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('prsdate').value)+'  UTC' :null);
obj.requireddate=new Date(this.erppurchaserequestForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('requireddate').value)+'  UTC' :null);
obj.expecteddeliverydate=new Date(this.erppurchaserequestForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('expecteddeliverydate').value)+'  UTC' :null);
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

private erppurchaserequesttoggleOption(){
this.erppurchaserequestshowOption = this.erppurchaserequestshowOption === true ? false : true;
}

private erppurchaserequestdetailtoggleOption(){
this.erppurchaserequestdetailshowOption = this.erppurchaserequestdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchaserequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchaserequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchaserequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchaserequestservice.formData=this.erppurchaserequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchaserequestForm.controls[key] != null)
    {
        this.erppurchaserequestservice.formData[key] = this.erppurchaserequestForm.controls[key].value;
    }
}
}
}
this.erppurchaserequestservice.formData.prsdate=new Date(this.erppurchaserequestForm.get('prsdate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('prsdate').value)+'  UTC' :null);
this.erppurchaserequestservice.formData.requireddate=new Date(this.erppurchaserequestForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('requireddate').value)+'  UTC' :null);
this.erppurchaserequestservice.formData.expecteddeliverydate=new Date(this.erppurchaserequestForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchaserequestForm.get('expecteddeliverydate').value)+'  UTC' :null);
this.erppurchaserequestservice.formData.DeletederppurchaserequestdetailIDs = this.DeletederppurchaserequestdetailIDs;
console.log(this.erppurchaserequestservice.formData);
this.erppurchaserequestservice.formData=this.erppurchaserequestForm.value;
this.erppurchaserequestservice.saveOrUpdateerppurchaserequests().subscribe(
async res => {
if (this.erppurchaserequestdetailssource.data)
{
    for (let i = 0; i < this.erppurchaserequestdetailssource.data.length; i++)
    {
        if (this.erppurchaserequestdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erppurchaserequestdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaserequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchaserequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaserequest);
}
else
{
this.FillData(res);
}
}
this.erppurchaserequestForm.markAsUntouched();
this.erppurchaserequestForm.markAsPristine();
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
data: {branchid:this.erppurchaserequestForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erppurchaserequestForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprsid( prsid) {
/*let ScreenType='2';
this.dialog.open(erppurchaserequestComponent, 
{
data: {prsid:this.erppurchaserequestForm.get('prsid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erppurchaserequestForm.get('requestedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erppurchaserequestForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverylocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.erppurchaserequestForm.get('deliverylocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erppurchaserequestForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenterid( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erppurchaserequestForm.get('costcenterid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erppurchaserequestForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerppurchaserequestdetail(event:any,prsdetailid:any, prsid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erppurchaserequestdetailComponent, 
{
data:  {  showview:false,save:false,event,prsdetailid, prsid,visiblelist:this.erppurchaserequestdetailsvisiblelist,  hidelist:this.erppurchaserequestdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erppurchaserequestdetailssource.add(res);
this.erppurchaserequestdetailssource.refresh();
}
else
{
this.erppurchaserequestdetailssource.update(event.data, res);
}
}
});
}

onDeleteerppurchaserequestdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederppurchaserequestdetailIDs += childID + ",";
this.erppurchaserequestservice.erppurchaserequestdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erppurchaserequestdetails
erppurchaserequestdetailssettings:any;
erppurchaserequestdetailssource: any;

showerppurchaserequestdetailsCheckbox()
{
debugger;
if(this.tblerppurchaserequestdetailssource.settings['selectMode']== 'multi')this.tblerppurchaserequestdetailssource.settings['selectMode']= 'single';
else
this.tblerppurchaserequestdetailssource.settings['selectMode']= 'multi';
this.tblerppurchaserequestdetailssource.initGrid();
}
deleteerppurchaserequestdetailsAll()
{
this.tblerppurchaserequestdetailssource.settings['selectMode'] = 'single';
}
showerppurchaserequestdetailsFilter()
{
  setTimeout(() => {
  this.SeterppurchaserequestdetailsTableddConfig();
  });
      if(this.tblerppurchaserequestdetailssource.settings!=null)this.tblerppurchaserequestdetailssource.settings['hideSubHeader'] =!this.tblerppurchaserequestdetailssource.settings['hideSubHeader'];
this.tblerppurchaserequestdetailssource.initGrid();
}
showerppurchaserequestdetailsInActive()
{
}
enableerppurchaserequestdetailsInActive()
{
}
async SeterppurchaserequestdetailsTableddConfig()
{
if(!this.bfilterPopulateerppurchaserequestdetails){

this.configservice.getList("currencyid").then(res=>
{
var datacurrencyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaserequestdetailscurrencyid3.push(defaultobj);
for(let i=0; i<datacurrencyid2.length; i++){
var obj= { value: datacurrencyid2[i].configkey, title: datacurrencyid2[i].configtext};
this.dataerppurchaserequestdetailscurrencyid3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaserequestdetailssource.settings);
if(clone.columns['currencyid']!=undefined)clone.columns['currencyid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaserequestdetailscurrencyid3)), }, };
if(clone.columns['currencyid']!=undefined)clone.columns['currencyid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaserequestdetailscurrencyid3)), }, };
this.tblerppurchaserequestdetailssource.settings =  clone;
this.tblerppurchaserequestdetailssource.initGrid();
});

this.configservice.getList("approvalstatus").then(res=>
{
var dataapprovalstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaserequestdetailsapprovalstatus3.push(defaultobj);
for(let i=0; i<dataapprovalstatus2.length; i++){
var obj= { value: dataapprovalstatus2[i].configkey, title: dataapprovalstatus2[i].configtext};
this.dataerppurchaserequestdetailsapprovalstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaserequestdetailssource.settings);
if(clone.columns['approvalstatus']!=undefined)clone.columns['approvalstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaserequestdetailsapprovalstatus3)), }, };
if(clone.columns['approvalstatus']!=undefined)clone.columns['approvalstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaserequestdetailsapprovalstatus3)), }, };
this.tblerppurchaserequestdetailssource.settings =  clone;
this.tblerppurchaserequestdetailssource.initGrid();
});
}
this.bfilterPopulateerppurchaserequestdetails=true;
}
async erppurchaserequestdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterppurchaserequestdetailsTableConfig()
{
this.erppurchaserequestdetailssettings = {
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
itemcategory: {
title: 'Item Category',
type: 'number',
filter:true,
},
itemsubcategory: {
title: 'Item Sub Category',
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
details: {
title: 'Details',
type: '',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: '',
filter:true,
},
requiredbefore: {
title: 'Required Before',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
prsremarks: {
title: 'P R S Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
currencyid: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaserequestdetailscurrencyid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
cost: {
title: 'Cost',
type: 'number',
filter:true,
},
totalcost: {
title: 'Total Cost',
type: 'number',
filter:true,
},
tax1: {
title: 'Tax1',
type: '',
filter:true,
},
tax2: {
title: 'Tax2',
type: '',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: '',
filter:true,
},
netamount: {
title: 'Net Amount',
type: 'number',
filter:true,
},
budget: {
title: 'Budget',
type: 'number',
filter:true,
},
used: {
title: 'Used',
type: 'number',
filter:true,
},
available: {
title: 'Available',
type: 'number',
filter:true,
},
rfqid: {
title: 'R F Q',
type: 'number',
filter:true,
},
poid: {
title: 'P O',
type: 'number',
filter:true,
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
accountid: {
title: 'Account',
type: 'number',
filter:true,
},
approvalstatus: {
title: 'Approval Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaserequestdetailsapprovalstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
approvedby: {
title: 'Approved By',
type: 'number',
filter:true,
},
},
};
}
erppurchaserequestdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaserequestdetailsID)>=0)
{
this.erppurchaserequestdetailssource=new LocalDataSource();
this.erppurchaserequestdetailssource.load(this.erppurchaserequestservice.erppurchaserequestdetails as  any as LocalDataSource);
this.erppurchaserequestdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erppurchaserequestdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erppurchaserequestservice.erppurchaserequestdetails.length == 0)
{
    this.tblerppurchaserequestdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erppurchaserequestdetail();
    this.erppurchaserequestservice.erppurchaserequestdetails.push(obj);
    this.erppurchaserequestdetailssource.refresh();
    if ((this.erppurchaserequestservice.erppurchaserequestdetails.length / this.erppurchaserequestdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erppurchaserequestdetailssource.getPaging().page)
    {
        this.erppurchaserequestdetailssource.setPage((this.erppurchaserequestservice.erppurchaserequestdetails.length / this.erppurchaserequestdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerppurchaserequestdetailssource.grid.edit(this.tblerppurchaserequestdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erppurchaserequestdetailssource.data.indexOf(event.data);
this.onDeleteerppurchaserequestdetail(event,event.data.prsdetailid,((this.erppurchaserequestdetailssource.getPaging().page-1) *this.erppurchaserequestdetailssource.getPaging().perPage)+index);
this.erppurchaserequestdetailssource.refresh();
break;
}
}

*/
erppurchaserequestdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerppurchaserequestdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerppurchaserequestdetail(event,event.data.prsdetailid,this.formid);
break;
case 'delete':
this.onDeleteerppurchaserequestdetail(event,event.data.prsdetailid,((this.erppurchaserequestdetailssource.getPaging().page-1) *this.erppurchaserequestdetailssource.getPaging().perPage)+event.index);
this.erppurchaserequestdetailssource.refresh();
break;
}
}
erppurchaserequestdetailsonDelete(obj) {
let prsdetailid=obj.data.prsdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erppurchaserequestservice.deleteerppurchaserequest(prsdetailid).then(res=>
this.erppurchaserequestdetailsLoadTable()
);
}
}
erppurchaserequestdetailsPaging(val)
{
debugger;
this.erppurchaserequestdetailssource.setPaging(1, val, true);
}

handleerppurchaserequestdetailsGridSelected(event:any) {
this.erppurchaserequestdetailsselectedindex=this.erppurchaserequestservice.erppurchaserequestdetails.findIndex(i => i.prsdetailid === event.data.prsdetailid);
}
IserppurchaserequestdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaserequestdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erppurchaserequestdetails

}



