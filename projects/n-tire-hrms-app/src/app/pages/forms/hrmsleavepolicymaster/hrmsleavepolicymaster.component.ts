import { hrmsleavepolicymasterService } from './../../../service/hrmsleavepolicymaster.service';
import { hrmsleavepolicymaster } from './../../../model/hrmsleavepolicymaster.model';
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
selector: 'app-hrmsleavepolicymaster',
templateUrl: './hrmsleavepolicymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsleavepolicymasterComponent implements OnInit {
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
bfilterPopulatehrmsleavepolicymasters:boolean=false;
datahrmsleavepolicymastersapplicableto3:any=[];
datahrmsleavepolicymastersleavebasedon3:any=[];
datahrmsleavepolicymastersprorata3:any=[];
datahrmsleavepolicymastersproratabasis3:any=[];
datahrmsleavepolicymastersconversiontoleavetype3:any=[];
datahrmsleavepolicymastersgender3:any=[];
 hrmsleavepolicymasterForm: FormGroup;
applicabletoList: boconfigvalue[];
leavebasedonList: boconfigvalue[];
prorataList: boconfigvalue[];
proratabasisList: boconfigvalue[];
conversiontoleavetypeList: hrmsleavepolicymaster[];
genderList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsleavepolicymastershowOption:boolean;
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
private hrmsleavepolicymasterservice: hrmsleavepolicymasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.hrmsleavepolicymasterForm  = this.fb.group({
pk:[null],
leavetypeid: [null],
leavename: [null],
applicableto: [null],
applicabletodesc: [null],
effectivefrom: [null],
leavebasedon: [null],
leavebasedondesc: [null],
eligibledays: [null],
carryforward: [null],
encashmentdays: [null],
maxaccumulation: [null],
prorata: [null],
proratadesc: [null],
proratabasis: [null],
proratabasisdesc: [null],
prefixsuffix: [null],
maxleaveinmonth: [null],
conversiontoleavetype: [null],
conversiontoleavetypedesc: [null],
salaryreduction: [null],
gender: [null],
genderdesc: [null],
allowhalfday: [null],
allowduringresignation: [null],
preapproveddays: [null],
attachmentname: [null],
attachmentcondition: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsleavepolicymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsleavepolicymasterForm.dirty && this.hrmsleavepolicymasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.leavetypeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.leavetypeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.leavetypeid && pkDetail) {
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
let hrmsleavepolicymasterid = null;

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
this.formid=hrmsleavepolicymasterid;
//this.sharedService.alert(hrmsleavepolicymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("employeetype").then(res => this.applicabletoList = res as boconfigvalue[]);
this.configservice.getList("leavebasedon").then(res => this.leavebasedonList = res as boconfigvalue[]);
this.configservice.getList("prorata").then(res => this.prorataList = res as boconfigvalue[]);
this.configservice.getList("proratabasis").then(res => this.proratabasisList = res as boconfigvalue[]);
this.hrmsleavepolicymasterservice.gethrmsleavepolicymastersList().then(res => 
{
this.conversiontoleavetypeList = res as hrmsleavepolicymaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);

//autocomplete
    this.hrmsleavepolicymasterservice.gethrmsleavepolicymastersList().then(res => {
      this.pkList = res as hrmsleavepolicymaster[];
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
this.hrmsleavepolicymasterForm.markAsUntouched();
this.hrmsleavepolicymasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsleavepolicymasterForm != null)
this.hrmsleavepolicymasterForm.reset();
this.hrmsleavepolicymasterForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let leavetypeid = this.hrmsleavepolicymasterForm.get('leavetypeid').value;
        if(leavetypeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsleavepolicymasterservice.deletehrmsleavepolicymaster(leavetypeid).then(res =>
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
    this.hrmsleavepolicymasterForm.patchValue({
        leavetypeid: null
    });
    if(this.hrmsleavepolicymasterservice.formData.leavetypeid!=null)this.hrmsleavepolicymasterservice.formData.leavetypeid=null;
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
this.hrmsleavepolicymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsleavepolicymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsleavepolicymasterForm.controls[key]!=undefined)
{
this.hrmsleavepolicymasterForm.controls[key].disable({onlySelf: true});
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
leavetypeidonChange(evt:any){
let e=evt.value;
}
leavenameonChange(evt:any){
let e=evt.value;
}
applicabletoonChange(evt:any){
let e=this.f.applicableto.value as any;
this.hrmsleavepolicymasterForm.patchValue({applicabletodesc:evt.options[evt.options.selectedIndex].text});
}
effectivefromonChange(evt:any){
let e=evt.value;
}
leavebasedononChange(evt:any){
let e=this.f.leavebasedon.value as any;
this.hrmsleavepolicymasterForm.patchValue({leavebasedondesc:evt.options[evt.options.selectedIndex].text});
}
eligibledaysonChange(evt:any){
let e=evt.value;
}
carryforwardonChange(evt:any){
let e=evt.value;
}
encashmentdaysonChange(evt:any){
let e=evt.value;
}
maxaccumulationonChange(evt:any){
let e=evt.value;
}
prorataonChange(evt:any){
let e=this.f.prorata.value as any;
this.hrmsleavepolicymasterForm.patchValue({proratadesc:evt.options[evt.options.selectedIndex].text});
}
proratabasisonChange(evt:any){
let e=this.f.proratabasis.value as any;
this.hrmsleavepolicymasterForm.patchValue({proratabasisdesc:evt.options[evt.options.selectedIndex].text});
}
prefixsuffixonChange(evt:any){
let e=evt.value;
}
maxleaveinmonthonChange(evt:any){
let e=evt.value;
}
conversiontoleavetypeonChange(evt:any){
let e=evt.value;
this.hrmsleavepolicymasterForm.patchValue({conversiontoleavetypedesc:evt.options[evt.options.selectedIndex].text});
}
salaryreductiononChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.hrmsleavepolicymasterForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
allowhalfdayonChange(evt:any){
let e=evt.value;
}
allowduringresignationonChange(evt:any){
let e=evt.value;
}
preapproveddaysonChange(evt:any){
let e=evt.value;
}
attachmentnameonChange(evt:any){
let e=evt.value;
}
attachmentconditiononChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsleavepolicymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsleavepolicymasterservice.gethrmsleavepolicymastersByEID(pkcol).then(res => {

this.hrmsleavepolicymasterservice.formData=res.hrmsleavepolicymaster;
let formproperty=res.hrmsleavepolicymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsleavepolicymaster.pkcol;
this.formid=res.hrmsleavepolicymaster.leavetypeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsleavepolicymaster.leavetypeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsleavepolicymasterForm.patchValue({
leavetypeid: res.hrmsleavepolicymaster.leavetypeid,
leavename: res.hrmsleavepolicymaster.leavename,
applicableto: res.hrmsleavepolicymaster.applicableto,
applicabletodesc: res.hrmsleavepolicymaster.applicabletodesc,
effectivefrom: res.hrmsleavepolicymaster.effectivefrom,
leavebasedon: res.hrmsleavepolicymaster.leavebasedon,
leavebasedondesc: res.hrmsleavepolicymaster.leavebasedondesc,
eligibledays: res.hrmsleavepolicymaster.eligibledays,
carryforward: res.hrmsleavepolicymaster.carryforward,
encashmentdays: res.hrmsleavepolicymaster.encashmentdays,
maxaccumulation: res.hrmsleavepolicymaster.maxaccumulation,
prorata: res.hrmsleavepolicymaster.prorata,
proratadesc: res.hrmsleavepolicymaster.proratadesc,
proratabasis: res.hrmsleavepolicymaster.proratabasis,
proratabasisdesc: res.hrmsleavepolicymaster.proratabasisdesc,
prefixsuffix: res.hrmsleavepolicymaster.prefixsuffix,
maxleaveinmonth: res.hrmsleavepolicymaster.maxleaveinmonth,
conversiontoleavetype: res.hrmsleavepolicymaster.conversiontoleavetype,
conversiontoleavetypedesc: res.hrmsleavepolicymaster.conversiontoleavetypedesc,
salaryreduction: res.hrmsleavepolicymaster.salaryreduction,
gender: res.hrmsleavepolicymaster.gender,
genderdesc: res.hrmsleavepolicymaster.genderdesc,
allowhalfday: res.hrmsleavepolicymaster.allowhalfday,
allowduringresignation: res.hrmsleavepolicymaster.allowduringresignation,
preapproveddays: res.hrmsleavepolicymaster.preapproveddays,
attachmentname: res.hrmsleavepolicymaster.attachmentname,
attachmentcondition: res.hrmsleavepolicymaster.attachmentcondition,
notes: res.hrmsleavepolicymaster.notes,
status: res.hrmsleavepolicymaster.status,
statusdesc: res.hrmsleavepolicymaster.statusdesc,
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
  for (let key in this.hrmsleavepolicymasterForm.controls) {
    if (this.hrmsleavepolicymasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsleavepolicymasterservice.formData!=null && this.hrmsleavepolicymasterservice.formData[key]!=null  && this.hrmsleavepolicymasterservice.formData[key]!='[]' && this.hrmsleavepolicymasterservice.formData[key]!=undefined && this.hrmsleavepolicymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsleavepolicymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsleavepolicymasterservice.formData!=null && this.hrmsleavepolicymasterservice.formData[key]!=null   && this.hrmsleavepolicymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsleavepolicymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsleavepolicymasterservice.formData!=null && this.hrmsleavepolicymasterservice.formData[key]!=null   && this.hrmsleavepolicymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsleavepolicymasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsleavepolicymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsleavepolicymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsleavepolicymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsleavepolicymasterForm.value;
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

private hrmsleavepolicymastertoggleOption(){
this.hrmsleavepolicymastershowOption = this.hrmsleavepolicymastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsleavepolicymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsleavepolicymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsleavepolicymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsleavepolicymasterservice.formData=this.hrmsleavepolicymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsleavepolicymasterForm.controls[key] != null)
    {
        this.hrmsleavepolicymasterservice.formData[key] = this.hrmsleavepolicymasterForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsleavepolicymasterservice.formData);
this.hrmsleavepolicymasterservice.formData=this.hrmsleavepolicymasterForm.value;
this.hrmsleavepolicymasterservice.saveOrUpdatehrmsleavepolicymasters().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsleavepolicymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsleavepolicymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsleavepolicymaster);
}
else
{
this.FillData(res);
}
}
this.hrmsleavepolicymasterForm.markAsUntouched();
this.hrmsleavepolicymasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditconversiontoleavetype( leavetypeid) {
/*let ScreenType='2';
this.dialog.open(hrmsleavepolicymasterComponent, 
{
data: {leavetypeid:this.hrmsleavepolicymasterForm.get('conversiontoleavetype').value, ScreenType:2 }
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



