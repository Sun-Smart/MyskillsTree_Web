import { hrmsemployeeexitquestionService } from './../../../service/hrmsemployeeexitquestion.service';
import { hrmsemployeeexitquestion } from './../../../model/hrmsemployeeexitquestion.model';
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
import { hrmsemployeeresignation} from './../../../model/hrmsemployeeresignation.model';
import { hrmsemployeeresignationService } from './../../../service/hrmsemployeeresignation.service';
//popups
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
//detail table services
import { hrmsemployeeexitquestiondetail } from './../../../model/hrmsemployeeexitquestiondetail.model';
import { hrmsemployeeexitquestiondetailComponent } from './../../../pages/forms/hrmsemployeeexitquestiondetail/hrmsemployeeexitquestiondetail.component';
//FK services
import { umsquestion,IumsquestionResponse } from '../../../../../../n-tire-learn-app/src/app/model/umsquestion.model';
import { umsquestionComponent } from '../../../../../../n-tire-learn-app/src/app/pages/forms/umsquestion/umsquestion.component';
import { umsquestionService } from '../../../../../../n-tire-learn-app/src/app/service/umsquestion.service';
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

@Component({
selector: 'app-hrmsemployeeexitquestion',
templateUrl: './hrmsemployeeexitquestion.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeeexitquestionComponent implements OnInit {
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
bfilterPopulatehrmsemployeeexitquestions:boolean=false;
datahrmsemployeeexitquestionsbranchid3:any=[];
datahrmsemployeeexitquestionsresignationid3:any=[];
datahrmsemployeeexitquestionsemployeeid3:any=[];
datahrmsemployeeexitquestionsdepartmentid3:any=[];
datahrmsemployeeexitquestionsdesignationid3:any=[];
datahrmsemployeeexitquestiondetailsexitquestiontype3:any=[];
datahrmsemployeeexitquestiondetailsexitquestionid3:any=[];
datahrmsemployeeexitquestiondetailsresignationid3:any=[];
bfilterPopulatehrmsemployeeexitquestiondetails:boolean=false;
@ViewChild('tblhrmsemployeeexitquestiondetailssource',{static:false}) tblhrmsemployeeexitquestiondetailssource: Ng2SmartTableComponent;
 hrmsemployeeexitquestionForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
resignationidList: hrmsemployeeresignation[];
resignationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
resignationid_hrmsemployeeresignationsForm: FormGroup;//autocomplete
resignationid_hrmsemployeeresignationsoptions:any;//autocomplete
resignationid_hrmsemployeeresignationsformatter:any;//autocomplete
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
departmentidList: bomasterdata[];
designationidList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeeexitquestionshowOption:boolean;
hrmsemployeeexitquestiondetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsemployeeexitquestiondetailsvisiblelist:any;
hrmsemployeeexitquestiondetailshidelist:any;

DeletedhrmsemployeeexitquestiondetailIDs: string="";
hrmsemployeeexitquestiondetailsID: string = "1";
hrmsemployeeexitquestiondetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsemployeeexitquestionservice: hrmsemployeeexitquestionService,
private umsquestionservice: umsquestionService,
private hrmsemployeeresignationservice: hrmsemployeeresignationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private hrmsemployeeservice:hrmsemployeeService,
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
this.hrmsemployeeexitquestionForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
exitquestionid: [null],
resignationid: [null],
resignationiddesc: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
reference: [null],
referencedate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeeexitquestionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeeexitquestionForm.dirty && this.hrmsemployeeexitquestionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.exitquestionid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.exitquestionid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.exitquestionid && pkDetail) {
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
let hrmsemployeeexitquestionid = null;

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
this.formid=hrmsemployeeexitquestionid;
//this.sharedService.alert(hrmsemployeeexitquestionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsemployeeexitquestiondetailsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeexitquestiondetailsTableddConfig();
  });

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
if(this.hrmsemployeeexitquestionservice.formData && this.hrmsemployeeexitquestionservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmsemployeeexitquestionForm.patchValue({
    branchid: this.hrmsemployeeexitquestionservice.formData.branchid,
    branchiddesc: this.hrmsemployeeexitquestionservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmsemployeeexitquestionForm.get('branchid').value);
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
this.hrmsemployeeresignationservice.gethrmsemployeeresignationsList().then(res => 
{
this.resignationidList = res as hrmsemployeeresignation[];
if(this.hrmsemployeeexitquestionservice.formData && this.hrmsemployeeexitquestionservice.formData.resignationid){
this.resignationidoptionsEvent.emit(this.resignationidList);
this.hrmsemployeeexitquestionForm.patchValue({
    resignationid: this.hrmsemployeeexitquestionservice.formData.resignationid,
    resignationiddesc: this.hrmsemployeeexitquestionservice.formData.resignationiddesc,
});
}
{
let arrresignationid = this.resignationidList.filter(v => v.resignationid == this.hrmsemployeeexitquestionForm.get('resignationid').value);
let objresignationid;
if (arrresignationid.length > 0) objresignationid = arrresignationid[0];
if (objresignationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.resignationid_hrmsemployeeresignationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.resignationidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.resignationid_hrmsemployeeresignationsformatter = (result: any) => result.reference;
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeeexitquestionservice.formData && this.hrmsemployeeexitquestionservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeeexitquestionForm.patchValue({
    employeeid: this.hrmsemployeeexitquestionservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeeexitquestionservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeeexitquestionForm.get('employeeid').value);
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

//autocomplete
    this.hrmsemployeeexitquestionservice.gethrmsemployeeexitquestionsList().then(res => {
      this.pkList = res as hrmsemployeeexitquestion[];
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
this.hrmsemployeeexitquestionForm.markAsUntouched();
this.hrmsemployeeexitquestionForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmsemployeeexitquestionForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedresignationid(resignationidDetail: any) {
if (resignationidDetail.resignationid && resignationidDetail) {
this.hrmsemployeeexitquestionForm.patchValue({
resignationid: resignationidDetail.resignationid,
resignationiddesc: resignationidDetail.reference,

});

}
}

onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeeexitquestionForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsemployeeexitquestionForm != null)
this.hrmsemployeeexitquestionForm.reset();
this.hrmsemployeeexitquestionForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails=[];
this.hrmsemployeeexitquestiondetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let exitquestionid = this.hrmsemployeeexitquestionForm.get('exitquestionid').value;
        if(exitquestionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeeexitquestionservice.deletehrmsemployeeexitquestion(exitquestionid).then(res =>
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
    this.hrmsemployeeexitquestionForm.patchValue({
        exitquestionid: null
    });
    if(this.hrmsemployeeexitquestionservice.formData.exitquestionid!=null)this.hrmsemployeeexitquestionservice.formData.exitquestionid=null;
for (let i=0;i<this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.length;i++) {
this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails[i].exitquestiondetailid=null;
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
        else if(key=="referencedate")
this.hrmsemployeeexitquestionForm.patchValue({"referencedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeeexitquestionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeeexitquestionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeeexitquestionForm.controls[key]!=undefined)
{
this.hrmsemployeeexitquestionForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
exitquestionidonChange(evt:any){
let e=evt.value;
}
resignationidonChange(evt:any){
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
this.hrmsemployeeexitquestionForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.hrmsemployeeexitquestionForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
referenceonChange(evt:any){
let e=evt.value;
}
referencedateonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeeexitquestions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeeexitquestionservice.gethrmsemployeeexitquestionsByEID(pkcol).then(res => {

this.hrmsemployeeexitquestionservice.formData=res.hrmsemployeeexitquestion;
let formproperty=res.hrmsemployeeexitquestion.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeeexitquestion.pkcol;
this.formid=res.hrmsemployeeexitquestion.exitquestionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeeexitquestion.exitquestionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeeexitquestionForm.patchValue({
branchid: res.hrmsemployeeexitquestion.branchid,
branchiddesc: res.hrmsemployeeexitquestion.branchiddesc,
exitquestionid: res.hrmsemployeeexitquestion.exitquestionid,
resignationid: res.hrmsemployeeexitquestion.resignationid,
resignationiddesc: res.hrmsemployeeexitquestion.resignationiddesc,
employeeid: res.hrmsemployeeexitquestion.employeeid,
employeeiddesc: res.hrmsemployeeexitquestion.employeeiddesc,
employeename: res.hrmsemployeeexitquestion.employeename,
departmentid: res.hrmsemployeeexitquestion.departmentid,
departmentiddesc: res.hrmsemployeeexitquestion.departmentiddesc,
designationid: res.hrmsemployeeexitquestion.designationid,
designationiddesc: res.hrmsemployeeexitquestion.designationiddesc,
reference: res.hrmsemployeeexitquestion.reference,
referencedate: this.ngbDateParserFormatter.parse(res.hrmsemployeeexitquestion.referencedate),
status: res.hrmsemployeeexitquestion.status,
statusdesc: res.hrmsemployeeexitquestion.statusdesc,
});
this.hrmsemployeeexitquestiondetailsvisiblelist=res.hrmsemployeeexitquestiondetailsvisiblelist;
//Child Tables if any
this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails = res.hrmsemployeeexitquestiondetails;
this.SethrmsemployeeexitquestiondetailsTableConfig();
this.hrmsemployeeexitquestiondetailsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeexitquestiondetailsTableddConfig();
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
  for (let key in this.hrmsemployeeexitquestionForm.controls) {
    if (this.hrmsemployeeexitquestionForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeeexitquestionservice.formData!=null && this.hrmsemployeeexitquestionservice.formData[key]!=null  && this.hrmsemployeeexitquestionservice.formData[key]!='[]' && this.hrmsemployeeexitquestionservice.formData[key]!=undefined && this.hrmsemployeeexitquestionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeeexitquestionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeeexitquestionservice.formData!=null && this.hrmsemployeeexitquestionservice.formData[key]!=null   && this.hrmsemployeeexitquestionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeeexitquestionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeeexitquestionservice.formData!=null && this.hrmsemployeeexitquestionservice.formData[key]!=null   && this.hrmsemployeeexitquestionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeeexitquestionservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeeexitquestionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeeexitquestionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeeexitquestionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeeexitquestionForm.value;
obj.referencedate=new Date(this.hrmsemployeeexitquestionForm.get('referencedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeexitquestionForm.get('referencedate').value)+'  UTC' :null);
console.log(obj);
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

private hrmsemployeeexitquestiontoggleOption(){
this.hrmsemployeeexitquestionshowOption = this.hrmsemployeeexitquestionshowOption === true ? false : true;
}

private hrmsemployeeexitquestiondetailtoggleOption(){
this.hrmsemployeeexitquestiondetailshowOption = this.hrmsemployeeexitquestiondetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeeexitquestionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeeexitquestionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeeexitquestionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeeexitquestionservice.formData=this.hrmsemployeeexitquestionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeeexitquestionForm.controls[key] != null)
    {
        this.hrmsemployeeexitquestionservice.formData[key] = this.hrmsemployeeexitquestionForm.controls[key].value;
    }
}
}
}
this.hrmsemployeeexitquestionservice.formData.referencedate=new Date(this.hrmsemployeeexitquestionForm.get('referencedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeexitquestionForm.get('referencedate').value)+'  UTC' :null);
this.hrmsemployeeexitquestionservice.formData.DeletedhrmsemployeeexitquestiondetailIDs = this.DeletedhrmsemployeeexitquestiondetailIDs;
console.log(this.hrmsemployeeexitquestionservice.formData);
this.hrmsemployeeexitquestionservice.formData=this.hrmsemployeeexitquestionForm.value;
this.hrmsemployeeexitquestionservice.saveOrUpdatehrmsemployeeexitquestions().subscribe(
async res => {
if (this.hrmsemployeeexitquestiondetailssource.data)
{
    for (let i = 0; i < this.hrmsemployeeexitquestiondetailssource.data.length; i++)
    {
        if (this.hrmsemployeeexitquestiondetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeexitquestiondetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeexitquestion);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeeexitquestionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeexitquestion);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeeexitquestionForm.markAsUntouched();
this.hrmsemployeeexitquestionForm.markAsPristine();
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
data: {branchid:this.hrmsemployeeexitquestionForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditresignationid( resignationid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeresignationComponent, 
{
data: {resignationid:this.hrmsemployeeexitquestionForm.get('resignationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeeexitquestionForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeeexitquestionForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsemployeeexitquestiondetail(event:any,exitquestiondetailid:any, exitquestionid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeexitquestiondetailComponent, 
{
data:  {  showview:false,save:false,event,exitquestiondetailid, exitquestionid,visiblelist:this.hrmsemployeeexitquestiondetailsvisiblelist,  hidelist:this.hrmsemployeeexitquestiondetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeexitquestiondetailssource.add(res);
this.hrmsemployeeexitquestiondetailssource.refresh();
}
else
{
this.hrmsemployeeexitquestiondetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeexitquestiondetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeexitquestiondetailIDs += childID + ",";
this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsemployeeexitquestiondetails
hrmsemployeeexitquestiondetailssettings:any;
hrmsemployeeexitquestiondetailssource: any;

showhrmsemployeeexitquestiondetailsCheckbox()
{
debugger;
if(this.tblhrmsemployeeexitquestiondetailssource.settings['selectMode']== 'multi')this.tblhrmsemployeeexitquestiondetailssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeexitquestiondetailssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeexitquestiondetailssource.initGrid();
}
deletehrmsemployeeexitquestiondetailsAll()
{
this.tblhrmsemployeeexitquestiondetailssource.settings['selectMode'] = 'single';
}
showhrmsemployeeexitquestiondetailsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeexitquestiondetailsTableddConfig();
  });
      if(this.tblhrmsemployeeexitquestiondetailssource.settings!=null)this.tblhrmsemployeeexitquestiondetailssource.settings['hideSubHeader'] =!this.tblhrmsemployeeexitquestiondetailssource.settings['hideSubHeader'];
this.tblhrmsemployeeexitquestiondetailssource.initGrid();
}
showhrmsemployeeexitquestiondetailsInActive()
{
}
enablehrmsemployeeexitquestiondetailsInActive()
{
}
async SethrmsemployeeexitquestiondetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeexitquestiondetails){

this.hrmsemployeeresignationservice.gethrmsemployeeresignationsList().then(res=>
{
var dataresignationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeexitquestiondetailsresignationid3.push(defaultobj);
for(let i=0; i<dataresignationid2.length; i++){
var obj= { value: dataresignationid2[i].resignationid, title:dataresignationid2[i].reference};
this.datahrmsemployeeexitquestiondetailsresignationid3.push(obj);
}
if((this.tblhrmsemployeeexitquestiondetailssource.settings as any).columns['resignationid'])
{
(this.tblhrmsemployeeexitquestiondetailssource.settings as any).columns['resignationid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeexitquestiondetailsresignationid3));
this.tblhrmsemployeeexitquestiondetailssource.initGrid();
}
});

this.umsquestionservice.getumsquestionsList().then(res=>
{
var dataexitquestionid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeexitquestiondetailsexitquestionid3.push(defaultobj);
for(let i=0; i<dataexitquestionid2.length; i++){
var obj= { value: dataexitquestionid2[i].questionid, title:dataexitquestionid2[i].question};
this.datahrmsemployeeexitquestiondetailsexitquestionid3.push(obj);
}
if((this.tblhrmsemployeeexitquestiondetailssource.settings as any).columns['exitquestionid'])
{
(this.tblhrmsemployeeexitquestiondetailssource.settings as any).columns['exitquestionid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeexitquestiondetailsexitquestionid3));
this.tblhrmsemployeeexitquestiondetailssource.initGrid();
}
});

this.configservice.getList("exitquestiontype").then(res=>
{
var dataexitquestiontype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeexitquestiondetailsexitquestiontype3.push(defaultobj);
for(let i=0; i<dataexitquestiontype2.length; i++){
var obj= { value: dataexitquestiontype2[i].configkey, title: dataexitquestiontype2[i].configtext};
this.datahrmsemployeeexitquestiondetailsexitquestiontype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeeexitquestiondetailssource.settings);
if(clone.columns['exitquestiontype']!=undefined)clone.columns['exitquestiontype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeexitquestiondetailsexitquestiontype3)), }, };
if(clone.columns['exitquestiontype']!=undefined)clone.columns['exitquestiontype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeexitquestiondetailsexitquestiontype3)), }, };
this.tblhrmsemployeeexitquestiondetailssource.settings =  clone;
this.tblhrmsemployeeexitquestiondetailssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeeexitquestiondetails=true;
}
async hrmsemployeeexitquestiondetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeexitquestiondetailsTableConfig()
{
this.hrmsemployeeexitquestiondetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
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
resignationid: {
title: 'Resignation',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'fwze5',reportcode:'fwze5',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeexitquestiondetailsresignationid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
exitquestiontype: {
title: 'Exit Question Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeexitquestiondetailsexitquestiontype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
question: {
title: 'Question',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
answer: {
title: 'Answer',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
hrmsemployeeexitquestiondetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeexitquestiondetailsID)>=0)
{
this.hrmsemployeeexitquestiondetailssource=new LocalDataSource();
this.hrmsemployeeexitquestiondetailssource.load(this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails as  any as LocalDataSource);
this.hrmsemployeeexitquestiondetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeexitquestiondetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.length == 0)
{
    this.tblhrmsemployeeexitquestiondetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeexitquestiondetail();
    this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.push(obj);
    this.hrmsemployeeexitquestiondetailssource.refresh();
    if ((this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.length / this.hrmsemployeeexitquestiondetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeexitquestiondetailssource.getPaging().page)
    {
        this.hrmsemployeeexitquestiondetailssource.setPage((this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.length / this.hrmsemployeeexitquestiondetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeexitquestiondetailssource.grid.edit(this.tblhrmsemployeeexitquestiondetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeexitquestiondetailssource.data.indexOf(event.data);
this.onDeletehrmsemployeeexitquestiondetail(event,event.data.exitquestiondetailid,((this.hrmsemployeeexitquestiondetailssource.getPaging().page-1) *this.hrmsemployeeexitquestiondetailssource.getPaging().perPage)+index);
this.hrmsemployeeexitquestiondetailssource.refresh();
break;
}
}

*/
hrmsemployeeexitquestiondetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeexitquestiondetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeexitquestiondetail(event,event.data.exitquestiondetailid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeexitquestiondetail(event,event.data.exitquestiondetailid,((this.hrmsemployeeexitquestiondetailssource.getPaging().page-1) *this.hrmsemployeeexitquestiondetailssource.getPaging().perPage)+event.index);
this.hrmsemployeeexitquestiondetailssource.refresh();
break;
}
}
hrmsemployeeexitquestiondetailsonDelete(obj) {
let exitquestiondetailid=obj.data.exitquestiondetailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeexitquestionservice.deletehrmsemployeeexitquestion(exitquestiondetailid).then(res=>
this.hrmsemployeeexitquestiondetailsLoadTable()
);
}
}
hrmsemployeeexitquestiondetailsPaging(val)
{
debugger;
this.hrmsemployeeexitquestiondetailssource.setPaging(1, val, true);
}

handlehrmsemployeeexitquestiondetailsGridSelected(event:any) {
this.hrmsemployeeexitquestiondetailsselectedindex=this.hrmsemployeeexitquestionservice.hrmsemployeeexitquestiondetails.findIndex(i => i.exitquestiondetailid === event.data.exitquestiondetailid);
}
IshrmsemployeeexitquestiondetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeexitquestiondetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeexitquestiondetails

}



