import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
import { prjprojectmaster } from './../../../model/prjprojectmaster.model';
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
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { prjprojectdeliverable } from './../../../model/prjprojectdeliverable.model';
import { prjprojectdeliverableComponent } from './../../../pages/forms/prjprojectdeliverable/prjprojectdeliverable.component';
//FK services
import { prjexpense } from './../../../model/prjexpense.model';
import { prjexpenseComponent } from './../../../pages/forms/prjexpense/prjexpense.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
import { prjprojecttask } from './../../../model/prjprojecttask.model';
import { prjprojecttaskComponent } from './../../../pages/forms/prjprojecttask/prjprojecttask.component';
//FK services
import { bofact } from '../../../../../../n-tire-bo-app/src/app/model/bofact.model';
import { bofactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bofact/bofact.component';
//FK services
import { prjprojectchange } from './../../../model/prjprojectchange.model';
import { prjprojectchangeComponent } from './../../../pages/forms/prjprojectchange/prjprojectchange.component';
//FK services
import { boremindermaster } from '../../../../../../n-tire-bo-app/src/app/model/boremindermaster.model';
import { boremindermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boremindermaster/boremindermaster.component';
//FK services
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { prjprojectteammember } from './../../../model/prjprojectteammember.model';
import { prjprojectteammemberComponent } from './../../../pages/forms/prjprojectteammember/prjprojectteammember.component';
//FK services
import { prjprojectverification } from './../../../model/prjprojectverification.model';
import { prjprojectverificationComponent } from './../../../pages/forms/prjprojectverification/prjprojectverification.component';
//FK services
import { prjtimecard } from './../../../model/prjtimecard.model';
import { prjtimecardComponent } from './../../../pages/forms/prjtimecard/prjtimecard.component';
//FK services
import { prjprojecttaskService } from './../../../service/prjprojecttask.service';
import { prjprojectdeliverableService } from './../../../service/prjprojectdeliverable.service';
import { prjdocument } from './../../../model/prjdocument.model';
import { prjdocumentComponent } from './../../../pages/forms/prjdocument/prjdocument.component';
//FK services
import { prjprojectbilling } from './../../../model/prjprojectbilling.model';
import { prjprojectbillingComponent } from './../../../pages/forms/prjprojectbilling/prjprojectbilling.component';
//FK services
import { prjprojectobjective } from './../../../model/prjprojectobjective.model';
import { prjprojectobjectiveComponent } from './../../../pages/forms/prjprojectobjective/prjprojectobjective.component';
//FK services
import { prjdailystandup } from './../../../model/prjdailystandup.model';
import { prjdailystandupComponent } from './../../../pages/forms/prjdailystandup/prjdailystandup.component';
//FK services
import { prjchangerequest } from './../../../model/prjchangerequest.model';
import { prjchangerequestComponent } from './../../../pages/forms/prjchangerequest/prjchangerequest.component';
//FK services
import { prjrelease } from './../../../model/prjrelease.model';
import { prjreleaseComponent } from './../../../pages/forms/prjrelease/prjrelease.component';
//FK services
import { proprocessgap } from '../../../../../../n-tire-bo-app/src/app/model/proprocessgap.model';
import { proprocessgapComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/proprocessgap/proprocessgap.component';
//FK services
import { bouser } from '../../../../../../n-tire-bo-app/src/app/model/bouser.model';
import { bouserComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouser/bouser.component';
//FK services
import { prjprojectoutput } from './../../../model/prjprojectoutput.model';
import { prjprojectoutputComponent } from './../../../pages/forms/prjprojectoutput/prjprojectoutput.component';
//FK services
import { prjprojectrequirement } from './../../../model/prjprojectrequirement.model';
import { prjprojectrequirementComponent } from './../../../pages/forms/prjprojectrequirement/prjprojectrequirement.component';
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
selector: 'app-prjprojectmaster',
templateUrl: './prjprojectmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectmasterComponent implements OnInit {
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
bfilterPopulateprjprojectmasters:boolean=false;
dataprjprojectmasterscustomerid3:any=[];
dataprjprojectmastersprojectmanager3:any=[];
dataprjprojectmastersprojecttype3:any=[];
dataprjprojectmasterspriority3:any=[];
dataprjprojectmastersprojectphase3:any=[];
dataprjprojectmastersprojectstatus3:any=[];
dataprjprojectmasterscurrency3:any=[];
bfilterPopulateprjprojectdeliverables:boolean=false;
dataprjexpensescostcenterid3:any=[];
dataprjexpensesrequesteduserid3:any=[];
dataprjexpensesprojectid3:any=[];
dataprjexpensescurrency3:any=[];
dataprjexpensesbasecurrency3:any=[];
dataprjexpensesexpensecategory3:any=[];
bfilterPopulateprjexpenses:boolean=false;
dataprjprojecttasksworkdoneby3:any=[];
dataprjprojecttaskspriority3:any=[];
dataprjprojecttaskstasktype3:any=[];
dataprjprojecttaskscomplexity3:any=[];
dataprjprojecttaskstaskcategory3:any=[];
dataprjprojecttaskscolor3:any=[];
dataprjprojecttaskscolorcode3:any=[];
dataprjprojecttaskstaskstatus3:any=[];
bfilterPopulateprjprojecttasks:boolean=false;
bfilterPopulatebofacts:boolean=false;
dataprjprojectchangeschangestatus3:any=[];
bfilterPopulateprjprojectchanges:boolean=false;
databoremindermasterscategoryid3:any=[];
databoremindermasterssubcategoryid3:any=[];
databoremindermasterspriority3:any=[];
databoremindermastersscheduletype3:any=[];
databoremindermastersreminderdaysbefore3:any=[];
databoremindermastersreminderusertype3:any=[];
bfilterPopulateboremindermasters:boolean=false;
dataprjprojectteammembersprojectid3:any=[];
dataprjprojectteammembersuserid3:any=[];
dataprjprojectteammembersmemberstatus3:any=[];
bfilterPopulateprjprojectteammembers:boolean=false;
dataprjprojectverificationsprojectid3:any=[];
dataprjprojectverificationsverificationstage3:any=[];
dataprjprojectverificationsverificationresult3:any=[];
dataprjprojectverificationsverificationby3:any=[];
dataprjprojectverificationsreviewedby3:any=[];
bfilterPopulateprjprojectverifications:boolean=false;
dataprjtimecardstaskid3:any=[];
dataprjtimecardsprojectid3:any=[];
dataprjtimecardsuserid3:any=[];
dataprjtimecardsdeliverableid3:any=[];
bfilterPopulateprjtimecards:boolean=false;
dataprjdocumentsprojectid3:any=[];
dataprjdocumentscategory3:any=[];
bfilterPopulateprjdocuments:boolean=false;
bfilterPopulateprjprojectbillings:boolean=false;
dataprjprojectobjectivesprojectid3:any=[];
dataprjprojectobjectivescurrentstatus3:any=[];
bfilterPopulateprjprojectobjectives:boolean=false;
dataprjdailystandupsprojectid3:any=[];
bfilterPopulateprjdailystandups:boolean=false;
dataprjchangerequestschangetype3:any=[];
dataprjchangerequestspriority3:any=[];
dataprjchangerequestscriticality3:any=[];
dataprjchangerequestsimpact3:any=[];
dataprjchangerequestsstage3:any=[];
dataprjchangerequestsrisk3:any=[];
bfilterPopulateprjchangerequests:boolean=false;
dataprjreleasescategory3:any=[];
dataprjreleasestype3:any=[];
dataprjreleasespriority3:any=[];
dataprjreleasescriticality3:any=[];
dataprjreleasesimpact3:any=[];
dataprjreleasesrisk3:any=[];
dataprjreleasesreleasestatus3:any=[];
bfilterPopulateprjreleases:boolean=false;
dataproprocessgapscurrentresult3:any=[];
dataproprocessgapsdesiredresult3:any=[];
bfilterPopulateproprocessgaps:boolean=false;
bfilterPopulatebousers:boolean=false;
dataprjprojectoutputsprojectid3:any=[];
dataprjprojectoutputsoutputby3:any=[];
dataprjprojectoutputsverifiedby3:any=[];
bfilterPopulateprjprojectoutputs:boolean=false;
dataprjprojectrequirementsprojectid3:any=[];
dataprjprojectrequirementsauthorid3:any=[];
dataprjprojectrequirementsreviewerid3:any=[];
bfilterPopulateprjprojectrequirements:boolean=false;
@ViewChild('tblprjprojectdeliverablessource',{static:false}) tblprjprojectdeliverablessource: Ng2SmartTableComponent;
@ViewChild('tblprjexpensessource',{static:false}) tblprjexpensessource: Ng2SmartTableComponent;
@ViewChild('tblprjprojecttaskssource',{static:false}) tblprjprojecttaskssource: Ng2SmartTableComponent;
@ViewChild('tblbofactssource',{static:false}) tblbofactssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectchangessource',{static:false}) tblprjprojectchangessource: Ng2SmartTableComponent;
@ViewChild('tblboremindermasterssource',{static:false}) tblboremindermasterssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectteammemberssource',{static:false}) tblprjprojectteammemberssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectverificationssource',{static:false}) tblprjprojectverificationssource: Ng2SmartTableComponent;
@ViewChild('tblprjtimecardssource',{static:false}) tblprjtimecardssource: Ng2SmartTableComponent;
@ViewChild('tblprjdocumentssource',{static:false}) tblprjdocumentssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectbillingssource',{static:false}) tblprjprojectbillingssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectobjectivessource',{static:false}) tblprjprojectobjectivessource: Ng2SmartTableComponent;
@ViewChild('tblprjdailystandupssource',{static:false}) tblprjdailystandupssource: Ng2SmartTableComponent;
@ViewChild('tblprjchangerequestssource',{static:false}) tblprjchangerequestssource: Ng2SmartTableComponent;
@ViewChild('tblprjreleasessource',{static:false}) tblprjreleasessource: Ng2SmartTableComponent;
@ViewChild('tblproprocessgapssource',{static:false}) tblproprocessgapssource: Ng2SmartTableComponent;
@ViewChild('tblbouserssource',{static:false}) tblbouserssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectoutputssource',{static:false}) tblprjprojectoutputssource: Ng2SmartTableComponent;
@ViewChild('tblprjprojectrequirementssource',{static:false}) tblprjprojectrequirementssource: Ng2SmartTableComponent;
 prjprojectmasterForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
projectmanagerList: bousermaster[];
projectmanageroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectmanager_bousermastersForm: FormGroup;//autocomplete
projectmanager_bousermastersoptions:any;//autocomplete
projectmanager_bousermastersformatter:any;//autocomplete
projecttypeList: boconfigvalue[];
priorityList: boconfigvalue[];
projectphaseList: boconfigvalue[];
projectstatusList: boconfigvalue[];
currencyList: boconfigvalue[];
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
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
prjprojectmastershowOption:boolean;
prjprojectdeliverableshowOption:boolean;
prjexpenseshowOption:boolean;
prjprojecttaskshowOption:boolean;
bofactshowOption:boolean;
prjprojectchangeshowOption:boolean;
boremindermastershowOption:boolean;
prjprojectteammembershowOption:boolean;
prjprojectverificationshowOption:boolean;
prjtimecardshowOption:boolean;
prjdocumentshowOption:boolean;
prjprojectbillingshowOption:boolean;
prjprojectobjectiveshowOption:boolean;
prjdailystandupshowOption:boolean;
prjchangerequestshowOption:boolean;
prjreleaseshowOption:boolean;
proprocessgapshowOption:boolean;
bousershowOption:boolean;
prjprojectoutputshowOption:boolean;
prjprojectrequirementshowOption:boolean;
sessiondata:any;
sourcekey:any;



prjprojectdeliverablesvisiblelist:any;
prjprojectdeliverableshidelist:any;
prjexpensesvisiblelist:any;
prjexpenseshidelist:any;
prjprojecttasksvisiblelist:any;
prjprojecttaskshidelist:any;
bofactsvisiblelist:any;
bofactshidelist:any;
prjprojectchangesvisiblelist:any;
prjprojectchangeshidelist:any;
boremindermastersvisiblelist:any;
boremindermastershidelist:any;
prjprojectteammembersvisiblelist:any;
prjprojectteammembershidelist:any;
prjprojectverificationsvisiblelist:any;
prjprojectverificationshidelist:any;
prjtimecardsvisiblelist:any;
prjtimecardshidelist:any;
prjdocumentsvisiblelist:any;
prjdocumentshidelist:any;
prjprojectbillingsvisiblelist:any;
prjprojectbillingshidelist:any;
prjprojectobjectivesvisiblelist:any;
prjprojectobjectiveshidelist:any;
prjdailystandupsvisiblelist:any;
prjdailystandupshidelist:any;
prjchangerequestsvisiblelist:any;
prjchangerequestshidelist:any;
prjreleasesvisiblelist:any;
prjreleaseshidelist:any;
proprocessgapsvisiblelist:any;
proprocessgapshidelist:any;
bousersvisiblelist:any;
bousershidelist:any;
prjprojectoutputsvisiblelist:any;
prjprojectoutputshidelist:any;
prjprojectrequirementsvisiblelist:any;
prjprojectrequirementshidelist:any;

DeletedprjprojectdeliverableIDs: string="";
prjprojectdeliverablesID: string = "1";
prjprojectdeliverablesselectedindex:any;
DeletedprjexpenseIDs: string="";
prjexpensesID: string = "2";
prjexpensesselectedindex:any;
DeletedprjprojecttaskIDs: string="";
prjprojecttasksID: string = "3";
prjprojecttasksselectedindex:any;
DeletedbofactIDs: string="";
bofactsID: string = "4";
bofactsselectedindex:any;
DeletedprjprojectchangeIDs: string="";
prjprojectchangesID: string = "5";
prjprojectchangesselectedindex:any;
DeletedboremindermasterIDs: string="";
boremindermastersID: string = "6";
boremindermastersselectedindex:any;
DeletedprjprojectteammemberIDs: string="";
prjprojectteammembersID: string = "7";
prjprojectteammembersselectedindex:any;
DeletedprjprojectverificationIDs: string="";
prjprojectverificationsID: string = "8";
prjprojectverificationsselectedindex:any;
DeletedprjtimecardIDs: string="";
prjtimecardsID: string = "9";
prjtimecardsselectedindex:any;
DeletedprjdocumentIDs: string="";
prjdocumentsID: string = "10";
prjdocumentsselectedindex:any;
DeletedprjprojectbillingIDs: string="";
prjprojectbillingsID: string = "11";
prjprojectbillingsselectedindex:any;
DeletedprjprojectobjectiveIDs: string="";
prjprojectobjectivesID: string = "12";
prjprojectobjectivesselectedindex:any;
DeletedprjdailystandupIDs: string="";
prjdailystandupsID: string = "13";
prjdailystandupsselectedindex:any;
DeletedprjchangerequestIDs: string="";
prjchangerequestsID: string = "14";
prjchangerequestsselectedindex:any;
DeletedprjreleaseIDs: string="";
prjreleasesID: string = "15";
prjreleasesselectedindex:any;
DeletedproprocessgapIDs: string="";
proprocessgapsID: string = "16";
proprocessgapsselectedindex:any;
DeletedbouserIDs: string="";
bousersID: string = "17";
bousersselectedindex:any;
DeletedprjprojectoutputIDs: string="";
prjprojectoutputsID: string = "18";
prjprojectoutputsselectedindex:any;
DeletedprjprojectrequirementIDs: string="";
prjprojectrequirementsID: string = "19";
prjprojectrequirementsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjprojectmasterservice: prjprojectmasterService,
private erpfacostcenterservice: erpfacostcenterService,
private bousermasterservice: bousermasterService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private prjprojecttaskservice: prjprojecttaskService,
private prjprojectdeliverableservice: prjprojectdeliverableService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.prjprojectmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
projectid: [null],
sourcefield: [null],
sourcereference: [null],
projectcode: [null],
projectname: [null, Validators.required],
departmentid: [null],
customerid: [null],
customeriddesc: [null],
salesorderid: [null],
briefdescription: [null, Validators.required],
projectscope: [null],
thumbnail: [null],
projectmanager: [null],
projectmanagerdesc: [null],
startdate: [null, Validators.required],
enddate: [null],
progressrate: [null],
lastupdateddate: [null],
actualstartdate: [null],
projectedenddate: [null],
completeddate: [null],
closeddate: [null],
lastreviseddate: [null],
projecttype: [null],
projecttypedesc: [null],
priority: [null],
prioritydesc: [null],
projectphase: [null],
projectphasedesc: [null],
projectstatus: [null],
projectstatusdesc: [null],
currency: [null],
currencydesc: [null],
totalbudgetamount: [null],
feedbacktags: [null],
budgetmaterialcost: [null],
budgetlabourcost: [null],
actualmaterialcost: [null],
actuallabourcost: [null],
materialbudgetremaining: [null],
totalbudgetremaining: [null],
totalhoursestimated: [null],
totalactualhours: [null],
notes: [null],
costcenterid: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectmasterForm.dirty && this.prjprojectmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.projectid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.projectid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.projectid && pkDetail) {
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
let prjprojectmasterid = null;

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
this.formid=prjprojectmasterid;
//this.sharedService.alert(prjprojectmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetprjprojectdeliverablesTableConfig();
  setTimeout(() => {
  this.SetprjprojectdeliverablesTableddConfig();
  });

this.SetprjexpensesTableConfig();
  setTimeout(() => {
  this.SetprjexpensesTableddConfig();
  });

this.SetprjprojecttasksTableConfig();
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });

this.SetbofactsTableConfig();
  setTimeout(() => {
  this.SetbofactsTableddConfig();
  });

this.SetprjprojectchangesTableConfig();
  setTimeout(() => {
  this.SetprjprojectchangesTableddConfig();
  });

this.SetboremindermastersTableConfig();
  setTimeout(() => {
  this.SetboremindermastersTableddConfig();
  });

this.SetprjprojectteammembersTableConfig();
  setTimeout(() => {
  this.SetprjprojectteammembersTableddConfig();
  });

this.SetprjprojectverificationsTableConfig();
  setTimeout(() => {
  this.SetprjprojectverificationsTableddConfig();
  });

this.SetprjtimecardsTableConfig();
  setTimeout(() => {
  this.SetprjtimecardsTableddConfig();
  });

this.SetprjdocumentsTableConfig();
  setTimeout(() => {
  this.SetprjdocumentsTableddConfig();
  });

this.SetprjprojectbillingsTableConfig();
  setTimeout(() => {
  this.SetprjprojectbillingsTableddConfig();
  });

this.SetprjprojectobjectivesTableConfig();
  setTimeout(() => {
  this.SetprjprojectobjectivesTableddConfig();
  });

this.SetprjdailystandupsTableConfig();
  setTimeout(() => {
  this.SetprjdailystandupsTableddConfig();
  });

this.SetprjchangerequestsTableConfig();
  setTimeout(() => {
  this.SetprjchangerequestsTableddConfig();
  });

this.SetprjreleasesTableConfig();
  setTimeout(() => {
  this.SetprjreleasesTableddConfig();
  });

this.SetproprocessgapsTableConfig();
  setTimeout(() => {
  this.SetproprocessgapsTableddConfig();
  });

this.SetbousersTableConfig();
  setTimeout(() => {
  this.SetbousersTableddConfig();
  });

this.SetprjprojectoutputsTableConfig();
  setTimeout(() => {
  this.SetprjprojectoutputsTableddConfig();
  });

this.SetprjprojectrequirementsTableConfig();
  setTimeout(() => {
  this.SetprjprojectrequirementsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.prjprojectmasterservice.formData && this.prjprojectmasterservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.prjprojectmasterForm.patchValue({
    customerid: this.prjprojectmasterservice.formData.customerid,
    customeriddesc: this.prjprojectmasterservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.prjprojectmasterForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.projectmanagerList = res as bousermaster[];
if(this.prjprojectmasterservice.formData && this.prjprojectmasterservice.formData.projectmanager){
this.projectmanageroptionsEvent.emit(this.projectmanagerList);
this.prjprojectmasterForm.patchValue({
    projectmanager: this.prjprojectmasterservice.formData.projectmanager,
    projectmanagerdesc: this.prjprojectmasterservice.formData.projectmanagerdesc,
});
}
{
let arrprojectmanager = this.projectmanagerList.filter(v => v.userid == this.prjprojectmasterForm.get('projectmanager').value);
let objprojectmanager;
if (arrprojectmanager.length > 0) objprojectmanager = arrprojectmanager[0];
if (objprojectmanager)
{
}
}
}
).catch((err) => {console.log(err);});
this.projectmanager_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.projectmanagerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.projectmanager_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("projecttype").then(res => this.projecttypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("projectphase").then(res => this.projectphaseList = res as boconfigvalue[]);
this.configservice.getList("projectstatus").then(res => this.projectstatusList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);

//autocomplete
    this.prjprojectmasterservice.getprjprojectmastersList().then(res => {
      this.pkList = res as prjprojectmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.projectname;

//setting the flag that the screen is not touched 
this.prjprojectmasterForm.markAsUntouched();
this.prjprojectmasterForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.prjprojectmasterForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}

onSelectedprojectmanager(projectmanagerDetail: any) {
if (projectmanagerDetail.userid && projectmanagerDetail) {
this.prjprojectmasterForm.patchValue({
projectmanager: projectmanagerDetail.userid,
projectmanagerdesc: projectmanagerDetail.username,

});

}
}




  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.prjprojectmasterForm != null)
this.prjprojectmasterForm.reset();
this.prjprojectmasterForm.patchValue({
projectmanager: this.sessiondata.userid,
projectmanagerdesc: this.sessiondata.username,
});
setTimeout(() => {
this.prjprojectmasterservice.prjprojectdeliverables=[];
this.prjprojectdeliverablesLoadTable();
this.prjprojectmasterservice.prjexpenses=[];
this.prjexpensesLoadTable();
this.prjprojectmasterservice.prjprojecttasks=[];
this.prjprojecttasksLoadTable();
this.prjprojectmasterservice.bofacts=[];
this.bofactsLoadTable();
this.prjprojectmasterservice.prjprojectchanges=[];
this.prjprojectchangesLoadTable();
this.prjprojectmasterservice.boremindermasters=[];
this.boremindermastersLoadTable();
this.prjprojectmasterservice.prjprojectteammembers=[];
this.prjprojectteammembersLoadTable();
this.prjprojectmasterservice.prjprojectverifications=[];
this.prjprojectverificationsLoadTable();
this.prjprojectmasterservice.prjtimecards=[];
this.prjtimecardsLoadTable();
this.prjprojectmasterservice.prjdocuments=[];
this.prjdocumentsLoadTable();
this.prjprojectmasterservice.prjprojectbillings=[];
this.prjprojectbillingsLoadTable();
this.prjprojectmasterservice.prjprojectobjectives=[];
this.prjprojectobjectivesLoadTable();
this.prjprojectmasterservice.prjdailystandups=[];
this.prjdailystandupsLoadTable();
this.prjprojectmasterservice.prjchangerequests=[];
this.prjchangerequestsLoadTable();
this.prjprojectmasterservice.prjreleases=[];
this.prjreleasesLoadTable();
this.prjprojectmasterservice.proprocessgaps=[];
this.proprocessgapsLoadTable();
this.prjprojectmasterservice.bousers=[];
this.prjprojectmasterservice.Insertbousers=[];
this.bousersLoadTable();
this.prjprojectmasterservice.prjprojectoutputs=[];
this.prjprojectoutputsLoadTable();
this.prjprojectmasterservice.prjprojectrequirements=[];
this.prjprojectrequirementsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.prjprojectmasterForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let projectid = this.prjprojectmasterForm.get('projectid').value;
        if(projectid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectmasterservice.deleteprjprojectmaster(projectid).then(res =>
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
    this.prjprojectmasterForm.patchValue({
        projectid: null
    });
    if(this.prjprojectmasterservice.formData.projectid!=null)this.prjprojectmasterservice.formData.projectid=null;
for (let i=0;i<this.prjprojectmasterservice.prjprojectdeliverables.length;i++) {
this.prjprojectmasterservice.prjprojectdeliverables[i].deliverableid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjexpenses.length;i++) {
this.prjprojectmasterservice.prjexpenses[i].expenseid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojecttasks.length;i++) {
this.prjprojectmasterservice.prjprojecttasks[i].taskid=null;
}
for (let i=0;i<this.prjprojectmasterservice.bofacts.length;i++) {
this.prjprojectmasterservice.bofacts[i].factid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectchanges.length;i++) {
this.prjprojectmasterservice.prjprojectchanges[i].changeid=null;
}
for (let i=0;i<this.prjprojectmasterservice.boremindermasters.length;i++) {
this.prjprojectmasterservice.boremindermasters[i].remindermasterid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectteammembers.length;i++) {
this.prjprojectmasterservice.prjprojectteammembers[i].teammemberid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectverifications.length;i++) {
this.prjprojectmasterservice.prjprojectverifications[i].verificationid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjtimecards.length;i++) {
this.prjprojectmasterservice.prjtimecards[i].timecardid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjdocuments.length;i++) {
this.prjprojectmasterservice.prjdocuments[i].documentid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectbillings.length;i++) {
this.prjprojectmasterservice.prjprojectbillings[i].billid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectobjectives.length;i++) {
this.prjprojectmasterservice.prjprojectobjectives[i].objectiveid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjdailystandups.length;i++) {
this.prjprojectmasterservice.prjdailystandups[i].standupid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjchangerequests.length;i++) {
this.prjprojectmasterservice.prjchangerequests[i].changeid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjreleases.length;i++) {
this.prjprojectmasterservice.prjreleases[i].releaseid=null;
}
for (let i=0;i<this.prjprojectmasterservice.proprocessgaps.length;i++) {
this.prjprojectmasterservice.proprocessgaps[i].gapid=null;
}
for (let i=0;i<this.prjprojectmasterservice.bousers.length;i++) {
this.prjprojectmasterservice.bousers[i].sourceuserid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectoutputs.length;i++) {
this.prjprojectmasterservice.prjprojectoutputs[i].outputid=null;
}
for (let i=0;i<this.prjprojectmasterservice.prjprojectrequirements.length;i++) {
this.prjprojectmasterservice.prjprojectrequirements[i].requirementid=null;
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
        else if(key=="startdate")
this.prjprojectmasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.prjprojectmasterForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastupdateddate")
this.prjprojectmasterForm.patchValue({"lastupdateddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualstartdate")
this.prjprojectmasterForm.patchValue({"actualstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="projectedenddate")
this.prjprojectmasterForm.patchValue({"projectedenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completeddate")
this.prjprojectmasterForm.patchValue({"completeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="closeddate")
this.prjprojectmasterForm.patchValue({"closeddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastreviseddate")
this.prjprojectmasterForm.patchValue({"lastreviseddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.prjprojectmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectmasterForm.controls[key]!=undefined)
{
this.prjprojectmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("prjprojectmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.prjprojectmasterservice.formData.projectname!=null )
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
projectidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
projectcodeonChange(evt:any){
let e=evt.value;
}
projectnameonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
salesorderidonChange(evt:any){
let e=evt.value;
}
briefdescriptiononChange(evt:any){
let e=evt.value;
}
projectscopeonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
projectmanageronChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
progressrateonChange(evt:any){
let e=evt.value;
}
lastupdateddateonChange(evt:any){
let e=evt.value;
}
actualstartdateonChange(evt:any){
let e=evt.value;
}
projectedenddateonChange(evt:any){
let e=evt.value;
}
completeddateonChange(evt:any){
let e=evt.value;
}
closeddateonChange(evt:any){
let e=evt.value;
}
lastreviseddateonChange(evt:any){
let e=evt.value;
}
projecttypeonChange(evt:any){
let e=this.f.projecttype.value as any;
this.prjprojectmasterForm.patchValue({projecttypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.prjprojectmasterForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
projectphaseonChange(evt:any){
let e=this.f.projectphase.value as any;
this.prjprojectmasterForm.patchValue({projectphasedesc:evt.options[evt.options.selectedIndex].text});
}
projectstatusonChange(evt:any){
let e=this.f.projectstatus.value as any;
this.prjprojectmasterForm.patchValue({projectstatusdesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.prjprojectmasterForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
totalbudgetamountonChange(evt:any){
let e=evt.value;
}
feedbacktagsonChange(evt:any){
let e=evt.value;
}
budgetmaterialcostonChange(evt:any){
let e=evt.value;
}
budgetlabourcostonChange(evt:any){
let e=evt.value;
}
actualmaterialcostonChange(evt:any){
let e=evt.value;
}
actuallabourcostonChange(evt:any){
let e=evt.value;
}
materialbudgetremainingonChange(evt:any){
let e=evt.value;
}
totalbudgetremainingonChange(evt:any){
let e=evt.value;
}
totalhoursestimatedonChange(evt:any){
let e=evt.value;
}
totalactualhoursonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
costcenteridonChange(evt:any){
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
  


editprjprojectmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectmasterservice.getprjprojectmastersByEID(pkcol).then(res => {

this.prjprojectmasterservice.formData=res.prjprojectmaster;
let formproperty=res.prjprojectmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectmaster.pkcol;
this.formid=res.prjprojectmaster.projectid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectmaster.projectid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectmasterForm.patchValue({
projectid: res.prjprojectmaster.projectid,
sourcefield: res.prjprojectmaster.sourcefield,
sourcereference: res.prjprojectmaster.sourcereference,
projectcode: res.prjprojectmaster.projectcode,
projectname: res.prjprojectmaster.projectname,
departmentid: res.prjprojectmaster.departmentid,
customerid: res.prjprojectmaster.customerid,
customeriddesc: res.prjprojectmaster.customeriddesc,
salesorderid: res.prjprojectmaster.salesorderid,
briefdescription: res.prjprojectmaster.briefdescription,
projectscope: res.prjprojectmaster.projectscope,
thumbnail: JSON.parse(res.prjprojectmaster.thumbnail),
projectmanager: res.prjprojectmaster.projectmanager,
projectmanagerdesc: res.prjprojectmaster.projectmanagerdesc,
startdate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.startdate),
enddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.enddate),
progressrate: res.prjprojectmaster.progressrate,
lastupdateddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.lastupdateddate),
actualstartdate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.actualstartdate),
projectedenddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.projectedenddate),
completeddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.completeddate),
closeddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.closeddate),
lastreviseddate: this.ngbDateParserFormatter.parse(res.prjprojectmaster.lastreviseddate),
projecttype: res.prjprojectmaster.projecttype,
projecttypedesc: res.prjprojectmaster.projecttypedesc,
priority: res.prjprojectmaster.priority,
prioritydesc: res.prjprojectmaster.prioritydesc,
projectphase: res.prjprojectmaster.projectphase,
projectphasedesc: res.prjprojectmaster.projectphasedesc,
projectstatus: res.prjprojectmaster.projectstatus,
projectstatusdesc: res.prjprojectmaster.projectstatusdesc,
currency: res.prjprojectmaster.currency,
currencydesc: res.prjprojectmaster.currencydesc,
totalbudgetamount: res.prjprojectmaster.totalbudgetamount,
feedbacktags: res.prjprojectmaster.feedbacktags,
budgetmaterialcost: res.prjprojectmaster.budgetmaterialcost,
budgetlabourcost: res.prjprojectmaster.budgetlabourcost,
actualmaterialcost: res.prjprojectmaster.actualmaterialcost,
actuallabourcost: res.prjprojectmaster.actuallabourcost,
materialbudgetremaining: res.prjprojectmaster.materialbudgetremaining,
totalbudgetremaining: res.prjprojectmaster.totalbudgetremaining,
totalhoursestimated: res.prjprojectmaster.totalhoursestimated,
totalactualhours: res.prjprojectmaster.totalactualhours,
notes: res.prjprojectmaster.notes,
costcenterid: res.prjprojectmaster.costcenterid,
customfield: res.prjprojectmaster.customfield,
attachment: JSON.parse(res.prjprojectmaster.attachment),
status: res.prjprojectmaster.status,
statusdesc: res.prjprojectmaster.statusdesc,
});
this.prjprojectdeliverablesvisiblelist=res.prjprojectdeliverablesvisiblelist;
this.prjexpensesvisiblelist=res.prjexpensesvisiblelist;
this.prjprojecttasksvisiblelist=res.prjprojecttasksvisiblelist;
this.bofactsvisiblelist=res.bofactsvisiblelist;
this.prjprojectchangesvisiblelist=res.prjprojectchangesvisiblelist;
this.boremindermastersvisiblelist=res.boremindermastersvisiblelist;
this.prjprojectteammembersvisiblelist=res.prjprojectteammembersvisiblelist;
this.prjprojectverificationsvisiblelist=res.prjprojectverificationsvisiblelist;
this.prjtimecardsvisiblelist=res.prjtimecardsvisiblelist;
this.prjdocumentsvisiblelist=res.prjdocumentsvisiblelist;
this.prjprojectbillingsvisiblelist=res.prjprojectbillingsvisiblelist;
this.prjprojectobjectivesvisiblelist=res.prjprojectobjectivesvisiblelist;
this.prjdailystandupsvisiblelist=res.prjdailystandupsvisiblelist;
this.prjchangerequestsvisiblelist=res.prjchangerequestsvisiblelist;
this.prjreleasesvisiblelist=res.prjreleasesvisiblelist;
this.proprocessgapsvisiblelist=res.proprocessgapsvisiblelist;
this.bousersvisiblelist=res.bousersvisiblelist;
this.prjprojectoutputsvisiblelist=res.prjprojectoutputsvisiblelist;
this.prjprojectrequirementsvisiblelist=res.prjprojectrequirementsvisiblelist;
if(this.prjprojectmasterForm.get('customfield').value!=null && this.prjprojectmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.prjprojectmasterForm.get('customfield').value);
this.FillCustomField();
if(this.prjprojectmasterForm.get('thumbnail').value!=null && this.prjprojectmasterForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.prjprojectmasterForm.get('thumbnail').value);
if(this.prjprojectmasterForm.get('attachment').value!=null && this.prjprojectmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.prjprojectmasterForm.get('attachment').value);
//Child Tables if any
this.prjprojectmasterservice.prjprojectdeliverables = res.prjprojectdeliverables;
this.SetprjprojectdeliverablesTableConfig();
this.prjprojectdeliverablesLoadTable();
  setTimeout(() => {
  this.SetprjprojectdeliverablesTableddConfig();
  });
this.prjprojectmasterservice.prjexpenses = res.prjexpenses;
this.SetprjexpensesTableConfig();
this.prjexpensesLoadTable();
  setTimeout(() => {
  this.SetprjexpensesTableddConfig();
  });
this.prjprojectmasterservice.prjprojecttasks = res.prjprojecttasks;
this.SetprjprojecttasksTableConfig();
this.prjprojecttasksLoadTable();
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });
this.prjprojectmasterservice.bofacts = res.bofacts;
this.SetbofactsTableConfig();
this.bofactsLoadTable();
  setTimeout(() => {
  this.SetbofactsTableddConfig();
  });
this.prjprojectmasterservice.prjprojectchanges = res.prjprojectchanges;
this.SetprjprojectchangesTableConfig();
this.prjprojectchangesLoadTable();
  setTimeout(() => {
  this.SetprjprojectchangesTableddConfig();
  });
this.prjprojectmasterservice.boremindermasters = res.boremindermasters;
this.SetboremindermastersTableConfig();
this.boremindermastersLoadTable();
  setTimeout(() => {
  this.SetboremindermastersTableddConfig();
  });
this.prjprojectmasterservice.prjprojectteammembers = res.prjprojectteammembers;
this.SetprjprojectteammembersTableConfig();
this.prjprojectteammembersLoadTable();
  setTimeout(() => {
  this.SetprjprojectteammembersTableddConfig();
  });
this.prjprojectmasterservice.prjprojectverifications = res.prjprojectverifications;
this.SetprjprojectverificationsTableConfig();
this.prjprojectverificationsLoadTable();
  setTimeout(() => {
  this.SetprjprojectverificationsTableddConfig();
  });
this.prjprojectmasterservice.prjtimecards = res.prjtimecards;
this.SetprjtimecardsTableConfig();
this.prjtimecardsLoadTable();
  setTimeout(() => {
  this.SetprjtimecardsTableddConfig();
  });
this.prjprojectmasterservice.prjdocuments = res.prjdocuments;
this.SetprjdocumentsTableConfig();
this.prjdocumentsLoadTable();
  setTimeout(() => {
  this.SetprjdocumentsTableddConfig();
  });
this.prjprojectmasterservice.prjprojectbillings = res.prjprojectbillings;
this.SetprjprojectbillingsTableConfig();
this.prjprojectbillingsLoadTable();
  setTimeout(() => {
  this.SetprjprojectbillingsTableddConfig();
  });
this.prjprojectmasterservice.prjprojectobjectives = res.prjprojectobjectives;
this.SetprjprojectobjectivesTableConfig();
this.prjprojectobjectivesLoadTable();
  setTimeout(() => {
  this.SetprjprojectobjectivesTableddConfig();
  });
this.prjprojectmasterservice.prjdailystandups = res.prjdailystandups;
this.SetprjdailystandupsTableConfig();
this.prjdailystandupsLoadTable();
  setTimeout(() => {
  this.SetprjdailystandupsTableddConfig();
  });
this.prjprojectmasterservice.prjchangerequests = res.prjchangerequests;
this.SetprjchangerequestsTableConfig();
this.prjchangerequestsLoadTable();
  setTimeout(() => {
  this.SetprjchangerequestsTableddConfig();
  });
this.prjprojectmasterservice.prjreleases = res.prjreleases;
this.SetprjreleasesTableConfig();
this.prjreleasesLoadTable();
  setTimeout(() => {
  this.SetprjreleasesTableddConfig();
  });
this.prjprojectmasterservice.proprocessgaps = res.proprocessgaps;
this.SetproprocessgapsTableConfig();
this.proprocessgapsLoadTable();
  setTimeout(() => {
  this.SetproprocessgapsTableddConfig();
  });
this.prjprojectmasterservice.bousers = res.bousers;
this.SetbousersTableConfig();
this.bousersLoadTable();
  setTimeout(() => {
  this.SetbousersTableddConfig();
  });
this.prjprojectmasterservice.Insertbousers=[];
this.prjprojectmasterservice.prjprojectoutputs = res.prjprojectoutputs;
this.SetprjprojectoutputsTableConfig();
this.prjprojectoutputsLoadTable();
  setTimeout(() => {
  this.SetprjprojectoutputsTableddConfig();
  });
this.prjprojectmasterservice.prjprojectrequirements = res.prjprojectrequirements;
this.SetprjprojectrequirementsTableConfig();
this.prjprojectrequirementsLoadTable();
  setTimeout(() => {
  this.SetprjprojectrequirementsTableddConfig();
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
  for (let key in this.prjprojectmasterForm.controls) {
    if (this.prjprojectmasterForm.controls[key] != null) {
if( key=="thumbnail")
{
if(this.prjprojectmasterservice.formData!=null && this.prjprojectmasterservice.formData[key]!=null  && this.prjprojectmasterservice.formData[key]!='[]' && this.prjprojectmasterservice.formData[key]!=undefined && this.prjprojectmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectmasterservice.formData!=null && this.prjprojectmasterservice.formData[key]!=null   && this.prjprojectmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectmasterservice.formData!=null && this.prjprojectmasterservice.formData[key]!=null   && this.prjprojectmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectmasterservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.prjprojectmasterForm.value;
obj.startdate=new Date(this.prjprojectmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.prjprojectmasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('enddate').value)+'  UTC' :null);
obj.lastupdateddate=new Date(this.prjprojectmasterForm.get('lastupdateddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('lastupdateddate').value)+'  UTC' :null);
obj.actualstartdate=new Date(this.prjprojectmasterForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('actualstartdate').value)+'  UTC' :null);
obj.projectedenddate=new Date(this.prjprojectmasterForm.get('projectedenddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('projectedenddate').value)+'  UTC' :null);
obj.completeddate=new Date(this.prjprojectmasterForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('completeddate').value)+'  UTC' :null);
obj.closeddate=new Date(this.prjprojectmasterForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('closeddate').value)+'  UTC' :null);
obj.lastreviseddate=new Date(this.prjprojectmasterForm.get('lastreviseddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('lastreviseddate').value)+'  UTC' :null);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.thumbnail.getattachmentlist()!=null)obj.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.thumbnail.getAllFiles());
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

private prjprojectmastertoggleOption(){
this.prjprojectmastershowOption = this.prjprojectmastershowOption === true ? false : true;
}

private prjprojectdeliverabletoggleOption(){
this.prjprojectdeliverableshowOption = this.prjprojectdeliverableshowOption === true ? false : true;
}

private prjexpensetoggleOption(){
this.prjexpenseshowOption = this.prjexpenseshowOption === true ? false : true;
}

private prjprojecttasktoggleOption(){
this.prjprojecttaskshowOption = this.prjprojecttaskshowOption === true ? false : true;
}

private bofacttoggleOption(){
this.bofactshowOption = this.bofactshowOption === true ? false : true;
}

private prjprojectchangetoggleOption(){
this.prjprojectchangeshowOption = this.prjprojectchangeshowOption === true ? false : true;
}

private boremindermastertoggleOption(){
this.boremindermastershowOption = this.boremindermastershowOption === true ? false : true;
}

private prjprojectteammembertoggleOption(){
this.prjprojectteammembershowOption = this.prjprojectteammembershowOption === true ? false : true;
}

private prjprojectverificationtoggleOption(){
this.prjprojectverificationshowOption = this.prjprojectverificationshowOption === true ? false : true;
}

private prjtimecardtoggleOption(){
this.prjtimecardshowOption = this.prjtimecardshowOption === true ? false : true;
}

private prjdocumenttoggleOption(){
this.prjdocumentshowOption = this.prjdocumentshowOption === true ? false : true;
}

private prjprojectbillingtoggleOption(){
this.prjprojectbillingshowOption = this.prjprojectbillingshowOption === true ? false : true;
}

private prjprojectobjectivetoggleOption(){
this.prjprojectobjectiveshowOption = this.prjprojectobjectiveshowOption === true ? false : true;
}

private prjdailystanduptoggleOption(){
this.prjdailystandupshowOption = this.prjdailystandupshowOption === true ? false : true;
}

private prjchangerequesttoggleOption(){
this.prjchangerequestshowOption = this.prjchangerequestshowOption === true ? false : true;
}

private prjreleasetoggleOption(){
this.prjreleaseshowOption = this.prjreleaseshowOption === true ? false : true;
}

private proprocessgaptoggleOption(){
this.proprocessgapshowOption = this.proprocessgapshowOption === true ? false : true;
}

private bousertoggleOption(){
this.bousershowOption = this.bousershowOption === true ? false : true;
}

private prjprojectoutputtoggleOption(){
this.prjprojectoutputshowOption = this.prjprojectoutputshowOption === true ? false : true;
}

private prjprojectrequirementtoggleOption(){
this.prjprojectrequirementshowOption = this.prjprojectrequirementshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectmasterservice.formData=this.prjprojectmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectmasterForm.controls[key] != null)
    {
        this.prjprojectmasterservice.formData[key] = this.prjprojectmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.prjprojectmasterservice.formData.thumbnail=this.prjprojectmasterForm.get('thumbnail').value;
this.prjprojectmasterservice.formData.startdate=new Date(this.prjprojectmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('startdate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.enddate=new Date(this.prjprojectmasterForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('enddate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.lastupdateddate=new Date(this.prjprojectmasterForm.get('lastupdateddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('lastupdateddate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.actualstartdate=new Date(this.prjprojectmasterForm.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('actualstartdate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.projectedenddate=new Date(this.prjprojectmasterForm.get('projectedenddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('projectedenddate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.completeddate=new Date(this.prjprojectmasterForm.get('completeddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('completeddate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.closeddate=new Date(this.prjprojectmasterForm.get('closeddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('closeddate').value)+'  UTC' :null);
this.prjprojectmasterservice.formData.lastreviseddate=new Date(this.prjprojectmasterForm.get('lastreviseddate').value ? this.ngbDateParserFormatter.format(this.prjprojectmasterForm.get('lastreviseddate').value)+'  UTC' :null);
if(customfields!=null)this.prjprojectmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.prjprojectmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.prjprojectmasterservice.formData.DeletedprjprojectdeliverableIDs = this.DeletedprjprojectdeliverableIDs;
this.prjprojectmasterservice.formData.DeletedprjexpenseIDs = this.DeletedprjexpenseIDs;
this.prjprojectmasterservice.formData.DeletedprjprojecttaskIDs = this.DeletedprjprojecttaskIDs;
this.prjprojectmasterservice.formData.DeletedbofactIDs = this.DeletedbofactIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectchangeIDs = this.DeletedprjprojectchangeIDs;
this.prjprojectmasterservice.formData.DeletedboremindermasterIDs = this.DeletedboremindermasterIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectteammemberIDs = this.DeletedprjprojectteammemberIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectverificationIDs = this.DeletedprjprojectverificationIDs;
this.prjprojectmasterservice.formData.DeletedprjtimecardIDs = this.DeletedprjtimecardIDs;
this.prjprojectmasterservice.formData.DeletedprjdocumentIDs = this.DeletedprjdocumentIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectbillingIDs = this.DeletedprjprojectbillingIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectobjectiveIDs = this.DeletedprjprojectobjectiveIDs;
this.prjprojectmasterservice.formData.DeletedprjdailystandupIDs = this.DeletedprjdailystandupIDs;
this.prjprojectmasterservice.formData.DeletedprjchangerequestIDs = this.DeletedprjchangerequestIDs;
this.prjprojectmasterservice.formData.DeletedprjreleaseIDs = this.DeletedprjreleaseIDs;
this.prjprojectmasterservice.formData.DeletedproprocessgapIDs = this.DeletedproprocessgapIDs;
this.prjprojectmasterservice.formData.DeletedbouserIDs = this.DeletedbouserIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectoutputIDs = this.DeletedprjprojectoutputIDs;
this.prjprojectmasterservice.formData.DeletedprjprojectrequirementIDs = this.DeletedprjprojectrequirementIDs;
if(this.thumbnail.getattachmentlist()!=null)this.prjprojectmasterservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.prjprojectmasterservice.formData);
this.prjprojectmasterservice.formData=this.prjprojectmasterForm.value;
this.prjprojectmasterservice.saveOrUpdateprjprojectmasters().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.prjprojectdeliverablessource.data)
{
    for (let i = 0; i < this.prjprojectdeliverablessource.data.length; i++)
    {
        if (this.prjprojectdeliverablessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectdeliverablessource.data[i].fileattachmentlist);
    }
}
if (this.prjexpensessource.data)
{
    for (let i = 0; i < this.prjexpensessource.data.length; i++)
    {
        if (this.prjexpensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjexpensessource.data[i].fileattachmentlist);
    }
}
if (this.prjprojecttaskssource.data)
{
    for (let i = 0; i < this.prjprojecttaskssource.data.length; i++)
    {
        if (this.prjprojecttaskssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojecttaskssource.data[i].fileattachmentlist);
    }
}
if (this.bofactssource.data)
{
    for (let i = 0; i < this.bofactssource.data.length; i++)
    {
        if (this.bofactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bofactssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectchangessource.data)
{
    for (let i = 0; i < this.prjprojectchangessource.data.length; i++)
    {
        if (this.prjprojectchangessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectchangessource.data[i].fileattachmentlist);
    }
}
if (this.boremindermasterssource.data)
{
    for (let i = 0; i < this.boremindermasterssource.data.length; i++)
    {
        if (this.boremindermasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boremindermasterssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectteammemberssource.data)
{
    for (let i = 0; i < this.prjprojectteammemberssource.data.length; i++)
    {
        if (this.prjprojectteammemberssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectteammemberssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectverificationssource.data)
{
    for (let i = 0; i < this.prjprojectverificationssource.data.length; i++)
    {
        if (this.prjprojectverificationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectverificationssource.data[i].fileattachmentlist);
    }
}
if (this.prjtimecardssource.data)
{
    for (let i = 0; i < this.prjtimecardssource.data.length; i++)
    {
        if (this.prjtimecardssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjtimecardssource.data[i].fileattachmentlist);
    }
}
if (this.prjdocumentssource.data)
{
    for (let i = 0; i < this.prjdocumentssource.data.length; i++)
    {
        if (this.prjdocumentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjdocumentssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectbillingssource.data)
{
    for (let i = 0; i < this.prjprojectbillingssource.data.length; i++)
    {
        if (this.prjprojectbillingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectbillingssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectobjectivessource.data)
{
    for (let i = 0; i < this.prjprojectobjectivessource.data.length; i++)
    {
        if (this.prjprojectobjectivessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectobjectivessource.data[i].fileattachmentlist);
    }
}
if (this.prjdailystandupssource.data)
{
    for (let i = 0; i < this.prjdailystandupssource.data.length; i++)
    {
        if (this.prjdailystandupssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjdailystandupssource.data[i].fileattachmentlist);
    }
}
if (this.prjchangerequestssource.data)
{
    for (let i = 0; i < this.prjchangerequestssource.data.length; i++)
    {
        if (this.prjchangerequestssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjchangerequestssource.data[i].fileattachmentlist);
    }
}
if (this.prjreleasessource.data)
{
    for (let i = 0; i < this.prjreleasessource.data.length; i++)
    {
        if (this.prjreleasessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjreleasessource.data[i].fileattachmentlist);
    }
}
if (this.proprocessgapssource.data)
{
    for (let i = 0; i < this.proprocessgapssource.data.length; i++)
    {
        if (this.proprocessgapssource.data[i].fileattachmentlist)await this.sharedService.upload(this.proprocessgapssource.data[i].fileattachmentlist);
    }
}
if (this.bouserssource.data)
{
    for (let i = 0; i < this.bouserssource.data.length; i++)
    {
        if (this.bouserssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bouserssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectoutputssource.data)
{
    for (let i = 0; i < this.prjprojectoutputssource.data.length; i++)
    {
        if (this.prjprojectoutputssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectoutputssource.data[i].fileattachmentlist);
    }
}
if (this.prjprojectrequirementssource.data)
{
    for (let i = 0; i < this.prjprojectrequirementssource.data.length; i++)
    {
        if (this.prjprojectrequirementssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjprojectrequirementssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectmaster);
}
else
{
this.FillData(res);
}
}
this.prjprojectmasterForm.markAsUntouched();
this.prjprojectmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.prjprojectmasterForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprojectmanager( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectmasterForm.get('projectmanager').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditprjprojectdeliverable(event:any,deliverableid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectdeliverableComponent, 
{
data:  {  showview:false,save:false,event,deliverableid, projectid,visiblelist:this.prjprojectdeliverablesvisiblelist,  hidelist:this.prjprojectdeliverableshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectdeliverablessource.add(res);
this.prjprojectdeliverablessource.refresh();
}
else
{
this.prjprojectdeliverablessource.update(event.data, res);
}
}
});
}

onDeleteprjprojectdeliverable(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectdeliverableIDs += childID + ",";
this.prjprojectmasterservice.prjprojectdeliverables.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjexpense(event:any,expenseid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjexpenseComponent, 
{
data:  {  showview:false,save:false,event,expenseid, projectid,visiblelist:this.prjexpensesvisiblelist,  hidelist:this.prjexpenseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjexpensessource.add(res);
this.prjexpensessource.refresh();
}
else
{
this.prjexpensessource.update(event.data, res);
}
}
});
}

onDeleteprjexpense(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjexpenseIDs += childID + ",";
this.prjprojectmasterservice.prjexpenses.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojecttask(event:any,taskid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojecttaskComponent, 
{
data:  {  showview:false,save:false,event,taskid, projectid,visiblelist:this.prjprojecttasksvisiblelist,  hidelist:this.prjprojecttaskshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojecttaskssource.add(res);
this.prjprojecttaskssource.refresh();
}
else
{
this.prjprojecttaskssource.update(event.data, res);
}
}
});
}

onDeleteprjprojecttask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojecttaskIDs += childID + ",";
this.prjprojectmasterservice.prjprojecttasks.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditbofact(event:any,factid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bofactComponent, 
{
data:  {  showview:false,save:false,event,factid, projectid,visiblelist:this.bofactsvisiblelist,  hidelist:this.bofactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bofactssource.add(res);
this.bofactssource.refresh();
}
else
{
this.bofactssource.update(event.data, res);
}
}
});
}

onDeletebofact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbofactIDs += childID + ",";
this.prjprojectmasterservice.bofacts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectchange(event:any,changeid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectchangeComponent, 
{
data:  {  showview:false,save:false,event,changeid, projectid,visiblelist:this.prjprojectchangesvisiblelist,  hidelist:this.prjprojectchangeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectchangessource.add(res);
this.prjprojectchangessource.refresh();
}
else
{
this.prjprojectchangessource.update(event.data, res);
}
}
});
}

onDeleteprjprojectchange(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectchangeIDs += childID + ",";
this.prjprojectmasterservice.prjprojectchanges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboremindermaster(event:any,remindermasterid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boremindermasterComponent, 
{
data:  {  showview:false,save:false,event,remindermasterid, projectid,visiblelist:this.boremindermastersvisiblelist,  hidelist:this.boremindermastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boremindermasterssource.add(res);
this.boremindermasterssource.refresh();
}
else
{
this.boremindermasterssource.update(event.data, res);
}
}
});
}

onDeleteboremindermaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboremindermasterIDs += childID + ",";
this.prjprojectmasterservice.boremindermasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectteammember(event:any,teammemberid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectteammemberComponent, 
{
data:  {  showview:false,save:false,event,teammemberid, projectid,visiblelist:this.prjprojectteammembersvisiblelist,  hidelist:this.prjprojectteammembershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectteammemberssource.add(res);
this.prjprojectteammemberssource.refresh();
}
else
{
this.prjprojectteammemberssource.update(event.data, res);
}
}
});
}

onDeleteprjprojectteammember(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectteammemberIDs += childID + ",";
this.prjprojectmasterservice.prjprojectteammembers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectverification(event:any,verificationid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectverificationComponent, 
{
data:  {  showview:false,save:false,event,verificationid, projectid,visiblelist:this.prjprojectverificationsvisiblelist,  hidelist:this.prjprojectverificationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectverificationssource.add(res);
this.prjprojectverificationssource.refresh();
}
else
{
this.prjprojectverificationssource.update(event.data, res);
}
}
});
}

onDeleteprjprojectverification(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectverificationIDs += childID + ",";
this.prjprojectmasterservice.prjprojectverifications.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjtimecard(event:any,timecardid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjtimecardComponent, 
{
data:  {  showview:false,save:false,event,timecardid, projectid,visiblelist:this.prjtimecardsvisiblelist,  hidelist:this.prjtimecardshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjtimecardssource.add(res);
this.prjtimecardssource.refresh();
}
else
{
this.prjtimecardssource.update(event.data, res);
}
}
});
}

onDeleteprjtimecard(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjtimecardIDs += childID + ",";
this.prjprojectmasterservice.prjtimecards.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjdocument(event:any,documentid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjdocumentComponent, 
{
data:  {  showview:false,save:false,event,documentid, projectid,visiblelist:this.prjdocumentsvisiblelist,  hidelist:this.prjdocumentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjdocumentssource.add(res);
this.prjdocumentssource.refresh();
}
else
{
this.prjdocumentssource.update(event.data, res);
}
}
});
}

onDeleteprjdocument(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjdocumentIDs += childID + ",";
this.prjprojectmasterservice.prjdocuments.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectbilling(event:any,billid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectbillingComponent, 
{
data:  {  showview:false,save:false,event,billid, projectid,visiblelist:this.prjprojectbillingsvisiblelist,  hidelist:this.prjprojectbillingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectbillingssource.add(res);
this.prjprojectbillingssource.refresh();
}
else
{
this.prjprojectbillingssource.update(event.data, res);
}
}
});
}

onDeleteprjprojectbilling(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectbillingIDs += childID + ",";
this.prjprojectmasterservice.prjprojectbillings.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectobjective(event:any,objectiveid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectobjectiveComponent, 
{
data:  {  showview:false,save:false,event,objectiveid, projectid,visiblelist:this.prjprojectobjectivesvisiblelist,  hidelist:this.prjprojectobjectiveshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectobjectivessource.add(res);
this.prjprojectobjectivessource.refresh();
}
else
{
this.prjprojectobjectivessource.update(event.data, res);
}
}
});
}

onDeleteprjprojectobjective(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectobjectiveIDs += childID + ",";
this.prjprojectmasterservice.prjprojectobjectives.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjdailystandup(event:any,standupid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjdailystandupComponent, 
{
data:  {  showview:false,save:false,event,standupid, projectid,visiblelist:this.prjdailystandupsvisiblelist,  hidelist:this.prjdailystandupshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjdailystandupssource.add(res);
this.prjdailystandupssource.refresh();
}
else
{
this.prjdailystandupssource.update(event.data, res);
}
}
});
}

onDeleteprjdailystandup(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjdailystandupIDs += childID + ",";
this.prjprojectmasterservice.prjdailystandups.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjchangerequest(event:any,changeid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjchangerequestComponent, 
{
data:  {  showview:false,save:false,event,changeid, projectid,visiblelist:this.prjchangerequestsvisiblelist,  hidelist:this.prjchangerequestshidelist,ScreenType:2,priority:this.prjprojectmasterForm.get('priority').value,prioritydesc:this.prjprojectmasterForm.get('prioritydesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjchangerequestssource.add(res);
this.prjchangerequestssource.refresh();
}
else
{
this.prjchangerequestssource.update(event.data, res);
}
}
});
}

onDeleteprjchangerequest(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjchangerequestIDs += childID + ",";
this.prjprojectmasterservice.prjchangerequests.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjrelease(event:any,releaseid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjreleaseComponent, 
{
data:  {  showview:false,save:false,event,releaseid, projectid,visiblelist:this.prjreleasesvisiblelist,  hidelist:this.prjreleaseshidelist,ScreenType:2,priority:this.prjprojectmasterForm.get('priority').value,prioritydesc:this.prjprojectmasterForm.get('prioritydesc').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjreleasessource.add(res);
this.prjreleasessource.refresh();
}
else
{
this.prjreleasessource.update(event.data, res);
}
}
});
}

onDeleteprjrelease(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjreleaseIDs += childID + ",";
this.prjprojectmasterservice.prjreleases.splice(i, 1);
//this.updateGrandTotal();
}

onDeleteproprocessgap(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedproprocessgapIDs += childID + ",";
this.prjprojectmasterservice.proprocessgaps.splice(i, 1);
}

AddOrEditprjprojectoutput(event:any,outputid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectoutputComponent, 
{
data:  {  showview:false,save:false,event,outputid, projectid,visiblelist:this.prjprojectoutputsvisiblelist,  hidelist:this.prjprojectoutputshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectoutputssource.add(res);
this.prjprojectoutputssource.refresh();
}
else
{
this.prjprojectoutputssource.update(event.data, res);
}
}
});
}

onDeleteprjprojectoutput(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectoutputIDs += childID + ",";
this.prjprojectmasterservice.prjprojectoutputs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditprjprojectrequirement(event:any,requirementid:any, projectid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(prjprojectrequirementComponent, 
{
data:  {  showview:false,save:false,event,requirementid, projectid,visiblelist:this.prjprojectrequirementsvisiblelist,  hidelist:this.prjprojectrequirementshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.prjprojectrequirementssource.add(res);
this.prjprojectrequirementssource.refresh();
}
else
{
this.prjprojectrequirementssource.update(event.data, res);
}
}
});
}

onDeleteprjprojectrequirement(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjprojectrequirementIDs += childID + ",";
this.prjprojectmasterservice.prjprojectrequirements.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes prjprojectdeliverables
prjprojectdeliverablessettings:any;
prjprojectdeliverablessource: any;

showprjprojectdeliverablesCheckbox()
{
debugger;
if(this.tblprjprojectdeliverablessource.settings['selectMode']== 'multi')this.tblprjprojectdeliverablessource.settings['selectMode']= 'single';
else
this.tblprjprojectdeliverablessource.settings['selectMode']= 'multi';
this.tblprjprojectdeliverablessource.initGrid();
}
deleteprjprojectdeliverablesAll()
{
this.tblprjprojectdeliverablessource.settings['selectMode'] = 'single';
}
showprjprojectdeliverablesFilter()
{
  setTimeout(() => {
  this.SetprjprojectdeliverablesTableddConfig();
  });
      if(this.tblprjprojectdeliverablessource.settings!=null)this.tblprjprojectdeliverablessource.settings['hideSubHeader'] =!this.tblprjprojectdeliverablessource.settings['hideSubHeader'];
this.tblprjprojectdeliverablessource.initGrid();
}
showprjprojectdeliverablesInActive()
{
}
enableprjprojectdeliverablesInActive()
{
}
async SetprjprojectdeliverablesTableddConfig()
{
if(!this.bfilterPopulateprjprojectdeliverables){
}
this.bfilterPopulateprjprojectdeliverables=true;
}
async prjprojectdeliverablesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectdeliverablesTableConfig()
{
this.prjprojectdeliverablessettings = {
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
deliverablename: {
title: 'Deliverable Name',
type: '',
filter:true,
},
targetshare: {
title: 'Target Share',
type: 'number',
filter:true,
},
targetdate: {
title: 'Target Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
sequence: {
title: 'Sequence',
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
draft: {
title: 'Draft',
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
},
};
}
prjprojectdeliverablesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectdeliverablesID)>=0)
{
this.prjprojectdeliverablessource=new LocalDataSource();
this.prjprojectdeliverablessource.load(this.prjprojectmasterservice.prjprojectdeliverables as  any as LocalDataSource);
this.prjprojectdeliverablessource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectdeliverablesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectdeliverables.length == 0)
{
    this.tblprjprojectdeliverablessource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectdeliverable();
    this.prjprojectmasterservice.prjprojectdeliverables.push(obj);
    this.prjprojectdeliverablessource.refresh();
    if ((this.prjprojectmasterservice.prjprojectdeliverables.length / this.prjprojectdeliverablessource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectdeliverablessource.getPaging().page)
    {
        this.prjprojectdeliverablessource.setPage((this.prjprojectmasterservice.prjprojectdeliverables.length / this.prjprojectdeliverablessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectdeliverablessource.grid.edit(this.tblprjprojectdeliverablessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectdeliverablessource.data.indexOf(event.data);
this.onDeleteprjprojectdeliverable(event,event.data.deliverableid,((this.prjprojectdeliverablessource.getPaging().page-1) *this.prjprojectdeliverablessource.getPaging().perPage)+index);
this.prjprojectdeliverablessource.refresh();
break;
}
}

*/
prjprojectdeliverablesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectdeliverable(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectdeliverable(event,event.data.deliverableid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectdeliverable(event,event.data.deliverableid,((this.prjprojectdeliverablessource.getPaging().page-1) *this.prjprojectdeliverablessource.getPaging().perPage)+event.index);
this.prjprojectdeliverablessource.refresh();
break;
}
}
prjprojectdeliverablesonDelete(obj) {
let deliverableid=obj.data.deliverableid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(deliverableid).then(res=>
this.prjprojectdeliverablesLoadTable()
);
}
}
prjprojectdeliverablesPaging(val)
{
debugger;
this.prjprojectdeliverablessource.setPaging(1, val, true);
}

handleprjprojectdeliverablesGridSelected(event:any) {
this.prjprojectdeliverablesselectedindex=this.prjprojectmasterservice.prjprojectdeliverables.findIndex(i => i.deliverableid === event.data.deliverableid);
}

  async prjprojectdeliverablesmoveUp() {
    this.prjprojectdeliverablesmove(-1);
  }

  async prjprojectdeliverablesmove(val) {
    let index=((this.prjprojectdeliverablessource.getPaging().page - 1) * this.prjprojectdeliverablessource.getPaging().perPage) + this.prjprojectdeliverablesselectedindex;
    if (index >= 0) {
      
      var current = this.prjprojectmasterservice.prjprojectdeliverables[index];
      var tmp = this.prjprojectmasterservice.prjprojectdeliverables[index +val];
      this.prjprojectmasterservice.prjprojectdeliverables[index +val] = this.prjprojectmasterservice.prjprojectdeliverables[index];
      this.prjprojectmasterservice.prjprojectdeliverables[index] = tmp;
      this.prjprojectmasterservice.prjprojectdeliverables[index +val].sequence=index +val;
      this.prjprojectmasterservice.prjprojectdeliverables[index].sequence=index;
      this.prjprojectdeliverablessource.refresh();
      this.prjprojectdeliverablesselectedindex=this.prjprojectmasterservice.prjprojectdeliverables.findIndex(i => i.deliverableid === current.deliverableid);
      this.tblprjprojectdeliverablessource.grid.getRows().forEach((row:any) => {
        if( current.deliverableid == row.data.deliverableid) {
          this.tblprjprojectdeliverablessource.grid.selectRow(row);
          
        }
      });
    }
  }

  prjprojectdeliverablesmoveDown() {
    return this.prjprojectdeliverablesmove(1);
  }
IsprjprojectdeliverablesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectdeliverablesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectdeliverables
//start of Grid Codes prjexpenses
prjexpensessettings:any;
prjexpensessource: any;

showprjexpensesCheckbox()
{
debugger;
if(this.tblprjexpensessource.settings['selectMode']== 'multi')this.tblprjexpensessource.settings['selectMode']= 'single';
else
this.tblprjexpensessource.settings['selectMode']= 'multi';
this.tblprjexpensessource.initGrid();
}
deleteprjexpensesAll()
{
this.tblprjexpensessource.settings['selectMode'] = 'single';
}
showprjexpensesFilter()
{
  setTimeout(() => {
  this.SetprjexpensesTableddConfig();
  });
      if(this.tblprjexpensessource.settings!=null)this.tblprjexpensessource.settings['hideSubHeader'] =!this.tblprjexpensessource.settings['hideSubHeader'];
this.tblprjexpensessource.initGrid();
}
showprjexpensesInActive()
{
}
enableprjexpensesInActive()
{
}
async SetprjexpensesTableddConfig()
{
if(!this.bfilterPopulateprjexpenses){

this.bousermasterservice.getbousermastersList().then(res=>
{
var datarequesteduserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjexpensesrequesteduserid3.push(defaultobj);
for(let i=0; i<datarequesteduserid2.length; i++){
var obj= { value: datarequesteduserid2[i].userid, title:datarequesteduserid2[i].username};
this.dataprjexpensesrequesteduserid3.push(obj);
}
if((this.tblprjexpensessource.settings as any).columns['requesteduserid'])
{
(this.tblprjexpensessource.settings as any).columns['requesteduserid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjexpensesrequesteduserid3));
this.tblprjexpensessource.initGrid();
}
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjexpensescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.dataprjexpensescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjexpensessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjexpensescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjexpensescurrency3)), }, };
this.tblprjexpensessource.settings =  clone;
this.tblprjexpensessource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var databasecurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjexpensesbasecurrency3.push(defaultobj);
for(let i=0; i<databasecurrency2.length; i++){
var obj= { value: databasecurrency2[i].configkey, title: databasecurrency2[i].configtext};
this.dataprjexpensesbasecurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjexpensessource.settings);
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjexpensesbasecurrency3)), }, };
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjexpensesbasecurrency3)), }, };
this.tblprjexpensessource.settings =  clone;
this.tblprjexpensessource.initGrid();
});
}
this.bfilterPopulateprjexpenses=true;
}
async prjexpensesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjexpensesTableConfig()
{
this.prjexpensessettings = {
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
var element= this.dataprjexpensesrequesteduserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
var element= this.dataprjexpensescurrency3.find(c=>c.value==cell);
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
basecurrency: {
title: 'Base Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjexpensesbasecurrency3.find(c=>c.value==cell);
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
prjexpensesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjexpensesID)>=0)
{
this.prjexpensessource=new LocalDataSource();
this.prjexpensessource.load(this.prjprojectmasterservice.prjexpenses as  any as LocalDataSource);
this.prjexpensessource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjexpensesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjexpenses.length == 0)
{
    this.tblprjexpensessource.grid.createFormShown = true;
}
else
{
    let obj = new prjexpense();
    this.prjprojectmasterservice.prjexpenses.push(obj);
    this.prjexpensessource.refresh();
    if ((this.prjprojectmasterservice.prjexpenses.length / this.prjexpensessource.getPaging().perPage).toFixed(0) + 1 != this.prjexpensessource.getPaging().page)
    {
        this.prjexpensessource.setPage((this.prjprojectmasterservice.prjexpenses.length / this.prjexpensessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjexpensessource.grid.edit(this.tblprjexpensessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjexpensessource.data.indexOf(event.data);
this.onDeleteprjexpense(event,event.data.expenseid,((this.prjexpensessource.getPaging().page-1) *this.prjexpensessource.getPaging().perPage)+index);
this.prjexpensessource.refresh();
break;
}
}

*/
prjexpensesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjexpense(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjexpense(event,event.data.expenseid,this.formid);
break;
case 'delete':
this.onDeleteprjexpense(event,event.data.expenseid,((this.prjexpensessource.getPaging().page-1) *this.prjexpensessource.getPaging().perPage)+event.index);
this.prjexpensessource.refresh();
break;
}
}
prjexpensesonDelete(obj) {
let expenseid=obj.data.expenseid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(expenseid).then(res=>
this.prjexpensesLoadTable()
);
}
}
prjexpensesPaging(val)
{
debugger;
this.prjexpensessource.setPaging(1, val, true);
}

handleprjexpensesGridSelected(event:any) {
this.prjexpensesselectedindex=this.prjprojectmasterservice.prjexpenses.findIndex(i => i.expenseid === event.data.expenseid);
}
IsprjexpensesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjexpensesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjexpenses
//start of Grid Codes prjprojecttasks
prjprojecttaskssettings:any;
prjprojecttaskssource: any;

showprjprojecttasksCheckbox()
{
debugger;
if(this.tblprjprojecttaskssource.settings['selectMode']== 'multi')this.tblprjprojecttaskssource.settings['selectMode']= 'single';
else
this.tblprjprojecttaskssource.settings['selectMode']= 'multi';
this.tblprjprojecttaskssource.initGrid();
}
deleteprjprojecttasksAll()
{
this.tblprjprojecttaskssource.settings['selectMode'] = 'single';
}
showprjprojecttasksFilter()
{
  setTimeout(() => {
  this.SetprjprojecttasksTableddConfig();
  });
      if(this.tblprjprojecttaskssource.settings!=null)this.tblprjprojecttaskssource.settings['hideSubHeader'] =!this.tblprjprojecttaskssource.settings['hideSubHeader'];
this.tblprjprojecttaskssource.initGrid();
}
showprjprojecttasksInActive()
{
}
enableprjprojecttasksInActive()
{
}
async SetprjprojecttasksTableddConfig()
{
if(!this.bfilterPopulateprjprojecttasks){

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.dataprjprojecttaskspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskspriority3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("complexity").then(res=>
{
var datacomplexity2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskscomplexity3.push(defaultobj);
for(let i=0; i<datacomplexity2.length; i++){
var obj= { value: datacomplexity2[i].configkey, title: datacomplexity2[i].configtext};
this.dataprjprojecttaskscomplexity3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['complexity']!=undefined)clone.columns['complexity'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscomplexity3)), }, };
if(clone.columns['complexity']!=undefined)clone.columns['complexity'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscomplexity3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("taskcategory").then(res=>
{
var datataskcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstaskcategory3.push(defaultobj);
for(let i=0; i<datataskcategory2.length; i++){
var obj= { value: datataskcategory2[i].configkey, title: datataskcategory2[i].configtext};
this.dataprjprojecttaskstaskcategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskcategory3)), }, };
if(clone.columns['taskcategory']!=undefined)clone.columns['taskcategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskcategory3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("tasktype").then(res=>
{
var datatasktype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstasktype3.push(defaultobj);
for(let i=0; i<datatasktype2.length; i++){
var obj= { value: datatasktype2[i].configkey, title: datatasktype2[i].configtext};
this.dataprjprojecttaskstasktype3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['tasktype']!=undefined)clone.columns['tasktype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstasktype3)), }, };
if(clone.columns['tasktype']!=undefined)clone.columns['tasktype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstasktype3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("colorcode").then(res=>
{
var datacolorcode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskscolorcode3.push(defaultobj);
for(let i=0; i<datacolorcode2.length; i++){
var obj= { value: datacolorcode2[i].configkey, title: datacolorcode2[i].configtext};
this.dataprjprojecttaskscolorcode3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['colorcode']!=undefined)clone.columns['colorcode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscolorcode3)), }, };
if(clone.columns['colorcode']!=undefined)clone.columns['colorcode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskscolorcode3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});

this.configservice.getList("taskstatus").then(res=>
{
var datataskstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojecttaskstaskstatus3.push(defaultobj);
for(let i=0; i<datataskstatus2.length; i++){
var obj= { value: datataskstatus2[i].configkey, title: datataskstatus2[i].configtext};
this.dataprjprojecttaskstaskstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojecttaskssource.settings);
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskstatus3)), }, };
if(clone.columns['taskstatus']!=undefined)clone.columns['taskstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojecttaskstaskstatus3)), }, };
this.tblprjprojecttaskssource.settings =  clone;
this.tblprjprojecttaskssource.initGrid();
});
}
this.bfilterPopulateprjprojecttasks=true;
}
async prjprojecttasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojecttasksTableConfig()
{
this.prjprojecttaskssettings = {
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
deliverableid: {
title: 'Deliverable',
type: 'number',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:true,
},
taskcode: {
title: 'Task Code',
type: '',
filter:true,
},
taskname: {
title: 'Task Name',
type: '',
filter:true,
},
storypoints: {
title: 'Story Points',
type: 'number',
filter:true,
},
feedbacktags: {
title: 'Feedback Tags',
type: '',
filter:true,
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
issues: {
title: 'Issues',
type: '',
filter:true,
},
milestone: {
title: 'Mile Stone',
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
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
workdoneby: {
title: 'Work Done By',
type: 'number',
filter:true,
},
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
complexity: {
title: 'Complexity',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskscomplexity3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
taskcategory: {
title: 'Task Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstaskcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
tasktype: {
title: 'Task Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstasktype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
activitytype: {
title: 'Activity Type',
type: 'number',
filter:true,
},
isbillable: {
title: 'Is Billable',
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
colorcode: {
title: 'Color Code',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskscolorcode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
parenttasks: {
title: 'Parent Tasks',
type: '',
filter:true,
},
dependenttasks: {
title: 'Dependent Tasks',
type: '',
filter:true,
},
taskstatus: {
title: 'Task Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojecttaskstaskstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
actualworkdone: {
title: 'Actual Work Done',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actualstartdate: {
title: 'Actual Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualenddate: {
title: 'Actual End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
estimatedpercentage: {
title: 'Estimated Percentage',
type: 'number',
filter:true,
},
completionpercentage: {
title: 'Completion Percentage',
type: 'number',
filter:true,
},
estimatedeffort: {
title: 'Estimated Effort',
type: '',
filter:true,
},
actualeffort: {
title: 'Actual Effort',
type: '',
filter:true,
},
utilizationpercentage: {
title: 'Utilization Percentage',
type: 'number',
filter:true,
},
labourbudget: {
title: 'Labour Budget',
type: 'number',
filter:true,
},
labouractual: {
title: 'Labour Actual',
type: 'number',
filter:true,
},
predecessor: {
title: 'Predecessor',
type: '',
filter:true,
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
feedbacknotes: {
title: 'Feedback Notes',
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
draft: {
title: 'Draft',
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
outputid: {
title: 'Output',
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
prjprojecttasksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojecttasksID)>=0)
{
this.prjprojecttaskssource=new LocalDataSource();
this.prjprojecttaskssource.load(this.prjprojectmasterservice.prjprojecttasks as  any as LocalDataSource);
this.prjprojecttaskssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojecttasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojecttasks.length == 0)
{
    this.tblprjprojecttaskssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojecttask();
    this.prjprojectmasterservice.prjprojecttasks.push(obj);
    this.prjprojecttaskssource.refresh();
    if ((this.prjprojectmasterservice.prjprojecttasks.length / this.prjprojecttaskssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojecttaskssource.getPaging().page)
    {
        this.prjprojecttaskssource.setPage((this.prjprojectmasterservice.prjprojecttasks.length / this.prjprojecttaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojecttaskssource.grid.edit(this.tblprjprojecttaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojecttaskssource.data.indexOf(event.data);
this.onDeleteprjprojecttask(event,event.data.taskid,((this.prjprojecttaskssource.getPaging().page-1) *this.prjprojecttaskssource.getPaging().perPage)+index);
this.prjprojecttaskssource.refresh();
break;
}
}

*/
prjprojecttasksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojecttask(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojecttask(event,event.data.taskid,this.formid);
break;
case 'delete':
this.onDeleteprjprojecttask(event,event.data.taskid,((this.prjprojecttaskssource.getPaging().page-1) *this.prjprojecttaskssource.getPaging().perPage)+event.index);
this.prjprojecttaskssource.refresh();
break;
}
}
prjprojecttasksonDelete(obj) {
let taskid=obj.data.taskid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(taskid).then(res=>
this.prjprojecttasksLoadTable()
);
}
}
prjprojecttasksPaging(val)
{
debugger;
this.prjprojecttaskssource.setPaging(1, val, true);
}

handleprjprojecttasksGridSelected(event:any) {
this.prjprojecttasksselectedindex=this.prjprojectmasterservice.prjprojecttasks.findIndex(i => i.taskid === event.data.taskid);
}
IsprjprojecttasksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojecttasksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojecttasks
//start of Grid Codes bofacts
bofactssettings:any;
bofactssource: any;

showbofactsCheckbox()
{
debugger;
if(this.tblbofactssource.settings['selectMode']== 'multi')this.tblbofactssource.settings['selectMode']= 'single';
else
this.tblbofactssource.settings['selectMode']= 'multi';
this.tblbofactssource.initGrid();
}
deletebofactsAll()
{
this.tblbofactssource.settings['selectMode'] = 'single';
}
showbofactsFilter()
{
  setTimeout(() => {
  this.SetbofactsTableddConfig();
  });
      if(this.tblbofactssource.settings!=null)this.tblbofactssource.settings['hideSubHeader'] =!this.tblbofactssource.settings['hideSubHeader'];
this.tblbofactssource.initGrid();
}
showbofactsInActive()
{
}
enablebofactsInActive()
{
}
async SetbofactsTableddConfig()
{
if(!this.bfilterPopulatebofacts){
}
this.bfilterPopulatebofacts=true;
}
async bofactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbofactsTableConfig()
{
this.bofactssettings = {
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
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
feedback: {
title: 'Feedback',
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
bofactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofactsID)>=0)
{
this.bofactssource=new LocalDataSource();
this.bofactssource.load(this.prjprojectmasterservice.bofacts as  any as LocalDataSource);
this.bofactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bofactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.bofacts.length == 0)
{
    this.tblbofactssource.grid.createFormShown = true;
}
else
{
    let obj = new bofact();
    this.prjprojectmasterservice.bofacts.push(obj);
    this.bofactssource.refresh();
    if ((this.prjprojectmasterservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1 != this.bofactssource.getPaging().page)
    {
        this.bofactssource.setPage((this.prjprojectmasterservice.bofacts.length / this.bofactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbofactssource.grid.edit(this.tblbofactssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bofactssource.data.indexOf(event.data);
this.onDeletebofact(event,event.data.factid,((this.bofactssource.getPaging().page-1) *this.bofactssource.getPaging().perPage)+index);
this.bofactssource.refresh();
break;
}
}

*/
bofactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbofact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbofact(event,event.data.factid,this.formid);
break;
case 'delete':
this.onDeletebofact(event,event.data.factid,((this.bofactssource.getPaging().page-1) *this.bofactssource.getPaging().perPage)+event.index);
this.bofactssource.refresh();
break;
}
}
bofactsonDelete(obj) {
let factid=obj.data.factid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(factid).then(res=>
this.bofactsLoadTable()
);
}
}
bofactsPaging(val)
{
debugger;
this.bofactssource.setPaging(1, val, true);
}

handlebofactsGridSelected(event:any) {
this.bofactsselectedindex=this.prjprojectmasterservice.bofacts.findIndex(i => i.factid === event.data.factid);
}
IsbofactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bofactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bofacts
//start of Grid Codes prjprojectchanges
prjprojectchangessettings:any;
prjprojectchangessource: any;

showprjprojectchangesCheckbox()
{
debugger;
if(this.tblprjprojectchangessource.settings['selectMode']== 'multi')this.tblprjprojectchangessource.settings['selectMode']= 'single';
else
this.tblprjprojectchangessource.settings['selectMode']= 'multi';
this.tblprjprojectchangessource.initGrid();
}
deleteprjprojectchangesAll()
{
this.tblprjprojectchangessource.settings['selectMode'] = 'single';
}
showprjprojectchangesFilter()
{
  setTimeout(() => {
  this.SetprjprojectchangesTableddConfig();
  });
      if(this.tblprjprojectchangessource.settings!=null)this.tblprjprojectchangessource.settings['hideSubHeader'] =!this.tblprjprojectchangessource.settings['hideSubHeader'];
this.tblprjprojectchangessource.initGrid();
}
showprjprojectchangesInActive()
{
}
enableprjprojectchangesInActive()
{
}
async SetprjprojectchangesTableddConfig()
{
if(!this.bfilterPopulateprjprojectchanges){

this.configservice.getList("changestatus").then(res=>
{
var datachangestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojectchangeschangestatus3.push(defaultobj);
for(let i=0; i<datachangestatus2.length; i++){
var obj= { value: datachangestatus2[i].configkey, title: datachangestatus2[i].configtext};
this.dataprjprojectchangeschangestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojectchangessource.settings);
if(clone.columns['changestatus']!=undefined)clone.columns['changestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectchangeschangestatus3)), }, };
if(clone.columns['changestatus']!=undefined)clone.columns['changestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectchangeschangestatus3)), }, };
this.tblprjprojectchangessource.settings =  clone;
this.tblprjprojectchangessource.initGrid();
});
}
this.bfilterPopulateprjprojectchanges=true;
}
async prjprojectchangesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectchangesTableConfig()
{
this.prjprojectchangessettings = {
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
changerequestid: {
title: 'Change Request',
type: 'number',
filter:true,
},
changedetails: {
title: 'Change Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
changedate: {
title: 'Change Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requestedby: {
title: 'Requested By',
type: 'number',
filter:true,
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
verifiedby: {
title: 'Verified By',
type: 'number',
filter:true,
},
changestatus: {
title: 'Change Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojectchangeschangestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
prjprojectchangesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectchangesID)>=0)
{
this.prjprojectchangessource=new LocalDataSource();
this.prjprojectchangessource.load(this.prjprojectmasterservice.prjprojectchanges as  any as LocalDataSource);
this.prjprojectchangessource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectchangesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectchanges.length == 0)
{
    this.tblprjprojectchangessource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectchange();
    this.prjprojectmasterservice.prjprojectchanges.push(obj);
    this.prjprojectchangessource.refresh();
    if ((this.prjprojectmasterservice.prjprojectchanges.length / this.prjprojectchangessource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectchangessource.getPaging().page)
    {
        this.prjprojectchangessource.setPage((this.prjprojectmasterservice.prjprojectchanges.length / this.prjprojectchangessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectchangessource.grid.edit(this.tblprjprojectchangessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectchangessource.data.indexOf(event.data);
this.onDeleteprjprojectchange(event,event.data.changeid,((this.prjprojectchangessource.getPaging().page-1) *this.prjprojectchangessource.getPaging().perPage)+index);
this.prjprojectchangessource.refresh();
break;
}
}

*/
prjprojectchangesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectchange(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectchange(event,event.data.changeid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectchange(event,event.data.changeid,((this.prjprojectchangessource.getPaging().page-1) *this.prjprojectchangessource.getPaging().perPage)+event.index);
this.prjprojectchangessource.refresh();
break;
}
}
prjprojectchangesonDelete(obj) {
let changeid=obj.data.changeid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(changeid).then(res=>
this.prjprojectchangesLoadTable()
);
}
}
prjprojectchangesPaging(val)
{
debugger;
this.prjprojectchangessource.setPaging(1, val, true);
}

handleprjprojectchangesGridSelected(event:any) {
this.prjprojectchangesselectedindex=this.prjprojectmasterservice.prjprojectchanges.findIndex(i => i.changeid === event.data.changeid);
}
IsprjprojectchangesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectchangesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectchanges
//start of Grid Codes boremindermasters
boremindermasterssettings:any;
boremindermasterssource: any;

showboremindermastersCheckbox()
{
debugger;
if(this.tblboremindermasterssource.settings['selectMode']== 'multi')this.tblboremindermasterssource.settings['selectMode']= 'single';
else
this.tblboremindermasterssource.settings['selectMode']= 'multi';
this.tblboremindermasterssource.initGrid();
}
deleteboremindermastersAll()
{
this.tblboremindermasterssource.settings['selectMode'] = 'single';
}
showboremindermastersFilter()
{
  setTimeout(() => {
  this.SetboremindermastersTableddConfig();
  });
      if(this.tblboremindermasterssource.settings!=null)this.tblboremindermasterssource.settings['hideSubHeader'] =!this.tblboremindermasterssource.settings['hideSubHeader'];
this.tblboremindermasterssource.initGrid();
}
showboremindermastersInActive()
{
}
enableboremindermastersInActive()
{
}
async SetboremindermastersTableddConfig()
{
if(!this.bfilterPopulateboremindermasters){

this.configservice.getList("usertype").then(res=>
{
var datareminderusertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoremindermastersreminderusertype3.push(defaultobj);
for(let i=0; i<datareminderusertype2.length; i++){
var obj= { value: datareminderusertype2[i].configkey, title: datareminderusertype2[i].configtext};
this.databoremindermastersreminderusertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblboremindermasterssource.settings);
if(clone.columns['reminderusertype']!=undefined)clone.columns['reminderusertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoremindermastersreminderusertype3)), }, };
if(clone.columns['reminderusertype']!=undefined)clone.columns['reminderusertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoremindermastersreminderusertype3)), }, };
this.tblboremindermasterssource.settings =  clone;
this.tblboremindermasterssource.initGrid();
});
}
this.bfilterPopulateboremindermasters=true;
}
async boremindermastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboremindermastersTableConfig()
{
this.boremindermasterssettings = {
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
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Sub Category',
type: 'number',
filter:true,
},
priority: {
title: 'Priority',
type: '',
filter:true,
},
reminderdate: {
title: 'Reminder Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
remindertime: {
title: 'Reminder Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
remindertext: {
title: 'Reminder Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
reminderusertype: {
title: 'Reminder User Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoremindermastersreminderusertype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
scheduletype: {
title: 'Schedule Type',
type: '',
filter:true,
},
reminderdaysbefore: {
title: 'Reminder Days Before',
type: '',
filter:true,
},
alarm: {
title: 'Alarm',
type: '',
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
boremindermastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boremindermastersID)>=0)
{
this.boremindermasterssource=new LocalDataSource();
this.boremindermasterssource.load(this.prjprojectmasterservice.boremindermasters as  any as LocalDataSource);
this.boremindermasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boremindermastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.boremindermasters.length == 0)
{
    this.tblboremindermasterssource.grid.createFormShown = true;
}
else
{
    let obj = new boremindermaster();
    this.prjprojectmasterservice.boremindermasters.push(obj);
    this.boremindermasterssource.refresh();
    if ((this.prjprojectmasterservice.boremindermasters.length / this.boremindermasterssource.getPaging().perPage).toFixed(0) + 1 != this.boremindermasterssource.getPaging().page)
    {
        this.boremindermasterssource.setPage((this.prjprojectmasterservice.boremindermasters.length / this.boremindermasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboremindermasterssource.grid.edit(this.tblboremindermasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boremindermasterssource.data.indexOf(event.data);
this.onDeleteboremindermaster(event,event.data.remindermasterid,((this.boremindermasterssource.getPaging().page-1) *this.boremindermasterssource.getPaging().perPage)+index);
this.boremindermasterssource.refresh();
break;
}
}

*/
boremindermastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboremindermaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboremindermaster(event,event.data.remindermasterid,this.formid);
break;
case 'delete':
this.onDeleteboremindermaster(event,event.data.remindermasterid,((this.boremindermasterssource.getPaging().page-1) *this.boremindermasterssource.getPaging().perPage)+event.index);
this.boremindermasterssource.refresh();
break;
}
}
boremindermastersonDelete(obj) {
let remindermasterid=obj.data.remindermasterid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(remindermasterid).then(res=>
this.boremindermastersLoadTable()
);
}
}
boremindermastersPaging(val)
{
debugger;
this.boremindermasterssource.setPaging(1, val, true);
}

handleboremindermastersGridSelected(event:any) {
this.boremindermastersselectedindex=this.prjprojectmasterservice.boremindermasters.findIndex(i => i.remindermasterid === event.data.remindermasterid);
}
IsboremindermastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boremindermastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boremindermasters
//start of Grid Codes prjprojectteammembers
prjprojectteammemberssettings:any;
prjprojectteammemberssource: any;

showprjprojectteammembersCheckbox()
{
debugger;
if(this.tblprjprojectteammemberssource.settings['selectMode']== 'multi')this.tblprjprojectteammemberssource.settings['selectMode']= 'single';
else
this.tblprjprojectteammemberssource.settings['selectMode']= 'multi';
this.tblprjprojectteammemberssource.initGrid();
}
deleteprjprojectteammembersAll()
{
this.tblprjprojectteammemberssource.settings['selectMode'] = 'single';
}
showprjprojectteammembersFilter()
{
  setTimeout(() => {
  this.SetprjprojectteammembersTableddConfig();
  });
      if(this.tblprjprojectteammemberssource.settings!=null)this.tblprjprojectteammemberssource.settings['hideSubHeader'] =!this.tblprjprojectteammemberssource.settings['hideSubHeader'];
this.tblprjprojectteammemberssource.initGrid();
}
showprjprojectteammembersInActive()
{
}
enableprjprojectteammembersInActive()
{
}
async SetprjprojectteammembersTableddConfig()
{
if(!this.bfilterPopulateprjprojectteammembers){

this.configservice.getList("memberstatus").then(res=>
{
var datamemberstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojectteammembersmemberstatus3.push(defaultobj);
for(let i=0; i<datamemberstatus2.length; i++){
var obj= { value: datamemberstatus2[i].configkey, title: datamemberstatus2[i].configtext};
this.dataprjprojectteammembersmemberstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojectteammemberssource.settings);
if(clone.columns['memberstatus']!=undefined)clone.columns['memberstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectteammembersmemberstatus3)), }, };
if(clone.columns['memberstatus']!=undefined)clone.columns['memberstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectteammembersmemberstatus3)), }, };
this.tblprjprojectteammemberssource.settings =  clone;
this.tblprjprojectteammemberssource.initGrid();
});
}
this.bfilterPopulateprjprojectteammembers=true;
}
async prjprojectteammembersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectteammembersTableConfig()
{
this.prjprojectteammemberssettings = {
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
userid: {
title: 'User',
type: 'number',
filter:true,
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
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
rateperhour: {
title: 'Rate Per Hour',
type: 'number',
filter:true,
},
memberstatus: {
title: 'Member Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojectteammembersmemberstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
prjprojectteammembersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectteammembersID)>=0)
{
this.prjprojectteammemberssource=new LocalDataSource();
this.prjprojectteammemberssource.load(this.prjprojectmasterservice.prjprojectteammembers as  any as LocalDataSource);
this.prjprojectteammemberssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectteammembersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectteammembers.length == 0)
{
    this.tblprjprojectteammemberssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectteammember();
    this.prjprojectmasterservice.prjprojectteammembers.push(obj);
    this.prjprojectteammemberssource.refresh();
    if ((this.prjprojectmasterservice.prjprojectteammembers.length / this.prjprojectteammemberssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectteammemberssource.getPaging().page)
    {
        this.prjprojectteammemberssource.setPage((this.prjprojectmasterservice.prjprojectteammembers.length / this.prjprojectteammemberssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectteammemberssource.grid.edit(this.tblprjprojectteammemberssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectteammemberssource.data.indexOf(event.data);
this.onDeleteprjprojectteammember(event,event.data.teammemberid,((this.prjprojectteammemberssource.getPaging().page-1) *this.prjprojectteammemberssource.getPaging().perPage)+index);
this.prjprojectteammemberssource.refresh();
break;
}
}

*/
prjprojectteammembersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectteammember(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectteammember(event,event.data.teammemberid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectteammember(event,event.data.teammemberid,((this.prjprojectteammemberssource.getPaging().page-1) *this.prjprojectteammemberssource.getPaging().perPage)+event.index);
this.prjprojectteammemberssource.refresh();
break;
}
}
prjprojectteammembersonDelete(obj) {
let teammemberid=obj.data.teammemberid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(teammemberid).then(res=>
this.prjprojectteammembersLoadTable()
);
}
}
prjprojectteammembersPaging(val)
{
debugger;
this.prjprojectteammemberssource.setPaging(1, val, true);
}

handleprjprojectteammembersGridSelected(event:any) {
this.prjprojectteammembersselectedindex=this.prjprojectmasterservice.prjprojectteammembers.findIndex(i => i.teammemberid === event.data.teammemberid);
}
IsprjprojectteammembersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectteammembersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectteammembers
//start of Grid Codes prjprojectverifications
prjprojectverificationssettings:any;
prjprojectverificationssource: any;

showprjprojectverificationsCheckbox()
{
debugger;
if(this.tblprjprojectverificationssource.settings['selectMode']== 'multi')this.tblprjprojectverificationssource.settings['selectMode']= 'single';
else
this.tblprjprojectverificationssource.settings['selectMode']= 'multi';
this.tblprjprojectverificationssource.initGrid();
}
deleteprjprojectverificationsAll()
{
this.tblprjprojectverificationssource.settings['selectMode'] = 'single';
}
showprjprojectverificationsFilter()
{
  setTimeout(() => {
  this.SetprjprojectverificationsTableddConfig();
  });
      if(this.tblprjprojectverificationssource.settings!=null)this.tblprjprojectverificationssource.settings['hideSubHeader'] =!this.tblprjprojectverificationssource.settings['hideSubHeader'];
this.tblprjprojectverificationssource.initGrid();
}
showprjprojectverificationsInActive()
{
}
enableprjprojectverificationsInActive()
{
}
async SetprjprojectverificationsTableddConfig()
{
if(!this.bfilterPopulateprjprojectverifications){
}
this.bfilterPopulateprjprojectverifications=true;
}
async prjprojectverificationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectverificationsTableConfig()
{
this.prjprojectverificationssettings = {
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
verification: {
title: 'Verification',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
verificationstage: {
title: 'Verification Stage',
type: '',
filter:true,
},
verificationby: {
title: 'Verification By',
type: 'number',
filter:true,
},
reviewedby: {
title: 'Reviewed By',
type: 'number',
filter:true,
},
verificationdate: {
title: 'Verification Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
verificationresult: {
title: 'Verification Result',
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
prjprojectverificationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectverificationsID)>=0)
{
this.prjprojectverificationssource=new LocalDataSource();
this.prjprojectverificationssource.load(this.prjprojectmasterservice.prjprojectverifications as  any as LocalDataSource);
this.prjprojectverificationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectverificationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectverifications.length == 0)
{
    this.tblprjprojectverificationssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectverification();
    this.prjprojectmasterservice.prjprojectverifications.push(obj);
    this.prjprojectverificationssource.refresh();
    if ((this.prjprojectmasterservice.prjprojectverifications.length / this.prjprojectverificationssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectverificationssource.getPaging().page)
    {
        this.prjprojectverificationssource.setPage((this.prjprojectmasterservice.prjprojectverifications.length / this.prjprojectverificationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectverificationssource.grid.edit(this.tblprjprojectverificationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectverificationssource.data.indexOf(event.data);
this.onDeleteprjprojectverification(event,event.data.verificationid,((this.prjprojectverificationssource.getPaging().page-1) *this.prjprojectverificationssource.getPaging().perPage)+index);
this.prjprojectverificationssource.refresh();
break;
}
}

*/
prjprojectverificationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectverification(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectverification(event,event.data.verificationid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectverification(event,event.data.verificationid,((this.prjprojectverificationssource.getPaging().page-1) *this.prjprojectverificationssource.getPaging().perPage)+event.index);
this.prjprojectverificationssource.refresh();
break;
}
}
prjprojectverificationsonDelete(obj) {
let verificationid=obj.data.verificationid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(verificationid).then(res=>
this.prjprojectverificationsLoadTable()
);
}
}
prjprojectverificationsPaging(val)
{
debugger;
this.prjprojectverificationssource.setPaging(1, val, true);
}

handleprjprojectverificationsGridSelected(event:any) {
this.prjprojectverificationsselectedindex=this.prjprojectmasterservice.prjprojectverifications.findIndex(i => i.verificationid === event.data.verificationid);
}
IsprjprojectverificationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectverificationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectverifications
//start of Grid Codes prjtimecards
prjtimecardssettings:any;
prjtimecardssource: any;

showprjtimecardsCheckbox()
{
debugger;
if(this.tblprjtimecardssource.settings['selectMode']== 'multi')this.tblprjtimecardssource.settings['selectMode']= 'single';
else
this.tblprjtimecardssource.settings['selectMode']= 'multi';
this.tblprjtimecardssource.initGrid();
}
deleteprjtimecardsAll()
{
this.tblprjtimecardssource.settings['selectMode'] = 'single';
}
showprjtimecardsFilter()
{
  setTimeout(() => {
  this.SetprjtimecardsTableddConfig();
  });
      if(this.tblprjtimecardssource.settings!=null)this.tblprjtimecardssource.settings['hideSubHeader'] =!this.tblprjtimecardssource.settings['hideSubHeader'];
this.tblprjtimecardssource.initGrid();
}
showprjtimecardsInActive()
{
}
enableprjtimecardsInActive()
{
}
async SetprjtimecardsTableddConfig()
{
if(!this.bfilterPopulateprjtimecards){

this.prjprojectmasterservice.getprjprojectmastersList().then(res=>
{
var dataprojectid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjtimecardsprojectid3.push(defaultobj);
for(let i=0; i<dataprojectid2.length; i++){
var obj= { value: dataprojectid2[i].projectid, title:dataprojectid2[i].projectname};
this.dataprjtimecardsprojectid3.push(obj);
}
if((this.tblprjtimecardssource.settings as any).columns['projectid'])
{
(this.tblprjtimecardssource.settings as any).columns['projectid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjtimecardsprojectid3));
this.tblprjtimecardssource.initGrid();
}
});

this.prjprojectdeliverableservice.getprjprojectdeliverablesList().then(res=>
{
var datadeliverableid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjtimecardsdeliverableid3.push(defaultobj);
for(let i=0; i<datadeliverableid2.length; i++){
var obj= { value: datadeliverableid2[i].deliverableid, title:datadeliverableid2[i].deliverablename};
this.dataprjtimecardsdeliverableid3.push(obj);
}
if((this.tblprjtimecardssource.settings as any).columns['deliverableid'])
{
(this.tblprjtimecardssource.settings as any).columns['deliverableid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjtimecardsdeliverableid3));
this.tblprjtimecardssource.initGrid();
}
});

this.prjprojecttaskservice.getprjprojecttasksList().then(res=>
{
var datataskid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjtimecardstaskid3.push(defaultobj);
for(let i=0; i<datataskid2.length; i++){
var obj= { value: datataskid2[i].taskid, title:datataskid2[i].taskname};
this.dataprjtimecardstaskid3.push(obj);
}
if((this.tblprjtimecardssource.settings as any).columns['taskid'])
{
(this.tblprjtimecardssource.settings as any).columns['taskid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjtimecardstaskid3));
this.tblprjtimecardssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datauserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjtimecardsuserid3.push(defaultobj);
for(let i=0; i<datauserid2.length; i++){
var obj= { value: datauserid2[i].userid, title:datauserid2[i].username};
this.dataprjtimecardsuserid3.push(obj);
}
if((this.tblprjtimecardssource.settings as any).columns['userid'])
{
(this.tblprjtimecardssource.settings as any).columns['userid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjtimecardsuserid3));
this.tblprjtimecardssource.initGrid();
}
});
}
this.bfilterPopulateprjtimecards=true;
}
async prjtimecardsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjtimecardsTableConfig()
{
this.prjtimecardssettings = {
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
deliverableid: {
title: 'Deliverable',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjtimecardsdeliverableid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
taskid: {
title: 'Task',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'tuyur',reportcode:'tuyur',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataprjtimecardstaskid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
userid: {
title: 'User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataprjtimecardsuserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
carddate: {
title: 'Card Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
fromtime: {
title: 'From Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
totime: {
title: 'To Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
hoursspent: {
title: 'Hours Spent',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
isbillable: {
title: 'Is Billable',
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
billablehrs: {
title: 'Billable Hrs',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
billableamount: {
title: 'Billable Amount',
type: 'number',
filter:true,
},
billid: {
title: 'Bill',
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
prjtimecardsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjtimecardsID)>=0)
{
this.prjtimecardssource=new LocalDataSource();
this.prjtimecardssource.load(this.prjprojectmasterservice.prjtimecards as  any as LocalDataSource);
this.prjtimecardssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjtimecardsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjtimecards.length == 0)
{
    this.tblprjtimecardssource.grid.createFormShown = true;
}
else
{
    let obj = new prjtimecard();
    this.prjprojectmasterservice.prjtimecards.push(obj);
    this.prjtimecardssource.refresh();
    if ((this.prjprojectmasterservice.prjtimecards.length / this.prjtimecardssource.getPaging().perPage).toFixed(0) + 1 != this.prjtimecardssource.getPaging().page)
    {
        this.prjtimecardssource.setPage((this.prjprojectmasterservice.prjtimecards.length / this.prjtimecardssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjtimecardssource.grid.edit(this.tblprjtimecardssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjtimecardssource.data.indexOf(event.data);
this.onDeleteprjtimecard(event,event.data.timecardid,((this.prjtimecardssource.getPaging().page-1) *this.prjtimecardssource.getPaging().perPage)+index);
this.prjtimecardssource.refresh();
break;
}
}

*/
prjtimecardsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjtimecard(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjtimecard(event,event.data.timecardid,this.formid);
break;
case 'delete':
this.onDeleteprjtimecard(event,event.data.timecardid,((this.prjtimecardssource.getPaging().page-1) *this.prjtimecardssource.getPaging().perPage)+event.index);
this.prjtimecardssource.refresh();
break;
}
}
prjtimecardsonDelete(obj) {
let timecardid=obj.data.timecardid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(timecardid).then(res=>
this.prjtimecardsLoadTable()
);
}
}
prjtimecardsPaging(val)
{
debugger;
this.prjtimecardssource.setPaging(1, val, true);
}

handleprjtimecardsGridSelected(event:any) {
this.prjtimecardsselectedindex=this.prjprojectmasterservice.prjtimecards.findIndex(i => i.timecardid === event.data.timecardid);
}
IsprjtimecardsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjtimecardsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjtimecards
//start of Grid Codes prjdocuments
prjdocumentssettings:any;
prjdocumentssource: any;

showprjdocumentsCheckbox()
{
debugger;
if(this.tblprjdocumentssource.settings['selectMode']== 'multi')this.tblprjdocumentssource.settings['selectMode']= 'single';
else
this.tblprjdocumentssource.settings['selectMode']= 'multi';
this.tblprjdocumentssource.initGrid();
}
deleteprjdocumentsAll()
{
this.tblprjdocumentssource.settings['selectMode'] = 'single';
}
showprjdocumentsFilter()
{
  setTimeout(() => {
  this.SetprjdocumentsTableddConfig();
  });
      if(this.tblprjdocumentssource.settings!=null)this.tblprjdocumentssource.settings['hideSubHeader'] =!this.tblprjdocumentssource.settings['hideSubHeader'];
this.tblprjdocumentssource.initGrid();
}
showprjdocumentsInActive()
{
}
enableprjdocumentsInActive()
{
}
async SetprjdocumentsTableddConfig()
{
if(!this.bfilterPopulateprjdocuments){

this.prjprojectmasterservice.getprjprojectmastersList().then(res=>
{
var dataprojectid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjdocumentsprojectid3.push(defaultobj);
for(let i=0; i<dataprojectid2.length; i++){
var obj= { value: dataprojectid2[i].projectid, title:dataprojectid2[i].projectname};
this.dataprjdocumentsprojectid3.push(obj);
}
if((this.tblprjdocumentssource.settings as any).columns['projectid'])
{
(this.tblprjdocumentssource.settings as any).columns['projectid'].editor.config.list=JSON.parse(JSON.stringify(this.dataprjdocumentsprojectid3));
this.tblprjdocumentssource.initGrid();
}
});

this.configservice.getList("doccategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjdocumentscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.dataprjdocumentscategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjdocumentssource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjdocumentscategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjdocumentscategory3)), }, };
this.tblprjdocumentssource.settings =  clone;
this.tblprjdocumentssource.initGrid();
});
}
this.bfilterPopulateprjdocuments=true;
}
async prjdocumentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjdocumentsTableConfig()
{
this.prjdocumentssettings = {
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
documentname: {
title: 'Document Name',
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
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjdocumentscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
preparedby: {
title: 'Prepared By',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
docaccess: {
title: 'Doc Access',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
url: {
title: 'U R L',
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
prjdocumentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjdocumentsID)>=0)
{
this.prjdocumentssource=new LocalDataSource();
this.prjdocumentssource.load(this.prjprojectmasterservice.prjdocuments as  any as LocalDataSource);
this.prjdocumentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjdocumentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjdocuments.length == 0)
{
    this.tblprjdocumentssource.grid.createFormShown = true;
}
else
{
    let obj = new prjdocument();
    this.prjprojectmasterservice.prjdocuments.push(obj);
    this.prjdocumentssource.refresh();
    if ((this.prjprojectmasterservice.prjdocuments.length / this.prjdocumentssource.getPaging().perPage).toFixed(0) + 1 != this.prjdocumentssource.getPaging().page)
    {
        this.prjdocumentssource.setPage((this.prjprojectmasterservice.prjdocuments.length / this.prjdocumentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjdocumentssource.grid.edit(this.tblprjdocumentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjdocumentssource.data.indexOf(event.data);
this.onDeleteprjdocument(event,event.data.documentid,((this.prjdocumentssource.getPaging().page-1) *this.prjdocumentssource.getPaging().perPage)+index);
this.prjdocumentssource.refresh();
break;
}
}

*/
prjdocumentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjdocument(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjdocument(event,event.data.documentid,this.formid);
break;
case 'delete':
this.onDeleteprjdocument(event,event.data.documentid,((this.prjdocumentssource.getPaging().page-1) *this.prjdocumentssource.getPaging().perPage)+event.index);
this.prjdocumentssource.refresh();
break;
}
}
prjdocumentsonDelete(obj) {
let documentid=obj.data.documentid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(documentid).then(res=>
this.prjdocumentsLoadTable()
);
}
}
prjdocumentsPaging(val)
{
debugger;
this.prjdocumentssource.setPaging(1, val, true);
}

handleprjdocumentsGridSelected(event:any) {
this.prjdocumentsselectedindex=this.prjprojectmasterservice.prjdocuments.findIndex(i => i.documentid === event.data.documentid);
}
IsprjdocumentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjdocumentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjdocuments
//start of Grid Codes prjprojectbillings
prjprojectbillingssettings:any;
prjprojectbillingssource: any;

showprjprojectbillingsCheckbox()
{
debugger;
if(this.tblprjprojectbillingssource.settings['selectMode']== 'multi')this.tblprjprojectbillingssource.settings['selectMode']= 'single';
else
this.tblprjprojectbillingssource.settings['selectMode']= 'multi';
this.tblprjprojectbillingssource.initGrid();
}
deleteprjprojectbillingsAll()
{
this.tblprjprojectbillingssource.settings['selectMode'] = 'single';
}
showprjprojectbillingsFilter()
{
  setTimeout(() => {
  this.SetprjprojectbillingsTableddConfig();
  });
      if(this.tblprjprojectbillingssource.settings!=null)this.tblprjprojectbillingssource.settings['hideSubHeader'] =!this.tblprjprojectbillingssource.settings['hideSubHeader'];
this.tblprjprojectbillingssource.initGrid();
}
showprjprojectbillingsInActive()
{
}
enableprjprojectbillingsInActive()
{
}
async SetprjprojectbillingsTableddConfig()
{
if(!this.bfilterPopulateprjprojectbillings){
}
this.bfilterPopulateprjprojectbillings=true;
}
async prjprojectbillingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectbillingsTableConfig()
{
this.prjprojectbillingssettings = {
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
billreference: {
title: 'Bill Reference',
type: '',
filter:true,
},
totalworkinghrs: {
title: 'Total Working Hrs',
type: 'number',
filter:true,
},
totalbillablehrs: {
title: 'Total Billable Hrs',
type: 'number',
filter:true,
},
totalbillableamount: {
title: 'Total Billable Amount',
type: 'number',
filter:true,
},
totalcostingamount: {
title: 'Total Costing Amount',
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
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
return ret;
},
},
},
};
}
prjprojectbillingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectbillingsID)>=0)
{
this.prjprojectbillingssource=new LocalDataSource();
this.prjprojectbillingssource.load(this.prjprojectmasterservice.prjprojectbillings as  any as LocalDataSource);
this.prjprojectbillingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectbillingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectbillings.length == 0)
{
    this.tblprjprojectbillingssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectbilling();
    this.prjprojectmasterservice.prjprojectbillings.push(obj);
    this.prjprojectbillingssource.refresh();
    if ((this.prjprojectmasterservice.prjprojectbillings.length / this.prjprojectbillingssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectbillingssource.getPaging().page)
    {
        this.prjprojectbillingssource.setPage((this.prjprojectmasterservice.prjprojectbillings.length / this.prjprojectbillingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectbillingssource.grid.edit(this.tblprjprojectbillingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectbillingssource.data.indexOf(event.data);
this.onDeleteprjprojectbilling(event,event.data.billid,((this.prjprojectbillingssource.getPaging().page-1) *this.prjprojectbillingssource.getPaging().perPage)+index);
this.prjprojectbillingssource.refresh();
break;
}
}

*/
prjprojectbillingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectbilling(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectbilling(event,event.data.billid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectbilling(event,event.data.billid,((this.prjprojectbillingssource.getPaging().page-1) *this.prjprojectbillingssource.getPaging().perPage)+event.index);
this.prjprojectbillingssource.refresh();
break;
}
}
prjprojectbillingsonDelete(obj) {
let billid=obj.data.billid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(billid).then(res=>
this.prjprojectbillingsLoadTable()
);
}
}
prjprojectbillingsPaging(val)
{
debugger;
this.prjprojectbillingssource.setPaging(1, val, true);
}

handleprjprojectbillingsGridSelected(event:any) {
this.prjprojectbillingsselectedindex=this.prjprojectmasterservice.prjprojectbillings.findIndex(i => i.billid === event.data.billid);
}
IsprjprojectbillingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectbillingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectbillings
//start of Grid Codes prjprojectobjectives
prjprojectobjectivessettings:any;
prjprojectobjectivessource: any;

showprjprojectobjectivesCheckbox()
{
debugger;
if(this.tblprjprojectobjectivessource.settings['selectMode']== 'multi')this.tblprjprojectobjectivessource.settings['selectMode']= 'single';
else
this.tblprjprojectobjectivessource.settings['selectMode']= 'multi';
this.tblprjprojectobjectivessource.initGrid();
}
deleteprjprojectobjectivesAll()
{
this.tblprjprojectobjectivessource.settings['selectMode'] = 'single';
}
showprjprojectobjectivesFilter()
{
  setTimeout(() => {
  this.SetprjprojectobjectivesTableddConfig();
  });
      if(this.tblprjprojectobjectivessource.settings!=null)this.tblprjprojectobjectivessource.settings['hideSubHeader'] =!this.tblprjprojectobjectivessource.settings['hideSubHeader'];
this.tblprjprojectobjectivessource.initGrid();
}
showprjprojectobjectivesInActive()
{
}
enableprjprojectobjectivesInActive()
{
}
async SetprjprojectobjectivesTableddConfig()
{
if(!this.bfilterPopulateprjprojectobjectives){

this.configservice.getList("currentstatus").then(res=>
{
var datacurrentstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjprojectobjectivescurrentstatus3.push(defaultobj);
for(let i=0; i<datacurrentstatus2.length; i++){
var obj= { value: datacurrentstatus2[i].configkey, title: datacurrentstatus2[i].configtext};
this.dataprjprojectobjectivescurrentstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjprojectobjectivessource.settings);
if(clone.columns['currentstatus']!=undefined)clone.columns['currentstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectobjectivescurrentstatus3)), }, };
if(clone.columns['currentstatus']!=undefined)clone.columns['currentstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjprojectobjectivescurrentstatus3)), }, };
this.tblprjprojectobjectivessource.settings =  clone;
this.tblprjprojectobjectivessource.initGrid();
});
}
this.bfilterPopulateprjprojectobjectives=true;
}
async prjprojectobjectivesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectobjectivesTableConfig()
{
this.prjprojectobjectivessettings = {
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
objectivename: {
title: 'Objective Name',
type: '',
filter:true,
},
target: {
title: 'Target',
type: '',
filter:true,
},
targetdate: {
title: 'Target Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
owner: {
title: 'Owner',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
currentstatus: {
title: 'Current Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjprojectobjectivescurrentstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
nextsteps: {
title: 'Next Steps',
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
sequence: {
title: 'Sequence',
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
prjprojectobjectivesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectobjectivesID)>=0)
{
this.prjprojectobjectivessource=new LocalDataSource();
this.prjprojectobjectivessource.load(this.prjprojectmasterservice.prjprojectobjectives as  any as LocalDataSource);
this.prjprojectobjectivessource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectobjectivesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectobjectives.length == 0)
{
    this.tblprjprojectobjectivessource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectobjective();
    this.prjprojectmasterservice.prjprojectobjectives.push(obj);
    this.prjprojectobjectivessource.refresh();
    if ((this.prjprojectmasterservice.prjprojectobjectives.length / this.prjprojectobjectivessource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectobjectivessource.getPaging().page)
    {
        this.prjprojectobjectivessource.setPage((this.prjprojectmasterservice.prjprojectobjectives.length / this.prjprojectobjectivessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectobjectivessource.grid.edit(this.tblprjprojectobjectivessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectobjectivessource.data.indexOf(event.data);
this.onDeleteprjprojectobjective(event,event.data.objectiveid,((this.prjprojectobjectivessource.getPaging().page-1) *this.prjprojectobjectivessource.getPaging().perPage)+index);
this.prjprojectobjectivessource.refresh();
break;
}
}

*/
prjprojectobjectivesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectobjective(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectobjective(event,event.data.objectiveid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectobjective(event,event.data.objectiveid,((this.prjprojectobjectivessource.getPaging().page-1) *this.prjprojectobjectivessource.getPaging().perPage)+event.index);
this.prjprojectobjectivessource.refresh();
break;
}
}
prjprojectobjectivesonDelete(obj) {
let objectiveid=obj.data.objectiveid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(objectiveid).then(res=>
this.prjprojectobjectivesLoadTable()
);
}
}
prjprojectobjectivesPaging(val)
{
debugger;
this.prjprojectobjectivessource.setPaging(1, val, true);
}

handleprjprojectobjectivesGridSelected(event:any) {
this.prjprojectobjectivesselectedindex=this.prjprojectmasterservice.prjprojectobjectives.findIndex(i => i.objectiveid === event.data.objectiveid);
}

  async prjprojectobjectivesmoveUp() {
    this.prjprojectobjectivesmove(-1);
  }

  async prjprojectobjectivesmove(val) {
    let index=((this.prjprojectobjectivessource.getPaging().page - 1) * this.prjprojectobjectivessource.getPaging().perPage) + this.prjprojectobjectivesselectedindex;
    if (index >= 0) {
      
      var current = this.prjprojectmasterservice.prjprojectobjectives[index];
      var tmp = this.prjprojectmasterservice.prjprojectobjectives[index +val];
      this.prjprojectmasterservice.prjprojectobjectives[index +val] = this.prjprojectmasterservice.prjprojectobjectives[index];
      this.prjprojectmasterservice.prjprojectobjectives[index] = tmp;
      this.prjprojectmasterservice.prjprojectobjectives[index +val].sequence=index +val;
      this.prjprojectmasterservice.prjprojectobjectives[index].sequence=index;
      this.prjprojectobjectivessource.refresh();
      this.prjprojectobjectivesselectedindex=this.prjprojectmasterservice.prjprojectobjectives.findIndex(i => i.objectiveid === current.objectiveid);
      this.tblprjprojectobjectivessource.grid.getRows().forEach((row:any) => {
        if( current.objectiveid == row.data.objectiveid) {
          this.tblprjprojectobjectivessource.grid.selectRow(row);
          
        }
      });
    }
  }

  prjprojectobjectivesmoveDown() {
    return this.prjprojectobjectivesmove(1);
  }
IsprjprojectobjectivesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectobjectivesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectobjectives
//start of Grid Codes prjdailystandups
prjdailystandupssettings:any;
prjdailystandupssource: any;

showprjdailystandupsCheckbox()
{
debugger;
if(this.tblprjdailystandupssource.settings['selectMode']== 'multi')this.tblprjdailystandupssource.settings['selectMode']= 'single';
else
this.tblprjdailystandupssource.settings['selectMode']= 'multi';
this.tblprjdailystandupssource.initGrid();
}
deleteprjdailystandupsAll()
{
this.tblprjdailystandupssource.settings['selectMode'] = 'single';
}
showprjdailystandupsFilter()
{
  setTimeout(() => {
  this.SetprjdailystandupsTableddConfig();
  });
      if(this.tblprjdailystandupssource.settings!=null)this.tblprjdailystandupssource.settings['hideSubHeader'] =!this.tblprjdailystandupssource.settings['hideSubHeader'];
this.tblprjdailystandupssource.initGrid();
}
showprjdailystandupsInActive()
{
}
enableprjdailystandupsInActive()
{
}
async SetprjdailystandupsTableddConfig()
{
if(!this.bfilterPopulateprjdailystandups){
}
this.bfilterPopulateprjdailystandups=true;
}
async prjdailystandupsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjdailystandupsTableConfig()
{
this.prjdailystandupssettings = {
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
currentdate: {
title: 'Current Date',
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
prjdailystandupsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjdailystandupsID)>=0)
{
this.prjdailystandupssource=new LocalDataSource();
this.prjdailystandupssource.load(this.prjprojectmasterservice.prjdailystandups as  any as LocalDataSource);
this.prjdailystandupssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjdailystandupsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjdailystandups.length == 0)
{
    this.tblprjdailystandupssource.grid.createFormShown = true;
}
else
{
    let obj = new prjdailystandup();
    this.prjprojectmasterservice.prjdailystandups.push(obj);
    this.prjdailystandupssource.refresh();
    if ((this.prjprojectmasterservice.prjdailystandups.length / this.prjdailystandupssource.getPaging().perPage).toFixed(0) + 1 != this.prjdailystandupssource.getPaging().page)
    {
        this.prjdailystandupssource.setPage((this.prjprojectmasterservice.prjdailystandups.length / this.prjdailystandupssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjdailystandupssource.grid.edit(this.tblprjdailystandupssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjdailystandupssource.data.indexOf(event.data);
this.onDeleteprjdailystandup(event,event.data.standupid,((this.prjdailystandupssource.getPaging().page-1) *this.prjdailystandupssource.getPaging().perPage)+index);
this.prjdailystandupssource.refresh();
break;
}
}

*/
prjdailystandupsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjdailystandup(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjdailystandup(event,event.data.standupid,this.formid);
break;
case 'delete':
this.onDeleteprjdailystandup(event,event.data.standupid,((this.prjdailystandupssource.getPaging().page-1) *this.prjdailystandupssource.getPaging().perPage)+event.index);
this.prjdailystandupssource.refresh();
break;
}
}
prjdailystandupsonDelete(obj) {
let standupid=obj.data.standupid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(standupid).then(res=>
this.prjdailystandupsLoadTable()
);
}
}
prjdailystandupsPaging(val)
{
debugger;
this.prjdailystandupssource.setPaging(1, val, true);
}

handleprjdailystandupsGridSelected(event:any) {
this.prjdailystandupsselectedindex=this.prjprojectmasterservice.prjdailystandups.findIndex(i => i.standupid === event.data.standupid);
}
IsprjdailystandupsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjdailystandupsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjdailystandups
//start of Grid Codes prjchangerequests
prjchangerequestssettings:any;
prjchangerequestssource: any;

showprjchangerequestsCheckbox()
{
debugger;
if(this.tblprjchangerequestssource.settings['selectMode']== 'multi')this.tblprjchangerequestssource.settings['selectMode']= 'single';
else
this.tblprjchangerequestssource.settings['selectMode']= 'multi';
this.tblprjchangerequestssource.initGrid();
}
deleteprjchangerequestsAll()
{
this.tblprjchangerequestssource.settings['selectMode'] = 'single';
}
showprjchangerequestsFilter()
{
  setTimeout(() => {
  this.SetprjchangerequestsTableddConfig();
  });
      if(this.tblprjchangerequestssource.settings!=null)this.tblprjchangerequestssource.settings['hideSubHeader'] =!this.tblprjchangerequestssource.settings['hideSubHeader'];
this.tblprjchangerequestssource.initGrid();
}
showprjchangerequestsInActive()
{
}
enableprjchangerequestsInActive()
{
}
async SetprjchangerequestsTableddConfig()
{
if(!this.bfilterPopulateprjchangerequests){

this.configservice.getList("changetype").then(res=>
{
var datachangetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestschangetype3.push(defaultobj);
for(let i=0; i<datachangetype2.length; i++){
var obj= { value: datachangetype2[i].configkey, title: datachangetype2[i].configtext};
this.dataprjchangerequestschangetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['changetype']!=undefined)clone.columns['changetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestschangetype3)), }, };
if(clone.columns['changetype']!=undefined)clone.columns['changetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestschangetype3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.dataprjchangerequestspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestspriority3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});

this.configservice.getList("criticality").then(res=>
{
var datacriticality2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestscriticality3.push(defaultobj);
for(let i=0; i<datacriticality2.length; i++){
var obj= { value: datacriticality2[i].configkey, title: datacriticality2[i].configtext};
this.dataprjchangerequestscriticality3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestscriticality3)), }, };
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestscriticality3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});

this.configservice.getList("impact").then(res=>
{
var dataimpact2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestsimpact3.push(defaultobj);
for(let i=0; i<dataimpact2.length; i++){
var obj= { value: dataimpact2[i].configkey, title: dataimpact2[i].configtext};
this.dataprjchangerequestsimpact3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['impact']!=undefined)clone.columns['impact'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsimpact3)), }, };
if(clone.columns['impact']!=undefined)clone.columns['impact'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsimpact3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});

this.configservice.getList("stage").then(res=>
{
var datastage2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestsstage3.push(defaultobj);
for(let i=0; i<datastage2.length; i++){
var obj= { value: datastage2[i].configkey, title: datastage2[i].configtext};
this.dataprjchangerequestsstage3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['stage']!=undefined)clone.columns['stage'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsstage3)), }, };
if(clone.columns['stage']!=undefined)clone.columns['stage'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsstage3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});

this.configservice.getList("risk").then(res=>
{
var datarisk2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestsrisk3.push(defaultobj);
for(let i=0; i<datarisk2.length; i++){
var obj= { value: datarisk2[i].configkey, title: datarisk2[i].configtext};
this.dataprjchangerequestsrisk3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestssource.settings);
if(clone.columns['risk']!=undefined)clone.columns['risk'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsrisk3)), }, };
if(clone.columns['risk']!=undefined)clone.columns['risk'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestsrisk3)), }, };
this.tblprjchangerequestssource.settings =  clone;
this.tblprjchangerequestssource.initGrid();
});
}
this.bfilterPopulateprjchangerequests=true;
}
async prjchangerequestsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjchangerequestsTableConfig()
{
this.prjchangerequestssettings = {
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
reference: {
title: 'Reference',
type: '',
filter:true,
},
requestdate: {
title: 'Request Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requestor: {
title: 'Requestor',
type: 'number',
filter:true,
},
changetype: {
title: 'Change Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestschangetype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reason: {
title: 'Reason',
type: '',
filter:true,
},
products: {
title: 'Products',
type: '',
filter:true,
},
services: {
title: 'Services',
type: '',
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
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
expectedresult: {
title: 'Expected Result',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
workdetails: {
title: 'Work Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
manager: {
title: 'Manager',
type: 'number',
filter:true,
},
retrospective: {
title: 'Retrospective',
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
criticality: {
title: 'Criticality',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestscriticality3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
impact: {
title: 'Impact',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestsimpact3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
stage: {
title: 'Stage',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestsstage3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
risk: {
title: 'Risk',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestsrisk3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
impacteditems: {
title: 'Impacted Items',
type: '',
filter:true,
},
impactedservices: {
title: 'Impacted Services',
type: '',
filter:true,
},
impactedproducts: {
title: 'Impacted Products',
type: '',
filter:true,
},
estimatedduration: {
title: 'Estimated Duration',
type: '',
filter:true,
},
estimatedcost: {
title: 'Estimated Cost',
type: 'number',
filter:true,
},
actualduration: {
title: 'Actual Duration',
type: '',
filter:true,
},
actualcost: {
title: 'Actual Cost',
type: 'number',
filter:true,
},
verifiedby: {
title: 'Verified By',
type: 'number',
filter:true,
},
verifieddate: {
title: 'Verified Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
verifiernotes: {
title: 'Verifier Notes',
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
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
return ret;
},
},
},
};
}
prjchangerequestsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjchangerequestsID)>=0)
{
this.prjchangerequestssource=new LocalDataSource();
this.prjchangerequestssource.load(this.prjprojectmasterservice.prjchangerequests as  any as LocalDataSource);
this.prjchangerequestssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjchangerequestsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjchangerequests.length == 0)
{
    this.tblprjchangerequestssource.grid.createFormShown = true;
}
else
{
    let obj = new prjchangerequest();
    this.prjprojectmasterservice.prjchangerequests.push(obj);
    this.prjchangerequestssource.refresh();
    if ((this.prjprojectmasterservice.prjchangerequests.length / this.prjchangerequestssource.getPaging().perPage).toFixed(0) + 1 != this.prjchangerequestssource.getPaging().page)
    {
        this.prjchangerequestssource.setPage((this.prjprojectmasterservice.prjchangerequests.length / this.prjchangerequestssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjchangerequestssource.grid.edit(this.tblprjchangerequestssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjchangerequestssource.data.indexOf(event.data);
this.onDeleteprjchangerequest(event,event.data.changeid,((this.prjchangerequestssource.getPaging().page-1) *this.prjchangerequestssource.getPaging().perPage)+index);
this.prjchangerequestssource.refresh();
break;
}
}

*/
prjchangerequestsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjchangerequest(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjchangerequest(event,event.data.changeid,this.formid);
break;
case 'delete':
this.onDeleteprjchangerequest(event,event.data.changeid,((this.prjchangerequestssource.getPaging().page-1) *this.prjchangerequestssource.getPaging().perPage)+event.index);
this.prjchangerequestssource.refresh();
break;
}
}
prjchangerequestsonDelete(obj) {
let changeid=obj.data.changeid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(changeid).then(res=>
this.prjchangerequestsLoadTable()
);
}
}
prjchangerequestsPaging(val)
{
debugger;
this.prjchangerequestssource.setPaging(1, val, true);
}

handleprjchangerequestsGridSelected(event:any) {
this.prjchangerequestsselectedindex=this.prjprojectmasterservice.prjchangerequests.findIndex(i => i.changeid === event.data.changeid);
}
IsprjchangerequestsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjchangerequestsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjchangerequests
//start of Grid Codes prjreleases
prjreleasessettings:any;
prjreleasessource: any;

showprjreleasesCheckbox()
{
debugger;
if(this.tblprjreleasessource.settings['selectMode']== 'multi')this.tblprjreleasessource.settings['selectMode']= 'single';
else
this.tblprjreleasessource.settings['selectMode']= 'multi';
this.tblprjreleasessource.initGrid();
}
deleteprjreleasesAll()
{
this.tblprjreleasessource.settings['selectMode'] = 'single';
}
showprjreleasesFilter()
{
  setTimeout(() => {
  this.SetprjreleasesTableddConfig();
  });
      if(this.tblprjreleasessource.settings!=null)this.tblprjreleasessource.settings['hideSubHeader'] =!this.tblprjreleasessource.settings['hideSubHeader'];
this.tblprjreleasessource.initGrid();
}
showprjreleasesInActive()
{
}
enableprjreleasesInActive()
{
}
async SetprjreleasesTableddConfig()
{
if(!this.bfilterPopulateprjreleases){

this.configservice.getList("releasecategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasescategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.dataprjreleasescategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasescategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasescategory3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("releasetype").then(res=>
{
var datatype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasestype3.push(defaultobj);
for(let i=0; i<datatype2.length; i++){
var obj= { value: datatype2[i].configkey, title: datatype2[i].configtext};
this.dataprjreleasestype3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['type']!=undefined)clone.columns['type'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasestype3)), }, };
if(clone.columns['type']!=undefined)clone.columns['type'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasestype3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasespriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.dataprjreleasespriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasespriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasespriority3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("criticality").then(res=>
{
var datacriticality2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasescriticality3.push(defaultobj);
for(let i=0; i<datacriticality2.length; i++){
var obj= { value: datacriticality2[i].configkey, title: datacriticality2[i].configtext};
this.dataprjreleasescriticality3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasescriticality3)), }, };
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasescriticality3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("impact").then(res=>
{
var dataimpact2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasesimpact3.push(defaultobj);
for(let i=0; i<dataimpact2.length; i++){
var obj= { value: dataimpact2[i].configkey, title: dataimpact2[i].configtext};
this.dataprjreleasesimpact3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['impact']!=undefined)clone.columns['impact'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesimpact3)), }, };
if(clone.columns['impact']!=undefined)clone.columns['impact'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesimpact3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("risk").then(res=>
{
var datarisk2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasesrisk3.push(defaultobj);
for(let i=0; i<datarisk2.length; i++){
var obj= { value: datarisk2[i].configkey, title: datarisk2[i].configtext};
this.dataprjreleasesrisk3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['risk']!=undefined)clone.columns['risk'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesrisk3)), }, };
if(clone.columns['risk']!=undefined)clone.columns['risk'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesrisk3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});

this.configservice.getList("releasestatus").then(res=>
{
var datareleasestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleasesreleasestatus3.push(defaultobj);
for(let i=0; i<datareleasestatus2.length; i++){
var obj= { value: datareleasestatus2[i].configkey, title: datareleasestatus2[i].configtext};
this.dataprjreleasesreleasestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleasessource.settings);
if(clone.columns['releasestatus']!=undefined)clone.columns['releasestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesreleasestatus3)), }, };
if(clone.columns['releasestatus']!=undefined)clone.columns['releasestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleasesreleasestatus3)), }, };
this.tblprjreleasessource.settings =  clone;
this.tblprjreleasessource.initGrid();
});
}
this.bfilterPopulateprjreleases=true;
}
async prjreleasesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjreleasesTableConfig()
{
this.prjreleasessettings = {
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
requestor: {
title: 'Requestor',
type: 'number',
filter:true,
},
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasescategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
type: {
title: 'Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasestype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
releaseby: {
title: 'Release By',
type: 'number',
filter:true,
},
audience: {
title: 'Audience',
type: '',
filter:true,
},
criticality: {
title: 'Criticality',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasescriticality3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
impact: {
title: 'Impact',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasesimpact3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
risk: {
title: 'Risk',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasesrisk3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
impacteditems: {
title: 'Impacted Items',
type: '',
filter:true,
},
impactedservices: {
title: 'Impacted Services',
type: '',
filter:true,
},
impactedproducts: {
title: 'Impacted Products',
type: '',
filter:true,
},
estimatedstartdate: {
title: 'Estimated Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
estimatedenddate: {
title: 'Estimated End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualstartdate: {
title: 'Actual Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualenddate: {
title: 'Actual End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
title: {
title: 'Title',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
releasestatus: {
title: 'Release Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleasesreleasestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
notes: {
title: 'Notes',
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
},
};
}
prjreleasesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjreleasesID)>=0)
{
this.prjreleasessource=new LocalDataSource();
this.prjreleasessource.load(this.prjprojectmasterservice.prjreleases as  any as LocalDataSource);
this.prjreleasessource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjreleasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjreleases.length == 0)
{
    this.tblprjreleasessource.grid.createFormShown = true;
}
else
{
    let obj = new prjrelease();
    this.prjprojectmasterservice.prjreleases.push(obj);
    this.prjreleasessource.refresh();
    if ((this.prjprojectmasterservice.prjreleases.length / this.prjreleasessource.getPaging().perPage).toFixed(0) + 1 != this.prjreleasessource.getPaging().page)
    {
        this.prjreleasessource.setPage((this.prjprojectmasterservice.prjreleases.length / this.prjreleasessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjreleasessource.grid.edit(this.tblprjreleasessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjreleasessource.data.indexOf(event.data);
this.onDeleteprjrelease(event,event.data.releaseid,((this.prjreleasessource.getPaging().page-1) *this.prjreleasessource.getPaging().perPage)+index);
this.prjreleasessource.refresh();
break;
}
}

*/
prjreleasesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjrelease(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjrelease(event,event.data.releaseid,this.formid);
break;
case 'delete':
this.onDeleteprjrelease(event,event.data.releaseid,((this.prjreleasessource.getPaging().page-1) *this.prjreleasessource.getPaging().perPage)+event.index);
this.prjreleasessource.refresh();
break;
}
}
prjreleasesonDelete(obj) {
let releaseid=obj.data.releaseid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(releaseid).then(res=>
this.prjreleasesLoadTable()
);
}
}
prjreleasesPaging(val)
{
debugger;
this.prjreleasessource.setPaging(1, val, true);
}

handleprjreleasesGridSelected(event:any) {
this.prjreleasesselectedindex=this.prjprojectmasterservice.prjreleases.findIndex(i => i.releaseid === event.data.releaseid);
}
IsprjreleasesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjreleasesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjreleases
//start of Grid Codes proprocessgaps
proprocessgapssettings:any;
proprocessgapssource: any;

showproprocessgapsCheckbox()
{
debugger;
if(this.tblproprocessgapssource.settings['selectMode']== 'multi')this.tblproprocessgapssource.settings['selectMode']= 'single';
else
this.tblproprocessgapssource.settings['selectMode']= 'multi';
this.tblproprocessgapssource.initGrid();
}
deleteproprocessgapsAll()
{
this.tblproprocessgapssource.settings['selectMode'] = 'single';
}
showproprocessgapsFilter()
{
  setTimeout(() => {
  this.SetproprocessgapsTableddConfig();
  });
      if(this.tblproprocessgapssource.settings!=null)this.tblproprocessgapssource.settings['hideSubHeader'] =!this.tblproprocessgapssource.settings['hideSubHeader'];
this.tblproprocessgapssource.initGrid();
}
showproprocessgapsInActive()
{
}
enableproprocessgapsInActive()
{
}
async SetproprocessgapsTableddConfig()
{
if(!this.bfilterPopulateproprocessgaps){

this.configservice.getList("processresult").then(res=>
{
var datacurrentresult2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataproprocessgapscurrentresult3.push(defaultobj);
for(let i=0; i<datacurrentresult2.length; i++){
var obj= { value: datacurrentresult2[i].configkey, title: datacurrentresult2[i].configtext};
this.dataproprocessgapscurrentresult3.push(obj);
}
var clone = this.sharedService.clone(this.tblproprocessgapssource.settings);
if(clone.columns['currentresult']!=undefined)clone.columns['currentresult'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataproprocessgapscurrentresult3)), }, };
if(clone.columns['currentresult']!=undefined)clone.columns['currentresult'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataproprocessgapscurrentresult3)), }, };
this.tblproprocessgapssource.settings =  clone;
this.tblproprocessgapssource.initGrid();
});

this.configservice.getList("processresult").then(res=>
{
var datadesiredresult2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataproprocessgapsdesiredresult3.push(defaultobj);
for(let i=0; i<datadesiredresult2.length; i++){
var obj= { value: datadesiredresult2[i].configkey, title: datadesiredresult2[i].configtext};
this.dataproprocessgapsdesiredresult3.push(obj);
}
var clone = this.sharedService.clone(this.tblproprocessgapssource.settings);
if(clone.columns['desiredresult']!=undefined)clone.columns['desiredresult'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataproprocessgapsdesiredresult3)), }, };
if(clone.columns['desiredresult']!=undefined)clone.columns['desiredresult'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataproprocessgapsdesiredresult3)), }, };
this.tblproprocessgapssource.settings =  clone;
this.tblproprocessgapssource.initGrid();
});
}
this.bfilterPopulateproprocessgaps=true;
}
async proprocessgapsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetproprocessgapsTableConfig()
{
this.proprocessgapssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: !this.showview, // true,
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
reference: {
title: 'Reference',
type: '',
filter:true,
},
processowner: {
title: 'Process Owner',
type: 'number',
filter:true,
},
process: {
title: 'Process',
type: 'number',
filter:true,
},
processstep: {
title: 'Process Step',
type: 'number',
filter:true,
},
currentresult: {
title: 'Current Result',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataproprocessgapscurrentresult3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
desiredresult: {
title: 'Desired Result',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataproprocessgapsdesiredresult3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
actionitems: {
title: 'Action Items',
type: '',
filter:true,
},
targetdate: {
title: 'Target Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
notes: {
title: 'Notes',
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
},
};
}
proprocessgapsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.proprocessgapsID)>=0)
{
this.proprocessgapssource=new LocalDataSource();
this.proprocessgapssource.load(this.prjprojectmasterservice.proprocessgaps as  any as LocalDataSource);
this.proprocessgapssource.setPaging(1, 20, true);
}
}
proprocessgapsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.proprocessgaps.length == 0)
{
    this.tblproprocessgapssource.grid.createFormShown = true;
}
else
{
    let obj = new proprocessgap();
    this.prjprojectmasterservice.proprocessgaps.push(obj);
    this.proprocessgapssource.refresh();
    if ((this.prjprojectmasterservice.proprocessgaps.length / this.proprocessgapssource.getPaging().perPage).toFixed(0) + 1 != this.proprocessgapssource.getPaging().page)
    {
        this.proprocessgapssource.setPage((this.prjprojectmasterservice.proprocessgaps.length / this.proprocessgapssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblproprocessgapssource.grid.edit(this.tblproprocessgapssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.proprocessgapssource.data.indexOf(event.data);
this.onDeleteproprocessgap(event,event.data.gapid,((this.proprocessgapssource.getPaging().page-1) *this.proprocessgapssource.getPaging().perPage)+index);
this.proprocessgapssource.refresh();
break;
}
}
proprocessgapsPaging(val)
{
debugger;
this.proprocessgapssource.setPaging(1, val, true);
}

handleproprocessgapsGridSelected(event:any) {
this.proprocessgapsselectedindex=this.prjprojectmasterservice.proprocessgaps.findIndex(i => i.gapid === event.data.gapid);
}
IsproprocessgapsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.proprocessgapsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes proprocessgaps
//start of Grid Codes bousers
onCustombousersAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bousermasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bouserssettings:any;
bouserssource: any;

showbousersCheckbox()
{
debugger;
if(this.tblbouserssource.settings['selectMode']== 'multi')this.tblbouserssource.settings['selectMode']= 'single';
else
this.tblbouserssource.settings['selectMode']= 'multi';
this.tblbouserssource.initGrid();
}
deletebousersAll()
{
this.tblbouserssource.settings['selectMode'] = 'single';
}
showbousersFilter()
{
  setTimeout(() => {
  this.SetbousersTableddConfig();
  });
      if(this.tblbouserssource.settings!=null)this.tblbouserssource.settings['hideSubHeader'] =!this.tblbouserssource.settings['hideSubHeader'];
this.tblbouserssource.initGrid();
}
showbousersInActive()
{
}
enablebousersInActive()
{
}
async SetbousersTableddConfig()
{
if(!this.bfilterPopulatebousers){
}
this.bfilterPopulatebousers=true;
}
async bousersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbousersTableConfig()
{
this.bouserssettings = {
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
sourceuserid: {
title: 'Source User',
type: '',
},
userid: {
title: 'User',
type: '',
},
usercode: {
title: 'Usercode',
type: '',
},
username: {
title: 'Username',
type: '',
},
},
};
}
bousersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousersID)>=0)
{
this.bouserssource=new LocalDataSource();
this.bouserssource.load(this.prjprojectmasterservice.bousers as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbouserssource!=null)
{this.tblbouserssource.grid.getRows().forEach((row:any) => {
if(row.data.sourceuserid!=null && row.data.sourceuserid!="")
{
this.prjprojectmasterservice.Insertbousers.push(row.data);
this.tblbouserssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bousersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.bousers.length == 0)
{
    this.tblbouserssource.grid.createFormShown = true;
}
else
{
    let obj = new bouser();
    this.prjprojectmasterservice.bousers.push(obj);
    this.bouserssource.refresh();
    if ((this.prjprojectmasterservice.bousers.length / this.bouserssource.getPaging().perPage).toFixed(0) + 1 != this.bouserssource.getPaging().page)
    {
        this.bouserssource.setPage((this.prjprojectmasterservice.bousers.length / this.bouserssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbouserssource.grid.edit(this.tblbouserssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bouserssource.data.indexOf(event.data);
this.onDeletebouser(event,event.data.sourceuserid,((this.bouserssource.getPaging().page-1) *this.bouserssource.getPaging().perPage)+index);
this.bouserssource.refresh();
break;
}
}

*/
bousersPaging(val)
{
debugger;
this.bouserssource.setPaging(1, val, true);
}

handlebousersGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.sourceuserid==null || event.data.sourceuserid=="")
{
var obj={sourcereference:this.formid,userid:event.data.userid}
this.prjprojectmasterservice.Insertbousers.push(obj as any);
}
else
{
var deletedids=this.DeletedbouserIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.sourceuserid)
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
if(event.data.sourceuserid!=null && event.data.sourceuserid!="")this.DeletedbouserIDs += event.data.sourceuserid + ","; 
}
}
IsbousersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bousers
//start of Grid Codes prjprojectoutputs
prjprojectoutputssettings:any;
prjprojectoutputssource: any;

showprjprojectoutputsCheckbox()
{
debugger;
if(this.tblprjprojectoutputssource.settings['selectMode']== 'multi')this.tblprjprojectoutputssource.settings['selectMode']= 'single';
else
this.tblprjprojectoutputssource.settings['selectMode']= 'multi';
this.tblprjprojectoutputssource.initGrid();
}
deleteprjprojectoutputsAll()
{
this.tblprjprojectoutputssource.settings['selectMode'] = 'single';
}
showprjprojectoutputsFilter()
{
  setTimeout(() => {
  this.SetprjprojectoutputsTableddConfig();
  });
      if(this.tblprjprojectoutputssource.settings!=null)this.tblprjprojectoutputssource.settings['hideSubHeader'] =!this.tblprjprojectoutputssource.settings['hideSubHeader'];
this.tblprjprojectoutputssource.initGrid();
}
showprjprojectoutputsInActive()
{
}
enableprjprojectoutputsInActive()
{
}
async SetprjprojectoutputsTableddConfig()
{
if(!this.bfilterPopulateprjprojectoutputs){
}
this.bfilterPopulateprjprojectoutputs=true;
}
async prjprojectoutputsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectoutputsTableConfig()
{
this.prjprojectoutputssettings = {
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
output: {
title: 'Output',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
outputby: {
title: 'Output By',
type: 'number',
filter:true,
},
verifiedby: {
title: 'Verified By',
type: 'number',
filter:true,
},
verifieddate: {
title: 'Verified Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
prjprojectoutputsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectoutputsID)>=0)
{
this.prjprojectoutputssource=new LocalDataSource();
this.prjprojectoutputssource.load(this.prjprojectmasterservice.prjprojectoutputs as  any as LocalDataSource);
this.prjprojectoutputssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectoutputsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectoutputs.length == 0)
{
    this.tblprjprojectoutputssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectoutput();
    this.prjprojectmasterservice.prjprojectoutputs.push(obj);
    this.prjprojectoutputssource.refresh();
    if ((this.prjprojectmasterservice.prjprojectoutputs.length / this.prjprojectoutputssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectoutputssource.getPaging().page)
    {
        this.prjprojectoutputssource.setPage((this.prjprojectmasterservice.prjprojectoutputs.length / this.prjprojectoutputssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectoutputssource.grid.edit(this.tblprjprojectoutputssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectoutputssource.data.indexOf(event.data);
this.onDeleteprjprojectoutput(event,event.data.outputid,((this.prjprojectoutputssource.getPaging().page-1) *this.prjprojectoutputssource.getPaging().perPage)+index);
this.prjprojectoutputssource.refresh();
break;
}
}

*/
prjprojectoutputsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectoutput(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectoutput(event,event.data.outputid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectoutput(event,event.data.outputid,((this.prjprojectoutputssource.getPaging().page-1) *this.prjprojectoutputssource.getPaging().perPage)+event.index);
this.prjprojectoutputssource.refresh();
break;
}
}
prjprojectoutputsonDelete(obj) {
let outputid=obj.data.outputid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(outputid).then(res=>
this.prjprojectoutputsLoadTable()
);
}
}
prjprojectoutputsPaging(val)
{
debugger;
this.prjprojectoutputssource.setPaging(1, val, true);
}

handleprjprojectoutputsGridSelected(event:any) {
this.prjprojectoutputsselectedindex=this.prjprojectmasterservice.prjprojectoutputs.findIndex(i => i.outputid === event.data.outputid);
}
IsprjprojectoutputsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectoutputsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectoutputs
//start of Grid Codes prjprojectrequirements
prjprojectrequirementssettings:any;
prjprojectrequirementssource: any;

showprjprojectrequirementsCheckbox()
{
debugger;
if(this.tblprjprojectrequirementssource.settings['selectMode']== 'multi')this.tblprjprojectrequirementssource.settings['selectMode']= 'single';
else
this.tblprjprojectrequirementssource.settings['selectMode']= 'multi';
this.tblprjprojectrequirementssource.initGrid();
}
deleteprjprojectrequirementsAll()
{
this.tblprjprojectrequirementssource.settings['selectMode'] = 'single';
}
showprjprojectrequirementsFilter()
{
  setTimeout(() => {
  this.SetprjprojectrequirementsTableddConfig();
  });
      if(this.tblprjprojectrequirementssource.settings!=null)this.tblprjprojectrequirementssource.settings['hideSubHeader'] =!this.tblprjprojectrequirementssource.settings['hideSubHeader'];
this.tblprjprojectrequirementssource.initGrid();
}
showprjprojectrequirementsInActive()
{
}
enableprjprojectrequirementsInActive()
{
}
async SetprjprojectrequirementsTableddConfig()
{
if(!this.bfilterPopulateprjprojectrequirements){
}
this.bfilterPopulateprjprojectrequirements=true;
}
async prjprojectrequirementsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetprjprojectrequirementsTableConfig()
{
this.prjprojectrequirementssettings = {
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
requirement: {
title: 'Requirement',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
authorid: {
title: 'Author',
type: 'number',
filter:true,
},
reviewerid: {
title: 'Reviewer',
type: 'number',
filter:true,
},
tousers: {
title: 'To Users',
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
prjprojectrequirementsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectrequirementsID)>=0)
{
this.prjprojectrequirementssource=new LocalDataSource();
this.prjprojectrequirementssource.load(this.prjprojectmasterservice.prjprojectrequirements as  any as LocalDataSource);
this.prjprojectrequirementssource.setPaging(1, 20, true);
}
}

//external to inline
/*
prjprojectrequirementsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.prjprojectmasterservice.prjprojectrequirements.length == 0)
{
    this.tblprjprojectrequirementssource.grid.createFormShown = true;
}
else
{
    let obj = new prjprojectrequirement();
    this.prjprojectmasterservice.prjprojectrequirements.push(obj);
    this.prjprojectrequirementssource.refresh();
    if ((this.prjprojectmasterservice.prjprojectrequirements.length / this.prjprojectrequirementssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectrequirementssource.getPaging().page)
    {
        this.prjprojectrequirementssource.setPage((this.prjprojectmasterservice.prjprojectrequirements.length / this.prjprojectrequirementssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjprojectrequirementssource.grid.edit(this.tblprjprojectrequirementssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjprojectrequirementssource.data.indexOf(event.data);
this.onDeleteprjprojectrequirement(event,event.data.requirementid,((this.prjprojectrequirementssource.getPaging().page-1) *this.prjprojectrequirementssource.getPaging().perPage)+index);
this.prjprojectrequirementssource.refresh();
break;
}
}

*/
prjprojectrequirementsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditprjprojectrequirement(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditprjprojectrequirement(event,event.data.requirementid,this.formid);
break;
case 'delete':
this.onDeleteprjprojectrequirement(event,event.data.requirementid,((this.prjprojectrequirementssource.getPaging().page-1) *this.prjprojectrequirementssource.getPaging().perPage)+event.index);
this.prjprojectrequirementssource.refresh();
break;
}
}
prjprojectrequirementsonDelete(obj) {
let requirementid=obj.data.requirementid;
if (confirm('Are you sure to delete this record ?')) {
this.prjprojectmasterservice.deleteprjprojectmaster(requirementid).then(res=>
this.prjprojectrequirementsLoadTable()
);
}
}
prjprojectrequirementsPaging(val)
{
debugger;
this.prjprojectrequirementssource.setPaging(1, val, true);
}

handleprjprojectrequirementsGridSelected(event:any) {
this.prjprojectrequirementsselectedindex=this.prjprojectmasterservice.prjprojectrequirements.findIndex(i => i.requirementid === event.data.requirementid);
}
IsprjprojectrequirementsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.prjprojectrequirementsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes prjprojectrequirements

}



