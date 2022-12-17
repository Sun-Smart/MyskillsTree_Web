import { qycomplaintmasterService } from './../../../service/qycomplaintmaster.service';
import { qycomplaintmaster } from './../../../model/qycomplaintmaster.model';
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
import { qyrelatedcomplaint } from './../../../model/qyrelatedcomplaint.model';
import { qyrelatedcomplaintComponent } from './../../../pages/forms/qyrelatedcomplaint/qyrelatedcomplaint.component';
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
selector: 'app-qycomplaintmaster',
templateUrl: './qycomplaintmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class qycomplaintmasterComponent implements OnInit {
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
bfilterPopulateqycomplaintmasters:boolean=false;
dataqycomplaintmasterscomplaintsource3:any=[];
dataqycomplaintmasterscomplaintcategory3:any=[];
dataqycomplaintmastersseverity3:any=[];
dataqycomplaintmasterscomplainttype3:any=[];
dataqycomplaintmastersmethodofcontact3:any=[];
dataqycomplaintmastersactiontype3:any=[];
dataqycomplaintmastersactionstatus3:any=[];
bfilterPopulateqyrelatedcomplaints:boolean=false;
@ViewChild('tblqyrelatedcomplaintssource',{static:false}) tblqyrelatedcomplaintssource: Ng2SmartTableComponent;
 qycomplaintmasterForm: FormGroup;
complaintsourceList: boconfigvalue[];
complaintcategoryList: boconfigvalue[];
severityList: boconfigvalue[];
complainttypeList: boconfigvalue[];
methodofcontactList: boconfigvalue[];
actiontypeList: boconfigvalue[];
actionstatusList: boconfigvalue[];
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
qycomplaintmastershowOption:boolean;
qyrelatedcomplaintshowOption:boolean;
sessiondata:any;
sourcekey:any;



qyrelatedcomplaintsvisiblelist:any;
qyrelatedcomplaintshidelist:any;

DeletedqyrelatedcomplaintIDs: string="";
qyrelatedcomplaintsID: string = "1";
qyrelatedcomplaintsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private qycomplaintmasterservice: qycomplaintmasterService,
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
this.qycomplaintmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
complaintid: [null],
branchid: [null],
reference: [null],
complaintdate: [null],
occurencedate: [null],
title: [null],
complaintsource: [null],
complaintsourcedesc: [null],
complainername: [null],
mobileno: [null],
phoneno: [null],
emailid: [null],
complaintagainst: [null],
complaintcategory: [null],
complaintcategorydesc: [null],
severity: [null],
severitydesc: [null],
complainttype: [null],
complainttypedesc: [null],
complaintdetails: [null],
methodofcontact: [null],
methodofcontactdesc: [null],
contactperson: [null],
actiontype: [null],
actiontypedesc: [null],
actiontakenby: [null],
actiontakenon: [null],
actionstatus: [null],
actionstatusdesc: [null],
actionremarks: [null],
brandname: [null],
part: [null],
modelnumber: [null],
complaintqty: [null],
catalognumber: [null],
serialnumber: [null],
uniquenumber: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.qycomplaintmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.qycomplaintmasterForm.dirty && this.qycomplaintmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.complaintid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.complaintid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.complaintid && pkDetail) {
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
let qycomplaintmasterid = null;

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
this.formid=qycomplaintmasterid;
//this.sharedService.alert(qycomplaintmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetqyrelatedcomplaintsTableConfig();
  setTimeout(() => {
  this.SetqyrelatedcomplaintsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("complaintsource").then(res => this.complaintsourceList = res as boconfigvalue[]);
this.configservice.getList("complaintcategory").then(res => this.complaintcategoryList = res as boconfigvalue[]);
this.configservice.getList("severity").then(res => this.severityList = res as boconfigvalue[]);
this.configservice.getList("complainttype").then(res => this.complainttypeList = res as boconfigvalue[]);
this.configservice.getList("methodofcontact").then(res => this.methodofcontactList = res as boconfigvalue[]);
this.configservice.getList("actiontype").then(res => this.actiontypeList = res as boconfigvalue[]);
this.configservice.getList("queryactionstatus").then(res => this.actionstatusList = res as boconfigvalue[]);

//autocomplete
    this.qycomplaintmasterservice.getqycomplaintmastersList().then(res => {
      this.pkList = res as qycomplaintmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.title;

//setting the flag that the screen is not touched 
this.qycomplaintmasterForm.markAsUntouched();
this.qycomplaintmasterForm.markAsPristine();
}



resetForm() {
if (this.qycomplaintmasterForm != null)
this.qycomplaintmasterForm.reset();
this.qycomplaintmasterForm.patchValue({
});
setTimeout(() => {
this.qycomplaintmasterservice.qyrelatedcomplaints=[];
this.qyrelatedcomplaintsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let complaintid = this.qycomplaintmasterForm.get('complaintid').value;
        if(complaintid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.qycomplaintmasterservice.deleteqycomplaintmaster(complaintid).then(res =>
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
    this.qycomplaintmasterForm.patchValue({
        complaintid: null
    });
    if(this.qycomplaintmasterservice.formData.complaintid!=null)this.qycomplaintmasterservice.formData.complaintid=null;
for (let i=0;i<this.qycomplaintmasterservice.qyrelatedcomplaints.length;i++) {
this.qycomplaintmasterservice.qyrelatedcomplaints[i].relatedid=null;
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
        else if(key=="complaintdate")
this.qycomplaintmasterForm.patchValue({"complaintdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="occurencedate")
this.qycomplaintmasterForm.patchValue({"occurencedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actiontakenon")
this.qycomplaintmasterForm.patchValue({"actiontakenon":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.qycomplaintmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.qycomplaintmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.qycomplaintmasterForm.controls[key]!=undefined)
{
this.qycomplaintmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("qycomplaintmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.qycomplaintmasterservice.formData.title!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.qycomplaintmasterservice.formData.title!=null )
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
complaintsourceonChange(evt:any){
let e=this.f.complaintsource.value as any;
this.qycomplaintmasterForm.patchValue({complaintsourcedesc:evt.options[evt.options.selectedIndex].text});
}
complaintcategoryonChange(evt:any){
let e=this.f.complaintcategory.value as any;
this.qycomplaintmasterForm.patchValue({complaintcategorydesc:evt.options[evt.options.selectedIndex].text});
}
severityonChange(evt:any){
let e=this.f.severity.value as any;
this.qycomplaintmasterForm.patchValue({severitydesc:evt.options[evt.options.selectedIndex].text});
}
complainttypeonChange(evt:any){
let e=this.f.complainttype.value as any;
this.qycomplaintmasterForm.patchValue({complainttypedesc:evt.options[evt.options.selectedIndex].text});
}
methodofcontactonChange(evt:any){
let e=this.f.methodofcontact.value as any;
this.qycomplaintmasterForm.patchValue({methodofcontactdesc:evt.options[evt.options.selectedIndex].text});
}
actiontypeonChange(evt:any){
let e=this.f.actiontype.value as any;
this.qycomplaintmasterForm.patchValue({actiontypedesc:evt.options[evt.options.selectedIndex].text});
}
actionstatusonChange(evt:any){
let e=this.f.actionstatus.value as any;
this.qycomplaintmasterForm.patchValue({actionstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editqycomplaintmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.qycomplaintmasterservice.getqycomplaintmastersByEID(pkcol).then(res => {

this.qycomplaintmasterservice.formData=res.qycomplaintmaster;
let formproperty=res.qycomplaintmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.qycomplaintmaster.pkcol;
this.formid=res.qycomplaintmaster.complaintid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.qycomplaintmasterservice.formData=res.qycomplaintmaster;
this.formid=res.qycomplaintmaster.complaintid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.qycomplaintmasterForm.patchValue({
complaintid: res.qycomplaintmaster.complaintid,
branchid: res.qycomplaintmaster.branchid,
reference: res.qycomplaintmaster.reference,
complaintdate: this.ngbDateParserFormatter.parse(res.qycomplaintmaster.complaintdate),
occurencedate: this.ngbDateParserFormatter.parse(res.qycomplaintmaster.occurencedate),
title: res.qycomplaintmaster.title,
complaintsource: res.qycomplaintmaster.complaintsource,
complaintsourcedesc: res.qycomplaintmaster.complaintsourcedesc,
complainername: res.qycomplaintmaster.complainername,
mobileno: res.qycomplaintmaster.mobileno,
phoneno: res.qycomplaintmaster.phoneno,
emailid: res.qycomplaintmaster.emailid,
complaintagainst: res.qycomplaintmaster.complaintagainst,
complaintcategory: res.qycomplaintmaster.complaintcategory,
complaintcategorydesc: res.qycomplaintmaster.complaintcategorydesc,
severity: res.qycomplaintmaster.severity,
severitydesc: res.qycomplaintmaster.severitydesc,
complainttype: res.qycomplaintmaster.complainttype,
complainttypedesc: res.qycomplaintmaster.complainttypedesc,
complaintdetails: res.qycomplaintmaster.complaintdetails,
methodofcontact: res.qycomplaintmaster.methodofcontact,
methodofcontactdesc: res.qycomplaintmaster.methodofcontactdesc,
contactperson: res.qycomplaintmaster.contactperson,
actiontype: res.qycomplaintmaster.actiontype,
actiontypedesc: res.qycomplaintmaster.actiontypedesc,
actiontakenby: res.qycomplaintmaster.actiontakenby,
actiontakenon: this.ngbDateParserFormatter.parse(res.qycomplaintmaster.actiontakenon),
actionstatus: res.qycomplaintmaster.actionstatus,
actionstatusdesc: res.qycomplaintmaster.actionstatusdesc,
actionremarks: res.qycomplaintmaster.actionremarks,
brandname: res.qycomplaintmaster.brandname,
part: res.qycomplaintmaster.part,
modelnumber: res.qycomplaintmaster.modelnumber,
complaintqty: res.qycomplaintmaster.complaintqty,
catalognumber: res.qycomplaintmaster.catalognumber,
serialnumber: res.qycomplaintmaster.serialnumber,
uniquenumber: res.qycomplaintmaster.uniquenumber,
customfield: res.qycomplaintmaster.customfield,
attachment: JSON.parse(res.qycomplaintmaster.attachment),
status: res.qycomplaintmaster.status,
statusdesc: res.qycomplaintmaster.statusdesc,
});
this.qyrelatedcomplaintsvisiblelist=res.qyrelatedcomplaintsvisiblelist;
if(this.qycomplaintmasterForm.get('customfield').value!=null && this.qycomplaintmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.qycomplaintmasterForm.get('customfield').value);
this.FillCustomField();
if(this.qycomplaintmasterForm.get('attachment').value!=null && this.qycomplaintmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.qycomplaintmasterForm.get('attachment').value);
//Child Tables if any
this.qycomplaintmasterservice.qyrelatedcomplaints = res.qyrelatedcomplaints;
this.SetqyrelatedcomplaintsTableConfig();
this.qyrelatedcomplaintsLoadTable();
  setTimeout(() => {
  this.SetqyrelatedcomplaintsTableddConfig();
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
  for (let key in this.qycomplaintmasterForm.controls) {
    if (this.qycomplaintmasterForm.controls[key] != null) {
if(false)
{
if(this.qycomplaintmasterservice.formData!=null && this.qycomplaintmasterservice.formData[key]!=null  && this.qycomplaintmasterservice.formData[key]!='[]' && this.qycomplaintmasterservice.formData[key]!=undefined && this.qycomplaintmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.qycomplaintmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.qycomplaintmasterservice.formData!=null && this.qycomplaintmasterservice.formData[key]!=null   && this.qycomplaintmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.qycomplaintmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.qycomplaintmasterservice.formData!=null && this.qycomplaintmasterservice.formData[key]!=null   && this.qycomplaintmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.qycomplaintmasterservice.formData[key]+"'><div class='progress__number'>"+this.qycomplaintmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.qycomplaintmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.qycomplaintmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.qycomplaintmasterForm.value;
obj.complaintdate=new Date(this.qycomplaintmasterForm.get('complaintdate').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('complaintdate').value)+'  UTC' :null);
obj.occurencedate=new Date(this.qycomplaintmasterForm.get('occurencedate').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('occurencedate').value)+'  UTC' :null);
obj.actiontakenon=new Date(this.qycomplaintmasterForm.get('actiontakenon').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('actiontakenon').value)+'  UTC' :null);
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

private qycomplaintmastertoggleOption(){
this.qycomplaintmastershowOption = this.qycomplaintmastershowOption === true ? false : true;
}

private qyrelatedcomplainttoggleOption(){
this.qyrelatedcomplaintshowOption = this.qyrelatedcomplaintshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.qycomplaintmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.qycomplaintmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.qycomplaintmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.qycomplaintmasterservice.formData=this.qycomplaintmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.qycomplaintmasterForm.controls[key] != null)
    {
        this.qycomplaintmasterservice.formData[key] = this.qycomplaintmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.qycomplaintmasterservice.formData.complaintdate=new Date(this.qycomplaintmasterForm.get('complaintdate').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('complaintdate').value)+'  UTC' :null);
this.qycomplaintmasterservice.formData.occurencedate=new Date(this.qycomplaintmasterForm.get('occurencedate').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('occurencedate').value)+'  UTC' :null);
this.qycomplaintmasterservice.formData.actiontakenon=new Date(this.qycomplaintmasterForm.get('actiontakenon').value ? this.ngbDateParserFormatter.format(this.qycomplaintmasterForm.get('actiontakenon').value)+'  UTC' :null);
if(customfields!=null)this.qycomplaintmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.qycomplaintmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.qycomplaintmasterservice.formData.DeletedqyrelatedcomplaintIDs = this.DeletedqyrelatedcomplaintIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.qycomplaintmasterservice.formData);
this.qycomplaintmasterservice.formData=this.qycomplaintmasterForm.value;
this.qycomplaintmasterservice.saveOrUpdateqycomplaintmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.qyrelatedcomplaintssource.data)
{
    for (let i = 0; i < this.qyrelatedcomplaintssource.data.length; i++)
    {
        if (this.qyrelatedcomplaintssource.data[i].fileattachmentlist)await this.sharedService.upload(this.qyrelatedcomplaintssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).qycomplaintmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.qycomplaintmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).qycomplaintmaster);
}
else
{
this.FillData(res);
}
}
this.qycomplaintmasterForm.markAsUntouched();
this.qycomplaintmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditqyrelatedcomplaint(event:any,relatedid:any, complaintid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(qyrelatedcomplaintComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,relatedid, complaintid,visiblelist:this.qyrelatedcomplaintsvisiblelist,  hidelist:this.qyrelatedcomplaintshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.qyrelatedcomplaintssource.add(res);
this.qyrelatedcomplaintssource.refresh();
}
else
{
this.qyrelatedcomplaintssource.update(event.data, res);
}
}
});
}

onDeleteqyrelatedcomplaint(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedqyrelatedcomplaintIDs += childID + ",";
this.qycomplaintmasterservice.qyrelatedcomplaints.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes qyrelatedcomplaints
qyrelatedcomplaintssettings:any;
qyrelatedcomplaintssource: any;

showqyrelatedcomplaintsCheckbox()
{
debugger;
if(this.tblqyrelatedcomplaintssource.settings['selectMode']== 'multi')this.tblqyrelatedcomplaintssource.settings['selectMode']= 'single';
else
this.tblqyrelatedcomplaintssource.settings['selectMode']= 'multi';
this.tblqyrelatedcomplaintssource.initGrid();
}
deleteqyrelatedcomplaintsAll()
{
this.tblqyrelatedcomplaintssource.settings['selectMode'] = 'single';
}
showqyrelatedcomplaintsFilter()
{
  setTimeout(() => {
  this.SetqyrelatedcomplaintsTableddConfig();
  });
      if(this.tblqyrelatedcomplaintssource.settings!=null)this.tblqyrelatedcomplaintssource.settings['hideSubHeader'] =!this.tblqyrelatedcomplaintssource.settings['hideSubHeader'];
this.tblqyrelatedcomplaintssource.initGrid();
}
showqyrelatedcomplaintsInActive()
{
}
enableqyrelatedcomplaintsInActive()
{
}
async SetqyrelatedcomplaintsTableddConfig()
{
if(!this.bfilterPopulateqyrelatedcomplaints){
}
this.bfilterPopulateqyrelatedcomplaints=true;
}
async qyrelatedcomplaintsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetqyrelatedcomplaintsTableConfig()
{
this.qyrelatedcomplaintssettings = {
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
relatedcomplaintid: {
title: 'Related Complaint',
type: 'number',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
qyrelatedcomplaintsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.qyrelatedcomplaintsID)>=0)
{
this.qyrelatedcomplaintssource=new LocalDataSource();
this.qyrelatedcomplaintssource.load(this.qycomplaintmasterservice.qyrelatedcomplaints as  any as LocalDataSource);
this.qyrelatedcomplaintssource.setPaging(1, 20, true);
}
}

//external to inline
/*
qyrelatedcomplaintsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.qycomplaintmasterservice.qyrelatedcomplaints.length == 0)
{
    this.tblqyrelatedcomplaintssource.grid.createFormShown = true;
}
else
{
    let obj = new qyrelatedcomplaint();
    this.qycomplaintmasterservice.qyrelatedcomplaints.push(obj);
    this.qyrelatedcomplaintssource.refresh();
    if ((this.qycomplaintmasterservice.qyrelatedcomplaints.length / this.qyrelatedcomplaintssource.getPaging().perPage).toFixed(0) + 1 != this.qyrelatedcomplaintssource.getPaging().page)
    {
        this.qyrelatedcomplaintssource.setPage((this.qycomplaintmasterservice.qyrelatedcomplaints.length / this.qyrelatedcomplaintssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblqyrelatedcomplaintssource.grid.edit(this.tblqyrelatedcomplaintssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.qyrelatedcomplaintssource.data.indexOf(event.data);
this.onDeleteqyrelatedcomplaint(event,event.data.relatedid,((this.qyrelatedcomplaintssource.getPaging().page-1) *this.qyrelatedcomplaintssource.getPaging().perPage)+index);
this.qyrelatedcomplaintssource.refresh();
break;
}
}

*/
qyrelatedcomplaintsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditqyrelatedcomplaint(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditqyrelatedcomplaint(event,event.data.relatedid,this.formid);
break;
case 'delete':
this.onDeleteqyrelatedcomplaint(event,event.data.relatedid,((this.qyrelatedcomplaintssource.getPaging().page-1) *this.qyrelatedcomplaintssource.getPaging().perPage)+event.index);
this.qyrelatedcomplaintssource.refresh();
break;
}
}
qyrelatedcomplaintsonDelete(obj) {
let relatedid=obj.data.relatedid;
if (confirm('Are you sure to delete this record ?')) {
this.qycomplaintmasterservice.deleteqycomplaintmaster(relatedid).then(res=>
this.qyrelatedcomplaintsLoadTable()
);
}
}
qyrelatedcomplaintsPaging(val)
{
debugger;
this.qyrelatedcomplaintssource.setPaging(1, val, true);
}

handleqyrelatedcomplaintsGridSelected(event:any) {
this.qyrelatedcomplaintsselectedindex=this.qycomplaintmasterservice.qyrelatedcomplaints.findIndex(i => i.relatedid === event.data.relatedid);
}
IsqyrelatedcomplaintsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.qyrelatedcomplaintsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes qyrelatedcomplaints

}



