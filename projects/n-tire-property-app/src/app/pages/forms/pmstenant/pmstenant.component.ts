import { pmstenantService } from './../../../service/pmstenant.service';
import { pmstenant } from './../../../model/pmstenant.model';
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
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitComponent } from './../../../pages/forms/pmspropertyunit/pmspropertyunit.component';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
//detail table services
import { pmspropertyinsurance } from './../../../model/pmspropertyinsurance.model';
import { pmspropertyinsuranceComponent } from './../../../pages/forms/pmspropertyinsurance/pmspropertyinsurance.component';
//FK services
import { pmsdeposit } from './../../../model/pmsdeposit.model';
import { pmsdepositComponent } from './../../../pages/forms/pmsdeposit/pmsdeposit.component';
//FK services
import { pmslease,IpmsleaseResponse } from './../../../model/pmslease.model';
import { pmsleaseComponent } from './../../../pages/forms/pmslease/pmslease.component';
import { pmsleaseService } from './../../../service/pmslease.service';
import { pmspropertyowner,IpmspropertyownerResponse } from './../../../model/pmspropertyowner.model';
import { pmspropertyownerComponent } from './../../../pages/forms/pmspropertyowner/pmspropertyowner.component';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
import { pmscharge } from './../../../model/pmscharge.model';
import { pmschargeComponent } from './../../../pages/forms/pmscharge/pmscharge.component';
//FK services
import { pmsschedule } from './../../../model/pmsschedule.model';
import { pmsscheduleComponent } from './../../../pages/forms/pmsschedule/pmsschedule.component';
//FK services
import { pmspdc } from './../../../model/pmspdc.model';
import { pmspdcComponent } from './../../../pages/forms/pmspdc/pmspdc.component';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { pmskycdetail } from './../../../model/pmskycdetail.model';
import { pmskycdetailComponent } from './../../../pages/forms/pmskycdetail/pmskycdetail.component';
//FK services
//FK services
import { pmsworkorder } from './../../../model/pmsworkorder.model';
import { pmsworkorderComponent } from './../../../pages/forms/pmsworkorder/pmsworkorder.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
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

@Component({
selector: 'app-pmstenant',
templateUrl: './pmstenant.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmstenantComponent implements OnInit {
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
bfilterPopulatepmstenants:boolean=false;
datapmstenantstenantid3:any=[];
datapmstenantspropertyid3:any=[];
datapmstenantsunitid3:any=[];
datapmstenantsgender3:any=[];
datapmstenantscountryid3:any=[];
datapmstenantsstateid3:any=[];
datapmstenantscityid3:any=[];
datapmstenantsgender13:any=[];
datapmspropertyinsurancestenantid3:any=[];
datapmspropertyinsurancespropertyid3:any=[];
datapmspropertyinsurancesunitid3:any=[];
bfilterPopulatepmspropertyinsurances:boolean=false;
datapmsdepositsdeposittype3:any=[];
datapmsdepositstenantid3:any=[];
datapmsdepositsleaseid3:any=[];
datapmsdepositspropertyid3:any=[];
datapmsdepositspaymenttype3:any=[];
datapmsdepositsunitid3:any=[];
datapmsdepositsownerid3:any=[];
bfilterPopulatepmsdeposits:boolean=false;
datapmschargeschargecycle3:any=[];
datapmschargeschargetype3:any=[];
datapmschargesleaseid3:any=[];
datapmschargestenantid3:any=[];
datapmschargespropertyid3:any=[];
datapmschargespaidmode3:any=[];
datapmschargesunitid3:any=[];
datapmschargesownerid3:any=[];
bfilterPopulatepmscharges:boolean=false;
datapmsschedulesworkorderfrequency3:any=[];
datapmsschedulesworkordertype3:any=[];
datapmsschedulespriority3:any=[];
datapmsschedulespropertyid3:any=[];
datapmsschedulestenantid3:any=[];
datapmsschedulesunitid3:any=[];
datapmsschedulesownerid3:any=[];
bfilterPopulatepmsschedules:boolean=false;
datapmspdcssubcategoryid3:any=[];
datapmspdcscategoryid3:any=[];
datapmspdcspaymenttype3:any=[];
datapmspdcscollectionmode3:any=[];
datapmspdcspropertyid3:any=[];
datapmspdcstenantid3:any=[];
datapmspdcsunitid3:any=[];
datapmspdcsownerid3:any=[];
bfilterPopulatepmspdcs:boolean=false;
datapmskycdetailskyctype3:any=[];
datapmskycdetailstenantid3:any=[];
bfilterPopulatepmskycdetails:boolean=false;
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
datapmspropertyunitsbeds3:any=[];
datapmspropertyunitsbaths3:any=[];
datapmspropertyunitsunittype3:any=[];
datapmspropertyunitsfirstrentcommissiontype3:any=[];
datapmspropertyunitsrentcommissiontype3:any=[];
datapmspropertyunitsrenewalfeetype3:any=[];
datapmspropertyunitsservicefeetype3:any=[];
datapmspropertyunitsterm3:any=[];
datapmspropertyunitsunitstatus3:any=[];
datapmspropertyunitspropertyid3:any=[];
datapmspropertyunitstenantid3:any=[];
bfilterPopulatepmspropertyunits:boolean=false;
@ViewChild('tblpmspropertyinsurancessource',{static:false}) tblpmspropertyinsurancessource: Ng2SmartTableComponent;
@ViewChild('tblpmsdepositssource',{static:false}) tblpmsdepositssource: Ng2SmartTableComponent;
@ViewChild('tblpmschargessource',{static:false}) tblpmschargessource: Ng2SmartTableComponent;
@ViewChild('tblpmsschedulessource',{static:false}) tblpmsschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmspdcssource',{static:false}) tblpmspdcssource: Ng2SmartTableComponent;
@ViewChild('tblpmskycdetailssource',{static:false}) tblpmskycdetailssource: Ng2SmartTableComponent;
@ViewChild('tblpmsleasessource',{static:false}) tblpmsleasessource: Ng2SmartTableComponent;
@ViewChild('tblpmsworkorderssource',{static:false}) tblpmsworkorderssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyunitssource',{static:false}) tblpmspropertyunitssource: Ng2SmartTableComponent;
 pmstenantForm: FormGroup;
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenantid_pmstenantsForm: FormGroup;//autocomplete
tenantid_pmstenantsoptions:any;//autocomplete
tenantid_pmstenantsformatter:any;//autocomplete
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
genderList: boconfigvalue[];
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
gender1List: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
pmstenantshowOption:boolean;
pmspropertyinsuranceshowOption:boolean;
pmsdepositshowOption:boolean;
pmschargeshowOption:boolean;
pmsscheduleshowOption:boolean;
pmspdcshowOption:boolean;
pmskycdetailshowOption:boolean;
pmsleaseshowOption:boolean;
pmsworkordershowOption:boolean;
pmspropertyunitshowOption:boolean;
sessiondata:any;
sourcekey:any;



pmspropertyinsurancesvisiblelist:any;
pmspropertyinsuranceshidelist:any;
pmsdepositsvisiblelist:any;
pmsdepositshidelist:any;
pmschargesvisiblelist:any;
pmschargeshidelist:any;
pmsschedulesvisiblelist:any;
pmsscheduleshidelist:any;
pmspdcsvisiblelist:any;
pmspdcshidelist:any;
pmskycdetailsvisiblelist:any;
pmskycdetailshidelist:any;
pmsleasesvisiblelist:any;
pmsleaseshidelist:any;
pmsworkordersvisiblelist:any;
pmsworkordershidelist:any;
pmspropertyunitsvisiblelist:any;
pmspropertyunitshidelist:any;

DeletedpmspropertyinsuranceIDs: string="";
pmspropertyinsurancesID: string = "1";
pmspropertyinsurancesselectedindex:any;
DeletedpmsdepositIDs: string="";
pmsdepositsID: string = "2";
pmsdepositsselectedindex:any;
DeletedpmschargeIDs: string="";
pmschargesID: string = "3";
pmschargesselectedindex:any;
DeletedpmsscheduleIDs: string="";
pmsschedulesID: string = "4";
pmsschedulesselectedindex:any;
DeletedpmspdcIDs: string="";
pmspdcsID: string = "5";
pmspdcsselectedindex:any;
DeletedpmskycdetailIDs: string="";
pmskycdetailsID: string = "6";
pmskycdetailsselectedindex:any;
DeletedpmsleaseIDs: string="";
pmsleasesID: string = "7";
pmsleasesselectedindex:any;
DeletedpmsworkorderIDs: string="";
pmsworkordersID: string = "8";
pmsworkordersselectedindex:any;
DeletedpmspropertyunitIDs: string="";
pmspropertyunitsID: string = "9";
pmspropertyunitsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmstenantservice: pmstenantService,
private pmspropertyservice: pmspropertyService,
private pmspropertyunitservice: pmspropertyunitService,
private pmsleaseservice: pmsleaseService,
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
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.pmstenantForm  = this.fb.group({
pk:[null],
tenantid: [null],
tenantiddesc: [null],
firstname: [null],
lastname: [null],
iscompany: [null],
companyname: [null],
thumbnail: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
datesigned: [null],
movein: [null],
moveout: [null],
memberscount: [null],
identityno: [null],
dateofbirth: [null],
age: [null],
gender: [null],
genderdesc: [null],
emailid: [null],
mobileno: [null],
housecontactno: [null],
officecontactno: [null],
employer: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
bankname: [null],
bankaccount: [null],
iban: [null],
petdetails: [null],
vehicledetails: [null],
firstname1: [null],
lastname1: [null],
identityno1: [null],
dateofbirth1: [null],
age1: [null],
gender1: [null],
gender1desc: [null],
emailid1: [null],
mobileno1: [null],
housecontactno1: [null],
officecontactno1: [null],
employer1: [null],
notes: [null],
balancedue: [null],
lastpaymentdate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmstenantForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmstenantForm.dirty && this.pmstenantForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.tenantid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.tenantid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.tenantid && pkDetail) {
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
let pmstenantid = null;

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
this.formid=pmstenantid;
//this.sharedService.alert(pmstenantid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmspropertyinsurancesTableConfig();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });

this.SetpmsdepositsTableConfig();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });

this.SetpmschargesTableConfig();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });

this.SetpmsschedulesTableConfig();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });

this.SetpmspdcsTableConfig();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });

this.SetpmskycdetailsTableConfig();
  setTimeout(() => {
  this.SetpmskycdetailsTableddConfig();
  });

this.SetpmsleasesTableConfig();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });

this.SetpmsworkordersTableConfig();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });

this.SetpmspropertyunitsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmstenantForm.patchValue({
    tenantid: this.pmstenantservice.formData.tenantid,
    tenantiddesc: this.pmstenantservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmstenantForm.get('tenantid').value);
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
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmstenantForm.patchValue({
    propertyid: this.pmstenantservice.formData.propertyid,
    propertyiddesc: this.pmstenantservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmstenantForm.get('propertyid').value);
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
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.unitid){this.pmstenantForm.patchValue({
    unitid: this.pmstenantservice.formData.unitid,
    unitiddesc: this.pmstenantservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.pmstenantForm.patchValue({
    countryid: this.pmstenantservice.formData.countryid,
    countryiddesc: this.pmstenantservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.pmstenantForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.stateid){this.pmstenantForm.patchValue({
    stateid: this.pmstenantservice.formData.stateid,
    stateiddesc: this.pmstenantservice.formData.stateiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
if(this.pmstenantservice.formData && this.pmstenantservice.formData.cityid){this.pmstenantForm.patchValue({
    cityid: this.pmstenantservice.formData.cityid,
    cityiddesc: this.pmstenantservice.formData.cityiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;
this.configservice.getList("gender").then(res => this.gender1List = res as boconfigvalue[]);

//autocomplete
    this.pmstenantservice.getpmstenantsList().then(res => {
      this.pkList = res as pmstenant[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.lastname;

//setting the flag that the screen is not touched 
this.pmstenantForm.markAsUntouched();
this.pmstenantForm.markAsPristine();
}
onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmstenantForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmstenantForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.pmstenantForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});
this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
 this.stateidList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.pmstenantForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});
this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
 this.cityidList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.pmstenantForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.pmstenantForm != null)
this.pmstenantForm.reset();
this.pmstenantForm.patchValue({
});
setTimeout(() => {
this.pmstenantservice.pmspropertyinsurances=[];
this.pmspropertyinsurancesLoadTable();
this.pmstenantservice.pmsdeposits=[];
this.pmsdepositsLoadTable();
this.pmstenantservice.pmscharges=[];
this.pmschargesLoadTable();
this.pmstenantservice.pmsschedules=[];
this.pmsschedulesLoadTable();
this.pmstenantservice.pmspdcs=[];
this.pmspdcsLoadTable();
this.pmstenantservice.pmskycdetails=[];
this.pmskycdetailsLoadTable();
this.pmstenantservice.pmsleases=[];
this.pmsleasesLoadTable();
this.pmstenantservice.pmsworkorders=[];
this.pmsworkordersLoadTable();
this.pmstenantservice.pmspropertyunits=[];
this.pmspropertyunitsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let tenantid = this.pmstenantForm.get('tenantid').value;
        if(tenantid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmstenantservice.deletepmstenant(tenantid).then(res =>
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
    this.pmstenantForm.patchValue({
        tenantid: null
    });
    if(this.pmstenantservice.formData.tenantid!=null)this.pmstenantservice.formData.tenantid=null;
for (let i=0;i<this.pmstenantservice.pmspropertyinsurances.length;i++) {
this.pmstenantservice.pmspropertyinsurances[i].insuranceid=null;
}
for (let i=0;i<this.pmstenantservice.pmsdeposits.length;i++) {
this.pmstenantservice.pmsdeposits[i].depositid=null;
}
for (let i=0;i<this.pmstenantservice.pmscharges.length;i++) {
this.pmstenantservice.pmscharges[i].chargeid=null;
}
for (let i=0;i<this.pmstenantservice.pmsschedules.length;i++) {
this.pmstenantservice.pmsschedules[i].scheduleid=null;
}
for (let i=0;i<this.pmstenantservice.pmspdcs.length;i++) {
this.pmstenantservice.pmspdcs[i].pdcid=null;
}
for (let i=0;i<this.pmstenantservice.pmskycdetails.length;i++) {
this.pmstenantservice.pmskycdetails[i].kycid=null;
}
for (let i=0;i<this.pmstenantservice.pmsleases.length;i++) {
this.pmstenantservice.pmsleases[i].leaseid=null;
}
for (let i=0;i<this.pmstenantservice.pmsworkorders.length;i++) {
this.pmstenantservice.pmsworkorders[i].workorderid=null;
}
for (let i=0;i<this.pmstenantservice.pmspropertyunits.length;i++) {
this.pmstenantservice.pmspropertyunits[i].unitid=null;
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
        else if(key=="datesigned")
this.pmstenantForm.patchValue({"datesigned":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="movein")
this.pmstenantForm.patchValue({"movein":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="moveout")
this.pmstenantForm.patchValue({"moveout":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dateofbirth")
this.pmstenantForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dateofbirth1")
this.pmstenantForm.patchValue({"dateofbirth1":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.pmstenantForm.patchValue({"notes":  mainscreendata[key] } );
        else if(key=="lastpaymentdate")
this.pmstenantForm.patchValue({"lastpaymentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmstenantForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmstenantForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmstenantForm.controls[key]!=undefined)
{
this.pmstenantForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.pmstenantservice.formData.lastname!=null )
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
tenantidonChange(evt:any){
let e=evt.value;
}
firstnameonChange(evt:any){
let e=evt.value;
}
lastnameonChange(evt:any){
let e=evt.value;
}
iscompanyonChange(evt:any){
let e=evt.value;
}
companynameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmstenantForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
datesignedonChange(evt:any){
let e=evt.value;
}
moveinonChange(evt:any){
let e=evt.value;
}
moveoutonChange(evt:any){
let e=evt.value;
}
memberscountonChange(evt:any){
let e=evt.value;
}
identitynoonChange(evt:any){
let e=evt.value;
}
dateofbirthonChange(evt:any){
let e=evt.value;
}
ageonChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.pmstenantForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
emailidonChange(evt:any){
let e=evt.value;
}
mobilenoonChange(evt:any){
let e=evt.value;
}
housecontactnoonChange(evt:any){
let e=evt.value;
}
officecontactnoonChange(evt:any){
let e=evt.value;
}
employeronChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
banknameonChange(evt:any){
let e=evt.value;
}
bankaccountonChange(evt:any){
let e=evt.value;
}
ibanonChange(evt:any){
let e=evt.value;
}
petdetailsonChange(evt:any){
let e=evt.value;
}
vehicledetailsonChange(evt:any){
let e=evt.value;
}
firstname1onChange(evt:any){
let e=evt.value;
}
lastname1onChange(evt:any){
let e=evt.value;
}
identityno1onChange(evt:any){
let e=evt.value;
}
dateofbirth1onChange(evt:any){
let e=evt.value;
}
age1onChange(evt:any){
let e=evt.value;
}
gender1onChange(evt:any){
let e=this.f.gender1.value as any;
this.pmstenantForm.patchValue({gender1desc:evt.options[evt.options.selectedIndex].text});
}
emailid1onChange(evt:any){
let e=evt.value;
}
mobileno1onChange(evt:any){
let e=evt.value;
}
housecontactno1onChange(evt:any){
let e=evt.value;
}
officecontactno1onChange(evt:any){
let e=evt.value;
}
employer1onChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
balancedueonChange(evt:any){
let e=evt.value;
}
lastpaymentdateonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmstenants() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmstenantservice.getpmstenantsByEID(pkcol).then(res => {

this.pmstenantservice.formData=res.pmstenant;
let formproperty=res.pmstenant.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmstenant.pkcol;
this.formid=res.pmstenant.tenantid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmstenant.tenantid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmstenantForm.patchValue({
tenantid: res.pmstenant.tenantid,
tenantiddesc: res.pmstenant.tenantiddesc,
firstname: res.pmstenant.firstname,
lastname: res.pmstenant.lastname,
iscompany: res.pmstenant.iscompany,
companyname: res.pmstenant.companyname,
thumbnail: JSON.parse(res.pmstenant.thumbnail),
propertyid: res.pmstenant.propertyid,
propertyiddesc: res.pmstenant.propertyiddesc,
unitid: res.pmstenant.unitid,
unitiddesc: res.pmstenant.unitiddesc,
datesigned: this.ngbDateParserFormatter.parse(res.pmstenant.datesigned),
movein: this.ngbDateParserFormatter.parse(res.pmstenant.movein),
moveout: this.ngbDateParserFormatter.parse(res.pmstenant.moveout),
memberscount: res.pmstenant.memberscount,
identityno: res.pmstenant.identityno,
dateofbirth: this.ngbDateParserFormatter.parse(res.pmstenant.dateofbirth),
age: res.pmstenant.age,
gender: res.pmstenant.gender,
genderdesc: res.pmstenant.genderdesc,
emailid: res.pmstenant.emailid,
mobileno: res.pmstenant.mobileno,
housecontactno: res.pmstenant.housecontactno,
officecontactno: res.pmstenant.officecontactno,
employer: res.pmstenant.employer,
address1: res.pmstenant.address1,
address2: res.pmstenant.address2,
countryid: res.pmstenant.countryid,
countryiddesc: res.pmstenant.countryiddesc,
stateid: res.pmstenant.stateid,
stateiddesc: res.pmstenant.stateiddesc,
cityid: res.pmstenant.cityid,
cityiddesc: res.pmstenant.cityiddesc,
bankname: res.pmstenant.bankname,
bankaccount: res.pmstenant.bankaccount,
iban: res.pmstenant.iban,
petdetails: res.pmstenant.petdetails,
vehicledetails: res.pmstenant.vehicledetails,
firstname1: res.pmstenant.firstname1,
lastname1: res.pmstenant.lastname1,
identityno1: res.pmstenant.identityno1,
dateofbirth1: this.ngbDateParserFormatter.parse(res.pmstenant.dateofbirth1),
age1: res.pmstenant.age1,
gender1: res.pmstenant.gender1,
gender1desc: res.pmstenant.gender1desc,
emailid1: res.pmstenant.emailid1,
mobileno1: res.pmstenant.mobileno1,
housecontactno1: res.pmstenant.housecontactno1,
officecontactno1: res.pmstenant.officecontactno1,
employer1: res.pmstenant.employer1,
notes: JSON.parse(res.pmstenant.notes),
balancedue: res.pmstenant.balancedue,
lastpaymentdate: this.ngbDateParserFormatter.parse(res.pmstenant.lastpaymentdate),
status: res.pmstenant.status,
statusdesc: res.pmstenant.statusdesc,
});
this.pmspropertyinsurancesvisiblelist=res.pmspropertyinsurancesvisiblelist;
this.pmsdepositsvisiblelist=res.pmsdepositsvisiblelist;
this.pmschargesvisiblelist=res.pmschargesvisiblelist;
this.pmsschedulesvisiblelist=res.pmsschedulesvisiblelist;
this.pmspdcsvisiblelist=res.pmspdcsvisiblelist;
this.pmskycdetailsvisiblelist=res.pmskycdetailsvisiblelist;
this.pmsleasesvisiblelist=res.pmsleasesvisiblelist;
this.pmsworkordersvisiblelist=res.pmsworkordersvisiblelist;
this.pmspropertyunitsvisiblelist=res.pmspropertyunitsvisiblelist;
if(this.pmstenantForm.get('thumbnail').value!=null && this.pmstenantForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.pmstenantForm.get('thumbnail').value);
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.pmstenantservice.pmspropertyinsurances = res.pmspropertyinsurances;
this.SetpmspropertyinsurancesTableConfig();
this.pmspropertyinsurancesLoadTable();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });
this.pmstenantservice.pmsdeposits = res.pmsdeposits;
this.SetpmsdepositsTableConfig();
this.pmsdepositsLoadTable();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
this.pmstenantservice.pmscharges = res.pmscharges;
this.SetpmschargesTableConfig();
this.pmschargesLoadTable();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
this.pmstenantservice.pmsschedules = res.pmsschedules;
this.SetpmsschedulesTableConfig();
this.pmsschedulesLoadTable();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
this.pmstenantservice.pmspdcs = res.pmspdcs;
this.SetpmspdcsTableConfig();
this.pmspdcsLoadTable();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
this.pmstenantservice.pmskycdetails = res.pmskycdetails;
this.SetpmskycdetailsTableConfig();
this.pmskycdetailsLoadTable();
  setTimeout(() => {
  this.SetpmskycdetailsTableddConfig();
  });
this.pmstenantservice.pmsleases = res.pmsleases;
this.SetpmsleasesTableConfig();
this.pmsleasesLoadTable();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
this.pmstenantservice.pmsworkorders = res.pmsworkorders;
this.SetpmsworkordersTableConfig();
this.pmsworkordersLoadTable();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });
this.pmstenantservice.pmspropertyunits = res.pmspropertyunits;
this.SetpmspropertyunitsTableConfig();
this.pmspropertyunitsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
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
  for (let key in this.pmstenantForm.controls) {
    if (this.pmstenantForm.controls[key] != null) {
if( key=="thumbnail")
{
if(this.pmstenantservice.formData!=null && this.pmstenantservice.formData[key]!=null  && this.pmstenantservice.formData[key]!='[]' && this.pmstenantservice.formData[key]!=undefined && this.pmstenantservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmstenantservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmstenantservice.formData!=null && this.pmstenantservice.formData[key]!=null   && this.pmstenantservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmstenantservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmstenantservice.formData!=null && this.pmstenantservice.formData[key]!=null   && this.pmstenantservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmstenantservice.formData[key]+"'><div class='progress__number'>"+this.pmstenantservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmstenantForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmstenantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmstenantForm.value;
obj.datesigned=new Date(this.pmstenantForm.get('datesigned').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('datesigned').value)+'  UTC' :null);
obj.movein=new Date(this.pmstenantForm.get('movein').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('movein').value)+'  UTC' :null);
obj.moveout=new Date(this.pmstenantForm.get('moveout').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('moveout').value)+'  UTC' :null);
obj.dateofbirth=new Date(this.pmstenantForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('dateofbirth').value)+'  UTC' :null);
obj.dateofbirth1=new Date(this.pmstenantForm.get('dateofbirth1').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('dateofbirth1').value)+'  UTC' :null);
if(this.pmstenantForm.get('notes').value!=null)obj.notes=JSON.stringify(this.pmstenantForm.get('notes').value);
obj.lastpaymentdate=new Date(this.pmstenantForm.get('lastpaymentdate').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('lastpaymentdate').value)+'  UTC' :null);
if(this.thumbnail.getattachmentlist()!=null)obj.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
console.log(obj);
await this.sharedService.upload(this.thumbnail.getAllFiles());
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

private pmstenanttoggleOption(){
this.pmstenantshowOption = this.pmstenantshowOption === true ? false : true;
}

private pmspropertyinsurancetoggleOption(){
this.pmspropertyinsuranceshowOption = this.pmspropertyinsuranceshowOption === true ? false : true;
}

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}

private pmsscheduletoggleOption(){
this.pmsscheduleshowOption = this.pmsscheduleshowOption === true ? false : true;
}

private pmspdctoggleOption(){
this.pmspdcshowOption = this.pmspdcshowOption === true ? false : true;
}

private pmskycdetailtoggleOption(){
this.pmskycdetailshowOption = this.pmskycdetailshowOption === true ? false : true;
}

private pmsleasetoggleOption(){
this.pmsleaseshowOption = this.pmsleaseshowOption === true ? false : true;
}

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}

private pmspropertyunittoggleOption(){
this.pmspropertyunitshowOption = this.pmspropertyunitshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmstenantForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmstenantForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmstenantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmstenantservice.formData=this.pmstenantForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmstenantForm.controls[key] != null)
    {
        this.pmstenantservice.formData[key] = this.pmstenantForm.controls[key].value;
    }
}
}
}
this.pmstenantservice.formData.thumbnail=this.pmstenantForm.get('thumbnail').value;
this.pmstenantservice.formData.datesigned=new Date(this.pmstenantForm.get('datesigned').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('datesigned').value)+'  UTC' :null);
this.pmstenantservice.formData.movein=new Date(this.pmstenantForm.get('movein').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('movein').value)+'  UTC' :null);
this.pmstenantservice.formData.moveout=new Date(this.pmstenantForm.get('moveout').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('moveout').value)+'  UTC' :null);
this.pmstenantservice.formData.dateofbirth=new Date(this.pmstenantForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('dateofbirth').value)+'  UTC' :null);
this.pmstenantservice.formData.dateofbirth1=new Date(this.pmstenantForm.get('dateofbirth1').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('dateofbirth1').value)+'  UTC' :null);
if(this.pmstenantForm.get('notes').value!=null)this.pmstenantservice.formData.notes=JSON.stringify(this.pmstenantForm.get('notes').value);
this.pmstenantservice.formData.lastpaymentdate=new Date(this.pmstenantForm.get('lastpaymentdate').value ? this.ngbDateParserFormatter.format(this.pmstenantForm.get('lastpaymentdate').value)+'  UTC' :null);
this.pmstenantservice.formData.DeletedpmspropertyinsuranceIDs = this.DeletedpmspropertyinsuranceIDs;
this.pmstenantservice.formData.DeletedpmsdepositIDs = this.DeletedpmsdepositIDs;
this.pmstenantservice.formData.DeletedpmschargeIDs = this.DeletedpmschargeIDs;
this.pmstenantservice.formData.DeletedpmsscheduleIDs = this.DeletedpmsscheduleIDs;
this.pmstenantservice.formData.DeletedpmspdcIDs = this.DeletedpmspdcIDs;
this.pmstenantservice.formData.DeletedpmskycdetailIDs = this.DeletedpmskycdetailIDs;
this.pmstenantservice.formData.DeletedpmsleaseIDs = this.DeletedpmsleaseIDs;
this.pmstenantservice.formData.DeletedpmsworkorderIDs = this.DeletedpmsworkorderIDs;
this.pmstenantservice.formData.DeletedpmspropertyunitIDs = this.DeletedpmspropertyunitIDs;
if(this.thumbnail.getattachmentlist()!=null)this.pmstenantservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
console.log(this.pmstenantservice.formData);
this.pmstenantservice.formData=this.pmstenantForm.value;
this.pmstenantservice.saveOrUpdatepmstenants().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
if (this.pmspropertyinsurancessource.data)
{
    for (let i = 0; i < this.pmspropertyinsurancessource.data.length; i++)
    {
        if (this.pmspropertyinsurancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyinsurancessource.data[i].fileattachmentlist);
    }
}
if (this.pmsdepositssource.data)
{
    for (let i = 0; i < this.pmsdepositssource.data.length; i++)
    {
        if (this.pmsdepositssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsdepositssource.data[i].fileattachmentlist);
    }
}
if (this.pmschargessource.data)
{
    for (let i = 0; i < this.pmschargessource.data.length; i++)
    {
        if (this.pmschargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmschargessource.data[i].fileattachmentlist);
    }
}
if (this.pmsschedulessource.data)
{
    for (let i = 0; i < this.pmsschedulessource.data.length; i++)
    {
        if (this.pmsschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsschedulessource.data[i].fileattachmentlist);
    }
}
if (this.pmspdcssource.data)
{
    for (let i = 0; i < this.pmspdcssource.data.length; i++)
    {
        if (this.pmspdcssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspdcssource.data[i].fileattachmentlist);
    }
}
if (this.pmskycdetailssource.data)
{
    for (let i = 0; i < this.pmskycdetailssource.data.length; i++)
    {
        if (this.pmskycdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmskycdetailssource.data[i].fileattachmentlist);
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
if (this.pmspropertyunitssource.data)
{
    for (let i = 0; i < this.pmspropertyunitssource.data.length; i++)
    {
        if (this.pmspropertyunitssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyunitssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmstenant);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmstenantservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmstenant);
}
else
{
this.FillData(res);
}
}
this.pmstenantForm.markAsUntouched();
this.pmstenantForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmstenantForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmstenantForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmstenantForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.pmstenantForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.pmstenantForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.pmstenantForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmspropertyinsurance(event:any,insuranceid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyinsuranceComponent, 
{
data:  {  showview:false,save:false,event,insuranceid, tenantid,visiblelist:this.pmspropertyinsurancesvisiblelist,  hidelist:this.pmspropertyinsuranceshidelist,ScreenType:2  },
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
this.pmstenantservice.pmspropertyinsurances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsdeposit(event:any,depositid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsdepositComponent, 
{
data:  {  showview:false,save:false,event,depositid, tenantid,visiblelist:this.pmsdepositsvisiblelist,  hidelist:this.pmsdepositshidelist,ScreenType:2  },
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
this.pmstenantservice.pmsdeposits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmscharge(event:any,chargeid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmschargeComponent, 
{
data:  {  showview:false,save:false,event,chargeid, tenantid,visiblelist:this.pmschargesvisiblelist,  hidelist:this.pmschargeshidelist,ScreenType:2  },
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
this.pmstenantservice.pmscharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsschedule(event:any,scheduleid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, tenantid,visiblelist:this.pmsschedulesvisiblelist,  hidelist:this.pmsscheduleshidelist,ScreenType:2  },
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
this.pmstenantservice.pmsschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspdc(event:any,pdcid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspdcComponent, 
{
data:  {  showview:false,save:false,event,pdcid, tenantid,visiblelist:this.pmspdcsvisiblelist,  hidelist:this.pmspdcshidelist,ScreenType:2  },
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
this.pmstenantservice.pmspdcs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmskycdetail(event:any,kycid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmskycdetailComponent, 
{
data:  {  showview:false,save:false,event,kycid, tenantid,visiblelist:this.pmskycdetailsvisiblelist,  hidelist:this.pmskycdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmskycdetailssource.add(res);
this.pmskycdetailssource.refresh();
}
else
{
this.pmskycdetailssource.update(event.data, res);
}
}
});
}

onDeletepmskycdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmskycdetailIDs += childID + ",";
this.pmstenantservice.pmskycdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmslease(event:any,leaseid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsleaseComponent, 
{
data:  {  showview:false,save:false,event,leaseid, tenantid,visiblelist:this.pmsleasesvisiblelist,  hidelist:this.pmsleaseshidelist,ScreenType:2  },
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
this.pmstenantservice.pmsleases.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsworkorder(event:any,workorderid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, tenantid,visiblelist:this.pmsworkordersvisiblelist,  hidelist:this.pmsworkordershidelist,ScreenType:2  },
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
this.pmstenantservice.pmsworkorders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyunit(event:any,unitid:any, tenantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyunitComponent, 
{
data:  {  showview:false,save:false,event,unitid, tenantid,visiblelist:this.pmspropertyunitsvisiblelist,  hidelist:this.pmspropertyunitshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyunitssource.add(res);
this.pmspropertyunitssource.refresh();
}
else
{
this.pmspropertyunitssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyunit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyunitIDs += childID + ",";
this.pmstenantservice.pmspropertyunits.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
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
unitid: {
title: 'Unit',
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
this.pmspropertyinsurancessource.load(this.pmstenantservice.pmspropertyinsurances as  any as LocalDataSource);
this.pmspropertyinsurancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyinsurancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmspropertyinsurances.length == 0)
{
    this.tblpmspropertyinsurancessource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyinsurance();
    this.pmstenantservice.pmspropertyinsurances.push(obj);
    this.pmspropertyinsurancessource.refresh();
    if ((this.pmstenantservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyinsurancessource.getPaging().page)
    {
        this.pmspropertyinsurancessource.setPage((this.pmstenantservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(insuranceid).then(res=>
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
this.pmspropertyinsurancesselectedindex=this.pmstenantservice.pmspropertyinsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
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
unitid: {
title: 'Unit',
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
this.pmsdepositssource.load(this.pmstenantservice.pmsdeposits as  any as LocalDataSource);
this.pmsdepositssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsdepositsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmsdeposits.length == 0)
{
    this.tblpmsdepositssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsdeposit();
    this.pmstenantservice.pmsdeposits.push(obj);
    this.pmsdepositssource.refresh();
    if ((this.pmstenantservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1 != this.pmsdepositssource.getPaging().page)
    {
        this.pmsdepositssource.setPage((this.pmstenantservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(depositid).then(res=>
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
this.pmsdepositsselectedindex=this.pmstenantservice.pmsdeposits.findIndex(i => i.depositid === event.data.depositid);
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
unitid: {
title: 'Unit',
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
this.pmschargessource.load(this.pmstenantservice.pmscharges as  any as LocalDataSource);
this.pmschargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmschargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmscharges.length == 0)
{
    this.tblpmschargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmscharge();
    this.pmstenantservice.pmscharges.push(obj);
    this.pmschargessource.refresh();
    if ((this.pmstenantservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1 != this.pmschargessource.getPaging().page)
    {
        this.pmschargessource.setPage((this.pmstenantservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(chargeid).then(res=>
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
this.pmschargesselectedindex=this.pmstenantservice.pmscharges.findIndex(i => i.chargeid === event.data.chargeid);
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
unitid: {
title: 'Unit',
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
this.pmsschedulessource.load(this.pmstenantservice.pmsschedules as  any as LocalDataSource);
this.pmsschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmsschedules.length == 0)
{
    this.tblpmsschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsschedule();
    this.pmstenantservice.pmsschedules.push(obj);
    this.pmsschedulessource.refresh();
    if ((this.pmstenantservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmsschedulessource.getPaging().page)
    {
        this.pmsschedulessource.setPage((this.pmstenantservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(scheduleid).then(res=>
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
this.pmsschedulesselectedindex=this.pmstenantservice.pmsschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
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
unitid: {
title: 'Unit',
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
this.pmspdcssource.load(this.pmstenantservice.pmspdcs as  any as LocalDataSource);
this.pmspdcssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspdcsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmspdcs.length == 0)
{
    this.tblpmspdcssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspdc();
    this.pmstenantservice.pmspdcs.push(obj);
    this.pmspdcssource.refresh();
    if ((this.pmstenantservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1 != this.pmspdcssource.getPaging().page)
    {
        this.pmspdcssource.setPage((this.pmstenantservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(pdcid).then(res=>
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
this.pmspdcsselectedindex=this.pmstenantservice.pmspdcs.findIndex(i => i.pdcid === event.data.pdcid);
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
//start of Grid Codes pmskycdetails
pmskycdetailssettings:any;
pmskycdetailssource: any;

showpmskycdetailsCheckbox()
{
debugger;
if(this.tblpmskycdetailssource.settings['selectMode']== 'multi')this.tblpmskycdetailssource.settings['selectMode']= 'single';
else
this.tblpmskycdetailssource.settings['selectMode']= 'multi';
this.tblpmskycdetailssource.initGrid();
}
deletepmskycdetailsAll()
{
this.tblpmskycdetailssource.settings['selectMode'] = 'single';
}
showpmskycdetailsFilter()
{
  setTimeout(() => {
  this.SetpmskycdetailsTableddConfig();
  });
      if(this.tblpmskycdetailssource.settings!=null)this.tblpmskycdetailssource.settings['hideSubHeader'] =!this.tblpmskycdetailssource.settings['hideSubHeader'];
this.tblpmskycdetailssource.initGrid();
}
showpmskycdetailsInActive()
{
}
enablepmskycdetailsInActive()
{
}
async SetpmskycdetailsTableddConfig()
{
if(!this.bfilterPopulatepmskycdetails){
}
this.bfilterPopulatepmskycdetails=true;
}
async pmskycdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmskycdetailsTableConfig()
{
this.pmskycdetailssettings = {
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
kyctype: {
title: 'K Y C Type',
type: '',
filter:true,
},
kycreference: {
title: 'K Y C Reference',
type: '',
filter:true,
},
issuedate: {
title: 'Issue Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expirydate: {
title: 'Expiry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
pmskycdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmskycdetailsID)>=0)
{
this.pmskycdetailssource=new LocalDataSource();
this.pmskycdetailssource.load(this.pmstenantservice.pmskycdetails as  any as LocalDataSource);
this.pmskycdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmskycdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmskycdetails.length == 0)
{
    this.tblpmskycdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmskycdetail();
    this.pmstenantservice.pmskycdetails.push(obj);
    this.pmskycdetailssource.refresh();
    if ((this.pmstenantservice.pmskycdetails.length / this.pmskycdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmskycdetailssource.getPaging().page)
    {
        this.pmskycdetailssource.setPage((this.pmstenantservice.pmskycdetails.length / this.pmskycdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmskycdetailssource.grid.edit(this.tblpmskycdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmskycdetailssource.data.indexOf(event.data);
this.onDeletepmskycdetail(event,event.data.kycid,((this.pmskycdetailssource.getPaging().page-1) *this.pmskycdetailssource.getPaging().perPage)+index);
this.pmskycdetailssource.refresh();
break;
}
}

*/
pmskycdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmskycdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmskycdetail(event,event.data.kycid,this.formid);
break;
case 'delete':
this.onDeletepmskycdetail(event,event.data.kycid,((this.pmskycdetailssource.getPaging().page-1) *this.pmskycdetailssource.getPaging().perPage)+event.index);
this.pmskycdetailssource.refresh();
break;
}
}
pmskycdetailsonDelete(obj) {
let kycid=obj.data.kycid;
if (confirm('Are you sure to delete this record ?')) {
this.pmstenantservice.deletepmstenant(kycid).then(res=>
this.pmskycdetailsLoadTable()
);
}
}
pmskycdetailsPaging(val)
{
debugger;
this.pmskycdetailssource.setPaging(1, val, true);
}

handlepmskycdetailsGridSelected(event:any) {
this.pmskycdetailsselectedindex=this.pmstenantservice.pmskycdetails.findIndex(i => i.kycid === event.data.kycid);
}
IspmskycdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmskycdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmskycdetails
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
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
leasetype: {
title: 'Lease Type',
type: '',
filter:true,
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
filter:true,
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
this.pmsleasessource.load(this.pmstenantservice.pmsleases as  any as LocalDataSource);
this.pmsleasessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsleasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmsleases.length == 0)
{
    this.tblpmsleasessource.grid.createFormShown = true;
}
else
{
    let obj = new pmslease();
    this.pmstenantservice.pmsleases.push(obj);
    this.pmsleasessource.refresh();
    if ((this.pmstenantservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1 != this.pmsleasessource.getPaging().page)
    {
        this.pmsleasessource.setPage((this.pmstenantservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(leaseid).then(res=>
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
this.pmsleasesselectedindex=this.pmstenantservice.pmsleases.findIndex(i => i.leaseid === event.data.leaseid);
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
workorderno: {
title: 'Work Order No',
type: '',
filter:true,
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
this.pmsworkorderssource.load(this.pmstenantservice.pmsworkorders as  any as LocalDataSource);
this.pmsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmsworkorders.length == 0)
{
    this.tblpmsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorder();
    this.pmstenantservice.pmsworkorders.push(obj);
    this.pmsworkorderssource.refresh();
    if ((this.pmstenantservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderssource.getPaging().page)
    {
        this.pmsworkorderssource.setPage((this.pmstenantservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmstenantservice.deletepmstenant(workorderid).then(res=>
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
this.pmsworkordersselectedindex=this.pmstenantservice.pmsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
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
//start of Grid Codes pmspropertyunits
pmspropertyunitssettings:any;
pmspropertyunitssource: any;

showpmspropertyunitsCheckbox()
{
debugger;
if(this.tblpmspropertyunitssource.settings['selectMode']== 'multi')this.tblpmspropertyunitssource.settings['selectMode']= 'single';
else
this.tblpmspropertyunitssource.settings['selectMode']= 'multi';
this.tblpmspropertyunitssource.initGrid();
}
deletepmspropertyunitsAll()
{
this.tblpmspropertyunitssource.settings['selectMode'] = 'single';
}
showpmspropertyunitsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
  });
      if(this.tblpmspropertyunitssource.settings!=null)this.tblpmspropertyunitssource.settings['hideSubHeader'] =!this.tblpmspropertyunitssource.settings['hideSubHeader'];
this.tblpmspropertyunitssource.initGrid();
}
showpmspropertyunitsInActive()
{
}
enablepmspropertyunitsInActive()
{
}
async SetpmspropertyunitsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyunits){
}
this.bfilterPopulatepmspropertyunits=true;
}
async pmspropertyunitsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyunitsTableConfig()
{
this.pmspropertyunitssettings = {
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
unitno: {
title: 'Unit No',
type: '',
filter:true,
},
unittype: {
title: 'Unit Type',
type: '',
filter:true,
},
address1: {
title: 'Address1',
type: '',
filter:true,
},
sqft: {
title: 'Sqft',
type: 'number',
filter:true,
},
sizedetails: {
title: 'Size Details',
type: '',
filter:true,
},
rent: {
title: 'Rent',
type: 'number',
filter:true,
},
},
};
}
pmspropertyunitsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitsID)>=0)
{
this.pmspropertyunitssource=new LocalDataSource();
this.pmspropertyunitssource.load(this.pmstenantservice.pmspropertyunits as  any as LocalDataSource);
this.pmspropertyunitssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyunitsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmstenantservice.pmspropertyunits.length == 0)
{
    this.tblpmspropertyunitssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyunit();
    this.pmstenantservice.pmspropertyunits.push(obj);
    this.pmspropertyunitssource.refresh();
    if ((this.pmstenantservice.pmspropertyunits.length / this.pmspropertyunitssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyunitssource.getPaging().page)
    {
        this.pmspropertyunitssource.setPage((this.pmstenantservice.pmspropertyunits.length / this.pmspropertyunitssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyunitssource.grid.edit(this.tblpmspropertyunitssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyunitssource.data.indexOf(event.data);
this.onDeletepmspropertyunit(event,event.data.unitid,((this.pmspropertyunitssource.getPaging().page-1) *this.pmspropertyunitssource.getPaging().perPage)+index);
this.pmspropertyunitssource.refresh();
break;
}
}

*/
pmspropertyunitsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyunit(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyunit(event,event.data.unitid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyunit(event,event.data.unitid,((this.pmspropertyunitssource.getPaging().page-1) *this.pmspropertyunitssource.getPaging().perPage)+event.index);
this.pmspropertyunitssource.refresh();
break;
}
}
pmspropertyunitsonDelete(obj) {
let unitid=obj.data.unitid;
if (confirm('Are you sure to delete this record ?')) {
this.pmstenantservice.deletepmstenant(unitid).then(res=>
this.pmspropertyunitsLoadTable()
);
}
}
pmspropertyunitsPaging(val)
{
debugger;
this.pmspropertyunitssource.setPaging(1, val, true);
}

handlepmspropertyunitsGridSelected(event:any) {
this.pmspropertyunitsselectedindex=this.pmstenantservice.pmspropertyunits.findIndex(i => i.unitid === event.data.unitid);
}
IspmspropertyunitsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyunits

}



