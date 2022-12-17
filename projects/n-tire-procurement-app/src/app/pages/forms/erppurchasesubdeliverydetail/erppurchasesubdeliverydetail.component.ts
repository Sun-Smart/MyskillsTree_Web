import { erppurchasesubdeliverydetailService } from './../../../service/erppurchasesubdeliverydetail.service';
import { erppurchasesubdeliverydetail } from './../../../model/erppurchasesubdeliverydetail.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erppurchaseorderdetail} from './../../../model/erppurchaseorderdetail.model';
import { erppurchaseorderdetailComponent } from './../../../pages/forms/erppurchaseorderdetail/erppurchaseorderdetail.component';
import { erppurchaseorderdetailService } from './../../../service/erppurchaseorderdetail.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
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
selector: 'app-erppurchasesubdeliverydetail',
templateUrl: './erppurchasesubdeliverydetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchasesubdeliverydetailComponent implements OnInit {
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
bfilterPopulateerppurchasesubdeliverydetails:boolean=false;
dataerppurchasesubdeliverydetailspoid3:any=[];
dataerppurchasesubdeliverydetailssupplierid3:any=[];
dataerppurchasesubdeliverydetailspodetailid3:any=[];
dataerppurchasesubdeliverydetailsitemid3:any=[];
dataerppurchasesubdeliverydetailsuom3:any=[];
dataerppurchasesubdeliverydetailsdeliverycountry3:any=[];
dataerppurchasesubdeliverydetailsdeliverystate3:any=[];
dataerppurchasesubdeliverydetailsdeliverycity3:any=[];
 erppurchasesubdeliverydetailForm: FormGroup;
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
podetailidList: erppurchaseorderdetail[];
podetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
podetailid_erppurchaseorderdetailsForm: FormGroup;//autocomplete
podetailid_erppurchaseorderdetailsoptions:any;//autocomplete
podetailid_erppurchaseorderdetailsformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
deliverycountryList: bocountry[];
deliverycountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverycountry_bocountriesForm: FormGroup;//autocomplete
deliverycountry_bocountriesoptions:any;//autocomplete
deliverycountry_bocountriesformatter:any;//autocomplete
deliverystateList: bostate[];
deliverystateoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverystate_bostatesForm: FormGroup;//autocomplete
deliverystate_bostatesoptions:any;//autocomplete
deliverystate_bostatesformatter:any;//autocomplete
deliverycityList: bocity[];
deliverycityoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
deliverycity_bocitiesForm: FormGroup;//autocomplete
deliverycity_bocitiesoptions:any;//autocomplete
deliverycity_bocitiesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erppurchasesubdeliverydetailshowOption:boolean;
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
private erppurchasesubdeliverydetailservice: erppurchasesubdeliverydetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erppurchaseorderdetailservice:erppurchaseorderdetailService,
private erpitemmasterservice:erpitemmasterService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.erppurchasesubdeliverydetailForm  = this.fb.group({
pk:[null],
branchid: [null],
poid: [null],
poiddesc: [null],
subdeliveryid: [null],
supplierid: [null],
supplieriddesc: [null],
versionnumber: [null],
podetailid: [null],
podetailiddesc: [null],
itemid: [null],
itemiddesc: [null],
uom: [null],
uomdesc: [null],
quantity: [null],
deliveryaddress1: [null],
deliveryaddress2: [null],
deliverycountry: [null],
deliverycountrydesc: [null],
deliverystate: [null],
deliverystatedesc: [null],
deliverycity: [null],
deliverycitydesc: [null],
deliverypin: [null],
deliverylatlong: [null],
deliverydate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erppurchasesubdeliverydetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchasesubdeliverydetailForm.dirty && this.erppurchasesubdeliverydetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.subdeliveryid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.subdeliveryid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.subdeliveryid && pkDetail) {
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
let erppurchasesubdeliverydetailid = null;

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
this.formid=erppurchasesubdeliverydetailid;
//this.sharedService.alert(erppurchasesubdeliverydetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchasesubdeliverydetailForm.patchValue({
    poid: this.erppurchasesubdeliverydetailservice.formData.poid,
    poiddesc: this.erppurchasesubdeliverydetailservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchasesubdeliverydetailForm.get('poid').value);
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
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erppurchasesubdeliverydetailForm.patchValue({
    supplierid: this.erppurchasesubdeliverydetailservice.formData.supplierid,
    supplieriddesc: this.erppurchasesubdeliverydetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erppurchasesubdeliverydetailForm.get('supplierid').value);
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
this.erppurchaseorderdetailservice.geterppurchaseorderdetailsList().then(res => 
{
this.podetailidList = res as erppurchaseorderdetail[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.podetailid){
this.podetailidoptionsEvent.emit(this.podetailidList);
this.erppurchasesubdeliverydetailForm.patchValue({
    podetailid: this.erppurchasesubdeliverydetailservice.formData.podetailid,
    podetailiddesc: this.erppurchasesubdeliverydetailservice.formData.podetailiddesc,
});
}
{
let arrpodetailid = this.podetailidList.filter(v => v.podetailid == this.erppurchasesubdeliverydetailForm.get('podetailid').value);
let objpodetailid;
if (arrpodetailid.length > 0) objpodetailid = arrpodetailid[0];
if (objpodetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.podetailid_erppurchaseorderdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.podetailidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.podetailid_erppurchaseorderdetailsformatter = (result: any) => result.description;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erppurchasesubdeliverydetailForm.patchValue({
    itemid: this.erppurchasesubdeliverydetailservice.formData.itemid,
    itemiddesc: this.erppurchasesubdeliverydetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erppurchasesubdeliverydetailForm.get('itemid').value);
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
this.bocountryservice.getbocountriesList().then(res => 
{
this.deliverycountryList = res as bocountry[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.deliverycountry){
this.deliverycountryoptionsEvent.emit(this.deliverycountryList);
this.erppurchasesubdeliverydetailForm.patchValue({
    deliverycountry: this.erppurchasesubdeliverydetailservice.formData.deliverycountry,
    deliverycountrydesc: this.erppurchasesubdeliverydetailservice.formData.deliverycountrydesc,
});
}
{
let arrdeliverycountry = this.deliverycountryList.filter(v => v.countryid == this.erppurchasesubdeliverydetailForm.get('deliverycountry').value);
let objdeliverycountry;
if (arrdeliverycountry.length > 0) objdeliverycountry = arrdeliverycountry[0];
if (objdeliverycountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.deliverycountry_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.deliverycountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.deliverycountry_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.deliverycountry.value && this.f.deliverycountry.value!="" && this.f.deliverycountry.value!=null)this.bostateservice.getListBycountryid(this.f.deliverycountry.value).then(res =>{
this.deliverystateList = res as bostate[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.deliverystate){this.erppurchasesubdeliverydetailForm.patchValue({
    deliverystate: this.erppurchasesubdeliverydetailservice.formData.deliverystate,
    deliverystatedesc: this.erppurchasesubdeliverydetailservice.formData.deliverystatedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.deliverystate_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.deliverystateList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.deliverystate_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.deliverystate.value && this.f.deliverystate.value!="" && this.f.deliverystate.value!=null)this.bocityservice.getListBystateid(this.f.deliverystate.value).then(res =>{
this.deliverycityList = res as bocity[];
if(this.erppurchasesubdeliverydetailservice.formData && this.erppurchasesubdeliverydetailservice.formData.deliverycity){this.erppurchasesubdeliverydetailForm.patchValue({
    deliverycity: this.erppurchasesubdeliverydetailservice.formData.deliverycity,
    deliverycitydesc: this.erppurchasesubdeliverydetailservice.formData.deliverycitydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.deliverycity_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.deliverycityList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.deliverycity_bocitiesformatter = (result: any) => result.name;

//autocomplete
    this.erppurchasesubdeliverydetailservice.geterppurchasesubdeliverydetailsList().then(res => {
      this.pkList = res as erppurchasesubdeliverydetail[];
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
this.erppurchasesubdeliverydetailForm.markAsUntouched();
this.erppurchasesubdeliverydetailForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedpodetailid(podetailidDetail: any) {
if (podetailidDetail.podetailid && podetailidDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
podetailid: podetailidDetail.podetailid,
podetailiddesc: podetailidDetail.description,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelecteddeliverycountry(deliverycountryDetail: any) {
if (deliverycountryDetail.countryid && deliverycountryDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
deliverycountry: deliverycountryDetail.countryid,
deliverycountrydesc: deliverycountryDetail.name,

});
this.bostateservice.getListBycountryid(deliverycountryDetail.countryid).then(res => {
 this.deliverystateList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelecteddeliverystate(deliverystateDetail: any) {
if (deliverystateDetail.stateid && deliverystateDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
deliverystate: deliverystateDetail.stateid,
deliverystatedesc: deliverystateDetail.name,

});
this.bocityservice.getListBystateid(deliverystateDetail.stateid).then(res => {
 this.deliverycityList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelecteddeliverycity(deliverycityDetail: any) {
if (deliverycityDetail.cityid && deliverycityDetail) {
this.erppurchasesubdeliverydetailForm.patchValue({
deliverycity: deliverycityDetail.cityid,
deliverycitydesc: deliverycityDetail.name,

});

}
}




resetForm() {
if (this.erppurchasesubdeliverydetailForm != null)
this.erppurchasesubdeliverydetailForm.reset();
this.erppurchasesubdeliverydetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let subdeliveryid = this.erppurchasesubdeliverydetailForm.get('subdeliveryid').value;
        if(subdeliveryid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchasesubdeliverydetailservice.deleteerppurchasesubdeliverydetail(subdeliveryid).then(res =>
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
    this.erppurchasesubdeliverydetailForm.patchValue({
        subdeliveryid: null
    });
    if(this.erppurchasesubdeliverydetailservice.formData.subdeliveryid!=null)this.erppurchasesubdeliverydetailservice.formData.subdeliveryid=null;
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
        else if(key=="deliverydate")
this.erppurchasesubdeliverydetailForm.patchValue({"deliverydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erppurchasesubdeliverydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchasesubdeliverydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchasesubdeliverydetailForm.controls[key]!=undefined)
{
this.erppurchasesubdeliverydetailForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
poidonChange(evt:any){
let e=evt.value;
}
subdeliveryidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
podetailidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erppurchasesubdeliverydetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
deliveryaddress1onChange(evt:any){
let e=evt.value;
}
deliveryaddress2onChange(evt:any){
let e=evt.value;
}
deliverycountryonChange(evt:any){
let e=evt.value;
}
deliverystateonChange(evt:any){
let e=evt.value;
}
deliverycityonChange(evt:any){
let e=evt.value;
}
deliverypinonChange(evt:any){
let e=evt.value;
}
deliverylatlongonChange(evt:any){
let e=evt.value;
}
deliverydateonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerppurchasesubdeliverydetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchasesubdeliverydetailservice.geterppurchasesubdeliverydetailsByEID(pkcol).then(res => {

this.erppurchasesubdeliverydetailservice.formData=res.erppurchasesubdeliverydetail;
let formproperty=res.erppurchasesubdeliverydetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchasesubdeliverydetail.pkcol;
this.formid=res.erppurchasesubdeliverydetail.subdeliveryid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchasesubdeliverydetail.subdeliveryid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchasesubdeliverydetailForm.patchValue({
branchid: res.erppurchasesubdeliverydetail.branchid,
poid: res.erppurchasesubdeliverydetail.poid,
poiddesc: res.erppurchasesubdeliverydetail.poiddesc,
subdeliveryid: res.erppurchasesubdeliverydetail.subdeliveryid,
supplierid: res.erppurchasesubdeliverydetail.supplierid,
supplieriddesc: res.erppurchasesubdeliverydetail.supplieriddesc,
versionnumber: res.erppurchasesubdeliverydetail.versionnumber,
podetailid: res.erppurchasesubdeliverydetail.podetailid,
podetailiddesc: res.erppurchasesubdeliverydetail.podetailiddesc,
itemid: res.erppurchasesubdeliverydetail.itemid,
itemiddesc: res.erppurchasesubdeliverydetail.itemiddesc,
uom: res.erppurchasesubdeliverydetail.uom,
uomdesc: res.erppurchasesubdeliverydetail.uomdesc,
quantity: res.erppurchasesubdeliverydetail.quantity,
deliveryaddress1: res.erppurchasesubdeliverydetail.deliveryaddress1,
deliveryaddress2: res.erppurchasesubdeliverydetail.deliveryaddress2,
deliverycountry: res.erppurchasesubdeliverydetail.deliverycountry,
deliverycountrydesc: res.erppurchasesubdeliverydetail.deliverycountrydesc,
deliverystate: res.erppurchasesubdeliverydetail.deliverystate,
deliverystatedesc: res.erppurchasesubdeliverydetail.deliverystatedesc,
deliverycity: res.erppurchasesubdeliverydetail.deliverycity,
deliverycitydesc: res.erppurchasesubdeliverydetail.deliverycitydesc,
deliverypin: res.erppurchasesubdeliverydetail.deliverypin,
deliverylatlong: res.erppurchasesubdeliverydetail.deliverylatlong,
deliverydate: this.ngbDateParserFormatter.parse(res.erppurchasesubdeliverydetail.deliverydate),
status: res.erppurchasesubdeliverydetail.status,
statusdesc: res.erppurchasesubdeliverydetail.statusdesc,
});
setTimeout(() => {
if(this.f.deliverycountry.value && this.f.deliverycountry.value!="" && this.f.deliverycountry.value!=null)this.bostateservice.getListBycountryid(this.f.deliverycountry.value).then(res =>{
this.deliverystateList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.deliverystate.value && this.f.deliverystate.value!="" && this.f.deliverystate.value!=null)this.bocityservice.getListBystateid(this.f.deliverystate.value).then(res =>{
this.deliverycityList = res as bocity[];
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
  for (let key in this.erppurchasesubdeliverydetailForm.controls) {
    if (this.erppurchasesubdeliverydetailForm.controls[key] != null) {
if(false)
{
if(this.erppurchasesubdeliverydetailservice.formData!=null && this.erppurchasesubdeliverydetailservice.formData[key]!=null  && this.erppurchasesubdeliverydetailservice.formData[key]!='[]' && this.erppurchasesubdeliverydetailservice.formData[key]!=undefined && this.erppurchasesubdeliverydetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchasesubdeliverydetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchasesubdeliverydetailservice.formData!=null && this.erppurchasesubdeliverydetailservice.formData[key]!=null   && this.erppurchasesubdeliverydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchasesubdeliverydetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchasesubdeliverydetailservice.formData!=null && this.erppurchasesubdeliverydetailservice.formData[key]!=null   && this.erppurchasesubdeliverydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchasesubdeliverydetailservice.formData[key]+"'><div class='progress__number'>"+this.erppurchasesubdeliverydetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchasesubdeliverydetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchasesubdeliverydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erppurchasesubdeliverydetailForm.value;
obj.deliverydate=new Date(this.erppurchasesubdeliverydetailForm.get('deliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchasesubdeliverydetailForm.get('deliverydate').value)+'  UTC' :null);
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

private erppurchasesubdeliverydetailtoggleOption(){
this.erppurchasesubdeliverydetailshowOption = this.erppurchasesubdeliverydetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchasesubdeliverydetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchasesubdeliverydetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchasesubdeliverydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchasesubdeliverydetailservice.formData=this.erppurchasesubdeliverydetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchasesubdeliverydetailForm.controls[key] != null)
    {
        this.erppurchasesubdeliverydetailservice.formData[key] = this.erppurchasesubdeliverydetailForm.controls[key].value;
    }
}
}
}
this.erppurchasesubdeliverydetailservice.formData.deliverydate=new Date(this.erppurchasesubdeliverydetailForm.get('deliverydate').value ? this.ngbDateParserFormatter.format(this.erppurchasesubdeliverydetailForm.get('deliverydate').value)+'  UTC' :null);
console.log(this.erppurchasesubdeliverydetailservice.formData);
this.erppurchasesubdeliverydetailservice.formData=this.erppurchasesubdeliverydetailForm.value;
this.erppurchasesubdeliverydetailservice.saveOrUpdateerppurchasesubdeliverydetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchasesubdeliverydetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchasesubdeliverydetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchasesubdeliverydetail);
}
else
{
this.FillData(res);
}
}
this.erppurchasesubdeliverydetailForm.markAsUntouched();
this.erppurchasesubdeliverydetailForm.markAsPristine();
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
data: {poid:this.erppurchasesubdeliverydetailForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erppurchasesubdeliverydetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpodetailid( podetailid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseorderdetailComponent, 
{
data: {podetailid:this.erppurchasesubdeliverydetailForm.get('podetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erppurchasesubdeliverydetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverycountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erppurchasesubdeliverydetailForm.get('deliverycountry').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverystate( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.erppurchasesubdeliverydetailForm.get('deliverystate').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeliverycity( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.erppurchasesubdeliverydetailForm.get('deliverycity').value, ScreenType:2 }
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



