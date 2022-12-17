import { pmsdepositService } from './../../../service/pmsdeposit.service';
import { pmsdeposit } from './../../../model/pmsdeposit.model';
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
import { pmslease} from './../../../model/pmslease.model';
import { pmsleaseService } from './../../../service/pmslease.service';
//popups
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
//popups
import { pmstenant} from './../../../model/pmstenant.model';
import { pmstenantService } from './../../../service/pmstenant.service';
//popups
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
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
selector: 'app-pmsdeposit',
templateUrl: './pmsdeposit.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmsdepositComponent implements OnInit {
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
bfilterPopulatepmsdeposits:boolean=false;
datapmsdepositsleaseid3:any=[];
datapmsdepositspropertyid3:any=[];
datapmsdepositsunitid3:any=[];
datapmsdepositstenantid3:any=[];
datapmsdepositsownerid3:any=[];
datapmsdepositsdeposittype3:any=[];
datapmsdepositspaymenttype3:any=[];
 pmsdepositForm: FormGroup;
leaseidList: pmslease[];
leaseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
leaseid_pmsleasesForm: FormGroup;//autocomplete
leaseid_pmsleasesoptions:any;//autocomplete
leaseid_pmsleasesformatter:any;//autocomplete
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
tenantidList: pmstenant[];
tenantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenantid_pmstenantsForm: FormGroup;//autocomplete
tenantid_pmstenantsoptions:any;//autocomplete
tenantid_pmstenantsformatter:any;//autocomplete
owneridList: pmspropertyowner[];
deposittypeList: boconfigvalue[];
paymenttypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmsdepositshowOption:boolean;
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
private pmsdepositservice: pmsdepositService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmsleaseservice:pmsleaseService,
private pmspropertyservice:pmspropertyService,
private pmspropertyunitservice:pmspropertyunitService,
private pmstenantservice:pmstenantService,
private pmspropertyownerservice:pmspropertyownerService,
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
this.pmsdepositForm  = this.fb.group({
pk:[null],
depositid: [null],
leaseid: [null],
leaseiddesc: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
tenantid: [null],
tenantiddesc: [null],
ownerid: [null],
owneriddesc: [null],
deposittype: [null],
deposittypedesc: [null],
depositamount: [null],
depositduedate: [null],
paid: [null],
paiddate: [null],
paidamount: [null],
paymenttype: [null],
paymenttypedesc: [null],
chequenumber: [null],
chequedate: [null],
bankname: [null],
txnreference: [null],
txndate: [null],
txnbank: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmsdepositForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmsdepositForm.dirty && this.pmsdepositForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.depositid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.depositid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.depositid && pkDetail) {
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
let pmsdepositid = null;

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
this.formid=pmsdepositid;
//this.sharedService.alert(pmsdepositid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmsleaseservice.getpmsleasesList().then(res => 
{
this.leaseidList = res as pmslease[];
if(this.pmsdepositservice.formData && this.pmsdepositservice.formData.leaseid){
this.leaseidoptionsEvent.emit(this.leaseidList);
this.pmsdepositForm.patchValue({
    leaseid: this.pmsdepositservice.formData.leaseid,
    leaseiddesc: this.pmsdepositservice.formData.leaseiddesc,
});
}
{
let arrleaseid = this.leaseidList.filter(v => v.leaseid == this.pmsdepositForm.get('leaseid').value);
let objleaseid;
if (arrleaseid.length > 0) objleaseid = arrleaseid[0];
if (objleaseid)
{
}
}
}
).catch((err) => {console.log(err);});
this.leaseid_pmsleasesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.leaseidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.leaseid_pmsleasesformatter = (result: any) => result.description;
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmsdepositservice.formData && this.pmsdepositservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmsdepositForm.patchValue({
    propertyid: this.pmsdepositservice.formData.propertyid,
    propertyiddesc: this.pmsdepositservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmsdepositForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
if(this.pmsdepositservice.formData && this.pmsdepositservice.formData.unitid){this.pmsdepositForm.patchValue({
    unitid: this.pmsdepositservice.formData.unitid,
    unitiddesc: this.pmsdepositservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmsdepositservice.formData && this.pmsdepositservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmsdepositForm.patchValue({
    tenantid: this.pmsdepositservice.formData.tenantid,
    tenantiddesc: this.pmsdepositservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmsdepositForm.get('tenantid').value);
let objtenantid;
if (arrtenantid.length > 0) objtenantid = arrtenantid[0];
if (objtenantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenantid_pmstenantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenantidList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenantid_pmstenantsformatter = (result: any) => result.lastname;
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("pmsdeposittype").then(res => this.deposittypeList = res as boconfigvalue[]);
this.configservice.getList("paymenttype").then(res => this.paymenttypeList = res as boconfigvalue[]);

//autocomplete
    this.pmsdepositservice.getpmsdepositsList().then(res => {
      this.pkList = res as pmsdeposit[];
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
this.pmsdepositForm.markAsUntouched();
this.pmsdepositForm.markAsPristine();
}
onSelectedleaseid(leaseidDetail: any) {
if (leaseidDetail.leaseid && leaseidDetail) {
this.pmsdepositForm.patchValue({
leaseid: leaseidDetail.leaseid,
leaseiddesc: leaseidDetail.description,

});

}
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmsdepositForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}

onSelectedtenantid(tenantidDetail: any) {
if (tenantidDetail.tenantid && tenantidDetail) {
this.pmsdepositForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}




resetForm() {
if (this.pmsdepositForm != null)
this.pmsdepositForm.reset();
this.pmsdepositForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let depositid = this.pmsdepositForm.get('depositid').value;
        if(depositid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmsdepositservice.deletepmsdeposit(depositid).then(res =>
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
    this.pmsdepositForm.patchValue({
        depositid: null
    });
    if(this.pmsdepositservice.formData.depositid!=null)this.pmsdepositservice.formData.depositid=null;
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
        else if(key=="depositduedate")
this.pmsdepositForm.patchValue({"depositduedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="paiddate")
this.pmsdepositForm.patchValue({"paiddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="chequedate")
this.pmsdepositForm.patchValue({"chequedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="txndate")
this.pmsdepositForm.patchValue({"txndate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmsdepositForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmsdepositForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmsdepositForm.controls[key]!=undefined)
{
this.pmsdepositForm.controls[key].disable({onlySelf: true});
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
depositidonChange(evt:any){
let e=evt.value;
}
leaseidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmsdepositForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
tenantidonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmsdepositForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
deposittypeonChange(evt:any){
let e=this.f.deposittype.value as any;
this.pmsdepositForm.patchValue({deposittypedesc:evt.options[evt.options.selectedIndex].text});
}
depositamountonChange(evt:any){
let e=evt.value;
}
depositduedateonChange(evt:any){
let e=evt.value;
}
paidonChange(evt:any){
let e=evt.value;
}
paiddateonChange(evt:any){
let e=evt.value;
}
paidamountonChange(evt:any){
let e=evt.value;
}
paymenttypeonChange(evt:any){
let e=this.f.paymenttype.value as any;
this.pmsdepositForm.patchValue({paymenttypedesc:evt.options[evt.options.selectedIndex].text});
}
chequenumberonChange(evt:any){
let e=evt.value;
}
chequedateonChange(evt:any){
let e=evt.value;
}
banknameonChange(evt:any){
let e=evt.value;
}
txnreferenceonChange(evt:any){
let e=evt.value;
}
txndateonChange(evt:any){
let e=evt.value;
}
txnbankonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmsdeposits() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmsdepositservice.getpmsdepositsByEID(pkcol).then(res => {

this.pmsdepositservice.formData=res.pmsdeposit;
let formproperty=res.pmsdeposit.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmsdeposit.pkcol;
this.formid=res.pmsdeposit.depositid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmsdeposit.depositid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmsdepositForm.patchValue({
depositid: res.pmsdeposit.depositid,
leaseid: res.pmsdeposit.leaseid,
leaseiddesc: res.pmsdeposit.leaseiddesc,
propertyid: res.pmsdeposit.propertyid,
propertyiddesc: res.pmsdeposit.propertyiddesc,
unitid: res.pmsdeposit.unitid,
unitiddesc: res.pmsdeposit.unitiddesc,
tenantid: res.pmsdeposit.tenantid,
tenantiddesc: res.pmsdeposit.tenantiddesc,
ownerid: res.pmsdeposit.ownerid,
owneriddesc: res.pmsdeposit.owneriddesc,
deposittype: res.pmsdeposit.deposittype,
deposittypedesc: res.pmsdeposit.deposittypedesc,
depositamount: res.pmsdeposit.depositamount,
depositduedate: this.ngbDateParserFormatter.parse(res.pmsdeposit.depositduedate),
paid: res.pmsdeposit.paid,
paiddate: this.ngbDateParserFormatter.parse(res.pmsdeposit.paiddate),
paidamount: res.pmsdeposit.paidamount,
paymenttype: res.pmsdeposit.paymenttype,
paymenttypedesc: res.pmsdeposit.paymenttypedesc,
chequenumber: res.pmsdeposit.chequenumber,
chequedate: this.ngbDateParserFormatter.parse(res.pmsdeposit.chequedate),
bankname: res.pmsdeposit.bankname,
txnreference: res.pmsdeposit.txnreference,
txndate: this.ngbDateParserFormatter.parse(res.pmsdeposit.txndate),
txnbank: res.pmsdeposit.txnbank,
notes: res.pmsdeposit.notes,
status: res.pmsdeposit.status,
statusdesc: res.pmsdeposit.statusdesc,
});
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
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
  for (let key in this.pmsdepositForm.controls) {
    if (this.pmsdepositForm.controls[key] != null) {
if(false)
{
if(this.pmsdepositservice.formData!=null && this.pmsdepositservice.formData[key]!=null  && this.pmsdepositservice.formData[key]!='[]' && this.pmsdepositservice.formData[key]!=undefined && this.pmsdepositservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmsdepositservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmsdepositservice.formData!=null && this.pmsdepositservice.formData[key]!=null   && this.pmsdepositservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmsdepositservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmsdepositservice.formData!=null && this.pmsdepositservice.formData[key]!=null   && this.pmsdepositservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmsdepositservice.formData[key]+"'><div class='progress__number'>"+this.pmsdepositservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmsdepositForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmsdepositForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmsdepositForm.value;
obj.depositduedate=new Date(this.pmsdepositForm.get('depositduedate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('depositduedate').value)+'  UTC' :null);
obj.paiddate=new Date(this.pmsdepositForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('paiddate').value)+'  UTC' :null);
obj.chequedate=new Date(this.pmsdepositForm.get('chequedate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('chequedate').value)+'  UTC' :null);
obj.txndate=new Date(this.pmsdepositForm.get('txndate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('txndate').value)+'  UTC' :null);
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

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmsdepositForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmsdepositForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmsdepositForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmsdepositservice.formData=this.pmsdepositForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmsdepositForm.controls[key] != null)
    {
        this.pmsdepositservice.formData[key] = this.pmsdepositForm.controls[key].value;
    }
}
}
}
this.pmsdepositservice.formData.depositduedate=new Date(this.pmsdepositForm.get('depositduedate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('depositduedate').value)+'  UTC' :null);
this.pmsdepositservice.formData.paiddate=new Date(this.pmsdepositForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('paiddate').value)+'  UTC' :null);
this.pmsdepositservice.formData.chequedate=new Date(this.pmsdepositForm.get('chequedate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('chequedate').value)+'  UTC' :null);
this.pmsdepositservice.formData.txndate=new Date(this.pmsdepositForm.get('txndate').value ? this.ngbDateParserFormatter.format(this.pmsdepositForm.get('txndate').value)+'  UTC' :null);
console.log(this.pmsdepositservice.formData);
this.pmsdepositservice.formData=this.pmsdepositForm.value;
this.pmsdepositservice.saveOrUpdatepmsdeposits().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsdeposit);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmsdepositservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsdeposit);
}
else
{
this.FillData(res);
}
}
this.pmsdepositForm.markAsUntouched();
this.pmsdepositForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditleaseid( leaseid) {
/*let ScreenType='2';
this.dialog.open(pmsleaseComponent, 
{
data: {leaseid:this.pmsdepositForm.get('leaseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmsdepositForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmsdepositForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmsdepositForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmsdepositForm.get('ownerid').value, ScreenType:2 }
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



