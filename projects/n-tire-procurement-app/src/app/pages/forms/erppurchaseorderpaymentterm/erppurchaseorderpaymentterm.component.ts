import { erppurchaseorderpaymenttermService } from './../../../service/erppurchaseorderpaymentterm.service';
import { erppurchaseorderpaymentterm } from './../../../model/erppurchaseorderpaymentterm.model';
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
import { erprfqmaster} from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
//popups
import { erpsupplierquotationmaster} from './../../../model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from './../../../pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
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
selector: 'app-erppurchaseorderpaymentterm',
templateUrl: './erppurchaseorderpaymentterm.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erppurchaseorderpaymenttermComponent implements OnInit {
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
bfilterPopulateerppurchaseorderpaymentterms:boolean=false;
dataerppurchaseorderpaymenttermspoid3:any=[];
dataerppurchaseorderpaymenttermsrfqid3:any=[];
dataerppurchaseorderpaymenttermsquoteid3:any=[];
dataerppurchaseorderpaymenttermspaymenttermtype3:any=[];
 erppurchaseorderpaymenttermForm: FormGroup;
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
quoteidList: erpsupplierquotationmaster[];
quoteidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
quoteid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
quoteid_erpsupplierquotationmastersoptions:any;//autocomplete
quoteid_erpsupplierquotationmastersformatter:any;//autocomplete
paymenttermtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erppurchaseorderpaymenttermshowOption:boolean;
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
private erppurchaseorderpaymenttermservice: erppurchaseorderpaymenttermService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erppurchaseordermasterservice:erppurchaseordermasterService,
private erprfqmasterservice:erprfqmasterService,
private erpsupplierquotationmasterservice:erpsupplierquotationmasterService,
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
this.erppurchaseorderpaymenttermForm  = this.fb.group({
pk:[null],
poid: [null],
poiddesc: [null],
customerid: [null],
rfqid: [null],
rfqiddesc: [null],
quoteid: [null],
quoteiddesc: [null],
paytermid: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
percentage: [null],
description: [null],
currency: [null],
amount: [null],
approvalremarks: [null],
apid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erppurchaseorderpaymenttermForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erppurchaseorderpaymenttermForm.dirty && this.erppurchaseorderpaymenttermForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.paytermid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.paytermid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.paytermid && pkDetail) {
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
let erppurchaseorderpaymenttermid = null;

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
this.formid=erppurchaseorderpaymenttermid;
//this.sharedService.alert(erppurchaseorderpaymenttermid);

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
if(this.erppurchaseorderpaymenttermservice.formData && this.erppurchaseorderpaymenttermservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erppurchaseorderpaymenttermForm.patchValue({
    poid: this.erppurchaseorderpaymenttermservice.formData.poid,
    poiddesc: this.erppurchaseorderpaymenttermservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erppurchaseorderpaymenttermForm.get('poid').value);
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
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erppurchaseorderpaymenttermservice.formData && this.erppurchaseorderpaymenttermservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erppurchaseorderpaymenttermForm.patchValue({
    rfqid: this.erppurchaseorderpaymenttermservice.formData.rfqid,
    rfqiddesc: this.erppurchaseorderpaymenttermservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erppurchaseorderpaymenttermForm.get('rfqid').value);
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
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quoteidList = res as erpsupplierquotationmaster[];
if(this.erppurchaseorderpaymenttermservice.formData && this.erppurchaseorderpaymenttermservice.formData.quoteid){
this.quoteidoptionsEvent.emit(this.quoteidList);
this.erppurchaseorderpaymenttermForm.patchValue({
    quoteid: this.erppurchaseorderpaymenttermservice.formData.quoteid,
    quoteiddesc: this.erppurchaseorderpaymenttermservice.formData.quoteiddesc,
});
}
{
let arrquoteid = this.quoteidList.filter(v => v.quotationid == this.erppurchaseorderpaymenttermForm.get('quoteid').value);
let objquoteid;
if (arrquoteid.length > 0) objquoteid = arrquoteid[0];
if (objquoteid)
{
}
}
}
).catch((err) => {console.log(err);});
this.quoteid_erpsupplierquotationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.quoteidList.filter(v => v.quotationreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.quoteid_erpsupplierquotationmastersformatter = (result: any) => result.quotationreference;
this.configservice.getList("paymentterm").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.erppurchaseorderpaymenttermservice.geterppurchaseorderpaymenttermsList().then(res => {
      this.pkList = res as erppurchaseorderpaymentterm[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.erppurchaseorderpaymenttermForm.markAsUntouched();
this.erppurchaseorderpaymenttermForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erppurchaseorderpaymenttermForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erppurchaseorderpaymenttermForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelectedquoteid(quoteidDetail: any) {
if (quoteidDetail.quotationid && quoteidDetail) {
this.erppurchaseorderpaymenttermForm.patchValue({
quoteid: quoteidDetail.quotationid,
quoteiddesc: quoteidDetail.quotationreference,

});

}
}




resetForm() {
if (this.erppurchaseorderpaymenttermForm != null)
this.erppurchaseorderpaymenttermForm.reset();
this.erppurchaseorderpaymenttermForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let paytermid = this.erppurchaseorderpaymenttermForm.get('paytermid').value;
        if(paytermid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erppurchaseorderpaymenttermservice.deleteerppurchaseorderpaymentterm(paytermid).then(res =>
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
    this.erppurchaseorderpaymenttermForm.patchValue({
        paytermid: null
    });
    if(this.erppurchaseorderpaymenttermservice.formData.paytermid!=null)this.erppurchaseorderpaymenttermservice.formData.paytermid=null;
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
this.erppurchaseorderpaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erppurchaseorderpaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erppurchaseorderpaymenttermForm.controls[key]!=undefined)
{
this.erppurchaseorderpaymenttermForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.erppurchaseorderpaymenttermservice.formData.description!=null )
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
customeridonChange(evt:any){
let e=evt.value;
}
rfqidonChange(evt:any){
let e=evt.value;
}
quoteidonChange(evt:any){
let e=evt.value;
}
paytermidonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.erppurchaseorderpaymenttermForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
percentageonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=evt.value;
}
amountonChange(evt:any){
let e=evt.value;
}
approvalremarksonChange(evt:any){
let e=evt.value;
}
apidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerppurchaseorderpaymentterms() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erppurchaseorderpaymenttermservice.geterppurchaseorderpaymenttermsByEID(pkcol).then(res => {

this.erppurchaseorderpaymenttermservice.formData=res.erppurchaseorderpaymentterm;
let formproperty=res.erppurchaseorderpaymentterm.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erppurchaseorderpaymentterm.pkcol;
this.formid=res.erppurchaseorderpaymentterm.paytermid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erppurchaseorderpaymentterm.paytermid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erppurchaseorderpaymenttermForm.patchValue({
poid: res.erppurchaseorderpaymentterm.poid,
poiddesc: res.erppurchaseorderpaymentterm.poiddesc,
customerid: res.erppurchaseorderpaymentterm.customerid,
rfqid: res.erppurchaseorderpaymentterm.rfqid,
rfqiddesc: res.erppurchaseorderpaymentterm.rfqiddesc,
quoteid: res.erppurchaseorderpaymentterm.quoteid,
quoteiddesc: res.erppurchaseorderpaymentterm.quoteiddesc,
paytermid: res.erppurchaseorderpaymentterm.paytermid,
paymenttermtype: res.erppurchaseorderpaymentterm.paymenttermtype,
paymenttermtypedesc: res.erppurchaseorderpaymentterm.paymenttermtypedesc,
percentage: res.erppurchaseorderpaymentterm.percentage,
description: res.erppurchaseorderpaymentterm.description,
currency: res.erppurchaseorderpaymentterm.currency,
amount: res.erppurchaseorderpaymentterm.amount,
approvalremarks: res.erppurchaseorderpaymentterm.approvalremarks,
apid: res.erppurchaseorderpaymentterm.apid,
status: res.erppurchaseorderpaymentterm.status,
statusdesc: res.erppurchaseorderpaymentterm.statusdesc,
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
  for (let key in this.erppurchaseorderpaymenttermForm.controls) {
    if (this.erppurchaseorderpaymenttermForm.controls[key] != null) {
if(false)
{
if(this.erppurchaseorderpaymenttermservice.formData!=null && this.erppurchaseorderpaymenttermservice.formData[key]!=null  && this.erppurchaseorderpaymenttermservice.formData[key]!='[]' && this.erppurchaseorderpaymenttermservice.formData[key]!=undefined && this.erppurchaseorderpaymenttermservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erppurchaseorderpaymenttermservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erppurchaseorderpaymenttermservice.formData!=null && this.erppurchaseorderpaymenttermservice.formData[key]!=null   && this.erppurchaseorderpaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erppurchaseorderpaymenttermservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erppurchaseorderpaymenttermservice.formData!=null && this.erppurchaseorderpaymenttermservice.formData[key]!=null   && this.erppurchaseorderpaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erppurchaseorderpaymenttermservice.formData[key]+"'><div class='progress__number'>"+this.erppurchaseorderpaymenttermservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchaseorderpaymenttermForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erppurchaseorderpaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erppurchaseorderpaymenttermForm.value;
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

private erppurchaseorderpaymenttermtoggleOption(){
this.erppurchaseorderpaymenttermshowOption = this.erppurchaseorderpaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erppurchaseorderpaymenttermForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erppurchaseorderpaymenttermForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erppurchaseorderpaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erppurchaseorderpaymenttermservice.formData=this.erppurchaseorderpaymenttermForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erppurchaseorderpaymenttermForm.controls[key] != null)
    {
        this.erppurchaseorderpaymenttermservice.formData[key] = this.erppurchaseorderpaymenttermForm.controls[key].value;
    }
}
}
}
console.log(this.erppurchaseorderpaymenttermservice.formData);
this.erppurchaseorderpaymenttermservice.formData=this.erppurchaseorderpaymenttermForm.value;
this.erppurchaseorderpaymenttermservice.saveOrUpdateerppurchaseorderpaymentterms().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseorderpaymentterm);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erppurchaseorderpaymenttermservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erppurchaseorderpaymentterm);
}
else
{
this.FillData(res);
}
}
this.erppurchaseorderpaymenttermForm.markAsUntouched();
this.erppurchaseorderpaymenttermForm.markAsPristine();
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
data: {poid:this.erppurchaseorderpaymenttermForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erppurchaseorderpaymenttermForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditquoteid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.erppurchaseorderpaymenttermForm.get('quoteid').value, ScreenType:2 }
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



