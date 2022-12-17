import { erpmaterialrequestdetailService } from './../../../service/erpmaterialrequestdetail.service';
import { erpmaterialrequestdetail } from './../../../model/erpmaterialrequestdetail.model';
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
import { erpmaterialrequest} from './../../../model/erpmaterialrequest.model';
import { erpmaterialrequestComponent } from './../../../pages/forms/erpmaterialrequest/erpmaterialrequest.component';
import { erpmaterialrequestService } from './../../../service/erpmaterialrequest.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erplocationmaster} from './../../../model/erplocationmaster.model';
import { erplocationmasterComponent } from './../../../pages/forms/erplocationmaster/erplocationmaster.component';
import { erplocationmasterService } from './../../../service/erplocationmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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
selector: 'app-erpmaterialrequestdetail',
templateUrl: './erpmaterialrequestdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpmaterialrequestdetailComponent implements OnInit {
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
CustomFormField:string="itemsubcategory";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulateerpmaterialrequestdetails:boolean=false;
dataerpmaterialrequestdetailsmrsid3:any=[];
dataerpmaterialrequestdetailsitemcategory3:any=[];
dataerpmaterialrequestdetailsitemsubcategory3:any=[];
dataerpmaterialrequestdetailsitemid3:any=[];
dataerpmaterialrequestdetailsuom3:any=[];
dataerpmaterialrequestdetailswarehouseid3:any=[];
dataerpmaterialrequestdetailssupplierid3:any=[];
 erpmaterialrequestdetailForm: FormGroup;
mrsidList: erpmaterialrequest[];
mrsidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
mrsid_erpmaterialrequestsForm: FormGroup;//autocomplete
mrsid_erpmaterialrequestsoptions:any;//autocomplete
mrsid_erpmaterialrequestsformatter:any;//autocomplete
itemcategoryList: bomasterdata[];
itemsubcategoryList: bosubcategorymaster[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
warehouseidList: erplocationmaster[];
warehouseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
warehouseid_erplocationmastersForm: FormGroup;//autocomplete
warehouseid_erplocationmastersoptions:any;//autocomplete
warehouseid_erplocationmastersformatter:any;//autocomplete
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
erpmaterialrequestdetailshowOption:boolean;
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
private erpmaterialrequestdetailservice: erpmaterialrequestdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpmaterialrequestservice:erpmaterialrequestService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private erpitemmasterservice:erpitemmasterService,
private erplocationmasterservice:erplocationmasterService,
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
this.erpmaterialrequestdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
mrsid: [null],
mrsiddesc: [null],
mrsdetailid: [null],
itemcategory: [null],
itemcategorydesc: [null],
itemsubcategory: [null],
itemsubcategorydesc: [null],
itemid: [null],
itemiddesc: [null],
itemdescription: [null, Validators.required],
quantity: [null, Validators.required],
uom: [null],
uomdesc: [null],
warehouseid: [null],
warehouseiddesc: [null],
itemcost: [null],
supplierid: [null],
supplieriddesc: [null],
mrsremarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpmaterialrequestdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpmaterialrequestdetailForm.dirty && this.erpmaterialrequestdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.mrsdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.mrsdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.mrsdetailid && pkDetail) {
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
let erpmaterialrequestdetailid = null;

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
this.formid=erpmaterialrequestdetailid;
//this.sharedService.alert(erpmaterialrequestdetailid);

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
this.erpmaterialrequestservice.geterpmaterialrequestsList().then(res => 
{
this.mrsidList = res as erpmaterialrequest[];
if(this.erpmaterialrequestdetailservice.formData && this.erpmaterialrequestdetailservice.formData.mrsid){
this.mrsidoptionsEvent.emit(this.mrsidList);
this.erpmaterialrequestdetailForm.patchValue({
    mrsid: this.erpmaterialrequestdetailservice.formData.mrsid,
    mrsiddesc: this.erpmaterialrequestdetailservice.formData.mrsiddesc,
});
}
{
let arrmrsid = this.mrsidList.filter(v => v.mrsid == this.erpmaterialrequestdetailForm.get('mrsid').value);
let objmrsid;
if (arrmrsid.length > 0) objmrsid = arrmrsid[0];
if (objmrsid)
{
}
}
}
).catch((err) => {console.log(err);});
this.mrsid_erpmaterialrequestsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.mrsidList.filter(v => v.mrscode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.mrsid_erpmaterialrequestsformatter = (result: any) => result.mrscode;
this.bomasterdataservice.getList("rs8fd").then(res => {
this.itemcategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res =>{
this.itemsubcategoryList = res as bosubcategorymaster[];
if(this.erpmaterialrequestdetailservice.formData && this.erpmaterialrequestdetailservice.formData.itemsubcategory){this.erpmaterialrequestdetailForm.patchValue({
    itemsubcategory: this.erpmaterialrequestdetailservice.formData.itemsubcategory,
    itemsubcategorydesc: this.erpmaterialrequestdetailservice.formData.itemsubcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res =>{
this.itemidList = res as erpitemmaster[];
if(this.erpmaterialrequestdetailservice.formData && this.erpmaterialrequestdetailservice.formData.itemid){this.erpmaterialrequestdetailForm.patchValue({
    itemid: this.erpmaterialrequestdetailservice.formData.itemid,
    itemiddesc: this.erpmaterialrequestdetailservice.formData.itemiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.erplocationmasterservice.geterplocationmastersList().then(res => 
{
this.warehouseidList = res as erplocationmaster[];
if(this.erpmaterialrequestdetailservice.formData && this.erpmaterialrequestdetailservice.formData.warehouseid){
this.warehouseidoptionsEvent.emit(this.warehouseidList);
this.erpmaterialrequestdetailForm.patchValue({
    warehouseid: this.erpmaterialrequestdetailservice.formData.warehouseid,
    warehouseiddesc: this.erpmaterialrequestdetailservice.formData.warehouseiddesc,
});
}
{
let arrwarehouseid = this.warehouseidList.filter(v => v.locationid == this.erpmaterialrequestdetailForm.get('warehouseid').value);
let objwarehouseid;
if (arrwarehouseid.length > 0) objwarehouseid = arrwarehouseid[0];
if (objwarehouseid)
{
}
}
}
).catch((err) => {console.log(err);});
this.warehouseid_erplocationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.warehouseidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.warehouseid_erplocationmastersformatter = (result: any) => result.locationname;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpmaterialrequestdetailservice.formData && this.erpmaterialrequestdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpmaterialrequestdetailForm.patchValue({
    supplierid: this.erpmaterialrequestdetailservice.formData.supplierid,
    supplieriddesc: this.erpmaterialrequestdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpmaterialrequestdetailForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
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
    this.erpmaterialrequestdetailservice.geterpmaterialrequestdetailsList().then(res => {
      this.pkList = res as erpmaterialrequestdetail[];
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
this.erpmaterialrequestdetailForm.markAsUntouched();
this.erpmaterialrequestdetailForm.markAsPristine();
}
onSelectedmrsid(mrsidDetail: any) {
if (mrsidDetail.mrsid && mrsidDetail) {
this.erpmaterialrequestdetailForm.patchValue({
mrsid: mrsidDetail.mrsid,
mrsiddesc: mrsidDetail.mrscode,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpmaterialrequestdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedwarehouseid(warehouseidDetail: any) {
if (warehouseidDetail.locationid && warehouseidDetail) {
this.erpmaterialrequestdetailForm.patchValue({
warehouseid: warehouseidDetail.locationid,
warehouseiddesc: warehouseidDetail.locationname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpmaterialrequestdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}




resetForm() {
if (this.erpmaterialrequestdetailForm != null)
this.erpmaterialrequestdetailForm.reset();
this.erpmaterialrequestdetailForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let mrsdetailid = this.erpmaterialrequestdetailForm.get('mrsdetailid').value;
        if(mrsdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpmaterialrequestdetailservice.deleteerpmaterialrequestdetail(mrsdetailid).then(res =>
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
    this.erpmaterialrequestdetailForm.patchValue({
        mrsdetailid: null
    });
    if(this.erpmaterialrequestdetailservice.formData.mrsdetailid!=null)this.erpmaterialrequestdetailservice.formData.mrsdetailid=null;
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
this.erpmaterialrequestdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpmaterialrequestdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpmaterialrequestdetailForm.controls[key]!=undefined)
{
this.erpmaterialrequestdetailForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservicelist=await this.customfieldservice.getcustomfieldconfigurationsByTable("erpmaterialrequestdetails",this.CustomFormName,this.CustomFormField,this.erpmaterialrequestdetailForm.get(this.CustomFormField).value,this.customfieldjson).then(res=>{
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
mrsidonChange(evt:any){
let e=evt.value;
}
mrsdetailidonChange(evt:any){
let e=evt.value;
}
itemcategoryonChange(evt:any){
let e=evt.value;
this.erpmaterialrequestdetailForm.patchValue({itemcategorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res => this.itemsubcategoryList = res as bosubcategorymaster[]);
});
}
itemsubcategoryonChange(evt:any){
let e=evt.value;
this.FillCustomField();
this.erpmaterialrequestdetailForm.patchValue({itemsubcategorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res => this.itemidList = res as erpitemmaster[]);
});
}
itemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpmaterialrequestdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
warehouseidonChange(evt:any){
let e=evt.value;
}
itemcostonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
mrsremarksonChange(evt:any){
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
  


editerpmaterialrequestdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpmaterialrequestdetailservice.geterpmaterialrequestdetailsByEID(pkcol).then(res => {

this.erpmaterialrequestdetailservice.formData=res.erpmaterialrequestdetail;
let formproperty=res.erpmaterialrequestdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpmaterialrequestdetail.pkcol;
this.formid=res.erpmaterialrequestdetail.mrsdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpmaterialrequestdetail.mrsdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpmaterialrequestdetailForm.patchValue({
mrsid: res.erpmaterialrequestdetail.mrsid,
mrsiddesc: res.erpmaterialrequestdetail.mrsiddesc,
mrsdetailid: res.erpmaterialrequestdetail.mrsdetailid,
itemcategory: res.erpmaterialrequestdetail.itemcategory,
itemcategorydesc: res.erpmaterialrequestdetail.itemcategorydesc,
itemsubcategory: res.erpmaterialrequestdetail.itemsubcategory,
itemsubcategorydesc: res.erpmaterialrequestdetail.itemsubcategorydesc,
itemid: res.erpmaterialrequestdetail.itemid,
itemiddesc: res.erpmaterialrequestdetail.itemiddesc,
itemdescription: res.erpmaterialrequestdetail.itemdescription,
quantity: res.erpmaterialrequestdetail.quantity,
uom: res.erpmaterialrequestdetail.uom,
uomdesc: res.erpmaterialrequestdetail.uomdesc,
warehouseid: res.erpmaterialrequestdetail.warehouseid,
warehouseiddesc: res.erpmaterialrequestdetail.warehouseiddesc,
itemcost: res.erpmaterialrequestdetail.itemcost,
supplierid: res.erpmaterialrequestdetail.supplierid,
supplieriddesc: res.erpmaterialrequestdetail.supplieriddesc,
mrsremarks: res.erpmaterialrequestdetail.mrsremarks,
customfield: res.erpmaterialrequestdetail.customfield,
attachment: JSON.parse(res.erpmaterialrequestdetail.attachment),
status: res.erpmaterialrequestdetail.status,
statusdesc: res.erpmaterialrequestdetail.statusdesc,
});
if(this.erpmaterialrequestdetailForm.get('customfield').value!=null && this.erpmaterialrequestdetailForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpmaterialrequestdetailForm.get('customfield').value);
this.FillCustomField();
if(this.erpmaterialrequestdetailForm.get('attachment').value!=null && this.erpmaterialrequestdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpmaterialrequestdetailForm.get('attachment').value);
setTimeout(() => {
if(this.f.itemcategory.value && this.f.itemcategory.value!="" && this.f.itemcategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.itemcategory.value).then(res =>{
this.itemsubcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.itemsubcategory.value && this.f.itemsubcategory.value!="" && this.f.itemsubcategory.value!=null)this.erpitemmasterservice.getListBysubcategory(this.f.itemsubcategory.value).then(res =>{
this.itemidList = res as erpitemmaster[];
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
  for (let key in this.erpmaterialrequestdetailForm.controls) {
    if (this.erpmaterialrequestdetailForm.controls[key] != null) {
if(false)
{
if(this.erpmaterialrequestdetailservice.formData!=null && this.erpmaterialrequestdetailservice.formData[key]!=null  && this.erpmaterialrequestdetailservice.formData[key]!='[]' && this.erpmaterialrequestdetailservice.formData[key]!=undefined && this.erpmaterialrequestdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpmaterialrequestdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpmaterialrequestdetailservice.formData!=null && this.erpmaterialrequestdetailservice.formData[key]!=null   && this.erpmaterialrequestdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpmaterialrequestdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpmaterialrequestdetailservice.formData!=null && this.erpmaterialrequestdetailservice.formData[key]!=null   && this.erpmaterialrequestdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpmaterialrequestdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpmaterialrequestdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpmaterialrequestdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpmaterialrequestdetailForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpmaterialrequestdetailForm.value;
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

private erpmaterialrequestdetailtoggleOption(){
this.erpmaterialrequestdetailshowOption = this.erpmaterialrequestdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpmaterialrequestdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpmaterialrequestdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpmaterialrequestdetailForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpmaterialrequestdetailservice.formData=this.erpmaterialrequestdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpmaterialrequestdetailForm.controls[key] != null)
    {
        this.erpmaterialrequestdetailservice.formData[key] = this.erpmaterialrequestdetailForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(customfields!=null)this.erpmaterialrequestdetailservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpmaterialrequestdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpmaterialrequestdetailservice.formData);
this.erpmaterialrequestdetailservice.formData=this.erpmaterialrequestdetailForm.value;
this.erpmaterialrequestdetailservice.saveOrUpdateerpmaterialrequestdetails().subscribe(
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
this.dialogRef.close((res as any).erpmaterialrequestdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpmaterialrequestdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpmaterialrequestdetail);
}
else
{
this.FillData(res);
}
}
this.erpmaterialrequestdetailForm.markAsUntouched();
this.erpmaterialrequestdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmrsid( mrsid) {
/*let ScreenType='2';
this.dialog.open(erpmaterialrequestComponent, 
{
data: {mrsid:this.erpmaterialrequestdetailForm.get('mrsid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpmaterialrequestdetailForm.get('itemcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpmaterialrequestdetailForm.get('itemsubcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpmaterialrequestdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditwarehouseid( locationid) {
/*let ScreenType='2';
this.dialog.open(erplocationmasterComponent, 
{
data: {locationid:this.erpmaterialrequestdetailForm.get('warehouseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpmaterialrequestdetailForm.get('supplierid').value, ScreenType:2 }
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



