import { hrmsemployeekeyeventService } from './../../../service/hrmsemployeekeyevent.service';
import { hrmsemployeekeyevent } from './../../../model/hrmsemployeekeyevent.model';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-hrmsemployeekeyevent',
templateUrl: './hrmsemployeekeyevent.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeekeyeventComponent implements OnInit {
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
bfilterPopulatehrmsemployeekeyevents:boolean=false;
datahrmsemployeekeyeventsemployeeid3:any=[];
datahrmsemployeekeyeventskeyeventtype3:any=[];
 hrmsemployeekeyeventForm: FormGroup;
employeeidList: bousermaster[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_bousermastersForm: FormGroup;//autocomplete
employeeid_bousermastersoptions:any;//autocomplete
employeeid_bousermastersformatter:any;//autocomplete
keyeventtypeList: boconfigvalue[];
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
hrmsemployeekeyeventshowOption:boolean;
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
private hrmsemployeekeyeventservice: hrmsemployeekeyeventService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.hrmsemployeekeyeventForm  = this.fb.group({
pk:[null],
ImageName: [null],
keyeventid: [null],
employeeid: [null],
employeeiddesc: [null],
keyeventtype: [null],
keyeventtypedesc: [null],
startdate: [null],
enddate: [null],
rating: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeekeyeventForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeekeyeventForm.dirty && this.hrmsemployeekeyeventForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.keyeventid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.keyeventid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.keyeventid && pkDetail) {
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
let hrmsemployeekeyeventid = null;

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
this.formid=hrmsemployeekeyeventid;
//this.sharedService.alert(hrmsemployeekeyeventid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.employeeidList = res as bousermaster[];
if(this.hrmsemployeekeyeventservice.formData && this.hrmsemployeekeyeventservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeekeyeventForm.patchValue({
    employeeid: this.hrmsemployeekeyeventservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeekeyeventservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.userid == this.hrmsemployeekeyeventForm.get('employeeid').value);
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
this.configservice.getList("empeventtype").then(res => this.keyeventtypeList = res as boconfigvalue[]);

//autocomplete
    this.hrmsemployeekeyeventservice.gethrmsemployeekeyeventsList().then(res => {
      this.pkList = res as hrmsemployeekeyevent[];
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
this.hrmsemployeekeyeventForm.markAsUntouched();
this.hrmsemployeekeyeventForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.userid && employeeidDetail) {
this.hrmsemployeekeyeventForm.patchValue({
employeeid: employeeidDetail.userid,
employeeiddesc: employeeidDetail.username,

});

}
}




resetForm() {
if (this.hrmsemployeekeyeventForm != null)
this.hrmsemployeekeyeventForm.reset();
this.hrmsemployeekeyeventForm.patchValue({
employeeid: this.sessiondata.userid,
employeeiddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let keyeventid = this.hrmsemployeekeyeventForm.get('keyeventid').value;
        if(keyeventid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeekeyeventservice.deletehrmsemployeekeyevent(keyeventid).then(res =>
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
    this.hrmsemployeekeyeventForm.patchValue({
        keyeventid: null
    });
    if(this.hrmsemployeekeyeventservice.formData.keyeventid!=null)this.hrmsemployeekeyeventservice.formData.keyeventid=null;
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
this.hrmsemployeekeyeventForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.hrmsemployeekeyeventForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeekeyeventForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeekeyeventForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeekeyeventForm.controls[key]!=undefined)
{
this.hrmsemployeekeyeventForm.controls[key].disable({onlySelf: true});
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
keyeventidonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
keyeventtypeonChange(evt:any){
let e=this.f.keyeventtype.value as any;
this.hrmsemployeekeyeventForm.patchValue({keyeventtypedesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
ratingonChange(evt:any){
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
  


edithrmsemployeekeyevents() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeekeyeventservice.gethrmsemployeekeyeventsByEID(pkcol).then(res => {

this.hrmsemployeekeyeventservice.formData=res.hrmsemployeekeyevent;
let formproperty=res.hrmsemployeekeyevent.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeekeyevent.pkcol;
this.formid=res.hrmsemployeekeyevent.keyeventid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeekeyevent.keyeventid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeekeyeventForm.patchValue({
keyeventid: res.hrmsemployeekeyevent.keyeventid,
employeeid: res.hrmsemployeekeyevent.employeeid,
employeeiddesc: res.hrmsemployeekeyevent.employeeiddesc,
keyeventtype: res.hrmsemployeekeyevent.keyeventtype,
keyeventtypedesc: res.hrmsemployeekeyevent.keyeventtypedesc,
startdate: this.ngbDateParserFormatter.parse(res.hrmsemployeekeyevent.startdate),
enddate: this.ngbDateParserFormatter.parse(res.hrmsemployeekeyevent.enddate),
rating: res.hrmsemployeekeyevent.rating,
remarks: res.hrmsemployeekeyevent.remarks,
attachment: JSON.parse(res.hrmsemployeekeyevent.attachment),
status: res.hrmsemployeekeyevent.status,
statusdesc: res.hrmsemployeekeyevent.statusdesc,
});
if(this.hrmsemployeekeyeventForm.get('attachment').value!=null && this.hrmsemployeekeyeventForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeekeyeventForm.get('attachment').value);
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
  for (let key in this.hrmsemployeekeyeventForm.controls) {
    if (this.hrmsemployeekeyeventForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeekeyeventservice.formData!=null && this.hrmsemployeekeyeventservice.formData[key]!=null  && this.hrmsemployeekeyeventservice.formData[key]!='[]' && this.hrmsemployeekeyeventservice.formData[key]!=undefined && this.hrmsemployeekeyeventservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeekeyeventservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.hrmsemployeekeyeventservice.formData!=null && this.hrmsemployeekeyeventservice.formData[key]!=null   && this.hrmsemployeekeyeventservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeekeyeventservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeekeyeventservice.formData!=null && this.hrmsemployeekeyeventservice.formData[key]!=null   && this.hrmsemployeekeyeventservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeekeyeventservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeekeyeventservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeekeyeventForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeekeyeventForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeekeyeventForm.value;
obj.startdate=new Date(this.hrmsemployeekeyeventForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeekeyeventForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.hrmsemployeekeyeventForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeekeyeventForm.get('enddate').value)+'  UTC' :null);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private hrmsemployeekeyeventtoggleOption(){
this.hrmsemployeekeyeventshowOption = this.hrmsemployeekeyeventshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeekeyeventForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeekeyeventForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeekeyeventForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeekeyeventservice.formData=this.hrmsemployeekeyeventForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeekeyeventForm.controls[key] != null)
    {
        this.hrmsemployeekeyeventservice.formData[key] = this.hrmsemployeekeyeventForm.controls[key].value;
    }
}
}
}
this.hrmsemployeekeyeventservice.formData.startdate=new Date(this.hrmsemployeekeyeventForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeekeyeventForm.get('startdate').value)+'  UTC' :null);
this.hrmsemployeekeyeventservice.formData.enddate=new Date(this.hrmsemployeekeyeventForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeekeyeventForm.get('enddate').value)+'  UTC' :null);
this.hrmsemployeekeyeventservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeekeyeventservice.formData);
this.hrmsemployeekeyeventservice.formData=this.hrmsemployeekeyeventForm.value;
this.hrmsemployeekeyeventservice.saveOrUpdatehrmsemployeekeyevents().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeekeyevent);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeekeyeventservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeekeyevent);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeekeyeventForm.markAsUntouched();
this.hrmsemployeekeyeventForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeekeyeventForm.get('employeeid').value, ScreenType:2 }
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



