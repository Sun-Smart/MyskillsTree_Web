import { erpsupplierpackingmasterService } from './../../../service/erpsupplierpackingmaster.service';
import { erpsupplierpackingmaster } from './../../../model/erpsupplierpackingmaster.model';
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
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
//detail table services
import { erpsupplierpackingdetail } from './../../../model/erpsupplierpackingdetail.model';
import { erpsupplierpackingdetailComponent } from './../../../pages/forms/erpsupplierpackingdetail/erpsupplierpackingdetail.component';
//FK services
import { erpsupplierpackingdetailService } from './../../../service/erpsupplierpackingdetail.service';
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
selector: 'app-erpsupplierpackingmaster',
templateUrl: './erpsupplierpackingmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierpackingmasterComponent implements OnInit {
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
bfilterPopulateerpsupplierpackingmasters:boolean=false;
dataerpsupplierpackingmasterspoid3:any=[];
dataerpsupplierpackingmasterssupplierpkgid3:any=[];
dataerpsupplierpackingmastersbranchid3:any=[];
dataerpsupplierpackingmastersshipmode3:any=[];
dataerpsupplierpackingdetailspoid3:any=[];
dataerpsupplierpackingdetailssupplierpkgid3:any=[];
dataerpsupplierpackingdetailssupplierpkgdetailid3:any=[];
bfilterPopulateerpsupplierpackingdetails:boolean=false;
@ViewChild('tblerpsupplierpackingdetailssource',{static:false}) tblerpsupplierpackingdetailssource: Ng2SmartTableComponent;
 erpsupplierpackingmasterForm: FormGroup;
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
supplierpkgidList: erpsupplierpackingmaster[];
supplierpkgidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierpkgid_erpsupplierpackingmastersForm: FormGroup;//autocomplete
supplierpkgid_erpsupplierpackingmastersoptions:any;//autocomplete
supplierpkgid_erpsupplierpackingmastersformatter:any;//autocomplete
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
shipmodeList: boconfigvalue[];
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
erpsupplierpackingmastershowOption:boolean;
erpsupplierpackingdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsupplierpackingdetailsvisiblelist:any;
erpsupplierpackingdetailshidelist:any;

DeletederpsupplierpackingdetailIDs: string="";
erpsupplierpackingdetailsID: string = "1";
erpsupplierpackingdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplierpackingmasterservice: erpsupplierpackingmasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erpsupplierpackingdetailservice: erpsupplierpackingdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
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
this.erpsupplierpackingmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
poid: [null],
poiddesc: [null],
supplierpkgid: [null],
supplierpkgiddesc: [null],
branchid: [null],
branchiddesc: [null],
packinglotnumber: [null],
totalpieces: [null],
shipmode: [null],
shipmodedesc: [null],
shippingcompany: [null],
airwaybillnumber: [null],
bookingdate: [null],
expecteddeliveryby: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierpackingmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierpackingmasterForm.dirty && this.erpsupplierpackingmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplierpkgid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplierpkgid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplierpkgid && pkDetail) {
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
let erpsupplierpackingmasterid = null;

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
this.formid=erpsupplierpackingmasterid;
//this.sharedService.alert(erpsupplierpackingmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsupplierpackingdetailsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierpackingdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erpsupplierpackingmasterservice.formData && this.erpsupplierpackingmasterservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erpsupplierpackingmasterForm.patchValue({
    poid: this.erpsupplierpackingmasterservice.formData.poid,
    poiddesc: this.erpsupplierpackingmasterservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erpsupplierpackingmasterForm.get('poid').value);
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
this.erpsupplierpackingmasterservice.geterpsupplierpackingmastersList().then(res => 
{
this.supplierpkgidList = res as erpsupplierpackingmaster[];
if(this.erpsupplierpackingmasterservice.formData && this.erpsupplierpackingmasterservice.formData.supplierpkgid){
this.supplierpkgidoptionsEvent.emit(this.supplierpkgidList);
this.erpsupplierpackingmasterForm.patchValue({
    supplierpkgid: this.erpsupplierpackingmasterservice.formData.supplierpkgid,
    supplierpkgiddesc: this.erpsupplierpackingmasterservice.formData.supplierpkgiddesc,
});
}
{
let arrsupplierpkgid = this.supplierpkgidList.filter(v => v.supplierpkgid == this.erpsupplierpackingmasterForm.get('supplierpkgid').value);
let objsupplierpkgid;
if (arrsupplierpkgid.length > 0) objsupplierpkgid = arrsupplierpkgid[0];
if (objsupplierpkgid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierpkgid_erpsupplierpackingmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierpkgidList.filter(v => v.packinglotnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierpkgid_erpsupplierpackingmastersformatter = (result: any) => result.packinglotnumber;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpsupplierpackingmasterservice.formData && this.erpsupplierpackingmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpsupplierpackingmasterForm.patchValue({
    branchid: this.erpsupplierpackingmasterservice.formData.branchid,
    branchiddesc: this.erpsupplierpackingmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpsupplierpackingmasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("shippingmode").then(res => this.shipmodeList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierpackingmasterservice.geterpsupplierpackingmastersList().then(res => {
      this.pkList = res as erpsupplierpackingmaster[];
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
this.erpsupplierpackingmasterForm.markAsUntouched();
this.erpsupplierpackingmasterForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erpsupplierpackingmasterForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierpkgid(supplierpkgidDetail: any) {
if (supplierpkgidDetail.supplierpkgid && supplierpkgidDetail) {
this.erpsupplierpackingmasterForm.patchValue({
supplierpkgid: supplierpkgidDetail.supplierpkgid,
supplierpkgiddesc: supplierpkgidDetail.packinglotnumber,

});

}
}

onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpsupplierpackingmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.erpsupplierpackingmasterForm != null)
this.erpsupplierpackingmasterForm.reset();
this.erpsupplierpackingmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erpsupplierpackingmasterservice.erpsupplierpackingdetails=[];
this.erpsupplierpackingdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplierpkgid = this.erpsupplierpackingmasterForm.get('supplierpkgid').value;
        if(supplierpkgid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierpackingmasterservice.deleteerpsupplierpackingmaster(supplierpkgid).then(res =>
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
    this.erpsupplierpackingmasterForm.patchValue({
        supplierpkgid: null
    });
    if(this.erpsupplierpackingmasterservice.formData.supplierpkgid!=null)this.erpsupplierpackingmasterservice.formData.supplierpkgid=null;
for (let i=0;i<this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.length;i++) {
this.erpsupplierpackingmasterservice.erpsupplierpackingdetails[i].supplierpkgdetailid=null;
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
        else if(key=="bookingdate")
this.erpsupplierpackingmasterForm.patchValue({"bookingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expecteddeliveryby")
this.erpsupplierpackingmasterForm.patchValue({"expecteddeliveryby":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsupplierpackingmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierpackingmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierpackingmasterForm.controls[key]!=undefined)
{
this.erpsupplierpackingmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpsupplierpackingmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
poidonChange(evt:any){
let e=evt.value;
}
supplierpkgidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
packinglotnumberonChange(evt:any){
let e=evt.value;
}
totalpiecesonChange(evt:any){
let e=evt.value;
}
shipmodeonChange(evt:any){
let e=this.f.shipmode.value as any;
this.erpsupplierpackingmasterForm.patchValue({shipmodedesc:evt.options[evt.options.selectedIndex].text});
}
shippingcompanyonChange(evt:any){
let e=evt.value;
}
airwaybillnumberonChange(evt:any){
let e=evt.value;
}
bookingdateonChange(evt:any){
let e=evt.value;
}
expecteddeliverybyonChange(evt:any){
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
  


editerpsupplierpackingmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierpackingmasterservice.geterpsupplierpackingmastersByEID(pkcol).then(res => {

this.erpsupplierpackingmasterservice.formData=res.erpsupplierpackingmaster;
let formproperty=res.erpsupplierpackingmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierpackingmaster.pkcol;
this.formid=res.erpsupplierpackingmaster.supplierpkgid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierpackingmaster.supplierpkgid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierpackingmasterForm.patchValue({
poid: res.erpsupplierpackingmaster.poid,
poiddesc: res.erpsupplierpackingmaster.poiddesc,
supplierpkgid: res.erpsupplierpackingmaster.supplierpkgid,
supplierpkgiddesc: res.erpsupplierpackingmaster.supplierpkgiddesc,
branchid: res.erpsupplierpackingmaster.branchid,
branchiddesc: res.erpsupplierpackingmaster.branchiddesc,
packinglotnumber: res.erpsupplierpackingmaster.packinglotnumber,
totalpieces: res.erpsupplierpackingmaster.totalpieces,
shipmode: res.erpsupplierpackingmaster.shipmode,
shipmodedesc: res.erpsupplierpackingmaster.shipmodedesc,
shippingcompany: res.erpsupplierpackingmaster.shippingcompany,
airwaybillnumber: res.erpsupplierpackingmaster.airwaybillnumber,
bookingdate: this.ngbDateParserFormatter.parse(res.erpsupplierpackingmaster.bookingdate),
expecteddeliveryby: this.ngbDateParserFormatter.parse(res.erpsupplierpackingmaster.expecteddeliveryby),
customfield: res.erpsupplierpackingmaster.customfield,
attachment: JSON.parse(res.erpsupplierpackingmaster.attachment),
status: res.erpsupplierpackingmaster.status,
statusdesc: res.erpsupplierpackingmaster.statusdesc,
});
this.erpsupplierpackingdetailsvisiblelist=res.erpsupplierpackingdetailsvisiblelist;
if(this.erpsupplierpackingmasterForm.get('customfield').value!=null && this.erpsupplierpackingmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpsupplierpackingmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpsupplierpackingmasterForm.get('attachment').value!=null && this.erpsupplierpackingmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpsupplierpackingmasterForm.get('attachment').value);
//Child Tables if any
this.erpsupplierpackingmasterservice.erpsupplierpackingdetails = res.erpsupplierpackingdetails;
this.SeterpsupplierpackingdetailsTableConfig();
this.erpsupplierpackingdetailsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierpackingdetailsTableddConfig();
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
  for (let key in this.erpsupplierpackingmasterForm.controls) {
    if (this.erpsupplierpackingmasterForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierpackingmasterservice.formData!=null && this.erpsupplierpackingmasterservice.formData[key]!=null  && this.erpsupplierpackingmasterservice.formData[key]!='[]' && this.erpsupplierpackingmasterservice.formData[key]!=undefined && this.erpsupplierpackingmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierpackingmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierpackingmasterservice.formData!=null && this.erpsupplierpackingmasterservice.formData[key]!=null   && this.erpsupplierpackingmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierpackingmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierpackingmasterservice.formData!=null && this.erpsupplierpackingmasterservice.formData[key]!=null   && this.erpsupplierpackingmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierpackingmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierpackingmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierpackingmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierpackingmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpsupplierpackingmasterForm.value;
obj.bookingdate=new Date(this.erpsupplierpackingmasterForm.get('bookingdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierpackingmasterForm.get('bookingdate').value)+'  UTC' :null);
obj.expecteddeliveryby=new Date(this.erpsupplierpackingmasterForm.get('expecteddeliveryby').value ? this.ngbDateParserFormatter.format(this.erpsupplierpackingmasterForm.get('expecteddeliveryby').value)+'  UTC' :null);
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

private erpsupplierpackingmastertoggleOption(){
this.erpsupplierpackingmastershowOption = this.erpsupplierpackingmastershowOption === true ? false : true;
}

private erpsupplierpackingdetailtoggleOption(){
this.erpsupplierpackingdetailshowOption = this.erpsupplierpackingdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierpackingmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierpackingmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierpackingmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierpackingmasterservice.formData=this.erpsupplierpackingmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierpackingmasterForm.controls[key] != null)
    {
        this.erpsupplierpackingmasterservice.formData[key] = this.erpsupplierpackingmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpsupplierpackingmasterservice.formData.bookingdate=new Date(this.erpsupplierpackingmasterForm.get('bookingdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierpackingmasterForm.get('bookingdate').value)+'  UTC' :null);
this.erpsupplierpackingmasterservice.formData.expecteddeliveryby=new Date(this.erpsupplierpackingmasterForm.get('expecteddeliveryby').value ? this.ngbDateParserFormatter.format(this.erpsupplierpackingmasterForm.get('expecteddeliveryby').value)+'  UTC' :null);
if(customfields!=null)this.erpsupplierpackingmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpsupplierpackingmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpsupplierpackingmasterservice.formData.DeletederpsupplierpackingdetailIDs = this.DeletederpsupplierpackingdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpsupplierpackingmasterservice.formData);
this.erpsupplierpackingmasterservice.formData=this.erpsupplierpackingmasterForm.value;
this.erpsupplierpackingmasterservice.saveOrUpdateerpsupplierpackingmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpsupplierpackingdetailssource.data)
{
    for (let i = 0; i < this.erpsupplierpackingdetailssource.data.length; i++)
    {
        if (this.erpsupplierpackingdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierpackingdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierpackingmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingmaster);
}
else
{
this.FillData(res);
}
}
this.erpsupplierpackingmasterForm.markAsUntouched();
this.erpsupplierpackingmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erpsupplierpackingmasterForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierpkgid( supplierpkgid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierpackingmasterComponent, 
{
data: {supplierpkgid:this.erpsupplierpackingmasterForm.get('supplierpkgid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpsupplierpackingmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsupplierpackingdetail(event:any,supplierpkgdetailid:any, supplierpkgid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierpackingdetailComponent, 
{
data:  {  showview:false,save:false,event,supplierpkgdetailid, supplierpkgid,visiblelist:this.erpsupplierpackingdetailsvisiblelist,  hidelist:this.erpsupplierpackingdetailshidelist,ScreenType:2,poid:this.erpsupplierpackingmasterForm.get('poid').value,poiddesc:this.erpsupplierpackingmasterForm.get('poiddesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierpackingdetailssource.add(res);
this.erpsupplierpackingdetailssource.refresh();
}
else
{
this.erpsupplierpackingdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierpackingdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierpackingdetailIDs += childID + ",";
this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsupplierpackingdetails
erpsupplierpackingdetailssettings:any;
erpsupplierpackingdetailssource: any;

showerpsupplierpackingdetailsCheckbox()
{
debugger;
if(this.tblerpsupplierpackingdetailssource.settings['selectMode']== 'multi')this.tblerpsupplierpackingdetailssource.settings['selectMode']= 'single';
else
this.tblerpsupplierpackingdetailssource.settings['selectMode']= 'multi';
this.tblerpsupplierpackingdetailssource.initGrid();
}
deleteerpsupplierpackingdetailsAll()
{
this.tblerpsupplierpackingdetailssource.settings['selectMode'] = 'single';
}
showerpsupplierpackingdetailsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierpackingdetailsTableddConfig();
  });
      if(this.tblerpsupplierpackingdetailssource.settings!=null)this.tblerpsupplierpackingdetailssource.settings['hideSubHeader'] =!this.tblerpsupplierpackingdetailssource.settings['hideSubHeader'];
this.tblerpsupplierpackingdetailssource.initGrid();
}
showerpsupplierpackingdetailsInActive()
{
}
enableerpsupplierpackingdetailsInActive()
{
}
async SeterpsupplierpackingdetailsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierpackingdetails){

this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res=>
{
var datapoid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsupplierpackingdetailspoid3.push(defaultobj);
for(let i=0; i<datapoid2.length; i++){
var obj= { value: datapoid2[i].poid, title:datapoid2[i].ponumber};
this.dataerpsupplierpackingdetailspoid3.push(obj);
}
if((this.tblerpsupplierpackingdetailssource.settings as any).columns['poid'])
{
(this.tblerpsupplierpackingdetailssource.settings as any).columns['poid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsupplierpackingdetailspoid3));
this.tblerpsupplierpackingdetailssource.initGrid();
}
});

this.erpsupplierpackingmasterservice.geterpsupplierpackingmastersList().then(res=>
{
var datasupplierpkgid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsupplierpackingdetailssupplierpkgid3.push(defaultobj);
for(let i=0; i<datasupplierpkgid2.length; i++){
var obj= { value: datasupplierpkgid2[i].supplierpkgid, title:datasupplierpkgid2[i].packinglotnumber};
this.dataerpsupplierpackingdetailssupplierpkgid3.push(obj);
}
if((this.tblerpsupplierpackingdetailssource.settings as any).columns['supplierpkgid'])
{
(this.tblerpsupplierpackingdetailssource.settings as any).columns['supplierpkgid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsupplierpackingdetailssupplierpkgid3));
this.tblerpsupplierpackingdetailssource.initGrid();
}
});

this.erpsupplierpackingdetailservice.geterpsupplierpackingdetailsList().then(res=>
{
var datasupplierpkgdetailid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsupplierpackingdetailssupplierpkgdetailid3.push(defaultobj);
for(let i=0; i<datasupplierpkgdetailid2.length; i++){
var obj= { value: datasupplierpkgdetailid2[i].supplierpkgdetailid, title:datasupplierpkgdetailid2[i].cartonnumber};
this.dataerpsupplierpackingdetailssupplierpkgdetailid3.push(obj);
}
if((this.tblerpsupplierpackingdetailssource.settings as any).columns['supplierpkgdetailid'])
{
(this.tblerpsupplierpackingdetailssource.settings as any).columns['supplierpkgdetailid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsupplierpackingdetailssupplierpkgdetailid3));
this.tblerpsupplierpackingdetailssource.initGrid();
}
});
}
this.bfilterPopulateerpsupplierpackingdetails=true;
}
async erpsupplierpackingdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierpackingdetailsTableConfig()
{
this.erpsupplierpackingdetailssettings = {
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
cartonnumber: {
title: 'Carton Number',
type: '',
filter:true,
},
dimension: {
title: 'Dimension',
type: '',
filter:true,
},
weight: {
title: 'Weight',
type: '',
filter:true,
},
},
};
}
erpsupplierpackingdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpackingdetailsID)>=0)
{
this.erpsupplierpackingdetailssource=new LocalDataSource();
this.erpsupplierpackingdetailssource.load(this.erpsupplierpackingmasterservice.erpsupplierpackingdetails as  any as LocalDataSource);
this.erpsupplierpackingdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierpackingdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.length == 0)
{
    this.tblerpsupplierpackingdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierpackingdetail();
    this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.push(obj);
    this.erpsupplierpackingdetailssource.refresh();
    if ((this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.length / this.erpsupplierpackingdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierpackingdetailssource.getPaging().page)
    {
        this.erpsupplierpackingdetailssource.setPage((this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.length / this.erpsupplierpackingdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierpackingdetailssource.grid.edit(this.tblerpsupplierpackingdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierpackingdetailssource.data.indexOf(event.data);
this.onDeleteerpsupplierpackingdetail(event,event.data.supplierpkgdetailid,((this.erpsupplierpackingdetailssource.getPaging().page-1) *this.erpsupplierpackingdetailssource.getPaging().perPage)+index);
this.erpsupplierpackingdetailssource.refresh();
break;
}
}

*/
erpsupplierpackingdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierpackingdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierpackingdetail(event,event.data.supplierpkgdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierpackingdetail(event,event.data.supplierpkgdetailid,((this.erpsupplierpackingdetailssource.getPaging().page-1) *this.erpsupplierpackingdetailssource.getPaging().perPage)+event.index);
this.erpsupplierpackingdetailssource.refresh();
break;
}
}
erpsupplierpackingdetailsonDelete(obj) {
let supplierpkgdetailid=obj.data.supplierpkgdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierpackingmasterservice.deleteerpsupplierpackingmaster(supplierpkgdetailid).then(res=>
this.erpsupplierpackingdetailsLoadTable()
);
}
}
erpsupplierpackingdetailsPaging(val)
{
debugger;
this.erpsupplierpackingdetailssource.setPaging(1, val, true);
}

handleerpsupplierpackingdetailsGridSelected(event:any) {
this.erpsupplierpackingdetailsselectedindex=this.erpsupplierpackingmasterservice.erpsupplierpackingdetails.findIndex(i => i.supplierpkgdetailid === event.data.supplierpkgdetailid);
}
IserpsupplierpackingdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpackingdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierpackingdetails

}



