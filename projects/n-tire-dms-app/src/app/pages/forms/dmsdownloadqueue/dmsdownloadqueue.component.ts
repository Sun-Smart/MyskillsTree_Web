import { dmsdownloadqueueService } from './../../../service/dmsdownloadqueue.service';
import { dmsdownloadqueue } from './../../../model/dmsdownloadqueue.model';
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
import { dmsfolder} from './../../../model/dmsfolder.model';
import { dmsfolderComponent } from './../../../pages/forms/dmsfolder/dmsfolder.component';
import { dmsfolderService } from './../../../service/dmsfolder.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-dmsdownloadqueue',
templateUrl: './dmsdownloadqueue.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsdownloadqueueComponent implements OnInit {
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
bfilterPopulatedmsdownloadqueues:boolean=false;
datadmsdownloadqueuesfolderid3:any=[];
datadmsdownloadqueuesrequestedby3:any=[];
datadmsdownloadqueuesdownloadstatus3:any=[];
 dmsdownloadqueueForm: FormGroup;
folderidList: dmsfolder[];
requestedbyList: bousermaster[];
requestedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestedby_bousermastersForm: FormGroup;//autocomplete
requestedby_bousermastersoptions:any;//autocomplete
requestedby_bousermastersformatter:any;//autocomplete
downloadstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmsdownloadqueueshowOption:boolean;
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
private dmsdownloadqueueservice: dmsdownloadqueueService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private dmsfolderservice:dmsfolderService,
private bousermasterservice:bousermasterService,
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
this.dmsdownloadqueueForm  = this.fb.group({
pk:[null],
queueid: [null],
folderid: [null],
folderiddesc: [null],
requestedby: [null],
requestedbydesc: [null],
downloadstatus: [null],
downloadstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsdownloadqueueForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsdownloadqueueForm.dirty && this.dmsdownloadqueueForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.queueid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.queueid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.queueid && pkDetail) {
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
let dmsdownloadqueueid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=dmsdownloadqueueid;
//this.sharedService.alert(dmsdownloadqueueid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.dmsfolderservice.getdmsfoldersList().then(res => 
{
this.folderidList = res as dmsfolder[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestedbyList = res as bousermaster[];
if(this.dmsdownloadqueueservice.formData && this.dmsdownloadqueueservice.formData.requestedby){
this.requestedbyoptionsEvent.emit(this.requestedbyList);
this.dmsdownloadqueueForm.patchValue({
    requestedby: this.dmsdownloadqueueservice.formData.requestedby,
    requestedbydesc: this.dmsdownloadqueueservice.formData.requestedbydesc,
});
}
{
let arrrequestedby = this.requestedbyList.filter(v => v.userid == this.dmsdownloadqueueForm.get('requestedby').value);
let objrequestedby;
if (arrrequestedby.length > 0) objrequestedby = arrrequestedby[0];
if (objrequestedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("downloadstatus").then(res => this.downloadstatusList = res as boconfigvalue[]);

//autocomplete
    this.dmsdownloadqueueservice.getdmsdownloadqueuesList().then(res => {
      this.pkList = res as dmsdownloadqueue[];
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
this.dmsdownloadqueueForm.markAsUntouched();
this.dmsdownloadqueueForm.markAsPristine();
}
onSelectedrequestedby(requestedbyDetail: any) {
if (requestedbyDetail.userid && requestedbyDetail) {
this.dmsdownloadqueueForm.patchValue({
requestedby: requestedbyDetail.userid,
requestedbydesc: requestedbyDetail.username,

});

}
}




resetForm() {
if (this.dmsdownloadqueueForm != null)
this.dmsdownloadqueueForm.reset();
this.dmsdownloadqueueForm.patchValue({
requestedby: this.sessiondata.userid,
requestedbydesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let queueid = this.dmsdownloadqueueForm.get('queueid').value;
        if(queueid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsdownloadqueueservice.deletedmsdownloadqueue(queueid).then(res =>
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
    this.dmsdownloadqueueForm.patchValue({
        queueid: null
    });
    if(this.dmsdownloadqueueservice.formData.queueid!=null)this.dmsdownloadqueueservice.formData.queueid=null;
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
this.dmsdownloadqueueForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsdownloadqueueForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsdownloadqueueForm.controls[key]!=undefined)
{
this.dmsdownloadqueueForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
queueidonChange(evt:any){
let e=evt.value;
}
folderidonChange(evt:any){
let e=evt.value;
this.dmsdownloadqueueForm.patchValue({folderiddesc:evt.options[evt.options.selectedIndex].text});
}
requestedbyonChange(evt:any){
let e=evt.value;
}
downloadstatusonChange(evt:any){
let e=this.f.downloadstatus.value as any;
this.dmsdownloadqueueForm.patchValue({downloadstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

editdmsdownloadqueues() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsdownloadqueueservice.getdmsdownloadqueuesByEID(pkcol).then(res => {

this.dmsdownloadqueueservice.formData=res.dmsdownloadqueue;
let formproperty=res.dmsdownloadqueue.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsdownloadqueue.pkcol;
this.formid=res.dmsdownloadqueue.queueid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsdownloadqueueservice.formData=res.dmsdownloadqueue;
this.formid=res.dmsdownloadqueue.queueid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsdownloadqueueForm.patchValue({
queueid: res.dmsdownloadqueue.queueid,
folderid: res.dmsdownloadqueue.folderid,
folderiddesc: res.dmsdownloadqueue.folderiddesc,
requestedby: res.dmsdownloadqueue.requestedby,
requestedbydesc: res.dmsdownloadqueue.requestedbydesc,
downloadstatus: res.dmsdownloadqueue.downloadstatus,
downloadstatusdesc: res.dmsdownloadqueue.downloadstatusdesc,
status: res.dmsdownloadqueue.status,
statusdesc: res.dmsdownloadqueue.statusdesc,
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
  for (let key in this.dmsdownloadqueueForm.controls) {
    if (this.dmsdownloadqueueForm.controls[key] != null) {
if(false)
{
if(this.dmsdownloadqueueservice.formData!=null && this.dmsdownloadqueueservice.formData[key]!=null  && this.dmsdownloadqueueservice.formData[key]!='[]' && this.dmsdownloadqueueservice.formData[key]!=undefined && this.dmsdownloadqueueservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsdownloadqueueservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsdownloadqueueservice.formData!=null && this.dmsdownloadqueueservice.formData[key]!=null   && this.dmsdownloadqueueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsdownloadqueueservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsdownloadqueueservice.formData!=null && this.dmsdownloadqueueservice.formData[key]!=null   && this.dmsdownloadqueueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsdownloadqueueservice.formData[key]+"'><div class='progress__number'>"+this.dmsdownloadqueueservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsdownloadqueueForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsdownloadqueueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmsdownloadqueueForm.value;
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

private dmsdownloadqueuetoggleOption(){
this.dmsdownloadqueueshowOption = this.dmsdownloadqueueshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsdownloadqueueForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsdownloadqueueForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsdownloadqueueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsdownloadqueueservice.formData=this.dmsdownloadqueueForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsdownloadqueueForm.controls[key] != null)
    {
        this.dmsdownloadqueueservice.formData[key] = this.dmsdownloadqueueForm.controls[key].value;
    }
}
}
}
console.log(this.dmsdownloadqueueservice.formData);
this.dmsdownloadqueueservice.formData=this.dmsdownloadqueueForm.value;
this.dmsdownloadqueueservice.saveOrUpdatedmsdownloadqueues().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsdownloadqueue);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsdownloadqueueservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsdownloadqueue);
}
else
{
this.FillData(res);
}
}
this.dmsdownloadqueueForm.markAsUntouched();
this.dmsdownloadqueueForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditfolderid( folderid) {
/*let ScreenType='2';
this.dialog.open(dmsfolderComponent, 
{
data: {folderid:this.dmsdownloadqueueForm.get('folderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.dmsdownloadqueueForm.get('requestedby').value, ScreenType:2 }
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



