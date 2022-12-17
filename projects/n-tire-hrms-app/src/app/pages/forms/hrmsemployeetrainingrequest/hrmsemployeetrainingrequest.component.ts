import { hrmsemployeetrainingrequestService } from './../../../service/hrmsemployeetrainingrequest.service';
import { hrmsemployeetrainingrequest } from './../../../model/hrmsemployeetrainingrequest.model';
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
import { umscourse} from '../../../../../../n-tire-learn-app/src/app/model/umscourse.model';
import { umscourseService } from '../../../../../../n-tire-learn-app/src/app/service/umscourse.service';
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

@Component({
selector: 'app-hrmsemployeetrainingrequest',
templateUrl: './hrmsemployeetrainingrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeetrainingrequestComponent implements OnInit {
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
bfilterPopulatehrmsemployeetrainingrequests:boolean=false;
datahrmsemployeetrainingrequestsbranchid3:any=[];
datahrmsemployeetrainingrequestsemployeeid3:any=[];
datahrmsemployeetrainingrequestsdepartmentid3:any=[];
datahrmsemployeetrainingrequestsdesignationid3:any=[];
datahrmsemployeetrainingrequestscourse3:any=[];
 hrmsemployeetrainingrequestForm: FormGroup;
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
courseList: umscourse[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeetrainingrequestshowOption:boolean;
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
private hrmsemployeetrainingrequestservice: hrmsemployeetrainingrequestService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
private umscourseservice:umscourseService,
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
this.hrmsemployeetrainingrequestForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
requestid: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
course: [null],
coursedesc: [null],
skilllevel: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeetrainingrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeetrainingrequestForm.dirty && this.hrmsemployeetrainingrequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.requestid && pkDetail) {
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
let hrmsemployeetrainingrequestid = null;

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
this.formid=hrmsemployeetrainingrequestid;
//this.sharedService.alert(hrmsemployeetrainingrequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
if(this.hrmsemployeetrainingrequestservice.formData && this.hrmsemployeetrainingrequestservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmsemployeetrainingrequestForm.patchValue({
    branchid: this.hrmsemployeetrainingrequestservice.formData.branchid,
    branchiddesc: this.hrmsemployeetrainingrequestservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmsemployeetrainingrequestForm.get('branchid').value);
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
if(this.hrmsemployeetrainingrequestservice.formData && this.hrmsemployeetrainingrequestservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeetrainingrequestForm.patchValue({
    employeeid: this.hrmsemployeetrainingrequestservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeetrainingrequestservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeetrainingrequestForm.get('employeeid').value);
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
this.umscourseservice.getumscoursesList().then(res => 
{
this.courseList = res as umscourse[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsemployeetrainingrequestservice.gethrmsemployeetrainingrequestsList().then(res => {
      this.pkList = res as hrmsemployeetrainingrequest[];
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
this.hrmsemployeetrainingrequestForm.markAsUntouched();
this.hrmsemployeetrainingrequestForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmsemployeetrainingrequestForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeetrainingrequestForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsemployeetrainingrequestForm != null)
this.hrmsemployeetrainingrequestForm.reset();
this.hrmsemployeetrainingrequestForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let requestid = this.hrmsemployeetrainingrequestForm.get('requestid').value;
        if(requestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeetrainingrequestservice.deletehrmsemployeetrainingrequest(requestid).then(res =>
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
    this.hrmsemployeetrainingrequestForm.patchValue({
        requestid: null
    });
    if(this.hrmsemployeetrainingrequestservice.formData.requestid!=null)this.hrmsemployeetrainingrequestservice.formData.requestid=null;
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
        else if(ctrltype=="string")
{
this.hrmsemployeetrainingrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeetrainingrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeetrainingrequestForm.controls[key]!=undefined)
{
this.hrmsemployeetrainingrequestForm.controls[key].disable({onlySelf: true});
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
requestidonChange(evt:any){
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
this.hrmsemployeetrainingrequestForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.hrmsemployeetrainingrequestForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
courseonChange(evt:any){
let e=evt.value;
this.hrmsemployeetrainingrequestForm.patchValue({coursedesc:evt.options[evt.options.selectedIndex].text});
}
skilllevelonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeetrainingrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeetrainingrequestservice.gethrmsemployeetrainingrequestsByEID(pkcol).then(res => {

this.hrmsemployeetrainingrequestservice.formData=res.hrmsemployeetrainingrequest;
let formproperty=res.hrmsemployeetrainingrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeetrainingrequest.pkcol;
this.formid=res.hrmsemployeetrainingrequest.requestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeetrainingrequest.requestid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeetrainingrequestForm.patchValue({
branchid: res.hrmsemployeetrainingrequest.branchid,
branchiddesc: res.hrmsemployeetrainingrequest.branchiddesc,
requestid: res.hrmsemployeetrainingrequest.requestid,
employeeid: res.hrmsemployeetrainingrequest.employeeid,
employeeiddesc: res.hrmsemployeetrainingrequest.employeeiddesc,
employeename: res.hrmsemployeetrainingrequest.employeename,
departmentid: res.hrmsemployeetrainingrequest.departmentid,
departmentiddesc: res.hrmsemployeetrainingrequest.departmentiddesc,
designationid: res.hrmsemployeetrainingrequest.designationid,
designationiddesc: res.hrmsemployeetrainingrequest.designationiddesc,
course: res.hrmsemployeetrainingrequest.course,
coursedesc: res.hrmsemployeetrainingrequest.coursedesc,
skilllevel: res.hrmsemployeetrainingrequest.skilllevel,
status: res.hrmsemployeetrainingrequest.status,
statusdesc: res.hrmsemployeetrainingrequest.statusdesc,
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
  for (let key in this.hrmsemployeetrainingrequestForm.controls) {
    if (this.hrmsemployeetrainingrequestForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeetrainingrequestservice.formData!=null && this.hrmsemployeetrainingrequestservice.formData[key]!=null  && this.hrmsemployeetrainingrequestservice.formData[key]!='[]' && this.hrmsemployeetrainingrequestservice.formData[key]!=undefined && this.hrmsemployeetrainingrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeetrainingrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeetrainingrequestservice.formData!=null && this.hrmsemployeetrainingrequestservice.formData[key]!=null   && this.hrmsemployeetrainingrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeetrainingrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeetrainingrequestservice.formData!=null && this.hrmsemployeetrainingrequestservice.formData[key]!=null   && this.hrmsemployeetrainingrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeetrainingrequestservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeetrainingrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeetrainingrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeetrainingrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeetrainingrequestForm.value;
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

private hrmsemployeetrainingrequesttoggleOption(){
this.hrmsemployeetrainingrequestshowOption = this.hrmsemployeetrainingrequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeetrainingrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeetrainingrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeetrainingrequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeetrainingrequestservice.formData=this.hrmsemployeetrainingrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeetrainingrequestForm.controls[key] != null)
    {
        this.hrmsemployeetrainingrequestservice.formData[key] = this.hrmsemployeetrainingrequestForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsemployeetrainingrequestservice.formData);
this.hrmsemployeetrainingrequestservice.formData=this.hrmsemployeetrainingrequestForm.value;
this.hrmsemployeetrainingrequestservice.saveOrUpdatehrmsemployeetrainingrequests().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeetrainingrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeetrainingrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeetrainingrequest);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeetrainingrequestForm.markAsUntouched();
this.hrmsemployeetrainingrequestForm.markAsPristine();
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
data: {branchid:this.hrmsemployeetrainingrequestForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeetrainingrequestForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeetrainingrequestForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcourse( courseid) {
/*let ScreenType='2';
this.dialog.open(umscourseComponent, 
{
data: {courseid:this.hrmsemployeetrainingrequestForm.get('course').value, ScreenType:2 }
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



