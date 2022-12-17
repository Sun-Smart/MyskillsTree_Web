import { legalcommunicationdetailService } from './../../../service/legalcommunicationdetail.service';
import { legalcommunicationdetail } from './../../../model/legalcommunicationdetail.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { legalcasepartydetail} from './../../../model/legalcasepartydetail.model';
import { legalcasepartydetailComponent } from './../../../pages/forms/legalcasepartydetail/legalcasepartydetail.component';
import { legalcasepartydetailService } from './../../../service/legalcasepartydetail.service';
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
selector: 'app-legalcommunicationdetail',
templateUrl: './legalcommunicationdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcommunicationdetailComponent implements OnInit {
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
bfilterPopulatelegalcommunicationdetails:boolean=false;
datalegalcommunicationdetailspartytype3:any=[];
datalegalcommunicationdetailspartyid3:any=[];
datalegalcommunicationdetailsmode3:any=[];
datalegalcommunicationdetailscategoryid3:any=[];
datalegalcommunicationdetailsdocumenttypeid3:any=[];
 legalcommunicationdetailForm: FormGroup;
partytypeList: bomasterdata[];
partyidList: legalcasepartydetail[];
modeList: bomasterdata[];
categoryidList: bomasterdata[];
documenttypeidList: bomasterdata[];
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
legalcommunicationdetailshowOption:boolean;
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
private legalcommunicationdetailservice: legalcommunicationdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private legalcasepartydetailservice:legalcasepartydetailService,
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
this.legalcommunicationdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
communicationid: [null],
partytype: [null, Validators.required],
partytypedesc: [null],
partyid: [null, Validators.required],
partyiddesc: [null],
caseid: [null],
communicationdate: [null, Validators.required],
mode: [null],
modedesc: [null],
categoryid: [null],
categoryiddesc: [null],
documenttypeid: [null],
documenttypeiddesc: [null],
subject: [null, Validators.required],
sender: [null, Validators.required],
addressedto: [null, Validators.required],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcommunicationdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcommunicationdetailForm.dirty && this.legalcommunicationdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.communicationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.communicationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.communicationid && pkDetail) {
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
let legalcommunicationdetailid = null;

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
this.formid=legalcommunicationdetailid;
//this.sharedService.alert(legalcommunicationdetailid);

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
this.bomasterdataservice.getList("ozck3").then(res => {
this.partytypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.partytype.value && this.f.partytype.value!="" && this.f.partytype.value!=null)this.legalcasepartydetailservice.getListBypartytype(this.f.partytype.value).then(res =>{
this.partyidList = res as legalcasepartydetail[];
if(this.legalcommunicationdetailservice.formData && this.legalcommunicationdetailservice.formData.partyid){this.legalcommunicationdetailForm.patchValue({
    partyid: this.legalcommunicationdetailservice.formData.partyid,
    partyiddesc: this.legalcommunicationdetailservice.formData.partyiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bomasterdataservice.getList("gim6g").then(res => {
this.modeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("urmku").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("u7kt2").then(res => {
this.documenttypeidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.legalcommunicationdetailservice.getlegalcommunicationdetailsList().then(res => {
      this.pkList = res as legalcommunicationdetail[];
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
this.legalcommunicationdetailForm.markAsUntouched();
this.legalcommunicationdetailForm.markAsPristine();
}



resetForm() {
if (this.legalcommunicationdetailForm != null)
this.legalcommunicationdetailForm.reset();
this.legalcommunicationdetailForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let communicationid = this.legalcommunicationdetailForm.get('communicationid').value;
        if(communicationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcommunicationdetailservice.deletelegalcommunicationdetail(communicationid).then(res =>
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
    this.legalcommunicationdetailForm.patchValue({
        communicationid: null
    });
    if(this.legalcommunicationdetailservice.formData.communicationid!=null)this.legalcommunicationdetailservice.formData.communicationid=null;
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
        else if(key=="communicationdate")
this.legalcommunicationdetailForm.patchValue({"communicationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcommunicationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcommunicationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcommunicationdetailForm.controls[key]!=undefined)
{
this.legalcommunicationdetailForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("legalcommunicationdetails",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
partytypeonChange(evt:any){
let e=evt.value;
this.legalcommunicationdetailForm.patchValue({partytypedesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.partytype.value && this.f.partytype.value!="" && this.f.partytype.value!=null)this.legalcasepartydetailservice.getListBypartytype(this.f.partytype.value).then(res => this.partyidList = res as legalcasepartydetail[]);
});
}
partyidonChange(evt:any){
let e=evt.value;
this.legalcommunicationdetailForm.patchValue({partyiddesc:evt.options[evt.options.selectedIndex].text});
}
modeonChange(evt:any){
let e=evt.value;
this.legalcommunicationdetailForm.patchValue({modedesc:evt.options[evt.options.selectedIndex].text});
}
categoryidonChange(evt:any){
let e=evt.value;
this.legalcommunicationdetailForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
}
documenttypeidonChange(evt:any){
let e=evt.value;
this.legalcommunicationdetailForm.patchValue({documenttypeiddesc:evt.options[evt.options.selectedIndex].text});
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
  


editlegalcommunicationdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcommunicationdetailservice.getlegalcommunicationdetailsByEID(pkcol).then(res => {

this.legalcommunicationdetailservice.formData=res.legalcommunicationdetail;
let formproperty=res.legalcommunicationdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcommunicationdetail.pkcol;
this.formid=res.legalcommunicationdetail.communicationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcommunicationdetailservice.formData=res.legalcommunicationdetail;
this.formid=res.legalcommunicationdetail.communicationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcommunicationdetailForm.patchValue({
communicationid: res.legalcommunicationdetail.communicationid,
partytype: res.legalcommunicationdetail.partytype,
partytypedesc: res.legalcommunicationdetail.partytypedesc,
partyid: res.legalcommunicationdetail.partyid,
partyiddesc: res.legalcommunicationdetail.partyiddesc,
caseid: res.legalcommunicationdetail.caseid,
communicationdate: this.ngbDateParserFormatter.parse(res.legalcommunicationdetail.communicationdate),
mode: res.legalcommunicationdetail.mode,
modedesc: res.legalcommunicationdetail.modedesc,
categoryid: res.legalcommunicationdetail.categoryid,
categoryiddesc: res.legalcommunicationdetail.categoryiddesc,
documenttypeid: res.legalcommunicationdetail.documenttypeid,
documenttypeiddesc: res.legalcommunicationdetail.documenttypeiddesc,
subject: res.legalcommunicationdetail.subject,
sender: res.legalcommunicationdetail.sender,
addressedto: res.legalcommunicationdetail.addressedto,
customfield: res.legalcommunicationdetail.customfield,
attachment: JSON.parse(res.legalcommunicationdetail.attachment),
status: res.legalcommunicationdetail.status,
statusdesc: res.legalcommunicationdetail.statusdesc,
});
if(this.legalcommunicationdetailForm.get('customfield').value!=null && this.legalcommunicationdetailForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.legalcommunicationdetailForm.get('customfield').value);
this.FillCustomField();
if(this.legalcommunicationdetailForm.get('attachment').value!=null && this.legalcommunicationdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcommunicationdetailForm.get('attachment').value);
setTimeout(() => {
if(this.f.partytype.value && this.f.partytype.value!="" && this.f.partytype.value!=null)this.legalcasepartydetailservice.getListBypartytype(this.f.partytype.value).then(res =>{
this.partyidList = res as legalcasepartydetail[];
}).catch((err) => {console.log(err);});
});
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
  for (let key in this.legalcommunicationdetailForm.controls) {
    if (this.legalcommunicationdetailForm.controls[key] != null) {
if(false)
{
if(this.legalcommunicationdetailservice.formData!=null && this.legalcommunicationdetailservice.formData[key]!=null  && this.legalcommunicationdetailservice.formData[key]!='[]' && this.legalcommunicationdetailservice.formData[key]!=undefined && this.legalcommunicationdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcommunicationdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcommunicationdetailservice.formData!=null && this.legalcommunicationdetailservice.formData[key]!=null   && this.legalcommunicationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcommunicationdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcommunicationdetailservice.formData!=null && this.legalcommunicationdetailservice.formData[key]!=null   && this.legalcommunicationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcommunicationdetailservice.formData[key]+"'><div class='progress__number'>"+this.legalcommunicationdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcommunicationdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcommunicationdetailForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.legalcommunicationdetailForm.value;
obj.communicationdate=new Date(this.legalcommunicationdetailForm.get('communicationdate').value ? this.ngbDateParserFormatter.format(this.legalcommunicationdetailForm.get('communicationdate').value)+'  UTC' :null);
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

private legalcommunicationdetailtoggleOption(){
this.legalcommunicationdetailshowOption = this.legalcommunicationdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcommunicationdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcommunicationdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcommunicationdetailForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcommunicationdetailservice.formData=this.legalcommunicationdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcommunicationdetailForm.controls[key] != null)
    {
        this.legalcommunicationdetailservice.formData[key] = this.legalcommunicationdetailForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.legalcommunicationdetailservice.formData.communicationdate=new Date(this.legalcommunicationdetailForm.get('communicationdate').value ? this.ngbDateParserFormatter.format(this.legalcommunicationdetailForm.get('communicationdate').value)+'  UTC' :null);
if(customfields!=null)this.legalcommunicationdetailservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.legalcommunicationdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcommunicationdetailservice.formData);
this.legalcommunicationdetailservice.formData=this.legalcommunicationdetailForm.value;
this.legalcommunicationdetailservice.saveOrUpdatelegalcommunicationdetails().subscribe(
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
this.dialogRef.close((res as any).legalcommunicationdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcommunicationdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcommunicationdetail);
}
else
{
this.FillData(res);
}
}
this.legalcommunicationdetailForm.markAsUntouched();
this.legalcommunicationdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpartytype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcommunicationdetailForm.get('partytype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpartyid( partyid) {
/*let ScreenType='2';
this.dialog.open(legalcasepartydetailComponent, 
{
data: {partyid:this.legalcommunicationdetailForm.get('partyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmode( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcommunicationdetailForm.get('mode').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcommunicationdetailForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdocumenttypeid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcommunicationdetailForm.get('documenttypeid').value, ScreenType:2 }
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



