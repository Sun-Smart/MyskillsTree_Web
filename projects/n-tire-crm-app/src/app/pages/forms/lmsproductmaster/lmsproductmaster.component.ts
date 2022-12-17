import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmsproductmaster } from './../../../model/lmsproductmaster.model';
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
import { lmsbundledproduct } from './../../../model/lmsbundledproduct.model';
import { lmsbundledproductComponent } from './../../../pages/forms/lmsbundledproduct/lmsbundledproduct.component';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-lmsproductmaster',
templateUrl: './lmsproductmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsproductmasterComponent implements OnInit {
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
bfilterPopulatelmsproductmasters:boolean=false;
datalmsproductmastersproductgroup3:any=[];
bfilterPopulatelmsbundledproducts:boolean=false;
@ViewChild('tbllmsbundledproductssource',{static:false}) tbllmsbundledproductssource: Ng2SmartTableComponent;
 lmsproductmasterForm: FormGroup;
productgroupList: boconfigvalue[];
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
lmsproductmastershowOption:boolean;
lmsbundledproductshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmsbundledproductsvisiblelist:any;
lmsbundledproductshidelist:any;

DeletedlmsbundledproductIDs: string="";
lmsbundledproductsID: string = "1";
lmsbundledproductsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmsproductmasterservice: lmsproductmasterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.lmsproductmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
productid: [null],
productgroup: [null],
productgroupdesc: [null],
productcode: [null, Validators.required],
productname: [null, Validators.required],
productimage: [null],
description: [null],
dimension: [null],
details: [null],
bundleproduct: [null],
productowner: [null],
validfrom: [null],
validto: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsproductmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsproductmasterForm.dirty && this.lmsproductmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
productcodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.productcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].productid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Product Code value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.productid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.productid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.productid && pkDetail) {
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
let lmsproductmasterid = null;

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
this.formid=lmsproductmasterid;
//this.sharedService.alert(lmsproductmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmsbundledproductsTableConfig();
  setTimeout(() => {
  this.SetlmsbundledproductsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("productgroup").then(res => this.productgroupList = res as boconfigvalue[]);

//autocomplete
    this.lmsproductmasterservice.getlmsproductmastersList().then(res => {
      this.pkList = res as lmsproductmaster[];
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
this.lmsproductmasterForm.markAsUntouched();
this.lmsproductmasterForm.markAsPristine();
}



resetForm() {
if (this.lmsproductmasterForm != null)
this.lmsproductmasterForm.reset();
this.lmsproductmasterForm.patchValue({
});
setTimeout(() => {
this.lmsproductmasterservice.lmsbundledproducts=[];
this.lmsproductmasterservice.Insertlmsbundledproducts=[];
this.lmsbundledproductsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let productid = this.lmsproductmasterForm.get('productid').value;
        if(productid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsproductmasterservice.deletelmsproductmaster(productid).then(res =>
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
    this.lmsproductmasterForm.patchValue({
        productid: null
    });
    if(this.lmsproductmasterservice.formData.productid!=null)this.lmsproductmasterservice.formData.productid=null;
for (let i=0;i<this.lmsproductmasterservice.lmsbundledproducts.length;i++) {
this.lmsproductmasterservice.lmsbundledproducts[i].bundleproductid=null;
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
        else if(key=="productowner")
this.lmsproductmasterForm.patchValue({"productowner":  mainscreendata[key] } );
        else if(key=="validfrom")
this.lmsproductmasterForm.patchValue({"validfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validto")
this.lmsproductmasterForm.patchValue({"validto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmsproductmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsproductmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsproductmasterForm.controls[key]!=undefined)
{
this.lmsproductmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsproductmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
productgrouponChange(evt:any){
let e=this.f.productgroup.value as any;
this.lmsproductmasterForm.patchValue({productgroupdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlmsproductmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsproductmasterservice.getlmsproductmastersByEID(pkcol).then(res => {

this.lmsproductmasterservice.formData=res.lmsproductmaster;
let formproperty=res.lmsproductmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsproductmaster.pkcol;
this.formid=res.lmsproductmaster.productid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsproductmaster.productid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsproductmasterForm.patchValue({
productid: res.lmsproductmaster.productid,
productgroup: res.lmsproductmaster.productgroup,
productgroupdesc: res.lmsproductmaster.productgroupdesc,
productcode: res.lmsproductmaster.productcode,
productname: res.lmsproductmaster.productname,
productimage: res.lmsproductmaster.productimage,
description: res.lmsproductmaster.description,
dimension: res.lmsproductmaster.dimension,
details: res.lmsproductmaster.details,
bundleproduct: res.lmsproductmaster.bundleproduct,
productowner: JSON.parse(res.lmsproductmaster.productowner),
validfrom: this.ngbDateParserFormatter.parse(res.lmsproductmaster.validfrom),
validto: this.ngbDateParserFormatter.parse(res.lmsproductmaster.validto),
customfield: res.lmsproductmaster.customfield,
attachment: JSON.parse(res.lmsproductmaster.attachment),
status: res.lmsproductmaster.status,
statusdesc: res.lmsproductmaster.statusdesc,
});
this.lmsbundledproductsvisiblelist=res.lmsbundledproductsvisiblelist;
if(this.lmsproductmasterForm.get('customfield').value!=null && this.lmsproductmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmsproductmasterForm.get('customfield').value);
this.FillCustomField();
if(this.lmsproductmasterForm.get('attachment').value!=null && this.lmsproductmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmsproductmasterForm.get('attachment').value);
//Child Tables if any
this.lmsproductmasterservice.lmsbundledproducts = res.lmsbundledproducts;
this.SetlmsbundledproductsTableConfig();
this.lmsbundledproductsLoadTable();
  setTimeout(() => {
  this.SetlmsbundledproductsTableddConfig();
  });
this.lmsproductmasterservice.Insertlmsbundledproducts=[];
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
  for (let key in this.lmsproductmasterForm.controls) {
    if (this.lmsproductmasterForm.controls[key] != null) {
if(false)
{
if(this.lmsproductmasterservice.formData!=null && this.lmsproductmasterservice.formData[key]!=null  && this.lmsproductmasterservice.formData[key]!='[]' && this.lmsproductmasterservice.formData[key]!=undefined && this.lmsproductmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsproductmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsproductmasterservice.formData!=null && this.lmsproductmasterservice.formData[key]!=null   && this.lmsproductmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsproductmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsproductmasterservice.formData!=null && this.lmsproductmasterservice.formData[key]!=null   && this.lmsproductmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsproductmasterservice.formData[key]+"'><div class='progress__number'>"+this.lmsproductmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsproductmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsproductmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmsproductmasterForm.value;
obj.productowner=JSON.stringify(this.lmsproductmasterForm.get('productowner').value);
obj.validfrom=new Date(this.lmsproductmasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmsproductmasterForm.get('validfrom').value)+'  UTC' :null);
obj.validto=new Date(this.lmsproductmasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.lmsproductmasterForm.get('validto').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private lmsproductmastertoggleOption(){
this.lmsproductmastershowOption = this.lmsproductmastershowOption === true ? false : true;
}

private lmsbundledproducttoggleOption(){
this.lmsbundledproductshowOption = this.lmsbundledproductshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsproductmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsproductmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsproductmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsproductmasterservice.formData=this.lmsproductmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsproductmasterForm.controls[key] != null)
    {
        this.lmsproductmasterservice.formData[key] = this.lmsproductmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmsproductmasterservice.formData.productowner=JSON.stringify(this.lmsproductmasterForm.get('productowner').value);
this.lmsproductmasterservice.formData.validfrom=new Date(this.lmsproductmasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmsproductmasterForm.get('validfrom').value)+'  UTC' :null);
this.lmsproductmasterservice.formData.validto=new Date(this.lmsproductmasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.lmsproductmasterForm.get('validto').value)+'  UTC' :null);
this.lmsproductmasterservice.formData.customfield=JSON.stringify(customfields);
this.lmsproductmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmsproductmasterservice.formData.DeletedlmsbundledproductIDs = this.DeletedlmsbundledproductIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmsproductmasterservice.formData);
this.lmsproductmasterservice.formData=this.lmsproductmasterForm.value;
this.lmsproductmasterservice.saveOrUpdatelmsproductmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmsbundledproductssource.data)
{
    for (let i = 0; i < this.lmsbundledproductssource.data.length; i++)
    {
        if (this.lmsbundledproductssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsbundledproductssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsproductmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsproductmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsproductmaster);
}
else
{
this.FillData(res);
}
}
this.lmsproductmasterForm.markAsUntouched();
this.lmsproductmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmsbundledproducts
onCustomlmsbundledproductsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(lmsproductmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
lmsbundledproductssettings:any;
lmsbundledproductssource: any;

showlmsbundledproductsCheckbox()
{
debugger;
if(this.tbllmsbundledproductssource.settings['selectMode']== 'multi')this.tbllmsbundledproductssource.settings['selectMode']= 'single';
else
this.tbllmsbundledproductssource.settings['selectMode']= 'multi';
this.tbllmsbundledproductssource.initGrid();
}
deletelmsbundledproductsAll()
{
this.tbllmsbundledproductssource.settings['selectMode'] = 'single';
}
showlmsbundledproductsFilter()
{
  setTimeout(() => {
  this.SetlmsbundledproductsTableddConfig();
  });
      if(this.tbllmsbundledproductssource.settings!=null)this.tbllmsbundledproductssource.settings['hideSubHeader'] =!this.tbllmsbundledproductssource.settings['hideSubHeader'];
this.tbllmsbundledproductssource.initGrid();
}
showlmsbundledproductsInActive()
{
}
enablelmsbundledproductsInActive()
{
}
async SetlmsbundledproductsTableddConfig()
{
if(!this.bfilterPopulatelmsbundledproducts){
}
this.bfilterPopulatelmsbundledproducts=true;
}
async lmsbundledproductsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsbundledproductsTableConfig()
{
this.lmsbundledproductssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
bundleproductid: {
title: 'Bundle Product',
type: '',
},
productid: {
title: 'Product',
type: '',
},
},
};
}
lmsbundledproductsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsbundledproductsID)>=0)
{
this.lmsbundledproductssource=new LocalDataSource();
this.lmsbundledproductssource.load(this.lmsproductmasterservice.lmsbundledproducts as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllmsbundledproductssource!=null)
{this.tbllmsbundledproductssource.grid.getRows().forEach((row:any) => {
if(row.data.bundleproductid!=null && row.data.bundleproductid!="")
{
this.lmsproductmasterservice.Insertlmsbundledproducts.push(row.data);
this.tbllmsbundledproductssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
lmsbundledproductsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsproductmasterservice.lmsbundledproducts.length == 0)
{
    this.tbllmsbundledproductssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsbundledproduct();
    this.lmsproductmasterservice.lmsbundledproducts.push(obj);
    this.lmsbundledproductssource.refresh();
    if ((this.lmsproductmasterservice.lmsbundledproducts.length / this.lmsbundledproductssource.getPaging().perPage).toFixed(0) + 1 != this.lmsbundledproductssource.getPaging().page)
    {
        this.lmsbundledproductssource.setPage((this.lmsproductmasterservice.lmsbundledproducts.length / this.lmsbundledproductssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsbundledproductssource.grid.edit(this.tbllmsbundledproductssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsbundledproductssource.data.indexOf(event.data);
this.onDeletelmsbundledproduct(event,event.data.bundleproductid,((this.lmsbundledproductssource.getPaging().page-1) *this.lmsbundledproductssource.getPaging().perPage)+index);
this.lmsbundledproductssource.refresh();
break;
}
}

*/
lmsbundledproductsPaging(val)
{
debugger;
this.lmsbundledproductssource.setPaging(1, val, true);
}

handlelmsbundledproductsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.bundleproductid==null || event.data.bundleproductid=="")
{
var obj={productid:this.formid }
this.lmsproductmasterservice.Insertlmsbundledproducts.push(obj as any);
}
else
{
var deletedids=this.DeletedlmsbundledproductIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.bundleproductid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.bundleproductid!=null && event.data.bundleproductid!="")this.DeletedlmsbundledproductIDs += event.data.bundleproductid + ","; 
}
}
IslmsbundledproductsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsbundledproductsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsbundledproducts

}



