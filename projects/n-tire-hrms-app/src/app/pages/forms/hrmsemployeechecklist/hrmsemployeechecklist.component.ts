import { hrmsemployeechecklistService } from './../../../service/hrmsemployeechecklist.service';
import { hrmsemployeechecklist } from './../../../model/hrmsemployeechecklist.model';
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
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
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
selector: 'app-hrmsemployeechecklist',
templateUrl: './hrmsemployeechecklist.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeechecklistComponent implements OnInit {
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
CustomFormField:string="categoryid";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulatehrmsemployeechecklists:boolean=false;
datahrmsemployeechecklistsemployeeid3:any=[];
datahrmsemployeechecklistscategoryid3:any=[];
datahrmsemployeechecklistssubcategoryid3:any=[];
datahrmsemployeechecklistsreceivedby3:any=[];
datahrmsemployeechecklistsowner3:any=[];
 hrmsemployeechecklistForm: FormGroup;
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
receivedbyList: bousermaster[];
receivedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
receivedby_bousermastersForm: FormGroup;//autocomplete
receivedby_bousermastersoptions:any;//autocomplete
receivedby_bousermastersformatter:any;//autocomplete
ownerList: bousermaster[];
owneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
owner_bousermastersForm: FormGroup;//autocomplete
owner_bousermastersoptions:any;//autocomplete
owner_bousermastersformatter:any;//autocomplete
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
hrmsemployeechecklistshowOption:boolean;
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
private hrmsemployeechecklistservice: hrmsemployeechecklistService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
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
this.hrmsemployeechecklistForm  = this.fb.group({
pk:[null],
ImageName: [null],
employeeid: [null],
employeeiddesc: [null],
employeecheckid: [null],
sourcefield: [null],
sourcereference: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
documentname: [null],
submitdate: [null],
received: [null],
receivedby: [null],
receivedbydesc: [null],
receiveddate: [null],
owner: [null],
ownerdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeechecklistForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeechecklistForm.dirty && this.hrmsemployeechecklistForm.touched ) {
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
????let??pos??=??this.pkList.map(function(e:any)??{??return e.employeecheckid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.employeecheckid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.employeecheckid && pkDetail) {
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
let hrmsemployeechecklistid = null;

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
this.formid=hrmsemployeechecklistid;
//this.sharedService.alert(hrmsemployeechecklistid);

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
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeechecklistservice.formData && this.hrmsemployeechecklistservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeechecklistForm.patchValue({
    employeeid: this.hrmsemployeechecklistservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeechecklistservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeechecklistForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
this.bomasterdataservice.getList("qnkbi").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.hrmsemployeechecklistservice.formData && this.hrmsemployeechecklistservice.formData.subcategoryid){this.hrmsemployeechecklistForm.patchValue({
    subcategoryid: this.hrmsemployeechecklistservice.formData.subcategoryid,
    subcategoryiddesc: this.hrmsemployeechecklistservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.receivedbyList = res as bousermaster[];
if(this.hrmsemployeechecklistservice.formData && this.hrmsemployeechecklistservice.formData.receivedby){
this.receivedbyoptionsEvent.emit(this.receivedbyList);
this.hrmsemployeechecklistForm.patchValue({
    receivedby: this.hrmsemployeechecklistservice.formData.receivedby,
    receivedbydesc: this.hrmsemployeechecklistservice.formData.receivedbydesc,
});
}
{
let arrreceivedby = this.receivedbyList.filter(v => v.userid == this.hrmsemployeechecklistForm.get('receivedby').value);
let objreceivedby;
if (arrreceivedby.length > 0) objreceivedby = arrreceivedby[0];
if (objreceivedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.receivedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.receivedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.receivedby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.ownerList = res as bousermaster[];
if(this.hrmsemployeechecklistservice.formData && this.hrmsemployeechecklistservice.formData.owner){
this.owneroptionsEvent.emit(this.ownerList);
this.hrmsemployeechecklistForm.patchValue({
    owner: this.hrmsemployeechecklistservice.formData.owner,
    ownerdesc: this.hrmsemployeechecklistservice.formData.ownerdesc,
});
}
{
let arrowner = this.ownerList.filter(v => v.userid == this.hrmsemployeechecklistForm.get('owner').value);
let objowner;
if (arrowner.length > 0) objowner = arrowner[0];
if (objowner)
{
}
}
}
).catch((err) => {console.log(err);});
this.owner_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.ownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.owner_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmsemployeechecklistservice.gethrmsemployeechecklistsList().then(res => {
      this.pkList = res as hrmsemployeechecklist[];
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
this.hrmsemployeechecklistForm.markAsUntouched();
this.hrmsemployeechecklistForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeechecklistForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}

onSelectedreceivedby(receivedbyDetail: any) {
if (receivedbyDetail.userid && receivedbyDetail) {
this.hrmsemployeechecklistForm.patchValue({
receivedby: receivedbyDetail.userid,
receivedbydesc: receivedbyDetail.username,

});

}
}

onSelectedowner(ownerDetail: any) {
if (ownerDetail.userid && ownerDetail) {
this.hrmsemployeechecklistForm.patchValue({
owner: ownerDetail.userid,
ownerdesc: ownerDetail.username,

});

}
}




resetForm() {
if (this.hrmsemployeechecklistForm != null)
this.hrmsemployeechecklistForm.reset();
this.hrmsemployeechecklistForm.patchValue({
receivedby: this.sessiondata.userid,
receivedbydesc: this.sessiondata.username,
owner: this.sessiondata.userid,
ownerdesc: this.sessiondata.username,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.hrmsemployeechecklistForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let employeecheckid = this.hrmsemployeechecklistForm.get('employeecheckid').value;
        if(employeecheckid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeechecklistservice.deletehrmsemployeechecklist(employeecheckid).then(res =>
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
    this.hrmsemployeechecklistForm.patchValue({
        employeecheckid: null
    });
    if(this.hrmsemployeechecklistservice.formData.employeecheckid!=null)this.hrmsemployeechecklistservice.formData.employeecheckid=null;
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
        else if(key=="submitdate")
this.hrmsemployeechecklistForm.patchValue({"submitdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="receiveddate")
this.hrmsemployeechecklistForm.patchValue({"receiveddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeechecklistForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeechecklistForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeechecklistForm.controls[key]!=undefined)
{
this.hrmsemployeechecklistForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservicelist=await this.customfieldservice.getcustomfieldconfigurationsByTable("hrmsemployeechecklists",this.CustomFormName,this.CustomFormField,this.hrmsemployeechecklistForm.get(this.CustomFormField).value,this.customfieldjson).then(res=>{
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
employeeidonChange(evt:any){
let e=evt.value;
}
employeecheckidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
categoryidonChange(evt:any){
let e=evt.value;
this.FillCustomField();
this.hrmsemployeechecklistForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.hrmsemployeechecklistForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
documentnameonChange(evt:any){
let e=evt.value;
}
submitdateonChange(evt:any){
let e=evt.value;
}
receivedonChange(evt:any){
let e=evt.value;
}
receivedbyonChange(evt:any){
let e=evt.value;
}
receiveddateonChange(evt:any){
let e=evt.value;
}
owneronChange(evt:any){
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


edithrmsemployeechecklists() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeechecklistservice.gethrmsemployeechecklistsByEID(pkcol).then(res => {

this.hrmsemployeechecklistservice.formData=res.hrmsemployeechecklist;
let formproperty=res.hrmsemployeechecklist.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeechecklist.pkcol;
this.formid=res.hrmsemployeechecklist.employeecheckid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeechecklist.employeecheckid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeechecklistForm.patchValue({
employeeid: res.hrmsemployeechecklist.employeeid,
employeeiddesc: res.hrmsemployeechecklist.employeeiddesc,
employeecheckid: res.hrmsemployeechecklist.employeecheckid,
sourcefield: res.hrmsemployeechecklist.sourcefield,
sourcereference: res.hrmsemployeechecklist.sourcereference,
categoryid: res.hrmsemployeechecklist.categoryid,
categoryiddesc: res.hrmsemployeechecklist.categoryiddesc,
subcategoryid: res.hrmsemployeechecklist.subcategoryid,
subcategoryiddesc: res.hrmsemployeechecklist.subcategoryiddesc,
documentname: res.hrmsemployeechecklist.documentname,
submitdate: this.ngbDateParserFormatter.parse(res.hrmsemployeechecklist.submitdate),
received: res.hrmsemployeechecklist.received,
receivedby: res.hrmsemployeechecklist.receivedby,
receivedbydesc: res.hrmsemployeechecklist.receivedbydesc,
receiveddate: this.ngbDateParserFormatter.parse(res.hrmsemployeechecklist.receiveddate),
owner: res.hrmsemployeechecklist.owner,
ownerdesc: res.hrmsemployeechecklist.ownerdesc,
customfield: res.hrmsemployeechecklist.customfield,
attachment: JSON.parse(res.hrmsemployeechecklist.attachment),
status: res.hrmsemployeechecklist.status,
statusdesc: res.hrmsemployeechecklist.statusdesc,
});
if(this.hrmsemployeechecklistForm.get('customfield').value!=null && this.hrmsemployeechecklistForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hrmsemployeechecklistForm.get('customfield').value);
this.FillCustomField();
if(this.hrmsemployeechecklistForm.get('attachment').value!=null && this.hrmsemployeechecklistForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeechecklistForm.get('attachment').value);
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
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
  for (let key in this.hrmsemployeechecklistForm.controls) {
    if (this.hrmsemployeechecklistForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeechecklistservice.formData!=null && this.hrmsemployeechecklistservice.formData[key]!=null  && this.hrmsemployeechecklistservice.formData[key]!='[]' && this.hrmsemployeechecklistservice.formData[key]!=undefined && this.hrmsemployeechecklistservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeechecklistservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeechecklistservice.formData!=null && this.hrmsemployeechecklistservice.formData[key]!=null   && this.hrmsemployeechecklistservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeechecklistservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeechecklistservice.formData!=null && this.hrmsemployeechecklistservice.formData[key]!=null   && this.hrmsemployeechecklistservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeechecklistservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeechecklistservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeechecklistForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeechecklistForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hrmsemployeechecklistForm.value;
obj.submitdate=new Date(this.hrmsemployeechecklistForm.get('submitdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeechecklistForm.get('submitdate').value)+'  UTC' :null);
obj.receiveddate=new Date(this.hrmsemployeechecklistForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeechecklistForm.get('receiveddate').value)+'  UTC' :null);
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

private hrmsemployeechecklisttoggleOption(){
this.hrmsemployeechecklistshowOption = this.hrmsemployeechecklistshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeechecklistForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeechecklistForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeechecklistForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeechecklistservice.formData=this.hrmsemployeechecklistForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeechecklistForm.controls[key] != null)
    {
        this.hrmsemployeechecklistservice.formData[key] = this.hrmsemployeechecklistForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hrmsemployeechecklistservice.formData.submitdate=new Date(this.hrmsemployeechecklistForm.get('submitdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeechecklistForm.get('submitdate').value)+'  UTC' :null);
this.hrmsemployeechecklistservice.formData.receiveddate=new Date(this.hrmsemployeechecklistForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeechecklistForm.get('receiveddate').value)+'  UTC' :null);
this.hrmsemployeechecklistservice.formData.customfield=JSON.stringify(customfields);
this.hrmsemployeechecklistservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeechecklistservice.formData);
this.hrmsemployeechecklistservice.formData=this.hrmsemployeechecklistForm.value;
this.hrmsemployeechecklistservice.saveOrUpdatehrmsemployeechecklists().subscribe(
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
this.dialogRef.close((res as any).hrmsemployeechecklist);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeechecklistservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeechecklist);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeechecklistForm.markAsUntouched();
this.hrmsemployeechecklistForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeechecklistForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeechecklistForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.hrmsemployeechecklistForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreceivedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeechecklistForm.get('receivedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditowner( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeechecklistForm.get('owner').value, ScreenType:2 }
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



