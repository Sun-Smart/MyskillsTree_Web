import { cmsarticleService } from './../../../service/cmsarticle.service';
import { cmsarticle } from './../../../model/cmsarticle.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

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
//import { bousermasterComponent } from '../bousermaster/bousermaster.component';
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
selector: 'app-cmsarticle',
templateUrl: './cmsarticle.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class cmsarticleComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulatecmsarticles:boolean=false;
datacmsarticlestype3:any=[];
datacmsarticlesicon3:any=[];
datacmsarticlesauthor3:any=[];
datacmsarticleslanguage3:any=[];
 cmsarticleForm: FormGroup;
typeList: boconfigvalue[]=[];//dropdown
iconList: boconfigvalue[]=[];//dropdown
authorList: bousermaster[];//dropdown
authoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
author_bousermastersForm: FormGroup;//autocomplete
author_bousermastersoptions:any;//autocomplete
author_bousermastersformatter:any;//autocomplete
languageList: boconfigvalue[]=[];//dropdown
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
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private cmsarticleservice: cmsarticleService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.cmsarticleForm  = this.fb.group({pk:[null],ImageName: [null],
articleid: [null],
code: [null],
title: [null],
type: [null],
typedesc: [null],
keywords: [null],
icon: [null],
icondesc: [null],
summary: [null],
details: [null],
markpublic: [null],
author: [null],
authordesc: [null],
publisheddate: [null],
expirationdate: [null],
language: [null],
languagedesc: [null],
rating: [null],
notes: [null],
comments: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.cmsarticleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.cmsarticleForm.dirty && this.cmsarticleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.articleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.articleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.articleid && pkDetail) {
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

debugger;
let cmsarticleid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=cmsarticleid;
//this.sharedService.alert(cmsarticleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("articletype").then((res:any) => this.typeList = res as boconfigvalue[]);
this.configservice.getList("icon").then((res:any) => this.iconList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then((res:any) => 
{
this.authorList = res as bousermaster[];
if(this.formdata && this.formdata.cmsarticle && this.formdata.cmsarticle.author){
this.authoroptionsEvent.emit(this.authorList);
this.cmsarticleForm.patchValue({
    author: this.formdata.cmsarticle.author,
    authordesc: this.formdata.cmsarticle.authordesc,
});
}
}
);
this.author_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.authorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.author_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("language").then((res:any) => this.languageList = res as boconfigvalue[]);

//autocomplete
    this.cmsarticleservice.getcmsarticlesList().then((res:any) => {
      this.pkList = res as cmsarticle[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.cmsarticleForm.markAsUntouched();
this.cmsarticleForm.markAsPristine();
}
onSelectedauthor(authorDetail: any) {
if (authorDetail.author && authorDetail) {
this.cmsarticleForm.patchValue({
author: authorDetail.author,
authordesc: authorDetail.username,

});

}
}




resetForm() {
if (this.cmsarticleForm != null)
this.cmsarticleForm.reset();
this.cmsarticleForm.patchValue({
author: this.sessiondata.userid,
authordesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let articleid = this.cmsarticleForm.get('articleid').value;
        if(articleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.cmsarticleservice.deletecmsarticle(articleid).then((res:any) =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.cmsarticleForm.patchValue({
        articleid: null
    });
    if(this.cmsarticleservice.formData.articleid!=null)this.cmsarticleservice.formData.articleid=null;
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        else if(key=="publisheddate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="expirationdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.cmsarticleForm.controls[key]!=null)
{
this.cmsarticleForm.patchValue(json);
         if(bdisable)this.cmsarticleForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("cmsarticles",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
articleidonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.cmsarticleForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
keywordsonChange(evt:any){
let e=evt.value;
}
icononChange(evt:any){
let e=this.f.icon.value as any;
this.cmsarticleForm.patchValue({icondesc:evt.options[evt.options.selectedIndex].text});
}
summaryonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
markpubliconChange(evt:any){
let e=evt.value;
}
authoronChange(evt:any){
let e=evt.value;
}
publisheddateonChange(evt:any){
let e=evt.value;
}
expirationdateonChange(evt:any){
let e=evt.value;
}
languageonChange(evt:any){
let e=this.f.language.value as any;
this.cmsarticleForm.patchValue({languagedesc:evt.options[evt.options.selectedIndex].text});
}
ratingonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
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
  


async PopulateScreen(pkcol:any){this.cmsarticleservice.getcmsarticlesByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.cmsarticle.articleid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.cmsarticle.articleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.cmsarticleForm.patchValue({
articleid: res.cmsarticle.articleid,
code: res.cmsarticle.code,
title: res.cmsarticle.title,
type: res.cmsarticle.type,
typedesc: res.cmsarticle.typedesc,
keywords: res.cmsarticle.keywords,
icon: res.cmsarticle.icon,
icondesc: res.cmsarticle.icondesc,
summary: res.cmsarticle.summary,
details: res.cmsarticle.details,
markpublic: res.cmsarticle.markpublic,
author: res.cmsarticle.author,
authordesc: res.cmsarticle.authordesc,
publisheddate: this.ngbDateParserFormatter.parse(res.cmsarticle.publisheddate),
expirationdate: this.ngbDateParserFormatter.parse(res.cmsarticle.expirationdate),
language: res.cmsarticle.language,
languagedesc: res.cmsarticle.languagedesc,
rating: res.cmsarticle.rating,
notes: res.cmsarticle.notes,
comments: res.cmsarticle.comments,
customfield: res.cmsarticle.customfield,
attachment: res.cmsarticle.attachment,
status: res.cmsarticle.status,
statusdesc: res.cmsarticle.statusdesc,
});
if(this.cmsarticleForm.get('customfield').value!=null && this.cmsarticleForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.cmsarticleForm.get('customfield').value);
this.FillCustomField();
if(this.cmsarticleForm.get('attachment').value!=null && this.cmsarticleForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.cmsarticleForm.get('attachment').value));
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
  for (let key in this.cmsarticleForm.controls) {
    if (this.cmsarticleForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.cmsarticleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.cmsarticleForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.cmsarticleForm.value;
obj.publisheddate=this.ngbDateParserFormatter.format(this.cmsarticleForm.get('publisheddate').value);
obj.expirationdate=this.ngbDateParserFormatter.format(this.cmsarticleForm.get('expirationdate').value);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
this.dialogRef.close(obj);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.cmsarticleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.cmsarticleForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.cmsarticleForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.cmsarticleservice.formData=this.cmsarticleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.cmsarticleForm.controls[key] != null)
    {
        this.cmsarticleservice.formData[key] = this.cmsarticleForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.cmsarticleservice.formData.publisheddate=new Date(this.ngbDateParserFormatter.format(this.cmsarticleForm.get('publisheddate').value)+'  UTC');
this.cmsarticleservice.formData.expirationdate=new Date(this.ngbDateParserFormatter.format(this.cmsarticleForm.get('expirationdate').value)+'  UTC');
this.cmsarticleservice.formData.customfield=JSON.stringify(customfields);
this.cmsarticleservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.cmsarticleservice.formData);
this.cmsarticleservice.saveOrUpdatecmsarticles().subscribe(
async (res:any) => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.cmsarticle);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.cmsarticleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.cmsarticle);
}
else
{
this.FillData(res);
}
}
this.cmsarticleForm.markAsUntouched();
this.cmsarticleForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditauthor( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.cmsarticleForm.get('author').value, ScreenType:2 }
} 
).onClose.subscribe((res:any) => {
});*/
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



