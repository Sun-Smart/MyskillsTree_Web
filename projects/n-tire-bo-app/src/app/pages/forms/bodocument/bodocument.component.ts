import { bodocumentService } from './../../../service/bodocument.service';
import { bodocument } from './../../../model/bodocument.model';
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
import { bomasterdata} from './../../../model/bomasterdata.model';
import { bomasterdataService } from './../../../service/bomasterdata.service';
//popups
import { bosubcategorymaster} from './../../../model/bosubcategorymaster.model';
import { bosubcategorymasterService } from './../../../service/bosubcategorymaster.service';
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
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';

@Component({
selector: 'app-bodocument',
templateUrl: './bodocument.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodocumentComponent implements OnInit {
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
bfilterPopulatebodocuments:boolean=false;
databodocumentsdocumenttype3:any=[];
databodocumentscategory3:any=[];
databodocumentssubcategory3:any=[];
 bodocumentForm: FormGroup;
documenttypeList: boconfigvalue[];
categoryList: bomasterdata[];
subcategoryList: bosubcategorymaster[];
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






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bodocumentservice: bodocumentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.bodocumentForm  = this.fb.group({pk:[null],ImageName: [null],
documentid: [null],
sourcefield: [null],
sourcereference: [null],
referencetype: [null],
referenceid: [null],
documenttype: [null],
documenttypedesc: [null],
documentcode: [null],
versionnumber: [null],
documentname: [null],
category: [null],
categorydesc: [null],
subcategory: [null],
subcategorydesc: [null],
issuedate: [null],
expirydate: [null],
certified: [null],
certificatenumber: [null],
certifyingagency: [null],
renewcompulsary: [null],
reminder: [null],
attachment: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodocumentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodocumentForm.dirty && this.bodocumentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.documentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.documentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.documentid && pkDetail) {
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
let bodocumentid = null;

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
this.formid=bodocumentid;
//this.sharedService.alert(bodocumentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("documenttype").then(res => this.documenttypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("yy7ma").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
if(this.bodocumentservice.formData && this.bodocumentservice.formData.subcategory){this.bodocumentForm.patchValue({
    subcategory: this.bodocumentservice.formData.subcategory,
    subcategorydesc: this.bodocumentservice.formData.subcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});

//autocomplete
    this.bodocumentservice.getbodocumentsList().then(res => {
      this.pkList = res as bodocument[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.documentname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.documentname;

//setting the flag that the screen is not touched 
this.bodocumentForm.markAsUntouched();
this.bodocumentForm.markAsPristine();
}



resetForm() {
if (this.bodocumentForm != null)
this.bodocumentForm.reset();
this.bodocumentForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.bodocumentForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let documentid = this.bodocumentForm.get('documentid').value;
        if(documentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodocumentservice.deletebodocument(documentid).then(res =>
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
    this.bodocumentForm.patchValue({
        documentid: null
    });
    if(this.bodocumentservice.formData.documentid!=null)this.bodocumentservice.formData.documentid=null;
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
        else if(key=="issuedate")
this.bodocumentForm.patchValue({"issuedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.bodocumentForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.bodocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodocumentForm.controls[key]!=undefined)this.bodocumentForm.controls[key].disable({onlySelf: true});
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
documenttypeonChange(evt:any){
let e=this.f.documenttype.value as any;
this.bodocumentForm.patchValue({documenttypedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=evt.value;
this.bodocumentForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res => this.subcategoryList = res as bosubcategorymaster[]);
});
}
subcategoryonChange(evt:any){
let e=evt.value;
this.bodocumentForm.patchValue({subcategorydesc:evt.options[evt.options.selectedIndex].text});
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
  


async PopulateScreen(pkcol:any){
this.bodocumentservice.getbodocumentsByEID(pkcol).then(res => {

this.bodocumentservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodocument.documentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodocument.documentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodocumentForm.patchValue({
documentid: res.bodocument.documentid,
sourcefield: res.bodocument.sourcefield,
sourcereference: res.bodocument.sourcereference,
referencetype: res.bodocument.referencetype,
referenceid: res.bodocument.referenceid,
documenttype: res.bodocument.documenttype,
documenttypedesc: res.bodocument.documenttypedesc,
documentcode: res.bodocument.documentcode,
versionnumber: res.bodocument.versionnumber,
documentname: res.bodocument.documentname,
category: res.bodocument.category,
categorydesc: res.bodocument.categorydesc,
subcategory: res.bodocument.subcategory,
subcategorydesc: res.bodocument.subcategorydesc,
issuedate: this.ngbDateParserFormatter.parse(res.bodocument.issuedate),
expirydate: this.ngbDateParserFormatter.parse(res.bodocument.expirydate),
certified: res.bodocument.certified,
certificatenumber: res.bodocument.certificatenumber,
certifyingagency: res.bodocument.certifyingagency,
renewcompulsary: res.bodocument.renewcompulsary,
reminder: res.bodocument.reminder,
attachment: res.bodocument.attachment,
remarks: res.bodocument.remarks,
status: res.bodocument.status,
statusdesc: res.bodocument.statusdesc,
});
if(this.bodocumentForm.get('attachment').value!=null && this.bodocumentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.bodocumentForm.get('attachment').value));
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
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
  for (let key in this.bodocumentForm.controls) {
    if (this.bodocumentForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodocumentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodocumentForm.value;
obj.issuedate=new Date(this.bodocumentForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.bodocumentForm.get('issuedate').value)+'  UTC' :null);
obj.expirydate=new Date(this.bodocumentForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.bodocumentForm.get('expirydate').value)+'  UTC' :null);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bodocumentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodocumentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodocumentservice.formData=this.bodocumentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodocumentForm.controls[key] != null)
    {
        this.bodocumentservice.formData[key] = this.bodocumentForm.controls[key].value;
    }
}
}
}
this.bodocumentservice.formData.issuedate=new Date(this.bodocumentForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.bodocumentForm.get('issuedate').value)+'  UTC' :null);
this.bodocumentservice.formData.expirydate=new Date(this.bodocumentForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.bodocumentForm.get('expirydate').value)+'  UTC' :null);
this.bodocumentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bodocumentservice.formData);
this.bodocumentservice.formData=this.bodocumentForm.value;
this.bodocumentservice.saveOrUpdatebodocuments().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodocument);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodocumentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodocument);
}
else
{
this.FillData(res);
}
}
this.bodocumentForm.markAsUntouched();
this.bodocumentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.bodocumentForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.bodocumentForm.get('subcategory').value, ScreenType:2 }
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



