import { camspmmasterService } from './../../../service/camspmmaster.service';
import { camspmmaster } from './../../../model/camspmmaster.model';
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
import { camspmtask } from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
//FK services
import { camspminstruction } from './../../../model/camspminstruction.model';
import { camspminstructionComponent } from './../../../pages/forms/camspminstruction/camspminstruction.component';
//FK services
import { camspmtaskService } from './../../../service/camspmtask.service';
import { camspmitem } from './../../../model/camspmitem.model';
import { camspmitemComponent } from './../../../pages/forms/camspmitem/camspmitem.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
import { camspmsuppliertask } from './../../../model/camspmsuppliertask.model';
import { camspmsuppliertaskComponent } from './../../../pages/forms/camspmsuppliertask/camspmsuppliertask.component';
//FK services
import { erpsuppliermaster,IerpsuppliermasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
import { camspmuser } from './../../../model/camspmuser.model';
import { camspmuserComponent } from './../../../pages/forms/camspmuser/camspmuser.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-camspmmaster',
templateUrl: './camspmmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camspmmasterComponent implements OnInit {
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
bfilterPopulatecamspmmasters:boolean=false;
datacamspmmastersassetcategory3:any=[];
datacamspmmastersworktype3:any=[];
datacamspmmasterspmtype3:any=[];
datacamspmmastersmeasurementmeter3:any=[];
datacamspmmastersfrequencyunit3:any=[];
datacamspmmasterspmgenerationtype3:any=[];
datacamspmtasksdurationfromstart3:any=[];
datacamspmtaskstasktype3:any=[];
datacamspmtaskspmid3:any=[];
bfilterPopulatecamspmtasks:boolean=false;
datacamspminstructionstaskid3:any=[];
datacamspminstructionspmid3:any=[];
bfilterPopulatecamspminstructions:boolean=false;
datacamspmitemsitemid3:any=[];
datacamspmitemstaskid3:any=[];
datacamspmitemspmid3:any=[];
bfilterPopulatecamspmitems:boolean=false;
datacamspmsuppliertaskssupplierid3:any=[];
datacamspmsuppliertaskstasktype3:any=[];
datacamspmsuppliertaskspmid3:any=[];
bfilterPopulatecamspmsuppliertasks:boolean=false;
datacamspmusersuserid3:any=[];
datacamspmuserstaskid3:any=[];
datacamspmuserspmid3:any=[];
bfilterPopulatecamspmusers:boolean=false;
@ViewChild('tblcamspmtaskssource',{static:false}) tblcamspmtaskssource: Ng2SmartTableComponent;
@ViewChild('tblcamspminstructionssource',{static:false}) tblcamspminstructionssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmitemssource',{static:false}) tblcamspmitemssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmsuppliertaskssource',{static:false}) tblcamspmsuppliertaskssource: Ng2SmartTableComponent;
@ViewChild('tblcamspmuserssource',{static:false}) tblcamspmuserssource: Ng2SmartTableComponent;
 camspmmasterForm: FormGroup;
assetcategoryList: boconfigvalue[];
worktypeList: boconfigvalue[];
pmtypeList: boconfigvalue[];
measurementmeterList: boconfigvalue[];
frequencyunitList: boconfigvalue[];
pmgenerationtypeList: boconfigvalue[];
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
camspmmastershowOption:boolean;
camspmtaskshowOption:boolean;
camspminstructionshowOption:boolean;
camspmitemshowOption:boolean;
camspmsuppliertaskshowOption:boolean;
camspmusershowOption:boolean;
sessiondata:any;
sourcekey:any;



camspmtasksvisiblelist:any;
camspmtaskshidelist:any;
camspminstructionsvisiblelist:any;
camspminstructionshidelist:any;
camspmitemsvisiblelist:any;
camspmitemshidelist:any;
camspmsuppliertasksvisiblelist:any;
camspmsuppliertaskshidelist:any;
camspmusersvisiblelist:any;
camspmusershidelist:any;

DeletedcamspmtaskIDs: string="";
camspmtasksID: string = "1";
camspmtasksselectedindex:any;
DeletedcamspminstructionIDs: string="";
camspminstructionsID: string = "2";
camspminstructionsselectedindex:any;
DeletedcamspmitemIDs: string="";
camspmitemsID: string = "3";
camspmitemsselectedindex:any;
DeletedcamspmsuppliertaskIDs: string="";
camspmsuppliertasksID: string = "4";
camspmsuppliertasksselectedindex:any;
DeletedcamspmuserIDs: string="";
camspmusersID: string = "5";
camspmusersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camspmmasterservice: camspmmasterService,
private camspmtaskservice: camspmtaskService,
private erpitemmasterservice: erpitemmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private bousermasterservice: bousermasterService,
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
this.camspmmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
pmid: [null],
assetcategory: [null, Validators.required],
assetcategorydesc: [null],
reference: [null, Validators.required],
description: [null, Validators.required],
tat: [null, Validators.required],
worktype: [null],
worktypedesc: [null],
pmtype: [null],
pmtypedesc: [null],
measurementmeter: [null],
measurementmeterdesc: [null],
frequencyunit: [null],
frequencyunitdesc: [null],
frequency: [null],
days: [null],
pmgenerationtype: [null],
pmgenerationtypedesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camspmmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camspmmasterForm.dirty && this.camspmmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.pmid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.pmid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.pmid && pkDetail) {
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
let camspmmasterid = null;

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
this.formid=camspmmasterid;
//this.sharedService.alert(camspmmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamspmtasksTableConfig();
  setTimeout(() => {
  this.SetcamspmtasksTableddConfig();
  });

this.SetcamspminstructionsTableConfig();
  setTimeout(() => {
  this.SetcamspminstructionsTableddConfig();
  });

this.SetcamspmitemsTableConfig();
  setTimeout(() => {
  this.SetcamspmitemsTableddConfig();
  });

this.SetcamspmsuppliertasksTableConfig();
  setTimeout(() => {
  this.SetcamspmsuppliertasksTableddConfig();
  });

this.SetcamspmusersTableConfig();
  setTimeout(() => {
  this.SetcamspmusersTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("assetcategory").then(res => this.assetcategoryList = res as boconfigvalue[]);
this.configservice.getList("worktype").then(res => this.worktypeList = res as boconfigvalue[]);
this.configservice.getList("pmtype").then(res => this.pmtypeList = res as boconfigvalue[]);
this.configservice.getList("measurementmeter").then(res => this.measurementmeterList = res as boconfigvalue[]);
this.configservice.getList("timefrequency").then(res => this.frequencyunitList = res as boconfigvalue[]);
this.configservice.getList("pmgenerationtype").then(res => this.pmgenerationtypeList = res as boconfigvalue[]);

//autocomplete
    this.camspmmasterservice.getcamspmmastersList().then(res => {
      this.pkList = res as camspmmaster[];
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
this.camspmmasterForm.markAsUntouched();
this.camspmmasterForm.markAsPristine();
}



resetForm() {
if (this.camspmmasterForm != null)
this.camspmmasterForm.reset();
this.camspmmasterForm.patchValue({
});
setTimeout(() => {
this.camspmmasterservice.camspmtasks=[];
this.camspmtasksLoadTable();
this.camspmmasterservice.camspminstructions=[];
this.camspminstructionsLoadTable();
this.camspmmasterservice.camspmitems=[];
this.camspmitemsLoadTable();
this.camspmmasterservice.camspmsuppliertasks=[];
this.camspmsuppliertasksLoadTable();
this.camspmmasterservice.camspmusers=[];
this.camspmusersLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let pmid = this.camspmmasterForm.get('pmid').value;
        if(pmid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camspmmasterservice.deletecamspmmaster(pmid).then(res =>
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
    this.camspmmasterForm.patchValue({
        pmid: null
    });
    if(this.camspmmasterservice.formData.pmid!=null)this.camspmmasterservice.formData.pmid=null;
for (let i=0;i<this.camspmmasterservice.camspmtasks.length;i++) {
this.camspmmasterservice.camspmtasks[i].pmtaskid=null;
}
for (let i=0;i<this.camspmmasterservice.camspminstructions.length;i++) {
this.camspmmasterservice.camspminstructions[i].pminstructionid=null;
}
for (let i=0;i<this.camspmmasterservice.camspmitems.length;i++) {
this.camspmmasterservice.camspmitems[i].pmitemid=null;
}
for (let i=0;i<this.camspmmasterservice.camspmsuppliertasks.length;i++) {
this.camspmmasterservice.camspmsuppliertasks[i].pmsupplierid=null;
}
for (let i=0;i<this.camspmmasterservice.camspmusers.length;i++) {
this.camspmmasterservice.camspmusers[i].pmuserid=null;
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
        else if(ctrltype=="string")
{
this.camspmmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camspmmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camspmmasterForm.controls[key]!=undefined)
{
this.camspmmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camspmmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
assetcategoryonChange(evt:any){
let e=this.f.assetcategory.value as any;
this.camspmmasterForm.patchValue({assetcategorydesc:evt.options[evt.options.selectedIndex].text});
}
worktypeonChange(evt:any){
let e=this.f.worktype.value as any;
this.camspmmasterForm.patchValue({worktypedesc:evt.options[evt.options.selectedIndex].text});
}
pmtypeonChange(evt:any){
let e=this.f.pmtype.value as any;
this.camspmmasterForm.patchValue({pmtypedesc:evt.options[evt.options.selectedIndex].text});
}
measurementmeteronChange(evt:any){
let e=this.f.measurementmeter.value as any;
this.camspmmasterForm.patchValue({measurementmeterdesc:evt.options[evt.options.selectedIndex].text});
}
frequencyunitonChange(evt:any){
let e=this.f.frequencyunit.value as any;
this.camspmmasterForm.patchValue({frequencyunitdesc:evt.options[evt.options.selectedIndex].text});
}
pmgenerationtypeonChange(evt:any){
let e=this.f.pmgenerationtype.value as any;
this.camspmmasterForm.patchValue({pmgenerationtypedesc:evt.options[evt.options.selectedIndex].text});
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
  


editcamspmmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camspmmasterservice.getcamspmmastersByEID(pkcol).then(res => {

this.camspmmasterservice.formData=res.camspmmaster;
let formproperty=res.camspmmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camspmmaster.pkcol;
this.formid=res.camspmmaster.pmid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camspmmaster.pmid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camspmmasterForm.patchValue({
pmid: res.camspmmaster.pmid,
assetcategory: res.camspmmaster.assetcategory,
assetcategorydesc: res.camspmmaster.assetcategorydesc,
reference: res.camspmmaster.reference,
description: res.camspmmaster.description,
tat: res.camspmmaster.tat,
worktype: res.camspmmaster.worktype,
worktypedesc: res.camspmmaster.worktypedesc,
pmtype: res.camspmmaster.pmtype,
pmtypedesc: res.camspmmaster.pmtypedesc,
measurementmeter: res.camspmmaster.measurementmeter,
measurementmeterdesc: res.camspmmaster.measurementmeterdesc,
frequencyunit: res.camspmmaster.frequencyunit,
frequencyunitdesc: res.camspmmaster.frequencyunitdesc,
frequency: res.camspmmaster.frequency,
days: res.camspmmaster.days,
pmgenerationtype: res.camspmmaster.pmgenerationtype,
pmgenerationtypedesc: res.camspmmaster.pmgenerationtypedesc,
remarks: res.camspmmaster.remarks,
customfield: res.camspmmaster.customfield,
attachment: JSON.parse(res.camspmmaster.attachment),
status: res.camspmmaster.status,
statusdesc: res.camspmmaster.statusdesc,
});
this.camspmtasksvisiblelist=res.camspmtasksvisiblelist;
this.camspminstructionsvisiblelist=res.camspminstructionsvisiblelist;
this.camspmitemsvisiblelist=res.camspmitemsvisiblelist;
this.camspmsuppliertasksvisiblelist=res.camspmsuppliertasksvisiblelist;
this.camspmusersvisiblelist=res.camspmusersvisiblelist;
if(this.camspmmasterForm.get('customfield').value!=null && this.camspmmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camspmmasterForm.get('customfield').value);
this.FillCustomField();
if(this.camspmmasterForm.get('attachment').value!=null && this.camspmmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camspmmasterForm.get('attachment').value);
//Child Tables if any
this.camspmmasterservice.camspmtasks = res.camspmtasks;
this.SetcamspmtasksTableConfig();
this.camspmtasksLoadTable();
  setTimeout(() => {
  this.SetcamspmtasksTableddConfig();
  });
this.camspmmasterservice.camspminstructions = res.camspminstructions;
this.SetcamspminstructionsTableConfig();
this.camspminstructionsLoadTable();
  setTimeout(() => {
  this.SetcamspminstructionsTableddConfig();
  });
this.camspmmasterservice.camspmitems = res.camspmitems;
this.SetcamspmitemsTableConfig();
this.camspmitemsLoadTable();
  setTimeout(() => {
  this.SetcamspmitemsTableddConfig();
  });
this.camspmmasterservice.camspmsuppliertasks = res.camspmsuppliertasks;
this.SetcamspmsuppliertasksTableConfig();
this.camspmsuppliertasksLoadTable();
  setTimeout(() => {
  this.SetcamspmsuppliertasksTableddConfig();
  });
this.camspmmasterservice.camspmusers = res.camspmusers;
this.SetcamspmusersTableConfig();
this.camspmusersLoadTable();
  setTimeout(() => {
  this.SetcamspmusersTableddConfig();
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
  for (let key in this.camspmmasterForm.controls) {
    if (this.camspmmasterForm.controls[key] != null) {
if(false)
{
if(this.camspmmasterservice.formData!=null && this.camspmmasterservice.formData[key]!=null  && this.camspmmasterservice.formData[key]!='[]' && this.camspmmasterservice.formData[key]!=undefined && this.camspmmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camspmmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camspmmasterservice.formData!=null && this.camspmmasterservice.formData[key]!=null   && this.camspmmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camspmmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camspmmasterservice.formData!=null && this.camspmmasterservice.formData[key]!=null   && this.camspmmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camspmmasterservice.formData[key]+"'><div class='progress__number'>"+this.camspmmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camspmmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camspmmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camspmmasterForm.value;
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

private camspmmastertoggleOption(){
this.camspmmastershowOption = this.camspmmastershowOption === true ? false : true;
}

private camspmtasktoggleOption(){
this.camspmtaskshowOption = this.camspmtaskshowOption === true ? false : true;
}

private camspminstructiontoggleOption(){
this.camspminstructionshowOption = this.camspminstructionshowOption === true ? false : true;
}

private camspmitemtoggleOption(){
this.camspmitemshowOption = this.camspmitemshowOption === true ? false : true;
}

private camspmsuppliertasktoggleOption(){
this.camspmsuppliertaskshowOption = this.camspmsuppliertaskshowOption === true ? false : true;
}

private camspmusertoggleOption(){
this.camspmusershowOption = this.camspmusershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camspmmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camspmmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camspmmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camspmmasterservice.formData=this.camspmmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camspmmasterForm.controls[key] != null)
    {
        this.camspmmasterservice.formData[key] = this.camspmmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(customfields!=null)this.camspmmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camspmmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.camspmmasterservice.formData.DeletedcamspmtaskIDs = this.DeletedcamspmtaskIDs;
this.camspmmasterservice.formData.DeletedcamspminstructionIDs = this.DeletedcamspminstructionIDs;
this.camspmmasterservice.formData.DeletedcamspmitemIDs = this.DeletedcamspmitemIDs;
this.camspmmasterservice.formData.DeletedcamspmsuppliertaskIDs = this.DeletedcamspmsuppliertaskIDs;
this.camspmmasterservice.formData.DeletedcamspmuserIDs = this.DeletedcamspmuserIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camspmmasterservice.formData);
this.camspmmasterservice.formData=this.camspmmasterForm.value;
this.camspmmasterservice.saveOrUpdatecamspmmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.camspmtaskssource.data)
{
    for (let i = 0; i < this.camspmtaskssource.data.length; i++)
    {
        if (this.camspmtaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmtaskssource.data[i].fileattachmentlist);
    }
}
if (this.camspminstructionssource.data)
{
    for (let i = 0; i < this.camspminstructionssource.data.length; i++)
    {
        if (this.camspminstructionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspminstructionssource.data[i].fileattachmentlist);
    }
}
if (this.camspmitemssource.data)
{
    for (let i = 0; i < this.camspmitemssource.data.length; i++)
    {
        if (this.camspmitemssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmitemssource.data[i].fileattachmentlist);
    }
}
if (this.camspmsuppliertaskssource.data)
{
    for (let i = 0; i < this.camspmsuppliertaskssource.data.length; i++)
    {
        if (this.camspmsuppliertaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmsuppliertaskssource.data[i].fileattachmentlist);
    }
}
if (this.camspmuserssource.data)
{
    for (let i = 0; i < this.camspmuserssource.data.length; i++)
    {
        if (this.camspmuserssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmuserssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camspmmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmmaster);
}
else
{
this.FillData(res);
}
}
this.camspmmasterForm.markAsUntouched();
this.camspmmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeletecamspmtask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmtaskIDs += childID + ",";
this.camspmmasterservice.camspmtasks.splice(i, 1);
}

AddOrEditcamspminstruction(event:any,pminstructionid:any, pmid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspminstructionComponent, 
{
data:  {  showview:false,save:false,event,pminstructionid, pmid,visiblelist:this.camspminstructionsvisiblelist,  hidelist:this.camspminstructionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspminstructionssource.add(res);
this.camspminstructionssource.refresh();
}
else
{
this.camspminstructionssource.update(event.data, res);
}
}
});
}

onDeletecamspminstruction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspminstructionIDs += childID + ",";
this.camspmmasterservice.camspminstructions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmitem(event:any,pmitemid:any, pmid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmitemComponent, 
{
data:  {  showview:false,save:false,event,pmitemid, pmid,visiblelist:this.camspmitemsvisiblelist,  hidelist:this.camspmitemshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmitemssource.add(res);
this.camspmitemssource.refresh();
}
else
{
this.camspmitemssource.update(event.data, res);
}
}
});
}

onDeletecamspmitem(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmitemIDs += childID + ",";
this.camspmmasterservice.camspmitems.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmsuppliertask(event:any,pmsupplierid:any, pmid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmsuppliertaskComponent, 
{
data:  {  showview:false,save:false,event,pmsupplierid, pmid,visiblelist:this.camspmsuppliertasksvisiblelist,  hidelist:this.camspmsuppliertaskshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmsuppliertaskssource.add(res);
this.camspmsuppliertaskssource.refresh();
}
else
{
this.camspmsuppliertaskssource.update(event.data, res);
}
}
});
}

onDeletecamspmsuppliertask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmsuppliertaskIDs += childID + ",";
this.camspmmasterservice.camspmsuppliertasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamspmuser(event:any,pmuserid:any, pmid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmuserComponent, 
{
data:  {  showview:false,save:false,event,pmuserid, pmid,visiblelist:this.camspmusersvisiblelist,  hidelist:this.camspmusershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmuserssource.add(res);
this.camspmuserssource.refresh();
}
else
{
this.camspmuserssource.update(event.data, res);
}
}
});
}

onDeletecamspmuser(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmuserIDs += childID + ",";
this.camspmmasterservice.camspmusers.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camspmtasks
camspmtaskssettings:any;
camspmtaskssource: any;

showcamspmtasksCheckbox()
{
debugger;
if(this.tblcamspmtaskssource.settings['selectMode']== 'multi')this.tblcamspmtaskssource.settings['selectMode']= 'single';
else
this.tblcamspmtaskssource.settings['selectMode']= 'multi';
this.tblcamspmtaskssource.initGrid();
}
deletecamspmtasksAll()
{
this.tblcamspmtaskssource.settings['selectMode'] = 'single';
}
showcamspmtasksFilter()
{
  setTimeout(() => {
  this.SetcamspmtasksTableddConfig();
  });
      if(this.tblcamspmtaskssource.settings!=null)this.tblcamspmtaskssource.settings['hideSubHeader'] =!this.tblcamspmtaskssource.settings['hideSubHeader'];
this.tblcamspmtaskssource.initGrid();
}
showcamspmtasksInActive()
{
}
enablecamspmtasksInActive()
{
}
async SetcamspmtasksTableddConfig()
{
if(!this.bfilterPopulatecamspmtasks){
}
this.bfilterPopulatecamspmtasks=true;
}
async camspmtasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmtasksTableConfig()
{
this.camspmtaskssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: !this.showview, // true,
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
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camspmtasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmtasksID)>=0)
{
this.camspmtaskssource=new LocalDataSource();
this.camspmtaskssource.load(this.camspmmasterservice.camspmtasks as  any as LocalDataSource);
this.camspmtaskssource.setPaging(1, 20, true);
}
}
camspmtasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmmasterservice.camspmtasks.length == 0)
{
    this.tblcamspmtaskssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmtask();
    this.camspmmasterservice.camspmtasks.push(obj);
    this.camspmtaskssource.refresh();
    if ((this.camspmmasterservice.camspmtasks.length / this.camspmtaskssource.getPaging().perPage).toFixed(0) + 1 != this.camspmtaskssource.getPaging().page)
    {
        this.camspmtaskssource.setPage((this.camspmmasterservice.camspmtasks.length / this.camspmtaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmtaskssource.grid.edit(this.tblcamspmtaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmtaskssource.data.indexOf(event.data);
this.onDeletecamspmtask(event,event.data.pmtaskid,((this.camspmtaskssource.getPaging().page-1) *this.camspmtaskssource.getPaging().perPage)+index);
this.camspmtaskssource.refresh();
break;
}
}
camspmtasksPaging(val)
{
debugger;
this.camspmtaskssource.setPaging(1, val, true);
}

handlecamspmtasksGridSelected(event:any) {
this.camspmtasksselectedindex=this.camspmmasterservice.camspmtasks.findIndex(i => i.pmtaskid === event.data.pmtaskid);
}

  async camspmtasksmoveUp() {
    this.camspmtasksmove(-1);
  }

  async camspmtasksmove(val) {
    let index=((this.camspmtaskssource.getPaging().page - 1) * this.camspmtaskssource.getPaging().perPage) + this.camspmtasksselectedindex;
    if (index >= 0) {
      
      var current = this.camspmmasterservice.camspmtasks[index];
      var tmp = this.camspmmasterservice.camspmtasks[index +val];
      this.camspmmasterservice.camspmtasks[index +val] = this.camspmmasterservice.camspmtasks[index];
      this.camspmmasterservice.camspmtasks[index] = tmp;
      this.camspmmasterservice.camspmtasks[index +val].orderno=index +val;
      this.camspmmasterservice.camspmtasks[index].orderno=index;
      this.camspmtaskssource.refresh();
      this.camspmtasksselectedindex=this.camspmmasterservice.camspmtasks.findIndex(i => i.pmtaskid === current.pmtaskid);
      this.tblcamspmtaskssource.grid.getRows().forEach((row:any) => {
        if( current.pmtaskid == row.data.pmtaskid) {
          this.tblcamspmtaskssource.grid.selectRow(row);
          
        }
      });
    }
  }

  camspmtasksmoveDown() {
    return this.camspmtasksmove(1);
  }
IscamspmtasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmtasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmtasks
//start of Grid Codes camspminstructions
camspminstructionssettings:any;
camspminstructionssource: any;

showcamspminstructionsCheckbox()
{
debugger;
if(this.tblcamspminstructionssource.settings['selectMode']== 'multi')this.tblcamspminstructionssource.settings['selectMode']= 'single';
else
this.tblcamspminstructionssource.settings['selectMode']= 'multi';
this.tblcamspminstructionssource.initGrid();
}
deletecamspminstructionsAll()
{
this.tblcamspminstructionssource.settings['selectMode'] = 'single';
}
showcamspminstructionsFilter()
{
  setTimeout(() => {
  this.SetcamspminstructionsTableddConfig();
  });
      if(this.tblcamspminstructionssource.settings!=null)this.tblcamspminstructionssource.settings['hideSubHeader'] =!this.tblcamspminstructionssource.settings['hideSubHeader'];
this.tblcamspminstructionssource.initGrid();
}
showcamspminstructionsInActive()
{
}
enablecamspminstructionsInActive()
{
}
async SetcamspminstructionsTableddConfig()
{
if(!this.bfilterPopulatecamspminstructions){
}
this.bfilterPopulatecamspminstructions=true;
}
async camspminstructionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspminstructionsTableConfig()
{
this.camspminstructionssettings = {
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
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
code: {
title: 'Code',
type: '',
filter:true,
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
type: 'number',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camspminstructionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspminstructionsID)>=0)
{
this.camspminstructionssource=new LocalDataSource();
this.camspminstructionssource.load(this.camspmmasterservice.camspminstructions as  any as LocalDataSource);
this.camspminstructionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspminstructionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmmasterservice.camspminstructions.length == 0)
{
    this.tblcamspminstructionssource.grid.createFormShown = true;
}
else
{
    let obj = new camspminstruction();
    this.camspmmasterservice.camspminstructions.push(obj);
    this.camspminstructionssource.refresh();
    if ((this.camspmmasterservice.camspminstructions.length / this.camspminstructionssource.getPaging().perPage).toFixed(0) + 1 != this.camspminstructionssource.getPaging().page)
    {
        this.camspminstructionssource.setPage((this.camspmmasterservice.camspminstructions.length / this.camspminstructionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspminstructionssource.grid.edit(this.tblcamspminstructionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspminstructionssource.data.indexOf(event.data);
this.onDeletecamspminstruction(event,event.data.pminstructionid,((this.camspminstructionssource.getPaging().page-1) *this.camspminstructionssource.getPaging().perPage)+index);
this.camspminstructionssource.refresh();
break;
}
}

*/
camspminstructionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspminstruction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspminstruction(event,event.data.pminstructionid,this.formid);
break;
case 'delete':
this.onDeletecamspminstruction(event,event.data.pminstructionid,((this.camspminstructionssource.getPaging().page-1) *this.camspminstructionssource.getPaging().perPage)+event.index);
this.camspminstructionssource.refresh();
break;
}
}
camspminstructionsonDelete(obj) {
let pminstructionid=obj.data.pminstructionid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmmasterservice.deletecamspmmaster(pminstructionid).then(res=>
this.camspminstructionsLoadTable()
);
}
}
camspminstructionsPaging(val)
{
debugger;
this.camspminstructionssource.setPaging(1, val, true);
}

handlecamspminstructionsGridSelected(event:any) {
this.camspminstructionsselectedindex=this.camspmmasterservice.camspminstructions.findIndex(i => i.pminstructionid === event.data.pminstructionid);
}
IscamspminstructionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspminstructionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspminstructions
//start of Grid Codes camspmitems
camspmitemssettings:any;
camspmitemssource: any;

showcamspmitemsCheckbox()
{
debugger;
if(this.tblcamspmitemssource.settings['selectMode']== 'multi')this.tblcamspmitemssource.settings['selectMode']= 'single';
else
this.tblcamspmitemssource.settings['selectMode']= 'multi';
this.tblcamspmitemssource.initGrid();
}
deletecamspmitemsAll()
{
this.tblcamspmitemssource.settings['selectMode'] = 'single';
}
showcamspmitemsFilter()
{
  setTimeout(() => {
  this.SetcamspmitemsTableddConfig();
  });
      if(this.tblcamspmitemssource.settings!=null)this.tblcamspmitemssource.settings['hideSubHeader'] =!this.tblcamspmitemssource.settings['hideSubHeader'];
this.tblcamspmitemssource.initGrid();
}
showcamspmitemsInActive()
{
}
enablecamspmitemsInActive()
{
}
async SetcamspmitemsTableddConfig()
{
if(!this.bfilterPopulatecamspmitems){
}
this.bfilterPopulatecamspmitems=true;
}
async camspmitemsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmitemsTableConfig()
{
this.camspmitemssettings = {
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
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
type: 'number',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camspmitemsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmitemsID)>=0)
{
this.camspmitemssource=new LocalDataSource();
this.camspmitemssource.load(this.camspmmasterservice.camspmitems as  any as LocalDataSource);
this.camspmitemssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmitemsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmmasterservice.camspmitems.length == 0)
{
    this.tblcamspmitemssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmitem();
    this.camspmmasterservice.camspmitems.push(obj);
    this.camspmitemssource.refresh();
    if ((this.camspmmasterservice.camspmitems.length / this.camspmitemssource.getPaging().perPage).toFixed(0) + 1 != this.camspmitemssource.getPaging().page)
    {
        this.camspmitemssource.setPage((this.camspmmasterservice.camspmitems.length / this.camspmitemssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmitemssource.grid.edit(this.tblcamspmitemssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmitemssource.data.indexOf(event.data);
this.onDeletecamspmitem(event,event.data.pmitemid,((this.camspmitemssource.getPaging().page-1) *this.camspmitemssource.getPaging().perPage)+index);
this.camspmitemssource.refresh();
break;
}
}

*/
camspmitemsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmitem(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmitem(event,event.data.pmitemid,this.formid);
break;
case 'delete':
this.onDeletecamspmitem(event,event.data.pmitemid,((this.camspmitemssource.getPaging().page-1) *this.camspmitemssource.getPaging().perPage)+event.index);
this.camspmitemssource.refresh();
break;
}
}
camspmitemsonDelete(obj) {
let pmitemid=obj.data.pmitemid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmmasterservice.deletecamspmmaster(pmitemid).then(res=>
this.camspmitemsLoadTable()
);
}
}
camspmitemsPaging(val)
{
debugger;
this.camspmitemssource.setPaging(1, val, true);
}

handlecamspmitemsGridSelected(event:any) {
this.camspmitemsselectedindex=this.camspmmasterservice.camspmitems.findIndex(i => i.pmitemid === event.data.pmitemid);
}
IscamspmitemsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmitemsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmitems
//start of Grid Codes camspmsuppliertasks
camspmsuppliertaskssettings:any;
camspmsuppliertaskssource: any;

showcamspmsuppliertasksCheckbox()
{
debugger;
if(this.tblcamspmsuppliertaskssource.settings['selectMode']== 'multi')this.tblcamspmsuppliertaskssource.settings['selectMode']= 'single';
else
this.tblcamspmsuppliertaskssource.settings['selectMode']= 'multi';
this.tblcamspmsuppliertaskssource.initGrid();
}
deletecamspmsuppliertasksAll()
{
this.tblcamspmsuppliertaskssource.settings['selectMode'] = 'single';
}
showcamspmsuppliertasksFilter()
{
  setTimeout(() => {
  this.SetcamspmsuppliertasksTableddConfig();
  });
      if(this.tblcamspmsuppliertaskssource.settings!=null)this.tblcamspmsuppliertaskssource.settings['hideSubHeader'] =!this.tblcamspmsuppliertaskssource.settings['hideSubHeader'];
this.tblcamspmsuppliertaskssource.initGrid();
}
showcamspmsuppliertasksInActive()
{
}
enablecamspmsuppliertasksInActive()
{
}
async SetcamspmsuppliertasksTableddConfig()
{
if(!this.bfilterPopulatecamspmsuppliertasks){
}
this.bfilterPopulatecamspmsuppliertasks=true;
}
async camspmsuppliertasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmsuppliertasksTableConfig()
{
this.camspmsuppliertaskssettings = {
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
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
taskdescription: {
title: 'Task Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
tasktype: {
title: 'Task Type',
type: '',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camspmsuppliertasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmsuppliertasksID)>=0)
{
this.camspmsuppliertaskssource=new LocalDataSource();
this.camspmsuppliertaskssource.load(this.camspmmasterservice.camspmsuppliertasks as  any as LocalDataSource);
this.camspmsuppliertaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmsuppliertasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmmasterservice.camspmsuppliertasks.length == 0)
{
    this.tblcamspmsuppliertaskssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmsuppliertask();
    this.camspmmasterservice.camspmsuppliertasks.push(obj);
    this.camspmsuppliertaskssource.refresh();
    if ((this.camspmmasterservice.camspmsuppliertasks.length / this.camspmsuppliertaskssource.getPaging().perPage).toFixed(0) + 1 != this.camspmsuppliertaskssource.getPaging().page)
    {
        this.camspmsuppliertaskssource.setPage((this.camspmmasterservice.camspmsuppliertasks.length / this.camspmsuppliertaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmsuppliertaskssource.grid.edit(this.tblcamspmsuppliertaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmsuppliertaskssource.data.indexOf(event.data);
this.onDeletecamspmsuppliertask(event,event.data.pmsupplierid,((this.camspmsuppliertaskssource.getPaging().page-1) *this.camspmsuppliertaskssource.getPaging().perPage)+index);
this.camspmsuppliertaskssource.refresh();
break;
}
}

*/
camspmsuppliertasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmsuppliertask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmsuppliertask(event,event.data.pmsupplierid,this.formid);
break;
case 'delete':
this.onDeletecamspmsuppliertask(event,event.data.pmsupplierid,((this.camspmsuppliertaskssource.getPaging().page-1) *this.camspmsuppliertaskssource.getPaging().perPage)+event.index);
this.camspmsuppliertaskssource.refresh();
break;
}
}
camspmsuppliertasksonDelete(obj) {
let pmsupplierid=obj.data.pmsupplierid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmmasterservice.deletecamspmmaster(pmsupplierid).then(res=>
this.camspmsuppliertasksLoadTable()
);
}
}
camspmsuppliertasksPaging(val)
{
debugger;
this.camspmsuppliertaskssource.setPaging(1, val, true);
}

handlecamspmsuppliertasksGridSelected(event:any) {
this.camspmsuppliertasksselectedindex=this.camspmmasterservice.camspmsuppliertasks.findIndex(i => i.pmsupplierid === event.data.pmsupplierid);
}
IscamspmsuppliertasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmsuppliertasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmsuppliertasks
//start of Grid Codes camspmusers
camspmuserssettings:any;
camspmuserssource: any;

showcamspmusersCheckbox()
{
debugger;
if(this.tblcamspmuserssource.settings['selectMode']== 'multi')this.tblcamspmuserssource.settings['selectMode']= 'single';
else
this.tblcamspmuserssource.settings['selectMode']= 'multi';
this.tblcamspmuserssource.initGrid();
}
deletecamspmusersAll()
{
this.tblcamspmuserssource.settings['selectMode'] = 'single';
}
showcamspmusersFilter()
{
  setTimeout(() => {
  this.SetcamspmusersTableddConfig();
  });
      if(this.tblcamspmuserssource.settings!=null)this.tblcamspmuserssource.settings['hideSubHeader'] =!this.tblcamspmuserssource.settings['hideSubHeader'];
this.tblcamspmuserssource.initGrid();
}
showcamspmusersInActive()
{
}
enablecamspmusersInActive()
{
}
async SetcamspmusersTableddConfig()
{
if(!this.bfilterPopulatecamspmusers){
}
this.bfilterPopulatecamspmusers=true;
}
async camspmusersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmusersTableConfig()
{
this.camspmuserssettings = {
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
userid: {
title: 'User',
type: 'number',
filter:true,
},
alltasks: {
title: 'All Tasks',
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
taskid: {
title: 'Task',
type: 'number',
filter:true,
},
tat: {
title: 'T A T',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camspmusersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmusersID)>=0)
{
this.camspmuserssource=new LocalDataSource();
this.camspmuserssource.load(this.camspmmasterservice.camspmusers as  any as LocalDataSource);
this.camspmuserssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmusersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camspmmasterservice.camspmusers.length == 0)
{
    this.tblcamspmuserssource.grid.createFormShown = true;
}
else
{
    let obj = new camspmuser();
    this.camspmmasterservice.camspmusers.push(obj);
    this.camspmuserssource.refresh();
    if ((this.camspmmasterservice.camspmusers.length / this.camspmuserssource.getPaging().perPage).toFixed(0) + 1 != this.camspmuserssource.getPaging().page)
    {
        this.camspmuserssource.setPage((this.camspmmasterservice.camspmusers.length / this.camspmuserssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmuserssource.grid.edit(this.tblcamspmuserssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmuserssource.data.indexOf(event.data);
this.onDeletecamspmuser(event,event.data.pmuserid,((this.camspmuserssource.getPaging().page-1) *this.camspmuserssource.getPaging().perPage)+index);
this.camspmuserssource.refresh();
break;
}
}

*/
camspmusersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmuser(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmuser(event,event.data.pmuserid,this.formid);
break;
case 'delete':
this.onDeletecamspmuser(event,event.data.pmuserid,((this.camspmuserssource.getPaging().page-1) *this.camspmuserssource.getPaging().perPage)+event.index);
this.camspmuserssource.refresh();
break;
}
}
camspmusersonDelete(obj) {
let pmuserid=obj.data.pmuserid;
if (confirm('Are you sure to delete this record ?')) {
this.camspmmasterservice.deletecamspmmaster(pmuserid).then(res=>
this.camspmusersLoadTable()
);
}
}
camspmusersPaging(val)
{
debugger;
this.camspmuserssource.setPaging(1, val, true);
}

handlecamspmusersGridSelected(event:any) {
this.camspmusersselectedindex=this.camspmmasterservice.camspmusers.findIndex(i => i.pmuserid === event.data.pmuserid);
}
IscamspmusersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmusersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmusers

}



