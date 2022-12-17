import { erpsupplierinvoicedetailService } from './../../../service/erpsupplierinvoicedetail.service';
import { erpsupplierinvoicedetail } from './../../../model/erpsupplierinvoicedetail.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erpsupplierinvoice} from './../../../model/erpsupplierinvoice.model';
import { erpsupplierinvoiceComponent } from './../../../pages/forms/erpsupplierinvoice/erpsupplierinvoice.component';
import { erpsupplierinvoiceService } from './../../../service/erpsupplierinvoice.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erptaxmaster} from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
//popups
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//popups
import { erpgoodsreceiptmaster} from './../../../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from './../../../pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
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
selector: 'app-erpsupplierinvoicedetail',
templateUrl: './erpsupplierinvoicedetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierinvoicedetailComponent implements OnInit {
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
bfilterPopulateerpsupplierinvoicedetails:boolean=false;
dataerpsupplierinvoicedetailssupplierid3:any=[];
dataerpsupplierinvoicedetailsinvoiceid3:any=[];
dataerpsupplierinvoicedetailsitemid3:any=[];
dataerpsupplierinvoicedetailsuom3:any=[];
dataerpsupplierinvoicedetailscurrency3:any=[];
dataerpsupplierinvoicedetailstax1name3:any=[];
dataerpsupplierinvoicedetailstax2name3:any=[];
dataerpsupplierinvoicedetailsbasecurrency3:any=[];
dataerpsupplierinvoicedetailspoid3:any=[];
dataerpsupplierinvoicedetailsgrnno3:any=[];
 erpsupplierinvoicedetailForm: FormGroup;
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
invoiceidList: erpsupplierinvoice[];
invoiceidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
invoiceid_erpsupplierinvoicesForm: FormGroup;//autocomplete
invoiceid_erpsupplierinvoicesoptions:any;//autocomplete
invoiceid_erpsupplierinvoicesformatter:any;//autocomplete
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
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
grnnoList: erpgoodsreceiptmaster[];
grnnooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnno_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnno_erpgoodsreceiptmastersoptions:any;//autocomplete
grnno_erpgoodsreceiptmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierinvoicedetailshowOption:boolean;
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
private erpsupplierinvoicedetailservice: erpsupplierinvoicedetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpsupplierinvoiceservice:erpsupplierinvoiceService,
private erpitemmasterservice:erpitemmasterService,
private erptaxmasterservice:erptaxmasterService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erpgoodsreceiptmasterservice:erpgoodsreceiptmasterService,
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
this.erpsupplierinvoicedetailForm  = this.fb.group({
pk:[null],
supplierid: [null],
supplieriddesc: [null],
invoiceid: [null],
invoiceiddesc: [null],
invoicedetailid: [null],
itemid: [null],
itemiddesc: [null],
itemdescription: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
unitprice: [null],
discountpercent: [null],
tax1name: [null],
tax1namedesc: [null],
tax1value: [null],
tax2name: [null],
tax2namedesc: [null],
tax2value: [null],
othercharges: [null],
totalvalue: [null],
basecurrency: [null],
basecurrencydesc: [null],
basevalue: [null],
poid: [null],
poiddesc: [null],
suppliersoreference: [null],
grnno: [null],
grnnodesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierinvoicedetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierinvoicedetailForm.dirty && this.erpsupplierinvoicedetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.invoicedetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.invoicedetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.invoicedetailid && pkDetail) {
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
let erpsupplierinvoicedetailid = null;

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
this.formid=erpsupplierinvoicedetailid;
//this.sharedService.alert(erpsupplierinvoicedetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplierinvoicedetailservice.formData && this.erpsupplierinvoicedetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplierinvoicedetailForm.patchValue({
    supplierid: this.erpsupplierinvoicedetailservice.formData.supplierid,
    supplieriddesc: this.erpsupplierinvoicedetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplierinvoicedetailForm.get('supplierid').value);
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
this.erpsupplierinvoiceservice.geterpsupplierinvoicesList().then(res => 
{
this.invoiceidList = res as erpsupplierinvoice[];
if(this.erpsupplierinvoicedetailservice.formData && this.erpsupplierinvoicedetailservice.formData.invoiceid){
this.invoiceidoptionsEvent.emit(this.invoiceidList);
this.erpsupplierinvoicedetailForm.patchValue({
    invoiceid: this.erpsupplierinvoicedetailservice.formData.invoiceid,
    invoiceiddesc: this.erpsupplierinvoicedetailservice.formData.invoiceiddesc,
});
}
{
let arrinvoiceid = this.invoiceidList.filter(v => v.invoiceid == this.erpsupplierinvoicedetailForm.get('invoiceid').value);
let objinvoiceid;
if (arrinvoiceid.length > 0) objinvoiceid = arrinvoiceid[0];
if (objinvoiceid)
{
}
}
}
).catch((err) => {console.log(err);});
this.invoiceid_erpsupplierinvoicesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.invoiceidList.filter(v => v.invoicenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.invoiceid_erpsupplierinvoicesformatter = (result: any) => result.invoicenumber;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpsupplierinvoicedetailservice.formData && this.erpsupplierinvoicedetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpsupplierinvoicedetailForm.patchValue({
    itemid: this.erpsupplierinvoicedetailservice.formData.itemid,
    itemiddesc: this.erpsupplierinvoicedetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpsupplierinvoicedetailForm.get('itemid').value);
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
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erpsupplierinvoicedetailservice.formData && this.erpsupplierinvoicedetailservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erpsupplierinvoicedetailForm.patchValue({
    poid: this.erpsupplierinvoicedetailservice.formData.poid,
    poiddesc: this.erpsupplierinvoicedetailservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erpsupplierinvoicedetailForm.get('poid').value);
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
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => 
{
this.grnnoList = res as erpgoodsreceiptmaster[];
if(this.erpsupplierinvoicedetailservice.formData && this.erpsupplierinvoicedetailservice.formData.grnno){
this.grnnooptionsEvent.emit(this.grnnoList);
this.erpsupplierinvoicedetailForm.patchValue({
    grnno: this.erpsupplierinvoicedetailservice.formData.grnno,
    grnnodesc: this.erpsupplierinvoicedetailservice.formData.grnnodesc,
});
}
{
let arrgrnno = this.grnnoList.filter(v => v.grnid == this.erpsupplierinvoicedetailForm.get('grnno').value);
let objgrnno;
if (arrgrnno.length > 0) objgrnno = arrgrnno[0];
if (objgrnno)
{
}
}
}
).catch((err) => {console.log(err);});
this.grnno_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnnoList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnno_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;

//autocomplete
    this.erpsupplierinvoicedetailservice.geterpsupplierinvoicedetailsList().then(res => {
      this.pkList = res as erpsupplierinvoicedetail[];
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
this.erpsupplierinvoicedetailForm.markAsUntouched();
this.erpsupplierinvoicedetailForm.markAsPristine();
}
onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplierinvoicedetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedinvoiceid(invoiceidDetail: any) {
if (invoiceidDetail.invoiceid && invoiceidDetail) {
this.erpsupplierinvoicedetailForm.patchValue({
invoiceid: invoiceidDetail.invoiceid,
invoiceiddesc: invoiceidDetail.invoicenumber,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpsupplierinvoicedetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erpsupplierinvoicedetailForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedgrnno(grnnoDetail: any) {
if (grnnoDetail.grnid && grnnoDetail) {
this.erpsupplierinvoicedetailForm.patchValue({
grnno: grnnoDetail.grnid,
grnnodesc: grnnoDetail.grnnumber,

});

}
}




resetForm() {
if (this.erpsupplierinvoicedetailForm != null)
this.erpsupplierinvoicedetailForm.reset();
this.erpsupplierinvoicedetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let invoicedetailid = this.erpsupplierinvoicedetailForm.get('invoicedetailid').value;
        if(invoicedetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierinvoicedetailservice.deleteerpsupplierinvoicedetail(invoicedetailid).then(res =>
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
    this.erpsupplierinvoicedetailForm.patchValue({
        invoicedetailid: null
    });
    if(this.erpsupplierinvoicedetailservice.formData.invoicedetailid!=null)this.erpsupplierinvoicedetailservice.formData.invoicedetailid=null;
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
this.erpsupplierinvoicedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierinvoicedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierinvoicedetailForm.controls[key]!=undefined)
{
this.erpsupplierinvoicedetailForm.controls[key].disable({onlySelf: true});
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
supplieridonChange(evt:any){
let e=evt.value;
}
invoiceidonChange(evt:any){
let e=evt.value;
}
invoicedetailidonChange(evt:any){
let e=evt.value;
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
this.erpsupplierinvoicedetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpsupplierinvoicedetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erpsupplierinvoicedetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erpsupplierinvoicedetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
}
tax2valueonChange(evt:any){
let e=evt.value;
}
otherchargesonChange(evt:any){
let e=evt.value;
}
totalvalueonChange(evt:any){
let e=evt.value;
}
basecurrencyonChange(evt:any){
let e=this.f.basecurrency.value as any;
this.erpsupplierinvoicedetailForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
basevalueonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
let e=evt.value;
}
suppliersoreferenceonChange(evt:any){
let e=evt.value;
}
grnnoonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierinvoicedetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierinvoicedetailservice.geterpsupplierinvoicedetailsByEID(pkcol).then(res => {

this.erpsupplierinvoicedetailservice.formData=res.erpsupplierinvoicedetail;
let formproperty=res.erpsupplierinvoicedetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierinvoicedetail.pkcol;
this.formid=res.erpsupplierinvoicedetail.invoicedetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierinvoicedetail.invoicedetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierinvoicedetailForm.patchValue({
supplierid: res.erpsupplierinvoicedetail.supplierid,
supplieriddesc: res.erpsupplierinvoicedetail.supplieriddesc,
invoiceid: res.erpsupplierinvoicedetail.invoiceid,
invoiceiddesc: res.erpsupplierinvoicedetail.invoiceiddesc,
invoicedetailid: res.erpsupplierinvoicedetail.invoicedetailid,
itemid: res.erpsupplierinvoicedetail.itemid,
itemiddesc: res.erpsupplierinvoicedetail.itemiddesc,
itemdescription: res.erpsupplierinvoicedetail.itemdescription,
quantity: res.erpsupplierinvoicedetail.quantity,
uom: res.erpsupplierinvoicedetail.uom,
uomdesc: res.erpsupplierinvoicedetail.uomdesc,
currency: res.erpsupplierinvoicedetail.currency,
currencydesc: res.erpsupplierinvoicedetail.currencydesc,
unitprice: res.erpsupplierinvoicedetail.unitprice,
discountpercent: res.erpsupplierinvoicedetail.discountpercent,
tax1name: res.erpsupplierinvoicedetail.tax1name,
tax1namedesc: res.erpsupplierinvoicedetail.tax1namedesc,
tax1value: res.erpsupplierinvoicedetail.tax1value,
tax2name: res.erpsupplierinvoicedetail.tax2name,
tax2namedesc: res.erpsupplierinvoicedetail.tax2namedesc,
tax2value: res.erpsupplierinvoicedetail.tax2value,
othercharges: res.erpsupplierinvoicedetail.othercharges,
totalvalue: res.erpsupplierinvoicedetail.totalvalue,
basecurrency: res.erpsupplierinvoicedetail.basecurrency,
basecurrencydesc: res.erpsupplierinvoicedetail.basecurrencydesc,
basevalue: res.erpsupplierinvoicedetail.basevalue,
poid: res.erpsupplierinvoicedetail.poid,
poiddesc: res.erpsupplierinvoicedetail.poiddesc,
suppliersoreference: res.erpsupplierinvoicedetail.suppliersoreference,
grnno: res.erpsupplierinvoicedetail.grnno,
grnnodesc: res.erpsupplierinvoicedetail.grnnodesc,
remarks: res.erpsupplierinvoicedetail.remarks,
status: res.erpsupplierinvoicedetail.status,
statusdesc: res.erpsupplierinvoicedetail.statusdesc,
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
  for (let key in this.erpsupplierinvoicedetailForm.controls) {
    if (this.erpsupplierinvoicedetailForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierinvoicedetailservice.formData!=null && this.erpsupplierinvoicedetailservice.formData[key]!=null  && this.erpsupplierinvoicedetailservice.formData[key]!='[]' && this.erpsupplierinvoicedetailservice.formData[key]!=undefined && this.erpsupplierinvoicedetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierinvoicedetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierinvoicedetailservice.formData!=null && this.erpsupplierinvoicedetailservice.formData[key]!=null   && this.erpsupplierinvoicedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierinvoicedetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierinvoicedetailservice.formData!=null && this.erpsupplierinvoicedetailservice.formData[key]!=null   && this.erpsupplierinvoicedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierinvoicedetailservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierinvoicedetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierinvoicedetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierinvoicedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierinvoicedetailForm.value;
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

private erpsupplierinvoicedetailtoggleOption(){
this.erpsupplierinvoicedetailshowOption = this.erpsupplierinvoicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierinvoicedetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierinvoicedetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierinvoicedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierinvoicedetailservice.formData=this.erpsupplierinvoicedetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierinvoicedetailForm.controls[key] != null)
    {
        this.erpsupplierinvoicedetailservice.formData[key] = this.erpsupplierinvoicedetailForm.controls[key].value;
    }
}
}
}
console.log(this.erpsupplierinvoicedetailservice.formData);
this.erpsupplierinvoicedetailservice.formData=this.erpsupplierinvoicedetailForm.value;
this.erpsupplierinvoicedetailservice.saveOrUpdateerpsupplierinvoicedetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierinvoicedetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierinvoicedetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierinvoicedetail);
}
else
{
this.FillData(res);
}
}
this.erpsupplierinvoicedetailForm.markAsUntouched();
this.erpsupplierinvoicedetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplierinvoicedetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditinvoiceid( invoiceid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierinvoiceComponent, 
{
data: {invoiceid:this.erpsupplierinvoicedetailForm.get('invoiceid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpsupplierinvoicedetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplierinvoicedetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplierinvoicedetailForm.get('tax2name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erpsupplierinvoicedetailForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditgrnno( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.erpsupplierinvoicedetailForm.get('grnno').value, ScreenType:2 }
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



