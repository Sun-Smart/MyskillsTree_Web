import { ltyrewardsegmentService } from './../../../service/ltyrewardsegment.service';
import { ltyrewardsegment } from './../../../model/ltyrewardsegment.model';
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
import { ltycoupontype} from './../../../model/ltycoupontype.model';
import { ltycoupontypeService } from './../../../service/ltycoupontype.service';
//popups
import { lmsproductmaster} from '../../../../../../n-tire-crm-app/src/app/model/lmsproductmaster.model';
import { lmsproductmasterService } from '../../../../../../n-tire-crm-app/src/app/service/lmsproductmaster.service';
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
selector: 'app-ltyrewardsegment',
templateUrl: './ltyrewardsegment.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltyrewardsegmentComponent implements OnInit {
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
bfilterPopulateltyrewardsegments:boolean=false;
dataltyrewardsegmentstype3:any=[];
dataltyrewardsegmentsrewardmethod3:any=[];
dataltyrewardsegmentscoupontypeid3:any=[];
dataltyrewardsegmentsproductid3:any=[];
dataltyrewardsegmentsrewardunit3:any=[];
dataltyrewardsegmentsrewardprefix3:any=[];
 ltyrewardsegmentForm: FormGroup;
typeList: boconfigvalue[];
rewardmethodList: boconfigvalue[];
coupontypeidList: ltycoupontype[];
productidList: lmsproductmaster[];
productidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
productid_lmsproductmastersForm: FormGroup;//autocomplete
productid_lmsproductmastersoptions:any;//autocomplete
productid_lmsproductmastersformatter:any;//autocomplete
rewardunitList: boconfigvalue[];
rewardprefixList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;

productidvisible:boolean = false;

rewardvaluevisible:boolean = false;




constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltyrewardsegmentservice: ltyrewardsegmentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private ltycoupontypeservice:ltycoupontypeService,
private lmsproductmasterservice:lmsproductmasterService,
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
this.ltyrewardsegmentForm  = this.fb.group({
pk:[null],
segmentid: [null],
name: [null],
description: [null],
type: [null],
typedesc: [null],
rank: [null],
rewardmethod: [null],
rewardmethoddesc: [null],
rewardvalue: [null],
coupontypeid: [null],
coupontypeiddesc: [null],
productid: [null],
productiddesc: [null],
rewardunit: [null],
rewardunitdesc: [null],
rewardprefix: [null],
rewardprefixdesc: [null],
rewardmultiplier: [null],
condition: [null],
claimbuttonlabel: [null],
redeeminstructions: [null],
totalcustomers: [null],
avgtransactionamount: [null],
avgtransactions: [null],
avgclv: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltyrewardsegmentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltyrewardsegmentForm.dirty && this.ltyrewardsegmentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.segmentid && pkDetail) {
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

debugger;
let ltyrewardsegmentid = null;

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
//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=ltyrewardsegmentid;
//this.sharedService.alert(ltyrewardsegmentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("loyaltyrewardtype").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("loyaltyrewardmethod").then(res => this.rewardmethodList = res as boconfigvalue[]);
this.ltycoupontypeservice.getltycoupontypesList().then(res => 
{
this.coupontypeidList = res as ltycoupontype[];
}
).catch((err) => {console.log(err);});
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
if(this.ltyrewardsegmentservice.formData && this.ltyrewardsegmentservice.formData.productid){
this.productidoptionsEvent.emit(this.productidList);
this.ltyrewardsegmentForm.patchValue({
    productid: this.ltyrewardsegmentservice.formData.productid,
    productiddesc: this.ltyrewardsegmentservice.formData.productiddesc,
});
}
{
let arrproductid = this.productidList.filter(v => v.productid == this.ltyrewardsegmentForm.get('productid').value);
let objproductid;
if (arrproductid.length > 0) objproductid = arrproductid[0];
if (objproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.productid_lmsproductmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.productidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.productid_lmsproductmastersformatter = (result: any) => result.productname;
this.configservice.getList("amountunit").then(res => this.rewardunitList = res as boconfigvalue[]);
this.configservice.getList("amountprefix").then(res => this.rewardprefixList = res as boconfigvalue[]);

//autocomplete
    this.ltyrewardsegmentservice.getltyrewardsegmentsList().then(res => {
      this.pkList = res as ltyrewardsegment[];
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
this.ltyrewardsegmentForm.markAsUntouched();
this.ltyrewardsegmentForm.markAsPristine();
}
onSelectedproductid(productidDetail: any) {
if (productidDetail.productid && productidDetail) {
this.ltyrewardsegmentForm.patchValue({
productid: productidDetail.productid,
productiddesc: productidDetail.productname,

});

}
}




resetForm() {
if (this.ltyrewardsegmentForm != null)
this.ltyrewardsegmentForm.reset();
this.ltyrewardsegmentForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.productidvisible = false;
this.rewardvaluevisible = false;
}

    onDelete() {
        let segmentid = this.ltyrewardsegmentForm.get('segmentid').value;
        if(segmentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltyrewardsegmentservice.deleteltyrewardsegment(segmentid).then(res =>
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
    this.ltyrewardsegmentForm.patchValue({
        segmentid: null
    });
    if(this.ltyrewardsegmentservice.formData.segmentid!=null)this.ltyrewardsegmentservice.formData.segmentid=null;
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
this.ltyrewardsegmentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltyrewardsegmentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltyrewardsegmentForm.controls[key]!=undefined)this.ltyrewardsegmentForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
segmentidonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.productidvisible=false;
if(this.f.type.value == 'C')this.productidvisible=true;
this.ltyrewardsegmentForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
rankonChange(evt:any){
let e=evt.value;
}
rewardmethodonChange(evt:any){
let e=this.f.rewardmethod.value as any;
this.ltyrewardsegmentForm.patchValue({rewardmethoddesc:evt.options[evt.options.selectedIndex].text});
}
rewardvalueonChange(evt:any){
let e=evt.value;
}
coupontypeidonChange(evt:any){
let e=evt.value;
this.ltyrewardsegmentForm.patchValue({coupontypeiddesc:evt.options[evt.options.selectedIndex].text});
}
productidonChange(evt:any){
let e=evt.value;
}
rewardunitonChange(evt:any){
let e=this.f.rewardunit.value as any;
this.ltyrewardsegmentForm.patchValue({rewardunitdesc:evt.options[evt.options.selectedIndex].text});
}
rewardprefixonChange(evt:any){
let e=this.f.rewardprefix.value as any;
this.ltyrewardsegmentForm.patchValue({rewardprefixdesc:evt.options[evt.options.selectedIndex].text});
}
rewardmultiplieronChange(evt:any){
let e=evt.value;
}
conditiononChange(evt:any){
let e=evt.value;
}
claimbuttonlabelonChange(evt:any){
let e=evt.value;
}
redeeminstructionsonChange(evt:any){
let e=evt.value;
}
totalcustomersonChange(evt:any){
let e=evt.value;
}
avgtransactionamountonChange(evt:any){
let e=evt.value;
}
avgtransactionsonChange(evt:any){
let e=evt.value;
}
avgclvonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltyrewardsegmentservice.getltyrewardsegmentsByEID(pkcol).then(res => {

this.ltyrewardsegmentservice.formData=res.ltyrewardsegment;
let formproperty=res.ltyrewardsegment.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltyrewardsegment.pkcol;
this.formid=res.ltyrewardsegment.segmentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltyrewardsegment.segmentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltyrewardsegmentForm.patchValue({
segmentid: res.ltyrewardsegment.segmentid,
name: res.ltyrewardsegment.name,
description: res.ltyrewardsegment.description,
type: res.ltyrewardsegment.type,
typedesc: res.ltyrewardsegment.typedesc,
rank: res.ltyrewardsegment.rank,
rewardmethod: res.ltyrewardsegment.rewardmethod,
rewardmethoddesc: res.ltyrewardsegment.rewardmethoddesc,
rewardvalue: res.ltyrewardsegment.rewardvalue,
coupontypeid: res.ltyrewardsegment.coupontypeid,
coupontypeiddesc: res.ltyrewardsegment.coupontypeiddesc,
productid: res.ltyrewardsegment.productid,
productiddesc: res.ltyrewardsegment.productiddesc,
rewardunit: res.ltyrewardsegment.rewardunit,
rewardunitdesc: res.ltyrewardsegment.rewardunitdesc,
rewardprefix: res.ltyrewardsegment.rewardprefix,
rewardprefixdesc: res.ltyrewardsegment.rewardprefixdesc,
rewardmultiplier: res.ltyrewardsegment.rewardmultiplier,
condition: res.ltyrewardsegment.condition,
claimbuttonlabel: res.ltyrewardsegment.claimbuttonlabel,
redeeminstructions: res.ltyrewardsegment.redeeminstructions,
totalcustomers: res.ltyrewardsegment.totalcustomers,
avgtransactionamount: res.ltyrewardsegment.avgtransactionamount,
avgtransactions: res.ltyrewardsegment.avgtransactions,
avgclv: res.ltyrewardsegment.avgclv,
status: res.ltyrewardsegment.status,
statusdesc: res.ltyrewardsegment.statusdesc,
});
//visible list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("rewardvalue")>=0)this.rewardvaluevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("rewardvalue")>=0)this.rewardvaluevisible = false;
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("productid")>=0)this.productidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("productid")>=0)this.productidvisible = false;
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
  for (let key in this.ltyrewardsegmentForm.controls) {
    if (this.ltyrewardsegmentForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltyrewardsegmentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltyrewardsegmentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltyrewardsegmentForm.value;
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.ltyrewardsegmentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltyrewardsegmentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltyrewardsegmentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltyrewardsegmentservice.formData=this.ltyrewardsegmentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltyrewardsegmentForm.controls[key] != null)
    {
        this.ltyrewardsegmentservice.formData[key] = this.ltyrewardsegmentForm.controls[key].value;
    }
}
}
}
console.log(this.ltyrewardsegmentservice.formData);
this.ltyrewardsegmentservice.formData=this.ltyrewardsegmentForm.value;
this.ltyrewardsegmentservice.saveOrUpdateltyrewardsegments().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltyrewardsegment);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltyrewardsegmentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltyrewardsegment);
}
else
{
this.FillData(res);
}
}
this.ltyrewardsegmentForm.markAsUntouched();
this.ltyrewardsegmentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcoupontypeid( coupontypeid) {
/*let ScreenType='2';
this.dialog.open(ltycoupontypeComponent, 
{
data: {coupontypeid:this.ltyrewardsegmentForm.get('coupontypeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.ltyrewardsegmentForm.get('productid').value, ScreenType:2 }
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



