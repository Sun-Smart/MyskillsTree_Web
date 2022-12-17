import { prjprojectverificationService } from './../../../service/prjprojectverification.service';
import { prjprojectverification } from './../../../model/prjprojectverification.model';
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
import { prjprojectmaster} from './../../../model/prjprojectmaster.model';
import { prjprojectmasterComponent } from './../../../pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-prjprojectverification',
templateUrl: './prjprojectverification.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectverificationComponent implements OnInit {
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
bfilterPopulateprjprojectverifications:boolean=false;
dataprjprojectverificationsprojectid3:any=[];
dataprjprojectverificationsverificationstage3:any=[];
dataprjprojectverificationsverificationby3:any=[];
dataprjprojectverificationsreviewedby3:any=[];
dataprjprojectverificationsverificationresult3:any=[];
 prjprojectverificationForm: FormGroup;
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
verificationstageList: boconfigvalue[];
verificationbyList: bousermaster[];
verificationbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
verificationby_bousermastersForm: FormGroup;//autocomplete
verificationby_bousermastersoptions:any;//autocomplete
verificationby_bousermastersformatter:any;//autocomplete
reviewedbyList: bousermaster[];
reviewedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
reviewedby_bousermastersForm: FormGroup;//autocomplete
reviewedby_bousermastersoptions:any;//autocomplete
reviewedby_bousermastersformatter:any;//autocomplete
verificationresultList: boconfigvalue[];
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
prjprojectverificationshowOption:boolean;
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
private prjprojectverificationservice: prjprojectverificationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private prjprojectmasterservice:prjprojectmasterService,
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
this.prjprojectverificationForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
projectiddesc: [null],
verificationid: [null],
verification: [null],
verificationstage: [null],
verificationstagedesc: [null],
verificationby: [null],
verificationbydesc: [null],
reviewedby: [null],
reviewedbydesc: [null],
verificationdate: [null],
verificationresult: [null],
verificationresultdesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectverificationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectverificationForm.dirty && this.prjprojectverificationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.verificationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.verificationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.verificationid && pkDetail) {
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
let prjprojectverificationid = null;

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
this.formid=prjprojectverificationid;
//this.sharedService.alert(prjprojectverificationid);

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
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.prjprojectverificationservice.formData && this.prjprojectverificationservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.prjprojectverificationForm.patchValue({
    projectid: this.prjprojectverificationservice.formData.projectid,
    projectiddesc: this.prjprojectverificationservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.prjprojectverificationForm.get('projectid').value);
let objprojectid;
if (arrprojectid.length > 0) objprojectid = arrprojectid[0];
if (objprojectid)
{
}
}
}
).catch((err) => {console.log(err);});
this.projectid_prjprojectmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.projectidList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.projectid_prjprojectmastersformatter = (result: any) => result.projectname;
this.configservice.getList("verificationstage").then(res => this.verificationstageList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.verificationbyList = res as bousermaster[];
if(this.prjprojectverificationservice.formData && this.prjprojectverificationservice.formData.verificationby){
this.verificationbyoptionsEvent.emit(this.verificationbyList);
this.prjprojectverificationForm.patchValue({
    verificationby: this.prjprojectverificationservice.formData.verificationby,
    verificationbydesc: this.prjprojectverificationservice.formData.verificationbydesc,
});
}
{
let arrverificationby = this.verificationbyList.filter(v => v.userid == this.prjprojectverificationForm.get('verificationby').value);
let objverificationby;
if (arrverificationby.length > 0) objverificationby = arrverificationby[0];
if (objverificationby)
{
}
}
}
).catch((err) => {console.log(err);});
this.verificationby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.verificationbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.verificationby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.reviewedbyList = res as bousermaster[];
if(this.prjprojectverificationservice.formData && this.prjprojectverificationservice.formData.reviewedby){
this.reviewedbyoptionsEvent.emit(this.reviewedbyList);
this.prjprojectverificationForm.patchValue({
    reviewedby: this.prjprojectverificationservice.formData.reviewedby,
    reviewedbydesc: this.prjprojectverificationservice.formData.reviewedbydesc,
});
}
{
let arrreviewedby = this.reviewedbyList.filter(v => v.userid == this.prjprojectverificationForm.get('reviewedby').value);
let objreviewedby;
if (arrreviewedby.length > 0) objreviewedby = arrreviewedby[0];
if (objreviewedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.reviewedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.reviewedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reviewedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("verificationresult").then(res => this.verificationresultList = res as boconfigvalue[]);

//autocomplete
    this.prjprojectverificationservice.getprjprojectverificationsList().then(res => {
      this.pkList = res as prjprojectverification[];
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
this.prjprojectverificationForm.markAsUntouched();
this.prjprojectverificationForm.markAsPristine();
}
onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.prjprojectverificationForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedverificationby(verificationbyDetail: any) {
if (verificationbyDetail.userid && verificationbyDetail) {
this.prjprojectverificationForm.patchValue({
verificationby: verificationbyDetail.userid,
verificationbydesc: verificationbyDetail.username,

});

}
}

onSelectedreviewedby(reviewedbyDetail: any) {
if (reviewedbyDetail.userid && reviewedbyDetail) {
this.prjprojectverificationForm.patchValue({
reviewedby: reviewedbyDetail.userid,
reviewedbydesc: reviewedbyDetail.username,

});

}
}




resetForm() {
if (this.prjprojectverificationForm != null)
this.prjprojectverificationForm.reset();
this.prjprojectverificationForm.patchValue({
verificationby: this.sessiondata.userid,
verificationbydesc: this.sessiondata.username,
reviewedby: this.sessiondata.userid,
reviewedbydesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let verificationid = this.prjprojectverificationForm.get('verificationid').value;
        if(verificationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectverificationservice.deleteprjprojectverification(verificationid).then(res =>
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
    this.prjprojectverificationForm.patchValue({
        verificationid: null
    });
    if(this.prjprojectverificationservice.formData.verificationid!=null)this.prjprojectverificationservice.formData.verificationid=null;
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
        else if(key=="verificationdate")
this.prjprojectverificationForm.patchValue({"verificationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.prjprojectverificationForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.prjprojectverificationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectverificationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectverificationForm.controls[key]!=undefined)
{
this.prjprojectverificationForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectverifications",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
projectidonChange(evt:any){
let e=evt.value;
}
verificationidonChange(evt:any){
let e=evt.value;
}
verificationonChange(evt:any){
let e=evt.value;
}
verificationstageonChange(evt:any){
let e=this.f.verificationstage.value as any;
this.prjprojectverificationForm.patchValue({verificationstagedesc:evt.options[evt.options.selectedIndex].text});
}
verificationbyonChange(evt:any){
let e=evt.value;
}
reviewedbyonChange(evt:any){
let e=evt.value;
}
verificationdateonChange(evt:any){
let e=evt.value;
}
verificationresultonChange(evt:any){
let e=this.f.verificationresult.value as any;
this.prjprojectverificationForm.patchValue({verificationresultdesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
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
  


editprjprojectverifications() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectverificationservice.getprjprojectverificationsByEID(pkcol).then(res => {

this.prjprojectverificationservice.formData=res.prjprojectverification;
let formproperty=res.prjprojectverification.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectverification.pkcol;
this.formid=res.prjprojectverification.verificationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectverification.verificationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectverificationForm.patchValue({
projectid: res.prjprojectverification.projectid,
projectiddesc: res.prjprojectverification.projectiddesc,
verificationid: res.prjprojectverification.verificationid,
verification: res.prjprojectverification.verification,
verificationstage: res.prjprojectverification.verificationstage,
verificationstagedesc: res.prjprojectverification.verificationstagedesc,
verificationby: res.prjprojectverification.verificationby,
verificationbydesc: res.prjprojectverification.verificationbydesc,
reviewedby: res.prjprojectverification.reviewedby,
reviewedbydesc: res.prjprojectverification.reviewedbydesc,
verificationdate: this.ngbDateParserFormatter.parse(res.prjprojectverification.verificationdate),
verificationresult: res.prjprojectverification.verificationresult,
verificationresultdesc: res.prjprojectverification.verificationresultdesc,
remarks: JSON.parse(res.prjprojectverification.remarks),
customfield: res.prjprojectverification.customfield,
attachment: JSON.parse(res.prjprojectverification.attachment),
status: res.prjprojectverification.status,
statusdesc: res.prjprojectverification.statusdesc,
});
if(this.prjprojectverificationForm.get('customfield').value!=null && this.prjprojectverificationForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojectverificationForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectverificationForm.get('attachment').value!=null && this.prjprojectverificationForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectverificationForm.get('attachment').value);
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
  for (let key in this.prjprojectverificationForm.controls) {
    if (this.prjprojectverificationForm.controls[key] != null) {
if(false)
{
if(this.prjprojectverificationservice.formData!=null && this.prjprojectverificationservice.formData[key]!=null  && this.prjprojectverificationservice.formData[key]!='[]' && this.prjprojectverificationservice.formData[key]!=undefined && this.prjprojectverificationservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectverificationservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectverificationservice.formData!=null && this.prjprojectverificationservice.formData[key]!=null   && this.prjprojectverificationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectverificationservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectverificationservice.formData!=null && this.prjprojectverificationservice.formData[key]!=null   && this.prjprojectverificationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectverificationservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectverificationservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectverificationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectverificationForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectverificationForm.value;
obj.verificationdate=new Date(this.prjprojectverificationForm.get('verificationdate').value ? this.ngbDateParserFormatter.format(this.prjprojectverificationForm.get('verificationdate').value)+'  UTC' :null);
if(this.prjprojectverificationForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.prjprojectverificationForm.get('remarks').value);
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

private prjprojectverificationtoggleOption(){
this.prjprojectverificationshowOption = this.prjprojectverificationshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectverificationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectverificationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectverificationForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectverificationservice.formData=this.prjprojectverificationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectverificationForm.controls[key] != null)
    {
        this.prjprojectverificationservice.formData[key] = this.prjprojectverificationForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.prjprojectverificationservice.formData.verificationdate=new Date(this.prjprojectverificationForm.get('verificationdate').value ? this.ngbDateParserFormatter.format(this.prjprojectverificationForm.get('verificationdate').value)+'  UTC' :null);
if(this.prjprojectverificationForm.get('remarks').value!=null)this.prjprojectverificationservice.formData.remarks=JSON.stringify(this.prjprojectverificationForm.get('remarks').value);
if(customfields!=null)this.prjprojectverificationservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojectverificationservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojectverificationservice.formData);
this.prjprojectverificationservice.formData=this.prjprojectverificationForm.value;
this.prjprojectverificationservice.saveOrUpdateprjprojectverifications().subscribe(
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
this.dialogRef.close((res as any).prjprojectverification);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectverificationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectverification);
}
else
{
this.FillData(res);
}
}
this.prjprojectverificationForm.markAsUntouched();
this.prjprojectverificationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.prjprojectverificationForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditverificationby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectverificationForm.get('verificationby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreviewedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectverificationForm.get('reviewedby').value, ScreenType:2 }
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



