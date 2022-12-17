import { erpbudgetmasterService } from './../../../service/erpbudgetmaster.service';
import { erpbudgetmaster } from './../../../model/erpbudgetmaster.model';
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
import currencyToSymbolMap from 'currency-symbol-map/map'
//FK field services
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bofinancialyear} from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bofinancialyear/bofinancialyear.component';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
//popups
import { erpfaaccountmaster} from '../../../../../../n-tire-finance-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.component';
import { erpfaaccountmasterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfaaccountmaster.service';
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
selector: 'app-erpbudgetmaster',
templateUrl: './erpbudgetmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpbudgetmasterComponent implements OnInit {
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
currencyToSymbolMap1:any;
currencyToSymbolMap2:any;
data3:any=[];
bfilterPopulateerpbudgetmasters:boolean=false;
dataerpbudgetmastersbranchid3:any=[];
dataerpbudgetmasterscategoryid3:any=[];
dataerpbudgetmasterssubcategoryid3:any=[];
dataerpbudgetmastersfinyear3:any=[];
dataerpbudgetmasterscontroltype3:any=[];
dataerpbudgetmastersaccountid3:any=[];
dataerpbudgetmastersperiodrange3:any=[];
 erpbudgetmasterForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
finyearList: bofinancialyear[];
controltypeList: boconfigvalue[];
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
periodrangeList: boconfigvalue[];
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
erpbudgetmastershowOption:boolean;
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
private erpbudgetmasterservice: erpbudgetmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
private bofinancialyearservice:bofinancialyearService,
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
this.erpbudgetmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
budgetid: [null],
budgetname: [null],
branchid: [null],
branchiddesc: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
finyear: [null],
finyeardesc: [null],
currency: [null],
controltype: [null],
controltypedesc: [null],
budgetstartdate: [null],
multiplicationfactor: [null],
accountid: [null],
accountiddesc: [null],
periodrange: [null],
periodrangedesc: [null],
yearlybudgetamount: [null],
halfyearlybudgetamount1: [null],
halfyearlybudgetamount2: [null],
quaterlyyearlybudgetamount1: [null],
quaterlyyearlybudgetamount2: [null],
quaterlyyearlybudgetamount3: [null],
quaterlyyearlybudgetamount4: [null],
monthlyyearlybudgetamount1: [null],
monthlyyearlybudgetamount2: [null],
monthlyyearlybudgetamount3: [null],
monthlyyearlybudgetamount4: [null],
monthlyyearlybudgetamount5: [null],
monthlyyearlybudgetamount6: [null],
monthlyyearlybudgetamount7: [null],
monthlyyearlybudgetamount8: [null],
monthlyyearlybudgetamount9: [null],
monthlyyearlybudgetamount10: [null],
monthlyyearlybudgetamount11: [null],
monthlyyearlybudgetamount12: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpbudgetmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpbudgetmasterForm.dirty && this.erpbudgetmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.budgetid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.budgetid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.budgetid && pkDetail) {
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

this.currencyToSymbolMap2=currencyToSymbolMap;
this.currencyToSymbolMap1=(Object.entries(currencyToSymbolMap));
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
let erpbudgetmasterid = null;

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
this.formid=erpbudgetmasterid;
//this.sharedService.alert(erpbudgetmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpbudgetmasterservice.formData && this.erpbudgetmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpbudgetmasterForm.patchValue({
    branchid: this.erpbudgetmasterservice.formData.branchid,
    branchiddesc: this.erpbudgetmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpbudgetmasterForm.get('branchid').value);
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
this.bomasterdataservice.getList("rs8fd").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bosubcategorymasterservice.getbosubcategorymastersList().then(res => 
{
this.subcategoryidList = res as bosubcategorymaster[];
}
).catch((err) => {console.log(err);});
this.bofinancialyearservice.getbofinancialyearsList().then(res => 
{
this.finyearList = res as bofinancialyear[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("budgetcontroltype").then(res => this.controltypeList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpbudgetmasterservice.formData && this.erpbudgetmasterservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpbudgetmasterForm.patchValue({
    accountid: this.erpbudgetmasterservice.formData.accountid,
    accountiddesc: this.erpbudgetmasterservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpbudgetmasterForm.get('accountid').value);
let objaccountid;
if (arraccountid.length > 0) objaccountid = arraccountid[0];
if (objaccountid)
{
}
}
}
).catch((err) => {console.log(err);});
this.accountid_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.accountidList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.accountid_erpfaaccountmastersformatter = (result: any) => result.accountname;
this.configservice.getList("periodrange").then(res => this.periodrangeList = res as boconfigvalue[]);

//autocomplete
    this.erpbudgetmasterservice.geterpbudgetmastersList().then(res => {
      this.pkList = res as erpbudgetmaster[];
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
this.erpbudgetmasterForm.markAsUntouched();
this.erpbudgetmasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpbudgetmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpbudgetmasterForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}




resetForm() {
if (this.erpbudgetmasterForm != null)
this.erpbudgetmasterForm.reset();
this.erpbudgetmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
finyear: this.sessiondata.finyearid,
currency: this.sessiondata.currency,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let budgetid = this.erpbudgetmasterForm.get('budgetid').value;
        if(budgetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpbudgetmasterservice.deleteerpbudgetmaster(budgetid).then(res =>
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
    this.erpbudgetmasterForm.patchValue({
        budgetid: null
    });
    if(this.erpbudgetmasterservice.formData.budgetid!=null)this.erpbudgetmasterservice.formData.budgetid=null;
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
        else if(key=="budgetstartdate")
this.erpbudgetmasterForm.patchValue({"budgetstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpbudgetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpbudgetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpbudgetmasterForm.controls[key]!=undefined)
{
this.erpbudgetmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpbudgetmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
budgetidonChange(evt:any){
let e=evt.value;
}
budgetnameonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
categoryidonChange(evt:any){
let e=evt.value;
this.erpbudgetmasterForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.erpbudgetmasterForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
finyearonChange(evt:any){
let e=evt.value;
this.erpbudgetmasterForm.patchValue({finyeardesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=evt.value;
}
controltypeonChange(evt:any){
let e=this.f.controltype.value as any;
this.erpbudgetmasterForm.patchValue({controltypedesc:evt.options[evt.options.selectedIndex].text});
}
budgetstartdateonChange(evt:any){
let e=evt.value;
}
multiplicationfactoronChange(evt:any){
let e=evt.value;
}
accountidonChange(evt:any){
let e=evt.value;
}
periodrangeonChange(evt:any){
let e=this.f.periodrange.value as any;
//this.quaterlyyearlybudgetamount4visible=false;
//if(this.f.periodrange.value == 'Q')this.quaterlyyearlybudgetamount4visible=true;
this.erpbudgetmasterForm.patchValue({periodrangedesc:evt.options[evt.options.selectedIndex].text});
}
yearlybudgetamountonChange(evt:any){
let e=evt.value;
}
halfyearlybudgetamount1onChange(evt:any){
let e=evt.value;
}
halfyearlybudgetamount2onChange(evt:any){
let e=evt.value;
}
quaterlyyearlybudgetamount1onChange(evt:any){
let e=evt.value;
}
quaterlyyearlybudgetamount2onChange(evt:any){
let e=evt.value;
}
quaterlyyearlybudgetamount3onChange(evt:any){
let e=evt.value;
}
quaterlyyearlybudgetamount4onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount1onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount2onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount3onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount4onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount5onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount6onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount7onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount8onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount9onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount10onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount11onChange(evt:any){
let e=evt.value;
}
monthlyyearlybudgetamount12onChange(evt:any){
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
  


editerpbudgetmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpbudgetmasterservice.geterpbudgetmastersByEID(pkcol).then(res => {

this.erpbudgetmasterservice.formData=res.erpbudgetmaster;
let formproperty=res.erpbudgetmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpbudgetmaster.pkcol;
this.formid=res.erpbudgetmaster.budgetid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpbudgetmaster.budgetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpbudgetmasterForm.patchValue({
budgetid: res.erpbudgetmaster.budgetid,
budgetname: res.erpbudgetmaster.budgetname,
branchid: res.erpbudgetmaster.branchid,
branchiddesc: res.erpbudgetmaster.branchiddesc,
categoryid: res.erpbudgetmaster.categoryid,
categoryiddesc: res.erpbudgetmaster.categoryiddesc,
subcategoryid: res.erpbudgetmaster.subcategoryid,
subcategoryiddesc: res.erpbudgetmaster.subcategoryiddesc,
finyear: res.erpbudgetmaster.finyear,
finyeardesc: res.erpbudgetmaster.finyeardesc,
currency: res.erpbudgetmaster.currency,
controltype: res.erpbudgetmaster.controltype,
controltypedesc: res.erpbudgetmaster.controltypedesc,
budgetstartdate: this.ngbDateParserFormatter.parse(res.erpbudgetmaster.budgetstartdate),
multiplicationfactor: res.erpbudgetmaster.multiplicationfactor,
accountid: res.erpbudgetmaster.accountid,
accountiddesc: res.erpbudgetmaster.accountiddesc,
periodrange: res.erpbudgetmaster.periodrange,
periodrangedesc: res.erpbudgetmaster.periodrangedesc,
yearlybudgetamount: res.erpbudgetmaster.yearlybudgetamount,
halfyearlybudgetamount1: res.erpbudgetmaster.halfyearlybudgetamount1,
halfyearlybudgetamount2: res.erpbudgetmaster.halfyearlybudgetamount2,
quaterlyyearlybudgetamount1: res.erpbudgetmaster.quaterlyyearlybudgetamount1,
quaterlyyearlybudgetamount2: res.erpbudgetmaster.quaterlyyearlybudgetamount2,
quaterlyyearlybudgetamount3: res.erpbudgetmaster.quaterlyyearlybudgetamount3,
quaterlyyearlybudgetamount4: res.erpbudgetmaster.quaterlyyearlybudgetamount4,
monthlyyearlybudgetamount1: res.erpbudgetmaster.monthlyyearlybudgetamount1,
monthlyyearlybudgetamount2: res.erpbudgetmaster.monthlyyearlybudgetamount2,
monthlyyearlybudgetamount3: res.erpbudgetmaster.monthlyyearlybudgetamount3,
monthlyyearlybudgetamount4: res.erpbudgetmaster.monthlyyearlybudgetamount4,
monthlyyearlybudgetamount5: res.erpbudgetmaster.monthlyyearlybudgetamount5,
monthlyyearlybudgetamount6: res.erpbudgetmaster.monthlyyearlybudgetamount6,
monthlyyearlybudgetamount7: res.erpbudgetmaster.monthlyyearlybudgetamount7,
monthlyyearlybudgetamount8: res.erpbudgetmaster.monthlyyearlybudgetamount8,
monthlyyearlybudgetamount9: res.erpbudgetmaster.monthlyyearlybudgetamount9,
monthlyyearlybudgetamount10: res.erpbudgetmaster.monthlyyearlybudgetamount10,
monthlyyearlybudgetamount11: res.erpbudgetmaster.monthlyyearlybudgetamount11,
monthlyyearlybudgetamount12: res.erpbudgetmaster.monthlyyearlybudgetamount12,
customfield: res.erpbudgetmaster.customfield,
attachment: JSON.parse(res.erpbudgetmaster.attachment),
status: res.erpbudgetmaster.status,
statusdesc: res.erpbudgetmaster.statusdesc,
});
if(this.erpbudgetmasterForm.get('customfield').value!=null && this.erpbudgetmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpbudgetmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erpbudgetmasterForm.get('attachment').value!=null && this.erpbudgetmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpbudgetmasterForm.get('attachment').value);
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
  for (let key in this.erpbudgetmasterForm.controls) {
    if (this.erpbudgetmasterForm.controls[key] != null) {
if(false)
{
if(this.erpbudgetmasterservice.formData!=null && this.erpbudgetmasterservice.formData[key]!=null  && this.erpbudgetmasterservice.formData[key]!='[]' && this.erpbudgetmasterservice.formData[key]!=undefined && this.erpbudgetmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpbudgetmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpbudgetmasterservice.formData!=null && this.erpbudgetmasterservice.formData[key]!=null   && this.erpbudgetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpbudgetmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpbudgetmasterservice.formData!=null && this.erpbudgetmasterservice.formData[key]!=null   && this.erpbudgetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpbudgetmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpbudgetmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpbudgetmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpbudgetmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpbudgetmasterForm.value;
obj.budgetstartdate=new Date(this.erpbudgetmasterForm.get('budgetstartdate').value ? this.ngbDateParserFormatter.format(this.erpbudgetmasterForm.get('budgetstartdate').value)+'  UTC' :null);
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

private erpbudgetmastertoggleOption(){
this.erpbudgetmastershowOption = this.erpbudgetmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpbudgetmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpbudgetmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpbudgetmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpbudgetmasterservice.formData=this.erpbudgetmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpbudgetmasterForm.controls[key] != null)
    {
        this.erpbudgetmasterservice.formData[key] = this.erpbudgetmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpbudgetmasterservice.formData.budgetstartdate=new Date(this.erpbudgetmasterForm.get('budgetstartdate').value ? this.ngbDateParserFormatter.format(this.erpbudgetmasterForm.get('budgetstartdate').value)+'  UTC' :null);
if(customfields!=null)this.erpbudgetmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpbudgetmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpbudgetmasterservice.formData);
this.erpbudgetmasterservice.formData=this.erpbudgetmasterForm.value;
this.erpbudgetmasterservice.saveOrUpdateerpbudgetmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpbudgetmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpbudgetmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpbudgetmaster);
}
else
{
this.FillData(res);
}
}
this.erpbudgetmasterForm.markAsUntouched();
this.erpbudgetmasterForm.markAsPristine();
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
data: {branchid:this.erpbudgetmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpbudgetmasterForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpbudgetmasterForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfinyear( finyearid) {
/*let ScreenType='2';
this.dialog.open(bofinancialyearComponent, 
{
data: {finyearid:this.erpbudgetmasterForm.get('finyear').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpbudgetmasterForm.get('accountid').value, ScreenType:2 }
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



