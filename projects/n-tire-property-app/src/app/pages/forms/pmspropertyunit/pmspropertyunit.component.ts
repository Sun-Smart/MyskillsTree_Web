import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
import { pmspropertyunit } from './../../../model/pmspropertyunit.model';
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
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyComponent } from './../../../pages/forms/pmsproperty/pmsproperty.component';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmstenant} from './../../../model/pmstenant.model';
import { pmstenantComponent } from './../../../pages/forms/pmstenant/pmstenant.component';
import { pmstenantService } from './../../../service/pmstenant.service';
//popups
//detail table services
import { pmsdeposit } from './../../../model/pmsdeposit.model';
import { pmsdepositComponent } from './../../../pages/forms/pmsdeposit/pmsdeposit.component';
//FK services
import { pmslease,IpmsleaseResponse } from './../../../model/pmslease.model';
import { pmsleaseComponent } from './../../../pages/forms/pmslease/pmslease.component';
import { pmsleaseService } from './../../../service/pmslease.service';
import { pmspropertyowner,IpmspropertyownerResponse } from './../../../model/pmspropertyowner.model';
import { pmspropertyownerComponent } from './../../../pages/forms/pmspropertyowner/pmspropertyowner.component';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
import { pmspdc } from './../../../model/pmspdc.model';
import { pmspdcComponent } from './../../../pages/forms/pmspdc/pmspdc.component';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { pmspropertyapplicants } from './../../../model/pmspropertyapplicants.model';
import { pmspropertyapplicantsComponent } from './../../../pages/forms/pmspropertyapplicants/pmspropertyapplicants.component';
//FK services
import { pmspropertyopexdetail } from './../../../model/pmspropertyopexdetail.model';
import { pmspropertyopexdetailComponent } from './../../../pages/forms/pmspropertyopexdetail/pmspropertyopexdetail.component';
//FK services
import { pmsschedule } from './../../../model/pmsschedule.model';
import { pmsscheduleComponent } from './../../../pages/forms/pmsschedule/pmsschedule.component';
//FK services
import { pmstransaction } from './../../../model/pmstransaction.model';
import { pmstransactionComponent } from './../../../pages/forms/pmstransaction/pmstransaction.component';
//FK services
import { pmstransactionschedule } from './../../../model/pmstransactionschedule.model';
import { pmstransactionscheduleComponent } from './../../../pages/forms/pmstransactionschedule/pmstransactionschedule.component';
//FK services
import { pmsunitcharges } from './../../../model/pmsunitcharges.model';
import { pmsunitchargesComponent } from './../../../pages/forms/pmsunitcharges/pmsunitcharges.component';
//FK services
import { pmspropertyinsurance } from './../../../model/pmspropertyinsurance.model';
import { pmspropertyinsuranceComponent } from './../../../pages/forms/pmspropertyinsurance/pmspropertyinsurance.component';
//FK services
import { pmscharge } from './../../../model/pmscharge.model';
import { pmschargeComponent } from './../../../pages/forms/pmscharge/pmscharge.component';
//FK services
//FK services
import { pmsworkorder } from './../../../model/pmsworkorder.model';
import { pmsworkorderComponent } from './../../../pages/forms/pmsworkorder/pmsworkorder.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
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
selector: 'app-pmspropertyunit',
templateUrl: './pmspropertyunit.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertyunitComponent implements OnInit {
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
bfilterPopulatepmspropertyunits:boolean=false;
datapmspropertyunitspropertyid3:any=[];
datapmspropertyunitsunittype3:any=[];
datapmspropertyunitsbeds3:any=[];
datapmspropertyunitsbaths3:any=[];
datapmspropertyunitsterm3:any=[];
datapmspropertyunitsfirstrentcommissiontype3:any=[];
datapmspropertyunitsrentcommissiontype3:any=[];
datapmspropertyunitsrenewalfeetype3:any=[];
datapmspropertyunitsservicefeetype3:any=[];
datapmspropertyunitsunitstatus3:any=[];
datapmspropertyunitstenantid3:any=[];
datapmsdepositsdeposittype3:any=[];
datapmsdepositstenantid3:any=[];
datapmsdepositsleaseid3:any=[];
datapmsdepositspropertyid3:any=[];
datapmsdepositspaymenttype3:any=[];
datapmsdepositsunitid3:any=[];
datapmsdepositsownerid3:any=[];
bfilterPopulatepmsdeposits:boolean=false;
datapmspdcssubcategoryid3:any=[];
datapmspdcscategoryid3:any=[];
datapmspdcspaymenttype3:any=[];
datapmspdcscollectionmode3:any=[];
datapmspdcspropertyid3:any=[];
datapmspdcstenantid3:any=[];
datapmspdcsunitid3:any=[];
datapmspdcsownerid3:any=[];
bfilterPopulatepmspdcs:boolean=false;
bfilterPopulatepmspropertyapplicants:boolean=false;
datapmspropertyopexdetailscurrency3:any=[];
datapmspropertyopexdetailspropertyid3:any=[];
datapmspropertyopexdetailsunitid3:any=[];
datapmspropertyopexdetailsownerid3:any=[];
bfilterPopulatepmspropertyopexdetails:boolean=false;
datapmsschedulesworkorderfrequency3:any=[];
datapmsschedulesworkordertype3:any=[];
datapmsschedulespriority3:any=[];
datapmsschedulespropertyid3:any=[];
datapmsschedulestenantid3:any=[];
datapmsschedulesunitid3:any=[];
datapmsschedulesownerid3:any=[];
bfilterPopulatepmsschedules:boolean=false;
datapmstransactionspaymentmethod3:any=[];
datapmstransactionstransactionstatus3:any=[];
datapmstransactionstenantid3:any=[];
datapmstransactionscategoryid3:any=[];
datapmstransactionspropertyid3:any=[];
datapmstransactionsleaseid3:any=[];
datapmstransactionssubcategoryid3:any=[];
datapmstransactionsunitid3:any=[];
datapmstransactionsownerid3:any=[];
bfilterPopulatepmstransactions:boolean=false;
datapmstransactionschedulessubcategoryid3:any=[];
datapmstransactionschedulesfrequency3:any=[];
datapmstransactionschedulescategoryid3:any=[];
datapmstransactionschedulesleaseid3:any=[];
datapmstransactionschedulespropertyid3:any=[];
datapmstransactionschedulestenantid3:any=[];
datapmstransactionschedulesunitid3:any=[];
datapmstransactionschedulesownerid3:any=[];
bfilterPopulatepmstransactionschedules:boolean=false;
datapmsunitchargeschargecycle3:any=[];
datapmsunitchargeschargetype3:any=[];
datapmsunitchargespropertyid3:any=[];
datapmsunitchargesunitid3:any=[];
datapmsunitchargesownerid3:any=[];
bfilterPopulatepmsunitcharges:boolean=false;
datapmspropertyinsurancestenantid3:any=[];
datapmspropertyinsurancespropertyid3:any=[];
datapmspropertyinsurancesunitid3:any=[];
bfilterPopulatepmspropertyinsurances:boolean=false;
datapmschargeschargecycle3:any=[];
datapmschargeschargetype3:any=[];
datapmschargesleaseid3:any=[];
datapmschargestenantid3:any=[];
datapmschargespropertyid3:any=[];
datapmschargespaidmode3:any=[];
datapmschargesunitid3:any=[];
datapmschargesownerid3:any=[];
bfilterPopulatepmscharges:boolean=false;
datapmsleasestenantid3:any=[];
datapmsleasespropertyid3:any=[];
datapmsleasesrentcycle3:any=[];
datapmsleasesleasetype3:any=[];
datapmsleasesunitid3:any=[];
datapmsleasesownerid3:any=[];
bfilterPopulatepmsleases:boolean=false;
datapmsworkordersresponsibleid3:any=[];
datapmsworkorderspropertyid3:any=[];
datapmsworkorderstenantid3:any=[];
datapmsworkordersvisittype3:any=[];
datapmsworkorderspriority3:any=[];
datapmsworkordersworkordertype3:any=[];
datapmsworkordersworkorderfrequency3:any=[];
datapmsworkordersownerid3:any=[];
bfilterPopulatepmsworkorders:boolean=false;
@ViewChild('tblpmsdepositssource',{static:false}) tblpmsdepositssource: Ng2SmartTableComponent;
@ViewChild('tblpmspdcssource',{static:false}) tblpmspdcssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyapplicantssource',{static:false}) tblpmspropertyapplicantssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyopexdetailssource',{static:false}) tblpmspropertyopexdetailssource: Ng2SmartTableComponent;
@ViewChild('tblpmsschedulessource',{static:false}) tblpmsschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionssource',{static:false}) tblpmstransactionssource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionschedulessource',{static:false}) tblpmstransactionschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmsunitchargessource',{static:false}) tblpmsunitchargessource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyinsurancessource',{static:false}) tblpmspropertyinsurancessource: Ng2SmartTableComponent;
@ViewChild('tblpmschargessource',{static:false}) tblpmschargessource: Ng2SmartTableComponent;
@ViewChild('tblpmsleasessource',{static:false}) tblpmsleasessource: Ng2SmartTableComponent;
@ViewChild('tblpmsworkorderssource',{static:false}) tblpmsworkorderssource: Ng2SmartTableComponent;
 pmspropertyunitForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unittypeList: boconfigvalue[];
bedsList: boconfigvalue[];
bathsList: boconfigvalue[];
termList: boconfigvalue[];
firstrentcommissiontypeList: boconfigvalue[];
rentcommissiontypeList: boconfigvalue[];
renewalfeetypeList: boconfigvalue[];
servicefeetypeList: boconfigvalue[];
unitstatusList: boconfigvalue[];
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenantid_pmstenantsForm: FormGroup;//autocomplete
tenantid_pmstenantsoptions:any;//autocomplete
tenantid_pmstenantsformatter:any;//autocomplete
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
pmspropertyunitshowOption:boolean;
pmsdepositshowOption:boolean;
pmspdcshowOption:boolean;
pmspropertyapplicantsshowOption:boolean;
pmspropertyopexdetailshowOption:boolean;
pmsscheduleshowOption:boolean;
pmstransactionshowOption:boolean;
pmstransactionscheduleshowOption:boolean;
pmsunitchargesshowOption:boolean;
pmspropertyinsuranceshowOption:boolean;
pmschargeshowOption:boolean;
pmsleaseshowOption:boolean;
pmsworkordershowOption:boolean;
sessiondata:any;
sourcekey:any;



pmsdepositsvisiblelist:any;
pmsdepositshidelist:any;
pmspdcsvisiblelist:any;
pmspdcshidelist:any;
pmspropertyapplicantsvisiblelist:any;
pmspropertyapplicantshidelist:any;
pmspropertyopexdetailsvisiblelist:any;
pmspropertyopexdetailshidelist:any;
pmsschedulesvisiblelist:any;
pmsscheduleshidelist:any;
pmstransactionsvisiblelist:any;
pmstransactionshidelist:any;
pmstransactionschedulesvisiblelist:any;
pmstransactionscheduleshidelist:any;
pmsunitchargesvisiblelist:any;
pmsunitchargeshidelist:any;
pmspropertyinsurancesvisiblelist:any;
pmspropertyinsuranceshidelist:any;
pmschargesvisiblelist:any;
pmschargeshidelist:any;
pmsleasesvisiblelist:any;
pmsleaseshidelist:any;
pmsworkordersvisiblelist:any;
pmsworkordershidelist:any;

DeletedpmsdepositIDs: string="";
pmsdepositsID: string = "1";
pmsdepositsselectedindex:any;
DeletedpmspdcIDs: string="";
pmspdcsID: string = "2";
pmspdcsselectedindex:any;
DeletedpmspropertyapplicantsIDs: string="";
pmspropertyapplicantsID: string = "3";
pmspropertyapplicantsselectedindex:any;
DeletedpmspropertyopexdetailIDs: string="";
pmspropertyopexdetailsID: string = "4";
pmspropertyopexdetailsselectedindex:any;
DeletedpmsscheduleIDs: string="";
pmsschedulesID: string = "5";
pmsschedulesselectedindex:any;
DeletedpmstransactionIDs: string="";
pmstransactionsID: string = "6";
pmstransactionsselectedindex:any;
DeletedpmstransactionscheduleIDs: string="";
pmstransactionschedulesID: string = "7";
pmstransactionschedulesselectedindex:any;
DeletedpmsunitchargesIDs: string="";
pmsunitchargesID: string = "8";
pmsunitchargesselectedindex:any;
DeletedpmspropertyinsuranceIDs: string="";
pmspropertyinsurancesID: string = "9";
pmspropertyinsurancesselectedindex:any;
DeletedpmschargeIDs: string="";
pmschargesID: string = "10";
pmschargesselectedindex:any;
DeletedpmsleaseIDs: string="";
pmsleasesID: string = "11";
pmsleasesselectedindex:any;
DeletedpmsworkorderIDs: string="";
pmsworkordersID: string = "12";
pmsworkordersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmspropertyunitservice: pmspropertyunitService,
private pmstenantservice: pmstenantService,
private pmsleaseservice: pmsleaseService,
private pmspropertyservice: pmspropertyService,
private pmspropertyownerservice: pmspropertyownerService,
private bosubcategorymasterservice: bosubcategorymasterService,
private bomasterdataservice: bomasterdataService,
private hrmsemployeeservice: hrmsemployeeService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.pmspropertyunitForm  = this.fb.group({
pk:[null],
ImageName: [null],
unitid: [null],
propertyid: [null],
propertyiddesc: [null],
unitno: [null],
details: [null],
unittype: [null],
unittypedesc: [null],
address1: [null],
address2: [null],
sqft: [null],
sizedetails: [null],
beds: [null],
bedsdesc: [null],
baths: [null],
bathsdesc: [null],
term: [null],
termdesc: [null],
rent: [null],
deposit: [null],
notes: [null],
assignowner: [null],
ownernotes: [null],
advance: [null],
invoiceday: [null],
hasfirstrentcommission: [null],
firstrentcommissiontype: [null],
firstrentcommissiontypedesc: [null],
firstrentcommission: [null],
hasrentcommission: [null],
rentcommissiontype: [null],
rentcommissiontypedesc: [null],
rentcommission: [null],
hasrenewalfee: [null],
renewalfeetype: [null],
renewalfeetypedesc: [null],
renewalfee: [null],
hasservicefee: [null],
servicefeetype: [null],
servicefeetypedesc: [null],
servicefee: [null],
unitstatus: [null],
unitstatusdesc: [null],
tenantid: [null],
tenantiddesc: [null],
vacateddate: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyunitForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertyunitForm.dirty && this.pmspropertyunitForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.unitid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.unitid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.unitid && pkDetail) {
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
let pmspropertyunitid = null;

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
this.formid=pmspropertyunitid;
//this.sharedService.alert(pmspropertyunitid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmsdepositsTableConfig();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });

this.SetpmspdcsTableConfig();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });

this.SetpmspropertyapplicantsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });

this.SetpmspropertyopexdetailsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });

this.SetpmsschedulesTableConfig();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });

this.SetpmstransactionsTableConfig();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });

this.SetpmstransactionschedulesTableConfig();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });

this.SetpmsunitchargesTableConfig();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });

this.SetpmspropertyinsurancesTableConfig();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });

this.SetpmschargesTableConfig();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });

this.SetpmsleasesTableConfig();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });

this.SetpmsworkordersTableConfig();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmspropertyunitservice.formData && this.pmspropertyunitservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmspropertyunitForm.patchValue({
    propertyid: this.pmspropertyunitservice.formData.propertyid,
    propertyiddesc: this.pmspropertyunitservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmspropertyunitForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
this.configservice.getList("unittype").then(res => this.unittypeList = res as boconfigvalue[]);
this.configservice.getList("beds").then(res => this.bedsList = res as boconfigvalue[]);
this.configservice.getList("baths").then(res => this.bathsList = res as boconfigvalue[]);
this.configservice.getList("propertyterm").then(res => this.termList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.firstrentcommissiontypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.rentcommissiontypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.renewalfeetypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.servicefeetypeList = res as boconfigvalue[]);
this.configservice.getList("unitstatus").then(res => this.unitstatusList = res as boconfigvalue[]);
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmspropertyunitservice.formData && this.pmspropertyunitservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmspropertyunitForm.patchValue({
    tenantid: this.pmspropertyunitservice.formData.tenantid,
    tenantiddesc: this.pmspropertyunitservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmspropertyunitForm.get('tenantid').value);
let objtenantid;
if (arrtenantid.length > 0) objtenantid = arrtenantid[0];
if (objtenantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenantid_pmstenantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenantidList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenantid_pmstenantsformatter = (result: any) => result.lastname;

//autocomplete
    this.pmspropertyunitservice.getpmspropertyunitsList().then(res => {
      this.pkList = res as pmspropertyunit[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.unitno.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.unitno;

//setting the flag that the screen is not touched 
this.pmspropertyunitForm.markAsUntouched();
this.pmspropertyunitForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmspropertyunitForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});

}
}

onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmspropertyunitForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}




resetForm() {
if (this.pmspropertyunitForm != null)
this.pmspropertyunitForm.reset();
this.pmspropertyunitForm.patchValue({
});
setTimeout(() => {
this.pmspropertyunitservice.pmsdeposits=[];
this.pmsdepositsLoadTable();
this.pmspropertyunitservice.pmspdcs=[];
this.pmspdcsLoadTable();
this.pmspropertyunitservice.pmspropertyapplicants=[];
this.pmspropertyapplicantsLoadTable();
this.pmspropertyunitservice.pmspropertyopexdetails=[];
this.pmspropertyopexdetailsLoadTable();
this.pmspropertyunitservice.pmsschedules=[];
this.pmsschedulesLoadTable();
this.pmspropertyunitservice.pmstransactions=[];
this.pmstransactionsLoadTable();
this.pmspropertyunitservice.pmstransactionschedules=[];
this.pmstransactionschedulesLoadTable();
this.pmspropertyunitservice.pmsunitcharges=[];
this.pmsunitchargesLoadTable();
this.pmspropertyunitservice.pmspropertyinsurances=[];
this.pmspropertyinsurancesLoadTable();
this.pmspropertyunitservice.pmscharges=[];
this.pmschargesLoadTable();
this.pmspropertyunitservice.pmsleases=[];
this.pmsleasesLoadTable();
this.pmspropertyunitservice.pmsworkorders=[];
this.pmsworkordersLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let unitid = this.pmspropertyunitForm.get('unitid').value;
        if(unitid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertyunitservice.deletepmspropertyunit(unitid).then(res =>
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
    this.pmspropertyunitForm.patchValue({
        unitid: null
    });
    if(this.pmspropertyunitservice.formData.unitid!=null)this.pmspropertyunitservice.formData.unitid=null;
for (let i=0;i<this.pmspropertyunitservice.pmsdeposits.length;i++) {
this.pmspropertyunitservice.pmsdeposits[i].depositid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmspdcs.length;i++) {
this.pmspropertyunitservice.pmspdcs[i].pdcid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmspropertyapplicants.length;i++) {
this.pmspropertyunitservice.pmspropertyapplicants[i].applicantid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmspropertyopexdetails.length;i++) {
this.pmspropertyunitservice.pmspropertyopexdetails[i].opexid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmsschedules.length;i++) {
this.pmspropertyunitservice.pmsschedules[i].scheduleid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmstransactions.length;i++) {
this.pmspropertyunitservice.pmstransactions[i].transactionid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmstransactionschedules.length;i++) {
this.pmspropertyunitservice.pmstransactionschedules[i].transactionscheduleid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmsunitcharges.length;i++) {
this.pmspropertyunitservice.pmsunitcharges[i].chargeid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmspropertyinsurances.length;i++) {
this.pmspropertyunitservice.pmspropertyinsurances[i].insuranceid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmscharges.length;i++) {
this.pmspropertyunitservice.pmscharges[i].chargeid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmsleases.length;i++) {
this.pmspropertyunitservice.pmsleases[i].leaseid=null;
}
for (let i=0;i<this.pmspropertyunitservice.pmsworkorders.length;i++) {
this.pmspropertyunitservice.pmsworkorders[i].workorderid=null;
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
        else if(key=="vacateddate")
this.pmspropertyunitForm.patchValue({"vacateddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmspropertyunitForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyunitForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyunitForm.controls[key]!=undefined)
{
this.pmspropertyunitForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("pmspropertyunits",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.pmspropertyunitservice.formData.unitno!=null )
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
unitidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitnoonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
unittypeonChange(evt:any){
let e=this.f.unittype.value as any;
this.pmspropertyunitForm.patchValue({unittypedesc:evt.options[evt.options.selectedIndex].text});
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
sqftonChange(evt:any){
let e=evt.value;
}
sizedetailsonChange(evt:any){
let e=evt.value;
}
bedsonChange(evt:any){
let e=this.f.beds.value as any;
this.pmspropertyunitForm.patchValue({bedsdesc:evt.options[evt.options.selectedIndex].text});
}
bathsonChange(evt:any){
let e=this.f.baths.value as any;
this.pmspropertyunitForm.patchValue({bathsdesc:evt.options[evt.options.selectedIndex].text});
}
termonChange(evt:any){
let e=this.f.term.value as any;
this.pmspropertyunitForm.patchValue({termdesc:evt.options[evt.options.selectedIndex].text});
}
rentonChange(evt:any){
let e=evt.value;
}
depositonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
assignowneronChange(evt:any){
let e=evt.value;
}
ownernotesonChange(evt:any){
let e=evt.value;
}
advanceonChange(evt:any){
let e=evt.value;
}
invoicedayonChange(evt:any){
let e=evt.value;
}
hasfirstrentcommissiononChange(evt:any){
let e=evt.value;
}
firstrentcommissiontypeonChange(evt:any){
let e=this.f.firstrentcommissiontype.value as any;
this.pmspropertyunitForm.patchValue({firstrentcommissiontypedesc:evt.options[evt.options.selectedIndex].text});
}
firstrentcommissiononChange(evt:any){
let e=evt.value;
}
hasrentcommissiononChange(evt:any){
let e=evt.value;
}
rentcommissiontypeonChange(evt:any){
let e=this.f.rentcommissiontype.value as any;
this.pmspropertyunitForm.patchValue({rentcommissiontypedesc:evt.options[evt.options.selectedIndex].text});
}
rentcommissiononChange(evt:any){
let e=evt.value;
}
hasrenewalfeeonChange(evt:any){
let e=evt.value;
}
renewalfeetypeonChange(evt:any){
let e=this.f.renewalfeetype.value as any;
this.pmspropertyunitForm.patchValue({renewalfeetypedesc:evt.options[evt.options.selectedIndex].text});
}
renewalfeeonChange(evt:any){
let e=evt.value;
}
hasservicefeeonChange(evt:any){
let e=evt.value;
}
servicefeetypeonChange(evt:any){
let e=this.f.servicefeetype.value as any;
this.pmspropertyunitForm.patchValue({servicefeetypedesc:evt.options[evt.options.selectedIndex].text});
}
servicefeeonChange(evt:any){
let e=evt.value;
}
unitstatusonChange(evt:any){
let e=this.f.unitstatus.value as any;
this.pmspropertyunitForm.patchValue({unitstatusdesc:evt.options[evt.options.selectedIndex].text});
}
tenantidonChange(evt:any){
let e=evt.value;
}
vacateddateonChange(evt:any){
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
  


editpmspropertyunits() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertyunitservice.getpmspropertyunitsByEID(pkcol).then(res => {

this.pmspropertyunitservice.formData=res.pmspropertyunit;
let formproperty=res.pmspropertyunit.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmspropertyunit.pkcol;
this.formid=res.pmspropertyunit.unitid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmspropertyunit.unitid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertyunitForm.patchValue({
unitid: res.pmspropertyunit.unitid,
propertyid: res.pmspropertyunit.propertyid,
propertyiddesc: res.pmspropertyunit.propertyiddesc,
unitno: res.pmspropertyunit.unitno,
details: res.pmspropertyunit.details,
unittype: res.pmspropertyunit.unittype,
unittypedesc: res.pmspropertyunit.unittypedesc,
address1: res.pmspropertyunit.address1,
address2: res.pmspropertyunit.address2,
sqft: res.pmspropertyunit.sqft,
sizedetails: res.pmspropertyunit.sizedetails,
beds: res.pmspropertyunit.beds,
bedsdesc: res.pmspropertyunit.bedsdesc,
baths: res.pmspropertyunit.baths,
bathsdesc: res.pmspropertyunit.bathsdesc,
term: res.pmspropertyunit.term,
termdesc: res.pmspropertyunit.termdesc,
rent: res.pmspropertyunit.rent,
deposit: res.pmspropertyunit.deposit,
notes: res.pmspropertyunit.notes,
assignowner: res.pmspropertyunit.assignowner,
ownernotes: res.pmspropertyunit.ownernotes,
advance: res.pmspropertyunit.advance,
invoiceday: res.pmspropertyunit.invoiceday,
hasfirstrentcommission: res.pmspropertyunit.hasfirstrentcommission,
firstrentcommissiontype: res.pmspropertyunit.firstrentcommissiontype,
firstrentcommissiontypedesc: res.pmspropertyunit.firstrentcommissiontypedesc,
firstrentcommission: res.pmspropertyunit.firstrentcommission,
hasrentcommission: res.pmspropertyunit.hasrentcommission,
rentcommissiontype: res.pmspropertyunit.rentcommissiontype,
rentcommissiontypedesc: res.pmspropertyunit.rentcommissiontypedesc,
rentcommission: res.pmspropertyunit.rentcommission,
hasrenewalfee: res.pmspropertyunit.hasrenewalfee,
renewalfeetype: res.pmspropertyunit.renewalfeetype,
renewalfeetypedesc: res.pmspropertyunit.renewalfeetypedesc,
renewalfee: res.pmspropertyunit.renewalfee,
hasservicefee: res.pmspropertyunit.hasservicefee,
servicefeetype: res.pmspropertyunit.servicefeetype,
servicefeetypedesc: res.pmspropertyunit.servicefeetypedesc,
servicefee: res.pmspropertyunit.servicefee,
unitstatus: res.pmspropertyunit.unitstatus,
unitstatusdesc: res.pmspropertyunit.unitstatusdesc,
tenantid: res.pmspropertyunit.tenantid,
tenantiddesc: res.pmspropertyunit.tenantiddesc,
vacateddate: this.ngbDateParserFormatter.parse(res.pmspropertyunit.vacateddate),
customfield: res.pmspropertyunit.customfield,
attachment: JSON.parse(res.pmspropertyunit.attachment),
status: res.pmspropertyunit.status,
statusdesc: res.pmspropertyunit.statusdesc,
});
this.pmsdepositsvisiblelist=res.pmsdepositsvisiblelist;
this.pmspdcsvisiblelist=res.pmspdcsvisiblelist;
this.pmspropertyapplicantsvisiblelist=res.pmspropertyapplicantsvisiblelist;
this.pmspropertyopexdetailsvisiblelist=res.pmspropertyopexdetailsvisiblelist;
this.pmsschedulesvisiblelist=res.pmsschedulesvisiblelist;
this.pmstransactionsvisiblelist=res.pmstransactionsvisiblelist;
this.pmstransactionschedulesvisiblelist=res.pmstransactionschedulesvisiblelist;
this.pmsunitchargesvisiblelist=res.pmsunitchargesvisiblelist;
this.pmspropertyinsurancesvisiblelist=res.pmspropertyinsurancesvisiblelist;
this.pmschargesvisiblelist=res.pmschargesvisiblelist;
this.pmsleasesvisiblelist=res.pmsleasesvisiblelist;
this.pmsworkordersvisiblelist=res.pmsworkordersvisiblelist;
if(this.pmspropertyunitForm.get('customfield').value!=null && this.pmspropertyunitForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.pmspropertyunitForm.get('customfield').value);
this.FillCustomField();
if(this.pmspropertyunitForm.get('attachment').value!=null && this.pmspropertyunitForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmspropertyunitForm.get('attachment').value);
//Child Tables if any
this.pmspropertyunitservice.pmsdeposits = res.pmsdeposits;
this.SetpmsdepositsTableConfig();
this.pmsdepositsLoadTable();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
this.pmspropertyunitservice.pmspdcs = res.pmspdcs;
this.SetpmspdcsTableConfig();
this.pmspdcsLoadTable();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
this.pmspropertyunitservice.pmspropertyapplicants = res.pmspropertyapplicants;
this.SetpmspropertyapplicantsTableConfig();
this.pmspropertyapplicantsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });
this.pmspropertyunitservice.pmspropertyopexdetails = res.pmspropertyopexdetails;
this.SetpmspropertyopexdetailsTableConfig();
this.pmspropertyopexdetailsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });
this.pmspropertyunitservice.pmsschedules = res.pmsschedules;
this.SetpmsschedulesTableConfig();
this.pmsschedulesLoadTable();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
this.pmspropertyunitservice.pmstransactions = res.pmstransactions;
this.SetpmstransactionsTableConfig();
this.pmstransactionsLoadTable();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
this.pmspropertyunitservice.pmstransactionschedules = res.pmstransactionschedules;
this.SetpmstransactionschedulesTableConfig();
this.pmstransactionschedulesLoadTable();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
this.pmspropertyunitservice.pmsunitcharges = res.pmsunitcharges;
this.SetpmsunitchargesTableConfig();
this.pmsunitchargesLoadTable();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });
this.pmspropertyunitservice.pmspropertyinsurances = res.pmspropertyinsurances;
this.SetpmspropertyinsurancesTableConfig();
this.pmspropertyinsurancesLoadTable();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });
this.pmspropertyunitservice.pmscharges = res.pmscharges;
this.SetpmschargesTableConfig();
this.pmschargesLoadTable();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
this.pmspropertyunitservice.pmsleases = res.pmsleases;
this.SetpmsleasesTableConfig();
this.pmsleasesLoadTable();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
this.pmspropertyunitservice.pmsworkorders = res.pmsworkorders;
this.SetpmsworkordersTableConfig();
this.pmsworkordersLoadTable();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
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
  for (let key in this.pmspropertyunitForm.controls) {
    if (this.pmspropertyunitForm.controls[key] != null) {
if(false)
{
if(this.pmspropertyunitservice.formData!=null && this.pmspropertyunitservice.formData[key]!=null  && this.pmspropertyunitservice.formData[key]!='[]' && this.pmspropertyunitservice.formData[key]!=undefined && this.pmspropertyunitservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyunitservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmspropertyunitservice.formData!=null && this.pmspropertyunitservice.formData[key]!=null   && this.pmspropertyunitservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertyunitservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertyunitservice.formData!=null && this.pmspropertyunitservice.formData[key]!=null   && this.pmspropertyunitservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertyunitservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertyunitservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyunitForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertyunitForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.pmspropertyunitForm.value;
obj.vacateddate=new Date(this.pmspropertyunitForm.get('vacateddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('vacateddate').value)+'  UTC' :null);
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

private pmspropertyunittoggleOption(){
this.pmspropertyunitshowOption = this.pmspropertyunitshowOption === true ? false : true;
}

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}

private pmspdctoggleOption(){
this.pmspdcshowOption = this.pmspdcshowOption === true ? false : true;
}

private pmspropertyapplicantstoggleOption(){
this.pmspropertyapplicantsshowOption = this.pmspropertyapplicantsshowOption === true ? false : true;
}

private pmspropertyopexdetailtoggleOption(){
this.pmspropertyopexdetailshowOption = this.pmspropertyopexdetailshowOption === true ? false : true;
}

private pmsscheduletoggleOption(){
this.pmsscheduleshowOption = this.pmsscheduleshowOption === true ? false : true;
}

private pmstransactiontoggleOption(){
this.pmstransactionshowOption = this.pmstransactionshowOption === true ? false : true;
}

private pmstransactionscheduletoggleOption(){
this.pmstransactionscheduleshowOption = this.pmstransactionscheduleshowOption === true ? false : true;
}

private pmsunitchargestoggleOption(){
this.pmsunitchargesshowOption = this.pmsunitchargesshowOption === true ? false : true;
}

private pmspropertyinsurancetoggleOption(){
this.pmspropertyinsuranceshowOption = this.pmspropertyinsuranceshowOption === true ? false : true;
}

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}

private pmsleasetoggleOption(){
this.pmsleaseshowOption = this.pmsleaseshowOption === true ? false : true;
}

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyunitForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyunitForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyunitForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertyunitservice.formData=this.pmspropertyunitForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyunitForm.controls[key] != null)
    {
        this.pmspropertyunitservice.formData[key] = this.pmspropertyunitForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.pmspropertyunitservice.formData.vacateddate=new Date(this.pmspropertyunitForm.get('vacateddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('vacateddate').value)+'  UTC' :null);
if(customfields!=null)this.pmspropertyunitservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.pmspropertyunitservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.pmspropertyunitservice.formData.DeletedpmsdepositIDs = this.DeletedpmsdepositIDs;
this.pmspropertyunitservice.formData.DeletedpmspdcIDs = this.DeletedpmspdcIDs;
this.pmspropertyunitservice.formData.DeletedpmspropertyapplicantsIDs = this.DeletedpmspropertyapplicantsIDs;
this.pmspropertyunitservice.formData.DeletedpmspropertyopexdetailIDs = this.DeletedpmspropertyopexdetailIDs;
this.pmspropertyunitservice.formData.DeletedpmsscheduleIDs = this.DeletedpmsscheduleIDs;
this.pmspropertyunitservice.formData.DeletedpmstransactionIDs = this.DeletedpmstransactionIDs;
this.pmspropertyunitservice.formData.DeletedpmstransactionscheduleIDs = this.DeletedpmstransactionscheduleIDs;
this.pmspropertyunitservice.formData.DeletedpmsunitchargesIDs = this.DeletedpmsunitchargesIDs;
this.pmspropertyunitservice.formData.DeletedpmspropertyinsuranceIDs = this.DeletedpmspropertyinsuranceIDs;
this.pmspropertyunitservice.formData.DeletedpmschargeIDs = this.DeletedpmschargeIDs;
this.pmspropertyunitservice.formData.DeletedpmsleaseIDs = this.DeletedpmsleaseIDs;
this.pmspropertyunitservice.formData.DeletedpmsworkorderIDs = this.DeletedpmsworkorderIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.pmspropertyunitservice.formData);
this.pmspropertyunitservice.formData=this.pmspropertyunitForm.value;
this.pmspropertyunitservice.saveOrUpdatepmspropertyunits().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.pmsdepositssource.data)
{
    for (let i = 0; i < this.pmsdepositssource.data.length; i++)
    {
        if (this.pmsdepositssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsdepositssource.data[i].fileattachmentlist);
    }
}
if (this.pmspdcssource.data)
{
    for (let i = 0; i < this.pmspdcssource.data.length; i++)
    {
        if (this.pmspdcssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspdcssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyapplicantssource.data)
{
    for (let i = 0; i < this.pmspropertyapplicantssource.data.length; i++)
    {
        if (this.pmspropertyapplicantssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyapplicantssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyopexdetailssource.data)
{
    for (let i = 0; i < this.pmspropertyopexdetailssource.data.length; i++)
    {
        if (this.pmspropertyopexdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyopexdetailssource.data[i].fileattachmentlist);
    }
}
if (this.pmsschedulessource.data)
{
    for (let i = 0; i < this.pmsschedulessource.data.length; i++)
    {
        if (this.pmsschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsschedulessource.data[i].fileattachmentlist);
    }
}
if (this.pmstransactionssource.data)
{
    for (let i = 0; i < this.pmstransactionssource.data.length; i++)
    {
        if (this.pmstransactionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmstransactionssource.data[i].fileattachmentlist);
    }
}
if (this.pmstransactionschedulessource.data)
{
    for (let i = 0; i < this.pmstransactionschedulessource.data.length; i++)
    {
        if (this.pmstransactionschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmstransactionschedulessource.data[i].fileattachmentlist);
    }
}
if (this.pmsunitchargessource.data)
{
    for (let i = 0; i < this.pmsunitchargessource.data.length; i++)
    {
        if (this.pmsunitchargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsunitchargessource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyinsurancessource.data)
{
    for (let i = 0; i < this.pmspropertyinsurancessource.data.length; i++)
    {
        if (this.pmspropertyinsurancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyinsurancessource.data[i].fileattachmentlist);
    }
}
if (this.pmschargessource.data)
{
    for (let i = 0; i < this.pmschargessource.data.length; i++)
    {
        if (this.pmschargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmschargessource.data[i].fileattachmentlist);
    }
}
if (this.pmsleasessource.data)
{
    for (let i = 0; i < this.pmsleasessource.data.length; i++)
    {
        if (this.pmsleasessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsleasessource.data[i].fileattachmentlist);
    }
}
if (this.pmsworkorderssource.data)
{
    for (let i = 0; i < this.pmsworkorderssource.data.length; i++)
    {
        if (this.pmsworkorderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsworkorderssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyunit);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertyunitservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyunit);
}
else
{
this.FillData(res);
}
}
this.pmspropertyunitForm.markAsUntouched();
this.pmspropertyunitForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmspropertyunitForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmspropertyunitForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmsdeposit(event:any,depositid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsdepositComponent, 
{
data:  {  showview:false,save:false,event,depositid, unitid,visiblelist:this.pmsdepositsvisiblelist,  hidelist:this.pmsdepositshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsdepositssource.add(res);
this.pmsdepositssource.refresh();
}
else
{
this.pmsdepositssource.update(event.data, res);
}
}
});
}

onDeletepmsdeposit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsdepositIDs += childID + ",";
this.pmspropertyunitservice.pmsdeposits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspdc(event:any,pdcid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspdcComponent, 
{
data:  {  showview:false,save:false,event,pdcid, unitid,visiblelist:this.pmspdcsvisiblelist,  hidelist:this.pmspdcshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspdcssource.add(res);
this.pmspdcssource.refresh();
}
else
{
this.pmspdcssource.update(event.data, res);
}
}
});
}

onDeletepmspdc(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspdcIDs += childID + ",";
this.pmspropertyunitservice.pmspdcs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyapplicants(event:any,applicantid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyapplicantsComponent, 
{
data:  {  showview:false,save:false,event,applicantid, unitid,visiblelist:this.pmspropertyapplicantsvisiblelist,  hidelist:this.pmspropertyapplicantshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyapplicantssource.add(res);
this.pmspropertyapplicantssource.refresh();
}
else
{
this.pmspropertyapplicantssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyapplicants(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyapplicantsIDs += childID + ",";
this.pmspropertyunitservice.pmspropertyapplicants.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyopexdetail(event:any,opexid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyopexdetailComponent, 
{
data:  {  showview:false,save:false,event,opexid, unitid,visiblelist:this.pmspropertyopexdetailsvisiblelist,  hidelist:this.pmspropertyopexdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyopexdetailssource.add(res);
this.pmspropertyopexdetailssource.refresh();
}
else
{
this.pmspropertyopexdetailssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyopexdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyopexdetailIDs += childID + ",";
this.pmspropertyunitservice.pmspropertyopexdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsschedule(event:any,scheduleid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, unitid,visiblelist:this.pmsschedulesvisiblelist,  hidelist:this.pmsscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsschedulessource.add(res);
this.pmsschedulessource.refresh();
}
else
{
this.pmsschedulessource.update(event.data, res);
}
}
});
}

onDeletepmsschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsscheduleIDs += childID + ",";
this.pmspropertyunitservice.pmsschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransaction(event:any,transactionid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionComponent, 
{
data:  {  showview:false,save:false,event,transactionid, unitid,visiblelist:this.pmstransactionsvisiblelist,  hidelist:this.pmstransactionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmstransactionssource.add(res);
this.pmstransactionssource.refresh();
}
else
{
this.pmstransactionssource.update(event.data, res);
}
}
});
}

onDeletepmstransaction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmstransactionIDs += childID + ",";
this.pmspropertyunitservice.pmstransactions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransactionschedule(event:any,transactionscheduleid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionscheduleComponent, 
{
data:  {  showview:false,save:false,event,transactionscheduleid, unitid,visiblelist:this.pmstransactionschedulesvisiblelist,  hidelist:this.pmstransactionscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmstransactionschedulessource.add(res);
this.pmstransactionschedulessource.refresh();
}
else
{
this.pmstransactionschedulessource.update(event.data, res);
}
}
});
}

onDeletepmstransactionschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmstransactionscheduleIDs += childID + ",";
this.pmspropertyunitservice.pmstransactionschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsunitcharges(event:any,chargeid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsunitchargesComponent, 
{
data:  {  showview:false,save:false,event,chargeid, unitid,visiblelist:this.pmsunitchargesvisiblelist,  hidelist:this.pmsunitchargeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsunitchargessource.add(res);
this.pmsunitchargessource.refresh();
}
else
{
this.pmsunitchargessource.update(event.data, res);
}
}
});
}

onDeletepmsunitcharges(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsunitchargesIDs += childID + ",";
this.pmspropertyunitservice.pmsunitcharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyinsurance(event:any,insuranceid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyinsuranceComponent, 
{
data:  {  showview:false,save:false,event,insuranceid, unitid,visiblelist:this.pmspropertyinsurancesvisiblelist,  hidelist:this.pmspropertyinsuranceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyinsurancessource.add(res);
this.pmspropertyinsurancessource.refresh();
}
else
{
this.pmspropertyinsurancessource.update(event.data, res);
}
}
});
}

onDeletepmspropertyinsurance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyinsuranceIDs += childID + ",";
this.pmspropertyunitservice.pmspropertyinsurances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmscharge(event:any,chargeid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmschargeComponent, 
{
data:  {  showview:false,save:false,event,chargeid, unitid,visiblelist:this.pmschargesvisiblelist,  hidelist:this.pmschargeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmschargessource.add(res);
this.pmschargessource.refresh();
}
else
{
this.pmschargessource.update(event.data, res);
}
}
});
}

onDeletepmscharge(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmschargeIDs += childID + ",";
this.pmspropertyunitservice.pmscharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmslease(event:any,leaseid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsleaseComponent, 
{
data:  {  showview:false,save:false,event,leaseid, unitid,visiblelist:this.pmsleasesvisiblelist,  hidelist:this.pmsleaseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsleasessource.add(res);
this.pmsleasessource.refresh();
}
else
{
this.pmsleasessource.update(event.data, res);
}
}
});
}

onDeletepmslease(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsleaseIDs += childID + ",";
this.pmspropertyunitservice.pmsleases.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsworkorder(event:any,workorderid:any, unitid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, unitid,visiblelist:this.pmsworkordersvisiblelist,  hidelist:this.pmsworkordershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsworkorderssource.add(res);
this.pmsworkorderssource.refresh();
}
else
{
this.pmsworkorderssource.update(event.data, res);
}
}
});
}

onDeletepmsworkorder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsworkorderIDs += childID + ",";
this.pmspropertyunitservice.pmsworkorders.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes pmsdeposits
pmsdepositssettings:any;
pmsdepositssource: any;

showpmsdepositsCheckbox()
{
debugger;
if(this.tblpmsdepositssource.settings['selectMode']== 'multi')this.tblpmsdepositssource.settings['selectMode']= 'single';
else
this.tblpmsdepositssource.settings['selectMode']= 'multi';
this.tblpmsdepositssource.initGrid();
}
deletepmsdepositsAll()
{
this.tblpmsdepositssource.settings['selectMode'] = 'single';
}
showpmsdepositsFilter()
{
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
      if(this.tblpmsdepositssource.settings!=null)this.tblpmsdepositssource.settings['hideSubHeader'] =!this.tblpmsdepositssource.settings['hideSubHeader'];
this.tblpmsdepositssource.initGrid();
}
showpmsdepositsInActive()
{
}
enablepmsdepositsInActive()
{
}
async SetpmsdepositsTableddConfig()
{
if(!this.bfilterPopulatepmsdeposits){
}
this.bfilterPopulatepmsdeposits=true;
}
async pmsdepositsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsdepositsTableConfig()
{
this.pmsdepositssettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
deposittype: {
title: 'Deposit Type',
type: '',
filter:true,
},
depositamount: {
title: 'Deposit Amount',
type: 'number',
filter:true,
},
depositduedate: {
title: 'Deposit Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paid: {
title: 'Pa',
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
paiddate: {
title: 'Paid Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paidamount: {
title: 'Paid Amount',
type: 'number',
filter:true,
},
paymenttype: {
title: 'Payment Type',
type: '',
filter:true,
},
chequenumber: {
title: 'Cheque Number',
type: '',
filter:true,
},
chequedate: {
title: 'Cheque Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
bankname: {
title: 'Bank Name',
type: '',
filter:true,
},
txnreference: {
title: 'Txn Reference',
type: '',
filter:true,
},
txndate: {
title: 'Txn Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
txnbank: {
title: 'Txn Bank',
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
},
};
}
pmsdepositsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsdepositsID)>=0)
{
this.pmsdepositssource=new LocalDataSource();
this.pmsdepositssource.load(this.pmspropertyunitservice.pmsdeposits as  any as LocalDataSource);
this.pmsdepositssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsdepositsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmsdeposits.length == 0)
{
    this.tblpmsdepositssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsdeposit();
    this.pmspropertyunitservice.pmsdeposits.push(obj);
    this.pmsdepositssource.refresh();
    if ((this.pmspropertyunitservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1 != this.pmsdepositssource.getPaging().page)
    {
        this.pmsdepositssource.setPage((this.pmspropertyunitservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsdepositssource.grid.edit(this.tblpmsdepositssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsdepositssource.data.indexOf(event.data);
this.onDeletepmsdeposit(event,event.data.depositid,((this.pmsdepositssource.getPaging().page-1) *this.pmsdepositssource.getPaging().perPage)+index);
this.pmsdepositssource.refresh();
break;
}
}

*/
pmsdepositsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsdeposit(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsdeposit(event,event.data.depositid,this.formid);
break;
case 'delete':
this.onDeletepmsdeposit(event,event.data.depositid,((this.pmsdepositssource.getPaging().page-1) *this.pmsdepositssource.getPaging().perPage)+event.index);
this.pmsdepositssource.refresh();
break;
}
}
pmsdepositsonDelete(obj) {
let depositid=obj.data.depositid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(depositid).then(res=>
this.pmsdepositsLoadTable()
);
}
}
pmsdepositsPaging(val)
{
debugger;
this.pmsdepositssource.setPaging(1, val, true);
}

handlepmsdepositsGridSelected(event:any) {
this.pmsdepositsselectedindex=this.pmspropertyunitservice.pmsdeposits.findIndex(i => i.depositid === event.data.depositid);
}
IspmsdepositsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsdepositsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsdeposits
//start of Grid Codes pmspdcs
pmspdcssettings:any;
pmspdcssource: any;

showpmspdcsCheckbox()
{
debugger;
if(this.tblpmspdcssource.settings['selectMode']== 'multi')this.tblpmspdcssource.settings['selectMode']= 'single';
else
this.tblpmspdcssource.settings['selectMode']= 'multi';
this.tblpmspdcssource.initGrid();
}
deletepmspdcsAll()
{
this.tblpmspdcssource.settings['selectMode'] = 'single';
}
showpmspdcsFilter()
{
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
      if(this.tblpmspdcssource.settings!=null)this.tblpmspdcssource.settings['hideSubHeader'] =!this.tblpmspdcssource.settings['hideSubHeader'];
this.tblpmspdcssource.initGrid();
}
showpmspdcsInActive()
{
}
enablepmspdcsInActive()
{
}
async SetpmspdcsTableddConfig()
{
if(!this.bfilterPopulatepmspdcs){
}
this.bfilterPopulatepmspdcs=true;
}
async pmspdcsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspdcsTableConfig()
{
this.pmspdcssettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
currentdate: {
title: 'Current Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
paymenttype: {
title: 'Payment Type',
type: '',
filter:true,
},
collectionmode: {
title: 'Collection Mode',
type: '',
filter:true,
},
duedate: {
title: 'Duedate',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reference: {
title: 'Reference',
type: '',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
},
};
}
pmspdcsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspdcsID)>=0)
{
this.pmspdcssource=new LocalDataSource();
this.pmspdcssource.load(this.pmspropertyunitservice.pmspdcs as  any as LocalDataSource);
this.pmspdcssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspdcsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmspdcs.length == 0)
{
    this.tblpmspdcssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspdc();
    this.pmspropertyunitservice.pmspdcs.push(obj);
    this.pmspdcssource.refresh();
    if ((this.pmspropertyunitservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1 != this.pmspdcssource.getPaging().page)
    {
        this.pmspdcssource.setPage((this.pmspropertyunitservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspdcssource.grid.edit(this.tblpmspdcssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspdcssource.data.indexOf(event.data);
this.onDeletepmspdc(event,event.data.pdcid,((this.pmspdcssource.getPaging().page-1) *this.pmspdcssource.getPaging().perPage)+index);
this.pmspdcssource.refresh();
break;
}
}

*/
pmspdcsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspdc(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspdc(event,event.data.pdcid,this.formid);
break;
case 'delete':
this.onDeletepmspdc(event,event.data.pdcid,((this.pmspdcssource.getPaging().page-1) *this.pmspdcssource.getPaging().perPage)+event.index);
this.pmspdcssource.refresh();
break;
}
}
pmspdcsonDelete(obj) {
let pdcid=obj.data.pdcid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(pdcid).then(res=>
this.pmspdcsLoadTable()
);
}
}
pmspdcsPaging(val)
{
debugger;
this.pmspdcssource.setPaging(1, val, true);
}

handlepmspdcsGridSelected(event:any) {
this.pmspdcsselectedindex=this.pmspropertyunitservice.pmspdcs.findIndex(i => i.pdcid === event.data.pdcid);
}
IspmspdcsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspdcsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspdcs
//start of Grid Codes pmspropertyapplicants
pmspropertyapplicantssettings:any;
pmspropertyapplicantssource: any;

showpmspropertyapplicantsCheckbox()
{
debugger;
if(this.tblpmspropertyapplicantssource.settings['selectMode']== 'multi')this.tblpmspropertyapplicantssource.settings['selectMode']= 'single';
else
this.tblpmspropertyapplicantssource.settings['selectMode']= 'multi';
this.tblpmspropertyapplicantssource.initGrid();
}
deletepmspropertyapplicantsAll()
{
this.tblpmspropertyapplicantssource.settings['selectMode'] = 'single';
}
showpmspropertyapplicantsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });
      if(this.tblpmspropertyapplicantssource.settings!=null)this.tblpmspropertyapplicantssource.settings['hideSubHeader'] =!this.tblpmspropertyapplicantssource.settings['hideSubHeader'];
this.tblpmspropertyapplicantssource.initGrid();
}
showpmspropertyapplicantsInActive()
{
}
enablepmspropertyapplicantsInActive()
{
}
async SetpmspropertyapplicantsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyapplicants){
}
this.bfilterPopulatepmspropertyapplicants=true;
}
async pmspropertyapplicantsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyapplicantsTableConfig()
{
this.pmspropertyapplicantssettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
firstname: {
title: 'First Name',
type: '',
filter:true,
},
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
iscompany: {
title: 'Is Company',
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
companyname: {
title: 'Company Name',
type: '',
filter:true,
},
dateofbirth: {
title: 'Dateof Birth',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
identityno: {
title: 'Identity No',
type: '',
filter:true,
},
gender: {
title: 'Gender',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
phone: {
title: 'Phone',
type: '',
filter:true,
},
license: {
title: 'License',
type: '',
filter:true,
},
occupants: {
title: 'Occupants',
type: '',
filter:true,
},
preferredmoveindate: {
title: 'Preferred Move In Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
shortbio: {
title: 'Shortbio',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
vehicledetails: {
title: 'Vehicle Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
petdetails: {
title: 'Pet Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
currentpropertymoveindate: {
title: 'Current Property Move In Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
currentpropertymoveoutdate: {
title: 'Current Property Move Out Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
address: {
title: 'Address',
type: '',
filter:true,
},
landlordfirstname: {
title: 'Land Lord Firstname',
type: '',
filter:true,
},
landlordlastname: {
title: 'Land Lord Lastname',
type: '',
filter:true,
},
landlordemail: {
title: 'Land Lord Email',
type: '',
filter:true,
},
landlordphone: {
title: 'Land Lord Phone',
type: '',
filter:true,
},
employer: {
title: 'Employer',
type: '',
filter:true,
},
position: {
title: 'Position',
type: '',
filter:true,
},
joineddate: {
title: 'Joined Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'Enddate',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
workemail: {
title: 'Workemail',
type: '',
filter:true,
},
workphone: {
title: 'Workphone',
type: '',
filter:true,
},
officephone: {
title: 'Office Phone',
type: '',
filter:true,
},
officeaddress: {
title: 'Office Address',
type: '',
filter:true,
},
monthlyincome: {
title: 'Monthlyincome',
type: 'number',
filter:true,
},
supervisorfirstname: {
title: 'Supervisor Firstname',
type: '',
filter:true,
},
supervisorlastname: {
title: 'Supervisor Lastname',
type: '',
filter:true,
},
supervisoremail: {
title: 'Supervisor Email',
type: '',
filter:true,
},
supervisorphone: {
title: 'Supervisor Phone',
type: '',
filter:true,
},
additionalincome: {
title: 'Additional Income',
type: 'number',
filter:true,
},
ecfirstname: {
title: 'E C Firstname',
type: '',
filter:true,
},
eclastname: {
title: 'E C Lastname',
type: '',
filter:true,
},
ecemail: {
title: 'E C Email',
type: '',
filter:true,
},
ecphone: {
title: 'E C Phone',
type: '',
filter:true,
},
relationshipdetails: {
title: 'Relationship Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
referencefirstname: {
title: 'Reference Firstname',
type: '',
filter:true,
},
referencelastname: {
title: 'Reference Lastname',
type: '',
filter:true,
},
referenceemail: {
title: 'Reference Email',
type: '',
filter:true,
},
referencephone: {
title: 'Reference Phone',
type: '',
filter:true,
},
},
};
}
pmspropertyapplicantsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyapplicantsID)>=0)
{
this.pmspropertyapplicantssource=new LocalDataSource();
this.pmspropertyapplicantssource.load(this.pmspropertyunitservice.pmspropertyapplicants as  any as LocalDataSource);
this.pmspropertyapplicantssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyapplicantsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmspropertyapplicants.length == 0)
{
    this.tblpmspropertyapplicantssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyapplicants();
    this.pmspropertyunitservice.pmspropertyapplicants.push(obj);
    this.pmspropertyapplicantssource.refresh();
    if ((this.pmspropertyunitservice.pmspropertyapplicants.length / this.pmspropertyapplicantssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyapplicantssource.getPaging().page)
    {
        this.pmspropertyapplicantssource.setPage((this.pmspropertyunitservice.pmspropertyapplicants.length / this.pmspropertyapplicantssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyapplicantssource.grid.edit(this.tblpmspropertyapplicantssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyapplicantssource.data.indexOf(event.data);
this.onDeletepmspropertyapplicants(event,event.data.applicantid,((this.pmspropertyapplicantssource.getPaging().page-1) *this.pmspropertyapplicantssource.getPaging().perPage)+index);
this.pmspropertyapplicantssource.refresh();
break;
}
}

*/
pmspropertyapplicantsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyapplicants(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyapplicants(event,event.data.applicantid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyapplicants(event,event.data.applicantid,((this.pmspropertyapplicantssource.getPaging().page-1) *this.pmspropertyapplicantssource.getPaging().perPage)+event.index);
this.pmspropertyapplicantssource.refresh();
break;
}
}
pmspropertyapplicantsonDelete(obj) {
let applicantid=obj.data.applicantid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(applicantid).then(res=>
this.pmspropertyapplicantsLoadTable()
);
}
}
pmspropertyapplicantsPaging(val)
{
debugger;
this.pmspropertyapplicantssource.setPaging(1, val, true);
}

handlepmspropertyapplicantsGridSelected(event:any) {
this.pmspropertyapplicantsselectedindex=this.pmspropertyunitservice.pmspropertyapplicants.findIndex(i => i.applicantid === event.data.applicantid);
}
IspmspropertyapplicantsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyapplicantsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyapplicants
//start of Grid Codes pmspropertyopexdetails
pmspropertyopexdetailssettings:any;
pmspropertyopexdetailssource: any;

showpmspropertyopexdetailsCheckbox()
{
debugger;
if(this.tblpmspropertyopexdetailssource.settings['selectMode']== 'multi')this.tblpmspropertyopexdetailssource.settings['selectMode']= 'single';
else
this.tblpmspropertyopexdetailssource.settings['selectMode']= 'multi';
this.tblpmspropertyopexdetailssource.initGrid();
}
deletepmspropertyopexdetailsAll()
{
this.tblpmspropertyopexdetailssource.settings['selectMode'] = 'single';
}
showpmspropertyopexdetailsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });
      if(this.tblpmspropertyopexdetailssource.settings!=null)this.tblpmspropertyopexdetailssource.settings['hideSubHeader'] =!this.tblpmspropertyopexdetailssource.settings['hideSubHeader'];
this.tblpmspropertyopexdetailssource.initGrid();
}
showpmspropertyopexdetailsInActive()
{
}
enablepmspropertyopexdetailsInActive()
{
}
async SetpmspropertyopexdetailsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyopexdetails){
}
this.bfilterPopulatepmspropertyopexdetails=true;
}
async pmspropertyopexdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyopexdetailsTableConfig()
{
this.pmspropertyopexdetailssettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
opexname: {
title: 'Opex Name',
type: '',
filter:true,
},
frequencydays: {
title: 'Frequency Days',
type: 'number',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
},
};
}
pmspropertyopexdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyopexdetailsID)>=0)
{
this.pmspropertyopexdetailssource=new LocalDataSource();
this.pmspropertyopexdetailssource.load(this.pmspropertyunitservice.pmspropertyopexdetails as  any as LocalDataSource);
this.pmspropertyopexdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyopexdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmspropertyopexdetails.length == 0)
{
    this.tblpmspropertyopexdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyopexdetail();
    this.pmspropertyunitservice.pmspropertyopexdetails.push(obj);
    this.pmspropertyopexdetailssource.refresh();
    if ((this.pmspropertyunitservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyopexdetailssource.getPaging().page)
    {
        this.pmspropertyopexdetailssource.setPage((this.pmspropertyunitservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyopexdetailssource.grid.edit(this.tblpmspropertyopexdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyopexdetailssource.data.indexOf(event.data);
this.onDeletepmspropertyopexdetail(event,event.data.opexid,((this.pmspropertyopexdetailssource.getPaging().page-1) *this.pmspropertyopexdetailssource.getPaging().perPage)+index);
this.pmspropertyopexdetailssource.refresh();
break;
}
}

*/
pmspropertyopexdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyopexdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyopexdetail(event,event.data.opexid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyopexdetail(event,event.data.opexid,((this.pmspropertyopexdetailssource.getPaging().page-1) *this.pmspropertyopexdetailssource.getPaging().perPage)+event.index);
this.pmspropertyopexdetailssource.refresh();
break;
}
}
pmspropertyopexdetailsonDelete(obj) {
let opexid=obj.data.opexid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(opexid).then(res=>
this.pmspropertyopexdetailsLoadTable()
);
}
}
pmspropertyopexdetailsPaging(val)
{
debugger;
this.pmspropertyopexdetailssource.setPaging(1, val, true);
}

handlepmspropertyopexdetailsGridSelected(event:any) {
this.pmspropertyopexdetailsselectedindex=this.pmspropertyunitservice.pmspropertyopexdetails.findIndex(i => i.opexid === event.data.opexid);
}
IspmspropertyopexdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyopexdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyopexdetails
//start of Grid Codes pmsschedules
pmsschedulessettings:any;
pmsschedulessource: any;

showpmsschedulesCheckbox()
{
debugger;
if(this.tblpmsschedulessource.settings['selectMode']== 'multi')this.tblpmsschedulessource.settings['selectMode']= 'single';
else
this.tblpmsschedulessource.settings['selectMode']= 'multi';
this.tblpmsschedulessource.initGrid();
}
deletepmsschedulesAll()
{
this.tblpmsschedulessource.settings['selectMode'] = 'single';
}
showpmsschedulesFilter()
{
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
      if(this.tblpmsschedulessource.settings!=null)this.tblpmsschedulessource.settings['hideSubHeader'] =!this.tblpmsschedulessource.settings['hideSubHeader'];
this.tblpmsschedulessource.initGrid();
}
showpmsschedulesInActive()
{
}
enablepmsschedulesInActive()
{
}
async SetpmsschedulesTableddConfig()
{
if(!this.bfilterPopulatepmsschedules){
}
this.bfilterPopulatepmsschedules=true;
}
async pmsschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsschedulesTableConfig()
{
this.pmsschedulessettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
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
workordertype: {
title: 'Work Order Type',
type: '',
filter:true,
},
workorderfrequency: {
title: 'Work Order Frequency',
type: '',
filter:true,
},
recurringstartdate: {
title: 'Recurring Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
noenddate: {
title: 'No End Date',
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
recurringenddate: {
title: 'Recurring End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
priority: {
title: 'Priority',
type: '',
filter:true,
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
pmsschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsschedulesID)>=0)
{
this.pmsschedulessource=new LocalDataSource();
this.pmsschedulessource.load(this.pmspropertyunitservice.pmsschedules as  any as LocalDataSource);
this.pmsschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmsschedules.length == 0)
{
    this.tblpmsschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsschedule();
    this.pmspropertyunitservice.pmsschedules.push(obj);
    this.pmsschedulessource.refresh();
    if ((this.pmspropertyunitservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmsschedulessource.getPaging().page)
    {
        this.pmsschedulessource.setPage((this.pmspropertyunitservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsschedulessource.grid.edit(this.tblpmsschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsschedulessource.data.indexOf(event.data);
this.onDeletepmsschedule(event,event.data.scheduleid,((this.pmsschedulessource.getPaging().page-1) *this.pmsschedulessource.getPaging().perPage)+index);
this.pmsschedulessource.refresh();
break;
}
}

*/
pmsschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsschedule(event,event.data.scheduleid,this.formid);
break;
case 'delete':
this.onDeletepmsschedule(event,event.data.scheduleid,((this.pmsschedulessource.getPaging().page-1) *this.pmsschedulessource.getPaging().perPage)+event.index);
this.pmsschedulessource.refresh();
break;
}
}
pmsschedulesonDelete(obj) {
let scheduleid=obj.data.scheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(scheduleid).then(res=>
this.pmsschedulesLoadTable()
);
}
}
pmsschedulesPaging(val)
{
debugger;
this.pmsschedulessource.setPaging(1, val, true);
}

handlepmsschedulesGridSelected(event:any) {
this.pmsschedulesselectedindex=this.pmspropertyunitservice.pmsschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IspmsschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsschedules
//start of Grid Codes pmstransactions
pmstransactionssettings:any;
pmstransactionssource: any;

showpmstransactionsCheckbox()
{
debugger;
if(this.tblpmstransactionssource.settings['selectMode']== 'multi')this.tblpmstransactionssource.settings['selectMode']= 'single';
else
this.tblpmstransactionssource.settings['selectMode']= 'multi';
this.tblpmstransactionssource.initGrid();
}
deletepmstransactionsAll()
{
this.tblpmstransactionssource.settings['selectMode'] = 'single';
}
showpmstransactionsFilter()
{
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
      if(this.tblpmstransactionssource.settings!=null)this.tblpmstransactionssource.settings['hideSubHeader'] =!this.tblpmstransactionssource.settings['hideSubHeader'];
this.tblpmstransactionssource.initGrid();
}
showpmstransactionsInActive()
{
}
enablepmstransactionsInActive()
{
}
async SetpmstransactionsTableddConfig()
{
if(!this.bfilterPopulatepmstransactions){
}
this.bfilterPopulatepmstransactions=true;
}
async pmstransactionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmstransactionsTableConfig()
{
this.pmstransactionssettings = {
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
transactiondate: {
title: 'Transaction Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
transactionscheduleid: {
title: 'Transaction Schedule',
type: 'number',
filter:true,
},
paymentmethod: {
title: 'Payment Method',
type: '',
filter:true,
},
paymentreference: {
title: 'Payment Reference',
type: '',
filter:true,
},
transactionstatus: {
title: 'Transaction Status',
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
},
};
}
pmstransactionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionsID)>=0)
{
this.pmstransactionssource=new LocalDataSource();
this.pmstransactionssource.load(this.pmspropertyunitservice.pmstransactions as  any as LocalDataSource);
this.pmstransactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmstransactions.length == 0)
{
    this.tblpmstransactionssource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransaction();
    this.pmspropertyunitservice.pmstransactions.push(obj);
    this.pmstransactionssource.refresh();
    if ((this.pmspropertyunitservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionssource.getPaging().page)
    {
        this.pmstransactionssource.setPage((this.pmspropertyunitservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmstransactionssource.grid.edit(this.tblpmstransactionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmstransactionssource.data.indexOf(event.data);
this.onDeletepmstransaction(event,event.data.transactionid,((this.pmstransactionssource.getPaging().page-1) *this.pmstransactionssource.getPaging().perPage)+index);
this.pmstransactionssource.refresh();
break;
}
}

*/
pmstransactionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmstransaction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmstransaction(event,event.data.transactionid,this.formid);
break;
case 'delete':
this.onDeletepmstransaction(event,event.data.transactionid,((this.pmstransactionssource.getPaging().page-1) *this.pmstransactionssource.getPaging().perPage)+event.index);
this.pmstransactionssource.refresh();
break;
}
}
pmstransactionsonDelete(obj) {
let transactionid=obj.data.transactionid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(transactionid).then(res=>
this.pmstransactionsLoadTable()
);
}
}
pmstransactionsPaging(val)
{
debugger;
this.pmstransactionssource.setPaging(1, val, true);
}

handlepmstransactionsGridSelected(event:any) {
this.pmstransactionsselectedindex=this.pmspropertyunitservice.pmstransactions.findIndex(i => i.transactionid === event.data.transactionid);
}
IspmstransactionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmstransactions
//start of Grid Codes pmstransactionschedules
pmstransactionschedulessettings:any;
pmstransactionschedulessource: any;

showpmstransactionschedulesCheckbox()
{
debugger;
if(this.tblpmstransactionschedulessource.settings['selectMode']== 'multi')this.tblpmstransactionschedulessource.settings['selectMode']= 'single';
else
this.tblpmstransactionschedulessource.settings['selectMode']= 'multi';
this.tblpmstransactionschedulessource.initGrid();
}
deletepmstransactionschedulesAll()
{
this.tblpmstransactionschedulessource.settings['selectMode'] = 'single';
}
showpmstransactionschedulesFilter()
{
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
      if(this.tblpmstransactionschedulessource.settings!=null)this.tblpmstransactionschedulessource.settings['hideSubHeader'] =!this.tblpmstransactionschedulessource.settings['hideSubHeader'];
this.tblpmstransactionschedulessource.initGrid();
}
showpmstransactionschedulesInActive()
{
}
enablepmstransactionschedulesInActive()
{
}
async SetpmstransactionschedulesTableddConfig()
{
if(!this.bfilterPopulatepmstransactionschedules){
}
this.bfilterPopulatepmstransactionschedules=true;
}
async pmstransactionschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmstransactionschedulesTableConfig()
{
this.pmstransactionschedulessettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
frequency: {
title: 'Frequency',
type: '',
filter:true,
},
firstinvoicedate: {
title: 'First Invoice Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
pmstransactionschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionschedulesID)>=0)
{
this.pmstransactionschedulessource=new LocalDataSource();
this.pmstransactionschedulessource.load(this.pmspropertyunitservice.pmstransactionschedules as  any as LocalDataSource);
this.pmstransactionschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmstransactionschedules.length == 0)
{
    this.tblpmstransactionschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransactionschedule();
    this.pmspropertyunitservice.pmstransactionschedules.push(obj);
    this.pmstransactionschedulessource.refresh();
    if ((this.pmspropertyunitservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionschedulessource.getPaging().page)
    {
        this.pmstransactionschedulessource.setPage((this.pmspropertyunitservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmstransactionschedulessource.grid.edit(this.tblpmstransactionschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmstransactionschedulessource.data.indexOf(event.data);
this.onDeletepmstransactionschedule(event,event.data.transactionscheduleid,((this.pmstransactionschedulessource.getPaging().page-1) *this.pmstransactionschedulessource.getPaging().perPage)+index);
this.pmstransactionschedulessource.refresh();
break;
}
}

*/
pmstransactionschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmstransactionschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmstransactionschedule(event,event.data.transactionscheduleid,this.formid);
break;
case 'delete':
this.onDeletepmstransactionschedule(event,event.data.transactionscheduleid,((this.pmstransactionschedulessource.getPaging().page-1) *this.pmstransactionschedulessource.getPaging().perPage)+event.index);
this.pmstransactionschedulessource.refresh();
break;
}
}
pmstransactionschedulesonDelete(obj) {
let transactionscheduleid=obj.data.transactionscheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(transactionscheduleid).then(res=>
this.pmstransactionschedulesLoadTable()
);
}
}
pmstransactionschedulesPaging(val)
{
debugger;
this.pmstransactionschedulessource.setPaging(1, val, true);
}

handlepmstransactionschedulesGridSelected(event:any) {
this.pmstransactionschedulesselectedindex=this.pmspropertyunitservice.pmstransactionschedules.findIndex(i => i.transactionscheduleid === event.data.transactionscheduleid);
}
IspmstransactionschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmstransactionschedules
//start of Grid Codes pmsunitcharges
pmsunitchargessettings:any;
pmsunitchargessource: any;

showpmsunitchargesCheckbox()
{
debugger;
if(this.tblpmsunitchargessource.settings['selectMode']== 'multi')this.tblpmsunitchargessource.settings['selectMode']= 'single';
else
this.tblpmsunitchargessource.settings['selectMode']= 'multi';
this.tblpmsunitchargessource.initGrid();
}
deletepmsunitchargesAll()
{
this.tblpmsunitchargessource.settings['selectMode'] = 'single';
}
showpmsunitchargesFilter()
{
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });
      if(this.tblpmsunitchargessource.settings!=null)this.tblpmsunitchargessource.settings['hideSubHeader'] =!this.tblpmsunitchargessource.settings['hideSubHeader'];
this.tblpmsunitchargessource.initGrid();
}
showpmsunitchargesInActive()
{
}
enablepmsunitchargesInActive()
{
}
async SetpmsunitchargesTableddConfig()
{
if(!this.bfilterPopulatepmsunitcharges){
}
this.bfilterPopulatepmsunitcharges=true;
}
async pmsunitchargesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsunitchargesTableConfig()
{
this.pmsunitchargessettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
chargecycle: {
title: 'Charge Cycle',
type: '',
filter:true,
},
chargetype: {
title: 'Charge Type',
type: '',
filter:true,
},
chargeamount: {
title: 'Charge Amount',
type: 'number',
filter:true,
},
validstartdate: {
title: 'Valid Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
validenddate: {
title: 'Valid End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
pmsunitchargesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsunitchargesID)>=0)
{
this.pmsunitchargessource=new LocalDataSource();
this.pmsunitchargessource.load(this.pmspropertyunitservice.pmsunitcharges as  any as LocalDataSource);
this.pmsunitchargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsunitchargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmsunitcharges.length == 0)
{
    this.tblpmsunitchargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsunitcharges();
    this.pmspropertyunitservice.pmsunitcharges.push(obj);
    this.pmsunitchargessource.refresh();
    if ((this.pmspropertyunitservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1 != this.pmsunitchargessource.getPaging().page)
    {
        this.pmsunitchargessource.setPage((this.pmspropertyunitservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsunitchargessource.grid.edit(this.tblpmsunitchargessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsunitchargessource.data.indexOf(event.data);
this.onDeletepmsunitcharges(event,event.data.chargeid,((this.pmsunitchargessource.getPaging().page-1) *this.pmsunitchargessource.getPaging().perPage)+index);
this.pmsunitchargessource.refresh();
break;
}
}

*/
pmsunitchargesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsunitcharges(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsunitcharges(event,event.data.chargeid,this.formid);
break;
case 'delete':
this.onDeletepmsunitcharges(event,event.data.chargeid,((this.pmsunitchargessource.getPaging().page-1) *this.pmsunitchargessource.getPaging().perPage)+event.index);
this.pmsunitchargessource.refresh();
break;
}
}
pmsunitchargesonDelete(obj) {
let chargeid=obj.data.chargeid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(chargeid).then(res=>
this.pmsunitchargesLoadTable()
);
}
}
pmsunitchargesPaging(val)
{
debugger;
this.pmsunitchargessource.setPaging(1, val, true);
}

handlepmsunitchargesGridSelected(event:any) {
this.pmsunitchargesselectedindex=this.pmspropertyunitservice.pmsunitcharges.findIndex(i => i.chargeid === event.data.chargeid);
}
IspmsunitchargesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsunitchargesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsunitcharges
//start of Grid Codes pmspropertyinsurances
pmspropertyinsurancessettings:any;
pmspropertyinsurancessource: any;

showpmspropertyinsurancesCheckbox()
{
debugger;
if(this.tblpmspropertyinsurancessource.settings['selectMode']== 'multi')this.tblpmspropertyinsurancessource.settings['selectMode']= 'single';
else
this.tblpmspropertyinsurancessource.settings['selectMode']= 'multi';
this.tblpmspropertyinsurancessource.initGrid();
}
deletepmspropertyinsurancesAll()
{
this.tblpmspropertyinsurancessource.settings['selectMode'] = 'single';
}
showpmspropertyinsurancesFilter()
{
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });
      if(this.tblpmspropertyinsurancessource.settings!=null)this.tblpmspropertyinsurancessource.settings['hideSubHeader'] =!this.tblpmspropertyinsurancessource.settings['hideSubHeader'];
this.tblpmspropertyinsurancessource.initGrid();
}
showpmspropertyinsurancesInActive()
{
}
enablepmspropertyinsurancesInActive()
{
}
async SetpmspropertyinsurancesTableddConfig()
{
if(!this.bfilterPopulatepmspropertyinsurances){
}
this.bfilterPopulatepmspropertyinsurances=true;
}
async pmspropertyinsurancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyinsurancesTableConfig()
{
this.pmspropertyinsurancessettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
insurancecompany: {
title: 'Insurance Company',
type: '',
filter:true,
},
policyid: {
title: 'Policy',
type: '',
filter:true,
},
referenceno: {
title: 'Reference No',
type: '',
filter:true,
},
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expireddate: {
title: 'Expired Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
coverageamount: {
title: 'Coverage Amount',
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
paymentreference: {
title: 'Payment Reference',
type: '',
filter:true,
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
pmspropertyinsurancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyinsurancesID)>=0)
{
this.pmspropertyinsurancessource=new LocalDataSource();
this.pmspropertyinsurancessource.load(this.pmspropertyunitservice.pmspropertyinsurances as  any as LocalDataSource);
this.pmspropertyinsurancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyinsurancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmspropertyinsurances.length == 0)
{
    this.tblpmspropertyinsurancessource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyinsurance();
    this.pmspropertyunitservice.pmspropertyinsurances.push(obj);
    this.pmspropertyinsurancessource.refresh();
    if ((this.pmspropertyunitservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyinsurancessource.getPaging().page)
    {
        this.pmspropertyinsurancessource.setPage((this.pmspropertyunitservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyinsurancessource.grid.edit(this.tblpmspropertyinsurancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyinsurancessource.data.indexOf(event.data);
this.onDeletepmspropertyinsurance(event,event.data.insuranceid,((this.pmspropertyinsurancessource.getPaging().page-1) *this.pmspropertyinsurancessource.getPaging().perPage)+index);
this.pmspropertyinsurancessource.refresh();
break;
}
}

*/
pmspropertyinsurancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyinsurance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyinsurance(event,event.data.insuranceid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyinsurance(event,event.data.insuranceid,((this.pmspropertyinsurancessource.getPaging().page-1) *this.pmspropertyinsurancessource.getPaging().perPage)+event.index);
this.pmspropertyinsurancessource.refresh();
break;
}
}
pmspropertyinsurancesonDelete(obj) {
let insuranceid=obj.data.insuranceid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(insuranceid).then(res=>
this.pmspropertyinsurancesLoadTable()
);
}
}
pmspropertyinsurancesPaging(val)
{
debugger;
this.pmspropertyinsurancessource.setPaging(1, val, true);
}

handlepmspropertyinsurancesGridSelected(event:any) {
this.pmspropertyinsurancesselectedindex=this.pmspropertyunitservice.pmspropertyinsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
}
IspmspropertyinsurancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyinsurancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyinsurances
//start of Grid Codes pmscharges
pmschargessettings:any;
pmschargessource: any;

showpmschargesCheckbox()
{
debugger;
if(this.tblpmschargessource.settings['selectMode']== 'multi')this.tblpmschargessource.settings['selectMode']= 'single';
else
this.tblpmschargessource.settings['selectMode']= 'multi';
this.tblpmschargessource.initGrid();
}
deletepmschargesAll()
{
this.tblpmschargessource.settings['selectMode'] = 'single';
}
showpmschargesFilter()
{
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
      if(this.tblpmschargessource.settings!=null)this.tblpmschargessource.settings['hideSubHeader'] =!this.tblpmschargessource.settings['hideSubHeader'];
this.tblpmschargessource.initGrid();
}
showpmschargesInActive()
{
}
enablepmschargesInActive()
{
}
async SetpmschargesTableddConfig()
{
if(!this.bfilterPopulatepmscharges){
}
this.bfilterPopulatepmscharges=true;
}
async pmschargesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmschargesTableConfig()
{
this.pmschargessettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
datecharged: {
title: 'Date Charged',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
chargecycle: {
title: 'Charge Cycle',
type: '',
filter:true,
},
chargetype: {
title: 'Charge Type',
type: '',
filter:true,
},
consumption: {
title: 'Consumption',
type: 'number',
filter:true,
},
chargeamount: {
title: 'Charge Amount',
type: 'number',
filter:true,
},
duedate: {
title: 'Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paiddate: {
title: 'Paid Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paidamount: {
title: 'Paid Amount',
type: 'number',
filter:true,
},
paidmode: {
title: 'Paid Mode',
type: '',
filter:true,
},
paidreference: {
title: 'Paid Reference',
type: '',
filter:true,
},
nextduedate: {
title: 'Next Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
pmschargesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmschargesID)>=0)
{
this.pmschargessource=new LocalDataSource();
this.pmschargessource.load(this.pmspropertyunitservice.pmscharges as  any as LocalDataSource);
this.pmschargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmschargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmscharges.length == 0)
{
    this.tblpmschargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmscharge();
    this.pmspropertyunitservice.pmscharges.push(obj);
    this.pmschargessource.refresh();
    if ((this.pmspropertyunitservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1 != this.pmschargessource.getPaging().page)
    {
        this.pmschargessource.setPage((this.pmspropertyunitservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmschargessource.grid.edit(this.tblpmschargessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmschargessource.data.indexOf(event.data);
this.onDeletepmscharge(event,event.data.chargeid,((this.pmschargessource.getPaging().page-1) *this.pmschargessource.getPaging().perPage)+index);
this.pmschargessource.refresh();
break;
}
}

*/
pmschargesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmscharge(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmscharge(event,event.data.chargeid,this.formid);
break;
case 'delete':
this.onDeletepmscharge(event,event.data.chargeid,((this.pmschargessource.getPaging().page-1) *this.pmschargessource.getPaging().perPage)+event.index);
this.pmschargessource.refresh();
break;
}
}
pmschargesonDelete(obj) {
let chargeid=obj.data.chargeid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(chargeid).then(res=>
this.pmschargesLoadTable()
);
}
}
pmschargesPaging(val)
{
debugger;
this.pmschargessource.setPaging(1, val, true);
}

handlepmschargesGridSelected(event:any) {
this.pmschargesselectedindex=this.pmspropertyunitservice.pmscharges.findIndex(i => i.chargeid === event.data.chargeid);
}
IspmschargesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmschargesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmscharges
//start of Grid Codes pmsleases
pmsleasessettings:any;
pmsleasessource: any;

showpmsleasesCheckbox()
{
debugger;
if(this.tblpmsleasessource.settings['selectMode']== 'multi')this.tblpmsleasessource.settings['selectMode']= 'single';
else
this.tblpmsleasessource.settings['selectMode']= 'multi';
this.tblpmsleasessource.initGrid();
}
deletepmsleasesAll()
{
this.tblpmsleasessource.settings['selectMode'] = 'single';
}
showpmsleasesFilter()
{
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
      if(this.tblpmsleasessource.settings!=null)this.tblpmsleasessource.settings['hideSubHeader'] =!this.tblpmsleasessource.settings['hideSubHeader'];
this.tblpmsleasessource.initGrid();
}
showpmsleasesInActive()
{
}
enablepmsleasesInActive()
{
}
async SetpmsleasesTableddConfig()
{
if(!this.bfilterPopulatepmsleases){

this.pmspropertyservice.getpmspropertiesList().then(res=>
{
var datapropertyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasespropertyid3.push(defaultobj);
for(let i=0; i<datapropertyid2.length; i++){
var obj= { value: datapropertyid2[i].propertyid, title:datapropertyid2[i].title};
this.datapmsleasespropertyid3.push(obj);
}
if((this.tblpmsleasessource.settings as any).columns['propertyid'])
{
(this.tblpmsleasessource.settings as any).columns['propertyid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsleasespropertyid3));
this.tblpmsleasessource.initGrid();
}
});

this.pmspropertyunitservice.getpmspropertyunitsList().then(res=>
{
var dataunitid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasesunitid3.push(defaultobj);
for(let i=0; i<dataunitid2.length; i++){
var obj= { value: dataunitid2[i].unitid, title:dataunitid2[i].unitno};
this.datapmsleasesunitid3.push(obj);
}
if((this.tblpmsleasessource.settings as any).columns['unitid'])
{
(this.tblpmsleasessource.settings as any).columns['unitid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsleasesunitid3));
this.tblpmsleasessource.initGrid();
}
});

this.pmstenantservice.getpmstenantsList().then(res=>
{
var datatenantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasestenantid3.push(defaultobj);
for(let i=0; i<datatenantid2.length; i++){
var obj= { value: datatenantid2[i].tenantid, title:datatenantid2[i].lastname};
this.datapmsleasestenantid3.push(obj);
}
if((this.tblpmsleasessource.settings as any).columns['tenantid'])
{
(this.tblpmsleasessource.settings as any).columns['tenantid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsleasestenantid3));
this.tblpmsleasessource.initGrid();
}
});

this.configservice.getList("leasetype").then(res=>
{
var dataleasetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasesleasetype3.push(defaultobj);
for(let i=0; i<dataleasetype2.length; i++){
var obj= { value: dataleasetype2[i].configkey, title: dataleasetype2[i].configtext};
this.datapmsleasesleasetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsleasessource.settings);
if(clone.columns['leasetype']!=undefined)clone.columns['leasetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesleasetype3)), }, };
if(clone.columns['leasetype']!=undefined)clone.columns['leasetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesleasetype3)), }, };
this.tblpmsleasessource.settings =  clone;
this.tblpmsleasessource.initGrid();
});

this.configservice.getList("rentcycle").then(res=>
{
var datarentcycle2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasesrentcycle3.push(defaultobj);
for(let i=0; i<datarentcycle2.length; i++){
var obj= { value: datarentcycle2[i].configkey, title: datarentcycle2[i].configtext};
this.datapmsleasesrentcycle3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsleasessource.settings);
if(clone.columns['rentcycle']!=undefined)clone.columns['rentcycle'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesrentcycle3)), }, };
if(clone.columns['rentcycle']!=undefined)clone.columns['rentcycle'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesrentcycle3)), }, };
this.tblpmsleasessource.settings =  clone;
this.tblpmsleasessource.initGrid();
});
}
this.bfilterPopulatepmsleases=true;
}
async pmsleasesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsleasesTableConfig()
{
this.pmsleasessettings = {
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
description: {
title: 'Description',
type: '',
filter:true,
},
propertyid: {
title: 'Property',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'dio86',reportcode:'dio86',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasespropertyid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e5jd2',reportcode:'e5jd2',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasestenantid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
leasetype: {
title: 'Lease Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasesleasetype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
datesigned: {
title: 'Date Signed',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
rentcycle: {
title: 'Rent Cycle',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasesrentcycle3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rentamount: {
title: 'Rent Amount',
type: 'number',
filter:true,
},
securitydeposit: {
title: 'Security Deposit',
type: 'number',
filter:true,
},
securitydepositduedate: {
title: 'Security Deposit Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
depositreceived: {
title: 'Deposit Received',
type: 'number',
filter:true,
},
depositrefunded: {
title: 'Deposit Refunded',
type: 'number',
filter:true,
},
depositheld: {
title: 'Deposit Held',
type: 'number',
filter:true,
},
nextduedate: {
title: 'Next Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
noticeperioddays: {
title: 'Notice Period Days',
type: 'number',
filter:true,
},
penaltycyclecount: {
title: 'Penalty Cycle Count',
type: 'number',
filter:true,
},
penaltyamount: {
title: 'Penalty Amount',
type: 'number',
filter:true,
},
rentescalationpercent: {
title: 'Rent Escalation Percent',
type: 'number',
filter:true,
},
rentescalationmonths: {
title: 'Rent Escalation Months',
type: 'number',
filter:true,
},
nextescalationdate: {
title: 'Next Escalation Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
balancedue: {
title: 'Balance Due',
type: 'number',
filter:true,
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
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
pmsleasesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsleasesID)>=0)
{
this.pmsleasessource=new LocalDataSource();
this.pmsleasessource.load(this.pmspropertyunitservice.pmsleases as  any as LocalDataSource);
this.pmsleasessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsleasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmsleases.length == 0)
{
    this.tblpmsleasessource.grid.createFormShown = true;
}
else
{
    let obj = new pmslease();
    this.pmspropertyunitservice.pmsleases.push(obj);
    this.pmsleasessource.refresh();
    if ((this.pmspropertyunitservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1 != this.pmsleasessource.getPaging().page)
    {
        this.pmsleasessource.setPage((this.pmspropertyunitservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsleasessource.grid.edit(this.tblpmsleasessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsleasessource.data.indexOf(event.data);
this.onDeletepmslease(event,event.data.leaseid,((this.pmsleasessource.getPaging().page-1) *this.pmsleasessource.getPaging().perPage)+index);
this.pmsleasessource.refresh();
break;
}
}

*/
pmsleasesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmslease(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmslease(event,event.data.leaseid,this.formid);
break;
case 'delete':
this.onDeletepmslease(event,event.data.leaseid,((this.pmsleasessource.getPaging().page-1) *this.pmsleasessource.getPaging().perPage)+event.index);
this.pmsleasessource.refresh();
break;
}
}
pmsleasesonDelete(obj) {
let leaseid=obj.data.leaseid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(leaseid).then(res=>
this.pmsleasesLoadTable()
);
}
}
pmsleasesPaging(val)
{
debugger;
this.pmsleasessource.setPaging(1, val, true);
}

handlepmsleasesGridSelected(event:any) {
this.pmsleasesselectedindex=this.pmspropertyunitservice.pmsleases.findIndex(i => i.leaseid === event.data.leaseid);
}
IspmsleasesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsleasesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsleases
//start of Grid Codes pmsworkorders
pmsworkorderssettings:any;
pmsworkorderssource: any;

showpmsworkordersCheckbox()
{
debugger;
if(this.tblpmsworkorderssource.settings['selectMode']== 'multi')this.tblpmsworkorderssource.settings['selectMode']= 'single';
else
this.tblpmsworkorderssource.settings['selectMode']= 'multi';
this.tblpmsworkorderssource.initGrid();
}
deletepmsworkordersAll()
{
this.tblpmsworkorderssource.settings['selectMode'] = 'single';
}
showpmsworkordersFilter()
{
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });
      if(this.tblpmsworkorderssource.settings!=null)this.tblpmsworkorderssource.settings['hideSubHeader'] =!this.tblpmsworkorderssource.settings['hideSubHeader'];
this.tblpmsworkorderssource.initGrid();
}
showpmsworkordersInActive()
{
}
enablepmsworkordersInActive()
{
}
async SetpmsworkordersTableddConfig()
{
if(!this.bfilterPopulatepmsworkorders){

this.pmspropertyservice.getpmspropertiesList().then(res=>
{
var datapropertyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkorderspropertyid3.push(defaultobj);
for(let i=0; i<datapropertyid2.length; i++){
var obj= { value: datapropertyid2[i].propertyid, title:datapropertyid2[i].title};
this.datapmsworkorderspropertyid3.push(obj);
}
if((this.tblpmsworkorderssource.settings as any).columns['propertyid'])
{
(this.tblpmsworkorderssource.settings as any).columns['propertyid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsworkorderspropertyid3));
this.tblpmsworkorderssource.initGrid();
}
});

this.pmstenantservice.getpmstenantsList().then(res=>
{
var datatenantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkorderstenantid3.push(defaultobj);
for(let i=0; i<datatenantid2.length; i++){
var obj= { value: datatenantid2[i].tenantid, title:datatenantid2[i].lastname};
this.datapmsworkorderstenantid3.push(obj);
}
if((this.tblpmsworkorderssource.settings as any).columns['tenantid'])
{
(this.tblpmsworkorderssource.settings as any).columns['tenantid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsworkorderstenantid3));
this.tblpmsworkorderssource.initGrid();
}
});

this.configservice.getList("workordertype").then(res=>
{
var dataworkordertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersworkordertype3.push(defaultobj);
for(let i=0; i<dataworkordertype2.length; i++){
var obj= { value: dataworkordertype2[i].configkey, title: dataworkordertype2[i].configtext};
this.datapmsworkordersworkordertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkordertype3)), }, };
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkordertype3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});

this.configservice.getList("workorderfrequency").then(res=>
{
var dataworkorderfrequency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersworkorderfrequency3.push(defaultobj);
for(let i=0; i<dataworkorderfrequency2.length; i++){
var obj= { value: dataworkorderfrequency2[i].configkey, title: dataworkorderfrequency2[i].configtext};
this.datapmsworkordersworkorderfrequency3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkorderfrequency3)), }, };
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkorderfrequency3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkorderspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.datapmsworkorderspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkorderspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkorderspriority3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataresponsibleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersresponsibleid3.push(defaultobj);
for(let i=0; i<dataresponsibleid2.length; i++){
var obj= { value: dataresponsibleid2[i].employeeid, title:dataresponsibleid2[i].employeename};
this.datapmsworkordersresponsibleid3.push(obj);
}
if((this.tblpmsworkorderssource.settings as any).columns['responsibleid'])
{
(this.tblpmsworkorderssource.settings as any).columns['responsibleid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsworkordersresponsibleid3));
this.tblpmsworkorderssource.initGrid();
}
});

this.configservice.getList("visittype").then(res=>
{
var datavisittype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersvisittype3.push(defaultobj);
for(let i=0; i<datavisittype2.length; i++){
var obj= { value: datavisittype2[i].configkey, title: datavisittype2[i].configtext};
this.datapmsworkordersvisittype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['visittype']!=undefined)clone.columns['visittype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersvisittype3)), }, };
if(clone.columns['visittype']!=undefined)clone.columns['visittype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersvisittype3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});
}
this.bfilterPopulatepmsworkorders=true;
}
async pmsworkordersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsworkordersTableConfig()
{
this.pmsworkorderssettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'dio86',reportcode:'dio86',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkorderspropertyid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
workorderno: {
title: 'Work Order No',
type: '',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e5jd2',reportcode:'e5jd2',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkorderstenantid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
scheduleid: {
title: 'Schedule',
type: 'number',
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
workordertype: {
title: 'Work Order Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersworkordertype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
workorderfrequency: {
title: 'Work Order Frequency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersworkorderfrequency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
recurringstartdate: {
title: 'Recurring Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
recurringenddate: {
title: 'Recurring End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
noenddate: {
title: 'No End Date',
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
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkorderspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
invoiceno: {
title: 'Invoice No',
type: '',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
suggestedperson: {
title: 'Suggested Person',
type: '',
filter:true,
},
responsibleid: {
title: 'Responsible',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersresponsibleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
visittype: {
title: 'Visit Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersvisittype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
visitdate: {
title: 'Visit Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
visittime: {
title: 'Visit Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
duedate: {
title: 'Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
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
pmsworkordersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkordersID)>=0)
{
this.pmsworkorderssource=new LocalDataSource();
this.pmsworkorderssource.load(this.pmspropertyunitservice.pmsworkorders as  any as LocalDataSource);
this.pmsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyunitservice.pmsworkorders.length == 0)
{
    this.tblpmsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorder();
    this.pmspropertyunitservice.pmsworkorders.push(obj);
    this.pmsworkorderssource.refresh();
    if ((this.pmspropertyunitservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderssource.getPaging().page)
    {
        this.pmsworkorderssource.setPage((this.pmspropertyunitservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsworkorderssource.grid.edit(this.tblpmsworkorderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsworkorderssource.data.indexOf(event.data);
this.onDeletepmsworkorder(event,event.data.workorderid,((this.pmsworkorderssource.getPaging().page-1) *this.pmsworkorderssource.getPaging().perPage)+index);
this.pmsworkorderssource.refresh();
break;
}
}

*/
pmsworkordersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsworkorder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsworkorder(event,event.data.workorderid,this.formid);
break;
case 'delete':
this.onDeletepmsworkorder(event,event.data.workorderid,((this.pmsworkorderssource.getPaging().page-1) *this.pmsworkorderssource.getPaging().perPage)+event.index);
this.pmsworkorderssource.refresh();
break;
}
}
pmsworkordersonDelete(obj) {
let workorderid=obj.data.workorderid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyunitservice.deletepmspropertyunit(workorderid).then(res=>
this.pmsworkordersLoadTable()
);
}
}
pmsworkordersPaging(val)
{
debugger;
this.pmsworkorderssource.setPaging(1, val, true);
}

handlepmsworkordersGridSelected(event:any) {
this.pmsworkordersselectedindex=this.pmspropertyunitservice.pmsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
}
IspmsworkordersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkordersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsworkorders

}



