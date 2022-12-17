import { erptendersupplierresponseService } from './../../../service/erptendersupplierresponse.service';
import { erptendersupplierresponse } from './../../../model/erptendersupplierresponse.model';
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
import { erptendermaster} from './../../../model/erptendermaster.model';
import { erptendermasterComponent } from './../../../pages/forms/erptendermaster/erptendermaster.component';
import { erptendermasterService } from './../../../service/erptendermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
//detail table services
import { erptendersuppliercomplianceresponse } from './../../../model/erptendersuppliercomplianceresponse.model';
import { erptendersuppliercomplianceresponseComponent } from './../../../pages/forms/erptendersuppliercomplianceresponse/erptendersuppliercomplianceresponse.component';
//FK services
import { erpsalesordermaster,IerpsalesordermasterResponse } from './../../../model/erpsalesordermaster.model';
import { erpsalesordermasterComponent } from './../../../pages/forms/erpsalesordermaster/erpsalesordermaster.component';
import { erpsalesordermasterService } from './../../../service/erpsalesordermaster.service';
import { erptendersupplierresponsedetail } from './../../../model/erptendersupplierresponsedetail.model';
import { erptendersupplierresponsedetailComponent } from './../../../pages/forms/erptendersupplierresponsedetail/erptendersupplierresponsedetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptenderdetail,IerptenderdetailResponse } from './../../../model/erptenderdetail.model';
import { erptenderdetailComponent } from './../../../pages/forms/erptenderdetail/erptenderdetail.component';
import { erptenderdetailService } from './../../../service/erptenderdetail.service';
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
selector: 'app-erptendersupplierresponse',
templateUrl: './erptendersupplierresponse.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptendersupplierresponseComponent implements OnInit {
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
bfilterPopulateerptendersupplierresponses:boolean=false;
dataerptendersupplierresponsestenderid3:any=[];
dataerptendersupplierresponsessupplierid3:any=[];
dataerptendersuppliercomplianceresponsesresponseid3:any=[];
dataerptendersuppliercomplianceresponsessoid3:any=[];
dataerptendersuppliercomplianceresponsescompliancetype3:any=[];
bfilterPopulateerptendersuppliercomplianceresponses:boolean=false;
dataerptendersupplierresponsedetailsitemid3:any=[];
dataerptendersupplierresponsedetailsuom3:any=[];
dataerptendersupplierresponsedetailscurrency3:any=[];
dataerptendersupplierresponsedetailstenderdetailid3:any=[];
dataerptendersupplierresponsedetailsresponseid3:any=[];
dataerptendersupplierresponsedetailssoid3:any=[];
bfilterPopulateerptendersupplierresponsedetails:boolean=false;
@ViewChild('tblerptendersuppliercomplianceresponsessource',{static:false}) tblerptendersuppliercomplianceresponsessource: Ng2SmartTableComponent;
@ViewChild('tblerptendersupplierresponsedetailssource',{static:false}) tblerptendersupplierresponsedetailssource: Ng2SmartTableComponent;
 erptendersupplierresponseForm: FormGroup;
tenderidList: erptendermaster[];
tenderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenderid_erptendermastersForm: FormGroup;//autocomplete
tenderid_erptendermastersoptions:any;//autocomplete
tenderid_erptendermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
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
erptendersupplierresponseshowOption:boolean;
erptendersuppliercomplianceresponseshowOption:boolean;
erptendersupplierresponsedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erptendersuppliercomplianceresponsesvisiblelist:any;
erptendersuppliercomplianceresponseshidelist:any;
erptendersupplierresponsedetailsvisiblelist:any;
erptendersupplierresponsedetailshidelist:any;

DeletederptendersuppliercomplianceresponseIDs: string="";
erptendersuppliercomplianceresponsesID: string = "1";
erptendersuppliercomplianceresponsesselectedindex:any;
DeletederptendersupplierresponsedetailIDs: string="";
erptendersupplierresponsedetailsID: string = "2";
erptendersupplierresponsedetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erptendersupplierresponseservice: erptendersupplierresponseService,
private erpsalesordermasterservice: erpsalesordermasterService,
private erpitemmasterservice: erpitemmasterService,
private erptenderdetailservice: erptenderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptendermasterservice:erptendermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
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
this.erptendersupplierresponseForm  = this.fb.group({
pk:[null],
ImageName: [null],
responseid: [null],
tenderid: [null],
tenderiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
submitdatetime: [null],
documentfeepaid: [null],
emdpaid: [null],
bidamount: [null],
supplierreference: [null],
customfield: [null],
attachment: [null],
agreed: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptendersupplierresponseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptendersupplierresponseForm.dirty && this.erptendersupplierresponseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.responseid && pkDetail) {
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
let erptendersupplierresponseid = null;

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
this.formid=erptendersupplierresponseid;
//this.sharedService.alert(erptendersupplierresponseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterptendersuppliercomplianceresponsesTableConfig();
  setTimeout(() => {
  this.SeterptendersuppliercomplianceresponsesTableddConfig();
  });

this.SeterptendersupplierresponsedetailsTableConfig();
  setTimeout(() => {
  this.SeterptendersupplierresponsedetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptendermasterservice.geterptendermastersList().then(res => 
{
this.tenderidList = res as erptendermaster[];
if(this.erptendersupplierresponseservice.formData && this.erptendersupplierresponseservice.formData.tenderid){
this.tenderidoptionsEvent.emit(this.tenderidList);
this.erptendersupplierresponseForm.patchValue({
    tenderid: this.erptendersupplierresponseservice.formData.tenderid,
    tenderiddesc: this.erptendersupplierresponseservice.formData.tenderiddesc,
});
}
{
let arrtenderid = this.tenderidList.filter(v => v.tenderid == this.erptendersupplierresponseForm.get('tenderid').value);
let objtenderid;
if (arrtenderid.length > 0) objtenderid = arrtenderid[0];
if (objtenderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenderid_erptendermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenderidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenderid_erptendermastersformatter = (result: any) => result.title;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erptendersupplierresponseservice.formData && this.erptendersupplierresponseservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erptendersupplierresponseForm.patchValue({
    supplierid: this.erptendersupplierresponseservice.formData.supplierid,
    supplieriddesc: this.erptendersupplierresponseservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erptendersupplierresponseForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
    this.erptendersupplierresponseForm.patchValue({ creditdays: objsupplierid.creditdays });
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;

//autocomplete
    this.erptendersupplierresponseservice.geterptendersupplierresponsesList().then(res => {
      this.pkList = res as erptendersupplierresponse[];
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
this.erptendersupplierresponseForm.markAsUntouched();
this.erptendersupplierresponseForm.markAsPristine();
}
onSelectedtenderid(tenderidDetail: any) {
if (tenderidDetail.tenderid && tenderidDetail) {
this.erptendersupplierresponseForm.patchValue({
tenderid: tenderidDetail.tenderid,
tenderiddesc: tenderidDetail.title,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erptendersupplierresponseForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});
this.erptendersupplierresponseForm.patchValue({creditdays:supplieridDetail.creditdays});

}
}




resetForm() {
if (this.erptendersupplierresponseForm != null)
this.erptendersupplierresponseForm.reset();
this.erptendersupplierresponseForm.patchValue({
});
setTimeout(() => {
this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses=[];
this.erptendersuppliercomplianceresponsesLoadTable();
this.erptendersupplierresponseservice.erptendersupplierresponsedetails=[];
this.erptendersupplierresponsedetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let responseid = this.erptendersupplierresponseForm.get('responseid').value;
        if(responseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptendersupplierresponseservice.deleteerptendersupplierresponse(responseid).then(res =>
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
    this.erptendersupplierresponseForm.patchValue({
        responseid: null
    });
    if(this.erptendersupplierresponseservice.formData.responseid!=null)this.erptendersupplierresponseservice.formData.responseid=null;
for (let i=0;i<this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.length;i++) {
this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses[i].complianceid=null;
}
for (let i=0;i<this.erptendersupplierresponseservice.erptendersupplierresponsedetails.length;i++) {
this.erptendersupplierresponseservice.erptendersupplierresponsedetails[i].responsedetailid=null;
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
        else if(key=="submitdatetime")
this.erptendersupplierresponseForm.patchValue({"submitdatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erptendersupplierresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptendersupplierresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptendersupplierresponseForm.controls[key]!=undefined)
{
this.erptendersupplierresponseForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erptendersupplierresponses",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
responseidonChange(evt:any){
let e=evt.value;
}
tenderidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
submitdatetimeonChange(evt:any){
let e=evt.value;
}
documentfeepaidonChange(evt:any){
let e=evt.value;
}
emdpaidonChange(evt:any){
let e=evt.value;
}
bidamountonChange(evt:any){
let e=evt.value;
}
supplierreferenceonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
agreedonChange(evt:any){
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
  


editerptendersupplierresponses() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptendersupplierresponseservice.geterptendersupplierresponsesByEID(pkcol).then(res => {

this.erptendersupplierresponseservice.formData=res.erptendersupplierresponse;
let formproperty=res.erptendersupplierresponse.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptendersupplierresponse.pkcol;
this.formid=res.erptendersupplierresponse.responseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptendersupplierresponse.responseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptendersupplierresponseForm.patchValue({
responseid: res.erptendersupplierresponse.responseid,
tenderid: res.erptendersupplierresponse.tenderid,
tenderiddesc: res.erptendersupplierresponse.tenderiddesc,
supplierid: res.erptendersupplierresponse.supplierid,
supplieriddesc: res.erptendersupplierresponse.supplieriddesc,
submitdatetime: this.ngbDateParserFormatter.parse(res.erptendersupplierresponse.submitdatetime),
documentfeepaid: res.erptendersupplierresponse.documentfeepaid,
emdpaid: res.erptendersupplierresponse.emdpaid,
bidamount: res.erptendersupplierresponse.bidamount,
supplierreference: res.erptendersupplierresponse.supplierreference,
customfield: res.erptendersupplierresponse.customfield,
attachment: JSON.parse(res.erptendersupplierresponse.attachment),
agreed: res.erptendersupplierresponse.agreed,
status: res.erptendersupplierresponse.status,
statusdesc: res.erptendersupplierresponse.statusdesc,
});
this.erptendersuppliercomplianceresponsesvisiblelist=res.erptendersuppliercomplianceresponsesvisiblelist;
this.erptendersupplierresponsedetailsvisiblelist=res.erptendersupplierresponsedetailsvisiblelist;
if(this.erptendersupplierresponseForm.get('customfield').value!=null && this.erptendersupplierresponseForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erptendersupplierresponseForm.get('customfield').value);
this.FillCustomField();
if(this.erptendersupplierresponseForm.get('attachment').value!=null && this.erptendersupplierresponseForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erptendersupplierresponseForm.get('attachment').value);
//Child Tables if any
this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses = res.erptendersuppliercomplianceresponses;
this.SeterptendersuppliercomplianceresponsesTableConfig();
this.erptendersuppliercomplianceresponsesLoadTable();
  setTimeout(() => {
  this.SeterptendersuppliercomplianceresponsesTableddConfig();
  });
this.erptendersupplierresponseservice.erptendersupplierresponsedetails = res.erptendersupplierresponsedetails;
this.SeterptendersupplierresponsedetailsTableConfig();
this.erptendersupplierresponsedetailsLoadTable();
  setTimeout(() => {
  this.SeterptendersupplierresponsedetailsTableddConfig();
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
  for (let key in this.erptendersupplierresponseForm.controls) {
    if (this.erptendersupplierresponseForm.controls[key] != null) {
if(false)
{
if(this.erptendersupplierresponseservice.formData!=null && this.erptendersupplierresponseservice.formData[key]!=null  && this.erptendersupplierresponseservice.formData[key]!='[]' && this.erptendersupplierresponseservice.formData[key]!=undefined && this.erptendersupplierresponseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptendersupplierresponseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptendersupplierresponseservice.formData!=null && this.erptendersupplierresponseservice.formData[key]!=null   && this.erptendersupplierresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptendersupplierresponseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptendersupplierresponseservice.formData!=null && this.erptendersupplierresponseservice.formData[key]!=null   && this.erptendersupplierresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptendersupplierresponseservice.formData[key]+"'><div class='progress__number'>"+this.erptendersupplierresponseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptendersupplierresponseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptendersupplierresponseForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erptendersupplierresponseForm.value;
obj.submitdatetime=new Date(this.erptendersupplierresponseForm.get('submitdatetime').value ? this.ngbDateParserFormatter.format(this.erptendersupplierresponseForm.get('submitdatetime').value)+'  UTC' :null);
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

private erptendersupplierresponsetoggleOption(){
this.erptendersupplierresponseshowOption = this.erptendersupplierresponseshowOption === true ? false : true;
}

private erptendersuppliercomplianceresponsetoggleOption(){
this.erptendersuppliercomplianceresponseshowOption = this.erptendersuppliercomplianceresponseshowOption === true ? false : true;
}

private erptendersupplierresponsedetailtoggleOption(){
this.erptendersupplierresponsedetailshowOption = this.erptendersupplierresponsedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptendersupplierresponseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptendersupplierresponseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptendersupplierresponseForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptendersupplierresponseservice.formData=this.erptendersupplierresponseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptendersupplierresponseForm.controls[key] != null)
    {
        this.erptendersupplierresponseservice.formData[key] = this.erptendersupplierresponseForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erptendersupplierresponseservice.formData.submitdatetime=new Date(this.erptendersupplierresponseForm.get('submitdatetime').value ? this.ngbDateParserFormatter.format(this.erptendersupplierresponseForm.get('submitdatetime').value)+'  UTC' :null);
if(customfields!=null)this.erptendersupplierresponseservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erptendersupplierresponseservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erptendersupplierresponseservice.formData.DeletederptendersuppliercomplianceresponseIDs = this.DeletederptendersuppliercomplianceresponseIDs;
this.erptendersupplierresponseservice.formData.DeletederptendersupplierresponsedetailIDs = this.DeletederptendersupplierresponsedetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erptendersupplierresponseservice.formData);
this.erptendersupplierresponseservice.formData=this.erptendersupplierresponseForm.value;
this.erptendersupplierresponseservice.saveOrUpdateerptendersupplierresponses().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erptendersuppliercomplianceresponsessource.data)
{
    for (let i = 0; i < this.erptendersuppliercomplianceresponsessource.data.length; i++)
    {
        if (this.erptendersuppliercomplianceresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptendersuppliercomplianceresponsessource.data[i].fileattachmentlist);
    }
}
if (this.erptendersupplierresponsedetailssource.data)
{
    for (let i = 0; i < this.erptendersupplierresponsedetailssource.data.length; i++)
    {
        if (this.erptendersupplierresponsedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptendersupplierresponsedetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendersupplierresponse);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptendersupplierresponseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendersupplierresponse);
}
else
{
this.FillData(res);
}
}
this.erptendersupplierresponseForm.markAsUntouched();
this.erptendersupplierresponseForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittenderid( tenderid) {
/*let ScreenType='2';
this.dialog.open(erptendermasterComponent, 
{
data: {tenderid:this.erptendersupplierresponseForm.get('tenderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erptendersupplierresponseForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerptendersuppliercomplianceresponse(event:any,complianceid:any, responseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptendersuppliercomplianceresponseComponent, 
{
data:  {  showview:false,save:false,event,complianceid, responseid,visiblelist:this.erptendersuppliercomplianceresponsesvisiblelist,  hidelist:this.erptendersuppliercomplianceresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptendersuppliercomplianceresponsessource.add(res);
this.erptendersuppliercomplianceresponsessource.refresh();
}
else
{
this.erptendersuppliercomplianceresponsessource.update(event.data, res);
}
}
});
}

onDeleteerptendersuppliercomplianceresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptendersuppliercomplianceresponseIDs += childID + ",";
this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptendersupplierresponsedetail(event:any,responsedetailid:any, responseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptendersupplierresponsedetailComponent, 
{
data:  {  showview:false,save:false,event,responsedetailid, responseid,visiblelist:this.erptendersupplierresponsedetailsvisiblelist,  hidelist:this.erptendersupplierresponsedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptendersupplierresponsedetailssource.add(res);
this.erptendersupplierresponsedetailssource.refresh();
}
else
{
this.erptendersupplierresponsedetailssource.update(event.data, res);
}
}
});
}

onDeleteerptendersupplierresponsedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptendersupplierresponsedetailIDs += childID + ",";
this.erptendersupplierresponseservice.erptendersupplierresponsedetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erptendersuppliercomplianceresponses
erptendersuppliercomplianceresponsessettings:any;
erptendersuppliercomplianceresponsessource: any;

showerptendersuppliercomplianceresponsesCheckbox()
{
debugger;
if(this.tblerptendersuppliercomplianceresponsessource.settings['selectMode']== 'multi')this.tblerptendersuppliercomplianceresponsessource.settings['selectMode']= 'single';
else
this.tblerptendersuppliercomplianceresponsessource.settings['selectMode']= 'multi';
this.tblerptendersuppliercomplianceresponsessource.initGrid();
}
deleteerptendersuppliercomplianceresponsesAll()
{
this.tblerptendersuppliercomplianceresponsessource.settings['selectMode'] = 'single';
}
showerptendersuppliercomplianceresponsesFilter()
{
  setTimeout(() => {
  this.SeterptendersuppliercomplianceresponsesTableddConfig();
  });
      if(this.tblerptendersuppliercomplianceresponsessource.settings!=null)this.tblerptendersuppliercomplianceresponsessource.settings['hideSubHeader'] =!this.tblerptendersuppliercomplianceresponsessource.settings['hideSubHeader'];
this.tblerptendersuppliercomplianceresponsessource.initGrid();
}
showerptendersuppliercomplianceresponsesInActive()
{
}
enableerptendersuppliercomplianceresponsesInActive()
{
}
async SeterptendersuppliercomplianceresponsesTableddConfig()
{
if(!this.bfilterPopulateerptendersuppliercomplianceresponses){

this.configservice.getList("compliancetype").then(res=>
{
var datacompliancetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerptendersuppliercomplianceresponsescompliancetype3.push(defaultobj);
for(let i=0; i<datacompliancetype2.length; i++){
var obj= { value: datacompliancetype2[i].configkey, title: datacompliancetype2[i].configtext};
this.dataerptendersuppliercomplianceresponsescompliancetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblerptendersuppliercomplianceresponsessource.settings);
if(clone.columns['compliancetype']!=undefined)clone.columns['compliancetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerptendersuppliercomplianceresponsescompliancetype3)), }, };
if(clone.columns['compliancetype']!=undefined)clone.columns['compliancetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerptendersuppliercomplianceresponsescompliancetype3)), }, };
this.tblerptendersuppliercomplianceresponsessource.settings =  clone;
this.tblerptendersuppliercomplianceresponsessource.initGrid();
});
}
this.bfilterPopulateerptendersuppliercomplianceresponses=true;
}
async erptendersuppliercomplianceresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptendersuppliercomplianceresponsesTableConfig()
{
this.erptendersuppliercomplianceresponsessettings = {
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
tenderid: {
title: 'Tender',
type: 'number',
filter:true,
},
compliancetype: {
title: 'Compliance Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerptendersuppliercomplianceresponsescompliancetype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
complied: {
title: 'Complied',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
remarks: {
title: 'Remarks',
type: '',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
},
};
}
erptendersuppliercomplianceresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersuppliercomplianceresponsesID)>=0)
{
this.erptendersuppliercomplianceresponsessource=new LocalDataSource();
this.erptendersuppliercomplianceresponsessource.load(this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses as  any as LocalDataSource);
this.erptendersuppliercomplianceresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptendersuppliercomplianceresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.length == 0)
{
    this.tblerptendersuppliercomplianceresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new erptendersuppliercomplianceresponse();
    this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.push(obj);
    this.erptendersuppliercomplianceresponsessource.refresh();
    if ((this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.length / this.erptendersuppliercomplianceresponsessource.getPaging().perPage).toFixed(0) + 1 != this.erptendersuppliercomplianceresponsessource.getPaging().page)
    {
        this.erptendersuppliercomplianceresponsessource.setPage((this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.length / this.erptendersuppliercomplianceresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptendersuppliercomplianceresponsessource.grid.edit(this.tblerptendersuppliercomplianceresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptendersuppliercomplianceresponsessource.data.indexOf(event.data);
this.onDeleteerptendersuppliercomplianceresponse(event,event.data.complianceid,((this.erptendersuppliercomplianceresponsessource.getPaging().page-1) *this.erptendersuppliercomplianceresponsessource.getPaging().perPage)+index);
this.erptendersuppliercomplianceresponsessource.refresh();
break;
}
}

*/
erptendersuppliercomplianceresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptendersuppliercomplianceresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptendersuppliercomplianceresponse(event,event.data.complianceid,this.formid);
break;
case 'delete':
this.onDeleteerptendersuppliercomplianceresponse(event,event.data.complianceid,((this.erptendersuppliercomplianceresponsessource.getPaging().page-1) *this.erptendersuppliercomplianceresponsessource.getPaging().perPage)+event.index);
this.erptendersuppliercomplianceresponsessource.refresh();
break;
}
}
erptendersuppliercomplianceresponsesonDelete(obj) {
let complianceid=obj.data.complianceid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendersupplierresponseservice.deleteerptendersupplierresponse(complianceid).then(res=>
this.erptendersuppliercomplianceresponsesLoadTable()
);
}
}
erptendersuppliercomplianceresponsesPaging(val)
{
debugger;
this.erptendersuppliercomplianceresponsessource.setPaging(1, val, true);
}

handleerptendersuppliercomplianceresponsesGridSelected(event:any) {
this.erptendersuppliercomplianceresponsesselectedindex=this.erptendersupplierresponseservice.erptendersuppliercomplianceresponses.findIndex(i => i.complianceid === event.data.complianceid);
}
IserptendersuppliercomplianceresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersuppliercomplianceresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptendersuppliercomplianceresponses
//start of Grid Codes erptendersupplierresponsedetails
erptendersupplierresponsedetailssettings:any;
erptendersupplierresponsedetailssource: any;

showerptendersupplierresponsedetailsCheckbox()
{
debugger;
if(this.tblerptendersupplierresponsedetailssource.settings['selectMode']== 'multi')this.tblerptendersupplierresponsedetailssource.settings['selectMode']= 'single';
else
this.tblerptendersupplierresponsedetailssource.settings['selectMode']= 'multi';
this.tblerptendersupplierresponsedetailssource.initGrid();
}
deleteerptendersupplierresponsedetailsAll()
{
this.tblerptendersupplierresponsedetailssource.settings['selectMode'] = 'single';
}
showerptendersupplierresponsedetailsFilter()
{
  setTimeout(() => {
  this.SeterptendersupplierresponsedetailsTableddConfig();
  });
      if(this.tblerptendersupplierresponsedetailssource.settings!=null)this.tblerptendersupplierresponsedetailssource.settings['hideSubHeader'] =!this.tblerptendersupplierresponsedetailssource.settings['hideSubHeader'];
this.tblerptendersupplierresponsedetailssource.initGrid();
}
showerptendersupplierresponsedetailsInActive()
{
}
enableerptendersupplierresponsedetailsInActive()
{
}
async SeterptendersupplierresponsedetailsTableddConfig()
{
if(!this.bfilterPopulateerptendersupplierresponsedetails){
}
this.bfilterPopulateerptendersupplierresponsedetails=true;
}
async erptendersupplierresponsedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptendersupplierresponsedetailsTableConfig()
{
this.erptendersupplierresponsedetailssettings = {
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
tenderdetailid: {
title: 'Tender Detail',
type: 'number',
filter:true,
},
tenderid: {
title: 'Tender',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:true,
},
unitprice: {
title: 'Unit Price',
type: '',
filter:true,
},
cost: {
title: 'Cost',
type: 'number',
filter:true,
},
totalvalue: {
title: 'Total Value',
type: 'number',
filter:true,
},
},
};
}
erptendersupplierresponsedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersupplierresponsedetailsID)>=0)
{
this.erptendersupplierresponsedetailssource=new LocalDataSource();
this.erptendersupplierresponsedetailssource.load(this.erptendersupplierresponseservice.erptendersupplierresponsedetails as  any as LocalDataSource);
this.erptendersupplierresponsedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptendersupplierresponsedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptendersupplierresponseservice.erptendersupplierresponsedetails.length == 0)
{
    this.tblerptendersupplierresponsedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erptendersupplierresponsedetail();
    this.erptendersupplierresponseservice.erptendersupplierresponsedetails.push(obj);
    this.erptendersupplierresponsedetailssource.refresh();
    if ((this.erptendersupplierresponseservice.erptendersupplierresponsedetails.length / this.erptendersupplierresponsedetailssource.getPaging().perPage).toFixed(0) + 1 != this.erptendersupplierresponsedetailssource.getPaging().page)
    {
        this.erptendersupplierresponsedetailssource.setPage((this.erptendersupplierresponseservice.erptendersupplierresponsedetails.length / this.erptendersupplierresponsedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptendersupplierresponsedetailssource.grid.edit(this.tblerptendersupplierresponsedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptendersupplierresponsedetailssource.data.indexOf(event.data);
this.onDeleteerptendersupplierresponsedetail(event,event.data.responsedetailid,((this.erptendersupplierresponsedetailssource.getPaging().page-1) *this.erptendersupplierresponsedetailssource.getPaging().perPage)+index);
this.erptendersupplierresponsedetailssource.refresh();
break;
}
}

*/
erptendersupplierresponsedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptendersupplierresponsedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptendersupplierresponsedetail(event,event.data.responsedetailid,this.formid);
break;
case 'delete':
this.onDeleteerptendersupplierresponsedetail(event,event.data.responsedetailid,((this.erptendersupplierresponsedetailssource.getPaging().page-1) *this.erptendersupplierresponsedetailssource.getPaging().perPage)+event.index);
this.erptendersupplierresponsedetailssource.refresh();
break;
}
}
erptendersupplierresponsedetailsonDelete(obj) {
let responsedetailid=obj.data.responsedetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erptendersupplierresponseservice.deleteerptendersupplierresponse(responsedetailid).then(res=>
this.erptendersupplierresponsedetailsLoadTable()
);
}
}
erptendersupplierresponsedetailsPaging(val)
{
debugger;
this.erptendersupplierresponsedetailssource.setPaging(1, val, true);
}

handleerptendersupplierresponsedetailsGridSelected(event:any) {
this.erptendersupplierresponsedetailsselectedindex=this.erptendersupplierresponseservice.erptendersupplierresponsedetails.findIndex(i => i.responsedetailid === event.data.responsedetailid);
}
IserptendersupplierresponsedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptendersupplierresponsedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptendersupplierresponsedetails

}



