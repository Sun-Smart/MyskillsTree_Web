import { hrmsemployeesalarymasterService } from './../../../service/hrmsemployeesalarymaster.service';
import { hrmsemployeesalarymaster } from './../../../model/hrmsemployeesalarymaster.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
//detail table services
import { hrmssalaryemployeeannualincome } from './../../../model/hrmssalaryemployeeannualincome.model';
import { hrmssalaryemployeeannualincomeComponent } from './../../../pages/forms/hrmssalaryemployeeannualincome/hrmssalaryemployeeannualincome.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hrmssalaryemployeeregulardeduction } from './../../../model/hrmssalaryemployeeregulardeduction.model';
import { hrmssalaryemployeeregulardeductionComponent } from './../../../pages/forms/hrmssalaryemployeeregulardeduction/hrmssalaryemployeeregulardeduction.component';
//FK services
import { hrmssalaryemployeeregularincome } from './../../../model/hrmssalaryemployeeregularincome.model';
import { hrmssalaryemployeeregularincomeComponent } from './../../../pages/forms/hrmssalaryemployeeregularincome/hrmssalaryemployeeregularincome.component';
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
selector: 'app-hrmsemployeesalarymaster',
templateUrl: './hrmsemployeesalarymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeesalarymasterComponent implements OnInit {
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
bfilterPopulatehrmsemployeesalarymasters:boolean=false;
datahrmsemployeesalarymastersroleid3:any=[];
datahrmsemployeesalarymasterssalarytype3:any=[];
datahrmssalaryemployeeannualincomesannualincomeid3:any=[];
datahrmssalaryemployeeannualincomesmode3:any=[];
bfilterPopulatehrmssalaryemployeeannualincomes:boolean=false;
datahrmssalaryemployeeregulardeductionsmode3:any=[];
datahrmssalaryemployeeregulardeductionsexpenseid3:any=[];
bfilterPopulatehrmssalaryemployeeregulardeductions:boolean=false;
datahrmssalaryemployeeregularincomesincomeid3:any=[];
datahrmssalaryemployeeregularincomesmode3:any=[];
bfilterPopulatehrmssalaryemployeeregularincomes:boolean=false;
@ViewChild('tblhrmssalaryemployeeannualincomessource',{static:false}) tblhrmssalaryemployeeannualincomessource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryemployeeregulardeductionssource',{static:false}) tblhrmssalaryemployeeregulardeductionssource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryemployeeregularincomessource',{static:false}) tblhrmssalaryemployeeregularincomessource: Ng2SmartTableComponent;
 hrmsemployeesalarymasterForm: FormGroup;
roleidList: bouserrolemaster[];
salarytypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeesalarymastershowOption:boolean;
hrmssalaryemployeeannualincomeshowOption:boolean;
hrmssalaryemployeeregulardeductionshowOption:boolean;
hrmssalaryemployeeregularincomeshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmssalaryemployeeannualincomesvisiblelist:any;
hrmssalaryemployeeannualincomeshidelist:any;
hrmssalaryemployeeregulardeductionsvisiblelist:any;
hrmssalaryemployeeregulardeductionshidelist:any;
hrmssalaryemployeeregularincomesvisiblelist:any;
hrmssalaryemployeeregularincomeshidelist:any;

DeletedhrmssalaryemployeeannualincomeIDs: string="";
hrmssalaryemployeeannualincomesID: string = "1";
hrmssalaryemployeeannualincomesselectedindex:any;
DeletedhrmssalaryemployeeregulardeductionIDs: string="";
hrmssalaryemployeeregulardeductionsID: string = "2";
hrmssalaryemployeeregulardeductionsselectedindex:any;
DeletedhrmssalaryemployeeregularincomeIDs: string="";
hrmssalaryemployeeregularincomesID: string = "3";
hrmssalaryemployeeregularincomesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsemployeesalarymasterservice: hrmsemployeesalarymasterService,
private bomasterdataservice: bomasterdataService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.hrmsemployeesalarymasterForm  = this.fb.group({
pk:[null],
salarymasterid: [null],
effectivedate: [null],
roleid: [null],
roleiddesc: [null],
employeeid: [null],
salarytype: [null],
salarytypedesc: [null],
basic: [null],
allowances: [null],
grosssalary: [null],
deductions: [null],
taxallowed: [null],
tax: [null],
netsalary: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeesalarymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeesalarymasterForm.dirty && this.hrmsemployeesalarymasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.salarymasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.salarymasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.salarymasterid && pkDetail) {
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
let hrmsemployeesalarymasterid = null;

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
this.formid=hrmsemployeesalarymasterid;
//this.sharedService.alert(hrmsemployeesalarymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmssalaryemployeeannualincomesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomesTableddConfig();
  });

this.SethrmssalaryemployeeregulardeductionsTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionsTableddConfig();
  });

this.SethrmssalaryemployeeregularincomesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("salarytype").then(res => this.salarytypeList = res as boconfigvalue[]);

//autocomplete
    this.hrmsemployeesalarymasterservice.gethrmsemployeesalarymastersList().then(res => {
      this.pkList = res as hrmsemployeesalarymaster[];
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
this.hrmsemployeesalarymasterForm.markAsUntouched();
this.hrmsemployeesalarymasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsemployeesalarymasterForm != null)
this.hrmsemployeesalarymasterForm.reset();
this.hrmsemployeesalarymasterForm.patchValue({
});
setTimeout(() => {
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes=[];
this.hrmssalaryemployeeannualincomesLoadTable();
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions=[];
this.hrmssalaryemployeeregulardeductionsLoadTable();
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes=[];
this.hrmssalaryemployeeregularincomesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let salarymasterid = this.hrmsemployeesalarymasterForm.get('salarymasterid').value;
        if(salarymasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeesalarymasterservice.deletehrmsemployeesalarymaster(salarymasterid).then(res =>
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
    this.hrmsemployeesalarymasterForm.patchValue({
        salarymasterid: null
    });
    if(this.hrmsemployeesalarymasterservice.formData.salarymasterid!=null)this.hrmsemployeesalarymasterservice.formData.salarymasterid=null;
for (let i=0;i<this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.length;i++) {
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes[i].aiid=null;
}
for (let i=0;i<this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.length;i++) {
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions[i].rdid=null;
}
for (let i=0;i<this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.length;i++) {
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes[i].riid=null;
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
        else if(key=="effectivedate")
this.hrmsemployeesalarymasterForm.patchValue({"effectivedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeesalarymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeesalarymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeesalarymasterForm.controls[key]!=undefined)
{
this.hrmsemployeesalarymasterForm.controls[key].disable({onlySelf: true});
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
salarymasteridonChange(evt:any){
let e=evt.value;
}
effectivedateonChange(evt:any){
let e=evt.value;
}
roleidonChange(evt:any){
let e=evt.value;
this.hrmsemployeesalarymasterForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
employeeidonChange(evt:any){
let e=evt.value;
}
salarytypeonChange(evt:any){
let e=this.f.salarytype.value as any;
this.hrmsemployeesalarymasterForm.patchValue({salarytypedesc:evt.options[evt.options.selectedIndex].text});
}
basiconChange(evt:any){
let e=evt.value;
}
allowancesonChange(evt:any){
let e=evt.value;
}
grosssalaryonChange(evt:any){
let e=evt.value;
}
deductionsonChange(evt:any){
let e=evt.value;
}
taxallowedonChange(evt:any){
let e=evt.value;
}
taxonChange(evt:any){
let e=evt.value;
}
netsalaryonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeesalarymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeesalarymasterservice.gethrmsemployeesalarymastersByEID(pkcol).then(res => {

this.hrmsemployeesalarymasterservice.formData=res.hrmsemployeesalarymaster;
let formproperty=res.hrmsemployeesalarymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeesalarymaster.pkcol;
this.formid=res.hrmsemployeesalarymaster.salarymasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeesalarymaster.salarymasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeesalarymasterForm.patchValue({
salarymasterid: res.hrmsemployeesalarymaster.salarymasterid,
effectivedate: this.ngbDateParserFormatter.parse(res.hrmsemployeesalarymaster.effectivedate),
roleid: res.hrmsemployeesalarymaster.roleid,
roleiddesc: res.hrmsemployeesalarymaster.roleiddesc,
employeeid: res.hrmsemployeesalarymaster.employeeid,
salarytype: res.hrmsemployeesalarymaster.salarytype,
salarytypedesc: res.hrmsemployeesalarymaster.salarytypedesc,
basic: res.hrmsemployeesalarymaster.basic,
allowances: res.hrmsemployeesalarymaster.allowances,
grosssalary: res.hrmsemployeesalarymaster.grosssalary,
deductions: res.hrmsemployeesalarymaster.deductions,
taxallowed: res.hrmsemployeesalarymaster.taxallowed,
tax: res.hrmsemployeesalarymaster.tax,
netsalary: res.hrmsemployeesalarymaster.netsalary,
status: res.hrmsemployeesalarymaster.status,
statusdesc: res.hrmsemployeesalarymaster.statusdesc,
});
this.hrmssalaryemployeeannualincomesvisiblelist=res.hrmssalaryemployeeannualincomesvisiblelist;
this.hrmssalaryemployeeregulardeductionsvisiblelist=res.hrmssalaryemployeeregulardeductionsvisiblelist;
this.hrmssalaryemployeeregularincomesvisiblelist=res.hrmssalaryemployeeregularincomesvisiblelist;
//Child Tables if any
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes = res.hrmssalaryemployeeannualincomes;
this.SethrmssalaryemployeeannualincomesTableConfig();
this.hrmssalaryemployeeannualincomesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomesTableddConfig();
  });
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions = res.hrmssalaryemployeeregulardeductions;
this.SethrmssalaryemployeeregulardeductionsTableConfig();
this.hrmssalaryemployeeregulardeductionsLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionsTableddConfig();
  });
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes = res.hrmssalaryemployeeregularincomes;
this.SethrmssalaryemployeeregularincomesTableConfig();
this.hrmssalaryemployeeregularincomesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomesTableddConfig();
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
  for (let key in this.hrmsemployeesalarymasterForm.controls) {
    if (this.hrmsemployeesalarymasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeesalarymasterservice.formData!=null && this.hrmsemployeesalarymasterservice.formData[key]!=null  && this.hrmsemployeesalarymasterservice.formData[key]!='[]' && this.hrmsemployeesalarymasterservice.formData[key]!=undefined && this.hrmsemployeesalarymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeesalarymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeesalarymasterservice.formData!=null && this.hrmsemployeesalarymasterservice.formData[key]!=null   && this.hrmsemployeesalarymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeesalarymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeesalarymasterservice.formData!=null && this.hrmsemployeesalarymasterservice.formData[key]!=null   && this.hrmsemployeesalarymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeesalarymasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeesalarymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeesalarymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeesalarymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeesalarymasterForm.value;
obj.effectivedate=new Date(this.hrmsemployeesalarymasterForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeesalarymasterForm.get('effectivedate').value)+'  UTC' :null);
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

private hrmsemployeesalarymastertoggleOption(){
this.hrmsemployeesalarymastershowOption = this.hrmsemployeesalarymastershowOption === true ? false : true;
}

private hrmssalaryemployeeannualincometoggleOption(){
this.hrmssalaryemployeeannualincomeshowOption = this.hrmssalaryemployeeannualincomeshowOption === true ? false : true;
}

private hrmssalaryemployeeregulardeductiontoggleOption(){
this.hrmssalaryemployeeregulardeductionshowOption = this.hrmssalaryemployeeregulardeductionshowOption === true ? false : true;
}

private hrmssalaryemployeeregularincometoggleOption(){
this.hrmssalaryemployeeregularincomeshowOption = this.hrmssalaryemployeeregularincomeshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeesalarymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeesalarymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeesalarymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeesalarymasterservice.formData=this.hrmsemployeesalarymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeesalarymasterForm.controls[key] != null)
    {
        this.hrmsemployeesalarymasterservice.formData[key] = this.hrmsemployeesalarymasterForm.controls[key].value;
    }
}
}
}
this.hrmsemployeesalarymasterservice.formData.effectivedate=new Date(this.hrmsemployeesalarymasterForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeesalarymasterForm.get('effectivedate').value)+'  UTC' :null);
this.hrmsemployeesalarymasterservice.formData.DeletedhrmssalaryemployeeannualincomeIDs = this.DeletedhrmssalaryemployeeannualincomeIDs;
this.hrmsemployeesalarymasterservice.formData.DeletedhrmssalaryemployeeregulardeductionIDs = this.DeletedhrmssalaryemployeeregulardeductionIDs;
this.hrmsemployeesalarymasterservice.formData.DeletedhrmssalaryemployeeregularincomeIDs = this.DeletedhrmssalaryemployeeregularincomeIDs;
console.log(this.hrmsemployeesalarymasterservice.formData);
this.hrmsemployeesalarymasterservice.formData=this.hrmsemployeesalarymasterForm.value;
this.hrmsemployeesalarymasterservice.saveOrUpdatehrmsemployeesalarymasters().subscribe(
async res => {
if (this.hrmssalaryemployeeannualincomessource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeannualincomessource.data.length; i++)
    {
        if (this.hrmssalaryemployeeannualincomessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeannualincomessource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryemployeeregulardeductionssource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeregulardeductionssource.data.length; i++)
    {
        if (this.hrmssalaryemployeeregulardeductionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeregulardeductionssource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryemployeeregularincomessource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeregularincomessource.data.length; i++)
    {
        if (this.hrmssalaryemployeeregularincomessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeregularincomessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeesalarymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeesalarymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeesalarymaster);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeesalarymasterForm.markAsUntouched();
this.hrmsemployeesalarymasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsemployeesalarymasterForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmssalaryemployeeannualincome(event:any,aiid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeannualincomeComponent, 
{
data:  {  showview:false,save:false,event,aiid, salarymasterid,visiblelist:this.hrmssalaryemployeeannualincomesvisiblelist,  hidelist:this.hrmssalaryemployeeannualincomeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeannualincomessource.add(res);
this.hrmssalaryemployeeannualincomessource.refresh();
}
else
{
this.hrmssalaryemployeeannualincomessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeannualincome(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeannualincomeIDs += childID + ",";
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryemployeeregulardeduction(event:any,rdid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeregulardeductionComponent, 
{
data:  {  showview:false,save:false,event,rdid, salarymasterid,visiblelist:this.hrmssalaryemployeeregulardeductionsvisiblelist,  hidelist:this.hrmssalaryemployeeregulardeductionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeregulardeductionssource.add(res);
this.hrmssalaryemployeeregulardeductionssource.refresh();
}
else
{
this.hrmssalaryemployeeregulardeductionssource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeregulardeduction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeregulardeductionIDs += childID + ",";
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryemployeeregularincome(event:any,riid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeregularincomeComponent, 
{
data:  {  showview:false,save:false,event,riid, salarymasterid,visiblelist:this.hrmssalaryemployeeregularincomesvisiblelist,  hidelist:this.hrmssalaryemployeeregularincomeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeregularincomessource.add(res);
this.hrmssalaryemployeeregularincomessource.refresh();
}
else
{
this.hrmssalaryemployeeregularincomessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeregularincome(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeregularincomeIDs += childID + ",";
this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmssalaryemployeeannualincomes
hrmssalaryemployeeannualincomessettings:any;
hrmssalaryemployeeannualincomessource: any;

showhrmssalaryemployeeannualincomesCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeannualincomessource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeannualincomessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeannualincomessource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeannualincomessource.initGrid();
}
deletehrmssalaryemployeeannualincomesAll()
{
this.tblhrmssalaryemployeeannualincomessource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeannualincomesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomesTableddConfig();
  });
      if(this.tblhrmssalaryemployeeannualincomessource.settings!=null)this.tblhrmssalaryemployeeannualincomessource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeannualincomessource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeannualincomessource.initGrid();
}
showhrmssalaryemployeeannualincomesInActive()
{
}
enablehrmssalaryemployeeannualincomesInActive()
{
}
async SethrmssalaryemployeeannualincomesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeannualincomes){

this.bomasterdataservice.getList("").then(res=>
{
var dataannualincomeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeannualincomesannualincomeid3.push(defaultobj);
for(let i=0; i<dataannualincomeid2.length; i++){
var obj= { value: dataannualincomeid2[i].masterdataid, title:dataannualincomeid2[i].masterdatadescription};
this.datahrmssalaryemployeeannualincomesannualincomeid3.push(obj);
}
if((this.tblhrmssalaryemployeeannualincomessource.settings as any).columns['annualincomeid'])
{
(this.tblhrmssalaryemployeeannualincomessource.settings as any).columns['annualincomeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryemployeeannualincomesannualincomeid3));
this.tblhrmssalaryemployeeannualincomessource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeannualincomesmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryemployeeannualincomesmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryemployeeannualincomessource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeannualincomesmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeannualincomesmode3)), }, };
this.tblhrmssalaryemployeeannualincomessource.settings =  clone;
this.tblhrmssalaryemployeeannualincomessource.initGrid();
});
}
this.bfilterPopulatehrmssalaryemployeeannualincomes=true;
}
async hrmssalaryemployeeannualincomesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeannualincomesTableConfig()
{
this.hrmssalaryemployeeannualincomessettings = {
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
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
annualincomeid: {
title: 'Annual Income',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeannualincomesannualincomeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
type: '',
filter:true,
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeannualincomesmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
combination: {
title: 'Combination',
type: '',
filter:true,
},
value: {
title: 'Value',
type: 'number',
filter:true,
},
ceiling: {
title: 'Ceiling',
type: 'number',
filter:true,
},
modify: {
title: 'Modify',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
redemptioneveryyear: {
title: 'Redemption Every Year',
type: 'number',
filter:true,
},
},
};
}
hrmssalaryemployeeannualincomesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeannualincomesID)>=0)
{
this.hrmssalaryemployeeannualincomessource=new LocalDataSource();
this.hrmssalaryemployeeannualincomessource.load(this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes as  any as LocalDataSource);
this.hrmssalaryemployeeannualincomessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeannualincomesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.length == 0)
{
    this.tblhrmssalaryemployeeannualincomessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeannualincome();
    this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.push(obj);
    this.hrmssalaryemployeeannualincomessource.refresh();
    if ((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.length / this.hrmssalaryemployeeannualincomessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeannualincomessource.getPaging().page)
    {
        this.hrmssalaryemployeeannualincomessource.setPage((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.length / this.hrmssalaryemployeeannualincomessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeannualincomessource.grid.edit(this.tblhrmssalaryemployeeannualincomessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeannualincomessource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeannualincome(event,event.data.aiid,((this.hrmssalaryemployeeannualincomessource.getPaging().page-1) *this.hrmssalaryemployeeannualincomessource.getPaging().perPage)+index);
this.hrmssalaryemployeeannualincomessource.refresh();
break;
}
}

*/
hrmssalaryemployeeannualincomesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeannualincome(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeannualincome(event,event.data.aiid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeannualincome(event,event.data.aiid,((this.hrmssalaryemployeeannualincomessource.getPaging().page-1) *this.hrmssalaryemployeeannualincomessource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeannualincomessource.refresh();
break;
}
}
hrmssalaryemployeeannualincomesonDelete(obj) {
let aiid=obj.data.aiid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymasterservice.deletehrmsemployeesalarymaster(aiid).then(res=>
this.hrmssalaryemployeeannualincomesLoadTable()
);
}
}
hrmssalaryemployeeannualincomesPaging(val)
{
debugger;
this.hrmssalaryemployeeannualincomessource.setPaging(1, val, true);
}

handlehrmssalaryemployeeannualincomesGridSelected(event:any) {
this.hrmssalaryemployeeannualincomesselectedindex=this.hrmsemployeesalarymasterservice.hrmssalaryemployeeannualincomes.findIndex(i => i.aiid === event.data.aiid);
}
IshrmssalaryemployeeannualincomesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeannualincomesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeannualincomes
//start of Grid Codes hrmssalaryemployeeregulardeductions
hrmssalaryemployeeregulardeductionssettings:any;
hrmssalaryemployeeregulardeductionssource: any;

showhrmssalaryemployeeregulardeductionsCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeregulardeductionssource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeregulardeductionssource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeregulardeductionssource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeregulardeductionssource.initGrid();
}
deletehrmssalaryemployeeregulardeductionsAll()
{
this.tblhrmssalaryemployeeregulardeductionssource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeregulardeductionsFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionsTableddConfig();
  });
      if(this.tblhrmssalaryemployeeregulardeductionssource.settings!=null)this.tblhrmssalaryemployeeregulardeductionssource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeregulardeductionssource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeregulardeductionssource.initGrid();
}
showhrmssalaryemployeeregulardeductionsInActive()
{
}
enablehrmssalaryemployeeregulardeductionsInActive()
{
}
async SethrmssalaryemployeeregulardeductionsTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeregulardeductions){

this.bomasterdataservice.getList("").then(res=>
{
var dataexpenseid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeregulardeductionsexpenseid3.push(defaultobj);
for(let i=0; i<dataexpenseid2.length; i++){
var obj= { value: dataexpenseid2[i].masterdataid, title:dataexpenseid2[i].masterdatadescription};
this.datahrmssalaryemployeeregulardeductionsexpenseid3.push(obj);
}
if((this.tblhrmssalaryemployeeregulardeductionssource.settings as any).columns['expenseid'])
{
(this.tblhrmssalaryemployeeregulardeductionssource.settings as any).columns['expenseid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregulardeductionsexpenseid3));
this.tblhrmssalaryemployeeregulardeductionssource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeregulardeductionsmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryemployeeregulardeductionsmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryemployeeregulardeductionssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregulardeductionsmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregulardeductionsmode3)), }, };
this.tblhrmssalaryemployeeregulardeductionssource.settings =  clone;
this.tblhrmssalaryemployeeregulardeductionssource.initGrid();
});
}
this.bfilterPopulatehrmssalaryemployeeregulardeductions=true;
}
async hrmssalaryemployeeregulardeductionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeregulardeductionsTableConfig()
{
this.hrmssalaryemployeeregulardeductionssettings = {
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
expenseid: {
title: 'Expense',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeregulardeductionsexpenseid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
type: '',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeregulardeductionsmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
combination: {
title: 'Combination',
type: '',
filter:true,
},
value: {
title: 'Value',
type: 'number',
filter:true,
},
ceiling: {
title: 'Ceiling',
type: 'number',
filter:true,
},
modify: {
title: 'Modify',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
},
};
}
hrmssalaryemployeeregulardeductionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregulardeductionsID)>=0)
{
this.hrmssalaryemployeeregulardeductionssource=new LocalDataSource();
this.hrmssalaryemployeeregulardeductionssource.load(this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions as  any as LocalDataSource);
this.hrmssalaryemployeeregulardeductionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeregulardeductionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.length == 0)
{
    this.tblhrmssalaryemployeeregulardeductionssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeregulardeduction();
    this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.push(obj);
    this.hrmssalaryemployeeregulardeductionssource.refresh();
    if ((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.length / this.hrmssalaryemployeeregulardeductionssource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeregulardeductionssource.getPaging().page)
    {
        this.hrmssalaryemployeeregulardeductionssource.setPage((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.length / this.hrmssalaryemployeeregulardeductionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeregulardeductionssource.grid.edit(this.tblhrmssalaryemployeeregulardeductionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeregulardeductionssource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeregulardeduction(event,event.data.rdid,((this.hrmssalaryemployeeregulardeductionssource.getPaging().page-1) *this.hrmssalaryemployeeregulardeductionssource.getPaging().perPage)+index);
this.hrmssalaryemployeeregulardeductionssource.refresh();
break;
}
}

*/
hrmssalaryemployeeregulardeductionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeregulardeduction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeregulardeduction(event,event.data.rdid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeregulardeduction(event,event.data.rdid,((this.hrmssalaryemployeeregulardeductionssource.getPaging().page-1) *this.hrmssalaryemployeeregulardeductionssource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeregulardeductionssource.refresh();
break;
}
}
hrmssalaryemployeeregulardeductionsonDelete(obj) {
let rdid=obj.data.rdid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymasterservice.deletehrmsemployeesalarymaster(rdid).then(res=>
this.hrmssalaryemployeeregulardeductionsLoadTable()
);
}
}
hrmssalaryemployeeregulardeductionsPaging(val)
{
debugger;
this.hrmssalaryemployeeregulardeductionssource.setPaging(1, val, true);
}

handlehrmssalaryemployeeregulardeductionsGridSelected(event:any) {
this.hrmssalaryemployeeregulardeductionsselectedindex=this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregulardeductions.findIndex(i => i.rdid === event.data.rdid);
}
IshrmssalaryemployeeregulardeductionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregulardeductionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeregulardeductions
//start of Grid Codes hrmssalaryemployeeregularincomes
hrmssalaryemployeeregularincomessettings:any;
hrmssalaryemployeeregularincomessource: any;

showhrmssalaryemployeeregularincomesCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeregularincomessource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeregularincomessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeregularincomessource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeregularincomessource.initGrid();
}
deletehrmssalaryemployeeregularincomesAll()
{
this.tblhrmssalaryemployeeregularincomessource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeregularincomesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomesTableddConfig();
  });
      if(this.tblhrmssalaryemployeeregularincomessource.settings!=null)this.tblhrmssalaryemployeeregularincomessource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeregularincomessource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeregularincomessource.initGrid();
}
showhrmssalaryemployeeregularincomesInActive()
{
}
enablehrmssalaryemployeeregularincomesInActive()
{
}
async SethrmssalaryemployeeregularincomesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeregularincomes){

this.bomasterdataservice.getList("").then(res=>
{
var dataincomeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeregularincomesincomeid3.push(defaultobj);
for(let i=0; i<dataincomeid2.length; i++){
var obj= { value: dataincomeid2[i].masterdataid, title:dataincomeid2[i].masterdatadescription};
this.datahrmssalaryemployeeregularincomesincomeid3.push(obj);
}
if((this.tblhrmssalaryemployeeregularincomessource.settings as any).columns['incomeid'])
{
(this.tblhrmssalaryemployeeregularincomessource.settings as any).columns['incomeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregularincomesincomeid3));
this.tblhrmssalaryemployeeregularincomessource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryemployeeregularincomesmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryemployeeregularincomesmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryemployeeregularincomessource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregularincomesmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryemployeeregularincomesmode3)), }, };
this.tblhrmssalaryemployeeregularincomessource.settings =  clone;
this.tblhrmssalaryemployeeregularincomessource.initGrid();
});
}
this.bfilterPopulatehrmssalaryemployeeregularincomes=true;
}
async hrmssalaryemployeeregularincomesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeregularincomesTableConfig()
{
this.hrmssalaryemployeeregularincomessettings = {
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
incomeid: {
title: 'Income',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeregularincomesincomeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
type: '',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryemployeeregularincomesmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
combination: {
title: 'Combination',
type: '',
filter:true,
},
value: {
title: 'Value',
type: 'number',
filter:true,
},
ceiling: {
title: 'Ceiling',
type: 'number',
filter:true,
},
modify: {
title: 'Modify',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
},
};
}
hrmssalaryemployeeregularincomesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregularincomesID)>=0)
{
this.hrmssalaryemployeeregularincomessource=new LocalDataSource();
this.hrmssalaryemployeeregularincomessource.load(this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes as  any as LocalDataSource);
this.hrmssalaryemployeeregularincomessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeregularincomesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.length == 0)
{
    this.tblhrmssalaryemployeeregularincomessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeregularincome();
    this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.push(obj);
    this.hrmssalaryemployeeregularincomessource.refresh();
    if ((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.length / this.hrmssalaryemployeeregularincomessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeregularincomessource.getPaging().page)
    {
        this.hrmssalaryemployeeregularincomessource.setPage((this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.length / this.hrmssalaryemployeeregularincomessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeregularincomessource.grid.edit(this.tblhrmssalaryemployeeregularincomessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeregularincomessource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeregularincome(event,event.data.riid,((this.hrmssalaryemployeeregularincomessource.getPaging().page-1) *this.hrmssalaryemployeeregularincomessource.getPaging().perPage)+index);
this.hrmssalaryemployeeregularincomessource.refresh();
break;
}
}

*/
hrmssalaryemployeeregularincomesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeregularincome(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeregularincome(event,event.data.riid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeregularincome(event,event.data.riid,((this.hrmssalaryemployeeregularincomessource.getPaging().page-1) *this.hrmssalaryemployeeregularincomessource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeregularincomessource.refresh();
break;
}
}
hrmssalaryemployeeregularincomesonDelete(obj) {
let riid=obj.data.riid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymasterservice.deletehrmsemployeesalarymaster(riid).then(res=>
this.hrmssalaryemployeeregularincomesLoadTable()
);
}
}
hrmssalaryemployeeregularincomesPaging(val)
{
debugger;
this.hrmssalaryemployeeregularincomessource.setPaging(1, val, true);
}

handlehrmssalaryemployeeregularincomesGridSelected(event:any) {
this.hrmssalaryemployeeregularincomesselectedindex=this.hrmsemployeesalarymasterservice.hrmssalaryemployeeregularincomes.findIndex(i => i.riid === event.data.riid);
}
IshrmssalaryemployeeregularincomesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregularincomesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeregularincomes

}



