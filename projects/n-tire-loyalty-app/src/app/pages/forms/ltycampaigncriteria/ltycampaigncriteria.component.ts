import { ltycampaigncriteriaService } from './../../../service/ltycampaigncriteria.service';
import { ltycampaigncriteria } from './../../../model/ltycampaigncriteria.model';
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
import { lmscampaignmaster} from '../../../../../../n-tire-crm-app/src/app/model/lmscampaignmaster.model';
import { lmscampaignmasterService } from '../../../../../../n-tire-crm-app/src/app/service/lmscampaignmaster.service';
//popups
//detail table services
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
import { QueryBuilderConfig } from 'angular2-query-builder';
import { ltycustomersegmentService } from './../../../service/ltycustomersegment.service';
import { ltycustomersegment } from './../../../model/ltycustomersegment.model';
import { ltyeventsegmentService } from './../../../service/ltyeventsegment.service';
import { ltyeventsegment } from './../../../model/ltyeventsegment.model';
import { ltymerchantsegmentService } from './../../../service/ltymerchantsegment.service';
import { ltymerchantsegment } from './../../../model/ltymerchantsegment.model';
import { ltyproductsegmentService } from './../../../service/ltyproductsegment.service';
import { ltyproductsegment } from './../../../model/ltyproductsegment.model';
import { ltyrewardsegmentService } from './../../../service/ltyrewardsegment.service';
import { ltyrewardsegment } from './../../../model/ltyrewardsegment.model';
import { ltytransactionsegmentService } from './../../../service/ltytransactionsegment.service';
import { ltytransactionsegment } from './../../../model/ltytransactionsegment.model';
import { bolocationService } from '../../../../../../n-tire-bo-app/src/app/service/bolocation.service';
import { bolocation } from '../../../../../../n-tire-bo-app/src/app/model/bolocation.model';
import { ltylevelService } from './../../../service/ltylevel.service';
import { ltylevel } from './../../../model/ltylevel.model';
import { erpproductService } from '../../../../../../n-tire-procurement-app/src/app/service/erpproduct.service';
import { erpproduct } from '../../../../../../n-tire-procurement-app/src/app/model/erpproduct.model';
//custom fields & attachments

@Component({
selector: 'app-ltycampaigncriteria',
templateUrl: './ltycampaigncriteria.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltycampaigncriteriaComponent implements OnInit {
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
bfilterPopulateltycampaigncriterias:boolean=false;
dataltycampaigncriteriascampaignid3:any=[];
config: QueryBuilderConfig;
customerqList: ltycustomersegment[];
customerarr: any[]=[];
eventqList: ltyeventsegment[];
eventarr: any[]=[];
merchantqList: ltymerchantsegment[];
merchantarr: any[]=[];
productsegmentqList: ltyproductsegment[];
productsegmentarr: any[]=[];
rewardqList: ltyrewardsegment[];
rewardarr: any[]=[];
transactionqList: ltytransactionsegment[];
transactionarr: any[]=[];
eventsqList: boconfigvalue[];
eventsarr: any[]=[];
eventlabelsqList: boconfigvalue[];
eventlabelsarr: any[]=[];
merchantlabelsqList: boconfigvalue[];
merchantlabelsarr: any[]=[];
merchantlocationqList: bolocation[];
merchantlocationarr: any[]=[];
customerlabelsqList: boconfigvalue[];
customerlabelsarr: any[]=[];
levelsqList: ltylevel[];
levelsarr: any[]=[];
customerlocationqList: bolocation[];
customerlocationarr: any[]=[];
productcategoriesqList: boconfigvalue[];
productcategoriesarr: any[]=[];
productqList: erpproduct[];
productarr: any[]=[];
productlabelsqList: boconfigvalue[];
productlabelsarr: any[]=[];
transactionlabelsqList: boconfigvalue[];
transactionlabelsarr: any[]=[];
purchasedproductsegmentqList: ltyproductsegment[];
purchasedproductsegmentarr: any[]=[];
weekdayqList: boconfigvalue[];
weekdayarr: any[]=[];
daysqList: boconfigvalue[];
daysarr: any[]=[];
weekqList: boconfigvalue[];
weekarr: any[]=[];
 ltycampaigncriteriaForm: FormGroup;
campaignidList: lmscampaignmaster[];
campaignidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
campaignid_lmscampaignmastersForm: FormGroup;//autocomplete
campaignid_lmscampaignmastersoptions:any;//autocomplete
campaignid_lmscampaignmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltycampaigncriteriaservice: ltycampaigncriteriaService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmscampaignmasterservice:lmscampaignmasterService,
private ltycustomersegmentservice:ltycustomersegmentService,
private ltyeventsegmentservice:ltyeventsegmentService,
private ltymerchantsegmentservice:ltymerchantsegmentService,
private ltyproductsegmentservice:ltyproductsegmentService,
private ltyrewardsegmentservice:ltyrewardsegmentService,
private ltytransactionsegmentservice:ltytransactionsegmentService,
private bolocationservice:bolocationService,
private ltylevelservice:ltylevelService,
private erpproductservice:erpproductService,
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
this.ltycampaigncriteriaForm  = this.fb.group({
pk:[null],
detailid: [null],
campaignid: [null],
campaigniddesc: [null],
criteria: [null],
sequence: [null],
status: [null],
statusdesc: [null],
query:[null],
});
}

get f() { return this.ltycampaigncriteriaForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltycampaigncriteriaForm.dirty && this.ltycampaigncriteriaForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.detailid && pkDetail) {
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
let ltycampaigncriteriaid = null;

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
this.formid=ltycampaigncriteriaid;
//this.sharedService.alert(ltycampaigncriteriaid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.lmscampaignmasterservice.getlmscampaignmastersList().then(res => 
{
this.campaignidList = res as lmscampaignmaster[];
if(this.ltycampaigncriteriaservice.formData && this.ltycampaigncriteriaservice.formData.campaignid){
this.campaignidoptionsEvent.emit(this.campaignidList);
this.ltycampaigncriteriaForm.patchValue({
    campaignid: this.ltycampaigncriteriaservice.formData.campaignid,
    campaigniddesc: this.ltycampaigncriteriaservice.formData.campaigniddesc,
});
}
{
let arrcampaignid = this.campaignidList.filter(v => v.campaignid == this.ltycampaigncriteriaForm.get('campaignid').value);
let objcampaignid;
if (arrcampaignid.length > 0) objcampaignid = arrcampaignid[0];
if (objcampaignid)
{
    this.ltycampaigncriteriaForm.patchValue({ campaigncode: objcampaignid.campaigncode });
    this.ltycampaigncriteriaForm.patchValue({ campaigntype: objcampaignid.campaigntype });
    this.ltycampaigncriteriaForm.patchValue({ targettype: objcampaignid.targettype });
}
}
}
).catch((err) => {console.log(err);});
this.campaignid_lmscampaignmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.campaignidList.filter(v => v.campaignname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.campaignid_lmscampaignmastersformatter = (result: any) => result.campaignname;

//autocomplete
    this.ltycampaigncriteriaservice.getltycampaigncriteriasList().then(res => {
      this.pkList = res as ltycampaigncriteria[];
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

    this.ltycustomersegmentservice.getltycustomersegmentsList().then(res => {
      this.customerqList = res as ltycustomersegment[];
      for (const obj of this.customerqList) {
        this.customerarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltyeventsegmentservice.getltyeventsegmentsList().then(res => {
      this.eventqList = res as ltyeventsegment[];
      for (const obj of this.eventqList) {
        this.eventarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltymerchantsegmentservice.getltymerchantsegmentsList().then(res => {
      this.merchantqList = res as ltymerchantsegment[];
      for (const obj of this.merchantqList) {
        this.merchantarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltyproductsegmentservice.getltyproductsegmentsList().then(res => {
      this.productsegmentqList = res as ltyproductsegment[];
      for (const obj of this.productsegmentqList) {
        this.productsegmentarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltyrewardsegmentservice.getltyrewardsegmentsList().then(res => {
      this.rewardqList = res as ltyrewardsegment[];
      for (const obj of this.rewardqList) {
        this.rewardarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltytransactionsegmentservice.getltytransactionsegmentsList().then(res => {
      this.transactionqList = res as ltytransactionsegment[];
      for (const obj of this.transactionqList) {
        this.transactionarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("eventkey").then(res => {
      this.eventsqList = res as boconfigvalue[];
      for (const obj of this.eventsqList) {
        this.eventsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("eventlabel").then(res => {
      this.eventlabelsqList = res as boconfigvalue[];
      for (const obj of this.eventlabelsqList) {
        this.eventlabelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("merchantlabel").then(res => {
      this.merchantlabelsqList = res as boconfigvalue[];
      for (const obj of this.merchantlabelsqList) {
        this.merchantlabelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    this.bolocationservice.getbolocationsList().then(res => {
      this.merchantlocationqList = res as bolocation[];
      for (const obj of this.merchantlocationqList) {
        this.merchantlocationarr.push({name:obj.name,value:obj.locationid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("customerlabel").then(res => {
      this.customerlabelsqList = res as boconfigvalue[];
      for (const obj of this.customerlabelsqList) {
        this.customerlabelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltylevelservice.getltylevelsList().then(res => {
      this.levelsqList = res as ltylevel[];
      for (const obj of this.levelsqList) {
        this.levelsarr.push({name:obj.name,value:obj.levelid});
      }
    }
    ).catch((err) => {console.log(err);});
    this.bolocationservice.getbolocationsList().then(res => {
      this.customerlocationqList = res as bolocation[];
      for (const obj of this.customerlocationqList) {
        this.customerlocationarr.push({name:obj.name,value:obj.locationid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("productcategory").then(res => {
      this.productcategoriesqList = res as boconfigvalue[];
      for (const obj of this.productcategoriesqList) {
        this.productcategoriesarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    this.erpproductservice.geterpproductsList().then(res => {
      this.productqList = res as erpproduct[];
      for (const obj of this.productqList) {
        this.productarr.push({name:obj.productname,value:obj.productid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("productlabel").then(res => {
      this.productlabelsqList = res as boconfigvalue[];
      for (const obj of this.productlabelsqList) {
        this.productlabelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("transactionlabel").then(res => {
      this.transactionlabelsqList = res as boconfigvalue[];
      for (const obj of this.transactionlabelsqList) {
        this.transactionlabelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltyproductsegmentservice.getltyproductsegmentsList().then(res => {
      this.purchasedproductsegmentqList = res as ltyproductsegment[];
      for (const obj of this.purchasedproductsegmentqList) {
        this.purchasedproductsegmentarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("weekday").then(res => {
      this.weekdayqList = res as boconfigvalue[];
      for (const obj of this.weekdayqList) {
        this.weekdayarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("days").then(res => {
      this.daysqList = res as boconfigvalue[];
      for (const obj of this.daysqList) {
        this.daysarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("week").then(res => {
      this.weekqList = res as boconfigvalue[];
      for (const obj of this.weekqList) {
        this.weekarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    setTimeout(() => {
    this.config = {
      fields: {
        customer: {
          name: 'Customer',
          type: 'category',
          options:this.customerarr
        },
        event: {
          name: 'Event',
          type: 'category',
          options:this.eventarr
        },
        merchant: {
          name: 'Merchant',
          type: 'category',
          options:this.merchantarr
        },
        productsegment: {
          name: 'ProductSegment',
          type: 'category',
          options:this.productsegmentarr
        },
        reward: {
          name: 'Reward',
          type: 'category',
          options:this.rewardarr
        },
        transaction: {
          name: 'Transaction',
          type: 'category',
          options:this.transactionarr
        },
        events: {
          name: 'Events',
          type: 'category',
          options:this.eventsarr
        },
        eventlabels: {
          name: 'Event Labels',
          type: 'category',
          options:this.eventlabelsarr
        },
        eventdate: {
          name: 'Event Date',
          type: 'date',
        },
        merchantlabels: {
          name: 'Merchant Labels',
          type: 'category',
          options:this.merchantlabelsarr
        },
        merchantlocation: {
          name: 'Merchant Location',
          type: 'category',
          options:this.merchantlocationarr
        },
        customerlabels: {
          name: 'Customer Labels',
          type: 'category',
          options:this.customerlabelsarr
        },
        levels: {
          name: 'Levels',
          type: 'category',
          options:this.levelsarr
        },
        customerlocation: {
          name: 'Customer Location',
          type: 'category',
          options:this.customerlocationarr
        },
        productcategories: {
          name: 'ProductCategories',
          type: 'category',
          options:this.productcategoriesarr
        },
        product: {
          name: 'Product',
          type: 'category',
          options:this.productarr
        },
        purchasedproductsegment: {
          name: 'Purchased Product Segment',
          type: 'category',
          options:this.purchasedproductsegmentarr
        },
        ordervalue: {
          name: 'Order Value',
          type: 'number',
        },
        startdate: {
          name: 'Start Date',
          type: 'date',
        },
        enddate: {
          name: 'End Date',
          type: 'date',
        },
        starttime: {
          name: 'Start Time',
          type: 'time',
        },
        endtime: {
          name: 'End Time',
          type: 'time',
        },
        weekday: {
          name: 'Week Day',
          type: 'category',
          options:this.weekdayarr
        },
        days: {
          name: 'Days',
          type: 'category',
          options:this.daysarr
        },
        week: {
          name: 'Week',
          type: 'category',
          options:this.weekarr
        },
        numberofpurchases: {
          name: 'Number of Purchases',
          type: 'number',
        },
      }
    };
for (const obj of this.productlabelsarr) {
(this.config as any).fields[obj.name]={"name":obj.name,"type": "string"};
}
for (const obj of this.transactionlabelsarr) {
(this.config as any).fields[obj.name]={"name":obj.name,"type": "string"};
}
if (this.ltycampaigncriteriaForm.get('criteria').value != null)
{

    this.ltycampaigncriteriaForm.patchValue({
    query: JSON.parse(this.ltycampaigncriteriaForm.get('criteria').value)
});
}
  },500);
//setting the flag that the screen is not touched 
this.ltycampaigncriteriaForm.markAsUntouched();
this.ltycampaigncriteriaForm.markAsPristine();
}
onSelectedcampaignid(campaignidDetail: any) {
if (campaignidDetail.campaignid && campaignidDetail) {
this.ltycampaigncriteriaForm.patchValue({
campaignid: campaignidDetail.campaignid,
campaigniddesc: campaignidDetail.campaignname,

});
this.ltycampaigncriteriaForm.patchValue({campaigncode:campaignidDetail.campaigncode});
this.ltycampaigncriteriaForm.patchValue({campaigntype:campaignidDetail.campaigntype});
this.ltycampaigncriteriaForm.patchValue({targettype:campaignidDetail.targettype});

}
}




resetForm() {
if (this.ltycampaigncriteriaForm != null)
this.ltycampaigncriteriaForm.reset();
this.ltycampaigncriteriaForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let detailid = this.ltycampaigncriteriaForm.get('detailid').value;
        if(detailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltycampaigncriteriaservice.deleteltycampaigncriteria(detailid).then(res =>
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
    this.ltycampaigncriteriaForm.patchValue({
        detailid: null
    });
    if(this.ltycampaigncriteriaservice.formData.detailid!=null)this.ltycampaigncriteriaservice.formData.detailid=null;
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
  else if(key=="query"){
  }
else if(key=="criteria"){
this.ltycampaigncriteriaForm.patchValue({"criteria":  mainscreendata[key] } );
  }
        else if(ctrltype=="string")
{
this.ltycampaigncriteriaForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltycampaigncriteriaForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltycampaigncriteriaForm.controls[key]!=undefined)this.ltycampaigncriteriaForm.controls[key].disable({onlySelf: true});
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
detailidonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
}
criteriaonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltycampaigncriteriaservice.getltycampaigncriteriasByEID(pkcol).then(res => {

this.ltycampaigncriteriaservice.formData=res.ltycampaigncriteria;
let formproperty=res.ltycampaigncriteria.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltycampaigncriteria.pkcol;
this.formid=res.ltycampaigncriteria.detailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltycampaigncriteria.detailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltycampaigncriteriaForm.patchValue({
detailid: res.ltycampaigncriteria.detailid,
campaignid: res.ltycampaigncriteria.campaignid,
campaigniddesc: res.ltycampaigncriteria.campaigniddesc,
criteria: res.ltycampaigncriteria.criteria,
sequence: res.ltycampaigncriteria.sequence,
status: res.ltycampaigncriteria.status,
statusdesc: res.ltycampaigncriteria.statusdesc,
});
//Child Tables if any
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
  for (let key in this.ltycampaigncriteriaForm.controls) {
    if (this.ltycampaigncriteriaForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltycampaigncriteriaForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltycampaigncriteriaForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
this.ltycampaigncriteriaForm.patchValue({
criteria: JSON.stringify(this.ltycampaigncriteriaForm.get('query').value)
});
var obj=this.ltycampaigncriteriaForm.value;
console.log(obj);
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
Object.keys(this.ltycampaigncriteriaForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltycampaigncriteriaForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltycampaigncriteriaForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltycampaigncriteriaservice.formData=this.ltycampaigncriteriaForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltycampaigncriteriaForm.controls[key] != null)
    {
        this.ltycampaigncriteriaservice.formData[key] = this.ltycampaigncriteriaForm.controls[key].value;
    }
}
}
}
this.ltycampaigncriteriaForm.patchValue({
criteria: JSON.stringify(this.ltycampaigncriteriaForm.get('query').value)
});
console.log(this.ltycampaigncriteriaservice.formData);
this.ltycampaigncriteriaservice.formData=this.ltycampaigncriteriaForm.value;
this.ltycampaigncriteriaservice.saveOrUpdateltycampaigncriterias().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltycampaigncriteria);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltycampaigncriteriaservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltycampaigncriteria);
}
else
{
this.FillData(res);
}
}
this.ltycampaigncriteriaForm.markAsUntouched();
this.ltycampaigncriteriaForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcampaignid( campaignid) {
/*let ScreenType='2';
this.dialog.open(lmscampaignmasterComponent, 
{
data: {campaignid:this.ltycampaigncriteriaForm.get('campaignid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



