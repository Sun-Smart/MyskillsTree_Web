import { erprfqmasterService } from './../../../service/erprfqmaster.service';
import { erprfqmaster } from './../../../model/erprfqmaster.model';
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
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
//detail table services
import { erprfqsupplier } from './../../../model/erprfqsupplier.model';
import { erprfqsupplierComponent } from './../../../pages/forms/erprfqsupplier/erprfqsupplier.component';
//FK services
import { erpsuppliermaster,IerpsuppliermasterResponse } from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
import { erppurchaserequestdetail,IerppurchaserequestdetailResponse } from './../../../model/erppurchaserequestdetail.model';
import { erppurchaserequestdetailComponent } from './../../../pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.component';
import { erppurchaserequestdetailService } from './../../../service/erppurchaserequestdetail.service';
import { erprfqdetail } from './../../../model/erprfqdetail.model';
import { erprfqdetailComponent } from './../../../pages/forms/erprfqdetail/erprfqdetail.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { erppurchaseordermaster,IerppurchaseordermasterResponse } from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
import { erppurchaserequest,IerppurchaserequestResponse } from './../../../model/erppurchaserequest.model';
import { erppurchaserequestComponent } from './../../../pages/forms/erppurchaserequest/erppurchaserequest.component';
import { erppurchaserequestService } from './../../../service/erppurchaserequest.service';
import { erpfaaccountmaster,IerpfaaccountmasterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
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
selector: 'app-erprfqmaster',
templateUrl: './erprfqmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erprfqmasterComponent implements OnInit {
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
bfilterPopulateerprfqmasters:boolean=false;
dataerprfqmastersrfqid3:any=[];
dataerprfqmastersshipto3:any=[];
dataerprfqmastersbillto3:any=[];
dataerprfqmastersapprovalstatus3:any=[];
dataerprfqsupplierssupplierid3:any=[];
dataerprfqsuppliersrfqdetailid3:any=[];
dataerprfqsuppliersrfqid3:any=[];
bfilterPopulateerprfqsuppliers:boolean=false;
dataerprfqdetailsapprovedby3:any=[];
dataerprfqdetailsitemid3:any=[];
dataerprfqdetailssupplierid3:any=[];
dataerprfqdetailsitemcategory3:any=[];
dataerprfqdetailsitemtype3:any=[];
dataerprfqdetailsuom3:any=[];
dataerprfqdetailsrfqid3:any=[];
dataerprfqdetailsrfqdetailid3:any=[];
dataerprfqdetailsapprovalstatus3:any=[];
bfilterPopulateerprfqdetails:boolean=false;
dataerppurchaserequestdetailsapprovedby3:any=[];
dataerppurchaserequestdetailsuom3:any=[];
dataerppurchaserequestdetailsitemcategory3:any=[];
dataerppurchaserequestdetailsitemsubcategory3:any=[];
dataerppurchaserequestdetailsrfqid3:any=[];
dataerppurchaserequestdetailssupplierid3:any=[];
dataerppurchaserequestdetailspoid3:any=[];
dataerppurchaserequestdetailsprsid3:any=[];
dataerppurchaserequestdetailsaccountid3:any=[];
dataerppurchaserequestdetailsitemid3:any=[];
dataerppurchaserequestdetailsapprovalstatus3:any=[];
dataerppurchaserequestdetailscurrencyid3:any=[];
bfilterPopulateerppurchaserequestdetails:boolean=false;
@ViewChild('tblerprfqsupplierssource',{static:false}) tblerprfqsupplierssource: Ng2SmartTableComponent;
@ViewChild('tblerprfqdetailssource',{static:false}) tblerprfqdetailssource: Ng2SmartTableComponent;
@ViewChild('tblerppurchaserequestdetailssource',{static:false}) tblerppurchaserequestdetailssource: Ng2SmartTableComponent;
 erprfqmasterForm: FormGroup;
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
shiptoList: bobranchlocation[];
shiptooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
shipto_bobranchlocationsForm: FormGroup;//autocomplete
shipto_bobranchlocationsoptions:any;//autocomplete
shipto_bobranchlocationsformatter:any;//autocomplete
billtoList: bobranchmaster[];
billtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
billto_bobranchmastersForm: FormGroup;//autocomplete
billto_bobranchmastersoptions:any;//autocomplete
billto_bobranchmastersformatter:any;//autocomplete
approvalstatusList: boconfigvalue[];
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
erprfqmastershowOption:boolean;
erprfqsuppliershowOption:boolean;
erprfqdetailshowOption:boolean;
erppurchaserequestdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erprfqsuppliersvisiblelist:any;
erprfqsuppliershidelist:any;
erprfqdetailsvisiblelist:any;
erprfqdetailshidelist:any;
erppurchaserequestdetailsvisiblelist:any;
erppurchaserequestdetailshidelist:any;

DeletederprfqsupplierIDs: string="";
erprfqsuppliersID: string = "1";
erprfqsuppliersselectedindex:any;
DeletederprfqdetailIDs: string="";
erprfqdetailsID: string = "2";
erprfqdetailsselectedindex:any;
DeletederppurchaserequestdetailIDs: string="";
erppurchaserequestdetailsID: string = "3";
erppurchaserequestdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erprfqmasterservice: erprfqmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erppurchaserequestdetailservice: erppurchaserequestdetailService,
private bousermasterservice: bousermasterService,
private erpitemmasterservice: erpitemmasterService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erppurchaserequestservice: erppurchaserequestService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchlocationservice:bobranchlocationService,
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
this.erprfqmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
rfqid: [null],
rfqiddesc: [null],
rfqcode: [null],
rfqdate: [null],
duedate: [null],
closedate: [null],
shipto: [null],
shiptodesc: [null],
billto: [null],
billtodesc: [null],
description: [null],
rfqremarks: [null],
customfield: [null],
attachment: [null],
multicompanyrfq: [null],
status: [null],
statusdesc: [null],
approvalstatus: [null],
approvalstatusdesc: [null],
approvedby: [null],
});
}

get f() { return this.erprfqmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erprfqmasterForm.dirty && this.erprfqmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.rfqid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.rfqid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.rfqid && pkDetail) {
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
let erprfqmasterid = null;

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
this.formid=erprfqmasterid;
//this.sharedService.alert(erprfqmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterprfqsuppliersTableConfig();
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });

this.SeterprfqdetailsTableConfig();
  setTimeout(() => {
  this.SeterprfqdetailsTableddConfig();
  });

this.SeterppurchaserequestdetailsTableConfig();
  setTimeout(() => {
  this.SeterppurchaserequestdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erprfqmasterservice.formData && this.erprfqmasterservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erprfqmasterForm.patchValue({
    rfqid: this.erprfqmasterservice.formData.rfqid,
    rfqiddesc: this.erprfqmasterservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erprfqmasterForm.get('rfqid').value);
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
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.shiptoList = res as bobranchlocation[];
if(this.erprfqmasterservice.formData && this.erprfqmasterservice.formData.shipto){
this.shiptooptionsEvent.emit(this.shiptoList);
this.erprfqmasterForm.patchValue({
    shipto: this.erprfqmasterservice.formData.shipto,
    shiptodesc: this.erprfqmasterservice.formData.shiptodesc,
});
}
{
let arrshipto = this.shiptoList.filter(v => v.locationid == this.erprfqmasterForm.get('shipto').value);
let objshipto;
if (arrshipto.length > 0) objshipto = arrshipto[0];
if (objshipto)
{
}
}
}
).catch((err) => {console.log(err);});
this.shipto_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.shiptoList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.shipto_bobranchlocationsformatter = (result: any) => result.locationname;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.billtoList = res as bobranchmaster[];
if(this.erprfqmasterservice.formData && this.erprfqmasterservice.formData.billto){
this.billtooptionsEvent.emit(this.billtoList);
this.erprfqmasterForm.patchValue({
    billto: this.erprfqmasterservice.formData.billto,
    billtodesc: this.erprfqmasterservice.formData.billtodesc,
});
}
{
let arrbillto = this.billtoList.filter(v => v.branchid == this.erprfqmasterForm.get('billto').value);
let objbillto;
if (arrbillto.length > 0) objbillto = arrbillto[0];
if (objbillto)
{
}
}
}
).catch((err) => {console.log(err);});
this.billto_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.billtoList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.billto_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("approvalstatus").then(res => this.approvalstatusList = res as boconfigvalue[]);

//autocomplete
    this.erprfqmasterservice.geterprfqmastersList().then(res => {
      this.pkList = res as erprfqmaster[];
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
this.erprfqmasterForm.markAsUntouched();
this.erprfqmasterForm.markAsPristine();
}
onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erprfqmasterForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelectedshipto(shiptoDetail: any) {
if (shiptoDetail.locationid && shiptoDetail) {
this.erprfqmasterForm.patchValue({
shipto: shiptoDetail.locationid,
shiptodesc: shiptoDetail.locationname,

});

}
}

onSelectedbillto(billtoDetail: any) {
if (billtoDetail.branchid && billtoDetail) {
this.erprfqmasterForm.patchValue({
billto: billtoDetail.branchid,
billtodesc: billtoDetail.branchname,

});

}
}




resetForm() {
if (this.erprfqmasterForm != null)
this.erprfqmasterForm.reset();
this.erprfqmasterForm.patchValue({
billto: this.sessiondata.branchid,
billtodesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erprfqmasterservice.erprfqsuppliers=[];
this.erprfqsuppliersLoadTable();
this.erprfqmasterservice.erprfqdetails=[];
this.erprfqdetailsLoadTable();
this.erprfqmasterservice.erppurchaserequestdetails=[];
this.erppurchaserequestdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let rfqid = this.erprfqmasterForm.get('rfqid').value;
        if(rfqid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erprfqmasterservice.deleteerprfqmaster(rfqid).then(res =>
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
    this.erprfqmasterForm.patchValue({
        rfqid: null
    });
    if(this.erprfqmasterservice.formData.rfqid!=null)this.erprfqmasterservice.formData.rfqid=null;
for (let i=0;i<this.erprfqmasterservice.erprfqsuppliers.length;i++) {
this.erprfqmasterservice.erprfqsuppliers[i].rfqitemsupplierid=null;
}
for (let i=0;i<this.erprfqmasterservice.erprfqdetails.length;i++) {
this.erprfqmasterservice.erprfqdetails[i].rfqdetailid=null;
}
for (let i=0;i<this.erprfqmasterservice.erppurchaserequestdetails.length;i++) {
this.erprfqmasterservice.erppurchaserequestdetails[i].prsdetailid=null;
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
        else if(key=="rfqdate")
this.erprfqmasterForm.patchValue({"rfqdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.erprfqmasterForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="closedate")
this.erprfqmasterForm.patchValue({"closedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erprfqmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erprfqmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erprfqmasterForm.controls[key]!=undefined)
{
this.erprfqmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erprfqmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
rfqidonChange(evt:any){
let e=evt.value;
}
rfqcodeonChange(evt:any){
let e=evt.value;
}
rfqdateonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
closedateonChange(evt:any){
let e=evt.value;
}
shiptoonChange(evt:any){
let e=evt.value;
}
billtoonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
rfqremarksonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
multicompanyrfqonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
approvalstatusonChange(evt:any){
let e=this.f.approvalstatus.value as any;
this.erprfqmasterForm.patchValue({approvalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
approvedbyonChange(evt:any){
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
  


editerprfqmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erprfqmasterservice.geterprfqmastersByEID(pkcol).then(res => {

this.erprfqmasterservice.formData=res.erprfqmaster;
let formproperty=res.erprfqmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erprfqmaster.pkcol;
this.formid=res.erprfqmaster.rfqid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erprfqmaster.rfqid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erprfqmasterForm.patchValue({
rfqid: res.erprfqmaster.rfqid,
rfqiddesc: res.erprfqmaster.rfqiddesc,
rfqcode: res.erprfqmaster.rfqcode,
rfqdate: this.ngbDateParserFormatter.parse(res.erprfqmaster.rfqdate),
duedate: this.ngbDateParserFormatter.parse(res.erprfqmaster.duedate),
closedate: this.ngbDateParserFormatter.parse(res.erprfqmaster.closedate),
shipto: res.erprfqmaster.shipto,
shiptodesc: res.erprfqmaster.shiptodesc,
billto: res.erprfqmaster.billto,
billtodesc: res.erprfqmaster.billtodesc,
description: res.erprfqmaster.description,
rfqremarks: res.erprfqmaster.rfqremarks,
customfield: res.erprfqmaster.customfield,
attachment: JSON.parse(res.erprfqmaster.attachment),
multicompanyrfq: res.erprfqmaster.multicompanyrfq,
status: res.erprfqmaster.status,
statusdesc: res.erprfqmaster.statusdesc,
approvalstatus: res.erprfqmaster.approvalstatus,
approvalstatusdesc: res.erprfqmaster.approvalstatusdesc,
approvedby: res.erprfqmaster.approvedby,
});
this.erprfqsuppliersvisiblelist=res.erprfqsuppliersvisiblelist;
this.erprfqdetailsvisiblelist=res.erprfqdetailsvisiblelist;
this.erppurchaserequestdetailsvisiblelist=res.erppurchaserequestdetailsvisiblelist;
if(this.erprfqmasterForm.get('customfield').value!=null && this.erprfqmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erprfqmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erprfqmasterForm.get('attachment').value!=null && this.erprfqmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erprfqmasterForm.get('attachment').value);
//Child Tables if any
this.erprfqmasterservice.erprfqsuppliers = res.erprfqsuppliers;
this.SeterprfqsuppliersTableConfig();
this.erprfqsuppliersLoadTable();
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });
this.erprfqmasterservice.erprfqdetails = res.erprfqdetails;
this.SeterprfqdetailsTableConfig();
this.erprfqdetailsLoadTable();
  setTimeout(() => {
  this.SeterprfqdetailsTableddConfig();
  });
this.erprfqmasterservice.erppurchaserequestdetails = res.erppurchaserequestdetails;
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
  for (let key in this.erprfqmasterForm.controls) {
    if (this.erprfqmasterForm.controls[key] != null) {
if(false)
{
if(this.erprfqmasterservice.formData!=null && this.erprfqmasterservice.formData[key]!=null  && this.erprfqmasterservice.formData[key]!='[]' && this.erprfqmasterservice.formData[key]!=undefined && this.erprfqmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erprfqmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erprfqmasterservice.formData!=null && this.erprfqmasterservice.formData[key]!=null   && this.erprfqmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erprfqmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erprfqmasterservice.formData!=null && this.erprfqmasterservice.formData[key]!=null   && this.erprfqmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erprfqmasterservice.formData[key]+"'><div class='progress__number'>"+this.erprfqmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erprfqmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erprfqmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erprfqmasterForm.value;
obj.rfqdate=new Date(this.erprfqmasterForm.get('rfqdate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('rfqdate').value)+'  UTC' :null);
obj.duedate=new Date(this.erprfqmasterForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('duedate').value)+'  UTC' :null);
obj.closedate=new Date(this.erprfqmasterForm.get('closedate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('closedate').value)+'  UTC' :null);
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

private erprfqmastertoggleOption(){
this.erprfqmastershowOption = this.erprfqmastershowOption === true ? false : true;
}

private erprfqsuppliertoggleOption(){
this.erprfqsuppliershowOption = this.erprfqsuppliershowOption === true ? false : true;
}

private erprfqdetailtoggleOption(){
this.erprfqdetailshowOption = this.erprfqdetailshowOption === true ? false : true;
}

private erppurchaserequestdetailtoggleOption(){
this.erppurchaserequestdetailshowOption = this.erppurchaserequestdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erprfqmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erprfqmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erprfqmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erprfqmasterservice.formData=this.erprfqmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erprfqmasterForm.controls[key] != null)
    {
        this.erprfqmasterservice.formData[key] = this.erprfqmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erprfqmasterservice.formData.rfqdate=new Date(this.erprfqmasterForm.get('rfqdate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('rfqdate').value)+'  UTC' :null);
this.erprfqmasterservice.formData.duedate=new Date(this.erprfqmasterForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('duedate').value)+'  UTC' :null);
this.erprfqmasterservice.formData.closedate=new Date(this.erprfqmasterForm.get('closedate').value ? this.ngbDateParserFormatter.format(this.erprfqmasterForm.get('closedate').value)+'  UTC' :null);
if(customfields!=null)this.erprfqmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erprfqmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erprfqmasterservice.formData.DeletederprfqsupplierIDs = this.DeletederprfqsupplierIDs;
this.erprfqmasterservice.formData.DeletederprfqdetailIDs = this.DeletederprfqdetailIDs;
this.erprfqmasterservice.formData.DeletederppurchaserequestdetailIDs = this.DeletederppurchaserequestdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erprfqmasterservice.formData);
this.erprfqmasterservice.formData=this.erprfqmasterForm.value;
this.erprfqmasterservice.saveOrUpdateerprfqmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erprfqsupplierssource.data)
{
    for (let i = 0; i < this.erprfqsupplierssource.data.length; i++)
    {
        if (this.erprfqsupplierssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erprfqsupplierssource.data[i].fileattachmentlist);
    }
}
if (this.erprfqdetailssource.data)
{
    for (let i = 0; i < this.erprfqdetailssource.data.length; i++)
    {
        if (this.erprfqdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erprfqdetailssource.data[i].fileattachmentlist);
    }
}
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
this.dialogRef.close((res as any).erprfqmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erprfqmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erprfqmaster);
}
else
{
this.FillData(res);
}
}
this.erprfqmasterForm.markAsUntouched();
this.erprfqmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erprfqmasterForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshipto( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.erprfqmasterForm.get('shipto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbillto( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erprfqmasterForm.get('billto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerprfqsupplier(event:any,rfqitemsupplierid:any, rfqid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erprfqsupplierComponent, 
{
data:  {  showview:false,save:true,event,rfqitemsupplierid, rfqid,visiblelist:this.erprfqsuppliersvisiblelist,  hidelist:this.erprfqsuppliershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erprfqsupplierssource.add(res);
this.erprfqsupplierssource.refresh();
}
else
{
this.erprfqsupplierssource.update(event.data, res);
}
}
});
}

onDeleteerprfqsupplier(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederprfqsupplierIDs += childID + ",";
this.erprfqmasterservice.erprfqsuppliers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerprfqdetail(event:any,rfqdetailid:any, rfqid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erprfqdetailComponent, 
{
data:  {  showview:false,save:false,event,rfqdetailid, rfqid,visiblelist:this.erprfqdetailsvisiblelist,  hidelist:this.erprfqdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erprfqdetailssource.add(res);
this.erprfqdetailssource.refresh();
}
else
{
this.erprfqdetailssource.update(event.data, res);
}
}
});
}

onDeleteerprfqdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederprfqdetailIDs += childID + ",";
this.erprfqmasterservice.erprfqdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerppurchaserequestdetail(event:any,prsdetailid:any, rfqid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erppurchaserequestdetailComponent, 
{
data:  {  showview:false,save:true,event,prsdetailid, rfqid,visiblelist:this.erppurchaserequestdetailsvisiblelist,  hidelist:this.erppurchaserequestdetailshidelist,ScreenType:2  },
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
this.erprfqmasterservice.erppurchaserequestdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erprfqsuppliers
erprfqsupplierssettings:any;
erprfqsupplierssource: any;

showerprfqsuppliersCheckbox()
{
debugger;
if(this.tblerprfqsupplierssource.settings['selectMode']== 'multi')this.tblerprfqsupplierssource.settings['selectMode']= 'single';
else
this.tblerprfqsupplierssource.settings['selectMode']= 'multi';
this.tblerprfqsupplierssource.initGrid();
}
deleteerprfqsuppliersAll()
{
this.tblerprfqsupplierssource.settings['selectMode'] = 'single';
}
showerprfqsuppliersFilter()
{
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });
      if(this.tblerprfqsupplierssource.settings!=null)this.tblerprfqsupplierssource.settings['hideSubHeader'] =!this.tblerprfqsupplierssource.settings['hideSubHeader'];
this.tblerprfqsupplierssource.initGrid();
}
showerprfqsuppliersInActive()
{
}
enableerprfqsuppliersInActive()
{
}
async SeterprfqsuppliersTableddConfig()
{
if(!this.bfilterPopulateerprfqsuppliers){
}
this.bfilterPopulateerprfqsuppliers=true;
}
async erprfqsuppliersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterprfqsuppliersTableConfig()
{
this.erprfqsupplierssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, // true,
delete:false,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
columns: {
rfqdetailid: {
title: 'R F Q Detail',
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
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
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
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
contact: {
title: 'Contact',
type: '',
filter:true,
},
notes: {
title: 'Notes',
type: '',
filter:true,
},
supplierquoteid: {
title: 'Supplier Quote',
type: 'number',
filter:true,
},
},
};
}
erprfqsuppliersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqsuppliersID)>=0)
{
this.erprfqsupplierssource=new LocalDataSource();
this.erprfqsupplierssource.load(this.erprfqmasterservice.erprfqsuppliers as  any as LocalDataSource);
this.erprfqsupplierssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erprfqsuppliersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erprfqmasterservice.erprfqsuppliers.length == 0)
{
    this.tblerprfqsupplierssource.grid.createFormShown = true;
}
else
{
    let obj = new erprfqsupplier();
    this.erprfqmasterservice.erprfqsuppliers.push(obj);
    this.erprfqsupplierssource.refresh();
    if ((this.erprfqmasterservice.erprfqsuppliers.length / this.erprfqsupplierssource.getPaging().perPage).toFixed(0) + 1 != this.erprfqsupplierssource.getPaging().page)
    {
        this.erprfqsupplierssource.setPage((this.erprfqmasterservice.erprfqsuppliers.length / this.erprfqsupplierssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerprfqsupplierssource.grid.edit(this.tblerprfqsupplierssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erprfqsupplierssource.data.indexOf(event.data);
this.onDeleteerprfqsupplier(event,event.data.rfqitemsupplierid,((this.erprfqsupplierssource.getPaging().page-1) *this.erprfqsupplierssource.getPaging().perPage)+index);
this.erprfqsupplierssource.refresh();
break;
}
}

*/
erprfqsuppliersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerprfqsupplier(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerprfqsupplier(event,event.data.rfqitemsupplierid,this.formid);
break;
case 'delete':
this.onDeleteerprfqsupplier(event,event.data.rfqitemsupplierid,((this.erprfqsupplierssource.getPaging().page-1) *this.erprfqsupplierssource.getPaging().perPage)+event.index);
this.erprfqsupplierssource.refresh();
break;
}
}
erprfqsuppliersonDelete(obj) {
let rfqitemsupplierid=obj.data.rfqitemsupplierid;
if (confirm('Are you sure to delete this record ?')) {
this.erprfqmasterservice.deleteerprfqmaster(rfqitemsupplierid).then(res=>
this.erprfqsuppliersLoadTable()
);
}
}
erprfqsuppliersPaging(val)
{
debugger;
this.erprfqsupplierssource.setPaging(1, val, true);
}

handleerprfqsuppliersGridSelected(event:any) {
this.erprfqsuppliersselectedindex=this.erprfqmasterservice.erprfqsuppliers.findIndex(i => i.rfqitemsupplierid === event.data.rfqitemsupplierid);
}
IserprfqsuppliersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqsuppliersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erprfqsuppliers
//start of Grid Codes erprfqdetails
erprfqdetailssettings:any;
erprfqdetailssource: any;

showerprfqdetailsCheckbox()
{
debugger;
if(this.tblerprfqdetailssource.settings['selectMode']== 'multi')this.tblerprfqdetailssource.settings['selectMode']= 'single';
else
this.tblerprfqdetailssource.settings['selectMode']= 'multi';
this.tblerprfqdetailssource.initGrid();
}
deleteerprfqdetailsAll()
{
this.tblerprfqdetailssource.settings['selectMode'] = 'single';
}
showerprfqdetailsFilter()
{
  setTimeout(() => {
  this.SeterprfqdetailsTableddConfig();
  });
      if(this.tblerprfqdetailssource.settings!=null)this.tblerprfqdetailssource.settings['hideSubHeader'] =!this.tblerprfqdetailssource.settings['hideSubHeader'];
this.tblerprfqdetailssource.initGrid();
}
showerprfqdetailsInActive()
{
}
enableerprfqdetailsInActive()
{
}
async SeterprfqdetailsTableddConfig()
{
if(!this.bfilterPopulateerprfqdetails){

this.erppurchaserequestdetailservice.geterppurchaserequestdetailsList().then(res=>
{
var datarfqdetailid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailsrfqdetailid3.push(defaultobj);
for(let i=0; i<datarfqdetailid2.length; i++){
var obj= { value: datarfqdetailid2[i].prsdetailid, title:datarfqdetailid2[i].itemdescription};
this.dataerprfqdetailsrfqdetailid3.push(obj);
}
if((this.tblerprfqdetailssource.settings as any).columns['rfqdetailid'])
{
(this.tblerprfqdetailssource.settings as any).columns['rfqdetailid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerprfqdetailsrfqdetailid3));
this.tblerprfqdetailssource.initGrid();
}
});

this.erprfqmasterservice.geterprfqmastersList().then(res=>
{
var datarfqid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailsrfqid3.push(defaultobj);
for(let i=0; i<datarfqid2.length; i++){
var obj= { value: datarfqid2[i].rfqid, title:datarfqid2[i].rfqcode};
this.dataerprfqdetailsrfqid3.push(obj);
}
if((this.tblerprfqdetailssource.settings as any).columns['rfqid'])
{
(this.tblerprfqdetailssource.settings as any).columns['rfqid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerprfqdetailsrfqid3));
this.tblerprfqdetailssource.initGrid();
}
});

this.erpitemmasterservice.geterpitemmastersList().then(res=>
{
var dataitemid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailsitemid3.push(defaultobj);
for(let i=0; i<dataitemid2.length; i++){
var obj= { value: dataitemid2[i].itemid, title:dataitemid2[i].itemcode};
this.dataerprfqdetailsitemid3.push(obj);
}
if((this.tblerprfqdetailssource.settings as any).columns['itemid'])
{
(this.tblerprfqdetailssource.settings as any).columns['itemid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerprfqdetailsitemid3));
this.tblerprfqdetailssource.initGrid();
}
});

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.dataerprfqdetailsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tblerprfqdetailssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerprfqdetailsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerprfqdetailsuom3)), }, };
this.tblerprfqdetailssource.settings =  clone;
this.tblerprfqdetailssource.initGrid();
});

this.erpsuppliermasterservice.geterpsuppliermastersList().then(res=>
{
var datasupplierid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailssupplierid3.push(defaultobj);
for(let i=0; i<datasupplierid2.length; i++){
var obj= { value: datasupplierid2[i].supplierid, title:datasupplierid2[i].suppliercode};
this.dataerprfqdetailssupplierid3.push(obj);
}
if((this.tblerprfqdetailssource.settings as any).columns['supplierid'])
{
(this.tblerprfqdetailssource.settings as any).columns['supplierid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerprfqdetailssupplierid3));
this.tblerprfqdetailssource.initGrid();
}
});

this.configservice.getList("approvalstatus").then(res=>
{
var dataapprovalstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerprfqdetailsapprovalstatus3.push(defaultobj);
for(let i=0; i<dataapprovalstatus2.length; i++){
var obj= { value: dataapprovalstatus2[i].configkey, title: dataapprovalstatus2[i].configtext};
this.dataerprfqdetailsapprovalstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblerprfqdetailssource.settings);
if(clone.columns['approvalstatus']!=undefined)clone.columns['approvalstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerprfqdetailsapprovalstatus3)), }, };
if(clone.columns['approvalstatus']!=undefined)clone.columns['approvalstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerprfqdetailsapprovalstatus3)), }, };
this.tblerprfqdetailssource.settings =  clone;
this.tblerprfqdetailssource.initGrid();
});
}
this.bfilterPopulateerprfqdetails=true;
}
async erprfqdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterprfqdetailsTableConfig()
{
this.erprfqdetailssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'cmpvs',reportcode:'cmpvs',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerprfqdetailsitemid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
itemdescription: {
title: 'Item Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
itemtype: {
title: 'Item Type',
type: '',
filter:true,
},
itemcategory: {
title: 'Item Category',
type: 'number',
filter:true,
},
quantity: {
title: 'Quantity',
type: '',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerprfqdetailsuom3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
supplierid: {
title: 'Supplier',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'qtmcq',reportcode:'qtmcq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerprfqdetailssupplierid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
approvalstatus: {
title: 'Approval Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerprfqdetailsapprovalstatus3.find(c=>c.value==cell);
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
erprfqdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqdetailsID)>=0)
{
this.erprfqdetailssource=new LocalDataSource();
this.erprfqdetailssource.load(this.erprfqmasterservice.erprfqdetails as  any as LocalDataSource);
this.erprfqdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erprfqdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erprfqmasterservice.erprfqdetails.length == 0)
{
    this.tblerprfqdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erprfqdetail();
    this.erprfqmasterservice.erprfqdetails.push(obj);
    this.erprfqdetailssource.refresh();
    if ((this.erprfqmasterservice.erprfqdetails.length / this.erprfqdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erprfqdetailssource.getPaging().page)
    {
        this.erprfqdetailssource.setPage((this.erprfqmasterservice.erprfqdetails.length / this.erprfqdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerprfqdetailssource.grid.edit(this.tblerprfqdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erprfqdetailssource.data.indexOf(event.data);
this.onDeleteerprfqdetail(event,event.data.rfqdetailid,((this.erprfqdetailssource.getPaging().page-1) *this.erprfqdetailssource.getPaging().perPage)+index);
this.erprfqdetailssource.refresh();
break;
}
}

*/
erprfqdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerprfqdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerprfqdetail(event,event.data.rfqdetailid,this.formid);
break;
case 'delete':
this.onDeleteerprfqdetail(event,event.data.rfqdetailid,((this.erprfqdetailssource.getPaging().page-1) *this.erprfqdetailssource.getPaging().perPage)+event.index);
this.erprfqdetailssource.refresh();
break;
}
}
erprfqdetailsonDelete(obj) {
let rfqdetailid=obj.data.rfqdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erprfqmasterservice.deleteerprfqmaster(rfqdetailid).then(res=>
this.erprfqdetailsLoadTable()
);
}
}
erprfqdetailsPaging(val)
{
debugger;
this.erprfqdetailssource.setPaging(1, val, true);
}

handleerprfqdetailsGridSelected(event:any) {
this.erprfqdetailsselectedindex=this.erprfqmasterservice.erprfqdetails.findIndex(i => i.rfqdetailid === event.data.rfqdetailid);
}
IserprfqdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erprfqdetails
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
add: false,
edit: false, // true,
delete:false,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
columns: {
prsid: {
title: 'P R S',
type: 'number',
filter:true,
},
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
this.erppurchaserequestdetailssource.load(this.erprfqmasterservice.erppurchaserequestdetails as  any as LocalDataSource);
this.erppurchaserequestdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erppurchaserequestdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erprfqmasterservice.erppurchaserequestdetails.length == 0)
{
    this.tblerppurchaserequestdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erppurchaserequestdetail();
    this.erprfqmasterservice.erppurchaserequestdetails.push(obj);
    this.erppurchaserequestdetailssource.refresh();
    if ((this.erprfqmasterservice.erppurchaserequestdetails.length / this.erppurchaserequestdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erppurchaserequestdetailssource.getPaging().page)
    {
        this.erppurchaserequestdetailssource.setPage((this.erprfqmasterservice.erppurchaserequestdetails.length / this.erppurchaserequestdetailssource.getPaging().perPage).toFixed(0) + 1);
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
this.erprfqmasterservice.deleteerprfqmaster(prsdetailid).then(res=>
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
this.erppurchaserequestdetailsselectedindex=this.erprfqmasterservice.erppurchaserequestdetails.findIndex(i => i.prsdetailid === event.data.prsdetailid);
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



