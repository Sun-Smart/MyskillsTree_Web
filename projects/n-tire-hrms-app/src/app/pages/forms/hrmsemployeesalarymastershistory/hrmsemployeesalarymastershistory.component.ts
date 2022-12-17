import { hrmsemployeesalarymastershistoryService } from './../../../service/hrmsemployeesalarymastershistory.service';
import { hrmsemployeesalarymastershistory } from './../../../model/hrmsemployeesalarymastershistory.model';
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
import { hrmssalaryemployeeannualincomeshistory } from './../../../model/hrmssalaryemployeeannualincomeshistory.model';
import { hrmssalaryemployeeannualincomeshistoryComponent } from './../../../pages/forms/hrmssalaryemployeeannualincomeshistory/hrmssalaryemployeeannualincomeshistory.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hrmssalaryemployeeregulardeductionshistory } from './../../../model/hrmssalaryemployeeregulardeductionshistory.model';
import { hrmssalaryemployeeregulardeductionshistoryComponent } from './../../../pages/forms/hrmssalaryemployeeregulardeductionshistory/hrmssalaryemployeeregulardeductionshistory.component';
//FK services
import { hrmssalaryemployeeregularincomeshistory } from './../../../model/hrmssalaryemployeeregularincomeshistory.model';
import { hrmssalaryemployeeregularincomeshistoryComponent } from './../../../pages/forms/hrmssalaryemployeeregularincomeshistory/hrmssalaryemployeeregularincomeshistory.component';
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
selector: 'app-hrmsemployeesalarymastershistory',
templateUrl: './hrmsemployeesalarymastershistory.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeesalarymastershistoryComponent implements OnInit {
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
bfilterPopulatehrmsemployeesalarymastershistories:boolean=false;
datahrmsemployeesalarymastershistoriesroleid3:any=[];
datahrmsemployeesalarymastershistoriessalarytype3:any=[];
datahrmssalaryemployeeannualincomeshistoriesannualincomeid3:any=[];
datahrmssalaryemployeeannualincomeshistoriesmode3:any=[];
bfilterPopulatehrmssalaryemployeeannualincomeshistories:boolean=false;
datahrmssalaryemployeeregulardeductionshistoriesmode3:any=[];
datahrmssalaryemployeeregulardeductionshistoriesexpenseid3:any=[];
bfilterPopulatehrmssalaryemployeeregulardeductionshistories:boolean=false;
datahrmssalaryemployeeregularincomeshistoriesmode3:any=[];
datahrmssalaryemployeeregularincomeshistoriesincomeid3:any=[];
bfilterPopulatehrmssalaryemployeeregularincomeshistories:boolean=false;
@ViewChild('tblhrmssalaryemployeeannualincomeshistoriessource',{static:false}) tblhrmssalaryemployeeannualincomeshistoriessource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryemployeeregulardeductionshistoriessource',{static:false}) tblhrmssalaryemployeeregulardeductionshistoriessource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryemployeeregularincomeshistoriessource',{static:false}) tblhrmssalaryemployeeregularincomeshistoriessource: Ng2SmartTableComponent;
 hrmsemployeesalarymastershistoryForm: FormGroup;
roleidList: bouserrolemaster[];
salarytypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeesalarymastershistoryshowOption:boolean;
hrmssalaryemployeeannualincomeshistoryshowOption:boolean;
hrmssalaryemployeeregulardeductionshistoryshowOption:boolean;
hrmssalaryemployeeregularincomeshistoryshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmssalaryemployeeannualincomeshistoriesvisiblelist:any;
hrmssalaryemployeeannualincomeshistorieshidelist:any;
hrmssalaryemployeeregulardeductionshistoriesvisiblelist:any;
hrmssalaryemployeeregulardeductionshistorieshidelist:any;
hrmssalaryemployeeregularincomeshistoriesvisiblelist:any;
hrmssalaryemployeeregularincomeshistorieshidelist:any;

DeletedhrmssalaryemployeeannualincomeshistoryIDs: string="";
hrmssalaryemployeeannualincomeshistoriesID: string = "1";
hrmssalaryemployeeannualincomeshistoriesselectedindex:any;
DeletedhrmssalaryemployeeregulardeductionshistoryIDs: string="";
hrmssalaryemployeeregulardeductionshistoriesID: string = "2";
hrmssalaryemployeeregulardeductionshistoriesselectedindex:any;
DeletedhrmssalaryemployeeregularincomeshistoryIDs: string="";
hrmssalaryemployeeregularincomeshistoriesID: string = "3";
hrmssalaryemployeeregularincomeshistoriesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsemployeesalarymastershistoryservice: hrmsemployeesalarymastershistoryService,
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
this.hrmsemployeesalarymastershistoryForm  = this.fb.group({
pk:[null],
salarymasterid: [null],
effectivedate: [null],
roleid: [null],
roleiddesc: [null],
employeeid: [null],
salarytype: [null],
salarytypedesc: [null],
basic: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeesalarymastershistoryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeesalarymastershistoryForm.dirty && this.hrmsemployeesalarymastershistoryForm.touched ) {
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
let hrmsemployeesalarymastershistoryid = null;

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
this.formid=hrmsemployeesalarymastershistoryid;
//this.sharedService.alert(hrmsemployeesalarymastershistoryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmssalaryemployeeannualincomeshistoriesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomeshistoriesTableddConfig();
  });

this.SethrmssalaryemployeeregulardeductionshistoriesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionshistoriesTableddConfig();
  });

this.SethrmssalaryemployeeregularincomeshistoriesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomeshistoriesTableddConfig();
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
    this.hrmsemployeesalarymastershistoryservice.gethrmsemployeesalarymastershistoriesList().then(res => {
      this.pkList = res as hrmsemployeesalarymastershistory[];
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
this.hrmsemployeesalarymastershistoryForm.markAsUntouched();
this.hrmsemployeesalarymastershistoryForm.markAsPristine();
}



resetForm() {
if (this.hrmsemployeesalarymastershistoryForm != null)
this.hrmsemployeesalarymastershistoryForm.reset();
this.hrmsemployeesalarymastershistoryForm.patchValue({
});
setTimeout(() => {
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories=[];
this.hrmssalaryemployeeannualincomeshistoriesLoadTable();
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories=[];
this.hrmssalaryemployeeregulardeductionshistoriesLoadTable();
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories=[];
this.hrmssalaryemployeeregularincomeshistoriesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let salarymasterid = this.hrmsemployeesalarymastershistoryForm.get('salarymasterid').value;
        if(salarymasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeesalarymastershistoryservice.deletehrmsemployeesalarymastershistory(salarymasterid).then(res =>
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
    this.hrmsemployeesalarymastershistoryForm.patchValue({
        salarymasterid: null
    });
    if(this.hrmsemployeesalarymastershistoryservice.formData.salarymasterid!=null)this.hrmsemployeesalarymastershistoryservice.formData.salarymasterid=null;
for (let i=0;i<this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.length;i++) {
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories[i].aiid=null;
}
for (let i=0;i<this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.length;i++) {
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories[i].rdid=null;
}
for (let i=0;i<this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.length;i++) {
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories[i].riid=null;
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
this.hrmsemployeesalarymastershistoryForm.patchValue({"effectivedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeesalarymastershistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeesalarymastershistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeesalarymastershistoryForm.controls[key]!=undefined)
{
this.hrmsemployeesalarymastershistoryForm.controls[key].disable({onlySelf: true});
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
this.hrmsemployeesalarymastershistoryForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
employeeidonChange(evt:any){
let e=evt.value;
}
salarytypeonChange(evt:any){
let e=this.f.salarytype.value as any;
this.hrmsemployeesalarymastershistoryForm.patchValue({salarytypedesc:evt.options[evt.options.selectedIndex].text});
}
basiconChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeesalarymastershistories() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeesalarymastershistoryservice.gethrmsemployeesalarymastershistoriesByEID(pkcol).then(res => {

this.hrmsemployeesalarymastershistoryservice.formData=res.hrmsemployeesalarymastershistory;
let formproperty=res.hrmsemployeesalarymastershistory.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeesalarymastershistory.pkcol;
this.formid=res.hrmsemployeesalarymastershistory.salarymasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeesalarymastershistory.salarymasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeesalarymastershistoryForm.patchValue({
salarymasterid: res.hrmsemployeesalarymastershistory.salarymasterid,
effectivedate: this.ngbDateParserFormatter.parse(res.hrmsemployeesalarymastershistory.effectivedate),
roleid: res.hrmsemployeesalarymastershistory.roleid,
roleiddesc: res.hrmsemployeesalarymastershistory.roleiddesc,
employeeid: res.hrmsemployeesalarymastershistory.employeeid,
salarytype: res.hrmsemployeesalarymastershistory.salarytype,
salarytypedesc: res.hrmsemployeesalarymastershistory.salarytypedesc,
basic: res.hrmsemployeesalarymastershistory.basic,
status: res.hrmsemployeesalarymastershistory.status,
statusdesc: res.hrmsemployeesalarymastershistory.statusdesc,
});
this.hrmssalaryemployeeannualincomeshistoriesvisiblelist=res.hrmssalaryemployeeannualincomeshistoriesvisiblelist;
this.hrmssalaryemployeeregulardeductionshistoriesvisiblelist=res.hrmssalaryemployeeregulardeductionshistoriesvisiblelist;
this.hrmssalaryemployeeregularincomeshistoriesvisiblelist=res.hrmssalaryemployeeregularincomeshistoriesvisiblelist;
//Child Tables if any
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories = res.hrmssalaryemployeeannualincomeshistories;
this.SethrmssalaryemployeeannualincomeshistoriesTableConfig();
this.hrmssalaryemployeeannualincomeshistoriesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomeshistoriesTableddConfig();
  });
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories = res.hrmssalaryemployeeregulardeductionshistories;
this.SethrmssalaryemployeeregulardeductionshistoriesTableConfig();
this.hrmssalaryemployeeregulardeductionshistoriesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionshistoriesTableddConfig();
  });
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories = res.hrmssalaryemployeeregularincomeshistories;
this.SethrmssalaryemployeeregularincomeshistoriesTableConfig();
this.hrmssalaryemployeeregularincomeshistoriesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomeshistoriesTableddConfig();
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
  for (let key in this.hrmsemployeesalarymastershistoryForm.controls) {
    if (this.hrmsemployeesalarymastershistoryForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeesalarymastershistoryservice.formData!=null && this.hrmsemployeesalarymastershistoryservice.formData[key]!=null  && this.hrmsemployeesalarymastershistoryservice.formData[key]!='[]' && this.hrmsemployeesalarymastershistoryservice.formData[key]!=undefined && this.hrmsemployeesalarymastershistoryservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeesalarymastershistoryservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeesalarymastershistoryservice.formData!=null && this.hrmsemployeesalarymastershistoryservice.formData[key]!=null   && this.hrmsemployeesalarymastershistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeesalarymastershistoryservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeesalarymastershistoryservice.formData!=null && this.hrmsemployeesalarymastershistoryservice.formData[key]!=null   && this.hrmsemployeesalarymastershistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeesalarymastershistoryservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeesalarymastershistoryservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeesalarymastershistoryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeesalarymastershistoryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeesalarymastershistoryForm.value;
obj.effectivedate=new Date(this.hrmsemployeesalarymastershistoryForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeesalarymastershistoryForm.get('effectivedate').value)+'  UTC' :null);
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

private hrmsemployeesalarymastershistorytoggleOption(){
this.hrmsemployeesalarymastershistoryshowOption = this.hrmsemployeesalarymastershistoryshowOption === true ? false : true;
}

private hrmssalaryemployeeannualincomeshistorytoggleOption(){
this.hrmssalaryemployeeannualincomeshistoryshowOption = this.hrmssalaryemployeeannualincomeshistoryshowOption === true ? false : true;
}

private hrmssalaryemployeeregulardeductionshistorytoggleOption(){
this.hrmssalaryemployeeregulardeductionshistoryshowOption = this.hrmssalaryemployeeregulardeductionshistoryshowOption === true ? false : true;
}

private hrmssalaryemployeeregularincomeshistorytoggleOption(){
this.hrmssalaryemployeeregularincomeshistoryshowOption = this.hrmssalaryemployeeregularincomeshistoryshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeesalarymastershistoryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeesalarymastershistoryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeesalarymastershistoryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeesalarymastershistoryservice.formData=this.hrmsemployeesalarymastershistoryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeesalarymastershistoryForm.controls[key] != null)
    {
        this.hrmsemployeesalarymastershistoryservice.formData[key] = this.hrmsemployeesalarymastershistoryForm.controls[key].value;
    }
}
}
}
this.hrmsemployeesalarymastershistoryservice.formData.effectivedate=new Date(this.hrmsemployeesalarymastershistoryForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeesalarymastershistoryForm.get('effectivedate').value)+'  UTC' :null);
this.hrmsemployeesalarymastershistoryservice.formData.DeletedhrmssalaryemployeeannualincomeshistoryIDs = this.DeletedhrmssalaryemployeeannualincomeshistoryIDs;
this.hrmsemployeesalarymastershistoryservice.formData.DeletedhrmssalaryemployeeregulardeductionshistoryIDs = this.DeletedhrmssalaryemployeeregulardeductionshistoryIDs;
this.hrmsemployeesalarymastershistoryservice.formData.DeletedhrmssalaryemployeeregularincomeshistoryIDs = this.DeletedhrmssalaryemployeeregularincomeshistoryIDs;
console.log(this.hrmsemployeesalarymastershistoryservice.formData);
this.hrmsemployeesalarymastershistoryservice.formData=this.hrmsemployeesalarymastershistoryForm.value;
this.hrmsemployeesalarymastershistoryservice.saveOrUpdatehrmsemployeesalarymastershistories().subscribe(
async res => {
if (this.hrmssalaryemployeeannualincomeshistoriessource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeannualincomeshistoriessource.data.length; i++)
    {
        if (this.hrmssalaryemployeeannualincomeshistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeannualincomeshistoriessource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryemployeeregulardeductionshistoriessource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeregulardeductionshistoriessource.data.length; i++)
    {
        if (this.hrmssalaryemployeeregulardeductionshistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeregulardeductionshistoriessource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryemployeeregularincomeshistoriessource.data)
{
    for (let i = 0; i < this.hrmssalaryemployeeregularincomeshistoriessource.data.length; i++)
    {
        if (this.hrmssalaryemployeeregularincomeshistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryemployeeregularincomeshistoriessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeesalarymastershistory);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeesalarymastershistoryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeesalarymastershistory);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeesalarymastershistoryForm.markAsUntouched();
this.hrmsemployeesalarymastershistoryForm.markAsPristine();
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
data: {userroleid:this.hrmsemployeesalarymastershistoryForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmssalaryemployeeannualincomeshistory(event:any,aiid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeannualincomeshistoryComponent, 
{
data:  {  showview:false,save:false,event,aiid, salarymasterid,visiblelist:this.hrmssalaryemployeeannualincomeshistoriesvisiblelist,  hidelist:this.hrmssalaryemployeeannualincomeshistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeannualincomeshistoriessource.add(res);
this.hrmssalaryemployeeannualincomeshistoriessource.refresh();
}
else
{
this.hrmssalaryemployeeannualincomeshistoriessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeannualincomeshistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeannualincomeshistoryIDs += childID + ",";
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryemployeeregulardeductionshistory(event:any,rdid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeregulardeductionshistoryComponent, 
{
data:  {  showview:false,save:false,event,rdid, salarymasterid,visiblelist:this.hrmssalaryemployeeregulardeductionshistoriesvisiblelist,  hidelist:this.hrmssalaryemployeeregulardeductionshistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeregulardeductionshistoriessource.add(res);
this.hrmssalaryemployeeregulardeductionshistoriessource.refresh();
}
else
{
this.hrmssalaryemployeeregulardeductionshistoriessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeregulardeductionshistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeregulardeductionshistoryIDs += childID + ",";
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryemployeeregularincomeshistory(event:any,riid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryemployeeregularincomeshistoryComponent, 
{
data:  {  showview:false,save:false,event,riid, salarymasterid,visiblelist:this.hrmssalaryemployeeregularincomeshistoriesvisiblelist,  hidelist:this.hrmssalaryemployeeregularincomeshistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryemployeeregularincomeshistoriessource.add(res);
this.hrmssalaryemployeeregularincomeshistoriessource.refresh();
}
else
{
this.hrmssalaryemployeeregularincomeshistoriessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryemployeeregularincomeshistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryemployeeregularincomeshistoryIDs += childID + ",";
this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmssalaryemployeeannualincomeshistories
hrmssalaryemployeeannualincomeshistoriessettings:any;
hrmssalaryemployeeannualincomeshistoriessource: any;

showhrmssalaryemployeeannualincomeshistoriesCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeannualincomeshistoriessource.initGrid();
}
deletehrmssalaryemployeeannualincomeshistoriesAll()
{
this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeannualincomeshistoriesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeannualincomeshistoriesTableddConfig();
  });
      if(this.tblhrmssalaryemployeeannualincomeshistoriessource.settings!=null)this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeannualincomeshistoriessource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeannualincomeshistoriessource.initGrid();
}
showhrmssalaryemployeeannualincomeshistoriesInActive()
{
}
enablehrmssalaryemployeeannualincomeshistoriesInActive()
{
}
async SethrmssalaryemployeeannualincomeshistoriesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeannualincomeshistories){
}
this.bfilterPopulatehrmssalaryemployeeannualincomeshistories=true;
}
async hrmssalaryemployeeannualincomeshistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeannualincomeshistoriesTableConfig()
{
this.hrmssalaryemployeeannualincomeshistoriessettings = {
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
},
};
}
hrmssalaryemployeeannualincomeshistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeannualincomeshistoriesID)>=0)
{
this.hrmssalaryemployeeannualincomeshistoriessource=new LocalDataSource();
this.hrmssalaryemployeeannualincomeshistoriessource.load(this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories as  any as LocalDataSource);
this.hrmssalaryemployeeannualincomeshistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeannualincomeshistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.length == 0)
{
    this.tblhrmssalaryemployeeannualincomeshistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeannualincomeshistory();
    this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.push(obj);
    this.hrmssalaryemployeeannualincomeshistoriessource.refresh();
    if ((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.length / this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().page)
    {
        this.hrmssalaryemployeeannualincomeshistoriessource.setPage((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.length / this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeannualincomeshistoriessource.grid.edit(this.tblhrmssalaryemployeeannualincomeshistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeannualincomeshistoriessource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeannualincomeshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().perPage)+index);
this.hrmssalaryemployeeannualincomeshistoriessource.refresh();
break;
}
}

*/
hrmssalaryemployeeannualincomeshistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeannualincomeshistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeannualincomeshistory(event,event.data.salarymasterid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeannualincomeshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeannualincomeshistoriessource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeannualincomeshistoriessource.refresh();
break;
}
}
hrmssalaryemployeeannualincomeshistoriesonDelete(obj) {
let salarymasterid=obj.data.salarymasterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymastershistoryservice.deletehrmsemployeesalarymastershistory(salarymasterid).then(res=>
this.hrmssalaryemployeeannualincomeshistoriesLoadTable()
);
}
}
hrmssalaryemployeeannualincomeshistoriesPaging(val)
{
debugger;
this.hrmssalaryemployeeannualincomeshistoriessource.setPaging(1, val, true);
}

handlehrmssalaryemployeeannualincomeshistoriesGridSelected(event:any) {
this.hrmssalaryemployeeannualincomeshistoriesselectedindex=this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeannualincomeshistories.findIndex(i => i.aiid === event.data.aiid);
}
IshrmssalaryemployeeannualincomeshistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeannualincomeshistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeannualincomeshistories
//start of Grid Codes hrmssalaryemployeeregulardeductionshistories
hrmssalaryemployeeregulardeductionshistoriessettings:any;
hrmssalaryemployeeregulardeductionshistoriessource: any;

showhrmssalaryemployeeregulardeductionshistoriesCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeregulardeductionshistoriessource.initGrid();
}
deletehrmssalaryemployeeregulardeductionshistoriesAll()
{
this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeregulardeductionshistoriesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeregulardeductionshistoriesTableddConfig();
  });
      if(this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings!=null)this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeregulardeductionshistoriessource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeregulardeductionshistoriessource.initGrid();
}
showhrmssalaryemployeeregulardeductionshistoriesInActive()
{
}
enablehrmssalaryemployeeregulardeductionshistoriesInActive()
{
}
async SethrmssalaryemployeeregulardeductionshistoriesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeregulardeductionshistories){
}
this.bfilterPopulatehrmssalaryemployeeregulardeductionshistories=true;
}
async hrmssalaryemployeeregulardeductionshistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeregulardeductionshistoriesTableConfig()
{
this.hrmssalaryemployeeregulardeductionshistoriessettings = {
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
},
};
}
hrmssalaryemployeeregulardeductionshistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregulardeductionshistoriesID)>=0)
{
this.hrmssalaryemployeeregulardeductionshistoriessource=new LocalDataSource();
this.hrmssalaryemployeeregulardeductionshistoriessource.load(this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories as  any as LocalDataSource);
this.hrmssalaryemployeeregulardeductionshistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeregulardeductionshistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.length == 0)
{
    this.tblhrmssalaryemployeeregulardeductionshistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeregulardeductionshistory();
    this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.push(obj);
    this.hrmssalaryemployeeregulardeductionshistoriessource.refresh();
    if ((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.length / this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().page)
    {
        this.hrmssalaryemployeeregulardeductionshistoriessource.setPage((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.length / this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeregulardeductionshistoriessource.grid.edit(this.tblhrmssalaryemployeeregulardeductionshistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeregulardeductionshistoriessource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeregulardeductionshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().perPage)+index);
this.hrmssalaryemployeeregulardeductionshistoriessource.refresh();
break;
}
}

*/
hrmssalaryemployeeregulardeductionshistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeregulardeductionshistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeregulardeductionshistory(event,event.data.salarymasterid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeregulardeductionshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeregulardeductionshistoriessource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeregulardeductionshistoriessource.refresh();
break;
}
}
hrmssalaryemployeeregulardeductionshistoriesonDelete(obj) {
let salarymasterid=obj.data.salarymasterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymastershistoryservice.deletehrmsemployeesalarymastershistory(salarymasterid).then(res=>
this.hrmssalaryemployeeregulardeductionshistoriesLoadTable()
);
}
}
hrmssalaryemployeeregulardeductionshistoriesPaging(val)
{
debugger;
this.hrmssalaryemployeeregulardeductionshistoriessource.setPaging(1, val, true);
}

handlehrmssalaryemployeeregulardeductionshistoriesGridSelected(event:any) {
this.hrmssalaryemployeeregulardeductionshistoriesselectedindex=this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregulardeductionshistories.findIndex(i => i.rdid === event.data.rdid);
}
IshrmssalaryemployeeregulardeductionshistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregulardeductionshistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeregulardeductionshistories
//start of Grid Codes hrmssalaryemployeeregularincomeshistories
hrmssalaryemployeeregularincomeshistoriessettings:any;
hrmssalaryemployeeregularincomeshistoriessource: any;

showhrmssalaryemployeeregularincomeshistoriesCheckbox()
{
debugger;
if(this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['selectMode']== 'multi')this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['selectMode']= 'multi';
this.tblhrmssalaryemployeeregularincomeshistoriessource.initGrid();
}
deletehrmssalaryemployeeregularincomeshistoriesAll()
{
this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['selectMode'] = 'single';
}
showhrmssalaryemployeeregularincomeshistoriesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryemployeeregularincomeshistoriesTableddConfig();
  });
      if(this.tblhrmssalaryemployeeregularincomeshistoriessource.settings!=null)this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['hideSubHeader'] =!this.tblhrmssalaryemployeeregularincomeshistoriessource.settings['hideSubHeader'];
this.tblhrmssalaryemployeeregularincomeshistoriessource.initGrid();
}
showhrmssalaryemployeeregularincomeshistoriesInActive()
{
}
enablehrmssalaryemployeeregularincomeshistoriesInActive()
{
}
async SethrmssalaryemployeeregularincomeshistoriesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryemployeeregularincomeshistories){
}
this.bfilterPopulatehrmssalaryemployeeregularincomeshistories=true;
}
async hrmssalaryemployeeregularincomeshistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryemployeeregularincomeshistoriesTableConfig()
{
this.hrmssalaryemployeeregularincomeshistoriessettings = {
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
},
};
}
hrmssalaryemployeeregularincomeshistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregularincomeshistoriesID)>=0)
{
this.hrmssalaryemployeeregularincomeshistoriessource=new LocalDataSource();
this.hrmssalaryemployeeregularincomeshistoriessource.load(this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories as  any as LocalDataSource);
this.hrmssalaryemployeeregularincomeshistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryemployeeregularincomeshistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.length == 0)
{
    this.tblhrmssalaryemployeeregularincomeshistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryemployeeregularincomeshistory();
    this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.push(obj);
    this.hrmssalaryemployeeregularincomeshistoriessource.refresh();
    if ((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.length / this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().page)
    {
        this.hrmssalaryemployeeregularincomeshistoriessource.setPage((this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.length / this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryemployeeregularincomeshistoriessource.grid.edit(this.tblhrmssalaryemployeeregularincomeshistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryemployeeregularincomeshistoriessource.data.indexOf(event.data);
this.onDeletehrmssalaryemployeeregularincomeshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().perPage)+index);
this.hrmssalaryemployeeregularincomeshistoriessource.refresh();
break;
}
}

*/
hrmssalaryemployeeregularincomeshistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryemployeeregularincomeshistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryemployeeregularincomeshistory(event,event.data.salarymasterid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryemployeeregularincomeshistory(event,event.data.salarymasterid,((this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().page-1) *this.hrmssalaryemployeeregularincomeshistoriessource.getPaging().perPage)+event.index);
this.hrmssalaryemployeeregularincomeshistoriessource.refresh();
break;
}
}
hrmssalaryemployeeregularincomeshistoriesonDelete(obj) {
let salarymasterid=obj.data.salarymasterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeesalarymastershistoryservice.deletehrmsemployeesalarymastershistory(salarymasterid).then(res=>
this.hrmssalaryemployeeregularincomeshistoriesLoadTable()
);
}
}
hrmssalaryemployeeregularincomeshistoriesPaging(val)
{
debugger;
this.hrmssalaryemployeeregularincomeshistoriessource.setPaging(1, val, true);
}

handlehrmssalaryemployeeregularincomeshistoriesGridSelected(event:any) {
this.hrmssalaryemployeeregularincomeshistoriesselectedindex=this.hrmsemployeesalarymastershistoryservice.hrmssalaryemployeeregularincomeshistories.findIndex(i => i.riid === event.data.riid);
}
IshrmssalaryemployeeregularincomeshistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryemployeeregularincomeshistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryemployeeregularincomeshistories

}



