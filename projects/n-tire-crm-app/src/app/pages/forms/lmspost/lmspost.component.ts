import { lmspostService } from './../../../service/lmspost.service';
import { lmspost } from './../../../model/lmspost.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-lmspost',
templateUrl: './lmspost.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmspostComponent implements OnInit {
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
bfilterPopulatelmsposts:boolean=false;
datalmspostsuserid3:any=[];
datalmspostscampaigntype3:any=[];
datalmspostscampaignstatus3:any=[];
 lmspostForm: FormGroup;
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
campaigntypeList: boconfigvalue[];
campaignstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
lmspostshowOption:boolean;
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
private lmspostservice: lmspostService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.lmspostForm  = this.fb.group({
pk:[null],
ImageName: [null],
postid: [null],
campaignid: [null],
userid: [null],
useriddesc: [null],
senderemail: [null],
scheduledate: [null],
scheduletime: [null],
contenttext: [null],
campaigntype: [null],
campaigntypedesc: [null],
recipientgroup: [null],
testgroup: [null],
sendunsubscribelink: [null],
campaignstatus: [null],
campaignstatusdesc: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmspostForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmspostForm.dirty && this.lmspostForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.postid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.postid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.postid && pkDetail) {
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
let lmspostid = null;

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
this.formid=lmspostid;
//this.sharedService.alert(lmspostid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.lmspostservice.formData && this.lmspostservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.lmspostForm.patchValue({
    userid: this.lmspostservice.formData.userid,
    useriddesc: this.lmspostservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.lmspostForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("campaigntype").then(res => this.campaigntypeList = res as boconfigvalue[]);
this.configservice.getList("campaignstatus").then(res => this.campaignstatusList = res as boconfigvalue[]);

//autocomplete
    this.lmspostservice.getlmspostsList().then(res => {
      this.pkList = res as lmspost[];
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
this.lmspostForm.markAsUntouched();
this.lmspostForm.markAsPristine();
}
onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.lmspostForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.lmspostForm != null)
this.lmspostForm.reset();
this.lmspostForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.lmspostForm.patchValue({
userid: this.sessiondata.userid,
scheduledate: this.ngbDateParserFormatter.parse(new Date().toString()),
scheduletime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let postid = this.lmspostForm.get('postid').value;
        if(postid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmspostservice.deletelmspost(postid).then(res =>
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
    this.lmspostForm.patchValue({
        postid: null
    });
    if(this.lmspostservice.formData.postid!=null)this.lmspostservice.formData.postid=null;
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
        else if(key=="scheduledate")
this.lmspostForm.patchValue({"scheduledate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="scheduletime")
this.lmspostForm.patchValue({"scheduletime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmspostForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmspostForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmspostForm.controls[key]!=undefined)
{
this.lmspostForm.controls[key].disable({onlySelf: true});
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
postidonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
senderemailonChange(evt:any){
let e=evt.value;
}
scheduledateonChange(evt:any){
let e=evt.value;
}
scheduletimeonChange(evt:any){
let e=evt.value;
}
contenttextonChange(evt:any){
let e=evt.value;
}
campaigntypeonChange(evt:any){
let e=this.f.campaigntype.value as any;
this.lmspostForm.patchValue({campaigntypedesc:evt.options[evt.options.selectedIndex].text});
}
recipientgrouponChange(evt:any){
let e=evt.value;
}
testgrouponChange(evt:any){
let e=evt.value;
}
sendunsubscribelinkonChange(evt:any){
let e=evt.value;
}
campaignstatusonChange(evt:any){
let e=this.f.campaignstatus.value as any;
this.lmspostForm.patchValue({campaignstatusdesc:evt.options[evt.options.selectedIndex].text});
}
attachmentonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
attachmentuploader(e:any) { 
for (let i = 0; i < e.files.length; i++) {
this.fileattachmentlist.push(e.files[i]);
let max=0;
let attachmentobj =null;
if(this.attachmentfieldjson==null)this.attachmentfieldjson=[];
max=Array.of(this.attachmentfieldjson).length;attachmentobj =new KeyValuePair((this.attachmentfieldjson.length + 1+ max).toString(),e.files[i].name);
this.attachmentfieldjson.push(attachmentobj);
max=0;
if(this.attachmentlist!=null)max=Array.of(this.attachmentlist).length;  attachmentobj =new KeyValuePair((this.attachmentlist.length + 1+ max).toString(),e.files[i].name);
this.attachmentlist.push(attachmentobj);
}}
  


editlmsposts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmspostservice.getlmspostsByEID(pkcol).then(res => {

this.lmspostservice.formData=res.lmspost;
let formproperty=res.lmspost.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmspost.pkcol;
this.formid=res.lmspost.postid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmspost.postid;
var scheduletimeTime=new Time( res.lmspost.scheduletime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmspostForm.patchValue({
postid: res.lmspost.postid,
campaignid: res.lmspost.campaignid,
userid: res.lmspost.userid,
useriddesc: res.lmspost.useriddesc,
senderemail: res.lmspost.senderemail,
scheduledate: this.ngbDateParserFormatter.parse(res.lmspost.scheduledate),
scheduletime: scheduletimeTime,
contenttext: res.lmspost.contenttext,
campaigntype: res.lmspost.campaigntype,
campaigntypedesc: res.lmspost.campaigntypedesc,
recipientgroup: res.lmspost.recipientgroup,
testgroup: res.lmspost.testgroup,
sendunsubscribelink: res.lmspost.sendunsubscribelink,
campaignstatus: res.lmspost.campaignstatus,
campaignstatusdesc: res.lmspost.campaignstatusdesc,
attachment: JSON.parse(res.lmspost.attachment),
status: res.lmspost.status,
statusdesc: res.lmspost.statusdesc,
});
if(this.lmspostForm.get('attachment').value!=null && this.lmspostForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmspostForm.get('attachment').value);
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
  for (let key in this.lmspostForm.controls) {
    if (this.lmspostForm.controls[key] != null) {
if(false)
{
if(this.lmspostservice.formData!=null && this.lmspostservice.formData[key]!=null  && this.lmspostservice.formData[key]!='[]' && this.lmspostservice.formData[key]!=undefined && this.lmspostservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmspostservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmspostservice.formData!=null && this.lmspostservice.formData[key]!=null   && this.lmspostservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmspostservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmspostservice.formData!=null && this.lmspostservice.formData[key]!=null   && this.lmspostservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmspostservice.formData[key]+"'><div class='progress__number'>"+this.lmspostservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmspostForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmspostForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmspostForm.value;
obj.scheduledate=new Date(this.lmspostForm.get('scheduledate').value ? this.ngbDateParserFormatter.format(this.lmspostForm.get('scheduledate').value)+'  UTC' :null);
obj.scheduletime=(this.lmspostForm.get('scheduletime').value==null?0:this.lmspostForm.get('scheduletime').value.hour)+':'+(this.lmspostForm.get('scheduletime').value==null?0:this.lmspostForm.get('scheduletime').value.minute+":00");
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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

private lmsposttoggleOption(){
this.lmspostshowOption = this.lmspostshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmspostForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmspostForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmspostForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmspostservice.formData=this.lmspostForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmspostForm.controls[key] != null)
    {
        this.lmspostservice.formData[key] = this.lmspostForm.controls[key].value;
    }
}
}
}
this.lmspostservice.formData.scheduledate=new Date(this.lmspostForm.get('scheduledate').value ? this.ngbDateParserFormatter.format(this.lmspostForm.get('scheduledate').value)+'  UTC' :null);
this.lmspostservice.formData.scheduletime=(this.lmspostForm.get('scheduletime').value==null?0:this.lmspostForm.get('scheduletime').value.hour)+':'+(this.lmspostForm.get('scheduletime').value==null?0:this.lmspostForm.get('scheduletime').value.minute+":00");
this.lmspostservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmspostservice.formData);
this.lmspostservice.formData=this.lmspostForm.value;
this.lmspostservice.saveOrUpdatelmsposts().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmspost);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmspostservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmspost);
}
else
{
this.FillData(res);
}
}
this.lmspostForm.markAsUntouched();
this.lmspostForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmspostForm.get('userid').value, ScreenType:2 }
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



