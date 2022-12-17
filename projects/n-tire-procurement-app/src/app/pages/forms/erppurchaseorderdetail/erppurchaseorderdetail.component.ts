import { erppurchaseorderdetailService } from './../../../service/erppurchaseorderdetail.service';
import { erppurchaseorderdetail } from './../../../model/erppurchaseorderdetail.model';
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
import currencyToSymbolMap from 'currency-symbol-map/map'
//FK field services
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
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
import { erppurchasesubdeliverydetail } from './../../../model/erppurchasesubdeliverydetail.model';
import { erppurchasesubdeliverydetailComponent } from './../../../pages/forms/erppurchasesubdeliverydetail/erppurchasesubdeliverydetail.component';
//FK services
import { bocity,IbocityResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
import { bostate,IbostateResponse } from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
import { bocountry,IbocountryResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
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
selector: 'app-erppurchaseorderdetail',
templateUrl: './erppurchaseorderdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchaseorderdetailComponent implements OnInit {
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
currencyToSymbolMap1:any;
currencyToSymbolMap2:any;
data3:any=[];
bfilterPopulateerppurchaseorderdetails:boolean=false;
dataerppurchaseorderdetailspoid3:any=[];
dataerppurchaseorderdetailssupplierid3:any=[];
dataerppurchaseorderdetailspodetailid3:any=[];
dataerppurchaseorderdetailsdetailtype3:any=[];
dataerppurchaseorderdetailsitemid3:any=[];
dataerppurchaseorderdetailsuom3:any=[];
dataerppurchaseorderdetailscurrency3:any=[];
dataerppurchaseorderdetailsdiscounttype3:any=[];
dataerppurchaseorderdetailstax1name3:any=[];
dataerppurchasesubdeliverydetailsdeliverycity3:any=[];
dataerppurchasesubdeliverydetailsdeliverystate3:any=[];
dataerppurchasesubdeliverydetailsitemid3:any=[];
dataerppurchasesubdeliverydetailsdeliverycountry3:any=[];
dataerppurchasesubdeliverydetailsuom3:any=[];
dataerppurchasesubdeliverydetailssupplierid3:any=[];
dataerppurchasesubdeliverydetailspoid3:any=[];
dataerppurchasesubdeliverydetailspodetailid3:any=[];
bfilterPopulateerppurchasesubdeliverydetails:boolean=false;
@ViewChild('tblerppurchasesubdeliverydetailssource',{static:false}) tblerppurchasesubdeliverydetailssource: Ng2SmartTableComponent;
 erppurchaseorderdetailForm: FormGroup;
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
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erppurchaseorderdetailshowOption:boolean;
erppurchasesubdeliverydetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erppurchasesubdeliverydetailsvisiblelist:any;
erppurchasesubdeliverydetailshidelist:any;

DeletederppurchasesubdeliverydetailIDs: string="";
erppurchasesubdeliverydetailsID: string = "1";
erppurchasesubdeliverydetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erppurchaseorderdetailservice: erppurchaseorderdetailService,
private bocityservice: bocityService,
private bostateservice: bostateService,
private erpitemmasterservice: erpitemmasterService,
private bocountryservice: bocountryService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.erppurchaseorderdetailForm  = this.fb.group({
pk:[null],
poid: [null],
poiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
versionnumber: [null],
podetailid: [null],
podetailiddesc: [null],
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
saleprice: [null],
tax1name: [null],
tax1namedesc: [null],
tax1value: [null],
tax2name: [null],
tax2value: [null],
othercharges: [null],
totalquotevalue: [null],
basecurrency: [null],
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

get f() { return this.erppurchaseorderdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchaseorderdetailForm.dirty && this.erppurchaseorderdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.podetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.podetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.podetailid && pkDetail) {
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

this.currencyToSymbolMap2=currencyToSymbolMap;
this.currencyToSymbolMap1=(Object.entries(currencyToSymbolMap));
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
let erppurchaseorderdetailid = null;

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
this.formid=erppurchaseorderdetailid;
//this.sharedService.alert(erppurchaseorderdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterppurchasesubdeliverydetailsTableConfig();
  setTimeout(() => {
  this.SeterppurchasesubdeliverydetailsTableddConfig();
  });

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
if(this.erppurchaseorderdetailservice.formData && this.erppurchaseorderdetailservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchaseorderdetailForm.patchValue({
    poid: this.erppurchaseorderdetailservice.formData.poid,
    poiddesc: this.erppurchaseorderdetailservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchaseorderdetailForm.get('poid').value);
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
if(this.erppurchaseorderdetailservice.formData && this.erppurchaseorderdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erppurchaseorderdetailForm.patchValue({
    supplierid: this.erppurchaseorderdetailservice.formData.supplierid,
    supplieriddesc: this.erppurchaseorderdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erppurchaseorderdetailForm.get('supplierid').value);
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
if(this.erppurchaseorderdetailservice.formData && this.erppurchaseorderdetailservice.formData.podetailid){
this.podetailidoptionsEvent.emit(this.podetailidList);
this.erppurchaseorderdetailForm.patchValue({
    podetailid: this.erppurchaseorderdetailservice.formData.podetailid,
    podetailiddesc: this.erppurchaseorderdetailservice.formData.podetailiddesc,
});
}
{
let arrpodetailid = this.podetailidList.filter(v => v.podetailid == this.erppurchaseorderdetailForm.get('podetailid').value);
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
this.configservice.getList("detailtype").then(res => this.detailtypeList = res as boconfigvalue[]);
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erppurchaseorderdetailservice.formData && this.erppurchaseorderdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erppurchaseorderdetailForm.patchValue({
    itemid: this.erppurchaseorderdetailservice.formData.itemid,
    itemiddesc: this.erppurchaseorderdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erppurchaseorderdetailForm.get('itemid').value);
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
}
).catch((err) => {console.log(err);});

//autocomplete
    this.erppurchaseorderdetailservice.geterppurchaseorderdetailsList().then(res => {
      this.pkList = res as erppurchaseorderdetail[];
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
this.erppurchaseorderdetailForm.markAsUntouched();
this.erppurchaseorderdetailForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchaseorderdetailForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erppurchaseorderdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedpodetailid(podetailidDetail: any) {
if (podetailidDetail.podetailid && podetailidDetail) {
this.erppurchaseorderdetailForm.patchValue({
podetailid: podetailidDetail.podetailid,
podetailiddesc: podetailidDetail.description,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erppurchaseorderdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}




resetForm() {
if (this.erppurchaseorderdetailForm != null)
this.erppurchaseorderdetailForm.reset();
this.erppurchaseorderdetailForm.patchValue({
basecurrency: this.sessiondata.currency,
});
setTimeout(() => {
this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails=[];
this.erppurchasesubdeliverydetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let podetailid = this.erppurchaseorderdetailForm.get('podetailid').value;
        if(podetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchaseorderdetailservice.deleteerppurchaseorderdetail(podetailid).then(res =>
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
    this.erppurchaseorderdetailForm.patchValue({
        podetailid: null
    });
    if(this.erppurchaseorderdetailservice.formData.podetailid!=null)this.erppurchaseorderdetailservice.formData.podetailid=null;
for (let i=0;i<this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.length;i++) {
this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails[i].subdeliveryid=null;
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
        else if(key=="expecteddelivery")
this.erppurchaseorderdetailForm.patchValue({"expecteddelivery":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erppurchaseorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchaseorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchaseorderdetailForm.controls[key]!=undefined)
{
this.erppurchaseorderdetailForm.controls[key].disable({onlySelf: true});
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
poidonChange(evt:any){
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
detailtypeonChange(evt:any){
let e=this.f.detailtype.value as any;
this.erppurchaseorderdetailForm.patchValue({detailtypedesc:evt.options[evt.options.selectedIndex].text});
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
this.erppurchaseorderdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erppurchaseorderdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
unitpriceonChange(evt:any){
let e=evt.value;
}
discountpercentonChange(evt:any){
let e=evt.value;
}
discounttypeonChange(evt:any){
let e=this.f.discounttype.value as any;
this.erppurchaseorderdetailForm.patchValue({discounttypedesc:evt.options[evt.options.selectedIndex].text});
}
salepriceonChange(evt:any){
let e=evt.value;
}
tax1nameonChange(evt:any){
let e=evt.value;
this.erppurchaseorderdetailForm.patchValue({tax1namedesc:evt.options[evt.options.selectedIndex].text});
}
tax1valueonChange(evt:any){
let e=evt.value;
}
tax2nameonChange(evt:any){
let e=evt.value;
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

editerppurchaseorderdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchaseorderdetailservice.geterppurchaseorderdetailsByEID(pkcol).then(res => {

this.erppurchaseorderdetailservice.formData=res.erppurchaseorderdetail;
let formproperty=res.erppurchaseorderdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchaseorderdetail.pkcol;
this.formid=res.erppurchaseorderdetail.podetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchaseorderdetail.podetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchaseorderdetailForm.patchValue({
poid: res.erppurchaseorderdetail.poid,
poiddesc: res.erppurchaseorderdetail.poiddesc,
supplierid: res.erppurchaseorderdetail.supplierid,
supplieriddesc: res.erppurchaseorderdetail.supplieriddesc,
versionnumber: res.erppurchaseorderdetail.versionnumber,
podetailid: res.erppurchaseorderdetail.podetailid,
podetailiddesc: res.erppurchaseorderdetail.podetailiddesc,
detailtype: res.erppurchaseorderdetail.detailtype,
detailtypedesc: res.erppurchaseorderdetail.detailtypedesc,
itemid: res.erppurchaseorderdetail.itemid,
itemiddesc: res.erppurchaseorderdetail.itemiddesc,
description: res.erppurchaseorderdetail.description,
details: res.erppurchaseorderdetail.details,
quantity: res.erppurchaseorderdetail.quantity,
uom: res.erppurchaseorderdetail.uom,
uomdesc: res.erppurchaseorderdetail.uomdesc,
currency: res.erppurchaseorderdetail.currency,
currencydesc: res.erppurchaseorderdetail.currencydesc,
unitprice: res.erppurchaseorderdetail.unitprice,
discountpercent: res.erppurchaseorderdetail.discountpercent,
discounttype: res.erppurchaseorderdetail.discounttype,
discounttypedesc: res.erppurchaseorderdetail.discounttypedesc,
saleprice: res.erppurchaseorderdetail.saleprice,
tax1name: res.erppurchaseorderdetail.tax1name,
tax1namedesc: res.erppurchaseorderdetail.tax1namedesc,
tax1value: res.erppurchaseorderdetail.tax1value,
tax2name: res.erppurchaseorderdetail.tax2name,
tax2value: res.erppurchaseorderdetail.tax2value,
othercharges: res.erppurchaseorderdetail.othercharges,
totalquotevalue: res.erppurchaseorderdetail.totalquotevalue,
basecurrency: res.erppurchaseorderdetail.basecurrency,
basevalue: res.erppurchaseorderdetail.basevalue,
expecteddelivery: this.ngbDateParserFormatter.parse(res.erppurchaseorderdetail.expecteddelivery),
size: res.erppurchaseorderdetail.size,
color: res.erppurchaseorderdetail.color,
weight: res.erppurchaseorderdetail.weight,
notes: res.erppurchaseorderdetail.notes,
paymenttermtype: res.erppurchaseorderdetail.paymenttermtype,
remarks: res.erppurchaseorderdetail.remarks,
status: res.erppurchaseorderdetail.status,
statusdesc: res.erppurchaseorderdetail.statusdesc,
});
this.erppurchasesubdeliverydetailsvisiblelist=res.erppurchasesubdeliverydetailsvisiblelist;
//Child Tables if any
this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails = res.erppurchasesubdeliverydetails;
this.SeterppurchasesubdeliverydetailsTableConfig();
this.erppurchasesubdeliverydetailsLoadTable();
  setTimeout(() => {
  this.SeterppurchasesubdeliverydetailsTableddConfig();
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
  for (let key in this.erppurchaseorderdetailForm.controls) {
    if (this.erppurchaseorderdetailForm.controls[key] != null) {
if(false)
{
if(this.erppurchaseorderdetailservice.formData!=null && this.erppurchaseorderdetailservice.formData[key]!=null  && this.erppurchaseorderdetailservice.formData[key]!='[]' && this.erppurchaseorderdetailservice.formData[key]!=undefined && this.erppurchaseorderdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchaseorderdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchaseorderdetailservice.formData!=null && this.erppurchaseorderdetailservice.formData[key]!=null   && this.erppurchaseorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchaseorderdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchaseorderdetailservice.formData!=null && this.erppurchaseorderdetailservice.formData[key]!=null   && this.erppurchaseorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchaseorderdetailservice.formData[key]+"'><div class='progress__number'>"+this.erppurchaseorderdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchaseorderdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchaseorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erppurchaseorderdetailForm.value;
obj.expecteddelivery=new Date(this.erppurchaseorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erppurchaseorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private erppurchaseorderdetailtoggleOption(){
this.erppurchaseorderdetailshowOption = this.erppurchaseorderdetailshowOption === true ? false : true;
}

private erppurchasesubdeliverydetailtoggleOption(){
this.erppurchasesubdeliverydetailshowOption = this.erppurchasesubdeliverydetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchaseorderdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchaseorderdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchaseorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchaseorderdetailservice.formData=this.erppurchaseorderdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchaseorderdetailForm.controls[key] != null)
    {
        this.erppurchaseorderdetailservice.formData[key] = this.erppurchaseorderdetailForm.controls[key].value;
    }
}
}
}
this.erppurchaseorderdetailservice.formData.expecteddelivery=new Date(this.erppurchaseorderdetailForm.get('expecteddelivery').value ? this.ngbDateParserFormatter.format(this.erppurchaseorderdetailForm.get('expecteddelivery').value)+'  UTC' :null);
this.erppurchaseorderdetailservice.formData.DeletederppurchasesubdeliverydetailIDs = this.DeletederppurchasesubdeliverydetailIDs;
console.log(this.erppurchaseorderdetailservice.formData);
this.erppurchaseorderdetailservice.formData=this.erppurchaseorderdetailForm.value;
this.erppurchaseorderdetailservice.saveOrUpdateerppurchaseorderdetails().subscribe(
async res => {
if (this.erppurchasesubdeliverydetailssource.data)
{
    for (let i = 0; i < this.erppurchasesubdeliverydetailssource.data.length; i++)
    {
        if (this.erppurchasesubdeliverydetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erppurchasesubdeliverydetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseorderdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchaseorderdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseorderdetail);
}
else
{
this.FillData(res);
}
}
this.erppurchaseorderdetailForm.markAsUntouched();
this.erppurchaseorderdetailForm.markAsPristine();
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
data: {poid:this.erppurchaseorderdetailForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erppurchaseorderdetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpodetailid( podetailid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseorderdetailComponent, 
{
data: {podetailid:this.erppurchaseorderdetailForm.get('podetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erppurchaseorderdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittax1name( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erppurchaseorderdetailForm.get('tax1name').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerppurchasesubdeliverydetail(event:any,subdeliveryid:any, podetailid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erppurchasesubdeliverydetailComponent, 
{
data:  {  showview:false,save:false,event,subdeliveryid, podetailid,visiblelist:this.erppurchasesubdeliverydetailsvisiblelist,  hidelist:this.erppurchasesubdeliverydetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erppurchasesubdeliverydetailssource.add(res);
this.erppurchasesubdeliverydetailssource.refresh();
}
else
{
this.erppurchasesubdeliverydetailssource.update(event.data, res);
}
}
});
}

onDeleteerppurchasesubdeliverydetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederppurchasesubdeliverydetailIDs += childID + ",";
this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erppurchasesubdeliverydetails
erppurchasesubdeliverydetailssettings:any;
erppurchasesubdeliverydetailssource: any;

showerppurchasesubdeliverydetailsCheckbox()
{
debugger;
if(this.tblerppurchasesubdeliverydetailssource.settings['selectMode']== 'multi')this.tblerppurchasesubdeliverydetailssource.settings['selectMode']= 'single';
else
this.tblerppurchasesubdeliverydetailssource.settings['selectMode']= 'multi';
this.tblerppurchasesubdeliverydetailssource.initGrid();
}
deleteerppurchasesubdeliverydetailsAll()
{
this.tblerppurchasesubdeliverydetailssource.settings['selectMode'] = 'single';
}
showerppurchasesubdeliverydetailsFilter()
{
  setTimeout(() => {
  this.SeterppurchasesubdeliverydetailsTableddConfig();
  });
      if(this.tblerppurchasesubdeliverydetailssource.settings!=null)this.tblerppurchasesubdeliverydetailssource.settings['hideSubHeader'] =!this.tblerppurchasesubdeliverydetailssource.settings['hideSubHeader'];
this.tblerppurchasesubdeliverydetailssource.initGrid();
}
showerppurchasesubdeliverydetailsInActive()
{
}
enableerppurchasesubdeliverydetailsInActive()
{
}
async SeterppurchasesubdeliverydetailsTableddConfig()
{
if(!this.bfilterPopulateerppurchasesubdeliverydetails){
}
this.bfilterPopulateerppurchasesubdeliverydetails=true;
}
async erppurchasesubdeliverydetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterppurchasesubdeliverydetailsTableConfig()
{
this.erppurchasesubdeliverydetailssettings = {
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
branchid: {
title: 'Branch',
type: 'number',
filter:true,
},
poid: {
title: 'P O',
type: 'number',
filter:true,
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
deliveryaddress1: {
title: 'Delivery Address1',
type: '',
filter:true,
},
deliveryaddress2: {
title: 'Delivery Address2',
type: '',
filter:true,
},
deliverycountry: {
title: 'Delivery Country',
type: 'number',
filter:true,
},
deliverystate: {
title: 'Delivery State',
type: 'number',
filter:true,
},
deliverycity: {
title: 'Delivery City',
type: 'number',
filter:true,
},
deliverypin: {
title: 'Delivery P I N',
type: '',
filter:true,
},
deliverylatlong: {
title: 'Delivery Latlong',
type: '',
filter:true,
},
deliverydate: {
title: 'Delivery Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
erppurchasesubdeliverydetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchasesubdeliverydetailsID)>=0)
{
this.erppurchasesubdeliverydetailssource=new LocalDataSource();
this.erppurchasesubdeliverydetailssource.load(this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails as  any as LocalDataSource);
this.erppurchasesubdeliverydetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erppurchasesubdeliverydetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.length == 0)
{
    this.tblerppurchasesubdeliverydetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erppurchasesubdeliverydetail();
    this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.push(obj);
    this.erppurchasesubdeliverydetailssource.refresh();
    if ((this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.length / this.erppurchasesubdeliverydetailssource.getPaging().perPage).toFixed(0) + 1 != this.erppurchasesubdeliverydetailssource.getPaging().page)
    {
        this.erppurchasesubdeliverydetailssource.setPage((this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.length / this.erppurchasesubdeliverydetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerppurchasesubdeliverydetailssource.grid.edit(this.tblerppurchasesubdeliverydetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erppurchasesubdeliverydetailssource.data.indexOf(event.data);
this.onDeleteerppurchasesubdeliverydetail(event,event.data.subdeliveryid,((this.erppurchasesubdeliverydetailssource.getPaging().page-1) *this.erppurchasesubdeliverydetailssource.getPaging().perPage)+index);
this.erppurchasesubdeliverydetailssource.refresh();
break;
}
}

*/
erppurchasesubdeliverydetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerppurchasesubdeliverydetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerppurchasesubdeliverydetail(event,event.data.subdeliveryid,this.formid);
break;
case 'delete':
this.onDeleteerppurchasesubdeliverydetail(event,event.data.subdeliveryid,((this.erppurchasesubdeliverydetailssource.getPaging().page-1) *this.erppurchasesubdeliverydetailssource.getPaging().perPage)+event.index);
this.erppurchasesubdeliverydetailssource.refresh();
break;
}
}
erppurchasesubdeliverydetailsonDelete(obj) {
let subdeliveryid=obj.data.subdeliveryid;
if (confirm('Are you sure to delete this record ?')) {
this.erppurchaseorderdetailservice.deleteerppurchaseorderdetail(subdeliveryid).then(res=>
this.erppurchasesubdeliverydetailsLoadTable()
);
}
}
erppurchasesubdeliverydetailsPaging(val)
{
debugger;
this.erppurchasesubdeliverydetailssource.setPaging(1, val, true);
}

handleerppurchasesubdeliverydetailsGridSelected(event:any) {
this.erppurchasesubdeliverydetailsselectedindex=this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.findIndex(i => i.subdeliveryid === event.data.subdeliveryid);
}
IserppurchasesubdeliverydetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erppurchasesubdeliverydetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erppurchasesubdeliverydetails

}



