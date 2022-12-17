import { camsassetmasterService } from './../../../service/camsassetmaster.service';
import { camsassetmaster } from './../../../model/camsassetmaster.model';
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
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { erpitemmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
//popups
import { erpsuppliermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
//popups
import { erppurchaseordermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erppurchaseordermaster.service';
//popups
import { erpgoodsreceiptmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpgoodsreceiptmaster.service';
//popups
import { erpcustomerinvoice} from '../../../../../../n-tire-procurement-app/src/app/model/erpcustomerinvoice.model';
import { erpcustomerinvoiceComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpcustomerinvoice/erpcustomerinvoice.component';
import { erpcustomerinvoiceService } from '../../../../../../n-tire-procurement-app/src/app/service/erpcustomerinvoice.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { camsassetgroup} from './../../../model/camsassetgroup.model';
import { camsassetgroupComponent } from './../../../pages/forms/camsassetgroup/camsassetgroup.component';
import { camsassetgroupService } from './../../../service/camsassetgroup.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpcontractordermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpcontractordermaster.model';
import { erpcontractordermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpcontractordermaster/erpcontractordermaster.component';
import { erpcontractordermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpcontractordermaster.service';
//popups
import { hrmsloanschememaster} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsloanschememaster.model';
import { hrmsloanschememasterComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsloanschememaster/hrmsloanschememaster.component';
import { hrmsloanschememasterService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsloanschememaster.service';
//popups
//detail table services
import { camspmschedule } from './../../../model/camspmschedule.model';
import { camspmscheduleComponent } from './../../../pages/forms/camspmschedule/camspmschedule.component';
//FK services
import { camspmmaster,IcamspmmasterResponse } from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
import { camsdepreciationschedule } from './../../../model/camsdepreciationschedule.model';
import { camsdepreciationscheduleComponent } from './../../../pages/forms/camsdepreciationschedule/camsdepreciationschedule.component';
//FK services
import { camsassetreadinghistory } from './../../../model/camsassetreadinghistory.model';
import { camsassetreadinghistoryComponent } from './../../../pages/forms/camsassetreadinghistory/camsassetreadinghistory.component';
//FK services
import { camsassettransferdetail } from './../../../model/camsassettransferdetail.model';
import { camsassettransferdetailComponent } from './../../../pages/forms/camsassettransferdetail/camsassettransferdetail.component';
//FK services
import { camsassetreading } from './../../../model/camsassetreading.model';
import { camsassetreadingComponent } from './../../../pages/forms/camsassetreading/camsassetreading.component';
//FK services
import { camsworkorder } from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
//FK services
import { camspmscheduleService } from './../../../service/camspmschedule.service';
import { camspmscheduletask,IcamspmscheduletaskResponse } from './../../../model/camspmscheduletask.model';
import { camspmscheduletaskComponent } from './../../../pages/forms/camspmscheduletask/camspmscheduletask.component';
import { camspmscheduletaskService } from './../../../service/camspmscheduletask.service';
import { bobranchsublocation,IbobranchsublocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchsublocation.model';
import { bobranchsublocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component';
import { bobranchsublocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchsublocation.service';
import { camsassetcost } from './../../../model/camsassetcost.model';
import { camsassetcostComponent } from './../../../pages/forms/camsassetcost/camsassetcost.component';
//FK services
import { camsassetaddition } from './../../../model/camsassetaddition.model';
import { camsassetadditionComponent } from './../../../pages/forms/camsassetaddition/camsassetaddition.component';
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
selector: 'app-camsassetmaster',
templateUrl: './camsassetmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetmasterComponent implements OnInit {
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
bfilterPopulatecamsassetmasters:boolean=false;
datacamsassetmastersbranchid3:any=[];
datacamsassetmasterslocationid3:any=[];
datacamsassetmastersitemid3:any=[];
datacamsassetmastersacquisitionmethod3:any=[];
datacamsassetmasterssupplierid3:any=[];
datacamsassetmastersporeference3:any=[];
datacamsassetmastersgrnid3:any=[];
datacamsassetmastersinvoicereference3:any=[];
datacamsassetmastersdepartmentid3:any=[];
datacamsassetmastersassetgroupid3:any=[];
datacamsassetmastersparentid3:any=[];
datacamsassetmastersassetstatus3:any=[];
datacamsassetmastersassettype3:any=[];
datacamsassetmasterscategory3:any=[];
datacamsassetmasterssubcategory3:any=[];
datacamsassetmasterscriticality3:any=[];
datacamsassetmastersassignedto3:any=[];
datacamsassetmasterscontractorid3:any=[];
datacamsassetmasterscontractid3:any=[];
datacamsassetmastersamcstatus3:any=[];
datacamsassetmastersinsurancestatus3:any=[];
datacamsassetmasterswarrantystatus3:any=[];
datacamsassetmastersdisposalmethod3:any=[];
datacamsassetmastersdisposedby3:any=[];
datacamsassetmastersdisposedreason3:any=[];
datacamsassetmastersloanid3:any=[];
datacamsassetmastersuom3:any=[];
datacamsassetmasterslicensestatus3:any=[];
datacamspmschedulespmlocationid3:any=[];
datacamspmschedulesworktype3:any=[];
datacamspmschedulesmeasurementmeter3:any=[];
datacamspmschedulesfrequencyunit3:any=[];
datacamspmschedulespmtype3:any=[];
datacamspmschedulespmid3:any=[];
datacamspmschedulespmgenerationtype3:any=[];
datacamspmschedulesassetid3:any=[];
datacamspmschedulespmstatus3:any=[];
bfilterPopulatecamspmschedules:boolean=false;
datacamsdepreciationschedulesassetid3:any=[];
bfilterPopulatecamsdepreciationschedules:boolean=false;
datacamsassetreadinghistoriesmeasurementmeter3:any=[];
datacamsassetreadinghistoriesassetid3:any=[];
datacamsassetreadinghistoriesreadingpointcode3:any=[];
datacamsassetreadinghistoriesreadingtype3:any=[];
bfilterPopulatecamsassetreadinghistories:boolean=false;
datacamsassettransferdetailsassetid3:any=[];
bfilterPopulatecamsassettransferdetails:boolean=false;
datacamsassetreadingsassetid3:any=[];
datacamsassetreadingsmeasurementmeter3:any=[];
datacamsassetreadingsreadingtype3:any=[];
datacamsassetreadingsreadingpointcode3:any=[];
bfilterPopulatecamsassetreadings:boolean=false;
datacamsworkordersreportedby3:any=[];
datacamsworkordersassetid3:any=[];
datacamsworkordersrequestorid3:any=[];
datacamsworkorderssupplierid3:any=[];
datacamsworkorderslocationid3:any=[];
datacamsworkordersrequesttype3:any=[];
datacamsworkordersscheduleid3:any=[];
datacamsworkordersassetstatus3:any=[];
datacamsworkordersworkpersontype3:any=[];
datacamsworkordersorderstatus3:any=[];
datacamsworkorderspriority3:any=[];
datacamsworkorderscriticality3:any=[];
datacamsworkordersworktype3:any=[];
datacamsworkordersexpenseid3:any=[];
datacamsworkordersscheduletaskid3:any=[];
datacamsworkorderssolution3:any=[];
datacamsworkordersproblem3:any=[];
datacamsworkordersrootcause3:any=[];
datacamsworkorderscolor3:any=[];
datacamsworkorderssublocationid3:any=[];
bfilterPopulatecamsworkorders:boolean=false;
datacamsassetcostsassetid3:any=[];
datacamsassetcostscosttype3:any=[];
bfilterPopulatecamsassetcosts:boolean=false;
datacamsassetadditionsitemid3:any=[];
datacamsassetadditionsassetid3:any=[];
datacamsassetadditionsaddedby3:any=[];
datacamsassetadditionspoid3:any=[];
datacamsassetadditionsaddedreason3:any=[];
datacamsassetadditionsacquisitionmethod3:any=[];
datacamsassetadditionsuom3:any=[];
bfilterPopulatecamsassetadditions:boolean=false;
@ViewChild('tblcamspmschedulessource',{static:false}) tblcamspmschedulessource: Ng2SmartTableComponent;
@ViewChild('tblcamsdepreciationschedulessource',{static:false}) tblcamsdepreciationschedulessource: Ng2SmartTableComponent;
@ViewChild('tblcamsassetreadinghistoriessource',{static:false}) tblcamsassetreadinghistoriessource: Ng2SmartTableComponent;
@ViewChild('tblcamsassettransferdetailssource',{static:false}) tblcamsassettransferdetailssource: Ng2SmartTableComponent;
@ViewChild('tblcamsassetreadingssource',{static:false}) tblcamsassetreadingssource: Ng2SmartTableComponent;
@ViewChild('tblcamsworkorderssource',{static:false}) tblcamsworkorderssource: Ng2SmartTableComponent;
@ViewChild('tblcamsassetcostssource',{static:false}) tblcamsassetcostssource: Ng2SmartTableComponent;
@ViewChild('tblcamsassetadditionssource',{static:false}) tblcamsassetadditionssource: Ng2SmartTableComponent;
 camsassetmasterForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
acquisitionmethodList: boconfigvalue[];
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
poreferenceList: erppurchaseordermaster[];
poreferenceoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poreference_erppurchaseordermastersForm: FormGroup;//autocomplete
poreference_erppurchaseordermastersoptions:any;//autocomplete
poreference_erppurchaseordermastersformatter:any;//autocomplete
grnidList: erpgoodsreceiptmaster[];
grnidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnid_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnid_erpgoodsreceiptmastersoptions:any;//autocomplete
grnid_erpgoodsreceiptmastersformatter:any;//autocomplete
invoicereferenceList: erpcustomerinvoice[];
invoicereferenceoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
invoicereference_erpcustomerinvoicesForm: FormGroup;//autocomplete
invoicereference_erpcustomerinvoicesoptions:any;//autocomplete
invoicereference_erpcustomerinvoicesformatter:any;//autocomplete
departmentidList: bomasterdata[];
assetgroupidList: camsassetgroup[];
assetgroupidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetgroupid_camsassetgroupsForm: FormGroup;//autocomplete
assetgroupid_camsassetgroupsoptions:any;//autocomplete
assetgroupid_camsassetgroupsformatter:any;//autocomplete
parentidList: camsassetmaster[];
parentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
parentid_camsassetmastersForm: FormGroup;//autocomplete
parentid_camsassetmastersoptions:any;//autocomplete
parentid_camsassetmastersformatter:any;//autocomplete
assetstatusList: boconfigvalue[];
assettypeList: boconfigvalue[];
categoryList: boconfigvalue[];
subcategoryList: boconfigvalue[];
criticalityList: boconfigvalue[];
assignedtoList: bousermaster[];
assignedtooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignedto_bousermastersForm: FormGroup;//autocomplete
assignedto_bousermastersoptions:any;//autocomplete
assignedto_bousermastersformatter:any;//autocomplete
contractoridList: erpsuppliermaster[];
contractoridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractorid_erpsuppliermastersForm: FormGroup;//autocomplete
contractorid_erpsuppliermastersoptions:any;//autocomplete
contractorid_erpsuppliermastersformatter:any;//autocomplete
contractidList: erpcontractordermaster[];
contractidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractid_erpcontractordermastersForm: FormGroup;//autocomplete
contractid_erpcontractordermastersoptions:any;//autocomplete
contractid_erpcontractordermastersformatter:any;//autocomplete
amcstatusList: boconfigvalue[];
insurancestatusList: boconfigvalue[];
warrantystatusList: boconfigvalue[];
disposalmethodList: boconfigvalue[];
disposedbyList: bousermaster[];
disposedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
disposedby_bousermastersForm: FormGroup;//autocomplete
disposedby_bousermastersoptions:any;//autocomplete
disposedby_bousermastersformatter:any;//autocomplete
disposedreasonList: boconfigvalue[];
loanidList: hrmsloanschememaster[];
loanidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
loanid_hrmsloanschememastersForm: FormGroup;//autocomplete
loanid_hrmsloanschememastersoptions:any;//autocomplete
loanid_hrmsloanschememastersformatter:any;//autocomplete
uomList: boconfigvalue[];
licensestatusList: boconfigvalue[];
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
@ViewChild('imageurl',{static:false}) imageurl: AttachmentComponent;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
camsassetmastershowOption:boolean;
camspmscheduleshowOption:boolean;
camsdepreciationscheduleshowOption:boolean;
camsassetreadinghistoryshowOption:boolean;
camsassettransferdetailshowOption:boolean;
camsassetreadingshowOption:boolean;
camsworkordershowOption:boolean;
camsassetcostshowOption:boolean;
camsassetadditionshowOption:boolean;
sessiondata:any;
sourcekey:any;



camspmschedulesvisiblelist:any;
camspmscheduleshidelist:any;
camsdepreciationschedulesvisiblelist:any;
camsdepreciationscheduleshidelist:any;
camsassetreadinghistoriesvisiblelist:any;
camsassetreadinghistorieshidelist:any;
camsassettransferdetailsvisiblelist:any;
camsassettransferdetailshidelist:any;
camsassetreadingsvisiblelist:any;
camsassetreadingshidelist:any;
camsworkordersvisiblelist:any;
camsworkordershidelist:any;
camsassetcostsvisiblelist:any;
camsassetcostshidelist:any;
camsassetadditionsvisiblelist:any;
camsassetadditionshidelist:any;

DeletedcamspmscheduleIDs: string="";
camspmschedulesID: string = "1";
camspmschedulesselectedindex:any;
DeletedcamsdepreciationscheduleIDs: string="";
camsdepreciationschedulesID: string = "2";
camsdepreciationschedulesselectedindex:any;
DeletedcamsassetreadinghistoryIDs: string="";
camsassetreadinghistoriesID: string = "3";
camsassetreadinghistoriesselectedindex:any;
DeletedcamsassettransferdetailIDs: string="";
camsassettransferdetailsID: string = "4";
camsassettransferdetailsselectedindex:any;
DeletedcamsassetreadingIDs: string="";
camsassetreadingsID: string = "5";
camsassetreadingsselectedindex:any;
DeletedcamsworkorderIDs: string="";
camsworkordersID: string = "6";
camsworkordersselectedindex:any;
DeletedcamsassetcostIDs: string="";
camsassetcostsID: string = "7";
camsassetcostsselectedindex:any;
DeletedcamsassetadditionIDs: string="";
camsassetadditionsID: string = "8";
camsassetadditionsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsassetmasterservice: camsassetmasterService,
private bousermasterservice: bousermasterService,
private bobranchlocationservice: bobranchlocationService,
private camspmmasterservice: camspmmasterService,
private erpsuppliermasterservice: erpsuppliermasterService,
private camspmscheduleservice: camspmscheduleService,
private bomasterdataservice: bomasterdataService,
private camspmscheduletaskservice: camspmscheduletaskService,
private bobranchsublocationservice: bobranchsublocationService,
private erpitemmasterservice: erpitemmasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private erpgoodsreceiptmasterservice:erpgoodsreceiptmasterService,
private erpcustomerinvoiceservice:erpcustomerinvoiceService,
private camsassetgroupservice:camsassetgroupService,
private erpcontractordermasterservice:erpcontractordermasterService,
private hrmsloanschememasterservice:hrmsloanschememasterService,
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
this.camsassetmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
assetid: [null],
reference: [null],
description: [null, Validators.required],
branchid: [null],
branchiddesc: [null],
locationid: [null],
locationiddesc: [null],
itemid: [null, Validators.required],
itemiddesc: [null],
imageurl: [null],
thumbnail: [null],
manufacturer: [null],
manufacturedyear: [null],
modelnumber: [null],
serialnumber: [null],
acquisitionmethod: [null],
acquisitionmethoddesc: [null],
supplierid: [null],
supplieriddesc: [null],
poreference: [null],
poreferencedesc: [null],
supplierdetails: [null],
grnid: [null],
grniddesc: [null],
purchasedate: [null],
purchaseprice: [null],
othercost: [null],
totalcost: [null],
invoicereference: [null],
invoicereferencedesc: [null],
estimatedlife: [null],
assetenddate: [null],
residualvalue: [null],
commisioneddate: [null, Validators.required],
departmentid: [null],
departmentiddesc: [null],
building: [null],
room: [null],
assetgroupid: [null, Validators.required],
assetgroupiddesc: [null],
parentid: [null],
parentiddesc: [null],
assetstatus: [null],
assetstatusdesc: [null],
assettype: [null],
assettypedesc: [null],
category: [null, Validators.required],
categorydesc: [null],
subcategory: [null],
subcategorydesc: [null],
criticality: [null],
criticalitydesc: [null],
owner: [null],
assignedto: [null],
assignedtodesc: [null],
assigneddate: [null],
assignedremarks: [null],
assetnotes: [null],
maintenancenotes: [null],
contractorid: [null],
contractoriddesc: [null],
contractid: [null],
contractiddesc: [null],
contractorexpirydate: [null],
amcstartdate: [null],
amcenddate: [null],
amcstatus: [null],
amcstatusdesc: [null],
contractnotes: [null],
amchistory: [null],
insurancecompany: [null],
insurancepolicyno: [null],
insurancestartdate: [null],
insuranceexpirydate: [null],
insurancerenewaldate: [null],
insurancepremium: [null],
insurancevalue: [null],
insurancestatus: [null],
insurancestatusdesc: [null],
insurancenotes: [null],
insurancehistory: [null],
lifetimewarranty: [null],
warrantyno: [null],
warrantyexpirydate: [null],
warrantyexpirationreminder: [null],
warrantystatus: [null],
warrantystatusdesc: [null],
servicereminder: [null],
assetservicedate: [null],
lastmaintenancedate: [null],
nextmaintenancedate: [null],
lastunit: [null],
nextunit: [null],
lastnote: [null],
disposaldate: [null],
disposalmethod: [null],
disposalmethoddesc: [null],
disposedby: [null],
disposedbydesc: [null],
disposalamount: [null],
disposedreason: [null],
disposedreasondesc: [null],
depreciationstartdate: [null],
currentvalue: [null],
currentyeardepreciation: [null],
cumulativedepreciation: [null],
depreciationcount: [null],
sourcefield: [null],
sourcereference: [null],
remarks: [null],
bankloan: [null],
loanid: [null],
loaniddesc: [null],
customfield: [null],
attachment: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
lotnumber: [null],
binlocationid: [null],
width: [null],
height: [null],
depth: [null],
color: [null],
licenseno: [null],
licensefee: [null],
licenserenewaldate: [null],
licensestatus: [null],
licensestatusdesc: [null],
tag: [null],
status: [null],
statusdesc: [null],
}, {
validator: [DateCompare('purchasedate','commisioneddate',""),DateCompare('commisioneddate','contractorexpirydate',""),DateCompare('amcstartdate','amcenddate',""),DateCompare('insurancestartdate','insuranceexpirydate',""),DateCompare('insuranceexpirydate','insurancerenewaldate',""),DateCompare('lastmaintenancedate','nextmaintenancedate',""),]});
}

get f() { return this.camsassetmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetmasterForm.dirty && this.camsassetmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
descriptionexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.description.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].assetid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Description value exists in the database.Do you want to display the record ? "))
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
serialnumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.serialnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].assetid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Serial Number value exists in the database.Do you want to display the record ? "))
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
referenceexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.reference.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].assetid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Reference value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.assetid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.assetid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.assetid && pkDetail) {
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
let camsassetmasterid = null;

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
this.formid=camsassetmasterid;
//this.sharedService.alert(camsassetmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamspmschedulesTableConfig();
  setTimeout(() => {
  this.SetcamspmschedulesTableddConfig();
  });

this.SetcamsdepreciationschedulesTableConfig();
  setTimeout(() => {
  this.SetcamsdepreciationschedulesTableddConfig();
  });

this.SetcamsassetreadinghistoriesTableConfig();
  setTimeout(() => {
  this.SetcamsassetreadinghistoriesTableddConfig();
  });

this.SetcamsassettransferdetailsTableConfig();
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });

this.SetcamsassetreadingsTableConfig();
  setTimeout(() => {
  this.SetcamsassetreadingsTableddConfig();
  });

this.SetcamsworkordersTableConfig();
  setTimeout(() => {
  this.SetcamsworkordersTableddConfig();
  });

this.SetcamsassetcostsTableConfig();
  setTimeout(() => {
  this.SetcamsassetcostsTableddConfig();
  });

this.SetcamsassetadditionsTableConfig();
  setTimeout(() => {
  this.SetcamsassetadditionsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.camsassetmasterForm.patchValue({
    branchid: this.camsassetmasterservice.formData.branchid,
    branchiddesc: this.camsassetmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.camsassetmasterForm.get('branchid').value);
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
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.locationidList = res as bobranchlocation[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.locationid){this.camsassetmasterForm.patchValue({
    locationid: this.camsassetmasterservice.formData.locationid,
    locationiddesc: this.camsassetmasterservice.formData.locationiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.camsassetmasterForm.patchValue({
    itemid: this.camsassetmasterservice.formData.itemid,
    itemiddesc: this.camsassetmasterservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.camsassetmasterForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("acquisitionmethod").then(res => this.acquisitionmethodList = res as boconfigvalue[]);
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.camsassetmasterForm.patchValue({
    supplierid: this.camsassetmasterservice.formData.supplierid,
    supplieriddesc: this.camsassetmasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.camsassetmasterForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.erppurchaseordermasterservice.getListBysupplierid(this.f.supplierid.value).then(res =>{
this.poreferenceList = res as erppurchaseordermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.poreference){this.camsassetmasterForm.patchValue({
    poreference: this.camsassetmasterservice.formData.poreference,
    poreferencedesc: this.camsassetmasterservice.formData.poreferencedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.poreference_erppurchaseordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.poreferenceList.filter(v => v.ponumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.poreference_erppurchaseordermastersformatter = (result: any) => result.ponumber;
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.erpgoodsreceiptmasterservice.getListBysupplierid(this.f.supplierid.value).then(res =>{
this.grnidList = res as erpgoodsreceiptmaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.grnid){this.camsassetmasterForm.patchValue({
    grnid: this.camsassetmasterservice.formData.grnid,
    grniddesc: this.camsassetmasterservice.formData.grniddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.grnid_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnidList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnid_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;
this.erpcustomerinvoiceservice.geterpcustomerinvoicesList().then(res => 
{
this.invoicereferenceList = res as erpcustomerinvoice[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.invoicereference){
this.invoicereferenceoptionsEvent.emit(this.invoicereferenceList);
this.camsassetmasterForm.patchValue({
    invoicereference: this.camsassetmasterservice.formData.invoicereference,
    invoicereferencedesc: this.camsassetmasterservice.formData.invoicereferencedesc,
});
}
{
let arrinvoicereference = this.invoicereferenceList.filter(v => v.invoiceid == this.camsassetmasterForm.get('invoicereference').value);
let objinvoicereference;
if (arrinvoicereference.length > 0) objinvoicereference = arrinvoicereference[0];
if (objinvoicereference)
{
}
}
}
).catch((err) => {console.log(err);});
this.invoicereference_erpcustomerinvoicesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.invoicereferenceList.filter(v => v.invoicenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.invoicereference_erpcustomerinvoicesformatter = (result: any) => result.invoicenumber;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.camsassetgroupservice.getcamsassetgroupsList().then(res => 
{
this.assetgroupidList = res as camsassetgroup[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.assetgroupid){
this.assetgroupidoptionsEvent.emit(this.assetgroupidList);
this.camsassetmasterForm.patchValue({
    assetgroupid: this.camsassetmasterservice.formData.assetgroupid,
    assetgroupiddesc: this.camsassetmasterservice.formData.assetgroupiddesc,
});
}
{
let arrassetgroupid = this.assetgroupidList.filter(v => v.assetgroupid == this.camsassetmasterForm.get('assetgroupid').value);
let objassetgroupid;
if (arrassetgroupid.length > 0) objassetgroupid = arrassetgroupid[0];
if (objassetgroupid)
{
    this.camsassetmasterForm.patchValue({ uom: objassetgroupid.uom });
    this.camsassetmasterForm.patchValue({ category: objassetgroupid.category });
    this.camsassetmasterForm.patchValue({ subcategory: objassetgroupid.subcategory });
    this.camsassetmasterForm.patchValue({ uselifeyears: objassetgroupid.estimatedlife });
}
}
}
).catch((err) => {console.log(err);});
this.assetgroupid_camsassetgroupsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetgroupidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetgroupid_camsassetgroupsformatter = (result: any) => result.description;
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.parentidList = res as camsassetmaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.parentid){
this.parentidoptionsEvent.emit(this.parentidList);
this.camsassetmasterForm.patchValue({
    parentid: this.camsassetmasterservice.formData.parentid,
    parentiddesc: this.camsassetmasterservice.formData.parentiddesc,
});
}
{
let arrparentid = this.parentidList.filter(v => v.assetid == this.camsassetmasterForm.get('parentid').value);
let objparentid;
if (arrparentid.length > 0) objparentid = arrparentid[0];
if (objparentid)
{
}
}
}
).catch((err) => {console.log(err);});
this.parentid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.parentidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.parentid_camsassetmastersformatter = (result: any) => result.description;
this.configservice.getList("assetstatus").then(res => this.assetstatusList = res as boconfigvalue[]);
this.configservice.getList("assettype").then(res => this.assettypeList = res as boconfigvalue[]);
this.configservice.getList("assetcategory").then(res => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("subcategory").then(res => this.subcategoryList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assignedtoList = res as bousermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.assignedto){
this.assignedtooptionsEvent.emit(this.assignedtoList);
this.camsassetmasterForm.patchValue({
    assignedto: this.camsassetmasterservice.formData.assignedto,
    assignedtodesc: this.camsassetmasterservice.formData.assignedtodesc,
});
}
{
let arrassignedto = this.assignedtoList.filter(v => v.userid == this.camsassetmasterForm.get('assignedto').value);
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignedto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignedtoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignedto_bousermastersformatter = (result: any) => result.username;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.contractoridList = res as erpsuppliermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.contractorid){
this.contractoridoptionsEvent.emit(this.contractoridList);
this.camsassetmasterForm.patchValue({
    contractorid: this.camsassetmasterservice.formData.contractorid,
    contractoriddesc: this.camsassetmasterservice.formData.contractoriddesc,
});
}
{
let arrcontractorid = this.contractoridList.filter(v => v.supplierid == this.camsassetmasterForm.get('contractorid').value);
let objcontractorid;
if (arrcontractorid.length > 0) objcontractorid = arrcontractorid[0];
if (objcontractorid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contractorid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contractoridList.filter(v => v.suppliername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contractorid_erpsuppliermastersformatter = (result: any) => result.suppliername;
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.contractidList = res as erpcontractordermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.contractid){
this.contractidoptionsEvent.emit(this.contractidList);
this.camsassetmasterForm.patchValue({
    contractid: this.camsassetmasterservice.formData.contractid,
    contractiddesc: this.camsassetmasterservice.formData.contractiddesc,
});
}
{
let arrcontractid = this.contractidList.filter(v => v.contractid == this.camsassetmasterForm.get('contractid').value);
let objcontractid;
if (arrcontractid.length > 0) objcontractid = arrcontractid[0];
if (objcontractid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contractid_erpcontractordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contractidList.filter(v => v.contractname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contractid_erpcontractordermastersformatter = (result: any) => result.contractname;
this.configservice.getList("amcstatus").then(res => this.amcstatusList = res as boconfigvalue[]);
this.configservice.getList("insurancestatus").then(res => this.insurancestatusList = res as boconfigvalue[]);
this.configservice.getList("warrantystatus").then(res => this.warrantystatusList = res as boconfigvalue[]);
this.configservice.getList("disposalmethod").then(res => this.disposalmethodList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.disposedbyList = res as bousermaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.disposedby){
this.disposedbyoptionsEvent.emit(this.disposedbyList);
this.camsassetmasterForm.patchValue({
    disposedby: this.camsassetmasterservice.formData.disposedby,
    disposedbydesc: this.camsassetmasterservice.formData.disposedbydesc,
});
}
{
let arrdisposedby = this.disposedbyList.filter(v => v.userid == this.camsassetmasterForm.get('disposedby').value);
let objdisposedby;
if (arrdisposedby.length > 0) objdisposedby = arrdisposedby[0];
if (objdisposedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.disposedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.disposedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.disposedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("disposedreason").then(res => this.disposedreasonList = res as boconfigvalue[]);
this.hrmsloanschememasterservice.gethrmsloanschememastersList().then(res => 
{
this.loanidList = res as hrmsloanschememaster[];
if(this.camsassetmasterservice.formData && this.camsassetmasterservice.formData.loanid){
this.loanidoptionsEvent.emit(this.loanidList);
this.camsassetmasterForm.patchValue({
    loanid: this.camsassetmasterservice.formData.loanid,
    loaniddesc: this.camsassetmasterservice.formData.loaniddesc,
});
}
{
let arrloanid = this.loanidList.filter(v => v.schemeid == this.camsassetmasterForm.get('loanid').value);
let objloanid;
if (arrloanid.length > 0) objloanid = arrloanid[0];
if (objloanid)
{
}
}
}
).catch((err) => {console.log(err);});
this.loanid_hrmsloanschememastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.loanidList.filter(v => v.schemename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.loanid_hrmsloanschememastersformatter = (result: any) => result.schemename;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("licensestatus").then(res => this.licensestatusList = res as boconfigvalue[]);

//autocomplete
    this.camsassetmasterservice.getcamsassetmastersList().then(res => {
      this.pkList = res as camsassetmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.reference;

//setting the flag that the screen is not touched 
this.camsassetmasterForm.markAsUntouched();
this.camsassetmasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.camsassetmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});
this.bobranchlocationservice.getListBybranchid(branchidDetail.branchid).then(res => {
 this.locationidList = res as bobranchlocation[]
}).catch((err) => {console.log(err);});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.camsassetmasterForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.camsassetmasterForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.camsassetmasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});
this.erppurchaseordermasterservice.getListBysupplierid(supplieridDetail.supplierid).then(res => {
 this.poreferenceList = res as erppurchaseordermaster[]
}).catch((err) => {console.log(err);});
this.erpgoodsreceiptmasterservice.getListBysupplierid(supplieridDetail.supplierid).then(res => {
 this.grnidList = res as erpgoodsreceiptmaster[]
}).catch((err) => {console.log(err);});

}
}

onSelectedporeference(poreferenceDetail: any) {
if (poreferenceDetail.poid && poreferenceDetail) {
this.camsassetmasterForm.patchValue({
poreference: poreferenceDetail.poid,
poreferencedesc: poreferenceDetail.ponumber,

});
this.camsassetmasterForm.patchValue({podate:poreferenceDetail.purchasedate});

}
}

onSelectedgrnid(grnidDetail: any) {
if (grnidDetail.grnid && grnidDetail) {
this.camsassetmasterForm.patchValue({
grnid: grnidDetail.grnid,
grniddesc: grnidDetail.grnnumber,

});

}
}

onSelectedinvoicereference(invoicereferenceDetail: any) {
if (invoicereferenceDetail.invoiceid && invoicereferenceDetail) {
this.camsassetmasterForm.patchValue({
invoicereference: invoicereferenceDetail.invoiceid,
invoicereferencedesc: invoicereferenceDetail.invoicenumber,

});

}
}

onSelectedassetgroupid(assetgroupidDetail: any) {
if (assetgroupidDetail.assetgroupid && assetgroupidDetail) {
this.camsassetmasterForm.patchValue({
assetgroupid: assetgroupidDetail.assetgroupid,
assetgroupiddesc: assetgroupidDetail.description,

});
this.camsassetmasterForm.patchValue({uom:assetgroupidDetail.uom});
this.camsassetmasterForm.patchValue({category:assetgroupidDetail.category});
this.camsassetmasterForm.patchValue({subcategory:assetgroupidDetail.subcategory});
this.camsassetmasterForm.patchValue({uselifeyears:assetgroupidDetail.estimatedlife});

}
}

onSelectedparentid(parentidDetail: any) {
if (parentidDetail.assetid && parentidDetail) {
this.camsassetmasterForm.patchValue({
parentid: parentidDetail.assetid,
parentiddesc: parentidDetail.description,

});

}
}

onSelectedassignedto(assignedtoDetail: any) {
if (assignedtoDetail.userid && assignedtoDetail) {
this.camsassetmasterForm.patchValue({
assignedto: assignedtoDetail.userid,
assignedtodesc: assignedtoDetail.username,

});

}
}

onSelectedcontractorid(contractoridDetail: any) {
if (contractoridDetail.supplierid && contractoridDetail) {
this.camsassetmasterForm.patchValue({
contractorid: contractoridDetail.supplierid,
contractoriddesc: contractoridDetail.suppliername,

});

}
}

onSelectedcontractid(contractidDetail: any) {
if (contractidDetail.contractid && contractidDetail) {
this.camsassetmasterForm.patchValue({
contractid: contractidDetail.contractid,
contractiddesc: contractidDetail.contractname,

});

}
}

onSelecteddisposedby(disposedbyDetail: any) {
if (disposedbyDetail.userid && disposedbyDetail) {
this.camsassetmasterForm.patchValue({
disposedby: disposedbyDetail.userid,
disposedbydesc: disposedbyDetail.username,

});

}
}

onSelectedloanid(loanidDetail: any) {
if (loanidDetail.schemeid && loanidDetail) {
this.camsassetmasterForm.patchValue({
loanid: loanidDetail.schemeid,
loaniddesc: loanidDetail.schemename,

});

}
}




  getimageurl() {
    debugger;
    if (this.imageurl.getattachmentlist().length > 0) {
      let file = this.imageurl.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
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
if (this.camsassetmasterForm != null)
this.camsassetmasterForm.reset();
this.camsassetmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
assignedto: this.sessiondata.userid,
assignedtodesc: this.sessiondata.username,
disposedby: this.sessiondata.userid,
disposedbydesc: this.sessiondata.username,
});
this.camsassetmasterForm.patchValue({
purchasedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
assetenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
commisioneddate: this.ngbDateParserFormatter.parse(new Date().toString()),
assigneddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
contractorexpirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
amcstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
amcenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
insurancestartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
insuranceexpirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
insurancerenewaldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
warrantyexpirydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
assetservicedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
lastmaintenancedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
nextmaintenancedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
disposaldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
depreciationstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
licenserenewaldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.camsassetmasterservice.camspmschedules=[];
this.camspmschedulesLoadTable();
this.camsassetmasterservice.camsdepreciationschedules=[];
this.camsdepreciationschedulesLoadTable();
this.camsassetmasterservice.camsassetreadinghistories=[];
this.camsassetreadinghistoriesLoadTable();
this.camsassetmasterservice.camsassettransferdetails=[];
this.camsassettransferdetailsLoadTable();
this.camsassetmasterservice.camsassetreadings=[];
this.camsassetreadingsLoadTable();
this.camsassetmasterservice.camsworkorders=[];
this.camsworkordersLoadTable();
this.camsassetmasterservice.camsassetcosts=[];
this.camsassetcostsLoadTable();
this.camsassetmasterservice.camsassetadditions=[];
this.camsassetadditionsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.camsassetmasterForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let assetid = this.camsassetmasterForm.get('assetid').value;
        if(assetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetmasterservice.deletecamsassetmaster(assetid).then(res =>
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
    this.camsassetmasterForm.patchValue({
        assetid: null
    });
    if(this.camsassetmasterservice.formData.assetid!=null)this.camsassetmasterservice.formData.assetid=null;
for (let i=0;i<this.camsassetmasterservice.camspmschedules.length;i++) {
this.camsassetmasterservice.camspmschedules[i].scheduleid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsdepreciationschedules.length;i++) {
this.camsassetmasterservice.camsdepreciationschedules[i].scheduleid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsassetreadinghistories.length;i++) {
this.camsassetmasterservice.camsassetreadinghistories[i].historyid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsassettransferdetails.length;i++) {
this.camsassetmasterservice.camsassettransferdetails[i].transferid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsassetreadings.length;i++) {
this.camsassetmasterservice.camsassetreadings[i].readingid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsworkorders.length;i++) {
this.camsassetmasterservice.camsworkorders[i].workorderid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsassetcosts.length;i++) {
this.camsassetmasterservice.camsassetcosts[i].costid=null;
}
for (let i=0;i<this.camsassetmasterservice.camsassetadditions.length;i++) {
this.camsassetmasterservice.camsassetadditions[i].additionid=null;
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
        else if(key=="purchasedate")
this.camsassetmasterForm.patchValue({"purchasedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assetenddate")
this.camsassetmasterForm.patchValue({"assetenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="commisioneddate")
this.camsassetmasterForm.patchValue({"commisioneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="owner")
this.camsassetmasterForm.patchValue({"owner":  mainscreendata[key] } );
        else if(key=="assigneddate")
this.camsassetmasterForm.patchValue({"assigneddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assetnotes")
this.camsassetmasterForm.patchValue({"assetnotes":  mainscreendata[key] } );
        else if(key=="maintenancenotes")
this.camsassetmasterForm.patchValue({"maintenancenotes":  mainscreendata[key] } );
        else if(key=="contractorexpirydate")
this.camsassetmasterForm.patchValue({"contractorexpirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="amcstartdate")
this.camsassetmasterForm.patchValue({"amcstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="amcenddate")
this.camsassetmasterForm.patchValue({"amcenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="insurancestartdate")
this.camsassetmasterForm.patchValue({"insurancestartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="insuranceexpirydate")
this.camsassetmasterForm.patchValue({"insuranceexpirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="insurancerenewaldate")
this.camsassetmasterForm.patchValue({"insurancerenewaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="warrantyexpirydate")
this.camsassetmasterForm.patchValue({"warrantyexpirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assetservicedate")
this.camsassetmasterForm.patchValue({"assetservicedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="lastmaintenancedate")
this.camsassetmasterForm.patchValue({"lastmaintenancedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nextmaintenancedate")
this.camsassetmasterForm.patchValue({"nextmaintenancedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="disposaldate")
this.camsassetmasterForm.patchValue({"disposaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="depreciationstartdate")
this.camsassetmasterForm.patchValue({"depreciationstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.camsassetmasterForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(key=="licenserenewaldate")
this.camsassetmasterForm.patchValue({"licenserenewaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="tag")
this.camsassetmasterForm.patchValue({"tag":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsassetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassetmasterForm.controls[key]!=undefined)
{
this.camsassetmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.camsassetmasterservice.formData.reference!=null )
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
assetidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
imageurlonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
manufactureronChange(evt:any){
let e=evt.value;
}
manufacturedyearonChange(evt:any){
let e=evt.value;
}
modelnumberonChange(evt:any){
let e=evt.value;
}
serialnumberonChange(evt:any){
let e=evt.value;
}
acquisitionmethodonChange(evt:any){
let e=this.f.acquisitionmethod.value as any;
this.camsassetmasterForm.patchValue({acquisitionmethoddesc:evt.options[evt.options.selectedIndex].text});
}
supplieridonChange(evt:any){
let e=evt.value;
}
poreferenceonChange(evt:any){
let e=evt.value;
}
supplierdetailsonChange(evt:any){
let e=evt.value;
}
grnidonChange(evt:any){
let e=evt.value;
}
purchasedateonChange(evt:any){
let e=evt.value;
}
purchasepriceonChange(evt:any){
let e=evt.value;
}
othercostonChange(evt:any){
let e=evt.value;
}
totalcostonChange(evt:any){
let e=evt.value;
}
invoicereferenceonChange(evt:any){
let e=evt.value;
}
estimatedlifeonChange(evt:any){
let e=evt.value;
}
assetenddateonChange(evt:any){
let e=evt.value;
}
residualvalueonChange(evt:any){
let e=evt.value;
}
commisioneddateonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.camsassetmasterForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
buildingonChange(evt:any){
let e=evt.value;
}
roomonChange(evt:any){
let e=evt.value;
}
assetgroupidonChange(evt:any){
let e=evt.value;
}
parentidonChange(evt:any){
let e=evt.value;
}
assetstatusonChange(evt:any){
let e=this.f.assetstatus.value as any;
this.camsassetmasterForm.patchValue({assetstatusdesc:evt.options[evt.options.selectedIndex].text});
}
assettypeonChange(evt:any){
let e=this.f.assettype.value as any;
this.camsassetmasterForm.patchValue({assettypedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.camsassetmasterForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
subcategoryonChange(evt:any){
let e=this.f.subcategory.value as any;
this.camsassetmasterForm.patchValue({subcategorydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.camsassetmasterForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
owneronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrowner=res;
let objowner;
if (arrowner.length > 0) objowner = arrowner[0];
if (objowner)
{
}
}).catch((err) => {console.log(err);});
}
assignedtoonChange(evt:any){
let e=evt.value;
}
assigneddateonChange(evt:any){
let e=evt.value;
}
assignedremarksonChange(evt:any){
let e=evt.value;
}
assetnotesonChange(evt:any){
let e=evt.value;
}
maintenancenotesonChange(evt:any){
let e=evt.value;
}
contractoridonChange(evt:any){
let e=evt.value;
}
contractidonChange(evt:any){
let e=evt.value;
}
contractorexpirydateonChange(evt:any){
let e=evt.value;
}
amcstartdateonChange(evt:any){
let e=evt.value;
}
amcenddateonChange(evt:any){
let e=evt.value;
}
amcstatusonChange(evt:any){
let e=this.f.amcstatus.value as any;
this.camsassetmasterForm.patchValue({amcstatusdesc:evt.options[evt.options.selectedIndex].text});
}
contractnotesonChange(evt:any){
let e=evt.value;
}
amchistoryonChange(evt:any){
let e=evt.value;
}
insurancecompanyonChange(evt:any){
let e=evt.value;
}
insurancepolicynoonChange(evt:any){
let e=evt.value;
}
insurancestartdateonChange(evt:any){
let e=evt.value;
}
insuranceexpirydateonChange(evt:any){
let e=evt.value;
}
insurancerenewaldateonChange(evt:any){
let e=evt.value;
}
insurancepremiumonChange(evt:any){
let e=evt.value;
}
insurancevalueonChange(evt:any){
let e=evt.value;
}
insurancestatusonChange(evt:any){
let e=this.f.insurancestatus.value as any;
this.camsassetmasterForm.patchValue({insurancestatusdesc:evt.options[evt.options.selectedIndex].text});
}
insurancenotesonChange(evt:any){
let e=evt.value;
}
insurancehistoryonChange(evt:any){
let e=evt.value;
}
lifetimewarrantyonChange(evt:any){
let e=evt.value;
}
warrantynoonChange(evt:any){
let e=evt.value;
}
warrantyexpirydateonChange(evt:any){
let e=evt.value;
}
warrantyexpirationreminderonChange(evt:any){
let e=evt.value;
}
warrantystatusonChange(evt:any){
let e=this.f.warrantystatus.value as any;
this.camsassetmasterForm.patchValue({warrantystatusdesc:evt.options[evt.options.selectedIndex].text});
}
servicereminderonChange(evt:any){
let e=evt.value;
}
assetservicedateonChange(evt:any){
let e=evt.value;
}
lastmaintenancedateonChange(evt:any){
let e=evt.value;
}
nextmaintenancedateonChange(evt:any){
let e=evt.value;
}
lastunitonChange(evt:any){
let e=evt.value;
}
nextunitonChange(evt:any){
let e=evt.value;
}
lastnoteonChange(evt:any){
let e=evt.value;
}
disposaldateonChange(evt:any){
let e=evt.value;
}
disposalmethodonChange(evt:any){
let e=this.f.disposalmethod.value as any;
this.camsassetmasterForm.patchValue({disposalmethoddesc:evt.options[evt.options.selectedIndex].text});
}
disposedbyonChange(evt:any){
let e=evt.value;
}
disposalamountonChange(evt:any){
let e=evt.value;
}
disposedreasononChange(evt:any){
let e=this.f.disposedreason.value as any;
this.camsassetmasterForm.patchValue({disposedreasondesc:evt.options[evt.options.selectedIndex].text});
}
depreciationstartdateonChange(evt:any){
let e=evt.value;
}
currentvalueonChange(evt:any){
let e=evt.value;
}
currentyeardepreciationonChange(evt:any){
let e=evt.value;
}
cumulativedepreciationonChange(evt:any){
let e=evt.value;
}
depreciationcountonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
bankloanonChange(evt:any){
let e=evt.value;
}
loanidonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.camsassetmasterForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
lotnumberonChange(evt:any){
let e=evt.value;
}
binlocationidonChange(evt:any){
let e=evt.value;
}
widthonChange(evt:any){
let e=evt.value;
}
heightonChange(evt:any){
let e=evt.value;
}
depthonChange(evt:any){
let e=evt.value;
}
coloronChange(evt:any){
let e=evt.value;
}
licensenoonChange(evt:any){
let e=evt.value;
}
licensefeeonChange(evt:any){
let e=evt.value;
}
licenserenewaldateonChange(evt:any){
let e=evt.value;
}
licensestatusonChange(evt:any){
let e=this.f.licensestatus.value as any;
this.camsassetmasterForm.patchValue({licensestatusdesc:evt.options[evt.options.selectedIndex].text});
}
tagonChange(evt:any){
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
  


editcamsassetmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassetmasterservice.getcamsassetmastersByEID(pkcol).then(res => {

this.camsassetmasterservice.formData=res.camsassetmaster;
let formproperty=res.camsassetmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassetmaster.pkcol;
this.formid=res.camsassetmaster.assetid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassetmaster.assetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetmasterForm.patchValue({
assetid: res.camsassetmaster.assetid,
reference: res.camsassetmaster.reference,
description: res.camsassetmaster.description,
branchid: res.camsassetmaster.branchid,
branchiddesc: res.camsassetmaster.branchiddesc,
locationid: res.camsassetmaster.locationid,
locationiddesc: res.camsassetmaster.locationiddesc,
itemid: res.camsassetmaster.itemid,
itemiddesc: res.camsassetmaster.itemiddesc,
imageurl: JSON.parse(res.camsassetmaster.imageurl),
thumbnail: JSON.parse(res.camsassetmaster.thumbnail),
manufacturer: res.camsassetmaster.manufacturer,
manufacturedyear: res.camsassetmaster.manufacturedyear,
modelnumber: res.camsassetmaster.modelnumber,
serialnumber: res.camsassetmaster.serialnumber,
acquisitionmethod: res.camsassetmaster.acquisitionmethod,
acquisitionmethoddesc: res.camsassetmaster.acquisitionmethoddesc,
supplierid: res.camsassetmaster.supplierid,
supplieriddesc: res.camsassetmaster.supplieriddesc,
poreference: res.camsassetmaster.poreference,
poreferencedesc: res.camsassetmaster.poreferencedesc,
supplierdetails: res.camsassetmaster.supplierdetails,
grnid: res.camsassetmaster.grnid,
grniddesc: res.camsassetmaster.grniddesc,
purchasedate: this.ngbDateParserFormatter.parse(res.camsassetmaster.purchasedate),
purchaseprice: res.camsassetmaster.purchaseprice,
othercost: res.camsassetmaster.othercost,
totalcost: res.camsassetmaster.totalcost,
invoicereference: res.camsassetmaster.invoicereference,
invoicereferencedesc: res.camsassetmaster.invoicereferencedesc,
estimatedlife: res.camsassetmaster.estimatedlife,
assetenddate: this.ngbDateParserFormatter.parse(res.camsassetmaster.assetenddate),
residualvalue: res.camsassetmaster.residualvalue,
commisioneddate: this.ngbDateParserFormatter.parse(res.camsassetmaster.commisioneddate),
departmentid: res.camsassetmaster.departmentid,
departmentiddesc: res.camsassetmaster.departmentiddesc,
building: res.camsassetmaster.building,
room: res.camsassetmaster.room,
assetgroupid: res.camsassetmaster.assetgroupid,
assetgroupiddesc: res.camsassetmaster.assetgroupiddesc,
parentid: res.camsassetmaster.parentid,
parentiddesc: res.camsassetmaster.parentiddesc,
assetstatus: res.camsassetmaster.assetstatus,
assetstatusdesc: res.camsassetmaster.assetstatusdesc,
assettype: res.camsassetmaster.assettype,
assettypedesc: res.camsassetmaster.assettypedesc,
category: res.camsassetmaster.category,
categorydesc: res.camsassetmaster.categorydesc,
subcategory: res.camsassetmaster.subcategory,
subcategorydesc: res.camsassetmaster.subcategorydesc,
criticality: res.camsassetmaster.criticality,
criticalitydesc: res.camsassetmaster.criticalitydesc,
owner: JSON.parse(res.camsassetmaster.owner),
assignedto: res.camsassetmaster.assignedto,
assignedtodesc: res.camsassetmaster.assignedtodesc,
assigneddate: this.ngbDateParserFormatter.parse(res.camsassetmaster.assigneddate),
assignedremarks: res.camsassetmaster.assignedremarks,
assetnotes: JSON.parse(res.camsassetmaster.assetnotes),
maintenancenotes: JSON.parse(res.camsassetmaster.maintenancenotes),
contractorid: res.camsassetmaster.contractorid,
contractoriddesc: res.camsassetmaster.contractoriddesc,
contractid: res.camsassetmaster.contractid,
contractiddesc: res.camsassetmaster.contractiddesc,
contractorexpirydate: this.ngbDateParserFormatter.parse(res.camsassetmaster.contractorexpirydate),
amcstartdate: this.ngbDateParserFormatter.parse(res.camsassetmaster.amcstartdate),
amcenddate: this.ngbDateParserFormatter.parse(res.camsassetmaster.amcenddate),
amcstatus: res.camsassetmaster.amcstatus,
amcstatusdesc: res.camsassetmaster.amcstatusdesc,
contractnotes: res.camsassetmaster.contractnotes,
amchistory: res.camsassetmaster.amchistory,
insurancecompany: res.camsassetmaster.insurancecompany,
insurancepolicyno: res.camsassetmaster.insurancepolicyno,
insurancestartdate: this.ngbDateParserFormatter.parse(res.camsassetmaster.insurancestartdate),
insuranceexpirydate: this.ngbDateParserFormatter.parse(res.camsassetmaster.insuranceexpirydate),
insurancerenewaldate: this.ngbDateParserFormatter.parse(res.camsassetmaster.insurancerenewaldate),
insurancepremium: res.camsassetmaster.insurancepremium,
insurancevalue: res.camsassetmaster.insurancevalue,
insurancestatus: res.camsassetmaster.insurancestatus,
insurancestatusdesc: res.camsassetmaster.insurancestatusdesc,
insurancenotes: res.camsassetmaster.insurancenotes,
insurancehistory: res.camsassetmaster.insurancehistory,
lifetimewarranty: res.camsassetmaster.lifetimewarranty,
warrantyno: res.camsassetmaster.warrantyno,
warrantyexpirydate: this.ngbDateParserFormatter.parse(res.camsassetmaster.warrantyexpirydate),
warrantyexpirationreminder: res.camsassetmaster.warrantyexpirationreminder,
warrantystatus: res.camsassetmaster.warrantystatus,
warrantystatusdesc: res.camsassetmaster.warrantystatusdesc,
servicereminder: res.camsassetmaster.servicereminder,
assetservicedate: this.ngbDateParserFormatter.parse(res.camsassetmaster.assetservicedate),
lastmaintenancedate: this.ngbDateParserFormatter.parse(res.camsassetmaster.lastmaintenancedate),
nextmaintenancedate: this.ngbDateParserFormatter.parse(res.camsassetmaster.nextmaintenancedate),
lastunit: res.camsassetmaster.lastunit,
nextunit: res.camsassetmaster.nextunit,
lastnote: res.camsassetmaster.lastnote,
disposaldate: this.ngbDateParserFormatter.parse(res.camsassetmaster.disposaldate),
disposalmethod: res.camsassetmaster.disposalmethod,
disposalmethoddesc: res.camsassetmaster.disposalmethoddesc,
disposedby: res.camsassetmaster.disposedby,
disposedbydesc: res.camsassetmaster.disposedbydesc,
disposalamount: res.camsassetmaster.disposalamount,
disposedreason: res.camsassetmaster.disposedreason,
disposedreasondesc: res.camsassetmaster.disposedreasondesc,
depreciationstartdate: this.ngbDateParserFormatter.parse(res.camsassetmaster.depreciationstartdate),
currentvalue: res.camsassetmaster.currentvalue,
currentyeardepreciation: res.camsassetmaster.currentyeardepreciation,
cumulativedepreciation: res.camsassetmaster.cumulativedepreciation,
depreciationcount: res.camsassetmaster.depreciationcount,
sourcefield: res.camsassetmaster.sourcefield,
sourcereference: res.camsassetmaster.sourcereference,
remarks: JSON.parse(res.camsassetmaster.remarks),
bankloan: res.camsassetmaster.bankloan,
loanid: res.camsassetmaster.loanid,
loaniddesc: res.camsassetmaster.loaniddesc,
customfield: res.camsassetmaster.customfield,
attachment: JSON.parse(res.camsassetmaster.attachment),
quantity: res.camsassetmaster.quantity,
uom: res.camsassetmaster.uom,
uomdesc: res.camsassetmaster.uomdesc,
lotnumber: res.camsassetmaster.lotnumber,
binlocationid: res.camsassetmaster.binlocationid,
width: res.camsassetmaster.width,
height: res.camsassetmaster.height,
depth: res.camsassetmaster.depth,
color: res.camsassetmaster.color,
licenseno: res.camsassetmaster.licenseno,
licensefee: res.camsassetmaster.licensefee,
licenserenewaldate: this.ngbDateParserFormatter.parse(res.camsassetmaster.licenserenewaldate),
licensestatus: res.camsassetmaster.licensestatus,
licensestatusdesc: res.camsassetmaster.licensestatusdesc,
tag: JSON.parse(res.camsassetmaster.tag),
status: res.camsassetmaster.status,
statusdesc: res.camsassetmaster.statusdesc,
});
this.camspmschedulesvisiblelist=res.camspmschedulesvisiblelist;
this.camsdepreciationschedulesvisiblelist=res.camsdepreciationschedulesvisiblelist;
this.camsassetreadinghistoriesvisiblelist=res.camsassetreadinghistoriesvisiblelist;
this.camsassettransferdetailsvisiblelist=res.camsassettransferdetailsvisiblelist;
this.camsassetreadingsvisiblelist=res.camsassetreadingsvisiblelist;
this.camsworkordersvisiblelist=res.camsworkordersvisiblelist;
this.camsassetcostsvisiblelist=res.camsassetcostsvisiblelist;
this.camsassetadditionsvisiblelist=res.camsassetadditionsvisiblelist;
if(this.camsassetmasterForm.get('customfield').value!=null && this.camsassetmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetmasterForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetmasterForm.get('imageurl').value!=null && this.camsassetmasterForm.get('imageurl').value!="" && this.imageurl!=null && this.imageurl!=undefined)this.imageurl.setattachmentlist(this.camsassetmasterForm.get('imageurl').value);
if(this.camsassetmasterForm.get('thumbnail').value!=null && this.camsassetmasterForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.camsassetmasterForm.get('thumbnail').value);
if(this.camsassetmasterForm.get('attachment').value!=null && this.camsassetmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassetmasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.branchid.value && this.f.branchid.value!="" && this.f.branchid.value!=null)this.bobranchlocationservice.getListBybranchid(this.f.branchid.value).then(res =>{
this.locationidList = res as bobranchlocation[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.erppurchaseordermasterservice.getListBysupplierid(this.f.supplierid.value).then(res =>{
this.poreferenceList = res as erppurchaseordermaster[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.supplierid.value && this.f.supplierid.value!="" && this.f.supplierid.value!=null)this.erpgoodsreceiptmasterservice.getListBysupplierid(this.f.supplierid.value).then(res =>{
this.grnidList = res as erpgoodsreceiptmaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.camsassetmasterservice.camspmschedules = res.camspmschedules;
this.SetcamspmschedulesTableConfig();
this.camspmschedulesLoadTable();
  setTimeout(() => {
  this.SetcamspmschedulesTableddConfig();
  });
this.camsassetmasterservice.camsdepreciationschedules = res.camsdepreciationschedules;
this.SetcamsdepreciationschedulesTableConfig();
this.camsdepreciationschedulesLoadTable();
  setTimeout(() => {
  this.SetcamsdepreciationschedulesTableddConfig();
  });
this.camsassetmasterservice.camsassetreadinghistories = res.camsassetreadinghistories;
this.SetcamsassetreadinghistoriesTableConfig();
this.camsassetreadinghistoriesLoadTable();
  setTimeout(() => {
  this.SetcamsassetreadinghistoriesTableddConfig();
  });
this.camsassetmasterservice.camsassettransferdetails = res.camsassettransferdetails;
this.SetcamsassettransferdetailsTableConfig();
this.camsassettransferdetailsLoadTable();
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });
this.camsassetmasterservice.camsassetreadings = res.camsassetreadings;
this.SetcamsassetreadingsTableConfig();
this.camsassetreadingsLoadTable();
  setTimeout(() => {
  this.SetcamsassetreadingsTableddConfig();
  });
this.camsassetmasterservice.camsworkorders = res.camsworkorders;
this.SetcamsworkordersTableConfig();
this.camsworkordersLoadTable();
  setTimeout(() => {
  this.SetcamsworkordersTableddConfig();
  });
this.camsassetmasterservice.camsassetcosts = res.camsassetcosts;
this.SetcamsassetcostsTableConfig();
this.camsassetcostsLoadTable();
  setTimeout(() => {
  this.SetcamsassetcostsTableddConfig();
  });
this.camsassetmasterservice.camsassetadditions = res.camsassetadditions;
this.SetcamsassetadditionsTableConfig();
this.camsassetadditionsLoadTable();
  setTimeout(() => {
  this.SetcamsassetadditionsTableddConfig();
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
  for (let key in this.camsassetmasterForm.controls) {
    if (this.camsassetmasterForm.controls[key] != null) {
if( key=="imageurl" ||  key=="thumbnail")
{
if(this.camsassetmasterservice.formData!=null && this.camsassetmasterservice.formData[key]!=null  && this.camsassetmasterservice.formData[key]!='[]' && this.camsassetmasterservice.formData[key]!=undefined && this.camsassetmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassetmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassetmasterservice.formData!=null && this.camsassetmasterservice.formData[key]!=null   && this.camsassetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassetmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassetmasterservice.formData!=null && this.camsassetmasterservice.formData[key]!=null   && this.camsassetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassetmasterservice.formData[key]+"'><div class='progress__number'>"+this.camsassetmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetmasterForm.value;
obj.purchasedate=new Date(this.camsassetmasterForm.get('purchasedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('purchasedate').value)+'  UTC' :null);
obj.assetenddate=new Date(this.camsassetmasterForm.get('assetenddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assetenddate').value)+'  UTC' :null);
obj.commisioneddate=new Date(this.camsassetmasterForm.get('commisioneddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('commisioneddate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('owner').value!=null)obj.owner=JSON.stringify(this.camsassetmasterForm.get('owner').value);
obj.assigneddate=new Date(this.camsassetmasterForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assigneddate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('assetnotes').value!=null)obj.assetnotes=JSON.stringify(this.camsassetmasterForm.get('assetnotes').value);
if(this.camsassetmasterForm.get('maintenancenotes').value!=null)obj.maintenancenotes=JSON.stringify(this.camsassetmasterForm.get('maintenancenotes').value);
obj.contractorexpirydate=new Date(this.camsassetmasterForm.get('contractorexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('contractorexpirydate').value)+'  UTC' :null);
obj.amcstartdate=new Date(this.camsassetmasterForm.get('amcstartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('amcstartdate').value)+'  UTC' :null);
obj.amcenddate=new Date(this.camsassetmasterForm.get('amcenddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('amcenddate').value)+'  UTC' :null);
obj.insurancestartdate=new Date(this.camsassetmasterForm.get('insurancestartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insurancestartdate').value)+'  UTC' :null);
obj.insuranceexpirydate=new Date(this.camsassetmasterForm.get('insuranceexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insuranceexpirydate').value)+'  UTC' :null);
obj.insurancerenewaldate=new Date(this.camsassetmasterForm.get('insurancerenewaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insurancerenewaldate').value)+'  UTC' :null);
obj.warrantyexpirydate=new Date(this.camsassetmasterForm.get('warrantyexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('warrantyexpirydate').value)+'  UTC' :null);
obj.assetservicedate=new Date(this.camsassetmasterForm.get('assetservicedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assetservicedate').value)+'  UTC' :null);
obj.lastmaintenancedate=new Date(this.camsassetmasterForm.get('lastmaintenancedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('lastmaintenancedate').value)+'  UTC' :null);
obj.nextmaintenancedate=new Date(this.camsassetmasterForm.get('nextmaintenancedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('nextmaintenancedate').value)+'  UTC' :null);
obj.disposaldate=new Date(this.camsassetmasterForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('disposaldate').value)+'  UTC' :null);
obj.depreciationstartdate=new Date(this.camsassetmasterForm.get('depreciationstartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('depreciationstartdate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsassetmasterForm.get('remarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
obj.licenserenewaldate=new Date(this.camsassetmasterForm.get('licenserenewaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('licenserenewaldate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('tag').value!=null)obj.tag=JSON.stringify(this.camsassetmasterForm.get('tag').value);
if(this.imageurl.getattachmentlist()!=null)obj.imageurl=JSON.stringify(this.imageurl.getattachmentlist());
if(this.imageurl.getattachmentlist()!=null)obj.imageurl=JSON.stringify(this.imageurl.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.imageurl.getAllFiles());
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

private camsassetmastertoggleOption(){
this.camsassetmastershowOption = this.camsassetmastershowOption === true ? false : true;
}

private camspmscheduletoggleOption(){
this.camspmscheduleshowOption = this.camspmscheduleshowOption === true ? false : true;
}

private camsdepreciationscheduletoggleOption(){
this.camsdepreciationscheduleshowOption = this.camsdepreciationscheduleshowOption === true ? false : true;
}

private camsassetreadinghistorytoggleOption(){
this.camsassetreadinghistoryshowOption = this.camsassetreadinghistoryshowOption === true ? false : true;
}

private camsassettransferdetailtoggleOption(){
this.camsassettransferdetailshowOption = this.camsassettransferdetailshowOption === true ? false : true;
}

private camsassetreadingtoggleOption(){
this.camsassetreadingshowOption = this.camsassetreadingshowOption === true ? false : true;
}

private camsworkordertoggleOption(){
this.camsworkordershowOption = this.camsworkordershowOption === true ? false : true;
}

private camsassetcosttoggleOption(){
this.camsassetcostshowOption = this.camsassetcostshowOption === true ? false : true;
}

private camsassetadditiontoggleOption(){
this.camsassetadditionshowOption = this.camsassetadditionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetmasterservice.formData=this.camsassetmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetmasterForm.controls[key] != null)
    {
        this.camsassetmasterservice.formData[key] = this.camsassetmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetmasterservice.formData.purchasedate=new Date(this.camsassetmasterForm.get('purchasedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('purchasedate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.assetenddate=new Date(this.camsassetmasterForm.get('assetenddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assetenddate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.commisioneddate=new Date(this.camsassetmasterForm.get('commisioneddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('commisioneddate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('owner').value!=null)this.camsassetmasterservice.formData.owner=JSON.stringify(this.camsassetmasterForm.get('owner').value);
this.camsassetmasterservice.formData.assigneddate=new Date(this.camsassetmasterForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assigneddate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('assetnotes').value!=null)this.camsassetmasterservice.formData.assetnotes=JSON.stringify(this.camsassetmasterForm.get('assetnotes').value);
if(this.camsassetmasterForm.get('maintenancenotes').value!=null)this.camsassetmasterservice.formData.maintenancenotes=JSON.stringify(this.camsassetmasterForm.get('maintenancenotes').value);
this.camsassetmasterservice.formData.contractorexpirydate=new Date(this.camsassetmasterForm.get('contractorexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('contractorexpirydate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.amcstartdate=new Date(this.camsassetmasterForm.get('amcstartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('amcstartdate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.amcenddate=new Date(this.camsassetmasterForm.get('amcenddate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('amcenddate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.insurancestartdate=new Date(this.camsassetmasterForm.get('insurancestartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insurancestartdate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.insuranceexpirydate=new Date(this.camsassetmasterForm.get('insuranceexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insuranceexpirydate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.insurancerenewaldate=new Date(this.camsassetmasterForm.get('insurancerenewaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('insurancerenewaldate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.warrantyexpirydate=new Date(this.camsassetmasterForm.get('warrantyexpirydate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('warrantyexpirydate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.assetservicedate=new Date(this.camsassetmasterForm.get('assetservicedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('assetservicedate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.lastmaintenancedate=new Date(this.camsassetmasterForm.get('lastmaintenancedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('lastmaintenancedate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.nextmaintenancedate=new Date(this.camsassetmasterForm.get('nextmaintenancedate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('nextmaintenancedate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.disposaldate=new Date(this.camsassetmasterForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('disposaldate').value)+'  UTC' :null);
this.camsassetmasterservice.formData.depreciationstartdate=new Date(this.camsassetmasterForm.get('depreciationstartdate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('depreciationstartdate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('remarks').value!=null)this.camsassetmasterservice.formData.remarks=JSON.stringify(this.camsassetmasterForm.get('remarks').value);
if(customfields!=null)this.camsassetmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassetmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.camsassetmasterservice.formData.licenserenewaldate=new Date(this.camsassetmasterForm.get('licenserenewaldate').value ? this.ngbDateParserFormatter.format(this.camsassetmasterForm.get('licenserenewaldate').value)+'  UTC' :null);
if(this.camsassetmasterForm.get('tag').value!=null)this.camsassetmasterservice.formData.tag=JSON.stringify(this.camsassetmasterForm.get('tag').value);
this.camsassetmasterservice.formData.DeletedcamspmscheduleIDs = this.DeletedcamspmscheduleIDs;
this.camsassetmasterservice.formData.DeletedcamsdepreciationscheduleIDs = this.DeletedcamsdepreciationscheduleIDs;
this.camsassetmasterservice.formData.DeletedcamsassetreadinghistoryIDs = this.DeletedcamsassetreadinghistoryIDs;
this.camsassetmasterservice.formData.DeletedcamsassettransferdetailIDs = this.DeletedcamsassettransferdetailIDs;
this.camsassetmasterservice.formData.DeletedcamsassetreadingIDs = this.DeletedcamsassetreadingIDs;
this.camsassetmasterservice.formData.DeletedcamsworkorderIDs = this.DeletedcamsworkorderIDs;
this.camsassetmasterservice.formData.DeletedcamsassetcostIDs = this.DeletedcamsassetcostIDs;
this.camsassetmasterservice.formData.DeletedcamsassetadditionIDs = this.DeletedcamsassetadditionIDs;
if(this.imageurl.getattachmentlist()!=null)this.camsassetmasterservice.formData.imageurl=JSON.stringify(this.imageurl.getattachmentlist());
if(this.imageurl.getattachmentlist()!=null)this.camsassetmasterservice.formData.imageurl=JSON.stringify(this.imageurl.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetmasterservice.formData);
this.camsassetmasterservice.formData=this.camsassetmasterForm.value;
this.camsassetmasterservice.saveOrUpdatecamsassetmasters().subscribe(
async res => {
await this.sharedService.upload(this.imageurl.getAllFiles());
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.camspmschedulessource.data)
{
    for (let i = 0; i < this.camspmschedulessource.data.length; i++)
    {
        if (this.camspmschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.camspmschedulessource.data[i].fileattachmentlist);
    }
}
if (this.camsdepreciationschedulessource.data)
{
    for (let i = 0; i < this.camsdepreciationschedulessource.data.length; i++)
    {
        if (this.camsdepreciationschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsdepreciationschedulessource.data[i].fileattachmentlist);
    }
}
if (this.camsassetreadinghistoriessource.data)
{
    for (let i = 0; i < this.camsassetreadinghistoriessource.data.length; i++)
    {
        if (this.camsassetreadinghistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassetreadinghistoriessource.data[i].fileattachmentlist);
    }
}
if (this.camsassettransferdetailssource.data)
{
    for (let i = 0; i < this.camsassettransferdetailssource.data.length; i++)
    {
        if (this.camsassettransferdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassettransferdetailssource.data[i].fileattachmentlist);
    }
}
if (this.camsassetreadingssource.data)
{
    for (let i = 0; i < this.camsassetreadingssource.data.length; i++)
    {
        if (this.camsassetreadingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassetreadingssource.data[i].fileattachmentlist);
    }
}
if (this.camsworkorderssource.data)
{
    for (let i = 0; i < this.camsworkorderssource.data.length; i++)
    {
        if (this.camsworkorderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsworkorderssource.data[i].fileattachmentlist);
    }
}
if (this.camsassetcostssource.data)
{
    for (let i = 0; i < this.camsassetcostssource.data.length; i++)
    {
        if (this.camsassetcostssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassetcostssource.data[i].fileattachmentlist);
    }
}
if (this.camsassetadditionssource.data)
{
    for (let i = 0; i < this.camsassetadditionssource.data.length; i++)
    {
        if (this.camsassetadditionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassetadditionssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetmaster);
}
else
{
this.FillData(res);
}
}
this.camsassetmasterForm.markAsUntouched();
this.camsassetmasterForm.markAsPristine();
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
data: {branchid:this.camsassetmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camsassetmasterForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.camsassetmasterForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.camsassetmasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditporeference( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.camsassetmasterForm.get('poreference').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditgrnid( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.camsassetmasterForm.get('grnid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditinvoicereference( invoiceid) {
/*let ScreenType='2';
this.dialog.open(erpcustomerinvoiceComponent, 
{
data: {invoiceid:this.camsassetmasterForm.get('invoicereference').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.camsassetmasterForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassetgroupid( assetgroupid) {
/*let ScreenType='2';
this.dialog.open(camsassetgroupComponent, 
{
data: {assetgroupid:this.camsassetmasterForm.get('assetgroupid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparentid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsassetmasterForm.get('parentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignedto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsassetmasterForm.get('assignedto').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontractorid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.camsassetmasterForm.get('contractorid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontractid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.camsassetmasterForm.get('contractid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdisposedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsassetmasterForm.get('disposedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditloanid( schemeid) {
/*let ScreenType='2';
this.dialog.open(hrmsloanschememasterComponent, 
{
data: {schemeid:this.camsassetmasterForm.get('loanid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamspmschedule(event:any,scheduleid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camspmscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, assetid,visiblelist:this.camspmschedulesvisiblelist,  hidelist:this.camspmscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camspmschedulessource.add(res);
this.camspmschedulessource.refresh();
}
else
{
this.camspmschedulessource.update(event.data, res);
}
}
});
}

onDeletecamspmschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamspmscheduleIDs += childID + ",";
this.camsassetmasterservice.camspmschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsdepreciationschedule(event:any,scheduleid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsdepreciationscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, assetid,visiblelist:this.camsdepreciationschedulesvisiblelist,  hidelist:this.camsdepreciationscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsdepreciationschedulessource.add(res);
this.camsdepreciationschedulessource.refresh();
}
else
{
this.camsdepreciationschedulessource.update(event.data, res);
}
}
});
}

onDeletecamsdepreciationschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsdepreciationscheduleIDs += childID + ",";
this.camsassetmasterservice.camsdepreciationschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsassetreadinghistory(event:any,historyid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassetreadinghistoryComponent, 
{
data:  {  showview:false,save:false,event,historyid, assetid,visiblelist:this.camsassetreadinghistoriesvisiblelist,  hidelist:this.camsassetreadinghistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassetreadinghistoriessource.add(res);
this.camsassetreadinghistoriessource.refresh();
}
else
{
this.camsassetreadinghistoriessource.update(event.data, res);
}
}
});
}

onDeletecamsassetreadinghistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassetreadinghistoryIDs += childID + ",";
this.camsassetmasterservice.camsassetreadinghistories.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsassettransferdetail(event:any,transferid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassettransferdetailComponent, 
{
data:  {  showview:false,save:false,event,transferid, assetid,visiblelist:this.camsassettransferdetailsvisiblelist,  hidelist:this.camsassettransferdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassettransferdetailssource.add(res);
this.camsassettransferdetailssource.refresh();
}
else
{
this.camsassettransferdetailssource.update(event.data, res);
}
}
});
}

onDeletecamsassettransferdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassettransferdetailIDs += childID + ",";
this.camsassetmasterservice.camsassettransferdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsassetreading(event:any,readingid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassetreadingComponent, 
{
data:  {  showview:false,save:false,event,readingid, assetid,visiblelist:this.camsassetreadingsvisiblelist,  hidelist:this.camsassetreadingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassetreadingssource.add(res);
this.camsassetreadingssource.refresh();
}
else
{
this.camsassetreadingssource.update(event.data, res);
}
}
});
}

onDeletecamsassetreading(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassetreadingIDs += childID + ",";
this.camsassetmasterservice.camsassetreadings.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsworkorder(event:any,workorderid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, assetid,visiblelist:this.camsworkordersvisiblelist,  hidelist:this.camsworkordershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsworkorderssource.add(res);
this.camsworkorderssource.refresh();
}
else
{
this.camsworkorderssource.update(event.data, res);
}
}
});
}

onDeletecamsworkorder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsworkorderIDs += childID + ",";
this.camsassetmasterservice.camsworkorders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsassetcost(event:any,costid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassetcostComponent, 
{
data:  {  showview:false,save:false,event,costid, assetid,visiblelist:this.camsassetcostsvisiblelist,  hidelist:this.camsassetcostshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassetcostssource.add(res);
this.camsassetcostssource.refresh();
}
else
{
this.camsassetcostssource.update(event.data, res);
}
}
});
}

onDeletecamsassetcost(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassetcostIDs += childID + ",";
this.camsassetmasterservice.camsassetcosts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditcamsassetaddition(event:any,additionid:any, assetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassetadditionComponent, 
{
data:  {  showview:false,save:false,event,additionid, assetid,visiblelist:this.camsassetadditionsvisiblelist,  hidelist:this.camsassetadditionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassetadditionssource.add(res);
this.camsassetadditionssource.refresh();
}
else
{
this.camsassetadditionssource.update(event.data, res);
}
}
});
}

onDeletecamsassetaddition(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassetadditionIDs += childID + ",";
this.camsassetmasterservice.camsassetadditions.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camspmschedules
camspmschedulessettings:any;
camspmschedulessource: any;

showcamspmschedulesCheckbox()
{
debugger;
if(this.tblcamspmschedulessource.settings['selectMode']== 'multi')this.tblcamspmschedulessource.settings['selectMode']= 'single';
else
this.tblcamspmschedulessource.settings['selectMode']= 'multi';
this.tblcamspmschedulessource.initGrid();
}
deletecamspmschedulesAll()
{
this.tblcamspmschedulessource.settings['selectMode'] = 'single';
}
showcamspmschedulesFilter()
{
  setTimeout(() => {
  this.SetcamspmschedulesTableddConfig();
  });
      if(this.tblcamspmschedulessource.settings!=null)this.tblcamspmschedulessource.settings['hideSubHeader'] =!this.tblcamspmschedulessource.settings['hideSubHeader'];
this.tblcamspmschedulessource.initGrid();
}
showcamspmschedulesInActive()
{
}
enablecamspmschedulesInActive()
{
}
async SetcamspmschedulesTableddConfig()
{
if(!this.bfilterPopulatecamspmschedules){

this.configservice.getList("pmworktype").then(res=>
{
var dataworktype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulesworktype3.push(defaultobj);
for(let i=0; i<dataworktype2.length; i++){
var obj= { value: dataworktype2[i].configkey, title: dataworktype2[i].configtext};
this.datacamspmschedulesworktype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['worktype']!=undefined)clone.columns['worktype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesworktype3)), }, };
if(clone.columns['worktype']!=undefined)clone.columns['worktype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesworktype3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulesassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamspmschedulesassetid3.push(obj);
}
if((this.tblcamspmschedulessource.settings as any).columns['assetid'])
{
(this.tblcamspmschedulessource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamspmschedulesassetid3));
this.tblcamspmschedulessource.initGrid();
}
});

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var datapmlocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulespmlocationid3.push(defaultobj);
for(let i=0; i<datapmlocationid2.length; i++){
var obj= { value: datapmlocationid2[i].locationid, title:datapmlocationid2[i].locationname};
this.datacamspmschedulespmlocationid3.push(obj);
}
if((this.tblcamspmschedulessource.settings as any).columns['pmlocationid'])
{
(this.tblcamspmschedulessource.settings as any).columns['pmlocationid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamspmschedulespmlocationid3));
this.tblcamspmschedulessource.initGrid();
}
});

this.configservice.getList("pmtype").then(res=>
{
var datapmtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulespmtype3.push(defaultobj);
for(let i=0; i<datapmtype2.length; i++){
var obj= { value: datapmtype2[i].configkey, title: datapmtype2[i].configtext};
this.datacamspmschedulespmtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['pmtype']!=undefined)clone.columns['pmtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmtype3)), }, };
if(clone.columns['pmtype']!=undefined)clone.columns['pmtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmtype3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});

this.configservice.getList("measurementmeter").then(res=>
{
var datameasurementmeter2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulesmeasurementmeter3.push(defaultobj);
for(let i=0; i<datameasurementmeter2.length; i++){
var obj= { value: datameasurementmeter2[i].configkey, title: datameasurementmeter2[i].configtext};
this.datacamspmschedulesmeasurementmeter3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesmeasurementmeter3)), }, };
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesmeasurementmeter3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});

this.configservice.getList("timefrequency").then(res=>
{
var datafrequencyunit2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulesfrequencyunit3.push(defaultobj);
for(let i=0; i<datafrequencyunit2.length; i++){
var obj= { value: datafrequencyunit2[i].configkey, title: datafrequencyunit2[i].configtext};
this.datacamspmschedulesfrequencyunit3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['frequencyunit']!=undefined)clone.columns['frequencyunit'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesfrequencyunit3)), }, };
if(clone.columns['frequencyunit']!=undefined)clone.columns['frequencyunit'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulesfrequencyunit3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});

this.configservice.getList("pmgenerationtype").then(res=>
{
var datapmgenerationtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulespmgenerationtype3.push(defaultobj);
for(let i=0; i<datapmgenerationtype2.length; i++){
var obj= { value: datapmgenerationtype2[i].configkey, title: datapmgenerationtype2[i].configtext};
this.datacamspmschedulespmgenerationtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['pmgenerationtype']!=undefined)clone.columns['pmgenerationtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmgenerationtype3)), }, };
if(clone.columns['pmgenerationtype']!=undefined)clone.columns['pmgenerationtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmgenerationtype3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});

this.configservice.getList("pmstatus").then(res=>
{
var datapmstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamspmschedulespmstatus3.push(defaultobj);
for(let i=0; i<datapmstatus2.length; i++){
var obj= { value: datapmstatus2[i].configkey, title: datapmstatus2[i].configtext};
this.datacamspmschedulespmstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamspmschedulessource.settings);
if(clone.columns['pmstatus']!=undefined)clone.columns['pmstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmstatus3)), }, };
if(clone.columns['pmstatus']!=undefined)clone.columns['pmstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamspmschedulespmstatus3)), }, };
this.tblcamspmschedulessource.settings =  clone;
this.tblcamspmschedulessource.initGrid();
});
}
this.bfilterPopulatecamspmschedules=true;
}
async camspmschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamspmschedulesTableConfig()
{
this.camspmschedulessettings = {
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
description: {
title: 'Description',
type: '',
filter:true,
},
worktype: {
title: 'Work Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulesworktype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
pmlocationid: {
title: 'P M Location',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'fcx84',reportcode:'fcx84',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulespmlocationid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
pmtype: {
title: 'P M Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulespmtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
measurementmeter: {
title: 'Measurement Meter',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulesmeasurementmeter3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
meterreadingstart: {
title: 'Meter Reading Start',
type: 'number',
filter:true,
},
meterfrequency: {
title: 'Meter Frequency',
type: 'number',
filter:true,
},
pmdue: {
title: 'P M Due',
type: 'number',
filter:true,
},
lowerthresholdlimit: {
title: 'Lower Threshold Limit',
type: 'number',
filter:true,
},
upperthresholdlimit: {
title: 'Upper Threshold Limit',
type: 'number',
filter:true,
},
frequencyunit: {
title: 'Frequency Unit',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulesfrequencyunit3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
frequency: {
title: 'Frequency',
type: 'number',
filter:true,
},
days: {
title: 'Days',
type: '',
filter:true,
},
pmgenerationtype: {
title: 'P M Generation Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulespmgenerationtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
nextstartdate: {
title: 'Next Start Date',
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
pmstatus: {
title: 'P M Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamspmschedulespmstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
pmid: {
title: 'P M',
type: 'number',
filter:true,
},
},
};
}
camspmschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmschedulesID)>=0)
{
this.camspmschedulessource=new LocalDataSource();
this.camspmschedulessource.load(this.camsassetmasterservice.camspmschedules as  any as LocalDataSource);
this.camspmschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
camspmschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camspmschedules.length == 0)
{
    this.tblcamspmschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new camspmschedule();
    this.camsassetmasterservice.camspmschedules.push(obj);
    this.camspmschedulessource.refresh();
    if ((this.camsassetmasterservice.camspmschedules.length / this.camspmschedulessource.getPaging().perPage).toFixed(0) + 1 != this.camspmschedulessource.getPaging().page)
    {
        this.camspmschedulessource.setPage((this.camsassetmasterservice.camspmschedules.length / this.camspmschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamspmschedulessource.grid.edit(this.tblcamspmschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camspmschedulessource.data.indexOf(event.data);
this.onDeletecamspmschedule(event,event.data.scheduleid,((this.camspmschedulessource.getPaging().page-1) *this.camspmschedulessource.getPaging().perPage)+index);
this.camspmschedulessource.refresh();
break;
}
}

*/
camspmschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamspmschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamspmschedule(event,event.data.scheduleid,this.formid);
break;
case 'delete':
this.onDeletecamspmschedule(event,event.data.scheduleid,((this.camspmschedulessource.getPaging().page-1) *this.camspmschedulessource.getPaging().perPage)+event.index);
this.camspmschedulessource.refresh();
break;
}
}
camspmschedulesonDelete(obj) {
let scheduleid=obj.data.scheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(scheduleid).then(res=>
this.camspmschedulesLoadTable()
);
}
}
camspmschedulesPaging(val)
{
debugger;
this.camspmschedulessource.setPaging(1, val, true);
}

handlecamspmschedulesGridSelected(event:any) {
this.camspmschedulesselectedindex=this.camsassetmasterservice.camspmschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IscamspmschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camspmschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camspmschedules
//start of Grid Codes camsdepreciationschedules
camsdepreciationschedulessettings:any;
camsdepreciationschedulessource: any;

showcamsdepreciationschedulesCheckbox()
{
debugger;
if(this.tblcamsdepreciationschedulessource.settings['selectMode']== 'multi')this.tblcamsdepreciationschedulessource.settings['selectMode']= 'single';
else
this.tblcamsdepreciationschedulessource.settings['selectMode']= 'multi';
this.tblcamsdepreciationschedulessource.initGrid();
}
deletecamsdepreciationschedulesAll()
{
this.tblcamsdepreciationschedulessource.settings['selectMode'] = 'single';
}
showcamsdepreciationschedulesFilter()
{
  setTimeout(() => {
  this.SetcamsdepreciationschedulesTableddConfig();
  });
      if(this.tblcamsdepreciationschedulessource.settings!=null)this.tblcamsdepreciationschedulessource.settings['hideSubHeader'] =!this.tblcamsdepreciationschedulessource.settings['hideSubHeader'];
this.tblcamsdepreciationschedulessource.initGrid();
}
showcamsdepreciationschedulesInActive()
{
}
enablecamsdepreciationschedulesInActive()
{
}
async SetcamsdepreciationschedulesTableddConfig()
{
if(!this.bfilterPopulatecamsdepreciationschedules){
}
this.bfilterPopulatecamsdepreciationschedules=true;
}
async camsdepreciationschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsdepreciationschedulesTableConfig()
{
this.camsdepreciationschedulessettings = {
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
year: {
title: 'Year',
type: 'number',
filter:true,
},
currentdepreciation: {
title: 'Current Depreciation',
type: 'number',
filter:true,
},
cumulativedepreciation: {
title: 'Cumulative Depreciation',
type: 'number',
filter:true,
},
bookvalue: {
title: 'Book Value',
type: 'number',
filter:true,
},
},
};
}
camsdepreciationschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsdepreciationschedulesID)>=0)
{
this.camsdepreciationschedulessource=new LocalDataSource();
this.camsdepreciationschedulessource.load(this.camsassetmasterservice.camsdepreciationschedules as  any as LocalDataSource);
this.camsdepreciationschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsdepreciationschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsdepreciationschedules.length == 0)
{
    this.tblcamsdepreciationschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new camsdepreciationschedule();
    this.camsassetmasterservice.camsdepreciationschedules.push(obj);
    this.camsdepreciationschedulessource.refresh();
    if ((this.camsassetmasterservice.camsdepreciationschedules.length / this.camsdepreciationschedulessource.getPaging().perPage).toFixed(0) + 1 != this.camsdepreciationschedulessource.getPaging().page)
    {
        this.camsdepreciationschedulessource.setPage((this.camsassetmasterservice.camsdepreciationschedules.length / this.camsdepreciationschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsdepreciationschedulessource.grid.edit(this.tblcamsdepreciationschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsdepreciationschedulessource.data.indexOf(event.data);
this.onDeletecamsdepreciationschedule(event,event.data.scheduleid,((this.camsdepreciationschedulessource.getPaging().page-1) *this.camsdepreciationschedulessource.getPaging().perPage)+index);
this.camsdepreciationschedulessource.refresh();
break;
}
}

*/
camsdepreciationschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsdepreciationschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsdepreciationschedule(event,event.data.scheduleid,this.formid);
break;
case 'delete':
this.onDeletecamsdepreciationschedule(event,event.data.scheduleid,((this.camsdepreciationschedulessource.getPaging().page-1) *this.camsdepreciationschedulessource.getPaging().perPage)+event.index);
this.camsdepreciationschedulessource.refresh();
break;
}
}
camsdepreciationschedulesonDelete(obj) {
let scheduleid=obj.data.scheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(scheduleid).then(res=>
this.camsdepreciationschedulesLoadTable()
);
}
}
camsdepreciationschedulesPaging(val)
{
debugger;
this.camsdepreciationschedulessource.setPaging(1, val, true);
}

handlecamsdepreciationschedulesGridSelected(event:any) {
this.camsdepreciationschedulesselectedindex=this.camsassetmasterservice.camsdepreciationschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IscamsdepreciationschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsdepreciationschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsdepreciationschedules
//start of Grid Codes camsassetreadinghistories
camsassetreadinghistoriessettings:any;
camsassetreadinghistoriessource: any;

showcamsassetreadinghistoriesCheckbox()
{
debugger;
if(this.tblcamsassetreadinghistoriessource.settings['selectMode']== 'multi')this.tblcamsassetreadinghistoriessource.settings['selectMode']= 'single';
else
this.tblcamsassetreadinghistoriessource.settings['selectMode']= 'multi';
this.tblcamsassetreadinghistoriessource.initGrid();
}
deletecamsassetreadinghistoriesAll()
{
this.tblcamsassetreadinghistoriessource.settings['selectMode'] = 'single';
}
showcamsassetreadinghistoriesFilter()
{
  setTimeout(() => {
  this.SetcamsassetreadinghistoriesTableddConfig();
  });
      if(this.tblcamsassetreadinghistoriessource.settings!=null)this.tblcamsassetreadinghistoriessource.settings['hideSubHeader'] =!this.tblcamsassetreadinghistoriessource.settings['hideSubHeader'];
this.tblcamsassetreadinghistoriessource.initGrid();
}
showcamsassetreadinghistoriesInActive()
{
}
enablecamsassetreadinghistoriesInActive()
{
}
async SetcamsassetreadinghistoriesTableddConfig()
{
if(!this.bfilterPopulatecamsassetreadinghistories){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadinghistoriesassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassetreadinghistoriesassetid3.push(obj);
}
if((this.tblcamsassetreadinghistoriessource.settings as any).columns['assetid'])
{
(this.tblcamsassetreadinghistoriessource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesassetid3));
this.tblcamsassetreadinghistoriessource.initGrid();
}
});

this.configservice.getList("readingpointcode").then(res=>
{
var datareadingpointcode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadinghistoriesreadingpointcode3.push(defaultobj);
for(let i=0; i<datareadingpointcode2.length; i++){
var obj= { value: datareadingpointcode2[i].configkey, title: datareadingpointcode2[i].configtext};
this.datacamsassetreadinghistoriesreadingpointcode3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadinghistoriessource.settings);
if(clone.columns['readingpointcode']!=undefined)clone.columns['readingpointcode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesreadingpointcode3)), }, };
if(clone.columns['readingpointcode']!=undefined)clone.columns['readingpointcode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesreadingpointcode3)), }, };
this.tblcamsassetreadinghistoriessource.settings =  clone;
this.tblcamsassetreadinghistoriessource.initGrid();
});

this.configservice.getList("readingtype").then(res=>
{
var datareadingtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadinghistoriesreadingtype3.push(defaultobj);
for(let i=0; i<datareadingtype2.length; i++){
var obj= { value: datareadingtype2[i].configkey, title: datareadingtype2[i].configtext};
this.datacamsassetreadinghistoriesreadingtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadinghistoriessource.settings);
if(clone.columns['readingtype']!=undefined)clone.columns['readingtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesreadingtype3)), }, };
if(clone.columns['readingtype']!=undefined)clone.columns['readingtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesreadingtype3)), }, };
this.tblcamsassetreadinghistoriessource.settings =  clone;
this.tblcamsassetreadinghistoriessource.initGrid();
});

this.configservice.getList("measurementmeter").then(res=>
{
var datameasurementmeter2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadinghistoriesmeasurementmeter3.push(defaultobj);
for(let i=0; i<datameasurementmeter2.length; i++){
var obj= { value: datameasurementmeter2[i].configkey, title: datameasurementmeter2[i].configtext};
this.datacamsassetreadinghistoriesmeasurementmeter3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadinghistoriessource.settings);
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesmeasurementmeter3)), }, };
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadinghistoriesmeasurementmeter3)), }, };
this.tblcamsassetreadinghistoriessource.settings =  clone;
this.tblcamsassetreadinghistoriessource.initGrid();
});
}
this.bfilterPopulatecamsassetreadinghistories=true;
}
async camsassetreadinghistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassetreadinghistoriesTableConfig()
{
this.camsassetreadinghistoriessettings = {
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
readingpointcode: {
title: 'Reading Point Code',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassetreadinghistoriesreadingpointcode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
measurementmeter: {
title: 'Measurement Meter',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassetreadinghistoriesmeasurementmeter3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
reading: {
title: 'Reading',
type: 'number',
filter:true,
},
},
};
}
camsassetreadinghistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetreadinghistoriesID)>=0)
{
this.camsassetreadinghistoriessource=new LocalDataSource();
this.camsassetreadinghistoriessource.load(this.camsassetmasterservice.camsassetreadinghistories as  any as LocalDataSource);
this.camsassetreadinghistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassetreadinghistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsassetreadinghistories.length == 0)
{
    this.tblcamsassetreadinghistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new camsassetreadinghistory();
    this.camsassetmasterservice.camsassetreadinghistories.push(obj);
    this.camsassetreadinghistoriessource.refresh();
    if ((this.camsassetmasterservice.camsassetreadinghistories.length / this.camsassetreadinghistoriessource.getPaging().perPage).toFixed(0) + 1 != this.camsassetreadinghistoriessource.getPaging().page)
    {
        this.camsassetreadinghistoriessource.setPage((this.camsassetmasterservice.camsassetreadinghistories.length / this.camsassetreadinghistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassetreadinghistoriessource.grid.edit(this.tblcamsassetreadinghistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassetreadinghistoriessource.data.indexOf(event.data);
this.onDeletecamsassetreadinghistory(event,event.data.historyid,((this.camsassetreadinghistoriessource.getPaging().page-1) *this.camsassetreadinghistoriessource.getPaging().perPage)+index);
this.camsassetreadinghistoriessource.refresh();
break;
}
}

*/
camsassetreadinghistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassetreadinghistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassetreadinghistory(event,event.data.historyid,this.formid);
break;
case 'delete':
this.onDeletecamsassetreadinghistory(event,event.data.historyid,((this.camsassetreadinghistoriessource.getPaging().page-1) *this.camsassetreadinghistoriessource.getPaging().perPage)+event.index);
this.camsassetreadinghistoriessource.refresh();
break;
}
}
camsassetreadinghistoriesonDelete(obj) {
let historyid=obj.data.historyid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(historyid).then(res=>
this.camsassetreadinghistoriesLoadTable()
);
}
}
camsassetreadinghistoriesPaging(val)
{
debugger;
this.camsassetreadinghistoriessource.setPaging(1, val, true);
}

handlecamsassetreadinghistoriesGridSelected(event:any) {
this.camsassetreadinghistoriesselectedindex=this.camsassetmasterservice.camsassetreadinghistories.findIndex(i => i.historyid === event.data.historyid);
}
IscamsassetreadinghistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetreadinghistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassetreadinghistories
//start of Grid Codes camsassettransferdetails
camsassettransferdetailssettings:any;
camsassettransferdetailssource: any;

showcamsassettransferdetailsCheckbox()
{
debugger;
if(this.tblcamsassettransferdetailssource.settings['selectMode']== 'multi')this.tblcamsassettransferdetailssource.settings['selectMode']= 'single';
else
this.tblcamsassettransferdetailssource.settings['selectMode']= 'multi';
this.tblcamsassettransferdetailssource.initGrid();
}
deletecamsassettransferdetailsAll()
{
this.tblcamsassettransferdetailssource.settings['selectMode'] = 'single';
}
showcamsassettransferdetailsFilter()
{
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });
      if(this.tblcamsassettransferdetailssource.settings!=null)this.tblcamsassettransferdetailssource.settings['hideSubHeader'] =!this.tblcamsassettransferdetailssource.settings['hideSubHeader'];
this.tblcamsassettransferdetailssource.initGrid();
}
showcamsassettransferdetailsInActive()
{
}
enablecamsassettransferdetailsInActive()
{
}
async SetcamsassettransferdetailsTableddConfig()
{
if(!this.bfilterPopulatecamsassettransferdetails){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassettransferdetailsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassettransferdetailsassetid3.push(obj);
}
if((this.tblcamsassettransferdetailssource.settings as any).columns['assetid'])
{
(this.tblcamsassettransferdetailssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassettransferdetailsassetid3));
this.tblcamsassettransferdetailssource.initGrid();
}
});
}
this.bfilterPopulatecamsassettransferdetails=true;
}
async camsassettransferdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassettransferdetailsTableConfig()
{
this.camsassettransferdetailssettings = {
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
camsassettransferdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassettransferdetailsID)>=0)
{
this.camsassettransferdetailssource=new LocalDataSource();
this.camsassettransferdetailssource.load(this.camsassetmasterservice.camsassettransferdetails as  any as LocalDataSource);
this.camsassettransferdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassettransferdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsassettransferdetails.length == 0)
{
    this.tblcamsassettransferdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassettransferdetail();
    this.camsassetmasterservice.camsassettransferdetails.push(obj);
    this.camsassettransferdetailssource.refresh();
    if ((this.camsassetmasterservice.camsassettransferdetails.length / this.camsassettransferdetailssource.getPaging().perPage).toFixed(0) + 1 != this.camsassettransferdetailssource.getPaging().page)
    {
        this.camsassettransferdetailssource.setPage((this.camsassetmasterservice.camsassettransferdetails.length / this.camsassettransferdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassettransferdetailssource.grid.edit(this.tblcamsassettransferdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassettransferdetailssource.data.indexOf(event.data);
this.onDeletecamsassettransferdetail(event,event.data.transferdetailid,((this.camsassettransferdetailssource.getPaging().page-1) *this.camsassettransferdetailssource.getPaging().perPage)+index);
this.camsassettransferdetailssource.refresh();
break;
}
}

*/
camsassettransferdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassettransferdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassettransferdetail(event,event.data.transferdetailid,this.formid);
break;
case 'delete':
this.onDeletecamsassettransferdetail(event,event.data.transferdetailid,((this.camsassettransferdetailssource.getPaging().page-1) *this.camsassettransferdetailssource.getPaging().perPage)+event.index);
this.camsassettransferdetailssource.refresh();
break;
}
}
camsassettransferdetailsonDelete(obj) {
let transferdetailid=obj.data.transferdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(transferdetailid).then(res=>
this.camsassettransferdetailsLoadTable()
);
}
}
camsassettransferdetailsPaging(val)
{
debugger;
this.camsassettransferdetailssource.setPaging(1, val, true);
}

handlecamsassettransferdetailsGridSelected(event:any) {
this.camsassettransferdetailsselectedindex=this.camsassetmasterservice.camsassettransferdetails.findIndex(i => i.transferid === event.data.transferid);
}
IscamsassettransferdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassettransferdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassettransferdetails
//start of Grid Codes camsassetreadings
camsassetreadingssettings:any;
camsassetreadingssource: any;

showcamsassetreadingsCheckbox()
{
debugger;
if(this.tblcamsassetreadingssource.settings['selectMode']== 'multi')this.tblcamsassetreadingssource.settings['selectMode']= 'single';
else
this.tblcamsassetreadingssource.settings['selectMode']= 'multi';
this.tblcamsassetreadingssource.initGrid();
}
deletecamsassetreadingsAll()
{
this.tblcamsassetreadingssource.settings['selectMode'] = 'single';
}
showcamsassetreadingsFilter()
{
  setTimeout(() => {
  this.SetcamsassetreadingsTableddConfig();
  });
      if(this.tblcamsassetreadingssource.settings!=null)this.tblcamsassetreadingssource.settings['hideSubHeader'] =!this.tblcamsassetreadingssource.settings['hideSubHeader'];
this.tblcamsassetreadingssource.initGrid();
}
showcamsassetreadingsInActive()
{
}
enablecamsassetreadingsInActive()
{
}
async SetcamsassetreadingsTableddConfig()
{
if(!this.bfilterPopulatecamsassetreadings){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadingsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassetreadingsassetid3.push(obj);
}
if((this.tblcamsassetreadingssource.settings as any).columns['assetid'])
{
(this.tblcamsassetreadingssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetreadingsassetid3));
this.tblcamsassetreadingssource.initGrid();
}
});

this.configservice.getList("readingpointcode").then(res=>
{
var datareadingpointcode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadingsreadingpointcode3.push(defaultobj);
for(let i=0; i<datareadingpointcode2.length; i++){
var obj= { value: datareadingpointcode2[i].configkey, title: datareadingpointcode2[i].configtext};
this.datacamsassetreadingsreadingpointcode3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadingssource.settings);
if(clone.columns['readingpointcode']!=undefined)clone.columns['readingpointcode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsreadingpointcode3)), }, };
if(clone.columns['readingpointcode']!=undefined)clone.columns['readingpointcode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsreadingpointcode3)), }, };
this.tblcamsassetreadingssource.settings =  clone;
this.tblcamsassetreadingssource.initGrid();
});

this.configservice.getList("readingtype").then(res=>
{
var datareadingtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadingsreadingtype3.push(defaultobj);
for(let i=0; i<datareadingtype2.length; i++){
var obj= { value: datareadingtype2[i].configkey, title: datareadingtype2[i].configtext};
this.datacamsassetreadingsreadingtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadingssource.settings);
if(clone.columns['readingtype']!=undefined)clone.columns['readingtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsreadingtype3)), }, };
if(clone.columns['readingtype']!=undefined)clone.columns['readingtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsreadingtype3)), }, };
this.tblcamsassetreadingssource.settings =  clone;
this.tblcamsassetreadingssource.initGrid();
});

this.configservice.getList("measurementmeter").then(res=>
{
var datameasurementmeter2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetreadingsmeasurementmeter3.push(defaultobj);
for(let i=0; i<datameasurementmeter2.length; i++){
var obj= { value: datameasurementmeter2[i].configkey, title: datameasurementmeter2[i].configtext};
this.datacamsassetreadingsmeasurementmeter3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetreadingssource.settings);
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsmeasurementmeter3)), }, };
if(clone.columns['measurementmeter']!=undefined)clone.columns['measurementmeter'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetreadingsmeasurementmeter3)), }, };
this.tblcamsassetreadingssource.settings =  clone;
this.tblcamsassetreadingssource.initGrid();
});
}
this.bfilterPopulatecamsassetreadings=true;
}
async camsassetreadingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassetreadingsTableConfig()
{
this.camsassetreadingssettings = {
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
readingpointcode: {
title: 'Reading Point Code',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassetreadingsreadingpointcode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
measurementmeter: {
title: 'Measurement Meter',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassetreadingsmeasurementmeter3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
reading: {
title: 'Reading',
type: 'number',
filter:true,
},
},
};
}
camsassetreadingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetreadingsID)>=0)
{
this.camsassetreadingssource=new LocalDataSource();
this.camsassetreadingssource.load(this.camsassetmasterservice.camsassetreadings as  any as LocalDataSource);
this.camsassetreadingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassetreadingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsassetreadings.length == 0)
{
    this.tblcamsassetreadingssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassetreading();
    this.camsassetmasterservice.camsassetreadings.push(obj);
    this.camsassetreadingssource.refresh();
    if ((this.camsassetmasterservice.camsassetreadings.length / this.camsassetreadingssource.getPaging().perPage).toFixed(0) + 1 != this.camsassetreadingssource.getPaging().page)
    {
        this.camsassetreadingssource.setPage((this.camsassetmasterservice.camsassetreadings.length / this.camsassetreadingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassetreadingssource.grid.edit(this.tblcamsassetreadingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassetreadingssource.data.indexOf(event.data);
this.onDeletecamsassetreading(event,event.data.readingid,((this.camsassetreadingssource.getPaging().page-1) *this.camsassetreadingssource.getPaging().perPage)+index);
this.camsassetreadingssource.refresh();
break;
}
}

*/
camsassetreadingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassetreading(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassetreading(event,event.data.readingid,this.formid);
break;
case 'delete':
this.onDeletecamsassetreading(event,event.data.readingid,((this.camsassetreadingssource.getPaging().page-1) *this.camsassetreadingssource.getPaging().perPage)+event.index);
this.camsassetreadingssource.refresh();
break;
}
}
camsassetreadingsonDelete(obj) {
let readingid=obj.data.readingid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(readingid).then(res=>
this.camsassetreadingsLoadTable()
);
}
}
camsassetreadingsPaging(val)
{
debugger;
this.camsassetreadingssource.setPaging(1, val, true);
}

handlecamsassetreadingsGridSelected(event:any) {
this.camsassetreadingsselectedindex=this.camsassetmasterservice.camsassetreadings.findIndex(i => i.readingid === event.data.readingid);
}
IscamsassetreadingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetreadingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassetreadings
//start of Grid Codes camsworkorders
camsworkorderssettings:any;
camsworkorderssource: any;

showcamsworkordersCheckbox()
{
debugger;
if(this.tblcamsworkorderssource.settings['selectMode']== 'multi')this.tblcamsworkorderssource.settings['selectMode']= 'single';
else
this.tblcamsworkorderssource.settings['selectMode']= 'multi';
this.tblcamsworkorderssource.initGrid();
}
deletecamsworkordersAll()
{
this.tblcamsworkorderssource.settings['selectMode'] = 'single';
}
showcamsworkordersFilter()
{
  setTimeout(() => {
  this.SetcamsworkordersTableddConfig();
  });
      if(this.tblcamsworkorderssource.settings!=null)this.tblcamsworkorderssource.settings['hideSubHeader'] =!this.tblcamsworkorderssource.settings['hideSubHeader'];
this.tblcamsworkorderssource.initGrid();
}
showcamsworkordersInActive()
{
}
enablecamsworkordersInActive()
{
}
async SetcamsworkordersTableddConfig()
{
if(!this.bfilterPopulatecamsworkorders){

this.configservice.getList("requesttype").then(res=>
{
var datarequesttype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersrequesttype3.push(defaultobj);
for(let i=0; i<datarequesttype2.length; i++){
var obj= { value: datarequesttype2[i].configkey, title: datarequesttype2[i].configtext};
this.datacamsworkordersrequesttype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['requesttype']!=undefined)clone.columns['requesttype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersrequesttype3)), }, };
if(clone.columns['requesttype']!=undefined)clone.columns['requesttype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersrequesttype3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("pmworktype").then(res=>
{
var dataworktype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersworktype3.push(defaultobj);
for(let i=0; i<dataworktype2.length; i++){
var obj= { value: dataworktype2[i].configkey, title: dataworktype2[i].configtext};
this.datacamsworkordersworktype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['worktype']!=undefined)clone.columns['worktype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersworktype3)), }, };
if(clone.columns['worktype']!=undefined)clone.columns['worktype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersworktype3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datarequestorid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersrequestorid3.push(defaultobj);
for(let i=0; i<datarequestorid2.length; i++){
var obj= { value: datarequestorid2[i].userid, title:datarequestorid2[i].username};
this.datacamsworkordersrequestorid3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['requestorid'])
{
(this.tblcamsworkorderssource.settings as any).columns['requestorid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkordersrequestorid3));
this.tblcamsworkorderssource.initGrid();
}
});

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsworkordersassetid3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['assetid'])
{
(this.tblcamsworkorderssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkordersassetid3));
this.tblcamsworkorderssource.initGrid();
}
});

this.configservice.getList("assetstatus").then(res=>
{
var dataassetstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersassetstatus3.push(defaultobj);
for(let i=0; i<dataassetstatus2.length; i++){
var obj= { value: dataassetstatus2[i].configkey, title: dataassetstatus2[i].configtext};
this.datacamsworkordersassetstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['assetstatus']!=undefined)clone.columns['assetstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersassetstatus3)), }, };
if(clone.columns['assetstatus']!=undefined)clone.columns['assetstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersassetstatus3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var datalocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderslocationid3.push(defaultobj);
for(let i=0; i<datalocationid2.length; i++){
var obj= { value: datalocationid2[i].locationid, title:datalocationid2[i].locationname};
this.datacamsworkorderslocationid3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['locationid'])
{
(this.tblcamsworkorderssource.settings as any).columns['locationid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkorderslocationid3));
this.tblcamsworkorderssource.initGrid();
}
});

this.bobranchsublocationservice.getbobranchsublocationsList().then(res=>
{
var datasublocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderssublocationid3.push(defaultobj);
for(let i=0; i<datasublocationid2.length; i++){
var obj= { value: datasublocationid2[i].sublocationid, title:datasublocationid2[i].locationname};
this.datacamsworkorderssublocationid3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['sublocationid'])
{
(this.tblcamsworkorderssource.settings as any).columns['sublocationid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkorderssublocationid3));
this.tblcamsworkorderssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datareportedby2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersreportedby3.push(defaultobj);
for(let i=0; i<datareportedby2.length; i++){
var obj= { value: datareportedby2[i].userid, title:datareportedby2[i].username};
this.datacamsworkordersreportedby3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['reportedby'])
{
(this.tblcamsworkorderssource.settings as any).columns['reportedby'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkordersreportedby3));
this.tblcamsworkorderssource.initGrid();
}
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderspriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.datacamsworkorderspriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderspriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderspriority3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("criticality").then(res=>
{
var datacriticality2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderscriticality3.push(defaultobj);
for(let i=0; i<datacriticality2.length; i++){
var obj= { value: datacriticality2[i].configkey, title: datacriticality2[i].configtext};
this.datacamsworkorderscriticality3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderscriticality3)), }, };
if(clone.columns['criticality']!=undefined)clone.columns['criticality'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderscriticality3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("workpersontype").then(res=>
{
var dataworkpersontype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersworkpersontype3.push(defaultobj);
for(let i=0; i<dataworkpersontype2.length; i++){
var obj= { value: dataworkpersontype2[i].configkey, title: dataworkpersontype2[i].configtext};
this.datacamsworkordersworkpersontype3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['workpersontype']!=undefined)clone.columns['workpersontype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersworkpersontype3)), }, };
if(clone.columns['workpersontype']!=undefined)clone.columns['workpersontype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersworkpersontype3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.erpsuppliermasterservice.geterpsuppliermastersList().then(res=>
{
var datasupplierid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderssupplierid3.push(defaultobj);
for(let i=0; i<datasupplierid2.length; i++){
var obj= { value: datasupplierid2[i].supplierid, title:datasupplierid2[i].suppliercode};
this.datacamsworkorderssupplierid3.push(obj);
}
if((this.tblcamsworkorderssource.settings as any).columns['supplierid'])
{
(this.tblcamsworkorderssource.settings as any).columns['supplierid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsworkorderssupplierid3));
this.tblcamsworkorderssource.initGrid();
}
});

this.configservice.getList("camsorderstatus").then(res=>
{
var dataorderstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersorderstatus3.push(defaultobj);
for(let i=0; i<dataorderstatus2.length; i++){
var obj= { value: dataorderstatus2[i].configkey, title: dataorderstatus2[i].configtext};
this.datacamsworkordersorderstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['orderstatus']!=undefined)clone.columns['orderstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersorderstatus3)), }, };
if(clone.columns['orderstatus']!=undefined)clone.columns['orderstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersorderstatus3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("camsproblem").then(res=>
{
var dataproblem2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersproblem3.push(defaultobj);
for(let i=0; i<dataproblem2.length; i++){
var obj= { value: dataproblem2[i].configkey, title: dataproblem2[i].configtext};
this.datacamsworkordersproblem3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['problem']!=undefined)clone.columns['problem'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersproblem3)), }, };
if(clone.columns['problem']!=undefined)clone.columns['problem'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersproblem3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("rootcause").then(res=>
{
var datarootcause2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkordersrootcause3.push(defaultobj);
for(let i=0; i<datarootcause2.length; i++){
var obj= { value: datarootcause2[i].configkey, title: datarootcause2[i].configtext};
this.datacamsworkordersrootcause3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['rootcause']!=undefined)clone.columns['rootcause'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersrootcause3)), }, };
if(clone.columns['rootcause']!=undefined)clone.columns['rootcause'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkordersrootcause3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});

this.configservice.getList("solution").then(res=>
{
var datasolution2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsworkorderssolution3.push(defaultobj);
for(let i=0; i<datasolution2.length; i++){
var obj= { value: datasolution2[i].configkey, title: datasolution2[i].configtext};
this.datacamsworkorderssolution3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsworkorderssource.settings);
if(clone.columns['solution']!=undefined)clone.columns['solution'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderssolution3)), }, };
if(clone.columns['solution']!=undefined)clone.columns['solution'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsworkorderssolution3)), }, };
this.tblcamsworkorderssource.settings =  clone;
this.tblcamsworkorderssource.initGrid();
});
}
this.bfilterPopulatecamsworkorders=true;
}
async camsworkordersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsworkordersTableConfig()
{
this.camsworkorderssettings = {
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
requesttype: {
title: 'Request Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersrequesttype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
requestid: {
title: 'Request',
type: 'number',
filter:true,
},
requestreference: {
title: 'Request Reference',
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
worktype: {
title: 'Work Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersworktype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
requestorid: {
title: 'Requestor',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersrequestorid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assetstatus: {
title: 'Asset Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersassetstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
locationid: {
title: 'Location',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'fcx84',reportcode:'fcx84',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderslocationid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
sublocationid: {
title: 'Sublocation',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderssublocationid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
breakdowndate: {
title: 'Breakdown Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
breakdownreported: {
title: 'Breakdown Reported',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reportedby: {
title: 'Reported By',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersreportedby3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
repairstarted: {
title: 'Repair Started',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
repaircompleted: {
title: 'Repair Completed',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
online: {
title: 'On Line',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderspriority3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
criticality: {
title: 'Criticality',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderscriticality3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
requireddate: {
title: 'Required Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requestremarks: {
title: 'Request Remarks',
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
assetnotes: {
title: 'Asset Notes',
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
workpersontype: {
title: 'Work Person Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersworkpersontype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
estimatedworkhrs: {
title: 'Estimated Work Hrs',
type: '',
filter:true,
renderComponent: durationComponent,
editor: {
type: 'custom',
component: durationComponent,
},
},
actualworkhrs: {
title: 'Actual Work Hrs',
type: '',
filter:true,
renderComponent: durationComponent,
editor: {
type: 'custom',
component: durationComponent,
},
},
supplierid: {
title: 'Supplier',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'qtmcq',reportcode:'qtmcq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderssupplierid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
suppliername: {
title: 'Supplier Name',
type: '',
filter:true,
},
expirydate: {
title: 'Expiry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
valuePrepareFunction: (cell, row) => {
let ret= this.sharedService.ParseUserAccess(cell);
return ret;
},
},
username: {
title: 'User Name',
type: '',
filter:true,
},
telephone: {
title: 'Telephone',
type: '',
filter:true,
},
mobile: {
title: 'Mobile',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
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
worknotes: {
title: 'Work Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
query: {
title: 'Query',
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
orderstatus: {
title: 'Order Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersorderstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
completionnotes: {
title: 'Completion Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
problem: {
title: 'Problem',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersproblem3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rootcause: {
title: 'Root Cause',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkordersrootcause3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
solution: {
title: 'Solution',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datacamsworkorderssolution3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
problemdetail: {
title: 'Problem Detail',
type: '',
filter:true,
},
rootcausedetail: {
title: 'Root Cause Detail',
type: '',
filter:true,
},
solutiondetail: {
title: 'Solution Detail',
type: '',
filter:true,
},
expenseid: {
title: 'Expense',
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
valuePrepareFunction: (cell,row) => {
let ret=  this.sharedService.ParseComment(cell);
return ret;
},
},
customfield: {
title: 'Custom Field',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
scheduleid: {
title: 'Schedule',
type: 'number',
filter:true,
},
scheduletaskid: {
title: 'Schedule Task',
type: 'number',
filter:true,
},
},
};
}
camsworkordersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkordersID)>=0)
{
this.camsworkorderssource=new LocalDataSource();
this.camsworkorderssource.load(this.camsassetmasterservice.camsworkorders as  any as LocalDataSource);
this.camsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsworkorders.length == 0)
{
    this.tblcamsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new camsworkorder();
    this.camsassetmasterservice.camsworkorders.push(obj);
    this.camsworkorderssource.refresh();
    if ((this.camsassetmasterservice.camsworkorders.length / this.camsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.camsworkorderssource.getPaging().page)
    {
        this.camsworkorderssource.setPage((this.camsassetmasterservice.camsworkorders.length / this.camsworkorderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsworkorderssource.grid.edit(this.tblcamsworkorderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsworkorderssource.data.indexOf(event.data);
this.onDeletecamsworkorder(event,event.data.workorderid,((this.camsworkorderssource.getPaging().page-1) *this.camsworkorderssource.getPaging().perPage)+index);
this.camsworkorderssource.refresh();
break;
}
}

*/
camsworkordersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsworkorder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsworkorder(event,event.data.workorderid,this.formid);
break;
case 'delete':
this.onDeletecamsworkorder(event,event.data.workorderid,((this.camsworkorderssource.getPaging().page-1) *this.camsworkorderssource.getPaging().perPage)+event.index);
this.camsworkorderssource.refresh();
break;
}
}
camsworkordersonDelete(obj) {
let workorderid=obj.data.workorderid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(workorderid).then(res=>
this.camsworkordersLoadTable()
);
}
}
camsworkordersPaging(val)
{
debugger;
this.camsworkorderssource.setPaging(1, val, true);
}

handlecamsworkordersGridSelected(event:any) {
this.camsworkordersselectedindex=this.camsassetmasterservice.camsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
}
IscamsworkordersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsworkordersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsworkorders
//start of Grid Codes camsassetcosts
camsassetcostssettings:any;
camsassetcostssource: any;

showcamsassetcostsCheckbox()
{
debugger;
if(this.tblcamsassetcostssource.settings['selectMode']== 'multi')this.tblcamsassetcostssource.settings['selectMode']= 'single';
else
this.tblcamsassetcostssource.settings['selectMode']= 'multi';
this.tblcamsassetcostssource.initGrid();
}
deletecamsassetcostsAll()
{
this.tblcamsassetcostssource.settings['selectMode'] = 'single';
}
showcamsassetcostsFilter()
{
  setTimeout(() => {
  this.SetcamsassetcostsTableddConfig();
  });
      if(this.tblcamsassetcostssource.settings!=null)this.tblcamsassetcostssource.settings['hideSubHeader'] =!this.tblcamsassetcostssource.settings['hideSubHeader'];
this.tblcamsassetcostssource.initGrid();
}
showcamsassetcostsInActive()
{
}
enablecamsassetcostsInActive()
{
}
async SetcamsassetcostsTableddConfig()
{
if(!this.bfilterPopulatecamsassetcosts){
}
this.bfilterPopulatecamsassetcosts=true;
}
async camsassetcostsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassetcostsTableConfig()
{
this.camsassetcostssettings = {
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
costtype: {
title: 'Cost Type',
type: '',
filter:true,
},
cost: {
title: 'Cost',
type: 'number',
filter:true,
},
taskcompleted: {
title: 'Task Completed',
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
party: {
title: 'Party',
type: '',
filter:true,
},
},
};
}
camsassetcostsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetcostsID)>=0)
{
this.camsassetcostssource=new LocalDataSource();
this.camsassetcostssource.load(this.camsassetmasterservice.camsassetcosts as  any as LocalDataSource);
this.camsassetcostssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassetcostsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsassetcosts.length == 0)
{
    this.tblcamsassetcostssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassetcost();
    this.camsassetmasterservice.camsassetcosts.push(obj);
    this.camsassetcostssource.refresh();
    if ((this.camsassetmasterservice.camsassetcosts.length / this.camsassetcostssource.getPaging().perPage).toFixed(0) + 1 != this.camsassetcostssource.getPaging().page)
    {
        this.camsassetcostssource.setPage((this.camsassetmasterservice.camsassetcosts.length / this.camsassetcostssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassetcostssource.grid.edit(this.tblcamsassetcostssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassetcostssource.data.indexOf(event.data);
this.onDeletecamsassetcost(event,event.data.costid,((this.camsassetcostssource.getPaging().page-1) *this.camsassetcostssource.getPaging().perPage)+index);
this.camsassetcostssource.refresh();
break;
}
}

*/
camsassetcostsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassetcost(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassetcost(event,event.data.costid,this.formid);
break;
case 'delete':
this.onDeletecamsassetcost(event,event.data.costid,((this.camsassetcostssource.getPaging().page-1) *this.camsassetcostssource.getPaging().perPage)+event.index);
this.camsassetcostssource.refresh();
break;
}
}
camsassetcostsonDelete(obj) {
let costid=obj.data.costid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(costid).then(res=>
this.camsassetcostsLoadTable()
);
}
}
camsassetcostsPaging(val)
{
debugger;
this.camsassetcostssource.setPaging(1, val, true);
}

handlecamsassetcostsGridSelected(event:any) {
this.camsassetcostsselectedindex=this.camsassetmasterservice.camsassetcosts.findIndex(i => i.costid === event.data.costid);
}
IscamsassetcostsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetcostsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassetcosts
//start of Grid Codes camsassetadditions
camsassetadditionssettings:any;
camsassetadditionssource: any;

showcamsassetadditionsCheckbox()
{
debugger;
if(this.tblcamsassetadditionssource.settings['selectMode']== 'multi')this.tblcamsassetadditionssource.settings['selectMode']= 'single';
else
this.tblcamsassetadditionssource.settings['selectMode']= 'multi';
this.tblcamsassetadditionssource.initGrid();
}
deletecamsassetadditionsAll()
{
this.tblcamsassetadditionssource.settings['selectMode'] = 'single';
}
showcamsassetadditionsFilter()
{
  setTimeout(() => {
  this.SetcamsassetadditionsTableddConfig();
  });
      if(this.tblcamsassetadditionssource.settings!=null)this.tblcamsassetadditionssource.settings['hideSubHeader'] =!this.tblcamsassetadditionssource.settings['hideSubHeader'];
this.tblcamsassetadditionssource.initGrid();
}
showcamsassetadditionsInActive()
{
}
enablecamsassetadditionsInActive()
{
}
async SetcamsassetadditionsTableddConfig()
{
if(!this.bfilterPopulatecamsassetadditions){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassetadditionsassetid3.push(obj);
}
if((this.tblcamsassetadditionssource.settings as any).columns['assetid'])
{
(this.tblcamsassetadditionssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetadditionsassetid3));
this.tblcamsassetadditionssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataaddedby2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionsaddedby3.push(defaultobj);
for(let i=0; i<dataaddedby2.length; i++){
var obj= { value: dataaddedby2[i].userid, title:dataaddedby2[i].username};
this.datacamsassetadditionsaddedby3.push(obj);
}
if((this.tblcamsassetadditionssource.settings as any).columns['addedby'])
{
(this.tblcamsassetadditionssource.settings as any).columns['addedby'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetadditionsaddedby3));
this.tblcamsassetadditionssource.initGrid();
}
});

this.erpitemmasterservice.geterpitemmastersList().then(res=>
{
var dataitemid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionsitemid3.push(defaultobj);
for(let i=0; i<dataitemid2.length; i++){
var obj= { value: dataitemid2[i].itemid, title:dataitemid2[i].itemcode};
this.datacamsassetadditionsitemid3.push(obj);
}
if((this.tblcamsassetadditionssource.settings as any).columns['itemid'])
{
(this.tblcamsassetadditionssource.settings as any).columns['itemid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetadditionsitemid3));
this.tblcamsassetadditionssource.initGrid();
}
});

this.configservice.getList("acquisitionmethod").then(res=>
{
var dataacquisitionmethod2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionsacquisitionmethod3.push(defaultobj);
for(let i=0; i<dataacquisitionmethod2.length; i++){
var obj= { value: dataacquisitionmethod2[i].configkey, title: dataacquisitionmethod2[i].configtext};
this.datacamsassetadditionsacquisitionmethod3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetadditionssource.settings);
if(clone.columns['acquisitionmethod']!=undefined)clone.columns['acquisitionmethod'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetadditionsacquisitionmethod3)), }, };
if(clone.columns['acquisitionmethod']!=undefined)clone.columns['acquisitionmethod'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetadditionsacquisitionmethod3)), }, };
this.tblcamsassetadditionssource.settings =  clone;
this.tblcamsassetadditionssource.initGrid();
});

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.datacamsassetadditionsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tblcamsassetadditionssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetadditionsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datacamsassetadditionsuom3)), }, };
this.tblcamsassetadditionssource.settings =  clone;
this.tblcamsassetadditionssource.initGrid();
});

this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res=>
{
var datapoid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassetadditionspoid3.push(defaultobj);
for(let i=0; i<datapoid2.length; i++){
var obj= { value: datapoid2[i].poid, title:datapoid2[i].ponumber};
this.datacamsassetadditionspoid3.push(obj);
}
if((this.tblcamsassetadditionssource.settings as any).columns['poid'])
{
(this.tblcamsassetadditionssource.settings as any).columns['poid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassetadditionspoid3));
this.tblcamsassetadditionssource.initGrid();
}
});
}
this.bfilterPopulatecamsassetadditions=true;
}
async camsassetadditionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassetadditionsTableConfig()
{
this.camsassetadditionssettings = {
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
addedby: {
title: 'Added By',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassetadditionsaddedby3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
additiondate: {
title: 'Addition Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
accountdate: {
title: 'Account Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
addedservicelife: {
title: 'Added Service Life',
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
addedshelflife: {
title: 'Added Shelf Life',
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
addedreason: {
title: 'Added Reason',
type: '',
filter:true,
},
},
};
}
camsassetadditionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetadditionsID)>=0)
{
this.camsassetadditionssource=new LocalDataSource();
this.camsassetadditionssource.load(this.camsassetmasterservice.camsassetadditions as  any as LocalDataSource);
this.camsassetadditionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassetadditionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassetmasterservice.camsassetadditions.length == 0)
{
    this.tblcamsassetadditionssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassetaddition();
    this.camsassetmasterservice.camsassetadditions.push(obj);
    this.camsassetadditionssource.refresh();
    if ((this.camsassetmasterservice.camsassetadditions.length / this.camsassetadditionssource.getPaging().perPage).toFixed(0) + 1 != this.camsassetadditionssource.getPaging().page)
    {
        this.camsassetadditionssource.setPage((this.camsassetmasterservice.camsassetadditions.length / this.camsassetadditionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassetadditionssource.grid.edit(this.tblcamsassetadditionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassetadditionssource.data.indexOf(event.data);
this.onDeletecamsassetaddition(event,event.data.additionid,((this.camsassetadditionssource.getPaging().page-1) *this.camsassetadditionssource.getPaging().perPage)+index);
this.camsassetadditionssource.refresh();
break;
}
}

*/
camsassetadditionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassetaddition(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassetaddition(event,event.data.additionid,this.formid);
break;
case 'delete':
this.onDeletecamsassetaddition(event,event.data.additionid,((this.camsassetadditionssource.getPaging().page-1) *this.camsassetadditionssource.getPaging().perPage)+event.index);
this.camsassetadditionssource.refresh();
break;
}
}
camsassetadditionsonDelete(obj) {
let additionid=obj.data.additionid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassetmasterservice.deletecamsassetmaster(additionid).then(res=>
this.camsassetadditionsLoadTable()
);
}
}
camsassetadditionsPaging(val)
{
debugger;
this.camsassetadditionssource.setPaging(1, val, true);
}

handlecamsassetadditionsGridSelected(event:any) {
this.camsassetadditionsselectedindex=this.camsassetmasterservice.camsassetadditions.findIndex(i => i.additionid === event.data.additionid);
}
IscamsassetadditionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassetadditionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassetadditions

}



