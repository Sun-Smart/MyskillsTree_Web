import { erpsalesorderdetailService } from './../../../service/erpsalesorderdetail.service';
import { erpsalesorderdetail } from './../../../model/erpsalesorderdetail.model';
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
import { erpsalesordermaster} from './../../../model/erpsalesordermaster.model';
import { erpsalesordermasterComponent } from './../../../pages/forms/erpsalesordermaster/erpsalesordermaster.component';
import { erpsalesordermasterService } from './../../../service/erpsalesordermaster.service';
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
selector: 'app-erpsalesorderdetail',
templateUrl: './erpsalesorderdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsalesorderdetailComponent implements OnInit {
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
bfilterPopulateerpsalesorderdetails:boolean=false;
dataerpsalesorderdetailssoid3:any=[];
dataerpsalesorderdetailsdetailtype3:any=[];
dataerpsalesorderdetailsitemid3:any=[];
dataerpsalesorderdetailsuom3:any=[];
dataerpsalesorderdetailscurrency3:any=[];
dataerpsalesorderdetailsdiscounttype3:any=[];
dataerpsalesorderdetailstax1name3:any=[];
dataerpsalesorderdetailstax2name3:any=[];
dataerpsalesorderdetailsbasecurrency3:any=[];
 erpsalesorderdetailForm: FormGroup;
soidList: erpsalesordermaster[];
soidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
soid_erpsalesordermastersForm: FormGroup;//autocomplete
soid_erpsalesordermastersoptions:any;//autocomplete
soid_erpsalesordermastersformatter:any;//autocomplete
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
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsalesorderdetailshowOption:boolean;
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
private erpsalesorderdetailservice: erpsalesorderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpsalesordermasterservice:erpsalesordermasterService,
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
this.erpsalesorderdetailForm  = this.fb.group({
pk:[null],
sodetailid: [null],
versionnumber: [null],
soid: [null],
soiddesc: [null],
customerid: [null],
detailtype: [null],
detailtypedesc: [null],
itemid: [null],
itemiddesc: [null],
description: [null],
details: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
unitprice: [null],
discountpercent: [null],
discounttype: [null],
discounttypedesc: [null],
discountvalue: [null],
saleprice: [null],
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
expecteddelivery: [null],
size: [null],
color: [null],
weight: [null],
notes: [null],
paymenttermtype: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsalesorderdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsalesorderdetailForm.dirty && this.erpsalesorderdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.sodetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.sodetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.sodetailid && pkDetail) {
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
let erpsalesorderdetailid = null;

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
this.formid=erpsalesorderdetailid;
//this.sharedService.alert(erpsalesorderdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsalesordermasterservice.geterpsalesordermastersList().then(res => 
{
this.soidList = res as erpsalesordermaster[];
if(this.erpsalesorderdetailservice.formData && this.erpsalesorderdetailservice.formData.soid){
this.soidoptionsEvent.emit(this.soidList);
this.erpsalesorderdetailForm.patchValue({
    soid: this.erpsalesorderdetailservice.formData.soid,
    soiddesc: this.erpsalesorderdetailservice.formData.soiddesc,
});
}
{
let arrsoid = this.soidList.filter(v => v.soid == this.erpsalesorderdetailForm.get('soid').value);
let objsoid;
if (arrsoid.length > 0) objsoid = arrsoid[0];
if (objsoid)
{
}
}
}
).catch((err) => {console.log(err);});
this.soid_erpsalesordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.soidList.filter(v => v.sonumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.soid_erpsalesordermastersformatter = (result: any) => result.sonumber;
this.configservice.getList("sodetailtype").then(res => this.detailtypeList = res as boconfigvalue[]);
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpsalesorderdetailservice.formData && this.erpsalesorderdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpsalesorderdetailForm.patchValue({
    itemid: this.erpsalesorderdetailservice.formData.itemid,
    itemiddesc: this.erpsalesorderdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpsalesorderdetailForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
    this.erpsalesorderdetailForm.patchValue({ itemdescription: objitemid.itemdescription });
    this.erpsalesorderdetailForm.patchValue({ uom: objitemid.uom });
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1 || v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode+'  '+result.itemshortname;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.configservice.getList("discounttype").then(res => this.discounttypeList = res as boconfigvalue[]);
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax1nameList = res as erptaxmaster[];
{
let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erpsalesorderdetailForm.get('tax1name').value);
let objtax1name;
if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
if (objtax1name)
{
    this.erpsalesorderdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.tax2nameList = res as erptaxmaster[];
{
let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erpsalesorderdetailForm.get('tax2name').value);
let objtax2name;
if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
if (objtax2name)
{
    this.erpsalesorderdetailForm.patchValue({ tax2value: objtax2name.taxpercentage });
}
}
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.basecurrencyList = res as boconfigvalue[]);

//autocomplete
    this.erpsalesorderdetailservice.geterpsalesorderdetailsList().then(res => {
      this.pkList = res as erpsalesorderdetail[];
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
this.erpsalesorderdetailForm.markAsUntouched();
this.erpsalesorderdetailForm.markAsPristine();
}
onSelectedsoid(soidDetail: any) {
if (soidDetail.soid && soidDetail) {
this.erpsalesorderdetailForm.patchValue({
soid: soidDetail.soid,
soiddesc: soidDetail.sonumber,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpsalesorderdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode+';'+itemidDetail.itemshortname,

});
this.erpsalesorderdetailForm.patchValue({itemdescription:itemidDetail.itemdescription});
this.erpsalesorderdetailForm.patchValue({uom:itemidDetail.uom});

}
}




resetForm() {
if (this.erpsalesorderdetailForm != null)
this.erpsalesorderdetailForm.reset();
this.erpsalesorderdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let sodetailid = this.erpsalesorderdetailForm.get('sodetailid').value;
        if(sodetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsalesorderdetailservice.deleteerpsalesorderdetail(sodetailid).then(res =>
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
    this.erpsalesorderdetailForm.patchValue({
        sodetailid: null
    });
    if(this.erpsalesorderdetailservice.formData.sodetailid!=null)this.erpsalesorderdetailservice.formData.sodetailid=null;
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
this.erpsalesorderdetailForm.patchValue({"expecteddelivery":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpsalesorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsalesorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsalesorderdetailForm.controls[key]!=undefined)
{
this.erpsalesorderdetailForm.controls[key].disable({onlySelf: true});
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
sodetailidonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
soidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
detailtypeonChange(evt:any){
let e=this.f.detailtype.value as any;
this.erpsalesorderdetailForm.patchValue({detailtypedesc:evt.options[evt.options.selectedIndex].text});
}
itemidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpsalesorderdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpsalesorderdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
discounttypeonChange(evt:any){
let e=this.f.discounttype.value as any;
this.erpsalesorderdetailForm.patchValue({discounttypedesc:evt.options[evt.options.selectedIndex].text});
}
discountvalueonChange(evt:any){
let e=evt.value;
}
salepriceonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erpsalesorderdetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
this.erpsalesorderdetailForm.patchValue({tax1value:this.tax1nameList[evt.options.selectedIndex].taxpercentage});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
this.erpsalesorderdetailForm.patchValue({tax2namedesc:evt.options[evt.options.selectedIndex].text});
this.erpsalesorderdetailForm.patchValue({tax2value:this.tax2nameList[evt.options.selectedIndex].taxpercentage});
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
this.erpsalesorderdetailForm.patchValue({basecurrencydesc:evt.options[evt.options.selectedIndex].text});
}
basevalueonChange(evt:any){
let e=evt.value;
}
expecteddeliveryonChange(evt:any){
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
notesonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsalesorderdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsalesorderdetailservice.geterpsalesorderdetailsByEID(pkcol).then(res => {

this.erpsalesorderdetailservice.formData=res.erpsalesorderdetail;
let formproperty=res.erpsalesorderdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsalesorderdetail.pkcol;
this.formid=res.erpsalesorderdetail.sodetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsalesorderdetail.sodetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsalesorderdetailForm.patchValue({
sodetailid: res.erpsalesorderdetail.sodetailid,
versionnumber: res.erpsalesorderdetail.versionnumber,
soid: res.erpsalesorderdetail.soid,
soiddesc: res.erpsalesorderdetail.soiddesc,
customerid: res.erpsalesorderdetail.customerid,
detailtype: res.erpsalesorderdetail.detailtype,
detailtypedesc: res.erpsalesorderdetail.detailtypedesc,
itemid: res.erpsalesorderdetail.itemid,
itemiddesc: res.erpsalesorderdetail.itemiddesc,
description: res.erpsalesorderdetail.description,
details: res.erpsalesorderdetail.details,
quantity: res.erpsalesorderdetail.quantity,
uom: res.erpsalesorderdetail.uom,
uomdesc: res.erpsalesorderdetail.uomdesc,
currency: res.erpsalesorderdetail.currency,
currencydesc: res.erpsalesorderdetail.currencydesc,
unitprice: res.erpsalesorderdetail.unitprice,
discountpercent: res.erpsalesorderdetail.discountpercent,
discounttype: res.erpsalesorderdetail.discounttype,
discounttypedesc: res.erpsalesorderdetail.discounttypedesc,
discountvalue: res.erpsalesorderdetail.discountvalue,
saleprice: res.erpsalesorderdetail.saleprice,
tax1name: res.erpsalesorderdetail.tax1name,
tax1namedesc: res.erpsalesorderdetail.tax1namedesc,
tax1value: res.erpsalesorderdetail.tax1value,
tax2name: res.erpsalesorderdetail.tax2name,
tax2namedesc: res.erpsalesorderdetail.tax2namedesc,
tax2value: res.erpsalesorderdetail.tax2value,
othercharges: res.erpsalesorderdetail.othercharges,
totalvalue: res.erpsalesorderdetail.totalvalue,
basecurrency: res.erpsalesorderdetail.basecurrency,
basecurrencydesc: res.erpsalesorderdetail.basecurrencydesc,
basevalue: res.erpsalesorderdetail.basevalue,
expecteddelivery: this.ngbDateParserFormatter.parse(res.erpsalesorderdetail.expecteddelivery),
size: res.erpsalesorderdetail.size,
color: res.erpsalesorderdetail.color,
weight: res.erpsalesorderdetail.weight,
notes: res.erpsalesorderdetail.notes,
paymenttermtype: res.erpsalesorderdetail.paymenttermtype,
remarks: res.erpsalesorderdetail.remarks,
status: res.erpsalesorderdetail.status,
statusdesc: res.erpsalesorderdetail.statusdesc,
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
  for (let key in this.erpsalesorderdetailForm.controls) {
    if (this.erpsalesorderdetailForm.controls[key] != null) {
if(false)
{
if(this.erpsalesorderdetailservice.formData!=null && this.erpsalesorderdetailservice.formData[key]!=null  && this.erpsalesorderdetailservice.formData[key]!='[]' && this.erpsalesorderdetailservice.formData[key]!=undefined && this.erpsalesorderdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsalesorderdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsalesorderdetailservice.formData!=null && this.erpsalesorderdetailservice.formData[key]!=null   && this.erpsalesorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsalesorderdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsalesorderdetailservice.formData!=null && this.erpsalesorderdetailservice.formData[key]!=null   && this.erpsalesorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsalesorderdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpsalesorderdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsalesorderdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsalesorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsalesorderdetailForm.value;
obj.expecteddelivery=new Date(this.erpsalesorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpsalesorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
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

private erpsalesorderdetailtoggleOption(){
this.erpsalesorderdetailshowOption = this.erpsalesorderdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsalesorderdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsalesorderdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsalesorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsalesorderdetailservice.formData=this.erpsalesorderdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsalesorderdetailForm.controls[key] != null)
    {
        this.erpsalesorderdetailservice.formData[key] = this.erpsalesorderdetailForm.controls[key].value;
    }
}
}
}
this.erpsalesorderdetailservice.formData.expecteddelivery=new Date(this.erpsalesorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erpsalesorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
console.log(this.erpsalesorderdetailservice.formData);
this.erpsalesorderdetailservice.formData=this.erpsalesorderdetailForm.value;
this.erpsalesorderdetailservice.saveOrUpdateerpsalesorderdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsalesorderdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsalesorderdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsalesorderdetail);
}
else
{
this.FillData(res);
}
}
this.erpsalesorderdetailForm.markAsUntouched();
this.erpsalesorderdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsoid( soid) {
/*let ScreenType='2';
this.dialog.open(erpsalesordermasterComponent, 
{
data: {soid:this.erpsalesorderdetailForm.get('soid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpsalesorderdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsalesorderdetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax2name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erpsalesorderdetailForm.get('tax2name').value, ScreenType:2 }
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



