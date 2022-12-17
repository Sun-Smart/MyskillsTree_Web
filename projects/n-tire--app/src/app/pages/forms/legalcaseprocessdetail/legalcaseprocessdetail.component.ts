import { legalcaseprocessdetailService } from './../../../service/legalcaseprocessdetail.service';
import { legalcaseprocessdetail } from './../../../model/legalcaseprocessdetail.model';
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
import { legalcourtprocessmaster} from './../../../model/legalcourtprocessmaster.model';
import { legalcourtprocessmasterComponent } from './../../../pages/forms/legalcourtprocessmaster/legalcourtprocessmaster.component';
import { legalcourtprocessmasterService } from './../../../service/legalcourtprocessmaster.service';
//popups
import { legallawyermaster} from './../../../model/legallawyermaster.model';
import { legallawyermasterComponent } from './../../../pages/forms/legallawyermaster/legallawyermaster.component';
import { legallawyermasterService } from './../../../service/legallawyermaster.service';
//popups
//detail table services
import { boexpense } from '../../../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-legalcaseprocessdetail',
templateUrl: './legalcaseprocessdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcaseprocessdetailComponent implements OnInit {
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
bfilterPopulatelegalcaseprocessdetails:boolean=false;
datalegalcaseprocessdetailsprocessid3:any=[];
datalegalcaseprocessdetailslawyerid3:any=[];
databoexpensescostcenterid3:any=[];
databoexpensesrequesteduserid3:any=[];
databoexpensesexpensetype3:any=[];
databoexpensesexpensecategory3:any=[];
databoexpensescurrency3:any=[];
databoexpensesbasecurrency3:any=[];
bfilterPopulateboexpenses:boolean=false;
@ViewChild('tblboexpensessource',{static:false}) tblboexpensessource: Ng2SmartTableComponent;
 legalcaseprocessdetailForm: FormGroup;
processidList: legalcourtprocessmaster[];
processidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
processid_legalcourtprocessmastersForm: FormGroup;//autocomplete
processid_legalcourtprocessmastersoptions:any;//autocomplete
processid_legalcourtprocessmastersformatter:any;//autocomplete
lawyeridList: legallawyermaster[];
lawyeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
lawyerid_legallawyermastersForm: FormGroup;//autocomplete
lawyerid_legallawyermastersoptions:any;//autocomplete
lawyerid_legallawyermastersformatter:any;//autocomplete
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
legalcaseprocessdetailshowOption:boolean;
boexpenseshowOption:boolean;
sessiondata:any;
sourcekey:any;



boexpensesvisiblelist:any;
boexpenseshidelist:any;

DeletedboexpenseIDs: string="";
boexpensesID: string = "1";
boexpensesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcaseprocessdetailservice: legalcaseprocessdetailService,
private erpfacostcenterservice: erpfacostcenterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legalcourtprocessmasterservice:legalcourtprocessmasterService,
private legallawyermasterservice:legallawyermasterService,
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
this.legalcaseprocessdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
caseid: [null],
caseprocessid: [null],
internalreferencenumber: [null],
processid: [null, Validators.required],
processiddesc: [null],
lawyerid: [null],
lawyeriddesc: [null],
assignto: [null],
estimatedtime: [null],
timespent: [null],
processdetails: [null, Validators.required],
actiontobetaken: [null],
remarks: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcaseprocessdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcaseprocessdetailForm.dirty && this.legalcaseprocessdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.caseprocessid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.caseprocessid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.caseprocessid && pkDetail) {
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
let legalcaseprocessdetailid = null;

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
this.formid=legalcaseprocessdetailid;
//this.sharedService.alert(legalcaseprocessdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboexpensesTableConfig();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legalcourtprocessmasterservice.getlegalcourtprocessmastersList().then(res => 
{
this.processidList = res as legalcourtprocessmaster[];
if(this.legalcaseprocessdetailservice.formData && this.legalcaseprocessdetailservice.formData.processid){
this.processidoptionsEvent.emit(this.processidList);
this.legalcaseprocessdetailForm.patchValue({
    processid: this.legalcaseprocessdetailservice.formData.processid,
    processiddesc: this.legalcaseprocessdetailservice.formData.processiddesc,
});
}
{
let arrprocessid = this.processidList.filter(v => v.processid == this.legalcaseprocessdetailForm.get('processid').value);
let objprocessid;
if (arrprocessid.length > 0) objprocessid = arrprocessid[0];
if (objprocessid)
{
}
}
}
).catch((err) => {console.log(err);});
this.processid_legalcourtprocessmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.processidList.filter(v => v.processname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.processid_legalcourtprocessmastersformatter = (result: any) => result.processname;
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.lawyeridList = res as legallawyermaster[];
if(this.legalcaseprocessdetailservice.formData && this.legalcaseprocessdetailservice.formData.lawyerid){
this.lawyeridoptionsEvent.emit(this.lawyeridList);
this.legalcaseprocessdetailForm.patchValue({
    lawyerid: this.legalcaseprocessdetailservice.formData.lawyerid,
    lawyeriddesc: this.legalcaseprocessdetailservice.formData.lawyeriddesc,
});
}
{
let arrlawyerid = this.lawyeridList.filter(v => v.lawyerid == this.legalcaseprocessdetailForm.get('lawyerid').value);
let objlawyerid;
if (arrlawyerid.length > 0) objlawyerid = arrlawyerid[0];
if (objlawyerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.lawyerid_legallawyermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.lawyeridList.filter(v => v.lawyername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.lawyerid_legallawyermastersformatter = (result: any) => result.lawyername;

//autocomplete
    this.legalcaseprocessdetailservice.getlegalcaseprocessdetailsList().then(res => {
      this.pkList = res as legalcaseprocessdetail[];
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
this.legalcaseprocessdetailForm.markAsUntouched();
this.legalcaseprocessdetailForm.markAsPristine();
}
onSelectedprocessid(processidDetail: any) {
if (processidDetail.processid && processidDetail) {
this.legalcaseprocessdetailForm.patchValue({
processid: processidDetail.processid,
processiddesc: processidDetail.processname,

});

}
}

onSelectedlawyerid(lawyeridDetail: any) {
if (lawyeridDetail.lawyerid && lawyeridDetail) {
this.legalcaseprocessdetailForm.patchValue({
lawyerid: lawyeridDetail.lawyerid,
lawyeriddesc: lawyeridDetail.lawyername,

});

}
}




resetForm() {
if (this.legalcaseprocessdetailForm != null)
this.legalcaseprocessdetailForm.reset();
this.legalcaseprocessdetailForm.patchValue({
});
setTimeout(() => {
this.legalcaseprocessdetailservice.boexpenses=[];
this.boexpensesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let caseprocessid = this.legalcaseprocessdetailForm.get('caseprocessid').value;
        if(caseprocessid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcaseprocessdetailservice.deletelegalcaseprocessdetail(caseprocessid).then(res =>
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
    this.legalcaseprocessdetailForm.patchValue({
        caseprocessid: null
    });
    if(this.legalcaseprocessdetailservice.formData.caseprocessid!=null)this.legalcaseprocessdetailservice.formData.caseprocessid=null;
for (let i=0;i<this.legalcaseprocessdetailservice.boexpenses.length;i++) {
this.legalcaseprocessdetailservice.boexpenses[i].expenseid=null;
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
        else if(key=="remarks")
this.legalcaseprocessdetailForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.legalcaseprocessdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcaseprocessdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcaseprocessdetailForm.controls[key]!=undefined)
{
this.legalcaseprocessdetailForm.controls[key].disable({onlySelf: true});
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
caseidonChange(evt:any){
let e=evt.value;
}
caseprocessidonChange(evt:any){
let e=evt.value;
}
internalreferencenumberonChange(evt:any){
let e=evt.value;
}
processidonChange(evt:any){
let e=evt.value;
}
lawyeridonChange(evt:any){
let e=evt.value;
}
assigntoonChange(evt:any){
let e=evt.value;
}
estimatedtimeonChange(evt:any){
let e=evt.value;
}
timespentonChange(evt:any){
let e=evt.value;
}
processdetailsonChange(evt:any){
let e=evt.value;
}
actiontobetakenonChange(evt:any){
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
  


editlegalcaseprocessdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcaseprocessdetailservice.getlegalcaseprocessdetailsByEID(pkcol).then(res => {

this.legalcaseprocessdetailservice.formData=res.legalcaseprocessdetail;
let formproperty=res.legalcaseprocessdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcaseprocessdetail.pkcol;
this.formid=res.legalcaseprocessdetail.caseprocessid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcaseprocessdetailservice.formData=res.legalcaseprocessdetail;
this.formid=res.legalcaseprocessdetail.caseprocessid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcaseprocessdetailForm.patchValue({
caseid: res.legalcaseprocessdetail.caseid,
caseprocessid: res.legalcaseprocessdetail.caseprocessid,
internalreferencenumber: res.legalcaseprocessdetail.internalreferencenumber,
processid: res.legalcaseprocessdetail.processid,
processiddesc: res.legalcaseprocessdetail.processiddesc,
lawyerid: res.legalcaseprocessdetail.lawyerid,
lawyeriddesc: res.legalcaseprocessdetail.lawyeriddesc,
assignto: res.legalcaseprocessdetail.assignto,
estimatedtime: res.legalcaseprocessdetail.estimatedtime,
timespent: res.legalcaseprocessdetail.timespent,
processdetails: res.legalcaseprocessdetail.processdetails,
actiontobetaken: res.legalcaseprocessdetail.actiontobetaken,
remarks: JSON.parse(res.legalcaseprocessdetail.remarks),
attachment: JSON.parse(res.legalcaseprocessdetail.attachment),
status: res.legalcaseprocessdetail.status,
statusdesc: res.legalcaseprocessdetail.statusdesc,
});
this.boexpensesvisiblelist=res.boexpensesvisiblelist;
if(this.legalcaseprocessdetailForm.get('attachment').value!=null && this.legalcaseprocessdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcaseprocessdetailForm.get('attachment').value);
//Child Tables if any
this.legalcaseprocessdetailservice.boexpenses = res.boexpenses;
this.SetboexpensesTableConfig();
this.boexpensesLoadTable();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
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
  for (let key in this.legalcaseprocessdetailForm.controls) {
    if (this.legalcaseprocessdetailForm.controls[key] != null) {
if(false)
{
if(this.legalcaseprocessdetailservice.formData!=null && this.legalcaseprocessdetailservice.formData[key]!=null  && this.legalcaseprocessdetailservice.formData[key]!='[]' && this.legalcaseprocessdetailservice.formData[key]!=undefined && this.legalcaseprocessdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcaseprocessdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcaseprocessdetailservice.formData!=null && this.legalcaseprocessdetailservice.formData[key]!=null   && this.legalcaseprocessdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcaseprocessdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcaseprocessdetailservice.formData!=null && this.legalcaseprocessdetailservice.formData[key]!=null   && this.legalcaseprocessdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcaseprocessdetailservice.formData[key]+"'><div class='progress__number'>"+this.legalcaseprocessdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcaseprocessdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcaseprocessdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcaseprocessdetailForm.value;
if(this.legalcaseprocessdetailForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.legalcaseprocessdetailForm.get('remarks').value);
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

private legalcaseprocessdetailtoggleOption(){
this.legalcaseprocessdetailshowOption = this.legalcaseprocessdetailshowOption === true ? false : true;
}

private boexpensetoggleOption(){
this.boexpenseshowOption = this.boexpenseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcaseprocessdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcaseprocessdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcaseprocessdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcaseprocessdetailservice.formData=this.legalcaseprocessdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcaseprocessdetailForm.controls[key] != null)
    {
        this.legalcaseprocessdetailservice.formData[key] = this.legalcaseprocessdetailForm.controls[key].value;
    }
}
}
}
if(this.legalcaseprocessdetailForm.get('remarks').value!=null)this.legalcaseprocessdetailservice.formData.remarks=JSON.stringify(this.legalcaseprocessdetailForm.get('remarks').value);
if(this.fileattachment.getattachmentlist()!=null)this.legalcaseprocessdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalcaseprocessdetailservice.formData.DeletedboexpenseIDs = this.DeletedboexpenseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcaseprocessdetailservice.formData);
this.legalcaseprocessdetailservice.formData=this.legalcaseprocessdetailForm.value;
this.legalcaseprocessdetailservice.saveOrUpdatelegalcaseprocessdetails().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.boexpensessource.data)
{
    for (let i = 0; i < this.boexpensessource.data.length; i++)
    {
        if (this.boexpensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boexpensessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcaseprocessdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcaseprocessdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcaseprocessdetail);
}
else
{
this.FillData(res);
}
}
this.legalcaseprocessdetailForm.markAsUntouched();
this.legalcaseprocessdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprocessid( processid) {
/*let ScreenType='2';
this.dialog.open(legalcourtprocessmasterComponent, 
{
data: {processid:this.legalcaseprocessdetailForm.get('processid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlawyerid( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcaseprocessdetailForm.get('lawyerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboexpense(event:any,expenseid:any, caseprocessid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boexpenseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,expenseid, caseprocessid,visiblelist:this.boexpensesvisiblelist,  hidelist:this.boexpenseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boexpensessource.add(res);
this.boexpensessource.refresh();
}
else
{
this.boexpensessource.update(event.data, res);
}
}
});
}

onDeleteboexpense(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboexpenseIDs += childID + ",";
this.legalcaseprocessdetailservice.boexpenses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boexpenses
boexpensessettings:any;
boexpensessource: any;

showboexpensesCheckbox()
{
debugger;
if(this.tblboexpensessource.settings['selectMode']== 'multi')this.tblboexpensessource.settings['selectMode']= 'single';
else
this.tblboexpensessource.settings['selectMode']= 'multi';
this.tblboexpensessource.initGrid();
}
deleteboexpensesAll()
{
this.tblboexpensessource.settings['selectMode'] = 'single';
}
showboexpensesFilter()
{
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });
      if(this.tblboexpensessource.settings!=null)this.tblboexpensessource.settings['hideSubHeader'] =!this.tblboexpensessource.settings['hideSubHeader'];
this.tblboexpensessource.initGrid();
}
showboexpensesInActive()
{
}
enableboexpensesInActive()
{
}
async SetboexpensesTableddConfig()
{
if(!this.bfilterPopulateboexpenses){
}
this.bfilterPopulateboexpenses=true;
}
async boexpensesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboexpensesTableConfig()
{
this.boexpensessettings = {
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
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
expensedate: {
title: 'Expense Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requesteduserid: {
title: 'Requested User',
type: 'number',
filter:true,
},
expensetype: {
title: 'Expense Type',
type: '',
filter:true,
},
expensecategory: {
title: 'Expense Category',
type: '',
filter:true,
},
expensedescription: {
title: 'Expense Description',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: 'number',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
merchant: {
title: 'Merchant',
type: '',
filter:true,
},
receiptattached: {
title: 'Receipt Attached',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
billable: {
title: 'Billable',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
reimbursedamount: {
title: 'Reimbursed Amount',
type: 'number',
filter:true,
},
reimburseddate: {
title: 'Reimbursed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
referencenumber: {
title: 'Reference Number',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: '',
filter:true,
},
baseamount: {
title: 'Base Amount',
type: 'number',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
costcenterid: {
title: 'Cost Center',
type: 'number',
filter:true,
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
boexpensesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
this.boexpensessource=new LocalDataSource();
this.boexpensessource.load(this.legalcaseprocessdetailservice.boexpenses as  any as LocalDataSource);
this.boexpensessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boexpensesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseprocessdetailservice.boexpenses.length == 0)
{
    this.tblboexpensessource.grid.createFormShown = true;
}
else
{
    let obj = new boexpense();
    this.legalcaseprocessdetailservice.boexpenses.push(obj);
    this.boexpensessource.refresh();
    if ((this.legalcaseprocessdetailservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1 != this.boexpensessource.getPaging().page)
    {
        this.boexpensessource.setPage((this.legalcaseprocessdetailservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboexpensessource.grid.edit(this.tblboexpensessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boexpensessource.data.indexOf(event.data);
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+index);
this.boexpensessource.refresh();
break;
}
}

*/
boexpensesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboexpense(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboexpense(event,event.data.expenseid,this.formid);
break;
case 'delete':
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+event.index);
this.boexpensessource.refresh();
break;
}
}
boexpensesonDelete(obj) {
let expenseid=obj.data.expenseid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseprocessdetailservice.deletelegalcaseprocessdetail(expenseid).then(res=>
this.boexpensesLoadTable()
);
}
}
boexpensesPaging(val)
{
debugger;
this.boexpensessource.setPaging(1, val, true);
}

handleboexpensesGridSelected(event:any) {
this.boexpensesselectedindex=this.legalcaseprocessdetailservice.boexpenses.findIndex(i => i.expenseid === event.data.expenseid);
}
IsboexpensesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boexpenses

}



