import { vmsinvitationService } from './../../../service/vmsinvitation.service';
import { vmsinvitation } from './../../../model/vmsinvitation.model';
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
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { vmsevent} from './../../../model/vmsevent.model';
import { vmseventComponent } from './../../../pages/forms/vmsevent/vmsevent.component';
import { vmseventService } from './../../../service/vmsevent.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
//detail table services
import { vmsinviteperson } from './../../../model/vmsinviteperson.model';
import { vmsinvitepersonComponent } from './../../../pages/forms/vmsinviteperson/vmsinviteperson.component';
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
selector: 'app-vmsinvitation',
templateUrl: './vmsinvitation.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class vmsinvitationComponent implements OnInit {
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
bfilterPopulatevmsinvitations:boolean=false;
datavmsinvitationsbranchid3:any=[];
datavmsinvitationseventreference3:any=[];
datavmsinvitationsvisitortype3:any=[];
datavmsinvitationshost3:any=[];
datavmsinvitationsrepeattype3:any=[];
datavmsinvitationsinvitestatus3:any=[];
datavmsinvitepersonslanguage3:any=[];
datavmsinvitepersonsinvitestatus3:any=[];
bfilterPopulatevmsinvitepersons:boolean=false;
@ViewChild('tblvmsinvitepersonssource',{static:false}) tblvmsinvitepersonssource: Ng2SmartTableComponent;
 vmsinvitationForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
eventreferenceList: vmsevent[];
eventreferenceoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
eventreference_vmseventsForm: FormGroup;//autocomplete
eventreference_vmseventsoptions:any;//autocomplete
eventreference_vmseventsformatter:any;//autocomplete
visitortypeList: boconfigvalue[];
hostList: hrmsemployee[];
hostoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
host_hrmsemployeesForm: FormGroup;//autocomplete
host_hrmsemployeesoptions:any;//autocomplete
host_hrmsemployeesformatter:any;//autocomplete
repeattypeList: boconfigvalue[];
invitestatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
vmsinvitationshowOption:boolean;
vmsinvitepersonshowOption:boolean;
sessiondata:any;
sourcekey:any;



vmsinvitepersonsvisiblelist:any;
vmsinvitepersonshidelist:any;

DeletedvmsinvitepersonIDs: string="";
vmsinvitepersonsID: string = "1";
vmsinvitepersonsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private vmsinvitationservice: vmsinvitationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private vmseventservice:vmseventService,
private hrmsemployeeservice:hrmsemployeeService,
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
this.vmsinvitationForm  = this.fb.group({
pk:[null],
invitationid: [null],
invitereference: [null],
branchid: [null, Validators.required],
branchiddesc: [null],
eventreference: [null],
eventreferencedesc: [null],
company: [null, Validators.required],
subject: [null, Validators.required],
notes: [null],
visitortype: [null, Validators.required],
visitortypedesc: [null],
host: [null, Validators.required],
hostdesc: [null],
validfromdate: [null, Validators.required],
validfromtime: [null],
validtodate: [null, Validators.required],
validtotime: [null],
repeattype: [null, Validators.required],
repeattypedesc: [null],
messagetoguest: [null],
invitestatus: [null],
invitestatusdesc: [null],
watch: [null],
replytoname: [null],
replytoemail: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.vmsinvitationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.vmsinvitationForm.dirty && this.vmsinvitationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.invitationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.invitationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.invitationid && pkDetail) {
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
let vmsinvitationid = null;

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
this.formid=vmsinvitationid;
//this.sharedService.alert(vmsinvitationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetvmsinvitepersonsTableConfig();
  setTimeout(() => {
  this.SetvmsinvitepersonsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.vmsinvitationservice.formData && this.vmsinvitationservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.vmsinvitationForm.patchValue({
    branchid: this.vmsinvitationservice.formData.branchid,
    branchiddesc: this.vmsinvitationservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.vmsinvitationForm.get('branchid').value);
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
this.vmseventservice.getvmseventsList().then(res => 
{
this.eventreferenceList = res as vmsevent[];
if(this.vmsinvitationservice.formData && this.vmsinvitationservice.formData.eventreference){
this.eventreferenceoptionsEvent.emit(this.eventreferenceList);
this.vmsinvitationForm.patchValue({
    eventreference: this.vmsinvitationservice.formData.eventreference,
    eventreferencedesc: this.vmsinvitationservice.formData.eventreferencedesc,
});
}
{
let arreventreference = this.eventreferenceList.filter(v => v.eventid == this.vmsinvitationForm.get('eventreference').value);
let objeventreference;
if (arreventreference.length > 0) objeventreference = arreventreference[0];
if (objeventreference)
{
}
}
}
).catch((err) => {console.log(err);});
this.eventreference_vmseventsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.eventreferenceList.filter(v => v.eventreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.eventreference_vmseventsformatter = (result: any) => result.eventreference;
this.configservice.getList("visitortype").then(res => this.visitortypeList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.hostList = res as hrmsemployee[];
if(this.vmsinvitationservice.formData && this.vmsinvitationservice.formData.host){
this.hostoptionsEvent.emit(this.hostList);
this.vmsinvitationForm.patchValue({
    host: this.vmsinvitationservice.formData.host,
    hostdesc: this.vmsinvitationservice.formData.hostdesc,
});
}
{
let arrhost = this.hostList.filter(v => v.employeeid == this.vmsinvitationForm.get('host').value);
let objhost;
if (arrhost.length > 0) objhost = arrhost[0];
if (objhost)
{
}
}
}
).catch((err) => {console.log(err);});
this.host_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.hostList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.host_hrmsemployeesformatter = (result: any) => result.employeename;
this.configservice.getList("visitorrepeattype").then(res => this.repeattypeList = res as boconfigvalue[]);
this.configservice.getList("invitestatus").then(res => this.invitestatusList = res as boconfigvalue[]);

//autocomplete
    this.vmsinvitationservice.getvmsinvitationsList().then(res => {
      this.pkList = res as vmsinvitation[];
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
this.vmsinvitationForm.markAsUntouched();
this.vmsinvitationForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.vmsinvitationForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedeventreference(eventreferenceDetail: any) {
if (eventreferenceDetail.eventid && eventreferenceDetail) {
this.vmsinvitationForm.patchValue({
eventreference: eventreferenceDetail.eventid,
eventreferencedesc: eventreferenceDetail.eventreference,

});

}
}

onSelectedhost(hostDetail: any) {
if (hostDetail.employeeid && hostDetail) {
this.vmsinvitationForm.patchValue({
host: hostDetail.employeeid,
hostdesc: hostDetail.employeename,

});

}
}




resetForm() {
if (this.vmsinvitationForm != null)
this.vmsinvitationForm.reset();
this.vmsinvitationForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.vmsinvitationForm.patchValue({
validfromdate: this.ngbDateParserFormatter.parse(new Date().toString()),
validfromtime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
validtodate: this.ngbDateParserFormatter.parse(this.sharedService.addDays(new Date(),1).toString()),
validtotime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
repeattype: "N",
});
setTimeout(() => {
this.vmsinvitationservice.vmsinvitepersons=[];
this.vmsinvitepersonsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let invitationid = this.vmsinvitationForm.get('invitationid').value;
        if(invitationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.vmsinvitationservice.deletevmsinvitation(invitationid).then(res =>
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
    this.vmsinvitationForm.patchValue({
        invitationid: null
    });
    if(this.vmsinvitationservice.formData.invitationid!=null)this.vmsinvitationservice.formData.invitationid=null;
for (let i=0;i<this.vmsinvitationservice.vmsinvitepersons.length;i++) {
this.vmsinvitationservice.vmsinvitepersons[i].invitationpersonid=null;
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
        else if(key=="validfromdate")
this.vmsinvitationForm.patchValue({"validfromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validfromtime")
this.vmsinvitationForm.patchValue({"validfromtime":new Time(mainscreendata[key]) });
        else if(key=="validtodate")
this.vmsinvitationForm.patchValue({"validtodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validtotime")
this.vmsinvitationForm.patchValue({"validtotime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.vmsinvitationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.vmsinvitationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.vmsinvitationForm.controls[key]!=undefined)
{
this.vmsinvitationForm.controls[key].disable({onlySelf: true});
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
invitationidonChange(evt:any){
let e=evt.value;
}
invitereferenceonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
eventreferenceonChange(evt:any){
let e=evt.value;
}
companyonChange(evt:any){
let e=evt.value;
}
subjectonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
visitortypeonChange(evt:any){
let e=this.f.visitortype.value as any;
this.vmsinvitationForm.patchValue({visitortypedesc:evt.options[evt.options.selectedIndex].text});
}
hostonChange(evt:any){
let e=evt.value;
}
validfromdateonChange(evt:any){
let e=evt.value;
}
validfromtimeonChange(evt:any){
let e=evt.value;
}
validtodateonChange(evt:any){
let e=evt.value;
}
validtotimeonChange(evt:any){
let e=evt.value;
}
repeattypeonChange(evt:any){
let e=this.f.repeattype.value as any;
this.vmsinvitationForm.patchValue({repeattypedesc:evt.options[evt.options.selectedIndex].text});
}
messagetoguestonChange(evt:any){
let e=evt.value;
}
invitestatusonChange(evt:any){
let e=this.f.invitestatus.value as any;
this.vmsinvitationForm.patchValue({invitestatusdesc:evt.options[evt.options.selectedIndex].text});
}
watchonChange(evt:any){
let e=evt.value;
}
replytonameonChange(evt:any){
let e=evt.value;
}
replytoemailonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editvmsinvitations() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.vmsinvitationservice.getvmsinvitationsByEID(pkcol).then(res => {

this.vmsinvitationservice.formData=res.vmsinvitation;
let formproperty=res.vmsinvitation.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.vmsinvitation.pkcol;
this.formid=res.vmsinvitation.invitationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.vmsinvitation.invitationid;
var validfromtimeTime=new Time( res.vmsinvitation.validfromtime);
var validtotimeTime=new Time( res.vmsinvitation.validtotime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.vmsinvitationForm.patchValue({
invitationid: res.vmsinvitation.invitationid,
invitereference: res.vmsinvitation.invitereference,
branchid: res.vmsinvitation.branchid,
branchiddesc: res.vmsinvitation.branchiddesc,
eventreference: res.vmsinvitation.eventreference,
eventreferencedesc: res.vmsinvitation.eventreferencedesc,
company: res.vmsinvitation.company,
subject: res.vmsinvitation.subject,
notes: res.vmsinvitation.notes,
visitortype: res.vmsinvitation.visitortype,
visitortypedesc: res.vmsinvitation.visitortypedesc,
host: res.vmsinvitation.host,
hostdesc: res.vmsinvitation.hostdesc,
validfromdate: this.ngbDateParserFormatter.parse(res.vmsinvitation.validfromdate),
validfromtime: validfromtimeTime,
validtodate: this.ngbDateParserFormatter.parse(res.vmsinvitation.validtodate),
validtotime: validtotimeTime,
repeattype: res.vmsinvitation.repeattype,
repeattypedesc: res.vmsinvitation.repeattypedesc,
messagetoguest: res.vmsinvitation.messagetoguest,
invitestatus: res.vmsinvitation.invitestatus,
invitestatusdesc: res.vmsinvitation.invitestatusdesc,
watch: res.vmsinvitation.watch,
replytoname: res.vmsinvitation.replytoname,
replytoemail: res.vmsinvitation.replytoemail,
status: res.vmsinvitation.status,
statusdesc: res.vmsinvitation.statusdesc,
});
this.vmsinvitepersonsvisiblelist=res.vmsinvitepersonsvisiblelist;
//Child Tables if any
this.vmsinvitationservice.vmsinvitepersons = res.vmsinvitepersons;
this.SetvmsinvitepersonsTableConfig();
this.vmsinvitepersonsLoadTable();
  setTimeout(() => {
  this.SetvmsinvitepersonsTableddConfig();
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
  for (let key in this.vmsinvitationForm.controls) {
    if (this.vmsinvitationForm.controls[key] != null) {
if(false)
{
if(this.vmsinvitationservice.formData!=null && this.vmsinvitationservice.formData[key]!=null  && this.vmsinvitationservice.formData[key]!='[]' && this.vmsinvitationservice.formData[key]!=undefined && this.vmsinvitationservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.vmsinvitationservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.vmsinvitationservice.formData!=null && this.vmsinvitationservice.formData[key]!=null   && this.vmsinvitationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.vmsinvitationservice.formData[key]+"></div>");
}
else if(false)
{
if(this.vmsinvitationservice.formData!=null && this.vmsinvitationservice.formData[key]!=null   && this.vmsinvitationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.vmsinvitationservice.formData[key]+"'><div class='progress__number'>"+this.vmsinvitationservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.vmsinvitationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.vmsinvitationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.vmsinvitationForm.value;
obj.validfromdate=new Date(this.vmsinvitationForm.get('validfromdate').value ? this.ngbDateParserFormatter.format(this.vmsinvitationForm.get('validfromdate').value)+'  UTC' :null);
obj.validfromtime=(this.vmsinvitationForm.get('validfromtime').value==null?0:this.vmsinvitationForm.get('validfromtime').value.hour)+':'+(this.vmsinvitationForm.get('validfromtime').value==null?0:this.vmsinvitationForm.get('validfromtime').value.minute+":00");
obj.validtodate=new Date(this.vmsinvitationForm.get('validtodate').value ? this.ngbDateParserFormatter.format(this.vmsinvitationForm.get('validtodate').value)+'  UTC' :null);
obj.validtotime=(this.vmsinvitationForm.get('validtotime').value==null?0:this.vmsinvitationForm.get('validtotime').value.hour)+':'+(this.vmsinvitationForm.get('validtotime').value==null?0:this.vmsinvitationForm.get('validtotime').value.minute+":00");
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

private vmsinvitationtoggleOption(){
this.vmsinvitationshowOption = this.vmsinvitationshowOption === true ? false : true;
}

private vmsinvitepersontoggleOption(){
this.vmsinvitepersonshowOption = this.vmsinvitepersonshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.vmsinvitationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.vmsinvitationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.vmsinvitationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.vmsinvitationservice.formData=this.vmsinvitationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.vmsinvitationForm.controls[key] != null)
    {
        this.vmsinvitationservice.formData[key] = this.vmsinvitationForm.controls[key].value;
    }
}
}
}
this.vmsinvitationservice.formData.validfromdate=new Date(this.vmsinvitationForm.get('validfromdate').value ? this.ngbDateParserFormatter.format(this.vmsinvitationForm.get('validfromdate').value)+'  UTC' :null);
this.vmsinvitationservice.formData.validfromtime=(this.vmsinvitationForm.get('validfromtime').value==null?0:this.vmsinvitationForm.get('validfromtime').value.hour)+':'+(this.vmsinvitationForm.get('validfromtime').value==null?0:this.vmsinvitationForm.get('validfromtime').value.minute+":00");
this.vmsinvitationservice.formData.validtodate=new Date(this.vmsinvitationForm.get('validtodate').value ? this.ngbDateParserFormatter.format(this.vmsinvitationForm.get('validtodate').value)+'  UTC' :null);
this.vmsinvitationservice.formData.validtotime=(this.vmsinvitationForm.get('validtotime').value==null?0:this.vmsinvitationForm.get('validtotime').value.hour)+':'+(this.vmsinvitationForm.get('validtotime').value==null?0:this.vmsinvitationForm.get('validtotime').value.minute+":00");
this.vmsinvitationservice.formData.DeletedvmsinvitepersonIDs = this.DeletedvmsinvitepersonIDs;
console.log(this.vmsinvitationservice.formData);
this.vmsinvitationservice.formData=this.vmsinvitationForm.value;
this.vmsinvitationservice.saveOrUpdatevmsinvitations().subscribe(
async res => {
if (this.vmsinvitepersonssource.data)
{
    for (let i = 0; i < this.vmsinvitepersonssource.data.length; i++)
    {
        if (this.vmsinvitepersonssource.data[i].fileattachmentlist)await this.sharedService.upload(this.vmsinvitepersonssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsinvitation);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.vmsinvitationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsinvitation);
}
else
{
this.FillData(res);
}
}
this.vmsinvitationForm.markAsUntouched();
this.vmsinvitationForm.markAsPristine();
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
data: {branchid:this.vmsinvitationForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditeventreference( eventid) {
/*let ScreenType='2';
this.dialog.open(vmseventComponent, 
{
data: {eventid:this.vmsinvitationForm.get('eventreference').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithost( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.vmsinvitationForm.get('host').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditvmsinviteperson(event:any,invitationpersonid:any, invitationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(vmsinvitepersonComponent, 
{
data:  {  showview:false,save:false,event,invitationpersonid, invitationid,visiblelist:this.vmsinvitepersonsvisiblelist,  hidelist:this.vmsinvitepersonshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.vmsinvitepersonssource.add(res);
this.vmsinvitepersonssource.refresh();
}
else
{
this.vmsinvitepersonssource.update(event.data, res);
}
}
});
}

onDeletevmsinviteperson(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedvmsinvitepersonIDs += childID + ",";
this.vmsinvitationservice.vmsinvitepersons.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes vmsinvitepersons
vmsinvitepersonssettings:any;
vmsinvitepersonssource: any;

showvmsinvitepersonsCheckbox()
{
debugger;
if(this.tblvmsinvitepersonssource.settings['selectMode']== 'multi')this.tblvmsinvitepersonssource.settings['selectMode']= 'single';
else
this.tblvmsinvitepersonssource.settings['selectMode']= 'multi';
this.tblvmsinvitepersonssource.initGrid();
}
deletevmsinvitepersonsAll()
{
this.tblvmsinvitepersonssource.settings['selectMode'] = 'single';
}
showvmsinvitepersonsFilter()
{
  setTimeout(() => {
  this.SetvmsinvitepersonsTableddConfig();
  });
      if(this.tblvmsinvitepersonssource.settings!=null)this.tblvmsinvitepersonssource.settings['hideSubHeader'] =!this.tblvmsinvitepersonssource.settings['hideSubHeader'];
this.tblvmsinvitepersonssource.initGrid();
}
showvmsinvitepersonsInActive()
{
}
enablevmsinvitepersonsInActive()
{
}
async SetvmsinvitepersonsTableddConfig()
{
if(!this.bfilterPopulatevmsinvitepersons){

this.configservice.getList("invitestatus").then(res=>
{
var datainvitestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datavmsinvitepersonsinvitestatus3.push(defaultobj);
for(let i=0; i<datainvitestatus2.length; i++){
var obj= { value: datainvitestatus2[i].configkey, title: datainvitestatus2[i].configtext};
this.datavmsinvitepersonsinvitestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblvmsinvitepersonssource.settings);
if(clone.columns['invitestatus']!=undefined)clone.columns['invitestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datavmsinvitepersonsinvitestatus3)), }, };
if(clone.columns['invitestatus']!=undefined)clone.columns['invitestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datavmsinvitepersonsinvitestatus3)), }, };
this.tblvmsinvitepersonssource.settings =  clone;
this.tblvmsinvitepersonssource.initGrid();
});
}
this.bfilterPopulatevmsinvitepersons=true;
}
async vmsinvitepersonsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetvmsinvitepersonsTableConfig()
{
this.vmsinvitepersonssettings = {
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
firstname: {
title: 'First Name',
type: '',
filter:true,
},
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
mobile: {
title: 'Mobile',
type: '',
filter:true,
},
language: {
title: 'Language',
type: '',
filter:true,
},
reserveparking: {
title: 'Reserve Parking',
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
carregistrationno: {
title: 'Car Registration No',
type: '',
filter:true,
},
parkingslot: {
title: 'Parking Slot',
type: '',
filter:true,
},
invitestatus: {
title: 'Invite Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datavmsinvitepersonsinvitestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
vmsinvitepersonsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.vmsinvitepersonsID)>=0)
{
this.vmsinvitepersonssource=new LocalDataSource();
this.vmsinvitepersonssource.load(this.vmsinvitationservice.vmsinvitepersons as  any as LocalDataSource);
this.vmsinvitepersonssource.setPaging(1, 20, true);
}
}

//external to inline
/*
vmsinvitepersonsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.vmsinvitationservice.vmsinvitepersons.length == 0)
{
    this.tblvmsinvitepersonssource.grid.createFormShown = true;
}
else
{
    let obj = new vmsinviteperson();
    this.vmsinvitationservice.vmsinvitepersons.push(obj);
    this.vmsinvitepersonssource.refresh();
    if ((this.vmsinvitationservice.vmsinvitepersons.length / this.vmsinvitepersonssource.getPaging().perPage).toFixed(0) + 1 != this.vmsinvitepersonssource.getPaging().page)
    {
        this.vmsinvitepersonssource.setPage((this.vmsinvitationservice.vmsinvitepersons.length / this.vmsinvitepersonssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblvmsinvitepersonssource.grid.edit(this.tblvmsinvitepersonssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.vmsinvitepersonssource.data.indexOf(event.data);
this.onDeletevmsinviteperson(event,event.data.invitationpersonid,((this.vmsinvitepersonssource.getPaging().page-1) *this.vmsinvitepersonssource.getPaging().perPage)+index);
this.vmsinvitepersonssource.refresh();
break;
}
}

*/
vmsinvitepersonsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditvmsinviteperson(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditvmsinviteperson(event,event.data.invitationpersonid,this.formid);
break;
case 'delete':
this.onDeletevmsinviteperson(event,event.data.invitationpersonid,((this.vmsinvitepersonssource.getPaging().page-1) *this.vmsinvitepersonssource.getPaging().perPage)+event.index);
this.vmsinvitepersonssource.refresh();
break;
}
}
vmsinvitepersonsonDelete(obj) {
let invitationpersonid=obj.data.invitationpersonid;
if (confirm('Are you sure to delete this record ?')) {
this.vmsinvitationservice.deletevmsinvitation(invitationpersonid).then(res=>
this.vmsinvitepersonsLoadTable()
);
}
}
vmsinvitepersonsPaging(val)
{
debugger;
this.vmsinvitepersonssource.setPaging(1, val, true);
}

handlevmsinvitepersonsGridSelected(event:any) {
this.vmsinvitepersonsselectedindex=this.vmsinvitationservice.vmsinvitepersons.findIndex(i => i.invitationpersonid === event.data.invitationpersonid);
}
IsvmsinvitepersonsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.vmsinvitepersonsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes vmsinvitepersons

}



