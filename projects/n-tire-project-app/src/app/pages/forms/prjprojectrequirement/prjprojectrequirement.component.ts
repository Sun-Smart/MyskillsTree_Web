import { prjprojectrequirementService } from './../../../service/prjprojectrequirement.service';
import { prjprojectrequirement } from './../../../model/prjprojectrequirement.model';
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
selector: 'app-prjprojectrequirement',
templateUrl: './prjprojectrequirement.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectrequirementComponent implements OnInit {
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
bfilterPopulateprjprojectrequirements:boolean=false;
dataprjprojectrequirementsprojectid3:any=[];
dataprjprojectrequirementsauthorid3:any=[];
dataprjprojectrequirementsreviewerid3:any=[];
 prjprojectrequirementForm: FormGroup;
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
authoridList: bousermaster[];
authoridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
authorid_bousermastersForm: FormGroup;//autocomplete
authorid_bousermastersoptions:any;//autocomplete
authorid_bousermastersformatter:any;//autocomplete
revieweridList: bousermaster[];
revieweridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
reviewerid_bousermastersForm: FormGroup;//autocomplete
reviewerid_bousermastersoptions:any;//autocomplete
reviewerid_bousermastersformatter:any;//autocomplete
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
prjprojectrequirementshowOption:boolean;
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
private prjprojectrequirementservice: prjprojectrequirementService,
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
this.prjprojectrequirementForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
projectiddesc: [null],
requirementid: [null],
requirement: [null],
authorid: [null],
authoriddesc: [null],
reviewerid: [null],
revieweriddesc: [null],
tousers: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectrequirementForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectrequirementForm.dirty && this.prjprojectrequirementForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.requirementid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.requirementid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.requirementid && pkDetail) {
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
let prjprojectrequirementid = null;

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
this.formid=prjprojectrequirementid;
//this.sharedService.alert(prjprojectrequirementid);

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
if(this.prjprojectrequirementservice.formData && this.prjprojectrequirementservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.prjprojectrequirementForm.patchValue({
    projectid: this.prjprojectrequirementservice.formData.projectid,
    projectiddesc: this.prjprojectrequirementservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.prjprojectrequirementForm.get('projectid').value);
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
this.bousermasterservice.getbousermastersList().then(res => 
{
this.authoridList = res as bousermaster[];
if(this.prjprojectrequirementservice.formData && this.prjprojectrequirementservice.formData.authorid){
this.authoridoptionsEvent.emit(this.authoridList);
this.prjprojectrequirementForm.patchValue({
    authorid: this.prjprojectrequirementservice.formData.authorid,
    authoriddesc: this.prjprojectrequirementservice.formData.authoriddesc,
});
}
{
let arrauthorid = this.authoridList.filter(v => v.userid == this.prjprojectrequirementForm.get('authorid').value);
let objauthorid;
if (arrauthorid.length > 0) objauthorid = arrauthorid[0];
if (objauthorid)
{
}
}
}
).catch((err) => {console.log(err);});
this.authorid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.authoridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.authorid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.revieweridList = res as bousermaster[];
if(this.prjprojectrequirementservice.formData && this.prjprojectrequirementservice.formData.reviewerid){
this.revieweridoptionsEvent.emit(this.revieweridList);
this.prjprojectrequirementForm.patchValue({
    reviewerid: this.prjprojectrequirementservice.formData.reviewerid,
    revieweriddesc: this.prjprojectrequirementservice.formData.revieweriddesc,
});
}
{
let arrreviewerid = this.revieweridList.filter(v => v.userid == this.prjprojectrequirementForm.get('reviewerid').value);
let objreviewerid;
if (arrreviewerid.length > 0) objreviewerid = arrreviewerid[0];
if (objreviewerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.reviewerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.revieweridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reviewerid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.prjprojectrequirementservice.getprjprojectrequirementsList().then(res => {
      this.pkList = res as prjprojectrequirement[];
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
this.prjprojectrequirementForm.markAsUntouched();
this.prjprojectrequirementForm.markAsPristine();
}
onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.prjprojectrequirementForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedauthorid(authoridDetail: any) {
if (authoridDetail.userid && authoridDetail) {
this.prjprojectrequirementForm.patchValue({
authorid: authoridDetail.userid,
authoriddesc: authoridDetail.username,

});

}
}

onSelectedreviewerid(revieweridDetail: any) {
if (revieweridDetail.userid && revieweridDetail) {
this.prjprojectrequirementForm.patchValue({
reviewerid: revieweridDetail.userid,
revieweriddesc: revieweridDetail.username,

});

}
}




resetForm() {
if (this.prjprojectrequirementForm != null)
this.prjprojectrequirementForm.reset();
this.prjprojectrequirementForm.patchValue({
authorid: this.sessiondata.userid,
authoriddesc: this.sessiondata.username,
reviewerid: this.sessiondata.userid,
revieweriddesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let requirementid = this.prjprojectrequirementForm.get('requirementid').value;
        if(requirementid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectrequirementservice.deleteprjprojectrequirement(requirementid).then(res =>
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
    this.prjprojectrequirementForm.patchValue({
        requirementid: null
    });
    if(this.prjprojectrequirementservice.formData.requirementid!=null)this.prjprojectrequirementservice.formData.requirementid=null;
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
        else if(key=="tousers")
this.prjprojectrequirementForm.patchValue({"tousers":  mainscreendata[key] } );
        else if(key=="remarks")
this.prjprojectrequirementForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.prjprojectrequirementForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectrequirementForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectrequirementForm.controls[key]!=undefined)
{
this.prjprojectrequirementForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectrequirements",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
requirementidonChange(evt:any){
let e=evt.value;
}
requirementonChange(evt:any){
let e=evt.value;
}
authoridonChange(evt:any){
let e=evt.value;
}
revieweridonChange(evt:any){
let e=evt.value;
}
tousersonChange(evt:any){
let e=evt.value;
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
  


editprjprojectrequirements() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectrequirementservice.getprjprojectrequirementsByEID(pkcol).then(res => {

this.prjprojectrequirementservice.formData=res.prjprojectrequirement;
let formproperty=res.prjprojectrequirement.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectrequirement.pkcol;
this.formid=res.prjprojectrequirement.requirementid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectrequirement.requirementid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectrequirementForm.patchValue({
projectid: res.prjprojectrequirement.projectid,
projectiddesc: res.prjprojectrequirement.projectiddesc,
requirementid: res.prjprojectrequirement.requirementid,
requirement: res.prjprojectrequirement.requirement,
authorid: res.prjprojectrequirement.authorid,
authoriddesc: res.prjprojectrequirement.authoriddesc,
reviewerid: res.prjprojectrequirement.reviewerid,
revieweriddesc: res.prjprojectrequirement.revieweriddesc,
tousers: JSON.parse(res.prjprojectrequirement.tousers),
remarks: JSON.parse(res.prjprojectrequirement.remarks),
customfield: res.prjprojectrequirement.customfield,
attachment: JSON.parse(res.prjprojectrequirement.attachment),
status: res.prjprojectrequirement.status,
statusdesc: res.prjprojectrequirement.statusdesc,
});
if(this.prjprojectrequirementForm.get('customfield').value!=null && this.prjprojectrequirementForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojectrequirementForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectrequirementForm.get('attachment').value!=null && this.prjprojectrequirementForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectrequirementForm.get('attachment').value);
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
  for (let key in this.prjprojectrequirementForm.controls) {
    if (this.prjprojectrequirementForm.controls[key] != null) {
if(false)
{
if(this.prjprojectrequirementservice.formData!=null && this.prjprojectrequirementservice.formData[key]!=null  && this.prjprojectrequirementservice.formData[key]!='[]' && this.prjprojectrequirementservice.formData[key]!=undefined && this.prjprojectrequirementservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectrequirementservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectrequirementservice.formData!=null && this.prjprojectrequirementservice.formData[key]!=null   && this.prjprojectrequirementservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectrequirementservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectrequirementservice.formData!=null && this.prjprojectrequirementservice.formData[key]!=null   && this.prjprojectrequirementservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectrequirementservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectrequirementservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectrequirementForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectrequirementForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectrequirementForm.value;
if(this.prjprojectrequirementForm.get('tousers').value!=null)obj.tousers=JSON.stringify(this.prjprojectrequirementForm.get('tousers').value);
if(this.prjprojectrequirementForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.prjprojectrequirementForm.get('remarks').value);
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

private prjprojectrequirementtoggleOption(){
this.prjprojectrequirementshowOption = this.prjprojectrequirementshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectrequirementForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectrequirementForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectrequirementForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectrequirementservice.formData=this.prjprojectrequirementForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectrequirementForm.controls[key] != null)
    {
        this.prjprojectrequirementservice.formData[key] = this.prjprojectrequirementForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(this.prjprojectrequirementForm.get('tousers').value!=null)this.prjprojectrequirementservice.formData.tousers=JSON.stringify(this.prjprojectrequirementForm.get('tousers').value);
if(this.prjprojectrequirementForm.get('remarks').value!=null)this.prjprojectrequirementservice.formData.remarks=JSON.stringify(this.prjprojectrequirementForm.get('remarks').value);
if(customfields!=null)this.prjprojectrequirementservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojectrequirementservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojectrequirementservice.formData);
this.prjprojectrequirementservice.formData=this.prjprojectrequirementForm.value;
this.prjprojectrequirementservice.saveOrUpdateprjprojectrequirements().subscribe(
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
this.dialogRef.close((res as any).prjprojectrequirement);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectrequirementservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectrequirement);
}
else
{
this.FillData(res);
}
}
this.prjprojectrequirementForm.markAsUntouched();
this.prjprojectrequirementForm.markAsPristine();
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
data: {projectid:this.prjprojectrequirementForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditauthorid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectrequirementForm.get('authorid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreviewerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectrequirementForm.get('reviewerid').value, ScreenType:2 }
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



