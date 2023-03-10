import { hlpticketdetailService } from './../../../service/hlpticketdetail.service';
import { hlpticketdetail } from './../../../model/hlpticketdetail.model';
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
import { hlpticket} from './../../../model/hlpticket.model';
import { hlpticketComponent } from './../../../pages/forms/hlpticket/hlpticket.component';
import { hlpticketService } from './../../../service/hlpticket.service';
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
selector: 'app-hlpticketdetail',
templateUrl: './hlpticketdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hlpticketdetailComponent implements OnInit {
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
bfilterPopulatehlpticketdetails:boolean=false;
datahlpticketdetailsticketid3:any=[];
datahlpticketdetailsactionuser3:any=[];
 hlpticketdetailForm: FormGroup;
ticketidList: hlpticket[];
ticketidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
ticketid_hlpticketsForm: FormGroup;//autocomplete
ticketid_hlpticketsoptions:any;//autocomplete
ticketid_hlpticketsformatter:any;//autocomplete
actionuserList: bousermaster[];
actionuseroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
actionuser_bousermastersForm: FormGroup;//autocomplete
actionuser_bousermastersoptions:any;//autocomplete
actionuser_bousermastersformatter:any;//autocomplete
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
hlpticketdetailshowOption:boolean;
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
private hlpticketdetailservice: hlpticketdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hlpticketservice:hlpticketService,
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
this.hlpticketdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
ticketdetailid: [null],
ticketid: [null],
ticketiddesc: [null],
sourcefield: [null],
sourcereference: [null],
assignedto: [null],
actionuser: [null],
actionuserdesc: [null],
assigneddate: [null],
actiondate: [null],
tatends: [null],
actionremarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hlpticketdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hlpticketdetailForm.dirty && this.hlpticketdetailForm.touched ) {
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
????if(this.pkList.length>0)??this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
??if(this.pkList.length>0)??this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
????debugger;
????let??pos??=??this.pkList.map(function(e:any)??{??return e.ticketdetailid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.ticketdetailid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.ticketdetailid && pkDetail) {
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
let hlpticketdetailid = null;

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
this.formid=hlpticketdetailid;
//this.sharedService.alert(hlpticketdetailid);

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
this.hlpticketservice.gethlpticketsList().then(res => 
{
this.ticketidList = res as hlpticket[];
if(this.hlpticketdetailservice.formData && this.hlpticketdetailservice.formData.ticketid){
this.ticketidoptionsEvent.emit(this.ticketidList);
this.hlpticketdetailForm.patchValue({
    ticketid: this.hlpticketdetailservice.formData.ticketid,
    ticketiddesc: this.hlpticketdetailservice.formData.ticketiddesc,
});
}
{
let arrticketid = this.ticketidList.filter(v => v.ticketid == this.hlpticketdetailForm.get('ticketid').value);
let objticketid;
if (arrticketid.length > 0) objticketid = arrticketid[0];
if (objticketid)
{
}
}
}
).catch((err) => {console.log(err);});
this.ticketid_hlpticketsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ticketidList.filter(v => v.subject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.ticketid_hlpticketsformatter = (result: any) => result.subject;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.actionuserList = res as bousermaster[];
if(this.hlpticketdetailservice.formData && this.hlpticketdetailservice.formData.actionuser){
this.actionuseroptionsEvent.emit(this.actionuserList);
this.hlpticketdetailForm.patchValue({
    actionuser: this.hlpticketdetailservice.formData.actionuser,
    actionuserdesc: this.hlpticketdetailservice.formData.actionuserdesc,
});
}
{
let arractionuser = this.actionuserList.filter(v => v.userid == this.hlpticketdetailForm.get('actionuser').value);
let objactionuser;
if (arractionuser.length > 0) objactionuser = arractionuser[0];
if (objactionuser)
{
}
}
}
).catch((err) => {console.log(err);});
this.actionuser_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.actionuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.actionuser_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hlpticketdetailservice.gethlpticketdetailsList().then(res => {
      this.pkList = res as hlpticketdetail[];
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
this.hlpticketdetailForm.markAsUntouched();
this.hlpticketdetailForm.markAsPristine();
}
onSelectedticketid(ticketidDetail: any) {
if (ticketidDetail.ticketid && ticketidDetail) {
this.hlpticketdetailForm.patchValue({
ticketid: ticketidDetail.ticketid,
ticketiddesc: ticketidDetail.subject,

});

}
}

onSelectedactionuser(actionuserDetail: any) {
if (actionuserDetail.userid && actionuserDetail) {
this.hlpticketdetailForm.patchValue({
actionuser: actionuserDetail.userid,
actionuserdesc: actionuserDetail.username,

});

}
}




resetForm() {
if (this.hlpticketdetailForm != null)
this.hlpticketdetailForm.reset();
this.hlpticketdetailForm.patchValue({
actionuser: this.sessiondata.userid,
actionuserdesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.hlpticketdetailForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let ticketdetailid = this.hlpticketdetailForm.get('ticketdetailid').value;
        if(ticketdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpticketdetailservice.deletehlpticketdetail(ticketdetailid).then(res =>
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
    this.hlpticketdetailForm.patchValue({
        ticketdetailid: null
    });
    if(this.hlpticketdetailservice.formData.ticketdetailid!=null)this.hlpticketdetailservice.formData.ticketdetailid=null;
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
        else if(key=="assignedto")
this.hlpticketdetailForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="assigneddate")
this.hlpticketdetailForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actiondate")
this.hlpticketdetailForm.patchValue({"actiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="tatends")
this.hlpticketdetailForm.patchValue({"tatends":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hlpticketdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hlpticketdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hlpticketdetailForm.controls[key]!=undefined)
{
this.hlpticketdetailForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hlpticketdetails",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
ticketdetailidonChange(evt:any){
let e=evt.value;
}
ticketidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
}
actionuseronChange(evt:any){
let e=evt.value;
}
assigneddateonChange(evt:any){
let e=evt.value;
}
actiondateonChange(evt:any){
let e=evt.value;
}
tatendsonChange(evt:any){
let e=evt.value;
}
actionremarksonChange(evt:any){
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
????


edithlpticketdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hlpticketdetailservice.gethlpticketdetailsByEID(pkcol).then(res => {

this.hlpticketdetailservice.formData=res.hlpticketdetail;
let formproperty=res.hlpticketdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hlpticketdetail.pkcol;
this.formid=res.hlpticketdetail.ticketdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.hlpticketdetailservice.formData=res.hlpticketdetail;
this.formid=res.hlpticketdetail.ticketdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hlpticketdetailForm.patchValue({
ticketdetailid: res.hlpticketdetail.ticketdetailid,
ticketid: res.hlpticketdetail.ticketid,
ticketiddesc: res.hlpticketdetail.ticketiddesc,
sourcefield: res.hlpticketdetail.sourcefield,
sourcereference: res.hlpticketdetail.sourcereference,
assignedto: JSON.parse(res.hlpticketdetail.assignedto),
actionuser: res.hlpticketdetail.actionuser,
actionuserdesc: res.hlpticketdetail.actionuserdesc,
assigneddate: this.ngbDateParserFormatter.parse(res.hlpticketdetail.assigneddate),
actiondate: this.ngbDateParserFormatter.parse(res.hlpticketdetail.actiondate),
tatends: this.ngbDateParserFormatter.parse(res.hlpticketdetail.tatends),
actionremarks: res.hlpticketdetail.actionremarks,
customfield: res.hlpticketdetail.customfield,
attachment: JSON.parse(res.hlpticketdetail.attachment),
status: res.hlpticketdetail.status,
statusdesc: res.hlpticketdetail.statusdesc,
});
if(this.hlpticketdetailForm.get('customfield').value!=null && this.hlpticketdetailForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hlpticketdetailForm.get('customfield').value);
this.FillCustomField();
if(this.hlpticketdetailForm.get('attachment').value!=null && this.hlpticketdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hlpticketdetailForm.get('attachment').value);
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
  for (let key in this.hlpticketdetailForm.controls) {
    if (this.hlpticketdetailForm.controls[key] != null) {
if(false)
{
if(this.hlpticketdetailservice.formData!=null && this.hlpticketdetailservice.formData[key]!=null  && this.hlpticketdetailservice.formData[key]!='[]' && this.hlpticketdetailservice.formData[key]!=undefined && this.hlpticketdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hlpticketdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hlpticketdetailservice.formData!=null && this.hlpticketdetailservice.formData[key]!=null   && this.hlpticketdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hlpticketdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hlpticketdetailservice.formData!=null && this.hlpticketdetailservice.formData[key]!=null   && this.hlpticketdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hlpticketdetailservice.formData[key]+"'><div class='progress__number'>"+this.hlpticketdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpticketdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hlpticketdetailForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hlpticketdetailForm.value;
if(this.hlpticketdetailForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.hlpticketdetailForm.get('assignedto').value);
obj.assigneddate=new Date(this.hlpticketdetailForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('assigneddate').value)+'  UTC' :null);
obj.actiondate=new Date(this.hlpticketdetailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('actiondate').value)+'  UTC' :null);
obj.tatends=new Date(this.hlpticketdetailForm.get('tatends').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('tatends').value)+'  UTC' :null);
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

private hlpticketdetailtoggleOption(){
this.hlpticketdetailshowOption = this.hlpticketdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hlpticketdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hlpticketdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hlpticketdetailForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hlpticketdetailservice.formData=this.hlpticketdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hlpticketdetailForm.controls[key] != null)
    {
        this.hlpticketdetailservice.formData[key] = this.hlpticketdetailForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(this.hlpticketdetailForm.get('assignedto').value!=null)this.hlpticketdetailservice.formData.assignedto=JSON.stringify(this.hlpticketdetailForm.get('assignedto').value);
this.hlpticketdetailservice.formData.assigneddate=new Date(this.hlpticketdetailForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('assigneddate').value)+'  UTC' :null);
this.hlpticketdetailservice.formData.actiondate=new Date(this.hlpticketdetailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('actiondate').value)+'  UTC' :null);
this.hlpticketdetailservice.formData.tatends=new Date(this.hlpticketdetailForm.get('tatends').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('tatends').value)+'  UTC' :null);
if(customfields!=null)this.hlpticketdetailservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.hlpticketdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hlpticketdetailservice.formData);
this.hlpticketdetailservice.formData=this.hlpticketdetailForm.value;
this.hlpticketdetailservice.saveOrUpdatehlpticketdetails().subscribe(
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
this.dialogRef.close((res as any).hlpticketdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hlpticketdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpticketdetail);
}
else
{
this.FillData(res);
}
}
this.hlpticketdetailForm.markAsUntouched();
this.hlpticketdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditticketid( ticketid) {
/*let ScreenType='2';
this.dialog.open(hlpticketComponent, 
{
data: {ticketid:this.hlpticketdetailForm.get('ticketid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditactionuser( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hlpticketdetailForm.get('actionuser').value, ScreenType:2 }
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



