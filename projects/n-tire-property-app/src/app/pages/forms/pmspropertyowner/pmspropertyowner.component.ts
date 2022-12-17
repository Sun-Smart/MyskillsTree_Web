import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
import { pmspropertyowner } from './../../../model/pmspropertyowner.model';
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
import { pmslease } from './../../../model/pmslease.model';
import { pmsleaseComponent } from './../../../pages/forms/pmslease/pmslease.component';
//FK services
import { pmstenant,IpmstenantResponse } from './../../../model/pmstenant.model';
import { pmstenantComponent } from './../../../pages/forms/pmstenant/pmstenant.component';
import { pmstenantService } from './../../../service/pmstenant.service';
import { pmsproperty,IpmspropertyResponse } from './../../../model/pmsproperty.model';
import { pmspropertyComponent } from './../../../pages/forms/pmsproperty/pmsproperty.component';
import { pmspropertyService } from './../../../service/pmsproperty.service';
import { pmspropertyunit,IpmspropertyunitResponse } from './../../../model/pmspropertyunit.model';
import { pmspropertyunitComponent } from './../../../pages/forms/pmspropertyunit/pmspropertyunit.component';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
import { pmsworkorder } from './../../../model/pmsworkorder.model';
import { pmsworkorderComponent } from './../../../pages/forms/pmsworkorder/pmsworkorder.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
import { pmscharge } from './../../../model/pmscharge.model';
import { pmschargeComponent } from './../../../pages/forms/pmscharge/pmscharge.component';
//FK services
import { pmsleaseService } from './../../../service/pmslease.service';
import { pmsdeposit } from './../../../model/pmsdeposit.model';
import { pmsdepositComponent } from './../../../pages/forms/pmsdeposit/pmsdeposit.component';
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
import { pmsownerkycdetail } from './../../../model/pmsownerkycdetail.model';
import { pmsownerkycdetailComponent } from './../../../pages/forms/pmsownerkycdetail/pmsownerkycdetail.component';
//FK services
import { pmspropertyunitowner } from './../../../model/pmspropertyunitowner.model';
import { pmspropertyunitownerComponent } from './../../../pages/forms/pmspropertyunitowner/pmspropertyunitowner.component';
//FK services
import { pmsunitcharges } from './../../../model/pmsunitcharges.model';
import { pmsunitchargesComponent } from './../../../pages/forms/pmsunitcharges/pmsunitcharges.component';
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
selector: 'app-pmspropertyowner',
templateUrl: './pmspropertyowner.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertyownerComponent implements OnInit {
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
bfilterPopulatepmspropertyowners:boolean=false;
datapmspropertyownerscountryid3:any=[];
datapmspropertyownersstateid3:any=[];
datapmspropertyownerscityid3:any=[];
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
datapmschargeschargecycle3:any=[];
datapmschargeschargetype3:any=[];
datapmschargesleaseid3:any=[];
datapmschargestenantid3:any=[];
datapmschargespropertyid3:any=[];
datapmschargespaidmode3:any=[];
datapmschargesunitid3:any=[];
datapmschargesownerid3:any=[];
bfilterPopulatepmscharges:boolean=false;
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
datapmsownerkycdetailskyctype3:any=[];
datapmsownerkycdetailsownerid3:any=[];
bfilterPopulatepmsownerkycdetails:boolean=false;
datapmspropertyunitownerspropertyid3:any=[];
datapmspropertyunitownersownerid3:any=[];
datapmspropertyunitownersunitid3:any=[];
bfilterPopulatepmspropertyunitowners:boolean=false;
datapmsunitchargeschargecycle3:any=[];
datapmsunitchargeschargetype3:any=[];
datapmsunitchargespropertyid3:any=[];
datapmsunitchargesunitid3:any=[];
datapmsunitchargesownerid3:any=[];
bfilterPopulatepmsunitcharges:boolean=false;
@ViewChild('tblpmsleasessource',{static:false}) tblpmsleasessource: Ng2SmartTableComponent;
@ViewChild('tblpmsworkorderssource',{static:false}) tblpmsworkorderssource: Ng2SmartTableComponent;
@ViewChild('tblpmschargessource',{static:false}) tblpmschargessource: Ng2SmartTableComponent;
@ViewChild('tblpmsdepositssource',{static:false}) tblpmsdepositssource: Ng2SmartTableComponent;
@ViewChild('tblpmspdcssource',{static:false}) tblpmspdcssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyopexdetailssource',{static:false}) tblpmspropertyopexdetailssource: Ng2SmartTableComponent;
@ViewChild('tblpmsschedulessource',{static:false}) tblpmsschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionssource',{static:false}) tblpmstransactionssource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionschedulessource',{static:false}) tblpmstransactionschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmsownerkycdetailssource',{static:false}) tblpmsownerkycdetailssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyunitownerssource',{static:false}) tblpmspropertyunitownerssource: Ng2SmartTableComponent;
@ViewChild('tblpmsunitchargessource',{static:false}) tblpmsunitchargessource: Ng2SmartTableComponent;
 pmspropertyownerForm: FormGroup;
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
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
pmspropertyownershowOption:boolean;
pmsleaseshowOption:boolean;
pmsworkordershowOption:boolean;
pmschargeshowOption:boolean;
pmsdepositshowOption:boolean;
pmspdcshowOption:boolean;
pmspropertyopexdetailshowOption:boolean;
pmsscheduleshowOption:boolean;
pmstransactionshowOption:boolean;
pmstransactionscheduleshowOption:boolean;
pmsownerkycdetailshowOption:boolean;
pmspropertyunitownershowOption:boolean;
pmsunitchargesshowOption:boolean;
sessiondata:any;
sourcekey:any;



pmsleasesvisiblelist:any;
pmsleaseshidelist:any;
pmsworkordersvisiblelist:any;
pmsworkordershidelist:any;
pmschargesvisiblelist:any;
pmschargeshidelist:any;
pmsdepositsvisiblelist:any;
pmsdepositshidelist:any;
pmspdcsvisiblelist:any;
pmspdcshidelist:any;
pmspropertyopexdetailsvisiblelist:any;
pmspropertyopexdetailshidelist:any;
pmsschedulesvisiblelist:any;
pmsscheduleshidelist:any;
pmstransactionsvisiblelist:any;
pmstransactionshidelist:any;
pmstransactionschedulesvisiblelist:any;
pmstransactionscheduleshidelist:any;
pmsownerkycdetailsvisiblelist:any;
pmsownerkycdetailshidelist:any;
pmspropertyunitownersvisiblelist:any;
pmspropertyunitownershidelist:any;
pmsunitchargesvisiblelist:any;
pmsunitchargeshidelist:any;

DeletedpmsleaseIDs: string="";
pmsleasesID: string = "1";
pmsleasesselectedindex:any;
DeletedpmsworkorderIDs: string="";
pmsworkordersID: string = "2";
pmsworkordersselectedindex:any;
DeletedpmschargeIDs: string="";
pmschargesID: string = "3";
pmschargesselectedindex:any;
DeletedpmsdepositIDs: string="";
pmsdepositsID: string = "4";
pmsdepositsselectedindex:any;
DeletedpmspdcIDs: string="";
pmspdcsID: string = "5";
pmspdcsselectedindex:any;
DeletedpmspropertyopexdetailIDs: string="";
pmspropertyopexdetailsID: string = "6";
pmspropertyopexdetailsselectedindex:any;
DeletedpmsscheduleIDs: string="";
pmsschedulesID: string = "7";
pmsschedulesselectedindex:any;
DeletedpmstransactionIDs: string="";
pmstransactionsID: string = "8";
pmstransactionsselectedindex:any;
DeletedpmstransactionscheduleIDs: string="";
pmstransactionschedulesID: string = "9";
pmstransactionschedulesselectedindex:any;
DeletedpmsownerkycdetailIDs: string="";
pmsownerkycdetailsID: string = "10";
pmsownerkycdetailsselectedindex:any;
DeletedpmspropertyunitownerIDs: string="";
pmspropertyunitownersID: string = "11";
pmspropertyunitownersselectedindex:any;
DeletedpmsunitchargesIDs: string="";
pmsunitchargesID: string = "12";
pmsunitchargesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmspropertyownerservice: pmspropertyownerService,
private pmstenantservice: pmstenantService,
private pmspropertyservice: pmspropertyService,
private pmspropertyunitservice: pmspropertyunitService,
private hrmsemployeeservice: hrmsemployeeService,
private pmsleaseservice: pmsleaseService,
private bosubcategorymasterservice: bosubcategorymasterService,
private bomasterdataservice: bomasterdataService,
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
this.pmspropertyownerForm  = this.fb.group({
pk:[null],
ownerid: [null],
firstname: [null],
lastname: [null],
iscompany: [null],
companyname: [null],
thumbnail: [null],
emailid: [null],
mobileno: [null],
housecontactno: [null],
officecontactno: [null],
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
nationalitynumber: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyownerForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertyownerForm.dirty && this.pmspropertyownerForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.ownerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.ownerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.ownerid && pkDetail) {
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
let pmspropertyownerid = null;

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
this.formid=pmspropertyownerid;
//this.sharedService.alert(pmspropertyownerid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmsleasesTableConfig();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });

this.SetpmsworkordersTableConfig();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });

this.SetpmschargesTableConfig();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });

this.SetpmsdepositsTableConfig();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });

this.SetpmspdcsTableConfig();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
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

this.SetpmsownerkycdetailsTableConfig();
  setTimeout(() => {
  this.SetpmsownerkycdetailsTableddConfig();
  });

this.SetpmspropertyunitownersTableConfig();
  setTimeout(() => {
  this.SetpmspropertyunitownersTableddConfig();
  });

this.SetpmsunitchargesTableConfig();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.pmspropertyownerservice.formData && this.pmspropertyownerservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.pmspropertyownerForm.patchValue({
    countryid: this.pmspropertyownerservice.formData.countryid,
    countryiddesc: this.pmspropertyownerservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.pmspropertyownerForm.get('countryid').value);
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
if(this.pmspropertyownerservice.formData && this.pmspropertyownerservice.formData.stateid){this.pmspropertyownerForm.patchValue({
    stateid: this.pmspropertyownerservice.formData.stateid,
    stateiddesc: this.pmspropertyownerservice.formData.stateiddesc,
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
if(this.pmspropertyownerservice.formData && this.pmspropertyownerservice.formData.cityid){this.pmspropertyownerForm.patchValue({
    cityid: this.pmspropertyownerservice.formData.cityid,
    cityiddesc: this.pmspropertyownerservice.formData.cityiddesc,
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

//autocomplete
    this.pmspropertyownerservice.getpmspropertyownersList().then(res => {
      this.pkList = res as pmspropertyowner[];
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
this.pmspropertyownerForm.markAsUntouched();
this.pmspropertyownerForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.pmspropertyownerForm.patchValue({
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
this.pmspropertyownerForm.patchValue({
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
this.pmspropertyownerForm.patchValue({
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
if (this.pmspropertyownerForm != null)
this.pmspropertyownerForm.reset();
this.pmspropertyownerForm.patchValue({
});
setTimeout(() => {
this.pmspropertyownerservice.pmsleases=[];
this.pmsleasesLoadTable();
this.pmspropertyownerservice.pmsworkorders=[];
this.pmsworkordersLoadTable();
this.pmspropertyownerservice.pmscharges=[];
this.pmschargesLoadTable();
this.pmspropertyownerservice.pmsdeposits=[];
this.pmsdepositsLoadTable();
this.pmspropertyownerservice.pmspdcs=[];
this.pmspdcsLoadTable();
this.pmspropertyownerservice.pmspropertyopexdetails=[];
this.pmspropertyopexdetailsLoadTable();
this.pmspropertyownerservice.pmsschedules=[];
this.pmsschedulesLoadTable();
this.pmspropertyownerservice.pmstransactions=[];
this.pmstransactionsLoadTable();
this.pmspropertyownerservice.pmstransactionschedules=[];
this.pmstransactionschedulesLoadTable();
this.pmspropertyownerservice.pmsownerkycdetails=[];
this.pmsownerkycdetailsLoadTable();
this.pmspropertyownerservice.pmspropertyunitowners=[];
this.pmspropertyunitownersLoadTable();
this.pmspropertyownerservice.pmsunitcharges=[];
this.pmsunitchargesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let ownerid = this.pmspropertyownerForm.get('ownerid').value;
        if(ownerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertyownerservice.deletepmspropertyowner(ownerid).then(res =>
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
    this.pmspropertyownerForm.patchValue({
        ownerid: null
    });
    if(this.pmspropertyownerservice.formData.ownerid!=null)this.pmspropertyownerservice.formData.ownerid=null;
for (let i=0;i<this.pmspropertyownerservice.pmsleases.length;i++) {
this.pmspropertyownerservice.pmsleases[i].leaseid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmsworkorders.length;i++) {
this.pmspropertyownerservice.pmsworkorders[i].workorderid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmscharges.length;i++) {
this.pmspropertyownerservice.pmscharges[i].chargeid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmsdeposits.length;i++) {
this.pmspropertyownerservice.pmsdeposits[i].depositid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmspdcs.length;i++) {
this.pmspropertyownerservice.pmspdcs[i].pdcid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmspropertyopexdetails.length;i++) {
this.pmspropertyownerservice.pmspropertyopexdetails[i].opexid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmsschedules.length;i++) {
this.pmspropertyownerservice.pmsschedules[i].scheduleid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmstransactions.length;i++) {
this.pmspropertyownerservice.pmstransactions[i].transactionid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmstransactionschedules.length;i++) {
this.pmspropertyownerservice.pmstransactionschedules[i].transactionscheduleid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmsownerkycdetails.length;i++) {
this.pmspropertyownerservice.pmsownerkycdetails[i].kycid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmspropertyunitowners.length;i++) {
this.pmspropertyownerservice.pmspropertyunitowners[i].propertyownerid=null;
}
for (let i=0;i<this.pmspropertyownerservice.pmsunitcharges.length;i++) {
this.pmspropertyownerservice.pmsunitcharges[i].chargeid=null;
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
        else if(ctrltype=="string")
{
this.pmspropertyownerForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyownerForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyownerForm.controls[key]!=undefined)
{
this.pmspropertyownerForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.pmspropertyownerservice.formData.lastname!=null )
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
owneridonChange(evt:any){
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
nationalitynumberonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmspropertyowners() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertyownerservice.getpmspropertyownersByEID(pkcol).then(res => {

this.pmspropertyownerservice.formData=res.pmspropertyowner;
let formproperty=res.pmspropertyowner.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmspropertyowner.pkcol;
this.formid=res.pmspropertyowner.ownerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmspropertyowner.ownerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertyownerForm.patchValue({
ownerid: res.pmspropertyowner.ownerid,
firstname: res.pmspropertyowner.firstname,
lastname: res.pmspropertyowner.lastname,
iscompany: res.pmspropertyowner.iscompany,
companyname: res.pmspropertyowner.companyname,
thumbnail: JSON.parse(res.pmspropertyowner.thumbnail),
emailid: res.pmspropertyowner.emailid,
mobileno: res.pmspropertyowner.mobileno,
housecontactno: res.pmspropertyowner.housecontactno,
officecontactno: res.pmspropertyowner.officecontactno,
address1: res.pmspropertyowner.address1,
address2: res.pmspropertyowner.address2,
countryid: res.pmspropertyowner.countryid,
countryiddesc: res.pmspropertyowner.countryiddesc,
stateid: res.pmspropertyowner.stateid,
stateiddesc: res.pmspropertyowner.stateiddesc,
cityid: res.pmspropertyowner.cityid,
cityiddesc: res.pmspropertyowner.cityiddesc,
bankname: res.pmspropertyowner.bankname,
bankaccount: res.pmspropertyowner.bankaccount,
iban: res.pmspropertyowner.iban,
nationalitynumber: res.pmspropertyowner.nationalitynumber,
status: res.pmspropertyowner.status,
statusdesc: res.pmspropertyowner.statusdesc,
});
this.pmsleasesvisiblelist=res.pmsleasesvisiblelist;
this.pmsworkordersvisiblelist=res.pmsworkordersvisiblelist;
this.pmschargesvisiblelist=res.pmschargesvisiblelist;
this.pmsdepositsvisiblelist=res.pmsdepositsvisiblelist;
this.pmspdcsvisiblelist=res.pmspdcsvisiblelist;
this.pmspropertyopexdetailsvisiblelist=res.pmspropertyopexdetailsvisiblelist;
this.pmsschedulesvisiblelist=res.pmsschedulesvisiblelist;
this.pmstransactionsvisiblelist=res.pmstransactionsvisiblelist;
this.pmstransactionschedulesvisiblelist=res.pmstransactionschedulesvisiblelist;
this.pmsownerkycdetailsvisiblelist=res.pmsownerkycdetailsvisiblelist;
this.pmspropertyunitownersvisiblelist=res.pmspropertyunitownersvisiblelist;
this.pmsunitchargesvisiblelist=res.pmsunitchargesvisiblelist;
if(this.pmspropertyownerForm.get('thumbnail').value!=null && this.pmspropertyownerForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.pmspropertyownerForm.get('thumbnail').value);
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
this.pmspropertyownerservice.pmsleases = res.pmsleases;
this.SetpmsleasesTableConfig();
this.pmsleasesLoadTable();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
this.pmspropertyownerservice.pmsworkorders = res.pmsworkorders;
this.SetpmsworkordersTableConfig();
this.pmsworkordersLoadTable();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });
this.pmspropertyownerservice.pmscharges = res.pmscharges;
this.SetpmschargesTableConfig();
this.pmschargesLoadTable();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
this.pmspropertyownerservice.pmsdeposits = res.pmsdeposits;
this.SetpmsdepositsTableConfig();
this.pmsdepositsLoadTable();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
this.pmspropertyownerservice.pmspdcs = res.pmspdcs;
this.SetpmspdcsTableConfig();
this.pmspdcsLoadTable();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
this.pmspropertyownerservice.pmspropertyopexdetails = res.pmspropertyopexdetails;
this.SetpmspropertyopexdetailsTableConfig();
this.pmspropertyopexdetailsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });
this.pmspropertyownerservice.pmsschedules = res.pmsschedules;
this.SetpmsschedulesTableConfig();
this.pmsschedulesLoadTable();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
this.pmspropertyownerservice.pmstransactions = res.pmstransactions;
this.SetpmstransactionsTableConfig();
this.pmstransactionsLoadTable();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
this.pmspropertyownerservice.pmstransactionschedules = res.pmstransactionschedules;
this.SetpmstransactionschedulesTableConfig();
this.pmstransactionschedulesLoadTable();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
this.pmspropertyownerservice.pmsownerkycdetails = res.pmsownerkycdetails;
this.SetpmsownerkycdetailsTableConfig();
this.pmsownerkycdetailsLoadTable();
  setTimeout(() => {
  this.SetpmsownerkycdetailsTableddConfig();
  });
this.pmspropertyownerservice.pmspropertyunitowners = res.pmspropertyunitowners;
this.SetpmspropertyunitownersTableConfig();
this.pmspropertyunitownersLoadTable();
  setTimeout(() => {
  this.SetpmspropertyunitownersTableddConfig();
  });
this.pmspropertyownerservice.pmsunitcharges = res.pmsunitcharges;
this.SetpmsunitchargesTableConfig();
this.pmsunitchargesLoadTable();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
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
  for (let key in this.pmspropertyownerForm.controls) {
    if (this.pmspropertyownerForm.controls[key] != null) {
if( key=="thumbnail")
{
if(this.pmspropertyownerservice.formData!=null && this.pmspropertyownerservice.formData[key]!=null  && this.pmspropertyownerservice.formData[key]!='[]' && this.pmspropertyownerservice.formData[key]!=undefined && this.pmspropertyownerservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyownerservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmspropertyownerservice.formData!=null && this.pmspropertyownerservice.formData[key]!=null   && this.pmspropertyownerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertyownerservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertyownerservice.formData!=null && this.pmspropertyownerservice.formData[key]!=null   && this.pmspropertyownerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertyownerservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertyownerservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyownerForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertyownerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertyownerForm.value;
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

private pmspropertyownertoggleOption(){
this.pmspropertyownershowOption = this.pmspropertyownershowOption === true ? false : true;
}

private pmsleasetoggleOption(){
this.pmsleaseshowOption = this.pmsleaseshowOption === true ? false : true;
}

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}

private pmspdctoggleOption(){
this.pmspdcshowOption = this.pmspdcshowOption === true ? false : true;
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

private pmsownerkycdetailtoggleOption(){
this.pmsownerkycdetailshowOption = this.pmsownerkycdetailshowOption === true ? false : true;
}

private pmspropertyunitownertoggleOption(){
this.pmspropertyunitownershowOption = this.pmspropertyunitownershowOption === true ? false : true;
}

private pmsunitchargestoggleOption(){
this.pmsunitchargesshowOption = this.pmsunitchargesshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyownerForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyownerForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyownerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertyownerservice.formData=this.pmspropertyownerForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyownerForm.controls[key] != null)
    {
        this.pmspropertyownerservice.formData[key] = this.pmspropertyownerForm.controls[key].value;
    }
}
}
}
this.pmspropertyownerservice.formData.thumbnail=this.pmspropertyownerForm.get('thumbnail').value;
this.pmspropertyownerservice.formData.DeletedpmsleaseIDs = this.DeletedpmsleaseIDs;
this.pmspropertyownerservice.formData.DeletedpmsworkorderIDs = this.DeletedpmsworkorderIDs;
this.pmspropertyownerservice.formData.DeletedpmschargeIDs = this.DeletedpmschargeIDs;
this.pmspropertyownerservice.formData.DeletedpmsdepositIDs = this.DeletedpmsdepositIDs;
this.pmspropertyownerservice.formData.DeletedpmspdcIDs = this.DeletedpmspdcIDs;
this.pmspropertyownerservice.formData.DeletedpmspropertyopexdetailIDs = this.DeletedpmspropertyopexdetailIDs;
this.pmspropertyownerservice.formData.DeletedpmsscheduleIDs = this.DeletedpmsscheduleIDs;
this.pmspropertyownerservice.formData.DeletedpmstransactionIDs = this.DeletedpmstransactionIDs;
this.pmspropertyownerservice.formData.DeletedpmstransactionscheduleIDs = this.DeletedpmstransactionscheduleIDs;
this.pmspropertyownerservice.formData.DeletedpmsownerkycdetailIDs = this.DeletedpmsownerkycdetailIDs;
this.pmspropertyownerservice.formData.DeletedpmspropertyunitownerIDs = this.DeletedpmspropertyunitownerIDs;
this.pmspropertyownerservice.formData.DeletedpmsunitchargesIDs = this.DeletedpmsunitchargesIDs;
if(this.thumbnail.getattachmentlist()!=null)this.pmspropertyownerservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
console.log(this.pmspropertyownerservice.formData);
this.pmspropertyownerservice.formData=this.pmspropertyownerForm.value;
this.pmspropertyownerservice.saveOrUpdatepmspropertyowners().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
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
if (this.pmschargessource.data)
{
    for (let i = 0; i < this.pmschargessource.data.length; i++)
    {
        if (this.pmschargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmschargessource.data[i].fileattachmentlist);
    }
}
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
if (this.pmsownerkycdetailssource.data)
{
    for (let i = 0; i < this.pmsownerkycdetailssource.data.length; i++)
    {
        if (this.pmsownerkycdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsownerkycdetailssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyunitownerssource.data)
{
    for (let i = 0; i < this.pmspropertyunitownerssource.data.length; i++)
    {
        if (this.pmspropertyunitownerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyunitownerssource.data[i].fileattachmentlist);
    }
}
if (this.pmsunitchargessource.data)
{
    for (let i = 0; i < this.pmsunitchargessource.data.length; i++)
    {
        if (this.pmsunitchargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsunitchargessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyowner);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertyownerservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyowner);
}
else
{
this.FillData(res);
}
}
this.pmspropertyownerForm.markAsUntouched();
this.pmspropertyownerForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.pmspropertyownerForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.pmspropertyownerForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.pmspropertyownerForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmslease(event:any,leaseid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsleaseComponent, 
{
data:  {  showview:false,save:false,event,leaseid, ownerid,visiblelist:this.pmsleasesvisiblelist,  hidelist:this.pmsleaseshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmsleases.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsworkorder(event:any,workorderid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, ownerid,visiblelist:this.pmsworkordersvisiblelist,  hidelist:this.pmsworkordershidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmsworkorders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmscharge(event:any,chargeid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmschargeComponent, 
{
data:  {  showview:false,save:false,event,chargeid, ownerid,visiblelist:this.pmschargesvisiblelist,  hidelist:this.pmschargeshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmscharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsdeposit(event:any,depositid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsdepositComponent, 
{
data:  {  showview:false,save:false,event,depositid, ownerid,visiblelist:this.pmsdepositsvisiblelist,  hidelist:this.pmsdepositshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmsdeposits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspdc(event:any,pdcid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspdcComponent, 
{
data:  {  showview:false,save:false,event,pdcid, ownerid,visiblelist:this.pmspdcsvisiblelist,  hidelist:this.pmspdcshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmspdcs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyopexdetail(event:any,opexid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyopexdetailComponent, 
{
data:  {  showview:false,save:false,event,opexid, ownerid,visiblelist:this.pmspropertyopexdetailsvisiblelist,  hidelist:this.pmspropertyopexdetailshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmspropertyopexdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsschedule(event:any,scheduleid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, ownerid,visiblelist:this.pmsschedulesvisiblelist,  hidelist:this.pmsscheduleshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmsschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransaction(event:any,transactionid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionComponent, 
{
data:  {  showview:false,save:false,event,transactionid, ownerid,visiblelist:this.pmstransactionsvisiblelist,  hidelist:this.pmstransactionshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmstransactions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransactionschedule(event:any,transactionscheduleid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionscheduleComponent, 
{
data:  {  showview:false,save:false,event,transactionscheduleid, ownerid,visiblelist:this.pmstransactionschedulesvisiblelist,  hidelist:this.pmstransactionscheduleshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmstransactionschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsownerkycdetail(event:any,kycid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsownerkycdetailComponent, 
{
data:  {  showview:false,save:false,event,kycid, ownerid,visiblelist:this.pmsownerkycdetailsvisiblelist,  hidelist:this.pmsownerkycdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsownerkycdetailssource.add(res);
this.pmsownerkycdetailssource.refresh();
}
else
{
this.pmsownerkycdetailssource.update(event.data, res);
}
}
});
}

onDeletepmsownerkycdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsownerkycdetailIDs += childID + ",";
this.pmspropertyownerservice.pmsownerkycdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyunitowner(event:any,propertyownerid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyunitownerComponent, 
{
data:  {  showview:false,save:false,event,propertyownerid, ownerid,visiblelist:this.pmspropertyunitownersvisiblelist,  hidelist:this.pmspropertyunitownershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyunitownerssource.add(res);
this.pmspropertyunitownerssource.refresh();
}
else
{
this.pmspropertyunitownerssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyunitowner(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyunitownerIDs += childID + ",";
this.pmspropertyownerservice.pmspropertyunitowners.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsunitcharges(event:any,chargeid:any, ownerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsunitchargesComponent, 
{
data:  {  showview:false,save:false,event,chargeid, ownerid,visiblelist:this.pmsunitchargesvisiblelist,  hidelist:this.pmsunitchargeshidelist,ScreenType:2  },
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
this.pmspropertyownerservice.pmsunitcharges.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
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
nextduedate: {
title: 'Next Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
pmsleasesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsleasesID)>=0)
{
this.pmsleasessource=new LocalDataSource();
this.pmsleasessource.load(this.pmspropertyownerservice.pmsleases as  any as LocalDataSource);
this.pmsleasessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsleasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsleases.length == 0)
{
    this.tblpmsleasessource.grid.createFormShown = true;
}
else
{
    let obj = new pmslease();
    this.pmspropertyownerservice.pmsleases.push(obj);
    this.pmsleasessource.refresh();
    if ((this.pmspropertyownerservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1 != this.pmsleasessource.getPaging().page)
    {
        this.pmsleasessource.setPage((this.pmspropertyownerservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(leaseid).then(res=>
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
this.pmsleasesselectedindex=this.pmspropertyownerservice.pmsleases.findIndex(i => i.leaseid === event.data.leaseid);
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
tenantid: {
title: 'Tenant',
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
},
};
}
pmsworkordersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkordersID)>=0)
{
this.pmsworkorderssource=new LocalDataSource();
this.pmsworkorderssource.load(this.pmspropertyownerservice.pmsworkorders as  any as LocalDataSource);
this.pmsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsworkorders.length == 0)
{
    this.tblpmsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorder();
    this.pmspropertyownerservice.pmsworkorders.push(obj);
    this.pmsworkorderssource.refresh();
    if ((this.pmspropertyownerservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderssource.getPaging().page)
    {
        this.pmsworkorderssource.setPage((this.pmspropertyownerservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(workorderid).then(res=>
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
this.pmsworkordersselectedindex=this.pmspropertyownerservice.pmsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
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
tenantid: {
title: 'Tenant',
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
this.pmschargessource.load(this.pmspropertyownerservice.pmscharges as  any as LocalDataSource);
this.pmschargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmschargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmscharges.length == 0)
{
    this.tblpmschargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmscharge();
    this.pmspropertyownerservice.pmscharges.push(obj);
    this.pmschargessource.refresh();
    if ((this.pmspropertyownerservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1 != this.pmschargessource.getPaging().page)
    {
        this.pmschargessource.setPage((this.pmspropertyownerservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(chargeid).then(res=>
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
this.pmschargesselectedindex=this.pmspropertyownerservice.pmscharges.findIndex(i => i.chargeid === event.data.chargeid);
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
tenantid: {
title: 'Tenant',
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
this.pmsdepositssource.load(this.pmspropertyownerservice.pmsdeposits as  any as LocalDataSource);
this.pmsdepositssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsdepositsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsdeposits.length == 0)
{
    this.tblpmsdepositssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsdeposit();
    this.pmspropertyownerservice.pmsdeposits.push(obj);
    this.pmsdepositssource.refresh();
    if ((this.pmspropertyownerservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1 != this.pmsdepositssource.getPaging().page)
    {
        this.pmsdepositssource.setPage((this.pmspropertyownerservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(depositid).then(res=>
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
this.pmsdepositsselectedindex=this.pmspropertyownerservice.pmsdeposits.findIndex(i => i.depositid === event.data.depositid);
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
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
this.pmspdcssource.load(this.pmspropertyownerservice.pmspdcs as  any as LocalDataSource);
this.pmspdcssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspdcsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmspdcs.length == 0)
{
    this.tblpmspdcssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspdc();
    this.pmspropertyownerservice.pmspdcs.push(obj);
    this.pmspdcssource.refresh();
    if ((this.pmspropertyownerservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1 != this.pmspdcssource.getPaging().page)
    {
        this.pmspdcssource.setPage((this.pmspropertyownerservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(pdcid).then(res=>
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
this.pmspdcsselectedindex=this.pmspropertyownerservice.pmspdcs.findIndex(i => i.pdcid === event.data.pdcid);
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
unitid: {
title: 'Unit',
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
this.pmspropertyopexdetailssource.load(this.pmspropertyownerservice.pmspropertyopexdetails as  any as LocalDataSource);
this.pmspropertyopexdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyopexdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmspropertyopexdetails.length == 0)
{
    this.tblpmspropertyopexdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyopexdetail();
    this.pmspropertyownerservice.pmspropertyopexdetails.push(obj);
    this.pmspropertyopexdetailssource.refresh();
    if ((this.pmspropertyownerservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyopexdetailssource.getPaging().page)
    {
        this.pmspropertyopexdetailssource.setPage((this.pmspropertyownerservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(opexid).then(res=>
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
this.pmspropertyopexdetailsselectedindex=this.pmspropertyownerservice.pmspropertyopexdetails.findIndex(i => i.opexid === event.data.opexid);
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

this.pmspropertyservice.getpmspropertiesList().then(res=>
{
var datapropertyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsschedulespropertyid3.push(defaultobj);
for(let i=0; i<datapropertyid2.length; i++){
var obj= { value: datapropertyid2[i].propertyid, title:datapropertyid2[i].title};
this.datapmsschedulespropertyid3.push(obj);
}
if((this.tblpmsschedulessource.settings as any).columns['propertyid'])
{
(this.tblpmsschedulessource.settings as any).columns['propertyid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsschedulespropertyid3));
this.tblpmsschedulessource.initGrid();
}
});

this.pmstenantservice.getpmstenantsList().then(res=>
{
var datatenantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsschedulestenantid3.push(defaultobj);
for(let i=0; i<datatenantid2.length; i++){
var obj= { value: datatenantid2[i].tenantid, title:datatenantid2[i].lastname};
this.datapmsschedulestenantid3.push(obj);
}
if((this.tblpmsschedulessource.settings as any).columns['tenantid'])
{
(this.tblpmsschedulessource.settings as any).columns['tenantid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsschedulestenantid3));
this.tblpmsschedulessource.initGrid();
}
});

this.configservice.getList("workordertype").then(res=>
{
var dataworkordertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsschedulesworkordertype3.push(defaultobj);
for(let i=0; i<dataworkordertype2.length; i++){
var obj= { value: dataworkordertype2[i].configkey, title: dataworkordertype2[i].configtext};
this.datapmsschedulesworkordertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsschedulessource.settings);
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulesworkordertype3)), }, };
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulesworkordertype3)), }, };
this.tblpmsschedulessource.settings =  clone;
this.tblpmsschedulessource.initGrid();
});

this.configservice.getList("workorderfrequency").then(res=>
{
var dataworkorderfrequency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsschedulesworkorderfrequency3.push(defaultobj);
for(let i=0; i<dataworkorderfrequency2.length; i++){
var obj= { value: dataworkorderfrequency2[i].configkey, title: dataworkorderfrequency2[i].configtext};
this.datapmsschedulesworkorderfrequency3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsschedulessource.settings);
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulesworkorderfrequency3)), }, };
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulesworkorderfrequency3)), }, };
this.tblpmsschedulessource.settings =  clone;
this.tblpmsschedulessource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsschedulespriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.datapmsschedulespriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsschedulessource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulespriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsschedulespriority3)), }, };
this.tblpmsschedulessource.settings =  clone;
this.tblpmsschedulessource.initGrid();
});
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'dio86',reportcode:'dio86',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsschedulespropertyid3.find(c=>c.value==cell);
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
var element= this.datapmsschedulestenantid3.find(c=>c.value==cell);
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
var element= this.datapmsschedulesworkordertype3.find(c=>c.value==cell);
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
var element= this.datapmsschedulesworkorderfrequency3.find(c=>c.value==cell);
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsschedulespriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
pmsschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsschedulesID)>=0)
{
this.pmsschedulessource=new LocalDataSource();
this.pmsschedulessource.load(this.pmspropertyownerservice.pmsschedules as  any as LocalDataSource);
this.pmsschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsschedules.length == 0)
{
    this.tblpmsschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsschedule();
    this.pmspropertyownerservice.pmsschedules.push(obj);
    this.pmsschedulessource.refresh();
    if ((this.pmspropertyownerservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmsschedulessource.getPaging().page)
    {
        this.pmsschedulessource.setPage((this.pmspropertyownerservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(scheduleid).then(res=>
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
this.pmsschedulesselectedindex=this.pmspropertyownerservice.pmsschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
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
unitid: {
title: 'Unit',
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
this.pmstransactionssource.load(this.pmspropertyownerservice.pmstransactions as  any as LocalDataSource);
this.pmstransactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmstransactions.length == 0)
{
    this.tblpmstransactionssource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransaction();
    this.pmspropertyownerservice.pmstransactions.push(obj);
    this.pmstransactionssource.refresh();
    if ((this.pmspropertyownerservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionssource.getPaging().page)
    {
        this.pmstransactionssource.setPage((this.pmspropertyownerservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(transactionid).then(res=>
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
this.pmstransactionsselectedindex=this.pmspropertyownerservice.pmstransactions.findIndex(i => i.transactionid === event.data.transactionid);
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
unitid: {
title: 'Unit',
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
this.pmstransactionschedulessource.load(this.pmspropertyownerservice.pmstransactionschedules as  any as LocalDataSource);
this.pmstransactionschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmstransactionschedules.length == 0)
{
    this.tblpmstransactionschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransactionschedule();
    this.pmspropertyownerservice.pmstransactionschedules.push(obj);
    this.pmstransactionschedulessource.refresh();
    if ((this.pmspropertyownerservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionschedulessource.getPaging().page)
    {
        this.pmstransactionschedulessource.setPage((this.pmspropertyownerservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(transactionscheduleid).then(res=>
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
this.pmstransactionschedulesselectedindex=this.pmspropertyownerservice.pmstransactionschedules.findIndex(i => i.transactionscheduleid === event.data.transactionscheduleid);
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
//start of Grid Codes pmsownerkycdetails
pmsownerkycdetailssettings:any;
pmsownerkycdetailssource: any;

showpmsownerkycdetailsCheckbox()
{
debugger;
if(this.tblpmsownerkycdetailssource.settings['selectMode']== 'multi')this.tblpmsownerkycdetailssource.settings['selectMode']= 'single';
else
this.tblpmsownerkycdetailssource.settings['selectMode']= 'multi';
this.tblpmsownerkycdetailssource.initGrid();
}
deletepmsownerkycdetailsAll()
{
this.tblpmsownerkycdetailssource.settings['selectMode'] = 'single';
}
showpmsownerkycdetailsFilter()
{
  setTimeout(() => {
  this.SetpmsownerkycdetailsTableddConfig();
  });
      if(this.tblpmsownerkycdetailssource.settings!=null)this.tblpmsownerkycdetailssource.settings['hideSubHeader'] =!this.tblpmsownerkycdetailssource.settings['hideSubHeader'];
this.tblpmsownerkycdetailssource.initGrid();
}
showpmsownerkycdetailsInActive()
{
}
enablepmsownerkycdetailsInActive()
{
}
async SetpmsownerkycdetailsTableddConfig()
{
if(!this.bfilterPopulatepmsownerkycdetails){
}
this.bfilterPopulatepmsownerkycdetails=true;
}
async pmsownerkycdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsownerkycdetailsTableConfig()
{
this.pmsownerkycdetailssettings = {
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
pmsownerkycdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsownerkycdetailsID)>=0)
{
this.pmsownerkycdetailssource=new LocalDataSource();
this.pmsownerkycdetailssource.load(this.pmspropertyownerservice.pmsownerkycdetails as  any as LocalDataSource);
this.pmsownerkycdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsownerkycdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsownerkycdetails.length == 0)
{
    this.tblpmsownerkycdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsownerkycdetail();
    this.pmspropertyownerservice.pmsownerkycdetails.push(obj);
    this.pmsownerkycdetailssource.refresh();
    if ((this.pmspropertyownerservice.pmsownerkycdetails.length / this.pmsownerkycdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmsownerkycdetailssource.getPaging().page)
    {
        this.pmsownerkycdetailssource.setPage((this.pmspropertyownerservice.pmsownerkycdetails.length / this.pmsownerkycdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsownerkycdetailssource.grid.edit(this.tblpmsownerkycdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsownerkycdetailssource.data.indexOf(event.data);
this.onDeletepmsownerkycdetail(event,event.data.kycid,((this.pmsownerkycdetailssource.getPaging().page-1) *this.pmsownerkycdetailssource.getPaging().perPage)+index);
this.pmsownerkycdetailssource.refresh();
break;
}
}

*/
pmsownerkycdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsownerkycdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsownerkycdetail(event,event.data.kycid,this.formid);
break;
case 'delete':
this.onDeletepmsownerkycdetail(event,event.data.kycid,((this.pmsownerkycdetailssource.getPaging().page-1) *this.pmsownerkycdetailssource.getPaging().perPage)+event.index);
this.pmsownerkycdetailssource.refresh();
break;
}
}
pmsownerkycdetailsonDelete(obj) {
let kycid=obj.data.kycid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyownerservice.deletepmspropertyowner(kycid).then(res=>
this.pmsownerkycdetailsLoadTable()
);
}
}
pmsownerkycdetailsPaging(val)
{
debugger;
this.pmsownerkycdetailssource.setPaging(1, val, true);
}

handlepmsownerkycdetailsGridSelected(event:any) {
this.pmsownerkycdetailsselectedindex=this.pmspropertyownerservice.pmsownerkycdetails.findIndex(i => i.kycid === event.data.kycid);
}
IspmsownerkycdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsownerkycdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsownerkycdetails
//start of Grid Codes pmspropertyunitowners
pmspropertyunitownerssettings:any;
pmspropertyunitownerssource: any;

showpmspropertyunitownersCheckbox()
{
debugger;
if(this.tblpmspropertyunitownerssource.settings['selectMode']== 'multi')this.tblpmspropertyunitownerssource.settings['selectMode']= 'single';
else
this.tblpmspropertyunitownerssource.settings['selectMode']= 'multi';
this.tblpmspropertyunitownerssource.initGrid();
}
deletepmspropertyunitownersAll()
{
this.tblpmspropertyunitownerssource.settings['selectMode'] = 'single';
}
showpmspropertyunitownersFilter()
{
  setTimeout(() => {
  this.SetpmspropertyunitownersTableddConfig();
  });
      if(this.tblpmspropertyunitownerssource.settings!=null)this.tblpmspropertyunitownerssource.settings['hideSubHeader'] =!this.tblpmspropertyunitownerssource.settings['hideSubHeader'];
this.tblpmspropertyunitownerssource.initGrid();
}
showpmspropertyunitownersInActive()
{
}
enablepmspropertyunitownersInActive()
{
}
async SetpmspropertyunitownersTableddConfig()
{
if(!this.bfilterPopulatepmspropertyunitowners){
}
this.bfilterPopulatepmspropertyunitowners=true;
}
async pmspropertyunitownersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyunitownersTableConfig()
{
this.pmspropertyunitownerssettings = {
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
ownership: {
title: 'Ownership',
type: 'number',
filter:true,
},
},
};
}
pmspropertyunitownersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitownersID)>=0)
{
this.pmspropertyunitownerssource=new LocalDataSource();
this.pmspropertyunitownerssource.load(this.pmspropertyownerservice.pmspropertyunitowners as  any as LocalDataSource);
this.pmspropertyunitownerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyunitownersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmspropertyunitowners.length == 0)
{
    this.tblpmspropertyunitownerssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyunitowner();
    this.pmspropertyownerservice.pmspropertyunitowners.push(obj);
    this.pmspropertyunitownerssource.refresh();
    if ((this.pmspropertyownerservice.pmspropertyunitowners.length / this.pmspropertyunitownerssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyunitownerssource.getPaging().page)
    {
        this.pmspropertyunitownerssource.setPage((this.pmspropertyownerservice.pmspropertyunitowners.length / this.pmspropertyunitownerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyunitownerssource.grid.edit(this.tblpmspropertyunitownerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyunitownerssource.data.indexOf(event.data);
this.onDeletepmspropertyunitowner(event,event.data.propertyownerid,((this.pmspropertyunitownerssource.getPaging().page-1) *this.pmspropertyunitownerssource.getPaging().perPage)+index);
this.pmspropertyunitownerssource.refresh();
break;
}
}

*/
pmspropertyunitownersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyunitowner(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyunitowner(event,event.data.propertyownerid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyunitowner(event,event.data.propertyownerid,((this.pmspropertyunitownerssource.getPaging().page-1) *this.pmspropertyunitownerssource.getPaging().perPage)+event.index);
this.pmspropertyunitownerssource.refresh();
break;
}
}
pmspropertyunitownersonDelete(obj) {
let propertyownerid=obj.data.propertyownerid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyownerservice.deletepmspropertyowner(propertyownerid).then(res=>
this.pmspropertyunitownersLoadTable()
);
}
}
pmspropertyunitownersPaging(val)
{
debugger;
this.pmspropertyunitownerssource.setPaging(1, val, true);
}

handlepmspropertyunitownersGridSelected(event:any) {
this.pmspropertyunitownersselectedindex=this.pmspropertyownerservice.pmspropertyunitowners.findIndex(i => i.propertyownerid === event.data.propertyownerid);
}
IspmspropertyunitownersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitownersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyunitowners
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
unitid: {
title: 'Unit',
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
this.pmsunitchargessource.load(this.pmspropertyownerservice.pmsunitcharges as  any as LocalDataSource);
this.pmsunitchargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsunitchargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyownerservice.pmsunitcharges.length == 0)
{
    this.tblpmsunitchargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsunitcharges();
    this.pmspropertyownerservice.pmsunitcharges.push(obj);
    this.pmsunitchargessource.refresh();
    if ((this.pmspropertyownerservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1 != this.pmsunitchargessource.getPaging().page)
    {
        this.pmsunitchargessource.setPage((this.pmspropertyownerservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmspropertyownerservice.deletepmspropertyowner(chargeid).then(res=>
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
this.pmsunitchargesselectedindex=this.pmspropertyownerservice.pmsunitcharges.findIndex(i => i.chargeid === event.data.chargeid);
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

}



