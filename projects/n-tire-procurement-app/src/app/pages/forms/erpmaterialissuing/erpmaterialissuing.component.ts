import { erpmaterialissuingService } from './../../../service/erpmaterialissuing.service';
import { erpmaterialissuing } from './../../../model/erpmaterialissuing.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
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
selector: 'app-erpmaterialissuing',
templateUrl: './erpmaterialissuing.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpmaterialissuingComponent implements OnInit {
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
bfilterPopulateerpmaterialissuings:boolean=false;
dataerpmaterialissuingsstoreuserid3:any=[];
dataerpmaterialissuingsissuedto3:any=[];
dataerpmaterialissuingsprojectid3:any=[];
dataerpmaterialissuingslocationid3:any=[];
 erpmaterialissuingForm: FormGroup;
storeuseridList: bousermaster[];
storeuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
storeuserid_bousermastersForm: FormGroup;//autocomplete
storeuserid_bousermastersoptions:any;//autocomplete
storeuserid_bousermastersformatter:any;//autocomplete
issuedtoList: bousermaster[];
issuedtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
issuedto_bousermastersForm: FormGroup;//autocomplete
issuedto_bousermastersoptions:any;//autocomplete
issuedto_bousermastersformatter:any;//autocomplete
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpmaterialissuingshowOption:boolean;
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
private erpmaterialissuingservice: erpmaterialissuingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private prjprojectmasterservice:prjprojectmasterService,
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
this.erpmaterialissuingForm  = this.fb.group({
pk:[null],
branchid: [null],
issuetype: [null],
referenceid: [null],
miid: [null],
purchaserequisitionid: [null],
storeuserid: [null],
storeuseriddesc: [null],
issuedto: [null],
issuedtodesc: [null],
projectid: [null],
projectiddesc: [null],
itemid: [null],
uom: [null],
locationid: [null],
locationiddesc: [null],
binlocationid: [null],
requestedqty: [null],
issueqty: [null],
serialbatch: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpmaterialissuingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpmaterialissuingForm.dirty && this.erpmaterialissuingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.miid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.miid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.miid && pkDetail) {
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
let erpmaterialissuingid = null;

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
this.formid=erpmaterialissuingid;
//this.sharedService.alert(erpmaterialissuingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.storeuseridList = res as bousermaster[];
if(this.erpmaterialissuingservice.formData && this.erpmaterialissuingservice.formData.storeuserid){
this.storeuseridoptionsEvent.emit(this.storeuseridList);
this.erpmaterialissuingForm.patchValue({
    storeuserid: this.erpmaterialissuingservice.formData.storeuserid,
    storeuseriddesc: this.erpmaterialissuingservice.formData.storeuseriddesc,
});
}
{
let arrstoreuserid = this.storeuseridList.filter(v => v.userid == this.erpmaterialissuingForm.get('storeuserid').value);
let objstoreuserid;
if (arrstoreuserid.length > 0) objstoreuserid = arrstoreuserid[0];
if (objstoreuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.storeuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.storeuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.storeuserid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.issuedtoList = res as bousermaster[];
if(this.erpmaterialissuingservice.formData && this.erpmaterialissuingservice.formData.issuedto){
this.issuedtooptionsEvent.emit(this.issuedtoList);
this.erpmaterialissuingForm.patchValue({
    issuedto: this.erpmaterialissuingservice.formData.issuedto,
    issuedtodesc: this.erpmaterialissuingservice.formData.issuedtodesc,
});
}
{
let arrissuedto = this.issuedtoList.filter(v => v.userid == this.erpmaterialissuingForm.get('issuedto').value);
let objissuedto;
if (arrissuedto.length > 0) objissuedto = arrissuedto[0];
if (objissuedto)
{
}
}
}
).catch((err) => {console.log(err);});
this.issuedto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.issuedtoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.issuedto_bousermastersformatter = (result: any) => result.username;
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.erpmaterialissuingservice.formData && this.erpmaterialissuingservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.erpmaterialissuingForm.patchValue({
    projectid: this.erpmaterialissuingservice.formData.projectid,
    projectiddesc: this.erpmaterialissuingservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.erpmaterialissuingForm.get('projectid').value);
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
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.erpmaterialissuingservice.formData && this.erpmaterialissuingservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.erpmaterialissuingForm.patchValue({
    locationid: this.erpmaterialissuingservice.formData.locationid,
    locationiddesc: this.erpmaterialissuingservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.erpmaterialissuingForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;

//autocomplete
    this.erpmaterialissuingservice.geterpmaterialissuingsList().then(res => {
      this.pkList = res as erpmaterialissuing[];
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
this.erpmaterialissuingForm.markAsUntouched();
this.erpmaterialissuingForm.markAsPristine();
}
onSelectedstoreuserid(storeuseridDetail: any) {
if (storeuseridDetail.userid && storeuseridDetail) {
this.erpmaterialissuingForm.patchValue({
storeuserid: storeuseridDetail.userid,
storeuseriddesc: storeuseridDetail.username,

});

}
}

onSelectedissuedto(issuedtoDetail: any) {
if (issuedtoDetail.userid && issuedtoDetail) {
this.erpmaterialissuingForm.patchValue({
issuedto: issuedtoDetail.userid,
issuedtodesc: issuedtoDetail.username,

});

}
}

onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.erpmaterialissuingForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.erpmaterialissuingForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}




resetForm() {
if (this.erpmaterialissuingForm != null)
this.erpmaterialissuingForm.reset();
this.erpmaterialissuingForm.patchValue({
storeuserid: this.sessiondata.userid,
storeuseriddesc: this.sessiondata.username,
issuedto: this.sessiondata.userid,
issuedtodesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let miid = this.erpmaterialissuingForm.get('miid').value;
        if(miid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpmaterialissuingservice.deleteerpmaterialissuing(miid).then(res =>
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
    this.erpmaterialissuingForm.patchValue({
        miid: null
    });
    if(this.erpmaterialissuingservice.formData.miid!=null)this.erpmaterialissuingservice.formData.miid=null;
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
this.erpmaterialissuingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpmaterialissuingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpmaterialissuingForm.controls[key]!=undefined)
{
this.erpmaterialissuingForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
issuetypeonChange(evt:any){
let e=evt.value;
}
referenceidonChange(evt:any){
let e=evt.value;
}
miidonChange(evt:any){
let e=evt.value;
}
purchaserequisitionidonChange(evt:any){
let e=evt.value;
}
storeuseridonChange(evt:any){
let e=evt.value;
}
issuedtoonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
binlocationidonChange(evt:any){
let e=evt.value;
}
requestedqtyonChange(evt:any){
let e=evt.value;
}
issueqtyonChange(evt:any){
let e=evt.value;
}
serialbatchonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpmaterialissuings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpmaterialissuingservice.geterpmaterialissuingsByEID(pkcol).then(res => {

this.erpmaterialissuingservice.formData=res.erpmaterialissuing;
let formproperty=res.erpmaterialissuing.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpmaterialissuing.pkcol;
this.formid=res.erpmaterialissuing.miid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpmaterialissuing.miid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpmaterialissuingForm.patchValue({
branchid: res.erpmaterialissuing.branchid,
issuetype: res.erpmaterialissuing.issuetype,
referenceid: res.erpmaterialissuing.referenceid,
miid: res.erpmaterialissuing.miid,
purchaserequisitionid: res.erpmaterialissuing.purchaserequisitionid,
storeuserid: res.erpmaterialissuing.storeuserid,
storeuseriddesc: res.erpmaterialissuing.storeuseriddesc,
issuedto: res.erpmaterialissuing.issuedto,
issuedtodesc: res.erpmaterialissuing.issuedtodesc,
projectid: res.erpmaterialissuing.projectid,
projectiddesc: res.erpmaterialissuing.projectiddesc,
itemid: res.erpmaterialissuing.itemid,
uom: res.erpmaterialissuing.uom,
locationid: res.erpmaterialissuing.locationid,
locationiddesc: res.erpmaterialissuing.locationiddesc,
binlocationid: res.erpmaterialissuing.binlocationid,
requestedqty: res.erpmaterialissuing.requestedqty,
issueqty: res.erpmaterialissuing.issueqty,
serialbatch: res.erpmaterialissuing.serialbatch,
status: res.erpmaterialissuing.status,
statusdesc: res.erpmaterialissuing.statusdesc,
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
  for (let key in this.erpmaterialissuingForm.controls) {
    if (this.erpmaterialissuingForm.controls[key] != null) {
if(false)
{
if(this.erpmaterialissuingservice.formData!=null && this.erpmaterialissuingservice.formData[key]!=null  && this.erpmaterialissuingservice.formData[key]!='[]' && this.erpmaterialissuingservice.formData[key]!=undefined && this.erpmaterialissuingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpmaterialissuingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpmaterialissuingservice.formData!=null && this.erpmaterialissuingservice.formData[key]!=null   && this.erpmaterialissuingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpmaterialissuingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpmaterialissuingservice.formData!=null && this.erpmaterialissuingservice.formData[key]!=null   && this.erpmaterialissuingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpmaterialissuingservice.formData[key]+"'><div class='progress__number'>"+this.erpmaterialissuingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpmaterialissuingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpmaterialissuingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpmaterialissuingForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private erpmaterialissuingtoggleOption(){
this.erpmaterialissuingshowOption = this.erpmaterialissuingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpmaterialissuingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpmaterialissuingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpmaterialissuingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpmaterialissuingservice.formData=this.erpmaterialissuingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpmaterialissuingForm.controls[key] != null)
    {
        this.erpmaterialissuingservice.formData[key] = this.erpmaterialissuingForm.controls[key].value;
    }
}
}
}
console.log(this.erpmaterialissuingservice.formData);
this.erpmaterialissuingservice.formData=this.erpmaterialissuingForm.value;
this.erpmaterialissuingservice.saveOrUpdateerpmaterialissuings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpmaterialissuing);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpmaterialissuingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpmaterialissuing);
}
else
{
this.FillData(res);
}
}
this.erpmaterialissuingForm.markAsUntouched();
this.erpmaterialissuingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditstoreuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpmaterialissuingForm.get('storeuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditissuedto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpmaterialissuingForm.get('issuedto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erpmaterialissuingForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.erpmaterialissuingForm.get('locationid').value, ScreenType:2 }
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



