import { ltycampaignService } from './../../../service/ltycampaign.service';
import { ltycampaign } from './../../../model/ltycampaign.model';
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
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { ltymerchant} from './../../../model/ltymerchant.model';
import { ltymerchantService } from './../../../service/ltymerchant.service';
//popups
import { ltystore} from './../../../model/ltystore.model';
import { ltystoreService } from './../../../service/ltystore.service';
//popups
import { ltycoupontype} from './../../../model/ltycoupontype.model';
import { ltycoupontypeService } from './../../../service/ltycoupontype.service';
//popups
import { lmsproductmaster} from '../../../../../../n-tire-crm-app/src/app/model/lmsproductmaster.model';
import { lmsproductmasterService } from '../../../../../../n-tire-crm-app/src/app/service/lmsproductmaster.service';
//popups
import { ltylevel} from './../../../model/ltylevel.model';
import { ltylevelService } from './../../../service/ltylevel.service';
//popups
//detail table services
import { ltycustomerreward } from './../../../model/ltycustomerreward.model';
import { ltycustomerrewardComponent } from './../../../pages/forms/ltycustomerreward/ltycustomerreward.component';
//FK services
import { crmcustomermaster,IcrmcustomermasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
import { ltycampaigncriteria } from './../../../model/ltycampaigncriteria.model';
import { ltycampaigncriteriaComponent } from './../../../pages/forms/ltycampaigncriteria/ltycampaigncriteria.component';
//FK services
import { lmscampaignmaster,IlmscampaignmasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/lmscampaignmaster.model';
import { lmscampaignmasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.component';
import { lmscampaignmasterService } from '../../../../../../n-tire-crm-app/src/app/service/lmscampaignmaster.service';
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
selector: 'app-ltycampaign',
templateUrl: './ltycampaign.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltycampaignComponent implements OnInit {
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
bfilterPopulateltycampaigns:boolean=false;
dataltycampaignscampaigntype3:any=[];
dataltycampaignscampaignsubtype3:any=[];
dataltycampaignscampaigncategory3:any=[];
dataltycampaignsvalidity3:any=[];
dataltycampaignsapplicabledays3:any=[];
dataltycampaignsmerchantid3:any=[];
dataltycampaignsstoreid3:any=[];
dataltycampaignseventname3:any=[];
dataltycampaignscampaignstatus3:any=[];
dataltycampaignsrewardtype3:any=[];
dataltycampaignsrewardmethod3:any=[];
dataltycampaignscoupontypeid3:any=[];
dataltycampaignsproductid3:any=[];
dataltycampaignsrewardunit3:any=[];
dataltycampaignsrewardlevel3:any=[];
dataltycampaignsrewardprefix3:any=[];
dataltycustomerrewardscustomerid3:any=[];
bfilterPopulateltycustomerrewards:boolean=false;
dataltycampaigncriteriascampaignid3:any=[];
bfilterPopulateltycampaigncriterias:boolean=false;
@ViewChild('tblltycustomerrewardssource',{static:false}) tblltycustomerrewardssource: Ng2SmartTableComponent;
@ViewChild('tblltycampaigncriteriassource',{static:false}) tblltycampaigncriteriassource: Ng2SmartTableComponent;
 ltycampaignForm: FormGroup;
campaigntypeList: bomasterdata[];
campaignsubtypeList: bosubcategorymaster[];
campaigncategoryList: boconfigvalue[];
validityList: boconfigvalue[];
applicabledaysList: any[];
merchantidList: ltymerchant[];
merchantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
merchantid_ltymerchantsForm: FormGroup;//autocomplete
merchantid_ltymerchantsoptions:any;//autocomplete
merchantid_ltymerchantsformatter:any;//autocomplete
storeidList: ltystore[];
eventnameList: boconfigvalue[];
campaignstatusList: boconfigvalue[];
rewardtypeList: boconfigvalue[];
rewardmethodList: boconfigvalue[];
coupontypeidList: ltycoupontype[];
productidList: lmsproductmaster[];
productidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
productid_lmsproductmastersForm: FormGroup;//autocomplete
productid_lmsproductmastersoptions:any;//autocomplete
productid_lmsproductmastersformatter:any;//autocomplete
rewardunitList: boconfigvalue[];
rewardlevelList: ltylevel[];
rewardprefixList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('imageurl',{static:false}) imageurl: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;

usedbycustomersvisible:boolean = false;
totalpointsearnedvisible:boolean = false;
productidvisible:boolean = false;

rewardvaluevisible:boolean = false;

ltycustomerrewardsvisiblelist:any;
ltycustomerrewardshidelist:any;
ltycampaigncriteriasvisiblelist:any;
ltycampaigncriteriashidelist:any;

DeletedltycustomerrewardIDs: string="";
ltycustomerrewardsID: string = "1";
ltycustomerrewardsselectedindex:any;
DeletedltycampaigncriteriaIDs: string="";
ltycampaigncriteriasID: string = "2";
ltycampaigncriteriasselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltycampaignservice: ltycampaignService,
private crmcustomermasterservice: crmcustomermasterService,
private lmscampaignmasterservice: lmscampaignmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private ltymerchantservice:ltymerchantService,
private ltystoreservice:ltystoreService,
private ltycoupontypeservice:ltycoupontypeService,
private lmsproductmasterservice:lmsproductmasterService,
private ltylevelservice:ltylevelService,
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
this.ltycampaignForm  = this.fb.group({
pk:[null],
campaignid: [null],
name: [null],
campaigntype: [null],
campaigntypedesc: [null],
campaignsubtype: [null],
campaignsubtypedesc: [null],
campaigncategory: [null],
campaigncategorydesc: [null],
imageurl: [null],
validity: [null],
validitydesc: [null],
startdate: [null],
enddate: [null],
applicabledays: [null],
merchantid: [null],
merchantiddesc: [null],
storeid: [null],
storeiddesc: [null],
validdaysfrompublishdate: [null],
displaycomingsoon: [null],
displaycountdown: [null],
publishdate: [null],
eventname: [null],
eventnamedesc: [null],
totallimit: [null],
limitpercustomer: [null],
referrerpoint: [null],
usedbycustomers: [null],
totalpointsearned: [null],
totalproducts: [null],
campaignstatus: [null],
campaignstatusdesc: [null],
rank: [null],
rewardtype: [null],
rewardtypedesc: [null],
rewardmethod: [null],
rewardmethoddesc: [null],
rewardvalue: [null],
coupontypeid: [null],
coupontypeiddesc: [null],
productid: [null],
productiddesc: [null],
rewardunit: [null],
rewardunitdesc: [null],
rewardlevel: [null],
rewardleveldesc: [null],
rewardprefix: [null],
rewardprefixdesc: [null],
rewardmultiplier: [null],
claimbuttonlabel: [null],
redeeminstructions: [null],
terms: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltycampaignForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltycampaignForm.dirty && this.ltycampaignForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.campaignid && pkDetail) {
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
let ltycampaignid = null;

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
this.formid=ltycampaignid;
//this.sharedService.alert(ltycampaignid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetltycustomerrewardsTableConfig();
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });

this.SetltycampaigncriteriasTableConfig();
  setTimeout(() => {
  this.SetltycampaigncriteriasTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("RETY").then(res => {
this.campaigntypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.campaigntype.value && this.f.campaigntype.value!="" && this.f.campaigntype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.campaigntype.value).then(res =>{
this.campaignsubtypeList = res as bosubcategorymaster[];
if(this.ltycampaignservice.formData && this.ltycampaignservice.formData.campaignsubtype){this.ltycampaignForm.patchValue({
    campaignsubtype: this.ltycampaignservice.formData.campaignsubtype,
    campaignsubtypedesc: this.ltycampaignservice.formData.campaignsubtypedesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("ltycampaigncategory").then(res => this.campaigncategoryList = res as boconfigvalue[]);
this.configservice.getList("frequency").then(res => this.validityList = res as boconfigvalue[]);
this.configservice.getList("weekday").then(res => 
{
this.applicabledaysList = (res as boconfigvalue[]).map((item) =>{return {label:item.configtext,value:item.configkey}});
}).catch((err) => {console.log(err);});
this.ltymerchantservice.getltymerchantsList().then(res => 
{
this.merchantidList = res as ltymerchant[];
if(this.ltycampaignservice.formData && this.ltycampaignservice.formData.merchantid){
this.merchantidoptionsEvent.emit(this.merchantidList);
this.ltycampaignForm.patchValue({
    merchantid: this.ltycampaignservice.formData.merchantid,
    merchantiddesc: this.ltycampaignservice.formData.merchantiddesc,
});
}
{
let arrmerchantid = this.merchantidList.filter(v => v.merchantid == this.ltycampaignForm.get('merchantid').value);
let objmerchantid;
if (arrmerchantid.length > 0) objmerchantid = arrmerchantid[0];
if (objmerchantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.merchantid_ltymerchantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.merchantidList.filter(v => v.establishmentname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.merchantid_ltymerchantsformatter = (result: any) => result.establishmentname;
this.ltystoreservice.getltystoresList().then(res => 
{
this.storeidList = res as ltystore[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("eventname").then(res => this.eventnameList = res as boconfigvalue[]);
this.configservice.getList("ltycampaignstatus").then(res => this.campaignstatusList = res as boconfigvalue[]);
this.configservice.getList("loyaltyrewardtype").then(res => this.rewardtypeList = res as boconfigvalue[]);
this.configservice.getList("loyaltyrewardmethod").then(res => this.rewardmethodList = res as boconfigvalue[]);
this.ltycoupontypeservice.getltycoupontypesList().then(res => 
{
this.coupontypeidList = res as ltycoupontype[];
}
).catch((err) => {console.log(err);});
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
if(this.ltycampaignservice.formData && this.ltycampaignservice.formData.productid){
this.productidoptionsEvent.emit(this.productidList);
this.ltycampaignForm.patchValue({
    productid: this.ltycampaignservice.formData.productid,
    productiddesc: this.ltycampaignservice.formData.productiddesc,
});
}
{
let arrproductid = this.productidList.filter(v => v.productid == this.ltycampaignForm.get('productid').value);
let objproductid;
if (arrproductid.length > 0) objproductid = arrproductid[0];
if (objproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.productid_lmsproductmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.productidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.productid_lmsproductmastersformatter = (result: any) => result.productname;
this.configservice.getList("amountunit").then(res => this.rewardunitList = res as boconfigvalue[]);
this.ltylevelservice.getltylevelsList().then(res => 
{
this.rewardlevelList = res as ltylevel[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("amountprefix").then(res => this.rewardprefixList = res as boconfigvalue[]);

//autocomplete
    this.ltycampaignservice.getltycampaignsList().then(res => {
      this.pkList = res as ltycampaign[];
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
this.ltycampaignForm.markAsUntouched();
this.ltycampaignForm.markAsPristine();
}
onSelectedmerchantid(merchantidDetail: any) {
if (merchantidDetail.merchantid && merchantidDetail) {
this.ltycampaignForm.patchValue({
merchantid: merchantidDetail.merchantid,
merchantiddesc: merchantidDetail.establishmentname,

});

}
}

onSelectedproductid(productidDetail: any) {
if (productidDetail.productid && productidDetail) {
this.ltycampaignForm.patchValue({
productid: productidDetail.productid,
productiddesc: productidDetail.productname,

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
resetForm() {
if (this.ltycampaignForm != null)
this.ltycampaignForm.reset();
this.ltycampaignForm.patchValue({
});
setTimeout(() => {
this.ltycampaignservice.ltycustomerrewards=[];
this.ltycustomerrewardsLoadTable();
this.ltycampaignservice.ltycampaigncriterias=[];
this.ltycampaigncriteriasLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.usedbycustomersvisible = false;
this.totalpointsearnedvisible = false;
this.productidvisible = false;
this.rewardvaluevisible = false;
}

    onDelete() {
        let campaignid = this.ltycampaignForm.get('campaignid').value;
        if(campaignid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltycampaignservice.deleteltycampaign(campaignid).then(res =>
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
    this.ltycampaignForm.patchValue({
        campaignid: null
    });
    if(this.ltycampaignservice.formData.campaignid!=null)this.ltycampaignservice.formData.campaignid=null;
for (let i=0;i<this.ltycampaignservice.ltycustomerrewards.length;i++) {
this.ltycampaignservice.ltycustomerrewards[i].customerrewardid=null;
}
for (let i=0;i<this.ltycampaignservice.ltycampaigncriterias.length;i++) {
this.ltycampaignservice.ltycampaigncriterias[i].detailid=null;
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
this.ltycampaignForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.ltycampaignForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="publishdate")
this.ltycampaignForm.patchValue({"publishdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltycampaignForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltycampaignForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltycampaignForm.controls[key]!=undefined)this.ltycampaignForm.controls[key].disable({onlySelf: true});
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
campaignidonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
campaigntypeonChange(evt:any){
let e=evt.value;
this.ltycampaignForm.patchValue({campaigntypedesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.campaigntype.value && this.f.campaigntype.value!="" && this.f.campaigntype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.campaigntype.value).then(res => this.campaignsubtypeList = res as bosubcategorymaster[]);
});
}
campaignsubtypeonChange(evt:any){
let e=evt.value;
this.ltycampaignForm.patchValue({campaignsubtypedesc:evt.options[evt.options.selectedIndex].text});
}
campaigncategoryonChange(evt:any){
let e=this.f.campaigncategory.value as any;
this.ltycampaignForm.patchValue({campaigncategorydesc:evt.options[evt.options.selectedIndex].text});
}
imageurlonChange(evt:any){
let e=evt.value;
}
validityonChange(evt:any){
let e=this.f.validity.value as any;
this.ltycampaignForm.patchValue({validitydesc:evt.options[evt.options.selectedIndex].text});
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
applicabledaysonChange(evt:any){
let e=this.f.applicabledays.value as any;
this.ltycampaignForm.patchValue({applicabledaysdesc:evt.options[evt.options.selectedIndex].text});
}
merchantidonChange(evt:any){
let e=evt.value;
}
storeidonChange(evt:any){
let e=evt.value;
this.ltycampaignForm.patchValue({storeiddesc:evt.options[evt.options.selectedIndex].text});
}
validdaysfrompublishdateonChange(evt:any){
let e=evt.value;
}
displaycomingsoononChange(evt:any){
let e=evt.value;
}
displaycountdownonChange(evt:any){
let e=evt.value;
}
publishdateonChange(evt:any){
let e=evt.value;
}
eventnameonChange(evt:any){
let e=this.f.eventname.value as any;
this.ltycampaignForm.patchValue({eventnamedesc:evt.options[evt.options.selectedIndex].text});
}
totallimitonChange(evt:any){
let e=evt.value;
}
limitpercustomeronChange(evt:any){
let e=evt.value;
}
referrerpointonChange(evt:any){
let e=evt.value;
}
usedbycustomersonChange(evt:any){
let e=evt.value;
}
totalpointsearnedonChange(evt:any){
let e=evt.value;
}
totalproductsonChange(evt:any){
let e=evt.value;
}
campaignstatusonChange(evt:any){
let e=this.f.campaignstatus.value as any;
this.ltycampaignForm.patchValue({campaignstatusdesc:evt.options[evt.options.selectedIndex].text});
}
rankonChange(evt:any){
let e=evt.value;
}
rewardtypeonChange(evt:any){
let e=this.f.rewardtype.value as any;
this.productidvisible=false;
if(this.f.rewardtype.value == 'C')this.productidvisible=true;
this.ltycampaignForm.patchValue({rewardtypedesc:evt.options[evt.options.selectedIndex].text});
}
rewardmethodonChange(evt:any){
let e=this.f.rewardmethod.value as any;
this.ltycampaignForm.patchValue({rewardmethoddesc:evt.options[evt.options.selectedIndex].text});
}
rewardvalueonChange(evt:any){
let e=evt.value;
}
coupontypeidonChange(evt:any){
let e=evt.value;
this.ltycampaignForm.patchValue({coupontypeiddesc:evt.options[evt.options.selectedIndex].text});
}
productidonChange(evt:any){
let e=evt.value;
}
rewardunitonChange(evt:any){
let e=this.f.rewardunit.value as any;
this.ltycampaignForm.patchValue({rewardunitdesc:evt.options[evt.options.selectedIndex].text});
}
rewardlevelonChange(evt:any){
let e=evt.value;
this.ltycampaignForm.patchValue({rewardleveldesc:evt.options[evt.options.selectedIndex].text});
}
rewardprefixonChange(evt:any){
let e=this.f.rewardprefix.value as any;
this.ltycampaignForm.patchValue({rewardprefixdesc:evt.options[evt.options.selectedIndex].text});
}
rewardmultiplieronChange(evt:any){
let e=evt.value;
}
claimbuttonlabelonChange(evt:any){
let e=evt.value;
}
redeeminstructionsonChange(evt:any){
let e=evt.value;
}
termsonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltycampaignservice.getltycampaignsByEID(pkcol).then(res => {

this.ltycampaignservice.formData=res.ltycampaign;
let formproperty=res.ltycampaign.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltycampaign.pkcol;
this.formid=res.ltycampaign.campaignid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltycampaign.campaignid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltycampaignForm.patchValue({
campaignid: res.ltycampaign.campaignid,
name: res.ltycampaign.name,
campaigntype: res.ltycampaign.campaigntype,
campaigntypedesc: res.ltycampaign.campaigntypedesc,
campaignsubtype: res.ltycampaign.campaignsubtype,
campaignsubtypedesc: res.ltycampaign.campaignsubtypedesc,
campaigncategory: res.ltycampaign.campaigncategory,
campaigncategorydesc: res.ltycampaign.campaigncategorydesc,
imageurl: res.ltycampaign.imageurl,
validity: res.ltycampaign.validity,
validitydesc: res.ltycampaign.validitydesc,
startdate: this.ngbDateParserFormatter.parse(res.ltycampaign.startdate),
enddate: this.ngbDateParserFormatter.parse(res.ltycampaign.enddate),
applicabledays: res.ltycampaign.applicabledays,
merchantid: res.ltycampaign.merchantid,
merchantiddesc: res.ltycampaign.merchantiddesc,
storeid: res.ltycampaign.storeid,
storeiddesc: res.ltycampaign.storeiddesc,
validdaysfrompublishdate: res.ltycampaign.validdaysfrompublishdate,
displaycomingsoon: res.ltycampaign.displaycomingsoon,
displaycountdown: res.ltycampaign.displaycountdown,
publishdate: this.ngbDateParserFormatter.parse(res.ltycampaign.publishdate),
eventname: res.ltycampaign.eventname,
eventnamedesc: res.ltycampaign.eventnamedesc,
totallimit: res.ltycampaign.totallimit,
limitpercustomer: res.ltycampaign.limitpercustomer,
referrerpoint: res.ltycampaign.referrerpoint,
usedbycustomers: res.ltycampaign.usedbycustomers,
totalpointsearned: res.ltycampaign.totalpointsearned,
totalproducts: res.ltycampaign.totalproducts,
campaignstatus: res.ltycampaign.campaignstatus,
campaignstatusdesc: res.ltycampaign.campaignstatusdesc,
rank: res.ltycampaign.rank,
rewardtype: res.ltycampaign.rewardtype,
rewardtypedesc: res.ltycampaign.rewardtypedesc,
rewardmethod: res.ltycampaign.rewardmethod,
rewardmethoddesc: res.ltycampaign.rewardmethoddesc,
rewardvalue: res.ltycampaign.rewardvalue,
coupontypeid: res.ltycampaign.coupontypeid,
coupontypeiddesc: res.ltycampaign.coupontypeiddesc,
productid: res.ltycampaign.productid,
productiddesc: res.ltycampaign.productiddesc,
rewardunit: res.ltycampaign.rewardunit,
rewardunitdesc: res.ltycampaign.rewardunitdesc,
rewardlevel: res.ltycampaign.rewardlevel,
rewardleveldesc: res.ltycampaign.rewardleveldesc,
rewardprefix: res.ltycampaign.rewardprefix,
rewardprefixdesc: res.ltycampaign.rewardprefixdesc,
rewardmultiplier: res.ltycampaign.rewardmultiplier,
claimbuttonlabel: res.ltycampaign.claimbuttonlabel,
redeeminstructions: res.ltycampaign.redeeminstructions,
terms: res.ltycampaign.terms,
status: res.ltycampaign.status,
statusdesc: res.ltycampaign.statusdesc,
});
//visible list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("rewardvalue")>=0)this.rewardvaluevisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("rewardvalue")>=0)this.rewardvaluevisible = false;
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("usedbycustomers")>=0)this.usedbycustomersvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("usedbycustomers")>=0)this.usedbycustomersvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("totalpointsearned")>=0)this.totalpointsearnedvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("totalpointsearned")>=0)this.totalpointsearnedvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("productid")>=0)this.productidvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("productid")>=0)this.productidvisible = false;
this.ltycustomerrewardsvisiblelist=res.ltycustomerrewardsvisiblelist;
this.ltycampaigncriteriasvisiblelist=res.ltycampaigncriteriasvisiblelist;
if(this.ltycampaignForm.get('imageurl').value!=null && this.ltycampaignForm.get('imageurl').value!="" && this.imageurl!=null && this.imageurl!=undefined)this.imageurl.setattachmentlist(JSON.parse(this.ltycampaignForm.get('imageurl').value));
setTimeout(() => {
if(this.f.campaigntype.value && this.f.campaigntype.value!="" && this.f.campaigntype.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.campaigntype.value).then(res =>{
this.campaignsubtypeList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.ltycampaignservice.ltycustomerrewards = res.ltycustomerrewards;
this.SetltycustomerrewardsTableConfig();
this.ltycustomerrewardsLoadTable();
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });
this.ltycampaignservice.ltycampaigncriterias = res.ltycampaigncriterias;
this.SetltycampaigncriteriasTableConfig();
this.ltycampaigncriteriasLoadTable();
  setTimeout(() => {
  this.SetltycampaigncriteriasTableddConfig();
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
  for (let key in this.ltycampaignForm.controls) {
    if (this.ltycampaignForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltycampaignForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltycampaignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltycampaignForm.value;
obj.startdate=new Date(this.ltycampaignForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.ltycampaignForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('enddate').value)+'  UTC' :null);
obj.applicabledays=null;
obj.applicabledaysstring=JSON.stringify(this.ltycampaignForm.get('applicabledays').value);
obj.publishdate=new Date(this.ltycampaignForm.get('publishdate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('publishdate').value)+'  UTC' :null);
console.log(obj);
await this.sharedService.upload(this.imageurl.getAllFiles());
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
Object.keys(this.ltycampaignForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltycampaignForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltycampaignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltycampaignservice.formData=this.ltycampaignForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltycampaignForm.controls[key] != null)
    {
        this.ltycampaignservice.formData[key] = this.ltycampaignForm.controls[key].value;
    }
}
}
}
this.ltycampaignservice.formData.startdate=new Date(this.ltycampaignForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('startdate').value)+'  UTC' :null);
this.ltycampaignservice.formData.enddate=new Date(this.ltycampaignForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('enddate').value)+'  UTC' :null);
this.ltycampaignservice.formData.applicabledays=null;
this.ltycampaignservice.formData.applicabledaysstring=JSON.stringify(this.ltycampaignForm.get('applicabledays').value);
this.ltycampaignservice.formData.publishdate=new Date(this.ltycampaignForm.get('publishdate').value ? this.ngbDateParserFormatter.format(this.ltycampaignForm.get('publishdate').value)+'  UTC' :null);
this.ltycampaignservice.formData.DeletedltycustomerrewardIDs = this.DeletedltycustomerrewardIDs;
this.ltycampaignservice.formData.DeletedltycampaigncriteriaIDs = this.DeletedltycampaigncriteriaIDs;
console.log(this.ltycampaignservice.formData);
this.ltycampaignservice.formData=this.ltycampaignForm.value;
this.ltycampaignservice.saveOrUpdateltycampaigns().subscribe(
async res => {
await this.sharedService.upload(this.imageurl.getAllFiles());
if (this.ltycustomerrewardssource.data)
{
    for (let i = 0; i < this.ltycustomerrewardssource.data.length; i++)
    {
        if (this.ltycustomerrewardssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltycustomerrewardssource.data[i].fileattachmentlist);
    }
}
if (this.ltycampaigncriteriassource.data)
{
    for (let i = 0; i < this.ltycampaigncriteriassource.data.length; i++)
    {
        if (this.ltycampaigncriteriassource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltycampaigncriteriassource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltycampaign);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltycampaignservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltycampaign);
}
else
{
this.FillData(res);
}
}
this.ltycampaignForm.markAsUntouched();
this.ltycampaignForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcampaigntype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.ltycampaignForm.get('campaigntype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignsubtype( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.ltycampaignForm.get('campaignsubtype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmerchantid( merchantid) {
/*let ScreenType='2';
this.dialog.open(ltymerchantComponent, 
{
data: {merchantid:this.ltycampaignForm.get('merchantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstoreid( storeid) {
/*let ScreenType='2';
this.dialog.open(ltystoreComponent, 
{
data: {storeid:this.ltycampaignForm.get('storeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcoupontypeid( coupontypeid) {
/*let ScreenType='2';
this.dialog.open(ltycoupontypeComponent, 
{
data: {coupontypeid:this.ltycampaignForm.get('coupontypeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.ltycampaignForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrewardlevel( levelid) {
/*let ScreenType='2';
this.dialog.open(ltylevelComponent, 
{
data: {levelid:this.ltycampaignForm.get('rewardlevel').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditltycustomerreward(event:any,customerrewardid:any, campaignid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ltycustomerrewardComponent, 
{
data:  {  showview:this.showview,save:false,event,customerrewardid, campaignid,visiblelist:this.ltycustomerrewardsvisiblelist,  hidelist:this.ltycustomerrewardshidelist,ScreenType:2  },
header: 'Customer Rewards'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ltycustomerrewardssource.add(res);
this.ltycustomerrewardssource.refresh();
}
else
{
this.ltycustomerrewardssource.update(event.data, res);
}
}
});
}

onDeleteltycustomerreward(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltycustomerrewardIDs += childID + ",";
this.ltycampaignservice.ltycustomerrewards.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditltycampaigncriteria(event:any,detailid:any, campaignid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ltycampaigncriteriaComponent, 
{
data:  {  showview:this.showview,save:false,event,detailid, campaignid,visiblelist:this.ltycampaigncriteriasvisiblelist,  hidelist:this.ltycampaigncriteriashidelist,ScreenType:2  },
header: 'Criteria'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ltycampaigncriteriassource.add(res);
this.ltycampaigncriteriassource.refresh();
}
else
{
this.ltycampaigncriteriassource.update(event.data, res);
}
}
});
}

onDeleteltycampaigncriteria(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltycampaigncriteriaIDs += childID + ",";
this.ltycampaignservice.ltycampaigncriterias.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes ltycustomerrewards
ltycustomerrewardssettings:any;
ltycustomerrewardssource: any;

showltycustomerrewardsCheckbox()
{
debugger;
if(this.tblltycustomerrewardssource.settings['selectMode']== 'multi')this.tblltycustomerrewardssource.settings['selectMode']= 'single';
else
this.tblltycustomerrewardssource.settings['selectMode']= 'multi';
this.tblltycustomerrewardssource.initGrid();
}
deleteltycustomerrewardsAll()
{
this.tblltycustomerrewardssource.settings['selectMode'] = 'single';
}
showltycustomerrewardsFilter()
{
  setTimeout(() => {
  this.SetltycustomerrewardsTableddConfig();
  });
      if(this.tblltycustomerrewardssource.settings!=null)this.tblltycustomerrewardssource.settings['hideSubHeader'] =!this.tblltycustomerrewardssource.settings['hideSubHeader'];
this.tblltycustomerrewardssource.initGrid();
}
showltycustomerrewardsInActive()
{
}
enableltycustomerrewardsInActive()
{
}
async SetltycustomerrewardsTableddConfig()
{
if(!this.bfilterPopulateltycustomerrewards){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltycustomerrewardscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataltycustomerrewardscustomerid3.push(obj);
}
if((this.tblltycustomerrewardssource.settings as any).columns['customerid'])
{
(this.tblltycustomerrewardssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltycustomerrewardscustomerid3));
this.tblltycustomerrewardssource.initGrid();
}
});
}
this.bfilterPopulateltycustomerrewards=true;
}
async ltycustomerrewardsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltycustomerrewardsTableConfig()
{
this.ltycustomerrewardssettings = {
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
rewarddate: {
title: 'Reward Date',
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
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'pofgf',reportcode:'pofgf',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataltycustomerrewardscustomerid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
rewardtype: {
title: 'Reward Type',
type: 'number',
filter:true,
},
rewardsubtype: {
title: 'Reward Sub Type',
type: 'number',
filter:true,
},
transactionnumber: {
title: 'Transaction Number',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
redeemed: {
title: 'Redeemed',
type: 'number',
filter:true,
},
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
},
};
}
ltycustomerrewardsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerrewardsID)>=0)
{
this.ltycustomerrewardssource=new LocalDataSource();
this.ltycustomerrewardssource.load(this.ltycampaignservice.ltycustomerrewards as  any as LocalDataSource);
this.ltycustomerrewardssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ltycustomerrewardsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltycampaignservice.ltycustomerrewards.length == 0)
{
    this.tblltycustomerrewardssource.grid.createFormShown = true;
}
else
{
    let obj = new ltycustomerreward();
    this.ltycampaignservice.ltycustomerrewards.push(obj);
    this.ltycustomerrewardssource.refresh();
    if ((this.ltycampaignservice.ltycustomerrewards.length / this.ltycustomerrewardssource.getPaging().perPage).toFixed(0) + 1 != this.ltycustomerrewardssource.getPaging().page)
    {
        this.ltycustomerrewardssource.setPage((this.ltycampaignservice.ltycustomerrewards.length / this.ltycustomerrewardssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltycustomerrewardssource.grid.edit(this.tblltycustomerrewardssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltycustomerrewardssource.data.indexOf(event.data);
this.onDeleteltycustomerreward(event,event.data.customerrewardid,((this.ltycustomerrewardssource.getPaging().page-1) *this.ltycustomerrewardssource.getPaging().perPage)+index);
this.ltycustomerrewardssource.refresh();
break;
}
}

*/
ltycustomerrewardsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditltycustomerreward(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditltycustomerreward(event,event.data.customerrewardid,this.formid);
break;
case 'delete':
this.onDeleteltycustomerreward(event,event.data.customerrewardid,((this.ltycustomerrewardssource.getPaging().page-1) *this.ltycustomerrewardssource.getPaging().perPage)+event.index);
this.ltycustomerrewardssource.refresh();
break;
}
}
ltycustomerrewardsonDelete(obj) {
let customerrewardid=obj.data.customerrewardid;
if (confirm('Are you sure to delete this record ?')) {
this.ltycampaignservice.deleteltycampaign(customerrewardid).then(res=>
this.ltycustomerrewardsLoadTable()
);
}
}
ltycustomerrewardsPaging(val)
{
debugger;
this.ltycustomerrewardssource.setPaging(1, val, true);
}

handleltycustomerrewardsGridSelected(event:any) {
this.ltycustomerrewardsselectedindex=this.ltycampaignservice.ltycustomerrewards.findIndex(i => i.customerrewardid === event.data.customerrewardid);
}
IsltycustomerrewardsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerrewardsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltycustomerrewards
//start of Grid Codes ltycampaigncriterias
ltycampaigncriteriassettings:any;
ltycampaigncriteriassource: any;

showltycampaigncriteriasCheckbox()
{
debugger;
if(this.tblltycampaigncriteriassource.settings['selectMode']== 'multi')this.tblltycampaigncriteriassource.settings['selectMode']= 'single';
else
this.tblltycampaigncriteriassource.settings['selectMode']= 'multi';
this.tblltycampaigncriteriassource.initGrid();
}
deleteltycampaigncriteriasAll()
{
this.tblltycampaigncriteriassource.settings['selectMode'] = 'single';
}
showltycampaigncriteriasFilter()
{
  setTimeout(() => {
  this.SetltycampaigncriteriasTableddConfig();
  });
      if(this.tblltycampaigncriteriassource.settings!=null)this.tblltycampaigncriteriassource.settings['hideSubHeader'] =!this.tblltycampaigncriteriassource.settings['hideSubHeader'];
this.tblltycampaigncriteriassource.initGrid();
}
showltycampaigncriteriasInActive()
{
}
enableltycampaigncriteriasInActive()
{
}
async SetltycampaigncriteriasTableddConfig()
{
if(!this.bfilterPopulateltycampaigncriterias){

this.lmscampaignmasterservice.getlmscampaignmastersList().then(res=>
{
var datacampaignid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltycampaigncriteriascampaignid3.push(defaultobj);
for(let i=0; i<datacampaignid2.length; i++){
var obj= { value: datacampaignid2[i].campaignid, title:datacampaignid2[i].campaignname};
this.dataltycampaigncriteriascampaignid3.push(obj);
}
if((this.tblltycampaigncriteriassource.settings as any).columns['campaignid'])
{
(this.tblltycampaigncriteriassource.settings as any).columns['campaignid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltycampaigncriteriascampaignid3));
this.tblltycampaigncriteriassource.initGrid();
}
});
}
this.bfilterPopulateltycampaigncriterias=true;
}
async ltycampaigncriteriasbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltycampaigncriteriasTableConfig()
{
this.ltycampaigncriteriassettings = {
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
criteria: {
title: 'Criteria',
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
},
};
}
ltycampaigncriteriasLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycampaigncriteriasID)>=0)
{
this.ltycampaigncriteriassource=new LocalDataSource();
this.ltycampaigncriteriassource.load(this.ltycampaignservice.ltycampaigncriterias as  any as LocalDataSource);
this.ltycampaigncriteriassource.setPaging(1, 20, true);
}
}

//external to inline
/*
ltycampaigncriteriasroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltycampaignservice.ltycampaigncriterias.length == 0)
{
    this.tblltycampaigncriteriassource.grid.createFormShown = true;
}
else
{
    let obj = new ltycampaigncriteria();
    this.ltycampaignservice.ltycampaigncriterias.push(obj);
    this.ltycampaigncriteriassource.refresh();
    if ((this.ltycampaignservice.ltycampaigncriterias.length / this.ltycampaigncriteriassource.getPaging().perPage).toFixed(0) + 1 != this.ltycampaigncriteriassource.getPaging().page)
    {
        this.ltycampaigncriteriassource.setPage((this.ltycampaignservice.ltycampaigncriterias.length / this.ltycampaigncriteriassource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltycampaigncriteriassource.grid.edit(this.tblltycampaigncriteriassource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltycampaigncriteriassource.data.indexOf(event.data);
this.onDeleteltycampaigncriteria(event,event.data.detailid,((this.ltycampaigncriteriassource.getPaging().page-1) *this.ltycampaigncriteriassource.getPaging().perPage)+index);
this.ltycampaigncriteriassource.refresh();
break;
}
}

*/
ltycampaigncriteriasroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditltycampaigncriteria(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditltycampaigncriteria(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeleteltycampaigncriteria(event,event.data.detailid,((this.ltycampaigncriteriassource.getPaging().page-1) *this.ltycampaigncriteriassource.getPaging().perPage)+event.index);
this.ltycampaigncriteriassource.refresh();
break;
}
}
ltycampaigncriteriasonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.ltycampaignservice.deleteltycampaign(detailid).then(res=>
this.ltycampaigncriteriasLoadTable()
);
}
}
ltycampaigncriteriasPaging(val)
{
debugger;
this.ltycampaigncriteriassource.setPaging(1, val, true);
}

handleltycampaigncriteriasGridSelected(event:any) {
this.ltycampaigncriteriasselectedindex=this.ltycampaignservice.ltycampaigncriterias.findIndex(i => i.detailid === event.data.detailid);
}

  async ltycampaigncriteriasmoveUp() {
    this.ltycampaigncriteriasmove(-1);
  }

  async ltycampaigncriteriasmove(val) {
    let index=((this.ltycampaigncriteriassource.getPaging().page - 1) * this.ltycampaigncriteriassource.getPaging().perPage) + this.ltycampaigncriteriasselectedindex;
    if (index >= 0) {
      
      var current = this.ltycampaignservice.ltycampaigncriterias[index];
      var tmp = this.ltycampaignservice.ltycampaigncriterias[index +val];
      this.ltycampaignservice.ltycampaigncriterias[index +val] = this.ltycampaignservice.ltycampaigncriterias[index];
      this.ltycampaignservice.ltycampaigncriterias[index] = tmp;
      this.ltycampaignservice.ltycampaigncriterias[index +val].sequence=index +val;
      this.ltycampaignservice.ltycampaigncriterias[index].sequence=index;
      this.ltycampaigncriteriassource.refresh();
      this.ltycampaigncriteriasselectedindex=this.ltycampaignservice.ltycampaigncriterias.findIndex(i => i.detailid === current.detailid);
      this.tblltycampaigncriteriassource.grid.getRows().forEach((row:any) => {
        if( current.detailid == row.data.detailid) {
          this.tblltycampaigncriteriassource.grid.selectRow(row);
          
        }
      });
    }
  }

  ltycampaigncriteriasmoveDown() {
    return this.ltycampaigncriteriasmove(1);
  }
IsltycampaigncriteriasVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycampaigncriteriasID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltycampaigncriterias

}



