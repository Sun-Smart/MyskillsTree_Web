import { camsworktimelogService } from './../../../service/camsworktimelog.service';
import { camsworktimelog } from './../../../model/camsworktimelog.model';
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
import { camsworkdetail} from './../../../model/camsworkdetail.model';
import { camsworkdetailComponent } from './../../../pages/forms/camsworkdetail/camsworkdetail.component';
import { camsworkdetailService } from './../../../service/camsworkdetail.service';
//popups
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { camspmtask} from './../../../model/camspmtask.model';
import { camspmtaskComponent } from './../../../pages/forms/camspmtask/camspmtask.component';
import { camspmtaskService } from './../../../service/camspmtask.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { camsworkreading } from './../../../model/camsworkreading.model';
import { camsworkreadingComponent } from './../../../pages/forms/camsworkreading/camsworkreading.component';
//FK services
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
selector: 'app-camsworktimelog',
templateUrl: './camsworktimelog.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworktimelogComponent implements OnInit {
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
bfilterPopulatecamsworktimelogs:boolean=false;
datacamsworktimelogsworkorderdetailid3:any=[];
datacamsworktimelogsworkorderid3:any=[];
datacamsworktimelogspmid3:any=[];
datacamsworktimelogspmtaskid3:any=[];
datacamsworktimelogstasktype3:any=[];
datacamsworktimelogsuserid3:any=[];
datacamsworkreadingsworkorderid3:any=[];
datacamsworkreadingslogid3:any=[];
bfilterPopulatecamsworkreadings:boolean=false;
@ViewChild('tblcamsworkreadingssource',{static:false}) tblcamsworkreadingssource: Ng2SmartTableComponent;
 camsworktimelogForm: FormGroup;
workorderdetailidList: camsworkdetail[];
workorderdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderdetailid_camsworkdetailsForm: FormGroup;//autocomplete
workorderdetailid_camsworkdetailsoptions:any;//autocomplete
workorderdetailid_camsworkdetailsformatter:any;//autocomplete
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
pmtaskidList: camspmtask[];
pmtaskidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmtaskid_camspmtasksForm: FormGroup;//autocomplete
pmtaskid_camspmtasksoptions:any;//autocomplete
pmtaskid_camspmtasksformatter:any;//autocomplete
tasktypeList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsworktimelogshowOption:boolean;
camsworkreadingshowOption:boolean;
sessiondata:any;
sourcekey:any;

scheduleidvisible:boolean = false;
scheduletaskidvisible:boolean = false;
pmidvisible:boolean = false;
workorderdetailidvisible:boolean = false;
workorderidvisible:boolean = false;


camsworkreadingsvisiblelist:any;
camsworkreadingshidelist:any;

DeletedcamsworkreadingIDs: string="";
camsworkreadingsID: string = "1";
camsworkreadingsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsworktimelogservice: camsworktimelogService,
private camsworkorderservice: camsworkorderService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsworkdetailservice:camsworkdetailService,
private camspmmasterservice:camspmmasterService,
private camspmtaskservice:camspmtaskService,
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
this.camsworktimelogForm  = this.fb.group({
pk:[null],
logid: [null],
workorderdetailid: [null],
workorderdetailiddesc: [null],
workorderid: [null],
workorderiddesc: [null],
scheduleid: [null],
scheduletaskid: [null],
pmid: [null],
pmiddesc: [null],
pmtaskid: [null, Validators.required],
pmtaskiddesc: [null],
taskdescription: [null, Validators.required],
tasktype: [null],
tasktypedesc: [null],
meterreading: [null],
userid: [null, Validators.required],
useriddesc: [null],
workeddate: [null],
workduration: [null],
travelduration: [null],
losttime: [null],
comments: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsworktimelogForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworktimelogForm.dirty && this.camsworktimelogForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.logid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.logid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.logid && pkDetail) {
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
let camsworktimelogid = null;

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
this.formid=camsworktimelogid;
//this.sharedService.alert(camsworktimelogid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamsworkreadingsTableConfig();
  setTimeout(() => {
  this.SetcamsworkreadingsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworkdetailservice.getcamsworkdetailsList().then(res => 
{
this.workorderdetailidList = res as camsworkdetail[];
if(this.camsworktimelogservice.formData && this.camsworktimelogservice.formData.workorderdetailid){
this.workorderdetailidoptionsEvent.emit(this.workorderdetailidList);
this.camsworktimelogForm.patchValue({
    workorderdetailid: this.camsworktimelogservice.formData.workorderdetailid,
    workorderdetailiddesc: this.camsworktimelogservice.formData.workorderdetailiddesc,
});
}
{
let arrworkorderdetailid = this.workorderdetailidList.filter(v => v.workorderdetailid == this.camsworktimelogForm.get('workorderdetailid').value);
let objworkorderdetailid;
if (arrworkorderdetailid.length > 0) objworkorderdetailid = arrworkorderdetailid[0];
if (objworkorderdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderdetailid_camsworkdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderdetailidList.filter(v => v.taskdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderdetailid_camsworkdetailsformatter = (result: any) => result.taskdescription;
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsworktimelogservice.formData && this.camsworktimelogservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsworktimelogForm.patchValue({
    workorderid: this.camsworktimelogservice.formData.workorderid,
    workorderiddesc: this.camsworktimelogservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsworktimelogForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_camsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.requestreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_camsworkordersformatter = (result: any) => result.requestreference;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camsworktimelogservice.formData && this.camsworktimelogservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camsworktimelogForm.patchValue({
    pmid: this.camsworktimelogservice.formData.pmid,
    pmiddesc: this.camsworktimelogservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camsworktimelogForm.get('pmid').value);
let objpmid;
if (arrpmid.length > 0) objpmid = arrpmid[0];
if (objpmid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmid_camspmmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmid_camspmmastersformatter = (result: any) => result.reference;
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.pmtaskidList = res as camspmtask[];
if(this.camsworktimelogservice.formData && this.camsworktimelogservice.formData.pmtaskid){this.camsworktimelogForm.patchValue({
    pmtaskid: this.camsworktimelogservice.formData.pmtaskid,
    pmtaskiddesc: this.camsworktimelogservice.formData.pmtaskiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmtaskid_camspmtasksoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmtaskidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmtaskid_camspmtasksformatter = (result: any) => result.description;
this.configservice.getList("camstasktype").then(res => this.tasktypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.camsworktimelogservice.formData && this.camsworktimelogservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.camsworktimelogForm.patchValue({
    userid: this.camsworktimelogservice.formData.userid,
    useriddesc: this.camsworktimelogservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.camsworktimelogForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.camsworktimelogservice.getcamsworktimelogsList().then(res => {
      this.pkList = res as camsworktimelog[];
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
this.camsworktimelogForm.markAsUntouched();
this.camsworktimelogForm.markAsPristine();
}
onSelectedworkorderdetailid(workorderdetailidDetail: any) {
if (workorderdetailidDetail.workorderdetailid && workorderdetailidDetail) {
this.camsworktimelogForm.patchValue({
workorderdetailid: workorderdetailidDetail.workorderdetailid,
workorderdetailiddesc: workorderdetailidDetail.taskdescription,

});

}
}

onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsworktimelogForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camsworktimelogForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});
this.camspmtaskservice.getListBypmid(pmidDetail.pmid).then(res => {
 this.pmtaskidList = res as camspmtask[]
}).catch((err) => {console.log(err);});

}
}

onSelectedpmtaskid(pmtaskidDetail: any) {
if (pmtaskidDetail.pmtaskid && pmtaskidDetail) {
this.camsworktimelogForm.patchValue({
pmtaskid: pmtaskidDetail.pmtaskid,
pmtaskiddesc: pmtaskidDetail.description,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.camsworktimelogForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.camsworktimelogForm != null)
this.camsworktimelogForm.reset();
this.camsworktimelogForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.camsworktimelogservice.camsworkreadings=[];
this.camsworkreadingsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.scheduleidvisible = false;
this.scheduletaskidvisible = false;
this.pmidvisible = false;
this.workorderdetailidvisible = false;
this.workorderidvisible = false;
}

    onDelete() {
        let logid = this.camsworktimelogForm.get('logid').value;
        if(logid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworktimelogservice.deletecamsworktimelog(logid).then(res =>
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
    this.camsworktimelogForm.patchValue({
        logid: null
    });
    if(this.camsworktimelogservice.formData.logid!=null)this.camsworktimelogservice.formData.logid=null;
for (let i=0;i<this.camsworktimelogservice.camsworkreadings.length;i++) {
this.camsworktimelogservice.camsworkreadings[i].readingid=null;
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
        else if(key=="workeddate")
this.camsworktimelogForm.patchValue({"workeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="comments")
this.camsworktimelogForm.patchValue({"comments":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsworktimelogForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworktimelogForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworktimelogForm.controls[key]!=undefined)
{
this.camsworktimelogForm.controls[key].disable({onlySelf: true});
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
logidonChange(evt:any){
let e=evt.value;
}
workorderdetailidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
scheduletaskidonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
pmtaskidonChange(evt:any){
let e=evt.value;
}
taskdescriptiononChange(evt:any){
let e=evt.value;
}
tasktypeonChange(evt:any){
let e=this.f.tasktype.value as any;
this.camsworktimelogForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
meterreadingonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
workeddateonChange(evt:any){
let e=evt.value;
}
workdurationonChange(evt:any){
let e=evt.value;
}
traveldurationonChange(evt:any){
let e=evt.value;
}
losttimeonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsworktimelogs() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworktimelogservice.getcamsworktimelogsByEID(pkcol).then(res => {

this.camsworktimelogservice.formData=res.camsworktimelog;
let formproperty=res.camsworktimelog.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworktimelog.pkcol;
this.formid=res.camsworktimelog.logid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworktimelog.logid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworktimelogForm.patchValue({
logid: res.camsworktimelog.logid,
workorderdetailid: res.camsworktimelog.workorderdetailid,
workorderdetailiddesc: res.camsworktimelog.workorderdetailiddesc,
workorderid: res.camsworktimelog.workorderid,
workorderiddesc: res.camsworktimelog.workorderiddesc,
scheduleid: res.camsworktimelog.scheduleid,
scheduletaskid: res.camsworktimelog.scheduletaskid,
pmid: res.camsworktimelog.pmid,
pmiddesc: res.camsworktimelog.pmiddesc,
pmtaskid: res.camsworktimelog.pmtaskid,
pmtaskiddesc: res.camsworktimelog.pmtaskiddesc,
taskdescription: res.camsworktimelog.taskdescription,
tasktype: res.camsworktimelog.tasktype,
tasktypedesc: res.camsworktimelog.tasktypedesc,
meterreading: res.camsworktimelog.meterreading,
userid: res.camsworktimelog.userid,
useriddesc: res.camsworktimelog.useriddesc,
workeddate: this.ngbDateParserFormatter.parse(res.camsworktimelog.workeddate),
workduration: res.camsworktimelog.workduration,
travelduration: res.camsworktimelog.travelduration,
losttime: res.camsworktimelog.losttime,
comments: JSON.parse(res.camsworktimelog.comments),
status: res.camsworktimelog.status,
statusdesc: res.camsworktimelog.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("scheduleid")>=0)this.scheduleidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("scheduleid")>=0)this.scheduleidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("scheduletaskid")>=0)this.scheduletaskidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("scheduletaskid")>=0)this.scheduletaskidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("pmid")>=0)this.pmidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("pmid")>=0)this.pmidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("workorderdetailid")>=0)this.workorderdetailidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("workorderdetailid")>=0)this.workorderdetailidvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("workorderid")>=0)this.workorderidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("workorderid")>=0)this.workorderidvisible = false;
this.camsworkreadingsvisiblelist=res.camsworkreadingsvisiblelist;
setTimeout(() => {
if(this.f.pmid.value && this.f.pmid.value!="" && this.f.pmid.value!=null)this.camspmtaskservice.getListBypmid(this.f.pmid.value).then(res =>{
this.pmtaskidList = res as camspmtask[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.camsworktimelogservice.camsworkreadings = res.camsworkreadings;
this.SetcamsworkreadingsTableConfig();
this.camsworkreadingsLoadTable();
  setTimeout(() => {
  this.SetcamsworkreadingsTableddConfig();
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
  for (let key in this.camsworktimelogForm.controls) {
    if (this.camsworktimelogForm.controls[key] != null) {
if(false)
{
if(this.camsworktimelogservice.formData!=null && this.camsworktimelogservice.formData[key]!=null  && this.camsworktimelogservice.formData[key]!='[]' && this.camsworktimelogservice.formData[key]!=undefined && this.camsworktimelogservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworktimelogservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworktimelogservice.formData!=null && this.camsworktimelogservice.formData[key]!=null   && this.camsworktimelogservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworktimelogservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworktimelogservice.formData!=null && this.camsworktimelogservice.formData[key]!=null   && this.camsworktimelogservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworktimelogservice.formData[key]+"'><div class='progress__number'>"+this.camsworktimelogservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworktimelogForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworktimelogForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsworktimelogForm.value;
obj.workeddate=new Date(this.camsworktimelogForm.get('workeddate').value ? this.ngbDateParserFormatter.format(this.camsworktimelogForm.get('workeddate').value)+'  UTC' :null);
if(this.camsworktimelogForm.get('comments').value!=null)obj.comments=JSON.stringify(this.camsworktimelogForm.get('comments').value);
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

private camsworktimelogtoggleOption(){
this.camsworktimelogshowOption = this.camsworktimelogshowOption === true ? false : true;
}

private camsworkreadingtoggleOption(){
this.camsworkreadingshowOption = this.camsworkreadingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworktimelogForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworktimelogForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworktimelogForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworktimelogservice.formData=this.camsworktimelogForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworktimelogForm.controls[key] != null)
    {
        this.camsworktimelogservice.formData[key] = this.camsworktimelogForm.controls[key].value;
    }
}
}
}
this.camsworktimelogservice.formData.workeddate=new Date(this.camsworktimelogForm.get('workeddate').value ? this.ngbDateParserFormatter.format(this.camsworktimelogForm.get('workeddate').value)+'  UTC' :null);
if(this.camsworktimelogForm.get('comments').value!=null)this.camsworktimelogservice.formData.comments=JSON.stringify(this.camsworktimelogForm.get('comments').value);
this.camsworktimelogservice.formData.DeletedcamsworkreadingIDs = this.DeletedcamsworkreadingIDs;
console.log(this.camsworktimelogservice.formData);
this.camsworktimelogservice.formData=this.camsworktimelogForm.value;
this.camsworktimelogservice.saveOrUpdatecamsworktimelogs().subscribe(
async res => {
if (this.camsworkreadingssource.data)
{
    for (let i = 0; i < this.camsworkreadingssource.data.length; i++)
    {
        if (this.camsworkreadingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworkreadingssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworktimelog);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworktimelogservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworktimelog);
}
else
{
this.FillData(res);
}
}
this.camsworktimelogForm.markAsUntouched();
this.camsworktimelogForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkorderdetailid( workorderdetailid) {
/*let ScreenType='2';
this.dialog.open(camsworkdetailComponent, 
{
data: {workorderdetailid:this.camsworktimelogForm.get('workorderdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsworktimelogForm.get('workorderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camsworktimelogForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmtaskid( pmtaskid) {
/*let ScreenType='2';
this.dialog.open(camspmtaskComponent, 
{
data: {pmtaskid:this.camsworktimelogForm.get('pmtaskid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsworktimelogForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamsworkreading(event:any,readingid:any, logid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworkreadingComponent, 
{
data:  {  showview:false,save:false,event,readingid, logid,visiblelist:this.camsworkreadingsvisiblelist,  hidelist:this.camsworkreadingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworkreadingssource.add(res);
this.camsworkreadingssource.refresh();
}
else
{
this.camsworkreadingssource.update(event.data, res);
}
}
});
}

onDeletecamsworkreading(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworkreadingIDs += childID + ",";
this.camsworktimelogservice.camsworkreadings.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camsworkreadings
camsworkreadingssettings:any;
camsworkreadingssource: any;

showcamsworkreadingsCheckbox()
{
debugger;
if(this.tblcamsworkreadingssource.settings['selectMode']== 'multi')this.tblcamsworkreadingssource.settings['selectMode']= 'single';
else
this.tblcamsworkreadingssource.settings['selectMode']= 'multi';
this.tblcamsworkreadingssource.initGrid();
}
deletecamsworkreadingsAll()
{
this.tblcamsworkreadingssource.settings['selectMode'] = 'single';
}
showcamsworkreadingsFilter()
{
  setTimeout(() => {
  this.SetcamsworkreadingsTableddConfig();
  });
      if(this.tblcamsworkreadingssource.settings!=null)this.tblcamsworkreadingssource.settings['hideSubHeader'] =!this.tblcamsworkreadingssource.settings['hideSubHeader'];
this.tblcamsworkreadingssource.initGrid();
}
showcamsworkreadingsInActive()
{
}
enablecamsworkreadingsInActive()
{
}
async SetcamsworkreadingsTableddConfig()
{
if(!this.bfilterPopulatecamsworkreadings){
}
this.bfilterPopulatecamsworkreadings=true;
}
async camsworkreadingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworkreadingsTableConfig()
{
this.camsworkreadingssettings = {
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
workorderid: {
title: 'Work Order',
type: 'number',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
readingdate: {
title: 'Reading Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
meterreading: {
title: 'Meter Reading',
type: '',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camsworkreadingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkreadingsID)>=0)
{
this.camsworkreadingssource=new LocalDataSource();
this.camsworkreadingssource.load(this.camsworktimelogservice.camsworkreadings as  any as LocalDataSource);
this.camsworkreadingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworkreadingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsworktimelogservice.camsworkreadings.length == 0)
{
    this.tblcamsworkreadingssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworkreading();
    this.camsworktimelogservice.camsworkreadings.push(obj);
    this.camsworkreadingssource.refresh();
    if ((this.camsworktimelogservice.camsworkreadings.length / this.camsworkreadingssource.getPaging().perPage).toFixed(0) + 1 != this.camsworkreadingssource.getPaging().page)
    {
        this.camsworkreadingssource.setPage((this.camsworktimelogservice.camsworkreadings.length / this.camsworkreadingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworkreadingssource.grid.edit(this.tblcamsworkreadingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworkreadingssource.data.indexOf(event.data);
this.onDeletecamsworkreading(event,event.data.readingid,((this.camsworkreadingssource.getPaging().page-1) *this.camsworkreadingssource.getPaging().perPage)+index);
this.camsworkreadingssource.refresh();
break;
}
}

*/
camsworkreadingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworkreading(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworkreading(event,event.data.readingid,this.formid);
break;
case 'delete':
this.onDeletecamsworkreading(event,event.data.readingid,((this.camsworkreadingssource.getPaging().page-1) *this.camsworkreadingssource.getPaging().perPage)+event.index);
this.camsworkreadingssource.refresh();
break;
}
}
camsworkreadingsonDelete(obj) {
let readingid=obj.data.readingid;
if (confirm('Are you sure to delete this record ?')) {
this.camsworktimelogservice.deletecamsworktimelog(readingid).then(res=>
this.camsworkreadingsLoadTable()
);
}
}
camsworkreadingsPaging(val)
{
debugger;
this.camsworkreadingssource.setPaging(1, val, true);
}

handlecamsworkreadingsGridSelected(event:any) {
this.camsworkreadingsselectedindex=this.camsworktimelogservice.camsworkreadings.findIndex(i => i.readingid === event.data.readingid);
}
IscamsworkreadingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkreadingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworkreadings

}



