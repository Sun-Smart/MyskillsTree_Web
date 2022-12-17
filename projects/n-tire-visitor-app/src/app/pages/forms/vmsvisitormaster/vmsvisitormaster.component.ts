import { vmsvisitormasterService } from './../../../service/vmsvisitormaster.service';
import { vmsvisitormaster } from './../../../model/vmsvisitormaster.model';
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
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-vmsvisitormaster',
templateUrl: './vmsvisitormaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class vmsvisitormasterComponent implements OnInit {
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
bfilterPopulatevmsvisitormasters:boolean=false;
datavmsvisitormastersvisitortype3:any=[];
datavmsvisitormasterspurpose3:any=[];
datavmsvisitormastershost3:any=[];
datavmsvisitormastersmeetingplace3:any=[];
datavmsvisitormastersdesignationid3:any=[];
datavmsvisitormastersdepartmentid3:any=[];
datavmsvisitormastersidprooftype3:any=[];
datavmsvisitormastersvisitorstatus3:any=[];
 vmsvisitormasterForm: FormGroup;
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
visitorstatusList: boconfigvalue[];
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
vmsvisitormastershowOption:boolean;
sessiondata:any;
sourcekey:any;

instructionsvisible:boolean = false;
visitorstatusvisible:boolean = false;
approvalremarksvisible:boolean = false;





constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private vmsvisitormasterservice: vmsvisitormasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
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
this.vmsvisitormasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
visitormasterid: [null],
reference: [null],
visitortype: [null, Validators.required],
visitortypedesc: [null],
fullname: [null, Validators.required],
thumbnail: [null],
purpose: [null],
purposedesc: [null],
phone: [null],
company: [null],
address: [null],
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
idprooftype: [null],
idprooftypedesc: [null],
idproof: [null],
carregistrationno: [null],
approvalremarks: [null],
instructions: [null],
visitorstatus: [null],
visitorstatusdesc: [null],
history: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.vmsvisitormasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.vmsvisitormasterForm.dirty && this.vmsvisitormasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.visitormasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.visitormasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.visitormasterid && pkDetail) {
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
let vmsvisitormasterid = null;

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
this.formid=vmsvisitormasterid;
//this.sharedService.alert(vmsvisitormasterid);

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
if(this.vmsvisitormasterservice.formData && this.vmsvisitormasterservice.formData.host){
this.hostoptionsEvent.emit(this.hostList);
this.vmsvisitormasterForm.patchValue({
    host: this.vmsvisitormasterservice.formData.host,
    hostdesc: this.vmsvisitormasterservice.formData.hostdesc,
});
}
{
let arrhost = this.hostList.filter(v => v.employeeid == this.vmsvisitormasterForm.get('host').value);
let objhost;
if (arrhost.length > 0) objhost = arrhost[0];
if (objhost)
{
    this.vmsvisitormasterForm.patchValue({ designationid: objhost.designationid });
    this.vmsvisitormasterForm.patchValue({ departmentid: objhost.departmentid });
    this.vmsvisitormasterForm.patchValue({ mobile: objhost.mobile });
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
this.configservice.getList("visitorstatus").then(res => this.visitorstatusList = res as boconfigvalue[]);

//autocomplete
    this.vmsvisitormasterservice.getvmsvisitormastersList().then(res => {
      this.pkList = res as vmsvisitormaster[];
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
this.vmsvisitormasterForm.markAsUntouched();
this.vmsvisitormasterForm.markAsPristine();
}
onSelectedhost(hostDetail: any) {
if (hostDetail.employeeid && hostDetail) {
this.vmsvisitormasterForm.patchValue({
host: hostDetail.employeeid,
hostdesc: hostDetail.employeename,

});
this.vmsvisitormasterForm.patchValue({designationid:hostDetail.designationid});
this.vmsvisitormasterForm.patchValue({departmentid:hostDetail.departmentid});
this.vmsvisitormasterForm.patchValue({mobile:hostDetail.mobile});

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
if (this.vmsvisitormasterForm != null)
this.vmsvisitormasterForm.reset();
this.vmsvisitormasterForm.patchValue({
});
this.vmsvisitormasterForm.patchValue({
visitorstatus: "P",
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.instructionsvisible = false;
this.visitorstatusvisible = false;
this.approvalremarksvisible = false;
}

    onDelete() {
        let visitormasterid = this.vmsvisitormasterForm.get('visitormasterid').value;
        if(visitormasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.vmsvisitormasterservice.deletevmsvisitormaster(visitormasterid).then(res =>
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
    this.vmsvisitormasterForm.patchValue({
        visitormasterid: null
    });
    if(this.vmsvisitormasterservice.formData.visitormasterid!=null)this.vmsvisitormasterservice.formData.visitormasterid=null;
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
this.vmsvisitormasterForm.patchValue({"address":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.vmsvisitormasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.vmsvisitormasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.vmsvisitormasterForm.controls[key]!=undefined)
{
this.vmsvisitormasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("vmsvisitormasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
visitormasteridonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
visitortypeonChange(evt:any){
let e=this.f.visitortype.value as any;
this.vmsvisitormasterForm.patchValue({visitortypedesc:evt.options[evt.options.selectedIndex].text});
}
fullnameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
purposeonChange(evt:any){
let e=this.f.purpose.value as any;
this.vmsvisitormasterForm.patchValue({purposedesc:evt.options[evt.options.selectedIndex].text});
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
emailaddressonChange(evt:any){
let e=evt.value;
}
hostonChange(evt:any){
let e=evt.value;
}
meetingplaceonChange(evt:any){
let e=this.f.meetingplace.value as any;
this.vmsvisitormasterForm.patchValue({meetingplacedesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.vmsvisitormasterForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
departmentidonChange(evt:any){
let e=evt.value;
this.vmsvisitormasterForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
mobileonChange(evt:any){
let e=evt.value;
}
idprooftypeonChange(evt:any){
let e=this.f.idprooftype.value as any;
this.vmsvisitormasterForm.patchValue({idprooftypedesc:evt.options[evt.options.selectedIndex].text});
}
idproofonChange(evt:any){
let e=evt.value;
}
carregistrationnoonChange(evt:any){
let e=evt.value;
}
approvalremarksonChange(evt:any){
let e=evt.value;
}
instructionsonChange(evt:any){
let e=evt.value;
}
visitorstatusonChange(evt:any){
let e=this.f.visitorstatus.value as any;
this.vmsvisitormasterForm.patchValue({visitorstatusdesc:evt.options[evt.options.selectedIndex].text});
}
historyonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
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
  


editvmsvisitormasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.vmsvisitormasterservice.getvmsvisitormastersByEID(pkcol).then(res => {

this.vmsvisitormasterservice.formData=res.vmsvisitormaster;
let formproperty=res.vmsvisitormaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.vmsvisitormaster.pkcol;
this.formid=res.vmsvisitormaster.visitormasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.vmsvisitormaster.visitormasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.vmsvisitormasterForm.patchValue({
visitormasterid: res.vmsvisitormaster.visitormasterid,
reference: res.vmsvisitormaster.reference,
visitortype: res.vmsvisitormaster.visitortype,
visitortypedesc: res.vmsvisitormaster.visitortypedesc,
fullname: res.vmsvisitormaster.fullname,
thumbnail: JSON.parse(res.vmsvisitormaster.thumbnail),
purpose: res.vmsvisitormaster.purpose,
purposedesc: res.vmsvisitormaster.purposedesc,
phone: res.vmsvisitormaster.phone,
company: res.vmsvisitormaster.company,
address: JSON.parse(res.vmsvisitormaster.address),
emailaddress: res.vmsvisitormaster.emailaddress,
host: res.vmsvisitormaster.host,
hostdesc: res.vmsvisitormaster.hostdesc,
meetingplace: res.vmsvisitormaster.meetingplace,
meetingplacedesc: res.vmsvisitormaster.meetingplacedesc,
designationid: res.vmsvisitormaster.designationid,
designationiddesc: res.vmsvisitormaster.designationiddesc,
departmentid: res.vmsvisitormaster.departmentid,
departmentiddesc: res.vmsvisitormaster.departmentiddesc,
mobile: res.vmsvisitormaster.mobile,
idprooftype: res.vmsvisitormaster.idprooftype,
idprooftypedesc: res.vmsvisitormaster.idprooftypedesc,
idproof: JSON.parse(res.vmsvisitormaster.idproof),
carregistrationno: res.vmsvisitormaster.carregistrationno,
approvalremarks: res.vmsvisitormaster.approvalremarks,
instructions: res.vmsvisitormaster.instructions,
visitorstatus: res.vmsvisitormaster.visitorstatus,
visitorstatusdesc: res.vmsvisitormaster.visitorstatusdesc,
history: res.vmsvisitormaster.history,
status: res.vmsvisitormaster.status,
statusdesc: res.vmsvisitormaster.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("instructions")>=0)this.instructionsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("instructions")>=0)this.instructionsvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("visitorstatus")>=0)this.visitorstatusvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("visitorstatus")>=0)this.visitorstatusvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("approvalremarks")>=0)this.approvalremarksvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("approvalremarks")>=0)this.approvalremarksvisible = false;
if(this.vmsvisitormasterForm.get('customfield').value!=null && this.vmsvisitormasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.vmsvisitormasterForm.get('customfield').value);
this.FillCustomField();
if(this.vmsvisitormasterForm.get('thumbnail').value!=null && this.vmsvisitormasterForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.vmsvisitormasterForm.get('thumbnail').value);
if(this.vmsvisitormasterForm.get('idproof').value!=null && this.vmsvisitormasterForm.get('idproof').value!="" && this.idproof!=null && this.idproof!=undefined)this.idproof.setattachmentlist(this.vmsvisitormasterForm.get('idproof').value);
if(this.vmsvisitormasterForm.get('attachment').value!=null && this.vmsvisitormasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.vmsvisitormasterForm.get('attachment').value);
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
  for (let key in this.vmsvisitormasterForm.controls) {
    if (this.vmsvisitormasterForm.controls[key] != null) {
if( key=="idproof" ||  key=="thumbnail")
{
if(this.vmsvisitormasterservice.formData!=null && this.vmsvisitormasterservice.formData[key]!=null  && this.vmsvisitormasterservice.formData[key]!='[]' && this.vmsvisitormasterservice.formData[key]!=undefined && this.vmsvisitormasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.vmsvisitormasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.vmsvisitormasterservice.formData!=null && this.vmsvisitormasterservice.formData[key]!=null   && this.vmsvisitormasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.vmsvisitormasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.vmsvisitormasterservice.formData!=null && this.vmsvisitormasterservice.formData[key]!=null   && this.vmsvisitormasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.vmsvisitormasterservice.formData[key]+"'><div class='progress__number'>"+this.vmsvisitormasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.vmsvisitormasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.vmsvisitormasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.vmsvisitormasterForm.value;
if(this.vmsvisitormasterForm.get('address').value!=null)obj.address=JSON.stringify(this.vmsvisitormasterForm.get('address').value);
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

private vmsvisitormastertoggleOption(){
this.vmsvisitormastershowOption = this.vmsvisitormastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.vmsvisitormasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.vmsvisitormasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.vmsvisitormasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.vmsvisitormasterservice.formData=this.vmsvisitormasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.vmsvisitormasterForm.controls[key] != null)
    {
        this.vmsvisitormasterservice.formData[key] = this.vmsvisitormasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.vmsvisitormasterservice.formData.thumbnail=this.vmsvisitormasterForm.get('thumbnail').value;
if(this.vmsvisitormasterForm.get('address').value!=null)this.vmsvisitormasterservice.formData.address=JSON.stringify(this.vmsvisitormasterForm.get('address').value);
if(this.idproof.getattachmentlist()!=null)this.vmsvisitormasterservice.formData.idproof=JSON.stringify(this.idproof.getattachmentlist());
if(this.thumbnail.getattachmentlist()!=null)this.vmsvisitormasterservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.vmsvisitormasterservice.formData);
this.vmsvisitormasterservice.formData=this.vmsvisitormasterForm.value;
this.vmsvisitormasterservice.saveOrUpdatevmsvisitormasters().subscribe(
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
this.dialogRef.close((res as any).vmsvisitormaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.vmsvisitormasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsvisitormaster);
}
else
{
this.FillData(res);
}
}
this.vmsvisitormasterForm.markAsUntouched();
this.vmsvisitormasterForm.markAsPristine();
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
data: {employeeid:this.vmsvisitormasterForm.get('host').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.vmsvisitormasterForm.get('departmentid').value, ScreenType:2 }
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



