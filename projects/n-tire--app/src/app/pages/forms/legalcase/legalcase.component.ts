import { legalcaseService } from './../../../service/legalcase.service';
import { legalcase } from './../../../model/legalcase.model';
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
//hyperlinks services
//FK field services
import { legalcourtmaster} from './../../../model/legalcourtmaster.model';
import { legalcourtmasterComponent } from './../../../pages/forms/legalcourtmaster/legalcourtmaster.component';
import { legalcourtmasterService } from './../../../service/legalcourtmaster.service';
//popups
import { legalcustomermaster} from './../../../model/legalcustomermaster.model';
import { legalcustomermasterComponent } from './../../../pages/forms/legalcustomermaster/legalcustomermaster.component';
import { legalcustomermasterService } from './../../../service/legalcustomermaster.service';
//popups
import { legalopponentmaster} from './../../../model/legalopponentmaster.model';
import { legalopponentmasterComponent } from './../../../pages/forms/legalopponentmaster/legalopponentmaster.component';
import { legalopponentmasterService } from './../../../service/legalopponentmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { legallawyermaster} from './../../../model/legallawyermaster.model';
import { legallawyermasterComponent } from './../../../pages/forms/legallawyermaster/legallawyermaster.component';
import { legallawyermasterService } from './../../../service/legallawyermaster.service';
//popups
//detail table services
import { legalcaselawyer } from './../../../model/legalcaselawyer.model';
import { legalcaselawyerComponent } from './../../../pages/forms/legalcaselawyer/legalcaselawyer.component';
//FK services
import { legalcasepartydetail } from './../../../model/legalcasepartydetail.model';
import { legalcasepartydetailComponent } from './../../../pages/forms/legalcasepartydetail/legalcasepartydetail.component';
//FK services
import { legalcaseprocessdetail } from './../../../model/legalcaseprocessdetail.model';
import { legalcaseprocessdetailComponent } from './../../../pages/forms/legalcaseprocessdetail/legalcaseprocessdetail.component';
//FK services
import { legalcourtprocessmaster,IlegalcourtprocessmasterResponse } from './../../../model/legalcourtprocessmaster.model';
import { legalcourtprocessmasterComponent } from './../../../pages/forms/legalcourtprocessmaster/legalcourtprocessmaster.component';
import { legalcourtprocessmasterService } from './../../../service/legalcourtprocessmaster.service';
import { legalcaseinterimorder } from './../../../model/legalcaseinterimorder.model';
import { legalcaseinterimorderComponent } from './../../../pages/forms/legalcaseinterimorder/legalcaseinterimorder.component';
//FK services
import { legalcasereferredcase } from './../../../model/legalcasereferredcase.model';
import { legalcasereferredcaseComponent } from './../../../pages/forms/legalcasereferredcase/legalcasereferredcase.component';
//FK services
import { legalcasekb } from './../../../model/legalcasekb.model';
import { legalcasekbComponent } from './../../../pages/forms/legalcasekb/legalcasekb.component';
//FK services
import { bokbmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
import { bokbmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bokbmaster.service';
import { legaltaskmaster } from './../../../model/legaltaskmaster.model';
import { legaltaskmasterComponent } from './../../../pages/forms/legaltaskmaster/legaltaskmaster.component';
//FK services
import { boexpense } from '../../../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
import { legalfreenote } from './../../../model/legalfreenote.model';
import { legalfreenoteComponent } from './../../../pages/forms/legalfreenote/legalfreenote.component';
//FK services
import { legalcommunicationdetail } from './../../../model/legalcommunicationdetail.model';
import { legalcommunicationdetailComponent } from './../../../pages/forms/legalcommunicationdetail/legalcommunicationdetail.component';
//FK services
import { legalcasepartydetailService } from './../../../service/legalcasepartydetail.service';
import { legalcaseagainstemployee } from './../../../model/legalcaseagainstemployee.model';
import { legalcaseagainstemployeeComponent } from './../../../pages/forms/legalcaseagainstemployee/legalcaseagainstemployee.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
import { legalcasehearing } from '../../../../../../n-tire--app/src/app/model/legalcasehearing.model';
import { legalcasehearingComponent } from '../../../../../../n-tire--app/src/app/pages/forms/legalcasehearing/legalcasehearing.component';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-legalcase',
templateUrl: './legalcase.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcaseComponent implements OnInit {
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
bfilterPopulatelegalcases:boolean=false;
datalegalcasescourtid3:any=[];
datalegalcasespetitiontype3:any=[];
datalegalcasescustomerid3:any=[];
datalegalcasescustomerposition3:any=[];
datalegalcasesopponentid3:any=[];
datalegalcasesopponentposition3:any=[];
datalegalcasespreviouscasenumber3:any=[];
datalegalcasesrequestedby3:any=[];
datalegalcasesassignedby3:any=[];
datalegalcasescasemode3:any=[];
datalegalcasescasetype3:any=[];
datalegalcasescasesubtype3:any=[];
datalegalcasescategory3:any=[];
datalegalcasesnature3:any=[];
datalegalcasescomplexity3:any=[];
datalegalcasespriority3:any=[];
datalegalcasestimeline3:any=[];
datalegalcasesjudgementoutcome3:any=[];
datalegalcasesactionby3:any=[];
datalegalcasescasestage3:any=[];
datalegalcasescasestatus3:any=[];
datalegalcaseslawyer3:any=[];
datalegalcaselawyerslawyerid3:any=[];
datalegalcaselawyerslawyertype3:any=[];
bfilterPopulatelegalcaselawyers:boolean=false;
datalegalcasepartydetailspartytype3:any=[];
datalegalcasepartydetailsgender3:any=[];
datalegalcasepartydetailsposition3:any=[];
bfilterPopulatelegalcasepartydetails:boolean=false;
datalegalcaseprocessdetailsprocessid3:any=[];
datalegalcaseprocessdetailslawyerid3:any=[];
bfilterPopulatelegalcaseprocessdetails:boolean=false;
bfilterPopulatelegalcaseinterimorders:boolean=false;
datalegalcasereferredcaseslinkedcaseid3:any=[];
datalegalcasereferredcasescaseid3:any=[];
bfilterPopulatelegalcasereferredcases:boolean=false;
bfilterPopulatelegalcasekbs:boolean=false;
datalegaltaskmasterscustomerid3:any=[];
datalegaltaskmasterscaseid3:any=[];
datalegaltaskmasterstasktype3:any=[];
datalegaltaskmasterstaskcategory3:any=[];
datalegaltaskmastersratetype3:any=[];
datalegaltaskmasterstaskstatus3:any=[];
datalegaltaskmasterstasksubtype3:any=[];
datalegaltaskmasterspriority3:any=[];
bfilterPopulatelegaltaskmasters:boolean=false;
databoexpensescostcenterid3:any=[];
databoexpensesrequesteduserid3:any=[];
databoexpensesexpensetype3:any=[];
databoexpensesexpensecategory3:any=[];
databoexpensescurrency3:any=[];
databoexpensesbasecurrency3:any=[];
bfilterPopulateboexpenses:boolean=false;
datalegalfreenotesenteredby3:any=[];
bfilterPopulatelegalfreenotes:boolean=false;
datalegalcommunicationdetailscategoryid3:any=[];
datalegalcommunicationdetailsdocumenttypeid3:any=[];
datalegalcommunicationdetailspartyid3:any=[];
datalegalcommunicationdetailsmode3:any=[];
datalegalcommunicationdetailspartytype3:any=[];
bfilterPopulatelegalcommunicationdetails:boolean=false;
datalegalcaseagainstemployeesemployeeid3:any=[];
datalegalcaseagainstemployeesissuecategory3:any=[];
datalegalcaseagainstemployeescaseid3:any=[];
datalegalcaseagainstemployeesdepartmentid3:any=[];
bfilterPopulatelegalcaseagainstemployees:boolean=false;
bfilterPopulatelegalcasehearings:boolean=false;
@ViewChild('tbllegalcaselawyerssource',{static:false}) tbllegalcaselawyerssource: Ng2SmartTableComponent;
@ViewChild('tbllegalcasepartydetailssource',{static:false}) tbllegalcasepartydetailssource: Ng2SmartTableComponent;
@ViewChild('tbllegalcaseprocessdetailssource',{static:false}) tbllegalcaseprocessdetailssource: Ng2SmartTableComponent;
@ViewChild('tbllegalcaseinterimorderssource',{static:false}) tbllegalcaseinterimorderssource: Ng2SmartTableComponent;
@ViewChild('tbllegalcasereferredcasessource',{static:false}) tbllegalcasereferredcasessource: Ng2SmartTableComponent;
@ViewChild('tbllegalcasekbssource',{static:false}) tbllegalcasekbssource: Ng2SmartTableComponent;
@ViewChild('tbllegaltaskmasterssource',{static:false}) tbllegaltaskmasterssource: Ng2SmartTableComponent;
@ViewChild('tblboexpensessource',{static:false}) tblboexpensessource: Ng2SmartTableComponent;
@ViewChild('tbllegalfreenotessource',{static:false}) tbllegalfreenotessource: Ng2SmartTableComponent;
@ViewChild('tbllegalcommunicationdetailssource',{static:false}) tbllegalcommunicationdetailssource: Ng2SmartTableComponent;
@ViewChild('tbllegalcaseagainstemployeessource',{static:false}) tbllegalcaseagainstemployeessource: Ng2SmartTableComponent;
@ViewChild('tbllegalcasehearingssource',{static:false}) tbllegalcasehearingssource: Ng2SmartTableComponent;
 legalcaseForm: FormGroup;
courtidList: legalcourtmaster[];
petitiontypeList: boconfigvalue[];
customeridList: legalcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_legalcustomermastersForm: FormGroup;//autocomplete
customerid_legalcustomermastersoptions:any;//autocomplete
customerid_legalcustomermastersformatter:any;//autocomplete
customerpositionList: boconfigvalue[];
opponentidList: legalopponentmaster[];
opponentpositionList: boconfigvalue[];
previouscasenumberList: legalcase[];
previouscasenumberoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
previouscasenumber_legalcasesForm: FormGroup;//autocomplete
previouscasenumber_legalcasesoptions:any;//autocomplete
previouscasenumber_legalcasesformatter:any;//autocomplete
requestedbyList: bousermaster[];
requestedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestedby_bousermastersForm: FormGroup;//autocomplete
requestedby_bousermastersoptions:any;//autocomplete
requestedby_bousermastersformatter:any;//autocomplete
assignedbyList: bousermaster[];
assignedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignedby_bousermastersForm: FormGroup;//autocomplete
assignedby_bousermastersoptions:any;//autocomplete
assignedby_bousermastersformatter:any;//autocomplete
casemodeList: bomasterdata[];
casetypeList: bomasterdata[];
casesubtypeList: bosubcategorymaster[];
categoryList: boconfigvalue[];
natureList: boconfigvalue[];
complexityList: boconfigvalue[];
priorityList: boconfigvalue[];
timelineList: boconfigvalue[];
judgementoutcomeList: boconfigvalue[];
actionbyList: bousermaster[];
actionbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
actionby_bousermastersForm: FormGroup;//autocomplete
actionby_bousermastersoptions:any;//autocomplete
actionby_bousermastersformatter:any;//autocomplete
casestageList: boconfigvalue[];
casestatusList: boconfigvalue[];
lawyerList: legallawyermaster[];
lawyeroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
lawyer_legallawyermastersForm: FormGroup;//autocomplete
lawyer_legallawyermastersoptions:any;//autocomplete
lawyer_legallawyermastersformatter:any;//autocomplete
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
legalcaseshowOption:boolean;
legalcaselawyershowOption:boolean;
legalcasepartydetailshowOption:boolean;
legalcaseprocessdetailshowOption:boolean;
legalcaseinterimordershowOption:boolean;
legalcasereferredcaseshowOption:boolean;
legalcasekbshowOption:boolean;
legaltaskmastershowOption:boolean;
boexpenseshowOption:boolean;
legalfreenoteshowOption:boolean;
legalcommunicationdetailshowOption:boolean;
legalcaseagainstemployeeshowOption:boolean;
legalcasehearingshowOption:boolean;
sessiondata:any;
sourcekey:any;



legalcaselawyersvisiblelist:any;
legalcaselawyershidelist:any;
legalcasepartydetailsvisiblelist:any;
legalcasepartydetailshidelist:any;
legalcaseprocessdetailsvisiblelist:any;
legalcaseprocessdetailshidelist:any;
legalcaseinterimordersvisiblelist:any;
legalcaseinterimordershidelist:any;
legalcasereferredcasesvisiblelist:any;
legalcasereferredcaseshidelist:any;
legalcasekbsvisiblelist:any;
legalcasekbshidelist:any;
legaltaskmastersvisiblelist:any;
legaltaskmastershidelist:any;
boexpensesvisiblelist:any;
boexpenseshidelist:any;
legalfreenotesvisiblelist:any;
legalfreenoteshidelist:any;
legalcommunicationdetailsvisiblelist:any;
legalcommunicationdetailshidelist:any;
legalcaseagainstemployeesvisiblelist:any;
legalcaseagainstemployeeshidelist:any;
legalcasehearingsvisiblelist:any;
legalcasehearingshidelist:any;

DeletedlegalcaselawyerIDs: string="";
legalcaselawyersID: string = "1";
legalcaselawyersselectedindex:any;
DeletedlegalcasepartydetailIDs: string="";
legalcasepartydetailsID: string = "2";
legalcasepartydetailsselectedindex:any;
DeletedlegalcaseprocessdetailIDs: string="";
legalcaseprocessdetailsID: string = "3";
legalcaseprocessdetailsselectedindex:any;
DeletedlegalcaseinterimorderIDs: string="";
legalcaseinterimordersID: string = "4";
legalcaseinterimordersselectedindex:any;
DeletedlegalcasereferredcaseIDs: string="";
legalcasereferredcasesID: string = "5";
legalcasereferredcasesselectedindex:any;
DeletedlegalcasekbIDs: string="";
legalcasekbsID: string = "6";
legalcasekbsselectedindex:any;
DeletedlegaltaskmasterIDs: string="";
legaltaskmastersID: string = "7";
legaltaskmastersselectedindex:any;
DeletedboexpenseIDs: string="";
boexpensesID: string = "8";
boexpensesselectedindex:any;
DeletedlegalfreenoteIDs: string="";
legalfreenotesID: string = "9";
legalfreenotesselectedindex:any;
DeletedlegalcommunicationdetailIDs: string="";
legalcommunicationdetailsID: string = "10";
legalcommunicationdetailsselectedindex:any;
DeletedlegalcaseagainstemployeeIDs: string="";
legalcaseagainstemployeesID: string = "11";
legalcaseagainstemployeesselectedindex:any;
DeletedlegalcasehearingIDs: string="";
legalcasehearingsID: string = "12";
legalcasehearingsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcaseservice: legalcaseService,
private bousermasterservice: bousermasterService,
private legallawyermasterservice: legallawyermasterService,
private bomasterdataservice: bomasterdataService,
private legalcourtprocessmasterservice: legalcourtprocessmasterService,
private bokbmasterservice: bokbmasterService,
private legalcustomermasterservice: legalcustomermasterService,
private bosubcategorymasterservice: bosubcategorymasterService,
private erpfacostcenterservice: erpfacostcenterService,
private legalcasepartydetailservice: legalcasepartydetailService,
private hrmsemployeeservice: hrmsemployeeService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legalcourtmasterservice:legalcourtmasterService,
private legalopponentmasterservice:legalopponentmasterService,
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
this.legalcaseForm  = this.fb.group({
pk:[null],
ImageName: [null],
caseid: [null],
casecode: [null],
casenumber: [null, Validators.required],
internalreferencenumber: [null],
courtid: [null, Validators.required],
courtiddesc: [null],
petitiontype: [null],
petitiontypedesc: [null],
customerid: [null, Validators.required],
customeriddesc: [null],
customerposition: [null],
customerpositiondesc: [null],
opponentid: [null],
opponentiddesc: [null],
opponentposition: [null],
opponentpositiondesc: [null],
casedate: [null, Validators.required],
casereceiveddate: [null],
duedate: [null],
noticedate: [null],
fileddate: [null],
previouscasenumber: [null],
previouscasenumberdesc: [null],
caseowner: [null],
requestedby: [null],
requestedbydesc: [null],
assignedby: [null],
assignedbydesc: [null],
casemode: [null],
casemodedesc: [null],
casetype: [null, Validators.required],
casetypedesc: [null],
casesubtype: [null],
casesubtypedesc: [null],
casetitle: [null, Validators.required],
casedetails: [null],
firstdateofhearing: [null],
date1: [null],
notes1: [null],
date2: [null],
notes2: [null],
date3: [null],
notes3: [null],
category: [null],
categorydesc: [null],
nature: [null],
naturedesc: [null],
complexity: [null],
complexitydesc: [null],
priority: [null],
prioritydesc: [null],
timeline: [null],
timelinedesc: [null],
amountinvolved: [null],
judgementvalue: [null],
amountreceived: [null],
customfield: [null],
attachment: [null],
judgementdate: [null],
judgementinfavour: [null],
judgementoutcome: [null],
judgementoutcomedesc: [null],
judgementdescription: [null],
actiontobetaken: [null],
actionby: [null],
actionbydesc: [null],
actionimplemented: [null],
contestfurther: [null],
closeddate: [null],
casestage: [null],
casestagedesc: [null],
casestatus: [null],
casestatusdesc: [null],
lawyer: [null],
lawyerdesc: [null],
lastprocess: [null],
currentprocess: [null],
nexthearingdate: [null],
casetag: [null],
notes: [null],
status: [null],
statusdesc: [null],
view: [null],
});
}

get f() { return this.legalcaseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcaseForm.dirty && this.legalcaseForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
casenumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.casenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].caseid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Case Number value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.caseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.caseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.caseid && pkDetail) {
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
let legalcaseid = null;

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
this.formid=legalcaseid;
//this.sharedService.alert(legalcaseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegalcaselawyersTableConfig();
  setTimeout(() => {
  this.SetlegalcaselawyersTableddConfig();
  });

this.SetlegalcasepartydetailsTableConfig();
  setTimeout(() => {
  this.SetlegalcasepartydetailsTableddConfig();
  });

this.SetlegalcaseprocessdetailsTableConfig();
  setTimeout(() => {
  this.SetlegalcaseprocessdetailsTableddConfig();
  });

this.SetlegalcaseinterimordersTableConfig();
  setTimeout(() => {
  this.SetlegalcaseinterimordersTableddConfig();
  });

this.SetlegalcasereferredcasesTableConfig();
  setTimeout(() => {
  this.SetlegalcasereferredcasesTableddConfig();
  });

this.SetlegalcasekbsTableConfig();
  setTimeout(() => {
  this.SetlegalcasekbsTableddConfig();
  });

this.SetlegaltaskmastersTableConfig();
  setTimeout(() => {
  this.SetlegaltaskmastersTableddConfig();
  });

this.SetboexpensesTableConfig();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });

this.SetlegalfreenotesTableConfig();
  setTimeout(() => {
  this.SetlegalfreenotesTableddConfig();
  });

this.SetlegalcommunicationdetailsTableConfig();
  setTimeout(() => {
  this.SetlegalcommunicationdetailsTableddConfig();
  });

this.SetlegalcaseagainstemployeesTableConfig();
  setTimeout(() => {
  this.SetlegalcaseagainstemployeesTableddConfig();
  });

this.SetlegalcasehearingsTableConfig();
  setTimeout(() => {
  this.SetlegalcasehearingsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legalcourtmasterservice.getlegalcourtmastersList().then(res => 
{
this.courtidList = res as legalcourtmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("petitiontype").then(res => this.petitiontypeList = res as boconfigvalue[]);
this.legalcustomermasterservice.getlegalcustomermastersList().then(res => 
{
this.customeridList = res as legalcustomermaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.legalcaseForm.patchValue({
    customerid: this.legalcaseservice.formData.customerid,
    customeriddesc: this.legalcaseservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.legalcaseForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_legalcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.customername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_legalcustomermastersformatter = (result: any) => result.customername;
this.configservice.getList("legalposition").then(res => this.customerpositionList = res as boconfigvalue[]);
this.legalopponentmasterservice.getlegalopponentmastersList().then(res => 
{
this.opponentidList = res as legalopponentmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("legalposition").then(res => this.opponentpositionList = res as boconfigvalue[]);
this.legalcaseservice.getlegalcasesList().then(res => 
{
this.previouscasenumberList = res as legalcase[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.previouscasenumber){
this.previouscasenumberoptionsEvent.emit(this.previouscasenumberList);
this.legalcaseForm.patchValue({
    previouscasenumber: this.legalcaseservice.formData.previouscasenumber,
    previouscasenumberdesc: this.legalcaseservice.formData.previouscasenumberdesc,
});
}
{
let arrpreviouscasenumber = this.previouscasenumberList.filter(v => v.caseid == this.legalcaseForm.get('previouscasenumber').value);
let objpreviouscasenumber;
if (arrpreviouscasenumber.length > 0) objpreviouscasenumber = arrpreviouscasenumber[0];
if (objpreviouscasenumber)
{
}
}
}
).catch((err) => {console.log(err);});
this.previouscasenumber_legalcasesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.previouscasenumberList.filter(v => v.casetitle.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.previouscasenumber_legalcasesformatter = (result: any) => result.casetitle;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestedbyList = res as bousermaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.requestedby){
this.requestedbyoptionsEvent.emit(this.requestedbyList);
this.legalcaseForm.patchValue({
    requestedby: this.legalcaseservice.formData.requestedby,
    requestedbydesc: this.legalcaseservice.formData.requestedbydesc,
});
}
{
let arrrequestedby = this.requestedbyList.filter(v => v.userid == this.legalcaseForm.get('requestedby').value);
let objrequestedby;
if (arrrequestedby.length > 0) objrequestedby = arrrequestedby[0];
if (objrequestedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestedby_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assignedbyList = res as bousermaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.assignedby){
this.assignedbyoptionsEvent.emit(this.assignedbyList);
this.legalcaseForm.patchValue({
    assignedby: this.legalcaseservice.formData.assignedby,
    assignedbydesc: this.legalcaseservice.formData.assignedbydesc,
});
}
{
let arrassignedby = this.assignedbyList.filter(v => v.userid == this.legalcaseForm.get('assignedby').value);
let objassignedby;
if (arrassignedby.length > 0) objassignedby = arrassignedby[0];
if (objassignedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignedby_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("ij9m5").then(res => {
this.casemodeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("rh28d").then(res => {
this.casetypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.casetype.value && this.f.casetype.value!="" && this.f.casetype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.casetype.value).then(res =>{
this.casesubtypeList = res as bosubcategorymaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.casesubtype){this.legalcaseForm.patchValue({
    casesubtype: this.legalcaseservice.formData.casesubtype,
    casesubtypedesc: this.legalcaseservice.formData.casesubtypedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("casecategory").then(res => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("casenature").then(res => this.natureList = res as boconfigvalue[]);
this.configservice.getList("complexity").then(res => this.complexityList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("timeline").then(res => this.timelineList = res as boconfigvalue[]);
this.configservice.getList("legalcasestatus").then(res => this.judgementoutcomeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.actionbyList = res as bousermaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.actionby){
this.actionbyoptionsEvent.emit(this.actionbyList);
this.legalcaseForm.patchValue({
    actionby: this.legalcaseservice.formData.actionby,
    actionbydesc: this.legalcaseservice.formData.actionbydesc,
});
}
{
let arractionby = this.actionbyList.filter(v => v.userid == this.legalcaseForm.get('actionby').value);
let objactionby;
if (arractionby.length > 0) objactionby = arractionby[0];
if (objactionby)
{
}
}
}
).catch((err) => {console.log(err);});
this.actionby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.actionbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.actionby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("casestage").then(res => this.casestageList = res as boconfigvalue[]);
this.configservice.getList("casestatus").then(res => this.casestatusList = res as boconfigvalue[]);
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.lawyerList = res as legallawyermaster[];
if(this.legalcaseservice.formData && this.legalcaseservice.formData.lawyer){
this.lawyeroptionsEvent.emit(this.lawyerList);
this.legalcaseForm.patchValue({
    lawyer: this.legalcaseservice.formData.lawyer,
    lawyerdesc: this.legalcaseservice.formData.lawyerdesc,
});
}
{
let arrlawyer = this.lawyerList.filter(v => v.lawyerid == this.legalcaseForm.get('lawyer').value);
let objlawyer;
if (arrlawyer.length > 0) objlawyer = arrlawyer[0];
if (objlawyer)
{
}
}
}
).catch((err) => {console.log(err);});
this.lawyer_legallawyermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.lawyerList.filter(v => v.lawyername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.lawyer_legallawyermastersformatter = (result: any) => result.lawyername;

//autocomplete
    this.legalcaseservice.getlegalcasesList().then(res => {
      this.pkList = res as legalcase[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.casenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.casenumber;

//setting the flag that the screen is not touched 
this.legalcaseForm.markAsUntouched();
this.legalcaseForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.legalcaseForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.customername,

});

}
}

onSelectedpreviouscasenumber(previouscasenumberDetail: any) {
if (previouscasenumberDetail.caseid && previouscasenumberDetail) {
this.legalcaseForm.patchValue({
previouscasenumber: previouscasenumberDetail.caseid,
previouscasenumberdesc: previouscasenumberDetail.casetitle,

});

}
}

onSelectedrequestedby(requestedbyDetail: any) {
if (requestedbyDetail.userid && requestedbyDetail) {
this.legalcaseForm.patchValue({
requestedby: requestedbyDetail.userid,
requestedbydesc: requestedbyDetail.username,

});

}
}

onSelectedassignedby(assignedbyDetail: any) {
if (assignedbyDetail.userid && assignedbyDetail) {
this.legalcaseForm.patchValue({
assignedby: assignedbyDetail.userid,
assignedbydesc: assignedbyDetail.username,

});

}
}

onSelectedactionby(actionbyDetail: any) {
if (actionbyDetail.userid && actionbyDetail) {
this.legalcaseForm.patchValue({
actionby: actionbyDetail.userid,
actionbydesc: actionbyDetail.username,

});

}
}

onSelectedlawyer(lawyerDetail: any) {
if (lawyerDetail.lawyerid && lawyerDetail) {
this.legalcaseForm.patchValue({
lawyer: lawyerDetail.lawyerid,
lawyerdesc: lawyerDetail.lawyername,

});

}
}




resetForm() {
if (this.legalcaseForm != null)
this.legalcaseForm.reset();
this.legalcaseForm.patchValue({
requestedby: this.sessiondata.userid,
requestedbydesc: this.sessiondata.username,
assignedby: this.sessiondata.userid,
assignedbydesc: this.sessiondata.username,
actionby: this.sessiondata.userid,
actionbydesc: this.sessiondata.username,
});
this.legalcaseForm.patchValue({
casedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
casereceiveddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
duedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
noticedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
fileddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
requestedby: this.sessiondata.userid,
assignedby: this.sessiondata.userid,
firstdateofhearing: this.ngbDateParserFormatter.parse(new Date().toISOString()),
date1: this.ngbDateParserFormatter.parse(new Date().toISOString()),
date2: this.ngbDateParserFormatter.parse(new Date().toISOString()),
date3: this.ngbDateParserFormatter.parse(new Date().toISOString()),
judgementdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
closeddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
nexthearingdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.legalcaseservice.legalcaselawyers=[];
this.legalcaselawyersLoadTable();
this.legalcaseservice.legalcasepartydetails=[];
this.legalcasepartydetailsLoadTable();
this.legalcaseservice.legalcaseprocessdetails=[];
this.legalcaseprocessdetailsLoadTable();
this.legalcaseservice.legalcaseinterimorders=[];
this.legalcaseinterimordersLoadTable();
this.legalcaseservice.legalcasereferredcases=[];
this.legalcaseservice.Insertlegalcasereferredcases=[];
this.legalcasereferredcasesLoadTable();
this.legalcaseservice.legalcasekbs=[];
this.legalcaseservice.Insertlegalcasekbs=[];
this.legalcasekbsLoadTable();
this.legalcaseservice.legaltaskmasters=[];
this.legaltaskmastersLoadTable();
this.legalcaseservice.boexpenses=[];
this.boexpensesLoadTable();
this.legalcaseservice.legalfreenotes=[];
this.legalfreenotesLoadTable();
this.legalcaseservice.legalcommunicationdetails=[];
this.legalcommunicationdetailsLoadTable();
this.legalcaseservice.legalcaseagainstemployees=[];
this.legalcaseagainstemployeesLoadTable();
this.legalcaseservice.legalcasehearings=[];
this.legalcasehearingsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let caseid = this.legalcaseForm.get('caseid').value;
        if(caseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcaseservice.deletelegalcase(caseid).then(res =>
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
    this.legalcaseForm.patchValue({
        caseid: null
    });
    if(this.legalcaseservice.formData.caseid!=null)this.legalcaseservice.formData.caseid=null;
for (let i=0;i<this.legalcaseservice.legalcaselawyers.length;i++) {
this.legalcaseservice.legalcaselawyers[i].caselawyerid=null;
}
for (let i=0;i<this.legalcaseservice.legalcasepartydetails.length;i++) {
this.legalcaseservice.legalcasepartydetails[i].partyid=null;
}
for (let i=0;i<this.legalcaseservice.legalcaseprocessdetails.length;i++) {
this.legalcaseservice.legalcaseprocessdetails[i].caseprocessid=null;
}
for (let i=0;i<this.legalcaseservice.legalcaseinterimorders.length;i++) {
this.legalcaseservice.legalcaseinterimorders[i].interimorderid=null;
}
for (let i=0;i<this.legalcaseservice.legalcasereferredcases.length;i++) {
this.legalcaseservice.legalcasereferredcases[i].linkedid=null;
}
for (let i=0;i<this.legalcaseservice.legalcasekbs.length;i++) {
this.legalcaseservice.legalcasekbs[i].kbcaseid=null;
}
for (let i=0;i<this.legalcaseservice.legaltaskmasters.length;i++) {
this.legalcaseservice.legaltaskmasters[i].taskid=null;
}
for (let i=0;i<this.legalcaseservice.boexpenses.length;i++) {
this.legalcaseservice.boexpenses[i].expenseid=null;
}
for (let i=0;i<this.legalcaseservice.legalfreenotes.length;i++) {
this.legalcaseservice.legalfreenotes[i].freenotesid=null;
}
for (let i=0;i<this.legalcaseservice.legalcommunicationdetails.length;i++) {
this.legalcaseservice.legalcommunicationdetails[i].communicationid=null;
}
for (let i=0;i<this.legalcaseservice.legalcaseagainstemployees.length;i++) {
this.legalcaseservice.legalcaseagainstemployees[i].caseagainstid=null;
}
for (let i=0;i<this.legalcaseservice.legalcasehearings.length;i++) {
this.legalcaseservice.legalcasehearings[i].hearingid=null;
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
        else if(key=="casedate")
this.legalcaseForm.patchValue({"casedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="casereceiveddate")
this.legalcaseForm.patchValue({"casereceiveddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="duedate")
this.legalcaseForm.patchValue({"duedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="noticedate")
this.legalcaseForm.patchValue({"noticedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="fileddate")
this.legalcaseForm.patchValue({"fileddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="caseowner")
this.legalcaseForm.patchValue({"caseowner":  mainscreendata[key] } );
        else if(key=="firstdateofhearing")
this.legalcaseForm.patchValue({"firstdateofhearing":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="date1")
this.legalcaseForm.patchValue({"date1":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="date2")
this.legalcaseForm.patchValue({"date2":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="date3")
this.legalcaseForm.patchValue({"date3":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="judgementdate")
this.legalcaseForm.patchValue({"judgementdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="closeddate")
this.legalcaseForm.patchValue({"closeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nexthearingdate")
this.legalcaseForm.patchValue({"nexthearingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="casetag")
this.legalcaseForm.patchValue({"casetag":  mainscreendata[key] } );
        else if(key=="notes")
this.legalcaseForm.patchValue({"notes":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.legalcaseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcaseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcaseForm.controls[key]!=undefined)
{
this.legalcaseForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("legalcases",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcaseservice.formData.casenumber!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcaseservice.formData.casenumber!=null )
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
casecodeonChange(evt:any){
let e=evt.value;
}
casenumberonChange(evt:any){
let e=evt.value;
}
internalreferencenumberonChange(evt:any){
let e=evt.value;
}
courtidonChange(evt:any){
let e=evt.value;
this.legalcaseForm.patchValue({courtiddesc:evt.options[evt.options.selectedIndex].text});
}
petitiontypeonChange(evt:any){
let e=this.f.petitiontype.value as any;
this.legalcaseForm.patchValue({petitiontypedesc:evt.options[evt.options.selectedIndex].text});
}
customeridonChange(evt:any){
let e=evt.value;
}
customerpositiononChange(evt:any){
let e=this.f.customerposition.value as any;
this.legalcaseForm.patchValue({customerpositiondesc:evt.options[evt.options.selectedIndex].text});
}
opponentidonChange(evt:any){
let e=evt.value;
this.legalcaseForm.patchValue({opponentiddesc:evt.options[evt.options.selectedIndex].text});
}
opponentpositiononChange(evt:any){
let e=this.f.opponentposition.value as any;
this.legalcaseForm.patchValue({opponentpositiondesc:evt.options[evt.options.selectedIndex].text});
}
casedateonChange(evt:any){
let e=evt.value;
}
casereceiveddateonChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=evt.value;
}
noticedateonChange(evt:any){
let e=evt.value;
}
fileddateonChange(evt:any){
let e=evt.value;
}
previouscasenumberonChange(evt:any){
let e=evt.value;
}
caseowneronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrcaseowner=res;
let objcaseowner;
if (arrcaseowner.length > 0) objcaseowner = arrcaseowner[0];
if (objcaseowner)
{
}
}).catch((err) => {console.log(err);});
}
requestedbyonChange(evt:any){
let e=evt.value;
}
assignedbyonChange(evt:any){
let e=evt.value;
}
casemodeonChange(evt:any){
let e=evt.value;
this.legalcaseForm.patchValue({casemodedesc:evt.options[evt.options.selectedIndex].text});
}
casetypeonChange(evt:any){
let e=evt.value;
this.legalcaseForm.patchValue({casetypedesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.casetype.value && this.f.casetype.value!="" && this.f.casetype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.casetype.value).then(res => this.casesubtypeList = res as bosubcategorymaster[]);
});
}
casesubtypeonChange(evt:any){
let e=evt.value;
this.legalcaseForm.patchValue({casesubtypedesc:evt.options[evt.options.selectedIndex].text});
}
casetitleonChange(evt:any){
let e=evt.value;
}
casedetailsonChange(evt:any){
let e=evt.value;
}
firstdateofhearingonChange(evt:any){
let e=evt.value;
}
date1onChange(evt:any){
let e=evt.value;
}
notes1onChange(evt:any){
let e=evt.value;
}
date2onChange(evt:any){
let e=evt.value;
}
notes2onChange(evt:any){
let e=evt.value;
}
date3onChange(evt:any){
let e=evt.value;
}
notes3onChange(evt:any){
let e=evt.value;
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.legalcaseForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
natureonChange(evt:any){
let e=this.f.nature.value as any;
this.legalcaseForm.patchValue({naturedesc:evt.options[evt.options.selectedIndex].text});
}
complexityonChange(evt:any){
let e=this.f.complexity.value as any;
this.legalcaseForm.patchValue({complexitydesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.legalcaseForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
timelineonChange(evt:any){
let e=this.f.timeline.value as any;
this.legalcaseForm.patchValue({timelinedesc:evt.options[evt.options.selectedIndex].text});
}
amountinvolvedonChange(evt:any){
let e=evt.value;
}
judgementvalueonChange(evt:any){
let e=evt.value;
}
amountreceivedonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
judgementdateonChange(evt:any){
let e=evt.value;
}
judgementinfavouronChange(evt:any){
let e=evt.value;
}
judgementoutcomeonChange(evt:any){
let e=this.f.judgementoutcome.value as any;
this.legalcaseForm.patchValue({judgementoutcomedesc:evt.options[evt.options.selectedIndex].text});
}
judgementdescriptiononChange(evt:any){
let e=evt.value;
}
actiontobetakenonChange(evt:any){
let e=evt.value;
}
actionbyonChange(evt:any){
let e=evt.value;
}
actionimplementedonChange(evt:any){
let e=evt.value;
}
contestfurtheronChange(evt:any){
let e=evt.value;
}
closeddateonChange(evt:any){
let e=evt.value;
}
casestageonChange(evt:any){
let e=this.f.casestage.value as any;
this.legalcaseForm.patchValue({casestagedesc:evt.options[evt.options.selectedIndex].text});
}
casestatusonChange(evt:any){
let e=this.f.casestatus.value as any;
this.legalcaseForm.patchValue({casestatusdesc:evt.options[evt.options.selectedIndex].text});
}
lawyeronChange(evt:any){
let e=evt.value;
}
lastprocessonChange(evt:any){
let e=evt.value;
}
currentprocessonChange(evt:any){
let e=evt.value;
}
nexthearingdateonChange(evt:any){
let e=evt.value;
}
casetagonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
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
  


editlegalcases() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcaseservice.getlegalcasesByEID(pkcol).then(res => {

this.legalcaseservice.formData=res.legalcase;
let formproperty=res.legalcase.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcase.pkcol;
this.formid=res.legalcase.caseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcaseservice.formData=res.legalcase;
this.formid=res.legalcase.caseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcaseForm.patchValue({
caseid: res.legalcase.caseid,
casecode: res.legalcase.casecode,
casenumber: res.legalcase.casenumber,
internalreferencenumber: res.legalcase.internalreferencenumber,
courtid: res.legalcase.courtid,
courtiddesc: res.legalcase.courtiddesc,
petitiontype: res.legalcase.petitiontype,
petitiontypedesc: res.legalcase.petitiontypedesc,
customerid: res.legalcase.customerid,
customeriddesc: res.legalcase.customeriddesc,
customerposition: res.legalcase.customerposition,
customerpositiondesc: res.legalcase.customerpositiondesc,
opponentid: res.legalcase.opponentid,
opponentiddesc: res.legalcase.opponentiddesc,
opponentposition: res.legalcase.opponentposition,
opponentpositiondesc: res.legalcase.opponentpositiondesc,
casedate: this.ngbDateParserFormatter.parse(res.legalcase.casedate),
casereceiveddate: this.ngbDateParserFormatter.parse(res.legalcase.casereceiveddate),
duedate: this.ngbDateParserFormatter.parse(res.legalcase.duedate),
noticedate: this.ngbDateParserFormatter.parse(res.legalcase.noticedate),
fileddate: this.ngbDateParserFormatter.parse(res.legalcase.fileddate),
previouscasenumber: res.legalcase.previouscasenumber,
previouscasenumberdesc: res.legalcase.previouscasenumberdesc,
caseowner: JSON.parse(res.legalcase.caseowner),
requestedby: res.legalcase.requestedby,
requestedbydesc: res.legalcase.requestedbydesc,
assignedby: res.legalcase.assignedby,
assignedbydesc: res.legalcase.assignedbydesc,
casemode: res.legalcase.casemode,
casemodedesc: res.legalcase.casemodedesc,
casetype: res.legalcase.casetype,
casetypedesc: res.legalcase.casetypedesc,
casesubtype: res.legalcase.casesubtype,
casesubtypedesc: res.legalcase.casesubtypedesc,
casetitle: res.legalcase.casetitle,
casedetails: res.legalcase.casedetails,
firstdateofhearing: this.ngbDateParserFormatter.parse(res.legalcase.firstdateofhearing),
date1: this.ngbDateParserFormatter.parse(res.legalcase.date1),
notes1: res.legalcase.notes1,
date2: this.ngbDateParserFormatter.parse(res.legalcase.date2),
notes2: res.legalcase.notes2,
date3: this.ngbDateParserFormatter.parse(res.legalcase.date3),
notes3: res.legalcase.notes3,
category: res.legalcase.category,
categorydesc: res.legalcase.categorydesc,
nature: res.legalcase.nature,
naturedesc: res.legalcase.naturedesc,
complexity: res.legalcase.complexity,
complexitydesc: res.legalcase.complexitydesc,
priority: res.legalcase.priority,
prioritydesc: res.legalcase.prioritydesc,
timeline: res.legalcase.timeline,
timelinedesc: res.legalcase.timelinedesc,
amountinvolved: res.legalcase.amountinvolved,
judgementvalue: res.legalcase.judgementvalue,
amountreceived: res.legalcase.amountreceived,
customfield: res.legalcase.customfield,
attachment: JSON.parse(res.legalcase.attachment),
judgementdate: this.ngbDateParserFormatter.parse(res.legalcase.judgementdate),
judgementinfavour: res.legalcase.judgementinfavour,
judgementoutcome: res.legalcase.judgementoutcome,
judgementoutcomedesc: res.legalcase.judgementoutcomedesc,
judgementdescription: res.legalcase.judgementdescription,
actiontobetaken: res.legalcase.actiontobetaken,
actionby: res.legalcase.actionby,
actionbydesc: res.legalcase.actionbydesc,
actionimplemented: res.legalcase.actionimplemented,
contestfurther: res.legalcase.contestfurther,
closeddate: this.ngbDateParserFormatter.parse(res.legalcase.closeddate),
casestage: res.legalcase.casestage,
casestagedesc: res.legalcase.casestagedesc,
casestatus: res.legalcase.casestatus,
casestatusdesc: res.legalcase.casestatusdesc,
lawyer: res.legalcase.lawyer,
lawyerdesc: res.legalcase.lawyerdesc,
lastprocess: res.legalcase.lastprocess,
currentprocess: res.legalcase.currentprocess,
nexthearingdate: this.ngbDateParserFormatter.parse(res.legalcase.nexthearingdate),
casetag: JSON.parse(res.legalcase.casetag),
notes: JSON.parse(res.legalcase.notes),
status: res.legalcase.status,
statusdesc: res.legalcase.statusdesc,
});
this.legalcaselawyersvisiblelist=res.legalcaselawyersvisiblelist;
this.legalcasepartydetailsvisiblelist=res.legalcasepartydetailsvisiblelist;
this.legalcaseprocessdetailsvisiblelist=res.legalcaseprocessdetailsvisiblelist;
this.legalcaseinterimordersvisiblelist=res.legalcaseinterimordersvisiblelist;
this.legalcasereferredcasesvisiblelist=res.legalcasereferredcasesvisiblelist;
this.legalcasekbsvisiblelist=res.legalcasekbsvisiblelist;
this.legaltaskmastersvisiblelist=res.legaltaskmastersvisiblelist;
this.boexpensesvisiblelist=res.boexpensesvisiblelist;
this.legalfreenotesvisiblelist=res.legalfreenotesvisiblelist;
this.legalcommunicationdetailsvisiblelist=res.legalcommunicationdetailsvisiblelist;
this.legalcaseagainstemployeesvisiblelist=res.legalcaseagainstemployeesvisiblelist;
this.legalcasehearingsvisiblelist=res.legalcasehearingsvisiblelist;
if(this.legalcaseForm.get('customfield').value!=null && this.legalcaseForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.legalcaseForm.get('customfield').value);
this.FillCustomField();
if(this.legalcaseForm.get('attachment').value!=null && this.legalcaseForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcaseForm.get('attachment').value);
setTimeout(() => {
if(this.f.casetype.value && this.f.casetype.value!="" && this.f.casetype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.casetype.value).then(res =>{
this.casesubtypeList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.legalcaseservice.legalcaselawyers = res.legalcaselawyers;
this.SetlegalcaselawyersTableConfig();
this.legalcaselawyersLoadTable();
  setTimeout(() => {
  this.SetlegalcaselawyersTableddConfig();
  });
this.legalcaseservice.legalcasepartydetails = res.legalcasepartydetails;
this.SetlegalcasepartydetailsTableConfig();
this.legalcasepartydetailsLoadTable();
  setTimeout(() => {
  this.SetlegalcasepartydetailsTableddConfig();
  });
this.legalcaseservice.legalcaseprocessdetails = res.legalcaseprocessdetails;
this.SetlegalcaseprocessdetailsTableConfig();
this.legalcaseprocessdetailsLoadTable();
  setTimeout(() => {
  this.SetlegalcaseprocessdetailsTableddConfig();
  });
this.legalcaseservice.legalcaseinterimorders = res.legalcaseinterimorders;
this.SetlegalcaseinterimordersTableConfig();
this.legalcaseinterimordersLoadTable();
  setTimeout(() => {
  this.SetlegalcaseinterimordersTableddConfig();
  });
this.legalcaseservice.legalcasereferredcases = res.legalcasereferredcases;
this.SetlegalcasereferredcasesTableConfig();
this.legalcasereferredcasesLoadTable();
  setTimeout(() => {
  this.SetlegalcasereferredcasesTableddConfig();
  });
this.legalcaseservice.Insertlegalcasereferredcases=[];
this.legalcaseservice.legalcasekbs = res.legalcasekbs;
this.SetlegalcasekbsTableConfig();
this.legalcasekbsLoadTable();
  setTimeout(() => {
  this.SetlegalcasekbsTableddConfig();
  });
this.legalcaseservice.Insertlegalcasekbs=[];
this.legalcaseservice.legaltaskmasters = res.legaltaskmasters;
this.SetlegaltaskmastersTableConfig();
this.legaltaskmastersLoadTable();
  setTimeout(() => {
  this.SetlegaltaskmastersTableddConfig();
  });
this.legalcaseservice.boexpenses = res.boexpenses;
this.SetboexpensesTableConfig();
this.boexpensesLoadTable();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });
this.legalcaseservice.legalfreenotes = res.legalfreenotes;
this.SetlegalfreenotesTableConfig();
this.legalfreenotesLoadTable();
  setTimeout(() => {
  this.SetlegalfreenotesTableddConfig();
  });
this.legalcaseservice.legalcommunicationdetails = res.legalcommunicationdetails;
this.SetlegalcommunicationdetailsTableConfig();
this.legalcommunicationdetailsLoadTable();
  setTimeout(() => {
  this.SetlegalcommunicationdetailsTableddConfig();
  });
this.legalcaseservice.legalcaseagainstemployees = res.legalcaseagainstemployees;
this.SetlegalcaseagainstemployeesTableConfig();
this.legalcaseagainstemployeesLoadTable();
  setTimeout(() => {
  this.SetlegalcaseagainstemployeesTableddConfig();
  });
this.legalcaseservice.legalcasehearings = res.legalcasehearings;
this.SetlegalcasehearingsTableConfig();
this.legalcasehearingsLoadTable();
  setTimeout(() => {
  this.SetlegalcasehearingsTableddConfig();
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
  for (let key in this.legalcaseForm.controls) {
    if (this.legalcaseForm.controls[key] != null) {
if(false)
{
if(this.legalcaseservice.formData!=null && this.legalcaseservice.formData[key]!=null  && this.legalcaseservice.formData[key]!='[]' && this.legalcaseservice.formData[key]!=undefined && this.legalcaseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcaseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcaseservice.formData!=null && this.legalcaseservice.formData[key]!=null   && this.legalcaseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcaseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcaseservice.formData!=null && this.legalcaseservice.formData[key]!=null   && this.legalcaseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcaseservice.formData[key]+"'><div class='progress__number'>"+this.legalcaseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcaseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcaseForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.legalcaseForm.value;
obj.casedate=new Date(this.legalcaseForm.get('casedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('casedate').value)+'  UTC' :null);
obj.casereceiveddate=new Date(this.legalcaseForm.get('casereceiveddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('casereceiveddate').value)+'  UTC' :null);
obj.duedate=new Date(this.legalcaseForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('duedate').value)+'  UTC' :null);
obj.noticedate=new Date(this.legalcaseForm.get('noticedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('noticedate').value)+'  UTC' :null);
obj.fileddate=new Date(this.legalcaseForm.get('fileddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('fileddate').value)+'  UTC' :null);
if(this.legalcaseForm.get('caseowner').value!=null)obj.caseowner=JSON.stringify(this.legalcaseForm.get('caseowner').value);
obj.firstdateofhearing=new Date(this.legalcaseForm.get('firstdateofhearing').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('firstdateofhearing').value)+'  UTC' :null);
obj.date1=new Date(this.legalcaseForm.get('date1').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date1').value)+'  UTC' :null);
obj.date2=new Date(this.legalcaseForm.get('date2').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date2').value)+'  UTC' :null);
obj.date3=new Date(this.legalcaseForm.get('date3').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date3').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
obj.judgementdate=new Date(this.legalcaseForm.get('judgementdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('judgementdate').value)+'  UTC' :null);
obj.closeddate=new Date(this.legalcaseForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('closeddate').value)+'  UTC' :null);
obj.nexthearingdate=new Date(this.legalcaseForm.get('nexthearingdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('nexthearingdate').value)+'  UTC' :null);
if(this.legalcaseForm.get('casetag').value!=null)obj.casetag=JSON.stringify(this.legalcaseForm.get('casetag').value);
if(this.legalcaseForm.get('notes').value!=null)obj.notes=JSON.stringify(this.legalcaseForm.get('notes').value);
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

private legalcasetoggleOption(){
this.legalcaseshowOption = this.legalcaseshowOption === true ? false : true;
}

private legalcaselawyertoggleOption(){
this.legalcaselawyershowOption = this.legalcaselawyershowOption === true ? false : true;
}

private legalcasepartydetailtoggleOption(){
this.legalcasepartydetailshowOption = this.legalcasepartydetailshowOption === true ? false : true;
}

private legalcaseprocessdetailtoggleOption(){
this.legalcaseprocessdetailshowOption = this.legalcaseprocessdetailshowOption === true ? false : true;
}

private legalcaseinterimordertoggleOption(){
this.legalcaseinterimordershowOption = this.legalcaseinterimordershowOption === true ? false : true;
}

private legalcasereferredcasetoggleOption(){
this.legalcasereferredcaseshowOption = this.legalcasereferredcaseshowOption === true ? false : true;
}

private legalcasekbtoggleOption(){
this.legalcasekbshowOption = this.legalcasekbshowOption === true ? false : true;
}

private legaltaskmastertoggleOption(){
this.legaltaskmastershowOption = this.legaltaskmastershowOption === true ? false : true;
}

private boexpensetoggleOption(){
this.boexpenseshowOption = this.boexpenseshowOption === true ? false : true;
}

private legalfreenotetoggleOption(){
this.legalfreenoteshowOption = this.legalfreenoteshowOption === true ? false : true;
}

private legalcommunicationdetailtoggleOption(){
this.legalcommunicationdetailshowOption = this.legalcommunicationdetailshowOption === true ? false : true;
}

private legalcaseagainstemployeetoggleOption(){
this.legalcaseagainstemployeeshowOption = this.legalcaseagainstemployeeshowOption === true ? false : true;
}

private legalcasehearingtoggleOption(){
this.legalcasehearingshowOption = this.legalcasehearingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcaseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcaseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcaseForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcaseservice.formData=this.legalcaseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcaseForm.controls[key] != null)
    {
        this.legalcaseservice.formData[key] = this.legalcaseForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.legalcaseservice.formData.casedate=new Date(this.legalcaseForm.get('casedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('casedate').value)+'  UTC' :null);
this.legalcaseservice.formData.casereceiveddate=new Date(this.legalcaseForm.get('casereceiveddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('casereceiveddate').value)+'  UTC' :null);
this.legalcaseservice.formData.duedate=new Date(this.legalcaseForm.get('duedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('duedate').value)+'  UTC' :null);
this.legalcaseservice.formData.noticedate=new Date(this.legalcaseForm.get('noticedate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('noticedate').value)+'  UTC' :null);
this.legalcaseservice.formData.fileddate=new Date(this.legalcaseForm.get('fileddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('fileddate').value)+'  UTC' :null);
if(this.legalcaseForm.get('caseowner').value!=null)this.legalcaseservice.formData.caseowner=JSON.stringify(this.legalcaseForm.get('caseowner').value);
this.legalcaseservice.formData.firstdateofhearing=new Date(this.legalcaseForm.get('firstdateofhearing').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('firstdateofhearing').value)+'  UTC' :null);
this.legalcaseservice.formData.date1=new Date(this.legalcaseForm.get('date1').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date1').value)+'  UTC' :null);
this.legalcaseservice.formData.date2=new Date(this.legalcaseForm.get('date2').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date2').value)+'  UTC' :null);
this.legalcaseservice.formData.date3=new Date(this.legalcaseForm.get('date3').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('date3').value)+'  UTC' :null);
if(customfields!=null)this.legalcaseservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.legalcaseservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalcaseservice.formData.judgementdate=new Date(this.legalcaseForm.get('judgementdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('judgementdate').value)+'  UTC' :null);
this.legalcaseservice.formData.closeddate=new Date(this.legalcaseForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('closeddate').value)+'  UTC' :null);
this.legalcaseservice.formData.nexthearingdate=new Date(this.legalcaseForm.get('nexthearingdate').value ? this.ngbDateParserFormatter.format(this.legalcaseForm.get('nexthearingdate').value)+'  UTC' :null);
if(this.legalcaseForm.get('casetag').value!=null)this.legalcaseservice.formData.casetag=JSON.stringify(this.legalcaseForm.get('casetag').value);
if(this.legalcaseForm.get('notes').value!=null)this.legalcaseservice.formData.notes=JSON.stringify(this.legalcaseForm.get('notes').value);
this.legalcaseservice.formData.DeletedlegalcaselawyerIDs = this.DeletedlegalcaselawyerIDs;
this.legalcaseservice.formData.DeletedlegalcasepartydetailIDs = this.DeletedlegalcasepartydetailIDs;
this.legalcaseservice.formData.DeletedlegalcaseprocessdetailIDs = this.DeletedlegalcaseprocessdetailIDs;
this.legalcaseservice.formData.DeletedlegalcaseinterimorderIDs = this.DeletedlegalcaseinterimorderIDs;
this.legalcaseservice.formData.DeletedlegalcasereferredcaseIDs = this.DeletedlegalcasereferredcaseIDs;
this.legalcaseservice.formData.DeletedlegalcasekbIDs = this.DeletedlegalcasekbIDs;
this.legalcaseservice.formData.DeletedlegaltaskmasterIDs = this.DeletedlegaltaskmasterIDs;
this.legalcaseservice.formData.DeletedboexpenseIDs = this.DeletedboexpenseIDs;
this.legalcaseservice.formData.DeletedlegalfreenoteIDs = this.DeletedlegalfreenoteIDs;
this.legalcaseservice.formData.DeletedlegalcommunicationdetailIDs = this.DeletedlegalcommunicationdetailIDs;
this.legalcaseservice.formData.DeletedlegalcaseagainstemployeeIDs = this.DeletedlegalcaseagainstemployeeIDs;
this.legalcaseservice.formData.DeletedlegalcasehearingIDs = this.DeletedlegalcasehearingIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcaseservice.formData);
this.legalcaseservice.formData=this.legalcaseForm.value;
this.legalcaseservice.saveOrUpdatelegalcases().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.legalcaselawyerssource.data)
{
    for (let i = 0; i < this.legalcaselawyerssource.data.length; i++)
    {
        if (this.legalcaselawyerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcaselawyerssource.data[i].fileattachmentlist);
    }
}
if (this.legalcasepartydetailssource.data)
{
    for (let i = 0; i < this.legalcasepartydetailssource.data.length; i++)
    {
        if (this.legalcasepartydetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcasepartydetailssource.data[i].fileattachmentlist);
    }
}
if (this.legalcaseprocessdetailssource.data)
{
    for (let i = 0; i < this.legalcaseprocessdetailssource.data.length; i++)
    {
        if (this.legalcaseprocessdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcaseprocessdetailssource.data[i].fileattachmentlist);
    }
}
if (this.legalcaseinterimorderssource.data)
{
    for (let i = 0; i < this.legalcaseinterimorderssource.data.length; i++)
    {
        if (this.legalcaseinterimorderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcaseinterimorderssource.data[i].fileattachmentlist);
    }
}
if (this.legalcasereferredcasessource.data)
{
    for (let i = 0; i < this.legalcasereferredcasessource.data.length; i++)
    {
        if (this.legalcasereferredcasessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcasereferredcasessource.data[i].fileattachmentlist);
    }
}
if (this.legalcasekbssource.data)
{
    for (let i = 0; i < this.legalcasekbssource.data.length; i++)
    {
        if (this.legalcasekbssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcasekbssource.data[i].fileattachmentlist);
    }
}
if (this.legaltaskmasterssource.data)
{
    for (let i = 0; i < this.legaltaskmasterssource.data.length; i++)
    {
        if (this.legaltaskmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legaltaskmasterssource.data[i].fileattachmentlist);
    }
}
if (this.boexpensessource.data)
{
    for (let i = 0; i < this.boexpensessource.data.length; i++)
    {
        if (this.boexpensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boexpensessource.data[i].fileattachmentlist);
    }
}
if (this.legalfreenotessource.data)
{
    for (let i = 0; i < this.legalfreenotessource.data.length; i++)
    {
        if (this.legalfreenotessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalfreenotessource.data[i].fileattachmentlist);
    }
}
if (this.legalcommunicationdetailssource.data)
{
    for (let i = 0; i < this.legalcommunicationdetailssource.data.length; i++)
    {
        if (this.legalcommunicationdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcommunicationdetailssource.data[i].fileattachmentlist);
    }
}
if (this.legalcaseagainstemployeessource.data)
{
    for (let i = 0; i < this.legalcaseagainstemployeessource.data.length; i++)
    {
        if (this.legalcaseagainstemployeessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcaseagainstemployeessource.data[i].fileattachmentlist);
    }
}
if (this.legalcasehearingssource.data)
{
    for (let i = 0; i < this.legalcasehearingssource.data.length; i++)
    {
        if (this.legalcasehearingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcasehearingssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcase);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcaseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcase);
}
else
{
this.FillData(res);
}
}
this.legalcaseForm.markAsUntouched();
this.legalcaseForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




  viewpreviouscasenumber() {
    this.dialog.open(legalcaseComponent,
      {
        data: { showview: false, caseid:this.legalcaseForm.get('previouscasenumber').value, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcourtid( courtid) {
/*let ScreenType='2';
this.dialog.open(legalcourtmasterComponent, 
{
data: {courtid:this.legalcaseForm.get('courtid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(legalcustomermasterComponent, 
{
data: {customerid:this.legalcaseForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopponentid( opponentid) {
/*let ScreenType='2';
this.dialog.open(legalopponentmasterComponent, 
{
data: {opponentid:this.legalcaseForm.get('opponentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpreviouscasenumber( caseid) {
/*let ScreenType='2';
this.dialog.open(legalcaseComponent, 
{
data: {caseid:this.legalcaseForm.get('previouscasenumber').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrequestedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.legalcaseForm.get('requestedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.legalcaseForm.get('assignedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcasemode( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcaseForm.get('casemode').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcasetype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcaseForm.get('casetype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcasesubtype( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.legalcaseForm.get('casesubtype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditactionby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.legalcaseForm.get('actionby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlawyer( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcaseForm.get('lawyer').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlegalcaselawyer(event:any,caselawyerid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcaselawyerComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,caselawyerid, caseid,visiblelist:this.legalcaselawyersvisiblelist,  hidelist:this.legalcaselawyershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcaselawyerssource.add(res);
this.legalcaselawyerssource.refresh();
}
else
{
this.legalcaselawyerssource.update(event.data, res);
}
}
});
}

onDeletelegalcaselawyer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcaselawyerIDs += childID + ",";
this.legalcaseservice.legalcaselawyers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcasepartydetail(event:any,partyid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcasepartydetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,partyid, caseid,visiblelist:this.legalcasepartydetailsvisiblelist,  hidelist:this.legalcasepartydetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcasepartydetailssource.add(res);
this.legalcasepartydetailssource.refresh();
}
else
{
this.legalcasepartydetailssource.update(event.data, res);
}
}
});
}

onDeletelegalcasepartydetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcasepartydetailIDs += childID + ",";
this.legalcaseservice.legalcasepartydetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcaseprocessdetail(event:any,caseprocessid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcaseprocessdetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,caseprocessid, caseid,visiblelist:this.legalcaseprocessdetailsvisiblelist,  hidelist:this.legalcaseprocessdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcaseprocessdetailssource.add(res);
this.legalcaseprocessdetailssource.refresh();
}
else
{
this.legalcaseprocessdetailssource.update(event.data, res);
}
}
});
}

onDeletelegalcaseprocessdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcaseprocessdetailIDs += childID + ",";
this.legalcaseservice.legalcaseprocessdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcaseinterimorder(event:any,interimorderid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcaseinterimorderComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,interimorderid, caseid,visiblelist:this.legalcaseinterimordersvisiblelist,  hidelist:this.legalcaseinterimordershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcaseinterimorderssource.add(res);
this.legalcaseinterimorderssource.refresh();
}
else
{
this.legalcaseinterimorderssource.update(event.data, res);
}
}
});
}

onDeletelegalcaseinterimorder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcaseinterimorderIDs += childID + ",";
this.legalcaseservice.legalcaseinterimorders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegaltaskmaster(event:any,taskid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legaltaskmasterComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,taskid, caseid,visiblelist:this.legaltaskmastersvisiblelist,  hidelist:this.legaltaskmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legaltaskmasterssource.add(res);
this.legaltaskmasterssource.refresh();
}
else
{
this.legaltaskmasterssource.update(event.data, res);
}
}
});
}

onDeletelegaltaskmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegaltaskmasterIDs += childID + ",";
this.legalcaseservice.legaltaskmasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboexpense(event:any,expenseid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boexpenseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,expenseid, caseid,visiblelist:this.boexpensesvisiblelist,  hidelist:this.boexpenseshidelist,ScreenType:2  },
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
this.legalcaseservice.boexpenses.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalfreenote(event:any,freenotesid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalfreenoteComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,freenotesid, caseid,visiblelist:this.legalfreenotesvisiblelist,  hidelist:this.legalfreenoteshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalfreenotessource.add(res);
this.legalfreenotessource.refresh();
}
else
{
this.legalfreenotessource.update(event.data, res);
}
}
});
}

onDeletelegalfreenote(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalfreenoteIDs += childID + ",";
this.legalcaseservice.legalfreenotes.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcommunicationdetail(event:any,communicationid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcommunicationdetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,communicationid, caseid,visiblelist:this.legalcommunicationdetailsvisiblelist,  hidelist:this.legalcommunicationdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcommunicationdetailssource.add(res);
this.legalcommunicationdetailssource.refresh();
}
else
{
this.legalcommunicationdetailssource.update(event.data, res);
}
}
});
}

onDeletelegalcommunicationdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcommunicationdetailIDs += childID + ",";
this.legalcaseservice.legalcommunicationdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcaseagainstemployee(event:any,caseagainstid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcaseagainstemployeeComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,caseagainstid, caseid,visiblelist:this.legalcaseagainstemployeesvisiblelist,  hidelist:this.legalcaseagainstemployeeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcaseagainstemployeessource.add(res);
this.legalcaseagainstemployeessource.refresh();
}
else
{
this.legalcaseagainstemployeessource.update(event.data, res);
}
}
});
}

onDeletelegalcaseagainstemployee(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcaseagainstemployeeIDs += childID + ",";
this.legalcaseservice.legalcaseagainstemployees.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcasehearing(event:any,hearingid:any, caseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcasehearingComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,hearingid, caseid,visiblelist:this.legalcasehearingsvisiblelist,  hidelist:this.legalcasehearingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcasehearingssource.add(res);
this.legalcasehearingssource.refresh();
}
else
{
this.legalcasehearingssource.update(event.data, res);
}
}
});
}

onDeletelegalcasehearing(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcasehearingIDs += childID + ",";
this.legalcaseservice.legalcasehearings.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legalcaselawyers
legalcaselawyerssettings:any;
legalcaselawyerssource: any;

showlegalcaselawyersCheckbox()
{
debugger;
if(this.tbllegalcaselawyerssource.settings['selectMode']== 'multi')this.tbllegalcaselawyerssource.settings['selectMode']= 'single';
else
this.tbllegalcaselawyerssource.settings['selectMode']= 'multi';
this.tbllegalcaselawyerssource.initGrid();
}
deletelegalcaselawyersAll()
{
this.tbllegalcaselawyerssource.settings['selectMode'] = 'single';
}
showlegalcaselawyersFilter()
{
  setTimeout(() => {
  this.SetlegalcaselawyersTableddConfig();
  });
      if(this.tbllegalcaselawyerssource.settings!=null)this.tbllegalcaselawyerssource.settings['hideSubHeader'] =!this.tbllegalcaselawyerssource.settings['hideSubHeader'];
this.tbllegalcaselawyerssource.initGrid();
}
showlegalcaselawyersInActive()
{
}
enablelegalcaselawyersInActive()
{
}
async SetlegalcaselawyersTableddConfig()
{
if(!this.bfilterPopulatelegalcaselawyers){
}
this.bfilterPopulatelegalcaselawyers=true;
}
async legalcaselawyersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcaselawyersTableConfig()
{
this.legalcaselawyerssettings = {
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
lawyerid: {
title: 'Lawyer',
type: 'number',
filter:true,
},
lawyertype: {
title: 'Lawyer Type',
type: '',
filter:true,
},
fromdate: {
title: 'From Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
todate: {
title: 'To Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
legalcaselawyersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaselawyersID)>=0)
{
this.legalcaselawyerssource=new LocalDataSource();
this.legalcaselawyerssource.load(this.legalcaseservice.legalcaselawyers as  any as LocalDataSource);
this.legalcaselawyerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcaselawyersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcaselawyers.length == 0)
{
    this.tbllegalcaselawyerssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcaselawyer();
    this.legalcaseservice.legalcaselawyers.push(obj);
    this.legalcaselawyerssource.refresh();
    if ((this.legalcaseservice.legalcaselawyers.length / this.legalcaselawyerssource.getPaging().perPage).toFixed(0) + 1 != this.legalcaselawyerssource.getPaging().page)
    {
        this.legalcaselawyerssource.setPage((this.legalcaseservice.legalcaselawyers.length / this.legalcaselawyerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcaselawyerssource.grid.edit(this.tbllegalcaselawyerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcaselawyerssource.data.indexOf(event.data);
this.onDeletelegalcaselawyer(event,event.data.caselawyerid,((this.legalcaselawyerssource.getPaging().page-1) *this.legalcaselawyerssource.getPaging().perPage)+index);
this.legalcaselawyerssource.refresh();
break;
}
}

*/
legalcaselawyersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcaselawyer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcaselawyer(event,event.data.caselawyerid,this.formid);
break;
case 'delete':
this.onDeletelegalcaselawyer(event,event.data.caselawyerid,((this.legalcaselawyerssource.getPaging().page-1) *this.legalcaselawyerssource.getPaging().perPage)+event.index);
this.legalcaselawyerssource.refresh();
break;
}
}
legalcaselawyersonDelete(obj) {
let caselawyerid=obj.data.caselawyerid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(caselawyerid).then(res=>
this.legalcaselawyersLoadTable()
);
}
}
legalcaselawyersPaging(val)
{
debugger;
this.legalcaselawyerssource.setPaging(1, val, true);
}

handlelegalcaselawyersGridSelected(event:any) {
this.legalcaselawyersselectedindex=this.legalcaseservice.legalcaselawyers.findIndex(i => i.caselawyerid === event.data.caselawyerid);
}
IslegalcaselawyersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaselawyersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcaselawyers
//start of Grid Codes legalcasepartydetails
legalcasepartydetailssettings:any;
legalcasepartydetailssource: any;

showlegalcasepartydetailsCheckbox()
{
debugger;
if(this.tbllegalcasepartydetailssource.settings['selectMode']== 'multi')this.tbllegalcasepartydetailssource.settings['selectMode']= 'single';
else
this.tbllegalcasepartydetailssource.settings['selectMode']= 'multi';
this.tbllegalcasepartydetailssource.initGrid();
}
deletelegalcasepartydetailsAll()
{
this.tbllegalcasepartydetailssource.settings['selectMode'] = 'single';
}
showlegalcasepartydetailsFilter()
{
  setTimeout(() => {
  this.SetlegalcasepartydetailsTableddConfig();
  });
      if(this.tbllegalcasepartydetailssource.settings!=null)this.tbllegalcasepartydetailssource.settings['hideSubHeader'] =!this.tbllegalcasepartydetailssource.settings['hideSubHeader'];
this.tbllegalcasepartydetailssource.initGrid();
}
showlegalcasepartydetailsInActive()
{
}
enablelegalcasepartydetailsInActive()
{
}
async SetlegalcasepartydetailsTableddConfig()
{
if(!this.bfilterPopulatelegalcasepartydetails){
}
this.bfilterPopulatelegalcasepartydetails=true;
}
async legalcasepartydetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcasepartydetailsTableConfig()
{
this.legalcasepartydetailssettings = {
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
partytype: {
title: 'Party Type',
type: 'number',
filter:true,
},
partyname: {
title: 'Party Name',
type: '',
filter:true,
},
position: {
title: 'Position',
type: '',
filter:true,
},
gender: {
title: 'Gender',
type: '',
filter:true,
},
mobilenumber: {
title: 'Mobile Number',
type: '',
filter:true,
},
emailid: {
title: 'Email',
type: '',
filter:true,
},
dateofbirth: {
title: 'Date Of Birth',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
address1: {
title: 'Address1',
type: '',
filter:true,
},
address2: {
title: 'Address2',
type: '',
filter:true,
},
city: {
title: 'City',
type: '',
filter:true,
},
contactperson: {
title: 'Contact Person',
type: '',
filter:true,
},
cpmobilenumber: {
title: 'C P Mobile Number',
type: '',
filter:true,
},
cpemail: {
title: 'C P Email',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
legalcasepartydetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasepartydetailsID)>=0)
{
this.legalcasepartydetailssource=new LocalDataSource();
this.legalcasepartydetailssource.load(this.legalcaseservice.legalcasepartydetails as  any as LocalDataSource);
this.legalcasepartydetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcasepartydetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcasepartydetails.length == 0)
{
    this.tbllegalcasepartydetailssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcasepartydetail();
    this.legalcaseservice.legalcasepartydetails.push(obj);
    this.legalcasepartydetailssource.refresh();
    if ((this.legalcaseservice.legalcasepartydetails.length / this.legalcasepartydetailssource.getPaging().perPage).toFixed(0) + 1 != this.legalcasepartydetailssource.getPaging().page)
    {
        this.legalcasepartydetailssource.setPage((this.legalcaseservice.legalcasepartydetails.length / this.legalcasepartydetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcasepartydetailssource.grid.edit(this.tbllegalcasepartydetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcasepartydetailssource.data.indexOf(event.data);
this.onDeletelegalcasepartydetail(event,event.data.partyid,((this.legalcasepartydetailssource.getPaging().page-1) *this.legalcasepartydetailssource.getPaging().perPage)+index);
this.legalcasepartydetailssource.refresh();
break;
}
}

*/
legalcasepartydetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcasepartydetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcasepartydetail(event,event.data.partyid,this.formid);
break;
case 'delete':
this.onDeletelegalcasepartydetail(event,event.data.partyid,((this.legalcasepartydetailssource.getPaging().page-1) *this.legalcasepartydetailssource.getPaging().perPage)+event.index);
this.legalcasepartydetailssource.refresh();
break;
}
}
legalcasepartydetailsonDelete(obj) {
let partyid=obj.data.partyid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(partyid).then(res=>
this.legalcasepartydetailsLoadTable()
);
}
}
legalcasepartydetailsPaging(val)
{
debugger;
this.legalcasepartydetailssource.setPaging(1, val, true);
}

handlelegalcasepartydetailsGridSelected(event:any) {
this.legalcasepartydetailsselectedindex=this.legalcaseservice.legalcasepartydetails.findIndex(i => i.partyid === event.data.partyid);
}
IslegalcasepartydetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasepartydetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcasepartydetails
//start of Grid Codes legalcaseprocessdetails
legalcaseprocessdetailssettings:any;
legalcaseprocessdetailssource: any;

showlegalcaseprocessdetailsCheckbox()
{
debugger;
if(this.tbllegalcaseprocessdetailssource.settings['selectMode']== 'multi')this.tbllegalcaseprocessdetailssource.settings['selectMode']= 'single';
else
this.tbllegalcaseprocessdetailssource.settings['selectMode']= 'multi';
this.tbllegalcaseprocessdetailssource.initGrid();
}
deletelegalcaseprocessdetailsAll()
{
this.tbllegalcaseprocessdetailssource.settings['selectMode'] = 'single';
}
showlegalcaseprocessdetailsFilter()
{
  setTimeout(() => {
  this.SetlegalcaseprocessdetailsTableddConfig();
  });
      if(this.tbllegalcaseprocessdetailssource.settings!=null)this.tbllegalcaseprocessdetailssource.settings['hideSubHeader'] =!this.tbllegalcaseprocessdetailssource.settings['hideSubHeader'];
this.tbllegalcaseprocessdetailssource.initGrid();
}
showlegalcaseprocessdetailsInActive()
{
}
enablelegalcaseprocessdetailsInActive()
{
}
async SetlegalcaseprocessdetailsTableddConfig()
{
if(!this.bfilterPopulatelegalcaseprocessdetails){

this.legalcourtprocessmasterservice.getlegalcourtprocessmastersList().then(res=>
{
var dataprocessid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegalcaseprocessdetailsprocessid3.push(defaultobj);
for(let i=0; i<dataprocessid2.length; i++){
var obj= { value: dataprocessid2[i].processid, title:dataprocessid2[i].processname};
this.datalegalcaseprocessdetailsprocessid3.push(obj);
}
if((this.tbllegalcaseprocessdetailssource.settings as any).columns['processid'])
{
(this.tbllegalcaseprocessdetailssource.settings as any).columns['processid'].editor.config.list=JSON.parse(JSON.stringify(this.datalegalcaseprocessdetailsprocessid3));
this.tbllegalcaseprocessdetailssource.initGrid();
}
});

this.legallawyermasterservice.getlegallawyermastersList().then(res=>
{
var datalawyerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegalcaseprocessdetailslawyerid3.push(defaultobj);
for(let i=0; i<datalawyerid2.length; i++){
var obj= { value: datalawyerid2[i].lawyerid, title:datalawyerid2[i].lawyername};
this.datalegalcaseprocessdetailslawyerid3.push(obj);
}
if((this.tbllegalcaseprocessdetailssource.settings as any).columns['lawyerid'])
{
(this.tbllegalcaseprocessdetailssource.settings as any).columns['lawyerid'].editor.config.list=JSON.parse(JSON.stringify(this.datalegalcaseprocessdetailslawyerid3));
this.tbllegalcaseprocessdetailssource.initGrid();
}
});
}
this.bfilterPopulatelegalcaseprocessdetails=true;
}
async legalcaseprocessdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcaseprocessdetailsTableConfig()
{
this.legalcaseprocessdetailssettings = {
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
internalreferencenumber: {
title: 'Internal Reference Number',
type: '',
filter:true,
},
processid: {
title: 'Process',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'szcwo',reportcode:'szcwo',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalegalcaseprocessdetailsprocessid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
lawyerid: {
title: 'Lawyer',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'b4tm2',reportcode:'b4tm2',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalegalcaseprocessdetailslawyerid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
estimatedtime: {
title: 'Estimated Time',
type: '',
filter:true,
},
timespent: {
title: 'Time Spent',
type: '',
filter:true,
renderComponent: durationComponent,
editor: {
type: 'custom',
component: durationComponent,
},
},
processdetails: {
title: 'Process Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actiontobetaken: {
title: 'Action To Be Taken',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
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
legalcaseprocessdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseprocessdetailsID)>=0)
{
this.legalcaseprocessdetailssource=new LocalDataSource();
this.legalcaseprocessdetailssource.load(this.legalcaseservice.legalcaseprocessdetails as  any as LocalDataSource);
this.legalcaseprocessdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcaseprocessdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcaseprocessdetails.length == 0)
{
    this.tbllegalcaseprocessdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcaseprocessdetail();
    this.legalcaseservice.legalcaseprocessdetails.push(obj);
    this.legalcaseprocessdetailssource.refresh();
    if ((this.legalcaseservice.legalcaseprocessdetails.length / this.legalcaseprocessdetailssource.getPaging().perPage).toFixed(0) + 1 != this.legalcaseprocessdetailssource.getPaging().page)
    {
        this.legalcaseprocessdetailssource.setPage((this.legalcaseservice.legalcaseprocessdetails.length / this.legalcaseprocessdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcaseprocessdetailssource.grid.edit(this.tbllegalcaseprocessdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcaseprocessdetailssource.data.indexOf(event.data);
this.onDeletelegalcaseprocessdetail(event,event.data.caseprocessid,((this.legalcaseprocessdetailssource.getPaging().page-1) *this.legalcaseprocessdetailssource.getPaging().perPage)+index);
this.legalcaseprocessdetailssource.refresh();
break;
}
}

*/
legalcaseprocessdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcaseprocessdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcaseprocessdetail(event,event.data.caseprocessid,this.formid);
break;
case 'delete':
this.onDeletelegalcaseprocessdetail(event,event.data.caseprocessid,((this.legalcaseprocessdetailssource.getPaging().page-1) *this.legalcaseprocessdetailssource.getPaging().perPage)+event.index);
this.legalcaseprocessdetailssource.refresh();
break;
}
}
legalcaseprocessdetailsonDelete(obj) {
let caseprocessid=obj.data.caseprocessid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(caseprocessid).then(res=>
this.legalcaseprocessdetailsLoadTable()
);
}
}
legalcaseprocessdetailsPaging(val)
{
debugger;
this.legalcaseprocessdetailssource.setPaging(1, val, true);
}

handlelegalcaseprocessdetailsGridSelected(event:any) {
this.legalcaseprocessdetailsselectedindex=this.legalcaseservice.legalcaseprocessdetails.findIndex(i => i.caseprocessid === event.data.caseprocessid);
}
IslegalcaseprocessdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseprocessdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcaseprocessdetails
//start of Grid Codes legalcaseinterimorders
legalcaseinterimorderssettings:any;
legalcaseinterimorderssource: any;

showlegalcaseinterimordersCheckbox()
{
debugger;
if(this.tbllegalcaseinterimorderssource.settings['selectMode']== 'multi')this.tbllegalcaseinterimorderssource.settings['selectMode']= 'single';
else
this.tbllegalcaseinterimorderssource.settings['selectMode']= 'multi';
this.tbllegalcaseinterimorderssource.initGrid();
}
deletelegalcaseinterimordersAll()
{
this.tbllegalcaseinterimorderssource.settings['selectMode'] = 'single';
}
showlegalcaseinterimordersFilter()
{
  setTimeout(() => {
  this.SetlegalcaseinterimordersTableddConfig();
  });
      if(this.tbllegalcaseinterimorderssource.settings!=null)this.tbllegalcaseinterimorderssource.settings['hideSubHeader'] =!this.tbllegalcaseinterimorderssource.settings['hideSubHeader'];
this.tbllegalcaseinterimorderssource.initGrid();
}
showlegalcaseinterimordersInActive()
{
}
enablelegalcaseinterimordersInActive()
{
}
async SetlegalcaseinterimordersTableddConfig()
{
if(!this.bfilterPopulatelegalcaseinterimorders){
}
this.bfilterPopulatelegalcaseinterimorders=true;
}
async legalcaseinterimordersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcaseinterimordersTableConfig()
{
this.legalcaseinterimorderssettings = {
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
interimdate: {
title: 'Interim Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
ordernumber: {
title: 'Order Number',
type: '',
filter:true,
},
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
legalcaseinterimordersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseinterimordersID)>=0)
{
this.legalcaseinterimorderssource=new LocalDataSource();
this.legalcaseinterimorderssource.load(this.legalcaseservice.legalcaseinterimorders as  any as LocalDataSource);
this.legalcaseinterimorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcaseinterimordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcaseinterimorders.length == 0)
{
    this.tbllegalcaseinterimorderssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcaseinterimorder();
    this.legalcaseservice.legalcaseinterimorders.push(obj);
    this.legalcaseinterimorderssource.refresh();
    if ((this.legalcaseservice.legalcaseinterimorders.length / this.legalcaseinterimorderssource.getPaging().perPage).toFixed(0) + 1 != this.legalcaseinterimorderssource.getPaging().page)
    {
        this.legalcaseinterimorderssource.setPage((this.legalcaseservice.legalcaseinterimorders.length / this.legalcaseinterimorderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcaseinterimorderssource.grid.edit(this.tbllegalcaseinterimorderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcaseinterimorderssource.data.indexOf(event.data);
this.onDeletelegalcaseinterimorder(event,event.data.interimorderid,((this.legalcaseinterimorderssource.getPaging().page-1) *this.legalcaseinterimorderssource.getPaging().perPage)+index);
this.legalcaseinterimorderssource.refresh();
break;
}
}

*/
legalcaseinterimordersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcaseinterimorder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcaseinterimorder(event,event.data.interimorderid,this.formid);
break;
case 'delete':
this.onDeletelegalcaseinterimorder(event,event.data.interimorderid,((this.legalcaseinterimorderssource.getPaging().page-1) *this.legalcaseinterimorderssource.getPaging().perPage)+event.index);
this.legalcaseinterimorderssource.refresh();
break;
}
}
legalcaseinterimordersonDelete(obj) {
let interimorderid=obj.data.interimorderid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(interimorderid).then(res=>
this.legalcaseinterimordersLoadTable()
);
}
}
legalcaseinterimordersPaging(val)
{
debugger;
this.legalcaseinterimorderssource.setPaging(1, val, true);
}

handlelegalcaseinterimordersGridSelected(event:any) {
this.legalcaseinterimordersselectedindex=this.legalcaseservice.legalcaseinterimorders.findIndex(i => i.interimorderid === event.data.interimorderid);
}
IslegalcaseinterimordersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseinterimordersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcaseinterimorders
//start of Grid Codes legalcasereferredcases
onCustomlegalcasereferredcasesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(legalcaseComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
legalcasereferredcasessettings:any;
legalcasereferredcasessource: any;

showlegalcasereferredcasesCheckbox()
{
debugger;
if(this.tbllegalcasereferredcasessource.settings['selectMode']== 'multi')this.tbllegalcasereferredcasessource.settings['selectMode']= 'single';
else
this.tbllegalcasereferredcasessource.settings['selectMode']= 'multi';
this.tbllegalcasereferredcasessource.initGrid();
}
deletelegalcasereferredcasesAll()
{
this.tbllegalcasereferredcasessource.settings['selectMode'] = 'single';
}
showlegalcasereferredcasesFilter()
{
  setTimeout(() => {
  this.SetlegalcasereferredcasesTableddConfig();
  });
      if(this.tbllegalcasereferredcasessource.settings!=null)this.tbllegalcasereferredcasessource.settings['hideSubHeader'] =!this.tbllegalcasereferredcasessource.settings['hideSubHeader'];
this.tbllegalcasereferredcasessource.initGrid();
}
showlegalcasereferredcasesInActive()
{
}
enablelegalcasereferredcasesInActive()
{
}
async SetlegalcasereferredcasesTableddConfig()
{
if(!this.bfilterPopulatelegalcasereferredcases){
}
this.bfilterPopulatelegalcasereferredcases=true;
}
async legalcasereferredcasesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcasereferredcasesTableConfig()
{
this.legalcasereferredcasessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
linkedid: {
title: 'Linked',
type: '',
},
caseid: {
title: 'Case',
type: '',
},
casenumber: {
title: 'Casenumber',
type: '',
},
casetitle: {
title: 'Casetitle',
type: '',
},
},
};
}
legalcasereferredcasesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasereferredcasesID)>=0)
{
this.legalcasereferredcasessource=new LocalDataSource();
this.legalcasereferredcasessource.load(this.legalcaseservice.legalcasereferredcases as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllegalcasereferredcasessource!=null)
{this.tbllegalcasereferredcasessource.grid.getRows().forEach((row:any) => {
if(row.data.linkedid!=null && row.data.linkedid!="")
{
this.legalcaseservice.Insertlegalcasereferredcases.push(row.data);
this.tbllegalcasereferredcasessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
legalcasereferredcasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcasereferredcases.length == 0)
{
    this.tbllegalcasereferredcasessource.grid.createFormShown = true;
}
else
{
    let obj = new legalcasereferredcase();
    this.legalcaseservice.legalcasereferredcases.push(obj);
    this.legalcasereferredcasessource.refresh();
    if ((this.legalcaseservice.legalcasereferredcases.length / this.legalcasereferredcasessource.getPaging().perPage).toFixed(0) + 1 != this.legalcasereferredcasessource.getPaging().page)
    {
        this.legalcasereferredcasessource.setPage((this.legalcaseservice.legalcasereferredcases.length / this.legalcasereferredcasessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcasereferredcasessource.grid.edit(this.tbllegalcasereferredcasessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcasereferredcasessource.data.indexOf(event.data);
this.onDeletelegalcasereferredcase(event,event.data.linkedid,((this.legalcasereferredcasessource.getPaging().page-1) *this.legalcasereferredcasessource.getPaging().perPage)+index);
this.legalcasereferredcasessource.refresh();
break;
}
}

*/
legalcasereferredcasesPaging(val)
{
debugger;
this.legalcasereferredcasessource.setPaging(1, val, true);
}

handlelegalcasereferredcasesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.linkedid==null || event.data.linkedid=="")
{
var obj={caseid:this.formid,linkedcaseid:event.data.caseid}
this.legalcaseservice.Insertlegalcasereferredcases.push(obj as any);
}
else
{
var deletedids=this.DeletedlegalcasereferredcaseIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.linkedid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.linkedid!=null && event.data.linkedid!="")this.DeletedlegalcasereferredcaseIDs += event.data.linkedid + ","; 
}
}
IslegalcasereferredcasesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasereferredcasesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcasereferredcases
//start of Grid Codes legalcasekbs
onCustomlegalcasekbsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bokbmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
legalcasekbssettings:any;
legalcasekbssource: any;

showlegalcasekbsCheckbox()
{
debugger;
if(this.tbllegalcasekbssource.settings['selectMode']== 'multi')this.tbllegalcasekbssource.settings['selectMode']= 'single';
else
this.tbllegalcasekbssource.settings['selectMode']= 'multi';
this.tbllegalcasekbssource.initGrid();
}
deletelegalcasekbsAll()
{
this.tbllegalcasekbssource.settings['selectMode'] = 'single';
}
showlegalcasekbsFilter()
{
  setTimeout(() => {
  this.SetlegalcasekbsTableddConfig();
  });
      if(this.tbllegalcasekbssource.settings!=null)this.tbllegalcasekbssource.settings['hideSubHeader'] =!this.tbllegalcasekbssource.settings['hideSubHeader'];
this.tbllegalcasekbssource.initGrid();
}
showlegalcasekbsInActive()
{
}
enablelegalcasekbsInActive()
{
}
async SetlegalcasekbsTableddConfig()
{
if(!this.bfilterPopulatelegalcasekbs){
}
this.bfilterPopulatelegalcasekbs=true;
}
async legalcasekbsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcasekbsTableConfig()
{
this.legalcasekbssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
kbcaseid: {
title: 'K B Case',
type: '',
},
kbid: {
title: 'K B',
type: '',
},
kbcategory: {
title: 'Kbcategory',
type: '',
},
kbsubcategory: {
title: 'Kbsubcategory',
type: '',
},
kbsubject: {
title: 'Kbsubject',
type: '',
},
},
};
}
legalcasekbsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasekbsID)>=0)
{
this.legalcasekbssource=new LocalDataSource();
this.legalcasekbssource.load(this.legalcaseservice.legalcasekbs as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllegalcasekbssource!=null)
{this.tbllegalcasekbssource.grid.getRows().forEach((row:any) => {
if(row.data.kbcaseid!=null && row.data.kbcaseid!="")
{
this.legalcaseservice.Insertlegalcasekbs.push(row.data);
this.tbllegalcasekbssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
legalcasekbsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcasekbs.length == 0)
{
    this.tbllegalcasekbssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcasekb();
    this.legalcaseservice.legalcasekbs.push(obj);
    this.legalcasekbssource.refresh();
    if ((this.legalcaseservice.legalcasekbs.length / this.legalcasekbssource.getPaging().perPage).toFixed(0) + 1 != this.legalcasekbssource.getPaging().page)
    {
        this.legalcasekbssource.setPage((this.legalcaseservice.legalcasekbs.length / this.legalcasekbssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcasekbssource.grid.edit(this.tbllegalcasekbssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcasekbssource.data.indexOf(event.data);
this.onDeletelegalcasekb(event,event.data.kbcaseid,((this.legalcasekbssource.getPaging().page-1) *this.legalcasekbssource.getPaging().perPage)+index);
this.legalcasekbssource.refresh();
break;
}
}

*/
legalcasekbsPaging(val)
{
debugger;
this.legalcasekbssource.setPaging(1, val, true);
}

handlelegalcasekbsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.kbcaseid==null || event.data.kbcaseid=="")
{
var obj={caseid:this.formid,kbid:event.data.kbid}
this.legalcaseservice.Insertlegalcasekbs.push(obj as any);
}
else
{
var deletedids=this.DeletedlegalcasekbIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.kbcaseid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.kbcaseid!=null && event.data.kbcaseid!="")this.DeletedlegalcasekbIDs += event.data.kbcaseid + ","; 
}
}
IslegalcasekbsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasekbsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcasekbs
//start of Grid Codes legaltaskmasters
legaltaskmasterssettings:any;
legaltaskmasterssource: any;

showlegaltaskmastersCheckbox()
{
debugger;
if(this.tbllegaltaskmasterssource.settings['selectMode']== 'multi')this.tbllegaltaskmasterssource.settings['selectMode']= 'single';
else
this.tbllegaltaskmasterssource.settings['selectMode']= 'multi';
this.tbllegaltaskmasterssource.initGrid();
}
deletelegaltaskmastersAll()
{
this.tbllegaltaskmasterssource.settings['selectMode'] = 'single';
}
showlegaltaskmastersFilter()
{
  setTimeout(() => {
  this.SetlegaltaskmastersTableddConfig();
  });
      if(this.tbllegaltaskmasterssource.settings!=null)this.tbllegaltaskmasterssource.settings['hideSubHeader'] =!this.tbllegaltaskmasterssource.settings['hideSubHeader'];
this.tbllegaltaskmasterssource.initGrid();
}
showlegaltaskmastersInActive()
{
}
enablelegaltaskmastersInActive()
{
}
async SetlegaltaskmastersTableddConfig()
{
if(!this.bfilterPopulatelegaltaskmasters){

this.legalcaseservice.getlegalcasesList().then(res=>
{
var datacaseid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterscaseid3.push(defaultobj);
for(let i=0; i<datacaseid2.length; i++){
var obj= { value: datacaseid2[i].caseid, title:datacaseid2[i].casetitle};
this.datalegaltaskmasterscaseid3.push(obj);
}
if((this.tbllegaltaskmasterssource.settings as any).columns['caseid'])
{
(this.tbllegaltaskmasterssource.settings as any).columns['caseid'].editor.config.list=JSON.parse(JSON.stringify(this.datalegaltaskmasterscaseid3));
this.tbllegaltaskmasterssource.initGrid();
}
});

this.legalcustomermasterservice.getlegalcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].customername};
this.datalegaltaskmasterscustomerid3.push(obj);
}
if((this.tbllegaltaskmasterssource.settings as any).columns['customerid'])
{
(this.tbllegaltaskmasterssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.datalegaltaskmasterscustomerid3));
this.tbllegaltaskmasterssource.initGrid();
}
});

this.configservice.getList("taskcategory").then(res=>
{
var datataskcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterstaskcategory3.push(defaultobj);
for(let i=0; i<datataskcategory2.length; i++){
var obj= { value: datataskcategory2[i].configkey, title: datataskcategory2[i].configtext};
this.datalegaltaskmasterstaskcategory3.push(obj);
}
var clone = this.sharedService.clone(this.tbllegaltaskmasterssource.settings);
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterstaskcategory3)), }, };
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterstaskcategory3)), }, };
this.tbllegaltaskmasterssource.settings =  clone;
this.tbllegaltaskmasterssource.initGrid();
});

this.bomasterdataservice.getList("c3dek").then(res=>
{
var datatasktype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterstasktype3.push(defaultobj);
for(let i=0; i<datatasktype2.length; i++){
var obj= { value: datatasktype2[i].masterdataid, title:datatasktype2[i].masterdatadescription};
this.datalegaltaskmasterstasktype3.push(obj);
}
if((this.tbllegaltaskmasterssource.settings as any).columns['tasktype'])
{
(this.tbllegaltaskmasterssource.settings as any).columns['tasktype'].editor.config.list=JSON.parse(JSON.stringify(this.datalegaltaskmasterstasktype3));
this.tbllegaltaskmasterssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var datatasksubtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterstasksubtype3.push(defaultobj);
for(let i=0; i<datatasksubtype2.length; i++){
var obj= { value: datatasksubtype2[i].subcategoryid, title:datatasksubtype2[i].subcategoryname};
this.datalegaltaskmasterstasksubtype3.push(obj);
}
if((this.tbllegaltaskmasterssource.settings as any).columns['tasksubtype'])
{
(this.tbllegaltaskmasterssource.settings as any).columns['tasksubtype'].editor.config.list=JSON.parse(JSON.stringify(this.datalegaltaskmasterstasksubtype3));
this.tbllegaltaskmasterssource.initGrid();
}
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.datalegaltaskmasterspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tbllegaltaskmasterssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterspriority3)), }, };
this.tbllegaltaskmasterssource.settings =  clone;
this.tbllegaltaskmasterssource.initGrid();
});

this.configservice.getList("ratetype").then(res=>
{
var dataratetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmastersratetype3.push(defaultobj);
for(let i=0; i<dataratetype2.length; i++){
var obj= { value: dataratetype2[i].configkey, title: dataratetype2[i].configtext};
this.datalegaltaskmastersratetype3.push(obj);
}
var clone = this.sharedService.clone(this.tbllegaltaskmasterssource.settings);
if(clone.columns['ratetype']!=undefined)clone.columns['ratetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmastersratetype3)), }, };
if(clone.columns['ratetype']!=undefined)clone.columns['ratetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmastersratetype3)), }, };
this.tbllegaltaskmasterssource.settings =  clone;
this.tbllegaltaskmasterssource.initGrid();
});

this.configservice.getList("taskstatus").then(res=>
{
var datataskstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalegaltaskmasterstaskstatus3.push(defaultobj);
for(let i=0; i<datataskstatus2.length; i++){
var obj= { value: datataskstatus2[i].configkey, title: datataskstatus2[i].configtext};
this.datalegaltaskmasterstaskstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllegaltaskmasterssource.settings);
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterstaskstatus3)), }, };
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalegaltaskmasterstaskstatus3)), }, };
this.tbllegaltaskmasterssource.settings =  clone;
this.tbllegaltaskmasterssource.initGrid();
});
}
this.bfilterPopulatelegaltaskmasters=true;
}
async legaltaskmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegaltaskmastersTableConfig()
{
this.legaltaskmasterssettings = {
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
taskdate: {
title: 'Task Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
customerid: {
title: 'Customer',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'cqbkc',reportcode:'cqbkc',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterscustomerid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
taskcategory: {
title: 'Task Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterstaskcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
tasktype: {
title: 'Task Type',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterstasktype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
tasksubtype: {
title: 'Task Sub Type',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterstasksubtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assignedto: {
title: 'Assigned To',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
estimatedhrs: {
title: 'Estimated Hrs',
type: '',
filter:true,
renderComponent: durationComponent,
editor: {
type: 'custom',
component: durationComponent,
},
},
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
target: {
title: 'Target',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
ratetype: {
title: 'Rate Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmastersratetype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rate: {
title: 'Rate',
type: 'number',
filter:true,
},
taskstatus: {
title: 'Task Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalegaltaskmasterstaskstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
taskstarted: {
title: 'Task Started',
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
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
legaltaskmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legaltaskmastersID)>=0)
{
this.legaltaskmasterssource=new LocalDataSource();
this.legaltaskmasterssource.load(this.legalcaseservice.legaltaskmasters as  any as LocalDataSource);
this.legaltaskmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legaltaskmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legaltaskmasters.length == 0)
{
    this.tbllegaltaskmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new legaltaskmaster();
    this.legalcaseservice.legaltaskmasters.push(obj);
    this.legaltaskmasterssource.refresh();
    if ((this.legalcaseservice.legaltaskmasters.length / this.legaltaskmasterssource.getPaging().perPage).toFixed(0) + 1 != this.legaltaskmasterssource.getPaging().page)
    {
        this.legaltaskmasterssource.setPage((this.legalcaseservice.legaltaskmasters.length / this.legaltaskmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegaltaskmasterssource.grid.edit(this.tbllegaltaskmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.legaltaskmasterssource.data.indexOf(event.data);
this.onDeletelegaltaskmaster(event,event.data.taskid,((this.legaltaskmasterssource.getPaging().page-1) *this.legaltaskmasterssource.getPaging().perPage)+index);
this.legaltaskmasterssource.refresh();
}
break;
}
}

*/
legaltaskmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegaltaskmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegaltaskmaster(event,event.data.taskid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletelegaltaskmaster(event,event.data.taskid,((this.legaltaskmasterssource.getPaging().page-1) *this.legaltaskmasterssource.getPaging().perPage)+event.index);
this.legaltaskmasterssource.refresh();
}
break;
}
}
legaltaskmastersonDelete(obj) {
let taskid=obj.data.taskid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(taskid).then(res=>
this.legaltaskmastersLoadTable()
);
}
}
legaltaskmastersPaging(val)
{
debugger;
this.legaltaskmasterssource.setPaging(1, val, true);
}

handlelegaltaskmastersGridSelected(event:any) {
this.legaltaskmastersselectedindex=this.legalcaseservice.legaltaskmasters.findIndex(i => i.taskid === event.data.taskid);
}
IslegaltaskmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legaltaskmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legaltaskmasters
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

this.bousermasterservice.getbousermastersList().then(res=>
{
var datarequesteduserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesrequesteduserid3.push(defaultobj);
for(let i=0; i<datarequesteduserid2.length; i++){
var obj= { value: datarequesteduserid2[i].userid, title:datarequesteduserid2[i].username};
this.databoexpensesrequesteduserid3.push(obj);
}
if((this.tblboexpensessource.settings as any).columns['requesteduserid'])
{
(this.tblboexpensessource.settings as any).columns['requesteduserid'].editor.config.list=JSON.parse(JSON.stringify(this.databoexpensesrequesteduserid3));
this.tblboexpensessource.initGrid();
}
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.databoexpensescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var databasecurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesbasecurrency3.push(defaultobj);
for(let i=0; i<databasecurrency2.length; i++){
var obj= { value: databasecurrency2[i].configkey, title: databasecurrency2[i].configtext};
this.databoexpensesbasecurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesrequesteduserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensescurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesbasecurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
this.boexpensessource.load(this.legalcaseservice.boexpenses as  any as LocalDataSource);
this.boexpensessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boexpensesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.boexpenses.length == 0)
{
    this.tblboexpensessource.grid.createFormShown = true;
}
else
{
    let obj = new boexpense();
    this.legalcaseservice.boexpenses.push(obj);
    this.boexpensessource.refresh();
    if ((this.legalcaseservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1 != this.boexpensessource.getPaging().page)
    {
        this.boexpensessource.setPage((this.legalcaseservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1);
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
this.legalcaseservice.deletelegalcase(expenseid).then(res=>
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
this.boexpensesselectedindex=this.legalcaseservice.boexpenses.findIndex(i => i.expenseid === event.data.expenseid);
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
//start of Grid Codes legalfreenotes
legalfreenotessettings:any;
legalfreenotessource: any;

showlegalfreenotesCheckbox()
{
debugger;
if(this.tbllegalfreenotessource.settings['selectMode']== 'multi')this.tbllegalfreenotessource.settings['selectMode']= 'single';
else
this.tbllegalfreenotessource.settings['selectMode']= 'multi';
this.tbllegalfreenotessource.initGrid();
}
deletelegalfreenotesAll()
{
this.tbllegalfreenotessource.settings['selectMode'] = 'single';
}
showlegalfreenotesFilter()
{
  setTimeout(() => {
  this.SetlegalfreenotesTableddConfig();
  });
      if(this.tbllegalfreenotessource.settings!=null)this.tbllegalfreenotessource.settings['hideSubHeader'] =!this.tbllegalfreenotessource.settings['hideSubHeader'];
this.tbllegalfreenotessource.initGrid();
}
showlegalfreenotesInActive()
{
}
enablelegalfreenotesInActive()
{
}
async SetlegalfreenotesTableddConfig()
{
if(!this.bfilterPopulatelegalfreenotes){
}
this.bfilterPopulatelegalfreenotes=true;
}
async legalfreenotesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalfreenotesTableConfig()
{
this.legalfreenotessettings = {
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
entrydate: {
title: 'Entry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enteredby: {
title: 'Entered By',
type: 'number',
filter:true,
},
subject: {
title: 'Subject',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
freenotes: {
title: 'Free Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
legalfreenotesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalfreenotesID)>=0)
{
this.legalfreenotessource=new LocalDataSource();
this.legalfreenotessource.load(this.legalcaseservice.legalfreenotes as  any as LocalDataSource);
this.legalfreenotessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalfreenotesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalfreenotes.length == 0)
{
    this.tbllegalfreenotessource.grid.createFormShown = true;
}
else
{
    let obj = new legalfreenote();
    this.legalcaseservice.legalfreenotes.push(obj);
    this.legalfreenotessource.refresh();
    if ((this.legalcaseservice.legalfreenotes.length / this.legalfreenotessource.getPaging().perPage).toFixed(0) + 1 != this.legalfreenotessource.getPaging().page)
    {
        this.legalfreenotessource.setPage((this.legalcaseservice.legalfreenotes.length / this.legalfreenotessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalfreenotessource.grid.edit(this.tbllegalfreenotessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalfreenotessource.data.indexOf(event.data);
this.onDeletelegalfreenote(event,event.data.freenotesid,((this.legalfreenotessource.getPaging().page-1) *this.legalfreenotessource.getPaging().perPage)+index);
this.legalfreenotessource.refresh();
break;
}
}

*/
legalfreenotesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalfreenote(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalfreenote(event,event.data.freenotesid,this.formid);
break;
case 'delete':
this.onDeletelegalfreenote(event,event.data.freenotesid,((this.legalfreenotessource.getPaging().page-1) *this.legalfreenotessource.getPaging().perPage)+event.index);
this.legalfreenotessource.refresh();
break;
}
}
legalfreenotesonDelete(obj) {
let freenotesid=obj.data.freenotesid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(freenotesid).then(res=>
this.legalfreenotesLoadTable()
);
}
}
legalfreenotesPaging(val)
{
debugger;
this.legalfreenotessource.setPaging(1, val, true);
}

handlelegalfreenotesGridSelected(event:any) {
this.legalfreenotesselectedindex=this.legalcaseservice.legalfreenotes.findIndex(i => i.freenotesid === event.data.freenotesid);
}
IslegalfreenotesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalfreenotesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalfreenotes
//start of Grid Codes legalcommunicationdetails
legalcommunicationdetailssettings:any;
legalcommunicationdetailssource: any;

showlegalcommunicationdetailsCheckbox()
{
debugger;
if(this.tbllegalcommunicationdetailssource.settings['selectMode']== 'multi')this.tbllegalcommunicationdetailssource.settings['selectMode']= 'single';
else
this.tbllegalcommunicationdetailssource.settings['selectMode']= 'multi';
this.tbllegalcommunicationdetailssource.initGrid();
}
deletelegalcommunicationdetailsAll()
{
this.tbllegalcommunicationdetailssource.settings['selectMode'] = 'single';
}
showlegalcommunicationdetailsFilter()
{
  setTimeout(() => {
  this.SetlegalcommunicationdetailsTableddConfig();
  });
      if(this.tbllegalcommunicationdetailssource.settings!=null)this.tbllegalcommunicationdetailssource.settings['hideSubHeader'] =!this.tbllegalcommunicationdetailssource.settings['hideSubHeader'];
this.tbllegalcommunicationdetailssource.initGrid();
}
showlegalcommunicationdetailsInActive()
{
}
enablelegalcommunicationdetailsInActive()
{
}
async SetlegalcommunicationdetailsTableddConfig()
{
if(!this.bfilterPopulatelegalcommunicationdetails){
}
this.bfilterPopulatelegalcommunicationdetails=true;
}
async legalcommunicationdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcommunicationdetailsTableConfig()
{
this.legalcommunicationdetailssettings = {
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
partytype: {
title: 'Party Type',
type: 'number',
filter:true,
},
partyid: {
title: 'Party',
type: 'number',
filter:true,
},
communicationdate: {
title: 'Communication Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
mode: {
title: 'Mode',
type: 'number',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
documenttypeid: {
title: 'Document Type',
type: 'number',
filter:true,
},
subject: {
title: 'Subject',
type: '',
filter:true,
},
sender: {
title: 'Sender',
type: '',
filter:true,
},
addressedto: {
title: 'Addressed To',
type: '',
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
legalcommunicationdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcommunicationdetailsID)>=0)
{
this.legalcommunicationdetailssource=new LocalDataSource();
this.legalcommunicationdetailssource.load(this.legalcaseservice.legalcommunicationdetails as  any as LocalDataSource);
this.legalcommunicationdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcommunicationdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcommunicationdetails.length == 0)
{
    this.tbllegalcommunicationdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcommunicationdetail();
    this.legalcaseservice.legalcommunicationdetails.push(obj);
    this.legalcommunicationdetailssource.refresh();
    if ((this.legalcaseservice.legalcommunicationdetails.length / this.legalcommunicationdetailssource.getPaging().perPage).toFixed(0) + 1 != this.legalcommunicationdetailssource.getPaging().page)
    {
        this.legalcommunicationdetailssource.setPage((this.legalcaseservice.legalcommunicationdetails.length / this.legalcommunicationdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcommunicationdetailssource.grid.edit(this.tbllegalcommunicationdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcommunicationdetailssource.data.indexOf(event.data);
this.onDeletelegalcommunicationdetail(event,event.data.communicationid,((this.legalcommunicationdetailssource.getPaging().page-1) *this.legalcommunicationdetailssource.getPaging().perPage)+index);
this.legalcommunicationdetailssource.refresh();
break;
}
}

*/
legalcommunicationdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcommunicationdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcommunicationdetail(event,event.data.communicationid,this.formid);
break;
case 'delete':
this.onDeletelegalcommunicationdetail(event,event.data.communicationid,((this.legalcommunicationdetailssource.getPaging().page-1) *this.legalcommunicationdetailssource.getPaging().perPage)+event.index);
this.legalcommunicationdetailssource.refresh();
break;
}
}
legalcommunicationdetailsonDelete(obj) {
let communicationid=obj.data.communicationid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(communicationid).then(res=>
this.legalcommunicationdetailsLoadTable()
);
}
}
legalcommunicationdetailsPaging(val)
{
debugger;
this.legalcommunicationdetailssource.setPaging(1, val, true);
}

handlelegalcommunicationdetailsGridSelected(event:any) {
this.legalcommunicationdetailsselectedindex=this.legalcaseservice.legalcommunicationdetails.findIndex(i => i.communicationid === event.data.communicationid);
}
IslegalcommunicationdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcommunicationdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcommunicationdetails
//start of Grid Codes legalcaseagainstemployees
legalcaseagainstemployeessettings:any;
legalcaseagainstemployeessource: any;

showlegalcaseagainstemployeesCheckbox()
{
debugger;
if(this.tbllegalcaseagainstemployeessource.settings['selectMode']== 'multi')this.tbllegalcaseagainstemployeessource.settings['selectMode']= 'single';
else
this.tbllegalcaseagainstemployeessource.settings['selectMode']= 'multi';
this.tbllegalcaseagainstemployeessource.initGrid();
}
deletelegalcaseagainstemployeesAll()
{
this.tbllegalcaseagainstemployeessource.settings['selectMode'] = 'single';
}
showlegalcaseagainstemployeesFilter()
{
  setTimeout(() => {
  this.SetlegalcaseagainstemployeesTableddConfig();
  });
      if(this.tbllegalcaseagainstemployeessource.settings!=null)this.tbllegalcaseagainstemployeessource.settings['hideSubHeader'] =!this.tbllegalcaseagainstemployeessource.settings['hideSubHeader'];
this.tbllegalcaseagainstemployeessource.initGrid();
}
showlegalcaseagainstemployeesInActive()
{
}
enablelegalcaseagainstemployeesInActive()
{
}
async SetlegalcaseagainstemployeesTableddConfig()
{
if(!this.bfilterPopulatelegalcaseagainstemployees){
}
this.bfilterPopulatelegalcaseagainstemployees=true;
}
async legalcaseagainstemployeesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcaseagainstemployeesTableConfig()
{
this.legalcaseagainstemployeessettings = {
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
departmentid: {
title: 'Department',
type: 'number',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
issuecategory: {
title: 'Issue Category',
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
legalcaseagainstemployeesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseagainstemployeesID)>=0)
{
this.legalcaseagainstemployeessource=new LocalDataSource();
this.legalcaseagainstemployeessource.load(this.legalcaseservice.legalcaseagainstemployees as  any as LocalDataSource);
this.legalcaseagainstemployeessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcaseagainstemployeesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcaseagainstemployees.length == 0)
{
    this.tbllegalcaseagainstemployeessource.grid.createFormShown = true;
}
else
{
    let obj = new legalcaseagainstemployee();
    this.legalcaseservice.legalcaseagainstemployees.push(obj);
    this.legalcaseagainstemployeessource.refresh();
    if ((this.legalcaseservice.legalcaseagainstemployees.length / this.legalcaseagainstemployeessource.getPaging().perPage).toFixed(0) + 1 != this.legalcaseagainstemployeessource.getPaging().page)
    {
        this.legalcaseagainstemployeessource.setPage((this.legalcaseservice.legalcaseagainstemployees.length / this.legalcaseagainstemployeessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcaseagainstemployeessource.grid.edit(this.tbllegalcaseagainstemployeessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcaseagainstemployeessource.data.indexOf(event.data);
this.onDeletelegalcaseagainstemployee(event,event.data.caseagainstid,((this.legalcaseagainstemployeessource.getPaging().page-1) *this.legalcaseagainstemployeessource.getPaging().perPage)+index);
this.legalcaseagainstemployeessource.refresh();
break;
}
}

*/
legalcaseagainstemployeesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcaseagainstemployee(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcaseagainstemployee(event,event.data.caseagainstid,this.formid);
break;
case 'delete':
this.onDeletelegalcaseagainstemployee(event,event.data.caseagainstid,((this.legalcaseagainstemployeessource.getPaging().page-1) *this.legalcaseagainstemployeessource.getPaging().perPage)+event.index);
this.legalcaseagainstemployeessource.refresh();
break;
}
}
legalcaseagainstemployeesonDelete(obj) {
let caseagainstid=obj.data.caseagainstid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(caseagainstid).then(res=>
this.legalcaseagainstemployeesLoadTable()
);
}
}
legalcaseagainstemployeesPaging(val)
{
debugger;
this.legalcaseagainstemployeessource.setPaging(1, val, true);
}

handlelegalcaseagainstemployeesGridSelected(event:any) {
this.legalcaseagainstemployeesselectedindex=this.legalcaseservice.legalcaseagainstemployees.findIndex(i => i.caseagainstid === event.data.caseagainstid);
}
IslegalcaseagainstemployeesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcaseagainstemployeesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcaseagainstemployees
//start of Grid Codes legalcasehearings
legalcasehearingssettings:any;
legalcasehearingssource: any;

showlegalcasehearingsCheckbox()
{
debugger;
if(this.tbllegalcasehearingssource.settings['selectMode']== 'multi')this.tbllegalcasehearingssource.settings['selectMode']= 'single';
else
this.tbllegalcasehearingssource.settings['selectMode']= 'multi';
this.tbllegalcasehearingssource.initGrid();
}
deletelegalcasehearingsAll()
{
this.tbllegalcasehearingssource.settings['selectMode'] = 'single';
}
showlegalcasehearingsFilter()
{
  setTimeout(() => {
  this.SetlegalcasehearingsTableddConfig();
  });
      if(this.tbllegalcasehearingssource.settings!=null)this.tbllegalcasehearingssource.settings['hideSubHeader'] =!this.tbllegalcasehearingssource.settings['hideSubHeader'];
this.tbllegalcasehearingssource.initGrid();
}
showlegalcasehearingsInActive()
{
}
enablelegalcasehearingsInActive()
{
}
async SetlegalcasehearingsTableddConfig()
{
if(!this.bfilterPopulatelegalcasehearings){
}
this.bfilterPopulatelegalcasehearings=true;
}
async legalcasehearingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcasehearingsTableConfig()
{
this.legalcasehearingssettings = {
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
hearingdate: {
title: 'Hearing Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
lawyerid: {
title: 'Lawyer',
type: 'number',
filter:true,
},
additionallawyerid1: {
title: 'Additional Lawyer I D1',
type: 'number',
filter:true,
},
additionallawyerid2: {
title: 'Additional Lawyer I D2',
type: 'number',
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
actiontobetaken: {
title: 'Action To Be Taken',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
nexthearingdate: {
title: 'Next Hearing Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
legalcasehearingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasehearingsID)>=0)
{
this.legalcasehearingssource=new LocalDataSource();
this.legalcasehearingssource.load(this.legalcaseservice.legalcasehearings as  any as LocalDataSource);
this.legalcasehearingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcasehearingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcaseservice.legalcasehearings.length == 0)
{
    this.tbllegalcasehearingssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcasehearing();
    this.legalcaseservice.legalcasehearings.push(obj);
    this.legalcasehearingssource.refresh();
    if ((this.legalcaseservice.legalcasehearings.length / this.legalcasehearingssource.getPaging().perPage).toFixed(0) + 1 != this.legalcasehearingssource.getPaging().page)
    {
        this.legalcasehearingssource.setPage((this.legalcaseservice.legalcasehearings.length / this.legalcasehearingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcasehearingssource.grid.edit(this.tbllegalcasehearingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcasehearingssource.data.indexOf(event.data);
this.onDeletelegalcasehearing(event,event.data.hearingid,((this.legalcasehearingssource.getPaging().page-1) *this.legalcasehearingssource.getPaging().perPage)+index);
this.legalcasehearingssource.refresh();
break;
}
}

*/
legalcasehearingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcasehearing(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcasehearing(event,event.data.hearingid,this.formid);
break;
case 'delete':
this.onDeletelegalcasehearing(event,event.data.hearingid,((this.legalcasehearingssource.getPaging().page-1) *this.legalcasehearingssource.getPaging().perPage)+event.index);
this.legalcasehearingssource.refresh();
break;
}
}
legalcasehearingsonDelete(obj) {
let hearingid=obj.data.hearingid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcaseservice.deletelegalcase(hearingid).then(res=>
this.legalcasehearingsLoadTable()
);
}
}
legalcasehearingsPaging(val)
{
debugger;
this.legalcasehearingssource.setPaging(1, val, true);
}

handlelegalcasehearingsGridSelected(event:any) {
this.legalcasehearingsselectedindex=this.legalcaseservice.legalcasehearings.findIndex(i => i.hearingid === event.data.hearingid);
}
IslegalcasehearingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasehearingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcasehearings

}



