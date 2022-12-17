import { hrmsholidayworkrequestService } from './../../../service/hrmsholidayworkrequest.service';
import { hrmsholidayworkrequest } from './../../../model/hrmsholidayworkrequest.model';
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
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
//detail table services
import { hrmscoffrequest } from './../../../model/hrmscoffrequest.model';
import { hrmscoffrequestComponent } from './../../../pages/forms/hrmscoffrequest/hrmscoffrequest.component';
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
selector: 'app-hrmsholidayworkrequest',
templateUrl: './hrmsholidayworkrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsholidayworkrequestComponent implements OnInit {
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
bfilterPopulatehrmsholidayworkrequests:boolean=false;
datahrmsholidayworkrequestsemployeeid3:any=[];
datahrmscoffrequestsemployeeid3:any=[];
bfilterPopulatehrmscoffrequests:boolean=false;
@ViewChild('tblhrmscoffrequestssource',{static:false}) tblhrmscoffrequestssource: Ng2SmartTableComponent;
 hrmsholidayworkrequestForm: FormGroup;
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
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
hrmsholidayworkrequestshowOption:boolean;
hrmscoffrequestshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmscoffrequestsvisiblelist:any;
hrmscoffrequestshidelist:any;

DeletedhrmscoffrequestIDs: string="";
hrmscoffrequestsID: string = "1";
hrmscoffrequestsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsholidayworkrequestservice: hrmsholidayworkrequestService,
private hrmsemployeeservice: hrmsemployeeService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.hrmsholidayworkrequestForm  = this.fb.group({
pk:[null],
ImageName: [null],
workrequestid: [null],
reference: [null],
employeeid: [null],
employeeiddesc: [null],
requestdate: [null],
reason: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsholidayworkrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsholidayworkrequestForm.dirty && this.hrmsholidayworkrequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workrequestid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workrequestid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workrequestid && pkDetail) {
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
let hrmsholidayworkrequestid = null;

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
this.formid=hrmsholidayworkrequestid;
//this.sharedService.alert(hrmsholidayworkrequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmscoffrequestsTableConfig();
  setTimeout(() => {
  this.SethrmscoffrequestsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsholidayworkrequestservice.formData && this.hrmsholidayworkrequestservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsholidayworkrequestForm.patchValue({
    employeeid: this.hrmsholidayworkrequestservice.formData.employeeid,
    employeeiddesc: this.hrmsholidayworkrequestservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsholidayworkrequestForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
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

//autocomplete
    this.hrmsholidayworkrequestservice.gethrmsholidayworkrequestsList().then(res => {
      this.pkList = res as hrmsholidayworkrequest[];
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
this.hrmsholidayworkrequestForm.markAsUntouched();
this.hrmsholidayworkrequestForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsholidayworkrequestForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsholidayworkrequestForm != null)
this.hrmsholidayworkrequestForm.reset();
this.hrmsholidayworkrequestForm.patchValue({
});
setTimeout(() => {
this.hrmsholidayworkrequestservice.hrmscoffrequests=[];
this.hrmscoffrequestsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let workrequestid = this.hrmsholidayworkrequestForm.get('workrequestid').value;
        if(workrequestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsholidayworkrequestservice.deletehrmsholidayworkrequest(workrequestid).then(res =>
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
    this.hrmsholidayworkrequestForm.patchValue({
        workrequestid: null
    });
    if(this.hrmsholidayworkrequestservice.formData.workrequestid!=null)this.hrmsholidayworkrequestservice.formData.workrequestid=null;
for (let i=0;i<this.hrmsholidayworkrequestservice.hrmscoffrequests.length;i++) {
this.hrmsholidayworkrequestservice.hrmscoffrequests[i].coffid=null;
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
        else if(key=="requestdate")
this.hrmsholidayworkrequestForm.patchValue({"requestdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsholidayworkrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsholidayworkrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsholidayworkrequestForm.controls[key]!=undefined)
{
this.hrmsholidayworkrequestForm.controls[key].disable({onlySelf: true});
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
workrequestidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
requestdateonChange(evt:any){
let e=evt.value;
}
reasononChange(evt:any){
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
  


edithrmsholidayworkrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsholidayworkrequestservice.gethrmsholidayworkrequestsByEID(pkcol).then(res => {

this.hrmsholidayworkrequestservice.formData=res.hrmsholidayworkrequest;
let formproperty=res.hrmsholidayworkrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsholidayworkrequest.pkcol;
this.formid=res.hrmsholidayworkrequest.workrequestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsholidayworkrequest.workrequestid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsholidayworkrequestForm.patchValue({
workrequestid: res.hrmsholidayworkrequest.workrequestid,
reference: res.hrmsholidayworkrequest.reference,
employeeid: res.hrmsholidayworkrequest.employeeid,
employeeiddesc: res.hrmsholidayworkrequest.employeeiddesc,
requestdate: this.ngbDateParserFormatter.parse(res.hrmsholidayworkrequest.requestdate),
reason: res.hrmsholidayworkrequest.reason,
attachment: JSON.parse(res.hrmsholidayworkrequest.attachment),
status: res.hrmsholidayworkrequest.status,
statusdesc: res.hrmsholidayworkrequest.statusdesc,
});
this.hrmscoffrequestsvisiblelist=res.hrmscoffrequestsvisiblelist;
if(this.hrmsholidayworkrequestForm.get('attachment').value!=null && this.hrmsholidayworkrequestForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsholidayworkrequestForm.get('attachment').value);
//Child Tables if any
this.hrmsholidayworkrequestservice.hrmscoffrequests = res.hrmscoffrequests;
this.SethrmscoffrequestsTableConfig();
this.hrmscoffrequestsLoadTable();
  setTimeout(() => {
  this.SethrmscoffrequestsTableddConfig();
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
  for (let key in this.hrmsholidayworkrequestForm.controls) {
    if (this.hrmsholidayworkrequestForm.controls[key] != null) {
if(false)
{
if(this.hrmsholidayworkrequestservice.formData!=null && this.hrmsholidayworkrequestservice.formData[key]!=null  && this.hrmsholidayworkrequestservice.formData[key]!='[]' && this.hrmsholidayworkrequestservice.formData[key]!=undefined && this.hrmsholidayworkrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsholidayworkrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsholidayworkrequestservice.formData!=null && this.hrmsholidayworkrequestservice.formData[key]!=null   && this.hrmsholidayworkrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsholidayworkrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsholidayworkrequestservice.formData!=null && this.hrmsholidayworkrequestservice.formData[key]!=null   && this.hrmsholidayworkrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsholidayworkrequestservice.formData[key]+"'><div class='progress__number'>"+this.hrmsholidayworkrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsholidayworkrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsholidayworkrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsholidayworkrequestForm.value;
obj.requestdate=new Date(this.hrmsholidayworkrequestForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.hrmsholidayworkrequestForm.get('requestdate').value)+'  UTC' :null);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private hrmsholidayworkrequesttoggleOption(){
this.hrmsholidayworkrequestshowOption = this.hrmsholidayworkrequestshowOption === true ? false : true;
}

private hrmscoffrequesttoggleOption(){
this.hrmscoffrequestshowOption = this.hrmscoffrequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsholidayworkrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsholidayworkrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsholidayworkrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsholidayworkrequestservice.formData=this.hrmsholidayworkrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsholidayworkrequestForm.controls[key] != null)
    {
        this.hrmsholidayworkrequestservice.formData[key] = this.hrmsholidayworkrequestForm.controls[key].value;
    }
}
}
}
this.hrmsholidayworkrequestservice.formData.requestdate=new Date(this.hrmsholidayworkrequestForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.hrmsholidayworkrequestForm.get('requestdate').value)+'  UTC' :null);
this.hrmsholidayworkrequestservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmsholidayworkrequestservice.formData.DeletedhrmscoffrequestIDs = this.DeletedhrmscoffrequestIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsholidayworkrequestservice.formData);
this.hrmsholidayworkrequestservice.formData=this.hrmsholidayworkrequestForm.value;
this.hrmsholidayworkrequestservice.saveOrUpdatehrmsholidayworkrequests().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmscoffrequestssource.data)
{
    for (let i = 0; i < this.hrmscoffrequestssource.data.length; i++)
    {
        if (this.hrmscoffrequestssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmscoffrequestssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsholidayworkrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsholidayworkrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsholidayworkrequest);
}
else
{
this.FillData(res);
}
}
this.hrmsholidayworkrequestForm.markAsUntouched();
this.hrmsholidayworkrequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsholidayworkrequestForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmscoffrequest(event:any,coffid:any, workrequestid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmscoffrequestComponent, 
{
data:  {  showview:false,save:false,event,coffid, workrequestid,visiblelist:this.hrmscoffrequestsvisiblelist,  hidelist:this.hrmscoffrequestshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmscoffrequestssource.add(res);
this.hrmscoffrequestssource.refresh();
}
else
{
this.hrmscoffrequestssource.update(event.data, res);
}
}
});
}

onDeletehrmscoffrequest(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmscoffrequestIDs += childID + ",";
this.hrmsholidayworkrequestservice.hrmscoffrequests.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmscoffrequests
hrmscoffrequestssettings:any;
hrmscoffrequestssource: any;

showhrmscoffrequestsCheckbox()
{
debugger;
if(this.tblhrmscoffrequestssource.settings['selectMode']== 'multi')this.tblhrmscoffrequestssource.settings['selectMode']= 'single';
else
this.tblhrmscoffrequestssource.settings['selectMode']= 'multi';
this.tblhrmscoffrequestssource.initGrid();
}
deletehrmscoffrequestsAll()
{
this.tblhrmscoffrequestssource.settings['selectMode'] = 'single';
}
showhrmscoffrequestsFilter()
{
  setTimeout(() => {
  this.SethrmscoffrequestsTableddConfig();
  });
      if(this.tblhrmscoffrequestssource.settings!=null)this.tblhrmscoffrequestssource.settings['hideSubHeader'] =!this.tblhrmscoffrequestssource.settings['hideSubHeader'];
this.tblhrmscoffrequestssource.initGrid();
}
showhrmscoffrequestsInActive()
{
}
enablehrmscoffrequestsInActive()
{
}
async SethrmscoffrequestsTableddConfig()
{
if(!this.bfilterPopulatehrmscoffrequests){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmscoffrequestsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmscoffrequestsemployeeid3.push(obj);
}
if((this.tblhrmscoffrequestssource.settings as any).columns['employeeid'])
{
(this.tblhrmscoffrequestssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmscoffrequestsemployeeid3));
this.tblhrmscoffrequestssource.initGrid();
}
});
}
this.bfilterPopulatehrmscoffrequests=true;
}
async hrmscoffrequestsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmscoffrequestsTableConfig()
{
this.hrmscoffrequestssettings = {
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
coffreference: {
title: 'C O F F Reference',
type: '',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmscoffrequestsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
coffdate: {
title: 'C O F F Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reason: {
title: 'Reason',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
hrmscoffrequestsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmscoffrequestsID)>=0)
{
this.hrmscoffrequestssource=new LocalDataSource();
this.hrmscoffrequestssource.load(this.hrmsholidayworkrequestservice.hrmscoffrequests as  any as LocalDataSource);
this.hrmscoffrequestssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmscoffrequestsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsholidayworkrequestservice.hrmscoffrequests.length == 0)
{
    this.tblhrmscoffrequestssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmscoffrequest();
    this.hrmsholidayworkrequestservice.hrmscoffrequests.push(obj);
    this.hrmscoffrequestssource.refresh();
    if ((this.hrmsholidayworkrequestservice.hrmscoffrequests.length / this.hrmscoffrequestssource.getPaging().perPage).toFixed(0) + 1 != this.hrmscoffrequestssource.getPaging().page)
    {
        this.hrmscoffrequestssource.setPage((this.hrmsholidayworkrequestservice.hrmscoffrequests.length / this.hrmscoffrequestssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmscoffrequestssource.grid.edit(this.tblhrmscoffrequestssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmscoffrequestssource.data.indexOf(event.data);
this.onDeletehrmscoffrequest(event,event.data.coffid,((this.hrmscoffrequestssource.getPaging().page-1) *this.hrmscoffrequestssource.getPaging().perPage)+index);
this.hrmscoffrequestssource.refresh();
}
break;
}
}

*/
hrmscoffrequestsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmscoffrequest(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmscoffrequest(event,event.data.coffid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletehrmscoffrequest(event,event.data.coffid,((this.hrmscoffrequestssource.getPaging().page-1) *this.hrmscoffrequestssource.getPaging().perPage)+event.index);
this.hrmscoffrequestssource.refresh();
}
break;
}
}
hrmscoffrequestsonDelete(obj) {
let coffid=obj.data.coffid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsholidayworkrequestservice.deletehrmsholidayworkrequest(coffid).then(res=>
this.hrmscoffrequestsLoadTable()
);
}
}
hrmscoffrequestsPaging(val)
{
debugger;
this.hrmscoffrequestssource.setPaging(1, val, true);
}

handlehrmscoffrequestsGridSelected(event:any) {
this.hrmscoffrequestsselectedindex=this.hrmsholidayworkrequestservice.hrmscoffrequests.findIndex(i => i.coffid === event.data.coffid);
}
IshrmscoffrequestsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmscoffrequestsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmscoffrequests

}



