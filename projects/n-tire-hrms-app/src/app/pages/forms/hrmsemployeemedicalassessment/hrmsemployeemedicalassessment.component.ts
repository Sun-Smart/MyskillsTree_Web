import { hrmsemployeemedicalassessmentService } from './../../../service/hrmsemployeemedicalassessment.service';
import { hrmsemployeemedicalassessment } from './../../../model/hrmsemployeemedicalassessment.model';
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
import { bouserbranchaccess} from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-hrmsemployeemedicalassessment',
templateUrl: './hrmsemployeemedicalassessment.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeemedicalassessmentComponent implements OnInit {
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
bfilterPopulatehrmsemployeemedicalassessments:boolean=false;
datahrmsemployeemedicalassessmentsbranchid3:any=[];
datahrmsemployeemedicalassessmentsemployeeid3:any=[];
datahrmsemployeemedicalassessmentsdepartmentid3:any=[];
datahrmsemployeemedicalassessmentsdesignationid3:any=[];
datahrmsemployeemedicalassessmentsconsultationtype3:any=[];
datahrmsemployeemedicalassessmentsresulttype3:any=[];
 hrmsemployeemedicalassessmentForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
departmentidList: bomasterdata[];
designationidList: boconfigvalue[];
consultationtypeList: boconfigvalue[];
resulttypeList: boconfigvalue[];
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
hrmsemployeemedicalassessmentshowOption:boolean;
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
private hrmsemployeemedicalassessmentservice: hrmsemployeemedicalassessmentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
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
this.hrmsemployeemedicalassessmentForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
consultationid: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
referenceno: [null],
consultationdate: [null],
consultationtype: [null],
consultationtypedesc: [null],
resulttype: [null],
resulttypedesc: [null],
details: [null],
workrestrictions: [null],
notes: [null],
nextassessmentdate: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeemedicalassessmentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeemedicalassessmentForm.dirty && this.hrmsemployeemedicalassessmentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.consultationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.consultationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.consultationid && pkDetail) {
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
let hrmsemployeemedicalassessmentid = null;

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
this.formid=hrmsemployeemedicalassessmentid;
//this.sharedService.alert(hrmsemployeemedicalassessmentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.hrmsemployeemedicalassessmentservice.formData && this.hrmsemployeemedicalassessmentservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmsemployeemedicalassessmentForm.patchValue({
    branchid: this.hrmsemployeemedicalassessmentservice.formData.branchid,
    branchiddesc: this.hrmsemployeemedicalassessmentservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmsemployeemedicalassessmentForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bouserbranchaccessesformatter = (result: any) => result.branchname;
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeemedicalassessmentservice.formData && this.hrmsemployeemedicalassessmentservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeemedicalassessmentForm.patchValue({
    employeeid: this.hrmsemployeemedicalassessmentservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeemedicalassessmentservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeemedicalassessmentForm.get('employeeid').value);
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
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("designation").then(res => this.designationidList = res as boconfigvalue[]);
this.configservice.getList("consultationtype").then(res => this.consultationtypeList = res as boconfigvalue[]);
this.configservice.getList("medicalresulttype").then(res => this.resulttypeList = res as boconfigvalue[]);

//autocomplete
    this.hrmsemployeemedicalassessmentservice.gethrmsemployeemedicalassessmentsList().then(res => {
      this.pkList = res as hrmsemployeemedicalassessment[];
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
this.hrmsemployeemedicalassessmentForm.markAsUntouched();
this.hrmsemployeemedicalassessmentForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmsemployeemedicalassessmentForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeemedicalassessmentForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsemployeemedicalassessmentForm != null)
this.hrmsemployeemedicalassessmentForm.reset();
this.hrmsemployeemedicalassessmentForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let consultationid = this.hrmsemployeemedicalassessmentForm.get('consultationid').value;
        if(consultationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeemedicalassessmentservice.deletehrmsemployeemedicalassessment(consultationid).then(res =>
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
    this.hrmsemployeemedicalassessmentForm.patchValue({
        consultationid: null
    });
    if(this.hrmsemployeemedicalassessmentservice.formData.consultationid!=null)this.hrmsemployeemedicalassessmentservice.formData.consultationid=null;
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
        else if(key=="consultationdate")
this.hrmsemployeemedicalassessmentForm.patchValue({"consultationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextassessmentdate")
this.hrmsemployeemedicalassessmentForm.patchValue({"nextassessmentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeemedicalassessmentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeemedicalassessmentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeemedicalassessmentForm.controls[key]!=undefined)
{
this.hrmsemployeemedicalassessmentForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hrmsemployeemedicalassessments",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
branchidonChange(evt:any){
let e=evt.value;
}
consultationidonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
employeenameonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.hrmsemployeemedicalassessmentForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.hrmsemployeemedicalassessmentForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
referencenoonChange(evt:any){
let e=evt.value;
}
consultationdateonChange(evt:any){
let e=evt.value;
}
consultationtypeonChange(evt:any){
let e=this.f.consultationtype.value as any;
this.hrmsemployeemedicalassessmentForm.patchValue({consultationtypedesc:evt.options[evt.options.selectedIndex].text});
}
resulttypeonChange(evt:any){
let e=this.f.resulttype.value as any;
this.hrmsemployeemedicalassessmentForm.patchValue({resulttypedesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
workrestrictionsonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
nextassessmentdateonChange(evt:any){
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
  


edithrmsemployeemedicalassessments() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeemedicalassessmentservice.gethrmsemployeemedicalassessmentsByEID(pkcol).then(res => {

this.hrmsemployeemedicalassessmentservice.formData=res.hrmsemployeemedicalassessment;
let formproperty=res.hrmsemployeemedicalassessment.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeemedicalassessment.pkcol;
this.formid=res.hrmsemployeemedicalassessment.consultationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeemedicalassessment.consultationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeemedicalassessmentForm.patchValue({
branchid: res.hrmsemployeemedicalassessment.branchid,
branchiddesc: res.hrmsemployeemedicalassessment.branchiddesc,
consultationid: res.hrmsemployeemedicalassessment.consultationid,
employeeid: res.hrmsemployeemedicalassessment.employeeid,
employeeiddesc: res.hrmsemployeemedicalassessment.employeeiddesc,
employeename: res.hrmsemployeemedicalassessment.employeename,
departmentid: res.hrmsemployeemedicalassessment.departmentid,
departmentiddesc: res.hrmsemployeemedicalassessment.departmentiddesc,
designationid: res.hrmsemployeemedicalassessment.designationid,
designationiddesc: res.hrmsemployeemedicalassessment.designationiddesc,
referenceno: res.hrmsemployeemedicalassessment.referenceno,
consultationdate: this.ngbDateParserFormatter.parse(res.hrmsemployeemedicalassessment.consultationdate),
consultationtype: res.hrmsemployeemedicalassessment.consultationtype,
consultationtypedesc: res.hrmsemployeemedicalassessment.consultationtypedesc,
resulttype: res.hrmsemployeemedicalassessment.resulttype,
resulttypedesc: res.hrmsemployeemedicalassessment.resulttypedesc,
details: res.hrmsemployeemedicalassessment.details,
workrestrictions: res.hrmsemployeemedicalassessment.workrestrictions,
notes: res.hrmsemployeemedicalassessment.notes,
nextassessmentdate: this.ngbDateParserFormatter.parse(res.hrmsemployeemedicalassessment.nextassessmentdate),
customfield: res.hrmsemployeemedicalassessment.customfield,
attachment: JSON.parse(res.hrmsemployeemedicalassessment.attachment),
status: res.hrmsemployeemedicalassessment.status,
statusdesc: res.hrmsemployeemedicalassessment.statusdesc,
});
if(this.hrmsemployeemedicalassessmentForm.get('customfield').value!=null && this.hrmsemployeemedicalassessmentForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hrmsemployeemedicalassessmentForm.get('customfield').value);
this.FillCustomField();
if(this.hrmsemployeemedicalassessmentForm.get('attachment').value!=null && this.hrmsemployeemedicalassessmentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeemedicalassessmentForm.get('attachment').value);
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
  for (let key in this.hrmsemployeemedicalassessmentForm.controls) {
    if (this.hrmsemployeemedicalassessmentForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeemedicalassessmentservice.formData!=null && this.hrmsemployeemedicalassessmentservice.formData[key]!=null  && this.hrmsemployeemedicalassessmentservice.formData[key]!='[]' && this.hrmsemployeemedicalassessmentservice.formData[key]!=undefined && this.hrmsemployeemedicalassessmentservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeemedicalassessmentservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeemedicalassessmentservice.formData!=null && this.hrmsemployeemedicalassessmentservice.formData[key]!=null   && this.hrmsemployeemedicalassessmentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeemedicalassessmentservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeemedicalassessmentservice.formData!=null && this.hrmsemployeemedicalassessmentservice.formData[key]!=null   && this.hrmsemployeemedicalassessmentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeemedicalassessmentservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeemedicalassessmentservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeemedicalassessmentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeemedicalassessmentForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hrmsemployeemedicalassessmentForm.value;
obj.consultationdate=new Date(this.hrmsemployeemedicalassessmentForm.get('consultationdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemedicalassessmentForm.get('consultationdate').value)+'  UTC' :null);
obj.nextassessmentdate=new Date(this.hrmsemployeemedicalassessmentForm.get('nextassessmentdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemedicalassessmentForm.get('nextassessmentdate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
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

private hrmsemployeemedicalassessmenttoggleOption(){
this.hrmsemployeemedicalassessmentshowOption = this.hrmsemployeemedicalassessmentshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeemedicalassessmentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeemedicalassessmentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeemedicalassessmentForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeemedicalassessmentservice.formData=this.hrmsemployeemedicalassessmentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeemedicalassessmentForm.controls[key] != null)
    {
        this.hrmsemployeemedicalassessmentservice.formData[key] = this.hrmsemployeemedicalassessmentForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hrmsemployeemedicalassessmentservice.formData.consultationdate=new Date(this.hrmsemployeemedicalassessmentForm.get('consultationdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemedicalassessmentForm.get('consultationdate').value)+'  UTC' :null);
this.hrmsemployeemedicalassessmentservice.formData.nextassessmentdate=new Date(this.hrmsemployeemedicalassessmentForm.get('nextassessmentdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemedicalassessmentForm.get('nextassessmentdate').value)+'  UTC' :null);
this.hrmsemployeemedicalassessmentservice.formData.customfield=JSON.stringify(customfields);
this.hrmsemployeemedicalassessmentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeemedicalassessmentservice.formData);
this.hrmsemployeemedicalassessmentservice.formData=this.hrmsemployeemedicalassessmentForm.value;
this.hrmsemployeemedicalassessmentservice.saveOrUpdatehrmsemployeemedicalassessments().subscribe(
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
this.dialogRef.close((res as any).hrmsemployeemedicalassessment);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeemedicalassessmentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeemedicalassessment);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeemedicalassessmentForm.markAsUntouched();
this.hrmsemployeemedicalassessmentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.hrmsemployeemedicalassessmentForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeemedicalassessmentForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeemedicalassessmentForm.get('departmentid').value, ScreenType:2 }
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



