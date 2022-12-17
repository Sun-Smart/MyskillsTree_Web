import { camsassetadditionService } from './../../../service/camsassetaddition.service';
import { camsassetaddition } from './../../../model/camsassetaddition.model';
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
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpitemmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
//popups
import { erppurchaseordermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erppurchaseordermaster.service';
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
selector: 'app-camsassetaddition',
templateUrl: './camsassetaddition.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetadditionComponent implements OnInit {
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
bfilterPopulatecamsassetadditions:boolean=false;
datacamsassetadditionsassetid3:any=[];
datacamsassetadditionsaddedby3:any=[];
datacamsassetadditionsaddedreason3:any=[];
datacamsassetadditionsitemid3:any=[];
datacamsassetadditionsacquisitionmethod3:any=[];
datacamsassetadditionsuom3:any=[];
datacamsassetadditionspoid3:any=[];
 camsassetadditionForm: FormGroup;
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
addedbyList: bousermaster[];
addedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
addedby_bousermastersForm: FormGroup;//autocomplete
addedby_bousermastersoptions:any;//autocomplete
addedby_bousermastersformatter:any;//autocomplete
addedreasonList: boconfigvalue[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
acquisitionmethodList: boconfigvalue[];
uomList: boconfigvalue[];
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
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
camsassetadditionshowOption:boolean;
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
private camsassetadditionservice: camsassetadditionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsassetmasterservice:camsassetmasterService,
private bousermasterservice:bousermasterService,
private erpitemmasterservice:erpitemmasterService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
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
this.camsassetadditionForm  = this.fb.group({
pk:[null],
ImageName: [null],
additionid: [null],
assetid: [null, Validators.required],
assetiddesc: [null],
currentdate: [null, Validators.required],
addedby: [null, Validators.required],
addedbydesc: [null],
additiondate: [null, Validators.required],
accountdate: [null],
amount: [null, Validators.required],
addedservicelife: [null],
addedshelflife: [null],
addedreason: [null],
addedreasondesc: [null],
barcode: [null],
itemid: [null, Validators.required],
itemiddesc: [null],
description: [null],
acquisitionmethod: [null],
acquisitionmethoddesc: [null],
serialnumber: [null],
expirydate: [null],
uom: [null],
uomdesc: [null],
quantity: [null],
notes: [null],
poid: [null],
poiddesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassetadditionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetadditionForm.dirty && this.camsassetadditionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.additionid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.additionid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.additionid && pkDetail) {
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
let camsassetadditionid = null;

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
this.formid=camsassetadditionid;
//this.sharedService.alert(camsassetadditionid);

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
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsassetadditionservice.formData && this.camsassetadditionservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsassetadditionForm.patchValue({
    assetid: this.camsassetadditionservice.formData.assetid,
    assetiddesc: this.camsassetadditionservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsassetadditionForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assetid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetid_camsassetmastersformatter = (result: any) => result.description;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.addedbyList = res as bousermaster[];
if(this.camsassetadditionservice.formData && this.camsassetadditionservice.formData.addedby){
this.addedbyoptionsEvent.emit(this.addedbyList);
this.camsassetadditionForm.patchValue({
    addedby: this.camsassetadditionservice.formData.addedby,
    addedbydesc: this.camsassetadditionservice.formData.addedbydesc,
});
}
{
let arraddedby = this.addedbyList.filter(v => v.userid == this.camsassetadditionForm.get('addedby').value);
let objaddedby;
if (arraddedby.length > 0) objaddedby = arraddedby[0];
if (objaddedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.addedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.addedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.addedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("assetaddreason").then(res => this.addedreasonList = res as boconfigvalue[]);
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.camsassetadditionservice.formData && this.camsassetadditionservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.camsassetadditionForm.patchValue({
    itemid: this.camsassetadditionservice.formData.itemid,
    itemiddesc: this.camsassetadditionservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.camsassetadditionForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("acquisitionmethod").then(res => this.acquisitionmethodList = res as boconfigvalue[]);
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.camsassetadditionservice.formData && this.camsassetadditionservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.camsassetadditionForm.patchValue({
    poid: this.camsassetadditionservice.formData.poid,
    poiddesc: this.camsassetadditionservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.camsassetadditionForm.get('poid').value);
let objpoid;
if (arrpoid.length > 0) objpoid = arrpoid[0];
if (objpoid)
{
}
}
}
).catch((err) => {console.log(err);});
this.poid_erppurchaseordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.poidList.filter(v => v.ponumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.poid_erppurchaseordermastersformatter = (result: any) => result.ponumber;

//autocomplete
    this.camsassetadditionservice.getcamsassetadditionsList().then(res => {
      this.pkList = res as camsassetaddition[];
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
this.camsassetadditionForm.markAsUntouched();
this.camsassetadditionForm.markAsPristine();
}
onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsassetadditionForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}

onSelectedaddedby(addedbyDetail: any) {
if (addedbyDetail.userid && addedbyDetail) {
this.camsassetadditionForm.patchValue({
addedby: addedbyDetail.userid,
addedbydesc: addedbyDetail.username,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.camsassetadditionForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.camsassetadditionForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}




resetForm() {
if (this.camsassetadditionForm != null)
this.camsassetadditionForm.reset();
this.camsassetadditionForm.patchValue({
addedby: this.sessiondata.userid,
addedbydesc: this.sessiondata.username,
});
this.camsassetadditionForm.patchValue({
currentdate: this.ngbDateParserFormatter.parse(new Date().toString()),
additiondate: this.ngbDateParserFormatter.parse(new Date().toString()),
accountdate: this.ngbDateParserFormatter.parse(new Date().toString()),
expirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let additionid = this.camsassetadditionForm.get('additionid').value;
        if(additionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetadditionservice.deletecamsassetaddition(additionid).then(res =>
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
    this.camsassetadditionForm.patchValue({
        additionid: null
    });
    if(this.camsassetadditionservice.formData.additionid!=null)this.camsassetadditionservice.formData.additionid=null;
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
        else if(key=="currentdate")
this.camsassetadditionForm.patchValue({"currentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="additiondate")
this.camsassetadditionForm.patchValue({"additiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="accountdate")
this.camsassetadditionForm.patchValue({"accountdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.camsassetadditionForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="notes")
this.camsassetadditionForm.patchValue({"notes":  mainscreendata[key] } );
        else if(key=="remarks")
this.camsassetadditionForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsassetadditionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassetadditionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassetadditionForm.controls[key]!=undefined)
{
this.camsassetadditionForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetadditions",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
additionidonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
currentdateonChange(evt:any){
let e=evt.value;
}
addedbyonChange(evt:any){
let e=evt.value;
}
additiondateonChange(evt:any){
let e=evt.value;
}
accountdateonChange(evt:any){
let e=evt.value;
}
amountonChange(evt:any){
let e=evt.value;
}
addedservicelifeonChange(evt:any){
let e=evt.value;
}
addedshelflifeonChange(evt:any){
let e=evt.value;
}
addedreasononChange(evt:any){
let e=this.f.addedreason.value as any;
this.camsassetadditionForm.patchValue({addedreasondesc:evt.options[evt.options.selectedIndex].text});
}
barcodeonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
acquisitionmethodonChange(evt:any){
let e=this.f.acquisitionmethod.value as any;
this.camsassetadditionForm.patchValue({acquisitionmethoddesc:evt.options[evt.options.selectedIndex].text});
}
serialnumberonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.camsassetadditionForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
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
  


editcamsassetadditions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassetadditionservice.getcamsassetadditionsByEID(pkcol).then(res => {

this.camsassetadditionservice.formData=res.camsassetaddition;
let formproperty=res.camsassetaddition.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassetaddition.pkcol;
this.formid=res.camsassetaddition.additionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassetaddition.additionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetadditionForm.patchValue({
additionid: res.camsassetaddition.additionid,
assetid: res.camsassetaddition.assetid,
assetiddesc: res.camsassetaddition.assetiddesc,
currentdate: this.ngbDateParserFormatter.parse(res.camsassetaddition.currentdate),
addedby: res.camsassetaddition.addedby,
addedbydesc: res.camsassetaddition.addedbydesc,
additiondate: this.ngbDateParserFormatter.parse(res.camsassetaddition.additiondate),
accountdate: this.ngbDateParserFormatter.parse(res.camsassetaddition.accountdate),
amount: res.camsassetaddition.amount,
addedservicelife: res.camsassetaddition.addedservicelife,
addedshelflife: res.camsassetaddition.addedshelflife,
addedreason: res.camsassetaddition.addedreason,
addedreasondesc: res.camsassetaddition.addedreasondesc,
barcode: res.camsassetaddition.barcode,
itemid: res.camsassetaddition.itemid,
itemiddesc: res.camsassetaddition.itemiddesc,
description: res.camsassetaddition.description,
acquisitionmethod: res.camsassetaddition.acquisitionmethod,
acquisitionmethoddesc: res.camsassetaddition.acquisitionmethoddesc,
serialnumber: res.camsassetaddition.serialnumber,
expirydate: this.ngbDateParserFormatter.parse(res.camsassetaddition.expirydate),
uom: res.camsassetaddition.uom,
uomdesc: res.camsassetaddition.uomdesc,
quantity: res.camsassetaddition.quantity,
notes: JSON.parse(res.camsassetaddition.notes),
poid: res.camsassetaddition.poid,
poiddesc: res.camsassetaddition.poiddesc,
remarks: JSON.parse(res.camsassetaddition.remarks),
customfield: res.camsassetaddition.customfield,
attachment: JSON.parse(res.camsassetaddition.attachment),
status: res.camsassetaddition.status,
statusdesc: res.camsassetaddition.statusdesc,
});
if(this.camsassetadditionForm.get('customfield').value!=null && this.camsassetadditionForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetadditionForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetadditionForm.get('attachment').value!=null && this.camsassetadditionForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassetadditionForm.get('attachment').value);
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
  for (let key in this.camsassetadditionForm.controls) {
    if (this.camsassetadditionForm.controls[key] != null) {
if(false)
{
if(this.camsassetadditionservice.formData!=null && this.camsassetadditionservice.formData[key]!=null  && this.camsassetadditionservice.formData[key]!='[]' && this.camsassetadditionservice.formData[key]!=undefined && this.camsassetadditionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassetadditionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassetadditionservice.formData!=null && this.camsassetadditionservice.formData[key]!=null   && this.camsassetadditionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassetadditionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassetadditionservice.formData!=null && this.camsassetadditionservice.formData[key]!=null   && this.camsassetadditionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassetadditionservice.formData[key]+"'><div class='progress__number'>"+this.camsassetadditionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetadditionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetadditionForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetadditionForm.value;
obj.currentdate=new Date(this.camsassetadditionForm.get('currentdate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('currentdate').value)+'  UTC' :null);
obj.additiondate=new Date(this.camsassetadditionForm.get('additiondate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('additiondate').value)+'  UTC' :null);
obj.accountdate=new Date(this.camsassetadditionForm.get('accountdate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('accountdate').value)+'  UTC' :null);
obj.expirydate=new Date(this.camsassetadditionForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('expirydate').value)+'  UTC' :null);
if(this.camsassetadditionForm.get('notes').value!=null)obj.notes=JSON.stringify(this.camsassetadditionForm.get('notes').value);
if(this.camsassetadditionForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsassetadditionForm.get('remarks').value);
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

private camsassetadditiontoggleOption(){
this.camsassetadditionshowOption = this.camsassetadditionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetadditionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetadditionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetadditionForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetadditionservice.formData=this.camsassetadditionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetadditionForm.controls[key] != null)
    {
        this.camsassetadditionservice.formData[key] = this.camsassetadditionForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetadditionservice.formData.currentdate=new Date(this.camsassetadditionForm.get('currentdate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('currentdate').value)+'  UTC' :null);
this.camsassetadditionservice.formData.additiondate=new Date(this.camsassetadditionForm.get('additiondate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('additiondate').value)+'  UTC' :null);
this.camsassetadditionservice.formData.accountdate=new Date(this.camsassetadditionForm.get('accountdate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('accountdate').value)+'  UTC' :null);
this.camsassetadditionservice.formData.expirydate=new Date(this.camsassetadditionForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.camsassetadditionForm.get('expirydate').value)+'  UTC' :null);
if(this.camsassetadditionForm.get('notes').value!=null)this.camsassetadditionservice.formData.notes=JSON.stringify(this.camsassetadditionForm.get('notes').value);
if(this.camsassetadditionForm.get('remarks').value!=null)this.camsassetadditionservice.formData.remarks=JSON.stringify(this.camsassetadditionForm.get('remarks').value);
if(customfields!=null)this.camsassetadditionservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassetadditionservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetadditionservice.formData);
this.camsassetadditionservice.formData=this.camsassetadditionForm.value;
this.camsassetadditionservice.saveOrUpdatecamsassetadditions().subscribe(
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
this.dialogRef.close((res as any).camsassetaddition);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetadditionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetaddition);
}
else
{
this.FillData(res);
}
}
this.camsassetadditionForm.markAsUntouched();
this.camsassetadditionForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsassetadditionForm.get('assetid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaddedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsassetadditionForm.get('addedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.camsassetadditionForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.camsassetadditionForm.get('poid').value, ScreenType:2 }
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



