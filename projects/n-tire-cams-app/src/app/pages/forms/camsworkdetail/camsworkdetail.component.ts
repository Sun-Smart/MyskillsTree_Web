import { camsworkdetailService } from './../../../service/camsworkdetail.service';
import { camsworkdetail } from './../../../model/camsworkdetail.model';
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
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { camspmtask} from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { camsworktimelog } from './../../../model/camsworktimelog.model';
import { camsworktimelogComponent } from './../../../pages/forms/camsworktimelog/camsworktimelog.component';
//FK services
import { camsworkinstruction } from './../../../model/camsworkinstruction.model';
import { camsworkinstructionComponent } from './../../../pages/forms/camsworkinstruction/camsworkinstruction.component';
//FK services
import { camsworkitem } from './../../../model/camsworkitem.model';
import { camsworkitemComponent } from './../../../pages/forms/camsworkitem/camsworkitem.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
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
selector: 'app-camsworkdetail',
templateUrl: './camsworkdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkdetailComponent implements OnInit {
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
bfilterPopulatecamsworkdetails:boolean=false;
datacamsworkdetailsworkorderid3:any=[];
datacamsworkdetailspmid3:any=[];
datacamsworkdetailspmtaskid3:any=[];
datacamsworkdetailstasktype3:any=[];
datacamsworkdetailsuserid3:any=[];
datacamsworkdetailslostrate3:any=[];
datacamsworkdetailsworkstatus3:any=[];
datacamsworktimelogspmtaskid3:any=[];
datacamsworktimelogsuserid3:any=[];
datacamsworktimelogspmid3:any=[];
datacamsworktimelogsworkorderdetailid3:any=[];
datacamsworktimelogstasktype3:any=[];
datacamsworktimelogsworkorderid3:any=[];
bfilterPopulatecamsworktimelogs:boolean=false;
datacamsworkinstructionsworkorderdetailid3:any=[];
datacamsworkinstructionsworkorderid3:any=[];
datacamsworkinstructionspmid3:any=[];
bfilterPopulatecamsworkinstructions:boolean=false;
datacamsworkitemsitemid3:any=[];
datacamsworkitemspmid3:any=[];
datacamsworkitemsworkorderid3:any=[];
datacamsworkitemsworkorderdetailid3:any=[];
bfilterPopulatecamsworkitems:boolean=false;
@ViewChild('tblcamsworktimelogssource',{static:false}) tblcamsworktimelogssource: Ng2SmartTableComponent;
@ViewChild('tblcamsworkinstructionssource',{static:false}) tblcamsworkinstructionssource: Ng2SmartTableComponent;
@ViewChild('tblcamsworkitemssource',{static:false}) tblcamsworkitemssource: Ng2SmartTableComponent;
 camsworkdetailForm: FormGroup;
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
pmtaskidList: camspmtask[];
pmtaskidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmtaskid_camspmtasksForm: FormGroup;//autocomplete
pmtaskid_camspmtasksoptions:any;//autocomplete
pmtaskid_camspmtasksformatter:any;//autocomplete
tasktypeList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
lostrateList: boconfigvalue[];
workstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsworkdetailshowOption:boolean;
camsworktimelogshowOption:boolean;
camsworkinstructionshowOption:boolean;
camsworkitemshowOption:boolean;
sessiondata:any;
sourcekey:any;

scheduleidvisible:boolean = false;
scheduletaskidvisible:boolean = false;


camsworktimelogsvisiblelist:any;
camsworktimelogshidelist:any;
camsworkinstructionsvisiblelist:any;
camsworkinstructionshidelist:any;
camsworkitemsvisiblelist:any;
camsworkitemshidelist:any;

DeletedcamsworktimelogIDs: string="";
camsworktimelogsID: string = "1";
camsworktimelogsselectedindex:any;
DeletedcamsworkinstructionIDs: string="";
camsworkinstructionsID: string = "2";
camsworkinstructionsselectedindex:any;
DeletedcamsworkitemIDs: string="";
camsworkitemsID: string = "3";
camsworkitemsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsworkdetailservice: camsworkdetailService,
private camspmtaskservice: camspmtaskService,
private bousermasterservice: bousermasterService,
private camspmmasterservice: camspmmasterService,
private camsworkorderservice: camsworkorderService,
private erpitemmasterservice: erpitemmasterService,
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
this.camsworkdetailForm  = this.fb.group({
pk:[null],
workorderdetailid: [null],
workorderid: [null],
workorderiddesc: [null],
pmid: [null, Validators.required],
pmiddesc: [null],
pmtaskid: [null, Validators.required],
pmtaskiddesc: [null],
taskdescription: [null, Validators.required],
tasktype: [null],
tasktypedesc: [null],
meterreading: [null],
workhrs: [null],
workperioddays: [null],
orderno: [null],
predecessor: [null],
remarks: [null],
userid: [null],
useriddesc: [null],
labourrate: [null],
plannedstartdate: [null],
plannedenddate: [null],
actualstartdate: [null],
actualenddate: [null],
delayedstart: [null],
actualworkhrs: [null],
travelduration: [null],
travelrate: [null],
losttime: [null],
lostrate: [null],
lostratedesc: [null],
workstatus: [null],
workstatusdesc: [null],
status: [null],
statusdesc: [null],
scheduleid: [null],
scheduletaskid: [null],
});
}

get f() { return this.camsworkdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkdetailForm.dirty && this.camsworkdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workorderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workorderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workorderdetailid && pkDetail) {
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
let camsworkdetailid = null;

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
this.formid=camsworkdetailid;
//this.sharedService.alert(camsworkdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamsworktimelogsTableConfig();
  setTimeout(() => {
  this.SetcamsworktimelogsTableddConfig();
  });

this.SetcamsworkinstructionsTableConfig();
  setTimeout(() => {
  this.SetcamsworkinstructionsTableddConfig();
  });

this.SetcamsworkitemsTableConfig();
  setTimeout(() => {
  this.SetcamsworkitemsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsworkdetailservice.formData && this.camsworkdetailservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsworkdetailForm.patchValue({
    workorderid: this.camsworkdetailservice.formData.workorderid,
    workorderiddesc: this.camsworkdetailservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsworkdetailForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_camsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.requestreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_camsworkordersformatter = (result: any) => result.requestreference;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camsworkdetailservice.formData && this.camsworkdetailservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camsworkdetailForm.patchValue({
    pmid: this.camsworkdetailservice.formData.pmid,
    pmiddesc: this.camsworkdetailservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camsworkdetailForm.get('pmid').value);
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
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.pmtaskidList = res as camspmtask[];
if(this.camsworkdetailservice.formData && this.camsworkdetailservice.formData.pmtaskid){this.camsworkdetailForm.patchValue({
    pmtaskid: this.camsworkdetailservice.formData.pmtaskid,
    pmtaskiddesc: this.camsworkdetailservice.formData.pmtaskiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmtaskid_camspmtasksoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmtaskidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmtaskid_camspmtasksformatter = (result: any) => result.description;
this.configservice.getList("camstasktype").then(res => this.tasktypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.camsworkdetailservice.formData && this.camsworkdetailservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.camsworkdetailForm.patchValue({
    userid: this.camsworkdetailservice.formData.userid,
    useriddesc: this.camsworkdetailservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.camsworkdetailForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("lostrate").then(res => this.lostrateList = res as boconfigvalue[]);
this.configservice.getList("camsworkstatus").then(res => this.workstatusList = res as boconfigvalue[]);

//autocomplete
    this.camsworkdetailservice.getcamsworkdetailsList().then(res => {
      this.pkList = res as camsworkdetail[];
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
this.camsworkdetailForm.markAsUntouched();
this.camsworkdetailForm.markAsPristine();
}
onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsworkdetailForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camsworkdetailForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});
this.camspmtaskservice.getListBypmid(pmidDetail.pmid).then(res => {
 this.pmtaskidList = res as camspmtask[]
}).catch((err) => {console.log(err);});

}
}

onSelectedpmtaskid(pmtaskidDetail: any) {
if (pmtaskidDetail.pmtaskid && pmtaskidDetail) {
this.camsworkdetailForm.patchValue({
pmtaskid: pmtaskidDetail.pmtaskid,
pmtaskiddesc: pmtaskidDetail.description,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.camsworkdetailForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.camsworkdetailForm != null)
this.camsworkdetailForm.reset();
this.camsworkdetailForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.camsworkdetailservice.camsworktimelogs=[];
this.camsworktimelogsLoadTable();
this.camsworkdetailservice.camsworkinstructions=[];
this.camsworkinstructionsLoadTable();
this.camsworkdetailservice.camsworkitems=[];
this.camsworkitemsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.scheduleidvisible = false;
this.scheduletaskidvisible = false;
}

    onDelete() {
        let workorderdetailid = this.camsworkdetailForm.get('workorderdetailid').value;
        if(workorderdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkdetailservice.deletecamsworkdetail(workorderdetailid).then(res =>
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
    this.camsworkdetailForm.patchValue({
        workorderdetailid: null
    });
    if(this.camsworkdetailservice.formData.workorderdetailid!=null)this.camsworkdetailservice.formData.workorderdetailid=null;
for (let i=0;i<this.camsworkdetailservice.camsworktimelogs.length;i++) {
this.camsworkdetailservice.camsworktimelogs[i].logid=null;
}
for (let i=0;i<this.camsworkdetailservice.camsworkinstructions.length;i++) {
this.camsworkdetailservice.camsworkinstructions[i].workinstructionid=null;
}
for (let i=0;i<this.camsworkdetailservice.camsworkitems.length;i++) {
this.camsworkdetailservice.camsworkitems[i].workorderitemid=null;
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
        else if(key=="remarks")
this.camsworkdetailForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(key=="plannedstartdate")
this.camsworkdetailForm.patchValue({"plannedstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="plannedenddate")
this.camsworkdetailForm.patchValue({"plannedenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualstartdate")
this.camsworkdetailForm.patchValue({"actualstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualenddate")
this.camsworkdetailForm.patchValue({"actualenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.camsworkdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkdetailForm.controls[key]!=undefined)
{
this.camsworkdetailForm.controls[key].disable({onlySelf: true});
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
workorderdetailidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
pmtaskidonChange(evt:any){
let e=evt.value;
}
taskdescriptiononChange(evt:any){
let e=evt.value;
}
tasktypeonChange(evt:any){
let e=this.f.tasktype.value as any;
this.camsworkdetailForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
meterreadingonChange(evt:any){
let e=evt.value;
}
workhrsonChange(evt:any){
let e=evt.value;
}
workperioddaysonChange(evt:any){
let e=evt.value;
}
ordernoonChange(evt:any){
let e=evt.value;
}
predecessoronChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
labourrateonChange(evt:any){
let e=evt.value;
}
plannedstartdateonChange(evt:any){
let e=evt.value;
}
plannedenddateonChange(evt:any){
let e=evt.value;
}
actualstartdateonChange(evt:any){
let e=evt.value;
}
actualenddateonChange(evt:any){
let e=evt.value;
}
delayedstartonChange(evt:any){
let e=evt.value;
}
actualworkhrsonChange(evt:any){
let e=evt.value;
}
traveldurationonChange(evt:any){
let e=evt.value;
}
travelrateonChange(evt:any){
let e=evt.value;
}
losttimeonChange(evt:any){
let e=evt.value;
}
lostrateonChange(evt:any){
let e=this.f.lostrate.value as any;
this.camsworkdetailForm.patchValue({lostratedesc:evt.options[evt.options.selectedIndex].text});
}
workstatusonChange(evt:any){
let e=this.f.workstatus.value as any;
this.camsworkdetailForm.patchValue({workstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
scheduletaskidonChange(evt:any){
let e=evt.value;
}

editcamsworkdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkdetailservice.getcamsworkdetailsByEID(pkcol).then(res => {

this.camsworkdetailservice.formData=res.camsworkdetail;
let formproperty=res.camsworkdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkdetail.pkcol;
this.formid=res.camsworkdetail.workorderdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkdetail.workorderdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkdetailForm.patchValue({
workorderdetailid: res.camsworkdetail.workorderdetailid,
workorderid: res.camsworkdetail.workorderid,
workorderiddesc: res.camsworkdetail.workorderiddesc,
pmid: res.camsworkdetail.pmid,
pmiddesc: res.camsworkdetail.pmiddesc,
pmtaskid: res.camsworkdetail.pmtaskid,
pmtaskiddesc: res.camsworkdetail.pmtaskiddesc,
taskdescription: res.camsworkdetail.taskdescription,
tasktype: res.camsworkdetail.tasktype,
tasktypedesc: res.camsworkdetail.tasktypedesc,
meterreading: res.camsworkdetail.meterreading,
workhrs: res.camsworkdetail.workhrs,
workperioddays: res.camsworkdetail.workperioddays,
orderno: res.camsworkdetail.orderno,
predecessor: res.camsworkdetail.predecessor,
remarks: JSON.parse(res.camsworkdetail.remarks),
userid: res.camsworkdetail.userid,
useriddesc: res.camsworkdetail.useriddesc,
labourrate: res.camsworkdetail.labourrate,
plannedstartdate: this.ngbDateParserFormatter.parse(res.camsworkdetail.plannedstartdate),
plannedenddate: this.ngbDateParserFormatter.parse(res.camsworkdetail.plannedenddate),
actualstartdate: this.ngbDateParserFormatter.parse(res.camsworkdetail.actualstartdate),
actualenddate: this.ngbDateParserFormatter.parse(res.camsworkdetail.actualenddate),
delayedstart: res.camsworkdetail.delayedstart,
actualworkhrs: res.camsworkdetail.actualworkhrs,
travelduration: res.camsworkdetail.travelduration,
travelrate: res.camsworkdetail.travelrate,
losttime: res.camsworkdetail.losttime,
lostrate: res.camsworkdetail.lostrate,
lostratedesc: res.camsworkdetail.lostratedesc,
workstatus: res.camsworkdetail.workstatus,
workstatusdesc: res.camsworkdetail.workstatusdesc,
status: res.camsworkdetail.status,
statusdesc: res.camsworkdetail.statusdesc,
scheduleid: res.camsworkdetail.scheduleid,
scheduletaskid: res.camsworkdetail.scheduletaskid,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("scheduleid")>=0)this.scheduleidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("scheduleid")>=0)this.scheduleidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("scheduletaskid")>=0)this.scheduletaskidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("scheduletaskid")>=0)this.scheduletaskidvisible = false;
this.camsworktimelogsvisiblelist=res.camsworktimelogsvisiblelist;
this.camsworkinstructionsvisiblelist=res.camsworkinstructionsvisiblelist;
this.camsworkitemsvisiblelist=res.camsworkitemsvisiblelist;
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.pmtaskidList = res as camspmtask[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.camsworkdetailservice.camsworktimelogs = res.camsworktimelogs;
this.SetcamsworktimelogsTableConfig();
this.camsworktimelogsLoadTable();
  setTimeout(() => {
  this.SetcamsworktimelogsTableddConfig();
  });
this.camsworkdetailservice.camsworkinstructions = res.camsworkinstructions;
this.SetcamsworkinstructionsTableConfig();
this.camsworkinstructionsLoadTable();
  setTimeout(() => {
  this.SetcamsworkinstructionsTableddConfig();
  });
this.camsworkdetailservice.camsworkitems = res.camsworkitems;
this.SetcamsworkitemsTableConfig();
this.camsworkitemsLoadTable();
  setTimeout(() => {
  this.SetcamsworkitemsTableddConfig();
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
  for (let key in this.camsworkdetailForm.controls) {
    if (this.camsworkdetailForm.controls[key] != null) {
if(false)
{
if(this.camsworkdetailservice.formData!=null && this.camsworkdetailservice.formData[key]!=null  && this.camsworkdetailservice.formData[key]!='[]' && this.camsworkdetailservice.formData[key]!=undefined && this.camsworkdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkdetailservice.formData!=null && this.camsworkdetailservice.formData[key]!=null   && this.camsworkdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkdetailservice.formData!=null && this.camsworkdetailservice.formData[key]!=null   && this.camsworkdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkdetailservice.formData[key]+"'><div class='progress__number'>"+this.camsworkdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsworkdetailForm.value;
if(this.camsworkdetailForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsworkdetailForm.get('remarks').value);
obj.plannedstartdate=new Date(this.camsworkdetailForm.get('plannedstartdate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('plannedstartdate').value)+'  UTC' :null);
obj.plannedenddate=new Date(this.camsworkdetailForm.get('plannedenddate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('plannedenddate').value)+'  UTC' :null);
obj.actualstartdate=new Date(this.camsworkdetailForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('actualstartdate').value)+'  UTC' :null);
obj.actualenddate=new Date(this.camsworkdetailForm.get('actualenddate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('actualenddate').value)+'  UTC' :null);
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

private camsworkdetailtoggleOption(){
this.camsworkdetailshowOption = this.camsworkdetailshowOption === true ? false : true;
}

private camsworktimelogtoggleOption(){
this.camsworktimelogshowOption = this.camsworktimelogshowOption === true ? false : true;
}

private camsworkinstructiontoggleOption(){
this.camsworkinstructionshowOption = this.camsworkinstructionshowOption === true ? false : true;
}

private camsworkitemtoggleOption(){
this.camsworkitemshowOption = this.camsworkitemshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkdetailservice.formData=this.camsworkdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkdetailForm.controls[key] != null)
    {
        this.camsworkdetailservice.formData[key] = this.camsworkdetailForm.controls[key].value;
    }
}
}
}
if(this.camsworkdetailForm.get('remarks').value!=null)this.camsworkdetailservice.formData.remarks=JSON.stringify(this.camsworkdetailForm.get('remarks').value);
this.camsworkdetailservice.formData.plannedstartdate=new Date(this.camsworkdetailForm.get('plannedstartdate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('plannedstartdate').value)+'  UTC' :null);
this.camsworkdetailservice.formData.plannedenddate=new Date(this.camsworkdetailForm.get('plannedenddate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('plannedenddate').value)+'  UTC' :null);
this.camsworkdetailservice.formData.actualstartdate=new Date(this.camsworkdetailForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('actualstartdate').value)+'  UTC' :null);
this.camsworkdetailservice.formData.actualenddate=new Date(this.camsworkdetailForm.get('actualenddate').value ? this.ngbDateParserFormatter.format(this.camsworkdetailForm.get('actualenddate').value)+'  UTC' :null);
this.camsworkdetailservice.formData.DeletedcamsworktimelogIDs = this.DeletedcamsworktimelogIDs;
this.camsworkdetailservice.formData.DeletedcamsworkinstructionIDs = this.DeletedcamsworkinstructionIDs;
this.camsworkdetailservice.formData.DeletedcamsworkitemIDs = this.DeletedcamsworkitemIDs;
console.log(this.camsworkdetailservice.formData);
this.camsworkdetailservice.formData=this.camsworkdetailForm.value;
this.camsworkdetailservice.saveOrUpdatecamsworkdetails().subscribe(
async res => {
if (this.camsworktimelogssource.data)
{
    for (let i = 0; i < this.camsworktimelogssource.data.length; i++)
    {
        if (this.camsworktimelogssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworktimelogssource.data[i].fileattachmentlist);
    }
}
if (this.camsworkinstructionssource.data)
{
    for (let i = 0; i < this.camsworkinstructionssource.data.length; i++)
    {
        if (this.camsworkinstructionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworkinstructionssource.data[i].fileattachmentlist);
    }
}
if (this.camsworkitemssource.data)
{
    for (let i = 0; i < this.camsworkitemssource.data.length; i++)
    {
        if (this.camsworkitemssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworkitemssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkdetail);
}
else
{
this.FillData(res);
}
}
this.camsworkdetailForm.markAsUntouched();
this.camsworkdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsworkdetailForm.get('workorderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camsworkdetailForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmtaskid( pmtaskid) {
/*let ScreenType='2';
this.dialog.open(camspmtaskComponent, 
{
data: {pmtaskid:this.camsworkdetailForm.get('pmtaskid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsworkdetailForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamsworktimelog(event:any,logid:any, workorderdetailid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworktimelogComponent, 
{
data:  {  showview:false,save:false,event,logid, workorderdetailid,visiblelist:this.camsworktimelogsvisiblelist,  hidelist:this.camsworktimelogshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworktimelogssource.add(res);
this.camsworktimelogssource.refresh();
}
else
{
this.camsworktimelogssource.update(event.data, res);
}
}
});
}

onDeletecamsworktimelog(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworktimelogIDs += childID + ",";
this.camsworkdetailservice.camsworktimelogs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsworkinstruction(event:any,workinstructionid:any, workorderdetailid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworkinstructionComponent, 
{
data:  {  showview:false,save:false,event,workinstructionid, workorderdetailid,visiblelist:this.camsworkinstructionsvisiblelist,  hidelist:this.camsworkinstructionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworkinstructionssource.add(res);
this.camsworkinstructionssource.refresh();
}
else
{
this.camsworkinstructionssource.update(event.data, res);
}
}
});
}

onDeletecamsworkinstruction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworkinstructionIDs += childID + ",";
this.camsworkdetailservice.camsworkinstructions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsworkitem(event:any,workorderitemid:any, workorderdetailid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworkitemComponent, 
{
data:  {  showview:false,save:false,event,workorderitemid, workorderdetailid,visiblelist:this.camsworkitemsvisiblelist,  hidelist:this.camsworkitemshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworkitemssource.add(res);
this.camsworkitemssource.refresh();
}
else
{
this.camsworkitemssource.update(event.data, res);
}
}
});
}

onDeletecamsworkitem(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworkitemIDs += childID + ",";
this.camsworkdetailservice.camsworkitems.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camsworktimelogs
camsworktimelogssettings:any;
camsworktimelogssource: any;

showcamsworktimelogsCheckbox()
{
debugger;
if(this.tblcamsworktimelogssource.settings['selectMode']== 'multi')this.tblcamsworktimelogssource.settings['selectMode']= 'single';
else
this.tblcamsworktimelogssource.settings['selectMode']= 'multi';
this.tblcamsworktimelogssource.initGrid();
}
deletecamsworktimelogsAll()
{
this.tblcamsworktimelogssource.settings['selectMode'] = 'single';
}
showcamsworktimelogsFilter()
{
  setTimeout(() => {
  this.SetcamsworktimelogsTableddConfig();
  });
      if(this.tblcamsworktimelogssource.settings!=null)this.tblcamsworktimelogssource.settings['hideSubHeader'] =!this.tblcamsworktimelogssource.settings['hideSubHeader'];
this.tblcamsworktimelogssource.initGrid();
}
showcamsworktimelogsInActive()
{
}
enablecamsworktimelogsInActive()
{
}
async SetcamsworktimelogsTableddConfig()
{
if(!this.bfilterPopulatecamsworktimelogs){
}
this.bfilterPopulatecamsworktimelogs=true;
}
async camsworktimelogsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworktimelogsTableConfig()
{
this.camsworktimelogssettings = {
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
meterreading: {
title: 'Meter Reading',
type: '',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
workeddate: {
title: 'Worked Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
workduration: {
title: 'Work Duration',
type: '',
filter:true,
},
travelduration: {
title: 'Travel Duration',
type: '',
filter:true,
},
losttime: {
title: 'Lost Time',
type: '',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camsworktimelogsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworktimelogsID)>=0)
{
this.camsworktimelogssource=new LocalDataSource();
this.camsworktimelogssource.load(this.camsworkdetailservice.camsworktimelogs as  any as LocalDataSource);
this.camsworktimelogssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworktimelogsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworkdetailservice.camsworktimelogs.length == 0)
{
    this.tblcamsworktimelogssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworktimelog();
    this.camsworkdetailservice.camsworktimelogs.push(obj);
    this.camsworktimelogssource.refresh();
    if ((this.camsworkdetailservice.camsworktimelogs.length / this.camsworktimelogssource.getPaging().perPage).toFixed(0) + 1 != this.camsworktimelogssource.getPaging().page)
    {
        this.camsworktimelogssource.setPage((this.camsworkdetailservice.camsworktimelogs.length / this.camsworktimelogssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworktimelogssource.grid.edit(this.tblcamsworktimelogssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworktimelogssource.data.indexOf(event.data);
this.onDeletecamsworktimelog(event,event.data.logid,((this.camsworktimelogssource.getPaging().page-1) *this.camsworktimelogssource.getPaging().perPage)+index);
this.camsworktimelogssource.refresh();
break;
}
}

*/
camsworktimelogsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworktimelog(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworktimelog(event,event.data.logid,this.formid);
break;
case 'delete':
this.onDeletecamsworktimelog(event,event.data.logid,((this.camsworktimelogssource.getPaging().page-1) *this.camsworktimelogssource.getPaging().perPage)+event.index);
this.camsworktimelogssource.refresh();
break;
}
}
camsworktimelogsonDelete(obj) {
let logid=obj.data.logid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworkdetailservice.deletecamsworkdetail(logid).then(res=>
this.camsworktimelogsLoadTable()
);
}
}
camsworktimelogsPaging(val)
{
debugger;
this.camsworktimelogssource.setPaging(1, val, true);
}

handlecamsworktimelogsGridSelected(event:any) {
this.camsworktimelogsselectedindex=this.camsworkdetailservice.camsworktimelogs.findIndex(i => i.logid === event.data.logid);
}
IscamsworktimelogsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworktimelogsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworktimelogs
//start of Grid Codes camsworkinstructions
camsworkinstructionssettings:any;
camsworkinstructionssource: any;

showcamsworkinstructionsCheckbox()
{
debugger;
if(this.tblcamsworkinstructionssource.settings['selectMode']== 'multi')this.tblcamsworkinstructionssource.settings['selectMode']= 'single';
else
this.tblcamsworkinstructionssource.settings['selectMode']= 'multi';
this.tblcamsworkinstructionssource.initGrid();
}
deletecamsworkinstructionsAll()
{
this.tblcamsworkinstructionssource.settings['selectMode'] = 'single';
}
showcamsworkinstructionsFilter()
{
  setTimeout(() => {
  this.SetcamsworkinstructionsTableddConfig();
  });
      if(this.tblcamsworkinstructionssource.settings!=null)this.tblcamsworkinstructionssource.settings['hideSubHeader'] =!this.tblcamsworkinstructionssource.settings['hideSubHeader'];
this.tblcamsworkinstructionssource.initGrid();
}
showcamsworkinstructionsInActive()
{
}
enablecamsworkinstructionsInActive()
{
}
async SetcamsworkinstructionsTableddConfig()
{
if(!this.bfilterPopulatecamsworkinstructions){
}
this.bfilterPopulatecamsworkinstructions=true;
}
async camsworkinstructionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworkinstructionsTableConfig()
{
this.camsworkinstructionssettings = {
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
verified: {
title: 'Verified',
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
camsworkinstructionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkinstructionsID)>=0)
{
this.camsworkinstructionssource=new LocalDataSource();
this.camsworkinstructionssource.load(this.camsworkdetailservice.camsworkinstructions as  any as LocalDataSource);
this.camsworkinstructionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworkinstructionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworkdetailservice.camsworkinstructions.length == 0)
{
    this.tblcamsworkinstructionssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworkinstruction();
    this.camsworkdetailservice.camsworkinstructions.push(obj);
    this.camsworkinstructionssource.refresh();
    if ((this.camsworkdetailservice.camsworkinstructions.length / this.camsworkinstructionssource.getPaging().perPage).toFixed(0) + 1 != this.camsworkinstructionssource.getPaging().page)
    {
        this.camsworkinstructionssource.setPage((this.camsworkdetailservice.camsworkinstructions.length / this.camsworkinstructionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworkinstructionssource.grid.edit(this.tblcamsworkinstructionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworkinstructionssource.data.indexOf(event.data);
this.onDeletecamsworkinstruction(event,event.data.workinstructionid,((this.camsworkinstructionssource.getPaging().page-1) *this.camsworkinstructionssource.getPaging().perPage)+index);
this.camsworkinstructionssource.refresh();
break;
}
}

*/
camsworkinstructionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworkinstruction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworkinstruction(event,event.data.workinstructionid,this.formid);
break;
case 'delete':
this.onDeletecamsworkinstruction(event,event.data.workinstructionid,((this.camsworkinstructionssource.getPaging().page-1) *this.camsworkinstructionssource.getPaging().perPage)+event.index);
this.camsworkinstructionssource.refresh();
break;
}
}
camsworkinstructionsonDelete(obj) {
let workinstructionid=obj.data.workinstructionid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworkdetailservice.deletecamsworkdetail(workinstructionid).then(res=>
this.camsworkinstructionsLoadTable()
);
}
}
camsworkinstructionsPaging(val)
{
debugger;
this.camsworkinstructionssource.setPaging(1, val, true);
}

handlecamsworkinstructionsGridSelected(event:any) {
this.camsworkinstructionsselectedindex=this.camsworkdetailservice.camsworkinstructions.findIndex(i => i.workinstructionid === event.data.workinstructionid);
}
IscamsworkinstructionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkinstructionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworkinstructions
//start of Grid Codes camsworkitems
camsworkitemssettings:any;
camsworkitemssource: any;

showcamsworkitemsCheckbox()
{
debugger;
if(this.tblcamsworkitemssource.settings['selectMode']== 'multi')this.tblcamsworkitemssource.settings['selectMode']= 'single';
else
this.tblcamsworkitemssource.settings['selectMode']= 'multi';
this.tblcamsworkitemssource.initGrid();
}
deletecamsworkitemsAll()
{
this.tblcamsworkitemssource.settings['selectMode'] = 'single';
}
showcamsworkitemsFilter()
{
  setTimeout(() => {
  this.SetcamsworkitemsTableddConfig();
  });
      if(this.tblcamsworkitemssource.settings!=null)this.tblcamsworkitemssource.settings['hideSubHeader'] =!this.tblcamsworkitemssource.settings['hideSubHeader'];
this.tblcamsworkitemssource.initGrid();
}
showcamsworkitemsInActive()
{
}
enablecamsworkitemsInActive()
{
}
async SetcamsworkitemsTableddConfig()
{
if(!this.bfilterPopulatecamsworkitems){
}
this.bfilterPopulatecamsworkitems=true;
}
async camsworkitemsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworkitemsTableConfig()
{
this.camsworkitemssettings = {
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
suggestedquantity: {
title: 'Suggested Quantity',
type: 'number',
filter:true,
},
actualquantity: {
title: 'Actual Quantity',
type: 'number',
filter:true,
},
instructions: {
title: 'Instructions',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
costshare: {
title: 'Cost Share',
type: 'number',
filter:true,
},
completeddate: {
title: 'Completed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
completednotes: {
title: 'Completed Notes',
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
camsworkitemsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkitemsID)>=0)
{
this.camsworkitemssource=new LocalDataSource();
this.camsworkitemssource.load(this.camsworkdetailservice.camsworkitems as  any as LocalDataSource);
this.camsworkitemssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworkitemsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworkdetailservice.camsworkitems.length == 0)
{
    this.tblcamsworkitemssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworkitem();
    this.camsworkdetailservice.camsworkitems.push(obj);
    this.camsworkitemssource.refresh();
    if ((this.camsworkdetailservice.camsworkitems.length / this.camsworkitemssource.getPaging().perPage).toFixed(0) + 1 != this.camsworkitemssource.getPaging().page)
    {
        this.camsworkitemssource.setPage((this.camsworkdetailservice.camsworkitems.length / this.camsworkitemssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworkitemssource.grid.edit(this.tblcamsworkitemssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworkitemssource.data.indexOf(event.data);
this.onDeletecamsworkitem(event,event.data.workorderitemid,((this.camsworkitemssource.getPaging().page-1) *this.camsworkitemssource.getPaging().perPage)+index);
this.camsworkitemssource.refresh();
break;
}
}

*/
camsworkitemsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworkitem(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworkitem(event,event.data.workorderitemid,this.formid);
break;
case 'delete':
this.onDeletecamsworkitem(event,event.data.workorderitemid,((this.camsworkitemssource.getPaging().page-1) *this.camsworkitemssource.getPaging().perPage)+event.index);
this.camsworkitemssource.refresh();
break;
}
}
camsworkitemsonDelete(obj) {
let workorderitemid=obj.data.workorderitemid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworkdetailservice.deletecamsworkdetail(workorderitemid).then(res=>
this.camsworkitemsLoadTable()
);
}
}
camsworkitemsPaging(val)
{
debugger;
this.camsworkitemssource.setPaging(1, val, true);
}

handlecamsworkitemsGridSelected(event:any) {
this.camsworkitemsselectedindex=this.camsworkdetailservice.camsworkitems.findIndex(i => i.workorderitemid === event.data.workorderitemid);
}
IscamsworkitemsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkitemsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworkitems

}



