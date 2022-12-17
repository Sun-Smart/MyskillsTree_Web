import { hrmsapplicantofferService } from './../../../service/hrmsapplicantoffer.service';
import { hrmsapplicantoffer } from './../../../model/hrmsapplicantoffer.model';
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
import { hrmsmanpowerrequest} from './../../../model/hrmsmanpowerrequest.model';
import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
//popups
import { hrmsinterviewschedule} from './../../../model/hrmsinterviewschedule.model';
import { hrmsinterviewscheduleService } from './../../../service/hrmsinterviewschedule.service';
//popups
import { hrmsapplicantmaster} from './../../../model/hrmsapplicantmaster.model';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-hrmsapplicantoffer',
templateUrl: './hrmsapplicantoffer.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsapplicantofferComponent implements OnInit {
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
bfilterPopulatehrmsapplicantoffers:boolean=false;
datahrmsapplicantoffersmprid3:any=[];
datahrmsapplicantoffersinterviewid3:any=[];
datahrmsapplicantoffersapplicantid3:any=[];
datahrmsapplicantoffersdepartment3:any=[];
datahrmsapplicantoffersemployeeid3:any=[];
 hrmsapplicantofferForm: FormGroup;
mpridList: hrmsmanpowerrequest[];
mpridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
mprid_hrmsmanpowerrequestsForm: FormGroup;//autocomplete
mprid_hrmsmanpowerrequestsoptions:any;//autocomplete
mprid_hrmsmanpowerrequestsformatter:any;//autocomplete
interviewidList: hrmsinterviewschedule[];
interviewidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
interviewid_hrmsinterviewschedulesForm: FormGroup;//autocomplete
interviewid_hrmsinterviewschedulesoptions:any;//autocomplete
interviewid_hrmsinterviewschedulesformatter:any;//autocomplete
applicantidList: hrmsapplicantmaster[];
applicantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
applicantid_hrmsapplicantmastersForm: FormGroup;//autocomplete
applicantid_hrmsapplicantmastersoptions:any;//autocomplete
applicantid_hrmsapplicantmastersformatter:any;//autocomplete
departmentList: bomasterdata[];
employeeidList: bousermaster[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_bousermastersForm: FormGroup;//autocomplete
employeeid_bousermastersoptions:any;//autocomplete
employeeid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsapplicantoffershowOption:boolean;
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
private hrmsapplicantofferservice: hrmsapplicantofferService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsmanpowerrequestservice:hrmsmanpowerrequestService,
private hrmsinterviewscheduleservice:hrmsinterviewscheduleService,
private hrmsapplicantmasterservice:hrmsapplicantmasterService,
private bomasterdataservice:bomasterdataService,
private bousermasterservice:bousermasterService,
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
this.hrmsapplicantofferForm  = this.fb.group({
pk:[null],
offerid: [null],
mprid: [null],
mpriddesc: [null],
interviewid: [null],
interviewiddesc: [null],
offerdate: [null],
joiningdate: [null],
referenceno: [null],
applicantid: [null],
applicantiddesc: [null],
applicantcode: [null],
applicantname: [null],
title: [null],
department: [null],
departmentdesc: [null],
location: [null],
salarytype: [null],
basic: [null],
allowances: [null],
grosssalary: [null],
deductions: [null],
taxallowed: [null],
tax: [null],
netsalary: [null],
notes: [null],
remarks: [null],
approvaldate: [null],
offersentdate: [null],
acknowledged: [null],
acknowledgedate: [null],
joineddate: [null],
offerstatus: [null],
status: [null],
statusdesc: [null],
employeeid: [null],
employeeiddesc: [null],
});
}

get f() { return this.hrmsapplicantofferForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsapplicantofferForm.dirty && this.hrmsapplicantofferForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.offerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.offerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.offerid && pkDetail) {
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
let hrmsapplicantofferid = null;

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
this.formid=hrmsapplicantofferid;
//this.sharedService.alert(hrmsapplicantofferid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsList().then(res => 
{
this.mpridList = res as hrmsmanpowerrequest[];
if(this.hrmsapplicantofferservice.formData && this.hrmsapplicantofferservice.formData.mprid){
this.mpridoptionsEvent.emit(this.mpridList);
this.hrmsapplicantofferForm.patchValue({
    mprid: this.hrmsapplicantofferservice.formData.mprid,
    mpriddesc: this.hrmsapplicantofferservice.formData.mpriddesc,
});
}
{
let arrmprid = this.mpridList.filter(v => v.mprid == this.hrmsapplicantofferForm.get('mprid').value);
let objmprid;
if (arrmprid.length > 0) objmprid = arrmprid[0];
if (objmprid)
{
}
}
}
).catch((err) => {console.log(err);});
this.mprid_hrmsmanpowerrequestsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.mpridList.filter(v => v.mprreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.mprid_hrmsmanpowerrequestsformatter = (result: any) => result.mprreference;
this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesList().then(res => 
{
this.interviewidList = res as hrmsinterviewschedule[];
if(this.hrmsapplicantofferservice.formData && this.hrmsapplicantofferservice.formData.interviewid){
this.interviewidoptionsEvent.emit(this.interviewidList);
this.hrmsapplicantofferForm.patchValue({
    interviewid: this.hrmsapplicantofferservice.formData.interviewid,
    interviewiddesc: this.hrmsapplicantofferservice.formData.interviewiddesc,
});
}
{
let arrinterviewid = this.interviewidList.filter(v => v.interviewid == this.hrmsapplicantofferForm.get('interviewid').value);
let objinterviewid;
if (arrinterviewid.length > 0) objinterviewid = arrinterviewid[0];
if (objinterviewid)
{
}
}
}
).catch((err) => {console.log(err);});
this.interviewid_hrmsinterviewschedulesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.interviewidList.filter(v => v.interviewreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.interviewid_hrmsinterviewschedulesformatter = (result: any) => result.interviewreference;
this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => 
{
this.applicantidList = res as hrmsapplicantmaster[];
if(this.hrmsapplicantofferservice.formData && this.hrmsapplicantofferservice.formData.applicantid){
this.applicantidoptionsEvent.emit(this.applicantidList);
this.hrmsapplicantofferForm.patchValue({
    applicantid: this.hrmsapplicantofferservice.formData.applicantid,
    applicantiddesc: this.hrmsapplicantofferservice.formData.applicantiddesc,
});
}
{
let arrapplicantid = this.applicantidList.filter(v => v.applicantid == this.hrmsapplicantofferForm.get('applicantid').value);
let objapplicantid;
if (arrapplicantid.length > 0) objapplicantid = arrapplicantid[0];
if (objapplicantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.applicantid_hrmsapplicantmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.applicantidList.filter(v => v.applicantname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.applicantid_hrmsapplicantmastersformatter = (result: any) => result.applicantname;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.employeeidList = res as bousermaster[];
if(this.hrmsapplicantofferservice.formData && this.hrmsapplicantofferservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsapplicantofferForm.patchValue({
    employeeid: this.hrmsapplicantofferservice.formData.employeeid,
    employeeiddesc: this.hrmsapplicantofferservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.userid == this.hrmsapplicantofferForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmsapplicantofferservice.gethrmsapplicantoffersList().then(res => {
      this.pkList = res as hrmsapplicantoffer[];
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
this.hrmsapplicantofferForm.markAsUntouched();
this.hrmsapplicantofferForm.markAsPristine();
}
onSelectedmprid(mpridDetail: any) {
if (mpridDetail.mprid && mpridDetail) {
this.hrmsapplicantofferForm.patchValue({
mprid: mpridDetail.mprid,
mpriddesc: mpridDetail.mprreference,

});

}
}

onSelectedinterviewid(interviewidDetail: any) {
if (interviewidDetail.interviewid && interviewidDetail) {
this.hrmsapplicantofferForm.patchValue({
interviewid: interviewidDetail.interviewid,
interviewiddesc: interviewidDetail.interviewreference,

});

}
}

onSelectedapplicantid(applicantidDetail: any) {
if (applicantidDetail.applicantid && applicantidDetail) {
this.hrmsapplicantofferForm.patchValue({
applicantid: applicantidDetail.applicantid,
applicantiddesc: applicantidDetail.applicantname,

});

}
}

onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.userid && employeeidDetail) {
this.hrmsapplicantofferForm.patchValue({
employeeid: employeeidDetail.userid,
employeeiddesc: employeeidDetail.username,

});

}
}




resetForm() {
if (this.hrmsapplicantofferForm != null)
this.hrmsapplicantofferForm.reset();
this.hrmsapplicantofferForm.patchValue({
employeeid: this.sessiondata.userid,
employeeiddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let offerid = this.hrmsapplicantofferForm.get('offerid').value;
        if(offerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsapplicantofferservice.deletehrmsapplicantoffer(offerid).then(res =>
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
    this.hrmsapplicantofferForm.patchValue({
        offerid: null
    });
    if(this.hrmsapplicantofferservice.formData.offerid!=null)this.hrmsapplicantofferservice.formData.offerid=null;
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
        else if(key=="offerdate")
this.hrmsapplicantofferForm.patchValue({"offerdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="joiningdate")
this.hrmsapplicantofferForm.patchValue({"joiningdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="approvaldate")
this.hrmsapplicantofferForm.patchValue({"approvaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="offersentdate")
this.hrmsapplicantofferForm.patchValue({"offersentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="acknowledgedate")
this.hrmsapplicantofferForm.patchValue({"acknowledgedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="joineddate")
this.hrmsapplicantofferForm.patchValue({"joineddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsapplicantofferForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsapplicantofferForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsapplicantofferForm.controls[key]!=undefined)
{
this.hrmsapplicantofferForm.controls[key].disable({onlySelf: true});
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
offeridonChange(evt:any){
let e=evt.value;
}
mpridonChange(evt:any){
let e=evt.value;
}
interviewidonChange(evt:any){
let e=evt.value;
}
offerdateonChange(evt:any){
let e=evt.value;
}
joiningdateonChange(evt:any){
let e=evt.value;
}
referencenoonChange(evt:any){
let e=evt.value;
}
applicantidonChange(evt:any){
let e=evt.value;
}
applicantcodeonChange(evt:any){
let e=evt.value;
}
applicantnameonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
departmentonChange(evt:any){
let e=evt.value;
this.hrmsapplicantofferForm.patchValue({departmentdesc:evt.options[evt.options.selectedIndex].text});
}
locationonChange(evt:any){
let e=evt.value;
}
salarytypeonChange(evt:any){
let e=evt.value;
}
basiconChange(evt:any){
let e=evt.value;
}
allowancesonChange(evt:any){
let e=evt.value;
}
grosssalaryonChange(evt:any){
let e=evt.value;
}
deductionsonChange(evt:any){
let e=evt.value;
}
taxallowedonChange(evt:any){
let e=evt.value;
}
taxonChange(evt:any){
let e=evt.value;
}
netsalaryonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
approvaldateonChange(evt:any){
let e=evt.value;
}
offersentdateonChange(evt:any){
let e=evt.value;
}
acknowledgedonChange(evt:any){
let e=evt.value;
}
acknowledgedateonChange(evt:any){
let e=evt.value;
}
joineddateonChange(evt:any){
let e=evt.value;
}
offerstatusonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}

edithrmsapplicantoffers() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsapplicantofferservice.gethrmsapplicantoffersByEID(pkcol).then(res => {

this.hrmsapplicantofferservice.formData=res.hrmsapplicantoffer;
let formproperty=res.hrmsapplicantoffer.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsapplicantoffer.pkcol;
this.formid=res.hrmsapplicantoffer.offerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsapplicantoffer.offerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsapplicantofferForm.patchValue({
offerid: res.hrmsapplicantoffer.offerid,
mprid: res.hrmsapplicantoffer.mprid,
mpriddesc: res.hrmsapplicantoffer.mpriddesc,
interviewid: res.hrmsapplicantoffer.interviewid,
interviewiddesc: res.hrmsapplicantoffer.interviewiddesc,
offerdate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.offerdate),
joiningdate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.joiningdate),
referenceno: res.hrmsapplicantoffer.referenceno,
applicantid: res.hrmsapplicantoffer.applicantid,
applicantiddesc: res.hrmsapplicantoffer.applicantiddesc,
applicantcode: res.hrmsapplicantoffer.applicantcode,
applicantname: res.hrmsapplicantoffer.applicantname,
title: res.hrmsapplicantoffer.title,
department: res.hrmsapplicantoffer.department,
departmentdesc: res.hrmsapplicantoffer.departmentdesc,
location: res.hrmsapplicantoffer.location,
salarytype: res.hrmsapplicantoffer.salarytype,
basic: res.hrmsapplicantoffer.basic,
allowances: res.hrmsapplicantoffer.allowances,
grosssalary: res.hrmsapplicantoffer.grosssalary,
deductions: res.hrmsapplicantoffer.deductions,
taxallowed: res.hrmsapplicantoffer.taxallowed,
tax: res.hrmsapplicantoffer.tax,
netsalary: res.hrmsapplicantoffer.netsalary,
notes: res.hrmsapplicantoffer.notes,
remarks: res.hrmsapplicantoffer.remarks,
approvaldate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.approvaldate),
offersentdate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.offersentdate),
acknowledged: res.hrmsapplicantoffer.acknowledged,
acknowledgedate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.acknowledgedate),
joineddate: this.ngbDateParserFormatter.parse(res.hrmsapplicantoffer.joineddate),
offerstatus: res.hrmsapplicantoffer.offerstatus,
status: res.hrmsapplicantoffer.status,
statusdesc: res.hrmsapplicantoffer.statusdesc,
employeeid: res.hrmsapplicantoffer.employeeid,
employeeiddesc: res.hrmsapplicantoffer.employeeiddesc,
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
  for (let key in this.hrmsapplicantofferForm.controls) {
    if (this.hrmsapplicantofferForm.controls[key] != null) {
if(false)
{
if(this.hrmsapplicantofferservice.formData!=null && this.hrmsapplicantofferservice.formData[key]!=null  && this.hrmsapplicantofferservice.formData[key]!='[]' && this.hrmsapplicantofferservice.formData[key]!=undefined && this.hrmsapplicantofferservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsapplicantofferservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsapplicantofferservice.formData!=null && this.hrmsapplicantofferservice.formData[key]!=null   && this.hrmsapplicantofferservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsapplicantofferservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsapplicantofferservice.formData!=null && this.hrmsapplicantofferservice.formData[key]!=null   && this.hrmsapplicantofferservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsapplicantofferservice.formData[key]+"'><div class='progress__number'>"+this.hrmsapplicantofferservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsapplicantofferForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsapplicantofferForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsapplicantofferForm.value;
obj.offerdate=new Date(this.hrmsapplicantofferForm.get('offerdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offerdate').value)+'  UTC' :null);
obj.joiningdate=new Date(this.hrmsapplicantofferForm.get('joiningdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joiningdate').value)+'  UTC' :null);
obj.approvaldate=new Date(this.hrmsapplicantofferForm.get('approvaldate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('approvaldate').value)+'  UTC' :null);
obj.offersentdate=new Date(this.hrmsapplicantofferForm.get('offersentdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offersentdate').value)+'  UTC' :null);
obj.acknowledgedate=new Date(this.hrmsapplicantofferForm.get('acknowledgedate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('acknowledgedate').value)+'  UTC' :null);
obj.joineddate=new Date(this.hrmsapplicantofferForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joineddate').value)+'  UTC' :null);
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

private hrmsapplicantoffertoggleOption(){
this.hrmsapplicantoffershowOption = this.hrmsapplicantoffershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsapplicantofferForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsapplicantofferForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsapplicantofferForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsapplicantofferservice.formData=this.hrmsapplicantofferForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsapplicantofferForm.controls[key] != null)
    {
        this.hrmsapplicantofferservice.formData[key] = this.hrmsapplicantofferForm.controls[key].value;
    }
}
}
}
this.hrmsapplicantofferservice.formData.offerdate=new Date(this.hrmsapplicantofferForm.get('offerdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offerdate').value)+'  UTC' :null);
this.hrmsapplicantofferservice.formData.joiningdate=new Date(this.hrmsapplicantofferForm.get('joiningdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joiningdate').value)+'  UTC' :null);
this.hrmsapplicantofferservice.formData.approvaldate=new Date(this.hrmsapplicantofferForm.get('approvaldate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('approvaldate').value)+'  UTC' :null);
this.hrmsapplicantofferservice.formData.offersentdate=new Date(this.hrmsapplicantofferForm.get('offersentdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offersentdate').value)+'  UTC' :null);
this.hrmsapplicantofferservice.formData.acknowledgedate=new Date(this.hrmsapplicantofferForm.get('acknowledgedate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('acknowledgedate').value)+'  UTC' :null);
this.hrmsapplicantofferservice.formData.joineddate=new Date(this.hrmsapplicantofferForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joineddate').value)+'  UTC' :null);
console.log(this.hrmsapplicantofferservice.formData);
this.hrmsapplicantofferservice.formData=this.hrmsapplicantofferForm.value;
this.hrmsapplicantofferservice.saveOrUpdatehrmsapplicantoffers().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsapplicantoffer);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsapplicantofferservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsapplicantoffer);
}
else
{
this.FillData(res);
}
}
this.hrmsapplicantofferForm.markAsUntouched();
this.hrmsapplicantofferForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmprid( mprid) {
/*let ScreenType='2';
this.dialog.open(hrmsmanpowerrequestComponent, 
{
data: {mprid:this.hrmsapplicantofferForm.get('mprid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditinterviewid( interviewid) {
/*let ScreenType='2';
this.dialog.open(hrmsinterviewscheduleComponent, 
{
data: {interviewid:this.hrmsapplicantofferForm.get('interviewid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapplicantid( applicantid) {
/*let ScreenType='2';
this.dialog.open(hrmsapplicantmasterComponent, 
{
data: {applicantid:this.hrmsapplicantofferForm.get('applicantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsapplicantofferForm.get('department').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsapplicantofferForm.get('employeeid').value, ScreenType:2 }
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



