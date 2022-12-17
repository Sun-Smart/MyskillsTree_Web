import { pmsworkorderService } from './../../../service/pmsworkorder.service';
import { pmsworkorder } from './../../../model/pmsworkorder.model';
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
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmstenant} from './../../../model/pmstenant.model';
import { pmstenantService } from './../../../service/pmstenant.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
//popups
//detail table services
import { pmsworkorderdetail } from './../../../model/pmsworkorderdetail.model';
import { pmsworkorderdetailComponent } from './../../../pages/forms/pmsworkorderdetail/pmsworkorderdetail.component';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-pmsworkorder',
templateUrl: './pmsworkorder.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmsworkorderComponent implements OnInit {
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
bfilterPopulatepmsworkorders:boolean=false;
datapmsworkorderspropertyid3:any=[];
datapmsworkorderstenantid3:any=[];
datapmsworkordersworkordertype3:any=[];
datapmsworkordersworkorderfrequency3:any=[];
datapmsworkorderspriority3:any=[];
datapmsworkordersresponsibleid3:any=[];
datapmsworkordersvisittype3:any=[];
datapmsworkordersownerid3:any=[];
datapmsworkorderdetailspropertyid3:any=[];
datapmsworkorderdetailsworkorderid3:any=[];
bfilterPopulatepmsworkorderdetails:boolean=false;
@ViewChild('tblpmsworkorderdetailssource',{static:false}) tblpmsworkorderdetailssource: Ng2SmartTableComponent;
 pmsworkorderForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenantid_pmstenantsForm: FormGroup;//autocomplete
tenantid_pmstenantsoptions:any;//autocomplete
tenantid_pmstenantsformatter:any;//autocomplete
workordertypeList: boconfigvalue[];
workorderfrequencyList: boconfigvalue[];
priorityList: boconfigvalue[];
responsibleidList: hrmsemployee[];
responsibleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
responsibleid_hrmsemployeesForm: FormGroup;//autocomplete
responsibleid_hrmsemployeesoptions:any;//autocomplete
responsibleid_hrmsemployeesformatter:any;//autocomplete
visittypeList: boconfigvalue[];
owneridList: pmspropertyowner[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
pmsworkordershowOption:boolean;
pmsworkorderdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



pmsworkorderdetailsvisiblelist:any;
pmsworkorderdetailshidelist:any;

DeletedpmsworkorderdetailIDs: string="";
pmsworkorderdetailsID: string = "1";
pmsworkorderdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmsworkorderservice: pmsworkorderService,
private pmspropertyservice: pmspropertyService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmstenantservice:pmstenantService,
private hrmsemployeeservice:hrmsemployeeService,
private pmspropertyownerservice:pmspropertyownerService,
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
this.pmsworkorderForm  = this.fb.group({
pk:[null],
ImageName: [null],
workorderid: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
workorderno: [null],
tenantid: [null],
tenantiddesc: [null],
scheduleid: [null],
description: [null],
details: [null],
workordertype: [null],
workordertypedesc: [null],
workorderfrequency: [null],
workorderfrequencydesc: [null],
recurringstartdate: [null],
recurringenddate: [null],
noenddate: [null],
priority: [null],
prioritydesc: [null],
invoiceno: [null],
totalamount: [null],
suggestedperson: [null],
responsibleid: [null],
responsibleiddesc: [null],
visittype: [null],
visittypedesc: [null],
visitdate: [null],
visittime: [null],
duedate: [null],
leaseid: [null],
ownerid: [null],
owneriddesc: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmsworkorderForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmsworkorderForm.dirty && this.pmsworkorderForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workorderid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workorderid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workorderid && pkDetail) {
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
let pmsworkorderid = null;

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
this.formid=pmsworkorderid;
//this.sharedService.alert(pmsworkorderid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmsworkorderdetailsTableConfig();
  setTimeout(() => {
  this.SetpmsworkorderdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmsworkorderservice.formData && this.pmsworkorderservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmsworkorderForm.patchValue({
    propertyid: this.pmsworkorderservice.formData.propertyid,
    propertyiddesc: this.pmsworkorderservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmsworkorderForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmsworkorderservice.formData && this.pmsworkorderservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmsworkorderForm.patchValue({
    tenantid: this.pmsworkorderservice.formData.tenantid,
    tenantiddesc: this.pmsworkorderservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmsworkorderForm.get('tenantid').value);
let objtenantid;
if (arrtenantid.length > 0) objtenantid = arrtenantid[0];
if (objtenantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenantid_pmstenantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenantidList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenantid_pmstenantsformatter = (result: any) => result.lastname;
this.configservice.getList("workordertype").then(res => this.workordertypeList = res as boconfigvalue[]);
this.configservice.getList("workorderfrequency").then(res => this.workorderfrequencyList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.responsibleidList = res as hrmsemployee[];
if(this.pmsworkorderservice.formData && this.pmsworkorderservice.formData.responsibleid){
this.responsibleidoptionsEvent.emit(this.responsibleidList);
this.pmsworkorderForm.patchValue({
    responsibleid: this.pmsworkorderservice.formData.responsibleid,
    responsibleiddesc: this.pmsworkorderservice.formData.responsibleiddesc,
});
}
{
let arrresponsibleid = this.responsibleidList.filter(v => v.employeeid == this.pmsworkorderForm.get('responsibleid').value);
let objresponsibleid;
if (arrresponsibleid.length > 0) objresponsibleid = arrresponsibleid[0];
if (objresponsibleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.responsibleid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.responsibleidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.responsibleid_hrmsemployeesformatter = (result: any) => result.employeename;
this.configservice.getList("visittype").then(res => this.visittypeList = res as boconfigvalue[]);
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.pmsworkorderservice.getpmsworkordersList().then(res => {
      this.pkList = res as pmsworkorder[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.pmsworkorderForm.markAsUntouched();
this.pmsworkorderForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmsworkorderForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});

}
}

onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmsworkorderForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}

onSelectedresponsibleid(responsibleidDetail: any) {
if (responsibleidDetail.employeeid && responsibleidDetail) {
this.pmsworkorderForm.patchValue({
responsibleid: responsibleidDetail.employeeid,
responsibleiddesc: responsibleidDetail.employeename,

});

}
}




resetForm() {
if (this.pmsworkorderForm != null)
this.pmsworkorderForm.reset();
this.pmsworkorderForm.patchValue({
});
setTimeout(() => {
this.pmsworkorderservice.pmsworkorderdetails=[];
this.pmsworkorderdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let workorderid = this.pmsworkorderForm.get('workorderid').value;
        if(workorderid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmsworkorderservice.deletepmsworkorder(workorderid).then(res =>
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
    this.pmsworkorderForm.patchValue({
        workorderid: null
    });
    if(this.pmsworkorderservice.formData.workorderid!=null)this.pmsworkorderservice.formData.workorderid=null;
for (let i=0;i<this.pmsworkorderservice.pmsworkorderdetails.length;i++) {
this.pmsworkorderservice.pmsworkorderdetails[i].workorderdetailid=null;
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
        else if(key=="recurringstartdate")
this.pmsworkorderForm.patchValue({"recurringstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="recurringenddate")
this.pmsworkorderForm.patchValue({"recurringenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="visitdate")
this.pmsworkorderForm.patchValue({"visitdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="visittime")
this.pmsworkorderForm.patchValue({"visittime":new Time(mainscreendata[key]) });
        else if(key=="duedate")
this.pmsworkorderForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmsworkorderForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmsworkorderForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmsworkorderForm.controls[key]!=undefined)
{
this.pmsworkorderForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.pmsworkorderservice.formData.description!=null )
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
workorderidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
}
workordernoonChange(evt:any){
let e=evt.value;
}
tenantidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
workordertypeonChange(evt:any){
let e=this.f.workordertype.value as any;
this.pmsworkorderForm.patchValue({workordertypedesc:evt.options[evt.options.selectedIndex].text});
}
workorderfrequencyonChange(evt:any){
let e=this.f.workorderfrequency.value as any;
this.pmsworkorderForm.patchValue({workorderfrequencydesc:evt.options[evt.options.selectedIndex].text});
}
recurringstartdateonChange(evt:any){
let e=evt.value;
}
recurringenddateonChange(evt:any){
let e=evt.value;
}
noenddateonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.pmsworkorderForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
invoicenoonChange(evt:any){
let e=evt.value;
}
totalamountonChange(evt:any){
let e=evt.value;
}
suggestedpersononChange(evt:any){
let e=evt.value;
}
responsibleidonChange(evt:any){
let e=evt.value;
}
visittypeonChange(evt:any){
let e=this.f.visittype.value as any;
this.pmsworkorderForm.patchValue({visittypedesc:evt.options[evt.options.selectedIndex].text});
}
visitdateonChange(evt:any){
let e=evt.value;
}
visittimeonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
leaseidonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmsworkorderForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
attachmentonChange(evt:any){
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
  


editpmsworkorders() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmsworkorderservice.getpmsworkordersByEID(pkcol).then(res => {

this.pmsworkorderservice.formData=res.pmsworkorder;
let formproperty=res.pmsworkorder.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmsworkorder.pkcol;
this.formid=res.pmsworkorder.workorderid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmsworkorder.workorderid;
var visittimeTime=new Time( res.pmsworkorder.visittime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmsworkorderForm.patchValue({
workorderid: res.pmsworkorder.workorderid,
propertyid: res.pmsworkorder.propertyid,
propertyiddesc: res.pmsworkorder.propertyiddesc,
unitid: res.pmsworkorder.unitid,
workorderno: res.pmsworkorder.workorderno,
tenantid: res.pmsworkorder.tenantid,
tenantiddesc: res.pmsworkorder.tenantiddesc,
scheduleid: res.pmsworkorder.scheduleid,
description: res.pmsworkorder.description,
details: res.pmsworkorder.details,
workordertype: res.pmsworkorder.workordertype,
workordertypedesc: res.pmsworkorder.workordertypedesc,
workorderfrequency: res.pmsworkorder.workorderfrequency,
workorderfrequencydesc: res.pmsworkorder.workorderfrequencydesc,
recurringstartdate: this.ngbDateParserFormatter.parse(res.pmsworkorder.recurringstartdate),
recurringenddate: this.ngbDateParserFormatter.parse(res.pmsworkorder.recurringenddate),
noenddate: res.pmsworkorder.noenddate,
priority: res.pmsworkorder.priority,
prioritydesc: res.pmsworkorder.prioritydesc,
invoiceno: res.pmsworkorder.invoiceno,
totalamount: res.pmsworkorder.totalamount,
suggestedperson: res.pmsworkorder.suggestedperson,
responsibleid: res.pmsworkorder.responsibleid,
responsibleiddesc: res.pmsworkorder.responsibleiddesc,
visittype: res.pmsworkorder.visittype,
visittypedesc: res.pmsworkorder.visittypedesc,
visitdate: this.ngbDateParserFormatter.parse(res.pmsworkorder.visitdate),
visittime: visittimeTime,
duedate: this.ngbDateParserFormatter.parse(res.pmsworkorder.duedate),
leaseid: res.pmsworkorder.leaseid,
ownerid: res.pmsworkorder.ownerid,
owneriddesc: res.pmsworkorder.owneriddesc,
attachment: JSON.parse(res.pmsworkorder.attachment),
status: res.pmsworkorder.status,
statusdesc: res.pmsworkorder.statusdesc,
});
this.pmsworkorderdetailsvisiblelist=res.pmsworkorderdetailsvisiblelist;
if(this.pmsworkorderForm.get('attachment').value!=null && this.pmsworkorderForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmsworkorderForm.get('attachment').value);
//Child Tables if any
this.pmsworkorderservice.pmsworkorderdetails = res.pmsworkorderdetails;
this.SetpmsworkorderdetailsTableConfig();
this.pmsworkorderdetailsLoadTable();
  setTimeout(() => {
  this.SetpmsworkorderdetailsTableddConfig();
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
  for (let key in this.pmsworkorderForm.controls) {
    if (this.pmsworkorderForm.controls[key] != null) {
if(false)
{
if(this.pmsworkorderservice.formData!=null && this.pmsworkorderservice.formData[key]!=null  && this.pmsworkorderservice.formData[key]!='[]' && this.pmsworkorderservice.formData[key]!=undefined && this.pmsworkorderservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmsworkorderservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmsworkorderservice.formData!=null && this.pmsworkorderservice.formData[key]!=null   && this.pmsworkorderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmsworkorderservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmsworkorderservice.formData!=null && this.pmsworkorderservice.formData[key]!=null   && this.pmsworkorderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmsworkorderservice.formData[key]+"'><div class='progress__number'>"+this.pmsworkorderservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmsworkorderForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmsworkorderForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmsworkorderForm.value;
obj.recurringstartdate=new Date(this.pmsworkorderForm.get('recurringstartdate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('recurringstartdate').value)+'  UTC' :null);
obj.recurringenddate=new Date(this.pmsworkorderForm.get('recurringenddate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('recurringenddate').value)+'  UTC' :null);
obj.visitdate=new Date(this.pmsworkorderForm.get('visitdate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('visitdate').value)+'  UTC' :null);
obj.visittime=(this.pmsworkorderForm.get('visittime').value==null?0:this.pmsworkorderForm.get('visittime').value.hour)+':'+(this.pmsworkorderForm.get('visittime').value==null?0:this.pmsworkorderForm.get('visittime').value.minute+":00");
obj.duedate=new Date(this.pmsworkorderForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('duedate').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
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

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}

private pmsworkorderdetailtoggleOption(){
this.pmsworkorderdetailshowOption = this.pmsworkorderdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmsworkorderForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmsworkorderForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmsworkorderForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmsworkorderservice.formData=this.pmsworkorderForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmsworkorderForm.controls[key] != null)
    {
        this.pmsworkorderservice.formData[key] = this.pmsworkorderForm.controls[key].value;
    }
}
}
}
this.pmsworkorderservice.formData.recurringstartdate=new Date(this.pmsworkorderForm.get('recurringstartdate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('recurringstartdate').value)+'  UTC' :null);
this.pmsworkorderservice.formData.recurringenddate=new Date(this.pmsworkorderForm.get('recurringenddate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('recurringenddate').value)+'  UTC' :null);
this.pmsworkorderservice.formData.visitdate=new Date(this.pmsworkorderForm.get('visitdate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('visitdate').value)+'  UTC' :null);
this.pmsworkorderservice.formData.visittime=(this.pmsworkorderForm.get('visittime').value==null?0:this.pmsworkorderForm.get('visittime').value.hour)+':'+(this.pmsworkorderForm.get('visittime').value==null?0:this.pmsworkorderForm.get('visittime').value.minute+":00");
this.pmsworkorderservice.formData.duedate=new Date(this.pmsworkorderForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.pmsworkorderForm.get('duedate').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.pmsworkorderservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.pmsworkorderservice.formData.DeletedpmsworkorderdetailIDs = this.DeletedpmsworkorderdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.pmsworkorderservice.formData);
this.pmsworkorderservice.formData=this.pmsworkorderForm.value;
this.pmsworkorderservice.saveOrUpdatepmsworkorders().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.pmsworkorderdetailssource.data)
{
    for (let i = 0; i < this.pmsworkorderdetailssource.data.length; i++)
    {
        if (this.pmsworkorderdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsworkorderdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsworkorder);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmsworkorderservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsworkorder);
}
else
{
this.FillData(res);
}
}
this.pmsworkorderForm.markAsUntouched();
this.pmsworkorderForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmsworkorderForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmsworkorderForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditresponsibleid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.pmsworkorderForm.get('responsibleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmsworkorderForm.get('ownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmsworkorderdetail(event:any,workorderdetailid:any, workorderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderdetailComponent, 
{
data:  {  showview:false,save:false,event,workorderdetailid, workorderid,visiblelist:this.pmsworkorderdetailsvisiblelist,  hidelist:this.pmsworkorderdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsworkorderdetailssource.add(res);
this.pmsworkorderdetailssource.refresh();
}
else
{
this.pmsworkorderdetailssource.update(event.data, res);
}
}
});
}

onDeletepmsworkorderdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsworkorderdetailIDs += childID + ",";
this.pmsworkorderservice.pmsworkorderdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes pmsworkorderdetails
pmsworkorderdetailssettings:any;
pmsworkorderdetailssource: any;

showpmsworkorderdetailsCheckbox()
{
debugger;
if(this.tblpmsworkorderdetailssource.settings['selectMode']== 'multi')this.tblpmsworkorderdetailssource.settings['selectMode']= 'single';
else
this.tblpmsworkorderdetailssource.settings['selectMode']= 'multi';
this.tblpmsworkorderdetailssource.initGrid();
}
deletepmsworkorderdetailsAll()
{
this.tblpmsworkorderdetailssource.settings['selectMode'] = 'single';
}
showpmsworkorderdetailsFilter()
{
  setTimeout(() => {
  this.SetpmsworkorderdetailsTableddConfig();
  });
      if(this.tblpmsworkorderdetailssource.settings!=null)this.tblpmsworkorderdetailssource.settings['hideSubHeader'] =!this.tblpmsworkorderdetailssource.settings['hideSubHeader'];
this.tblpmsworkorderdetailssource.initGrid();
}
showpmsworkorderdetailsInActive()
{
}
enablepmsworkorderdetailsInActive()
{
}
async SetpmsworkorderdetailsTableddConfig()
{
if(!this.bfilterPopulatepmsworkorderdetails){
}
this.bfilterPopulatepmsworkorderdetails=true;
}
async pmsworkorderdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsworkorderdetailsTableConfig()
{
this.pmsworkorderdetailssettings = {
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
propertyid: {
title: 'Property',
type: 'number',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
amounteach: {
title: 'Amount Each',
type: 'number',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
},
};
}
pmsworkorderdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkorderdetailsID)>=0)
{
this.pmsworkorderdetailssource=new LocalDataSource();
this.pmsworkorderdetailssource.load(this.pmsworkorderservice.pmsworkorderdetails as  any as LocalDataSource);
this.pmsworkorderdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkorderdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmsworkorderservice.pmsworkorderdetails.length == 0)
{
    this.tblpmsworkorderdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorderdetail();
    this.pmsworkorderservice.pmsworkorderdetails.push(obj);
    this.pmsworkorderdetailssource.refresh();
    if ((this.pmsworkorderservice.pmsworkorderdetails.length / this.pmsworkorderdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderdetailssource.getPaging().page)
    {
        this.pmsworkorderdetailssource.setPage((this.pmsworkorderservice.pmsworkorderdetails.length / this.pmsworkorderdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsworkorderdetailssource.grid.edit(this.tblpmsworkorderdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsworkorderdetailssource.data.indexOf(event.data);
this.onDeletepmsworkorderdetail(event,event.data.workorderdetailid,((this.pmsworkorderdetailssource.getPaging().page-1) *this.pmsworkorderdetailssource.getPaging().perPage)+index);
this.pmsworkorderdetailssource.refresh();
break;
}
}

*/
pmsworkorderdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsworkorderdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsworkorderdetail(event,event.data.workorderdetailid,this.formid);
break;
case 'delete':
this.onDeletepmsworkorderdetail(event,event.data.workorderdetailid,((this.pmsworkorderdetailssource.getPaging().page-1) *this.pmsworkorderdetailssource.getPaging().perPage)+event.index);
this.pmsworkorderdetailssource.refresh();
break;
}
}
pmsworkorderdetailsonDelete(obj) {
let workorderdetailid=obj.data.workorderdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.pmsworkorderservice.deletepmsworkorder(workorderdetailid).then(res=>
this.pmsworkorderdetailsLoadTable()
);
}
}
pmsworkorderdetailsPaging(val)
{
debugger;
this.pmsworkorderdetailssource.setPaging(1, val, true);
}

handlepmsworkorderdetailsGridSelected(event:any) {
this.pmsworkorderdetailsselectedindex=this.pmsworkorderservice.pmsworkorderdetails.findIndex(i => i.workorderdetailid === event.data.workorderdetailid);
}
IspmsworkorderdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkorderdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsworkorderdetails

}



