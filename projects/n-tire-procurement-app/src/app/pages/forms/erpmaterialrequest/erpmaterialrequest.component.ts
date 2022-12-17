import { erpmaterialrequestService } from './../../../service/erpmaterialrequest.service';
import { erpmaterialrequest } from './../../../model/erpmaterialrequest.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { erpbinlocationmaster} from './../../../model/erpbinlocationmaster.model';
import { erpbinlocationmasterComponent } from './../../../pages/forms/erpbinlocationmaster/erpbinlocationmaster.component';
import { erpbinlocationmasterService } from './../../../service/erpbinlocationmaster.service';
//popups
import { prjprojectmaster} from '../../../../../../n-tire-project-app/src/app/model/prjprojectmaster.model';
import { prjprojectmasterComponent } from '../../../../../../n-tire-project-app/src/app/pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from '../../../../../../n-tire-project-app/src/app/service/prjprojectmaster.service';
//popups
import { boterm} from '../../../../../../n-tire-bo-app/src/app/model/boterm.model';
import { botermComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boterm/boterm.component';
import { botermService } from '../../../../../../n-tire-bo-app/src/app/service/boterm.service';
//popups
import { erpfacostcenter} from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
//popups
//detail table services
import { erpmaterialrequestdetail } from './../../../model/erpmaterialrequestdetail.model';
import { erpmaterialrequestdetailComponent } from './../../../pages/forms/erpmaterialrequestdetail/erpmaterialrequestdetail.component';
//FK services
import { erplocationmaster,IerplocationmasterResponse } from './../../../model/erplocationmaster.model';
import { erplocationmasterComponent } from './../../../pages/forms/erplocationmaster/erplocationmaster.component';
import { erplocationmasterService } from './../../../service/erplocationmaster.service';
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { erpsuppliermaster,IerpsuppliermasterResponse } from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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
selector: 'app-erpmaterialrequest',
templateUrl: './erpmaterialrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpmaterialrequestComponent implements OnInit {
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
bfilterPopulateerpmaterialrequests:boolean=false;
dataerpmaterialrequestsbranchid3:any=[];
dataerpmaterialrequestsmrsid3:any=[];
dataerpmaterialrequestsrequesttype3:any=[];
dataerpmaterialrequestsrequestoruserid3:any=[];
dataerpmaterialrequestsdepartmentid3:any=[];
dataerpmaterialrequestsreasoncategory3:any=[];
dataerpmaterialrequestscriticality3:any=[];
dataerpmaterialrequestsstorelocationid3:any=[];
dataerpmaterialrequestsprojectid3:any=[];
dataerpmaterialrequeststermid3:any=[];
dataerpmaterialrequestscostcenterid3:any=[];
dataerpmaterialrequestdetailswarehouseid3:any=[];
dataerpmaterialrequestdetailsmrsid3:any=[];
dataerpmaterialrequestdetailsitemcategory3:any=[];
dataerpmaterialrequestdetailsitemid3:any=[];
dataerpmaterialrequestdetailsitemsubcategory3:any=[];
dataerpmaterialrequestdetailsuom3:any=[];
dataerpmaterialrequestdetailssupplierid3:any=[];
bfilterPopulateerpmaterialrequestdetails:boolean=false;
@ViewChild('tblerpmaterialrequestdetailssource',{static:false}) tblerpmaterialrequestdetailssource: Ng2SmartTableComponent;
 erpmaterialrequestForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
mrsidList: erpmaterialrequest[];
mrsidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
mrsid_erpmaterialrequestsForm: FormGroup;//autocomplete
mrsid_erpmaterialrequestsoptions:any;//autocomplete
mrsid_erpmaterialrequestsformatter:any;//autocomplete
requesttypeList: boconfigvalue[];
requestoruseridList: bousermaster[];
requestoruseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestoruserid_bousermastersForm: FormGroup;//autocomplete
requestoruserid_bousermastersoptions:any;//autocomplete
requestoruserid_bousermastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
reasoncategoryList: boconfigvalue[];
criticalityList: boconfigvalue[];
storelocationidList: erpbinlocationmaster[];
storelocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
storelocationid_erpbinlocationmastersForm: FormGroup;//autocomplete
storelocationid_erpbinlocationmastersoptions:any;//autocomplete
storelocationid_erpbinlocationmastersformatter:any;//autocomplete
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
termidList: boterm[];
costcenteridList: erpfacostcenter[];
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
erpmaterialrequestshowOption:boolean;
erpmaterialrequestdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpmaterialrequestdetailsvisiblelist:any;
erpmaterialrequestdetailshidelist:any;

DeletederpmaterialrequestdetailIDs: string="";
erpmaterialrequestdetailsID: string = "1";
erpmaterialrequestdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpmaterialrequestservice: erpmaterialrequestService,
private erplocationmasterservice: erplocationmasterService,
private bomasterdataservice: bomasterdataService,
private erpitemmasterservice: erpitemmasterService,
private bosubcategorymasterservice: bosubcategorymasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bousermasterservice:bousermasterService,
private erpbinlocationmasterservice:erpbinlocationmasterService,
private prjprojectmasterservice:prjprojectmasterService,
private botermservice:botermService,
private erpfacostcenterservice:erpfacostcenterService,
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
this.erpmaterialrequestForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
mrsid: [null],
mrsiddesc: [null],
mrscode: [null],
mrsdate: [null, Validators.required],
mrstime: [null],
reference: [null],
requesttype: [null],
requesttypedesc: [null],
requestoruserid: [null, Validators.required],
requestoruseriddesc: [null],
requestorname: [null],
phonenumber: [null],
departmentid: [null],
departmentiddesc: [null],
materialrequireddate: [null],
materialrequiredtime: [null],
reasoncategory: [null],
reasoncategorydesc: [null],
criticality: [null],
criticalitydesc: [null],
storelocationid: [null],
storelocationiddesc: [null],
instructions: [null],
mrsremarks: [null, Validators.required],
projectid: [null],
projectiddesc: [null],
termid: [null],
termiddesc: [null],
terms: [null],
customfield: [null],
attachment: [null],
costcenterid: [null],
costcenteriddesc: [null],
processingstarttime: [null],
processingendtime: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpmaterialrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpmaterialrequestForm.dirty && this.erpmaterialrequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.mrsid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.mrsid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.mrsid && pkDetail) {
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
let erpmaterialrequestid = null;

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
this.formid=erpmaterialrequestid;
//this.sharedService.alert(erpmaterialrequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpmaterialrequestdetailsTableConfig();
  setTimeout(() => {
  this.SeterpmaterialrequestdetailsTableddConfig();
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
if(this.erpmaterialrequestservice.formData && this.erpmaterialrequestservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpmaterialrequestForm.patchValue({
    branchid: this.erpmaterialrequestservice.formData.branchid,
    branchiddesc: this.erpmaterialrequestservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpmaterialrequestForm.get('branchid').value);
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
this.erpmaterialrequestservice.geterpmaterialrequestsList().then(res => 
{
this.mrsidList = res as erpmaterialrequest[];
if(this.erpmaterialrequestservice.formData && this.erpmaterialrequestservice.formData.mrsid){
this.mrsidoptionsEvent.emit(this.mrsidList);
this.erpmaterialrequestForm.patchValue({
    mrsid: this.erpmaterialrequestservice.formData.mrsid,
    mrsiddesc: this.erpmaterialrequestservice.formData.mrsiddesc,
});
}
{
let arrmrsid = this.mrsidList.filter(v => v.mrsid == this.erpmaterialrequestForm.get('mrsid').value);
let objmrsid;
if (arrmrsid.length > 0) objmrsid = arrmrsid[0];
if (objmrsid)
{
}
}
}
).catch((err) => {console.log(err);});
this.mrsid_erpmaterialrequestsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.mrsidList.filter(v => v.mrscode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.mrsid_erpmaterialrequestsformatter = (result: any) => result.mrscode;
this.configservice.getList("materialrequesttype").then(res => this.requesttypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestoruseridList = res as bousermaster[];
if(this.erpmaterialrequestservice.formData && this.erpmaterialrequestservice.formData.requestoruserid){
this.requestoruseridoptionsEvent.emit(this.requestoruseridList);
this.erpmaterialrequestForm.patchValue({
    requestoruserid: this.erpmaterialrequestservice.formData.requestoruserid,
    requestoruseriddesc: this.erpmaterialrequestservice.formData.requestoruseriddesc,
});
}
{
let arrrequestoruserid = this.requestoruseridList.filter(v => v.userid == this.erpmaterialrequestForm.get('requestoruserid').value);
let objrequestoruserid;
if (arrrequestoruserid.length > 0) objrequestoruserid = arrrequestoruserid[0];
if (objrequestoruserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestoruserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestoruseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestoruserid_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("requestcategory").then(res => this.reasoncategoryList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.erpbinlocationmasterservice.geterpbinlocationmastersList().then(res => 
{
this.storelocationidList = res as erpbinlocationmaster[];
if(this.erpmaterialrequestservice.formData && this.erpmaterialrequestservice.formData.storelocationid){
this.storelocationidoptionsEvent.emit(this.storelocationidList);
this.erpmaterialrequestForm.patchValue({
    storelocationid: this.erpmaterialrequestservice.formData.storelocationid,
    storelocationiddesc: this.erpmaterialrequestservice.formData.storelocationiddesc,
});
}
{
let arrstorelocationid = this.storelocationidList.filter(v => v.binid == this.erpmaterialrequestForm.get('storelocationid').value);
let objstorelocationid;
if (arrstorelocationid.length > 0) objstorelocationid = arrstorelocationid[0];
if (objstorelocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.storelocationid_erpbinlocationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.storelocationidList.filter(v => v.binname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.storelocationid_erpbinlocationmastersformatter = (result: any) => result.binname;
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.erpmaterialrequestservice.formData && this.erpmaterialrequestservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.erpmaterialrequestForm.patchValue({
    projectid: this.erpmaterialrequestservice.formData.projectid,
    projectiddesc: this.erpmaterialrequestservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.erpmaterialrequestForm.get('projectid').value);
let objprojectid;
if (arrprojectid.length > 0) objprojectid = arrprojectid[0];
if (objprojectid)
{
}
}
}
).catch((err) => {console.log(err);});
this.projectid_prjprojectmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.projectidList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.projectid_prjprojectmastersformatter = (result: any) => result.projectname;
this.botermservice.getbotermsList().then(res => 
{
this.termidList = res as boterm[];
}
).catch((err) => {console.log(err);});
this.erpfacostcenterservice.geterpfacostcentersList().then(res => 
{
this.costcenteridList = res as erpfacostcenter[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.erpmaterialrequestservice.geterpmaterialrequestsList().then(res => {
      this.pkList = res as erpmaterialrequest[];
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
this.erpmaterialrequestForm.markAsUntouched();
this.erpmaterialrequestForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpmaterialrequestForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedmrsid(mrsidDetail: any) {
if (mrsidDetail.mrsid && mrsidDetail) {
this.erpmaterialrequestForm.patchValue({
mrsid: mrsidDetail.mrsid,
mrsiddesc: mrsidDetail.mrscode,

});

}
}

onSelectedrequestoruserid(requestoruseridDetail: any) {
if (requestoruseridDetail.userid && requestoruseridDetail) {
this.erpmaterialrequestForm.patchValue({
requestoruserid: requestoruseridDetail.userid,
requestoruseriddesc: requestoruseridDetail.username,

});

}
}

onSelectedstorelocationid(storelocationidDetail: any) {
if (storelocationidDetail.binid && storelocationidDetail) {
this.erpmaterialrequestForm.patchValue({
storelocationid: storelocationidDetail.binid,
storelocationiddesc: storelocationidDetail.binname,

});

}
}

onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.erpmaterialrequestForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}




resetForm() {
if (this.erpmaterialrequestForm != null)
this.erpmaterialrequestForm.reset();
this.erpmaterialrequestForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
requestoruserid: this.sessiondata.userid,
requestoruseriddesc: this.sessiondata.username,
});
this.erpmaterialrequestForm.patchValue({
mrsdate: this.ngbDateParserFormatter.parse(new Date().toString()),
mrstime: new Time( new Date().getHours().toString()+":"+new Date().getMinutes().toString()),
materialrequireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
processingstarttime: this.ngbDateParserFormatter.parse(new Date().toISOString()),
processingendtime: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.erpmaterialrequestservice.erpmaterialrequestdetails=[];
this.erpmaterialrequestdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let mrsid = this.erpmaterialrequestForm.get('mrsid').value;
        if(mrsid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpmaterialrequestservice.deleteerpmaterialrequest(mrsid).then(res =>
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
    this.erpmaterialrequestForm.patchValue({
        mrsid: null
    });
    if(this.erpmaterialrequestservice.formData.mrsid!=null)this.erpmaterialrequestservice.formData.mrsid=null;
for (let i=0;i<this.erpmaterialrequestservice.erpmaterialrequestdetails.length;i++) {
this.erpmaterialrequestservice.erpmaterialrequestdetails[i].mrsdetailid=null;
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
        else if(key=="mrsdate")
this.erpmaterialrequestForm.patchValue({"mrsdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="mrstime")
this.erpmaterialrequestForm.patchValue({"mrstime":new Time(mainscreendata[key]) });
        else if(key=="materialrequireddate")
this.erpmaterialrequestForm.patchValue({"materialrequireddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="materialrequiredtime")
this.erpmaterialrequestForm.patchValue({"materialrequiredtime":new Time(mainscreendata[key]) });
        else if(key=="mrsremarks")
this.erpmaterialrequestForm.patchValue({"mrsremarks":  mainscreendata[key] } );
        else if(key=="processingstarttime")
this.erpmaterialrequestForm.patchValue({"processingstarttime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="processingendtime")
this.erpmaterialrequestForm.patchValue({"processingendtime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpmaterialrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpmaterialrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpmaterialrequestForm.controls[key]!=undefined)
{
this.erpmaterialrequestForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpmaterialrequests",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
mrsidonChange(evt:any){
let e=evt.value;
}
mrscodeonChange(evt:any){
let e=evt.value;
}
mrsdateonChange(evt:any){
let e=evt.value;
}
mrstimeonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
requesttypeonChange(evt:any){
let e=this.f.requesttype.value as any;
this.erpmaterialrequestForm.patchValue({requesttypedesc:evt.options[evt.options.selectedIndex].text});
}
requestoruseridonChange(evt:any){
let e=evt.value;
}
requestornameonChange(evt:any){
let e=evt.value;
}
phonenumberonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.erpmaterialrequestForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
materialrequireddateonChange(evt:any){
let e=evt.value;
}
materialrequiredtimeonChange(evt:any){
let e=evt.value;
}
reasoncategoryonChange(evt:any){
let e=this.f.reasoncategory.value as any;
this.erpmaterialrequestForm.patchValue({reasoncategorydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.erpmaterialrequestForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
storelocationidonChange(evt:any){
let e=evt.value;
}
instructionsonChange(evt:any){
let e=evt.value;
}
mrsremarksonChange(evt:any){
let e=evt.value;
}
projectidonChange(evt:any){
let e=evt.value;
}
termidonChange(evt:any){
let e=evt.value;
this.erpmaterialrequestForm.patchValue({termiddesc:evt.options[evt.options.selectedIndex].text});
}
termsonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
costcenteridonChange(evt:any){
let e=evt.value;
this.erpmaterialrequestForm.patchValue({costcenteriddesc:evt.options[evt.options.selectedIndex].text});
}
processingstarttimeonChange(evt:any){
let e=evt.value;
}
processingendtimeonChange(evt:any){
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
  


editerpmaterialrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpmaterialrequestservice.geterpmaterialrequestsByEID(pkcol).then(res => {

this.erpmaterialrequestservice.formData=res.erpmaterialrequest;
let formproperty=res.erpmaterialrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpmaterialrequest.pkcol;
this.formid=res.erpmaterialrequest.mrsid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpmaterialrequest.mrsid;
var mrstimeTime=new Time( res.erpmaterialrequest.mrstime);
var materialrequiredtimeTime=new Time( res.erpmaterialrequest.materialrequiredtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpmaterialrequestForm.patchValue({
branchid: res.erpmaterialrequest.branchid,
branchiddesc: res.erpmaterialrequest.branchiddesc,
mrsid: res.erpmaterialrequest.mrsid,
mrsiddesc: res.erpmaterialrequest.mrsiddesc,
mrscode: res.erpmaterialrequest.mrscode,
mrsdate: this.ngbDateParserFormatter.parse(res.erpmaterialrequest.mrsdate),
mrstime: mrstimeTime,
reference: res.erpmaterialrequest.reference,
requesttype: res.erpmaterialrequest.requesttype,
requesttypedesc: res.erpmaterialrequest.requesttypedesc,
requestoruserid: res.erpmaterialrequest.requestoruserid,
requestoruseriddesc: res.erpmaterialrequest.requestoruseriddesc,
requestorname: res.erpmaterialrequest.requestorname,
phonenumber: res.erpmaterialrequest.phonenumber,
departmentid: res.erpmaterialrequest.departmentid,
departmentiddesc: res.erpmaterialrequest.departmentiddesc,
materialrequireddate: this.ngbDateParserFormatter.parse(res.erpmaterialrequest.materialrequireddate),
materialrequiredtime: materialrequiredtimeTime,
reasoncategory: res.erpmaterialrequest.reasoncategory,
reasoncategorydesc: res.erpmaterialrequest.reasoncategorydesc,
criticality: res.erpmaterialrequest.criticality,
criticalitydesc: res.erpmaterialrequest.criticalitydesc,
storelocationid: res.erpmaterialrequest.storelocationid,
storelocationiddesc: res.erpmaterialrequest.storelocationiddesc,
instructions: res.erpmaterialrequest.instructions,
mrsremarks: JSON.parse(res.erpmaterialrequest.mrsremarks),
projectid: res.erpmaterialrequest.projectid,
projectiddesc: res.erpmaterialrequest.projectiddesc,
termid: res.erpmaterialrequest.termid,
termiddesc: res.erpmaterialrequest.termiddesc,
terms: res.erpmaterialrequest.terms,
customfield: res.erpmaterialrequest.customfield,
attachment: JSON.parse(res.erpmaterialrequest.attachment),
costcenterid: res.erpmaterialrequest.costcenterid,
costcenteriddesc: res.erpmaterialrequest.costcenteriddesc,
processingstarttime: this.ngbDateParserFormatter.parse(res.erpmaterialrequest.processingstarttime),
processingendtime: this.ngbDateParserFormatter.parse(res.erpmaterialrequest.processingendtime),
status: res.erpmaterialrequest.status,
statusdesc: res.erpmaterialrequest.statusdesc,
});
this.erpmaterialrequestdetailsvisiblelist=res.erpmaterialrequestdetailsvisiblelist;
if(this.erpmaterialrequestForm.get('customfield').value!=null && this.erpmaterialrequestForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpmaterialrequestForm.get('customfield').value);
this.FillCustomField();
if(this.erpmaterialrequestForm.get('attachment').value!=null && this.erpmaterialrequestForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpmaterialrequestForm.get('attachment').value);
//Child Tables if any
this.erpmaterialrequestservice.erpmaterialrequestdetails = res.erpmaterialrequestdetails;
this.SeterpmaterialrequestdetailsTableConfig();
this.erpmaterialrequestdetailsLoadTable();
  setTimeout(() => {
  this.SeterpmaterialrequestdetailsTableddConfig();
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
  for (let key in this.erpmaterialrequestForm.controls) {
    if (this.erpmaterialrequestForm.controls[key] != null) {
if(false)
{
if(this.erpmaterialrequestservice.formData!=null && this.erpmaterialrequestservice.formData[key]!=null  && this.erpmaterialrequestservice.formData[key]!='[]' && this.erpmaterialrequestservice.formData[key]!=undefined && this.erpmaterialrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpmaterialrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpmaterialrequestservice.formData!=null && this.erpmaterialrequestservice.formData[key]!=null   && this.erpmaterialrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpmaterialrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpmaterialrequestservice.formData!=null && this.erpmaterialrequestservice.formData[key]!=null   && this.erpmaterialrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpmaterialrequestservice.formData[key]+"'><div class='progress__number'>"+this.erpmaterialrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpmaterialrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpmaterialrequestForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpmaterialrequestForm.value;
obj.mrsdate=new Date(this.erpmaterialrequestForm.get('mrsdate').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('mrsdate').value)+'  UTC' :null);
obj.mrstime=(this.erpmaterialrequestForm.get('mrstime').value==null?0:this.erpmaterialrequestForm.get('mrstime').value.hour)+':'+(this.erpmaterialrequestForm.get('mrstime').value==null?0:this.erpmaterialrequestForm.get('mrstime').value.minute+":00");
obj.materialrequireddate=new Date(this.erpmaterialrequestForm.get('materialrequireddate').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('materialrequireddate').value)+'  UTC' :null);
obj.materialrequiredtime=(this.erpmaterialrequestForm.get('materialrequiredtime').value==null?0:this.erpmaterialrequestForm.get('materialrequiredtime').value.hour)+':'+(this.erpmaterialrequestForm.get('materialrequiredtime').value==null?0:this.erpmaterialrequestForm.get('materialrequiredtime').value.minute+":00");
if(this.erpmaterialrequestForm.get('mrsremarks').value!=null)obj.mrsremarks=JSON.stringify(this.erpmaterialrequestForm.get('mrsremarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
obj.processingstarttime=new Date(this.erpmaterialrequestForm.get('processingstarttime').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('processingstarttime').value)+'  UTC' :null);
obj.processingendtime=new Date(this.erpmaterialrequestForm.get('processingendtime').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('processingendtime').value)+'  UTC' :null);
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

private erpmaterialrequesttoggleOption(){
this.erpmaterialrequestshowOption = this.erpmaterialrequestshowOption === true ? false : true;
}

private erpmaterialrequestdetailtoggleOption(){
this.erpmaterialrequestdetailshowOption = this.erpmaterialrequestdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpmaterialrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpmaterialrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpmaterialrequestForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpmaterialrequestservice.formData=this.erpmaterialrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpmaterialrequestForm.controls[key] != null)
    {
        this.erpmaterialrequestservice.formData[key] = this.erpmaterialrequestForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpmaterialrequestservice.formData.mrsdate=new Date(this.erpmaterialrequestForm.get('mrsdate').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('mrsdate').value)+'  UTC' :null);
this.erpmaterialrequestservice.formData.mrstime=(this.erpmaterialrequestForm.get('mrstime').value==null?0:this.erpmaterialrequestForm.get('mrstime').value.hour)+':'+(this.erpmaterialrequestForm.get('mrstime').value==null?0:this.erpmaterialrequestForm.get('mrstime').value.minute+":00");
this.erpmaterialrequestservice.formData.materialrequireddate=new Date(this.erpmaterialrequestForm.get('materialrequireddate').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('materialrequireddate').value)+'  UTC' :null);
this.erpmaterialrequestservice.formData.materialrequiredtime=(this.erpmaterialrequestForm.get('materialrequiredtime').value==null?0:this.erpmaterialrequestForm.get('materialrequiredtime').value.hour)+':'+(this.erpmaterialrequestForm.get('materialrequiredtime').value==null?0:this.erpmaterialrequestForm.get('materialrequiredtime').value.minute+":00");
if(this.erpmaterialrequestForm.get('mrsremarks').value!=null)this.erpmaterialrequestservice.formData.mrsremarks=JSON.stringify(this.erpmaterialrequestForm.get('mrsremarks').value);
if(customfields!=null)this.erpmaterialrequestservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpmaterialrequestservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpmaterialrequestservice.formData.processingstarttime=new Date(this.erpmaterialrequestForm.get('processingstarttime').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('processingstarttime').value)+'  UTC' :null);
this.erpmaterialrequestservice.formData.processingendtime=new Date(this.erpmaterialrequestForm.get('processingendtime').value ? this.ngbDateParserFormatter.format(this.erpmaterialrequestForm.get('processingendtime').value)+'  UTC' :null);
this.erpmaterialrequestservice.formData.DeletederpmaterialrequestdetailIDs = this.DeletederpmaterialrequestdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpmaterialrequestservice.formData);
this.erpmaterialrequestservice.formData=this.erpmaterialrequestForm.value;
this.erpmaterialrequestservice.saveOrUpdateerpmaterialrequests().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpmaterialrequestdetailssource.data)
{
    for (let i = 0; i < this.erpmaterialrequestdetailssource.data.length; i++)
    {
        if (this.erpmaterialrequestdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpmaterialrequestdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpmaterialrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpmaterialrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpmaterialrequest);
}
else
{
this.FillData(res);
}
}
this.erpmaterialrequestForm.markAsUntouched();
this.erpmaterialrequestForm.markAsPristine();
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
data: {branchid:this.erpmaterialrequestForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmrsid( mrsid) {
/*let ScreenType='2';
this.dialog.open(erpmaterialrequestComponent, 
{
data: {mrsid:this.erpmaterialrequestForm.get('mrsid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestoruserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpmaterialrequestForm.get('requestoruserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpmaterialrequestForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstorelocationid( binid) {
/*let ScreenType='2';
this.dialog.open(erpbinlocationmasterComponent, 
{
data: {binid:this.erpmaterialrequestForm.get('storelocationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.erpmaterialrequestForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittermid( termid) {
/*let ScreenType='2';
this.dialog.open(botermComponent, 
{
data: {termid:this.erpmaterialrequestForm.get('termid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcostcenterid( costcenterid) {
/*let ScreenType='2';
this.dialog.open(erpfacostcenterComponent, 
{
data: {costcenterid:this.erpmaterialrequestForm.get('costcenterid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpmaterialrequestdetail(event:any,mrsdetailid:any, mrsid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpmaterialrequestdetailComponent, 
{
data:  {  showview:false,save:false,event,mrsdetailid, mrsid,visiblelist:this.erpmaterialrequestdetailsvisiblelist,  hidelist:this.erpmaterialrequestdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpmaterialrequestdetailssource.add(res);
this.erpmaterialrequestdetailssource.refresh();
}
else
{
this.erpmaterialrequestdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpmaterialrequestdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpmaterialrequestdetailIDs += childID + ",";
this.erpmaterialrequestservice.erpmaterialrequestdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpmaterialrequestdetails
erpmaterialrequestdetailssettings:any;
erpmaterialrequestdetailssource: any;

showerpmaterialrequestdetailsCheckbox()
{
debugger;
if(this.tblerpmaterialrequestdetailssource.settings['selectMode']== 'multi')this.tblerpmaterialrequestdetailssource.settings['selectMode']= 'single';
else
this.tblerpmaterialrequestdetailssource.settings['selectMode']= 'multi';
this.tblerpmaterialrequestdetailssource.initGrid();
}
deleteerpmaterialrequestdetailsAll()
{
this.tblerpmaterialrequestdetailssource.settings['selectMode'] = 'single';
}
showerpmaterialrequestdetailsFilter()
{
  setTimeout(() => {
  this.SeterpmaterialrequestdetailsTableddConfig();
  });
      if(this.tblerpmaterialrequestdetailssource.settings!=null)this.tblerpmaterialrequestdetailssource.settings['hideSubHeader'] =!this.tblerpmaterialrequestdetailssource.settings['hideSubHeader'];
this.tblerpmaterialrequestdetailssource.initGrid();
}
showerpmaterialrequestdetailsInActive()
{
}
enableerpmaterialrequestdetailsInActive()
{
}
async SeterpmaterialrequestdetailsTableddConfig()
{
if(!this.bfilterPopulateerpmaterialrequestdetails){
}
this.bfilterPopulateerpmaterialrequestdetails=true;
}
async erpmaterialrequestdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpmaterialrequestdetailsTableConfig()
{
this.erpmaterialrequestdetailssettings = {
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
itemcategory: {
title: 'Item Category',
type: 'number',
filter:true,
},
itemsubcategory: {
title: 'Item Sub Category',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
itemdescription: {
title: 'Item Description',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: '',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
warehouseid: {
title: 'Warehouse',
type: 'number',
filter:true,
},
itemcost: {
title: 'Item Cost',
type: 'number',
filter:true,
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
mrsremarks: {
title: 'M R S Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
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
erpmaterialrequestdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpmaterialrequestdetailsID)>=0)
{
this.erpmaterialrequestdetailssource=new LocalDataSource();
this.erpmaterialrequestdetailssource.load(this.erpmaterialrequestservice.erpmaterialrequestdetails as  any as LocalDataSource);
this.erpmaterialrequestdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpmaterialrequestdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpmaterialrequestservice.erpmaterialrequestdetails.length == 0)
{
    this.tblerpmaterialrequestdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpmaterialrequestdetail();
    this.erpmaterialrequestservice.erpmaterialrequestdetails.push(obj);
    this.erpmaterialrequestdetailssource.refresh();
    if ((this.erpmaterialrequestservice.erpmaterialrequestdetails.length / this.erpmaterialrequestdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpmaterialrequestdetailssource.getPaging().page)
    {
        this.erpmaterialrequestdetailssource.setPage((this.erpmaterialrequestservice.erpmaterialrequestdetails.length / this.erpmaterialrequestdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpmaterialrequestdetailssource.grid.edit(this.tblerpmaterialrequestdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpmaterialrequestdetailssource.data.indexOf(event.data);
this.onDeleteerpmaterialrequestdetail(event,event.data.mrsdetailid,((this.erpmaterialrequestdetailssource.getPaging().page-1) *this.erpmaterialrequestdetailssource.getPaging().perPage)+index);
this.erpmaterialrequestdetailssource.refresh();
break;
}
}

*/
erpmaterialrequestdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpmaterialrequestdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpmaterialrequestdetail(event,event.data.mrsdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpmaterialrequestdetail(event,event.data.mrsdetailid,((this.erpmaterialrequestdetailssource.getPaging().page-1) *this.erpmaterialrequestdetailssource.getPaging().perPage)+event.index);
this.erpmaterialrequestdetailssource.refresh();
break;
}
}
erpmaterialrequestdetailsonDelete(obj) {
let mrsdetailid=obj.data.mrsdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpmaterialrequestservice.deleteerpmaterialrequest(mrsdetailid).then(res=>
this.erpmaterialrequestdetailsLoadTable()
);
}
}
erpmaterialrequestdetailsPaging(val)
{
debugger;
this.erpmaterialrequestdetailssource.setPaging(1, val, true);
}

handleerpmaterialrequestdetailsGridSelected(event:any) {
this.erpmaterialrequestdetailsselectedindex=this.erpmaterialrequestservice.erpmaterialrequestdetails.findIndex(i => i.mrsdetailid === event.data.mrsdetailid);
}
IserpmaterialrequestdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpmaterialrequestdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpmaterialrequestdetails

}



