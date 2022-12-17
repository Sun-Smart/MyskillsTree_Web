import { boremindermasterService } from './../../../service/boremindermaster.service';
import { boremindermaster } from './../../../model/boremindermaster.model';
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
//detail table services
import { boreminderuser } from './../../../model/boreminderuser.model';
//FK services
import { boreminderuserComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreminderuser/boreminderuser.component';
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
selector: 'app-boremindermaster',
templateUrl: './boremindermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boremindermasterComponent implements OnInit {
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
bfilterPopulateboremindermasters:boolean=false;
databoremindermasterscategoryid3:any=[];
databoremindermasterssubcategoryid3:any=[];
databoremindermasterspriority3:any=[];
databoremindermastersreminderusertype3:any=[];
databoremindermastersscheduletype3:any=[];
databoremindermastersreminderdaysbefore3:any=[];
bfilterPopulateboreminderusers:boolean=false;
@ViewChild('tblboreminderuserssource',{static:false}) tblboreminderuserssource: Ng2SmartTableComponent;
 boremindermasterForm: FormGroup;
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
priorityList: boconfigvalue[];
reminderusertypeList: boconfigvalue[];
scheduletypeList: boconfigvalue[];
reminderdaysbeforeList: boconfigvalue[];
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



boreminderusersvisiblelist:any;
boreminderusershidelist:any;

DeletedboreminderuserIDs: string="";
boreminderusersID: string = "1";
boreminderusersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boremindermasterservice: boremindermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.boremindermasterForm  = this.fb.group({pk:[null],ImageName: [null],
remindermasterid: [null],
sourcefield: [null],
sourcereference: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
priority: [null],
prioritydesc: [null],
reminderdate: [null],
remindertime: [null],
remindertext: [null],
reminderusertype: [null],
reminderusertypedesc: [null],
scheduletype: [null],
scheduletypedesc: [null],
reminderdaysbefore: [null],
reminderdaysbeforedesc: [null],
alarm: [null],
notes: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boremindermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boremindermasterForm.dirty && this.boremindermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.remindermasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.remindermasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.remindermasterid && pkDetail) {
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
let boremindermasterid = null;

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
this.formid=boremindermasterid;
//this.sharedService.alert(boremindermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboreminderusersTableConfig();
  setTimeout(() => {
  this.SetboreminderusersTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("remin").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.boremindermasterservice.formData && this.boremindermasterservice.formData.subcategoryid){this.boremindermasterForm.patchValue({
    subcategoryid: this.boremindermasterservice.formData.subcategoryid,
    subcategoryiddesc: this.boremindermasterservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("usertype").then(res => this.reminderusertypeList = res as boconfigvalue[]);
this.configservice.getList("scheduletype").then(res => this.scheduletypeList = res as boconfigvalue[]);
this.configservice.getList("reminderdaysbefore").then(res => this.reminderdaysbeforeList = res as boconfigvalue[]);

//autocomplete
    this.boremindermasterservice.getboremindermastersList().then(res => {
      this.pkList = res as boremindermaster[];
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
this.boremindermasterForm.markAsUntouched();
this.boremindermasterForm.markAsPristine();
}



resetForm() {
if (this.boremindermasterForm != null)
this.boremindermasterForm.reset();
this.boremindermasterForm.patchValue({
});
setTimeout(() => {
this.boremindermasterservice.boreminderusers=[];
this.boreminderusersLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.boremindermasterForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let remindermasterid = this.boremindermasterForm.get('remindermasterid').value;
        if(remindermasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boremindermasterservice.deleteboremindermaster(remindermasterid).then(res =>
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
    this.boremindermasterForm.patchValue({
        remindermasterid: null
    });
    if(this.boremindermasterservice.formData.remindermasterid!=null)this.boremindermasterservice.formData.remindermasterid=null;
for (let i=0;i<this.boremindermasterservice.boreminderusers.length;i++) {
this.boremindermasterservice.boreminderusers[i].reminderuserid=null;
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
        else if(key=="reminderdate")
this.boremindermasterForm.patchValue({"reminderdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remindertime")
this.boremindermasterForm.patchValue({"remindertime":new Time(mainscreendata[key]) });
        else if(key=="notes")
this.boremindermasterForm.patchValue({"notes":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.boremindermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boremindermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boremindermasterForm.controls[key]!=undefined)this.boremindermasterForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("boremindermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
categoryidonChange(evt:any){
let e=evt.value;
this.boremindermasterForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.boremindermasterForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.boremindermasterForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
reminderusertypeonChange(evt:any){
let e=this.f.reminderusertype.value as any;
this.boremindermasterForm.patchValue({reminderusertypedesc:evt.options[evt.options.selectedIndex].text});
}
scheduletypeonChange(evt:any){
let e=this.f.scheduletype.value as any;
this.boremindermasterForm.patchValue({scheduletypedesc:evt.options[evt.options.selectedIndex].text});
}
reminderdaysbeforeonChange(evt:any){
let e=this.f.reminderdaysbefore.value as any;
this.boremindermasterForm.patchValue({reminderdaysbeforedesc:evt.options[evt.options.selectedIndex].text});
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
this.boremindermasterservice.getboremindermastersByEID(pkcol).then(res => {

this.boremindermasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boremindermaster.remindermasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boremindermaster.remindermasterid;
var remindertimeTime=new Time( res.boremindermaster.remindertime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boremindermasterForm.patchValue({
remindermasterid: res.boremindermaster.remindermasterid,
sourcefield: res.boremindermaster.sourcefield,
sourcereference: res.boremindermaster.sourcereference,
categoryid: res.boremindermaster.categoryid,
categoryiddesc: res.boremindermaster.categoryiddesc,
subcategoryid: res.boremindermaster.subcategoryid,
subcategoryiddesc: res.boremindermaster.subcategoryiddesc,
priority: res.boremindermaster.priority,
prioritydesc: res.boremindermaster.prioritydesc,
reminderdate: this.ngbDateParserFormatter.parse(res.boremindermaster.reminderdate),
remindertime: remindertimeTime,
remindertext: res.boremindermaster.remindertext,
reminderusertype: res.boremindermaster.reminderusertype,
reminderusertypedesc: res.boremindermaster.reminderusertypedesc,
scheduletype: res.boremindermaster.scheduletype,
scheduletypedesc: res.boremindermaster.scheduletypedesc,
reminderdaysbefore: res.boremindermaster.reminderdaysbefore,
reminderdaysbeforedesc: res.boremindermaster.reminderdaysbeforedesc,
alarm: res.boremindermaster.alarm,
notes: JSON.parse(res.boremindermaster.notes),
customfield: res.boremindermaster.customfield,
attachment: res.boremindermaster.attachment,
status: res.boremindermaster.status,
statusdesc: res.boremindermaster.statusdesc,
});
this.boreminderusersvisiblelist=res.boreminderusersvisiblelist;
if(this.boremindermasterForm.get('customfield').value!=null && this.boremindermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.boremindermasterForm.get('customfield').value);
this.FillCustomField();
if(this.boremindermasterForm.get('attachment').value!=null && this.boremindermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.boremindermasterForm.get('attachment').value));
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.boremindermasterservice.boreminderusers = res.boreminderusers;
this.SetboreminderusersTableConfig();
this.boreminderusersLoadTable();
  setTimeout(() => {
  this.SetboreminderusersTableddConfig();
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
  for (let key in this.boremindermasterForm.controls) {
    if (this.boremindermasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boremindermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boremindermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.boremindermasterForm.value;
obj.reminderdate=new Date(this.boremindermasterForm.get('reminderdate').value ? this.ngbDateParserFormatter.format(this.boremindermasterForm.get('reminderdate').value)+'  UTC' :null);
obj.remindertime=(this.boremindermasterForm.get('remindertime').value==null?0:this.boremindermasterForm.get('remindertime').value.hour)+':'+(this.boremindermasterForm.get('remindertime').value==null?0:this.boremindermasterForm.get('remindertime').value.minute+":00");
obj.notes=JSON.stringify(this.boremindermasterForm.get('notes').value);
obj.customfield=JSON.stringify(customfields);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.boremindermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boremindermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boremindermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boremindermasterservice.formData=this.boremindermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boremindermasterForm.controls[key] != null)
    {
        this.boremindermasterservice.formData[key] = this.boremindermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.boremindermasterservice.formData.reminderdate=new Date(this.boremindermasterForm.get('reminderdate').value ? this.ngbDateParserFormatter.format(this.boremindermasterForm.get('reminderdate').value)+'  UTC' :null);
this.boremindermasterservice.formData.remindertime=(this.boremindermasterForm.get('remindertime').value==null?0:this.boremindermasterForm.get('remindertime').value.hour)+':'+(this.boremindermasterForm.get('remindertime').value==null?0:this.boremindermasterForm.get('remindertime').value.minute+":00");
this.boremindermasterservice.formData.notes=JSON.stringify(this.boremindermasterForm.get('notes').value);
this.boremindermasterservice.formData.customfield=JSON.stringify(customfields);
this.boremindermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.boremindermasterservice.formData.DeletedboreminderuserIDs = this.DeletedboreminderuserIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.boremindermasterservice.formData);
this.boremindermasterservice.formData=this.boremindermasterForm.value;
this.boremindermasterservice.saveOrUpdateboremindermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.boreminderuserssource.data)
{
    for (let i = 0; i < this.boreminderuserssource.data.length; i++)
    {
        if (this.boreminderuserssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boreminderuserssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boremindermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boremindermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boremindermaster);
}
else
{
this.FillData(res);
}
}
this.boremindermasterForm.markAsUntouched();
this.boremindermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.boremindermasterForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.boremindermasterForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboreminderuser(event:any,reminderuserid:any, remindermasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boreminderuserComponent, 
{
data:  {  showview:this.showview,save:false,event,reminderuserid, remindermasterid,visiblelist:this.boreminderusersvisiblelist,  hidelist:this.boreminderusershidelist,ScreenType:2  },
header: 'Users'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boreminderuserssource.add(res);
this.boreminderuserssource.refresh();
}
else
{
this.boreminderuserssource.update(event.data, res);
}
}
});
}

onDeleteboreminderuser(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboreminderuserIDs += childID + ",";
this.boremindermasterservice.boreminderusers.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boreminderusers
boreminderuserssettings:any;
boreminderuserssource: any;

showboreminderusersCheckbox()
{
debugger;
if(this.tblboreminderuserssource.settings['selectMode']== 'multi')this.tblboreminderuserssource.settings['selectMode']= 'single';
else
this.tblboreminderuserssource.settings['selectMode']= 'multi';
this.tblboreminderuserssource.initGrid();
}
deleteboreminderusersAll()
{
this.tblboreminderuserssource.settings['selectMode'] = 'single';
}
showboreminderusersFilter()
{
  setTimeout(() => {
  this.SetboreminderusersTableddConfig();
  });
      if(this.tblboreminderuserssource.settings!=null)this.tblboreminderuserssource.settings['hideSubHeader'] =!this.tblboreminderuserssource.settings['hideSubHeader'];
this.tblboreminderuserssource.initGrid();
}
showboreminderusersInActive()
{
}
enableboreminderusersInActive()
{
}
async SetboreminderusersTableddConfig()
{
if(!this.bfilterPopulateboreminderusers){
}
this.bfilterPopulateboreminderusers=true;
}
async boreminderusersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboreminderusersTableConfig()
{
this.boreminderuserssettings = {
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
remindermasterid: {
title: 'Reminder Master',
type: 'number',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
},
};
}
boreminderusersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreminderusersID)>=0)
{
this.boreminderuserssource=new LocalDataSource();
this.boreminderuserssource.load(this.boremindermasterservice.boreminderusers as  any as LocalDataSource);
this.boreminderuserssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boreminderusersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boremindermasterservice.boreminderusers.length == 0)
{
    this.tblboreminderuserssource.grid.createFormShown = true;
}
else
{
    let obj = new boreminderuser();
    this.boremindermasterservice.boreminderusers.push(obj);
    this.boreminderuserssource.refresh();
    if ((this.boremindermasterservice.boreminderusers.length / this.boreminderuserssource.getPaging().perPage).toFixed(0) + 1 != this.boreminderuserssource.getPaging().page)
    {
        this.boreminderuserssource.setPage((this.boremindermasterservice.boreminderusers.length / this.boreminderuserssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboreminderuserssource.grid.edit(this.tblboreminderuserssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boreminderuserssource.data.indexOf(event.data);
this.onDeleteboreminderuser(event,event.data.reminderuserid,((this.boreminderuserssource.getPaging().page-1) *this.boreminderuserssource.getPaging().perPage)+index);
this.boreminderuserssource.refresh();
break;
}
}

*/
boreminderusersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboreminderuser(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboreminderuser(event,event.data.reminderuserid,this.formid);
break;
case 'delete':
this.onDeleteboreminderuser(event,event.data.reminderuserid,((this.boreminderuserssource.getPaging().page-1) *this.boreminderuserssource.getPaging().perPage)+event.index);
this.boreminderuserssource.refresh();
break;
}
}
boreminderusersonDelete(obj) {
let reminderuserid=obj.data.reminderuserid;
if (confirm('Are you sure to delete this record ?')) {
this.boremindermasterservice.deleteboremindermaster(reminderuserid).then(res=>
this.boreminderusersLoadTable()
);
}
}
boreminderusersPaging(val)
{
debugger;
this.boreminderuserssource.setPaging(1, val, true);
}

handleboreminderusersGridSelected(event:any) {
this.boreminderusersselectedindex=this.boremindermasterservice.boreminderusers.findIndex(i => i.reminderuserid === event.data.reminderuserid);
}
IsboreminderusersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreminderusersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boreminderusers

}



