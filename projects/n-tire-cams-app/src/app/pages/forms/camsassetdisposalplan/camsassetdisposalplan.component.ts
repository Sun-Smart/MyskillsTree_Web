import { camsassetdisposalplanService } from './../../../service/camsassetdisposalplan.service';
import { camsassetdisposalplan } from './../../../model/camsassetdisposalplan.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { camsassetdisposal } from './../../../model/camsassetdisposal.model';
import { camsassetdisposalComponent } from './../../../pages/forms/camsassetdisposal/camsassetdisposal.component';
//FK services
import { camsassetmaster,IcamsassetmasterResponse } from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
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
selector: 'app-camsassetdisposalplan',
templateUrl: './camsassetdisposalplan.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetdisposalplanComponent implements OnInit {
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
bfilterPopulatecamsassetdisposalplans:boolean=false;
datacamsassetdisposalplanspreparedby3:any=[];
datacamsassetdisposalplansdisposalmethod3:any=[];
datacamsassetdisposalsdisposedby3:any=[];
datacamsassetdisposalsassetid3:any=[];
datacamsassetdisposalsdisposalmethod3:any=[];
datacamsassetdisposalsdisposedreason3:any=[];
datacamsassetdisposalsdisposalplanid3:any=[];
bfilterPopulatecamsassetdisposals:boolean=false;
@ViewChild('tblcamsassetdisposalssource',{static:false}) tblcamsassetdisposalssource: Ng2SmartTableComponent;
 camsassetdisposalplanForm: FormGroup;
preparedbyList: bousermaster[];
preparedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
preparedby_bousermastersForm: FormGroup;//autocomplete
preparedby_bousermastersoptions:any;//autocomplete
preparedby_bousermastersformatter:any;//autocomplete
disposalmethodList: boconfigvalue[];
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
camsassetdisposalplanshowOption:boolean;
camsassetdisposalshowOption:boolean;
sessiondata:any;
sourcekey:any;



camsassetdisposalsvisiblelist:any;
camsassetdisposalshidelist:any;

DeletedcamsassetdisposalIDs: string="";
camsassetdisposalsID: string = "1";
camsassetdisposalsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsassetdisposalplanservice: camsassetdisposalplanService,
private bousermasterservice: bousermasterService,
private camsassetmasterservice: camsassetmasterService,
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
this.camsassetdisposalplanForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
disposalplanid: [null],
reference: [null],
details: [null],
preparedby: [null],
preparedbydesc: [null],
prepareddate: [null],
disposaldate: [null],
disposalmethod: [null],
disposalmethoddesc: [null],
approvedby: [null],
verifiedby: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassetdisposalplanForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetdisposalplanForm.dirty && this.camsassetdisposalplanForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.disposalplanid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.disposalplanid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.disposalplanid && pkDetail) {
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
let camsassetdisposalplanid = null;

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
this.formid=camsassetdisposalplanid;
//this.sharedService.alert(camsassetdisposalplanid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamsassetdisposalsTableConfig();
  setTimeout(() => {
  this.SetcamsassetdisposalsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.preparedbyList = res as bousermaster[];
if(this.camsassetdisposalplanservice.formData && this.camsassetdisposalplanservice.formData.preparedby){
this.preparedbyoptionsEvent.emit(this.preparedbyList);
this.camsassetdisposalplanForm.patchValue({
    preparedby: this.camsassetdisposalplanservice.formData.preparedby,
    preparedbydesc: this.camsassetdisposalplanservice.formData.preparedbydesc,
});
}
{
let arrpreparedby = this.preparedbyList.filter(v => v.userid == this.camsassetdisposalplanForm.get('preparedby').value);
let objpreparedby;
if (arrpreparedby.length > 0) objpreparedby = arrpreparedby[0];
if (objpreparedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.preparedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.preparedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.preparedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("disposalmethod").then(res => this.disposalmethodList = res as boconfigvalue[]);

//autocomplete
    this.camsassetdisposalplanservice.getcamsassetdisposalplansList().then(res => {
      this.pkList = res as camsassetdisposalplan[];
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
this.camsassetdisposalplanForm.markAsUntouched();
this.camsassetdisposalplanForm.markAsPristine();
}
onSelectedpreparedby(preparedbyDetail: any) {
if (preparedbyDetail.userid && preparedbyDetail) {
this.camsassetdisposalplanForm.patchValue({
preparedby: preparedbyDetail.userid,
preparedbydesc: preparedbyDetail.username,

});

}
}




resetForm() {
if (this.camsassetdisposalplanForm != null)
this.camsassetdisposalplanForm.reset();
this.camsassetdisposalplanForm.patchValue({
preparedby: this.sessiondata.userid,
preparedbydesc: this.sessiondata.username,
});
setTimeout(() => {
this.camsassetdisposalplanservice.camsassetdisposals=[];
this.camsassetdisposalsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let disposalplanid = this.camsassetdisposalplanForm.get('disposalplanid').value;
        if(disposalplanid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetdisposalplanservice.deletecamsassetdisposalplan(disposalplanid).then(res =>
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
    this.camsassetdisposalplanForm.patchValue({
        disposalplanid: null
    });
    if(this.camsassetdisposalplanservice.formData.disposalplanid!=null)this.camsassetdisposalplanservice.formData.disposalplanid=null;
for (let i=0;i<this.camsassetdisposalplanservice.camsassetdisposals.length;i++) {
this.camsassetdisposalplanservice.camsassetdisposals[i].disposalid=null;
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
        else if(key=="prepareddate")
this.camsassetdisposalplanForm.patchValue({"prepareddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="disposaldate")
this.camsassetdisposalplanForm.patchValue({"disposaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.camsassetdisposalplanForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassetdisposalplanForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassetdisposalplanForm.controls[key]!=undefined)
{
this.camsassetdisposalplanForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetdisposalplans",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
branchidonChange(evt:any){
let e=evt.value;
}
disposalplanidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
preparedbyonChange(evt:any){
let e=evt.value;
}
prepareddateonChange(evt:any){
let e=evt.value;
}
disposaldateonChange(evt:any){
let e=evt.value;
}
disposalmethodonChange(evt:any){
let e=this.f.disposalmethod.value as any;
this.camsassetdisposalplanForm.patchValue({disposalmethoddesc:evt.options[evt.options.selectedIndex].text});
}
approvedbyonChange(evt:any){
let e=evt.value;
}
verifiedbyonChange(evt:any){
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
  


editcamsassetdisposalplans() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassetdisposalplanservice.getcamsassetdisposalplansByEID(pkcol).then(res => {

this.camsassetdisposalplanservice.formData=res.camsassetdisposalplan;
let formproperty=res.camsassetdisposalplan.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassetdisposalplan.pkcol;
this.formid=res.camsassetdisposalplan.disposalplanid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassetdisposalplan.disposalplanid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetdisposalplanForm.patchValue({
branchid: res.camsassetdisposalplan.branchid,
disposalplanid: res.camsassetdisposalplan.disposalplanid,
reference: res.camsassetdisposalplan.reference,
details: res.camsassetdisposalplan.details,
preparedby: res.camsassetdisposalplan.preparedby,
preparedbydesc: res.camsassetdisposalplan.preparedbydesc,
prepareddate: this.ngbDateParserFormatter.parse(res.camsassetdisposalplan.prepareddate),
disposaldate: this.ngbDateParserFormatter.parse(res.camsassetdisposalplan.disposaldate),
disposalmethod: res.camsassetdisposalplan.disposalmethod,
disposalmethoddesc: res.camsassetdisposalplan.disposalmethoddesc,
approvedby: res.camsassetdisposalplan.approvedby,
verifiedby: res.camsassetdisposalplan.verifiedby,
remarks: res.camsassetdisposalplan.remarks,
customfield: res.camsassetdisposalplan.customfield,
attachment: JSON.parse(res.camsassetdisposalplan.attachment),
status: res.camsassetdisposalplan.status,
statusdesc: res.camsassetdisposalplan.statusdesc,
});
this.camsassetdisposalsvisiblelist=res.camsassetdisposalsvisiblelist;
if(this.camsassetdisposalplanForm.get('customfield').value!=null && this.camsassetdisposalplanForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetdisposalplanForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetdisposalplanForm.get('attachment').value!=null && this.camsassetdisposalplanForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassetdisposalplanForm.get('attachment').value);
//Child Tables if any
this.camsassetdisposalplanservice.camsassetdisposals = res.camsassetdisposals;
this.SetcamsassetdisposalsTableConfig();
this.camsassetdisposalsLoadTable();
  setTimeout(() => {
  this.SetcamsassetdisposalsTableddConfig();
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
  for (let key in this.camsassetdisposalplanForm.controls) {
    if (this.camsassetdisposalplanForm.controls[key] != null) {
if(false)
{
if(this.camsassetdisposalplanservice.formData!=null && this.camsassetdisposalplanservice.formData[key]!=null  && this.camsassetdisposalplanservice.formData[key]!='[]' && this.camsassetdisposalplanservice.formData[key]!=undefined && this.camsassetdisposalplanservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassetdisposalplanservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassetdisposalplanservice.formData!=null && this.camsassetdisposalplanservice.formData[key]!=null   && this.camsassetdisposalplanservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassetdisposalplanservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassetdisposalplanservice.formData!=null && this.camsassetdisposalplanservice.formData[key]!=null   && this.camsassetdisposalplanservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassetdisposalplanservice.formData[key]+"'><div class='progress__number'>"+this.camsassetdisposalplanservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetdisposalplanForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetdisposalplanForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetdisposalplanForm.value;
obj.prepareddate=new Date(this.camsassetdisposalplanForm.get('prepareddate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalplanForm.get('prepareddate').value)+'  UTC' :null);
obj.disposaldate=new Date(this.camsassetdisposalplanForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalplanForm.get('disposaldate').value)+'  UTC' :null);
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

private camsassetdisposalplantoggleOption(){
this.camsassetdisposalplanshowOption = this.camsassetdisposalplanshowOption === true ? false : true;
}

private camsassetdisposaltoggleOption(){
this.camsassetdisposalshowOption = this.camsassetdisposalshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetdisposalplanForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetdisposalplanForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetdisposalplanForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetdisposalplanservice.formData=this.camsassetdisposalplanForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetdisposalplanForm.controls[key] != null)
    {
        this.camsassetdisposalplanservice.formData[key] = this.camsassetdisposalplanForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetdisposalplanservice.formData.prepareddate=new Date(this.camsassetdisposalplanForm.get('prepareddate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalplanForm.get('prepareddate').value)+'  UTC' :null);
this.camsassetdisposalplanservice.formData.disposaldate=new Date(this.camsassetdisposalplanForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalplanForm.get('disposaldate').value)+'  UTC' :null);
if(customfields!=null)this.camsassetdisposalplanservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassetdisposalplanservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.camsassetdisposalplanservice.formData.DeletedcamsassetdisposalIDs = this.DeletedcamsassetdisposalIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetdisposalplanservice.formData);
this.camsassetdisposalplanservice.formData=this.camsassetdisposalplanForm.value;
this.camsassetdisposalplanservice.saveOrUpdatecamsassetdisposalplans().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.camsassetdisposalssource.data)
{
    for (let i = 0; i < this.camsassetdisposalssource.data.length; i++)
    {
        if (this.camsassetdisposalssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassetdisposalssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetdisposalplan);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetdisposalplanservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetdisposalplan);
}
else
{
this.FillData(res);
}
}
this.camsassetdisposalplanForm.markAsUntouched();
this.camsassetdisposalplanForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpreparedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsassetdisposalplanForm.get('preparedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamsassetdisposal(event:any,disposalid:any, disposalplanid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassetdisposalComponent, 
{
data:  {  showview:false,save:false,event,disposalid, disposalplanid,visiblelist:this.camsassetdisposalsvisiblelist,  hidelist:this.camsassetdisposalshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassetdisposalssource.add(res);
this.camsassetdisposalssource.refresh();
}
else
{
this.camsassetdisposalssource.update(event.data, res);
}
}
});
}

onDeletecamsassetdisposal(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassetdisposalIDs += childID + ",";
this.camsassetdisposalplanservice.camsassetdisposals.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camsassetdisposals
camsassetdisposalssettings:any;
camsassetdisposalssource: any;

showcamsassetdisposalsCheckbox()
{
debugger;
if(this.tblcamsassetdisposalssource.settings['selectMode']== 'multi')this.tblcamsassetdisposalssource.settings['selectMode']= 'single';
else
this.tblcamsassetdisposalssource.settings['selectMode']= 'multi';
this.tblcamsassetdisposalssource.initGrid();
}
deletecamsassetdisposalsAll()
{
this.tblcamsassetdisposalssource.settings['selectMode'] = 'single';
}
showcamsassetdisposalsFilter()
{
  setTimeout(() => {
  this.SetcamsassetdisposalsTableddConfig();
  });
      if(this.tblcamsassetdisposalssource.settings!=null)this.tblcamsassetdisposalssource.settings['hideSubHeader'] =!this.tblcamsassetdisposalssource.settings['hideSubHeader'];
this.tblcamsassetdisposalssource.initGrid();
}
showcamsassetdisposalsInActive()
{
}
enablecamsassetdisposalsInActive()
{
}
async SetcamsassetdisposalsTableddConfig()
{
if(!this.bfilterPopulatecamsassetdisposals){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetdisposalsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassetdisposalsassetid3.push(obj);
}
if((this.tblcamsassetdisposalssource.settings as any).columns['assetid'])
{
(this.tblcamsassetdisposalssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetdisposalsassetid3));
this.tblcamsassetdisposalssource.initGrid();
}
});
}
this.bfilterPopulatecamsassetdisposals=true;
}
async camsassetdisposalsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassetdisposalsTableConfig()
{
this.camsassetdisposalssettings = {
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
disposalmethod: {
title: 'Disposal Method',
type: '',
filter:true,
},
disposedby: {
title: 'Disposed By',
type: 'number',
filter:true,
},
disposaldate: {
title: 'Disposal Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
accountdate: {
title: 'Account Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
disposalamount: {
title: 'Disposal Amount',
type: 'number',
filter:true,
},
disposedreason: {
title: 'Disposed Reason',
type: '',
filter:true,
},
},
};
}
camsassetdisposalsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetdisposalsID)>=0)
{
this.camsassetdisposalssource=new LocalDataSource();
this.camsassetdisposalssource.load(this.camsassetdisposalplanservice.camsassetdisposals as  any as LocalDataSource);
this.camsassetdisposalssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassetdisposalsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetdisposalplanservice.camsassetdisposals.length == 0)
{
    this.tblcamsassetdisposalssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassetdisposal();
    this.camsassetdisposalplanservice.camsassetdisposals.push(obj);
    this.camsassetdisposalssource.refresh();
    if ((this.camsassetdisposalplanservice.camsassetdisposals.length / this.camsassetdisposalssource.getPaging().perPage).toFixed(0) + 1 != this.camsassetdisposalssource.getPaging().page)
    {
        this.camsassetdisposalssource.setPage((this.camsassetdisposalplanservice.camsassetdisposals.length / this.camsassetdisposalssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassetdisposalssource.grid.edit(this.tblcamsassetdisposalssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassetdisposalssource.data.indexOf(event.data);
this.onDeletecamsassetdisposal(event,event.data.disposalid,((this.camsassetdisposalssource.getPaging().page-1) *this.camsassetdisposalssource.getPaging().perPage)+index);
this.camsassetdisposalssource.refresh();
break;
}
}

*/
camsassetdisposalsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassetdisposal(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassetdisposal(event,event.data.disposalid,this.formid);
break;
case 'delete':
this.onDeletecamsassetdisposal(event,event.data.disposalid,((this.camsassetdisposalssource.getPaging().page-1) *this.camsassetdisposalssource.getPaging().perPage)+event.index);
this.camsassetdisposalssource.refresh();
break;
}
}
camsassetdisposalsonDelete(obj) {
let disposalid=obj.data.disposalid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetdisposalplanservice.deletecamsassetdisposalplan(disposalid).then(res=>
this.camsassetdisposalsLoadTable()
);
}
}
camsassetdisposalsPaging(val)
{
debugger;
this.camsassetdisposalssource.setPaging(1, val, true);
}

handlecamsassetdisposalsGridSelected(event:any) {
this.camsassetdisposalsselectedindex=this.camsassetdisposalplanservice.camsassetdisposals.findIndex(i => i.disposalid === event.data.disposalid);
}
IscamsassetdisposalsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetdisposalsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassetdisposals

}



