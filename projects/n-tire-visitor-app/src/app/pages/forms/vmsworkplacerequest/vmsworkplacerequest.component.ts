import { vmsworkplacerequestService } from './../../../service/vmsworkplacerequest.service';
import { vmsworkplacerequest } from './../../../model/vmsworkplacerequest.model';
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
import { vmsworkplace} from './../../../model/vmsworkplace.model';
import { vmsworkplaceComponent } from './../../../pages/forms/vmsworkplace/vmsworkplace.component';
import { vmsworkplaceService } from './../../../service/vmsworkplace.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
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
selector: 'app-vmsworkplacerequest',
templateUrl: './vmsworkplacerequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class vmsworkplacerequestComponent implements OnInit {
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
bfilterPopulatevmsworkplacerequests:boolean=false;
datavmsworkplacerequestslocationid3:any=[];
datavmsworkplacerequestsworkplaceid3:any=[];
datavmsworkplacerequestsrequestedby3:any=[];
datavmsworkplacerequestsprojectid3:any=[];
datavmsworkplacerequestsrequeststatus3:any=[];
 vmsworkplacerequestForm: FormGroup;
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
workplaceidList: vmsworkplace[];
requestedbyList: hrmsemployee[];
requestedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestedby_hrmsemployeesForm: FormGroup;//autocomplete
requestedby_hrmsemployeesoptions:any;//autocomplete
requestedby_hrmsemployeesformatter:any;//autocomplete
projectidList: prjprojectmaster[];
requeststatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
vmsworkplacerequestshowOption:boolean;
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
private vmsworkplacerequestservice: vmsworkplacerequestService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchlocationservice:bobranchlocationService,
private vmsworkplaceservice:vmsworkplaceService,
private hrmsemployeeservice:hrmsemployeeService,
private prjprojectmasterservice:prjprojectmasterService,
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
this.vmsworkplacerequestForm  = this.fb.group({
pk:[null],
requestid: [null],
locationid: [null, Validators.required],
locationiddesc: [null],
workplaceid: [null, Validators.required],
workplaceiddesc: [null],
startdate: [null],
starttime: [null],
enddate: [null],
endtime: [null],
requestedby: [null, Validators.required],
requestedbydesc: [null],
projectid: [null],
projectiddesc: [null],
requeststatus: [null],
requeststatusdesc: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.vmsworkplacerequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.vmsworkplacerequestForm.dirty && this.vmsworkplacerequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.requestid && pkDetail) {
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
let vmsworkplacerequestid = null;

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
this.formid=vmsworkplacerequestid;
//this.sharedService.alert(vmsworkplacerequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.vmsworkplacerequestservice.formData && this.vmsworkplacerequestservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.vmsworkplacerequestForm.patchValue({
    locationid: this.vmsworkplacerequestservice.formData.locationid,
    locationiddesc: this.vmsworkplacerequestservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.vmsworkplacerequestForm.get('locationid').value);
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
this.vmsworkplaceservice.getvmsworkplacesList().then(res => 
{
this.workplaceidList = res as vmsworkplace[];
}
).catch((err) => {console.log(err);});
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.requestedbyList = res as hrmsemployee[];
if(this.vmsworkplacerequestservice.formData && this.vmsworkplacerequestservice.formData.requestedby){
this.requestedbyoptionsEvent.emit(this.requestedbyList);
this.vmsworkplacerequestForm.patchValue({
    requestedby: this.vmsworkplacerequestservice.formData.requestedby,
    requestedbydesc: this.vmsworkplacerequestservice.formData.requestedbydesc,
});
}
{
let arrrequestedby = this.requestedbyList.filter(v => v.employeeid == this.vmsworkplacerequestForm.get('requestedby').value);
let objrequestedby;
if (arrrequestedby.length > 0) objrequestedby = arrrequestedby[0];
if (objrequestedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestedby_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestedbyList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestedby_hrmsemployeesformatter = (result: any) => result.employeename;
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("requeststatus").then(res => this.requeststatusList = res as boconfigvalue[]);

//autocomplete
    this.vmsworkplacerequestservice.getvmsworkplacerequestsList().then(res => {
      this.pkList = res as vmsworkplacerequest[];
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
this.vmsworkplacerequestForm.markAsUntouched();
this.vmsworkplacerequestForm.markAsPristine();
}
onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.vmsworkplacerequestForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelectedrequestedby(requestedbyDetail: any) {
if (requestedbyDetail.employeeid && requestedbyDetail) {
this.vmsworkplacerequestForm.patchValue({
requestedby: requestedbyDetail.employeeid,
requestedbydesc: requestedbyDetail.employeename,

});

}
}




resetForm() {
if (this.vmsworkplacerequestForm != null)
this.vmsworkplacerequestForm.reset();
this.vmsworkplacerequestForm.patchValue({
});
this.vmsworkplacerequestForm.patchValue({
startdate: this.ngbDateParserFormatter.parse(new Date().toString()),
starttime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
enddate: this.ngbDateParserFormatter.parse(this.sharedService.addDays(new Date(),1).toString()),
endtime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
requestedby: this.sessiondata.userid,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let requestid = this.vmsworkplacerequestForm.get('requestid').value;
        if(requestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.vmsworkplacerequestservice.deletevmsworkplacerequest(requestid).then(res =>
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
    this.vmsworkplacerequestForm.patchValue({
        requestid: null
    });
    if(this.vmsworkplacerequestservice.formData.requestid!=null)this.vmsworkplacerequestservice.formData.requestid=null;
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
this.vmsworkplacerequestForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="starttime")
this.vmsworkplacerequestForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="enddate")
this.vmsworkplacerequestForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="endtime")
this.vmsworkplacerequestForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.vmsworkplacerequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.vmsworkplacerequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.vmsworkplacerequestForm.controls[key]!=undefined)
{
this.vmsworkplacerequestForm.controls[key].disable({onlySelf: true});
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
requestidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
workplaceidonChange(evt:any){
let e=evt.value;
this.vmsworkplacerequestForm.patchValue({workplaceiddesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
starttimeonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
endtimeonChange(evt:any){
let e=evt.value;
}
requestedbyonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
this.vmsworkplacerequestForm.patchValue({projectiddesc:evt.options[evt.options.selectedIndex].text});
}
requeststatusonChange(evt:any){
let e=this.f.requeststatus.value as any;
this.vmsworkplacerequestForm.patchValue({requeststatusdesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editvmsworkplacerequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.vmsworkplacerequestservice.getvmsworkplacerequestsByEID(pkcol).then(res => {

this.vmsworkplacerequestservice.formData=res.vmsworkplacerequest;
let formproperty=res.vmsworkplacerequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.vmsworkplacerequest.pkcol;
this.formid=res.vmsworkplacerequest.requestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.vmsworkplacerequest.requestid;
var starttimeTime=new Time( res.vmsworkplacerequest.starttime);
var endtimeTime=new Time( res.vmsworkplacerequest.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.vmsworkplacerequestForm.patchValue({
requestid: res.vmsworkplacerequest.requestid,
locationid: res.vmsworkplacerequest.locationid,
locationiddesc: res.vmsworkplacerequest.locationiddesc,
workplaceid: res.vmsworkplacerequest.workplaceid,
workplaceiddesc: res.vmsworkplacerequest.workplaceiddesc,
startdate: this.ngbDateParserFormatter.parse(res.vmsworkplacerequest.startdate),
starttime: starttimeTime,
enddate: this.ngbDateParserFormatter.parse(res.vmsworkplacerequest.enddate),
endtime: endtimeTime,
requestedby: res.vmsworkplacerequest.requestedby,
requestedbydesc: res.vmsworkplacerequest.requestedbydesc,
projectid: res.vmsworkplacerequest.projectid,
projectiddesc: res.vmsworkplacerequest.projectiddesc,
requeststatus: res.vmsworkplacerequest.requeststatus,
requeststatusdesc: res.vmsworkplacerequest.requeststatusdesc,
notes: res.vmsworkplacerequest.notes,
status: res.vmsworkplacerequest.status,
statusdesc: res.vmsworkplacerequest.statusdesc,
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
  for (let key in this.vmsworkplacerequestForm.controls) {
    if (this.vmsworkplacerequestForm.controls[key] != null) {
if(false)
{
if(this.vmsworkplacerequestservice.formData!=null && this.vmsworkplacerequestservice.formData[key]!=null  && this.vmsworkplacerequestservice.formData[key]!='[]' && this.vmsworkplacerequestservice.formData[key]!=undefined && this.vmsworkplacerequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.vmsworkplacerequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.vmsworkplacerequestservice.formData!=null && this.vmsworkplacerequestservice.formData[key]!=null   && this.vmsworkplacerequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.vmsworkplacerequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.vmsworkplacerequestservice.formData!=null && this.vmsworkplacerequestservice.formData[key]!=null   && this.vmsworkplacerequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.vmsworkplacerequestservice.formData[key]+"'><div class='progress__number'>"+this.vmsworkplacerequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.vmsworkplacerequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.vmsworkplacerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.vmsworkplacerequestForm.value;
obj.startdate=new Date(this.vmsworkplacerequestForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacerequestForm.get('startdate').value)+'  UTC' :null);
obj.starttime=(this.vmsworkplacerequestForm.get('starttime').value==null?0:this.vmsworkplacerequestForm.get('starttime').value.hour)+':'+(this.vmsworkplacerequestForm.get('starttime').value==null?0:this.vmsworkplacerequestForm.get('starttime').value.minute+":00");
obj.enddate=new Date(this.vmsworkplacerequestForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacerequestForm.get('enddate').value)+'  UTC' :null);
obj.endtime=(this.vmsworkplacerequestForm.get('endtime').value==null?0:this.vmsworkplacerequestForm.get('endtime').value.hour)+':'+(this.vmsworkplacerequestForm.get('endtime').value==null?0:this.vmsworkplacerequestForm.get('endtime').value.minute+":00");
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

private vmsworkplacerequesttoggleOption(){
this.vmsworkplacerequestshowOption = this.vmsworkplacerequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.vmsworkplacerequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.vmsworkplacerequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.vmsworkplacerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.vmsworkplacerequestservice.formData=this.vmsworkplacerequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.vmsworkplacerequestForm.controls[key] != null)
    {
        this.vmsworkplacerequestservice.formData[key] = this.vmsworkplacerequestForm.controls[key].value;
    }
}
}
}
this.vmsworkplacerequestservice.formData.startdate=new Date(this.vmsworkplacerequestForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacerequestForm.get('startdate').value)+'  UTC' :null);
this.vmsworkplacerequestservice.formData.starttime=(this.vmsworkplacerequestForm.get('starttime').value==null?0:this.vmsworkplacerequestForm.get('starttime').value.hour)+':'+(this.vmsworkplacerequestForm.get('starttime').value==null?0:this.vmsworkplacerequestForm.get('starttime').value.minute+":00");
this.vmsworkplacerequestservice.formData.enddate=new Date(this.vmsworkplacerequestForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacerequestForm.get('enddate').value)+'  UTC' :null);
this.vmsworkplacerequestservice.formData.endtime=(this.vmsworkplacerequestForm.get('endtime').value==null?0:this.vmsworkplacerequestForm.get('endtime').value.hour)+':'+(this.vmsworkplacerequestForm.get('endtime').value==null?0:this.vmsworkplacerequestForm.get('endtime').value.minute+":00");
console.log(this.vmsworkplacerequestservice.formData);
this.vmsworkplacerequestservice.formData=this.vmsworkplacerequestForm.value;
this.vmsworkplacerequestservice.saveOrUpdatevmsworkplacerequests().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsworkplacerequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.vmsworkplacerequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsworkplacerequest);
}
else
{
this.FillData(res);
}
}
this.vmsworkplacerequestForm.markAsUntouched();
this.vmsworkplacerequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.vmsworkplacerequestForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkplaceid( workplaceid) {
/*let ScreenType='2';
this.dialog.open(vmsworkplaceComponent, 
{
data: {workplaceid:this.vmsworkplacerequestForm.get('workplaceid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestedby( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.vmsworkplacerequestForm.get('requestedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.vmsworkplacerequestForm.get('projectid').value, ScreenType:2 }
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



