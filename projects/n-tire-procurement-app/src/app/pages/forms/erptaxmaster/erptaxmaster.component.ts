import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { erptaxmaster } from './../../../model/erptaxmaster.model';
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
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
//detail table services
import { erptaxcalculation } from './../../../model/erptaxcalculation.model';
import { erptaxcalculationComponent } from './../../../pages/forms/erptaxcalculation/erptaxcalculation.component';
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
selector: 'app-erptaxmaster',
templateUrl: './erptaxmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptaxmasterComponent implements OnInit {
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
bfilterPopulateerptaxmasters:boolean=false;
dataerptaxmasterstaxid3:any=[];
dataerptaxmasterstaxtype3:any=[];
dataerptaxmastersaccountgroup3:any=[];
dataerptaxmastersopeningbalancetype3:any=[];
dataerptaxmastersitemcategoryid3:any=[];
dataerptaxcalculationscalculationtype3:any=[];
dataerptaxcalculationstaxid3:any=[];
dataerptaxcalculationsaccountid3:any=[];
bfilterPopulateerptaxcalculations:boolean=false;
@ViewChild('tblerptaxcalculationssource',{static:false}) tblerptaxcalculationssource: Ng2SmartTableComponent;
 erptaxmasterForm: FormGroup;
taxidList: erptaxmaster[];
taxidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
taxid_erptaxmastersForm: FormGroup;//autocomplete
taxid_erptaxmastersoptions:any;//autocomplete
taxid_erptaxmastersformatter:any;//autocomplete
taxtypeList: boconfigvalue[];
accountgroupList: erpfaaccountmaster[];
accountgroupoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountgroup_erpfaaccountmastersForm: FormGroup;//autocomplete
accountgroup_erpfaaccountmastersoptions:any;//autocomplete
accountgroup_erpfaaccountmastersformatter:any;//autocomplete
openingbalancetypeList: boconfigvalue[];
itemcategoryidList: bomasterdata[];
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
erptaxmastershowOption:boolean;
erptaxcalculationshowOption:boolean;
sessiondata:any;
sourcekey:any;



erptaxcalculationsvisiblelist:any;
erptaxcalculationshidelist:any;

DeletederptaxcalculationIDs: string="";
erptaxcalculationsID: string = "1";
erptaxcalculationsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erptaxmasterservice: erptaxmasterService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
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
this.erptaxmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
taxid: [null],
taxiddesc: [null],
taxcode: [null],
taxname: [null],
tags: [null],
taxtype: [null],
taxtypedesc: [null],
taxpercentage: [null],
accountgroup: [null],
accountgroupdesc: [null],
description: [null],
openingbalancetype: [null],
openingbalancetypedesc: [null],
openingbalance: [null],
formrequired: [null],
itemcategoryid: [null],
itemcategoryiddesc: [null],
customfield: [null],
attachment: [null],
comments: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptaxmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptaxmasterForm.dirty && this.erptaxmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.taxid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.taxid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.taxid && pkDetail) {
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
let erptaxmasterid = null;

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
this.formid=erptaxmasterid;
//this.sharedService.alert(erptaxmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterptaxcalculationsTableConfig();
  setTimeout(() => {
  this.SeterptaxcalculationsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.taxidList = res as erptaxmaster[];
if(this.erptaxmasterservice.formData && this.erptaxmasterservice.formData.taxid){
this.taxidoptionsEvent.emit(this.taxidList);
this.erptaxmasterForm.patchValue({
    taxid: this.erptaxmasterservice.formData.taxid,
    taxiddesc: this.erptaxmasterservice.formData.taxiddesc,
});
}
{
let arrtaxid = this.taxidList.filter(v => v.taxid == this.erptaxmasterForm.get('taxid').value);
let objtaxid;
if (arrtaxid.length > 0) objtaxid = arrtaxid[0];
if (objtaxid)
{
}
}
}
).catch((err) => {console.log(err);});
this.taxid_erptaxmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.taxidList.filter(v => v.taxname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.taxid_erptaxmastersformatter = (result: any) => result.taxname;
this.configservice.getList("taxtype").then(res => this.taxtypeList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountgroupList = res as erpfaaccountmaster[];
if(this.erptaxmasterservice.formData && this.erptaxmasterservice.formData.accountgroup){
this.accountgroupoptionsEvent.emit(this.accountgroupList);
this.erptaxmasterForm.patchValue({
    accountgroup: this.erptaxmasterservice.formData.accountgroup,
    accountgroupdesc: this.erptaxmasterservice.formData.accountgroupdesc,
});
}
{
let arraccountgroup = this.accountgroupList.filter(v => v.accountid == this.erptaxmasterForm.get('accountgroup').value);
let objaccountgroup;
if (arraccountgroup.length > 0) objaccountgroup = arraccountgroup[0];
if (objaccountgroup)
{
}
}
}
).catch((err) => {console.log(err);});
this.accountgroup_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.accountgroupList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.accountgroup_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.configservice.getList("txntype").then(res => this.openingbalancetypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("rs8fd").then(res => {
this.itemcategoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.erptaxmasterservice.geterptaxmastersList().then(res => {
      this.pkList = res as erptaxmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.taxname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.taxname;

//setting the flag that the screen is not touched 
this.erptaxmasterForm.markAsUntouched();
this.erptaxmasterForm.markAsPristine();
}
onSelectedtaxid(taxidDetail: any) {
if (taxidDetail.taxid && taxidDetail) {
this.erptaxmasterForm.patchValue({
taxid: taxidDetail.taxid,
taxiddesc: taxidDetail.taxname,

});

}
}

onSelectedaccountgroup(accountgroupDetail: any) {
if (accountgroupDetail.accountid && accountgroupDetail) {
this.erptaxmasterForm.patchValue({
accountgroup: accountgroupDetail.accountid,
accountgroupdesc: accountgroupDetail.accountname,

});

}
}




resetForm() {
if (this.erptaxmasterForm != null)
this.erptaxmasterForm.reset();
this.erptaxmasterForm.patchValue({
});
setTimeout(() => {
this.erptaxmasterservice.erptaxcalculations=[];
this.erptaxcalculationsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taxid = this.erptaxmasterForm.get('taxid').value;
        if(taxid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptaxmasterservice.deleteerptaxmaster(taxid).then(res =>
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
    this.erptaxmasterForm.patchValue({
        taxid: null
    });
    if(this.erptaxmasterservice.formData.taxid!=null)this.erptaxmasterservice.formData.taxid=null;
for (let i=0;i<this.erptaxmasterservice.erptaxcalculations.length;i++) {
this.erptaxmasterservice.erptaxcalculations[i].calculationid=null;
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
        else if(key=="tags")
this.erptaxmasterForm.patchValue({"tags":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.erptaxmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptaxmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptaxmasterForm.controls[key]!=undefined)
{
this.erptaxmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erptaxmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erptaxmasterservice.formData.taxname!=null )
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
taxidonChange(evt:any){
let e=evt.value;
}
taxcodeonChange(evt:any){
let e=evt.value;
}
taxnameonChange(evt:any){
let e=evt.value;
}
tagsonChange(evt:any){
let e=evt.value;
}
taxtypeonChange(evt:any){
let e=this.f.taxtype.value as any;
this.erptaxmasterForm.patchValue({taxtypedesc:evt.options[evt.options.selectedIndex].text});
}
taxpercentageonChange(evt:any){
let e=evt.value;
}
accountgrouponChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
openingbalancetypeonChange(evt:any){
let e=this.f.openingbalancetype.value as any;
this.erptaxmasterForm.patchValue({openingbalancetypedesc:evt.options[evt.options.selectedIndex].text});
}
openingbalanceonChange(evt:any){
let e=evt.value;
}
formrequiredonChange(evt:any){
let e=evt.value;
}
itemcategoryidonChange(evt:any){
let e=evt.value;
this.erptaxmasterForm.patchValue({itemcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
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
  


editerptaxmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptaxmasterservice.geterptaxmastersByEID(pkcol).then(res => {

this.erptaxmasterservice.formData=res.erptaxmaster;
let formproperty=res.erptaxmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptaxmaster.pkcol;
this.formid=res.erptaxmaster.taxid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptaxmaster.taxid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptaxmasterForm.patchValue({
taxid: res.erptaxmaster.taxid,
taxiddesc: res.erptaxmaster.taxiddesc,
taxcode: res.erptaxmaster.taxcode,
taxname: res.erptaxmaster.taxname,
tags: JSON.parse(res.erptaxmaster.tags),
taxtype: res.erptaxmaster.taxtype,
taxtypedesc: res.erptaxmaster.taxtypedesc,
taxpercentage: res.erptaxmaster.taxpercentage,
accountgroup: res.erptaxmaster.accountgroup,
accountgroupdesc: res.erptaxmaster.accountgroupdesc,
description: res.erptaxmaster.description,
openingbalancetype: res.erptaxmaster.openingbalancetype,
openingbalancetypedesc: res.erptaxmaster.openingbalancetypedesc,
openingbalance: res.erptaxmaster.openingbalance,
formrequired: res.erptaxmaster.formrequired,
itemcategoryid: res.erptaxmaster.itemcategoryid,
itemcategoryiddesc: res.erptaxmaster.itemcategoryiddesc,
customfield: res.erptaxmaster.customfield,
attachment: JSON.parse(res.erptaxmaster.attachment),
comments: res.erptaxmaster.comments,
status: res.erptaxmaster.status,
statusdesc: res.erptaxmaster.statusdesc,
});
this.erptaxcalculationsvisiblelist=res.erptaxcalculationsvisiblelist;
if(this.erptaxmasterForm.get('customfield').value!=null && this.erptaxmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erptaxmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erptaxmasterForm.get('attachment').value!=null && this.erptaxmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erptaxmasterForm.get('attachment').value);
//Child Tables if any
this.erptaxmasterservice.erptaxcalculations = res.erptaxcalculations;
this.SeterptaxcalculationsTableConfig();
this.erptaxcalculationsLoadTable();
  setTimeout(() => {
  this.SeterptaxcalculationsTableddConfig();
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
  for (let key in this.erptaxmasterForm.controls) {
    if (this.erptaxmasterForm.controls[key] != null) {
if(false)
{
if(this.erptaxmasterservice.formData!=null && this.erptaxmasterservice.formData[key]!=null  && this.erptaxmasterservice.formData[key]!='[]' && this.erptaxmasterservice.formData[key]!=undefined && this.erptaxmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptaxmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptaxmasterservice.formData!=null && this.erptaxmasterservice.formData[key]!=null   && this.erptaxmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptaxmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptaxmasterservice.formData!=null && this.erptaxmasterservice.formData[key]!=null   && this.erptaxmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptaxmasterservice.formData[key]+"'><div class='progress__number'>"+this.erptaxmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptaxmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptaxmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erptaxmasterForm.value;
if(this.erptaxmasterForm.get('tags').value!=null)obj.tags=JSON.stringify(this.erptaxmasterForm.get('tags').value);
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

private erptaxmastertoggleOption(){
this.erptaxmastershowOption = this.erptaxmastershowOption === true ? false : true;
}

private erptaxcalculationtoggleOption(){
this.erptaxcalculationshowOption = this.erptaxcalculationshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptaxmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptaxmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptaxmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptaxmasterservice.formData=this.erptaxmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptaxmasterForm.controls[key] != null)
    {
        this.erptaxmasterservice.formData[key] = this.erptaxmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(this.erptaxmasterForm.get('tags').value!=null)this.erptaxmasterservice.formData.tags=JSON.stringify(this.erptaxmasterForm.get('tags').value);
if(customfields!=null)this.erptaxmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erptaxmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erptaxmasterservice.formData.DeletederptaxcalculationIDs = this.DeletederptaxcalculationIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erptaxmasterservice.formData);
this.erptaxmasterservice.formData=this.erptaxmasterForm.value;
this.erptaxmasterservice.saveOrUpdateerptaxmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erptaxcalculationssource.data)
{
    for (let i = 0; i < this.erptaxcalculationssource.data.length; i++)
    {
        if (this.erptaxcalculationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptaxcalculationssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptaxmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptaxmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptaxmaster);
}
else
{
this.FillData(res);
}
}
this.erptaxmasterForm.markAsUntouched();
this.erptaxmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittaxid( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erptaxmasterForm.get('taxid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountgroup( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erptaxmasterForm.get('accountgroup').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erptaxmasterForm.get('itemcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerptaxcalculation(event:any,calculationid:any, taxid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptaxcalculationComponent, 
{
data:  {  showview:false,save:false,event,calculationid, taxid,visiblelist:this.erptaxcalculationsvisiblelist,  hidelist:this.erptaxcalculationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptaxcalculationssource.add(res);
this.erptaxcalculationssource.refresh();
}
else
{
this.erptaxcalculationssource.update(event.data, res);
}
}
});
}

onDeleteerptaxcalculation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptaxcalculationIDs += childID + ",";
this.erptaxmasterservice.erptaxcalculations.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erptaxcalculations
erptaxcalculationssettings:any;
erptaxcalculationssource: any;

showerptaxcalculationsCheckbox()
{
debugger;
if(this.tblerptaxcalculationssource.settings['selectMode']== 'multi')this.tblerptaxcalculationssource.settings['selectMode']= 'single';
else
this.tblerptaxcalculationssource.settings['selectMode']= 'multi';
this.tblerptaxcalculationssource.initGrid();
}
deleteerptaxcalculationsAll()
{
this.tblerptaxcalculationssource.settings['selectMode'] = 'single';
}
showerptaxcalculationsFilter()
{
  setTimeout(() => {
  this.SeterptaxcalculationsTableddConfig();
  });
      if(this.tblerptaxcalculationssource.settings!=null)this.tblerptaxcalculationssource.settings['hideSubHeader'] =!this.tblerptaxcalculationssource.settings['hideSubHeader'];
this.tblerptaxcalculationssource.initGrid();
}
showerptaxcalculationsInActive()
{
}
enableerptaxcalculationsInActive()
{
}
async SeterptaxcalculationsTableddConfig()
{
if(!this.bfilterPopulateerptaxcalculations){
}
this.bfilterPopulateerptaxcalculations=true;
}
async erptaxcalculationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptaxcalculationsTableConfig()
{
this.erptaxcalculationssettings = {
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
calculationtype: {
title: 'Calculation Type',
type: '',
filter:true,
},
accountid: {
title: 'Account',
type: 'number',
filter:true,
},
rate: {
title: 'Rate',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
total: {
title: 'Total',
type: 'number',
filter:true,
},
},
};
}
erptaxcalculationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptaxcalculationsID)>=0)
{
this.erptaxcalculationssource=new LocalDataSource();
this.erptaxcalculationssource.load(this.erptaxmasterservice.erptaxcalculations as  any as LocalDataSource);
this.erptaxcalculationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptaxcalculationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptaxmasterservice.erptaxcalculations.length == 0)
{
    this.tblerptaxcalculationssource.grid.createFormShown = true;
}
else
{
    let obj = new erptaxcalculation();
    this.erptaxmasterservice.erptaxcalculations.push(obj);
    this.erptaxcalculationssource.refresh();
    if ((this.erptaxmasterservice.erptaxcalculations.length / this.erptaxcalculationssource.getPaging().perPage).toFixed(0) + 1 != this.erptaxcalculationssource.getPaging().page)
    {
        this.erptaxcalculationssource.setPage((this.erptaxmasterservice.erptaxcalculations.length / this.erptaxcalculationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptaxcalculationssource.grid.edit(this.tblerptaxcalculationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptaxcalculationssource.data.indexOf(event.data);
this.onDeleteerptaxcalculation(event,event.data.calculationid,((this.erptaxcalculationssource.getPaging().page-1) *this.erptaxcalculationssource.getPaging().perPage)+index);
this.erptaxcalculationssource.refresh();
break;
}
}

*/
erptaxcalculationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptaxcalculation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptaxcalculation(event,event.data.calculationid,this.formid);
break;
case 'delete':
this.onDeleteerptaxcalculation(event,event.data.calculationid,((this.erptaxcalculationssource.getPaging().page-1) *this.erptaxcalculationssource.getPaging().perPage)+event.index);
this.erptaxcalculationssource.refresh();
break;
}
}
erptaxcalculationsonDelete(obj) {
let calculationid=obj.data.calculationid;
if (confirm('Are you sure to delete this record ?')) {
this.erptaxmasterservice.deleteerptaxmaster(calculationid).then(res=>
this.erptaxcalculationsLoadTable()
);
}
}
erptaxcalculationsPaging(val)
{
debugger;
this.erptaxcalculationssource.setPaging(1, val, true);
}

handleerptaxcalculationsGridSelected(event:any) {
this.erptaxcalculationsselectedindex=this.erptaxmasterservice.erptaxcalculations.findIndex(i => i.calculationid === event.data.calculationid);
}
IserptaxcalculationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptaxcalculationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptaxcalculations

}



