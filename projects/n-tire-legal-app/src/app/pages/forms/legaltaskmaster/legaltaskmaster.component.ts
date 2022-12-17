import { legaltaskmasterService } from './../../../service/legaltaskmaster.service';
import { legaltaskmaster } from './../../../model/legaltaskmaster.model';
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
import { legalcase} from './../../../model/legalcase.model';
import { legalcaseComponent } from './../../../pages/forms/legalcase/legalcase.component';
import { legalcaseService } from './../../../service/legalcase.service';
//popups
import { legalcustomermaster} from './../../../model/legalcustomermaster.model';
import { legalcustomermasterComponent } from './../../../pages/forms/legalcustomermaster/legalcustomermaster.component';
import { legalcustomermasterService } from './../../../service/legalcustomermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { legaltaskresponse } from './../../../model/legaltaskresponse.model';
import { legaltaskresponseComponent } from './../../../pages/forms/legaltaskresponse/legaltaskresponse.component';
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
selector: 'app-legaltaskmaster',
templateUrl: './legaltaskmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legaltaskmasterComponent implements OnInit {
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
bfilterPopulatelegaltaskmasters:boolean=false;
datalegaltaskmasterscaseid3:any=[];
datalegaltaskmasterscustomerid3:any=[];
datalegaltaskmasterstaskcategory3:any=[];
datalegaltaskmasterstasktype3:any=[];
datalegaltaskmasterstasksubtype3:any=[];
datalegaltaskmasterspriority3:any=[];
datalegaltaskmastersratetype3:any=[];
datalegaltaskmasterstaskstatus3:any=[];
bfilterPopulatelegaltaskresponses:boolean=false;
@ViewChild('tbllegaltaskresponsessource',{static:false}) tbllegaltaskresponsessource: Ng2SmartTableComponent;
 legaltaskmasterForm: FormGroup;
caseidList: legalcase[];
caseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
caseid_legalcasesForm: FormGroup;//autocomplete
caseid_legalcasesoptions:any;//autocomplete
caseid_legalcasesformatter:any;//autocomplete
customeridList: legalcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_legalcustomermastersForm: FormGroup;//autocomplete
customerid_legalcustomermastersoptions:any;//autocomplete
customerid_legalcustomermastersformatter:any;//autocomplete
taskcategoryList: boconfigvalue[];
tasktypeList: bomasterdata[];
tasksubtypeList: bosubcategorymaster[];
priorityList: boconfigvalue[];
ratetypeList: boconfigvalue[];
taskstatusList: boconfigvalue[];
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
legaltaskmastershowOption:boolean;
legaltaskresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;

ratevisible:boolean = false;


legaltaskresponsesvisiblelist:any;
legaltaskresponseshidelist:any;

DeletedlegaltaskresponseIDs: string="";
legaltaskresponsesID: string = "1";
legaltaskresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legaltaskmasterservice: legaltaskmasterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legalcaseservice:legalcaseService,
private legalcustomermasterservice:legalcustomermasterService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.legaltaskmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
taskid: [null],
caseid: [null, Validators.required],
caseiddesc: [null],
taskdate: [null, Validators.required],
customerid: [null],
customeriddesc: [null],
description: [null, Validators.required],
taskcategory: [null],
taskcategorydesc: [null],
tasktype: [null],
tasktypedesc: [null],
tasksubtype: [null],
tasksubtypedesc: [null],
priority: [null],
prioritydesc: [null],
assignedto: [null],
estimatedhrs: [null],
startdate: [null, Validators.required],
target: [null, Validators.required],
billable: [null],
ratetype: [null],
ratetypedesc: [null],
rate: [null],
taskstatus: [null],
taskstatusdesc: [null],
taskstarted: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legaltaskmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legaltaskmasterForm.dirty && this.legaltaskmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.taskid && pkDetail) {
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
let legaltaskmasterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=legaltaskmasterid;
//this.sharedService.alert(legaltaskmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegaltaskresponsesTableConfig();
  setTimeout(() => {
  this.SetlegaltaskresponsesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legalcaseservice.getlegalcasesList().then(res => 
{
this.caseidList = res as legalcase[];
if(this.legaltaskmasterservice.formData && this.legaltaskmasterservice.formData.caseid){
this.caseidoptionsEvent.emit(this.caseidList);
this.legaltaskmasterForm.patchValue({
    caseid: this.legaltaskmasterservice.formData.caseid,
    caseiddesc: this.legaltaskmasterservice.formData.caseiddesc,
});
}
{
let arrcaseid = this.caseidList.filter(v => v.caseid == this.legaltaskmasterForm.get('caseid').value);
let objcaseid;
if (arrcaseid.length > 0) objcaseid = arrcaseid[0];
if (objcaseid)
{
    this.legaltaskmasterForm.patchValue({ customerid: objcaseid.customerid });
}
}
}
).catch((err) => {console.log(err);});
this.caseid_legalcasesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.caseidList.filter(v => v.casetitle.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.caseid_legalcasesformatter = (result: any) => result.casetitle;
this.legalcustomermasterservice.getlegalcustomermastersList().then(res => 
{
this.customeridList = res as legalcustomermaster[];
if(this.legaltaskmasterservice.formData && this.legaltaskmasterservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.legaltaskmasterForm.patchValue({
    customerid: this.legaltaskmasterservice.formData.customerid,
    customeriddesc: this.legaltaskmasterservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.legaltaskmasterForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_legalcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.customername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_legalcustomermastersformatter = (result: any) => result.customername;
this.configservice.getList("taskcategory").then(res => this.taskcategoryList = res as boconfigvalue[]);
this.bomasterdataservice.getList("c3dek").then(res => {
this.tasktypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.tasktype.value && this.f.tasktype.value!="" && this.f.tasktype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.tasktype.value).then(res =>{
this.tasksubtypeList = res as bosubcategorymaster[];
if(this.legaltaskmasterservice.formData && this.legaltaskmasterservice.formData.tasksubtype){this.legaltaskmasterForm.patchValue({
    tasksubtype: this.legaltaskmasterservice.formData.tasksubtype,
    tasksubtypedesc: this.legaltaskmasterservice.formData.tasksubtypedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("ratetype").then(res => this.ratetypeList = res as boconfigvalue[]);
this.configservice.getList("taskstatus").then(res => this.taskstatusList = res as boconfigvalue[]);

//autocomplete
    this.legaltaskmasterservice.getlegaltaskmastersList().then(res => {
      this.pkList = res as legaltaskmaster[];
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
this.legaltaskmasterForm.markAsUntouched();
this.legaltaskmasterForm.markAsPristine();
}
onSelectedcaseid(caseidDetail: any) {
if (caseidDetail.caseid && caseidDetail) {
this.legaltaskmasterForm.patchValue({
caseid: caseidDetail.caseid,
caseiddesc: caseidDetail.casetitle,

});
this.legaltaskmasterForm.patchValue({customerid:caseidDetail.customerid});

}
}

onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.legaltaskmasterForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.customername,

});

}
}




resetForm() {
if (this.legaltaskmasterForm != null)
this.legaltaskmasterForm.reset();
this.legaltaskmasterForm.patchValue({
});
this.legaltaskmasterForm.patchValue({
taskdate: this.ngbDateParserFormatter.parse(new Date().toString()),
startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
target: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.legaltaskmasterservice.legaltaskresponses=[];
this.legaltaskresponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.ratevisible = false;
}

    onDelete() {
        let taskid = this.legaltaskmasterForm.get('taskid').value;
        if(taskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legaltaskmasterservice.deletelegaltaskmaster(taskid).then(res =>
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
    this.legaltaskmasterForm.patchValue({
        taskid: null
    });
    if(this.legaltaskmasterservice.formData.taskid!=null)this.legaltaskmasterservice.formData.taskid=null;
for (let i=0;i<this.legaltaskmasterservice.legaltaskresponses.length;i++) {
this.legaltaskmasterservice.legaltaskresponses[i].responseid=null;
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
        else if(key=="taskdate")
this.legaltaskmasterForm.patchValue({"taskdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.legaltaskmasterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="startdate")
this.legaltaskmasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="target")
this.legaltaskmasterForm.patchValue({"target":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legaltaskmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legaltaskmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legaltaskmasterForm.controls[key]!=undefined)
{
this.legaltaskmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legaltaskmasterservice.formData.description!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legaltaskmasterservice.formData.description!=null )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
taskidonChange(evt:any){
let e=evt.value;
}
caseidonChange(evt:any){
let e=evt.value;
}
taskdateonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
taskcategoryonChange(evt:any){
let e=this.f.taskcategory.value as any;
this.legaltaskmasterForm.patchValue({taskcategorydesc:evt.options[evt.options.selectedIndex].text});
}
tasktypeonChange(evt:any){
let e=evt.value;
this.legaltaskmasterForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.tasktype.value && this.f.tasktype.value!="" && this.f.tasktype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.tasktype.value).then(res => this.tasksubtypeList = res as bosubcategorymaster[]);
});
}
tasksubtypeonChange(evt:any){
let e=evt.value;
this.legaltaskmasterForm.patchValue({tasksubtypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.legaltaskmasterForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
assignedtoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignedto=res;
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}).catch((err) => {console.log(err);});
}
estimatedhrsonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
targetonChange(evt:any){
let e=evt.value;
}
billableonChange(evt:any){
let e=evt.value;
}
ratetypeonChange(evt:any){
let e=this.f.ratetype.value as any;
this.ratevisible=false;
if(this.f.ratetype.value == 'T')this.ratevisible=true;
this.legaltaskmasterForm.patchValue({ratetypedesc:evt.options[evt.options.selectedIndex].text});
}
rateonChange(evt:any){
let e=evt.value;
}
taskstatusonChange(evt:any){
let e=this.f.taskstatus.value as any;
this.legaltaskmasterForm.patchValue({taskstatusdesc:evt.options[evt.options.selectedIndex].text});
}
taskstartedonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
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
  


editlegaltaskmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legaltaskmasterservice.getlegaltaskmastersByEID(pkcol).then(res => {

this.legaltaskmasterservice.formData=res.legaltaskmaster;
let formproperty=res.legaltaskmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legaltaskmaster.pkcol;
this.formid=res.legaltaskmaster.taskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legaltaskmasterservice.formData=res.legaltaskmaster;
this.formid=res.legaltaskmaster.taskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legaltaskmasterForm.patchValue({
taskid: res.legaltaskmaster.taskid,
caseid: res.legaltaskmaster.caseid,
caseiddesc: res.legaltaskmaster.caseiddesc,
taskdate: this.ngbDateParserFormatter.parse(res.legaltaskmaster.taskdate),
customerid: res.legaltaskmaster.customerid,
customeriddesc: res.legaltaskmaster.customeriddesc,
description: res.legaltaskmaster.description,
taskcategory: res.legaltaskmaster.taskcategory,
taskcategorydesc: res.legaltaskmaster.taskcategorydesc,
tasktype: res.legaltaskmaster.tasktype,
tasktypedesc: res.legaltaskmaster.tasktypedesc,
tasksubtype: res.legaltaskmaster.tasksubtype,
tasksubtypedesc: res.legaltaskmaster.tasksubtypedesc,
priority: res.legaltaskmaster.priority,
prioritydesc: res.legaltaskmaster.prioritydesc,
assignedto: JSON.parse(res.legaltaskmaster.assignedto),
estimatedhrs: res.legaltaskmaster.estimatedhrs,
startdate: this.ngbDateParserFormatter.parse(res.legaltaskmaster.startdate),
target: this.ngbDateParserFormatter.parse(res.legaltaskmaster.target),
billable: res.legaltaskmaster.billable,
ratetype: res.legaltaskmaster.ratetype,
ratetypedesc: res.legaltaskmaster.ratetypedesc,
rate: res.legaltaskmaster.rate,
taskstatus: res.legaltaskmaster.taskstatus,
taskstatusdesc: res.legaltaskmaster.taskstatusdesc,
taskstarted: res.legaltaskmaster.taskstarted,
remarks: res.legaltaskmaster.remarks,
attachment: JSON.parse(res.legaltaskmaster.attachment),
status: res.legaltaskmaster.status,
statusdesc: res.legaltaskmaster.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("rate")>=0)this.ratevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("rate")>=0)this.ratevisible = false;
this.legaltaskresponsesvisiblelist=res.legaltaskresponsesvisiblelist;
if(this.legaltaskmasterForm.get('attachment').value!=null && this.legaltaskmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legaltaskmasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.tasktype.value && this.f.tasktype.value!="" && this.f.tasktype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.tasktype.value).then(res =>{
this.tasksubtypeList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.legaltaskmasterservice.legaltaskresponses = res.legaltaskresponses;
this.SetlegaltaskresponsesTableConfig();
this.legaltaskresponsesLoadTable();
  setTimeout(() => {
  this.SetlegaltaskresponsesTableddConfig();
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
  for (let key in this.legaltaskmasterForm.controls) {
    if (this.legaltaskmasterForm.controls[key] != null) {
if(false)
{
if(this.legaltaskmasterservice.formData!=null && this.legaltaskmasterservice.formData[key]!=null  && this.legaltaskmasterservice.formData[key]!='[]' && this.legaltaskmasterservice.formData[key]!=undefined && this.legaltaskmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legaltaskmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legaltaskmasterservice.formData!=null && this.legaltaskmasterservice.formData[key]!=null   && this.legaltaskmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legaltaskmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legaltaskmasterservice.formData!=null && this.legaltaskmasterservice.formData[key]!=null   && this.legaltaskmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legaltaskmasterservice.formData[key]+"'><div class='progress__number'>"+this.legaltaskmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legaltaskmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legaltaskmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legaltaskmasterForm.value;
obj.taskdate=new Date(this.legaltaskmasterForm.get('taskdate').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('taskdate').value)+'  UTC' :null);
if(this.legaltaskmasterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.legaltaskmasterForm.get('assignedto').value);
obj.startdate=new Date(this.legaltaskmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('startdate').value)+'  UTC' :null);
obj.target=new Date(this.legaltaskmasterForm.get('target').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('target').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private legaltaskmastertoggleOption(){
this.legaltaskmastershowOption = this.legaltaskmastershowOption === true ? false : true;
}

private legaltaskresponsetoggleOption(){
this.legaltaskresponseshowOption = this.legaltaskresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legaltaskmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legaltaskmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legaltaskmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legaltaskmasterservice.formData=this.legaltaskmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legaltaskmasterForm.controls[key] != null)
    {
        this.legaltaskmasterservice.formData[key] = this.legaltaskmasterForm.controls[key].value;
    }
}
}
}
this.legaltaskmasterservice.formData.taskdate=new Date(this.legaltaskmasterForm.get('taskdate').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('taskdate').value)+'  UTC' :null);
if(this.legaltaskmasterForm.get('assignedto').value!=null)this.legaltaskmasterservice.formData.assignedto=JSON.stringify(this.legaltaskmasterForm.get('assignedto').value);
this.legaltaskmasterservice.formData.startdate=new Date(this.legaltaskmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('startdate').value)+'  UTC' :null);
this.legaltaskmasterservice.formData.target=new Date(this.legaltaskmasterForm.get('target').value ? this.ngbDateParserFormatter.format(this.legaltaskmasterForm.get('target').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.legaltaskmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legaltaskmasterservice.formData.DeletedlegaltaskresponseIDs = this.DeletedlegaltaskresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legaltaskmasterservice.formData);
this.legaltaskmasterservice.formData=this.legaltaskmasterForm.value;
this.legaltaskmasterservice.saveOrUpdatelegaltaskmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.legaltaskresponsessource.data)
{
    for (let i = 0; i < this.legaltaskresponsessource.data.length; i++)
    {
        if (this.legaltaskresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legaltaskresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legaltaskmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legaltaskmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legaltaskmaster);
}
else
{
this.FillData(res);
}
}
this.legaltaskmasterForm.markAsUntouched();
this.legaltaskmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcaseid( caseid) {
/*let ScreenType='2';
this.dialog.open(legalcaseComponent, 
{
data: {caseid:this.legaltaskmasterForm.get('caseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(legalcustomermasterComponent, 
{
data: {customerid:this.legaltaskmasterForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittasktype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legaltaskmasterForm.get('tasktype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittasksubtype( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.legaltaskmasterForm.get('tasksubtype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlegaltaskresponse(event:any,responseid:any, taskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legaltaskresponseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,responseid, taskid,visiblelist:this.legaltaskresponsesvisiblelist,  hidelist:this.legaltaskresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legaltaskresponsessource.add(res);
this.legaltaskresponsessource.refresh();
}
else
{
this.legaltaskresponsessource.update(event.data, res);
}
}
});
}

onDeletelegaltaskresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegaltaskresponseIDs += childID + ",";
this.legaltaskmasterservice.legaltaskresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legaltaskresponses
legaltaskresponsessettings:any;
legaltaskresponsessource: any;

showlegaltaskresponsesCheckbox()
{
debugger;
if(this.tbllegaltaskresponsessource.settings['selectMode']== 'multi')this.tbllegaltaskresponsessource.settings['selectMode']= 'single';
else
this.tbllegaltaskresponsessource.settings['selectMode']= 'multi';
this.tbllegaltaskresponsessource.initGrid();
}
deletelegaltaskresponsesAll()
{
this.tbllegaltaskresponsessource.settings['selectMode'] = 'single';
}
showlegaltaskresponsesFilter()
{
  setTimeout(() => {
  this.SetlegaltaskresponsesTableddConfig();
  });
      if(this.tbllegaltaskresponsessource.settings!=null)this.tbllegaltaskresponsessource.settings['hideSubHeader'] =!this.tbllegaltaskresponsessource.settings['hideSubHeader'];
this.tbllegaltaskresponsessource.initGrid();
}
showlegaltaskresponsesInActive()
{
}
enablelegaltaskresponsesInActive()
{
}
async SetlegaltaskresponsesTableddConfig()
{
if(!this.bfilterPopulatelegaltaskresponses){
}
this.bfilterPopulatelegaltaskresponses=true;
}
async legaltaskresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegaltaskresponsesTableConfig()
{
this.legaltaskresponsessettings = {
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
workdate: {
title: 'Work Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
hoursspent: {
title: 'Hours Spent',
type: '',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
cost: {
title: 'Cost',
type: '',
filter:true,
},
nextactiondate: {
title: 'Next Action Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
legaltaskresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legaltaskresponsesID)>=0)
{
this.legaltaskresponsessource=new LocalDataSource();
this.legaltaskresponsessource.load(this.legaltaskmasterservice.legaltaskresponses as  any as LocalDataSource);
this.legaltaskresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legaltaskresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legaltaskmasterservice.legaltaskresponses.length == 0)
{
    this.tbllegaltaskresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new legaltaskresponse();
    this.legaltaskmasterservice.legaltaskresponses.push(obj);
    this.legaltaskresponsessource.refresh();
    if ((this.legaltaskmasterservice.legaltaskresponses.length / this.legaltaskresponsessource.getPaging().perPage).toFixed(0) + 1 != this.legaltaskresponsessource.getPaging().page)
    {
        this.legaltaskresponsessource.setPage((this.legaltaskmasterservice.legaltaskresponses.length / this.legaltaskresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegaltaskresponsessource.grid.edit(this.tbllegaltaskresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legaltaskresponsessource.data.indexOf(event.data);
this.onDeletelegaltaskresponse(event,event.data.responseid,((this.legaltaskresponsessource.getPaging().page-1) *this.legaltaskresponsessource.getPaging().perPage)+index);
this.legaltaskresponsessource.refresh();
break;
}
}

*/
legaltaskresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegaltaskresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegaltaskresponse(event,event.data.responseid,this.formid);
break;
case 'delete':
this.onDeletelegaltaskresponse(event,event.data.responseid,((this.legaltaskresponsessource.getPaging().page-1) *this.legaltaskresponsessource.getPaging().perPage)+event.index);
this.legaltaskresponsessource.refresh();
break;
}
}
legaltaskresponsesonDelete(obj) {
let responseid=obj.data.responseid;
if (confirm('Are you sure to delete this record ?')) {
this.legaltaskmasterservice.deletelegaltaskmaster(responseid).then(res=>
this.legaltaskresponsesLoadTable()
);
}
}
legaltaskresponsesPaging(val)
{
debugger;
this.legaltaskresponsessource.setPaging(1, val, true);
}

handlelegaltaskresponsesGridSelected(event:any) {
this.legaltaskresponsesselectedindex=this.legaltaskmasterservice.legaltaskresponses.findIndex(i => i.responseid === event.data.responseid);
}
IslegaltaskresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legaltaskresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legaltaskresponses

}



