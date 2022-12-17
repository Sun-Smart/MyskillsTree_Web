import { camspmscheduletaskService } from './../../../service/camspmscheduletask.service';
import { camspmscheduletask } from './../../../model/camspmscheduletask.model';
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
import { camspmschedule} from './../../../model/camspmschedule.model';
import { camspmscheduleComponent } from './../../../pages/forms/camspmschedule/camspmschedule.component';
import { camspmscheduleService } from './../../../service/camspmschedule.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { camspmtask} from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
//popups
//detail table services
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
selector: 'app-camspmscheduletask',
templateUrl: './camspmscheduletask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camspmscheduletaskComponent implements OnInit {
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
bfilterPopulatecamspmscheduletasks:boolean=false;
datacamspmscheduletasksscheduleid3:any=[];
datacamspmscheduletaskspmid3:any=[];
datacamspmscheduletaskspmtaskid3:any=[];
datacamspmscheduletaskstasktype3:any=[];
datacamspmscheduletasksmeterreadingstate3:any=[];
 camspmscheduletaskForm: FormGroup;
scheduleidList: camspmschedule[];
scheduleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
scheduleid_camspmschedulesForm: FormGroup;//autocomplete
scheduleid_camspmschedulesoptions:any;//autocomplete
scheduleid_camspmschedulesformatter:any;//autocomplete
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
meterreadingstateList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camspmscheduletaskshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camspmscheduletaskservice: camspmscheduletaskService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camspmscheduleservice:camspmscheduleService,
private camspmmasterservice:camspmmasterService,
private camspmtaskservice:camspmtaskService,
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
this.camspmscheduletaskForm  = this.fb.group({
pk:[null],
scheduletaskid: [null],
scheduleid: [null],
scheduleiddesc: [null],
pmid: [null, Validators.required],
pmiddesc: [null],
pmtaskid: [null, Validators.required],
pmtaskiddesc: [null],
taskdescription: [null, Validators.required],
tasktype: [null],
tasktypedesc: [null],
meterreadingstate: [null],
meterreadingstatedesc: [null],
workhrs: [null],
workperioddays: [null],
orderno: [null],
predecessor: [null],
durationfromstart: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camspmscheduletaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camspmscheduletaskForm.dirty && this.camspmscheduletaskForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.scheduletaskid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.scheduletaskid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scheduletaskid && pkDetail) {
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
let camspmscheduletaskid = null;

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
this.formid=camspmscheduletaskid;
//this.sharedService.alert(camspmscheduletaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camspmscheduleservice.getcamspmschedulesList().then(res => 
{
this.scheduleidList = res as camspmschedule[];
if(this.camspmscheduletaskservice.formData && this.camspmscheduletaskservice.formData.scheduleid){
this.scheduleidoptionsEvent.emit(this.scheduleidList);
this.camspmscheduletaskForm.patchValue({
    scheduleid: this.camspmscheduletaskservice.formData.scheduleid,
    scheduleiddesc: this.camspmscheduletaskservice.formData.scheduleiddesc,
});
}
{
let arrscheduleid = this.scheduleidList.filter(v => v.scheduleid == this.camspmscheduletaskForm.get('scheduleid').value);
let objscheduleid;
if (arrscheduleid.length > 0) objscheduleid = arrscheduleid[0];
if (objscheduleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.scheduleid_camspmschedulesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.scheduleidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.scheduleid_camspmschedulesformatter = (result: any) => result.description;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camspmscheduletaskservice.formData && this.camspmscheduletaskservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camspmscheduletaskForm.patchValue({
    pmid: this.camspmscheduletaskservice.formData.pmid,
    pmiddesc: this.camspmscheduletaskservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camspmscheduletaskForm.get('pmid').value);
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
if(this.camspmscheduletaskservice.formData && this.camspmscheduletaskservice.formData.pmtaskid){this.camspmscheduletaskForm.patchValue({
    pmtaskid: this.camspmscheduletaskservice.formData.pmtaskid,
    pmtaskiddesc: this.camspmscheduletaskservice.formData.pmtaskiddesc,
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
this.configservice.getList("meterreadingstate").then(res => this.meterreadingstateList = res as boconfigvalue[]);

//autocomplete
    this.camspmscheduletaskservice.getcamspmscheduletasksList().then(res => {
      this.pkList = res as camspmscheduletask[];
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
this.camspmscheduletaskForm.markAsUntouched();
this.camspmscheduletaskForm.markAsPristine();
}
onSelectedscheduleid(scheduleidDetail: any) {
if (scheduleidDetail.scheduleid && scheduleidDetail) {
this.camspmscheduletaskForm.patchValue({
scheduleid: scheduleidDetail.scheduleid,
scheduleiddesc: scheduleidDetail.description,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camspmscheduletaskForm.patchValue({
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
this.camspmscheduletaskForm.patchValue({
pmtaskid: pmtaskidDetail.pmtaskid,
pmtaskiddesc: pmtaskidDetail.description,

});

}
}




resetForm() {
if (this.camspmscheduletaskForm != null)
this.camspmscheduletaskForm.reset();
this.camspmscheduletaskForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let scheduletaskid = this.camspmscheduletaskForm.get('scheduletaskid').value;
        if(scheduletaskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camspmscheduletaskservice.deletecamspmscheduletask(scheduletaskid).then(res =>
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
    this.camspmscheduletaskForm.patchValue({
        scheduletaskid: null
    });
    if(this.camspmscheduletaskservice.formData.scheduletaskid!=null)this.camspmscheduletaskservice.formData.scheduletaskid=null;
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
this.camspmscheduletaskForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camspmscheduletaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camspmscheduletaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camspmscheduletaskForm.controls[key]!=undefined)
{
this.camspmscheduletaskForm.controls[key].disable({onlySelf: true});
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
scheduletaskidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
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
this.camspmscheduletaskForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
meterreadingstateonChange(evt:any){
let e=this.f.meterreadingstate.value as any;
this.camspmscheduletaskForm.patchValue({meterreadingstatedesc:evt.options[evt.options.selectedIndex].text});
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
durationfromstartonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamspmscheduletasks() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camspmscheduletaskservice.getcamspmscheduletasksByEID(pkcol).then(res => {

this.camspmscheduletaskservice.formData=res.camspmscheduletask;
let formproperty=res.camspmscheduletask.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camspmscheduletask.pkcol;
this.formid=res.camspmscheduletask.scheduletaskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camspmscheduletask.scheduletaskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camspmscheduletaskForm.patchValue({
scheduletaskid: res.camspmscheduletask.scheduletaskid,
scheduleid: res.camspmscheduletask.scheduleid,
scheduleiddesc: res.camspmscheduletask.scheduleiddesc,
pmid: res.camspmscheduletask.pmid,
pmiddesc: res.camspmscheduletask.pmiddesc,
pmtaskid: res.camspmscheduletask.pmtaskid,
pmtaskiddesc: res.camspmscheduletask.pmtaskiddesc,
taskdescription: res.camspmscheduletask.taskdescription,
tasktype: res.camspmscheduletask.tasktype,
tasktypedesc: res.camspmscheduletask.tasktypedesc,
meterreadingstate: res.camspmscheduletask.meterreadingstate,
meterreadingstatedesc: res.camspmscheduletask.meterreadingstatedesc,
workhrs: res.camspmscheduletask.workhrs,
workperioddays: res.camspmscheduletask.workperioddays,
orderno: res.camspmscheduletask.orderno,
predecessor: res.camspmscheduletask.predecessor,
durationfromstart: res.camspmscheduletask.durationfromstart,
remarks: JSON.parse(res.camspmscheduletask.remarks),
status: res.camspmscheduletask.status,
statusdesc: res.camspmscheduletask.statusdesc,
});
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.pmtaskidList = res as camspmtask[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
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
  for (let key in this.camspmscheduletaskForm.controls) {
    if (this.camspmscheduletaskForm.controls[key] != null) {
if(false)
{
if(this.camspmscheduletaskservice.formData!=null && this.camspmscheduletaskservice.formData[key]!=null  && this.camspmscheduletaskservice.formData[key]!='[]' && this.camspmscheduletaskservice.formData[key]!=undefined && this.camspmscheduletaskservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camspmscheduletaskservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camspmscheduletaskservice.formData!=null && this.camspmscheduletaskservice.formData[key]!=null   && this.camspmscheduletaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camspmscheduletaskservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camspmscheduletaskservice.formData!=null && this.camspmscheduletaskservice.formData[key]!=null   && this.camspmscheduletaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camspmscheduletaskservice.formData[key]+"'><div class='progress__number'>"+this.camspmscheduletaskservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camspmscheduletaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camspmscheduletaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camspmscheduletaskForm.value;
if(this.camspmscheduletaskForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camspmscheduletaskForm.get('remarks').value);
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

private camspmscheduletasktoggleOption(){
this.camspmscheduletaskshowOption = this.camspmscheduletaskshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camspmscheduletaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camspmscheduletaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camspmscheduletaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camspmscheduletaskservice.formData=this.camspmscheduletaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camspmscheduletaskForm.controls[key] != null)
    {
        this.camspmscheduletaskservice.formData[key] = this.camspmscheduletaskForm.controls[key].value;
    }
}
}
}
if(this.camspmscheduletaskForm.get('remarks').value!=null)this.camspmscheduletaskservice.formData.remarks=JSON.stringify(this.camspmscheduletaskForm.get('remarks').value);
console.log(this.camspmscheduletaskservice.formData);
this.camspmscheduletaskservice.formData=this.camspmscheduletaskForm.value;
this.camspmscheduletaskservice.saveOrUpdatecamspmscheduletasks().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmscheduletask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camspmscheduletaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmscheduletask);
}
else
{
this.FillData(res);
}
}
this.camspmscheduletaskForm.markAsUntouched();
this.camspmscheduletaskForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditscheduleid( scheduleid) {
/*let ScreenType='2';
this.dialog.open(camspmscheduleComponent, 
{
data: {scheduleid:this.camspmscheduletaskForm.get('scheduleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camspmscheduletaskForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmtaskid( pmtaskid) {
/*let ScreenType='2';
this.dialog.open(camspmtaskComponent, 
{
data: {pmtaskid:this.camspmscheduletaskForm.get('pmtaskid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



