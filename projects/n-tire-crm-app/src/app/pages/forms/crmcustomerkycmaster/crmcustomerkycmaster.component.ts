import { crmcustomerkycmasterService } from './../../../service/crmcustomerkycmaster.service';
import { crmcustomerkycmaster } from './../../../model/crmcustomerkycmaster.model';
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
import { crmcustomermaster} from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-crmcustomerkycmaster',
templateUrl: './crmcustomerkycmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmcustomerkycmasterComponent implements OnInit {
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
bfilterPopulatecrmcustomerkycmasters:boolean=false;
datacrmcustomerkycmasterscustomerid3:any=[];
datacrmcustomerkycmastersidentityname3:any=[];
 crmcustomerkycmasterForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
identitynameList: bomasterdata[];
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
crmcustomerkycmastershowOption:boolean;
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
private crmcustomerkycmasterservice: crmcustomerkycmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
private bomasterdataservice:bomasterdataService,
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
this.crmcustomerkycmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
kycid: [null],
customerid: [null],
customeriddesc: [null],
identityname: [null],
identitynamedesc: [null],
identitynumber: [null],
issuedate: [null],
expirydate: [null],
renewalrequired: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomerkycmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmcustomerkycmasterForm.dirty && this.crmcustomerkycmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.kycid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.kycid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.kycid && pkDetail) {
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
let crmcustomerkycmasterid = null;

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
this.formid=crmcustomerkycmasterid;
//this.sharedService.alert(crmcustomerkycmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.crmcustomerkycmasterservice.formData && this.crmcustomerkycmasterservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.crmcustomerkycmasterForm.patchValue({
    customerid: this.crmcustomerkycmasterservice.formData.customerid,
    customeriddesc: this.crmcustomerkycmasterservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.crmcustomerkycmasterForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.bomasterdataservice.getList("bg2su").then(res => {
this.identitynameList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.crmcustomerkycmasterservice.getcrmcustomerkycmastersList().then(res => {
      this.pkList = res as crmcustomerkycmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.identitynumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.identitynumber;

//setting the flag that the screen is not touched 
this.crmcustomerkycmasterForm.markAsUntouched();
this.crmcustomerkycmasterForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.crmcustomerkycmasterForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.crmcustomerkycmasterForm != null)
this.crmcustomerkycmasterForm.reset();
this.crmcustomerkycmasterForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let kycid = this.crmcustomerkycmasterForm.get('kycid').value;
        if(kycid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomerkycmasterservice.deletecrmcustomerkycmaster(kycid).then(res =>
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
    this.crmcustomerkycmasterForm.patchValue({
        kycid: null
    });
    if(this.crmcustomerkycmasterservice.formData.kycid!=null)this.crmcustomerkycmasterservice.formData.kycid=null;
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
        else if(key=="issuedate")
this.crmcustomerkycmasterForm.patchValue({"issuedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.crmcustomerkycmasterForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.crmcustomerkycmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmcustomerkycmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmcustomerkycmasterForm.controls[key]!=undefined)
{
this.crmcustomerkycmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomerkycmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.crmcustomerkycmasterservice.formData.identitynumber!=null )
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
kycidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
identitynameonChange(evt:any){
let e=evt.value;
this.crmcustomerkycmasterForm.patchValue({identitynamedesc:evt.options[evt.options.selectedIndex].text});
}
identitynumberonChange(evt:any){
let e=evt.value;
}
issuedateonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
renewalrequiredonChange(evt:any){
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
  


editcrmcustomerkycmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmcustomerkycmasterservice.getcrmcustomerkycmastersByEID(pkcol).then(res => {

this.crmcustomerkycmasterservice.formData=res.crmcustomerkycmaster;
let formproperty=res.crmcustomerkycmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmcustomerkycmaster.pkcol;
this.formid=res.crmcustomerkycmaster.kycid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmcustomerkycmaster.kycid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmcustomerkycmasterForm.patchValue({
kycid: res.crmcustomerkycmaster.kycid,
customerid: res.crmcustomerkycmaster.customerid,
customeriddesc: res.crmcustomerkycmaster.customeriddesc,
identityname: res.crmcustomerkycmaster.identityname,
identitynamedesc: res.crmcustomerkycmaster.identitynamedesc,
identitynumber: res.crmcustomerkycmaster.identitynumber,
issuedate: this.ngbDateParserFormatter.parse(res.crmcustomerkycmaster.issuedate),
expirydate: this.ngbDateParserFormatter.parse(res.crmcustomerkycmaster.expirydate),
renewalrequired: res.crmcustomerkycmaster.renewalrequired,
customfield: res.crmcustomerkycmaster.customfield,
attachment: JSON.parse(res.crmcustomerkycmaster.attachment),
status: res.crmcustomerkycmaster.status,
statusdesc: res.crmcustomerkycmaster.statusdesc,
});
if(this.crmcustomerkycmasterForm.get('customfield').value!=null && this.crmcustomerkycmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.crmcustomerkycmasterForm.get('customfield').value);
this.FillCustomField();
if(this.crmcustomerkycmasterForm.get('attachment').value!=null && this.crmcustomerkycmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.crmcustomerkycmasterForm.get('attachment').value);
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
  for (let key in this.crmcustomerkycmasterForm.controls) {
    if (this.crmcustomerkycmasterForm.controls[key] != null) {
if(false)
{
if(this.crmcustomerkycmasterservice.formData!=null && this.crmcustomerkycmasterservice.formData[key]!=null  && this.crmcustomerkycmasterservice.formData[key]!='[]' && this.crmcustomerkycmasterservice.formData[key]!=undefined && this.crmcustomerkycmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmcustomerkycmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmcustomerkycmasterservice.formData!=null && this.crmcustomerkycmasterservice.formData[key]!=null   && this.crmcustomerkycmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmcustomerkycmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmcustomerkycmasterservice.formData!=null && this.crmcustomerkycmasterservice.formData[key]!=null   && this.crmcustomerkycmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmcustomerkycmasterservice.formData[key]+"'><div class='progress__number'>"+this.crmcustomerkycmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomerkycmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmcustomerkycmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.crmcustomerkycmasterForm.value;
obj.issuedate=new Date(this.crmcustomerkycmasterForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('issuedate').value)+'  UTC' :null);
obj.expirydate=new Date(this.crmcustomerkycmasterForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('expirydate').value)+'  UTC' :null);
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

private crmcustomerkycmastertoggleOption(){
this.crmcustomerkycmastershowOption = this.crmcustomerkycmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomerkycmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomerkycmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomerkycmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmcustomerkycmasterservice.formData=this.crmcustomerkycmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomerkycmasterForm.controls[key] != null)
    {
        this.crmcustomerkycmasterservice.formData[key] = this.crmcustomerkycmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.crmcustomerkycmasterservice.formData.issuedate=new Date(this.crmcustomerkycmasterForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('issuedate').value)+'  UTC' :null);
this.crmcustomerkycmasterservice.formData.expirydate=new Date(this.crmcustomerkycmasterForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.crmcustomerkycmasterForm.get('expirydate').value)+'  UTC' :null);
this.crmcustomerkycmasterservice.formData.customfield=JSON.stringify(customfields);
this.crmcustomerkycmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.crmcustomerkycmasterservice.formData);
this.crmcustomerkycmasterservice.formData=this.crmcustomerkycmasterForm.value;
this.crmcustomerkycmasterservice.saveOrUpdatecrmcustomerkycmasters().subscribe(
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
this.dialogRef.close((res as any).crmcustomerkycmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmcustomerkycmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomerkycmaster);
}
else
{
this.FillData(res);
}
}
this.crmcustomerkycmasterForm.markAsUntouched();
this.crmcustomerkycmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.crmcustomerkycmasterForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditidentityname( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.crmcustomerkycmasterForm.get('identityname').value, ScreenType:2 }
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



