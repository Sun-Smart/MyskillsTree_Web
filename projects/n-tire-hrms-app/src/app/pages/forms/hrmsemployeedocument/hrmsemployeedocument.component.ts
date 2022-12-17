import { hrmsemployeedocumentService } from './../../../service/hrmsemployeedocument.service';
import { hrmsemployeedocument } from './../../../model/hrmsemployeedocument.model';
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
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
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
selector: 'app-hrmsemployeedocument',
templateUrl: './hrmsemployeedocument.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeedocumentComponent implements OnInit {
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
bfilterPopulatehrmsemployeedocuments:boolean=false;
datahrmsemployeedocumentscategory3:any=[];
datahrmsemployeedocumentscountry3:any=[];
 hrmsemployeedocumentForm: FormGroup;
categoryList: boconfigvalue[];
countryList: bocountry[];
countryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
country_bocountriesForm: FormGroup;//autocomplete
country_bocountriesoptions:any;//autocomplete
country_bocountriesformatter:any;//autocomplete
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
hrmsemployeedocumentshowOption:boolean;
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
private hrmsemployeedocumentservice: hrmsemployeedocumentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
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
this.hrmsemployeedocumentForm  = this.fb.group({
pk:[null],
ImageName: [null],
employeeid: [null],
docid: [null],
category: [null],
categorydesc: [null],
country: [null],
countrydesc: [null],
referencenumber: [null],
issuedate: [null],
expirydate: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeedocumentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeedocumentForm.dirty && this.hrmsemployeedocumentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.docid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.docid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.docid && pkDetail) {
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
let hrmsemployeedocumentid = null;

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
this.formid=hrmsemployeedocumentid;
//this.sharedService.alert(hrmsemployeedocumentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("doccategory").then(res => this.categoryList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryList = res as bocountry[];
if(this.hrmsemployeedocumentservice.formData && this.hrmsemployeedocumentservice.formData.country){
this.countryoptionsEvent.emit(this.countryList);
this.hrmsemployeedocumentForm.patchValue({
    country: this.hrmsemployeedocumentservice.formData.country,
    countrydesc: this.hrmsemployeedocumentservice.formData.countrydesc,
});
}
{
let arrcountry = this.countryList.filter(v => v.countryid == this.hrmsemployeedocumentForm.get('country').value);
let objcountry;
if (arrcountry.length > 0) objcountry = arrcountry[0];
if (objcountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.country_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.country_bocountriesformatter = (result: any) => result.name;

//autocomplete
    this.hrmsemployeedocumentservice.gethrmsemployeedocumentsList().then(res => {
      this.pkList = res as hrmsemployeedocument[];
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
this.hrmsemployeedocumentForm.markAsUntouched();
this.hrmsemployeedocumentForm.markAsPristine();
}
onSelectedcountry(countryDetail: any) {
if (countryDetail.countryid && countryDetail) {
this.hrmsemployeedocumentForm.patchValue({
country: countryDetail.countryid,
countrydesc: countryDetail.name,

});

}
}




resetForm() {
if (this.hrmsemployeedocumentForm != null)
this.hrmsemployeedocumentForm.reset();
this.hrmsemployeedocumentForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let docid = this.hrmsemployeedocumentForm.get('docid').value;
        if(docid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeedocumentservice.deletehrmsemployeedocument(docid).then(res =>
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
    this.hrmsemployeedocumentForm.patchValue({
        docid: null
    });
    if(this.hrmsemployeedocumentservice.formData.docid!=null)this.hrmsemployeedocumentservice.formData.docid=null;
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
this.hrmsemployeedocumentForm.patchValue({"issuedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.hrmsemployeedocumentForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeedocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeedocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeedocumentForm.controls[key]!=undefined)
{
this.hrmsemployeedocumentForm.controls[key].disable({onlySelf: true});
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
employeeidonChange(evt:any){
let e=evt.value;
}
docidonChange(evt:any){
let e=evt.value;
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.hrmsemployeedocumentForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
countryonChange(evt:any){
let e=evt.value;
}
referencenumberonChange(evt:any){
let e=evt.value;
}
issuedateonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
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
  


edithrmsemployeedocuments() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeedocumentservice.gethrmsemployeedocumentsByEID(pkcol).then(res => {

this.hrmsemployeedocumentservice.formData=res.hrmsemployeedocument;
let formproperty=res.hrmsemployeedocument.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeedocument.pkcol;
this.formid=res.hrmsemployeedocument.docid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeedocument.docid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeedocumentForm.patchValue({
employeeid: res.hrmsemployeedocument.employeeid,
docid: res.hrmsemployeedocument.docid,
category: res.hrmsemployeedocument.category,
categorydesc: res.hrmsemployeedocument.categorydesc,
country: res.hrmsemployeedocument.country,
countrydesc: res.hrmsemployeedocument.countrydesc,
referencenumber: res.hrmsemployeedocument.referencenumber,
issuedate: this.ngbDateParserFormatter.parse(res.hrmsemployeedocument.issuedate),
expirydate: this.ngbDateParserFormatter.parse(res.hrmsemployeedocument.expirydate),
remarks: res.hrmsemployeedocument.remarks,
attachment: JSON.parse(res.hrmsemployeedocument.attachment),
status: res.hrmsemployeedocument.status,
statusdesc: res.hrmsemployeedocument.statusdesc,
});
if(this.hrmsemployeedocumentForm.get('attachment').value!=null && this.hrmsemployeedocumentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeedocumentForm.get('attachment').value);
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
  for (let key in this.hrmsemployeedocumentForm.controls) {
    if (this.hrmsemployeedocumentForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeedocumentservice.formData!=null && this.hrmsemployeedocumentservice.formData[key]!=null  && this.hrmsemployeedocumentservice.formData[key]!='[]' && this.hrmsemployeedocumentservice.formData[key]!=undefined && this.hrmsemployeedocumentservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeedocumentservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeedocumentservice.formData!=null && this.hrmsemployeedocumentservice.formData[key]!=null   && this.hrmsemployeedocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeedocumentservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeedocumentservice.formData!=null && this.hrmsemployeedocumentservice.formData[key]!=null   && this.hrmsemployeedocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeedocumentservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeedocumentservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeedocumentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeedocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeedocumentForm.value;
obj.issuedate=new Date(this.hrmsemployeedocumentForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedocumentForm.get('issuedate').value)+'  UTC' :null);
obj.expirydate=new Date(this.hrmsemployeedocumentForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedocumentForm.get('expirydate').value)+'  UTC' :null);
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

private hrmsemployeedocumenttoggleOption(){
this.hrmsemployeedocumentshowOption = this.hrmsemployeedocumentshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeedocumentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeedocumentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeedocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeedocumentservice.formData=this.hrmsemployeedocumentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeedocumentForm.controls[key] != null)
    {
        this.hrmsemployeedocumentservice.formData[key] = this.hrmsemployeedocumentForm.controls[key].value;
    }
}
}
}
this.hrmsemployeedocumentservice.formData.issuedate=new Date(this.hrmsemployeedocumentForm.get('issuedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedocumentForm.get('issuedate').value)+'  UTC' :null);
this.hrmsemployeedocumentservice.formData.expirydate=new Date(this.hrmsemployeedocumentForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedocumentForm.get('expirydate').value)+'  UTC' :null);
this.hrmsemployeedocumentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeedocumentservice.formData);
this.hrmsemployeedocumentservice.formData=this.hrmsemployeedocumentForm.value;
this.hrmsemployeedocumentservice.saveOrUpdatehrmsemployeedocuments().subscribe(
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
this.dialogRef.close((res as any).hrmsemployeedocument);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeedocumentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeedocument);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeedocumentForm.markAsUntouched();
this.hrmsemployeedocumentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.hrmsemployeedocumentForm.get('country').value, ScreenType:2 }
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



