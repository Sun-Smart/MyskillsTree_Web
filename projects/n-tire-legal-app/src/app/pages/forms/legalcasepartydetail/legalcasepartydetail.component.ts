import { legalcasepartydetailService } from './../../../service/legalcasepartydetail.service';
import { legalcasepartydetail } from './../../../model/legalcasepartydetail.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-legalcasepartydetail',
templateUrl: './legalcasepartydetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcasepartydetailComponent implements OnInit {
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
bfilterPopulatelegalcasepartydetails:boolean=false;
datalegalcasepartydetailspartytype3:any=[];
datalegalcasepartydetailsposition3:any=[];
datalegalcasepartydetailsgender3:any=[];
 legalcasepartydetailForm: FormGroup;
partytypeList: bomasterdata[];
positionList: boconfigvalue[];
genderList: boconfigvalue[];
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
legalcasepartydetailshowOption:boolean;
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
private legalcasepartydetailservice: legalcasepartydetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
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
this.legalcasepartydetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
caseid: [null],
partyid: [null],
partytype: [null, Validators.required],
partytypedesc: [null],
partyname: [null, Validators.required],
position: [null],
positiondesc: [null],
gender: [null],
genderdesc: [null],
mobilenumber: [null],
emailid: [null],
dateofbirth: [null],
address1: [null],
address2: [null],
city: [null],
contactperson: [null],
cpmobilenumber: [null],
cpemail: [null],
rating: [null],
comments: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcasepartydetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcasepartydetailForm.dirty && this.legalcasepartydetailForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
partytypeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.partytype.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].partyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Party Type value exists in the database.Do you want to display the record ? "))
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
emailidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].partyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Email value exists in the database.Do you want to display the record ? "))
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
mobilenumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].partyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Mobile Number value exists in the database.Do you want to display the record ? "))
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
partynameexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.partyname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].partyid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Party Name value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.partyid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.partyid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.partyid && pkDetail) {
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
let legalcasepartydetailid = null;

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
this.formid=legalcasepartydetailid;
//this.sharedService.alert(legalcasepartydetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("ozck3").then(res => {
this.partytypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("legalposition").then(res => this.positionList = res as boconfigvalue[]);
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);

//autocomplete
    this.legalcasepartydetailservice.getlegalcasepartydetailsList().then(res => {
      this.pkList = res as legalcasepartydetail[];
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
this.legalcasepartydetailForm.markAsUntouched();
this.legalcasepartydetailForm.markAsPristine();
}



resetForm() {
if (this.legalcasepartydetailForm != null)
this.legalcasepartydetailForm.reset();
this.legalcasepartydetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let partyid = this.legalcasepartydetailForm.get('partyid').value;
        if(partyid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcasepartydetailservice.deletelegalcasepartydetail(partyid).then(res =>
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
    this.legalcasepartydetailForm.patchValue({
        partyid: null
    });
    if(this.legalcasepartydetailservice.formData.partyid!=null)this.legalcasepartydetailservice.formData.partyid=null;
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
        else if(key=="dateofbirth")
this.legalcasepartydetailForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="comments")
this.legalcasepartydetailForm.patchValue({"comments":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.legalcasepartydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcasepartydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcasepartydetailForm.controls[key]!=undefined)
{
this.legalcasepartydetailForm.controls[key].disable({onlySelf: true});
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
partytypeonChange(evt:any){
let e=evt.value;
this.legalcasepartydetailForm.patchValue({partytypedesc:evt.options[evt.options.selectedIndex].text});
}
positiononChange(evt:any){
let e=this.f.position.value as any;
this.legalcasepartydetailForm.patchValue({positiondesc:evt.options[evt.options.selectedIndex].text});
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.legalcasepartydetailForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlegalcasepartydetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcasepartydetailservice.getlegalcasepartydetailsByEID(pkcol).then(res => {

this.legalcasepartydetailservice.formData=res.legalcasepartydetail;
let formproperty=res.legalcasepartydetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcasepartydetail.pkcol;
this.formid=res.legalcasepartydetail.partyid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcasepartydetailservice.formData=res.legalcasepartydetail;
this.formid=res.legalcasepartydetail.partyid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcasepartydetailForm.patchValue({
caseid: res.legalcasepartydetail.caseid,
partyid: res.legalcasepartydetail.partyid,
partytype: res.legalcasepartydetail.partytype,
partytypedesc: res.legalcasepartydetail.partytypedesc,
partyname: res.legalcasepartydetail.partyname,
position: res.legalcasepartydetail.position,
positiondesc: res.legalcasepartydetail.positiondesc,
gender: res.legalcasepartydetail.gender,
genderdesc: res.legalcasepartydetail.genderdesc,
mobilenumber: res.legalcasepartydetail.mobilenumber,
emailid: res.legalcasepartydetail.emailid,
dateofbirth: this.ngbDateParserFormatter.parse(res.legalcasepartydetail.dateofbirth),
address1: res.legalcasepartydetail.address1,
address2: res.legalcasepartydetail.address2,
city: res.legalcasepartydetail.city,
contactperson: res.legalcasepartydetail.contactperson,
cpmobilenumber: res.legalcasepartydetail.cpmobilenumber,
cpemail: res.legalcasepartydetail.cpemail,
rating: res.legalcasepartydetail.rating,
comments: JSON.parse(res.legalcasepartydetail.comments),
attachment: JSON.parse(res.legalcasepartydetail.attachment),
status: res.legalcasepartydetail.status,
statusdesc: res.legalcasepartydetail.statusdesc,
});
if(this.legalcasepartydetailForm.get('attachment').value!=null && this.legalcasepartydetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcasepartydetailForm.get('attachment').value);
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
  for (let key in this.legalcasepartydetailForm.controls) {
    if (this.legalcasepartydetailForm.controls[key] != null) {
if(false)
{
if(this.legalcasepartydetailservice.formData!=null && this.legalcasepartydetailservice.formData[key]!=null  && this.legalcasepartydetailservice.formData[key]!='[]' && this.legalcasepartydetailservice.formData[key]!=undefined && this.legalcasepartydetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcasepartydetailservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.legalcasepartydetailservice.formData!=null && this.legalcasepartydetailservice.formData[key]!=null   && this.legalcasepartydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcasepartydetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcasepartydetailservice.formData!=null && this.legalcasepartydetailservice.formData[key]!=null   && this.legalcasepartydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcasepartydetailservice.formData[key]+"'><div class='progress__number'>"+this.legalcasepartydetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcasepartydetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcasepartydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcasepartydetailForm.value;
obj.dateofbirth=new Date(this.legalcasepartydetailForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.legalcasepartydetailForm.get('dateofbirth').value)+'  UTC' :null);
if(this.legalcasepartydetailForm.get('comments').value!=null)obj.comments=JSON.stringify(this.legalcasepartydetailForm.get('comments').value);
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

private legalcasepartydetailtoggleOption(){
this.legalcasepartydetailshowOption = this.legalcasepartydetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcasepartydetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcasepartydetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcasepartydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcasepartydetailservice.formData=this.legalcasepartydetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcasepartydetailForm.controls[key] != null)
    {
        this.legalcasepartydetailservice.formData[key] = this.legalcasepartydetailForm.controls[key].value;
    }
}
}
}
this.legalcasepartydetailservice.formData.dateofbirth=new Date(this.legalcasepartydetailForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.legalcasepartydetailForm.get('dateofbirth').value)+'  UTC' :null);
if(this.legalcasepartydetailForm.get('comments').value!=null)this.legalcasepartydetailservice.formData.comments=JSON.stringify(this.legalcasepartydetailForm.get('comments').value);
if(this.fileattachment.getattachmentlist()!=null)this.legalcasepartydetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcasepartydetailservice.formData);
this.legalcasepartydetailservice.formData=this.legalcasepartydetailForm.value;
this.legalcasepartydetailservice.saveOrUpdatelegalcasepartydetails().subscribe(
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
this.dialogRef.close((res as any).legalcasepartydetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcasepartydetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcasepartydetail);
}
else
{
this.FillData(res);
}
}
this.legalcasepartydetailForm.markAsUntouched();
this.legalcasepartydetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpartytype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcasepartydetailForm.get('partytype').value, ScreenType:2 }
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



