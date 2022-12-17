import { bokbmasterService } from './../../../service/bokbmaster.service';
import { bokbmaster } from './../../../model/bokbmaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bomasterdata} from './../../../model/bomasterdata.model';
import { bomasterdataService } from './../../../service/bomasterdata.service';
//popups
import { bosubcategorymaster} from './../../../model/bosubcategorymaster.model';
import { bosubcategorymasterService } from './../../../service/bosubcategorymaster.service';
//popups
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
//popups
//detail table services
import { bokbaccess } from './../../../model/bokbaccess.model';
//FK services
import { bousergroupComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousergroup/bousergroup.component';
import { bousergroupService } from './../../../service/bousergroup.service';
import { bokbtopic } from './../../../model/bokbtopic.model';
//FK services
import { bokbtopicComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bokbtopic/bokbtopic.component';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-bokbmaster',
templateUrl: './bokbmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bokbmasterComponent implements OnInit {
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
bfilterPopulatebokbmasters:boolean=false;
databokbmasterskbcategory3:any=[];
databokbmasterskbsubcategory3:any=[];
databokbmastersicon3:any=[];
databokbmastersauthor3:any=[];
databokbmasterslanguage3:any=[];
bfilterPopulatebokbaccesses:boolean=false;
bfilterPopulatebokbtopics:boolean=false;
@ViewChild('tblbokbaccessessource',{static:false}) tblbokbaccessessource: Ng2SmartTableComponent;
@ViewChild('tblbokbtopicssource',{static:false}) tblbokbtopicssource: Ng2SmartTableComponent;
 bokbmasterForm: FormGroup;
kbcategoryList: bomasterdata[];
kbsubcategoryList: bosubcategorymaster[];
iconList: boconfigvalue[];
authorList: bousermaster[];
authoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
author_bousermastersForm: FormGroup;//autocomplete
author_bousermastersoptions:any;//autocomplete
author_bousermastersformatter:any;//autocomplete
languageList: boconfigvalue[];
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



bokbaccessesvisiblelist:any;
bokbaccesseshidelist:any;
bokbtopicsvisiblelist:any;
bokbtopicshidelist:any;

DeletedbokbaccessIDs: string="";
bokbaccessesID: string = "1";
bokbaccessesselectedindex:any;
DeletedbokbtopicIDs: string="";
bokbtopicsID: string = "2";
bokbtopicsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bokbmasterservice: bokbmasterService,
private bousergroupservice: bousergroupService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.bokbmasterForm  = this.fb.group({pk:[null],ImageName: [null],
kbid: [null],
kbcode: [null],
kbsubject: [null, Validators.required],
kbcategory: [null],
kbcategorydesc: [null],
kbsubcategory: [null],
kbsubcategorydesc: [null],
tags: [null],
icon: [null],
icondesc: [null],
summary: [null],
kbdetails: [null, Validators.required],
markpublic: [null],
author: [null],
authordesc: [null],
publisheddate: [null],
expirationdate: [null],
language: [null],
languagedesc: [null],
rating: [null],
comments: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bokbmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bokbmasterForm.dirty && this.bokbmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.kbid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.kbid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.kbid && pkDetail) {
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
let bokbmasterid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=bokbmasterid;
//this.sharedService.alert(bokbmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbokbaccessesTableConfig();
  setTimeout(() => {
  this.SetbokbaccessesTableddConfig();
  });

this.SetbokbtopicsTableConfig();
  setTimeout(() => {
  this.SetbokbtopicsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("y5q97").then(res => {
this.kbcategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bosubcategorymasterservice.getbosubcategorymastersList().then(res => 
{
this.kbsubcategoryList = res as bosubcategorymaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("icon").then(res => this.iconList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.authorList = res as bousermaster[];
if(this.bokbmasterservice.formData && this.bokbmasterservice.formData.author){
this.authoroptionsEvent.emit(this.authorList);
this.bokbmasterForm.patchValue({
    author: this.bokbmasterservice.formData.author,
    authordesc: this.bokbmasterservice.formData.authordesc,
});
}
{
let arrauthor = this.authorList.filter(v => v.userid == this.bokbmasterForm.get('author').value);
let objauthor;
if (arrauthor.length > 0) objauthor = arrauthor[0];
if (objauthor)
{
}
}
}
).catch((err) => {console.log(err);});
this.author_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.authorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.author_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("language").then(res => this.languageList = res as boconfigvalue[]);

//autocomplete
    this.bokbmasterservice.getbokbmastersList().then(res => {
      this.pkList = res as bokbmaster[];
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
this.bokbmasterForm.markAsUntouched();
this.bokbmasterForm.markAsPristine();
}
onSelectedauthor(authorDetail: any) {
if (authorDetail.author && authorDetail) {
this.bokbmasterForm.patchValue({
author: authorDetail.author,
authordesc: authorDetail.username,

});

}
}




resetForm() {
if (this.bokbmasterForm != null)
this.bokbmasterForm.reset();
this.bokbmasterForm.patchValue({
author: this.sessiondata.userid,
authordesc: this.sessiondata.username,
});
setTimeout(() => {
this.bokbmasterservice.bokbaccesses=[];
this.bokbmasterservice.Insertbokbaccesses=[];
this.bokbaccessesLoadTable();
this.bokbmasterservice.bokbtopics=[];
this.bokbtopicsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let kbid = this.bokbmasterForm.get('kbid').value;
        if(kbid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bokbmasterservice.deletebokbmaster(kbid).then(res =>
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
    this.bokbmasterForm.patchValue({
        kbid: null
    });
    if(this.bokbmasterservice.formData.kbid!=null)this.bokbmasterservice.formData.kbid=null;
for (let i=0;i<this.bokbmasterservice.bokbaccesses.length;i++) {
this.bokbmasterservice.bokbaccesses[i].accessid=null;
}
for (let i=0;i<this.bokbmasterservice.bokbtopics.length;i++) {
this.bokbmasterservice.bokbtopics[i].kbtopicid=null;
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
        else if(key=="publisheddate")
this.bokbmasterForm.patchValue({"publisheddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirationdate")
this.bokbmasterForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.bokbmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bokbmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bokbmasterForm.controls[key]!=undefined)this.bokbmasterForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bokbmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
kbidonChange(evt:any){
let e=evt.value;
}
kbcodeonChange(evt:any){
let e=evt.value;
}
kbsubjectonChange(evt:any){
let e=evt.value;
}
kbcategoryonChange(evt:any){
let e=evt.value;
this.bokbmasterForm.patchValue({kbcategorydesc:evt.options[evt.options.selectedIndex].text});
}
kbsubcategoryonChange(evt:any){
let e=evt.value;
this.bokbmasterForm.patchValue({kbsubcategorydesc:evt.options[evt.options.selectedIndex].text});
}
tagsonChange(evt:any){
let e=evt.value;
}
icononChange(evt:any){
let e=this.f.icon.value as any;
this.bokbmasterForm.patchValue({icondesc:evt.options[evt.options.selectedIndex].text});
}
summaryonChange(evt:any){
let e=evt.value;
}
kbdetailsonChange(evt:any){
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
this.bokbmasterForm.patchValue({languagedesc:evt.options[evt.options.selectedIndex].text});
}
ratingonChange(evt:any){
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
  


async PopulateScreen(pkcol:any){
this.bokbmasterservice.getbokbmastersByEID(pkcol).then(res => {

this.bokbmasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bokbmaster.kbid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bokbmaster.kbid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bokbmasterForm.patchValue({
kbid: res.bokbmaster.kbid,
kbcode: res.bokbmaster.kbcode,
kbsubject: res.bokbmaster.kbsubject,
kbcategory: res.bokbmaster.kbcategory,
kbcategorydesc: res.bokbmaster.kbcategorydesc,
kbsubcategory: res.bokbmaster.kbsubcategory,
kbsubcategorydesc: res.bokbmaster.kbsubcategorydesc,
tags: res.bokbmaster.tags,
icon: res.bokbmaster.icon,
icondesc: res.bokbmaster.icondesc,
summary: res.bokbmaster.summary,
kbdetails: res.bokbmaster.kbdetails,
markpublic: res.bokbmaster.markpublic,
author: res.bokbmaster.author,
authordesc: res.bokbmaster.authordesc,
publisheddate: this.ngbDateParserFormatter.parse(res.bokbmaster.publisheddate),
expirationdate: this.ngbDateParserFormatter.parse(res.bokbmaster.expirationdate),
language: res.bokbmaster.language,
languagedesc: res.bokbmaster.languagedesc,
rating: res.bokbmaster.rating,
comments: res.bokbmaster.comments,
customfield: res.bokbmaster.customfield,
attachment: res.bokbmaster.attachment,
status: res.bokbmaster.status,
statusdesc: res.bokbmaster.statusdesc,
});
this.bokbaccessesvisiblelist=res.bokbaccessesvisiblelist;
this.bokbtopicsvisiblelist=res.bokbtopicsvisiblelist;
if(this.bokbmasterForm.get('customfield').value!=null && this.bokbmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bokbmasterForm.get('customfield').value);
this.FillCustomField();
if(this.bokbmasterForm.get('attachment').value!=null && this.bokbmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.bokbmasterForm.get('attachment').value));
//Child Tables if any
this.bokbmasterservice.bokbaccesses = res.bokbaccesses;
this.SetbokbaccessesTableConfig();
this.bokbaccessesLoadTable();
  setTimeout(() => {
  this.SetbokbaccessesTableddConfig();
  });
this.bokbmasterservice.Insertbokbaccesses=[];
this.bokbmasterservice.bokbtopics = res.bokbtopics;
this.SetbokbtopicsTableConfig();
this.bokbtopicsLoadTable();
  setTimeout(() => {
  this.SetbokbtopicsTableddConfig();
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
  for (let key in this.bokbmasterForm.controls) {
    if (this.bokbmasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bokbmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bokbmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bokbmasterForm.value;
obj.publisheddate=new Date(this.bokbmasterForm.get('publisheddate').value ? this.ngbDateParserFormatter.format(this.bokbmasterForm.get('publisheddate').value)+'  UTC' :null);
obj.expirationdate=new Date(this.bokbmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.bokbmasterForm.get('expirationdate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bokbmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bokbmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bokbmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bokbmasterservice.formData=this.bokbmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bokbmasterForm.controls[key] != null)
    {
        this.bokbmasterservice.formData[key] = this.bokbmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bokbmasterservice.formData.publisheddate=new Date(this.bokbmasterForm.get('publisheddate').value ? this.ngbDateParserFormatter.format(this.bokbmasterForm.get('publisheddate').value)+'  UTC' :null);
this.bokbmasterservice.formData.expirationdate=new Date(this.bokbmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.bokbmasterForm.get('expirationdate').value)+'  UTC' :null);
this.bokbmasterservice.formData.customfield=JSON.stringify(customfields);
this.bokbmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.bokbmasterservice.formData.DeletedbokbaccessIDs = this.DeletedbokbaccessIDs;
this.bokbmasterservice.formData.DeletedbokbtopicIDs = this.DeletedbokbtopicIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bokbmasterservice.formData);
this.bokbmasterservice.formData=this.bokbmasterForm.value;
this.bokbmasterservice.saveOrUpdatebokbmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bokbaccessessource.data)
{
    for (let i = 0; i < this.bokbaccessessource.data.length; i++)
    {
        if (this.bokbaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bokbaccessessource.data[i].fileattachmentlist);
    }
}
if (this.bokbtopicssource.data)
{
    for (let i = 0; i < this.bokbtopicssource.data.length; i++)
    {
        if (this.bokbtopicssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bokbtopicssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bokbmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bokbmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bokbmaster);
}
else
{
this.FillData(res);
}
}
this.bokbmasterForm.markAsUntouched();
this.bokbmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditkbcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bokbmasterForm.get('kbcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditkbsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.bokbmasterForm.get('kbsubcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditauthor( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bokbmasterForm.get('author').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbokbtopic(event:any,kbtopicid:any, kbid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bokbtopicComponent, 
{
data:  {  showview:this.showview,save:false,event,kbtopicid, kbid,visiblelist:this.bokbtopicsvisiblelist,  hidelist:this.bokbtopicshidelist,ScreenType:2  },
header: 'Topics'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bokbtopicssource.add(res);
this.bokbtopicssource.refresh();
}
else
{
this.bokbtopicssource.update(event.data, res);
}
}
});
}

onDeletebokbtopic(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbokbtopicIDs += childID + ",";
this.bokbmasterservice.bokbtopics.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bokbaccesses
onCustombokbaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bousergroupComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bousergroup details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bokbaccessessettings:any;
bokbaccessessource: any;

showbokbaccessesCheckbox()
{
debugger;
if(this.tblbokbaccessessource.settings['selectMode']== 'multi')this.tblbokbaccessessource.settings['selectMode']= 'single';
else
this.tblbokbaccessessource.settings['selectMode']= 'multi';
this.tblbokbaccessessource.initGrid();
}
deletebokbaccessesAll()
{
this.tblbokbaccessessource.settings['selectMode'] = 'single';
}
showbokbaccessesFilter()
{
  setTimeout(() => {
  this.SetbokbaccessesTableddConfig();
  });
      if(this.tblbokbaccessessource.settings!=null)this.tblbokbaccessessource.settings['hideSubHeader'] =!this.tblbokbaccessessource.settings['hideSubHeader'];
this.tblbokbaccessessource.initGrid();
}
showbokbaccessesInActive()
{
}
enablebokbaccessesInActive()
{
}
async SetbokbaccessesTableddConfig()
{
if(!this.bfilterPopulatebokbaccesses){
}
this.bfilterPopulatebokbaccesses=true;
}
async bokbaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbokbaccessesTableConfig()
{
this.bokbaccessessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
accessid: {
title: 'Access',
type: '',
},
usergroupid: {
title: 'User Group',
type: '',
},
groupname: {
title: 'Groupname',
type: '',
},
},
};
}
bokbaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bokbaccessesID)>=0)
{
this.bokbaccessessource=new LocalDataSource();
this.bokbaccessessource.load(this.bokbmasterservice.bokbaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbokbaccessessource!=null)
{this.tblbokbaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.bokbmasterservice.Insertbokbaccesses.push(row.data);
this.tblbokbaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bokbaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bokbmasterservice.bokbaccesses.length == 0)
{
    this.tblbokbaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new bokbaccess();
    this.bokbmasterservice.bokbaccesses.push(obj);
    this.bokbaccessessource.refresh();
    if ((this.bokbmasterservice.bokbaccesses.length / this.bokbaccessessource.getPaging().perPage).toFixed(0) + 1 != this.bokbaccessessource.getPaging().page)
    {
        this.bokbaccessessource.setPage((this.bokbmasterservice.bokbaccesses.length / this.bokbaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbokbaccessessource.grid.edit(this.tblbokbaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bokbaccessessource.data.indexOf(event.data);
this.onDeletebokbaccess(event,event.data.accessid,((this.bokbaccessessource.getPaging().page-1) *this.bokbaccessessource.getPaging().perPage)+index);
this.bokbaccessessource.refresh();
break;
}
}

*/
bokbaccessesPaging(val)
{
debugger;
this.bokbaccessessource.setPaging(1, val, true);
}

handlebokbaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={kbid:this.formid,usergroupid:event.data.usergroupid}
this.bokbmasterservice.Insertbokbaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedbokbaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.accessid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.accessid!=null && event.data.accessid!="")this.DeletedbokbaccessIDs += event.data.accessid + ","; 
}
}
IsbokbaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bokbaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bokbaccesses
//start of Grid Codes bokbtopics
bokbtopicssettings:any;
bokbtopicssource: any;

showbokbtopicsCheckbox()
{
debugger;
if(this.tblbokbtopicssource.settings['selectMode']== 'multi')this.tblbokbtopicssource.settings['selectMode']= 'single';
else
this.tblbokbtopicssource.settings['selectMode']= 'multi';
this.tblbokbtopicssource.initGrid();
}
deletebokbtopicsAll()
{
this.tblbokbtopicssource.settings['selectMode'] = 'single';
}
showbokbtopicsFilter()
{
  setTimeout(() => {
  this.SetbokbtopicsTableddConfig();
  });
      if(this.tblbokbtopicssource.settings!=null)this.tblbokbtopicssource.settings['hideSubHeader'] =!this.tblbokbtopicssource.settings['hideSubHeader'];
this.tblbokbtopicssource.initGrid();
}
showbokbtopicsInActive()
{
}
enablebokbtopicsInActive()
{
}
async SetbokbtopicsTableddConfig()
{
if(!this.bfilterPopulatebokbtopics){
}
this.bfilterPopulatebokbtopics=true;
}
async bokbtopicsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbokbtopicsTableConfig()
{
this.bokbtopicssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
description: {
title: 'Description',
type: '',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
contenttype: {
title: 'Content Type',
type: '',
filter:true,
},
contenttext: {
title: 'Content Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
contenturl: {
title: 'Content U R L',
type: '',
filter:true,
},
},
};
}
bokbtopicsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bokbtopicsID)>=0)
{
this.bokbtopicssource=new LocalDataSource();
this.bokbtopicssource.load(this.bokbmasterservice.bokbtopics as  any as LocalDataSource);
this.bokbtopicssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bokbtopicsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bokbmasterservice.bokbtopics.length == 0)
{
    this.tblbokbtopicssource.grid.createFormShown = true;
}
else
{
    let obj = new bokbtopic();
    this.bokbmasterservice.bokbtopics.push(obj);
    this.bokbtopicssource.refresh();
    if ((this.bokbmasterservice.bokbtopics.length / this.bokbtopicssource.getPaging().perPage).toFixed(0) + 1 != this.bokbtopicssource.getPaging().page)
    {
        this.bokbtopicssource.setPage((this.bokbmasterservice.bokbtopics.length / this.bokbtopicssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbokbtopicssource.grid.edit(this.tblbokbtopicssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bokbtopicssource.data.indexOf(event.data);
this.onDeletebokbtopic(event,event.data.kbtopicid,((this.bokbtopicssource.getPaging().page-1) *this.bokbtopicssource.getPaging().perPage)+index);
this.bokbtopicssource.refresh();
break;
}
}

*/
bokbtopicsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbokbtopic(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbokbtopic(event,event.data.kbtopicid,this.formid);
break;
case 'delete':
this.onDeletebokbtopic(event,event.data.kbtopicid,((this.bokbtopicssource.getPaging().page-1) *this.bokbtopicssource.getPaging().perPage)+event.index);
this.bokbtopicssource.refresh();
break;
}
}
bokbtopicsonDelete(obj) {
let kbtopicid=obj.data.kbtopicid;
if (confirm('Are you sure to delete this record ?')) {
this.bokbmasterservice.deletebokbmaster(kbtopicid).then(res=>
this.bokbtopicsLoadTable()
);
}
}
bokbtopicsPaging(val)
{
debugger;
this.bokbtopicssource.setPaging(1, val, true);
}

handlebokbtopicsGridSelected(event:any) {
this.bokbtopicsselectedindex=this.bokbmasterservice.bokbtopics.findIndex(i => i.kbtopicid === event.data.kbtopicid);
}
IsbokbtopicsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bokbtopicsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bokbtopics

}



