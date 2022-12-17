import { pmsleaseService } from './../../../service/pmslease.service';
import { pmslease } from './../../../model/pmslease.model';
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
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
//popups
import { pmstenant} from './../../../model/pmstenant.model';
import { pmstenantService } from './../../../service/pmstenant.service';
//popups
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
//popups
//detail table services
import { pmstransaction } from './../../../model/pmstransaction.model';
import { pmstransactionComponent } from './../../../pages/forms/pmstransaction/pmstransaction.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { pmstransactionschedule } from './../../../model/pmstransactionschedule.model';
import { pmstransactionscheduleComponent } from './../../../pages/forms/pmstransactionschedule/pmstransactionschedule.component';
//FK services
import { pmscharge } from './../../../model/pmscharge.model';
import { pmschargeComponent } from './../../../pages/forms/pmscharge/pmscharge.component';
//FK services
import { pmsdeposit } from './../../../model/pmsdeposit.model';
import { pmsdepositComponent } from './../../../pages/forms/pmsdeposit/pmsdeposit.component';
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

@Component({
selector: 'app-pmslease',
templateUrl: './pmslease.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmsleaseComponent implements OnInit {
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
bfilterPopulatepmsleases:boolean=false;
datapmsleasespropertyid3:any=[];
datapmsleasesunitid3:any=[];
datapmsleasestenantid3:any=[];
datapmsleasesownerid3:any=[];
datapmsleasesleasetype3:any=[];
datapmsleasesrentcycle3:any=[];
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
datapmsworkordersresponsibleid3:any=[];
datapmsworkorderspropertyid3:any=[];
datapmsworkorderstenantid3:any=[];
datapmsworkordersvisittype3:any=[];
datapmsworkorderspriority3:any=[];
datapmsworkordersworkordertype3:any=[];
datapmsworkordersworkorderfrequency3:any=[];
datapmsworkordersownerid3:any=[];
bfilterPopulatepmsworkorders:boolean=false;
@ViewChild('tblpmstransactionssource',{static:false}) tblpmstransactionssource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionschedulessource',{static:false}) tblpmstransactionschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmschargessource',{static:false}) tblpmschargessource: Ng2SmartTableComponent;
@ViewChild('tblpmsdepositssource',{static:false}) tblpmsdepositssource: Ng2SmartTableComponent;
@ViewChild('tblpmsworkorderssource',{static:false}) tblpmsworkorderssource: Ng2SmartTableComponent;
 pmsleaseForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenantid_pmstenantsForm: FormGroup;//autocomplete
tenantid_pmstenantsoptions:any;//autocomplete
tenantid_pmstenantsformatter:any;//autocomplete
owneridList: pmspropertyowner[];
leasetypeList: boconfigvalue[];
rentcycleList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
pmsleaseshowOption:boolean;
pmstransactionshowOption:boolean;
pmstransactionscheduleshowOption:boolean;
pmschargeshowOption:boolean;
pmsdepositshowOption:boolean;
pmsworkordershowOption:boolean;
sessiondata:any;
sourcekey:any;



pmstransactionsvisiblelist:any;
pmstransactionshidelist:any;
pmstransactionschedulesvisiblelist:any;
pmstransactionscheduleshidelist:any;
pmschargesvisiblelist:any;
pmschargeshidelist:any;
pmsdepositsvisiblelist:any;
pmsdepositshidelist:any;
pmsworkordersvisiblelist:any;
pmsworkordershidelist:any;

DeletedpmstransactionIDs: string="";
pmstransactionsID: string = "1";
pmstransactionsselectedindex:any;
DeletedpmstransactionscheduleIDs: string="";
pmstransactionschedulesID: string = "2";
pmstransactionschedulesselectedindex:any;
DeletedpmschargeIDs: string="";
pmschargesID: string = "3";
pmschargesselectedindex:any;
DeletedpmsdepositIDs: string="";
pmsdepositsID: string = "4";
pmsdepositsselectedindex:any;
DeletedpmsworkorderIDs: string="";
pmsworkordersID: string = "5";
pmsworkordersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmsleaseservice: pmsleaseService,
private pmstenantservice: pmstenantService,
private bomasterdataservice: bomasterdataService,
private pmspropertyservice: pmspropertyService,
private bosubcategorymasterservice: bosubcategorymasterService,
private pmspropertyunitservice: pmspropertyunitService,
private pmspropertyownerservice: pmspropertyownerService,
private hrmsemployeeservice: hrmsemployeeService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.pmsleaseForm  = this.fb.group({
pk:[null],
ImageName: [null],
leaseid: [null],
description: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
tenantid: [null],
tenantiddesc: [null],
ownerid: [null],
owneriddesc: [null],
leasetype: [null],
leasetypedesc: [null],
datesigned: [null],
startdate: [null],
enddate: [null],
rentcycle: [null],
rentcycledesc: [null],
rentamount: [null],
securitydeposit: [null],
securitydepositduedate: [null],
depositreceived: [null],
depositrefunded: [null],
depositheld: [null],
nextduedate: [null],
noticeperioddays: [null],
penaltycyclecount: [null],
penaltyamount: [null],
rentescalationpercent: [null],
rentescalationmonths: [null],
nextescalationdate: [null],
balancedue: [null],
attachment: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmsleaseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmsleaseForm.dirty && this.pmsleaseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.leaseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.leaseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.leaseid && pkDetail) {
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
let pmsleaseid = null;

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
this.formid=pmsleaseid;
//this.sharedService.alert(pmsleaseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmstransactionsTableConfig();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });

this.SetpmstransactionschedulesTableConfig();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });

this.SetpmschargesTableConfig();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });

this.SetpmsdepositsTableConfig();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });

this.SetpmsworkordersTableConfig();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });

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
if(this.pmsleaseservice.formData && this.pmsleaseservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmsleaseForm.patchValue({
    propertyid: this.pmsleaseservice.formData.propertyid,
    propertyiddesc: this.pmsleaseservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmsleaseForm.get('propertyid').value);
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
if(this.pmsleaseservice.formData && this.pmsleaseservice.formData.unitid){this.pmsleaseForm.patchValue({
    unitid: this.pmsleaseservice.formData.unitid,
    unitiddesc: this.pmsleaseservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmsleaseservice.formData && this.pmsleaseservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmsleaseForm.patchValue({
    tenantid: this.pmsleaseservice.formData.tenantid,
    tenantiddesc: this.pmsleaseservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmsleaseForm.get('tenantid').value);
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
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("leasetype").then(res => this.leasetypeList = res as boconfigvalue[]);
this.configservice.getList("rentcycle").then(res => this.rentcycleList = res as boconfigvalue[]);

//autocomplete
    this.pmsleaseservice.getpmsleasesList().then(res => {
      this.pkList = res as pmslease[];
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
this.pmsleaseForm.markAsUntouched();
this.pmsleaseForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmsleaseForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}

onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmsleaseForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}




resetForm() {
if (this.pmsleaseForm != null)
this.pmsleaseForm.reset();
this.pmsleaseForm.patchValue({
});
setTimeout(() => {
this.pmsleaseservice.pmstransactions=[];
this.pmstransactionsLoadTable();
this.pmsleaseservice.pmstransactionschedules=[];
this.pmstransactionschedulesLoadTable();
this.pmsleaseservice.pmscharges=[];
this.pmschargesLoadTable();
this.pmsleaseservice.pmsdeposits=[];
this.pmsdepositsLoadTable();
this.pmsleaseservice.pmsworkorders=[];
this.pmsworkordersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let leaseid = this.pmsleaseForm.get('leaseid').value;
        if(leaseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmsleaseservice.deletepmslease(leaseid).then(res =>
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
    this.pmsleaseForm.patchValue({
        leaseid: null
    });
    if(this.pmsleaseservice.formData.leaseid!=null)this.pmsleaseservice.formData.leaseid=null;
for (let i=0;i<this.pmsleaseservice.pmstransactions.length;i++) {
this.pmsleaseservice.pmstransactions[i].transactionid=null;
}
for (let i=0;i<this.pmsleaseservice.pmstransactionschedules.length;i++) {
this.pmsleaseservice.pmstransactionschedules[i].transactionscheduleid=null;
}
for (let i=0;i<this.pmsleaseservice.pmscharges.length;i++) {
this.pmsleaseservice.pmscharges[i].chargeid=null;
}
for (let i=0;i<this.pmsleaseservice.pmsdeposits.length;i++) {
this.pmsleaseservice.pmsdeposits[i].depositid=null;
}
for (let i=0;i<this.pmsleaseservice.pmsworkorders.length;i++) {
this.pmsleaseservice.pmsworkorders[i].workorderid=null;
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
this.pmsleaseForm.patchValue({"datesigned":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate")
this.pmsleaseForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.pmsleaseForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="securitydepositduedate")
this.pmsleaseForm.patchValue({"securitydepositduedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextduedate")
this.pmsleaseForm.patchValue({"nextduedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextescalationdate")
this.pmsleaseForm.patchValue({"nextescalationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmsleaseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmsleaseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmsleaseForm.controls[key]!=undefined)
{
this.pmsleaseForm.controls[key].disable({onlySelf: true});
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
leaseidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmsleaseForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
tenantidonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmsleaseForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
leasetypeonChange(evt:any){
let e=this.f.leasetype.value as any;
this.pmsleaseForm.patchValue({leasetypedesc:evt.options[evt.options.selectedIndex].text});
}
datesignedonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
rentcycleonChange(evt:any){
let e=this.f.rentcycle.value as any;
this.pmsleaseForm.patchValue({rentcycledesc:evt.options[evt.options.selectedIndex].text});
}
rentamountonChange(evt:any){
let e=evt.value;
}
securitydepositonChange(evt:any){
let e=evt.value;
}
securitydepositduedateonChange(evt:any){
let e=evt.value;
}
depositreceivedonChange(evt:any){
let e=evt.value;
}
depositrefundedonChange(evt:any){
let e=evt.value;
}
depositheldonChange(evt:any){
let e=evt.value;
}
nextduedateonChange(evt:any){
let e=evt.value;
}
noticeperioddaysonChange(evt:any){
let e=evt.value;
}
penaltycyclecountonChange(evt:any){
let e=evt.value;
}
penaltyamountonChange(evt:any){
let e=evt.value;
}
rentescalationpercentonChange(evt:any){
let e=evt.value;
}
rentescalationmonthsonChange(evt:any){
let e=evt.value;
}
nextescalationdateonChange(evt:any){
let e=evt.value;
}
balancedueonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
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
  


editpmsleases() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmsleaseservice.getpmsleasesByEID(pkcol).then(res => {

this.pmsleaseservice.formData=res.pmslease;
let formproperty=res.pmslease.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmslease.pkcol;
this.formid=res.pmslease.leaseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmslease.leaseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmsleaseForm.patchValue({
leaseid: res.pmslease.leaseid,
description: res.pmslease.description,
propertyid: res.pmslease.propertyid,
propertyiddesc: res.pmslease.propertyiddesc,
unitid: res.pmslease.unitid,
unitiddesc: res.pmslease.unitiddesc,
tenantid: res.pmslease.tenantid,
tenantiddesc: res.pmslease.tenantiddesc,
ownerid: res.pmslease.ownerid,
owneriddesc: res.pmslease.owneriddesc,
leasetype: res.pmslease.leasetype,
leasetypedesc: res.pmslease.leasetypedesc,
datesigned: this.ngbDateParserFormatter.parse(res.pmslease.datesigned),
startdate: this.ngbDateParserFormatter.parse(res.pmslease.startdate),
enddate: this.ngbDateParserFormatter.parse(res.pmslease.enddate),
rentcycle: res.pmslease.rentcycle,
rentcycledesc: res.pmslease.rentcycledesc,
rentamount: res.pmslease.rentamount,
securitydeposit: res.pmslease.securitydeposit,
securitydepositduedate: this.ngbDateParserFormatter.parse(res.pmslease.securitydepositduedate),
depositreceived: res.pmslease.depositreceived,
depositrefunded: res.pmslease.depositrefunded,
depositheld: res.pmslease.depositheld,
nextduedate: this.ngbDateParserFormatter.parse(res.pmslease.nextduedate),
noticeperioddays: res.pmslease.noticeperioddays,
penaltycyclecount: res.pmslease.penaltycyclecount,
penaltyamount: res.pmslease.penaltyamount,
rentescalationpercent: res.pmslease.rentescalationpercent,
rentescalationmonths: res.pmslease.rentescalationmonths,
nextescalationdate: this.ngbDateParserFormatter.parse(res.pmslease.nextescalationdate),
balancedue: res.pmslease.balancedue,
attachment: JSON.parse(res.pmslease.attachment),
notes: res.pmslease.notes,
status: res.pmslease.status,
statusdesc: res.pmslease.statusdesc,
});
this.pmstransactionsvisiblelist=res.pmstransactionsvisiblelist;
this.pmstransactionschedulesvisiblelist=res.pmstransactionschedulesvisiblelist;
this.pmschargesvisiblelist=res.pmschargesvisiblelist;
this.pmsdepositsvisiblelist=res.pmsdepositsvisiblelist;
this.pmsworkordersvisiblelist=res.pmsworkordersvisiblelist;
if(this.pmsleaseForm.get('attachment').value!=null && this.pmsleaseForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmsleaseForm.get('attachment').value);
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.pmsleaseservice.pmstransactions = res.pmstransactions;
this.SetpmstransactionsTableConfig();
this.pmstransactionsLoadTable();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
this.pmsleaseservice.pmstransactionschedules = res.pmstransactionschedules;
this.SetpmstransactionschedulesTableConfig();
this.pmstransactionschedulesLoadTable();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
this.pmsleaseservice.pmscharges = res.pmscharges;
this.SetpmschargesTableConfig();
this.pmschargesLoadTable();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
this.pmsleaseservice.pmsdeposits = res.pmsdeposits;
this.SetpmsdepositsTableConfig();
this.pmsdepositsLoadTable();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
this.pmsleaseservice.pmsworkorders = res.pmsworkorders;
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
  for (let key in this.pmsleaseForm.controls) {
    if (this.pmsleaseForm.controls[key] != null) {
if(false)
{
if(this.pmsleaseservice.formData!=null && this.pmsleaseservice.formData[key]!=null  && this.pmsleaseservice.formData[key]!='[]' && this.pmsleaseservice.formData[key]!=undefined && this.pmsleaseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmsleaseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmsleaseservice.formData!=null && this.pmsleaseservice.formData[key]!=null   && this.pmsleaseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmsleaseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmsleaseservice.formData!=null && this.pmsleaseservice.formData[key]!=null   && this.pmsleaseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmsleaseservice.formData[key]+"'><div class='progress__number'>"+this.pmsleaseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmsleaseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmsleaseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmsleaseForm.value;
obj.datesigned=new Date(this.pmsleaseForm.get('datesigned').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('datesigned').value)+'  UTC' :null);
obj.startdate=new Date(this.pmsleaseForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.pmsleaseForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('enddate').value)+'  UTC' :null);
obj.securitydepositduedate=new Date(this.pmsleaseForm.get('securitydepositduedate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('securitydepositduedate').value)+'  UTC' :null);
obj.nextduedate=new Date(this.pmsleaseForm.get('nextduedate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('nextduedate').value)+'  UTC' :null);
obj.nextescalationdate=new Date(this.pmsleaseForm.get('nextescalationdate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('nextescalationdate').value)+'  UTC' :null);
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

private pmsleasetoggleOption(){
this.pmsleaseshowOption = this.pmsleaseshowOption === true ? false : true;
}

private pmstransactiontoggleOption(){
this.pmstransactionshowOption = this.pmstransactionshowOption === true ? false : true;
}

private pmstransactionscheduletoggleOption(){
this.pmstransactionscheduleshowOption = this.pmstransactionscheduleshowOption === true ? false : true;
}

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmsleaseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmsleaseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmsleaseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmsleaseservice.formData=this.pmsleaseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmsleaseForm.controls[key] != null)
    {
        this.pmsleaseservice.formData[key] = this.pmsleaseForm.controls[key].value;
    }
}
}
}
this.pmsleaseservice.formData.datesigned=new Date(this.pmsleaseForm.get('datesigned').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('datesigned').value)+'  UTC' :null);
this.pmsleaseservice.formData.startdate=new Date(this.pmsleaseForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('startdate').value)+'  UTC' :null);
this.pmsleaseservice.formData.enddate=new Date(this.pmsleaseForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('enddate').value)+'  UTC' :null);
this.pmsleaseservice.formData.securitydepositduedate=new Date(this.pmsleaseForm.get('securitydepositduedate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('securitydepositduedate').value)+'  UTC' :null);
this.pmsleaseservice.formData.nextduedate=new Date(this.pmsleaseForm.get('nextduedate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('nextduedate').value)+'  UTC' :null);
this.pmsleaseservice.formData.nextescalationdate=new Date(this.pmsleaseForm.get('nextescalationdate').value ? this.ngbDateParserFormatter.format(this.pmsleaseForm.get('nextescalationdate').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.pmsleaseservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.pmsleaseservice.formData.DeletedpmstransactionIDs = this.DeletedpmstransactionIDs;
this.pmsleaseservice.formData.DeletedpmstransactionscheduleIDs = this.DeletedpmstransactionscheduleIDs;
this.pmsleaseservice.formData.DeletedpmschargeIDs = this.DeletedpmschargeIDs;
this.pmsleaseservice.formData.DeletedpmsdepositIDs = this.DeletedpmsdepositIDs;
this.pmsleaseservice.formData.DeletedpmsworkorderIDs = this.DeletedpmsworkorderIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.pmsleaseservice.formData);
this.pmsleaseservice.formData=this.pmsleaseForm.value;
this.pmsleaseservice.saveOrUpdatepmsleases().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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
this.dialogRef.close((res as any).pmslease);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmsleaseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmslease);
}
else
{
this.FillData(res);
}
}
this.pmsleaseForm.markAsUntouched();
this.pmsleaseForm.markAsPristine();
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
data: {propertyid:this.pmsleaseForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmsleaseForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmsleaseForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmsleaseForm.get('ownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmstransaction(event:any,transactionid:any, leaseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionComponent, 
{
data:  {  showview:false,save:false,event,transactionid, leaseid,visiblelist:this.pmstransactionsvisiblelist,  hidelist:this.pmstransactionshidelist,ScreenType:2  },
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
this.pmsleaseservice.pmstransactions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransactionschedule(event:any,transactionscheduleid:any, leaseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionscheduleComponent, 
{
data:  {  showview:false,save:false,event,transactionscheduleid, leaseid,visiblelist:this.pmstransactionschedulesvisiblelist,  hidelist:this.pmstransactionscheduleshidelist,ScreenType:2  },
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
this.pmsleaseservice.pmstransactionschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmscharge(event:any,chargeid:any, leaseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmschargeComponent, 
{
data:  {  showview:false,save:false,event,chargeid, leaseid,visiblelist:this.pmschargesvisiblelist,  hidelist:this.pmschargeshidelist,ScreenType:2  },
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
this.pmsleaseservice.pmscharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsdeposit(event:any,depositid:any, leaseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsdepositComponent, 
{
data:  {  showview:false,save:false,event,depositid, leaseid,visiblelist:this.pmsdepositsvisiblelist,  hidelist:this.pmsdepositshidelist,ScreenType:2  },
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
this.pmsleaseservice.pmsdeposits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsworkorder(event:any,workorderid:any, leaseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, leaseid,visiblelist:this.pmsworkordersvisiblelist,  hidelist:this.pmsworkordershidelist,ScreenType:2  },
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
this.pmsleaseservice.pmsworkorders.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
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
this.pmstransactionssource.load(this.pmsleaseservice.pmstransactions as  any as LocalDataSource);
this.pmstransactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsleaseservice.pmstransactions.length == 0)
{
    this.tblpmstransactionssource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransaction();
    this.pmsleaseservice.pmstransactions.push(obj);
    this.pmstransactionssource.refresh();
    if ((this.pmsleaseservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionssource.getPaging().page)
    {
        this.pmstransactionssource.setPage((this.pmsleaseservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmsleaseservice.deletepmslease(transactionid).then(res=>
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
this.pmstransactionsselectedindex=this.pmsleaseservice.pmstransactions.findIndex(i => i.transactionid === event.data.transactionid);
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
this.pmstransactionschedulessource.load(this.pmsleaseservice.pmstransactionschedules as  any as LocalDataSource);
this.pmstransactionschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsleaseservice.pmstransactionschedules.length == 0)
{
    this.tblpmstransactionschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransactionschedule();
    this.pmsleaseservice.pmstransactionschedules.push(obj);
    this.pmstransactionschedulessource.refresh();
    if ((this.pmsleaseservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionschedulessource.getPaging().page)
    {
        this.pmstransactionschedulessource.setPage((this.pmsleaseservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmsleaseservice.deletepmslease(transactionscheduleid).then(res=>
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
this.pmstransactionschedulesselectedindex=this.pmsleaseservice.pmstransactionschedules.findIndex(i => i.transactionscheduleid === event.data.transactionscheduleid);
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
this.pmschargessource.load(this.pmsleaseservice.pmscharges as  any as LocalDataSource);
this.pmschargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmschargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsleaseservice.pmscharges.length == 0)
{
    this.tblpmschargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmscharge();
    this.pmsleaseservice.pmscharges.push(obj);
    this.pmschargessource.refresh();
    if ((this.pmsleaseservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1 != this.pmschargessource.getPaging().page)
    {
        this.pmschargessource.setPage((this.pmsleaseservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1);
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
this.pmsleaseservice.deletepmslease(chargeid).then(res=>
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
this.pmschargesselectedindex=this.pmsleaseservice.pmscharges.findIndex(i => i.chargeid === event.data.chargeid);
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
this.pmsdepositssource.load(this.pmsleaseservice.pmsdeposits as  any as LocalDataSource);
this.pmsdepositssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsdepositsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsleaseservice.pmsdeposits.length == 0)
{
    this.tblpmsdepositssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsdeposit();
    this.pmsleaseservice.pmsdeposits.push(obj);
    this.pmsdepositssource.refresh();
    if ((this.pmsleaseservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1 != this.pmsdepositssource.getPaging().page)
    {
        this.pmsdepositssource.setPage((this.pmsleaseservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmsleaseservice.deletepmslease(depositid).then(res=>
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
this.pmsdepositsselectedindex=this.pmsleaseservice.pmsdeposits.findIndex(i => i.depositid === event.data.depositid);
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
this.pmsworkorderssource.load(this.pmsleaseservice.pmsworkorders as  any as LocalDataSource);
this.pmsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsleaseservice.pmsworkorders.length == 0)
{
    this.tblpmsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorder();
    this.pmsleaseservice.pmsworkorders.push(obj);
    this.pmsworkorderssource.refresh();
    if ((this.pmsleaseservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderssource.getPaging().page)
    {
        this.pmsworkorderssource.setPage((this.pmsleaseservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1);
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
this.pmsleaseservice.deletepmslease(workorderid).then(res=>
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
this.pmsworkordersselectedindex=this.pmsleaseservice.pmsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
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



