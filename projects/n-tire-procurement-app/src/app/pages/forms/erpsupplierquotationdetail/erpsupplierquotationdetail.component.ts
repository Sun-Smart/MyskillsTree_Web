import { erpsupplierquotationdetailService } from './../../../service/erpsupplierquotationdetail.service';
import { erpsupplierquotationdetail } from './../../../model/erpsupplierquotationdetail.model';
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
import { erprfqmaster} from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
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

@Component({
selector: 'app-erpsupplierquotationdetail',
templateUrl: './erpsupplierquotationdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierquotationdetailComponent implements OnInit {
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
bfilterPopulateerpsupplierquotationdetails:boolean=false;
dataerpsupplierquotationdetailsrfqid3:any=[];
dataerpsupplierquotationdetailssupplierid3:any=[];
dataerpsupplierquotationdetailsquotationid3:any=[];
dataerpsupplierquotationdetailsitemid3:any=[];
dataerpsupplierquotationdetailsuom3:any=[];
dataerpsupplierquotationdetailscurrency3:any=[];
dataerpsupplierquotationdetailstax1name3:any=[];
dataerpsupplierquotationdetailstax2name3:any=[];
dataerpsupplierquotationdetailspaymenttermtype3:any=[];
 erpsupplierquotationdetailForm: FormGroup;
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
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
paymenttermtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierquotationdetailshowOption:boolean;
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
private erpsupplierquotationdetailservice: erpsupplierquotationdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erprfqmasterservice:erprfqmasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpsupplierquotationmasterservice:erpsupplierquotationmasterService,
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
this.erpsupplierquotationdetailForm  = this.fb.group({
pk:[null],
rfqid: [null],
rfqiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
quotationid: [null],
quotationiddesc: [null],
quotationdetailid: [null],
versionnumber: [null],
itemid: [null],
itemiddesc: [null],
uom: [null],
uomdesc: [null],
quantity: [null],
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
totalquotevalue: [null],
basecurrency: [null],
basevalue: [null],
expecteddelivery: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
remarks: [null],
offerquantity1: [null],
unitprice1: [null],
totalcost1: [null],
offerquantity2: [null],
unitprice2: [null],
totalcost2: [null],
offerquantity3: [null],
unitprice3: [null],
totalcost3: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierquotationdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierquotationdetailForm.dirty && this.erpsupplierquotationdetailForm.touched ) {
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
let erpsupplierquotationdetailid = null;

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
this.formid=erpsupplierquotationdetailid;
//this.sharedService.alert(erpsupplierquotationdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erpsupplierquotationdetailservice.formData && this.erpsupplierquotationdetailservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erpsupplierquotationdetailForm.patchValue({
    rfqid: this.erpsupplierquotationdetailservice.formData.rfqid,
    rfqiddesc: this.erpsupplierquotationdetailservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erpsupplierquotationdetailForm.get('rfqid').value);
let objrfqid;
if (arrrfqid.length > 0) objrfqid = arrrfqid[0];
if (objrfqid)
{
}
}
}
).catch((err) => {console.log(err);});
this.rfqid_erprfqmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.rfqidList.filter(v => v.rfqcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.rfqid_erprfqmastersformatter = (result: any) => result.rfqcode;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplierquotationdetailservice.formData && this.erpsupplierquotationdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplierquotationdetailForm.patchValue({
    supplierid: this.erpsupplierquotationdetailservice.formData.supplierid,
    supplieriddesc: this.erpsupplierquotationdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplierquotationdetailForm.get('supplierid').value);
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
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quotationidList = res as erpsupplierquotationmaster[];
if(this.erpsupplierquotationdetailservice.formData && this.erpsupplierquotationdetailservice.formData.quotationid){
this.quotationidoptionsEvent.emit(this.quotationidList);
this.erpsupplierquotationdetailForm.patchValue({
    quotationid: this.erpsupplierquotationdetailservice.formData.quotationid,
    quotationiddesc: this.erpsupplierquotationdetailservice.formData.quotationiddesc,
});
}
{
let arrquotationid = this.quotationidList.filter(v => v.quotationid == this.erpsupplierquotationdetailForm.get('quotationid').value);
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
if(this.erpsupplierquotationdetailservice.formData && this.erpsupplierquotationdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpsupplierquotationdetailForm.patchValue({
    itemid: this.erpsupplierquotationdetailservice.formData.itemid,
    itemiddesc: this.erpsupplierquotationdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpsupplierquotationdetailForm.get('itemid').value);
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
let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erpsupplierquotationdetailForm.get('tax1name').value);
let objtax1name;
if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
if (objtax1name)
{
    this.erpsupplierquotationdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
{
let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erpsupplierquotationdetailForm.get('tax2name').value);
let objtax2name;
if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
if (objtax2name)
{
    this.erpsupplierquotationdetailForm.patchValue({ tax2value: objtax2name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.configservice.getList("paymentterm").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierquotationdetailservice.geterpsupplierquotationdetailsList().then(res => {
      this.pkList = res as erpsupplierquotationdetail[];
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
this.erpsupplierquotationdetailForm.markAsUntouched();
this.erpsupplierquotationdetailForm.markAsPristine();
}
onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erpsupplierquotationdetailForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplierquotationdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedquotationid(quotationidDetail: any) {
if (quotationidDetail.quotationid && quotationidDetail) {
this.erpsupplierquotationdetailForm.patchValue({
quotationid: quotationidDetail.quotationid,
quotationiddesc: quotationidDetail.quotationreference,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpsupplierquotationdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}




resetForm() {
if (this.erpsupplierquotationdetailForm != null)
this.erpsupplierquotationdetailForm.reset();
this.erpsupplierquotationdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let quotationdetailid = this.erpsupplierquotationdetailForm.get('quotationdetailid').value;
        if(quotationdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierquotationdetailservice.deleteerpsupplierquotationdetail(quotationdetailid).then(res =>
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
    this.erpsupplierquotationdetailForm.patchValue({
        quotationdetailid: null
    });
    if(this.erpsupplierquotationdetailservice.formData.quotationdetailid!=null)this.erpsupplierquotationdetailservice.formData.quotationdetailid=null;
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
this.erpsupplierquotationdetailForm.patchValue({"expecteddelivery":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsupplierquotationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierquotationdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierquotationdetailForm.controls[key]!=undefined)
{
this.erpsupplierquotationdetailForm.controls[key].disable({onlySelf: true});
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
rfqidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
quotationidonChange(evt:any){
let e=evt.value;
}
quotationdetailidonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpsupplierquotationdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpsupplierquotationdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erpsupplierquotationdetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
this.erpsupplierquotationdetailForm.patchValue({tax1value:this.tax1nameList[evt.options.selectedIndex].taxpercentage});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erpsupplierquotationdetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
this.erpsupplierquotationdetailForm.patchValue({tax2value:this.tax2nameList[evt.options.selectedIndex].taxpercentage});
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
let e=evt.value;
}
basevalueonChange(evt:any){
let e=evt.value;
}
expecteddeliveryonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.erpsupplierquotationdetailForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
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
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierquotationdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierquotationdetailservice.geterpsupplierquotationdetailsByEID(pkcol).then(res => {

this.erpsupplierquotationdetailservice.formData=res.erpsupplierquotationdetail;
let formproperty=res.erpsupplierquotationdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierquotationdetail.pkcol;
this.formid=res.erpsupplierquotationdetail.quotationdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierquotationdetail.quotationdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierquotationdetailForm.patchValue({
rfqid: res.erpsupplierquotationdetail.rfqid,
rfqiddesc: res.erpsupplierquotationdetail.rfqiddesc,
supplierid: res.erpsupplierquotationdetail.supplierid,
supplieriddesc: res.erpsupplierquotationdetail.supplieriddesc,
quotationid: res.erpsupplierquotationdetail.quotationid,
quotationiddesc: res.erpsupplierquotationdetail.quotationiddesc,
quotationdetailid: res.erpsupplierquotationdetail.quotationdetailid,
versionnumber: res.erpsupplierquotationdetail.versionnumber,
itemid: res.erpsupplierquotationdetail.itemid,
itemiddesc: res.erpsupplierquotationdetail.itemiddesc,
uom: res.erpsupplierquotationdetail.uom,
uomdesc: res.erpsupplierquotationdetail.uomdesc,
quantity: res.erpsupplierquotationdetail.quantity,
currency: res.erpsupplierquotationdetail.currency,
currencydesc: res.erpsupplierquotationdetail.currencydesc,
unitprice: res.erpsupplierquotationdetail.unitprice,
discountpercent: res.erpsupplierquotationdetail.discountpercent,
tax1name: res.erpsupplierquotationdetail.tax1name,
tax1namedesc: res.erpsupplierquotationdetail.tax1namedesc,
tax1value: res.erpsupplierquotationdetail.tax1value,
tax2name: res.erpsupplierquotationdetail.tax2name,
tax2namedesc: res.erpsupplierquotationdetail.tax2namedesc,
tax2value: res.erpsupplierquotationdetail.tax2value,
othercharges: res.erpsupplierquotationdetail.othercharges,
totalquotevalue: res.erpsupplierquotationdetail.totalquotevalue,
basecurrency: res.erpsupplierquotationdetail.basecurrency,
basevalue: res.erpsupplierquotationdetail.basevalue,
expecteddelivery: this.ngbDateParserFormatter.parse(res.erpsupplierquotationdetail.expecteddelivery),
paymenttermtype: res.erpsupplierquotationdetail.paymenttermtype,
paymenttermtypedesc: res.erpsupplierquotationdetail.paymenttermtypedesc,
remarks: res.erpsupplierquotationdetail.remarks,
offerquantity1: res.erpsupplierquotationdetail.offerquantity1,
unitprice1: res.erpsupplierquotationdetail.unitprice1,
totalcost1: res.erpsupplierquotationdetail.totalcost1,
offerquantity2: res.erpsupplierquotationdetail.offerquantity2,
unitprice2: res.erpsupplierquotationdetail.unitprice2,
totalcost2: res.erpsupplierquotationdetail.totalcost2,
offerquantity3: res.erpsupplierquotationdetail.offerquantity3,
unitprice3: res.erpsupplierquotationdetail.unitprice3,
totalcost3: res.erpsupplierquotationdetail.totalcost3,
status: res.erpsupplierquotationdetail.status,
statusdesc: res.erpsupplierquotationdetail.statusdesc,
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
  for (let key in this.erpsupplierquotationdetailForm.controls) {
    if (this.erpsupplierquotationdetailForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierquotationdetailservice.formData!=null && this.erpsupplierquotationdetailservice.formData[key]!=null  && this.erpsupplierquotationdetailservice.formData[key]!='[]' && this.erpsupplierquotationdetailservice.formData[key]!=undefined && this.erpsupplierquotationdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierquotationdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierquotationdetailservice.formData!=null && this.erpsupplierquotationdetailservice.formData[key]!=null   && this.erpsupplierquotationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierquotationdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierquotationdetailservice.formData!=null && this.erpsupplierquotationdetailservice.formData[key]!=null   && this.erpsupplierquotationdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierquotationdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierquotationdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierquotationdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierquotationdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierquotationdetailForm.value;
obj.expecteddelivery=new Date(this.erpsupplierquotationdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationdetailForm.get('expecteddelivery').value)+'  UTC' :null);
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

private erpsupplierquotationdetailtoggleOption(){
this.erpsupplierquotationdetailshowOption = this.erpsupplierquotationdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierquotationdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierquotationdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierquotationdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierquotationdetailservice.formData=this.erpsupplierquotationdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierquotationdetailForm.controls[key] != null)
    {
        this.erpsupplierquotationdetailservice.formData[key] = this.erpsupplierquotationdetailForm.controls[key].value;
    }
}
}
}
this.erpsupplierquotationdetailservice.formData.expecteddelivery=new Date(this.erpsupplierquotationdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpsupplierquotationdetailForm.get('expecteddelivery').value)+'  UTC' :null);
console.log(this.erpsupplierquotationdetailservice.formData);
this.erpsupplierquotationdetailservice.formData=this.erpsupplierquotationdetailForm.value;
this.erpsupplierquotationdetailservice.saveOrUpdateerpsupplierquotationdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierquotationdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierquotationdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierquotationdetail);
}
else
{
this.FillData(res);
}
}
this.erpsupplierquotationdetailForm.markAsUntouched();
this.erpsupplierquotationdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erpsupplierquotationdetailForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplierquotationdetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditquotationid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erpsupplierquotationdetailForm.get('quotationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpsupplierquotationdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplierquotationdetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsupplierquotationdetailForm.get('tax2name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}

  calculate() {
    debugger
    let ret = 0;
    this.erpsupplierquotationdetailForm.patchValue({ unitprice: this.f.basevalue.value * 2 });
    let tot = this.f.quantity.value * this.f.unitprice.value;
    ret = tot;
    if (this.f.tax1value.value != null) ret += ((this.f.tax1value.value / 100) * tot);
    if (this.f.tax2value.value != null) ret += ((this.f.tax2value.value / 100) * tot);
    if (this.f.discountpercent.value != null) ret -= ((this.f.discountpercent.value / 100) * tot);
    if (this.f.othercharges.value != null) ret += this.f.othercharges.value;
    this.erpsupplierquotationdetailForm.patchValue({ totalquotevalue: ret });
  } 


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



