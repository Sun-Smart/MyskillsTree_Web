import { erpiltmasterService } from './../../../service/erpiltmaster.service';
import { erpiltmaster } from './../../../model/erpiltmaster.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { erpiltdetail } from './../../../model/erpiltdetail.model';
import { erpiltdetailComponent } from './../../../pages/forms/erpiltdetail/erpiltdetail.component';
//FK services
import { bouserbranchaccess,IbouserbranchaccessResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erpiltmaster',
templateUrl: './erpiltmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpiltmasterComponent implements OnInit {
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
bfilterPopulateerpiltmasters:boolean=false;
dataerpiltmastersbranchid3:any=[];
dataerpiltmastersiltid3:any=[];
dataerpiltmastersilttype3:any=[];
dataerpiltmasterscriticality3:any=[];
dataerpiltmasterstobranch3:any=[];
dataerpiltmasterstobranchuserid3:any=[];
dataerpiltmasterstransferreruserid3:any=[];
dataerpiltmastersreceiveruserid3:any=[];
dataerpiltdetailsfrombranchuserid3:any=[];
dataerpiltdetailstobranch3:any=[];
dataerpiltdetailstobranchuserid3:any=[];
dataerpiltdetailsitemid3:any=[];
dataerpiltdetailsiltid3:any=[];
dataerpiltdetailsuom3:any=[];
dataerpiltdetailsfrombranch3:any=[];
bfilterPopulateerpiltdetails:boolean=false;
@ViewChild('tblerpiltdetailssource',{static:false}) tblerpiltdetailssource: Ng2SmartTableComponent;
 erpiltmasterForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
iltidList: erpiltmaster[];
iltidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
iltid_erpiltmastersForm: FormGroup;//autocomplete
iltid_erpiltmastersoptions:any;//autocomplete
iltid_erpiltmastersformatter:any;//autocomplete
ilttypeList: boconfigvalue[];
criticalityList: boconfigvalue[];
tobranchList: bobranchmaster[];
tobranchoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tobranch_bobranchmastersForm: FormGroup;//autocomplete
tobranch_bobranchmastersoptions:any;//autocomplete
tobranch_bobranchmastersformatter:any;//autocomplete
tobranchuseridList: bousermaster[];
tobranchuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tobranchuserid_bousermastersForm: FormGroup;//autocomplete
tobranchuserid_bousermastersoptions:any;//autocomplete
tobranchuserid_bousermastersformatter:any;//autocomplete
transferreruseridList: bousermaster[];
transferreruseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
transferreruserid_bousermastersForm: FormGroup;//autocomplete
transferreruserid_bousermastersoptions:any;//autocomplete
transferreruserid_bousermastersformatter:any;//autocomplete
receiveruseridList: bousermaster[];
receiveruseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
receiveruserid_bousermastersForm: FormGroup;//autocomplete
receiveruserid_bousermastersoptions:any;//autocomplete
receiveruserid_bousermastersformatter:any;//autocomplete
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
erpiltmastershowOption:boolean;
erpiltdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpiltdetailsvisiblelist:any;
erpiltdetailshidelist:any;

DeletederpiltdetailIDs: string="";
erpiltdetailsID: string = "1";
erpiltdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpiltmasterservice: erpiltmasterService,
private bousermasterservice: bousermasterService,
private bouserbranchaccessservice: bouserbranchaccessService,
private erpitemmasterservice: erpitemmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
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
this.erpiltmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
iltid: [null],
iltiddesc: [null],
ildcode: [null],
iltdate: [null],
ilttime: [null],
reference: [null],
inspectionrequired: [null],
ilttype: [null],
ilttypedesc: [null],
criticality: [null],
criticalitydesc: [null],
iltremarks: [null],
tobranch: [null],
tobranchdesc: [null],
tobranchuserid: [null],
tobranchuseriddesc: [null],
expectedtransferdate: [null],
expectedtransfertime: [null],
transportationdetails: [null],
transferreruserid: [null],
transferreruseriddesc: [null],
actualtransferdate: [null],
actualtransfertime: [null],
receiveruserid: [null],
receiveruseriddesc: [null],
receiveddate: [null],
receivedtime: [null],
remarks: [null],
status: [null],
statusdesc: [null],
customfield: [null],
attachment: [null],
});
}

get f() { return this.erpiltmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpiltmasterForm.dirty && this.erpiltmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.iltid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.iltid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.iltid && pkDetail) {
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
let erpiltmasterid = null;

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
this.formid=erpiltmasterid;
//this.sharedService.alert(erpiltmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpiltdetailsTableConfig();
  setTimeout(() => {
  this.SeterpiltdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpiltmasterForm.patchValue({
    branchid: this.erpiltmasterservice.formData.branchid,
    branchiddesc: this.erpiltmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpiltmasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.erpiltmasterservice.geterpiltmastersList().then(res => 
{
this.iltidList = res as erpiltmaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.iltid){
this.iltidoptionsEvent.emit(this.iltidList);
this.erpiltmasterForm.patchValue({
    iltid: this.erpiltmasterservice.formData.iltid,
    iltiddesc: this.erpiltmasterservice.formData.iltiddesc,
});
}
{
let arriltid = this.iltidList.filter(v => v.iltid == this.erpiltmasterForm.get('iltid').value);
let objiltid;
if (arriltid.length > 0) objiltid = arriltid[0];
if (objiltid)
{
}
}
}
).catch((err) => {console.log(err);});
this.iltid_erpiltmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.iltidList.filter(v => v.ildcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.iltid_erpiltmastersformatter = (result: any) => result.ildcode;
this.configservice.getList("transfertype").then(res => this.ilttypeList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.tobranchList = res as bobranchmaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.tobranch){
this.tobranchoptionsEvent.emit(this.tobranchList);
this.erpiltmasterForm.patchValue({
    tobranch: this.erpiltmasterservice.formData.tobranch,
    tobranchdesc: this.erpiltmasterservice.formData.tobranchdesc,
});
}
{
let arrtobranch = this.tobranchList.filter(v => v.branchid == this.erpiltmasterForm.get('tobranch').value);
let objtobranch;
if (arrtobranch.length > 0) objtobranch = arrtobranch[0];
if (objtobranch)
{
}
}
}
).catch((err) => {console.log(err);});
this.tobranch_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tobranchList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tobranch_bobranchmastersformatter = (result: any) => result.branchname;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.tobranchuseridList = res as bousermaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.tobranchuserid){
this.tobranchuseridoptionsEvent.emit(this.tobranchuseridList);
this.erpiltmasterForm.patchValue({
    tobranchuserid: this.erpiltmasterservice.formData.tobranchuserid,
    tobranchuseriddesc: this.erpiltmasterservice.formData.tobranchuseriddesc,
});
}
{
let arrtobranchuserid = this.tobranchuseridList.filter(v => v.userid == this.erpiltmasterForm.get('tobranchuserid').value);
let objtobranchuserid;
if (arrtobranchuserid.length > 0) objtobranchuserid = arrtobranchuserid[0];
if (objtobranchuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tobranchuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tobranchuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tobranchuserid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.transferreruseridList = res as bousermaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.transferreruserid){
this.transferreruseridoptionsEvent.emit(this.transferreruseridList);
this.erpiltmasterForm.patchValue({
    transferreruserid: this.erpiltmasterservice.formData.transferreruserid,
    transferreruseriddesc: this.erpiltmasterservice.formData.transferreruseriddesc,
});
}
{
let arrtransferreruserid = this.transferreruseridList.filter(v => v.userid == this.erpiltmasterForm.get('transferreruserid').value);
let objtransferreruserid;
if (arrtransferreruserid.length > 0) objtransferreruserid = arrtransferreruserid[0];
if (objtransferreruserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.transferreruserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.transferreruseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.transferreruserid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.receiveruseridList = res as bousermaster[];
if(this.erpiltmasterservice.formData && this.erpiltmasterservice.formData.receiveruserid){
this.receiveruseridoptionsEvent.emit(this.receiveruseridList);
this.erpiltmasterForm.patchValue({
    receiveruserid: this.erpiltmasterservice.formData.receiveruserid,
    receiveruseriddesc: this.erpiltmasterservice.formData.receiveruseriddesc,
});
}
{
let arrreceiveruserid = this.receiveruseridList.filter(v => v.userid == this.erpiltmasterForm.get('receiveruserid').value);
let objreceiveruserid;
if (arrreceiveruserid.length > 0) objreceiveruserid = arrreceiveruserid[0];
if (objreceiveruserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.receiveruserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.receiveruseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.receiveruserid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.erpiltmasterservice.geterpiltmastersList().then(res => {
      this.pkList = res as erpiltmaster[];
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
this.erpiltmasterForm.markAsUntouched();
this.erpiltmasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpiltmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectediltid(iltidDetail: any) {
if (iltidDetail.iltid && iltidDetail) {
this.erpiltmasterForm.patchValue({
iltid: iltidDetail.iltid,
iltiddesc: iltidDetail.ildcode,

});

}
}

onSelectedtobranch(tobranchDetail: any) {
if (tobranchDetail.branchid && tobranchDetail) {
this.erpiltmasterForm.patchValue({
tobranch: tobranchDetail.branchid,
tobranchdesc: tobranchDetail.branchname,

});

}
}

onSelectedtobranchuserid(tobranchuseridDetail: any) {
if (tobranchuseridDetail.userid && tobranchuseridDetail) {
this.erpiltmasterForm.patchValue({
tobranchuserid: tobranchuseridDetail.userid,
tobranchuseriddesc: tobranchuseridDetail.username,

});

}
}

onSelectedtransferreruserid(transferreruseridDetail: any) {
if (transferreruseridDetail.userid && transferreruseridDetail) {
this.erpiltmasterForm.patchValue({
transferreruserid: transferreruseridDetail.userid,
transferreruseriddesc: transferreruseridDetail.username,

});

}
}

onSelectedreceiveruserid(receiveruseridDetail: any) {
if (receiveruseridDetail.userid && receiveruseridDetail) {
this.erpiltmasterForm.patchValue({
receiveruserid: receiveruseridDetail.userid,
receiveruseriddesc: receiveruseridDetail.username,

});

}
}




resetForm() {
if (this.erpiltmasterForm != null)
this.erpiltmasterForm.reset();
this.erpiltmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
tobranch: this.sessiondata.branchid,
tobranchdesc: this.sessiondata.branchiddesc,
tobranchuserid: this.sessiondata.userid,
tobranchuseriddesc: this.sessiondata.username,
transferreruserid: this.sessiondata.userid,
transferreruseriddesc: this.sessiondata.username,
receiveruserid: this.sessiondata.userid,
receiveruseriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpiltmasterservice.erpiltdetails=[];
this.erpiltdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let iltid = this.erpiltmasterForm.get('iltid').value;
        if(iltid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpiltmasterservice.deleteerpiltmaster(iltid).then(res =>
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
    this.erpiltmasterForm.patchValue({
        iltid: null
    });
    if(this.erpiltmasterservice.formData.iltid!=null)this.erpiltmasterservice.formData.iltid=null;
for (let i=0;i<this.erpiltmasterservice.erpiltdetails.length;i++) {
this.erpiltmasterservice.erpiltdetails[i].iltdetailid=null;
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
        else if(key=="iltdate")
this.erpiltmasterForm.patchValue({"iltdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="ilttime")
this.erpiltmasterForm.patchValue({"ilttime":new Time(mainscreendata[key]) });
        else if(key=="expectedtransferdate")
this.erpiltmasterForm.patchValue({"expectedtransferdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expectedtransfertime")
this.erpiltmasterForm.patchValue({"expectedtransfertime":new Time(mainscreendata[key]) });
        else if(key=="actualtransferdate")
this.erpiltmasterForm.patchValue({"actualtransferdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualtransfertime")
this.erpiltmasterForm.patchValue({"actualtransfertime":new Time(mainscreendata[key]) });
        else if(key=="receiveddate")
this.erpiltmasterForm.patchValue({"receiveddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="receivedtime")
this.erpiltmasterForm.patchValue({"receivedtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpiltmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpiltmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpiltmasterForm.controls[key]!=undefined)
{
this.erpiltmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpiltmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
iltidonChange(evt:any){
let e=evt.value;
}
ildcodeonChange(evt:any){
let e=evt.value;
}
iltdateonChange(evt:any){
let e=evt.value;
}
ilttimeonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
inspectionrequiredonChange(evt:any){
let e=evt.value;
}
ilttypeonChange(evt:any){
let e=this.f.ilttype.value as any;
this.erpiltmasterForm.patchValue({ilttypedesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.erpiltmasterForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
iltremarksonChange(evt:any){
let e=evt.value;
}
tobranchonChange(evt:any){
let e=evt.value;
}
tobranchuseridonChange(evt:any){
let e=evt.value;
}
expectedtransferdateonChange(evt:any){
let e=evt.value;
}
expectedtransfertimeonChange(evt:any){
let e=evt.value;
}
transportationdetailsonChange(evt:any){
let e=evt.value;
}
transferreruseridonChange(evt:any){
let e=evt.value;
}
actualtransferdateonChange(evt:any){
let e=evt.value;
}
actualtransfertimeonChange(evt:any){
let e=evt.value;
}
receiveruseridonChange(evt:any){
let e=evt.value;
}
receiveddateonChange(evt:any){
let e=evt.value;
}
receivedtimeonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
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
  


editerpiltmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpiltmasterservice.geterpiltmastersByEID(pkcol).then(res => {

this.erpiltmasterservice.formData=res.erpiltmaster;
let formproperty=res.erpiltmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpiltmaster.pkcol;
this.formid=res.erpiltmaster.iltid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpiltmaster.iltid;
var ilttimeTime=new Time( res.erpiltmaster.ilttime);
var expectedtransfertimeTime=new Time( res.erpiltmaster.expectedtransfertime);
var actualtransfertimeTime=new Time( res.erpiltmaster.actualtransfertime);
var receivedtimeTime=new Time( res.erpiltmaster.receivedtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpiltmasterForm.patchValue({
branchid: res.erpiltmaster.branchid,
branchiddesc: res.erpiltmaster.branchiddesc,
iltid: res.erpiltmaster.iltid,
iltiddesc: res.erpiltmaster.iltiddesc,
ildcode: res.erpiltmaster.ildcode,
iltdate: this.ngbDateParserFormatter.parse(res.erpiltmaster.iltdate),
ilttime: ilttimeTime,
reference: res.erpiltmaster.reference,
inspectionrequired: res.erpiltmaster.inspectionrequired,
ilttype: res.erpiltmaster.ilttype,
ilttypedesc: res.erpiltmaster.ilttypedesc,
criticality: res.erpiltmaster.criticality,
criticalitydesc: res.erpiltmaster.criticalitydesc,
iltremarks: res.erpiltmaster.iltremarks,
tobranch: res.erpiltmaster.tobranch,
tobranchdesc: res.erpiltmaster.tobranchdesc,
tobranchuserid: res.erpiltmaster.tobranchuserid,
tobranchuseriddesc: res.erpiltmaster.tobranchuseriddesc,
expectedtransferdate: this.ngbDateParserFormatter.parse(res.erpiltmaster.expectedtransferdate),
expectedtransfertime: expectedtransfertimeTime,
transportationdetails: res.erpiltmaster.transportationdetails,
transferreruserid: res.erpiltmaster.transferreruserid,
transferreruseriddesc: res.erpiltmaster.transferreruseriddesc,
actualtransferdate: this.ngbDateParserFormatter.parse(res.erpiltmaster.actualtransferdate),
actualtransfertime: actualtransfertimeTime,
receiveruserid: res.erpiltmaster.receiveruserid,
receiveruseriddesc: res.erpiltmaster.receiveruseriddesc,
receiveddate: this.ngbDateParserFormatter.parse(res.erpiltmaster.receiveddate),
receivedtime: receivedtimeTime,
remarks: res.erpiltmaster.remarks,
status: res.erpiltmaster.status,
statusdesc: res.erpiltmaster.statusdesc,
customfield: res.erpiltmaster.customfield,
attachment: JSON.parse(res.erpiltmaster.attachment),
});
this.erpiltdetailsvisiblelist=res.erpiltdetailsvisiblelist;
if(this.erpiltmasterForm.get('customfield').value!=null && this.erpiltmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpiltmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpiltmasterForm.get('attachment').value!=null && this.erpiltmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpiltmasterForm.get('attachment').value);
//Child Tables if any
this.erpiltmasterservice.erpiltdetails = res.erpiltdetails;
this.SeterpiltdetailsTableConfig();
this.erpiltdetailsLoadTable();
  setTimeout(() => {
  this.SeterpiltdetailsTableddConfig();
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
  for (let key in this.erpiltmasterForm.controls) {
    if (this.erpiltmasterForm.controls[key] != null) {
if(false)
{
if(this.erpiltmasterservice.formData!=null && this.erpiltmasterservice.formData[key]!=null  && this.erpiltmasterservice.formData[key]!='[]' && this.erpiltmasterservice.formData[key]!=undefined && this.erpiltmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpiltmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpiltmasterservice.formData!=null && this.erpiltmasterservice.formData[key]!=null   && this.erpiltmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpiltmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpiltmasterservice.formData!=null && this.erpiltmasterservice.formData[key]!=null   && this.erpiltmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpiltmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpiltmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpiltmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpiltmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpiltmasterForm.value;
obj.iltdate=new Date(this.erpiltmasterForm.get('iltdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('iltdate').value)+'  UTC' :null);
obj.ilttime=(this.erpiltmasterForm.get('ilttime').value==null?0:this.erpiltmasterForm.get('ilttime').value.hour)+':'+(this.erpiltmasterForm.get('ilttime').value==null?0:this.erpiltmasterForm.get('ilttime').value.minute+":00");
obj.expectedtransferdate=new Date(this.erpiltmasterForm.get('expectedtransferdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('expectedtransferdate').value)+'  UTC' :null);
obj.expectedtransfertime=(this.erpiltmasterForm.get('expectedtransfertime').value==null?0:this.erpiltmasterForm.get('expectedtransfertime').value.hour)+':'+(this.erpiltmasterForm.get('expectedtransfertime').value==null?0:this.erpiltmasterForm.get('expectedtransfertime').value.minute+":00");
obj.actualtransferdate=new Date(this.erpiltmasterForm.get('actualtransferdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('actualtransferdate').value)+'  UTC' :null);
obj.actualtransfertime=(this.erpiltmasterForm.get('actualtransfertime').value==null?0:this.erpiltmasterForm.get('actualtransfertime').value.hour)+':'+(this.erpiltmasterForm.get('actualtransfertime').value==null?0:this.erpiltmasterForm.get('actualtransfertime').value.minute+":00");
obj.receiveddate=new Date(this.erpiltmasterForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('receiveddate').value)+'  UTC' :null);
obj.receivedtime=(this.erpiltmasterForm.get('receivedtime').value==null?0:this.erpiltmasterForm.get('receivedtime').value.hour)+':'+(this.erpiltmasterForm.get('receivedtime').value==null?0:this.erpiltmasterForm.get('receivedtime').value.minute+":00");
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private erpiltmastertoggleOption(){
this.erpiltmastershowOption = this.erpiltmastershowOption === true ? false : true;
}

private erpiltdetailtoggleOption(){
this.erpiltdetailshowOption = this.erpiltdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpiltmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpiltmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpiltmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpiltmasterservice.formData=this.erpiltmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpiltmasterForm.controls[key] != null)
    {
        this.erpiltmasterservice.formData[key] = this.erpiltmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpiltmasterservice.formData.iltdate=new Date(this.erpiltmasterForm.get('iltdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('iltdate').value)+'  UTC' :null);
this.erpiltmasterservice.formData.ilttime=(this.erpiltmasterForm.get('ilttime').value==null?0:this.erpiltmasterForm.get('ilttime').value.hour)+':'+(this.erpiltmasterForm.get('ilttime').value==null?0:this.erpiltmasterForm.get('ilttime').value.minute+":00");
this.erpiltmasterservice.formData.expectedtransferdate=new Date(this.erpiltmasterForm.get('expectedtransferdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('expectedtransferdate').value)+'  UTC' :null);
this.erpiltmasterservice.formData.expectedtransfertime=(this.erpiltmasterForm.get('expectedtransfertime').value==null?0:this.erpiltmasterForm.get('expectedtransfertime').value.hour)+':'+(this.erpiltmasterForm.get('expectedtransfertime').value==null?0:this.erpiltmasterForm.get('expectedtransfertime').value.minute+":00");
this.erpiltmasterservice.formData.actualtransferdate=new Date(this.erpiltmasterForm.get('actualtransferdate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('actualtransferdate').value)+'  UTC' :null);
this.erpiltmasterservice.formData.actualtransfertime=(this.erpiltmasterForm.get('actualtransfertime').value==null?0:this.erpiltmasterForm.get('actualtransfertime').value.hour)+':'+(this.erpiltmasterForm.get('actualtransfertime').value==null?0:this.erpiltmasterForm.get('actualtransfertime').value.minute+":00");
this.erpiltmasterservice.formData.receiveddate=new Date(this.erpiltmasterForm.get('receiveddate').value ? this.ngbDateParserFormatter.format(this.erpiltmasterForm.get('receiveddate').value)+'  UTC' :null);
this.erpiltmasterservice.formData.receivedtime=(this.erpiltmasterForm.get('receivedtime').value==null?0:this.erpiltmasterForm.get('receivedtime').value.hour)+':'+(this.erpiltmasterForm.get('receivedtime').value==null?0:this.erpiltmasterForm.get('receivedtime').value.minute+":00");
if(customfields!=null)this.erpiltmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpiltmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpiltmasterservice.formData.DeletederpiltdetailIDs = this.DeletederpiltdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpiltmasterservice.formData);
this.erpiltmasterservice.formData=this.erpiltmasterForm.value;
this.erpiltmasterservice.saveOrUpdateerpiltmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpiltdetailssource.data)
{
    for (let i = 0; i < this.erpiltdetailssource.data.length; i++)
    {
        if (this.erpiltdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpiltdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpiltmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpiltmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpiltmaster);
}
else
{
this.FillData(res);
}
}
this.erpiltmasterForm.markAsUntouched();
this.erpiltmasterForm.markAsPristine();
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
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpiltmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditiltid( iltid) {
/*let ScreenType='2';
this.dialog.open(erpiltmasterComponent, 
{
data: {iltid:this.erpiltmasterForm.get('iltid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittobranch( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpiltmasterForm.get('tobranch').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittobranchuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpiltmasterForm.get('tobranchuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittransferreruserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpiltmasterForm.get('transferreruserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditreceiveruserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpiltmasterForm.get('receiveruserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpiltdetail(event:any,iltdetailid:any, iltid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpiltdetailComponent, 
{
data:  {  showview:false,save:false,event,iltdetailid, iltid,visiblelist:this.erpiltdetailsvisiblelist,  hidelist:this.erpiltdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpiltdetailssource.add(res);
this.erpiltdetailssource.refresh();
}
else
{
this.erpiltdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpiltdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpiltdetailIDs += childID + ",";
this.erpiltmasterservice.erpiltdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpiltdetails
erpiltdetailssettings:any;
erpiltdetailssource: any;

showerpiltdetailsCheckbox()
{
debugger;
if(this.tblerpiltdetailssource.settings['selectMode']== 'multi')this.tblerpiltdetailssource.settings['selectMode']= 'single';
else
this.tblerpiltdetailssource.settings['selectMode']= 'multi';
this.tblerpiltdetailssource.initGrid();
}
deleteerpiltdetailsAll()
{
this.tblerpiltdetailssource.settings['selectMode'] = 'single';
}
showerpiltdetailsFilter()
{
  setTimeout(() => {
  this.SeterpiltdetailsTableddConfig();
  });
      if(this.tblerpiltdetailssource.settings!=null)this.tblerpiltdetailssource.settings['hideSubHeader'] =!this.tblerpiltdetailssource.settings['hideSubHeader'];
this.tblerpiltdetailssource.initGrid();
}
showerpiltdetailsInActive()
{
}
enableerpiltdetailsInActive()
{
}
async SeterpiltdetailsTableddConfig()
{
if(!this.bfilterPopulateerpiltdetails){
}
this.bfilterPopulateerpiltdetails=true;
}
async erpiltdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpiltdetailsTableConfig()
{
this.erpiltdetailssettings = {
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
frombranch: {
title: 'From Branch',
type: 'number',
filter:true,
},
frombranchuserid: {
title: 'From Branch User',
type: 'number',
filter:true,
},
tobranch: {
title: 'To Branch',
type: 'number',
filter:true,
},
tobranchuserid: {
title: 'To Branch User',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: '',
filter:true,
},
},
};
}
erpiltdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpiltdetailsID)>=0)
{
this.erpiltdetailssource=new LocalDataSource();
this.erpiltdetailssource.load(this.erpiltmasterservice.erpiltdetails as  any as LocalDataSource);
this.erpiltdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpiltdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpiltmasterservice.erpiltdetails.length == 0)
{
    this.tblerpiltdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpiltdetail();
    this.erpiltmasterservice.erpiltdetails.push(obj);
    this.erpiltdetailssource.refresh();
    if ((this.erpiltmasterservice.erpiltdetails.length / this.erpiltdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpiltdetailssource.getPaging().page)
    {
        this.erpiltdetailssource.setPage((this.erpiltmasterservice.erpiltdetails.length / this.erpiltdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpiltdetailssource.grid.edit(this.tblerpiltdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpiltdetailssource.data.indexOf(event.data);
this.onDeleteerpiltdetail(event,event.data.iltdetailid,((this.erpiltdetailssource.getPaging().page-1) *this.erpiltdetailssource.getPaging().perPage)+index);
this.erpiltdetailssource.refresh();
break;
}
}

*/
erpiltdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpiltdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpiltdetail(event,event.data.iltdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpiltdetail(event,event.data.iltdetailid,((this.erpiltdetailssource.getPaging().page-1) *this.erpiltdetailssource.getPaging().perPage)+event.index);
this.erpiltdetailssource.refresh();
break;
}
}
erpiltdetailsonDelete(obj) {
let iltdetailid=obj.data.iltdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpiltmasterservice.deleteerpiltmaster(iltdetailid).then(res=>
this.erpiltdetailsLoadTable()
);
}
}
erpiltdetailsPaging(val)
{
debugger;
this.erpiltdetailssource.setPaging(1, val, true);
}

handleerpiltdetailsGridSelected(event:any) {
this.erpiltdetailsselectedindex=this.erpiltmasterservice.erpiltdetails.findIndex(i => i.iltdetailid === event.data.iltdetailid);
}
IserpiltdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpiltdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpiltdetails

}



