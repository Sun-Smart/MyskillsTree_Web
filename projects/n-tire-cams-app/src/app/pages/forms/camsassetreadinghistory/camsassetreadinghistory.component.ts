import { camsassetreadinghistoryService } from './../../../service/camsassetreadinghistory.service';
import { camsassetreadinghistory } from './../../../model/camsassetreadinghistory.model';
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
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-camsassetreadinghistory',
templateUrl: './camsassetreadinghistory.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetreadinghistoryComponent implements OnInit {
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
bfilterPopulatecamsassetreadinghistories:boolean=false;
datacamsassetreadinghistoriesassetid3:any=[];
datacamsassetreadinghistoriesreadingpointcode3:any=[];
datacamsassetreadinghistoriesreadingtype3:any=[];
datacamsassetreadinghistoriesmeasurementmeter3:any=[];
 camsassetreadinghistoryForm: FormGroup;
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
readingpointcodeList: boconfigvalue[];
readingtypeList: boconfigvalue[];
measurementmeterList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
camsassetreadinghistoryshowOption:boolean;
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
private camsassetreadinghistoryservice: camsassetreadinghistoryService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsassetmasterservice:camsassetmasterService,
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
this.camsassetreadinghistoryForm  = this.fb.group({
pk:[null],
ImageName: [null],
historyid: [null],
readingid: [null],
assetid: [null],
assetiddesc: [null],
readingpointcode: [null],
readingpointcodedesc: [null],
readingtype: [null],
readingtypedesc: [null],
measurementmeter: [null],
measurementmeterdesc: [null],
readingdate: [null],
reading: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassetreadinghistoryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetreadinghistoryForm.dirty && this.camsassetreadinghistoryForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.historyid && pkDetail) {
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
let camsassetreadinghistoryid = null;

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
this.formid=camsassetreadinghistoryid;
//this.sharedService.alert(camsassetreadinghistoryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsassetreadinghistoryservice.formData && this.camsassetreadinghistoryservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsassetreadinghistoryForm.patchValue({
    assetid: this.camsassetreadinghistoryservice.formData.assetid,
    assetiddesc: this.camsassetreadinghistoryservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsassetreadinghistoryForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assetid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetid_camsassetmastersformatter = (result: any) => result.description;
this.configservice.getList("readingpointcode").then(res => this.readingpointcodeList = res as boconfigvalue[]);
this.configservice.getList("readingtype").then(res => this.readingtypeList = res as boconfigvalue[]);
this.configservice.getList("measurementmeter").then(res => this.measurementmeterList = res as boconfigvalue[]);

//autocomplete
    this.camsassetreadinghistoryservice.getcamsassetreadinghistoriesList().then(res => {
      this.pkList = res as camsassetreadinghistory[];
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
this.camsassetreadinghistoryForm.markAsUntouched();
this.camsassetreadinghistoryForm.markAsPristine();
}
onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsassetreadinghistoryForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}




resetForm() {
if (this.camsassetreadinghistoryForm != null)
this.camsassetreadinghistoryForm.reset();
this.camsassetreadinghistoryForm.patchValue({
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let historyid = this.camsassetreadinghistoryForm.get('historyid').value;
        if(historyid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetreadinghistoryservice.deletecamsassetreadinghistory(historyid).then(res =>
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
    this.camsassetreadinghistoryForm.patchValue({
        historyid: null
    });
    if(this.camsassetreadinghistoryservice.formData.historyid!=null)this.camsassetreadinghistoryservice.formData.historyid=null;
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
this.camsassetreadinghistoryForm.patchValue({"readingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.camsassetreadinghistoryForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsassetreadinghistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassetreadinghistoryForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassetreadinghistoryForm.controls[key]!=undefined)
{
this.camsassetreadinghistoryForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetreadinghistories",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
historyidonChange(evt:any){
let e=evt.value;
}
readingidonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
readingpointcodeonChange(evt:any){
let e=this.f.readingpointcode.value as any;
this.camsassetreadinghistoryForm.patchValue({readingpointcodedesc:evt.options[evt.options.selectedIndex].text});
}
readingtypeonChange(evt:any){
let e=this.f.readingtype.value as any;
this.camsassetreadinghistoryForm.patchValue({readingtypedesc:evt.options[evt.options.selectedIndex].text});
}
measurementmeteronChange(evt:any){
let e=this.f.measurementmeter.value as any;
this.camsassetreadinghistoryForm.patchValue({measurementmeterdesc:evt.options[evt.options.selectedIndex].text});
}
readingdateonChange(evt:any){
let e=evt.value;
}
readingonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
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
  


editcamsassetreadinghistories() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassetreadinghistoryservice.getcamsassetreadinghistoriesByEID(pkcol).then(res => {

this.camsassetreadinghistoryservice.formData=res.camsassetreadinghistory;
let formproperty=res.camsassetreadinghistory.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassetreadinghistory.pkcol;
this.formid=res.camsassetreadinghistory.historyid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassetreadinghistory.historyid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetreadinghistoryForm.patchValue({
historyid: res.camsassetreadinghistory.historyid,
readingid: res.camsassetreadinghistory.readingid,
assetid: res.camsassetreadinghistory.assetid,
assetiddesc: res.camsassetreadinghistory.assetiddesc,
readingpointcode: res.camsassetreadinghistory.readingpointcode,
readingpointcodedesc: res.camsassetreadinghistory.readingpointcodedesc,
readingtype: res.camsassetreadinghistory.readingtype,
readingtypedesc: res.camsassetreadinghistory.readingtypedesc,
measurementmeter: res.camsassetreadinghistory.measurementmeter,
measurementmeterdesc: res.camsassetreadinghistory.measurementmeterdesc,
readingdate: this.ngbDateParserFormatter.parse(res.camsassetreadinghistory.readingdate),
reading: res.camsassetreadinghistory.reading,
remarks: JSON.parse(res.camsassetreadinghistory.remarks),
customfield: res.camsassetreadinghistory.customfield,
attachment: JSON.parse(res.camsassetreadinghistory.attachment),
status: res.camsassetreadinghistory.status,
statusdesc: res.camsassetreadinghistory.statusdesc,
});
if(this.camsassetreadinghistoryForm.get('customfield').value!=null && this.camsassetreadinghistoryForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetreadinghistoryForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetreadinghistoryForm.get('attachment').value!=null && this.camsassetreadinghistoryForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassetreadinghistoryForm.get('attachment').value);
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
  for (let key in this.camsassetreadinghistoryForm.controls) {
    if (this.camsassetreadinghistoryForm.controls[key] != null) {
if(false)
{
if(this.camsassetreadinghistoryservice.formData!=null && this.camsassetreadinghistoryservice.formData[key]!=null  && this.camsassetreadinghistoryservice.formData[key]!='[]' && this.camsassetreadinghistoryservice.formData[key]!=undefined && this.camsassetreadinghistoryservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassetreadinghistoryservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassetreadinghistoryservice.formData!=null && this.camsassetreadinghistoryservice.formData[key]!=null   && this.camsassetreadinghistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassetreadinghistoryservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassetreadinghistoryservice.formData!=null && this.camsassetreadinghistoryservice.formData[key]!=null   && this.camsassetreadinghistoryservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassetreadinghistoryservice.formData[key]+"'><div class='progress__number'>"+this.camsassetreadinghistoryservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetreadinghistoryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetreadinghistoryForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetreadinghistoryForm.value;
obj.readingdate=new Date(this.camsassetreadinghistoryForm.get('readingdate').value ? this.ngbDateParserFormatter.format(this.camsassetreadinghistoryForm.get('readingdate').value)+'  UTC' :null);
if(this.camsassetreadinghistoryForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsassetreadinghistoryForm.get('remarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private camsassetreadinghistorytoggleOption(){
this.camsassetreadinghistoryshowOption = this.camsassetreadinghistoryshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetreadinghistoryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetreadinghistoryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetreadinghistoryForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetreadinghistoryservice.formData=this.camsassetreadinghistoryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetreadinghistoryForm.controls[key] != null)
    {
        this.camsassetreadinghistoryservice.formData[key] = this.camsassetreadinghistoryForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetreadinghistoryservice.formData.readingdate=new Date(this.camsassetreadinghistoryForm.get('readingdate').value ? this.ngbDateParserFormatter.format(this.camsassetreadinghistoryForm.get('readingdate').value)+'  UTC' :null);
if(this.camsassetreadinghistoryForm.get('remarks').value!=null)this.camsassetreadinghistoryservice.formData.remarks=JSON.stringify(this.camsassetreadinghistoryForm.get('remarks').value);
if(customfields!=null)this.camsassetreadinghistoryservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassetreadinghistoryservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetreadinghistoryservice.formData);
this.camsassetreadinghistoryservice.formData=this.camsassetreadinghistoryForm.value;
this.camsassetreadinghistoryservice.saveOrUpdatecamsassetreadinghistories().subscribe(
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
this.dialogRef.close((res as any).camsassetreadinghistory);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetreadinghistoryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetreadinghistory);
}
else
{
this.FillData(res);
}
}
this.camsassetreadinghistoryForm.markAsUntouched();
this.camsassetreadinghistoryForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsassetreadinghistoryForm.get('assetid').value, ScreenType:2 }
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



