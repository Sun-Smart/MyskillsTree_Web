import { hrmsemployeepromotionService } from './../../../service/hrmsemployeepromotion.service';
import { hrmsemployeepromotion } from './../../../model/hrmsemployeepromotion.model';
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
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
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
selector: 'app-hrmsemployeepromotion',
templateUrl: './hrmsemployeepromotion.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeepromotionComponent implements OnInit {
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
bfilterPopulatehrmsemployeepromotions:boolean=false;
datahrmsemployeepromotionsemployeeid3:any=[];
datahrmsemployeepromotionspromotiontype3:any=[];
datahrmsemployeepromotionscurrentrole3:any=[];
datahrmsemployeepromotionsnewrole3:any=[];
datahrmsemployeepromotionsreportingto3:any=[];
 hrmsemployeepromotionForm: FormGroup;
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
promotiontypeList: boconfigvalue[];
currentroleList: bouserrolemaster[];
newroleList: bouserrolemaster[];
reportingtoList: bousermaster[];
reportingtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
reportingto_bousermastersForm: FormGroup;//autocomplete
reportingto_bousermastersoptions:any;//autocomplete
reportingto_bousermastersformatter:any;//autocomplete
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
hrmsemployeepromotionshowOption:boolean;
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
private hrmsemployeepromotionservice: hrmsemployeepromotionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.hrmsemployeepromotionForm  = this.fb.group({
pk:[null],
ImageName: [null],
promotionid: [null],
referenceno: [null],
referencedate: [null],
employeeid: [null],
employeeiddesc: [null],
promotiontype: [null],
promotiontypedesc: [null],
effectivedate: [null],
currentrole: [null],
currentroledesc: [null],
newrole: [null],
newroledesc: [null],
reportingto: [null],
reportingtodesc: [null],
payscale: [null],
basicsalary: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeepromotionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeepromotionForm.dirty && this.hrmsemployeepromotionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.promotionid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.promotionid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.promotionid && pkDetail) {
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
let hrmsemployeepromotionid = null;

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
this.formid=hrmsemployeepromotionid;
//this.sharedService.alert(hrmsemployeepromotionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeepromotionservice.formData && this.hrmsemployeepromotionservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeepromotionForm.patchValue({
    employeeid: this.hrmsemployeepromotionservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeepromotionservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeepromotionForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
this.configservice.getList("promotiontype").then(res => this.promotiontypeList = res as boconfigvalue[]);
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.currentroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.newroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.reportingtoList = res as bousermaster[];
if(this.hrmsemployeepromotionservice.formData && this.hrmsemployeepromotionservice.formData.reportingto){
this.reportingtooptionsEvent.emit(this.reportingtoList);
this.hrmsemployeepromotionForm.patchValue({
    reportingto: this.hrmsemployeepromotionservice.formData.reportingto,
    reportingtodesc: this.hrmsemployeepromotionservice.formData.reportingtodesc,
});
}
{
let arrreportingto = this.reportingtoList.filter(v => v.userid == this.hrmsemployeepromotionForm.get('reportingto').value);
let objreportingto;
if (arrreportingto.length > 0) objreportingto = arrreportingto[0];
if (objreportingto)
{
}
}
}
).catch((err) => {console.log(err);});
this.reportingto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.reportingtoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.reportingto_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmsemployeepromotionservice.gethrmsemployeepromotionsList().then(res => {
      this.pkList = res as hrmsemployeepromotion[];
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
this.hrmsemployeepromotionForm.markAsUntouched();
this.hrmsemployeepromotionForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeepromotionForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}

onSelectedreportingto(reportingtoDetail: any) {
if (reportingtoDetail.userid && reportingtoDetail) {
this.hrmsemployeepromotionForm.patchValue({
reportingto: reportingtoDetail.userid,
reportingtodesc: reportingtoDetail.username,

});

}
}




resetForm() {
if (this.hrmsemployeepromotionForm != null)
this.hrmsemployeepromotionForm.reset();
this.hrmsemployeepromotionForm.patchValue({
reportingto: this.sessiondata.userid,
reportingtodesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let promotionid = this.hrmsemployeepromotionForm.get('promotionid').value;
        if(promotionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeepromotionservice.deletehrmsemployeepromotion(promotionid).then(res =>
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
    this.hrmsemployeepromotionForm.patchValue({
        promotionid: null
    });
    if(this.hrmsemployeepromotionservice.formData.promotionid!=null)this.hrmsemployeepromotionservice.formData.promotionid=null;
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
        else if(key=="referencedate")
this.hrmsemployeepromotionForm.patchValue({"referencedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="effectivedate")
this.hrmsemployeepromotionForm.patchValue({"effectivedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeepromotionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeepromotionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeepromotionForm.controls[key]!=undefined)
{
this.hrmsemployeepromotionForm.controls[key].disable({onlySelf: true});
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
promotionidonChange(evt:any){
let e=evt.value;
}
referencenoonChange(evt:any){
let e=evt.value;
}
referencedateonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
promotiontypeonChange(evt:any){
let e=this.f.promotiontype.value as any;
this.hrmsemployeepromotionForm.patchValue({promotiontypedesc:evt.options[evt.options.selectedIndex].text});
}
effectivedateonChange(evt:any){
let e=evt.value;
}
currentroleonChange(evt:any){
let e=evt.value;
this.hrmsemployeepromotionForm.patchValue({currentroledesc:evt.options[evt.options.selectedIndex].text});
}
newroleonChange(evt:any){
let e=evt.value;
this.hrmsemployeepromotionForm.patchValue({newroledesc:evt.options[evt.options.selectedIndex].text});
}
reportingtoonChange(evt:any){
let e=evt.value;
}
payscaleonChange(evt:any){
let e=evt.value;
}
basicsalaryonChange(evt:any){
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
  


edithrmsemployeepromotions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeepromotionservice.gethrmsemployeepromotionsByEID(pkcol).then(res => {

this.hrmsemployeepromotionservice.formData=res.hrmsemployeepromotion;
let formproperty=res.hrmsemployeepromotion.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeepromotion.pkcol;
this.formid=res.hrmsemployeepromotion.promotionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeepromotion.promotionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeepromotionForm.patchValue({
promotionid: res.hrmsemployeepromotion.promotionid,
referenceno: res.hrmsemployeepromotion.referenceno,
referencedate: this.ngbDateParserFormatter.parse(res.hrmsemployeepromotion.referencedate),
employeeid: res.hrmsemployeepromotion.employeeid,
employeeiddesc: res.hrmsemployeepromotion.employeeiddesc,
promotiontype: res.hrmsemployeepromotion.promotiontype,
promotiontypedesc: res.hrmsemployeepromotion.promotiontypedesc,
effectivedate: this.ngbDateParserFormatter.parse(res.hrmsemployeepromotion.effectivedate),
currentrole: res.hrmsemployeepromotion.currentrole,
currentroledesc: res.hrmsemployeepromotion.currentroledesc,
newrole: res.hrmsemployeepromotion.newrole,
newroledesc: res.hrmsemployeepromotion.newroledesc,
reportingto: res.hrmsemployeepromotion.reportingto,
reportingtodesc: res.hrmsemployeepromotion.reportingtodesc,
payscale: res.hrmsemployeepromotion.payscale,
basicsalary: res.hrmsemployeepromotion.basicsalary,
remarks: res.hrmsemployeepromotion.remarks,
attachment: JSON.parse(res.hrmsemployeepromotion.attachment),
status: res.hrmsemployeepromotion.status,
statusdesc: res.hrmsemployeepromotion.statusdesc,
});
if(this.hrmsemployeepromotionForm.get('attachment').value!=null && this.hrmsemployeepromotionForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeepromotionForm.get('attachment').value);
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
  for (let key in this.hrmsemployeepromotionForm.controls) {
    if (this.hrmsemployeepromotionForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeepromotionservice.formData!=null && this.hrmsemployeepromotionservice.formData[key]!=null  && this.hrmsemployeepromotionservice.formData[key]!='[]' && this.hrmsemployeepromotionservice.formData[key]!=undefined && this.hrmsemployeepromotionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeepromotionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeepromotionservice.formData!=null && this.hrmsemployeepromotionservice.formData[key]!=null   && this.hrmsemployeepromotionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeepromotionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeepromotionservice.formData!=null && this.hrmsemployeepromotionservice.formData[key]!=null   && this.hrmsemployeepromotionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeepromotionservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeepromotionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeepromotionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeepromotionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeepromotionForm.value;
obj.referencedate=new Date(this.hrmsemployeepromotionForm.get('referencedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeepromotionForm.get('referencedate').value)+'  UTC' :null);
obj.effectivedate=new Date(this.hrmsemployeepromotionForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeepromotionForm.get('effectivedate').value)+'  UTC' :null);
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

private hrmsemployeepromotiontoggleOption(){
this.hrmsemployeepromotionshowOption = this.hrmsemployeepromotionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeepromotionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeepromotionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeepromotionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeepromotionservice.formData=this.hrmsemployeepromotionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeepromotionForm.controls[key] != null)
    {
        this.hrmsemployeepromotionservice.formData[key] = this.hrmsemployeepromotionForm.controls[key].value;
    }
}
}
}
this.hrmsemployeepromotionservice.formData.referencedate=new Date(this.hrmsemployeepromotionForm.get('referencedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeepromotionForm.get('referencedate').value)+'  UTC' :null);
this.hrmsemployeepromotionservice.formData.effectivedate=new Date(this.hrmsemployeepromotionForm.get('effectivedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeepromotionForm.get('effectivedate').value)+'  UTC' :null);
this.hrmsemployeepromotionservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeepromotionservice.formData);
this.hrmsemployeepromotionservice.formData=this.hrmsemployeepromotionForm.value;
this.hrmsemployeepromotionservice.saveOrUpdatehrmsemployeepromotions().subscribe(
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
this.dialogRef.close((res as any).hrmsemployeepromotion);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeepromotionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeepromotion);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeepromotionForm.markAsUntouched();
this.hrmsemployeepromotionForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeepromotionForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcurrentrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsemployeepromotionForm.get('currentrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditnewrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsemployeepromotionForm.get('newrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreportingto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeepromotionForm.get('reportingto').value, ScreenType:2 }
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



