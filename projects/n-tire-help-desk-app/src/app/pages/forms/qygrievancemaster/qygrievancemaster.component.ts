import { qygrievancemasterService } from './../../../service/qygrievancemaster.service';
import { qygrievancemaster } from './../../../model/qygrievancemaster.model';
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
import { qyrelatedgrievance } from './../../../model/qyrelatedgrievance.model';
import { qyrelatedgrievanceComponent } from './../../../pages/forms/qyrelatedgrievance/qyrelatedgrievance.component';
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
selector: 'app-qygrievancemaster',
templateUrl: './qygrievancemaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class qygrievancemasterComponent implements OnInit {
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
bfilterPopulateqygrievancemasters:boolean=false;
dataqygrievancemastersgrievancesource3:any=[];
dataqygrievancemastersgender3:any=[];
dataqygrievancemastersrelationship3:any=[];
dataqygrievancemastersgrievancecategory3:any=[];
dataqygrievancemastersseverity3:any=[];
dataqygrievancemastersgrievancetype3:any=[];
dataqygrievancemastersactionstatus3:any=[];
dataqyrelatedgrievancesgrievanceid3:any=[];
dataqyrelatedgrievancesrelatedgrievanceid3:any=[];
bfilterPopulateqyrelatedgrievances:boolean=false;
@ViewChild('tblqyrelatedgrievancessource',{static:false}) tblqyrelatedgrievancessource: Ng2SmartTableComponent;
 qygrievancemasterForm: FormGroup;
grievancesourceList: boconfigvalue[];
genderList: boconfigvalue[];
relationshipList: boconfigvalue[];
grievancecategoryList: boconfigvalue[];
severityList: boconfigvalue[];
grievancetypeList: boconfigvalue[];
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
qygrievancemastershowOption:boolean;
qyrelatedgrievanceshowOption:boolean;
sessiondata:any;
sourcekey:any;



qyrelatedgrievancesvisiblelist:any;
qyrelatedgrievanceshidelist:any;

DeletedqyrelatedgrievanceIDs: string="";
qyrelatedgrievancesID: string = "1";
qyrelatedgrievancesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private qygrievancemasterservice: qygrievancemasterService,
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
this.qygrievancemasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
grievanceid: [null],
branchid: [null],
reference: [null],
grievancedate: [null],
occurencedate: [null],
title: [null],
grievancesource: [null],
grievancesourcedesc: [null],
grievanceby: [null],
complainantname: [null],
gender: [null],
genderdesc: [null],
relationship: [null],
relationshipdesc: [null],
mobileno: [null],
phoneno: [null],
emailid: [null],
complainantaddress: [null],
grievanceagainst: [null],
defendantaddress: [null],
onbehalf: [null],
grievancecategory: [null],
grievancecategorydesc: [null],
severity: [null],
severitydesc: [null],
grievancetype: [null],
grievancetypedesc: [null],
grievancedetails: [null],
methodofcontact: [null],
contactperson: [null],
comments: [null],
allcomments: [null],
actiontype: [null],
actiontakenby: [null],
actiontakenon: [null],
actionstatus: [null],
actionstatusdesc: [null],
actionremarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.qygrievancemasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.qygrievancemasterForm.dirty && this.qygrievancemasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.grievanceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.grievanceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.grievanceid && pkDetail) {
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
let qygrievancemasterid = null;

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
this.formid=qygrievancemasterid;
//this.sharedService.alert(qygrievancemasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetqyrelatedgrievancesTableConfig();
  setTimeout(() => {
  this.SetqyrelatedgrievancesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("grievancesource").then(res => this.grievancesourceList = res as boconfigvalue[]);
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.configservice.getList("relationship").then(res => this.relationshipList = res as boconfigvalue[]);
this.configservice.getList("grievancecategory").then(res => this.grievancecategoryList = res as boconfigvalue[]);
this.configservice.getList("severity").then(res => this.severityList = res as boconfigvalue[]);
this.configservice.getList("grievancetype").then(res => this.grievancetypeList = res as boconfigvalue[]);
this.configservice.getList("queryactionstatus").then(res => this.actionstatusList = res as boconfigvalue[]);

//autocomplete
    this.qygrievancemasterservice.getqygrievancemastersList().then(res => {
      this.pkList = res as qygrievancemaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.complainantname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.complainantname;

//setting the flag that the screen is not touched 
this.qygrievancemasterForm.markAsUntouched();
this.qygrievancemasterForm.markAsPristine();
}



resetForm() {
if (this.qygrievancemasterForm != null)
this.qygrievancemasterForm.reset();
this.qygrievancemasterForm.patchValue({
});
setTimeout(() => {
this.qygrievancemasterservice.qyrelatedgrievances=[];
this.qyrelatedgrievancesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let grievanceid = this.qygrievancemasterForm.get('grievanceid').value;
        if(grievanceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.qygrievancemasterservice.deleteqygrievancemaster(grievanceid).then(res =>
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
    this.qygrievancemasterForm.patchValue({
        grievanceid: null
    });
    if(this.qygrievancemasterservice.formData.grievanceid!=null)this.qygrievancemasterservice.formData.grievanceid=null;
for (let i=0;i<this.qygrievancemasterservice.qyrelatedgrievances.length;i++) {
this.qygrievancemasterservice.qyrelatedgrievances[i].relatedid=null;
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
        else if(key=="grievancedate")
this.qygrievancemasterForm.patchValue({"grievancedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="occurencedate")
this.qygrievancemasterForm.patchValue({"occurencedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actiontakenon")
this.qygrievancemasterForm.patchValue({"actiontakenon":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.qygrievancemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.qygrievancemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.qygrievancemasterForm.controls[key]!=undefined)
{
this.qygrievancemasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("qygrievancemasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.qygrievancemasterservice.formData.complainantname!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.qygrievancemasterservice.formData.complainantname!=null )
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
grievancesourceonChange(evt:any){
let e=this.f.grievancesource.value as any;
this.qygrievancemasterForm.patchValue({grievancesourcedesc:evt.options[evt.options.selectedIndex].text});
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.qygrievancemasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
relationshiponChange(evt:any){
let e=this.f.relationship.value as any;
this.qygrievancemasterForm.patchValue({relationshipdesc:evt.options[evt.options.selectedIndex].text});
}
grievancecategoryonChange(evt:any){
let e=this.f.grievancecategory.value as any;
this.qygrievancemasterForm.patchValue({grievancecategorydesc:evt.options[evt.options.selectedIndex].text});
}
severityonChange(evt:any){
let e=this.f.severity.value as any;
this.qygrievancemasterForm.patchValue({severitydesc:evt.options[evt.options.selectedIndex].text});
}
grievancetypeonChange(evt:any){
let e=this.f.grievancetype.value as any;
this.qygrievancemasterForm.patchValue({grievancetypedesc:evt.options[evt.options.selectedIndex].text});
}
actionstatusonChange(evt:any){
let e=this.f.actionstatus.value as any;
this.qygrievancemasterForm.patchValue({actionstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editqygrievancemasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.qygrievancemasterservice.getqygrievancemastersByEID(pkcol).then(res => {

this.qygrievancemasterservice.formData=res.qygrievancemaster;
let formproperty=res.qygrievancemaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.qygrievancemaster.pkcol;
this.formid=res.qygrievancemaster.grievanceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.qygrievancemasterservice.formData=res.qygrievancemaster;
this.formid=res.qygrievancemaster.grievanceid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.qygrievancemasterForm.patchValue({
grievanceid: res.qygrievancemaster.grievanceid,
branchid: res.qygrievancemaster.branchid,
reference: res.qygrievancemaster.reference,
grievancedate: this.ngbDateParserFormatter.parse(res.qygrievancemaster.grievancedate),
occurencedate: this.ngbDateParserFormatter.parse(res.qygrievancemaster.occurencedate),
title: res.qygrievancemaster.title,
grievancesource: res.qygrievancemaster.grievancesource,
grievancesourcedesc: res.qygrievancemaster.grievancesourcedesc,
grievanceby: res.qygrievancemaster.grievanceby,
complainantname: res.qygrievancemaster.complainantname,
gender: res.qygrievancemaster.gender,
genderdesc: res.qygrievancemaster.genderdesc,
relationship: res.qygrievancemaster.relationship,
relationshipdesc: res.qygrievancemaster.relationshipdesc,
mobileno: res.qygrievancemaster.mobileno,
phoneno: res.qygrievancemaster.phoneno,
emailid: res.qygrievancemaster.emailid,
complainantaddress: res.qygrievancemaster.complainantaddress,
grievanceagainst: res.qygrievancemaster.grievanceagainst,
defendantaddress: res.qygrievancemaster.defendantaddress,
onbehalf: res.qygrievancemaster.onbehalf,
grievancecategory: res.qygrievancemaster.grievancecategory,
grievancecategorydesc: res.qygrievancemaster.grievancecategorydesc,
severity: res.qygrievancemaster.severity,
severitydesc: res.qygrievancemaster.severitydesc,
grievancetype: res.qygrievancemaster.grievancetype,
grievancetypedesc: res.qygrievancemaster.grievancetypedesc,
grievancedetails: res.qygrievancemaster.grievancedetails,
methodofcontact: res.qygrievancemaster.methodofcontact,
contactperson: res.qygrievancemaster.contactperson,
comments: res.qygrievancemaster.comments,
allcomments: res.qygrievancemaster.allcomments,
actiontype: res.qygrievancemaster.actiontype,
actiontakenby: res.qygrievancemaster.actiontakenby,
actiontakenon: this.ngbDateParserFormatter.parse(res.qygrievancemaster.actiontakenon),
actionstatus: res.qygrievancemaster.actionstatus,
actionstatusdesc: res.qygrievancemaster.actionstatusdesc,
actionremarks: res.qygrievancemaster.actionremarks,
customfield: res.qygrievancemaster.customfield,
attachment: JSON.parse(res.qygrievancemaster.attachment),
status: res.qygrievancemaster.status,
statusdesc: res.qygrievancemaster.statusdesc,
});
this.qyrelatedgrievancesvisiblelist=res.qyrelatedgrievancesvisiblelist;
if(this.qygrievancemasterForm.get('customfield').value!=null && this.qygrievancemasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.qygrievancemasterForm.get('customfield').value);
this.FillCustomField();
if(this.qygrievancemasterForm.get('attachment').value!=null && this.qygrievancemasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.qygrievancemasterForm.get('attachment').value);
//Child Tables if any
this.qygrievancemasterservice.qyrelatedgrievances = res.qyrelatedgrievances;
this.SetqyrelatedgrievancesTableConfig();
this.qyrelatedgrievancesLoadTable();
  setTimeout(() => {
  this.SetqyrelatedgrievancesTableddConfig();
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
  for (let key in this.qygrievancemasterForm.controls) {
    if (this.qygrievancemasterForm.controls[key] != null) {
if(false)
{
if(this.qygrievancemasterservice.formData!=null && this.qygrievancemasterservice.formData[key]!=null  && this.qygrievancemasterservice.formData[key]!='[]' && this.qygrievancemasterservice.formData[key]!=undefined && this.qygrievancemasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.qygrievancemasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.qygrievancemasterservice.formData!=null && this.qygrievancemasterservice.formData[key]!=null   && this.qygrievancemasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.qygrievancemasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.qygrievancemasterservice.formData!=null && this.qygrievancemasterservice.formData[key]!=null   && this.qygrievancemasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.qygrievancemasterservice.formData[key]+"'><div class='progress__number'>"+this.qygrievancemasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.qygrievancemasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.qygrievancemasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.qygrievancemasterForm.value;
obj.grievancedate=new Date(this.qygrievancemasterForm.get('grievancedate').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('grievancedate').value)+'  UTC' :null);
obj.occurencedate=new Date(this.qygrievancemasterForm.get('occurencedate').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('occurencedate').value)+'  UTC' :null);
obj.actiontakenon=new Date(this.qygrievancemasterForm.get('actiontakenon').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('actiontakenon').value)+'  UTC' :null);
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

private qygrievancemastertoggleOption(){
this.qygrievancemastershowOption = this.qygrievancemastershowOption === true ? false : true;
}

private qyrelatedgrievancetoggleOption(){
this.qyrelatedgrievanceshowOption = this.qyrelatedgrievanceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.qygrievancemasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.qygrievancemasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.qygrievancemasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.qygrievancemasterservice.formData=this.qygrievancemasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.qygrievancemasterForm.controls[key] != null)
    {
        this.qygrievancemasterservice.formData[key] = this.qygrievancemasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.qygrievancemasterservice.formData.grievancedate=new Date(this.qygrievancemasterForm.get('grievancedate').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('grievancedate').value)+'  UTC' :null);
this.qygrievancemasterservice.formData.occurencedate=new Date(this.qygrievancemasterForm.get('occurencedate').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('occurencedate').value)+'  UTC' :null);
this.qygrievancemasterservice.formData.actiontakenon=new Date(this.qygrievancemasterForm.get('actiontakenon').value ? this.ngbDateParserFormatter.format(this.qygrievancemasterForm.get('actiontakenon').value)+'  UTC' :null);
if(customfields!=null)this.qygrievancemasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.qygrievancemasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.qygrievancemasterservice.formData.DeletedqyrelatedgrievanceIDs = this.DeletedqyrelatedgrievanceIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.qygrievancemasterservice.formData);
this.qygrievancemasterservice.formData=this.qygrievancemasterForm.value;
this.qygrievancemasterservice.saveOrUpdateqygrievancemasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.qyrelatedgrievancessource.data)
{
    for (let i = 0; i < this.qyrelatedgrievancessource.data.length; i++)
    {
        if (this.qyrelatedgrievancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.qyrelatedgrievancessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).qygrievancemaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.qygrievancemasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).qygrievancemaster);
}
else
{
this.FillData(res);
}
}
this.qygrievancemasterForm.markAsUntouched();
this.qygrievancemasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditqyrelatedgrievance(event:any,relatedid:any, grievanceid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(qyrelatedgrievanceComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,relatedid, grievanceid,visiblelist:this.qyrelatedgrievancesvisiblelist,  hidelist:this.qyrelatedgrievanceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.qyrelatedgrievancessource.add(res);
this.qyrelatedgrievancessource.refresh();
}
else
{
this.qyrelatedgrievancessource.update(event.data, res);
}
}
});
}

onDeleteqyrelatedgrievance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedqyrelatedgrievanceIDs += childID + ",";
this.qygrievancemasterservice.qyrelatedgrievances.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes qyrelatedgrievances
qyrelatedgrievancessettings:any;
qyrelatedgrievancessource: any;

showqyrelatedgrievancesCheckbox()
{
debugger;
if(this.tblqyrelatedgrievancessource.settings['selectMode']== 'multi')this.tblqyrelatedgrievancessource.settings['selectMode']= 'single';
else
this.tblqyrelatedgrievancessource.settings['selectMode']= 'multi';
this.tblqyrelatedgrievancessource.initGrid();
}
deleteqyrelatedgrievancesAll()
{
this.tblqyrelatedgrievancessource.settings['selectMode'] = 'single';
}
showqyrelatedgrievancesFilter()
{
  setTimeout(() => {
  this.SetqyrelatedgrievancesTableddConfig();
  });
      if(this.tblqyrelatedgrievancessource.settings!=null)this.tblqyrelatedgrievancessource.settings['hideSubHeader'] =!this.tblqyrelatedgrievancessource.settings['hideSubHeader'];
this.tblqyrelatedgrievancessource.initGrid();
}
showqyrelatedgrievancesInActive()
{
}
enableqyrelatedgrievancesInActive()
{
}
async SetqyrelatedgrievancesTableddConfig()
{
if(!this.bfilterPopulateqyrelatedgrievances){
}
this.bfilterPopulateqyrelatedgrievances=true;
}
async qyrelatedgrievancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetqyrelatedgrievancesTableConfig()
{
this.qyrelatedgrievancessettings = {
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
relatedgrievanceid: {
title: 'Related Grievance',
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
qyrelatedgrievancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.qyrelatedgrievancesID)>=0)
{
this.qyrelatedgrievancessource=new LocalDataSource();
this.qyrelatedgrievancessource.load(this.qygrievancemasterservice.qyrelatedgrievances as  any as LocalDataSource);
this.qyrelatedgrievancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
qyrelatedgrievancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.qygrievancemasterservice.qyrelatedgrievances.length == 0)
{
    this.tblqyrelatedgrievancessource.grid.createFormShown = true;
}
else
{
    let obj = new qyrelatedgrievance();
    this.qygrievancemasterservice.qyrelatedgrievances.push(obj);
    this.qyrelatedgrievancessource.refresh();
    if ((this.qygrievancemasterservice.qyrelatedgrievances.length / this.qyrelatedgrievancessource.getPaging().perPage).toFixed(0) + 1 != this.qyrelatedgrievancessource.getPaging().page)
    {
        this.qyrelatedgrievancessource.setPage((this.qygrievancemasterservice.qyrelatedgrievances.length / this.qyrelatedgrievancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblqyrelatedgrievancessource.grid.edit(this.tblqyrelatedgrievancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.qyrelatedgrievancessource.data.indexOf(event.data);
this.onDeleteqyrelatedgrievance(event,event.data.relatedid,((this.qyrelatedgrievancessource.getPaging().page-1) *this.qyrelatedgrievancessource.getPaging().perPage)+index);
this.qyrelatedgrievancessource.refresh();
break;
}
}

*/
qyrelatedgrievancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditqyrelatedgrievance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditqyrelatedgrievance(event,event.data.relatedid,this.formid);
break;
case 'delete':
this.onDeleteqyrelatedgrievance(event,event.data.relatedid,((this.qyrelatedgrievancessource.getPaging().page-1) *this.qyrelatedgrievancessource.getPaging().perPage)+event.index);
this.qyrelatedgrievancessource.refresh();
break;
}
}
qyrelatedgrievancesonDelete(obj) {
let relatedid=obj.data.relatedid;
if (confirm('Are you sure to delete this record ?')) {
this.qygrievancemasterservice.deleteqygrievancemaster(relatedid).then(res=>
this.qyrelatedgrievancesLoadTable()
);
}
}
qyrelatedgrievancesPaging(val)
{
debugger;
this.qyrelatedgrievancessource.setPaging(1, val, true);
}

handleqyrelatedgrievancesGridSelected(event:any) {
this.qyrelatedgrievancesselectedindex=this.qygrievancemasterservice.qyrelatedgrievances.findIndex(i => i.relatedid === event.data.relatedid);
}
IsqyrelatedgrievancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.qyrelatedgrievancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes qyrelatedgrievances

}



