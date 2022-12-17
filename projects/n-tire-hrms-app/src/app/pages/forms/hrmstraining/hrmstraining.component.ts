import { hrmstrainingService } from './../../../service/hrmstraining.service';
import { hrmstraining } from './../../../model/hrmstraining.model';
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
import { hrmsemployeetraining } from './../../../model/hrmsemployeetraining.model';
import { hrmsemployeetrainingComponent } from './../../../pages/forms/hrmsemployeetraining/hrmsemployeetraining.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-hrmstraining',
templateUrl: './hrmstraining.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmstrainingComponent implements OnInit {
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
bfilterPopulatehrmstrainings:boolean=false;
datahrmstrainingsjobfield3:any=[];
datahrmstrainingscolor3:any=[];
datahrmsemployeetrainingsemployeeid3:any=[];
datahrmsemployeetrainingsskill3:any=[];
datahrmsemployeetrainingstrainingid3:any=[];
bfilterPopulatehrmsemployeetrainings:boolean=false;
@ViewChild('tblhrmsemployeetrainingssource',{static:false}) tblhrmsemployeetrainingssource: Ng2SmartTableComponent;
 hrmstrainingForm: FormGroup;
jobfieldList: boconfigvalue[];
colorList: boconfigvalue[];
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
hrmstrainingshowOption:boolean;
hrmsemployeetrainingshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsemployeetrainingsvisiblelist:any;
hrmsemployeetrainingshidelist:any;

DeletedhrmsemployeetrainingIDs: string="";
hrmsemployeetrainingsID: string = "1";
hrmsemployeetrainingsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmstrainingservice: hrmstrainingService,
private bousermasterservice: bousermasterService,
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
this.hrmstrainingForm  = this.fb.group({
pk:[null],
ImageName: [null],
trainingid: [null],
trainingtitle: [null],
details: [null],
jobfield: [null],
jobfielddesc: [null],
organizationname: [null],
location: [null],
trainingstartdate: [null],
trainingenddate: [null],
trainer: [null],
color: [null],
colordesc: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmstrainingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmstrainingForm.dirty && this.hrmstrainingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.trainingid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.trainingid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.trainingid && pkDetail) {
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
let hrmstrainingid = null;

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
this.formid=hrmstrainingid;
//this.sharedService.alert(hrmstrainingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsemployeetrainingsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeetrainingsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("jobfield").then(res => this.jobfieldList = res as boconfigvalue[]);
this.configservice.getList("color").then(res => this.colorList = res as boconfigvalue[]);

//autocomplete
    this.hrmstrainingservice.gethrmstrainingsList().then(res => {
      this.pkList = res as hrmstraining[];
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
this.hrmstrainingForm.markAsUntouched();
this.hrmstrainingForm.markAsPristine();
}



resetForm() {
if (this.hrmstrainingForm != null)
this.hrmstrainingForm.reset();
this.hrmstrainingForm.patchValue({
});
setTimeout(() => {
this.hrmstrainingservice.hrmsemployeetrainings=[];
this.hrmsemployeetrainingsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let trainingid = this.hrmstrainingForm.get('trainingid').value;
        if(trainingid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmstrainingservice.deletehrmstraining(trainingid).then(res =>
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
    this.hrmstrainingForm.patchValue({
        trainingid: null
    });
    if(this.hrmstrainingservice.formData.trainingid!=null)this.hrmstrainingservice.formData.trainingid=null;
for (let i=0;i<this.hrmstrainingservice.hrmsemployeetrainings.length;i++) {
this.hrmstrainingservice.hrmsemployeetrainings[i].emptrainingid=null;
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
        else if(key=="trainingstartdate")
this.hrmstrainingForm.patchValue({"trainingstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="trainingenddate")
this.hrmstrainingForm.patchValue({"trainingenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmstrainingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmstrainingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmstrainingForm.controls[key]!=undefined)
{
this.hrmstrainingForm.controls[key].disable({onlySelf: true});
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
jobfieldonChange(evt:any){
let e=this.f.jobfield.value as any;
this.hrmstrainingForm.patchValue({jobfielddesc:evt.options[evt.options.selectedIndex].text});
}
coloronChange(evt:any){
let e=this.f.color.value as any;
this.hrmstrainingForm.patchValue({colordesc:evt.options[evt.options.selectedIndex].text});
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
  


edithrmstrainings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmstrainingservice.gethrmstrainingsByEID(pkcol).then(res => {

this.hrmstrainingservice.formData=res.hrmstraining;
let formproperty=res.hrmstraining.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmstraining.pkcol;
this.formid=res.hrmstraining.trainingid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmstraining.trainingid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmstrainingForm.patchValue({
trainingid: res.hrmstraining.trainingid,
trainingtitle: res.hrmstraining.trainingtitle,
details: res.hrmstraining.details,
jobfield: res.hrmstraining.jobfield,
jobfielddesc: res.hrmstraining.jobfielddesc,
organizationname: res.hrmstraining.organizationname,
location: res.hrmstraining.location,
trainingstartdate: this.ngbDateParserFormatter.parse(res.hrmstraining.trainingstartdate),
trainingenddate: this.ngbDateParserFormatter.parse(res.hrmstraining.trainingenddate),
trainer: res.hrmstraining.trainer,
color: res.hrmstraining.color,
colordesc: res.hrmstraining.colordesc,
attachment: JSON.parse(res.hrmstraining.attachment),
status: res.hrmstraining.status,
statusdesc: res.hrmstraining.statusdesc,
});
this.hrmsemployeetrainingsvisiblelist=res.hrmsemployeetrainingsvisiblelist;
if(this.hrmstrainingForm.get('attachment').value!=null && this.hrmstrainingForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmstrainingForm.get('attachment').value);
//Child Tables if any
this.hrmstrainingservice.hrmsemployeetrainings = res.hrmsemployeetrainings;
this.SethrmsemployeetrainingsTableConfig();
this.hrmsemployeetrainingsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeetrainingsTableddConfig();
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
  for (let key in this.hrmstrainingForm.controls) {
    if (this.hrmstrainingForm.controls[key] != null) {
if(false)
{
if(this.hrmstrainingservice.formData!=null && this.hrmstrainingservice.formData[key]!=null  && this.hrmstrainingservice.formData[key]!='[]' && this.hrmstrainingservice.formData[key]!=undefined && this.hrmstrainingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmstrainingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmstrainingservice.formData!=null && this.hrmstrainingservice.formData[key]!=null   && this.hrmstrainingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmstrainingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmstrainingservice.formData!=null && this.hrmstrainingservice.formData[key]!=null   && this.hrmstrainingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmstrainingservice.formData[key]+"'><div class='progress__number'>"+this.hrmstrainingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmstrainingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmstrainingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmstrainingForm.value;
obj.trainingstartdate=new Date(this.hrmstrainingForm.get('trainingstartdate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingForm.get('trainingstartdate').value)+'  UTC' :null);
obj.trainingenddate=new Date(this.hrmstrainingForm.get('trainingenddate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingForm.get('trainingenddate').value)+'  UTC' :null);
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

private hrmstrainingtoggleOption(){
this.hrmstrainingshowOption = this.hrmstrainingshowOption === true ? false : true;
}

private hrmsemployeetrainingtoggleOption(){
this.hrmsemployeetrainingshowOption = this.hrmsemployeetrainingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmstrainingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmstrainingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmstrainingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmstrainingservice.formData=this.hrmstrainingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmstrainingForm.controls[key] != null)
    {
        this.hrmstrainingservice.formData[key] = this.hrmstrainingForm.controls[key].value;
    }
}
}
}
this.hrmstrainingservice.formData.trainingstartdate=new Date(this.hrmstrainingForm.get('trainingstartdate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingForm.get('trainingstartdate').value)+'  UTC' :null);
this.hrmstrainingservice.formData.trainingenddate=new Date(this.hrmstrainingForm.get('trainingenddate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingForm.get('trainingenddate').value)+'  UTC' :null);
this.hrmstrainingservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmstrainingservice.formData.DeletedhrmsemployeetrainingIDs = this.DeletedhrmsemployeetrainingIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmstrainingservice.formData);
this.hrmstrainingservice.formData=this.hrmstrainingForm.value;
this.hrmstrainingservice.saveOrUpdatehrmstrainings().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmsemployeetrainingssource.data)
{
    for (let i = 0; i < this.hrmsemployeetrainingssource.data.length; i++)
    {
        if (this.hrmsemployeetrainingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeetrainingssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstraining);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmstrainingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstraining);
}
else
{
this.FillData(res);
}
}
this.hrmstrainingForm.markAsUntouched();
this.hrmstrainingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsemployeetraining(event:any,emptrainingid:any, trainingid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeetrainingComponent, 
{
data:  {  showview:false,save:false,event,emptrainingid, trainingid,visiblelist:this.hrmsemployeetrainingsvisiblelist,  hidelist:this.hrmsemployeetrainingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeetrainingssource.add(res);
this.hrmsemployeetrainingssource.refresh();
}
else
{
this.hrmsemployeetrainingssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeetraining(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeetrainingIDs += childID + ",";
this.hrmstrainingservice.hrmsemployeetrainings.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsemployeetrainings
hrmsemployeetrainingssettings:any;
hrmsemployeetrainingssource: any;

showhrmsemployeetrainingsCheckbox()
{
debugger;
if(this.tblhrmsemployeetrainingssource.settings['selectMode']== 'multi')this.tblhrmsemployeetrainingssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeetrainingssource.settings['selectMode']= 'multi';
this.tblhrmsemployeetrainingssource.initGrid();
}
deletehrmsemployeetrainingsAll()
{
this.tblhrmsemployeetrainingssource.settings['selectMode'] = 'single';
}
showhrmsemployeetrainingsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeetrainingsTableddConfig();
  });
      if(this.tblhrmsemployeetrainingssource.settings!=null)this.tblhrmsemployeetrainingssource.settings['hideSubHeader'] =!this.tblhrmsemployeetrainingssource.settings['hideSubHeader'];
this.tblhrmsemployeetrainingssource.initGrid();
}
showhrmsemployeetrainingsInActive()
{
}
enablehrmsemployeetrainingsInActive()
{
}
async SethrmsemployeetrainingsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeetrainings){

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetrainingsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].userid, title:dataemployeeid2[i].username};
this.datahrmsemployeetrainingsemployeeid3.push(obj);
}
if((this.tblhrmsemployeetrainingssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeetrainingssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetrainingsemployeeid3));
this.tblhrmsemployeetrainingssource.initGrid();
}
});

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetrainingstrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmsemployeetrainingstrainingid3.push(obj);
}
if((this.tblhrmsemployeetrainingssource.settings as any).columns['trainingid'])
{
(this.tblhrmsemployeetrainingssource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetrainingstrainingid3));
this.tblhrmsemployeetrainingssource.initGrid();
}
});

this.configservice.getList("employeeskill").then(res=>
{
var dataskill2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetrainingsskill3.push(defaultobj);
for(let i=0; i<dataskill2.length; i++){
var obj= { value: dataskill2[i].configkey, title: dataskill2[i].configtext};
this.datahrmsemployeetrainingsskill3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetrainingssource.settings);
if(clone.columns['skill']!=undefined)clone.columns['skill'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetrainingsskill3)), }, };
if(clone.columns['skill']!=undefined)clone.columns['skill'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetrainingsskill3)), }, };
this.tblhrmsemployeetrainingssource.settings =  clone;
this.tblhrmsemployeetrainingssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeetrainings=true;
}
async hrmsemployeetrainingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeetrainingsTableConfig()
{
this.hrmsemployeetrainingssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetrainingsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
skill: {
title: 'Skill',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetrainingsskill3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
trainerfeedback: {
title: 'Trainer Feedback',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
coursefeedback: {
title: 'Course Feedback',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
hrmsemployeetrainingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetrainingsID)>=0)
{
this.hrmsemployeetrainingssource=new LocalDataSource();
this.hrmsemployeetrainingssource.load(this.hrmstrainingservice.hrmsemployeetrainings as  any as LocalDataSource);
this.hrmsemployeetrainingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeetrainingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingservice.hrmsemployeetrainings.length == 0)
{
    this.tblhrmsemployeetrainingssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeetraining();
    this.hrmstrainingservice.hrmsemployeetrainings.push(obj);
    this.hrmsemployeetrainingssource.refresh();
    if ((this.hrmstrainingservice.hrmsemployeetrainings.length / this.hrmsemployeetrainingssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeetrainingssource.getPaging().page)
    {
        this.hrmsemployeetrainingssource.setPage((this.hrmstrainingservice.hrmsemployeetrainings.length / this.hrmsemployeetrainingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeetrainingssource.grid.edit(this.tblhrmsemployeetrainingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeetrainingssource.data.indexOf(event.data);
this.onDeletehrmsemployeetraining(event,event.data.emptrainingid,((this.hrmsemployeetrainingssource.getPaging().page-1) *this.hrmsemployeetrainingssource.getPaging().perPage)+index);
this.hrmsemployeetrainingssource.refresh();
break;
}
}

*/
hrmsemployeetrainingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeetraining(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeetraining(event,event.data.emptrainingid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeetraining(event,event.data.emptrainingid,((this.hrmsemployeetrainingssource.getPaging().page-1) *this.hrmsemployeetrainingssource.getPaging().perPage)+event.index);
this.hrmsemployeetrainingssource.refresh();
break;
}
}
hrmsemployeetrainingsonDelete(obj) {
let emptrainingid=obj.data.emptrainingid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingservice.deletehrmstraining(emptrainingid).then(res=>
this.hrmsemployeetrainingsLoadTable()
);
}
}
hrmsemployeetrainingsPaging(val)
{
debugger;
this.hrmsemployeetrainingssource.setPaging(1, val, true);
}

handlehrmsemployeetrainingsGridSelected(event:any) {
this.hrmsemployeetrainingsselectedindex=this.hrmstrainingservice.hrmsemployeetrainings.findIndex(i => i.emptrainingid === event.data.emptrainingid);
}
IshrmsemployeetrainingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetrainingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeetrainings

}



