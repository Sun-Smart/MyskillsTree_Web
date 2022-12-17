import { hrmsapplicantcareerService } from './../../../service/hrmsapplicantcareer.service';
import { hrmsapplicantcareer } from './../../../model/hrmsapplicantcareer.model';
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
import { hrmsapplicantmaster} from './../../../model/hrmsapplicantmaster.model';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
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
selector: 'app-hrmsapplicantcareer',
templateUrl: './hrmsapplicantcareer.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsapplicantcareerComponent implements OnInit {
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
bfilterPopulatehrmsapplicantcareers:boolean=false;
datahrmsapplicantcareersapplicantid3:any=[];
datahrmsapplicantcareersmappedtoourrole3:any=[];
datahrmsapplicantcareerscurrency3:any=[];
 hrmsapplicantcareerForm: FormGroup;
applicantidList: hrmsapplicantmaster[];
applicantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
applicantid_hrmsapplicantmastersForm: FormGroup;//autocomplete
applicantid_hrmsapplicantmastersoptions:any;//autocomplete
applicantid_hrmsapplicantmastersformatter:any;//autocomplete
mappedtoourroleList: bouserrolemaster[];
currencyList: boconfigvalue[];
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
hrmsapplicantcareershowOption:boolean;
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
private hrmsapplicantcareerservice: hrmsapplicantcareerService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsapplicantmasterservice:hrmsapplicantmasterService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.hrmsapplicantcareerForm  = this.fb.group({
pk:[null],
ImageName: [null],
applicantid: [null],
applicantiddesc: [null],
hacid: [null],
employer: [null],
fromdate: [null],
todate: [null],
totalmonths: [null],
designation: [null],
mappedtoourrole: [null],
mappedtoourroledesc: [null],
responsibilities: [null],
currency: [null],
currencydesc: [null],
salary: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsapplicantcareerForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsapplicantcareerForm.dirty && this.hrmsapplicantcareerForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.hacid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.hacid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.hacid && pkDetail) {
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
let hrmsapplicantcareerid = null;

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
this.formid=hrmsapplicantcareerid;
//this.sharedService.alert(hrmsapplicantcareerid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsapplicantmasterservice.gethrmsapplicantmastersList().then(res => 
{
this.applicantidList = res as hrmsapplicantmaster[];
if(this.hrmsapplicantcareerservice.formData && this.hrmsapplicantcareerservice.formData.applicantid){
this.applicantidoptionsEvent.emit(this.applicantidList);
this.hrmsapplicantcareerForm.patchValue({
    applicantid: this.hrmsapplicantcareerservice.formData.applicantid,
    applicantiddesc: this.hrmsapplicantcareerservice.formData.applicantiddesc,
});
}
{
let arrapplicantid = this.applicantidList.filter(v => v.applicantid == this.hrmsapplicantcareerForm.get('applicantid').value);
let objapplicantid;
if (arrapplicantid.length > 0) objapplicantid = arrapplicantid[0];
if (objapplicantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.applicantid_hrmsapplicantmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.applicantidList.filter(v => v.applicantname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.applicantid_hrmsapplicantmastersformatter = (result: any) => result.applicantname;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.mappedtoourroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);

//autocomplete
    this.hrmsapplicantcareerservice.gethrmsapplicantcareersList().then(res => {
      this.pkList = res as hrmsapplicantcareer[];
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
this.hrmsapplicantcareerForm.markAsUntouched();
this.hrmsapplicantcareerForm.markAsPristine();
}
onSelectedapplicantid(applicantidDetail: any) {
if (applicantidDetail.applicantid && applicantidDetail) {
this.hrmsapplicantcareerForm.patchValue({
applicantid: applicantidDetail.applicantid,
applicantiddesc: applicantidDetail.applicantname,

});

}
}




resetForm() {
if (this.hrmsapplicantcareerForm != null)
this.hrmsapplicantcareerForm.reset();
this.hrmsapplicantcareerForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let hacid = this.hrmsapplicantcareerForm.get('hacid').value;
        if(hacid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsapplicantcareerservice.deletehrmsapplicantcareer(hacid).then(res =>
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
    this.hrmsapplicantcareerForm.patchValue({
        hacid: null
    });
    if(this.hrmsapplicantcareerservice.formData.hacid!=null)this.hrmsapplicantcareerservice.formData.hacid=null;
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
        else if(key=="fromdate")
this.hrmsapplicantcareerForm.patchValue({"fromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="todate")
this.hrmsapplicantcareerForm.patchValue({"todate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsapplicantcareerForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsapplicantcareerForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsapplicantcareerForm.controls[key]!=undefined)
{
this.hrmsapplicantcareerForm.controls[key].disable({onlySelf: true});
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
applicantidonChange(evt:any){
let e=evt.value;
}
hacidonChange(evt:any){
let e=evt.value;
}
employeronChange(evt:any){
let e=evt.value;
}
fromdateonChange(evt:any){
let e=evt.value;
}
todateonChange(evt:any){
let e=evt.value;
}
totalmonthsonChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
}
mappedtoourroleonChange(evt:any){
let e=evt.value;
this.hrmsapplicantcareerForm.patchValue({mappedtoourroledesc:evt.options[evt.options.selectedIndex].text});
}
responsibilitiesonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.hrmsapplicantcareerForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
salaryonChange(evt:any){
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
  


edithrmsapplicantcareers() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsapplicantcareerservice.gethrmsapplicantcareersByEID(pkcol).then(res => {

this.hrmsapplicantcareerservice.formData=res.hrmsapplicantcareer;
let formproperty=res.hrmsapplicantcareer.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsapplicantcareer.pkcol;
this.formid=res.hrmsapplicantcareer.hacid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsapplicantcareer.hacid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsapplicantcareerForm.patchValue({
applicantid: res.hrmsapplicantcareer.applicantid,
applicantiddesc: res.hrmsapplicantcareer.applicantiddesc,
hacid: res.hrmsapplicantcareer.hacid,
employer: res.hrmsapplicantcareer.employer,
fromdate: this.ngbDateParserFormatter.parse(res.hrmsapplicantcareer.fromdate),
todate: this.ngbDateParserFormatter.parse(res.hrmsapplicantcareer.todate),
totalmonths: res.hrmsapplicantcareer.totalmonths,
designation: res.hrmsapplicantcareer.designation,
mappedtoourrole: res.hrmsapplicantcareer.mappedtoourrole,
mappedtoourroledesc: res.hrmsapplicantcareer.mappedtoourroledesc,
responsibilities: res.hrmsapplicantcareer.responsibilities,
currency: res.hrmsapplicantcareer.currency,
currencydesc: res.hrmsapplicantcareer.currencydesc,
salary: res.hrmsapplicantcareer.salary,
remarks: res.hrmsapplicantcareer.remarks,
attachment: JSON.parse(res.hrmsapplicantcareer.attachment),
status: res.hrmsapplicantcareer.status,
statusdesc: res.hrmsapplicantcareer.statusdesc,
});
if(this.hrmsapplicantcareerForm.get('attachment').value!=null && this.hrmsapplicantcareerForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsapplicantcareerForm.get('attachment').value);
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
  for (let key in this.hrmsapplicantcareerForm.controls) {
    if (this.hrmsapplicantcareerForm.controls[key] != null) {
if(false)
{
if(this.hrmsapplicantcareerservice.formData!=null && this.hrmsapplicantcareerservice.formData[key]!=null  && this.hrmsapplicantcareerservice.formData[key]!='[]' && this.hrmsapplicantcareerservice.formData[key]!=undefined && this.hrmsapplicantcareerservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsapplicantcareerservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsapplicantcareerservice.formData!=null && this.hrmsapplicantcareerservice.formData[key]!=null   && this.hrmsapplicantcareerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsapplicantcareerservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsapplicantcareerservice.formData!=null && this.hrmsapplicantcareerservice.formData[key]!=null   && this.hrmsapplicantcareerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsapplicantcareerservice.formData[key]+"'><div class='progress__number'>"+this.hrmsapplicantcareerservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsapplicantcareerForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsapplicantcareerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsapplicantcareerForm.value;
obj.fromdate=new Date(this.hrmsapplicantcareerForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('fromdate').value)+'  UTC' :null);
obj.todate=new Date(this.hrmsapplicantcareerForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('todate').value)+'  UTC' :null);
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

private hrmsapplicantcareertoggleOption(){
this.hrmsapplicantcareershowOption = this.hrmsapplicantcareershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsapplicantcareerForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsapplicantcareerForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsapplicantcareerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsapplicantcareerservice.formData=this.hrmsapplicantcareerForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsapplicantcareerForm.controls[key] != null)
    {
        this.hrmsapplicantcareerservice.formData[key] = this.hrmsapplicantcareerForm.controls[key].value;
    }
}
}
}
this.hrmsapplicantcareerservice.formData.fromdate=new Date(this.hrmsapplicantcareerForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('fromdate').value)+'  UTC' :null);
this.hrmsapplicantcareerservice.formData.todate=new Date(this.hrmsapplicantcareerForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('todate').value)+'  UTC' :null);
this.hrmsapplicantcareerservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsapplicantcareerservice.formData);
this.hrmsapplicantcareerservice.formData=this.hrmsapplicantcareerForm.value;
this.hrmsapplicantcareerservice.saveOrUpdatehrmsapplicantcareers().subscribe(
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
this.dialogRef.close((res as any).hrmsapplicantcareer);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsapplicantcareerservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsapplicantcareer);
}
else
{
this.FillData(res);
}
}
this.hrmsapplicantcareerForm.markAsUntouched();
this.hrmsapplicantcareerForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditapplicantid( applicantid) {
/*let ScreenType='2';
this.dialog.open(hrmsapplicantmasterComponent, 
{
data: {applicantid:this.hrmsapplicantcareerForm.get('applicantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmappedtoourrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsapplicantcareerForm.get('mappedtoourrole').value, ScreenType:2 }
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



