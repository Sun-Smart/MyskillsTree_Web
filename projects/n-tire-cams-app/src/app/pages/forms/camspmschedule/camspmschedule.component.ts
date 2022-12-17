import { camspmscheduleService } from './../../../service/camspmschedule.service';
import { camspmschedule } from './../../../model/camspmschedule.model';
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
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
//detail table services
import { camspmscheduletask } from './../../../model/camspmscheduletask.model';
import { camspmscheduletaskComponent } from './../../../pages/forms/camspmscheduletask/camspmscheduletask.component';
//FK services
import { camspmtask,IcamspmtaskResponse } from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
import { camspmscheduleinstruction } from './../../../model/camspmscheduleinstruction.model';
import { camspmscheduleinstructionComponent } from './../../../pages/forms/camspmscheduleinstruction/camspmscheduleinstruction.component';
//FK services
import { camspmscheduleitem } from './../../../model/camspmscheduleitem.model';
import { camspmscheduleitemComponent } from './../../../pages/forms/camspmscheduleitem/camspmscheduleitem.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
import { camspmschedulesuppliertask } from './../../../model/camspmschedulesuppliertask.model';
import { camspmschedulesuppliertaskComponent } from './../../../pages/forms/camspmschedulesuppliertask/camspmschedulesuppliertask.component';
//FK services
import { erpsuppliermaster,IerpsuppliermasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
import { camspmscheduleuser } from './../../../model/camspmscheduleuser.model';
import { camspmscheduleuserComponent } from './../../../pages/forms/camspmscheduleuser/camspmscheduleuser.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-camspmschedule',
templateUrl: './camspmschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camspmscheduleComponent implements OnInit {
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
bfilterPopulatecamspmschedules:boolean=false;
datacamspmschedulesworktype3:any=[];
datacamspmschedulesassetid3:any=[];
datacamspmschedulespmlocationid3:any=[];
datacamspmschedulespmtype3:any=[];
datacamspmschedulesmeasurementmeter3:any=[];
datacamspmschedulesfrequencyunit3:any=[];
datacamspmschedulespmgenerationtype3:any=[];
datacamspmschedulespmstatus3:any=[];
datacamspmschedulespmid3:any=[];
datacamspmscheduletaskstasktype3:any=[];
datacamspmscheduletasksscheduleid3:any=[];
datacamspmscheduletaskspmtaskid3:any=[];
datacamspmscheduletasksmeterreadingstate3:any=[];
datacamspmscheduletaskspmid3:any=[];
bfilterPopulatecamspmscheduletasks:boolean=false;
datacamspmscheduleinstructionsscheduleid3:any=[];
datacamspmscheduleinstructionstaskid3:any=[];
datacamspmscheduleinstructionspmid3:any=[];
bfilterPopulatecamspmscheduleinstructions:boolean=false;
datacamspmscheduleitemsscheduleid3:any=[];
datacamspmscheduleitemsitemid3:any=[];
datacamspmscheduleitemstaskid3:any=[];
datacamspmscheduleitemspmid3:any=[];
bfilterPopulatecamspmscheduleitems:boolean=false;
datacamspmschedulesuppliertasksscheduleid3:any=[];
datacamspmschedulesuppliertaskssupplierid3:any=[];
datacamspmschedulesuppliertaskstasktype3:any=[];
datacamspmschedulesuppliertaskspmid3:any=[];
bfilterPopulatecamspmschedulesuppliertasks:boolean=false;
datacamspmscheduleusersscheduleid3:any=[];
datacamspmscheduleusersuserid3:any=[];
datacamspmscheduleuserstaskid3:any=[];
datacamspmscheduleuserspmid3:any=[];
bfilterPopulatecamspmscheduleusers:boolean=false;
@ViewChild('tblcamspmscheduletaskssource',{static:false}) tblcamspmscheduletaskssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmscheduleinstructionssource',{static:false}) tblcamspmscheduleinstructionssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmscheduleitemssource',{static:false}) tblcamspmscheduleitemssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmschedulesuppliertaskssource',{static:false}) tblcamspmschedulesuppliertaskssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmscheduleuserssource',{static:false}) tblcamspmscheduleuserssource: Ng2SmartTableComponent;
 camspmscheduleForm: FormGroup;
worktypeList: boconfigvalue[];
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
pmlocationidList: bobranchlocation[];
pmlocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmlocationid_bobranchlocationsForm: FormGroup;//autocomplete
pmlocationid_bobranchlocationsoptions:any;//autocomplete
pmlocationid_bobranchlocationsformatter:any;//autocomplete
pmtypeList: boconfigvalue[];
measurementmeterList: boconfigvalue[];
frequencyunitList: boconfigvalue[];
pmgenerationtypeList: boconfigvalue[];
pmstatusList: boconfigvalue[];
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camspmscheduleshowOption:boolean;
camspmscheduletaskshowOption:boolean;
camspmscheduleinstructionshowOption:boolean;
camspmscheduleitemshowOption:boolean;
camspmschedulesuppliertaskshowOption:boolean;
camspmscheduleusershowOption:boolean;
sessiondata:any;
sourcekey:any;

readingbasedvisible:boolean = false;
timebasedvisible:boolean = false;


camspmscheduletasksvisiblelist:any;
camspmscheduletaskshidelist:any;
camspmscheduleinstructionsvisiblelist:any;
camspmscheduleinstructionshidelist:any;
camspmscheduleitemsvisiblelist:any;
camspmscheduleitemshidelist:any;
camspmschedulesuppliertasksvisiblelist:any;
camspmschedulesuppliertaskshidelist:any;
camspmscheduleusersvisiblelist:any;
camspmscheduleusershidelist:any;

DeletedcamspmscheduletaskIDs: string="";
camspmscheduletasksID: string = "1";
camspmscheduletasksselectedindex:any;
DeletedcamspmscheduleinstructionIDs: string="";
camspmscheduleinstructionsID: string = "2";
camspmscheduleinstructionsselectedindex:any;
DeletedcamspmscheduleitemIDs: string="";
camspmscheduleitemsID: string = "3";
camspmscheduleitemsselectedindex:any;
DeletedcamspmschedulesuppliertaskIDs: string="";
camspmschedulesuppliertasksID: string = "4";
camspmschedulesuppliertasksselectedindex:any;
DeletedcamspmscheduleuserIDs: string="";
camspmscheduleusersID: string = "5";
camspmscheduleusersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camspmscheduleservice: camspmscheduleService,
private camspmtaskservice: camspmtaskService,
private camspmmasterservice: camspmmasterService,
private erpitemmasterservice: erpitemmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsassetmasterservice:camsassetmasterService,
private bobranchlocationservice:bobranchlocationService,
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
this.camspmscheduleForm  = this.fb.group({
pk:[null],
scheduleid: [null],
reference: [null, Validators.required],
description: [null, Validators.required],
worktype: [null, Validators.required],
worktypedesc: [null],
assetid: [null, Validators.required],
assetiddesc: [null],
pmlocationid: [null],
pmlocationiddesc: [null],
pmtype: [null, Validators.required],
pmtypedesc: [null],
measurementmeter: [null],
measurementmeterdesc: [null],
meterreadingstart: [null],
meterfrequency: [null],
pmdue: [null],
lowerthresholdlimit: [null],
upperthresholdlimit: [null],
frequencyunit: [null],
frequencyunitdesc: [null],
frequency: [null],
days: [null],
pmgenerationtype: [null],
pmgenerationtypedesc: [null],
startdate: [null, Validators.required],
enddate: [null, Validators.required],
nextstartdate: [null],
notes: [null],
remarks: [null],
pmstatus: [null],
pmstatusdesc: [null],
status: [null],
statusdesc: [null],
pmid: [null],
pmiddesc: [null],
}, {
validator: [DateCompare('startdate','enddate',""),]});
}

get f() { return this.camspmscheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camspmscheduleForm.dirty && this.camspmscheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scheduleid && pkDetail) {
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
let camspmscheduleid = null;

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
this.formid=camspmscheduleid;
//this.sharedService.alert(camspmscheduleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamspmscheduletasksTableConfig();
  setTimeout(() => {
  this.SetcamspmscheduletasksTableddConfig();
  });

this.SetcamspmscheduleinstructionsTableConfig();
  setTimeout(() => {
  this.SetcamspmscheduleinstructionsTableddConfig();
  });

this.SetcamspmscheduleitemsTableConfig();
  setTimeout(() => {
  this.SetcamspmscheduleitemsTableddConfig();
  });

this.SetcamspmschedulesuppliertasksTableConfig();
  setTimeout(() => {
  this.SetcamspmschedulesuppliertasksTableddConfig();
  });

this.SetcamspmscheduleusersTableConfig();
  setTimeout(() => {
  this.SetcamspmscheduleusersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("pmworktype").then(res => this.worktypeList = res as boconfigvalue[]);
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camspmscheduleservice.formData && this.camspmscheduleservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camspmscheduleForm.patchValue({
    assetid: this.camspmscheduleservice.formData.assetid,
    assetiddesc: this.camspmscheduleservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camspmscheduleForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assetid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetid_camsassetmastersformatter = (result: any) => result.description;
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.pmlocationidList = res as bobranchlocation[];
if(this.camspmscheduleservice.formData && this.camspmscheduleservice.formData.pmlocationid){
this.pmlocationidoptionsEvent.emit(this.pmlocationidList);
this.camspmscheduleForm.patchValue({
    pmlocationid: this.camspmscheduleservice.formData.pmlocationid,
    pmlocationiddesc: this.camspmscheduleservice.formData.pmlocationiddesc,
});
}
{
let arrpmlocationid = this.pmlocationidList.filter(v => v.locationid == this.camspmscheduleForm.get('pmlocationid').value);
let objpmlocationid;
if (arrpmlocationid.length > 0) objpmlocationid = arrpmlocationid[0];
if (objpmlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmlocationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmlocationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmlocationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.configservice.getList("pmtype").then(res => this.pmtypeList = res as boconfigvalue[]);
this.configservice.getList("measurementmeter").then(res => this.measurementmeterList = res as boconfigvalue[]);
this.configservice.getList("timefrequency").then(res => this.frequencyunitList = res as boconfigvalue[]);
this.configservice.getList("pmgenerationtype").then(res => this.pmgenerationtypeList = res as boconfigvalue[]);
this.configservice.getList("pmstatus").then(res => this.pmstatusList = res as boconfigvalue[]);
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camspmscheduleservice.formData && this.camspmscheduleservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camspmscheduleForm.patchValue({
    pmid: this.camspmscheduleservice.formData.pmid,
    pmiddesc: this.camspmscheduleservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camspmscheduleForm.get('pmid').value);
let objpmid;
if (arrpmid.length > 0) objpmid = arrpmid[0];
if (objpmid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmid_camspmmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmid_camspmmastersformatter = (result: any) => result.reference;

//autocomplete
    this.camspmscheduleservice.getcamspmschedulesList().then(res => {
      this.pkList = res as camspmschedule[];
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
this.camspmscheduleForm.markAsUntouched();
this.camspmscheduleForm.markAsPristine();
}
onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camspmscheduleForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}

onSelectedpmlocationid(pmlocationidDetail: any) {
if (pmlocationidDetail.locationid && pmlocationidDetail) {
this.camspmscheduleForm.patchValue({
pmlocationid: pmlocationidDetail.locationid,
pmlocationiddesc: pmlocationidDetail.locationname,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camspmscheduleForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});

}
}




resetForm() {
if (this.camspmscheduleForm != null)
this.camspmscheduleForm.reset();
this.camspmscheduleForm.patchValue({
});
setTimeout(() => {
this.camspmscheduleservice.camspmscheduletasks=[];
this.camspmscheduletasksLoadTable();
this.camspmscheduleservice.camspmscheduleinstructions=[];
this.camspmscheduleinstructionsLoadTable();
this.camspmscheduleservice.camspmscheduleitems=[];
this.camspmscheduleitemsLoadTable();
this.camspmscheduleservice.camspmschedulesuppliertasks=[];
this.camspmschedulesuppliertasksLoadTable();
this.camspmscheduleservice.camspmscheduleusers=[];
this.camspmscheduleusersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.readingbasedvisible = false;
this.timebasedvisible = false;
}

    onDelete() {
        let scheduleid = this.camspmscheduleForm.get('scheduleid').value;
        if(scheduleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camspmscheduleservice.deletecamspmschedule(scheduleid).then(res =>
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
    this.camspmscheduleForm.patchValue({
        scheduleid: null
    });
    if(this.camspmscheduleservice.formData.scheduleid!=null)this.camspmscheduleservice.formData.scheduleid=null;
for (let i=0;i<this.camspmscheduleservice.camspmscheduletasks.length;i++) {
this.camspmscheduleservice.camspmscheduletasks[i].scheduletaskid=null;
}
for (let i=0;i<this.camspmscheduleservice.camspmscheduleinstructions.length;i++) {
this.camspmscheduleservice.camspmscheduleinstructions[i].scheduleinstructionid=null;
}
for (let i=0;i<this.camspmscheduleservice.camspmscheduleitems.length;i++) {
this.camspmscheduleservice.camspmscheduleitems[i].scheduleitemid=null;
}
for (let i=0;i<this.camspmscheduleservice.camspmschedulesuppliertasks.length;i++) {
this.camspmscheduleservice.camspmschedulesuppliertasks[i].schedulesupplierid=null;
}
for (let i=0;i<this.camspmscheduleservice.camspmscheduleusers.length;i++) {
this.camspmscheduleservice.camspmscheduleusers[i].scheduleuserid=null;
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
        else if(key=="startdate")
this.camspmscheduleForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.camspmscheduleForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextstartdate")
this.camspmscheduleForm.patchValue({"nextstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.camspmscheduleForm.patchValue({"notes":  mainscreendata[key] } );
        else if(key=="remarks")
this.camspmscheduleForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camspmscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camspmscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camspmscheduleForm.controls[key]!=undefined)
{
this.camspmscheduleForm.controls[key].disable({onlySelf: true});
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
scheduleidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
worktypeonChange(evt:any){
let e=this.f.worktype.value as any;
this.camspmscheduleForm.patchValue({worktypedesc:evt.options[evt.options.selectedIndex].text});
}
assetidonChange(evt:any){
let e=evt.value;
}
pmlocationidonChange(evt:any){
let e=evt.value;
}
pmtypeonChange(evt:any){
let e=this.f.pmtype.value as any;
this.timebasedvisible=false;
if(this.f.pmtype.value == 'T')this.timebasedvisible=true;
this.camspmscheduleForm.patchValue({pmtypedesc:evt.options[evt.options.selectedIndex].text});
}
measurementmeteronChange(evt:any){
let e=this.f.measurementmeter.value as any;
this.camspmscheduleForm.patchValue({measurementmeterdesc:evt.options[evt.options.selectedIndex].text});
}
meterreadingstartonChange(evt:any){
let e=evt.value;
}
meterfrequencyonChange(evt:any){
let e=evt.value;
}
pmdueonChange(evt:any){
let e=evt.value;
}
lowerthresholdlimitonChange(evt:any){
let e=evt.value;
}
upperthresholdlimitonChange(evt:any){
let e=evt.value;
}
frequencyunitonChange(evt:any){
let e=this.f.frequencyunit.value as any;
this.camspmscheduleForm.patchValue({frequencyunitdesc:evt.options[evt.options.selectedIndex].text});
}
frequencyonChange(evt:any){
let e=evt.value;
}
daysonChange(evt:any){
let e=evt.value;
}
pmgenerationtypeonChange(evt:any){
let e=this.f.pmgenerationtype.value as any;
this.camspmscheduleForm.patchValue({pmgenerationtypedesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
nextstartdateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
pmstatusonChange(evt:any){
let e=this.f.pmstatus.value as any;
this.camspmscheduleForm.patchValue({pmstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}

editcamspmschedules() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camspmscheduleservice.getcamspmschedulesByEID(pkcol).then(res => {

this.camspmscheduleservice.formData=res.camspmschedule;
let formproperty=res.camspmschedule.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camspmschedule.pkcol;
this.formid=res.camspmschedule.scheduleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camspmschedule.scheduleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camspmscheduleForm.patchValue({
scheduleid: res.camspmschedule.scheduleid,
reference: res.camspmschedule.reference,
description: res.camspmschedule.description,
worktype: res.camspmschedule.worktype,
worktypedesc: res.camspmschedule.worktypedesc,
assetid: res.camspmschedule.assetid,
assetiddesc: res.camspmschedule.assetiddesc,
pmlocationid: res.camspmschedule.pmlocationid,
pmlocationiddesc: res.camspmschedule.pmlocationiddesc,
pmtype: res.camspmschedule.pmtype,
pmtypedesc: res.camspmschedule.pmtypedesc,
measurementmeter: res.camspmschedule.measurementmeter,
measurementmeterdesc: res.camspmschedule.measurementmeterdesc,
meterreadingstart: res.camspmschedule.meterreadingstart,
meterfrequency: res.camspmschedule.meterfrequency,
pmdue: res.camspmschedule.pmdue,
lowerthresholdlimit: res.camspmschedule.lowerthresholdlimit,
upperthresholdlimit: res.camspmschedule.upperthresholdlimit,
frequencyunit: res.camspmschedule.frequencyunit,
frequencyunitdesc: res.camspmschedule.frequencyunitdesc,
frequency: res.camspmschedule.frequency,
days: res.camspmschedule.days,
pmgenerationtype: res.camspmschedule.pmgenerationtype,
pmgenerationtypedesc: res.camspmschedule.pmgenerationtypedesc,
startdate: this.ngbDateParserFormatter.parse(res.camspmschedule.startdate),
enddate: this.ngbDateParserFormatter.parse(res.camspmschedule.enddate),
nextstartdate: this.ngbDateParserFormatter.parse(res.camspmschedule.nextstartdate),
notes: JSON.parse(res.camspmschedule.notes),
remarks: JSON.parse(res.camspmschedule.remarks),
pmstatus: res.camspmschedule.pmstatus,
pmstatusdesc: res.camspmschedule.pmstatusdesc,
status: res.camspmschedule.status,
statusdesc: res.camspmschedule.statusdesc,
pmid: res.camspmschedule.pmid,
pmiddesc: res.camspmschedule.pmiddesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("readingbased")>=0)this.readingbasedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("readingbased")>=0)this.readingbasedvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("timebased")>=0)this.timebasedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("timebased")>=0)this.timebasedvisible = false;
this.camspmscheduletasksvisiblelist=res.camspmscheduletasksvisiblelist;
this.camspmscheduleinstructionsvisiblelist=res.camspmscheduleinstructionsvisiblelist;
this.camspmscheduleitemsvisiblelist=res.camspmscheduleitemsvisiblelist;
this.camspmschedulesuppliertasksvisiblelist=res.camspmschedulesuppliertasksvisiblelist;
this.camspmscheduleusersvisiblelist=res.camspmscheduleusersvisiblelist;
                    this.showworkflow=true;
                this.showsubmit = false;
if(res.camspmschedule.status=="N" || res.camspmschedule.status=="P")this.showsubmit=true;
if(res.camspmschedule.status=="N")this.showGoWorkFlow = true;
//Child Tables if any
this.camspmscheduleservice.camspmscheduletasks = res.camspmscheduletasks;
this.SetcamspmscheduletasksTableConfig();
this.camspmscheduletasksLoadTable();
  setTimeout(() => {
  this.SetcamspmscheduletasksTableddConfig();
  });
this.camspmscheduleservice.camspmscheduleinstructions = res.camspmscheduleinstructions;
this.SetcamspmscheduleinstructionsTableConfig();
this.camspmscheduleinstructionsLoadTable();
  setTimeout(() => {
  this.SetcamspmscheduleinstructionsTableddConfig();
  });
this.camspmscheduleservice.camspmscheduleitems = res.camspmscheduleitems;
this.SetcamspmscheduleitemsTableConfig();
this.camspmscheduleitemsLoadTable();
  setTimeout(() => {
  this.SetcamspmscheduleitemsTableddConfig();
  });
this.camspmscheduleservice.camspmschedulesuppliertasks = res.camspmschedulesuppliertasks;
this.SetcamspmschedulesuppliertasksTableConfig();
this.camspmschedulesuppliertasksLoadTable();
  setTimeout(() => {
  this.SetcamspmschedulesuppliertasksTableddConfig();
  });
this.camspmscheduleservice.camspmscheduleusers = res.camspmscheduleusers;
this.SetcamspmscheduleusersTableConfig();
this.camspmscheduleusersLoadTable();
  setTimeout(() => {
  this.SetcamspmscheduleusersTableddConfig();
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
  for (let key in this.camspmscheduleForm.controls) {
    if (this.camspmscheduleForm.controls[key] != null) {
if(false)
{
if(this.camspmscheduleservice.formData!=null && this.camspmscheduleservice.formData[key]!=null  && this.camspmscheduleservice.formData[key]!='[]' && this.camspmscheduleservice.formData[key]!=undefined && this.camspmscheduleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camspmscheduleservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camspmscheduleservice.formData!=null && this.camspmscheduleservice.formData[key]!=null   && this.camspmscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camspmscheduleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camspmscheduleservice.formData!=null && this.camspmscheduleservice.formData[key]!=null   && this.camspmscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camspmscheduleservice.formData[key]+"'><div class='progress__number'>"+this.camspmscheduleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camspmscheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camspmscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camspmscheduleForm.value;
obj.startdate=new Date(this.camspmscheduleForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.camspmscheduleForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('enddate').value)+'  UTC' :null);
obj.nextstartdate=new Date(this.camspmscheduleForm.get('nextstartdate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('nextstartdate').value)+'  UTC' :null);
if(this.camspmscheduleForm.get('notes').value!=null)obj.notes=JSON.stringify(this.camspmscheduleForm.get('notes').value);
if(this.camspmscheduleForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camspmscheduleForm.get('remarks').value);
console.log(obj);
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

private camspmscheduletoggleOption(){
this.camspmscheduleshowOption = this.camspmscheduleshowOption === true ? false : true;
}

private camspmscheduletasktoggleOption(){
this.camspmscheduletaskshowOption = this.camspmscheduletaskshowOption === true ? false : true;
}

private camspmscheduleinstructiontoggleOption(){
this.camspmscheduleinstructionshowOption = this.camspmscheduleinstructionshowOption === true ? false : true;
}

private camspmscheduleitemtoggleOption(){
this.camspmscheduleitemshowOption = this.camspmscheduleitemshowOption === true ? false : true;
}

private camspmschedulesuppliertasktoggleOption(){
this.camspmschedulesuppliertaskshowOption = this.camspmschedulesuppliertaskshowOption === true ? false : true;
}

private camspmscheduleusertoggleOption(){
this.camspmscheduleusershowOption = this.camspmscheduleusershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camspmscheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camspmscheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camspmscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camspmscheduleservice.formData=this.camspmscheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camspmscheduleForm.controls[key] != null)
    {
        this.camspmscheduleservice.formData[key] = this.camspmscheduleForm.controls[key].value;
    }
}
}
}
this.camspmscheduleservice.formData.startdate=new Date(this.camspmscheduleForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('startdate').value)+'  UTC' :null);
this.camspmscheduleservice.formData.enddate=new Date(this.camspmscheduleForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('enddate').value)+'  UTC' :null);
this.camspmscheduleservice.formData.nextstartdate=new Date(this.camspmscheduleForm.get('nextstartdate').value ? this.ngbDateParserFormatter.format(this.camspmscheduleForm.get('nextstartdate').value)+'  UTC' :null);
if(this.camspmscheduleForm.get('notes').value!=null)this.camspmscheduleservice.formData.notes=JSON.stringify(this.camspmscheduleForm.get('notes').value);
if(this.camspmscheduleForm.get('remarks').value!=null)this.camspmscheduleservice.formData.remarks=JSON.stringify(this.camspmscheduleForm.get('remarks').value);
this.camspmscheduleservice.formData.DeletedcamspmscheduletaskIDs = this.DeletedcamspmscheduletaskIDs;
this.camspmscheduleservice.formData.DeletedcamspmscheduleinstructionIDs = this.DeletedcamspmscheduleinstructionIDs;
this.camspmscheduleservice.formData.DeletedcamspmscheduleitemIDs = this.DeletedcamspmscheduleitemIDs;
this.camspmscheduleservice.formData.DeletedcamspmschedulesuppliertaskIDs = this.DeletedcamspmschedulesuppliertaskIDs;
this.camspmscheduleservice.formData.DeletedcamspmscheduleuserIDs = this.DeletedcamspmscheduleuserIDs;
console.log(this.camspmscheduleservice.formData);
this.camspmscheduleservice.formData=this.camspmscheduleForm.value;
this.camspmscheduleservice.saveOrUpdatecamspmschedules().subscribe(
async res => {
if (this.camspmscheduletaskssource.data)
{
    for (let i = 0; i < this.camspmscheduletaskssource.data.length; i++)
    {
        if (this.camspmscheduletaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmscheduletaskssource.data[i].fileattachmentlist);
    }
}
if (this.camspmscheduleinstructionssource.data)
{
    for (let i = 0; i < this.camspmscheduleinstructionssource.data.length; i++)
    {
        if (this.camspmscheduleinstructionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmscheduleinstructionssource.data[i].fileattachmentlist);
    }
}
if (this.camspmscheduleitemssource.data)
{
    for (let i = 0; i < this.camspmscheduleitemssource.data.length; i++)
    {
        if (this.camspmscheduleitemssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmscheduleitemssource.data[i].fileattachmentlist);
    }
}
if (this.camspmschedulesuppliertaskssource.data)
{
    for (let i = 0; i < this.camspmschedulesuppliertaskssource.data.length; i++)
    {
        if (this.camspmschedulesuppliertaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmschedulesuppliertaskssource.data[i].fileattachmentlist);
    }
}
if (this.camspmscheduleuserssource.data)
{
    for (let i = 0; i < this.camspmscheduleuserssource.data.length; i++)
    {
        if (this.camspmscheduleuserssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmscheduleuserssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camspmscheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmschedule);
}
else
{
this.FillData(res);
}
}
this.camspmscheduleForm.markAsUntouched();
this.camspmscheduleForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camspmscheduleForm.get('assetid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camspmscheduleForm.get('pmlocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camspmscheduleForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamspmscheduletask(event:any,scheduletaskid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmscheduletaskComponent, 
{
data:  {  showview:false,save:false,event,scheduletaskid, scheduleid,visiblelist:this.camspmscheduletasksvisiblelist,  hidelist:this.camspmscheduletaskshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmscheduletaskssource.add(res);
this.camspmscheduletaskssource.refresh();
}
else
{
this.camspmscheduletaskssource.update(event.data, res);
}
}
});
}

onDeletecamspmscheduletask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmscheduletaskIDs += childID + ",";
this.camspmscheduleservice.camspmscheduletasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmscheduleinstruction(event:any,scheduleinstructionid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmscheduleinstructionComponent, 
{
data:  {  showview:false,save:false,event,scheduleinstructionid, scheduleid,visiblelist:this.camspmscheduleinstructionsvisiblelist,  hidelist:this.camspmscheduleinstructionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmscheduleinstructionssource.add(res);
this.camspmscheduleinstructionssource.refresh();
}
else
{
this.camspmscheduleinstructionssource.update(event.data, res);
}
}
});
}

onDeletecamspmscheduleinstruction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmscheduleinstructionIDs += childID + ",";
this.camspmscheduleservice.camspmscheduleinstructions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmscheduleitem(event:any,scheduleitemid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmscheduleitemComponent, 
{
data:  {  showview:false,save:false,event,scheduleitemid, scheduleid,visiblelist:this.camspmscheduleitemsvisiblelist,  hidelist:this.camspmscheduleitemshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmscheduleitemssource.add(res);
this.camspmscheduleitemssource.refresh();
}
else
{
this.camspmscheduleitemssource.update(event.data, res);
}
}
});
}

onDeletecamspmscheduleitem(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmscheduleitemIDs += childID + ",";
this.camspmscheduleservice.camspmscheduleitems.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmschedulesuppliertask(event:any,schedulesupplierid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmschedulesuppliertaskComponent, 
{
data:  {  showview:false,save:false,event,schedulesupplierid, scheduleid,visiblelist:this.camspmschedulesuppliertasksvisiblelist,  hidelist:this.camspmschedulesuppliertaskshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmschedulesuppliertaskssource.add(res);
this.camspmschedulesuppliertaskssource.refresh();
}
else
{
this.camspmschedulesuppliertaskssource.update(event.data, res);
}
}
});
}

onDeletecamspmschedulesuppliertask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmschedulesuppliertaskIDs += childID + ",";
this.camspmscheduleservice.camspmschedulesuppliertasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmscheduleuser(event:any,scheduleuserid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmscheduleuserComponent, 
{
data:  {  showview:false,save:false,event,scheduleuserid, scheduleid,visiblelist:this.camspmscheduleusersvisiblelist,  hidelist:this.camspmscheduleusershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmscheduleuserssource.add(res);
this.camspmscheduleuserssource.refresh();
}
else
{
this.camspmscheduleuserssource.update(event.data, res);
}
}
});
}

onDeletecamspmscheduleuser(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmscheduleuserIDs += childID + ",";
this.camspmscheduleservice.camspmscheduleusers.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camspmscheduletasks
camspmscheduletaskssettings:any;
camspmscheduletaskssource: any;

showcamspmscheduletasksCheckbox()
{
debugger;
if(this.tblcamspmscheduletaskssource.settings['selectMode']== 'multi')this.tblcamspmscheduletaskssource.settings['selectMode']= 'single';
else
this.tblcamspmscheduletaskssource.settings['selectMode']= 'multi';
this.tblcamspmscheduletaskssource.initGrid();
}
deletecamspmscheduletasksAll()
{
this.tblcamspmscheduletaskssource.settings['selectMode'] = 'single';
}
showcamspmscheduletasksFilter()
{
  setTimeout(() => {
  this.SetcamspmscheduletasksTableddConfig();
  });
      if(this.tblcamspmscheduletaskssource.settings!=null)this.tblcamspmscheduletaskssource.settings['hideSubHeader'] =!this.tblcamspmscheduletaskssource.settings['hideSubHeader'];
this.tblcamspmscheduletaskssource.initGrid();
}
showcamspmscheduletasksInActive()
{
}
enablecamspmscheduletasksInActive()
{
}
async SetcamspmscheduletasksTableddConfig()
{
if(!this.bfilterPopulatecamspmscheduletasks){
}
this.bfilterPopulatecamspmscheduletasks=true;
}
async camspmscheduletasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmscheduletasksTableConfig()
{
this.camspmscheduletaskssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
pmtaskid: {
title: 'P M Task',
type: 'number',
filter:true,
},
taskdescription: {
title: 'Task Description',
type: '',
filter:true,
},
tasktype: {
title: 'Task Type',
type: '',
filter:true,
},
meterreadingstate: {
title: 'Meter Reading State',
type: '',
filter:true,
},
workhrs: {
title: 'Work Hrs',
type: '',
filter:true,
},
workperioddays: {
title: 'Work Period Days',
type: 'number',
filter:true,
},
orderno: {
title: 'Order No',
type: 'number',
filter:true,
},
predecessor: {
title: 'Predecessor',
type: '',
filter:true,
},
durationfromstart: {
title: 'Duration From Start',
type: '',
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
},
};
}
camspmscheduletasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduletasksID)>=0)
{
this.camspmscheduletaskssource=new LocalDataSource();
this.camspmscheduletaskssource.load(this.camspmscheduleservice.camspmscheduletasks as  any as LocalDataSource);
this.camspmscheduletaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmscheduletasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmscheduleservice.camspmscheduletasks.length == 0)
{
    this.tblcamspmscheduletaskssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmscheduletask();
    this.camspmscheduleservice.camspmscheduletasks.push(obj);
    this.camspmscheduletaskssource.refresh();
    if ((this.camspmscheduleservice.camspmscheduletasks.length / this.camspmscheduletaskssource.getPaging().perPage).toFixed(0) + 1 != this.camspmscheduletaskssource.getPaging().page)
    {
        this.camspmscheduletaskssource.setPage((this.camspmscheduleservice.camspmscheduletasks.length / this.camspmscheduletaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmscheduletaskssource.grid.edit(this.tblcamspmscheduletaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmscheduletaskssource.data.indexOf(event.data);
this.onDeletecamspmscheduletask(event,event.data.scheduletaskid,((this.camspmscheduletaskssource.getPaging().page-1) *this.camspmscheduletaskssource.getPaging().perPage)+index);
this.camspmscheduletaskssource.refresh();
break;
}
}

*/
camspmscheduletasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmscheduletask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmscheduletask(event,event.data.scheduletaskid,this.formid);
break;
case 'delete':
this.onDeletecamspmscheduletask(event,event.data.scheduletaskid,((this.camspmscheduletaskssource.getPaging().page-1) *this.camspmscheduletaskssource.getPaging().perPage)+event.index);
this.camspmscheduletaskssource.refresh();
break;
}
}
camspmscheduletasksonDelete(obj) {
let scheduletaskid=obj.data.scheduletaskid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmscheduleservice.deletecamspmschedule(scheduletaskid).then(res=>
this.camspmscheduletasksLoadTable()
);
}
}
camspmscheduletasksPaging(val)
{
debugger;
this.camspmscheduletaskssource.setPaging(1, val, true);
}

handlecamspmscheduletasksGridSelected(event:any) {
this.camspmscheduletasksselectedindex=this.camspmscheduleservice.camspmscheduletasks.findIndex(i => i.scheduletaskid === event.data.scheduletaskid);
}
IscamspmscheduletasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduletasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmscheduletasks
//start of Grid Codes camspmscheduleinstructions
camspmscheduleinstructionssettings:any;
camspmscheduleinstructionssource: any;

showcamspmscheduleinstructionsCheckbox()
{
debugger;
if(this.tblcamspmscheduleinstructionssource.settings['selectMode']== 'multi')this.tblcamspmscheduleinstructionssource.settings['selectMode']= 'single';
else
this.tblcamspmscheduleinstructionssource.settings['selectMode']= 'multi';
this.tblcamspmscheduleinstructionssource.initGrid();
}
deletecamspmscheduleinstructionsAll()
{
this.tblcamspmscheduleinstructionssource.settings['selectMode'] = 'single';
}
showcamspmscheduleinstructionsFilter()
{
  setTimeout(() => {
  this.SetcamspmscheduleinstructionsTableddConfig();
  });
      if(this.tblcamspmscheduleinstructionssource.settings!=null)this.tblcamspmscheduleinstructionssource.settings['hideSubHeader'] =!this.tblcamspmscheduleinstructionssource.settings['hideSubHeader'];
this.tblcamspmscheduleinstructionssource.initGrid();
}
showcamspmscheduleinstructionsInActive()
{
}
enablecamspmscheduleinstructionsInActive()
{
}
async SetcamspmscheduleinstructionsTableddConfig()
{
if(!this.bfilterPopulatecamspmscheduleinstructions){
}
this.bfilterPopulatecamspmscheduleinstructions=true;
}
async camspmscheduleinstructionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmscheduleinstructionsTableConfig()
{
this.camspmscheduleinstructionssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
code: {
title: 'Code',
type: '',
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
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
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
},
};
}
camspmscheduleinstructionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleinstructionsID)>=0)
{
this.camspmscheduleinstructionssource=new LocalDataSource();
this.camspmscheduleinstructionssource.load(this.camspmscheduleservice.camspmscheduleinstructions as  any as LocalDataSource);
this.camspmscheduleinstructionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmscheduleinstructionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmscheduleservice.camspmscheduleinstructions.length == 0)
{
    this.tblcamspmscheduleinstructionssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmscheduleinstruction();
    this.camspmscheduleservice.camspmscheduleinstructions.push(obj);
    this.camspmscheduleinstructionssource.refresh();
    if ((this.camspmscheduleservice.camspmscheduleinstructions.length / this.camspmscheduleinstructionssource.getPaging().perPage).toFixed(0) + 1 != this.camspmscheduleinstructionssource.getPaging().page)
    {
        this.camspmscheduleinstructionssource.setPage((this.camspmscheduleservice.camspmscheduleinstructions.length / this.camspmscheduleinstructionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmscheduleinstructionssource.grid.edit(this.tblcamspmscheduleinstructionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmscheduleinstructionssource.data.indexOf(event.data);
this.onDeletecamspmscheduleinstruction(event,event.data.scheduleinstructionid,((this.camspmscheduleinstructionssource.getPaging().page-1) *this.camspmscheduleinstructionssource.getPaging().perPage)+index);
this.camspmscheduleinstructionssource.refresh();
break;
}
}

*/
camspmscheduleinstructionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmscheduleinstruction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmscheduleinstruction(event,event.data.scheduleinstructionid,this.formid);
break;
case 'delete':
this.onDeletecamspmscheduleinstruction(event,event.data.scheduleinstructionid,((this.camspmscheduleinstructionssource.getPaging().page-1) *this.camspmscheduleinstructionssource.getPaging().perPage)+event.index);
this.camspmscheduleinstructionssource.refresh();
break;
}
}
camspmscheduleinstructionsonDelete(obj) {
let scheduleinstructionid=obj.data.scheduleinstructionid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmscheduleservice.deletecamspmschedule(scheduleinstructionid).then(res=>
this.camspmscheduleinstructionsLoadTable()
);
}
}
camspmscheduleinstructionsPaging(val)
{
debugger;
this.camspmscheduleinstructionssource.setPaging(1, val, true);
}

handlecamspmscheduleinstructionsGridSelected(event:any) {
this.camspmscheduleinstructionsselectedindex=this.camspmscheduleservice.camspmscheduleinstructions.findIndex(i => i.scheduleinstructionid === event.data.scheduleinstructionid);
}
IscamspmscheduleinstructionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleinstructionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmscheduleinstructions
//start of Grid Codes camspmscheduleitems
camspmscheduleitemssettings:any;
camspmscheduleitemssource: any;

showcamspmscheduleitemsCheckbox()
{
debugger;
if(this.tblcamspmscheduleitemssource.settings['selectMode']== 'multi')this.tblcamspmscheduleitemssource.settings['selectMode']= 'single';
else
this.tblcamspmscheduleitemssource.settings['selectMode']= 'multi';
this.tblcamspmscheduleitemssource.initGrid();
}
deletecamspmscheduleitemsAll()
{
this.tblcamspmscheduleitemssource.settings['selectMode'] = 'single';
}
showcamspmscheduleitemsFilter()
{
  setTimeout(() => {
  this.SetcamspmscheduleitemsTableddConfig();
  });
      if(this.tblcamspmscheduleitemssource.settings!=null)this.tblcamspmscheduleitemssource.settings['hideSubHeader'] =!this.tblcamspmscheduleitemssource.settings['hideSubHeader'];
this.tblcamspmscheduleitemssource.initGrid();
}
showcamspmscheduleitemsInActive()
{
}
enablecamspmscheduleitemsInActive()
{
}
async SetcamspmscheduleitemsTableddConfig()
{
if(!this.bfilterPopulatecamspmscheduleitems){
}
this.bfilterPopulatecamspmscheduleitems=true;
}
async camspmscheduleitemsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmscheduleitemsTableConfig()
{
this.camspmscheduleitemssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
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
},
};
}
camspmscheduleitemsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleitemsID)>=0)
{
this.camspmscheduleitemssource=new LocalDataSource();
this.camspmscheduleitemssource.load(this.camspmscheduleservice.camspmscheduleitems as  any as LocalDataSource);
this.camspmscheduleitemssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmscheduleitemsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmscheduleservice.camspmscheduleitems.length == 0)
{
    this.tblcamspmscheduleitemssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmscheduleitem();
    this.camspmscheduleservice.camspmscheduleitems.push(obj);
    this.camspmscheduleitemssource.refresh();
    if ((this.camspmscheduleservice.camspmscheduleitems.length / this.camspmscheduleitemssource.getPaging().perPage).toFixed(0) + 1 != this.camspmscheduleitemssource.getPaging().page)
    {
        this.camspmscheduleitemssource.setPage((this.camspmscheduleservice.camspmscheduleitems.length / this.camspmscheduleitemssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmscheduleitemssource.grid.edit(this.tblcamspmscheduleitemssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmscheduleitemssource.data.indexOf(event.data);
this.onDeletecamspmscheduleitem(event,event.data.scheduleitemid,((this.camspmscheduleitemssource.getPaging().page-1) *this.camspmscheduleitemssource.getPaging().perPage)+index);
this.camspmscheduleitemssource.refresh();
break;
}
}

*/
camspmscheduleitemsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmscheduleitem(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmscheduleitem(event,event.data.scheduleitemid,this.formid);
break;
case 'delete':
this.onDeletecamspmscheduleitem(event,event.data.scheduleitemid,((this.camspmscheduleitemssource.getPaging().page-1) *this.camspmscheduleitemssource.getPaging().perPage)+event.index);
this.camspmscheduleitemssource.refresh();
break;
}
}
camspmscheduleitemsonDelete(obj) {
let scheduleitemid=obj.data.scheduleitemid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmscheduleservice.deletecamspmschedule(scheduleitemid).then(res=>
this.camspmscheduleitemsLoadTable()
);
}
}
camspmscheduleitemsPaging(val)
{
debugger;
this.camspmscheduleitemssource.setPaging(1, val, true);
}

handlecamspmscheduleitemsGridSelected(event:any) {
this.camspmscheduleitemsselectedindex=this.camspmscheduleservice.camspmscheduleitems.findIndex(i => i.scheduleitemid === event.data.scheduleitemid);
}
IscamspmscheduleitemsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleitemsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmscheduleitems
//start of Grid Codes camspmschedulesuppliertasks
camspmschedulesuppliertaskssettings:any;
camspmschedulesuppliertaskssource: any;

showcamspmschedulesuppliertasksCheckbox()
{
debugger;
if(this.tblcamspmschedulesuppliertaskssource.settings['selectMode']== 'multi')this.tblcamspmschedulesuppliertaskssource.settings['selectMode']= 'single';
else
this.tblcamspmschedulesuppliertaskssource.settings['selectMode']= 'multi';
this.tblcamspmschedulesuppliertaskssource.initGrid();
}
deletecamspmschedulesuppliertasksAll()
{
this.tblcamspmschedulesuppliertaskssource.settings['selectMode'] = 'single';
}
showcamspmschedulesuppliertasksFilter()
{
  setTimeout(() => {
  this.SetcamspmschedulesuppliertasksTableddConfig();
  });
      if(this.tblcamspmschedulesuppliertaskssource.settings!=null)this.tblcamspmschedulesuppliertaskssource.settings['hideSubHeader'] =!this.tblcamspmschedulesuppliertaskssource.settings['hideSubHeader'];
this.tblcamspmschedulesuppliertaskssource.initGrid();
}
showcamspmschedulesuppliertasksInActive()
{
}
enablecamspmschedulesuppliertasksInActive()
{
}
async SetcamspmschedulesuppliertasksTableddConfig()
{
if(!this.bfilterPopulatecamspmschedulesuppliertasks){
}
this.bfilterPopulatecamspmschedulesuppliertasks=true;
}
async camspmschedulesuppliertasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmschedulesuppliertasksTableConfig()
{
this.camspmschedulesuppliertaskssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
taskdescription: {
title: 'Task Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
tasktype: {
title: 'Task Type',
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
camspmschedulesuppliertasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmschedulesuppliertasksID)>=0)
{
this.camspmschedulesuppliertaskssource=new LocalDataSource();
this.camspmschedulesuppliertaskssource.load(this.camspmscheduleservice.camspmschedulesuppliertasks as  any as LocalDataSource);
this.camspmschedulesuppliertaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmschedulesuppliertasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmscheduleservice.camspmschedulesuppliertasks.length == 0)
{
    this.tblcamspmschedulesuppliertaskssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmschedulesuppliertask();
    this.camspmscheduleservice.camspmschedulesuppliertasks.push(obj);
    this.camspmschedulesuppliertaskssource.refresh();
    if ((this.camspmscheduleservice.camspmschedulesuppliertasks.length / this.camspmschedulesuppliertaskssource.getPaging().perPage).toFixed(0) + 1 != this.camspmschedulesuppliertaskssource.getPaging().page)
    {
        this.camspmschedulesuppliertaskssource.setPage((this.camspmscheduleservice.camspmschedulesuppliertasks.length / this.camspmschedulesuppliertaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmschedulesuppliertaskssource.grid.edit(this.tblcamspmschedulesuppliertaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmschedulesuppliertaskssource.data.indexOf(event.data);
this.onDeletecamspmschedulesuppliertask(event,event.data.schedulesupplierid,((this.camspmschedulesuppliertaskssource.getPaging().page-1) *this.camspmschedulesuppliertaskssource.getPaging().perPage)+index);
this.camspmschedulesuppliertaskssource.refresh();
break;
}
}

*/
camspmschedulesuppliertasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmschedulesuppliertask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmschedulesuppliertask(event,event.data.schedulesupplierid,this.formid);
break;
case 'delete':
this.onDeletecamspmschedulesuppliertask(event,event.data.schedulesupplierid,((this.camspmschedulesuppliertaskssource.getPaging().page-1) *this.camspmschedulesuppliertaskssource.getPaging().perPage)+event.index);
this.camspmschedulesuppliertaskssource.refresh();
break;
}
}
camspmschedulesuppliertasksonDelete(obj) {
let schedulesupplierid=obj.data.schedulesupplierid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmscheduleservice.deletecamspmschedule(schedulesupplierid).then(res=>
this.camspmschedulesuppliertasksLoadTable()
);
}
}
camspmschedulesuppliertasksPaging(val)
{
debugger;
this.camspmschedulesuppliertaskssource.setPaging(1, val, true);
}

handlecamspmschedulesuppliertasksGridSelected(event:any) {
this.camspmschedulesuppliertasksselectedindex=this.camspmscheduleservice.camspmschedulesuppliertasks.findIndex(i => i.schedulesupplierid === event.data.schedulesupplierid);
}
IscamspmschedulesuppliertasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmschedulesuppliertasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmschedulesuppliertasks
//start of Grid Codes camspmscheduleusers
camspmscheduleuserssettings:any;
camspmscheduleuserssource: any;

showcamspmscheduleusersCheckbox()
{
debugger;
if(this.tblcamspmscheduleuserssource.settings['selectMode']== 'multi')this.tblcamspmscheduleuserssource.settings['selectMode']= 'single';
else
this.tblcamspmscheduleuserssource.settings['selectMode']= 'multi';
this.tblcamspmscheduleuserssource.initGrid();
}
deletecamspmscheduleusersAll()
{
this.tblcamspmscheduleuserssource.settings['selectMode'] = 'single';
}
showcamspmscheduleusersFilter()
{
  setTimeout(() => {
  this.SetcamspmscheduleusersTableddConfig();
  });
      if(this.tblcamspmscheduleuserssource.settings!=null)this.tblcamspmscheduleuserssource.settings['hideSubHeader'] =!this.tblcamspmscheduleuserssource.settings['hideSubHeader'];
this.tblcamspmscheduleuserssource.initGrid();
}
showcamspmscheduleusersInActive()
{
}
enablecamspmscheduleusersInActive()
{
}
async SetcamspmscheduleusersTableddConfig()
{
if(!this.bfilterPopulatecamspmscheduleusers){
}
this.bfilterPopulatecamspmscheduleusers=true;
}
async camspmscheduleusersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmscheduleusersTableConfig()
{
this.camspmscheduleuserssettings = {
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
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
type: 'number',
filter:true,
},
tat: {
title: 'T A T',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
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
camspmscheduleusersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleusersID)>=0)
{
this.camspmscheduleuserssource=new LocalDataSource();
this.camspmscheduleuserssource.load(this.camspmscheduleservice.camspmscheduleusers as  any as LocalDataSource);
this.camspmscheduleuserssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmscheduleusersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmscheduleservice.camspmscheduleusers.length == 0)
{
    this.tblcamspmscheduleuserssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmscheduleuser();
    this.camspmscheduleservice.camspmscheduleusers.push(obj);
    this.camspmscheduleuserssource.refresh();
    if ((this.camspmscheduleservice.camspmscheduleusers.length / this.camspmscheduleuserssource.getPaging().perPage).toFixed(0) + 1 != this.camspmscheduleuserssource.getPaging().page)
    {
        this.camspmscheduleuserssource.setPage((this.camspmscheduleservice.camspmscheduleusers.length / this.camspmscheduleuserssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmscheduleuserssource.grid.edit(this.tblcamspmscheduleuserssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmscheduleuserssource.data.indexOf(event.data);
this.onDeletecamspmscheduleuser(event,event.data.scheduleuserid,((this.camspmscheduleuserssource.getPaging().page-1) *this.camspmscheduleuserssource.getPaging().perPage)+index);
this.camspmscheduleuserssource.refresh();
break;
}
}

*/
camspmscheduleusersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmscheduleuser(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmscheduleuser(event,event.data.scheduleuserid,this.formid);
break;
case 'delete':
this.onDeletecamspmscheduleuser(event,event.data.scheduleuserid,((this.camspmscheduleuserssource.getPaging().page-1) *this.camspmscheduleuserssource.getPaging().perPage)+event.index);
this.camspmscheduleuserssource.refresh();
break;
}
}
camspmscheduleusersonDelete(obj) {
let scheduleuserid=obj.data.scheduleuserid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmscheduleservice.deletecamspmschedule(scheduleuserid).then(res=>
this.camspmscheduleusersLoadTable()
);
}
}
camspmscheduleusersPaging(val)
{
debugger;
this.camspmscheduleuserssource.setPaging(1, val, true);
}

handlecamspmscheduleusersGridSelected(event:any) {
this.camspmscheduleusersselectedindex=this.camspmscheduleservice.camspmscheduleusers.findIndex(i => i.scheduleuserid === event.data.scheduleuserid);
}
IscamspmscheduleusersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmscheduleusersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmscheduleusers

}



