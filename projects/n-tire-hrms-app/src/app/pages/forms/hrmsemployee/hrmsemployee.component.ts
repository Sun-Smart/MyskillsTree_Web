import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { hrmsemployee } from './../../../model/hrmsemployee.model';
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
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { hrmsshiftmaster} from './../../../model/hrmsshiftmaster.model';
import { hrmsshiftmasterService } from './../../../service/hrmsshiftmaster.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { hrmspaschedule } from './../../../model/hrmspaschedule.model';
import { hrmspascheduleComponent } from './../../../pages/forms/hrmspaschedule/hrmspaschedule.component';
//FK services
import { hrmsdependantdetail } from './../../../model/hrmsdependantdetail.model';
import { hrmsdependantdetailComponent } from './../../../pages/forms/hrmsdependantdetail/hrmsdependantdetail.component';
//FK services
import { hrmsemployeeeosdetail } from './../../../model/hrmsemployeeeosdetail.model';
import { hrmsemployeeeosdetailComponent } from './../../../pages/forms/hrmsemployeeeosdetail/hrmsemployeeeosdetail.component';
//FK services
import { hrmseosmaster,IhrmseosmasterResponse } from './../../../model/hrmseosmaster.model';
import { hrmseosmasterComponent } from './../../../pages/forms/hrmseosmaster/hrmseosmaster.component';
import { hrmseosmasterService } from './../../../service/hrmseosmaster.service';
import { hrmsemployeegeneralwaiver } from './../../../model/hrmsemployeegeneralwaiver.model';
import { hrmsemployeegeneralwaiverComponent } from './../../../pages/forms/hrmsemployeegeneralwaiver/hrmsemployeegeneralwaiver.component';
//FK services
import { bofinancialyear,IbofinancialyearResponse } from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bofinancialyear/bofinancialyear.component';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
import { hrmsemployeeinsurance } from './../../../model/hrmsemployeeinsurance.model';
import { hrmsemployeeinsuranceComponent } from './../../../pages/forms/hrmsemployeeinsurance/hrmsemployeeinsurance.component';
//FK services
import { hrmsemployeereporting } from './../../../model/hrmsemployeereporting.model';
import { hrmsemployeereportingComponent } from './../../../pages/forms/hrmsemployeereporting/hrmsemployeereporting.component';
//FK services
import { hrmsemployeesalarymaster } from './../../../model/hrmsemployeesalarymaster.model';
import { hrmsemployeesalarymasterComponent } from './../../../pages/forms/hrmsemployeesalarymaster/hrmsemployeesalarymaster.component';
//FK services
import { hrmsemployeesalarymastershistory } from './../../../model/hrmsemployeesalarymastershistory.model';
import { hrmsemployeesalarymastershistoryComponent } from './../../../pages/forms/hrmsemployeesalarymastershistory/hrmsemployeesalarymastershistory.component';
//FK services
import { hrmsemployeesectionwaiver } from './../../../model/hrmsemployeesectionwaiver.model';
import { hrmsemployeesectionwaiverComponent } from './../../../pages/forms/hrmsemployeesectionwaiver/hrmsemployeesectionwaiver.component';
//FK services
import { hrmsemployeestatutorybenefit } from './../../../model/hrmsemployeestatutorybenefit.model';
import { hrmsemployeestatutorybenefitComponent } from './../../../pages/forms/hrmsemployeestatutorybenefit/hrmsemployeestatutorybenefit.component';
//FK services
import { hrmsstatutorymaster,IhrmsstatutorymasterResponse } from './../../../model/hrmsstatutorymaster.model';
import { hrmsstatutorymasterComponent } from './../../../pages/forms/hrmsstatutorymaster/hrmsstatutorymaster.component';
import { hrmsstatutorymasterService } from './../../../service/hrmsstatutorymaster.service';
import { hrmsemployeetaxcalculation } from './../../../model/hrmsemployeetaxcalculation.model';
import { hrmsemployeetaxcalculationComponent } from './../../../pages/forms/hrmsemployeetaxcalculation/hrmsemployeetaxcalculation.component';
//FK services
import { erptaxmaster,IerptaxmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
import { hrmsemployeetaxdeclaration } from './../../../model/hrmsemployeetaxdeclaration.model';
import { hrmsemployeetaxdeclarationComponent } from './../../../pages/forms/hrmsemployeetaxdeclaration/hrmsemployeetaxdeclaration.component';
//FK services
import { hrmssubordinatedetail } from './../../../model/hrmssubordinatedetail.model';
import { hrmssubordinatedetailComponent } from './../../../pages/forms/hrmssubordinatedetail/hrmssubordinatedetail.component';
//FK services
import { hrmsemployeechecklist } from './../../../model/hrmsemployeechecklist.model';
import { hrmsemployeechecklistComponent } from './../../../pages/forms/hrmsemployeechecklist/hrmsemployeechecklist.component';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { hrmsemployeetransfer } from './../../../model/hrmsemployeetransfer.model';
import { hrmsemployeetransferComponent } from './../../../pages/forms/hrmsemployeetransfer/hrmsemployeetransfer.component';
//FK services
import { hrmsemployeeasset } from './../../../model/hrmsemployeeasset.model';
import { hrmsemployeeassetComponent } from './../../../pages/forms/hrmsemployeeasset/hrmsemployeeasset.component';
//FK services
import { camsassetmaster,IcamsassetmasterResponse } from '../../../../../../n-tire-cams-app/src/app/model/camsassetmaster.model';
import { camsassetmasterComponent } from '../../../../../../n-tire-cams-app/src/app/pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from '../../../../../../n-tire-cams-app/src/app/service/camsassetmaster.service';
import { hrmsemployeecareer } from './../../../model/hrmsemployeecareer.model';
import { hrmsemployeecareerComponent } from './../../../pages/forms/hrmsemployeecareer/hrmsemployeecareer.component';
//FK services
import { hrmsemployeeeducation } from './../../../model/hrmsemployeeeducation.model';
import { hrmsemployeeeducationComponent } from './../../../pages/forms/hrmsemployeeeducation/hrmsemployeeeducation.component';
//FK services
import { hrmsemployeeinfrarequestmaster } from './../../../model/hrmsemployeeinfrarequestmaster.model';
import { hrmsemployeeinfrarequestmasterComponent } from './../../../pages/forms/hrmsemployeeinfrarequestmaster/hrmsemployeeinfrarequestmaster.component';
//FK services
import { hrmsemployerchecklist } from './../../../model/hrmsemployerchecklist.model';
import { hrmsemployerchecklistComponent } from './../../../pages/forms/hrmsemployerchecklist/hrmsemployerchecklist.component';
//FK services
import { hrmsemployeemonthlysalarymaster } from './../../../model/hrmsemployeemonthlysalarymaster.model';
import { hrmsemployeemonthlysalarymasterComponent } from './../../../pages/forms/hrmsemployeemonthlysalarymaster/hrmsemployeemonthlysalarymaster.component';
//FK services
import { hrmsemployeekra } from './../../../model/hrmsemployeekra.model';
import { hrmsemployeekraComponent } from './../../../pages/forms/hrmsemployeekra/hrmsemployeekra.component';
//FK services
import { hrmskpimaster,IhrmskpimasterResponse } from './../../../model/hrmskpimaster.model';
import { hrmskpimasterComponent } from './../../../pages/forms/hrmskpimaster/hrmskpimaster.component';
import { hrmskpimasterService } from './../../../service/hrmskpimaster.service';
import { hrmskramaster,IhrmskramasterResponse } from './../../../model/hrmskramaster.model';
import { hrmskramasterComponent } from './../../../pages/forms/hrmskramaster/hrmskramaster.component';
import { hrmskramasterService } from './../../../service/hrmskramaster.service';
import { hrmsemployeelanguageskill } from './../../../model/hrmsemployeelanguageskill.model';
import { hrmsemployeelanguageskillComponent } from './../../../pages/forms/hrmsemployeelanguageskill/hrmsemployeelanguageskill.component';
//FK services
import { hrmsemployeelettermanagement } from './../../../model/hrmsemployeelettermanagement.model';
import { hrmsemployeelettermanagementComponent } from './../../../pages/forms/hrmsemployeelettermanagement/hrmsemployeelettermanagement.component';
//FK services
import { hrmsemployeemembershipdetail } from './../../../model/hrmsemployeemembershipdetail.model';
import { hrmsemployeemembershipdetailComponent } from './../../../pages/forms/hrmsemployeemembershipdetail/hrmsemployeemembershipdetail.component';
//FK services
import { hrmsemployeememo } from './../../../model/hrmsemployeememo.model';
import { hrmsemployeememoComponent } from './../../../pages/forms/hrmsemployeememo/hrmsemployeememo.component';
//FK services
import { hrmsemployeepresentation } from './../../../model/hrmsemployeepresentation.model';
import { hrmsemployeepresentationComponent } from './../../../pages/forms/hrmsemployeepresentation/hrmsemployeepresentation.component';
//FK services
import { hrmsemployeereward } from './../../../model/hrmsemployeereward.model';
import { hrmsemployeerewardComponent } from './../../../pages/forms/hrmsemployeereward/hrmsemployeereward.component';
//FK services
import { hrmsemployeeskill } from './../../../model/hrmsemployeeskill.model';
import { hrmsemployeeskillComponent } from './../../../pages/forms/hrmsemployeeskill/hrmsemployeeskill.component';
//FK services
import { hrmsemployeestationaryrequest } from './../../../model/hrmsemployeestationaryrequest.model';
import { hrmsemployeestationaryrequestComponent } from './../../../pages/forms/hrmsemployeestationaryrequest/hrmsemployeestationaryrequest.component';
//FK services
import { hrmsemployeetraveldocument } from './../../../model/hrmsemployeetraveldocument.model';
import { hrmsemployeetraveldocumentComponent } from './../../../pages/forms/hrmsemployeetraveldocument/hrmsemployeetraveldocument.component';
//FK services
import { hrmsemployeedocument } from './../../../model/hrmsemployeedocument.model';
import { hrmsemployeedocumentComponent } from './../../../pages/forms/hrmsemployeedocument/hrmsemployeedocument.component';
//FK services
import { hrmsemployeemonthlyattendance } from './../../../model/hrmsemployeemonthlyattendance.model';
import { hrmsemployeemonthlyattendanceListComponent } from './../../../pages/forms/hrmsemployeemonthlyattendance/hrmsemployeemonthlyattendance.component';
//FK services
import { hrmsemployeedependent } from './../../../model/hrmsemployeedependent.model';
import { hrmsemployeedependentComponent } from './../../../pages/forms/hrmsemployeedependent/hrmsemployeedependent.component';
//FK services
import { hrmsemployeenominee } from './../../../model/hrmsemployeenominee.model';
import { hrmsemployeenomineeComponent } from './../../../pages/forms/hrmsemployeenominee/hrmsemployeenominee.component';
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
selector: 'app-hrmsemployee',
templateUrl: './hrmsemployee.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeeComponent implements OnInit {
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
bfilterPopulatehrmsemployees:boolean=false;
datahrmsemployeesbranchid3:any=[];
datahrmsemployeesdepartmentid3:any=[];
datahrmsemployeesdesignationid3:any=[];
datahrmsemployeesroleid3:any=[];
datahrmsemployeesshiftid3:any=[];
datahrmsemployeesgrade3:any=[];
datahrmsemployeescountryofbirth3:any=[];
datahrmsemployeesgender3:any=[];
datahrmsemployeesqualification13:any=[];
datahrmsemployeesqualification23:any=[];
datahrmsemployeesqualification33:any=[];
datahrmsemployeesrecruitmentmode3:any=[];
datahrmsemployeesnationality3:any=[];
datahrmsemployeesreligion3:any=[];
datahrmsemployeesmaritalstatus3:any=[];
datahrmsemployeesbloodgroup3:any=[];
datahrmsemployeesissuingcountry3:any=[];
datahrmsemployeesemploymenttype3:any=[];
datahrmsemployeescategory3:any=[];
datahrmsemployeesrelationship3:any=[];
datahrmsemployeessalarymode3:any=[];
datahrmsemployeestransportmode3:any=[];
datahrmsemployeesdisabilitycategory3:any=[];
datahrmsemployeesdisabilitydegree3:any=[];
datahrmsemployeesuserid3:any=[];
datahrmspaschedulesappraisaluser3:any=[];
datahrmspaschedulesparound3:any=[];
bfilterPopulatehrmspaschedules:boolean=false;
datahrmsdependantdetailsdependantcategory3:any=[];
datahrmsdependantdetailsgender3:any=[];
datahrmsdependantdetailsmaritalstatus3:any=[];
bfilterPopulatehrmsdependantdetails:boolean=false;
datahrmsemployeeeosdetailseosid3:any=[];
bfilterPopulatehrmsemployeeeosdetails:boolean=false;
datahrmsemployeegeneralwaiversdeductionid3:any=[];
datahrmsemployeegeneralwaiversfinancialyear3:any=[];
bfilterPopulatehrmsemployeegeneralwaivers:boolean=false;
bfilterPopulatehrmsemployeeinsurances:boolean=false;
datahrmsemployeereportingsreportingto3:any=[];
datahrmsemployeereportingsroleid3:any=[];
bfilterPopulatehrmsemployeereportings:boolean=false;
datahrmsemployeesalarymasterssalarytype3:any=[];
datahrmsemployeesalarymastersroleid3:any=[];
bfilterPopulatehrmsemployeesalarymasters:boolean=false;
datahrmsemployeesalarymastershistoriesroleid3:any=[];
datahrmsemployeesalarymastershistoriessalarytype3:any=[];
bfilterPopulatehrmsemployeesalarymastershistories:boolean=false;
datahrmsemployeesectionwaiversdeductionid3:any=[];
datahrmsemployeesectionwaiversfinancialyear3:any=[];
bfilterPopulatehrmsemployeesectionwaivers:boolean=false;
datahrmsemployeestatutorybenefitsstatutoryid3:any=[];
bfilterPopulatehrmsemployeestatutorybenefits:boolean=false;
datahrmsemployeetaxcalculationsfinancialyear3:any=[];
datahrmsemployeetaxcalculationstaxid3:any=[];
bfilterPopulatehrmsemployeetaxcalculations:boolean=false;
datahrmsemployeetaxdeclarationsfinancialyear3:any=[];
datahrmsemployeetaxdeclarationsemployeeid3:any=[];
bfilterPopulatehrmsemployeetaxdeclarations:boolean=false;
datahrmssubordinatedetailssubordinateto3:any=[];
datahrmssubordinatedetailsroleid3:any=[];
bfilterPopulatehrmssubordinatedetails:boolean=false;
datahrmsemployeechecklistsreceivedby3:any=[];
datahrmsemployeechecklistsowner3:any=[];
datahrmsemployeechecklistsemployeeid3:any=[];
datahrmsemployeechecklistssubcategoryid3:any=[];
datahrmsemployeechecklistscategoryid3:any=[];
bfilterPopulatehrmsemployeechecklists:boolean=false;
datahrmsemployeetransfersreportingto3:any=[];
datahrmsemployeetransferstransfertype3:any=[];
datahrmsemployeetransfersnewrole3:any=[];
datahrmsemployeetransferscurrentrole3:any=[];
datahrmsemployeetransferscurrentdesignation3:any=[];
datahrmsemployeetransfersnewdesignation3:any=[];
datahrmsemployeetransferstransferreason3:any=[];
bfilterPopulatehrmsemployeetransfers:boolean=false;
datahrmsemployeeassetsemployeeid3:any=[];
datahrmsemployeeassetsassetid3:any=[];
bfilterPopulatehrmsemployeeassets:boolean=false;
datahrmsemployeecareersmappedtoourrole3:any=[];
datahrmsemployeecareersjobfield3:any=[];
bfilterPopulatehrmsemployeecareers:boolean=false;
datahrmsemployeeeducationseducation3:any=[];
datahrmsemployeeeducationsgrade3:any=[];
datahrmsemployeeeducationscompletionstatus3:any=[];
datahrmsemployeeeducationsqualificationmode3:any=[];
bfilterPopulatehrmsemployeeeducations:boolean=false;
datahrmsemployeeinfrarequestmastersreturncondition3:any=[];
datahrmsemployeeinfrarequestmastersassetsubcategory3:any=[];
datahrmsemployeeinfrarequestmastersassetcategory3:any=[];
bfilterPopulatehrmsemployeeinfrarequestmasters:boolean=false;
bfilterPopulatehrmsemployerchecklists:boolean=false;
datahrmsemployeemonthlysalarymasterssalarytype3:any=[];
datahrmsemployeemonthlysalarymastersmonth3:any=[];
bfilterPopulatehrmsemployeemonthlysalarymasters:boolean=false;
datahrmsemployeekraskpiid3:any=[];
datahrmsemployeekraskraid3:any=[];
bfilterPopulatehrmsemployeekras:boolean=false;
datahrmsemployeelanguageskillslanguage3:any=[];
datahrmsemployeelanguageskillsreadinglevel3:any=[];
datahrmsemployeelanguageskillsspeakinglevel3:any=[];
datahrmsemployeelanguageskillswritinglevel3:any=[];
bfilterPopulatehrmsemployeelanguageskills:boolean=false;
datahrmsemployeelettermanagementslettercategory3:any=[];
bfilterPopulatehrmsemployeelettermanagements:boolean=false;
bfilterPopulatehrmsemployeemembershipdetails:boolean=false;
datahrmsemployeememosmemocategory3:any=[];
bfilterPopulatehrmsemployeememos:boolean=false;
datahrmsemployeepresentationscategory3:any=[];
datahrmsemployeepresentationsmode3:any=[];
bfilterPopulatehrmsemployeepresentations:boolean=false;
datahrmsemployeerewardsrewardtype3:any=[];
datahrmsemployeerewardscategory3:any=[];
bfilterPopulatehrmsemployeerewards:boolean=false;
datahrmsemployeeskillsskillcategory3:any=[];
bfilterPopulatehrmsemployeeskills:boolean=false;
datahrmsemployeestationaryrequestssubcategory3:any=[];
datahrmsemployeestationaryrequestscategory3:any=[];
bfilterPopulatehrmsemployeestationaryrequests:boolean=false;
datahrmsemployeetraveldocumentscountry3:any=[];
datahrmsemployeetraveldocumentscategory3:any=[];
bfilterPopulatehrmsemployeetraveldocuments:boolean=false;
datahrmsemployeedocumentscountry3:any=[];
datahrmsemployeedocumentscategory3:any=[];
bfilterPopulatehrmsemployeedocuments:boolean=false;
datahrmsemployeemonthlyattendancesdepartmentid3:any=[];
datahrmsemployeemonthlyattendancesemployeeid3:any=[];
bfilterPopulatehrmsemployeemonthlyattendances:boolean=false;
datahrmsemployeedependentsemployeeid3:any=[];
datahrmsemployeedependentsrelationship3:any=[];
bfilterPopulatehrmsemployeedependents:boolean=false;
datahrmsemployeenomineesemployeeid3:any=[];
datahrmsemployeenomineesbenefittype3:any=[];
datahrmsemployeenomineesnominationendreason3:any=[];
datahrmsemployeenomineesrelationship3:any=[];
bfilterPopulatehrmsemployeenominees:boolean=false;
@ViewChild('tblhrmspaschedulessource',{static:false}) tblhrmspaschedulessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsdependantdetailssource',{static:false}) tblhrmsdependantdetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeeosdetailssource',{static:false}) tblhrmsemployeeeosdetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeegeneralwaiverssource',{static:false}) tblhrmsemployeegeneralwaiverssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeinsurancessource',{static:false}) tblhrmsemployeeinsurancessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeereportingssource',{static:false}) tblhrmsemployeereportingssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeesalarymasterssource',{static:false}) tblhrmsemployeesalarymasterssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeesalarymastershistoriessource',{static:false}) tblhrmsemployeesalarymastershistoriessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeesectionwaiverssource',{static:false}) tblhrmsemployeesectionwaiverssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeestatutorybenefitssource',{static:false}) tblhrmsemployeestatutorybenefitssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeetaxcalculationssource',{static:false}) tblhrmsemployeetaxcalculationssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeetaxdeclarationssource',{static:false}) tblhrmsemployeetaxdeclarationssource: Ng2SmartTableComponent;
@ViewChild('tblhrmssubordinatedetailssource',{static:false}) tblhrmssubordinatedetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeechecklistssource',{static:false}) tblhrmsemployeechecklistssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeetransferssource',{static:false}) tblhrmsemployeetransferssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeassetssource',{static:false}) tblhrmsemployeeassetssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeecareerssource',{static:false}) tblhrmsemployeecareerssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeeducationssource',{static:false}) tblhrmsemployeeeducationssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeinfrarequestmasterssource',{static:false}) tblhrmsemployeeinfrarequestmasterssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployerchecklistssource',{static:false}) tblhrmsemployerchecklistssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeemonthlysalarymasterssource',{static:false}) tblhrmsemployeemonthlysalarymasterssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeekrassource',{static:false}) tblhrmsemployeekrassource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeelanguageskillssource',{static:false}) tblhrmsemployeelanguageskillssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeelettermanagementssource',{static:false}) tblhrmsemployeelettermanagementssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeemembershipdetailssource',{static:false}) tblhrmsemployeemembershipdetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeememossource',{static:false}) tblhrmsemployeememossource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeepresentationssource',{static:false}) tblhrmsemployeepresentationssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeerewardssource',{static:false}) tblhrmsemployeerewardssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeskillssource',{static:false}) tblhrmsemployeeskillssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeestationaryrequestssource',{static:false}) tblhrmsemployeestationaryrequestssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeetraveldocumentssource',{static:false}) tblhrmsemployeetraveldocumentssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeedocumentssource',{static:false}) tblhrmsemployeedocumentssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeemonthlyattendancessource',{static:false}) tblhrmsemployeemonthlyattendancessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeedependentssource',{static:false}) tblhrmsemployeedependentssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeenomineessource',{static:false}) tblhrmsemployeenomineessource: Ng2SmartTableComponent;
 hrmsemployeeForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
designationidList: boconfigvalue[];
roleidList: bouserrolemaster[];
shiftidList: hrmsshiftmaster[];
gradeList: boconfigvalue[];
countryofbirthList: bocountry[];
countryofbirthoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryofbirth_bocountriesForm: FormGroup;//autocomplete
countryofbirth_bocountriesoptions:any;//autocomplete
countryofbirth_bocountriesformatter:any;//autocomplete
genderList: boconfigvalue[];
qualification1List: boconfigvalue[];
qualification2List: boconfigvalue[];
qualification3List: boconfigvalue[];
recruitmentmodeList: boconfigvalue[];
nationalityList: boconfigvalue[];
religionList: boconfigvalue[];
maritalstatusList: boconfigvalue[];
bloodgroupList: boconfigvalue[];
issuingcountryList: bocountry[];
issuingcountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
issuingcountry_bocountriesForm: FormGroup;//autocomplete
issuingcountry_bocountriesoptions:any;//autocomplete
issuingcountry_bocountriesformatter:any;//autocomplete
employmenttypeList: boconfigvalue[];
categoryList: bomasterdata[];
relationshipList: boconfigvalue[];
salarymodeList: boconfigvalue[];
transportmodeList: boconfigvalue[];
disabilitycategoryList: boconfigvalue[];
disabilitydegreeList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
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
@ViewChild('photo',{static:false}) photo: AttachmentComponent;
@ViewChild('signature',{static:false}) signature: AttachmentComponent;
SESSIONUSERID:any;//current user
hrmsemployeeshowOption:boolean;
hrmspascheduleshowOption:boolean;
hrmsdependantdetailshowOption:boolean;
hrmsemployeeeosdetailshowOption:boolean;
hrmsemployeegeneralwaivershowOption:boolean;
hrmsemployeeinsuranceshowOption:boolean;
hrmsemployeereportingshowOption:boolean;
hrmsemployeesalarymastershowOption:boolean;
hrmsemployeesalarymastershistoryshowOption:boolean;
hrmsemployeesectionwaivershowOption:boolean;
hrmsemployeestatutorybenefitshowOption:boolean;
hrmsemployeetaxcalculationshowOption:boolean;
hrmsemployeetaxdeclarationshowOption:boolean;
hrmssubordinatedetailshowOption:boolean;
hrmsemployeechecklistshowOption:boolean;
hrmsemployeetransfershowOption:boolean;
hrmsemployeeassetshowOption:boolean;
hrmsemployeecareershowOption:boolean;
hrmsemployeeeducationshowOption:boolean;
hrmsemployeeinfrarequestmastershowOption:boolean;
hrmsemployerchecklistshowOption:boolean;
hrmsemployeemonthlysalarymastershowOption:boolean;
hrmsemployeekrashowOption:boolean;
hrmsemployeelanguageskillshowOption:boolean;
hrmsemployeelettermanagementshowOption:boolean;
hrmsemployeemembershipdetailshowOption:boolean;
hrmsemployeememoshowOption:boolean;
hrmsemployeepresentationshowOption:boolean;
hrmsemployeerewardshowOption:boolean;
hrmsemployeeskillshowOption:boolean;
hrmsemployeestationaryrequestshowOption:boolean;
hrmsemployeetraveldocumentshowOption:boolean;
hrmsemployeedocumentshowOption:boolean;
hrmsemployeemonthlyattendanceshowOption:boolean;
hrmsemployeedependentshowOption:boolean;
hrmsemployeenomineeshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmspaschedulesvisiblelist:any;
hrmspascheduleshidelist:any;
hrmsdependantdetailsvisiblelist:any;
hrmsdependantdetailshidelist:any;
hrmsemployeeeosdetailsvisiblelist:any;
hrmsemployeeeosdetailshidelist:any;
hrmsemployeegeneralwaiversvisiblelist:any;
hrmsemployeegeneralwaivershidelist:any;
hrmsemployeeinsurancesvisiblelist:any;
hrmsemployeeinsuranceshidelist:any;
hrmsemployeereportingsvisiblelist:any;
hrmsemployeereportingshidelist:any;
hrmsemployeesalarymastersvisiblelist:any;
hrmsemployeesalarymastershidelist:any;
hrmsemployeesalarymastershistoriesvisiblelist:any;
hrmsemployeesalarymastershistorieshidelist:any;
hrmsemployeesectionwaiversvisiblelist:any;
hrmsemployeesectionwaivershidelist:any;
hrmsemployeestatutorybenefitsvisiblelist:any;
hrmsemployeestatutorybenefitshidelist:any;
hrmsemployeetaxcalculationsvisiblelist:any;
hrmsemployeetaxcalculationshidelist:any;
hrmsemployeetaxdeclarationsvisiblelist:any;
hrmsemployeetaxdeclarationshidelist:any;
hrmssubordinatedetailsvisiblelist:any;
hrmssubordinatedetailshidelist:any;
hrmsemployeechecklistsvisiblelist:any;
hrmsemployeechecklistshidelist:any;
hrmsemployeetransfersvisiblelist:any;
hrmsemployeetransfershidelist:any;
hrmsemployeeassetsvisiblelist:any;
hrmsemployeeassetshidelist:any;
hrmsemployeecareersvisiblelist:any;
hrmsemployeecareershidelist:any;
hrmsemployeeeducationsvisiblelist:any;
hrmsemployeeeducationshidelist:any;
hrmsemployeeinfrarequestmastersvisiblelist:any;
hrmsemployeeinfrarequestmastershidelist:any;
hrmsemployerchecklistsvisiblelist:any;
hrmsemployerchecklistshidelist:any;
hrmsemployeemonthlysalarymastersvisiblelist:any;
hrmsemployeemonthlysalarymastershidelist:any;
hrmsemployeekrasvisiblelist:any;
hrmsemployeekrashidelist:any;
hrmsemployeelanguageskillsvisiblelist:any;
hrmsemployeelanguageskillshidelist:any;
hrmsemployeelettermanagementsvisiblelist:any;
hrmsemployeelettermanagementshidelist:any;
hrmsemployeemembershipdetailsvisiblelist:any;
hrmsemployeemembershipdetailshidelist:any;
hrmsemployeememosvisiblelist:any;
hrmsemployeememoshidelist:any;
hrmsemployeepresentationsvisiblelist:any;
hrmsemployeepresentationshidelist:any;
hrmsemployeerewardsvisiblelist:any;
hrmsemployeerewardshidelist:any;
hrmsemployeeskillsvisiblelist:any;
hrmsemployeeskillshidelist:any;
hrmsemployeestationaryrequestsvisiblelist:any;
hrmsemployeestationaryrequestshidelist:any;
hrmsemployeetraveldocumentsvisiblelist:any;
hrmsemployeetraveldocumentshidelist:any;
hrmsemployeedocumentsvisiblelist:any;
hrmsemployeedocumentshidelist:any;
hrmsemployeemonthlyattendancesvisiblelist:any;
hrmsemployeemonthlyattendanceshidelist:any;
hrmsemployeedependentsvisiblelist:any;
hrmsemployeedependentshidelist:any;
hrmsemployeenomineesvisiblelist:any;
hrmsemployeenomineeshidelist:any;

DeletedhrmspascheduleIDs: string="";
hrmspaschedulesID: string = "1";
hrmspaschedulesselectedindex:any;
DeletedhrmsdependantdetailIDs: string="";
hrmsdependantdetailsID: string = "2";
hrmsdependantdetailsselectedindex:any;
DeletedhrmsemployeeeosdetailIDs: string="";
hrmsemployeeeosdetailsID: string = "3";
hrmsemployeeeosdetailsselectedindex:any;
DeletedhrmsemployeegeneralwaiverIDs: string="";
hrmsemployeegeneralwaiversID: string = "4";
hrmsemployeegeneralwaiversselectedindex:any;
DeletedhrmsemployeeinsuranceIDs: string="";
hrmsemployeeinsurancesID: string = "5";
hrmsemployeeinsurancesselectedindex:any;
DeletedhrmsemployeereportingIDs: string="";
hrmsemployeereportingsID: string = "6";
hrmsemployeereportingsselectedindex:any;
DeletedhrmsemployeesalarymasterIDs: string="";
hrmsemployeesalarymastersID: string = "7";
hrmsemployeesalarymastersselectedindex:any;
DeletedhrmsemployeesalarymastershistoryIDs: string="";
hrmsemployeesalarymastershistoriesID: string = "8";
hrmsemployeesalarymastershistoriesselectedindex:any;
DeletedhrmsemployeesectionwaiverIDs: string="";
hrmsemployeesectionwaiversID: string = "9";
hrmsemployeesectionwaiversselectedindex:any;
DeletedhrmsemployeestatutorybenefitIDs: string="";
hrmsemployeestatutorybenefitsID: string = "10";
hrmsemployeestatutorybenefitsselectedindex:any;
DeletedhrmsemployeetaxcalculationIDs: string="";
hrmsemployeetaxcalculationsID: string = "11";
hrmsemployeetaxcalculationsselectedindex:any;
DeletedhrmsemployeetaxdeclarationIDs: string="";
hrmsemployeetaxdeclarationsID: string = "12";
hrmsemployeetaxdeclarationsselectedindex:any;
DeletedhrmssubordinatedetailIDs: string="";
hrmssubordinatedetailsID: string = "13";
hrmssubordinatedetailsselectedindex:any;
DeletedhrmsemployeechecklistIDs: string="";
hrmsemployeechecklistsID: string = "14";
hrmsemployeechecklistsselectedindex:any;
DeletedhrmsemployeetransferIDs: string="";
hrmsemployeetransfersID: string = "15";
hrmsemployeetransfersselectedindex:any;
DeletedhrmsemployeeassetIDs: string="";
hrmsemployeeassetsID: string = "16";
hrmsemployeeassetsselectedindex:any;
DeletedhrmsemployeecareerIDs: string="";
hrmsemployeecareersID: string = "17";
hrmsemployeecareersselectedindex:any;
DeletedhrmsemployeeeducationIDs: string="";
hrmsemployeeeducationsID: string = "18";
hrmsemployeeeducationsselectedindex:any;
DeletedhrmsemployeeinfrarequestmasterIDs: string="";
hrmsemployeeinfrarequestmastersID: string = "19";
hrmsemployeeinfrarequestmastersselectedindex:any;
DeletedhrmsemployerchecklistIDs: string="";
hrmsemployerchecklistsID: string = "20";
hrmsemployerchecklistsselectedindex:any;
DeletedhrmsemployeemonthlysalarymasterIDs: string="";
hrmsemployeemonthlysalarymastersID: string = "21";
hrmsemployeemonthlysalarymastersselectedindex:any;
DeletedhrmsemployeekraIDs: string="";
hrmsemployeekrasID: string = "22";
hrmsemployeekrasselectedindex:any;
DeletedhrmsemployeelanguageskillIDs: string="";
hrmsemployeelanguageskillsID: string = "23";
hrmsemployeelanguageskillsselectedindex:any;
DeletedhrmsemployeelettermanagementIDs: string="";
hrmsemployeelettermanagementsID: string = "24";
hrmsemployeelettermanagementsselectedindex:any;
DeletedhrmsemployeemembershipdetailIDs: string="";
hrmsemployeemembershipdetailsID: string = "25";
hrmsemployeemembershipdetailsselectedindex:any;
DeletedhrmsemployeememoIDs: string="";
hrmsemployeememosID: string = "26";
hrmsemployeememosselectedindex:any;
DeletedhrmsemployeepresentationIDs: string="";
hrmsemployeepresentationsID: string = "27";
hrmsemployeepresentationsselectedindex:any;
DeletedhrmsemployeerewardIDs: string="";
hrmsemployeerewardsID: string = "28";
hrmsemployeerewardsselectedindex:any;
DeletedhrmsemployeeskillIDs: string="";
hrmsemployeeskillsID: string = "29";
hrmsemployeeskillsselectedindex:any;
DeletedhrmsemployeestationaryrequestIDs: string="";
hrmsemployeestationaryrequestsID: string = "30";
hrmsemployeestationaryrequestsselectedindex:any;
DeletedhrmsemployeetraveldocumentIDs: string="";
hrmsemployeetraveldocumentsID: string = "31";
hrmsemployeetraveldocumentsselectedindex:any;
DeletedhrmsemployeedocumentIDs: string="";
hrmsemployeedocumentsID: string = "32";
hrmsemployeedocumentsselectedindex:any;
DeletedhrmsemployeemonthlyattendanceIDs: string="";
hrmsemployeemonthlyattendancesID: string = "33";
hrmsemployeemonthlyattendancesselectedindex:any;
DeletedhrmsemployeedependentIDs: string="";
hrmsemployeedependentsID: string = "34";
hrmsemployeedependentsselectedindex:any;
DeletedhrmsemployeenomineeIDs: string="";
hrmsemployeenomineesID: string = "35";
hrmsemployeenomineesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsemployeeservice: hrmsemployeeService,
private bousermasterservice: bousermasterService,
private hrmseosmasterservice: hrmseosmasterService,
private bomasterdataservice: bomasterdataService,
private bofinancialyearservice: bofinancialyearService,
private bouserrolemasterservice: bouserrolemasterService,
private hrmsstatutorymasterservice: hrmsstatutorymasterService,
private erptaxmasterservice: erptaxmasterService,
private bosubcategorymasterservice: bosubcategorymasterService,
private camsassetmasterservice: camsassetmasterService,
private hrmskpimasterservice: hrmskpimasterService,
private hrmskramasterservice: hrmskramasterService,
private bocountryservice: bocountryService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private hrmsshiftmasterservice:hrmsshiftmasterService,
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
this.hrmsemployeeForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
employeeid: [null],
applicantref: [null],
code: [null],
employeename: [null],
nickname: [null],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
roleid: [null],
roleiddesc: [null],
dateofjoin: [null],
appointedby: [null],
jobnature: [null],
shiftid: [null],
shiftiddesc: [null],
grade: [null],
gradedesc: [null],
mobile: [null],
personalemail: [null],
residencephone: [null],
spousename: [null],
fathername: [null],
mothername: [null],
dob: [null],
age: [null],
countryofbirth: [null],
countryofbirthdesc: [null],
filenumber: [null],
validfrom: [null],
validto: [null],
glcode: [null],
photo: [null],
thumbnail: [null],
signature: [null],
gender: [null],
genderdesc: [null],
qualification1: [null],
qualification1desc: [null],
qualification2: [null],
qualification2desc: [null],
qualification3: [null],
qualification3desc: [null],
recruitmentmode: [null],
recruitmentmodedesc: [null],
currentlocationtype: [null],
currentaddress: [null],
permanentaddress: [null],
nationality: [null],
nationalitydesc: [null],
religion: [null],
religiondesc: [null],
maritalstatus: [null],
maritalstatusdesc: [null],
bloodgroup: [null],
bloodgroupdesc: [null],
nationalid: [null],
taxnumber: [null],
passportnumber: [null],
placeofissue: [null],
issuingcountry: [null],
issuingcountrydesc: [null],
issuingdate: [null],
expirydate: [null],
drivinglicensenumber: [null],
drivinglicenseexpiration: [null],
employmenttype: [null],
employmenttypedesc: [null],
probationmonths: [null],
confirmationdate: [null],
firstappraisalstartson: [null],
appraisalcyclemonths: [null],
category: [null],
categorydesc: [null],
noticeperiod: [null],
anyillness: [null],
emergencycontactname: [null],
relationship: [null],
relationshipdesc: [null],
contactmobile: [null],
email: [null],
leaveencashmenteligibility: [null],
hraeligibility: [null],
attendanceenabled: [null],
otenabled: [null],
companyaccommodation: [null],
freeticket: [null],
salarymode: [null],
salarymodedesc: [null],
bankname: [null],
accountnumber: [null],
branchname: [null],
address: [null],
bankcode: [null],
transportmode: [null],
transportmodedesc: [null],
transportpickuppoint: [null],
heightcms: [null],
weightkgs: [null],
identificationmark: [null],
disabilitycategory: [null],
disabilitycategorydesc: [null],
disabilitydegree: [null],
disabilitydegreedesc: [null],
disabilityinfo: [null],
medicalassessmentdate: [null],
notes: [null],
badgeno: [null],
cardno: [null],
reference1: [null],
reference2: [null],
familybenefitsallowed: [null],
accomodation: [null],
medicalinsurance: [null],
lifeinsurance: [null],
airticket: [null],
airsector: [null],
airticketcount: [null],
airticketyears: [null],
annualleaveininitialyr: [null],
initialyearscount: [null],
annualleaveafterinitialyr: [null],
pfnumber: [null],
esic: [null],
esicnumber: [null],
pancard: [null],
remarks: [null],
customfield: [null],
attachment: [null],
employeestatus: [null],
employeestatusremarks: [null],
status: [null],
statusdesc: [null],
salarytype: [null],
basic: [null],
userid: [null],
useriddesc: [null],
pan: [null],
castecategory: [null],
subcastecategory: [null],
differentlyabled: [null],
salarydrawnfrom: [null],
});
}

get f() { return this.hrmsemployeeForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeeForm.dirty && this.hrmsemployeeForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.employeeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.employeeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.employeeid && pkDetail) {
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
let hrmsemployeeid = null;

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
this.formid=hrmsemployeeid;
//this.sharedService.alert(hrmsemployeeid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmspaschedulesTableConfig();
  setTimeout(() => {
  this.SethrmspaschedulesTableddConfig();
  });

this.SethrmsdependantdetailsTableConfig();
  setTimeout(() => {
  this.SethrmsdependantdetailsTableddConfig();
  });

this.SethrmsemployeeeosdetailsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeeosdetailsTableddConfig();
  });

this.SethrmsemployeegeneralwaiversTableConfig();
  setTimeout(() => {
  this.SethrmsemployeegeneralwaiversTableddConfig();
  });

this.SethrmsemployeeinsurancesTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeinsurancesTableddConfig();
  });

this.SethrmsemployeereportingsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeereportingsTableddConfig();
  });

this.SethrmsemployeesalarymastersTableConfig();
  setTimeout(() => {
  this.SethrmsemployeesalarymastersTableddConfig();
  });

this.SethrmsemployeesalarymastershistoriesTableConfig();
  setTimeout(() => {
  this.SethrmsemployeesalarymastershistoriesTableddConfig();
  });

this.SethrmsemployeesectionwaiversTableConfig();
  setTimeout(() => {
  this.SethrmsemployeesectionwaiversTableddConfig();
  });

this.SethrmsemployeestatutorybenefitsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeestatutorybenefitsTableddConfig();
  });

this.SethrmsemployeetaxcalculationsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeetaxcalculationsTableddConfig();
  });

this.SethrmsemployeetaxdeclarationsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeetaxdeclarationsTableddConfig();
  });

this.SethrmssubordinatedetailsTableConfig();
  setTimeout(() => {
  this.SethrmssubordinatedetailsTableddConfig();
  });

this.SethrmsemployeechecklistsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeechecklistsTableddConfig();
  });

this.SethrmsemployeetransfersTableConfig();
  setTimeout(() => {
  this.SethrmsemployeetransfersTableddConfig();
  });

this.SethrmsemployeeassetsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeassetsTableddConfig();
  });

this.SethrmsemployeecareersTableConfig();
  setTimeout(() => {
  this.SethrmsemployeecareersTableddConfig();
  });

this.SethrmsemployeeeducationsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeeducationsTableddConfig();
  });

this.SethrmsemployeeinfrarequestmastersTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeinfrarequestmastersTableddConfig();
  });

this.SethrmsemployerchecklistsTableConfig();
  setTimeout(() => {
  this.SethrmsemployerchecklistsTableddConfig();
  });

this.SethrmsemployeemonthlysalarymastersTableConfig();
  setTimeout(() => {
  this.SethrmsemployeemonthlysalarymastersTableddConfig();
  });

this.SethrmsemployeekrasTableConfig();
  setTimeout(() => {
  this.SethrmsemployeekrasTableddConfig();
  });

this.SethrmsemployeelanguageskillsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeelanguageskillsTableddConfig();
  });

this.SethrmsemployeelettermanagementsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeelettermanagementsTableddConfig();
  });

this.SethrmsemployeemembershipdetailsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeemembershipdetailsTableddConfig();
  });

this.SethrmsemployeememosTableConfig();
  setTimeout(() => {
  this.SethrmsemployeememosTableddConfig();
  });

this.SethrmsemployeepresentationsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeepresentationsTableddConfig();
  });

this.SethrmsemployeerewardsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeerewardsTableddConfig();
  });

this.SethrmsemployeeskillsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeskillsTableddConfig();
  });

this.SethrmsemployeestationaryrequestsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeestationaryrequestsTableddConfig();
  });

this.SethrmsemployeetraveldocumentsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeetraveldocumentsTableddConfig();
  });

this.SethrmsemployeedocumentsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeedocumentsTableddConfig();
  });

this.SethrmsemployeemonthlyattendancesTableConfig();
  setTimeout(() => {
  this.SethrmsemployeemonthlyattendancesTableddConfig();
  });

this.SethrmsemployeedependentsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeedependentsTableddConfig();
  });

this.SethrmsemployeenomineesTableConfig();
  setTimeout(() => {
  this.SethrmsemployeenomineesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.hrmsemployeeservice.formData && this.hrmsemployeeservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmsemployeeForm.patchValue({
    branchid: this.hrmsemployeeservice.formData.branchid,
    branchiddesc: this.hrmsemployeeservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmsemployeeForm.get('branchid').value);
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
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("designation").then(res => this.designationidList = res as boconfigvalue[]);
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.hrmsshiftmasterservice.gethrmsshiftmastersList().then(res => 
{
this.shiftidList = res as hrmsshiftmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("grade").then(res => this.gradeList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryofbirthList = res as bocountry[];
if(this.hrmsemployeeservice.formData && this.hrmsemployeeservice.formData.countryofbirth){
this.countryofbirthoptionsEvent.emit(this.countryofbirthList);
this.hrmsemployeeForm.patchValue({
    countryofbirth: this.hrmsemployeeservice.formData.countryofbirth,
    countryofbirthdesc: this.hrmsemployeeservice.formData.countryofbirthdesc,
});
}
{
let arrcountryofbirth = this.countryofbirthList.filter(v => v.countryid == this.hrmsemployeeForm.get('countryofbirth').value);
let objcountryofbirth;
if (arrcountryofbirth.length > 0) objcountryofbirth = arrcountryofbirth[0];
if (objcountryofbirth)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryofbirth_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryofbirthList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryofbirth_bocountriesformatter = (result: any) => result.name;
this.configservice.getList("gender").then(res => this.genderList = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.qualification1List = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.qualification2List = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.qualification3List = res as boconfigvalue[]);
this.configservice.getList("recruitmentmode").then(res => this.recruitmentmodeList = res as boconfigvalue[]);
this.configservice.getList("nationality").then(res => this.nationalityList = res as boconfigvalue[]);
this.configservice.getList("religion").then(res => this.religionList = res as boconfigvalue[]);
this.configservice.getList("marital").then(res => this.maritalstatusList = res as boconfigvalue[]);
this.configservice.getList("bloodgroup").then(res => this.bloodgroupList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.issuingcountryList = res as bocountry[];
if(this.hrmsemployeeservice.formData && this.hrmsemployeeservice.formData.issuingcountry){
this.issuingcountryoptionsEvent.emit(this.issuingcountryList);
this.hrmsemployeeForm.patchValue({
    issuingcountry: this.hrmsemployeeservice.formData.issuingcountry,
    issuingcountrydesc: this.hrmsemployeeservice.formData.issuingcountrydesc,
});
}
{
let arrissuingcountry = this.issuingcountryList.filter(v => v.countryid == this.hrmsemployeeForm.get('issuingcountry').value);
let objissuingcountry;
if (arrissuingcountry.length > 0) objissuingcountry = arrissuingcountry[0];
if (objissuingcountry)
{
}
}
}
).catch((err) => {console.log(err);});
this.issuingcountry_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.issuingcountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.issuingcountry_bocountriesformatter = (result: any) => result.name;
this.configservice.getList("employmenttype").then(res => this.employmenttypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("rcxrk").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("relationship").then(res => this.relationshipList = res as boconfigvalue[]);
this.configservice.getList("salarymode").then(res => this.salarymodeList = res as boconfigvalue[]);
this.configservice.getList("transportmode").then(res => this.transportmodeList = res as boconfigvalue[]);
this.configservice.getList("disabilitycategory").then(res => this.disabilitycategoryList = res as boconfigvalue[]);
this.configservice.getList("qualification").then(res => this.disabilitydegreeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.hrmsemployeeservice.formData && this.hrmsemployeeservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.hrmsemployeeForm.patchValue({
    userid: this.hrmsemployeeservice.formData.userid,
    useriddesc: this.hrmsemployeeservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.hrmsemployeeForm.get('userid').value);
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
    this.hrmsemployeeservice.gethrmsemployeesList().then(res => {
      this.pkList = res as hrmsemployee[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.employeename;

//setting the flag that the screen is not touched 
this.hrmsemployeeForm.markAsUntouched();
this.hrmsemployeeForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmsemployeeForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcountryofbirth(countryofbirthDetail: any) {
if (countryofbirthDetail.countryid && countryofbirthDetail) {
this.hrmsemployeeForm.patchValue({
countryofbirth: countryofbirthDetail.countryid,
countryofbirthdesc: countryofbirthDetail.name,

});

}
}

onSelectedissuingcountry(issuingcountryDetail: any) {
if (issuingcountryDetail.countryid && issuingcountryDetail) {
this.hrmsemployeeForm.patchValue({
issuingcountry: issuingcountryDetail.countryid,
issuingcountrydesc: issuingcountryDetail.name,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.hrmsemployeeForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




  getphoto() {
    debugger;
    if (this.photo.getattachmentlist().length > 0) {
      let file = this.photo.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getsignature() {
    debugger;
    if (this.signature.getattachmentlist().length > 0) {
      let file = this.signature.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.hrmsemployeeForm != null)
this.hrmsemployeeForm.reset();
this.hrmsemployeeForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.hrmsemployeeservice.hrmspaschedules=[];
this.hrmspaschedulesLoadTable();
this.hrmsemployeeservice.hrmsdependantdetails=[];
this.hrmsdependantdetailsLoadTable();
this.hrmsemployeeservice.hrmsemployeeeosdetails=[];
this.hrmsemployeeeosdetailsLoadTable();
this.hrmsemployeeservice.hrmsemployeegeneralwaivers=[];
this.hrmsemployeegeneralwaiversLoadTable();
this.hrmsemployeeservice.hrmsemployeeinsurances=[];
this.hrmsemployeeinsurancesLoadTable();
this.hrmsemployeeservice.hrmsemployeereportings=[];
this.hrmsemployeereportingsLoadTable();
this.hrmsemployeeservice.hrmsemployeesalarymasters=[];
this.hrmsemployeesalarymastersLoadTable();
this.hrmsemployeeservice.hrmsemployeesalarymastershistories=[];
this.hrmsemployeesalarymastershistoriesLoadTable();
this.hrmsemployeeservice.hrmsemployeesectionwaivers=[];
this.hrmsemployeesectionwaiversLoadTable();
this.hrmsemployeeservice.hrmsemployeestatutorybenefits=[];
this.hrmsemployeestatutorybenefitsLoadTable();
this.hrmsemployeeservice.hrmsemployeetaxcalculations=[];
this.hrmsemployeetaxcalculationsLoadTable();
this.hrmsemployeeservice.hrmsemployeetaxdeclarations=[];
this.hrmsemployeetaxdeclarationsLoadTable();
this.hrmsemployeeservice.hrmssubordinatedetails=[];
this.hrmssubordinatedetailsLoadTable();
this.hrmsemployeeservice.hrmsemployeechecklists=[];
this.hrmsemployeechecklistsLoadTable();
this.hrmsemployeeservice.hrmsemployeetransfers=[];
this.hrmsemployeetransfersLoadTable();
this.hrmsemployeeservice.hrmsemployeeassets=[];
this.hrmsemployeeassetsLoadTable();
this.hrmsemployeeservice.hrmsemployeecareers=[];
this.hrmsemployeecareersLoadTable();
this.hrmsemployeeservice.hrmsemployeeeducations=[];
this.hrmsemployeeeducationsLoadTable();
this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters=[];
this.hrmsemployeeinfrarequestmastersLoadTable();
this.hrmsemployeeservice.hrmsemployerchecklists=[];
this.hrmsemployerchecklistsLoadTable();
this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters=[];
this.hrmsemployeemonthlysalarymastersLoadTable();
this.hrmsemployeeservice.hrmsemployeekras=[];
this.hrmsemployeekrasLoadTable();
this.hrmsemployeeservice.hrmsemployeelanguageskills=[];
this.hrmsemployeelanguageskillsLoadTable();
this.hrmsemployeeservice.hrmsemployeelettermanagements=[];
this.hrmsemployeelettermanagementsLoadTable();
this.hrmsemployeeservice.hrmsemployeemembershipdetails=[];
this.hrmsemployeemembershipdetailsLoadTable();
this.hrmsemployeeservice.hrmsemployeememos=[];
this.hrmsemployeememosLoadTable();
this.hrmsemployeeservice.hrmsemployeepresentations=[];
this.hrmsemployeepresentationsLoadTable();
this.hrmsemployeeservice.hrmsemployeerewards=[];
this.hrmsemployeerewardsLoadTable();
this.hrmsemployeeservice.hrmsemployeeskills=[];
this.hrmsemployeeskillsLoadTable();
this.hrmsemployeeservice.hrmsemployeestationaryrequests=[];
this.hrmsemployeestationaryrequestsLoadTable();
this.hrmsemployeeservice.hrmsemployeetraveldocuments=[];
this.hrmsemployeetraveldocumentsLoadTable();
this.hrmsemployeeservice.hrmsemployeedocuments=[];
this.hrmsemployeedocumentsLoadTable();
this.hrmsemployeeservice.hrmsemployeemonthlyattendances=[];
this.hrmsemployeemonthlyattendancesLoadTable();
this.hrmsemployeeservice.hrmsemployeedependents=[];
this.hrmsemployeedependentsLoadTable();
this.hrmsemployeeservice.hrmsemployeenominees=[];
this.hrmsemployeenomineesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let employeeid = this.hrmsemployeeForm.get('employeeid').value;
        if(employeeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeeservice.deletehrmsemployee(employeeid).then(res =>
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
    this.hrmsemployeeForm.patchValue({
        employeeid: null
    });
    if(this.hrmsemployeeservice.formData.employeeid!=null)this.hrmsemployeeservice.formData.employeeid=null;
for (let i=0;i<this.hrmsemployeeservice.hrmspaschedules.length;i++) {
this.hrmsemployeeservice.hrmspaschedules[i].paid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsdependantdetails.length;i++) {
this.hrmsemployeeservice.hrmsdependantdetails[i].dependentid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeeosdetails.length;i++) {
this.hrmsemployeeservice.hrmsemployeeeosdetails[i].employeeeosid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeegeneralwaivers.length;i++) {
this.hrmsemployeeservice.hrmsemployeegeneralwaivers[i].waiverid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeinsurances.length;i++) {
this.hrmsemployeeservice.hrmsemployeeinsurances[i].insuranceid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeereportings.length;i++) {
this.hrmsemployeeservice.hrmsemployeereportings[i].reportingid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeesalarymasters.length;i++) {
this.hrmsemployeeservice.hrmsemployeesalarymasters[i].salarymasterid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeesalarymastershistories.length;i++) {
this.hrmsemployeeservice.hrmsemployeesalarymastershistories[i].salarymasterid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeesectionwaivers.length;i++) {
this.hrmsemployeeservice.hrmsemployeesectionwaivers[i].waiverid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeestatutorybenefits.length;i++) {
this.hrmsemployeeservice.hrmsemployeestatutorybenefits[i].esid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeetaxcalculations.length;i++) {
this.hrmsemployeeservice.hrmsemployeetaxcalculations[i].taxid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeetaxdeclarations.length;i++) {
this.hrmsemployeeservice.hrmsemployeetaxdeclarations[i].declarationid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmssubordinatedetails.length;i++) {
this.hrmsemployeeservice.hrmssubordinatedetails[i].subid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeechecklists.length;i++) {
this.hrmsemployeeservice.hrmsemployeechecklists[i].employeecheckid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeetransfers.length;i++) {
this.hrmsemployeeservice.hrmsemployeetransfers[i].transferid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeassets.length;i++) {
this.hrmsemployeeservice.hrmsemployeeassets[i].employeeassetid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeecareers.length;i++) {
this.hrmsemployeeservice.hrmsemployeecareers[i].hacid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeeducations.length;i++) {
this.hrmsemployeeservice.hrmsemployeeeducations[i].haeid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.length;i++) {
this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters[i].infrarequestid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployerchecklists.length;i++) {
this.hrmsemployeeservice.hrmsemployerchecklists[i].employercheckid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.length;i++) {
this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters[i].salid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeekras.length;i++) {
this.hrmsemployeeservice.hrmsemployeekras[i].empkraid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeelanguageskills.length;i++) {
this.hrmsemployeeservice.hrmsemployeelanguageskills[i].languageid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeelettermanagements.length;i++) {
this.hrmsemployeeservice.hrmsemployeelettermanagements[i].letterid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeemembershipdetails.length;i++) {
this.hrmsemployeeservice.hrmsemployeemembershipdetails[i].membershipid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeememos.length;i++) {
this.hrmsemployeeservice.hrmsemployeememos[i].memoid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeepresentations.length;i++) {
this.hrmsemployeeservice.hrmsemployeepresentations[i].presentationid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeerewards.length;i++) {
this.hrmsemployeeservice.hrmsemployeerewards[i].rewardid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeeskills.length;i++) {
this.hrmsemployeeservice.hrmsemployeeskills[i].skillid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeestationaryrequests.length;i++) {
this.hrmsemployeeservice.hrmsemployeestationaryrequests[i].stationaryrequestid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeetraveldocuments.length;i++) {
this.hrmsemployeeservice.hrmsemployeetraveldocuments[i].traveldocid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeedocuments.length;i++) {
this.hrmsemployeeservice.hrmsemployeedocuments[i].docid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeemonthlyattendances.length;i++) {
this.hrmsemployeeservice.hrmsemployeemonthlyattendances[i].attendanceid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeedependents.length;i++) {
this.hrmsemployeeservice.hrmsemployeedependents[i].dependentid=null;
}
for (let i=0;i<this.hrmsemployeeservice.hrmsemployeenominees.length;i++) {
this.hrmsemployeeservice.hrmsemployeenominees[i].nomineeid=null;
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
        else if(key=="dateofjoin")
this.hrmsemployeeForm.patchValue({"dateofjoin":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="dob")
this.hrmsemployeeForm.patchValue({"dob":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validfrom")
this.hrmsemployeeForm.patchValue({"validfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validto")
this.hrmsemployeeForm.patchValue({"validto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="issuingdate")
this.hrmsemployeeForm.patchValue({"issuingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirydate")
this.hrmsemployeeForm.patchValue({"expirydate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="drivinglicenseexpiration")
this.hrmsemployeeForm.patchValue({"drivinglicenseexpiration":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="confirmationdate")
this.hrmsemployeeForm.patchValue({"confirmationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="firstappraisalstartson")
this.hrmsemployeeForm.patchValue({"firstappraisalstartson":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="medicalassessmentdate")
this.hrmsemployeeForm.patchValue({"medicalassessmentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeeForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeeForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeeForm.controls[key]!=undefined)
{
this.hrmsemployeeForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("hrmsemployees",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.hrmsemployeeservice.formData.employeename!=null )
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
employeeidonChange(evt:any){
let e=evt.value;
}
applicantrefonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
employeenameonChange(evt:any){
let e=evt.value;
}
nicknameonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.hrmsemployeeForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.hrmsemployeeForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
roleidonChange(evt:any){
let e=evt.value;
this.hrmsemployeeForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
dateofjoinonChange(evt:any){
let e=evt.value;
}
appointedbyonChange(evt:any){
let e=evt.value;
}
jobnatureonChange(evt:any){
let e=evt.value;
}
shiftidonChange(evt:any){
let e=evt.value;
this.hrmsemployeeForm.patchValue({shiftiddesc:evt.options[evt.options.selectedIndex].text});
}
gradeonChange(evt:any){
let e=this.f.grade.value as any;
this.hrmsemployeeForm.patchValue({gradedesc:evt.options[evt.options.selectedIndex].text});
}
mobileonChange(evt:any){
let e=evt.value;
}
personalemailonChange(evt:any){
let e=evt.value;
}
residencephoneonChange(evt:any){
let e=evt.value;
}
spousenameonChange(evt:any){
let e=evt.value;
}
fathernameonChange(evt:any){
let e=evt.value;
}
mothernameonChange(evt:any){
let e=evt.value;
}
dobonChange(evt:any){
let e=evt.value;
}
ageonChange(evt:any){
let e=evt.value;
}
countryofbirthonChange(evt:any){
let e=evt.value;
}
filenumberonChange(evt:any){
let e=evt.value;
}
validfromonChange(evt:any){
let e=evt.value;
}
validtoonChange(evt:any){
let e=evt.value;
}
glcodeonChange(evt:any){
let e=evt.value;
}
photoonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
signatureonChange(evt:any){
let e=evt.value;
}
genderonChange(evt:any){
let e=this.f.gender.value as any;
this.hrmsemployeeForm.patchValue({genderdesc:evt.options[evt.options.selectedIndex].text});
}
qualification1onChange(evt:any){
let e=this.f.qualification1.value as any;
this.hrmsemployeeForm.patchValue({qualification1desc:evt.options[evt.options.selectedIndex].text});
}
qualification2onChange(evt:any){
let e=this.f.qualification2.value as any;
this.hrmsemployeeForm.patchValue({qualification2desc:evt.options[evt.options.selectedIndex].text});
}
qualification3onChange(evt:any){
let e=this.f.qualification3.value as any;
this.hrmsemployeeForm.patchValue({qualification3desc:evt.options[evt.options.selectedIndex].text});
}
recruitmentmodeonChange(evt:any){
let e=this.f.recruitmentmode.value as any;
this.hrmsemployeeForm.patchValue({recruitmentmodedesc:evt.options[evt.options.selectedIndex].text});
}
currentlocationtypeonChange(evt:any){
let e=evt.value;
}
currentaddressonChange(evt:any){
let e=evt.value;
}
permanentaddressonChange(evt:any){
let e=evt.value;
}
nationalityonChange(evt:any){
let e=this.f.nationality.value as any;
this.hrmsemployeeForm.patchValue({nationalitydesc:evt.options[evt.options.selectedIndex].text});
}
religiononChange(evt:any){
let e=this.f.religion.value as any;
this.hrmsemployeeForm.patchValue({religiondesc:evt.options[evt.options.selectedIndex].text});
}
maritalstatusonChange(evt:any){
let e=this.f.maritalstatus.value as any;
this.hrmsemployeeForm.patchValue({maritalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
bloodgrouponChange(evt:any){
let e=this.f.bloodgroup.value as any;
this.hrmsemployeeForm.patchValue({bloodgroupdesc:evt.options[evt.options.selectedIndex].text});
}
nationalidonChange(evt:any){
let e=evt.value;
}
taxnumberonChange(evt:any){
let e=evt.value;
}
passportnumberonChange(evt:any){
let e=evt.value;
}
placeofissueonChange(evt:any){
let e=evt.value;
}
issuingcountryonChange(evt:any){
let e=evt.value;
}
issuingdateonChange(evt:any){
let e=evt.value;
}
expirydateonChange(evt:any){
let e=evt.value;
}
drivinglicensenumberonChange(evt:any){
let e=evt.value;
}
drivinglicenseexpirationonChange(evt:any){
let e=evt.value;
}
employmenttypeonChange(evt:any){
let e=this.f.employmenttype.value as any;
this.hrmsemployeeForm.patchValue({employmenttypedesc:evt.options[evt.options.selectedIndex].text});
}
probationmonthsonChange(evt:any){
let e=evt.value;
}
confirmationdateonChange(evt:any){
let e=evt.value;
}
firstappraisalstartsononChange(evt:any){
let e=evt.value;
}
appraisalcyclemonthsonChange(evt:any){
let e=evt.value;
}
categoryonChange(evt:any){
let e=evt.value;
this.hrmsemployeeForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
noticeperiodonChange(evt:any){
let e=evt.value;
}
anyillnessonChange(evt:any){
let e=evt.value;
}
emergencycontactnameonChange(evt:any){
let e=evt.value;
}
relationshiponChange(evt:any){
let e=this.f.relationship.value as any;
this.hrmsemployeeForm.patchValue({relationshipdesc:evt.options[evt.options.selectedIndex].text});
}
contactmobileonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
leaveencashmenteligibilityonChange(evt:any){
let e=evt.value;
}
hraeligibilityonChange(evt:any){
let e=evt.value;
}
attendanceenabledonChange(evt:any){
let e=evt.value;
}
otenabledonChange(evt:any){
let e=evt.value;
}
companyaccommodationonChange(evt:any){
let e=evt.value;
}
freeticketonChange(evt:any){
let e=evt.value;
}
salarymodeonChange(evt:any){
let e=this.f.salarymode.value as any;
this.hrmsemployeeForm.patchValue({salarymodedesc:evt.options[evt.options.selectedIndex].text});
}
banknameonChange(evt:any){
let e=evt.value;
}
accountnumberonChange(evt:any){
let e=evt.value;
}
branchnameonChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
let e=evt.value;
}
bankcodeonChange(evt:any){
let e=evt.value;
}
transportmodeonChange(evt:any){
let e=this.f.transportmode.value as any;
this.hrmsemployeeForm.patchValue({transportmodedesc:evt.options[evt.options.selectedIndex].text});
}
transportpickuppointonChange(evt:any){
let e=evt.value;
}
heightcmsonChange(evt:any){
let e=evt.value;
}
weightkgsonChange(evt:any){
let e=evt.value;
}
identificationmarkonChange(evt:any){
let e=evt.value;
}
disabilitycategoryonChange(evt:any){
let e=this.f.disabilitycategory.value as any;
this.hrmsemployeeForm.patchValue({disabilitycategorydesc:evt.options[evt.options.selectedIndex].text});
}
disabilitydegreeonChange(evt:any){
let e=this.f.disabilitydegree.value as any;
this.hrmsemployeeForm.patchValue({disabilitydegreedesc:evt.options[evt.options.selectedIndex].text});
}
disabilityinfoonChange(evt:any){
let e=evt.value;
}
medicalassessmentdateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
badgenoonChange(evt:any){
let e=evt.value;
}
cardnoonChange(evt:any){
let e=evt.value;
}
reference1onChange(evt:any){
let e=evt.value;
}
reference2onChange(evt:any){
let e=evt.value;
}
familybenefitsallowedonChange(evt:any){
let e=evt.value;
}
accomodationonChange(evt:any){
let e=evt.value;
}
medicalinsuranceonChange(evt:any){
let e=evt.value;
}
lifeinsuranceonChange(evt:any){
let e=evt.value;
}
airticketonChange(evt:any){
let e=evt.value;
}
airsectoronChange(evt:any){
let e=evt.value;
}
airticketcountonChange(evt:any){
let e=evt.value;
}
airticketyearsonChange(evt:any){
let e=evt.value;
}
annualleaveininitialyronChange(evt:any){
let e=evt.value;
}
initialyearscountonChange(evt:any){
let e=evt.value;
}
annualleaveafterinitialyronChange(evt:any){
let e=evt.value;
}
pfnumberonChange(evt:any){
let e=evt.value;
}
esiconChange(evt:any){
let e=evt.value;
}
esicnumberonChange(evt:any){
let e=evt.value;
}
pancardonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
employeestatusonChange(evt:any){
let e=evt.value;
}
employeestatusremarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
salarytypeonChange(evt:any){
let e=evt.value;
}
basiconChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
panonChange(evt:any){
let e=evt.value;
}
castecategoryonChange(evt:any){
let e=evt.value;
}
subcastecategoryonChange(evt:any){
let e=evt.value;
}
differentlyabledonChange(evt:any){
let e=evt.value;
}
salarydrawnfromonChange(evt:any){
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
  


edithrmsemployees() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeeservice.gethrmsemployeesByEID(pkcol).then(res => {

this.hrmsemployeeservice.formData=res.hrmsemployee;
let formproperty=res.hrmsemployee.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployee.pkcol;
this.formid=res.hrmsemployee.employeeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployee.employeeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeeForm.patchValue({
branchid: res.hrmsemployee.branchid,
branchiddesc: res.hrmsemployee.branchiddesc,
employeeid: res.hrmsemployee.employeeid,
applicantref: res.hrmsemployee.applicantref,
code: res.hrmsemployee.code,
employeename: res.hrmsemployee.employeename,
nickname: res.hrmsemployee.nickname,
departmentid: res.hrmsemployee.departmentid,
departmentiddesc: res.hrmsemployee.departmentiddesc,
designationid: res.hrmsemployee.designationid,
designationiddesc: res.hrmsemployee.designationiddesc,
roleid: res.hrmsemployee.roleid,
roleiddesc: res.hrmsemployee.roleiddesc,
dateofjoin: this.ngbDateParserFormatter.parse(res.hrmsemployee.dateofjoin),
appointedby: res.hrmsemployee.appointedby,
jobnature: res.hrmsemployee.jobnature,
shiftid: res.hrmsemployee.shiftid,
shiftiddesc: res.hrmsemployee.shiftiddesc,
grade: res.hrmsemployee.grade,
gradedesc: res.hrmsemployee.gradedesc,
mobile: res.hrmsemployee.mobile,
personalemail: res.hrmsemployee.personalemail,
residencephone: res.hrmsemployee.residencephone,
spousename: res.hrmsemployee.spousename,
fathername: res.hrmsemployee.fathername,
mothername: res.hrmsemployee.mothername,
dob: this.ngbDateParserFormatter.parse(res.hrmsemployee.dob),
age: res.hrmsemployee.age,
countryofbirth: res.hrmsemployee.countryofbirth,
countryofbirthdesc: res.hrmsemployee.countryofbirthdesc,
filenumber: res.hrmsemployee.filenumber,
validfrom: this.ngbDateParserFormatter.parse(res.hrmsemployee.validfrom),
validto: this.ngbDateParserFormatter.parse(res.hrmsemployee.validto),
glcode: res.hrmsemployee.glcode,
photo: JSON.parse(res.hrmsemployee.photo),
thumbnail: res.hrmsemployee.thumbnail,
signature: JSON.parse(res.hrmsemployee.signature),
gender: res.hrmsemployee.gender,
genderdesc: res.hrmsemployee.genderdesc,
qualification1: res.hrmsemployee.qualification1,
qualification1desc: res.hrmsemployee.qualification1desc,
qualification2: res.hrmsemployee.qualification2,
qualification2desc: res.hrmsemployee.qualification2desc,
qualification3: res.hrmsemployee.qualification3,
qualification3desc: res.hrmsemployee.qualification3desc,
recruitmentmode: res.hrmsemployee.recruitmentmode,
recruitmentmodedesc: res.hrmsemployee.recruitmentmodedesc,
currentlocationtype: res.hrmsemployee.currentlocationtype,
currentaddress: res.hrmsemployee.currentaddress,
permanentaddress: res.hrmsemployee.permanentaddress,
nationality: res.hrmsemployee.nationality,
nationalitydesc: res.hrmsemployee.nationalitydesc,
religion: res.hrmsemployee.religion,
religiondesc: res.hrmsemployee.religiondesc,
maritalstatus: res.hrmsemployee.maritalstatus,
maritalstatusdesc: res.hrmsemployee.maritalstatusdesc,
bloodgroup: res.hrmsemployee.bloodgroup,
bloodgroupdesc: res.hrmsemployee.bloodgroupdesc,
nationalid: res.hrmsemployee.nationalid,
taxnumber: res.hrmsemployee.taxnumber,
passportnumber: res.hrmsemployee.passportnumber,
placeofissue: res.hrmsemployee.placeofissue,
issuingcountry: res.hrmsemployee.issuingcountry,
issuingcountrydesc: res.hrmsemployee.issuingcountrydesc,
issuingdate: this.ngbDateParserFormatter.parse(res.hrmsemployee.issuingdate),
expirydate: this.ngbDateParserFormatter.parse(res.hrmsemployee.expirydate),
drivinglicensenumber: res.hrmsemployee.drivinglicensenumber,
drivinglicenseexpiration: this.ngbDateParserFormatter.parse(res.hrmsemployee.drivinglicenseexpiration),
employmenttype: res.hrmsemployee.employmenttype,
employmenttypedesc: res.hrmsemployee.employmenttypedesc,
probationmonths: res.hrmsemployee.probationmonths,
confirmationdate: this.ngbDateParserFormatter.parse(res.hrmsemployee.confirmationdate),
firstappraisalstartson: this.ngbDateParserFormatter.parse(res.hrmsemployee.firstappraisalstartson),
appraisalcyclemonths: res.hrmsemployee.appraisalcyclemonths,
category: res.hrmsemployee.category,
categorydesc: res.hrmsemployee.categorydesc,
noticeperiod: res.hrmsemployee.noticeperiod,
anyillness: res.hrmsemployee.anyillness,
emergencycontactname: res.hrmsemployee.emergencycontactname,
relationship: res.hrmsemployee.relationship,
relationshipdesc: res.hrmsemployee.relationshipdesc,
contactmobile: res.hrmsemployee.contactmobile,
email: res.hrmsemployee.email,
leaveencashmenteligibility: res.hrmsemployee.leaveencashmenteligibility,
hraeligibility: res.hrmsemployee.hraeligibility,
attendanceenabled: res.hrmsemployee.attendanceenabled,
otenabled: res.hrmsemployee.otenabled,
companyaccommodation: res.hrmsemployee.companyaccommodation,
freeticket: res.hrmsemployee.freeticket,
salarymode: res.hrmsemployee.salarymode,
salarymodedesc: res.hrmsemployee.salarymodedesc,
bankname: res.hrmsemployee.bankname,
accountnumber: res.hrmsemployee.accountnumber,
branchname: res.hrmsemployee.branchname,
address: res.hrmsemployee.address,
bankcode: res.hrmsemployee.bankcode,
transportmode: res.hrmsemployee.transportmode,
transportmodedesc: res.hrmsemployee.transportmodedesc,
transportpickuppoint: res.hrmsemployee.transportpickuppoint,
heightcms: res.hrmsemployee.heightcms,
weightkgs: res.hrmsemployee.weightkgs,
identificationmark: res.hrmsemployee.identificationmark,
disabilitycategory: res.hrmsemployee.disabilitycategory,
disabilitycategorydesc: res.hrmsemployee.disabilitycategorydesc,
disabilitydegree: res.hrmsemployee.disabilitydegree,
disabilitydegreedesc: res.hrmsemployee.disabilitydegreedesc,
disabilityinfo: res.hrmsemployee.disabilityinfo,
medicalassessmentdate: this.ngbDateParserFormatter.parse(res.hrmsemployee.medicalassessmentdate),
notes: res.hrmsemployee.notes,
badgeno: res.hrmsemployee.badgeno,
cardno: res.hrmsemployee.cardno,
reference1: res.hrmsemployee.reference1,
reference2: res.hrmsemployee.reference2,
familybenefitsallowed: res.hrmsemployee.familybenefitsallowed,
accomodation: res.hrmsemployee.accomodation,
medicalinsurance: res.hrmsemployee.medicalinsurance,
lifeinsurance: res.hrmsemployee.lifeinsurance,
airticket: res.hrmsemployee.airticket,
airsector: res.hrmsemployee.airsector,
airticketcount: res.hrmsemployee.airticketcount,
airticketyears: res.hrmsemployee.airticketyears,
annualleaveininitialyr: res.hrmsemployee.annualleaveininitialyr,
initialyearscount: res.hrmsemployee.initialyearscount,
annualleaveafterinitialyr: res.hrmsemployee.annualleaveafterinitialyr,
pfnumber: res.hrmsemployee.pfnumber,
esic: res.hrmsemployee.esic,
esicnumber: res.hrmsemployee.esicnumber,
pancard: res.hrmsemployee.pancard,
remarks: res.hrmsemployee.remarks,
customfield: res.hrmsemployee.customfield,
attachment: JSON.parse(res.hrmsemployee.attachment),
employeestatus: res.hrmsemployee.employeestatus,
employeestatusremarks: res.hrmsemployee.employeestatusremarks,
status: res.hrmsemployee.status,
statusdesc: res.hrmsemployee.statusdesc,
salarytype: res.hrmsemployee.salarytype,
basic: res.hrmsemployee.basic,
userid: res.hrmsemployee.userid,
useriddesc: res.hrmsemployee.useriddesc,
pan: res.hrmsemployee.pan,
castecategory: res.hrmsemployee.castecategory,
subcastecategory: res.hrmsemployee.subcastecategory,
differentlyabled: res.hrmsemployee.differentlyabled,
salarydrawnfrom: res.hrmsemployee.salarydrawnfrom,
});
this.hrmspaschedulesvisiblelist=res.hrmspaschedulesvisiblelist;
this.hrmsdependantdetailsvisiblelist=res.hrmsdependantdetailsvisiblelist;
this.hrmsemployeeeosdetailsvisiblelist=res.hrmsemployeeeosdetailsvisiblelist;
this.hrmsemployeegeneralwaiversvisiblelist=res.hrmsemployeegeneralwaiversvisiblelist;
this.hrmsemployeeinsurancesvisiblelist=res.hrmsemployeeinsurancesvisiblelist;
this.hrmsemployeereportingsvisiblelist=res.hrmsemployeereportingsvisiblelist;
this.hrmsemployeesalarymastersvisiblelist=res.hrmsemployeesalarymastersvisiblelist;
this.hrmsemployeesalarymastershistoriesvisiblelist=res.hrmsemployeesalarymastershistoriesvisiblelist;
this.hrmsemployeesectionwaiversvisiblelist=res.hrmsemployeesectionwaiversvisiblelist;
this.hrmsemployeestatutorybenefitsvisiblelist=res.hrmsemployeestatutorybenefitsvisiblelist;
this.hrmsemployeetaxcalculationsvisiblelist=res.hrmsemployeetaxcalculationsvisiblelist;
this.hrmsemployeetaxdeclarationsvisiblelist=res.hrmsemployeetaxdeclarationsvisiblelist;
this.hrmssubordinatedetailsvisiblelist=res.hrmssubordinatedetailsvisiblelist;
this.hrmsemployeechecklistsvisiblelist=res.hrmsemployeechecklistsvisiblelist;
this.hrmsemployeetransfersvisiblelist=res.hrmsemployeetransfersvisiblelist;
this.hrmsemployeeassetsvisiblelist=res.hrmsemployeeassetsvisiblelist;
this.hrmsemployeecareersvisiblelist=res.hrmsemployeecareersvisiblelist;
this.hrmsemployeeeducationsvisiblelist=res.hrmsemployeeeducationsvisiblelist;
this.hrmsemployeeinfrarequestmastersvisiblelist=res.hrmsemployeeinfrarequestmastersvisiblelist;
this.hrmsemployerchecklistsvisiblelist=res.hrmsemployerchecklistsvisiblelist;
this.hrmsemployeemonthlysalarymastersvisiblelist=res.hrmsemployeemonthlysalarymastersvisiblelist;
this.hrmsemployeekrasvisiblelist=res.hrmsemployeekrasvisiblelist;
this.hrmsemployeelanguageskillsvisiblelist=res.hrmsemployeelanguageskillsvisiblelist;
this.hrmsemployeelettermanagementsvisiblelist=res.hrmsemployeelettermanagementsvisiblelist;
this.hrmsemployeemembershipdetailsvisiblelist=res.hrmsemployeemembershipdetailsvisiblelist;
this.hrmsemployeememosvisiblelist=res.hrmsemployeememosvisiblelist;
this.hrmsemployeepresentationsvisiblelist=res.hrmsemployeepresentationsvisiblelist;
this.hrmsemployeerewardsvisiblelist=res.hrmsemployeerewardsvisiblelist;
this.hrmsemployeeskillsvisiblelist=res.hrmsemployeeskillsvisiblelist;
this.hrmsemployeestationaryrequestsvisiblelist=res.hrmsemployeestationaryrequestsvisiblelist;
this.hrmsemployeetraveldocumentsvisiblelist=res.hrmsemployeetraveldocumentsvisiblelist;
this.hrmsemployeedocumentsvisiblelist=res.hrmsemployeedocumentsvisiblelist;
this.hrmsemployeemonthlyattendancesvisiblelist=res.hrmsemployeemonthlyattendancesvisiblelist;
this.hrmsemployeedependentsvisiblelist=res.hrmsemployeedependentsvisiblelist;
this.hrmsemployeenomineesvisiblelist=res.hrmsemployeenomineesvisiblelist;
if(this.hrmsemployeeForm.get('customfield').value!=null && this.hrmsemployeeForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.hrmsemployeeForm.get('customfield').value);
this.FillCustomField();
if(this.hrmsemployeeForm.get('photo').value!=null && this.hrmsemployeeForm.get('photo').value!="" && this.photo!=null && this.photo!=undefined)this.photo.setattachmentlist(this.hrmsemployeeForm.get('photo').value);
if(this.hrmsemployeeForm.get('signature').value!=null && this.hrmsemployeeForm.get('signature').value!="" && this.signature!=null && this.signature!=undefined)this.signature.setattachmentlist(this.hrmsemployeeForm.get('signature').value);
if(this.hrmsemployeeForm.get('attachment').value!=null && this.hrmsemployeeForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsemployeeForm.get('attachment').value);
//Child Tables if any
this.hrmsemployeeservice.hrmspaschedules = res.hrmspaschedules;
this.SethrmspaschedulesTableConfig();
this.hrmspaschedulesLoadTable();
  setTimeout(() => {
  this.SethrmspaschedulesTableddConfig();
  });
this.hrmsemployeeservice.hrmsdependantdetails = res.hrmsdependantdetails;
this.SethrmsdependantdetailsTableConfig();
this.hrmsdependantdetailsLoadTable();
  setTimeout(() => {
  this.SethrmsdependantdetailsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeeosdetails = res.hrmsemployeeeosdetails;
this.SethrmsemployeeeosdetailsTableConfig();
this.hrmsemployeeeosdetailsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeeosdetailsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeegeneralwaivers = res.hrmsemployeegeneralwaivers;
this.SethrmsemployeegeneralwaiversTableConfig();
this.hrmsemployeegeneralwaiversLoadTable();
  setTimeout(() => {
  this.SethrmsemployeegeneralwaiversTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeinsurances = res.hrmsemployeeinsurances;
this.SethrmsemployeeinsurancesTableConfig();
this.hrmsemployeeinsurancesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeinsurancesTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeereportings = res.hrmsemployeereportings;
this.SethrmsemployeereportingsTableConfig();
this.hrmsemployeereportingsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeereportingsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeesalarymasters = res.hrmsemployeesalarymasters;
this.SethrmsemployeesalarymastersTableConfig();
this.hrmsemployeesalarymastersLoadTable();
  setTimeout(() => {
  this.SethrmsemployeesalarymastersTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeesalarymastershistories = res.hrmsemployeesalarymastershistories;
this.SethrmsemployeesalarymastershistoriesTableConfig();
this.hrmsemployeesalarymastershistoriesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeesalarymastershistoriesTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeesectionwaivers = res.hrmsemployeesectionwaivers;
this.SethrmsemployeesectionwaiversTableConfig();
this.hrmsemployeesectionwaiversLoadTable();
  setTimeout(() => {
  this.SethrmsemployeesectionwaiversTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeestatutorybenefits = res.hrmsemployeestatutorybenefits;
this.SethrmsemployeestatutorybenefitsTableConfig();
this.hrmsemployeestatutorybenefitsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeestatutorybenefitsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeetaxcalculations = res.hrmsemployeetaxcalculations;
this.SethrmsemployeetaxcalculationsTableConfig();
this.hrmsemployeetaxcalculationsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeetaxcalculationsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeetaxdeclarations = res.hrmsemployeetaxdeclarations;
this.SethrmsemployeetaxdeclarationsTableConfig();
this.hrmsemployeetaxdeclarationsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeetaxdeclarationsTableddConfig();
  });
this.hrmsemployeeservice.hrmssubordinatedetails = res.hrmssubordinatedetails;
this.SethrmssubordinatedetailsTableConfig();
this.hrmssubordinatedetailsLoadTable();
  setTimeout(() => {
  this.SethrmssubordinatedetailsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeechecklists = res.hrmsemployeechecklists;
this.SethrmsemployeechecklistsTableConfig();
this.hrmsemployeechecklistsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeechecklistsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeetransfers = res.hrmsemployeetransfers;
this.SethrmsemployeetransfersTableConfig();
this.hrmsemployeetransfersLoadTable();
  setTimeout(() => {
  this.SethrmsemployeetransfersTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeassets = res.hrmsemployeeassets;
this.SethrmsemployeeassetsTableConfig();
this.hrmsemployeeassetsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeassetsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeecareers = res.hrmsemployeecareers;
this.SethrmsemployeecareersTableConfig();
this.hrmsemployeecareersLoadTable();
  setTimeout(() => {
  this.SethrmsemployeecareersTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeeducations = res.hrmsemployeeeducations;
this.SethrmsemployeeeducationsTableConfig();
this.hrmsemployeeeducationsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeeducationsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters = res.hrmsemployeeinfrarequestmasters;
this.SethrmsemployeeinfrarequestmastersTableConfig();
this.hrmsemployeeinfrarequestmastersLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeinfrarequestmastersTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployerchecklists = res.hrmsemployerchecklists;
this.SethrmsemployerchecklistsTableConfig();
this.hrmsemployerchecklistsLoadTable();
  setTimeout(() => {
  this.SethrmsemployerchecklistsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters = res.hrmsemployeemonthlysalarymasters;
this.SethrmsemployeemonthlysalarymastersTableConfig();
this.hrmsemployeemonthlysalarymastersLoadTable();
  setTimeout(() => {
  this.SethrmsemployeemonthlysalarymastersTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeekras = res.hrmsemployeekras;
this.SethrmsemployeekrasTableConfig();
this.hrmsemployeekrasLoadTable();
  setTimeout(() => {
  this.SethrmsemployeekrasTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeelanguageskills = res.hrmsemployeelanguageskills;
this.SethrmsemployeelanguageskillsTableConfig();
this.hrmsemployeelanguageskillsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeelanguageskillsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeelettermanagements = res.hrmsemployeelettermanagements;
this.SethrmsemployeelettermanagementsTableConfig();
this.hrmsemployeelettermanagementsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeelettermanagementsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeemembershipdetails = res.hrmsemployeemembershipdetails;
this.SethrmsemployeemembershipdetailsTableConfig();
this.hrmsemployeemembershipdetailsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeemembershipdetailsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeememos = res.hrmsemployeememos;
this.SethrmsemployeememosTableConfig();
this.hrmsemployeememosLoadTable();
  setTimeout(() => {
  this.SethrmsemployeememosTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeepresentations = res.hrmsemployeepresentations;
this.SethrmsemployeepresentationsTableConfig();
this.hrmsemployeepresentationsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeepresentationsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeerewards = res.hrmsemployeerewards;
this.SethrmsemployeerewardsTableConfig();
this.hrmsemployeerewardsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeerewardsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeeskills = res.hrmsemployeeskills;
this.SethrmsemployeeskillsTableConfig();
this.hrmsemployeeskillsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeskillsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeestationaryrequests = res.hrmsemployeestationaryrequests;
this.SethrmsemployeestationaryrequestsTableConfig();
this.hrmsemployeestationaryrequestsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeestationaryrequestsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeetraveldocuments = res.hrmsemployeetraveldocuments;
this.SethrmsemployeetraveldocumentsTableConfig();
this.hrmsemployeetraveldocumentsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeetraveldocumentsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeedocuments = res.hrmsemployeedocuments;
this.SethrmsemployeedocumentsTableConfig();
this.hrmsemployeedocumentsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeedocumentsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeemonthlyattendances = res.hrmsemployeemonthlyattendances;
this.SethrmsemployeemonthlyattendancesTableConfig();
this.hrmsemployeemonthlyattendancesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeemonthlyattendancesTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeedependents = res.hrmsemployeedependents;
this.SethrmsemployeedependentsTableConfig();
this.hrmsemployeedependentsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeedependentsTableddConfig();
  });
this.hrmsemployeeservice.hrmsemployeenominees = res.hrmsemployeenominees;
this.SethrmsemployeenomineesTableConfig();
this.hrmsemployeenomineesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeenomineesTableddConfig();
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
  for (let key in this.hrmsemployeeForm.controls) {
    if (this.hrmsemployeeForm.controls[key] != null) {
if( key=="photo" ||  key=="signature")
{
if(this.hrmsemployeeservice.formData!=null && this.hrmsemployeeservice.formData[key]!=null  && this.hrmsemployeeservice.formData[key]!='[]' && this.hrmsemployeeservice.formData[key]!=undefined && this.hrmsemployeeservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeeservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeeservice.formData!=null && this.hrmsemployeeservice.formData[key]!=null   && this.hrmsemployeeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeeservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeeservice.formData!=null && this.hrmsemployeeservice.formData[key]!=null   && this.hrmsemployeeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeeservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeeservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeeForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeeForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.hrmsemployeeForm.value;
obj.dateofjoin=new Date(this.hrmsemployeeForm.get('dateofjoin').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('dateofjoin').value)+'  UTC' :null);
obj.dob=new Date(this.hrmsemployeeForm.get('dob').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('dob').value)+'  UTC' :null);
obj.validfrom=new Date(this.hrmsemployeeForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('validfrom').value)+'  UTC' :null);
obj.validto=new Date(this.hrmsemployeeForm.get('validto').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('validto').value)+'  UTC' :null);
obj.issuingdate=new Date(this.hrmsemployeeForm.get('issuingdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('issuingdate').value)+'  UTC' :null);
obj.expirydate=new Date(this.hrmsemployeeForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('expirydate').value)+'  UTC' :null);
obj.drivinglicenseexpiration=new Date(this.hrmsemployeeForm.get('drivinglicenseexpiration').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('drivinglicenseexpiration').value)+'  UTC' :null);
obj.confirmationdate=new Date(this.hrmsemployeeForm.get('confirmationdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('confirmationdate').value)+'  UTC' :null);
obj.firstappraisalstartson=new Date(this.hrmsemployeeForm.get('firstappraisalstartson').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('firstappraisalstartson').value)+'  UTC' :null);
obj.medicalassessmentdate=new Date(this.hrmsemployeeForm.get('medicalassessmentdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('medicalassessmentdate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.photo=JSON.stringify(this.photo.getattachmentlist());
obj.photo=JSON.stringify(this.photo.getattachmentlist());
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.photo.getAllFiles());
await this.sharedService.upload(this.signature.getAllFiles());
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

private hrmsemployeetoggleOption(){
this.hrmsemployeeshowOption = this.hrmsemployeeshowOption === true ? false : true;
}

private hrmspascheduletoggleOption(){
this.hrmspascheduleshowOption = this.hrmspascheduleshowOption === true ? false : true;
}

private hrmsdependantdetailtoggleOption(){
this.hrmsdependantdetailshowOption = this.hrmsdependantdetailshowOption === true ? false : true;
}

private hrmsemployeeeosdetailtoggleOption(){
this.hrmsemployeeeosdetailshowOption = this.hrmsemployeeeosdetailshowOption === true ? false : true;
}

private hrmsemployeegeneralwaivertoggleOption(){
this.hrmsemployeegeneralwaivershowOption = this.hrmsemployeegeneralwaivershowOption === true ? false : true;
}

private hrmsemployeeinsurancetoggleOption(){
this.hrmsemployeeinsuranceshowOption = this.hrmsemployeeinsuranceshowOption === true ? false : true;
}

private hrmsemployeereportingtoggleOption(){
this.hrmsemployeereportingshowOption = this.hrmsemployeereportingshowOption === true ? false : true;
}

private hrmsemployeesalarymastertoggleOption(){
this.hrmsemployeesalarymastershowOption = this.hrmsemployeesalarymastershowOption === true ? false : true;
}

private hrmsemployeesalarymastershistorytoggleOption(){
this.hrmsemployeesalarymastershistoryshowOption = this.hrmsemployeesalarymastershistoryshowOption === true ? false : true;
}

private hrmsemployeesectionwaivertoggleOption(){
this.hrmsemployeesectionwaivershowOption = this.hrmsemployeesectionwaivershowOption === true ? false : true;
}

private hrmsemployeestatutorybenefittoggleOption(){
this.hrmsemployeestatutorybenefitshowOption = this.hrmsemployeestatutorybenefitshowOption === true ? false : true;
}

private hrmsemployeetaxcalculationtoggleOption(){
this.hrmsemployeetaxcalculationshowOption = this.hrmsemployeetaxcalculationshowOption === true ? false : true;
}

private hrmsemployeetaxdeclarationtoggleOption(){
this.hrmsemployeetaxdeclarationshowOption = this.hrmsemployeetaxdeclarationshowOption === true ? false : true;
}

private hrmssubordinatedetailtoggleOption(){
this.hrmssubordinatedetailshowOption = this.hrmssubordinatedetailshowOption === true ? false : true;
}

private hrmsemployeechecklisttoggleOption(){
this.hrmsemployeechecklistshowOption = this.hrmsemployeechecklistshowOption === true ? false : true;
}

private hrmsemployeetransfertoggleOption(){
this.hrmsemployeetransfershowOption = this.hrmsemployeetransfershowOption === true ? false : true;
}

private hrmsemployeeassettoggleOption(){
this.hrmsemployeeassetshowOption = this.hrmsemployeeassetshowOption === true ? false : true;
}

private hrmsemployeecareertoggleOption(){
this.hrmsemployeecareershowOption = this.hrmsemployeecareershowOption === true ? false : true;
}

private hrmsemployeeeducationtoggleOption(){
this.hrmsemployeeeducationshowOption = this.hrmsemployeeeducationshowOption === true ? false : true;
}

private hrmsemployeeinfrarequestmastertoggleOption(){
this.hrmsemployeeinfrarequestmastershowOption = this.hrmsemployeeinfrarequestmastershowOption === true ? false : true;
}

private hrmsemployerchecklisttoggleOption(){
this.hrmsemployerchecklistshowOption = this.hrmsemployerchecklistshowOption === true ? false : true;
}

private hrmsemployeemonthlysalarymastertoggleOption(){
this.hrmsemployeemonthlysalarymastershowOption = this.hrmsemployeemonthlysalarymastershowOption === true ? false : true;
}

private hrmsemployeekratoggleOption(){
this.hrmsemployeekrashowOption = this.hrmsemployeekrashowOption === true ? false : true;
}

private hrmsemployeelanguageskilltoggleOption(){
this.hrmsemployeelanguageskillshowOption = this.hrmsemployeelanguageskillshowOption === true ? false : true;
}

private hrmsemployeelettermanagementtoggleOption(){
this.hrmsemployeelettermanagementshowOption = this.hrmsemployeelettermanagementshowOption === true ? false : true;
}

private hrmsemployeemembershipdetailtoggleOption(){
this.hrmsemployeemembershipdetailshowOption = this.hrmsemployeemembershipdetailshowOption === true ? false : true;
}

private hrmsemployeememotoggleOption(){
this.hrmsemployeememoshowOption = this.hrmsemployeememoshowOption === true ? false : true;
}

private hrmsemployeepresentationtoggleOption(){
this.hrmsemployeepresentationshowOption = this.hrmsemployeepresentationshowOption === true ? false : true;
}

private hrmsemployeerewardtoggleOption(){
this.hrmsemployeerewardshowOption = this.hrmsemployeerewardshowOption === true ? false : true;
}

private hrmsemployeeskilltoggleOption(){
this.hrmsemployeeskillshowOption = this.hrmsemployeeskillshowOption === true ? false : true;
}

private hrmsemployeestationaryrequesttoggleOption(){
this.hrmsemployeestationaryrequestshowOption = this.hrmsemployeestationaryrequestshowOption === true ? false : true;
}

private hrmsemployeetraveldocumenttoggleOption(){
this.hrmsemployeetraveldocumentshowOption = this.hrmsemployeetraveldocumentshowOption === true ? false : true;
}

private hrmsemployeedocumenttoggleOption(){
this.hrmsemployeedocumentshowOption = this.hrmsemployeedocumentshowOption === true ? false : true;
}

private hrmsemployeemonthlyattendancetoggleOption(){
this.hrmsemployeemonthlyattendanceshowOption = this.hrmsemployeemonthlyattendanceshowOption === true ? false : true;
}

private hrmsemployeedependenttoggleOption(){
this.hrmsemployeedependentshowOption = this.hrmsemployeedependentshowOption === true ? false : true;
}

private hrmsemployeenomineetoggleOption(){
this.hrmsemployeenomineeshowOption = this.hrmsemployeenomineeshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeeForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeeForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeeservice.formData=this.hrmsemployeeForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeeForm.controls[key] != null)
    {
        this.hrmsemployeeservice.formData[key] = this.hrmsemployeeForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.hrmsemployeeservice.formData.dateofjoin=new Date(this.hrmsemployeeForm.get('dateofjoin').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('dateofjoin').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.dob=new Date(this.hrmsemployeeForm.get('dob').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('dob').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.validfrom=new Date(this.hrmsemployeeForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('validfrom').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.validto=new Date(this.hrmsemployeeForm.get('validto').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('validto').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.photo=this.hrmsemployeeForm.get('photo').value;
this.hrmsemployeeservice.formData.signature=this.hrmsemployeeForm.get('signature').value;
this.hrmsemployeeservice.formData.issuingdate=new Date(this.hrmsemployeeForm.get('issuingdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('issuingdate').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.expirydate=new Date(this.hrmsemployeeForm.get('expirydate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('expirydate').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.drivinglicenseexpiration=new Date(this.hrmsemployeeForm.get('drivinglicenseexpiration').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('drivinglicenseexpiration').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.confirmationdate=new Date(this.hrmsemployeeForm.get('confirmationdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('confirmationdate').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.firstappraisalstartson=new Date(this.hrmsemployeeForm.get('firstappraisalstartson').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('firstappraisalstartson').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.medicalassessmentdate=new Date(this.hrmsemployeeForm.get('medicalassessmentdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeForm.get('medicalassessmentdate').value)+'  UTC' :null);
this.hrmsemployeeservice.formData.customfield=JSON.stringify(customfields);
this.hrmsemployeeservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmsemployeeservice.formData.DeletedhrmspascheduleIDs = this.DeletedhrmspascheduleIDs;
this.hrmsemployeeservice.formData.DeletedhrmsdependantdetailIDs = this.DeletedhrmsdependantdetailIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeeosdetailIDs = this.DeletedhrmsemployeeeosdetailIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeegeneralwaiverIDs = this.DeletedhrmsemployeegeneralwaiverIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeinsuranceIDs = this.DeletedhrmsemployeeinsuranceIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeereportingIDs = this.DeletedhrmsemployeereportingIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeesalarymasterIDs = this.DeletedhrmsemployeesalarymasterIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeesalarymastershistoryIDs = this.DeletedhrmsemployeesalarymastershistoryIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeesectionwaiverIDs = this.DeletedhrmsemployeesectionwaiverIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeestatutorybenefitIDs = this.DeletedhrmsemployeestatutorybenefitIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeetaxcalculationIDs = this.DeletedhrmsemployeetaxcalculationIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeetaxdeclarationIDs = this.DeletedhrmsemployeetaxdeclarationIDs;
this.hrmsemployeeservice.formData.DeletedhrmssubordinatedetailIDs = this.DeletedhrmssubordinatedetailIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeechecklistIDs = this.DeletedhrmsemployeechecklistIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeetransferIDs = this.DeletedhrmsemployeetransferIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeassetIDs = this.DeletedhrmsemployeeassetIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeecareerIDs = this.DeletedhrmsemployeecareerIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeeducationIDs = this.DeletedhrmsemployeeeducationIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeinfrarequestmasterIDs = this.DeletedhrmsemployeeinfrarequestmasterIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployerchecklistIDs = this.DeletedhrmsemployerchecklistIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeemonthlysalarymasterIDs = this.DeletedhrmsemployeemonthlysalarymasterIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeekraIDs = this.DeletedhrmsemployeekraIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeelanguageskillIDs = this.DeletedhrmsemployeelanguageskillIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeelettermanagementIDs = this.DeletedhrmsemployeelettermanagementIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeemembershipdetailIDs = this.DeletedhrmsemployeemembershipdetailIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeememoIDs = this.DeletedhrmsemployeememoIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeepresentationIDs = this.DeletedhrmsemployeepresentationIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeerewardIDs = this.DeletedhrmsemployeerewardIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeeskillIDs = this.DeletedhrmsemployeeskillIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeestationaryrequestIDs = this.DeletedhrmsemployeestationaryrequestIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeetraveldocumentIDs = this.DeletedhrmsemployeetraveldocumentIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeedocumentIDs = this.DeletedhrmsemployeedocumentIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeemonthlyattendanceIDs = this.DeletedhrmsemployeemonthlyattendanceIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeedependentIDs = this.DeletedhrmsemployeedependentIDs;
this.hrmsemployeeservice.formData.DeletedhrmsemployeenomineeIDs = this.DeletedhrmsemployeenomineeIDs;
this.hrmsemployeeservice.formData.photo=JSON.stringify(this.photo.getattachmentlist());
this.hrmsemployeeservice.formData.photo=JSON.stringify(this.photo.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsemployeeservice.formData);
this.hrmsemployeeservice.formData=this.hrmsemployeeForm.value;
this.hrmsemployeeservice.saveOrUpdatehrmsemployees().subscribe(
async res => {
await this.sharedService.upload(this.photo.getAllFiles());
await this.sharedService.upload(this.signature.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmspaschedulessource.data)
{
    for (let i = 0; i < this.hrmspaschedulessource.data.length; i++)
    {
        if (this.hrmspaschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmspaschedulessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsdependantdetailssource.data)
{
    for (let i = 0; i < this.hrmsdependantdetailssource.data.length; i++)
    {
        if (this.hrmsdependantdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsdependantdetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeeosdetailssource.data)
{
    for (let i = 0; i < this.hrmsemployeeeosdetailssource.data.length; i++)
    {
        if (this.hrmsemployeeeosdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeeosdetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeegeneralwaiverssource.data)
{
    for (let i = 0; i < this.hrmsemployeegeneralwaiverssource.data.length; i++)
    {
        if (this.hrmsemployeegeneralwaiverssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeegeneralwaiverssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeinsurancessource.data)
{
    for (let i = 0; i < this.hrmsemployeeinsurancessource.data.length; i++)
    {
        if (this.hrmsemployeeinsurancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeinsurancessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeereportingssource.data)
{
    for (let i = 0; i < this.hrmsemployeereportingssource.data.length; i++)
    {
        if (this.hrmsemployeereportingssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeereportingssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeesalarymasterssource.data)
{
    for (let i = 0; i < this.hrmsemployeesalarymasterssource.data.length; i++)
    {
        if (this.hrmsemployeesalarymasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeesalarymasterssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeesalarymastershistoriessource.data)
{
    for (let i = 0; i < this.hrmsemployeesalarymastershistoriessource.data.length; i++)
    {
        if (this.hrmsemployeesalarymastershistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeesalarymastershistoriessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeesectionwaiverssource.data)
{
    for (let i = 0; i < this.hrmsemployeesectionwaiverssource.data.length; i++)
    {
        if (this.hrmsemployeesectionwaiverssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeesectionwaiverssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeestatutorybenefitssource.data)
{
    for (let i = 0; i < this.hrmsemployeestatutorybenefitssource.data.length; i++)
    {
        if (this.hrmsemployeestatutorybenefitssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeestatutorybenefitssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeetaxcalculationssource.data)
{
    for (let i = 0; i < this.hrmsemployeetaxcalculationssource.data.length; i++)
    {
        if (this.hrmsemployeetaxcalculationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeetaxcalculationssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeetaxdeclarationssource.data)
{
    for (let i = 0; i < this.hrmsemployeetaxdeclarationssource.data.length; i++)
    {
        if (this.hrmsemployeetaxdeclarationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeetaxdeclarationssource.data[i].fileattachmentlist);
    }
}
if (this.hrmssubordinatedetailssource.data)
{
    for (let i = 0; i < this.hrmssubordinatedetailssource.data.length; i++)
    {
        if (this.hrmssubordinatedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmssubordinatedetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeechecklistssource.data)
{
    for (let i = 0; i < this.hrmsemployeechecklistssource.data.length; i++)
    {
        if (this.hrmsemployeechecklistssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeechecklistssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeetransferssource.data)
{
    for (let i = 0; i < this.hrmsemployeetransferssource.data.length; i++)
    {
        if (this.hrmsemployeetransferssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeetransferssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeassetssource.data)
{
    for (let i = 0; i < this.hrmsemployeeassetssource.data.length; i++)
    {
        if (this.hrmsemployeeassetssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeassetssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeecareerssource.data)
{
    for (let i = 0; i < this.hrmsemployeecareerssource.data.length; i++)
    {
        if (this.hrmsemployeecareerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeecareerssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeeducationssource.data)
{
    for (let i = 0; i < this.hrmsemployeeeducationssource.data.length; i++)
    {
        if (this.hrmsemployeeeducationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeeducationssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeinfrarequestmasterssource.data)
{
    for (let i = 0; i < this.hrmsemployeeinfrarequestmasterssource.data.length; i++)
    {
        if (this.hrmsemployeeinfrarequestmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeinfrarequestmasterssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployerchecklistssource.data)
{
    for (let i = 0; i < this.hrmsemployerchecklistssource.data.length; i++)
    {
        if (this.hrmsemployerchecklistssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployerchecklistssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeemonthlysalarymasterssource.data)
{
    for (let i = 0; i < this.hrmsemployeemonthlysalarymasterssource.data.length; i++)
    {
        if (this.hrmsemployeemonthlysalarymasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeemonthlysalarymasterssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeekrassource.data)
{
    for (let i = 0; i < this.hrmsemployeekrassource.data.length; i++)
    {
        if (this.hrmsemployeekrassource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeekrassource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeelanguageskillssource.data)
{
    for (let i = 0; i < this.hrmsemployeelanguageskillssource.data.length; i++)
    {
        if (this.hrmsemployeelanguageskillssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeelanguageskillssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeelettermanagementssource.data)
{
    for (let i = 0; i < this.hrmsemployeelettermanagementssource.data.length; i++)
    {
        if (this.hrmsemployeelettermanagementssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeelettermanagementssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeemembershipdetailssource.data)
{
    for (let i = 0; i < this.hrmsemployeemembershipdetailssource.data.length; i++)
    {
        if (this.hrmsemployeemembershipdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeemembershipdetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeememossource.data)
{
    for (let i = 0; i < this.hrmsemployeememossource.data.length; i++)
    {
        if (this.hrmsemployeememossource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeememossource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeepresentationssource.data)
{
    for (let i = 0; i < this.hrmsemployeepresentationssource.data.length; i++)
    {
        if (this.hrmsemployeepresentationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeepresentationssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeerewardssource.data)
{
    for (let i = 0; i < this.hrmsemployeerewardssource.data.length; i++)
    {
        if (this.hrmsemployeerewardssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeerewardssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeskillssource.data)
{
    for (let i = 0; i < this.hrmsemployeeskillssource.data.length; i++)
    {
        if (this.hrmsemployeeskillssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeskillssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeestationaryrequestssource.data)
{
    for (let i = 0; i < this.hrmsemployeestationaryrequestssource.data.length; i++)
    {
        if (this.hrmsemployeestationaryrequestssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeestationaryrequestssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeetraveldocumentssource.data)
{
    for (let i = 0; i < this.hrmsemployeetraveldocumentssource.data.length; i++)
    {
        if (this.hrmsemployeetraveldocumentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeetraveldocumentssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeedocumentssource.data)
{
    for (let i = 0; i < this.hrmsemployeedocumentssource.data.length; i++)
    {
        if (this.hrmsemployeedocumentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeedocumentssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeemonthlyattendancessource.data)
{
    for (let i = 0; i < this.hrmsemployeemonthlyattendancessource.data.length; i++)
    {
        if (this.hrmsemployeemonthlyattendancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeemonthlyattendancessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeedependentssource.data)
{
    for (let i = 0; i < this.hrmsemployeedependentssource.data.length; i++)
    {
        if (this.hrmsemployeedependentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeedependentssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeenomineessource.data)
{
    for (let i = 0; i < this.hrmsemployeenomineessource.data.length; i++)
    {
        if (this.hrmsemployeenomineessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeenomineessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployee);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeeservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployee);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeeForm.markAsUntouched();
this.hrmsemployeeForm.markAsPristine();
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
data: {branchid:this.hrmsemployeeForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeeForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsemployeeForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditshiftid( shiftid) {
/*let ScreenType='2';
this.dialog.open(hrmsshiftmasterComponent, 
{
data: {shiftid:this.hrmsemployeeForm.get('shiftid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryofbirth( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.hrmsemployeeForm.get('countryofbirth').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditissuingcountry( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.hrmsemployeeForm.get('issuingcountry').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeeForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeeForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmspaschedule(event:any,paid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmspascheduleComponent, 
{
data:  {  showview:false,save:false,event,paid, employeeid,visiblelist:this.hrmspaschedulesvisiblelist,  hidelist:this.hrmspascheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmspaschedulessource.add(res);
this.hrmspaschedulessource.refresh();
}
else
{
this.hrmspaschedulessource.update(event.data, res);
}
}
});
}

onDeletehrmspaschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmspascheduleIDs += childID + ",";
this.hrmsemployeeservice.hrmspaschedules.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsdependantdetail(event:any,dependentid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsdependantdetailComponent, 
{
data:  {  showview:false,save:false,event,dependentid, employeeid,visiblelist:this.hrmsdependantdetailsvisiblelist,  hidelist:this.hrmsdependantdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsdependantdetailssource.add(res);
this.hrmsdependantdetailssource.refresh();
}
else
{
this.hrmsdependantdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsdependantdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsdependantdetailIDs += childID + ",";
this.hrmsemployeeservice.hrmsdependantdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeeosdetail(event:any,employeeeosid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeeosdetailComponent, 
{
data:  {  showview:false,save:false,event,employeeeosid, employeeid,visiblelist:this.hrmsemployeeeosdetailsvisiblelist,  hidelist:this.hrmsemployeeeosdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeeosdetailssource.add(res);
this.hrmsemployeeeosdetailssource.refresh();
}
else
{
this.hrmsemployeeeosdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeeosdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeeosdetailIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeeosdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeegeneralwaiver(event:any,waiverid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeegeneralwaiverComponent, 
{
data:  {  showview:false,save:false,event,waiverid, employeeid,visiblelist:this.hrmsemployeegeneralwaiversvisiblelist,  hidelist:this.hrmsemployeegeneralwaivershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeegeneralwaiverssource.add(res);
this.hrmsemployeegeneralwaiverssource.refresh();
}
else
{
this.hrmsemployeegeneralwaiverssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeegeneralwaiver(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeegeneralwaiverIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeegeneralwaivers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeinsurance(event:any,insuranceid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeinsuranceComponent, 
{
data:  {  showview:false,save:false,event,insuranceid, employeeid,visiblelist:this.hrmsemployeeinsurancesvisiblelist,  hidelist:this.hrmsemployeeinsuranceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeinsurancessource.add(res);
this.hrmsemployeeinsurancessource.refresh();
}
else
{
this.hrmsemployeeinsurancessource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeinsurance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeinsuranceIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeinsurances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeereporting(event:any,reportingid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeereportingComponent, 
{
data:  {  showview:false,save:false,event,reportingid, employeeid,visiblelist:this.hrmsemployeereportingsvisiblelist,  hidelist:this.hrmsemployeereportingshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeereportingssource.add(res);
this.hrmsemployeereportingssource.refresh();
}
else
{
this.hrmsemployeereportingssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeereporting(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeereportingIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeereportings.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeesalarymaster(event:any,salarymasterid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeesalarymasterComponent, 
{
data:  {  showview:false,save:false,event,salarymasterid, employeeid,visiblelist:this.hrmsemployeesalarymastersvisiblelist,  hidelist:this.hrmsemployeesalarymastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeesalarymasterssource.add(res);
this.hrmsemployeesalarymasterssource.refresh();
}
else
{
this.hrmsemployeesalarymasterssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeesalarymaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeesalarymasterIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeesalarymasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeesalarymastershistory(event:any,salarymasterid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeesalarymastershistoryComponent, 
{
data:  {  showview:false,save:false,event,salarymasterid, employeeid,visiblelist:this.hrmsemployeesalarymastershistoriesvisiblelist,  hidelist:this.hrmsemployeesalarymastershistorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeesalarymastershistoriessource.add(res);
this.hrmsemployeesalarymastershistoriessource.refresh();
}
else
{
this.hrmsemployeesalarymastershistoriessource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeesalarymastershistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeesalarymastershistoryIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeesalarymastershistories.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeesectionwaiver(event:any,waiverid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeesectionwaiverComponent, 
{
data:  {  showview:false,save:false,event,waiverid, employeeid,visiblelist:this.hrmsemployeesectionwaiversvisiblelist,  hidelist:this.hrmsemployeesectionwaivershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeesectionwaiverssource.add(res);
this.hrmsemployeesectionwaiverssource.refresh();
}
else
{
this.hrmsemployeesectionwaiverssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeesectionwaiver(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeesectionwaiverIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeesectionwaivers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeestatutorybenefit(event:any,esid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeestatutorybenefitComponent, 
{
data:  {  showview:false,save:false,event,esid, employeeid,visiblelist:this.hrmsemployeestatutorybenefitsvisiblelist,  hidelist:this.hrmsemployeestatutorybenefitshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeestatutorybenefitssource.add(res);
this.hrmsemployeestatutorybenefitssource.refresh();
}
else
{
this.hrmsemployeestatutorybenefitssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeestatutorybenefit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeestatutorybenefitIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeestatutorybenefits.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeetaxcalculation(event:any,taxid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeetaxcalculationComponent, 
{
data:  {  showview:false,save:false,event,taxid, employeeid,visiblelist:this.hrmsemployeetaxcalculationsvisiblelist,  hidelist:this.hrmsemployeetaxcalculationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeetaxcalculationssource.add(res);
this.hrmsemployeetaxcalculationssource.refresh();
}
else
{
this.hrmsemployeetaxcalculationssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeetaxcalculation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeetaxcalculationIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeetaxcalculations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeetaxdeclaration(event:any,declarationid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeetaxdeclarationComponent, 
{
data:  {  showview:false,save:false,event,declarationid, employeeid,visiblelist:this.hrmsemployeetaxdeclarationsvisiblelist,  hidelist:this.hrmsemployeetaxdeclarationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeetaxdeclarationssource.add(res);
this.hrmsemployeetaxdeclarationssource.refresh();
}
else
{
this.hrmsemployeetaxdeclarationssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeetaxdeclaration(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeetaxdeclarationIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeetaxdeclarations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmssubordinatedetail(event:any,subid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmssubordinatedetailComponent, 
{
data:  {  showview:false,save:false,event,subid, employeeid,visiblelist:this.hrmssubordinatedetailsvisiblelist,  hidelist:this.hrmssubordinatedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmssubordinatedetailssource.add(res);
this.hrmssubordinatedetailssource.refresh();
}
else
{
this.hrmssubordinatedetailssource.update(event.data, res);
}
}
});
}

onDeletehrmssubordinatedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmssubordinatedetailIDs += childID + ",";
this.hrmsemployeeservice.hrmssubordinatedetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeechecklist(event:any,employeecheckid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeechecklistComponent, 
{
data:  {  showview:false,save:false,event,employeecheckid, employeeid,visiblelist:this.hrmsemployeechecklistsvisiblelist,  hidelist:this.hrmsemployeechecklistshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeechecklistssource.add(res);
this.hrmsemployeechecklistssource.refresh();
}
else
{
this.hrmsemployeechecklistssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeechecklist(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeechecklistIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeechecklists.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeetransfer(event:any,transferid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeetransferComponent, 
{
data:  {  showview:false,save:false,event,transferid, employeeid,visiblelist:this.hrmsemployeetransfersvisiblelist,  hidelist:this.hrmsemployeetransfershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeetransferssource.add(res);
this.hrmsemployeetransferssource.refresh();
}
else
{
this.hrmsemployeetransferssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeetransfer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeetransferIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeetransfers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeasset(event:any,employeeassetid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeassetComponent, 
{
data:  {  showview:false,save:false,event,employeeassetid, employeeid,visiblelist:this.hrmsemployeeassetsvisiblelist,  hidelist:this.hrmsemployeeassetshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeassetssource.add(res);
this.hrmsemployeeassetssource.refresh();
}
else
{
this.hrmsemployeeassetssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeasset(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeassetIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeassets.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeecareer(event:any,hacid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeecareerComponent, 
{
data:  {  showview:false,save:false,event,hacid, employeeid,visiblelist:this.hrmsemployeecareersvisiblelist,  hidelist:this.hrmsemployeecareershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeecareerssource.add(res);
this.hrmsemployeecareerssource.refresh();
}
else
{
this.hrmsemployeecareerssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeecareer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeecareerIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeecareers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeeducation(event:any,haeid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeeducationComponent, 
{
data:  {  showview:false,save:false,event,haeid, employeeid,visiblelist:this.hrmsemployeeeducationsvisiblelist,  hidelist:this.hrmsemployeeeducationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeeducationssource.add(res);
this.hrmsemployeeeducationssource.refresh();
}
else
{
this.hrmsemployeeeducationssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeeducation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeeducationIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeeducations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeinfrarequestmaster(event:any,infrarequestid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeinfrarequestmasterComponent, 
{
data:  {  showview:false,save:false,event,infrarequestid, employeeid,visiblelist:this.hrmsemployeeinfrarequestmastersvisiblelist,  hidelist:this.hrmsemployeeinfrarequestmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeinfrarequestmasterssource.add(res);
this.hrmsemployeeinfrarequestmasterssource.refresh();
}
else
{
this.hrmsemployeeinfrarequestmasterssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeinfrarequestmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeinfrarequestmasterIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployerchecklist(event:any,employercheckid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployerchecklistComponent, 
{
data:  {  showview:false,save:false,event,employercheckid, employeeid,visiblelist:this.hrmsemployerchecklistsvisiblelist,  hidelist:this.hrmsemployerchecklistshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployerchecklistssource.add(res);
this.hrmsemployerchecklistssource.refresh();
}
else
{
this.hrmsemployerchecklistssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployerchecklist(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployerchecklistIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployerchecklists.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeemonthlysalarymaster(event:any,salid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeemonthlysalarymasterComponent, 
{
data:  {  showview:false,save:false,event,salid, employeeid,visiblelist:this.hrmsemployeemonthlysalarymastersvisiblelist,  hidelist:this.hrmsemployeemonthlysalarymastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeemonthlysalarymasterssource.add(res);
this.hrmsemployeemonthlysalarymasterssource.refresh();
}
else
{
this.hrmsemployeemonthlysalarymasterssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeemonthlysalarymaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeemonthlysalarymasterIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeekra(event:any,empkraid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeekraComponent, 
{
data:  {  showview:false,save:false,event,empkraid, employeeid,visiblelist:this.hrmsemployeekrasvisiblelist,  hidelist:this.hrmsemployeekrashidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeekrassource.add(res);
this.hrmsemployeekrassource.refresh();
}
else
{
this.hrmsemployeekrassource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeekra(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeekraIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeekras.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeelanguageskill(event:any,languageid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeelanguageskillComponent, 
{
data:  {  showview:false,save:false,event,languageid, employeeid,visiblelist:this.hrmsemployeelanguageskillsvisiblelist,  hidelist:this.hrmsemployeelanguageskillshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeelanguageskillssource.add(res);
this.hrmsemployeelanguageskillssource.refresh();
}
else
{
this.hrmsemployeelanguageskillssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeelanguageskill(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeelanguageskillIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeelanguageskills.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeelettermanagement(event:any,letterid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeelettermanagementComponent, 
{
data:  {  showview:false,save:false,event,letterid, employeeid,visiblelist:this.hrmsemployeelettermanagementsvisiblelist,  hidelist:this.hrmsemployeelettermanagementshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeelettermanagementssource.add(res);
this.hrmsemployeelettermanagementssource.refresh();
}
else
{
this.hrmsemployeelettermanagementssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeelettermanagement(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeelettermanagementIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeelettermanagements.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeemembershipdetail(event:any,membershipid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeemembershipdetailComponent, 
{
data:  {  showview:false,save:false,event,membershipid, employeeid,visiblelist:this.hrmsemployeemembershipdetailsvisiblelist,  hidelist:this.hrmsemployeemembershipdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeemembershipdetailssource.add(res);
this.hrmsemployeemembershipdetailssource.refresh();
}
else
{
this.hrmsemployeemembershipdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeemembershipdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeemembershipdetailIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeemembershipdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeememo(event:any,memoid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeememoComponent, 
{
data:  {  showview:false,save:false,event,memoid, employeeid,visiblelist:this.hrmsemployeememosvisiblelist,  hidelist:this.hrmsemployeememoshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeememossource.add(res);
this.hrmsemployeememossource.refresh();
}
else
{
this.hrmsemployeememossource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeememo(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeememoIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeememos.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeepresentation(event:any,presentationid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeepresentationComponent, 
{
data:  {  showview:false,save:false,event,presentationid, employeeid,visiblelist:this.hrmsemployeepresentationsvisiblelist,  hidelist:this.hrmsemployeepresentationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeepresentationssource.add(res);
this.hrmsemployeepresentationssource.refresh();
}
else
{
this.hrmsemployeepresentationssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeepresentation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeepresentationIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeepresentations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeereward(event:any,rewardid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeerewardComponent, 
{
data:  {  showview:false,save:false,event,rewardid, employeeid,visiblelist:this.hrmsemployeerewardsvisiblelist,  hidelist:this.hrmsemployeerewardshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeerewardssource.add(res);
this.hrmsemployeerewardssource.refresh();
}
else
{
this.hrmsemployeerewardssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeereward(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeerewardIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeerewards.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeeskill(event:any,skillid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeskillComponent, 
{
data:  {  showview:false,save:false,event,skillid, employeeid,visiblelist:this.hrmsemployeeskillsvisiblelist,  hidelist:this.hrmsemployeeskillshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeskillssource.add(res);
this.hrmsemployeeskillssource.refresh();
}
else
{
this.hrmsemployeeskillssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeskill(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeskillIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeeskills.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeestationaryrequest(event:any,stationaryrequestid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeestationaryrequestComponent, 
{
data:  {  showview:false,save:false,event,stationaryrequestid, employeeid,visiblelist:this.hrmsemployeestationaryrequestsvisiblelist,  hidelist:this.hrmsemployeestationaryrequestshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeestationaryrequestssource.add(res);
this.hrmsemployeestationaryrequestssource.refresh();
}
else
{
this.hrmsemployeestationaryrequestssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeestationaryrequest(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeestationaryrequestIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeestationaryrequests.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeetraveldocument(event:any,traveldocid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeetraveldocumentComponent, 
{
data:  {  showview:false,save:false,event,traveldocid, employeeid,visiblelist:this.hrmsemployeetraveldocumentsvisiblelist,  hidelist:this.hrmsemployeetraveldocumentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeetraveldocumentssource.add(res);
this.hrmsemployeetraveldocumentssource.refresh();
}
else
{
this.hrmsemployeetraveldocumentssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeetraveldocument(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeetraveldocumentIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeetraveldocuments.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeedocument(event:any,docid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeedocumentComponent, 
{
data:  {  showview:false,save:false,event,docid, employeeid,visiblelist:this.hrmsemployeedocumentsvisiblelist,  hidelist:this.hrmsemployeedocumentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeedocumentssource.add(res);
this.hrmsemployeedocumentssource.refresh();
}
else
{
this.hrmsemployeedocumentssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeedocument(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeedocumentIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeedocuments.splice(i, 1);
//this.updateGrandTotal();
}

onDeletehrmsemployeemonthlyattendance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeemonthlyattendanceIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeemonthlyattendances.splice(i, 1);
}

AddOrEdithrmsemployeedependent(event:any,dependentid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeedependentComponent, 
{
data:  {  showview:false,save:false,event,dependentid, employeeid,visiblelist:this.hrmsemployeedependentsvisiblelist,  hidelist:this.hrmsemployeedependentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeedependentssource.add(res);
this.hrmsemployeedependentssource.refresh();
}
else
{
this.hrmsemployeedependentssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeedependent(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeedependentIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeedependents.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsemployeenominee(event:any,nomineeid:any, employeeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeenomineeComponent, 
{
data:  {  showview:false,save:false,event,nomineeid, employeeid,visiblelist:this.hrmsemployeenomineesvisiblelist,  hidelist:this.hrmsemployeenomineeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeenomineessource.add(res);
this.hrmsemployeenomineessource.refresh();
}
else
{
this.hrmsemployeenomineessource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeenominee(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeenomineeIDs += childID + ",";
this.hrmsemployeeservice.hrmsemployeenominees.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmspaschedules
hrmspaschedulessettings:any;
hrmspaschedulessource: any;

showhrmspaschedulesCheckbox()
{
debugger;
if(this.tblhrmspaschedulessource.settings['selectMode']== 'multi')this.tblhrmspaschedulessource.settings['selectMode']= 'single';
else
this.tblhrmspaschedulessource.settings['selectMode']= 'multi';
this.tblhrmspaschedulessource.initGrid();
}
deletehrmspaschedulesAll()
{
this.tblhrmspaschedulessource.settings['selectMode'] = 'single';
}
showhrmspaschedulesFilter()
{
  setTimeout(() => {
  this.SethrmspaschedulesTableddConfig();
  });
      if(this.tblhrmspaschedulessource.settings!=null)this.tblhrmspaschedulessource.settings['hideSubHeader'] =!this.tblhrmspaschedulessource.settings['hideSubHeader'];
this.tblhrmspaschedulessource.initGrid();
}
showhrmspaschedulesInActive()
{
}
enablehrmspaschedulesInActive()
{
}
async SethrmspaschedulesTableddConfig()
{
if(!this.bfilterPopulatehrmspaschedules){

this.configservice.getList("paround").then(res=>
{
var dataparound2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmspaschedulesparound3.push(defaultobj);
for(let i=0; i<dataparound2.length; i++){
var obj= { value: dataparound2[i].configkey, title: dataparound2[i].configtext};
this.datahrmspaschedulesparound3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmspaschedulessource.settings);
if(clone.columns['paround']!=undefined)clone.columns['paround'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmspaschedulesparound3)), }, };
if(clone.columns['paround']!=undefined)clone.columns['paround'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmspaschedulesparound3)), }, };
this.tblhrmspaschedulessource.settings =  clone;
this.tblhrmspaschedulessource.initGrid();
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataappraisaluser2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmspaschedulesappraisaluser3.push(defaultobj);
for(let i=0; i<dataappraisaluser2.length; i++){
var obj= { value: dataappraisaluser2[i].userid, title:dataappraisaluser2[i].username};
this.datahrmspaschedulesappraisaluser3.push(obj);
}
if((this.tblhrmspaschedulessource.settings as any).columns['appraisaluser'])
{
(this.tblhrmspaschedulessource.settings as any).columns['appraisaluser'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmspaschedulesappraisaluser3));
this.tblhrmspaschedulessource.initGrid();
}
});
}
this.bfilterPopulatehrmspaschedules=true;
}
async hrmspaschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmspaschedulesTableConfig()
{
this.hrmspaschedulessettings = {
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
planneddatetime: {
title: 'Planned Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actualdatetime: {
title: 'Actual Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paround: {
title: 'P A Round',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmspaschedulesparound3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
appraisaluser: {
title: 'Appraisal User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmspaschedulesappraisaluser3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
appraisalusercomments: {
title: 'Appraisal User Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
appraisalweightage: {
title: 'Appraisal Weightage',
type: 'number',
filter:true,
},
},
};
}
hrmspaschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmspaschedulesID)>=0)
{
this.hrmspaschedulessource=new LocalDataSource();
this.hrmspaschedulessource.load(this.hrmsemployeeservice.hrmspaschedules as  any as LocalDataSource);
this.hrmspaschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmspaschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmspaschedules.length == 0)
{
    this.tblhrmspaschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmspaschedule();
    this.hrmsemployeeservice.hrmspaschedules.push(obj);
    this.hrmspaschedulessource.refresh();
    if ((this.hrmsemployeeservice.hrmspaschedules.length / this.hrmspaschedulessource.getPaging().perPage).toFixed(0) + 1 != this.hrmspaschedulessource.getPaging().page)
    {
        this.hrmspaschedulessource.setPage((this.hrmsemployeeservice.hrmspaschedules.length / this.hrmspaschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmspaschedulessource.grid.edit(this.tblhrmspaschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmspaschedulessource.data.indexOf(event.data);
this.onDeletehrmspaschedule(event,event.data.paid,((this.hrmspaschedulessource.getPaging().page-1) *this.hrmspaschedulessource.getPaging().perPage)+index);
this.hrmspaschedulessource.refresh();
break;
}
}

*/
hrmspaschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmspaschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmspaschedule(event,event.data.paid,this.formid);
break;
case 'delete':
this.onDeletehrmspaschedule(event,event.data.paid,((this.hrmspaschedulessource.getPaging().page-1) *this.hrmspaschedulessource.getPaging().perPage)+event.index);
this.hrmspaschedulessource.refresh();
break;
}
}
hrmspaschedulesonDelete(obj) {
let paid=obj.data.paid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(paid).then(res=>
this.hrmspaschedulesLoadTable()
);
}
}
hrmspaschedulesPaging(val)
{
debugger;
this.hrmspaschedulessource.setPaging(1, val, true);
}

handlehrmspaschedulesGridSelected(event:any) {
this.hrmspaschedulesselectedindex=this.hrmsemployeeservice.hrmspaschedules.findIndex(i => i.paid === event.data.paid);
}
IshrmspaschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmspaschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmspaschedules
//start of Grid Codes hrmsdependantdetails
hrmsdependantdetailssettings:any;
hrmsdependantdetailssource: any;

showhrmsdependantdetailsCheckbox()
{
debugger;
if(this.tblhrmsdependantdetailssource.settings['selectMode']== 'multi')this.tblhrmsdependantdetailssource.settings['selectMode']= 'single';
else
this.tblhrmsdependantdetailssource.settings['selectMode']= 'multi';
this.tblhrmsdependantdetailssource.initGrid();
}
deletehrmsdependantdetailsAll()
{
this.tblhrmsdependantdetailssource.settings['selectMode'] = 'single';
}
showhrmsdependantdetailsFilter()
{
  setTimeout(() => {
  this.SethrmsdependantdetailsTableddConfig();
  });
      if(this.tblhrmsdependantdetailssource.settings!=null)this.tblhrmsdependantdetailssource.settings['hideSubHeader'] =!this.tblhrmsdependantdetailssource.settings['hideSubHeader'];
this.tblhrmsdependantdetailssource.initGrid();
}
showhrmsdependantdetailsInActive()
{
}
enablehrmsdependantdetailsInActive()
{
}
async SethrmsdependantdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsdependantdetails){

this.configservice.getList("dependantcategory").then(res=>
{
var datadependantcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsdependantdetailsdependantcategory3.push(defaultobj);
for(let i=0; i<datadependantcategory2.length; i++){
var obj= { value: datadependantcategory2[i].configkey, title: datadependantcategory2[i].configtext};
this.datahrmsdependantdetailsdependantcategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsdependantdetailssource.settings);
if(clone.columns['dependantcategory']!=undefined)clone.columns['dependantcategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsdependantcategory3)), }, };
if(clone.columns['dependantcategory']!=undefined)clone.columns['dependantcategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsdependantcategory3)), }, };
this.tblhrmsdependantdetailssource.settings =  clone;
this.tblhrmsdependantdetailssource.initGrid();
});

this.configservice.getList("gender").then(res=>
{
var datagender2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsdependantdetailsgender3.push(defaultobj);
for(let i=0; i<datagender2.length; i++){
var obj= { value: datagender2[i].configkey, title: datagender2[i].configtext};
this.datahrmsdependantdetailsgender3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsdependantdetailssource.settings);
if(clone.columns['gender']!=undefined)clone.columns['gender'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsgender3)), }, };
if(clone.columns['gender']!=undefined)clone.columns['gender'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsgender3)), }, };
this.tblhrmsdependantdetailssource.settings =  clone;
this.tblhrmsdependantdetailssource.initGrid();
});

this.configservice.getList("maritalstatus").then(res=>
{
var datamaritalstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsdependantdetailsmaritalstatus3.push(defaultobj);
for(let i=0; i<datamaritalstatus2.length; i++){
var obj= { value: datamaritalstatus2[i].configkey, title: datamaritalstatus2[i].configtext};
this.datahrmsdependantdetailsmaritalstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsdependantdetailssource.settings);
if(clone.columns['maritalstatus']!=undefined)clone.columns['maritalstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsmaritalstatus3)), }, };
if(clone.columns['maritalstatus']!=undefined)clone.columns['maritalstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsdependantdetailsmaritalstatus3)), }, };
this.tblhrmsdependantdetailssource.settings =  clone;
this.tblhrmsdependantdetailssource.initGrid();
});
}
this.bfilterPopulatehrmsdependantdetails=true;
}
async hrmsdependantdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsdependantdetailsTableConfig()
{
this.hrmsdependantdetailssettings = {
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
dependantcategory: {
title: 'Dependantcategory',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsdependantdetailsdependantcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
name: {
title: 'Name',
type: '',
filter:true,
},
gender: {
title: 'Gender',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsdependantdetailsgender3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
dob: {
title: 'D O B',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
nominee: {
title: 'Nominee',
type: '',
filter:true,
},
maritalstatus: {
title: 'Marital Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsdependantdetailsmaritalstatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsdependantdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsdependantdetailsID)>=0)
{
this.hrmsdependantdetailssource=new LocalDataSource();
this.hrmsdependantdetailssource.load(this.hrmsemployeeservice.hrmsdependantdetails as  any as LocalDataSource);
this.hrmsdependantdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsdependantdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsdependantdetails.length == 0)
{
    this.tblhrmsdependantdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsdependantdetail();
    this.hrmsemployeeservice.hrmsdependantdetails.push(obj);
    this.hrmsdependantdetailssource.refresh();
    if ((this.hrmsemployeeservice.hrmsdependantdetails.length / this.hrmsdependantdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsdependantdetailssource.getPaging().page)
    {
        this.hrmsdependantdetailssource.setPage((this.hrmsemployeeservice.hrmsdependantdetails.length / this.hrmsdependantdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsdependantdetailssource.grid.edit(this.tblhrmsdependantdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsdependantdetailssource.data.indexOf(event.data);
this.onDeletehrmsdependantdetail(event,event.data.dependentid,((this.hrmsdependantdetailssource.getPaging().page-1) *this.hrmsdependantdetailssource.getPaging().perPage)+index);
this.hrmsdependantdetailssource.refresh();
break;
}
}

*/
hrmsdependantdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsdependantdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsdependantdetail(event,event.data.dependentid,this.formid);
break;
case 'delete':
this.onDeletehrmsdependantdetail(event,event.data.dependentid,((this.hrmsdependantdetailssource.getPaging().page-1) *this.hrmsdependantdetailssource.getPaging().perPage)+event.index);
this.hrmsdependantdetailssource.refresh();
break;
}
}
hrmsdependantdetailsonDelete(obj) {
let dependentid=obj.data.dependentid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(dependentid).then(res=>
this.hrmsdependantdetailsLoadTable()
);
}
}
hrmsdependantdetailsPaging(val)
{
debugger;
this.hrmsdependantdetailssource.setPaging(1, val, true);
}

handlehrmsdependantdetailsGridSelected(event:any) {
this.hrmsdependantdetailsselectedindex=this.hrmsemployeeservice.hrmsdependantdetails.findIndex(i => i.dependentid === event.data.dependentid);
}
IshrmsdependantdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsdependantdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsdependantdetails
//start of Grid Codes hrmsemployeeeosdetails
hrmsemployeeeosdetailssettings:any;
hrmsemployeeeosdetailssource: any;

showhrmsemployeeeosdetailsCheckbox()
{
debugger;
if(this.tblhrmsemployeeeosdetailssource.settings['selectMode']== 'multi')this.tblhrmsemployeeeosdetailssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeeosdetailssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeeosdetailssource.initGrid();
}
deletehrmsemployeeeosdetailsAll()
{
this.tblhrmsemployeeeosdetailssource.settings['selectMode'] = 'single';
}
showhrmsemployeeeosdetailsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeeosdetailsTableddConfig();
  });
      if(this.tblhrmsemployeeeosdetailssource.settings!=null)this.tblhrmsemployeeeosdetailssource.settings['hideSubHeader'] =!this.tblhrmsemployeeeosdetailssource.settings['hideSubHeader'];
this.tblhrmsemployeeeosdetailssource.initGrid();
}
showhrmsemployeeeosdetailsInActive()
{
}
enablehrmsemployeeeosdetailsInActive()
{
}
async SethrmsemployeeeosdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeeosdetails){

this.hrmseosmasterservice.gethrmseosmastersList().then(res=>
{
var dataeosid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeeosdetailseosid3.push(defaultobj);
for(let i=0; i<dataeosid2.length; i++){
var obj= { value: dataeosid2[i].eosd, title:dataeosid2[i].eosname};
this.datahrmsemployeeeosdetailseosid3.push(obj);
}
if((this.tblhrmsemployeeeosdetailssource.settings as any).columns['eosid'])
{
(this.tblhrmsemployeeeosdetailssource.settings as any).columns['eosid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeeosdetailseosid3));
this.tblhrmsemployeeeosdetailssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeeosdetails=true;
}
async hrmsemployeeeosdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeeosdetailsTableConfig()
{
this.hrmsemployeeeosdetailssettings = {
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
eosid: {
title: 'E O S',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeeosdetailseosid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsemployeeeosdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeeosdetailsID)>=0)
{
this.hrmsemployeeeosdetailssource=new LocalDataSource();
this.hrmsemployeeeosdetailssource.load(this.hrmsemployeeservice.hrmsemployeeeosdetails as  any as LocalDataSource);
this.hrmsemployeeeosdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeeosdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeeosdetails.length == 0)
{
    this.tblhrmsemployeeeosdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeeosdetail();
    this.hrmsemployeeservice.hrmsemployeeeosdetails.push(obj);
    this.hrmsemployeeeosdetailssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeeosdetails.length / this.hrmsemployeeeosdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeeosdetailssource.getPaging().page)
    {
        this.hrmsemployeeeosdetailssource.setPage((this.hrmsemployeeservice.hrmsemployeeeosdetails.length / this.hrmsemployeeeosdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeeosdetailssource.grid.edit(this.tblhrmsemployeeeosdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeeosdetailssource.data.indexOf(event.data);
this.onDeletehrmsemployeeeosdetail(event,event.data.employeeeosid,((this.hrmsemployeeeosdetailssource.getPaging().page-1) *this.hrmsemployeeeosdetailssource.getPaging().perPage)+index);
this.hrmsemployeeeosdetailssource.refresh();
break;
}
}

*/
hrmsemployeeeosdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeeosdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeeosdetail(event,event.data.employeeeosid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeeosdetail(event,event.data.employeeeosid,((this.hrmsemployeeeosdetailssource.getPaging().page-1) *this.hrmsemployeeeosdetailssource.getPaging().perPage)+event.index);
this.hrmsemployeeeosdetailssource.refresh();
break;
}
}
hrmsemployeeeosdetailsonDelete(obj) {
let employeeeosid=obj.data.employeeeosid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(employeeeosid).then(res=>
this.hrmsemployeeeosdetailsLoadTable()
);
}
}
hrmsemployeeeosdetailsPaging(val)
{
debugger;
this.hrmsemployeeeosdetailssource.setPaging(1, val, true);
}

handlehrmsemployeeeosdetailsGridSelected(event:any) {
this.hrmsemployeeeosdetailsselectedindex=this.hrmsemployeeservice.hrmsemployeeeosdetails.findIndex(i => i.employeeeosid === event.data.employeeeosid);
}
IshrmsemployeeeosdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeeosdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeeosdetails
//start of Grid Codes hrmsemployeegeneralwaivers
hrmsemployeegeneralwaiverssettings:any;
hrmsemployeegeneralwaiverssource: any;

showhrmsemployeegeneralwaiversCheckbox()
{
debugger;
if(this.tblhrmsemployeegeneralwaiverssource.settings['selectMode']== 'multi')this.tblhrmsemployeegeneralwaiverssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeegeneralwaiverssource.settings['selectMode']= 'multi';
this.tblhrmsemployeegeneralwaiverssource.initGrid();
}
deletehrmsemployeegeneralwaiversAll()
{
this.tblhrmsemployeegeneralwaiverssource.settings['selectMode'] = 'single';
}
showhrmsemployeegeneralwaiversFilter()
{
  setTimeout(() => {
  this.SethrmsemployeegeneralwaiversTableddConfig();
  });
      if(this.tblhrmsemployeegeneralwaiverssource.settings!=null)this.tblhrmsemployeegeneralwaiverssource.settings['hideSubHeader'] =!this.tblhrmsemployeegeneralwaiverssource.settings['hideSubHeader'];
this.tblhrmsemployeegeneralwaiverssource.initGrid();
}
showhrmsemployeegeneralwaiversInActive()
{
}
enablehrmsemployeegeneralwaiversInActive()
{
}
async SethrmsemployeegeneralwaiversTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeegeneralwaivers){

this.bomasterdataservice.getList("khsgr").then(res=>
{
var datadeductionid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeegeneralwaiversdeductionid3.push(defaultobj);
for(let i=0; i<datadeductionid2.length; i++){
var obj= { value: datadeductionid2[i].masterdataid, title:datadeductionid2[i].masterdatadescription};
this.datahrmsemployeegeneralwaiversdeductionid3.push(obj);
}
if((this.tblhrmsemployeegeneralwaiverssource.settings as any).columns['deductionid'])
{
(this.tblhrmsemployeegeneralwaiverssource.settings as any).columns['deductionid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeegeneralwaiversdeductionid3));
this.tblhrmsemployeegeneralwaiverssource.initGrid();
}
});

this.bofinancialyearservice.getbofinancialyearsList().then(res=>
{
var datafinancialyear2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeegeneralwaiversfinancialyear3.push(defaultobj);
for(let i=0; i<datafinancialyear2.length; i++){
var obj= { value: datafinancialyear2[i].finyearid, title:datafinancialyear2[i].finyearname};
this.datahrmsemployeegeneralwaiversfinancialyear3.push(obj);
}
if((this.tblhrmsemployeegeneralwaiverssource.settings as any).columns['financialyear'])
{
(this.tblhrmsemployeegeneralwaiverssource.settings as any).columns['financialyear'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeegeneralwaiversfinancialyear3));
this.tblhrmsemployeegeneralwaiverssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeegeneralwaivers=true;
}
async hrmsemployeegeneralwaiversbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeegeneralwaiversTableConfig()
{
this.hrmsemployeegeneralwaiverssettings = {
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
deductionid: {
title: 'Deduction',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeegeneralwaiversdeductionid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
financialyear: {
title: 'Financial Year',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeegeneralwaiversfinancialyear3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
generalwaivername: {
title: 'General Waiver Name',
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
hrmsemployeegeneralwaiversLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeegeneralwaiversID)>=0)
{
this.hrmsemployeegeneralwaiverssource=new LocalDataSource();
this.hrmsemployeegeneralwaiverssource.load(this.hrmsemployeeservice.hrmsemployeegeneralwaivers as  any as LocalDataSource);
this.hrmsemployeegeneralwaiverssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeegeneralwaiversroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeegeneralwaivers.length == 0)
{
    this.tblhrmsemployeegeneralwaiverssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeegeneralwaiver();
    this.hrmsemployeeservice.hrmsemployeegeneralwaivers.push(obj);
    this.hrmsemployeegeneralwaiverssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeegeneralwaivers.length / this.hrmsemployeegeneralwaiverssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeegeneralwaiverssource.getPaging().page)
    {
        this.hrmsemployeegeneralwaiverssource.setPage((this.hrmsemployeeservice.hrmsemployeegeneralwaivers.length / this.hrmsemployeegeneralwaiverssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeegeneralwaiverssource.grid.edit(this.tblhrmsemployeegeneralwaiverssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeegeneralwaiverssource.data.indexOf(event.data);
this.onDeletehrmsemployeegeneralwaiver(event,event.data.waiverid,((this.hrmsemployeegeneralwaiverssource.getPaging().page-1) *this.hrmsemployeegeneralwaiverssource.getPaging().perPage)+index);
this.hrmsemployeegeneralwaiverssource.refresh();
break;
}
}

*/
hrmsemployeegeneralwaiversroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeegeneralwaiver(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeegeneralwaiver(event,event.data.waiverid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeegeneralwaiver(event,event.data.waiverid,((this.hrmsemployeegeneralwaiverssource.getPaging().page-1) *this.hrmsemployeegeneralwaiverssource.getPaging().perPage)+event.index);
this.hrmsemployeegeneralwaiverssource.refresh();
break;
}
}
hrmsemployeegeneralwaiversonDelete(obj) {
let waiverid=obj.data.waiverid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(waiverid).then(res=>
this.hrmsemployeegeneralwaiversLoadTable()
);
}
}
hrmsemployeegeneralwaiversPaging(val)
{
debugger;
this.hrmsemployeegeneralwaiverssource.setPaging(1, val, true);
}

handlehrmsemployeegeneralwaiversGridSelected(event:any) {
this.hrmsemployeegeneralwaiversselectedindex=this.hrmsemployeeservice.hrmsemployeegeneralwaivers.findIndex(i => i.waiverid === event.data.waiverid);
}
IshrmsemployeegeneralwaiversVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeegeneralwaiversID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeegeneralwaivers
//start of Grid Codes hrmsemployeeinsurances
hrmsemployeeinsurancessettings:any;
hrmsemployeeinsurancessource: any;

showhrmsemployeeinsurancesCheckbox()
{
debugger;
if(this.tblhrmsemployeeinsurancessource.settings['selectMode']== 'multi')this.tblhrmsemployeeinsurancessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeinsurancessource.settings['selectMode']= 'multi';
this.tblhrmsemployeeinsurancessource.initGrid();
}
deletehrmsemployeeinsurancesAll()
{
this.tblhrmsemployeeinsurancessource.settings['selectMode'] = 'single';
}
showhrmsemployeeinsurancesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeinsurancesTableddConfig();
  });
      if(this.tblhrmsemployeeinsurancessource.settings!=null)this.tblhrmsemployeeinsurancessource.settings['hideSubHeader'] =!this.tblhrmsemployeeinsurancessource.settings['hideSubHeader'];
this.tblhrmsemployeeinsurancessource.initGrid();
}
showhrmsemployeeinsurancesInActive()
{
}
enablehrmsemployeeinsurancesInActive()
{
}
async SethrmsemployeeinsurancesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeinsurances){
}
this.bfilterPopulatehrmsemployeeinsurances=true;
}
async hrmsemployeeinsurancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeinsurancesTableConfig()
{
this.hrmsemployeeinsurancessettings = {
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
insuranceno: {
title: 'Insurance No',
type: '',
filter:true,
},
insurancecompany: {
title: 'Insurance Company',
type: '',
filter:true,
},
insurancedate: {
title: 'Insurance Date',
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
},
};
}
hrmsemployeeinsurancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeinsurancesID)>=0)
{
this.hrmsemployeeinsurancessource=new LocalDataSource();
this.hrmsemployeeinsurancessource.load(this.hrmsemployeeservice.hrmsemployeeinsurances as  any as LocalDataSource);
this.hrmsemployeeinsurancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeinsurancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeinsurances.length == 0)
{
    this.tblhrmsemployeeinsurancessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeinsurance();
    this.hrmsemployeeservice.hrmsemployeeinsurances.push(obj);
    this.hrmsemployeeinsurancessource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeinsurances.length / this.hrmsemployeeinsurancessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeinsurancessource.getPaging().page)
    {
        this.hrmsemployeeinsurancessource.setPage((this.hrmsemployeeservice.hrmsemployeeinsurances.length / this.hrmsemployeeinsurancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeinsurancessource.grid.edit(this.tblhrmsemployeeinsurancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeinsurancessource.data.indexOf(event.data);
this.onDeletehrmsemployeeinsurance(event,event.data.employeeid,((this.hrmsemployeeinsurancessource.getPaging().page-1) *this.hrmsemployeeinsurancessource.getPaging().perPage)+index);
this.hrmsemployeeinsurancessource.refresh();
break;
}
}

*/
hrmsemployeeinsurancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeinsurance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeinsurance(event,event.data.employeeid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeinsurance(event,event.data.employeeid,((this.hrmsemployeeinsurancessource.getPaging().page-1) *this.hrmsemployeeinsurancessource.getPaging().perPage)+event.index);
this.hrmsemployeeinsurancessource.refresh();
break;
}
}
hrmsemployeeinsurancesonDelete(obj) {
let employeeid=obj.data.employeeid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(employeeid).then(res=>
this.hrmsemployeeinsurancesLoadTable()
);
}
}
hrmsemployeeinsurancesPaging(val)
{
debugger;
this.hrmsemployeeinsurancessource.setPaging(1, val, true);
}

handlehrmsemployeeinsurancesGridSelected(event:any) {
this.hrmsemployeeinsurancesselectedindex=this.hrmsemployeeservice.hrmsemployeeinsurances.findIndex(i => i.insuranceid === event.data.insuranceid);
}
IshrmsemployeeinsurancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeinsurancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeinsurances
//start of Grid Codes hrmsemployeereportings
hrmsemployeereportingssettings:any;
hrmsemployeereportingssource: any;

showhrmsemployeereportingsCheckbox()
{
debugger;
if(this.tblhrmsemployeereportingssource.settings['selectMode']== 'multi')this.tblhrmsemployeereportingssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeereportingssource.settings['selectMode']= 'multi';
this.tblhrmsemployeereportingssource.initGrid();
}
deletehrmsemployeereportingsAll()
{
this.tblhrmsemployeereportingssource.settings['selectMode'] = 'single';
}
showhrmsemployeereportingsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeereportingsTableddConfig();
  });
      if(this.tblhrmsemployeereportingssource.settings!=null)this.tblhrmsemployeereportingssource.settings['hideSubHeader'] =!this.tblhrmsemployeereportingssource.settings['hideSubHeader'];
this.tblhrmsemployeereportingssource.initGrid();
}
showhrmsemployeereportingsInActive()
{
}
enablehrmsemployeereportingsInActive()
{
}
async SethrmsemployeereportingsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeereportings){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeereportingsroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsemployeereportingsroleid3.push(obj);
}
if((this.tblhrmsemployeereportingssource.settings as any).columns['roleid'])
{
(this.tblhrmsemployeereportingssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeereportingsroleid3));
this.tblhrmsemployeereportingssource.initGrid();
}
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var datareportingto2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeereportingsreportingto3.push(defaultobj);
for(let i=0; i<datareportingto2.length; i++){
var obj= { value: datareportingto2[i].employeeid, title:datareportingto2[i].employeename};
this.datahrmsemployeereportingsreportingto3.push(obj);
}
if((this.tblhrmsemployeereportingssource.settings as any).columns['reportingto'])
{
(this.tblhrmsemployeereportingssource.settings as any).columns['reportingto'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeereportingsreportingto3));
this.tblhrmsemployeereportingssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeereportings=true;
}
async hrmsemployeereportingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeereportingsTableConfig()
{
this.hrmsemployeereportingssettings = {
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
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeereportingsroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reportingto: {
title: 'Reporting To',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeereportingsreportingto3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
kraid: {
title: 'K R A',
type: '',
filter:true,
},
},
};
}
hrmsemployeereportingsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeereportingsID)>=0)
{
this.hrmsemployeereportingssource=new LocalDataSource();
this.hrmsemployeereportingssource.load(this.hrmsemployeeservice.hrmsemployeereportings as  any as LocalDataSource);
this.hrmsemployeereportingssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeereportingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeereportings.length == 0)
{
    this.tblhrmsemployeereportingssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeereporting();
    this.hrmsemployeeservice.hrmsemployeereportings.push(obj);
    this.hrmsemployeereportingssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeereportings.length / this.hrmsemployeereportingssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeereportingssource.getPaging().page)
    {
        this.hrmsemployeereportingssource.setPage((this.hrmsemployeeservice.hrmsemployeereportings.length / this.hrmsemployeereportingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeereportingssource.grid.edit(this.tblhrmsemployeereportingssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeereportingssource.data.indexOf(event.data);
this.onDeletehrmsemployeereporting(event,event.data.reportingid,((this.hrmsemployeereportingssource.getPaging().page-1) *this.hrmsemployeereportingssource.getPaging().perPage)+index);
this.hrmsemployeereportingssource.refresh();
break;
}
}

*/
hrmsemployeereportingsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeereporting(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeereporting(event,event.data.reportingid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeereporting(event,event.data.reportingid,((this.hrmsemployeereportingssource.getPaging().page-1) *this.hrmsemployeereportingssource.getPaging().perPage)+event.index);
this.hrmsemployeereportingssource.refresh();
break;
}
}
hrmsemployeereportingsonDelete(obj) {
let reportingid=obj.data.reportingid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(reportingid).then(res=>
this.hrmsemployeereportingsLoadTable()
);
}
}
hrmsemployeereportingsPaging(val)
{
debugger;
this.hrmsemployeereportingssource.setPaging(1, val, true);
}

handlehrmsemployeereportingsGridSelected(event:any) {
this.hrmsemployeereportingsselectedindex=this.hrmsemployeeservice.hrmsemployeereportings.findIndex(i => i.reportingid === event.data.reportingid);
}
IshrmsemployeereportingsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeereportingsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeereportings
//start of Grid Codes hrmsemployeesalarymasters
hrmsemployeesalarymasterssettings:any;
hrmsemployeesalarymasterssource: any;

showhrmsemployeesalarymastersCheckbox()
{
debugger;
if(this.tblhrmsemployeesalarymasterssource.settings['selectMode']== 'multi')this.tblhrmsemployeesalarymasterssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeesalarymasterssource.settings['selectMode']= 'multi';
this.tblhrmsemployeesalarymasterssource.initGrid();
}
deletehrmsemployeesalarymastersAll()
{
this.tblhrmsemployeesalarymasterssource.settings['selectMode'] = 'single';
}
showhrmsemployeesalarymastersFilter()
{
  setTimeout(() => {
  this.SethrmsemployeesalarymastersTableddConfig();
  });
      if(this.tblhrmsemployeesalarymasterssource.settings!=null)this.tblhrmsemployeesalarymasterssource.settings['hideSubHeader'] =!this.tblhrmsemployeesalarymasterssource.settings['hideSubHeader'];
this.tblhrmsemployeesalarymasterssource.initGrid();
}
showhrmsemployeesalarymastersInActive()
{
}
enablehrmsemployeesalarymastersInActive()
{
}
async SethrmsemployeesalarymastersTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeesalarymasters){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesalarymastersroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsemployeesalarymastersroleid3.push(obj);
}
if((this.tblhrmsemployeesalarymasterssource.settings as any).columns['roleid'])
{
(this.tblhrmsemployeesalarymasterssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeesalarymastersroleid3));
this.tblhrmsemployeesalarymasterssource.initGrid();
}
});

this.configservice.getList("salarytype").then(res=>
{
var datasalarytype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesalarymasterssalarytype3.push(defaultobj);
for(let i=0; i<datasalarytype2.length; i++){
var obj= { value: datasalarytype2[i].configkey, title: datasalarytype2[i].configtext};
this.datahrmsemployeesalarymasterssalarytype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeesalarymasterssource.settings);
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeesalarymasterssalarytype3)), }, };
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeesalarymasterssalarytype3)), }, };
this.tblhrmsemployeesalarymasterssource.settings =  clone;
this.tblhrmsemployeesalarymasterssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeesalarymasters=true;
}
async hrmsemployeesalarymastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeesalarymastersTableConfig()
{
this.hrmsemployeesalarymasterssettings = {
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
effectivedate: {
title: 'Effective Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesalarymastersroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
salarytype: {
title: 'Salary Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesalarymasterssalarytype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
basic: {
title: 'Basic',
type: 'number',
filter:true,
},
allowances: {
title: 'Allowances',
type: 'number',
filter:true,
},
grosssalary: {
title: 'Gross Salary',
type: 'number',
filter:true,
},
deductions: {
title: 'Deductions',
type: 'number',
filter:true,
},
taxallowed: {
title: 'Tax Allowed',
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
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
netsalary: {
title: 'Net Salary',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeesalarymastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesalarymastersID)>=0)
{
this.hrmsemployeesalarymasterssource=new LocalDataSource();
this.hrmsemployeesalarymasterssource.load(this.hrmsemployeeservice.hrmsemployeesalarymasters as  any as LocalDataSource);
this.hrmsemployeesalarymasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeesalarymastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeesalarymasters.length == 0)
{
    this.tblhrmsemployeesalarymasterssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeesalarymaster();
    this.hrmsemployeeservice.hrmsemployeesalarymasters.push(obj);
    this.hrmsemployeesalarymasterssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeesalarymasters.length / this.hrmsemployeesalarymasterssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeesalarymasterssource.getPaging().page)
    {
        this.hrmsemployeesalarymasterssource.setPage((this.hrmsemployeeservice.hrmsemployeesalarymasters.length / this.hrmsemployeesalarymasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeesalarymasterssource.grid.edit(this.tblhrmsemployeesalarymasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeesalarymasterssource.data.indexOf(event.data);
this.onDeletehrmsemployeesalarymaster(event,event.data.salarymasterid,((this.hrmsemployeesalarymasterssource.getPaging().page-1) *this.hrmsemployeesalarymasterssource.getPaging().perPage)+index);
this.hrmsemployeesalarymasterssource.refresh();
break;
}
}

*/
hrmsemployeesalarymastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeesalarymaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeesalarymaster(event,event.data.salarymasterid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeesalarymaster(event,event.data.salarymasterid,((this.hrmsemployeesalarymasterssource.getPaging().page-1) *this.hrmsemployeesalarymasterssource.getPaging().perPage)+event.index);
this.hrmsemployeesalarymasterssource.refresh();
break;
}
}
hrmsemployeesalarymastersonDelete(obj) {
let salarymasterid=obj.data.salarymasterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(salarymasterid).then(res=>
this.hrmsemployeesalarymastersLoadTable()
);
}
}
hrmsemployeesalarymastersPaging(val)
{
debugger;
this.hrmsemployeesalarymasterssource.setPaging(1, val, true);
}

handlehrmsemployeesalarymastersGridSelected(event:any) {
this.hrmsemployeesalarymastersselectedindex=this.hrmsemployeeservice.hrmsemployeesalarymasters.findIndex(i => i.salarymasterid === event.data.salarymasterid);
}
IshrmsemployeesalarymastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesalarymastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeesalarymasters
//start of Grid Codes hrmsemployeesalarymastershistories
hrmsemployeesalarymastershistoriessettings:any;
hrmsemployeesalarymastershistoriessource: any;

showhrmsemployeesalarymastershistoriesCheckbox()
{
debugger;
if(this.tblhrmsemployeesalarymastershistoriessource.settings['selectMode']== 'multi')this.tblhrmsemployeesalarymastershistoriessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeesalarymastershistoriessource.settings['selectMode']= 'multi';
this.tblhrmsemployeesalarymastershistoriessource.initGrid();
}
deletehrmsemployeesalarymastershistoriesAll()
{
this.tblhrmsemployeesalarymastershistoriessource.settings['selectMode'] = 'single';
}
showhrmsemployeesalarymastershistoriesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeesalarymastershistoriesTableddConfig();
  });
      if(this.tblhrmsemployeesalarymastershistoriessource.settings!=null)this.tblhrmsemployeesalarymastershistoriessource.settings['hideSubHeader'] =!this.tblhrmsemployeesalarymastershistoriessource.settings['hideSubHeader'];
this.tblhrmsemployeesalarymastershistoriessource.initGrid();
}
showhrmsemployeesalarymastershistoriesInActive()
{
}
enablehrmsemployeesalarymastershistoriesInActive()
{
}
async SethrmsemployeesalarymastershistoriesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeesalarymastershistories){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesalarymastershistoriesroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsemployeesalarymastershistoriesroleid3.push(obj);
}
if((this.tblhrmsemployeesalarymastershistoriessource.settings as any).columns['roleid'])
{
(this.tblhrmsemployeesalarymastershistoriessource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeesalarymastershistoriesroleid3));
this.tblhrmsemployeesalarymastershistoriessource.initGrid();
}
});

this.configservice.getList("salarytype").then(res=>
{
var datasalarytype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesalarymastershistoriessalarytype3.push(defaultobj);
for(let i=0; i<datasalarytype2.length; i++){
var obj= { value: datasalarytype2[i].configkey, title: datasalarytype2[i].configtext};
this.datahrmsemployeesalarymastershistoriessalarytype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeesalarymastershistoriessource.settings);
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeesalarymastershistoriessalarytype3)), }, };
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeesalarymastershistoriessalarytype3)), }, };
this.tblhrmsemployeesalarymastershistoriessource.settings =  clone;
this.tblhrmsemployeesalarymastershistoriessource.initGrid();
});
}
this.bfilterPopulatehrmsemployeesalarymastershistories=true;
}
async hrmsemployeesalarymastershistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeesalarymastershistoriesTableConfig()
{
this.hrmsemployeesalarymastershistoriessettings = {
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
effectivedate: {
title: 'Effective Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesalarymastershistoriesroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
salarytype: {
title: 'Salary Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesalarymastershistoriessalarytype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
basic: {
title: 'Basic',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeesalarymastershistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesalarymastershistoriesID)>=0)
{
this.hrmsemployeesalarymastershistoriessource=new LocalDataSource();
this.hrmsemployeesalarymastershistoriessource.load(this.hrmsemployeeservice.hrmsemployeesalarymastershistories as  any as LocalDataSource);
this.hrmsemployeesalarymastershistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeesalarymastershistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeesalarymastershistories.length == 0)
{
    this.tblhrmsemployeesalarymastershistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeesalarymastershistory();
    this.hrmsemployeeservice.hrmsemployeesalarymastershistories.push(obj);
    this.hrmsemployeesalarymastershistoriessource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeesalarymastershistories.length / this.hrmsemployeesalarymastershistoriessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeesalarymastershistoriessource.getPaging().page)
    {
        this.hrmsemployeesalarymastershistoriessource.setPage((this.hrmsemployeeservice.hrmsemployeesalarymastershistories.length / this.hrmsemployeesalarymastershistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeesalarymastershistoriessource.grid.edit(this.tblhrmsemployeesalarymastershistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeesalarymastershistoriessource.data.indexOf(event.data);
this.onDeletehrmsemployeesalarymastershistory(event,event.data.salarymasterid,((this.hrmsemployeesalarymastershistoriessource.getPaging().page-1) *this.hrmsemployeesalarymastershistoriessource.getPaging().perPage)+index);
this.hrmsemployeesalarymastershistoriessource.refresh();
break;
}
}

*/
hrmsemployeesalarymastershistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeesalarymastershistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeesalarymastershistory(event,event.data.salarymasterid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeesalarymastershistory(event,event.data.salarymasterid,((this.hrmsemployeesalarymastershistoriessource.getPaging().page-1) *this.hrmsemployeesalarymastershistoriessource.getPaging().perPage)+event.index);
this.hrmsemployeesalarymastershistoriessource.refresh();
break;
}
}
hrmsemployeesalarymastershistoriesonDelete(obj) {
let salarymasterid=obj.data.salarymasterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(salarymasterid).then(res=>
this.hrmsemployeesalarymastershistoriesLoadTable()
);
}
}
hrmsemployeesalarymastershistoriesPaging(val)
{
debugger;
this.hrmsemployeesalarymastershistoriessource.setPaging(1, val, true);
}

handlehrmsemployeesalarymastershistoriesGridSelected(event:any) {
this.hrmsemployeesalarymastershistoriesselectedindex=this.hrmsemployeeservice.hrmsemployeesalarymastershistories.findIndex(i => i.salarymasterid === event.data.salarymasterid);
}
IshrmsemployeesalarymastershistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesalarymastershistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeesalarymastershistories
//start of Grid Codes hrmsemployeesectionwaivers
hrmsemployeesectionwaiverssettings:any;
hrmsemployeesectionwaiverssource: any;

showhrmsemployeesectionwaiversCheckbox()
{
debugger;
if(this.tblhrmsemployeesectionwaiverssource.settings['selectMode']== 'multi')this.tblhrmsemployeesectionwaiverssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeesectionwaiverssource.settings['selectMode']= 'multi';
this.tblhrmsemployeesectionwaiverssource.initGrid();
}
deletehrmsemployeesectionwaiversAll()
{
this.tblhrmsemployeesectionwaiverssource.settings['selectMode'] = 'single';
}
showhrmsemployeesectionwaiversFilter()
{
  setTimeout(() => {
  this.SethrmsemployeesectionwaiversTableddConfig();
  });
      if(this.tblhrmsemployeesectionwaiverssource.settings!=null)this.tblhrmsemployeesectionwaiverssource.settings['hideSubHeader'] =!this.tblhrmsemployeesectionwaiverssource.settings['hideSubHeader'];
this.tblhrmsemployeesectionwaiverssource.initGrid();
}
showhrmsemployeesectionwaiversInActive()
{
}
enablehrmsemployeesectionwaiversInActive()
{
}
async SethrmsemployeesectionwaiversTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeesectionwaivers){

this.bomasterdataservice.getList("khsgr").then(res=>
{
var datadeductionid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesectionwaiversdeductionid3.push(defaultobj);
for(let i=0; i<datadeductionid2.length; i++){
var obj= { value: datadeductionid2[i].masterdataid, title:datadeductionid2[i].masterdatadescription};
this.datahrmsemployeesectionwaiversdeductionid3.push(obj);
}
if((this.tblhrmsemployeesectionwaiverssource.settings as any).columns['deductionid'])
{
(this.tblhrmsemployeesectionwaiverssource.settings as any).columns['deductionid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeesectionwaiversdeductionid3));
this.tblhrmsemployeesectionwaiverssource.initGrid();
}
});

this.bofinancialyearservice.getbofinancialyearsList().then(res=>
{
var datafinancialyear2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeesectionwaiversfinancialyear3.push(defaultobj);
for(let i=0; i<datafinancialyear2.length; i++){
var obj= { value: datafinancialyear2[i].finyearid, title:datafinancialyear2[i].finyearname};
this.datahrmsemployeesectionwaiversfinancialyear3.push(obj);
}
if((this.tblhrmsemployeesectionwaiverssource.settings as any).columns['financialyear'])
{
(this.tblhrmsemployeesectionwaiverssource.settings as any).columns['financialyear'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeesectionwaiversfinancialyear3));
this.tblhrmsemployeesectionwaiverssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeesectionwaivers=true;
}
async hrmsemployeesectionwaiversbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeesectionwaiversTableConfig()
{
this.hrmsemployeesectionwaiverssettings = {
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
deductionid: {
title: 'Deduction',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesectionwaiversdeductionid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
financialyear: {
title: 'Financial Year',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeesectionwaiversfinancialyear3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
sectionwaivername: {
title: 'Section Waiver Name',
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
hrmsemployeesectionwaiversLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesectionwaiversID)>=0)
{
this.hrmsemployeesectionwaiverssource=new LocalDataSource();
this.hrmsemployeesectionwaiverssource.load(this.hrmsemployeeservice.hrmsemployeesectionwaivers as  any as LocalDataSource);
this.hrmsemployeesectionwaiverssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeesectionwaiversroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeesectionwaivers.length == 0)
{
    this.tblhrmsemployeesectionwaiverssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeesectionwaiver();
    this.hrmsemployeeservice.hrmsemployeesectionwaivers.push(obj);
    this.hrmsemployeesectionwaiverssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeesectionwaivers.length / this.hrmsemployeesectionwaiverssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeesectionwaiverssource.getPaging().page)
    {
        this.hrmsemployeesectionwaiverssource.setPage((this.hrmsemployeeservice.hrmsemployeesectionwaivers.length / this.hrmsemployeesectionwaiverssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeesectionwaiverssource.grid.edit(this.tblhrmsemployeesectionwaiverssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeesectionwaiverssource.data.indexOf(event.data);
this.onDeletehrmsemployeesectionwaiver(event,event.data.waiverid,((this.hrmsemployeesectionwaiverssource.getPaging().page-1) *this.hrmsemployeesectionwaiverssource.getPaging().perPage)+index);
this.hrmsemployeesectionwaiverssource.refresh();
break;
}
}

*/
hrmsemployeesectionwaiversroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeesectionwaiver(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeesectionwaiver(event,event.data.waiverid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeesectionwaiver(event,event.data.waiverid,((this.hrmsemployeesectionwaiverssource.getPaging().page-1) *this.hrmsemployeesectionwaiverssource.getPaging().perPage)+event.index);
this.hrmsemployeesectionwaiverssource.refresh();
break;
}
}
hrmsemployeesectionwaiversonDelete(obj) {
let waiverid=obj.data.waiverid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(waiverid).then(res=>
this.hrmsemployeesectionwaiversLoadTable()
);
}
}
hrmsemployeesectionwaiversPaging(val)
{
debugger;
this.hrmsemployeesectionwaiverssource.setPaging(1, val, true);
}

handlehrmsemployeesectionwaiversGridSelected(event:any) {
this.hrmsemployeesectionwaiversselectedindex=this.hrmsemployeeservice.hrmsemployeesectionwaivers.findIndex(i => i.waiverid === event.data.waiverid);
}
IshrmsemployeesectionwaiversVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeesectionwaiversID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeesectionwaivers
//start of Grid Codes hrmsemployeestatutorybenefits
hrmsemployeestatutorybenefitssettings:any;
hrmsemployeestatutorybenefitssource: any;

showhrmsemployeestatutorybenefitsCheckbox()
{
debugger;
if(this.tblhrmsemployeestatutorybenefitssource.settings['selectMode']== 'multi')this.tblhrmsemployeestatutorybenefitssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeestatutorybenefitssource.settings['selectMode']= 'multi';
this.tblhrmsemployeestatutorybenefitssource.initGrid();
}
deletehrmsemployeestatutorybenefitsAll()
{
this.tblhrmsemployeestatutorybenefitssource.settings['selectMode'] = 'single';
}
showhrmsemployeestatutorybenefitsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeestatutorybenefitsTableddConfig();
  });
      if(this.tblhrmsemployeestatutorybenefitssource.settings!=null)this.tblhrmsemployeestatutorybenefitssource.settings['hideSubHeader'] =!this.tblhrmsemployeestatutorybenefitssource.settings['hideSubHeader'];
this.tblhrmsemployeestatutorybenefitssource.initGrid();
}
showhrmsemployeestatutorybenefitsInActive()
{
}
enablehrmsemployeestatutorybenefitsInActive()
{
}
async SethrmsemployeestatutorybenefitsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeestatutorybenefits){

this.hrmsstatutorymasterservice.gethrmsstatutorymastersList().then(res=>
{
var datastatutoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeestatutorybenefitsstatutoryid3.push(defaultobj);
for(let i=0; i<datastatutoryid2.length; i++){
var obj= { value: datastatutoryid2[i].statutoryid, title:datastatutoryid2[i].statutoryname};
this.datahrmsemployeestatutorybenefitsstatutoryid3.push(obj);
}
if((this.tblhrmsemployeestatutorybenefitssource.settings as any).columns['statutoryid'])
{
(this.tblhrmsemployeestatutorybenefitssource.settings as any).columns['statutoryid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeestatutorybenefitsstatutoryid3));
this.tblhrmsemployeestatutorybenefitssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeestatutorybenefits=true;
}
async hrmsemployeestatutorybenefitsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeestatutorybenefitsTableConfig()
{
this.hrmsemployeestatutorybenefitssettings = {
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
statutoryid: {
title: 'Statutory',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeestatutorybenefitsstatutoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromamount: {
title: 'From Amount',
type: 'number',
filter:true,
},
toamount: {
title: 'To Amount',
type: 'number',
filter:true,
},
employerpercentage: {
title: 'Employer Percentage',
type: 'number',
filter:true,
},
employeepercentage: {
title: 'Employee Percentage',
type: 'number',
filter:true,
},
employeramount: {
title: 'Employer Amount',
type: 'number',
filter:true,
},
employeeamount: {
title: 'Employee Amount',
type: 'number',
filter:true,
},
accountreference: {
title: 'Account Reference',
type: '',
filter:true,
},
opendate: {
title: 'Open Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
closeddate: {
title: 'Closed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
info1: {
title: 'Info1',
type: '',
filter:true,
},
info2: {
title: 'Info2',
type: '',
filter:true,
},
},
};
}
hrmsemployeestatutorybenefitsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeestatutorybenefitsID)>=0)
{
this.hrmsemployeestatutorybenefitssource=new LocalDataSource();
this.hrmsemployeestatutorybenefitssource.load(this.hrmsemployeeservice.hrmsemployeestatutorybenefits as  any as LocalDataSource);
this.hrmsemployeestatutorybenefitssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeestatutorybenefitsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeestatutorybenefits.length == 0)
{
    this.tblhrmsemployeestatutorybenefitssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeestatutorybenefit();
    this.hrmsemployeeservice.hrmsemployeestatutorybenefits.push(obj);
    this.hrmsemployeestatutorybenefitssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeestatutorybenefits.length / this.hrmsemployeestatutorybenefitssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeestatutorybenefitssource.getPaging().page)
    {
        this.hrmsemployeestatutorybenefitssource.setPage((this.hrmsemployeeservice.hrmsemployeestatutorybenefits.length / this.hrmsemployeestatutorybenefitssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeestatutorybenefitssource.grid.edit(this.tblhrmsemployeestatutorybenefitssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeestatutorybenefitssource.data.indexOf(event.data);
this.onDeletehrmsemployeestatutorybenefit(event,event.data.esid,((this.hrmsemployeestatutorybenefitssource.getPaging().page-1) *this.hrmsemployeestatutorybenefitssource.getPaging().perPage)+index);
this.hrmsemployeestatutorybenefitssource.refresh();
break;
}
}

*/
hrmsemployeestatutorybenefitsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeestatutorybenefit(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeestatutorybenefit(event,event.data.esid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeestatutorybenefit(event,event.data.esid,((this.hrmsemployeestatutorybenefitssource.getPaging().page-1) *this.hrmsemployeestatutorybenefitssource.getPaging().perPage)+event.index);
this.hrmsemployeestatutorybenefitssource.refresh();
break;
}
}
hrmsemployeestatutorybenefitsonDelete(obj) {
let esid=obj.data.esid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(esid).then(res=>
this.hrmsemployeestatutorybenefitsLoadTable()
);
}
}
hrmsemployeestatutorybenefitsPaging(val)
{
debugger;
this.hrmsemployeestatutorybenefitssource.setPaging(1, val, true);
}

handlehrmsemployeestatutorybenefitsGridSelected(event:any) {
this.hrmsemployeestatutorybenefitsselectedindex=this.hrmsemployeeservice.hrmsemployeestatutorybenefits.findIndex(i => i.esid === event.data.esid);
}
IshrmsemployeestatutorybenefitsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeestatutorybenefitsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeestatutorybenefits
//start of Grid Codes hrmsemployeetaxcalculations
hrmsemployeetaxcalculationssettings:any;
hrmsemployeetaxcalculationssource: any;

showhrmsemployeetaxcalculationsCheckbox()
{
debugger;
if(this.tblhrmsemployeetaxcalculationssource.settings['selectMode']== 'multi')this.tblhrmsemployeetaxcalculationssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeetaxcalculationssource.settings['selectMode']= 'multi';
this.tblhrmsemployeetaxcalculationssource.initGrid();
}
deletehrmsemployeetaxcalculationsAll()
{
this.tblhrmsemployeetaxcalculationssource.settings['selectMode'] = 'single';
}
showhrmsemployeetaxcalculationsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeetaxcalculationsTableddConfig();
  });
      if(this.tblhrmsemployeetaxcalculationssource.settings!=null)this.tblhrmsemployeetaxcalculationssource.settings['hideSubHeader'] =!this.tblhrmsemployeetaxcalculationssource.settings['hideSubHeader'];
this.tblhrmsemployeetaxcalculationssource.initGrid();
}
showhrmsemployeetaxcalculationsInActive()
{
}
enablehrmsemployeetaxcalculationsInActive()
{
}
async SethrmsemployeetaxcalculationsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeetaxcalculations){

this.erptaxmasterservice.geterptaxmastersList().then(res=>
{
var datataxid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetaxcalculationstaxid3.push(defaultobj);
for(let i=0; i<datataxid2.length; i++){
var obj= { value: datataxid2[i].taxid, title:datataxid2[i].taxname};
this.datahrmsemployeetaxcalculationstaxid3.push(obj);
}
if((this.tblhrmsemployeetaxcalculationssource.settings as any).columns['taxid'])
{
(this.tblhrmsemployeetaxcalculationssource.settings as any).columns['taxid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetaxcalculationstaxid3));
this.tblhrmsemployeetaxcalculationssource.initGrid();
}
});

this.bofinancialyearservice.getbofinancialyearsList().then(res=>
{
var datafinancialyear2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetaxcalculationsfinancialyear3.push(defaultobj);
for(let i=0; i<datafinancialyear2.length; i++){
var obj= { value: datafinancialyear2[i].finyearid, title:datafinancialyear2[i].finyearname};
this.datahrmsemployeetaxcalculationsfinancialyear3.push(obj);
}
if((this.tblhrmsemployeetaxcalculationssource.settings as any).columns['financialyear'])
{
(this.tblhrmsemployeetaxcalculationssource.settings as any).columns['financialyear'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetaxcalculationsfinancialyear3));
this.tblhrmsemployeetaxcalculationssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeetaxcalculations=true;
}
async hrmsemployeetaxcalculationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeetaxcalculationsTableConfig()
{
this.hrmsemployeetaxcalculationssettings = {
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
financialyear: {
title: 'Financial Year',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetaxcalculationsfinancialyear3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
totalincome: {
title: 'Total Income',
type: 'number',
filter:true,
},
lessgeneralwaivers: {
title: 'Less General Waivers',
type: 'number',
filter:true,
},
lesssectionwaivers: {
title: 'Less Section Waivers',
type: 'number',
filter:true,
},
taxableincome: {
title: 'Taxable Income',
type: 'number',
filter:true,
},
lesssectionwaiversontaxableincome: {
title: 'Less Section Waiverson Taxable Income',
type: 'number',
filter:true,
},
nettaxamount: {
title: 'Net Tax Amount',
type: 'number',
filter:true,
},
addadditionaltaxontaxamount: {
title: 'Add Additional Taxon Tax Amount',
type: 'number',
filter:true,
},
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
addadditionaltaxontax: {
title: 'Add Additional Taxon Tax',
type: 'number',
filter:true,
},
taxpayable: {
title: 'Tax Payable',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeetaxcalculationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetaxcalculationsID)>=0)
{
this.hrmsemployeetaxcalculationssource=new LocalDataSource();
this.hrmsemployeetaxcalculationssource.load(this.hrmsemployeeservice.hrmsemployeetaxcalculations as  any as LocalDataSource);
this.hrmsemployeetaxcalculationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeetaxcalculationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeetaxcalculations.length == 0)
{
    this.tblhrmsemployeetaxcalculationssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeetaxcalculation();
    this.hrmsemployeeservice.hrmsemployeetaxcalculations.push(obj);
    this.hrmsemployeetaxcalculationssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeetaxcalculations.length / this.hrmsemployeetaxcalculationssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeetaxcalculationssource.getPaging().page)
    {
        this.hrmsemployeetaxcalculationssource.setPage((this.hrmsemployeeservice.hrmsemployeetaxcalculations.length / this.hrmsemployeetaxcalculationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeetaxcalculationssource.grid.edit(this.tblhrmsemployeetaxcalculationssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsemployeetaxcalculationssource.data.indexOf(event.data);
this.onDeletehrmsemployeetaxcalculation(event,event.data.taxid,((this.hrmsemployeetaxcalculationssource.getPaging().page-1) *this.hrmsemployeetaxcalculationssource.getPaging().perPage)+index);
this.hrmsemployeetaxcalculationssource.refresh();
}
break;
}
}

*/
hrmsemployeetaxcalculationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeetaxcalculation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeetaxcalculation(event,event.data.taxid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletehrmsemployeetaxcalculation(event,event.data.taxid,((this.hrmsemployeetaxcalculationssource.getPaging().page-1) *this.hrmsemployeetaxcalculationssource.getPaging().perPage)+event.index);
this.hrmsemployeetaxcalculationssource.refresh();
}
break;
}
}
hrmsemployeetaxcalculationsonDelete(obj) {
let taxid=obj.data.taxid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(taxid).then(res=>
this.hrmsemployeetaxcalculationsLoadTable()
);
}
}
hrmsemployeetaxcalculationsPaging(val)
{
debugger;
this.hrmsemployeetaxcalculationssource.setPaging(1, val, true);
}

handlehrmsemployeetaxcalculationsGridSelected(event:any) {
this.hrmsemployeetaxcalculationsselectedindex=this.hrmsemployeeservice.hrmsemployeetaxcalculations.findIndex(i => i.taxid === event.data.taxid);
}
IshrmsemployeetaxcalculationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetaxcalculationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeetaxcalculations
//start of Grid Codes hrmsemployeetaxdeclarations
hrmsemployeetaxdeclarationssettings:any;
hrmsemployeetaxdeclarationssource: any;

showhrmsemployeetaxdeclarationsCheckbox()
{
debugger;
if(this.tblhrmsemployeetaxdeclarationssource.settings['selectMode']== 'multi')this.tblhrmsemployeetaxdeclarationssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeetaxdeclarationssource.settings['selectMode']= 'multi';
this.tblhrmsemployeetaxdeclarationssource.initGrid();
}
deletehrmsemployeetaxdeclarationsAll()
{
this.tblhrmsemployeetaxdeclarationssource.settings['selectMode'] = 'single';
}
showhrmsemployeetaxdeclarationsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeetaxdeclarationsTableddConfig();
  });
      if(this.tblhrmsemployeetaxdeclarationssource.settings!=null)this.tblhrmsemployeetaxdeclarationssource.settings['hideSubHeader'] =!this.tblhrmsemployeetaxdeclarationssource.settings['hideSubHeader'];
this.tblhrmsemployeetaxdeclarationssource.initGrid();
}
showhrmsemployeetaxdeclarationsInActive()
{
}
enablehrmsemployeetaxdeclarationsInActive()
{
}
async SethrmsemployeetaxdeclarationsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeetaxdeclarations){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetaxdeclarationsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeetaxdeclarationsemployeeid3.push(obj);
}
if((this.tblhrmsemployeetaxdeclarationssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeetaxdeclarationssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetaxdeclarationsemployeeid3));
this.tblhrmsemployeetaxdeclarationssource.initGrid();
}
});

this.bofinancialyearservice.getbofinancialyearsList().then(res=>
{
var datafinancialyear2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetaxdeclarationsfinancialyear3.push(defaultobj);
for(let i=0; i<datafinancialyear2.length; i++){
var obj= { value: datafinancialyear2[i].finyearid, title:datafinancialyear2[i].finyearname};
this.datahrmsemployeetaxdeclarationsfinancialyear3.push(obj);
}
if((this.tblhrmsemployeetaxdeclarationssource.settings as any).columns['financialyear'])
{
(this.tblhrmsemployeetaxdeclarationssource.settings as any).columns['financialyear'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetaxdeclarationsfinancialyear3));
this.tblhrmsemployeetaxdeclarationssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeetaxdeclarations=true;
}
async hrmsemployeetaxdeclarationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeetaxdeclarationsTableConfig()
{
this.hrmsemployeetaxdeclarationssettings = {
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
financialyear: {
title: 'Financial Year',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetaxdeclarationsfinancialyear3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
documentamount: {
title: 'Document Amount',
type: 'number',
filter:true,
},
taxeligibleamount: {
title: 'Tax Eligible Amount',
type: 'number',
filter:true,
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
},
};
}
hrmsemployeetaxdeclarationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetaxdeclarationsID)>=0)
{
this.hrmsemployeetaxdeclarationssource=new LocalDataSource();
this.hrmsemployeetaxdeclarationssource.load(this.hrmsemployeeservice.hrmsemployeetaxdeclarations as  any as LocalDataSource);
this.hrmsemployeetaxdeclarationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeetaxdeclarationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeetaxdeclarations.length == 0)
{
    this.tblhrmsemployeetaxdeclarationssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeetaxdeclaration();
    this.hrmsemployeeservice.hrmsemployeetaxdeclarations.push(obj);
    this.hrmsemployeetaxdeclarationssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeetaxdeclarations.length / this.hrmsemployeetaxdeclarationssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeetaxdeclarationssource.getPaging().page)
    {
        this.hrmsemployeetaxdeclarationssource.setPage((this.hrmsemployeeservice.hrmsemployeetaxdeclarations.length / this.hrmsemployeetaxdeclarationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeetaxdeclarationssource.grid.edit(this.tblhrmsemployeetaxdeclarationssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsemployeetaxdeclarationssource.data.indexOf(event.data);
this.onDeletehrmsemployeetaxdeclaration(event,event.data.declarationid,((this.hrmsemployeetaxdeclarationssource.getPaging().page-1) *this.hrmsemployeetaxdeclarationssource.getPaging().perPage)+index);
this.hrmsemployeetaxdeclarationssource.refresh();
}
break;
}
}

*/
hrmsemployeetaxdeclarationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeetaxdeclaration(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeetaxdeclaration(event,event.data.declarationid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletehrmsemployeetaxdeclaration(event,event.data.declarationid,((this.hrmsemployeetaxdeclarationssource.getPaging().page-1) *this.hrmsemployeetaxdeclarationssource.getPaging().perPage)+event.index);
this.hrmsemployeetaxdeclarationssource.refresh();
}
break;
}
}
hrmsemployeetaxdeclarationsonDelete(obj) {
let declarationid=obj.data.declarationid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(declarationid).then(res=>
this.hrmsemployeetaxdeclarationsLoadTable()
);
}
}
hrmsemployeetaxdeclarationsPaging(val)
{
debugger;
this.hrmsemployeetaxdeclarationssource.setPaging(1, val, true);
}

handlehrmsemployeetaxdeclarationsGridSelected(event:any) {
this.hrmsemployeetaxdeclarationsselectedindex=this.hrmsemployeeservice.hrmsemployeetaxdeclarations.findIndex(i => i.declarationid === event.data.declarationid);
}
IshrmsemployeetaxdeclarationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetaxdeclarationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeetaxdeclarations
//start of Grid Codes hrmssubordinatedetails
hrmssubordinatedetailssettings:any;
hrmssubordinatedetailssource: any;

showhrmssubordinatedetailsCheckbox()
{
debugger;
if(this.tblhrmssubordinatedetailssource.settings['selectMode']== 'multi')this.tblhrmssubordinatedetailssource.settings['selectMode']= 'single';
else
this.tblhrmssubordinatedetailssource.settings['selectMode']= 'multi';
this.tblhrmssubordinatedetailssource.initGrid();
}
deletehrmssubordinatedetailsAll()
{
this.tblhrmssubordinatedetailssource.settings['selectMode'] = 'single';
}
showhrmssubordinatedetailsFilter()
{
  setTimeout(() => {
  this.SethrmssubordinatedetailsTableddConfig();
  });
      if(this.tblhrmssubordinatedetailssource.settings!=null)this.tblhrmssubordinatedetailssource.settings['hideSubHeader'] =!this.tblhrmssubordinatedetailssource.settings['hideSubHeader'];
this.tblhrmssubordinatedetailssource.initGrid();
}
showhrmssubordinatedetailsInActive()
{
}
enablehrmssubordinatedetailsInActive()
{
}
async SethrmssubordinatedetailsTableddConfig()
{
if(!this.bfilterPopulatehrmssubordinatedetails){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssubordinatedetailsroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmssubordinatedetailsroleid3.push(obj);
}
if((this.tblhrmssubordinatedetailssource.settings as any).columns['roleid'])
{
(this.tblhrmssubordinatedetailssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssubordinatedetailsroleid3));
this.tblhrmssubordinatedetailssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datasubordinateto2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmssubordinatedetailssubordinateto3.push(defaultobj);
for(let i=0; i<datasubordinateto2.length; i++){
var obj= { value: datasubordinateto2[i].userid, title:datasubordinateto2[i].username};
this.datahrmssubordinatedetailssubordinateto3.push(obj);
}
if((this.tblhrmssubordinatedetailssource.settings as any).columns['subordinateto'])
{
(this.tblhrmssubordinatedetailssource.settings as any).columns['subordinateto'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmssubordinatedetailssubordinateto3));
this.tblhrmssubordinatedetailssource.initGrid();
}
});
}
this.bfilterPopulatehrmssubordinatedetails=true;
}
async hrmssubordinatedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmssubordinatedetailsTableConfig()
{
this.hrmssubordinatedetailssettings = {
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
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssubordinatedetailsroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
subordinateto: {
title: 'Subordinate To',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmssubordinatedetailssubordinateto3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
kraid: {
title: 'K R A',
type: '',
filter:true,
},
},
};
}
hrmssubordinatedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssubordinatedetailsID)>=0)
{
this.hrmssubordinatedetailssource=new LocalDataSource();
this.hrmssubordinatedetailssource.load(this.hrmsemployeeservice.hrmssubordinatedetails as  any as LocalDataSource);
this.hrmssubordinatedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmssubordinatedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmssubordinatedetails.length == 0)
{
    this.tblhrmssubordinatedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmssubordinatedetail();
    this.hrmsemployeeservice.hrmssubordinatedetails.push(obj);
    this.hrmssubordinatedetailssource.refresh();
    if ((this.hrmsemployeeservice.hrmssubordinatedetails.length / this.hrmssubordinatedetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmssubordinatedetailssource.getPaging().page)
    {
        this.hrmssubordinatedetailssource.setPage((this.hrmsemployeeservice.hrmssubordinatedetails.length / this.hrmssubordinatedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmssubordinatedetailssource.grid.edit(this.tblhrmssubordinatedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmssubordinatedetailssource.data.indexOf(event.data);
this.onDeletehrmssubordinatedetail(event,event.data.subid,((this.hrmssubordinatedetailssource.getPaging().page-1) *this.hrmssubordinatedetailssource.getPaging().perPage)+index);
this.hrmssubordinatedetailssource.refresh();
break;
}
}

*/
hrmssubordinatedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmssubordinatedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmssubordinatedetail(event,event.data.subid,this.formid);
break;
case 'delete':
this.onDeletehrmssubordinatedetail(event,event.data.subid,((this.hrmssubordinatedetailssource.getPaging().page-1) *this.hrmssubordinatedetailssource.getPaging().perPage)+event.index);
this.hrmssubordinatedetailssource.refresh();
break;
}
}
hrmssubordinatedetailsonDelete(obj) {
let subid=obj.data.subid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(subid).then(res=>
this.hrmssubordinatedetailsLoadTable()
);
}
}
hrmssubordinatedetailsPaging(val)
{
debugger;
this.hrmssubordinatedetailssource.setPaging(1, val, true);
}

handlehrmssubordinatedetailsGridSelected(event:any) {
this.hrmssubordinatedetailsselectedindex=this.hrmsemployeeservice.hrmssubordinatedetails.findIndex(i => i.subid === event.data.subid);
}
IshrmssubordinatedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmssubordinatedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmssubordinatedetails
//start of Grid Codes hrmsemployeechecklists
hrmsemployeechecklistssettings:any;
hrmsemployeechecklistssource: any;

showhrmsemployeechecklistsCheckbox()
{
debugger;
if(this.tblhrmsemployeechecklistssource.settings['selectMode']== 'multi')this.tblhrmsemployeechecklistssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeechecklistssource.settings['selectMode']= 'multi';
this.tblhrmsemployeechecklistssource.initGrid();
}
deletehrmsemployeechecklistsAll()
{
this.tblhrmsemployeechecklistssource.settings['selectMode'] = 'single';
}
showhrmsemployeechecklistsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeechecklistsTableddConfig();
  });
      if(this.tblhrmsemployeechecklistssource.settings!=null)this.tblhrmsemployeechecklistssource.settings['hideSubHeader'] =!this.tblhrmsemployeechecklistssource.settings['hideSubHeader'];
this.tblhrmsemployeechecklistssource.initGrid();
}
showhrmsemployeechecklistsInActive()
{
}
enablehrmsemployeechecklistsInActive()
{
}
async SethrmsemployeechecklistsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeechecklists){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeechecklistsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeechecklistsemployeeid3.push(obj);
}
if((this.tblhrmsemployeechecklistssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeechecklistssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeechecklistsemployeeid3));
this.tblhrmsemployeechecklistssource.initGrid();
}
});

this.bomasterdataservice.getList("qnkbi").then(res=>
{
var datacategoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeechecklistscategoryid3.push(defaultobj);
for(let i=0; i<datacategoryid2.length; i++){
var obj= { value: datacategoryid2[i].masterdataid, title:datacategoryid2[i].masterdatadescription};
this.datahrmsemployeechecklistscategoryid3.push(obj);
}
if((this.tblhrmsemployeechecklistssource.settings as any).columns['categoryid'])
{
(this.tblhrmsemployeechecklistssource.settings as any).columns['categoryid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeechecklistscategoryid3));
this.tblhrmsemployeechecklistssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var datasubcategoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeechecklistssubcategoryid3.push(defaultobj);
for(let i=0; i<datasubcategoryid2.length; i++){
var obj= { value: datasubcategoryid2[i].subcategoryid, title:datasubcategoryid2[i].subcategoryname};
this.datahrmsemployeechecklistssubcategoryid3.push(obj);
}
if((this.tblhrmsemployeechecklistssource.settings as any).columns['subcategoryid'])
{
(this.tblhrmsemployeechecklistssource.settings as any).columns['subcategoryid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeechecklistssubcategoryid3));
this.tblhrmsemployeechecklistssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datareceivedby2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeechecklistsreceivedby3.push(defaultobj);
for(let i=0; i<datareceivedby2.length; i++){
var obj= { value: datareceivedby2[i].userid, title:datareceivedby2[i].username};
this.datahrmsemployeechecklistsreceivedby3.push(obj);
}
if((this.tblhrmsemployeechecklistssource.settings as any).columns['receivedby'])
{
(this.tblhrmsemployeechecklistssource.settings as any).columns['receivedby'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeechecklistsreceivedby3));
this.tblhrmsemployeechecklistssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataowner2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeechecklistsowner3.push(defaultobj);
for(let i=0; i<dataowner2.length; i++){
var obj= { value: dataowner2[i].userid, title:dataowner2[i].username};
this.datahrmsemployeechecklistsowner3.push(obj);
}
if((this.tblhrmsemployeechecklistssource.settings as any).columns['owner'])
{
(this.tblhrmsemployeechecklistssource.settings as any).columns['owner'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeechecklistsowner3));
this.tblhrmsemployeechecklistssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeechecklists=true;
}
async hrmsemployeechecklistsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeechecklistsTableConfig()
{
this.hrmsemployeechecklistssettings = {
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
categoryid: {
title: 'Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeechecklistscategoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
subcategoryid: {
title: 'Sub Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeechecklistssubcategoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
documentname: {
title: 'Document Name',
type: '',
filter:true,
},
submitdate: {
title: 'Submit Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
received: {
title: 'Received',
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
receivedby: {
title: 'Received By',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeechecklistsreceivedby3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
receiveddate: {
title: 'Received Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
owner: {
title: 'Owner',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeechecklistsowner3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
},
};
}
hrmsemployeechecklistsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeechecklistsID)>=0)
{
this.hrmsemployeechecklistssource=new LocalDataSource();
this.hrmsemployeechecklistssource.load(this.hrmsemployeeservice.hrmsemployeechecklists as  any as LocalDataSource);
this.hrmsemployeechecklistssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeechecklistsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeechecklists.length == 0)
{
    this.tblhrmsemployeechecklistssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeechecklist();
    this.hrmsemployeeservice.hrmsemployeechecklists.push(obj);
    this.hrmsemployeechecklistssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeechecklists.length / this.hrmsemployeechecklistssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeechecklistssource.getPaging().page)
    {
        this.hrmsemployeechecklistssource.setPage((this.hrmsemployeeservice.hrmsemployeechecklists.length / this.hrmsemployeechecklistssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeechecklistssource.grid.edit(this.tblhrmsemployeechecklistssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeechecklistssource.data.indexOf(event.data);
this.onDeletehrmsemployeechecklist(event,event.data.employeecheckid,((this.hrmsemployeechecklistssource.getPaging().page-1) *this.hrmsemployeechecklistssource.getPaging().perPage)+index);
this.hrmsemployeechecklistssource.refresh();
break;
}
}

*/
hrmsemployeechecklistsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeechecklist(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeechecklist(event,event.data.employeecheckid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeechecklist(event,event.data.employeecheckid,((this.hrmsemployeechecklistssource.getPaging().page-1) *this.hrmsemployeechecklistssource.getPaging().perPage)+event.index);
this.hrmsemployeechecklistssource.refresh();
break;
}
}
hrmsemployeechecklistsonDelete(obj) {
let employeecheckid=obj.data.employeecheckid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(employeecheckid).then(res=>
this.hrmsemployeechecklistsLoadTable()
);
}
}
hrmsemployeechecklistsPaging(val)
{
debugger;
this.hrmsemployeechecklistssource.setPaging(1, val, true);
}

handlehrmsemployeechecklistsGridSelected(event:any) {
this.hrmsemployeechecklistsselectedindex=this.hrmsemployeeservice.hrmsemployeechecklists.findIndex(i => i.employeecheckid === event.data.employeecheckid);
}
IshrmsemployeechecklistsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeechecklistsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeechecklists
//start of Grid Codes hrmsemployeetransfers
hrmsemployeetransferssettings:any;
hrmsemployeetransferssource: any;

showhrmsemployeetransfersCheckbox()
{
debugger;
if(this.tblhrmsemployeetransferssource.settings['selectMode']== 'multi')this.tblhrmsemployeetransferssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeetransferssource.settings['selectMode']= 'multi';
this.tblhrmsemployeetransferssource.initGrid();
}
deletehrmsemployeetransfersAll()
{
this.tblhrmsemployeetransferssource.settings['selectMode'] = 'single';
}
showhrmsemployeetransfersFilter()
{
  setTimeout(() => {
  this.SethrmsemployeetransfersTableddConfig();
  });
      if(this.tblhrmsemployeetransferssource.settings!=null)this.tblhrmsemployeetransferssource.settings['hideSubHeader'] =!this.tblhrmsemployeetransferssource.settings['hideSubHeader'];
this.tblhrmsemployeetransferssource.initGrid();
}
showhrmsemployeetransfersInActive()
{
}
enablehrmsemployeetransfersInActive()
{
}
async SethrmsemployeetransfersTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeetransfers){

this.configservice.getList("transfertype").then(res=>
{
var datatransfertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransferstransfertype3.push(defaultobj);
for(let i=0; i<datatransfertype2.length; i++){
var obj= { value: datatransfertype2[i].configkey, title: datatransfertype2[i].configtext};
this.datahrmsemployeetransferstransfertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetransferssource.settings);
if(clone.columns['transfertype']!=undefined)clone.columns['transfertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferstransfertype3)), }, };
if(clone.columns['transfertype']!=undefined)clone.columns['transfertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferstransfertype3)), }, };
this.tblhrmsemployeetransferssource.settings =  clone;
this.tblhrmsemployeetransferssource.initGrid();
});

this.configservice.getList("transferreason").then(res=>
{
var datatransferreason2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransferstransferreason3.push(defaultobj);
for(let i=0; i<datatransferreason2.length; i++){
var obj= { value: datatransferreason2[i].configkey, title: datatransferreason2[i].configtext};
this.datahrmsemployeetransferstransferreason3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetransferssource.settings);
if(clone.columns['transferreason']!=undefined)clone.columns['transferreason'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferstransferreason3)), }, };
if(clone.columns['transferreason']!=undefined)clone.columns['transferreason'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferstransferreason3)), }, };
this.tblhrmsemployeetransferssource.settings =  clone;
this.tblhrmsemployeetransferssource.initGrid();
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var datacurrentrole2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransferscurrentrole3.push(defaultobj);
for(let i=0; i<datacurrentrole2.length; i++){
var obj= { value: datacurrentrole2[i].userroleid, title:datacurrentrole2[i].userrole};
this.datahrmsemployeetransferscurrentrole3.push(obj);
}
if((this.tblhrmsemployeetransferssource.settings as any).columns['currentrole'])
{
(this.tblhrmsemployeetransferssource.settings as any).columns['currentrole'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetransferscurrentrole3));
this.tblhrmsemployeetransferssource.initGrid();
}
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var datanewrole2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransfersnewrole3.push(defaultobj);
for(let i=0; i<datanewrole2.length; i++){
var obj= { value: datanewrole2[i].userroleid, title:datanewrole2[i].userrole};
this.datahrmsemployeetransfersnewrole3.push(obj);
}
if((this.tblhrmsemployeetransferssource.settings as any).columns['newrole'])
{
(this.tblhrmsemployeetransferssource.settings as any).columns['newrole'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetransfersnewrole3));
this.tblhrmsemployeetransferssource.initGrid();
}
});

this.configservice.getList("currentdesignation").then(res=>
{
var datacurrentdesignation2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransferscurrentdesignation3.push(defaultobj);
for(let i=0; i<datacurrentdesignation2.length; i++){
var obj= { value: datacurrentdesignation2[i].configkey, title: datacurrentdesignation2[i].configtext};
this.datahrmsemployeetransferscurrentdesignation3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetransferssource.settings);
if(clone.columns['currentdesignation']!=undefined)clone.columns['currentdesignation'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferscurrentdesignation3)), }, };
if(clone.columns['currentdesignation']!=undefined)clone.columns['currentdesignation'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransferscurrentdesignation3)), }, };
this.tblhrmsemployeetransferssource.settings =  clone;
this.tblhrmsemployeetransferssource.initGrid();
});

this.configservice.getList("newdesignation").then(res=>
{
var datanewdesignation2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransfersnewdesignation3.push(defaultobj);
for(let i=0; i<datanewdesignation2.length; i++){
var obj= { value: datanewdesignation2[i].configkey, title: datanewdesignation2[i].configtext};
this.datahrmsemployeetransfersnewdesignation3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetransferssource.settings);
if(clone.columns['newdesignation']!=undefined)clone.columns['newdesignation'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransfersnewdesignation3)), }, };
if(clone.columns['newdesignation']!=undefined)clone.columns['newdesignation'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetransfersnewdesignation3)), }, };
this.tblhrmsemployeetransferssource.settings =  clone;
this.tblhrmsemployeetransferssource.initGrid();
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datareportingto2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetransfersreportingto3.push(defaultobj);
for(let i=0; i<datareportingto2.length; i++){
var obj= { value: datareportingto2[i].userid, title:datareportingto2[i].username};
this.datahrmsemployeetransfersreportingto3.push(obj);
}
if((this.tblhrmsemployeetransferssource.settings as any).columns['reportingto'])
{
(this.tblhrmsemployeetransferssource.settings as any).columns['reportingto'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetransfersreportingto3));
this.tblhrmsemployeetransferssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeetransfers=true;
}
async hrmsemployeetransfersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeetransfersTableConfig()
{
this.hrmsemployeetransferssettings = {
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
referenceno: {
title: 'Reference No',
type: '',
filter:true,
},
referencedate: {
title: 'Reference Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
transfertype: {
title: 'Transfer Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransferstransfertype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
transferreason: {
title: 'Transfer Reason',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransferstransferreason3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
effectivedate: {
title: 'Effective Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
currentrole: {
title: 'Current Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'tnf39',reportcode:'tnf39',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransferscurrentrole3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
newrole: {
title: 'New Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransfersnewrole3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
currentdesignation: {
title: 'Current Designation',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransferscurrentdesignation3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
newdesignation: {
title: 'New Designation',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransfersnewdesignation3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reportingto: {
title: 'Reporting To',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetransfersreportingto3.find(c=>c.value==cell);
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeetransfersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetransfersID)>=0)
{
this.hrmsemployeetransferssource=new LocalDataSource();
this.hrmsemployeetransferssource.load(this.hrmsemployeeservice.hrmsemployeetransfers as  any as LocalDataSource);
this.hrmsemployeetransferssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeetransfersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeetransfers.length == 0)
{
    this.tblhrmsemployeetransferssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeetransfer();
    this.hrmsemployeeservice.hrmsemployeetransfers.push(obj);
    this.hrmsemployeetransferssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeetransfers.length / this.hrmsemployeetransferssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeetransferssource.getPaging().page)
    {
        this.hrmsemployeetransferssource.setPage((this.hrmsemployeeservice.hrmsemployeetransfers.length / this.hrmsemployeetransferssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeetransferssource.grid.edit(this.tblhrmsemployeetransferssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeetransferssource.data.indexOf(event.data);
this.onDeletehrmsemployeetransfer(event,event.data.transferid,((this.hrmsemployeetransferssource.getPaging().page-1) *this.hrmsemployeetransferssource.getPaging().perPage)+index);
this.hrmsemployeetransferssource.refresh();
break;
}
}

*/
hrmsemployeetransfersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeetransfer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeetransfer(event,event.data.transferid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeetransfer(event,event.data.transferid,((this.hrmsemployeetransferssource.getPaging().page-1) *this.hrmsemployeetransferssource.getPaging().perPage)+event.index);
this.hrmsemployeetransferssource.refresh();
break;
}
}
hrmsemployeetransfersonDelete(obj) {
let transferid=obj.data.transferid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(transferid).then(res=>
this.hrmsemployeetransfersLoadTable()
);
}
}
hrmsemployeetransfersPaging(val)
{
debugger;
this.hrmsemployeetransferssource.setPaging(1, val, true);
}

handlehrmsemployeetransfersGridSelected(event:any) {
this.hrmsemployeetransfersselectedindex=this.hrmsemployeeservice.hrmsemployeetransfers.findIndex(i => i.transferid === event.data.transferid);
}
IshrmsemployeetransfersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetransfersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeetransfers
//start of Grid Codes hrmsemployeeassets
hrmsemployeeassetssettings:any;
hrmsemployeeassetssource: any;

showhrmsemployeeassetsCheckbox()
{
debugger;
if(this.tblhrmsemployeeassetssource.settings['selectMode']== 'multi')this.tblhrmsemployeeassetssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeassetssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeassetssource.initGrid();
}
deletehrmsemployeeassetsAll()
{
this.tblhrmsemployeeassetssource.settings['selectMode'] = 'single';
}
showhrmsemployeeassetsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeassetsTableddConfig();
  });
      if(this.tblhrmsemployeeassetssource.settings!=null)this.tblhrmsemployeeassetssource.settings['hideSubHeader'] =!this.tblhrmsemployeeassetssource.settings['hideSubHeader'];
this.tblhrmsemployeeassetssource.initGrid();
}
showhrmsemployeeassetsInActive()
{
}
enablehrmsemployeeassetsInActive()
{
}
async SethrmsemployeeassetsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeassets){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeassetsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeeassetsemployeeid3.push(obj);
}
if((this.tblhrmsemployeeassetssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeeassetssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeassetsemployeeid3));
this.tblhrmsemployeeassetssource.initGrid();
}
});

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeassetsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datahrmsemployeeassetsassetid3.push(obj);
}
if((this.tblhrmsemployeeassetssource.settings as any).columns['assetid'])
{
(this.tblhrmsemployeeassetssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeassetsassetid3));
this.tblhrmsemployeeassetssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeassets=true;
}
async hrmsemployeeassetsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeassetsTableConfig()
{
this.hrmsemployeeassetssettings = {
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
assetid: {
title: 'Asset',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'poe5x',reportcode:'poe5x',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeassetsassetid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assetcode: {
title: 'Asset Code',
type: '',
filter:true,
},
assetname: {
title: 'Asset Name',
type: '',
filter:true,
},
assetcheckoutdate: {
title: 'Asset Checkout Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
checkedin: {
title: 'Checked In',
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
assetcheckindate: {
title: 'Asset Check In Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
},
};
}
hrmsemployeeassetsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeassetsID)>=0)
{
this.hrmsemployeeassetssource=new LocalDataSource();
this.hrmsemployeeassetssource.load(this.hrmsemployeeservice.hrmsemployeeassets as  any as LocalDataSource);
this.hrmsemployeeassetssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeassetsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeassets.length == 0)
{
    this.tblhrmsemployeeassetssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeasset();
    this.hrmsemployeeservice.hrmsemployeeassets.push(obj);
    this.hrmsemployeeassetssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeassets.length / this.hrmsemployeeassetssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeassetssource.getPaging().page)
    {
        this.hrmsemployeeassetssource.setPage((this.hrmsemployeeservice.hrmsemployeeassets.length / this.hrmsemployeeassetssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeassetssource.grid.edit(this.tblhrmsemployeeassetssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeassetssource.data.indexOf(event.data);
this.onDeletehrmsemployeeasset(event,event.data.employeeassetid,((this.hrmsemployeeassetssource.getPaging().page-1) *this.hrmsemployeeassetssource.getPaging().perPage)+index);
this.hrmsemployeeassetssource.refresh();
break;
}
}

*/
hrmsemployeeassetsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeasset(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeasset(event,event.data.employeeassetid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeasset(event,event.data.employeeassetid,((this.hrmsemployeeassetssource.getPaging().page-1) *this.hrmsemployeeassetssource.getPaging().perPage)+event.index);
this.hrmsemployeeassetssource.refresh();
break;
}
}
hrmsemployeeassetsonDelete(obj) {
let employeeassetid=obj.data.employeeassetid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(employeeassetid).then(res=>
this.hrmsemployeeassetsLoadTable()
);
}
}
hrmsemployeeassetsPaging(val)
{
debugger;
this.hrmsemployeeassetssource.setPaging(1, val, true);
}

handlehrmsemployeeassetsGridSelected(event:any) {
this.hrmsemployeeassetsselectedindex=this.hrmsemployeeservice.hrmsemployeeassets.findIndex(i => i.employeeassetid === event.data.employeeassetid);
}
IshrmsemployeeassetsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeassetsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeassets
//start of Grid Codes hrmsemployeecareers
hrmsemployeecareerssettings:any;
hrmsemployeecareerssource: any;

showhrmsemployeecareersCheckbox()
{
debugger;
if(this.tblhrmsemployeecareerssource.settings['selectMode']== 'multi')this.tblhrmsemployeecareerssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeecareerssource.settings['selectMode']= 'multi';
this.tblhrmsemployeecareerssource.initGrid();
}
deletehrmsemployeecareersAll()
{
this.tblhrmsemployeecareerssource.settings['selectMode'] = 'single';
}
showhrmsemployeecareersFilter()
{
  setTimeout(() => {
  this.SethrmsemployeecareersTableddConfig();
  });
      if(this.tblhrmsemployeecareerssource.settings!=null)this.tblhrmsemployeecareerssource.settings['hideSubHeader'] =!this.tblhrmsemployeecareerssource.settings['hideSubHeader'];
this.tblhrmsemployeecareerssource.initGrid();
}
showhrmsemployeecareersInActive()
{
}
enablehrmsemployeecareersInActive()
{
}
async SethrmsemployeecareersTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeecareers){

this.configservice.getList("jobfield").then(res=>
{
var datajobfield2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeecareersjobfield3.push(defaultobj);
for(let i=0; i<datajobfield2.length; i++){
var obj= { value: datajobfield2[i].configkey, title: datajobfield2[i].configtext};
this.datahrmsemployeecareersjobfield3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeecareerssource.settings);
if(clone.columns['jobfield']!=undefined)clone.columns['jobfield'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeecareersjobfield3)), }, };
if(clone.columns['jobfield']!=undefined)clone.columns['jobfield'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeecareersjobfield3)), }, };
this.tblhrmsemployeecareerssource.settings =  clone;
this.tblhrmsemployeecareerssource.initGrid();
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var datamappedtoourrole2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeecareersmappedtoourrole3.push(defaultobj);
for(let i=0; i<datamappedtoourrole2.length; i++){
var obj= { value: datamappedtoourrole2[i].userroleid, title:datamappedtoourrole2[i].userrole};
this.datahrmsemployeecareersmappedtoourrole3.push(obj);
}
if((this.tblhrmsemployeecareerssource.settings as any).columns['mappedtoourrole'])
{
(this.tblhrmsemployeecareerssource.settings as any).columns['mappedtoourrole'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeecareersmappedtoourrole3));
this.tblhrmsemployeecareerssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeecareers=true;
}
async hrmsemployeecareersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeecareersTableConfig()
{
this.hrmsemployeecareerssettings = {
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
employer: {
title: 'Employer',
type: '',
filter:true,
},
jobfield: {
title: 'Job Field',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeecareersjobfield3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
designation: {
title: 'Designation',
type: '',
filter:true,
},
mappedtoourrole: {
title: 'Mapped To Our Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeecareersmappedtoourrole3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
totalmonths: {
title: 'Total Months',
type: 'number',
filter:true,
},
ctccurrency: {
title: 'C T C Currency',
type: '',
filter:true,
},
startctcamount: {
title: 'Start C T C Amount',
type: 'number',
filter:true,
},
endctcamount: {
title: 'End C T C Amount',
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeecareersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeecareersID)>=0)
{
this.hrmsemployeecareerssource=new LocalDataSource();
this.hrmsemployeecareerssource.load(this.hrmsemployeeservice.hrmsemployeecareers as  any as LocalDataSource);
this.hrmsemployeecareerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeecareersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeecareers.length == 0)
{
    this.tblhrmsemployeecareerssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeecareer();
    this.hrmsemployeeservice.hrmsemployeecareers.push(obj);
    this.hrmsemployeecareerssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeecareers.length / this.hrmsemployeecareerssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeecareerssource.getPaging().page)
    {
        this.hrmsemployeecareerssource.setPage((this.hrmsemployeeservice.hrmsemployeecareers.length / this.hrmsemployeecareerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeecareerssource.grid.edit(this.tblhrmsemployeecareerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeecareerssource.data.indexOf(event.data);
this.onDeletehrmsemployeecareer(event,event.data.hacid,((this.hrmsemployeecareerssource.getPaging().page-1) *this.hrmsemployeecareerssource.getPaging().perPage)+index);
this.hrmsemployeecareerssource.refresh();
break;
}
}

*/
hrmsemployeecareersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeecareer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeecareer(event,event.data.hacid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeecareer(event,event.data.hacid,((this.hrmsemployeecareerssource.getPaging().page-1) *this.hrmsemployeecareerssource.getPaging().perPage)+event.index);
this.hrmsemployeecareerssource.refresh();
break;
}
}
hrmsemployeecareersonDelete(obj) {
let hacid=obj.data.hacid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(hacid).then(res=>
this.hrmsemployeecareersLoadTable()
);
}
}
hrmsemployeecareersPaging(val)
{
debugger;
this.hrmsemployeecareerssource.setPaging(1, val, true);
}

handlehrmsemployeecareersGridSelected(event:any) {
this.hrmsemployeecareersselectedindex=this.hrmsemployeeservice.hrmsemployeecareers.findIndex(i => i.hacid === event.data.hacid);
}
IshrmsemployeecareersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeecareersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeecareers
//start of Grid Codes hrmsemployeeeducations
hrmsemployeeeducationssettings:any;
hrmsemployeeeducationssource: any;

showhrmsemployeeeducationsCheckbox()
{
debugger;
if(this.tblhrmsemployeeeducationssource.settings['selectMode']== 'multi')this.tblhrmsemployeeeducationssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeeducationssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeeducationssource.initGrid();
}
deletehrmsemployeeeducationsAll()
{
this.tblhrmsemployeeeducationssource.settings['selectMode'] = 'single';
}
showhrmsemployeeeducationsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeeducationsTableddConfig();
  });
      if(this.tblhrmsemployeeeducationssource.settings!=null)this.tblhrmsemployeeeducationssource.settings['hideSubHeader'] =!this.tblhrmsemployeeeducationssource.settings['hideSubHeader'];
this.tblhrmsemployeeeducationssource.initGrid();
}
showhrmsemployeeeducationsInActive()
{
}
enablehrmsemployeeeducationsInActive()
{
}
async SethrmsemployeeeducationsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeeducations){

this.bomasterdataservice.getList("uugg5").then(res=>
{
var dataeducation2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeeducationseducation3.push(defaultobj);
for(let i=0; i<dataeducation2.length; i++){
var obj= { value: dataeducation2[i].masterdataid, title:dataeducation2[i].masterdatadescription};
this.datahrmsemployeeeducationseducation3.push(obj);
}
if((this.tblhrmsemployeeeducationssource.settings as any).columns['education'])
{
(this.tblhrmsemployeeeducationssource.settings as any).columns['education'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeeducationseducation3));
this.tblhrmsemployeeeducationssource.initGrid();
}
});

this.configservice.getList("qualificationmode").then(res=>
{
var dataqualificationmode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeeducationsqualificationmode3.push(defaultobj);
for(let i=0; i<dataqualificationmode2.length; i++){
var obj= { value: dataqualificationmode2[i].configkey, title: dataqualificationmode2[i].configtext};
this.datahrmsemployeeeducationsqualificationmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeeeducationssource.settings);
if(clone.columns['qualificationmode']!=undefined)clone.columns['qualificationmode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationsqualificationmode3)), }, };
if(clone.columns['qualificationmode']!=undefined)clone.columns['qualificationmode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationsqualificationmode3)), }, };
this.tblhrmsemployeeeducationssource.settings =  clone;
this.tblhrmsemployeeeducationssource.initGrid();
});

this.configservice.getList("grade").then(res=>
{
var datagrade2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeeducationsgrade3.push(defaultobj);
for(let i=0; i<datagrade2.length; i++){
var obj= { value: datagrade2[i].configkey, title: datagrade2[i].configtext};
this.datahrmsemployeeeducationsgrade3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeeeducationssource.settings);
if(clone.columns['grade']!=undefined)clone.columns['grade'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationsgrade3)), }, };
if(clone.columns['grade']!=undefined)clone.columns['grade'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationsgrade3)), }, };
this.tblhrmsemployeeeducationssource.settings =  clone;
this.tblhrmsemployeeeducationssource.initGrid();
});

this.configservice.getList("completionstatus").then(res=>
{
var datacompletionstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeeducationscompletionstatus3.push(defaultobj);
for(let i=0; i<datacompletionstatus2.length; i++){
var obj= { value: datacompletionstatus2[i].configkey, title: datacompletionstatus2[i].configtext};
this.datahrmsemployeeeducationscompletionstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeeeducationssource.settings);
if(clone.columns['completionstatus']!=undefined)clone.columns['completionstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationscompletionstatus3)), }, };
if(clone.columns['completionstatus']!=undefined)clone.columns['completionstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeeducationscompletionstatus3)), }, };
this.tblhrmsemployeeeducationssource.settings =  clone;
this.tblhrmsemployeeeducationssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeeeducations=true;
}
async hrmsemployeeeducationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeeducationsTableConfig()
{
this.hrmsemployeeeducationssettings = {
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
education: {
title: 'Education',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeeducationseducation3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
specialization: {
title: 'Specialization',
type: '',
filter:true,
},
institution: {
title: 'Institution',
type: '',
filter:true,
},
countryid: {
title: 'Country',
type: 'number',
filter:true,
},
fromyear: {
title: 'From Year',
type: 'number',
filter:true,
},
toyear: {
title: 'To Year',
type: 'number',
filter:true,
},
qualificationmode: {
title: 'Qualification Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeeducationsqualificationmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
percentage: {
title: 'Percentage',
type: 'number',
filter:true,
},
grade: {
title: 'Grade',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeeducationsgrade3.find(c=>c.value==cell);
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
completionstatus: {
title: 'Completion Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeeducationscompletionstatus3.find(c=>c.value==cell);
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeeeducationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeeducationsID)>=0)
{
this.hrmsemployeeeducationssource=new LocalDataSource();
this.hrmsemployeeeducationssource.load(this.hrmsemployeeservice.hrmsemployeeeducations as  any as LocalDataSource);
this.hrmsemployeeeducationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeeducationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeeducations.length == 0)
{
    this.tblhrmsemployeeeducationssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeeducation();
    this.hrmsemployeeservice.hrmsemployeeeducations.push(obj);
    this.hrmsemployeeeducationssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeeducations.length / this.hrmsemployeeeducationssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeeducationssource.getPaging().page)
    {
        this.hrmsemployeeeducationssource.setPage((this.hrmsemployeeservice.hrmsemployeeeducations.length / this.hrmsemployeeeducationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeeducationssource.grid.edit(this.tblhrmsemployeeeducationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeeducationssource.data.indexOf(event.data);
this.onDeletehrmsemployeeeducation(event,event.data.haeid,((this.hrmsemployeeeducationssource.getPaging().page-1) *this.hrmsemployeeeducationssource.getPaging().perPage)+index);
this.hrmsemployeeeducationssource.refresh();
break;
}
}

*/
hrmsemployeeeducationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeeducation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeeducation(event,event.data.haeid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeeducation(event,event.data.haeid,((this.hrmsemployeeeducationssource.getPaging().page-1) *this.hrmsemployeeeducationssource.getPaging().perPage)+event.index);
this.hrmsemployeeeducationssource.refresh();
break;
}
}
hrmsemployeeeducationsonDelete(obj) {
let haeid=obj.data.haeid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(haeid).then(res=>
this.hrmsemployeeeducationsLoadTable()
);
}
}
hrmsemployeeeducationsPaging(val)
{
debugger;
this.hrmsemployeeeducationssource.setPaging(1, val, true);
}

handlehrmsemployeeeducationsGridSelected(event:any) {
this.hrmsemployeeeducationsselectedindex=this.hrmsemployeeservice.hrmsemployeeeducations.findIndex(i => i.haeid === event.data.haeid);
}
IshrmsemployeeeducationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeeducationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeeducations
//start of Grid Codes hrmsemployeeinfrarequestmasters
hrmsemployeeinfrarequestmasterssettings:any;
hrmsemployeeinfrarequestmasterssource: any;

showhrmsemployeeinfrarequestmastersCheckbox()
{
debugger;
if(this.tblhrmsemployeeinfrarequestmasterssource.settings['selectMode']== 'multi')this.tblhrmsemployeeinfrarequestmasterssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeinfrarequestmasterssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeinfrarequestmasterssource.initGrid();
}
deletehrmsemployeeinfrarequestmastersAll()
{
this.tblhrmsemployeeinfrarequestmasterssource.settings['selectMode'] = 'single';
}
showhrmsemployeeinfrarequestmastersFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeinfrarequestmastersTableddConfig();
  });
      if(this.tblhrmsemployeeinfrarequestmasterssource.settings!=null)this.tblhrmsemployeeinfrarequestmasterssource.settings['hideSubHeader'] =!this.tblhrmsemployeeinfrarequestmasterssource.settings['hideSubHeader'];
this.tblhrmsemployeeinfrarequestmasterssource.initGrid();
}
showhrmsemployeeinfrarequestmastersInActive()
{
}
enablehrmsemployeeinfrarequestmastersInActive()
{
}
async SethrmsemployeeinfrarequestmastersTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeinfrarequestmasters){

this.bomasterdataservice.getList("rkiat").then(res=>
{
var dataassetcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeinfrarequestmastersassetcategory3.push(defaultobj);
for(let i=0; i<dataassetcategory2.length; i++){
var obj= { value: dataassetcategory2[i].masterdataid, title:dataassetcategory2[i].masterdatadescription};
this.datahrmsemployeeinfrarequestmastersassetcategory3.push(obj);
}
if((this.tblhrmsemployeeinfrarequestmasterssource.settings as any).columns['assetcategory'])
{
(this.tblhrmsemployeeinfrarequestmasterssource.settings as any).columns['assetcategory'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeinfrarequestmastersassetcategory3));
this.tblhrmsemployeeinfrarequestmasterssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var dataassetsubcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeinfrarequestmastersassetsubcategory3.push(defaultobj);
for(let i=0; i<dataassetsubcategory2.length; i++){
var obj= { value: dataassetsubcategory2[i].subcategoryid, title:dataassetsubcategory2[i].subcategoryname};
this.datahrmsemployeeinfrarequestmastersassetsubcategory3.push(obj);
}
if((this.tblhrmsemployeeinfrarequestmasterssource.settings as any).columns['assetsubcategory'])
{
(this.tblhrmsemployeeinfrarequestmasterssource.settings as any).columns['assetsubcategory'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeinfrarequestmastersassetsubcategory3));
this.tblhrmsemployeeinfrarequestmasterssource.initGrid();
}
});

this.configservice.getList("returncondition").then(res=>
{
var datareturncondition2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeinfrarequestmastersreturncondition3.push(defaultobj);
for(let i=0; i<datareturncondition2.length; i++){
var obj= { value: datareturncondition2[i].configkey, title: datareturncondition2[i].configtext};
this.datahrmsemployeeinfrarequestmastersreturncondition3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeeinfrarequestmasterssource.settings);
if(clone.columns['returncondition']!=undefined)clone.columns['returncondition'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeinfrarequestmastersreturncondition3)), }, };
if(clone.columns['returncondition']!=undefined)clone.columns['returncondition'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeeinfrarequestmastersreturncondition3)), }, };
this.tblhrmsemployeeinfrarequestmasterssource.settings =  clone;
this.tblhrmsemployeeinfrarequestmasterssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeeinfrarequestmasters=true;
}
async hrmsemployeeinfrarequestmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeinfrarequestmastersTableConfig()
{
this.hrmsemployeeinfrarequestmasterssettings = {
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
infrarequestcode: {
title: 'Infra Request Code',
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
assetcategory: {
title: 'Asset Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeinfrarequestmastersassetcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assetsubcategory: {
title: 'Asset Sub Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeinfrarequestmastersassetsubcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
requiredbefore: {
title: 'Required Before',
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
issuedate: {
title: 'Issue Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
assetreference: {
title: 'Asset Reference',
type: '',
filter:true,
},
returndate: {
title: 'Return Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
returncondition: {
title: 'Return Condition',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeinfrarequestmastersreturncondition3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
returnclaim: {
title: 'Return Claim',
type: '',
filter:true,
},
},
};
}
hrmsemployeeinfrarequestmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeinfrarequestmastersID)>=0)
{
this.hrmsemployeeinfrarequestmasterssource=new LocalDataSource();
this.hrmsemployeeinfrarequestmasterssource.load(this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters as  any as LocalDataSource);
this.hrmsemployeeinfrarequestmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeinfrarequestmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.length == 0)
{
    this.tblhrmsemployeeinfrarequestmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeinfrarequestmaster();
    this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.push(obj);
    this.hrmsemployeeinfrarequestmasterssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.length / this.hrmsemployeeinfrarequestmasterssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeinfrarequestmasterssource.getPaging().page)
    {
        this.hrmsemployeeinfrarequestmasterssource.setPage((this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.length / this.hrmsemployeeinfrarequestmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeinfrarequestmasterssource.grid.edit(this.tblhrmsemployeeinfrarequestmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeinfrarequestmasterssource.data.indexOf(event.data);
this.onDeletehrmsemployeeinfrarequestmaster(event,event.data.infrarequestid,((this.hrmsemployeeinfrarequestmasterssource.getPaging().page-1) *this.hrmsemployeeinfrarequestmasterssource.getPaging().perPage)+index);
this.hrmsemployeeinfrarequestmasterssource.refresh();
break;
}
}

*/
hrmsemployeeinfrarequestmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeinfrarequestmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeinfrarequestmaster(event,event.data.infrarequestid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeinfrarequestmaster(event,event.data.infrarequestid,((this.hrmsemployeeinfrarequestmasterssource.getPaging().page-1) *this.hrmsemployeeinfrarequestmasterssource.getPaging().perPage)+event.index);
this.hrmsemployeeinfrarequestmasterssource.refresh();
break;
}
}
hrmsemployeeinfrarequestmastersonDelete(obj) {
let infrarequestid=obj.data.infrarequestid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(infrarequestid).then(res=>
this.hrmsemployeeinfrarequestmastersLoadTable()
);
}
}
hrmsemployeeinfrarequestmastersPaging(val)
{
debugger;
this.hrmsemployeeinfrarequestmasterssource.setPaging(1, val, true);
}

handlehrmsemployeeinfrarequestmastersGridSelected(event:any) {
this.hrmsemployeeinfrarequestmastersselectedindex=this.hrmsemployeeservice.hrmsemployeeinfrarequestmasters.findIndex(i => i.infrarequestid === event.data.infrarequestid);
}
IshrmsemployeeinfrarequestmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeinfrarequestmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeinfrarequestmasters
//start of Grid Codes hrmsemployerchecklists
hrmsemployerchecklistssettings:any;
hrmsemployerchecklistssource: any;

showhrmsemployerchecklistsCheckbox()
{
debugger;
if(this.tblhrmsemployerchecklistssource.settings['selectMode']== 'multi')this.tblhrmsemployerchecklistssource.settings['selectMode']= 'single';
else
this.tblhrmsemployerchecklistssource.settings['selectMode']= 'multi';
this.tblhrmsemployerchecklistssource.initGrid();
}
deletehrmsemployerchecklistsAll()
{
this.tblhrmsemployerchecklistssource.settings['selectMode'] = 'single';
}
showhrmsemployerchecklistsFilter()
{
  setTimeout(() => {
  this.SethrmsemployerchecklistsTableddConfig();
  });
      if(this.tblhrmsemployerchecklistssource.settings!=null)this.tblhrmsemployerchecklistssource.settings['hideSubHeader'] =!this.tblhrmsemployerchecklistssource.settings['hideSubHeader'];
this.tblhrmsemployerchecklistssource.initGrid();
}
showhrmsemployerchecklistsInActive()
{
}
enablehrmsemployerchecklistsInActive()
{
}
async SethrmsemployerchecklistsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployerchecklists){
}
this.bfilterPopulatehrmsemployerchecklists=true;
}
async hrmsemployerchecklistsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployerchecklistsTableConfig()
{
this.hrmsemployerchecklistssettings = {
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
checkid: {
title: 'Check',
type: 'number',
filter:true,
},
documentname: {
title: 'Document Name',
type: '',
filter:true,
},
submitdate: {
title: 'Submit Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
given: {
title: 'Given',
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
givenby: {
title: 'Given By',
type: 'number',
filter:true,
},
givendate: {
title: 'Given Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
owner: {
title: 'Owner',
type: 'number',
filter:true,
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
},
};
}
hrmsemployerchecklistsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployerchecklistsID)>=0)
{
this.hrmsemployerchecklistssource=new LocalDataSource();
this.hrmsemployerchecklistssource.load(this.hrmsemployeeservice.hrmsemployerchecklists as  any as LocalDataSource);
this.hrmsemployerchecklistssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployerchecklistsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployerchecklists.length == 0)
{
    this.tblhrmsemployerchecklistssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployerchecklist();
    this.hrmsemployeeservice.hrmsemployerchecklists.push(obj);
    this.hrmsemployerchecklistssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployerchecklists.length / this.hrmsemployerchecklistssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployerchecklistssource.getPaging().page)
    {
        this.hrmsemployerchecklistssource.setPage((this.hrmsemployeeservice.hrmsemployerchecklists.length / this.hrmsemployerchecklistssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployerchecklistssource.grid.edit(this.tblhrmsemployerchecklistssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployerchecklistssource.data.indexOf(event.data);
this.onDeletehrmsemployerchecklist(event,event.data.employercheckid,((this.hrmsemployerchecklistssource.getPaging().page-1) *this.hrmsemployerchecklistssource.getPaging().perPage)+index);
this.hrmsemployerchecklistssource.refresh();
break;
}
}

*/
hrmsemployerchecklistsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployerchecklist(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployerchecklist(event,event.data.employercheckid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployerchecklist(event,event.data.employercheckid,((this.hrmsemployerchecklistssource.getPaging().page-1) *this.hrmsemployerchecklistssource.getPaging().perPage)+event.index);
this.hrmsemployerchecklistssource.refresh();
break;
}
}
hrmsemployerchecklistsonDelete(obj) {
let employercheckid=obj.data.employercheckid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(employercheckid).then(res=>
this.hrmsemployerchecklistsLoadTable()
);
}
}
hrmsemployerchecklistsPaging(val)
{
debugger;
this.hrmsemployerchecklistssource.setPaging(1, val, true);
}

handlehrmsemployerchecklistsGridSelected(event:any) {
this.hrmsemployerchecklistsselectedindex=this.hrmsemployeeservice.hrmsemployerchecklists.findIndex(i => i.employercheckid === event.data.employercheckid);
}
IshrmsemployerchecklistsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployerchecklistsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployerchecklists
//start of Grid Codes hrmsemployeemonthlysalarymasters
hrmsemployeemonthlysalarymasterssettings:any;
hrmsemployeemonthlysalarymasterssource: any;

showhrmsemployeemonthlysalarymastersCheckbox()
{
debugger;
if(this.tblhrmsemployeemonthlysalarymasterssource.settings['selectMode']== 'multi')this.tblhrmsemployeemonthlysalarymasterssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeemonthlysalarymasterssource.settings['selectMode']= 'multi';
this.tblhrmsemployeemonthlysalarymasterssource.initGrid();
}
deletehrmsemployeemonthlysalarymastersAll()
{
this.tblhrmsemployeemonthlysalarymasterssource.settings['selectMode'] = 'single';
}
showhrmsemployeemonthlysalarymastersFilter()
{
  setTimeout(() => {
  this.SethrmsemployeemonthlysalarymastersTableddConfig();
  });
      if(this.tblhrmsemployeemonthlysalarymasterssource.settings!=null)this.tblhrmsemployeemonthlysalarymasterssource.settings['hideSubHeader'] =!this.tblhrmsemployeemonthlysalarymasterssource.settings['hideSubHeader'];
this.tblhrmsemployeemonthlysalarymasterssource.initGrid();
}
showhrmsemployeemonthlysalarymastersInActive()
{
}
enablehrmsemployeemonthlysalarymastersInActive()
{
}
async SethrmsemployeemonthlysalarymastersTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeemonthlysalarymasters){

this.configservice.getList("month").then(res=>
{
var datamonth2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlysalarymastersmonth3.push(defaultobj);
for(let i=0; i<datamonth2.length; i++){
var obj= { value: datamonth2[i].configkey, title: datamonth2[i].configtext};
this.datahrmsemployeemonthlysalarymastersmonth3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeemonthlysalarymasterssource.settings);
if(clone.columns['month']!=undefined)clone.columns['month'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeemonthlysalarymastersmonth3)), }, };
if(clone.columns['month']!=undefined)clone.columns['month'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeemonthlysalarymastersmonth3)), }, };
this.tblhrmsemployeemonthlysalarymasterssource.settings =  clone;
this.tblhrmsemployeemonthlysalarymasterssource.initGrid();
});

this.configservice.getList("salarytype").then(res=>
{
var datasalarytype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlysalarymasterssalarytype3.push(defaultobj);
for(let i=0; i<datasalarytype2.length; i++){
var obj= { value: datasalarytype2[i].configkey, title: datasalarytype2[i].configtext};
this.datahrmsemployeemonthlysalarymasterssalarytype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeemonthlysalarymasterssource.settings);
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeemonthlysalarymasterssalarytype3)), }, };
if(clone.columns['salarytype']!=undefined)clone.columns['salarytype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeemonthlysalarymasterssalarytype3)), }, };
this.tblhrmsemployeemonthlysalarymasterssource.settings =  clone;
this.tblhrmsemployeemonthlysalarymasterssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeemonthlysalarymasters=true;
}
async hrmsemployeemonthlysalarymastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeemonthlysalarymastersTableConfig()
{
this.hrmsemployeemonthlysalarymasterssettings = {
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
month: {
title: 'Month',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeemonthlysalarymastersmonth3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
year: {
title: 'Year',
type: 'number',
filter:true,
},
salarytype: {
title: 'Salary Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeemonthlysalarymasterssalarytype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
basic: {
title: 'Basic',
type: 'number',
filter:true,
},
grosssalary: {
title: 'Gross Salary',
type: 'number',
filter:true,
},
deductions: {
title: 'Deductions',
type: 'number',
filter:true,
},
netsalary: {
title: 'Net Salary',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeemonthlysalarymastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemonthlysalarymastersID)>=0)
{
this.hrmsemployeemonthlysalarymasterssource=new LocalDataSource();
this.hrmsemployeemonthlysalarymasterssource.load(this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters as  any as LocalDataSource);
this.hrmsemployeemonthlysalarymasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeemonthlysalarymastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.length == 0)
{
    this.tblhrmsemployeemonthlysalarymasterssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeemonthlysalarymaster();
    this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.push(obj);
    this.hrmsemployeemonthlysalarymasterssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.length / this.hrmsemployeemonthlysalarymasterssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeemonthlysalarymasterssource.getPaging().page)
    {
        this.hrmsemployeemonthlysalarymasterssource.setPage((this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.length / this.hrmsemployeemonthlysalarymasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeemonthlysalarymasterssource.grid.edit(this.tblhrmsemployeemonthlysalarymasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsemployeemonthlysalarymasterssource.data.indexOf(event.data);
this.onDeletehrmsemployeemonthlysalarymaster(event,event.data.salid,((this.hrmsemployeemonthlysalarymasterssource.getPaging().page-1) *this.hrmsemployeemonthlysalarymasterssource.getPaging().perPage)+index);
this.hrmsemployeemonthlysalarymasterssource.refresh();
}
break;
}
}

*/
hrmsemployeemonthlysalarymastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeemonthlysalarymaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeemonthlysalarymaster(event,event.data.salid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletehrmsemployeemonthlysalarymaster(event,event.data.salid,((this.hrmsemployeemonthlysalarymasterssource.getPaging().page-1) *this.hrmsemployeemonthlysalarymasterssource.getPaging().perPage)+event.index);
this.hrmsemployeemonthlysalarymasterssource.refresh();
}
break;
}
}
hrmsemployeemonthlysalarymastersonDelete(obj) {
let salid=obj.data.salid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(salid).then(res=>
this.hrmsemployeemonthlysalarymastersLoadTable()
);
}
}
hrmsemployeemonthlysalarymastersPaging(val)
{
debugger;
this.hrmsemployeemonthlysalarymasterssource.setPaging(1, val, true);
}

handlehrmsemployeemonthlysalarymastersGridSelected(event:any) {
this.hrmsemployeemonthlysalarymastersselectedindex=this.hrmsemployeeservice.hrmsemployeemonthlysalarymasters.findIndex(i => i.salid === event.data.salid);
}
IshrmsemployeemonthlysalarymastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemonthlysalarymastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeemonthlysalarymasters
//start of Grid Codes hrmsemployeekras
hrmsemployeekrassettings:any;
hrmsemployeekrassource: any;

showhrmsemployeekrasCheckbox()
{
debugger;
if(this.tblhrmsemployeekrassource.settings['selectMode']== 'multi')this.tblhrmsemployeekrassource.settings['selectMode']= 'single';
else
this.tblhrmsemployeekrassource.settings['selectMode']= 'multi';
this.tblhrmsemployeekrassource.initGrid();
}
deletehrmsemployeekrasAll()
{
this.tblhrmsemployeekrassource.settings['selectMode'] = 'single';
}
showhrmsemployeekrasFilter()
{
  setTimeout(() => {
  this.SethrmsemployeekrasTableddConfig();
  });
      if(this.tblhrmsemployeekrassource.settings!=null)this.tblhrmsemployeekrassource.settings['hideSubHeader'] =!this.tblhrmsemployeekrassource.settings['hideSubHeader'];
this.tblhrmsemployeekrassource.initGrid();
}
showhrmsemployeekrasInActive()
{
}
enablehrmsemployeekrasInActive()
{
}
async SethrmsemployeekrasTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeekras){

this.hrmskramasterservice.gethrmskramastersList().then(res=>
{
var datakraid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeekraskraid3.push(defaultobj);
for(let i=0; i<datakraid2.length; i++){
var obj= { value: datakraid2[i].kraid, title:datakraid2[i].kraname};
this.datahrmsemployeekraskraid3.push(obj);
}
if((this.tblhrmsemployeekrassource.settings as any).columns['kraid'])
{
(this.tblhrmsemployeekrassource.settings as any).columns['kraid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeekraskraid3));
this.tblhrmsemployeekrassource.initGrid();
}
});

this.hrmskpimasterservice.gethrmskpimastersList().then(res=>
{
var datakpiid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeekraskpiid3.push(defaultobj);
for(let i=0; i<datakpiid2.length; i++){
var obj= { value: datakpiid2[i].kpiid, title:datakpiid2[i].kpidescription};
this.datahrmsemployeekraskpiid3.push(obj);
}
if((this.tblhrmsemployeekrassource.settings as any).columns['kpiid'])
{
(this.tblhrmsemployeekrassource.settings as any).columns['kpiid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeekraskpiid3));
this.tblhrmsemployeekrassource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeekras=true;
}
async hrmsemployeekrasbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeekrasTableConfig()
{
this.hrmsemployeekrassettings = {
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
kraid: {
title: 'K R A',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeekraskraid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
kpiid: {
title: 'K P I',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeekraskpiid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expectedvalue: {
title: 'Expected Value',
type: 'number',
filter:true,
},
actualvalue: {
title: 'Actual Value',
type: 'number',
filter:true,
},
plannedweightage: {
title: 'Planned Weightage',
type: 'number',
filter:true,
},
actualweightage: {
title: 'Actual Weightage',
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeekrasLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeekrasID)>=0)
{
this.hrmsemployeekrassource=new LocalDataSource();
this.hrmsemployeekrassource.load(this.hrmsemployeeservice.hrmsemployeekras as  any as LocalDataSource);
this.hrmsemployeekrassource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeekrasroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeekras.length == 0)
{
    this.tblhrmsemployeekrassource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeekra();
    this.hrmsemployeeservice.hrmsemployeekras.push(obj);
    this.hrmsemployeekrassource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeekras.length / this.hrmsemployeekrassource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeekrassource.getPaging().page)
    {
        this.hrmsemployeekrassource.setPage((this.hrmsemployeeservice.hrmsemployeekras.length / this.hrmsemployeekrassource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeekrassource.grid.edit(this.tblhrmsemployeekrassource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeekrassource.data.indexOf(event.data);
this.onDeletehrmsemployeekra(event,event.data.empkraid,((this.hrmsemployeekrassource.getPaging().page-1) *this.hrmsemployeekrassource.getPaging().perPage)+index);
this.hrmsemployeekrassource.refresh();
break;
}
}

*/
hrmsemployeekrasroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeekra(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeekra(event,event.data.empkraid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeekra(event,event.data.empkraid,((this.hrmsemployeekrassource.getPaging().page-1) *this.hrmsemployeekrassource.getPaging().perPage)+event.index);
this.hrmsemployeekrassource.refresh();
break;
}
}
hrmsemployeekrasonDelete(obj) {
let empkraid=obj.data.empkraid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(empkraid).then(res=>
this.hrmsemployeekrasLoadTable()
);
}
}
hrmsemployeekrasPaging(val)
{
debugger;
this.hrmsemployeekrassource.setPaging(1, val, true);
}

handlehrmsemployeekrasGridSelected(event:any) {
this.hrmsemployeekrasselectedindex=this.hrmsemployeeservice.hrmsemployeekras.findIndex(i => i.empkraid === event.data.empkraid);
}
IshrmsemployeekrasVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeekrasID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeekras
//start of Grid Codes hrmsemployeelanguageskills
hrmsemployeelanguageskillssettings:any;
hrmsemployeelanguageskillssource: any;

showhrmsemployeelanguageskillsCheckbox()
{
debugger;
if(this.tblhrmsemployeelanguageskillssource.settings['selectMode']== 'multi')this.tblhrmsemployeelanguageskillssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeelanguageskillssource.settings['selectMode']= 'multi';
this.tblhrmsemployeelanguageskillssource.initGrid();
}
deletehrmsemployeelanguageskillsAll()
{
this.tblhrmsemployeelanguageskillssource.settings['selectMode'] = 'single';
}
showhrmsemployeelanguageskillsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeelanguageskillsTableddConfig();
  });
      if(this.tblhrmsemployeelanguageskillssource.settings!=null)this.tblhrmsemployeelanguageskillssource.settings['hideSubHeader'] =!this.tblhrmsemployeelanguageskillssource.settings['hideSubHeader'];
this.tblhrmsemployeelanguageskillssource.initGrid();
}
showhrmsemployeelanguageskillsInActive()
{
}
enablehrmsemployeelanguageskillsInActive()
{
}
async SethrmsemployeelanguageskillsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeelanguageskills){

this.configservice.getList("language").then(res=>
{
var datalanguage2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeelanguageskillslanguage3.push(defaultobj);
for(let i=0; i<datalanguage2.length; i++){
var obj= { value: datalanguage2[i].configkey, title: datalanguage2[i].configtext};
this.datahrmsemployeelanguageskillslanguage3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeelanguageskillssource.settings);
if(clone.columns['language']!=undefined)clone.columns['language'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillslanguage3)), }, };
if(clone.columns['language']!=undefined)clone.columns['language'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillslanguage3)), }, };
this.tblhrmsemployeelanguageskillssource.settings =  clone;
this.tblhrmsemployeelanguageskillssource.initGrid();
});

this.configservice.getList("readinglevel").then(res=>
{
var datareadinglevel2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeelanguageskillsreadinglevel3.push(defaultobj);
for(let i=0; i<datareadinglevel2.length; i++){
var obj= { value: datareadinglevel2[i].configkey, title: datareadinglevel2[i].configtext};
this.datahrmsemployeelanguageskillsreadinglevel3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeelanguageskillssource.settings);
if(clone.columns['readinglevel']!=undefined)clone.columns['readinglevel'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillsreadinglevel3)), }, };
if(clone.columns['readinglevel']!=undefined)clone.columns['readinglevel'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillsreadinglevel3)), }, };
this.tblhrmsemployeelanguageskillssource.settings =  clone;
this.tblhrmsemployeelanguageskillssource.initGrid();
});

this.configservice.getList("writinglevel").then(res=>
{
var datawritinglevel2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeelanguageskillswritinglevel3.push(defaultobj);
for(let i=0; i<datawritinglevel2.length; i++){
var obj= { value: datawritinglevel2[i].configkey, title: datawritinglevel2[i].configtext};
this.datahrmsemployeelanguageskillswritinglevel3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeelanguageskillssource.settings);
if(clone.columns['writinglevel']!=undefined)clone.columns['writinglevel'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillswritinglevel3)), }, };
if(clone.columns['writinglevel']!=undefined)clone.columns['writinglevel'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillswritinglevel3)), }, };
this.tblhrmsemployeelanguageskillssource.settings =  clone;
this.tblhrmsemployeelanguageskillssource.initGrid();
});

this.configservice.getList("speakinglevel").then(res=>
{
var dataspeakinglevel2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeelanguageskillsspeakinglevel3.push(defaultobj);
for(let i=0; i<dataspeakinglevel2.length; i++){
var obj= { value: dataspeakinglevel2[i].configkey, title: dataspeakinglevel2[i].configtext};
this.datahrmsemployeelanguageskillsspeakinglevel3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeelanguageskillssource.settings);
if(clone.columns['speakinglevel']!=undefined)clone.columns['speakinglevel'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillsspeakinglevel3)), }, };
if(clone.columns['speakinglevel']!=undefined)clone.columns['speakinglevel'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelanguageskillsspeakinglevel3)), }, };
this.tblhrmsemployeelanguageskillssource.settings =  clone;
this.tblhrmsemployeelanguageskillssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeelanguageskills=true;
}
async hrmsemployeelanguageskillsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeelanguageskillsTableConfig()
{
this.hrmsemployeelanguageskillssettings = {
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
language: {
title: 'Language',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeelanguageskillslanguage3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
reading: {
title: 'Reading',
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
readinglevel: {
title: 'Reading Level',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeelanguageskillsreadinglevel3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
write: {
title: 'Write',
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
writinglevel: {
title: 'Writing Level',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeelanguageskillswritinglevel3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
speak: {
title: 'Speak',
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
speakinglevel: {
title: 'Speaking Level',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeelanguageskillsspeakinglevel3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
knownsince: {
title: 'Known Since',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
lastused: {
title: 'Last Used',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
},
};
}
hrmsemployeelanguageskillsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeelanguageskillsID)>=0)
{
this.hrmsemployeelanguageskillssource=new LocalDataSource();
this.hrmsemployeelanguageskillssource.load(this.hrmsemployeeservice.hrmsemployeelanguageskills as  any as LocalDataSource);
this.hrmsemployeelanguageskillssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeelanguageskillsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeelanguageskills.length == 0)
{
    this.tblhrmsemployeelanguageskillssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeelanguageskill();
    this.hrmsemployeeservice.hrmsemployeelanguageskills.push(obj);
    this.hrmsemployeelanguageskillssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeelanguageskills.length / this.hrmsemployeelanguageskillssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeelanguageskillssource.getPaging().page)
    {
        this.hrmsemployeelanguageskillssource.setPage((this.hrmsemployeeservice.hrmsemployeelanguageskills.length / this.hrmsemployeelanguageskillssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeelanguageskillssource.grid.edit(this.tblhrmsemployeelanguageskillssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeelanguageskillssource.data.indexOf(event.data);
this.onDeletehrmsemployeelanguageskill(event,event.data.empkraid,((this.hrmsemployeelanguageskillssource.getPaging().page-1) *this.hrmsemployeelanguageskillssource.getPaging().perPage)+index);
this.hrmsemployeelanguageskillssource.refresh();
break;
}
}

*/
hrmsemployeelanguageskillsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeelanguageskill(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeelanguageskill(event,event.data.empkraid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeelanguageskill(event,event.data.empkraid,((this.hrmsemployeelanguageskillssource.getPaging().page-1) *this.hrmsemployeelanguageskillssource.getPaging().perPage)+event.index);
this.hrmsemployeelanguageskillssource.refresh();
break;
}
}
hrmsemployeelanguageskillsonDelete(obj) {
let empkraid=obj.data.empkraid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(empkraid).then(res=>
this.hrmsemployeelanguageskillsLoadTable()
);
}
}
hrmsemployeelanguageskillsPaging(val)
{
debugger;
this.hrmsemployeelanguageskillssource.setPaging(1, val, true);
}

handlehrmsemployeelanguageskillsGridSelected(event:any) {
this.hrmsemployeelanguageskillsselectedindex=this.hrmsemployeeservice.hrmsemployeelanguageskills.findIndex(i => i.languageid === event.data.languageid);
}
IshrmsemployeelanguageskillsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeelanguageskillsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeelanguageskills
//start of Grid Codes hrmsemployeelettermanagements
hrmsemployeelettermanagementssettings:any;
hrmsemployeelettermanagementssource: any;

showhrmsemployeelettermanagementsCheckbox()
{
debugger;
if(this.tblhrmsemployeelettermanagementssource.settings['selectMode']== 'multi')this.tblhrmsemployeelettermanagementssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeelettermanagementssource.settings['selectMode']= 'multi';
this.tblhrmsemployeelettermanagementssource.initGrid();
}
deletehrmsemployeelettermanagementsAll()
{
this.tblhrmsemployeelettermanagementssource.settings['selectMode'] = 'single';
}
showhrmsemployeelettermanagementsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeelettermanagementsTableddConfig();
  });
      if(this.tblhrmsemployeelettermanagementssource.settings!=null)this.tblhrmsemployeelettermanagementssource.settings['hideSubHeader'] =!this.tblhrmsemployeelettermanagementssource.settings['hideSubHeader'];
this.tblhrmsemployeelettermanagementssource.initGrid();
}
showhrmsemployeelettermanagementsInActive()
{
}
enablehrmsemployeelettermanagementsInActive()
{
}
async SethrmsemployeelettermanagementsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeelettermanagements){

this.configservice.getList("lettercategory").then(res=>
{
var datalettercategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeelettermanagementslettercategory3.push(defaultobj);
for(let i=0; i<datalettercategory2.length; i++){
var obj= { value: datalettercategory2[i].configkey, title: datalettercategory2[i].configtext};
this.datahrmsemployeelettermanagementslettercategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeelettermanagementssource.settings);
if(clone.columns['lettercategory']!=undefined)clone.columns['lettercategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelettermanagementslettercategory3)), }, };
if(clone.columns['lettercategory']!=undefined)clone.columns['lettercategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeelettermanagementslettercategory3)), }, };
this.tblhrmsemployeelettermanagementssource.settings =  clone;
this.tblhrmsemployeelettermanagementssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeelettermanagements=true;
}
async hrmsemployeelettermanagementsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeelettermanagementsTableConfig()
{
this.hrmsemployeelettermanagementssettings = {
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
date: {
title: 'Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
lettercategory: {
title: 'Letter Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeelettermanagementslettercategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
template: {
title: 'Template',
type: '',
filter:true,
},
letterdetails: {
title: 'Letter Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
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
},
};
}
hrmsemployeelettermanagementsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeelettermanagementsID)>=0)
{
this.hrmsemployeelettermanagementssource=new LocalDataSource();
this.hrmsemployeelettermanagementssource.load(this.hrmsemployeeservice.hrmsemployeelettermanagements as  any as LocalDataSource);
this.hrmsemployeelettermanagementssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeelettermanagementsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeelettermanagements.length == 0)
{
    this.tblhrmsemployeelettermanagementssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeelettermanagement();
    this.hrmsemployeeservice.hrmsemployeelettermanagements.push(obj);
    this.hrmsemployeelettermanagementssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeelettermanagements.length / this.hrmsemployeelettermanagementssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeelettermanagementssource.getPaging().page)
    {
        this.hrmsemployeelettermanagementssource.setPage((this.hrmsemployeeservice.hrmsemployeelettermanagements.length / this.hrmsemployeelettermanagementssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeelettermanagementssource.grid.edit(this.tblhrmsemployeelettermanagementssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeelettermanagementssource.data.indexOf(event.data);
this.onDeletehrmsemployeelettermanagement(event,event.data.letterid,((this.hrmsemployeelettermanagementssource.getPaging().page-1) *this.hrmsemployeelettermanagementssource.getPaging().perPage)+index);
this.hrmsemployeelettermanagementssource.refresh();
break;
}
}

*/
hrmsemployeelettermanagementsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeelettermanagement(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeelettermanagement(event,event.data.letterid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeelettermanagement(event,event.data.letterid,((this.hrmsemployeelettermanagementssource.getPaging().page-1) *this.hrmsemployeelettermanagementssource.getPaging().perPage)+event.index);
this.hrmsemployeelettermanagementssource.refresh();
break;
}
}
hrmsemployeelettermanagementsonDelete(obj) {
let letterid=obj.data.letterid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(letterid).then(res=>
this.hrmsemployeelettermanagementsLoadTable()
);
}
}
hrmsemployeelettermanagementsPaging(val)
{
debugger;
this.hrmsemployeelettermanagementssource.setPaging(1, val, true);
}

handlehrmsemployeelettermanagementsGridSelected(event:any) {
this.hrmsemployeelettermanagementsselectedindex=this.hrmsemployeeservice.hrmsemployeelettermanagements.findIndex(i => i.letterid === event.data.letterid);
}
IshrmsemployeelettermanagementsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeelettermanagementsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeelettermanagements
//start of Grid Codes hrmsemployeemembershipdetails
hrmsemployeemembershipdetailssettings:any;
hrmsemployeemembershipdetailssource: any;

showhrmsemployeemembershipdetailsCheckbox()
{
debugger;
if(this.tblhrmsemployeemembershipdetailssource.settings['selectMode']== 'multi')this.tblhrmsemployeemembershipdetailssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeemembershipdetailssource.settings['selectMode']= 'multi';
this.tblhrmsemployeemembershipdetailssource.initGrid();
}
deletehrmsemployeemembershipdetailsAll()
{
this.tblhrmsemployeemembershipdetailssource.settings['selectMode'] = 'single';
}
showhrmsemployeemembershipdetailsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeemembershipdetailsTableddConfig();
  });
      if(this.tblhrmsemployeemembershipdetailssource.settings!=null)this.tblhrmsemployeemembershipdetailssource.settings['hideSubHeader'] =!this.tblhrmsemployeemembershipdetailssource.settings['hideSubHeader'];
this.tblhrmsemployeemembershipdetailssource.initGrid();
}
showhrmsemployeemembershipdetailsInActive()
{
}
enablehrmsemployeemembershipdetailsInActive()
{
}
async SethrmsemployeemembershipdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeemembershipdetails){
}
this.bfilterPopulatehrmsemployeemembershipdetails=true;
}
async hrmsemployeemembershipdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeemembershipdetailsTableConfig()
{
this.hrmsemployeemembershipdetailssettings = {
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
category: {
title: 'Category',
type: '',
filter:true,
},
institution: {
title: 'Institution',
type: '',
filter:true,
},
reference: {
title: 'Reference',
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
expirydate: {
title: 'Expiry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
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
},
};
}
hrmsemployeemembershipdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemembershipdetailsID)>=0)
{
this.hrmsemployeemembershipdetailssource=new LocalDataSource();
this.hrmsemployeemembershipdetailssource.load(this.hrmsemployeeservice.hrmsemployeemembershipdetails as  any as LocalDataSource);
this.hrmsemployeemembershipdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeemembershipdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeemembershipdetails.length == 0)
{
    this.tblhrmsemployeemembershipdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeemembershipdetail();
    this.hrmsemployeeservice.hrmsemployeemembershipdetails.push(obj);
    this.hrmsemployeemembershipdetailssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeemembershipdetails.length / this.hrmsemployeemembershipdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeemembershipdetailssource.getPaging().page)
    {
        this.hrmsemployeemembershipdetailssource.setPage((this.hrmsemployeeservice.hrmsemployeemembershipdetails.length / this.hrmsemployeemembershipdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeemembershipdetailssource.grid.edit(this.tblhrmsemployeemembershipdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeemembershipdetailssource.data.indexOf(event.data);
this.onDeletehrmsemployeemembershipdetail(event,event.data.membershipid,((this.hrmsemployeemembershipdetailssource.getPaging().page-1) *this.hrmsemployeemembershipdetailssource.getPaging().perPage)+index);
this.hrmsemployeemembershipdetailssource.refresh();
break;
}
}

*/
hrmsemployeemembershipdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeemembershipdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeemembershipdetail(event,event.data.membershipid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeemembershipdetail(event,event.data.membershipid,((this.hrmsemployeemembershipdetailssource.getPaging().page-1) *this.hrmsemployeemembershipdetailssource.getPaging().perPage)+event.index);
this.hrmsemployeemembershipdetailssource.refresh();
break;
}
}
hrmsemployeemembershipdetailsonDelete(obj) {
let membershipid=obj.data.membershipid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(membershipid).then(res=>
this.hrmsemployeemembershipdetailsLoadTable()
);
}
}
hrmsemployeemembershipdetailsPaging(val)
{
debugger;
this.hrmsemployeemembershipdetailssource.setPaging(1, val, true);
}

handlehrmsemployeemembershipdetailsGridSelected(event:any) {
this.hrmsemployeemembershipdetailsselectedindex=this.hrmsemployeeservice.hrmsemployeemembershipdetails.findIndex(i => i.membershipid === event.data.membershipid);
}
IshrmsemployeemembershipdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemembershipdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeemembershipdetails
//start of Grid Codes hrmsemployeememos
hrmsemployeememossettings:any;
hrmsemployeememossource: any;

showhrmsemployeememosCheckbox()
{
debugger;
if(this.tblhrmsemployeememossource.settings['selectMode']== 'multi')this.tblhrmsemployeememossource.settings['selectMode']= 'single';
else
this.tblhrmsemployeememossource.settings['selectMode']= 'multi';
this.tblhrmsemployeememossource.initGrid();
}
deletehrmsemployeememosAll()
{
this.tblhrmsemployeememossource.settings['selectMode'] = 'single';
}
showhrmsemployeememosFilter()
{
  setTimeout(() => {
  this.SethrmsemployeememosTableddConfig();
  });
      if(this.tblhrmsemployeememossource.settings!=null)this.tblhrmsemployeememossource.settings['hideSubHeader'] =!this.tblhrmsemployeememossource.settings['hideSubHeader'];
this.tblhrmsemployeememossource.initGrid();
}
showhrmsemployeememosInActive()
{
}
enablehrmsemployeememosInActive()
{
}
async SethrmsemployeememosTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeememos){

this.configservice.getList("memocategory").then(res=>
{
var datamemocategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeememosmemocategory3.push(defaultobj);
for(let i=0; i<datamemocategory2.length; i++){
var obj= { value: datamemocategory2[i].configkey, title: datamemocategory2[i].configtext};
this.datahrmsemployeememosmemocategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeememossource.settings);
if(clone.columns['memocategory']!=undefined)clone.columns['memocategory'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeememosmemocategory3)), }, };
if(clone.columns['memocategory']!=undefined)clone.columns['memocategory'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeememosmemocategory3)), }, };
this.tblhrmsemployeememossource.settings =  clone;
this.tblhrmsemployeememossource.initGrid();
});
}
this.bfilterPopulatehrmsemployeememos=true;
}
async hrmsemployeememosbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeememosTableConfig()
{
this.hrmsemployeememossettings = {
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
memodate: {
title: 'Memo Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
memocategory: {
title: 'Memo Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeememosmemocategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
template: {
title: 'Template',
type: '',
filter:true,
},
memodetails: {
title: 'Memo Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
hrmsemployeememosLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeememosID)>=0)
{
this.hrmsemployeememossource=new LocalDataSource();
this.hrmsemployeememossource.load(this.hrmsemployeeservice.hrmsemployeememos as  any as LocalDataSource);
this.hrmsemployeememossource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeememosroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeememos.length == 0)
{
    this.tblhrmsemployeememossource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeememo();
    this.hrmsemployeeservice.hrmsemployeememos.push(obj);
    this.hrmsemployeememossource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeememos.length / this.hrmsemployeememossource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeememossource.getPaging().page)
    {
        this.hrmsemployeememossource.setPage((this.hrmsemployeeservice.hrmsemployeememos.length / this.hrmsemployeememossource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeememossource.grid.edit(this.tblhrmsemployeememossource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeememossource.data.indexOf(event.data);
this.onDeletehrmsemployeememo(event,event.data.memoid,((this.hrmsemployeememossource.getPaging().page-1) *this.hrmsemployeememossource.getPaging().perPage)+index);
this.hrmsemployeememossource.refresh();
break;
}
}

*/
hrmsemployeememosroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeememo(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeememo(event,event.data.memoid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeememo(event,event.data.memoid,((this.hrmsemployeememossource.getPaging().page-1) *this.hrmsemployeememossource.getPaging().perPage)+event.index);
this.hrmsemployeememossource.refresh();
break;
}
}
hrmsemployeememosonDelete(obj) {
let memoid=obj.data.memoid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(memoid).then(res=>
this.hrmsemployeememosLoadTable()
);
}
}
hrmsemployeememosPaging(val)
{
debugger;
this.hrmsemployeememossource.setPaging(1, val, true);
}

handlehrmsemployeememosGridSelected(event:any) {
this.hrmsemployeememosselectedindex=this.hrmsemployeeservice.hrmsemployeememos.findIndex(i => i.memoid === event.data.memoid);
}
IshrmsemployeememosVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeememosID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeememos
//start of Grid Codes hrmsemployeepresentations
hrmsemployeepresentationssettings:any;
hrmsemployeepresentationssource: any;

showhrmsemployeepresentationsCheckbox()
{
debugger;
if(this.tblhrmsemployeepresentationssource.settings['selectMode']== 'multi')this.tblhrmsemployeepresentationssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeepresentationssource.settings['selectMode']= 'multi';
this.tblhrmsemployeepresentationssource.initGrid();
}
deletehrmsemployeepresentationsAll()
{
this.tblhrmsemployeepresentationssource.settings['selectMode'] = 'single';
}
showhrmsemployeepresentationsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeepresentationsTableddConfig();
  });
      if(this.tblhrmsemployeepresentationssource.settings!=null)this.tblhrmsemployeepresentationssource.settings['hideSubHeader'] =!this.tblhrmsemployeepresentationssource.settings['hideSubHeader'];
this.tblhrmsemployeepresentationssource.initGrid();
}
showhrmsemployeepresentationsInActive()
{
}
enablehrmsemployeepresentationsInActive()
{
}
async SethrmsemployeepresentationsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeepresentations){

this.configservice.getList("presentationcategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeepresentationscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.datahrmsemployeepresentationscategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeepresentationssource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeepresentationscategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeepresentationscategory3)), }, };
this.tblhrmsemployeepresentationssource.settings =  clone;
this.tblhrmsemployeepresentationssource.initGrid();
});

this.configservice.getList("presentationmode").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeepresentationsmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmsemployeepresentationsmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeepresentationssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeepresentationsmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeepresentationsmode3)), }, };
this.tblhrmsemployeepresentationssource.settings =  clone;
this.tblhrmsemployeepresentationssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeepresentations=true;
}
async hrmsemployeepresentationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeepresentationsTableConfig()
{
this.hrmsemployeepresentationssettings = {
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
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeepresentationscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
presentationdate: {
title: 'Presentation Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
topic: {
title: 'Topic',
type: '',
filter:true,
},
presentedforum: {
title: 'Presented Forum',
type: '',
filter:true,
},
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeepresentationsmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
},
};
}
hrmsemployeepresentationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeepresentationsID)>=0)
{
this.hrmsemployeepresentationssource=new LocalDataSource();
this.hrmsemployeepresentationssource.load(this.hrmsemployeeservice.hrmsemployeepresentations as  any as LocalDataSource);
this.hrmsemployeepresentationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeepresentationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeepresentations.length == 0)
{
    this.tblhrmsemployeepresentationssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeepresentation();
    this.hrmsemployeeservice.hrmsemployeepresentations.push(obj);
    this.hrmsemployeepresentationssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeepresentations.length / this.hrmsemployeepresentationssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeepresentationssource.getPaging().page)
    {
        this.hrmsemployeepresentationssource.setPage((this.hrmsemployeeservice.hrmsemployeepresentations.length / this.hrmsemployeepresentationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeepresentationssource.grid.edit(this.tblhrmsemployeepresentationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeepresentationssource.data.indexOf(event.data);
this.onDeletehrmsemployeepresentation(event,event.data.presentationid,((this.hrmsemployeepresentationssource.getPaging().page-1) *this.hrmsemployeepresentationssource.getPaging().perPage)+index);
this.hrmsemployeepresentationssource.refresh();
break;
}
}

*/
hrmsemployeepresentationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeepresentation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeepresentation(event,event.data.presentationid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeepresentation(event,event.data.presentationid,((this.hrmsemployeepresentationssource.getPaging().page-1) *this.hrmsemployeepresentationssource.getPaging().perPage)+event.index);
this.hrmsemployeepresentationssource.refresh();
break;
}
}
hrmsemployeepresentationsonDelete(obj) {
let presentationid=obj.data.presentationid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(presentationid).then(res=>
this.hrmsemployeepresentationsLoadTable()
);
}
}
hrmsemployeepresentationsPaging(val)
{
debugger;
this.hrmsemployeepresentationssource.setPaging(1, val, true);
}

handlehrmsemployeepresentationsGridSelected(event:any) {
this.hrmsemployeepresentationsselectedindex=this.hrmsemployeeservice.hrmsemployeepresentations.findIndex(i => i.presentationid === event.data.presentationid);
}
IshrmsemployeepresentationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeepresentationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeepresentations
//start of Grid Codes hrmsemployeerewards
hrmsemployeerewardssettings:any;
hrmsemployeerewardssource: any;

showhrmsemployeerewardsCheckbox()
{
debugger;
if(this.tblhrmsemployeerewardssource.settings['selectMode']== 'multi')this.tblhrmsemployeerewardssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeerewardssource.settings['selectMode']= 'multi';
this.tblhrmsemployeerewardssource.initGrid();
}
deletehrmsemployeerewardsAll()
{
this.tblhrmsemployeerewardssource.settings['selectMode'] = 'single';
}
showhrmsemployeerewardsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeerewardsTableddConfig();
  });
      if(this.tblhrmsemployeerewardssource.settings!=null)this.tblhrmsemployeerewardssource.settings['hideSubHeader'] =!this.tblhrmsemployeerewardssource.settings['hideSubHeader'];
this.tblhrmsemployeerewardssource.initGrid();
}
showhrmsemployeerewardsInActive()
{
}
enablehrmsemployeerewardsInActive()
{
}
async SethrmsemployeerewardsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeerewards){

this.configservice.getList("rewardcategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeerewardscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.datahrmsemployeerewardscategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeerewardssource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeerewardscategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeerewardscategory3)), }, };
this.tblhrmsemployeerewardssource.settings =  clone;
this.tblhrmsemployeerewardssource.initGrid();
});

this.configservice.getList("rewardtype").then(res=>
{
var datarewardtype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeerewardsrewardtype3.push(defaultobj);
for(let i=0; i<datarewardtype2.length; i++){
var obj= { value: datarewardtype2[i].configkey, title: datarewardtype2[i].configtext};
this.datahrmsemployeerewardsrewardtype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeerewardssource.settings);
if(clone.columns['rewardtype']!=undefined)clone.columns['rewardtype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeerewardsrewardtype3)), }, };
if(clone.columns['rewardtype']!=undefined)clone.columns['rewardtype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeerewardsrewardtype3)), }, };
this.tblhrmsemployeerewardssource.settings =  clone;
this.tblhrmsemployeerewardssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeerewards=true;
}
async hrmsemployeerewardsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeerewardsTableConfig()
{
this.hrmsemployeerewardssettings = {
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
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeerewardscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rewarddate: {
title: 'Reward Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
topic: {
title: 'Topic',
type: '',
filter:true,
},
receivedfrom: {
title: 'Received From',
type: '',
filter:true,
},
rewardtype: {
title: 'Reward Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeerewardsrewardtype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
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
},
};
}
hrmsemployeerewardsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeerewardsID)>=0)
{
this.hrmsemployeerewardssource=new LocalDataSource();
this.hrmsemployeerewardssource.load(this.hrmsemployeeservice.hrmsemployeerewards as  any as LocalDataSource);
this.hrmsemployeerewardssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeerewardsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeerewards.length == 0)
{
    this.tblhrmsemployeerewardssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeereward();
    this.hrmsemployeeservice.hrmsemployeerewards.push(obj);
    this.hrmsemployeerewardssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeerewards.length / this.hrmsemployeerewardssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeerewardssource.getPaging().page)
    {
        this.hrmsemployeerewardssource.setPage((this.hrmsemployeeservice.hrmsemployeerewards.length / this.hrmsemployeerewardssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeerewardssource.grid.edit(this.tblhrmsemployeerewardssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeerewardssource.data.indexOf(event.data);
this.onDeletehrmsemployeereward(event,event.data.rewardid,((this.hrmsemployeerewardssource.getPaging().page-1) *this.hrmsemployeerewardssource.getPaging().perPage)+index);
this.hrmsemployeerewardssource.refresh();
break;
}
}

*/
hrmsemployeerewardsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeereward(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeereward(event,event.data.rewardid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeereward(event,event.data.rewardid,((this.hrmsemployeerewardssource.getPaging().page-1) *this.hrmsemployeerewardssource.getPaging().perPage)+event.index);
this.hrmsemployeerewardssource.refresh();
break;
}
}
hrmsemployeerewardsonDelete(obj) {
let rewardid=obj.data.rewardid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(rewardid).then(res=>
this.hrmsemployeerewardsLoadTable()
);
}
}
hrmsemployeerewardsPaging(val)
{
debugger;
this.hrmsemployeerewardssource.setPaging(1, val, true);
}

handlehrmsemployeerewardsGridSelected(event:any) {
this.hrmsemployeerewardsselectedindex=this.hrmsemployeeservice.hrmsemployeerewards.findIndex(i => i.rewardid === event.data.rewardid);
}
IshrmsemployeerewardsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeerewardsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeerewards
//start of Grid Codes hrmsemployeeskills
hrmsemployeeskillssettings:any;
hrmsemployeeskillssource: any;

showhrmsemployeeskillsCheckbox()
{
debugger;
if(this.tblhrmsemployeeskillssource.settings['selectMode']== 'multi')this.tblhrmsemployeeskillssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeskillssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeskillssource.initGrid();
}
deletehrmsemployeeskillsAll()
{
this.tblhrmsemployeeskillssource.settings['selectMode'] = 'single';
}
showhrmsemployeeskillsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeskillsTableddConfig();
  });
      if(this.tblhrmsemployeeskillssource.settings!=null)this.tblhrmsemployeeskillssource.settings['hideSubHeader'] =!this.tblhrmsemployeeskillssource.settings['hideSubHeader'];
this.tblhrmsemployeeskillssource.initGrid();
}
showhrmsemployeeskillsInActive()
{
}
enablehrmsemployeeskillsInActive()
{
}
async SethrmsemployeeskillsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeskills){

this.bomasterdataservice.getList("cn8zm").then(res=>
{
var dataskillcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeskillsskillcategory3.push(defaultobj);
for(let i=0; i<dataskillcategory2.length; i++){
var obj= { value: dataskillcategory2[i].masterdataid, title:dataskillcategory2[i].masterdatadescription};
this.datahrmsemployeeskillsskillcategory3.push(obj);
}
if((this.tblhrmsemployeeskillssource.settings as any).columns['skillcategory'])
{
(this.tblhrmsemployeeskillssource.settings as any).columns['skillcategory'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeskillsskillcategory3));
this.tblhrmsemployeeskillssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeskills=true;
}
async hrmsemployeeskillsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeskillsTableConfig()
{
this.hrmsemployeeskillssettings = {
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
skillcategory: {
title: 'Skill Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeskillsskillcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
skilldescription: {
title: 'Skill Description',
type: '',
filter:true,
},
noofyearsused: {
title: 'No Of Years Used',
type: 'number',
filter:true,
},
lastusedyear: {
title: 'Last Used Year',
type: 'number',
filter:true,
},
rating: {
title: 'Rating',
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
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeeskillsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeskillsID)>=0)
{
this.hrmsemployeeskillssource=new LocalDataSource();
this.hrmsemployeeskillssource.load(this.hrmsemployeeservice.hrmsemployeeskills as  any as LocalDataSource);
this.hrmsemployeeskillssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeskillsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeeskills.length == 0)
{
    this.tblhrmsemployeeskillssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeskill();
    this.hrmsemployeeservice.hrmsemployeeskills.push(obj);
    this.hrmsemployeeskillssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeeskills.length / this.hrmsemployeeskillssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeskillssource.getPaging().page)
    {
        this.hrmsemployeeskillssource.setPage((this.hrmsemployeeservice.hrmsemployeeskills.length / this.hrmsemployeeskillssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeskillssource.grid.edit(this.tblhrmsemployeeskillssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeskillssource.data.indexOf(event.data);
this.onDeletehrmsemployeeskill(event,event.data.skillid,((this.hrmsemployeeskillssource.getPaging().page-1) *this.hrmsemployeeskillssource.getPaging().perPage)+index);
this.hrmsemployeeskillssource.refresh();
break;
}
}

*/
hrmsemployeeskillsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeskill(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeskill(event,event.data.skillid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeskill(event,event.data.skillid,((this.hrmsemployeeskillssource.getPaging().page-1) *this.hrmsemployeeskillssource.getPaging().perPage)+event.index);
this.hrmsemployeeskillssource.refresh();
break;
}
}
hrmsemployeeskillsonDelete(obj) {
let skillid=obj.data.skillid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(skillid).then(res=>
this.hrmsemployeeskillsLoadTable()
);
}
}
hrmsemployeeskillsPaging(val)
{
debugger;
this.hrmsemployeeskillssource.setPaging(1, val, true);
}

handlehrmsemployeeskillsGridSelected(event:any) {
this.hrmsemployeeskillsselectedindex=this.hrmsemployeeservice.hrmsemployeeskills.findIndex(i => i.skillid === event.data.skillid);
}
IshrmsemployeeskillsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeskillsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeskills
//start of Grid Codes hrmsemployeestationaryrequests
hrmsemployeestationaryrequestssettings:any;
hrmsemployeestationaryrequestssource: any;

showhrmsemployeestationaryrequestsCheckbox()
{
debugger;
if(this.tblhrmsemployeestationaryrequestssource.settings['selectMode']== 'multi')this.tblhrmsemployeestationaryrequestssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeestationaryrequestssource.settings['selectMode']= 'multi';
this.tblhrmsemployeestationaryrequestssource.initGrid();
}
deletehrmsemployeestationaryrequestsAll()
{
this.tblhrmsemployeestationaryrequestssource.settings['selectMode'] = 'single';
}
showhrmsemployeestationaryrequestsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeestationaryrequestsTableddConfig();
  });
      if(this.tblhrmsemployeestationaryrequestssource.settings!=null)this.tblhrmsemployeestationaryrequestssource.settings['hideSubHeader'] =!this.tblhrmsemployeestationaryrequestssource.settings['hideSubHeader'];
this.tblhrmsemployeestationaryrequestssource.initGrid();
}
showhrmsemployeestationaryrequestsInActive()
{
}
enablehrmsemployeestationaryrequestsInActive()
{
}
async SethrmsemployeestationaryrequestsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeestationaryrequests){

this.bomasterdataservice.getList("c4wed").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeestationaryrequestscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].masterdataid, title:datacategory2[i].masterdatadescription};
this.datahrmsemployeestationaryrequestscategory3.push(obj);
}
if((this.tblhrmsemployeestationaryrequestssource.settings as any).columns['category'])
{
(this.tblhrmsemployeestationaryrequestssource.settings as any).columns['category'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeestationaryrequestscategory3));
this.tblhrmsemployeestationaryrequestssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var datasubcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeestationaryrequestssubcategory3.push(defaultobj);
for(let i=0; i<datasubcategory2.length; i++){
var obj= { value: datasubcategory2[i].subcategoryid, title:datasubcategory2[i].subcategoryname};
this.datahrmsemployeestationaryrequestssubcategory3.push(obj);
}
if((this.tblhrmsemployeestationaryrequestssource.settings as any).columns['subcategory'])
{
(this.tblhrmsemployeestationaryrequestssource.settings as any).columns['subcategory'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeestationaryrequestssubcategory3));
this.tblhrmsemployeestationaryrequestssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeestationaryrequests=true;
}
async hrmsemployeestationaryrequestsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeestationaryrequestsTableConfig()
{
this.hrmsemployeestationaryrequestssettings = {
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
stationaryrequestcode: {
title: 'Stationary Request Code',
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
category: {
title: 'Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeestationaryrequestscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
subcategory: {
title: 'Sub Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeestationaryrequestssubcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
requiredbefore: {
title: 'Required Before',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requiredquantity: {
title: 'Required Quantity',
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
issuedate: {
title: 'Issue Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
issuequantity: {
title: 'Issue Quantity',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeestationaryrequestsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeestationaryrequestsID)>=0)
{
this.hrmsemployeestationaryrequestssource=new LocalDataSource();
this.hrmsemployeestationaryrequestssource.load(this.hrmsemployeeservice.hrmsemployeestationaryrequests as  any as LocalDataSource);
this.hrmsemployeestationaryrequestssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeestationaryrequestsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeestationaryrequests.length == 0)
{
    this.tblhrmsemployeestationaryrequestssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeestationaryrequest();
    this.hrmsemployeeservice.hrmsemployeestationaryrequests.push(obj);
    this.hrmsemployeestationaryrequestssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeestationaryrequests.length / this.hrmsemployeestationaryrequestssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeestationaryrequestssource.getPaging().page)
    {
        this.hrmsemployeestationaryrequestssource.setPage((this.hrmsemployeeservice.hrmsemployeestationaryrequests.length / this.hrmsemployeestationaryrequestssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeestationaryrequestssource.grid.edit(this.tblhrmsemployeestationaryrequestssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeestationaryrequestssource.data.indexOf(event.data);
this.onDeletehrmsemployeestationaryrequest(event,event.data.stationaryrequestid,((this.hrmsemployeestationaryrequestssource.getPaging().page-1) *this.hrmsemployeestationaryrequestssource.getPaging().perPage)+index);
this.hrmsemployeestationaryrequestssource.refresh();
break;
}
}

*/
hrmsemployeestationaryrequestsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeestationaryrequest(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeestationaryrequest(event,event.data.stationaryrequestid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeestationaryrequest(event,event.data.stationaryrequestid,((this.hrmsemployeestationaryrequestssource.getPaging().page-1) *this.hrmsemployeestationaryrequestssource.getPaging().perPage)+event.index);
this.hrmsemployeestationaryrequestssource.refresh();
break;
}
}
hrmsemployeestationaryrequestsonDelete(obj) {
let stationaryrequestid=obj.data.stationaryrequestid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(stationaryrequestid).then(res=>
this.hrmsemployeestationaryrequestsLoadTable()
);
}
}
hrmsemployeestationaryrequestsPaging(val)
{
debugger;
this.hrmsemployeestationaryrequestssource.setPaging(1, val, true);
}

handlehrmsemployeestationaryrequestsGridSelected(event:any) {
this.hrmsemployeestationaryrequestsselectedindex=this.hrmsemployeeservice.hrmsemployeestationaryrequests.findIndex(i => i.stationaryrequestid === event.data.stationaryrequestid);
}
IshrmsemployeestationaryrequestsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeestationaryrequestsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeestationaryrequests
//start of Grid Codes hrmsemployeetraveldocuments
hrmsemployeetraveldocumentssettings:any;
hrmsemployeetraveldocumentssource: any;

showhrmsemployeetraveldocumentsCheckbox()
{
debugger;
if(this.tblhrmsemployeetraveldocumentssource.settings['selectMode']== 'multi')this.tblhrmsemployeetraveldocumentssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeetraveldocumentssource.settings['selectMode']= 'multi';
this.tblhrmsemployeetraveldocumentssource.initGrid();
}
deletehrmsemployeetraveldocumentsAll()
{
this.tblhrmsemployeetraveldocumentssource.settings['selectMode'] = 'single';
}
showhrmsemployeetraveldocumentsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeetraveldocumentsTableddConfig();
  });
      if(this.tblhrmsemployeetraveldocumentssource.settings!=null)this.tblhrmsemployeetraveldocumentssource.settings['hideSubHeader'] =!this.tblhrmsemployeetraveldocumentssource.settings['hideSubHeader'];
this.tblhrmsemployeetraveldocumentssource.initGrid();
}
showhrmsemployeetraveldocumentsInActive()
{
}
enablehrmsemployeetraveldocumentsInActive()
{
}
async SethrmsemployeetraveldocumentsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeetraveldocuments){

this.configservice.getList("travelcategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetraveldocumentscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.datahrmsemployeetraveldocumentscategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeetraveldocumentssource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetraveldocumentscategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeetraveldocumentscategory3)), }, };
this.tblhrmsemployeetraveldocumentssource.settings =  clone;
this.tblhrmsemployeetraveldocumentssource.initGrid();
});

this.bocountryservice.getbocountriesList().then(res=>
{
var datacountry2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeetraveldocumentscountry3.push(defaultobj);
for(let i=0; i<datacountry2.length; i++){
var obj= { value: datacountry2[i].countryid, title:datacountry2[i].name};
this.datahrmsemployeetraveldocumentscountry3.push(obj);
}
if((this.tblhrmsemployeetraveldocumentssource.settings as any).columns['country'])
{
(this.tblhrmsemployeetraveldocumentssource.settings as any).columns['country'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeetraveldocumentscountry3));
this.tblhrmsemployeetraveldocumentssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeetraveldocuments=true;
}
async hrmsemployeetraveldocumentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeetraveldocumentsTableConfig()
{
this.hrmsemployeetraveldocumentssettings = {
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
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetraveldocumentscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
country: {
title: 'Country',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'wc9rn',reportcode:'wc9rn',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeetraveldocumentscountry3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
referencenumber: {
title: 'Reference Number',
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
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeetraveldocumentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetraveldocumentsID)>=0)
{
this.hrmsemployeetraveldocumentssource=new LocalDataSource();
this.hrmsemployeetraveldocumentssource.load(this.hrmsemployeeservice.hrmsemployeetraveldocuments as  any as LocalDataSource);
this.hrmsemployeetraveldocumentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeetraveldocumentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeetraveldocuments.length == 0)
{
    this.tblhrmsemployeetraveldocumentssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeetraveldocument();
    this.hrmsemployeeservice.hrmsemployeetraveldocuments.push(obj);
    this.hrmsemployeetraveldocumentssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeetraveldocuments.length / this.hrmsemployeetraveldocumentssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeetraveldocumentssource.getPaging().page)
    {
        this.hrmsemployeetraveldocumentssource.setPage((this.hrmsemployeeservice.hrmsemployeetraveldocuments.length / this.hrmsemployeetraveldocumentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeetraveldocumentssource.grid.edit(this.tblhrmsemployeetraveldocumentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeetraveldocumentssource.data.indexOf(event.data);
this.onDeletehrmsemployeetraveldocument(event,event.data.traveldocid,((this.hrmsemployeetraveldocumentssource.getPaging().page-1) *this.hrmsemployeetraveldocumentssource.getPaging().perPage)+index);
this.hrmsemployeetraveldocumentssource.refresh();
break;
}
}

*/
hrmsemployeetraveldocumentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeetraveldocument(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeetraveldocument(event,event.data.traveldocid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeetraveldocument(event,event.data.traveldocid,((this.hrmsemployeetraveldocumentssource.getPaging().page-1) *this.hrmsemployeetraveldocumentssource.getPaging().perPage)+event.index);
this.hrmsemployeetraveldocumentssource.refresh();
break;
}
}
hrmsemployeetraveldocumentsonDelete(obj) {
let traveldocid=obj.data.traveldocid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(traveldocid).then(res=>
this.hrmsemployeetraveldocumentsLoadTable()
);
}
}
hrmsemployeetraveldocumentsPaging(val)
{
debugger;
this.hrmsemployeetraveldocumentssource.setPaging(1, val, true);
}

handlehrmsemployeetraveldocumentsGridSelected(event:any) {
this.hrmsemployeetraveldocumentsselectedindex=this.hrmsemployeeservice.hrmsemployeetraveldocuments.findIndex(i => i.traveldocid === event.data.traveldocid);
}
IshrmsemployeetraveldocumentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeetraveldocumentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeetraveldocuments
//start of Grid Codes hrmsemployeedocuments
hrmsemployeedocumentssettings:any;
hrmsemployeedocumentssource: any;

showhrmsemployeedocumentsCheckbox()
{
debugger;
if(this.tblhrmsemployeedocumentssource.settings['selectMode']== 'multi')this.tblhrmsemployeedocumentssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeedocumentssource.settings['selectMode']= 'multi';
this.tblhrmsemployeedocumentssource.initGrid();
}
deletehrmsemployeedocumentsAll()
{
this.tblhrmsemployeedocumentssource.settings['selectMode'] = 'single';
}
showhrmsemployeedocumentsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeedocumentsTableddConfig();
  });
      if(this.tblhrmsemployeedocumentssource.settings!=null)this.tblhrmsemployeedocumentssource.settings['hideSubHeader'] =!this.tblhrmsemployeedocumentssource.settings['hideSubHeader'];
this.tblhrmsemployeedocumentssource.initGrid();
}
showhrmsemployeedocumentsInActive()
{
}
enablehrmsemployeedocumentsInActive()
{
}
async SethrmsemployeedocumentsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeedocuments){

this.configservice.getList("doccategory").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeedocumentscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].configkey, title: datacategory2[i].configtext};
this.datahrmsemployeedocumentscategory3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeedocumentssource.settings);
if(clone.columns['category']!=undefined)clone.columns['category'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeedocumentscategory3)), }, };
if(clone.columns['category']!=undefined)clone.columns['category'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeedocumentscategory3)), }, };
this.tblhrmsemployeedocumentssource.settings =  clone;
this.tblhrmsemployeedocumentssource.initGrid();
});

this.bocountryservice.getbocountriesList().then(res=>
{
var datacountry2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeedocumentscountry3.push(defaultobj);
for(let i=0; i<datacountry2.length; i++){
var obj= { value: datacountry2[i].countryid, title:datacountry2[i].name};
this.datahrmsemployeedocumentscountry3.push(obj);
}
if((this.tblhrmsemployeedocumentssource.settings as any).columns['country'])
{
(this.tblhrmsemployeedocumentssource.settings as any).columns['country'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeedocumentscountry3));
this.tblhrmsemployeedocumentssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeedocuments=true;
}
async hrmsemployeedocumentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeedocumentsTableConfig()
{
this.hrmsemployeedocumentssettings = {
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
category: {
title: 'Category',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeedocumentscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
country: {
title: 'Country',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'wc9rn',reportcode:'wc9rn',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeedocumentscountry3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
referencenumber: {
title: 'Reference Number',
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
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsemployeedocumentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeedocumentsID)>=0)
{
this.hrmsemployeedocumentssource=new LocalDataSource();
this.hrmsemployeedocumentssource.load(this.hrmsemployeeservice.hrmsemployeedocuments as  any as LocalDataSource);
this.hrmsemployeedocumentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeedocumentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeedocuments.length == 0)
{
    this.tblhrmsemployeedocumentssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeedocument();
    this.hrmsemployeeservice.hrmsemployeedocuments.push(obj);
    this.hrmsemployeedocumentssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeedocuments.length / this.hrmsemployeedocumentssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeedocumentssource.getPaging().page)
    {
        this.hrmsemployeedocumentssource.setPage((this.hrmsemployeeservice.hrmsemployeedocuments.length / this.hrmsemployeedocumentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeedocumentssource.grid.edit(this.tblhrmsemployeedocumentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeedocumentssource.data.indexOf(event.data);
this.onDeletehrmsemployeedocument(event,event.data.docid,((this.hrmsemployeedocumentssource.getPaging().page-1) *this.hrmsemployeedocumentssource.getPaging().perPage)+index);
this.hrmsemployeedocumentssource.refresh();
break;
}
}

*/
hrmsemployeedocumentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeedocument(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeedocument(event,event.data.docid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeedocument(event,event.data.docid,((this.hrmsemployeedocumentssource.getPaging().page-1) *this.hrmsemployeedocumentssource.getPaging().perPage)+event.index);
this.hrmsemployeedocumentssource.refresh();
break;
}
}
hrmsemployeedocumentsonDelete(obj) {
let docid=obj.data.docid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(docid).then(res=>
this.hrmsemployeedocumentsLoadTable()
);
}
}
hrmsemployeedocumentsPaging(val)
{
debugger;
this.hrmsemployeedocumentssource.setPaging(1, val, true);
}

handlehrmsemployeedocumentsGridSelected(event:any) {
this.hrmsemployeedocumentsselectedindex=this.hrmsemployeeservice.hrmsemployeedocuments.findIndex(i => i.docid === event.data.docid);
}
IshrmsemployeedocumentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeedocumentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeedocuments
//start of Grid Codes hrmsemployeemonthlyattendances
hrmsemployeemonthlyattendancessettings:any;
hrmsemployeemonthlyattendancessource: any;

showhrmsemployeemonthlyattendancesCheckbox()
{
debugger;
if(this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']== 'multi')this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']= 'multi';
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
deletehrmsemployeemonthlyattendancesAll()
{
this.tblhrmsemployeemonthlyattendancessource.settings['selectMode'] = 'single';
}
showhrmsemployeemonthlyattendancesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeemonthlyattendancesTableddConfig();
  });
      if(this.tblhrmsemployeemonthlyattendancessource.settings!=null)this.tblhrmsemployeemonthlyattendancessource.settings['hideSubHeader'] =!this.tblhrmsemployeemonthlyattendancessource.settings['hideSubHeader'];
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
showhrmsemployeemonthlyattendancesInActive()
{
}
enablehrmsemployeemonthlyattendancesInActive()
{
}
async SethrmsemployeemonthlyattendancesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeemonthlyattendances){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlyattendancesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeemonthlyattendancesemployeeid3.push(obj);
}
if((this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeemonthlyattendancesemployeeid3));
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
});

this.bomasterdataservice.getList("qghhe").then(res=>
{
var datadepartmentid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlyattendancesdepartmentid3.push(defaultobj);
for(let i=0; i<datadepartmentid2.length; i++){
var obj= { value: datadepartmentid2[i].masterdataid, title:datadepartmentid2[i].masterdatadescription};
this.datahrmsemployeemonthlyattendancesdepartmentid3.push(obj);
}
if((this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['departmentid'])
{
(this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['departmentid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeemonthlyattendancesdepartmentid3));
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeemonthlyattendances=true;
}
async hrmsemployeemonthlyattendancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeemonthlyattendancesTableConfig()
{
this.hrmsemployeemonthlyattendancessettings = {
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
employeename: {
title: 'Employee Name',
type: '',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeemonthlyattendancesdepartmentid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
totaldays: {
title: 'Total Days',
type: 'number',
filter:true,
},
workingdays: {
title: 'Working Days',
type: 'number',
filter:true,
},
holidays: {
title: 'Holidays',
type: 'number',
filter:true,
},
presentdays: {
title: 'Present Days',
type: 'number',
filter:true,
},
approvedleavedays: {
title: 'Approved Leave Days',
type: 'number',
filter:true,
},
adhocleavedays: {
title: 'Adhoc Leave Days',
type: 'number',
filter:true,
},
latelophours: {
title: 'Late L O P Hours',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeemonthlyattendancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemonthlyattendancesID)>=0)
{
this.hrmsemployeemonthlyattendancessource=new LocalDataSource();
this.hrmsemployeemonthlyattendancessource.load(this.hrmsemployeeservice.hrmsemployeemonthlyattendances as  any as LocalDataSource);
this.hrmsemployeemonthlyattendancessource.setPaging(1, 20, true);
}
}
hrmsemployeemonthlyattendancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeemonthlyattendances.length == 0)
{
    this.tblhrmsemployeemonthlyattendancessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeemonthlyattendance();
    this.hrmsemployeeservice.hrmsemployeemonthlyattendances.push(obj);
    this.hrmsemployeemonthlyattendancessource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeemonthlyattendances.length / this.hrmsemployeemonthlyattendancessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeemonthlyattendancessource.getPaging().page)
    {
        this.hrmsemployeemonthlyattendancessource.setPage((this.hrmsemployeeservice.hrmsemployeemonthlyattendances.length / this.hrmsemployeemonthlyattendancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeemonthlyattendancessource.grid.edit(this.tblhrmsemployeemonthlyattendancessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsemployeemonthlyattendancessource.data.indexOf(event.data);
this.onDeletehrmsemployeemonthlyattendance(event,event.data.attendanceid,((this.hrmsemployeemonthlyattendancessource.getPaging().page-1) *this.hrmsemployeemonthlyattendancessource.getPaging().perPage)+index);
this.hrmsemployeemonthlyattendancessource.refresh();
}
break;
}
}
hrmsemployeemonthlyattendancesPaging(val)
{
debugger;
this.hrmsemployeemonthlyattendancessource.setPaging(1, val, true);
}

handlehrmsemployeemonthlyattendancesGridSelected(event:any) {
this.hrmsemployeemonthlyattendancesselectedindex=this.hrmsemployeeservice.hrmsemployeemonthlyattendances.findIndex(i => i.attendanceid === event.data.attendanceid);
}
IshrmsemployeemonthlyattendancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeemonthlyattendancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeemonthlyattendances
//start of Grid Codes hrmsemployeedependents
hrmsemployeedependentssettings:any;
hrmsemployeedependentssource: any;

showhrmsemployeedependentsCheckbox()
{
debugger;
if(this.tblhrmsemployeedependentssource.settings['selectMode']== 'multi')this.tblhrmsemployeedependentssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeedependentssource.settings['selectMode']= 'multi';
this.tblhrmsemployeedependentssource.initGrid();
}
deletehrmsemployeedependentsAll()
{
this.tblhrmsemployeedependentssource.settings['selectMode'] = 'single';
}
showhrmsemployeedependentsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeedependentsTableddConfig();
  });
      if(this.tblhrmsemployeedependentssource.settings!=null)this.tblhrmsemployeedependentssource.settings['hideSubHeader'] =!this.tblhrmsemployeedependentssource.settings['hideSubHeader'];
this.tblhrmsemployeedependentssource.initGrid();
}
showhrmsemployeedependentsInActive()
{
}
enablehrmsemployeedependentsInActive()
{
}
async SethrmsemployeedependentsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeedependents){

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeedependentsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].userid, title:dataemployeeid2[i].username};
this.datahrmsemployeedependentsemployeeid3.push(obj);
}
if((this.tblhrmsemployeedependentssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeedependentssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeedependentsemployeeid3));
this.tblhrmsemployeedependentssource.initGrid();
}
});

this.configservice.getList("relationship").then(res=>
{
var datarelationship2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeedependentsrelationship3.push(defaultobj);
for(let i=0; i<datarelationship2.length; i++){
var obj= { value: datarelationship2[i].configkey, title: datarelationship2[i].configtext};
this.datahrmsemployeedependentsrelationship3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeedependentssource.settings);
if(clone.columns['relationship']!=undefined)clone.columns['relationship'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeedependentsrelationship3)), }, };
if(clone.columns['relationship']!=undefined)clone.columns['relationship'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeedependentsrelationship3)), }, };
this.tblhrmsemployeedependentssource.settings =  clone;
this.tblhrmsemployeedependentssource.initGrid();
});
}
this.bfilterPopulatehrmsemployeedependents=true;
}
async hrmsemployeedependentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeedependentsTableConfig()
{
this.hrmsemployeedependentssettings = {
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
relationship: {
title: 'Relationship',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeedependentsrelationship3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
phone: {
title: 'Phone',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
details: {
title: 'Details',
type: '',
filter:true,
},
},
};
}
hrmsemployeedependentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeedependentsID)>=0)
{
this.hrmsemployeedependentssource=new LocalDataSource();
this.hrmsemployeedependentssource.load(this.hrmsemployeeservice.hrmsemployeedependents as  any as LocalDataSource);
this.hrmsemployeedependentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeedependentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeedependents.length == 0)
{
    this.tblhrmsemployeedependentssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeedependent();
    this.hrmsemployeeservice.hrmsemployeedependents.push(obj);
    this.hrmsemployeedependentssource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeedependents.length / this.hrmsemployeedependentssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeedependentssource.getPaging().page)
    {
        this.hrmsemployeedependentssource.setPage((this.hrmsemployeeservice.hrmsemployeedependents.length / this.hrmsemployeedependentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeedependentssource.grid.edit(this.tblhrmsemployeedependentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeedependentssource.data.indexOf(event.data);
this.onDeletehrmsemployeedependent(event,event.data.dependentid,((this.hrmsemployeedependentssource.getPaging().page-1) *this.hrmsemployeedependentssource.getPaging().perPage)+index);
this.hrmsemployeedependentssource.refresh();
break;
}
}

*/
hrmsemployeedependentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeedependent(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeedependent(event,event.data.dependentid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeedependent(event,event.data.dependentid,((this.hrmsemployeedependentssource.getPaging().page-1) *this.hrmsemployeedependentssource.getPaging().perPage)+event.index);
this.hrmsemployeedependentssource.refresh();
break;
}
}
hrmsemployeedependentsonDelete(obj) {
let dependentid=obj.data.dependentid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(dependentid).then(res=>
this.hrmsemployeedependentsLoadTable()
);
}
}
hrmsemployeedependentsPaging(val)
{
debugger;
this.hrmsemployeedependentssource.setPaging(1, val, true);
}

handlehrmsemployeedependentsGridSelected(event:any) {
this.hrmsemployeedependentsselectedindex=this.hrmsemployeeservice.hrmsemployeedependents.findIndex(i => i.dependentid === event.data.dependentid);
}
IshrmsemployeedependentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeedependentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeedependents
//start of Grid Codes hrmsemployeenominees
hrmsemployeenomineessettings:any;
hrmsemployeenomineessource: any;

showhrmsemployeenomineesCheckbox()
{
debugger;
if(this.tblhrmsemployeenomineessource.settings['selectMode']== 'multi')this.tblhrmsemployeenomineessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeenomineessource.settings['selectMode']= 'multi';
this.tblhrmsemployeenomineessource.initGrid();
}
deletehrmsemployeenomineesAll()
{
this.tblhrmsemployeenomineessource.settings['selectMode'] = 'single';
}
showhrmsemployeenomineesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeenomineesTableddConfig();
  });
      if(this.tblhrmsemployeenomineessource.settings!=null)this.tblhrmsemployeenomineessource.settings['hideSubHeader'] =!this.tblhrmsemployeenomineessource.settings['hideSubHeader'];
this.tblhrmsemployeenomineessource.initGrid();
}
showhrmsemployeenomineesInActive()
{
}
enablehrmsemployeenomineesInActive()
{
}
async SethrmsemployeenomineesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeenominees){

this.bousermasterservice.getbousermastersList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeenomineesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].userid, title:dataemployeeid2[i].username};
this.datahrmsemployeenomineesemployeeid3.push(obj);
}
if((this.tblhrmsemployeenomineessource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeenomineessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeenomineesemployeeid3));
this.tblhrmsemployeenomineessource.initGrid();
}
});

this.configservice.getList("relationship").then(res=>
{
var datarelationship2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeenomineesrelationship3.push(defaultobj);
for(let i=0; i<datarelationship2.length; i++){
var obj= { value: datarelationship2[i].configkey, title: datarelationship2[i].configtext};
this.datahrmsemployeenomineesrelationship3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeenomineessource.settings);
if(clone.columns['relationship']!=undefined)clone.columns['relationship'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesrelationship3)), }, };
if(clone.columns['relationship']!=undefined)clone.columns['relationship'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesrelationship3)), }, };
this.tblhrmsemployeenomineessource.settings =  clone;
this.tblhrmsemployeenomineessource.initGrid();
});

this.configservice.getList("benefittype").then(res=>
{
var databenefittype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeenomineesbenefittype3.push(defaultobj);
for(let i=0; i<databenefittype2.length; i++){
var obj= { value: databenefittype2[i].configkey, title: databenefittype2[i].configtext};
this.datahrmsemployeenomineesbenefittype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeenomineessource.settings);
if(clone.columns['benefittype']!=undefined)clone.columns['benefittype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesbenefittype3)), }, };
if(clone.columns['benefittype']!=undefined)clone.columns['benefittype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesbenefittype3)), }, };
this.tblhrmsemployeenomineessource.settings =  clone;
this.tblhrmsemployeenomineessource.initGrid();
});

this.configservice.getList("nominationendreason").then(res=>
{
var datanominationendreason2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeenomineesnominationendreason3.push(defaultobj);
for(let i=0; i<datanominationendreason2.length; i++){
var obj= { value: datanominationendreason2[i].configkey, title: datanominationendreason2[i].configtext};
this.datahrmsemployeenomineesnominationendreason3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsemployeenomineessource.settings);
if(clone.columns['nominationendreason']!=undefined)clone.columns['nominationendreason'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesnominationendreason3)), }, };
if(clone.columns['nominationendreason']!=undefined)clone.columns['nominationendreason'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsemployeenomineesnominationendreason3)), }, };
this.tblhrmsemployeenomineessource.settings =  clone;
this.tblhrmsemployeenomineessource.initGrid();
});
}
this.bfilterPopulatehrmsemployeenominees=true;
}
async hrmsemployeenomineesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeenomineesTableConfig()
{
this.hrmsemployeenomineessettings = {
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
relationship: {
title: 'Relationship',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeenomineesrelationship3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
phone: {
title: 'Phone',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
details: {
title: 'Details',
type: '',
filter:true,
},
benefittype: {
title: 'Benefit Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeenomineesbenefittype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
percentshare: {
title: 'Percent Share',
type: 'number',
filter:true,
},
nominationendreason: {
title: 'Nomination End Reason',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeenomineesnominationendreason3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsemployeenomineesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeenomineesID)>=0)
{
this.hrmsemployeenomineessource=new LocalDataSource();
this.hrmsemployeenomineessource.load(this.hrmsemployeeservice.hrmsemployeenominees as  any as LocalDataSource);
this.hrmsemployeenomineessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeenomineesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeeservice.hrmsemployeenominees.length == 0)
{
    this.tblhrmsemployeenomineessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeenominee();
    this.hrmsemployeeservice.hrmsemployeenominees.push(obj);
    this.hrmsemployeenomineessource.refresh();
    if ((this.hrmsemployeeservice.hrmsemployeenominees.length / this.hrmsemployeenomineessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeenomineessource.getPaging().page)
    {
        this.hrmsemployeenomineessource.setPage((this.hrmsemployeeservice.hrmsemployeenominees.length / this.hrmsemployeenomineessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeenomineessource.grid.edit(this.tblhrmsemployeenomineessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeenomineessource.data.indexOf(event.data);
this.onDeletehrmsemployeenominee(event,event.data.nomineeid,((this.hrmsemployeenomineessource.getPaging().page-1) *this.hrmsemployeenomineessource.getPaging().perPage)+index);
this.hrmsemployeenomineessource.refresh();
break;
}
}

*/
hrmsemployeenomineesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeenominee(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeenominee(event,event.data.nomineeid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeenominee(event,event.data.nomineeid,((this.hrmsemployeenomineessource.getPaging().page-1) *this.hrmsemployeenomineessource.getPaging().perPage)+event.index);
this.hrmsemployeenomineessource.refresh();
break;
}
}
hrmsemployeenomineesonDelete(obj) {
let nomineeid=obj.data.nomineeid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsemployeeservice.deletehrmsemployee(nomineeid).then(res=>
this.hrmsemployeenomineesLoadTable()
);
}
}
hrmsemployeenomineesPaging(val)
{
debugger;
this.hrmsemployeenomineessource.setPaging(1, val, true);
}

handlehrmsemployeenomineesGridSelected(event:any) {
this.hrmsemployeenomineesselectedindex=this.hrmsemployeeservice.hrmsemployeenominees.findIndex(i => i.nomineeid === event.data.nomineeid);
}
IshrmsemployeenomineesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeenomineesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeenominees

}



