import { erpgoodsreceiptdetailService } from './../../../service/erpgoodsreceiptdetail.service';
import { erpgoodsreceiptdetail } from './../../../model/erpgoodsreceiptdetail.model';
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
import { erpgoodsreceiptmaster} from './../../../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from './../../../pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { bolocation} from '../../../../../../n-tire-bo-app/src/app/model/bolocation.model';
import { bolocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bolocation/bolocation.component';
import { bolocationService } from '../../../../../../n-tire-bo-app/src/app/service/bolocation.service';
//popups
import { erpsupplierinvoice} from './../../../model/erpsupplierinvoice.model';
import { erpsupplierinvoiceComponent } from './../../../pages/forms/erpsupplierinvoice/erpsupplierinvoice.component';
import { erpsupplierinvoiceService } from './../../../service/erpsupplierinvoice.service';
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
selector: 'app-erpgoodsreceiptdetail',
templateUrl: './erpgoodsreceiptdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpgoodsreceiptdetailComponent implements OnInit {
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
bfilterPopulateerpgoodsreceiptdetails:boolean=false;
dataerpgoodsreceiptdetailsgrnid3:any=[];
dataerpgoodsreceiptdetailsitemid3:any=[];
dataerpgoodsreceiptdetailsuom3:any=[];
dataerpgoodsreceiptdetailsstoragelocationid3:any=[];
dataerpgoodsreceiptdetailssupplierinvoiceid3:any=[];
 erpgoodsreceiptdetailForm: FormGroup;
grnidList: erpgoodsreceiptmaster[];
grnidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnid_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnid_erpgoodsreceiptmastersoptions:any;//autocomplete
grnid_erpgoodsreceiptmastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
storagelocationidList: bolocation[];
storagelocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
storagelocationid_bolocationsForm: FormGroup;//autocomplete
storagelocationid_bolocationsoptions:any;//autocomplete
storagelocationid_bolocationsformatter:any;//autocomplete
supplierinvoiceidList: erpsupplierinvoice[];
supplierinvoiceidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierinvoiceid_erpsupplierinvoicesForm: FormGroup;//autocomplete
supplierinvoiceid_erpsupplierinvoicesoptions:any;//autocomplete
supplierinvoiceid_erpsupplierinvoicesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpgoodsreceiptdetailshowOption:boolean;
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
private erpgoodsreceiptdetailservice: erpgoodsreceiptdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpgoodsreceiptmasterservice:erpgoodsreceiptmasterService,
private erpitemmasterservice:erpitemmasterService,
private bolocationservice:bolocationService,
private erpsupplierinvoiceservice:erpsupplierinvoiceService,
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
this.erpgoodsreceiptdetailForm  = this.fb.group({
pk:[null],
branchid: [null],
grnid: [null],
grniddesc: [null],
grndetailsid: [null],
itemid: [null],
itemiddesc: [null],
uom: [null],
uomdesc: [null],
popendingqty: [null],
deliveredqty: [null],
storagelocationid: [null],
storagelocationiddesc: [null],
storagedetails: [null],
rejectedqty: [null],
acceptedqty: [null],
invoicedqty: [null],
invoicedamount: [null],
supplierinvoiceid: [null],
supplierinvoiceiddesc: [null],
supplierinvoiceqty: [null],
supplierinvoiceamount: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpgoodsreceiptdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpgoodsreceiptdetailForm.dirty && this.erpgoodsreceiptdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.grndetailsid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.grndetailsid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.grndetailsid && pkDetail) {
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
let erpgoodsreceiptdetailid = null;

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
this.formid=erpgoodsreceiptdetailid;
//this.sharedService.alert(erpgoodsreceiptdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => 
{
this.grnidList = res as erpgoodsreceiptmaster[];
if(this.erpgoodsreceiptdetailservice.formData && this.erpgoodsreceiptdetailservice.formData.grnid){
this.grnidoptionsEvent.emit(this.grnidList);
this.erpgoodsreceiptdetailForm.patchValue({
    grnid: this.erpgoodsreceiptdetailservice.formData.grnid,
    grniddesc: this.erpgoodsreceiptdetailservice.formData.grniddesc,
});
}
{
let arrgrnid = this.grnidList.filter(v => v.grnid == this.erpgoodsreceiptdetailForm.get('grnid').value);
let objgrnid;
if (arrgrnid.length > 0) objgrnid = arrgrnid[0];
if (objgrnid)
{
}
}
}
).catch((err) => {console.log(err);});
this.grnid_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnidList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnid_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpgoodsreceiptdetailservice.formData && this.erpgoodsreceiptdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpgoodsreceiptdetailForm.patchValue({
    itemid: this.erpgoodsreceiptdetailservice.formData.itemid,
    itemiddesc: this.erpgoodsreceiptdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpgoodsreceiptdetailForm.get('itemid').value);
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
this.bolocationservice.getbolocationsList().then(res => 
{
this.storagelocationidList = res as bolocation[];
if(this.erpgoodsreceiptdetailservice.formData && this.erpgoodsreceiptdetailservice.formData.storagelocationid){
this.storagelocationidoptionsEvent.emit(this.storagelocationidList);
this.erpgoodsreceiptdetailForm.patchValue({
    storagelocationid: this.erpgoodsreceiptdetailservice.formData.storagelocationid,
    storagelocationiddesc: this.erpgoodsreceiptdetailservice.formData.storagelocationiddesc,
});
}
{
let arrstoragelocationid = this.storagelocationidList.filter(v => v.locationid == this.erpgoodsreceiptdetailForm.get('storagelocationid').value);
let objstoragelocationid;
if (arrstoragelocationid.length > 0) objstoragelocationid = arrstoragelocationid[0];
if (objstoragelocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.storagelocationid_bolocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.storagelocationidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.storagelocationid_bolocationsformatter = (result: any) => result.name;
this.erpsupplierinvoiceservice.geterpsupplierinvoicesList().then(res => 
{
this.supplierinvoiceidList = res as erpsupplierinvoice[];
if(this.erpgoodsreceiptdetailservice.formData && this.erpgoodsreceiptdetailservice.formData.supplierinvoiceid){
this.supplierinvoiceidoptionsEvent.emit(this.supplierinvoiceidList);
this.erpgoodsreceiptdetailForm.patchValue({
    supplierinvoiceid: this.erpgoodsreceiptdetailservice.formData.supplierinvoiceid,
    supplierinvoiceiddesc: this.erpgoodsreceiptdetailservice.formData.supplierinvoiceiddesc,
});
}
{
let arrsupplierinvoiceid = this.supplierinvoiceidList.filter(v => v.invoiceid == this.erpgoodsreceiptdetailForm.get('supplierinvoiceid').value);
let objsupplierinvoiceid;
if (arrsupplierinvoiceid.length > 0) objsupplierinvoiceid = arrsupplierinvoiceid[0];
if (objsupplierinvoiceid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierinvoiceid_erpsupplierinvoicesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierinvoiceidList.filter(v => v.salesorderreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierinvoiceid_erpsupplierinvoicesformatter = (result: any) => result.salesorderreference;

//autocomplete
    this.erpgoodsreceiptdetailservice.geterpgoodsreceiptdetailsList().then(res => {
      this.pkList = res as erpgoodsreceiptdetail[];
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
this.erpgoodsreceiptdetailForm.markAsUntouched();
this.erpgoodsreceiptdetailForm.markAsPristine();
}
onSelectedgrnid(grnidDetail: any) {
if (grnidDetail.grnid && grnidDetail) {
this.erpgoodsreceiptdetailForm.patchValue({
grnid: grnidDetail.grnid,
grniddesc: grnidDetail.grnnumber,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpgoodsreceiptdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemshortname,

});

}
}

onSelectedstoragelocationid(storagelocationidDetail: any) {
if (storagelocationidDetail.locationid && storagelocationidDetail) {
this.erpgoodsreceiptdetailForm.patchValue({
storagelocationid: storagelocationidDetail.locationid,
storagelocationiddesc: storagelocationidDetail.name,

});

}
}

onSelectedsupplierinvoiceid(supplierinvoiceidDetail: any) {
if (supplierinvoiceidDetail.invoiceid && supplierinvoiceidDetail) {
this.erpgoodsreceiptdetailForm.patchValue({
supplierinvoiceid: supplierinvoiceidDetail.invoiceid,
supplierinvoiceiddesc: supplierinvoiceidDetail.salesorderreference,

});

}
}




resetForm() {
if (this.erpgoodsreceiptdetailForm != null)
this.erpgoodsreceiptdetailForm.reset();
this.erpgoodsreceiptdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let grndetailsid = this.erpgoodsreceiptdetailForm.get('grndetailsid').value;
        if(grndetailsid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpgoodsreceiptdetailservice.deleteerpgoodsreceiptdetail(grndetailsid).then(res =>
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
    this.erpgoodsreceiptdetailForm.patchValue({
        grndetailsid: null
    });
    if(this.erpgoodsreceiptdetailservice.formData.grndetailsid!=null)this.erpgoodsreceiptdetailservice.formData.grndetailsid=null;
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
this.erpgoodsreceiptdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpgoodsreceiptdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpgoodsreceiptdetailForm.controls[key]!=undefined)
{
this.erpgoodsreceiptdetailForm.controls[key].disable({onlySelf: true});
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
grnidonChange(evt:any){
let e=evt.value;
}
grndetailsidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpgoodsreceiptdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
popendingqtyonChange(evt:any){
let e=evt.value;
}
deliveredqtyonChange(evt:any){
let e=evt.value;
}
storagelocationidonChange(evt:any){
let e=evt.value;
}
storagedetailsonChange(evt:any){
let e=evt.value;
}
rejectedqtyonChange(evt:any){
let e=evt.value;
}
acceptedqtyonChange(evt:any){
let e=evt.value;
}
invoicedqtyonChange(evt:any){
let e=evt.value;
}
invoicedamountonChange(evt:any){
let e=evt.value;
}
supplierinvoiceidonChange(evt:any){
let e=evt.value;
}
supplierinvoiceqtyonChange(evt:any){
let e=evt.value;
}
supplierinvoiceamountonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpgoodsreceiptdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpgoodsreceiptdetailservice.geterpgoodsreceiptdetailsByEID(pkcol).then(res => {

this.erpgoodsreceiptdetailservice.formData=res.erpgoodsreceiptdetail;
let formproperty=res.erpgoodsreceiptdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpgoodsreceiptdetail.pkcol;
this.formid=res.erpgoodsreceiptdetail.grndetailsid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpgoodsreceiptdetail.grndetailsid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpgoodsreceiptdetailForm.patchValue({
branchid: res.erpgoodsreceiptdetail.branchid,
grnid: res.erpgoodsreceiptdetail.grnid,
grniddesc: res.erpgoodsreceiptdetail.grniddesc,
grndetailsid: res.erpgoodsreceiptdetail.grndetailsid,
itemid: res.erpgoodsreceiptdetail.itemid,
itemiddesc: res.erpgoodsreceiptdetail.itemiddesc,
uom: res.erpgoodsreceiptdetail.uom,
uomdesc: res.erpgoodsreceiptdetail.uomdesc,
popendingqty: res.erpgoodsreceiptdetail.popendingqty,
deliveredqty: res.erpgoodsreceiptdetail.deliveredqty,
storagelocationid: res.erpgoodsreceiptdetail.storagelocationid,
storagelocationiddesc: res.erpgoodsreceiptdetail.storagelocationiddesc,
storagedetails: res.erpgoodsreceiptdetail.storagedetails,
rejectedqty: res.erpgoodsreceiptdetail.rejectedqty,
acceptedqty: res.erpgoodsreceiptdetail.acceptedqty,
invoicedqty: res.erpgoodsreceiptdetail.invoicedqty,
invoicedamount: res.erpgoodsreceiptdetail.invoicedamount,
supplierinvoiceid: res.erpgoodsreceiptdetail.supplierinvoiceid,
supplierinvoiceiddesc: res.erpgoodsreceiptdetail.supplierinvoiceiddesc,
supplierinvoiceqty: res.erpgoodsreceiptdetail.supplierinvoiceqty,
supplierinvoiceamount: res.erpgoodsreceiptdetail.supplierinvoiceamount,
remarks: res.erpgoodsreceiptdetail.remarks,
status: res.erpgoodsreceiptdetail.status,
statusdesc: res.erpgoodsreceiptdetail.statusdesc,
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
  for (let key in this.erpgoodsreceiptdetailForm.controls) {
    if (this.erpgoodsreceiptdetailForm.controls[key] != null) {
if(false)
{
if(this.erpgoodsreceiptdetailservice.formData!=null && this.erpgoodsreceiptdetailservice.formData[key]!=null  && this.erpgoodsreceiptdetailservice.formData[key]!='[]' && this.erpgoodsreceiptdetailservice.formData[key]!=undefined && this.erpgoodsreceiptdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpgoodsreceiptdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpgoodsreceiptdetailservice.formData!=null && this.erpgoodsreceiptdetailservice.formData[key]!=null   && this.erpgoodsreceiptdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpgoodsreceiptdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpgoodsreceiptdetailservice.formData!=null && this.erpgoodsreceiptdetailservice.formData[key]!=null   && this.erpgoodsreceiptdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpgoodsreceiptdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpgoodsreceiptdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpgoodsreceiptdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpgoodsreceiptdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpgoodsreceiptdetailForm.value;
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

private erpgoodsreceiptdetailtoggleOption(){
this.erpgoodsreceiptdetailshowOption = this.erpgoodsreceiptdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpgoodsreceiptdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpgoodsreceiptdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpgoodsreceiptdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpgoodsreceiptdetailservice.formData=this.erpgoodsreceiptdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpgoodsreceiptdetailForm.controls[key] != null)
    {
        this.erpgoodsreceiptdetailservice.formData[key] = this.erpgoodsreceiptdetailForm.controls[key].value;
    }
}
}
}
console.log(this.erpgoodsreceiptdetailservice.formData);
this.erpgoodsreceiptdetailservice.formData=this.erpgoodsreceiptdetailForm.value;
this.erpgoodsreceiptdetailservice.saveOrUpdateerpgoodsreceiptdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpgoodsreceiptdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpgoodsreceiptdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpgoodsreceiptdetail);
}
else
{
this.FillData(res);
}
}
this.erpgoodsreceiptdetailForm.markAsUntouched();
this.erpgoodsreceiptdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditgrnid( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.erpgoodsreceiptdetailForm.get('grnid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpgoodsreceiptdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstoragelocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bolocationComponent, 
{
data: {locationid:this.erpgoodsreceiptdetailForm.get('storagelocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierinvoiceid( invoiceid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierinvoiceComponent, 
{
data: {invoiceid:this.erpgoodsreceiptdetailForm.get('supplierinvoiceid').value, ScreenType:2 }
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



