import { camsworkreadingService } from './../../../service/camsworkreading.service';
import { camsworkreading } from './../../../model/camsworkreading.model';
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
import { camsworktimelog} from './../../../model/camsworktimelog.model';
import { camsworktimelogComponent } from './../../../pages/forms/camsworktimelog/camsworktimelog.component';
import { camsworktimelogService } from './../../../service/camsworktimelog.service';
//popups
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
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
selector: 'app-camsworkreading',
templateUrl: './camsworkreading.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkreadingComponent implements OnInit {
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
bfilterPopulatecamsworkreadings:boolean=false;
datacamsworkreadingslogid3:any=[];
datacamsworkreadingsworkorderid3:any=[];
 camsworkreadingForm: FormGroup;
logidList: camsworktimelog[];
logidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
logid_camsworktimelogsForm: FormGroup;//autocomplete
logid_camsworktimelogsoptions:any;//autocomplete
logid_camsworktimelogsformatter:any;//autocomplete
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsworkreadingshowOption:boolean;
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
private camsworkreadingservice: camsworkreadingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsworktimelogservice:camsworktimelogService,
private camsworkorderservice:camsworkorderService,
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
this.camsworkreadingForm  = this.fb.group({
pk:[null],
readingid: [null],
logid: [null],
logiddesc: [null],
workorderid: [null],
workorderiddesc: [null],
userid: [null],
readingdate: [null],
meterreading: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsworkreadingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkreadingForm.dirty && this.camsworkreadingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.readingid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.readingid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.readingid && pkDetail) {
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
let camsworkreadingid = null;

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
this.formid=camsworkreadingid;
//this.sharedService.alert(camsworkreadingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworktimelogservice.getcamsworktimelogsList().then(res => 
{
this.logidList = res as camsworktimelog[];
if(this.camsworkreadingservice.formData && this.camsworkreadingservice.formData.logid){
this.logidoptionsEvent.emit(this.logidList);
this.camsworkreadingForm.patchValue({
    logid: this.camsworkreadingservice.formData.logid,
    logiddesc: this.camsworkreadingservice.formData.logiddesc,
});
}
{
let arrlogid = this.logidList.filter(v => v.logid == this.camsworkreadingForm.get('logid').value);
let objlogid;
if (arrlogid.length > 0) objlogid = arrlogid[0];
if (objlogid)
{
}
}
}
).catch((err) => {console.log(err);});
this.logid_camsworktimelogsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.logidList.filter(v => v.taskdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.logid_camsworktimelogsformatter = (result: any) => result.taskdescription;
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsworkreadingservice.formData && this.camsworkreadingservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsworkreadingForm.patchValue({
    workorderid: this.camsworkreadingservice.formData.workorderid,
    workorderiddesc: this.camsworkreadingservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsworkreadingForm.get('workorderid').value);
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

//autocomplete
    this.camsworkreadingservice.getcamsworkreadingsList().then(res => {
      this.pkList = res as camsworkreading[];
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
this.camsworkreadingForm.markAsUntouched();
this.camsworkreadingForm.markAsPristine();
}
onSelectedlogid(logidDetail: any) {
if (logidDetail.logid && logidDetail) {
this.camsworkreadingForm.patchValue({
logid: logidDetail.logid,
logiddesc: logidDetail.taskdescription,

});

}
}

onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsworkreadingForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}




resetForm() {
if (this.camsworkreadingForm != null)
this.camsworkreadingForm.reset();
this.camsworkreadingForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let readingid = this.camsworkreadingForm.get('readingid').value;
        if(readingid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkreadingservice.deletecamsworkreading(readingid).then(res =>
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
    this.camsworkreadingForm.patchValue({
        readingid: null
    });
    if(this.camsworkreadingservice.formData.readingid!=null)this.camsworkreadingservice.formData.readingid=null;
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
        else if(key=="readingdate")
this.camsworkreadingForm.patchValue({"readingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.camsworkreadingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkreadingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkreadingForm.controls[key]!=undefined)
{
this.camsworkreadingForm.controls[key].disable({onlySelf: true});
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
readingidonChange(evt:any){
let e=evt.value;
}
logidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
readingdateonChange(evt:any){
let e=evt.value;
}
meterreadingonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsworkreadings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkreadingservice.getcamsworkreadingsByEID(pkcol).then(res => {

this.camsworkreadingservice.formData=res.camsworkreading;
let formproperty=res.camsworkreading.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkreading.pkcol;
this.formid=res.camsworkreading.readingid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkreading.readingid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkreadingForm.patchValue({
readingid: res.camsworkreading.readingid,
logid: res.camsworkreading.logid,
logiddesc: res.camsworkreading.logiddesc,
workorderid: res.camsworkreading.workorderid,
workorderiddesc: res.camsworkreading.workorderiddesc,
userid: res.camsworkreading.userid,
readingdate: this.ngbDateParserFormatter.parse(res.camsworkreading.readingdate),
meterreading: res.camsworkreading.meterreading,
remarks: res.camsworkreading.remarks,
status: res.camsworkreading.status,
statusdesc: res.camsworkreading.statusdesc,
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
  for (let key in this.camsworkreadingForm.controls) {
    if (this.camsworkreadingForm.controls[key] != null) {
if(false)
{
if(this.camsworkreadingservice.formData!=null && this.camsworkreadingservice.formData[key]!=null  && this.camsworkreadingservice.formData[key]!='[]' && this.camsworkreadingservice.formData[key]!=undefined && this.camsworkreadingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkreadingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkreadingservice.formData!=null && this.camsworkreadingservice.formData[key]!=null   && this.camsworkreadingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkreadingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkreadingservice.formData!=null && this.camsworkreadingservice.formData[key]!=null   && this.camsworkreadingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkreadingservice.formData[key]+"'><div class='progress__number'>"+this.camsworkreadingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkreadingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkreadingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsworkreadingForm.value;
obj.readingdate=new Date(this.camsworkreadingForm.get('readingdate').value ? this.ngbDateParserFormatter.format(this.camsworkreadingForm.get('readingdate').value)+'  UTC' :null);
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

private camsworkreadingtoggleOption(){
this.camsworkreadingshowOption = this.camsworkreadingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkreadingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkreadingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkreadingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkreadingservice.formData=this.camsworkreadingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkreadingForm.controls[key] != null)
    {
        this.camsworkreadingservice.formData[key] = this.camsworkreadingForm.controls[key].value;
    }
}
}
}
this.camsworkreadingservice.formData.readingdate=new Date(this.camsworkreadingForm.get('readingdate').value ? this.ngbDateParserFormatter.format(this.camsworkreadingForm.get('readingdate').value)+'  UTC' :null);
console.log(this.camsworkreadingservice.formData);
this.camsworkreadingservice.formData=this.camsworkreadingForm.value;
this.camsworkreadingservice.saveOrUpdatecamsworkreadings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkreading);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkreadingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkreading);
}
else
{
this.FillData(res);
}
}
this.camsworkreadingForm.markAsUntouched();
this.camsworkreadingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlogid( logid) {
/*let ScreenType='2';
this.dialog.open(camsworktimelogComponent, 
{
data: {logid:this.camsworkreadingForm.get('logid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsworkreadingForm.get('workorderid').value, ScreenType:2 }
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



