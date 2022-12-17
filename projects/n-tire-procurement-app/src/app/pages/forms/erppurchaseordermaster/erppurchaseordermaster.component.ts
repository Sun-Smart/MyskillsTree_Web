import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
import { erppurchaseordermaster } from './../../../model/erppurchaseordermaster.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { bocontact} from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
import { bocontactService } from '../../../../../../n-tire-bo-app/src/app/service/bocontact.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
import { erpsupplierquotationmaster} from './../../../model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from './../../../pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
//popups
//detail table services
import { erppurchaseorderdetail } from './../../../model/erppurchaseorderdetail.model';
import { erppurchaseorderdetailComponent } from './../../../pages/forms/erppurchaseorderdetail/erppurchaseorderdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erppurchaseorderdetailService } from './../../../service/erppurchaseorderdetail.service';
import { erppurchaseorderpaymentterm } from './../../../model/erppurchaseorderpaymentterm.model';
import { erppurchaseorderpaymenttermComponent } from './../../../pages/forms/erppurchaseorderpaymentterm/erppurchaseorderpaymentterm.component';
//FK services
import { erprfqmaster,IerprfqmasterResponse } from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
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
selector: 'app-erppurchaseordermaster',
templateUrl: './erppurchaseordermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchaseordermasterComponent implements OnInit {
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
bfilterPopulateerppurchaseordermasters:boolean=false;
dataerppurchaseordermastersbranchid3:any=[];
dataerppurchaseordermasterspoid3:any=[];
dataerppurchaseordermasterspotype3:any=[];
dataerppurchaseordermastersorderpriority3:any=[];
dataerppurchaseordermasterspocurrency3:any=[];
dataerppurchaseordermastersourcontactpersonid3:any=[];
dataerppurchaseordermastersbillbranchid3:any=[];
dataerppurchaseordermastersdeliverybranchid3:any=[];
dataerppurchaseordermasterssupplierid3:any=[];
dataerppurchaseordermasterssuppliercontactid3:any=[];
dataerppurchaseordermasterscreditdays3:any=[];
dataerppurchaseordermasterspaymentterms3:any=[];
dataerppurchaseordermasterscostcenterid3:any=[];
dataerppurchaseordermastersincoterms3:any=[];
dataerppurchaseordermastersprojectid3:any=[];
dataerppurchaseordermasterssupplierquotationid3:any=[];
dataerppurchaseordermasterspostatus3:any=[];
dataerppurchaseorderdetailsitemid3:any=[];
dataerppurchaseorderdetailstax1name3:any=[];
dataerppurchaseorderdetailsuom3:any=[];
dataerppurchaseorderdetailssupplierid3:any=[];
dataerppurchaseorderdetailspoid3:any=[];
dataerppurchaseorderdetailspodetailid3:any=[];
dataerppurchaseorderdetailscurrency3:any=[];
dataerppurchaseorderdetailsdetailtype3:any=[];
dataerppurchaseorderdetailsdiscounttype3:any=[];
bfilterPopulateerppurchaseorderdetails:boolean=false;
dataerppurchaseorderpaymenttermspaymenttermtype3:any=[];
dataerppurchaseorderpaymenttermspoid3:any=[];
dataerppurchaseorderpaymenttermsrfqid3:any=[];
dataerppurchaseorderpaymenttermsquoteid3:any=[];
bfilterPopulateerppurchaseorderpaymentterms:boolean=false;
@ViewChild('tblerppurchaseorderdetailssource',{static:false}) tblerppurchaseorderdetailssource: Ng2SmartTableComponent;
@ViewChild('tblerppurchaseorderpaymenttermssource',{static:false}) tblerppurchaseorderpaymenttermssource: Ng2SmartTableComponent;
 erppurchaseordermasterForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
potypeList: boconfigvalue[];
orderpriorityList: boconfigvalue[];
pocurrencyList: boconfigvalue[];
ourcontactpersonidList: bousermaster[];
ourcontactpersonidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
ourcontactpersonid_bousermastersForm: FormGroup;//autocomplete
ourcontactpersonid_bousermastersoptions:any;//autocomplete
ourcontactpersonid_bousermastersformatter:any;//autocomplete
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
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
suppliercontactidList: bocontact[];
creditdaysList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
costcenteridList: erpfacostcenter[];
incotermsList: boconfigvalue[];
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
supplierquotationidList: erpsupplierquotationmaster[];
supplierquotationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierquotationid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
supplierquotationid_erpsupplierquotationmastersoptions:any;//autocomplete
supplierquotationid_erpsupplierquotationmastersformatter:any;//autocomplete
postatusList: boconfigvalue[];
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
erppurchaseordermastershowOption:boolean;
erppurchaseorderdetailshowOption:boolean;
erppurchaseorderpaymenttermshowOption:boolean;
sessiondata:any;
sourcekey:any;



erppurchaseorderdetailsvisiblelist:any;
erppurchaseorderdetailshidelist:any;
erppurchaseorderpaymenttermsvisiblelist:any;
erppurchaseorderpaymenttermshidelist:any;

DeletederppurchaseorderdetailIDs: string="";
erppurchaseorderdetailsID: string = "1";
erppurchaseorderdetailsselectedindex:any;
DeletederppurchaseorderpaymenttermIDs: string="";
erppurchaseorderpaymenttermsID: string = "2";
erppurchaseorderpaymenttermsselectedindex:any;

default: any;

constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erppurchaseorderdetailservice: erppurchaseorderdetailService,
private erprfqmasterservice: erprfqmasterService,
private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private bousermasterservice:bousermasterService,
private bobranchmasterservice:bobranchmasterService,
private bocontactservice:bocontactService,
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
this.erppurchaseordermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
poid: [null],
poiddesc: [null],
poname: [null],
ponumber: [null],
versionnumber: [null],
podate: [null],
potype: [null],
potypedesc: [null],
orderpriority: [null],
orderprioritydesc: [null],
pocurrency: [null],
pocurrencydesc: [null],
ourcontactpersonid: [null],
ourcontactpersoniddesc: [null],
billbranchid: [null],
billbranchiddesc: [null],
deliverybranchid: [null],
deliverybranchiddesc: [null],
multicompany: [null],
supplierid: [null],
supplieriddesc: [null],
suppliercontactid: [null],
suppliercontactiddesc: [null],
supplierreference: [null],
creditdays: [null],
creditdaysdesc: [null],
paymentterms: [null],
paymenttermsdesc: [null],
termsandconditions: [null],
tcattachment: [null],
shippingdetails: [null],
suppliernotes: [null],
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
customfield: [null],
attachment: [null],
vendoracceptance: [null],
vadate: [null],
supplierquotationid: [null],
supplierquotationiddesc: [null],
supplierquotationver: [null],
totallistprice: [null],
discount: [null],
totalvalue: [null],
shippingcharges: [null],
shippingtax: [null],
shippingtaxamount: [null],
tax: [null],
additionaltax: [null],
adjustment: [null],
poamount: [null],
changerequested: [null],
supplierchangerequest: [null],
postatus: [null],
postatusdesc: [null],
status: [null],
statusdesc: [null],
});
    this.erppurchaseordermasterservice.getdefault().then(res => {
    console.log(res);
this.default= res;
    this.erppurchaseordermasterForm.patchValue({
        termsandconditions: this.default.termsandconditions,
    });
    }).catch((err) => {console.log(err);});
}

get f() { return this.erppurchaseordermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchaseordermasterForm.dirty && this.erppurchaseordermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.poid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.poid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.poid && pkDetail) {
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
let erppurchaseordermasterid = null;

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
this.formid=erppurchaseordermasterid;
//this.sharedService.alert(erppurchaseordermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterppurchaseorderdetailsTableConfig();
  setTimeout(() => {
  this.SeterppurchaseorderdetailsTableddConfig();
  });

this.SeterppurchaseorderpaymenttermsTableConfig();
  setTimeout(() => {
  this.SeterppurchaseorderpaymenttermsTableddConfig();
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
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erppurchaseordermasterForm.patchValue({
    branchid: this.erppurchaseordermasterservice.formData.branchid,
    branchiddesc: this.erppurchaseordermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erppurchaseordermasterForm.get('branchid').value);
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
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchaseordermasterForm.patchValue({
    poid: this.erppurchaseordermasterservice.formData.poid,
    poiddesc: this.erppurchaseordermasterservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchaseordermasterForm.get('poid').value);
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
this.configservice.getList("potype").then(res => this.potypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.orderpriorityList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.pocurrencyList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.ourcontactpersonidList = res as bousermaster[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.ourcontactpersonid){
this.ourcontactpersonidoptionsEvent.emit(this.ourcontactpersonidList);
this.erppurchaseordermasterForm.patchValue({
    ourcontactpersonid: this.erppurchaseordermasterservice.formData.ourcontactpersonid,
    ourcontactpersoniddesc: this.erppurchaseordermasterservice.formData.ourcontactpersoniddesc,
});
}
{
let arrourcontactpersonid = this.ourcontactpersonidList.filter(v => v.userid == this.erppurchaseordermasterForm.get('ourcontactpersonid').value);
let objourcontactpersonid;
if (arrourcontactpersonid.length > 0) objourcontactpersonid = arrourcontactpersonid[0];
if (objourcontactpersonid)
{
}
}
}
).catch((err) => {console.log(err);});
this.ourcontactpersonid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ourcontactpersonidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.ourcontactpersonid_bousermastersformatter = (result: any) => result.username;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.billbranchidList = res as bobranchmaster[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.billbranchid){
this.billbranchidoptionsEvent.emit(this.billbranchidList);
this.erppurchaseordermasterForm.patchValue({
    billbranchid: this.erppurchaseordermasterservice.formData.billbranchid,
    billbranchiddesc: this.erppurchaseordermasterservice.formData.billbranchiddesc,
});
}
{
let arrbillbranchid = this.billbranchidList.filter(v => v.branchid == this.erppurchaseordermasterForm.get('billbranchid').value);
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
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.deliverybranchid){
this.deliverybranchidoptionsEvent.emit(this.deliverybranchidList);
this.erppurchaseordermasterForm.patchValue({
    deliverybranchid: this.erppurchaseordermasterservice.formData.deliverybranchid,
    deliverybranchiddesc: this.erppurchaseordermasterservice.formData.deliverybranchiddesc,
});
}
{
let arrdeliverybranchid = this.deliverybranchidList.filter(v => v.branchid == this.erppurchaseordermasterForm.get('deliverybranchid').value);
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
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erppurchaseordermasterForm.patchValue({
    supplierid: this.erppurchaseordermasterservice.formData.supplierid,
    supplieriddesc: this.erppurchaseordermasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erppurchaseordermasterForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
    this.erppurchaseordermasterForm.patchValue({ creditdays: objsupplierid.creditdays });
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
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.bocontactservice.getListBysourcereference(this.f.supplierid.value).then(res =>{
this.suppliercontactidList = res as bocontact[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.suppliercontactid){this.erppurchaseordermasterForm.patchValue({
    suppliercontactid: this.erppurchaseordermasterservice.formData.suppliercontactid,
    suppliercontactiddesc: this.erppurchaseordermasterservice.formData.suppliercontactiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("creditdays").then(res => this.creditdaysList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenteridList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("incoterms").then(res => this.incotermsList = res as boconfigvalue[]);
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.erppurchaseordermasterForm.patchValue({
    projectid: this.erppurchaseordermasterservice.formData.projectid,
    projectiddesc: this.erppurchaseordermasterservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.erppurchaseordermasterForm.get('projectid').value);
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
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.supplierquotationidList = res as erpsupplierquotationmaster[];
if(this.erppurchaseordermasterservice.formData && this.erppurchaseordermasterservice.formData.supplierquotationid){
this.supplierquotationidoptionsEvent.emit(this.supplierquotationidList);
this.erppurchaseordermasterForm.patchValue({
    supplierquotationid: this.erppurchaseordermasterservice.formData.supplierquotationid,
    supplierquotationiddesc: this.erppurchaseordermasterservice.formData.supplierquotationiddesc,
});
}
{
let arrsupplierquotationid = this.supplierquotationidList.filter(v => v.quotationid == this.erppurchaseordermasterForm.get('supplierquotationid').value);
let objsupplierquotationid;
if (arrsupplierquotationid.length > 0) objsupplierquotationid = arrsupplierquotationid[0];
if (objsupplierquotationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierquotationid_erpsupplierquotationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierquotationidList.filter(v => v.quotationreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierquotationid_erpsupplierquotationmastersformatter = (result: any) => result.quotationreference;
this.configservice.getList("postatus").then(res => this.postatusList = res as boconfigvalue[]);

//autocomplete
    this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => {
      this.pkList = res as erppurchaseordermaster[];
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
this.erppurchaseordermasterForm.markAsUntouched();
this.erppurchaseordermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erppurchaseordermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchaseordermasterForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedourcontactpersonid(ourcontactpersonidDetail: any) {
if (ourcontactpersonidDetail.userid && ourcontactpersonidDetail) {
this.erppurchaseordermasterForm.patchValue({
ourcontactpersonid: ourcontactpersonidDetail.userid,
ourcontactpersoniddesc: ourcontactpersonidDetail.username,

});

}
}

onSelectedbillbranchid(billbranchidDetail: any) {
if (billbranchidDetail.branchid && billbranchidDetail) {
this.erppurchaseordermasterForm.patchValue({
billbranchid: billbranchidDetail.branchid,
billbranchiddesc: billbranchidDetail.branchname,

});

}
}

onSelecteddeliverybranchid(deliverybranchidDetail: any) {
if (deliverybranchidDetail.branchid && deliverybranchidDetail) {
this.erppurchaseordermasterForm.patchValue({
deliverybranchid: deliverybranchidDetail.branchid,
deliverybranchiddesc: deliverybranchidDetail.branchname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erppurchaseordermasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});
this.erppurchaseordermasterForm.patchValue({creditdays:supplieridDetail.creditdays});
this.bocontactservice.getListBysourcereference(supplieridDetail.sourcereference).then(res => {
 this.suppliercontactidList = res as bocontact[]
}).catch((err) => {console.log(err);});

}
}

onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.erppurchaseordermasterForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedsupplierquotationid(supplierquotationidDetail: any) {
if (supplierquotationidDetail.quotationid && supplierquotationidDetail) {
this.erppurchaseordermasterForm.patchValue({
supplierquotationid: supplierquotationidDetail.quotationid,
supplierquotationiddesc: supplierquotationidDetail.quotationreference,

});

}
}




resetForm() {
if (this.erppurchaseordermasterForm != null)
this.erppurchaseordermasterForm.reset();
    this.erppurchaseordermasterForm.patchValue({
        termsandconditions: this.default.termsandconditions,
    });
this.erppurchaseordermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
ourcontactpersonid: this.sessiondata.userid,
ourcontactpersoniddesc: this.sessiondata.username,
billbranchid: this.sessiondata.branchid,
billbranchiddesc: this.sessiondata.branchiddesc,
deliverybranchid: this.sessiondata.branchid,
deliverybranchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erppurchaseordermasterservice.erppurchaseorderdetails=[];
this.erppurchaseorderdetailsLoadTable();
this.erppurchaseordermasterservice.erppurchaseorderpaymentterms=[];
this.erppurchaseorderpaymenttermsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let poid = this.erppurchaseordermasterForm.get('poid').value;
        if(poid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchaseordermasterservice.deleteerppurchaseordermaster(poid).then(res =>
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
    this.erppurchaseordermasterForm.patchValue({
        poid: null
    });
    if(this.erppurchaseordermasterservice.formData.poid!=null)this.erppurchaseordermasterservice.formData.poid=null;
for (let i=0;i<this.erppurchaseordermasterservice.erppurchaseorderdetails.length;i++) {
this.erppurchaseordermasterservice.erppurchaseorderdetails[i].podetailid=null;
}
for (let i=0;i<this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.length;i++) {
this.erppurchaseordermasterservice.erppurchaseorderpaymentterms[i].paytermid=null;
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
        else if(key=="podate")
this.erppurchaseordermasterForm.patchValue({"podate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expecteddeliverydate")
this.erppurchaseordermasterForm.patchValue({"expecteddeliverydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validenddate")
this.erppurchaseordermasterForm.patchValue({"validenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="vadate")
this.erppurchaseordermasterForm.patchValue({"vadate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erppurchaseordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchaseordermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchaseordermasterForm.controls[key]!=undefined)
{
this.erppurchaseordermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erppurchaseordermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
poidonChange(evt:any){
let e=evt.value;
}
ponameonChange(evt:any){
let e=evt.value;
}
ponumberonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
podateonChange(evt:any){
let e=evt.value;
}
potypeonChange(evt:any){
let e=this.f.potype.value as any;
this.erppurchaseordermasterForm.patchValue({potypedesc:evt.options[evt.options.selectedIndex].text});
}
orderpriorityonChange(evt:any){
let e=this.f.orderpriority.value as any;
this.erppurchaseordermasterForm.patchValue({orderprioritydesc:evt.options[evt.options.selectedIndex].text});
}
pocurrencyonChange(evt:any){
let e=this.f.pocurrency.value as any;
this.erppurchaseordermasterForm.patchValue({pocurrencydesc:evt.options[evt.options.selectedIndex].text});
}
ourcontactpersonidonChange(evt:any){
let e=evt.value;
}
billbranchidonChange(evt:any){
let e=evt.value;
}
deliverybranchidonChange(evt:any){
let e=evt.value;
}
multicompanyonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
suppliercontactidonChange(evt:any){
let e=evt.value;
this.erppurchaseordermasterForm.patchValue({suppliercontactiddesc:evt.options[evt.options.selectedIndex].text});
}
supplierreferenceonChange(evt:any){
let e=evt.value;
}
creditdaysonChange(evt:any){
let e=this.f.creditdays.value as any;
this.erppurchaseordermasterForm.patchValue({creditdaysdesc:evt.options[evt.options.selectedIndex].text});
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erppurchaseordermasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
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
costcenteridonChange(evt:any){
let e=evt.value;
this.erppurchaseordermasterForm.patchValue({costcenteriddesc:evt.options[evt.options.selectedIndex].text});
}
incotermsonChange(evt:any){
let e=this.f.incoterms.value as any;
this.erppurchaseordermasterForm.patchValue({incotermsdesc:evt.options[evt.options.selectedIndex].text});
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
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
vendoracceptanceonChange(evt:any){
let e=evt.value;
}
vadateonChange(evt:any){
let e=evt.value;
}
supplierquotationidonChange(evt:any){
let e=evt.value;
}
supplierquotationveronChange(evt:any){
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
additionaltaxonChange(evt:any){
let e=evt.value;
}
adjustmentonChange(evt:any){
let e=evt.value;
}
poamountonChange(evt:any){
let e=evt.value;
}
changerequestedonChange(evt:any){
let e=evt.value;
}
supplierchangerequestonChange(evt:any){
let e=evt.value;
}
postatusonChange(evt:any){
let e=this.f.postatus.value as any;
this.erppurchaseordermasterForm.patchValue({postatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editerppurchaseordermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchaseordermasterservice.geterppurchaseordermastersByEID(pkcol).then(res => {

this.erppurchaseordermasterservice.formData=res.erppurchaseordermaster;
let formproperty=res.erppurchaseordermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchaseordermaster.pkcol;
this.formid=res.erppurchaseordermaster.poid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchaseordermaster.poid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchaseordermasterForm.patchValue({
branchid: res.erppurchaseordermaster.branchid,
branchiddesc: res.erppurchaseordermaster.branchiddesc,
poid: res.erppurchaseordermaster.poid,
poiddesc: res.erppurchaseordermaster.poiddesc,
poname: res.erppurchaseordermaster.poname,
ponumber: res.erppurchaseordermaster.ponumber,
versionnumber: res.erppurchaseordermaster.versionnumber,
podate: this.ngbDateParserFormatter.parse(res.erppurchaseordermaster.podate),
potype: res.erppurchaseordermaster.potype,
potypedesc: res.erppurchaseordermaster.potypedesc,
orderpriority: res.erppurchaseordermaster.orderpriority,
orderprioritydesc: res.erppurchaseordermaster.orderprioritydesc,
pocurrency: res.erppurchaseordermaster.pocurrency,
pocurrencydesc: res.erppurchaseordermaster.pocurrencydesc,
ourcontactpersonid: res.erppurchaseordermaster.ourcontactpersonid,
ourcontactpersoniddesc: res.erppurchaseordermaster.ourcontactpersoniddesc,
billbranchid: res.erppurchaseordermaster.billbranchid,
billbranchiddesc: res.erppurchaseordermaster.billbranchiddesc,
deliverybranchid: res.erppurchaseordermaster.deliverybranchid,
deliverybranchiddesc: res.erppurchaseordermaster.deliverybranchiddesc,
multicompany: res.erppurchaseordermaster.multicompany,
supplierid: res.erppurchaseordermaster.supplierid,
supplieriddesc: res.erppurchaseordermaster.supplieriddesc,
suppliercontactid: res.erppurchaseordermaster.suppliercontactid,
suppliercontactiddesc: res.erppurchaseordermaster.suppliercontactiddesc,
supplierreference: res.erppurchaseordermaster.supplierreference,
creditdays: res.erppurchaseordermaster.creditdays,
creditdaysdesc: res.erppurchaseordermaster.creditdaysdesc,
paymentterms: res.erppurchaseordermaster.paymentterms,
paymenttermsdesc: res.erppurchaseordermaster.paymenttermsdesc,
termsandconditions: res.erppurchaseordermaster.termsandconditions,
tcattachment: res.erppurchaseordermaster.tcattachment,
shippingdetails: res.erppurchaseordermaster.shippingdetails,
suppliernotes: res.erppurchaseordermaster.suppliernotes,
costcenterid: res.erppurchaseordermaster.costcenterid,
costcenteriddesc: res.erppurchaseordermaster.costcenteriddesc,
incoterms: res.erppurchaseordermaster.incoterms,
incotermsdesc: res.erppurchaseordermaster.incotermsdesc,
reference: res.erppurchaseordermaster.reference,
expecteddeliverydate: this.ngbDateParserFormatter.parse(res.erppurchaseordermaster.expecteddeliverydate),
validenddate: this.ngbDateParserFormatter.parse(res.erppurchaseordermaster.validenddate),
internalnotes: res.erppurchaseordermaster.internalnotes,
projectid: res.erppurchaseordermaster.projectid,
projectiddesc: res.erppurchaseordermaster.projectiddesc,
customfield: res.erppurchaseordermaster.customfield,
attachment: JSON.parse(res.erppurchaseordermaster.attachment),
vendoracceptance: res.erppurchaseordermaster.vendoracceptance,
vadate: this.ngbDateParserFormatter.parse(res.erppurchaseordermaster.vadate),
supplierquotationid: res.erppurchaseordermaster.supplierquotationid,
supplierquotationiddesc: res.erppurchaseordermaster.supplierquotationiddesc,
supplierquotationver: res.erppurchaseordermaster.supplierquotationver,
totallistprice: res.erppurchaseordermaster.totallistprice,
discount: res.erppurchaseordermaster.discount,
totalvalue: res.erppurchaseordermaster.totalvalue,
shippingcharges: res.erppurchaseordermaster.shippingcharges,
shippingtax: res.erppurchaseordermaster.shippingtax,
shippingtaxamount: res.erppurchaseordermaster.shippingtaxamount,
tax: res.erppurchaseordermaster.tax,
additionaltax: res.erppurchaseordermaster.additionaltax,
adjustment: res.erppurchaseordermaster.adjustment,
poamount: res.erppurchaseordermaster.poamount,
changerequested: res.erppurchaseordermaster.changerequested,
supplierchangerequest: res.erppurchaseordermaster.supplierchangerequest,
postatus: res.erppurchaseordermaster.postatus,
postatusdesc: res.erppurchaseordermaster.postatusdesc,
status: res.erppurchaseordermaster.status,
statusdesc: res.erppurchaseordermaster.statusdesc,
});
this.erppurchaseorderdetailsvisiblelist=res.erppurchaseorderdetailsvisiblelist;
this.erppurchaseorderpaymenttermsvisiblelist=res.erppurchaseorderpaymenttermsvisiblelist;
if(this.erppurchaseordermasterForm.get('customfield').value!=null && this.erppurchaseordermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erppurchaseordermasterForm.get('customfield').value);
this.FillCustomField();
if(this.erppurchaseordermasterForm.get('attachment').value!=null && this.erppurchaseordermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erppurchaseordermasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.bocontactservice.getListBysourcereference(this.f.supplierid.value).then(res =>{
this.suppliercontactidList = res as bocontact[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erppurchaseordermasterservice.erppurchaseorderdetails = res.erppurchaseorderdetails;
this.SeterppurchaseorderdetailsTableConfig();
this.erppurchaseorderdetailsLoadTable();
  setTimeout(() => {
  this.SeterppurchaseorderdetailsTableddConfig();
  });
this.erppurchaseordermasterservice.erppurchaseorderpaymentterms = res.erppurchaseorderpaymentterms;
this.SeterppurchaseorderpaymenttermsTableConfig();
this.erppurchaseorderpaymenttermsLoadTable();
  setTimeout(() => {
  this.SeterppurchaseorderpaymenttermsTableddConfig();
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
  for (let key in this.erppurchaseordermasterForm.controls) {
    if (this.erppurchaseordermasterForm.controls[key] != null) {
if(false)
{
if(this.erppurchaseordermasterservice.formData!=null && this.erppurchaseordermasterservice.formData[key]!=null  && this.erppurchaseordermasterservice.formData[key]!='[]' && this.erppurchaseordermasterservice.formData[key]!=undefined && this.erppurchaseordermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchaseordermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchaseordermasterservice.formData!=null && this.erppurchaseordermasterservice.formData[key]!=null   && this.erppurchaseordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchaseordermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchaseordermasterservice.formData!=null && this.erppurchaseordermasterservice.formData[key]!=null   && this.erppurchaseordermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchaseordermasterservice.formData[key]+"'><div class='progress__number'>"+this.erppurchaseordermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchaseordermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchaseordermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erppurchaseordermasterForm.value;
obj.podate=new Date(this.erppurchaseordermasterForm.get('podate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('podate').value)+'  UTC' :null);
obj.expecteddeliverydate=new Date(this.erppurchaseordermasterForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('expecteddeliverydate').value)+'  UTC' :null);
obj.validenddate=new Date(this.erppurchaseordermasterForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('validenddate').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
obj.vadate=new Date(this.erppurchaseordermasterForm.get('vadate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('vadate').value)+'  UTC' :null);
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

private erppurchaseordermastertoggleOption(){
this.erppurchaseordermastershowOption = this.erppurchaseordermastershowOption === true ? false : true;
}

private erppurchaseorderdetailtoggleOption(){
this.erppurchaseorderdetailshowOption = this.erppurchaseorderdetailshowOption === true ? false : true;
}

private erppurchaseorderpaymenttermtoggleOption(){
this.erppurchaseorderpaymenttermshowOption = this.erppurchaseorderpaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchaseordermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchaseordermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchaseordermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchaseordermasterservice.formData=this.erppurchaseordermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchaseordermasterForm.controls[key] != null)
    {
        this.erppurchaseordermasterservice.formData[key] = this.erppurchaseordermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erppurchaseordermasterservice.formData.podate=new Date(this.erppurchaseordermasterForm.get('podate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('podate').value)+'  UTC' :null);
this.erppurchaseordermasterservice.formData.expecteddeliverydate=new Date(this.erppurchaseordermasterForm.get('expecteddeliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('expecteddeliverydate').value)+'  UTC' :null);
this.erppurchaseordermasterservice.formData.validenddate=new Date(this.erppurchaseordermasterForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('validenddate').value)+'  UTC' :null);
if(customfields!=null)this.erppurchaseordermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erppurchaseordermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erppurchaseordermasterservice.formData.vadate=new Date(this.erppurchaseordermasterForm.get('vadate').value ? this.ngbDateParserFormatter.format(this.erppurchaseordermasterForm.get('vadate').value)+'  UTC' :null);
this.erppurchaseordermasterservice.formData.DeletederppurchaseorderdetailIDs = this.DeletederppurchaseorderdetailIDs;
this.erppurchaseordermasterservice.formData.DeletederppurchaseorderpaymenttermIDs = this.DeletederppurchaseorderpaymenttermIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erppurchaseordermasterservice.formData);
this.erppurchaseordermasterservice.formData=this.erppurchaseordermasterForm.value;
this.erppurchaseordermasterservice.saveOrUpdateerppurchaseordermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erppurchaseorderdetailssource.data)
{
    for (let i = 0; i < this.erppurchaseorderdetailssource.data.length; i++)
    {
        if (this.erppurchaseorderdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erppurchaseorderdetailssource.data[i].fileattachmentlist);
    }
}
if (this.erppurchaseorderpaymenttermssource.data)
{
    for (let i = 0; i < this.erppurchaseorderpaymenttermssource.data.length; i++)
    {
        if (this.erppurchaseorderpaymenttermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erppurchaseorderpaymenttermssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseordermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchaseordermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseordermaster);
}
else
{
this.FillData(res);
}
}
this.erppurchaseordermasterForm.markAsUntouched();
this.erppurchaseordermasterForm.markAsPristine();
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
data: {branchid:this.erppurchaseordermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erppurchaseordermasterForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditourcontactpersonid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erppurchaseordermasterForm.get('ourcontactpersonid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbillbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erppurchaseordermasterForm.get('billbranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverybranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erppurchaseordermasterForm.get('deliverybranchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erppurchaseordermasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsuppliercontactid( contactid) {
/*let ScreenType='2';
this.dialog.open(bocontactComponent, 
{
data: {contactid:this.erppurchaseordermasterForm.get('suppliercontactid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenterid( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erppurchaseordermasterForm.get('costcenterid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erppurchaseordermasterForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierquotationid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erppurchaseordermasterForm.get('supplierquotationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerppurchaseorderdetail(event:any,podetailid:any, poid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erppurchaseorderdetailComponent, 
{
data:  {  showview:false,save:false,event,podetailid, poid,visiblelist:this.erppurchaseorderdetailsvisiblelist,  hidelist:this.erppurchaseorderdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erppurchaseorderdetailssource.add(res);
this.erppurchaseorderdetailssource.refresh();
}
else
{
this.erppurchaseorderdetailssource.update(event.data, res);
}
}
});
}

onDeleteerppurchaseorderdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederppurchaseorderdetailIDs += childID + ",";
this.erppurchaseordermasterservice.erppurchaseorderdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerppurchaseorderpaymentterm(event:any,paytermid:any, poid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erppurchaseorderpaymenttermComponent, 
{
data:  {  showview:false,save:false,event,paytermid, poid,visiblelist:this.erppurchaseorderpaymenttermsvisiblelist,  hidelist:this.erppurchaseorderpaymenttermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erppurchaseorderpaymenttermssource.add(res);
this.erppurchaseorderpaymenttermssource.refresh();
}
else
{
this.erppurchaseorderpaymenttermssource.update(event.data, res);
}
}
});
}

onDeleteerppurchaseorderpaymentterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederppurchaseorderpaymenttermIDs += childID + ",";
this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.splice(i, 1);
//this.updateGrandTotal();
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erppurchaseorderdetails
erppurchaseorderdetailssettings:any;
erppurchaseorderdetailssource: any;

showerppurchaseorderdetailsCheckbox()
{
debugger;
if(this.tblerppurchaseorderdetailssource.settings['selectMode']== 'multi')this.tblerppurchaseorderdetailssource.settings['selectMode']= 'single';
else
this.tblerppurchaseorderdetailssource.settings['selectMode']= 'multi';
this.tblerppurchaseorderdetailssource.initGrid();
}
deleteerppurchaseorderdetailsAll()
{
this.tblerppurchaseorderdetailssource.settings['selectMode'] = 'single';
}
showerppurchaseorderdetailsFilter()
{
  setTimeout(() => {
  this.SeterppurchaseorderdetailsTableddConfig();
  });
      if(this.tblerppurchaseorderdetailssource.settings!=null)this.tblerppurchaseorderdetailssource.settings['hideSubHeader'] =!this.tblerppurchaseorderdetailssource.settings['hideSubHeader'];
this.tblerppurchaseorderdetailssource.initGrid();
}
showerppurchaseorderdetailsInActive()
{
}
enableerppurchaseorderdetailsInActive()
{
}
async SeterppurchaseorderdetailsTableddConfig()
{
if(!this.bfilterPopulateerppurchaseorderdetails){

this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res=>
{
var datapoid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailspoid3.push(defaultobj);
for(let i=0; i<datapoid2.length; i++){
var obj= { value: datapoid2[i].poid, title:datapoid2[i].ponumber};
this.dataerppurchaseorderdetailspoid3.push(obj);
}
if((this.tblerppurchaseorderdetailssource.settings as any).columns['poid'])
{
(this.tblerppurchaseorderdetailssource.settings as any).columns['poid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailspoid3));
this.tblerppurchaseorderdetailssource.initGrid();
}
});

this.erpsuppliermasterservice.geterpsuppliermastersList().then(res=>
{
var datasupplierid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailssupplierid3.push(defaultobj);
for(let i=0; i<datasupplierid2.length; i++){
var obj= { value: datasupplierid2[i].supplierid, title:datasupplierid2[i].suppliercode};
this.dataerppurchaseorderdetailssupplierid3.push(obj);
}
if((this.tblerppurchaseorderdetailssource.settings as any).columns['supplierid'])
{
(this.tblerppurchaseorderdetailssource.settings as any).columns['supplierid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailssupplierid3));
this.tblerppurchaseorderdetailssource.initGrid();
}
});

this.erppurchaseorderdetailservice.geterppurchaseorderdetailsList().then(res=>
{
var datapodetailid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailspodetailid3.push(defaultobj);
for(let i=0; i<datapodetailid2.length; i++){
var obj= { value: datapodetailid2[i].podetailid, title:datapodetailid2[i].description};
this.dataerppurchaseorderdetailspodetailid3.push(obj);
}
if((this.tblerppurchaseorderdetailssource.settings as any).columns['podetailid'])
{
(this.tblerppurchaseorderdetailssource.settings as any).columns['podetailid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailspodetailid3));
this.tblerppurchaseorderdetailssource.initGrid();
}
});

this.configservice.getList("detailtype").then(res=>
{
var datadetailtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailsdetailtype3.push(defaultobj);
for(let i=0; i<datadetailtype2.length; i++){
var obj= { value: datadetailtype2[i].configkey, title: datadetailtype2[i].configtext};
this.dataerppurchaseorderdetailsdetailtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaseorderdetailssource.settings);
if(clone.columns['detailtype']!=undefined)clone.columns['detailtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsdetailtype3)), }, };
if(clone.columns['detailtype']!=undefined)clone.columns['detailtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsdetailtype3)), }, };
this.tblerppurchaseorderdetailssource.settings =  clone;
this.tblerppurchaseorderdetailssource.initGrid();
});

this.erpitemmasterservice.geterpitemmastersList().then(res=>
{
var dataitemid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailsitemid3.push(defaultobj);
for(let i=0; i<dataitemid2.length; i++){
var obj= { value: dataitemid2[i].itemid, title:dataitemid2[i].itemcode};
this.dataerppurchaseorderdetailsitemid3.push(obj);
}
if((this.tblerppurchaseorderdetailssource.settings as any).columns['itemid'])
{
(this.tblerppurchaseorderdetailssource.settings as any).columns['itemid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsitemid3));
this.tblerppurchaseorderdetailssource.initGrid();
}
});

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.dataerppurchaseorderdetailsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaseorderdetailssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsuom3)), }, };
this.tblerppurchaseorderdetailssource.settings =  clone;
this.tblerppurchaseorderdetailssource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailscurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.dataerppurchaseorderdetailscurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaseorderdetailssource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailscurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailscurrency3)), }, };
this.tblerppurchaseorderdetailssource.settings =  clone;
this.tblerppurchaseorderdetailssource.initGrid();
});

this.configservice.getList("discounttype").then(res=>
{
var datadiscounttype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailsdiscounttype3.push(defaultobj);
for(let i=0; i<datadiscounttype2.length; i++){
var obj= { value: datadiscounttype2[i].configkey, title: datadiscounttype2[i].configtext};
this.dataerppurchaseorderdetailsdiscounttype3.push(obj);
}
var clone = this.sharedService.clone(this.tblerppurchaseorderdetailssource.settings);
if(clone.columns['discounttype']!=undefined)clone.columns['discounttype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsdiscounttype3)), }, };
if(clone.columns['discounttype']!=undefined)clone.columns['discounttype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailsdiscounttype3)), }, };
this.tblerppurchaseorderdetailssource.settings =  clone;
this.tblerppurchaseorderdetailssource.initGrid();
});

this.erptaxmasterservice.geterptaxmastersList().then(res=>
{
var datatax1name2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerppurchaseorderdetailstax1name3.push(defaultobj);
for(let i=0; i<datatax1name2.length; i++){
var obj= { value: datatax1name2[i].taxid, title:datatax1name2[i].taxname};
this.dataerppurchaseorderdetailstax1name3.push(obj);
}
if((this.tblerppurchaseorderdetailssource.settings as any).columns['tax1name'])
{
(this.tblerppurchaseorderdetailssource.settings as any).columns['tax1name'].editor.config.list=JSON.parse(JSON.stringify(this.dataerppurchaseorderdetailstax1name3));
this.tblerppurchaseorderdetailssource.initGrid();
}
});
}
this.bfilterPopulateerppurchaseorderdetails=true;
}
async erppurchaseorderdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterppurchaseorderdetailsTableConfig()
{
this.erppurchaseorderdetailssettings = {
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
var element= this.dataerppurchaseorderdetailssupplierid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
detailtype: {
title: 'Detail Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaseorderdetailsdetailtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
itemid: {
title: 'Item',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'cmpvs',reportcode:'cmpvs',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaseorderdetailsitemid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaseorderdetailsuom3.find(c=>c.value==cell);
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
var element= this.dataerppurchaseorderdetailscurrency3.find(c=>c.value==cell);
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
title: 'Discountpercent',
type: 'number',
filter:true,
},
discounttype: {
title: 'Discount Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaseorderdetailsdiscounttype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
saleprice: {
title: 'Sale Price',
type: 'number',
filter:true,
},
tax1name: {
title: 'Tax1 Name',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerppurchaseorderdetailstax1name3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
totalquotevalue: {
title: 'Total Quote Value',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: 'number',
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
erppurchaseorderdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaseorderdetailsID)>=0)
{
this.erppurchaseorderdetailssource=new LocalDataSource();
this.erppurchaseorderdetailssource.load(this.erppurchaseordermasterservice.erppurchaseorderdetails as  any as LocalDataSource);
this.erppurchaseorderdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erppurchaseorderdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erppurchaseordermasterservice.erppurchaseorderdetails.length == 0)
{
    this.tblerppurchaseorderdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erppurchaseorderdetail();
    this.erppurchaseordermasterservice.erppurchaseorderdetails.push(obj);
    this.erppurchaseorderdetailssource.refresh();
    if ((this.erppurchaseordermasterservice.erppurchaseorderdetails.length / this.erppurchaseorderdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erppurchaseorderdetailssource.getPaging().page)
    {
        this.erppurchaseorderdetailssource.setPage((this.erppurchaseordermasterservice.erppurchaseorderdetails.length / this.erppurchaseorderdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerppurchaseorderdetailssource.grid.edit(this.tblerppurchaseorderdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erppurchaseorderdetailssource.data.indexOf(event.data);
this.onDeleteerppurchaseorderdetail(event,event.data.podetailid,((this.erppurchaseorderdetailssource.getPaging().page-1) *this.erppurchaseorderdetailssource.getPaging().perPage)+index);
this.erppurchaseorderdetailssource.refresh();
break;
}
}

*/
erppurchaseorderdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerppurchaseorderdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerppurchaseorderdetail(event,event.data.podetailid,this.formid);
break;
case 'delete':
this.onDeleteerppurchaseorderdetail(event,event.data.podetailid,((this.erppurchaseorderdetailssource.getPaging().page-1) *this.erppurchaseorderdetailssource.getPaging().perPage)+event.index);
this.erppurchaseorderdetailssource.refresh();
break;
}
}
erppurchaseorderdetailsonDelete(obj) {
let podetailid=obj.data.podetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erppurchaseordermasterservice.deleteerppurchaseordermaster(podetailid).then(res=>
this.erppurchaseorderdetailsLoadTable()
);
}
}
erppurchaseorderdetailsPaging(val)
{
debugger;
this.erppurchaseorderdetailssource.setPaging(1, val, true);
}

handleerppurchaseorderdetailsGridSelected(event:any) {
this.erppurchaseorderdetailsselectedindex=this.erppurchaseordermasterservice.erppurchaseorderdetails.findIndex(i => i.podetailid === event.data.podetailid);
}
IserppurchaseorderdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaseorderdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erppurchaseorderdetails
//start of Grid Codes erppurchaseorderpaymentterms
erppurchaseorderpaymenttermssettings:any;
erppurchaseorderpaymenttermssource: any;

showerppurchaseorderpaymenttermsCheckbox()
{
debugger;
if(this.tblerppurchaseorderpaymenttermssource.settings['selectMode']== 'multi')this.tblerppurchaseorderpaymenttermssource.settings['selectMode']= 'single';
else
this.tblerppurchaseorderpaymenttermssource.settings['selectMode']= 'multi';
this.tblerppurchaseorderpaymenttermssource.initGrid();
}
deleteerppurchaseorderpaymenttermsAll()
{
this.tblerppurchaseorderpaymenttermssource.settings['selectMode'] = 'single';
}
showerppurchaseorderpaymenttermsFilter()
{
  setTimeout(() => {
  this.SeterppurchaseorderpaymenttermsTableddConfig();
  });
      if(this.tblerppurchaseorderpaymenttermssource.settings!=null)this.tblerppurchaseorderpaymenttermssource.settings['hideSubHeader'] =!this.tblerppurchaseorderpaymenttermssource.settings['hideSubHeader'];
this.tblerppurchaseorderpaymenttermssource.initGrid();
}
showerppurchaseorderpaymenttermsInActive()
{
}
enableerppurchaseorderpaymenttermsInActive()
{
}
async SeterppurchaseorderpaymenttermsTableddConfig()
{
if(!this.bfilterPopulateerppurchaseorderpaymentterms){
}
this.bfilterPopulateerppurchaseorderpaymentterms=true;
}
async erppurchaseorderpaymenttermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterppurchaseorderpaymenttermsTableConfig()
{
this.erppurchaseorderpaymenttermssettings = {
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
rfqid: {
title: 'R F Q',
type: 'number',
filter:true,
},
quoteid: {
title: 'Quote',
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
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: '',
filter:true,
},
approvalremarks: {
title: 'Approval Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
apid: {
title: 'A P',
type: 'number',
filter:true,
},
},
};
}
erppurchaseorderpaymenttermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaseorderpaymenttermsID)>=0)
{
this.erppurchaseorderpaymenttermssource=new LocalDataSource();
this.erppurchaseorderpaymenttermssource.load(this.erppurchaseordermasterservice.erppurchaseorderpaymentterms as  any as LocalDataSource);
this.erppurchaseorderpaymenttermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erppurchaseorderpaymenttermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.length == 0)
{
    this.tblerppurchaseorderpaymenttermssource.grid.createFormShown = true;
}
else
{
    let obj = new erppurchaseorderpaymentterm();
    this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.push(obj);
    this.erppurchaseorderpaymenttermssource.refresh();
    if ((this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.length / this.erppurchaseorderpaymenttermssource.getPaging().perPage).toFixed(0) + 1 != this.erppurchaseorderpaymenttermssource.getPaging().page)
    {
        this.erppurchaseorderpaymenttermssource.setPage((this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.length / this.erppurchaseorderpaymenttermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerppurchaseorderpaymenttermssource.grid.edit(this.tblerppurchaseorderpaymenttermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erppurchaseorderpaymenttermssource.data.indexOf(event.data);
this.onDeleteerppurchaseorderpaymentterm(event,event.data.paytermid,((this.erppurchaseorderpaymenttermssource.getPaging().page-1) *this.erppurchaseorderpaymenttermssource.getPaging().perPage)+index);
this.erppurchaseorderpaymenttermssource.refresh();
break;
}
}

*/
erppurchaseorderpaymenttermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerppurchaseorderpaymentterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerppurchaseorderpaymentterm(event,event.data.paytermid,this.formid);
break;
case 'delete':
this.onDeleteerppurchaseorderpaymentterm(event,event.data.paytermid,((this.erppurchaseorderpaymenttermssource.getPaging().page-1) *this.erppurchaseorderpaymenttermssource.getPaging().perPage)+event.index);
this.erppurchaseorderpaymenttermssource.refresh();
break;
}
}
erppurchaseorderpaymenttermsonDelete(obj) {
let paytermid=obj.data.paytermid;
if (confirm('Are you sure to delete this record ?')) {
this.erppurchaseordermasterservice.deleteerppurchaseordermaster(paytermid).then(res=>
this.erppurchaseorderpaymenttermsLoadTable()
);
}
}
erppurchaseorderpaymenttermsPaging(val)
{
debugger;
this.erppurchaseorderpaymenttermssource.setPaging(1, val, true);
}

handleerppurchaseorderpaymenttermsGridSelected(event:any) {
this.erppurchaseorderpaymenttermsselectedindex=this.erppurchaseordermasterservice.erppurchaseorderpaymentterms.findIndex(i => i.paytermid === event.data.paytermid);
}
IserppurchaseorderpaymenttermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchaseorderpaymenttermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erppurchaseorderpaymentterms

}



