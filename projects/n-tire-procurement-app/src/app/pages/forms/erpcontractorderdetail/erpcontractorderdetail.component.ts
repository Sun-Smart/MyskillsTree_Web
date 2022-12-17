import { erpcontractorderdetailService } from './../../../service/erpcontractorderdetail.service';
import { erpcontractorderdetail } from './../../../model/erpcontractorderdetail.model';
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
import { erpcontractordermaster} from './../../../model/erpcontractordermaster.model';
import { erpcontractordermasterComponent } from './../../../pages/forms/erpcontractordermaster/erpcontractordermaster.component';
import { erpcontractordermasterService } from './../../../service/erpcontractordermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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

@Component({
selector: 'app-erpcontractorderdetail',
templateUrl: './erpcontractorderdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpcontractorderdetailComponent implements OnInit {
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
bfilterPopulateerpcontractorderdetails:boolean=false;
dataerpcontractorderdetailscontractid3:any=[];
dataerpcontractorderdetailssupplierid3:any=[];
dataerpcontractorderdetailsdetailtype3:any=[];
dataerpcontractorderdetailsitemid3:any=[];
dataerpcontractorderdetailsuom3:any=[];
dataerpcontractorderdetailscurrency3:any=[];
dataerpcontractorderdetailsdiscounttype3:any=[];
dataerpcontractorderdetailstax1name3:any=[];
dataerpcontractorderdetailstax2name3:any=[];
dataerpcontractorderdetailsbasecurrency3:any=[];
dataerpcontractorderdetailspaymenttermtype3:any=[];
 erpcontractorderdetailForm: FormGroup;
contractidList: erpcontractordermaster[];
contractidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractid_erpcontractordermastersForm: FormGroup;//autocomplete
contractid_erpcontractordermastersoptions:any;//autocomplete
contractid_erpcontractordermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
detailtypeList: boconfigvalue[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
discounttypeList: boconfigvalue[];
tax1nameList: erptaxmaster[];
tax2nameList: erptaxmaster[];
basecurrencyList: boconfigvalue[];
paymenttermtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpcontractorderdetailshowOption:boolean;
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
private erpcontractorderdetailservice: erpcontractorderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpcontractordermasterservice:erpcontractordermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpitemmasterservice:erpitemmasterService,
private erptaxmasterservice:erptaxmasterService,
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
this.erpcontractorderdetailForm  = this.fb.group({
pk:[null],
contractid: [null],
contractiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
versionnumber: [null],
contractdetailid: [null],
detailtype: [null, Validators.required],
detailtypedesc: [null],
itemid: [null, Validators.required],
itemiddesc: [null],
service: [null],
quantity: [null, Validators.required],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
unitprice: [null, Validators.required],
discountpercent: [null],
discounttype: [null],
discounttypedesc: [null],
saleprice: [null],
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
size: [null],
color: [null],
weight: [null],
expecteddelivery: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
notes: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpcontractorderdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpcontractorderdetailForm.dirty && this.erpcontractorderdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.contractdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.contractdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.contractdetailid && pkDetail) {
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
let erpcontractorderdetailid = null;

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
this.formid=erpcontractorderdetailid;
//this.sharedService.alert(erpcontractorderdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.contractidList = res as erpcontractordermaster[];
if(this.erpcontractorderdetailservice.formData && this.erpcontractorderdetailservice.formData.contractid){
this.contractidoptionsEvent.emit(this.contractidList);
this.erpcontractorderdetailForm.patchValue({
    contractid: this.erpcontractorderdetailservice.formData.contractid,
    contractiddesc: this.erpcontractorderdetailservice.formData.contractiddesc,
});
}
{
let arrcontractid = this.contractidList.filter(v => v.contractid == this.erpcontractorderdetailForm.get('contractid').value);
let objcontractid;
if (arrcontractid.length > 0) objcontractid = arrcontractid[0];
if (objcontractid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contractid_erpcontractordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contractidList.filter(v => v.contractname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contractid_erpcontractordermastersformatter = (result: any) => result.contractname;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpcontractorderdetailservice.formData && this.erpcontractorderdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpcontractorderdetailForm.patchValue({
    supplierid: this.erpcontractorderdetailservice.formData.supplierid,
    supplieriddesc: this.erpcontractorderdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpcontractorderdetailForm.get('supplierid').value);
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
this.configservice.getList("detailtype").then(res => this.detailtypeList = res as boconfigvalue[]);
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpcontractorderdetailservice.formData && this.erpcontractorderdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpcontractorderdetailForm.patchValue({
    itemid: this.erpcontractorderdetailservice.formData.itemid,
    itemiddesc: this.erpcontractorderdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpcontractorderdetailForm.get('itemid').value);
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
this.configservice.getList("discounttype").then(res => this.discounttypeList = res as boconfigvalue[]);
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax1nameList = res as erptaxmaster[];
{
let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erpcontractorderdetailForm.get('tax1name').value);
let objtax1name;
if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
if (objtax1name)
{
    this.erpcontractorderdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
{
let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erpcontractorderdetailForm.get('tax2name').value);
let objtax2name;
if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
if (objtax2name)
{
    this.erpcontractorderdetailForm.patchValue({ tax1value: objtax2name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.configservice.getList("currencyid").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.erpcontractorderdetailservice.geterpcontractorderdetailsList().then(res => {
      this.pkList = res as erpcontractorderdetail[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.service.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.service;

//setting the flag that the screen is not touched 
this.erpcontractorderdetailForm.markAsUntouched();
this.erpcontractorderdetailForm.markAsPristine();
}
onSelectedcontractid(contractidDetail: any) {
if (contractidDetail.contractid && contractidDetail) {
this.erpcontractorderdetailForm.patchValue({
contractid: contractidDetail.contractid,
contractiddesc: contractidDetail.contractname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpcontractorderdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpcontractorderdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}




resetForm() {
if (this.erpcontractorderdetailForm != null)
this.erpcontractorderdetailForm.reset();
this.erpcontractorderdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let contractdetailid = this.erpcontractorderdetailForm.get('contractdetailid').value;
        if(contractdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpcontractorderdetailservice.deleteerpcontractorderdetail(contractdetailid).then(res =>
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
    this.erpcontractorderdetailForm.patchValue({
        contractdetailid: null
    });
    if(this.erpcontractorderdetailservice.formData.contractdetailid!=null)this.erpcontractorderdetailservice.formData.contractdetailid=null;
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
this.erpcontractorderdetailForm.patchValue({"expecteddelivery":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpcontractorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpcontractorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpcontractorderdetailForm.controls[key]!=undefined)
{
this.erpcontractorderdetailForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erpcontractorderdetailservice.formData.service!=null )
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
contractidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
contractdetailidonChange(evt:any){
let e=evt.value;
}
detailtypeonChange(evt:any){
let e=this.f.detailtype.value as any;
this.erpcontractorderdetailForm.patchValue({detailtypedesc:evt.options[evt.options.selectedIndex].text});
}
itemidonChange(evt:any){
let e=evt.value;
}
serviceonChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpcontractorderdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpcontractorderdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
discounttypeonChange(evt:any){
let e=this.f.discounttype.value as any;
this.erpcontractorderdetailForm.patchValue({discounttypedesc:evt.options[evt.options.selectedIndex].text});
}
salepriceonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erpcontractorderdetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
this.erpcontractorderdetailForm.patchValue({tax1value:this.tax1nameList[evt.options.selectedIndex].taxpercentage});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erpcontractorderdetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
this.erpcontractorderdetailForm.patchValue({tax1value:this.tax2nameList[evt.options.selectedIndex].taxpercentage});
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
this.erpcontractorderdetailForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
basevalueonChange(evt:any){
let e=evt.value;
}
sizeonChange(evt:any){
let e=evt.value;
}
coloronChange(evt:any){
let e=evt.value;
}
weightonChange(evt:any){
let e=evt.value;
}
expecteddeliveryonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.erpcontractorderdetailForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpcontractorderdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpcontractorderdetailservice.geterpcontractorderdetailsByEID(pkcol).then(res => {

this.erpcontractorderdetailservice.formData=res.erpcontractorderdetail;
let formproperty=res.erpcontractorderdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpcontractorderdetail.pkcol;
this.formid=res.erpcontractorderdetail.contractdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpcontractorderdetail.contractdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpcontractorderdetailForm.patchValue({
contractid: res.erpcontractorderdetail.contractid,
contractiddesc: res.erpcontractorderdetail.contractiddesc,
supplierid: res.erpcontractorderdetail.supplierid,
supplieriddesc: res.erpcontractorderdetail.supplieriddesc,
versionnumber: res.erpcontractorderdetail.versionnumber,
contractdetailid: res.erpcontractorderdetail.contractdetailid,
detailtype: res.erpcontractorderdetail.detailtype,
detailtypedesc: res.erpcontractorderdetail.detailtypedesc,
itemid: res.erpcontractorderdetail.itemid,
itemiddesc: res.erpcontractorderdetail.itemiddesc,
service: res.erpcontractorderdetail.service,
quantity: res.erpcontractorderdetail.quantity,
uom: res.erpcontractorderdetail.uom,
uomdesc: res.erpcontractorderdetail.uomdesc,
currency: res.erpcontractorderdetail.currency,
currencydesc: res.erpcontractorderdetail.currencydesc,
unitprice: res.erpcontractorderdetail.unitprice,
discountpercent: res.erpcontractorderdetail.discountpercent,
discounttype: res.erpcontractorderdetail.discounttype,
discounttypedesc: res.erpcontractorderdetail.discounttypedesc,
saleprice: res.erpcontractorderdetail.saleprice,
tax1name: res.erpcontractorderdetail.tax1name,
tax1namedesc: res.erpcontractorderdetail.tax1namedesc,
tax1value: res.erpcontractorderdetail.tax1value,
tax2name: res.erpcontractorderdetail.tax2name,
tax2namedesc: res.erpcontractorderdetail.tax2namedesc,
tax2value: res.erpcontractorderdetail.tax2value,
othercharges: res.erpcontractorderdetail.othercharges,
totalquotevalue: res.erpcontractorderdetail.totalquotevalue,
basecurrency: res.erpcontractorderdetail.basecurrency,
basecurrencydesc: res.erpcontractorderdetail.basecurrencydesc,
basevalue: res.erpcontractorderdetail.basevalue,
size: res.erpcontractorderdetail.size,
color: res.erpcontractorderdetail.color,
weight: res.erpcontractorderdetail.weight,
expecteddelivery: this.ngbDateParserFormatter.parse(res.erpcontractorderdetail.expecteddelivery),
paymenttermtype: res.erpcontractorderdetail.paymenttermtype,
paymenttermtypedesc: res.erpcontractorderdetail.paymenttermtypedesc,
notes: res.erpcontractorderdetail.notes,
remarks: res.erpcontractorderdetail.remarks,
status: res.erpcontractorderdetail.status,
statusdesc: res.erpcontractorderdetail.statusdesc,
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
  for (let key in this.erpcontractorderdetailForm.controls) {
    if (this.erpcontractorderdetailForm.controls[key] != null) {
if(false)
{
if(this.erpcontractorderdetailservice.formData!=null && this.erpcontractorderdetailservice.formData[key]!=null  && this.erpcontractorderdetailservice.formData[key]!='[]' && this.erpcontractorderdetailservice.formData[key]!=undefined && this.erpcontractorderdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpcontractorderdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpcontractorderdetailservice.formData!=null && this.erpcontractorderdetailservice.formData[key]!=null   && this.erpcontractorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpcontractorderdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpcontractorderdetailservice.formData!=null && this.erpcontractorderdetailservice.formData[key]!=null   && this.erpcontractorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpcontractorderdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpcontractorderdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpcontractorderdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpcontractorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpcontractorderdetailForm.value;
obj.expecteddelivery=new Date(this.erpcontractorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpcontractorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
console.log(obj);
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

private erpcontractorderdetailtoggleOption(){
this.erpcontractorderdetailshowOption = this.erpcontractorderdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpcontractorderdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpcontractorderdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpcontractorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpcontractorderdetailservice.formData=this.erpcontractorderdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpcontractorderdetailForm.controls[key] != null)
    {
        this.erpcontractorderdetailservice.formData[key] = this.erpcontractorderdetailForm.controls[key].value;
    }
}
}
}
this.erpcontractorderdetailservice.formData.expecteddelivery=new Date(this.erpcontractorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpcontractorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
console.log(this.erpcontractorderdetailservice.formData);
this.erpcontractorderdetailservice.formData=this.erpcontractorderdetailForm.value;
this.erpcontractorderdetailservice.saveOrUpdateerpcontractorderdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractorderdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpcontractorderdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractorderdetail);
}
else
{
this.FillData(res);
}
}
this.erpcontractorderdetailForm.markAsUntouched();
this.erpcontractorderdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcontractid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.erpcontractorderdetailForm.get('contractid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpcontractorderdetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpcontractorderdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpcontractorderdetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpcontractorderdetailForm.get('tax2name').value, ScreenType:2 }
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



