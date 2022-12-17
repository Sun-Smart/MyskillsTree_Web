import { itassetService } from './../../../service/itasset.service';
import { itasset } from './../../../model/itasset.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

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
import { itassetmobiledetail } from './../../../model/itassetmobiledetail.model';
//FK services
import { itassetconfigdetail } from './../../../model/itassetconfigdetail.model';
//FK services
import { itassetnetworkdetail } from './../../../model/itassetnetworkdetail.model';
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

@Component({
selector: 'app-itasset',
templateUrl: './itasset.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class itassetComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulateitassets:boolean=false;
dataitassetsassetstatus3:any=[];
bfilterPopulateitassetmobiledetails:boolean=false;
dataitassetconfigdetailsvmtype3:any=[];
dataitassetconfigdetailsvmplatform3:any=[];
dataitassetconfigdetailsvmhost3:any=[];
dataitassetconfigdetailskeyboardtype3:any=[];
dataitassetconfigdetailsmousetype3:any=[];
dataitassetconfigdetailsmonitortype3:any=[];
bfilterPopulateitassetconfigdetails:boolean=false;
dataitassetnetworkdetailstype3:any=[];
bfilterPopulateitassetnetworkdetails:boolean=false;
@ViewChild('tblitassetmobiledetailssource',{static:false}) tblitassetmobiledetailssource: Ng2SmartTableComponent;
@ViewChild('tblitassetconfigdetailssource',{static:false}) tblitassetconfigdetailssource: Ng2SmartTableComponent;
@ViewChild('tblitassetnetworkdetailssource',{static:false}) tblitassetnetworkdetailssource: Ng2SmartTableComponent;
 itassetForm: FormGroup;
assetstatusList: boconfigvalue[]=[];//dropdown
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
sessiondata:any;



itassetmobiledetailsvisiblelist:any;
itassetmobiledetailshidelist:any;
itassetconfigdetailsvisiblelist:any;
itassetconfigdetailshidelist:any;
itassetnetworkdetailsvisiblelist:any;
itassetnetworkdetailshidelist:any;

DeleteditassetmobiledetailIDs: string="";
itassetmobiledetailsID: string = "1";
itassetmobiledetailsselectedindex:any;
DeleteditassetconfigdetailIDs: string="";
itassetconfigdetailsID: string = "2";
itassetconfigdetailsselectedindex:any;
DeleteditassetnetworkdetailIDs: string="";
itassetnetworkdetailsID: string = "3";
itassetnetworkdetailsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private itassetservice: itassetService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.itassetForm  = this.fb.group({pk:[null],ImageName: [null],
assetid: [null],
assetcode: [null],
assetname: [null],
supplierid: [null],
productid: [null],
purchasecost: [null],
tags: [null],
acquisitiondate: [null],
serialnumber: [null],
expirydate: [null],
barcode: [null],
warrantyexpirydate: [null],
locationid: [null],
assetstatus: [null],
assetstatusdesc: [null],
comments: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.itassetForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.itassetForm.dirty && this.itassetForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.assetid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.assetid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.assetid && pkDetail) {
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
let itassetid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=itassetid;
//this.sharedService.alert(itassetid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetitassetmobiledetailsTableConfig();
  setTimeout(() => {
  this.SetitassetmobiledetailsTableddConfig();
  });

this.SetitassetconfigdetailsTableConfig();
  setTimeout(() => {
  this.SetitassetconfigdetailsTableddConfig();
  });

this.SetitassetnetworkdetailsTableConfig();
  setTimeout(() => {
  this.SetitassetnetworkdetailsTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("assetstatus").then((res:any) => this.assetstatusList = res as boconfigvalue[]);

//autocomplete
    this.itassetservice.getitassetsList().then((res:any) => {
      this.pkList = res as itasset[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.itassetForm.markAsUntouched();
this.itassetForm.markAsPristine();
}



resetForm() {
if (this.itassetForm != null)
this.itassetForm.reset();
this.itassetForm.patchValue({
});
setTimeout(() => {
this.itassetservice.itassetmobiledetails=[];
this.itassetmobiledetailsLoadTable();
this.itassetservice.itassetconfigdetails=[];
this.itassetconfigdetailsLoadTable();
this.itassetservice.itassetnetworkdetails=[];
this.itassetnetworkdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let assetid = this.itassetForm.get('assetid')!.value;
        if(assetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.itassetservice.deleteitasset(assetid).then((res:any) =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.itassetForm.patchValue({
        assetid: null
    });
    if(this.itassetservice.formData.assetid!=null)this.itassetservice.formData.assetid=null;
for (let i=0;i<this.itassetservice.itassetmobiledetails.length;i++) {
this.itassetservice.itassetmobiledetails[i].detailid=null;
}
for (let i=0;i<this.itassetservice.itassetconfigdetails.length;i++) {
this.itassetservice.itassetconfigdetails[i].configid=null;
}
for (let i=0;i<this.itassetservice.itassetnetworkdetails.length;i++) {
this.itassetservice.itassetnetworkdetails[i].networkid=null;
}
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        else if(key=="acquisitiondate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="expirydate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="warrantyexpirydate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="comments")
        json='{"'+key+'": '+mainscreendata[key] +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.itassetForm.controls[key]!=null)
{
this.itassetForm.patchValue(json);
         if(bdisable)this.itassetForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
assetstatusonChange(evt:any){
let e=this.f.assetstatus!.value as any;
this.itassetForm.patchValue({assetstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


async PopulateScreen(pkcol:any){this.itassetservice.getitassetsByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.itasset.assetid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.itasset.assetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.itassetForm.patchValue({
assetid: res.itasset.assetid,
assetcode: res.itasset.assetcode,
assetname: res.itasset.assetname,
supplierid: res.itasset.supplierid,
productid: res.itasset.productid,
purchasecost: res.itasset.purchasecost,
tags: res.itasset.tags,
acquisitiondate: this.ngbDateParserFormatter.parse(res.itasset.acquisitiondate),
serialnumber: res.itasset.serialnumber,
expirydate: this.ngbDateParserFormatter.parse(res.itasset.expirydate),
barcode: res.itasset.barcode,
warrantyexpirydate: this.ngbDateParserFormatter.parse(res.itasset.warrantyexpirydate),
locationid: res.itasset.locationid,
assetstatus: res.itasset.assetstatus,
assetstatusdesc: res.itasset.assetstatusdesc,
comments: JSON.parse(res.itasset.comments),
attachment: res.itasset.attachment,
status: res.itasset.status,
statusdesc: res.itasset.statusdesc,
});
this.itassetmobiledetailsvisiblelist=res.itassetmobiledetailsvisiblelist;
this.itassetconfigdetailsvisiblelist=res.itassetconfigdetailsvisiblelist;
this.itassetnetworkdetailsvisiblelist=res.itassetnetworkdetailsvisiblelist;
if(this.itassetForm.get('attachment')!.value!=null && this.itassetForm.get('attachment')!.value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.itassetForm.get('attachment')!.value));
//Child Tables if any
this.itassetservice.itassetmobiledetails = res.itassetmobiledetail;
this.SetitassetmobiledetailsTableConfig();
this.itassetmobiledetailsLoadTable();
  setTimeout(() => {
  this.SetitassetmobiledetailsTableddConfig();
  });
this.itassetservice.itassetconfigdetails = res.itassetconfigdetail;
this.SetitassetconfigdetailsTableConfig();
this.itassetconfigdetailsLoadTable();
  setTimeout(() => {
  this.SetitassetconfigdetailsTableddConfig();
  });
this.itassetservice.itassetnetworkdetails = res.itassetnetworkdetail;
this.SetitassetnetworkdetailsTableConfig();
this.itassetnetworkdetailsLoadTable();
  setTimeout(() => {
  this.SetitassetnetworkdetailsTableddConfig();
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
  for (let key in this.itassetForm.controls) {
    if (this.itassetForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.itassetForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.itassetForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.itassetForm!.value;
obj.acquisitiondate=this.ngbDateParserFormatter.format(this.itassetForm.get('acquisitiondate')!.value);
obj.expirydate=this.ngbDateParserFormatter.format(this.itassetForm.get('expirydate')!.value);
obj.warrantyexpirydate=this.ngbDateParserFormatter.format(this.itassetForm.get('warrantyexpirydate')!.value);
obj.comments=JSON.stringify(this.itassetForm.get('comments')!.value);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
this.dialogRef.close(obj);
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
Object.keys(this.itassetForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.itassetForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.itassetForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.itassetservice.formData=this.itassetForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.itassetForm.controls[key] != null)
    {
        this.itassetservice.formData[key] = this.itassetForm.controls[key]!.value;
    }
}
}
}
this.itassetservice.formData.acquisitiondate=new Date(this.ngbDateParserFormatter.format(this.itassetForm.get('acquisitiondate')!.value)+'  UTC');
this.itassetservice.formData.expirydate=new Date(this.ngbDateParserFormatter.format(this.itassetForm.get('expirydate')!.value)+'  UTC');
this.itassetservice.formData.warrantyexpirydate=new Date(this.ngbDateParserFormatter.format(this.itassetForm.get('warrantyexpirydate')!.value)+'  UTC');
this.itassetservice.formData.comments=JSON.stringify(this.itassetForm.get('comments')!.value);
this.itassetservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.itassetservice.formData.DeleteditassetmobiledetailIDs = this.DeleteditassetmobiledetailIDs;
this.itassetservice.formData.DeleteditassetconfigdetailIDs = this.DeleteditassetconfigdetailIDs;
this.itassetservice.formData.DeleteditassetnetworkdetailIDs = this.DeleteditassetnetworkdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.itassetservice.formData);
this.itassetservice.saveOrUpdateitassets().subscribe(
async (res:any) => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.itassetmobiledetailssource.data)
{
    for (let i = 0; i < this.itassetmobiledetailssource.data.length; i++)
    {
        if (this.itassetmobiledetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.itassetmobiledetailssource.data[i].fileattachmentlist);
    }
}
if (this.itassetconfigdetailssource.data)
{
    for (let i = 0; i < this.itassetconfigdetailssource.data.length; i++)
    {
        if (this.itassetconfigdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.itassetconfigdetailssource.data[i].fileattachmentlist);
    }
}
if (this.itassetnetworkdetailssource.data)
{
    for (let i = 0; i < this.itassetnetworkdetailssource.data.length; i++)
    {
        if (this.itassetnetworkdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.itassetnetworkdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result!.value.itasset);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.itassetservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result!.value.itasset);
}
else
{
this.FillData((res as any).result!.value);
}
}
this.itassetForm.markAsUntouched();
this.itassetForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeleteitassetmobiledetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteditassetmobiledetailIDs += childID + ",";
this.itassetservice.itassetmobiledetails.splice(i, 1);
}

onDeleteitassetconfigdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteditassetconfigdetailIDs += childID + ",";
this.itassetservice.itassetconfigdetails.splice(i, 1);
}

onDeleteitassetnetworkdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteditassetnetworkdetailIDs += childID + ",";
this.itassetservice.itassetnetworkdetails.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes itassetmobiledetails
itassetmobiledetailssettings:any;
itassetmobiledetailssource: any;

showitassetmobiledetailsCheckbox()
{
debugger;
if(this.tblitassetmobiledetailssource.settings['selectMode']== 'multi')this.tblitassetmobiledetailssource.settings['selectMode']= 'single';
else
this.tblitassetmobiledetailssource.settings['selectMode']= 'multi';
this.tblitassetmobiledetailssource.initGrid();
}
deleteitassetmobiledetailsAll()
{
this.tblitassetmobiledetailssource.settings['selectMode'] = 'single';
}
showitassetmobiledetailsFilter()
{
  setTimeout(() => {
  this.SetitassetmobiledetailsTableddConfig();
  });
      if(this.tblitassetmobiledetailssource.settings!=null)this.tblitassetmobiledetailssource.settings['hideSubHeader'] =!this.tblitassetmobiledetailssource.settings['hideSubHeader'];
this.tblitassetmobiledetailssource.initGrid();
}
showitassetmobiledetailsInActive()
{
}
enableitassetmobiledetailsInActive()
{
}
async SetitassetmobiledetailsTableddConfig()
{
if(!this.bfilterPopulateitassetmobiledetails){
}
this.bfilterPopulateitassetmobiledetails=true;
}
async itassetmobiledetailsbeforesave(event){
event.confirm.resolve(event.newData);



}
SetitassetmobiledetailsTableConfig()
{
this.itassetmobiledetailssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
imei: {
title: 'I M E I',
type: '',
filter:true,
},
product: {
title: 'Product',
type: 'number',
filter:true,
},
totalcapacity: {
title: 'Total Capacity',
type: 'number',
filter:true,
},
model: {
title: 'Model',
type: '',
filter:true,
},
availablecapacity: {
title: 'Available Capacity',
type: 'number',
filter:true,
},
modelnumber: {
title: 'Model Number',
type: '',
filter:true,
},
modemfirmwareversion: {
title: 'Modem Firmware Version',
type: '',
filter:true,
},
platform: {
title: 'Platform',
type: '',
filter:true,
},
buildversion: {
title: 'Build Version',
type: '',
filter:true,
},
osname: {
title: 'O S Name',
type: '',
filter:true,
},
osversion: {
title: 'O S Version',
type: '',
filter:true,
},
},
};
}
itassetmobiledetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetmobiledetailsID)>=0)
{
this.itassetmobiledetailssource=new LocalDataSource();
this.itassetmobiledetailssource.load(this.itassetservice.itassetmobiledetails as  any as LocalDataSource);
this.itassetmobiledetailssource.setPaging(1, 20, true);
}
}
itassetmobiledetailsroute(event,action) {
switch ( action) {
case 'create':
if (this.itassetservice.itassetmobiledetails.length == 0)
{
    this.tblitassetmobiledetailssource.grid.createFormShown = true;
}
else
{
    let obj = new itassetmobiledetail();
    this.itassetservice.itassetmobiledetails.push(obj);
    this.itassetmobiledetailssource.refresh();
    if ((this.itassetservice.itassetmobiledetails.length / this.itassetmobiledetailssource.getPaging().perPage).toFixed(0) + 1 != this.itassetmobiledetailssource.getPaging().page)
    {
        this.itassetmobiledetailssource.setPage((this.itassetservice.itassetmobiledetails.length / this.itassetmobiledetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblitassetmobiledetailssource.grid.edit(this.tblitassetmobiledetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.itassetmobiledetailssource.data.indexOf(event.data);
this.onDeleteitassetmobiledetail(event,event.data.detailid,((this.itassetmobiledetailssource.getPaging().page-1) *this.itassetmobiledetailssource.getPaging().perPage)+index);
this.itassetmobiledetailssource.refresh();
break;
}
}
itassetmobiledetailsPaging(val)
{
debugger;
this.itassetmobiledetailssource.setPaging(1, val, true);
}

handleitassetmobiledetailsGridSelected(event) {
this.itassetmobiledetailsselectedindex=this.itassetservice.itassetmobiledetails.findIndex(i => i.detailid === event.data.detailid);
}
IsitassetmobiledetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetmobiledetailsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes itassetmobiledetails
//start of Grid Codes itassetconfigdetails
itassetconfigdetailssettings:any;
itassetconfigdetailssource: any;

showitassetconfigdetailsCheckbox()
{
debugger;
if(this.tblitassetconfigdetailssource.settings['selectMode']== 'multi')this.tblitassetconfigdetailssource.settings['selectMode']= 'single';
else
this.tblitassetconfigdetailssource.settings['selectMode']= 'multi';
this.tblitassetconfigdetailssource.initGrid();
}
deleteitassetconfigdetailsAll()
{
this.tblitassetconfigdetailssource.settings['selectMode'] = 'single';
}
showitassetconfigdetailsFilter()
{
  setTimeout(() => {
  this.SetitassetconfigdetailsTableddConfig();
  });
      if(this.tblitassetconfigdetailssource.settings!=null)this.tblitassetconfigdetailssource.settings['hideSubHeader'] =!this.tblitassetconfigdetailssource.settings['hideSubHeader'];
this.tblitassetconfigdetailssource.initGrid();
}
showitassetconfigdetailsInActive()
{
}
enableitassetconfigdetailsInActive()
{
}
async SetitassetconfigdetailsTableddConfig()
{
if(!this.bfilterPopulateitassetconfigdetails){

this.configservice.getList("vmtype").then(res=>
{
var datavmtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailsvmtype3.push(defaultobj);
for(let i=0; i<datavmtype2.length; i++){
var obj= { value: datavmtype2[i].configkey, title: datavmtype2[i].configtext};
this.dataitassetconfigdetailsvmtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['vmtype']!=undefined)clone.columns['vmtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmtype3)), }, };
if(clone.columns['vmtype']!=undefined)clone.columns['vmtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmtype3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});

this.configservice.getList("vmplatform").then(res=>
{
var datavmplatform2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailsvmplatform3.push(defaultobj);
for(let i=0; i<datavmplatform2.length; i++){
var obj= { value: datavmplatform2[i].configkey, title: datavmplatform2[i].configtext};
this.dataitassetconfigdetailsvmplatform3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['vmplatform']!=undefined)clone.columns['vmplatform'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmplatform3)), }, };
if(clone.columns['vmplatform']!=undefined)clone.columns['vmplatform'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmplatform3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});

this.configservice.getList("vmhost").then(res=>
{
var datavmhost2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailsvmhost3.push(defaultobj);
for(let i=0; i<datavmhost2.length; i++){
var obj= { value: datavmhost2[i].configkey, title: datavmhost2[i].configtext};
this.dataitassetconfigdetailsvmhost3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['vmhost']!=undefined)clone.columns['vmhost'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmhost3)), }, };
if(clone.columns['vmhost']!=undefined)clone.columns['vmhost'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsvmhost3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});

this.configservice.getList("keyboardtype").then(res=>
{
var datakeyboardtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailskeyboardtype3.push(defaultobj);
for(let i=0; i<datakeyboardtype2.length; i++){
var obj= { value: datakeyboardtype2[i].configkey, title: datakeyboardtype2[i].configtext};
this.dataitassetconfigdetailskeyboardtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['keyboardtype']!=undefined)clone.columns['keyboardtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailskeyboardtype3)), }, };
if(clone.columns['keyboardtype']!=undefined)clone.columns['keyboardtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailskeyboardtype3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});

this.configservice.getList("mousetype").then(res=>
{
var datamousetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailsmousetype3.push(defaultobj);
for(let i=0; i<datamousetype2.length; i++){
var obj= { value: datamousetype2[i].configkey, title: datamousetype2[i].configtext};
this.dataitassetconfigdetailsmousetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['mousetype']!=undefined)clone.columns['mousetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsmousetype3)), }, };
if(clone.columns['mousetype']!=undefined)clone.columns['mousetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsmousetype3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});

this.configservice.getList("monitortype").then(res=>
{
var datamonitortype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetconfigdetailsmonitortype3.push(defaultobj);
for(let i=0; i<datamonitortype2.length; i++){
var obj= { value: datamonitortype2[i].configkey, title: datamonitortype2[i].configtext};
this.dataitassetconfigdetailsmonitortype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetconfigdetailssource.settings);
if(clone.columns['monitortype']!=undefined)clone.columns['monitortype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsmonitortype3)), }, };
if(clone.columns['monitortype']!=undefined)clone.columns['monitortype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetconfigdetailsmonitortype3)), }, };
this.tblitassetconfigdetailssource.settings =  clone;
this.tblitassetconfigdetailssource.initGrid();
});
}
this.bfilterPopulateitassetconfigdetails=true;
}
async itassetconfigdetailsbeforesave(event){
event.confirm.resolve(event.newData);



}
SetitassetconfigdetailsTableConfig()
{
this.itassetconfigdetailssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
model: {
title: 'Model',
type: '',
filter:true,
},
manufacturer: {
title: 'Manufacturer',
type: '',
filter:true,
},
vmtype: {
title: 'V M Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailsvmtype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
vmplatform: {
title: 'V M Platform',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailsvmplatform3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
vmhost: {
title: 'V M Host',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailsvmhost3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
operatingsystem: {
title: 'Operating System',
type: '',
filter:true,
},
servicepack: {
title: 'Service Pack',
type: '',
filter:true,
},
memory: {
title: 'Memory',
type: '',
filter:true,
},
ram: {
title: 'R A M',
type: '',
filter:true,
},
virtualmemory: {
title: 'Virtual Memory',
type: '',
filter:true,
},
processor: {
title: 'Processor',
type: '',
filter:true,
},
processormanufacturer: {
title: 'Processor Manufacturer',
type: '',
filter:true,
},
clockspeed: {
title: 'Clock Speed',
type: '',
filter:true,
},
cores: {
title: 'Cores',
type: '',
filter:true,
},
harddiskmodel: {
title: 'Harddisk Model',
type: '',
filter:true,
},
serialnumber: {
title: 'Serial Number',
type: '',
filter:true,
},
harddiskmanufacturer: {
title: 'Hard Disk Manufacturer',
type: '',
filter:true,
},
harddiskcapacity: {
title: 'Hard Disk Capacity',
type: '',
filter:true,
},
keyboardtype: {
title: 'Keyboard Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailskeyboardtype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
keyboardmanufacturer: {
title: 'Keyboard Manufacturer',
type: '',
filter:true,
},
mousetype: {
title: 'Mouse Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailsmousetype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
mousemanufacturer: {
title: 'Mouse Manufacturer',
type: '',
filter:true,
},
monitortype: {
title: 'Monitor Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetconfigdetailsmonitortype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
monitorserialnumber: {
title: 'Monitor Serial Number',
type: '',
filter:true,
},
monitormanufacturer: {
title: 'Monitor Manufacturer',
type: '',
filter:true,
},
monitorresolution: {
title: 'Monitor Resolution',
type: '',
filter:true,
},
},
};
}
itassetconfigdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetconfigdetailsID)>=0)
{
this.itassetconfigdetailssource=new LocalDataSource();
this.itassetconfigdetailssource.load(this.itassetservice.itassetconfigdetails as  any as LocalDataSource);
this.itassetconfigdetailssource.setPaging(1, 20, true);
}
}
itassetconfigdetailsroute(event,action) {
switch ( action) {
case 'create':
if (this.itassetservice.itassetconfigdetails.length == 0)
{
    this.tblitassetconfigdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new itassetconfigdetail();
    this.itassetservice.itassetconfigdetails.push(obj);
    this.itassetconfigdetailssource.refresh();
    if ((this.itassetservice.itassetconfigdetails.length / this.itassetconfigdetailssource.getPaging().perPage).toFixed(0) + 1 != this.itassetconfigdetailssource.getPaging().page)
    {
        this.itassetconfigdetailssource.setPage((this.itassetservice.itassetconfigdetails.length / this.itassetconfigdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblitassetconfigdetailssource.grid.edit(this.tblitassetconfigdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.itassetconfigdetailssource.data.indexOf(event.data);
this.onDeleteitassetconfigdetail(event,event.data.configid,((this.itassetconfigdetailssource.getPaging().page-1) *this.itassetconfigdetailssource.getPaging().perPage)+index);
this.itassetconfigdetailssource.refresh();
break;
}
}
itassetconfigdetailsPaging(val)
{
debugger;
this.itassetconfigdetailssource.setPaging(1, val, true);
}

handleitassetconfigdetailsGridSelected(event) {
this.itassetconfigdetailsselectedindex=this.itassetservice.itassetconfigdetails.findIndex(i => i.configid === event.data.configid);
}
IsitassetconfigdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetconfigdetailsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes itassetconfigdetails
//start of Grid Codes itassetnetworkdetails
itassetnetworkdetailssettings:any;
itassetnetworkdetailssource: any;

showitassetnetworkdetailsCheckbox()
{
debugger;
if(this.tblitassetnetworkdetailssource.settings['selectMode']== 'multi')this.tblitassetnetworkdetailssource.settings['selectMode']= 'single';
else
this.tblitassetnetworkdetailssource.settings['selectMode']= 'multi';
this.tblitassetnetworkdetailssource.initGrid();
}
deleteitassetnetworkdetailsAll()
{
this.tblitassetnetworkdetailssource.settings['selectMode'] = 'single';
}
showitassetnetworkdetailsFilter()
{
  setTimeout(() => {
  this.SetitassetnetworkdetailsTableddConfig();
  });
      if(this.tblitassetnetworkdetailssource.settings!=null)this.tblitassetnetworkdetailssource.settings['hideSubHeader'] =!this.tblitassetnetworkdetailssource.settings['hideSubHeader'];
this.tblitassetnetworkdetailssource.initGrid();
}
showitassetnetworkdetailsInActive()
{
}
enableitassetnetworkdetailsInActive()
{
}
async SetitassetnetworkdetailsTableddConfig()
{
if(!this.bfilterPopulateitassetnetworkdetails){

this.configservice.getList("networktype").then(res=>
{
var datatype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitassetnetworkdetailstype3.push(defaultobj);
for(let i=0; i<datatype2.length; i++){
var obj= { value: datatype2[i].configkey, title: datatype2[i].configtext};
this.dataitassetnetworkdetailstype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitassetnetworkdetailssource.settings);
if(clone.columns['type']!=undefined)clone.columns['type'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetnetworkdetailstype3)), }, };
if(clone.columns['type']!=undefined)clone.columns['type'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitassetnetworkdetailstype3)), }, };
this.tblitassetnetworkdetailssource.settings =  clone;
this.tblitassetnetworkdetailssource.initGrid();
});
}
this.bfilterPopulateitassetnetworkdetails=true;
}
async itassetnetworkdetailsbeforesave(event){
event.confirm.resolve(event.newData);



}
SetitassetnetworkdetailsTableConfig()
{
this.itassetnetworkdetailssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
ipaddress: {
title: 'I P Address',
type: '',
filter:true,
},
macaddress: {
title: 'M A C Address',
type: '',
filter:true,
},
nic: {
title: 'N I C',
type: '',
filter:true,
},
network: {
title: 'Network',
type: '',
filter:true,
},
defaultgateway: {
title: 'Default Gateway',
type: '',
filter:true,
},
dhcpenabled: {
title: 'D H C P Enabled',
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
dhcpserver: {
title: 'D H C P Server',
type: '',
filter:true,
},
type: {
title: 'Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitassetnetworkdetailstype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
itassetnetworkdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetnetworkdetailsID)>=0)
{
this.itassetnetworkdetailssource=new LocalDataSource();
this.itassetnetworkdetailssource.load(this.itassetservice.itassetnetworkdetails as  any as LocalDataSource);
this.itassetnetworkdetailssource.setPaging(1, 20, true);
}
}
itassetnetworkdetailsroute(event,action) {
switch ( action) {
case 'create':
if (this.itassetservice.itassetnetworkdetails.length == 0)
{
    this.tblitassetnetworkdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new itassetnetworkdetail();
    this.itassetservice.itassetnetworkdetails.push(obj);
    this.itassetnetworkdetailssource.refresh();
    if ((this.itassetservice.itassetnetworkdetails.length / this.itassetnetworkdetailssource.getPaging().perPage).toFixed(0) + 1 != this.itassetnetworkdetailssource.getPaging().page)
    {
        this.itassetnetworkdetailssource.setPage((this.itassetservice.itassetnetworkdetails.length / this.itassetnetworkdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblitassetnetworkdetailssource.grid.edit(this.tblitassetnetworkdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.itassetnetworkdetailssource.data.indexOf(event.data);
this.onDeleteitassetnetworkdetail(event,event.data.networkid,((this.itassetnetworkdetailssource.getPaging().page-1) *this.itassetnetworkdetailssource.getPaging().perPage)+index);
this.itassetnetworkdetailssource.refresh();
break;
}
}
itassetnetworkdetailsPaging(val)
{
debugger;
this.itassetnetworkdetailssource.setPaging(1, val, true);
}

handleitassetnetworkdetailsGridSelected(event) {
this.itassetnetworkdetailsselectedindex=this.itassetservice.itassetnetworkdetails.findIndex(i => i.networkid === event.data.networkid);
}
IsitassetnetworkdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itassetnetworkdetailsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes itassetnetworkdetails

}



