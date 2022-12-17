import { legalcaserespondentdetailService } from './../../../service/legalcaserespondentdetail.service';
import { legalcaserespondentdetail } from './../../../model/legalcaserespondentdetail.model';
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
selector: 'app-legalcaserespondentdetail',
templateUrl: './legalcaserespondentdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcaserespondentdetailComponent implements OnInit {
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
bfilterPopulatelegalcaserespondentdetails:boolean=false;
datalegalcaserespondentdetailsrespondenttype3:any=[];
datalegalcaserespondentdetailsgender3:any=[];
 legalcaserespondentdetailForm: FormGroup;
respondenttypeList: bomasterdata[];
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
legalcaserespondentdetailshowOption:boolean;
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
private legalcaserespondentdetailservice: legalcaserespondentdetailService,
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
this.legalcaserespondentdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
caseid: [null],
respondentid: [null],
respondenttype: [null],
respondenttypedesc: [null],
respondentname: [null],
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
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcaserespondentdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcaserespondentdetailForm.dirty && this.legalcaserespondentdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.respondentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.respondentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.respondentid && pkDetail) {
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
let legalcaserespondentdetailid = null;

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
this.formid=legalcaserespondentdetailid;
//this.sharedService.alert(legalcaserespondentdetailid);

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
this.respondenttypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);

//autocomplete
    this.legalcaserespondentdetailservice.getlegalcaserespondentdetailsList().then(res => {
      this.pkList = res as legalcaserespondentdetail[];
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
this.legalcaserespondentdetailForm.markAsUntouched();
this.legalcaserespondentdetailForm.markAsPristine();
}



resetForm() {
if (this.legalcaserespondentdetailForm != null)
this.legalcaserespondentdetailForm.reset();
this.legalcaserespondentdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let respondentid = this.legalcaserespondentdetailForm.get('respondentid').value;
        if(respondentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcaserespondentdetailservice.deletelegalcaserespondentdetail(respondentid).then(res =>
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
    this.legalcaserespondentdetailForm.patchValue({
        respondentid: null
    });
    if(this.legalcaserespondentdetailservice.formData.respondentid!=null)this.legalcaserespondentdetailservice.formData.respondentid=null;
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
this.legalcaserespondentdetailForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcaserespondentdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcaserespondentdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcaserespondentdetailForm.controls[key]!=undefined)
{
this.legalcaserespondentdetailForm.controls[key].disable({onlySelf: true});
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
respondenttypeonChange(evt:any){
let e=evt.value;
this.legalcaserespondentdetailForm.patchValue({respondenttypedesc:evt.options[evt.options.selectedIndex].text});
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.legalcaserespondentdetailForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlegalcaserespondentdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcaserespondentdetailservice.getlegalcaserespondentdetailsByEID(pkcol).then(res => {

this.legalcaserespondentdetailservice.formData=res.legalcaserespondentdetail;
let formproperty=res.legalcaserespondentdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcaserespondentdetail.pkcol;
this.formid=res.legalcaserespondentdetail.respondentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcaserespondentdetailservice.formData=res.legalcaserespondentdetail;
this.formid=res.legalcaserespondentdetail.respondentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcaserespondentdetailForm.patchValue({
caseid: res.legalcaserespondentdetail.caseid,
respondentid: res.legalcaserespondentdetail.respondentid,
respondenttype: res.legalcaserespondentdetail.respondenttype,
respondenttypedesc: res.legalcaserespondentdetail.respondenttypedesc,
respondentname: res.legalcaserespondentdetail.respondentname,
gender: res.legalcaserespondentdetail.gender,
genderdesc: res.legalcaserespondentdetail.genderdesc,
mobilenumber: res.legalcaserespondentdetail.mobilenumber,
emailid: res.legalcaserespondentdetail.emailid,
dateofbirth: this.ngbDateParserFormatter.parse(res.legalcaserespondentdetail.dateofbirth),
address1: res.legalcaserespondentdetail.address1,
address2: res.legalcaserespondentdetail.address2,
city: res.legalcaserespondentdetail.city,
contactperson: res.legalcaserespondentdetail.contactperson,
cpmobilenumber: res.legalcaserespondentdetail.cpmobilenumber,
cpemail: res.legalcaserespondentdetail.cpemail,
rating: res.legalcaserespondentdetail.rating,
attachment: JSON.parse(res.legalcaserespondentdetail.attachment),
status: res.legalcaserespondentdetail.status,
statusdesc: res.legalcaserespondentdetail.statusdesc,
});
if(this.legalcaserespondentdetailForm.get('attachment').value!=null && this.legalcaserespondentdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcaserespondentdetailForm.get('attachment').value);
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
  for (let key in this.legalcaserespondentdetailForm.controls) {
    if (this.legalcaserespondentdetailForm.controls[key] != null) {
if(false)
{
if(this.legalcaserespondentdetailservice.formData!=null && this.legalcaserespondentdetailservice.formData[key]!=null  && this.legalcaserespondentdetailservice.formData[key]!='[]' && this.legalcaserespondentdetailservice.formData[key]!=undefined && this.legalcaserespondentdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcaserespondentdetailservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.legalcaserespondentdetailservice.formData!=null && this.legalcaserespondentdetailservice.formData[key]!=null   && this.legalcaserespondentdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcaserespondentdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcaserespondentdetailservice.formData!=null && this.legalcaserespondentdetailservice.formData[key]!=null   && this.legalcaserespondentdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcaserespondentdetailservice.formData[key]+"'><div class='progress__number'>"+this.legalcaserespondentdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcaserespondentdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcaserespondentdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcaserespondentdetailForm.value;
obj.dateofbirth=new Date(this.legalcaserespondentdetailForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.legalcaserespondentdetailForm.get('dateofbirth').value)+'  UTC' :null);
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

private legalcaserespondentdetailtoggleOption(){
this.legalcaserespondentdetailshowOption = this.legalcaserespondentdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcaserespondentdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcaserespondentdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcaserespondentdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcaserespondentdetailservice.formData=this.legalcaserespondentdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcaserespondentdetailForm.controls[key] != null)
    {
        this.legalcaserespondentdetailservice.formData[key] = this.legalcaserespondentdetailForm.controls[key].value;
    }
}
}
}
this.legalcaserespondentdetailservice.formData.dateofbirth=new Date(this.legalcaserespondentdetailForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.legalcaserespondentdetailForm.get('dateofbirth').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.legalcaserespondentdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcaserespondentdetailservice.formData);
this.legalcaserespondentdetailservice.formData=this.legalcaserespondentdetailForm.value;
this.legalcaserespondentdetailservice.saveOrUpdatelegalcaserespondentdetails().subscribe(
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
this.dialogRef.close((res as any).legalcaserespondentdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcaserespondentdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcaserespondentdetail);
}
else
{
this.FillData(res);
}
}
this.legalcaserespondentdetailForm.markAsUntouched();
this.legalcaserespondentdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrespondenttype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcaserespondentdetailForm.get('respondenttype').value, ScreenType:2 }
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



