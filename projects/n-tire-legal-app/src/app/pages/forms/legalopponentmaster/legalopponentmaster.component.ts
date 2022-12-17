import { legalopponentmasterService } from './../../../service/legalopponentmaster.service';
import { legalopponentmaster } from './../../../model/legalopponentmaster.model';
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
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
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
selector: 'app-legalopponentmaster',
templateUrl: './legalopponentmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalopponentmasterComponent implements OnInit {
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
bfilterPopulatelegalopponentmasters:boolean=false;
datalegalopponentmasterscountryid3:any=[];
datalegalopponentmastersstateid3:any=[];
datalegalopponentmasterscityid3:any=[];
 legalopponentmasterForm: FormGroup;
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
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
legalopponentmastershowOption:boolean;
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
private legalopponentmasterservice: legalopponentmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.legalopponentmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
opponentid: [null],
customerid: [null],
opponentname: [null],
mobilenumber: [null],
emailid: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pin: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalopponentmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalopponentmasterForm.dirty && this.legalopponentmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
emailidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].opponentid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Email value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
mobilenumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].opponentid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Mobile Number value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.opponentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.opponentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.opponentid && pkDetail) {
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
let legalopponentmasterid = null;

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
this.formid=legalopponentmasterid;
//this.sharedService.alert(legalopponentmasterid);

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
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.legalopponentmasterservice.formData && this.legalopponentmasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.legalopponentmasterForm.patchValue({
    countryid: this.legalopponentmasterservice.formData.countryid,
    countryiddesc: this.legalopponentmasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.legalopponentmasterForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
this.bostateservice.getbostatesList().then(res => 
{
this.stateidList = res as bostate[];
if(this.legalopponentmasterservice.formData && this.legalopponentmasterservice.formData.stateid){
this.stateidoptionsEvent.emit(this.stateidList);
this.legalopponentmasterForm.patchValue({
    stateid: this.legalopponentmasterservice.formData.stateid,
    stateiddesc: this.legalopponentmasterservice.formData.stateiddesc,
});
}
{
let arrstateid = this.stateidList.filter(v => v.stateid == this.legalopponentmasterForm.get('stateid').value);
let objstateid;
if (arrstateid.length > 0) objstateid = arrstateid[0];
if (objstateid)
{
}
}
}
).catch((err) => {console.log(err);});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
this.bocityservice.getbocitiesList().then(res => 
{
this.cityidList = res as bocity[];
if(this.legalopponentmasterservice.formData && this.legalopponentmasterservice.formData.cityid){
this.cityidoptionsEvent.emit(this.cityidList);
this.legalopponentmasterForm.patchValue({
    cityid: this.legalopponentmasterservice.formData.cityid,
    cityiddesc: this.legalopponentmasterservice.formData.cityiddesc,
});
}
{
let arrcityid = this.cityidList.filter(v => v.cityid == this.legalopponentmasterForm.get('cityid').value);
let objcityid;
if (arrcityid.length > 0) objcityid = arrcityid[0];
if (objcityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;

//autocomplete
    this.legalopponentmasterservice.getlegalopponentmastersList().then(res => {
      this.pkList = res as legalopponentmaster[];
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
this.legalopponentmasterForm.markAsUntouched();
this.legalopponentmasterForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.legalopponentmasterForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.legalopponentmasterForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.legalopponentmasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




resetForm() {
if (this.legalopponentmasterForm != null)
this.legalopponentmasterForm.reset();
this.legalopponentmasterForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let opponentid = this.legalopponentmasterForm.get('opponentid').value;
        if(opponentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalopponentmasterservice.deletelegalopponentmaster(opponentid).then(res =>
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
    this.legalopponentmasterForm.patchValue({
        opponentid: null
    });
    if(this.legalopponentmasterservice.formData.opponentid!=null)this.legalopponentmasterservice.formData.opponentid=null;
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
        else if(ctrltype=="string")
{
this.legalopponentmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalopponentmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalopponentmasterForm.controls[key]!=undefined)
{
this.legalopponentmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("legalopponentmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
opponentidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
opponentnameonChange(evt:any){
let e=evt.value;
}
mobilenumberonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
pinonChange(evt:any){
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
  


editlegalopponentmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalopponentmasterservice.getlegalopponentmastersByEID(pkcol).then(res => {

this.legalopponentmasterservice.formData=res.legalopponentmaster;
let formproperty=res.legalopponentmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalopponentmaster.pkcol;
this.formid=res.legalopponentmaster.opponentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalopponentmasterservice.formData=res.legalopponentmaster;
this.formid=res.legalopponentmaster.opponentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalopponentmasterForm.patchValue({
opponentid: res.legalopponentmaster.opponentid,
customerid: res.legalopponentmaster.customerid,
opponentname: res.legalopponentmaster.opponentname,
mobilenumber: res.legalopponentmaster.mobilenumber,
emailid: res.legalopponentmaster.emailid,
address1: res.legalopponentmaster.address1,
address2: res.legalopponentmaster.address2,
countryid: res.legalopponentmaster.countryid,
countryiddesc: res.legalopponentmaster.countryiddesc,
stateid: res.legalopponentmaster.stateid,
stateiddesc: res.legalopponentmaster.stateiddesc,
cityid: res.legalopponentmaster.cityid,
cityiddesc: res.legalopponentmaster.cityiddesc,
pin: res.legalopponentmaster.pin,
customfield: res.legalopponentmaster.customfield,
attachment: JSON.parse(res.legalopponentmaster.attachment),
status: res.legalopponentmaster.status,
statusdesc: res.legalopponentmaster.statusdesc,
});
if(this.legalopponentmasterForm.get('customfield').value!=null && this.legalopponentmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.legalopponentmasterForm.get('customfield').value);
this.FillCustomField();
if(this.legalopponentmasterForm.get('attachment').value!=null && this.legalopponentmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalopponentmasterForm.get('attachment').value);
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
  for (let key in this.legalopponentmasterForm.controls) {
    if (this.legalopponentmasterForm.controls[key] != null) {
if(false)
{
if(this.legalopponentmasterservice.formData!=null && this.legalopponentmasterservice.formData[key]!=null  && this.legalopponentmasterservice.formData[key]!='[]' && this.legalopponentmasterservice.formData[key]!=undefined && this.legalopponentmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalopponentmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalopponentmasterservice.formData!=null && this.legalopponentmasterservice.formData[key]!=null   && this.legalopponentmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalopponentmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalopponentmasterservice.formData!=null && this.legalopponentmasterservice.formData[key]!=null   && this.legalopponentmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalopponentmasterservice.formData[key]+"'><div class='progress__number'>"+this.legalopponentmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalopponentmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalopponentmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.legalopponentmasterForm.value;
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

private legalopponentmastertoggleOption(){
this.legalopponentmastershowOption = this.legalopponentmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalopponentmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalopponentmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalopponentmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalopponentmasterservice.formData=this.legalopponentmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalopponentmasterForm.controls[key] != null)
    {
        this.legalopponentmasterservice.formData[key] = this.legalopponentmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(customfields!=null)this.legalopponentmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.legalopponentmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalopponentmasterservice.formData);
this.legalopponentmasterservice.formData=this.legalopponentmasterForm.value;
this.legalopponentmasterservice.saveOrUpdatelegalopponentmasters().subscribe(
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
this.dialogRef.close((res as any).legalopponentmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalopponentmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalopponentmaster);
}
else
{
this.FillData(res);
}
}
this.legalopponentmasterForm.markAsUntouched();
this.legalopponentmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.legalopponentmasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.legalopponentmasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.legalopponentmasterForm.get('cityid').value, ScreenType:2 }
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



