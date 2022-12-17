import { prjprojecttaskService } from './../../../service/prjprojecttask.service';
import { prjprojecttask } from './../../../model/prjprojecttask.model';
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

//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { bofact } from '../../../../../../n-tire-bo-app/src/app/model/bofact.model';
import { bofactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bofact/bofact.component';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-prjprojecttask',
templateUrl: './prjprojecttask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojecttaskComponent implements OnInit {
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
bfilterPopulateprjprojecttasks:boolean=false;
dataprjprojecttasksworkdoneby3:any=[];
dataprjprojecttaskspriority3:any=[];
dataprjprojecttaskscomplexity3:any=[];
dataprjprojecttaskstaskcategory3:any=[];
dataprjprojecttaskstasktype3:any=[];
dataprjprojecttaskscolorcode3:any=[];
dataprjprojecttaskstaskstatus3:any=[];
bfilterPopulatebofacts:boolean=false;
@ViewChild('tblbofactssource',{static:false}) tblbofactssource: Ng2SmartTableComponent;
 prjprojecttaskForm: FormGroup;
workdonebyList: bousermaster[];
workdonebyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workdoneby_bousermastersForm: FormGroup;//autocomplete
workdoneby_bousermastersoptions:any;//autocomplete
workdoneby_bousermastersformatter:any;//autocomplete
priorityList: boconfigvalue[];
complexityList: boconfigvalue[];
taskcategoryList: boconfigvalue[];
tasktypeList: boconfigvalue[];
colorcodeList: boconfigvalue[];
taskstatusList: boconfigvalue[];
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
SESSIONUSERID:any;//current user
prjprojecttaskshowOption:boolean;
bofactshowOption:boolean;
sessiondata:any;
sourcekey:any;



bofactsvisiblelist:any;
bofactshidelist:any;

DeletedbofactIDs: string="";
bofactsID: string = "1";
bofactsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjprojecttaskservice: prjprojecttaskService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.prjprojecttaskForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
deliverableid: [null],
departmentid: [null],
taskid: [null],
taskcode: [null],
taskname: [null],
storypoints: [null],
feedbacktags: [null],
details: [null],
issues: [null],
milestone: [null],
startdate: [null],
enddate: [null],
assignedto: [null],
workdoneby: [null],
workdonebydesc: [null],
priority: [null],
prioritydesc: [null],
complexity: [null],
complexitydesc: [null],
taskcategory: [null],
taskcategorydesc: [null],
tasktype: [null],
tasktypedesc: [null],
activitytype: [null],
isbillable: [null],
colorcode: [null],
colorcodedesc: [null],
parenttasks: [null],
dependenttasks: [null],
taskstatus: [null],
taskstatusdesc: [null],
actualworkdone: [null],
actualstartdate: [null],
actualenddate: [null],
estimatedpercentage: [null],
completionpercentage: [null],
estimatedeffort: [null],
actualeffort: [null],
utilizationpercentage: [null],
labourbudget: [null],
labouractual: [null],
predecessor: [null],
sequence: [null],
feedbacknotes: [null],
notes: [null],
draft: [null],
outputid: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
deliverablenotes: [null],
});
}

get f() { return this.prjprojecttaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojecttaskForm.dirty && this.prjprojecttaskForm.touched ) {
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
let prjprojecttaskid = null;

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
this.formid=prjprojecttaskid;
//this.sharedService.alert(prjprojecttaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbofactsTableConfig();
  setTimeout(() => {
  this.SetbofactsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.workdonebyList = res as bousermaster[];
if(this.prjprojecttaskservice.formData && this.prjprojecttaskservice.formData.workdoneby){
this.workdonebyoptionsEvent.emit(this.workdonebyList);
this.prjprojecttaskForm.patchValue({
    workdoneby: this.prjprojecttaskservice.formData.workdoneby,
    workdonebydesc: this.prjprojecttaskservice.formData.workdonebydesc,
});
}
{
let arrworkdoneby = this.workdonebyList.filter(v => v.userid == this.prjprojecttaskForm.get('workdoneby').value);
let objworkdoneby;
if (arrworkdoneby.length > 0) objworkdoneby = arrworkdoneby[0];
if (objworkdoneby)
{
}
}
}
).catch((err) => {console.log(err);});
this.workdoneby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workdonebyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workdoneby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("complexity").then(res => this.complexityList = res as boconfigvalue[]);
this.configservice.getList("taskcategory").then(res => this.taskcategoryList = res as boconfigvalue[]);
this.configservice.getList("tasktype").then(res => this.tasktypeList = res as boconfigvalue[]);
this.configservice.getList("colorcode").then(res => this.colorcodeList = res as boconfigvalue[]);
this.configservice.getList("taskstatus").then(res => this.taskstatusList = res as boconfigvalue[]);

//autocomplete
    this.prjprojecttaskservice.getprjprojecttasksList().then(res => {
      this.pkList = res as prjprojecttask[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.taskname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.taskname;

//setting the flag that the screen is not touched 
this.prjprojecttaskForm.markAsUntouched();
this.prjprojecttaskForm.markAsPristine();
}
onSelectedworkdoneby(workdonebyDetail: any) {
if (workdonebyDetail.userid && workdonebyDetail) {
this.prjprojecttaskForm.patchValue({
workdoneby: workdonebyDetail.userid,
workdonebydesc: workdonebyDetail.username,

});

}
}




resetForm() {
if (this.prjprojecttaskForm != null)
this.prjprojecttaskForm.reset();
this.prjprojecttaskForm.patchValue({
workdoneby: this.sessiondata.userid,
workdonebydesc: this.sessiondata.username,
});
setTimeout(() => {
this.prjprojecttaskservice.bofacts=[];
this.bofactsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taskid = this.prjprojecttaskForm.get('taskid').value;
        if(taskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojecttaskservice.deleteprjprojecttask(taskid).then(res =>
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
    this.prjprojecttaskForm.patchValue({
        taskid: null
    });
    if(this.prjprojecttaskservice.formData.taskid!=null)this.prjprojecttaskservice.formData.taskid=null;
for (let i=0;i<this.prjprojecttaskservice.bofacts.length;i++) {
this.prjprojecttaskservice.bofacts[i].factid=null;
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
        else if(key=="startdate")
this.prjprojecttaskForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.prjprojecttaskForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.prjprojecttaskForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="actualstartdate")
this.prjprojecttaskForm.patchValue({"actualstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualenddate")
this.prjprojecttaskForm.patchValue({"actualenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.prjprojecttaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojecttaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojecttaskForm.controls[key]!=undefined)
{
this.prjprojecttaskForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojecttasks",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.prjprojecttaskservice.formData.taskname!=null )
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
projectidonChange(evt:any){
let e=evt.value;
}

departmentidonChange(evt:any){
let e=evt.value;
}
taskidonChange(evt:any){
let e=evt.value;
}
taskcodeonChange(evt:any){
let e=evt.value;
}
tasknameonChange(evt:any){
let e=evt.value;
}
storypointsonChange(evt:any){
let e=evt.value;
}
feedbacktagsonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
issuesonChange(evt:any){
let e=evt.value;
}
milestoneonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
}
workdonebyonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.prjprojecttaskForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
complexityonChange(evt:any){
let e=this.f.complexity.value as any;
this.prjprojecttaskForm.patchValue({complexitydesc:evt.options[evt.options.selectedIndex].text});
}
taskcategoryonChange(evt:any){
let e=this.f.taskcategory.value as any;
this.prjprojecttaskForm.patchValue({taskcategorydesc:evt.options[evt.options.selectedIndex].text});
}
tasktypeonChange(evt:any){
let e=this.f.tasktype.value as any;
this.prjprojecttaskForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
activitytypeonChange(evt:any){
let e=evt.value;
}
isbillableonChange(evt:any){
let e=evt.value;
}
colorcodeonChange(evt:any){
let e=this.f.colorcode.value as any;
this.prjprojecttaskForm.patchValue({colorcodedesc:evt.options[evt.options.selectedIndex].text});
}
parenttasksonChange(evt:any){
let e=evt.value;
}
dependenttasksonChange(evt:any){
let e=evt.value;
}
taskstatusonChange(evt:any){
let e=this.f.taskstatus.value as any;
this.prjprojecttaskForm.patchValue({taskstatusdesc:evt.options[evt.options.selectedIndex].text});
}
actualworkdoneonChange(evt:any){
let e=evt.value;
}
actualstartdateonChange(evt:any){
let e=evt.value;
}
actualenddateonChange(evt:any){
let e=evt.value;
}
estimatedpercentageonChange(evt:any){
let e=evt.value;
}
completionpercentageonChange(evt:any){
let e=evt.value;
}
estimatedeffortonChange(evt:any){
let e=evt.value;
}
actualeffortonChange(evt:any){
let e=evt.value;
}
utilizationpercentageonChange(evt:any){
let e=evt.value;
}
labourbudgetonChange(evt:any){
let e=evt.value;
}
labouractualonChange(evt:any){
let e=evt.value;
}
predecessoronChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
feedbacknotesonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
draftonChange(evt:any){
let e=evt.value;
}
outputidonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
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
  


editprjprojecttasks() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojecttaskservice.getprjprojecttasksByEID(pkcol).then(res => {

this.prjprojecttaskservice.formData=res.prjprojecttask;
let formproperty=res.prjprojecttask.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojecttask.pkcol;
this.formid=res.prjprojecttask.taskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojecttask.taskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojecttaskForm.patchValue({
projectid: res.prjprojecttask.projectid,
deliverableid: res.prjprojecttask.deliverableid,
departmentid: res.prjprojecttask.departmentid,
taskid: res.prjprojecttask.taskid,
taskcode: res.prjprojecttask.taskcode,
taskname: res.prjprojecttask.taskname,
storypoints: res.prjprojecttask.storypoints,
feedbacktags: res.prjprojecttask.feedbacktags,
details: res.prjprojecttask.details,
issues: res.prjprojecttask.issues,
milestone: res.prjprojecttask.milestone,
startdate: this.ngbDateParserFormatter.parse(res.prjprojecttask.startdate),
enddate: this.ngbDateParserFormatter.parse(res.prjprojecttask.enddate),
assignedto: JSON.parse(res.prjprojecttask.assignedto),
workdoneby: res.prjprojecttask.workdoneby,
workdonebydesc: res.prjprojecttask.workdonebydesc,
priority: res.prjprojecttask.priority,
prioritydesc: res.prjprojecttask.prioritydesc,
complexity: res.prjprojecttask.complexity,
complexitydesc: res.prjprojecttask.complexitydesc,
taskcategory: res.prjprojecttask.taskcategory,
taskcategorydesc: res.prjprojecttask.taskcategorydesc,
tasktype: res.prjprojecttask.tasktype,
tasktypedesc: res.prjprojecttask.tasktypedesc,
activitytype: res.prjprojecttask.activitytype,
isbillable: res.prjprojecttask.isbillable,
colorcode: res.prjprojecttask.colorcode,
colorcodedesc: res.prjprojecttask.colorcodedesc,
parenttasks: res.prjprojecttask.parenttasks,
dependenttasks: res.prjprojecttask.dependenttasks,
taskstatus: res.prjprojecttask.taskstatus,
taskstatusdesc: res.prjprojecttask.taskstatusdesc,
actualworkdone: res.prjprojecttask.actualworkdone,
actualstartdate: this.ngbDateParserFormatter.parse(res.prjprojecttask.actualstartdate),
actualenddate: this.ngbDateParserFormatter.parse(res.prjprojecttask.actualenddate),
estimatedpercentage: res.prjprojecttask.estimatedpercentage,
completionpercentage: res.prjprojecttask.completionpercentage,
estimatedeffort: res.prjprojecttask.estimatedeffort,
actualeffort: res.prjprojecttask.actualeffort,
utilizationpercentage: res.prjprojecttask.utilizationpercentage,
labourbudget: res.prjprojecttask.labourbudget,
labouractual: res.prjprojecttask.labouractual,
predecessor: res.prjprojecttask.predecessor,
sequence: res.prjprojecttask.sequence,
feedbacknotes: res.prjprojecttask.feedbacknotes,
notes: res.prjprojecttask.notes,
draft: res.prjprojecttask.draft,
outputid: res.prjprojecttask.outputid,
customfield: res.prjprojecttask.customfield,
attachment: JSON.parse(res.prjprojecttask.attachment),
status: res.prjprojecttask.status,
statusdesc: res.prjprojecttask.statusdesc,
});
this.bofactsvisiblelist=res.bofactsvisiblelist;
if(this.prjprojecttaskForm.get('customfield').value!=null && this.prjprojecttaskForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojecttaskForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojecttaskForm.get('attachment').value!=null && this.prjprojecttaskForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojecttaskForm.get('attachment').value);
//Child Tables if any
this.prjprojecttaskservice.bofacts = res.bofacts;
this.SetbofactsTableConfig();
this.bofactsLoadTable();
  setTimeout(() => {
  this.SetbofactsTableddConfig();
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
  for (let key in this.prjprojecttaskForm.controls) {
    if (this.prjprojecttaskForm.controls[key] != null) {
if(false)
{
if(this.prjprojecttaskservice.formData!=null && this.prjprojecttaskservice.formData[key]!=null  && this.prjprojecttaskservice.formData[key]!='[]' && this.prjprojecttaskservice.formData[key]!=undefined && this.prjprojecttaskservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojecttaskservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojecttaskservice.formData!=null && this.prjprojecttaskservice.formData[key]!=null   && this.prjprojecttaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojecttaskservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojecttaskservice.formData!=null && this.prjprojecttaskservice.formData[key]!=null   && this.prjprojecttaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojecttaskservice.formData[key]+"'><div class='progress__number'>"+this.prjprojecttaskservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojecttaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojecttaskForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojecttaskForm.value;
obj.startdate=new Date(this.prjprojecttaskForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.prjprojecttaskForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('enddate').value)+'  UTC' :null);
if(this.prjprojecttaskForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.prjprojecttaskForm.get('assignedto').value);
obj.actualstartdate=new Date(this.prjprojecttaskForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('actualstartdate').value)+'  UTC' :null);
obj.actualenddate=new Date(this.prjprojecttaskForm.get('actualenddate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('actualenddate').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
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

private prjprojecttasktoggleOption(){
this.prjprojecttaskshowOption = this.prjprojecttaskshowOption === true ? false : true;
}

private bofacttoggleOption(){
this.bofactshowOption = this.bofactshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojecttaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojecttaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojecttaskForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojecttaskservice.formData=this.prjprojecttaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojecttaskForm.controls[key] != null)
    {
        this.prjprojecttaskservice.formData[key] = this.prjprojecttaskForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.prjprojecttaskservice.formData.startdate=new Date(this.prjprojecttaskForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('startdate').value)+'  UTC' :null);
this.prjprojecttaskservice.formData.enddate=new Date(this.prjprojecttaskForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('enddate').value)+'  UTC' :null);
if(this.prjprojecttaskForm.get('assignedto').value!=null)this.prjprojecttaskservice.formData.assignedto=JSON.stringify(this.prjprojecttaskForm.get('assignedto').value);
this.prjprojecttaskservice.formData.actualstartdate=new Date(this.prjprojecttaskForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('actualstartdate').value)+'  UTC' :null);
this.prjprojecttaskservice.formData.actualenddate=new Date(this.prjprojecttaskForm.get('actualenddate').value ? this.ngbDateParserFormatter.format(this.prjprojecttaskForm.get('actualenddate').value)+'  UTC' :null);
if(customfields!=null)this.prjprojecttaskservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojecttaskservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.prjprojecttaskservice.formData.DeletedbofactIDs = this.DeletedbofactIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojecttaskservice.formData);
this.prjprojecttaskservice.formData=this.prjprojecttaskForm.value;
this.prjprojecttaskservice.saveOrUpdateprjprojecttasks().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bofactssource.data)
{
    for (let i = 0; i < this.bofactssource.data.length; i++)
    {
        if (this.bofactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bofactssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojecttask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojecttaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojecttask);
}
else
{
this.FillData(res);
}
}
this.prjprojecttaskForm.markAsUntouched();
this.prjprojecttaskForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkdoneby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojecttaskForm.get('workdoneby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbofact(event:any,factid:any, taskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bofactComponent, 
{
data:  {  showview:false,save:false,event,factid, taskid,visiblelist:this.bofactsvisiblelist,  hidelist:this.bofactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bofactssource.add(res);
this.bofactssource.refresh();
}
else
{
this.bofactssource.update(event.data, res);
}
}
});
}

onDeletebofact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbofactIDs += childID + ",";
this.prjprojecttaskservice.bofacts.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bofacts
bofactssettings:any;
bofactssource: any;

showbofactsCheckbox()
{
debugger;
if(this.tblbofactssource.settings['selectMode']== 'multi')this.tblbofactssource.settings['selectMode']= 'single';
else
this.tblbofactssource.settings['selectMode']= 'multi';
this.tblbofactssource.initGrid();
}
deletebofactsAll()
{
this.tblbofactssource.settings['selectMode'] = 'single';
}
showbofactsFilter()
{
  setTimeout(() => {
  this.SetbofactsTableddConfig();
  });
      if(this.tblbofactssource.settings!=null)this.tblbofactssource.settings['hideSubHeader'] =!this.tblbofactssource.settings['hideSubHeader'];
this.tblbofactssource.initGrid();
}
showbofactsInActive()
{
}
enablebofactsInActive()
{
}
async SetbofactsTableddConfig()
{
if(!this.bfilterPopulatebofacts){
}
this.bfilterPopulatebofacts=true;
}
async bofactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbofactsTableConfig()
{
this.bofactssettings = {
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
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
feedback: {
title: 'Feedback',
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
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
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
bofactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofactsID)>=0)
{
this.bofactssource=new LocalDataSource();
this.bofactssource.load(this.prjprojecttaskservice.bofacts as  any as LocalDataSource);
this.bofactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bofactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojecttaskservice.bofacts.length == 0)
{
    this.tblbofactssource.grid.createFormShown = true;
}
else
{
    let obj = new bofact();
    this.prjprojecttaskservice.bofacts.push(obj);
    this.bofactssource.refresh();
    if ((this.prjprojecttaskservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1 != this.bofactssource.getPaging().page)
    {
        this.bofactssource.setPage((this.prjprojecttaskservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbofactssource.grid.edit(this.tblbofactssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bofactssource.data.indexOf(event.data);
this.onDeletebofact(event,event.data.factid,((this.bofactssource.getPaging().page-1) *this.bofactssource.getPaging().perPage)+index);
this.bofactssource.refresh();
break;
}
}

*/
bofactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbofact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbofact(event,event.data.factid,this.formid);
break;
case 'delete':
this.onDeletebofact(event,event.data.factid,((this.bofactssource.getPaging().page-1) *this.bofactssource.getPaging().perPage)+event.index);
this.bofactssource.refresh();
break;
}
}
bofactsonDelete(obj) {
let factid=obj.data.factid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojecttaskservice.deleteprjprojecttask(factid).then(res=>
this.bofactsLoadTable()
);
}
}
bofactsPaging(val)
{
debugger;
this.bofactssource.setPaging(1, val, true);
}

handlebofactsGridSelected(event:any) {
this.bofactsselectedindex=this.prjprojecttaskservice.bofacts.findIndex(i => i.factid === event.data.factid);
}
IsbofactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bofacts

}



