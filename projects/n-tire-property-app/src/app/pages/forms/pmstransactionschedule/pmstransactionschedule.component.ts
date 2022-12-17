import { pmstransactionscheduleService } from './../../../service/pmstransactionschedule.service';
import { pmstransactionschedule } from './../../../model/pmstransactionschedule.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
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
selector: 'app-pmstransactionschedule',
templateUrl: './pmstransactionschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmstransactionscheduleComponent implements OnInit {
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
bfilterPopulatepmstransactionschedules:boolean=false;
datapmstransactionschedulesleaseid3:any=[];
datapmstransactionschedulespropertyid3:any=[];
datapmstransactionschedulesunitid3:any=[];
datapmstransactionschedulestenantid3:any=[];
datapmstransactionschedulesownerid3:any=[];
datapmstransactionschedulescategoryid3:any=[];
datapmstransactionschedulessubcategoryid3:any=[];
datapmstransactionschedulesfrequency3:any=[];
 pmstransactionscheduleForm: FormGroup;
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
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
frequencyList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmstransactionscheduleshowOption:boolean;
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
private pmstransactionscheduleservice: pmstransactionscheduleService,
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
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.pmstransactionscheduleForm  = this.fb.group({
pk:[null],
transactionscheduleid: [null],
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
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
amount: [null],
frequency: [null],
frequencydesc: [null],
firstinvoicedate: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmstransactionscheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmstransactionscheduleForm.dirty && this.pmstransactionscheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.transactionscheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.transactionscheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.transactionscheduleid && pkDetail) {
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
let pmstransactionscheduleid = null;

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
this.formid=pmstransactionscheduleid;
//this.sharedService.alert(pmstransactionscheduleid);

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
if(this.pmstransactionscheduleservice.formData && this.pmstransactionscheduleservice.formData.leaseid){
this.leaseidoptionsEvent.emit(this.leaseidList);
this.pmstransactionscheduleForm.patchValue({
    leaseid: this.pmstransactionscheduleservice.formData.leaseid,
    leaseiddesc: this.pmstransactionscheduleservice.formData.leaseiddesc,
});
}
{
let arrleaseid = this.leaseidList.filter(v => v.leaseid == this.pmstransactionscheduleForm.get('leaseid').value);
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
if(this.pmstransactionscheduleservice.formData && this.pmstransactionscheduleservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmstransactionscheduleForm.patchValue({
    propertyid: this.pmstransactionscheduleservice.formData.propertyid,
    propertyiddesc: this.pmstransactionscheduleservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmstransactionscheduleForm.get('propertyid').value);
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
if(this.pmstransactionscheduleservice.formData && this.pmstransactionscheduleservice.formData.unitid){this.pmstransactionscheduleForm.patchValue({
    unitid: this.pmstransactionscheduleservice.formData.unitid,
    unitiddesc: this.pmstransactionscheduleservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmstenantservice.getpmstenantsList().then(res => 
{
this.tenantidList = res as pmstenant[];
if(this.pmstransactionscheduleservice.formData && this.pmstransactionscheduleservice.formData.tenantid){
this.tenantidoptionsEvent.emit(this.tenantidList);
this.pmstransactionscheduleForm.patchValue({
    tenantid: this.pmstransactionscheduleservice.formData.tenantid,
    tenantiddesc: this.pmstransactionscheduleservice.formData.tenantiddesc,
});
}
{
let arrtenantid = this.tenantidList.filter(v => v.tenantid == this.pmstransactionscheduleForm.get('tenantid').value);
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
this.bomasterdataservice.getList("pkmhf").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.pmstransactionscheduleservice.formData && this.pmstransactionscheduleservice.formData.subcategoryid){this.pmstransactionscheduleForm.patchValue({
    subcategoryid: this.pmstransactionscheduleservice.formData.subcategoryid,
    subcategoryiddesc: this.pmstransactionscheduleservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("frequency").then(res => this.frequencyList = res as boconfigvalue[]);

//autocomplete
    this.pmstransactionscheduleservice.getpmstransactionschedulesList().then(res => {
      this.pkList = res as pmstransactionschedule[];
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
this.pmstransactionscheduleForm.markAsUntouched();
this.pmstransactionscheduleForm.markAsPristine();
}
onSelectedleaseid(leaseidDetail: any) {
if (leaseidDetail.leaseid && leaseidDetail) {
this.pmstransactionscheduleForm.patchValue({
leaseid: leaseidDetail.leaseid,
leaseiddesc: leaseidDetail.description,

});

}
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmstransactionscheduleForm.patchValue({
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
this.pmstransactionscheduleForm.patchValue({
tenantid: tenantidDetail.tenantid,
tenantiddesc: tenantidDetail.lastname,

});

}
}




resetForm() {
if (this.pmstransactionscheduleForm != null)
this.pmstransactionscheduleForm.reset();
this.pmstransactionscheduleForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let transactionscheduleid = this.pmstransactionscheduleForm.get('transactionscheduleid').value;
        if(transactionscheduleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmstransactionscheduleservice.deletepmstransactionschedule(transactionscheduleid).then(res =>
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
    this.pmstransactionscheduleForm.patchValue({
        transactionscheduleid: null
    });
    if(this.pmstransactionscheduleservice.formData.transactionscheduleid!=null)this.pmstransactionscheduleservice.formData.transactionscheduleid=null;
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
        else if(key=="firstinvoicedate")
this.pmstransactionscheduleForm.patchValue({"firstinvoicedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmstransactionscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmstransactionscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmstransactionscheduleForm.controls[key]!=undefined)
{
this.pmstransactionscheduleForm.controls[key].disable({onlySelf: true});
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
transactionscheduleidonChange(evt:any){
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
this.pmstransactionscheduleForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
tenantidonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmstransactionscheduleForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
categoryidonChange(evt:any){
let e=evt.value;
this.pmstransactionscheduleForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.pmstransactionscheduleForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
amountonChange(evt:any){
let e=evt.value;
}
frequencyonChange(evt:any){
let e=this.f.frequency.value as any;
this.pmstransactionscheduleForm.patchValue({frequencydesc:evt.options[evt.options.selectedIndex].text});
}
firstinvoicedateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmstransactionschedules() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmstransactionscheduleservice.getpmstransactionschedulesByEID(pkcol).then(res => {

this.pmstransactionscheduleservice.formData=res.pmstransactionschedule;
let formproperty=res.pmstransactionschedule.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmstransactionschedule.pkcol;
this.formid=res.pmstransactionschedule.transactionscheduleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmstransactionschedule.transactionscheduleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmstransactionscheduleForm.patchValue({
transactionscheduleid: res.pmstransactionschedule.transactionscheduleid,
leaseid: res.pmstransactionschedule.leaseid,
leaseiddesc: res.pmstransactionschedule.leaseiddesc,
propertyid: res.pmstransactionschedule.propertyid,
propertyiddesc: res.pmstransactionschedule.propertyiddesc,
unitid: res.pmstransactionschedule.unitid,
unitiddesc: res.pmstransactionschedule.unitiddesc,
tenantid: res.pmstransactionschedule.tenantid,
tenantiddesc: res.pmstransactionschedule.tenantiddesc,
ownerid: res.pmstransactionschedule.ownerid,
owneriddesc: res.pmstransactionschedule.owneriddesc,
categoryid: res.pmstransactionschedule.categoryid,
categoryiddesc: res.pmstransactionschedule.categoryiddesc,
subcategoryid: res.pmstransactionschedule.subcategoryid,
subcategoryiddesc: res.pmstransactionschedule.subcategoryiddesc,
amount: res.pmstransactionschedule.amount,
frequency: res.pmstransactionschedule.frequency,
frequencydesc: res.pmstransactionschedule.frequencydesc,
firstinvoicedate: this.ngbDateParserFormatter.parse(res.pmstransactionschedule.firstinvoicedate),
notes: res.pmstransactionschedule.notes,
status: res.pmstransactionschedule.status,
statusdesc: res.pmstransactionschedule.statusdesc,
});
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
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
  for (let key in this.pmstransactionscheduleForm.controls) {
    if (this.pmstransactionscheduleForm.controls[key] != null) {
if(false)
{
if(this.pmstransactionscheduleservice.formData!=null && this.pmstransactionscheduleservice.formData[key]!=null  && this.pmstransactionscheduleservice.formData[key]!='[]' && this.pmstransactionscheduleservice.formData[key]!=undefined && this.pmstransactionscheduleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmstransactionscheduleservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmstransactionscheduleservice.formData!=null && this.pmstransactionscheduleservice.formData[key]!=null   && this.pmstransactionscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmstransactionscheduleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmstransactionscheduleservice.formData!=null && this.pmstransactionscheduleservice.formData[key]!=null   && this.pmstransactionscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmstransactionscheduleservice.formData[key]+"'><div class='progress__number'>"+this.pmstransactionscheduleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmstransactionscheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmstransactionscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmstransactionscheduleForm.value;
obj.firstinvoicedate=new Date(this.pmstransactionscheduleForm.get('firstinvoicedate').value ? this.ngbDateParserFormatter.format(this.pmstransactionscheduleForm.get('firstinvoicedate').value)+'  UTC' :null);
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

private pmstransactionscheduletoggleOption(){
this.pmstransactionscheduleshowOption = this.pmstransactionscheduleshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmstransactionscheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmstransactionscheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmstransactionscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmstransactionscheduleservice.formData=this.pmstransactionscheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmstransactionscheduleForm.controls[key] != null)
    {
        this.pmstransactionscheduleservice.formData[key] = this.pmstransactionscheduleForm.controls[key].value;
    }
}
}
}
this.pmstransactionscheduleservice.formData.firstinvoicedate=new Date(this.pmstransactionscheduleForm.get('firstinvoicedate').value ? this.ngbDateParserFormatter.format(this.pmstransactionscheduleForm.get('firstinvoicedate').value)+'  UTC' :null);
console.log(this.pmstransactionscheduleservice.formData);
this.pmstransactionscheduleservice.formData=this.pmstransactionscheduleForm.value;
this.pmstransactionscheduleservice.saveOrUpdatepmstransactionschedules().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmstransactionschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmstransactionscheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmstransactionschedule);
}
else
{
this.FillData(res);
}
}
this.pmstransactionscheduleForm.markAsUntouched();
this.pmstransactionscheduleForm.markAsPristine();
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
data: {leaseid:this.pmstransactionscheduleForm.get('leaseid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmstransactionscheduleForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmstransactionscheduleForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittenantid( tenantid) {
/*let ScreenType='2';
this.dialog.open(pmstenantComponent, 
{
data: {tenantid:this.pmstransactionscheduleForm.get('tenantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmstransactionscheduleForm.get('ownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.pmstransactionscheduleForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.pmstransactionscheduleForm.get('subcategoryid').value, ScreenType:2 }
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



