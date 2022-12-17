import { erpsupplierpackingitemService } from './../../../service/erpsupplierpackingitem.service';
import { erpsupplierpackingitem } from './../../../model/erpsupplierpackingitem.model';
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
import { erpsupplierpackingmaster} from './../../../model/erpsupplierpackingmaster.model';
import { erpsupplierpackingmasterComponent } from './../../../pages/forms/erpsupplierpackingmaster/erpsupplierpackingmaster.component';
import { erpsupplierpackingmasterService } from './../../../service/erpsupplierpackingmaster.service';
//popups
import { erpsupplierpackingdetail} from './../../../model/erpsupplierpackingdetail.model';
import { erpsupplierpackingdetailComponent } from './../../../pages/forms/erpsupplierpackingdetail/erpsupplierpackingdetail.component';
import { erpsupplierpackingdetailService } from './../../../service/erpsupplierpackingdetail.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erpsupplierpackingitem',
templateUrl: './erpsupplierpackingitem.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierpackingitemComponent implements OnInit {
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
bfilterPopulateerpsupplierpackingitems:boolean=false;
dataerpsupplierpackingitemspoid3:any=[];
dataerpsupplierpackingitemssupplierpkgid3:any=[];
dataerpsupplierpackingitemssupplierpkgdetailid3:any=[];
dataerpsupplierpackingitemsitemid3:any=[];
dataerpsupplierpackingitemsuom3:any=[];
 erpsupplierpackingitemForm: FormGroup;
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
supplierpkgdetailidList: erpsupplierpackingdetail[];
supplierpkgdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsForm: FormGroup;//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsoptions:any;//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierpackingitemshowOption:boolean;
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
private erpsupplierpackingitemservice: erpsupplierpackingitemService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erpsupplierpackingmasterservice:erpsupplierpackingmasterService,
private erpsupplierpackingdetailservice:erpsupplierpackingdetailService,
private erpitemmasterservice:erpitemmasterService,
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
this.erpsupplierpackingitemForm  = this.fb.group({
pk:[null],
poid: [null],
poiddesc: [null],
supplierpkgid: [null],
supplierpkgiddesc: [null],
supplierpkgdetailid: [null],
supplierpkgdetailiddesc: [null],
supplierpkgitemid: [null],
itemid: [null],
itemiddesc: [null],
uom: [null],
uomdesc: [null],
qty: [null],
serialbatch: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierpackingitemForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierpackingitemForm.dirty && this.erpsupplierpackingitemForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplierpkgitemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplierpkgitemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplierpkgitemid && pkDetail) {
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
let erpsupplierpackingitemid = null;

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
this.formid=erpsupplierpackingitemid;
//this.sharedService.alert(erpsupplierpackingitemid);

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
if(this.erpsupplierpackingitemservice.formData && this.erpsupplierpackingitemservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erpsupplierpackingitemForm.patchValue({
    poid: this.erpsupplierpackingitemservice.formData.poid,
    poiddesc: this.erpsupplierpackingitemservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erpsupplierpackingitemForm.get('poid').value);
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
if(this.erpsupplierpackingitemservice.formData && this.erpsupplierpackingitemservice.formData.supplierpkgid){
this.supplierpkgidoptionsEvent.emit(this.supplierpkgidList);
this.erpsupplierpackingitemForm.patchValue({
    supplierpkgid: this.erpsupplierpackingitemservice.formData.supplierpkgid,
    supplierpkgiddesc: this.erpsupplierpackingitemservice.formData.supplierpkgiddesc,
});
}
{
let arrsupplierpkgid = this.supplierpkgidList.filter(v => v.supplierpkgid == this.erpsupplierpackingitemForm.get('supplierpkgid').value);
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
this.erpsupplierpackingdetailservice.geterpsupplierpackingdetailsList().then(res => 
{
this.supplierpkgdetailidList = res as erpsupplierpackingdetail[];
if(this.erpsupplierpackingitemservice.formData && this.erpsupplierpackingitemservice.formData.supplierpkgdetailid){
this.supplierpkgdetailidoptionsEvent.emit(this.supplierpkgdetailidList);
this.erpsupplierpackingitemForm.patchValue({
    supplierpkgdetailid: this.erpsupplierpackingitemservice.formData.supplierpkgdetailid,
    supplierpkgdetailiddesc: this.erpsupplierpackingitemservice.formData.supplierpkgdetailiddesc,
});
}
{
let arrsupplierpkgdetailid = this.supplierpkgdetailidList.filter(v => v.supplierpkgdetailid == this.erpsupplierpackingitemForm.get('supplierpkgdetailid').value);
let objsupplierpkgdetailid;
if (arrsupplierpkgdetailid.length > 0) objsupplierpkgdetailid = arrsupplierpkgdetailid[0];
if (objsupplierpkgdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierpkgdetailid_erpsupplierpackingdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierpkgdetailidList.filter(v => v.cartonnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierpkgdetailid_erpsupplierpackingdetailsformatter = (result: any) => result.cartonnumber;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpsupplierpackingitemservice.formData && this.erpsupplierpackingitemservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpsupplierpackingitemForm.patchValue({
    itemid: this.erpsupplierpackingitemservice.formData.itemid,
    itemiddesc: this.erpsupplierpackingitemservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpsupplierpackingitemForm.get('itemid').value);
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
: this.itemidList.filter(v => v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemshortname;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierpackingitemservice.geterpsupplierpackingitemsList().then(res => {
      this.pkList = res as erpsupplierpackingitem[];
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
this.erpsupplierpackingitemForm.markAsUntouched();
this.erpsupplierpackingitemForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erpsupplierpackingitemForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierpkgid(supplierpkgidDetail: any) {
if (supplierpkgidDetail.supplierpkgid && supplierpkgidDetail) {
this.erpsupplierpackingitemForm.patchValue({
supplierpkgid: supplierpkgidDetail.supplierpkgid,
supplierpkgiddesc: supplierpkgidDetail.packinglotnumber,

});

}
}

onSelectedsupplierpkgdetailid(supplierpkgdetailidDetail: any) {
if (supplierpkgdetailidDetail.supplierpkgdetailid && supplierpkgdetailidDetail) {
this.erpsupplierpackingitemForm.patchValue({
supplierpkgdetailid: supplierpkgdetailidDetail.supplierpkgdetailid,
supplierpkgdetailiddesc: supplierpkgdetailidDetail.cartonnumber,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpsupplierpackingitemForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemshortname,

});

}
}




resetForm() {
if (this.erpsupplierpackingitemForm != null)
this.erpsupplierpackingitemForm.reset();
this.erpsupplierpackingitemForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplierpkgitemid = this.erpsupplierpackingitemForm.get('supplierpkgitemid').value;
        if(supplierpkgitemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierpackingitemservice.deleteerpsupplierpackingitem(supplierpkgitemid).then(res =>
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
    this.erpsupplierpackingitemForm.patchValue({
        supplierpkgitemid: null
    });
    if(this.erpsupplierpackingitemservice.formData.supplierpkgitemid!=null)this.erpsupplierpackingitemservice.formData.supplierpkgitemid=null;
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
this.erpsupplierpackingitemForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierpackingitemForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierpackingitemForm.controls[key]!=undefined)
{
this.erpsupplierpackingitemForm.controls[key].disable({onlySelf: true});
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
supplierpkgidonChange(evt:any){
let e=evt.value;
}
supplierpkgdetailidonChange(evt:any){
let e=evt.value;
}
supplierpkgitemidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpsupplierpackingitemForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
qtyonChange(evt:any){
let e=evt.value;
}
serialbatchonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierpackingitems() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierpackingitemservice.geterpsupplierpackingitemsByEID(pkcol).then(res => {

this.erpsupplierpackingitemservice.formData=res.erpsupplierpackingitem;
let formproperty=res.erpsupplierpackingitem.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierpackingitem.pkcol;
this.formid=res.erpsupplierpackingitem.supplierpkgitemid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierpackingitem.supplierpkgitemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierpackingitemForm.patchValue({
poid: res.erpsupplierpackingitem.poid,
poiddesc: res.erpsupplierpackingitem.poiddesc,
supplierpkgid: res.erpsupplierpackingitem.supplierpkgid,
supplierpkgiddesc: res.erpsupplierpackingitem.supplierpkgiddesc,
supplierpkgdetailid: res.erpsupplierpackingitem.supplierpkgdetailid,
supplierpkgdetailiddesc: res.erpsupplierpackingitem.supplierpkgdetailiddesc,
supplierpkgitemid: res.erpsupplierpackingitem.supplierpkgitemid,
itemid: res.erpsupplierpackingitem.itemid,
itemiddesc: res.erpsupplierpackingitem.itemiddesc,
uom: res.erpsupplierpackingitem.uom,
uomdesc: res.erpsupplierpackingitem.uomdesc,
qty: res.erpsupplierpackingitem.qty,
serialbatch: res.erpsupplierpackingitem.serialbatch,
status: res.erpsupplierpackingitem.status,
statusdesc: res.erpsupplierpackingitem.statusdesc,
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
  for (let key in this.erpsupplierpackingitemForm.controls) {
    if (this.erpsupplierpackingitemForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierpackingitemservice.formData!=null && this.erpsupplierpackingitemservice.formData[key]!=null  && this.erpsupplierpackingitemservice.formData[key]!='[]' && this.erpsupplierpackingitemservice.formData[key]!=undefined && this.erpsupplierpackingitemservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierpackingitemservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierpackingitemservice.formData!=null && this.erpsupplierpackingitemservice.formData[key]!=null   && this.erpsupplierpackingitemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierpackingitemservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierpackingitemservice.formData!=null && this.erpsupplierpackingitemservice.formData[key]!=null   && this.erpsupplierpackingitemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierpackingitemservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierpackingitemservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierpackingitemForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierpackingitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierpackingitemForm.value;
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

private erpsupplierpackingitemtoggleOption(){
this.erpsupplierpackingitemshowOption = this.erpsupplierpackingitemshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierpackingitemForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierpackingitemForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierpackingitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierpackingitemservice.formData=this.erpsupplierpackingitemForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierpackingitemForm.controls[key] != null)
    {
        this.erpsupplierpackingitemservice.formData[key] = this.erpsupplierpackingitemForm.controls[key].value;
    }
}
}
}
console.log(this.erpsupplierpackingitemservice.formData);
this.erpsupplierpackingitemservice.formData=this.erpsupplierpackingitemForm.value;
this.erpsupplierpackingitemservice.saveOrUpdateerpsupplierpackingitems().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingitem);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierpackingitemservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingitem);
}
else
{
this.FillData(res);
}
}
this.erpsupplierpackingitemForm.markAsUntouched();
this.erpsupplierpackingitemForm.markAsPristine();
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
data: {poid:this.erpsupplierpackingitemForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierpkgid( supplierpkgid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierpackingmasterComponent, 
{
data: {supplierpkgid:this.erpsupplierpackingitemForm.get('supplierpkgid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierpkgdetailid( supplierpkgdetailid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierpackingdetailComponent, 
{
data: {supplierpkgdetailid:this.erpsupplierpackingitemForm.get('supplierpkgdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpsupplierpackingitemForm.get('itemid').value, ScreenType:2 }
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



