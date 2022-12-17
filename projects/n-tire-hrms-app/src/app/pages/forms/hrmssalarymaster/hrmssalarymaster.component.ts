import { hrmssalarymasterService } from './../../../service/hrmssalarymaster.service';
import { hrmssalarymaster } from './../../../model/hrmssalarymaster.model';
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
import { hrmssalaryannualincome } from './../../../model/hrmssalaryannualincome.model';
import { hrmssalaryannualincomeComponent } from './../../../pages/forms/hrmssalaryannualincome/hrmssalaryannualincome.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hrmssalaryregulardeduction } from './../../../model/hrmssalaryregulardeduction.model';
import { hrmssalaryregulardeductionComponent } from './../../../pages/forms/hrmssalaryregulardeduction/hrmssalaryregulardeduction.component';
//FK services
import { hrmssalaryregularincome } from './../../../model/hrmssalaryregularincome.model';
import { hrmssalaryregularincomeComponent } from './../../../pages/forms/hrmssalaryregularincome/hrmssalaryregularincome.component';
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
selector: 'app-hrmssalarymaster',
templateUrl: './hrmssalarymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmssalarymasterComponent implements OnInit {
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
bfilterPopulatehrmssalarymasters:boolean=false;
datahrmssalarymastersroleid3:any=[];
datahrmssalarymasterssalarytype3:any=[];
datahrmssalaryannualincomesmode3:any=[];
datahrmssalaryannualincomesannualincomeid3:any=[];
bfilterPopulatehrmssalaryannualincomes:boolean=false;
datahrmssalaryregulardeductionsmode3:any=[];
datahrmssalaryregulardeductionsexpenseid3:any=[];
bfilterPopulatehrmssalaryregulardeductions:boolean=false;
datahrmssalaryregularincomesmode3:any=[];
datahrmssalaryregularincomesincomeid3:any=[];
bfilterPopulatehrmssalaryregularincomes:boolean=false;
@ViewChild('tblhrmssalaryannualincomessource',{static:false}) tblhrmssalaryannualincomessource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryregulardeductionssource',{static:false}) tblhrmssalaryregulardeductionssource: Ng2SmartTableComponent;
@ViewChild('tblhrmssalaryregularincomessource',{static:false}) tblhrmssalaryregularincomessource: Ng2SmartTableComponent;
 hrmssalarymasterForm: FormGroup;
roleidList: bouserrolemaster[];
salarytypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmssalarymastershowOption:boolean;
hrmssalaryannualincomeshowOption:boolean;
hrmssalaryregulardeductionshowOption:boolean;
hrmssalaryregularincomeshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmssalaryannualincomesvisiblelist:any;
hrmssalaryannualincomeshidelist:any;
hrmssalaryregulardeductionsvisiblelist:any;
hrmssalaryregulardeductionshidelist:any;
hrmssalaryregularincomesvisiblelist:any;
hrmssalaryregularincomeshidelist:any;

DeletedhrmssalaryannualincomeIDs: string="";
hrmssalaryannualincomesID: string = "1";
hrmssalaryannualincomesselectedindex:any;
DeletedhrmssalaryregulardeductionIDs: string="";
hrmssalaryregulardeductionsID: string = "2";
hrmssalaryregulardeductionsselectedindex:any;
DeletedhrmssalaryregularincomeIDs: string="";
hrmssalaryregularincomesID: string = "3";
hrmssalaryregularincomesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmssalarymasterservice: hrmssalarymasterService,
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
this.hrmssalarymasterForm  = this.fb.group({
pk:[null],
salarymasterid: [null],
roleid: [null],
roleiddesc: [null],
salarytype: [null],
salarytypedesc: [null],
basic: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmssalarymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmssalarymasterForm.dirty && this.hrmssalarymasterForm.touched ) {
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
let hrmssalarymasterid = null;

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
this.formid=hrmssalarymasterid;
//this.sharedService.alert(hrmssalarymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmssalaryannualincomesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryannualincomesTableddConfig();
  });

this.SethrmssalaryregulardeductionsTableConfig();
  setTimeout(() => {
  this.SethrmssalaryregulardeductionsTableddConfig();
  });

this.SethrmssalaryregularincomesTableConfig();
  setTimeout(() => {
  this.SethrmssalaryregularincomesTableddConfig();
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
    this.hrmssalarymasterservice.gethrmssalarymastersList().then(res => {
      this.pkList = res as hrmssalarymaster[];
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
this.hrmssalarymasterForm.markAsUntouched();
this.hrmssalarymasterForm.markAsPristine();
}



resetForm() {
if (this.hrmssalarymasterForm != null)
this.hrmssalarymasterForm.reset();
this.hrmssalarymasterForm.patchValue({
});
setTimeout(() => {
this.hrmssalarymasterservice.hrmssalaryannualincomes=[];
this.hrmssalaryannualincomesLoadTable();
this.hrmssalarymasterservice.hrmssalaryregulardeductions=[];
this.hrmssalaryregulardeductionsLoadTable();
this.hrmssalarymasterservice.hrmssalaryregularincomes=[];
this.hrmssalaryregularincomesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let salarymasterid = this.hrmssalarymasterForm.get('salarymasterid').value;
        if(salarymasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmssalarymasterservice.deletehrmssalarymaster(salarymasterid).then(res =>
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
    this.hrmssalarymasterForm.patchValue({
        salarymasterid: null
    });
    if(this.hrmssalarymasterservice.formData.salarymasterid!=null)this.hrmssalarymasterservice.formData.salarymasterid=null;
for (let i=0;i<this.hrmssalarymasterservice.hrmssalaryannualincomes.length;i++) {
this.hrmssalarymasterservice.hrmssalaryannualincomes[i].aiid=null;
}
for (let i=0;i<this.hrmssalarymasterservice.hrmssalaryregulardeductions.length;i++) {
this.hrmssalarymasterservice.hrmssalaryregulardeductions[i].rdid=null;
}
for (let i=0;i<this.hrmssalarymasterservice.hrmssalaryregularincomes.length;i++) {
this.hrmssalarymasterservice.hrmssalaryregularincomes[i].riid=null;
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
        else if(ctrltype=="string")
{
this.hrmssalarymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmssalarymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmssalarymasterForm.controls[key]!=undefined)
{
this.hrmssalarymasterForm.controls[key].disable({onlySelf: true});
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
roleidonChange(evt:any){
let e=evt.value;
this.hrmssalarymasterForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
salarytypeonChange(evt:any){
let e=this.f.salarytype.value as any;
this.hrmssalarymasterForm.patchValue({salarytypedesc:evt.options[evt.options.selectedIndex].text});
}
basiconChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmssalarymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmssalarymasterservice.gethrmssalarymastersByEID(pkcol).then(res => {

this.hrmssalarymasterservice.formData=res.hrmssalarymaster;
let formproperty=res.hrmssalarymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmssalarymaster.pkcol;
this.formid=res.hrmssalarymaster.salarymasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmssalarymaster.salarymasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmssalarymasterForm.patchValue({
salarymasterid: res.hrmssalarymaster.salarymasterid,
roleid: res.hrmssalarymaster.roleid,
roleiddesc: res.hrmssalarymaster.roleiddesc,
salarytype: res.hrmssalarymaster.salarytype,
salarytypedesc: res.hrmssalarymaster.salarytypedesc,
basic: res.hrmssalarymaster.basic,
status: res.hrmssalarymaster.status,
statusdesc: res.hrmssalarymaster.statusdesc,
});
this.hrmssalaryannualincomesvisiblelist=res.hrmssalaryannualincomesvisiblelist;
this.hrmssalaryregulardeductionsvisiblelist=res.hrmssalaryregulardeductionsvisiblelist;
this.hrmssalaryregularincomesvisiblelist=res.hrmssalaryregularincomesvisiblelist;
//Child Tables if any
this.hrmssalarymasterservice.hrmssalaryannualincomes = res.hrmssalaryannualincomes;
this.SethrmssalaryannualincomesTableConfig();
this.hrmssalaryannualincomesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryannualincomesTableddConfig();
  });
this.hrmssalarymasterservice.hrmssalaryregulardeductions = res.hrmssalaryregulardeductions;
this.SethrmssalaryregulardeductionsTableConfig();
this.hrmssalaryregulardeductionsLoadTable();
  setTimeout(() => {
  this.SethrmssalaryregulardeductionsTableddConfig();
  });
this.hrmssalarymasterservice.hrmssalaryregularincomes = res.hrmssalaryregularincomes;
this.SethrmssalaryregularincomesTableConfig();
this.hrmssalaryregularincomesLoadTable();
  setTimeout(() => {
  this.SethrmssalaryregularincomesTableddConfig();
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
  for (let key in this.hrmssalarymasterForm.controls) {
    if (this.hrmssalarymasterForm.controls[key] != null) {
if(false)
{
if(this.hrmssalarymasterservice.formData!=null && this.hrmssalarymasterservice.formData[key]!=null  && this.hrmssalarymasterservice.formData[key]!='[]' && this.hrmssalarymasterservice.formData[key]!=undefined && this.hrmssalarymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmssalarymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmssalarymasterservice.formData!=null && this.hrmssalarymasterservice.formData[key]!=null   && this.hrmssalarymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmssalarymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmssalarymasterservice.formData!=null && this.hrmssalarymasterservice.formData[key]!=null   && this.hrmssalarymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmssalarymasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmssalarymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmssalarymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmssalarymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmssalarymasterForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private hrmssalarymastertoggleOption(){
this.hrmssalarymastershowOption = this.hrmssalarymastershowOption === true ? false : true;
}

private hrmssalaryannualincometoggleOption(){
this.hrmssalaryannualincomeshowOption = this.hrmssalaryannualincomeshowOption === true ? false : true;
}

private hrmssalaryregulardeductiontoggleOption(){
this.hrmssalaryregulardeductionshowOption = this.hrmssalaryregulardeductionshowOption === true ? false : true;
}

private hrmssalaryregularincometoggleOption(){
this.hrmssalaryregularincomeshowOption = this.hrmssalaryregularincomeshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmssalarymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmssalarymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmssalarymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmssalarymasterservice.formData=this.hrmssalarymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmssalarymasterForm.controls[key] != null)
    {
        this.hrmssalarymasterservice.formData[key] = this.hrmssalarymasterForm.controls[key].value;
    }
}
}
}
this.hrmssalarymasterservice.formData.DeletedhrmssalaryannualincomeIDs = this.DeletedhrmssalaryannualincomeIDs;
this.hrmssalarymasterservice.formData.DeletedhrmssalaryregulardeductionIDs = this.DeletedhrmssalaryregulardeductionIDs;
this.hrmssalarymasterservice.formData.DeletedhrmssalaryregularincomeIDs = this.DeletedhrmssalaryregularincomeIDs;
console.log(this.hrmssalarymasterservice.formData);
this.hrmssalarymasterservice.formData=this.hrmssalarymasterForm.value;
this.hrmssalarymasterservice.saveOrUpdatehrmssalarymasters().subscribe(
async res => {
if (this.hrmssalaryannualincomessource.data)
{
    for (let i = 0; i < this.hrmssalaryannualincomessource.data.length; i++)
    {
        if (this.hrmssalaryannualincomessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryannualincomessource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryregulardeductionssource.data)
{
    for (let i = 0; i < this.hrmssalaryregulardeductionssource.data.length; i++)
    {
        if (this.hrmssalaryregulardeductionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryregulardeductionssource.data[i].fileattachmentlist);
    }
}
if (this.hrmssalaryregularincomessource.data)
{
    for (let i = 0; i < this.hrmssalaryregularincomessource.data.length; i++)
    {
        if (this.hrmssalaryregularincomessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssalaryregularincomessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmssalarymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmssalarymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmssalarymaster);
}
else
{
this.FillData(res);
}
}
this.hrmssalarymasterForm.markAsUntouched();
this.hrmssalarymasterForm.markAsPristine();
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
data: {userroleid:this.hrmssalarymasterForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmssalaryannualincome(event:any,aiid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryannualincomeComponent, 
{
data:  {  showview:false,save:false,event,aiid, salarymasterid,visiblelist:this.hrmssalaryannualincomesvisiblelist,  hidelist:this.hrmssalaryannualincomeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryannualincomessource.add(res);
this.hrmssalaryannualincomessource.refresh();
}
else
{
this.hrmssalaryannualincomessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryannualincome(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryannualincomeIDs += childID + ",";
this.hrmssalarymasterservice.hrmssalaryannualincomes.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryregulardeduction(event:any,rdid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryregulardeductionComponent, 
{
data:  {  showview:false,save:false,event,rdid, salarymasterid,visiblelist:this.hrmssalaryregulardeductionsvisiblelist,  hidelist:this.hrmssalaryregulardeductionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryregulardeductionssource.add(res);
this.hrmssalaryregulardeductionssource.refresh();
}
else
{
this.hrmssalaryregulardeductionssource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryregulardeduction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryregulardeductionIDs += childID + ",";
this.hrmssalarymasterservice.hrmssalaryregulardeductions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssalaryregularincome(event:any,riid:any, salarymasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssalaryregularincomeComponent, 
{
data:  {  showview:false,save:false,event,riid, salarymasterid,visiblelist:this.hrmssalaryregularincomesvisiblelist,  hidelist:this.hrmssalaryregularincomeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssalaryregularincomessource.add(res);
this.hrmssalaryregularincomessource.refresh();
}
else
{
this.hrmssalaryregularincomessource.update(event.data, res);
}
}
});
}

onDeletehrmssalaryregularincome(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssalaryregularincomeIDs += childID + ",";
this.hrmssalarymasterservice.hrmssalaryregularincomes.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmssalaryannualincomes
hrmssalaryannualincomessettings:any;
hrmssalaryannualincomessource: any;

showhrmssalaryannualincomesCheckbox()
{
debugger;
if(this.tblhrmssalaryannualincomessource.settings['selectMode']== 'multi')this.tblhrmssalaryannualincomessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryannualincomessource.settings['selectMode']= 'multi';
this.tblhrmssalaryannualincomessource.initGrid();
}
deletehrmssalaryannualincomesAll()
{
this.tblhrmssalaryannualincomessource.settings['selectMode'] = 'single';
}
showhrmssalaryannualincomesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryannualincomesTableddConfig();
  });
      if(this.tblhrmssalaryannualincomessource.settings!=null)this.tblhrmssalaryannualincomessource.settings['hideSubHeader'] =!this.tblhrmssalaryannualincomessource.settings['hideSubHeader'];
this.tblhrmssalaryannualincomessource.initGrid();
}
showhrmssalaryannualincomesInActive()
{
}
enablehrmssalaryannualincomesInActive()
{
}
async SethrmssalaryannualincomesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryannualincomes){

this.bomasterdataservice.getList("pazuj").then(res=>
{
var dataannualincomeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryannualincomesannualincomeid3.push(defaultobj);
for(let i=0; i<dataannualincomeid2.length; i++){
var obj= { value: dataannualincomeid2[i].masterdataid, title:dataannualincomeid2[i].masterdatadescription};
this.datahrmssalaryannualincomesannualincomeid3.push(obj);
}
if((this.tblhrmssalaryannualincomessource.settings as any).columns['annualincomeid'])
{
(this.tblhrmssalaryannualincomessource.settings as any).columns['annualincomeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryannualincomesannualincomeid3));
this.tblhrmssalaryannualincomessource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryannualincomesmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryannualincomesmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryannualincomessource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryannualincomesmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryannualincomesmode3)), }, };
this.tblhrmssalaryannualincomessource.settings =  clone;
this.tblhrmssalaryannualincomessource.initGrid();
});
}
this.bfilterPopulatehrmssalaryannualincomes=true;
}
async hrmssalaryannualincomesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryannualincomesTableConfig()
{
this.hrmssalaryannualincomessettings = {
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
annualincomeid: {
title: 'Annual Income',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryannualincomesannualincomeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryannualincomesmode3.find(c=>c.value==cell);
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
hrmssalaryannualincomesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryannualincomesID)>=0)
{
this.hrmssalaryannualincomessource=new LocalDataSource();
this.hrmssalaryannualincomessource.load(this.hrmssalarymasterservice.hrmssalaryannualincomes as  any as LocalDataSource);
this.hrmssalaryannualincomessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryannualincomesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmssalarymasterservice.hrmssalaryannualincomes.length == 0)
{
    this.tblhrmssalaryannualincomessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryannualincome();
    this.hrmssalarymasterservice.hrmssalaryannualincomes.push(obj);
    this.hrmssalaryannualincomessource.refresh();
    if ((this.hrmssalarymasterservice.hrmssalaryannualincomes.length / this.hrmssalaryannualincomessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryannualincomessource.getPaging().page)
    {
        this.hrmssalaryannualincomessource.setPage((this.hrmssalarymasterservice.hrmssalaryannualincomes.length / this.hrmssalaryannualincomessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryannualincomessource.grid.edit(this.tblhrmssalaryannualincomessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryannualincomessource.data.indexOf(event.data);
this.onDeletehrmssalaryannualincome(event,event.data.aiid,((this.hrmssalaryannualincomessource.getPaging().page-1) *this.hrmssalaryannualincomessource.getPaging().perPage)+index);
this.hrmssalaryannualincomessource.refresh();
break;
}
}

*/
hrmssalaryannualincomesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryannualincome(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryannualincome(event,event.data.aiid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryannualincome(event,event.data.aiid,((this.hrmssalaryannualincomessource.getPaging().page-1) *this.hrmssalaryannualincomessource.getPaging().perPage)+event.index);
this.hrmssalaryannualincomessource.refresh();
break;
}
}
hrmssalaryannualincomesonDelete(obj) {
let aiid=obj.data.aiid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmssalarymasterservice.deletehrmssalarymaster(aiid).then(res=>
this.hrmssalaryannualincomesLoadTable()
);
}
}
hrmssalaryannualincomesPaging(val)
{
debugger;
this.hrmssalaryannualincomessource.setPaging(1, val, true);
}

handlehrmssalaryannualincomesGridSelected(event:any) {
this.hrmssalaryannualincomesselectedindex=this.hrmssalarymasterservice.hrmssalaryannualincomes.findIndex(i => i.aiid === event.data.aiid);
}
IshrmssalaryannualincomesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryannualincomesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryannualincomes
//start of Grid Codes hrmssalaryregulardeductions
hrmssalaryregulardeductionssettings:any;
hrmssalaryregulardeductionssource: any;

showhrmssalaryregulardeductionsCheckbox()
{
debugger;
if(this.tblhrmssalaryregulardeductionssource.settings['selectMode']== 'multi')this.tblhrmssalaryregulardeductionssource.settings['selectMode']= 'single';
else
this.tblhrmssalaryregulardeductionssource.settings['selectMode']= 'multi';
this.tblhrmssalaryregulardeductionssource.initGrid();
}
deletehrmssalaryregulardeductionsAll()
{
this.tblhrmssalaryregulardeductionssource.settings['selectMode'] = 'single';
}
showhrmssalaryregulardeductionsFilter()
{
  setTimeout(() => {
  this.SethrmssalaryregulardeductionsTableddConfig();
  });
      if(this.tblhrmssalaryregulardeductionssource.settings!=null)this.tblhrmssalaryregulardeductionssource.settings['hideSubHeader'] =!this.tblhrmssalaryregulardeductionssource.settings['hideSubHeader'];
this.tblhrmssalaryregulardeductionssource.initGrid();
}
showhrmssalaryregulardeductionsInActive()
{
}
enablehrmssalaryregulardeductionsInActive()
{
}
async SethrmssalaryregulardeductionsTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryregulardeductions){

this.bomasterdataservice.getList("khsgr").then(res=>
{
var dataexpenseid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryregulardeductionsexpenseid3.push(defaultobj);
for(let i=0; i<dataexpenseid2.length; i++){
var obj= { value: dataexpenseid2[i].masterdataid, title:dataexpenseid2[i].masterdatadescription};
this.datahrmssalaryregulardeductionsexpenseid3.push(obj);
}
if((this.tblhrmssalaryregulardeductionssource.settings as any).columns['expenseid'])
{
(this.tblhrmssalaryregulardeductionssource.settings as any).columns['expenseid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryregulardeductionsexpenseid3));
this.tblhrmssalaryregulardeductionssource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryregulardeductionsmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryregulardeductionsmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryregulardeductionssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryregulardeductionsmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryregulardeductionsmode3)), }, };
this.tblhrmssalaryregulardeductionssource.settings =  clone;
this.tblhrmssalaryregulardeductionssource.initGrid();
});
}
this.bfilterPopulatehrmssalaryregulardeductions=true;
}
async hrmssalaryregulardeductionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryregulardeductionsTableConfig()
{
this.hrmssalaryregulardeductionssettings = {
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
var element= this.datahrmssalaryregulardeductionsexpenseid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryregulardeductionsmode3.find(c=>c.value==cell);
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
hrmssalaryregulardeductionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryregulardeductionsID)>=0)
{
this.hrmssalaryregulardeductionssource=new LocalDataSource();
this.hrmssalaryregulardeductionssource.load(this.hrmssalarymasterservice.hrmssalaryregulardeductions as  any as LocalDataSource);
this.hrmssalaryregulardeductionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryregulardeductionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmssalarymasterservice.hrmssalaryregulardeductions.length == 0)
{
    this.tblhrmssalaryregulardeductionssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryregulardeduction();
    this.hrmssalarymasterservice.hrmssalaryregulardeductions.push(obj);
    this.hrmssalaryregulardeductionssource.refresh();
    if ((this.hrmssalarymasterservice.hrmssalaryregulardeductions.length / this.hrmssalaryregulardeductionssource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryregulardeductionssource.getPaging().page)
    {
        this.hrmssalaryregulardeductionssource.setPage((this.hrmssalarymasterservice.hrmssalaryregulardeductions.length / this.hrmssalaryregulardeductionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryregulardeductionssource.grid.edit(this.tblhrmssalaryregulardeductionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryregulardeductionssource.data.indexOf(event.data);
this.onDeletehrmssalaryregulardeduction(event,event.data.rdid,((this.hrmssalaryregulardeductionssource.getPaging().page-1) *this.hrmssalaryregulardeductionssource.getPaging().perPage)+index);
this.hrmssalaryregulardeductionssource.refresh();
break;
}
}

*/
hrmssalaryregulardeductionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryregulardeduction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryregulardeduction(event,event.data.rdid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryregulardeduction(event,event.data.rdid,((this.hrmssalaryregulardeductionssource.getPaging().page-1) *this.hrmssalaryregulardeductionssource.getPaging().perPage)+event.index);
this.hrmssalaryregulardeductionssource.refresh();
break;
}
}
hrmssalaryregulardeductionsonDelete(obj) {
let rdid=obj.data.rdid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmssalarymasterservice.deletehrmssalarymaster(rdid).then(res=>
this.hrmssalaryregulardeductionsLoadTable()
);
}
}
hrmssalaryregulardeductionsPaging(val)
{
debugger;
this.hrmssalaryregulardeductionssource.setPaging(1, val, true);
}

handlehrmssalaryregulardeductionsGridSelected(event:any) {
this.hrmssalaryregulardeductionsselectedindex=this.hrmssalarymasterservice.hrmssalaryregulardeductions.findIndex(i => i.rdid === event.data.rdid);
}
IshrmssalaryregulardeductionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryregulardeductionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryregulardeductions
//start of Grid Codes hrmssalaryregularincomes
hrmssalaryregularincomessettings:any;
hrmssalaryregularincomessource: any;

showhrmssalaryregularincomesCheckbox()
{
debugger;
if(this.tblhrmssalaryregularincomessource.settings['selectMode']== 'multi')this.tblhrmssalaryregularincomessource.settings['selectMode']= 'single';
else
this.tblhrmssalaryregularincomessource.settings['selectMode']= 'multi';
this.tblhrmssalaryregularincomessource.initGrid();
}
deletehrmssalaryregularincomesAll()
{
this.tblhrmssalaryregularincomessource.settings['selectMode'] = 'single';
}
showhrmssalaryregularincomesFilter()
{
  setTimeout(() => {
  this.SethrmssalaryregularincomesTableddConfig();
  });
      if(this.tblhrmssalaryregularincomessource.settings!=null)this.tblhrmssalaryregularincomessource.settings['hideSubHeader'] =!this.tblhrmssalaryregularincomessource.settings['hideSubHeader'];
this.tblhrmssalaryregularincomessource.initGrid();
}
showhrmssalaryregularincomesInActive()
{
}
enablehrmssalaryregularincomesInActive()
{
}
async SethrmssalaryregularincomesTableddConfig()
{
if(!this.bfilterPopulatehrmssalaryregularincomes){

this.bomasterdataservice.getList("h4agb").then(res=>
{
var dataincomeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryregularincomesincomeid3.push(defaultobj);
for(let i=0; i<dataincomeid2.length; i++){
var obj= { value: dataincomeid2[i].masterdataid, title:dataincomeid2[i].masterdatadescription};
this.datahrmssalaryregularincomesincomeid3.push(obj);
}
if((this.tblhrmssalaryregularincomessource.settings as any).columns['incomeid'])
{
(this.tblhrmssalaryregularincomessource.settings as any).columns['incomeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssalaryregularincomesincomeid3));
this.tblhrmssalaryregularincomessource.initGrid();
}
});

this.configservice.getList("paymentapproach").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssalaryregularincomesmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmssalaryregularincomesmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmssalaryregularincomessource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryregularincomesmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmssalaryregularincomesmode3)), }, };
this.tblhrmssalaryregularincomessource.settings =  clone;
this.tblhrmssalaryregularincomessource.initGrid();
});
}
this.bfilterPopulatehrmssalaryregularincomes=true;
}
async hrmssalaryregularincomesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssalaryregularincomesTableConfig()
{
this.hrmssalaryregularincomessettings = {
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
var element= this.datahrmssalaryregularincomesincomeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssalaryregularincomesmode3.find(c=>c.value==cell);
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
lop: {
title: 'L O P',
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
hrmssalaryregularincomesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryregularincomesID)>=0)
{
this.hrmssalaryregularincomessource=new LocalDataSource();
this.hrmssalaryregularincomessource.load(this.hrmssalarymasterservice.hrmssalaryregularincomes as  any as LocalDataSource);
this.hrmssalaryregularincomessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssalaryregularincomesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmssalarymasterservice.hrmssalaryregularincomes.length == 0)
{
    this.tblhrmssalaryregularincomessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssalaryregularincome();
    this.hrmssalarymasterservice.hrmssalaryregularincomes.push(obj);
    this.hrmssalaryregularincomessource.refresh();
    if ((this.hrmssalarymasterservice.hrmssalaryregularincomes.length / this.hrmssalaryregularincomessource.getPaging().perPage).toFixed(0) + 1 != this.hrmssalaryregularincomessource.getPaging().page)
    {
        this.hrmssalaryregularincomessource.setPage((this.hrmssalarymasterservice.hrmssalaryregularincomes.length / this.hrmssalaryregularincomessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssalaryregularincomessource.grid.edit(this.tblhrmssalaryregularincomessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssalaryregularincomessource.data.indexOf(event.data);
this.onDeletehrmssalaryregularincome(event,event.data.riid,((this.hrmssalaryregularincomessource.getPaging().page-1) *this.hrmssalaryregularincomessource.getPaging().perPage)+index);
this.hrmssalaryregularincomessource.refresh();
break;
}
}

*/
hrmssalaryregularincomesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssalaryregularincome(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssalaryregularincome(event,event.data.riid,this.formid);
break;
case 'delete':
this.onDeletehrmssalaryregularincome(event,event.data.riid,((this.hrmssalaryregularincomessource.getPaging().page-1) *this.hrmssalaryregularincomessource.getPaging().perPage)+event.index);
this.hrmssalaryregularincomessource.refresh();
break;
}
}
hrmssalaryregularincomesonDelete(obj) {
let riid=obj.data.riid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmssalarymasterservice.deletehrmssalarymaster(riid).then(res=>
this.hrmssalaryregularincomesLoadTable()
);
}
}
hrmssalaryregularincomesPaging(val)
{
debugger;
this.hrmssalaryregularincomessource.setPaging(1, val, true);
}

handlehrmssalaryregularincomesGridSelected(event:any) {
this.hrmssalaryregularincomesselectedindex=this.hrmssalarymasterservice.hrmssalaryregularincomes.findIndex(i => i.riid === event.data.riid);
}
IshrmssalaryregularincomesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssalaryregularincomesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssalaryregularincomes

}



