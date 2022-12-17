import { prjprojectdeliverableService } from './../../../service/prjprojectdeliverable.service';
import { prjprojectdeliverable } from './../../../model/prjprojectdeliverable.model';
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
//detail table services
import { prjprojecttask } from './../../../model/prjprojecttask.model';
import { prjprojecttaskComponent } from './../../../pages/forms/prjprojecttask/prjprojecttask.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-prjprojectdeliverable',
templateUrl: './prjprojectdeliverable.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectdeliverableComponent implements OnInit {
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
bfilterPopulateprjprojectdeliverables:boolean=false;
dataprjprojecttasksworkdoneby3:any=[];
dataprjprojecttaskspriority3:any=[];
dataprjprojecttaskstasktype3:any=[];
dataprjprojecttaskscomplexity3:any=[];
dataprjprojecttaskstaskcategory3:any=[];
dataprjprojecttaskscolor3:any=[];
dataprjprojecttaskscolorcode3:any=[];
dataprjprojecttaskstaskstatus3:any=[];
bfilterPopulateprjprojecttasks:boolean=false;
bfilterPopulatebofacts:boolean=false;
@ViewChild('tblprjprojecttaskssource',{static:false}) tblprjprojecttaskssource: Ng2SmartTableComponent;
@ViewChild('tblbofactssource',{static:false}) tblbofactssource: Ng2SmartTableComponent;
 prjprojectdeliverableForm: FormGroup;
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
prjprojectdeliverableshowOption:boolean;
prjprojecttaskshowOption:boolean;
bofactshowOption:boolean;
sessiondata:any;
sourcekey:any;



prjprojecttasksvisiblelist:any;
prjprojecttaskshidelist:any;
bofactsvisiblelist:any;
bofactshidelist:any;

DeletedprjprojecttaskIDs: string="";
prjprojecttasksID: string = "1";
prjprojecttasksselectedindex:any;
DeletedbofactIDs: string="";
bofactsID: string = "2";
bofactsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjprojectdeliverableservice: prjprojectdeliverableService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.prjprojectdeliverableForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
deliverableid: [null],
deliverablename: [null],
targetshare: [null],
targetdate: [null],
sequence: [null],
notes: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
draft: [null],
});
}

get f() { return this.prjprojectdeliverableForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectdeliverableForm.dirty && this.prjprojectdeliverableForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.deliverableid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.deliverableid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.deliverableid && pkDetail) {
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
let prjprojectdeliverableid = null;

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
this.formid=prjprojectdeliverableid;
//this.sharedService.alert(prjprojectdeliverableid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetprjprojecttasksTableConfig();
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });

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

//autocomplete
    this.prjprojectdeliverableservice.getprjprojectdeliverablesList().then(res => {
      this.pkList = res as prjprojectdeliverable[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.deliverablename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.deliverablename;

//setting the flag that the screen is not touched 
this.prjprojectdeliverableForm.markAsUntouched();
this.prjprojectdeliverableForm.markAsPristine();
}



resetForm() {
if (this.prjprojectdeliverableForm != null)
this.prjprojectdeliverableForm.reset();
this.prjprojectdeliverableForm.patchValue({
});
setTimeout(() => {
this.prjprojectdeliverableservice.prjprojecttasks=[];
this.prjprojecttasksLoadTable();
this.prjprojectdeliverableservice.bofacts=[];
this.bofactsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let deliverableid = this.prjprojectdeliverableForm.get('deliverableid').value;
        if(deliverableid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectdeliverableservice.deleteprjprojectdeliverable(deliverableid).then(res =>
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
    this.prjprojectdeliverableForm.patchValue({
        deliverableid: null
    });
    if(this.prjprojectdeliverableservice.formData.deliverableid!=null)this.prjprojectdeliverableservice.formData.deliverableid=null;
for (let i=0;i<this.prjprojectdeliverableservice.prjprojecttasks.length;i++) {
this.prjprojectdeliverableservice.prjprojecttasks[i].taskid=null;
}
for (let i=0;i<this.prjprojectdeliverableservice.bofacts.length;i++) {
this.prjprojectdeliverableservice.bofacts[i].factid=null;
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
        else if(key=="targetdate")
this.prjprojectdeliverableForm.patchValue({"targetdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.prjprojectdeliverableForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectdeliverableForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectdeliverableForm.controls[key]!=undefined)
{
this.prjprojectdeliverableForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectdeliverables",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.prjprojectdeliverableservice.formData.deliverablename!=null )
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
  


editprjprojectdeliverables() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectdeliverableservice.getprjprojectdeliverablesByEID(pkcol).then(res => {

this.prjprojectdeliverableservice.formData=res.prjprojectdeliverable;
let formproperty=res.prjprojectdeliverable.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectdeliverable.pkcol;
this.formid=res.prjprojectdeliverable.deliverableid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectdeliverable.deliverableid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectdeliverableForm.patchValue({
projectid: res.prjprojectdeliverable.projectid,
deliverableid: res.prjprojectdeliverable.deliverableid,
deliverablename: res.prjprojectdeliverable.deliverablename,
targetshare: res.prjprojectdeliverable.targetshare,
targetdate: this.ngbDateParserFormatter.parse(res.prjprojectdeliverable.targetdate),
sequence: res.prjprojectdeliverable.sequence,
notes: res.prjprojectdeliverable.notes,
customfield: res.prjprojectdeliverable.customfield,
attachment: JSON.parse(res.prjprojectdeliverable.attachment),
status: res.prjprojectdeliverable.status,
statusdesc: res.prjprojectdeliverable.statusdesc,
draft: res.prjprojectdeliverable.draft,
});
this.prjprojecttasksvisiblelist=res.prjprojecttasksvisiblelist;
this.bofactsvisiblelist=res.bofactsvisiblelist;
if(this.prjprojectdeliverableForm.get('customfield').value!=null && this.prjprojectdeliverableForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojectdeliverableForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectdeliverableForm.get('attachment').value!=null && this.prjprojectdeliverableForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectdeliverableForm.get('attachment').value);
//Child Tables if any
this.prjprojectdeliverableservice.prjprojecttasks = res.prjprojecttasks;
this.SetprjprojecttasksTableConfig();
this.prjprojecttasksLoadTable();
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });
this.prjprojectdeliverableservice.bofacts = res.bofacts;
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
  for (let key in this.prjprojectdeliverableForm.controls) {
    if (this.prjprojectdeliverableForm.controls[key] != null) {
if(false)
{
if(this.prjprojectdeliverableservice.formData!=null && this.prjprojectdeliverableservice.formData[key]!=null  && this.prjprojectdeliverableservice.formData[key]!='[]' && this.prjprojectdeliverableservice.formData[key]!=undefined && this.prjprojectdeliverableservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectdeliverableservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectdeliverableservice.formData!=null && this.prjprojectdeliverableservice.formData[key]!=null   && this.prjprojectdeliverableservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectdeliverableservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectdeliverableservice.formData!=null && this.prjprojectdeliverableservice.formData[key]!=null   && this.prjprojectdeliverableservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectdeliverableservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectdeliverableservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectdeliverableForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectdeliverableForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectdeliverableForm.value;
obj.targetdate=new Date(this.prjprojectdeliverableForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.prjprojectdeliverableForm.get('targetdate').value)+'  UTC' :null);
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

private prjprojectdeliverabletoggleOption(){
this.prjprojectdeliverableshowOption = this.prjprojectdeliverableshowOption === true ? false : true;
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
Object.keys(this.prjprojectdeliverableForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectdeliverableForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectdeliverableForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectdeliverableservice.formData=this.prjprojectdeliverableForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectdeliverableForm.controls[key] != null)
    {
        this.prjprojectdeliverableservice.formData[key] = this.prjprojectdeliverableForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.prjprojectdeliverableservice.formData.targetdate=new Date(this.prjprojectdeliverableForm.get('targetdate').value ? this.ngbDateParserFormatter.format(this.prjprojectdeliverableForm.get('targetdate').value)+'  UTC' :null);
if(customfields!=null)this.prjprojectdeliverableservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojectdeliverableservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.prjprojectdeliverableservice.formData.DeletedprjprojecttaskIDs = this.DeletedprjprojecttaskIDs;
this.prjprojectdeliverableservice.formData.DeletedbofactIDs = this.DeletedbofactIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojectdeliverableservice.formData);
this.prjprojectdeliverableservice.formData=this.prjprojectdeliverableForm.value;
this.prjprojectdeliverableservice.saveOrUpdateprjprojectdeliverables().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.prjprojecttaskssource.data)
{
    for (let i = 0; i < this.prjprojecttaskssource.data.length; i++)
    {
        if (this.prjprojecttaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojecttaskssource.data[i].fileattachmentlist);
    }
}
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
this.dialogRef.close((res as any).prjprojectdeliverable);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectdeliverableservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectdeliverable);
}
else
{
this.FillData(res);
}
}
this.prjprojectdeliverableForm.markAsUntouched();
this.prjprojectdeliverableForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprjprojecttask(event:any,taskid:any, deliverableid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojecttaskComponent, 
{
data:  {  showview:false,save:false,event,taskid, deliverableid,visiblelist:this.prjprojecttasksvisiblelist,  hidelist:this.prjprojecttaskshidelist,ScreenType:2,deliverableid:this.prjprojectdeliverableForm.get('deliverableid').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojecttaskssource.add(res);
this.prjprojecttaskssource.refresh();
}
else
{
this.prjprojecttaskssource.update(event.data, res);
}
}
});
}

onDeleteprjprojecttask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojecttaskIDs += childID + ",";
this.prjprojectdeliverableservice.prjprojecttasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditbofact(event:any,factid:any, deliverableid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bofactComponent, 
{
data:  {  showview:false,save:false,event,factid, deliverableid,visiblelist:this.bofactsvisiblelist,  hidelist:this.bofactshidelist,ScreenType:2  },
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
this.prjprojectdeliverableservice.bofacts.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes prjprojecttasks
prjprojecttaskssettings:any;
prjprojecttaskssource: any;

showprjprojecttasksCheckbox()
{
debugger;
if(this.tblprjprojecttaskssource.settings['selectMode']== 'multi')this.tblprjprojecttaskssource.settings['selectMode']= 'single';
else
this.tblprjprojecttaskssource.settings['selectMode']= 'multi';
this.tblprjprojecttaskssource.initGrid();
}
deleteprjprojecttasksAll()
{
this.tblprjprojecttaskssource.settings['selectMode'] = 'single';
}
showprjprojecttasksFilter()
{
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });
      if(this.tblprjprojecttaskssource.settings!=null)this.tblprjprojecttaskssource.settings['hideSubHeader'] =!this.tblprjprojecttaskssource.settings['hideSubHeader'];
this.tblprjprojecttaskssource.initGrid();
}
showprjprojecttasksInActive()
{
}
enableprjprojecttasksInActive()
{
}
async SetprjprojecttasksTableddConfig()
{
if(!this.bfilterPopulateprjprojecttasks){

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.dataprjprojecttaskspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskspriority3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("complexity").then(res=>
{
var datacomplexity2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskscomplexity3.push(defaultobj);
for(let i=0; i<datacomplexity2.length; i++){
var obj= { value: datacomplexity2[i].configkey, title: datacomplexity2[i].configtext};
this.dataprjprojecttaskscomplexity3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['complexity']!=undefined)clone.columns['complexity'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscomplexity3)), }, };
if(clone.columns['complexity']!=undefined)clone.columns['complexity'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscomplexity3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("taskcategory").then(res=>
{
var datataskcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstaskcategory3.push(defaultobj);
for(let i=0; i<datataskcategory2.length; i++){
var obj= { value: datataskcategory2[i].configkey, title: datataskcategory2[i].configtext};
this.dataprjprojecttaskstaskcategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskcategory3)), }, };
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskcategory3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("tasktype").then(res=>
{
var datatasktype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstasktype3.push(defaultobj);
for(let i=0; i<datatasktype2.length; i++){
var obj= { value: datatasktype2[i].configkey, title: datatasktype2[i].configtext};
this.dataprjprojecttaskstasktype3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['tasktype']!=undefined)clone.columns['tasktype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstasktype3)), }, };
if(clone.columns['tasktype']!=undefined)clone.columns['tasktype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstasktype3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("colorcode").then(res=>
{
var datacolorcode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskscolorcode3.push(defaultobj);
for(let i=0; i<datacolorcode2.length; i++){
var obj= { value: datacolorcode2[i].configkey, title: datacolorcode2[i].configtext};
this.dataprjprojecttaskscolorcode3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['colorcode']!=undefined)clone.columns['colorcode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscolorcode3)), }, };
if(clone.columns['colorcode']!=undefined)clone.columns['colorcode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscolorcode3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("taskstatus").then(res=>
{
var datataskstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstaskstatus3.push(defaultobj);
for(let i=0; i<datataskstatus2.length; i++){
var obj= { value: datataskstatus2[i].configkey, title: datataskstatus2[i].configtext};
this.dataprjprojecttaskstaskstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskstatus3)), }, };
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskstatus3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});
}
this.bfilterPopulateprjprojecttasks=true;
}
async prjprojecttasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojecttasksTableConfig()
{
this.prjprojecttaskssettings = {
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
projectid: {
title: 'Project',
type: 'number',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:true,
},
taskcode: {
title: 'Task Code',
type: '',
filter:true,
},
taskname: {
title: 'Task Name',
type: '',
filter:true,
},
storypoints: {
title: 'Story Points',
type: 'number',
filter:true,
},
feedbacktags: {
title: 'Feedback Tags',
type: '',
filter:true,
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
issues: {
title: 'Issues',
type: '',
filter:true,
},
milestone: {
title: 'Mile Stone',
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
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
assignedto: {
title: 'Assigned To',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
workdoneby: {
title: 'Work Done By',
type: 'number',
filter:true,
},
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
complexity: {
title: 'Complexity',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskscomplexity3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
taskcategory: {
title: 'Task Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstaskcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
tasktype: {
title: 'Task Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstasktype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
activitytype: {
title: 'Activity Type',
type: 'number',
filter:true,
},
isbillable: {
title: 'Is Billable',
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
colorcode: {
title: 'Color Code',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskscolorcode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
parenttasks: {
title: 'Parent Tasks',
type: '',
filter:true,
},
dependenttasks: {
title: 'Dependent Tasks',
type: '',
filter:true,
},
taskstatus: {
title: 'Task Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstaskstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
actualworkdone: {
title: 'Actual Work Done',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actualstartdate: {
title: 'Actual Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualenddate: {
title: 'Actual End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
estimatedpercentage: {
title: 'Estimated Percentage',
type: 'number',
filter:true,
},
completionpercentage: {
title: 'Completion Percentage',
type: 'number',
filter:true,
},
estimatedeffort: {
title: 'Estimated Effort',
type: '',
filter:true,
},
actualeffort: {
title: 'Actual Effort',
type: '',
filter:true,
},
utilizationpercentage: {
title: 'Utilization Percentage',
type: 'number',
filter:true,
},
labourbudget: {
title: 'Labour Budget',
type: 'number',
filter:true,
},
labouractual: {
title: 'Labour Actual',
type: 'number',
filter:true,
},
predecessor: {
title: 'Predecessor',
type: '',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
feedbacknotes: {
title: 'Feedback Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
draft: {
title: 'Draft',
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
outputid: {
title: 'Output',
type: 'number',
filter:true,
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
prjprojecttasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojecttasksID)>=0)
{
this.prjprojecttaskssource=new LocalDataSource();
this.prjprojecttaskssource.load(this.prjprojectdeliverableservice.prjprojecttasks as  any as LocalDataSource);
this.prjprojecttaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojecttasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectdeliverableservice.prjprojecttasks.length == 0)
{
    this.tblprjprojecttaskssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojecttask();
    this.prjprojectdeliverableservice.prjprojecttasks.push(obj);
    this.prjprojecttaskssource.refresh();
    if ((this.prjprojectdeliverableservice.prjprojecttasks.length / this.prjprojecttaskssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojecttaskssource.getPaging().page)
    {
        this.prjprojecttaskssource.setPage((this.prjprojectdeliverableservice.prjprojecttasks.length / this.prjprojecttaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojecttaskssource.grid.edit(this.tblprjprojecttaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojecttaskssource.data.indexOf(event.data);
this.onDeleteprjprojecttask(event,event.data.taskid,((this.prjprojecttaskssource.getPaging().page-1) *this.prjprojecttaskssource.getPaging().perPage)+index);
this.prjprojecttaskssource.refresh();
break;
}
}

*/
prjprojecttasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojecttask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojecttask(event,event.data.taskid,this.formid);
break;
case 'delete':
this.onDeleteprjprojecttask(event,event.data.taskid,((this.prjprojecttaskssource.getPaging().page-1) *this.prjprojecttaskssource.getPaging().perPage)+event.index);
this.prjprojecttaskssource.refresh();
break;
}
}
prjprojecttasksonDelete(obj) {
let taskid=obj.data.taskid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectdeliverableservice.deleteprjprojectdeliverable(taskid).then(res=>
this.prjprojecttasksLoadTable()
);
}
}
prjprojecttasksPaging(val)
{
debugger;
this.prjprojecttaskssource.setPaging(1, val, true);
}

handleprjprojecttasksGridSelected(event:any) {
this.prjprojecttasksselectedindex=this.prjprojectdeliverableservice.prjprojecttasks.findIndex(i => i.taskid === event.data.taskid);
}
IsprjprojecttasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojecttasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojecttasks
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
this.bofactssource.load(this.prjprojectdeliverableservice.bofacts as  any as LocalDataSource);
this.bofactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bofactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectdeliverableservice.bofacts.length == 0)
{
    this.tblbofactssource.grid.createFormShown = true;
}
else
{
    let obj = new bofact();
    this.prjprojectdeliverableservice.bofacts.push(obj);
    this.bofactssource.refresh();
    if ((this.prjprojectdeliverableservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1 != this.bofactssource.getPaging().page)
    {
        this.bofactssource.setPage((this.prjprojectdeliverableservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1);
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
this.prjprojectdeliverableservice.deleteprjprojectdeliverable(factid).then(res=>
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
this.bofactsselectedindex=this.prjprojectdeliverableservice.bofacts.findIndex(i => i.factid === event.data.factid);
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



