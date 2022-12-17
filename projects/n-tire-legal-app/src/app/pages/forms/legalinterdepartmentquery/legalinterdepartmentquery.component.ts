import { legalinterdepartmentqueryService } from './../../../service/legalinterdepartmentquery.service';
import { legalinterdepartmentquery } from './../../../model/legalinterdepartmentquery.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { legalinterdepartmentqueryresponse } from './../../../model/legalinterdepartmentqueryresponse.model';
import { legalinterdepartmentqueryresponseComponent } from './../../../pages/forms/legalinterdepartmentqueryresponse/legalinterdepartmentqueryresponse.component';
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
selector: 'app-legalinterdepartmentquery',
templateUrl: './legalinterdepartmentquery.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalinterdepartmentqueryComponent implements OnInit {
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
bfilterPopulatelegalinterdepartmentqueries:boolean=false;
datalegalinterdepartmentqueriescaseid3:any=[];
datalegalinterdepartmentqueriesfromuser3:any=[];
datalegalinterdepartmentqueryresponsesresponseby3:any=[];
bfilterPopulatelegalinterdepartmentqueryresponses:boolean=false;
@ViewChild('tbllegalinterdepartmentqueryresponsessource',{static:false}) tbllegalinterdepartmentqueryresponsessource: Ng2SmartTableComponent;
 legalinterdepartmentqueryForm: FormGroup;
caseidList: legalcase[];
caseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
caseid_legalcasesForm: FormGroup;//autocomplete
caseid_legalcasesoptions:any;//autocomplete
caseid_legalcasesformatter:any;//autocomplete
fromuserList: bousermaster[];
fromuseroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
fromuser_bousermastersForm: FormGroup;//autocomplete
fromuser_bousermastersoptions:any;//autocomplete
fromuser_bousermastersformatter:any;//autocomplete
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
legalinterdepartmentqueryshowOption:boolean;
legalinterdepartmentqueryresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



legalinterdepartmentqueryresponsesvisiblelist:any;
legalinterdepartmentqueryresponseshidelist:any;

DeletedlegalinterdepartmentqueryresponseIDs: string="";
legalinterdepartmentqueryresponsesID: string = "1";
legalinterdepartmentqueryresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalinterdepartmentqueryservice: legalinterdepartmentqueryService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legalcaseservice:legalcaseService,
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
this.legalinterdepartmentqueryForm  = this.fb.group({
pk:[null],
ImageName: [null],
caseid: [null, Validators.required],
caseiddesc: [null],
idqid: [null],
idqdate: [null, Validators.required],
fromuser: [null],
fromuserdesc: [null],
touser: [null],
subject: [null, Validators.required],
description: [null, Validators.required],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalinterdepartmentqueryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalinterdepartmentqueryForm.dirty && this.legalinterdepartmentqueryForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.idqid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.idqid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.idqid && pkDetail) {
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
let legalinterdepartmentqueryid = null;

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
this.formid=legalinterdepartmentqueryid;
//this.sharedService.alert(legalinterdepartmentqueryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegalinterdepartmentqueryresponsesTableConfig();
  setTimeout(() => {
  this.SetlegalinterdepartmentqueryresponsesTableddConfig();
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
if(this.legalinterdepartmentqueryservice.formData && this.legalinterdepartmentqueryservice.formData.caseid){
this.caseidoptionsEvent.emit(this.caseidList);
this.legalinterdepartmentqueryForm.patchValue({
    caseid: this.legalinterdepartmentqueryservice.formData.caseid,
    caseiddesc: this.legalinterdepartmentqueryservice.formData.caseiddesc,
});
}
{
let arrcaseid = this.caseidList.filter(v => v.caseid == this.legalinterdepartmentqueryForm.get('caseid').value);
let objcaseid;
if (arrcaseid.length > 0) objcaseid = arrcaseid[0];
if (objcaseid)
{
}
}
}
).catch((err) => {console.log(err);});
this.caseid_legalcasesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.caseidList.filter(v => v.casenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.caseid_legalcasesformatter = (result: any) => result.casenumber;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.fromuserList = res as bousermaster[];
if(this.legalinterdepartmentqueryservice.formData && this.legalinterdepartmentqueryservice.formData.fromuser){
this.fromuseroptionsEvent.emit(this.fromuserList);
this.legalinterdepartmentqueryForm.patchValue({
    fromuser: this.legalinterdepartmentqueryservice.formData.fromuser,
    fromuserdesc: this.legalinterdepartmentqueryservice.formData.fromuserdesc,
});
}
{
let arrfromuser = this.fromuserList.filter(v => v.userid == this.legalinterdepartmentqueryForm.get('fromuser').value);
let objfromuser;
if (arrfromuser.length > 0) objfromuser = arrfromuser[0];
if (objfromuser)
{
}
}
}
).catch((err) => {console.log(err);});
this.fromuser_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.fromuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.fromuser_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.legalinterdepartmentqueryservice.getlegalinterdepartmentqueriesList().then(res => {
      this.pkList = res as legalinterdepartmentquery[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.subject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.subject;

//setting the flag that the screen is not touched 
this.legalinterdepartmentqueryForm.markAsUntouched();
this.legalinterdepartmentqueryForm.markAsPristine();
}
onSelectedcaseid(caseidDetail: any) {
if (caseidDetail.caseid && caseidDetail) {
this.legalinterdepartmentqueryForm.patchValue({
caseid: caseidDetail.caseid,
caseiddesc: caseidDetail.casenumber,

});

}
}

onSelectedfromuser(fromuserDetail: any) {
if (fromuserDetail.userid && fromuserDetail) {
this.legalinterdepartmentqueryForm.patchValue({
fromuser: fromuserDetail.userid,
fromuserdesc: fromuserDetail.username,

});

}
}




resetForm() {
if (this.legalinterdepartmentqueryForm != null)
this.legalinterdepartmentqueryForm.reset();
this.legalinterdepartmentqueryForm.patchValue({
fromuser: this.sessiondata.userid,
fromuserdesc: this.sessiondata.username,
});
this.legalinterdepartmentqueryForm.patchValue({
idqdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
fromuser: this.sessiondata.userid,
});
setTimeout(() => {
this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses=[];
this.legalinterdepartmentqueryresponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let idqid = this.legalinterdepartmentqueryForm.get('idqid').value;
        if(idqid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalinterdepartmentqueryservice.deletelegalinterdepartmentquery(idqid).then(res =>
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
    this.legalinterdepartmentqueryForm.patchValue({
        idqid: null
    });
    if(this.legalinterdepartmentqueryservice.formData.idqid!=null)this.legalinterdepartmentqueryservice.formData.idqid=null;
for (let i=0;i<this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.length;i++) {
this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses[i].idqresponseid=null;
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
        else if(key=="idqdate")
this.legalinterdepartmentqueryForm.patchValue({"idqdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="touser")
this.legalinterdepartmentqueryForm.patchValue({"touser":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.legalinterdepartmentqueryForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalinterdepartmentqueryForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalinterdepartmentqueryForm.controls[key]!=undefined)
{
this.legalinterdepartmentqueryForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalinterdepartmentqueryservice.formData.subject!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalinterdepartmentqueryservice.formData.subject!=null )
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
caseidonChange(evt:any){
let e=evt.value;
}
idqidonChange(evt:any){
let e=evt.value;
}
idqdateonChange(evt:any){
let e=evt.value;
}
fromuseronChange(evt:any){
let e=evt.value;
}
touseronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrtouser=res;
let objtouser;
if (arrtouser.length > 0) objtouser = arrtouser[0];
if (objtouser)
{
}
}).catch((err) => {console.log(err);});
}
subjectonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
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
  


editlegalinterdepartmentqueries() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalinterdepartmentqueryservice.getlegalinterdepartmentqueriesByEID(pkcol).then(res => {

this.legalinterdepartmentqueryservice.formData=res.legalinterdepartmentquery;
let formproperty=res.legalinterdepartmentquery.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalinterdepartmentquery.pkcol;
this.formid=res.legalinterdepartmentquery.idqid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalinterdepartmentqueryservice.formData=res.legalinterdepartmentquery;
this.formid=res.legalinterdepartmentquery.idqid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalinterdepartmentqueryForm.patchValue({
caseid: res.legalinterdepartmentquery.caseid,
caseiddesc: res.legalinterdepartmentquery.caseiddesc,
idqid: res.legalinterdepartmentquery.idqid,
idqdate: this.ngbDateParserFormatter.parse(res.legalinterdepartmentquery.idqdate),
fromuser: res.legalinterdepartmentquery.fromuser,
fromuserdesc: res.legalinterdepartmentquery.fromuserdesc,
touser: JSON.parse(res.legalinterdepartmentquery.touser),
subject: res.legalinterdepartmentquery.subject,
description: res.legalinterdepartmentquery.description,
attachment: JSON.parse(res.legalinterdepartmentquery.attachment),
status: res.legalinterdepartmentquery.status,
statusdesc: res.legalinterdepartmentquery.statusdesc,
});
this.legalinterdepartmentqueryresponsesvisiblelist=res.legalinterdepartmentqueryresponsesvisiblelist;
if(this.legalinterdepartmentqueryForm.get('attachment').value!=null && this.legalinterdepartmentqueryForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalinterdepartmentqueryForm.get('attachment').value);
//Child Tables if any
this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses = res.legalinterdepartmentqueryresponses;
this.SetlegalinterdepartmentqueryresponsesTableConfig();
this.legalinterdepartmentqueryresponsesLoadTable();
  setTimeout(() => {
  this.SetlegalinterdepartmentqueryresponsesTableddConfig();
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
  for (let key in this.legalinterdepartmentqueryForm.controls) {
    if (this.legalinterdepartmentqueryForm.controls[key] != null) {
if(false)
{
if(this.legalinterdepartmentqueryservice.formData!=null && this.legalinterdepartmentqueryservice.formData[key]!=null  && this.legalinterdepartmentqueryservice.formData[key]!='[]' && this.legalinterdepartmentqueryservice.formData[key]!=undefined && this.legalinterdepartmentqueryservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalinterdepartmentqueryservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalinterdepartmentqueryservice.formData!=null && this.legalinterdepartmentqueryservice.formData[key]!=null   && this.legalinterdepartmentqueryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalinterdepartmentqueryservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalinterdepartmentqueryservice.formData!=null && this.legalinterdepartmentqueryservice.formData[key]!=null   && this.legalinterdepartmentqueryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalinterdepartmentqueryservice.formData[key]+"'><div class='progress__number'>"+this.legalinterdepartmentqueryservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalinterdepartmentqueryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalinterdepartmentqueryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalinterdepartmentqueryForm.value;
obj.idqdate=new Date(this.legalinterdepartmentqueryForm.get('idqdate').value ? this.ngbDateParserFormatter.format(this.legalinterdepartmentqueryForm.get('idqdate').value)+'  UTC' :null);
if(this.legalinterdepartmentqueryForm.get('touser').value!=null)obj.touser=JSON.stringify(this.legalinterdepartmentqueryForm.get('touser').value);
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

private legalinterdepartmentquerytoggleOption(){
this.legalinterdepartmentqueryshowOption = this.legalinterdepartmentqueryshowOption === true ? false : true;
}

private legalinterdepartmentqueryresponsetoggleOption(){
this.legalinterdepartmentqueryresponseshowOption = this.legalinterdepartmentqueryresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalinterdepartmentqueryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalinterdepartmentqueryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalinterdepartmentqueryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalinterdepartmentqueryservice.formData=this.legalinterdepartmentqueryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalinterdepartmentqueryForm.controls[key] != null)
    {
        this.legalinterdepartmentqueryservice.formData[key] = this.legalinterdepartmentqueryForm.controls[key].value;
    }
}
}
}
this.legalinterdepartmentqueryservice.formData.idqdate=new Date(this.legalinterdepartmentqueryForm.get('idqdate').value ? this.ngbDateParserFormatter.format(this.legalinterdepartmentqueryForm.get('idqdate').value)+'  UTC' :null);
if(this.legalinterdepartmentqueryForm.get('touser').value!=null)this.legalinterdepartmentqueryservice.formData.touser=JSON.stringify(this.legalinterdepartmentqueryForm.get('touser').value);
if(this.fileattachment.getattachmentlist()!=null)this.legalinterdepartmentqueryservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalinterdepartmentqueryservice.formData.DeletedlegalinterdepartmentqueryresponseIDs = this.DeletedlegalinterdepartmentqueryresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalinterdepartmentqueryservice.formData);
this.legalinterdepartmentqueryservice.formData=this.legalinterdepartmentqueryForm.value;
this.legalinterdepartmentqueryservice.saveOrUpdatelegalinterdepartmentqueries().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.legalinterdepartmentqueryresponsessource.data)
{
    for (let i = 0; i < this.legalinterdepartmentqueryresponsessource.data.length; i++)
    {
        if (this.legalinterdepartmentqueryresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalinterdepartmentqueryresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalinterdepartmentquery);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalinterdepartmentqueryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalinterdepartmentquery);
}
else
{
this.FillData(res);
}
}
this.legalinterdepartmentqueryForm.markAsUntouched();
this.legalinterdepartmentqueryForm.markAsPristine();
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
data: {caseid:this.legalinterdepartmentqueryForm.get('caseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfromuser( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.legalinterdepartmentqueryForm.get('fromuser').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlegalinterdepartmentqueryresponse(event:any,idqresponseid:any, idqid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalinterdepartmentqueryresponseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,idqresponseid, idqid,visiblelist:this.legalinterdepartmentqueryresponsesvisiblelist,  hidelist:this.legalinterdepartmentqueryresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalinterdepartmentqueryresponsessource.add(res);
this.legalinterdepartmentqueryresponsessource.refresh();
}
else
{
this.legalinterdepartmentqueryresponsessource.update(event.data, res);
}
}
});
}

onDeletelegalinterdepartmentqueryresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalinterdepartmentqueryresponseIDs += childID + ",";
this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legalinterdepartmentqueryresponses
legalinterdepartmentqueryresponsessettings:any;
legalinterdepartmentqueryresponsessource: any;

showlegalinterdepartmentqueryresponsesCheckbox()
{
debugger;
if(this.tbllegalinterdepartmentqueryresponsessource.settings['selectMode']== 'multi')this.tbllegalinterdepartmentqueryresponsessource.settings['selectMode']= 'single';
else
this.tbllegalinterdepartmentqueryresponsessource.settings['selectMode']= 'multi';
this.tbllegalinterdepartmentqueryresponsessource.initGrid();
}
deletelegalinterdepartmentqueryresponsesAll()
{
this.tbllegalinterdepartmentqueryresponsessource.settings['selectMode'] = 'single';
}
showlegalinterdepartmentqueryresponsesFilter()
{
  setTimeout(() => {
  this.SetlegalinterdepartmentqueryresponsesTableddConfig();
  });
      if(this.tbllegalinterdepartmentqueryresponsessource.settings!=null)this.tbllegalinterdepartmentqueryresponsessource.settings['hideSubHeader'] =!this.tbllegalinterdepartmentqueryresponsessource.settings['hideSubHeader'];
this.tbllegalinterdepartmentqueryresponsessource.initGrid();
}
showlegalinterdepartmentqueryresponsesInActive()
{
}
enablelegalinterdepartmentqueryresponsesInActive()
{
}
async SetlegalinterdepartmentqueryresponsesTableddConfig()
{
if(!this.bfilterPopulatelegalinterdepartmentqueryresponses){
}
this.bfilterPopulatelegalinterdepartmentqueryresponses=true;
}
async legalinterdepartmentqueryresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalinterdepartmentqueryresponsesTableConfig()
{
this.legalinterdepartmentqueryresponsessettings = {
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
caseid: {
title: 'Case',
type: 'number',
filter:true,
},
responsedate: {
title: 'Response Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
responseby: {
title: 'Response By',
type: 'number',
filter:true,
},
response: {
title: 'Response',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
legalinterdepartmentqueryresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalinterdepartmentqueryresponsesID)>=0)
{
this.legalinterdepartmentqueryresponsessource=new LocalDataSource();
this.legalinterdepartmentqueryresponsessource.load(this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses as  any as LocalDataSource);
this.legalinterdepartmentqueryresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalinterdepartmentqueryresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.length == 0)
{
    this.tbllegalinterdepartmentqueryresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new legalinterdepartmentqueryresponse();
    this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.push(obj);
    this.legalinterdepartmentqueryresponsessource.refresh();
    if ((this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.length / this.legalinterdepartmentqueryresponsessource.getPaging().perPage).toFixed(0) + 1 != this.legalinterdepartmentqueryresponsessource.getPaging().page)
    {
        this.legalinterdepartmentqueryresponsessource.setPage((this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.length / this.legalinterdepartmentqueryresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalinterdepartmentqueryresponsessource.grid.edit(this.tbllegalinterdepartmentqueryresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalinterdepartmentqueryresponsessource.data.indexOf(event.data);
this.onDeletelegalinterdepartmentqueryresponse(event,event.data.idqresponseid,((this.legalinterdepartmentqueryresponsessource.getPaging().page-1) *this.legalinterdepartmentqueryresponsessource.getPaging().perPage)+index);
this.legalinterdepartmentqueryresponsessource.refresh();
break;
}
}

*/
legalinterdepartmentqueryresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalinterdepartmentqueryresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalinterdepartmentqueryresponse(event,event.data.idqresponseid,this.formid);
break;
case 'delete':
this.onDeletelegalinterdepartmentqueryresponse(event,event.data.idqresponseid,((this.legalinterdepartmentqueryresponsessource.getPaging().page-1) *this.legalinterdepartmentqueryresponsessource.getPaging().perPage)+event.index);
this.legalinterdepartmentqueryresponsessource.refresh();
break;
}
}
legalinterdepartmentqueryresponsesonDelete(obj) {
let idqresponseid=obj.data.idqresponseid;
if (confirm('Are you sure to delete this record ?')) {
this.legalinterdepartmentqueryservice.deletelegalinterdepartmentquery(idqresponseid).then(res=>
this.legalinterdepartmentqueryresponsesLoadTable()
);
}
}
legalinterdepartmentqueryresponsesPaging(val)
{
debugger;
this.legalinterdepartmentqueryresponsessource.setPaging(1, val, true);
}

handlelegalinterdepartmentqueryresponsesGridSelected(event:any) {
this.legalinterdepartmentqueryresponsesselectedindex=this.legalinterdepartmentqueryservice.legalinterdepartmentqueryresponses.findIndex(i => i.idqresponseid === event.data.idqresponseid);
}
IslegalinterdepartmentqueryresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalinterdepartmentqueryresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalinterdepartmentqueryresponses

}



