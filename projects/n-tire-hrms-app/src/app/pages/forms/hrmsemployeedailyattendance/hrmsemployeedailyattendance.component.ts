import { hrmsemployeedailyattendanceService } from './../../../service/hrmsemployeedailyattendance.service';
import { hrmsemployeedailyattendance } from './../../../model/hrmsemployeedailyattendance.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { hrmsshiftmaster} from './../../../model/hrmsshiftmaster.model';
import { hrmsshiftmasterService } from './../../../service/hrmsshiftmaster.service';
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
selector: 'app-hrmsemployeedailyattendance',
templateUrl: './hrmsemployeedailyattendance.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeedailyattendanceComponent implements OnInit {
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
bfilterPopulatehrmsemployeedailyattendances:boolean=false;
datahrmsemployeedailyattendancesemployeeid3:any=[];
datahrmsemployeedailyattendancesdepartmentid3:any=[];
datahrmsemployeedailyattendancesshiftid3:any=[];
datahrmsemployeedailyattendancesflag3:any=[];
 hrmsemployeedailyattendanceForm: FormGroup;
employeeidList: bousermaster[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_bousermastersForm: FormGroup;//autocomplete
employeeid_bousermastersoptions:any;//autocomplete
employeeid_bousermastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
shiftidList: hrmsshiftmaster[];
flagList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeedailyattendanceshowOption:boolean;
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
private hrmsemployeedailyattendanceservice: hrmsemployeedailyattendanceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private bomasterdataservice:bomasterdataService,
private hrmsshiftmasterservice:hrmsshiftmasterService,
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
this.hrmsemployeedailyattendanceForm  = this.fb.group({
pk:[null],
attendanceid: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
shiftid: [null],
shiftiddesc: [null],
attendancedate: [null],
shiftin: [null],
shiftout: [null],
actualin: [null],
actualout: [null],
extratime: [null],
shorttime: [null],
flag: [null],
flagdesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeedailyattendanceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeedailyattendanceForm.dirty && this.hrmsemployeedailyattendanceForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.attendanceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.attendanceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.attendanceid && pkDetail) {
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
let hrmsemployeedailyattendanceid = null;

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
this.formid=hrmsemployeedailyattendanceid;
//this.sharedService.alert(hrmsemployeedailyattendanceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.employeeidList = res as bousermaster[];
if(this.hrmsemployeedailyattendanceservice.formData && this.hrmsemployeedailyattendanceservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeedailyattendanceForm.patchValue({
    employeeid: this.hrmsemployeedailyattendanceservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeedailyattendanceservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.userid == this.hrmsemployeedailyattendanceForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.hrmsshiftmasterservice.gethrmsshiftmastersList().then(res => 
{
this.shiftidList = res as hrmsshiftmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("attendanceflag").then(res => this.flagList = res as boconfigvalue[]);

//autocomplete
    this.hrmsemployeedailyattendanceservice.gethrmsemployeedailyattendancesList().then(res => {
      this.pkList = res as hrmsemployeedailyattendance[];
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
this.hrmsemployeedailyattendanceForm.markAsUntouched();
this.hrmsemployeedailyattendanceForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.userid && employeeidDetail) {
this.hrmsemployeedailyattendanceForm.patchValue({
employeeid: employeeidDetail.userid,
employeeiddesc: employeeidDetail.username,

});

}
}




resetForm() {
if (this.hrmsemployeedailyattendanceForm != null)
this.hrmsemployeedailyattendanceForm.reset();
this.hrmsemployeedailyattendanceForm.patchValue({
employeeid: this.sessiondata.userid,
employeeiddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let attendanceid = this.hrmsemployeedailyattendanceForm.get('attendanceid').value;
        if(attendanceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeedailyattendanceservice.deletehrmsemployeedailyattendance(attendanceid).then(res =>
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
    this.hrmsemployeedailyattendanceForm.patchValue({
        attendanceid: null
    });
    if(this.hrmsemployeedailyattendanceservice.formData.attendanceid!=null)this.hrmsemployeedailyattendanceservice.formData.attendanceid=null;
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
        else if(key=="attendancedate")
this.hrmsemployeedailyattendanceForm.patchValue({"attendancedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="shiftin")
this.hrmsemployeedailyattendanceForm.patchValue({"shiftin":new Time(mainscreendata[key]) });
        else if(key=="shiftout")
this.hrmsemployeedailyattendanceForm.patchValue({"shiftout":new Time(mainscreendata[key]) });
        else if(key=="actualin")
this.hrmsemployeedailyattendanceForm.patchValue({"actualin":new Time(mainscreendata[key]) });
        else if(key=="actualout")
this.hrmsemployeedailyattendanceForm.patchValue({"actualout":new Time(mainscreendata[key]) });
        else if(key=="extratime")
this.hrmsemployeedailyattendanceForm.patchValue({"extratime":new Time(mainscreendata[key]) });
        else if(key=="shorttime")
this.hrmsemployeedailyattendanceForm.patchValue({"shorttime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeedailyattendanceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeedailyattendanceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeedailyattendanceForm.controls[key]!=undefined)
{
this.hrmsemployeedailyattendanceForm.controls[key].disable({onlySelf: true});
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
attendanceidonChange(evt:any){
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
this.hrmsemployeedailyattendanceForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
shiftidonChange(evt:any){
let e=evt.value;
this.hrmsemployeedailyattendanceForm.patchValue({shiftiddesc:evt.options[evt.options.selectedIndex].text});
}
attendancedateonChange(evt:any){
let e=evt.value;
}
shiftinonChange(evt:any){
let e=evt.value;
}
shiftoutonChange(evt:any){
let e=evt.value;
}
actualinonChange(evt:any){
let e=evt.value;
}
actualoutonChange(evt:any){
let e=evt.value;
}
extratimeonChange(evt:any){
let e=evt.value;
}
shorttimeonChange(evt:any){
let e=evt.value;
}
flagonChange(evt:any){
let e=this.f.flag.value as any;
this.hrmsemployeedailyattendanceForm.patchValue({flagdesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeedailyattendances() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeedailyattendanceservice.gethrmsemployeedailyattendancesByEID(pkcol).then(res => {

this.hrmsemployeedailyattendanceservice.formData=res.hrmsemployeedailyattendance;
let formproperty=res.hrmsemployeedailyattendance.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeedailyattendance.pkcol;
this.formid=res.hrmsemployeedailyattendance.attendanceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeedailyattendance.attendanceid;
var shiftinTime=new Time( res.hrmsemployeedailyattendance.shiftin);
var shiftoutTime=new Time( res.hrmsemployeedailyattendance.shiftout);
var actualinTime=new Time( res.hrmsemployeedailyattendance.actualin);
var actualoutTime=new Time( res.hrmsemployeedailyattendance.actualout);
var extratimeTime=new Time( res.hrmsemployeedailyattendance.extratime);
var shorttimeTime=new Time( res.hrmsemployeedailyattendance.shorttime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeedailyattendanceForm.patchValue({
attendanceid: res.hrmsemployeedailyattendance.attendanceid,
employeeid: res.hrmsemployeedailyattendance.employeeid,
employeeiddesc: res.hrmsemployeedailyattendance.employeeiddesc,
employeename: res.hrmsemployeedailyattendance.employeename,
departmentid: res.hrmsemployeedailyattendance.departmentid,
departmentiddesc: res.hrmsemployeedailyattendance.departmentiddesc,
shiftid: res.hrmsemployeedailyattendance.shiftid,
shiftiddesc: res.hrmsemployeedailyattendance.shiftiddesc,
attendancedate: this.ngbDateParserFormatter.parse(res.hrmsemployeedailyattendance.attendancedate),
shiftin: shiftinTime,
shiftout: shiftoutTime,
actualin: actualinTime,
actualout: actualoutTime,
extratime: extratimeTime,
shorttime: shorttimeTime,
flag: res.hrmsemployeedailyattendance.flag,
flagdesc: res.hrmsemployeedailyattendance.flagdesc,
remarks: res.hrmsemployeedailyattendance.remarks,
status: res.hrmsemployeedailyattendance.status,
statusdesc: res.hrmsemployeedailyattendance.statusdesc,
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
  for (let key in this.hrmsemployeedailyattendanceForm.controls) {
    if (this.hrmsemployeedailyattendanceForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeedailyattendanceservice.formData!=null && this.hrmsemployeedailyattendanceservice.formData[key]!=null  && this.hrmsemployeedailyattendanceservice.formData[key]!='[]' && this.hrmsemployeedailyattendanceservice.formData[key]!=undefined && this.hrmsemployeedailyattendanceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeedailyattendanceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeedailyattendanceservice.formData!=null && this.hrmsemployeedailyattendanceservice.formData[key]!=null   && this.hrmsemployeedailyattendanceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeedailyattendanceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeedailyattendanceservice.formData!=null && this.hrmsemployeedailyattendanceservice.formData[key]!=null   && this.hrmsemployeedailyattendanceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeedailyattendanceservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeedailyattendanceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeedailyattendanceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeedailyattendanceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeedailyattendanceForm.value;
obj.attendancedate=new Date(this.hrmsemployeedailyattendanceForm.get('attendancedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedailyattendanceForm.get('attendancedate').value)+'  UTC' :null);
obj.shiftin=(this.hrmsemployeedailyattendanceForm.get('shiftin').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftin').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shiftin').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftin').value.minute+":00");
obj.shiftout=(this.hrmsemployeedailyattendanceForm.get('shiftout').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftout').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shiftout').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftout').value.minute+":00");
obj.actualin=(this.hrmsemployeedailyattendanceForm.get('actualin').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualin').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('actualin').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualin').value.minute+":00");
obj.actualout=(this.hrmsemployeedailyattendanceForm.get('actualout').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualout').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('actualout').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualout').value.minute+":00");
obj.extratime=(this.hrmsemployeedailyattendanceForm.get('extratime').value==null?0:this.hrmsemployeedailyattendanceForm.get('extratime').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('extratime').value==null?0:this.hrmsemployeedailyattendanceForm.get('extratime').value.minute+":00");
obj.shorttime=(this.hrmsemployeedailyattendanceForm.get('shorttime').value==null?0:this.hrmsemployeedailyattendanceForm.get('shorttime').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shorttime').value==null?0:this.hrmsemployeedailyattendanceForm.get('shorttime').value.minute+":00");
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

private hrmsemployeedailyattendancetoggleOption(){
this.hrmsemployeedailyattendanceshowOption = this.hrmsemployeedailyattendanceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeedailyattendanceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeedailyattendanceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeedailyattendanceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeedailyattendanceservice.formData=this.hrmsemployeedailyattendanceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeedailyattendanceForm.controls[key] != null)
    {
        this.hrmsemployeedailyattendanceservice.formData[key] = this.hrmsemployeedailyattendanceForm.controls[key].value;
    }
}
}
}
this.hrmsemployeedailyattendanceservice.formData.attendancedate=new Date(this.hrmsemployeedailyattendanceForm.get('attendancedate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeedailyattendanceForm.get('attendancedate').value)+'  UTC' :null);
this.hrmsemployeedailyattendanceservice.formData.shiftin=(this.hrmsemployeedailyattendanceForm.get('shiftin').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftin').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shiftin').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftin').value.minute+":00");
this.hrmsemployeedailyattendanceservice.formData.shiftout=(this.hrmsemployeedailyattendanceForm.get('shiftout').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftout').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shiftout').value==null?0:this.hrmsemployeedailyattendanceForm.get('shiftout').value.minute+":00");
this.hrmsemployeedailyattendanceservice.formData.actualin=(this.hrmsemployeedailyattendanceForm.get('actualin').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualin').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('actualin').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualin').value.minute+":00");
this.hrmsemployeedailyattendanceservice.formData.actualout=(this.hrmsemployeedailyattendanceForm.get('actualout').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualout').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('actualout').value==null?0:this.hrmsemployeedailyattendanceForm.get('actualout').value.minute+":00");
this.hrmsemployeedailyattendanceservice.formData.extratime=(this.hrmsemployeedailyattendanceForm.get('extratime').value==null?0:this.hrmsemployeedailyattendanceForm.get('extratime').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('extratime').value==null?0:this.hrmsemployeedailyattendanceForm.get('extratime').value.minute+":00");
this.hrmsemployeedailyattendanceservice.formData.shorttime=(this.hrmsemployeedailyattendanceForm.get('shorttime').value==null?0:this.hrmsemployeedailyattendanceForm.get('shorttime').value.hour)+':'+(this.hrmsemployeedailyattendanceForm.get('shorttime').value==null?0:this.hrmsemployeedailyattendanceForm.get('shorttime').value.minute+":00");
console.log(this.hrmsemployeedailyattendanceservice.formData);
this.hrmsemployeedailyattendanceservice.formData=this.hrmsemployeedailyattendanceForm.value;
this.hrmsemployeedailyattendanceservice.saveOrUpdatehrmsemployeedailyattendances().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeedailyattendance);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeedailyattendanceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeedailyattendance);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeedailyattendanceForm.markAsUntouched();
this.hrmsemployeedailyattendanceForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeedailyattendanceForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeedailyattendanceForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshiftid( shiftid) {
/*let ScreenType='2';
this.dialog.open(hrmsshiftmasterComponent, 
{
data: {shiftid:this.hrmsemployeedailyattendanceForm.get('shiftid').value, ScreenType:2 }
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



