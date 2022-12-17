import { pmspropertyService } from './../../../service/pmsproperty.service';
import { pmsproperty } from './../../../model/pmsproperty.model';
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
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerComponent } from './../../../pages/forms/pmspropertyowner/pmspropertyowner.component';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
//popups
import { erpfabankaccount} from '../../../../../../n-tire-finance-app/src/app/model/erpfabankaccount.model';
import { erpfabankaccountComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfabankaccount/erpfabankaccount.component';
import { erpfabankaccountService } from '../../../../../../n-tire-finance-app/src/app/service/erpfabankaccount.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
//detail table services
import { pmsdeposit } from './../../../model/pmsdeposit.model';
import { pmsdepositComponent } from './../../../pages/forms/pmsdeposit/pmsdeposit.component';
//FK services
import { pmstenant,IpmstenantResponse } from './../../../model/pmstenant.model';
import { pmstenantComponent } from './../../../pages/forms/pmstenant/pmstenant.component';
import { pmstenantService } from './../../../service/pmstenant.service';
import { pmslease,IpmsleaseResponse } from './../../../model/pmslease.model';
import { pmsleaseComponent } from './../../../pages/forms/pmslease/pmslease.component';
import { pmsleaseService } from './../../../service/pmslease.service';
import { pmspropertyunit,IpmspropertyunitResponse } from './../../../model/pmspropertyunit.model';
import { pmspropertyunitComponent } from './../../../pages/forms/pmspropertyunit/pmspropertyunit.component';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
import { pmspdc } from './../../../model/pmspdc.model';
import { pmspdcComponent } from './../../../pages/forms/pmspdc/pmspdc.component';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//FK services
import { pmsworkorder } from './../../../model/pmsworkorder.model';
import { pmsworkorderComponent } from './../../../pages/forms/pmsworkorder/pmsworkorder.component';
//FK services
import { pmspropertyapplicants } from './../../../model/pmspropertyapplicants.model';
import { pmspropertyapplicantsComponent } from './../../../pages/forms/pmspropertyapplicants/pmspropertyapplicants.component';
//FK services
import { pmsschedule } from './../../../model/pmsschedule.model';
import { pmsscheduleComponent } from './../../../pages/forms/pmsschedule/pmsschedule.component';
//FK services
import { pmstransaction } from './../../../model/pmstransaction.model';
import { pmstransactionComponent } from './../../../pages/forms/pmstransaction/pmstransaction.component';
//FK services
import { pmstransactionschedule } from './../../../model/pmstransactionschedule.model';
import { pmstransactionscheduleComponent } from './../../../pages/forms/pmstransactionschedule/pmstransactionschedule.component';
//FK services
import { pmspropertyasset } from './../../../model/pmspropertyasset.model';
import { pmspropertyassetComponent } from './../../../pages/forms/pmspropertyasset/pmspropertyasset.component';
//FK services
import { camsassetmaster,IcamsassetmasterResponse } from '../../../../../../n-tire-cams-app/src/app/model/camsassetmaster.model';
import { camsassetmasterComponent } from '../../../../../../n-tire-cams-app/src/app/pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from '../../../../../../n-tire-cams-app/src/app/service/camsassetmaster.service';
import { pmspropertyimage } from './../../../model/pmspropertyimage.model';
import { pmspropertyimageComponent } from './../../../pages/forms/pmspropertyimage/pmspropertyimage.component';
//FK services
import { pmspropertyopexdetail } from './../../../model/pmspropertyopexdetail.model';
import { pmspropertyopexdetailComponent } from './../../../pages/forms/pmspropertyopexdetail/pmspropertyopexdetail.component';
//FK services
import { pmspropertycontact } from './../../../model/pmspropertycontact.model';
import { pmspropertycontactComponent } from './../../../pages/forms/pmspropertycontact/pmspropertycontact.component';
//FK services
import { pmspropertydocument } from './../../../model/pmspropertydocument.model';
import { pmspropertydocumentComponent } from './../../../pages/forms/pmspropertydocument/pmspropertydocument.component';
//FK services
import { pmsunitcharges } from './../../../model/pmsunitcharges.model';
import { pmsunitchargesComponent } from './../../../pages/forms/pmsunitcharges/pmsunitcharges.component';
//FK services
//FK services
import { pmscharge } from './../../../model/pmscharge.model';
import { pmschargeComponent } from './../../../pages/forms/pmscharge/pmscharge.component';
//FK services
import { pmspropertyinsurance } from './../../../model/pmspropertyinsurance.model';
import { pmspropertyinsuranceComponent } from './../../../pages/forms/pmspropertyinsurance/pmspropertyinsurance.component';
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
selector: 'app-pmsproperty',
templateUrl: './pmsproperty.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertyComponent implements OnInit {
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
bfilterPopulatepmsproperties:boolean=false;
datapmspropertiespropertyid3:any=[];
datapmspropertiespropertytype3:any=[];
datapmspropertiescountryid3:any=[];
datapmspropertiesstateid3:any=[];
datapmspropertiescityid3:any=[];
datapmspropertiesownerid3:any=[];
datapmspropertiesbankaccountid3:any=[];
datapmspropertiescurrency3:any=[];
datapmspropertiesresponsibleid3:any=[];
datapmspropertiesunittype3:any=[];
datapmspropertiesrooms3:any=[];
datapmspropertiesbeds3:any=[];
datapmspropertiesbaths3:any=[];
datapmspropertiesownership3:any=[];
datapmspropertiesoccupancytype3:any=[];
datapmspropertiesfirstrentcommissiontype3:any=[];
datapmspropertiesrentcommissiontype3:any=[];
datapmspropertiesrenewalfeetype3:any=[];
datapmspropertiesservicefeetype3:any=[];
datapmsdepositsdeposittype3:any=[];
datapmsdepositstenantid3:any=[];
datapmsdepositsleaseid3:any=[];
datapmsdepositspropertyid3:any=[];
datapmsdepositspaymenttype3:any=[];
datapmsdepositsunitid3:any=[];
datapmsdepositsownerid3:any=[];
bfilterPopulatepmsdeposits:boolean=false;
datapmspdcssubcategoryid3:any=[];
datapmspdcscategoryid3:any=[];
datapmspdcspaymenttype3:any=[];
datapmspdcscollectionmode3:any=[];
datapmspdcspropertyid3:any=[];
datapmspdcstenantid3:any=[];
datapmspdcsunitid3:any=[];
datapmspdcsownerid3:any=[];
bfilterPopulatepmspdcs:boolean=false;
datapmsleasestenantid3:any=[];
datapmsleasespropertyid3:any=[];
datapmsleasesrentcycle3:any=[];
datapmsleasesleasetype3:any=[];
datapmsleasesunitid3:any=[];
datapmsleasesownerid3:any=[];
bfilterPopulatepmsleases:boolean=false;
datapmsworkordersresponsibleid3:any=[];
datapmsworkorderspropertyid3:any=[];
datapmsworkorderstenantid3:any=[];
datapmsworkordersvisittype3:any=[];
datapmsworkorderspriority3:any=[];
datapmsworkordersworkordertype3:any=[];
datapmsworkordersworkorderfrequency3:any=[];
datapmsworkordersownerid3:any=[];
bfilterPopulatepmsworkorders:boolean=false;
datapmspropertyapplicantspropertyid3:any=[];
datapmspropertyapplicantsunitid3:any=[];
bfilterPopulatepmspropertyapplicants:boolean=false;
datapmsschedulesworkorderfrequency3:any=[];
datapmsschedulesworkordertype3:any=[];
datapmsschedulespriority3:any=[];
datapmsschedulespropertyid3:any=[];
datapmsschedulestenantid3:any=[];
datapmsschedulesunitid3:any=[];
datapmsschedulesownerid3:any=[];
bfilterPopulatepmsschedules:boolean=false;
datapmstransactionspaymentmethod3:any=[];
datapmstransactionstransactionstatus3:any=[];
datapmstransactionstenantid3:any=[];
datapmstransactionscategoryid3:any=[];
datapmstransactionspropertyid3:any=[];
datapmstransactionsleaseid3:any=[];
datapmstransactionssubcategoryid3:any=[];
datapmstransactionsunitid3:any=[];
datapmstransactionsownerid3:any=[];
bfilterPopulatepmstransactions:boolean=false;
datapmstransactionschedulessubcategoryid3:any=[];
datapmstransactionschedulesfrequency3:any=[];
datapmstransactionschedulescategoryid3:any=[];
datapmstransactionschedulesleaseid3:any=[];
datapmstransactionschedulespropertyid3:any=[];
datapmstransactionschedulestenantid3:any=[];
datapmstransactionschedulesunitid3:any=[];
datapmstransactionschedulesownerid3:any=[];
bfilterPopulatepmstransactionschedules:boolean=false;
datapmspropertyassetsassetid3:any=[];
datapmspropertyassetspropertyid3:any=[];
datapmspropertyassetsunitid3:any=[];
bfilterPopulatepmspropertyassets:boolean=false;
datapmspropertyimagespropertyid3:any=[];
datapmspropertyimagesunitid3:any=[];
bfilterPopulatepmspropertyimages:boolean=false;
datapmspropertyopexdetailscurrency3:any=[];
datapmspropertyopexdetailspropertyid3:any=[];
datapmspropertyopexdetailsunitid3:any=[];
datapmspropertyopexdetailsownerid3:any=[];
bfilterPopulatepmspropertyopexdetails:boolean=false;
datapmspropertycontactscontacttype3:any=[];
datapmspropertycontactspropertyid3:any=[];
datapmspropertycontactsunitid3:any=[];
bfilterPopulatepmspropertycontacts:boolean=false;
datapmspropertydocumentspropertyid3:any=[];
datapmspropertydocumentsunitid3:any=[];
bfilterPopulatepmspropertydocuments:boolean=false;
datapmsunitchargeschargecycle3:any=[];
datapmsunitchargeschargetype3:any=[];
datapmsunitchargespropertyid3:any=[];
datapmsunitchargesunitid3:any=[];
datapmsunitchargesownerid3:any=[];
bfilterPopulatepmsunitcharges:boolean=false;
datapmspropertyunitsbeds3:any=[];
datapmspropertyunitsbaths3:any=[];
datapmspropertyunitsunittype3:any=[];
datapmspropertyunitsfirstrentcommissiontype3:any=[];
datapmspropertyunitsrentcommissiontype3:any=[];
datapmspropertyunitsrenewalfeetype3:any=[];
datapmspropertyunitsservicefeetype3:any=[];
datapmspropertyunitsterm3:any=[];
datapmspropertyunitsunitstatus3:any=[];
datapmspropertyunitspropertyid3:any=[];
datapmspropertyunitstenantid3:any=[];
bfilterPopulatepmspropertyunits:boolean=false;
datapmschargeschargecycle3:any=[];
datapmschargeschargetype3:any=[];
datapmschargesleaseid3:any=[];
datapmschargestenantid3:any=[];
datapmschargespropertyid3:any=[];
datapmschargespaidmode3:any=[];
datapmschargesunitid3:any=[];
datapmschargesownerid3:any=[];
bfilterPopulatepmscharges:boolean=false;
datapmspropertyinsurancestenantid3:any=[];
datapmspropertyinsurancespropertyid3:any=[];
bfilterPopulatepmspropertyinsurances:boolean=false;
@ViewChild('tblpmsdepositssource',{static:false}) tblpmsdepositssource: Ng2SmartTableComponent;
@ViewChild('tblpmspdcssource',{static:false}) tblpmspdcssource: Ng2SmartTableComponent;
@ViewChild('tblpmsleasessource',{static:false}) tblpmsleasessource: Ng2SmartTableComponent;
@ViewChild('tblpmsworkorderssource',{static:false}) tblpmsworkorderssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyapplicantssource',{static:false}) tblpmspropertyapplicantssource: Ng2SmartTableComponent;
@ViewChild('tblpmsschedulessource',{static:false}) tblpmsschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionssource',{static:false}) tblpmstransactionssource: Ng2SmartTableComponent;
@ViewChild('tblpmstransactionschedulessource',{static:false}) tblpmstransactionschedulessource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyassetssource',{static:false}) tblpmspropertyassetssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyimagessource',{static:false}) tblpmspropertyimagessource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyopexdetailssource',{static:false}) tblpmspropertyopexdetailssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertycontactssource',{static:false}) tblpmspropertycontactssource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertydocumentssource',{static:false}) tblpmspropertydocumentssource: Ng2SmartTableComponent;
@ViewChild('tblpmsunitchargessource',{static:false}) tblpmsunitchargessource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyunitssource',{static:false}) tblpmspropertyunitssource: Ng2SmartTableComponent;
@ViewChild('tblpmschargessource',{static:false}) tblpmschargessource: Ng2SmartTableComponent;
@ViewChild('tblpmspropertyinsurancessource',{static:false}) tblpmspropertyinsurancessource: Ng2SmartTableComponent;
 pmspropertyForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
propertytypeList: boconfigvalue[];
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
owneridList: pmspropertyowner[];
bankaccountidList: erpfabankaccount[];
currencyList: boconfigvalue[];
responsibleidList: hrmsemployee[];
responsibleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
responsibleid_hrmsemployeesForm: FormGroup;//autocomplete
responsibleid_hrmsemployeesoptions:any;//autocomplete
responsibleid_hrmsemployeesformatter:any;//autocomplete
unittypeList: boconfigvalue[];
roomsList: boconfigvalue[];
bedsList: boconfigvalue[];
bathsList: boconfigvalue[];
ownershipList: boconfigvalue[];
occupancytypeList: boconfigvalue[];
firstrentcommissiontypeList: boconfigvalue[];
rentcommissiontypeList: boconfigvalue[];
renewalfeetypeList: boconfigvalue[];
servicefeetypeList: boconfigvalue[];
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
pmspropertyshowOption:boolean;
pmsdepositshowOption:boolean;
pmspdcshowOption:boolean;
pmsleaseshowOption:boolean;
pmsworkordershowOption:boolean;
pmspropertyapplicantsshowOption:boolean;
pmsscheduleshowOption:boolean;
pmstransactionshowOption:boolean;
pmstransactionscheduleshowOption:boolean;
pmspropertyassetshowOption:boolean;
pmspropertyimageshowOption:boolean;
pmspropertyopexdetailshowOption:boolean;
pmspropertycontactshowOption:boolean;
pmspropertydocumentshowOption:boolean;
pmsunitchargesshowOption:boolean;
pmspropertyunitshowOption:boolean;
pmschargeshowOption:boolean;
pmspropertyinsuranceshowOption:boolean;
sessiondata:any;
sourcekey:any;



pmsdepositsvisiblelist:any;
pmsdepositshidelist:any;
pmspdcsvisiblelist:any;
pmspdcshidelist:any;
pmsleasesvisiblelist:any;
pmsleaseshidelist:any;
pmsworkordersvisiblelist:any;
pmsworkordershidelist:any;
pmspropertyapplicantsvisiblelist:any;
pmspropertyapplicantshidelist:any;
pmsschedulesvisiblelist:any;
pmsscheduleshidelist:any;
pmstransactionsvisiblelist:any;
pmstransactionshidelist:any;
pmstransactionschedulesvisiblelist:any;
pmstransactionscheduleshidelist:any;
pmspropertyassetsvisiblelist:any;
pmspropertyassetshidelist:any;
pmspropertyimagesvisiblelist:any;
pmspropertyimageshidelist:any;
pmspropertyopexdetailsvisiblelist:any;
pmspropertyopexdetailshidelist:any;
pmspropertycontactsvisiblelist:any;
pmspropertycontactshidelist:any;
pmspropertydocumentsvisiblelist:any;
pmspropertydocumentshidelist:any;
pmsunitchargesvisiblelist:any;
pmsunitchargeshidelist:any;
pmspropertyunitsvisiblelist:any;
pmspropertyunitshidelist:any;
pmschargesvisiblelist:any;
pmschargeshidelist:any;
pmspropertyinsurancesvisiblelist:any;
pmspropertyinsuranceshidelist:any;

DeletedpmsdepositIDs: string="";
pmsdepositsID: string = "1";
pmsdepositsselectedindex:any;
DeletedpmspdcIDs: string="";
pmspdcsID: string = "2";
pmspdcsselectedindex:any;
DeletedpmsleaseIDs: string="";
pmsleasesID: string = "3";
pmsleasesselectedindex:any;
DeletedpmsworkorderIDs: string="";
pmsworkordersID: string = "4";
pmsworkordersselectedindex:any;
DeletedpmspropertyapplicantsIDs: string="";
pmspropertyapplicantsID: string = "5";
pmspropertyapplicantsselectedindex:any;
DeletedpmsscheduleIDs: string="";
pmsschedulesID: string = "6";
pmsschedulesselectedindex:any;
DeletedpmstransactionIDs: string="";
pmstransactionsID: string = "7";
pmstransactionsselectedindex:any;
DeletedpmstransactionscheduleIDs: string="";
pmstransactionschedulesID: string = "8";
pmstransactionschedulesselectedindex:any;
DeletedpmspropertyassetIDs: string="";
pmspropertyassetsID: string = "9";
pmspropertyassetsselectedindex:any;
DeletedpmspropertyimageIDs: string="";
pmspropertyimagesID: string = "10";
pmspropertyimagesselectedindex:any;
DeletedpmspropertyopexdetailIDs: string="";
pmspropertyopexdetailsID: string = "11";
pmspropertyopexdetailsselectedindex:any;
DeletedpmspropertycontactIDs: string="";
pmspropertycontactsID: string = "12";
pmspropertycontactsselectedindex:any;
DeletedpmspropertydocumentIDs: string="";
pmspropertydocumentsID: string = "13";
pmspropertydocumentsselectedindex:any;
DeletedpmsunitchargesIDs: string="";
pmsunitchargesID: string = "14";
pmsunitchargesselectedindex:any;
DeletedpmspropertyunitIDs: string="";
pmspropertyunitsID: string = "15";
pmspropertyunitsselectedindex:any;
DeletedpmschargeIDs: string="";
pmschargesID: string = "16";
pmschargesselectedindex:any;
DeletedpmspropertyinsuranceIDs: string="";
pmspropertyinsurancesID: string = "17";
pmspropertyinsurancesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmspropertyservice: pmspropertyService,
private pmstenantservice: pmstenantService,
private pmsleaseservice: pmsleaseService,
private pmspropertyunitservice: pmspropertyunitService,
private pmspropertyownerservice: pmspropertyownerService,
private bosubcategorymasterservice: bosubcategorymasterService,
private bomasterdataservice: bomasterdataService,
private hrmsemployeeservice: hrmsemployeeService,
private camsassetmasterservice: camsassetmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
private erpfabankaccountservice:erpfabankaccountService,
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
this.pmspropertyForm  = this.fb.group({
pk:[null],
ImageName: [null],
propertyid: [null],
propertyiddesc: [null],
propertycode: [null],
title: [null],
details: [null],
propertytype: [null],
propertytypedesc: [null],
thumbnail: [null],
datecreated: [null],
rating: [null],
metatag: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pincode: [null],
ownerid: [null],
owneriddesc: [null],
bankaccountid: [null],
bankaccountiddesc: [null],
currency: [null],
currencydesc: [null],
reserveamount: [null],
responsibleid: [null],
responsibleiddesc: [null],
yearbuilt: [null],
propertylife: [null],
latitude: [null],
longitude: [null],
contactperson: [null],
phone1: [null],
phone2: [null],
email: [null],
website: [null],
unitno: [null],
unittype: [null],
unittypedesc: [null],
sqft: [null],
sizedetails: [null],
rooms: [null],
roomsdesc: [null],
beds: [null],
bedsdesc: [null],
baths: [null],
bathsdesc: [null],
rent: [null],
notes: [null],
assignowner: [null],
ownership: [null],
ownershipdesc: [null],
ownernotes: [null],
occupancytype: [null],
occupancytypedesc: [null],
deposit: [null],
advance: [null],
invoiceday: [null],
hasfirstrentcommission: [null],
firstrentcommissiontype: [null],
firstrentcommissiontypedesc: [null],
firstrentcommission: [null],
hasrentcommission: [null],
rentcommissiontype: [null],
rentcommissiontypedesc: [null],
rentcommission: [null],
hasrenewalfee: [null],
renewalfeetype: [null],
renewalfeetypedesc: [null],
renewalfee: [null],
hasservicefee: [null],
servicefeetype: [null],
servicefeetypedesc: [null],
servicefee: [null],
facebook: [null],
googleplus: [null],
twitter: [null],
instagram: [null],
pinterest: [null],
linkedin: [null],
status: [null],
statusdesc: [null],
customfield: [null],
attachment: [null],
});
}

get f() { return this.pmspropertyForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertyForm.dirty && this.pmspropertyForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.propertyid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.propertyid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.propertyid && pkDetail) {
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
let pmspropertyid = null;

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
this.formid=pmspropertyid;
//this.sharedService.alert(pmspropertyid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmsdepositsTableConfig();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });

this.SetpmspdcsTableConfig();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });

this.SetpmsleasesTableConfig();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });

this.SetpmsworkordersTableConfig();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });

this.SetpmspropertyapplicantsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });

this.SetpmsschedulesTableConfig();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });

this.SetpmstransactionsTableConfig();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });

this.SetpmstransactionschedulesTableConfig();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });

this.SetpmspropertyassetsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyassetsTableddConfig();
  });

this.SetpmspropertyimagesTableConfig();
  setTimeout(() => {
  this.SetpmspropertyimagesTableddConfig();
  });

this.SetpmspropertyopexdetailsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });

this.SetpmspropertycontactsTableConfig();
  setTimeout(() => {
  this.SetpmspropertycontactsTableddConfig();
  });

this.SetpmspropertydocumentsTableConfig();
  setTimeout(() => {
  this.SetpmspropertydocumentsTableddConfig();
  });

this.SetpmsunitchargesTableConfig();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });

this.SetpmspropertyunitsTableConfig();
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
  });

this.SetpmschargesTableConfig();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });

this.SetpmspropertyinsurancesTableConfig();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmspropertyservice.formData && this.pmspropertyservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmspropertyForm.patchValue({
    propertyid: this.pmspropertyservice.formData.propertyid,
    propertyiddesc: this.pmspropertyservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmspropertyForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
this.configservice.getList("propertytype").then(res => this.propertytypeList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.pmspropertyservice.formData && this.pmspropertyservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.pmspropertyForm.patchValue({
    countryid: this.pmspropertyservice.formData.countryid,
    countryiddesc: this.pmspropertyservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.pmspropertyForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
if(this.pmspropertyservice.formData && this.pmspropertyservice.formData.stateid){this.pmspropertyForm.patchValue({
    stateid: this.pmspropertyservice.formData.stateid,
    stateiddesc: this.pmspropertyservice.formData.stateiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
if(this.pmspropertyservice.formData && this.pmspropertyservice.formData.cityid){this.pmspropertyForm.patchValue({
    cityid: this.pmspropertyservice.formData.cityid,
    cityiddesc: this.pmspropertyservice.formData.cityiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});
this.erpfabankaccountservice.geterpfabankaccountsList().then(res => 
{
this.bankaccountidList = res as erpfabankaccount[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.responsibleidList = res as hrmsemployee[];
if(this.pmspropertyservice.formData && this.pmspropertyservice.formData.responsibleid){
this.responsibleidoptionsEvent.emit(this.responsibleidList);
this.pmspropertyForm.patchValue({
    responsibleid: this.pmspropertyservice.formData.responsibleid,
    responsibleiddesc: this.pmspropertyservice.formData.responsibleiddesc,
});
}
{
let arrresponsibleid = this.responsibleidList.filter(v => v.employeeid == this.pmspropertyForm.get('responsibleid').value);
let objresponsibleid;
if (arrresponsibleid.length > 0) objresponsibleid = arrresponsibleid[0];
if (objresponsibleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.responsibleid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.responsibleidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.responsibleid_hrmsemployeesformatter = (result: any) => result.employeename;
this.configservice.getList("unittype").then(res => this.unittypeList = res as boconfigvalue[]);
this.configservice.getList("rooms").then(res => this.roomsList = res as boconfigvalue[]);
this.configservice.getList("beds").then(res => this.bedsList = res as boconfigvalue[]);
this.configservice.getList("baths").then(res => this.bathsList = res as boconfigvalue[]);
this.configservice.getList("ownership").then(res => this.ownershipList = res as boconfigvalue[]);
this.configservice.getList("occupancytype").then(res => this.occupancytypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.firstrentcommissiontypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.rentcommissiontypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.renewalfeetypeList = res as boconfigvalue[]);
this.configservice.getList("commissiontype").then(res => this.servicefeetypeList = res as boconfigvalue[]);

//autocomplete
    this.pmspropertyservice.getpmspropertiesList().then(res => {
      this.pkList = res as pmsproperty[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.title;

//setting the flag that the screen is not touched 
this.pmspropertyForm.markAsUntouched();
this.pmspropertyForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmspropertyForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.pmspropertyForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});
this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
 this.stateidList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.pmspropertyForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});
this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
 this.cityidList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.pmspropertyForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}

onSelectedresponsibleid(responsibleidDetail: any) {
if (responsibleidDetail.employeeid && responsibleidDetail) {
this.pmspropertyForm.patchValue({
responsibleid: responsibleidDetail.employeeid,
responsibleiddesc: responsibleidDetail.employeename,

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
if (this.pmspropertyForm != null)
this.pmspropertyForm.reset();
this.pmspropertyForm.patchValue({
});
setTimeout(() => {
this.pmspropertyservice.pmsdeposits=[];
this.pmsdepositsLoadTable();
this.pmspropertyservice.pmspdcs=[];
this.pmspdcsLoadTable();
this.pmspropertyservice.pmsleases=[];
this.pmsleasesLoadTable();
this.pmspropertyservice.pmsworkorders=[];
this.pmsworkordersLoadTable();
this.pmspropertyservice.pmspropertyapplicants=[];
this.pmspropertyapplicantsLoadTable();
this.pmspropertyservice.pmsschedules=[];
this.pmsschedulesLoadTable();
this.pmspropertyservice.pmstransactions=[];
this.pmstransactionsLoadTable();
this.pmspropertyservice.pmstransactionschedules=[];
this.pmstransactionschedulesLoadTable();
this.pmspropertyservice.pmspropertyassets=[];
this.pmspropertyassetsLoadTable();
this.pmspropertyservice.pmspropertyimages=[];
this.pmspropertyimagesLoadTable();
this.pmspropertyservice.pmspropertyopexdetails=[];
this.pmspropertyopexdetailsLoadTable();
this.pmspropertyservice.pmspropertycontacts=[];
this.pmspropertycontactsLoadTable();
this.pmspropertyservice.pmspropertydocuments=[];
this.pmspropertydocumentsLoadTable();
this.pmspropertyservice.pmsunitcharges=[];
this.pmsunitchargesLoadTable();
this.pmspropertyservice.pmspropertyunits=[];
this.pmspropertyunitsLoadTable();
this.pmspropertyservice.pmscharges=[];
this.pmschargesLoadTable();
this.pmspropertyservice.pmspropertyinsurances=[];
this.pmspropertyinsurancesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let propertyid = this.pmspropertyForm.get('propertyid').value;
        if(propertyid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertyservice.deletepmsproperty(propertyid).then(res =>
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
    this.pmspropertyForm.patchValue({
        propertyid: null
    });
    if(this.pmspropertyservice.formData.propertyid!=null)this.pmspropertyservice.formData.propertyid=null;
for (let i=0;i<this.pmspropertyservice.pmsdeposits.length;i++) {
this.pmspropertyservice.pmsdeposits[i].depositid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspdcs.length;i++) {
this.pmspropertyservice.pmspdcs[i].pdcid=null;
}
for (let i=0;i<this.pmspropertyservice.pmsleases.length;i++) {
this.pmspropertyservice.pmsleases[i].leaseid=null;
}
for (let i=0;i<this.pmspropertyservice.pmsworkorders.length;i++) {
this.pmspropertyservice.pmsworkorders[i].workorderid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyapplicants.length;i++) {
this.pmspropertyservice.pmspropertyapplicants[i].applicantid=null;
}
for (let i=0;i<this.pmspropertyservice.pmsschedules.length;i++) {
this.pmspropertyservice.pmsschedules[i].scheduleid=null;
}
for (let i=0;i<this.pmspropertyservice.pmstransactions.length;i++) {
this.pmspropertyservice.pmstransactions[i].transactionid=null;
}
for (let i=0;i<this.pmspropertyservice.pmstransactionschedules.length;i++) {
this.pmspropertyservice.pmstransactionschedules[i].transactionscheduleid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyassets.length;i++) {
this.pmspropertyservice.pmspropertyassets[i].propertyassetid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyimages.length;i++) {
this.pmspropertyservice.pmspropertyimages[i].photoid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyopexdetails.length;i++) {
this.pmspropertyservice.pmspropertyopexdetails[i].opexid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertycontacts.length;i++) {
this.pmspropertyservice.pmspropertycontacts[i].contactid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertydocuments.length;i++) {
this.pmspropertyservice.pmspropertydocuments[i].documentid=null;
}
for (let i=0;i<this.pmspropertyservice.pmsunitcharges.length;i++) {
this.pmspropertyservice.pmsunitcharges[i].chargeid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyunits.length;i++) {
this.pmspropertyservice.pmspropertyunits[i].unitid=null;
}
for (let i=0;i<this.pmspropertyservice.pmscharges.length;i++) {
this.pmspropertyservice.pmscharges[i].chargeid=null;
}
for (let i=0;i<this.pmspropertyservice.pmspropertyinsurances.length;i++) {
this.pmspropertyservice.pmspropertyinsurances[i].insuranceid=null;
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
        else if(key=="datecreated")
this.pmspropertyForm.patchValue({"datecreated":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metatag")
this.pmspropertyForm.patchValue({"metatag":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.pmspropertyForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyForm.controls[key]!=undefined)
{
this.pmspropertyForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("pmsproperties",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.pmspropertyservice.formData.title!=null )
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
propertyidonChange(evt:any){
let e=evt.value;
}
propertycodeonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
propertytypeonChange(evt:any){
let e=this.f.propertytype.value as any;
this.pmspropertyForm.patchValue({propertytypedesc:evt.options[evt.options.selectedIndex].text});
}
thumbnailonChange(evt:any){
let e=evt.value;
}
datecreatedonChange(evt:any){
let e=evt.value;
}
ratingonChange(evt:any){
let e=evt.value;
}
metatagonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
pincodeonChange(evt:any){
let e=evt.value;
}
owneridonChange(evt:any){
let e=evt.value;
this.pmspropertyForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
bankaccountidonChange(evt:any){
let e=evt.value;
this.pmspropertyForm.patchValue({bankaccountiddesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.pmspropertyForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
reserveamountonChange(evt:any){
let e=evt.value;
}
responsibleidonChange(evt:any){
let e=evt.value;
}
yearbuiltonChange(evt:any){
let e=evt.value;
}
propertylifeonChange(evt:any){
let e=evt.value;
}
latitudeonChange(evt:any){
let e=evt.value;
}
longitudeonChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
phone1onChange(evt:any){
let e=evt.value;
}
phone2onChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
unitnoonChange(evt:any){
let e=evt.value;
}
unittypeonChange(evt:any){
let e=this.f.unittype.value as any;
this.pmspropertyForm.patchValue({unittypedesc:evt.options[evt.options.selectedIndex].text});
}
sqftonChange(evt:any){
let e=evt.value;
}
sizedetailsonChange(evt:any){
let e=evt.value;
}
roomsonChange(evt:any){
let e=this.f.rooms.value as any;
this.pmspropertyForm.patchValue({roomsdesc:evt.options[evt.options.selectedIndex].text});
}
bedsonChange(evt:any){
let e=this.f.beds.value as any;
this.pmspropertyForm.patchValue({bedsdesc:evt.options[evt.options.selectedIndex].text});
}
bathsonChange(evt:any){
let e=this.f.baths.value as any;
this.pmspropertyForm.patchValue({bathsdesc:evt.options[evt.options.selectedIndex].text});
}
rentonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
assignowneronChange(evt:any){
let e=evt.value;
}
ownershiponChange(evt:any){
let e=this.f.ownership.value as any;
this.pmspropertyForm.patchValue({ownershipdesc:evt.options[evt.options.selectedIndex].text});
}
ownernotesonChange(evt:any){
let e=evt.value;
}
occupancytypeonChange(evt:any){
let e=this.f.occupancytype.value as any;
this.pmspropertyForm.patchValue({occupancytypedesc:evt.options[evt.options.selectedIndex].text});
}
depositonChange(evt:any){
let e=evt.value;
}
advanceonChange(evt:any){
let e=evt.value;
}
invoicedayonChange(evt:any){
let e=evt.value;
}
hasfirstrentcommissiononChange(evt:any){
let e=evt.value;
}
firstrentcommissiontypeonChange(evt:any){
let e=this.f.firstrentcommissiontype.value as any;
this.pmspropertyForm.patchValue({firstrentcommissiontypedesc:evt.options[evt.options.selectedIndex].text});
}
firstrentcommissiononChange(evt:any){
let e=evt.value;
}
hasrentcommissiononChange(evt:any){
let e=evt.value;
}
rentcommissiontypeonChange(evt:any){
let e=this.f.rentcommissiontype.value as any;
this.pmspropertyForm.patchValue({rentcommissiontypedesc:evt.options[evt.options.selectedIndex].text});
}
rentcommissiononChange(evt:any){
let e=evt.value;
}
hasrenewalfeeonChange(evt:any){
let e=evt.value;
}
renewalfeetypeonChange(evt:any){
let e=this.f.renewalfeetype.value as any;
this.pmspropertyForm.patchValue({renewalfeetypedesc:evt.options[evt.options.selectedIndex].text});
}
renewalfeeonChange(evt:any){
let e=evt.value;
}
hasservicefeeonChange(evt:any){
let e=evt.value;
}
servicefeetypeonChange(evt:any){
let e=this.f.servicefeetype.value as any;
this.pmspropertyForm.patchValue({servicefeetypedesc:evt.options[evt.options.selectedIndex].text});
}
servicefeeonChange(evt:any){
let e=evt.value;
}
facebookonChange(evt:any){
let e=evt.value;
}
googleplusonChange(evt:any){
let e=evt.value;
}
twitteronChange(evt:any){
let e=evt.value;
}
instagramonChange(evt:any){
let e=evt.value;
}
pinterestonChange(evt:any){
let e=evt.value;
}
linkedinonChange(evt:any){
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
  


editpmsproperties() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertyservice.getpmspropertiesByEID(pkcol).then(res => {

this.pmspropertyservice.formData=res.pmsproperty;
let formproperty=res.pmsproperty.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmsproperty.pkcol;
this.formid=res.pmsproperty.propertyid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmsproperty.propertyid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertyForm.patchValue({
propertyid: res.pmsproperty.propertyid,
propertyiddesc: res.pmsproperty.propertyiddesc,
propertycode: res.pmsproperty.propertycode,
title: res.pmsproperty.title,
details: res.pmsproperty.details,
propertytype: res.pmsproperty.propertytype,
propertytypedesc: res.pmsproperty.propertytypedesc,
thumbnail: JSON.parse(res.pmsproperty.thumbnail),
datecreated: this.ngbDateParserFormatter.parse(res.pmsproperty.datecreated),
rating: res.pmsproperty.rating,
metatag: JSON.parse(res.pmsproperty.metatag),
address1: res.pmsproperty.address1,
address2: res.pmsproperty.address2,
countryid: res.pmsproperty.countryid,
countryiddesc: res.pmsproperty.countryiddesc,
stateid: res.pmsproperty.stateid,
stateiddesc: res.pmsproperty.stateiddesc,
cityid: res.pmsproperty.cityid,
cityiddesc: res.pmsproperty.cityiddesc,
pincode: res.pmsproperty.pincode,
ownerid: res.pmsproperty.ownerid,
owneriddesc: res.pmsproperty.owneriddesc,
bankaccountid: res.pmsproperty.bankaccountid,
bankaccountiddesc: res.pmsproperty.bankaccountiddesc,
currency: res.pmsproperty.currency,
currencydesc: res.pmsproperty.currencydesc,
reserveamount: res.pmsproperty.reserveamount,
responsibleid: res.pmsproperty.responsibleid,
responsibleiddesc: res.pmsproperty.responsibleiddesc,
yearbuilt: res.pmsproperty.yearbuilt,
propertylife: res.pmsproperty.propertylife,
latitude: res.pmsproperty.latitude,
longitude: res.pmsproperty.longitude,
contactperson: res.pmsproperty.contactperson,
phone1: res.pmsproperty.phone1,
phone2: res.pmsproperty.phone2,
email: res.pmsproperty.email,
website: res.pmsproperty.website,
unitno: res.pmsproperty.unitno,
unittype: res.pmsproperty.unittype,
unittypedesc: res.pmsproperty.unittypedesc,
sqft: res.pmsproperty.sqft,
sizedetails: res.pmsproperty.sizedetails,
rooms: res.pmsproperty.rooms,
roomsdesc: res.pmsproperty.roomsdesc,
beds: res.pmsproperty.beds,
bedsdesc: res.pmsproperty.bedsdesc,
baths: res.pmsproperty.baths,
bathsdesc: res.pmsproperty.bathsdesc,
rent: res.pmsproperty.rent,
notes: res.pmsproperty.notes,
assignowner: res.pmsproperty.assignowner,
ownership: res.pmsproperty.ownership,
ownershipdesc: res.pmsproperty.ownershipdesc,
ownernotes: res.pmsproperty.ownernotes,
occupancytype: res.pmsproperty.occupancytype,
occupancytypedesc: res.pmsproperty.occupancytypedesc,
deposit: res.pmsproperty.deposit,
advance: res.pmsproperty.advance,
invoiceday: res.pmsproperty.invoiceday,
hasfirstrentcommission: res.pmsproperty.hasfirstrentcommission,
firstrentcommissiontype: res.pmsproperty.firstrentcommissiontype,
firstrentcommissiontypedesc: res.pmsproperty.firstrentcommissiontypedesc,
firstrentcommission: res.pmsproperty.firstrentcommission,
hasrentcommission: res.pmsproperty.hasrentcommission,
rentcommissiontype: res.pmsproperty.rentcommissiontype,
rentcommissiontypedesc: res.pmsproperty.rentcommissiontypedesc,
rentcommission: res.pmsproperty.rentcommission,
hasrenewalfee: res.pmsproperty.hasrenewalfee,
renewalfeetype: res.pmsproperty.renewalfeetype,
renewalfeetypedesc: res.pmsproperty.renewalfeetypedesc,
renewalfee: res.pmsproperty.renewalfee,
hasservicefee: res.pmsproperty.hasservicefee,
servicefeetype: res.pmsproperty.servicefeetype,
servicefeetypedesc: res.pmsproperty.servicefeetypedesc,
servicefee: res.pmsproperty.servicefee,
facebook: res.pmsproperty.facebook,
googleplus: res.pmsproperty.googleplus,
twitter: res.pmsproperty.twitter,
instagram: res.pmsproperty.instagram,
pinterest: res.pmsproperty.pinterest,
linkedin: res.pmsproperty.linkedin,
status: res.pmsproperty.status,
statusdesc: res.pmsproperty.statusdesc,
customfield: res.pmsproperty.customfield,
attachment: JSON.parse(res.pmsproperty.attachment),
});
this.pmsdepositsvisiblelist=res.pmsdepositsvisiblelist;
this.pmspdcsvisiblelist=res.pmspdcsvisiblelist;
this.pmsleasesvisiblelist=res.pmsleasesvisiblelist;
this.pmsworkordersvisiblelist=res.pmsworkordersvisiblelist;
this.pmspropertyapplicantsvisiblelist=res.pmspropertyapplicantsvisiblelist;
this.pmsschedulesvisiblelist=res.pmsschedulesvisiblelist;
this.pmstransactionsvisiblelist=res.pmstransactionsvisiblelist;
this.pmstransactionschedulesvisiblelist=res.pmstransactionschedulesvisiblelist;
this.pmspropertyassetsvisiblelist=res.pmspropertyassetsvisiblelist;
this.pmspropertyimagesvisiblelist=res.pmspropertyimagesvisiblelist;
this.pmspropertyopexdetailsvisiblelist=res.pmspropertyopexdetailsvisiblelist;
this.pmspropertycontactsvisiblelist=res.pmspropertycontactsvisiblelist;
this.pmspropertydocumentsvisiblelist=res.pmspropertydocumentsvisiblelist;
this.pmsunitchargesvisiblelist=res.pmsunitchargesvisiblelist;
this.pmspropertyunitsvisiblelist=res.pmspropertyunitsvisiblelist;
this.pmschargesvisiblelist=res.pmschargesvisiblelist;
this.pmspropertyinsurancesvisiblelist=res.pmspropertyinsurancesvisiblelist;
if(this.pmspropertyForm.get('customfield').value!=null && this.pmspropertyForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.pmspropertyForm.get('customfield').value);
this.FillCustomField();
if(this.pmspropertyForm.get('thumbnail').value!=null && this.pmspropertyForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.pmspropertyForm.get('thumbnail').value);
if(this.pmspropertyForm.get('attachment').value!=null && this.pmspropertyForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmspropertyForm.get('attachment').value);
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.pmspropertyservice.pmsdeposits = res.pmsdeposits;
this.SetpmsdepositsTableConfig();
this.pmsdepositsLoadTable();
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
this.pmspropertyservice.pmspdcs = res.pmspdcs;
this.SetpmspdcsTableConfig();
this.pmspdcsLoadTable();
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
this.pmspropertyservice.pmsleases = res.pmsleases;
this.SetpmsleasesTableConfig();
this.pmsleasesLoadTable();
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
this.pmspropertyservice.pmsworkorders = res.pmsworkorders;
this.SetpmsworkordersTableConfig();
this.pmsworkordersLoadTable();
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });
this.pmspropertyservice.pmspropertyapplicants = res.pmspropertyapplicants;
this.SetpmspropertyapplicantsTableConfig();
this.pmspropertyapplicantsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });
this.pmspropertyservice.pmsschedules = res.pmsschedules;
this.SetpmsschedulesTableConfig();
this.pmsschedulesLoadTable();
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
this.pmspropertyservice.pmstransactions = res.pmstransactions;
this.SetpmstransactionsTableConfig();
this.pmstransactionsLoadTable();
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
this.pmspropertyservice.pmstransactionschedules = res.pmstransactionschedules;
this.SetpmstransactionschedulesTableConfig();
this.pmstransactionschedulesLoadTable();
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
this.pmspropertyservice.pmspropertyassets = res.pmspropertyassets;
this.SetpmspropertyassetsTableConfig();
this.pmspropertyassetsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyassetsTableddConfig();
  });
this.pmspropertyservice.pmspropertyimages = res.pmspropertyimages;
this.SetpmspropertyimagesTableConfig();
this.pmspropertyimagesLoadTable();
  setTimeout(() => {
  this.SetpmspropertyimagesTableddConfig();
  });
this.pmspropertyservice.pmspropertyopexdetails = res.pmspropertyopexdetails;
this.SetpmspropertyopexdetailsTableConfig();
this.pmspropertyopexdetailsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });
this.pmspropertyservice.pmspropertycontacts = res.pmspropertycontacts;
this.SetpmspropertycontactsTableConfig();
this.pmspropertycontactsLoadTable();
  setTimeout(() => {
  this.SetpmspropertycontactsTableddConfig();
  });
this.pmspropertyservice.pmspropertydocuments = res.pmspropertydocuments;
this.SetpmspropertydocumentsTableConfig();
this.pmspropertydocumentsLoadTable();
  setTimeout(() => {
  this.SetpmspropertydocumentsTableddConfig();
  });
this.pmspropertyservice.pmsunitcharges = res.pmsunitcharges;
this.SetpmsunitchargesTableConfig();
this.pmsunitchargesLoadTable();
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });
this.pmspropertyservice.pmspropertyunits = res.pmspropertyunits;
this.SetpmspropertyunitsTableConfig();
this.pmspropertyunitsLoadTable();
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
  });
this.pmspropertyservice.pmscharges = res.pmscharges;
this.SetpmschargesTableConfig();
this.pmschargesLoadTable();
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
this.pmspropertyservice.pmspropertyinsurances = res.pmspropertyinsurances;
this.SetpmspropertyinsurancesTableConfig();
this.pmspropertyinsurancesLoadTable();
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
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
  for (let key in this.pmspropertyForm.controls) {
    if (this.pmspropertyForm.controls[key] != null) {
if( key=="thumbnail")
{
if(this.pmspropertyservice.formData!=null && this.pmspropertyservice.formData[key]!=null  && this.pmspropertyservice.formData[key]!='[]' && this.pmspropertyservice.formData[key]!=undefined && this.pmspropertyservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.pmspropertyservice.formData!=null && this.pmspropertyservice.formData[key]!=null   && this.pmspropertyservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertyservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertyservice.formData!=null && this.pmspropertyservice.formData[key]!=null   && this.pmspropertyservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertyservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertyservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertyForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.pmspropertyForm.value;
obj.datecreated=new Date(this.pmspropertyForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.pmspropertyForm.get('datecreated').value)+'  UTC' :null);
if(this.pmspropertyForm.get('metatag').value!=null)obj.metatag=JSON.stringify(this.pmspropertyForm.get('metatag').value);
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

private pmspropertytoggleOption(){
this.pmspropertyshowOption = this.pmspropertyshowOption === true ? false : true;
}

private pmsdeposittoggleOption(){
this.pmsdepositshowOption = this.pmsdepositshowOption === true ? false : true;
}

private pmspdctoggleOption(){
this.pmspdcshowOption = this.pmspdcshowOption === true ? false : true;
}

private pmsleasetoggleOption(){
this.pmsleaseshowOption = this.pmsleaseshowOption === true ? false : true;
}

private pmsworkordertoggleOption(){
this.pmsworkordershowOption = this.pmsworkordershowOption === true ? false : true;
}

private pmspropertyapplicantstoggleOption(){
this.pmspropertyapplicantsshowOption = this.pmspropertyapplicantsshowOption === true ? false : true;
}

private pmsscheduletoggleOption(){
this.pmsscheduleshowOption = this.pmsscheduleshowOption === true ? false : true;
}

private pmstransactiontoggleOption(){
this.pmstransactionshowOption = this.pmstransactionshowOption === true ? false : true;
}

private pmstransactionscheduletoggleOption(){
this.pmstransactionscheduleshowOption = this.pmstransactionscheduleshowOption === true ? false : true;
}

private pmspropertyassettoggleOption(){
this.pmspropertyassetshowOption = this.pmspropertyassetshowOption === true ? false : true;
}

private pmspropertyimagetoggleOption(){
this.pmspropertyimageshowOption = this.pmspropertyimageshowOption === true ? false : true;
}

private pmspropertyopexdetailtoggleOption(){
this.pmspropertyopexdetailshowOption = this.pmspropertyopexdetailshowOption === true ? false : true;
}

private pmspropertycontacttoggleOption(){
this.pmspropertycontactshowOption = this.pmspropertycontactshowOption === true ? false : true;
}

private pmspropertydocumenttoggleOption(){
this.pmspropertydocumentshowOption = this.pmspropertydocumentshowOption === true ? false : true;
}

private pmsunitchargestoggleOption(){
this.pmsunitchargesshowOption = this.pmsunitchargesshowOption === true ? false : true;
}

private pmspropertyunittoggleOption(){
this.pmspropertyunitshowOption = this.pmspropertyunitshowOption === true ? false : true;
}

private pmschargetoggleOption(){
this.pmschargeshowOption = this.pmschargeshowOption === true ? false : true;
}

private pmspropertyinsurancetoggleOption(){
this.pmspropertyinsuranceshowOption = this.pmspropertyinsuranceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertyservice.formData=this.pmspropertyForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyForm.controls[key] != null)
    {
        this.pmspropertyservice.formData[key] = this.pmspropertyForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.pmspropertyservice.formData.thumbnail=this.pmspropertyForm.get('thumbnail').value;
this.pmspropertyservice.formData.datecreated=new Date(this.pmspropertyForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.pmspropertyForm.get('datecreated').value)+'  UTC' :null);
if(this.pmspropertyForm.get('metatag').value!=null)this.pmspropertyservice.formData.metatag=JSON.stringify(this.pmspropertyForm.get('metatag').value);
if(customfields!=null)this.pmspropertyservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.pmspropertyservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.pmspropertyservice.formData.DeletedpmsdepositIDs = this.DeletedpmsdepositIDs;
this.pmspropertyservice.formData.DeletedpmspdcIDs = this.DeletedpmspdcIDs;
this.pmspropertyservice.formData.DeletedpmsleaseIDs = this.DeletedpmsleaseIDs;
this.pmspropertyservice.formData.DeletedpmsworkorderIDs = this.DeletedpmsworkorderIDs;
this.pmspropertyservice.formData.DeletedpmspropertyapplicantsIDs = this.DeletedpmspropertyapplicantsIDs;
this.pmspropertyservice.formData.DeletedpmsscheduleIDs = this.DeletedpmsscheduleIDs;
this.pmspropertyservice.formData.DeletedpmstransactionIDs = this.DeletedpmstransactionIDs;
this.pmspropertyservice.formData.DeletedpmstransactionscheduleIDs = this.DeletedpmstransactionscheduleIDs;
this.pmspropertyservice.formData.DeletedpmspropertyassetIDs = this.DeletedpmspropertyassetIDs;
this.pmspropertyservice.formData.DeletedpmspropertyimageIDs = this.DeletedpmspropertyimageIDs;
this.pmspropertyservice.formData.DeletedpmspropertyopexdetailIDs = this.DeletedpmspropertyopexdetailIDs;
this.pmspropertyservice.formData.DeletedpmspropertycontactIDs = this.DeletedpmspropertycontactIDs;
this.pmspropertyservice.formData.DeletedpmspropertydocumentIDs = this.DeletedpmspropertydocumentIDs;
this.pmspropertyservice.formData.DeletedpmsunitchargesIDs = this.DeletedpmsunitchargesIDs;
this.pmspropertyservice.formData.DeletedpmspropertyunitIDs = this.DeletedpmspropertyunitIDs;
this.pmspropertyservice.formData.DeletedpmschargeIDs = this.DeletedpmschargeIDs;
this.pmspropertyservice.formData.DeletedpmspropertyinsuranceIDs = this.DeletedpmspropertyinsuranceIDs;
if(this.thumbnail.getattachmentlist()!=null)this.pmspropertyservice.formData.thumbnail=JSON.stringify(this.thumbnail.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.pmspropertyservice.formData);
this.pmspropertyservice.formData=this.pmspropertyForm.value;
this.pmspropertyservice.saveOrUpdatepmsproperties().subscribe(
async res => {
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.pmsdepositssource.data)
{
    for (let i = 0; i < this.pmsdepositssource.data.length; i++)
    {
        if (this.pmsdepositssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsdepositssource.data[i].fileattachmentlist);
    }
}
if (this.pmspdcssource.data)
{
    for (let i = 0; i < this.pmspdcssource.data.length; i++)
    {
        if (this.pmspdcssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspdcssource.data[i].fileattachmentlist);
    }
}
if (this.pmsleasessource.data)
{
    for (let i = 0; i < this.pmsleasessource.data.length; i++)
    {
        if (this.pmsleasessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsleasessource.data[i].fileattachmentlist);
    }
}
if (this.pmsworkorderssource.data)
{
    for (let i = 0; i < this.pmsworkorderssource.data.length; i++)
    {
        if (this.pmsworkorderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsworkorderssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyapplicantssource.data)
{
    for (let i = 0; i < this.pmspropertyapplicantssource.data.length; i++)
    {
        if (this.pmspropertyapplicantssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyapplicantssource.data[i].fileattachmentlist);
    }
}
if (this.pmsschedulessource.data)
{
    for (let i = 0; i < this.pmsschedulessource.data.length; i++)
    {
        if (this.pmsschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsschedulessource.data[i].fileattachmentlist);
    }
}
if (this.pmstransactionssource.data)
{
    for (let i = 0; i < this.pmstransactionssource.data.length; i++)
    {
        if (this.pmstransactionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmstransactionssource.data[i].fileattachmentlist);
    }
}
if (this.pmstransactionschedulessource.data)
{
    for (let i = 0; i < this.pmstransactionschedulessource.data.length; i++)
    {
        if (this.pmstransactionschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmstransactionschedulessource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyassetssource.data)
{
    for (let i = 0; i < this.pmspropertyassetssource.data.length; i++)
    {
        if (this.pmspropertyassetssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyassetssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyimagessource.data)
{
    for (let i = 0; i < this.pmspropertyimagessource.data.length; i++)
    {
        if (this.pmspropertyimagessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyimagessource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyopexdetailssource.data)
{
    for (let i = 0; i < this.pmspropertyopexdetailssource.data.length; i++)
    {
        if (this.pmspropertyopexdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyopexdetailssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertycontactssource.data)
{
    for (let i = 0; i < this.pmspropertycontactssource.data.length; i++)
    {
        if (this.pmspropertycontactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertycontactssource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertydocumentssource.data)
{
    for (let i = 0; i < this.pmspropertydocumentssource.data.length; i++)
    {
        if (this.pmspropertydocumentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertydocumentssource.data[i].fileattachmentlist);
    }
}
if (this.pmsunitchargessource.data)
{
    for (let i = 0; i < this.pmsunitchargessource.data.length; i++)
    {
        if (this.pmsunitchargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmsunitchargessource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyunitssource.data)
{
    for (let i = 0; i < this.pmspropertyunitssource.data.length; i++)
    {
        if (this.pmspropertyunitssource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyunitssource.data[i].fileattachmentlist);
    }
}
if (this.pmschargessource.data)
{
    for (let i = 0; i < this.pmschargessource.data.length; i++)
    {
        if (this.pmschargessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmschargessource.data[i].fileattachmentlist);
    }
}
if (this.pmspropertyinsurancessource.data)
{
    for (let i = 0; i < this.pmspropertyinsurancessource.data.length; i++)
    {
        if (this.pmspropertyinsurancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmspropertyinsurancessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsproperty);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertyservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsproperty);
}
else
{
this.FillData(res);
}
}
this.pmspropertyForm.markAsUntouched();
this.pmspropertyForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmspropertyForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.pmspropertyForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.pmspropertyForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.pmspropertyForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmspropertyForm.get('ownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbankaccountid( bankaccountid) {
/*let ScreenType='2';
this.dialog.open(erpfabankaccountComponent, 
{
data: {bankaccountid:this.pmspropertyForm.get('bankaccountid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditresponsibleid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.pmspropertyForm.get('responsibleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmsdeposit(event:any,depositid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsdepositComponent, 
{
data:  {  showview:false,save:false,event,depositid, propertyid,visiblelist:this.pmsdepositsvisiblelist,  hidelist:this.pmsdepositshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsdepositssource.add(res);
this.pmsdepositssource.refresh();
}
else
{
this.pmsdepositssource.update(event.data, res);
}
}
});
}

onDeletepmsdeposit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsdepositIDs += childID + ",";
this.pmspropertyservice.pmsdeposits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspdc(event:any,pdcid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspdcComponent, 
{
data:  {  showview:false,save:false,event,pdcid, propertyid,visiblelist:this.pmspdcsvisiblelist,  hidelist:this.pmspdcshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspdcssource.add(res);
this.pmspdcssource.refresh();
}
else
{
this.pmspdcssource.update(event.data, res);
}
}
});
}

onDeletepmspdc(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspdcIDs += childID + ",";
this.pmspropertyservice.pmspdcs.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmslease(event:any,leaseid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsleaseComponent, 
{
data:  {  showview:false,save:false,event,leaseid, propertyid,visiblelist:this.pmsleasesvisiblelist,  hidelist:this.pmsleaseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsleasessource.add(res);
this.pmsleasessource.refresh();
}
else
{
this.pmsleasessource.update(event.data, res);
}
}
});
}

onDeletepmslease(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsleaseIDs += childID + ",";
this.pmspropertyservice.pmsleases.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsworkorder(event:any,workorderid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsworkorderComponent, 
{
data:  {  showview:false,save:false,event,workorderid, propertyid,visiblelist:this.pmsworkordersvisiblelist,  hidelist:this.pmsworkordershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsworkorderssource.add(res);
this.pmsworkorderssource.refresh();
}
else
{
this.pmsworkorderssource.update(event.data, res);
}
}
});
}

onDeletepmsworkorder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsworkorderIDs += childID + ",";
this.pmspropertyservice.pmsworkorders.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyapplicants(event:any,applicantid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyapplicantsComponent, 
{
data:  {  showview:false,save:false,event,applicantid, propertyid,visiblelist:this.pmspropertyapplicantsvisiblelist,  hidelist:this.pmspropertyapplicantshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyapplicantssource.add(res);
this.pmspropertyapplicantssource.refresh();
}
else
{
this.pmspropertyapplicantssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyapplicants(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyapplicantsIDs += childID + ",";
this.pmspropertyservice.pmspropertyapplicants.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsschedule(event:any,scheduleid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, propertyid,visiblelist:this.pmsschedulesvisiblelist,  hidelist:this.pmsscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsschedulessource.add(res);
this.pmsschedulessource.refresh();
}
else
{
this.pmsschedulessource.update(event.data, res);
}
}
});
}

onDeletepmsschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsscheduleIDs += childID + ",";
this.pmspropertyservice.pmsschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransaction(event:any,transactionid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionComponent, 
{
data:  {  showview:false,save:false,event,transactionid, propertyid,visiblelist:this.pmstransactionsvisiblelist,  hidelist:this.pmstransactionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmstransactionssource.add(res);
this.pmstransactionssource.refresh();
}
else
{
this.pmstransactionssource.update(event.data, res);
}
}
});
}

onDeletepmstransaction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmstransactionIDs += childID + ",";
this.pmspropertyservice.pmstransactions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmstransactionschedule(event:any,transactionscheduleid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmstransactionscheduleComponent, 
{
data:  {  showview:false,save:false,event,transactionscheduleid, propertyid,visiblelist:this.pmstransactionschedulesvisiblelist,  hidelist:this.pmstransactionscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmstransactionschedulessource.add(res);
this.pmstransactionschedulessource.refresh();
}
else
{
this.pmstransactionschedulessource.update(event.data, res);
}
}
});
}

onDeletepmstransactionschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmstransactionscheduleIDs += childID + ",";
this.pmspropertyservice.pmstransactionschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyasset(event:any,propertyassetid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyassetComponent, 
{
data:  {  showview:false,save:false,event,propertyassetid, propertyid,visiblelist:this.pmspropertyassetsvisiblelist,  hidelist:this.pmspropertyassetshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyassetssource.add(res);
this.pmspropertyassetssource.refresh();
}
else
{
this.pmspropertyassetssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyasset(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyassetIDs += childID + ",";
this.pmspropertyservice.pmspropertyassets.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyimage(event:any,photoid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyimageComponent, 
{
data:  {  showview:false,save:false,event,photoid, propertyid,visiblelist:this.pmspropertyimagesvisiblelist,  hidelist:this.pmspropertyimageshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyimagessource.add(res);
this.pmspropertyimagessource.refresh();
}
else
{
this.pmspropertyimagessource.update(event.data, res);
}
}
});
}

onDeletepmspropertyimage(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyimageIDs += childID + ",";
this.pmspropertyservice.pmspropertyimages.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyopexdetail(event:any,opexid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyopexdetailComponent, 
{
data:  {  showview:false,save:false,event,opexid, propertyid,visiblelist:this.pmspropertyopexdetailsvisiblelist,  hidelist:this.pmspropertyopexdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyopexdetailssource.add(res);
this.pmspropertyopexdetailssource.refresh();
}
else
{
this.pmspropertyopexdetailssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyopexdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyopexdetailIDs += childID + ",";
this.pmspropertyservice.pmspropertyopexdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertycontact(event:any,contactid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertycontactComponent, 
{
data:  {  showview:false,save:false,event,contactid, propertyid,visiblelist:this.pmspropertycontactsvisiblelist,  hidelist:this.pmspropertycontactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertycontactssource.add(res);
this.pmspropertycontactssource.refresh();
}
else
{
this.pmspropertycontactssource.update(event.data, res);
}
}
});
}

onDeletepmspropertycontact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertycontactIDs += childID + ",";
this.pmspropertyservice.pmspropertycontacts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertydocument(event:any,documentid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertydocumentComponent, 
{
data:  {  showview:false,save:false,event,documentid, propertyid,visiblelist:this.pmspropertydocumentsvisiblelist,  hidelist:this.pmspropertydocumentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertydocumentssource.add(res);
this.pmspropertydocumentssource.refresh();
}
else
{
this.pmspropertydocumentssource.update(event.data, res);
}
}
});
}

onDeletepmspropertydocument(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertydocumentIDs += childID + ",";
this.pmspropertyservice.pmspropertydocuments.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmsunitcharges(event:any,chargeid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmsunitchargesComponent, 
{
data:  {  showview:false,save:false,event,chargeid, propertyid,visiblelist:this.pmsunitchargesvisiblelist,  hidelist:this.pmsunitchargeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmsunitchargessource.add(res);
this.pmsunitchargessource.refresh();
}
else
{
this.pmsunitchargessource.update(event.data, res);
}
}
});
}

onDeletepmsunitcharges(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmsunitchargesIDs += childID + ",";
this.pmspropertyservice.pmsunitcharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyunit(event:any,unitid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyunitComponent, 
{
data:  {  showview:false,save:false,event,unitid, propertyid,visiblelist:this.pmspropertyunitsvisiblelist,  hidelist:this.pmspropertyunitshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyunitssource.add(res);
this.pmspropertyunitssource.refresh();
}
else
{
this.pmspropertyunitssource.update(event.data, res);
}
}
});
}

onDeletepmspropertyunit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyunitIDs += childID + ",";
this.pmspropertyservice.pmspropertyunits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmscharge(event:any,chargeid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmschargeComponent, 
{
data:  {  showview:false,save:false,event,chargeid, propertyid,visiblelist:this.pmschargesvisiblelist,  hidelist:this.pmschargeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmschargessource.add(res);
this.pmschargessource.refresh();
}
else
{
this.pmschargessource.update(event.data, res);
}
}
});
}

onDeletepmscharge(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmschargeIDs += childID + ",";
this.pmspropertyservice.pmscharges.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditpmspropertyinsurance(event:any,insuranceid:any, propertyid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(pmspropertyinsuranceComponent, 
{
data:  {  showview:false,save:false,event,insuranceid, propertyid,visiblelist:this.pmspropertyinsurancesvisiblelist,  hidelist:this.pmspropertyinsuranceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.pmspropertyinsurancessource.add(res);
this.pmspropertyinsurancessource.refresh();
}
else
{
this.pmspropertyinsurancessource.update(event.data, res);
}
}
});
}

onDeletepmspropertyinsurance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedpmspropertyinsuranceIDs += childID + ",";
this.pmspropertyservice.pmspropertyinsurances.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes pmsdeposits
pmsdepositssettings:any;
pmsdepositssource: any;

showpmsdepositsCheckbox()
{
debugger;
if(this.tblpmsdepositssource.settings['selectMode']== 'multi')this.tblpmsdepositssource.settings['selectMode']= 'single';
else
this.tblpmsdepositssource.settings['selectMode']= 'multi';
this.tblpmsdepositssource.initGrid();
}
deletepmsdepositsAll()
{
this.tblpmsdepositssource.settings['selectMode'] = 'single';
}
showpmsdepositsFilter()
{
  setTimeout(() => {
  this.SetpmsdepositsTableddConfig();
  });
      if(this.tblpmsdepositssource.settings!=null)this.tblpmsdepositssource.settings['hideSubHeader'] =!this.tblpmsdepositssource.settings['hideSubHeader'];
this.tblpmsdepositssource.initGrid();
}
showpmsdepositsInActive()
{
}
enablepmsdepositsInActive()
{
}
async SetpmsdepositsTableddConfig()
{
if(!this.bfilterPopulatepmsdeposits){
}
this.bfilterPopulatepmsdeposits=true;
}
async pmsdepositsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsdepositsTableConfig()
{
this.pmsdepositssettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
deposittype: {
title: 'Deposit Type',
type: '',
filter:true,
},
depositamount: {
title: 'Deposit Amount',
type: 'number',
filter:true,
},
depositduedate: {
title: 'Deposit Due Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paid: {
title: 'Pa',
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
paiddate: {
title: 'Paid Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paidamount: {
title: 'Paid Amount',
type: 'number',
filter:true,
},
paymenttype: {
title: 'Payment Type',
type: '',
filter:true,
},
chequenumber: {
title: 'Cheque Number',
type: '',
filter:true,
},
chequedate: {
title: 'Cheque Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
bankname: {
title: 'Bank Name',
type: '',
filter:true,
},
txnreference: {
title: 'Txn Reference',
type: '',
filter:true,
},
txndate: {
title: 'Txn Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
txnbank: {
title: 'Txn Bank',
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
},
};
}
pmsdepositsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsdepositsID)>=0)
{
this.pmsdepositssource=new LocalDataSource();
this.pmsdepositssource.load(this.pmspropertyservice.pmsdeposits as  any as LocalDataSource);
this.pmsdepositssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsdepositsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmsdeposits.length == 0)
{
    this.tblpmsdepositssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsdeposit();
    this.pmspropertyservice.pmsdeposits.push(obj);
    this.pmsdepositssource.refresh();
    if ((this.pmspropertyservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1 != this.pmsdepositssource.getPaging().page)
    {
        this.pmsdepositssource.setPage((this.pmspropertyservice.pmsdeposits.length / this.pmsdepositssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsdepositssource.grid.edit(this.tblpmsdepositssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsdepositssource.data.indexOf(event.data);
this.onDeletepmsdeposit(event,event.data.depositid,((this.pmsdepositssource.getPaging().page-1) *this.pmsdepositssource.getPaging().perPage)+index);
this.pmsdepositssource.refresh();
break;
}
}

*/
pmsdepositsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsdeposit(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsdeposit(event,event.data.depositid,this.formid);
break;
case 'delete':
this.onDeletepmsdeposit(event,event.data.depositid,((this.pmsdepositssource.getPaging().page-1) *this.pmsdepositssource.getPaging().perPage)+event.index);
this.pmsdepositssource.refresh();
break;
}
}
pmsdepositsonDelete(obj) {
let depositid=obj.data.depositid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(depositid).then(res=>
this.pmsdepositsLoadTable()
);
}
}
pmsdepositsPaging(val)
{
debugger;
this.pmsdepositssource.setPaging(1, val, true);
}

handlepmsdepositsGridSelected(event:any) {
this.pmsdepositsselectedindex=this.pmspropertyservice.pmsdeposits.findIndex(i => i.depositid === event.data.depositid);
}
IspmsdepositsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsdepositsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsdeposits
//start of Grid Codes pmspdcs
pmspdcssettings:any;
pmspdcssource: any;

showpmspdcsCheckbox()
{
debugger;
if(this.tblpmspdcssource.settings['selectMode']== 'multi')this.tblpmspdcssource.settings['selectMode']= 'single';
else
this.tblpmspdcssource.settings['selectMode']= 'multi';
this.tblpmspdcssource.initGrid();
}
deletepmspdcsAll()
{
this.tblpmspdcssource.settings['selectMode'] = 'single';
}
showpmspdcsFilter()
{
  setTimeout(() => {
  this.SetpmspdcsTableddConfig();
  });
      if(this.tblpmspdcssource.settings!=null)this.tblpmspdcssource.settings['hideSubHeader'] =!this.tblpmspdcssource.settings['hideSubHeader'];
this.tblpmspdcssource.initGrid();
}
showpmspdcsInActive()
{
}
enablepmspdcsInActive()
{
}
async SetpmspdcsTableddConfig()
{
if(!this.bfilterPopulatepmspdcs){
}
this.bfilterPopulatepmspdcs=true;
}
async pmspdcsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspdcsTableConfig()
{
this.pmspdcssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
currentdate: {
title: 'Current Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
paymenttype: {
title: 'Payment Type',
type: '',
filter:true,
},
collectionmode: {
title: 'Collection Mode',
type: '',
filter:true,
},
duedate: {
title: 'Duedate',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reference: {
title: 'Reference',
type: '',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
},
};
}
pmspdcsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspdcsID)>=0)
{
this.pmspdcssource=new LocalDataSource();
this.pmspdcssource.load(this.pmspropertyservice.pmspdcs as  any as LocalDataSource);
this.pmspdcssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspdcsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspdcs.length == 0)
{
    this.tblpmspdcssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspdc();
    this.pmspropertyservice.pmspdcs.push(obj);
    this.pmspdcssource.refresh();
    if ((this.pmspropertyservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1 != this.pmspdcssource.getPaging().page)
    {
        this.pmspdcssource.setPage((this.pmspropertyservice.pmspdcs.length / this.pmspdcssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspdcssource.grid.edit(this.tblpmspdcssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspdcssource.data.indexOf(event.data);
this.onDeletepmspdc(event,event.data.pdcid,((this.pmspdcssource.getPaging().page-1) *this.pmspdcssource.getPaging().perPage)+index);
this.pmspdcssource.refresh();
break;
}
}

*/
pmspdcsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspdc(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspdc(event,event.data.pdcid,this.formid);
break;
case 'delete':
this.onDeletepmspdc(event,event.data.pdcid,((this.pmspdcssource.getPaging().page-1) *this.pmspdcssource.getPaging().perPage)+event.index);
this.pmspdcssource.refresh();
break;
}
}
pmspdcsonDelete(obj) {
let pdcid=obj.data.pdcid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(pdcid).then(res=>
this.pmspdcsLoadTable()
);
}
}
pmspdcsPaging(val)
{
debugger;
this.pmspdcssource.setPaging(1, val, true);
}

handlepmspdcsGridSelected(event:any) {
this.pmspdcsselectedindex=this.pmspropertyservice.pmspdcs.findIndex(i => i.pdcid === event.data.pdcid);
}
IspmspdcsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspdcsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspdcs
//start of Grid Codes pmsleases
pmsleasessettings:any;
pmsleasessource: any;

showpmsleasesCheckbox()
{
debugger;
if(this.tblpmsleasessource.settings['selectMode']== 'multi')this.tblpmsleasessource.settings['selectMode']= 'single';
else
this.tblpmsleasessource.settings['selectMode']= 'multi';
this.tblpmsleasessource.initGrid();
}
deletepmsleasesAll()
{
this.tblpmsleasessource.settings['selectMode'] = 'single';
}
showpmsleasesFilter()
{
  setTimeout(() => {
  this.SetpmsleasesTableddConfig();
  });
      if(this.tblpmsleasessource.settings!=null)this.tblpmsleasessource.settings['hideSubHeader'] =!this.tblpmsleasessource.settings['hideSubHeader'];
this.tblpmsleasessource.initGrid();
}
showpmsleasesInActive()
{
}
enablepmsleasesInActive()
{
}
async SetpmsleasesTableddConfig()
{
if(!this.bfilterPopulatepmsleases){

this.pmstenantservice.getpmstenantsList().then(res=>
{
var datatenantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasestenantid3.push(defaultobj);
for(let i=0; i<datatenantid2.length; i++){
var obj= { value: datatenantid2[i].tenantid, title:datatenantid2[i].lastname};
this.datapmsleasestenantid3.push(obj);
}
if((this.tblpmsleasessource.settings as any).columns['tenantid'])
{
(this.tblpmsleasessource.settings as any).columns['tenantid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsleasestenantid3));
this.tblpmsleasessource.initGrid();
}
});

this.configservice.getList("leasetype").then(res=>
{
var dataleasetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasesleasetype3.push(defaultobj);
for(let i=0; i<dataleasetype2.length; i++){
var obj= { value: dataleasetype2[i].configkey, title: dataleasetype2[i].configtext};
this.datapmsleasesleasetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsleasessource.settings);
if(clone.columns['leasetype']!=undefined)clone.columns['leasetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesleasetype3)), }, };
if(clone.columns['leasetype']!=undefined)clone.columns['leasetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesleasetype3)), }, };
this.tblpmsleasessource.settings =  clone;
this.tblpmsleasessource.initGrid();
});

this.configservice.getList("rentcycle").then(res=>
{
var datarentcycle2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsleasesrentcycle3.push(defaultobj);
for(let i=0; i<datarentcycle2.length; i++){
var obj= { value: datarentcycle2[i].configkey, title: datarentcycle2[i].configtext};
this.datapmsleasesrentcycle3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsleasessource.settings);
if(clone.columns['rentcycle']!=undefined)clone.columns['rentcycle'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesrentcycle3)), }, };
if(clone.columns['rentcycle']!=undefined)clone.columns['rentcycle'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsleasesrentcycle3)), }, };
this.tblpmsleasessource.settings =  clone;
this.tblpmsleasessource.initGrid();
});
}
this.bfilterPopulatepmsleases=true;
}
async pmsleasesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsleasesTableConfig()
{
this.pmsleasessettings = {
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
tenantid: {
title: 'Tenant',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e5jd2',reportcode:'e5jd2',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasestenantid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
leasetype: {
title: 'Lease Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasesleasetype3.find(c=>c.value==cell);
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
rentcycle: {
title: 'Rent Cycle',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsleasesrentcycle3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rentamount: {
title: 'Rent Amount',
type: 'number',
filter:true,
},
nextduedate: {
title: 'Next Due Date',
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
pmsleasesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsleasesID)>=0)
{
this.pmsleasessource=new LocalDataSource();
this.pmsleasessource.load(this.pmspropertyservice.pmsleases as  any as LocalDataSource);
this.pmsleasessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsleasesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmsleases.length == 0)
{
    this.tblpmsleasessource.grid.createFormShown = true;
}
else
{
    let obj = new pmslease();
    this.pmspropertyservice.pmsleases.push(obj);
    this.pmsleasessource.refresh();
    if ((this.pmspropertyservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1 != this.pmsleasessource.getPaging().page)
    {
        this.pmsleasessource.setPage((this.pmspropertyservice.pmsleases.length / this.pmsleasessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsleasessource.grid.edit(this.tblpmsleasessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsleasessource.data.indexOf(event.data);
this.onDeletepmslease(event,event.data.leaseid,((this.pmsleasessource.getPaging().page-1) *this.pmsleasessource.getPaging().perPage)+index);
this.pmsleasessource.refresh();
break;
}
}

*/
pmsleasesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmslease(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmslease(event,event.data.leaseid,this.formid);
break;
case 'delete':
this.onDeletepmslease(event,event.data.leaseid,((this.pmsleasessource.getPaging().page-1) *this.pmsleasessource.getPaging().perPage)+event.index);
this.pmsleasessource.refresh();
break;
}
}
pmsleasesonDelete(obj) {
let leaseid=obj.data.leaseid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(leaseid).then(res=>
this.pmsleasesLoadTable()
);
}
}
pmsleasesPaging(val)
{
debugger;
this.pmsleasessource.setPaging(1, val, true);
}

handlepmsleasesGridSelected(event:any) {
this.pmsleasesselectedindex=this.pmspropertyservice.pmsleases.findIndex(i => i.leaseid === event.data.leaseid);
}
IspmsleasesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsleasesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsleases
//start of Grid Codes pmsworkorders
pmsworkorderssettings:any;
pmsworkorderssource: any;

showpmsworkordersCheckbox()
{
debugger;
if(this.tblpmsworkorderssource.settings['selectMode']== 'multi')this.tblpmsworkorderssource.settings['selectMode']= 'single';
else
this.tblpmsworkorderssource.settings['selectMode']= 'multi';
this.tblpmsworkorderssource.initGrid();
}
deletepmsworkordersAll()
{
this.tblpmsworkorderssource.settings['selectMode'] = 'single';
}
showpmsworkordersFilter()
{
  setTimeout(() => {
  this.SetpmsworkordersTableddConfig();
  });
      if(this.tblpmsworkorderssource.settings!=null)this.tblpmsworkorderssource.settings['hideSubHeader'] =!this.tblpmsworkorderssource.settings['hideSubHeader'];
this.tblpmsworkorderssource.initGrid();
}
showpmsworkordersInActive()
{
}
enablepmsworkordersInActive()
{
}
async SetpmsworkordersTableddConfig()
{
if(!this.bfilterPopulatepmsworkorders){

this.configservice.getList("workordertype").then(res=>
{
var dataworkordertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersworkordertype3.push(defaultobj);
for(let i=0; i<dataworkordertype2.length; i++){
var obj= { value: dataworkordertype2[i].configkey, title: dataworkordertype2[i].configtext};
this.datapmsworkordersworkordertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkordertype3)), }, };
if(clone.columns['workordertype']!=undefined)clone.columns['workordertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkordertype3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});

this.configservice.getList("workorderfrequency").then(res=>
{
var dataworkorderfrequency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersworkorderfrequency3.push(defaultobj);
for(let i=0; i<dataworkorderfrequency2.length; i++){
var obj= { value: dataworkorderfrequency2[i].configkey, title: dataworkorderfrequency2[i].configtext};
this.datapmsworkordersworkorderfrequency3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkorderfrequency3)), }, };
if(clone.columns['workorderfrequency']!=undefined)clone.columns['workorderfrequency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersworkorderfrequency3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataresponsibleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersresponsibleid3.push(defaultobj);
for(let i=0; i<dataresponsibleid2.length; i++){
var obj= { value: dataresponsibleid2[i].employeeid, title:dataresponsibleid2[i].employeename};
this.datapmsworkordersresponsibleid3.push(obj);
}
if((this.tblpmsworkorderssource.settings as any).columns['responsibleid'])
{
(this.tblpmsworkorderssource.settings as any).columns['responsibleid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmsworkordersresponsibleid3));
this.tblpmsworkorderssource.initGrid();
}
});

this.configservice.getList("visittype").then(res=>
{
var datavisittype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmsworkordersvisittype3.push(defaultobj);
for(let i=0; i<datavisittype2.length; i++){
var obj= { value: datavisittype2[i].configkey, title: datavisittype2[i].configtext};
this.datapmsworkordersvisittype3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmsworkorderssource.settings);
if(clone.columns['visittype']!=undefined)clone.columns['visittype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersvisittype3)), }, };
if(clone.columns['visittype']!=undefined)clone.columns['visittype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmsworkordersvisittype3)), }, };
this.tblpmsworkorderssource.settings =  clone;
this.tblpmsworkorderssource.initGrid();
});
}
this.bfilterPopulatepmsworkorders=true;
}
async pmsworkordersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsworkordersTableConfig()
{
this.pmsworkorderssettings = {
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
tenantid: {
title: 'Tenant',
type: 'number',
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
workordertype: {
title: 'Work Order Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersworkordertype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
workorderfrequency: {
title: 'Work Order Frequency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datapmsworkordersworkorderfrequency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
pmsworkordersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkordersID)>=0)
{
this.pmsworkorderssource=new LocalDataSource();
this.pmsworkorderssource.load(this.pmspropertyservice.pmsworkorders as  any as LocalDataSource);
this.pmsworkorderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsworkordersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmsworkorders.length == 0)
{
    this.tblpmsworkorderssource.grid.createFormShown = true;
}
else
{
    let obj = new pmsworkorder();
    this.pmspropertyservice.pmsworkorders.push(obj);
    this.pmsworkorderssource.refresh();
    if ((this.pmspropertyservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1 != this.pmsworkorderssource.getPaging().page)
    {
        this.pmsworkorderssource.setPage((this.pmspropertyservice.pmsworkorders.length / this.pmsworkorderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsworkorderssource.grid.edit(this.tblpmsworkorderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsworkorderssource.data.indexOf(event.data);
this.onDeletepmsworkorder(event,event.data.workorderid,((this.pmsworkorderssource.getPaging().page-1) *this.pmsworkorderssource.getPaging().perPage)+index);
this.pmsworkorderssource.refresh();
break;
}
}

*/
pmsworkordersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsworkorder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsworkorder(event,event.data.workorderid,this.formid);
break;
case 'delete':
this.onDeletepmsworkorder(event,event.data.workorderid,((this.pmsworkorderssource.getPaging().page-1) *this.pmsworkorderssource.getPaging().perPage)+event.index);
this.pmsworkorderssource.refresh();
break;
}
}
pmsworkordersonDelete(obj) {
let workorderid=obj.data.workorderid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(workorderid).then(res=>
this.pmsworkordersLoadTable()
);
}
}
pmsworkordersPaging(val)
{
debugger;
this.pmsworkorderssource.setPaging(1, val, true);
}

handlepmsworkordersGridSelected(event:any) {
this.pmsworkordersselectedindex=this.pmspropertyservice.pmsworkorders.findIndex(i => i.workorderid === event.data.workorderid);
}
IspmsworkordersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsworkordersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsworkorders
//start of Grid Codes pmspropertyapplicants
pmspropertyapplicantssettings:any;
pmspropertyapplicantssource: any;

showpmspropertyapplicantsCheckbox()
{
debugger;
if(this.tblpmspropertyapplicantssource.settings['selectMode']== 'multi')this.tblpmspropertyapplicantssource.settings['selectMode']= 'single';
else
this.tblpmspropertyapplicantssource.settings['selectMode']= 'multi';
this.tblpmspropertyapplicantssource.initGrid();
}
deletepmspropertyapplicantsAll()
{
this.tblpmspropertyapplicantssource.settings['selectMode'] = 'single';
}
showpmspropertyapplicantsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyapplicantsTableddConfig();
  });
      if(this.tblpmspropertyapplicantssource.settings!=null)this.tblpmspropertyapplicantssource.settings['hideSubHeader'] =!this.tblpmspropertyapplicantssource.settings['hideSubHeader'];
this.tblpmspropertyapplicantssource.initGrid();
}
showpmspropertyapplicantsInActive()
{
}
enablepmspropertyapplicantsInActive()
{
}
async SetpmspropertyapplicantsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyapplicants){
}
this.bfilterPopulatepmspropertyapplicants=true;
}
async pmspropertyapplicantsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyapplicantsTableConfig()
{
this.pmspropertyapplicantssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
firstname: {
title: 'First Name',
type: '',
filter:true,
},
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
iscompany: {
title: 'Is Company',
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
companyname: {
title: 'Company Name',
type: '',
filter:true,
},
dateofbirth: {
title: 'Dateof Birth',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
identityno: {
title: 'Identity No',
type: '',
filter:true,
},
gender: {
title: 'Gender',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
phone: {
title: 'Phone',
type: '',
filter:true,
},
license: {
title: 'License',
type: '',
filter:true,
},
occupants: {
title: 'Occupants',
type: '',
filter:true,
},
preferredmoveindate: {
title: 'Preferred Move In Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
shortbio: {
title: 'Shortbio',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
vehicledetails: {
title: 'Vehicle Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
petdetails: {
title: 'Pet Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
currentpropertymoveindate: {
title: 'Current Property Move In Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
currentpropertymoveoutdate: {
title: 'Current Property Move Out Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
address: {
title: 'Address',
type: '',
filter:true,
},
landlordfirstname: {
title: 'Land Lord Firstname',
type: '',
filter:true,
},
landlordlastname: {
title: 'Land Lord Lastname',
type: '',
filter:true,
},
landlordemail: {
title: 'Land Lord Email',
type: '',
filter:true,
},
landlordphone: {
title: 'Land Lord Phone',
type: '',
filter:true,
},
employer: {
title: 'Employer',
type: '',
filter:true,
},
position: {
title: 'Position',
type: '',
filter:true,
},
joineddate: {
title: 'Joined Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'Enddate',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
workemail: {
title: 'Workemail',
type: '',
filter:true,
},
workphone: {
title: 'Workphone',
type: '',
filter:true,
},
officephone: {
title: 'Office Phone',
type: '',
filter:true,
},
officeaddress: {
title: 'Office Address',
type: '',
filter:true,
},
monthlyincome: {
title: 'Monthlyincome',
type: 'number',
filter:true,
},
supervisorfirstname: {
title: 'Supervisor Firstname',
type: '',
filter:true,
},
supervisorlastname: {
title: 'Supervisor Lastname',
type: '',
filter:true,
},
supervisoremail: {
title: 'Supervisor Email',
type: '',
filter:true,
},
supervisorphone: {
title: 'Supervisor Phone',
type: '',
filter:true,
},
additionalincome: {
title: 'Additional Income',
type: 'number',
filter:true,
},
ecfirstname: {
title: 'E C Firstname',
type: '',
filter:true,
},
eclastname: {
title: 'E C Lastname',
type: '',
filter:true,
},
ecemail: {
title: 'E C Email',
type: '',
filter:true,
},
ecphone: {
title: 'E C Phone',
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
referencefirstname: {
title: 'Reference Firstname',
type: '',
filter:true,
},
referencelastname: {
title: 'Reference Lastname',
type: '',
filter:true,
},
referenceemail: {
title: 'Reference Email',
type: '',
filter:true,
},
referencephone: {
title: 'Reference Phone',
type: '',
filter:true,
},
},
};
}
pmspropertyapplicantsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyapplicantsID)>=0)
{
this.pmspropertyapplicantssource=new LocalDataSource();
this.pmspropertyapplicantssource.load(this.pmspropertyservice.pmspropertyapplicants as  any as LocalDataSource);
this.pmspropertyapplicantssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyapplicantsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyapplicants.length == 0)
{
    this.tblpmspropertyapplicantssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyapplicants();
    this.pmspropertyservice.pmspropertyapplicants.push(obj);
    this.pmspropertyapplicantssource.refresh();
    if ((this.pmspropertyservice.pmspropertyapplicants.length / this.pmspropertyapplicantssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyapplicantssource.getPaging().page)
    {
        this.pmspropertyapplicantssource.setPage((this.pmspropertyservice.pmspropertyapplicants.length / this.pmspropertyapplicantssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyapplicantssource.grid.edit(this.tblpmspropertyapplicantssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyapplicantssource.data.indexOf(event.data);
this.onDeletepmspropertyapplicants(event,event.data.applicantid,((this.pmspropertyapplicantssource.getPaging().page-1) *this.pmspropertyapplicantssource.getPaging().perPage)+index);
this.pmspropertyapplicantssource.refresh();
break;
}
}

*/
pmspropertyapplicantsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyapplicants(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyapplicants(event,event.data.applicantid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyapplicants(event,event.data.applicantid,((this.pmspropertyapplicantssource.getPaging().page-1) *this.pmspropertyapplicantssource.getPaging().perPage)+event.index);
this.pmspropertyapplicantssource.refresh();
break;
}
}
pmspropertyapplicantsonDelete(obj) {
let applicantid=obj.data.applicantid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(applicantid).then(res=>
this.pmspropertyapplicantsLoadTable()
);
}
}
pmspropertyapplicantsPaging(val)
{
debugger;
this.pmspropertyapplicantssource.setPaging(1, val, true);
}

handlepmspropertyapplicantsGridSelected(event:any) {
this.pmspropertyapplicantsselectedindex=this.pmspropertyservice.pmspropertyapplicants.findIndex(i => i.applicantid === event.data.applicantid);
}
IspmspropertyapplicantsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyapplicantsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyapplicants
//start of Grid Codes pmsschedules
pmsschedulessettings:any;
pmsschedulessource: any;

showpmsschedulesCheckbox()
{
debugger;
if(this.tblpmsschedulessource.settings['selectMode']== 'multi')this.tblpmsschedulessource.settings['selectMode']= 'single';
else
this.tblpmsschedulessource.settings['selectMode']= 'multi';
this.tblpmsschedulessource.initGrid();
}
deletepmsschedulesAll()
{
this.tblpmsschedulessource.settings['selectMode'] = 'single';
}
showpmsschedulesFilter()
{
  setTimeout(() => {
  this.SetpmsschedulesTableddConfig();
  });
      if(this.tblpmsschedulessource.settings!=null)this.tblpmsschedulessource.settings['hideSubHeader'] =!this.tblpmsschedulessource.settings['hideSubHeader'];
this.tblpmsschedulessource.initGrid();
}
showpmsschedulesInActive()
{
}
enablepmsschedulesInActive()
{
}
async SetpmsschedulesTableddConfig()
{
if(!this.bfilterPopulatepmsschedules){
}
this.bfilterPopulatepmsschedules=true;
}
async pmsschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsschedulesTableConfig()
{
this.pmsschedulessettings = {
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
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
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
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
workordertype: {
title: 'Work Order Type',
type: '',
filter:true,
},
workorderfrequency: {
title: 'Work Order Frequency',
type: '',
filter:true,
},
recurringstartdate: {
title: 'Recurring Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
noenddate: {
title: 'No End Date',
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
recurringenddate: {
title: 'Recurring End Date',
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
pmsschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsschedulesID)>=0)
{
this.pmsschedulessource=new LocalDataSource();
this.pmsschedulessource.load(this.pmspropertyservice.pmsschedules as  any as LocalDataSource);
this.pmsschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmsschedules.length == 0)
{
    this.tblpmsschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsschedule();
    this.pmspropertyservice.pmsschedules.push(obj);
    this.pmsschedulessource.refresh();
    if ((this.pmspropertyservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmsschedulessource.getPaging().page)
    {
        this.pmsschedulessource.setPage((this.pmspropertyservice.pmsschedules.length / this.pmsschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsschedulessource.grid.edit(this.tblpmsschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsschedulessource.data.indexOf(event.data);
this.onDeletepmsschedule(event,event.data.scheduleid,((this.pmsschedulessource.getPaging().page-1) *this.pmsschedulessource.getPaging().perPage)+index);
this.pmsschedulessource.refresh();
break;
}
}

*/
pmsschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsschedule(event,event.data.scheduleid,this.formid);
break;
case 'delete':
this.onDeletepmsschedule(event,event.data.scheduleid,((this.pmsschedulessource.getPaging().page-1) *this.pmsschedulessource.getPaging().perPage)+event.index);
this.pmsschedulessource.refresh();
break;
}
}
pmsschedulesonDelete(obj) {
let scheduleid=obj.data.scheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(scheduleid).then(res=>
this.pmsschedulesLoadTable()
);
}
}
pmsschedulesPaging(val)
{
debugger;
this.pmsschedulessource.setPaging(1, val, true);
}

handlepmsschedulesGridSelected(event:any) {
this.pmsschedulesselectedindex=this.pmspropertyservice.pmsschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IspmsschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsschedules
//start of Grid Codes pmstransactions
pmstransactionssettings:any;
pmstransactionssource: any;

showpmstransactionsCheckbox()
{
debugger;
if(this.tblpmstransactionssource.settings['selectMode']== 'multi')this.tblpmstransactionssource.settings['selectMode']= 'single';
else
this.tblpmstransactionssource.settings['selectMode']= 'multi';
this.tblpmstransactionssource.initGrid();
}
deletepmstransactionsAll()
{
this.tblpmstransactionssource.settings['selectMode'] = 'single';
}
showpmstransactionsFilter()
{
  setTimeout(() => {
  this.SetpmstransactionsTableddConfig();
  });
      if(this.tblpmstransactionssource.settings!=null)this.tblpmstransactionssource.settings['hideSubHeader'] =!this.tblpmstransactionssource.settings['hideSubHeader'];
this.tblpmstransactionssource.initGrid();
}
showpmstransactionsInActive()
{
}
enablepmstransactionsInActive()
{
}
async SetpmstransactionsTableddConfig()
{
if(!this.bfilterPopulatepmstransactions){
}
this.bfilterPopulatepmstransactions=true;
}
async pmstransactionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmstransactionsTableConfig()
{
this.pmstransactionssettings = {
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
transactiondate: {
title: 'Transaction Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
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
transactionscheduleid: {
title: 'Transaction Schedule',
type: 'number',
filter:true,
},
paymentmethod: {
title: 'Payment Method',
type: '',
filter:true,
},
paymentreference: {
title: 'Payment Reference',
type: '',
filter:true,
},
transactionstatus: {
title: 'Transaction Status',
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
},
};
}
pmstransactionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionsID)>=0)
{
this.pmstransactionssource=new LocalDataSource();
this.pmstransactionssource.load(this.pmspropertyservice.pmstransactions as  any as LocalDataSource);
this.pmstransactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmstransactions.length == 0)
{
    this.tblpmstransactionssource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransaction();
    this.pmspropertyservice.pmstransactions.push(obj);
    this.pmstransactionssource.refresh();
    if ((this.pmspropertyservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionssource.getPaging().page)
    {
        this.pmstransactionssource.setPage((this.pmspropertyservice.pmstransactions.length / this.pmstransactionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmstransactionssource.grid.edit(this.tblpmstransactionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmstransactionssource.data.indexOf(event.data);
this.onDeletepmstransaction(event,event.data.transactionid,((this.pmstransactionssource.getPaging().page-1) *this.pmstransactionssource.getPaging().perPage)+index);
this.pmstransactionssource.refresh();
break;
}
}

*/
pmstransactionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmstransaction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmstransaction(event,event.data.transactionid,this.formid);
break;
case 'delete':
this.onDeletepmstransaction(event,event.data.transactionid,((this.pmstransactionssource.getPaging().page-1) *this.pmstransactionssource.getPaging().perPage)+event.index);
this.pmstransactionssource.refresh();
break;
}
}
pmstransactionsonDelete(obj) {
let transactionid=obj.data.transactionid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(transactionid).then(res=>
this.pmstransactionsLoadTable()
);
}
}
pmstransactionsPaging(val)
{
debugger;
this.pmstransactionssource.setPaging(1, val, true);
}

handlepmstransactionsGridSelected(event:any) {
this.pmstransactionsselectedindex=this.pmspropertyservice.pmstransactions.findIndex(i => i.transactionid === event.data.transactionid);
}
IspmstransactionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmstransactions
//start of Grid Codes pmstransactionschedules
pmstransactionschedulessettings:any;
pmstransactionschedulessource: any;

showpmstransactionschedulesCheckbox()
{
debugger;
if(this.tblpmstransactionschedulessource.settings['selectMode']== 'multi')this.tblpmstransactionschedulessource.settings['selectMode']= 'single';
else
this.tblpmstransactionschedulessource.settings['selectMode']= 'multi';
this.tblpmstransactionschedulessource.initGrid();
}
deletepmstransactionschedulesAll()
{
this.tblpmstransactionschedulessource.settings['selectMode'] = 'single';
}
showpmstransactionschedulesFilter()
{
  setTimeout(() => {
  this.SetpmstransactionschedulesTableddConfig();
  });
      if(this.tblpmstransactionschedulessource.settings!=null)this.tblpmstransactionschedulessource.settings['hideSubHeader'] =!this.tblpmstransactionschedulessource.settings['hideSubHeader'];
this.tblpmstransactionschedulessource.initGrid();
}
showpmstransactionschedulesInActive()
{
}
enablepmstransactionschedulesInActive()
{
}
async SetpmstransactionschedulesTableddConfig()
{
if(!this.bfilterPopulatepmstransactionschedules){
}
this.bfilterPopulatepmstransactionschedules=true;
}
async pmstransactionschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmstransactionschedulesTableConfig()
{
this.pmstransactionschedulessettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
categoryid: {
title: 'Category',
type: 'number',
filter:true,
},
subcategoryid: {
title: 'Subcategory',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
frequency: {
title: 'Frequency',
type: '',
filter:true,
},
firstinvoicedate: {
title: 'First Invoice Date',
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
},
};
}
pmstransactionschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionschedulesID)>=0)
{
this.pmstransactionschedulessource=new LocalDataSource();
this.pmstransactionschedulessource.load(this.pmspropertyservice.pmstransactionschedules as  any as LocalDataSource);
this.pmstransactionschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmstransactionschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmstransactionschedules.length == 0)
{
    this.tblpmstransactionschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new pmstransactionschedule();
    this.pmspropertyservice.pmstransactionschedules.push(obj);
    this.pmstransactionschedulessource.refresh();
    if ((this.pmspropertyservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1 != this.pmstransactionschedulessource.getPaging().page)
    {
        this.pmstransactionschedulessource.setPage((this.pmspropertyservice.pmstransactionschedules.length / this.pmstransactionschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmstransactionschedulessource.grid.edit(this.tblpmstransactionschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmstransactionschedulessource.data.indexOf(event.data);
this.onDeletepmstransactionschedule(event,event.data.transactionscheduleid,((this.pmstransactionschedulessource.getPaging().page-1) *this.pmstransactionschedulessource.getPaging().perPage)+index);
this.pmstransactionschedulessource.refresh();
break;
}
}

*/
pmstransactionschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmstransactionschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmstransactionschedule(event,event.data.transactionscheduleid,this.formid);
break;
case 'delete':
this.onDeletepmstransactionschedule(event,event.data.transactionscheduleid,((this.pmstransactionschedulessource.getPaging().page-1) *this.pmstransactionschedulessource.getPaging().perPage)+event.index);
this.pmstransactionschedulessource.refresh();
break;
}
}
pmstransactionschedulesonDelete(obj) {
let transactionscheduleid=obj.data.transactionscheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(transactionscheduleid).then(res=>
this.pmstransactionschedulesLoadTable()
);
}
}
pmstransactionschedulesPaging(val)
{
debugger;
this.pmstransactionschedulessource.setPaging(1, val, true);
}

handlepmstransactionschedulesGridSelected(event:any) {
this.pmstransactionschedulesselectedindex=this.pmspropertyservice.pmstransactionschedules.findIndex(i => i.transactionscheduleid === event.data.transactionscheduleid);
}
IspmstransactionschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmstransactionschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmstransactionschedules
//start of Grid Codes pmspropertyassets
pmspropertyassetssettings:any;
pmspropertyassetssource: any;

showpmspropertyassetsCheckbox()
{
debugger;
if(this.tblpmspropertyassetssource.settings['selectMode']== 'multi')this.tblpmspropertyassetssource.settings['selectMode']= 'single';
else
this.tblpmspropertyassetssource.settings['selectMode']= 'multi';
this.tblpmspropertyassetssource.initGrid();
}
deletepmspropertyassetsAll()
{
this.tblpmspropertyassetssource.settings['selectMode'] = 'single';
}
showpmspropertyassetsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyassetsTableddConfig();
  });
      if(this.tblpmspropertyassetssource.settings!=null)this.tblpmspropertyassetssource.settings['hideSubHeader'] =!this.tblpmspropertyassetssource.settings['hideSubHeader'];
this.tblpmspropertyassetssource.initGrid();
}
showpmspropertyassetsInActive()
{
}
enablepmspropertyassetsInActive()
{
}
async SetpmspropertyassetsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyassets){
}
this.bfilterPopulatepmspropertyassets=true;
}
async pmspropertyassetsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyassetsTableConfig()
{
this.pmspropertyassetssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
assetid: {
title: 'Asset',
type: 'number',
filter:true,
},
attacheddate: {
title: 'Attached Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
removeddate: {
title: 'Removed Date',
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
pmspropertyassetsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyassetsID)>=0)
{
this.pmspropertyassetssource=new LocalDataSource();
this.pmspropertyassetssource.load(this.pmspropertyservice.pmspropertyassets as  any as LocalDataSource);
this.pmspropertyassetssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyassetsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyassets.length == 0)
{
    this.tblpmspropertyassetssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyasset();
    this.pmspropertyservice.pmspropertyassets.push(obj);
    this.pmspropertyassetssource.refresh();
    if ((this.pmspropertyservice.pmspropertyassets.length / this.pmspropertyassetssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyassetssource.getPaging().page)
    {
        this.pmspropertyassetssource.setPage((this.pmspropertyservice.pmspropertyassets.length / this.pmspropertyassetssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyassetssource.grid.edit(this.tblpmspropertyassetssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyassetssource.data.indexOf(event.data);
this.onDeletepmspropertyasset(event,event.data.propertyassetid,((this.pmspropertyassetssource.getPaging().page-1) *this.pmspropertyassetssource.getPaging().perPage)+index);
this.pmspropertyassetssource.refresh();
break;
}
}

*/
pmspropertyassetsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyasset(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyasset(event,event.data.propertyassetid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyasset(event,event.data.propertyassetid,((this.pmspropertyassetssource.getPaging().page-1) *this.pmspropertyassetssource.getPaging().perPage)+event.index);
this.pmspropertyassetssource.refresh();
break;
}
}
pmspropertyassetsonDelete(obj) {
let propertyassetid=obj.data.propertyassetid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(propertyassetid).then(res=>
this.pmspropertyassetsLoadTable()
);
}
}
pmspropertyassetsPaging(val)
{
debugger;
this.pmspropertyassetssource.setPaging(1, val, true);
}

handlepmspropertyassetsGridSelected(event:any) {
this.pmspropertyassetsselectedindex=this.pmspropertyservice.pmspropertyassets.findIndex(i => i.propertyassetid === event.data.propertyassetid);
}
IspmspropertyassetsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyassetsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyassets
//start of Grid Codes pmspropertyimages
pmspropertyimagessettings:any;
pmspropertyimagessource: any;

showpmspropertyimagesCheckbox()
{
debugger;
if(this.tblpmspropertyimagessource.settings['selectMode']== 'multi')this.tblpmspropertyimagessource.settings['selectMode']= 'single';
else
this.tblpmspropertyimagessource.settings['selectMode']= 'multi';
this.tblpmspropertyimagessource.initGrid();
}
deletepmspropertyimagesAll()
{
this.tblpmspropertyimagessource.settings['selectMode'] = 'single';
}
showpmspropertyimagesFilter()
{
  setTimeout(() => {
  this.SetpmspropertyimagesTableddConfig();
  });
      if(this.tblpmspropertyimagessource.settings!=null)this.tblpmspropertyimagessource.settings['hideSubHeader'] =!this.tblpmspropertyimagessource.settings['hideSubHeader'];
this.tblpmspropertyimagessource.initGrid();
}
showpmspropertyimagesInActive()
{
}
enablepmspropertyimagesInActive()
{
}
async SetpmspropertyimagesTableddConfig()
{
if(!this.bfilterPopulatepmspropertyimages){
}
this.bfilterPopulatepmspropertyimages=true;
}
async pmspropertyimagesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyimagesTableConfig()
{
this.pmspropertyimagessettings = {
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
unitid: {
title: 'Unit',
type: 'number',
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
pmspropertyimagesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyimagesID)>=0)
{
this.pmspropertyimagessource=new LocalDataSource();
this.pmspropertyimagessource.load(this.pmspropertyservice.pmspropertyimages as  any as LocalDataSource);
this.pmspropertyimagessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyimagesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyimages.length == 0)
{
    this.tblpmspropertyimagessource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyimage();
    this.pmspropertyservice.pmspropertyimages.push(obj);
    this.pmspropertyimagessource.refresh();
    if ((this.pmspropertyservice.pmspropertyimages.length / this.pmspropertyimagessource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyimagessource.getPaging().page)
    {
        this.pmspropertyimagessource.setPage((this.pmspropertyservice.pmspropertyimages.length / this.pmspropertyimagessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyimagessource.grid.edit(this.tblpmspropertyimagessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyimagessource.data.indexOf(event.data);
this.onDeletepmspropertyimage(event,event.data.photoid,((this.pmspropertyimagessource.getPaging().page-1) *this.pmspropertyimagessource.getPaging().perPage)+index);
this.pmspropertyimagessource.refresh();
break;
}
}

*/
pmspropertyimagesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyimage(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyimage(event,event.data.photoid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyimage(event,event.data.photoid,((this.pmspropertyimagessource.getPaging().page-1) *this.pmspropertyimagessource.getPaging().perPage)+event.index);
this.pmspropertyimagessource.refresh();
break;
}
}
pmspropertyimagesonDelete(obj) {
let photoid=obj.data.photoid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(photoid).then(res=>
this.pmspropertyimagesLoadTable()
);
}
}
pmspropertyimagesPaging(val)
{
debugger;
this.pmspropertyimagessource.setPaging(1, val, true);
}

handlepmspropertyimagesGridSelected(event:any) {
this.pmspropertyimagesselectedindex=this.pmspropertyservice.pmspropertyimages.findIndex(i => i.photoid === event.data.photoid);
}
IspmspropertyimagesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyimagesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyimages
//start of Grid Codes pmspropertyopexdetails
pmspropertyopexdetailssettings:any;
pmspropertyopexdetailssource: any;

showpmspropertyopexdetailsCheckbox()
{
debugger;
if(this.tblpmspropertyopexdetailssource.settings['selectMode']== 'multi')this.tblpmspropertyopexdetailssource.settings['selectMode']= 'single';
else
this.tblpmspropertyopexdetailssource.settings['selectMode']= 'multi';
this.tblpmspropertyopexdetailssource.initGrid();
}
deletepmspropertyopexdetailsAll()
{
this.tblpmspropertyopexdetailssource.settings['selectMode'] = 'single';
}
showpmspropertyopexdetailsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyopexdetailsTableddConfig();
  });
      if(this.tblpmspropertyopexdetailssource.settings!=null)this.tblpmspropertyopexdetailssource.settings['hideSubHeader'] =!this.tblpmspropertyopexdetailssource.settings['hideSubHeader'];
this.tblpmspropertyopexdetailssource.initGrid();
}
showpmspropertyopexdetailsInActive()
{
}
enablepmspropertyopexdetailsInActive()
{
}
async SetpmspropertyopexdetailsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyopexdetails){
}
this.bfilterPopulatepmspropertyopexdetails=true;
}
async pmspropertyopexdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyopexdetailsTableConfig()
{
this.pmspropertyopexdetailssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
opexname: {
title: 'Opex Name',
type: '',
filter:true,
},
frequencydays: {
title: 'Frequency Days',
type: 'number',
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
},
};
}
pmspropertyopexdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyopexdetailsID)>=0)
{
this.pmspropertyopexdetailssource=new LocalDataSource();
this.pmspropertyopexdetailssource.load(this.pmspropertyservice.pmspropertyopexdetails as  any as LocalDataSource);
this.pmspropertyopexdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyopexdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyopexdetails.length == 0)
{
    this.tblpmspropertyopexdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyopexdetail();
    this.pmspropertyservice.pmspropertyopexdetails.push(obj);
    this.pmspropertyopexdetailssource.refresh();
    if ((this.pmspropertyservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyopexdetailssource.getPaging().page)
    {
        this.pmspropertyopexdetailssource.setPage((this.pmspropertyservice.pmspropertyopexdetails.length / this.pmspropertyopexdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyopexdetailssource.grid.edit(this.tblpmspropertyopexdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyopexdetailssource.data.indexOf(event.data);
this.onDeletepmspropertyopexdetail(event,event.data.opexid,((this.pmspropertyopexdetailssource.getPaging().page-1) *this.pmspropertyopexdetailssource.getPaging().perPage)+index);
this.pmspropertyopexdetailssource.refresh();
break;
}
}

*/
pmspropertyopexdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyopexdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyopexdetail(event,event.data.opexid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyopexdetail(event,event.data.opexid,((this.pmspropertyopexdetailssource.getPaging().page-1) *this.pmspropertyopexdetailssource.getPaging().perPage)+event.index);
this.pmspropertyopexdetailssource.refresh();
break;
}
}
pmspropertyopexdetailsonDelete(obj) {
let opexid=obj.data.opexid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(opexid).then(res=>
this.pmspropertyopexdetailsLoadTable()
);
}
}
pmspropertyopexdetailsPaging(val)
{
debugger;
this.pmspropertyopexdetailssource.setPaging(1, val, true);
}

handlepmspropertyopexdetailsGridSelected(event:any) {
this.pmspropertyopexdetailsselectedindex=this.pmspropertyservice.pmspropertyopexdetails.findIndex(i => i.opexid === event.data.opexid);
}
IspmspropertyopexdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyopexdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyopexdetails
//start of Grid Codes pmspropertycontacts
pmspropertycontactssettings:any;
pmspropertycontactssource: any;

showpmspropertycontactsCheckbox()
{
debugger;
if(this.tblpmspropertycontactssource.settings['selectMode']== 'multi')this.tblpmspropertycontactssource.settings['selectMode']= 'single';
else
this.tblpmspropertycontactssource.settings['selectMode']= 'multi';
this.tblpmspropertycontactssource.initGrid();
}
deletepmspropertycontactsAll()
{
this.tblpmspropertycontactssource.settings['selectMode'] = 'single';
}
showpmspropertycontactsFilter()
{
  setTimeout(() => {
  this.SetpmspropertycontactsTableddConfig();
  });
      if(this.tblpmspropertycontactssource.settings!=null)this.tblpmspropertycontactssource.settings['hideSubHeader'] =!this.tblpmspropertycontactssource.settings['hideSubHeader'];
this.tblpmspropertycontactssource.initGrid();
}
showpmspropertycontactsInActive()
{
}
enablepmspropertycontactsInActive()
{
}
async SetpmspropertycontactsTableddConfig()
{
if(!this.bfilterPopulatepmspropertycontacts){
}
this.bfilterPopulatepmspropertycontacts=true;
}
async pmspropertycontactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertycontactsTableConfig()
{
this.pmspropertycontactssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
contacttype: {
title: 'Contact Type',
type: '',
filter:true,
},
contactname: {
title: 'Contact Name',
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
pmspropertycontactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertycontactsID)>=0)
{
this.pmspropertycontactssource=new LocalDataSource();
this.pmspropertycontactssource.load(this.pmspropertyservice.pmspropertycontacts as  any as LocalDataSource);
this.pmspropertycontactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertycontactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertycontacts.length == 0)
{
    this.tblpmspropertycontactssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertycontact();
    this.pmspropertyservice.pmspropertycontacts.push(obj);
    this.pmspropertycontactssource.refresh();
    if ((this.pmspropertyservice.pmspropertycontacts.length / this.pmspropertycontactssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertycontactssource.getPaging().page)
    {
        this.pmspropertycontactssource.setPage((this.pmspropertyservice.pmspropertycontacts.length / this.pmspropertycontactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertycontactssource.grid.edit(this.tblpmspropertycontactssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertycontactssource.data.indexOf(event.data);
this.onDeletepmspropertycontact(event,event.data.contactid,((this.pmspropertycontactssource.getPaging().page-1) *this.pmspropertycontactssource.getPaging().perPage)+index);
this.pmspropertycontactssource.refresh();
break;
}
}

*/
pmspropertycontactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertycontact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertycontact(event,event.data.contactid,this.formid);
break;
case 'delete':
this.onDeletepmspropertycontact(event,event.data.contactid,((this.pmspropertycontactssource.getPaging().page-1) *this.pmspropertycontactssource.getPaging().perPage)+event.index);
this.pmspropertycontactssource.refresh();
break;
}
}
pmspropertycontactsonDelete(obj) {
let contactid=obj.data.contactid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(contactid).then(res=>
this.pmspropertycontactsLoadTable()
);
}
}
pmspropertycontactsPaging(val)
{
debugger;
this.pmspropertycontactssource.setPaging(1, val, true);
}

handlepmspropertycontactsGridSelected(event:any) {
this.pmspropertycontactsselectedindex=this.pmspropertyservice.pmspropertycontacts.findIndex(i => i.contactid === event.data.contactid);
}
IspmspropertycontactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertycontactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertycontacts
//start of Grid Codes pmspropertydocuments
pmspropertydocumentssettings:any;
pmspropertydocumentssource: any;

showpmspropertydocumentsCheckbox()
{
debugger;
if(this.tblpmspropertydocumentssource.settings['selectMode']== 'multi')this.tblpmspropertydocumentssource.settings['selectMode']= 'single';
else
this.tblpmspropertydocumentssource.settings['selectMode']= 'multi';
this.tblpmspropertydocumentssource.initGrid();
}
deletepmspropertydocumentsAll()
{
this.tblpmspropertydocumentssource.settings['selectMode'] = 'single';
}
showpmspropertydocumentsFilter()
{
  setTimeout(() => {
  this.SetpmspropertydocumentsTableddConfig();
  });
      if(this.tblpmspropertydocumentssource.settings!=null)this.tblpmspropertydocumentssource.settings['hideSubHeader'] =!this.tblpmspropertydocumentssource.settings['hideSubHeader'];
this.tblpmspropertydocumentssource.initGrid();
}
showpmspropertydocumentsInActive()
{
}
enablepmspropertydocumentsInActive()
{
}
async SetpmspropertydocumentsTableddConfig()
{
if(!this.bfilterPopulatepmspropertydocuments){
}
this.bfilterPopulatepmspropertydocuments=true;
}
async pmspropertydocumentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertydocumentsTableConfig()
{
this.pmspropertydocumentssettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
documentname: {
title: 'Document Name',
type: '',
filter:true,
},
createdon: {
title: 'Created On',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expiry: {
title: 'Expiry',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
renewdate: {
title: 'Renew Date',
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
pmspropertydocumentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertydocumentsID)>=0)
{
this.pmspropertydocumentssource=new LocalDataSource();
this.pmspropertydocumentssource.load(this.pmspropertyservice.pmspropertydocuments as  any as LocalDataSource);
this.pmspropertydocumentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertydocumentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertydocuments.length == 0)
{
    this.tblpmspropertydocumentssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertydocument();
    this.pmspropertyservice.pmspropertydocuments.push(obj);
    this.pmspropertydocumentssource.refresh();
    if ((this.pmspropertyservice.pmspropertydocuments.length / this.pmspropertydocumentssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertydocumentssource.getPaging().page)
    {
        this.pmspropertydocumentssource.setPage((this.pmspropertyservice.pmspropertydocuments.length / this.pmspropertydocumentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertydocumentssource.grid.edit(this.tblpmspropertydocumentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertydocumentssource.data.indexOf(event.data);
this.onDeletepmspropertydocument(event,event.data.documentid,((this.pmspropertydocumentssource.getPaging().page-1) *this.pmspropertydocumentssource.getPaging().perPage)+index);
this.pmspropertydocumentssource.refresh();
break;
}
}

*/
pmspropertydocumentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertydocument(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertydocument(event,event.data.documentid,this.formid);
break;
case 'delete':
this.onDeletepmspropertydocument(event,event.data.documentid,((this.pmspropertydocumentssource.getPaging().page-1) *this.pmspropertydocumentssource.getPaging().perPage)+event.index);
this.pmspropertydocumentssource.refresh();
break;
}
}
pmspropertydocumentsonDelete(obj) {
let documentid=obj.data.documentid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(documentid).then(res=>
this.pmspropertydocumentsLoadTable()
);
}
}
pmspropertydocumentsPaging(val)
{
debugger;
this.pmspropertydocumentssource.setPaging(1, val, true);
}

handlepmspropertydocumentsGridSelected(event:any) {
this.pmspropertydocumentsselectedindex=this.pmspropertyservice.pmspropertydocuments.findIndex(i => i.documentid === event.data.documentid);
}
IspmspropertydocumentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertydocumentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertydocuments
//start of Grid Codes pmsunitcharges
pmsunitchargessettings:any;
pmsunitchargessource: any;

showpmsunitchargesCheckbox()
{
debugger;
if(this.tblpmsunitchargessource.settings['selectMode']== 'multi')this.tblpmsunitchargessource.settings['selectMode']= 'single';
else
this.tblpmsunitchargessource.settings['selectMode']= 'multi';
this.tblpmsunitchargessource.initGrid();
}
deletepmsunitchargesAll()
{
this.tblpmsunitchargessource.settings['selectMode'] = 'single';
}
showpmsunitchargesFilter()
{
  setTimeout(() => {
  this.SetpmsunitchargesTableddConfig();
  });
      if(this.tblpmsunitchargessource.settings!=null)this.tblpmsunitchargessource.settings['hideSubHeader'] =!this.tblpmsunitchargessource.settings['hideSubHeader'];
this.tblpmsunitchargessource.initGrid();
}
showpmsunitchargesInActive()
{
}
enablepmsunitchargesInActive()
{
}
async SetpmsunitchargesTableddConfig()
{
if(!this.bfilterPopulatepmsunitcharges){
}
this.bfilterPopulatepmsunitcharges=true;
}
async pmsunitchargesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmsunitchargesTableConfig()
{
this.pmsunitchargessettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
chargecycle: {
title: 'Charge Cycle',
type: '',
filter:true,
},
chargetype: {
title: 'Charge Type',
type: '',
filter:true,
},
chargeamount: {
title: 'Charge Amount',
type: 'number',
filter:true,
},
validstartdate: {
title: 'Valid Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
validenddate: {
title: 'Valid End Date',
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
},
};
}
pmsunitchargesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsunitchargesID)>=0)
{
this.pmsunitchargessource=new LocalDataSource();
this.pmsunitchargessource.load(this.pmspropertyservice.pmsunitcharges as  any as LocalDataSource);
this.pmsunitchargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmsunitchargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmsunitcharges.length == 0)
{
    this.tblpmsunitchargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmsunitcharges();
    this.pmspropertyservice.pmsunitcharges.push(obj);
    this.pmsunitchargessource.refresh();
    if ((this.pmspropertyservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1 != this.pmsunitchargessource.getPaging().page)
    {
        this.pmsunitchargessource.setPage((this.pmspropertyservice.pmsunitcharges.length / this.pmsunitchargessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmsunitchargessource.grid.edit(this.tblpmsunitchargessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmsunitchargessource.data.indexOf(event.data);
this.onDeletepmsunitcharges(event,event.data.chargeid,((this.pmsunitchargessource.getPaging().page-1) *this.pmsunitchargessource.getPaging().perPage)+index);
this.pmsunitchargessource.refresh();
break;
}
}

*/
pmsunitchargesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmsunitcharges(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmsunitcharges(event,event.data.chargeid,this.formid);
break;
case 'delete':
this.onDeletepmsunitcharges(event,event.data.chargeid,((this.pmsunitchargessource.getPaging().page-1) *this.pmsunitchargessource.getPaging().perPage)+event.index);
this.pmsunitchargessource.refresh();
break;
}
}
pmsunitchargesonDelete(obj) {
let chargeid=obj.data.chargeid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(chargeid).then(res=>
this.pmsunitchargesLoadTable()
);
}
}
pmsunitchargesPaging(val)
{
debugger;
this.pmsunitchargessource.setPaging(1, val, true);
}

handlepmsunitchargesGridSelected(event:any) {
this.pmsunitchargesselectedindex=this.pmspropertyservice.pmsunitcharges.findIndex(i => i.chargeid === event.data.chargeid);
}
IspmsunitchargesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmsunitchargesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmsunitcharges
//start of Grid Codes pmspropertyunits
pmspropertyunitssettings:any;
pmspropertyunitssource: any;

showpmspropertyunitsCheckbox()
{
debugger;
if(this.tblpmspropertyunitssource.settings['selectMode']== 'multi')this.tblpmspropertyunitssource.settings['selectMode']= 'single';
else
this.tblpmspropertyunitssource.settings['selectMode']= 'multi';
this.tblpmspropertyunitssource.initGrid();
}
deletepmspropertyunitsAll()
{
this.tblpmspropertyunitssource.settings['selectMode'] = 'single';
}
showpmspropertyunitsFilter()
{
  setTimeout(() => {
  this.SetpmspropertyunitsTableddConfig();
  });
      if(this.tblpmspropertyunitssource.settings!=null)this.tblpmspropertyunitssource.settings['hideSubHeader'] =!this.tblpmspropertyunitssource.settings['hideSubHeader'];
this.tblpmspropertyunitssource.initGrid();
}
showpmspropertyunitsInActive()
{
}
enablepmspropertyunitsInActive()
{
}
async SetpmspropertyunitsTableddConfig()
{
if(!this.bfilterPopulatepmspropertyunits){
}
this.bfilterPopulatepmspropertyunits=true;
}
async pmspropertyunitsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyunitsTableConfig()
{
this.pmspropertyunitssettings = {
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
unitno: {
title: 'Unit No',
type: '',
filter:true,
},
unittype: {
title: 'Unit Type',
type: '',
filter:true,
},
address1: {
title: 'Address1',
type: '',
filter:true,
},
sqft: {
title: 'Sqft',
type: 'number',
filter:true,
},
sizedetails: {
title: 'Size Details',
type: '',
filter:true,
},
rent: {
title: 'Rent',
type: 'number',
filter:true,
},
},
};
}
pmspropertyunitsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitsID)>=0)
{
this.pmspropertyunitssource=new LocalDataSource();
this.pmspropertyunitssource.load(this.pmspropertyservice.pmspropertyunits as  any as LocalDataSource);
this.pmspropertyunitssource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyunitsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyunits.length == 0)
{
    this.tblpmspropertyunitssource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyunit();
    this.pmspropertyservice.pmspropertyunits.push(obj);
    this.pmspropertyunitssource.refresh();
    if ((this.pmspropertyservice.pmspropertyunits.length / this.pmspropertyunitssource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyunitssource.getPaging().page)
    {
        this.pmspropertyunitssource.setPage((this.pmspropertyservice.pmspropertyunits.length / this.pmspropertyunitssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyunitssource.grid.edit(this.tblpmspropertyunitssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyunitssource.data.indexOf(event.data);
this.onDeletepmspropertyunit(event,event.data.unitid,((this.pmspropertyunitssource.getPaging().page-1) *this.pmspropertyunitssource.getPaging().perPage)+index);
this.pmspropertyunitssource.refresh();
break;
}
}

*/
pmspropertyunitsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyunit(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyunit(event,event.data.unitid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyunit(event,event.data.unitid,((this.pmspropertyunitssource.getPaging().page-1) *this.pmspropertyunitssource.getPaging().perPage)+event.index);
this.pmspropertyunitssource.refresh();
break;
}
}
pmspropertyunitsonDelete(obj) {
let unitid=obj.data.unitid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(unitid).then(res=>
this.pmspropertyunitsLoadTable()
);
}
}
pmspropertyunitsPaging(val)
{
debugger;
this.pmspropertyunitssource.setPaging(1, val, true);
}

handlepmspropertyunitsGridSelected(event:any) {
this.pmspropertyunitsselectedindex=this.pmspropertyservice.pmspropertyunits.findIndex(i => i.unitid === event.data.unitid);
}
IspmspropertyunitsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyunitsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyunits
//start of Grid Codes pmscharges
pmschargessettings:any;
pmschargessource: any;

showpmschargesCheckbox()
{
debugger;
if(this.tblpmschargessource.settings['selectMode']== 'multi')this.tblpmschargessource.settings['selectMode']= 'single';
else
this.tblpmschargessource.settings['selectMode']= 'multi';
this.tblpmschargessource.initGrid();
}
deletepmschargesAll()
{
this.tblpmschargessource.settings['selectMode'] = 'single';
}
showpmschargesFilter()
{
  setTimeout(() => {
  this.SetpmschargesTableddConfig();
  });
      if(this.tblpmschargessource.settings!=null)this.tblpmschargessource.settings['hideSubHeader'] =!this.tblpmschargessource.settings['hideSubHeader'];
this.tblpmschargessource.initGrid();
}
showpmschargesInActive()
{
}
enablepmschargesInActive()
{
}
async SetpmschargesTableddConfig()
{
if(!this.bfilterPopulatepmscharges){
}
this.bfilterPopulatepmscharges=true;
}
async pmschargesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmschargesTableConfig()
{
this.pmschargessettings = {
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
leaseid: {
title: 'Lease',
type: 'number',
filter:true,
},
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:true,
},
ownerid: {
title: 'Owner',
type: 'number',
filter:true,
},
datecharged: {
title: 'Date Charged',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
chargecycle: {
title: 'Charge Cycle',
type: '',
filter:true,
},
chargetype: {
title: 'Charge Type',
type: '',
filter:true,
},
consumption: {
title: 'Consumption',
type: 'number',
filter:true,
},
chargeamount: {
title: 'Charge Amount',
type: 'number',
filter:true,
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
paiddate: {
title: 'Paid Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paidamount: {
title: 'Paid Amount',
type: 'number',
filter:true,
},
paidmode: {
title: 'Paid Mode',
type: '',
filter:true,
},
paidreference: {
title: 'Paid Reference',
type: '',
filter:true,
},
nextduedate: {
title: 'Next Due Date',
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
},
};
}
pmschargesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmschargesID)>=0)
{
this.pmschargessource=new LocalDataSource();
this.pmschargessource.load(this.pmspropertyservice.pmscharges as  any as LocalDataSource);
this.pmschargessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmschargesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmscharges.length == 0)
{
    this.tblpmschargessource.grid.createFormShown = true;
}
else
{
    let obj = new pmscharge();
    this.pmspropertyservice.pmscharges.push(obj);
    this.pmschargessource.refresh();
    if ((this.pmspropertyservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1 != this.pmschargessource.getPaging().page)
    {
        this.pmschargessource.setPage((this.pmspropertyservice.pmscharges.length / this.pmschargessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmschargessource.grid.edit(this.tblpmschargessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmschargessource.data.indexOf(event.data);
this.onDeletepmscharge(event,event.data.chargeid,((this.pmschargessource.getPaging().page-1) *this.pmschargessource.getPaging().perPage)+index);
this.pmschargessource.refresh();
break;
}
}

*/
pmschargesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmscharge(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmscharge(event,event.data.chargeid,this.formid);
break;
case 'delete':
this.onDeletepmscharge(event,event.data.chargeid,((this.pmschargessource.getPaging().page-1) *this.pmschargessource.getPaging().perPage)+event.index);
this.pmschargessource.refresh();
break;
}
}
pmschargesonDelete(obj) {
let chargeid=obj.data.chargeid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(chargeid).then(res=>
this.pmschargesLoadTable()
);
}
}
pmschargesPaging(val)
{
debugger;
this.pmschargessource.setPaging(1, val, true);
}

handlepmschargesGridSelected(event:any) {
this.pmschargesselectedindex=this.pmspropertyservice.pmscharges.findIndex(i => i.chargeid === event.data.chargeid);
}
IspmschargesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmschargesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmscharges
//start of Grid Codes pmspropertyinsurances
pmspropertyinsurancessettings:any;
pmspropertyinsurancessource: any;

showpmspropertyinsurancesCheckbox()
{
debugger;
if(this.tblpmspropertyinsurancessource.settings['selectMode']== 'multi')this.tblpmspropertyinsurancessource.settings['selectMode']= 'single';
else
this.tblpmspropertyinsurancessource.settings['selectMode']= 'multi';
this.tblpmspropertyinsurancessource.initGrid();
}
deletepmspropertyinsurancesAll()
{
this.tblpmspropertyinsurancessource.settings['selectMode'] = 'single';
}
showpmspropertyinsurancesFilter()
{
  setTimeout(() => {
  this.SetpmspropertyinsurancesTableddConfig();
  });
      if(this.tblpmspropertyinsurancessource.settings!=null)this.tblpmspropertyinsurancessource.settings['hideSubHeader'] =!this.tblpmspropertyinsurancessource.settings['hideSubHeader'];
this.tblpmspropertyinsurancessource.initGrid();
}
showpmspropertyinsurancesInActive()
{
}
enablepmspropertyinsurancesInActive()
{
}
async SetpmspropertyinsurancesTableddConfig()
{
if(!this.bfilterPopulatepmspropertyinsurances){

this.pmspropertyservice.getpmspropertiesList().then(res=>
{
var datapropertyid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmspropertyinsurancespropertyid3.push(defaultobj);
for(let i=0; i<datapropertyid2.length; i++){
var obj= { value: datapropertyid2[i].propertyid, title:datapropertyid2[i].title};
this.datapmspropertyinsurancespropertyid3.push(obj);
}
if((this.tblpmspropertyinsurancessource.settings as any).columns['propertyid'])
{
(this.tblpmspropertyinsurancessource.settings as any).columns['propertyid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmspropertyinsurancespropertyid3));
this.tblpmspropertyinsurancessource.initGrid();
}
});

this.pmstenantservice.getpmstenantsList().then(res=>
{
var datatenantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmspropertyinsurancestenantid3.push(defaultobj);
for(let i=0; i<datatenantid2.length; i++){
var obj= { value: datatenantid2[i].tenantid, title:datatenantid2[i].lastname};
this.datapmspropertyinsurancestenantid3.push(obj);
}
if((this.tblpmspropertyinsurancessource.settings as any).columns['tenantid'])
{
(this.tblpmspropertyinsurancessource.settings as any).columns['tenantid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmspropertyinsurancestenantid3));
this.tblpmspropertyinsurancessource.initGrid();
}
});
}
this.bfilterPopulatepmspropertyinsurances=true;
}
async pmspropertyinsurancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmspropertyinsurancesTableConfig()
{
this.pmspropertyinsurancessettings = {
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
unitid: {
title: 'Unit',
type: 'number',
filter:true,
},
tenantid: {
title: 'Tenant',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e5jd2',reportcode:'e5jd2',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datapmspropertyinsurancestenantid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
insurancecompany: {
title: 'Insurance Company',
type: '',
filter:true,
},
policyid: {
title: 'Policy',
type: '',
filter:true,
},
referenceno: {
title: 'Reference No',
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
expireddate: {
title: 'Expired Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
coverageamount: {
title: 'Coverage Amount',
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
paymentreference: {
title: 'Payment Reference',
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
pmspropertyinsurancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyinsurancesID)>=0)
{
this.pmspropertyinsurancessource=new LocalDataSource();
this.pmspropertyinsurancessource.load(this.pmspropertyservice.pmspropertyinsurances as  any as LocalDataSource);
this.pmspropertyinsurancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
pmspropertyinsurancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmspropertyservice.pmspropertyinsurances.length == 0)
{
    this.tblpmspropertyinsurancessource.grid.createFormShown = true;
}
else
{
    let obj = new pmspropertyinsurance();
    this.pmspropertyservice.pmspropertyinsurances.push(obj);
    this.pmspropertyinsurancessource.refresh();
    if ((this.pmspropertyservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1 != this.pmspropertyinsurancessource.getPaging().page)
    {
        this.pmspropertyinsurancessource.setPage((this.pmspropertyservice.pmspropertyinsurances.length / this.pmspropertyinsurancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmspropertyinsurancessource.grid.edit(this.tblpmspropertyinsurancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmspropertyinsurancessource.data.indexOf(event.data);
this.onDeletepmspropertyinsurance(event,event.data.insuranceid,((this.pmspropertyinsurancessource.getPaging().page-1) *this.pmspropertyinsurancessource.getPaging().perPage)+index);
this.pmspropertyinsurancessource.refresh();
break;
}
}

*/
pmspropertyinsurancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditpmspropertyinsurance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditpmspropertyinsurance(event,event.data.insuranceid,this.formid);
break;
case 'delete':
this.onDeletepmspropertyinsurance(event,event.data.insuranceid,((this.pmspropertyinsurancessource.getPaging().page-1) *this.pmspropertyinsurancessource.getPaging().perPage)+event.index);
this.pmspropertyinsurancessource.refresh();
break;
}
}
pmspropertyinsurancesonDelete(obj) {
let insuranceid=obj.data.insuranceid;
if (confirm('Are you sure to delete this record ?')) {
this.pmspropertyservice.deletepmsproperty(insuranceid).then(res=>
this.pmspropertyinsurancesLoadTable()
);
}
}
pmspropertyinsurancesPaging(val)
{
debugger;
this.pmspropertyinsurancessource.setPaging(1, val, true);
}

handlepmspropertyinsurancesGridSelected(event:any) {
this.pmspropertyinsurancesselectedindex=this.pmspropertyservice.pmspropertyinsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
}
IspmspropertyinsurancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmspropertyinsurancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmspropertyinsurances

}



