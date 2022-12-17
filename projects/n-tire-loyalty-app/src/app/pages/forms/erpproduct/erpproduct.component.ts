import { erpproductService } from './../../../service/erpproduct.service';
import { erpproduct } from './../../../model/erpproduct.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { boteam} from '../../../../../../n-tire-bo-app/src/app/model/boteam.model';
import { boteamService } from '../../../../../../n-tire-bo-app/src/app/service/boteam.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erpsupplieritem} from './../../../model/erpsupplieritem.model';
import { erpsupplieritemService } from './../../../service/erpsupplieritem.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
//popups
//detail table services
import { erpproductpricehistory } from './../../../model/erpproductpricehistory.model';
//FK services
import { bobranchmaster,IbobranchmasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { erpproductpricehistoryComponent } from '../erpproductpricehistory/erpproductpricehistory.component';
import { ecmcustomerbasket } from '../../../../../../n-tire-commerce-app/src/app/model/ecmcustomerbasket.model';
//FK services
import { crmcustomermaster,IcrmcustomermasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
import { ecmcustomerbasketComponent } from '../ecmcustomerbasket/ecmcustomerbasket.component';
import { erpproductfeatureparameter } from './../../../model/erpproductfeatureparameter.model';
//FK services
import { bosubcategorymaster,IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { erpproductfeatureparameterComponent } from '../erpproductfeatureparameter/erpproductfeatureparameter.component';
import { ecmreview } from '../../../../../../n-tire-commerce-app/src/app/model/ecmreview.model';
//FK services
import { ecmreviewComponent } from '../ecmreview/ecmreview.component';
import { ecmspecial } from '../../../../../../n-tire-commerce-app/src/app/model/ecmspecial.model';
//FK services
import { erpproductaccess } from './../../../model/erpproductaccess.model';
//FK services
import { bousergroupComponent } from '../bousergroup/bousergroup.component';
import { bousergroupService } from '../../../../../../n-tire-bo-app/src/app/service/bousergroup.service';
import { erpproductattribute } from './../../../model/erpproductattribute.model';
//FK services
import { erpproductimage } from './../../../model/erpproductimage.model';
//FK services
import { erpproductimageComponent } from '../erpproductimage/erpproductimage.component';
import { ltymerchantproduct } from '../../../../../../n-tire-loyalty-app/src/app/model/ltymerchantproduct.model';
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
selector: 'app-erpproduct',
templateUrl: './erpproduct.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpproductComponent implements OnInit {
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
bfilterPopulateerpproducts:boolean=false;
dataerpproductsmarketingmanagerid3:any=[];
dataerpproductssalesmanagerid3:any=[];
dataerpproductssupportmanagerid3:any=[];
dataerpproductsmarketingteam3:any=[];
dataerpproductssalesteam3:any=[];
dataerpproductssupportteam3:any=[];
dataerpproductsitemid3:any=[];
dataerpproductspreferredsupplier3:any=[];
dataerpproductspreferredproduct3:any=[];
dataerpproductsproductcategory3:any=[];
dataerpproductsuom3:any=[];
dataerpproductscurrency3:any=[];
dataerpproductssalesaccount3:any=[];
dataerpproductspurchaseaccount3:any=[];
dataerpproductspropositionmethod13:any=[];
dataerpproductspropositionmethod23:any=[];
dataerpproductspropositionmethod33:any=[];
dataerpproductscompetitorproductadditionownerid3:any=[];
dataerpproductsmarketresearchownerid3:any=[];
dataerpproductsmarketsegmentationownerid3:any=[];
dataerpproductscompetitiveanalysisownerid3:any=[];
dataerpproductscompetitivepositioningstrategyownerid3:any=[];
dataerpproductsloyaltypointbased3:any=[];
dataerpproductsproductstatus3:any=[];
dataerpproductpricehistoriesbranchid3:any=[];
bfilterPopulateerpproductpricehistories:boolean=false;
dataecmcustomerbasketscustomerid3:any=[];
dataecmcustomerbasketsproductid3:any=[];
bfilterPopulateecmcustomerbaskets:boolean=false;
dataerpproductfeatureparametersitemsubcategoryid3:any=[];
dataerpproductfeatureparametersitemcategoryid3:any=[];
bfilterPopulateerpproductfeatureparameters:boolean=false;
bfilterPopulateecmreviews:boolean=false;
bfilterPopulateecmspecials:boolean=false;
bfilterPopulateerpproductaccesses:boolean=false;
bfilterPopulateerpproductattributes:boolean=false;
bfilterPopulateerpproductimages:boolean=false;
bfilterPopulateltymerchantproducts:boolean=false;
@ViewChild('tblerpproductpricehistoriessource',{static:false}) tblerpproductpricehistoriessource: Ng2SmartTableComponent;
@ViewChild('tblecmcustomerbasketssource',{static:false}) tblecmcustomerbasketssource: Ng2SmartTableComponent;
@ViewChild('tblerpproductfeatureparameterssource',{static:false}) tblerpproductfeatureparameterssource: Ng2SmartTableComponent;
@ViewChild('tblecmreviewssource',{static:false}) tblecmreviewssource: Ng2SmartTableComponent;
@ViewChild('tblecmspecialssource',{static:false}) tblecmspecialssource: Ng2SmartTableComponent;
@ViewChild('tblerpproductaccessessource',{static:false}) tblerpproductaccessessource: Ng2SmartTableComponent;
@ViewChild('tblerpproductattributessource',{static:false}) tblerpproductattributessource: Ng2SmartTableComponent;
@ViewChild('tblerpproductimagessource',{static:false}) tblerpproductimagessource: Ng2SmartTableComponent;
@ViewChild('tblltymerchantproductssource',{static:false}) tblltymerchantproductssource: Ng2SmartTableComponent;
 erpproductForm: FormGroup;
marketingmanageridList: bousermaster[];
marketingmanageridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
marketingmanagerid_bousermastersForm: FormGroup;//autocomplete
marketingmanagerid_bousermastersoptions:any;//autocomplete
marketingmanagerid_bousermastersformatter:any;//autocomplete
salesmanageridList: bousermaster[];
salesmanageridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
salesmanagerid_bousermastersForm: FormGroup;//autocomplete
salesmanagerid_bousermastersoptions:any;//autocomplete
salesmanagerid_bousermastersformatter:any;//autocomplete
supportmanageridList: bousermaster[];
supportmanageridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supportmanagerid_bousermastersForm: FormGroup;//autocomplete
supportmanagerid_bousermastersoptions:any;//autocomplete
supportmanagerid_bousermastersformatter:any;//autocomplete
marketingteamList: boteam[];
salesteamList: boteam[];
salesteamoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
salesteam_boteamsForm: FormGroup;//autocomplete
salesteam_boteamsoptions:any;//autocomplete
salesteam_boteamsformatter:any;//autocomplete
supportteamList: boteam[];
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
preferredsupplierList: erpsuppliermaster[];
preferredsupplieroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
preferredsupplier_erpsuppliermastersForm: FormGroup;//autocomplete
preferredsupplier_erpsuppliermastersoptions:any;//autocomplete
preferredsupplier_erpsuppliermastersformatter:any;//autocomplete
preferredproductList: erpsupplieritem[];
productcategoryList: boconfigvalue[];
uomList: boconfigvalue[];
currencyList: boconfigvalue[];
salesaccountList: erpfaaccountmaster[];
salesaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
salesaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
salesaccount_erpfaaccountmastersoptions:any;//autocomplete
salesaccount_erpfaaccountmastersformatter:any;//autocomplete
purchaseaccountList: erpfaaccountmaster[];
purchaseaccountoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
purchaseaccount_erpfaaccountmastersForm: FormGroup;//autocomplete
purchaseaccount_erpfaaccountmastersoptions:any;//autocomplete
purchaseaccount_erpfaaccountmastersformatter:any;//autocomplete
propositionmethod1List: boconfigvalue[];
propositionmethod2List: boconfigvalue[];
propositionmethod3List: boconfigvalue[];
competitorproductadditionowneridList: bousermaster[];
competitorproductadditionowneridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
competitorproductadditionownerid_bousermastersForm: FormGroup;//autocomplete
competitorproductadditionownerid_bousermastersoptions:any;//autocomplete
competitorproductadditionownerid_bousermastersformatter:any;//autocomplete
marketresearchowneridList: bousermaster[];
marketresearchowneridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
marketresearchownerid_bousermastersForm: FormGroup;//autocomplete
marketresearchownerid_bousermastersoptions:any;//autocomplete
marketresearchownerid_bousermastersformatter:any;//autocomplete
marketsegmentationowneridList: bousermaster[];
marketsegmentationowneridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
marketsegmentationownerid_bousermastersForm: FormGroup;//autocomplete
marketsegmentationownerid_bousermastersoptions:any;//autocomplete
marketsegmentationownerid_bousermastersformatter:any;//autocomplete
competitiveanalysisowneridList: bousermaster[];
competitiveanalysisowneridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
competitiveanalysisownerid_bousermastersForm: FormGroup;//autocomplete
competitiveanalysisownerid_bousermastersoptions:any;//autocomplete
competitiveanalysisownerid_bousermastersformatter:any;//autocomplete
competitivepositioningstrategyowneridList: bousermaster[];
competitivepositioningstrategyowneridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
competitivepositioningstrategyownerid_bousermastersForm: FormGroup;//autocomplete
competitivepositioningstrategyownerid_bousermastersoptions:any;//autocomplete
competitivepositioningstrategyownerid_bousermastersformatter:any;//autocomplete
loyaltypointbasedList: boconfigvalue[];
productstatusList: boconfigvalue[];
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
@ViewChild('productimage',{static:false}) productimage: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;

pointpercurrencyvisible:boolean = false;
pointperpurchasevisible:boolean = false;


erpproductpricehistoriesvisiblelist:any;
erpproductpricehistorieshidelist:any;
ecmcustomerbasketsvisiblelist:any;
ecmcustomerbasketshidelist:any;
erpproductfeatureparametersvisiblelist:any;
erpproductfeatureparametershidelist:any;
ecmreviewsvisiblelist:any;
ecmreviewshidelist:any;
ecmspecialsvisiblelist:any;
ecmspecialshidelist:any;
erpproductaccessesvisiblelist:any;
erpproductaccesseshidelist:any;
erpproductattributesvisiblelist:any;
erpproductattributeshidelist:any;
erpproductimagesvisiblelist:any;
erpproductimageshidelist:any;
ltymerchantproductsvisiblelist:any;
ltymerchantproductshidelist:any;

DeletederpproductpricehistoryIDs: string="";
erpproductpricehistoriesID: string = "1";
erpproductpricehistoriesselectedindex:any;
DeletedecmcustomerbasketIDs: string="";
ecmcustomerbasketsID: string = "2";
ecmcustomerbasketsselectedindex:any;
DeletederpproductfeatureparameterIDs: string="";
erpproductfeatureparametersID: string = "3";
erpproductfeatureparametersselectedindex:any;
DeletedecmreviewIDs: string="";
ecmreviewsID: string = "4";
ecmreviewsselectedindex:any;
DeletedecmspecialIDs: string="";
ecmspecialsID: string = "5";
ecmspecialsselectedindex:any;
DeletederpproductaccessIDs: string="";
erpproductaccessesID: string = "6";
erpproductaccessesselectedindex:any;
DeletederpproductattributeIDs: string="";
erpproductattributesID: string = "7";
erpproductattributesselectedindex:any;
DeletederpproductimageIDs: string="";
erpproductimagesID: string = "8";
erpproductimagesselectedindex:any;
DeletedltymerchantproductIDs: string="";
ltymerchantproductsID: string = "9";
ltymerchantproductsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpproductservice: erpproductService,
private bobranchmasterservice: bobranchmasterService,
private crmcustomermasterservice: crmcustomermasterService,
private bosubcategorymasterservice: bosubcategorymasterService,
private bomasterdataservice: bomasterdataService,
private bousergroupservice: bousergroupService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private boteamservice:boteamService,
private erpitemmasterservice:erpitemmasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpsupplieritemservice:erpsupplieritemService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
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
this.erpproductForm  = this.fb.group({pk:[null],ImageName: [null],
productid: [null],
productcode: [null],
productname: [null],
thumbnail: [null],
brand: [null],
genericname: [null],
model: [null],
availabledate: [null],
marketingmanagerid: [null],
marketingmanageriddesc: [null],
salesmanagerid: [null],
salesmanageriddesc: [null],
supportmanagerid: [null],
supportmanageriddesc: [null],
marketingteam: [null],
marketingteamdesc: [null],
salesteam: [null],
salesteamdesc: [null],
supportteam: [null],
supportteamdesc: [null],
metadata: [null],
itemid: [null],
itemiddesc: [null],
preferredsupplier: [null],
preferredsupplierdesc: [null],
preferredproduct: [null],
preferredproductdesc: [null],
productcategory: [null],
productcategorydesc: [null],
uom: [null],
uomdesc: [null],
productimage: [null],
description: [null],
dimension: [null],
weight: [null],
details: [null],
stock: [null],
stockprice: [null],
totalordered: [null],
minorderqty: [null],
currency: [null],
currencydesc: [null],
offerquantity1: [null],
unitprice1: [null],
totalcost1: [null],
offerquantity2: [null],
unitprice2: [null],
totalcost2: [null],
offerquantity3: [null],
unitprice3: [null],
totalcost3: [null],
salesdiscount: [null],
purchaserate: [null],
purchasediscount: [null],
salesaccount: [null],
salesaccountdesc: [null],
purchaseaccount: [null],
purchaseaccountdesc: [null],
itemquality: [null],
uniqueness: [null],
features: [null],
effectiveness: [null],
customerservice: [null],
innovation: [null],
marketshare: [null],
distributionchannels: [null],
salesability: [null],
wowfactor: [null],
valueproposition1: [null],
propositionmethod1: [null],
propositionmethod1desc: [null],
valueproposition2: [null],
propositionmethod2: [null],
propositionmethod2desc: [null],
valueproposition3: [null],
propositionmethod3: [null],
propositionmethod3desc: [null],
brandstory: [null],
emotionalbenefits: [null],
brandmeaning: [null],
marketview: [null],
brandpromise: [null],
brandpositioning: [null],
brandstrategy: [null],
brandcolors: [null],
competitorproductadditionownerid: [null],
competitorproductadditionowneriddesc: [null],
marketresearchownerid: [null],
marketresearchowneriddesc: [null],
marketsegmentationownerid: [null],
marketsegmentationowneriddesc: [null],
competitiveanalysisownerid: [null],
competitiveanalysisowneriddesc: [null],
competitivepositioningstrategyownerid: [null],
competitivepositioningstrategyowneriddesc: [null],
loyaltypointbased: [null],
loyaltypointbaseddesc: [null],
pointperpurchase: [null],
pointpercurrency: [null],
customfield: [null],
attachment: [null],
productstatus: [null],
productstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpproductForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpproductForm.dirty && this.erpproductForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.productid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.productid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.productid && pkDetail) {
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

debugger;
let erpproductid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=erpproductid;
//this.sharedService.alert(erpproductid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpproductpricehistoriesTableConfig();
  setTimeout(() => {
  this.SeterpproductpricehistoriesTableddConfig();
  });

this.SetecmcustomerbasketsTableConfig();
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });

this.SeterpproductfeatureparametersTableConfig();
  setTimeout(() => {
  this.SeterpproductfeatureparametersTableddConfig();
  });

this.SetecmreviewsTableConfig();
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
  });

this.SetecmspecialsTableConfig();
  setTimeout(() => {
  this.SetecmspecialsTableddConfig();
  });

this.SeterpproductaccessesTableConfig();
  setTimeout(() => {
  this.SeterpproductaccessesTableddConfig();
  });

this.SeterpproductattributesTableConfig();
  setTimeout(() => {
  this.SeterpproductattributesTableddConfig();
  });

this.SeterpproductimagesTableConfig();
  setTimeout(() => {
  this.SeterpproductimagesTableddConfig();
  });

this.SetltymerchantproductsTableConfig();
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.marketingmanageridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.marketingmanagerid){
this.marketingmanageridoptionsEvent.emit(this.marketingmanageridList);
this.erpproductForm.patchValue({
    marketingmanagerid: this.erpproductservice.formData.marketingmanagerid,
    marketingmanageriddesc: this.erpproductservice.formData.marketingmanageriddesc,
});
}
{
let arrmarketingmanagerid = this.marketingmanageridList.filter(v => v.userid == this.erpproductForm.get('marketingmanagerid').value);
let objmarketingmanagerid;
if (arrmarketingmanagerid.length > 0) objmarketingmanagerid = arrmarketingmanagerid[0];
if (objmarketingmanagerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.marketingmanagerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.marketingmanageridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.marketingmanagerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.salesmanageridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.salesmanagerid){
this.salesmanageridoptionsEvent.emit(this.salesmanageridList);
this.erpproductForm.patchValue({
    salesmanagerid: this.erpproductservice.formData.salesmanagerid,
    salesmanageriddesc: this.erpproductservice.formData.salesmanageriddesc,
});
}
{
let arrsalesmanagerid = this.salesmanageridList.filter(v => v.userid == this.erpproductForm.get('salesmanagerid').value);
let objsalesmanagerid;
if (arrsalesmanagerid.length > 0) objsalesmanagerid = arrsalesmanagerid[0];
if (objsalesmanagerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.salesmanagerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.salesmanageridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.salesmanagerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.supportmanageridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.supportmanagerid){
this.supportmanageridoptionsEvent.emit(this.supportmanageridList);
this.erpproductForm.patchValue({
    supportmanagerid: this.erpproductservice.formData.supportmanagerid,
    supportmanageriddesc: this.erpproductservice.formData.supportmanageriddesc,
});
}
{
let arrsupportmanagerid = this.supportmanageridList.filter(v => v.userid == this.erpproductForm.get('supportmanagerid').value);
let objsupportmanagerid;
if (arrsupportmanagerid.length > 0) objsupportmanagerid = arrsupportmanagerid[0];
if (objsupportmanagerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supportmanagerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supportmanageridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supportmanagerid_bousermastersformatter = (result: any) => result.username;
this.boteamservice.getboteamsList().then(res => 
{
this.marketingteamList = res as boteam[];
}
).catch((err) => {console.log(err);});
this.boteamservice.getboteamsList().then(res => 
{
this.salesteamList = res as boteam[];
if(this.erpproductservice.formData && this.erpproductservice.formData.salesteam){
this.salesteamoptionsEvent.emit(this.salesteamList);
this.erpproductForm.patchValue({
    salesteam: this.erpproductservice.formData.salesteam,
    salesteamdesc: this.erpproductservice.formData.salesteamdesc,
});
}
{
let arrsalesteam = this.salesteamList.filter(v => v.teamid == this.erpproductForm.get('salesteam').value);
let objsalesteam;
if (arrsalesteam.length > 0) objsalesteam = arrsalesteam[0];
if (objsalesteam)
{
}
}
}
).catch((err) => {console.log(err);});
this.salesteam_boteamsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.salesteamList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.salesteam_boteamsformatter = (result: any) => result.description;
this.boteamservice.getboteamsList().then(res => 
{
this.supportteamList = res as boteam[];
}
).catch((err) => {console.log(err);});
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpproductForm.patchValue({
    itemid: this.erpproductservice.formData.itemid,
    itemiddesc: this.erpproductservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpproductForm.get('itemid').value);
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
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.preferredsupplierList = res as erpsuppliermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.preferredsupplier){
this.preferredsupplieroptionsEvent.emit(this.preferredsupplierList);
this.erpproductForm.patchValue({
    preferredsupplier: this.erpproductservice.formData.preferredsupplier,
    preferredsupplierdesc: this.erpproductservice.formData.preferredsupplierdesc,
});
}
{
let arrpreferredsupplier = this.preferredsupplierList.filter(v => v.supplierid == this.erpproductForm.get('preferredsupplier').value);
let objpreferredsupplier;
if (arrpreferredsupplier.length > 0) objpreferredsupplier = arrpreferredsupplier[0];
if (objpreferredsupplier)
{
}
}
}
).catch((err) => {console.log(err);});
this.preferredsupplier_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.preferredsupplierList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.preferredsupplier_erpsuppliermastersformatter = (result: any) => result.suppliercode;
setTimeout(() => {
if(this.f.preferredsupplier.value && this.f.preferredsupplier.value!="" && this.f.preferredsupplier.value!=null)this.erpsupplieritemservice.getListBysupplierid(this.f.preferredsupplier.value).then(res =>{
this.preferredproductList = res as erpsupplieritem[];
if(this.erpproductservice.formData && this.erpproductservice.formData.preferredproduct){this.erpproductForm.patchValue({
    preferredproduct: this.erpproductservice.formData.preferredproduct,
    preferredproductdesc: this.erpproductservice.formData.preferredproductdesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("productcategory").then(res => this.productcategoryList = res as boconfigvalue[]);
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.salesaccountList = res as erpfaaccountmaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.salesaccount){
this.salesaccountoptionsEvent.emit(this.salesaccountList);
this.erpproductForm.patchValue({
    salesaccount: this.erpproductservice.formData.salesaccount,
    salesaccountdesc: this.erpproductservice.formData.salesaccountdesc,
});
}
{
let arrsalesaccount = this.salesaccountList.filter(v => v.accountid == this.erpproductForm.get('salesaccount').value);
let objsalesaccount;
if (arrsalesaccount.length > 0) objsalesaccount = arrsalesaccount[0];
if (objsalesaccount)
{
}
}
}
).catch((err) => {console.log(err);});
this.salesaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.salesaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.salesaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.purchaseaccountList = res as erpfaaccountmaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.purchaseaccount){
this.purchaseaccountoptionsEvent.emit(this.purchaseaccountList);
this.erpproductForm.patchValue({
    purchaseaccount: this.erpproductservice.formData.purchaseaccount,
    purchaseaccountdesc: this.erpproductservice.formData.purchaseaccountdesc,
});
}
{
let arrpurchaseaccount = this.purchaseaccountList.filter(v => v.accountid == this.erpproductForm.get('purchaseaccount').value);
let objpurchaseaccount;
if (arrpurchaseaccount.length > 0) objpurchaseaccount = arrpurchaseaccount[0];
if (objpurchaseaccount)
{
}
}
}
).catch((err) => {console.log(err);});
this.purchaseaccount_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.purchaseaccountList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.purchaseaccount_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.configservice.getList("propositionmethod1").then(res => this.propositionmethod1List = res as boconfigvalue[]);
this.configservice.getList("propositionmethod2").then(res => this.propositionmethod2List = res as boconfigvalue[]);
this.configservice.getList("propositionmethod3").then(res => this.propositionmethod3List = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.competitorproductadditionowneridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.competitorproductadditionownerid){
this.competitorproductadditionowneridoptionsEvent.emit(this.competitorproductadditionowneridList);
this.erpproductForm.patchValue({
    competitorproductadditionownerid: this.erpproductservice.formData.competitorproductadditionownerid,
    competitorproductadditionowneriddesc: this.erpproductservice.formData.competitorproductadditionowneriddesc,
});
}
{
let arrcompetitorproductadditionownerid = this.competitorproductadditionowneridList.filter(v => v.userid == this.erpproductForm.get('competitorproductadditionownerid').value);
let objcompetitorproductadditionownerid;
if (arrcompetitorproductadditionownerid.length > 0) objcompetitorproductadditionownerid = arrcompetitorproductadditionownerid[0];
if (objcompetitorproductadditionownerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.competitorproductadditionownerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.competitorproductadditionowneridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.competitorproductadditionownerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.marketresearchowneridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.marketresearchownerid){
this.marketresearchowneridoptionsEvent.emit(this.marketresearchowneridList);
this.erpproductForm.patchValue({
    marketresearchownerid: this.erpproductservice.formData.marketresearchownerid,
    marketresearchowneriddesc: this.erpproductservice.formData.marketresearchowneriddesc,
});
}
{
let arrmarketresearchownerid = this.marketresearchowneridList.filter(v => v.userid == this.erpproductForm.get('marketresearchownerid').value);
let objmarketresearchownerid;
if (arrmarketresearchownerid.length > 0) objmarketresearchownerid = arrmarketresearchownerid[0];
if (objmarketresearchownerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.marketresearchownerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.marketresearchowneridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.marketresearchownerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.marketsegmentationowneridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.marketsegmentationownerid){
this.marketsegmentationowneridoptionsEvent.emit(this.marketsegmentationowneridList);
this.erpproductForm.patchValue({
    marketsegmentationownerid: this.erpproductservice.formData.marketsegmentationownerid,
    marketsegmentationowneriddesc: this.erpproductservice.formData.marketsegmentationowneriddesc,
});
}
{
let arrmarketsegmentationownerid = this.marketsegmentationowneridList.filter(v => v.userid == this.erpproductForm.get('marketsegmentationownerid').value);
let objmarketsegmentationownerid;
if (arrmarketsegmentationownerid.length > 0) objmarketsegmentationownerid = arrmarketsegmentationownerid[0];
if (objmarketsegmentationownerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.marketsegmentationownerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.marketsegmentationowneridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.marketsegmentationownerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.competitiveanalysisowneridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.competitiveanalysisownerid){
this.competitiveanalysisowneridoptionsEvent.emit(this.competitiveanalysisowneridList);
this.erpproductForm.patchValue({
    competitiveanalysisownerid: this.erpproductservice.formData.competitiveanalysisownerid,
    competitiveanalysisowneriddesc: this.erpproductservice.formData.competitiveanalysisowneriddesc,
});
}
{
let arrcompetitiveanalysisownerid = this.competitiveanalysisowneridList.filter(v => v.userid == this.erpproductForm.get('competitiveanalysisownerid').value);
let objcompetitiveanalysisownerid;
if (arrcompetitiveanalysisownerid.length > 0) objcompetitiveanalysisownerid = arrcompetitiveanalysisownerid[0];
if (objcompetitiveanalysisownerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.competitiveanalysisownerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.competitiveanalysisowneridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.competitiveanalysisownerid_bousermastersformatter = (result: any) => result.username;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.competitivepositioningstrategyowneridList = res as bousermaster[];
if(this.erpproductservice.formData && this.erpproductservice.formData.competitivepositioningstrategyownerid){
this.competitivepositioningstrategyowneridoptionsEvent.emit(this.competitivepositioningstrategyowneridList);
this.erpproductForm.patchValue({
    competitivepositioningstrategyownerid: this.erpproductservice.formData.competitivepositioningstrategyownerid,
    competitivepositioningstrategyowneriddesc: this.erpproductservice.formData.competitivepositioningstrategyowneriddesc,
});
}
{
let arrcompetitivepositioningstrategyownerid = this.competitivepositioningstrategyowneridList.filter(v => v.userid == this.erpproductForm.get('competitivepositioningstrategyownerid').value);
let objcompetitivepositioningstrategyownerid;
if (arrcompetitivepositioningstrategyownerid.length > 0) objcompetitivepositioningstrategyownerid = arrcompetitivepositioningstrategyownerid[0];
if (objcompetitivepositioningstrategyownerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.competitivepositioningstrategyownerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.competitivepositioningstrategyowneridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.competitivepositioningstrategyownerid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("loyaltypointbased").then(res => this.loyaltypointbasedList = res as boconfigvalue[]);
this.configservice.getList("productstatus").then(res => this.productstatusList = res as boconfigvalue[]);

//autocomplete
    this.erpproductservice.geterpproductsList().then(res => {
      this.pkList = res as erpproduct[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.productname;

//setting the flag that the screen is not touched 
this.erpproductForm.markAsUntouched();
this.erpproductForm.markAsPristine();
}
onSelectedmarketingmanagerid(marketingmanageridDetail: any) {
if (marketingmanageridDetail.marketingmanagerid && marketingmanageridDetail) {
this.erpproductForm.patchValue({
marketingmanagerid: marketingmanageridDetail.marketingmanagerid,
marketingmanageriddesc: marketingmanageridDetail.username,

});

}
}

onSelectedsalesmanagerid(salesmanageridDetail: any) {
if (salesmanageridDetail.salesmanagerid && salesmanageridDetail) {
this.erpproductForm.patchValue({
salesmanagerid: salesmanageridDetail.salesmanagerid,
salesmanageriddesc: salesmanageridDetail.username,

});

}
}

onSelectedsupportmanagerid(supportmanageridDetail: any) {
if (supportmanageridDetail.supportmanagerid && supportmanageridDetail) {
this.erpproductForm.patchValue({
supportmanagerid: supportmanageridDetail.supportmanagerid,
supportmanageriddesc: supportmanageridDetail.username,

});

}
}

onSelectedsalesteam(salesteamDetail: any) {
if (salesteamDetail.salesteam && salesteamDetail) {
this.erpproductForm.patchValue({
salesteam: salesteamDetail.salesteam,
salesteamdesc: salesteamDetail.description,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpproductForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedpreferredsupplier(preferredsupplierDetail: any) {
if (preferredsupplierDetail.preferredsupplier && preferredsupplierDetail) {
this.erpproductForm.patchValue({
preferredsupplier: preferredsupplierDetail.preferredsupplier,
preferredsupplierdesc: preferredsupplierDetail.suppliercode,

});
this.erpsupplieritemservice.getListBysupplierid(preferredsupplierDetail.preferredsupplier).then(res => {
 this.preferredproductList = res as erpsupplieritem[]
}).catch((err) => {console.log(err);});

}
}

onSelectedsalesaccount(salesaccountDetail: any) {
if (salesaccountDetail.salesaccount && salesaccountDetail) {
this.erpproductForm.patchValue({
salesaccount: salesaccountDetail.salesaccount,
salesaccountdesc: salesaccountDetail.accountname,

});

}
}

onSelectedpurchaseaccount(purchaseaccountDetail: any) {
if (purchaseaccountDetail.purchaseaccount && purchaseaccountDetail) {
this.erpproductForm.patchValue({
purchaseaccount: purchaseaccountDetail.purchaseaccount,
purchaseaccountdesc: purchaseaccountDetail.accountname,

});

}
}

onSelectedcompetitorproductadditionownerid(competitorproductadditionowneridDetail: any) {
if (competitorproductadditionowneridDetail.competitorproductadditionownerid && competitorproductadditionowneridDetail) {
this.erpproductForm.patchValue({
competitorproductadditionownerid: competitorproductadditionowneridDetail.competitorproductadditionownerid,
competitorproductadditionowneriddesc: competitorproductadditionowneridDetail.username,

});

}
}

onSelectedmarketresearchownerid(marketresearchowneridDetail: any) {
if (marketresearchowneridDetail.marketresearchownerid && marketresearchowneridDetail) {
this.erpproductForm.patchValue({
marketresearchownerid: marketresearchowneridDetail.marketresearchownerid,
marketresearchowneriddesc: marketresearchowneridDetail.username,

});

}
}

onSelectedmarketsegmentationownerid(marketsegmentationowneridDetail: any) {
if (marketsegmentationowneridDetail.marketsegmentationownerid && marketsegmentationowneridDetail) {
this.erpproductForm.patchValue({
marketsegmentationownerid: marketsegmentationowneridDetail.marketsegmentationownerid,
marketsegmentationowneriddesc: marketsegmentationowneridDetail.username,

});

}
}

onSelectedcompetitiveanalysisownerid(competitiveanalysisowneridDetail: any) {
if (competitiveanalysisowneridDetail.competitiveanalysisownerid && competitiveanalysisowneridDetail) {
this.erpproductForm.patchValue({
competitiveanalysisownerid: competitiveanalysisowneridDetail.competitiveanalysisownerid,
competitiveanalysisowneriddesc: competitiveanalysisowneridDetail.username,

});

}
}

onSelectedcompetitivepositioningstrategyownerid(competitivepositioningstrategyowneridDetail: any) {
if (competitivepositioningstrategyowneridDetail.competitivepositioningstrategyownerid && competitivepositioningstrategyowneridDetail) {
this.erpproductForm.patchValue({
competitivepositioningstrategyownerid: competitivepositioningstrategyowneridDetail.competitivepositioningstrategyownerid,
competitivepositioningstrategyowneriddesc: competitivepositioningstrategyowneridDetail.username,

});

}
}




  getproductimage() {
    debugger;
    if (this.productimage.getattachmentlist().length > 0) {
      let file = this.productimage.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.erpproductForm != null)
this.erpproductForm.reset();
this.erpproductForm.patchValue({
marketingmanagerid: this.sessiondata.userid,
marketingmanageriddesc: this.sessiondata.username,
salesmanagerid: this.sessiondata.userid,
salesmanageriddesc: this.sessiondata.username,
supportmanagerid: this.sessiondata.userid,
supportmanageriddesc: this.sessiondata.username,
competitorproductadditionownerid: this.sessiondata.userid,
competitorproductadditionowneriddesc: this.sessiondata.username,
marketresearchownerid: this.sessiondata.userid,
marketresearchowneriddesc: this.sessiondata.username,
marketsegmentationownerid: this.sessiondata.userid,
marketsegmentationowneriddesc: this.sessiondata.username,
competitiveanalysisownerid: this.sessiondata.userid,
competitiveanalysisowneriddesc: this.sessiondata.username,
competitivepositioningstrategyownerid: this.sessiondata.userid,
competitivepositioningstrategyowneriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.erpproductservice.erpproductpricehistories=[];
this.erpproductpricehistoriesLoadTable();
this.erpproductservice.ecmcustomerbaskets=[];
this.ecmcustomerbasketsLoadTable();
this.erpproductservice.erpproductfeatureparameters=[];
this.erpproductfeatureparametersLoadTable();
this.erpproductservice.ecmreviews=[];
this.ecmreviewsLoadTable();
this.erpproductservice.ecmspecials=[];
this.ecmspecialsLoadTable();
this.erpproductservice.erpproductaccesses=[];
this.erpproductservice.Inserterpproductaccesses=[];
this.erpproductaccessesLoadTable();
this.erpproductservice.erpproductattributes=[];
this.erpproductattributesLoadTable();
this.erpproductservice.erpproductimages=[];
this.erpproductimagesLoadTable();
this.erpproductservice.ltymerchantproducts=[];
this.ltymerchantproductsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.pointpercurrencyvisible = false;
this.pointperpurchasevisible = false;
}

    onDelete() {
        let productid = this.erpproductForm.get('productid').value;
        if(productid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpproductservice.deleteerpproduct(productid).then(res =>
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
    this.erpproductForm.patchValue({
        productid: null
    });
    if(this.erpproductservice.formData.productid!=null)this.erpproductservice.formData.productid=null;
for (let i=0;i<this.erpproductservice.erpproductpricehistories.length;i++) {
this.erpproductservice.erpproductpricehistories[i].priceid=null;
}
for (let i=0;i<this.erpproductservice.ecmcustomerbaskets.length;i++) {
this.erpproductservice.ecmcustomerbaskets[i].customersbasketid=null;
}
for (let i=0;i<this.erpproductservice.erpproductfeatureparameters.length;i++) {
this.erpproductservice.erpproductfeatureparameters[i].epfpid=null;
}
for (let i=0;i<this.erpproductservice.ecmreviews.length;i++) {
this.erpproductservice.ecmreviews[i].reviewid=null;
}
for (let i=0;i<this.erpproductservice.ecmspecials.length;i++) {
this.erpproductservice.ecmspecials[i].specialid=null;
}
for (let i=0;i<this.erpproductservice.erpproductaccesses.length;i++) {
this.erpproductservice.erpproductaccesses[i].accessid=null;
}
for (let i=0;i<this.erpproductservice.erpproductattributes.length;i++) {
this.erpproductservice.erpproductattributes[i].productattributeid=null;
}
for (let i=0;i<this.erpproductservice.erpproductimages.length;i++) {
this.erpproductservice.erpproductimages[i].imageid=null;
}
for (let i=0;i<this.erpproductservice.ltymerchantproducts.length;i++) {
this.erpproductservice.ltymerchantproducts[i].merchantproductid=null;
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
        else if(key=="availabledate")
this.erpproductForm.patchValue({"availabledate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metadata")
this.erpproductForm.patchValue({"metadata":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.erpproductForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpproductForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpproductForm.controls[key]!=undefined)this.erpproductForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpproducts",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
productidonChange(evt:any){
let e=evt.value;
}
productcodeonChange(evt:any){
let e=evt.value;
}
productnameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
brandonChange(evt:any){
let e=evt.value;
}
genericnameonChange(evt:any){
let e=evt.value;
}
modelonChange(evt:any){
let e=evt.value;
}
availabledateonChange(evt:any){
let e=evt.value;
}
marketingmanageridonChange(evt:any){
let e=evt.value;
}
salesmanageridonChange(evt:any){
let e=evt.value;
}
supportmanageridonChange(evt:any){
let e=evt.value;
}
marketingteamonChange(evt:any){
let e=evt.value;
this.erpproductForm.patchValue({marketingteamdesc:evt.options[evt.options.selectedIndex].text});
}
salesteamonChange(evt:any){
let e=evt.value;
}
supportteamonChange(evt:any){
let e=evt.value;
this.erpproductForm.patchValue({supportteamdesc:evt.options[evt.options.selectedIndex].text});
}
metadataonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
preferredsupplieronChange(evt:any){
let e=evt.value;
}
preferredproductonChange(evt:any){
let e=evt.value;
this.erpproductForm.patchValue({preferredproductdesc:evt.options[evt.options.selectedIndex].text});
}
productcategoryonChange(evt:any){
let e=this.f.productcategory.value as any;
this.erpproductForm.patchValue({productcategorydesc:evt.options[evt.options.selectedIndex].text});
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpproductForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
productimageonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
dimensiononChange(evt:any){
let e=evt.value;
}
weightonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
stockonChange(evt:any){
let e=evt.value;
}
stockpriceonChange(evt:any){
let e=evt.value;
}
totalorderedonChange(evt:any){
let e=evt.value;
}
minorderqtyonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.erpproductForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
offerquantity1onChange(evt:any){
let e=evt.value;
}
unitprice1onChange(evt:any){
let e=evt.value;
}
totalcost1onChange(evt:any){
let e=evt.value;
}
offerquantity2onChange(evt:any){
let e=evt.value;
}
unitprice2onChange(evt:any){
let e=evt.value;
}
totalcost2onChange(evt:any){
let e=evt.value;
}
offerquantity3onChange(evt:any){
let e=evt.value;
}
unitprice3onChange(evt:any){
let e=evt.value;
}
totalcost3onChange(evt:any){
let e=evt.value;
}
salesdiscountonChange(evt:any){
let e=evt.value;
}
purchaserateonChange(evt:any){
let e=evt.value;
}
purchasediscountonChange(evt:any){
let e=evt.value;
}
salesaccountonChange(evt:any){
let e=evt.value;
}
purchaseaccountonChange(evt:any){
let e=evt.value;
}
itemqualityonChange(evt:any){
let e=evt.value;
}
uniquenessonChange(evt:any){
let e=evt.value;
}
featuresonChange(evt:any){
let e=evt.value;
}
effectivenessonChange(evt:any){
let e=evt.value;
}
customerserviceonChange(evt:any){
let e=evt.value;
}
innovationonChange(evt:any){
let e=evt.value;
}
marketshareonChange(evt:any){
let e=evt.value;
}
distributionchannelsonChange(evt:any){
let e=evt.value;
}
salesabilityonChange(evt:any){
let e=evt.value;
}
wowfactoronChange(evt:any){
let e=evt.value;
}
valueproposition1onChange(evt:any){
let e=evt.value;
}
propositionmethod1onChange(evt:any){
let e=this.f.propositionmethod1.value as any;
this.erpproductForm.patchValue({propositionmethod1desc:evt.options[evt.options.selectedIndex].text});
}
valueproposition2onChange(evt:any){
let e=evt.value;
}
propositionmethod2onChange(evt:any){
let e=this.f.propositionmethod2.value as any;
this.erpproductForm.patchValue({propositionmethod2desc:evt.options[evt.options.selectedIndex].text});
}
valueproposition3onChange(evt:any){
let e=evt.value;
}
propositionmethod3onChange(evt:any){
let e=this.f.propositionmethod3.value as any;
this.erpproductForm.patchValue({propositionmethod3desc:evt.options[evt.options.selectedIndex].text});
}
brandstoryonChange(evt:any){
let e=evt.value;
}
emotionalbenefitsonChange(evt:any){
let e=evt.value;
}
brandmeaningonChange(evt:any){
let e=evt.value;
}
marketviewonChange(evt:any){
let e=evt.value;
}
brandpromiseonChange(evt:any){
let e=evt.value;
}
brandpositioningonChange(evt:any){
let e=evt.value;
}
brandstrategyonChange(evt:any){
let e=evt.value;
}
brandcolorsonChange(evt:any){
let e=evt.value;
}
competitorproductadditionowneridonChange(evt:any){
let e=evt.value;
}
marketresearchowneridonChange(evt:any){
let e=evt.value;
}
marketsegmentationowneridonChange(evt:any){
let e=evt.value;
}
competitiveanalysisowneridonChange(evt:any){
let e=evt.value;
}
competitivepositioningstrategyowneridonChange(evt:any){
let e=evt.value;
}
loyaltypointbasedonChange(evt:any){
let e=this.f.loyaltypointbased.value as any;
this.pointpercurrencyvisible=false;
if(this.f.loyaltypointbased.value == 'C')this.pointpercurrencyvisible=true;
this.erpproductForm.patchValue({loyaltypointbaseddesc:evt.options[evt.options.selectedIndex].text});
}
pointperpurchaseonChange(evt:any){
let e=evt.value;
}
pointpercurrencyonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
productstatusonChange(evt:any){
let e=this.f.productstatus.value as any;
this.erpproductForm.patchValue({productstatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


async PopulateScreen(pkcol:any){
this.erpproductservice.geterpproductsByEID(pkcol).then(res => {

this.erpproductservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpproduct.productid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpproduct.productid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpproductForm.patchValue({
productid: res.erpproduct.productid,
productcode: res.erpproduct.productcode,
productname: res.erpproduct.productname,
thumbnail: res.erpproduct.thumbnail,
brand: res.erpproduct.brand,
genericname: res.erpproduct.genericname,
model: res.erpproduct.model,
availabledate: this.ngbDateParserFormatter.parse(res.erpproduct.availabledate),
marketingmanagerid: res.erpproduct.marketingmanagerid,
marketingmanageriddesc: res.erpproduct.marketingmanageriddesc,
salesmanagerid: res.erpproduct.salesmanagerid,
salesmanageriddesc: res.erpproduct.salesmanageriddesc,
supportmanagerid: res.erpproduct.supportmanagerid,
supportmanageriddesc: res.erpproduct.supportmanageriddesc,
marketingteam: res.erpproduct.marketingteam,
marketingteamdesc: res.erpproduct.marketingteamdesc,
salesteam: res.erpproduct.salesteam,
salesteamdesc: res.erpproduct.salesteamdesc,
supportteam: res.erpproduct.supportteam,
supportteamdesc: res.erpproduct.supportteamdesc,
metadata: JSON.parse(res.erpproduct.metadata),
itemid: res.erpproduct.itemid,
itemiddesc: res.erpproduct.itemiddesc,
preferredsupplier: res.erpproduct.preferredsupplier,
preferredsupplierdesc: res.erpproduct.preferredsupplierdesc,
preferredproduct: res.erpproduct.preferredproduct,
preferredproductdesc: res.erpproduct.preferredproductdesc,
productcategory: res.erpproduct.productcategory,
productcategorydesc: res.erpproduct.productcategorydesc,
uom: res.erpproduct.uom,
uomdesc: res.erpproduct.uomdesc,
productimage: res.erpproduct.productimage,
description: res.erpproduct.description,
dimension: res.erpproduct.dimension,
weight: res.erpproduct.weight,
details: res.erpproduct.details,
stock: res.erpproduct.stock,
stockprice: res.erpproduct.stockprice,
totalordered: res.erpproduct.totalordered,
minorderqty: res.erpproduct.minorderqty,
currency: res.erpproduct.currency,
currencydesc: res.erpproduct.currencydesc,
offerquantity1: res.erpproduct.offerquantity1,
unitprice1: res.erpproduct.unitprice1,
totalcost1: res.erpproduct.totalcost1,
offerquantity2: res.erpproduct.offerquantity2,
unitprice2: res.erpproduct.unitprice2,
totalcost2: res.erpproduct.totalcost2,
offerquantity3: res.erpproduct.offerquantity3,
unitprice3: res.erpproduct.unitprice3,
totalcost3: res.erpproduct.totalcost3,
salesdiscount: res.erpproduct.salesdiscount,
purchaserate: res.erpproduct.purchaserate,
purchasediscount: res.erpproduct.purchasediscount,
salesaccount: res.erpproduct.salesaccount,
salesaccountdesc: res.erpproduct.salesaccountdesc,
purchaseaccount: res.erpproduct.purchaseaccount,
purchaseaccountdesc: res.erpproduct.purchaseaccountdesc,
itemquality: res.erpproduct.itemquality,
uniqueness: res.erpproduct.uniqueness,
features: res.erpproduct.features,
effectiveness: res.erpproduct.effectiveness,
customerservice: res.erpproduct.customerservice,
innovation: res.erpproduct.innovation,
marketshare: res.erpproduct.marketshare,
distributionchannels: res.erpproduct.distributionchannels,
salesability: res.erpproduct.salesability,
wowfactor: res.erpproduct.wowfactor,
valueproposition1: res.erpproduct.valueproposition1,
propositionmethod1: res.erpproduct.propositionmethod1,
propositionmethod1desc: res.erpproduct.propositionmethod1desc,
valueproposition2: res.erpproduct.valueproposition2,
propositionmethod2: res.erpproduct.propositionmethod2,
propositionmethod2desc: res.erpproduct.propositionmethod2desc,
valueproposition3: res.erpproduct.valueproposition3,
propositionmethod3: res.erpproduct.propositionmethod3,
propositionmethod3desc: res.erpproduct.propositionmethod3desc,
brandstory: res.erpproduct.brandstory,
emotionalbenefits: res.erpproduct.emotionalbenefits,
brandmeaning: res.erpproduct.brandmeaning,
marketview: res.erpproduct.marketview,
brandpromise: res.erpproduct.brandpromise,
brandpositioning: res.erpproduct.brandpositioning,
brandstrategy: res.erpproduct.brandstrategy,
brandcolors: res.erpproduct.brandcolors,
competitorproductadditionownerid: res.erpproduct.competitorproductadditionownerid,
competitorproductadditionowneriddesc: res.erpproduct.competitorproductadditionowneriddesc,
marketresearchownerid: res.erpproduct.marketresearchownerid,
marketresearchowneriddesc: res.erpproduct.marketresearchowneriddesc,
marketsegmentationownerid: res.erpproduct.marketsegmentationownerid,
marketsegmentationowneriddesc: res.erpproduct.marketsegmentationowneriddesc,
competitiveanalysisownerid: res.erpproduct.competitiveanalysisownerid,
competitiveanalysisowneriddesc: res.erpproduct.competitiveanalysisowneriddesc,
competitivepositioningstrategyownerid: res.erpproduct.competitivepositioningstrategyownerid,
competitivepositioningstrategyowneriddesc: res.erpproduct.competitivepositioningstrategyowneriddesc,
loyaltypointbased: res.erpproduct.loyaltypointbased,
loyaltypointbaseddesc: res.erpproduct.loyaltypointbaseddesc,
pointperpurchase: res.erpproduct.pointperpurchase,
pointpercurrency: res.erpproduct.pointpercurrency,
customfield: res.erpproduct.customfield,
attachment: res.erpproduct.attachment,
productstatus: res.erpproduct.productstatus,
productstatusdesc: res.erpproduct.productstatusdesc,
status: res.erpproduct.status,
statusdesc: res.erpproduct.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("pointpercurrency")>=0)this.pointpercurrencyvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("pointpercurrency")>=0)this.pointpercurrencyvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("pointperpurchase")>=0)this.pointperpurchasevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("pointperpurchase")>=0)this.pointperpurchasevisible = false;
this.erpproductpricehistoriesvisiblelist=res.erpproductpricehistoriesvisiblelist;
this.ecmcustomerbasketsvisiblelist=res.ecmcustomerbasketsvisiblelist;
this.erpproductfeatureparametersvisiblelist=res.erpproductfeatureparametersvisiblelist;
this.ecmreviewsvisiblelist=res.ecmreviewsvisiblelist;
this.ecmspecialsvisiblelist=res.ecmspecialsvisiblelist;
this.erpproductaccessesvisiblelist=res.erpproductaccessesvisiblelist;
this.erpproductattributesvisiblelist=res.erpproductattributesvisiblelist;
this.erpproductimagesvisiblelist=res.erpproductimagesvisiblelist;
this.ltymerchantproductsvisiblelist=res.ltymerchantproductsvisiblelist;
if(this.erpproductForm.get('customfield').value!=null && this.erpproductForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpproductForm.get('customfield').value);
this.FillCustomField();
if(this.erpproductForm.get('productimage').value!=null && this.erpproductForm.get('productimage').value!="" && this.productimage!=null && this.productimage!=undefined)this.productimage.setattachmentlist(JSON.parse(this.erpproductForm.get('productimage').value));
if(this.erpproductForm.get('attachment').value!=null && this.erpproductForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.erpproductForm.get('attachment').value));
setTimeout(() => {
if(this.f.preferredsupplier.value && this.f.preferredsupplier.value!="" && this.f.preferredsupplier.value!=null)this.erpsupplieritemservice.getListBysupplierid(this.f.preferredsupplier.value).then(res =>{
this.preferredproductList = res as erpsupplieritem[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erpproductservice.erpproductpricehistories = res.erpproductpricehistories;
this.SeterpproductpricehistoriesTableConfig();
this.erpproductpricehistoriesLoadTable();
  setTimeout(() => {
  this.SeterpproductpricehistoriesTableddConfig();
  });
this.erpproductservice.ecmcustomerbaskets = res.ecmcustomerbaskets;
this.SetecmcustomerbasketsTableConfig();
this.ecmcustomerbasketsLoadTable();
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });
this.erpproductservice.erpproductfeatureparameters = res.erpproductfeatureparameters;
this.SeterpproductfeatureparametersTableConfig();
this.erpproductfeatureparametersLoadTable();
  setTimeout(() => {
  this.SeterpproductfeatureparametersTableddConfig();
  });
this.erpproductservice.ecmreviews = res.ecmreviews;
this.SetecmreviewsTableConfig();
this.ecmreviewsLoadTable();
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
  });
this.erpproductservice.ecmspecials = res.ecmspecials;
this.SetecmspecialsTableConfig();
this.ecmspecialsLoadTable();
  setTimeout(() => {
  this.SetecmspecialsTableddConfig();
  });
this.erpproductservice.erpproductaccesses = res.erpproductaccesses;
this.SeterpproductaccessesTableConfig();
this.erpproductaccessesLoadTable();
  setTimeout(() => {
  this.SeterpproductaccessesTableddConfig();
  });
this.erpproductservice.Inserterpproductaccesses=[];
this.erpproductservice.erpproductattributes = res.erpproductattributes;
this.SeterpproductattributesTableConfig();
this.erpproductattributesLoadTable();
  setTimeout(() => {
  this.SeterpproductattributesTableddConfig();
  });
this.erpproductservice.erpproductimages = res.erpproductimages;
this.SeterpproductimagesTableConfig();
this.erpproductimagesLoadTable();
  setTimeout(() => {
  this.SeterpproductimagesTableddConfig();
  });
this.erpproductservice.ltymerchantproducts = res.ltymerchantproducts;
this.SetltymerchantproductsTableConfig();
this.ltymerchantproductsLoadTable();
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
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
  for (let key in this.erpproductForm.controls) {
    if (this.erpproductForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpproductForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpproductForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpproductForm.value;
obj.availabledate=new Date(this.erpproductForm.get('availabledate').value ? this.ngbDateParserFormatter.format(this.erpproductForm.get('availabledate').value)+'  UTC' :null);
obj.metadata=JSON.stringify(this.erpproductForm.get('metadata').value);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.productimage.getAllFiles());
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpproductForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpproductForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpproductForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpproductservice.formData=this.erpproductForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpproductForm.controls[key] != null)
    {
        this.erpproductservice.formData[key] = this.erpproductForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpproductservice.formData.availabledate=new Date(this.erpproductForm.get('availabledate').value ? this.ngbDateParserFormatter.format(this.erpproductForm.get('availabledate').value)+'  UTC' :null);
this.erpproductservice.formData.metadata=JSON.stringify(this.erpproductForm.get('metadata').value);
this.erpproductservice.formData.productimage=this.erpproductForm.get('productimage').value;
this.erpproductservice.formData.customfield=JSON.stringify(customfields);
this.erpproductservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpproductservice.formData.DeletederpproductpricehistoryIDs = this.DeletederpproductpricehistoryIDs;
this.erpproductservice.formData.DeletedecmcustomerbasketIDs = this.DeletedecmcustomerbasketIDs;
this.erpproductservice.formData.DeletederpproductfeatureparameterIDs = this.DeletederpproductfeatureparameterIDs;
this.erpproductservice.formData.DeletedecmreviewIDs = this.DeletedecmreviewIDs;
this.erpproductservice.formData.DeletedecmspecialIDs = this.DeletedecmspecialIDs;
this.erpproductservice.formData.DeletederpproductaccessIDs = this.DeletederpproductaccessIDs;
this.erpproductservice.formData.DeletederpproductattributeIDs = this.DeletederpproductattributeIDs;
this.erpproductservice.formData.DeletederpproductimageIDs = this.DeletederpproductimageIDs;
this.erpproductservice.formData.DeletedltymerchantproductIDs = this.DeletedltymerchantproductIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpproductservice.formData);
this.erpproductservice.formData=this.erpproductForm.value;
this.erpproductservice.saveOrUpdateerpproducts().subscribe(
async res => {
await this.sharedService.upload(this.productimage.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpproductpricehistoriessource.data)
{
    for (let i = 0; i < this.erpproductpricehistoriessource.data.length; i++)
    {
        if (this.erpproductpricehistoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpproductpricehistoriessource.data[i].fileattachmentlist);
    }
}
if (this.ecmcustomerbasketssource.data)
{
    for (let i = 0; i < this.ecmcustomerbasketssource.data.length; i++)
    {
        if (this.ecmcustomerbasketssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ecmcustomerbasketssource.data[i].fileattachmentlist);
    }
}
if (this.erpproductfeatureparameterssource.data)
{
    for (let i = 0; i < this.erpproductfeatureparameterssource.data.length; i++)
    {
        if (this.erpproductfeatureparameterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpproductfeatureparameterssource.data[i].fileattachmentlist);
    }
}
if (this.ecmreviewssource.data)
{
    for (let i = 0; i < this.ecmreviewssource.data.length; i++)
    {
        if (this.ecmreviewssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ecmreviewssource.data[i].fileattachmentlist);
    }
}
if (this.ecmspecialssource.data)
{
    for (let i = 0; i < this.ecmspecialssource.data.length; i++)
    {
        if (this.ecmspecialssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ecmspecialssource.data[i].fileattachmentlist);
    }
}
if (this.erpproductaccessessource.data)
{
    for (let i = 0; i < this.erpproductaccessessource.data.length; i++)
    {
        if (this.erpproductaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpproductaccessessource.data[i].fileattachmentlist);
    }
}
if (this.erpproductattributessource.data)
{
    for (let i = 0; i < this.erpproductattributessource.data.length; i++)
    {
        if (this.erpproductattributessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpproductattributessource.data[i].fileattachmentlist);
    }
}
if (this.erpproductimagessource.data)
{
    for (let i = 0; i < this.erpproductimagessource.data.length; i++)
    {
        if (this.erpproductimagessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpproductimagessource.data[i].fileattachmentlist);
    }
}
if (this.ltymerchantproductssource.data)
{
    for (let i = 0; i < this.ltymerchantproductssource.data.length; i++)
    {
        if (this.ltymerchantproductssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltymerchantproductssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpproduct);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpproductservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpproduct);
}
else
{
this.FillData(res);
}
}
this.erpproductForm.markAsUntouched();
this.erpproductForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmarketingmanagerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('marketingmanagerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsalesmanagerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('salesmanagerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupportmanagerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('supportmanagerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmarketingteam( teamid) {
/*let ScreenType='2';
this.dialog.open(boteamComponent, 
{
data: {teamid:this.erpproductForm.get('marketingteam').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsalesteam( teamid) {
/*let ScreenType='2';
this.dialog.open(boteamComponent, 
{
data: {teamid:this.erpproductForm.get('salesteam').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupportteam( teamid) {
/*let ScreenType='2';
this.dialog.open(boteamComponent, 
{
data: {teamid:this.erpproductForm.get('supportteam').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpproductForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpreferredsupplier( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpproductForm.get('preferredsupplier').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpreferredproduct( supplieritemid) {
/*let ScreenType='2';
this.dialog.open(erpsupplieritemComponent, 
{
data: {supplieritemid:this.erpproductForm.get('preferredproduct').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsalesaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpproductForm.get('salesaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpurchaseaccount( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpproductForm.get('purchaseaccount').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcompetitorproductadditionownerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('competitorproductadditionownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmarketresearchownerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('marketresearchownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmarketsegmentationownerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('marketsegmentationownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcompetitiveanalysisownerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('competitiveanalysisownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcompetitivepositioningstrategyownerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpproductForm.get('competitivepositioningstrategyownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpproductpricehistory(event:any,priceid:any, productid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpproductpricehistoryComponent, 
{
data:  {  showview:this.showview,save:false,event,priceid, productid,visiblelist:this.erpproductpricehistoriesvisiblelist,  hidelist:this.erpproductpricehistorieshidelist,ScreenType:2  },
header: 'Price History'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpproductpricehistoriessource.add(res);
this.erpproductpricehistoriessource.refresh();
}
else
{
this.erpproductpricehistoriessource.update(event.data, res);
}
}
});
}

onDeleteerpproductpricehistory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpproductpricehistoryIDs += childID + ",";
this.erpproductservice.erpproductpricehistories.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditecmcustomerbasket(event:any,customersbasketid:any, productid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ecmcustomerbasketComponent, 
{
data:  {  showview:this.showview,save:false,event,customersbasketid, productid,visiblelist:this.ecmcustomerbasketsvisiblelist,  hidelist:this.ecmcustomerbasketshidelist,ScreenType:2  },
header: 'Customer Baskets'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ecmcustomerbasketssource.add(res);
this.ecmcustomerbasketssource.refresh();
}
else
{
this.ecmcustomerbasketssource.update(event.data, res);
}
}
});
}

onDeleteecmcustomerbasket(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedecmcustomerbasketIDs += childID + ",";
this.erpproductservice.ecmcustomerbaskets.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerpproductfeatureparameter(event:any,epfpid:any, productid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpproductfeatureparameterComponent, 
{
data:  {  showview:this.showview,save:false,event,epfpid, productid,visiblelist:this.erpproductfeatureparametersvisiblelist,  hidelist:this.erpproductfeatureparametershidelist,ScreenType:2  },
header: 'Feature Parameters'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpproductfeatureparameterssource.add(res);
this.erpproductfeatureparameterssource.refresh();
}
else
{
this.erpproductfeatureparameterssource.update(event.data, res);
}
}
});
}

onDeleteerpproductfeatureparameter(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpproductfeatureparameterIDs += childID + ",";
this.erpproductservice.erpproductfeatureparameters.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditecmreview(event:any,reviewid:any, productid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ecmreviewComponent, 
{
data:  {  showview:this.showview,save:false,event,reviewid, productid,visiblelist:this.ecmreviewsvisiblelist,  hidelist:this.ecmreviewshidelist,ScreenType:2  },
header: 'Reviews'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ecmreviewssource.add(res);
this.ecmreviewssource.refresh();
}
else
{
this.ecmreviewssource.update(event.data, res);
}
}
});
}

onDeleteecmreview(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedecmreviewIDs += childID + ",";
this.erpproductservice.ecmreviews.splice(i, 1);
//this.updateGrandTotal();
}

onDeleteecmspecial(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedecmspecialIDs += childID + ",";
this.erpproductservice.ecmspecials.splice(i, 1);
}

onDeleteerpproductattribute(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpproductattributeIDs += childID + ",";
this.erpproductservice.erpproductattributes.splice(i, 1);
}

AddOrEditerpproductimage(event:any,imageid:any, productid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpproductimageComponent, 
{
data:  {  showview:this.showview,save:false,event,imageid, productid,visiblelist:this.erpproductimagesvisiblelist,  hidelist:this.erpproductimageshidelist,ScreenType:2  },
header: 'Images'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpproductimagessource.add(res);
this.erpproductimagessource.refresh();
}
else
{
this.erpproductimagessource.update(event.data, res);
}
}
});
}

onDeleteerpproductimage(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpproductimageIDs += childID + ",";
this.erpproductservice.erpproductimages.splice(i, 1);
//this.updateGrandTotal();
}

onDeleteltymerchantproduct(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltymerchantproductIDs += childID + ",";
this.erpproductservice.ltymerchantproducts.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpproductpricehistories
erpproductpricehistoriessettings:any;
erpproductpricehistoriessource: any;

showerpproductpricehistoriesCheckbox()
{
debugger;
if(this.tblerpproductpricehistoriessource.settings['selectMode']== 'multi')this.tblerpproductpricehistoriessource.settings['selectMode']= 'single';
else
this.tblerpproductpricehistoriessource.settings['selectMode']= 'multi';
this.tblerpproductpricehistoriessource.initGrid();
}
deleteerpproductpricehistoriesAll()
{
this.tblerpproductpricehistoriessource.settings['selectMode'] = 'single';
}
showerpproductpricehistoriesFilter()
{
  setTimeout(() => {
  this.SeterpproductpricehistoriesTableddConfig();
  });
      if(this.tblerpproductpricehistoriessource.settings!=null)this.tblerpproductpricehistoriessource.settings['hideSubHeader'] =!this.tblerpproductpricehistoriessource.settings['hideSubHeader'];
this.tblerpproductpricehistoriessource.initGrid();
}
showerpproductpricehistoriesInActive()
{
}
enableerpproductpricehistoriesInActive()
{
}
async SeterpproductpricehistoriesTableddConfig()
{
if(!this.bfilterPopulateerpproductpricehistories){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpproductpricehistoriesbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.dataerpproductpricehistoriesbranchid3.push(obj);
}
if((this.tblerpproductpricehistoriessource.settings as any).columns['branchid'])
{
(this.tblerpproductpricehistoriessource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpproductpricehistoriesbranchid3));
this.tblerpproductpricehistoriessource.initGrid();
}
});
}
this.bfilterPopulateerpproductpricehistories=true;
}
async erpproductpricehistoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpproductpricehistoriesTableConfig()
{
this.erpproductpricehistoriessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
branchid: {
title: 'Branch',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'bxg94',reportcode:'bxg94',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerpproductpricehistoriesbranchid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
pricedate: {
title: 'Price Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
offerquantity1: {
title: 'Offer Quantity1',
type: 'number',
filter:true,
},
unitprice1: {
title: 'Unit Price1',
type: 'number',
filter:true,
},
totalcost1: {
title: 'Total Cost1',
type: 'number',
filter:true,
},
offerquantity2: {
title: 'Offer Quantity2',
type: 'number',
filter:true,
},
unitprice2: {
title: 'Unit Price2',
type: 'number',
filter:true,
},
totalcost2: {
title: 'Total Cost2',
type: 'number',
filter:true,
},
offerquantity3: {
title: 'Offer Quantity3',
type: 'number',
filter:true,
},
unitprice3: {
title: 'Unit Price3',
type: 'number',
filter:true,
},
totalcost3: {
title: 'Total Cost3',
type: 'number',
filter:true,
},
},
};
}
erpproductpricehistoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductpricehistoriesID)>=0)
{
this.erpproductpricehistoriessource=new LocalDataSource();
this.erpproductpricehistoriessource.load(this.erpproductservice.erpproductpricehistories as  any as LocalDataSource);
this.erpproductpricehistoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpproductpricehistoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.erpproductpricehistories.length == 0)
{
    this.tblerpproductpricehistoriessource.grid.createFormShown = true;
}
else
{
    let obj = new erpproductpricehistory();
    this.erpproductservice.erpproductpricehistories.push(obj);
    this.erpproductpricehistoriessource.refresh();
    if ((this.erpproductservice.erpproductpricehistories.length / this.erpproductpricehistoriessource.getPaging().perPage).toFixed(0) + 1 != this.erpproductpricehistoriessource.getPaging().page)
    {
        this.erpproductpricehistoriessource.setPage((this.erpproductservice.erpproductpricehistories.length / this.erpproductpricehistoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpproductpricehistoriessource.grid.edit(this.tblerpproductpricehistoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpproductpricehistoriessource.data.indexOf(event.data);
this.onDeleteerpproductpricehistory(event,event.data.priceid,((this.erpproductpricehistoriessource.getPaging().page-1) *this.erpproductpricehistoriessource.getPaging().perPage)+index);
this.erpproductpricehistoriessource.refresh();
break;
}
}

*/
erpproductpricehistoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpproductpricehistory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpproductpricehistory(event,event.data.priceid,this.formid);
break;
case 'delete':
this.onDeleteerpproductpricehistory(event,event.data.priceid,((this.erpproductpricehistoriessource.getPaging().page-1) *this.erpproductpricehistoriessource.getPaging().perPage)+event.index);
this.erpproductpricehistoriessource.refresh();
break;
}
}
erpproductpricehistoriesonDelete(obj) {
let priceid=obj.data.priceid;
if (confirm('Are you sure to delete this record ?')) {
this.erpproductservice.deleteerpproduct(priceid).then(res=>
this.erpproductpricehistoriesLoadTable()
);
}
}
erpproductpricehistoriesPaging(val)
{
debugger;
this.erpproductpricehistoriessource.setPaging(1, val, true);
}

handleerpproductpricehistoriesGridSelected(event:any) {
this.erpproductpricehistoriesselectedindex=this.erpproductservice.erpproductpricehistories.findIndex(i => i.priceid === event.data.priceid);
}
IserpproductpricehistoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductpricehistoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpproductpricehistories
//start of Grid Codes ecmcustomerbaskets
ecmcustomerbasketssettings:any;
ecmcustomerbasketssource: any;

showecmcustomerbasketsCheckbox()
{
debugger;
if(this.tblecmcustomerbasketssource.settings['selectMode']== 'multi')this.tblecmcustomerbasketssource.settings['selectMode']= 'single';
else
this.tblecmcustomerbasketssource.settings['selectMode']= 'multi';
this.tblecmcustomerbasketssource.initGrid();
}
deleteecmcustomerbasketsAll()
{
this.tblecmcustomerbasketssource.settings['selectMode'] = 'single';
}
showecmcustomerbasketsFilter()
{
  setTimeout(() => {
  this.SetecmcustomerbasketsTableddConfig();
  });
      if(this.tblecmcustomerbasketssource.settings!=null)this.tblecmcustomerbasketssource.settings['hideSubHeader'] =!this.tblecmcustomerbasketssource.settings['hideSubHeader'];
this.tblecmcustomerbasketssource.initGrid();
}
showecmcustomerbasketsInActive()
{
}
enableecmcustomerbasketsInActive()
{
}
async SetecmcustomerbasketsTableddConfig()
{
if(!this.bfilterPopulateecmcustomerbaskets){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmcustomerbasketscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataecmcustomerbasketscustomerid3.push(obj);
}
if((this.tblecmcustomerbasketssource.settings as any).columns['customerid'])
{
(this.tblecmcustomerbasketssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmcustomerbasketscustomerid3));
this.tblecmcustomerbasketssource.initGrid();
}
});

this.erpproductservice.geterpproductsList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataecmcustomerbasketsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.dataecmcustomerbasketsproductid3.push(obj);
}
if((this.tblecmcustomerbasketssource.settings as any).columns['productid'])
{
(this.tblecmcustomerbasketssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.dataecmcustomerbasketsproductid3));
this.tblecmcustomerbasketssource.initGrid();
}
});
}
this.bfilterPopulateecmcustomerbaskets=true;
}
async ecmcustomerbasketsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetecmcustomerbasketsTableConfig()
{
this.ecmcustomerbasketssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
customerid: {
title: 'Customer',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'',reportcode:'',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataecmcustomerbasketscustomerid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
dateadded: {
title: 'Date Added',
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
ecmcustomerbasketsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmcustomerbasketsID)>=0)
{
this.ecmcustomerbasketssource=new LocalDataSource();
this.ecmcustomerbasketssource.load(this.erpproductservice.ecmcustomerbaskets as  any as LocalDataSource);
this.ecmcustomerbasketssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ecmcustomerbasketsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.ecmcustomerbaskets.length == 0)
{
    this.tblecmcustomerbasketssource.grid.createFormShown = true;
}
else
{
    let obj = new ecmcustomerbasket();
    this.erpproductservice.ecmcustomerbaskets.push(obj);
    this.ecmcustomerbasketssource.refresh();
    if ((this.erpproductservice.ecmcustomerbaskets.length / this.ecmcustomerbasketssource.getPaging().perPage).toFixed(0) + 1 != this.ecmcustomerbasketssource.getPaging().page)
    {
        this.ecmcustomerbasketssource.setPage((this.erpproductservice.ecmcustomerbaskets.length / this.ecmcustomerbasketssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblecmcustomerbasketssource.grid.edit(this.tblecmcustomerbasketssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ecmcustomerbasketssource.data.indexOf(event.data);
this.onDeleteecmcustomerbasket(event,event.data.customersbasketid,((this.ecmcustomerbasketssource.getPaging().page-1) *this.ecmcustomerbasketssource.getPaging().perPage)+index);
this.ecmcustomerbasketssource.refresh();
break;
}
}

*/
ecmcustomerbasketsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditecmcustomerbasket(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditecmcustomerbasket(event,event.data.customersbasketid,this.formid);
break;
case 'delete':
this.onDeleteecmcustomerbasket(event,event.data.customersbasketid,((this.ecmcustomerbasketssource.getPaging().page-1) *this.ecmcustomerbasketssource.getPaging().perPage)+event.index);
this.ecmcustomerbasketssource.refresh();
break;
}
}
ecmcustomerbasketsonDelete(obj) {
let customersbasketid=obj.data.customersbasketid;
if (confirm('Are you sure to delete this record ?')) {
this.erpproductservice.deleteerpproduct(customersbasketid).then(res=>
this.ecmcustomerbasketsLoadTable()
);
}
}
ecmcustomerbasketsPaging(val)
{
debugger;
this.ecmcustomerbasketssource.setPaging(1, val, true);
}

handleecmcustomerbasketsGridSelected(event:any) {
this.ecmcustomerbasketsselectedindex=this.erpproductservice.ecmcustomerbaskets.findIndex(i => i.customersbasketid === event.data.customersbasketid);
}
IsecmcustomerbasketsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmcustomerbasketsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ecmcustomerbaskets
//start of Grid Codes erpproductfeatureparameters
erpproductfeatureparameterssettings:any;
erpproductfeatureparameterssource: any;

showerpproductfeatureparametersCheckbox()
{
debugger;
if(this.tblerpproductfeatureparameterssource.settings['selectMode']== 'multi')this.tblerpproductfeatureparameterssource.settings['selectMode']= 'single';
else
this.tblerpproductfeatureparameterssource.settings['selectMode']= 'multi';
this.tblerpproductfeatureparameterssource.initGrid();
}
deleteerpproductfeatureparametersAll()
{
this.tblerpproductfeatureparameterssource.settings['selectMode'] = 'single';
}
showerpproductfeatureparametersFilter()
{
  setTimeout(() => {
  this.SeterpproductfeatureparametersTableddConfig();
  });
      if(this.tblerpproductfeatureparameterssource.settings!=null)this.tblerpproductfeatureparameterssource.settings['hideSubHeader'] =!this.tblerpproductfeatureparameterssource.settings['hideSubHeader'];
this.tblerpproductfeatureparameterssource.initGrid();
}
showerpproductfeatureparametersInActive()
{
}
enableerpproductfeatureparametersInActive()
{
}
async SeterpproductfeatureparametersTableddConfig()
{
if(!this.bfilterPopulateerpproductfeatureparameters){

this.bomasterdataservice.getList("rs8fd").then(res=>
{
var dataitemcategoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpproductfeatureparametersitemcategoryid3.push(defaultobj);
for(let i=0; i<dataitemcategoryid2.length; i++){
var obj= { value: dataitemcategoryid2[i].masterdataid, title:dataitemcategoryid2[i].masterdatadescription};
this.dataerpproductfeatureparametersitemcategoryid3.push(obj);
}
if((this.tblerpproductfeatureparameterssource.settings as any).columns['itemcategoryid'])
{
(this.tblerpproductfeatureparameterssource.settings as any).columns['itemcategoryid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpproductfeatureparametersitemcategoryid3));
this.tblerpproductfeatureparameterssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var dataitemsubcategoryid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpproductfeatureparametersitemsubcategoryid3.push(defaultobj);
for(let i=0; i<dataitemsubcategoryid2.length; i++){
var obj= { value: dataitemsubcategoryid2[i].subcategoryid, title:dataitemsubcategoryid2[i].subcategoryname};
this.dataerpproductfeatureparametersitemsubcategoryid3.push(obj);
}
if((this.tblerpproductfeatureparameterssource.settings as any).columns['itemsubcategoryid'])
{
(this.tblerpproductfeatureparameterssource.settings as any).columns['itemsubcategoryid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpproductfeatureparametersitemsubcategoryid3));
this.tblerpproductfeatureparameterssource.initGrid();
}
});
}
this.bfilterPopulateerpproductfeatureparameters=true;
}
async erpproductfeatureparametersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpproductfeatureparametersTableConfig()
{
this.erpproductfeatureparameterssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
itemcategoryid: {
title: 'Item Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpproductfeatureparametersitemcategoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
itemsubcategoryid: {
title: 'Item Sub Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpproductfeatureparametersitemsubcategoryid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
customfieldid: {
title: 'Custom Field',
type: 'number',
filter:true,
},
},
};
}
erpproductfeatureparametersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductfeatureparametersID)>=0)
{
this.erpproductfeatureparameterssource=new LocalDataSource();
this.erpproductfeatureparameterssource.load(this.erpproductservice.erpproductfeatureparameters as  any as LocalDataSource);
this.erpproductfeatureparameterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpproductfeatureparametersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.erpproductfeatureparameters.length == 0)
{
    this.tblerpproductfeatureparameterssource.grid.createFormShown = true;
}
else
{
    let obj = new erpproductfeatureparameter();
    this.erpproductservice.erpproductfeatureparameters.push(obj);
    this.erpproductfeatureparameterssource.refresh();
    if ((this.erpproductservice.erpproductfeatureparameters.length / this.erpproductfeatureparameterssource.getPaging().perPage).toFixed(0) + 1 != this.erpproductfeatureparameterssource.getPaging().page)
    {
        this.erpproductfeatureparameterssource.setPage((this.erpproductservice.erpproductfeatureparameters.length / this.erpproductfeatureparameterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpproductfeatureparameterssource.grid.edit(this.tblerpproductfeatureparameterssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.erpproductfeatureparameterssource.data.indexOf(event.data);
this.onDeleteerpproductfeatureparameter(event,event.data.epfpid,((this.erpproductfeatureparameterssource.getPaging().page-1) *this.erpproductfeatureparameterssource.getPaging().perPage)+index);
this.erpproductfeatureparameterssource.refresh();
}
break;
}
}

*/
erpproductfeatureparametersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpproductfeatureparameter(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpproductfeatureparameter(event,event.data.epfpid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeleteerpproductfeatureparameter(event,event.data.epfpid,((this.erpproductfeatureparameterssource.getPaging().page-1) *this.erpproductfeatureparameterssource.getPaging().perPage)+event.index);
this.erpproductfeatureparameterssource.refresh();
}
break;
}
}
erpproductfeatureparametersonDelete(obj) {
let epfpid=obj.data.epfpid;
if (confirm('Are you sure to delete this record ?')) {
this.erpproductservice.deleteerpproduct(epfpid).then(res=>
this.erpproductfeatureparametersLoadTable()
);
}
}
erpproductfeatureparametersPaging(val)
{
debugger;
this.erpproductfeatureparameterssource.setPaging(1, val, true);
}

handleerpproductfeatureparametersGridSelected(event:any) {
this.erpproductfeatureparametersselectedindex=this.erpproductservice.erpproductfeatureparameters.findIndex(i => i.epfpid === event.data.epfpid);
}
IserpproductfeatureparametersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductfeatureparametersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpproductfeatureparameters
//start of Grid Codes ecmreviews
ecmreviewssettings:any;
ecmreviewssource: any;

showecmreviewsCheckbox()
{
debugger;
if(this.tblecmreviewssource.settings['selectMode']== 'multi')this.tblecmreviewssource.settings['selectMode']= 'single';
else
this.tblecmreviewssource.settings['selectMode']= 'multi';
this.tblecmreviewssource.initGrid();
}
deleteecmreviewsAll()
{
this.tblecmreviewssource.settings['selectMode'] = 'single';
}
showecmreviewsFilter()
{
  setTimeout(() => {
  this.SetecmreviewsTableddConfig();
  });
      if(this.tblecmreviewssource.settings!=null)this.tblecmreviewssource.settings['hideSubHeader'] =!this.tblecmreviewssource.settings['hideSubHeader'];
this.tblecmreviewssource.initGrid();
}
showecmreviewsInActive()
{
}
enableecmreviewsInActive()
{
}
async SetecmreviewsTableddConfig()
{
if(!this.bfilterPopulateecmreviews){
}
this.bfilterPopulateecmreviews=true;
}
async ecmreviewsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetecmreviewsTableConfig()
{
this.ecmreviewssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
customerid: {
title: 'Customer',
type: 'number',
filter:true,
},
reviewdate: {
title: 'Review Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reviewtext: {
title: 'Review Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
reviewstatus: {
title: 'Review Status',
type: '',
filter:true,
},
reads: {
title: 'Reads',
type: 'number',
filter:true,
},
},
};
}
ecmreviewsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmreviewsID)>=0)
{
this.ecmreviewssource=new LocalDataSource();
this.ecmreviewssource.load(this.erpproductservice.ecmreviews as  any as LocalDataSource);
this.ecmreviewssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ecmreviewsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.ecmreviews.length == 0)
{
    this.tblecmreviewssource.grid.createFormShown = true;
}
else
{
    let obj = new ecmreview();
    this.erpproductservice.ecmreviews.push(obj);
    this.ecmreviewssource.refresh();
    if ((this.erpproductservice.ecmreviews.length / this.ecmreviewssource.getPaging().perPage).toFixed(0) + 1 != this.ecmreviewssource.getPaging().page)
    {
        this.ecmreviewssource.setPage((this.erpproductservice.ecmreviews.length / this.ecmreviewssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblecmreviewssource.grid.edit(this.tblecmreviewssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ecmreviewssource.data.indexOf(event.data);
this.onDeleteecmreview(event,event.data.reviewid,((this.ecmreviewssource.getPaging().page-1) *this.ecmreviewssource.getPaging().perPage)+index);
this.ecmreviewssource.refresh();
break;
}
}

*/
ecmreviewsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditecmreview(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditecmreview(event,event.data.reviewid,this.formid);
break;
case 'delete':
this.onDeleteecmreview(event,event.data.reviewid,((this.ecmreviewssource.getPaging().page-1) *this.ecmreviewssource.getPaging().perPage)+event.index);
this.ecmreviewssource.refresh();
break;
}
}
ecmreviewsonDelete(obj) {
let reviewid=obj.data.reviewid;
if (confirm('Are you sure to delete this record ?')) {
this.erpproductservice.deleteerpproduct(reviewid).then(res=>
this.ecmreviewsLoadTable()
);
}
}
ecmreviewsPaging(val)
{
debugger;
this.ecmreviewssource.setPaging(1, val, true);
}

handleecmreviewsGridSelected(event:any) {
this.ecmreviewsselectedindex=this.erpproductservice.ecmreviews.findIndex(i => i.reviewid === event.data.reviewid);
}
IsecmreviewsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmreviewsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ecmreviews
//start of Grid Codes ecmspecials
ecmspecialssettings:any;
ecmspecialssource: any;

showecmspecialsCheckbox()
{
debugger;
if(this.tblecmspecialssource.settings['selectMode']== 'multi')this.tblecmspecialssource.settings['selectMode']= 'single';
else
this.tblecmspecialssource.settings['selectMode']= 'multi';
this.tblecmspecialssource.initGrid();
}
deleteecmspecialsAll()
{
this.tblecmspecialssource.settings['selectMode'] = 'single';
}
showecmspecialsFilter()
{
  setTimeout(() => {
  this.SetecmspecialsTableddConfig();
  });
      if(this.tblecmspecialssource.settings!=null)this.tblecmspecialssource.settings['hideSubHeader'] =!this.tblecmspecialssource.settings['hideSubHeader'];
this.tblecmspecialssource.initGrid();
}
showecmspecialsInActive()
{
}
enableecmspecialsInActive()
{
}
async SetecmspecialsTableddConfig()
{
if(!this.bfilterPopulateecmspecials){
}
this.bfilterPopulateecmspecials=true;
}
async ecmspecialsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetecmspecialsTableConfig()
{
this.ecmspecialssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
specialprice: {
title: 'Special Price',
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
specialstatus: {
title: 'Special Status',
type: '',
filter:true,
},
},
};
}
ecmspecialsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmspecialsID)>=0)
{
this.ecmspecialssource=new LocalDataSource();
this.ecmspecialssource.load(this.erpproductservice.ecmspecials as  any as LocalDataSource);
this.ecmspecialssource.setPaging(1, 20, true);
}
}
ecmspecialsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.ecmspecials.length == 0)
{
    this.tblecmspecialssource.grid.createFormShown = true;
}
else
{
    let obj = new ecmspecial();
    this.erpproductservice.ecmspecials.push(obj);
    this.ecmspecialssource.refresh();
    if ((this.erpproductservice.ecmspecials.length / this.ecmspecialssource.getPaging().perPage).toFixed(0) + 1 != this.ecmspecialssource.getPaging().page)
    {
        this.ecmspecialssource.setPage((this.erpproductservice.ecmspecials.length / this.ecmspecialssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblecmspecialssource.grid.edit(this.tblecmspecialssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ecmspecialssource.data.indexOf(event.data);
this.onDeleteecmspecial(event,event.data.specialid,((this.ecmspecialssource.getPaging().page-1) *this.ecmspecialssource.getPaging().perPage)+index);
this.ecmspecialssource.refresh();
break;
}
}
ecmspecialsPaging(val)
{
debugger;
this.ecmspecialssource.setPaging(1, val, true);
}

handleecmspecialsGridSelected(event:any) {
this.ecmspecialsselectedindex=this.erpproductservice.ecmspecials.findIndex(i => i.specialid === event.data.specialid);
}
IsecmspecialsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ecmspecialsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ecmspecials
//start of Grid Codes erpproductaccesses
onCustomerpproductaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bousergroupComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bousergroup details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
erpproductaccessessettings:any;
erpproductaccessessource: any;

showerpproductaccessesCheckbox()
{
debugger;
if(this.tblerpproductaccessessource.settings['selectMode']== 'multi')this.tblerpproductaccessessource.settings['selectMode']= 'single';
else
this.tblerpproductaccessessource.settings['selectMode']= 'multi';
this.tblerpproductaccessessource.initGrid();
}
deleteerpproductaccessesAll()
{
this.tblerpproductaccessessource.settings['selectMode'] = 'single';
}
showerpproductaccessesFilter()
{
  setTimeout(() => {
  this.SeterpproductaccessesTableddConfig();
  });
      if(this.tblerpproductaccessessource.settings!=null)this.tblerpproductaccessessource.settings['hideSubHeader'] =!this.tblerpproductaccessessource.settings['hideSubHeader'];
this.tblerpproductaccessessource.initGrid();
}
showerpproductaccessesInActive()
{
}
enableerpproductaccessesInActive()
{
}
async SeterpproductaccessesTableddConfig()
{
if(!this.bfilterPopulateerpproductaccesses){
}
this.bfilterPopulateerpproductaccesses=true;
}
async erpproductaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpproductaccessesTableConfig()
{
this.erpproductaccessessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
accessid: {
title: 'Access',
type: '',
},
groupname: {
title: 'Groupname',
type: '',
},
},
};
}
erpproductaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductaccessesID)>=0)
{
this.erpproductaccessessource=new LocalDataSource();
this.erpproductaccessessource.load(this.erpproductservice.erpproductaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblerpproductaccessessource!=null)
{this.tblerpproductaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.erpproductservice.Inserterpproductaccesses.push(row.data);
this.tblerpproductaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
erpproductaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.erpproductaccesses.length == 0)
{
    this.tblerpproductaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new erpproductaccess();
    this.erpproductservice.erpproductaccesses.push(obj);
    this.erpproductaccessessource.refresh();
    if ((this.erpproductservice.erpproductaccesses.length / this.erpproductaccessessource.getPaging().perPage).toFixed(0) + 1 != this.erpproductaccessessource.getPaging().page)
    {
        this.erpproductaccessessource.setPage((this.erpproductservice.erpproductaccesses.length / this.erpproductaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpproductaccessessource.grid.edit(this.tblerpproductaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpproductaccessessource.data.indexOf(event.data);
this.onDeleteerpproductaccess(event,event.data.accessid,((this.erpproductaccessessource.getPaging().page-1) *this.erpproductaccessessource.getPaging().perPage)+index);
this.erpproductaccessessource.refresh();
break;
}
}

*/
erpproductaccessesPaging(val)
{
debugger;
this.erpproductaccessessource.setPaging(1, val, true);
}

handleerpproductaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={productid:this.formid,usergroupid:event.data.usergroupid}
this.erpproductservice.Inserterpproductaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletederpproductaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.accessid)
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
if(event.data.accessid!=null && event.data.accessid!="")this.DeletederpproductaccessIDs += event.data.accessid + ","; 
}
}
IserpproductaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpproductaccesses
//start of Grid Codes erpproductattributes
erpproductattributessettings:any;
erpproductattributessource: any;

showerpproductattributesCheckbox()
{
debugger;
if(this.tblerpproductattributessource.settings['selectMode']== 'multi')this.tblerpproductattributessource.settings['selectMode']= 'single';
else
this.tblerpproductattributessource.settings['selectMode']= 'multi';
this.tblerpproductattributessource.initGrid();
}
deleteerpproductattributesAll()
{
this.tblerpproductattributessource.settings['selectMode'] = 'single';
}
showerpproductattributesFilter()
{
  setTimeout(() => {
  this.SeterpproductattributesTableddConfig();
  });
      if(this.tblerpproductattributessource.settings!=null)this.tblerpproductattributessource.settings['hideSubHeader'] =!this.tblerpproductattributessource.settings['hideSubHeader'];
this.tblerpproductattributessource.initGrid();
}
showerpproductattributesInActive()
{
}
enableerpproductattributesInActive()
{
}
async SeterpproductattributesTableddConfig()
{
if(!this.bfilterPopulateerpproductattributes){
}
this.bfilterPopulateerpproductattributes=true;
}
async erpproductattributesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpproductattributesTableConfig()
{
this.erpproductattributessettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
optionid: {
title: 'Option',
type: 'number',
filter:true,
},
valueid: {
title: 'Value',
type: 'number',
filter:true,
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
priceprefix: {
title: 'Price Prefix',
type: '',
filter:true,
},
},
};
}
erpproductattributesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductattributesID)>=0)
{
this.erpproductattributessource=new LocalDataSource();
this.erpproductattributessource.load(this.erpproductservice.erpproductattributes as  any as LocalDataSource);
this.erpproductattributessource.setPaging(1, 20, true);
}
}
erpproductattributesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.erpproductattributes.length == 0)
{
    this.tblerpproductattributessource.grid.createFormShown = true;
}
else
{
    let obj = new erpproductattribute();
    this.erpproductservice.erpproductattributes.push(obj);
    this.erpproductattributessource.refresh();
    if ((this.erpproductservice.erpproductattributes.length / this.erpproductattributessource.getPaging().perPage).toFixed(0) + 1 != this.erpproductattributessource.getPaging().page)
    {
        this.erpproductattributessource.setPage((this.erpproductservice.erpproductattributes.length / this.erpproductattributessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpproductattributessource.grid.edit(this.tblerpproductattributessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpproductattributessource.data.indexOf(event.data);
this.onDeleteerpproductattribute(event,event.data.productattributeid,((this.erpproductattributessource.getPaging().page-1) *this.erpproductattributessource.getPaging().perPage)+index);
this.erpproductattributessource.refresh();
break;
}
}
erpproductattributesPaging(val)
{
debugger;
this.erpproductattributessource.setPaging(1, val, true);
}

handleerpproductattributesGridSelected(event:any) {
this.erpproductattributesselectedindex=this.erpproductservice.erpproductattributes.findIndex(i => i.productattributeid === event.data.productattributeid);
}
IserpproductattributesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductattributesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpproductattributes
//start of Grid Codes erpproductimages
erpproductimagessettings:any;
erpproductimagessource: any;

showerpproductimagesCheckbox()
{
debugger;
if(this.tblerpproductimagessource.settings['selectMode']== 'multi')this.tblerpproductimagessource.settings['selectMode']= 'single';
else
this.tblerpproductimagessource.settings['selectMode']= 'multi';
this.tblerpproductimagessource.initGrid();
}
deleteerpproductimagesAll()
{
this.tblerpproductimagessource.settings['selectMode'] = 'single';
}
showerpproductimagesFilter()
{
  setTimeout(() => {
  this.SeterpproductimagesTableddConfig();
  });
      if(this.tblerpproductimagessource.settings!=null)this.tblerpproductimagessource.settings['hideSubHeader'] =!this.tblerpproductimagessource.settings['hideSubHeader'];
this.tblerpproductimagessource.initGrid();
}
showerpproductimagesInActive()
{
}
enableerpproductimagesInActive()
{
}
async SeterpproductimagesTableddConfig()
{
if(!this.bfilterPopulateerpproductimages){
}
this.bfilterPopulateerpproductimages=true;
}
async erpproductimagesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpproductimagesTableConfig()
{
this.erpproductimagessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
image: {
title: 'Image',
type: '',
filter:true,
},
htmlcontent: {
title: 'Htmlcontent',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
sortorder: {
title: 'Sort Order',
type: 'number',
filter:true,
},
},
};
}
erpproductimagesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductimagesID)>=0)
{
this.erpproductimagessource=new LocalDataSource();
this.erpproductimagessource.load(this.erpproductservice.erpproductimages as  any as LocalDataSource);
this.erpproductimagessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpproductimagesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.erpproductimages.length == 0)
{
    this.tblerpproductimagessource.grid.createFormShown = true;
}
else
{
    let obj = new erpproductimage();
    this.erpproductservice.erpproductimages.push(obj);
    this.erpproductimagessource.refresh();
    if ((this.erpproductservice.erpproductimages.length / this.erpproductimagessource.getPaging().perPage).toFixed(0) + 1 != this.erpproductimagessource.getPaging().page)
    {
        this.erpproductimagessource.setPage((this.erpproductservice.erpproductimages.length / this.erpproductimagessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpproductimagessource.grid.edit(this.tblerpproductimagessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpproductimagessource.data.indexOf(event.data);
this.onDeleteerpproductimage(event,event.data.imageid,((this.erpproductimagessource.getPaging().page-1) *this.erpproductimagessource.getPaging().perPage)+index);
this.erpproductimagessource.refresh();
break;
}
}

*/
erpproductimagesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpproductimage(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpproductimage(event,event.data.imageid,this.formid);
break;
case 'delete':
this.onDeleteerpproductimage(event,event.data.imageid,((this.erpproductimagessource.getPaging().page-1) *this.erpproductimagessource.getPaging().perPage)+event.index);
this.erpproductimagessource.refresh();
break;
}
}
erpproductimagesonDelete(obj) {
let imageid=obj.data.imageid;
if (confirm('Are you sure to delete this record ?')) {
this.erpproductservice.deleteerpproduct(imageid).then(res=>
this.erpproductimagesLoadTable()
);
}
}
erpproductimagesPaging(val)
{
debugger;
this.erpproductimagessource.setPaging(1, val, true);
}

handleerpproductimagesGridSelected(event:any) {
this.erpproductimagesselectedindex=this.erpproductservice.erpproductimages.findIndex(i => i.imageid === event.data.imageid);
}
IserpproductimagesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpproductimagesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpproductimages
//start of Grid Codes ltymerchantproducts
ltymerchantproductssettings:any;
ltymerchantproductssource: any;

showltymerchantproductsCheckbox()
{
debugger;
if(this.tblltymerchantproductssource.settings['selectMode']== 'multi')this.tblltymerchantproductssource.settings['selectMode']= 'single';
else
this.tblltymerchantproductssource.settings['selectMode']= 'multi';
this.tblltymerchantproductssource.initGrid();
}
deleteltymerchantproductsAll()
{
this.tblltymerchantproductssource.settings['selectMode'] = 'single';
}
showltymerchantproductsFilter()
{
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
  });
      if(this.tblltymerchantproductssource.settings!=null)this.tblltymerchantproductssource.settings['hideSubHeader'] =!this.tblltymerchantproductssource.settings['hideSubHeader'];
this.tblltymerchantproductssource.initGrid();
}
showltymerchantproductsInActive()
{
}
enableltymerchantproductsInActive()
{
}
async SetltymerchantproductsTableddConfig()
{
if(!this.bfilterPopulateltymerchantproducts){
}
this.bfilterPopulateltymerchantproducts=true;
}
async ltymerchantproductsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltymerchantproductsTableConfig()
{
this.ltymerchantproductssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
merchantid: {
title: 'Merchant',
type: 'number',
filter:true,
},
setupfee: {
title: 'Setup Fee',
type: 'number',
filter:true,
},
servicefee: {
title: 'Service Fee',
type: 'number',
filter:true,
},
pertransactionfee: {
title: 'Per Transaction Fee',
type: 'number',
filter:true,
},
},
};
}
ltymerchantproductsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltymerchantproductsID)>=0)
{
this.ltymerchantproductssource=new LocalDataSource();
this.ltymerchantproductssource.load(this.erpproductservice.ltymerchantproducts as  any as LocalDataSource);
this.ltymerchantproductssource.setPaging(1, 20, true);
}
}
ltymerchantproductsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpproductservice.ltymerchantproducts.length == 0)
{
    this.tblltymerchantproductssource.grid.createFormShown = true;
}
else
{
    let obj = new ltymerchantproduct();
    this.erpproductservice.ltymerchantproducts.push(obj);
    this.ltymerchantproductssource.refresh();
    if ((this.erpproductservice.ltymerchantproducts.length / this.ltymerchantproductssource.getPaging().perPage).toFixed(0) + 1 != this.ltymerchantproductssource.getPaging().page)
    {
        this.ltymerchantproductssource.setPage((this.erpproductservice.ltymerchantproducts.length / this.ltymerchantproductssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltymerchantproductssource.grid.edit(this.tblltymerchantproductssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltymerchantproductssource.data.indexOf(event.data);
this.onDeleteltymerchantproduct(event,event.data.merchantproductid,((this.ltymerchantproductssource.getPaging().page-1) *this.ltymerchantproductssource.getPaging().perPage)+index);
this.ltymerchantproductssource.refresh();
break;
}
}
ltymerchantproductsPaging(val)
{
debugger;
this.ltymerchantproductssource.setPaging(1, val, true);
}

handleltymerchantproductsGridSelected(event:any) {
this.ltymerchantproductsselectedindex=this.erpproductservice.ltymerchantproducts.findIndex(i => i.merchantproductid === event.data.merchantproductid);
}
IsltymerchantproductsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltymerchantproductsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltymerchantproducts

}



