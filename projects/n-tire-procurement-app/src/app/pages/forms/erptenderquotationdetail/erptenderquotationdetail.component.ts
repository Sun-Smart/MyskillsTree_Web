import { erptenderquotationdetailService } from './../../../service/erptenderquotationdetail.service';
import { erptenderquotationdetail } from './../../../model/erptenderquotationdetail.model';
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
import { erpsupplierquotationmaster} from './../../../model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from './../../../pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erptaxmaster} from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
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
selector: 'app-erptenderquotationdetail',
templateUrl: './erptenderquotationdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptenderquotationdetailComponent implements OnInit {
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
bfilterPopulateerptenderquotationdetails:boolean=false;
dataerptenderquotationdetailsquotationid3:any=[];
dataerptenderquotationdetailsitemid3:any=[];
dataerptenderquotationdetailsuom3:any=[];
dataerptenderquotationdetailscurrency3:any=[];
dataerptenderquotationdetailstax1name3:any=[];
dataerptenderquotationdetailstax2name3:any=[];
dataerptenderquotationdetailsbasecurrency3:any=[];
dataerptenderquotationdetailspaymenttermtype3:any=[];
 erptenderquotationdetailForm: FormGroup;
quotationidList: erpsupplierquotationmaster[];
quotationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
quotationid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
quotationid_erpsupplierquotationmastersoptions:any;//autocomplete
quotationid_erpsupplierquotationmastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
tax1nameList: erptaxmaster[];
tax2nameList: erptaxmaster[];
basecurrencyList: boconfigvalue[];
paymenttermtypeList: boconfigvalue[];
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
erptenderquotationdetailshowOption:boolean;
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
private erptenderquotationdetailservice: erptenderquotationdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpsupplierquotationmasterservice:erpsupplierquotationmasterService,
private erpitemmasterservice:erpitemmasterService,
private erptaxmasterservice:erptaxmasterService,
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
this.erptenderquotationdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
tenderid: [null],
quotationid: [null],
quotationiddesc: [null],
quotationdetailid: [null],
itemid: [null],
itemiddesc: [null],
itemdescription: [null],
supplierproductcode: [null],
supplierproductname: [null],
supplierproductdescription: [null],
supplierproductbrand: [null],
supplierproducturl: [null],
uom: [null],
uomdesc: [null],
quantity: [null],
currency: [null],
currencydesc: [null],
unitprice: [null],
tax1name: [null],
tax1namedesc: [null],
tax1value: [null],
tax2name: [null],
tax2namedesc: [null],
tax2value: [null],
othercharges: [null],
totalquotevalue: [null],
basecurrency: [null],
basecurrencydesc: [null],
basevalue: [null],
expecteddelivery: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
offerquantity1: [null],
unitprice1: [null],
totalcost1: [null],
offerquantity2: [null],
unitprice2: [null],
totalcost2: [null],
offerquantity3: [null],
unitprice3: [null],
totalcost3: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
discountpercent: [null],
});
}

get f() { return this.erptenderquotationdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptenderquotationdetailForm.dirty && this.erptenderquotationdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.quotationdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.quotationdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.quotationdetailid && pkDetail) {
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
let erptenderquotationdetailid = null;

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
this.formid=erptenderquotationdetailid;
//this.sharedService.alert(erptenderquotationdetailid);

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
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quotationidList = res as erpsupplierquotationmaster[];
if(this.erptenderquotationdetailservice.formData && this.erptenderquotationdetailservice.formData.quotationid){
this.quotationidoptionsEvent.emit(this.quotationidList);
this.erptenderquotationdetailForm.patchValue({
    quotationid: this.erptenderquotationdetailservice.formData.quotationid,
    quotationiddesc: this.erptenderquotationdetailservice.formData.quotationiddesc,
});
}
{
let arrquotationid = this.quotationidList.filter(v => v.quotationid == this.erptenderquotationdetailForm.get('quotationid').value);
let objquotationid;
if (arrquotationid.length > 0) objquotationid = arrquotationid[0];
if (objquotationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.quotationid_erpsupplierquotationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.quotationidList.filter(v => v.quotationreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.quotationid_erpsupplierquotationmastersformatter = (result: any) => result.quotationreference;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erptenderquotationdetailservice.formData && this.erptenderquotationdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erptenderquotationdetailForm.patchValue({
    itemid: this.erptenderquotationdetailservice.formData.itemid,
    itemiddesc: this.erptenderquotationdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erptenderquotationdetailForm.get('itemid').value);
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
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax1nameList = res as erptaxmaster[];
{
let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erptenderquotationdetailForm.get('tax1name').value);
let objtax1name;
if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
if (objtax1name)
{
    this.erptenderquotationdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
{
let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erptenderquotationdetailForm.get('tax2name').value);
let objtax2name;
if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
if (objtax2name)
{
    this.erptenderquotationdetailForm.patchValue({ tax1value: objtax2name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.configservice.getList("currencyid").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.configservice.getList("paymenttermtype").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.erptenderquotationdetailservice.geterptenderquotationdetailsList().then(res => {
      this.pkList = res as erptenderquotationdetail[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.itemdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.itemdescription;

//setting the flag that the screen is not touched 
this.erptenderquotationdetailForm.markAsUntouched();
this.erptenderquotationdetailForm.markAsPristine();
}
onSelectedquotationid(quotationidDetail: any) {
if (quotationidDetail.quotationid && quotationidDetail) {
this.erptenderquotationdetailForm.patchValue({
quotationid: quotationidDetail.quotationid,
quotationiddesc: quotationidDetail.quotationreference,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erptenderquotationdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}




resetForm() {
if (this.erptenderquotationdetailForm != null)
this.erptenderquotationdetailForm.reset();
this.erptenderquotationdetailForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let quotationdetailid = this.erptenderquotationdetailForm.get('quotationdetailid').value;
        if(quotationdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptenderquotationdetailservice.deleteerptenderquotationdetail(quotationdetailid).then(res =>
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
    this.erptenderquotationdetailForm.patchValue({
        quotationdetailid: null
    });
    if(this.erptenderquotationdetailservice.formData.quotationdetailid!=null)this.erptenderquotationdetailservice.formData.quotationdetailid=null;
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
        else if(key=="expecteddelivery")
this.erptenderquotationdetailForm.patchValue({"expecteddelivery":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erptenderquotationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptenderquotationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptenderquotationdetailForm.controls[key]!=undefined)
{
this.erptenderquotationdetailForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erptenderquotationdetails",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erptenderquotationdetailservice.formData.itemdescription!=null )
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
tenderidonChange(evt:any){
let e=evt.value;
}
quotationidonChange(evt:any){
let e=evt.value;
}
quotationdetailidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
supplierproductcodeonChange(evt:any){
let e=evt.value;
}
supplierproductnameonChange(evt:any){
let e=evt.value;
}
supplierproductdescriptiononChange(evt:any){
let e=evt.value;
}
supplierproductbrandonChange(evt:any){
let e=evt.value;
}
supplierproducturlonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erptenderquotationdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erptenderquotationdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erptenderquotationdetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
this.erptenderquotationdetailForm.patchValue({tax1value:this.tax1nameList[evt.options.selectedIndex].taxpercentage});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erptenderquotationdetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
this.erptenderquotationdetailForm.patchValue({tax1value:this.tax2nameList[evt.options.selectedIndex].taxpercentage});
}
tax2valueonChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
totalquotevalueonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.erptenderquotationdetailForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
basevalueonChange(evt:any){
let e=evt.value;
}
expecteddeliveryonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.erptenderquotationdetailForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
offerquantity1onChange(evt:any){
let e=evt.value;
}
unitprice1onChange(evt:any){
let e=evt.value;
}
totalcost1onChange(evt:any){
let e=evt.value;
}
offerquantity2onChange(evt:any){
let e=evt.value;
}
unitprice2onChange(evt:any){
let e=evt.value;
}
totalcost2onChange(evt:any){
let e=evt.value;
}
offerquantity3onChange(evt:any){
let e=evt.value;
}
unitprice3onChange(evt:any){
let e=evt.value;
}
totalcost3onChange(evt:any){
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
discountpercentonChange(evt:any){
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
  


editerptenderquotationdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptenderquotationdetailservice.geterptenderquotationdetailsByEID(pkcol).then(res => {

this.erptenderquotationdetailservice.formData=res.erptenderquotationdetail;
let formproperty=res.erptenderquotationdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptenderquotationdetail.pkcol;
this.formid=res.erptenderquotationdetail.quotationdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptenderquotationdetail.quotationdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptenderquotationdetailForm.patchValue({
tenderid: res.erptenderquotationdetail.tenderid,
quotationid: res.erptenderquotationdetail.quotationid,
quotationiddesc: res.erptenderquotationdetail.quotationiddesc,
quotationdetailid: res.erptenderquotationdetail.quotationdetailid,
itemid: res.erptenderquotationdetail.itemid,
itemiddesc: res.erptenderquotationdetail.itemiddesc,
itemdescription: res.erptenderquotationdetail.itemdescription,
supplierproductcode: res.erptenderquotationdetail.supplierproductcode,
supplierproductname: res.erptenderquotationdetail.supplierproductname,
supplierproductdescription: res.erptenderquotationdetail.supplierproductdescription,
supplierproductbrand: res.erptenderquotationdetail.supplierproductbrand,
supplierproducturl: res.erptenderquotationdetail.supplierproducturl,
uom: res.erptenderquotationdetail.uom,
uomdesc: res.erptenderquotationdetail.uomdesc,
quantity: res.erptenderquotationdetail.quantity,
currency: res.erptenderquotationdetail.currency,
currencydesc: res.erptenderquotationdetail.currencydesc,
unitprice: res.erptenderquotationdetail.unitprice,
tax1name: res.erptenderquotationdetail.tax1name,
tax1namedesc: res.erptenderquotationdetail.tax1namedesc,
tax1value: res.erptenderquotationdetail.tax1value,
tax2name: res.erptenderquotationdetail.tax2name,
tax2namedesc: res.erptenderquotationdetail.tax2namedesc,
tax2value: res.erptenderquotationdetail.tax2value,
othercharges: res.erptenderquotationdetail.othercharges,
totalquotevalue: res.erptenderquotationdetail.totalquotevalue,
basecurrency: res.erptenderquotationdetail.basecurrency,
basecurrencydesc: res.erptenderquotationdetail.basecurrencydesc,
basevalue: res.erptenderquotationdetail.basevalue,
expecteddelivery: this.ngbDateParserFormatter.parse(res.erptenderquotationdetail.expecteddelivery),
paymenttermtype: res.erptenderquotationdetail.paymenttermtype,
paymenttermtypedesc: res.erptenderquotationdetail.paymenttermtypedesc,
offerquantity1: res.erptenderquotationdetail.offerquantity1,
unitprice1: res.erptenderquotationdetail.unitprice1,
totalcost1: res.erptenderquotationdetail.totalcost1,
offerquantity2: res.erptenderquotationdetail.offerquantity2,
unitprice2: res.erptenderquotationdetail.unitprice2,
totalcost2: res.erptenderquotationdetail.totalcost2,
offerquantity3: res.erptenderquotationdetail.offerquantity3,
unitprice3: res.erptenderquotationdetail.unitprice3,
totalcost3: res.erptenderquotationdetail.totalcost3,
remarks: res.erptenderquotationdetail.remarks,
customfield: res.erptenderquotationdetail.customfield,
attachment: JSON.parse(res.erptenderquotationdetail.attachment),
status: res.erptenderquotationdetail.status,
statusdesc: res.erptenderquotationdetail.statusdesc,
discountpercent: res.erptenderquotationdetail.discountpercent,
});
if(this.erptenderquotationdetailForm.get('customfield').value!=null && this.erptenderquotationdetailForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erptenderquotationdetailForm.get('customfield').value);
this.FillCustomField();
if(this.erptenderquotationdetailForm.get('attachment').value!=null && this.erptenderquotationdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erptenderquotationdetailForm.get('attachment').value);
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
  for (let key in this.erptenderquotationdetailForm.controls) {
    if (this.erptenderquotationdetailForm.controls[key] != null) {
if(false)
{
if(this.erptenderquotationdetailservice.formData!=null && this.erptenderquotationdetailservice.formData[key]!=null  && this.erptenderquotationdetailservice.formData[key]!='[]' && this.erptenderquotationdetailservice.formData[key]!=undefined && this.erptenderquotationdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptenderquotationdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptenderquotationdetailservice.formData!=null && this.erptenderquotationdetailservice.formData[key]!=null   && this.erptenderquotationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptenderquotationdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptenderquotationdetailservice.formData!=null && this.erptenderquotationdetailservice.formData[key]!=null   && this.erptenderquotationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptenderquotationdetailservice.formData[key]+"'><div class='progress__number'>"+this.erptenderquotationdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderquotationdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptenderquotationdetailForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erptenderquotationdetailForm.value;
obj.expecteddelivery=new Date(this.erptenderquotationdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erptenderquotationdetailForm.get('expecteddelivery').value)+'  UTC' :null);
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

private erptenderquotationdetailtoggleOption(){
this.erptenderquotationdetailshowOption = this.erptenderquotationdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptenderquotationdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptenderquotationdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptenderquotationdetailForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptenderquotationdetailservice.formData=this.erptenderquotationdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptenderquotationdetailForm.controls[key] != null)
    {
        this.erptenderquotationdetailservice.formData[key] = this.erptenderquotationdetailForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erptenderquotationdetailservice.formData.expecteddelivery=new Date(this.erptenderquotationdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erptenderquotationdetailForm.get('expecteddelivery').value)+'  UTC' :null);
if(customfields!=null)this.erptenderquotationdetailservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erptenderquotationdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erptenderquotationdetailservice.formData);
this.erptenderquotationdetailservice.formData=this.erptenderquotationdetailForm.value;
this.erptenderquotationdetailservice.saveOrUpdateerptenderquotationdetails().subscribe(
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
this.dialogRef.close((res as any).erptenderquotationdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptenderquotationdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptenderquotationdetail);
}
else
{
this.FillData(res);
}
}
this.erptenderquotationdetailForm.markAsUntouched();
this.erptenderquotationdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditquotationid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erptenderquotationdetailForm.get('quotationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erptenderquotationdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erptenderquotationdetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erptenderquotationdetailForm.get('tax2name').value, ScreenType:2 }
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



