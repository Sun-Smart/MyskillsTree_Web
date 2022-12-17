import { hrmsleaverequestService } from './../../../service/hrmsleaverequest.service';
import { hrmsleaverequest } from './../../../model/hrmsleaverequest.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { hrmsleavepolicymaster} from './../../../model/hrmsleavepolicymaster.model';
import { hrmsleavepolicymasterService } from './../../../service/hrmsleavepolicymaster.service';
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
selector: 'app-hrmsleaverequest',
templateUrl: './hrmsleaverequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsleaverequestComponent implements OnInit {
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
bfilterPopulatehrmsleaverequests:boolean=false;
datahrmsleaverequestsbranchid3:any=[];
datahrmsleaverequestsemployeeid3:any=[];
datahrmsleaverequestsdepartmentid3:any=[];
datahrmsleaverequestsdesignationid3:any=[];
datahrmsleaverequestsleavetypeid3:any=[];
datahrmsleaverequestsleaveperiod3:any=[];
datahrmsleaverequestsfrommode3:any=[];
datahrmsleaverequeststomode3:any=[];
 hrmsleaverequestForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
departmentidList: bomasterdata[];
designationidList: boconfigvalue[];
leavetypeidList: hrmsleavepolicymaster[];
leaveperiodList: boconfigvalue[];
frommodeList: boconfigvalue[];
tomodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsleaverequestshowOption:boolean;
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
private hrmsleaverequestservice: hrmsleaverequestService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
private hrmsleavepolicymasterservice:hrmsleavepolicymasterService,
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
this.hrmsleaverequestForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
leaverequestid: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
reference: [null],
requesteddate: [null],
leavetypeid: [null],
leavetypeiddesc: [null],
leaveperiod: [null],
leaveperioddesc: [null],
plannedfromdate: [null],
frommode: [null],
frommodedesc: [null],
plannedtodate: [null],
tomode: [null],
tomodedesc: [null],
actualfromdate: [null],
actualtodate: [null],
reason: [null],
leavedays: [null],
availedleave: [null],
availableleave: [null],
currentleave: [null],
balance: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsleaverequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsleaverequestForm.dirty && this.hrmsleaverequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.leaverequestid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.leaverequestid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.leaverequestid && pkDetail) {
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
let hrmsleaverequestid = null;

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
this.formid=hrmsleaverequestid;
//this.sharedService.alert(hrmsleaverequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.hrmsleaverequestservice.formData && this.hrmsleaverequestservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmsleaverequestForm.patchValue({
    branchid: this.hrmsleaverequestservice.formData.branchid,
    branchiddesc: this.hrmsleaverequestservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmsleaverequestForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsleaverequestservice.formData && this.hrmsleaverequestservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsleaverequestForm.patchValue({
    employeeid: this.hrmsleaverequestservice.formData.employeeid,
    employeeiddesc: this.hrmsleaverequestservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsleaverequestForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
    this.hrmsleaverequestForm.patchValue({ employeename: objemployeeid.employeename });
    this.hrmsleaverequestForm.patchValue({ departmentid: objemployeeid.departmentid });
    this.hrmsleaverequestForm.patchValue({ designationid: objemployeeid.designationid });
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
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("designation").then(res => this.designationidList = res as boconfigvalue[]);
this.hrmsleavepolicymasterservice.gethrmsleavepolicymastersList().then(res => 
{
this.leavetypeidList = res as hrmsleavepolicymaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("leaveperiod").then(res => this.leaveperiodList = res as boconfigvalue[]);
this.configservice.getList("leavemode").then(res => this.frommodeList = res as boconfigvalue[]);
this.configservice.getList("leavemode").then(res => this.tomodeList = res as boconfigvalue[]);

//autocomplete
    this.hrmsleaverequestservice.gethrmsleaverequestsList().then(res => {
      this.pkList = res as hrmsleaverequest[];
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
this.hrmsleaverequestForm.markAsUntouched();
this.hrmsleaverequestForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmsleaverequestForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsleaverequestForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});
this.hrmsleaverequestForm.patchValue({employeename:employeeidDetail.employeename});
this.hrmsleaverequestForm.patchValue({departmentid:employeeidDetail.departmentid});
this.hrmsleaverequestForm.patchValue({designationid:employeeidDetail.designationid});

}
}




resetForm() {
if (this.hrmsleaverequestForm != null)
this.hrmsleaverequestForm.reset();
this.hrmsleaverequestForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let leaverequestid = this.hrmsleaverequestForm.get('leaverequestid').value;
        if(leaverequestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsleaverequestservice.deletehrmsleaverequest(leaverequestid).then(res =>
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
    this.hrmsleaverequestForm.patchValue({
        leaverequestid: null
    });
    if(this.hrmsleaverequestservice.formData.leaverequestid!=null)this.hrmsleaverequestservice.formData.leaverequestid=null;
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
        else if(key=="requesteddate")
this.hrmsleaverequestForm.patchValue({"requesteddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="plannedfromdate")
this.hrmsleaverequestForm.patchValue({"plannedfromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="plannedtodate")
this.hrmsleaverequestForm.patchValue({"plannedtodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualfromdate")
this.hrmsleaverequestForm.patchValue({"actualfromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualtodate")
this.hrmsleaverequestForm.patchValue({"actualtodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsleaverequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsleaverequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsleaverequestForm.controls[key]!=undefined)
{
this.hrmsleaverequestForm.controls[key].disable({onlySelf: true});
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
leaverequestidonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
employeenameonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.hrmsleaverequestForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.hrmsleaverequestForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
referenceonChange(evt:any){
let e=evt.value;
}
requesteddateonChange(evt:any){
let e=evt.value;
}
leavetypeidonChange(evt:any){
let e=evt.value;
this.hrmsleaverequestForm.patchValue({leavetypeiddesc:evt.options[evt.options.selectedIndex].text});
}
leaveperiodonChange(evt:any){
let e=this.f.leaveperiod.value as any;
this.hrmsleaverequestForm.patchValue({leaveperioddesc:evt.options[evt.options.selectedIndex].text});
}
plannedfromdateonChange(evt:any){
let e=evt.value;
}
frommodeonChange(evt:any){
let e=this.f.frommode.value as any;
this.hrmsleaverequestForm.patchValue({frommodedesc:evt.options[evt.options.selectedIndex].text});
}
plannedtodateonChange(evt:any){
let e=evt.value;
}
tomodeonChange(evt:any){
let e=this.f.tomode.value as any;
this.hrmsleaverequestForm.patchValue({tomodedesc:evt.options[evt.options.selectedIndex].text});
}
actualfromdateonChange(evt:any){
let e=evt.value;
}
actualtodateonChange(evt:any){
let e=evt.value;
}
reasononChange(evt:any){
let e=evt.value;
}
leavedaysonChange(evt:any){
let e=evt.value;
}
availedleaveonChange(evt:any){
let e=evt.value;
}
availableleaveonChange(evt:any){
let e=evt.value;
}
currentleaveonChange(evt:any){
let e=evt.value;
}
balanceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsleaverequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsleaverequestservice.gethrmsleaverequestsByEID(pkcol).then(res => {

this.hrmsleaverequestservice.formData=res.hrmsleaverequest;
let formproperty=res.hrmsleaverequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsleaverequest.pkcol;
this.formid=res.hrmsleaverequest.leaverequestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsleaverequest.leaverequestid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsleaverequestForm.patchValue({
branchid: res.hrmsleaverequest.branchid,
branchiddesc: res.hrmsleaverequest.branchiddesc,
leaverequestid: res.hrmsleaverequest.leaverequestid,
employeeid: res.hrmsleaverequest.employeeid,
employeeiddesc: res.hrmsleaverequest.employeeiddesc,
employeename: res.hrmsleaverequest.employeename,
departmentid: res.hrmsleaverequest.departmentid,
departmentiddesc: res.hrmsleaverequest.departmentiddesc,
designationid: res.hrmsleaverequest.designationid,
designationiddesc: res.hrmsleaverequest.designationiddesc,
reference: res.hrmsleaverequest.reference,
requesteddate: this.ngbDateParserFormatter.parse(res.hrmsleaverequest.requesteddate),
leavetypeid: res.hrmsleaverequest.leavetypeid,
leavetypeiddesc: res.hrmsleaverequest.leavetypeiddesc,
leaveperiod: res.hrmsleaverequest.leaveperiod,
leaveperioddesc: res.hrmsleaverequest.leaveperioddesc,
plannedfromdate: this.ngbDateParserFormatter.parse(res.hrmsleaverequest.plannedfromdate),
frommode: res.hrmsleaverequest.frommode,
frommodedesc: res.hrmsleaverequest.frommodedesc,
plannedtodate: this.ngbDateParserFormatter.parse(res.hrmsleaverequest.plannedtodate),
tomode: res.hrmsleaverequest.tomode,
tomodedesc: res.hrmsleaverequest.tomodedesc,
actualfromdate: this.ngbDateParserFormatter.parse(res.hrmsleaverequest.actualfromdate),
actualtodate: this.ngbDateParserFormatter.parse(res.hrmsleaverequest.actualtodate),
reason: res.hrmsleaverequest.reason,
leavedays: res.hrmsleaverequest.leavedays,
availedleave: res.hrmsleaverequest.availedleave,
availableleave: res.hrmsleaverequest.availableleave,
currentleave: res.hrmsleaverequest.currentleave,
balance: res.hrmsleaverequest.balance,
status: res.hrmsleaverequest.status,
statusdesc: res.hrmsleaverequest.statusdesc,
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
  for (let key in this.hrmsleaverequestForm.controls) {
    if (this.hrmsleaverequestForm.controls[key] != null) {
if(false)
{
if(this.hrmsleaverequestservice.formData!=null && this.hrmsleaverequestservice.formData[key]!=null  && this.hrmsleaverequestservice.formData[key]!='[]' && this.hrmsleaverequestservice.formData[key]!=undefined && this.hrmsleaverequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsleaverequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsleaverequestservice.formData!=null && this.hrmsleaverequestservice.formData[key]!=null   && this.hrmsleaverequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsleaverequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsleaverequestservice.formData!=null && this.hrmsleaverequestservice.formData[key]!=null   && this.hrmsleaverequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsleaverequestservice.formData[key]+"'><div class='progress__number'>"+this.hrmsleaverequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsleaverequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsleaverequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsleaverequestForm.value;
obj.requesteddate=new Date(this.hrmsleaverequestForm.get('requesteddate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('requesteddate').value)+'  UTC' :null);
obj.plannedfromdate=new Date(this.hrmsleaverequestForm.get('plannedfromdate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('plannedfromdate').value)+'  UTC' :null);
obj.plannedtodate=new Date(this.hrmsleaverequestForm.get('plannedtodate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('plannedtodate').value)+'  UTC' :null);
obj.actualfromdate=new Date(this.hrmsleaverequestForm.get('actualfromdate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('actualfromdate').value)+'  UTC' :null);
obj.actualtodate=new Date(this.hrmsleaverequestForm.get('actualtodate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('actualtodate').value)+'  UTC' :null);
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

private hrmsleaverequesttoggleOption(){
this.hrmsleaverequestshowOption = this.hrmsleaverequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsleaverequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsleaverequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsleaverequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsleaverequestservice.formData=this.hrmsleaverequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsleaverequestForm.controls[key] != null)
    {
        this.hrmsleaverequestservice.formData[key] = this.hrmsleaverequestForm.controls[key].value;
    }
}
}
}
this.hrmsleaverequestservice.formData.requesteddate=new Date(this.hrmsleaverequestForm.get('requesteddate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('requesteddate').value)+'  UTC' :null);
this.hrmsleaverequestservice.formData.plannedfromdate=new Date(this.hrmsleaverequestForm.get('plannedfromdate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('plannedfromdate').value)+'  UTC' :null);
this.hrmsleaverequestservice.formData.plannedtodate=new Date(this.hrmsleaverequestForm.get('plannedtodate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('plannedtodate').value)+'  UTC' :null);
this.hrmsleaverequestservice.formData.actualfromdate=new Date(this.hrmsleaverequestForm.get('actualfromdate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('actualfromdate').value)+'  UTC' :null);
this.hrmsleaverequestservice.formData.actualtodate=new Date(this.hrmsleaverequestForm.get('actualtodate').value ? this.ngbDateParserFormatter.format(this.hrmsleaverequestForm.get('actualtodate').value)+'  UTC' :null);
console.log(this.hrmsleaverequestservice.formData);
this.hrmsleaverequestservice.formData=this.hrmsleaverequestForm.value;
this.hrmsleaverequestservice.saveOrUpdatehrmsleaverequests().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsleaverequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsleaverequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsleaverequest);
}
else
{
this.FillData(res);
}
}
this.hrmsleaverequestForm.markAsUntouched();
this.hrmsleaverequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.hrmsleaverequestForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsleaverequestForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsleaverequestForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditleavetypeid( leavetypeid) {
/*let ScreenType='2';
this.dialog.open(hrmsleavepolicymasterComponent, 
{
data: {leavetypeid:this.hrmsleaverequestForm.get('leavetypeid').value, ScreenType:2 }
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



