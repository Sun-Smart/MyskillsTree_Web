import { camsworkitemService } from './../../../service/camsworkitem.service';
import { camsworkitem } from './../../../model/camsworkitem.model';
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
import { camsworkdetail} from './../../../model/camsworkdetail.model';
import { camsworkdetailComponent } from './../../../pages/forms/camsworkdetail/camsworkdetail.component';
import { camsworkdetailService } from './../../../service/camsworkdetail.service';
//popups
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { erpitemmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
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
selector: 'app-camsworkitem',
templateUrl: './camsworkitem.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkitemComponent implements OnInit {
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
bfilterPopulatecamsworkitems:boolean=false;
datacamsworkitemsworkorderdetailid3:any=[];
datacamsworkitemsworkorderid3:any=[];
datacamsworkitemspmid3:any=[];
datacamsworkitemsitemid3:any=[];
 camsworkitemForm: FormGroup;
workorderdetailidList: camsworkdetail[];
workorderdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderdetailid_camsworkdetailsForm: FormGroup;//autocomplete
workorderdetailid_camsworkdetailsoptions:any;//autocomplete
workorderdetailid_camsworkdetailsformatter:any;//autocomplete
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsworkitemshowOption:boolean;
sessiondata:any;
sourcekey:any;

pmitemidvisible:boolean = false;





constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsworkitemservice: camsworkitemService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsworkdetailservice:camsworkdetailService,
private camsworkorderservice:camsworkorderService,
private camspmmasterservice:camspmmasterService,
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
this.camsworkitemForm  = this.fb.group({
pk:[null],
workorderitemid: [null],
workorderdetailid: [null],
workorderdetailiddesc: [null],
workorderid: [null],
workorderiddesc: [null],
scheduleid: [null],
pmitemid: [null],
pmid: [null],
pmiddesc: [null],
itemid: [null, Validators.required],
itemiddesc: [null],
suggestedquantity: [null],
actualquantity: [null, Validators.required],
instructions: [null],
costshare: [null],
completeddate: [null],
completednotes: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsworkitemForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkitemForm.dirty && this.camsworkitemForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workorderitemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workorderitemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workorderitemid && pkDetail) {
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
let camsworkitemid = null;

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
this.formid=camsworkitemid;
//this.sharedService.alert(camsworkitemid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworkdetailservice.getcamsworkdetailsList().then(res => 
{
this.workorderdetailidList = res as camsworkdetail[];
if(this.camsworkitemservice.formData && this.camsworkitemservice.formData.workorderdetailid){
this.workorderdetailidoptionsEvent.emit(this.workorderdetailidList);
this.camsworkitemForm.patchValue({
    workorderdetailid: this.camsworkitemservice.formData.workorderdetailid,
    workorderdetailiddesc: this.camsworkitemservice.formData.workorderdetailiddesc,
});
}
{
let arrworkorderdetailid = this.workorderdetailidList.filter(v => v.workorderdetailid == this.camsworkitemForm.get('workorderdetailid').value);
let objworkorderdetailid;
if (arrworkorderdetailid.length > 0) objworkorderdetailid = arrworkorderdetailid[0];
if (objworkorderdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderdetailid_camsworkdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderdetailidList.filter(v => v.taskdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderdetailid_camsworkdetailsformatter = (result: any) => result.taskdescription;
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsworkitemservice.formData && this.camsworkitemservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsworkitemForm.patchValue({
    workorderid: this.camsworkitemservice.formData.workorderid,
    workorderiddesc: this.camsworkitemservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsworkitemForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_camsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.requestreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_camsworkordersformatter = (result: any) => result.requestreference;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camsworkitemservice.formData && this.camsworkitemservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camsworkitemForm.patchValue({
    pmid: this.camsworkitemservice.formData.pmid,
    pmiddesc: this.camsworkitemservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camsworkitemForm.get('pmid').value);
let objpmid;
if (arrpmid.length > 0) objpmid = arrpmid[0];
if (objpmid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmid_camspmmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmid_camspmmastersformatter = (result: any) => result.reference;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.camsworkitemservice.formData && this.camsworkitemservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.camsworkitemForm.patchValue({
    itemid: this.camsworkitemservice.formData.itemid,
    itemiddesc: this.camsworkitemservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.camsworkitemForm.get('itemid').value);
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

//autocomplete
    this.camsworkitemservice.getcamsworkitemsList().then(res => {
      this.pkList = res as camsworkitem[];
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
this.camsworkitemForm.markAsUntouched();
this.camsworkitemForm.markAsPristine();
}
onSelectedworkorderdetailid(workorderdetailidDetail: any) {
if (workorderdetailidDetail.workorderdetailid && workorderdetailidDetail) {
this.camsworkitemForm.patchValue({
workorderdetailid: workorderdetailidDetail.workorderdetailid,
workorderdetailiddesc: workorderdetailidDetail.taskdescription,

});

}
}

onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsworkitemForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camsworkitemForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.camsworkitemForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemshortname,

});

}
}




resetForm() {
if (this.camsworkitemForm != null)
this.camsworkitemForm.reset();
this.camsworkitemForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.pmitemidvisible = false;
}

    onDelete() {
        let workorderitemid = this.camsworkitemForm.get('workorderitemid').value;
        if(workorderitemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkitemservice.deletecamsworkitem(workorderitemid).then(res =>
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
    this.camsworkitemForm.patchValue({
        workorderitemid: null
    });
    if(this.camsworkitemservice.formData.workorderitemid!=null)this.camsworkitemservice.formData.workorderitemid=null;
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
        else if(key=="completeddate")
this.camsworkitemForm.patchValue({"completeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.camsworkitemForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkitemForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkitemForm.controls[key]!=undefined)
{
this.camsworkitemForm.controls[key].disable({onlySelf: true});
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
workorderitemidonChange(evt:any){
let e=evt.value;
}
workorderdetailidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
pmitemidonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
suggestedquantityonChange(evt:any){
let e=evt.value;
}
actualquantityonChange(evt:any){
let e=evt.value;
}
instructionsonChange(evt:any){
let e=evt.value;
}
costshareonChange(evt:any){
let e=evt.value;
}
completeddateonChange(evt:any){
let e=evt.value;
}
completednotesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsworkitems() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkitemservice.getcamsworkitemsByEID(pkcol).then(res => {

this.camsworkitemservice.formData=res.camsworkitem;
let formproperty=res.camsworkitem.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkitem.pkcol;
this.formid=res.camsworkitem.workorderitemid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkitem.workorderitemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkitemForm.patchValue({
workorderitemid: res.camsworkitem.workorderitemid,
workorderdetailid: res.camsworkitem.workorderdetailid,
workorderdetailiddesc: res.camsworkitem.workorderdetailiddesc,
workorderid: res.camsworkitem.workorderid,
workorderiddesc: res.camsworkitem.workorderiddesc,
scheduleid: res.camsworkitem.scheduleid,
pmitemid: res.camsworkitem.pmitemid,
pmid: res.camsworkitem.pmid,
pmiddesc: res.camsworkitem.pmiddesc,
itemid: res.camsworkitem.itemid,
itemiddesc: res.camsworkitem.itemiddesc,
suggestedquantity: res.camsworkitem.suggestedquantity,
actualquantity: res.camsworkitem.actualquantity,
instructions: res.camsworkitem.instructions,
costshare: res.camsworkitem.costshare,
completeddate: this.ngbDateParserFormatter.parse(res.camsworkitem.completeddate),
completednotes: res.camsworkitem.completednotes,
remarks: res.camsworkitem.remarks,
status: res.camsworkitem.status,
statusdesc: res.camsworkitem.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("pmitemid")>=0)this.pmitemidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("pmitemid")>=0)this.pmitemidvisible = false;
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
  for (let key in this.camsworkitemForm.controls) {
    if (this.camsworkitemForm.controls[key] != null) {
if(false)
{
if(this.camsworkitemservice.formData!=null && this.camsworkitemservice.formData[key]!=null  && this.camsworkitemservice.formData[key]!='[]' && this.camsworkitemservice.formData[key]!=undefined && this.camsworkitemservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkitemservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkitemservice.formData!=null && this.camsworkitemservice.formData[key]!=null   && this.camsworkitemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkitemservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkitemservice.formData!=null && this.camsworkitemservice.formData[key]!=null   && this.camsworkitemservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkitemservice.formData[key]+"'><div class='progress__number'>"+this.camsworkitemservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkitemForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsworkitemForm.value;
obj.completeddate=new Date(this.camsworkitemForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.camsworkitemForm.get('completeddate').value)+'  UTC' :null);
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

private camsworkitemtoggleOption(){
this.camsworkitemshowOption = this.camsworkitemshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkitemForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkitemForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkitemservice.formData=this.camsworkitemForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkitemForm.controls[key] != null)
    {
        this.camsworkitemservice.formData[key] = this.camsworkitemForm.controls[key].value;
    }
}
}
}
this.camsworkitemservice.formData.completeddate=new Date(this.camsworkitemForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.camsworkitemForm.get('completeddate').value)+'  UTC' :null);
console.log(this.camsworkitemservice.formData);
this.camsworkitemservice.formData=this.camsworkitemForm.value;
this.camsworkitemservice.saveOrUpdatecamsworkitems().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkitem);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkitemservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkitem);
}
else
{
this.FillData(res);
}
}
this.camsworkitemForm.markAsUntouched();
this.camsworkitemForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkorderdetailid( workorderdetailid) {
/*let ScreenType='2';
this.dialog.open(camsworkdetailComponent, 
{
data: {workorderdetailid:this.camsworkitemForm.get('workorderdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsworkitemForm.get('workorderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camsworkitemForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.camsworkitemForm.get('itemid').value, ScreenType:2 }
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



