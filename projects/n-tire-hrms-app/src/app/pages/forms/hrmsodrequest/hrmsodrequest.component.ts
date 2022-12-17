import { hrmsodrequestService } from './../../../service/hrmsodrequest.service';
import { hrmsodrequest } from './../../../model/hrmsodrequest.model';
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
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
//detail table services
import { hrmsodadvance } from './../../../model/hrmsodadvance.model';
import { hrmsodadvanceComponent } from './../../../pages/forms/hrmsodadvance/hrmsodadvance.component';
//FK services
import { hrmsodclaim } from './../../../model/hrmsodclaim.model';
import { hrmsodclaimComponent } from './../../../pages/forms/hrmsodclaim/hrmsodclaim.component';
//FK services
import { hrmsodtravel } from './../../../model/hrmsodtravel.model';
import { hrmsodtravelComponent } from './../../../pages/forms/hrmsodtravel/hrmsodtravel.component';
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

@Component({
selector: 'app-hrmsodrequest',
templateUrl: './hrmsodrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsodrequestComponent implements OnInit {
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
bfilterPopulatehrmsodrequests:boolean=false;
datahrmsodrequestsemployeeid3:any=[];
datahrmsodadvancesemployeeid3:any=[];
datahrmsodadvancescurrency3:any=[];
bfilterPopulatehrmsodadvances:boolean=false;
datahrmsodclaimsemployeeid3:any=[];
datahrmsodclaimscurrency3:any=[];
datahrmsodclaimsclaimtype3:any=[];
bfilterPopulatehrmsodclaims:boolean=false;
datahrmsodtravelsmode3:any=[];
datahrmsodtravelsemployeeid3:any=[];
bfilterPopulatehrmsodtravels:boolean=false;
@ViewChild('tblhrmsodadvancessource',{static:false}) tblhrmsodadvancessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsodclaimssource',{static:false}) tblhrmsodclaimssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsodtravelssource',{static:false}) tblhrmsodtravelssource: Ng2SmartTableComponent;
 hrmsodrequestForm: FormGroup;
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsodrequestshowOption:boolean;
hrmsodadvanceshowOption:boolean;
hrmsodclaimshowOption:boolean;
hrmsodtravelshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsodadvancesvisiblelist:any;
hrmsodadvanceshidelist:any;
hrmsodclaimsvisiblelist:any;
hrmsodclaimshidelist:any;
hrmsodtravelsvisiblelist:any;
hrmsodtravelshidelist:any;

DeletedhrmsodadvanceIDs: string="";
hrmsodadvancesID: string = "1";
hrmsodadvancesselectedindex:any;
DeletedhrmsodclaimIDs: string="";
hrmsodclaimsID: string = "2";
hrmsodclaimsselectedindex:any;
DeletedhrmsodtravelIDs: string="";
hrmsodtravelsID: string = "3";
hrmsodtravelsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsodrequestservice: hrmsodrequestService,
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
this.hrmsodrequestForm  = this.fb.group({
pk:[null],
odid: [null],
reference: [null],
employeeid: [null],
employeeiddesc: [null],
fromdate: [null],
todate: [null],
fromtime: [null],
totime: [null],
reason: [null],
travelrequired: [null],
advancerequired: [null],
status: [null],
statusdesc: [null],
earningvoucherid: [null],
});
}

get f() { return this.hrmsodrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsodrequestForm.dirty && this.hrmsodrequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.odid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.odid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.odid && pkDetail) {
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
let hrmsodrequestid = null;

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
this.formid=hrmsodrequestid;
//this.sharedService.alert(hrmsodrequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsodadvancesTableConfig();
  setTimeout(() => {
  this.SethrmsodadvancesTableddConfig();
  });

this.SethrmsodclaimsTableConfig();
  setTimeout(() => {
  this.SethrmsodclaimsTableddConfig();
  });

this.SethrmsodtravelsTableConfig();
  setTimeout(() => {
  this.SethrmsodtravelsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsodrequestservice.formData && this.hrmsodrequestservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsodrequestForm.patchValue({
    employeeid: this.hrmsodrequestservice.formData.employeeid,
    employeeiddesc: this.hrmsodrequestservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsodrequestForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;

//autocomplete
    this.hrmsodrequestservice.gethrmsodrequestsList().then(res => {
      this.pkList = res as hrmsodrequest[];
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
this.hrmsodrequestForm.markAsUntouched();
this.hrmsodrequestForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsodrequestForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsodrequestForm != null)
this.hrmsodrequestForm.reset();
this.hrmsodrequestForm.patchValue({
});
setTimeout(() => {
this.hrmsodrequestservice.hrmsodadvances=[];
this.hrmsodadvancesLoadTable();
this.hrmsodrequestservice.hrmsodclaims=[];
this.hrmsodclaimsLoadTable();
this.hrmsodrequestservice.hrmsodtravels=[];
this.hrmsodtravelsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let odid = this.hrmsodrequestForm.get('odid').value;
        if(odid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsodrequestservice.deletehrmsodrequest(odid).then(res =>
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
    this.hrmsodrequestForm.patchValue({
        odid: null
    });
    if(this.hrmsodrequestservice.formData.odid!=null)this.hrmsodrequestservice.formData.odid=null;
for (let i=0;i<this.hrmsodrequestservice.hrmsodadvances.length;i++) {
this.hrmsodrequestservice.hrmsodadvances[i].odadvanceid=null;
}
for (let i=0;i<this.hrmsodrequestservice.hrmsodclaims.length;i++) {
this.hrmsodrequestservice.hrmsodclaims[i].claimid=null;
}
for (let i=0;i<this.hrmsodrequestservice.hrmsodtravels.length;i++) {
this.hrmsodrequestservice.hrmsodtravels[i].odtravelid=null;
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
        else if(key=="fromdate")
this.hrmsodrequestForm.patchValue({"fromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="todate")
this.hrmsodrequestForm.patchValue({"todate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="fromtime")
this.hrmsodrequestForm.patchValue({"fromtime":new Time(mainscreendata[key]) });
        else if(key=="totime")
this.hrmsodrequestForm.patchValue({"totime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsodrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsodrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsodrequestForm.controls[key]!=undefined)
{
this.hrmsodrequestForm.controls[key].disable({onlySelf: true});
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
odidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
fromdateonChange(evt:any){
let e=evt.value;
}
todateonChange(evt:any){
let e=evt.value;
}
fromtimeonChange(evt:any){
let e=evt.value;
}
totimeonChange(evt:any){
let e=evt.value;
}
reasononChange(evt:any){
let e=evt.value;
}
travelrequiredonChange(evt:any){
let e=evt.value;
}
advancerequiredonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
earningvoucheridonChange(evt:any){
let e=evt.value;
}

edithrmsodrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsodrequestservice.gethrmsodrequestsByEID(pkcol).then(res => {

this.hrmsodrequestservice.formData=res.hrmsodrequest;
let formproperty=res.hrmsodrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsodrequest.pkcol;
this.formid=res.hrmsodrequest.odid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsodrequest.odid;
var fromtimeTime=new Time( res.hrmsodrequest.fromtime);
var totimeTime=new Time( res.hrmsodrequest.totime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsodrequestForm.patchValue({
odid: res.hrmsodrequest.odid,
reference: res.hrmsodrequest.reference,
employeeid: res.hrmsodrequest.employeeid,
employeeiddesc: res.hrmsodrequest.employeeiddesc,
fromdate: this.ngbDateParserFormatter.parse(res.hrmsodrequest.fromdate),
todate: this.ngbDateParserFormatter.parse(res.hrmsodrequest.todate),
fromtime: fromtimeTime,
totime: totimeTime,
reason: res.hrmsodrequest.reason,
travelrequired: res.hrmsodrequest.travelrequired,
advancerequired: res.hrmsodrequest.advancerequired,
status: res.hrmsodrequest.status,
statusdesc: res.hrmsodrequest.statusdesc,
earningvoucherid: res.hrmsodrequest.earningvoucherid,
});
this.hrmsodadvancesvisiblelist=res.hrmsodadvancesvisiblelist;
this.hrmsodclaimsvisiblelist=res.hrmsodclaimsvisiblelist;
this.hrmsodtravelsvisiblelist=res.hrmsodtravelsvisiblelist;
//Child Tables if any
this.hrmsodrequestservice.hrmsodadvances = res.hrmsodadvances;
this.SethrmsodadvancesTableConfig();
this.hrmsodadvancesLoadTable();
  setTimeout(() => {
  this.SethrmsodadvancesTableddConfig();
  });
this.hrmsodrequestservice.hrmsodclaims = res.hrmsodclaims;
this.SethrmsodclaimsTableConfig();
this.hrmsodclaimsLoadTable();
  setTimeout(() => {
  this.SethrmsodclaimsTableddConfig();
  });
this.hrmsodrequestservice.hrmsodtravels = res.hrmsodtravels;
this.SethrmsodtravelsTableConfig();
this.hrmsodtravelsLoadTable();
  setTimeout(() => {
  this.SethrmsodtravelsTableddConfig();
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
  for (let key in this.hrmsodrequestForm.controls) {
    if (this.hrmsodrequestForm.controls[key] != null) {
if(false)
{
if(this.hrmsodrequestservice.formData!=null && this.hrmsodrequestservice.formData[key]!=null  && this.hrmsodrequestservice.formData[key]!='[]' && this.hrmsodrequestservice.formData[key]!=undefined && this.hrmsodrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsodrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsodrequestservice.formData!=null && this.hrmsodrequestservice.formData[key]!=null   && this.hrmsodrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsodrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsodrequestservice.formData!=null && this.hrmsodrequestservice.formData[key]!=null   && this.hrmsodrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsodrequestservice.formData[key]+"'><div class='progress__number'>"+this.hrmsodrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsodrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsodrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsodrequestForm.value;
obj.fromdate=new Date(this.hrmsodrequestForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsodrequestForm.get('fromdate').value)+'  UTC' :null);
obj.todate=new Date(this.hrmsodrequestForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsodrequestForm.get('todate').value)+'  UTC' :null);
obj.fromtime=(this.hrmsodrequestForm.get('fromtime').value==null?0:this.hrmsodrequestForm.get('fromtime').value.hour)+':'+(this.hrmsodrequestForm.get('fromtime').value==null?0:this.hrmsodrequestForm.get('fromtime').value.minute+":00");
obj.totime=(this.hrmsodrequestForm.get('totime').value==null?0:this.hrmsodrequestForm.get('totime').value.hour)+':'+(this.hrmsodrequestForm.get('totime').value==null?0:this.hrmsodrequestForm.get('totime').value.minute+":00");
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

private hrmsodrequesttoggleOption(){
this.hrmsodrequestshowOption = this.hrmsodrequestshowOption === true ? false : true;
}

private hrmsodadvancetoggleOption(){
this.hrmsodadvanceshowOption = this.hrmsodadvanceshowOption === true ? false : true;
}

private hrmsodclaimtoggleOption(){
this.hrmsodclaimshowOption = this.hrmsodclaimshowOption === true ? false : true;
}

private hrmsodtraveltoggleOption(){
this.hrmsodtravelshowOption = this.hrmsodtravelshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsodrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsodrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsodrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsodrequestservice.formData=this.hrmsodrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsodrequestForm.controls[key] != null)
    {
        this.hrmsodrequestservice.formData[key] = this.hrmsodrequestForm.controls[key].value;
    }
}
}
}
this.hrmsodrequestservice.formData.fromdate=new Date(this.hrmsodrequestForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsodrequestForm.get('fromdate').value)+'  UTC' :null);
this.hrmsodrequestservice.formData.todate=new Date(this.hrmsodrequestForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsodrequestForm.get('todate').value)+'  UTC' :null);
this.hrmsodrequestservice.formData.fromtime=(this.hrmsodrequestForm.get('fromtime').value==null?0:this.hrmsodrequestForm.get('fromtime').value.hour)+':'+(this.hrmsodrequestForm.get('fromtime').value==null?0:this.hrmsodrequestForm.get('fromtime').value.minute+":00");
this.hrmsodrequestservice.formData.totime=(this.hrmsodrequestForm.get('totime').value==null?0:this.hrmsodrequestForm.get('totime').value.hour)+':'+(this.hrmsodrequestForm.get('totime').value==null?0:this.hrmsodrequestForm.get('totime').value.minute+":00");
this.hrmsodrequestservice.formData.DeletedhrmsodadvanceIDs = this.DeletedhrmsodadvanceIDs;
this.hrmsodrequestservice.formData.DeletedhrmsodclaimIDs = this.DeletedhrmsodclaimIDs;
this.hrmsodrequestservice.formData.DeletedhrmsodtravelIDs = this.DeletedhrmsodtravelIDs;
console.log(this.hrmsodrequestservice.formData);
this.hrmsodrequestservice.formData=this.hrmsodrequestForm.value;
this.hrmsodrequestservice.saveOrUpdatehrmsodrequests().subscribe(
async res => {
if (this.hrmsodadvancessource.data)
{
    for (let i = 0; i < this.hrmsodadvancessource.data.length; i++)
    {
        if (this.hrmsodadvancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsodadvancessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsodclaimssource.data)
{
    for (let i = 0; i < this.hrmsodclaimssource.data.length; i++)
    {
        if (this.hrmsodclaimssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsodclaimssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsodtravelssource.data)
{
    for (let i = 0; i < this.hrmsodtravelssource.data.length; i++)
    {
        if (this.hrmsodtravelssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsodtravelssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsodrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsodrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsodrequest);
}
else
{
this.FillData(res);
}
}
this.hrmsodrequestForm.markAsUntouched();
this.hrmsodrequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsodrequestForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsodadvance(event:any,odadvanceid:any, odid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsodadvanceComponent, 
{
data:  {  showview:false,save:false,event,odadvanceid, odid,visiblelist:this.hrmsodadvancesvisiblelist,  hidelist:this.hrmsodadvanceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsodadvancessource.add(res);
this.hrmsodadvancessource.refresh();
}
else
{
this.hrmsodadvancessource.update(event.data, res);
}
}
});
}

onDeletehrmsodadvance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsodadvanceIDs += childID + ",";
this.hrmsodrequestservice.hrmsodadvances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsodclaim(event:any,claimid:any, odid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsodclaimComponent, 
{
data:  {  showview:false,save:false,event,claimid, odid,visiblelist:this.hrmsodclaimsvisiblelist,  hidelist:this.hrmsodclaimshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsodclaimssource.add(res);
this.hrmsodclaimssource.refresh();
}
else
{
this.hrmsodclaimssource.update(event.data, res);
}
}
});
}

onDeletehrmsodclaim(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsodclaimIDs += childID + ",";
this.hrmsodrequestservice.hrmsodclaims.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsodtravel(event:any,odtravelid:any, odid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsodtravelComponent, 
{
data:  {  showview:false,save:false,event,odtravelid, odid,visiblelist:this.hrmsodtravelsvisiblelist,  hidelist:this.hrmsodtravelshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsodtravelssource.add(res);
this.hrmsodtravelssource.refresh();
}
else
{
this.hrmsodtravelssource.update(event.data, res);
}
}
});
}

onDeletehrmsodtravel(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsodtravelIDs += childID + ",";
this.hrmsodrequestservice.hrmsodtravels.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsodadvances
hrmsodadvancessettings:any;
hrmsodadvancessource: any;

showhrmsodadvancesCheckbox()
{
debugger;
if(this.tblhrmsodadvancessource.settings['selectMode']== 'multi')this.tblhrmsodadvancessource.settings['selectMode']= 'single';
else
this.tblhrmsodadvancessource.settings['selectMode']= 'multi';
this.tblhrmsodadvancessource.initGrid();
}
deletehrmsodadvancesAll()
{
this.tblhrmsodadvancessource.settings['selectMode'] = 'single';
}
showhrmsodadvancesFilter()
{
  setTimeout(() => {
  this.SethrmsodadvancesTableddConfig();
  });
      if(this.tblhrmsodadvancessource.settings!=null)this.tblhrmsodadvancessource.settings['hideSubHeader'] =!this.tblhrmsodadvancessource.settings['hideSubHeader'];
this.tblhrmsodadvancessource.initGrid();
}
showhrmsodadvancesInActive()
{
}
enablehrmsodadvancesInActive()
{
}
async SethrmsodadvancesTableddConfig()
{
if(!this.bfilterPopulatehrmsodadvances){

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodadvancescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.datahrmsodadvancescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsodadvancessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodadvancescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodadvancescurrency3)), }, };
this.tblhrmsodadvancessource.settings =  clone;
this.tblhrmsodadvancessource.initGrid();
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodadvancesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsodadvancesemployeeid3.push(obj);
}
if((this.tblhrmsodadvancessource.settings as any).columns['employeeid'])
{
(this.tblhrmsodadvancessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsodadvancesemployeeid3));
this.tblhrmsodadvancessource.initGrid();
}
});
}
this.bfilterPopulatehrmsodadvances=true;
}
async hrmsodadvancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsodadvancesTableConfig()
{
this.hrmsodadvancessettings = {
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
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodadvancescurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
amount: {
title: 'Amount',
type: '',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodadvancesemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsodadvancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodadvancesID)>=0)
{
this.hrmsodadvancessource=new LocalDataSource();
this.hrmsodadvancessource.load(this.hrmsodrequestservice.hrmsodadvances as  any as LocalDataSource);
this.hrmsodadvancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsodadvancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsodrequestservice.hrmsodadvances.length == 0)
{
    this.tblhrmsodadvancessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsodadvance();
    this.hrmsodrequestservice.hrmsodadvances.push(obj);
    this.hrmsodadvancessource.refresh();
    if ((this.hrmsodrequestservice.hrmsodadvances.length / this.hrmsodadvancessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsodadvancessource.getPaging().page)
    {
        this.hrmsodadvancessource.setPage((this.hrmsodrequestservice.hrmsodadvances.length / this.hrmsodadvancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsodadvancessource.grid.edit(this.tblhrmsodadvancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsodadvancessource.data.indexOf(event.data);
this.onDeletehrmsodadvance(event,event.data.odadvanceid,((this.hrmsodadvancessource.getPaging().page-1) *this.hrmsodadvancessource.getPaging().perPage)+index);
this.hrmsodadvancessource.refresh();
break;
}
}

*/
hrmsodadvancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsodadvance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsodadvance(event,event.data.odadvanceid,this.formid);
break;
case 'delete':
this.onDeletehrmsodadvance(event,event.data.odadvanceid,((this.hrmsodadvancessource.getPaging().page-1) *this.hrmsodadvancessource.getPaging().perPage)+event.index);
this.hrmsodadvancessource.refresh();
break;
}
}
hrmsodadvancesonDelete(obj) {
let odadvanceid=obj.data.odadvanceid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsodrequestservice.deletehrmsodrequest(odadvanceid).then(res=>
this.hrmsodadvancesLoadTable()
);
}
}
hrmsodadvancesPaging(val)
{
debugger;
this.hrmsodadvancessource.setPaging(1, val, true);
}

handlehrmsodadvancesGridSelected(event:any) {
this.hrmsodadvancesselectedindex=this.hrmsodrequestservice.hrmsodadvances.findIndex(i => i.odadvanceid === event.data.odadvanceid);
}
IshrmsodadvancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodadvancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsodadvances
//start of Grid Codes hrmsodclaims
hrmsodclaimssettings:any;
hrmsodclaimssource: any;

showhrmsodclaimsCheckbox()
{
debugger;
if(this.tblhrmsodclaimssource.settings['selectMode']== 'multi')this.tblhrmsodclaimssource.settings['selectMode']= 'single';
else
this.tblhrmsodclaimssource.settings['selectMode']= 'multi';
this.tblhrmsodclaimssource.initGrid();
}
deletehrmsodclaimsAll()
{
this.tblhrmsodclaimssource.settings['selectMode'] = 'single';
}
showhrmsodclaimsFilter()
{
  setTimeout(() => {
  this.SethrmsodclaimsTableddConfig();
  });
      if(this.tblhrmsodclaimssource.settings!=null)this.tblhrmsodclaimssource.settings['hideSubHeader'] =!this.tblhrmsodclaimssource.settings['hideSubHeader'];
this.tblhrmsodclaimssource.initGrid();
}
showhrmsodclaimsInActive()
{
}
enablehrmsodclaimsInActive()
{
}
async SethrmsodclaimsTableddConfig()
{
if(!this.bfilterPopulatehrmsodclaims){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodclaimsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsodclaimsemployeeid3.push(obj);
}
if((this.tblhrmsodclaimssource.settings as any).columns['employeeid'])
{
(this.tblhrmsodclaimssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsodclaimsemployeeid3));
this.tblhrmsodclaimssource.initGrid();
}
});

this.configservice.getList("claimtype").then(res=>
{
var dataclaimtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodclaimsclaimtype3.push(defaultobj);
for(let i=0; i<dataclaimtype2.length; i++){
var obj= { value: dataclaimtype2[i].configkey, title: dataclaimtype2[i].configtext};
this.datahrmsodclaimsclaimtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsodclaimssource.settings);
if(clone.columns['claimtype']!=undefined)clone.columns['claimtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodclaimsclaimtype3)), }, };
if(clone.columns['claimtype']!=undefined)clone.columns['claimtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodclaimsclaimtype3)), }, };
this.tblhrmsodclaimssource.settings =  clone;
this.tblhrmsodclaimssource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodclaimscurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.datahrmsodclaimscurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsodclaimssource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodclaimscurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodclaimscurrency3)), }, };
this.tblhrmsodclaimssource.settings =  clone;
this.tblhrmsodclaimssource.initGrid();
});
}
this.bfilterPopulatehrmsodclaims=true;
}
async hrmsodclaimsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsodclaimsTableConfig()
{
this.hrmsodclaimssettings = {
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
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodclaimsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
claimdate: {
title: 'Claim Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
claimtype: {
title: 'Claim Type',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodclaimsclaimtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
claimreason: {
title: 'Claim Reason',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodclaimscurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
claimamount: {
title: 'Claim Amount',
type: 'number',
filter:true,
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
earningvoucherid: {
title: 'Earning Voucher',
type: 'number',
filter:true,
},
},
};
}
hrmsodclaimsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodclaimsID)>=0)
{
this.hrmsodclaimssource=new LocalDataSource();
this.hrmsodclaimssource.load(this.hrmsodrequestservice.hrmsodclaims as  any as LocalDataSource);
this.hrmsodclaimssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsodclaimsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsodrequestservice.hrmsodclaims.length == 0)
{
    this.tblhrmsodclaimssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsodclaim();
    this.hrmsodrequestservice.hrmsodclaims.push(obj);
    this.hrmsodclaimssource.refresh();
    if ((this.hrmsodrequestservice.hrmsodclaims.length / this.hrmsodclaimssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsodclaimssource.getPaging().page)
    {
        this.hrmsodclaimssource.setPage((this.hrmsodrequestservice.hrmsodclaims.length / this.hrmsodclaimssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsodclaimssource.grid.edit(this.tblhrmsodclaimssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsodclaimssource.data.indexOf(event.data);
this.onDeletehrmsodclaim(event,event.data.claimid,((this.hrmsodclaimssource.getPaging().page-1) *this.hrmsodclaimssource.getPaging().perPage)+index);
this.hrmsodclaimssource.refresh();
break;
}
}

*/
hrmsodclaimsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsodclaim(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsodclaim(event,event.data.claimid,this.formid);
break;
case 'delete':
this.onDeletehrmsodclaim(event,event.data.claimid,((this.hrmsodclaimssource.getPaging().page-1) *this.hrmsodclaimssource.getPaging().perPage)+event.index);
this.hrmsodclaimssource.refresh();
break;
}
}
hrmsodclaimsonDelete(obj) {
let claimid=obj.data.claimid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsodrequestservice.deletehrmsodrequest(claimid).then(res=>
this.hrmsodclaimsLoadTable()
);
}
}
hrmsodclaimsPaging(val)
{
debugger;
this.hrmsodclaimssource.setPaging(1, val, true);
}

handlehrmsodclaimsGridSelected(event:any) {
this.hrmsodclaimsselectedindex=this.hrmsodrequestservice.hrmsodclaims.findIndex(i => i.claimid === event.data.claimid);
}
IshrmsodclaimsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodclaimsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsodclaims
//start of Grid Codes hrmsodtravels
hrmsodtravelssettings:any;
hrmsodtravelssource: any;

showhrmsodtravelsCheckbox()
{
debugger;
if(this.tblhrmsodtravelssource.settings['selectMode']== 'multi')this.tblhrmsodtravelssource.settings['selectMode']= 'single';
else
this.tblhrmsodtravelssource.settings['selectMode']= 'multi';
this.tblhrmsodtravelssource.initGrid();
}
deletehrmsodtravelsAll()
{
this.tblhrmsodtravelssource.settings['selectMode'] = 'single';
}
showhrmsodtravelsFilter()
{
  setTimeout(() => {
  this.SethrmsodtravelsTableddConfig();
  });
      if(this.tblhrmsodtravelssource.settings!=null)this.tblhrmsodtravelssource.settings['hideSubHeader'] =!this.tblhrmsodtravelssource.settings['hideSubHeader'];
this.tblhrmsodtravelssource.initGrid();
}
showhrmsodtravelsInActive()
{
}
enablehrmsodtravelsInActive()
{
}
async SethrmsodtravelsTableddConfig()
{
if(!this.bfilterPopulatehrmsodtravels){

this.configservice.getList("travelmode").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodtravelsmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmsodtravelsmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsodtravelssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodtravelsmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsodtravelsmode3)), }, };
this.tblhrmsodtravelssource.settings =  clone;
this.tblhrmsodtravelssource.initGrid();
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsodtravelsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsodtravelsemployeeid3.push(obj);
}
if((this.tblhrmsodtravelssource.settings as any).columns['employeeid'])
{
(this.tblhrmsodtravelssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsodtravelsemployeeid3));
this.tblhrmsodtravelssource.initGrid();
}
});
}
this.bfilterPopulatehrmsodtravels=true;
}
async hrmsodtravelsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsodtravelsTableConfig()
{
this.hrmsodtravelssettings = {
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
traveldate: {
title: 'Travel Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodtravelsmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromdate: {
title: 'From Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
todate: {
title: 'To Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
traveldetails: {
title: 'Travel Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsodtravelsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsodtravelsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodtravelsID)>=0)
{
this.hrmsodtravelssource=new LocalDataSource();
this.hrmsodtravelssource.load(this.hrmsodrequestservice.hrmsodtravels as  any as LocalDataSource);
this.hrmsodtravelssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsodtravelsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsodrequestservice.hrmsodtravels.length == 0)
{
    this.tblhrmsodtravelssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsodtravel();
    this.hrmsodrequestservice.hrmsodtravels.push(obj);
    this.hrmsodtravelssource.refresh();
    if ((this.hrmsodrequestservice.hrmsodtravels.length / this.hrmsodtravelssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsodtravelssource.getPaging().page)
    {
        this.hrmsodtravelssource.setPage((this.hrmsodrequestservice.hrmsodtravels.length / this.hrmsodtravelssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsodtravelssource.grid.edit(this.tblhrmsodtravelssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsodtravelssource.data.indexOf(event.data);
this.onDeletehrmsodtravel(event,event.data.odtravelid,((this.hrmsodtravelssource.getPaging().page-1) *this.hrmsodtravelssource.getPaging().perPage)+index);
this.hrmsodtravelssource.refresh();
break;
}
}

*/
hrmsodtravelsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsodtravel(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsodtravel(event,event.data.odtravelid,this.formid);
break;
case 'delete':
this.onDeletehrmsodtravel(event,event.data.odtravelid,((this.hrmsodtravelssource.getPaging().page-1) *this.hrmsodtravelssource.getPaging().perPage)+event.index);
this.hrmsodtravelssource.refresh();
break;
}
}
hrmsodtravelsonDelete(obj) {
let odtravelid=obj.data.odtravelid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsodrequestservice.deletehrmsodrequest(odtravelid).then(res=>
this.hrmsodtravelsLoadTable()
);
}
}
hrmsodtravelsPaging(val)
{
debugger;
this.hrmsodtravelssource.setPaging(1, val, true);
}

handlehrmsodtravelsGridSelected(event:any) {
this.hrmsodtravelsselectedindex=this.hrmsodrequestservice.hrmsodtravels.findIndex(i => i.odtravelid === event.data.odtravelid);
}
IshrmsodtravelsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsodtravelsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsodtravels

}



