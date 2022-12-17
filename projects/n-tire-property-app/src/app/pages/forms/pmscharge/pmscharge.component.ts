import { pmschargeService } from './../../../service/pmscharge.service';
import { pmscharge } from './../../../model/pmscharge.model';
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
selector: 'app-pmscharge',
templateUrl: './pmscharge.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmschargeComponent implements OnInit {
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
bfilterPopulatepmscharges:boolean=false;
datapmschargesleaseid3:any=[];
datapmschargespropertyid3:any=[];
datapmschargesunitid3:any=[];
datapmschargestenantid3:any=[];
datapmschargesownerid3:any=[];
datapmschargeschargecycle3:any=[];
datapmschargeschargetype3:any=[];
datapmschargespaidmode3:any=[];
 pmschargeForm: FormGroup;
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
chargecycleList: boconfigvalue[];
chargetypeList: boconfigvalue[];
paidmodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmschargeshowOption:boolean;
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
private pmschargeservice: pmschargeService,
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
this.pmschargeForm  = this.fb.group({
pk:[null],
chargeid: [null],
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
datecharged: [null],
chargecycle: [null],
chargecycledesc: [null],
chargetype: [null],
chargetypedesc: [null],
consumption: [null],
chargeamount: [null],
duedate: [null],
paiddate: [null],
paidamount: [null],
paidmode: [null],
paidmodedesc: [null],
paidreference: [null],
nextduedate: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmschargeForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmschargeForm.dirty && this.pmschargeForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.chargeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.chargeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.chargeid && pkDetail) {
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
let pmschargeid = null;

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
this.formid=pmschargeid;
//this.sharedService.alert(pmschargeid);

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
if(this.pmschargeservice.formData && this.pmschargeservice.formData.leaseid){
this.leaseidoptionsEvent.emit(this.leaseidList);
this.pmschargeForm.patchValue({
    leaseid: this.pmschargeservice.formData.leaseid,
    leaseiddesc: this.pmschargeservice.formData.leaseiddesc,
});
}
{
let arrleaseid = this.leaseidList.filter(v => v.leaseid == this.pmschargeForm.get('leaseid').value);
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
if(this.pmschargeservice.formData && this.pmschargeservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmschargeForm.patchValue({
    propertyid: this.pmschargeservice.formData.propertyid,
    propertyiddesc: this.pmschargeservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmschargeForm.get('propertyid').value);
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
if(this.pmschargeservice.formData && this.pmschargeservice.formData.unitid){this.pmschargeForm.patchValue({
    unitid: this.pmschargeservice.formData.unitid,
    unitiddesc: this.pmschargeservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmschargeservice.formData && this.pmschargeservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmschargeForm.patchValue({
    tenantid: this.pmschargeservice.formData.tenantid,
    tenantiddesc: this.pmschargeservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmschargeForm.get('tenantid').value);
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
this.configservice.getList("chargecycle").then(res => this.chargecycleList = res as boconfigvalue[]);
this.configservice.getList("chargetype").then(res => this.chargetypeList = res as boconfigvalue[]);
this.configservice.getList("paidmode").then(res => this.paidmodeList = res as boconfigvalue[]);

//autocomplete
    this.pmschargeservice.getpmschargesList().then(res => {
      this.pkList = res as pmscharge[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.chargetype.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.chargetype;

//setting the flag that the screen is not touched 
this.pmschargeForm.markAsUntouched();
this.pmschargeForm.markAsPristine();
}
onSelectedleaseid(leaseidDetail: any) {
if (leaseidDetail.leaseid && leaseidDetail) {
this.pmschargeForm.patchValue({
leaseid: leaseidDetail.leaseid,
leaseiddesc: leaseidDetail.description,

});

}
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmschargeForm.patchValue({
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
this.pmschargeForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}




resetForm() {
if (this.pmschargeForm != null)
this.pmschargeForm.reset();
this.pmschargeForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let chargeid = this.pmschargeForm.get('chargeid').value;
        if(chargeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmschargeservice.deletepmscharge(chargeid).then(res =>
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
    this.pmschargeForm.patchValue({
        chargeid: null
    });
    if(this.pmschargeservice.formData.chargeid!=null)this.pmschargeservice.formData.chargeid=null;
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
        else if(key=="datecharged")
this.pmschargeForm.patchValue({"datecharged":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.pmschargeForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="paiddate")
this.pmschargeForm.patchValue({"paiddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextduedate")
this.pmschargeForm.patchValue({"nextduedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmschargeForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmschargeForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmschargeForm.controls[key]!=undefined)
{
this.pmschargeForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.pmschargeservice.formData.chargetype!=null )
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
chargeidonChange(evt:any){
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
this.pmschargeForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
tenantidonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmschargeForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
datechargedonChange(evt:any){
let e=evt.value;
}
chargecycleonChange(evt:any){
let e=this.f.chargecycle.value as any;
this.pmschargeForm.patchValue({chargecycledesc:evt.options[evt.options.selectedIndex].text});
}
chargetypeonChange(evt:any){
let e=this.f.chargetype.value as any;
this.pmschargeForm.patchValue({chargetypedesc:evt.options[evt.options.selectedIndex].text});
}
consumptiononChange(evt:any){
let e=evt.value;
}
chargeamountonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
paiddateonChange(evt:any){
let e=evt.value;
}
paidamountonChange(evt:any){
let e=evt.value;
}
paidmodeonChange(evt:any){
let e=this.f.paidmode.value as any;
this.pmschargeForm.patchValue({paidmodedesc:evt.options[evt.options.selectedIndex].text});
}
paidreferenceonChange(evt:any){
let e=evt.value;
}
nextduedateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmscharges() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmschargeservice.getpmschargesByEID(pkcol).then(res => {

this.pmschargeservice.formData=res.pmscharge;
let formproperty=res.pmscharge.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmscharge.pkcol;
this.formid=res.pmscharge.chargeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmscharge.chargeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmschargeForm.patchValue({
chargeid: res.pmscharge.chargeid,
leaseid: res.pmscharge.leaseid,
leaseiddesc: res.pmscharge.leaseiddesc,
propertyid: res.pmscharge.propertyid,
propertyiddesc: res.pmscharge.propertyiddesc,
unitid: res.pmscharge.unitid,
unitiddesc: res.pmscharge.unitiddesc,
tenantid: res.pmscharge.tenantid,
tenantiddesc: res.pmscharge.tenantiddesc,
ownerid: res.pmscharge.ownerid,
owneriddesc: res.pmscharge.owneriddesc,
datecharged: this.ngbDateParserFormatter.parse(res.pmscharge.datecharged),
chargecycle: res.pmscharge.chargecycle,
chargecycledesc: res.pmscharge.chargecycledesc,
chargetype: res.pmscharge.chargetype,
chargetypedesc: res.pmscharge.chargetypedesc,
consumption: res.pmscharge.consumption,
chargeamount: res.pmscharge.chargeamount,
duedate: this.ngbDateParserFormatter.parse(res.pmscharge.duedate),
paiddate: this.ngbDateParserFormatter.parse(res.pmscharge.paiddate),
paidamount: res.pmscharge.paidamount,
paidmode: res.pmscharge.paidmode,
paidmodedesc: res.pmscharge.paidmodedesc,
paidreference: res.pmscharge.paidreference,
nextduedate: this.ngbDateParserFormatter.parse(res.pmscharge.nextduedate),
notes: res.pmscharge.notes,
status: res.pmscharge.status,
statusdesc: res.pmscharge.statusdesc,
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
  for (let key in this.pmschargeForm.controls) {
    if (this.pmschargeForm.controls[key] != null) {
if(false)
{
if(this.pmschargeservice.formData!=null && this.pmschargeservice.formData[key]!=null  && this.pmschargeservice.formData[key]!='[]' && this.pmschargeservice.formData[key]!=undefined && this.pmschargeservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmschargeservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmschargeservice.formData!=null && this.pmschargeservice.formData[key]!=null   && this.pmschargeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmschargeservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmschargeservice.formData!=null && this.pmschargeservice.formData[key]!=null   && this.pmschargeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmschargeservice.formData[key]+"'><div class='progress__number'>"+this.pmschargeservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmschargeForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmschargeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmschargeForm.value;
obj.datecharged=new Date(this.pmschargeForm.get('datecharged').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('datecharged').value)+'  UTC' :null);
obj.duedate=new Date(this.pmschargeForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('duedate').value)+'  UTC' :null);
obj.paiddate=new Date(this.pmschargeForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('paiddate').value)+'  UTC' :null);
obj.nextduedate=new Date(this.pmschargeForm.get('nextduedate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('nextduedate').value)+'  UTC' :null);
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

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmschargeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmschargeForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmschargeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmschargeservice.formData=this.pmschargeForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmschargeForm.controls[key] != null)
    {
        this.pmschargeservice.formData[key] = this.pmschargeForm.controls[key].value;
    }
}
}
}
this.pmschargeservice.formData.datecharged=new Date(this.pmschargeForm.get('datecharged').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('datecharged').value)+'  UTC' :null);
this.pmschargeservice.formData.duedate=new Date(this.pmschargeForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('duedate').value)+'  UTC' :null);
this.pmschargeservice.formData.paiddate=new Date(this.pmschargeForm.get('paiddate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('paiddate').value)+'  UTC' :null);
this.pmschargeservice.formData.nextduedate=new Date(this.pmschargeForm.get('nextduedate').value ? this.ngbDateParserFormatter.format(this.pmschargeForm.get('nextduedate').value)+'  UTC' :null);
console.log(this.pmschargeservice.formData);
this.pmschargeservice.formData=this.pmschargeForm.value;
this.pmschargeservice.saveOrUpdatepmscharges().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmscharge);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmschargeservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmscharge);
}
else
{
this.FillData(res);
}
}
this.pmschargeForm.markAsUntouched();
this.pmschargeForm.markAsPristine();
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
data: {leaseid:this.pmschargeForm.get('leaseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmschargeForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmschargeForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmschargeForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmschargeForm.get('ownerid').value, ScreenType:2 }
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



