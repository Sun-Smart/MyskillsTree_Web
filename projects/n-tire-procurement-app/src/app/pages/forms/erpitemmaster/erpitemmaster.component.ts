import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erpitemmaster } from './../../../model/erpitemmaster.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
//detail table services
import { erpitemattribute } from './../../../model/erpitemattribute.model';
import { erpitemattributeComponent } from './../../../pages/forms/erpitemattribute/erpitemattribute.component';
//FK services
import { erpitemimage } from './../../../model/erpitemimage.model';
import { erpitemimageComponent } from './../../../pages/forms/erpitemimage/erpitemimage.component';
//FK services
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
selector: 'app-erpitemmaster',
templateUrl: './erpitemmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpitemmasterComponent implements OnInit {
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
bfilterPopulateerpitemmasters:boolean=false;
dataerpitemmasterstype3:any=[];
dataerpitemmasterscategory3:any=[];
dataerpitemmasterssubcategory3:any=[];
dataerpitemmastersstockuom3:any=[];
dataerpitemmasterspurchaseuom3:any=[];
dataerpitemmasterssalesuom3:any=[];
dataerpitemmastersitemclass3:any=[];
dataerpitemmasterstrackingmode3:any=[];
dataerpitemmasterscostmode3:any=[];
dataerpitemmastersdepreciationtype3:any=[];
dataerpitemmasterspurchasetype3:any=[];
dataerpitemmastersweightuom3:any=[];
dataerpitemmastersitemstatus3:any=[];
dataerpitemattributesitemid3:any=[];
dataerpitemattributespriceprefix3:any=[];
dataerpitemattributesoptionid3:any=[];
dataerpitemattributesvalueid3:any=[];
bfilterPopulateerpitemattributes:boolean=false;
dataerpitemimagesitemid3:any=[];
bfilterPopulateerpitemimages:boolean=false;
@ViewChild('tblerpitemattributessource',{static:false}) tblerpitemattributessource: Ng2SmartTableComponent;
@ViewChild('tblerpitemimagessource',{static:false}) tblerpitemimagessource: Ng2SmartTableComponent;
 erpitemmasterForm: FormGroup;
typeList: boconfigvalue[];
categoryList: bomasterdata[];
subcategoryList: bosubcategorymaster[];
stockuomList: boconfigvalue[];
purchaseuomList: boconfigvalue[];
salesuomList: boconfigvalue[];
itemclassList: boconfigvalue[];
trackingmodeList: boconfigvalue[];
costmodeList: boconfigvalue[];
depreciationtypeList: boconfigvalue[];
purchasetypeList: boconfigvalue[];
weightuomList: boconfigvalue[];
itemstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpitemmastershowOption:boolean;
erpitemattributeshowOption:boolean;
erpitemimageshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpitemattributesvisiblelist:any;
erpitemattributeshidelist:any;
erpitemimagesvisiblelist:any;
erpitemimageshidelist:any;

DeletederpitemattributeIDs: string="";
erpitemattributesID: string = "1";
erpitemattributesselectedindex:any;
DeletederpitemimageIDs: string="";
erpitemimagesID: string = "2";
erpitemimagesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpitemmasterservice: erpitemmasterService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.erpitemmasterForm  = this.fb.group({
pk:[null],
itemid: [null],
itemcode: [null],
type: [null],
typedesc: [null],
category: [null],
categorydesc: [null],
subcategory: [null],
subcategorydesc: [null],
itemgroup: [null],
versionnumber: [null],
itemshortname: [null],
itemname: [null],
itemdescription: [null],
salesdescription: [null],
purchasedescription: [null],
brand: [null],
thumbnail: [null],
alternativeitems: [null],
stockuom: [null],
stockuomdesc: [null],
purchaseuom: [null],
purchaseuomdesc: [null],
salesuom: [null],
salesuomdesc: [null],
conversionlogic: [null],
itemclass: [null],
itemclassdesc: [null],
erpcode: [null],
trackingmode: [null],
trackingmodedesc: [null],
qcrequired: [null],
standardcurrency: [null],
standardcost: [null],
costmode: [null],
costmodedesc: [null],
openingstock: [null],
valuationrate: [null],
valuationmethod: [null],
standardsellingrate: [null],
isfixedasset: [null],
depreciationtype: [null],
depreciationtypedesc: [null],
depreciation: [null],
budgetenabled: [null],
estimatedlife: [null],
warrantyexpirydate: [null],
safetystock: [null],
reorderpoint: [null],
reorderquantity: [null],
maximumorderquantity: [null],
leadtime: [null],
raiseprs: [null],
purchasetype: [null],
purchasetypedesc: [null],
materialrequesttype: [null],
warehouses: [null],
sales: [null],
lastsaledate: [null],
lastsaleprice: [null],
purchase: [null],
lastpurchasedate: [null],
lastpurchaseprice: [null],
workorder: [null],
batchtracking: [null],
serialtracking: [null],
size: [null],
color: [null],
dimension: [null],
width: [null],
height: [null],
depth: [null],
weight: [null],
weightuom: [null],
weightuomdesc: [null],
drawingnumber: [null],
attributes: [null],
qtyinstock: [null],
avgmonthlyconsumption: [null],
tax1: [null],
tax2: [null],
tax1value: [null],
tax2value: [null],
qualityinspectionid: [null],
availabledate: [null],
itemstatus: [null],
itemstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpitemmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpitemmasterForm.dirty && this.erpitemmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.itemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.itemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.itemid && pkDetail) {
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
let erpitemmasterid = null;

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
this.formid=erpitemmasterid;
//this.sharedService.alert(erpitemmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpitemattributesTableConfig();
  setTimeout(() => {
  this.SeterpitemattributesTableddConfig();
  });

this.SeterpitemimagesTableConfig();
  setTimeout(() => {
  this.SeterpitemimagesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("itemtype").then(res => this.typeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("rs8fd").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
if(this.erpitemmasterservice.formData && this.erpitemmasterservice.formData.subcategory){this.erpitemmasterForm.patchValue({
    subcategory: this.erpitemmasterservice.formData.subcategory,
    subcategorydesc: this.erpitemmasterservice.formData.subcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("uom").then(res => this.stockuomList = res as boconfigvalue[]);
this.configservice.getList("uom").then(res => this.purchaseuomList = res as boconfigvalue[]);
this.configservice.getList("salesuom").then(res => this.salesuomList = res as boconfigvalue[]);
this.configservice.getList("inventoryclass").then(res => this.itemclassList = res as boconfigvalue[]);
this.configservice.getList("inventorytracking").then(res => this.trackingmodeList = res as boconfigvalue[]);
this.configservice.getList("inventorycostmode").then(res => this.costmodeList = res as boconfigvalue[]);
this.configservice.getList("depreciationtype").then(res => this.depreciationtypeList = res as boconfigvalue[]);
this.configservice.getList("purchasetype").then(res => this.purchasetypeList = res as boconfigvalue[]);
this.configservice.getList("uom").then(res => this.weightuomList = res as boconfigvalue[]);
this.configservice.getList("itemstatus").then(res => this.itemstatusList = res as boconfigvalue[]);

//autocomplete
    this.erpitemmasterservice.geterpitemmastersList().then(res => {
      this.pkList = res as erpitemmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.itemshortname;

//setting the flag that the screen is not touched 
this.erpitemmasterForm.markAsUntouched();
this.erpitemmasterForm.markAsPristine();
}



resetForm() {
if (this.erpitemmasterForm != null)
this.erpitemmasterForm.reset();
this.erpitemmasterForm.patchValue({
standardcurrency: this.sessiondata.currency,
});
setTimeout(() => {
this.erpitemmasterservice.erpitemattributes=[];
this.erpitemattributesLoadTable();
this.erpitemmasterservice.erpitemimages=[];
this.erpitemimagesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let itemid = this.erpitemmasterForm.get('itemid').value;
        if(itemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpitemmasterservice.deleteerpitemmaster(itemid).then(res =>
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
    this.erpitemmasterForm.patchValue({
        itemid: null
    });
    if(this.erpitemmasterservice.formData.itemid!=null)this.erpitemmasterservice.formData.itemid=null;
for (let i=0;i<this.erpitemmasterservice.erpitemattributes.length;i++) {
this.erpitemmasterservice.erpitemattributes[i].itemattributeid=null;
}
for (let i=0;i<this.erpitemmasterservice.erpitemimages.length;i++) {
this.erpitemmasterservice.erpitemimages[i].imageid=null;
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
        else if(key=="warrantyexpirydate")
this.erpitemmasterForm.patchValue({"warrantyexpirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastsaledate")
this.erpitemmasterForm.patchValue({"lastsaledate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastpurchasedate")
this.erpitemmasterForm.patchValue({"lastpurchasedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="availabledate")
this.erpitemmasterForm.patchValue({"availabledate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpitemmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpitemmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpitemmasterForm.controls[key]!=undefined)
{
this.erpitemmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.erpitemmasterservice.formData.itemshortname!=null )
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
typeonChange(evt:any){
let e=this.f.type.value as any;
this.erpitemmasterForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=evt.value;
this.erpitemmasterForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res => this.subcategoryList = res as bosubcategorymaster[]);
});
}
subcategoryonChange(evt:any){
let e=evt.value;
this.erpitemmasterForm.patchValue({subcategorydesc:evt.options[evt.options.selectedIndex].text});
}
stockuomonChange(evt:any){
let e=this.f.stockuom.value as any;
this.erpitemmasterForm.patchValue({stockuomdesc:evt.options[evt.options.selectedIndex].text});
}
purchaseuomonChange(evt:any){
let e=this.f.purchaseuom.value as any;
this.erpitemmasterForm.patchValue({purchaseuomdesc:evt.options[evt.options.selectedIndex].text});
}
salesuomonChange(evt:any){
let e=this.f.salesuom.value as any;
this.erpitemmasterForm.patchValue({salesuomdesc:evt.options[evt.options.selectedIndex].text});
}
itemclassonChange(evt:any){
let e=this.f.itemclass.value as any;
this.erpitemmasterForm.patchValue({itemclassdesc:evt.options[evt.options.selectedIndex].text});
}
trackingmodeonChange(evt:any){
let e=this.f.trackingmode.value as any;
this.erpitemmasterForm.patchValue({trackingmodedesc:evt.options[evt.options.selectedIndex].text});
}
costmodeonChange(evt:any){
let e=this.f.costmode.value as any;
this.erpitemmasterForm.patchValue({costmodedesc:evt.options[evt.options.selectedIndex].text});
}
depreciationtypeonChange(evt:any){
let e=this.f.depreciationtype.value as any;
this.erpitemmasterForm.patchValue({depreciationtypedesc:evt.options[evt.options.selectedIndex].text});
}
purchasetypeonChange(evt:any){
let e=this.f.purchasetype.value as any;
this.erpitemmasterForm.patchValue({purchasetypedesc:evt.options[evt.options.selectedIndex].text});
}
weightuomonChange(evt:any){
let e=this.f.weightuom.value as any;
this.erpitemmasterForm.patchValue({weightuomdesc:evt.options[evt.options.selectedIndex].text});
}
itemstatusonChange(evt:any){
let e=this.f.itemstatus.value as any;
this.erpitemmasterForm.patchValue({itemstatusdesc:evt.options[evt.options.selectedIndex].text});
}

editerpitemmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpitemmasterservice.geterpitemmastersByEID(pkcol).then(res => {

this.erpitemmasterservice.formData=res.erpitemmaster;
let formproperty=res.erpitemmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpitemmaster.pkcol;
this.formid=res.erpitemmaster.itemid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpitemmaster.itemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpitemmasterForm.patchValue({
itemid: res.erpitemmaster.itemid,
itemcode: res.erpitemmaster.itemcode,
type: res.erpitemmaster.type,
typedesc: res.erpitemmaster.typedesc,
category: res.erpitemmaster.category,
categorydesc: res.erpitemmaster.categorydesc,
subcategory: res.erpitemmaster.subcategory,
subcategorydesc: res.erpitemmaster.subcategorydesc,
itemgroup: res.erpitemmaster.itemgroup,
versionnumber: res.erpitemmaster.versionnumber,
itemshortname: res.erpitemmaster.itemshortname,
itemname: res.erpitemmaster.itemname,
itemdescription: res.erpitemmaster.itemdescription,
salesdescription: res.erpitemmaster.salesdescription,
purchasedescription: res.erpitemmaster.purchasedescription,
brand: res.erpitemmaster.brand,
thumbnail: res.erpitemmaster.thumbnail,
alternativeitems: res.erpitemmaster.alternativeitems,
stockuom: res.erpitemmaster.stockuom,
stockuomdesc: res.erpitemmaster.stockuomdesc,
purchaseuom: res.erpitemmaster.purchaseuom,
purchaseuomdesc: res.erpitemmaster.purchaseuomdesc,
salesuom: res.erpitemmaster.salesuom,
salesuomdesc: res.erpitemmaster.salesuomdesc,
conversionlogic: res.erpitemmaster.conversionlogic,
itemclass: res.erpitemmaster.itemclass,
itemclassdesc: res.erpitemmaster.itemclassdesc,
erpcode: res.erpitemmaster.erpcode,
trackingmode: res.erpitemmaster.trackingmode,
trackingmodedesc: res.erpitemmaster.trackingmodedesc,
qcrequired: res.erpitemmaster.qcrequired,
standardcurrency: res.erpitemmaster.standardcurrency,
standardcost: res.erpitemmaster.standardcost,
costmode: res.erpitemmaster.costmode,
costmodedesc: res.erpitemmaster.costmodedesc,
openingstock: res.erpitemmaster.openingstock,
valuationrate: res.erpitemmaster.valuationrate,
valuationmethod: res.erpitemmaster.valuationmethod,
standardsellingrate: res.erpitemmaster.standardsellingrate,
isfixedasset: res.erpitemmaster.isfixedasset,
depreciationtype: res.erpitemmaster.depreciationtype,
depreciationtypedesc: res.erpitemmaster.depreciationtypedesc,
depreciation: res.erpitemmaster.depreciation,
budgetenabled: res.erpitemmaster.budgetenabled,
estimatedlife: res.erpitemmaster.estimatedlife,
warrantyexpirydate: this.ngbDateParserFormatter.parse(res.erpitemmaster.warrantyexpirydate),
safetystock: res.erpitemmaster.safetystock,
reorderpoint: res.erpitemmaster.reorderpoint,
reorderquantity: res.erpitemmaster.reorderquantity,
maximumorderquantity: res.erpitemmaster.maximumorderquantity,
leadtime: res.erpitemmaster.leadtime,
raiseprs: res.erpitemmaster.raiseprs,
purchasetype: res.erpitemmaster.purchasetype,
purchasetypedesc: res.erpitemmaster.purchasetypedesc,
materialrequesttype: res.erpitemmaster.materialrequesttype,
warehouses: res.erpitemmaster.warehouses,
sales: res.erpitemmaster.sales,
lastsaledate: this.ngbDateParserFormatter.parse(res.erpitemmaster.lastsaledate),
lastsaleprice: res.erpitemmaster.lastsaleprice,
purchase: res.erpitemmaster.purchase,
lastpurchasedate: this.ngbDateParserFormatter.parse(res.erpitemmaster.lastpurchasedate),
lastpurchaseprice: res.erpitemmaster.lastpurchaseprice,
workorder: res.erpitemmaster.workorder,
batchtracking: res.erpitemmaster.batchtracking,
serialtracking: res.erpitemmaster.serialtracking,
size: res.erpitemmaster.size,
color: res.erpitemmaster.color,
dimension: res.erpitemmaster.dimension,
width: res.erpitemmaster.width,
height: res.erpitemmaster.height,
depth: res.erpitemmaster.depth,
weight: res.erpitemmaster.weight,
weightuom: res.erpitemmaster.weightuom,
weightuomdesc: res.erpitemmaster.weightuomdesc,
drawingnumber: res.erpitemmaster.drawingnumber,
attributes: res.erpitemmaster.attributes,
qtyinstock: res.erpitemmaster.qtyinstock,
avgmonthlyconsumption: res.erpitemmaster.avgmonthlyconsumption,
tax1: res.erpitemmaster.tax1,
tax2: res.erpitemmaster.tax2,
tax1value: res.erpitemmaster.tax1value,
tax2value: res.erpitemmaster.tax2value,
qualityinspectionid: res.erpitemmaster.qualityinspectionid,
availabledate: this.ngbDateParserFormatter.parse(res.erpitemmaster.availabledate),
itemstatus: res.erpitemmaster.itemstatus,
itemstatusdesc: res.erpitemmaster.itemstatusdesc,
status: res.erpitemmaster.status,
statusdesc: res.erpitemmaster.statusdesc,
});
this.erpitemattributesvisiblelist=res.erpitemattributesvisiblelist;
this.erpitemimagesvisiblelist=res.erpitemimagesvisiblelist;
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erpitemmasterservice.erpitemattributes = res.erpitemattributes;
this.SeterpitemattributesTableConfig();
this.erpitemattributesLoadTable();
  setTimeout(() => {
  this.SeterpitemattributesTableddConfig();
  });
this.erpitemmasterservice.erpitemimages = res.erpitemimages;
this.SeterpitemimagesTableConfig();
this.erpitemimagesLoadTable();
  setTimeout(() => {
  this.SeterpitemimagesTableddConfig();
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
  for (let key in this.erpitemmasterForm.controls) {
    if (this.erpitemmasterForm.controls[key] != null) {
if(false)
{
if(this.erpitemmasterservice.formData!=null && this.erpitemmasterservice.formData[key]!=null  && this.erpitemmasterservice.formData[key]!='[]' && this.erpitemmasterservice.formData[key]!=undefined && this.erpitemmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpitemmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpitemmasterservice.formData!=null && this.erpitemmasterservice.formData[key]!=null   && this.erpitemmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpitemmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpitemmasterservice.formData!=null && this.erpitemmasterservice.formData[key]!=null   && this.erpitemmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpitemmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpitemmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpitemmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpitemmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpitemmasterForm.value;
obj.warrantyexpirydate=new Date(this.erpitemmasterForm.get('warrantyexpirydate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('warrantyexpirydate').value)+'  UTC' :null);
obj.lastsaledate=new Date(this.erpitemmasterForm.get('lastsaledate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('lastsaledate').value)+'  UTC' :null);
obj.lastpurchasedate=new Date(this.erpitemmasterForm.get('lastpurchasedate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('lastpurchasedate').value)+'  UTC' :null);
obj.availabledate=new Date(this.erpitemmasterForm.get('availabledate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('availabledate').value)+'  UTC' :null);
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

private erpitemmastertoggleOption(){
this.erpitemmastershowOption = this.erpitemmastershowOption === true ? false : true;
}

private erpitemattributetoggleOption(){
this.erpitemattributeshowOption = this.erpitemattributeshowOption === true ? false : true;
}

private erpitemimagetoggleOption(){
this.erpitemimageshowOption = this.erpitemimageshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpitemmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpitemmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpitemmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpitemmasterservice.formData=this.erpitemmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpitemmasterForm.controls[key] != null)
    {
        this.erpitemmasterservice.formData[key] = this.erpitemmasterForm.controls[key].value;
    }
}
}
}
this.erpitemmasterservice.formData.warrantyexpirydate=new Date(this.erpitemmasterForm.get('warrantyexpirydate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('warrantyexpirydate').value)+'  UTC' :null);
this.erpitemmasterservice.formData.lastsaledate=new Date(this.erpitemmasterForm.get('lastsaledate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('lastsaledate').value)+'  UTC' :null);
this.erpitemmasterservice.formData.lastpurchasedate=new Date(this.erpitemmasterForm.get('lastpurchasedate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('lastpurchasedate').value)+'  UTC' :null);
this.erpitemmasterservice.formData.availabledate=new Date(this.erpitemmasterForm.get('availabledate').value ? this.ngbDateParserFormatter.format(this.erpitemmasterForm.get('availabledate').value)+'  UTC' :null);
this.erpitemmasterservice.formData.DeletederpitemattributeIDs = this.DeletederpitemattributeIDs;
this.erpitemmasterservice.formData.DeletederpitemimageIDs = this.DeletederpitemimageIDs;
console.log(this.erpitemmasterservice.formData);
this.erpitemmasterservice.formData=this.erpitemmasterForm.value;
this.erpitemmasterservice.saveOrUpdateerpitemmasters().subscribe(
async res => {
if (this.erpitemattributessource.data)
{
    for (let i = 0; i < this.erpitemattributessource.data.length; i++)
    {
        if (this.erpitemattributessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpitemattributessource.data[i].fileattachmentlist);
    }
}
if (this.erpitemimagessource.data)
{
    for (let i = 0; i < this.erpitemimagessource.data.length; i++)
    {
        if (this.erpitemimagessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpitemimagessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpitemmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpitemmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpitemmaster);
}
else
{
this.FillData(res);
}
}
this.erpitemmasterForm.markAsUntouched();
this.erpitemmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpitemmasterForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpitemmasterForm.get('subcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpitemattribute(event:any,itemattributeid:any, itemid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpitemattributeComponent, 
{
data:  {  showview:false,save:false,event,itemattributeid, itemid,visiblelist:this.erpitemattributesvisiblelist,  hidelist:this.erpitemattributeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpitemattributessource.add(res);
this.erpitemattributessource.refresh();
}
else
{
this.erpitemattributessource.update(event.data, res);
}
}
});
}

onDeleteerpitemattribute(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpitemattributeIDs += childID + ",";
this.erpitemmasterservice.erpitemattributes.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpitemimage(event:any,imageid:any, itemid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpitemimageComponent, 
{
data:  {  showview:false,save:false,event,imageid, itemid,visiblelist:this.erpitemimagesvisiblelist,  hidelist:this.erpitemimageshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpitemimagessource.add(res);
this.erpitemimagessource.refresh();
}
else
{
this.erpitemimagessource.update(event.data, res);
}
}
});
}

onDeleteerpitemimage(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpitemimageIDs += childID + ",";
this.erpitemmasterservice.erpitemimages.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpitemattributes
erpitemattributessettings:any;
erpitemattributessource: any;

showerpitemattributesCheckbox()
{
debugger;
if(this.tblerpitemattributessource.settings['selectMode']== 'multi')this.tblerpitemattributessource.settings['selectMode']= 'single';
else
this.tblerpitemattributessource.settings['selectMode']= 'multi';
this.tblerpitemattributessource.initGrid();
}
deleteerpitemattributesAll()
{
this.tblerpitemattributessource.settings['selectMode'] = 'single';
}
showerpitemattributesFilter()
{
  setTimeout(() => {
  this.SeterpitemattributesTableddConfig();
  });
      if(this.tblerpitemattributessource.settings!=null)this.tblerpitemattributessource.settings['hideSubHeader'] =!this.tblerpitemattributessource.settings['hideSubHeader'];
this.tblerpitemattributessource.initGrid();
}
showerpitemattributesInActive()
{
}
enableerpitemattributesInActive()
{
}
async SeterpitemattributesTableddConfig()
{
if(!this.bfilterPopulateerpitemattributes){
}
this.bfilterPopulateerpitemattributes=true;
}
async erpitemattributesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpitemattributesTableConfig()
{
this.erpitemattributessettings = {
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
optionid: {
title: 'Option',
type: 'number',
filter:true,
},
valueid: {
title: 'Value',
type: 'number',
filter:true,
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
priceprefix: {
title: 'Price Prefix',
type: '',
filter:true,
},
},
};
}
erpitemattributesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitemattributesID)>=0)
{
this.erpitemattributessource=new LocalDataSource();
this.erpitemattributessource.load(this.erpitemmasterservice.erpitemattributes as  any as LocalDataSource);
this.erpitemattributessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpitemattributesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpitemmasterservice.erpitemattributes.length == 0)
{
    this.tblerpitemattributessource.grid.createFormShown = true;
}
else
{
    let obj = new erpitemattribute();
    this.erpitemmasterservice.erpitemattributes.push(obj);
    this.erpitemattributessource.refresh();
    if ((this.erpitemmasterservice.erpitemattributes.length / this.erpitemattributessource.getPaging().perPage).toFixed(0) + 1 != this.erpitemattributessource.getPaging().page)
    {
        this.erpitemattributessource.setPage((this.erpitemmasterservice.erpitemattributes.length / this.erpitemattributessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpitemattributessource.grid.edit(this.tblerpitemattributessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpitemattributessource.data.indexOf(event.data);
this.onDeleteerpitemattribute(event,event.data.itemattributeid,((this.erpitemattributessource.getPaging().page-1) *this.erpitemattributessource.getPaging().perPage)+index);
this.erpitemattributessource.refresh();
break;
}
}

*/
erpitemattributesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpitemattribute(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpitemattribute(event,event.data.itemattributeid,this.formid);
break;
case 'delete':
this.onDeleteerpitemattribute(event,event.data.itemattributeid,((this.erpitemattributessource.getPaging().page-1) *this.erpitemattributessource.getPaging().perPage)+event.index);
this.erpitemattributessource.refresh();
break;
}
}
erpitemattributesonDelete(obj) {
let itemattributeid=obj.data.itemattributeid;
if (confirm('Are you sure to delete this record ?')) {
this.erpitemmasterservice.deleteerpitemmaster(itemattributeid).then(res=>
this.erpitemattributesLoadTable()
);
}
}
erpitemattributesPaging(val)
{
debugger;
this.erpitemattributessource.setPaging(1, val, true);
}

handleerpitemattributesGridSelected(event:any) {
this.erpitemattributesselectedindex=this.erpitemmasterservice.erpitemattributes.findIndex(i => i.itemattributeid === event.data.itemattributeid);
}
IserpitemattributesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitemattributesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpitemattributes
//start of Grid Codes erpitemimages
erpitemimagessettings:any;
erpitemimagessource: any;

showerpitemimagesCheckbox()
{
debugger;
if(this.tblerpitemimagessource.settings['selectMode']== 'multi')this.tblerpitemimagessource.settings['selectMode']= 'single';
else
this.tblerpitemimagessource.settings['selectMode']= 'multi';
this.tblerpitemimagessource.initGrid();
}
deleteerpitemimagesAll()
{
this.tblerpitemimagessource.settings['selectMode'] = 'single';
}
showerpitemimagesFilter()
{
  setTimeout(() => {
  this.SeterpitemimagesTableddConfig();
  });
      if(this.tblerpitemimagessource.settings!=null)this.tblerpitemimagessource.settings['hideSubHeader'] =!this.tblerpitemimagessource.settings['hideSubHeader'];
this.tblerpitemimagessource.initGrid();
}
showerpitemimagesInActive()
{
}
enableerpitemimagesInActive()
{
}
async SeterpitemimagesTableddConfig()
{
if(!this.bfilterPopulateerpitemimages){
}
this.bfilterPopulateerpitemimages=true;
}
async erpitemimagesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpitemimagesTableConfig()
{
this.erpitemimagessettings = {
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
image: {
title: 'Image',
type: '',
filter:true,
},
htmlcontent: {
title: 'Htmlcontent',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
sortorder: {
title: 'Sort Order',
type: 'number',
filter:true,
},
},
};
}
erpitemimagesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitemimagesID)>=0)
{
this.erpitemimagessource=new LocalDataSource();
this.erpitemimagessource.load(this.erpitemmasterservice.erpitemimages as  any as LocalDataSource);
this.erpitemimagessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpitemimagesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpitemmasterservice.erpitemimages.length == 0)
{
    this.tblerpitemimagessource.grid.createFormShown = true;
}
else
{
    let obj = new erpitemimage();
    this.erpitemmasterservice.erpitemimages.push(obj);
    this.erpitemimagessource.refresh();
    if ((this.erpitemmasterservice.erpitemimages.length / this.erpitemimagessource.getPaging().perPage).toFixed(0) + 1 != this.erpitemimagessource.getPaging().page)
    {
        this.erpitemimagessource.setPage((this.erpitemmasterservice.erpitemimages.length / this.erpitemimagessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpitemimagessource.grid.edit(this.tblerpitemimagessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpitemimagessource.data.indexOf(event.data);
this.onDeleteerpitemimage(event,event.data.imageid,((this.erpitemimagessource.getPaging().page-1) *this.erpitemimagessource.getPaging().perPage)+index);
this.erpitemimagessource.refresh();
break;
}
}

*/
erpitemimagesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpitemimage(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpitemimage(event,event.data.imageid,this.formid);
break;
case 'delete':
this.onDeleteerpitemimage(event,event.data.imageid,((this.erpitemimagessource.getPaging().page-1) *this.erpitemimagessource.getPaging().perPage)+event.index);
this.erpitemimagessource.refresh();
break;
}
}
erpitemimagesonDelete(obj) {
let imageid=obj.data.imageid;
if (confirm('Are you sure to delete this record ?')) {
this.erpitemmasterservice.deleteerpitemmaster(imageid).then(res=>
this.erpitemimagesLoadTable()
);
}
}
erpitemimagesPaging(val)
{
debugger;
this.erpitemimagessource.setPaging(1, val, true);
}

handleerpitemimagesGridSelected(event:any) {
this.erpitemimagesselectedindex=this.erpitemmasterservice.erpitemimages.findIndex(i => i.imageid === event.data.imageid);
}
IserpitemimagesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitemimagesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpitemimages

}



