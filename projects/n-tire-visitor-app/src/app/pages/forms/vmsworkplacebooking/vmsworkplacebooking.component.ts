import { vmsworkplacebookingService } from './../../../service/vmsworkplacebooking.service';
import { vmsworkplacebooking } from './../../../model/vmsworkplacebooking.model';
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
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { vmsworkplace} from './../../../model/vmsworkplace.model';
import { vmsworkplaceComponent } from './../../../pages/forms/vmsworkplace/vmsworkplace.component';
import { vmsworkplaceService } from './../../../service/vmsworkplace.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
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
selector: 'app-vmsworkplacebooking',
templateUrl: './vmsworkplacebooking.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class vmsworkplacebookingComponent implements OnInit {
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
bfilterPopulatevmsworkplacebookings:boolean=false;
datavmsworkplacebookingslocationid3:any=[];
datavmsworkplacebookingsworkplaceid3:any=[];
datavmsworkplacebookingsassignedto3:any=[];
datavmsworkplacebookingsbookstatus3:any=[];
 vmsworkplacebookingForm: FormGroup;
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
workplaceidList: vmsworkplace[];
assignedtoList: hrmsemployee[];
assignedtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignedto_hrmsemployeesForm: FormGroup;//autocomplete
assignedto_hrmsemployeesoptions:any;//autocomplete
assignedto_hrmsemployeesformatter:any;//autocomplete
bookstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
vmsworkplacebookingshowOption:boolean;
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
private vmsworkplacebookingservice: vmsworkplacebookingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchlocationservice:bobranchlocationService,
private vmsworkplaceservice:vmsworkplaceService,
private hrmsemployeeservice:hrmsemployeeService,
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
this.vmsworkplacebookingForm  = this.fb.group({
pk:[null],
bookingid: [null],
locationid: [null, Validators.required],
locationiddesc: [null],
workplaceid: [null, Validators.required],
workplaceiddesc: [null],
startdate: [null],
starttime: [null],
enddate: [null],
endtime: [null],
assignedto: [null, Validators.required],
assignedtodesc: [null],
bookstatus: [null],
bookstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.vmsworkplacebookingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.vmsworkplacebookingForm.dirty && this.vmsworkplacebookingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.bookingid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.bookingid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.bookingid && pkDetail) {
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
let vmsworkplacebookingid = null;

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
this.formid=vmsworkplacebookingid;
//this.sharedService.alert(vmsworkplacebookingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.vmsworkplacebookingservice.formData && this.vmsworkplacebookingservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.vmsworkplacebookingForm.patchValue({
    locationid: this.vmsworkplacebookingservice.formData.locationid,
    locationiddesc: this.vmsworkplacebookingservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.vmsworkplacebookingForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.vmsworkplaceservice.getvmsworkplacesList().then(res => 
{
this.workplaceidList = res as vmsworkplace[];
}
).catch((err) => {console.log(err);});
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.assignedtoList = res as hrmsemployee[];
if(this.vmsworkplacebookingservice.formData && this.vmsworkplacebookingservice.formData.assignedto){
this.assignedtooptionsEvent.emit(this.assignedtoList);
this.vmsworkplacebookingForm.patchValue({
    assignedto: this.vmsworkplacebookingservice.formData.assignedto,
    assignedtodesc: this.vmsworkplacebookingservice.formData.assignedtodesc,
});
}
{
let arrassignedto = this.assignedtoList.filter(v => v.employeeid == this.vmsworkplacebookingForm.get('assignedto').value);
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignedto_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignedtoList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignedto_hrmsemployeesformatter = (result: any) => result.employeename;
this.configservice.getList("bookstatus").then(res => this.bookstatusList = res as boconfigvalue[]);

//autocomplete
    this.vmsworkplacebookingservice.getvmsworkplacebookingsList().then(res => {
      this.pkList = res as vmsworkplacebooking[];
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
this.vmsworkplacebookingForm.markAsUntouched();
this.vmsworkplacebookingForm.markAsPristine();
}
onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.vmsworkplacebookingForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelectedassignedto(assignedtoDetail: any) {
if (assignedtoDetail.employeeid && assignedtoDetail) {
this.vmsworkplacebookingForm.patchValue({
assignedto: assignedtoDetail.employeeid,
assignedtodesc: assignedtoDetail.employeename,

});

}
}




resetForm() {
if (this.vmsworkplacebookingForm != null)
this.vmsworkplacebookingForm.reset();
this.vmsworkplacebookingForm.patchValue({
});
this.vmsworkplacebookingForm.patchValue({
startdate: this.ngbDateParserFormatter.parse(new Date().toString()),
starttime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
enddate: this.ngbDateParserFormatter.parse(this.sharedService.addDays(new Date(),1).toString()),
endtime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let bookingid = this.vmsworkplacebookingForm.get('bookingid').value;
        if(bookingid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.vmsworkplacebookingservice.deletevmsworkplacebooking(bookingid).then(res =>
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
    this.vmsworkplacebookingForm.patchValue({
        bookingid: null
    });
    if(this.vmsworkplacebookingservice.formData.bookingid!=null)this.vmsworkplacebookingservice.formData.bookingid=null;
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
        else if(key=="startdate")
this.vmsworkplacebookingForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="starttime")
this.vmsworkplacebookingForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="enddate")
this.vmsworkplacebookingForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="endtime")
this.vmsworkplacebookingForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.vmsworkplacebookingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.vmsworkplacebookingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.vmsworkplacebookingForm.controls[key]!=undefined)
{
this.vmsworkplacebookingForm.controls[key].disable({onlySelf: true});
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
bookingidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
workplaceidonChange(evt:any){
let e=evt.value;
this.vmsworkplacebookingForm.patchValue({workplaceiddesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
starttimeonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
endtimeonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
}
bookstatusonChange(evt:any){
let e=this.f.bookstatus.value as any;
this.vmsworkplacebookingForm.patchValue({bookstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

editvmsworkplacebookings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.vmsworkplacebookingservice.getvmsworkplacebookingsByEID(pkcol).then(res => {

this.vmsworkplacebookingservice.formData=res.vmsworkplacebooking;
let formproperty=res.vmsworkplacebooking.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.vmsworkplacebooking.pkcol;
this.formid=res.vmsworkplacebooking.bookingid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.vmsworkplacebooking.bookingid;
var starttimeTime=new Time( res.vmsworkplacebooking.starttime);
var endtimeTime=new Time( res.vmsworkplacebooking.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.vmsworkplacebookingForm.patchValue({
bookingid: res.vmsworkplacebooking.bookingid,
locationid: res.vmsworkplacebooking.locationid,
locationiddesc: res.vmsworkplacebooking.locationiddesc,
workplaceid: res.vmsworkplacebooking.workplaceid,
workplaceiddesc: res.vmsworkplacebooking.workplaceiddesc,
startdate: this.ngbDateParserFormatter.parse(res.vmsworkplacebooking.startdate),
starttime: starttimeTime,
enddate: this.ngbDateParserFormatter.parse(res.vmsworkplacebooking.enddate),
endtime: endtimeTime,
assignedto: res.vmsworkplacebooking.assignedto,
assignedtodesc: res.vmsworkplacebooking.assignedtodesc,
bookstatus: res.vmsworkplacebooking.bookstatus,
bookstatusdesc: res.vmsworkplacebooking.bookstatusdesc,
status: res.vmsworkplacebooking.status,
statusdesc: res.vmsworkplacebooking.statusdesc,
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
  for (let key in this.vmsworkplacebookingForm.controls) {
    if (this.vmsworkplacebookingForm.controls[key] != null) {
if(false)
{
if(this.vmsworkplacebookingservice.formData!=null && this.vmsworkplacebookingservice.formData[key]!=null  && this.vmsworkplacebookingservice.formData[key]!='[]' && this.vmsworkplacebookingservice.formData[key]!=undefined && this.vmsworkplacebookingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.vmsworkplacebookingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.vmsworkplacebookingservice.formData!=null && this.vmsworkplacebookingservice.formData[key]!=null   && this.vmsworkplacebookingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.vmsworkplacebookingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.vmsworkplacebookingservice.formData!=null && this.vmsworkplacebookingservice.formData[key]!=null   && this.vmsworkplacebookingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.vmsworkplacebookingservice.formData[key]+"'><div class='progress__number'>"+this.vmsworkplacebookingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.vmsworkplacebookingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.vmsworkplacebookingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.vmsworkplacebookingForm.value;
obj.startdate=new Date(this.vmsworkplacebookingForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacebookingForm.get('startdate').value)+'  UTC' :null);
obj.starttime=(this.vmsworkplacebookingForm.get('starttime').value==null?0:this.vmsworkplacebookingForm.get('starttime').value.hour)+':'+(this.vmsworkplacebookingForm.get('starttime').value==null?0:this.vmsworkplacebookingForm.get('starttime').value.minute+":00");
obj.enddate=new Date(this.vmsworkplacebookingForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacebookingForm.get('enddate').value)+'  UTC' :null);
obj.endtime=(this.vmsworkplacebookingForm.get('endtime').value==null?0:this.vmsworkplacebookingForm.get('endtime').value.hour)+':'+(this.vmsworkplacebookingForm.get('endtime').value==null?0:this.vmsworkplacebookingForm.get('endtime').value.minute+":00");
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

private vmsworkplacebookingtoggleOption(){
this.vmsworkplacebookingshowOption = this.vmsworkplacebookingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.vmsworkplacebookingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.vmsworkplacebookingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.vmsworkplacebookingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.vmsworkplacebookingservice.formData=this.vmsworkplacebookingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.vmsworkplacebookingForm.controls[key] != null)
    {
        this.vmsworkplacebookingservice.formData[key] = this.vmsworkplacebookingForm.controls[key].value;
    }
}
}
}
this.vmsworkplacebookingservice.formData.startdate=new Date(this.vmsworkplacebookingForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacebookingForm.get('startdate').value)+'  UTC' :null);
this.vmsworkplacebookingservice.formData.starttime=(this.vmsworkplacebookingForm.get('starttime').value==null?0:this.vmsworkplacebookingForm.get('starttime').value.hour)+':'+(this.vmsworkplacebookingForm.get('starttime').value==null?0:this.vmsworkplacebookingForm.get('starttime').value.minute+":00");
this.vmsworkplacebookingservice.formData.enddate=new Date(this.vmsworkplacebookingForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.vmsworkplacebookingForm.get('enddate').value)+'  UTC' :null);
this.vmsworkplacebookingservice.formData.endtime=(this.vmsworkplacebookingForm.get('endtime').value==null?0:this.vmsworkplacebookingForm.get('endtime').value.hour)+':'+(this.vmsworkplacebookingForm.get('endtime').value==null?0:this.vmsworkplacebookingForm.get('endtime').value.minute+":00");
console.log(this.vmsworkplacebookingservice.formData);
this.vmsworkplacebookingservice.formData=this.vmsworkplacebookingForm.value;
this.vmsworkplacebookingservice.saveOrUpdatevmsworkplacebookings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsworkplacebooking);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.vmsworkplacebookingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).vmsworkplacebooking);
}
else
{
this.FillData(res);
}
}
this.vmsworkplacebookingForm.markAsUntouched();
this.vmsworkplacebookingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.vmsworkplacebookingForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkplaceid( workplaceid) {
/*let ScreenType='2';
this.dialog.open(vmsworkplaceComponent, 
{
data: {workplaceid:this.vmsworkplacebookingForm.get('workplaceid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignedto( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.vmsworkplacebookingForm.get('assignedto').value, ScreenType:2 }
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



