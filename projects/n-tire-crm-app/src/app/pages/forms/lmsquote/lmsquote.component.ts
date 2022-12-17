import { lmsquoteService } from './../../../service/lmsquote.service';
import { lmsquote } from './../../../model/lmsquote.model';
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
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { erptaxmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
//popups
import { boterm} from '../../../../../../n-tire-bo-app/src/app/model/boterm.model';
import { botermService } from '../../../../../../n-tire-bo-app/src/app/service/boterm.service';
//popups
//detail table services
import { lmsquotedetail } from './../../../model/lmsquotedetail.model';
import { lmsquotedetailComponent } from './../../../pages/forms/lmsquotedetail/lmsquotedetail.component';
//FK services
import { lmsproductmaster,IlmsproductmasterResponse } from './../../../model/lmsproductmaster.model';
import { lmsproductmasterComponent } from './../../../pages/forms/lmsproductmaster/lmsproductmaster.component';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmsquotepaymentterm } from './../../../model/lmsquotepaymentterm.model';
import { lmsquotepaymenttermComponent } from './../../../pages/forms/lmsquotepaymentterm/lmsquotepaymentterm.component';
//FK services
import { erpsupplierquotationmaster,IerpsupplierquotationmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierquotationmaster.service';
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
selector: 'app-lmsquote',
templateUrl: './lmsquote.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsquoteComponent implements OnInit {
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
bfilterPopulatelmsquotes:boolean=false;
datalmsquotesopportunityid3:any=[];
datalmsquotescurrency3:any=[];
datalmsquotestaxid3:any=[];
datalmsquotespaymenttermid3:any=[];
datalmsquotestermid3:any=[];
datalmsquotesleadsource3:any=[];
datalmsquotesquotestatus3:any=[];
datalmsquotedetailsopportunityid3:any=[];
datalmsquotedetailsproductid3:any=[];
datalmsquotedetailsuom3:any=[];
bfilterPopulatelmsquotedetails:boolean=false;
datalmsquotepaymenttermsquoteid3:any=[];
datalmsquotepaymenttermsopportunityid3:any=[];
datalmsquotepaymenttermsduedate3:any=[];
bfilterPopulatelmsquotepaymentterms:boolean=false;
@ViewChild('tbllmsquotedetailssource',{static:false}) tbllmsquotedetailssource: Ng2SmartTableComponent;
@ViewChild('tbllmsquotepaymenttermssource',{static:false}) tbllmsquotepaymenttermssource: Ng2SmartTableComponent;
 lmsquoteForm: FormGroup;
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
currencyList: boconfigvalue[];
taxidList: erptaxmaster[];
taxidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
taxid_erptaxmastersForm: FormGroup;//autocomplete
taxid_erptaxmastersoptions:any;//autocomplete
taxid_erptaxmastersformatter:any;//autocomplete
paymenttermidList: boterm[];
termidList: boterm[];
leadsourceList: boconfigvalue[];
quotestatusList: boconfigvalue[];
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
lmsquoteshowOption:boolean;
lmsquotedetailshowOption:boolean;
lmsquotepaymenttermshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmsquotedetailsvisiblelist:any;
lmsquotedetailshidelist:any;
lmsquotepaymenttermsvisiblelist:any;
lmsquotepaymenttermshidelist:any;

DeletedlmsquotedetailIDs: string="";
lmsquotedetailsID: string = "1";
lmsquotedetailsselectedindex:any;
DeletedlmsquotepaymenttermIDs: string="";
lmsquotepaymenttermsID: string = "2";
lmsquotepaymenttermsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmsquoteservice: lmsquoteService,
private lmsopportunityservice: lmsopportunityService,
private lmsproductmasterservice: lmsproductmasterService,
private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptaxmasterservice:erptaxmasterService,
private botermservice:botermService,
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
this.lmsquoteForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
leadid: [null],
opportunityid: [null],
opportunityiddesc: [null],
quoteid: [null],
reference: [null],
quotedate: [null],
details: [null, Validators.required],
assignedto: [null, Validators.required],
quoteamount: [null],
currency: [null],
currencydesc: [null],
expirationdate: [null],
taxid: [null],
taxiddesc: [null],
shippingruleid: [null],
totalamount: [null],
taxamount: [null],
charges: [null],
paymenttermid: [null],
paymenttermiddesc: [null],
termid: [null],
termiddesc: [null],
terms: [null],
comments: [null],
campaignid: [null, Validators.required],
leadsource: [null],
leadsourcedesc: [null],
supplierquotationid: [null],
customfield: [null],
attachment: [null],
quotestatus: [null],
quotestatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsquoteForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsquoteForm.dirty && this.lmsquoteForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.quoteid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.quoteid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.quoteid && pkDetail) {
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
let lmsquoteid = null;

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
this.formid=lmsquoteid;
//this.sharedService.alert(lmsquoteid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmsquotedetailsTableConfig();
  setTimeout(() => {
  this.SetlmsquotedetailsTableddConfig();
  });

this.SetlmsquotepaymenttermsTableConfig();
  setTimeout(() => {
  this.SetlmsquotepaymenttermsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmsquoteservice.formData && this.lmsquoteservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmsquoteForm.patchValue({
    opportunityid: this.lmsquoteservice.formData.opportunityid,
    opportunityiddesc: this.lmsquoteservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmsquoteForm.get('opportunityid').value);
let objopportunityid;
if (arropportunityid.length > 0) objopportunityid = arropportunityid[0];
if (objopportunityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.opportunityid_lmsopportunitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.opportunityidList.filter(v => v.requirementdetails.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.opportunityid_lmsopportunitiesformatter = (result: any) => result.requirementdetails;
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.taxidList = res as erptaxmaster[];
if(this.lmsquoteservice.formData && this.lmsquoteservice.formData.taxid){
this.taxidoptionsEvent.emit(this.taxidList);
this.lmsquoteForm.patchValue({
    taxid: this.lmsquoteservice.formData.taxid,
    taxiddesc: this.lmsquoteservice.formData.taxiddesc,
});
}
{
let arrtaxid = this.taxidList.filter(v => v.taxid == this.lmsquoteForm.get('taxid').value);
let objtaxid;
if (arrtaxid.length > 0) objtaxid = arrtaxid[0];
if (objtaxid)
{
}
}
}
).catch((err) => {console.log(err);});
this.taxid_erptaxmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.taxidList.filter(v => v.taxname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.taxid_erptaxmastersformatter = (result: any) => result.taxname;
this.botermservice.getbotermsList().then(res => 
{
this.paymenttermidList = res as boterm[];
}
).catch((err) => {console.log(err);});
this.botermservice.getbotermsList().then(res => 
{
this.termidList = res as boterm[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("leadsource").then(res => this.leadsourceList = res as boconfigvalue[]);
this.configservice.getList("quotestatus").then(res => this.quotestatusList = res as boconfigvalue[]);

//autocomplete
    this.lmsquoteservice.getlmsquotesList().then(res => {
      this.pkList = res as lmsquote[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.details.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.details;

//setting the flag that the screen is not touched 
this.lmsquoteForm.markAsUntouched();
this.lmsquoteForm.markAsPristine();
}
onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmsquoteForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedtaxid(taxidDetail: any) {
if (taxidDetail.taxid && taxidDetail) {
this.lmsquoteForm.patchValue({
taxid: taxidDetail.taxid,
taxiddesc: taxidDetail.taxname,

});

}
}




resetForm() {
if (this.lmsquoteForm != null)
this.lmsquoteForm.reset();
this.lmsquoteForm.patchValue({
});
this.lmsquoteForm.patchValue({
quotedate: this.ngbDateParserFormatter.parse(new Date().toString()),
expirationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.lmsquoteservice.lmsquotedetails=[];
this.lmsquotedetailsLoadTable();
this.lmsquoteservice.lmsquotepaymentterms=[];
this.lmsquotepaymenttermsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let quoteid = this.lmsquoteForm.get('quoteid').value;
        if(quoteid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquoteservice.deletelmsquote(quoteid).then(res =>
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
    this.lmsquoteForm.patchValue({
        quoteid: null
    });
    if(this.lmsquoteservice.formData.quoteid!=null)this.lmsquoteservice.formData.quoteid=null;
for (let i=0;i<this.lmsquoteservice.lmsquotedetails.length;i++) {
this.lmsquoteservice.lmsquotedetails[i].quotedetailid=null;
}
for (let i=0;i<this.lmsquoteservice.lmsquotepaymentterms.length;i++) {
this.lmsquoteservice.lmsquotepaymentterms[i].paymenttermid=null;
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
        else if(key=="quotedate")
this.lmsquoteForm.patchValue({"quotedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assignedto")
this.lmsquoteForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="expirationdate")
this.lmsquoteForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmsquoteForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsquoteForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsquoteForm.controls[key]!=undefined)
{
this.lmsquoteForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsquotes",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.lmsquoteservice.formData.details!=null )
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
leadidonChange(evt:any){
let e=evt.value;
}
opportunityidonChange(evt:any){
let e=evt.value;
}
quoteidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
quotedateonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
}
quoteamountonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.lmsquoteForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
expirationdateonChange(evt:any){
let e=evt.value;
}
taxidonChange(evt:any){
let e=evt.value;
}
shippingruleidonChange(evt:any){
let e=evt.value;
}
totalamountonChange(evt:any){
let e=evt.value;
}
taxamountonChange(evt:any){
let e=evt.value;
}
chargesonChange(evt:any){
let e=evt.value;
}
paymenttermidonChange(evt:any){
let e=evt.value;
this.lmsquoteForm.patchValue({paymenttermiddesc:evt.options[evt.options.selectedIndex].text});
}
termidonChange(evt:any){
let e=evt.value;
this.lmsquoteForm.patchValue({termiddesc:evt.options[evt.options.selectedIndex].text});
}
termsonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
}
leadsourceonChange(evt:any){
let e=this.f.leadsource.value as any;
this.lmsquoteForm.patchValue({leadsourcedesc:evt.options[evt.options.selectedIndex].text});
}
supplierquotationidonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
quotestatusonChange(evt:any){
let e=this.f.quotestatus.value as any;
this.lmsquoteForm.patchValue({quotestatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editlmsquotes() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsquoteservice.getlmsquotesByEID(pkcol).then(res => {

this.lmsquoteservice.formData=res.lmsquote;
let formproperty=res.lmsquote.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsquote.pkcol;
this.formid=res.lmsquote.quoteid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsquote.quoteid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsquoteForm.patchValue({
branchid: res.lmsquote.branchid,
leadid: res.lmsquote.leadid,
opportunityid: res.lmsquote.opportunityid,
opportunityiddesc: res.lmsquote.opportunityiddesc,
quoteid: res.lmsquote.quoteid,
reference: res.lmsquote.reference,
quotedate: this.ngbDateParserFormatter.parse(res.lmsquote.quotedate),
details: res.lmsquote.details,
assignedto: JSON.parse(res.lmsquote.assignedto),
quoteamount: res.lmsquote.quoteamount,
currency: res.lmsquote.currency,
currencydesc: res.lmsquote.currencydesc,
expirationdate: this.ngbDateParserFormatter.parse(res.lmsquote.expirationdate),
taxid: res.lmsquote.taxid,
taxiddesc: res.lmsquote.taxiddesc,
shippingruleid: res.lmsquote.shippingruleid,
totalamount: res.lmsquote.totalamount,
taxamount: res.lmsquote.taxamount,
charges: res.lmsquote.charges,
paymenttermid: res.lmsquote.paymenttermid,
paymenttermiddesc: res.lmsquote.paymenttermiddesc,
termid: res.lmsquote.termid,
termiddesc: res.lmsquote.termiddesc,
terms: res.lmsquote.terms,
comments: res.lmsquote.comments,
campaignid: res.lmsquote.campaignid,
leadsource: res.lmsquote.leadsource,
leadsourcedesc: res.lmsquote.leadsourcedesc,
supplierquotationid: res.lmsquote.supplierquotationid,
customfield: res.lmsquote.customfield,
attachment: JSON.parse(res.lmsquote.attachment),
quotestatus: res.lmsquote.quotestatus,
quotestatusdesc: res.lmsquote.quotestatusdesc,
status: res.lmsquote.status,
statusdesc: res.lmsquote.statusdesc,
});
this.lmsquotedetailsvisiblelist=res.lmsquotedetailsvisiblelist;
this.lmsquotepaymenttermsvisiblelist=res.lmsquotepaymenttermsvisiblelist;
if(this.lmsquoteForm.get('customfield').value!=null && this.lmsquoteForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.lmsquoteForm.get('customfield').value);
this.FillCustomField();
if(this.lmsquoteForm.get('attachment').value!=null && this.lmsquoteForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.lmsquoteForm.get('attachment').value);
//Child Tables if any
this.lmsquoteservice.lmsquotedetails = res.lmsquotedetails;
this.SetlmsquotedetailsTableConfig();
this.lmsquotedetailsLoadTable();
  setTimeout(() => {
  this.SetlmsquotedetailsTableddConfig();
  });
this.lmsquoteservice.lmsquotepaymentterms = res.lmsquotepaymentterms;
this.SetlmsquotepaymenttermsTableConfig();
this.lmsquotepaymenttermsLoadTable();
  setTimeout(() => {
  this.SetlmsquotepaymenttermsTableddConfig();
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
  for (let key in this.lmsquoteForm.controls) {
    if (this.lmsquoteForm.controls[key] != null) {
if(false)
{
if(this.lmsquoteservice.formData!=null && this.lmsquoteservice.formData[key]!=null  && this.lmsquoteservice.formData[key]!='[]' && this.lmsquoteservice.formData[key]!=undefined && this.lmsquoteservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsquoteservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsquoteservice.formData!=null && this.lmsquoteservice.formData[key]!=null   && this.lmsquoteservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsquoteservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsquoteservice.formData!=null && this.lmsquoteservice.formData[key]!=null   && this.lmsquoteservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsquoteservice.formData[key]+"'><div class='progress__number'>"+this.lmsquoteservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsquoteForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsquoteForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.lmsquoteForm.value;
obj.quotedate=new Date(this.lmsquoteForm.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquoteForm.get('quotedate').value)+'  UTC' :null);
obj.assignedto=JSON.stringify(this.lmsquoteForm.get('assignedto').value);
obj.expirationdate=new Date(this.lmsquoteForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquoteForm.get('expirationdate').value)+'  UTC' :null);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
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

private lmsquotetoggleOption(){
this.lmsquoteshowOption = this.lmsquoteshowOption === true ? false : true;
}

private lmsquotedetailtoggleOption(){
this.lmsquotedetailshowOption = this.lmsquotedetailshowOption === true ? false : true;
}

private lmsquotepaymenttermtoggleOption(){
this.lmsquotepaymenttermshowOption = this.lmsquotepaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsquoteForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsquoteForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsquoteForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsquoteservice.formData=this.lmsquoteForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsquoteForm.controls[key] != null)
    {
        this.lmsquoteservice.formData[key] = this.lmsquoteForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.lmsquoteservice.formData.quotedate=new Date(this.lmsquoteForm.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquoteForm.get('quotedate').value)+'  UTC' :null);
this.lmsquoteservice.formData.assignedto=JSON.stringify(this.lmsquoteForm.get('assignedto').value);
this.lmsquoteservice.formData.expirationdate=new Date(this.lmsquoteForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquoteForm.get('expirationdate').value)+'  UTC' :null);
this.lmsquoteservice.formData.customfield=JSON.stringify(customfields);
this.lmsquoteservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.lmsquoteservice.formData.DeletedlmsquotedetailIDs = this.DeletedlmsquotedetailIDs;
this.lmsquoteservice.formData.DeletedlmsquotepaymenttermIDs = this.DeletedlmsquotepaymenttermIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.lmsquoteservice.formData);
this.lmsquoteservice.formData=this.lmsquoteForm.value;
this.lmsquoteservice.saveOrUpdatelmsquotes().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.lmsquotedetailssource.data)
{
    for (let i = 0; i < this.lmsquotedetailssource.data.length; i++)
    {
        if (this.lmsquotedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsquotedetailssource.data[i].fileattachmentlist);
    }
}
if (this.lmsquotepaymenttermssource.data)
{
    for (let i = 0; i < this.lmsquotepaymenttermssource.data.length; i++)
    {
        if (this.lmsquotepaymenttermssource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmsquotepaymenttermssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsquote);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsquoteservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsquote);
}
else
{
this.FillData(res);
}
}
this.lmsquoteForm.markAsUntouched();
this.lmsquoteForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmsquoteForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittaxid( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.lmsquoteForm.get('taxid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpaymenttermid( termid) {
/*let ScreenType='2';
this.dialog.open(botermComponent, 
{
data: {termid:this.lmsquoteForm.get('paymenttermid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittermid( termid) {
/*let ScreenType='2';
this.dialog.open(botermComponent, 
{
data: {termid:this.lmsquoteForm.get('termid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmsquotedetail(event:any,quotedetailid:any, quoteid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsquotedetailComponent, 
{
data:  {  showview:false,save:false,event,quotedetailid, quoteid,visiblelist:this.lmsquotedetailsvisiblelist,  hidelist:this.lmsquotedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsquotedetailssource.add(res);
this.lmsquotedetailssource.refresh();
}
else
{
this.lmsquotedetailssource.update(event.data, res);
}
}
});
}

onDeletelmsquotedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsquotedetailIDs += childID + ",";
this.lmsquoteservice.lmsquotedetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlmsquotepaymentterm(event:any,paymenttermid:any, quoteid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmsquotepaymenttermComponent, 
{
data:  {  showview:false,save:false,event,paymenttermid, quoteid,visiblelist:this.lmsquotepaymenttermsvisiblelist,  hidelist:this.lmsquotepaymenttermshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmsquotepaymenttermssource.add(res);
this.lmsquotepaymenttermssource.refresh();
}
else
{
this.lmsquotepaymenttermssource.update(event.data, res);
}
}
});
}

onDeletelmsquotepaymentterm(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsquotepaymenttermIDs += childID + ",";
this.lmsquoteservice.lmsquotepaymentterms.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmsquotedetails
lmsquotedetailssettings:any;
lmsquotedetailssource: any;

showlmsquotedetailsCheckbox()
{
debugger;
if(this.tbllmsquotedetailssource.settings['selectMode']== 'multi')this.tbllmsquotedetailssource.settings['selectMode']= 'single';
else
this.tbllmsquotedetailssource.settings['selectMode']= 'multi';
this.tbllmsquotedetailssource.initGrid();
}
deletelmsquotedetailsAll()
{
this.tbllmsquotedetailssource.settings['selectMode'] = 'single';
}
showlmsquotedetailsFilter()
{
  setTimeout(() => {
  this.SetlmsquotedetailsTableddConfig();
  });
      if(this.tbllmsquotedetailssource.settings!=null)this.tbllmsquotedetailssource.settings['hideSubHeader'] =!this.tbllmsquotedetailssource.settings['hideSubHeader'];
this.tbllmsquotedetailssource.initGrid();
}
showlmsquotedetailsInActive()
{
}
enablelmsquotedetailsInActive()
{
}
async SetlmsquotedetailsTableddConfig()
{
if(!this.bfilterPopulatelmsquotedetails){

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotedetailsopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmsquotedetailsopportunityid3.push(obj);
}
if((this.tbllmsquotedetailssource.settings as any).columns['opportunityid'])
{
(this.tbllmsquotedetailssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotedetailsopportunityid3));
this.tbllmsquotedetailssource.initGrid();
}
});

this.lmsproductmasterservice.getlmsproductmastersList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotedetailsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.datalmsquotedetailsproductid3.push(obj);
}
if((this.tbllmsquotedetailssource.settings as any).columns['productid'])
{
(this.tbllmsquotedetailssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotedetailsproductid3));
this.tbllmsquotedetailssource.initGrid();
}
});

this.configservice.getList("uom").then(res=>
{
var datauom2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotedetailsuom3.push(defaultobj);
for(let i=0; i<datauom2.length; i++){
var obj= { value: datauom2[i].configkey, title: datauom2[i].configtext};
this.datalmsquotedetailsuom3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsquotedetailssource.settings);
if(clone.columns['uom']!=undefined)clone.columns['uom'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotedetailsuom3)), }, };
if(clone.columns['uom']!=undefined)clone.columns['uom'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotedetailsuom3)), }, };
this.tbllmsquotedetailssource.settings =  clone;
this.tbllmsquotedetailssource.initGrid();
});
}
this.bfilterPopulatelmsquotedetails=true;
}
async lmsquotedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsquotedetailsTableConfig()
{
this.lmsquotedetailssettings = {
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
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotedetailsproductid3.find(c=>c.value==cell);
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
uom: {
title: 'U O M',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotedetailsuom3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
price: {
title: 'Price',
type: 'number',
filter:true,
},
totalprice: {
title: 'Total Price',
type: 'number',
filter:true,
},
},
};
}
lmsquotedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotedetailsID)>=0)
{
this.lmsquotedetailssource=new LocalDataSource();
this.lmsquotedetailssource.load(this.lmsquoteservice.lmsquotedetails as  any as LocalDataSource);
this.lmsquotedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsquotedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsquoteservice.lmsquotedetails.length == 0)
{
    this.tbllmsquotedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsquotedetail();
    this.lmsquoteservice.lmsquotedetails.push(obj);
    this.lmsquotedetailssource.refresh();
    if ((this.lmsquoteservice.lmsquotedetails.length / this.lmsquotedetailssource.getPaging().perPage).toFixed(0) + 1 != this.lmsquotedetailssource.getPaging().page)
    {
        this.lmsquotedetailssource.setPage((this.lmsquoteservice.lmsquotedetails.length / this.lmsquotedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsquotedetailssource.grid.edit(this.tbllmsquotedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsquotedetailssource.data.indexOf(event.data);
this.onDeletelmsquotedetail(event,event.data.quotedetailid,((this.lmsquotedetailssource.getPaging().page-1) *this.lmsquotedetailssource.getPaging().perPage)+index);
this.lmsquotedetailssource.refresh();
break;
}
}

*/
lmsquotedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsquotedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsquotedetail(event,event.data.quotedetailid,this.formid);
break;
case 'delete':
this.onDeletelmsquotedetail(event,event.data.quotedetailid,((this.lmsquotedetailssource.getPaging().page-1) *this.lmsquotedetailssource.getPaging().perPage)+event.index);
this.lmsquotedetailssource.refresh();
break;
}
}
lmsquotedetailsonDelete(obj) {
let quotedetailid=obj.data.quotedetailid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsquoteservice.deletelmsquote(quotedetailid).then(res=>
this.lmsquotedetailsLoadTable()
);
}
}
lmsquotedetailsPaging(val)
{
debugger;
this.lmsquotedetailssource.setPaging(1, val, true);
}

handlelmsquotedetailsGridSelected(event:any) {
this.lmsquotedetailsselectedindex=this.lmsquoteservice.lmsquotedetails.findIndex(i => i.quotedetailid === event.data.quotedetailid);
}
IslmsquotedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsquotedetails
//start of Grid Codes lmsquotepaymentterms
lmsquotepaymenttermssettings:any;
lmsquotepaymenttermssource: any;

showlmsquotepaymenttermsCheckbox()
{
debugger;
if(this.tbllmsquotepaymenttermssource.settings['selectMode']== 'multi')this.tbllmsquotepaymenttermssource.settings['selectMode']= 'single';
else
this.tbllmsquotepaymenttermssource.settings['selectMode']= 'multi';
this.tbllmsquotepaymenttermssource.initGrid();
}
deletelmsquotepaymenttermsAll()
{
this.tbllmsquotepaymenttermssource.settings['selectMode'] = 'single';
}
showlmsquotepaymenttermsFilter()
{
  setTimeout(() => {
  this.SetlmsquotepaymenttermsTableddConfig();
  });
      if(this.tbllmsquotepaymenttermssource.settings!=null)this.tbllmsquotepaymenttermssource.settings['hideSubHeader'] =!this.tbllmsquotepaymenttermssource.settings['hideSubHeader'];
this.tbllmsquotepaymenttermssource.initGrid();
}
showlmsquotepaymenttermsInActive()
{
}
enablelmsquotepaymenttermsInActive()
{
}
async SetlmsquotepaymenttermsTableddConfig()
{
if(!this.bfilterPopulatelmsquotepaymentterms){

this.lmsopportunityservice.getlmsopportunitiesList().then(res=>
{
var dataopportunityid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotepaymenttermsopportunityid3.push(defaultobj);
for(let i=0; i<dataopportunityid2.length; i++){
var obj= { value: dataopportunityid2[i].opportunityid, title:dataopportunityid2[i].requirementdetails};
this.datalmsquotepaymenttermsopportunityid3.push(obj);
}
if((this.tbllmsquotepaymenttermssource.settings as any).columns['opportunityid'])
{
(this.tbllmsquotepaymenttermssource.settings as any).columns['opportunityid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotepaymenttermsopportunityid3));
this.tbllmsquotepaymenttermssource.initGrid();
}
});

this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res=>
{
var dataquoteid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotepaymenttermsquoteid3.push(defaultobj);
for(let i=0; i<dataquoteid2.length; i++){
var obj= { value: dataquoteid2[i].quotationid, title:dataquoteid2[i].quotationreference};
this.datalmsquotepaymenttermsquoteid3.push(obj);
}
if((this.tbllmsquotepaymenttermssource.settings as any).columns['quoteid'])
{
(this.tbllmsquotepaymenttermssource.settings as any).columns['quoteid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmsquotepaymenttermsquoteid3));
this.tbllmsquotepaymenttermssource.initGrid();
}
});

this.configservice.getList("duedate").then(res=>
{
var dataduedate2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmsquotepaymenttermsduedate3.push(defaultobj);
for(let i=0; i<dataduedate2.length; i++){
var obj= { value: dataduedate2[i].configkey, title: dataduedate2[i].configtext};
this.datalmsquotepaymenttermsduedate3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmsquotepaymenttermssource.settings);
if(clone.columns['duedate']!=undefined)clone.columns['duedate'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotepaymenttermsduedate3)), }, };
if(clone.columns['duedate']!=undefined)clone.columns['duedate'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmsquotepaymenttermsduedate3)), }, };
this.tbllmsquotepaymenttermssource.settings =  clone;
this.tbllmsquotepaymenttermssource.initGrid();
});
}
this.bfilterPopulatelmsquotepaymentterms=true;
}
async lmsquotepaymenttermsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsquotepaymenttermsTableConfig()
{
this.lmsquotepaymenttermssettings = {
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
description: {
title: 'Description',
type: '',
filter:true,
},
duedate: {
title: 'Due Date',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmsquotepaymenttermsduedate3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
invoicepercentage: {
title: 'Invoice Percentage',
type: 'number',
filter:true,
},
paymentamount: {
title: 'Payment Amount',
type: 'number',
filter:true,
},
},
};
}
lmsquotepaymenttermsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotepaymenttermsID)>=0)
{
this.lmsquotepaymenttermssource=new LocalDataSource();
this.lmsquotepaymenttermssource.load(this.lmsquoteservice.lmsquotepaymentterms as  any as LocalDataSource);
this.lmsquotepaymenttermssource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmsquotepaymenttermsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsquoteservice.lmsquotepaymentterms.length == 0)
{
    this.tbllmsquotepaymenttermssource.grid.createFormShown = true;
}
else
{
    let obj = new lmsquotepaymentterm();
    this.lmsquoteservice.lmsquotepaymentterms.push(obj);
    this.lmsquotepaymenttermssource.refresh();
    if ((this.lmsquoteservice.lmsquotepaymentterms.length / this.lmsquotepaymenttermssource.getPaging().perPage).toFixed(0) + 1 != this.lmsquotepaymenttermssource.getPaging().page)
    {
        this.lmsquotepaymenttermssource.setPage((this.lmsquoteservice.lmsquotepaymentterms.length / this.lmsquotepaymenttermssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsquotepaymenttermssource.grid.edit(this.tbllmsquotepaymenttermssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmsquotepaymenttermssource.data.indexOf(event.data);
this.onDeletelmsquotepaymentterm(event,event.data.paymenttermid,((this.lmsquotepaymenttermssource.getPaging().page-1) *this.lmsquotepaymenttermssource.getPaging().perPage)+index);
this.lmsquotepaymenttermssource.refresh();
break;
}
}

*/
lmsquotepaymenttermsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmsquotepaymentterm(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmsquotepaymentterm(event,event.data.paymenttermid,this.formid);
break;
case 'delete':
this.onDeletelmsquotepaymentterm(event,event.data.paymenttermid,((this.lmsquotepaymenttermssource.getPaging().page-1) *this.lmsquotepaymenttermssource.getPaging().perPage)+event.index);
this.lmsquotepaymenttermssource.refresh();
break;
}
}
lmsquotepaymenttermsonDelete(obj) {
let paymenttermid=obj.data.paymenttermid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsquoteservice.deletelmsquote(paymenttermid).then(res=>
this.lmsquotepaymenttermsLoadTable()
);
}
}
lmsquotepaymenttermsPaging(val)
{
debugger;
this.lmsquotepaymenttermssource.setPaging(1, val, true);
}

handlelmsquotepaymenttermsGridSelected(event:any) {
this.lmsquotepaymenttermsselectedindex=this.lmsquoteservice.lmsquotepaymentterms.findIndex(i => i.paymenttermid === event.data.paymenttermid);
}
IslmsquotepaymenttermsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmsquotepaymenttermsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmsquotepaymentterms

}



