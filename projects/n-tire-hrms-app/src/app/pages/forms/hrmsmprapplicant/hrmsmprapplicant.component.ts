import { hrmsmprapplicantService } from './../../../service/hrmsmprapplicant.service';
import { hrmsmprapplicant } from './../../../model/hrmsmprapplicant.model';
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
import { hrmsapplicantmaster} from './../../../model/hrmsapplicantmaster.model';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
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
selector: 'app-hrmsmprapplicant',
templateUrl: './hrmsmprapplicant.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsmprapplicantComponent implements OnInit {
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
bfilterPopulatehrmsmprapplicants:boolean=false;
datahrmsmprapplicantsapplicantid3:any=[];
 hrmsmprapplicantForm: FormGroup;
applicantidList: hrmsapplicantmaster[];
applicantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
applicantid_hrmsapplicantmastersForm: FormGroup;//autocomplete
applicantid_hrmsapplicantmastersoptions:any;//autocomplete
applicantid_hrmsapplicantmastersformatter:any;//autocomplete
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
hrmsmprapplicantshowOption:boolean;
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
private hrmsmprapplicantservice: hrmsmprapplicantService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsapplicantmasterservice:hrmsapplicantmasterService,
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
this.hrmsmprapplicantForm  = this.fb.group({
pk:[null],
ImageName: [null],
mprid: [null],
applicantid: [null],
applicantiddesc: [null],
mprapplicantid: [null],
offerdate: [null],
planneddoj: [null],
joineddate: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsmprapplicantForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsmprapplicantForm.dirty && this.hrmsmprapplicantForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.mprapplicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.mprapplicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.mprapplicantid && pkDetail) {
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
let hrmsmprapplicantid = null;

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
this.formid=hrmsmprapplicantid;
//this.sharedService.alert(hrmsmprapplicantid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => 
{
this.applicantidList = res as hrmsapplicantmaster[];
if(this.hrmsmprapplicantservice.formData && this.hrmsmprapplicantservice.formData.applicantid){
this.applicantidoptionsEvent.emit(this.applicantidList);
this.hrmsmprapplicantForm.patchValue({
    applicantid: this.hrmsmprapplicantservice.formData.applicantid,
    applicantiddesc: this.hrmsmprapplicantservice.formData.applicantiddesc,
});
}
{
let arrapplicantid = this.applicantidList.filter(v => v.applicantid == this.hrmsmprapplicantForm.get('applicantid').value);
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

//autocomplete
    this.hrmsmprapplicantservice.gethrmsmprapplicantsList().then(res => {
      this.pkList = res as hrmsmprapplicant[];
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
this.hrmsmprapplicantForm.markAsUntouched();
this.hrmsmprapplicantForm.markAsPristine();
}
onSelectedapplicantid(applicantidDetail: any) {
if (applicantidDetail.applicantid && applicantidDetail) {
this.hrmsmprapplicantForm.patchValue({
applicantid: applicantidDetail.applicantid,
applicantiddesc: applicantidDetail.applicantname,

});

}
}




resetForm() {
if (this.hrmsmprapplicantForm != null)
this.hrmsmprapplicantForm.reset();
this.hrmsmprapplicantForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let mprapplicantid = this.hrmsmprapplicantForm.get('mprapplicantid').value;
        if(mprapplicantid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsmprapplicantservice.deletehrmsmprapplicant(mprapplicantid).then(res =>
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
    this.hrmsmprapplicantForm.patchValue({
        mprapplicantid: null
    });
    if(this.hrmsmprapplicantservice.formData.mprapplicantid!=null)this.hrmsmprapplicantservice.formData.mprapplicantid=null;
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
this.hrmsmprapplicantForm.patchValue({"offerdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="planneddoj")
this.hrmsmprapplicantForm.patchValue({"planneddoj":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="joineddate")
this.hrmsmprapplicantForm.patchValue({"joineddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsmprapplicantForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsmprapplicantForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsmprapplicantForm.controls[key]!=undefined)
{
this.hrmsmprapplicantForm.controls[key].disable({onlySelf: true});
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
mpridonChange(evt:any){
let e=evt.value;
}
applicantidonChange(evt:any){
let e=evt.value;
}
mprapplicantidonChange(evt:any){
let e=evt.value;
}
offerdateonChange(evt:any){
let e=evt.value;
}
planneddojonChange(evt:any){
let e=evt.value;
}
joineddateonChange(evt:any){
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
  


edithrmsmprapplicants() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsmprapplicantservice.gethrmsmprapplicantsByEID(pkcol).then(res => {

this.hrmsmprapplicantservice.formData=res.hrmsmprapplicant;
let formproperty=res.hrmsmprapplicant.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsmprapplicant.pkcol;
this.formid=res.hrmsmprapplicant.mprapplicantid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsmprapplicant.mprapplicantid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsmprapplicantForm.patchValue({
mprid: res.hrmsmprapplicant.mprid,
applicantid: res.hrmsmprapplicant.applicantid,
applicantiddesc: res.hrmsmprapplicant.applicantiddesc,
mprapplicantid: res.hrmsmprapplicant.mprapplicantid,
offerdate: this.ngbDateParserFormatter.parse(res.hrmsmprapplicant.offerdate),
planneddoj: this.ngbDateParserFormatter.parse(res.hrmsmprapplicant.planneddoj),
joineddate: this.ngbDateParserFormatter.parse(res.hrmsmprapplicant.joineddate),
remarks: res.hrmsmprapplicant.remarks,
attachment: JSON.parse(res.hrmsmprapplicant.attachment),
status: res.hrmsmprapplicant.status,
statusdesc: res.hrmsmprapplicant.statusdesc,
});
if(this.hrmsmprapplicantForm.get('attachment').value!=null && this.hrmsmprapplicantForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsmprapplicantForm.get('attachment').value);
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
  for (let key in this.hrmsmprapplicantForm.controls) {
    if (this.hrmsmprapplicantForm.controls[key] != null) {
if(false)
{
if(this.hrmsmprapplicantservice.formData!=null && this.hrmsmprapplicantservice.formData[key]!=null  && this.hrmsmprapplicantservice.formData[key]!='[]' && this.hrmsmprapplicantservice.formData[key]!=undefined && this.hrmsmprapplicantservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsmprapplicantservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsmprapplicantservice.formData!=null && this.hrmsmprapplicantservice.formData[key]!=null   && this.hrmsmprapplicantservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsmprapplicantservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsmprapplicantservice.formData!=null && this.hrmsmprapplicantservice.formData[key]!=null   && this.hrmsmprapplicantservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsmprapplicantservice.formData[key]+"'><div class='progress__number'>"+this.hrmsmprapplicantservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsmprapplicantForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsmprapplicantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsmprapplicantForm.value;
obj.offerdate=new Date(this.hrmsmprapplicantForm.get('offerdate').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('offerdate').value)+'  UTC' :null);
obj.planneddoj=new Date(this.hrmsmprapplicantForm.get('planneddoj').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('planneddoj').value)+'  UTC' :null);
obj.joineddate=new Date(this.hrmsmprapplicantForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('joineddate').value)+'  UTC' :null);
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

private hrmsmprapplicanttoggleOption(){
this.hrmsmprapplicantshowOption = this.hrmsmprapplicantshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsmprapplicantForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsmprapplicantForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsmprapplicantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsmprapplicantservice.formData=this.hrmsmprapplicantForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsmprapplicantForm.controls[key] != null)
    {
        this.hrmsmprapplicantservice.formData[key] = this.hrmsmprapplicantForm.controls[key].value;
    }
}
}
}
this.hrmsmprapplicantservice.formData.offerdate=new Date(this.hrmsmprapplicantForm.get('offerdate').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('offerdate').value)+'  UTC' :null);
this.hrmsmprapplicantservice.formData.planneddoj=new Date(this.hrmsmprapplicantForm.get('planneddoj').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('planneddoj').value)+'  UTC' :null);
this.hrmsmprapplicantservice.formData.joineddate=new Date(this.hrmsmprapplicantForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.hrmsmprapplicantForm.get('joineddate').value)+'  UTC' :null);
this.hrmsmprapplicantservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsmprapplicantservice.formData);
this.hrmsmprapplicantservice.formData=this.hrmsmprapplicantForm.value;
this.hrmsmprapplicantservice.saveOrUpdatehrmsmprapplicants().subscribe(
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
this.dialogRef.close((res as any).hrmsmprapplicant);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsmprapplicantservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsmprapplicant);
}
else
{
this.FillData(res);
}
}
this.hrmsmprapplicantForm.markAsUntouched();
this.hrmsmprapplicantForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditapplicantid( applicantid) {
/*let ScreenType='2';
this.dialog.open(hrmsapplicantmasterComponent, 
{
data: {applicantid:this.hrmsmprapplicantForm.get('applicantid').value, ScreenType:2 }
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



