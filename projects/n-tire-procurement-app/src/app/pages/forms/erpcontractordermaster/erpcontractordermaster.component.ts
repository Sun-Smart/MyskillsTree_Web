import { erpcontractordermasterService } from './../../../service/erpcontractordermaster.service';
import { erpcontractordermaster } from './../../../model/erpcontractordermaster.model';
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
import { bouserbranchaccess} from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { bocontact} from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
import { bocontactService } from '../../../../../../n-tire-bo-app/src/app/service/bocontact.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
//detail table services
import { erpcontractorderterm } from './../../../model/erpcontractorderterm.model';
import { erpcontractordertermComponent } from './../../../pages/forms/erpcontractorderterm/erpcontractorderterm.component';
//FK services
import { erpcontractorderdetail } from './../../../model/erpcontractorderdetail.model';
import { erpcontractorderdetailComponent } from './../../../pages/forms/erpcontractorderdetail/erpcontractorderdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erpcontractorderclause } from './../../../model/erpcontractorderclause.model';
import { erpcontractorderclauseComponent } from './../../../pages/forms/erpcontractorderclause/erpcontractorderclause.component';
//FK services
import { erpcontractclauseComponent } from './../erpcontractclause/erpcontractclause.component';
import { erpcontractclauseService } from './../../../service/erpcontractclause.service';
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
selector: 'app-erpcontractordermaster',
templateUrl: './erpcontractordermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpcontractordermasterComponent implements OnInit {
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
bfilterPopulateerpcontractordermasters:boolean=false;
dataerpcontractordermastersbranchid3:any=[];
dataerpcontractordermasterscontracttype3:any=[];
dataerpcontractordermastersdepartmentid3:any=[];
dataerpcontractordermasterstemplatetype3:any=[];
dataerpcontractordermastersparentid3:any=[];
dataerpcontractordermasterspriority3:any=[];
dataerpcontractordermasterscontracthealth3:any=[];
dataerpcontractordermastersowner3:any=[];
dataerpcontractordermasterssourcereference3:any=[];
dataerpcontractordermasterscontactid3:any=[];
dataerpcontractordermastersextensionoptions3:any=[];
dataerpcontractordermastersprojectid3:any=[];
dataerpcontractordermastersalarm3:any=[];
dataerpcontractordermasterssupplierid3:any=[];
dataerpcontractordertermsrating3:any=[];
dataerpcontractordertermscontractid3:any=[];
bfilterPopulateerpcontractorderterms:boolean=false;
dataerpcontractorderdetailsitemid3:any=[];
dataerpcontractorderdetailstax2name3:any=[];
dataerpcontractorderdetailsdetailtype3:any=[];
dataerpcontractorderdetailstax1name3:any=[];
dataerpcontractorderdetailsdiscounttype3:any=[];
dataerpcontractorderdetailssupplierid3:any=[];
dataerpcontractorderdetailspaymenttermtype3:any=[];
dataerpcontractorderdetailscontractid3:any=[];
dataerpcontractorderdetailsbasecurrency3:any=[];
dataerpcontractorderdetailscurrency3:any=[];
dataerpcontractorderdetailsuom3:any=[];
bfilterPopulateerpcontractorderdetails:boolean=false;
dataerpcontractorderclausessupplierid3:any=[];
dataerpcontractorderclausescontractid3:any=[];
bfilterPopulateerpcontractorderclauses:boolean=false;
@ViewChild('tblerpcontractordertermssource',{static:false}) tblerpcontractordertermssource: Ng2SmartTableComponent;
@ViewChild('tblerpcontractorderdetailssource',{static:false}) tblerpcontractorderdetailssource: Ng2SmartTableComponent;
@ViewChild('tblerpcontractorderclausessource',{static:false}) tblerpcontractorderclausessource: Ng2SmartTableComponent;
 erpcontractordermasterForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
contracttypeList: boconfigvalue[];
departmentidList: bomasterdata[];
templatetypeList: boconfigvalue[];
parentidList: erpcontractordermaster[];
priorityList: boconfigvalue[];
contracthealthList: boconfigvalue[];
ownerList: bousermaster[];
owneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
owner_bousermastersForm: FormGroup;//autocomplete
owner_bousermastersoptions:any;//autocomplete
owner_bousermastersformatter:any;//autocomplete
sourcereferenceList: erpsuppliermaster[];
sourcereferenceoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
sourcereference_erpsuppliermastersForm: FormGroup;//autocomplete
sourcereference_erpsuppliermastersoptions:any;//autocomplete
sourcereference_erpsuppliermastersformatter:any;//autocomplete
contactidList: bocontact[];
extensionoptionsList: boconfigvalue[];
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
alarmList: boconfigvalue[];
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
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
erpcontractordermastershowOption:boolean;
erpcontractordertermshowOption:boolean;
erpcontractorderdetailshowOption:boolean;
erpcontractorderclauseshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpcontractordertermsvisiblelist:any;
erpcontractordertermshidelist:any;
erpcontractorderdetailsvisiblelist:any;
erpcontractorderdetailshidelist:any;
erpcontractorderclausesvisiblelist:any;
erpcontractorderclauseshidelist:any;

DeletederpcontractordertermIDs: string="";
erpcontractordertermsID: string = "1";
erpcontractordertermsselectedindex:any;
DeletederpcontractorderdetailIDs: string="";
erpcontractorderdetailsID: string = "2";
erpcontractorderdetailsselectedindex:any;
DeletederpcontractorderclauseIDs: string="";
erpcontractorderclausesID: string = "3";
erpcontractorderclausesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpcontractordermasterservice: erpcontractordermasterService,
private bousermasterservice: bousermasterService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erpcontractclauseservice: erpcontractclauseService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private bomasterdataservice:bomasterdataService,
private bocontactservice:bocontactService,
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
this.erpcontractordermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
contractid: [null],
branchid: [null],
branchiddesc: [null],
contractname: [null, Validators.required],
contractnumber: [null],
versionnumber: [null],
contractdate: [null, Validators.required],
contracttype: [null, Validators.required],
contracttypedesc: [null],
contractstage: [null],
departmentid: [null],
departmentiddesc: [null],
templatetype: [null],
templatetypedesc: [null],
details: [null, Validators.required],
supportdetails: [null],
parentid: [null],
parentiddesc: [null],
deliverables: [null],
contractvalue: [null, Validators.required],
priority: [null],
prioritydesc: [null],
contracthealth: [null],
contracthealthdesc: [null],
assignedto: [null],
owner: [null],
ownerdesc: [null],
sourcefield: [null],
sourcereference: [null],
sourcereferencedesc: [null],
contactid: [null],
contactiddesc: [null],
effectivedate: [null],
expirationdate: [null],
extensionoptions: [null],
extensionoptionsdesc: [null],
terminationoption: [null],
automaticrenewal: [null],
automaticexpiration: [null],
renewalreminderdate: [null],
contracttemplateid: [null],
terms: [null],
totallistprice: [null],
discount: [null],
total: [null],
shippingcharges: [null],
shippingtax: [null],
shippingtaxamount: [null],
tax: [null],
finalamount: [null],
projectid: [null],
projectiddesc: [null],
liabilitycap: [null],
governinglaw: [null],
terminationforconvenience: [null],
closedsamemonth: [null],
notes: [null],
authorizedby: [null],
overdue: [null],
expirynotification: [null],
alarm: [null],
alarmdesc: [null],
signername: [null],
signeremail: [null],
supplierid: [null],
supplieriddesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpcontractordermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpcontractordermasterForm.dirty && this.erpcontractordermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.contractid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.contractid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.contractid && pkDetail) {
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
let erpcontractordermasterid = null;

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
this.formid=erpcontractordermasterid;
//this.sharedService.alert(erpcontractordermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpcontractordertermsTableConfig();
  setTimeout(() => {
  this.SeterpcontractordertermsTableddConfig();
  });

this.SeterpcontractorderdetailsTableConfig();
  setTimeout(() => {
  this.SeterpcontractorderdetailsTableddConfig();
  });

this.SeterpcontractorderclausesTableConfig();
  setTimeout(() => {
  this.SeterpcontractorderclausesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.erpcontractordermasterservice.formData && this.erpcontractordermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpcontractordermasterForm.patchValue({
    branchid: this.erpcontractordermasterservice.formData.branchid,
    branchiddesc: this.erpcontractordermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpcontractordermasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bouserbranchaccessesformatter = (result: any) => result.branchname;
this.configservice.getList("contracttype").then(res => this.contracttypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("contracttemplatetype").then(res => this.templatetypeList = res as boconfigvalue[]);
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.parentidList = res as erpcontractordermaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("Priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("contracthealth").then(res => this.contracthealthList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.ownerList = res as bousermaster[];
if(this.erpcontractordermasterservice.formData && this.erpcontractordermasterservice.formData.owner){
this.owneroptionsEvent.emit(this.ownerList);
this.erpcontractordermasterForm.patchValue({
    owner: this.erpcontractordermasterservice.formData.owner,
    ownerdesc: this.erpcontractordermasterservice.formData.ownerdesc,
});
}
{
let arrowner = this.ownerList.filter(v => v.userid == this.erpcontractordermasterForm.get('owner').value);
let objowner;
if (arrowner.length > 0) objowner = arrowner[0];
if (objowner)
{
}
}
}
).catch((err) => {console.log(err);});
this.owner_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.owner_bousermastersformatter = (result: any) => result.username;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.sourcereferenceList = res as erpsuppliermaster[];
if(this.erpcontractordermasterservice.formData && this.erpcontractordermasterservice.formData.sourcereference){
this.sourcereferenceoptionsEvent.emit(this.sourcereferenceList);
this.erpcontractordermasterForm.patchValue({
    sourcereference: this.erpcontractordermasterservice.formData.sourcereference,
    sourcereferencedesc: this.erpcontractordermasterservice.formData.sourcereferencedesc,
});
}
{
let arrsourcereference = this.sourcereferenceList.filter(v => v.supplierid == this.erpcontractordermasterForm.get('sourcereference').value);
let objsourcereference;
if (arrsourcereference.length > 0) objsourcereference = arrsourcereference[0];
if (objsourcereference)
{
}
}
}
).catch((err) => {console.log(err);});
this.sourcereference_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.sourcereferenceList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.sourcereference_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.bocontactservice.getbocontactsList().then(res => 
{
this.contactidList = res as bocontact[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("extensionoptions").then(res => this.extensionoptionsList = res as boconfigvalue[]);
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.erpcontractordermasterservice.formData && this.erpcontractordermasterservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.erpcontractordermasterForm.patchValue({
    projectid: this.erpcontractordermasterservice.formData.projectid,
    projectiddesc: this.erpcontractordermasterservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.erpcontractordermasterForm.get('projectid').value);
let objprojectid;
if (arrprojectid.length > 0) objprojectid = arrprojectid[0];
if (objprojectid)
{
}
}
}
).catch((err) => {console.log(err);});
this.projectid_prjprojectmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.projectidList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.projectid_prjprojectmastersformatter = (result: any) => result.projectname;
this.configservice.getList("alarm").then(res => this.alarmList = res as boconfigvalue[]);
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpcontractordermasterservice.formData && this.erpcontractordermasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpcontractordermasterForm.patchValue({
    supplierid: this.erpcontractordermasterservice.formData.supplierid,
    supplieriddesc: this.erpcontractordermasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpcontractordermasterForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
    this.erpcontractordermasterForm.patchValue({ creditdays: objsupplierid.creditdays });
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

//autocomplete
    this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => {
      this.pkList = res as erpcontractordermaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.contractname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.contractname;

//setting the flag that the screen is not touched 
this.erpcontractordermasterForm.markAsUntouched();
this.erpcontractordermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpcontractordermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedowner(ownerDetail: any) {
if (ownerDetail.userid && ownerDetail) {
this.erpcontractordermasterForm.patchValue({
owner: ownerDetail.userid,
ownerdesc: ownerDetail.username,

});

}
}

onSelectedsourcereference(sourcereferenceDetail: any) {
if (sourcereferenceDetail.supplierid && sourcereferenceDetail) {
this.erpcontractordermasterForm.patchValue({
sourcereference: sourcereferenceDetail.supplierid,
sourcereferencedesc: sourcereferenceDetail.suppliercode,

});

}
}

onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.erpcontractordermasterForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpcontractordermasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});
this.erpcontractordermasterForm.patchValue({creditdays:supplieridDetail.creditdays});

}
}




resetForm() {
if (this.erpcontractordermasterForm != null)
this.erpcontractordermasterForm.reset();
this.erpcontractordermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
owner: this.sessiondata.userid,
ownerdesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpcontractordermasterservice.erpcontractorderterms=[];
this.erpcontractordertermsLoadTable();
this.erpcontractordermasterservice.erpcontractorderdetails=[];
this.erpcontractorderdetailsLoadTable();
this.erpcontractordermasterservice.erpcontractorderclauses=[];
this.erpcontractordermasterservice.Inserterpcontractorderclauses=[];
this.erpcontractorderclausesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.erpcontractordermasterForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let contractid = this.erpcontractordermasterForm.get('contractid').value;
        if(contractid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpcontractordermasterservice.deleteerpcontractordermaster(contractid).then(res =>
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
    this.erpcontractordermasterForm.patchValue({
        contractid: null
    });
    if(this.erpcontractordermasterservice.formData.contractid!=null)this.erpcontractordermasterservice.formData.contractid=null;
for (let i=0;i<this.erpcontractordermasterservice.erpcontractorderterms.length;i++) {
this.erpcontractordermasterservice.erpcontractorderterms[i].contracttermid=null;
}
for (let i=0;i<this.erpcontractordermasterservice.erpcontractorderdetails.length;i++) {
this.erpcontractordermasterservice.erpcontractorderdetails[i].contractdetailid=null;
}
for (let i=0;i<this.erpcontractordermasterservice.erpcontractorderclauses.length;i++) {
this.erpcontractordermasterservice.erpcontractorderclauses[i].contractclauseid=null;
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
        else if(key=="contractdate")
this.erpcontractordermasterForm.patchValue({"contractdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.erpcontractordermasterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="effectivedate")
this.erpcontractordermasterForm.patchValue({"effectivedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirationdate")
this.erpcontractordermasterForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="renewalreminderdate")
this.erpcontractordermasterForm.patchValue({"renewalreminderdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpcontractordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpcontractordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpcontractordermasterForm.controls[key]!=undefined)
{
this.erpcontractordermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpcontractordermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erpcontractordermasterservice.formData.contractname!=null )
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
contractidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
contractnameonChange(evt:any){
let e=evt.value;
}
contractnumberonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
contractdateonChange(evt:any){
let e=evt.value;
}
contracttypeonChange(evt:any){
let e=this.f.contracttype.value as any;
this.erpcontractordermasterForm.patchValue({contracttypedesc:evt.options[evt.options.selectedIndex].text});
}
contractstageonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.erpcontractordermasterForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
templatetypeonChange(evt:any){
let e=this.f.templatetype.value as any;
this.erpcontractordermasterForm.patchValue({templatetypedesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
supportdetailsonChange(evt:any){
let e=evt.value;
}
parentidonChange(evt:any){
let e=evt.value;
this.erpcontractordermasterForm.patchValue({parentiddesc:evt.options[evt.options.selectedIndex].text});
}
deliverablesonChange(evt:any){
let e=evt.value;
}
contractvalueonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.erpcontractordermasterForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
contracthealthonChange(evt:any){
let e=this.f.contracthealth.value as any;
this.erpcontractordermasterForm.patchValue({contracthealthdesc:evt.options[evt.options.selectedIndex].text});
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
owneronChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
contactidonChange(evt:any){
let e=evt.value;
this.erpcontractordermasterForm.patchValue({contactiddesc:evt.options[evt.options.selectedIndex].text});
}
effectivedateonChange(evt:any){
let e=evt.value;
}
expirationdateonChange(evt:any){
let e=evt.value;
}
extensionoptionsonChange(evt:any){
let e=this.f.extensionoptions.value as any;
this.erpcontractordermasterForm.patchValue({extensionoptionsdesc:evt.options[evt.options.selectedIndex].text});
}
terminationoptiononChange(evt:any){
let e=evt.value;
}
automaticrenewalonChange(evt:any){
let e=evt.value;
}
automaticexpirationonChange(evt:any){
let e=evt.value;
}
renewalreminderdateonChange(evt:any){
let e=evt.value;
}
contracttemplateidonChange(evt:any){
let e=evt.value;
}
termsonChange(evt:any){
let e=evt.value;
}
totallistpriceonChange(evt:any){
let e=evt.value;
}
discountonChange(evt:any){
let e=evt.value;
}
totalonChange(evt:any){
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
finalamountonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
}
liabilitycaponChange(evt:any){
let e=evt.value;
}
governinglawonChange(evt:any){
let e=evt.value;
}
terminationforconvenienceonChange(evt:any){
let e=evt.value;
}
closedsamemonthonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
authorizedbyonChange(evt:any){
let e=evt.value;
}
overdueonChange(evt:any){
let e=evt.value;
}
expirynotificationonChange(evt:any){
let e=evt.value;
}
alarmonChange(evt:any){
let e=this.f.alarm.value as any;
this.erpcontractordermasterForm.patchValue({alarmdesc:evt.options[evt.options.selectedIndex].text});
}
signernameonChange(evt:any){
let e=evt.value;
}
signeremailonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
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
  


editerpcontractordermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpcontractordermasterservice.geterpcontractordermastersByEID(pkcol).then(res => {

this.erpcontractordermasterservice.formData=res.erpcontractordermaster;
let formproperty=res.erpcontractordermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpcontractordermaster.pkcol;
this.formid=res.erpcontractordermaster.contractid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpcontractordermaster.contractid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpcontractordermasterForm.patchValue({
contractid: res.erpcontractordermaster.contractid,
branchid: res.erpcontractordermaster.branchid,
branchiddesc: res.erpcontractordermaster.branchiddesc,
contractname: res.erpcontractordermaster.contractname,
contractnumber: res.erpcontractordermaster.contractnumber,
versionnumber: res.erpcontractordermaster.versionnumber,
contractdate: this.ngbDateParserFormatter.parse(res.erpcontractordermaster.contractdate),
contracttype: res.erpcontractordermaster.contracttype,
contracttypedesc: res.erpcontractordermaster.contracttypedesc,
contractstage: res.erpcontractordermaster.contractstage,
departmentid: res.erpcontractordermaster.departmentid,
departmentiddesc: res.erpcontractordermaster.departmentiddesc,
templatetype: res.erpcontractordermaster.templatetype,
templatetypedesc: res.erpcontractordermaster.templatetypedesc,
details: res.erpcontractordermaster.details,
supportdetails: res.erpcontractordermaster.supportdetails,
parentid: res.erpcontractordermaster.parentid,
parentiddesc: res.erpcontractordermaster.parentiddesc,
deliverables: res.erpcontractordermaster.deliverables,
contractvalue: res.erpcontractordermaster.contractvalue,
priority: res.erpcontractordermaster.priority,
prioritydesc: res.erpcontractordermaster.prioritydesc,
contracthealth: res.erpcontractordermaster.contracthealth,
contracthealthdesc: res.erpcontractordermaster.contracthealthdesc,
assignedto: JSON.parse(res.erpcontractordermaster.assignedto),
owner: res.erpcontractordermaster.owner,
ownerdesc: res.erpcontractordermaster.ownerdesc,
sourcefield: res.erpcontractordermaster.sourcefield,
sourcereference: res.erpcontractordermaster.sourcereference,
sourcereferencedesc: res.erpcontractordermaster.sourcereferencedesc,
contactid: res.erpcontractordermaster.contactid,
contactiddesc: res.erpcontractordermaster.contactiddesc,
effectivedate: this.ngbDateParserFormatter.parse(res.erpcontractordermaster.effectivedate),
expirationdate: this.ngbDateParserFormatter.parse(res.erpcontractordermaster.expirationdate),
extensionoptions: res.erpcontractordermaster.extensionoptions,
extensionoptionsdesc: res.erpcontractordermaster.extensionoptionsdesc,
terminationoption: res.erpcontractordermaster.terminationoption,
automaticrenewal: res.erpcontractordermaster.automaticrenewal,
automaticexpiration: res.erpcontractordermaster.automaticexpiration,
renewalreminderdate: this.ngbDateParserFormatter.parse(res.erpcontractordermaster.renewalreminderdate),
contracttemplateid: res.erpcontractordermaster.contracttemplateid,
terms: res.erpcontractordermaster.terms,
totallistprice: res.erpcontractordermaster.totallistprice,
discount: res.erpcontractordermaster.discount,
total: res.erpcontractordermaster.total,
shippingcharges: res.erpcontractordermaster.shippingcharges,
shippingtax: res.erpcontractordermaster.shippingtax,
shippingtaxamount: res.erpcontractordermaster.shippingtaxamount,
tax: res.erpcontractordermaster.tax,
finalamount: res.erpcontractordermaster.finalamount,
projectid: res.erpcontractordermaster.projectid,
projectiddesc: res.erpcontractordermaster.projectiddesc,
liabilitycap: res.erpcontractordermaster.liabilitycap,
governinglaw: res.erpcontractordermaster.governinglaw,
terminationforconvenience: res.erpcontractordermaster.terminationforconvenience,
closedsamemonth: res.erpcontractordermaster.closedsamemonth,
notes: res.erpcontractordermaster.notes,
authorizedby: res.erpcontractordermaster.authorizedby,
overdue: res.erpcontractordermaster.overdue,
expirynotification: res.erpcontractordermaster.expirynotification,
alarm: res.erpcontractordermaster.alarm,
alarmdesc: res.erpcontractordermaster.alarmdesc,
signername: res.erpcontractordermaster.signername,
signeremail: res.erpcontractordermaster.signeremail,
supplierid: res.erpcontractordermaster.supplierid,
supplieriddesc: res.erpcontractordermaster.supplieriddesc,
customfield: res.erpcontractordermaster.customfield,
attachment: JSON.parse(res.erpcontractordermaster.attachment),
status: res.erpcontractordermaster.status,
statusdesc: res.erpcontractordermaster.statusdesc,
});
this.erpcontractordertermsvisiblelist=res.erpcontractordertermsvisiblelist;
this.erpcontractorderdetailsvisiblelist=res.erpcontractorderdetailsvisiblelist;
this.erpcontractorderclausesvisiblelist=res.erpcontractorderclausesvisiblelist;
if(this.erpcontractordermasterForm.get('customfield').value!=null && this.erpcontractordermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpcontractordermasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpcontractordermasterForm.get('attachment').value!=null && this.erpcontractordermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpcontractordermasterForm.get('attachment').value);
//Child Tables if any
this.erpcontractordermasterservice.erpcontractorderterms = res.erpcontractorderterms;
this.SeterpcontractordertermsTableConfig();
this.erpcontractordertermsLoadTable();
  setTimeout(() => {
  this.SeterpcontractordertermsTableddConfig();
  });
this.erpcontractordermasterservice.erpcontractorderdetails = res.erpcontractorderdetails;
this.SeterpcontractorderdetailsTableConfig();
this.erpcontractorderdetailsLoadTable();
  setTimeout(() => {
  this.SeterpcontractorderdetailsTableddConfig();
  });
this.erpcontractordermasterservice.erpcontractorderclauses = res.erpcontractorderclauses;
this.SeterpcontractorderclausesTableConfig();
this.erpcontractorderclausesLoadTable();
  setTimeout(() => {
  this.SeterpcontractorderclausesTableddConfig();
  });
this.erpcontractordermasterservice.Inserterpcontractorderclauses=[];
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
  for (let key in this.erpcontractordermasterForm.controls) {
    if (this.erpcontractordermasterForm.controls[key] != null) {
if(false)
{
if(this.erpcontractordermasterservice.formData!=null && this.erpcontractordermasterservice.formData[key]!=null  && this.erpcontractordermasterservice.formData[key]!='[]' && this.erpcontractordermasterservice.formData[key]!=undefined && this.erpcontractordermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpcontractordermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpcontractordermasterservice.formData!=null && this.erpcontractordermasterservice.formData[key]!=null   && this.erpcontractordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpcontractordermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpcontractordermasterservice.formData!=null && this.erpcontractordermasterservice.formData[key]!=null   && this.erpcontractordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpcontractordermasterservice.formData[key]+"'><div class='progress__number'>"+this.erpcontractordermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpcontractordermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpcontractordermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpcontractordermasterForm.value;
obj.contractdate=new Date(this.erpcontractordermasterForm.get('contractdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('contractdate').value)+'  UTC' :null);
if(this.erpcontractordermasterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.erpcontractordermasterForm.get('assignedto').value);
obj.effectivedate=new Date(this.erpcontractordermasterForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('effectivedate').value)+'  UTC' :null);
obj.expirationdate=new Date(this.erpcontractordermasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('expirationdate').value)+'  UTC' :null);
obj.renewalreminderdate=new Date(this.erpcontractordermasterForm.get('renewalreminderdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('renewalreminderdate').value)+'  UTC' :null);
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

private erpcontractordermastertoggleOption(){
this.erpcontractordermastershowOption = this.erpcontractordermastershowOption === true ? false : true;
}

private erpcontractordertermtoggleOption(){
this.erpcontractordertermshowOption = this.erpcontractordertermshowOption === true ? false : true;
}

private erpcontractorderdetailtoggleOption(){
this.erpcontractorderdetailshowOption = this.erpcontractorderdetailshowOption === true ? false : true;
}

private erpcontractorderclausetoggleOption(){
this.erpcontractorderclauseshowOption = this.erpcontractorderclauseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpcontractordermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpcontractordermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpcontractordermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpcontractordermasterservice.formData=this.erpcontractordermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpcontractordermasterForm.controls[key] != null)
    {
        this.erpcontractordermasterservice.formData[key] = this.erpcontractordermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpcontractordermasterservice.formData.contractdate=new Date(this.erpcontractordermasterForm.get('contractdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('contractdate').value)+'  UTC' :null);
if(this.erpcontractordermasterForm.get('assignedto').value!=null)this.erpcontractordermasterservice.formData.assignedto=JSON.stringify(this.erpcontractordermasterForm.get('assignedto').value);
this.erpcontractordermasterservice.formData.effectivedate=new Date(this.erpcontractordermasterForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('effectivedate').value)+'  UTC' :null);
this.erpcontractordermasterservice.formData.expirationdate=new Date(this.erpcontractordermasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('expirationdate').value)+'  UTC' :null);
this.erpcontractordermasterservice.formData.renewalreminderdate=new Date(this.erpcontractordermasterForm.get('renewalreminderdate').value ? this.ngbDateParserFormatter.format(this.erpcontractordermasterForm.get('renewalreminderdate').value)+'  UTC' :null);
if(customfields!=null)this.erpcontractordermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpcontractordermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpcontractordermasterservice.formData.DeletederpcontractordertermIDs = this.DeletederpcontractordertermIDs;
this.erpcontractordermasterservice.formData.DeletederpcontractorderdetailIDs = this.DeletederpcontractorderdetailIDs;
this.erpcontractordermasterservice.formData.DeletederpcontractorderclauseIDs = this.DeletederpcontractorderclauseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpcontractordermasterservice.formData);
this.erpcontractordermasterservice.formData=this.erpcontractordermasterForm.value;
this.erpcontractordermasterservice.saveOrUpdateerpcontractordermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpcontractordertermssource.data)
{
    for (let i = 0; i < this.erpcontractordertermssource.data.length; i++)
    {
        if (this.erpcontractordertermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpcontractordertermssource.data[i].fileattachmentlist);
    }
}
if (this.erpcontractorderdetailssource.data)
{
    for (let i = 0; i < this.erpcontractorderdetailssource.data.length; i++)
    {
        if (this.erpcontractorderdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpcontractorderdetailssource.data[i].fileattachmentlist);
    }
}
if (this.erpcontractorderclausessource.data)
{
    for (let i = 0; i < this.erpcontractorderclausessource.data.length; i++)
    {
        if (this.erpcontractorderclausessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpcontractorderclausessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractordermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpcontractordermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractordermaster);
}
else
{
this.FillData(res);
}
}
this.erpcontractordermasterForm.markAsUntouched();
this.erpcontractordermasterForm.markAsPristine();
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
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.erpcontractordermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpcontractordermasterForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparentid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.erpcontractordermasterForm.get('parentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditowner( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpcontractordermasterForm.get('owner').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsourcereference( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpcontractordermasterForm.get('sourcereference').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontactid( contactid) {
/*let ScreenType='2';
this.dialog.open(bocontactComponent, 
{
data: {contactid:this.erpcontractordermasterForm.get('contactid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erpcontractordermasterForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpcontractordermasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpcontractorderterm(event:any,contracttermid:any, contractid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpcontractordertermComponent, 
{
data:  {  showview:false,save:false,event,contracttermid, contractid,visiblelist:this.erpcontractordertermsvisiblelist,  hidelist:this.erpcontractordertermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpcontractordertermssource.add(res);
this.erpcontractordertermssource.refresh();
}
else
{
this.erpcontractordertermssource.update(event.data, res);
}
}
});
}

onDeleteerpcontractorderterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpcontractordertermIDs += childID + ",";
this.erpcontractordermasterservice.erpcontractorderterms.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpcontractorderdetail(event:any,contractdetailid:any, contractid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpcontractorderdetailComponent, 
{
data:  {  showview:false,save:false,event,contractdetailid, contractid,visiblelist:this.erpcontractorderdetailsvisiblelist,  hidelist:this.erpcontractorderdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpcontractorderdetailssource.add(res);
this.erpcontractorderdetailssource.refresh();
}
else
{
this.erpcontractorderdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpcontractorderdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpcontractorderdetailIDs += childID + ",";
this.erpcontractordermasterservice.erpcontractorderdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpcontractorderterms
erpcontractordertermssettings:any;
erpcontractordertermssource: any;

showerpcontractordertermsCheckbox()
{
debugger;
if(this.tblerpcontractordertermssource.settings['selectMode']== 'multi')this.tblerpcontractordertermssource.settings['selectMode']= 'single';
else
this.tblerpcontractordertermssource.settings['selectMode']= 'multi';
this.tblerpcontractordertermssource.initGrid();
}
deleteerpcontractordertermsAll()
{
this.tblerpcontractordertermssource.settings['selectMode'] = 'single';
}
showerpcontractordertermsFilter()
{
  setTimeout(() => {
  this.SeterpcontractordertermsTableddConfig();
  });
      if(this.tblerpcontractordertermssource.settings!=null)this.tblerpcontractordertermssource.settings['hideSubHeader'] =!this.tblerpcontractordertermssource.settings['hideSubHeader'];
this.tblerpcontractordertermssource.initGrid();
}
showerpcontractordertermsInActive()
{
}
enableerpcontractordertermsInActive()
{
}
async SeterpcontractordertermsTableddConfig()
{
if(!this.bfilterPopulateerpcontractorderterms){

this.erpcontractordermasterservice.geterpcontractordermastersList().then(res=>
{
var datacontractid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpcontractordertermscontractid3.push(defaultobj);
for(let i=0; i<datacontractid2.length; i++){
var obj= { value: datacontractid2[i].contractid, title:datacontractid2[i].contractname};
this.dataerpcontractordertermscontractid3.push(obj);
}
if((this.tblerpcontractordertermssource.settings as any).columns['contractid'])
{
(this.tblerpcontractordertermssource.settings as any).columns['contractid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpcontractordertermscontractid3));
this.tblerpcontractordertermssource.initGrid();
}
});

this.configservice.getList("rating").then(res=>
{
var datarating2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpcontractordertermsrating3.push(defaultobj);
for(let i=0; i<datarating2.length; i++){
var obj= { value: datarating2[i].configkey, title: datarating2[i].configtext};
this.dataerpcontractordertermsrating3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpcontractordertermssource.settings);
if(clone.columns['rating']!=undefined)clone.columns['rating'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractordertermsrating3)), }, };
if(clone.columns['rating']!=undefined)clone.columns['rating'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractordertermsrating3)), }, };
this.tblerpcontractordertermssource.settings =  clone;
this.tblerpcontractordertermssource.initGrid();
});
}
this.bfilterPopulateerpcontractorderterms=true;
}
async erpcontractordertermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpcontractordertermsTableConfig()
{
this.erpcontractordertermssettings = {
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
terms: {
title: 'Terms',
type: '',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
return ret;
},
},
targetdate: {
title: 'Target Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualdate: {
title: 'Actual Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
rating: {
title: 'Rating',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpcontractordertermsrating3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
erpcontractordertermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractordertermsID)>=0)
{
this.erpcontractordertermssource=new LocalDataSource();
this.erpcontractordertermssource.load(this.erpcontractordermasterservice.erpcontractorderterms as  any as LocalDataSource);
this.erpcontractordertermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpcontractordertermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpcontractordermasterservice.erpcontractorderterms.length == 0)
{
    this.tblerpcontractordertermssource.grid.createFormShown = true;
}
else
{
    let obj = new erpcontractorderterm();
    this.erpcontractordermasterservice.erpcontractorderterms.push(obj);
    this.erpcontractordertermssource.refresh();
    if ((this.erpcontractordermasterservice.erpcontractorderterms.length / this.erpcontractordertermssource.getPaging().perPage).toFixed(0) + 1 != this.erpcontractordertermssource.getPaging().page)
    {
        this.erpcontractordertermssource.setPage((this.erpcontractordermasterservice.erpcontractorderterms.length / this.erpcontractordertermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpcontractordertermssource.grid.edit(this.tblerpcontractordertermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpcontractordertermssource.data.indexOf(event.data);
this.onDeleteerpcontractorderterm(event,event.data.contracttermid,((this.erpcontractordertermssource.getPaging().page-1) *this.erpcontractordertermssource.getPaging().perPage)+index);
this.erpcontractordertermssource.refresh();
break;
}
}

*/
erpcontractordertermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpcontractorderterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpcontractorderterm(event,event.data.contracttermid,this.formid);
break;
case 'delete':
this.onDeleteerpcontractorderterm(event,event.data.contracttermid,((this.erpcontractordertermssource.getPaging().page-1) *this.erpcontractordertermssource.getPaging().perPage)+event.index);
this.erpcontractordertermssource.refresh();
break;
}
}
erpcontractordertermsonDelete(obj) {
let contracttermid=obj.data.contracttermid;
if (confirm('Are you sure to delete this record ?')) {
this.erpcontractordermasterservice.deleteerpcontractordermaster(contracttermid).then(res=>
this.erpcontractordertermsLoadTable()
);
}
}
erpcontractordertermsPaging(val)
{
debugger;
this.erpcontractordertermssource.setPaging(1, val, true);
}

handleerpcontractordertermsGridSelected(event:any) {
this.erpcontractordertermsselectedindex=this.erpcontractordermasterservice.erpcontractorderterms.findIndex(i => i.contracttermid === event.data.contracttermid);
}
IserpcontractordertermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractordertermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpcontractorderterms
//start of Grid Codes erpcontractorderdetails
erpcontractorderdetailssettings:any;
erpcontractorderdetailssource: any;

showerpcontractorderdetailsCheckbox()
{
debugger;
if(this.tblerpcontractorderdetailssource.settings['selectMode']== 'multi')this.tblerpcontractorderdetailssource.settings['selectMode']= 'single';
else
this.tblerpcontractorderdetailssource.settings['selectMode']= 'multi';
this.tblerpcontractorderdetailssource.initGrid();
}
deleteerpcontractorderdetailsAll()
{
this.tblerpcontractorderdetailssource.settings['selectMode'] = 'single';
}
showerpcontractorderdetailsFilter()
{
  setTimeout(() => {
  this.SeterpcontractorderdetailsTableddConfig();
  });
      if(this.tblerpcontractorderdetailssource.settings!=null)this.tblerpcontractorderdetailssource.settings['hideSubHeader'] =!this.tblerpcontractorderdetailssource.settings['hideSubHeader'];
this.tblerpcontractorderdetailssource.initGrid();
}
showerpcontractorderdetailsInActive()
{
}
enableerpcontractorderdetailsInActive()
{
}
async SeterpcontractorderdetailsTableddConfig()
{
if(!this.bfilterPopulateerpcontractorderdetails){

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpcontractorderdetailsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.dataerpcontractorderdetailsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpcontractorderdetailssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractorderdetailsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractorderdetailsuom3)), }, };
this.tblerpcontractorderdetailssource.settings =  clone;
this.tblerpcontractorderdetailssource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpcontractorderdetailscurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.dataerpcontractorderdetailscurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpcontractorderdetailssource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractorderdetailscurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpcontractorderdetailscurrency3)), }, };
this.tblerpcontractorderdetailssource.settings =  clone;
this.tblerpcontractorderdetailssource.initGrid();
});
}
this.bfilterPopulateerpcontractorderdetails=true;
}
async erpcontractorderdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpcontractorderdetailsTableConfig()
{
this.erpcontractorderdetailssettings = {
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
service: {
title: 'Service',
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpcontractorderdetailsuom3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpcontractorderdetailscurrency3.find(c=>c.value==cell);
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
type: 'number',
filter:true,
},
discounttype: {
title: 'Discount Type',
type: '',
filter:true,
},
saleprice: {
title: 'Sale Price',
type: 'number',
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
},
};
}
erpcontractorderdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractorderdetailsID)>=0)
{
this.erpcontractorderdetailssource=new LocalDataSource();
this.erpcontractorderdetailssource.load(this.erpcontractordermasterservice.erpcontractorderdetails as  any as LocalDataSource);
this.erpcontractorderdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpcontractorderdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpcontractordermasterservice.erpcontractorderdetails.length == 0)
{
    this.tblerpcontractorderdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpcontractorderdetail();
    this.erpcontractordermasterservice.erpcontractorderdetails.push(obj);
    this.erpcontractorderdetailssource.refresh();
    if ((this.erpcontractordermasterservice.erpcontractorderdetails.length / this.erpcontractorderdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpcontractorderdetailssource.getPaging().page)
    {
        this.erpcontractorderdetailssource.setPage((this.erpcontractordermasterservice.erpcontractorderdetails.length / this.erpcontractorderdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpcontractorderdetailssource.grid.edit(this.tblerpcontractorderdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpcontractorderdetailssource.data.indexOf(event.data);
this.onDeleteerpcontractorderdetail(event,event.data.contractdetailid,((this.erpcontractorderdetailssource.getPaging().page-1) *this.erpcontractorderdetailssource.getPaging().perPage)+index);
this.erpcontractorderdetailssource.refresh();
break;
}
}

*/
erpcontractorderdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpcontractorderdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpcontractorderdetail(event,event.data.contractdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpcontractorderdetail(event,event.data.contractdetailid,((this.erpcontractorderdetailssource.getPaging().page-1) *this.erpcontractorderdetailssource.getPaging().perPage)+event.index);
this.erpcontractorderdetailssource.refresh();
break;
}
}
erpcontractorderdetailsonDelete(obj) {
let contractdetailid=obj.data.contractdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpcontractordermasterservice.deleteerpcontractordermaster(contractdetailid).then(res=>
this.erpcontractorderdetailsLoadTable()
);
}
}
erpcontractorderdetailsPaging(val)
{
debugger;
this.erpcontractorderdetailssource.setPaging(1, val, true);
}

handleerpcontractorderdetailsGridSelected(event:any) {
this.erpcontractorderdetailsselectedindex=this.erpcontractordermasterservice.erpcontractorderdetails.findIndex(i => i.contractdetailid === event.data.contractdetailid);
}
IserpcontractorderdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractorderdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpcontractorderdetails
//start of Grid Codes erpcontractorderclauses
onCustomerpcontractorderclausesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(erpcontractclauseComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
erpcontractorderclausessettings:any;
erpcontractorderclausessource: any;

showerpcontractorderclausesCheckbox()
{
debugger;
if(this.tblerpcontractorderclausessource.settings['selectMode']== 'multi')this.tblerpcontractorderclausessource.settings['selectMode']= 'single';
else
this.tblerpcontractorderclausessource.settings['selectMode']= 'multi';
this.tblerpcontractorderclausessource.initGrid();
}
deleteerpcontractorderclausesAll()
{
this.tblerpcontractorderclausessource.settings['selectMode'] = 'single';
}
showerpcontractorderclausesFilter()
{
  setTimeout(() => {
  this.SeterpcontractorderclausesTableddConfig();
  });
      if(this.tblerpcontractorderclausessource.settings!=null)this.tblerpcontractorderclausessource.settings['hideSubHeader'] =!this.tblerpcontractorderclausessource.settings['hideSubHeader'];
this.tblerpcontractorderclausessource.initGrid();
}
showerpcontractorderclausesInActive()
{
}
enableerpcontractorderclausesInActive()
{
}
async SeterpcontractorderclausesTableddConfig()
{
if(!this.bfilterPopulateerpcontractorderclauses){
}
this.bfilterPopulateerpcontractorderclauses=true;
}
async erpcontractorderclausesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpcontractorderclausesTableConfig()
{
this.erpcontractorderclausessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
contractclauseid: {
title: 'Contract Clause',
type: '',
},
clauseid: {
title: 'Clause',
type: '',
},
referencenumber: {
title: 'Referencenumber',
type: '',
},
details: {
title: 'Details',
type: '',
},
},
};
}
erpcontractorderclausesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractorderclausesID)>=0)
{
this.erpcontractorderclausessource=new LocalDataSource();
this.erpcontractorderclausessource.load(this.erpcontractordermasterservice.erpcontractorderclauses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblerpcontractorderclausessource!=null)
{this.tblerpcontractorderclausessource.grid.getRows().forEach((row:any) => {
if(row.data.contractclauseid!=null && row.data.contractclauseid!="")
{
this.erpcontractordermasterservice.Inserterpcontractorderclauses.push(row.data);
this.tblerpcontractorderclausessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
erpcontractorderclausesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpcontractordermasterservice.erpcontractorderclauses.length == 0)
{
    this.tblerpcontractorderclausessource.grid.createFormShown = true;
}
else
{
    let obj = new erpcontractorderclause();
    this.erpcontractordermasterservice.erpcontractorderclauses.push(obj);
    this.erpcontractorderclausessource.refresh();
    if ((this.erpcontractordermasterservice.erpcontractorderclauses.length / this.erpcontractorderclausessource.getPaging().perPage).toFixed(0) + 1 != this.erpcontractorderclausessource.getPaging().page)
    {
        this.erpcontractorderclausessource.setPage((this.erpcontractordermasterservice.erpcontractorderclauses.length / this.erpcontractorderclausessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpcontractorderclausessource.grid.edit(this.tblerpcontractorderclausessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpcontractorderclausessource.data.indexOf(event.data);
this.onDeleteerpcontractorderclause(event,event.data.contractclauseid,((this.erpcontractorderclausessource.getPaging().page-1) *this.erpcontractorderclausessource.getPaging().perPage)+index);
this.erpcontractorderclausessource.refresh();
break;
}
}

*/
erpcontractorderclausesPaging(val)
{
debugger;
this.erpcontractorderclausessource.setPaging(1, val, true);
}

handleerpcontractorderclausesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.contractclauseid==null || event.data.contractclauseid=="")
{
var obj={contractid:this.formid,clauseid:event.data.clauseid}
this.erpcontractordermasterservice.Inserterpcontractorderclauses.push(obj as any);
}
else
{
var deletedids=this.DeletederpcontractorderclauseIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.contractclauseid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.contractclauseid!=null && event.data.contractclauseid!="")this.DeletederpcontractorderclauseIDs += event.data.contractclauseid + ","; 
}
}
IserpcontractorderclausesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpcontractorderclausesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpcontractorderclauses

}



