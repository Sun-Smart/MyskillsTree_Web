import { bocompanysettingService } from './../../../service/bocompanysetting.service';
import { bocompanysetting } from './../../../model/bocompanysetting.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bouserrolemaster} from './../../../model/bouserrolemaster.model';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-bocompanysetting',
templateUrl: './bocompanysetting.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bocompanysettingComponent implements OnInit {
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
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
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
bfilterPopulatebocompanysettings:boolean=false;
databocompanysettingsadminroleid3:any=[];
 bocompanysettingForm: FormGroup;
adminroleidList: bouserrolemaster[];
adminroleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
adminroleid_bouserrolemastersForm: FormGroup;//autocomplete
adminroleid_bouserrolemastersoptions:any;//autocomplete
adminroleid_bouserrolemastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bocompanysettingservice: bocompanysettingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
private customfieldservice: customfieldconfigurationService,
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
this.bocompanysettingForm  = this.fb.group({pk:[null],settingsid: [null],
adminroleid: [null],
adminroleiddesc: [null],
purchaseterms: [null],
annualdays: [null],
leavecarryforward: [null],
maxleavescarryforward: [null],
earnedleave: [null],
sickdaysallowed: [null],
sickdays: [null],
medicaldays: [null],
maternityleaveallowed: [null],
maternitydays: [null],
lop: [null],
lopcarryforward: [null],
lopmaxdayscarryforward: [null],
customfield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bocompanysettingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bocompanysettingForm.dirty && this.bocompanysettingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.settingsid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.settingsid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.settingsid && pkDetail) {
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
let bocompanysettingid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
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
this.formid=bocompanysettingid;
//this.sharedService.alert(bocompanysettingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.adminroleidList = res as bouserrolemaster[];
if(this.bocompanysettingservice.formData && this.bocompanysettingservice.formData.adminroleid){
this.adminroleidoptionsEvent.emit(this.adminroleidList);
this.bocompanysettingForm.patchValue({
    adminroleid: this.bocompanysettingservice.formData.adminroleid,
    adminroleiddesc: this.bocompanysettingservice.formData.adminroleiddesc,
});
}
{
let arradminroleid = this.adminroleidList.filter(v => v.userroleid == this.bocompanysettingForm.get('adminroleid').value);
let objadminroleid;
if (arradminroleid.length > 0) objadminroleid = arradminroleid[0];
if (objadminroleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.adminroleid_bouserrolemastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.adminroleidList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.adminroleid_bouserrolemastersformatter = (result: any) => result.userrole;

//autocomplete
    this.bocompanysettingservice.getbocompanysettingsList().then(res => {
      this.pkList = res as bocompanysetting[];
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
this.bocompanysettingForm.markAsUntouched();
this.bocompanysettingForm.markAsPristine();
}
onSelectedadminroleid(adminroleidDetail: any) {
if (adminroleidDetail.adminroleid && adminroleidDetail) {
this.bocompanysettingForm.patchValue({
adminroleid: adminroleidDetail.adminroleid,
adminroleiddesc: adminroleidDetail.userrole,

});

}
}




resetForm() {
if (this.bocompanysettingForm != null)
this.bocompanysettingForm.reset();
this.bocompanysettingForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let settingsid = this.bocompanysettingForm.get('settingsid').value;
        if(settingsid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanysettingservice.deletebocompanysetting(settingsid).then(res =>
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
    this.bocompanysettingForm.patchValue({
        settingsid: null
    });
    if(this.bocompanysettingservice.formData.settingsid!=null)this.bocompanysettingservice.formData.settingsid=null;
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
this.bocompanysettingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bocompanysettingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bocompanysettingForm.controls[key]!=undefined)this.bocompanysettingForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bocompanysettings",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
settingsidonChange(evt:any){
let e=evt.value;
}
adminroleidonChange(evt:any){
let e=evt.value;
}
purchasetermsonChange(evt:any){
let e=evt.value;
}
annualdaysonChange(evt:any){
let e=evt.value;
}
leavecarryforwardonChange(evt:any){
let e=evt.value;
}
maxleavescarryforwardonChange(evt:any){
let e=evt.value;
}
earnedleaveonChange(evt:any){
let e=evt.value;
}
sickdaysallowedonChange(evt:any){
let e=evt.value;
}
sickdaysonChange(evt:any){
let e=evt.value;
}
medicaldaysonChange(evt:any){
let e=evt.value;
}
maternityleaveallowedonChange(evt:any){
let e=evt.value;
}
maternitydaysonChange(evt:any){
let e=evt.value;
}
loponChange(evt:any){
let e=evt.value;
}
lopcarryforwardonChange(evt:any){
let e=evt.value;
}
lopmaxdayscarryforwardonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bocompanysettingservice.getbocompanysettingsByEID(pkcol).then(res => {

this.bocompanysettingservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bocompanysetting.settingsid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bocompanysetting.settingsid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bocompanysettingForm.patchValue({
settingsid: res.bocompanysetting.settingsid,
adminroleid: res.bocompanysetting.adminroleid,
adminroleiddesc: res.bocompanysetting.adminroleiddesc,
purchaseterms: res.bocompanysetting.purchaseterms,
annualdays: res.bocompanysetting.annualdays,
leavecarryforward: res.bocompanysetting.leavecarryforward,
maxleavescarryforward: res.bocompanysetting.maxleavescarryforward,
earnedleave: res.bocompanysetting.earnedleave,
sickdaysallowed: res.bocompanysetting.sickdaysallowed,
sickdays: res.bocompanysetting.sickdays,
medicaldays: res.bocompanysetting.medicaldays,
maternityleaveallowed: res.bocompanysetting.maternityleaveallowed,
maternitydays: res.bocompanysetting.maternitydays,
lop: res.bocompanysetting.lop,
lopcarryforward: res.bocompanysetting.lopcarryforward,
lopmaxdayscarryforward: res.bocompanysetting.lopmaxdayscarryforward,
customfield: res.bocompanysetting.customfield,
status: res.bocompanysetting.status,
statusdesc: res.bocompanysetting.statusdesc,
});
if(this.bocompanysettingForm.get('customfield').value!=null && this.bocompanysettingForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bocompanysettingForm.get('customfield').value);
this.FillCustomField();
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
  for (let key in this.bocompanysettingForm.controls) {
    if (this.bocompanysettingForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bocompanysettingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bocompanysettingForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bocompanysettingForm.value;
obj.customfield=JSON.stringify(customfields);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bocompanysettingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bocompanysettingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bocompanysettingForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bocompanysettingservice.formData=this.bocompanysettingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bocompanysettingForm.controls[key] != null)
    {
        this.bocompanysettingservice.formData[key] = this.bocompanysettingForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bocompanysettingservice.formData.customfield=JSON.stringify(customfields);
console.log(this.bocompanysettingservice.formData);
this.bocompanysettingservice.formData=this.bocompanysettingForm.value;
this.bocompanysettingservice.saveOrUpdatebocompanysettings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bocompanysetting);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bocompanysettingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bocompanysetting);
}
else
{
this.FillData(res);
}
}
this.bocompanysettingForm.markAsUntouched();
this.bocompanysettingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditadminroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.bocompanysettingForm.get('adminroleid').value, ScreenType:2 }
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



