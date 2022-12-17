import { erptenderdetailService } from './../../../service/erptenderdetail.service';
import { erptenderdetail } from './../../../model/erptenderdetail.model';
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
import { erptendermaster} from './../../../model/erptendermaster.model';
import { erptendermasterComponent } from './../../../pages/forms/erptendermaster/erptendermaster.component';
import { erptendermasterService } from './../../../service/erptendermaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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
selector: 'app-erptenderdetail',
templateUrl: './erptenderdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptenderdetailComponent implements OnInit {
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
bfilterPopulateerptenderdetails:boolean=false;
dataerptenderdetailstenderid3:any=[];
dataerptenderdetailsitemid3:any=[];
dataerptenderdetailsuom3:any=[];
dataerptenderdetailscurrency3:any=[];
dataerptenderdetailsfinalsupplierid3:any=[];
 erptenderdetailForm: FormGroup;
tenderidList: erptendermaster[];
tenderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenderid_erptendermastersForm: FormGroup;//autocomplete
tenderid_erptendermastersoptions:any;//autocomplete
tenderid_erptendermastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
finalsupplieridList: erpsuppliermaster[];
finalsupplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
finalsupplierid_erpsuppliermastersForm: FormGroup;//autocomplete
finalsupplierid_erpsuppliermastersoptions:any;//autocomplete
finalsupplierid_erpsuppliermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erptenderdetailshowOption:boolean;
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
private erptenderdetailservice: erptenderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptendermasterservice:erptendermasterService,
private erpitemmasterservice:erpitemmasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
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
this.erptenderdetailForm  = this.fb.group({
pk:[null],
tenderdetailid: [null],
tenderid: [null],
tenderiddesc: [null],
itemid: [null],
itemiddesc: [null],
description: [null],
details: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
currency: [null],
currencydesc: [null],
estimatedvalue: [null],
finalsupplierid: [null],
finalsupplieriddesc: [null],
finalquantity: [null],
finalunitprice: [null],
finalcost: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptenderdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptenderdetailForm.dirty && this.erptenderdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.tenderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.tenderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.tenderdetailid && pkDetail) {
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
let erptenderdetailid = null;

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
this.formid=erptenderdetailid;
//this.sharedService.alert(erptenderdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptendermasterservice.geterptendermastersList().then(res => 
{
this.tenderidList = res as erptendermaster[];
if(this.erptenderdetailservice.formData && this.erptenderdetailservice.formData.tenderid){
this.tenderidoptionsEvent.emit(this.tenderidList);
this.erptenderdetailForm.patchValue({
    tenderid: this.erptenderdetailservice.formData.tenderid,
    tenderiddesc: this.erptenderdetailservice.formData.tenderiddesc,
});
}
{
let arrtenderid = this.tenderidList.filter(v => v.tenderid == this.erptenderdetailForm.get('tenderid').value);
let objtenderid;
if (arrtenderid.length > 0) objtenderid = arrtenderid[0];
if (objtenderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenderid_erptendermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenderidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenderid_erptendermastersformatter = (result: any) => result.title;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erptenderdetailservice.formData && this.erptenderdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erptenderdetailForm.patchValue({
    itemid: this.erptenderdetailservice.formData.itemid,
    itemiddesc: this.erptenderdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erptenderdetailForm.get('itemid').value);
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
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.finalsupplieridList = res as erpsuppliermaster[];
if(this.erptenderdetailservice.formData && this.erptenderdetailservice.formData.finalsupplierid){
this.finalsupplieridoptionsEvent.emit(this.finalsupplieridList);
this.erptenderdetailForm.patchValue({
    finalsupplierid: this.erptenderdetailservice.formData.finalsupplierid,
    finalsupplieriddesc: this.erptenderdetailservice.formData.finalsupplieriddesc,
});
}
{
let arrfinalsupplierid = this.finalsupplieridList.filter(v => v.supplierid == this.erptenderdetailForm.get('finalsupplierid').value);
let objfinalsupplierid;
if (arrfinalsupplierid.length > 0) objfinalsupplierid = arrfinalsupplierid[0];
if (objfinalsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.finalsupplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.finalsupplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.finalsupplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;

//autocomplete
    this.erptenderdetailservice.geterptenderdetailsList().then(res => {
      this.pkList = res as erptenderdetail[];
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
this.erptenderdetailForm.markAsUntouched();
this.erptenderdetailForm.markAsPristine();
}
onSelectedtenderid(tenderidDetail: any) {
if (tenderidDetail.tenderid && tenderidDetail) {
this.erptenderdetailForm.patchValue({
tenderid: tenderidDetail.tenderid,
tenderiddesc: tenderidDetail.title,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erptenderdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedfinalsupplierid(finalsupplieridDetail: any) {
if (finalsupplieridDetail.supplierid && finalsupplieridDetail) {
this.erptenderdetailForm.patchValue({
finalsupplierid: finalsupplieridDetail.supplierid,
finalsupplieriddesc: finalsupplieridDetail.suppliercode,

});

}
}




resetForm() {
if (this.erptenderdetailForm != null)
this.erptenderdetailForm.reset();
this.erptenderdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let tenderdetailid = this.erptenderdetailForm.get('tenderdetailid').value;
        if(tenderdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptenderdetailservice.deleteerptenderdetail(tenderdetailid).then(res =>
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
    this.erptenderdetailForm.patchValue({
        tenderdetailid: null
    });
    if(this.erptenderdetailservice.formData.tenderdetailid!=null)this.erptenderdetailservice.formData.tenderdetailid=null;
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
this.erptenderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptenderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptenderdetailForm.controls[key]!=undefined)
{
this.erptenderdetailForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.erptenderdetailservice.formData.description!=null )
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
tenderdetailidonChange(evt:any){
let e=evt.value;
}
tenderidonChange(evt:any){
let e=evt.value;
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
this.erptenderdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erptenderdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
estimatedvalueonChange(evt:any){
let e=evt.value;
}
finalsupplieridonChange(evt:any){
let e=evt.value;
}
finalquantityonChange(evt:any){
let e=evt.value;
}
finalunitpriceonChange(evt:any){
let e=evt.value;
}
finalcostonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerptenderdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptenderdetailservice.geterptenderdetailsByEID(pkcol).then(res => {

this.erptenderdetailservice.formData=res.erptenderdetail;
let formproperty=res.erptenderdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptenderdetail.pkcol;
this.formid=res.erptenderdetail.tenderdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptenderdetail.tenderdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptenderdetailForm.patchValue({
tenderdetailid: res.erptenderdetail.tenderdetailid,
tenderid: res.erptenderdetail.tenderid,
tenderiddesc: res.erptenderdetail.tenderiddesc,
itemid: res.erptenderdetail.itemid,
itemiddesc: res.erptenderdetail.itemiddesc,
description: res.erptenderdetail.description,
details: res.erptenderdetail.details,
quantity: res.erptenderdetail.quantity,
uom: res.erptenderdetail.uom,
uomdesc: res.erptenderdetail.uomdesc,
currency: res.erptenderdetail.currency,
currencydesc: res.erptenderdetail.currencydesc,
estimatedvalue: res.erptenderdetail.estimatedvalue,
finalsupplierid: res.erptenderdetail.finalsupplierid,
finalsupplieriddesc: res.erptenderdetail.finalsupplieriddesc,
finalquantity: res.erptenderdetail.finalquantity,
finalunitprice: res.erptenderdetail.finalunitprice,
finalcost: res.erptenderdetail.finalcost,
status: res.erptenderdetail.status,
statusdesc: res.erptenderdetail.statusdesc,
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
  for (let key in this.erptenderdetailForm.controls) {
    if (this.erptenderdetailForm.controls[key] != null) {
if(false)
{
if(this.erptenderdetailservice.formData!=null && this.erptenderdetailservice.formData[key]!=null  && this.erptenderdetailservice.formData[key]!='[]' && this.erptenderdetailservice.formData[key]!=undefined && this.erptenderdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptenderdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptenderdetailservice.formData!=null && this.erptenderdetailservice.formData[key]!=null   && this.erptenderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptenderdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptenderdetailservice.formData!=null && this.erptenderdetailservice.formData[key]!=null   && this.erptenderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptenderdetailservice.formData[key]+"'><div class='progress__number'>"+this.erptenderdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptenderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erptenderdetailForm.value;
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

private erptenderdetailtoggleOption(){
this.erptenderdetailshowOption = this.erptenderdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptenderdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptenderdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptenderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptenderdetailservice.formData=this.erptenderdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptenderdetailForm.controls[key] != null)
    {
        this.erptenderdetailservice.formData[key] = this.erptenderdetailForm.controls[key].value;
    }
}
}
}
console.log(this.erptenderdetailservice.formData);
this.erptenderdetailservice.formData=this.erptenderdetailForm.value;
this.erptenderdetailservice.saveOrUpdateerptenderdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptenderdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptenderdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptenderdetail);
}
else
{
this.FillData(res);
}
}
this.erptenderdetailForm.markAsUntouched();
this.erptenderdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittenderid( tenderid) {
/*let ScreenType='2';
this.dialog.open(erptendermasterComponent, 
{
data: {tenderid:this.erptenderdetailForm.get('tenderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erptenderdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfinalsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erptenderdetailForm.get('finalsupplierid').value, ScreenType:2 }
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



