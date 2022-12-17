import { erptendermasterService } from './../../../service/erptendermaster.service';
import { erptendermaster } from './../../../model/erptendermaster.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
//detail table services
import { erptendercompliance } from './../../../model/erptendercompliance.model';
import { erptendercomplianceComponent } from './../../../pages/forms/erptendercompliance/erptendercompliance.component';
//FK services
import { erpsalesordermaster,IerpsalesordermasterResponse } from './../../../model/erpsalesordermaster.model';
import { erpsalesordermasterComponent } from './../../../pages/forms/erpsalesordermaster/erpsalesordermaster.component';
import { erpsalesordermasterService } from './../../../service/erpsalesordermaster.service';
import { erptenderquotationmaster } from './../../../model/erptenderquotationmaster.model';
import { erptenderquotationmasterComponent } from './../../../pages/forms/erptenderquotationmaster/erptenderquotationmaster.component';
//FK services
import { erptendersupplierresponse } from './../../../model/erptendersupplierresponse.model';
import { erptendersupplierresponseComponent } from './../../../pages/forms/erptendersupplierresponse/erptendersupplierresponse.component';
//FK services
import { erptenderaccess } from './../../../model/erptenderaccess.model';
import { erptenderaccessComponent } from './../../../pages/forms/erptenderaccess/erptenderaccess.component';
//FK services
import { bousergroup,IbousergroupResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousergroup.model';
import { bousergroupComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousergroup/bousergroup.component';
import { bousergroupService } from '../../../../../../n-tire-bo-app/src/app/service/bousergroup.service';
import { erptendercorrigendum } from './../../../model/erptendercorrigendum.model';
import { erptendercorrigendumComponent } from './../../../pages/forms/erptendercorrigendum/erptendercorrigendum.component';
//FK services
import { erptenderdetail } from './../../../model/erptenderdetail.model';
import { erptenderdetailComponent } from './../../../pages/forms/erptenderdetail/erptenderdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptenderquestion } from './../../../model/erptenderquestion.model';
import { erptenderquestionComponent } from './../../../pages/forms/erptenderquestion/erptenderquestion.component';
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
selector: 'app-erptendermaster',
templateUrl: './erptendermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptendermasterComponent implements OnInit {
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
bfilterPopulateerptendermasters:boolean=false;
dataerptendermastersbiddingtype3:any=[];
dataerptendermasterstendercategory3:any=[];
dataerptendermasterstendertype3:any=[];
dataerptendermastersbiddingsystem3:any=[];
dataerptendermasterscompletionperiodunit3:any=[];
dataerptendermastersdepartment3:any=[];
dataerptendermastersbiddingstyle3:any=[];
dataerptendermastersbiddingunit3:any=[];
dataerptendermasterscontracttype3:any=[];
dataerptendermastersdeliverytime3:any=[];
dataerptendermastersdeliveryterms3:any=[];
dataerptendermastersbidrankingorder3:any=[];
dataerptendermastersresponsiblebranchid3:any=[];
dataerptendermastersdeliverybranchid3:any=[];
dataerptendermasterssupplierid3:any=[];
dataerptendercompliancescompliancetype3:any=[];
dataerptendercompliancessoid3:any=[];
dataerptendercompliancestenderid3:any=[];
bfilterPopulateerptendercompliances:boolean=false;
dataerptenderquotationmasterssoid3:any=[];
dataerptenderquotationmasterssupplierid3:any=[];
dataerptenderquotationmasterspaymentterms3:any=[];
dataerptenderquotationmasterstenderid3:any=[];
bfilterPopulateerptenderquotationmasters:boolean=false;
dataerptendersupplierresponsessupplierid3:any=[];
dataerptendersupplierresponsessoid3:any=[];
dataerptendersupplierresponsestenderid3:any=[];
bfilterPopulateerptendersupplierresponses:boolean=false;
dataerptenderaccessessoid3:any=[];
dataerptenderaccessesusergroupid3:any=[];
dataerptenderaccessestenderid3:any=[];
bfilterPopulateerptenderaccesses:boolean=false;
dataerptendercorrigendumssoid3:any=[];
dataerptendercorrigendumstenderid3:any=[];
bfilterPopulateerptendercorrigendums:boolean=false;
dataerptenderdetailsitemid3:any=[];
dataerptenderdetailsfinalsupplierid3:any=[];
dataerptenderdetailssoid3:any=[];
dataerptenderdetailsuom3:any=[];
dataerptenderdetailscurrency3:any=[];
dataerptenderdetailstenderid3:any=[];
bfilterPopulateerptenderdetails:boolean=false;
dataerptenderquestionssoid3:any=[];
dataerptenderquestionstenderid3:any=[];
bfilterPopulateerptenderquestions:boolean=false;
@ViewChild('tblerptendercompliancessource',{static:false}) tblerptendercompliancessource: Ng2SmartTableComponent;
@ViewChild('tblerptenderquotationmasterssource',{static:false}) tblerptenderquotationmasterssource: Ng2SmartTableComponent;
@ViewChild('tblerptendersupplierresponsessource',{static:false}) tblerptendersupplierresponsessource: Ng2SmartTableComponent;
@ViewChild('tblerptenderaccessessource',{static:false}) tblerptenderaccessessource: Ng2SmartTableComponent;
@ViewChild('tblerptendercorrigendumssource',{static:false}) tblerptendercorrigendumssource: Ng2SmartTableComponent;
@ViewChild('tblerptenderdetailssource',{static:false}) tblerptenderdetailssource: Ng2SmartTableComponent;
@ViewChild('tblerptenderquestionssource',{static:false}) tblerptenderquestionssource: Ng2SmartTableComponent;
 erptendermasterForm: FormGroup;
biddingtypeList: boconfigvalue[];
tendercategoryList: boconfigvalue[];
tendertypeList: boconfigvalue[];
biddingsystemList: boconfigvalue[];
completionperiodunitList: boconfigvalue[];
departmentList: bomasterdata[];
biddingstyleList: boconfigvalue[];
biddingunitList: boconfigvalue[];
contracttypeList: boconfigvalue[];
deliverytimeList: boconfigvalue[];
deliverytermsList: boconfigvalue[];
bidrankingorderList: boconfigvalue[];
responsiblebranchidList: bobranchmaster[];
responsiblebranchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
responsiblebranchid_bobranchmastersForm: FormGroup;//autocomplete
responsiblebranchid_bobranchmastersoptions:any;//autocomplete
responsiblebranchid_bobranchmastersformatter:any;//autocomplete
deliverybranchidList: bobranchmaster[];
deliverybranchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverybranchid_bobranchmastersForm: FormGroup;//autocomplete
deliverybranchid_bobranchmastersoptions:any;//autocomplete
deliverybranchid_bobranchmastersformatter:any;//autocomplete
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
erptendermastershowOption:boolean;
erptendercomplianceshowOption:boolean;
erptenderquotationmastershowOption:boolean;
erptendersupplierresponseshowOption:boolean;
erptenderaccessshowOption:boolean;
erptendercorrigendumshowOption:boolean;
erptenderdetailshowOption:boolean;
erptenderquestionshowOption:boolean;
sessiondata:any;
sourcekey:any;



erptendercompliancesvisiblelist:any;
erptendercomplianceshidelist:any;
erptenderquotationmastersvisiblelist:any;
erptenderquotationmastershidelist:any;
erptendersupplierresponsesvisiblelist:any;
erptendersupplierresponseshidelist:any;
erptenderaccessesvisiblelist:any;
erptenderaccesseshidelist:any;
erptendercorrigendumsvisiblelist:any;
erptendercorrigendumshidelist:any;
erptenderdetailsvisiblelist:any;
erptenderdetailshidelist:any;
erptenderquestionsvisiblelist:any;
erptenderquestionshidelist:any;

DeletederptendercomplianceIDs: string="";
erptendercompliancesID: string = "1";
erptendercompliancesselectedindex:any;
DeletederptenderquotationmasterIDs: string="";
erptenderquotationmastersID: string = "2";
erptenderquotationmastersselectedindex:any;
DeletederptendersupplierresponseIDs: string="";
erptendersupplierresponsesID: string = "3";
erptendersupplierresponsesselectedindex:any;
DeletederptenderaccessIDs: string="";
erptenderaccessesID: string = "4";
erptenderaccessesselectedindex:any;
DeletederptendercorrigendumIDs: string="";
erptendercorrigendumsID: string = "5";
erptendercorrigendumsselectedindex:any;
DeletederptenderdetailIDs: string="";
erptenderdetailsID: string = "6";
erptenderdetailsselectedindex:any;
DeletederptenderquestionIDs: string="";
erptenderquestionsID: string = "7";
erptenderquestionsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erptendermasterservice: erptendermasterService,
private bousermasterservice: bousermasterService,
private erpsalesordermasterservice: erpsalesordermasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private bousergroupservice: bousergroupService,
private erpitemmasterservice: erpitemmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bobranchmasterservice:bobranchmasterService,
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
this.erptendermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
tenderid: [null],
tenderdate: [null],
title: [null],
biddingtype: [null],
biddingtypedesc: [null],
tendercategory: [null],
tendercategorydesc: [null],
tendertype: [null],
tendertypedesc: [null],
biddingsystem: [null],
biddingsystemdesc: [null],
details: [null],
startdate: [null],
enddate: [null],
tenderuploaddate: [null],
prebid: [null],
prebiddate: [null],
tendervalue: [null],
earnestmoney: [null],
documentcost: [null],
offervaliditydays: [null],
completionperiod: [null],
completionperiodunit: [null],
completionperiodunitdesc: [null],
department: [null],
departmentdesc: [null],
biddingstyle: [null],
biddingstyledesc: [null],
biddingunit: [null],
biddingunitdesc: [null],
contracttype: [null],
contracttypedesc: [null],
jvallowed: [null],
deliverytime: [null],
deliverytimedesc: [null],
deliveryterms: [null],
deliverytermsdesc: [null],
minbidvalue: [null],
bidrankingorder: [null],
bidrankingorderdesc: [null],
responsiblebranchid: [null],
responsiblebranchiddesc: [null],
deliverybranchid: [null],
deliverybranchiddesc: [null],
assignedto: [null],
visibleall: [null],
instructions: [null],
conditions: [null],
prepaidfreight: [null],
shipcarrier: [null],
internalnotes: [null],
suppliernotes: [null],
autoeliminationrule: [null],
minimumincrement: [null],
initialcoolingoffperiod: [null],
subsequentcoolingoffperiod: [null],
supplierid: [null],
supplieriddesc: [null],
l1: [null],
l2: [null],
l3: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptendermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptendermasterForm.dirty && this.erptendermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.tenderid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.tenderid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.tenderid && pkDetail) {
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
let erptendermasterid = null;

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
this.formid=erptendermasterid;
//this.sharedService.alert(erptendermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterptendercompliancesTableConfig();
  setTimeout(() => {
  this.SeterptendercompliancesTableddConfig();
  });

this.SeterptenderquotationmastersTableConfig();
  setTimeout(() => {
  this.SeterptenderquotationmastersTableddConfig();
  });

this.SeterptendersupplierresponsesTableConfig();
  setTimeout(() => {
  this.SeterptendersupplierresponsesTableddConfig();
  });

this.SeterptenderaccessesTableConfig();
  setTimeout(() => {
  this.SeterptenderaccessesTableddConfig();
  });

this.SeterptendercorrigendumsTableConfig();
  setTimeout(() => {
  this.SeterptendercorrigendumsTableddConfig();
  });

this.SeterptenderdetailsTableConfig();
  setTimeout(() => {
  this.SeterptenderdetailsTableddConfig();
  });

this.SeterptenderquestionsTableConfig();
  setTimeout(() => {
  this.SeterptenderquestionsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("biddingtype").then(res => this.biddingtypeList = res as boconfigvalue[]);
this.configservice.getList("tendercategory").then(res => this.tendercategoryList = res as boconfigvalue[]);
this.configservice.getList("tendertype").then(res => this.tendertypeList = res as boconfigvalue[]);
this.configservice.getList("biddingsystem").then(res => this.biddingsystemList = res as boconfigvalue[]);
this.configservice.getList("period").then(res => this.completionperiodunitList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("biddingstyle").then(res => this.biddingstyleList = res as boconfigvalue[]);
this.configservice.getList("biddingunit").then(res => this.biddingunitList = res as boconfigvalue[]);
this.configservice.getList("contracttype").then(res => this.contracttypeList = res as boconfigvalue[]);
this.configservice.getList("deliverytime").then(res => this.deliverytimeList = res as boconfigvalue[]);
this.configservice.getList("deliveryterms").then(res => this.deliverytermsList = res as boconfigvalue[]);
this.configservice.getList("bidrankingorder").then(res => this.bidrankingorderList = res as boconfigvalue[]);
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.responsiblebranchidList = res as bobranchmaster[];
if(this.erptendermasterservice.formData && this.erptendermasterservice.formData.responsiblebranchid){
this.responsiblebranchidoptionsEvent.emit(this.responsiblebranchidList);
this.erptendermasterForm.patchValue({
    responsiblebranchid: this.erptendermasterservice.formData.responsiblebranchid,
    responsiblebranchiddesc: this.erptendermasterservice.formData.responsiblebranchiddesc,
});
}
{
let arrresponsiblebranchid = this.responsiblebranchidList.filter(v => v.branchid == this.erptendermasterForm.get('responsiblebranchid').value);
let objresponsiblebranchid;
if (arrresponsiblebranchid.length > 0) objresponsiblebranchid = arrresponsiblebranchid[0];
if (objresponsiblebranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.responsiblebranchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.responsiblebranchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.responsiblebranchid_bobranchmastersformatter = (result: any) => result.branchname;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.deliverybranchidList = res as bobranchmaster[];
if(this.erptendermasterservice.formData && this.erptendermasterservice.formData.deliverybranchid){
this.deliverybranchidoptionsEvent.emit(this.deliverybranchidList);
this.erptendermasterForm.patchValue({
    deliverybranchid: this.erptendermasterservice.formData.deliverybranchid,
    deliverybranchiddesc: this.erptendermasterservice.formData.deliverybranchiddesc,
});
}
{
let arrdeliverybranchid = this.deliverybranchidList.filter(v => v.branchid == this.erptendermasterForm.get('deliverybranchid').value);
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
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erptendermasterservice.formData && this.erptendermasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erptendermasterForm.patchValue({
    supplierid: this.erptendermasterservice.formData.supplierid,
    supplieriddesc: this.erptendermasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erptendermasterForm.get('supplierid').value);
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

//autocomplete
    this.erptendermasterservice.geterptendermastersList().then(res => {
      this.pkList = res as erptendermaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.title;

//setting the flag that the screen is not touched 
this.erptendermasterForm.markAsUntouched();
this.erptendermasterForm.markAsPristine();
}
onSelectedresponsiblebranchid(responsiblebranchidDetail: any) {
if (responsiblebranchidDetail.branchid && responsiblebranchidDetail) {
this.erptendermasterForm.patchValue({
responsiblebranchid: responsiblebranchidDetail.branchid,
responsiblebranchiddesc: responsiblebranchidDetail.branchname,

});

}
}

onSelecteddeliverybranchid(deliverybranchidDetail: any) {
if (deliverybranchidDetail.branchid && deliverybranchidDetail) {
this.erptendermasterForm.patchValue({
deliverybranchid: deliverybranchidDetail.branchid,
deliverybranchiddesc: deliverybranchidDetail.branchname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erptendermasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}




resetForm() {
if (this.erptendermasterForm != null)
this.erptendermasterForm.reset();
this.erptendermasterForm.patchValue({
responsiblebranchid: this.sessiondata.branchid,
responsiblebranchiddesc: this.sessiondata.branchiddesc,
deliverybranchid: this.sessiondata.branchid,
deliverybranchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erptendermasterservice.erptendercompliances=[];
this.erptendercompliancesLoadTable();
this.erptendermasterservice.erptenderquotationmasters=[];
this.erptenderquotationmastersLoadTable();
this.erptendermasterservice.erptendersupplierresponses=[];
this.erptendersupplierresponsesLoadTable();
this.erptendermasterservice.erptenderaccesses=[];
this.erptendermasterservice.Inserterptenderaccesses=[];
this.erptenderaccessesLoadTable();
this.erptendermasterservice.erptendercorrigendums=[];
this.erptendercorrigendumsLoadTable();
this.erptendermasterservice.erptenderdetails=[];
this.erptenderdetailsLoadTable();
this.erptendermasterservice.erptenderquestions=[];
this.erptenderquestionsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let tenderid = this.erptendermasterForm.get('tenderid').value;
        if(tenderid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptendermasterservice.deleteerptendermaster(tenderid).then(res =>
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
    this.erptendermasterForm.patchValue({
        tenderid: null
    });
    if(this.erptendermasterservice.formData.tenderid!=null)this.erptendermasterservice.formData.tenderid=null;
for (let i=0;i<this.erptendermasterservice.erptendercompliances.length;i++) {
this.erptendermasterservice.erptendercompliances[i].complianceid=null;
}
for (let i=0;i<this.erptendermasterservice.erptenderquotationmasters.length;i++) {
this.erptendermasterservice.erptenderquotationmasters[i].quotationid=null;
}
for (let i=0;i<this.erptendermasterservice.erptendersupplierresponses.length;i++) {
this.erptendermasterservice.erptendersupplierresponses[i].responseid=null;
}
for (let i=0;i<this.erptendermasterservice.erptenderaccesses.length;i++) {
this.erptendermasterservice.erptenderaccesses[i].accessid=null;
}
for (let i=0;i<this.erptendermasterservice.erptendercorrigendums.length;i++) {
this.erptendermasterservice.erptendercorrigendums[i].corrigendumid=null;
}
for (let i=0;i<this.erptendermasterservice.erptenderdetails.length;i++) {
this.erptendermasterservice.erptenderdetails[i].tenderdetailid=null;
}
for (let i=0;i<this.erptendermasterservice.erptenderquestions.length;i++) {
this.erptendermasterservice.erptenderquestions[i].questionid=null;
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
        else if(key=="tenderdate")
this.erptendermasterForm.patchValue({"tenderdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.erptendermasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.erptendermasterForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="tenderuploaddate")
this.erptendermasterForm.patchValue({"tenderuploaddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="prebiddate")
this.erptendermasterForm.patchValue({"prebiddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.erptendermasterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="initialcoolingoffperiod")
this.erptendermasterForm.patchValue({"initialcoolingoffperiod":new Time(mainscreendata[key]) });
        else if(key=="subsequentcoolingoffperiod")
this.erptendermasterForm.patchValue({"subsequentcoolingoffperiod":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erptendermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptendermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptendermasterForm.controls[key]!=undefined)
{
this.erptendermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erptendermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erptendermasterservice.formData.title!=null )
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
tenderidonChange(evt:any){
let e=evt.value;
}
tenderdateonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
biddingtypeonChange(evt:any){
let e=this.f.biddingtype.value as any;
this.erptendermasterForm.patchValue({biddingtypedesc:evt.options[evt.options.selectedIndex].text});
}
tendercategoryonChange(evt:any){
let e=this.f.tendercategory.value as any;
this.erptendermasterForm.patchValue({tendercategorydesc:evt.options[evt.options.selectedIndex].text});
}
tendertypeonChange(evt:any){
let e=this.f.tendertype.value as any;
this.erptendermasterForm.patchValue({tendertypedesc:evt.options[evt.options.selectedIndex].text});
}
biddingsystemonChange(evt:any){
let e=this.f.biddingsystem.value as any;
this.erptendermasterForm.patchValue({biddingsystemdesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
tenderuploaddateonChange(evt:any){
let e=evt.value;
}
prebidonChange(evt:any){
let e=evt.value;
}
prebiddateonChange(evt:any){
let e=evt.value;
}
tendervalueonChange(evt:any){
let e=evt.value;
}
earnestmoneyonChange(evt:any){
let e=evt.value;
}
documentcostonChange(evt:any){
let e=evt.value;
}
offervaliditydaysonChange(evt:any){
let e=evt.value;
}
completionperiodonChange(evt:any){
let e=evt.value;
}
completionperiodunitonChange(evt:any){
let e=this.f.completionperiodunit.value as any;
this.erptendermasterForm.patchValue({completionperiodunitdesc:evt.options[evt.options.selectedIndex].text});
}
departmentonChange(evt:any){
let e=evt.value;
this.erptendermasterForm.patchValue({departmentdesc:evt.options[evt.options.selectedIndex].text});
}
biddingstyleonChange(evt:any){
let e=this.f.biddingstyle.value as any;
this.erptendermasterForm.patchValue({biddingstyledesc:evt.options[evt.options.selectedIndex].text});
}
biddingunitonChange(evt:any){
let e=this.f.biddingunit.value as any;
this.erptendermasterForm.patchValue({biddingunitdesc:evt.options[evt.options.selectedIndex].text});
}
contracttypeonChange(evt:any){
let e=this.f.contracttype.value as any;
this.erptendermasterForm.patchValue({contracttypedesc:evt.options[evt.options.selectedIndex].text});
}
jvallowedonChange(evt:any){
let e=evt.value;
}
deliverytimeonChange(evt:any){
let e=this.f.deliverytime.value as any;
this.erptendermasterForm.patchValue({deliverytimedesc:evt.options[evt.options.selectedIndex].text});
}
deliverytermsonChange(evt:any){
let e=this.f.deliveryterms.value as any;
this.erptendermasterForm.patchValue({deliverytermsdesc:evt.options[evt.options.selectedIndex].text});
}
minbidvalueonChange(evt:any){
let e=evt.value;
}
bidrankingorderonChange(evt:any){
let e=this.f.bidrankingorder.value as any;
this.erptendermasterForm.patchValue({bidrankingorderdesc:evt.options[evt.options.selectedIndex].text});
}
responsiblebranchidonChange(evt:any){
let e=evt.value;
}
deliverybranchidonChange(evt:any){
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
visibleallonChange(evt:any){
let e=evt.value;
}
instructionsonChange(evt:any){
let e=evt.value;
}
conditionsonChange(evt:any){
let e=evt.value;
}
prepaidfreightonChange(evt:any){
let e=evt.value;
}
shipcarrieronChange(evt:any){
let e=evt.value;
}
internalnotesonChange(evt:any){
let e=evt.value;
}
suppliernotesonChange(evt:any){
let e=evt.value;
}
autoeliminationruleonChange(evt:any){
let e=evt.value;
}
minimumincrementonChange(evt:any){
let e=evt.value;
}
initialcoolingoffperiodonChange(evt:any){
let e=evt.value;
}
subsequentcoolingoffperiodonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
l1onChange(evt:any){
let e=evt.value;
}
l2onChange(evt:any){
let e=evt.value;
}
l3onChange(evt:any){
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
  


editerptendermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptendermasterservice.geterptendermastersByEID(pkcol).then(res => {

this.erptendermasterservice.formData=res.erptendermaster;
let formproperty=res.erptendermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptendermaster.pkcol;
this.formid=res.erptendermaster.tenderid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptendermaster.tenderid;
var initialcoolingoffperiodTime=new Time( res.erptendermaster.initialcoolingoffperiod);
var subsequentcoolingoffperiodTime=new Time( res.erptendermaster.subsequentcoolingoffperiod);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptendermasterForm.patchValue({
tenderid: res.erptendermaster.tenderid,
tenderdate: this.ngbDateParserFormatter.parse(res.erptendermaster.tenderdate),
title: res.erptendermaster.title,
biddingtype: res.erptendermaster.biddingtype,
biddingtypedesc: res.erptendermaster.biddingtypedesc,
tendercategory: res.erptendermaster.tendercategory,
tendercategorydesc: res.erptendermaster.tendercategorydesc,
tendertype: res.erptendermaster.tendertype,
tendertypedesc: res.erptendermaster.tendertypedesc,
biddingsystem: res.erptendermaster.biddingsystem,
biddingsystemdesc: res.erptendermaster.biddingsystemdesc,
details: res.erptendermaster.details,
startdate: this.ngbDateParserFormatter.parse(res.erptendermaster.startdate),
enddate: this.ngbDateParserFormatter.parse(res.erptendermaster.enddate),
tenderuploaddate: this.ngbDateParserFormatter.parse(res.erptendermaster.tenderuploaddate),
prebid: res.erptendermaster.prebid,
prebiddate: this.ngbDateParserFormatter.parse(res.erptendermaster.prebiddate),
tendervalue: res.erptendermaster.tendervalue,
earnestmoney: res.erptendermaster.earnestmoney,
documentcost: res.erptendermaster.documentcost,
offervaliditydays: res.erptendermaster.offervaliditydays,
completionperiod: res.erptendermaster.completionperiod,
completionperiodunit: res.erptendermaster.completionperiodunit,
completionperiodunitdesc: res.erptendermaster.completionperiodunitdesc,
department: res.erptendermaster.department,
departmentdesc: res.erptendermaster.departmentdesc,
biddingstyle: res.erptendermaster.biddingstyle,
biddingstyledesc: res.erptendermaster.biddingstyledesc,
biddingunit: res.erptendermaster.biddingunit,
biddingunitdesc: res.erptendermaster.biddingunitdesc,
contracttype: res.erptendermaster.contracttype,
contracttypedesc: res.erptendermaster.contracttypedesc,
jvallowed: res.erptendermaster.jvallowed,
deliverytime: res.erptendermaster.deliverytime,
deliverytimedesc: res.erptendermaster.deliverytimedesc,
deliveryterms: res.erptendermaster.deliveryterms,
deliverytermsdesc: res.erptendermaster.deliverytermsdesc,
minbidvalue: res.erptendermaster.minbidvalue,
bidrankingorder: res.erptendermaster.bidrankingorder,
bidrankingorderdesc: res.erptendermaster.bidrankingorderdesc,
responsiblebranchid: res.erptendermaster.responsiblebranchid,
responsiblebranchiddesc: res.erptendermaster.responsiblebranchiddesc,
deliverybranchid: res.erptendermaster.deliverybranchid,
deliverybranchiddesc: res.erptendermaster.deliverybranchiddesc,
assignedto: JSON.parse(res.erptendermaster.assignedto),
visibleall: res.erptendermaster.visibleall,
instructions: res.erptendermaster.instructions,
conditions: res.erptendermaster.conditions,
prepaidfreight: res.erptendermaster.prepaidfreight,
shipcarrier: res.erptendermaster.shipcarrier,
internalnotes: res.erptendermaster.internalnotes,
suppliernotes: res.erptendermaster.suppliernotes,
autoeliminationrule: res.erptendermaster.autoeliminationrule,
minimumincrement: res.erptendermaster.minimumincrement,
initialcoolingoffperiod: initialcoolingoffperiodTime,
subsequentcoolingoffperiod: subsequentcoolingoffperiodTime,
supplierid: res.erptendermaster.supplierid,
supplieriddesc: res.erptendermaster.supplieriddesc,
l1: res.erptendermaster.l1,
l2: res.erptendermaster.l2,
l3: res.erptendermaster.l3,
customfield: res.erptendermaster.customfield,
attachment: JSON.parse(res.erptendermaster.attachment),
status: res.erptendermaster.status,
statusdesc: res.erptendermaster.statusdesc,
});
this.erptendercompliancesvisiblelist=res.erptendercompliancesvisiblelist;
this.erptenderquotationmastersvisiblelist=res.erptenderquotationmastersvisiblelist;
this.erptendersupplierresponsesvisiblelist=res.erptendersupplierresponsesvisiblelist;
this.erptenderaccessesvisiblelist=res.erptenderaccessesvisiblelist;
this.erptendercorrigendumsvisiblelist=res.erptendercorrigendumsvisiblelist;
this.erptenderdetailsvisiblelist=res.erptenderdetailsvisiblelist;
this.erptenderquestionsvisiblelist=res.erptenderquestionsvisiblelist;
if(this.erptendermasterForm.get('customfield').value!=null && this.erptendermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erptendermasterForm.get('customfield').value);
this.FillCustomField();
if(this.erptendermasterForm.get('attachment').value!=null && this.erptendermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erptendermasterForm.get('attachment').value);
//Child Tables if any
this.erptendermasterservice.erptendercompliances = res.erptendercompliances;
this.SeterptendercompliancesTableConfig();
this.erptendercompliancesLoadTable();
  setTimeout(() => {
  this.SeterptendercompliancesTableddConfig();
  });
this.erptendermasterservice.erptenderquotationmasters = res.erptenderquotationmasters;
this.SeterptenderquotationmastersTableConfig();
this.erptenderquotationmastersLoadTable();
  setTimeout(() => {
  this.SeterptenderquotationmastersTableddConfig();
  });
this.erptendermasterservice.erptendersupplierresponses = res.erptendersupplierresponses;
this.SeterptendersupplierresponsesTableConfig();
this.erptendersupplierresponsesLoadTable();
  setTimeout(() => {
  this.SeterptendersupplierresponsesTableddConfig();
  });
this.erptendermasterservice.erptenderaccesses = res.erptenderaccesses;
this.SeterptenderaccessesTableConfig();
this.erptenderaccessesLoadTable();
  setTimeout(() => {
  this.SeterptenderaccessesTableddConfig();
  });
this.erptendermasterservice.Inserterptenderaccesses=[];
this.erptendermasterservice.erptendercorrigendums = res.erptendercorrigendums;
this.SeterptendercorrigendumsTableConfig();
this.erptendercorrigendumsLoadTable();
  setTimeout(() => {
  this.SeterptendercorrigendumsTableddConfig();
  });
this.erptendermasterservice.erptenderdetails = res.erptenderdetails;
this.SeterptenderdetailsTableConfig();
this.erptenderdetailsLoadTable();
  setTimeout(() => {
  this.SeterptenderdetailsTableddConfig();
  });
this.erptendermasterservice.erptenderquestions = res.erptenderquestions;
this.SeterptenderquestionsTableConfig();
this.erptenderquestionsLoadTable();
  setTimeout(() => {
  this.SeterptenderquestionsTableddConfig();
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
  for (let key in this.erptendermasterForm.controls) {
    if (this.erptendermasterForm.controls[key] != null) {
if(false)
{
if(this.erptendermasterservice.formData!=null && this.erptendermasterservice.formData[key]!=null  && this.erptendermasterservice.formData[key]!='[]' && this.erptendermasterservice.formData[key]!=undefined && this.erptendermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptendermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptendermasterservice.formData!=null && this.erptendermasterservice.formData[key]!=null   && this.erptendermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptendermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptendermasterservice.formData!=null && this.erptendermasterservice.formData[key]!=null   && this.erptendermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptendermasterservice.formData[key]+"'><div class='progress__number'>"+this.erptendermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptendermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptendermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erptendermasterForm.value;
obj.tenderdate=new Date(this.erptendermasterForm.get('tenderdate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('tenderdate').value)+'  UTC' :null);
obj.startdate=new Date(this.erptendermasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.erptendermasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('enddate').value)+'  UTC' :null);
obj.tenderuploaddate=new Date(this.erptendermasterForm.get('tenderuploaddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('tenderuploaddate').value)+'  UTC' :null);
obj.prebiddate=new Date(this.erptendermasterForm.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('prebiddate').value)+'  UTC' :null);
if(this.erptendermasterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.erptendermasterForm.get('assignedto').value);
obj.initialcoolingoffperiod=(this.erptendermasterForm.get('initialcoolingoffperiod').value==null?0:this.erptendermasterForm.get('initialcoolingoffperiod').value.hour)+':'+(this.erptendermasterForm.get('initialcoolingoffperiod').value==null?0:this.erptendermasterForm.get('initialcoolingoffperiod').value.minute+":00");
obj.subsequentcoolingoffperiod=(this.erptendermasterForm.get('subsequentcoolingoffperiod').value==null?0:this.erptendermasterForm.get('subsequentcoolingoffperiod').value.hour)+':'+(this.erptendermasterForm.get('subsequentcoolingoffperiod').value==null?0:this.erptendermasterForm.get('subsequentcoolingoffperiod').value.minute+":00");
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

private erptendermastertoggleOption(){
this.erptendermastershowOption = this.erptendermastershowOption === true ? false : true;
}

private erptendercompliancetoggleOption(){
this.erptendercomplianceshowOption = this.erptendercomplianceshowOption === true ? false : true;
}

private erptenderquotationmastertoggleOption(){
this.erptenderquotationmastershowOption = this.erptenderquotationmastershowOption === true ? false : true;
}

private erptendersupplierresponsetoggleOption(){
this.erptendersupplierresponseshowOption = this.erptendersupplierresponseshowOption === true ? false : true;
}

private erptenderaccesstoggleOption(){
this.erptenderaccessshowOption = this.erptenderaccessshowOption === true ? false : true;
}

private erptendercorrigendumtoggleOption(){
this.erptendercorrigendumshowOption = this.erptendercorrigendumshowOption === true ? false : true;
}

private erptenderdetailtoggleOption(){
this.erptenderdetailshowOption = this.erptenderdetailshowOption === true ? false : true;
}

private erptenderquestiontoggleOption(){
this.erptenderquestionshowOption = this.erptenderquestionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptendermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptendermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptendermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptendermasterservice.formData=this.erptendermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptendermasterForm.controls[key] != null)
    {
        this.erptendermasterservice.formData[key] = this.erptendermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erptendermasterservice.formData.tenderdate=new Date(this.erptendermasterForm.get('tenderdate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('tenderdate').value)+'  UTC' :null);
this.erptendermasterservice.formData.startdate=new Date(this.erptendermasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('startdate').value)+'  UTC' :null);
this.erptendermasterservice.formData.enddate=new Date(this.erptendermasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('enddate').value)+'  UTC' :null);
this.erptendermasterservice.formData.tenderuploaddate=new Date(this.erptendermasterForm.get('tenderuploaddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('tenderuploaddate').value)+'  UTC' :null);
this.erptendermasterservice.formData.prebiddate=new Date(this.erptendermasterForm.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.erptendermasterForm.get('prebiddate').value)+'  UTC' :null);
if(this.erptendermasterForm.get('assignedto').value!=null)this.erptendermasterservice.formData.assignedto=JSON.stringify(this.erptendermasterForm.get('assignedto').value);
this.erptendermasterservice.formData.initialcoolingoffperiod=(this.erptendermasterForm.get('initialcoolingoffperiod').value==null?0:this.erptendermasterForm.get('initialcoolingoffperiod').value.hour)+':'+(this.erptendermasterForm.get('initialcoolingoffperiod').value==null?0:this.erptendermasterForm.get('initialcoolingoffperiod').value.minute+":00");
this.erptendermasterservice.formData.subsequentcoolingoffperiod=(this.erptendermasterForm.get('subsequentcoolingoffperiod').value==null?0:this.erptendermasterForm.get('subsequentcoolingoffperiod').value.hour)+':'+(this.erptendermasterForm.get('subsequentcoolingoffperiod').value==null?0:this.erptendermasterForm.get('subsequentcoolingoffperiod').value.minute+":00");
if(customfields!=null)this.erptendermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erptendermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erptendermasterservice.formData.DeletederptendercomplianceIDs = this.DeletederptendercomplianceIDs;
this.erptendermasterservice.formData.DeletederptenderquotationmasterIDs = this.DeletederptenderquotationmasterIDs;
this.erptendermasterservice.formData.DeletederptendersupplierresponseIDs = this.DeletederptendersupplierresponseIDs;
this.erptendermasterservice.formData.DeletederptenderaccessIDs = this.DeletederptenderaccessIDs;
this.erptendermasterservice.formData.DeletederptendercorrigendumIDs = this.DeletederptendercorrigendumIDs;
this.erptendermasterservice.formData.DeletederptenderdetailIDs = this.DeletederptenderdetailIDs;
this.erptendermasterservice.formData.DeletederptenderquestionIDs = this.DeletederptenderquestionIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erptendermasterservice.formData);
this.erptendermasterservice.formData=this.erptendermasterForm.value;
this.erptendermasterservice.saveOrUpdateerptendermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erptendercompliancessource.data)
{
    for (let i = 0; i < this.erptendercompliancessource.data.length; i++)
    {
        if (this.erptendercompliancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptendercompliancessource.data[i].fileattachmentlist);
    }
}
if (this.erptenderquotationmasterssource.data)
{
    for (let i = 0; i < this.erptenderquotationmasterssource.data.length; i++)
    {
        if (this.erptenderquotationmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderquotationmasterssource.data[i].fileattachmentlist);
    }
}
if (this.erptendersupplierresponsessource.data)
{
    for (let i = 0; i < this.erptendersupplierresponsessource.data.length; i++)
    {
        if (this.erptendersupplierresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptendersupplierresponsessource.data[i].fileattachmentlist);
    }
}
if (this.erptenderaccessessource.data)
{
    for (let i = 0; i < this.erptenderaccessessource.data.length; i++)
    {
        if (this.erptenderaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderaccessessource.data[i].fileattachmentlist);
    }
}
if (this.erptendercorrigendumssource.data)
{
    for (let i = 0; i < this.erptendercorrigendumssource.data.length; i++)
    {
        if (this.erptendercorrigendumssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptendercorrigendumssource.data[i].fileattachmentlist);
    }
}
if (this.erptenderdetailssource.data)
{
    for (let i = 0; i < this.erptenderdetailssource.data.length; i++)
    {
        if (this.erptenderdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderdetailssource.data[i].fileattachmentlist);
    }
}
if (this.erptenderquestionssource.data)
{
    for (let i = 0; i < this.erptenderquestionssource.data.length; i++)
    {
        if (this.erptenderquestionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderquestionssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptendermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendermaster);
}
else
{
this.FillData(res);
}
}
this.erptendermasterForm.markAsUntouched();
this.erptendermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erptendermasterForm.get('department').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditresponsiblebranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erptendermasterForm.get('responsiblebranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverybranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erptendermasterForm.get('deliverybranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erptendermasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerptendercompliance(event:any,complianceid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptendercomplianceComponent, 
{
data:  {  showview:false,save:false,event,complianceid, tenderid,visiblelist:this.erptendercompliancesvisiblelist,  hidelist:this.erptendercomplianceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptendercompliancessource.add(res);
this.erptendercompliancessource.refresh();
}
else
{
this.erptendercompliancessource.update(event.data, res);
}
}
});
}

onDeleteerptendercompliance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptendercomplianceIDs += childID + ",";
this.erptendermasterservice.erptendercompliances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptenderquotationmaster(event:any,quotationid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptenderquotationmasterComponent, 
{
data:  {  showview:false,save:false,event,quotationid, tenderid,visiblelist:this.erptenderquotationmastersvisiblelist,  hidelist:this.erptenderquotationmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptenderquotationmasterssource.add(res);
this.erptenderquotationmasterssource.refresh();
}
else
{
this.erptenderquotationmasterssource.update(event.data, res);
}
}
});
}

onDeleteerptenderquotationmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptenderquotationmasterIDs += childID + ",";
this.erptendermasterservice.erptenderquotationmasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptendersupplierresponse(event:any,responseid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptendersupplierresponseComponent, 
{
data:  {  showview:false,save:false,event,responseid, tenderid,visiblelist:this.erptendersupplierresponsesvisiblelist,  hidelist:this.erptendersupplierresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptendersupplierresponsessource.add(res);
this.erptendersupplierresponsessource.refresh();
}
else
{
this.erptendersupplierresponsessource.update(event.data, res);
}
}
});
}

onDeleteerptendersupplierresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptendersupplierresponseIDs += childID + ",";
this.erptendermasterservice.erptendersupplierresponses.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptendercorrigendum(event:any,corrigendumid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptendercorrigendumComponent, 
{
data:  {  showview:false,save:false,event,corrigendumid, tenderid,visiblelist:this.erptendercorrigendumsvisiblelist,  hidelist:this.erptendercorrigendumshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptendercorrigendumssource.add(res);
this.erptendercorrigendumssource.refresh();
}
else
{
this.erptendercorrigendumssource.update(event.data, res);
}
}
});
}

onDeleteerptendercorrigendum(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptendercorrigendumIDs += childID + ",";
this.erptendermasterservice.erptendercorrigendums.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptenderdetail(event:any,tenderdetailid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptenderdetailComponent, 
{
data:  {  showview:false,save:false,event,tenderdetailid, tenderid,visiblelist:this.erptenderdetailsvisiblelist,  hidelist:this.erptenderdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptenderdetailssource.add(res);
this.erptenderdetailssource.refresh();
}
else
{
this.erptenderdetailssource.update(event.data, res);
}
}
});
}

onDeleteerptenderdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptenderdetailIDs += childID + ",";
this.erptendermasterservice.erptenderdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptenderquestion(event:any,questionid:any, tenderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptenderquestionComponent, 
{
data:  {  showview:false,save:false,event,questionid, tenderid,visiblelist:this.erptenderquestionsvisiblelist,  hidelist:this.erptenderquestionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptenderquestionssource.add(res);
this.erptenderquestionssource.refresh();
}
else
{
this.erptenderquestionssource.update(event.data, res);
}
}
});
}

onDeleteerptenderquestion(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptenderquestionIDs += childID + ",";
this.erptendermasterservice.erptenderquestions.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erptendercompliances
erptendercompliancessettings:any;
erptendercompliancessource: any;

showerptendercompliancesCheckbox()
{
debugger;
if(this.tblerptendercompliancessource.settings['selectMode']== 'multi')this.tblerptendercompliancessource.settings['selectMode']= 'single';
else
this.tblerptendercompliancessource.settings['selectMode']= 'multi';
this.tblerptendercompliancessource.initGrid();
}
deleteerptendercompliancesAll()
{
this.tblerptendercompliancessource.settings['selectMode'] = 'single';
}
showerptendercompliancesFilter()
{
  setTimeout(() => {
  this.SeterptendercompliancesTableddConfig();
  });
      if(this.tblerptendercompliancessource.settings!=null)this.tblerptendercompliancessource.settings['hideSubHeader'] =!this.tblerptendercompliancessource.settings['hideSubHeader'];
this.tblerptendercompliancessource.initGrid();
}
showerptendercompliancesInActive()
{
}
enableerptendercompliancesInActive()
{
}
async SeterptendercompliancesTableddConfig()
{
if(!this.bfilterPopulateerptendercompliances){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptendercompliancestenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptendercompliancestenderid3.push(obj);
}
if((this.tblerptendercompliancessource.settings as any).columns['tenderid'])
{
(this.tblerptendercompliancessource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptendercompliancestenderid3));
this.tblerptendercompliancessource.initGrid();
}
});
}
this.bfilterPopulateerptendercompliances=true;
}
async erptendercompliancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptendercompliancesTableConfig()
{
this.erptendercompliancessettings = {
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
compliancetype: {
title: 'Compliance Type',
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
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
mandatory: {
title: 'Mandatory',
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
remarksnotallowed: {
title: 'Remarks Not Allowed',
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
documentsrequired: {
title: 'Documents Required',
type: '',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
},
};
}
erptendercompliancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendercompliancesID)>=0)
{
this.erptendercompliancessource=new LocalDataSource();
this.erptendercompliancessource.load(this.erptendermasterservice.erptendercompliances as  any as LocalDataSource);
this.erptendercompliancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptendercompliancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptendercompliances.length == 0)
{
    this.tblerptendercompliancessource.grid.createFormShown = true;
}
else
{
    let obj = new erptendercompliance();
    this.erptendermasterservice.erptendercompliances.push(obj);
    this.erptendercompliancessource.refresh();
    if ((this.erptendermasterservice.erptendercompliances.length / this.erptendercompliancessource.getPaging().perPage).toFixed(0) + 1 != this.erptendercompliancessource.getPaging().page)
    {
        this.erptendercompliancessource.setPage((this.erptendermasterservice.erptendercompliances.length / this.erptendercompliancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptendercompliancessource.grid.edit(this.tblerptendercompliancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptendercompliancessource.data.indexOf(event.data);
this.onDeleteerptendercompliance(event,event.data.complianceid,((this.erptendercompliancessource.getPaging().page-1) *this.erptendercompliancessource.getPaging().perPage)+index);
this.erptendercompliancessource.refresh();
break;
}
}

*/
erptendercompliancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptendercompliance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptendercompliance(event,event.data.complianceid,this.formid);
break;
case 'delete':
this.onDeleteerptendercompliance(event,event.data.complianceid,((this.erptendercompliancessource.getPaging().page-1) *this.erptendercompliancessource.getPaging().perPage)+event.index);
this.erptendercompliancessource.refresh();
break;
}
}
erptendercompliancesonDelete(obj) {
let complianceid=obj.data.complianceid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(complianceid).then(res=>
this.erptendercompliancesLoadTable()
);
}
}
erptendercompliancesPaging(val)
{
debugger;
this.erptendercompliancessource.setPaging(1, val, true);
}

handleerptendercompliancesGridSelected(event:any) {
this.erptendercompliancesselectedindex=this.erptendermasterservice.erptendercompliances.findIndex(i => i.complianceid === event.data.complianceid);
}
IserptendercompliancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendercompliancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptendercompliances
//start of Grid Codes erptenderquotationmasters
erptenderquotationmasterssettings:any;
erptenderquotationmasterssource: any;

showerptenderquotationmastersCheckbox()
{
debugger;
if(this.tblerptenderquotationmasterssource.settings['selectMode']== 'multi')this.tblerptenderquotationmasterssource.settings['selectMode']= 'single';
else
this.tblerptenderquotationmasterssource.settings['selectMode']= 'multi';
this.tblerptenderquotationmasterssource.initGrid();
}
deleteerptenderquotationmastersAll()
{
this.tblerptenderquotationmasterssource.settings['selectMode'] = 'single';
}
showerptenderquotationmastersFilter()
{
  setTimeout(() => {
  this.SeterptenderquotationmastersTableddConfig();
  });
      if(this.tblerptenderquotationmasterssource.settings!=null)this.tblerptenderquotationmasterssource.settings['hideSubHeader'] =!this.tblerptenderquotationmasterssource.settings['hideSubHeader'];
this.tblerptenderquotationmasterssource.initGrid();
}
showerptenderquotationmastersInActive()
{
}
enableerptenderquotationmastersInActive()
{
}
async SeterptenderquotationmastersTableddConfig()
{
if(!this.bfilterPopulateerptenderquotationmasters){

this.erpsuppliermasterservice.geterpsuppliermastersList().then(res=>
{
var datasupplierid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptenderquotationmasterssupplierid3.push(defaultobj);
for(let i=0; i<datasupplierid2.length; i++){
var obj= { value: datasupplierid2[i].supplierid, title:datasupplierid2[i].suppliercode};
this.dataerptenderquotationmasterssupplierid3.push(obj);
}
if((this.tblerptenderquotationmasterssource.settings as any).columns['supplierid'])
{
(this.tblerptenderquotationmasterssource.settings as any).columns['supplierid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptenderquotationmasterssupplierid3));
this.tblerptenderquotationmasterssource.initGrid();
}
});

this.configservice.getList("paymentterm").then(res=>
{
var datapaymentterms2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptenderquotationmasterspaymentterms3.push(defaultobj);
for(let i=0; i<datapaymentterms2.length; i++){
var obj= { value: datapaymentterms2[i].configkey, title: datapaymentterms2[i].configtext};
this.dataerptenderquotationmasterspaymentterms3.push(obj);
}
var clone = this.sharedService.clone(this.tblerptenderquotationmasterssource.settings);
if(clone.columns['paymentterms']!=undefined)clone.columns['paymentterms'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerptenderquotationmasterspaymentterms3)), }, };
if(clone.columns['paymentterms']!=undefined)clone.columns['paymentterms'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerptenderquotationmasterspaymentterms3)), }, };
this.tblerptenderquotationmasterssource.settings =  clone;
this.tblerptenderquotationmasterssource.initGrid();
});
}
this.bfilterPopulateerptenderquotationmasters=true;
}
async erptenderquotationmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderquotationmastersTableConfig()
{
this.erptenderquotationmasterssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'qtmcq',reportcode:'qtmcq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerptenderquotationmasterssupplierid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
othersupplier: {
title: 'Other Supplier',
type: '',
filter:true,
},
supplieremail: {
title: 'Supplier Email',
type: '',
filter:true,
},
quotationreference: {
title: 'Quotation Reference',
type: '',
filter:true,
},
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
quotationdate: {
title: 'Quotation Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expirationdate: {
title: 'Expiration Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
quotationamount: {
title: 'Quotation Amount',
type: '',
filter:true,
},
paymentterms: {
title: 'Payment Terms',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerptenderquotationmasterspaymentterms3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
quotationremarks: {
title: 'Quotation Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
statusremarks: {
title: 'Status Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
erptenderquotationmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationmastersID)>=0)
{
this.erptenderquotationmasterssource=new LocalDataSource();
this.erptenderquotationmasterssource.load(this.erptendermasterservice.erptenderquotationmasters as  any as LocalDataSource);
this.erptenderquotationmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptenderquotationmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptenderquotationmasters.length == 0)
{
    this.tblerptenderquotationmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderquotationmaster();
    this.erptendermasterservice.erptenderquotationmasters.push(obj);
    this.erptenderquotationmasterssource.refresh();
    if ((this.erptendermasterservice.erptenderquotationmasters.length / this.erptenderquotationmasterssource.getPaging().perPage).toFixed(0) + 1 != this.erptenderquotationmasterssource.getPaging().page)
    {
        this.erptenderquotationmasterssource.setPage((this.erptendermasterservice.erptenderquotationmasters.length / this.erptenderquotationmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderquotationmasterssource.grid.edit(this.tblerptenderquotationmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderquotationmasterssource.data.indexOf(event.data);
this.onDeleteerptenderquotationmaster(event,event.data.quotationid,((this.erptenderquotationmasterssource.getPaging().page-1) *this.erptenderquotationmasterssource.getPaging().perPage)+index);
this.erptenderquotationmasterssource.refresh();
break;
}
}

*/
erptenderquotationmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptenderquotationmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptenderquotationmaster(event,event.data.quotationid,this.formid);
break;
case 'delete':
this.onDeleteerptenderquotationmaster(event,event.data.quotationid,((this.erptenderquotationmasterssource.getPaging().page-1) *this.erptenderquotationmasterssource.getPaging().perPage)+event.index);
this.erptenderquotationmasterssource.refresh();
break;
}
}
erptenderquotationmastersonDelete(obj) {
let quotationid=obj.data.quotationid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(quotationid).then(res=>
this.erptenderquotationmastersLoadTable()
);
}
}
erptenderquotationmastersPaging(val)
{
debugger;
this.erptenderquotationmasterssource.setPaging(1, val, true);
}

handleerptenderquotationmastersGridSelected(event:any) {
this.erptenderquotationmastersselectedindex=this.erptendermasterservice.erptenderquotationmasters.findIndex(i => i.quotationid === event.data.quotationid);
}
IserptenderquotationmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderquotationmasters
//start of Grid Codes erptendersupplierresponses
erptendersupplierresponsessettings:any;
erptendersupplierresponsessource: any;

showerptendersupplierresponsesCheckbox()
{
debugger;
if(this.tblerptendersupplierresponsessource.settings['selectMode']== 'multi')this.tblerptendersupplierresponsessource.settings['selectMode']= 'single';
else
this.tblerptendersupplierresponsessource.settings['selectMode']= 'multi';
this.tblerptendersupplierresponsessource.initGrid();
}
deleteerptendersupplierresponsesAll()
{
this.tblerptendersupplierresponsessource.settings['selectMode'] = 'single';
}
showerptendersupplierresponsesFilter()
{
  setTimeout(() => {
  this.SeterptendersupplierresponsesTableddConfig();
  });
      if(this.tblerptendersupplierresponsessource.settings!=null)this.tblerptendersupplierresponsessource.settings['hideSubHeader'] =!this.tblerptendersupplierresponsessource.settings['hideSubHeader'];
this.tblerptendersupplierresponsessource.initGrid();
}
showerptendersupplierresponsesInActive()
{
}
enableerptendersupplierresponsesInActive()
{
}
async SeterptendersupplierresponsesTableddConfig()
{
if(!this.bfilterPopulateerptendersupplierresponses){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptendersupplierresponsestenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptendersupplierresponsestenderid3.push(obj);
}
if((this.tblerptendersupplierresponsessource.settings as any).columns['tenderid'])
{
(this.tblerptendersupplierresponsessource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptendersupplierresponsestenderid3));
this.tblerptendersupplierresponsessource.initGrid();
}
});
}
this.bfilterPopulateerptendersupplierresponses=true;
}
async erptendersupplierresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptendersupplierresponsesTableConfig()
{
this.erptendersupplierresponsessettings = {
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
submitdatetime: {
title: 'Submit Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
documentfeepaid: {
title: 'Document Fee Pa',
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
emdpaid: {
title: 'E M D Pa',
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
bidamount: {
title: 'Bid Amount',
type: 'number',
filter:true,
},
supplierreference: {
title: 'Supplier Reference',
type: '',
filter:true,
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
agreed: {
title: 'Agreed',
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
},
};
}
erptendersupplierresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersupplierresponsesID)>=0)
{
this.erptendersupplierresponsessource=new LocalDataSource();
this.erptendersupplierresponsessource.load(this.erptendermasterservice.erptendersupplierresponses as  any as LocalDataSource);
this.erptendersupplierresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptendersupplierresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptendersupplierresponses.length == 0)
{
    this.tblerptendersupplierresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new erptendersupplierresponse();
    this.erptendermasterservice.erptendersupplierresponses.push(obj);
    this.erptendersupplierresponsessource.refresh();
    if ((this.erptendermasterservice.erptendersupplierresponses.length / this.erptendersupplierresponsessource.getPaging().perPage).toFixed(0) + 1 != this.erptendersupplierresponsessource.getPaging().page)
    {
        this.erptendersupplierresponsessource.setPage((this.erptendermasterservice.erptendersupplierresponses.length / this.erptendersupplierresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptendersupplierresponsessource.grid.edit(this.tblerptendersupplierresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptendersupplierresponsessource.data.indexOf(event.data);
this.onDeleteerptendersupplierresponse(event,event.data.responseid,((this.erptendersupplierresponsessource.getPaging().page-1) *this.erptendersupplierresponsessource.getPaging().perPage)+index);
this.erptendersupplierresponsessource.refresh();
break;
}
}

*/
erptendersupplierresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptendersupplierresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptendersupplierresponse(event,event.data.responseid,this.formid);
break;
case 'delete':
this.onDeleteerptendersupplierresponse(event,event.data.responseid,((this.erptendersupplierresponsessource.getPaging().page-1) *this.erptendersupplierresponsessource.getPaging().perPage)+event.index);
this.erptendersupplierresponsessource.refresh();
break;
}
}
erptendersupplierresponsesonDelete(obj) {
let responseid=obj.data.responseid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(responseid).then(res=>
this.erptendersupplierresponsesLoadTable()
);
}
}
erptendersupplierresponsesPaging(val)
{
debugger;
this.erptendersupplierresponsessource.setPaging(1, val, true);
}

handleerptendersupplierresponsesGridSelected(event:any) {
this.erptendersupplierresponsesselectedindex=this.erptendermasterservice.erptendersupplierresponses.findIndex(i => i.responseid === event.data.responseid);
}
IserptendersupplierresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersupplierresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptendersupplierresponses
//start of Grid Codes erptenderaccesses
onCustomerptenderaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bousergroupComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
erptenderaccessessettings:any;
erptenderaccessessource: any;

showerptenderaccessesCheckbox()
{
debugger;
if(this.tblerptenderaccessessource.settings['selectMode']== 'multi')this.tblerptenderaccessessource.settings['selectMode']= 'single';
else
this.tblerptenderaccessessource.settings['selectMode']= 'multi';
this.tblerptenderaccessessource.initGrid();
}
deleteerptenderaccessesAll()
{
this.tblerptenderaccessessource.settings['selectMode'] = 'single';
}
showerptenderaccessesFilter()
{
  setTimeout(() => {
  this.SeterptenderaccessesTableddConfig();
  });
      if(this.tblerptenderaccessessource.settings!=null)this.tblerptenderaccessessource.settings['hideSubHeader'] =!this.tblerptenderaccessessource.settings['hideSubHeader'];
this.tblerptenderaccessessource.initGrid();
}
showerptenderaccessesInActive()
{
}
enableerptenderaccessesInActive()
{
}
async SeterptenderaccessesTableddConfig()
{
if(!this.bfilterPopulateerptenderaccesses){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptenderaccessestenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptenderaccessestenderid3.push(obj);
}
if((this.tblerptenderaccessessource.settings as any).columns['tenderid'])
{
(this.tblerptenderaccessessource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptenderaccessestenderid3));
this.tblerptenderaccessessource.initGrid();
}
});
}
this.bfilterPopulateerptenderaccesses=true;
}
async erptenderaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderaccessesTableConfig()
{
this.erptenderaccessessettings = {
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
accessid: {
title: 'Access',
type: '',
},
usergroupid: {
title: 'User Group',
type: '',
},
groupname: {
title: 'Groupname',
type: '',
},
},
};
}
erptenderaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderaccessesID)>=0)
{
this.erptenderaccessessource=new LocalDataSource();
this.erptenderaccessessource.load(this.erptendermasterservice.erptenderaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblerptenderaccessessource!=null)
{this.tblerptenderaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.erptendermasterservice.Inserterptenderaccesses.push(row.data);
this.tblerptenderaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
erptenderaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptenderaccesses.length == 0)
{
    this.tblerptenderaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderaccess();
    this.erptendermasterservice.erptenderaccesses.push(obj);
    this.erptenderaccessessource.refresh();
    if ((this.erptendermasterservice.erptenderaccesses.length / this.erptenderaccessessource.getPaging().perPage).toFixed(0) + 1 != this.erptenderaccessessource.getPaging().page)
    {
        this.erptenderaccessessource.setPage((this.erptendermasterservice.erptenderaccesses.length / this.erptenderaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderaccessessource.grid.edit(this.tblerptenderaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderaccessessource.data.indexOf(event.data);
this.onDeleteerptenderaccess(event,event.data.accessid,((this.erptenderaccessessource.getPaging().page-1) *this.erptenderaccessessource.getPaging().perPage)+index);
this.erptenderaccessessource.refresh();
break;
}
}

*/
erptenderaccessesPaging(val)
{
debugger;
this.erptenderaccessessource.setPaging(1, val, true);
}

handleerptenderaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={tenderid:this.formid,usergroupid:event.data.usergroupid}
this.erptendermasterservice.Inserterptenderaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletederptenderaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.accessid)
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
if(event.data.accessid!=null && event.data.accessid!="")this.DeletederptenderaccessIDs += event.data.accessid + ","; 
}
}
IserptenderaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderaccesses
//start of Grid Codes erptendercorrigendums
erptendercorrigendumssettings:any;
erptendercorrigendumssource: any;

showerptendercorrigendumsCheckbox()
{
debugger;
if(this.tblerptendercorrigendumssource.settings['selectMode']== 'multi')this.tblerptendercorrigendumssource.settings['selectMode']= 'single';
else
this.tblerptendercorrigendumssource.settings['selectMode']= 'multi';
this.tblerptendercorrigendumssource.initGrid();
}
deleteerptendercorrigendumsAll()
{
this.tblerptendercorrigendumssource.settings['selectMode'] = 'single';
}
showerptendercorrigendumsFilter()
{
  setTimeout(() => {
  this.SeterptendercorrigendumsTableddConfig();
  });
      if(this.tblerptendercorrigendumssource.settings!=null)this.tblerptendercorrigendumssource.settings['hideSubHeader'] =!this.tblerptendercorrigendumssource.settings['hideSubHeader'];
this.tblerptendercorrigendumssource.initGrid();
}
showerptendercorrigendumsInActive()
{
}
enableerptendercorrigendumsInActive()
{
}
async SeterptendercorrigendumsTableddConfig()
{
if(!this.bfilterPopulateerptendercorrigendums){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptendercorrigendumstenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptendercorrigendumstenderid3.push(obj);
}
if((this.tblerptendercorrigendumssource.settings as any).columns['tenderid'])
{
(this.tblerptendercorrigendumssource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptendercorrigendumstenderid3));
this.tblerptendercorrigendumssource.initGrid();
}
});
}
this.bfilterPopulateerptendercorrigendums=true;
}
async erptendercorrigendumsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptendercorrigendumsTableConfig()
{
this.erptendercorrigendumssettings = {
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
corrigendumdate: {
title: 'Corrigendum Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
description: {
title: 'Description',
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
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
erptendercorrigendumsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendercorrigendumsID)>=0)
{
this.erptendercorrigendumssource=new LocalDataSource();
this.erptendercorrigendumssource.load(this.erptendermasterservice.erptendercorrigendums as  any as LocalDataSource);
this.erptendercorrigendumssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptendercorrigendumsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptendercorrigendums.length == 0)
{
    this.tblerptendercorrigendumssource.grid.createFormShown = true;
}
else
{
    let obj = new erptendercorrigendum();
    this.erptendermasterservice.erptendercorrigendums.push(obj);
    this.erptendercorrigendumssource.refresh();
    if ((this.erptendermasterservice.erptendercorrigendums.length / this.erptendercorrigendumssource.getPaging().perPage).toFixed(0) + 1 != this.erptendercorrigendumssource.getPaging().page)
    {
        this.erptendercorrigendumssource.setPage((this.erptendermasterservice.erptendercorrigendums.length / this.erptendercorrigendumssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptendercorrigendumssource.grid.edit(this.tblerptendercorrigendumssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptendercorrigendumssource.data.indexOf(event.data);
this.onDeleteerptendercorrigendum(event,event.data.corrigendumid,((this.erptendercorrigendumssource.getPaging().page-1) *this.erptendercorrigendumssource.getPaging().perPage)+index);
this.erptendercorrigendumssource.refresh();
break;
}
}

*/
erptendercorrigendumsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptendercorrigendum(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptendercorrigendum(event,event.data.corrigendumid,this.formid);
break;
case 'delete':
this.onDeleteerptendercorrigendum(event,event.data.corrigendumid,((this.erptendercorrigendumssource.getPaging().page-1) *this.erptendercorrigendumssource.getPaging().perPage)+event.index);
this.erptendercorrigendumssource.refresh();
break;
}
}
erptendercorrigendumsonDelete(obj) {
let corrigendumid=obj.data.corrigendumid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(corrigendumid).then(res=>
this.erptendercorrigendumsLoadTable()
);
}
}
erptendercorrigendumsPaging(val)
{
debugger;
this.erptendercorrigendumssource.setPaging(1, val, true);
}

handleerptendercorrigendumsGridSelected(event:any) {
this.erptendercorrigendumsselectedindex=this.erptendermasterservice.erptendercorrigendums.findIndex(i => i.corrigendumid === event.data.corrigendumid);
}
IserptendercorrigendumsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendercorrigendumsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptendercorrigendums
//start of Grid Codes erptenderdetails
erptenderdetailssettings:any;
erptenderdetailssource: any;

showerptenderdetailsCheckbox()
{
debugger;
if(this.tblerptenderdetailssource.settings['selectMode']== 'multi')this.tblerptenderdetailssource.settings['selectMode']= 'single';
else
this.tblerptenderdetailssource.settings['selectMode']= 'multi';
this.tblerptenderdetailssource.initGrid();
}
deleteerptenderdetailsAll()
{
this.tblerptenderdetailssource.settings['selectMode'] = 'single';
}
showerptenderdetailsFilter()
{
  setTimeout(() => {
  this.SeterptenderdetailsTableddConfig();
  });
      if(this.tblerptenderdetailssource.settings!=null)this.tblerptenderdetailssource.settings['hideSubHeader'] =!this.tblerptenderdetailssource.settings['hideSubHeader'];
this.tblerptenderdetailssource.initGrid();
}
showerptenderdetailsInActive()
{
}
enableerptenderdetailsInActive()
{
}
async SeterptenderdetailsTableddConfig()
{
if(!this.bfilterPopulateerptenderdetails){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptenderdetailstenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptenderdetailstenderid3.push(obj);
}
if((this.tblerptenderdetailssource.settings as any).columns['tenderid'])
{
(this.tblerptenderdetailssource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptenderdetailstenderid3));
this.tblerptenderdetailssource.initGrid();
}
});
}
this.bfilterPopulateerptenderdetails=true;
}
async erptenderdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderdetailsTableConfig()
{
this.erptenderdetailssettings = {
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
estimatedvalue: {
title: 'Estimated Value',
type: 'number',
filter:true,
},
finalsupplierid: {
title: 'Final Supplier',
type: 'number',
filter:true,
},
finalquantity: {
title: 'Final Quantity',
type: 'number',
filter:true,
},
finalunitprice: {
title: 'Final Unit Price',
type: 'number',
filter:true,
},
finalcost: {
title: 'Final Cost',
type: 'number',
filter:true,
},
},
};
}
erptenderdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderdetailsID)>=0)
{
this.erptenderdetailssource=new LocalDataSource();
this.erptenderdetailssource.load(this.erptendermasterservice.erptenderdetails as  any as LocalDataSource);
this.erptenderdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptenderdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptenderdetails.length == 0)
{
    this.tblerptenderdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderdetail();
    this.erptendermasterservice.erptenderdetails.push(obj);
    this.erptenderdetailssource.refresh();
    if ((this.erptendermasterservice.erptenderdetails.length / this.erptenderdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erptenderdetailssource.getPaging().page)
    {
        this.erptenderdetailssource.setPage((this.erptendermasterservice.erptenderdetails.length / this.erptenderdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderdetailssource.grid.edit(this.tblerptenderdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderdetailssource.data.indexOf(event.data);
this.onDeleteerptenderdetail(event,event.data.tenderdetailid,((this.erptenderdetailssource.getPaging().page-1) *this.erptenderdetailssource.getPaging().perPage)+index);
this.erptenderdetailssource.refresh();
break;
}
}

*/
erptenderdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptenderdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptenderdetail(event,event.data.tenderdetailid,this.formid);
break;
case 'delete':
this.onDeleteerptenderdetail(event,event.data.tenderdetailid,((this.erptenderdetailssource.getPaging().page-1) *this.erptenderdetailssource.getPaging().perPage)+event.index);
this.erptenderdetailssource.refresh();
break;
}
}
erptenderdetailsonDelete(obj) {
let tenderdetailid=obj.data.tenderdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(tenderdetailid).then(res=>
this.erptenderdetailsLoadTable()
);
}
}
erptenderdetailsPaging(val)
{
debugger;
this.erptenderdetailssource.setPaging(1, val, true);
}

handleerptenderdetailsGridSelected(event:any) {
this.erptenderdetailsselectedindex=this.erptendermasterservice.erptenderdetails.findIndex(i => i.tenderdetailid === event.data.tenderdetailid);
}
IserptenderdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderdetails
//start of Grid Codes erptenderquestions
erptenderquestionssettings:any;
erptenderquestionssource: any;

showerptenderquestionsCheckbox()
{
debugger;
if(this.tblerptenderquestionssource.settings['selectMode']== 'multi')this.tblerptenderquestionssource.settings['selectMode']= 'single';
else
this.tblerptenderquestionssource.settings['selectMode']= 'multi';
this.tblerptenderquestionssource.initGrid();
}
deleteerptenderquestionsAll()
{
this.tblerptenderquestionssource.settings['selectMode'] = 'single';
}
showerptenderquestionsFilter()
{
  setTimeout(() => {
  this.SeterptenderquestionsTableddConfig();
  });
      if(this.tblerptenderquestionssource.settings!=null)this.tblerptenderquestionssource.settings['hideSubHeader'] =!this.tblerptenderquestionssource.settings['hideSubHeader'];
this.tblerptenderquestionssource.initGrid();
}
showerptenderquestionsInActive()
{
}
enableerptenderquestionsInActive()
{
}
async SeterptenderquestionsTableddConfig()
{
if(!this.bfilterPopulateerptenderquestions){

this.erptendermasterservice.geterptendermastersList().then(res=>
{
var datatenderid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptenderquestionstenderid3.push(defaultobj);
for(let i=0; i<datatenderid2.length; i++){
var obj= { value: datatenderid2[i].tenderid, title:datatenderid2[i].title};
this.dataerptenderquestionstenderid3.push(obj);
}
if((this.tblerptenderquestionssource.settings as any).columns['tenderid'])
{
(this.tblerptenderquestionssource.settings as any).columns['tenderid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerptenderquestionstenderid3));
this.tblerptenderquestionssource.initGrid();
}
});
}
this.bfilterPopulateerptenderquestions=true;
}
async erptenderquestionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderquestionsTableConfig()
{
this.erptenderquestionssettings = {
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
question: {
title: 'Question',
type: '',
filter:true,
},
},
};
}
erptenderquestionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquestionsID)>=0)
{
this.erptenderquestionssource=new LocalDataSource();
this.erptenderquestionssource.load(this.erptendermasterservice.erptenderquestions as  any as LocalDataSource);
this.erptenderquestionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptenderquestionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendermasterservice.erptenderquestions.length == 0)
{
    this.tblerptenderquestionssource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderquestion();
    this.erptendermasterservice.erptenderquestions.push(obj);
    this.erptenderquestionssource.refresh();
    if ((this.erptendermasterservice.erptenderquestions.length / this.erptenderquestionssource.getPaging().perPage).toFixed(0) + 1 != this.erptenderquestionssource.getPaging().page)
    {
        this.erptenderquestionssource.setPage((this.erptendermasterservice.erptenderquestions.length / this.erptenderquestionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderquestionssource.grid.edit(this.tblerptenderquestionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderquestionssource.data.indexOf(event.data);
this.onDeleteerptenderquestion(event,event.data.questionid,((this.erptenderquestionssource.getPaging().page-1) *this.erptenderquestionssource.getPaging().perPage)+index);
this.erptenderquestionssource.refresh();
break;
}
}

*/
erptenderquestionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptenderquestion(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptenderquestion(event,event.data.questionid,this.formid);
break;
case 'delete':
this.onDeleteerptenderquestion(event,event.data.questionid,((this.erptenderquestionssource.getPaging().page-1) *this.erptenderquestionssource.getPaging().perPage)+event.index);
this.erptenderquestionssource.refresh();
break;
}
}
erptenderquestionsonDelete(obj) {
let questionid=obj.data.questionid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendermasterservice.deleteerptendermaster(questionid).then(res=>
this.erptenderquestionsLoadTable()
);
}
}
erptenderquestionsPaging(val)
{
debugger;
this.erptenderquestionssource.setPaging(1, val, true);
}

handleerptenderquestionsGridSelected(event:any) {
this.erptenderquestionsselectedindex=this.erptendermasterservice.erptenderquestions.findIndex(i => i.questionid === event.data.questionid);
}
IserptenderquestionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquestionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderquestions

}



