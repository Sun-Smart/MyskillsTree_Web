import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
import { erpsuppliermaster } from './../../../model/erpsuppliermaster.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpcontractordermaster} from './../../../model/erpcontractordermaster.model';
import { erpcontractordermasterComponent } from './../../../pages/forms/erpcontractordermaster/erpcontractordermaster.component';
import { erpcontractordermasterService } from './../../../service/erpcontractordermaster.service';
//popups
//detail table services
import { erpsupplierlocation } from './../../../model/erpsupplierlocation.model';
import { erpsupplierlocationComponent } from './../../../pages/forms/erpsupplierlocation/erpsupplierlocation.component';
//FK services
import { bobranchmaster,IbobranchmasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { erpsupplieritem } from './../../../model/erpsupplieritem.model';
import { erpsupplieritemComponent } from './../../../pages/forms/erpsupplieritem/erpsupplieritem.component';
//FK services
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
import { bocontact,IbocontactResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
import { bocontactService } from '../../../../../../n-tire-bo-app/src/app/service/bocontact.service';
import { erpfaaccountmaster,IerpfaaccountmasterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erpsupplieritemService } from './../../../service/erpsupplieritem.service';
import { boactivity } from '../../../../../../n-tire-bo-app/src/app/model/boactivity.model';
import { boactivityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boactivity/boactivity.component';
//FK services
import { erpsupplierinvoice } from './../../../model/erpsupplierinvoice.model';
import { erpsupplierinvoiceComponent } from './../../../pages/forms/erpsupplierinvoice/erpsupplierinvoice.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
import { erppurchaseordermaster,IerppurchaseordermasterResponse } from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
import { erpsuppliercertification } from './../../../model/erpsuppliercertification.model';
import { erpsuppliercertificationComponent } from './../../../pages/forms/erpsuppliercertification/erpsuppliercertification.component';
//FK services
import { erpsupplierfinancialdata } from './../../../model/erpsupplierfinancialdata.model';
import { erpsupplierfinancialdataComponent } from './../../../pages/forms/erpsupplierfinancialdata/erpsupplierfinancialdata.component';
//FK services
import { bofinancialyear,IbofinancialyearResponse } from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bofinancialyear/bofinancialyear.component';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
import { erpsupplierreference } from './../../../model/erpsupplierreference.model';
import { erpsupplierreferenceComponent } from './../../../pages/forms/erpsupplierreference/erpsupplierreference.component';
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
selector: 'app-erpsuppliermaster',
templateUrl: './erpsuppliermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsuppliermasterComponent implements OnInit {
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
bfilterPopulateerpsuppliermasters:boolean=false;
dataerpsuppliermasterssupplierid3:any=[];
dataerpsuppliermastersindustry3:any=[];
dataerpsuppliermasterscompanytype3:any=[];
dataerpsuppliermasterssuppliercategory3:any=[];
dataerpsuppliermasterssuppliersubcategory3:any=[];
dataerpsuppliermasterspurchasingtype3:any=[];
dataerpsuppliermasterspaymentterms3:any=[];
dataerpsuppliermasterspomailingtype3:any=[];
dataerpsuppliermastersriskclassification3:any=[];
dataerpsuppliermasterstaxregisteredcountry3:any=[];
dataerpsuppliermasterscountry3:any=[];
dataerpsuppliermastersstate3:any=[];
dataerpsuppliermasterscity3:any=[];
dataerpsuppliermastersbankcountry3:any=[];
dataerpsuppliermastersbankstate3:any=[];
dataerpsuppliermastersbankcity3:any=[];
dataerpsuppliermasterscontractid3:any=[];
dataerpsupplierlocationsbranchid3:any=[];
dataerpsupplierlocationssupplierid3:any=[];
bfilterPopulateerpsupplierlocations:boolean=false;
dataerpsupplieritemssupplierid3:any=[];
dataerpsupplieritemsitemcategoryid3:any=[];
dataerpsupplieritemscurrency3:any=[];
dataerpsupplieritemsitemsubcategoryid3:any=[];
dataerpsupplieritemstax1name3:any=[];
dataerpsupplieritemstax2name3:any=[];
dataerpsupplieritemsuom3:any=[];
dataerpsupplieritemssalesunitsize3:any=[];
dataerpsupplieritemsproducttype3:any=[];
dataerpsupplieritemssuppliercontactid3:any=[];
dataerpsupplieritemscontractid3:any=[];
dataerpsupplieritemsaccountid3:any=[];
dataerpsupplieritemsourcompanyitemid3:any=[];
dataerpsupplieritemssupplieritemid3:any=[];
dataerpsupplieritemsriskclassification3:any=[];
bfilterPopulateerpsupplieritems:boolean=false;
databoactivitiesassignedby3:any=[];
databoactivitiescontactpersonid3:any=[];
databoactivitiesactivitytype3:any=[];
databoactivitiespriority3:any=[];
databoactivitiesactivitystatus3:any=[];
bfilterPopulateboactivities:boolean=false;
dataerpsupplierinvoicescostcenter3:any=[];
dataerpsupplierinvoicesassigntofinanceuserid3:any=[];
dataerpsupplierinvoicesaccountid3:any=[];
dataerpsupplierinvoicesbranchid3:any=[];
dataerpsupplierinvoicessupplierid3:any=[];
dataerpsupplierinvoicesinvoicecurrency3:any=[];
dataerpsupplierinvoicespaymentterms3:any=[];
dataerpsupplierinvoicespoid3:any=[];
dataerpsupplierinvoicesbasecurrency3:any=[];
bfilterPopulateerpsupplierinvoices:boolean=false;
dataerpsuppliercertificationscertificatecategory3:any=[];
dataerpsuppliercertificationssupplierid3:any=[];
bfilterPopulateerpsuppliercertifications:boolean=false;
dataerpsupplierfinancialdatasfinyear3:any=[];
dataerpsupplierfinancialdatassupplierid3:any=[];
bfilterPopulateerpsupplierfinancialdatas:boolean=false;
dataerpsupplierreferencescompanytype3:any=[];
dataerpsupplierreferencessupplierid3:any=[];
bfilterPopulateerpsupplierreferences:boolean=false;
@ViewChild('tblerpsupplierlocationssource',{static:false}) tblerpsupplierlocationssource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplieritemssource',{static:false}) tblerpsupplieritemssource: Ng2SmartTableComponent;
@ViewChild('tblboactivitiessource',{static:false}) tblboactivitiessource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplierinvoicessource',{static:false}) tblerpsupplierinvoicessource: Ng2SmartTableComponent;
@ViewChild('tblerpsuppliercertificationssource',{static:false}) tblerpsuppliercertificationssource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplierfinancialdatassource',{static:false}) tblerpsupplierfinancialdatassource: Ng2SmartTableComponent;
@ViewChild('tblerpsupplierreferencessource',{static:false}) tblerpsupplierreferencessource: Ng2SmartTableComponent;
 erpsuppliermasterForm: FormGroup;
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
industryList: boconfigvalue[];
companytypeList: boconfigvalue[];
suppliercategoryList: bomasterdata[];
suppliersubcategoryList: bosubcategorymaster[];
purchasingtypeList: boconfigvalue[];
paymenttermsList: boconfigvalue[];
pomailingtypeList: boconfigvalue[];
riskclassificationList: boconfigvalue[];
taxregisteredcountryList: bocountry[];
taxregisteredcountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
taxregisteredcountry_bocountriesForm: FormGroup;//autocomplete
taxregisteredcountry_bocountriesoptions:any;//autocomplete
taxregisteredcountry_bocountriesformatter:any;//autocomplete
countryList: bocountry[];
countryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
country_bocountriesForm: FormGroup;//autocomplete
country_bocountriesoptions:any;//autocomplete
country_bocountriesformatter:any;//autocomplete
stateList: bostate[];
stateoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
state_bostatesForm: FormGroup;//autocomplete
state_bostatesoptions:any;//autocomplete
state_bostatesformatter:any;//autocomplete
cityList: bocity[];
cityoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
city_bocitiesForm: FormGroup;//autocomplete
city_bocitiesoptions:any;//autocomplete
city_bocitiesformatter:any;//autocomplete
bankcountryList: bocountry[];
bankcountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
bankcountry_bocountriesForm: FormGroup;//autocomplete
bankcountry_bocountriesoptions:any;//autocomplete
bankcountry_bocountriesformatter:any;//autocomplete
bankstateList: bostate[];
bankstateoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
bankstate_bostatesForm: FormGroup;//autocomplete
bankstate_bostatesoptions:any;//autocomplete
bankstate_bostatesformatter:any;//autocomplete
bankcityList: bocity[];
bankcityoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
bankcity_bocitiesForm: FormGroup;//autocomplete
bankcity_bocitiesoptions:any;//autocomplete
bankcity_bocitiesformatter:any;//autocomplete
contractidList: erpcontractordermaster[];
contractidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractid_erpcontractordermastersForm: FormGroup;//autocomplete
contractid_erpcontractordermastersoptions:any;//autocomplete
contractid_erpcontractordermastersformatter:any;//autocomplete
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
erpsuppliermastershowOption:boolean;
erpsupplierlocationshowOption:boolean;
erpsupplieritemshowOption:boolean;
boactivityshowOption:boolean;
erpsupplierinvoiceshowOption:boolean;
erpsuppliercertificationshowOption:boolean;
erpsupplierfinancialdatashowOption:boolean;
erpsupplierreferenceshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsupplierlocationsvisiblelist:any;
erpsupplierlocationshidelist:any;
erpsupplieritemsvisiblelist:any;
erpsupplieritemshidelist:any;
boactivitiesvisiblelist:any;
boactivitieshidelist:any;
erpsupplierinvoicesvisiblelist:any;
erpsupplierinvoiceshidelist:any;
erpsuppliercertificationsvisiblelist:any;
erpsuppliercertificationshidelist:any;
erpsupplierfinancialdatasvisiblelist:any;
erpsupplierfinancialdatashidelist:any;
erpsupplierreferencesvisiblelist:any;
erpsupplierreferenceshidelist:any;

DeletederpsupplierlocationIDs: string="";
erpsupplierlocationsID: string = "1";
erpsupplierlocationsselectedindex:any;
DeletederpsupplieritemIDs: string="";
erpsupplieritemsID: string = "2";
erpsupplieritemsselectedindex:any;
DeletedboactivityIDs: string="";
boactivitiesID: string = "3";
boactivitiesselectedindex:any;
DeletederpsupplierinvoiceIDs: string="";
erpsupplierinvoicesID: string = "4";
erpsupplierinvoicesselectedindex:any;
DeletederpsuppliercertificationIDs: string="";
erpsuppliercertificationsID: string = "5";
erpsuppliercertificationsselectedindex:any;
DeletederpsupplierfinancialdataIDs: string="";
erpsupplierfinancialdatasID: string = "6";
erpsupplierfinancialdatasselectedindex:any;
DeletederpsupplierreferenceIDs: string="";
erpsupplierreferencesID: string = "7";
erpsupplierreferencesselectedindex:any;

default: any;

constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsuppliermasterservice: erpsuppliermasterService,
private bousermasterservice: bousermasterService,
private bobranchmasterservice: bobranchmasterService,
private bomasterdataservice: bomasterdataService,
private bosubcategorymasterservice: bosubcategorymasterService,
private erptaxmasterservice: erptaxmasterService,
private bocontactservice: bocontactService,
private erpcontractordermasterservice: erpcontractordermasterService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private erpitemmasterservice: erpitemmasterService,
private erpsupplieritemservice: erpsupplieritemService,
private erpfacostcenterservice: erpfacostcenterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private bofinancialyearservice: bofinancialyearService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.erpsuppliermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
supplierid: [null],
supplieriddesc: [null],
suppliercode: [null],
suppliername: [null],
alias: [null],
parentsuppliername: [null],
thumbnail: [null],
industry: [null],
industrydesc: [null],
companytype: [null],
companytypedesc: [null],
suppliercategory: [null],
suppliercategorydesc: [null],
suppliersubcategory: [null],
suppliersubcategorydesc: [null],
portalid: [null],
purchasingtype: [null],
purchasingtypedesc: [null],
paymentterms: [null],
paymenttermsdesc: [null],
pomailingtype: [null],
pomailingtypedesc: [null],
minorderamount: [null],
creditlimit: [null],
creditnotes: [null],
purchasingactivities: [null],
creditdays: [null],
riskclassification: [null],
riskclassificationdesc: [null],
tlnumber: [null],
tlvalidity: [null],
incorporationdate: [null],
taxregistrationnumber: [null],
taxregisteredcountry: [null],
taxregisteredcountrydesc: [null],
address1: [null],
address2: [null],
country: [null],
countrydesc: [null],
state: [null],
statedesc: [null],
city: [null],
citydesc: [null],
pin: [null],
website: [null],
telephone: [null],
contactperson: [null],
designation: [null],
mobile: [null],
email: [null],
directline: [null],
assignedto: [null],
prequalificationapproved: [null],
glcode: [null],
bankname: [null],
accountnumber: [null],
accountname: [null],
swiftcode: [null],
ibannumber: [null],
bankaddress1: [null],
bankaddress2: [null],
bankcountry: [null],
bankcountrydesc: [null],
bankstate: [null],
bankstatedesc: [null],
bankcity: [null],
bankcitydesc: [null],
pincode: [null],
bankinfonotes: [null],
notes: [null],
contractid: [null],
contractiddesc: [null],
suppliedvalue: [null],
rejectedvalue: [null],
deliveryperiod: [null],
delayeddelivery: [null],
deliveryrating: [null],
qualityrating: [null],
status: [null],
statusdesc: [null],
customfield: [null],
attachment: [null],
});
    this.erpsuppliermasterservice.getdefault().then(res => {
    console.log(res);
this.default= res;
    this.erpsuppliermasterForm.patchValue({
        address1: this.default.address1,
        address2: this.default.address2,
    });
    }).catch((err) => {console.log(err);});
}

get f() { return this.erpsuppliermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsuppliermasterForm.dirty && this.erpsuppliermasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplierid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplierid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplierid && pkDetail) {
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
let erpsuppliermasterid = null;

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
this.formid=erpsuppliermasterid;
//this.sharedService.alert(erpsuppliermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsupplierlocationsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierlocationsTableddConfig();
  });

this.SeterpsupplieritemsTableConfig();
  setTimeout(() => {
  this.SeterpsupplieritemsTableddConfig();
  });

this.SetboactivitiesTableConfig();
  setTimeout(() => {
  this.SetboactivitiesTableddConfig();
  });

this.SeterpsupplierinvoicesTableConfig();
  setTimeout(() => {
  this.SeterpsupplierinvoicesTableddConfig();
  });

this.SeterpsuppliercertificationsTableConfig();
  setTimeout(() => {
  this.SeterpsuppliercertificationsTableddConfig();
  });

this.SeterpsupplierfinancialdatasTableConfig();
  setTimeout(() => {
  this.SeterpsupplierfinancialdatasTableddConfig();
  });

this.SeterpsupplierreferencesTableConfig();
  setTimeout(() => {
  this.SeterpsupplierreferencesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsuppliermasterForm.patchValue({
    supplierid: this.erpsuppliermasterservice.formData.supplierid,
    supplieriddesc: this.erpsuppliermasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsuppliermasterForm.get('supplierid').value);
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
this.configservice.getList("industry").then(res => this.industryList = res as boconfigvalue[]);
this.configservice.getList("companytype").then(res => this.companytypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("tm78p").then(res => {
this.suppliercategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.suppliercategory.value && this.f.suppliercategory.value!="" && this.f.suppliercategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.suppliercategory.value).then(res =>{
this.suppliersubcategoryList = res as bosubcategorymaster[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.suppliersubcategory){this.erpsuppliermasterForm.patchValue({
    suppliersubcategory: this.erpsuppliermasterservice.formData.suppliersubcategory,
    suppliersubcategorydesc: this.erpsuppliermasterservice.formData.suppliersubcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("purchasingtype").then(res => this.purchasingtypeList = res as boconfigvalue[]);
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);
this.configservice.getList("pomailingtype").then(res => this.pomailingtypeList = res as boconfigvalue[]);
this.configservice.getList("riskclassification").then(res => this.riskclassificationList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.taxregisteredcountryList = res as bocountry[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.taxregisteredcountry){
this.taxregisteredcountryoptionsEvent.emit(this.taxregisteredcountryList);
this.erpsuppliermasterForm.patchValue({
    taxregisteredcountry: this.erpsuppliermasterservice.formData.taxregisteredcountry,
    taxregisteredcountrydesc: this.erpsuppliermasterservice.formData.taxregisteredcountrydesc,
});
}
{
let arrtaxregisteredcountry = this.taxregisteredcountryList.filter(v => v.countryid == this.erpsuppliermasterForm.get('taxregisteredcountry').value);
let objtaxregisteredcountry;
if (arrtaxregisteredcountry.length > 0) objtaxregisteredcountry = arrtaxregisteredcountry[0];
if (objtaxregisteredcountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.taxregisteredcountry_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.taxregisteredcountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.taxregisteredcountry_bocountriesformatter = (result: any) => result.name;
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryList = res as bocountry[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.country){
this.countryoptionsEvent.emit(this.countryList);
this.erpsuppliermasterForm.patchValue({
    country: this.erpsuppliermasterservice.formData.country,
    countrydesc: this.erpsuppliermasterservice.formData.countrydesc,
});
}
{
let arrcountry = this.countryList.filter(v => v.countryid == this.erpsuppliermasterForm.get('country').value);
let objcountry;
if (arrcountry.length > 0) objcountry = arrcountry[0];
if (objcountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.country_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.country_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.country.value && this.f.country.value!="" && this.f.country.value!=null)this.bostateservice.getListBycountryid(this.f.country.value).then(res =>{
this.stateList = res as bostate[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.state){this.erpsuppliermasterForm.patchValue({
    state: this.erpsuppliermasterservice.formData.state,
    statedesc: this.erpsuppliermasterservice.formData.statedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.state_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.state_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.state.value && this.f.state.value!="" && this.f.state.value!=null)this.bocityservice.getListBystateid(this.f.state.value).then(res =>{
this.cityList = res as bocity[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.city){this.erpsuppliermasterForm.patchValue({
    city: this.erpsuppliermasterservice.formData.city,
    citydesc: this.erpsuppliermasterservice.formData.citydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.city_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.city_bocitiesformatter = (result: any) => result.name;
this.bocountryservice.getbocountriesList().then(res => 
{
this.bankcountryList = res as bocountry[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.bankcountry){
this.bankcountryoptionsEvent.emit(this.bankcountryList);
this.erpsuppliermasterForm.patchValue({
    bankcountry: this.erpsuppliermasterservice.formData.bankcountry,
    bankcountrydesc: this.erpsuppliermasterservice.formData.bankcountrydesc,
});
}
{
let arrbankcountry = this.bankcountryList.filter(v => v.countryid == this.erpsuppliermasterForm.get('bankcountry').value);
let objbankcountry;
if (arrbankcountry.length > 0) objbankcountry = arrbankcountry[0];
if (objbankcountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.bankcountry_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.bankcountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.bankcountry_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.bankcountry.value && this.f.bankcountry.value!="" && this.f.bankcountry.value!=null)this.bostateservice.getListBycountryid(this.f.bankcountry.value).then(res =>{
this.bankstateList = res as bostate[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.bankstate){this.erpsuppliermasterForm.patchValue({
    bankstate: this.erpsuppliermasterservice.formData.bankstate,
    bankstatedesc: this.erpsuppliermasterservice.formData.bankstatedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bankstate_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.bankstateList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.bankstate_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.bankstate.value && this.f.bankstate.value!="" && this.f.bankstate.value!=null)this.bocityservice.getListBystateid(this.f.bankstate.value).then(res =>{
this.bankcityList = res as bocity[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.bankcity){this.erpsuppliermasterForm.patchValue({
    bankcity: this.erpsuppliermasterservice.formData.bankcity,
    bankcitydesc: this.erpsuppliermasterservice.formData.bankcitydesc,
});
}
}).catch((err) => {console.log(err);});
});
this.bankcity_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.bankcityList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.bankcity_bocitiesformatter = (result: any) => result.name;
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.contractidList = res as erpcontractordermaster[];
if(this.erpsuppliermasterservice.formData && this.erpsuppliermasterservice.formData.contractid){
this.contractidoptionsEvent.emit(this.contractidList);
this.erpsuppliermasterForm.patchValue({
    contractid: this.erpsuppliermasterservice.formData.contractid,
    contractiddesc: this.erpsuppliermasterservice.formData.contractiddesc,
});
}
{
let arrcontractid = this.contractidList.filter(v => v.contractid == this.erpsuppliermasterForm.get('contractid').value);
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

//autocomplete
    this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => {
      this.pkList = res as erpsuppliermaster[];
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
this.erpsuppliermasterForm.markAsUntouched();
this.erpsuppliermasterForm.markAsPristine();
}
onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsuppliermasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedtaxregisteredcountry(taxregisteredcountryDetail: any) {
if (taxregisteredcountryDetail.countryid && taxregisteredcountryDetail) {
this.erpsuppliermasterForm.patchValue({
taxregisteredcountry: taxregisteredcountryDetail.countryid,
taxregisteredcountrydesc: taxregisteredcountryDetail.name,

});

}
}

onSelectedcountry(countryDetail: any) {
if (countryDetail.countryid && countryDetail) {
this.erpsuppliermasterForm.patchValue({
country: countryDetail.countryid,
countrydesc: countryDetail.name,

});
this.bostateservice.getListBycountryid(countryDetail.countryid).then(res => {
 this.stateList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstate(stateDetail: any) {
if (stateDetail.stateid && stateDetail) {
this.erpsuppliermasterForm.patchValue({
state: stateDetail.stateid,
statedesc: stateDetail.name,

});
this.bocityservice.getListBystateid(stateDetail.stateid).then(res => {
 this.cityList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcity(cityDetail: any) {
if (cityDetail.cityid && cityDetail) {
this.erpsuppliermasterForm.patchValue({
city: cityDetail.cityid,
citydesc: cityDetail.name,

});

}
}

onSelectedbankcountry(bankcountryDetail: any) {
if (bankcountryDetail.countryid && bankcountryDetail) {
this.erpsuppliermasterForm.patchValue({
bankcountry: bankcountryDetail.countryid,
bankcountrydesc: bankcountryDetail.name,

});
this.bostateservice.getListBycountryid(bankcountryDetail.countryid).then(res => {
 this.bankstateList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedbankstate(bankstateDetail: any) {
if (bankstateDetail.stateid && bankstateDetail) {
this.erpsuppliermasterForm.patchValue({
bankstate: bankstateDetail.stateid,
bankstatedesc: bankstateDetail.name,

});
this.bocityservice.getListBystateid(bankstateDetail.stateid).then(res => {
 this.bankcityList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedbankcity(bankcityDetail: any) {
if (bankcityDetail.cityid && bankcityDetail) {
this.erpsuppliermasterForm.patchValue({
bankcity: bankcityDetail.cityid,
bankcitydesc: bankcityDetail.name,

});

}
}

onSelectedcontractid(contractidDetail: any) {
if (contractidDetail.contractid && contractidDetail) {
this.erpsuppliermasterForm.patchValue({
contractid: contractidDetail.contractid,
contractiddesc: contractidDetail.contractname,

});

}
}




resetForm() {
if (this.erpsuppliermasterForm != null)
this.erpsuppliermasterForm.reset();
    this.erpsuppliermasterForm.patchValue({
        address1: this.default.address1,
        address2: this.default.address2,
    });
this.erpsuppliermasterForm.patchValue({
});
setTimeout(() => {
this.erpsuppliermasterservice.erpsupplierlocations=[];
this.erpsupplierlocationsLoadTable();
this.erpsuppliermasterservice.erpsupplieritems=[];
this.erpsupplieritemsLoadTable();
this.erpsuppliermasterservice.boactivities=[];
this.boactivitiesLoadTable();
this.erpsuppliermasterservice.erpsupplierinvoices=[];
this.erpsupplierinvoicesLoadTable();
this.erpsuppliermasterservice.erpsuppliercertifications=[];
this.erpsuppliercertificationsLoadTable();
this.erpsuppliermasterservice.erpsupplierfinancialdatas=[];
this.erpsupplierfinancialdatasLoadTable();
this.erpsuppliermasterservice.erpsupplierreferences=[];
this.erpsupplierreferencesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplierid = this.erpsuppliermasterForm.get('supplierid').value;
        if(supplierid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsuppliermasterservice.deleteerpsuppliermaster(supplierid).then(res =>
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
    this.erpsuppliermasterForm.patchValue({
        supplierid: null
    });
    if(this.erpsuppliermasterservice.formData.supplierid!=null)this.erpsuppliermasterservice.formData.supplierid=null;
for (let i=0;i<this.erpsuppliermasterservice.erpsupplierlocations.length;i++) {
this.erpsuppliermasterservice.erpsupplierlocations[i].eslid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.erpsupplieritems.length;i++) {
this.erpsuppliermasterservice.erpsupplieritems[i].supplieritemid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.boactivities.length;i++) {
this.erpsuppliermasterservice.boactivities[i].activityid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.erpsupplierinvoices.length;i++) {
this.erpsuppliermasterservice.erpsupplierinvoices[i].invoiceid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.erpsuppliercertifications.length;i++) {
this.erpsuppliermasterservice.erpsuppliercertifications[i].certificationid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.erpsupplierfinancialdatas.length;i++) {
this.erpsuppliermasterservice.erpsupplierfinancialdatas[i].findataid=null;
}
for (let i=0;i<this.erpsuppliermasterservice.erpsupplierreferences.length;i++) {
this.erpsuppliermasterservice.erpsupplierreferences[i].esrid=null;
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
        else if(key=="tlvalidity")
this.erpsuppliermasterForm.patchValue({"tlvalidity":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="incorporationdate")
this.erpsuppliermasterForm.patchValue({"incorporationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.erpsuppliermasterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.erpsuppliermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsuppliermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsuppliermasterForm.controls[key]!=undefined)
{
this.erpsuppliermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpsuppliermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
supplieridonChange(evt:any){
let e=evt.value;
}
suppliercodeonChange(evt:any){
let e=evt.value;
}
suppliernameonChange(evt:any){
let e=evt.value;
}
aliasonChange(evt:any){
let e=evt.value;
}
parentsuppliernameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
industryonChange(evt:any){
let e=this.f.industry.value as any;
this.erpsuppliermasterForm.patchValue({industrydesc:evt.options[evt.options.selectedIndex].text});
}
companytypeonChange(evt:any){
let e=this.f.companytype.value as any;
this.erpsuppliermasterForm.patchValue({companytypedesc:evt.options[evt.options.selectedIndex].text});
}
suppliercategoryonChange(evt:any){
let e=evt.value;
this.erpsuppliermasterForm.patchValue({suppliercategorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.suppliercategory.value && this.f.suppliercategory.value!="" && this.f.suppliercategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.suppliercategory.value).then(res => this.suppliersubcategoryList = res as bosubcategorymaster[]);
});
}
suppliersubcategoryonChange(evt:any){
let e=evt.value;
this.erpsuppliermasterForm.patchValue({suppliersubcategorydesc:evt.options[evt.options.selectedIndex].text});
}
portalidonChange(evt:any){
let e=evt.value;
}
purchasingtypeonChange(evt:any){
let e=this.f.purchasingtype.value as any;
this.erpsuppliermasterForm.patchValue({purchasingtypedesc:evt.options[evt.options.selectedIndex].text});
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erpsuppliermasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
pomailingtypeonChange(evt:any){
let e=this.f.pomailingtype.value as any;
this.erpsuppliermasterForm.patchValue({pomailingtypedesc:evt.options[evt.options.selectedIndex].text});
}
minorderamountonChange(evt:any){
let e=evt.value;
}
creditlimitonChange(evt:any){
let e=evt.value;
}
creditnotesonChange(evt:any){
let e=evt.value;
}
purchasingactivitiesonChange(evt:any){
let e=evt.value;
}
creditdaysonChange(evt:any){
let e=evt.value;
}
riskclassificationonChange(evt:any){
let e=this.f.riskclassification.value as any;
this.erpsuppliermasterForm.patchValue({riskclassificationdesc:evt.options[evt.options.selectedIndex].text});
}
tlnumberonChange(evt:any){
let e=evt.value;
}
tlvalidityonChange(evt:any){
let e=evt.value;
}
incorporationdateonChange(evt:any){
let e=evt.value;
}
taxregistrationnumberonChange(evt:any){
let e=evt.value;
}
taxregisteredcountryonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryonChange(evt:any){
let e=evt.value;
}
stateonChange(evt:any){
let e=evt.value;
}
cityonChange(evt:any){
let e=evt.value;
}
pinonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
telephoneonChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
}
mobileonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
directlineonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignedto=res;
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}).catch((err) => {console.log(err);});
}
prequalificationapprovedonChange(evt:any){
let e=evt.value;
}
glcodeonChange(evt:any){
let e=evt.value;
}
banknameonChange(evt:any){
let e=evt.value;
}
accountnumberonChange(evt:any){
let e=evt.value;
}
accountnameonChange(evt:any){
let e=evt.value;
}
swiftcodeonChange(evt:any){
let e=evt.value;
}
ibannumberonChange(evt:any){
let e=evt.value;
}
bankaddress1onChange(evt:any){
let e=evt.value;
}
bankaddress2onChange(evt:any){
let e=evt.value;
}
bankcountryonChange(evt:any){
let e=evt.value;
}
bankstateonChange(evt:any){
let e=evt.value;
}
bankcityonChange(evt:any){
let e=evt.value;
}
pincodeonChange(evt:any){
let e=evt.value;
}
bankinfonotesonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
contractidonChange(evt:any){
let e=evt.value;
}
suppliedvalueonChange(evt:any){
let e=evt.value;
}
rejectedvalueonChange(evt:any){
let e=evt.value;
}
deliveryperiodonChange(evt:any){
let e=evt.value;
}
delayeddeliveryonChange(evt:any){
let e=evt.value;
}
deliveryratingonChange(evt:any){
let e=evt.value;
}
qualityratingonChange(evt:any){
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
  


editerpsuppliermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsuppliermasterservice.geterpsuppliermastersByEID(pkcol).then(res => {

this.erpsuppliermasterservice.formData=res.erpsuppliermaster;
let formproperty=res.erpsuppliermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsuppliermaster.pkcol;
this.formid=res.erpsuppliermaster.supplierid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsuppliermaster.supplierid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsuppliermasterForm.patchValue({
supplierid: res.erpsuppliermaster.supplierid,
supplieriddesc: res.erpsuppliermaster.supplieriddesc,
suppliercode: res.erpsuppliermaster.suppliercode,
suppliername: res.erpsuppliermaster.suppliername,
alias: res.erpsuppliermaster.alias,
parentsuppliername: res.erpsuppliermaster.parentsuppliername,
thumbnail: res.erpsuppliermaster.thumbnail,
industry: res.erpsuppliermaster.industry,
industrydesc: res.erpsuppliermaster.industrydesc,
companytype: res.erpsuppliermaster.companytype,
companytypedesc: res.erpsuppliermaster.companytypedesc,
suppliercategory: res.erpsuppliermaster.suppliercategory,
suppliercategorydesc: res.erpsuppliermaster.suppliercategorydesc,
suppliersubcategory: res.erpsuppliermaster.suppliersubcategory,
suppliersubcategorydesc: res.erpsuppliermaster.suppliersubcategorydesc,
portalid: res.erpsuppliermaster.portalid,
purchasingtype: res.erpsuppliermaster.purchasingtype,
purchasingtypedesc: res.erpsuppliermaster.purchasingtypedesc,
paymentterms: res.erpsuppliermaster.paymentterms,
paymenttermsdesc: res.erpsuppliermaster.paymenttermsdesc,
pomailingtype: res.erpsuppliermaster.pomailingtype,
pomailingtypedesc: res.erpsuppliermaster.pomailingtypedesc,
minorderamount: res.erpsuppliermaster.minorderamount,
creditlimit: res.erpsuppliermaster.creditlimit,
creditnotes: res.erpsuppliermaster.creditnotes,
purchasingactivities: res.erpsuppliermaster.purchasingactivities,
creditdays: res.erpsuppliermaster.creditdays,
riskclassification: res.erpsuppliermaster.riskclassification,
riskclassificationdesc: res.erpsuppliermaster.riskclassificationdesc,
tlnumber: res.erpsuppliermaster.tlnumber,
tlvalidity: this.ngbDateParserFormatter.parse(res.erpsuppliermaster.tlvalidity),
incorporationdate: this.ngbDateParserFormatter.parse(res.erpsuppliermaster.incorporationdate),
taxregistrationnumber: res.erpsuppliermaster.taxregistrationnumber,
taxregisteredcountry: res.erpsuppliermaster.taxregisteredcountry,
taxregisteredcountrydesc: res.erpsuppliermaster.taxregisteredcountrydesc,
address1: res.erpsuppliermaster.address1,
address2: res.erpsuppliermaster.address2,
country: res.erpsuppliermaster.country,
countrydesc: res.erpsuppliermaster.countrydesc,
state: res.erpsuppliermaster.state,
statedesc: res.erpsuppliermaster.statedesc,
city: res.erpsuppliermaster.city,
citydesc: res.erpsuppliermaster.citydesc,
pin: res.erpsuppliermaster.pin,
website: res.erpsuppliermaster.website,
telephone: res.erpsuppliermaster.telephone,
contactperson: res.erpsuppliermaster.contactperson,
designation: res.erpsuppliermaster.designation,
mobile: res.erpsuppliermaster.mobile,
email: res.erpsuppliermaster.email,
directline: res.erpsuppliermaster.directline,
assignedto: JSON.parse(res.erpsuppliermaster.assignedto),
prequalificationapproved: res.erpsuppliermaster.prequalificationapproved,
glcode: res.erpsuppliermaster.glcode,
bankname: res.erpsuppliermaster.bankname,
accountnumber: res.erpsuppliermaster.accountnumber,
accountname: res.erpsuppliermaster.accountname,
swiftcode: res.erpsuppliermaster.swiftcode,
ibannumber: res.erpsuppliermaster.ibannumber,
bankaddress1: res.erpsuppliermaster.bankaddress1,
bankaddress2: res.erpsuppliermaster.bankaddress2,
bankcountry: res.erpsuppliermaster.bankcountry,
bankcountrydesc: res.erpsuppliermaster.bankcountrydesc,
bankstate: res.erpsuppliermaster.bankstate,
bankstatedesc: res.erpsuppliermaster.bankstatedesc,
bankcity: res.erpsuppliermaster.bankcity,
bankcitydesc: res.erpsuppliermaster.bankcitydesc,
pincode: res.erpsuppliermaster.pincode,
bankinfonotes: res.erpsuppliermaster.bankinfonotes,
notes: res.erpsuppliermaster.notes,
contractid: res.erpsuppliermaster.contractid,
contractiddesc: res.erpsuppliermaster.contractiddesc,
suppliedvalue: res.erpsuppliermaster.suppliedvalue,
rejectedvalue: res.erpsuppliermaster.rejectedvalue,
deliveryperiod: res.erpsuppliermaster.deliveryperiod,
delayeddelivery: res.erpsuppliermaster.delayeddelivery,
deliveryrating: res.erpsuppliermaster.deliveryrating,
qualityrating: res.erpsuppliermaster.qualityrating,
status: res.erpsuppliermaster.status,
statusdesc: res.erpsuppliermaster.statusdesc,
customfield: res.erpsuppliermaster.customfield,
attachment: JSON.parse(res.erpsuppliermaster.attachment),
});
this.erpsupplierlocationsvisiblelist=res.erpsupplierlocationsvisiblelist;
this.erpsupplieritemsvisiblelist=res.erpsupplieritemsvisiblelist;
this.boactivitiesvisiblelist=res.boactivitiesvisiblelist;
this.erpsupplierinvoicesvisiblelist=res.erpsupplierinvoicesvisiblelist;
this.erpsuppliercertificationsvisiblelist=res.erpsuppliercertificationsvisiblelist;
this.erpsupplierfinancialdatasvisiblelist=res.erpsupplierfinancialdatasvisiblelist;
this.erpsupplierreferencesvisiblelist=res.erpsupplierreferencesvisiblelist;
if(this.erpsuppliermasterForm.get('customfield').value!=null && this.erpsuppliermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpsuppliermasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpsuppliermasterForm.get('attachment').value!=null && this.erpsuppliermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpsuppliermasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.suppliercategory.value && this.f.suppliercategory.value!="" && this.f.suppliercategory.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.suppliercategory.value).then(res =>{
this.suppliersubcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.country.value && this.f.country.value!="" && this.f.country.value!=null)this.bostateservice.getListBycountryid(this.f.country.value).then(res =>{
this.stateList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.state.value && this.f.state.value!="" && this.f.state.value!=null)this.bocityservice.getListBystateid(this.f.state.value).then(res =>{
this.cityList = res as bocity[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.bankcountry.value && this.f.bankcountry.value!="" && this.f.bankcountry.value!=null)this.bostateservice.getListBycountryid(this.f.bankcountry.value).then(res =>{
this.bankstateList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.bankstate.value && this.f.bankstate.value!="" && this.f.bankstate.value!=null)this.bocityservice.getListBystateid(this.f.bankstate.value).then(res =>{
this.bankcityList = res as bocity[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erpsuppliermasterservice.erpsupplierlocations = res.erpsupplierlocations;
this.SeterpsupplierlocationsTableConfig();
this.erpsupplierlocationsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierlocationsTableddConfig();
  });
this.erpsuppliermasterservice.erpsupplieritems = res.erpsupplieritems;
this.SeterpsupplieritemsTableConfig();
this.erpsupplieritemsLoadTable();
  setTimeout(() => {
  this.SeterpsupplieritemsTableddConfig();
  });
this.erpsuppliermasterservice.boactivities = res.boactivities;
this.SetboactivitiesTableConfig();
this.boactivitiesLoadTable();
  setTimeout(() => {
  this.SetboactivitiesTableddConfig();
  });
this.erpsuppliermasterservice.erpsupplierinvoices = res.erpsupplierinvoices;
this.SeterpsupplierinvoicesTableConfig();
this.erpsupplierinvoicesLoadTable();
  setTimeout(() => {
  this.SeterpsupplierinvoicesTableddConfig();
  });
this.erpsuppliermasterservice.erpsuppliercertifications = res.erpsuppliercertifications;
this.SeterpsuppliercertificationsTableConfig();
this.erpsuppliercertificationsLoadTable();
  setTimeout(() => {
  this.SeterpsuppliercertificationsTableddConfig();
  });
this.erpsuppliermasterservice.erpsupplierfinancialdatas = res.erpsupplierfinancialdatas;
this.SeterpsupplierfinancialdatasTableConfig();
this.erpsupplierfinancialdatasLoadTable();
  setTimeout(() => {
  this.SeterpsupplierfinancialdatasTableddConfig();
  });
this.erpsuppliermasterservice.erpsupplierreferences = res.erpsupplierreferences;
this.SeterpsupplierreferencesTableConfig();
this.erpsupplierreferencesLoadTable();
  setTimeout(() => {
  this.SeterpsupplierreferencesTableddConfig();
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
  for (let key in this.erpsuppliermasterForm.controls) {
    if (this.erpsuppliermasterForm.controls[key] != null) {
if(false)
{
if(this.erpsuppliermasterservice.formData!=null && this.erpsuppliermasterservice.formData[key]!=null  && this.erpsuppliermasterservice.formData[key]!='[]' && this.erpsuppliermasterservice.formData[key]!=undefined && this.erpsuppliermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsuppliermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsuppliermasterservice.formData!=null && this.erpsuppliermasterservice.formData[key]!=null   && this.erpsuppliermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsuppliermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsuppliermasterservice.formData!=null && this.erpsuppliermasterservice.formData[key]!=null   && this.erpsuppliermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsuppliermasterservice.formData[key]+"'><div class='progress__number'>"+this.erpsuppliermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsuppliermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsuppliermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpsuppliermasterForm.value;
obj.tlvalidity=new Date(this.erpsuppliermasterForm.get('tlvalidity').value ? this.ngbDateParserFormatter.format(this.erpsuppliermasterForm.get('tlvalidity').value)+'  UTC' :null);
obj.incorporationdate=new Date(this.erpsuppliermasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.erpsuppliermasterForm.get('incorporationdate').value)+'  UTC' :null);
if(this.erpsuppliermasterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.erpsuppliermasterForm.get('assignedto').value);
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

private erpsuppliermastertoggleOption(){
this.erpsuppliermastershowOption = this.erpsuppliermastershowOption === true ? false : true;
}

private erpsupplierlocationtoggleOption(){
this.erpsupplierlocationshowOption = this.erpsupplierlocationshowOption === true ? false : true;
}

private erpsupplieritemtoggleOption(){
this.erpsupplieritemshowOption = this.erpsupplieritemshowOption === true ? false : true;
}

private boactivitytoggleOption(){
this.boactivityshowOption = this.boactivityshowOption === true ? false : true;
}

private erpsupplierinvoicetoggleOption(){
this.erpsupplierinvoiceshowOption = this.erpsupplierinvoiceshowOption === true ? false : true;
}

private erpsuppliercertificationtoggleOption(){
this.erpsuppliercertificationshowOption = this.erpsuppliercertificationshowOption === true ? false : true;
}

private erpsupplierfinancialdatatoggleOption(){
this.erpsupplierfinancialdatashowOption = this.erpsupplierfinancialdatashowOption === true ? false : true;
}

private erpsupplierreferencetoggleOption(){
this.erpsupplierreferenceshowOption = this.erpsupplierreferenceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsuppliermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsuppliermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsuppliermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsuppliermasterservice.formData=this.erpsuppliermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsuppliermasterForm.controls[key] != null)
    {
        this.erpsuppliermasterservice.formData[key] = this.erpsuppliermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpsuppliermasterservice.formData.tlvalidity=new Date(this.erpsuppliermasterForm.get('tlvalidity').value ? this.ngbDateParserFormatter.format(this.erpsuppliermasterForm.get('tlvalidity').value)+'  UTC' :null);
this.erpsuppliermasterservice.formData.incorporationdate=new Date(this.erpsuppliermasterForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.erpsuppliermasterForm.get('incorporationdate').value)+'  UTC' :null);
if(this.erpsuppliermasterForm.get('assignedto').value!=null)this.erpsuppliermasterservice.formData.assignedto=JSON.stringify(this.erpsuppliermasterForm.get('assignedto').value);
if(customfields!=null)this.erpsuppliermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpsuppliermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpsuppliermasterservice.formData.DeletederpsupplierlocationIDs = this.DeletederpsupplierlocationIDs;
this.erpsuppliermasterservice.formData.DeletederpsupplieritemIDs = this.DeletederpsupplieritemIDs;
this.erpsuppliermasterservice.formData.DeletedboactivityIDs = this.DeletedboactivityIDs;
this.erpsuppliermasterservice.formData.DeletederpsupplierinvoiceIDs = this.DeletederpsupplierinvoiceIDs;
this.erpsuppliermasterservice.formData.DeletederpsuppliercertificationIDs = this.DeletederpsuppliercertificationIDs;
this.erpsuppliermasterservice.formData.DeletederpsupplierfinancialdataIDs = this.DeletederpsupplierfinancialdataIDs;
this.erpsuppliermasterservice.formData.DeletederpsupplierreferenceIDs = this.DeletederpsupplierreferenceIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpsuppliermasterservice.formData);
this.erpsuppliermasterservice.formData=this.erpsuppliermasterForm.value;
this.erpsuppliermasterservice.saveOrUpdateerpsuppliermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpsupplierlocationssource.data)
{
    for (let i = 0; i < this.erpsupplierlocationssource.data.length; i++)
    {
        if (this.erpsupplierlocationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierlocationssource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplieritemssource.data)
{
    for (let i = 0; i < this.erpsupplieritemssource.data.length; i++)
    {
        if (this.erpsupplieritemssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplieritemssource.data[i].fileattachmentlist);
    }
}
if (this.boactivitiessource.data)
{
    for (let i = 0; i < this.boactivitiessource.data.length; i++)
    {
        if (this.boactivitiessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boactivitiessource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplierinvoicessource.data)
{
    for (let i = 0; i < this.erpsupplierinvoicessource.data.length; i++)
    {
        if (this.erpsupplierinvoicessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierinvoicessource.data[i].fileattachmentlist);
    }
}
if (this.erpsuppliercertificationssource.data)
{
    for (let i = 0; i < this.erpsuppliercertificationssource.data.length; i++)
    {
        if (this.erpsuppliercertificationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsuppliercertificationssource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplierfinancialdatassource.data)
{
    for (let i = 0; i < this.erpsupplierfinancialdatassource.data.length; i++)
    {
        if (this.erpsupplierfinancialdatassource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierfinancialdatassource.data[i].fileattachmentlist);
    }
}
if (this.erpsupplierreferencessource.data)
{
    for (let i = 0; i < this.erpsupplierreferencessource.data.length; i++)
    {
        if (this.erpsupplierreferencessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierreferencessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsuppliermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsuppliermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsuppliermaster);
}
else
{
this.FillData(res);
}
}
this.erpsuppliermasterForm.markAsUntouched();
this.erpsuppliermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsuppliermasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsuppliercategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpsuppliermasterForm.get('suppliercategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsuppliersubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpsuppliermasterForm.get('suppliersubcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittaxregisteredcountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erpsuppliermasterForm.get('taxregisteredcountry').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erpsuppliermasterForm.get('country').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstate( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.erpsuppliermasterForm.get('state').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcity( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.erpsuppliermasterForm.get('city').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbankcountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erpsuppliermasterForm.get('bankcountry').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbankstate( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.erpsuppliermasterForm.get('bankstate').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbankcity( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.erpsuppliermasterForm.get('bankcity').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcontractid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.erpsuppliermasterForm.get('contractid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsupplierlocation(event:any,eslid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierlocationComponent, 
{
data:  {  showview:false,save:false,event,eslid, supplierid,visiblelist:this.erpsupplierlocationsvisiblelist,  hidelist:this.erpsupplierlocationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierlocationssource.add(res);
this.erpsupplierlocationssource.refresh();
}
else
{
this.erpsupplierlocationssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierlocation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierlocationIDs += childID + ",";
this.erpsuppliermasterservice.erpsupplierlocations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplieritem(event:any,supplieritemid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplieritemComponent, 
{
data:  {  showview:false,save:false,event,supplieritemid, supplierid,visiblelist:this.erpsupplieritemsvisiblelist,  hidelist:this.erpsupplieritemshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplieritemssource.add(res);
this.erpsupplieritemssource.refresh();
}
else
{
this.erpsupplieritemssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplieritem(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplieritemIDs += childID + ",";
this.erpsuppliermasterservice.erpsupplieritems.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboactivity(event:any,activityid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boactivityComponent, 
{
data:  {  showview:false,save:false,event,activityid, supplierid,visiblelist:this.boactivitiesvisiblelist,  hidelist:this.boactivitieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boactivitiessource.add(res);
this.boactivitiessource.refresh();
}
else
{
this.boactivitiessource.update(event.data, res);
}
}
});
}

onDeleteboactivity(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboactivityIDs += childID + ",";
this.erpsuppliermasterservice.boactivities.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplierinvoice(event:any,invoiceid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierinvoiceComponent, 
{
data:  {  showview:false,save:true,event,invoiceid, supplierid,visiblelist:this.erpsupplierinvoicesvisiblelist,  hidelist:this.erpsupplierinvoiceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierinvoicessource.add(res);
this.erpsupplierinvoicessource.refresh();
}
else
{
this.erpsupplierinvoicessource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierinvoice(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierinvoiceIDs += childID + ",";
this.erpsuppliermasterservice.erpsupplierinvoices.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsuppliercertification(event:any,certificationid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsuppliercertificationComponent, 
{
data:  {  showview:false,save:false,event,certificationid, supplierid,visiblelist:this.erpsuppliercertificationsvisiblelist,  hidelist:this.erpsuppliercertificationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsuppliercertificationssource.add(res);
this.erpsuppliercertificationssource.refresh();
}
else
{
this.erpsuppliercertificationssource.update(event.data, res);
}
}
});
}

onDeleteerpsuppliercertification(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsuppliercertificationIDs += childID + ",";
this.erpsuppliermasterservice.erpsuppliercertifications.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplierfinancialdata(event:any,findataid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierfinancialdataComponent, 
{
data:  {  showview:false,save:false,event,findataid, supplierid,visiblelist:this.erpsupplierfinancialdatasvisiblelist,  hidelist:this.erpsupplierfinancialdatashidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierfinancialdatassource.add(res);
this.erpsupplierfinancialdatassource.refresh();
}
else
{
this.erpsupplierfinancialdatassource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierfinancialdata(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierfinancialdataIDs += childID + ",";
this.erpsuppliermasterservice.erpsupplierfinancialdatas.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpsupplierreference(event:any,esrid:any, supplierid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierreferenceComponent, 
{
data:  {  showview:false,save:false,event,esrid, supplierid,visiblelist:this.erpsupplierreferencesvisiblelist,  hidelist:this.erpsupplierreferenceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierreferencessource.add(res);
this.erpsupplierreferencessource.refresh();
}
else
{
this.erpsupplierreferencessource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierreference(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierreferenceIDs += childID + ",";
this.erpsuppliermasterservice.erpsupplierreferences.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsupplierlocations
erpsupplierlocationssettings:any;
erpsupplierlocationssource: any;

showerpsupplierlocationsCheckbox()
{
debugger;
if(this.tblerpsupplierlocationssource.settings['selectMode']== 'multi')this.tblerpsupplierlocationssource.settings['selectMode']= 'single';
else
this.tblerpsupplierlocationssource.settings['selectMode']= 'multi';
this.tblerpsupplierlocationssource.initGrid();
}
deleteerpsupplierlocationsAll()
{
this.tblerpsupplierlocationssource.settings['selectMode'] = 'single';
}
showerpsupplierlocationsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierlocationsTableddConfig();
  });
      if(this.tblerpsupplierlocationssource.settings!=null)this.tblerpsupplierlocationssource.settings['hideSubHeader'] =!this.tblerpsupplierlocationssource.settings['hideSubHeader'];
this.tblerpsupplierlocationssource.initGrid();
}
showerpsupplierlocationsInActive()
{
}
enableerpsupplierlocationsInActive()
{
}
async SeterpsupplierlocationsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierlocations){
}
this.bfilterPopulateerpsupplierlocations=true;
}
async erpsupplierlocationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierlocationsTableConfig()
{
this.erpsupplierlocationssettings = {
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
location: {
title: 'Location',
type: '',
filter:true,
},
branchid: {
title: 'Branch',
type: 'number',
filter:true,
},
effectivefrom: {
title: 'Effective From',
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
},
};
}
erpsupplierlocationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierlocationsID)>=0)
{
this.erpsupplierlocationssource=new LocalDataSource();
this.erpsupplierlocationssource.load(this.erpsuppliermasterservice.erpsupplierlocations as  any as LocalDataSource);
this.erpsupplierlocationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierlocationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsupplierlocations.length == 0)
{
    this.tblerpsupplierlocationssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierlocation();
    this.erpsuppliermasterservice.erpsupplierlocations.push(obj);
    this.erpsupplierlocationssource.refresh();
    if ((this.erpsuppliermasterservice.erpsupplierlocations.length / this.erpsupplierlocationssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierlocationssource.getPaging().page)
    {
        this.erpsupplierlocationssource.setPage((this.erpsuppliermasterservice.erpsupplierlocations.length / this.erpsupplierlocationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierlocationssource.grid.edit(this.tblerpsupplierlocationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierlocationssource.data.indexOf(event.data);
this.onDeleteerpsupplierlocation(event,event.data.eslid,((this.erpsupplierlocationssource.getPaging().page-1) *this.erpsupplierlocationssource.getPaging().perPage)+index);
this.erpsupplierlocationssource.refresh();
break;
}
}

*/
erpsupplierlocationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierlocation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierlocation(event,event.data.eslid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierlocation(event,event.data.eslid,((this.erpsupplierlocationssource.getPaging().page-1) *this.erpsupplierlocationssource.getPaging().perPage)+event.index);
this.erpsupplierlocationssource.refresh();
break;
}
}
erpsupplierlocationsonDelete(obj) {
let eslid=obj.data.eslid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(eslid).then(res=>
this.erpsupplierlocationsLoadTable()
);
}
}
erpsupplierlocationsPaging(val)
{
debugger;
this.erpsupplierlocationssource.setPaging(1, val, true);
}

handleerpsupplierlocationsGridSelected(event:any) {
this.erpsupplierlocationsselectedindex=this.erpsuppliermasterservice.erpsupplierlocations.findIndex(i => i.eslid === event.data.eslid);
}
IserpsupplierlocationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierlocationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierlocations
//start of Grid Codes erpsupplieritems
erpsupplieritemssettings:any;
erpsupplieritemssource: any;

showerpsupplieritemsCheckbox()
{
debugger;
if(this.tblerpsupplieritemssource.settings['selectMode']== 'multi')this.tblerpsupplieritemssource.settings['selectMode']= 'single';
else
this.tblerpsupplieritemssource.settings['selectMode']= 'multi';
this.tblerpsupplieritemssource.initGrid();
}
deleteerpsupplieritemsAll()
{
this.tblerpsupplieritemssource.settings['selectMode'] = 'single';
}
showerpsupplieritemsFilter()
{
  setTimeout(() => {
  this.SeterpsupplieritemsTableddConfig();
  });
      if(this.tblerpsupplieritemssource.settings!=null)this.tblerpsupplieritemssource.settings['hideSubHeader'] =!this.tblerpsupplieritemssource.settings['hideSubHeader'];
this.tblerpsupplieritemssource.initGrid();
}
showerpsupplieritemsInActive()
{
}
enableerpsupplieritemsInActive()
{
}
async SeterpsupplieritemsTableddConfig()
{
if(!this.bfilterPopulateerpsupplieritems){

this.erpsupplieritemservice.geterpsupplieritemsList().then(res=>
{
var datasupplieritemid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpsupplieritemssupplieritemid3.push(defaultobj);
for(let i=0; i<datasupplieritemid2.length; i++){
var obj= { value: datasupplieritemid2[i].supplierid, title:datasupplieritemid2[i].supplieritemcode};
this.dataerpsupplieritemssupplieritemid3.push(obj);
}
if((this.tblerpsupplieritemssource.settings as any).columns['supplieritemid'])
{
(this.tblerpsupplieritemssource.settings as any).columns['supplieritemid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpsupplieritemssupplieritemid3));
this.tblerpsupplieritemssource.initGrid();
}
});
}
this.bfilterPopulateerpsupplieritems=true;
}
async erpsupplieritemsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplieritemsTableConfig()
{
this.erpsupplieritemssettings = {
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
itemdescription: {
title: 'Item Description',
type: '',
filter:true,
},
},
};
}
erpsupplieritemsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplieritemsID)>=0)
{
this.erpsupplieritemssource=new LocalDataSource();
this.erpsupplieritemssource.load(this.erpsuppliermasterservice.erpsupplieritems as  any as LocalDataSource);
this.erpsupplieritemssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplieritemsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsupplieritems.length == 0)
{
    this.tblerpsupplieritemssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplieritem();
    this.erpsuppliermasterservice.erpsupplieritems.push(obj);
    this.erpsupplieritemssource.refresh();
    if ((this.erpsuppliermasterservice.erpsupplieritems.length / this.erpsupplieritemssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplieritemssource.getPaging().page)
    {
        this.erpsupplieritemssource.setPage((this.erpsuppliermasterservice.erpsupplieritems.length / this.erpsupplieritemssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplieritemssource.grid.edit(this.tblerpsupplieritemssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplieritemssource.data.indexOf(event.data);
this.onDeleteerpsupplieritem(event,event.data.supplieritemid,((this.erpsupplieritemssource.getPaging().page-1) *this.erpsupplieritemssource.getPaging().perPage)+index);
this.erpsupplieritemssource.refresh();
break;
}
}

*/
erpsupplieritemsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplieritem(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplieritem(event,event.data.supplieritemid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplieritem(event,event.data.supplieritemid,((this.erpsupplieritemssource.getPaging().page-1) *this.erpsupplieritemssource.getPaging().perPage)+event.index);
this.erpsupplieritemssource.refresh();
break;
}
}
erpsupplieritemsonDelete(obj) {
let supplieritemid=obj.data.supplieritemid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(supplieritemid).then(res=>
this.erpsupplieritemsLoadTable()
);
}
}
erpsupplieritemsPaging(val)
{
debugger;
this.erpsupplieritemssource.setPaging(1, val, true);
}

handleerpsupplieritemsGridSelected(event:any) {
this.erpsupplieritemsselectedindex=this.erpsuppliermasterservice.erpsupplieritems.findIndex(i => i.supplieritemid === event.data.supplieritemid);
}
IserpsupplieritemsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplieritemsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplieritems
//start of Grid Codes boactivities
boactivitiessettings:any;
boactivitiessource: any;

showboactivitiesCheckbox()
{
debugger;
if(this.tblboactivitiessource.settings['selectMode']== 'multi')this.tblboactivitiessource.settings['selectMode']= 'single';
else
this.tblboactivitiessource.settings['selectMode']= 'multi';
this.tblboactivitiessource.initGrid();
}
deleteboactivitiesAll()
{
this.tblboactivitiessource.settings['selectMode'] = 'single';
}
showboactivitiesFilter()
{
  setTimeout(() => {
  this.SetboactivitiesTableddConfig();
  });
      if(this.tblboactivitiessource.settings!=null)this.tblboactivitiessource.settings['hideSubHeader'] =!this.tblboactivitiessource.settings['hideSubHeader'];
this.tblboactivitiessource.initGrid();
}
showboactivitiesInActive()
{
}
enableboactivitiesInActive()
{
}
async SetboactivitiesTableddConfig()
{
if(!this.bfilterPopulateboactivities){

this.configservice.getList("activitytype").then(res=>
{
var dataactivitytype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoactivitiesactivitytype3.push(defaultobj);
for(let i=0; i<dataactivitytype2.length; i++){
var obj= { value: dataactivitytype2[i].configkey, title: dataactivitytype2[i].configtext};
this.databoactivitiesactivitytype3.push(obj);
}
var clone = this.sharedService.clone(this.tblboactivitiessource.settings);
if(clone.columns['activitytype']!=undefined)clone.columns['activitytype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiesactivitytype3)), }, };
if(clone.columns['activitytype']!=undefined)clone.columns['activitytype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiesactivitytype3)), }, };
this.tblboactivitiessource.settings =  clone;
this.tblboactivitiessource.initGrid();
});

this.configservice.getList("priority").then(res=>
{
var datapriority2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoactivitiespriority3.push(defaultobj);
for(let i=0; i<datapriority2.length; i++){
var obj= { value: datapriority2[i].configkey, title: datapriority2[i].configtext};
this.databoactivitiespriority3.push(obj);
}
var clone = this.sharedService.clone(this.tblboactivitiessource.settings);
if(clone.columns['priority']!=undefined)clone.columns['priority'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiespriority3)), }, };
if(clone.columns['priority']!=undefined)clone.columns['priority'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiespriority3)), }, };
this.tblboactivitiessource.settings =  clone;
this.tblboactivitiessource.initGrid();
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datacontactpersonid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoactivitiescontactpersonid3.push(defaultobj);
for(let i=0; i<datacontactpersonid2.length; i++){
var obj= { value: datacontactpersonid2[i].userid, title:datacontactpersonid2[i].username};
this.databoactivitiescontactpersonid3.push(obj);
}
if((this.tblboactivitiessource.settings as any).columns['contactpersonid'])
{
(this.tblboactivitiessource.settings as any).columns['contactpersonid'].editor.config.list=JSON.parse(JSON.stringify(this.databoactivitiescontactpersonid3));
this.tblboactivitiessource.initGrid();
}
});

this.configservice.getList("activitystatus").then(res=>
{
var dataactivitystatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoactivitiesactivitystatus3.push(defaultobj);
for(let i=0; i<dataactivitystatus2.length; i++){
var obj= { value: dataactivitystatus2[i].configkey, title: dataactivitystatus2[i].configtext};
this.databoactivitiesactivitystatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblboactivitiessource.settings);
if(clone.columns['activitystatus']!=undefined)clone.columns['activitystatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiesactivitystatus3)), }, };
if(clone.columns['activitystatus']!=undefined)clone.columns['activitystatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoactivitiesactivitystatus3)), }, };
this.tblboactivitiessource.settings =  clone;
this.tblboactivitiessource.initGrid();
});
}
this.bfilterPopulateboactivities=true;
}
async boactivitiesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboactivitiesTableConfig()
{
this.boactivitiessettings = {
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
activitytype: {
title: 'Activity Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoactivitiesactivitytype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
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
duedate: {
title: 'Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
estimatedtime: {
title: 'Estimated Time',
type: '',
filter:true,
},
actualtimetaken: {
title: 'Actual Time Taken',
type: '',
filter:true,
},
priority: {
title: 'Priority',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoactivitiespriority3.find(c=>c.value==cell);
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
assignedby: {
title: 'Assigned By',
type: 'number',
filter:true,
},
assigneddate: {
title: 'Assigned Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
contactpersonid: {
title: 'Contact Person',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.databoactivitiescontactpersonid3.find(c=>c.value==cell);
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
activitystatus: {
title: 'Activity Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoactivitiesactivitystatus3.find(c=>c.value==cell);
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
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
},
};
}
boactivitiesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boactivitiesID)>=0)
{
this.boactivitiessource=new LocalDataSource();
this.boactivitiessource.load(this.erpsuppliermasterservice.boactivities as  any as LocalDataSource);
this.boactivitiessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boactivitiesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.boactivities.length == 0)
{
    this.tblboactivitiessource.grid.createFormShown = true;
}
else
{
    let obj = new boactivity();
    this.erpsuppliermasterservice.boactivities.push(obj);
    this.boactivitiessource.refresh();
    if ((this.erpsuppliermasterservice.boactivities.length / this.boactivitiessource.getPaging().perPage).toFixed(0) + 1 != this.boactivitiessource.getPaging().page)
    {
        this.boactivitiessource.setPage((this.erpsuppliermasterservice.boactivities.length / this.boactivitiessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboactivitiessource.grid.edit(this.tblboactivitiessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boactivitiessource.data.indexOf(event.data);
this.onDeleteboactivity(event,event.data.activityid,((this.boactivitiessource.getPaging().page-1) *this.boactivitiessource.getPaging().perPage)+index);
this.boactivitiessource.refresh();
break;
}
}

*/
boactivitiesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboactivity(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboactivity(event,event.data.activityid,this.formid);
break;
case 'delete':
this.onDeleteboactivity(event,event.data.activityid,((this.boactivitiessource.getPaging().page-1) *this.boactivitiessource.getPaging().perPage)+event.index);
this.boactivitiessource.refresh();
break;
}
}
boactivitiesonDelete(obj) {
let activityid=obj.data.activityid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(activityid).then(res=>
this.boactivitiesLoadTable()
);
}
}
boactivitiesPaging(val)
{
debugger;
this.boactivitiessource.setPaging(1, val, true);
}

handleboactivitiesGridSelected(event:any) {
this.boactivitiesselectedindex=this.erpsuppliermasterservice.boactivities.findIndex(i => i.activityid === event.data.activityid);
}
IsboactivitiesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boactivitiesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boactivities
//start of Grid Codes erpsupplierinvoices
erpsupplierinvoicessettings:any;
erpsupplierinvoicessource: any;

showerpsupplierinvoicesCheckbox()
{
debugger;
if(this.tblerpsupplierinvoicessource.settings['selectMode']== 'multi')this.tblerpsupplierinvoicessource.settings['selectMode']= 'single';
else
this.tblerpsupplierinvoicessource.settings['selectMode']= 'multi';
this.tblerpsupplierinvoicessource.initGrid();
}
deleteerpsupplierinvoicesAll()
{
this.tblerpsupplierinvoicessource.settings['selectMode'] = 'single';
}
showerpsupplierinvoicesFilter()
{
  setTimeout(() => {
  this.SeterpsupplierinvoicesTableddConfig();
  });
      if(this.tblerpsupplierinvoicessource.settings!=null)this.tblerpsupplierinvoicessource.settings['hideSubHeader'] =!this.tblerpsupplierinvoicessource.settings['hideSubHeader'];
this.tblerpsupplierinvoicessource.initGrid();
}
showerpsupplierinvoicesInActive()
{
}
enableerpsupplierinvoicesInActive()
{
}
async SeterpsupplierinvoicesTableddConfig()
{
if(!this.bfilterPopulateerpsupplierinvoices){
}
this.bfilterPopulateerpsupplierinvoices=true;
}
async erpsupplierinvoicesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierinvoicesTableConfig()
{
this.erpsupplierinvoicessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, // true,
delete:false,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
columns: {
invoicenumber: {
title: 'Invoice Number',
type: '',
filter:true,
},
},
};
}
erpsupplierinvoicesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierinvoicesID)>=0)
{
this.erpsupplierinvoicessource=new LocalDataSource();
this.erpsupplierinvoicessource.load(this.erpsuppliermasterservice.erpsupplierinvoices as  any as LocalDataSource);
this.erpsupplierinvoicessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierinvoicesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsupplierinvoices.length == 0)
{
    this.tblerpsupplierinvoicessource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierinvoice();
    this.erpsuppliermasterservice.erpsupplierinvoices.push(obj);
    this.erpsupplierinvoicessource.refresh();
    if ((this.erpsuppliermasterservice.erpsupplierinvoices.length / this.erpsupplierinvoicessource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierinvoicessource.getPaging().page)
    {
        this.erpsupplierinvoicessource.setPage((this.erpsuppliermasterservice.erpsupplierinvoices.length / this.erpsupplierinvoicessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierinvoicessource.grid.edit(this.tblerpsupplierinvoicessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.erpsupplierinvoicessource.data.indexOf(event.data);
this.onDeleteerpsupplierinvoice(event,event.data.invoiceid,((this.erpsupplierinvoicessource.getPaging().page-1) *this.erpsupplierinvoicessource.getPaging().perPage)+index);
this.erpsupplierinvoicessource.refresh();
}
break;
}
}

*/
erpsupplierinvoicesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierinvoice(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierinvoice(event,event.data.invoiceid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeleteerpsupplierinvoice(event,event.data.invoiceid,((this.erpsupplierinvoicessource.getPaging().page-1) *this.erpsupplierinvoicessource.getPaging().perPage)+event.index);
this.erpsupplierinvoicessource.refresh();
}
break;
}
}
erpsupplierinvoicesonDelete(obj) {
let invoiceid=obj.data.invoiceid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(invoiceid).then(res=>
this.erpsupplierinvoicesLoadTable()
);
}
}
erpsupplierinvoicesPaging(val)
{
debugger;
this.erpsupplierinvoicessource.setPaging(1, val, true);
}

handleerpsupplierinvoicesGridSelected(event:any) {
this.erpsupplierinvoicesselectedindex=this.erpsuppliermasterservice.erpsupplierinvoices.findIndex(i => i.invoiceid === event.data.invoiceid);
}
IserpsupplierinvoicesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierinvoicesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierinvoices
//start of Grid Codes erpsuppliercertifications
erpsuppliercertificationssettings:any;
erpsuppliercertificationssource: any;

showerpsuppliercertificationsCheckbox()
{
debugger;
if(this.tblerpsuppliercertificationssource.settings['selectMode']== 'multi')this.tblerpsuppliercertificationssource.settings['selectMode']= 'single';
else
this.tblerpsuppliercertificationssource.settings['selectMode']= 'multi';
this.tblerpsuppliercertificationssource.initGrid();
}
deleteerpsuppliercertificationsAll()
{
this.tblerpsuppliercertificationssource.settings['selectMode'] = 'single';
}
showerpsuppliercertificationsFilter()
{
  setTimeout(() => {
  this.SeterpsuppliercertificationsTableddConfig();
  });
      if(this.tblerpsuppliercertificationssource.settings!=null)this.tblerpsuppliercertificationssource.settings['hideSubHeader'] =!this.tblerpsuppliercertificationssource.settings['hideSubHeader'];
this.tblerpsuppliercertificationssource.initGrid();
}
showerpsuppliercertificationsInActive()
{
}
enableerpsuppliercertificationsInActive()
{
}
async SeterpsuppliercertificationsTableddConfig()
{
if(!this.bfilterPopulateerpsuppliercertifications){
}
this.bfilterPopulateerpsuppliercertifications=true;
}
async erpsuppliercertificationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsuppliercertificationsTableConfig()
{
this.erpsuppliercertificationssettings = {
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
certificatecategory: {
title: 'Certificate Category',
type: '',
filter:true,
},
certificatename: {
title: 'Certificate Name',
type: '',
filter:true,
},
issuedate: {
title: 'Issue Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
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
erpsuppliercertificationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsuppliercertificationsID)>=0)
{
this.erpsuppliercertificationssource=new LocalDataSource();
this.erpsuppliercertificationssource.load(this.erpsuppliermasterservice.erpsuppliercertifications as  any as LocalDataSource);
this.erpsuppliercertificationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsuppliercertificationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsuppliercertifications.length == 0)
{
    this.tblerpsuppliercertificationssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsuppliercertification();
    this.erpsuppliermasterservice.erpsuppliercertifications.push(obj);
    this.erpsuppliercertificationssource.refresh();
    if ((this.erpsuppliermasterservice.erpsuppliercertifications.length / this.erpsuppliercertificationssource.getPaging().perPage).toFixed(0) + 1 != this.erpsuppliercertificationssource.getPaging().page)
    {
        this.erpsuppliercertificationssource.setPage((this.erpsuppliermasterservice.erpsuppliercertifications.length / this.erpsuppliercertificationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsuppliercertificationssource.grid.edit(this.tblerpsuppliercertificationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsuppliercertificationssource.data.indexOf(event.data);
this.onDeleteerpsuppliercertification(event,event.data.certificationid,((this.erpsuppliercertificationssource.getPaging().page-1) *this.erpsuppliercertificationssource.getPaging().perPage)+index);
this.erpsuppliercertificationssource.refresh();
break;
}
}

*/
erpsuppliercertificationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsuppliercertification(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsuppliercertification(event,event.data.certificationid,this.formid);
break;
case 'delete':
this.onDeleteerpsuppliercertification(event,event.data.certificationid,((this.erpsuppliercertificationssource.getPaging().page-1) *this.erpsuppliercertificationssource.getPaging().perPage)+event.index);
this.erpsuppliercertificationssource.refresh();
break;
}
}
erpsuppliercertificationsonDelete(obj) {
let certificationid=obj.data.certificationid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(certificationid).then(res=>
this.erpsuppliercertificationsLoadTable()
);
}
}
erpsuppliercertificationsPaging(val)
{
debugger;
this.erpsuppliercertificationssource.setPaging(1, val, true);
}

handleerpsuppliercertificationsGridSelected(event:any) {
this.erpsuppliercertificationsselectedindex=this.erpsuppliermasterservice.erpsuppliercertifications.findIndex(i => i.certificationid === event.data.certificationid);
}
IserpsuppliercertificationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsuppliercertificationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsuppliercertifications
//start of Grid Codes erpsupplierfinancialdatas
erpsupplierfinancialdatassettings:any;
erpsupplierfinancialdatassource: any;

showerpsupplierfinancialdatasCheckbox()
{
debugger;
if(this.tblerpsupplierfinancialdatassource.settings['selectMode']== 'multi')this.tblerpsupplierfinancialdatassource.settings['selectMode']= 'single';
else
this.tblerpsupplierfinancialdatassource.settings['selectMode']= 'multi';
this.tblerpsupplierfinancialdatassource.initGrid();
}
deleteerpsupplierfinancialdatasAll()
{
this.tblerpsupplierfinancialdatassource.settings['selectMode'] = 'single';
}
showerpsupplierfinancialdatasFilter()
{
  setTimeout(() => {
  this.SeterpsupplierfinancialdatasTableddConfig();
  });
      if(this.tblerpsupplierfinancialdatassource.settings!=null)this.tblerpsupplierfinancialdatassource.settings['hideSubHeader'] =!this.tblerpsupplierfinancialdatassource.settings['hideSubHeader'];
this.tblerpsupplierfinancialdatassource.initGrid();
}
showerpsupplierfinancialdatasInActive()
{
}
enableerpsupplierfinancialdatasInActive()
{
}
async SeterpsupplierfinancialdatasTableddConfig()
{
if(!this.bfilterPopulateerpsupplierfinancialdatas){
}
this.bfilterPopulateerpsupplierfinancialdatas=true;
}
async erpsupplierfinancialdatasbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierfinancialdatasTableConfig()
{
this.erpsupplierfinancialdatassettings = {
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
finyear: {
title: 'Fin Year',
type: 'number',
filter:true,
},
turnovermillions: {
title: 'Turn Over Millions',
type: '',
filter:true,
},
profitbeforetax: {
title: 'Profit Before Tax',
type: '',
filter:true,
},
growthpercentage: {
title: 'Growth Percentage',
type: '',
filter:true,
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
erpsupplierfinancialdatasLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierfinancialdatasID)>=0)
{
this.erpsupplierfinancialdatassource=new LocalDataSource();
this.erpsupplierfinancialdatassource.load(this.erpsuppliermasterservice.erpsupplierfinancialdatas as  any as LocalDataSource);
this.erpsupplierfinancialdatassource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierfinancialdatasroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsupplierfinancialdatas.length == 0)
{
    this.tblerpsupplierfinancialdatassource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierfinancialdata();
    this.erpsuppliermasterservice.erpsupplierfinancialdatas.push(obj);
    this.erpsupplierfinancialdatassource.refresh();
    if ((this.erpsuppliermasterservice.erpsupplierfinancialdatas.length / this.erpsupplierfinancialdatassource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierfinancialdatassource.getPaging().page)
    {
        this.erpsupplierfinancialdatassource.setPage((this.erpsuppliermasterservice.erpsupplierfinancialdatas.length / this.erpsupplierfinancialdatassource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierfinancialdatassource.grid.edit(this.tblerpsupplierfinancialdatassource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierfinancialdatassource.data.indexOf(event.data);
this.onDeleteerpsupplierfinancialdata(event,event.data.findataid,((this.erpsupplierfinancialdatassource.getPaging().page-1) *this.erpsupplierfinancialdatassource.getPaging().perPage)+index);
this.erpsupplierfinancialdatassource.refresh();
break;
}
}

*/
erpsupplierfinancialdatasroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierfinancialdata(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierfinancialdata(event,event.data.findataid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierfinancialdata(event,event.data.findataid,((this.erpsupplierfinancialdatassource.getPaging().page-1) *this.erpsupplierfinancialdatassource.getPaging().perPage)+event.index);
this.erpsupplierfinancialdatassource.refresh();
break;
}
}
erpsupplierfinancialdatasonDelete(obj) {
let findataid=obj.data.findataid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(findataid).then(res=>
this.erpsupplierfinancialdatasLoadTable()
);
}
}
erpsupplierfinancialdatasPaging(val)
{
debugger;
this.erpsupplierfinancialdatassource.setPaging(1, val, true);
}

handleerpsupplierfinancialdatasGridSelected(event:any) {
this.erpsupplierfinancialdatasselectedindex=this.erpsuppliermasterservice.erpsupplierfinancialdatas.findIndex(i => i.findataid === event.data.findataid);
}
IserpsupplierfinancialdatasVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierfinancialdatasID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierfinancialdatas
//start of Grid Codes erpsupplierreferences
erpsupplierreferencessettings:any;
erpsupplierreferencessource: any;

showerpsupplierreferencesCheckbox()
{
debugger;
if(this.tblerpsupplierreferencessource.settings['selectMode']== 'multi')this.tblerpsupplierreferencessource.settings['selectMode']= 'single';
else
this.tblerpsupplierreferencessource.settings['selectMode']= 'multi';
this.tblerpsupplierreferencessource.initGrid();
}
deleteerpsupplierreferencesAll()
{
this.tblerpsupplierreferencessource.settings['selectMode'] = 'single';
}
showerpsupplierreferencesFilter()
{
  setTimeout(() => {
  this.SeterpsupplierreferencesTableddConfig();
  });
      if(this.tblerpsupplierreferencessource.settings!=null)this.tblerpsupplierreferencessource.settings['hideSubHeader'] =!this.tblerpsupplierreferencessource.settings['hideSubHeader'];
this.tblerpsupplierreferencessource.initGrid();
}
showerpsupplierreferencesInActive()
{
}
enableerpsupplierreferencesInActive()
{
}
async SeterpsupplierreferencesTableddConfig()
{
if(!this.bfilterPopulateerpsupplierreferences){
}
this.bfilterPopulateerpsupplierreferences=true;
}
async erpsupplierreferencesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierreferencesTableConfig()
{
this.erpsupplierreferencessettings = {
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
customername: {
title: 'Customer Name',
type: '',
filter:true,
},
companytype: {
title: 'Company Type',
type: '',
filter:true,
},
relationshipdetails: {
title: 'Relationship Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
effectivefrom: {
title: 'Effective From',
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
erpsupplierreferencesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierreferencesID)>=0)
{
this.erpsupplierreferencessource=new LocalDataSource();
this.erpsupplierreferencessource.load(this.erpsuppliermasterservice.erpsupplierreferences as  any as LocalDataSource);
this.erpsupplierreferencessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierreferencesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsuppliermasterservice.erpsupplierreferences.length == 0)
{
    this.tblerpsupplierreferencessource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierreference();
    this.erpsuppliermasterservice.erpsupplierreferences.push(obj);
    this.erpsupplierreferencessource.refresh();
    if ((this.erpsuppliermasterservice.erpsupplierreferences.length / this.erpsupplierreferencessource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierreferencessource.getPaging().page)
    {
        this.erpsupplierreferencessource.setPage((this.erpsuppliermasterservice.erpsupplierreferences.length / this.erpsupplierreferencessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierreferencessource.grid.edit(this.tblerpsupplierreferencessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierreferencessource.data.indexOf(event.data);
this.onDeleteerpsupplierreference(event,event.data.esrid,((this.erpsupplierreferencessource.getPaging().page-1) *this.erpsupplierreferencessource.getPaging().perPage)+index);
this.erpsupplierreferencessource.refresh();
break;
}
}

*/
erpsupplierreferencesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierreference(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierreference(event,event.data.esrid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierreference(event,event.data.esrid,((this.erpsupplierreferencessource.getPaging().page-1) *this.erpsupplierreferencessource.getPaging().perPage)+event.index);
this.erpsupplierreferencessource.refresh();
break;
}
}
erpsupplierreferencesonDelete(obj) {
let esrid=obj.data.esrid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsuppliermasterservice.deleteerpsuppliermaster(esrid).then(res=>
this.erpsupplierreferencesLoadTable()
);
}
}
erpsupplierreferencesPaging(val)
{
debugger;
this.erpsupplierreferencessource.setPaging(1, val, true);
}

handleerpsupplierreferencesGridSelected(event:any) {
this.erpsupplierreferencesselectedindex=this.erpsuppliermasterservice.erpsupplierreferences.findIndex(i => i.esrid === event.data.esrid);
}
IserpsupplierreferencesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierreferencesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierreferences

}



