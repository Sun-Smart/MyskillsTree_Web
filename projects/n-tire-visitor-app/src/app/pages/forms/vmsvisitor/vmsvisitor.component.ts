import { vmsvisitorService } from './../../../service/vmsvisitor.service';
import { vmsvisitor } from './../../../model/vmsvisitor.model';
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
import { vmsvisitormaster} from './../../../model/vmsvisitormaster.model';
import { vmsvisitormasterComponent } from './../../../pages/forms/vmsvisitormaster/vmsvisitormaster.component';
import { vmsvisitormasterService } from './../../../service/vmsvisitormaster.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { vmsparking} from './../../../model/vmsparking.model';
import { vmsparkingComponent } from './../../../pages/forms/vmsparking/vmsparking.component';
import { vmsparkingService } from './../../../service/vmsparking.service';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-vmsvisitor',
templateUrl: './vmsvisitor.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class vmsvisitorComponent implements OnInit {
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
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
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
bfilterPopulatevmsvisitors:boolean=false;
datavmsvisitorsvisitortype3:any=[];
datavmsvisitorspurpose3:any=[];
datavmsvisitorshost3:any=[];
datavmsvisitorsmeetingplace3:any=[];
datavmsvisitorsdesignationid3:any=[];
datavmsvisitorsdepartmentid3:any=[];
datavmsvisitorsidprooftype3:any=[];
datavmsvisitorsrating3:any=[];
datavmsvisitorsparkingslot3:any=[];
datavmsvisitorsvisitorstatus3:any=[];
datavmsvisitorsvisitormasterid3:any=[];
 vmsvisitorForm: FormGroup;
visitortypeList: boconfigvalue[];
purposeList: boconfigvalue[];
hostList: hrmsemployee[];
hostoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
host_hrmsemployeesForm: FormGroup;//autocomplete
host_hrmsemployeesoptions:any;//autocomplete
host_hrmsemployeesformatter:any;//autocomplete
meetingplaceList: boconfigvalue[];
designationidList: boconfigvalue[];
departmentidList: bomasterdata[];
idprooftypeList: boconfigvalue[];
ratingList: boconfigvalue[];
parkingslotList: vmsparking[];
visitorstatusList: boconfigvalue[];
visitormasteridList: vmsvisitormaster[];
visitormasteridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
visitormasterid_vmsvisitormastersForm: FormGroup;//autocomplete
visitormasterid_vmsvisitormastersoptions:any;//autocomplete
visitormasterid_vmsvisitormastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
@ViewChild('idproof',{static:false}) idproof: AttachmentComponent;
SESSIONUSERID:any;//current user
vmsvisitorshowOption:boolean;
sessiondata:any;
sourcekey:any;

visitorstatusvisible:boolean = false;
approvalremarksvisible:boolean = false;
instructionsvisible:boolean = false;





constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private vmsvisitorservice: vmsvisitorService,
private vmsvisitormasterservice: vmsvisitormasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
private vmsparkingservice:vmsparkingService,
private customfieldservice: customfieldconfigurationService,
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
this.vmsvisitorForm  = this.fb.group({
pk:[null],
ImageName: [null],
visitorid: [null],
visitorreference: [null],
visitortype: [null, Validators.required],
visitortypedesc: [null],
fullname: [null, Validators.required],
thumbnail: [null],
purpose: [null],
purposedesc: [null],
other: [null],
phone: [null],
company: [null],
address: [null],
arrivaldate: [null, Validators.required],
arrivaltime: [null, Validators.required],
duration: [null],
emailaddress: [null, Validators.required],
host: [null, Validators.required],
hostdesc: [null],
meetingplace: [null],
meetingplacedesc: [null],
designationid: [null],
designationiddesc: [null],
departmentid: [null],
departmentiddesc: [null],
mobile: [null],
items: [null],
idprooftype: [null],
idprooftypedesc: [null],
idproof: [null],
rating: [null],
ratingdesc: [null],
carregistrationno: [null],
parkingslot: [null],
parkingslotdesc: [null],
exitdate: [null],
exittime: [null],
notes: [null],
visitorstatus: [null],
visitorstatusdesc: [null],
approvalremarks: [null],
instructions: [null],
history: [null],
invitationid: [null],
status: [null],
statusdesc: [null],
customfield: [null],
attachment: [null],
visitormasterid: [null],
visitormasteriddesc: [null],
});
}

get f() { return this.vmsvisitorForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.vmsvisitorForm.dirty && this.vmsvisitorForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.visitorid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.visitorid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.visitorid && pkDetail) {
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
let vmsvisitorid = null;

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
this.formid=vmsvisitorid;
//this.sharedService.alert(vmsvisitorid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("visitortype").then(res => this.visitortypeList = res as boconfigvalue[]);
this.configservice.getList("visitorpurpose").then(res => this.purposeList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.hostList = res as hrmsemployee[];
if(this.vmsvisitorservice.formData && this.vmsvisitorservice.formData.host){
this.hostoptionsEvent.emit(this.hostList);
this.vmsvisitorForm.patchValue({
    host: this.vmsvisitorservice.formData.host,
    hostdesc: this.vmsvisitorservice.formData.hostdesc,
});
}
{
let arrhost = this.hostList.filter(v => v.employeeid == this.vmsvisitorForm.get('host').value);
let objhost;
if (arrhost.length > 0) objhost = arrhost[0];
if (objhost)
{
    this.vmsvisitorForm.patchValue({ designationid: objhost.designationid });
    this.vmsvisitorForm.patchValue({ departmentid: objhost.departmentid });
    this.vmsvisitorForm.patchValue({ mobile: objhost.mobile });
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
this.configservice.getList("meetingplace").then(res => this.meetingplaceList = res as boconfigvalue[]);
this.configservice.getList("designation").then(res => this.designationidList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("idprooftype").then(res => this.idprooftypeList = res as boconfigvalue[]);
this.configservice.getList("rating").then(res => this.ratingList = res as boconfigvalue[]);
this.vmsparkingservice.getvmsparkingsList().then(res => 
{
this.parkingslotList = res as vmsparking[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("visitorstatus").then(res => this.visitorstatusList = res as boconfigvalue[]);
this.vmsvisitormasterservice.getvmsvisitormastersList().then(res => 
{
this.visitormasteridList = res as vmsvisitormaster[];
if(this.vmsvisitorservice.formData && this.vmsvisitorservice.formData.visitormasterid){
this.visitormasteridoptionsEvent.emit(this.visitormasteridList);
this.vmsvisitorForm.patchValue({
    visitormasterid: this.vmsvisitorservice.formData.visitormasterid,
    visitormasteriddesc: this.vmsvisitorservice.formData.visitormasteriddesc,
});
}
{
let arrvisitormasterid = this.visitormasteridList.filter(v => v.visitormasterid == this.vmsvisitorForm.get('visitormasterid').value);
let objvisitormasterid;
if (arrvisitormasterid.length > 0) objvisitormasterid = arrvisitormasterid[0];
if (objvisitormasterid)
{
}
}
}
).catch((err) => {console.log(err);});
this.visitormasterid_vmsvisitormastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.visitormasteridList.filter(v => v.fullname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.visitormasterid_vmsvisitormastersformatter = (result: any) => result.fullname;

//autocomplete
    this.vmsvisitorservice.getvmsvisitorsList().then(res => {
      this.pkList = res as vmsvisitor[];
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
this.vmsvisitorForm.markAsUntouched();
this.vmsvisitorForm.markAsPristine();
}
onSelectedhost(hostDetail: any) {
if (hostDetail.employeeid && hostDetail) {
this.vmsvisitorForm.patchValue({
host: hostDetail.employeeid,
hostdesc: hostDetail.employeename,

});
this.vmsvisitorForm.patchValue({designationid:hostDetail.designationid});
this.vmsvisitorForm.patchValue({departmentid:hostDetail.departmentid});
this.vmsvisitorForm.patchValue({mobile:hostDetail.mobile});

}
}

onSelectedvisitormasterid(visitormasteridDetail: any) {
if (visitormasteridDetail.visitormasterid && visitormasteridDetail) {
this.vmsvisitorForm.patchValue({
visitormasterid: visitormasteridDetail.visitormasterid,
visitormasteriddesc: visitormasteridDetail.fullname,

});

}
}




  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getidproof() {
    debugger;
    if (this.idproof.getattachmentlist().length > 0) {
      let file = this.idproof.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.vmsvisitorForm != null)
this.vmsvisitorForm.reset();
this.vmsvisitorForm.patchValue({
});
this.vmsvisitorForm.patchValue({
arrivaldate: this.ngbDateParserFormatter.parse(new Date().toString()),
arrivaltime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
exitdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
visitorstatus: "P",
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.visitorstatusvisible = false;
this.approvalremarksvisible = false;
this.instructionsvisible = false;
}

    onDelete() {
        let visitorid = this.vmsvisitorForm.get('visitorid').value;
        if(visitorid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.vmsvisitorservice.deletevmsvisitor(visitorid).then(res =>
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
    this.vmsvisitorForm.patchValue({
        visitorid: null
    });
    if(this.vmsvisitorservice.formData.visitorid!=null)this.vmsvisitorservice.formData.visitorid=null;
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
        else if(key=="address")
this.vmsvisitorForm.patchValue({"address":  mainscreendata[key] } );
        else if(key=="arrivaldate")
this.vmsvisitorForm.patchValue({"arrivaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="arrivaltime")
this.vmsvisitorForm.patchValue({"arrivaltime":new Time(mainscreendata[key]) });
        else if(key=="exitdate")
this.vmsvisitorForm.patchValue({"exitdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="exittime")
this.vmsvisitorForm.patchValue({"exittime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.vmsvisitorForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.vmsvisitorForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.vmsvisitorForm.controls[key]!=undefined)
{
this.vmsvisitorForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("vmsvisitors",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
visitoridonChange(evt:any){
let e=evt.value;
}
visitorreferenceonChange(evt:any){
let e=evt.value;
}
visitortypeonChange(evt:any){
let e=this.f.visitortype.value as any;
this.vmsvisitorForm.patchValue({visitortypedesc:evt.options[evt.options.selectedIndex].text});
}
fullnameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
purposeonChange(evt:any){
let e=this.f.purpose.value as any;
this.vmsvisitorForm.patchValue({purposedesc:evt.options[evt.options.selectedIndex].text});
}
otheronChange(evt:any){
let e=evt.value;
}
phoneonChange(evt:any){
let e=evt.value;
}
companyonChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
let e=evt.value;
}
arrivaldateonChange(evt:any){
let e=evt.value;
}
arrivaltimeonChange(evt:any){
let e=evt.value;
}
durationonChange(evt:any){
let e=evt.value;
}
emailaddressonChange(evt:any){
let e=evt.value;
this.vmsvisitormasterservice.getListByemailaddress(e).then(res => 
{
let arremailaddress=res;
let objemailaddress;
if (arremailaddress.length > 0) objemailaddress = arremailaddress[0];
if (objemailaddress)
{
    this.vmsvisitorForm.patchValue({ visitortype: objemailaddress.visitortype });
    this.vmsvisitorForm.patchValue({ fullname: objemailaddress.fullname });
    this.vmsvisitorForm.patchValue({ thumbnail: objemailaddress.thumbnail });
    this.vmsvisitorForm.patchValue({ purpose: objemailaddress.purpose });
    this.vmsvisitorForm.patchValue({ phone: objemailaddress.phone });
    this.vmsvisitorForm.patchValue({ address: objemailaddress.address });
    this.vmsvisitorForm.patchValue({ emailaddress: objemailaddress.emailaddress });
    this.vmsvisitorForm.patchValue({ host: objemailaddress.host });
    this.vmsvisitorForm.patchValue({ meetingplace: objemailaddress.meetingplace });
    this.vmsvisitorForm.patchValue({ designationid: objemailaddress.designationid });
    this.vmsvisitorForm.patchValue({ departmentid: objemailaddress.departmentid });
    this.vmsvisitorForm.patchValue({ mobile: objemailaddress.mobile });
    this.vmsvisitorForm.patchValue({ idprooftype: objemailaddress.idprooftype });
    this.vmsvisitorForm.patchValue({ idproof: objemailaddress.idproof });
    this.vmsvisitorForm.patchValue({ carregistrationno: objemailaddress.carregistrationno });
    this.vmsvisitorForm.patchValue({ approvalremarks: objemailaddress.approvalremarks });
    this.vmsvisitorForm.patchValue({ instructions: objemailaddress.instructions });
    this.vmsvisitorForm.patchValue({ visitorstatus: objemailaddress.visitorstatus });
}
}).catch((err) => {console.log(err);});
}
hostonChange(evt:any){
let e=evt.value;
}
meetingplaceonChange(evt:any){
let e=this.f.meetingplace.value as any;
this.vmsvisitorForm.patchValue({meetingplacedesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.vmsvisitorForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
departmentidonChange(evt:any){
let e=evt.value;
this.vmsvisitorForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
mobileonChange(evt:any){
let e=evt.value;
}
itemsonChange(evt:any){
let e=evt.value;
}
idprooftypeonChange(evt:any){
let e=this.f.idprooftype.value as any;
this.vmsvisitorForm.patchValue({idprooftypedesc:evt.options[evt.options.selectedIndex].text});
}
idproofonChange(evt:any){
let e=evt.value;
}
ratingonChange(evt:any){
let e=this.f.rating.value as any;
this.vmsvisitorForm.patchValue({ratingdesc:evt.options[evt.options.selectedIndex].text});
}
carregistrationnoonChange(evt:any){
let e=evt.value;
}
parkingslotonChange(evt:any){
let e=evt.value;
this.vmsvisitorForm.patchValue({parkingslotdesc:evt.options[evt.options.selectedIndex].text});
}
exitdateonChange(evt:any){
let e=evt.value;
}
exittimeonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
visitorstatusonChange(evt:any){
let e=this.f.visitorstatus.value as any;
this.vmsvisitorForm.patchValue({visitorstatusdesc:evt.options[evt.options.selectedIndex].text});
}
approvalremarksonChange(evt:any){
let e=evt.value;
}
instructionsonChange(evt:any){
let e=evt.value;
}
historyonChange(evt:any){
let e=evt.value;
}
invitationidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
visitormasteridonChange(evt:any){
let e=evt.value;
}
attachmentuploader(e:any) { 
for (let i = 0; i < e.files.length; i++) {
this.fileattachmentlist.push(e.files[i]);
let max=0;
let attachmentobj =null;
if(this.attachmentfieldjson==null)this.attachmentfieldjson=[];
max=Array.of(this.attachmentfieldjson).length;attachmentobj =new KeyValuePair((this.attachmentfieldjson.length + 1+ max).toString(),e.files[i].name);
this.attachmentfieldjson.push(attachmentobj);
max=0;
if(this.attachmentlist!=null)max=Array.of(this.attachmentlist).length;  attachmentobj =new KeyValuePair((this.attachmentlist.length + 1+ max).toString(),e.files[i].name);
this.attachmentlist.push(attachmentobj);
}}
  


editvmsvisitors() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.vmsvisitorservice.getvmsvisitorsByEID(pkcol).then(res => {

this.vmsvisitorservice.formData=res.vmsvisitor;
let formproperty=res.vmsvisitor.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.vmsvisitor.pkcol;
this.formid=res.vmsvisitor.visitorid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.vmsvisitor.visitorid;
var arrivaltimeTime=new Time( res.vmsvisitor.arrivaltime);
var exittimeTime=new Time( res.vmsvisitor.exittime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.vmsvisitorForm.patchValue({
visitorid: res.vmsvisitor.visitorid,
visitorreference: res.vmsvisitor.visitorreference,
visitortype: res.vmsvisitor.visitortype,
visitortypedesc: res.vmsvisitor.visitortypedesc,
fullname: res.vmsvisitor.fullname,
thumbnail: JSON.parse(res.vmsvisitor.thumbnail),
purpose: res.vmsvisitor.purpose,
purposedesc: res.vmsvisitor.purposedesc,
other: res.vmsvisitor.other,
phone: res.vmsvisitor.phone,
company: res.vmsvisitor.company,
address: JSON.parse(res.vmsvisitor.address),
arrivaldate: this.ngbDateParserFormatter.parse(res.vmsvisitor.arrivaldate),
arrivaltime: arrivaltimeTime,
duration: res.vmsvisitor.duration,
emailaddress: res.vmsvisitor.emailaddress,
host: res.vmsvisitor.host,
hostdesc: res.vmsvisitor.hostdesc,
meetingplace: res.vmsvisitor.meetingplace,
meetingplacedesc: res.vmsvisitor.meetingplacedesc,
designationid: res.vmsvisitor.designationid,
designationiddesc: res.vmsvisitor.designationiddesc,
departmentid: res.vmsvisitor.departmentid,
departmentiddesc: res.vmsvisitor.departmentiddesc,
mobile: res.vmsvisitor.mobile,
items: res.vmsvisitor.items,
idprooftype: res.vmsvisitor.idprooftype,
idprooftypedesc: res.vmsvisitor.idprooftypedesc,
idproof: JSON.parse(res.vmsvisitor.idproof),
rating: res.vmsvisitor.rating,
ratingdesc: res.vmsvisitor.ratingdesc,
carregistrationno: res.vmsvisitor.carregistrationno,
parkingslot: res.vmsvisitor.parkingslot,
parkingslotdesc: res.vmsvisitor.parkingslotdesc,
exitdate: this.ngbDateParserFormatter.parse(res.vmsvisitor.exitdate),
exittime: exittimeTime,
notes: res.vmsvisitor.notes,
visitorstatus: res.vmsvisitor.visitorstatus,
visitorstatusdesc: res.vmsvisitor.visitorstatusdesc,
approvalremarks: res.vmsvisitor.approvalremarks,
instructions: res.vmsvisitor.instructions,
history: res.vmsvisitor.history,
invitationid: res.vmsvisitor.invitationid,
status: res.vmsvisitor.status,
statusdesc: res.vmsvisitor.statusdesc,
customfield: res.vmsvisitor.customfield,
attachment: JSON.parse(res.vmsvisitor.attachment),
visitormasterid: res.vmsvisitor.visitormasterid,
visitormasteriddesc: res.vmsvisitor.visitormasteriddesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("visitorstatus")>=0)this.visitorstatusvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("visitorstatus")>=0)this.visitorstatusvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("approvalremarks")>=0)this.approvalremarksvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("approvalremarks")>=0)this.approvalremarksvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("instructions")>=0)this.instructionsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("instructions")>=0)this.instructionsvisible = false;
if(this.vmsvisitorForm.get('customfield').value!=null && this.vmsvisitorForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.vmsvisitorForm.get('customfield').value);
this.FillCustomField();
if(this.vmsvisitorForm.get('thumbnail').value!=null && this.vmsvisitorForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.vmsvisitorForm.get('thumbnail').value);
if(this.vmsvisitorForm.get('idproof').value!=null && this.vmsvisitorForm.get('idproof').value!="" && this.idproof!=null && this.idproof!=undefined)this.idproof.setattachmentlist(this.vmsvisitorForm.get('idproof').value);
if(this.vmsvisitorForm.get('attachment').value!=null && this.vmsvisitorForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.vmsvisitorForm.get('attachment').value);
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
  for (let key in this.vmsvisitorForm.controls) {
    if (this.vmsvisitorForm.controls[key] != null) {
if( key=="idproof" ||  key=="thumbnail")
{
if(this.vmsvisitorservice.formData!=null && this.vmsvisitorservice.formData[key]!=null  && this.vmsvisitorservice.formData[key]!='[]' && this.vmsvisitorservice.formData[key]!=undefined && this.vmsvisitorservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.vmsvisitorservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.vmsvisitorservice.formData!=null && this.vmsvisitorservice.formData[key]!=null   && this.vmsvisitorservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.vmsvisitorservice.formData[key]+"></div>");
}
else if(false)
{
if(this.vmsvisitorservice.formData!=null && this.vmsvisitorservice.formData[key]!=null   && this.vmsvisitorservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.vmsvisitorservice.formData[key]+"'><div class='progress__number'>"+this.vmsvisitorservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.vmsvisitorForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.vmsvisitorForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.vmsvisitorForm.value;
if(this.vmsvisitorForm.get('address').value!=null)obj.address=JSON.stringify(this.vmsvisitorForm.get('address').value);
obj.arrivaldate=new Date(this.vmsvisitorForm.get('arrivaldate').value ? this.ngbDateParserFormatter.format(this.vmsvisitorForm.get('arrivaldate').value)+'  UTC' :null);
obj.arrivaltime=(this.vmsvisitorForm.get('arrivaltime').value==null?0:this.vmsvisitorForm.get('arrivaltime').value.hour)+':'+(this.vmsvisitorForm.get('arrivaltime').value==null?0:this.vmsvisitorForm.get('arrivaltime').value.minute+":00");
obj.exitdate=new Date(this.vmsvisitorForm.get('exitdate').value ? this.ngbDateParserFormatter.format(this.vmsvisitorForm.get('exitdate').value)+'  UTC' :null);
obj.exittime=(this.vmsvisitorForm.get('exittime').value==null?0:this.vmsvisitorForm.get('exittime').value.hour)+':'+(this.vmsvisitorForm.get('exittime').value==null?0:this.vmsvisitorForm.get('exittime').value.minute+":00");
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.idproof.getattachmentlist()!=null)obj.idproof=JSON.stringify(this.idproof.getattachmentlist());
if(this.thumbnail.getattachmentlist()!=null)obj.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.idproof.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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

private vmsvisitortoggleOption(){
this.vmsvisitorshowOption = this.vmsvisitorshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.vmsvisitorForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.vmsvisitorForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.vmsvisitorForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.vmsvisitorservice.formData=this.vmsvisitorForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.vmsvisitorForm.controls[key] != null)
    {
        this.vmsvisitorservice.formData[key] = this.vmsvisitorForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.vmsvisitorservice.formData.thumbnail=this.vmsvisitorForm.get('thumbnail').value;
if(this.vmsvisitorForm.get('address').value!=null)this.vmsvisitorservice.formData.address=JSON.stringify(this.vmsvisitorForm.get('address').value);
this.vmsvisitorservice.formData.arrivaldate=new Date(this.vmsvisitorForm.get('arrivaldate').value ? this.ngbDateParserFormatter.format(this.vmsvisitorForm.get('arrivaldate').value)+'  UTC' :null);
this.vmsvisitorservice.formData.arrivaltime=(this.vmsvisitorForm.get('arrivaltime').value==null?0:this.vmsvisitorForm.get('arrivaltime').value.hour)+':'+(this.vmsvisitorForm.get('arrivaltime').value==null?0:this.vmsvisitorForm.get('arrivaltime').value.minute+":00");
this.vmsvisitorservice.formData.exitdate=new Date(this.vmsvisitorForm.get('exitdate').value ? this.ngbDateParserFormatter.format(this.vmsvisitorForm.get('exitdate').value)+'  UTC' :null);
this.vmsvisitorservice.formData.exittime=(this.vmsvisitorForm.get('exittime').value==null?0:this.vmsvisitorForm.get('exittime').value.hour)+':'+(this.vmsvisitorForm.get('exittime').value==null?0:this.vmsvisitorForm.get('exittime').value.minute+":00");
if(customfields!=null)this.vmsvisitorservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.vmsvisitorservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
if(this.idproof.getattachmentlist()!=null)this.vmsvisitorservice.formData.idproof=JSON.stringify(this.idproof.getattachmentlist());
if(this.thumbnail.getattachmentlist()!=null)this.vmsvisitorservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.vmsvisitorservice.formData);
this.vmsvisitorservice.formData=this.vmsvisitorForm.value;
this.vmsvisitorservice.saveOrUpdatevmsvisitors().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.idproof.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsvisitor);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.vmsvisitorservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsvisitor);
}
else
{
this.FillData(res);
}
}
this.vmsvisitorForm.markAsUntouched();
this.vmsvisitorForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithost( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.vmsvisitorForm.get('host').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.vmsvisitorForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparkingslot( parkingid) {
/*let ScreenType='2';
this.dialog.open(vmsparkingComponent, 
{
data: {parkingid:this.vmsvisitorForm.get('parkingslot').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditvisitormasterid( visitormasterid) {
/*let ScreenType='2';
this.dialog.open(vmsvisitormasterComponent, 
{
data: {visitormasterid:this.vmsvisitorForm.get('visitormasterid').value, ScreenType:2 }
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



