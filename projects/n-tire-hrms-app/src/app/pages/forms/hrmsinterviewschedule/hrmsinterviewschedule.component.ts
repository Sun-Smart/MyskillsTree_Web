import { hrmsinterviewscheduleService } from './../../../service/hrmsinterviewschedule.service';
import { hrmsinterviewschedule } from './../../../model/hrmsinterviewschedule.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { hrmsapplicantmaster} from './../../../model/hrmsapplicantmaster.model';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { hrmsinterviewscoring } from './../../../model/hrmsinterviewscoring.model';
import { hrmsinterviewscoringComponent } from './../../../pages/forms/hrmsinterviewscoring/hrmsinterviewscoring.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-hrmsinterviewschedule',
templateUrl: './hrmsinterviewschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsinterviewscheduleComponent implements OnInit {
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
bfilterPopulatehrmsinterviewschedules:boolean=false;
datahrmsinterviewschedulesmprid3:any=[];
datahrmsinterviewschedulesjobrole3:any=[];
datahrmsinterviewschedulesapplicantid3:any=[];
datahrmsinterviewschedulesinterviewround3:any=[];
datahrmsinterviewschedulesvenue3:any=[];
datahrmsinterviewschedulesinterviewer3:any=[];
datahrmsinterviewschedulescontactperson3:any=[];
datahrmsinterviewschedulesinterviewstatus3:any=[];
datahrmsinterviewscoringscriteria3:any=[];
datahrmsinterviewscoringsinterviewid3:any=[];
datahrmsinterviewscoringsinterviewround3:any=[];
bfilterPopulatehrmsinterviewscorings:boolean=false;
@ViewChild('tblhrmsinterviewscoringssource',{static:false}) tblhrmsinterviewscoringssource: Ng2SmartTableComponent;
 hrmsinterviewscheduleForm: FormGroup;
mpridList: hrmsmanpowerrequest[];
mpridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
mprid_hrmsmanpowerrequestsForm: FormGroup;//autocomplete
mprid_hrmsmanpowerrequestsoptions:any;//autocomplete
mprid_hrmsmanpowerrequestsformatter:any;//autocomplete
jobroleList: bouserrolemaster[];
applicantidList: hrmsapplicantmaster[];
applicantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
applicantid_hrmsapplicantmastersForm: FormGroup;//autocomplete
applicantid_hrmsapplicantmastersoptions:any;//autocomplete
applicantid_hrmsapplicantmastersformatter:any;//autocomplete
interviewroundList: boconfigvalue[];
venueList: boconfigvalue[];
interviewerList: bousermaster[];
intervieweroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
interviewer_bousermastersForm: FormGroup;//autocomplete
interviewer_bousermastersoptions:any;//autocomplete
interviewer_bousermastersformatter:any;//autocomplete
contactpersonList: bousermaster[];
contactpersonoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contactperson_bousermastersForm: FormGroup;//autocomplete
contactperson_bousermastersoptions:any;//autocomplete
contactperson_bousermastersformatter:any;//autocomplete
interviewstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsinterviewscheduleshowOption:boolean;
hrmsinterviewscoringshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsinterviewscoringsvisiblelist:any;
hrmsinterviewscoringshidelist:any;

DeletedhrmsinterviewscoringIDs: string="";
hrmsinterviewscoringsID: string = "1";
hrmsinterviewscoringsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsinterviewscheduleservice: hrmsinterviewscheduleService,
private bomasterdataservice: bomasterdataService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsmanpowerrequestservice:hrmsmanpowerrequestService,
private bouserrolemasterservice:bouserrolemasterService,
private hrmsapplicantmasterservice:hrmsapplicantmasterService,
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
this.hrmsinterviewscheduleForm  = this.fb.group({
pk:[null],
interviewreference: [null],
interviewid: [null],
mprid: [null],
mpriddesc: [null],
jobrole: [null],
jobroledesc: [null],
applicantid: [null],
applicantiddesc: [null],
interviewround: [null],
interviewrounddesc: [null],
interviewdate: [null],
interviewtime: [null],
venue: [null],
venuedesc: [null],
interviewer: [null],
interviewerdesc: [null],
contactperson: [null],
contactpersondesc: [null],
rating: [null],
totalscore: [null],
interviewremarks: [null],
interviewstatus: [null],
interviewstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsinterviewscheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsinterviewscheduleForm.dirty && this.hrmsinterviewscheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.interviewid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.interviewid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.interviewid && pkDetail) {
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
let hrmsinterviewscheduleid = null;

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
this.formid=hrmsinterviewscheduleid;
//this.sharedService.alert(hrmsinterviewscheduleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsinterviewscoringsTableConfig();
  setTimeout(() => {
  this.SethrmsinterviewscoringsTableddConfig();
  });

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
if(this.hrmsinterviewscheduleservice.formData && this.hrmsinterviewscheduleservice.formData.mprid){
this.mpridoptionsEvent.emit(this.mpridList);
this.hrmsinterviewscheduleForm.patchValue({
    mprid: this.hrmsinterviewscheduleservice.formData.mprid,
    mpriddesc: this.hrmsinterviewscheduleservice.formData.mpriddesc,
});
}
{
let arrmprid = this.mpridList.filter(v => v.mprid == this.hrmsinterviewscheduleForm.get('mprid').value);
let objmprid;
if (arrmprid.length > 0) objmprid = arrmprid[0];
if (objmprid)
{
    this.hrmsinterviewscheduleForm.patchValue({ jobrole: objmprid.jobrole });
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
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.jobroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => 
{
this.applicantidList = res as hrmsapplicantmaster[];
if(this.hrmsinterviewscheduleservice.formData && this.hrmsinterviewscheduleservice.formData.applicantid){
this.applicantidoptionsEvent.emit(this.applicantidList);
this.hrmsinterviewscheduleForm.patchValue({
    applicantid: this.hrmsinterviewscheduleservice.formData.applicantid,
    applicantiddesc: this.hrmsinterviewscheduleservice.formData.applicantiddesc,
});
}
{
let arrapplicantid = this.applicantidList.filter(v => v.applicantid == this.hrmsinterviewscheduleForm.get('applicantid').value);
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
this.configservice.getList("interviewround").then(res => this.interviewroundList = res as boconfigvalue[]);
this.configservice.getList("venue").then(res => this.venueList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.interviewerList = res as bousermaster[];
if(this.hrmsinterviewscheduleservice.formData && this.hrmsinterviewscheduleservice.formData.interviewer){
this.intervieweroptionsEvent.emit(this.interviewerList);
this.hrmsinterviewscheduleForm.patchValue({
    interviewer: this.hrmsinterviewscheduleservice.formData.interviewer,
    interviewerdesc: this.hrmsinterviewscheduleservice.formData.interviewerdesc,
});
}
{
let arrinterviewer = this.interviewerList.filter(v => v.userid == this.hrmsinterviewscheduleForm.get('interviewer').value);
let objinterviewer;
if (arrinterviewer.length > 0) objinterviewer = arrinterviewer[0];
if (objinterviewer)
{
}
}
}
).catch((err) => {console.log(err);});
this.interviewer_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.interviewerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.interviewer_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.contactpersonList = res as bousermaster[];
if(this.hrmsinterviewscheduleservice.formData && this.hrmsinterviewscheduleservice.formData.contactperson){
this.contactpersonoptionsEvent.emit(this.contactpersonList);
this.hrmsinterviewscheduleForm.patchValue({
    contactperson: this.hrmsinterviewscheduleservice.formData.contactperson,
    contactpersondesc: this.hrmsinterviewscheduleservice.formData.contactpersondesc,
});
}
{
let arrcontactperson = this.contactpersonList.filter(v => v.userid == this.hrmsinterviewscheduleForm.get('contactperson').value);
let objcontactperson;
if (arrcontactperson.length > 0) objcontactperson = arrcontactperson[0];
if (objcontactperson)
{
}
}
}
).catch((err) => {console.log(err);});
this.contactperson_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contactpersonList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contactperson_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("interviewstatus").then(res => this.interviewstatusList = res as boconfigvalue[]);

//autocomplete
    this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesList().then(res => {
      this.pkList = res as hrmsinterviewschedule[];
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
this.hrmsinterviewscheduleForm.markAsUntouched();
this.hrmsinterviewscheduleForm.markAsPristine();
}
onSelectedmprid(mpridDetail: any) {
if (mpridDetail.mprid && mpridDetail) {
this.hrmsinterviewscheduleForm.patchValue({
mprid: mpridDetail.mprid,
mpriddesc: mpridDetail.mprreference,

});
this.hrmsinterviewscheduleForm.patchValue({jobrole:mpridDetail.jobrole});

}
}

onSelectedapplicantid(applicantidDetail: any) {
if (applicantidDetail.applicantid && applicantidDetail) {
this.hrmsinterviewscheduleForm.patchValue({
applicantid: applicantidDetail.applicantid,
applicantiddesc: applicantidDetail.applicantname,

});

}
}

onSelectedinterviewer(interviewerDetail: any) {
if (interviewerDetail.userid && interviewerDetail) {
this.hrmsinterviewscheduleForm.patchValue({
interviewer: interviewerDetail.userid,
interviewerdesc: interviewerDetail.username,

});

}
}

onSelectedcontactperson(contactpersonDetail: any) {
if (contactpersonDetail.userid && contactpersonDetail) {
this.hrmsinterviewscheduleForm.patchValue({
contactperson: contactpersonDetail.userid,
contactpersondesc: contactpersonDetail.username,

});

}
}




resetForm() {
if (this.hrmsinterviewscheduleForm != null)
this.hrmsinterviewscheduleForm.reset();
this.hrmsinterviewscheduleForm.patchValue({
interviewer: this.sessiondata.userid,
interviewerdesc: this.sessiondata.username,
contactperson: this.sessiondata.userid,
contactpersondesc: this.sessiondata.username,
});
setTimeout(() => {
this.hrmsinterviewscheduleservice.hrmsinterviewscorings=[];
this.hrmsinterviewscoringsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let interviewid = this.hrmsinterviewscheduleForm.get('interviewid').value;
        if(interviewid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsinterviewscheduleservice.deletehrmsinterviewschedule(interviewid).then(res =>
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
    this.hrmsinterviewscheduleForm.patchValue({
        interviewid: null
    });
    if(this.hrmsinterviewscheduleservice.formData.interviewid!=null)this.hrmsinterviewscheduleservice.formData.interviewid=null;
for (let i=0;i<this.hrmsinterviewscheduleservice.hrmsinterviewscorings.length;i++) {
this.hrmsinterviewscheduleservice.hrmsinterviewscorings[i].scoringid=null;
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
        else if(key=="interviewdate")
this.hrmsinterviewscheduleForm.patchValue({"interviewdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="interviewtime")
this.hrmsinterviewscheduleForm.patchValue({"interviewtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsinterviewscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsinterviewscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsinterviewscheduleForm.controls[key]!=undefined)
{
this.hrmsinterviewscheduleForm.controls[key].disable({onlySelf: true});
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
interviewreferenceonChange(evt:any){
let e=evt.value;
}
interviewidonChange(evt:any){
let e=evt.value;
}
mpridonChange(evt:any){
let e=evt.value;
}
jobroleonChange(evt:any){
let e=evt.value;
this.hrmsinterviewscheduleForm.patchValue({jobroledesc:evt.options[evt.options.selectedIndex].text});
}
applicantidonChange(evt:any){
let e=evt.value;
}
interviewroundonChange(evt:any){
let e=this.f.interviewround.value as any;
this.hrmsinterviewscheduleForm.patchValue({interviewrounddesc:evt.options[evt.options.selectedIndex].text});
}
interviewdateonChange(evt:any){
let e=evt.value;
}
interviewtimeonChange(evt:any){
let e=evt.value;
}
venueonChange(evt:any){
let e=this.f.venue.value as any;
this.hrmsinterviewscheduleForm.patchValue({venuedesc:evt.options[evt.options.selectedIndex].text});
}
intervieweronChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
ratingonChange(evt:any){
let e=evt.value;
}
totalscoreonChange(evt:any){
let e=evt.value;
}
interviewremarksonChange(evt:any){
let e=evt.value;
}
interviewstatusonChange(evt:any){
let e=this.f.interviewstatus.value as any;
this.hrmsinterviewscheduleForm.patchValue({interviewstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsinterviewschedules() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesByEID(pkcol).then(res => {

this.hrmsinterviewscheduleservice.formData=res.hrmsinterviewschedule;
let formproperty=res.hrmsinterviewschedule.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsinterviewschedule.pkcol;
this.formid=res.hrmsinterviewschedule.interviewid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsinterviewschedule.interviewid;
var interviewtimeTime=new Time( res.hrmsinterviewschedule.interviewtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsinterviewscheduleForm.patchValue({
interviewreference: res.hrmsinterviewschedule.interviewreference,
interviewid: res.hrmsinterviewschedule.interviewid,
mprid: res.hrmsinterviewschedule.mprid,
mpriddesc: res.hrmsinterviewschedule.mpriddesc,
jobrole: res.hrmsinterviewschedule.jobrole,
jobroledesc: res.hrmsinterviewschedule.jobroledesc,
applicantid: res.hrmsinterviewschedule.applicantid,
applicantiddesc: res.hrmsinterviewschedule.applicantiddesc,
interviewround: res.hrmsinterviewschedule.interviewround,
interviewrounddesc: res.hrmsinterviewschedule.interviewrounddesc,
interviewdate: this.ngbDateParserFormatter.parse(res.hrmsinterviewschedule.interviewdate),
interviewtime: interviewtimeTime,
venue: res.hrmsinterviewschedule.venue,
venuedesc: res.hrmsinterviewschedule.venuedesc,
interviewer: res.hrmsinterviewschedule.interviewer,
interviewerdesc: res.hrmsinterviewschedule.interviewerdesc,
contactperson: res.hrmsinterviewschedule.contactperson,
contactpersondesc: res.hrmsinterviewschedule.contactpersondesc,
rating: res.hrmsinterviewschedule.rating,
totalscore: res.hrmsinterviewschedule.totalscore,
interviewremarks: res.hrmsinterviewschedule.interviewremarks,
interviewstatus: res.hrmsinterviewschedule.interviewstatus,
interviewstatusdesc: res.hrmsinterviewschedule.interviewstatusdesc,
status: res.hrmsinterviewschedule.status,
statusdesc: res.hrmsinterviewschedule.statusdesc,
});
this.hrmsinterviewscoringsvisiblelist=res.hrmsinterviewscoringsvisiblelist;
//Child Tables if any
this.hrmsinterviewscheduleservice.hrmsinterviewscorings = res.hrmsinterviewscorings;
this.SethrmsinterviewscoringsTableConfig();
this.hrmsinterviewscoringsLoadTable();
  setTimeout(() => {
  this.SethrmsinterviewscoringsTableddConfig();
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
  for (let key in this.hrmsinterviewscheduleForm.controls) {
    if (this.hrmsinterviewscheduleForm.controls[key] != null) {
if(false)
{
if(this.hrmsinterviewscheduleservice.formData!=null && this.hrmsinterviewscheduleservice.formData[key]!=null  && this.hrmsinterviewscheduleservice.formData[key]!='[]' && this.hrmsinterviewscheduleservice.formData[key]!=undefined && this.hrmsinterviewscheduleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsinterviewscheduleservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.hrmsinterviewscheduleservice.formData!=null && this.hrmsinterviewscheduleservice.formData[key]!=null   && this.hrmsinterviewscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsinterviewscheduleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsinterviewscheduleservice.formData!=null && this.hrmsinterviewscheduleservice.formData[key]!=null   && this.hrmsinterviewscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsinterviewscheduleservice.formData[key]+"'><div class='progress__number'>"+this.hrmsinterviewscheduleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsinterviewscheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsinterviewscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsinterviewscheduleForm.value;
obj.interviewdate=new Date(this.hrmsinterviewscheduleForm.get('interviewdate').value ? this.ngbDateParserFormatter.format(this.hrmsinterviewscheduleForm.get('interviewdate').value)+'  UTC' :null);
obj.interviewtime=(this.hrmsinterviewscheduleForm.get('interviewtime').value==null?0:this.hrmsinterviewscheduleForm.get('interviewtime').value.hour)+':'+(this.hrmsinterviewscheduleForm.get('interviewtime').value==null?0:this.hrmsinterviewscheduleForm.get('interviewtime').value.minute+":00");
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

private hrmsinterviewscheduletoggleOption(){
this.hrmsinterviewscheduleshowOption = this.hrmsinterviewscheduleshowOption === true ? false : true;
}

private hrmsinterviewscoringtoggleOption(){
this.hrmsinterviewscoringshowOption = this.hrmsinterviewscoringshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsinterviewscheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsinterviewscheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsinterviewscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsinterviewscheduleservice.formData=this.hrmsinterviewscheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsinterviewscheduleForm.controls[key] != null)
    {
        this.hrmsinterviewscheduleservice.formData[key] = this.hrmsinterviewscheduleForm.controls[key].value;
    }
}
}
}
this.hrmsinterviewscheduleservice.formData.interviewdate=new Date(this.hrmsinterviewscheduleForm.get('interviewdate').value ? this.ngbDateParserFormatter.format(this.hrmsinterviewscheduleForm.get('interviewdate').value)+'  UTC' :null);
this.hrmsinterviewscheduleservice.formData.interviewtime=(this.hrmsinterviewscheduleForm.get('interviewtime').value==null?0:this.hrmsinterviewscheduleForm.get('interviewtime').value.hour)+':'+(this.hrmsinterviewscheduleForm.get('interviewtime').value==null?0:this.hrmsinterviewscheduleForm.get('interviewtime').value.minute+":00");
this.hrmsinterviewscheduleservice.formData.DeletedhrmsinterviewscoringIDs = this.DeletedhrmsinterviewscoringIDs;
console.log(this.hrmsinterviewscheduleservice.formData);
this.hrmsinterviewscheduleservice.formData=this.hrmsinterviewscheduleForm.value;
this.hrmsinterviewscheduleservice.saveOrUpdatehrmsinterviewschedules().subscribe(
async res => {
if (this.hrmsinterviewscoringssource.data)
{
    for (let i = 0; i < this.hrmsinterviewscoringssource.data.length; i++)
    {
        if (this.hrmsinterviewscoringssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinterviewscoringssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsinterviewscheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewschedule);
}
else
{
this.FillData(res);
}
}
this.hrmsinterviewscheduleForm.markAsUntouched();
this.hrmsinterviewscheduleForm.markAsPristine();
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
data: {mprid:this.hrmsinterviewscheduleForm.get('mprid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditjobrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsinterviewscheduleForm.get('jobrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapplicantid( applicantid) {
/*let ScreenType='2';
this.dialog.open(hrmsapplicantmasterComponent, 
{
data: {applicantid:this.hrmsinterviewscheduleForm.get('applicantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditinterviewer( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsinterviewscheduleForm.get('interviewer').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontactperson( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsinterviewscheduleForm.get('contactperson').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsinterviewscoring(event:any,scoringid:any, interviewid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsinterviewscoringComponent, 
{
data:  {  showview:false,save:false,event,scoringid, interviewid,visiblelist:this.hrmsinterviewscoringsvisiblelist,  hidelist:this.hrmsinterviewscoringshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsinterviewscoringssource.add(res);
this.hrmsinterviewscoringssource.refresh();
}
else
{
this.hrmsinterviewscoringssource.update(event.data, res);
}
}
});
}

onDeletehrmsinterviewscoring(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsinterviewscoringIDs += childID + ",";
this.hrmsinterviewscheduleservice.hrmsinterviewscorings.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsinterviewscorings
hrmsinterviewscoringssettings:any;
hrmsinterviewscoringssource: any;

showhrmsinterviewscoringsCheckbox()
{
debugger;
if(this.tblhrmsinterviewscoringssource.settings['selectMode']== 'multi')this.tblhrmsinterviewscoringssource.settings['selectMode']= 'single';
else
this.tblhrmsinterviewscoringssource.settings['selectMode']= 'multi';
this.tblhrmsinterviewscoringssource.initGrid();
}
deletehrmsinterviewscoringsAll()
{
this.tblhrmsinterviewscoringssource.settings['selectMode'] = 'single';
}
showhrmsinterviewscoringsFilter()
{
  setTimeout(() => {
  this.SethrmsinterviewscoringsTableddConfig();
  });
      if(this.tblhrmsinterviewscoringssource.settings!=null)this.tblhrmsinterviewscoringssource.settings['hideSubHeader'] =!this.tblhrmsinterviewscoringssource.settings['hideSubHeader'];
this.tblhrmsinterviewscoringssource.initGrid();
}
showhrmsinterviewscoringsInActive()
{
}
enablehrmsinterviewscoringsInActive()
{
}
async SethrmsinterviewscoringsTableddConfig()
{
if(!this.bfilterPopulatehrmsinterviewscorings){

this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesList().then(res=>
{
var datainterviewid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsinterviewscoringsinterviewid3.push(defaultobj);
for(let i=0; i<datainterviewid2.length; i++){
var obj= { value: datainterviewid2[i].interviewid, title:datainterviewid2[i].interviewreference};
this.datahrmsinterviewscoringsinterviewid3.push(obj);
}
if((this.tblhrmsinterviewscoringssource.settings as any).columns['interviewid'])
{
(this.tblhrmsinterviewscoringssource.settings as any).columns['interviewid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsinterviewscoringsinterviewid3));
this.tblhrmsinterviewscoringssource.initGrid();
}
});

this.configservice.getList("interviewround").then(res=>
{
var datainterviewround2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsinterviewscoringsinterviewround3.push(defaultobj);
for(let i=0; i<datainterviewround2.length; i++){
var obj= { value: datainterviewround2[i].configkey, title: datainterviewround2[i].configtext};
this.datahrmsinterviewscoringsinterviewround3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsinterviewscoringssource.settings);
if(clone.columns['interviewround']!=undefined)clone.columns['interviewround'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsinterviewscoringsinterviewround3)), }, };
if(clone.columns['interviewround']!=undefined)clone.columns['interviewround'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsinterviewscoringsinterviewround3)), }, };
this.tblhrmsinterviewscoringssource.settings =  clone;
this.tblhrmsinterviewscoringssource.initGrid();
});

this.bomasterdataservice.getList("mj5qo").then(res=>
{
var datacriteria2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsinterviewscoringscriteria3.push(defaultobj);
for(let i=0; i<datacriteria2.length; i++){
var obj= { value: datacriteria2[i].masterdataid, title:datacriteria2[i].masterdatadescription};
this.datahrmsinterviewscoringscriteria3.push(obj);
}
if((this.tblhrmsinterviewscoringssource.settings as any).columns['criteria'])
{
(this.tblhrmsinterviewscoringssource.settings as any).columns['criteria'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsinterviewscoringscriteria3));
this.tblhrmsinterviewscoringssource.initGrid();
}
});
}
this.bfilterPopulatehrmsinterviewscorings=true;
}
async hrmsinterviewscoringsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsinterviewscoringsTableConfig()
{
this.hrmsinterviewscoringssettings = {
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
interviewround: {
title: 'Interview Round',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsinterviewscoringsinterviewround3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
criteria: {
title: 'Criteria',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsinterviewscoringscriteria3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
weightage: {
title: 'Weightage',
type: 'number',
filter:true,
},
score: {
title: 'Score',
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
},
};
}
hrmsinterviewscoringsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewscoringsID)>=0)
{
this.hrmsinterviewscoringssource=new LocalDataSource();
this.hrmsinterviewscoringssource.load(this.hrmsinterviewscheduleservice.hrmsinterviewscorings as  any as LocalDataSource);
this.hrmsinterviewscoringssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsinterviewscoringsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsinterviewscheduleservice.hrmsinterviewscorings.length == 0)
{
    this.tblhrmsinterviewscoringssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinterviewscoring();
    this.hrmsinterviewscheduleservice.hrmsinterviewscorings.push(obj);
    this.hrmsinterviewscoringssource.refresh();
    if ((this.hrmsinterviewscheduleservice.hrmsinterviewscorings.length / this.hrmsinterviewscoringssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinterviewscoringssource.getPaging().page)
    {
        this.hrmsinterviewscoringssource.setPage((this.hrmsinterviewscheduleservice.hrmsinterviewscorings.length / this.hrmsinterviewscoringssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsinterviewscoringssource.grid.edit(this.tblhrmsinterviewscoringssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsinterviewscoringssource.data.indexOf(event.data);
this.onDeletehrmsinterviewscoring(event,event.data.scoringid,((this.hrmsinterviewscoringssource.getPaging().page-1) *this.hrmsinterviewscoringssource.getPaging().perPage)+index);
this.hrmsinterviewscoringssource.refresh();
break;
}
}

*/
hrmsinterviewscoringsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsinterviewscoring(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsinterviewscoring(event,event.data.scoringid,this.formid);
break;
case 'delete':
this.onDeletehrmsinterviewscoring(event,event.data.scoringid,((this.hrmsinterviewscoringssource.getPaging().page-1) *this.hrmsinterviewscoringssource.getPaging().perPage)+event.index);
this.hrmsinterviewscoringssource.refresh();
break;
}
}
hrmsinterviewscoringsonDelete(obj) {
let scoringid=obj.data.scoringid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsinterviewscheduleservice.deletehrmsinterviewschedule(scoringid).then(res=>
this.hrmsinterviewscoringsLoadTable()
);
}
}
hrmsinterviewscoringsPaging(val)
{
debugger;
this.hrmsinterviewscoringssource.setPaging(1, val, true);
}

handlehrmsinterviewscoringsGridSelected(event:any) {
this.hrmsinterviewscoringsselectedindex=this.hrmsinterviewscheduleservice.hrmsinterviewscorings.findIndex(i => i.scoringid === event.data.scoringid);
}
IshrmsinterviewscoringsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewscoringsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsinterviewscorings

}



