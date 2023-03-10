import { camspmscheduleinstructionService } from './../../../service/camspmscheduleinstruction.service';
import { camspmscheduleinstruction } from './../../../model/camspmscheduleinstruction.model';
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
import { camspmschedule} from './../../../model/camspmschedule.model';
import { camspmscheduleComponent } from './../../../pages/forms/camspmschedule/camspmschedule.component';
import { camspmscheduleService } from './../../../service/camspmschedule.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { camspmtask} from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
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
selector: 'app-camspmscheduleinstruction',
templateUrl: './camspmscheduleinstruction.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camspmscheduleinstructionComponent implements OnInit {
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
bfilterPopulatecamspmscheduleinstructions:boolean=false;
datacamspmscheduleinstructionsscheduleid3:any=[];
datacamspmscheduleinstructionspmid3:any=[];
datacamspmscheduleinstructionstaskid3:any=[];
 camspmscheduleinstructionForm: FormGroup;
scheduleidList: camspmschedule[];
scheduleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
scheduleid_camspmschedulesForm: FormGroup;//autocomplete
scheduleid_camspmschedulesoptions:any;//autocomplete
scheduleid_camspmschedulesformatter:any;//autocomplete
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
taskidList: camspmtask[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camspmscheduleinstructionshowOption:boolean;
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
private camspmscheduleinstructionservice: camspmscheduleinstructionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camspmscheduleservice:camspmscheduleService,
private camspmmasterservice:camspmmasterService,
private camspmtaskservice:camspmtaskService,
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
this.camspmscheduleinstructionForm  = this.fb.group({
pk:[null],
scheduleinstructionid: [null],
scheduleid: [null],
scheduleiddesc: [null],
pmid: [null],
pmiddesc: [null],
sequence: [null, Validators.required],
code: [null, Validators.required],
details: [null, Validators.required],
alltasks: [null],
taskid: [null, Validators.required],
taskiddesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camspmscheduleinstructionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camspmscheduleinstructionForm.dirty && this.camspmscheduleinstructionForm.touched ) {
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
????if(this.pkList.length>0)??this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
??if(this.pkList.length>0)??this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
????debugger;
????let??pos??=??this.pkList.map(function(e:any)??{??return e.scheduleinstructionid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.scheduleinstructionid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scheduleinstructionid && pkDetail) {
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
let camspmscheduleinstructionid = null;

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
this.formid=camspmscheduleinstructionid;
//this.sharedService.alert(camspmscheduleinstructionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camspmscheduleservice.getcamspmschedulesList().then(res => 
{
this.scheduleidList = res as camspmschedule[];
if(this.camspmscheduleinstructionservice.formData && this.camspmscheduleinstructionservice.formData.scheduleid){
this.scheduleidoptionsEvent.emit(this.scheduleidList);
this.camspmscheduleinstructionForm.patchValue({
    scheduleid: this.camspmscheduleinstructionservice.formData.scheduleid,
    scheduleiddesc: this.camspmscheduleinstructionservice.formData.scheduleiddesc,
});
}
{
let arrscheduleid = this.scheduleidList.filter(v => v.scheduleid == this.camspmscheduleinstructionForm.get('scheduleid').value);
let objscheduleid;
if (arrscheduleid.length > 0) objscheduleid = arrscheduleid[0];
if (objscheduleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.scheduleid_camspmschedulesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.scheduleidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.scheduleid_camspmschedulesformatter = (result: any) => result.description;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camspmscheduleinstructionservice.formData && this.camspmscheduleinstructionservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camspmscheduleinstructionForm.patchValue({
    pmid: this.camspmscheduleinstructionservice.formData.pmid,
    pmiddesc: this.camspmscheduleinstructionservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camspmscheduleinstructionForm.get('pmid').value);
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
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.taskidList = res as camspmtask[];
if(this.camspmscheduleinstructionservice.formData && this.camspmscheduleinstructionservice.formData.taskid){this.camspmscheduleinstructionForm.patchValue({
    taskid: this.camspmscheduleinstructionservice.formData.taskid,
    taskiddesc: this.camspmscheduleinstructionservice.formData.taskiddesc,
});
}
}).catch((err) => {console.log(err);});
});

//autocomplete
    this.camspmscheduleinstructionservice.getcamspmscheduleinstructionsList().then(res => {
      this.pkList = res as camspmscheduleinstruction[];
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
this.camspmscheduleinstructionForm.markAsUntouched();
this.camspmscheduleinstructionForm.markAsPristine();
}
onSelectedscheduleid(scheduleidDetail: any) {
if (scheduleidDetail.scheduleid && scheduleidDetail) {
this.camspmscheduleinstructionForm.patchValue({
scheduleid: scheduleidDetail.scheduleid,
scheduleiddesc: scheduleidDetail.description,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camspmscheduleinstructionForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});
this.camspmtaskservice.getListBypmid(pmidDetail.pmid).then(res => {
 this.taskidList = res as camspmtask[]
}).catch((err) => {console.log(err);});

}
}




resetForm() {
if (this.camspmscheduleinstructionForm != null)
this.camspmscheduleinstructionForm.reset();
this.camspmscheduleinstructionForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let scheduleinstructionid = this.camspmscheduleinstructionForm.get('scheduleinstructionid').value;
        if(scheduleinstructionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camspmscheduleinstructionservice.deletecamspmscheduleinstruction(scheduleinstructionid).then(res =>
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
    this.camspmscheduleinstructionForm.patchValue({
        scheduleinstructionid: null
    });
    if(this.camspmscheduleinstructionservice.formData.scheduleinstructionid!=null)this.camspmscheduleinstructionservice.formData.scheduleinstructionid=null;
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
this.camspmscheduleinstructionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camspmscheduleinstructionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camspmscheduleinstructionForm.controls[key]!=undefined)
{
this.camspmscheduleinstructionForm.controls[key].disable({onlySelf: true});
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
scheduleinstructionidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
alltasksonChange(evt:any){
let e=evt.value;
}
taskidonChange(evt:any){
let e=evt.value;
this.camspmscheduleinstructionForm.patchValue({taskiddesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamspmscheduleinstructions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camspmscheduleinstructionservice.getcamspmscheduleinstructionsByEID(pkcol).then(res => {

this.camspmscheduleinstructionservice.formData=res.camspmscheduleinstruction;
let formproperty=res.camspmscheduleinstruction.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camspmscheduleinstruction.pkcol;
this.formid=res.camspmscheduleinstruction.scheduleinstructionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camspmscheduleinstruction.scheduleinstructionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camspmscheduleinstructionForm.patchValue({
scheduleinstructionid: res.camspmscheduleinstruction.scheduleinstructionid,
scheduleid: res.camspmscheduleinstruction.scheduleid,
scheduleiddesc: res.camspmscheduleinstruction.scheduleiddesc,
pmid: res.camspmscheduleinstruction.pmid,
pmiddesc: res.camspmscheduleinstruction.pmiddesc,
sequence: res.camspmscheduleinstruction.sequence,
code: res.camspmscheduleinstruction.code,
details: res.camspmscheduleinstruction.details,
alltasks: res.camspmscheduleinstruction.alltasks,
taskid: res.camspmscheduleinstruction.taskid,
taskiddesc: res.camspmscheduleinstruction.taskiddesc,
remarks: res.camspmscheduleinstruction.remarks,
status: res.camspmscheduleinstruction.status,
statusdesc: res.camspmscheduleinstruction.statusdesc,
});
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.taskidList = res as camspmtask[];
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
  for (let key in this.camspmscheduleinstructionForm.controls) {
    if (this.camspmscheduleinstructionForm.controls[key] != null) {
if(false)
{
if(this.camspmscheduleinstructionservice.formData!=null && this.camspmscheduleinstructionservice.formData[key]!=null  && this.camspmscheduleinstructionservice.formData[key]!='[]' && this.camspmscheduleinstructionservice.formData[key]!=undefined && this.camspmscheduleinstructionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camspmscheduleinstructionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camspmscheduleinstructionservice.formData!=null && this.camspmscheduleinstructionservice.formData[key]!=null   && this.camspmscheduleinstructionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camspmscheduleinstructionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camspmscheduleinstructionservice.formData!=null && this.camspmscheduleinstructionservice.formData[key]!=null   && this.camspmscheduleinstructionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camspmscheduleinstructionservice.formData[key]+"'><div class='progress__number'>"+this.camspmscheduleinstructionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camspmscheduleinstructionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camspmscheduleinstructionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camspmscheduleinstructionForm.value;
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

private camspmscheduleinstructiontoggleOption(){
this.camspmscheduleinstructionshowOption = this.camspmscheduleinstructionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camspmscheduleinstructionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camspmscheduleinstructionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camspmscheduleinstructionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camspmscheduleinstructionservice.formData=this.camspmscheduleinstructionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camspmscheduleinstructionForm.controls[key] != null)
    {
        this.camspmscheduleinstructionservice.formData[key] = this.camspmscheduleinstructionForm.controls[key].value;
    }
}
}
}
console.log(this.camspmscheduleinstructionservice.formData);
this.camspmscheduleinstructionservice.formData=this.camspmscheduleinstructionForm.value;
this.camspmscheduleinstructionservice.saveOrUpdatecamspmscheduleinstructions().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmscheduleinstruction);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camspmscheduleinstructionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmscheduleinstruction);
}
else
{
this.FillData(res);
}
}
this.camspmscheduleinstructionForm.markAsUntouched();
this.camspmscheduleinstructionForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditscheduleid( scheduleid) {
/*let ScreenType='2';
this.dialog.open(camspmscheduleComponent, 
{
data: {scheduleid:this.camspmscheduleinstructionForm.get('scheduleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camspmscheduleinstructionForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittaskid( pmtaskid) {
/*let ScreenType='2';
this.dialog.open(camspmtaskComponent, 
{
data: {pmtaskid:this.camspmscheduleinstructionForm.get('taskid').value, ScreenType:2 }
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



