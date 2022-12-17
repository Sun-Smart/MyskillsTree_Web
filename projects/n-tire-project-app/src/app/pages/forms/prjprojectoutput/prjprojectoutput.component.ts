import { prjprojectoutputService } from './../../../service/prjprojectoutput.service';
import { prjprojectoutput } from './../../../model/prjprojectoutput.model';
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
selector: 'app-prjprojectoutput',
templateUrl: './prjprojectoutput.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectoutputComponent implements OnInit {
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
bfilterPopulateprjprojectoutputs:boolean=false;
dataprjprojectoutputsprojectid3:any=[];
dataprjprojectoutputsoutputby3:any=[];
dataprjprojectoutputsverifiedby3:any=[];
 prjprojectoutputForm: FormGroup;
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
outputbyList: bousermaster[];
outputbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
outputby_bousermastersForm: FormGroup;//autocomplete
outputby_bousermastersoptions:any;//autocomplete
outputby_bousermastersformatter:any;//autocomplete
verifiedbyList: bousermaster[];
verifiedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
verifiedby_bousermastersForm: FormGroup;//autocomplete
verifiedby_bousermastersoptions:any;//autocomplete
verifiedby_bousermastersformatter:any;//autocomplete
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
prjprojectoutputshowOption:boolean;
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
private prjprojectoutputservice: prjprojectoutputService,
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
this.prjprojectoutputForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
projectiddesc: [null],
outputid: [null],
output: [null],
outputby: [null],
outputbydesc: [null],
verifiedby: [null],
verifiedbydesc: [null],
verifieddate: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectoutputForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectoutputForm.dirty && this.prjprojectoutputForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.outputid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.outputid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.outputid && pkDetail) {
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
let prjprojectoutputid = null;

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
this.formid=prjprojectoutputid;
//this.sharedService.alert(prjprojectoutputid);

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
if(this.prjprojectoutputservice.formData && this.prjprojectoutputservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.prjprojectoutputForm.patchValue({
    projectid: this.prjprojectoutputservice.formData.projectid,
    projectiddesc: this.prjprojectoutputservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.prjprojectoutputForm.get('projectid').value);
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
this.outputbyList = res as bousermaster[];
if(this.prjprojectoutputservice.formData && this.prjprojectoutputservice.formData.outputby){
this.outputbyoptionsEvent.emit(this.outputbyList);
this.prjprojectoutputForm.patchValue({
    outputby: this.prjprojectoutputservice.formData.outputby,
    outputbydesc: this.prjprojectoutputservice.formData.outputbydesc,
});
}
{
let arroutputby = this.outputbyList.filter(v => v.userid == this.prjprojectoutputForm.get('outputby').value);
let objoutputby;
if (arroutputby.length > 0) objoutputby = arroutputby[0];
if (objoutputby)
{
}
}
}
).catch((err) => {console.log(err);});
this.outputby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.outputbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.outputby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.verifiedbyList = res as bousermaster[];
if(this.prjprojectoutputservice.formData && this.prjprojectoutputservice.formData.verifiedby){
this.verifiedbyoptionsEvent.emit(this.verifiedbyList);
this.prjprojectoutputForm.patchValue({
    verifiedby: this.prjprojectoutputservice.formData.verifiedby,
    verifiedbydesc: this.prjprojectoutputservice.formData.verifiedbydesc,
});
}
{
let arrverifiedby = this.verifiedbyList.filter(v => v.userid == this.prjprojectoutputForm.get('verifiedby').value);
let objverifiedby;
if (arrverifiedby.length > 0) objverifiedby = arrverifiedby[0];
if (objverifiedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.verifiedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.verifiedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.verifiedby_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.prjprojectoutputservice.getprjprojectoutputsList().then(res => {
      this.pkList = res as prjprojectoutput[];
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
this.prjprojectoutputForm.markAsUntouched();
this.prjprojectoutputForm.markAsPristine();
}
onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.prjprojectoutputForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelectedoutputby(outputbyDetail: any) {
if (outputbyDetail.userid && outputbyDetail) {
this.prjprojectoutputForm.patchValue({
outputby: outputbyDetail.userid,
outputbydesc: outputbyDetail.username,

});

}
}

onSelectedverifiedby(verifiedbyDetail: any) {
if (verifiedbyDetail.userid && verifiedbyDetail) {
this.prjprojectoutputForm.patchValue({
verifiedby: verifiedbyDetail.userid,
verifiedbydesc: verifiedbyDetail.username,

});

}
}




resetForm() {
if (this.prjprojectoutputForm != null)
this.prjprojectoutputForm.reset();
this.prjprojectoutputForm.patchValue({
outputby: this.sessiondata.userid,
outputbydesc: this.sessiondata.username,
verifiedby: this.sessiondata.userid,
verifiedbydesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let outputid = this.prjprojectoutputForm.get('outputid').value;
        if(outputid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectoutputservice.deleteprjprojectoutput(outputid).then(res =>
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
    this.prjprojectoutputForm.patchValue({
        outputid: null
    });
    if(this.prjprojectoutputservice.formData.outputid!=null)this.prjprojectoutputservice.formData.outputid=null;
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
        else if(key=="verifieddate")
this.prjprojectoutputForm.patchValue({"verifieddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.prjprojectoutputForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.prjprojectoutputForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectoutputForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectoutputForm.controls[key]!=undefined)
{
this.prjprojectoutputForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectoutputs",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
outputidonChange(evt:any){
let e=evt.value;
}
outputonChange(evt:any){
let e=evt.value;
}
outputbyonChange(evt:any){
let e=evt.value;
}
verifiedbyonChange(evt:any){
let e=evt.value;
}
verifieddateonChange(evt:any){
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
  


editprjprojectoutputs() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectoutputservice.getprjprojectoutputsByEID(pkcol).then(res => {

this.prjprojectoutputservice.formData=res.prjprojectoutput;
let formproperty=res.prjprojectoutput.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectoutput.pkcol;
this.formid=res.prjprojectoutput.outputid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectoutput.outputid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectoutputForm.patchValue({
projectid: res.prjprojectoutput.projectid,
projectiddesc: res.prjprojectoutput.projectiddesc,
outputid: res.prjprojectoutput.outputid,
output: res.prjprojectoutput.output,
outputby: res.prjprojectoutput.outputby,
outputbydesc: res.prjprojectoutput.outputbydesc,
verifiedby: res.prjprojectoutput.verifiedby,
verifiedbydesc: res.prjprojectoutput.verifiedbydesc,
verifieddate: this.ngbDateParserFormatter.parse(res.prjprojectoutput.verifieddate),
remarks: JSON.parse(res.prjprojectoutput.remarks),
customfield: res.prjprojectoutput.customfield,
attachment: JSON.parse(res.prjprojectoutput.attachment),
status: res.prjprojectoutput.status,
statusdesc: res.prjprojectoutput.statusdesc,
});
if(this.prjprojectoutputForm.get('customfield').value!=null && this.prjprojectoutputForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojectoutputForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectoutputForm.get('attachment').value!=null && this.prjprojectoutputForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectoutputForm.get('attachment').value);
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
  for (let key in this.prjprojectoutputForm.controls) {
    if (this.prjprojectoutputForm.controls[key] != null) {
if(false)
{
if(this.prjprojectoutputservice.formData!=null && this.prjprojectoutputservice.formData[key]!=null  && this.prjprojectoutputservice.formData[key]!='[]' && this.prjprojectoutputservice.formData[key]!=undefined && this.prjprojectoutputservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectoutputservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectoutputservice.formData!=null && this.prjprojectoutputservice.formData[key]!=null   && this.prjprojectoutputservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectoutputservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectoutputservice.formData!=null && this.prjprojectoutputservice.formData[key]!=null   && this.prjprojectoutputservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectoutputservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectoutputservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectoutputForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectoutputForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectoutputForm.value;
obj.verifieddate=new Date(this.prjprojectoutputForm.get('verifieddate').value ? this.ngbDateParserFormatter.format(this.prjprojectoutputForm.get('verifieddate').value)+'  UTC' :null);
if(this.prjprojectoutputForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.prjprojectoutputForm.get('remarks').value);
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

private prjprojectoutputtoggleOption(){
this.prjprojectoutputshowOption = this.prjprojectoutputshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectoutputForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectoutputForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectoutputForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectoutputservice.formData=this.prjprojectoutputForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectoutputForm.controls[key] != null)
    {
        this.prjprojectoutputservice.formData[key] = this.prjprojectoutputForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.prjprojectoutputservice.formData.verifieddate=new Date(this.prjprojectoutputForm.get('verifieddate').value ? this.ngbDateParserFormatter.format(this.prjprojectoutputForm.get('verifieddate').value)+'  UTC' :null);
if(this.prjprojectoutputForm.get('remarks').value!=null)this.prjprojectoutputservice.formData.remarks=JSON.stringify(this.prjprojectoutputForm.get('remarks').value);
if(customfields!=null)this.prjprojectoutputservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojectoutputservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojectoutputservice.formData);
this.prjprojectoutputservice.formData=this.prjprojectoutputForm.value;
this.prjprojectoutputservice.saveOrUpdateprjprojectoutputs().subscribe(
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
this.dialogRef.close((res as any).prjprojectoutput);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectoutputservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectoutput);
}
else
{
this.FillData(res);
}
}
this.prjprojectoutputForm.markAsUntouched();
this.prjprojectoutputForm.markAsPristine();
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
data: {projectid:this.prjprojectoutputForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditoutputby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectoutputForm.get('outputby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditverifiedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectoutputForm.get('verifiedby').value, ScreenType:2 }
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



