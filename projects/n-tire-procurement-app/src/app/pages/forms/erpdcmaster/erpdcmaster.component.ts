import { erpdcmasterService } from './../../../service/erpdcmaster.service';
import { erpdcmaster } from './../../../model/erpdcmaster.model';
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
import { erpdcdetail } from './../../../model/erpdcdetail.model';
import { erpdcdetailComponent } from './../../../pages/forms/erpdcdetail/erpdcdetail.component';
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
selector: 'app-erpdcmaster',
templateUrl: './erpdcmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpdcmasterComponent implements OnInit {
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
bfilterPopulateerpdcmasters:boolean=false;
dataerpdcmastersdcid3:any=[];
dataerpdcdetailsdcid3:any=[];
bfilterPopulateerpdcdetails:boolean=false;
@ViewChild('tblerpdcdetailssource',{static:false}) tblerpdcdetailssource: Ng2SmartTableComponent;
 erpdcmasterForm: FormGroup;
dcidList: erpdcmaster[];
dcidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
dcid_erpdcmastersForm: FormGroup;//autocomplete
dcid_erpdcmastersoptions:any;//autocomplete
dcid_erpdcmastersformatter:any;//autocomplete
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
erpdcmastershowOption:boolean;
erpdcdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpdcdetailsvisiblelist:any;
erpdcdetailshidelist:any;

DeletederpdcdetailIDs: string="";
erpdcdetailsID: string = "1";
erpdcdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpdcmasterservice: erpdcmasterService,
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
this.erpdcmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
dcid: [null],
dciddesc: [null],
branchid: [null],
dcnumber: [null],
dcdate: [null],
dctype: [null],
referenceid: [null],
totalpieces: [null],
shipmode: [null],
shippingcompany: [null],
airwaybillnumber: [null],
bookingdate: [null],
expecteddeliveryby: [null],
shipto: [null],
shiptocustomer: [null],
shiptobranch: [null],
shiptovendor: [null],
contactperson: [null],
contactnumber: [null],
deliveryaddress1: [null],
deliveryaddress2: [null],
deliverycity: [null],
deliverystate: [null],
deliverypin: [null],
deliverycountry: [null],
deliverylatlong: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpdcmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpdcmasterForm.dirty && this.erpdcmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.dcid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.dcid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.dcid && pkDetail) {
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
let erpdcmasterid = null;

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
this.formid=erpdcmasterid;
//this.sharedService.alert(erpdcmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpdcdetailsTableConfig();
  setTimeout(() => {
  this.SeterpdcdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpdcmasterservice.geterpdcmastersList().then(res => 
{
this.dcidList = res as erpdcmaster[];
if(this.erpdcmasterservice.formData && this.erpdcmasterservice.formData.dcid){
this.dcidoptionsEvent.emit(this.dcidList);
this.erpdcmasterForm.patchValue({
    dcid: this.erpdcmasterservice.formData.dcid,
    dciddesc: this.erpdcmasterservice.formData.dciddesc,
});
}
{
let arrdcid = this.dcidList.filter(v => v.dcid == this.erpdcmasterForm.get('dcid').value);
let objdcid;
if (arrdcid.length > 0) objdcid = arrdcid[0];
if (objdcid)
{
}
}
}
).catch((err) => {console.log(err);});
this.dcid_erpdcmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.dcidList.filter(v => v.dcnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.dcid_erpdcmastersformatter = (result: any) => result.dcnumber;

//autocomplete
    this.erpdcmasterservice.geterpdcmastersList().then(res => {
      this.pkList = res as erpdcmaster[];
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
this.erpdcmasterForm.markAsUntouched();
this.erpdcmasterForm.markAsPristine();
}
onSelecteddcid(dcidDetail: any) {
if (dcidDetail.dcid && dcidDetail) {
this.erpdcmasterForm.patchValue({
dcid: dcidDetail.dcid,
dciddesc: dcidDetail.dcnumber,

});

}
}




resetForm() {
if (this.erpdcmasterForm != null)
this.erpdcmasterForm.reset();
this.erpdcmasterForm.patchValue({
});
setTimeout(() => {
this.erpdcmasterservice.erpdcdetails=[];
this.erpdcdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let dcid = this.erpdcmasterForm.get('dcid').value;
        if(dcid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpdcmasterservice.deleteerpdcmaster(dcid).then(res =>
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
    this.erpdcmasterForm.patchValue({
        dcid: null
    });
    if(this.erpdcmasterservice.formData.dcid!=null)this.erpdcmasterservice.formData.dcid=null;
for (let i=0;i<this.erpdcmasterservice.erpdcdetails.length;i++) {
this.erpdcmasterservice.erpdcdetails[i].dcdetailid=null;
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
        else if(key=="dcdate")
this.erpdcmasterForm.patchValue({"dcdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expecteddeliveryby")
this.erpdcmasterForm.patchValue({"expecteddeliveryby":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpdcmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpdcmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpdcmasterForm.controls[key]!=undefined)
{
this.erpdcmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpdcmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
dcidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
dcnumberonChange(evt:any){
let e=evt.value;
}
dcdateonChange(evt:any){
let e=evt.value;
}
dctypeonChange(evt:any){
let e=evt.value;
}
referenceidonChange(evt:any){
let e=evt.value;
}
totalpiecesonChange(evt:any){
let e=evt.value;
}
shipmodeonChange(evt:any){
let e=evt.value;
}
shippingcompanyonChange(evt:any){
let e=evt.value;
}
airwaybillnumberonChange(evt:any){
let e=evt.value;
}
bookingdateonChange(evt:any){
let e=evt.value;
}
expecteddeliverybyonChange(evt:any){
let e=evt.value;
}
shiptoonChange(evt:any){
let e=evt.value;
}
shiptocustomeronChange(evt:any){
let e=evt.value;
}
shiptobranchonChange(evt:any){
let e=evt.value;
}
shiptovendoronChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
contactnumberonChange(evt:any){
let e=evt.value;
}
deliveryaddress1onChange(evt:any){
let e=evt.value;
}
deliveryaddress2onChange(evt:any){
let e=evt.value;
}
deliverycityonChange(evt:any){
let e=evt.value;
}
deliverystateonChange(evt:any){
let e=evt.value;
}
deliverypinonChange(evt:any){
let e=evt.value;
}
deliverycountryonChange(evt:any){
let e=evt.value;
}
deliverylatlongonChange(evt:any){
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
  


editerpdcmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpdcmasterservice.geterpdcmastersByEID(pkcol).then(res => {

this.erpdcmasterservice.formData=res.erpdcmaster;
let formproperty=res.erpdcmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpdcmaster.pkcol;
this.formid=res.erpdcmaster.dcid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpdcmaster.dcid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpdcmasterForm.patchValue({
dcid: res.erpdcmaster.dcid,
dciddesc: res.erpdcmaster.dciddesc,
branchid: res.erpdcmaster.branchid,
dcnumber: res.erpdcmaster.dcnumber,
dcdate: this.ngbDateParserFormatter.parse(res.erpdcmaster.dcdate),
dctype: res.erpdcmaster.dctype,
referenceid: res.erpdcmaster.referenceid,
totalpieces: res.erpdcmaster.totalpieces,
shipmode: res.erpdcmaster.shipmode,
shippingcompany: res.erpdcmaster.shippingcompany,
airwaybillnumber: res.erpdcmaster.airwaybillnumber,
bookingdate: res.erpdcmaster.bookingdate,
expecteddeliveryby: this.ngbDateParserFormatter.parse(res.erpdcmaster.expecteddeliveryby),
shipto: res.erpdcmaster.shipto,
shiptocustomer: res.erpdcmaster.shiptocustomer,
shiptobranch: res.erpdcmaster.shiptobranch,
shiptovendor: res.erpdcmaster.shiptovendor,
contactperson: res.erpdcmaster.contactperson,
contactnumber: res.erpdcmaster.contactnumber,
deliveryaddress1: res.erpdcmaster.deliveryaddress1,
deliveryaddress2: res.erpdcmaster.deliveryaddress2,
deliverycity: res.erpdcmaster.deliverycity,
deliverystate: res.erpdcmaster.deliverystate,
deliverypin: res.erpdcmaster.deliverypin,
deliverycountry: res.erpdcmaster.deliverycountry,
deliverylatlong: res.erpdcmaster.deliverylatlong,
customfield: res.erpdcmaster.customfield,
attachment: JSON.parse(res.erpdcmaster.attachment),
status: res.erpdcmaster.status,
statusdesc: res.erpdcmaster.statusdesc,
});
this.erpdcdetailsvisiblelist=res.erpdcdetailsvisiblelist;
if(this.erpdcmasterForm.get('customfield').value!=null && this.erpdcmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpdcmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpdcmasterForm.get('attachment').value!=null && this.erpdcmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpdcmasterForm.get('attachment').value);
//Child Tables if any
this.erpdcmasterservice.erpdcdetails = res.erpdcdetails;
this.SeterpdcdetailsTableConfig();
this.erpdcdetailsLoadTable();
  setTimeout(() => {
  this.SeterpdcdetailsTableddConfig();
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
  for (let key in this.erpdcmasterForm.controls) {
    if (this.erpdcmasterForm.controls[key] != null) {
if(false)
{
if(this.erpdcmasterservice.formData!=null && this.erpdcmasterservice.formData[key]!=null  && this.erpdcmasterservice.formData[key]!='[]' && this.erpdcmasterservice.formData[key]!=undefined && this.erpdcmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpdcmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpdcmasterservice.formData!=null && this.erpdcmasterservice.formData[key]!=null   && this.erpdcmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpdcmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpdcmasterservice.formData!=null && this.erpdcmasterservice.formData[key]!=null   && this.erpdcmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpdcmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpdcmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpdcmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpdcmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpdcmasterForm.value;
obj.dcdate=new Date(this.erpdcmasterForm.get('dcdate').value ? this.ngbDateParserFormatter.format(this.erpdcmasterForm.get('dcdate').value)+'  UTC' :null);
obj.expecteddeliveryby=new Date(this.erpdcmasterForm.get('expecteddeliveryby').value ? this.ngbDateParserFormatter.format(this.erpdcmasterForm.get('expecteddeliveryby').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
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

private erpdcmastertoggleOption(){
this.erpdcmastershowOption = this.erpdcmastershowOption === true ? false : true;
}

private erpdcdetailtoggleOption(){
this.erpdcdetailshowOption = this.erpdcdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpdcmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpdcmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpdcmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpdcmasterservice.formData=this.erpdcmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpdcmasterForm.controls[key] != null)
    {
        this.erpdcmasterservice.formData[key] = this.erpdcmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpdcmasterservice.formData.dcdate=new Date(this.erpdcmasterForm.get('dcdate').value ? this.ngbDateParserFormatter.format(this.erpdcmasterForm.get('dcdate').value)+'  UTC' :null);
this.erpdcmasterservice.formData.expecteddeliveryby=new Date(this.erpdcmasterForm.get('expecteddeliveryby').value ? this.ngbDateParserFormatter.format(this.erpdcmasterForm.get('expecteddeliveryby').value)+'  UTC' :null);
if(customfields!=null)this.erpdcmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpdcmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpdcmasterservice.formData.DeletederpdcdetailIDs = this.DeletederpdcdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpdcmasterservice.formData);
this.erpdcmasterservice.formData=this.erpdcmasterForm.value;
this.erpdcmasterservice.saveOrUpdateerpdcmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpdcdetailssource.data)
{
    for (let i = 0; i < this.erpdcdetailssource.data.length; i++)
    {
        if (this.erpdcdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpdcdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpdcmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpdcmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpdcmaster);
}
else
{
this.FillData(res);
}
}
this.erpdcmasterForm.markAsUntouched();
this.erpdcmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdcid( dcid) {
/*let ScreenType='2';
this.dialog.open(erpdcmasterComponent, 
{
data: {dcid:this.erpdcmasterForm.get('dcid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpdcdetail(event:any,dcdetailid:any, dcid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpdcdetailComponent, 
{
data:  {  showview:false,save:false,event,dcdetailid, dcid,visiblelist:this.erpdcdetailsvisiblelist,  hidelist:this.erpdcdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpdcdetailssource.add(res);
this.erpdcdetailssource.refresh();
}
else
{
this.erpdcdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpdcdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpdcdetailIDs += childID + ",";
this.erpdcmasterservice.erpdcdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpdcdetails
erpdcdetailssettings:any;
erpdcdetailssource: any;

showerpdcdetailsCheckbox()
{
debugger;
if(this.tblerpdcdetailssource.settings['selectMode']== 'multi')this.tblerpdcdetailssource.settings['selectMode']= 'single';
else
this.tblerpdcdetailssource.settings['selectMode']= 'multi';
this.tblerpdcdetailssource.initGrid();
}
deleteerpdcdetailsAll()
{
this.tblerpdcdetailssource.settings['selectMode'] = 'single';
}
showerpdcdetailsFilter()
{
  setTimeout(() => {
  this.SeterpdcdetailsTableddConfig();
  });
      if(this.tblerpdcdetailssource.settings!=null)this.tblerpdcdetailssource.settings['hideSubHeader'] =!this.tblerpdcdetailssource.settings['hideSubHeader'];
this.tblerpdcdetailssource.initGrid();
}
showerpdcdetailsInActive()
{
}
enableerpdcdetailsInActive()
{
}
async SeterpdcdetailsTableddConfig()
{
if(!this.bfilterPopulateerpdcdetails){
}
this.bfilterPopulateerpdcdetails=true;
}
async erpdcdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpdcdetailsTableConfig()
{
this.erpdcdetailssettings = {
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
cartonnumber: {
title: 'Carton Number',
type: '',
filter:true,
},
dimension: {
title: 'Dimension',
type: '',
filter:true,
},
weight: {
title: 'Weight',
type: '',
filter:true,
},
},
};
}
erpdcdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpdcdetailsID)>=0)
{
this.erpdcdetailssource=new LocalDataSource();
this.erpdcdetailssource.load(this.erpdcmasterservice.erpdcdetails as  any as LocalDataSource);
this.erpdcdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpdcdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpdcmasterservice.erpdcdetails.length == 0)
{
    this.tblerpdcdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpdcdetail();
    this.erpdcmasterservice.erpdcdetails.push(obj);
    this.erpdcdetailssource.refresh();
    if ((this.erpdcmasterservice.erpdcdetails.length / this.erpdcdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpdcdetailssource.getPaging().page)
    {
        this.erpdcdetailssource.setPage((this.erpdcmasterservice.erpdcdetails.length / this.erpdcdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpdcdetailssource.grid.edit(this.tblerpdcdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpdcdetailssource.data.indexOf(event.data);
this.onDeleteerpdcdetail(event,event.data.dcdetailid,((this.erpdcdetailssource.getPaging().page-1) *this.erpdcdetailssource.getPaging().perPage)+index);
this.erpdcdetailssource.refresh();
break;
}
}

*/
erpdcdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpdcdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpdcdetail(event,event.data.dcdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpdcdetail(event,event.data.dcdetailid,((this.erpdcdetailssource.getPaging().page-1) *this.erpdcdetailssource.getPaging().perPage)+event.index);
this.erpdcdetailssource.refresh();
break;
}
}
erpdcdetailsonDelete(obj) {
let dcdetailid=obj.data.dcdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpdcmasterservice.deleteerpdcmaster(dcdetailid).then(res=>
this.erpdcdetailsLoadTable()
);
}
}
erpdcdetailsPaging(val)
{
debugger;
this.erpdcdetailssource.setPaging(1, val, true);
}

handleerpdcdetailsGridSelected(event:any) {
this.erpdcdetailsselectedindex=this.erpdcmasterservice.erpdcdetails.findIndex(i => i.dcdetailid === event.data.dcdetailid);
}
IserpdcdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpdcdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpdcdetails

}



