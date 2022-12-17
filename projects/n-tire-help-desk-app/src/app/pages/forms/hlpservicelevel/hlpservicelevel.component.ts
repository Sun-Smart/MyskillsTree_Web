import { hlpservicelevelService } from './../../../service/hlpservicelevel.service';
import { hlpservicelevel } from './../../../model/hlpservicelevel.model';
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
import { boservice} from '../../../../../../n-tire-bo-app/src/app/model/boservice.model';
import { boserviceComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boservice/boservice.component';
import { boserviceService } from '../../../../../../n-tire-bo-app/src/app/service/boservice.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bokbmaster} from '../../../../../../n-tire-bo-app/src/app/model/bokbmaster.model';
import { bokbmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
import { bokbmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bokbmaster.service';
//popups
//detail table services
import { hlpslapriority } from './../../../model/hlpslapriority.model';
import { hlpslapriorityComponent } from './../../../pages/forms/hlpslapriority/hlpslapriority.component';
//FK services
import { hlpslasupporthour } from './../../../model/hlpslasupporthour.model';
import { hlpslasupporthourComponent } from './../../../pages/forms/hlpslasupporthour/hlpslasupporthour.component';
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
selector: 'app-hlpservicelevel',
templateUrl: './hlpservicelevel.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hlpservicelevelComponent implements OnInit {
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
bfilterPopulatehlpservicelevels:boolean=false;
datahlpservicelevelstype3:any=[];
datahlpservicelevelscategory3:any=[];
datahlpservicelevelsserviceid3:any=[];
datahlpservicelevelsholidaylistid3:any=[];
datahlpservicelevelsknowledgebaseid3:any=[];
datahlpslaprioritiespriorityid3:any=[];
bfilterPopulatehlpslapriorities:boolean=false;
datahlpslasupporthoursweekday3:any=[];
bfilterPopulatehlpslasupporthours:boolean=false;
@ViewChild('tblhlpslaprioritiessource',{static:false}) tblhlpslaprioritiessource: Ng2SmartTableComponent;
@ViewChild('tblhlpslasupporthourssource',{static:false}) tblhlpslasupporthourssource: Ng2SmartTableComponent;
 hlpservicelevelForm: FormGroup;
typeList: boconfigvalue[];
categoryList: boconfigvalue[];
serviceidList: boservice[];
holidaylistidList: bomasterdata[];
knowledgebaseidList: bokbmaster[];
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
hlpservicelevelshowOption:boolean;
hlpslapriorityshowOption:boolean;
hlpslasupporthourshowOption:boolean;
sessiondata:any;
sourcekey:any;



hlpslaprioritiesvisiblelist:any;
hlpslaprioritieshidelist:any;
hlpslasupporthoursvisiblelist:any;
hlpslasupporthourshidelist:any;

DeletedhlpslapriorityIDs: string="";
hlpslaprioritiesID: string = "1";
hlpslaprioritiesselectedindex:any;
DeletedhlpslasupporthourIDs: string="";
hlpslasupporthoursID: string = "2";
hlpslasupporthoursselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hlpservicelevelservice: hlpservicelevelService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private boserviceservice:boserviceService,
private bomasterdataservice:bomasterdataService,
private bokbmasterservice:bokbmasterService,
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
this.hlpservicelevelForm  = this.fb.group({
pk:[null],
ImageName: [null],
servicelevelid: [null],
servicelevelcode: [null, Validators.required],
details: [null],
type: [null],
typedesc: [null],
category: [null],
categorydesc: [null],
serviceid: [null],
serviceiddesc: [null],
purpose: [null],
scope: [null],
responsibilities: [null],
criticality: [null],
objectives: [null],
communications: [null],
measurements: [null],
escalationrule: [null],
isdefault: [null],
holidaylistid: [null],
holidaylistiddesc: [null],
startdate: [null],
enddate: [null],
supportcontacts: [null],
maxissues: [null],
knowledgebaseid: [null],
knowledgebaseiddesc: [null],
notes: [null],
status: [null],
statusdesc: [null],
customfield: [null],
attachment: [null],
});
}

get f() { return this.hlpservicelevelForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hlpservicelevelForm.dirty && this.hlpservicelevelForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
servicelevelcodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.servicelevelcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].servicelevelid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Service Level Code value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.servicelevelid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.servicelevelid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.servicelevelid && pkDetail) {
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
let hlpservicelevelid = null;

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
this.formid=hlpservicelevelid;
//this.sharedService.alert(hlpservicelevelid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethlpslaprioritiesTableConfig();
  setTimeout(() => {
  this.SethlpslaprioritiesTableddConfig();
  });

this.SethlpslasupporthoursTableConfig();
  setTimeout(() => {
  this.SethlpslasupporthoursTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("servicetype").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("servicecategory").then(res => this.categoryList = res as boconfigvalue[]);
this.boserviceservice.getboservicesList().then(res => 
{
this.serviceidList = res as boservice[];
}
).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("HOL").then(res => {
this.holidaylistidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bokbmasterservice.getbokbmastersList().then(res => 
{
this.knowledgebaseidList = res as bokbmaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.hlpservicelevelservice.gethlpservicelevelsList().then(res => {
      this.pkList = res as hlpservicelevel[];
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
this.hlpservicelevelForm.markAsUntouched();
this.hlpservicelevelForm.markAsPristine();
}



resetForm() {
if (this.hlpservicelevelForm != null)
this.hlpservicelevelForm.reset();
this.hlpservicelevelForm.patchValue({
});
setTimeout(() => {
this.hlpservicelevelservice.hlpslapriorities=[];
this.hlpslaprioritiesLoadTable();
this.hlpservicelevelservice.hlpslasupporthours=[];
this.hlpslasupporthoursLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let servicelevelid = this.hlpservicelevelForm.get('servicelevelid').value;
        if(servicelevelid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpservicelevelservice.deletehlpservicelevel(servicelevelid).then(res =>
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
    this.hlpservicelevelForm.patchValue({
        servicelevelid: null
    });
    if(this.hlpservicelevelservice.formData.servicelevelid!=null)this.hlpservicelevelservice.formData.servicelevelid=null;
for (let i=0;i<this.hlpservicelevelservice.hlpslapriorities.length;i++) {
this.hlpservicelevelservice.hlpslapriorities[i].servicelevelpriorityid=null;
}
for (let i=0;i<this.hlpservicelevelservice.hlpslasupporthours.length;i++) {
this.hlpservicelevelservice.hlpslasupporthours[i].supportid=null;
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
        else if(key=="startdate")
this.hlpservicelevelForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.hlpservicelevelForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.hlpservicelevelForm.patchValue({"notes":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.hlpservicelevelForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hlpservicelevelForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hlpservicelevelForm.controls[key]!=undefined)
{
this.hlpservicelevelForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hlpservicelevels",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
servicelevelidonChange(evt:any){
let e=evt.value;
}
servicelevelcodeonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.hlpservicelevelForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.hlpservicelevelForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
serviceidonChange(evt:any){
let e=evt.value;
this.hlpservicelevelForm.patchValue({serviceiddesc:evt.options[evt.options.selectedIndex].text});
}
purposeonChange(evt:any){
let e=evt.value;
}
scopeonChange(evt:any){
let e=evt.value;
}
responsibilitiesonChange(evt:any){
let e=evt.value;
}
criticalityonChange(evt:any){
let e=evt.value;
}
objectivesonChange(evt:any){
let e=evt.value;
}
communicationsonChange(evt:any){
let e=evt.value;
}
measurementsonChange(evt:any){
let e=evt.value;
}
escalationruleonChange(evt:any){
let e=evt.value;
}
isdefaultonChange(evt:any){
let e=evt.value;
}
holidaylistidonChange(evt:any){
let e=evt.value;
this.hlpservicelevelForm.patchValue({holidaylistiddesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
supportcontactsonChange(evt:any){
let e=evt.value;
}
maxissuesonChange(evt:any){
let e=evt.value;
}
knowledgebaseidonChange(evt:any){
let e=evt.value;
this.hlpservicelevelForm.patchValue({knowledgebaseiddesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
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
  


edithlpservicelevels() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hlpservicelevelservice.gethlpservicelevelsByEID(pkcol).then(res => {

this.hlpservicelevelservice.formData=res.hlpservicelevel;
let formproperty=res.hlpservicelevel.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hlpservicelevel.pkcol;
this.formid=res.hlpservicelevel.servicelevelid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.hlpservicelevelservice.formData=res.hlpservicelevel;
this.formid=res.hlpservicelevel.servicelevelid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hlpservicelevelForm.patchValue({
servicelevelid: res.hlpservicelevel.servicelevelid,
servicelevelcode: res.hlpservicelevel.servicelevelcode,
details: res.hlpservicelevel.details,
type: res.hlpservicelevel.type,
typedesc: res.hlpservicelevel.typedesc,
category: res.hlpservicelevel.category,
categorydesc: res.hlpservicelevel.categorydesc,
serviceid: res.hlpservicelevel.serviceid,
serviceiddesc: res.hlpservicelevel.serviceiddesc,
purpose: res.hlpservicelevel.purpose,
scope: res.hlpservicelevel.scope,
responsibilities: res.hlpservicelevel.responsibilities,
criticality: res.hlpservicelevel.criticality,
objectives: res.hlpservicelevel.objectives,
communications: res.hlpservicelevel.communications,
measurements: res.hlpservicelevel.measurements,
escalationrule: res.hlpservicelevel.escalationrule,
isdefault: res.hlpservicelevel.isdefault,
holidaylistid: res.hlpservicelevel.holidaylistid,
holidaylistiddesc: res.hlpservicelevel.holidaylistiddesc,
startdate: this.ngbDateParserFormatter.parse(res.hlpservicelevel.startdate),
enddate: this.ngbDateParserFormatter.parse(res.hlpservicelevel.enddate),
supportcontacts: res.hlpservicelevel.supportcontacts,
maxissues: res.hlpservicelevel.maxissues,
knowledgebaseid: res.hlpservicelevel.knowledgebaseid,
knowledgebaseiddesc: res.hlpservicelevel.knowledgebaseiddesc,
notes: JSON.parse(res.hlpservicelevel.notes),
status: res.hlpservicelevel.status,
statusdesc: res.hlpservicelevel.statusdesc,
customfield: res.hlpservicelevel.customfield,
attachment: JSON.parse(res.hlpservicelevel.attachment),
});
this.hlpslaprioritiesvisiblelist=res.hlpslaprioritiesvisiblelist;
this.hlpslasupporthoursvisiblelist=res.hlpslasupporthoursvisiblelist;
if(this.hlpservicelevelForm.get('customfield').value!=null && this.hlpservicelevelForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hlpservicelevelForm.get('customfield').value);
this.FillCustomField();
if(this.hlpservicelevelForm.get('attachment').value!=null && this.hlpservicelevelForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hlpservicelevelForm.get('attachment').value);
//Child Tables if any
this.hlpservicelevelservice.hlpslapriorities = res.hlpslapriorities;
this.SethlpslaprioritiesTableConfig();
this.hlpslaprioritiesLoadTable();
  setTimeout(() => {
  this.SethlpslaprioritiesTableddConfig();
  });
this.hlpservicelevelservice.hlpslasupporthours = res.hlpslasupporthours;
this.SethlpslasupporthoursTableConfig();
this.hlpslasupporthoursLoadTable();
  setTimeout(() => {
  this.SethlpslasupporthoursTableddConfig();
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
  for (let key in this.hlpservicelevelForm.controls) {
    if (this.hlpservicelevelForm.controls[key] != null) {
if(false)
{
if(this.hlpservicelevelservice.formData!=null && this.hlpservicelevelservice.formData[key]!=null  && this.hlpservicelevelservice.formData[key]!='[]' && this.hlpservicelevelservice.formData[key]!=undefined && this.hlpservicelevelservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hlpservicelevelservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hlpservicelevelservice.formData!=null && this.hlpservicelevelservice.formData[key]!=null   && this.hlpservicelevelservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hlpservicelevelservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hlpservicelevelservice.formData!=null && this.hlpservicelevelservice.formData[key]!=null   && this.hlpservicelevelservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hlpservicelevelservice.formData[key]+"'><div class='progress__number'>"+this.hlpservicelevelservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpservicelevelForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hlpservicelevelForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hlpservicelevelForm.value;
obj.startdate=new Date(this.hlpservicelevelForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevelForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.hlpservicelevelForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevelForm.get('enddate').value)+'  UTC' :null);
if(this.hlpservicelevelForm.get('notes').value!=null)obj.notes=JSON.stringify(this.hlpservicelevelForm.get('notes').value);
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

private hlpserviceleveltoggleOption(){
this.hlpservicelevelshowOption = this.hlpservicelevelshowOption === true ? false : true;
}

private hlpslaprioritytoggleOption(){
this.hlpslapriorityshowOption = this.hlpslapriorityshowOption === true ? false : true;
}

private hlpslasupporthourtoggleOption(){
this.hlpslasupporthourshowOption = this.hlpslasupporthourshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hlpservicelevelForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hlpservicelevelForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hlpservicelevelForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hlpservicelevelservice.formData=this.hlpservicelevelForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hlpservicelevelForm.controls[key] != null)
    {
        this.hlpservicelevelservice.formData[key] = this.hlpservicelevelForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hlpservicelevelservice.formData.startdate=new Date(this.hlpservicelevelForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevelForm.get('startdate').value)+'  UTC' :null);
this.hlpservicelevelservice.formData.enddate=new Date(this.hlpservicelevelForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.hlpservicelevelForm.get('enddate').value)+'  UTC' :null);
if(this.hlpservicelevelForm.get('notes').value!=null)this.hlpservicelevelservice.formData.notes=JSON.stringify(this.hlpservicelevelForm.get('notes').value);
if(customfields!=null)this.hlpservicelevelservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.hlpservicelevelservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hlpservicelevelservice.formData.DeletedhlpslapriorityIDs = this.DeletedhlpslapriorityIDs;
this.hlpservicelevelservice.formData.DeletedhlpslasupporthourIDs = this.DeletedhlpslasupporthourIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hlpservicelevelservice.formData);
this.hlpservicelevelservice.formData=this.hlpservicelevelForm.value;
this.hlpservicelevelservice.saveOrUpdatehlpservicelevels().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hlpslaprioritiessource.data)
{
    for (let i = 0; i < this.hlpslaprioritiessource.data.length; i++)
    {
        if (this.hlpslaprioritiessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpslaprioritiessource.data[i].fileattachmentlist);
    }
}
if (this.hlpslasupporthourssource.data)
{
    for (let i = 0; i < this.hlpslasupporthourssource.data.length; i++)
    {
        if (this.hlpslasupporthourssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpslasupporthourssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpservicelevel);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hlpservicelevelservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpservicelevel);
}
else
{
this.FillData(res);
}
}
this.hlpservicelevelForm.markAsUntouched();
this.hlpservicelevelForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditserviceid( serviceid) {
/*let ScreenType='2';
this.dialog.open(boserviceComponent, 
{
data: {serviceid:this.hlpservicelevelForm.get('serviceid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditholidaylistid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hlpservicelevelForm.get('holidaylistid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditknowledgebaseid( kbid) {
/*let ScreenType='2';
this.dialog.open(bokbmasterComponent, 
{
data: {kbid:this.hlpservicelevelForm.get('knowledgebaseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithlpslapriority(event:any,servicelevelpriorityid:any, servicelevelid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hlpslapriorityComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,servicelevelpriorityid, servicelevelid,visiblelist:this.hlpslaprioritiesvisiblelist,  hidelist:this.hlpslaprioritieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hlpslaprioritiessource.add(res);
this.hlpslaprioritiessource.refresh();
}
else
{
this.hlpslaprioritiessource.update(event.data, res);
}
}
});
}

onDeletehlpslapriority(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpslapriorityIDs += childID + ",";
this.hlpservicelevelservice.hlpslapriorities.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithlpslasupporthour(event:any,supportid:any, servicelevelid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hlpslasupporthourComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,supportid, servicelevelid,visiblelist:this.hlpslasupporthoursvisiblelist,  hidelist:this.hlpslasupporthourshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hlpslasupporthourssource.add(res);
this.hlpslasupporthourssource.refresh();
}
else
{
this.hlpslasupporthourssource.update(event.data, res);
}
}
});
}

onDeletehlpslasupporthour(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpslasupporthourIDs += childID + ",";
this.hlpservicelevelservice.hlpslasupporthours.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hlpslapriorities
hlpslaprioritiessettings:any;
hlpslaprioritiessource: any;

showhlpslaprioritiesCheckbox()
{
debugger;
if(this.tblhlpslaprioritiessource.settings['selectMode']== 'multi')this.tblhlpslaprioritiessource.settings['selectMode']= 'single';
else
this.tblhlpslaprioritiessource.settings['selectMode']= 'multi';
this.tblhlpslaprioritiessource.initGrid();
}
deletehlpslaprioritiesAll()
{
this.tblhlpslaprioritiessource.settings['selectMode'] = 'single';
}
showhlpslaprioritiesFilter()
{
  setTimeout(() => {
  this.SethlpslaprioritiesTableddConfig();
  });
      if(this.tblhlpslaprioritiessource.settings!=null)this.tblhlpslaprioritiessource.settings['hideSubHeader'] =!this.tblhlpslaprioritiessource.settings['hideSubHeader'];
this.tblhlpslaprioritiessource.initGrid();
}
showhlpslaprioritiesInActive()
{
}
enablehlpslaprioritiesInActive()
{
}
async SethlpslaprioritiesTableddConfig()
{
if(!this.bfilterPopulatehlpslapriorities){
}
this.bfilterPopulatehlpslapriorities=true;
}
async hlpslaprioritiesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethlpslaprioritiesTableConfig()
{
this.hlpslaprioritiessettings = {
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
priorityid: {
title: 'Priority',
type: '',
filter:true,
},
responseduration: {
title: 'Response Duration',
type: '',
filter:true,
},
resolutionduration: {
title: 'Resolution Duration',
type: '',
filter:true,
},
},
};
}
hlpslaprioritiesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpslaprioritiesID)>=0)
{
this.hlpslaprioritiessource=new LocalDataSource();
this.hlpslaprioritiessource.load(this.hlpservicelevelservice.hlpslapriorities as  any as LocalDataSource);
this.hlpslaprioritiessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hlpslaprioritiesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hlpservicelevelservice.hlpslapriorities.length == 0)
{
    this.tblhlpslaprioritiessource.grid.createFormShown = true;
}
else
{
    let obj = new hlpslapriority();
    this.hlpservicelevelservice.hlpslapriorities.push(obj);
    this.hlpslaprioritiessource.refresh();
    if ((this.hlpservicelevelservice.hlpslapriorities.length / this.hlpslaprioritiessource.getPaging().perPage).toFixed(0) + 1 != this.hlpslaprioritiessource.getPaging().page)
    {
        this.hlpslaprioritiessource.setPage((this.hlpservicelevelservice.hlpslapriorities.length / this.hlpslaprioritiessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpslaprioritiessource.grid.edit(this.tblhlpslaprioritiessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpslaprioritiessource.data.indexOf(event.data);
this.onDeletehlpslapriority(event,event.data.servicelevelpriorityid,((this.hlpslaprioritiessource.getPaging().page-1) *this.hlpslaprioritiessource.getPaging().perPage)+index);
this.hlpslaprioritiessource.refresh();
break;
}
}

*/
hlpslaprioritiesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithlpslapriority(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithlpslapriority(event,event.data.servicelevelpriorityid,this.formid);
break;
case 'delete':
this.onDeletehlpslapriority(event,event.data.servicelevelpriorityid,((this.hlpslaprioritiessource.getPaging().page-1) *this.hlpslaprioritiessource.getPaging().perPage)+event.index);
this.hlpslaprioritiessource.refresh();
break;
}
}
hlpslaprioritiesonDelete(obj) {
let servicelevelpriorityid=obj.data.servicelevelpriorityid;
if (confirm('Are you sure to delete this record ?')) {
this.hlpservicelevelservice.deletehlpservicelevel(servicelevelpriorityid).then(res=>
this.hlpslaprioritiesLoadTable()
);
}
}
hlpslaprioritiesPaging(val)
{
debugger;
this.hlpslaprioritiessource.setPaging(1, val, true);
}

handlehlpslaprioritiesGridSelected(event:any) {
this.hlpslaprioritiesselectedindex=this.hlpservicelevelservice.hlpslapriorities.findIndex(i => i.servicelevelpriorityid === event.data.servicelevelpriorityid);
}
IshlpslaprioritiesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpslaprioritiesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpslapriorities
//start of Grid Codes hlpslasupporthours
hlpslasupporthourssettings:any;
hlpslasupporthourssource: any;

showhlpslasupporthoursCheckbox()
{
debugger;
if(this.tblhlpslasupporthourssource.settings['selectMode']== 'multi')this.tblhlpslasupporthourssource.settings['selectMode']= 'single';
else
this.tblhlpslasupporthourssource.settings['selectMode']= 'multi';
this.tblhlpslasupporthourssource.initGrid();
}
deletehlpslasupporthoursAll()
{
this.tblhlpslasupporthourssource.settings['selectMode'] = 'single';
}
showhlpslasupporthoursFilter()
{
  setTimeout(() => {
  this.SethlpslasupporthoursTableddConfig();
  });
      if(this.tblhlpslasupporthourssource.settings!=null)this.tblhlpslasupporthourssource.settings['hideSubHeader'] =!this.tblhlpslasupporthourssource.settings['hideSubHeader'];
this.tblhlpslasupporthourssource.initGrid();
}
showhlpslasupporthoursInActive()
{
}
enablehlpslasupporthoursInActive()
{
}
async SethlpslasupporthoursTableddConfig()
{
if(!this.bfilterPopulatehlpslasupporthours){
}
this.bfilterPopulatehlpslasupporthours=true;
}
async hlpslasupporthoursbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethlpslasupporthoursTableConfig()
{
this.hlpslasupporthourssettings = {
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
weekday: {
title: 'Week Day',
type: '',
filter:true,
},
starttime: {
title: 'Start Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
endtime: {
title: 'End Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
hlpslasupporthoursLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpslasupporthoursID)>=0)
{
this.hlpslasupporthourssource=new LocalDataSource();
this.hlpslasupporthourssource.load(this.hlpservicelevelservice.hlpslasupporthours as  any as LocalDataSource);
this.hlpslasupporthourssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hlpslasupporthoursroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hlpservicelevelservice.hlpslasupporthours.length == 0)
{
    this.tblhlpslasupporthourssource.grid.createFormShown = true;
}
else
{
    let obj = new hlpslasupporthour();
    this.hlpservicelevelservice.hlpslasupporthours.push(obj);
    this.hlpslasupporthourssource.refresh();
    if ((this.hlpservicelevelservice.hlpslasupporthours.length / this.hlpslasupporthourssource.getPaging().perPage).toFixed(0) + 1 != this.hlpslasupporthourssource.getPaging().page)
    {
        this.hlpslasupporthourssource.setPage((this.hlpservicelevelservice.hlpslasupporthours.length / this.hlpslasupporthourssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpslasupporthourssource.grid.edit(this.tblhlpslasupporthourssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpslasupporthourssource.data.indexOf(event.data);
this.onDeletehlpslasupporthour(event,event.data.supportid,((this.hlpslasupporthourssource.getPaging().page-1) *this.hlpslasupporthourssource.getPaging().perPage)+index);
this.hlpslasupporthourssource.refresh();
break;
}
}

*/
hlpslasupporthoursroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithlpslasupporthour(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithlpslasupporthour(event,event.data.supportid,this.formid);
break;
case 'delete':
this.onDeletehlpslasupporthour(event,event.data.supportid,((this.hlpslasupporthourssource.getPaging().page-1) *this.hlpslasupporthourssource.getPaging().perPage)+event.index);
this.hlpslasupporthourssource.refresh();
break;
}
}
hlpslasupporthoursonDelete(obj) {
let supportid=obj.data.supportid;
if (confirm('Are you sure to delete this record ?')) {
this.hlpservicelevelservice.deletehlpservicelevel(supportid).then(res=>
this.hlpslasupporthoursLoadTable()
);
}
}
hlpslasupporthoursPaging(val)
{
debugger;
this.hlpslasupporthourssource.setPaging(1, val, true);
}

handlehlpslasupporthoursGridSelected(event:any) {
this.hlpslasupporthoursselectedindex=this.hlpservicelevelservice.hlpslasupporthours.findIndex(i => i.supportid === event.data.supportid);
}
IshlpslasupporthoursVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpslasupporthoursID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpslasupporthours

}



